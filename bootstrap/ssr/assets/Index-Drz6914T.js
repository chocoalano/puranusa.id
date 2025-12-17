import { defineComponent, ref, computed, unref, withCtx, createVNode, toDisplayString, createTextVNode, createBlock, createCommentVNode, openBlock, withKeys, Fragment, renderList, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { Head, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./Ecommerce-YIz8cvmW.js";
import { _ as _sfc_main$2 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$3 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$6 } from "./index-BpQimeTM.js";
import { _ as _sfc_main$4, c as _sfc_main$5, e as _sfc_main$7 } from "./CardTitle-sqUG0LTw.js";
import { Search, Tag, Clock, ChevronRight } from "lucide-vue-next";
import "./index-D3PKcwoM.js";
import "class-variance-authority";
import "./Label-16aMY2sx.js";
import "reka-ui";
import "@vueuse/core";
import "./SelectValue-BUnv4mQg.js";
import "./DropdownMenuTrigger-B1v6pHML.js";
import "axios";
import "vue-sonner";
import "./Checkbox-CIOQa2-J.js";
import "./useAppearance-gspEihnp.js";
import "clsx";
import "tailwind-merge";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    articles: {},
    filters: {},
    allTags: {}
  },
  setup(__props) {
    const props = __props;
    const searchQuery = ref(props.filters.search || "");
    const selectedTag = ref(props.filters.tag || null);
    const performSearch = () => {
      router.get("/artikel", {
        search: searchQuery.value || void 0,
        tag: selectedTag.value || void 0
      }, {
        preserveState: true,
        preserveScroll: true
      });
    };
    const selectTag = (tag) => {
      selectedTag.value = tag;
      router.get("/artikel", {
        search: searchQuery.value || void 0,
        tag: tag || void 0
      }, {
        preserveState: true,
        preserveScroll: true
      });
    };
    const clearFilters = () => {
      searchQuery.value = "";
      selectedTag.value = null;
      router.get("/artikel");
    };
    const hasActiveFilters = computed(() => {
      return !!searchQuery.value || !!selectedTag.value;
    });
    const getImageUrl = (url) => {
      if (!url) return "https://placehold.co/800x450/e2e8f0/64748b?text=No+Image";
      return url.startsWith("/") ? url : `/${url}`;
    };
    const pageTitle = computed(() => {
      if (selectedTag.value) return `Artikel ${selectedTag.value} - Blog`;
      if (searchQuery.value) return `Pencarian: ${searchQuery.value} - Blog`;
      return "Artikel & Blog - Tips, Panduan, dan Informasi Terkini";
    });
    const pageDescription = computed(() => {
      if (selectedTag.value) return `Baca artikel terkait ${selectedTag.value}. Temukan tips, panduan, dan informasi bermanfaat seputar ${selectedTag.value}.`;
      if (searchQuery.value) return `Hasil pencarian untuk "${searchQuery.value}". Temukan artikel yang Anda cari.`;
      return "Temukan informasi menarik, tips, dan panduan seputar produk dan layanan kami. Baca artikel terbaru dan terlengkap.";
    });
    const canonicalUrl = computed(() => {
      if (typeof window === "undefined") {
        return "/artikel";
      }
      const base = window.location.origin + "/artikel";
      const params = new URLSearchParams();
      if (searchQuery.value) params.set("search", searchQuery.value);
      if (selectedTag.value) params.set("tag", selectedTag.value);
      return params.toString() ? `${base}?${params.toString()}` : base;
    });
    const getPaginationLabel = (label, isActive) => {
      const cleanLabel = label.replace(/&laquo;|&raquo;/g, "").trim();
      if (cleanLabel === "Previous" || label.includes("&laquo;")) {
        return "Halaman sebelumnya";
      }
      if (cleanLabel === "Next" || label.includes("&raquo;")) {
        return "Halaman selanjutnya";
      }
      if (isActive) {
        return `Halaman ${cleanLabel} (halaman saat ini)`;
      }
      return `Pergi ke halaman ${cleanLabel}`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(pageTitle.value)}</title><meta name="description"${ssrRenderAttr("content", pageDescription.value)}${_scopeId}><link rel="canonical"${ssrRenderAttr("href", canonicalUrl.value)}${_scopeId}><meta property="og:type" content="website"${_scopeId}><meta property="og:title"${ssrRenderAttr("content", pageTitle.value)}${_scopeId}><meta property="og:description"${ssrRenderAttr("content", pageDescription.value)}${_scopeId}><meta property="og:url"${ssrRenderAttr("content", canonicalUrl.value)}${_scopeId}><meta name="twitter:card" content="summary_large_image"${_scopeId}><meta name="twitter:title"${ssrRenderAttr("content", pageTitle.value)}${_scopeId}><meta name="twitter:description"${ssrRenderAttr("content", pageDescription.value)}${_scopeId}><meta name="robots" content="index, follow"${_scopeId}><meta name="keywords"${ssrRenderAttr("content", selectedTag.value ? `${selectedTag.value}, artikel, blog` : "artikel, blog, tips, panduan, informasi")}${_scopeId}>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(pageTitle.value), 1),
              createVNode("meta", {
                name: "description",
                content: pageDescription.value
              }, null, 8, ["content"]),
              createVNode("link", {
                rel: "canonical",
                href: canonicalUrl.value
              }, null, 8, ["href"]),
              createVNode("meta", {
                property: "og:type",
                content: "website"
              }),
              createVNode("meta", {
                property: "og:title",
                content: pageTitle.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:description",
                content: pageDescription.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:url",
                content: canonicalUrl.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "twitter:card",
                content: "summary_large_image"
              }),
              createVNode("meta", {
                name: "twitter:title",
                content: pageTitle.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "twitter:description",
                content: pageDescription.value
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "robots",
                content: "index, follow"
              }),
              createVNode("meta", {
                name: "keywords",
                content: selectedTag.value ? `${selectedTag.value}, artikel, blog` : "artikel, blog, tips, panduan, informasi"
              }, null, 8, ["content"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="min-h-screen bg-gray-50 dark:bg-gray-950"${_scopeId}><div class="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white"${_scopeId}><div class="container mx-auto px-4 py-16 md:py-24"${_scopeId}><div class="max-w-3xl mx-auto text-center"${_scopeId}><h1 class="text-4xl md:text-5xl font-bold mb-4"${_scopeId}> Artikel &amp; Blog </h1><p class="text-lg md:text-xl text-white/90 mb-8"${_scopeId}> Temukan informasi menarik, tips, dan panduan seputar produk dan layanan kami </p><div class="max-w-2xl mx-auto"${_scopeId}><form role="search"${_scopeId}><label for="article-search" class="sr-only"${_scopeId}>Cari artikel</label><div class="relative"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Search), {
              class: "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400",
              "aria-hidden": "true"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              id: "article-search",
              modelValue: searchQuery.value,
              "onUpdate:modelValue": ($event) => searchQuery.value = $event,
              type: "search",
              placeholder: "Cari artikel...",
              class: "pl-12 pr-32 h-14 text-base bg-white dark:bg-gray-900 border-0 shadow-lg",
              "aria-label": "Cari artikel"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$3), {
              type: "submit",
              class: "absolute right-2 top-1/2 -translate-y-1/2 h-10",
              "aria-label": "Tombol cari"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Cari `);
                } else {
                  return [
                    createTextVNode(" Cari ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form></div></div></div></div><div class="container mx-auto px-4 py-8 md:py-12"${_scopeId}><div class="flex flex-col lg:flex-row gap-8"${_scopeId}><aside class="lg:w-64 flex-shrink-0" role="complementary" aria-label="Filter artikel"${_scopeId}><div class="sticky top-4 space-y-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$5), { class: "p-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex items-center gap-2 mb-4"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Tag), {
                          class: "h-4 w-4",
                          "aria-hidden": "true"
                        }, null, _parent4, _scopeId3));
                        _push4(`<h2 class="font-semibold text-base"${_scopeId3}>Tag Populer</h2></div><nav aria-label="Filter berdasarkan tag"${_scopeId3}><div class="flex flex-wrap gap-2"${_scopeId3}>`);
                        if (hasActiveFilters.value) {
                          _push4(ssrRenderComponent(unref(_sfc_main$6), {
                            variant: "outline",
                            class: "cursor-pointer hover:bg-destructive hover:text-destructive-foreground",
                            onClick: clearFilters,
                            role: "button",
                            tabindex: "0",
                            onKeypress: clearFilters
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` Clear Filters `);
                              } else {
                                return [
                                  createTextVNode(" Clear Filters ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`<!--[-->`);
                        ssrRenderList(__props.allTags, (tag) => {
                          _push4(ssrRenderComponent(unref(_sfc_main$6), {
                            key: tag,
                            variant: selectedTag.value === tag ? "default" : "secondary",
                            class: "cursor-pointer hover:bg-primary hover:text-primary-foreground",
                            onClick: ($event) => selectTag(tag === selectedTag.value ? null : tag),
                            role: "button",
                            tabindex: "0",
                            "aria-pressed": selectedTag.value === tag,
                            onKeypress: ($event) => selectTag(tag === selectedTag.value ? null : tag)
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(tag)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(tag), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]--></div></nav>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center gap-2 mb-4" }, [
                            createVNode(unref(Tag), {
                              class: "h-4 w-4",
                              "aria-hidden": "true"
                            }),
                            createVNode("h2", { class: "font-semibold text-base" }, "Tag Populer")
                          ]),
                          createVNode("nav", { "aria-label": "Filter berdasarkan tag" }, [
                            createVNode("div", { class: "flex flex-wrap gap-2" }, [
                              hasActiveFilters.value ? (openBlock(), createBlock(unref(_sfc_main$6), {
                                key: 0,
                                variant: "outline",
                                class: "cursor-pointer hover:bg-destructive hover:text-destructive-foreground",
                                onClick: clearFilters,
                                role: "button",
                                tabindex: "0",
                                onKeypress: withKeys(clearFilters, ["enter"])
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Clear Filters ")
                                ]),
                                _: 1
                              })) : createCommentVNode("", true),
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.allTags, (tag) => {
                                return openBlock(), createBlock(unref(_sfc_main$6), {
                                  key: tag,
                                  variant: selectedTag.value === tag ? "default" : "secondary",
                                  class: "cursor-pointer hover:bg-primary hover:text-primary-foreground",
                                  onClick: ($event) => selectTag(tag === selectedTag.value ? null : tag),
                                  role: "button",
                                  tabindex: "0",
                                  "aria-pressed": selectedTag.value === tag,
                                  onKeypress: withKeys(($event) => selectTag(tag === selectedTag.value ? null : tag), ["enter"])
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(tag), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["variant", "onClick", "aria-pressed", "onKeypress"]);
                              }), 128))
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$5), { class: "p-4" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex items-center gap-2 mb-4" }, [
                          createVNode(unref(Tag), {
                            class: "h-4 w-4",
                            "aria-hidden": "true"
                          }),
                          createVNode("h2", { class: "font-semibold text-base" }, "Tag Populer")
                        ]),
                        createVNode("nav", { "aria-label": "Filter berdasarkan tag" }, [
                          createVNode("div", { class: "flex flex-wrap gap-2" }, [
                            hasActiveFilters.value ? (openBlock(), createBlock(unref(_sfc_main$6), {
                              key: 0,
                              variant: "outline",
                              class: "cursor-pointer hover:bg-destructive hover:text-destructive-foreground",
                              onClick: clearFilters,
                              role: "button",
                              tabindex: "0",
                              onKeypress: withKeys(clearFilters, ["enter"])
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Clear Filters ")
                              ]),
                              _: 1
                            })) : createCommentVNode("", true),
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.allTags, (tag) => {
                              return openBlock(), createBlock(unref(_sfc_main$6), {
                                key: tag,
                                variant: selectedTag.value === tag ? "default" : "secondary",
                                class: "cursor-pointer hover:bg-primary hover:text-primary-foreground",
                                onClick: ($event) => selectTag(tag === selectedTag.value ? null : tag),
                                role: "button",
                                tabindex: "0",
                                "aria-pressed": selectedTag.value === tag,
                                onKeypress: withKeys(($event) => selectTag(tag === selectedTag.value ? null : tag), ["enter"])
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(tag), 1)
                                ]),
                                _: 2
                              }, 1032, ["variant", "onClick", "aria-pressed", "onKeypress"]);
                            }), 128))
                          ])
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$5), { class: "p-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p class="text-sm text-muted-foreground"${_scopeId3}> Menampilkan <span class="font-semibold text-foreground"${_scopeId3}>${ssrInterpolate(__props.articles.data.length)}</span> dari <span class="font-semibold text-foreground"${_scopeId3}>${ssrInterpolate(__props.articles.total)}</span> artikel </p>`);
                      } else {
                        return [
                          createVNode("p", { class: "text-sm text-muted-foreground" }, [
                            createTextVNode(" Menampilkan "),
                            createVNode("span", { class: "font-semibold text-foreground" }, toDisplayString(__props.articles.data.length), 1),
                            createTextVNode(" dari "),
                            createVNode("span", { class: "font-semibold text-foreground" }, toDisplayString(__props.articles.total), 1),
                            createTextVNode(" artikel ")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$5), { class: "p-4" }, {
                      default: withCtx(() => [
                        createVNode("p", { class: "text-sm text-muted-foreground" }, [
                          createTextVNode(" Menampilkan "),
                          createVNode("span", { class: "font-semibold text-foreground" }, toDisplayString(__props.articles.data.length), 1),
                          createTextVNode(" dari "),
                          createVNode("span", { class: "font-semibold text-foreground" }, toDisplayString(__props.articles.total), 1),
                          createTextVNode(" artikel ")
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></aside><main class="flex-1" role="main"${_scopeId}>`);
            if (hasActiveFilters.value) {
              _push2(`<div class="mb-6 flex flex-wrap items-center gap-2" role="status" aria-live="polite"${_scopeId}><span class="text-sm text-muted-foreground"${_scopeId}>Filter aktif:</span>`);
              if (searchQuery.value) {
                _push2(ssrRenderComponent(unref(_sfc_main$6), {
                  variant: "outline",
                  class: "gap-1"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Search: ${ssrInterpolate(searchQuery.value)}`);
                    } else {
                      return [
                        createTextVNode(" Search: " + toDisplayString(searchQuery.value), 1)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (selectedTag.value) {
                _push2(ssrRenderComponent(unref(_sfc_main$6), {
                  variant: "outline",
                  class: "gap-1"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Tag: ${ssrInterpolate(selectedTag.value)}`);
                    } else {
                      return [
                        createTextVNode(" Tag: " + toDisplayString(selectedTag.value), 1)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.articles.data.length > 0) {
              _push2(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"${_scopeId}><!--[-->`);
              ssrRenderList(__props.articles.data, (article) => {
                _push2(`<article${_scopeId}>`);
                _push2(ssrRenderComponent(unref(_sfc_main$4), {
                  class: "group hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer h-full flex flex-col",
                  onClick: ($event) => unref(router).visit(`/artikel/${article.slug}`),
                  tabindex: "0",
                  role: "link",
                  "aria-label": `Baca artikel: ${article.title}`,
                  onKeypress: ($event) => unref(router).visit(`/artikel/${article.slug}`)
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="relative h-48 overflow-hidden bg-muted"${_scopeId2}><img${ssrRenderAttr("src", getImageUrl(article.featured_image))}${ssrRenderAttr("alt", article.title)} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" width="800" height="450"${_scopeId2}><div class="absolute top-3 right-3"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$6), { class: "bg-white/90 dark:bg-gray-900/90 text-foreground border-0 shadow-sm" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(Clock), {
                              class: "h-3 w-3 mr-1",
                              "aria-hidden": "true"
                            }, null, _parent4, _scopeId3));
                            _push4(`<span class="sr-only"${_scopeId3}>Waktu baca:</span> ${ssrInterpolate(article.reading_time)} min `);
                          } else {
                            return [
                              createVNode(unref(Clock), {
                                class: "h-3 w-3 mr-1",
                                "aria-hidden": "true"
                              }),
                              createVNode("span", { class: "sr-only" }, "Waktu baca:"),
                              createTextVNode(" " + toDisplayString(article.reading_time) + " min ", 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</div></div>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$5), { class: "p-5 flex-1 flex flex-col" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<time class="flex items-center gap-2 mb-3 text-xs text-muted-foreground"${ssrRenderAttr("datetime", article.published_at)}${_scopeId3}>${ssrInterpolate(article.published_at)}</time><h3 class="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors"${_scopeId3}>${ssrInterpolate(article.title)}</h3><p class="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1"${_scopeId3}>${ssrInterpolate(article.seo_description)}</p>`);
                            if (article.tags.length > 0) {
                              _push4(`<nav class="flex flex-wrap gap-1" aria-label="Tag artikel"${_scopeId3}><!--[-->`);
                              ssrRenderList(article.tags.slice(0, 3), (tag) => {
                                _push4(ssrRenderComponent(unref(_sfc_main$6), {
                                  key: tag,
                                  variant: "secondary",
                                  class: "text-xs"
                                }, {
                                  default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      _push5(`${ssrInterpolate(tag)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(tag), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              });
                              _push4(`<!--]--></nav>`);
                            } else {
                              _push4(`<!---->`);
                            }
                          } else {
                            return [
                              createVNode("time", {
                                class: "flex items-center gap-2 mb-3 text-xs text-muted-foreground",
                                datetime: article.published_at
                              }, toDisplayString(article.published_at), 9, ["datetime"]),
                              createVNode("h3", { class: "font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors" }, toDisplayString(article.title), 1),
                              createVNode("p", { class: "text-sm text-muted-foreground line-clamp-3 mb-4 flex-1" }, toDisplayString(article.seo_description), 1),
                              article.tags.length > 0 ? (openBlock(), createBlock("nav", {
                                key: 0,
                                class: "flex flex-wrap gap-1",
                                "aria-label": "Tag artikel"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(article.tags.slice(0, 3), (tag) => {
                                  return openBlock(), createBlock(unref(_sfc_main$6), {
                                    key: tag,
                                    variant: "secondary",
                                    class: "text-xs"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(tag), 1)
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 128))
                              ])) : createCommentVNode("", true)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(unref(_sfc_main$7), { class: "px-5 pb-5 pt-0" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(_sfc_main$3), {
                              variant: "ghost",
                              size: "sm",
                              class: "w-full group-hover:bg-primary group-hover:text-primary-foreground",
                              "aria-label": "Baca artikel selengkapnya"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(` Baca Selengkapnya `);
                                  _push5(ssrRenderComponent(unref(ChevronRight), {
                                    class: "h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform",
                                    "aria-hidden": "true"
                                  }, null, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createTextVNode(" Baca Selengkapnya "),
                                    createVNode(unref(ChevronRight), {
                                      class: "h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform",
                                      "aria-hidden": "true"
                                    })
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(unref(_sfc_main$3), {
                                variant: "ghost",
                                size: "sm",
                                class: "w-full group-hover:bg-primary group-hover:text-primary-foreground",
                                "aria-label": "Baca artikel selengkapnya"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Baca Selengkapnya "),
                                  createVNode(unref(ChevronRight), {
                                    class: "h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform",
                                    "aria-hidden": "true"
                                  })
                                ]),
                                _: 1
                              })
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode("div", { class: "relative h-48 overflow-hidden bg-muted" }, [
                          createVNode("img", {
                            src: getImageUrl(article.featured_image),
                            alt: article.title,
                            class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300",
                            loading: "lazy",
                            width: "800",
                            height: "450"
                          }, null, 8, ["src", "alt"]),
                          createVNode("div", { class: "absolute top-3 right-3" }, [
                            createVNode(unref(_sfc_main$6), { class: "bg-white/90 dark:bg-gray-900/90 text-foreground border-0 shadow-sm" }, {
                              default: withCtx(() => [
                                createVNode(unref(Clock), {
                                  class: "h-3 w-3 mr-1",
                                  "aria-hidden": "true"
                                }),
                                createVNode("span", { class: "sr-only" }, "Waktu baca:"),
                                createTextVNode(" " + toDisplayString(article.reading_time) + " min ", 1)
                              ]),
                              _: 2
                            }, 1024)
                          ])
                        ]),
                        createVNode(unref(_sfc_main$5), { class: "p-5 flex-1 flex flex-col" }, {
                          default: withCtx(() => [
                            createVNode("time", {
                              class: "flex items-center gap-2 mb-3 text-xs text-muted-foreground",
                              datetime: article.published_at
                            }, toDisplayString(article.published_at), 9, ["datetime"]),
                            createVNode("h3", { class: "font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors" }, toDisplayString(article.title), 1),
                            createVNode("p", { class: "text-sm text-muted-foreground line-clamp-3 mb-4 flex-1" }, toDisplayString(article.seo_description), 1),
                            article.tags.length > 0 ? (openBlock(), createBlock("nav", {
                              key: 0,
                              class: "flex flex-wrap gap-1",
                              "aria-label": "Tag artikel"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(article.tags.slice(0, 3), (tag) => {
                                return openBlock(), createBlock(unref(_sfc_main$6), {
                                  key: tag,
                                  variant: "secondary",
                                  class: "text-xs"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(tag), 1)
                                  ]),
                                  _: 2
                                }, 1024);
                              }), 128))
                            ])) : createCommentVNode("", true)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$7), { class: "px-5 pb-5 pt-0" }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$3), {
                              variant: "ghost",
                              size: "sm",
                              class: "w-full group-hover:bg-primary group-hover:text-primary-foreground",
                              "aria-label": "Baca artikel selengkapnya"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Baca Selengkapnya "),
                                createVNode(unref(ChevronRight), {
                                  class: "h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform",
                                  "aria-hidden": "true"
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</article>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div class="text-center py-16" role="status"${_scopeId}><div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Search), {
                class: "h-8 w-8 text-muted-foreground",
                "aria-hidden": "true"
              }, null, _parent2, _scopeId));
              _push2(`</div><h3 class="text-lg font-semibold mb-2"${_scopeId}>Tidak ada artikel ditemukan</h3><p class="text-muted-foreground mb-4"${_scopeId}> Coba ubah filter atau kata kunci pencarian Anda </p>`);
              _push2(ssrRenderComponent(unref(_sfc_main$3), {
                onClick: clearFilters,
                variant: "outline",
                "aria-label": "Hapus semua filter"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Clear Filters `);
                  } else {
                    return [
                      createTextVNode(" Clear Filters ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            }
            if (__props.articles.last_page > 1) {
              _push2(`<nav class="mt-8 flex justify-center" aria-label="Navigasi halaman artikel"${_scopeId}><div class="flex items-center gap-2" role="navigation"${_scopeId}><!--[-->`);
              ssrRenderList(__props.articles.links, (link, index) => {
                _push2(ssrRenderComponent(unref(_sfc_main$3), {
                  variant: link.active ? "default" : "outline",
                  disabled: !link.url,
                  size: "sm",
                  onClick: ($event) => link.url && unref(router).visit(link.url),
                  "aria-label": getPaginationLabel(link.label, link.active),
                  "aria-current": link.active ? "page" : void 0
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<span${_scopeId2}>${link.label ?? ""}</span>`);
                    } else {
                      return [
                        createVNode("span", {
                          innerHTML: link.label
                        }, null, 8, ["innerHTML"])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]--></div></nav>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</main></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "min-h-screen bg-gray-50 dark:bg-gray-950" }, [
                createVNode("div", { class: "bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white" }, [
                  createVNode("div", { class: "container mx-auto px-4 py-16 md:py-24" }, [
                    createVNode("div", { class: "max-w-3xl mx-auto text-center" }, [
                      createVNode("h1", { class: "text-4xl md:text-5xl font-bold mb-4" }, " Artikel & Blog "),
                      createVNode("p", { class: "text-lg md:text-xl text-white/90 mb-8" }, " Temukan informasi menarik, tips, dan panduan seputar produk dan layanan kami "),
                      createVNode("div", { class: "max-w-2xl mx-auto" }, [
                        createVNode("form", {
                          onSubmit: withModifiers(performSearch, ["prevent"]),
                          role: "search"
                        }, [
                          createVNode("label", {
                            for: "article-search",
                            class: "sr-only"
                          }, "Cari artikel"),
                          createVNode("div", { class: "relative" }, [
                            createVNode(unref(Search), {
                              class: "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400",
                              "aria-hidden": "true"
                            }),
                            createVNode(unref(_sfc_main$2), {
                              id: "article-search",
                              modelValue: searchQuery.value,
                              "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                              type: "search",
                              placeholder: "Cari artikel...",
                              class: "pl-12 pr-32 h-14 text-base bg-white dark:bg-gray-900 border-0 shadow-lg",
                              "aria-label": "Cari artikel"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(unref(_sfc_main$3), {
                              type: "submit",
                              class: "absolute right-2 top-1/2 -translate-y-1/2 h-10",
                              "aria-label": "Tombol cari"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Cari ")
                              ]),
                              _: 1
                            })
                          ])
                        ], 32)
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "container mx-auto px-4 py-8 md:py-12" }, [
                  createVNode("div", { class: "flex flex-col lg:flex-row gap-8" }, [
                    createVNode("aside", {
                      class: "lg:w-64 flex-shrink-0",
                      role: "complementary",
                      "aria-label": "Filter artikel"
                    }, [
                      createVNode("div", { class: "sticky top-4 space-y-6" }, [
                        createVNode(unref(_sfc_main$4), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$5), { class: "p-4" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex items-center gap-2 mb-4" }, [
                                  createVNode(unref(Tag), {
                                    class: "h-4 w-4",
                                    "aria-hidden": "true"
                                  }),
                                  createVNode("h2", { class: "font-semibold text-base" }, "Tag Populer")
                                ]),
                                createVNode("nav", { "aria-label": "Filter berdasarkan tag" }, [
                                  createVNode("div", { class: "flex flex-wrap gap-2" }, [
                                    hasActiveFilters.value ? (openBlock(), createBlock(unref(_sfc_main$6), {
                                      key: 0,
                                      variant: "outline",
                                      class: "cursor-pointer hover:bg-destructive hover:text-destructive-foreground",
                                      onClick: clearFilters,
                                      role: "button",
                                      tabindex: "0",
                                      onKeypress: withKeys(clearFilters, ["enter"])
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Clear Filters ")
                                      ]),
                                      _: 1
                                    })) : createCommentVNode("", true),
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.allTags, (tag) => {
                                      return openBlock(), createBlock(unref(_sfc_main$6), {
                                        key: tag,
                                        variant: selectedTag.value === tag ? "default" : "secondary",
                                        class: "cursor-pointer hover:bg-primary hover:text-primary-foreground",
                                        onClick: ($event) => selectTag(tag === selectedTag.value ? null : tag),
                                        role: "button",
                                        tabindex: "0",
                                        "aria-pressed": selectedTag.value === tag,
                                        onKeypress: withKeys(($event) => selectTag(tag === selectedTag.value ? null : tag), ["enter"])
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(tag), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["variant", "onClick", "aria-pressed", "onKeypress"]);
                                    }), 128))
                                  ])
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$4), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$5), { class: "p-4" }, {
                              default: withCtx(() => [
                                createVNode("p", { class: "text-sm text-muted-foreground" }, [
                                  createTextVNode(" Menampilkan "),
                                  createVNode("span", { class: "font-semibold text-foreground" }, toDisplayString(__props.articles.data.length), 1),
                                  createTextVNode(" dari "),
                                  createVNode("span", { class: "font-semibold text-foreground" }, toDisplayString(__props.articles.total), 1),
                                  createTextVNode(" artikel ")
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    createVNode("main", {
                      class: "flex-1",
                      role: "main"
                    }, [
                      hasActiveFilters.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mb-6 flex flex-wrap items-center gap-2",
                        role: "status",
                        "aria-live": "polite"
                      }, [
                        createVNode("span", { class: "text-sm text-muted-foreground" }, "Filter aktif:"),
                        searchQuery.value ? (openBlock(), createBlock(unref(_sfc_main$6), {
                          key: 0,
                          variant: "outline",
                          class: "gap-1"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Search: " + toDisplayString(searchQuery.value), 1)
                          ]),
                          _: 1
                        })) : createCommentVNode("", true),
                        selectedTag.value ? (openBlock(), createBlock(unref(_sfc_main$6), {
                          key: 1,
                          variant: "outline",
                          class: "gap-1"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Tag: " + toDisplayString(selectedTag.value), 1)
                          ]),
                          _: 1
                        })) : createCommentVNode("", true)
                      ])) : createCommentVNode("", true),
                      __props.articles.data.length > 0 ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.articles.data, (article) => {
                          return openBlock(), createBlock("article", {
                            key: article.id
                          }, [
                            createVNode(unref(_sfc_main$4), {
                              class: "group hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer h-full flex flex-col",
                              onClick: ($event) => unref(router).visit(`/artikel/${article.slug}`),
                              tabindex: "0",
                              role: "link",
                              "aria-label": `Baca artikel: ${article.title}`,
                              onKeypress: withKeys(($event) => unref(router).visit(`/artikel/${article.slug}`), ["enter"])
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "relative h-48 overflow-hidden bg-muted" }, [
                                  createVNode("img", {
                                    src: getImageUrl(article.featured_image),
                                    alt: article.title,
                                    class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300",
                                    loading: "lazy",
                                    width: "800",
                                    height: "450"
                                  }, null, 8, ["src", "alt"]),
                                  createVNode("div", { class: "absolute top-3 right-3" }, [
                                    createVNode(unref(_sfc_main$6), { class: "bg-white/90 dark:bg-gray-900/90 text-foreground border-0 shadow-sm" }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Clock), {
                                          class: "h-3 w-3 mr-1",
                                          "aria-hidden": "true"
                                        }),
                                        createVNode("span", { class: "sr-only" }, "Waktu baca:"),
                                        createTextVNode(" " + toDisplayString(article.reading_time) + " min ", 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ])
                                ]),
                                createVNode(unref(_sfc_main$5), { class: "p-5 flex-1 flex flex-col" }, {
                                  default: withCtx(() => [
                                    createVNode("time", {
                                      class: "flex items-center gap-2 mb-3 text-xs text-muted-foreground",
                                      datetime: article.published_at
                                    }, toDisplayString(article.published_at), 9, ["datetime"]),
                                    createVNode("h3", { class: "font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors" }, toDisplayString(article.title), 1),
                                    createVNode("p", { class: "text-sm text-muted-foreground line-clamp-3 mb-4 flex-1" }, toDisplayString(article.seo_description), 1),
                                    article.tags.length > 0 ? (openBlock(), createBlock("nav", {
                                      key: 0,
                                      class: "flex flex-wrap gap-1",
                                      "aria-label": "Tag artikel"
                                    }, [
                                      (openBlock(true), createBlock(Fragment, null, renderList(article.tags.slice(0, 3), (tag) => {
                                        return openBlock(), createBlock(unref(_sfc_main$6), {
                                          key: tag,
                                          variant: "secondary",
                                          class: "text-xs"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(tag), 1)
                                          ]),
                                          _: 2
                                        }, 1024);
                                      }), 128))
                                    ])) : createCommentVNode("", true)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$7), { class: "px-5 pb-5 pt-0" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$3), {
                                      variant: "ghost",
                                      size: "sm",
                                      class: "w-full group-hover:bg-primary group-hover:text-primary-foreground",
                                      "aria-label": "Baca artikel selengkapnya"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Baca Selengkapnya "),
                                        createVNode(unref(ChevronRight), {
                                          class: "h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform",
                                          "aria-hidden": "true"
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 2
                            }, 1032, ["onClick", "aria-label", "onKeypress"])
                          ]);
                        }), 128))
                      ])) : (openBlock(), createBlock("div", {
                        key: 2,
                        class: "text-center py-16",
                        role: "status"
                      }, [
                        createVNode("div", { class: "inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4" }, [
                          createVNode(unref(Search), {
                            class: "h-8 w-8 text-muted-foreground",
                            "aria-hidden": "true"
                          })
                        ]),
                        createVNode("h3", { class: "text-lg font-semibold mb-2" }, "Tidak ada artikel ditemukan"),
                        createVNode("p", { class: "text-muted-foreground mb-4" }, " Coba ubah filter atau kata kunci pencarian Anda "),
                        createVNode(unref(_sfc_main$3), {
                          onClick: clearFilters,
                          variant: "outline",
                          "aria-label": "Hapus semua filter"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Clear Filters ")
                          ]),
                          _: 1
                        })
                      ])),
                      __props.articles.last_page > 1 ? (openBlock(), createBlock("nav", {
                        key: 3,
                        class: "mt-8 flex justify-center",
                        "aria-label": "Navigasi halaman artikel"
                      }, [
                        createVNode("div", {
                          class: "flex items-center gap-2",
                          role: "navigation"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.articles.links, (link, index) => {
                            return openBlock(), createBlock(unref(_sfc_main$3), {
                              key: index,
                              variant: link.active ? "default" : "outline",
                              disabled: !link.url,
                              size: "sm",
                              onClick: ($event) => link.url && unref(router).visit(link.url),
                              "aria-label": getPaginationLabel(link.label, link.active),
                              "aria-current": link.active ? "page" : void 0
                            }, {
                              default: withCtx(() => [
                                createVNode("span", {
                                  innerHTML: link.label
                                }, null, 8, ["innerHTML"])
                              ]),
                              _: 2
                            }, 1032, ["variant", "disabled", "onClick", "aria-label", "aria-current"]);
                          }), 128))
                        ])
                      ])) : createCommentVNode("", true)
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/ecommerce/Articles/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
