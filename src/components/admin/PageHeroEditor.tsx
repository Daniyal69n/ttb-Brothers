"use client";

import Image from "next/image";
import { useState } from "react";
import { Camera, Save, Trash2 } from "lucide-react";

export interface HeroEditorCopy {
  badge: string;
  title: string;
  description: string;
}

interface PageHeroEditorProps {
  pageLabel: string;
  copy: HeroEditorCopy;
  images: string[];
  showCopy?: boolean;
  onSaveCopy: (badge: string, title: string, description: string) => void;
  onAddImage: (imageUrl: string) => void;
  onDeleteImage: (index: number) => void;
  onUploadImage: (
    file: File,
    onUploaded: (imageUrl: string) => void,
    onError: () => void
  ) => void;
}

export function PageHeroEditor({
  pageLabel,
  copy,
  images,
  showCopy = true,
  onSaveCopy,
  onAddImage,
  onDeleteImage,
  onUploadImage,
}: PageHeroEditorProps) {
  const [imageUrl, setImageUrl] = useState("");
  const [uploadsInProgress, setUploadsInProgress] = useState(0);

  return (
    <section className="space-y-4 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5">
      <div>
        <h3 className="flex items-center gap-2 text-sm font-bold text-white">
          <Camera className="h-4 w-4 text-brand-purple" />
          {pageLabel} Hero &amp; Carousel
        </h3>
        <p className="mt-1 text-xs text-neutral-400">
          Edit this page&apos;s hero text and manage its rotating background images.
        </p>
      </div>

      {showCopy && (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            onSaveCopy(
              String(formData.get("badge") ?? "").trim(),
              String(formData.get("title") ?? "").trim(),
              String(formData.get("description") ?? "").trim()
            );
          }}
          className="space-y-3"
        >
          <label className="block text-xs font-medium text-neutral-300">
            Badge / eyebrow text
            <input
              name="badge"
              defaultValue={copy.badge}
              className="mt-1 w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3.5 py-2.5 text-xs text-white focus:border-brand-purple focus:outline-none"
            />
          </label>
          <label className="block text-xs font-medium text-neutral-300">
            Headline
            <input
              name="title"
              defaultValue={copy.title}
              required
              className="mt-1 w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3.5 py-2.5 text-xs text-white focus:border-brand-purple focus:outline-none"
            />
          </label>
          <label className="block text-xs font-medium text-neutral-300">
            Description
            <textarea
              name="description"
              defaultValue={copy.description}
              rows={3}
              className="mt-1 w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3.5 py-2.5 text-xs text-white focus:border-brand-purple focus:outline-none"
            />
          </label>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-purple px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-brand-purple/90"
          >
            <Save className="h-4 w-4" />
            Save Hero Text
          </button>
        </form>
      )}

      <div className="space-y-3 border-t border-neutral-800 pt-4">
        <h4 className="text-xs font-semibold text-white">Carousel images</h4>
        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <input
            type="text"
            value={imageUrl}
            onChange={(event) => setImageUrl(event.currentTarget.value)}
            placeholder="Paste an image URL or /images/... path"
            className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3.5 py-2.5 text-xs text-white focus:border-brand-purple focus:outline-none"
          />
          <button
            type="button"
            disabled={!imageUrl.trim()}
            onClick={() => {
              onAddImage(imageUrl.trim());
              setImageUrl("");
            }}
            className="rounded-xl bg-neutral-800 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Add image URL
          </button>
        </div>
        <label className="block text-xs font-medium text-neutral-300">
          Upload images from your device
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={(event) => {
              const files = Array.from(event.currentTarget.files ?? []);
              event.currentTarget.value = "";
              if (files.length === 0) return;
              setUploadsInProgress((count) => count + files.length);
              files.forEach((file) => {
                let finished = false;
                const finishUpload = () => {
                  if (finished) return;
                  finished = true;
                  setUploadsInProgress((count) => Math.max(0, count - 1));
                };
                onUploadImage(
                  file,
                  (uploadedImageUrl) => {
                    onAddImage(uploadedImageUrl);
                    finishUpload();
                  },
                  finishUpload
                );
              });
            }}
            className="mt-1 block w-full text-xs text-neutral-400 file:mr-3 file:rounded-lg file:border-0 file:bg-neutral-800 file:px-3 file:py-2 file:text-xs file:text-white hover:file:bg-neutral-700"
          />
        </label>
        {uploadsInProgress > 0 && (
          <p className="text-xs text-brand-purple">
            Uploading {uploadsInProgress} image{uploadsInProgress === 1 ? "" : "s"}...
          </p>
        )}
        {images.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {images.map((src, index) => (
              <div
                key={`${src}-${index}`}
                className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950"
              >
                <div className="relative aspect-video bg-neutral-900">
                  <Image
                    src={src}
                    alt={`${pageLabel} hero slide ${index + 1}`}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => onDeleteImage(index)}
                  className="flex w-full items-center justify-center gap-1.5 px-2 py-2 text-xs text-red-300 transition-colors hover:bg-red-950/40"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Remove image
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-neutral-700 px-4 py-6 text-center text-xs text-neutral-500">
            No hero images set for this page. Add images above to enable its background carousel.
          </p>
        )}
      </div>
    </section>
  );
}
