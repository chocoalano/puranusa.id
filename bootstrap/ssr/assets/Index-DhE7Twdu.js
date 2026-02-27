import { defineComponent, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext, mergeModels, useModel, createBlock, openBlock, Fragment, renderList, createCommentVNode, ref, h, watch, isRef } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { K as reject, L as approve, _ as _sfc_main$s } from "./AppLayout-DtCYuQDV.js";
import { useForm, router, Head } from "@inertiajs/vue3";
import { _ as _sfc_main$5, a as _sfc_main$6, b as _sfc_main$7, c as _sfc_main$8 } from "./CardTitle-sqUG0LTw.js";
import { Clock, CheckCircle, XCircle, DollarSign, Search, ChevronDown, Check, X, ArrowUpDown } from "lucide-vue-next";
import { f as formatCurrency } from "./currency-BxbHkR_F.js";
import { _ as _sfc_main$t } from "./Pagination-DAUeA01Y.js";
import { _ as _sfc_main$h, v as valueUpdater } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$9 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$a, a as _sfc_main$b, b as _sfc_main$c, c as _sfc_main$d, d as _sfc_main$e } from "./SelectValue-BUnv4mQg.js";
import { _ as _sfc_main$f, a as _sfc_main$g, b as _sfc_main$i, d as _sfc_main$j } from "./DropdownMenuTrigger-B1v6pHML.js";
import { _ as _sfc_main$k, a as _sfc_main$l, b as _sfc_main$m, c as _sfc_main$n, d as _sfc_main$o, e as _sfc_main$p } from "./TableHeader-emcE6QAC.js";
import { _ as _sfc_main$q } from "./ConfirmDialog-CTU0x0KG.js";
import { toast } from "vue-sonner";
import { useVueTable, getFilteredRowModel, getSortedRowModel, getCoreRowModel, FlexRender } from "@tanstack/vue-table";
import { _ as _sfc_main$r } from "./index-BpQimeTM.js";
import { u as usePermissions } from "./usePermissions-DYRibCI0.js";
import "class-variance-authority";
import "reka-ui";
import "@vueuse/core";
import "./index-3UqiGNe9.js";
import "./AvatarImage-DWFQMckn.js";
import "./index-DS4dn0_o.js";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
import "clsx";
import "tailwind-merge";
import "./AlertDialogTrigger-DIWb7xue.js";
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "WithdrawalStatistics",
  __ssrInlineRender: true,
  props: {
    statistics: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid gap-4 md:grid-cols-4" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(_sfc_main$5), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$6), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { class: "text-sm font-medium" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Pending`);
                      } else {
                        return [
                          createTextVNode("Pending")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(Clock), { class: "h-4 w-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$7), { class: "text-sm font-medium" }, {
                      default: withCtx(() => [
                        createTextVNode("Pending")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(Clock), { class: "h-4 w-4 text-muted-foreground" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$8), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(__props.statistics.total_pending)}</div><p class="text-xs text-muted-foreground"${_scopeId2}>Menunggu persetujuan</p>`);
                } else {
                  return [
                    createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics.total_pending), 1),
                    createVNode("p", { class: "text-xs text-muted-foreground" }, "Menunggu persetujuan")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$6), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$7), { class: "text-sm font-medium" }, {
                    default: withCtx(() => [
                      createTextVNode("Pending")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(Clock), { class: "h-4 w-4 text-muted-foreground" })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$8), null, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics.total_pending), 1),
                  createVNode("p", { class: "text-xs text-muted-foreground" }, "Menunggu persetujuan")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$5), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$6), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { class: "text-sm font-medium" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Disetujui`);
                      } else {
                        return [
                          createTextVNode("Disetujui")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(CheckCircle), { class: "h-4 w-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$7), { class: "text-sm font-medium" }, {
                      default: withCtx(() => [
                        createTextVNode("Disetujui")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(CheckCircle), { class: "h-4 w-4 text-muted-foreground" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$8), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(__props.statistics.total_completed)}</div><p class="text-xs text-muted-foreground"${_scopeId2}>Withdrawal selesai</p>`);
                } else {
                  return [
                    createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics.total_completed), 1),
                    createVNode("p", { class: "text-xs text-muted-foreground" }, "Withdrawal selesai")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$6), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$7), { class: "text-sm font-medium" }, {
                    default: withCtx(() => [
                      createTextVNode("Disetujui")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(CheckCircle), { class: "h-4 w-4 text-muted-foreground" })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$8), null, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics.total_completed), 1),
                  createVNode("p", { class: "text-xs text-muted-foreground" }, "Withdrawal selesai")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$5), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$6), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { class: "text-sm font-medium" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Ditolak`);
                      } else {
                        return [
                          createTextVNode("Ditolak")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(XCircle), { class: "h-4 w-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$7), { class: "text-sm font-medium" }, {
                      default: withCtx(() => [
                        createTextVNode("Ditolak")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(XCircle), { class: "h-4 w-4 text-muted-foreground" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$8), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(__props.statistics.total_failed)}</div><p class="text-xs text-muted-foreground"${_scopeId2}>Withdrawal gagal</p>`);
                } else {
                  return [
                    createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics.total_failed), 1),
                    createVNode("p", { class: "text-xs text-muted-foreground" }, "Withdrawal gagal")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$6), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$7), { class: "text-sm font-medium" }, {
                    default: withCtx(() => [
                      createTextVNode("Ditolak")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(XCircle), { class: "h-4 w-4 text-muted-foreground" })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$8), null, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics.total_failed), 1),
                  createVNode("p", { class: "text-xs text-muted-foreground" }, "Withdrawal gagal")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$5), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$6), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { class: "text-sm font-medium" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Total Nominal`);
                      } else {
                        return [
                          createTextVNode("Total Nominal")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(DollarSign), { class: "h-4 w-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$7), { class: "text-sm font-medium" }, {
                      default: withCtx(() => [
                        createTextVNode("Total Nominal")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(DollarSign), { class: "h-4 w-4 text-muted-foreground" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$8), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(unref(formatCurrency)(__props.statistics.total_amount))}</div><p class="text-xs text-muted-foreground"${_scopeId2}>Total withdrawal berhasil</p>`);
                } else {
                  return [
                    createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(unref(formatCurrency)(__props.statistics.total_amount)), 1),
                    createVNode("p", { class: "text-xs text-muted-foreground" }, "Total withdrawal berhasil")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$6), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$7), { class: "text-sm font-medium" }, {
                    default: withCtx(() => [
                      createTextVNode("Total Nominal")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(DollarSign), { class: "h-4 w-4 text-muted-foreground" })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$8), null, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(unref(formatCurrency)(__props.statistics.total_amount)), 1),
                  createVNode("p", { class: "text-xs text-muted-foreground" }, "Total withdrawal berhasil")
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
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/withdrawals/WithdrawalStatistics.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "WithdrawalFiltersBar",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    table: {}
  }, {
    "search": { default: "" },
    "searchModifiers": {},
    "statusFilter": { default: "all" },
    "statusFilterModifiers": {}
  }),
  emits: ["update:search", "update:statusFilter"],
  setup(__props) {
    const search = useModel(__props, "search");
    const statusFilter = useModel(__props, "statusFilter");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" }, _attrs))}><div class="flex flex-1 gap-4"><div class="relative flex-1 max-w-sm">`);
      _push(ssrRenderComponent(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$9), {
        modelValue: search.value,
        "onUpdate:modelValue": ($event) => search.value = $event,
        placeholder: "Cari pelanggan atau referensi...",
        class: "pl-9"
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(unref(_sfc_main$a), {
        modelValue: statusFilter.value,
        "onUpdate:modelValue": ($event) => statusFilter.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$b), { class: "w-[180px]" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$c), { placeholder: "Semua Status" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$c), { placeholder: "Semua Status" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$d), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$e), { value: "all" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Semua Status`);
                      } else {
                        return [
                          createTextVNode("Semua Status")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$e), { value: "pending" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Pending`);
                      } else {
                        return [
                          createTextVNode("Pending")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$e), { value: "completed" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Completed`);
                      } else {
                        return [
                          createTextVNode("Completed")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$e), { value: "failed" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Failed`);
                      } else {
                        return [
                          createTextVNode("Failed")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$e), { value: "all" }, {
                      default: withCtx(() => [
                        createTextVNode("Semua Status")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$e), { value: "pending" }, {
                      default: withCtx(() => [
                        createTextVNode("Pending")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$e), { value: "completed" }, {
                      default: withCtx(() => [
                        createTextVNode("Completed")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$e), { value: "failed" }, {
                      default: withCtx(() => [
                        createTextVNode("Failed")
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
              createVNode(unref(_sfc_main$b), { class: "w-[180px]" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$c), { placeholder: "Semua Status" })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$d), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$e), { value: "all" }, {
                    default: withCtx(() => [
                      createTextVNode("Semua Status")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$e), { value: "pending" }, {
                    default: withCtx(() => [
                      createTextVNode("Pending")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$e), { value: "completed" }, {
                    default: withCtx(() => [
                      createTextVNode("Completed")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$e), { value: "failed" }, {
                    default: withCtx(() => [
                      createTextVNode("Failed")
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
      _push(`</div>`);
      _push(ssrRenderComponent(unref(_sfc_main$f), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$g), { "as-child": "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$h), {
                    variant: "outline",
                    class: "ml-auto"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Kolom `);
                        _push4(ssrRenderComponent(unref(ChevronDown), { class: "ml-2 h-4 w-4" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createTextVNode(" Kolom "),
                          createVNode(unref(ChevronDown), { class: "ml-2 h-4 w-4" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$h), {
                      variant: "outline",
                      class: "ml-auto"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Kolom "),
                        createVNode(unref(ChevronDown), { class: "ml-2 h-4 w-4" })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$i), { align: "end" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(__props.table.getAllColumns().filter((c) => c.getCanHide()), (column) => {
                    _push3(ssrRenderComponent(unref(_sfc_main$j), {
                      key: column.id,
                      class: "capitalize",
                      "model-value": column.getIsVisible(),
                      "onUpdate:modelValue": (v) => column.toggleVisibility(!!v)
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(column.id)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(column.id), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.table.getAllColumns().filter((c) => c.getCanHide()), (column) => {
                      return openBlock(), createBlock(unref(_sfc_main$j), {
                        key: column.id,
                        class: "capitalize",
                        "model-value": column.getIsVisible(),
                        "onUpdate:modelValue": (v) => column.toggleVisibility(!!v)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(column.id), 1)
                        ]),
                        _: 2
                      }, 1032, ["model-value", "onUpdate:modelValue"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$g), { "as-child": "" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$h), {
                    variant: "outline",
                    class: "ml-auto"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Kolom "),
                      createVNode(unref(ChevronDown), { class: "ml-2 h-4 w-4" })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$i), { align: "end" }, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.table.getAllColumns().filter((c) => c.getCanHide()), (column) => {
                    return openBlock(), createBlock(unref(_sfc_main$j), {
                      key: column.id,
                      class: "capitalize",
                      "model-value": column.getIsVisible(),
                      "onUpdate:modelValue": (v) => column.toggleVisibility(!!v)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(column.id), 1)
                      ]),
                      _: 2
                    }, 1032, ["model-value", "onUpdate:modelValue"]);
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/withdrawals/WithdrawalFiltersBar.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "WithdrawalTable",
  __ssrInlineRender: true,
  props: {
    table: {},
    columns: {},
    FlexRender: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "rounded-md border" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(_sfc_main$k), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$l), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(__props.table.getHeaderGroups(), (headerGroup) => {
                    _push3(ssrRenderComponent(unref(_sfc_main$m), {
                      key: headerGroup.id
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<!--[-->`);
                          ssrRenderList(headerGroup.headers, (header) => {
                            _push4(ssrRenderComponent(unref(_sfc_main$n), {
                              key: header.id
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  if (!header.isPlaceholder) {
                                    _push5(ssrRenderComponent(unref(__props["FlexRender"]), {
                                      render: header.column.columnDef.header,
                                      props: header.getContext()
                                    }, null, _parent5, _scopeId4));
                                  } else {
                                    _push5(`<!---->`);
                                  }
                                } else {
                                  return [
                                    !header.isPlaceholder ? (openBlock(), createBlock(unref(__props["FlexRender"]), {
                                      key: 0,
                                      render: header.column.columnDef.header,
                                      props: header.getContext()
                                    }, null, 8, ["render", "props"])) : createCommentVNode("", true)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          });
                          _push4(`<!--]-->`);
                        } else {
                          return [
                            (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                              return openBlock(), createBlock(unref(_sfc_main$n), {
                                key: header.id
                              }, {
                                default: withCtx(() => [
                                  !header.isPlaceholder ? (openBlock(), createBlock(unref(__props["FlexRender"]), {
                                    key: 0,
                                    render: header.column.columnDef.header,
                                    props: header.getContext()
                                  }, null, 8, ["render", "props"])) : createCommentVNode("", true)
                                ]),
                                _: 2
                              }, 1024);
                            }), 128))
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.table.getHeaderGroups(), (headerGroup) => {
                      return openBlock(), createBlock(unref(_sfc_main$m), {
                        key: headerGroup.id
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                            return openBlock(), createBlock(unref(_sfc_main$n), {
                              key: header.id
                            }, {
                              default: withCtx(() => [
                                !header.isPlaceholder ? (openBlock(), createBlock(unref(__props["FlexRender"]), {
                                  key: 0,
                                  render: header.column.columnDef.header,
                                  props: header.getContext()
                                }, null, 8, ["render", "props"])) : createCommentVNode("", true)
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ]),
                        _: 2
                      }, 1024);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$o), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (__props.table.getRowModel().rows?.length) {
                    _push3(`<!--[-->`);
                    ssrRenderList(__props.table.getRowModel().rows, (row) => {
                      _push3(ssrRenderComponent(unref(_sfc_main$m), {
                        key: row.id
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<!--[-->`);
                            ssrRenderList(row.getVisibleCells(), (cell) => {
                              _push4(ssrRenderComponent(unref(_sfc_main$p), {
                                key: cell.id
                              }, {
                                default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(ssrRenderComponent(unref(__props["FlexRender"]), {
                                      render: cell.column.columnDef.cell,
                                      props: cell.getContext()
                                    }, null, _parent5, _scopeId4));
                                  } else {
                                    return [
                                      createVNode(unref(__props["FlexRender"]), {
                                        render: cell.column.columnDef.cell,
                                        props: cell.getContext()
                                      }, null, 8, ["render", "props"])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                            });
                            _push4(`<!--]-->`);
                          } else {
                            return [
                              (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                                return openBlock(), createBlock(unref(_sfc_main$p), {
                                  key: cell.id
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(__props["FlexRender"]), {
                                      render: cell.column.columnDef.cell,
                                      props: cell.getContext()
                                    }, null, 8, ["render", "props"])
                                  ]),
                                  _: 2
                                }, 1024);
                              }), 128))
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else {
                    _push3(ssrRenderComponent(unref(_sfc_main$m), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(_sfc_main$p), {
                            colspan: __props.columns.length,
                            class: "h-24 text-center"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` Tidak ada permintaan withdrawal. `);
                              } else {
                                return [
                                  createTextVNode(" Tidak ada permintaan withdrawal. ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(_sfc_main$p), {
                              colspan: __props.columns.length,
                              class: "h-24 text-center"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Tidak ada permintaan withdrawal. ")
                              ]),
                              _: 1
                            }, 8, ["colspan"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  }
                } else {
                  return [
                    __props.table.getRowModel().rows?.length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(__props.table.getRowModel().rows, (row) => {
                      return openBlock(), createBlock(unref(_sfc_main$m), {
                        key: row.id
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                            return openBlock(), createBlock(unref(_sfc_main$p), {
                              key: cell.id
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(__props["FlexRender"]), {
                                  render: cell.column.columnDef.cell,
                                  props: cell.getContext()
                                }, null, 8, ["render", "props"])
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ]),
                        _: 2
                      }, 1024);
                    }), 128)) : (openBlock(), createBlock(unref(_sfc_main$m), { key: 1 }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$p), {
                          colspan: __props.columns.length,
                          class: "h-24 text-center"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Tidak ada permintaan withdrawal. ")
                          ]),
                          _: 1
                        }, 8, ["colspan"])
                      ]),
                      _: 1
                    }))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$l), null, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.table.getHeaderGroups(), (headerGroup) => {
                    return openBlock(), createBlock(unref(_sfc_main$m), {
                      key: headerGroup.id
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                          return openBlock(), createBlock(unref(_sfc_main$n), {
                            key: header.id
                          }, {
                            default: withCtx(() => [
                              !header.isPlaceholder ? (openBlock(), createBlock(unref(__props["FlexRender"]), {
                                key: 0,
                                render: header.column.columnDef.header,
                                props: header.getContext()
                              }, null, 8, ["render", "props"])) : createCommentVNode("", true)
                            ]),
                            _: 2
                          }, 1024);
                        }), 128))
                      ]),
                      _: 2
                    }, 1024);
                  }), 128))
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$o), null, {
                default: withCtx(() => [
                  __props.table.getRowModel().rows?.length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(__props.table.getRowModel().rows, (row) => {
                    return openBlock(), createBlock(unref(_sfc_main$m), {
                      key: row.id
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                          return openBlock(), createBlock(unref(_sfc_main$p), {
                            key: cell.id
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(__props["FlexRender"]), {
                                render: cell.column.columnDef.cell,
                                props: cell.getContext()
                              }, null, 8, ["render", "props"])
                            ]),
                            _: 2
                          }, 1024);
                        }), 128))
                      ]),
                      _: 2
                    }, 1024);
                  }), 128)) : (openBlock(), createBlock(unref(_sfc_main$m), { key: 1 }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$p), {
                        colspan: __props.columns.length,
                        class: "h-24 text-center"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Tidak ada permintaan withdrawal. ")
                        ]),
                        _: 1
                      }, 8, ["colspan"])
                    ]),
                    _: 1
                  }))
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/withdrawals/WithdrawalTable.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const formatCurrencyIDR = (amount) => new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0
}).format(amount ?? 0);
const WIB_TIMEZONE = "Asia/Jakarta";
const formatDateID = (date) => {
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return "-";
  return `${new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: WIB_TIMEZONE
  }).format(parsedDate)} WIB`;
};
const getStatusVariant = (status) => {
  const variants = {
    pending: "secondary",
    completed: "default",
    failed: "destructive"
  };
  return variants[status] || "secondary";
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "WithdrawalActionDialogs",
  __ssrInlineRender: true,
  props: {
    "approveDialog": {
      required: true
    },
    "approveDialogModifiers": {},
    "rejectDialog": {
      required: true
    },
    "rejectDialogModifiers": {}
  },
  emits: /* @__PURE__ */ mergeModels(["approve", "reject"], ["update:approveDialog", "update:rejectDialog"]),
  setup(__props) {
    const approveDialog = useModel(__props, "approveDialog");
    const rejectDialog = useModel(__props, "rejectDialog");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$q, {
        open: approveDialog.value.open,
        "onUpdate:open": ($event) => approveDialog.value.open = $event,
        title: "Setujui Withdrawal?",
        description: `Apakah Anda yakin ingin menyetujui permintaan withdrawal sebesar ${approveDialog.value.withdrawal ? unref(formatCurrencyIDR)(approveDialog.value.withdrawal.amount) : ""} untuk ${approveDialog.value.withdrawal?.customer.name}? Dana akan ditransfer via Midtrans ke rekening tujuan.`,
        "confirm-text": "Setujui & Transfer",
        "cancel-text": "Batal",
        onConfirm: ($event) => _ctx.$emit("approve")
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$q, {
        open: rejectDialog.value.open,
        "onUpdate:open": ($event) => rejectDialog.value.open = $event,
        title: "Tolak Withdrawal?",
        description: `Apakah Anda yakin ingin menolak permintaan withdrawal sebesar ${rejectDialog.value.withdrawal ? unref(formatCurrencyIDR)(rejectDialog.value.withdrawal.amount) : ""} dari ${rejectDialog.value.withdrawal?.customer.name}?`,
        "confirm-text": "Tolak",
        "cancel-text": "Batal",
        variant: "destructive",
        onConfirm: ($event) => _ctx.$emit("reject")
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/withdrawals/WithdrawalActionDialogs.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
function useWithdrawalActions() {
  const approveDialog = ref({ open: false, withdrawal: null });
  const rejectDialog = ref({ open: false, withdrawal: null });
  const openApproveDialog = (withdrawal) => approveDialog.value = { open: true, withdrawal };
  const openRejectDialog = (withdrawal) => rejectDialog.value = { open: true, withdrawal };
  const closeApprove = () => approveDialog.value = { open: false, withdrawal: null };
  const closeReject = () => rejectDialog.value = { open: false, withdrawal: null };
  function extractErrorMessage(err) {
    if (!err) return "Terjadi kesalahan";
    if (typeof err === "string") return err;
    const firstVal = Object.values(err)[0];
    if (typeof firstVal === "string") return firstVal;
    if (Array.isArray(firstVal) && typeof firstVal[0] === "string") return firstVal[0];
    const firstKey = Object.keys(err)[0];
    if (firstKey) return firstKey;
    return "Terjadi kesalahan";
  }
  const handleApprove = () => {
    const wd = approveDialog.value.withdrawal;
    if (!wd) return;
    const form = useForm({});
    form.post(approve.url(wd.id), {
      preserveScroll: true,
      // kalau server pakai flash (back()->with('error'/'success'))
      onSuccess: (page) => {
        const flash = page.props.flash;
        if (flash?.error) {
          toast.error(flash.error);
          return;
        }
        if (flash?.success) toast.success(flash.success);
        closeApprove();
      },
      // kalau server pakai withErrors()
      onError: (errors) => {
        const msg = errors.approve || errors.general || errors.error || extractErrorMessage(errors);
        toast.error(msg);
        console.error("Error approving withdrawal:", errors);
      }
    });
  };
  const handleReject = () => {
    const wd = rejectDialog.value.withdrawal;
    if (!wd) return;
    const form = useForm({});
    form.post(reject.url(wd.id), {
      preserveScroll: true,
      onSuccess: (page) => {
        const flash = page.props.flash;
        if (flash?.error) {
          toast.error(flash.error);
          return;
        }
        if (flash?.success) toast.success(flash.success);
        closeReject();
      },
      // kalau server pakai withErrors()
      onError: (errors) => {
        const msg = errors.approve || errors.general || errors.error || extractErrorMessage(errors);
        toast.error(msg);
        console.error("Error approving withdrawal:", errors);
      }
    });
  };
  return {
    approveDialog,
    rejectDialog,
    openApproveDialog,
    openRejectDialog,
    handleApprove,
    handleReject
  };
}
const isObject = (v) => typeof v === "object" && v !== null && !Array.isArray(v);
const parseBankInfo = (notes) => {
  if (!notes) return null;
  if (isObject(notes)) {
    return notes;
  }
  if (typeof notes === "string") {
    try {
      const parsed = JSON.parse(notes);
      if (isObject(parsed)) return parsed;
      return null;
    } catch {
      return null;
    }
  }
  return null;
};
function useWithdrawalTable(opts) {
  const sorting = ref([
    { id: "created_at", desc: true }
  ]);
  const columnFilters = ref([]);
  const columnVisibility = ref({});
  const sortableHeader = (label) => ({ column }) => h(
    _sfc_main$h,
    {
      variant: "ghost",
      onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
      class: "-ml-4"
    },
    () => [label, h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
  );
  const { isSuperAdmin, isAdmin } = usePermissions();
  const columns = [
    {
      id: "index",
      header: () => h("div", { class: "w-12" }, "No"),
      cell: ({ row }) => {
        const index = row.index + 1 + (opts.withdrawals.current_page - 1) * opts.withdrawals.per_page;
        return h("div", { class: "font-medium" }, index);
      }
    },
    {
      accessorKey: "customer.name",
      header: sortableHeader("Pelanggan"),
      cell: ({ row }) => {
        const c = row.original.customer;
        return h("div", [
          h("div", { class: "font-medium" }, c.name),
          h("div", { class: "text-xs text-muted-foreground" }, c.email)
        ]);
      }
    },
    {
      accessorKey: "customer.username",
      header: sortableHeader("Username"),
      cell: ({ row }) => {
        const c = row.original.customer;
        return h("div", [
          h("div", { class: "font-medium" }, c.username),
          h("div", { class: "text-xs text-muted-foreground" }, c.email)
        ]);
      }
    },
    {
      accessorKey: "customer.ewallet_saldo",
      header: () => "Saldo Sekarang",
      cell: ({ row }) => h("div", formatCurrencyIDR(row.original.customer.ewallet_saldo))
    },
    {
      accessorKey: "balance_before",
      header: () => "Saldo Sebelum",
      cell: ({ row }) => h("div", formatCurrencyIDR(row.getValue("balance_before")))
    },
    {
      accessorKey: "amount",
      header: () => "Penarikan",
      cell: ({ row }) => h("div", { class: "font-bold text-red-600" }, formatCurrencyIDR(row.getValue("amount")))
    },
    // ✅ hapus duplikasi "Biaya Admin" (di code awal ada 2)
    {
      id: "admin_fee",
      header: () => "Biaya Admin",
      cell: ({ row }) => {
        const info = parseBankInfo(row.original.notes);
        if (!info) return h("div", { class: "text-xs text-muted-foreground" }, "-");
        return h("div", { class: "text-xs font-medium" }, formatCurrencyIDR(info.admin_fee ?? 0));
      }
    },
    {
      id: "net_amount",
      header: () => "Penarikan Net",
      cell: ({ row }) => {
        const info = parseBankInfo(row.original.notes);
        if (!info) return h("div", { class: "text-xs text-muted-foreground" }, "-");
        return h("div", { class: "text-xs font-medium" }, formatCurrencyIDR(info.net_amount ?? 0));
      }
    },
    {
      id: "bank_destination",
      header: () => "Rekening Tujuan",
      cell: ({ row }) => {
        const info = parseBankInfo(row.original.notes);
        if (!info) return h("div", { class: "text-xs text-muted-foreground" }, "-");
        return h("div", [
          h("div", { class: "text-xs font-medium" }, `${info.bank_name} - ${info.bank_account}`),
          h("div", { class: "text-xs text-muted-foreground" }, info.bank_holder)
        ]);
      }
    },
    {
      accessorKey: "transaction_ref",
      header: () => "Referensi",
      cell: ({ row }) => h("div", { class: "font-mono text-xs" }, row.getValue("transaction_ref"))
    },
    {
      accessorKey: "status",
      header: () => "Status",
      cell: ({ row }) => {
        const status = row.getValue("status");
        return h(_sfc_main$r, { variant: getStatusVariant(status) }, () => status);
      }
    },
    {
      accessorKey: "created_at",
      header: () => "Tanggal",
      cell: ({ row }) => h("div", { class: "text-sm" }, formatDateID(row.getValue("created_at")))
    },
    {
      id: "actions",
      header: () => h("div", { class: "text-right" }, "Aksi"),
      cell: ({ row }) => {
        const w = row.original;
        if (w.status !== "pending" && (isSuperAdmin || isAdmin)) return null;
        const isDisabled = w.balance_before < w.amount;
        return h("div", { class: "flex justify-end gap-2" }, [
          h(
            _sfc_main$h,
            { size: "sm", onClick: () => opts.onApprove(w), disabled: isDisabled },
            () => [h(Check, { class: "mr-1 h-4 w-4" }), "Setujui"]
          ),
          h(
            _sfc_main$h,
            { size: "sm", variant: "destructive", onClick: () => opts.onReject(w) },
            () => [h(X, { class: "mr-1 h-4 w-4" }), "Tolak"]
          )
        ]);
      }
    }
  ];
  const table = useVueTable({
    get data() {
      return opts.withdrawals.data;
    },
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: (u) => valueUpdater(u, sorting),
    onColumnFiltersChange: (u) => valueUpdater(u, columnFilters),
    onColumnVisibilityChange: (u) => valueUpdater(u, columnVisibility),
    state: {
      get sorting() {
        return sorting.value;
      },
      get columnFilters() {
        return columnFilters.value;
      },
      get columnVisibility() {
        return columnVisibility.value;
      }
    },
    manualSorting: true
  });
  return { table, columns, sorting, FlexRender };
}
function useDebouncedWatch(sources, cb, delay = 300) {
  let t = null;
  watch(
    sources,
    () => {
      if (t) clearTimeout(t);
      t = setTimeout(cb, delay);
    },
    { deep: true }
  );
}
function useWithdrawalFilters(opts) {
  const endpoint = opts.endpoint ?? "/admin/withdrawals";
  const search = ref(opts.initialFilters.search || "");
  const statusFilter = ref(opts.initialFilters.status || "all");
  const buildQuery = () => ({
    search: search.value || void 0,
    status: statusFilter.value !== "all" ? statusFilter.value : void 0,
    sort_by: opts.sorting.value[0]?.id || "created_at",
    sort_order: opts.sorting.value[0]?.desc ? "desc" : "asc"
  });
  const go = () => {
    router.get(endpoint, buildQuery(), { preserveState: true, preserveScroll: true });
  };
  useDebouncedWatch([search, statusFilter], go, 300);
  return { search, statusFilter, buildQuery, go };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    withdrawals: {},
    statistics: {},
    filters: {}
  },
  setup(__props) {
    const props = __props;
    const {
      approveDialog,
      rejectDialog,
      openApproveDialog,
      openRejectDialog,
      handleApprove,
      handleReject
    } = useWithdrawalActions();
    const { table, columns, sorting, FlexRender: FlexRender2 } = useWithdrawalTable({
      withdrawals: props.withdrawals,
      onApprove: openApproveDialog,
      onReject: openRejectDialog
    });
    const initialSorting = [
      {
        id: props.filters.sort_by || "created_at",
        desc: props.filters.sort_order === "desc"
      }
    ];
    sorting.value = initialSorting;
    const { search, statusFilter, buildQuery } = useWithdrawalFilters({
      initialFilters: props.filters,
      sorting,
      endpoint: "/admin/withdrawals"
    });
    watch(
      sorting,
      (newSorting) => {
        if (!newSorting.length) return;
        router.get("/admin/withdrawals", buildQuery(), { preserveState: true, preserveScroll: true });
      },
      { deep: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Permintaan Withdrawal" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$s, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="rounded-xl p-4 space-y-6 py-6"${_scopeId}><div${_scopeId}><h2 class="text-3xl font-bold tracking-tight"${_scopeId}>Permintaan Withdrawal</h2><p class="text-muted-foreground"${_scopeId}>Kelola permintaan penarikan saldo dari pelanggan</p></div>`);
            _push2(ssrRenderComponent(_sfc_main$4, { statistics: __props.statistics }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              table: unref(table),
              search: unref(search),
              "onUpdate:search": ($event) => isRef(search) ? search.value = $event : null,
              statusFilter: unref(statusFilter),
              "onUpdate:statusFilter": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              table: unref(table),
              columns: unref(columns),
              FlexRender: unref(FlexRender2)
            }, null, _parent2, _scopeId));
            if (__props.withdrawals.last_page > 1) {
              _push2(ssrRenderComponent(_sfc_main$t, {
                data: {
                  current_page: __props.withdrawals.current_page,
                  last_page: __props.withdrawals.last_page,
                  per_page: __props.withdrawals.per_page,
                  from: (__props.withdrawals.current_page - 1) * __props.withdrawals.per_page + 1,
                  to: Math.min(__props.withdrawals.current_page * __props.withdrawals.per_page, __props.withdrawals.total),
                  total: __props.withdrawals.total
                },
                url: "/admin/withdrawals",
                filters: unref(buildQuery)()
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              approveDialog: unref(approveDialog),
              "onUpdate:approveDialog": ($event) => isRef(approveDialog) ? approveDialog.value = $event : null,
              rejectDialog: unref(rejectDialog),
              "onUpdate:rejectDialog": ($event) => isRef(rejectDialog) ? rejectDialog.value = $event : null,
              onApprove: unref(handleApprove),
              onReject: unref(handleReject)
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "rounded-xl p-4 space-y-6 py-6" }, [
                createVNode("div", null, [
                  createVNode("h2", { class: "text-3xl font-bold tracking-tight" }, "Permintaan Withdrawal"),
                  createVNode("p", { class: "text-muted-foreground" }, "Kelola permintaan penarikan saldo dari pelanggan")
                ]),
                createVNode(_sfc_main$4, { statistics: __props.statistics }, null, 8, ["statistics"]),
                createVNode(_sfc_main$3, {
                  table: unref(table),
                  search: unref(search),
                  "onUpdate:search": ($event) => isRef(search) ? search.value = $event : null,
                  statusFilter: unref(statusFilter),
                  "onUpdate:statusFilter": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null
                }, null, 8, ["table", "search", "onUpdate:search", "statusFilter", "onUpdate:statusFilter"]),
                createVNode(_sfc_main$2, {
                  table: unref(table),
                  columns: unref(columns),
                  FlexRender: unref(FlexRender2)
                }, null, 8, ["table", "columns", "FlexRender"]),
                __props.withdrawals.last_page > 1 ? (openBlock(), createBlock(_sfc_main$t, {
                  key: 0,
                  data: {
                    current_page: __props.withdrawals.current_page,
                    last_page: __props.withdrawals.last_page,
                    per_page: __props.withdrawals.per_page,
                    from: (__props.withdrawals.current_page - 1) * __props.withdrawals.per_page + 1,
                    to: Math.min(__props.withdrawals.current_page * __props.withdrawals.per_page, __props.withdrawals.total),
                    total: __props.withdrawals.total
                  },
                  url: "/admin/withdrawals",
                  filters: unref(buildQuery)()
                }, null, 8, ["data", "filters"])) : createCommentVNode("", true)
              ]),
              createVNode(_sfc_main$1, {
                approveDialog: unref(approveDialog),
                "onUpdate:approveDialog": ($event) => isRef(approveDialog) ? approveDialog.value = $event : null,
                rejectDialog: unref(rejectDialog),
                "onUpdate:rejectDialog": ($event) => isRef(rejectDialog) ? rejectDialog.value = $event : null,
                onApprove: unref(handleApprove),
                onReject: unref(handleReject)
              }, null, 8, ["approveDialog", "onUpdate:approveDialog", "rejectDialog", "onUpdate:rejectDialog", "onApprove", "onReject"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Withdrawals/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
