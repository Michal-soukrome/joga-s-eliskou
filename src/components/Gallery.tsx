"use client";
import { useEffect, useState } from "react";
import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import Image from "next/image";

const photos = [
  // Row 1-2: portrait pair

  {
    src: "/assets/galerie/IMG_3495.jpeg",
    alt: "",
    span: "md:col-span-2 md:row-span-2",
  },

  // Rows 4-5: portrait trio
  {
    src: "/assets/galerie/IMG_9680.JPG",
    alt: "",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/assets/galerie/IMG_9690.JPG",
    alt: "",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/assets/galerie/IMG_9730.jpg",
    alt: "",
    span: "md:col-span-2 md:row-span-2",
  },

  // Row 6: landscape + 2 portraits beside it
  {
    src: "/assets/galerie/IMG_9870.JPG",
    alt: "",
    span: "md:col-span-4 md:row-span-3",
  },
  {
    src: "/assets/galerie/IMG_9736.jpg",
    alt: "",
    span: "md:col-span-2 md:row-span-2",
  },
  // Row 7 fills in:
  {
    src: "/assets/galerie/IMG_9754.jpg",
    alt: "",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/assets/galerie/IMG_9757.jpg",
    alt: "",
    span: "md:col-span-2 md:row-span-2",
  },

  // Rows 8-9: portrait trio
  {
    src: "/assets/galerie/IMG_9763.jpg",
    alt: "",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/assets/galerie/IMG_9817.jpg",
    alt: "",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/assets/galerie/IMG_9826.jpg",
    alt: "",
    span: "md:col-span-2 md:row-span-2",
  },

  // Rows 10-11: portrait trio
  {
    src: "/assets/galerie/IMG_9852.jpg",
    alt: "",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/assets/galerie/IMG_9857.jpg",
    alt: "",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    src: "/assets/galerie/IMG_9865.jpg",
    alt: "",
    span: "md:col-span-2 md:row-span-3",
  },
  {
    src: "/assets/galerie/IMG_9898.JPG",
    alt: "",
    span: "md:col-span-4 md:row-span-2",
  },

  // Rows 13-14: portrait pair

  {
    src: "/assets/galerie/IMG_9921.jpg",
    alt: "",
    span: "md:col-span-3 md:row-span-2",
  },

  {
    src: "/assets/galerie/IMG_9922.jpg",
    alt: "",
    span: "md:col-span-3 md:row-span-2",
  },
  // Row 12: landscape full width
  {
    src: "/assets/galerie/IMG_9935.jpg",
    alt: "",
    span: "md:col-span-6 md:row-span-3",
  },
];

const INITIAL_COUNT = 6;

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [isLightboxLoading, setIsLightboxLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const visiblePhotos = photos.slice(0, visibleCount);
  const hasMore = visibleCount < photos.length;

  useEffect(() => {
    if (lightbox === null) return;

    setIsLightboxLoading(true);

    const nextImage = new window.Image();
    const prevImage = new window.Image();

    nextImage.src = photos[(lightbox + 1) % photos.length].src;
    prevImage.src = photos[(lightbox - 1 + photos.length) % photos.length].src;

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightbox(null);
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setLightbox((current) =>
          current === null ? null : (current + 1) % photos.length,
        );
        setIsLightboxLoading(true);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setLightbox((current) =>
          current === null
            ? null
            : (current - 1 + photos.length) % photos.length,
        );
        setIsLightboxLoading(true);
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => {
      nextImage.src = "";
      prevImage.src = "";
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [lightbox]);

  const openLightbox = (index: number) => {
    setLightbox(index);
    setIsLightboxLoading(true);
  };

  return (
    <section
      id="gallery"
      className="scroll-mt-16 py-16 md:py-24 px-6 bg-gradient-to-br from-sky-50/50 via-white to-sky-100/50"
    >
      <Container>
        <SectionTitle
          title="Galerie"
          subtitle="Nahlédněte do atmosféry lekcí"
          accentColor="emerald"
        />
      </Container>

      {/* Full-width grid */}
      <div className="mt-12 md:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 auto-rows-[180px] gap-3">
          {visiblePhotos.map((photo, i) => (
            <div
              key={photo.src}
              className={`${photo.span} relative overflow-hidden rounded-lg cursor-pointer group`}
              onClick={() => openLightbox(i)}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-sky-950/0 group-hover:bg-sky-950/30 transition-all duration-300 flex items-end p-4">
                <p className="text-white text-sm font-medium font-poppins opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  {photo.alt}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Load more */}
        {hasMore && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() =>
                setVisibleCount((c) => Math.min(c + 9, photos.length))
              }
              className="px-8 py-3 rounded-full border border-sky-200 text-sky-700 text-sm font-medium font-poppins hover:bg-sky-50 transition-colors duration-200"
            >
              Načíst další
            </button>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-sky-950/90 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center text-white"
            onClick={() => setLightbox(null)}
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
            className="absolute left-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center text-white"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox - 1 + photos.length) % photos.length);
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
            className="relative w-full max-w-4xl aspect-[4/3] rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[lightbox].src.replace(/w=\d+/, "w=1200")}
              alt={photos[lightbox].alt}
              fill
              className="object-contain"
              sizes="100vw"
              onLoadingComplete={() => setIsLightboxLoading(false)}
            />
            {isLightboxLoading && (
              <div className="absolute inset-0 bg-sky-950/50 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-4 border-white/20 border-t-white animate-spin" />
              </div>
            )}
          </div>

          <button
            className="absolute right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center text-white"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox + 1) % photos.length);
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
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setLightbox(i);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${i === lightbox ? "bg-white w-4" : "bg-white/40"}`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
