import { defineComponent, unref, withCtx, createVNode, toDisplayString, createTextVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { Head, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./Ecommerce-CCwufmLs.js";
import { _ as _sfc_main$5 } from "./ArticleContent-BnIhAW9N.js";
import { _ as _sfc_main$6, c as _sfc_main$7 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$3 } from "./index-BpQimeTM.js";
import { _ as _sfc_main$2 } from "./index-SN_CnQ_F.js";
import { e as _sfc_main$4 } from "./DropdownMenuTrigger-B1v6pHML.js";
import { ArrowLeft, Calendar, Clock, Share2, Tag } from "lucide-vue-next";
import "./index-D3PKcwoM.js";
import "class-variance-authority";
import "./Input-BGi8wCMh.js";
import "@vueuse/core";
import "./Label-16aMY2sx.js";
import "reka-ui";
import "./SelectValue-BUnv4mQg.js";
import "axios";
import "vue-sonner";
import "./Checkbox-CIOQa2-J.js";
import "./useAppearance-gspEihnp.js";
import "clsx";
import "tailwind-merge";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    article: {},
    relatedArticles: {}
  },
  setup(__props) {
    const props = __props;
    const shareArticle = () => {
      if (typeof window === "undefined" || typeof navigator === "undefined") return;
      if (navigator.share) {
        navigator.share({
          title: props.article.title,
          text: props.article.seo_description,
          url: window.location.href
        }).catch(() => {
        });
      } else {
        navigator.clipboard.writeText(window.location.href);
        alert("Link artikel telah disalin!");
      }
    };
    const getImageUrl = (url) => {
      if (!url) return "https://placehold.co/400x300/e2e8f0/64748b?text=No+Image";
      return url.startsWith("/") ? url : `/${url}`;
    };
    const getFeaturedImage = () => {
      if (!props.article.blocks || !Array.isArray(props.article.blocks)) {
        return null;
      }
      const imageBlock = props.article.blocks.find((block) => block.type === "image");
      if (imageBlock) {
        const content = imageBlock.content || imageBlock;
        return content.url || null;
      }
      return null;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(__props.article.seo_title || __props.article.title)}</title><meta name="description"${ssrRenderAttr("content", __props.article.seo_description)}${_scopeId}><meta property="og:title"${ssrRenderAttr("content", __props.article.seo_title || __props.article.title)}${_scopeId}><meta property="og:description"${ssrRenderAttr("content", __props.article.seo_description)}${_scopeId}><meta property="og:image"${ssrRenderAttr("content", getFeaturedImage())}${_scopeId}><meta property="og:type" content="article"${_scopeId}>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(__props.article.seo_title || __props.article.title), 1),
              createVNode("meta", {
                name: "description",
                content: __props.article.seo_description
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:title",
                content: __props.article.seo_title || __props.article.title
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:description",
                content: __props.article.seo_description
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:image",
                content: getFeaturedImage()
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:type",
                content: "article"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="min-h-screen bg-gray-50 dark:bg-gray-950"${_scopeId}><div class="border-b bg-white dark:bg-gray-900"${_scopeId}><div class="container mx-auto px-4 py-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              variant: "ghost",
              size: "sm",
              onClick: ($event) => unref(router).visit("/artikel"),
              class: "gap-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ArrowLeft), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(` Kembali ke Artikel `);
                } else {
                  return [
                    createVNode(unref(ArrowLeft), { class: "h-4 w-4" }),
                    createTextVNode(" Kembali ke Artikel ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><article class="container mx-auto px-4 py-8 md:py-12"${_scopeId}><div class="max-w-4xl mx-auto"${_scopeId}><header class="mb-8"${_scopeId}><h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight"${_scopeId}>${ssrInterpolate(__props.article.title)}</h1><div class="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6"${_scopeId}><div class="flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Calendar), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            _push2(`<time${_scopeId}>${ssrInterpolate(__props.article.published_at)}</time></div><div class="flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Clock), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>${ssrInterpolate(__props.article.reading_time)} menit baca</span></div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              variant: "outline",
              size: "sm",
              onClick: shareArticle,
              class: "ml-auto gap-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Share2), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(` Bagikan `);
                } else {
                  return [
                    createVNode(unref(Share2), { class: "h-4 w-4" }),
                    createTextVNode(" Bagikan ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (__props.article.tags.length > 0) {
              _push2(`<div class="flex flex-wrap gap-2 mb-6"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Tag), { class: "h-4 w-4 text-muted-foreground" }, null, _parent2, _scopeId));
              _push2(`<!--[-->`);
              ssrRenderList(__props.article.tags, (tag) => {
                _push2(ssrRenderComponent(unref(_sfc_main$3), {
                  key: tag,
                  variant: "secondary",
                  class: "cursor-pointer",
                  onClick: ($event) => unref(router).visit(`/artikel?tag=${tag}`)
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(tag)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(tag), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(_sfc_main$4), null, null, _parent2, _scopeId));
            _push2(`</header><div class="prose prose-lg max-w-none dark:prose-invert mb-12"${_scopeId}>`);
            if (__props.article.blocks && __props.article.blocks.length > 0) {
              _push2(ssrRenderComponent(_sfc_main$5, {
                blocks: __props.article.blocks
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<p class="text-muted-foreground"${_scopeId}>Konten artikel tidak tersedia.</p>`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "my-12" }, null, _parent2, _scopeId));
            _push2(`<footer class="mb-12"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div class="flex flex-wrap gap-2"${_scopeId}><span class="text-sm text-muted-foreground"${_scopeId}>Bagikan:</span>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              variant: "outline",
              size: "sm",
              onClick: shareArticle
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Share2), { class: "h-4 w-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` Bagikan Artikel `);
                } else {
                  return [
                    createVNode(unref(Share2), { class: "h-4 w-4 mr-2" }),
                    createTextVNode(" Bagikan Artikel ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></footer>`);
            if (__props.relatedArticles.length > 0) {
              _push2(`<section class="mt-16"${_scopeId}><h2 class="text-2xl font-bold mb-6"${_scopeId}>Artikel Terkait</h2><div class="grid grid-cols-1 md:grid-cols-3 gap-6"${_scopeId}><!--[-->`);
              ssrRenderList(__props.relatedArticles, (related) => {
                _push2(ssrRenderComponent(unref(_sfc_main$6), {
                  key: related.id,
                  class: "group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden",
                  onClick: ($event) => unref(router).visit(`/artikel/${related.slug}`)
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="relative h-40 overflow-hidden bg-muted"${_scopeId2}><img${ssrRenderAttr("src", getImageUrl(related.featured_image))}${ssrRenderAttr("alt", related.title)} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"${_scopeId2}></div>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$7), { class: "p-4" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<div class="text-xs text-muted-foreground mb-2"${_scopeId3}>${ssrInterpolate(related.published_at)}</div><h3 class="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors"${_scopeId3}>${ssrInterpolate(related.title)}</h3><p class="text-sm text-muted-foreground line-clamp-2"${_scopeId3}>${ssrInterpolate(related.seo_description)}</p>`);
                          } else {
                            return [
                              createVNode("div", { class: "text-xs text-muted-foreground mb-2" }, toDisplayString(related.published_at), 1),
                              createVNode("h3", { class: "font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors" }, toDisplayString(related.title), 1),
                              createVNode("p", { class: "text-sm text-muted-foreground line-clamp-2" }, toDisplayString(related.seo_description), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode("div", { class: "relative h-40 overflow-hidden bg-muted" }, [
                          createVNode("img", {
                            src: getImageUrl(related.featured_image),
                            alt: related.title,
                            class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          }, null, 8, ["src", "alt"])
                        ]),
                        createVNode(unref(_sfc_main$7), { class: "p-4" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "text-xs text-muted-foreground mb-2" }, toDisplayString(related.published_at), 1),
                            createVNode("h3", { class: "font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors" }, toDisplayString(related.title), 1),
                            createVNode("p", { class: "text-sm text-muted-foreground line-clamp-2" }, toDisplayString(related.seo_description), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]--></div></section>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></article></div>`);
          } else {
            return [
              createVNode("div", { class: "min-h-screen bg-gray-50 dark:bg-gray-950" }, [
                createVNode("div", { class: "border-b bg-white dark:bg-gray-900" }, [
                  createVNode("div", { class: "container mx-auto px-4 py-4" }, [
                    createVNode(unref(_sfc_main$2), {
                      variant: "ghost",
                      size: "sm",
                      onClick: ($event) => unref(router).visit("/artikel"),
                      class: "gap-2"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(ArrowLeft), { class: "h-4 w-4" }),
                        createTextVNode(" Kembali ke Artikel ")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ])
                ]),
                createVNode("article", { class: "container mx-auto px-4 py-8 md:py-12" }, [
                  createVNode("div", { class: "max-w-4xl mx-auto" }, [
                    createVNode("header", { class: "mb-8" }, [
                      createVNode("h1", { class: "text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight" }, toDisplayString(__props.article.title), 1),
                      createVNode("div", { class: "flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6" }, [
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode(unref(Calendar), { class: "h-4 w-4" }),
                          createVNode("time", null, toDisplayString(__props.article.published_at), 1)
                        ]),
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode(unref(Clock), { class: "h-4 w-4" }),
                          createVNode("span", null, toDisplayString(__props.article.reading_time) + " menit baca", 1)
                        ]),
                        createVNode(unref(_sfc_main$2), {
                          variant: "outline",
                          size: "sm",
                          onClick: shareArticle,
                          class: "ml-auto gap-2"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Share2), { class: "h-4 w-4" }),
                            createTextVNode(" Bagikan ")
                          ]),
                          _: 1
                        })
                      ]),
                      __props.article.tags.length > 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex flex-wrap gap-2 mb-6"
                      }, [
                        createVNode(unref(Tag), { class: "h-4 w-4 text-muted-foreground" }),
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.article.tags, (tag) => {
                          return openBlock(), createBlock(unref(_sfc_main$3), {
                            key: tag,
                            variant: "secondary",
                            class: "cursor-pointer",
                            onClick: ($event) => unref(router).visit(`/artikel?tag=${tag}`)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(tag), 1)
                            ]),
                            _: 2
                          }, 1032, ["onClick"]);
                        }), 128))
                      ])) : createCommentVNode("", true),
                      createVNode(unref(_sfc_main$4))
                    ]),
                    createVNode("div", { class: "prose prose-lg max-w-none dark:prose-invert mb-12" }, [
                      __props.article.blocks && __props.article.blocks.length > 0 ? (openBlock(), createBlock(_sfc_main$5, {
                        key: 0,
                        blocks: __props.article.blocks
                      }, null, 8, ["blocks"])) : (openBlock(), createBlock("p", {
                        key: 1,
                        class: "text-muted-foreground"
                      }, "Konten artikel tidak tersedia."))
                    ]),
                    createVNode(unref(_sfc_main$4), { class: "my-12" }),
                    createVNode("footer", { class: "mb-12" }, [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("div", { class: "flex flex-wrap gap-2" }, [
                          createVNode("span", { class: "text-sm text-muted-foreground" }, "Bagikan:"),
                          createVNode(unref(_sfc_main$2), {
                            variant: "outline",
                            size: "sm",
                            onClick: shareArticle
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Share2), { class: "h-4 w-4 mr-2" }),
                              createTextVNode(" Bagikan Artikel ")
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    __props.relatedArticles.length > 0 ? (openBlock(), createBlock("section", {
                      key: 0,
                      class: "mt-16"
                    }, [
                      createVNode("h2", { class: "text-2xl font-bold mb-6" }, "Artikel Terkait"),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.relatedArticles, (related) => {
                          return openBlock(), createBlock(unref(_sfc_main$6), {
                            key: related.id,
                            class: "group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden",
                            onClick: ($event) => unref(router).visit(`/artikel/${related.slug}`)
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "relative h-40 overflow-hidden bg-muted" }, [
                                createVNode("img", {
                                  src: getImageUrl(related.featured_image),
                                  alt: related.title,
                                  class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                }, null, 8, ["src", "alt"])
                              ]),
                              createVNode(unref(_sfc_main$7), { class: "p-4" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "text-xs text-muted-foreground mb-2" }, toDisplayString(related.published_at), 1),
                                  createVNode("h3", { class: "font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors" }, toDisplayString(related.title), 1),
                                  createVNode("p", { class: "text-sm text-muted-foreground line-clamp-2" }, toDisplayString(related.seo_description), 1)
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1032, ["onClick"]);
                        }), 128))
                      ])
                    ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/ecommerce/Articles/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
