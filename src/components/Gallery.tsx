"use client";
import { useEffect, useState } from "react";
import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import Image from "next/image";

const photos = [
  {
    src: "/assets/eliska/IMG_0003.jpg",
    alt: "",
    span: "md:col-span-4 md:row-span-2",
  },
  {
    src: "/assets/eliska/IMG_002.jpg",
    alt: "",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    src: "/assets/eliska/IMG_00011.jpg",
    alt: "",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    src: "/assets/eliska/IMG_0004.jpg",
    alt: "",
    span: "md:col-span-3 md:row-span-2",
  },
  {
    src: "/assets/galerie/IMG_3495.jpeg",
    alt: "",
    span: "md:col-span-3 md:row-span-1",
  },
  {
    src: "/assets/galerie/IMG_9680.JPG",
    alt: "",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/assets/galerie/IMG_9690.JPG",
    alt: "",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    src: "/assets/galerie/IMG_9730.jpg",
    alt: "",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    src: "/assets/galerie/IMG_9736.jpg",
    alt: "",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    src: "/assets/galerie/IMG_9746.jpg",
    alt: "",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/assets/galerie/IMG_9754.jpg",
    alt: "",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    src: "/assets/galerie/IMG_9757.jpg",
    alt: "",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    src: "/assets/galerie/IMG_9763.jpg",
    alt: "",
    span: "md:col-span-3 md:row-span-1",
  },
  {
    src: "/assets/galerie/IMG_9817.jpg",
    alt: "",
    span: "md:col-span-3 md:row-span-1",
  },
  {
    src: "/assets/galerie/IMG_9826.jpg",
    alt: "",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/assets/galerie/IMG_9852.jpg",
    alt: "",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    src: "/assets/galerie/IMG_9857.jpg",
    alt: "",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    src: "/assets/galerie/IMG_9865.jpg",
    alt: "",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    src: "/assets/galerie/IMG_9870.jpg",
    alt: "",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    src: "/assets/galerie/IMG_9898.JPG",
    alt: "",
    span: "md:col-span-4 md:row-span-2",
  },
  {
    src: "/assets/galerie/IMG_9915.jpg",
    alt: "",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    src: "/assets/galerie/IMG_9921.jpg",
    alt: "",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    src: "/assets/galerie/IMG_9922.jpg",
    alt: "",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    src: "/assets/galerie/IMG_9935.jpg",
    alt: "",
    span: "md:col-span-2 md:row-span-1",
  },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [isLightboxLoading, setIsLightboxLoading] = useState(false);

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
      <div className="mt-12 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 auto-rows-[180px] gap-3">
          {photos.map((photo, i) => (
            <div
              key={i}
              className={`${photo.span} relative overflow-hidden rounded-3xl cursor-pointer group`}
              onClick={() => openLightbox(i)}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-sky-950/0 group-hover:bg-sky-950/30 transition-all duration-300 flex items-end p-4">
                <p className="text-white text-sm font-medium font-poppins opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  {photo.alt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-sky-950/90 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          {/* Close */}
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

          {/* Prev */}
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

          {/* Image */}
          <div
            className="relative w-full max-w-4xl aspect-[4/3] rounded-2xl overflow-hidden"
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

          {/* Next */}
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

          {/* Counter */}
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
