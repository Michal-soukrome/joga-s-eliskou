"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Container from "@/components/Container";

interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  title?: string;
  order_index: number;
  created_at: string;
}

export default function Dashboard() {
  const router = useRouter();
  const { isAuthenticated, isLoading, logout } = useAuth();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoadingImages, setIsLoadingImages] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Upload form state
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [newImageAlt, setNewImageAlt] = useState("");
  const [newImageTitle, setNewImageTitle] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Drag-to-reorder state
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const dragNode = useRef<HTMLDivElement | null>(null);

  // Inline editing
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editAlt, setEditAlt] = useState("");

  // Bulk selection
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isBulkMode, setIsBulkMode] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.push("/admin/login");
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (isAuthenticated) fetchImages();
  }, [isAuthenticated]);

  const showSuccess = (msg: string) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(""), 3000);
  };

  const fetchImages = async () => {
    try {
      setIsLoadingImages(true);
      const response = await fetch("/api/gallery", {
        cache: "no-store",
      });
      if (!response.ok) throw new Error("Failed to fetch images");
      const data = await response.json();
      setImages(
        (data || []).sort(
          (a: GalleryImage, b: GalleryImage) => a.order_index - b.order_index,
        ),
      );
    } catch (err) {
      setError("Chyba při načítání obrázků");
    } finally {
      setIsLoadingImages(false);
    }
  };

  // --- File / drag-to-upload ---
  const handleFileSelect = (file: File) => {
    setNewImageFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleDropUpload = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) handleFileSelect(file);
  };

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageFile) {
      setError("Vyber obrázek");
      return;
    }
    try {
      setError("");
      setIsUploading(true);
      const orderIndex =
        images.length > 0
          ? Math.max(...images.map((i) => i.order_index)) + 1
          : 1;
      const formData = new FormData();
      formData.append("file", newImageFile);
      formData.append("alt", newImageAlt);
      formData.append("title", newImageTitle);
      formData.append("order_index", orderIndex.toString());
      const response = await fetch("/api/gallery", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to add image");
      const newImage = await response.json();
      setImages((prev) => [...prev, newImage]);
      setNewImageFile(null);
      setNewImageAlt("");
      setNewImageTitle("");
      setPreviewUrl(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      showSuccess("Obrázek nahrán!");
    } catch (err) {
      setError("Chyba při nahrávání obrázku");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteImage = async (id: string) => {
    if (!confirm("Opravdu smazat obrázek?")) return;
    try {
      const response = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error();
      setImages((prev) => prev.filter((i) => i.id !== id));
      showSuccess("Smazáno");
    } catch {
      setError("Chyba při mazání obrázku");
    }
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Smazat ${selectedIds.size} obrázků?`)) return;
    try {
      await Promise.all(
        [...selectedIds].map((id) =>
          fetch(`/api/gallery/${id}`, { method: "DELETE" }),
        ),
      );
      setImages((prev) => prev.filter((i) => !selectedIds.has(i.id)));
      setSelectedIds(new Set());
      setIsBulkMode(false);
      showSuccess(`Smazáno ${selectedIds.size} obrázků`);
    } catch {
      setError("Chyba při hromadném mazání");
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // --- Inline edit ---
  const startEdit = (img: GalleryImage) => {
    setEditingId(img.id);
    setEditTitle(img.title || "");
    setEditAlt(img.alt);
  };

  const saveEdit = async (id: string) => {
    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editTitle, alt: editAlt }),
      });
      if (!response.ok) throw new Error();
      setImages((prev) =>
        prev.map((img) =>
          img.id === id ? { ...img, title: editTitle, alt: editAlt } : img,
        ),
      );
      setEditingId(null);
      showSuccess("Uloženo");
    } catch {
      setError("Chyba při ukládání");
    }
  };

  // --- Drag-to-reorder ---
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    setDraggingId(id);
    e.dataTransfer.effectAllowed = "move";
    dragNode.current = e.currentTarget as HTMLDivElement;
    setTimeout(() => {
      if (dragNode.current) dragNode.current.style.opacity = "0.4";
    }, 0);
  };

  const handleDragEnd = () => {
    if (dragNode.current) dragNode.current.style.opacity = "1";
    setDraggingId(null);
    setDragOverId(null);
    dragNode.current = null;
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (id !== draggingId) setDragOverId(id);
  };

  const handleDrop = async (
    e: React.DragEvent<HTMLDivElement>,
    targetId: string,
  ) => {
    e.preventDefault();
    if (!draggingId || draggingId === targetId) return;

    const reordered = [...images];
    const fromIdx = reordered.findIndex((i) => i.id === draggingId);
    const toIdx = reordered.findIndex((i) => i.id === targetId);
    const [moved] = reordered.splice(fromIdx, 1);
    reordered.splice(toIdx, 0, moved);

    const updated = reordered.map((img, idx) => ({
      ...img,
      order_index: idx + 1,
    }));
    setImages(updated);
    setDraggingId(null);
    setDragOverId(null);

    // Persist reorder
    try {
      await fetch("/api/gallery/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order: updated.map((img) => ({
            id: img.id,
            order_index: img.order_index,
          })),
        }),
      });
      showSuccess("Pořadí uloženo");
    } catch {
      setError("Chyba při ukládání pořadí");
    }
  };

  const moveImage = async (index: number, direction: "up" | "down") => {
    const reordered = [...images];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= reordered.length) return;
    [reordered[index], reordered[targetIndex]] = [
      reordered[targetIndex],
      reordered[index],
    ];
    const updated = reordered.map((img, idx) => ({
      ...img,
      order_index: idx + 1,
    }));
    setImages(updated);
    try {
      await fetch("/api/gallery/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order: updated.map((img) => ({
            id: img.id,
            order_index: img.order_index,
          })),
        }),
      });
    } catch {
      setError("Chyba při ukládání pořadí");
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Načítám...</p>
      </div>
    );
  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-emerald-50">
      {/* Header */}
      <div className="border-b bg-white shadow-sm">
        <Container>
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-slate-800">
              Správa Galerie
            </h1>
            <div className="flex gap-3 items-center">
              <a
                href="/dashboard/videos"
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm rounded-lg transition"
              >
                Online lekce →
              </a>
              <button
                onClick={() => {
                  setIsBulkMode((m) => !m);
                  setSelectedIds(new Set());
                }}
                className={`px-4 py-2 text-sm rounded-lg transition ${isBulkMode ? "bg-amber-100 text-amber-800 border border-amber-300" : "bg-slate-100 hover:bg-slate-200 text-slate-700"}`}
              >
                {isBulkMode ? "Zrušit výběr" : "Hromadný výběr"}
              </button>
              {isBulkMode && selectedIds.size > 0 && (
                <button
                  onClick={handleBulkDelete}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition"
                >
                  Smazat ({selectedIds.size})
                </button>
              )}
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
          {/* Upload Form */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow p-6 sticky top-20">
              <h2 className="text-lg font-bold mb-4 text-slate-800">
                Nahrát obrázek
              </h2>

              <form onSubmit={handleAddImage} className="space-y-4">
                {/* Drop zone */}
                <div
                  onDrop={handleDropUpload}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragOver(true);
                  }}
                  onDragLeave={() => setIsDragOver(false)}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative border-2 border-dashed rounded-xl cursor-pointer transition-all overflow-hidden
                    ${isDragOver ? "border-emerald-400 bg-emerald-50" : "border-slate-300 hover:border-emerald-400 hover:bg-emerald-50/50"}`}
                  style={{ minHeight: 140 }}
                >
                  {previewUrl ? (
                    <div className="relative">
                      <img
                        src={previewUrl}
                        alt="preview"
                        className="w-full h-40 object-cover rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setNewImageFile(null);
                          setPreviewUrl(null);
                          if (fileInputRef.current)
                            fileInputRef.current.value = "";
                        }}
                        className="absolute top-2 right-2 bg-white/90 hover:bg-white text-slate-700 rounded-full w-7 h-7 flex items-center justify-center shadow text-sm font-bold"
                      >
                        ✕
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-2">
                        <p className="text-white text-xs truncate">
                          {newImageFile?.name}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2 py-8 px-4 text-center">
                      <span className="text-3xl">🖼️</span>
                      <p className="text-sm font-medium text-slate-600">
                        Přetáhni sem nebo klikni
                      </p>
                      <p className="text-xs text-slate-400">
                        PNG, JPG, WebP...
                      </p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleFileSelect(f);
                    }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                    Název
                  </label>
                  <input
                    type="text"
                    value={newImageTitle}
                    onChange={(e) => setNewImageTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm bg-slate-50"
                    placeholder="Volitelné"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                    Alt text (SEO)
                  </label>
                  <input
                    type="text"
                    value={newImageAlt}
                    onChange={(e) => setNewImageAlt(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm bg-slate-50"
                    placeholder="Popis obrázku"
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
                  disabled={isUploading || !newImageFile}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white font-semibold py-2.5 rounded-lg transition flex items-center justify-center gap-2"
                >
                  {isUploading ? (
                    <>
                      <span className="animate-spin">⏳</span> Nahrávám...
                    </>
                  ) : (
                    "Nahrát obrázek"
                  )}
                </button>
              </form>

              <div className="mt-6 pt-5 border-t border-slate-100">
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-2">
                  Jak řadit?
                </p>
                <p className="text-xs text-slate-400">
                  Přetáhni karty pro změnu pořadí, nebo použij šipky ↑↓ na každé
                  kartě.
                </p>
              </div>
            </div>
          </div>

          {/* Images List */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-800">
                Obrázky ({images.length})
              </h2>
              {images.length > 0 && (
                <p className="text-xs text-slate-400">
                  Přetažením změníš pořadí
                </p>
              )}
            </div>

            {isLoadingImages ? (
              <div className="flex items-center gap-2 text-slate-500 py-8 justify-center">
                <span className="animate-spin">⏳</span> Načítám...
              </div>
            ) : images.length === 0 ? (
              <div className="bg-white rounded-xl shadow p-12 text-center text-slate-400">
                <p className="text-4xl mb-3">🖼️</p>
                <p>Žádné obrázky. Nahraj první!</p>
              </div>
            ) : (
              <div className="grid gap-3">
                {images.map((img, index) => (
                  <div
                    key={img.id}
                    draggable={!isBulkMode && editingId !== img.id}
                    onDragStart={(e) => handleDragStart(e, img.id)}
                    onDragEnd={handleDragEnd}
                    onDragOver={(e) => handleDragOver(e, img.id)}
                    onDrop={(e) => handleDrop(e, img.id)}
                    className={`bg-white rounded-xl shadow-sm border-2 transition-all
                      ${dragOverId === img.id && draggingId !== img.id ? "border-emerald-400 scale-[1.01] shadow-md" : "border-transparent"}
                      ${isBulkMode && selectedIds.has(img.id) ? "ring-2 ring-emerald-400 border-emerald-200" : ""}
                      ${editingId !== img.id && !isBulkMode ? "cursor-grab active:cursor-grabbing" : ""}
                    `}
                  >
                    <div className="p-3 flex gap-3">
                      {/* Bulk checkbox */}
                      {isBulkMode && (
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedIds.has(img.id)}
                            onChange={() => toggleSelect(img.id)}
                            className="w-5 h-5 accent-emerald-600 cursor-pointer rounded"
                          />
                        </div>
                      )}

                      {/* Drag handle */}
                      {!isBulkMode && (
                        <div
                          className="flex flex-col justify-center text-slate-300 hover:text-slate-500 cursor-grab px-1 select-none"
                          title="Přetáhni pro změnu pořadí"
                        >
                          ⠿
                        </div>
                      )}

                      {/* Thumbnail */}
                      <div className="flex-shrink-0 w-20 h-20 rounded-lg bg-slate-100 overflow-hidden">
                        <img
                          src={img.url}
                          alt={img.alt}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {editingId === img.id ? (
                          <div className="space-y-2">
                            <input
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              className="w-full px-2 py-1 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                              placeholder="Název"
                              autoFocus
                            />
                            <input
                              value={editAlt}
                              onChange={(e) => setEditAlt(e.target.value)}
                              className="w-full px-2 py-1 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                              placeholder="Alt text"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => saveEdit(img.id)}
                                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs rounded-lg transition font-medium"
                              >
                                Uložit
                              </button>
                              <button
                                onClick={() => setEditingId(null)}
                                className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs rounded-lg transition"
                              >
                                Zrušit
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <p className="font-semibold text-slate-800 text-sm truncate">
                              {img.title || `Obrázek ${index + 1}`}
                            </p>
                            <p className="text-xs text-slate-500 mt-0.5 truncate">
                              {img.alt || "—"}
                            </p>
                            <p className="text-xs text-slate-400 mt-1">
                              #{index + 1}
                            </p>
                          </>
                        )}
                      </div>

                      {/* Actions */}
                      {!isBulkMode && editingId !== img.id && (
                        <div className="flex flex-col gap-1 items-end justify-between flex-shrink-0">
                          <div className="flex gap-1">
                            <button
                              onClick={() => startEdit(img)}
                              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs rounded-lg transition"
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => handleDeleteImage(img.id)}
                              className="px-2 py-1 bg-red-50 hover:bg-red-100 text-red-600 text-xs rounded-lg transition"
                            >
                              🗑️
                            </button>
                          </div>
                          <div className="flex gap-1">
                            <button
                              onClick={() => moveImage(index, "up")}
                              disabled={index === 0}
                              className="px-2 py-1 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs rounded-lg transition disabled:opacity-30"
                            >
                              ↑
                            </button>
                            <button
                              onClick={() => moveImage(index, "down")}
                              disabled={index === images.length - 1}
                              className="px-2 py-1 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs rounded-lg transition disabled:opacity-30"
                            >
                              ↓
                            </button>
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
