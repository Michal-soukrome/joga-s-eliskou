"use client";
import { useEffect, useState } from "react";
import type { StaticImageData } from "next/image";
import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import Image from "next/image";

import img3495 from "../../public/assets/galerie/IMG_3495.jpeg";
import img9730 from "../../public/assets/galerie/IMG_9730.jpg";
import img9852 from "../../public/assets/galerie/IMG_9852.jpg";
import img9680 from "../../public/assets/galerie/IMG_9680.jpg";
import img9870 from "../../public/assets/galerie/IMG_9870.jpg";
import img9736 from "../../public/assets/galerie/IMG_9736.jpg";
import img9754 from "../../public/assets/galerie/IMG_9754.jpg";
import img9757 from "../../public/assets/galerie/IMG_9757.jpg";
import img9763 from "../../public/assets/galerie/IMG_9763.jpg";
import img9817 from "../../public/assets/galerie/IMG_9817.jpg";
import img9826 from "../../public/assets/galerie/IMG_9826.jpg";
import img9690 from "../../public/assets/galerie/IMG_9690.jpg";
import img9857 from "../../public/assets/galerie/IMG_9857.jpg";
import img9865 from "../../public/assets/galerie/IMG_9865.jpg";
import img9898 from "../../public/assets/galerie/IMG_9898.JPG";
import img9921 from "../../public/assets/galerie/IMG_9921.jpg";
import img9922 from "../../public/assets/galerie/IMG_9922.jpg";
import img9935 from "../../public/assets/galerie/IMG_9935.jpg";

type Photo = {
  src: StaticImageData;
  alt: string;
  span: string;
};

const photos: Photo[] = [
  { src: img3495, alt: "", span: "md:col-span-2 md:row-span-2" },
  { src: img9730, alt: "", span: "md:col-span-2 md:row-span-2" },
  { src: img9852, alt: "", span: "md:col-span-2 md:row-span-2" },
  { src: img9680, alt: "", span: "md:col-span-2 md:row-span-2" },

  { src: img9870, alt: "", span: "md:col-span-4 md:row-span-3" },
  { src: img9736, alt: "", span: "md:col-span-2 md:row-span-2" },

  { src: img9754, alt: "", span: "md:col-span-2 md:row-span-2" },
  { src: img9757, alt: "", span: "md:col-span-2 md:row-span-2" },

  { src: img9763, alt: "", span: "md:col-span-2 md:row-span-2" },
  { src: img9817, alt: "", span: "md:col-span-2 md:row-span-2" },
  { src: img9826, alt: "", span: "md:col-span-2 md:row-span-2" },

  { src: img9690, alt: "", span: "md:col-span-2 md:row-span-2" },
  { src: img9857, alt: "", span: "md:col-span-2 md:row-span-1" },
  { src: img9865, alt: "", span: "md:col-span-2 md:row-span-3" },
  { src: img9898, alt: "", span: "md:col-span-4 md:row-span-2" },

  { src: img9921, alt: "", span: "md:col-span-3 md:row-span-2" },
  { src: img9922, alt: "", span: "md:col-span-3 md:row-span-2" },

  { src: img9935, alt: "", span: "md:col-span-6 md:row-span-3" },
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

    nextImage.src = photos[(lightbox + 1) % photos.length].src.src;
    prevImage.src =
      photos[(lightbox - 1 + photos.length) % photos.length].src.src;

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
              key={photo.src.src}
              className={`${photo.span} relative overflow-hidden rounded-lg cursor-pointer group`}
              onClick={() => openLightbox(i)}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                placeholder="blur"
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
              src={photos[lightbox].src}
              alt={photos[lightbox].alt}
              fill
              className="object-contain"
              sizes="100vw"
              onLoad={() => setIsLightboxLoading(false)}
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
