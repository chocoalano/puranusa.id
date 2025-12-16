import { defineComponent, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext, toDisplayString, createBlock, openBlock, createCommentVNode, Fragment, renderList, ref } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$h } from "./AppLayout-Cw9UyDBf.js";
import { Link, Head, router } from "@inertiajs/vue3";
import { _ as _sfc_main$4 } from "./index-SN_CnQ_F.js";
import { Plus, Search, MoreHorizontal } from "lucide-vue-next";
import { _ as _sfc_main$5 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$c } from "./index-BpQimeTM.js";
import { _ as _sfc_main$6, a as _sfc_main$7, b as _sfc_main$8, c as _sfc_main$9, d as _sfc_main$a, e as _sfc_main$b } from "./TableHeader-emcE6QAC.js";
import { _ as _sfc_main$d, a as _sfc_main$e, b as _sfc_main$f, c as _sfc_main$g } from "./DropdownMenuTrigger-B1v6pHML.js";
import { _ as _sfc_main$i } from "./Pagination-DAUeA01Y.js";
import "class-variance-authority";
import "reka-ui";
import "@vueuse/core";
import "./index-D9uuAIUh.js";
import "./AvatarImage-DWFQMckn.js";
import "vue-sonner";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
import "clsx";
import "tailwind-merge";
import "./SelectValue-BUnv4mQg.js";
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "CategoryHeader",
  __ssrInlineRender: true,
  props: {
    title: {},
    description: {},
    showAddButton: { type: Boolean, default: true }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-between" }, _attrs))}><div><h2 class="text-3xl font-bold tracking-tight">${ssrInterpolate(__props.title)}</h2><p class="text-muted-foreground">${ssrInterpolate(__props.description)}</p></div>`);
      if (__props.showAddButton) {
        _push(ssrRenderComponent(unref(Link), { href: "/admin/categories/create" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Plus), { class: "mr-2 h-4 w-4" }, null, _parent3, _scopeId2));
                    _push3(` Tambah Kategori `);
                  } else {
                    return [
                      createVNode(unref(Plus), { class: "mr-2 h-4 w-4" }),
                      createTextVNode(" Tambah Kategori ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$4), null, {
                  default: withCtx(() => [
                    createVNode(unref(Plus), { class: "mr-2 h-4 w-4" }),
                    createTextVNode(" Tambah Kategori ")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/categories/CategoryHeader.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "CategorySearch",
  __ssrInlineRender: true,
  props: {
    modelValue: {}
  },
  emits: ["update:modelValue", "search"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center gap-4" }, _attrs))}><div class="relative flex-1">`);
      _push(ssrRenderComponent(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$5), {
        "model-value": __props.modelValue,
        "onUpdate:modelValue": ($event) => emit("update:modelValue", $event),
        placeholder: "Cari kategori...",
        class: "pl-10",
        onKeydown: ($event) => emit("search")
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/categories/CategorySearch.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CategoryTable",
  __ssrInlineRender: true,
  props: {
    categories: {}
  },
  emits: ["delete"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "rounded-md border" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(_sfc_main$6), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$7), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$8), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$9), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Nama Kategori`);
                            } else {
                              return [
                                createTextVNode("Nama Kategori")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$9), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Slug`);
                            } else {
                              return [
                                createTextVNode("Slug")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$9), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Parent`);
                            } else {
                              return [
                                createTextVNode("Parent")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$9), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Urutan`);
                            } else {
                              return [
                                createTextVNode("Urutan")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$9), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Jumlah Produk`);
                            } else {
                              return [
                                createTextVNode("Jumlah Produk")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$9), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Status`);
                            } else {
                              return [
                                createTextVNode("Status")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { class: "w-[80px]" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$9), null, {
                            default: withCtx(() => [
                              createTextVNode("Nama Kategori")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$9), null, {
                            default: withCtx(() => [
                              createTextVNode("Slug")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$9), null, {
                            default: withCtx(() => [
                              createTextVNode("Parent")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$9), null, {
                            default: withCtx(() => [
                              createTextVNode("Urutan")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$9), null, {
                            default: withCtx(() => [
                              createTextVNode("Jumlah Produk")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$9), null, {
                            default: withCtx(() => [
                              createTextVNode("Status")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$9), { class: "w-[80px]" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$8), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$9), null, {
                          default: withCtx(() => [
                            createTextVNode("Nama Kategori")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$9), null, {
                          default: withCtx(() => [
                            createTextVNode("Slug")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$9), null, {
                          default: withCtx(() => [
                            createTextVNode("Parent")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$9), null, {
                          default: withCtx(() => [
                            createTextVNode("Urutan")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$9), null, {
                          default: withCtx(() => [
                            createTextVNode("Jumlah Produk")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$9), null, {
                          default: withCtx(() => [
                            createTextVNode("Status")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$9), { class: "w-[80px]" })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$a), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (__props.categories.length === 0) {
                    _push3(ssrRenderComponent(unref(_sfc_main$8), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(_sfc_main$b), {
                            colspan: "7",
                            class: "text-center text-muted-foreground"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` Tidak ada kategori ditemukan `);
                              } else {
                                return [
                                  createTextVNode(" Tidak ada kategori ditemukan ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(_sfc_main$b), {
                              colspan: "7",
                              class: "text-center text-muted-foreground"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Tidak ada kategori ditemukan ")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<!--[-->`);
                  ssrRenderList(__props.categories, (category) => {
                    _push3(ssrRenderComponent(unref(_sfc_main$8), {
                      key: category.id
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(_sfc_main$b), { class: "font-medium" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(category.name)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(category.name), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$b), { class: "text-muted-foreground" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(category.slug)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(category.slug), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$b), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                if (category.parent) {
                                  _push5(ssrRenderComponent(unref(_sfc_main$c), { variant: "secondary" }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(category.parent.name)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(category.parent.name), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  _push5(`<span class="text-muted-foreground"${_scopeId4}>-</span>`);
                                }
                              } else {
                                return [
                                  category.parent ? (openBlock(), createBlock(unref(_sfc_main$c), {
                                    key: 0,
                                    variant: "secondary"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(category.parent.name), 1)
                                    ]),
                                    _: 2
                                  }, 1024)) : (openBlock(), createBlock("span", {
                                    key: 1,
                                    class: "text-muted-foreground"
                                  }, "-"))
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$b), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(category.sort_order)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(category.sort_order), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$b), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(_sfc_main$c), null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(category.products_count)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(category.products_count), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(_sfc_main$c), null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(category.products_count), 1)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$b), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(_sfc_main$c), {
                                  variant: category.is_active ? "default" : "secondary"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(category.is_active ? "Aktif" : "Tidak Aktif")}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(category.is_active ? "Aktif" : "Tidak Aktif"), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(_sfc_main$c), {
                                    variant: category.is_active ? "default" : "secondary"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(category.is_active ? "Aktif" : "Tidak Aktif"), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["variant"])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$b), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(_sfc_main$d), null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(_sfc_main$e), { "as-child": "" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(unref(_sfc_main$4), {
                                              variant: "ghost",
                                              size: "icon"
                                            }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(unref(MoreHorizontal), { class: "h-4 w-4" }, null, _parent8, _scopeId7));
                                                } else {
                                                  return [
                                                    createVNode(unref(MoreHorizontal), { class: "h-4 w-4" })
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(unref(_sfc_main$4), {
                                                variant: "ghost",
                                                size: "icon"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(MoreHorizontal), { class: "h-4 w-4" })
                                                ]),
                                                _: 1
                                              })
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(unref(_sfc_main$f), { align: "end" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(unref(Link), {
                                              href: `/admin/categories/${category.id}/edit`
                                            }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(unref(_sfc_main$g), null, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`Edit`);
                                                      } else {
                                                        return [
                                                          createTextVNode("Edit")
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                } else {
                                                  return [
                                                    createVNode(unref(_sfc_main$g), null, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Edit")
                                                      ]),
                                                      _: 1
                                                    })
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$g), {
                                              onClick: ($event) => emit("delete", category.id),
                                              class: "text-destructive"
                                            }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(` Hapus `);
                                                } else {
                                                  return [
                                                    createTextVNode(" Hapus ")
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(unref(Link), {
                                                href: `/admin/categories/${category.id}/edit`
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(_sfc_main$g), null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Edit")
                                                    ]),
                                                    _: 1
                                                  })
                                                ]),
                                                _: 1
                                              }, 8, ["href"]),
                                              createVNode(unref(_sfc_main$g), {
                                                onClick: ($event) => emit("delete", category.id),
                                                class: "text-destructive"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" Hapus ")
                                                ]),
                                                _: 1
                                              }, 8, ["onClick"])
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(unref(_sfc_main$e), { "as-child": "" }, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$4), {
                                              variant: "ghost",
                                              size: "icon"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(MoreHorizontal), { class: "h-4 w-4" })
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$f), { align: "end" }, {
                                          default: withCtx(() => [
                                            createVNode(unref(Link), {
                                              href: `/admin/categories/${category.id}/edit`
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(_sfc_main$g), null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Edit")
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 1
                                            }, 8, ["href"]),
                                            createVNode(unref(_sfc_main$g), {
                                              onClick: ($event) => emit("delete", category.id),
                                              class: "text-destructive"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(" Hapus ")
                                              ]),
                                              _: 1
                                            }, 8, ["onClick"])
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(_sfc_main$d), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$e), { "as-child": "" }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$4), {
                                            variant: "ghost",
                                            size: "icon"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(MoreHorizontal), { class: "h-4 w-4" })
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$f), { align: "end" }, {
                                        default: withCtx(() => [
                                          createVNode(unref(Link), {
                                            href: `/admin/categories/${category.id}/edit`
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$g), null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Edit")
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          }, 8, ["href"]),
                                          createVNode(unref(_sfc_main$g), {
                                            onClick: ($event) => emit("delete", category.id),
                                            class: "text-destructive"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(" Hapus ")
                                            ]),
                                            _: 1
                                          }, 8, ["onClick"])
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(_sfc_main$b), { class: "font-medium" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(category.name), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(unref(_sfc_main$b), { class: "text-muted-foreground" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(category.slug), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(unref(_sfc_main$b), null, {
                              default: withCtx(() => [
                                category.parent ? (openBlock(), createBlock(unref(_sfc_main$c), {
                                  key: 0,
                                  variant: "secondary"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(category.parent.name), 1)
                                  ]),
                                  _: 2
                                }, 1024)) : (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: "text-muted-foreground"
                                }, "-"))
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(unref(_sfc_main$b), null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(category.sort_order), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(unref(_sfc_main$b), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(category.products_count), 1)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(unref(_sfc_main$b), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$c), {
                                  variant: category.is_active ? "default" : "secondary"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(category.is_active ? "Aktif" : "Tidak Aktif"), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["variant"])
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(unref(_sfc_main$b), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$d), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$e), { "as-child": "" }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$4), {
                                          variant: "ghost",
                                          size: "icon"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(MoreHorizontal), { class: "h-4 w-4" })
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$f), { align: "end" }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Link), {
                                          href: `/admin/categories/${category.id}/edit`
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$g), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Edit")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }, 8, ["href"]),
                                        createVNode(unref(_sfc_main$g), {
                                          onClick: ($event) => emit("delete", category.id),
                                          class: "text-destructive"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" Hapus ")
                                          ]),
                                          _: 1
                                        }, 8, ["onClick"])
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    __props.categories.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$8), { key: 0 }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$b), {
                          colspan: "7",
                          class: "text-center text-muted-foreground"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Tidak ada kategori ditemukan ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (category) => {
                      return openBlock(), createBlock(unref(_sfc_main$8), {
                        key: category.id
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$b), { class: "font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(category.name), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$b), { class: "text-muted-foreground" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(category.slug), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$b), null, {
                            default: withCtx(() => [
                              category.parent ? (openBlock(), createBlock(unref(_sfc_main$c), {
                                key: 0,
                                variant: "secondary"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(category.parent.name), 1)
                                ]),
                                _: 2
                              }, 1024)) : (openBlock(), createBlock("span", {
                                key: 1,
                                class: "text-muted-foreground"
                              }, "-"))
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$b), null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(category.sort_order), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$b), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(category.products_count), 1)
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$b), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$c), {
                                variant: category.is_active ? "default" : "secondary"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(category.is_active ? "Aktif" : "Tidak Aktif"), 1)
                                ]),
                                _: 2
                              }, 1032, ["variant"])
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$b), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$d), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$e), { "as-child": "" }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$4), {
                                        variant: "ghost",
                                        size: "icon"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(MoreHorizontal), { class: "h-4 w-4" })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$f), { align: "end" }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Link), {
                                        href: `/admin/categories/${category.id}/edit`
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$g), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Edit")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }, 8, ["href"]),
                                      createVNode(unref(_sfc_main$g), {
                                        onClick: ($event) => emit("delete", category.id),
                                        class: "text-destructive"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Hapus ")
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"])
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$7), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$8), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$9), null, {
                        default: withCtx(() => [
                          createTextVNode("Nama Kategori")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$9), null, {
                        default: withCtx(() => [
                          createTextVNode("Slug")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$9), null, {
                        default: withCtx(() => [
                          createTextVNode("Parent")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$9), null, {
                        default: withCtx(() => [
                          createTextVNode("Urutan")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$9), null, {
                        default: withCtx(() => [
                          createTextVNode("Jumlah Produk")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$9), null, {
                        default: withCtx(() => [
                          createTextVNode("Status")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$9), { class: "w-[80px]" })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$a), null, {
                default: withCtx(() => [
                  __props.categories.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$8), { key: 0 }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$b), {
                        colspan: "7",
                        class: "text-center text-muted-foreground"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Tidak ada kategori ditemukan ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (category) => {
                    return openBlock(), createBlock(unref(_sfc_main$8), {
                      key: category.id
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$b), { class: "font-medium" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(category.name), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$b), { class: "text-muted-foreground" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(category.slug), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$b), null, {
                          default: withCtx(() => [
                            category.parent ? (openBlock(), createBlock(unref(_sfc_main$c), {
                              key: 0,
                              variant: "secondary"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(category.parent.name), 1)
                              ]),
                              _: 2
                            }, 1024)) : (openBlock(), createBlock("span", {
                              key: 1,
                              class: "text-muted-foreground"
                            }, "-"))
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$b), null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(category.sort_order), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$b), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$c), null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(category.products_count), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$b), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$c), {
                              variant: category.is_active ? "default" : "secondary"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(category.is_active ? "Aktif" : "Tidak Aktif"), 1)
                              ]),
                              _: 2
                            }, 1032, ["variant"])
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$b), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$d), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$e), { "as-child": "" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$4), {
                                      variant: "ghost",
                                      size: "icon"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(MoreHorizontal), { class: "h-4 w-4" })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$f), { align: "end" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Link), {
                                      href: `/admin/categories/${category.id}/edit`
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$g), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Edit")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }, 8, ["href"]),
                                    createVNode(unref(_sfc_main$g), {
                                      onClick: ($event) => emit("delete", category.id),
                                      class: "text-destructive"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Hapus ")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024);
                  }), 128))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/categories/CategoryTable.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    categories: {},
    filters: {}
  },
  setup(__props) {
    const props = __props;
    const searchQuery = ref(props.filters.search || "");
    const handleSearch = () => {
      router.get("/admin/categories", {
        search: searchQuery.value
      }, {
        preserveState: true,
        preserveScroll: true
      });
    };
    const deleteCategory = (id) => {
      if (confirm("Apakah Anda yakin ingin menghapus kategori ini?")) {
        router.delete(`/admin/categories/${id}`, {
          preserveScroll: true
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Kelola Kategori" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$h, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="rounded-xl p-4 space-y-6 py-6"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              title: "Kelola Kategori",
              description: "Kelola kategori produk"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: searchQuery.value,
              "onUpdate:modelValue": ($event) => searchQuery.value = $event,
              onSearch: handleSearch
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, {
              categories: __props.categories.data,
              onDelete: deleteCategory
            }, null, _parent2, _scopeId));
            if (__props.categories.last_page > 1) {
              _push2(ssrRenderComponent(_sfc_main$i, {
                data: __props.categories,
                url: "/admin/categories",
                filters: __props.filters
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "rounded-xl p-4 space-y-6 py-6" }, [
                createVNode(_sfc_main$3, {
                  title: "Kelola Kategori",
                  description: "Kelola kategori produk"
                }),
                createVNode(_sfc_main$2, {
                  modelValue: searchQuery.value,
                  "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                  onSearch: handleSearch
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_sfc_main$1, {
                  categories: __props.categories.data,
                  onDelete: deleteCategory
                }, null, 8, ["categories"]),
                __props.categories.last_page > 1 ? (openBlock(), createBlock(_sfc_main$i, {
                  key: 0,
                  data: __props.categories,
                  url: "/admin/categories",
                  filters: __props.filters
                }, null, 8, ["data", "filters"])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Categories/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
