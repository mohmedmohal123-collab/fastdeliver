import { Progress } from "@/components/ui/progress";
import { createActorWithConfig } from "@caffeineai/core-infrastructure";
import { CheckCircle2, ImageIcon, Loader2, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { ExternalBlob } from "../backend";
import { t } from "../i18n";
import type { Lang } from "../i18n";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  lang: Lang;
  /** Optional label text — pass empty string to suppress */
  label?: string;
  /** OCID marker prefix, e.g. "admin.products" */
  ocidPrefix?: string;
}

type UploadState = "idle" | "uploading" | "done" | "error";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

// We can't import StorageClient directly (it's a transitive dep), but we can
// reach it through createActorWithConfig by providing a factory that captures
// the uploadFile callback and returns it as the "actor".
async function uploadImageToStorage(
  bytes: Uint8Array,
  onProgress: (pct: number) => void,
): Promise<string> {
  type UploadCapture = {
    uploadFile: (file: ExternalBlob) => Promise<Uint8Array>;
    downloadFile: (file: Uint8Array) => Promise<ExternalBlob>;
  };

  const capture = await createActorWithConfig<UploadCapture>(
    (_canisterId, uploadFile, downloadFile) => ({
      uploadFile,
      downloadFile,
    }),
  );

  const blob = ExternalBlob.fromBytes(
    bytes as unknown as Uint8Array<ArrayBuffer>,
  ).withUploadProgress(onProgress);
  const resultBytes = await capture.uploadFile(blob);
  const downloadedBlob = await capture.downloadFile(resultBytes);
  return downloadedBlob.getDirectURL();
}

export function ImageUploader({
  value,
  onChange,
  lang,
  label,
  ocidPrefix = "image_uploader",
}: ImageUploaderProps) {
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function uploadFile(file: File) {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setErrorMsg(
        lang === "ar"
          ? "نوع الملف غير مدعوم. يرجى اختيار JPG أو PNG أو WebP"
          : "Unsupported file type. Please pick JPG, PNG, or WebP",
      );
      setUploadState("error");
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      setErrorMsg(
        lang === "ar"
          ? "حجم الملف أكبر من 5 ميجابايت"
          : "File exceeds 5 MB limit",
      );
      setUploadState("error");
      return;
    }

    setUploadState("uploading");
    setProgress(0);
    setErrorMsg("");

    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const directUrl = await uploadImageToStorage(bytes, (pct) => {
        setProgress(Math.round(pct));
      });
      onChange(directUrl);
      setProgress(100);
      setUploadState("done");
    } catch (err) {
      console.error("Image upload failed:", err);
      setErrorMsg(
        lang === "ar"
          ? "فشل رفع الصورة. يرجى المحاولة مرة أخرى"
          : "Upload failed. Please try again",
      );
      setUploadState("error");
    }
  }

  function handleFileSelect(files: FileList | null) {
    const file = files?.[0];
    if (file) uploadFile(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  }

  function clearImage() {
    onChange("");
    setUploadState("idle");
    setProgress(0);
    setErrorMsg("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  const hasImage = Boolean(value);

  return (
    <div className="space-y-2">
      {label !== "" && label !== undefined && (
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
      )}

      {/* Drop zone / preview area */}
      <button
        type="button"
        className={[
          "relative w-full rounded-xl border-2 border-dashed transition-all duration-200 overflow-hidden text-left",
          dragOver
            ? "border-primary bg-primary/5 scale-[1.01]"
            : "border-border bg-muted/10 hover:border-primary/50 hover:bg-muted/20",
          "cursor-pointer",
        ].join(" ")}
        style={{ minHeight: "120px" }}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        data-ocid={`${ocidPrefix}.dropzone`}
        aria-label={
          lang === "ar"
            ? "اضغط أو اسحب صورة للرفع"
            : "Click or drag to upload image"
        }
      >
        {/* Image preview */}
        {hasImage && uploadState !== "uploading" && (
          <div className="w-full h-full flex items-center justify-center p-2">
            <img
              src={value}
              alt={lang === "ar" ? "معاينة الصورة" : "Image preview"}
              className="max-h-40 max-w-full object-contain rounded-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        )}

        {/* Upload prompt — no image */}
        {!hasImage && uploadState === "idle" && (
          <div className="flex flex-col items-center justify-center py-8 gap-2 text-center px-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Upload className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm font-medium text-foreground">
              {lang === "ar" ? "اضغط أو اسحب صورة" : "Click or drag an image"}
            </p>
            <p className="text-xs text-muted-foreground">
              {lang === "ar"
                ? "JPG، PNG، WebP — حتى 5 ميجابايت"
                : "JPG, PNG, WebP — up to 5 MB"}
            </p>
          </div>
        )}

        {/* Upload error prompt — no image */}
        {!hasImage && uploadState === "error" && (
          <div className="flex flex-col items-center justify-center py-8 gap-2 text-center px-4">
            <div className="p-3 rounded-full bg-destructive/10">
              <Upload className="w-5 h-5 text-destructive" />
            </div>
            <p className="text-sm font-medium text-foreground">
              {lang === "ar" ? "اضغط للمحاولة مرة أخرى" : "Click to retry"}
            </p>
          </div>
        )}

        {/* Uploading state */}
        {uploadState === "uploading" && (
          <div className="flex flex-col items-center justify-center py-8 gap-3 px-6">
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
            <p className="text-sm text-muted-foreground">
              {lang === "ar" ? "جار الرفع..." : "Uploading..."}
            </p>
            <Progress value={progress} className="w-full h-1.5" />
            <p className="text-xs text-muted-foreground font-mono">
              {progress}%
            </p>
          </div>
        )}

        {/* Done badge overlay */}
        {uploadState === "done" && hasImage && (
          <div className="absolute top-2 left-2 flex items-center gap-1 bg-green-500/90 text-white rounded-full px-2 py-0.5 text-xs font-medium pointer-events-none">
            <CheckCircle2 className="w-3 h-3" />
            {lang === "ar" ? "تم الرفع" : "Uploaded"}
          </div>
        )}

        {/* Hover overlay — change image */}
        {hasImage && uploadState !== "uploading" && (
          <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-all duration-200 flex items-center justify-center opacity-0 hover:opacity-100 rounded-xl pointer-events-none">
            <div className="flex items-center gap-1.5 text-white text-xs font-medium bg-black/60 px-3 py-1.5 rounded-full">
              <ImageIcon className="w-3.5 h-3.5" />
              {lang === "ar" ? "تغيير الصورة" : "Change image"}
            </div>
          </div>
        )}
      </button>

      {/* Error message */}
      {uploadState === "error" && errorMsg && (
        <p
          className="text-xs text-destructive flex items-center gap-1"
          data-ocid={`${ocidPrefix}.upload_error`}
        >
          <X className="w-3 h-3 flex-shrink-0" />
          {errorMsg}
        </p>
      )}

      {/* Remove image button */}
      {hasImage && uploadState !== "uploading" && (
        <button
          type="button"
          onClick={clearImage}
          className="text-xs text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1"
          data-ocid={`${ocidPrefix}.clear_image_button`}
        >
          <X className="w-3 h-3" />
          {lang === "ar" ? "إزالة الصورة" : "Remove image"}
        </button>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => handleFileSelect(e.target.files)}
        data-ocid={`${ocidPrefix}.upload_button`}
      />
    </div>
  );
}
