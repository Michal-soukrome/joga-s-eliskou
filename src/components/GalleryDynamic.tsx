"use client";
import { useEffect, useState } from "react";
import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";

interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  title?: string;
  order_index: number;
  span?: string;
}

export default function GalleryDynamic() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchGalleryImages().finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setLightboxIndex(
          (lightboxIndex - 1 + galleryImages.length) % galleryImages.length,
        );
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setLightboxIndex((lightboxIndex + 1) % galleryImages.length);
      } else if (e.key === "Escape") {
        e.preventDefault();
        setLightboxIndex(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, galleryImages.length]);

  useEffect(() => {
    if (lightboxIndex === null) {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
      return;
    }

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    };
  }, [lightboxIndex]);

  const fetchGalleryImages = async () => {
    try {
      const response = await fetch("/api/gallery", { cache: "no-store" });
      if (!response.ok) throw new Error("Failed to fetch gallery");
      const data = await response.json();
      setGalleryImages(data || []);
    } catch (error) {
      console.error("Error loading gallery images:", error);
      setGalleryImages([]);
    }
  };

  if (isLoading) {
    return (
      <section
        id="gallery-dynamic"
        className="scroll-mt-16 py-16 md:py-24 px-6"
      >
        <Container>
          <SectionTitle
            title="Galerie"
            subtitle="Načítám obsah..."
            accentColor="sky"
          />
        </Container>
      </section>
    );
  }

  if (galleryImages.length === 0) return null;

  return (
    <section
      id="gallery-dynamic"
      className="scroll-mt-16 py-16 md:py-24 px-6 bg-gradient-to-br from-sky-50/50 via-white to-sky-100/50"
    >
      <Container>
        <SectionTitle
          title="Fotky z lekcí"
          subtitle="Nahlédněte do atmosféry lekcí"
          accentColor="sky"
        />
      </Container>

      {/* Gallery Images Grid */}
      {galleryImages.length > 0 && (
        <div className="mt-12 md:px-6 max-w-7xl mx-auto mb-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 auto-rows-[180px] gap-3">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className={`${image.span || "md:col-span-2 md:row-span-2"} relative overflow-hidden rounded-lg cursor-pointer group`}
                onClick={() => setLightboxIndex(index)}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-sky-950/0 group-hover:bg-sky-950/30 transition-all duration-300 flex items-end p-4">
                  <p className="text-white text-sm font-medium font-poppins opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    {image.alt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Image Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-sky-950/90 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            className="absolute top-5 right-5 w-10 h-10 z-50 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center text-white"
            onClick={() => setLightboxIndex(null)}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
          <button
            className="absolute left-5 w-10 h-10 z-50 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center text-white"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(
                (lightboxIndex - 1 + galleryImages.length) %
                  galleryImages.length,
              );
            }}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div
            className="relative w-full h-dvh overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[lightboxIndex].url}
              alt={galleryImages[lightboxIndex].alt}
              className="w-full h-full object-contain"
            />
          </div>
          <button
            className="absolute right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center text-white"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((lightboxIndex + 1) % galleryImages.length);
            }}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
            {galleryImages.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(i);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${i === lightboxIndex ? "bg-white w-4" : "bg-white/40"}`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
