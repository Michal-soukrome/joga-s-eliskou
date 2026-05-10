"use client";
import { useEffect, useState } from "react";
import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";

interface VideoLesson {
  id: string;
  title: string;
  description?: string;
  video_url: string;
  thumbnail_url?: string;
  duration_seconds?: number;
}

export default function OnlineVideos() {
  const [videos, setVideos] = useState<VideoLesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<VideoLesson | null>(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch("/api/videos", {
        cache: "no-store",
      });
      if (!response.ok) throw new Error("Failed to fetch videos");
      const data = await response.json();
      setVideos(data || []);
    } catch (error) {
      console.error("Error loading videos:", error);
      setVideos([]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return "";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (isLoading) {
    return (
      <section id="online-videos" className="scroll-mt-16 py-16 md:py-24 px-6">
        <Container>
          <SectionTitle
            title="Online Lekce"
            subtitle="Načítám lekce..."
            accentColor="emerald"
          />
        </Container>
      </section>
    );
  }

  if (videos.length === 0) {
    return null;
  }

  return (
    <section
      id="online-videos"
      className="scroll-mt-16 py-16 md:py-24 px-6 bg-gradient-to-br from-emerald-50/50 via-white to-sky-100/50"
    >
      <Container>
        <SectionTitle
          title="Online Lekce"
          subtitle="Leťte s jógou z domova"
          accentColor="emerald"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => setSelectedVideo(video)}
            >
              <div className="relative aspect-video bg-slate-200 overflow-hidden">
                {video.thumbnail_url ? (
                  <img
                    src={video.thumbnail_url}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-200 to-sky-200">
                    <span className="text-5xl">▶️</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 text-white text-3xl transition-opacity">
                    ▶
                  </span>
                </div>
                {video.duration_seconds && (
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {formatDuration(video.duration_seconds)}
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-slate-800 line-clamp-2">
                  {video.title}
                </h3>
                {video.description && (
                  <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                    {video.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300"
            >
              ✕
            </button>
            <div className="relative aspect-video bg-black">
              <iframe
                src={selectedVideo.video_url}
                className="w-full h-full"
                allowFullScreen
                allow="autoplay; fullscreen"
              />
            </div>
            <div className="mt-4 bg-white rounded-lg p-4">
              <h3 className="font-semibold text-slate-800 text-lg">
                {selectedVideo.title}
              </h3>
              {selectedVideo.description && (
                <p className="text-slate-600 mt-2">
                  {selectedVideo.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
