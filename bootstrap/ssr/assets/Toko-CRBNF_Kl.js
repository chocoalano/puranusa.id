import { defineComponent, mergeProps, useSSRContext, unref, withCtx, createVNode, resolveDynamicComponent, createBlock, openBlock, toDisplayString, createTextVNode, createCommentVNode, Fragment, renderList, ref, computed } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderClass, ssrRenderVNode, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { Head, router } from "@inertiajs/vue3";
import { _ as _sfc_main$n } from "./Ecommerce-D_5G5ayz.js";
import { _ as _sfc_main$9, c as _sfc_main$a } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$c } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$b } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$d } from "./index-BpQimeTM.js";
import { _ as _sfc_main$e, a as _sfc_main$f, b as _sfc_main$g, c as _sfc_main$h, d as _sfc_main$i } from "./SelectValue-BUnv4mQg.js";
import { Search, SlidersHorizontal, X, Grid3x3, LayoutGrid, ListFilter, ChevronLeft, ChevronRight, Package, Zap, TrendingUp, Star } from "lucide-vue-next";
import { _ as _sfc_main$k } from "./Label-16aMY2sx.js";
import { _ as _sfc_main$l } from "./Checkbox-CIOQa2-J.js";
import { e as _sfc_main$j } from "./DropdownMenuTrigger-B1v6pHML.js";
import { _ as _sfc_main$m } from "./CardCatalogProduct-Dx6KW7gl.js";
import "./index-D3PKcwoM.js";
import "class-variance-authority";
import "@vueuse/core";
import "reka-ui";
import "axios";
import "vue-sonner";
import "./useAppearance-gspEihnp.js";
import "clsx";
import "tailwind-merge";
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "CatalogHero",
  __ssrInlineRender: true,
  props: {
    title: {},
    description: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b" }, _attrs))}><div class="container mx-auto px-4 py-12"><div class="max-w-4xl"><h1 class="text-3xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">${ssrInterpolate(__props.title)}</h1><p class="text-lg text-muted-foreground mb-6">${ssrInterpolate(__props.description)}</p></div></div></div>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ecommerce/catalog/CatalogHero.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "CatalogStatsCard",
  __ssrInlineRender: true,
  props: {
    icon: {},
    label: {},
    value: {},
    iconColor: { default: "primary" }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$9), mergeProps({ class: "hover:shadow-md transition-shadow" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$a), { class: "p-4 flex items-center gap-3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="${ssrRenderClass([`p-2 rounded-lg bg-${__props.iconColor}/10`])}"${_scopeId2}>`);
                  ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(__props.icon), {
                    class: [`h-5 w-5 text-${__props.iconColor}`]
                  }, null), _parent3, _scopeId2);
                  _push3(`</div><div${_scopeId2}><p class="text-sm text-muted-foreground"${_scopeId2}>${ssrInterpolate(__props.label)}</p><p class="font-bold text-base sm:text-lg md:text-xl break-words"${_scopeId2}>${ssrInterpolate(__props.value)}</p></div>`);
                } else {
                  return [
                    createVNode("div", {
                      class: [`p-2 rounded-lg bg-${__props.iconColor}/10`]
                    }, [
                      (openBlock(), createBlock(resolveDynamicComponent(__props.icon), {
                        class: [`h-5 w-5 text-${__props.iconColor}`]
                      }, null, 8, ["class"]))
                    ], 2),
                    createVNode("div", null, [
                      createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(__props.label), 1),
                      createVNode("p", { class: "font-bold text-base sm:text-lg md:text-xl break-words" }, toDisplayString(__props.value), 1)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$a), { class: "p-4 flex items-center gap-3" }, {
                default: withCtx(() => [
                  createVNode("div", {
                    class: [`p-2 rounded-lg bg-${__props.iconColor}/10`]
                  }, [
                    (openBlock(), createBlock(resolveDynamicComponent(__props.icon), {
                      class: [`h-5 w-5 text-${__props.iconColor}`]
                    }, null, 8, ["class"]))
                  ], 2),
                  createVNode("div", null, [
                    createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(__props.label), 1),
                    createVNode("p", { class: "font-bold text-base sm:text-lg md:text-xl break-words" }, toDisplayString(__props.value), 1)
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ecommerce/catalog/CatalogStatsCard.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "CatalogToolbar",
  __ssrInlineRender: true,
  props: {
    searchQuery: {},
    activeFiltersCount: {},
    sortBy: {},
    perPage: {},
    gridCols: {}
  },
  emits: ["update:searchQuery", "search", "toggle-filters", "clear-filters", "update:sortBy", "update:perPage", "update:gridCols"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mb-6 flex flex-col lg:flex-row items-start lg:items-center gap-4" }, _attrs))}><div class="relative flex-1 w-full lg:max-w-md">`);
      _push(ssrRenderComponent(unref(Search), { class: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$b), {
        "model-value": __props.searchQuery,
        "onUpdate:modelValue": (value) => emit("update:searchQuery", value),
        placeholder: "Cari produk...",
        class: "pl-10 pr-4",
        onKeyup: ($event) => emit("search")
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(unref(_sfc_main$c), {
        variant: "outline",
        size: "default",
        onClick: ($event) => emit("toggle-filters"),
        class: "lg:hidden w-full lg:w-auto"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(SlidersHorizontal), { class: "h-4 w-4 mr-2" }, null, _parent2, _scopeId));
            _push2(` Filter `);
            if (__props.activeFiltersCount > 0) {
              _push2(ssrRenderComponent(unref(_sfc_main$d), {
                variant: "secondary",
                class: "ml-2"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(__props.activeFiltersCount)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(__props.activeFiltersCount), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(unref(SlidersHorizontal), { class: "h-4 w-4 mr-2" }),
              createTextVNode(" Filter "),
              __props.activeFiltersCount > 0 ? (openBlock(), createBlock(unref(_sfc_main$d), {
                key: 0,
                variant: "secondary",
                class: "ml-2"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(__props.activeFiltersCount), 1)
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (__props.activeFiltersCount > 0) {
        _push(ssrRenderComponent(unref(_sfc_main$c), {
          variant: "ghost",
          size: "default",
          onClick: ($event) => emit("clear-filters"),
          class: "text-destructive w-full lg:w-auto"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(X), { class: "h-4 w-4 mr-2" }, null, _parent2, _scopeId));
              _push2(` Hapus Filter (${ssrInterpolate(__props.activeFiltersCount)}) `);
            } else {
              return [
                createVNode(unref(X), { class: "h-4 w-4 mr-2" }),
                createTextVNode(" Hapus Filter (" + toDisplayString(__props.activeFiltersCount) + ") ", 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex items-center gap-2 w-full lg:w-auto lg:ml-auto"><div class="hidden md:flex items-center gap-1 border rounded-lg p-1">`);
      _push(ssrRenderComponent(unref(_sfc_main$c), {
        variant: "ghost",
        size: "sm",
        class: { "bg-secondary": __props.gridCols === 3 },
        onClick: ($event) => emit("update:gridCols", 3)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Grid3x3), { class: "h-4 w-4" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Grid3x3), { class: "h-4 w-4" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$c), {
        variant: "ghost",
        size: "sm",
        class: { "bg-secondary": __props.gridCols === 4 },
        onClick: ($event) => emit("update:gridCols", 4)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(LayoutGrid), { class: "h-4 w-4" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(LayoutGrid), { class: "h-4 w-4" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$e, {
        "model-value": __props.sortBy,
        "onUpdate:modelValue": (value) => emit("update:sortBy", value)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$f, { class: "w-full sm:w-[180px]" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$g, { placeholder: "Urutkan" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$g, { placeholder: "Urutkan" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$h, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$i, { value: "newest" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Terbaru`);
                      } else {
                        return [
                          createTextVNode("Terbaru")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$i, { value: "price_asc" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Harga Terendah`);
                      } else {
                        return [
                          createTextVNode("Harga Terendah")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$i, { value: "price_desc" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Harga Tertinggi`);
                      } else {
                        return [
                          createTextVNode("Harga Tertinggi")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$i, { value: "name" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Nama (A-Z)`);
                      } else {
                        return [
                          createTextVNode("Nama (A-Z)")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$i, { value: "popular" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Terpopuler`);
                      } else {
                        return [
                          createTextVNode("Terpopuler")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$i, { value: "newest" }, {
                      default: withCtx(() => [
                        createTextVNode("Terbaru")
                      ]),
                      _: 1
                    }),
                    createVNode(_sfc_main$i, { value: "price_asc" }, {
                      default: withCtx(() => [
                        createTextVNode("Harga Terendah")
                      ]),
                      _: 1
                    }),
                    createVNode(_sfc_main$i, { value: "price_desc" }, {
                      default: withCtx(() => [
                        createTextVNode("Harga Tertinggi")
                      ]),
                      _: 1
                    }),
                    createVNode(_sfc_main$i, { value: "name" }, {
                      default: withCtx(() => [
                        createTextVNode("Nama (A-Z)")
                      ]),
                      _: 1
                    }),
                    createVNode(_sfc_main$i, { value: "popular" }, {
                      default: withCtx(() => [
                        createTextVNode("Terpopuler")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$f, { class: "w-full sm:w-[180px]" }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$g, { placeholder: "Urutkan" })
                ]),
                _: 1
              }),
              createVNode(_sfc_main$h, null, {
                default: withCtx(() => [
                  createVNode(_sfc_main$i, { value: "newest" }, {
                    default: withCtx(() => [
                      createTextVNode("Terbaru")
                    ]),
                    _: 1
                  }),
                  createVNode(_sfc_main$i, { value: "price_asc" }, {
                    default: withCtx(() => [
                      createTextVNode("Harga Terendah")
                    ]),
                    _: 1
                  }),
                  createVNode(_sfc_main$i, { value: "price_desc" }, {
                    default: withCtx(() => [
                      createTextVNode("Harga Tertinggi")
                    ]),
                    _: 1
                  }),
                  createVNode(_sfc_main$i, { value: "name" }, {
                    default: withCtx(() => [
                      createTextVNode("Nama (A-Z)")
                    ]),
                    _: 1
                  }),
                  createVNode(_sfc_main$i, { value: "popular" }, {
                    default: withCtx(() => [
                      createTextVNode("Terpopuler")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$e, {
        "model-value": __props.perPage,
        "onUpdate:modelValue": (value) => emit("update:perPage", value)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$f, { class: "w-[100px]" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$g, { placeholder: "Tampil" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$g, { placeholder: "Tampil" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$h, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$i, { value: "12" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`12`);
                      } else {
                        return [
                          createTextVNode("12")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$i, { value: "24" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`24`);
                      } else {
                        return [
                          createTextVNode("24")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$i, { value: "36" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`36`);
                      } else {
                        return [
                          createTextVNode("36")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$i, { value: "48" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`48`);
                      } else {
                        return [
                          createTextVNode("48")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$i, { value: "12" }, {
                      default: withCtx(() => [
                        createTextVNode("12")
                      ]),
                      _: 1
                    }),
                    createVNode(_sfc_main$i, { value: "24" }, {
                      default: withCtx(() => [
                        createTextVNode("24")
                      ]),
                      _: 1
                    }),
                    createVNode(_sfc_main$i, { value: "36" }, {
                      default: withCtx(() => [
                        createTextVNode("36")
                      ]),
                      _: 1
                    }),
                    createVNode(_sfc_main$i, { value: "48" }, {
                      default: withCtx(() => [
                        createTextVNode("48")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$f, { class: "w-[100px]" }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$g, { placeholder: "Tampil" })
                ]),
                _: 1
              }),
              createVNode(_sfc_main$h, null, {
                default: withCtx(() => [
                  createVNode(_sfc_main$i, { value: "12" }, {
                    default: withCtx(() => [
                      createTextVNode("12")
                    ]),
                    _: 1
                  }),
                  createVNode(_sfc_main$i, { value: "24" }, {
                    default: withCtx(() => [
                      createTextVNode("24")
                    ]),
                    _: 1
                  }),
                  createVNode(_sfc_main$i, { value: "36" }, {
                    default: withCtx(() => [
                      createTextVNode("36")
                    ]),
                    _: 1
                  }),
                  createVNode(_sfc_main$i, { value: "48" }, {
                    default: withCtx(() => [
                      createTextVNode("48")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ecommerce/catalog/CatalogToolbar.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "CatalogFilterSidebar",
  __ssrInlineRender: true,
  props: {
    categories: {},
    brands: {},
    priceRange: {},
    selectedCategory: {},
    selectedBrands: {},
    priceMin: {},
    priceMax: {},
    inStockOnly: { type: Boolean },
    activeFiltersCount: {},
    showMobile: { type: Boolean }
  },
  emits: ["update:selectedCategory", "update:selectedBrands", "update:priceMin", "update:priceMax", "update:inStockOnly", "apply-filters", "clear-filters"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(amount);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<aside${ssrRenderAttrs(mergeProps({
        class: [
          "lg:w-72 space-y-4",
          __props.showMobile ? "block" : "hidden lg:block"
        ]
      }, _attrs))}>`);
      _push(ssrRenderComponent(unref(_sfc_main$9), { class: "sticky top-4" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$a), { class: "p-6 space-y-6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center justify-between"${_scopeId2}><div class="flex items-center gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(ListFilter), { class: "h-5 w-5 text-primary" }, null, _parent3, _scopeId2));
                  _push3(`<h3 class="font-semibold text-lg"${_scopeId2}>Filter Produk</h3></div>`);
                  if (__props.activeFiltersCount > 0) {
                    _push3(ssrRenderComponent(unref(_sfc_main$c), {
                      variant: "ghost",
                      size: "sm",
                      onClick: ($event) => emit("clear-filters")
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Reset `);
                        } else {
                          return [
                            createTextVNode(" Reset ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$j), null, null, _parent3, _scopeId2));
                  _push3(`<div class="space-y-3"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$k), { class: "text-sm font-semibold" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Kategori`);
                      } else {
                        return [
                          createTextVNode("Kategori")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="space-y-1 max-h-64 overflow-y-auto"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$c), {
                    variant: "ghost",
                    size: "sm",
                    class: ["w-full justify-start font-normal", { "bg-primary/10 text-primary font-medium": !__props.selectedCategory }],
                    onClick: ($event) => {
                      emit("update:selectedCategory", "");
                      emit("apply-filters");
                    }
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Semua Kategori `);
                      } else {
                        return [
                          createTextVNode(" Semua Kategori ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<!--[-->`);
                  ssrRenderList(__props.categories, (category) => {
                    _push3(`<!--[-->`);
                    _push3(ssrRenderComponent(unref(_sfc_main$c), {
                      variant: "ghost",
                      size: "sm",
                      class: ["w-full justify-start font-normal", { "bg-primary/10 text-primary font-medium": __props.selectedCategory === category.slug }],
                      onClick: ($event) => {
                        emit("update:selectedCategory", category.slug);
                        emit("apply-filters");
                      }
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(category.name)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(category.name), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    if (category.children && category.children.length > 0) {
                      _push3(`<!--[-->`);
                      ssrRenderList(category.children, (child) => {
                        _push3(ssrRenderComponent(unref(_sfc_main$c), {
                          key: child.id,
                          variant: "ghost",
                          size: "sm",
                          class: ["w-full justify-start pl-6 text-sm font-normal", { "bg-primary/10 text-primary font-medium": __props.selectedCategory === child.slug }],
                          onClick: ($event) => {
                            emit("update:selectedCategory", child.slug);
                            emit("apply-filters");
                          }
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(` ↳ ${ssrInterpolate(child.name)}`);
                            } else {
                              return [
                                createTextVNode(" ↳ " + toDisplayString(child.name), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      });
                      _push3(`<!--]-->`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<!--]-->`);
                  });
                  _push3(`<!--]--></div></div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$j), null, null, _parent3, _scopeId2));
                  _push3(`<div class="space-y-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$k), { class: "text-sm font-semibold" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Rentang Harga`);
                      } else {
                        return [
                          createTextVNode("Rentang Harga")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="space-y-3"${_scopeId2}><div class="flex items-center justify-between text-sm"${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Min</span><span class="font-medium"${_scopeId2}>${ssrInterpolate(formatCurrency(__props.priceMin))}</span></div><input${ssrRenderAttr("value", __props.priceMin)} type="range"${ssrRenderAttr("min", __props.priceRange.min)}${ssrRenderAttr("max", __props.priceMax)}${ssrRenderAttr("step", 1e4)} class="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"${_scopeId2}><div class="flex items-center justify-between text-sm"${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Max</span><span class="font-medium"${_scopeId2}>${ssrInterpolate(formatCurrency(__props.priceMax))}</span></div><input${ssrRenderAttr("value", __props.priceMax)} type="range"${ssrRenderAttr("min", __props.priceMin)}${ssrRenderAttr("max", __props.priceRange.max)}${ssrRenderAttr("step", 1e4)} class="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"${_scopeId2}><div class="grid grid-cols-2 gap-2 pt-2"${_scopeId2}><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$k), { class: "text-xs" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Minimum`);
                      } else {
                        return [
                          createTextVNode("Minimum")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$b), {
                    "model-value": __props.priceMin,
                    "onUpdate:modelValue": ($event) => emit("update:priceMin", Number($event)),
                    type: "number",
                    min: __props.priceRange.min,
                    max: __props.priceMax,
                    class: "h-9"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$k), { class: "text-xs" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Maximum`);
                      } else {
                        return [
                          createTextVNode("Maximum")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$b), {
                    "model-value": __props.priceMax,
                    "onUpdate:modelValue": ($event) => emit("update:priceMax", Number($event)),
                    type: "number",
                    min: __props.priceMin,
                    max: __props.priceRange.max,
                    class: "h-9"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$c), {
                    size: "sm",
                    class: "w-full",
                    onClick: ($event) => emit("apply-filters")
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Terapkan Filter Harga `);
                      } else {
                        return [
                          createTextVNode(" Terapkan Filter Harga ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$j), null, null, _parent3, _scopeId2));
                  if (__props.brands.length > 0) {
                    _push3(`<div class="space-y-3"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$k), { class: "text-sm font-semibold" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Brand`);
                        } else {
                          return [
                            createTextVNode("Brand")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<div class="space-y-2 max-h-48 overflow-y-auto"${_scopeId2}><!--[-->`);
                    ssrRenderList(__props.brands, (brand) => {
                      _push3(`<div class="flex items-center space-x-2"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$l), {
                        id: `brand-${brand}`,
                        checked: __props.selectedBrands.includes(brand),
                        "onUpdate:checked": (checked) => {
                          if (checked) {
                            emit("update:selectedBrands", [brand]);
                          } else {
                            emit("update:selectedBrands", []);
                          }
                          emit("apply-filters");
                        }
                      }, null, _parent3, _scopeId2));
                      _push3(`<label${ssrRenderAttr("for", `brand-${brand}`)} class="text-sm cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"${_scopeId2}>${ssrInterpolate(brand)}</label></div>`);
                    });
                    _push3(`<!--]--></div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(unref(_sfc_main$j), null, null, _parent3, _scopeId2));
                  _push3(`<div class="space-y-3"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$k), { class: "text-sm font-semibold" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Ketersediaan`);
                      } else {
                        return [
                          createTextVNode("Ketersediaan")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="flex items-center space-x-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$l), {
                    id: "in-stock",
                    checked: __props.inStockOnly,
                    "onUpdate:checked": ($event) => {
                      emit("update:inStockOnly", $event);
                      emit("apply-filters");
                    }
                  }, null, _parent3, _scopeId2));
                  _push3(`<label for="in-stock" class="text-sm cursor-pointer leading-none"${_scopeId2}> Hanya produk yang tersedia </label></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode(unref(ListFilter), { class: "h-5 w-5 text-primary" }),
                        createVNode("h3", { class: "font-semibold text-lg" }, "Filter Produk")
                      ]),
                      __props.activeFiltersCount > 0 ? (openBlock(), createBlock(unref(_sfc_main$c), {
                        key: 0,
                        variant: "ghost",
                        size: "sm",
                        onClick: ($event) => emit("clear-filters")
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Reset ")
                        ]),
                        _: 1
                      }, 8, ["onClick"])) : createCommentVNode("", true)
                    ]),
                    createVNode(unref(_sfc_main$j)),
                    createVNode("div", { class: "space-y-3" }, [
                      createVNode(unref(_sfc_main$k), { class: "text-sm font-semibold" }, {
                        default: withCtx(() => [
                          createTextVNode("Kategori")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "space-y-1 max-h-64 overflow-y-auto" }, [
                        createVNode(unref(_sfc_main$c), {
                          variant: "ghost",
                          size: "sm",
                          class: ["w-full justify-start font-normal", { "bg-primary/10 text-primary font-medium": !__props.selectedCategory }],
                          onClick: ($event) => {
                            emit("update:selectedCategory", "");
                            emit("apply-filters");
                          }
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Semua Kategori ")
                          ]),
                          _: 1
                        }, 8, ["class", "onClick"]),
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (category) => {
                          return openBlock(), createBlock(Fragment, {
                            key: category.id
                          }, [
                            createVNode(unref(_sfc_main$c), {
                              variant: "ghost",
                              size: "sm",
                              class: ["w-full justify-start font-normal", { "bg-primary/10 text-primary font-medium": __props.selectedCategory === category.slug }],
                              onClick: ($event) => {
                                emit("update:selectedCategory", category.slug);
                                emit("apply-filters");
                              }
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(category.name), 1)
                              ]),
                              _: 2
                            }, 1032, ["class", "onClick"]),
                            category.children && category.children.length > 0 ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(category.children, (child) => {
                              return openBlock(), createBlock(unref(_sfc_main$c), {
                                key: child.id,
                                variant: "ghost",
                                size: "sm",
                                class: ["w-full justify-start pl-6 text-sm font-normal", { "bg-primary/10 text-primary font-medium": __props.selectedCategory === child.slug }],
                                onClick: ($event) => {
                                  emit("update:selectedCategory", child.slug);
                                  emit("apply-filters");
                                }
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" ↳ " + toDisplayString(child.name), 1)
                                ]),
                                _: 2
                              }, 1032, ["class", "onClick"]);
                            }), 128)) : createCommentVNode("", true)
                          ], 64);
                        }), 128))
                      ])
                    ]),
                    createVNode(unref(_sfc_main$j)),
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode(unref(_sfc_main$k), { class: "text-sm font-semibold" }, {
                        default: withCtx(() => [
                          createTextVNode("Rentang Harga")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "space-y-3" }, [
                        createVNode("div", { class: "flex items-center justify-between text-sm" }, [
                          createVNode("span", { class: "text-muted-foreground" }, "Min"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(formatCurrency(__props.priceMin)), 1)
                        ]),
                        createVNode("input", {
                          value: __props.priceMin,
                          onInput: ($event) => emit("update:priceMin", Number($event.target.value)),
                          type: "range",
                          min: __props.priceRange.min,
                          max: __props.priceMax,
                          step: 1e4,
                          class: "w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                        }, null, 40, ["value", "onInput", "min", "max"]),
                        createVNode("div", { class: "flex items-center justify-between text-sm" }, [
                          createVNode("span", { class: "text-muted-foreground" }, "Max"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(formatCurrency(__props.priceMax)), 1)
                        ]),
                        createVNode("input", {
                          value: __props.priceMax,
                          onInput: ($event) => emit("update:priceMax", Number($event.target.value)),
                          type: "range",
                          min: __props.priceMin,
                          max: __props.priceRange.max,
                          step: 1e4,
                          class: "w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                        }, null, 40, ["value", "onInput", "min", "max"]),
                        createVNode("div", { class: "grid grid-cols-2 gap-2 pt-2" }, [
                          createVNode("div", null, [
                            createVNode(unref(_sfc_main$k), { class: "text-xs" }, {
                              default: withCtx(() => [
                                createTextVNode("Minimum")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$b), {
                              "model-value": __props.priceMin,
                              "onUpdate:modelValue": ($event) => emit("update:priceMin", Number($event)),
                              type: "number",
                              min: __props.priceRange.min,
                              max: __props.priceMax,
                              class: "h-9"
                            }, null, 8, ["model-value", "onUpdate:modelValue", "min", "max"])
                          ]),
                          createVNode("div", null, [
                            createVNode(unref(_sfc_main$k), { class: "text-xs" }, {
                              default: withCtx(() => [
                                createTextVNode("Maximum")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$b), {
                              "model-value": __props.priceMax,
                              "onUpdate:modelValue": ($event) => emit("update:priceMax", Number($event)),
                              type: "number",
                              min: __props.priceMin,
                              max: __props.priceRange.max,
                              class: "h-9"
                            }, null, 8, ["model-value", "onUpdate:modelValue", "min", "max"])
                          ])
                        ]),
                        createVNode(unref(_sfc_main$c), {
                          size: "sm",
                          class: "w-full",
                          onClick: ($event) => emit("apply-filters")
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Terapkan Filter Harga ")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ])
                    ]),
                    createVNode(unref(_sfc_main$j)),
                    __props.brands.length > 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-3"
                    }, [
                      createVNode(unref(_sfc_main$k), { class: "text-sm font-semibold" }, {
                        default: withCtx(() => [
                          createTextVNode("Brand")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "space-y-2 max-h-48 overflow-y-auto" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.brands, (brand) => {
                          return openBlock(), createBlock("div", {
                            key: brand,
                            class: "flex items-center space-x-2"
                          }, [
                            createVNode(unref(_sfc_main$l), {
                              id: `brand-${brand}`,
                              checked: __props.selectedBrands.includes(brand),
                              "onUpdate:checked": (checked) => {
                                if (checked) {
                                  emit("update:selectedBrands", [brand]);
                                } else {
                                  emit("update:selectedBrands", []);
                                }
                                emit("apply-filters");
                              }
                            }, null, 8, ["id", "checked", "onUpdate:checked"]),
                            createVNode("label", {
                              for: `brand-${brand}`,
                              class: "text-sm cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            }, toDisplayString(brand), 9, ["for"])
                          ]);
                        }), 128))
                      ])
                    ])) : createCommentVNode("", true),
                    createVNode(unref(_sfc_main$j)),
                    createVNode("div", { class: "space-y-3" }, [
                      createVNode(unref(_sfc_main$k), { class: "text-sm font-semibold" }, {
                        default: withCtx(() => [
                          createTextVNode("Ketersediaan")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "flex items-center space-x-2" }, [
                        createVNode(unref(_sfc_main$l), {
                          id: "in-stock",
                          checked: __props.inStockOnly,
                          "onUpdate:checked": ($event) => {
                            emit("update:inStockOnly", $event);
                            emit("apply-filters");
                          }
                        }, null, 8, ["checked", "onUpdate:checked"]),
                        createVNode("label", {
                          for: "in-stock",
                          class: "text-sm cursor-pointer leading-none"
                        }, " Hanya produk yang tersedia ")
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$a), { class: "p-6 space-y-6" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode(unref(ListFilter), { class: "h-5 w-5 text-primary" }),
                      createVNode("h3", { class: "font-semibold text-lg" }, "Filter Produk")
                    ]),
                    __props.activeFiltersCount > 0 ? (openBlock(), createBlock(unref(_sfc_main$c), {
                      key: 0,
                      variant: "ghost",
                      size: "sm",
                      onClick: ($event) => emit("clear-filters")
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Reset ")
                      ]),
                      _: 1
                    }, 8, ["onClick"])) : createCommentVNode("", true)
                  ]),
                  createVNode(unref(_sfc_main$j)),
                  createVNode("div", { class: "space-y-3" }, [
                    createVNode(unref(_sfc_main$k), { class: "text-sm font-semibold" }, {
                      default: withCtx(() => [
                        createTextVNode("Kategori")
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "space-y-1 max-h-64 overflow-y-auto" }, [
                      createVNode(unref(_sfc_main$c), {
                        variant: "ghost",
                        size: "sm",
                        class: ["w-full justify-start font-normal", { "bg-primary/10 text-primary font-medium": !__props.selectedCategory }],
                        onClick: ($event) => {
                          emit("update:selectedCategory", "");
                          emit("apply-filters");
                        }
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Semua Kategori ")
                        ]),
                        _: 1
                      }, 8, ["class", "onClick"]),
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (category) => {
                        return openBlock(), createBlock(Fragment, {
                          key: category.id
                        }, [
                          createVNode(unref(_sfc_main$c), {
                            variant: "ghost",
                            size: "sm",
                            class: ["w-full justify-start font-normal", { "bg-primary/10 text-primary font-medium": __props.selectedCategory === category.slug }],
                            onClick: ($event) => {
                              emit("update:selectedCategory", category.slug);
                              emit("apply-filters");
                            }
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(category.name), 1)
                            ]),
                            _: 2
                          }, 1032, ["class", "onClick"]),
                          category.children && category.children.length > 0 ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(category.children, (child) => {
                            return openBlock(), createBlock(unref(_sfc_main$c), {
                              key: child.id,
                              variant: "ghost",
                              size: "sm",
                              class: ["w-full justify-start pl-6 text-sm font-normal", { "bg-primary/10 text-primary font-medium": __props.selectedCategory === child.slug }],
                              onClick: ($event) => {
                                emit("update:selectedCategory", child.slug);
                                emit("apply-filters");
                              }
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" ↳ " + toDisplayString(child.name), 1)
                              ]),
                              _: 2
                            }, 1032, ["class", "onClick"]);
                          }), 128)) : createCommentVNode("", true)
                        ], 64);
                      }), 128))
                    ])
                  ]),
                  createVNode(unref(_sfc_main$j)),
                  createVNode("div", { class: "space-y-4" }, [
                    createVNode(unref(_sfc_main$k), { class: "text-sm font-semibold" }, {
                      default: withCtx(() => [
                        createTextVNode("Rentang Harga")
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "space-y-3" }, [
                      createVNode("div", { class: "flex items-center justify-between text-sm" }, [
                        createVNode("span", { class: "text-muted-foreground" }, "Min"),
                        createVNode("span", { class: "font-medium" }, toDisplayString(formatCurrency(__props.priceMin)), 1)
                      ]),
                      createVNode("input", {
                        value: __props.priceMin,
                        onInput: ($event) => emit("update:priceMin", Number($event.target.value)),
                        type: "range",
                        min: __props.priceRange.min,
                        max: __props.priceMax,
                        step: 1e4,
                        class: "w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                      }, null, 40, ["value", "onInput", "min", "max"]),
                      createVNode("div", { class: "flex items-center justify-between text-sm" }, [
                        createVNode("span", { class: "text-muted-foreground" }, "Max"),
                        createVNode("span", { class: "font-medium" }, toDisplayString(formatCurrency(__props.priceMax)), 1)
                      ]),
                      createVNode("input", {
                        value: __props.priceMax,
                        onInput: ($event) => emit("update:priceMax", Number($event.target.value)),
                        type: "range",
                        min: __props.priceMin,
                        max: __props.priceRange.max,
                        step: 1e4,
                        class: "w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                      }, null, 40, ["value", "onInput", "min", "max"]),
                      createVNode("div", { class: "grid grid-cols-2 gap-2 pt-2" }, [
                        createVNode("div", null, [
                          createVNode(unref(_sfc_main$k), { class: "text-xs" }, {
                            default: withCtx(() => [
                              createTextVNode("Minimum")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$b), {
                            "model-value": __props.priceMin,
                            "onUpdate:modelValue": ($event) => emit("update:priceMin", Number($event)),
                            type: "number",
                            min: __props.priceRange.min,
                            max: __props.priceMax,
                            class: "h-9"
                          }, null, 8, ["model-value", "onUpdate:modelValue", "min", "max"])
                        ]),
                        createVNode("div", null, [
                          createVNode(unref(_sfc_main$k), { class: "text-xs" }, {
                            default: withCtx(() => [
                              createTextVNode("Maximum")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$b), {
                            "model-value": __props.priceMax,
                            "onUpdate:modelValue": ($event) => emit("update:priceMax", Number($event)),
                            type: "number",
                            min: __props.priceMin,
                            max: __props.priceRange.max,
                            class: "h-9"
                          }, null, 8, ["model-value", "onUpdate:modelValue", "min", "max"])
                        ])
                      ]),
                      createVNode(unref(_sfc_main$c), {
                        size: "sm",
                        class: "w-full",
                        onClick: ($event) => emit("apply-filters")
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Terapkan Filter Harga ")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ])
                  ]),
                  createVNode(unref(_sfc_main$j)),
                  __props.brands.length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "space-y-3"
                  }, [
                    createVNode(unref(_sfc_main$k), { class: "text-sm font-semibold" }, {
                      default: withCtx(() => [
                        createTextVNode("Brand")
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "space-y-2 max-h-48 overflow-y-auto" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.brands, (brand) => {
                        return openBlock(), createBlock("div", {
                          key: brand,
                          class: "flex items-center space-x-2"
                        }, [
                          createVNode(unref(_sfc_main$l), {
                            id: `brand-${brand}`,
                            checked: __props.selectedBrands.includes(brand),
                            "onUpdate:checked": (checked) => {
                              if (checked) {
                                emit("update:selectedBrands", [brand]);
                              } else {
                                emit("update:selectedBrands", []);
                              }
                              emit("apply-filters");
                            }
                          }, null, 8, ["id", "checked", "onUpdate:checked"]),
                          createVNode("label", {
                            for: `brand-${brand}`,
                            class: "text-sm cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          }, toDisplayString(brand), 9, ["for"])
                        ]);
                      }), 128))
                    ])
                  ])) : createCommentVNode("", true),
                  createVNode(unref(_sfc_main$j)),
                  createVNode("div", { class: "space-y-3" }, [
                    createVNode(unref(_sfc_main$k), { class: "text-sm font-semibold" }, {
                      default: withCtx(() => [
                        createTextVNode("Ketersediaan")
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "flex items-center space-x-2" }, [
                      createVNode(unref(_sfc_main$l), {
                        id: "in-stock",
                        checked: __props.inStockOnly,
                        "onUpdate:checked": ($event) => {
                          emit("update:inStockOnly", $event);
                          emit("apply-filters");
                        }
                      }, null, 8, ["checked", "onUpdate:checked"]),
                      createVNode("label", {
                        for: "in-stock",
                        class: "text-sm cursor-pointer leading-none"
                      }, " Hanya produk yang tersedia ")
                    ])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</aside>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ecommerce/catalog/CatalogFilterSidebar.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "CatalogResultsInfo",
  __ssrInlineRender: true,
  props: {
    from: {},
    to: {},
    total: {},
    searchQuery: {},
    selectedCategory: {},
    inStockOnly: { type: Boolean },
    categories: {}
  },
  emits: ["clear-search", "clear-category", "clear-stock"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mb-6" }, _attrs))}><p class="text-sm text-muted-foreground"> Menampilkan <span class="font-semibold text-foreground">${ssrInterpolate(__props.from)}</span> - <span class="font-semibold text-foreground">${ssrInterpolate(__props.to)}</span> dari <span class="font-semibold text-foreground">${ssrInterpolate(__props.total)}</span> produk </p>`);
      if (__props.searchQuery || __props.selectedCategory || __props.inStockOnly) {
        _push(`<div class="flex flex-wrap gap-2 mt-2">`);
        if (__props.searchQuery) {
          _push(ssrRenderComponent(unref(_sfc_main$d), {
            variant: "secondary",
            class: "gap-1"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(Search), { class: "h-3 w-3" }, null, _parent2, _scopeId));
                _push2(` &quot;${ssrInterpolate(__props.searchQuery)}&quot; <button class="ml-1 hover:text-destructive"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(X), { class: "h-3 w-3" }, null, _parent2, _scopeId));
                _push2(`</button>`);
              } else {
                return [
                  createVNode(unref(Search), { class: "h-3 w-3" }),
                  createTextVNode(' "' + toDisplayString(__props.searchQuery) + '" ', 1),
                  createVNode("button", {
                    onClick: ($event) => emit("clear-search"),
                    class: "ml-1 hover:text-destructive"
                  }, [
                    createVNode(unref(X), { class: "h-3 w-3" })
                  ], 8, ["onClick"])
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (__props.selectedCategory) {
          _push(ssrRenderComponent(unref(_sfc_main$d), {
            variant: "secondary",
            class: "gap-1"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Kategori: ${ssrInterpolate(__props.categories.find((c) => c.slug === __props.selectedCategory)?.name)} <button class="ml-1 hover:text-destructive"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(X), { class: "h-3 w-3" }, null, _parent2, _scopeId));
                _push2(`</button>`);
              } else {
                return [
                  createTextVNode(" Kategori: " + toDisplayString(__props.categories.find((c) => c.slug === __props.selectedCategory)?.name) + " ", 1),
                  createVNode("button", {
                    onClick: ($event) => emit("clear-category"),
                    class: "ml-1 hover:text-destructive"
                  }, [
                    createVNode(unref(X), { class: "h-3 w-3" })
                  ], 8, ["onClick"])
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (__props.inStockOnly) {
          _push(ssrRenderComponent(unref(_sfc_main$d), {
            variant: "secondary",
            class: "gap-1"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Tersedia <button class="ml-1 hover:text-destructive"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(X), { class: "h-3 w-3" }, null, _parent2, _scopeId));
                _push2(`</button>`);
              } else {
                return [
                  createTextVNode(" Tersedia "),
                  createVNode("button", {
                    onClick: ($event) => emit("clear-stock"),
                    class: "ml-1 hover:text-destructive"
                  }, [
                    createVNode(unref(X), { class: "h-3 w-3" })
                  ], 8, ["onClick"])
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ecommerce/catalog/CatalogResultsInfo.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "CatalogProductGrid",
  __ssrInlineRender: true,
  props: {
    products: {},
    gridCols: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: [
          "grid gap-6",
          __props.gridCols === 3 ? "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        ]
      }, _attrs))}><!--[-->`);
      ssrRenderList(__props.products, (product) => {
        _push(ssrRenderComponent(_sfc_main$m, {
          key: product.id,
          product
        }, null, _parent));
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ecommerce/catalog/CatalogProductGrid.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "CatalogEmptyState",
  __ssrInlineRender: true,
  emits: ["clear-filters", "reset-search"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$9), mergeProps({ class: "border-dashed" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$a), { class: "flex flex-col items-center justify-center py-16 text-center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="rounded-full bg-muted p-6 mb-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Search), { class: "h-12 w-12 text-muted-foreground" }, null, _parent3, _scopeId2));
                  _push3(`</div><h3 class="text-2xl font-semibold mb-2"${_scopeId2}>Produk tidak ditemukan</h3><p class="text-muted-foreground mb-6 max-w-md"${_scopeId2}> Maaf, kami tidak menemukan produk yang sesuai dengan kriteria pencarian Anda. Coba ubah filter atau kata kunci pencarian. </p><div class="flex gap-3"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$c), {
                    onClick: ($event) => emit("clear-filters"),
                    variant: "default"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(X), { class: "h-4 w-4 mr-2" }, null, _parent4, _scopeId3));
                        _push4(` Hapus Semua Filter `);
                      } else {
                        return [
                          createVNode(unref(X), { class: "h-4 w-4 mr-2" }),
                          createTextVNode(" Hapus Semua Filter ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$c), {
                    onClick: ($event) => emit("reset-search"),
                    variant: "outline"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Reset Pencarian `);
                      } else {
                        return [
                          createTextVNode(" Reset Pencarian ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "rounded-full bg-muted p-6 mb-4" }, [
                      createVNode(unref(Search), { class: "h-12 w-12 text-muted-foreground" })
                    ]),
                    createVNode("h3", { class: "text-2xl font-semibold mb-2" }, "Produk tidak ditemukan"),
                    createVNode("p", { class: "text-muted-foreground mb-6 max-w-md" }, " Maaf, kami tidak menemukan produk yang sesuai dengan kriteria pencarian Anda. Coba ubah filter atau kata kunci pencarian. "),
                    createVNode("div", { class: "flex gap-3" }, [
                      createVNode(unref(_sfc_main$c), {
                        onClick: ($event) => emit("clear-filters"),
                        variant: "default"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(X), { class: "h-4 w-4 mr-2" }),
                          createTextVNode(" Hapus Semua Filter ")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(unref(_sfc_main$c), {
                        onClick: ($event) => emit("reset-search"),
                        variant: "outline"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Reset Pencarian ")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$a), { class: "flex flex-col items-center justify-center py-16 text-center" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "rounded-full bg-muted p-6 mb-4" }, [
                    createVNode(unref(Search), { class: "h-12 w-12 text-muted-foreground" })
                  ]),
                  createVNode("h3", { class: "text-2xl font-semibold mb-2" }, "Produk tidak ditemukan"),
                  createVNode("p", { class: "text-muted-foreground mb-6 max-w-md" }, " Maaf, kami tidak menemukan produk yang sesuai dengan kriteria pencarian Anda. Coba ubah filter atau kata kunci pencarian. "),
                  createVNode("div", { class: "flex gap-3" }, [
                    createVNode(unref(_sfc_main$c), {
                      onClick: ($event) => emit("clear-filters"),
                      variant: "default"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(X), { class: "h-4 w-4 mr-2" }),
                        createTextVNode(" Hapus Semua Filter ")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(unref(_sfc_main$c), {
                      onClick: ($event) => emit("reset-search"),
                      variant: "outline"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Reset Pencarian ")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ecommerce/catalog/CatalogEmptyState.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CatalogPagination",
  __ssrInlineRender: true,
  props: {
    currentPage: {},
    lastPage: {}
  },
  emits: ["go-to-page"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.lastPage > 1) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "mt-8" }, _attrs))}>`);
        _push(ssrRenderComponent(unref(_sfc_main$9), null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$a), { class: "p-4" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex flex-col sm:flex-row items-center justify-between gap-4"${_scopeId2}><p class="text-sm text-muted-foreground"${_scopeId2}> Halaman ${ssrInterpolate(__props.currentPage)} dari ${ssrInterpolate(__props.lastPage)}</p><div class="flex items-center gap-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$c), {
                      variant: "outline",
                      size: "sm",
                      disabled: __props.currentPage === 1,
                      onClick: ($event) => emit("go-to-page", __props.currentPage - 1)
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(ChevronLeft), { class: "h-4 w-4 mr-1" }, null, _parent4, _scopeId3));
                          _push4(` Previous `);
                        } else {
                          return [
                            createVNode(unref(ChevronLeft), { class: "h-4 w-4 mr-1" }),
                            createTextVNode(" Previous ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<div class="flex items-center gap-1"${_scopeId2}><!--[-->`);
                    ssrRenderList(__props.lastPage, (page) => {
                      _push3(`<!--[-->`);
                      if (page === 1 || page === __props.lastPage || Math.abs(page - __props.currentPage) <= 1) {
                        _push3(ssrRenderComponent(unref(_sfc_main$c), {
                          variant: page === __props.currentPage ? "default" : "outline",
                          size: "sm",
                          class: "w-9",
                          onClick: ($event) => emit("go-to-page", page)
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`${ssrInterpolate(page)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(page), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      } else if (page === __props.currentPage - 2 || page === __props.currentPage + 2) {
                        _push3(`<span class="px-2 text-muted-foreground"${_scopeId2}> ... </span>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`<!--]-->`);
                    });
                    _push3(`<!--]--></div>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$c), {
                      variant: "outline",
                      size: "sm",
                      disabled: __props.currentPage === __props.lastPage,
                      onClick: ($event) => emit("go-to-page", __props.currentPage + 1)
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Next `);
                          _push4(ssrRenderComponent(unref(ChevronRight), { class: "h-4 w-4 ml-1" }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createTextVNode(" Next "),
                            createVNode(unref(ChevronRight), { class: "h-4 w-4 ml-1" })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex flex-col sm:flex-row items-center justify-between gap-4" }, [
                        createVNode("p", { class: "text-sm text-muted-foreground" }, " Halaman " + toDisplayString(__props.currentPage) + " dari " + toDisplayString(__props.lastPage), 1),
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode(unref(_sfc_main$c), {
                            variant: "outline",
                            size: "sm",
                            disabled: __props.currentPage === 1,
                            onClick: ($event) => emit("go-to-page", __props.currentPage - 1)
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(ChevronLeft), { class: "h-4 w-4 mr-1" }),
                              createTextVNode(" Previous ")
                            ]),
                            _: 1
                          }, 8, ["disabled", "onClick"]),
                          createVNode("div", { class: "flex items-center gap-1" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.lastPage, (page) => {
                              return openBlock(), createBlock(Fragment, { key: page }, [
                                page === 1 || page === __props.lastPage || Math.abs(page - __props.currentPage) <= 1 ? (openBlock(), createBlock(unref(_sfc_main$c), {
                                  key: 0,
                                  variant: page === __props.currentPage ? "default" : "outline",
                                  size: "sm",
                                  class: "w-9",
                                  onClick: ($event) => emit("go-to-page", page)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(page), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["variant", "onClick"])) : page === __props.currentPage - 2 || page === __props.currentPage + 2 ? (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: "px-2 text-muted-foreground"
                                }, " ... ")) : createCommentVNode("", true)
                              ], 64);
                            }), 128))
                          ]),
                          createVNode(unref(_sfc_main$c), {
                            variant: "outline",
                            size: "sm",
                            disabled: __props.currentPage === __props.lastPage,
                            onClick: ($event) => emit("go-to-page", __props.currentPage + 1)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Next "),
                              createVNode(unref(ChevronRight), { class: "h-4 w-4 ml-1" })
                            ]),
                            _: 1
                          }, 8, ["disabled", "onClick"])
                        ])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$a), { class: "p-4" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "flex flex-col sm:flex-row items-center justify-between gap-4" }, [
                      createVNode("p", { class: "text-sm text-muted-foreground" }, " Halaman " + toDisplayString(__props.currentPage) + " dari " + toDisplayString(__props.lastPage), 1),
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode(unref(_sfc_main$c), {
                          variant: "outline",
                          size: "sm",
                          disabled: __props.currentPage === 1,
                          onClick: ($event) => emit("go-to-page", __props.currentPage - 1)
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(ChevronLeft), { class: "h-4 w-4 mr-1" }),
                            createTextVNode(" Previous ")
                          ]),
                          _: 1
                        }, 8, ["disabled", "onClick"]),
                        createVNode("div", { class: "flex items-center gap-1" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.lastPage, (page) => {
                            return openBlock(), createBlock(Fragment, { key: page }, [
                              page === 1 || page === __props.lastPage || Math.abs(page - __props.currentPage) <= 1 ? (openBlock(), createBlock(unref(_sfc_main$c), {
                                key: 0,
                                variant: page === __props.currentPage ? "default" : "outline",
                                size: "sm",
                                class: "w-9",
                                onClick: ($event) => emit("go-to-page", page)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(page), 1)
                                ]),
                                _: 2
                              }, 1032, ["variant", "onClick"])) : page === __props.currentPage - 2 || page === __props.currentPage + 2 ? (openBlock(), createBlock("span", {
                                key: 1,
                                class: "px-2 text-muted-foreground"
                              }, " ... ")) : createCommentVNode("", true)
                            ], 64);
                          }), 128))
                        ]),
                        createVNode(unref(_sfc_main$c), {
                          variant: "outline",
                          size: "sm",
                          disabled: __props.currentPage === __props.lastPage,
                          onClick: ($event) => emit("go-to-page", __props.currentPage + 1)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Next "),
                            createVNode(unref(ChevronRight), { class: "h-4 w-4 ml-1" })
                          ]),
                          _: 1
                        }, 8, ["disabled", "onClick"])
                      ])
                    ])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ecommerce/catalog/CatalogPagination.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Toko",
  __ssrInlineRender: true,
  props: {
    products: {},
    categories: {},
    brands: {},
    priceRange: {},
    filters: {}
  },
  setup(__props) {
    const props = __props;
    const searchQuery = ref(props.filters.search || "");
    const selectedCategory = ref(props.filters.category || "");
    const selectedBrands = ref(props.filters.brand ? [props.filters.brand] : []);
    const inStockOnly = ref(props.filters.in_stock || false);
    const priceMin = ref(props.filters.min_price || props.priceRange.min);
    const priceMax = ref(props.filters.max_price || props.priceRange.max);
    const sortBy = ref(props.filters.sort_by || "newest");
    const perPage = ref(String(props.filters.per_page || 12));
    const showMobileFilters = ref(false);
    const gridCols = ref(4);
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(amount);
    };
    const applyFilters = () => {
      router.get("/toko", {
        search: searchQuery.value || void 0,
        category: selectedCategory.value || void 0,
        brand: selectedBrands.value.length > 0 ? selectedBrands.value[0] : void 0,
        in_stock: inStockOnly.value || void 0,
        min_price: priceMin.value !== props.priceRange.min ? priceMin.value : void 0,
        max_price: priceMax.value !== props.priceRange.max ? priceMax.value : void 0,
        sort_by: sortBy.value,
        per_page: Number(perPage.value)
      }, {
        preserveState: true,
        preserveScroll: true
      });
    };
    const clearFilters = () => {
      searchQuery.value = "";
      selectedCategory.value = "";
      selectedBrands.value = [];
      inStockOnly.value = false;
      priceMin.value = props.priceRange.min;
      priceMax.value = props.priceRange.max;
      sortBy.value = "newest";
      perPage.value = "12";
      router.get("/toko", {}, {
        preserveState: true,
        preserveScroll: true
      });
    };
    const activeFiltersCount = computed(() => {
      let count = 0;
      if (searchQuery.value) count++;
      if (selectedCategory.value) count++;
      if (selectedBrands.value.length > 0) count++;
      if (inStockOnly.value) count++;
      if (priceMin.value !== props.priceRange.min || priceMax.value !== props.priceRange.max) count++;
      return count;
    });
    const goToPage = (page) => {
      router.get("/toko", {
        ...props.filters,
        page
      }, {
        preserveState: true,
        preserveScroll: false
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$n, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Toko - Belanja Produk" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$8, {
              title: "Katalog Produk",
              description: `Temukan ${__props.products.total} produk berkualitas dengan harga terbaik`
            }, null, _parent2, _scopeId));
            _push2(`<div class="container mx-auto px-4 py-8"${_scopeId}><div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$7, {
              icon: unref(Package),
              label: "Total Produk",
              value: __props.products.total,
              "icon-color": "primary"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$7, {
              icon: unref(Zap),
              label: "Kategori",
              value: __props.categories.length,
              "icon-color": "green-600 dark:text-green-400"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$7, {
              icon: unref(TrendingUp),
              label: "Brand",
              value: __props.brands.length,
              "icon-color": "orange-600 dark:text-orange-400"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$7, {
              icon: unref(Star),
              label: "Harga Mulai",
              value: formatCurrency(__props.priceRange.min),
              "icon-color": "blue-600 dark:text-blue-400"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              "search-query": searchQuery.value,
              "active-filters-count": activeFiltersCount.value,
              "sort-by": sortBy.value,
              "per-page": perPage.value,
              "grid-cols": gridCols.value,
              "onUpdate:searchQuery": ($event) => searchQuery.value = $event,
              onSearch: applyFilters,
              onToggleFilters: ($event) => showMobileFilters.value = !showMobileFilters.value,
              onClearFilters: clearFilters,
              "onUpdate:sortBy": ($event) => {
                sortBy.value = $event;
                applyFilters();
              },
              "onUpdate:perPage": ($event) => {
                perPage.value = $event;
                applyFilters();
              },
              "onUpdate:gridCols": ($event) => gridCols.value = $event
            }, null, _parent2, _scopeId));
            _push2(`<div class="flex flex-col lg:flex-row gap-6"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$5, {
              categories: __props.categories,
              brands: __props.brands,
              "price-range": __props.priceRange,
              "selected-category": selectedCategory.value,
              "onUpdate:selectedCategory": ($event) => selectedCategory.value = $event,
              "selected-brands": selectedBrands.value,
              "onUpdate:selectedBrands": ($event) => selectedBrands.value = $event,
              "price-min": priceMin.value,
              "onUpdate:priceMin": ($event) => priceMin.value = $event,
              "price-max": priceMax.value,
              "onUpdate:priceMax": ($event) => priceMax.value = $event,
              "in-stock-only": inStockOnly.value,
              "onUpdate:inStockOnly": ($event) => inStockOnly.value = $event,
              "active-filters-count": activeFiltersCount.value,
              "show-mobile": showMobileFilters.value,
              onApplyFilters: applyFilters,
              onClearFilters: clearFilters
            }, null, _parent2, _scopeId));
            _push2(`<main class="flex-1"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              from: __props.products.from,
              to: __props.products.to,
              total: __props.products.total,
              "search-query": searchQuery.value,
              "selected-category": selectedCategory.value,
              "in-stock-only": inStockOnly.value,
              categories: __props.categories,
              onClearSearch: ($event) => {
                searchQuery.value = "";
                applyFilters();
              },
              onClearCategory: ($event) => {
                selectedCategory.value = "";
                applyFilters();
              },
              onClearStock: ($event) => {
                inStockOnly.value = false;
                applyFilters();
              }
            }, null, _parent2, _scopeId));
            if (__props.products.data.length > 0) {
              _push2(ssrRenderComponent(_sfc_main$3, {
                products: __props.products.data,
                "grid-cols": gridCols.value,
                class: "mb-8"
              }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(_sfc_main$2, {
                onClearFilters: clearFilters,
                onResetSearch: ($event) => {
                  searchQuery.value = "";
                  applyFilters();
                }
              }, null, _parent2, _scopeId));
            }
            _push2(ssrRenderComponent(_sfc_main$1, {
              "current-page": __props.products.current_page,
              "last-page": __props.products.last_page,
              onGoToPage: goToPage
            }, null, _parent2, _scopeId));
            _push2(`</main></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Toko - Belanja Produk" }),
              createVNode(_sfc_main$8, {
                title: "Katalog Produk",
                description: `Temukan ${__props.products.total} produk berkualitas dengan harga terbaik`
              }, null, 8, ["description"]),
              createVNode("div", { class: "container mx-auto px-4 py-8" }, [
                createVNode("div", { class: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-8" }, [
                  createVNode(_sfc_main$7, {
                    icon: unref(Package),
                    label: "Total Produk",
                    value: __props.products.total,
                    "icon-color": "primary"
                  }, null, 8, ["icon", "value"]),
                  createVNode(_sfc_main$7, {
                    icon: unref(Zap),
                    label: "Kategori",
                    value: __props.categories.length,
                    "icon-color": "green-600 dark:text-green-400"
                  }, null, 8, ["icon", "value"]),
                  createVNode(_sfc_main$7, {
                    icon: unref(TrendingUp),
                    label: "Brand",
                    value: __props.brands.length,
                    "icon-color": "orange-600 dark:text-orange-400"
                  }, null, 8, ["icon", "value"]),
                  createVNode(_sfc_main$7, {
                    icon: unref(Star),
                    label: "Harga Mulai",
                    value: formatCurrency(__props.priceRange.min),
                    "icon-color": "blue-600 dark:text-blue-400"
                  }, null, 8, ["icon", "value"])
                ]),
                createVNode(_sfc_main$6, {
                  "search-query": searchQuery.value,
                  "active-filters-count": activeFiltersCount.value,
                  "sort-by": sortBy.value,
                  "per-page": perPage.value,
                  "grid-cols": gridCols.value,
                  "onUpdate:searchQuery": ($event) => searchQuery.value = $event,
                  onSearch: applyFilters,
                  onToggleFilters: ($event) => showMobileFilters.value = !showMobileFilters.value,
                  onClearFilters: clearFilters,
                  "onUpdate:sortBy": ($event) => {
                    sortBy.value = $event;
                    applyFilters();
                  },
                  "onUpdate:perPage": ($event) => {
                    perPage.value = $event;
                    applyFilters();
                  },
                  "onUpdate:gridCols": ($event) => gridCols.value = $event
                }, null, 8, ["search-query", "active-filters-count", "sort-by", "per-page", "grid-cols", "onUpdate:searchQuery", "onToggleFilters", "onUpdate:sortBy", "onUpdate:perPage", "onUpdate:gridCols"]),
                createVNode("div", { class: "flex flex-col lg:flex-row gap-6" }, [
                  createVNode(_sfc_main$5, {
                    categories: __props.categories,
                    brands: __props.brands,
                    "price-range": __props.priceRange,
                    "selected-category": selectedCategory.value,
                    "onUpdate:selectedCategory": ($event) => selectedCategory.value = $event,
                    "selected-brands": selectedBrands.value,
                    "onUpdate:selectedBrands": ($event) => selectedBrands.value = $event,
                    "price-min": priceMin.value,
                    "onUpdate:priceMin": ($event) => priceMin.value = $event,
                    "price-max": priceMax.value,
                    "onUpdate:priceMax": ($event) => priceMax.value = $event,
                    "in-stock-only": inStockOnly.value,
                    "onUpdate:inStockOnly": ($event) => inStockOnly.value = $event,
                    "active-filters-count": activeFiltersCount.value,
                    "show-mobile": showMobileFilters.value,
                    onApplyFilters: applyFilters,
                    onClearFilters: clearFilters
                  }, null, 8, ["categories", "brands", "price-range", "selected-category", "onUpdate:selectedCategory", "selected-brands", "onUpdate:selectedBrands", "price-min", "onUpdate:priceMin", "price-max", "onUpdate:priceMax", "in-stock-only", "onUpdate:inStockOnly", "active-filters-count", "show-mobile"]),
                  createVNode("main", { class: "flex-1" }, [
                    createVNode(_sfc_main$4, {
                      from: __props.products.from,
                      to: __props.products.to,
                      total: __props.products.total,
                      "search-query": searchQuery.value,
                      "selected-category": selectedCategory.value,
                      "in-stock-only": inStockOnly.value,
                      categories: __props.categories,
                      onClearSearch: ($event) => {
                        searchQuery.value = "";
                        applyFilters();
                      },
                      onClearCategory: ($event) => {
                        selectedCategory.value = "";
                        applyFilters();
                      },
                      onClearStock: ($event) => {
                        inStockOnly.value = false;
                        applyFilters();
                      }
                    }, null, 8, ["from", "to", "total", "search-query", "selected-category", "in-stock-only", "categories", "onClearSearch", "onClearCategory", "onClearStock"]),
                    __props.products.data.length > 0 ? (openBlock(), createBlock(_sfc_main$3, {
                      key: 0,
                      products: __props.products.data,
                      "grid-cols": gridCols.value,
                      class: "mb-8"
                    }, null, 8, ["products", "grid-cols"])) : (openBlock(), createBlock(_sfc_main$2, {
                      key: 1,
                      onClearFilters: clearFilters,
                      onResetSearch: ($event) => {
                        searchQuery.value = "";
                        applyFilters();
                      }
                    }, null, 8, ["onResetSearch"])),
                    createVNode(_sfc_main$1, {
                      "current-page": __props.products.current_page,
                      "last-page": __props.products.last_page,
                      onGoToPage: goToPage
                    }, null, 8, ["current-page", "last-page"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/ecommerce/Toko.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
