import { defineComponent, unref, withCtx, createVNode, toDisplayString, createBlock, openBlock, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./Ecommerce-CcXwhgpk.js";
import { Head } from "@inertiajs/vue3";
import { _ as _sfc_main$2, c as _sfc_main$3 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$4 } from "./ArticleContent-BnIhAW9N.js";
import "./index-D3PKcwoM.js";
import "class-variance-authority";
import "./index-SN_CnQ_F.js";
import "reka-ui";
import "clsx";
import "tailwind-merge";
import "./Input-BGi8wCMh.js";
import "@vueuse/core";
import "./Label-16aMY2sx.js";
import "lucide-vue-next";
import "./SelectValue-BUnv4mQg.js";
import "./DropdownMenuTrigger-B1v6pHML.js";
import "axios";
import "vue-sonner";
import "./index-BpQimeTM.js";
import "./Checkbox-CIOQa2-J.js";
import "./useAppearance-gspEihnp.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    page: {}
  },
  setup(__props) {
    const props = __props;
    const seoTitle = props.page.seo_title || props.page.title;
    const seoDescription = props.page.seo_description || "";
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(unref(seoTitle))}</title><meta name="description"${ssrRenderAttr("content", unref(seoDescription))}${_scopeId}><link rel="canonical"${ssrRenderAttr("href", `/page/${__props.page.slug}`)}${_scopeId}><meta property="og:title"${ssrRenderAttr("content", unref(seoTitle))}${_scopeId}><meta property="og:description"${ssrRenderAttr("content", unref(seoDescription))}${_scopeId}><meta property="og:url"${ssrRenderAttr("content", `/page/${__props.page.slug}`)}${_scopeId}><meta property="og:type" content="website"${_scopeId}><meta name="twitter:card" content="summary"${_scopeId}><meta name="twitter:title"${ssrRenderAttr("content", unref(seoTitle))}${_scopeId}><meta name="twitter:description"${ssrRenderAttr("content", unref(seoDescription))}${_scopeId}>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(unref(seoTitle)), 1),
              createVNode("meta", {
                name: "description",
                content: unref(seoDescription)
              }, null, 8, ["content"]),
              createVNode("link", {
                rel: "canonical",
                href: `/page/${__props.page.slug}`
              }, null, 8, ["href"]),
              createVNode("meta", {
                property: "og:title",
                content: unref(seoTitle)
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:description",
                content: unref(seoDescription)
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:url",
                content: `/page/${__props.page.slug}`
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:type",
                content: "website"
              }),
              createVNode("meta", {
                name: "twitter:card",
                content: "summary"
              }),
              createVNode("meta", {
                name: "twitter:title",
                content: unref(seoTitle)
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "twitter:description",
                content: unref(seoDescription)
              }, null, 8, ["content"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="bg-gradient-to-b from-muted/50 to-background py-12"${_scopeId}><div class="container mx-auto px-6"${_scopeId}><div class="${ssrRenderClass({
              "max-w-4xl mx-auto": __props.page.template === "default",
              "max-w-full": __props.page.template === "full-width",
              "max-w-2xl mx-auto": __props.page.template === "narrow"
            })}"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "p-8 md:p-12" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<article${_scopeId3}><header class="mb-8"${_scopeId3}><h1 class="text-3xl md:text-4xl font-bold mb-4"${_scopeId3}>${ssrInterpolate(__props.page.title)}</h1><time class="text-sm text-muted-foreground"${ssrRenderAttr("datetime", __props.page.updated_at)}${_scopeId3}> Terakhir diperbarui: ${ssrInterpolate(new Date(__props.page.updated_at).toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "long",
                          day: "numeric"
                        }))}</time></header>`);
                        if (__props.page.blocks && __props.page.blocks.length > 0) {
                          _push4(ssrRenderComponent(_sfc_main$4, {
                            blocks: __props.page.blocks
                          }, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<div class="text-center py-12 text-muted-foreground"${_scopeId3}><p${_scopeId3}>Konten belum tersedia.</p></div>`);
                        }
                        _push4(`</article>`);
                      } else {
                        return [
                          createVNode("article", null, [
                            createVNode("header", { class: "mb-8" }, [
                              createVNode("h1", { class: "text-3xl md:text-4xl font-bold mb-4" }, toDisplayString(__props.page.title), 1),
                              createVNode("time", {
                                class: "text-sm text-muted-foreground",
                                datetime: __props.page.updated_at
                              }, " Terakhir diperbarui: " + toDisplayString(new Date(__props.page.updated_at).toLocaleDateString("id-ID", {
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                              })), 9, ["datetime"])
                            ]),
                            __props.page.blocks && __props.page.blocks.length > 0 ? (openBlock(), createBlock(_sfc_main$4, {
                              key: 0,
                              blocks: __props.page.blocks
                            }, null, 8, ["blocks"])) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "text-center py-12 text-muted-foreground"
                            }, [
                              createVNode("p", null, "Konten belum tersedia.")
                            ]))
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), { class: "p-8 md:p-12" }, {
                      default: withCtx(() => [
                        createVNode("article", null, [
                          createVNode("header", { class: "mb-8" }, [
                            createVNode("h1", { class: "text-3xl md:text-4xl font-bold mb-4" }, toDisplayString(__props.page.title), 1),
                            createVNode("time", {
                              class: "text-sm text-muted-foreground",
                              datetime: __props.page.updated_at
                            }, " Terakhir diperbarui: " + toDisplayString(new Date(__props.page.updated_at).toLocaleDateString("id-ID", {
                              year: "numeric",
                              month: "long",
                              day: "numeric"
                            })), 9, ["datetime"])
                          ]),
                          __props.page.blocks && __props.page.blocks.length > 0 ? (openBlock(), createBlock(_sfc_main$4, {
                            key: 0,
                            blocks: __props.page.blocks
                          }, null, 8, ["blocks"])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "text-center py-12 text-muted-foreground"
                          }, [
                            createVNode("p", null, "Konten belum tersedia.")
                          ]))
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "bg-gradient-to-b from-muted/50 to-background py-12" }, [
                createVNode("div", { class: "container mx-auto px-6" }, [
                  createVNode("div", {
                    class: {
                      "max-w-4xl mx-auto": __props.page.template === "default",
                      "max-w-full": __props.page.template === "full-width",
                      "max-w-2xl mx-auto": __props.page.template === "narrow"
                    }
                  }, [
                    createVNode(unref(_sfc_main$2), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$3), { class: "p-8 md:p-12" }, {
                          default: withCtx(() => [
                            createVNode("article", null, [
                              createVNode("header", { class: "mb-8" }, [
                                createVNode("h1", { class: "text-3xl md:text-4xl font-bold mb-4" }, toDisplayString(__props.page.title), 1),
                                createVNode("time", {
                                  class: "text-sm text-muted-foreground",
                                  datetime: __props.page.updated_at
                                }, " Terakhir diperbarui: " + toDisplayString(new Date(__props.page.updated_at).toLocaleDateString("id-ID", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric"
                                })), 9, ["datetime"])
                              ]),
                              __props.page.blocks && __props.page.blocks.length > 0 ? (openBlock(), createBlock(_sfc_main$4, {
                                key: 0,
                                blocks: __props.page.blocks
                              }, null, 8, ["blocks"])) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "text-center py-12 text-muted-foreground"
                              }, [
                                createVNode("p", null, "Konten belum tersedia.")
                              ]))
                            ])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ], 2)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/ecommerce/Pages/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
