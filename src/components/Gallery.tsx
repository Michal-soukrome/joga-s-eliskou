"use client";
import { useEffect, useState } from "react";
import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";

interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  title?: string;
}

// Bento patterns repeat every 7 images
// Each entry: { colSpan, rowSpan } in a 3-column grid
const BENTO_PATTERN: { col: string; row: string }[] = [
  { col: "col-span-2", row: "row-span-2" }, // 0: big hero
  { col: "col-span-1", row: "row-span-1" }, // 1: small
  { col: "col-span-1", row: "row-span-1" }, // 2: small
  { col: "col-span-1", row: "row-span-1" }, // 3: small
  { col: "col-span-1", row: "row-span-2" }, // 4: tall
  { col: "col-span-2", row: "row-span-1" }, // 5: wide
  { col: "col-span-1", row: "row-span-1" }, // 6: small
];

const INITIAL_COUNT = 7;

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  // Keyboard navigation in lightbox
  useEffect(() => {
    if (lightbox === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight")
        setLightbox((p) => (p! + 1) % visiblePhotos.length);
      if (e.key === "ArrowLeft")
        setLightbox(
          (p) => (p! - 1 + visiblePhotos.length) % visiblePhotos.length,
        );
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox]);

  const fetchGalleryImages = async () => {
    try {
      const response = await fetch("/api/gallery", {
        cache: "no-store",
      });
      if (!response.ok) throw new Error("Failed to fetch gallery");
      const data = await response.json();
      setImages(data || []);
    } catch (error) {
      console.error("Error loading gallery:", error);
      setImages([]);
    } finally {
      setIsLoading(false);
    }
  };

  const visiblePhotos = images.slice(0, visibleCount);
  const hasMore = visibleCount < images.length;

  if (isLoading) {
    return (
      <section id="gallery" className="scroll-mt-16 py-16 md:py-24 px-6">
        <Container>
          <SectionTitle
            title="Galerie"
            subtitle="Načítám obrázky..."
            accentColor="sky"
          />
          {/* Skeleton bento */}
          <div className="grid grid-cols-3 auto-rows-[180px] gap-3">
            {BENTO_PATTERN.map((cell, i) => (
              <div
                key={i}
                className={`${cell.col} ${cell.row} rounded-2xl bg-slate-200 animate-pulse`}
              />
            ))}
          </div>
        </Container>
      </section>
    );
  }

  if (images.length === 0) {
    return (
      <section id="gallery" className="scroll-mt-16 py-16 md:py-24 px-6">
        <Container>
          <SectionTitle
            title="Galerie"
            subtitle="Žádné obrázky k dispozici"
            accentColor="sky"
          />
        </Container>
      </section>
    );
  }

  return (
    <section
      id="gallery"
      className="scroll-mt-16 py-16 md:py-24 px-6 bg-gradient-to-br from-sky-100/50 via-white to-emerald-100/30"
    >
      <Container>
        <SectionTitle
          title="Galerie"
          subtitle="Fotografie z mých lekcí"
          accentColor="sky"
        />

        {/* Bento Grid */}
        <div className="grid grid-cols-3 auto-rows-[180px] gap-3 md:gap-4">
          {visiblePhotos.map((photo, index) => {
            const cell = BENTO_PATTERN[index % BENTO_PATTERN.length];
            return (
              <div
                key={photo.id}
                className={`${cell.col} ${cell.row} relative group overflow-hidden rounded-2xl bg-slate-200 cursor-pointer`}
                onClick={() => setLightbox(index)}
              >
                <img
                  src={photo.url}
                  alt={photo.alt || `Fotografie ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {photo.title && (
                  <p className="absolute bottom-3 left-3 right-3 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow">
                    {photo.title}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() =>
                setVisibleCount((prev) => prev + BENTO_PATTERN.length)
              }
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition"
            >
              Načíst více
            </button>
          </div>
        )}

        {/* Lightbox */}
        {lightbox !== null && (
          <div
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <div
              className="relative max-w-4xl max-h-[90vh] w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-10 right-0 text-white/70 hover:text-white text-2xl transition"
              >
                ✕
              </button>

              <img
                src={visiblePhotos[lightbox].url}
                alt={visiblePhotos[lightbox].alt}
                className="max-h-[78vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
              />

              {visiblePhotos[lightbox].title && (
                <p className="text-white/80 text-sm mt-3">
                  {visiblePhotos[lightbox].title}
                </p>
              )}

              <div className="flex justify-between items-center mt-4 text-white w-full max-w-sm">
                <button
                  onClick={() =>
                    setLightbox(
                      (p) =>
                        (p! - 1 + visiblePhotos.length) % visiblePhotos.length,
                    )
                  }
                  className="px-4 py-2 bg-white/15 hover:bg-white/25 rounded-lg transition"
                >
                  ← Předchozí
                </button>
                <span className="text-sm text-white/60">
                  {lightbox + 1} / {visiblePhotos.length}
                </span>
                <button
                  onClick={() =>
                    setLightbox((p) => (p! + 1) % visiblePhotos.length)
                  }
                  className="px-4 py-2 bg-white/15 hover:bg-white/25 rounded-lg transition"
                >
                  Další →
                </button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
