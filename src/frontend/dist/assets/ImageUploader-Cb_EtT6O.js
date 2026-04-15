import { r as reactExports, j as jsxRuntimeExports, f as createActorWithConfig } from "./index-DzhgL1zh.js";
import { P as Progress } from "./progress-BVDvPjEH.js";
import { E as ExternalBlob } from "./backend-0agJt8Zn.js";
import { c as createLucideIcon } from "./index-Kcs4saGQ.js";
import { L as LoaderCircle } from "./loader-circle-CIOMiYQL.js";
import { C as CircleCheck } from "./circle-check-NZHUw46K.js";
import { X } from "./Layout-Dntny8Ic.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
];
const Image = createLucideIcon("image", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE_BYTES = 5 * 1024 * 1024;
async function uploadImageToStorage(bytes, onProgress) {
  const capture = await createActorWithConfig(
    (_canisterId, uploadFile, downloadFile) => ({
      uploadFile,
      downloadFile
    })
  );
  const blob = ExternalBlob.fromBytes(
    bytes
  ).withUploadProgress(onProgress);
  const resultBytes = await capture.uploadFile(blob);
  const downloadedBlob = await capture.downloadFile(resultBytes);
  return downloadedBlob.getDirectURL();
}
function ImageUploader({
  value,
  onChange,
  lang,
  label,
  ocidPrefix = "image_uploader"
}) {
  const [uploadState, setUploadState] = reactExports.useState("idle");
  const [progress, setProgress] = reactExports.useState(0);
  const [errorMsg, setErrorMsg] = reactExports.useState("");
  const [dragOver, setDragOver] = reactExports.useState(false);
  const fileInputRef = reactExports.useRef(null);
  async function uploadFile(file) {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setErrorMsg(
        lang === "ar" ? "نوع الملف غير مدعوم. يرجى اختيار JPG أو PNG أو WebP" : "Unsupported file type. Please pick JPG, PNG, or WebP"
      );
      setUploadState("error");
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      setErrorMsg(
        lang === "ar" ? "حجم الملف أكبر من 5 ميجابايت" : "File exceeds 5 MB limit"
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
        lang === "ar" ? "فشل رفع الصورة. يرجى المحاولة مرة أخرى" : "Upload failed. Please try again"
      );
      setUploadState("error");
    }
  }
  function handleFileSelect(files) {
    const file = files == null ? void 0 : files[0];
    if (file) uploadFile(file);
  }
  function handleDrop(e) {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    label !== "" && label !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        className: [
          "relative w-full rounded-xl border-2 border-dashed transition-all duration-200 overflow-hidden text-left",
          dragOver ? "border-primary bg-primary/5 scale-[1.01]" : "border-border bg-muted/10 hover:border-primary/50 hover:bg-muted/20",
          "cursor-pointer"
        ].join(" "),
        style: { minHeight: "120px" },
        onClick: () => {
          var _a;
          return (_a = fileInputRef.current) == null ? void 0 : _a.click();
        },
        onDragOver: (e) => {
          e.preventDefault();
          setDragOver(true);
        },
        onDragLeave: () => setDragOver(false),
        onDrop: handleDrop,
        "data-ocid": `${ocidPrefix}.dropzone`,
        "aria-label": lang === "ar" ? "اضغط أو اسحب صورة للرفع" : "Click or drag to upload image",
        children: [
          hasImage && uploadState !== "uploading" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: value,
              alt: lang === "ar" ? "معاينة الصورة" : "Image preview",
              className: "max-h-40 max-w-full object-contain rounded-lg",
              onError: (e) => {
                e.target.style.display = "none";
              }
            }
          ) }),
          !hasImage && uploadState === "idle" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-8 gap-2 text-center px-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded-full bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-5 h-5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: lang === "ar" ? "اضغط أو اسحب صورة" : "Click or drag an image" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: lang === "ar" ? "JPG، PNG، WebP — حتى 5 ميجابايت" : "JPG, PNG, WebP — up to 5 MB" })
          ] }),
          !hasImage && uploadState === "error" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-8 gap-2 text-center px-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded-full bg-destructive/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-5 h-5 text-destructive" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: lang === "ar" ? "اضغط للمحاولة مرة أخرى" : "Click to retry" })
          ] }),
          uploadState === "uploading" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-8 gap-3 px-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-6 h-6 text-primary animate-spin" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: lang === "ar" ? "جار الرفع..." : "Uploading..." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: progress, className: "w-full h-1.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-mono", children: [
              progress,
              "%"
            ] })
          ] }),
          uploadState === "done" && hasImage && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-2 left-2 flex items-center gap-1 bg-green-500/90 text-white rounded-full px-2 py-0.5 text-xs font-medium pointer-events-none", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
            lang === "ar" ? "تم الرفع" : "Uploaded"
          ] }),
          hasImage && uploadState !== "uploading" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/0 hover:bg-black/30 transition-all duration-200 flex items-center justify-center opacity-0 hover:opacity-100 rounded-xl pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-white text-xs font-medium bg-black/60 px-3 py-1.5 rounded-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-3.5 h-3.5" }),
            lang === "ar" ? "تغيير الصورة" : "Change image"
          ] }) })
        ]
      }
    ),
    uploadState === "error" && errorMsg && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "p",
      {
        className: "text-xs text-destructive flex items-center gap-1",
        "data-ocid": `${ocidPrefix}.upload_error`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3 flex-shrink-0" }),
          errorMsg
        ]
      }
    ),
    hasImage && uploadState !== "uploading" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: clearImage,
        className: "text-xs text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1",
        "data-ocid": `${ocidPrefix}.clear_image_button`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" }),
          lang === "ar" ? "إزالة الصورة" : "Remove image"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: fileInputRef,
        type: "file",
        accept: "image/jpeg,image/png,image/webp",
        className: "hidden",
        onChange: (e) => handleFileSelect(e.target.files),
        "data-ocid": `${ocidPrefix}.upload_button`
      }
    )
  ] });
}
export {
  ImageUploader as I
};
