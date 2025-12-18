import { ref, onMounted, defineComponent, mergeProps, unref, useSSRContext, withCtx, renderSlot, createVNode, onUnmounted, toDisplayString, createTextVNode, createBlock, openBlock, Fragment, renderList, createCommentVNode } from "vue";
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { _ as _sfc_main$b, a as _sfc_main$c, b as _sfc_main$d } from "./AvatarImage-DWFQMckn.js";
import { c as cn, _ as _sfc_main$6 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$8, a as _sfc_main$a, b as _sfc_main$e, d as _sfc_main$f, c as _sfc_main$g } from "./CardTitle-sqUG0LTw.js";
import { createInjectionState } from "@vueuse/core";
import emblaCarouselVue from "embla-carousel-vue";
import { ArrowRight, ArrowLeft, Package, Users, Star, Truck, ChevronRight } from "lucide-vue-next";
import { _ as _sfc_main$9 } from "./CardCatalogProduct-Dx6KW7gl.js";
import { _ as _sfc_main$7 } from "./Ecommerce-CG0fcxUt.js";
import { Head, Link } from "@inertiajs/vue3";
import { e as _sfc_main$h } from "./DropdownMenuTrigger-B1v6pHML.js";
import "reka-ui";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "./index-BpQimeTM.js";
import "vue-sonner";
import "axios";
import "./index-D3PKcwoM.js";
import "./Input-BGi8wCMh.js";
import "./Label-16aMY2sx.js";
import "./SelectValue-BUnv4mQg.js";
import "./Checkbox-CIOQa2-J.js";
import "./useAppearance-gspEihnp.js";
const [useProvideCarousel, useInjectCarousel] = createInjectionState(
  ({
    opts,
    orientation,
    plugins
  }, emits) => {
    const [emblaNode, emblaApi] = emblaCarouselVue({
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y"
    }, plugins);
    function scrollPrev() {
      emblaApi.value?.scrollPrev();
    }
    function scrollNext() {
      emblaApi.value?.scrollNext();
    }
    const canScrollNext = ref(false);
    const canScrollPrev = ref(false);
    function onSelect(api) {
      canScrollNext.value = api?.canScrollNext() || false;
      canScrollPrev.value = api?.canScrollPrev() || false;
    }
    onMounted(() => {
      if (!emblaApi.value)
        return;
      emblaApi.value?.on("init", onSelect);
      emblaApi.value?.on("reInit", onSelect);
      emblaApi.value?.on("select", onSelect);
      emits("init-api", emblaApi.value);
    });
    return { carouselRef: emblaNode, carouselApi: emblaApi, canScrollPrev, canScrollNext, scrollPrev, scrollNext, orientation };
  }
);
function useCarousel() {
  const carouselState = useInjectCarousel();
  if (!carouselState)
    throw new Error("useCarousel must be used within a <Carousel />");
  return carouselState;
}
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "Carousel",
  __ssrInlineRender: true,
  props: {
    opts: {},
    plugins: {},
    orientation: { default: "horizontal" },
    class: {}
  },
  emits: ["init-api"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { canScrollNext, canScrollPrev, carouselApi, carouselRef, orientation, scrollNext, scrollPrev } = useProvideCarousel(props, emits);
    __expose({
      canScrollNext,
      canScrollPrev,
      carouselApi,
      carouselRef,
      orientation,
      scrollNext,
      scrollPrev
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(cn)("relative", props.class),
        role: "region",
        "aria-roledescription": "carousel",
        tabindex: "0"
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {
        canScrollNext: unref(canScrollNext),
        canScrollPrev: unref(canScrollPrev),
        carouselApi: unref(carouselApi),
        carouselRef: unref(carouselRef),
        orientation: unref(orientation),
        scrollNext: unref(scrollNext),
        scrollPrev: unref(scrollPrev)
      }, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/carousel/Carousel.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "CarouselContent",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    const { carouselRef, orientation } = useCarousel();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "carouselRef",
        ref: carouselRef,
        class: "overflow-hidden"
      }, _attrs))}><div${ssrRenderAttrs(mergeProps({
        class: unref(cn)(
          "flex",
          unref(orientation) === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          props.class
        )
      }, _ctx.$attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/carousel/CarouselContent.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "CarouselItem",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    const { orientation } = useCarousel();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        role: "group",
        "aria-roledescription": "slide",
        class: unref(cn)(
          "min-w-0 shrink-0 grow-0 basis-full",
          unref(orientation) === "horizontal" ? "pl-4" : "pt-4",
          props.class
        )
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/carousel/CarouselItem.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "CarouselNext",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    const { orientation, canScrollNext, scrollNext } = useCarousel();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$6), mergeProps({
        disabled: !unref(canScrollNext),
        class: unref(cn)(
          "touch-manipulation absolute h-8 w-8 rounded-full p-0",
          unref(orientation) === "horizontal" ? "-right-12 top-1/2 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
          props.class
        ),
        variant: "outline",
        onClick: unref(scrollNext)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, () => {
              _push2(ssrRenderComponent(unref(ArrowRight), { class: "h-4 w-4 text-current" }, null, _parent2, _scopeId));
              _push2(`<span class="sr-only"${_scopeId}>Next Slide</span>`);
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createVNode(unref(ArrowRight), { class: "h-4 w-4 text-current" }),
                createVNode("span", { class: "sr-only" }, "Next Slide")
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/carousel/CarouselNext.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CarouselPrevious",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    const { orientation, canScrollPrev, scrollPrev } = useCarousel();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$6), mergeProps({
        disabled: !unref(canScrollPrev),
        class: unref(cn)(
          "touch-manipulation absolute h-8 w-8 rounded-full p-0",
          unref(orientation) === "horizontal" ? "-left-12 top-1/2 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
          props.class
        ),
        variant: "outline",
        onClick: unref(scrollPrev)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, () => {
              _push2(ssrRenderComponent(unref(ArrowLeft), { class: "h-4 w-4 text-current" }, null, _parent2, _scopeId));
              _push2(`<span class="sr-only"${_scopeId}>Previous Slide</span>`);
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createVNode(unref(ArrowLeft), { class: "h-4 w-4 text-current" }),
                createVNode("span", { class: "sr-only" }, "Previous Slide")
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/carousel/CarouselPrevious.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Beranda",
  __ssrInlineRender: true,
  props: {
    banners: {},
    categories: {},
    featuredProducts: {},
    flashSaleProducts: {},
    testimonials: {},
    statistics: {},
    seo: {}
  },
  setup(__props) {
    const props = __props;
    const currentBannerIndex = ref(0);
    const flashSaleTimeLeft = ref({ hours: 5, minutes: 0, seconds: 0 });
    let bannerInterval;
    onMounted(() => {
      if (typeof document === "undefined") return;
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(props.seo.structuredData);
      document.head.appendChild(script);
      bannerInterval = setInterval(() => {
        currentBannerIndex.value = (currentBannerIndex.value + 1) % props.banners.length;
      }, 5e3);
      const countdownInterval = setInterval(() => {
        if (flashSaleTimeLeft.value.seconds > 0) {
          flashSaleTimeLeft.value.seconds--;
        } else if (flashSaleTimeLeft.value.minutes > 0) {
          flashSaleTimeLeft.value.minutes--;
          flashSaleTimeLeft.value.seconds = 59;
        } else if (flashSaleTimeLeft.value.hours > 0) {
          flashSaleTimeLeft.value.hours--;
          flashSaleTimeLeft.value.minutes = 59;
          flashSaleTimeLeft.value.seconds = 59;
        }
      }, 1e3);
      onUnmounted(() => {
        clearInterval(countdownInterval);
      });
    });
    onUnmounted(() => {
      if (bannerInterval) clearInterval(bannerInterval);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$7, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<title${_scopeId2}>${ssrInterpolate(props.seo.title)}</title><meta name="description"${ssrRenderAttr("content", props.seo.description)}${_scopeId2}><meta name="keywords"${ssrRenderAttr("content", props.seo.keywords)}${_scopeId2}><link rel="canonical"${ssrRenderAttr("href", props.seo.canonical)}${_scopeId2}><meta property="og:type"${ssrRenderAttr("content", props.seo.og.type)}${_scopeId2}><meta property="og:title"${ssrRenderAttr("content", props.seo.og.title)}${_scopeId2}><meta property="og:description"${ssrRenderAttr("content", props.seo.og.description)}${_scopeId2}><meta property="og:image"${ssrRenderAttr("content", props.seo.og.image)}${_scopeId2}><meta property="og:url"${ssrRenderAttr("content", props.seo.og.url)}${_scopeId2}><meta property="og:site_name"${ssrRenderAttr("content", props.seo.og.site_name)}${_scopeId2}><meta property="og:locale"${ssrRenderAttr("content", props.seo.og.locale)}${_scopeId2}><meta name="twitter:card"${ssrRenderAttr("content", props.seo.twitter.card)}${_scopeId2}><meta name="twitter:title"${ssrRenderAttr("content", props.seo.twitter.title)}${_scopeId2}><meta name="twitter:description"${ssrRenderAttr("content", props.seo.twitter.description)}${_scopeId2}><meta name="twitter:image"${ssrRenderAttr("content", props.seo.twitter.image)}${_scopeId2}><meta name="twitter:site"${ssrRenderAttr("content", props.seo.twitter.site)}${_scopeId2}><meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"${_scopeId2}><meta name="language" content="Indonesian"${_scopeId2}><meta name="author" content="Puranusa"${_scopeId2}><meta name="viewport" content="width=device-width, initial-scale=1.0"${_scopeId2}>`);
                } else {
                  return [
                    createVNode("title", null, toDisplayString(props.seo.title), 1),
                    createVNode("meta", {
                      name: "description",
                      content: props.seo.description
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      name: "keywords",
                      content: props.seo.keywords
                    }, null, 8, ["content"]),
                    createVNode("link", {
                      rel: "canonical",
                      href: props.seo.canonical
                    }, null, 8, ["href"]),
                    createVNode("meta", {
                      property: "og:type",
                      content: props.seo.og.type
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      property: "og:title",
                      content: props.seo.og.title
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      property: "og:description",
                      content: props.seo.og.description
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      property: "og:image",
                      content: props.seo.og.image
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      property: "og:url",
                      content: props.seo.og.url
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      property: "og:site_name",
                      content: props.seo.og.site_name
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      property: "og:locale",
                      content: props.seo.og.locale
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      name: "twitter:card",
                      content: props.seo.twitter.card
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      name: "twitter:title",
                      content: props.seo.twitter.title
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      name: "twitter:description",
                      content: props.seo.twitter.description
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      name: "twitter:image",
                      content: props.seo.twitter.image
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      name: "twitter:site",
                      content: props.seo.twitter.site
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      name: "robots",
                      content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
                    }),
                    createVNode("meta", {
                      name: "language",
                      content: "Indonesian"
                    }),
                    createVNode("meta", {
                      name: "author",
                      content: "Puranusa"
                    }),
                    createVNode("meta", {
                      name: "viewport",
                      content: "width=device-width, initial-scale=1.0"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<main${_scopeId}><h1 class="sr-only"${_scopeId}>Puranusa - Toko Online Terpercaya dengan 10,000+ Produk Berkualitas</h1><section class="relative h-screen overflow-hidden bg-black" aria-label="Banner Promosi"${_scopeId}><!--[-->`);
            ssrRenderList(__props.banners, (banner, index) => {
              _push2(`<div class="${ssrRenderClass([
                "absolute inset-0 transition-opacity duration-700",
                index === currentBannerIndex.value ? "opacity-300" : "opacity-0"
              ])}"${_scopeId}><img${ssrRenderAttr("src", banner.image)}${ssrRenderAttr("alt", `${banner.title} - ${banner.subtitle}`)} class="h-full w-full object-cover opacity-80" loading="eager" fetchpriority="high"${_scopeId}><div class="absolute inset-0 bg-gradient-to-r from-black/90 via-black/30 to-transparent"${_scopeId}><div class="container mx-auto h-full flex items-center px-6"${_scopeId}><div class="max-w-xl text-white space-y-4"${_scopeId}><h1 class="text-6xl font-bold leading-tight tracking-tight"${_scopeId}>${ssrInterpolate(banner.title)}</h1><p class="text-lg text-gray-100"${_scopeId}>${ssrInterpolate(banner.subtitle)}</p><div class="pt-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: banner.cta_link
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$6), {
                      size: "lg",
                      class: "rounded-full px-8 text-base font-semibold bg-white text-black hover:bg-gray-300"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(banner.cta_text)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(banner.cta_text), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$6), {
                        size: "lg",
                        class: "rounded-full px-8 text-base font-semibold bg-white text-black hover:bg-gray-300"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(banner.cta_text), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div></div></div></div></div>`);
            });
            _push2(`<!--]--><div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2"${_scopeId}><!--[-->`);
            ssrRenderList(__props.banners, (banner, index) => {
              _push2(`<button class="${ssrRenderClass([
                "h-1.5 rounded-full transition-all",
                index === currentBannerIndex.value ? "w-8 bg-white" : "w-1.5 bg-white/50"
              ])}"${ssrRenderAttr("aria-label", `Go to slide ${index + 1}`)}${_scopeId}></button>`);
            });
            _push2(`<!--]--></div></section><section class="border-b py-12"${_scopeId}><div class="container mx-auto px-6"${_scopeId}><div class="grid grid-cols-2 md:grid-cols-4 gap-8"${_scopeId}><!--[-->`);
            ssrRenderList(__props.statistics, (stat) => {
              _push2(`<div class="text-center"${_scopeId}><div class="flex justify-center mb-3"${_scopeId}><div class="p-6 rounded-full shadow-sm"${_scopeId}>`);
              if (stat.icon === "package") {
                _push2(ssrRenderComponent(unref(Package), { class: "h-10 w-10" }, null, _parent2, _scopeId));
              } else if (stat.icon === "users") {
                _push2(ssrRenderComponent(unref(Users), { class: "h-10 w-10" }, null, _parent2, _scopeId));
              } else if (stat.icon === "star") {
                _push2(ssrRenderComponent(unref(Star), { class: "h-10 w-10" }, null, _parent2, _scopeId));
              } else if (stat.icon === "truck") {
                _push2(ssrRenderComponent(unref(Truck), { class: "h-10 w-10" }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div class="text-3xl font-bold mb-1"${_scopeId}>${ssrInterpolate(stat.value)}</div><div class="text-sm text-gray-600"${_scopeId}>${ssrInterpolate(stat.label)}</div></div>`);
            });
            _push2(`<!--]--></div></div></section><section class="py-16 container mx-auto px-6" aria-labelledby="categories-heading"${_scopeId}><div class="flex items-center justify-between mb-10"${_scopeId}><div${_scopeId}><h2 id="categories-heading" class="text-4xl font-bold tracking-tight"${_scopeId}>Kategori Populer</h2><p class="text-gray-600 mt-2"${_scopeId}>Temukan produk berdasarkan kategori favorit Anda</p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/toko",
              "aria-label": "Lihat semua kategori"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    variant: "outline",
                    class: "rounded-full gap-2"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Lihat Semua ${ssrInterpolate(__props.categories.length)} `);
                        _push4(ssrRenderComponent(unref(ChevronRight), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createTextVNode(" Lihat Semua " + toDisplayString(__props.categories.length) + " ", 1),
                          createVNode(unref(ChevronRight), { class: "h-4 w-4" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$6), {
                      variant: "outline",
                      class: "rounded-full gap-2"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Lihat Semua " + toDisplayString(__props.categories.length) + " ", 1),
                        createVNode(unref(ChevronRight), { class: "h-4 w-4" })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"${_scopeId}><!--[-->`);
            ssrRenderList(__props.categories, (category) => {
              _push2(ssrRenderComponent(unref(Link), {
                key: category.id,
                href: `/toko?category=${category.slug}`,
                class: "group",
                "aria-label": `Lihat produk ${category.name}`
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$8), { class: "overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 p-0" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="aspect-square relative overflow-hidden bg-gray-100"${_scopeId3}><img${ssrRenderAttr("src", category.image)}${ssrRenderAttr("alt", `Kategori ${category.name} dengan ${category.product_count} produk tersedia`)} class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" width="400" height="400"${_scopeId3}><div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"${_scopeId3}></div><div class="absolute bottom-0 left-0 right-0 p-4 text-white"${_scopeId3}><div class="text-3xl mb-2"${_scopeId3}>${ssrInterpolate(category.icon)}</div><div class="font-bold text-lg"${_scopeId3}>${ssrInterpolate(category.name)}</div><div class="text-xs text-gray-200 mt-1"${_scopeId3}>${ssrInterpolate(category.product_count)} produk</div></div></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "aspect-square relative overflow-hidden bg-gray-100" }, [
                              createVNode("img", {
                                src: category.image,
                                alt: `Kategori ${category.name} dengan ${category.product_count} produk tersedia`,
                                class: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105",
                                loading: "lazy",
                                width: "400",
                                height: "400"
                              }, null, 8, ["src", "alt"]),
                              createVNode("div", { class: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" }),
                              createVNode("div", { class: "absolute bottom-0 left-0 right-0 p-4 text-white" }, [
                                createVNode("div", { class: "text-3xl mb-2" }, toDisplayString(category.icon), 1),
                                createVNode("div", { class: "font-bold text-lg" }, toDisplayString(category.name), 1),
                                createVNode("div", { class: "text-xs text-gray-200 mt-1" }, toDisplayString(category.product_count) + " produk", 1)
                              ])
                            ])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$8), { class: "overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 p-0" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "aspect-square relative overflow-hidden bg-gray-100" }, [
                            createVNode("img", {
                              src: category.image,
                              alt: `Kategori ${category.name} dengan ${category.product_count} produk tersedia`,
                              class: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105",
                              loading: "lazy",
                              width: "400",
                              height: "400"
                            }, null, 8, ["src", "alt"]),
                            createVNode("div", { class: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" }),
                            createVNode("div", { class: "absolute bottom-0 left-0 right-0 p-4 text-white" }, [
                              createVNode("div", { class: "text-3xl mb-2" }, toDisplayString(category.icon), 1),
                              createVNode("div", { class: "font-bold text-lg" }, toDisplayString(category.name), 1),
                              createVNode("div", { class: "text-xs text-gray-200 mt-1" }, toDisplayString(category.product_count) + " produk", 1)
                            ])
                          ])
                        ]),
                        _: 2
                      }, 1024)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div></section><section class="py-16 container mx-auto px-6" aria-labelledby="products-heading"${_scopeId}><div class="flex items-center justify-between mb-10"${_scopeId}><div${_scopeId}><h2 id="products-heading" class="text-4xl font-bold tracking-tight"${_scopeId}>Produk Pilihan</h2><p class="text-gray-600 mt-2"${_scopeId}>Produk terbaik dengan rating tertinggi</p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/toko",
              "aria-label": "Lihat semua produk"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    variant: "outline",
                    class: "rounded-full gap-2"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Lihat Semua `);
                        _push4(ssrRenderComponent(unref(ChevronRight), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createTextVNode(" Lihat Semua "),
                          createVNode(unref(ChevronRight), { class: "h-4 w-4" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$6), {
                      variant: "outline",
                      class: "rounded-full gap-2"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Lihat Semua "),
                        createVNode(unref(ChevronRight), { class: "h-4 w-4" })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="grid grid-cols-2 md:grid-cols-4 gap-6"${_scopeId}><!--[-->`);
            ssrRenderList(__props.featuredProducts, (product) => {
              _push2(ssrRenderComponent(_sfc_main$9, {
                key: product.id,
                product
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]--></div></section><section class="py-16" aria-labelledby="testimonials-heading"${_scopeId}><div class="container mx-auto px-6"${_scopeId}><div class="text-center mb-12"${_scopeId}><h2 id="testimonials-heading" class="text-4xl font-bold tracking-tight"${_scopeId}>Apa Kata Pelanggan</h2><p class="mt-3"${_scopeId}>Testimoni dari pelanggan yang puas dengan produk kami</p></div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$5), {
              class: "w-full",
              opts: {
                align: "start",
                loop: true
              }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { class: "-ml-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(__props.testimonials, (testimonial) => {
                          _push4(ssrRenderComponent(unref(_sfc_main$3), {
                            key: testimonial.id,
                            class: "pl-4 md:basis-1/2 lg:basis-1/3"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<article itemscope itemtype="https://schema.org/Review" class="h-full"${_scopeId4}>`);
                                _push5(ssrRenderComponent(unref(_sfc_main$8), { class: "border-1 h-full" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(_sfc_main$a), { class: "pb-3" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`<div class="flex items-center gap-4"${_scopeId6}>`);
                                            _push7(ssrRenderComponent(unref(_sfc_main$b), { class: "h-14 w-14" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(unref(_sfc_main$c), {
                                                    src: testimonial.avatar,
                                                    alt: `Foto profil ${testimonial.name}`
                                                  }, null, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(unref(_sfc_main$d), null, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`${ssrInterpolate(testimonial.name.charAt(0))}`);
                                                      } else {
                                                        return [
                                                          createTextVNode(toDisplayString(testimonial.name.charAt(0)), 1)
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                } else {
                                                  return [
                                                    createVNode(unref(_sfc_main$c), {
                                                      src: testimonial.avatar,
                                                      alt: `Foto profil ${testimonial.name}`
                                                    }, null, 8, ["src", "alt"]),
                                                    createVNode(unref(_sfc_main$d), null, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(testimonial.name.charAt(0)), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(`<div${_scopeId6}>`);
                                            _push7(ssrRenderComponent(unref(_sfc_main$e), {
                                              class: "text-base font-bold",
                                              itemprop: "author"
                                            }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(testimonial.name)}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(testimonial.name), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$f), { class: "text-xs text-gray-500" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`<time itemprop="datePublished"${_scopeId7}>${ssrInterpolate(testimonial.date)}</time>`);
                                                } else {
                                                  return [
                                                    createVNode("time", { itemprop: "datePublished" }, toDisplayString(testimonial.date), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(`</div></div>`);
                                          } else {
                                            return [
                                              createVNode("div", { class: "flex items-center gap-4" }, [
                                                createVNode(unref(_sfc_main$b), { class: "h-14 w-14" }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(_sfc_main$c), {
                                                      src: testimonial.avatar,
                                                      alt: `Foto profil ${testimonial.name}`
                                                    }, null, 8, ["src", "alt"]),
                                                    createVNode(unref(_sfc_main$d), null, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(testimonial.name.charAt(0)), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024)
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode("div", null, [
                                                  createVNode(unref(_sfc_main$e), {
                                                    class: "text-base font-bold",
                                                    itemprop: "author"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(testimonial.name), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(unref(_sfc_main$f), { class: "text-xs text-gray-500" }, {
                                                    default: withCtx(() => [
                                                      createVNode("time", { itemprop: "datePublished" }, toDisplayString(testimonial.date), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ])
                                              ])
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(unref(_sfc_main$g), { class: "space-y-4 pt-0" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`<div class="flex gap-1" itemprop="reviewRating" itemscope itemtype="https://schema.org/Rating"${_scopeId6}><meta itemprop="ratingValue"${ssrRenderAttr("content", testimonial.rating.toString())}${_scopeId6}><meta itemprop="bestRating" content="5"${_scopeId6}><meta itemprop="worstRating" content="1"${_scopeId6}><!--[-->`);
                                            ssrRenderList(5, (i) => {
                                              _push7(ssrRenderComponent(unref(Star), {
                                                key: i,
                                                class: [
                                                  "h-5 w-5",
                                                  i <= testimonial.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                                                ]
                                              }, null, _parent7, _scopeId6));
                                            });
                                            _push7(`<!--]--></div><p class="text-sm text-gray-700 leading-relaxed" itemprop="reviewBody"${_scopeId6}>${ssrInterpolate(testimonial.comment)}</p>`);
                                            _push7(ssrRenderComponent(_sfc_main$h, null, null, _parent7, _scopeId6));
                                            _push7(`<div class="flex items-center gap-2" itemprop="itemReviewed" itemscope itemtype="https://schema.org/Product"${_scopeId6}>`);
                                            _push7(ssrRenderComponent(unref(Package), { class: "h-4 w-4 text-gray-400" }, null, _parent7, _scopeId6));
                                            _push7(`<p class="text-xs font-medium text-gray-600" itemprop="name"${_scopeId6}>${ssrInterpolate(testimonial.product)}</p></div>`);
                                          } else {
                                            return [
                                              createVNode("div", {
                                                class: "flex gap-1",
                                                itemprop: "reviewRating",
                                                itemscope: "",
                                                itemtype: "https://schema.org/Rating"
                                              }, [
                                                createVNode("meta", {
                                                  itemprop: "ratingValue",
                                                  content: testimonial.rating.toString()
                                                }, null, 8, ["content"]),
                                                createVNode("meta", {
                                                  itemprop: "bestRating",
                                                  content: "5"
                                                }),
                                                createVNode("meta", {
                                                  itemprop: "worstRating",
                                                  content: "1"
                                                }),
                                                (openBlock(), createBlock(Fragment, null, renderList(5, (i) => {
                                                  return createVNode(unref(Star), {
                                                    key: i,
                                                    class: [
                                                      "h-5 w-5",
                                                      i <= testimonial.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                                                    ]
                                                  }, null, 8, ["class"]);
                                                }), 64))
                                              ]),
                                              createVNode("p", {
                                                class: "text-sm text-gray-700 leading-relaxed",
                                                itemprop: "reviewBody"
                                              }, toDisplayString(testimonial.comment), 1),
                                              createVNode(_sfc_main$h),
                                              createVNode("div", {
                                                class: "flex items-center gap-2",
                                                itemprop: "itemReviewed",
                                                itemscope: "",
                                                itemtype: "https://schema.org/Product"
                                              }, [
                                                createVNode(unref(Package), { class: "h-4 w-4 text-gray-400" }),
                                                createVNode("p", {
                                                  class: "text-xs font-medium text-gray-600",
                                                  itemprop: "name"
                                                }, toDisplayString(testimonial.product), 1)
                                              ])
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(unref(_sfc_main$a), { class: "pb-3" }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "flex items-center gap-4" }, [
                                              createVNode(unref(_sfc_main$b), { class: "h-14 w-14" }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(_sfc_main$c), {
                                                    src: testimonial.avatar,
                                                    alt: `Foto profil ${testimonial.name}`
                                                  }, null, 8, ["src", "alt"]),
                                                  createVNode(unref(_sfc_main$d), null, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(testimonial.name.charAt(0)), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode("div", null, [
                                                createVNode(unref(_sfc_main$e), {
                                                  class: "text-base font-bold",
                                                  itemprop: "author"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(testimonial.name), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(unref(_sfc_main$f), { class: "text-xs text-gray-500" }, {
                                                  default: withCtx(() => [
                                                    createVNode("time", { itemprop: "datePublished" }, toDisplayString(testimonial.date), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ])
                                            ])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$g), { class: "space-y-4 pt-0" }, {
                                          default: withCtx(() => [
                                            createVNode("div", {
                                              class: "flex gap-1",
                                              itemprop: "reviewRating",
                                              itemscope: "",
                                              itemtype: "https://schema.org/Rating"
                                            }, [
                                              createVNode("meta", {
                                                itemprop: "ratingValue",
                                                content: testimonial.rating.toString()
                                              }, null, 8, ["content"]),
                                              createVNode("meta", {
                                                itemprop: "bestRating",
                                                content: "5"
                                              }),
                                              createVNode("meta", {
                                                itemprop: "worstRating",
                                                content: "1"
                                              }),
                                              (openBlock(), createBlock(Fragment, null, renderList(5, (i) => {
                                                return createVNode(unref(Star), {
                                                  key: i,
                                                  class: [
                                                    "h-5 w-5",
                                                    i <= testimonial.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                                                  ]
                                                }, null, 8, ["class"]);
                                              }), 64))
                                            ]),
                                            createVNode("p", {
                                              class: "text-sm text-gray-700 leading-relaxed",
                                              itemprop: "reviewBody"
                                            }, toDisplayString(testimonial.comment), 1),
                                            createVNode(_sfc_main$h),
                                            createVNode("div", {
                                              class: "flex items-center gap-2",
                                              itemprop: "itemReviewed",
                                              itemscope: "",
                                              itemtype: "https://schema.org/Product"
                                            }, [
                                              createVNode(unref(Package), { class: "h-4 w-4 text-gray-400" }),
                                              createVNode("p", {
                                                class: "text-xs font-medium text-gray-600",
                                                itemprop: "name"
                                              }, toDisplayString(testimonial.product), 1)
                                            ])
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(`</article>`);
                              } else {
                                return [
                                  createVNode("article", {
                                    itemscope: "",
                                    itemtype: "https://schema.org/Review",
                                    class: "h-full"
                                  }, [
                                    createVNode(unref(_sfc_main$8), { class: "border-1 h-full" }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$a), { class: "pb-3" }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "flex items-center gap-4" }, [
                                              createVNode(unref(_sfc_main$b), { class: "h-14 w-14" }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(_sfc_main$c), {
                                                    src: testimonial.avatar,
                                                    alt: `Foto profil ${testimonial.name}`
                                                  }, null, 8, ["src", "alt"]),
                                                  createVNode(unref(_sfc_main$d), null, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(testimonial.name.charAt(0)), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode("div", null, [
                                                createVNode(unref(_sfc_main$e), {
                                                  class: "text-base font-bold",
                                                  itemprop: "author"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(testimonial.name), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(unref(_sfc_main$f), { class: "text-xs text-gray-500" }, {
                                                  default: withCtx(() => [
                                                    createVNode("time", { itemprop: "datePublished" }, toDisplayString(testimonial.date), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ])
                                            ])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$g), { class: "space-y-4 pt-0" }, {
                                          default: withCtx(() => [
                                            createVNode("div", {
                                              class: "flex gap-1",
                                              itemprop: "reviewRating",
                                              itemscope: "",
                                              itemtype: "https://schema.org/Rating"
                                            }, [
                                              createVNode("meta", {
                                                itemprop: "ratingValue",
                                                content: testimonial.rating.toString()
                                              }, null, 8, ["content"]),
                                              createVNode("meta", {
                                                itemprop: "bestRating",
                                                content: "5"
                                              }),
                                              createVNode("meta", {
                                                itemprop: "worstRating",
                                                content: "1"
                                              }),
                                              (openBlock(), createBlock(Fragment, null, renderList(5, (i) => {
                                                return createVNode(unref(Star), {
                                                  key: i,
                                                  class: [
                                                    "h-5 w-5",
                                                    i <= testimonial.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                                                  ]
                                                }, null, 8, ["class"]);
                                              }), 64))
                                            ]),
                                            createVNode("p", {
                                              class: "text-sm text-gray-700 leading-relaxed",
                                              itemprop: "reviewBody"
                                            }, toDisplayString(testimonial.comment), 1),
                                            createVNode(_sfc_main$h),
                                            createVNode("div", {
                                              class: "flex items-center gap-2",
                                              itemprop: "itemReviewed",
                                              itemscope: "",
                                              itemtype: "https://schema.org/Product"
                                            }, [
                                              createVNode(unref(Package), { class: "h-4 w-4 text-gray-400" }),
                                              createVNode("p", {
                                                class: "text-xs font-medium text-gray-600",
                                                itemprop: "name"
                                              }, toDisplayString(testimonial.product), 1)
                                            ])
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.testimonials, (testimonial) => {
                            return openBlock(), createBlock(unref(_sfc_main$3), {
                              key: testimonial.id,
                              class: "pl-4 md:basis-1/2 lg:basis-1/3"
                            }, {
                              default: withCtx(() => [
                                createVNode("article", {
                                  itemscope: "",
                                  itemtype: "https://schema.org/Review",
                                  class: "h-full"
                                }, [
                                  createVNode(unref(_sfc_main$8), { class: "border-1 h-full" }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$a), { class: "pb-3" }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "flex items-center gap-4" }, [
                                            createVNode(unref(_sfc_main$b), { class: "h-14 w-14" }, {
                                              default: withCtx(() => [
                                                createVNode(unref(_sfc_main$c), {
                                                  src: testimonial.avatar,
                                                  alt: `Foto profil ${testimonial.name}`
                                                }, null, 8, ["src", "alt"]),
                                                createVNode(unref(_sfc_main$d), null, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(testimonial.name.charAt(0)), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode("div", null, [
                                              createVNode(unref(_sfc_main$e), {
                                                class: "text-base font-bold",
                                                itemprop: "author"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(testimonial.name), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$f), { class: "text-xs text-gray-500" }, {
                                                default: withCtx(() => [
                                                  createVNode("time", { itemprop: "datePublished" }, toDisplayString(testimonial.date), 1)
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ])
                                          ])
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$g), { class: "space-y-4 pt-0" }, {
                                        default: withCtx(() => [
                                          createVNode("div", {
                                            class: "flex gap-1",
                                            itemprop: "reviewRating",
                                            itemscope: "",
                                            itemtype: "https://schema.org/Rating"
                                          }, [
                                            createVNode("meta", {
                                              itemprop: "ratingValue",
                                              content: testimonial.rating.toString()
                                            }, null, 8, ["content"]),
                                            createVNode("meta", {
                                              itemprop: "bestRating",
                                              content: "5"
                                            }),
                                            createVNode("meta", {
                                              itemprop: "worstRating",
                                              content: "1"
                                            }),
                                            (openBlock(), createBlock(Fragment, null, renderList(5, (i) => {
                                              return createVNode(unref(Star), {
                                                key: i,
                                                class: [
                                                  "h-5 w-5",
                                                  i <= testimonial.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                                                ]
                                              }, null, 8, ["class"]);
                                            }), 64))
                                          ]),
                                          createVNode("p", {
                                            class: "text-sm text-gray-700 leading-relaxed",
                                            itemprop: "reviewBody"
                                          }, toDisplayString(testimonial.comment), 1),
                                          createVNode(_sfc_main$h),
                                          createVNode("div", {
                                            class: "flex items-center gap-2",
                                            itemprop: "itemReviewed",
                                            itemscope: "",
                                            itemtype: "https://schema.org/Product"
                                          }, [
                                            createVNode(unref(Package), { class: "h-4 w-4 text-gray-400" }),
                                            createVNode("p", {
                                              class: "text-xs font-medium text-gray-600",
                                              itemprop: "name"
                                            }, toDisplayString(testimonial.product), 1)
                                          ])
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ])
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$1), { class: "hidden md:flex -left-12" }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$2), { class: "hidden md:flex -right-12" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$4), { class: "-ml-4" }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.testimonials, (testimonial) => {
                          return openBlock(), createBlock(unref(_sfc_main$3), {
                            key: testimonial.id,
                            class: "pl-4 md:basis-1/2 lg:basis-1/3"
                          }, {
                            default: withCtx(() => [
                              createVNode("article", {
                                itemscope: "",
                                itemtype: "https://schema.org/Review",
                                class: "h-full"
                              }, [
                                createVNode(unref(_sfc_main$8), { class: "border-1 h-full" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$a), { class: "pb-3" }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "flex items-center gap-4" }, [
                                          createVNode(unref(_sfc_main$b), { class: "h-14 w-14" }, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$c), {
                                                src: testimonial.avatar,
                                                alt: `Foto profil ${testimonial.name}`
                                              }, null, 8, ["src", "alt"]),
                                              createVNode(unref(_sfc_main$d), null, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(testimonial.name.charAt(0)), 1)
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode("div", null, [
                                            createVNode(unref(_sfc_main$e), {
                                              class: "text-base font-bold",
                                              itemprop: "author"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(testimonial.name), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$f), { class: "text-xs text-gray-500" }, {
                                              default: withCtx(() => [
                                                createVNode("time", { itemprop: "datePublished" }, toDisplayString(testimonial.date), 1)
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ])
                                        ])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$g), { class: "space-y-4 pt-0" }, {
                                      default: withCtx(() => [
                                        createVNode("div", {
                                          class: "flex gap-1",
                                          itemprop: "reviewRating",
                                          itemscope: "",
                                          itemtype: "https://schema.org/Rating"
                                        }, [
                                          createVNode("meta", {
                                            itemprop: "ratingValue",
                                            content: testimonial.rating.toString()
                                          }, null, 8, ["content"]),
                                          createVNode("meta", {
                                            itemprop: "bestRating",
                                            content: "5"
                                          }),
                                          createVNode("meta", {
                                            itemprop: "worstRating",
                                            content: "1"
                                          }),
                                          (openBlock(), createBlock(Fragment, null, renderList(5, (i) => {
                                            return createVNode(unref(Star), {
                                              key: i,
                                              class: [
                                                "h-5 w-5",
                                                i <= testimonial.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                                              ]
                                            }, null, 8, ["class"]);
                                          }), 64))
                                        ]),
                                        createVNode("p", {
                                          class: "text-sm text-gray-700 leading-relaxed",
                                          itemprop: "reviewBody"
                                        }, toDisplayString(testimonial.comment), 1),
                                        createVNode(_sfc_main$h),
                                        createVNode("div", {
                                          class: "flex items-center gap-2",
                                          itemprop: "itemReviewed",
                                          itemscope: "",
                                          itemtype: "https://schema.org/Product"
                                        }, [
                                          createVNode(unref(Package), { class: "h-4 w-4 text-gray-400" }),
                                          createVNode("p", {
                                            class: "text-xs font-medium text-gray-600",
                                            itemprop: "name"
                                          }, toDisplayString(testimonial.product), 1)
                                        ])
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024)
                              ])
                            ]),
                            _: 2
                          }, 1024);
                        }), 128))
                      ]),
                      _: 2
                    }, 1024),
                    createVNode(unref(_sfc_main$1), { class: "hidden md:flex -left-12" }),
                    createVNode(unref(_sfc_main$2), { class: "hidden md:flex -right-12" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></section></main>`);
          } else {
            return [
              createVNode(unref(Head), null, {
                default: withCtx(() => [
                  createVNode("title", null, toDisplayString(props.seo.title), 1),
                  createVNode("meta", {
                    name: "description",
                    content: props.seo.description
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    name: "keywords",
                    content: props.seo.keywords
                  }, null, 8, ["content"]),
                  createVNode("link", {
                    rel: "canonical",
                    href: props.seo.canonical
                  }, null, 8, ["href"]),
                  createVNode("meta", {
                    property: "og:type",
                    content: props.seo.og.type
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    property: "og:title",
                    content: props.seo.og.title
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    property: "og:description",
                    content: props.seo.og.description
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    property: "og:image",
                    content: props.seo.og.image
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    property: "og:url",
                    content: props.seo.og.url
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    property: "og:site_name",
                    content: props.seo.og.site_name
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    property: "og:locale",
                    content: props.seo.og.locale
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    name: "twitter:card",
                    content: props.seo.twitter.card
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    name: "twitter:title",
                    content: props.seo.twitter.title
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    name: "twitter:description",
                    content: props.seo.twitter.description
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    name: "twitter:image",
                    content: props.seo.twitter.image
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    name: "twitter:site",
                    content: props.seo.twitter.site
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    name: "robots",
                    content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
                  }),
                  createVNode("meta", {
                    name: "language",
                    content: "Indonesian"
                  }),
                  createVNode("meta", {
                    name: "author",
                    content: "Puranusa"
                  }),
                  createVNode("meta", {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1.0"
                  })
                ]),
                _: 1
              }),
              createVNode("main", null, [
                createVNode("h1", { class: "sr-only" }, "Puranusa - Toko Online Terpercaya dengan 10,000+ Produk Berkualitas"),
                createVNode("section", {
                  class: "relative h-screen overflow-hidden bg-black",
                  "aria-label": "Banner Promosi"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.banners, (banner, index) => {
                    return openBlock(), createBlock("div", {
                      key: banner.id,
                      class: [
                        "absolute inset-0 transition-opacity duration-700",
                        index === currentBannerIndex.value ? "opacity-300" : "opacity-0"
                      ]
                    }, [
                      createVNode("img", {
                        src: banner.image,
                        alt: `${banner.title} - ${banner.subtitle}`,
                        class: "h-full w-full object-cover opacity-80",
                        loading: "eager",
                        fetchpriority: "high"
                      }, null, 8, ["src", "alt"]),
                      createVNode("div", { class: "absolute inset-0 bg-gradient-to-r from-black/90 via-black/30 to-transparent" }, [
                        createVNode("div", { class: "container mx-auto h-full flex items-center px-6" }, [
                          createVNode("div", { class: "max-w-xl text-white space-y-4" }, [
                            createVNode("h1", { class: "text-6xl font-bold leading-tight tracking-tight" }, toDisplayString(banner.title), 1),
                            createVNode("p", { class: "text-lg text-gray-100" }, toDisplayString(banner.subtitle), 1),
                            createVNode("div", { class: "pt-2" }, [
                              createVNode(unref(Link), {
                                href: banner.cta_link
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$6), {
                                    size: "lg",
                                    class: "rounded-full px-8 text-base font-semibold bg-white text-black hover:bg-gray-300"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(banner.cta_text), 1)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1032, ["href"])
                            ])
                          ])
                        ])
                      ])
                    ], 2);
                  }), 128)),
                  createVNode("div", { class: "absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.banners, (banner, index) => {
                      return openBlock(), createBlock("button", {
                        key: banner.id,
                        onClick: ($event) => currentBannerIndex.value = index,
                        class: [
                          "h-1.5 rounded-full transition-all",
                          index === currentBannerIndex.value ? "w-8 bg-white" : "w-1.5 bg-white/50"
                        ],
                        "aria-label": `Go to slide ${index + 1}`
                      }, null, 10, ["onClick", "aria-label"]);
                    }), 128))
                  ])
                ]),
                createVNode("section", { class: "border-b py-12" }, [
                  createVNode("div", { class: "container mx-auto px-6" }, [
                    createVNode("div", { class: "grid grid-cols-2 md:grid-cols-4 gap-8" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.statistics, (stat) => {
                        return openBlock(), createBlock("div", {
                          key: stat.label,
                          class: "text-center"
                        }, [
                          createVNode("div", { class: "flex justify-center mb-3" }, [
                            createVNode("div", { class: "p-6 rounded-full shadow-sm" }, [
                              stat.icon === "package" ? (openBlock(), createBlock(unref(Package), {
                                key: 0,
                                class: "h-10 w-10"
                              })) : stat.icon === "users" ? (openBlock(), createBlock(unref(Users), {
                                key: 1,
                                class: "h-10 w-10"
                              })) : stat.icon === "star" ? (openBlock(), createBlock(unref(Star), {
                                key: 2,
                                class: "h-10 w-10"
                              })) : stat.icon === "truck" ? (openBlock(), createBlock(unref(Truck), {
                                key: 3,
                                class: "h-10 w-10"
                              })) : createCommentVNode("", true)
                            ])
                          ]),
                          createVNode("div", { class: "text-3xl font-bold mb-1" }, toDisplayString(stat.value), 1),
                          createVNode("div", { class: "text-sm text-gray-600" }, toDisplayString(stat.label), 1)
                        ]);
                      }), 128))
                    ])
                  ])
                ]),
                createVNode("section", {
                  class: "py-16 container mx-auto px-6",
                  "aria-labelledby": "categories-heading"
                }, [
                  createVNode("div", { class: "flex items-center justify-between mb-10" }, [
                    createVNode("div", null, [
                      createVNode("h2", {
                        id: "categories-heading",
                        class: "text-4xl font-bold tracking-tight"
                      }, "Kategori Populer"),
                      createVNode("p", { class: "text-gray-600 mt-2" }, "Temukan produk berdasarkan kategori favorit Anda")
                    ]),
                    createVNode(unref(Link), {
                      href: "/toko",
                      "aria-label": "Lihat semua kategori"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$6), {
                          variant: "outline",
                          class: "rounded-full gap-2"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Lihat Semua " + toDisplayString(__props.categories.length) + " ", 1),
                            createVNode(unref(ChevronRight), { class: "h-4 w-4" })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("div", { class: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (category) => {
                      return openBlock(), createBlock(unref(Link), {
                        key: category.id,
                        href: `/toko?category=${category.slug}`,
                        class: "group",
                        "aria-label": `Lihat produk ${category.name}`
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$8), { class: "overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 p-0" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "aspect-square relative overflow-hidden bg-gray-100" }, [
                                createVNode("img", {
                                  src: category.image,
                                  alt: `Kategori ${category.name} dengan ${category.product_count} produk tersedia`,
                                  class: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105",
                                  loading: "lazy",
                                  width: "400",
                                  height: "400"
                                }, null, 8, ["src", "alt"]),
                                createVNode("div", { class: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" }),
                                createVNode("div", { class: "absolute bottom-0 left-0 right-0 p-4 text-white" }, [
                                  createVNode("div", { class: "text-3xl mb-2" }, toDisplayString(category.icon), 1),
                                  createVNode("div", { class: "font-bold text-lg" }, toDisplayString(category.name), 1),
                                  createVNode("div", { class: "text-xs text-gray-200 mt-1" }, toDisplayString(category.product_count) + " produk", 1)
                                ])
                              ])
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1032, ["href", "aria-label"]);
                    }), 128))
                  ])
                ]),
                createVNode("section", {
                  class: "py-16 container mx-auto px-6",
                  "aria-labelledby": "products-heading"
                }, [
                  createVNode("div", { class: "flex items-center justify-between mb-10" }, [
                    createVNode("div", null, [
                      createVNode("h2", {
                        id: "products-heading",
                        class: "text-4xl font-bold tracking-tight"
                      }, "Produk Pilihan"),
                      createVNode("p", { class: "text-gray-600 mt-2" }, "Produk terbaik dengan rating tertinggi")
                    ]),
                    createVNode(unref(Link), {
                      href: "/toko",
                      "aria-label": "Lihat semua produk"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$6), {
                          variant: "outline",
                          class: "rounded-full gap-2"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Lihat Semua "),
                            createVNode(unref(ChevronRight), { class: "h-4 w-4" })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("div", { class: "grid grid-cols-2 md:grid-cols-4 gap-6" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.featuredProducts, (product) => {
                      return openBlock(), createBlock(_sfc_main$9, {
                        key: product.id,
                        product
                      }, null, 8, ["product"]);
                    }), 128))
                  ])
                ]),
                createVNode("section", {
                  class: "py-16",
                  "aria-labelledby": "testimonials-heading"
                }, [
                  createVNode("div", { class: "container mx-auto px-6" }, [
                    createVNode("div", { class: "text-center mb-12" }, [
                      createVNode("h2", {
                        id: "testimonials-heading",
                        class: "text-4xl font-bold tracking-tight"
                      }, "Apa Kata Pelanggan"),
                      createVNode("p", { class: "mt-3" }, "Testimoni dari pelanggan yang puas dengan produk kami")
                    ]),
                    createVNode(unref(_sfc_main$5), {
                      class: "w-full",
                      opts: {
                        align: "start",
                        loop: true
                      }
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$4), { class: "-ml-4" }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.testimonials, (testimonial) => {
                              return openBlock(), createBlock(unref(_sfc_main$3), {
                                key: testimonial.id,
                                class: "pl-4 md:basis-1/2 lg:basis-1/3"
                              }, {
                                default: withCtx(() => [
                                  createVNode("article", {
                                    itemscope: "",
                                    itemtype: "https://schema.org/Review",
                                    class: "h-full"
                                  }, [
                                    createVNode(unref(_sfc_main$8), { class: "border-1 h-full" }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$a), { class: "pb-3" }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "flex items-center gap-4" }, [
                                              createVNode(unref(_sfc_main$b), { class: "h-14 w-14" }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(_sfc_main$c), {
                                                    src: testimonial.avatar,
                                                    alt: `Foto profil ${testimonial.name}`
                                                  }, null, 8, ["src", "alt"]),
                                                  createVNode(unref(_sfc_main$d), null, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(testimonial.name.charAt(0)), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode("div", null, [
                                                createVNode(unref(_sfc_main$e), {
                                                  class: "text-base font-bold",
                                                  itemprop: "author"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(testimonial.name), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(unref(_sfc_main$f), { class: "text-xs text-gray-500" }, {
                                                  default: withCtx(() => [
                                                    createVNode("time", { itemprop: "datePublished" }, toDisplayString(testimonial.date), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ])
                                            ])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$g), { class: "space-y-4 pt-0" }, {
                                          default: withCtx(() => [
                                            createVNode("div", {
                                              class: "flex gap-1",
                                              itemprop: "reviewRating",
                                              itemscope: "",
                                              itemtype: "https://schema.org/Rating"
                                            }, [
                                              createVNode("meta", {
                                                itemprop: "ratingValue",
                                                content: testimonial.rating.toString()
                                              }, null, 8, ["content"]),
                                              createVNode("meta", {
                                                itemprop: "bestRating",
                                                content: "5"
                                              }),
                                              createVNode("meta", {
                                                itemprop: "worstRating",
                                                content: "1"
                                              }),
                                              (openBlock(), createBlock(Fragment, null, renderList(5, (i) => {
                                                return createVNode(unref(Star), {
                                                  key: i,
                                                  class: [
                                                    "h-5 w-5",
                                                    i <= testimonial.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                                                  ]
                                                }, null, 8, ["class"]);
                                              }), 64))
                                            ]),
                                            createVNode("p", {
                                              class: "text-sm text-gray-700 leading-relaxed",
                                              itemprop: "reviewBody"
                                            }, toDisplayString(testimonial.comment), 1),
                                            createVNode(_sfc_main$h),
                                            createVNode("div", {
                                              class: "flex items-center gap-2",
                                              itemprop: "itemReviewed",
                                              itemscope: "",
                                              itemtype: "https://schema.org/Product"
                                            }, [
                                              createVNode(unref(Package), { class: "h-4 w-4 text-gray-400" }),
                                              createVNode("p", {
                                                class: "text-xs font-medium text-gray-600",
                                                itemprop: "name"
                                              }, toDisplayString(testimonial.product), 1)
                                            ])
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ])
                                ]),
                                _: 2
                              }, 1024);
                            }), 128))
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$1), { class: "hidden md:flex -left-12" }),
                        createVNode(unref(_sfc_main$2), { class: "hidden md:flex -right-12" })
                      ]),
                      _: 2
                    }, 1024)
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/ecommerce/Beranda.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
