import { defineComponent, ref, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrRenderComponent, ssrIncludeBooleanAttr } from "vue/server-renderer";
import "@inertiajs/vue3";
import { Star, Loader2, X, Upload, Image } from "lucide-vue-next";
import "./AppLayout-Dl_X7-UB.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ImageUploadZone",
  __ssrInlineRender: true,
  props: {
    productId: {},
    existingImages: { default: () => [] },
    maxImages: { default: 10 },
    modelValue: { default: () => [] }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isDragging = ref(false);
    const selectedFiles = ref([...props.modelValue]);
    const previews = ref([]);
    const deletingImages = ref(/* @__PURE__ */ new Set());
    const settingPrimary = ref(false);
    const remainingSlots = computed(() => {
      return props.maxImages - (props.existingImages.length + selectedFiles.value.length);
    });
    const canAddMore = computed(() => remainingSlots.value > 0);
    const getImageUrl = (url, size = "medium") => {
      if (url.includes("/original/")) {
        return `/storage/${url.replace("/original/", `/${size}/`)}`;
      }
      return `/storage/${url}`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}>`);
      if (__props.existingImages.length > 0) {
        _push(`<div class="space-y-2"><label class="block text-sm font-medium text-gray-700 dark:text-gray-300"> Gambar Produk (${ssrInterpolate(__props.existingImages.length)}/${ssrInterpolate(__props.maxImages)}) </label><div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"><!--[-->`);
        ssrRenderList(__props.existingImages, (image) => {
          _push(`<div class="${ssrRenderClass([[
            image.is_primary ? "border-yellow-400 ring-2 ring-yellow-400 ring-offset-2" : "border-gray-200 dark:border-gray-700"
          ], "group relative aspect-square overflow-hidden rounded-lg border-2 transition-all"])}"><img${ssrRenderAttr("src", getImageUrl(image.url, "small"))}${ssrRenderAttr("alt", image.alt_text)} class="h-full w-full object-cover">`);
          if (image.is_primary) {
            _push(`<div class="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-yellow-400 px-2 py-1 text-xs font-medium text-yellow-900">`);
            _push(ssrRenderComponent(unref(Star), {
              size: 12,
              class: "fill-current"
            }, null, _parent));
            _push(`<span>Utama</span></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">`);
          if (!image.is_primary) {
            _push(`<button type="button"${ssrIncludeBooleanAttr(settingPrimary.value || deletingImages.value.has(image.id)) ? " disabled" : ""} class="rounded-full bg-yellow-400 p-2 text-yellow-900 transition-colors hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-50" title="Jadikan gambar utama">`);
            _push(ssrRenderComponent(unref(Star), { size: 16 }, null, _parent));
            _push(`</button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<button type="button"${ssrIncludeBooleanAttr(deletingImages.value.has(image.id) || settingPrimary.value) ? " disabled" : ""} class="rounded-full bg-red-500 p-2 text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50" title="Hapus gambar">`);
          if (deletingImages.value.has(image.id)) {
            _push(ssrRenderComponent(unref(Loader2), {
              size: 16,
              class: "animate-spin"
            }, null, _parent));
          } else {
            _push(ssrRenderComponent(unref(X), { size: 16 }, null, _parent));
          }
          _push(`</button></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (previews.value.length > 0) {
        _push(`<div class="space-y-2"><label class="block text-sm font-medium text-gray-700 dark:text-gray-300"> Gambar Baru (${ssrInterpolate(previews.value.length)}) </label><div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"><!--[-->`);
        ssrRenderList(previews.value, (preview, index) => {
          _push(`<div class="group relative aspect-square overflow-hidden rounded-lg border-2 border-gray-200 dark:border-gray-700"><img${ssrRenderAttr("src", preview.url)}${ssrRenderAttr("alt", preview.file.name)} class="h-full w-full object-cover"><div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-2 py-1"><p class="truncate text-xs text-white">${ssrInterpolate(preview.file.name)}</p></div><button type="button" class="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity hover:bg-red-600 group-hover:opacity-100" title="Hapus">`);
          _push(ssrRenderComponent(unref(X), { size: 16 }, null, _parent));
          _push(`</button></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (canAddMore.value) {
        _push(`<div class="space-y-2"><label class="block text-sm font-medium text-gray-700 dark:text-gray-300"> Tambah Gambar (${ssrInterpolate(remainingSlots.value)} slot tersisa) </label><div class="${ssrRenderClass([[
          isDragging.value ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20" : "border-gray-300 bg-gray-50 hover:border-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:hover:border-gray-500"
        ], "relative cursor-pointer rounded-lg border-2 border-dashed transition-colors"])}"><input type="file" accept="image/jpeg,image/png,image/jpg,image/webp" multiple class="absolute inset-0 cursor-pointer opacity-0"${ssrIncludeBooleanAttr(!canAddMore.value) ? " disabled" : ""}><div class="flex flex-col items-center justify-center gap-3 px-6 py-8"><div class="${ssrRenderClass([
          isDragging.value ? "bg-blue-100 dark:bg-blue-900/30" : "bg-gray-100 dark:bg-gray-700",
          "rounded-full p-3"
        ])}">`);
        _push(ssrRenderComponent(unref(Upload), {
          size: 32,
          class: isDragging.value ? "text-blue-600 dark:text-blue-400" : "text-gray-400"
        }, null, _parent));
        _push(`</div><div class="text-center"><p class="text-sm font-medium text-gray-700 dark:text-gray-300">${ssrInterpolate(isDragging.value ? "Lepaskan file di sini" : "Drag & drop gambar atau klik untuk memilih")}</p><p class="mt-1 text-xs text-gray-500 dark:text-gray-400"> JPG, PNG, atau WebP (maks. 2MB per file) </p><p class="mt-1 text-xs font-medium text-gray-600 dark:text-gray-400"> Maksimal ${ssrInterpolate(__props.maxImages)} gambar total </p></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="rounded-lg bg-blue-50 p-3 dark:bg-blue-950/20"><div class="flex gap-2">`);
      _push(ssrRenderComponent(unref(Image), {
        size: 20,
        class: "shrink-0 text-blue-600 dark:text-blue-400"
      }, null, _parent));
      _push(`<div class="text-sm text-blue-800 dark:text-blue-300"><p class="font-medium">Tips:</p><ul class="mt-1 list-inside list-disc space-y-1"><li>Gambar pertama otomatis menjadi gambar utama</li><li>Klik ikon bintang untuk mengubah gambar utama</li><li>Semua gambar akan di-generate dalam 5 ukuran responsif</li><li>Format akan dikonversi ke WebP untuk performa optimal</li></ul></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/admin/ImageUploadZone.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
