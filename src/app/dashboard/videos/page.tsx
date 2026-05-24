"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Container from "@/components/Container";
import {
  getYouTubeId,
  getYouTubeThumbnail,
  getYouTubeEmbedUrl,
  isYouTubeUrl,
} from "@/lib/youtubeUtils";

interface VideoLesson {
  id: string;
  title: string;
  description?: string;
  video_url: string;
  thumbnail_url?: string;
  duration_seconds?: number;
  order_index: number;
  created_at: string;
}

function isEmbeddableUrl(url: string): boolean {
  return (
    isYouTubeUrl(url) ||
    url.includes("youtu.be") ||
    url.includes("youtube.com") ||
    url.includes("vimeo.com") ||
    url.includes("loom.com")
  );
}

function getEmbedUrl(url: string): string {
  const embedYt = getYouTubeEmbedUrl(url);
  if (embedYt) return embedYt;

  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;

  const ytFallback = url.match(
    /(?:youtu\.be\/|youtube\.com\/watch\?.*v=)([a-zA-Z0-9_-]{11})/,
  );
  if (ytFallback) return `https://www.youtube.com/embed/${ytFallback[1]}`;

  return url;
}

function isDirectVideo(url: string): boolean {
  return /\.(mp4|webm|ogg|mov)$/i.test(url);
}

export default function VideoDashboard() {
  const router = useRouter();
  const { isAuthenticated, isLoading, logout } = useAuth();

  const [videos, setVideos] = useState<VideoLesson[]>([]);
  const [isLoadingVideos, setIsLoadingVideos] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form state
  const [videoSourceType, setVideoSourceType] = useState<"upload" | "url">(
    "upload",
  );

  const [newVideoTitle, setNewVideoTitle] = useState("");
  const [newVideoDescription, setNewVideoDescription] = useState("");

  const [newVideoFile, setNewVideoFile] = useState<File | null>(null);
  const [newVideoUrl, setNewVideoUrl] = useState("");

  const [newVideoThumbnail, setNewVideoThumbnail] = useState("");
  const [autoThumbnail, setAutoThumbnail] = useState<string | null>(null);
  const [newVideoDuration, setNewVideoDuration] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-detect YouTube thumbnail as user types URL
  useEffect(() => {
    if (videoSourceType === "url" && newVideoUrl.trim()) {
      const ytId = getYouTubeId(newVideoUrl);
      if (ytId) {
        setAutoThumbnail(getYouTubeThumbnail(ytId));
      } else {
        setAutoThumbnail(null);
      }
    } else {
      setAutoThumbnail(null);
    }
  }, [newVideoUrl, videoSourceType]);

  // Inline editing
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDuration, setEditDuration] = useState("");

  // Preview modal
  const [previewVideo, setPreviewVideo] = useState<VideoLesson | null>(null);

  // Drag-to-reorder
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  const dragNodeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin");
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchVideos();
    }
  }, [isAuthenticated]);

  const showSuccess = (msg: string) => {
    setSuccess(msg);

    setTimeout(() => {
      setSuccess("");
    }, 3000);
  };

  const fetchVideos = async () => {
    try {
      setIsLoadingVideos(true);

      const response = await fetch("/api/videos", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch videos");
      }

      const data = await response.json();

      setVideos(
        (data || []).sort(
          (a: VideoLesson, b: VideoLesson) => a.order_index - b.order_index,
        ),
      );
    } catch {
      setError("Chyba při načítání videí");
    } finally {
      setIsLoadingVideos(false);
    }
  };

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newVideoTitle.trim()) {
      setError("Vyplň název videa");
      return;
    }

    if (videoSourceType === "upload" && !newVideoFile) {
      setError("Vyber video soubor");
      return;
    }

    if (videoSourceType === "url" && !newVideoUrl.trim()) {
      setError("Zadej URL videa");
      return;
    }

    try {
      setError("");
      setIsSubmitting(true);

      const orderIndex =
        videos.length > 0
          ? Math.max(...videos.map((v) => v.order_index)) + 1
          : 1;

      const formData = new FormData();

      if (videoSourceType === "upload" && newVideoFile) {
        formData.append("file", newVideoFile);
      }

      if (videoSourceType === "url") {
        formData.append("video_url", newVideoUrl);
      }

      formData.append("title", newVideoTitle);
      formData.append("description", newVideoDescription);
      formData.append("thumbnail_url", newVideoThumbnail);
      formData.append("duration_seconds", newVideoDuration);
      formData.append("order_index", orderIndex.toString());

      const response = await fetch("/api/videos", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add video");
      }

      const newVideo = await response.json();

      setVideos((prev) => [...prev, newVideo]);

      setNewVideoTitle("");
      setNewVideoDescription("");
      setNewVideoFile(null);
      setNewVideoUrl("");
      setNewVideoThumbnail("");
      setAutoThumbnail(null);
      setNewVideoDuration("");
      setVideoSourceType("upload");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      showSuccess("Video přidáno!");
    } catch {
      setError("Chyba při přidání videa");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteVideo = async (id: string) => {
    if (!confirm("Opravdu smazat video?")) {
      return;
    }

    try {
      const response = await fetch(`/api/videos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error();
      }

      setVideos((prev) => prev.filter((v) => v.id !== id));

      showSuccess("Smazáno");
    } catch {
      setError("Chyba při mazání videa");
    }
  };

  const startEdit = (video: VideoLesson) => {
    setEditingId(video.id);
    setEditTitle(video.title);
    setEditDescription(video.description || "");
    setEditDuration(video.duration_seconds?.toString() || "");
  };

  const saveEdit = async (id: string) => {
    try {
      const response = await fetch(`/api/videos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editTitle,
          description: editDescription,
          duration_seconds: editDuration ? parseInt(editDuration) : null,
        }),
      });

      if (!response.ok) {
        throw new Error();
      }

      setVideos((prev) =>
        prev.map((v) =>
          v.id === id
            ? {
                ...v,
                title: editTitle,
                description: editDescription,
                duration_seconds: editDuration
                  ? parseInt(editDuration)
                  : undefined,
              }
            : v,
        ),
      );

      setEditingId(null);

      showSuccess("Uloženo");
    } catch {
      setError("Chyba při ukládání");
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    setDraggingId(id);

    e.dataTransfer.effectAllowed = "move";

    dragNodeRef.current = e.currentTarget as HTMLDivElement;

    setTimeout(() => {
      if (dragNodeRef.current) {
        dragNodeRef.current.style.opacity = "0.4";
      }
    }, 0);
  };

  const handleDragEnd = () => {
    if (dragNodeRef.current) {
      dragNodeRef.current.style.opacity = "1";
    }

    setDraggingId(null);
    setDragOverId(null);

    dragNodeRef.current = null;
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.preventDefault();

    e.dataTransfer.dropEffect = "move";

    if (id !== draggingId) {
      setDragOverId(id);
    }
  };

  const handleDrop = async (
    e: React.DragEvent<HTMLDivElement>,
    targetId: string,
  ) => {
    e.preventDefault();

    if (!draggingId || draggingId === targetId) {
      return;
    }

    const reordered = [...videos];

    const fromIdx = reordered.findIndex((v) => v.id === draggingId);
    const toIdx = reordered.findIndex((v) => v.id === targetId);

    const [moved] = reordered.splice(fromIdx, 1);

    reordered.splice(toIdx, 0, moved);

    const updated = reordered.map((v, idx) => ({
      ...v,
      order_index: idx + 1,
    }));

    setVideos(updated);

    setDraggingId(null);
    setDragOverId(null);

    try {
      await fetch("/api/videos/reorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order: updated.map((v) => ({
            id: v.id,
            order_index: v.order_index,
          })),
        }),
      });

      showSuccess("Pořadí uloženo");
    } catch {
      setError("Chyba při ukládání pořadí");
    }
  };

  const moveVideo = async (index: number, direction: "up" | "down") => {
    const reordered = [...videos];

    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= reordered.length) {
      return;
    }

    [reordered[index], reordered[targetIndex]] = [
      reordered[targetIndex],
      reordered[index],
    ];

    const updated = reordered.map((v, idx) => ({
      ...v,
      order_index: idx + 1,
    }));

    setVideos(updated);

    try {
      await fetch("/api/videos/reorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order: updated.map((v) => ({
            id: v.id,
            order_index: v.order_index,
          })),
        }),
      });
    } catch {
      setError("Chyba při ukládání pořadí");
    }
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) {
      return null;
    }

    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    if (h > 0) {
      return `${h}:${m.toString().padStart(2, "0")}:${s
        .toString()
        .padStart(2, "0")}`;
    }

    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleLogout = () => {
    logout();
    router.push("/admin");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Načítám...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-emerald-50">
      {/* Preview Modal */}
      {previewVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={() => setPreviewVideo(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b">
              <p className="font-semibold text-slate-800 truncate">
                {previewVideo.title}
              </p>

              <button
                onClick={() => setPreviewVideo(null)}
                className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition text-lg"
              >
                ✕
              </button>
            </div>

            {isDirectVideo(previewVideo.video_url) ? (
              <video
                controls
                className="w-full max-h-[80vh] bg-black"
                src={previewVideo.video_url}
              />
            ) : isEmbeddableUrl(previewVideo.video_url) ? (
              <div className="aspect-video">
                <iframe
                  src={getEmbedUrl(previewVideo.video_url)}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="aspect-video bg-slate-900 flex flex-col items-center justify-center gap-3 text-slate-400">
                <span className="text-4xl">▶️</span>

                <p className="text-sm">Toto video nelze přehrát zde.</p>

                <a
                  href={previewVideo.video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm rounded-lg transition"
                >
                  Otevřít odkaz →
                </a>
              </div>
            )}

            {previewVideo.description && (
              <div className="px-5 py-3 text-sm text-slate-600 bg-slate-50 border-t">
                {previewVideo.description}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="border-b bg-white shadow-sm">
        <Container>
          <div className="flex justify-between items-center py-4">
            <h3 className="text-2xl font-bold text-slate-800">
              Správa Online Lekcí
            </h3>

            <div className="flex gap-3">
              <a
                href="/dashboard"
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm rounded-lg transition"
              >
                Galerie →
              </a>

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white text-sm rounded-lg transition"
              >
                Odhlásit se
              </button>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-8 grid md:grid-cols-3 gap-8">
          {/* Add Video Form */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow p-6 sticky top-20">
              <h3 className="text-lg font-bold mb-4 text-slate-800">
                Přidat video
              </h3>

              <form onSubmit={handleAddVideo} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                    Název lekce *
                  </label>

                  <input
                    type="text"
                    value={newVideoTitle ?? ""}
                    onChange={(e) => setNewVideoTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm bg-slate-50"
                    placeholder="Např. Jóga – základy"
                  />
                </div>

                {/* SOURCE SWITCH */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setVideoSourceType("upload")}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
                      videoSourceType === "upload"
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    Nahrát soubor
                  </button>

                  <button
                    type="button"
                    onClick={() => setVideoSourceType("url")}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
                      videoSourceType === "url"
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    URL videa
                  </button>
                </div>

                {/* VIDEO INPUT */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                    {videoSourceType === "upload"
                      ? "Video soubor *"
                      : "URL videa *"}
                  </label>

                  {videoSourceType === "upload" ? (
                    <>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="video/*"
                        onChange={(e) =>
                          setNewVideoFile(e.target.files?.[0] || null)
                        }
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm bg-slate-50"
                      />

                      {newVideoFile && (
                        <p className="text-xs text-emerald-600 mt-1">
                          ✓ {newVideoFile.name}
                        </p>
                      )}
                    </>
                  ) : (
                    <>
                      <input
                        type="url"
                        value={newVideoUrl ?? ""}
                        onChange={(e) => setNewVideoUrl(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm bg-slate-50"
                        placeholder="https://youtube.com/..."
                      />
                      {autoThumbnail && !newVideoThumbnail && (
                        <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
                          ✓ YouTube náhled detekován automaticky
                        </p>
                      )}
                    </>
                  )}
                </div>

                {/* Thumbnail preview */}
                {(autoThumbnail || newVideoThumbnail) && (
                  <div className="relative rounded-lg overflow-hidden border border-slate-200">
                    <img
                      src={newVideoThumbnail || autoThumbnail || ""}
                      alt="thumbnail preview"
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <span className="text-white text-3xl drop-shadow">▶</span>
                    </div>
                    {autoThumbnail && !newVideoThumbnail && (
                      <span className="absolute top-2 left-2 bg-emerald-600 text-white text-xs px-2 py-0.5 rounded-full">
                        Auto
                      </span>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                    URL náhledu (volitelné)
                  </label>

                  <input
                    type="url"
                    value={newVideoThumbnail ?? ""}
                    onChange={(e) => setNewVideoThumbnail(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm bg-slate-50"
                    placeholder={
                      autoThumbnail
                        ? "Přepsáno automaticky z YouTube"
                        : "https://..."
                    }
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                    Popis
                  </label>

                  <textarea
                    value={newVideoDescription ?? ""}
                    onChange={(e) => setNewVideoDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm bg-slate-50"
                    placeholder="Popis lekce..."
                    rows={2}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                    Délka (sekundy)
                  </label>

                  <input
                    type="number"
                    value={newVideoDuration ?? ""}
                    onChange={(e) => setNewVideoDuration(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm bg-slate-50"
                    placeholder="1800 = 30 min"
                  />
                </div>

                {error && (
                  <div className="text-red-600 text-sm bg-red-50 border border-red-100 p-3 rounded-lg">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="text-emerald-700 text-sm bg-emerald-50 border border-emerald-100 p-3 rounded-lg">
                    ✓ {success}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    (videoSourceType === "upload" && !newVideoFile) ||
                    (videoSourceType === "url" && !newVideoUrl)
                  }
                  className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white font-semibold py-2.5 rounded-lg transition flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin">⏳</span> Nahrávám...
                    </>
                  ) : (
                    "Přidat lekci"
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Videos List */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold mb-4 text-slate-800">
              Online lekce ({videos.length})
            </h3>

            {isLoadingVideos ? (
              <p className="text-slate-600">Načítám...</p>
            ) : videos.length === 0 ? (
              <p className="text-slate-600">Žádná videa</p>
            ) : (
              <div className="grid gap-4">
                {videos.map((video, index) => (
                  <div
                    key={video.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, video.id)}
                    onDragEnd={handleDragEnd}
                    onDragOver={(e) => handleDragOver(e, video.id)}
                    onDrop={(e) => handleDrop(e, video.id)}
                    ref={draggingId === video.id ? dragNodeRef : null}
                    className={`bg-white rounded-lg shadow p-4 flex gap-4 cursor-move transition ${
                      dragOverId === video.id
                        ? "ring-2 ring-emerald-400 bg-emerald-50"
                        : ""
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="flex-shrink-0 w-32 h-20 rounded bg-slate-900 overflow-hidden relative group">
                      {video.thumbnail_url ? (
                        <img
                          src={video.thumbnail_url}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                          <span className="text-white text-2xl">▶️</span>
                        </div>
                      )}
                      <button
                        onClick={() => setPreviewVideo(video)}
                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition text-white text-2xl"
                      >
                        ▶
                      </button>
                    </div>

                    {/* Video Info */}
                    <div className="flex-1">
                      {editingId === video.id ? (
                        <div className="space-y-2">
                          <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">
                              Název
                            </label>
                            <input
                              type="text"
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              className="w-full px-2 py-1 border border-slate-200 rounded text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">
                              Popis
                            </label>
                            <textarea
                              value={editDescription}
                              onChange={(e) =>
                                setEditDescription(e.target.value)
                              }
                              className="w-full px-2 py-1 border border-slate-200 rounded text-sm"
                              rows={2}
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">
                              Délka (sekundy)
                            </label>
                            <input
                              type="number"
                              value={editDuration}
                              onChange={(e) => setEditDuration(e.target.value)}
                              className="w-full px-2 py-1 border border-slate-200 rounded text-sm"
                              placeholder="Délka v sekundách"
                            />
                          </div>
                          <div className="flex gap-2 pt-2">
                            <button
                              onClick={() => saveEdit(video.id)}
                              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-sm rounded transition"
                            >
                              Uložit
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 text-sm rounded transition"
                            >
                              Zrušit
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <p className="font-semibold text-slate-800">
                                {video.title}
                              </p>
                              {video.description && (
                                <p className="text-sm text-slate-600 mt-1">
                                  {video.description}
                                </p>
                              )}
                              {video.duration_seconds && (
                                <p className="text-xs text-slate-500 mt-1">
                                  Délka:{" "}
                                  {formatDuration(video.duration_seconds)}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <button
                              onClick={() => startEdit(video)}
                              className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm rounded transition"
                            >
                              Upravit
                            </button>
                            <button
                              onClick={() => handleDeleteVideo(video.id)}
                              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition"
                            >
                              Smazat
                            </button>
                            <div className="flex-1 flex justify-end gap-1">
                              <button
                                onClick={() => moveVideo(index, "up")}
                                disabled={index === 0}
                                className="px-2 py-1 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-600 text-sm rounded transition"
                              >
                                ↑
                              </button>
                              <button
                                onClick={() => moveVideo(index, "down")}
                                disabled={index === videos.length - 1}
                                className="px-2 py-1 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-600 text-sm rounded transition"
                              >
                                ↓
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
