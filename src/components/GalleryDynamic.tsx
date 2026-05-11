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
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    fetchGalleryImages().finally(() => setIsLoading(false));
  }, []);

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
        <SectionTitle title="Fotky z lekcí" accentColor="sky" />
      </Container>

      {/* Gallery Images Grid */}
      {galleryImages.length > 0 && (
        <div className="mt-12 md:px-6 max-w-7xl mx-auto mb-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 auto-rows-[180px] gap-3">
            {galleryImages.map((image) => (
              <div
                key={image.id}
                className={`${image.span || "md:col-span-2 md:row-span-2"} relative overflow-hidden rounded-lg cursor-pointer group`}
                onClick={() => setLightboxImage(image)}
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
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <img
              src={lightboxImage.url}
              alt={lightboxImage.alt}
              className="w-full h-auto rounded-lg"
            />
            <button
              className="absolute top-4 right-4 bg-white/80 hover:bg-white text-slate-900 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
              onClick={() => setLightboxImage(null)}
            >
              ✕
            </button>
            {lightboxImage.title && (
              <div className="mt-4 text-white">
                <h3 className="text-lg font-semibold">{lightboxImage.title}</h3>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
