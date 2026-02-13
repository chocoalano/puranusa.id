import { defineComponent, computed, unref, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-D11fLPDM.js";
import { _ as _sfc_main$2 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5, d as _sfc_main$6, c as _sfc_main$7 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$8 } from "./index-BpQimeTM.js";
import { ArrowLeft, Pencil } from "lucide-vue-next";
import { u as usePermissions } from "./usePermissions-DYRibCI0.js";
import "class-variance-authority";
import "./DropdownMenuTrigger-B1v6pHML.js";
import "reka-ui";
import "@vueuse/core";
import "./Input-BGi8wCMh.js";
import "./index-3UqiGNe9.js";
import "./AvatarImage-DWFQMckn.js";
import "./index-Bfu0FVt6.js";
import "vue-sonner";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
import "clsx";
import "tailwind-merge";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    item: {}
  },
  setup(__props) {
    const props = __props;
    const { isSuperAdmin, isAdmin } = usePermissions();
    const childrenCount = computed(() => props.item.children?.length || 0);
    const contentsCount = computed(() => props.item.contents?.length || 0);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: __props.item.name
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="container mx-auto py-6 space-y-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div class="flex items-center gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), { href: "/admin/zenner-club/categories" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$2), {
                    variant: "outline",
                    size: "icon"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(ArrowLeft), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(ArrowLeft), { class: "h-4 w-4" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$2), {
                      variant: "outline",
                      size: "icon"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(ArrowLeft), { class: "h-4 w-4" })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div${_scopeId}><h1 class="text-3xl font-bold"${_scopeId}>Detail Kategori</h1><p class="text-muted-foreground"${_scopeId}>Informasi kategori Zenner Club</p></div></div>`);
            if (unref(isSuperAdmin) || unref(isAdmin)) {
              _push2(ssrRenderComponent(unref(Link), {
                href: `/admin/zenner-club/categories/${__props.item.id}/edit`
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$2), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Pencil), { class: "mr-2 h-4 w-4" }, null, _parent4, _scopeId3));
                          _push4(` Edit Kategori `);
                        } else {
                          return [
                            createVNode(unref(Pencil), { class: "mr-2 h-4 w-4" }),
                            createTextVNode(" Edit Kategori ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$2), null, {
                        default: withCtx(() => [
                          createVNode(unref(Pencil), { class: "mr-2 h-4 w-4" }),
                          createTextVNode(" Edit Kategori ")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$3), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(__props.item.name)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(__props.item.name), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(__props.item.slug)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(__props.item.slug), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(__props.item.name), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(__props.item.slug), 1)
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { class: "space-y-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex flex-wrap gap-3"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { variant: "outline" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Parent: ${ssrInterpolate(__props.item.parent?.name || "Tidak ada")}`);
                            } else {
                              return [
                                createTextVNode("Parent: " + toDisplayString(__props.item.parent?.name || "Tidak ada"), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { variant: "outline" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Sub-kategori: ${ssrInterpolate(childrenCount.value)}`);
                            } else {
                              return [
                                createTextVNode("Sub-kategori: " + toDisplayString(childrenCount.value), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { variant: "outline" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Konten: ${ssrInterpolate(contentsCount.value)}`);
                            } else {
                              return [
                                createTextVNode("Konten: " + toDisplayString(contentsCount.value), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div><div class="space-y-2"${_scopeId3}><p class="text-sm text-muted-foreground"${_scopeId3}>Sub-kategori</p>`);
                        if (childrenCount.value) {
                          _push4(`<div class="flex flex-wrap gap-2"${_scopeId3}><!--[-->`);
                          ssrRenderList(__props.item.children, (child) => {
                            _push4(ssrRenderComponent(unref(_sfc_main$8), {
                              key: child.id,
                              variant: "secondary"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(child.name)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(child.name), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          });
                          _push4(`<!--]--></div>`);
                        } else {
                          _push4(`<p class="text-sm text-muted-foreground"${_scopeId3}>-</p>`);
                        }
                        _push4(`</div><div class="space-y-2"${_scopeId3}><p class="text-sm text-muted-foreground"${_scopeId3}>Konten</p>`);
                        if (contentsCount.value) {
                          _push4(`<div class="flex flex-col gap-2"${_scopeId3}><!--[-->`);
                          ssrRenderList(__props.item.contents, (content) => {
                            _push4(`<div class="rounded-md border border-border px-3 py-2 text-sm"${_scopeId3}><p class="font-medium"${_scopeId3}>${ssrInterpolate(content.title)}</p><p class="text-xs text-muted-foreground"${_scopeId3}>${ssrInterpolate(content.slug)}</p></div>`);
                          });
                          _push4(`<!--]--></div>`);
                        } else {
                          _push4(`<p class="text-sm text-muted-foreground"${_scopeId3}>-</p>`);
                        }
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex flex-wrap gap-3" }, [
                            createVNode(unref(_sfc_main$8), { variant: "outline" }, {
                              default: withCtx(() => [
                                createTextVNode("Parent: " + toDisplayString(__props.item.parent?.name || "Tidak ada"), 1)
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$8), { variant: "outline" }, {
                              default: withCtx(() => [
                                createTextVNode("Sub-kategori: " + toDisplayString(childrenCount.value), 1)
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$8), { variant: "outline" }, {
                              default: withCtx(() => [
                                createTextVNode("Konten: " + toDisplayString(contentsCount.value), 1)
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("p", { class: "text-sm text-muted-foreground" }, "Sub-kategori"),
                            childrenCount.value ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "flex flex-wrap gap-2"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.item.children, (child) => {
                                return openBlock(), createBlock(unref(_sfc_main$8), {
                                  key: child.id,
                                  variant: "secondary"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(child.name), 1)
                                  ]),
                                  _: 2
                                }, 1024);
                              }), 128))
                            ])) : (openBlock(), createBlock("p", {
                              key: 1,
                              class: "text-sm text-muted-foreground"
                            }, "-"))
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("p", { class: "text-sm text-muted-foreground" }, "Konten"),
                            contentsCount.value ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "flex flex-col gap-2"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.item.contents, (content) => {
                                return openBlock(), createBlock("div", {
                                  key: content.id,
                                  class: "rounded-md border border-border px-3 py-2 text-sm"
                                }, [
                                  createVNode("p", { class: "font-medium" }, toDisplayString(content.title), 1),
                                  createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(content.slug), 1)
                                ]);
                              }), 128))
                            ])) : (openBlock(), createBlock("p", {
                              key: 1,
                              class: "text-sm text-muted-foreground"
                            }, "-"))
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(__props.item.name), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(__props.item.slug), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex flex-wrap gap-3" }, [
                          createVNode(unref(_sfc_main$8), { variant: "outline" }, {
                            default: withCtx(() => [
                              createTextVNode("Parent: " + toDisplayString(__props.item.parent?.name || "Tidak ada"), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$8), { variant: "outline" }, {
                            default: withCtx(() => [
                              createTextVNode("Sub-kategori: " + toDisplayString(childrenCount.value), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$8), { variant: "outline" }, {
                            default: withCtx(() => [
                              createTextVNode("Konten: " + toDisplayString(contentsCount.value), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("p", { class: "text-sm text-muted-foreground" }, "Sub-kategori"),
                          childrenCount.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex flex-wrap gap-2"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.item.children, (child) => {
                              return openBlock(), createBlock(unref(_sfc_main$8), {
                                key: child.id,
                                variant: "secondary"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(child.name), 1)
                                ]),
                                _: 2
                              }, 1024);
                            }), 128))
                          ])) : (openBlock(), createBlock("p", {
                            key: 1,
                            class: "text-sm text-muted-foreground"
                          }, "-"))
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("p", { class: "text-sm text-muted-foreground" }, "Konten"),
                          contentsCount.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex flex-col gap-2"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.item.contents, (content) => {
                              return openBlock(), createBlock("div", {
                                key: content.id,
                                class: "rounded-md border border-border px-3 py-2 text-sm"
                              }, [
                                createVNode("p", { class: "font-medium" }, toDisplayString(content.title), 1),
                                createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(content.slug), 1)
                              ]);
                            }), 128))
                          ])) : (openBlock(), createBlock("p", {
                            key: 1,
                            class: "text-sm text-muted-foreground"
                          }, "-"))
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "container mx-auto py-6 space-y-6" }, [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("div", { class: "flex items-center gap-4" }, [
                    createVNode(unref(Link), { href: "/admin/zenner-club/categories" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$2), {
                          variant: "outline",
                          size: "icon"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(ArrowLeft), { class: "h-4 w-4" })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-3xl font-bold" }, "Detail Kategori"),
                      createVNode("p", { class: "text-muted-foreground" }, "Informasi kategori Zenner Club")
                    ])
                  ]),
                  unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(Link), {
                    key: 0,
                    href: `/admin/zenner-club/categories/${__props.item.id}/edit`
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$2), null, {
                        default: withCtx(() => [
                          createVNode(unref(Pencil), { class: "mr-2 h-4 w-4" }),
                          createTextVNode(" Edit Kategori ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["href"])) : createCommentVNode("", true)
                ]),
                createVNode(unref(_sfc_main$3), null, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(__props.item.name), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(__props.item.slug), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex flex-wrap gap-3" }, [
                          createVNode(unref(_sfc_main$8), { variant: "outline" }, {
                            default: withCtx(() => [
                              createTextVNode("Parent: " + toDisplayString(__props.item.parent?.name || "Tidak ada"), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$8), { variant: "outline" }, {
                            default: withCtx(() => [
                              createTextVNode("Sub-kategori: " + toDisplayString(childrenCount.value), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$8), { variant: "outline" }, {
                            default: withCtx(() => [
                              createTextVNode("Konten: " + toDisplayString(contentsCount.value), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("p", { class: "text-sm text-muted-foreground" }, "Sub-kategori"),
                          childrenCount.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex flex-wrap gap-2"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.item.children, (child) => {
                              return openBlock(), createBlock(unref(_sfc_main$8), {
                                key: child.id,
                                variant: "secondary"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(child.name), 1)
                                ]),
                                _: 2
                              }, 1024);
                            }), 128))
                          ])) : (openBlock(), createBlock("p", {
                            key: 1,
                            class: "text-sm text-muted-foreground"
                          }, "-"))
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("p", { class: "text-sm text-muted-foreground" }, "Konten"),
                          contentsCount.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex flex-col gap-2"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.item.contents, (content) => {
                              return openBlock(), createBlock("div", {
                                key: content.id,
                                class: "rounded-md border border-border px-3 py-2 text-sm"
                              }, [
                                createVNode("p", { class: "font-medium" }, toDisplayString(content.title), 1),
                                createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(content.slug), 1)
                              ]);
                            }), 128))
                          ])) : (openBlock(), createBlock("p", {
                            key: 1,
                            class: "text-sm text-muted-foreground"
                          }, "-"))
                        ])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/ZennerClub/Categories/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
