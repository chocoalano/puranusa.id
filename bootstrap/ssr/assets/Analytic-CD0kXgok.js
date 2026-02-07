import { defineComponent, computed, ref, withCtx, unref, createTextVNode, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { usePage, Head, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-DTAmF_5Z.js";
import { _ as _sfc_main$3 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$2 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$4, a as _sfc_main$5, b as _sfc_main$6, c as _sfc_main$7 } from "./CardTitle-sqUG0LTw.js";
import "class-variance-authority";
import "./DropdownMenuTrigger-B1v6pHML.js";
import "reka-ui";
import "@vueuse/core";
import "lucide-vue-next";
import "./index-3UqiGNe9.js";
import "./AvatarImage-DWFQMckn.js";
import "./index-Bfu0FVt6.js";
import "vue-sonner";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
import "clsx";
import "tailwind-merge";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Analytic",
  __ssrInlineRender: true,
  props: {
    summary: {},
    filters: {}
  },
  setup(__props) {
    const props = __props;
    const page = usePage();
    const baseUrl = computed(() => page.url.split("?")[0]);
    const year = ref(props.filters.year ?? (/* @__PURE__ */ new Date()).getFullYear());
    const applyFilter = () => {
      router.get(
        baseUrl.value,
        {
          year: year.value || void 0
        },
        {
          preserveState: true,
          preserveScroll: true
        }
      );
    };
    const formatCurrency = (value) => {
      if (value === null || value === void 0) return "-";
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(value);
    };
    const totalRows = computed(() => props.summary?.total_rows ?? 0);
    const totalBruto = computed(() => props.summary?.total_bruto ?? 0);
    const totalPph21 = computed(() => props.summary?.total_pph21 ?? 0);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Analytic Pajak" }, null, _parent2, _scopeId));
            _push2(`<div class="rounded-xl p-4 space-y-6 py-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="text-3xl font-bold tracking-tight"${_scopeId}>Analytic Pajak</h1><p class="text-muted-foreground"${_scopeId}> Ringkasan PPh21 per tahun pajak. </p></div></div><div class="rounded-md border p-4"${_scopeId}><div class="flex flex-wrap items-end gap-4"${_scopeId}><div class="grid gap-2"${_scopeId}><label class="text-sm font-medium"${_scopeId}>Tahun Pajak</label>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              modelValue: year.value,
              "onUpdate:modelValue": ($event) => year.value = $event,
              type: "number",
              min: "2000",
              max: "2100",
              class: "w-[140px]"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$3), { onClick: applyFilter }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Terapkan`);
                } else {
                  return [
                    createTextVNode("Terapkan")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="grid gap-4 md:grid-cols-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Total Transaksi`);
                            } else {
                              return [
                                createTextVNode("Total Transaksi")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("Total Transaksi")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-3xl font-semibold"${_scopeId3}>${ssrInterpolate(totalRows.value)}</div><p class="text-sm text-muted-foreground"${_scopeId3}>Tahun ${ssrInterpolate(year.value)}</p>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-3xl font-semibold" }, toDisplayString(totalRows.value), 1),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, "Tahun " + toDisplayString(year.value), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode("Total Transaksi")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-3xl font-semibold" }, toDisplayString(totalRows.value), 1),
                        createVNode("p", { class: "text-sm text-muted-foreground" }, "Tahun " + toDisplayString(year.value), 1)
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
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Total Bruto`);
                            } else {
                              return [
                                createTextVNode("Total Bruto")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("Total Bruto")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-3xl font-semibold"${_scopeId3}>${ssrInterpolate(formatCurrency(totalBruto.value))}</div><p class="text-sm text-muted-foreground"${_scopeId3}> Akumulasi pendapatan bruto </p>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-3xl font-semibold" }, toDisplayString(formatCurrency(totalBruto.value)), 1),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Akumulasi pendapatan bruto ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode("Total Bruto")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-3xl font-semibold" }, toDisplayString(formatCurrency(totalBruto.value)), 1),
                        createVNode("p", { class: "text-sm text-muted-foreground" }, " Akumulasi pendapatan bruto ")
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
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Total PPh21`);
                            } else {
                              return [
                                createTextVNode("Total PPh21")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("Total PPh21")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-3xl font-semibold"${_scopeId3}>${ssrInterpolate(formatCurrency(totalPph21.value))}</div><p class="text-sm text-muted-foreground"${_scopeId3}>Pajak terhitung</p>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-3xl font-semibold" }, toDisplayString(formatCurrency(totalPph21.value)), 1),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, "Pajak terhitung")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode("Total PPh21")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-3xl font-semibold" }, toDisplayString(formatCurrency(totalPph21.value)), 1),
                        createVNode("p", { class: "text-sm text-muted-foreground" }, "Pajak terhitung")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Analytic Pajak" }),
              createVNode("div", { class: "rounded-xl p-4 space-y-6 py-6" }, [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("div", null, [
                    createVNode("h1", { class: "text-3xl font-bold tracking-tight" }, "Analytic Pajak"),
                    createVNode("p", { class: "text-muted-foreground" }, " Ringkasan PPh21 per tahun pajak. ")
                  ])
                ]),
                createVNode("div", { class: "rounded-md border p-4" }, [
                  createVNode("div", { class: "flex flex-wrap items-end gap-4" }, [
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode("label", { class: "text-sm font-medium" }, "Tahun Pajak"),
                      createVNode(unref(_sfc_main$2), {
                        modelValue: year.value,
                        "onUpdate:modelValue": ($event) => year.value = $event,
                        type: "number",
                        min: "2000",
                        max: "2100",
                        class: "w-[140px]"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(unref(_sfc_main$3), { onClick: applyFilter }, {
                      default: withCtx(() => [
                        createTextVNode("Terapkan")
                      ]),
                      _: 1
                    })
                  ])
                ]),
                createVNode("div", { class: "grid gap-4 md:grid-cols-3" }, [
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("Total Transaksi")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-3xl font-semibold" }, toDisplayString(totalRows.value), 1),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, "Tahun " + toDisplayString(year.value), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("Total Bruto")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-3xl font-semibold" }, toDisplayString(formatCurrency(totalBruto.value)), 1),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Akumulasi pendapatan bruto ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("Total PPh21")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-3xl font-semibold" }, toDisplayString(formatCurrency(totalPph21.value)), 1),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, "Pajak terhitung")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Reports/Analytic.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
