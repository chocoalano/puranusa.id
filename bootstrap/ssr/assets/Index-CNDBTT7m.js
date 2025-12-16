import { defineComponent, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext, mergeModels, useModel, withModifiers, ref, h, watch, createBlock, openBlock, Fragment, renderList, createCommentVNode } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { x as index, _ as _sfc_main$l, y as update } from "./AppLayout-Cw9UyDBf.js";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5, c as _sfc_main$6 } from "./CardTitle-sqUG0LTw.js";
import { Package, Truck, CheckCircle, Search, ChevronDown, ArrowUpDown, Edit } from "lucide-vue-next";
import { _ as _sfc_main$k, v as valueUpdater } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$7, a as _sfc_main$8, b as _sfc_main$9, c as _sfc_main$a, d as _sfc_main$b, e as _sfc_main$j } from "./DialogTrigger-DV-5YM1v.js";
import { _ as _sfc_main$d } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$c } from "./Label-16aMY2sx.js";
import { _ as _sfc_main$e, a as _sfc_main$f, b as _sfc_main$g, c as _sfc_main$h, d as _sfc_main$i } from "./SelectValue-BUnv4mQg.js";
import { _ as _sfc_main$w } from "./Pagination-DAUeA01Y.js";
import { _ as _sfc_main$x } from "./index-BpQimeTM.js";
import { _ as _sfc_main$m, a as _sfc_main$n, b as _sfc_main$o, d as _sfc_main$p } from "./DropdownMenuTrigger-B1v6pHML.js";
import { _ as _sfc_main$q, a as _sfc_main$r, b as _sfc_main$s, c as _sfc_main$t, d as _sfc_main$u, e as _sfc_main$v } from "./TableHeader-emcE6QAC.js";
import { router, Head } from "@inertiajs/vue3";
import { useVueTable, getFilteredRowModel, getSortedRowModel, getCoreRowModel, FlexRender } from "@tanstack/vue-table";
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
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ShipmentStatistics",
  __ssrInlineRender: true,
  props: {
    statistics: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid gap-4 md:grid-cols-3" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(_sfc_main$3), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
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
                  _push3(ssrRenderComponent(unref(Package), { class: "h-4 w-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                      default: withCtx(() => [
                        createTextVNode("Pending")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(Package), { class: "h-4 w-4 text-muted-foreground" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$6), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(__props.statistics.total_pending)}</div><p class="text-xs text-muted-foreground"${_scopeId2}>Menunggu pengiriman</p>`);
                } else {
                  return [
                    createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics.total_pending), 1),
                    createVNode("p", { class: "text-xs text-muted-foreground" }, "Menunggu pengiriman")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$4), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                    default: withCtx(() => [
                      createTextVNode("Pending")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(Package), { class: "h-4 w-4 text-muted-foreground" })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$6), null, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics.total_pending), 1),
                  createVNode("p", { class: "text-xs text-muted-foreground" }, "Menunggu pengiriman")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$3), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Dikirim`);
                      } else {
                        return [
                          createTextVNode("Dikirim")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(Truck), { class: "h-4 w-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                      default: withCtx(() => [
                        createTextVNode("Dikirim")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(Truck), { class: "h-4 w-4 text-muted-foreground" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$6), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(__props.statistics.total_shipped)}</div><p class="text-xs text-muted-foreground"${_scopeId2}>Dalam pengiriman</p>`);
                } else {
                  return [
                    createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics.total_shipped), 1),
                    createVNode("p", { class: "text-xs text-muted-foreground" }, "Dalam pengiriman")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$4), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                    default: withCtx(() => [
                      createTextVNode("Dikirim")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(Truck), { class: "h-4 w-4 text-muted-foreground" })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$6), null, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics.total_shipped), 1),
                  createVNode("p", { class: "text-xs text-muted-foreground" }, "Dalam pengiriman")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$3), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Terkirim`);
                      } else {
                        return [
                          createTextVNode("Terkirim")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(CheckCircle), { class: "h-4 w-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                      default: withCtx(() => [
                        createTextVNode("Terkirim")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(CheckCircle), { class: "h-4 w-4 text-muted-foreground" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$6), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(__props.statistics.total_delivered)}</div><p class="text-xs text-muted-foreground"${_scopeId2}>Sudah sampai</p>`);
                } else {
                  return [
                    createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics.total_delivered), 1),
                    createVNode("p", { class: "text-xs text-muted-foreground" }, "Sudah sampai")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$4), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                    default: withCtx(() => [
                      createTextVNode("Terkirim")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(CheckCircle), { class: "h-4 w-4 text-muted-foreground" })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$6), null, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics.total_delivered), 1),
                  createVNode("p", { class: "text-xs text-muted-foreground" }, "Sudah sampai")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/shipments/ShipmentStatistics.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "UpdateShipmentDialog",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    open: { type: Boolean },
    shipment: {},
    processing: { type: Boolean }
  }, {
    "trackingNumber": { required: true },
    "trackingNumberModifiers": {},
    "status": { required: true },
    "statusModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["update:open", "submit"], ["update:trackingNumber", "update:status"]),
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const trackingNumber = useModel(__props, "trackingNumber");
    const status = useModel(__props, "status");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$7), mergeProps({
        open: __props.open,
        "onUpdate:open": ($event) => emit("update:open", $event)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$8), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$9), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$a), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Update Pengiriman`);
                            } else {
                              return [
                                createTextVNode("Update Pengiriman")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$b), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Update nomor resi dan status pengiriman `);
                            } else {
                              return [
                                createTextVNode(" Update nomor resi dan status pengiriman ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$a), null, {
                            default: withCtx(() => [
                              createTextVNode("Update Pengiriman")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$b), null, {
                            default: withCtx(() => [
                              createTextVNode(" Update nomor resi dan status pengiriman ")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<form class="space-y-4 py-4"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$c), { for: "tracking_number" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Nomor Resi`);
                      } else {
                        return [
                          createTextVNode("Nomor Resi")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$d), {
                    id: "tracking_number",
                    modelValue: trackingNumber.value,
                    "onUpdate:modelValue": ($event) => trackingNumber.value = $event,
                    placeholder: "Masukkan nomor resi"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$c), { for: "status" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Status`);
                      } else {
                        return [
                          createTextVNode("Status")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$e), {
                    modelValue: status.value,
                    "onUpdate:modelValue": ($event) => status.value = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$f), { id: "status" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$g), { placeholder: "Pilih status" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$g), { placeholder: "Pilih status" })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$h), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$i), { value: "pending" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Pending`);
                                  } else {
                                    return [
                                      createTextVNode("Pending")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$i), { value: "shipped" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Shipped`);
                                  } else {
                                    return [
                                      createTextVNode("Shipped")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$i), { value: "in_transit" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`In Transit`);
                                  } else {
                                    return [
                                      createTextVNode("In Transit")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$i), { value: "delivered" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Delivered`);
                                  } else {
                                    return [
                                      createTextVNode("Delivered")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$i), { value: "failed" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Failed`);
                                  } else {
                                    return [
                                      createTextVNode("Failed")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$i), { value: "pending" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Pending")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$i), { value: "shipped" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Shipped")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$i), { value: "in_transit" }, {
                                  default: withCtx(() => [
                                    createTextVNode("In Transit")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$i), { value: "delivered" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Delivered")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$i), { value: "failed" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Failed")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$f), { id: "status" }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$g), { placeholder: "Pilih status" })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$h), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$i), { value: "pending" }, {
                                default: withCtx(() => [
                                  createTextVNode("Pending")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$i), { value: "shipped" }, {
                                default: withCtx(() => [
                                  createTextVNode("Shipped")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$i), { value: "in_transit" }, {
                                default: withCtx(() => [
                                  createTextVNode("In Transit")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$i), { value: "delivered" }, {
                                default: withCtx(() => [
                                  createTextVNode("Delivered")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$i), { value: "failed" }, {
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
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$j), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$k), {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => emit("update:open", false)
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Batal `);
                            } else {
                              return [
                                createTextVNode(" Batal ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$k), {
                          type: "submit",
                          disabled: __props.processing
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(__props.processing ? "Menyimpan..." : "Update")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(__props.processing ? "Menyimpan..." : "Update"), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$k), {
                            type: "button",
                            variant: "outline",
                            onClick: ($event) => emit("update:open", false)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Batal ")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(unref(_sfc_main$k), {
                            type: "submit",
                            disabled: __props.processing
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(__props.processing ? "Menyimpan..." : "Update"), 1)
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</form>`);
                } else {
                  return [
                    createVNode(unref(_sfc_main$9), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$a), null, {
                          default: withCtx(() => [
                            createTextVNode("Update Pengiriman")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$b), null, {
                          default: withCtx(() => [
                            createTextVNode(" Update nomor resi dan status pengiriman ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("form", {
                      onSubmit: withModifiers(($event) => emit("submit"), ["prevent"]),
                      class: "space-y-4 py-4"
                    }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$c), { for: "tracking_number" }, {
                          default: withCtx(() => [
                            createTextVNode("Nomor Resi")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$d), {
                          id: "tracking_number",
                          modelValue: trackingNumber.value,
                          "onUpdate:modelValue": ($event) => trackingNumber.value = $event,
                          placeholder: "Masukkan nomor resi"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$c), { for: "status" }, {
                          default: withCtx(() => [
                            createTextVNode("Status")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$e), {
                          modelValue: status.value,
                          "onUpdate:modelValue": ($event) => status.value = $event
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$f), { id: "status" }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$g), { placeholder: "Pilih status" })
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$h), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$i), { value: "pending" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Pending")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$i), { value: "shipped" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Shipped")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$i), { value: "in_transit" }, {
                                  default: withCtx(() => [
                                    createTextVNode("In Transit")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$i), { value: "delivered" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Delivered")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$i), { value: "failed" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Failed")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode(unref(_sfc_main$j), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$k), {
                            type: "button",
                            variant: "outline",
                            onClick: ($event) => emit("update:open", false)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Batal ")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(unref(_sfc_main$k), {
                            type: "submit",
                            disabled: __props.processing
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(__props.processing ? "Menyimpan..." : "Update"), 1)
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ]),
                        _: 1
                      })
                    ], 40, ["onSubmit"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$8), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$9), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$a), null, {
                        default: withCtx(() => [
                          createTextVNode("Update Pengiriman")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$b), null, {
                        default: withCtx(() => [
                          createTextVNode(" Update nomor resi dan status pengiriman ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("form", {
                    onSubmit: withModifiers(($event) => emit("submit"), ["prevent"]),
                    class: "space-y-4 py-4"
                  }, [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$c), { for: "tracking_number" }, {
                        default: withCtx(() => [
                          createTextVNode("Nomor Resi")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$d), {
                        id: "tracking_number",
                        modelValue: trackingNumber.value,
                        "onUpdate:modelValue": ($event) => trackingNumber.value = $event,
                        placeholder: "Masukkan nomor resi"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$c), { for: "status" }, {
                        default: withCtx(() => [
                          createTextVNode("Status")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$e), {
                        modelValue: status.value,
                        "onUpdate:modelValue": ($event) => status.value = $event
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$f), { id: "status" }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$g), { placeholder: "Pilih status" })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$h), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$i), { value: "pending" }, {
                                default: withCtx(() => [
                                  createTextVNode("Pending")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$i), { value: "shipped" }, {
                                default: withCtx(() => [
                                  createTextVNode("Shipped")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$i), { value: "in_transit" }, {
                                default: withCtx(() => [
                                  createTextVNode("In Transit")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$i), { value: "delivered" }, {
                                default: withCtx(() => [
                                  createTextVNode("Delivered")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$i), { value: "failed" }, {
                                default: withCtx(() => [
                                  createTextVNode("Failed")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(unref(_sfc_main$j), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$k), {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => emit("update:open", false)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Batal ")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(unref(_sfc_main$k), {
                          type: "submit",
                          disabled: __props.processing
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(__props.processing ? "Menyimpan..." : "Update"), 1)
                          ]),
                          _: 1
                        }, 8, ["disabled"])
                      ]),
                      _: 1
                    })
                  ], 40, ["onSubmit"])
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/shipments/UpdateShipmentDialog.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    shipments: {},
    statistics: {},
    filters: {}
  },
  setup(__props) {
    const props = __props;
    const breadcrumbItems = [
      {
        title: "Pengiriman",
        href: index.url()
      }
    ];
    const search = ref(props.filters.search || "");
    const statusFilter = ref(props.filters.status || "all");
    const sorting = ref([
      {
        id: props.filters.sort_by,
        desc: props.filters.sort_order === "desc"
      }
    ]);
    const columnFilters = ref([]);
    const columnVisibility = ref({});
    const updateDialog = ref({
      open: false,
      shipment: null
    });
    const trackingNumber = ref("");
    const statusUpdate = ref("");
    const processing = ref(false);
    const formatDate = (date) => {
      if (!date) return "-";
      return new Date(date).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const getStatusVariant = (status) => {
      const variants = {
        pending: "secondary",
        shipped: "default",
        delivered: "outline",
        cancelled: "destructive"
      };
      return variants[status] || "secondary";
    };
    const openUpdateDialog = (shipment) => {
      updateDialog.value = { open: true, shipment };
      trackingNumber.value = shipment.tracking_number || "";
      statusUpdate.value = shipment.status;
    };
    const handleUpdate = () => {
      if (!updateDialog.value.shipment) return;
      processing.value = true;
      router.put(
        update.url(updateDialog.value.shipment.id),
        {
          tracking_no: trackingNumber.value,
          status: statusUpdate.value
        },
        {
          preserveScroll: true,
          onSuccess: () => {
            updateDialog.value = { open: false, shipment: null };
            trackingNumber.value = "";
            statusUpdate.value = "";
          },
          onFinish: () => {
            processing.value = false;
          }
        }
      );
    };
    const columns = [
      {
        id: "index",
        header: () => h("div", { class: "w-12" }, "No"),
        cell: ({ row }) => {
          const index2 = row.index + 1 + (props.shipments.current_page - 1) * props.shipments.per_page;
          return h("div", { class: "font-medium" }, index2);
        }
      },
      {
        accessorKey: "order.order_number",
        header: ({ column }) => {
          return h(
            _sfc_main$k,
            {
              variant: "ghost",
              onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
              class: "-ml-4"
            },
            () => ["Order", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
          );
        },
        cell: ({ row }) => {
          const order = row.original.order;
          if (!order) {
            return h("div", { class: "text-muted-foreground" }, "N/A");
          }
          return h("div", [
            h("div", { class: "font-medium" }, order.order_number),
            h(
              "div",
              { class: "text-xs text-muted-foreground" },
              order.customer?.name || "Unknown"
            )
          ]);
        }
      },
      {
        accessorKey: "courier",
        header: () => "Kurir",
        cell: ({ row }) => {
          return h("div", { class: "font-medium uppercase" }, row.getValue("courier"));
        }
      },
      {
        accessorKey: "tracking_number",
        header: () => "Resi",
        cell: ({ row }) => {
          const tracking = row.getValue("tracking_number");
          return h(
            "div",
            { class: "font-mono text-sm" },
            () => tracking || "-"
          );
        }
      },
      {
        accessorKey: "status",
        header: () => "Status",
        cell: ({ row }) => {
          const status = row.getValue("status");
          return h(
            _sfc_main$x,
            { variant: getStatusVariant(status) },
            () => status
          );
        }
      },
      {
        accessorKey: "shipped_at",
        header: () => "Tanggal Kirim",
        cell: ({ row }) => {
          return formatDate(row.getValue("shipped_at"));
        }
      },
      {
        id: "actions",
        header: () => h("div", { class: "text-right" }, "Actions"),
        cell: ({ row }) => {
          const shipment = row.original;
          return h("div", { class: "flex justify-end gap-2" }, [
            h(
              _sfc_main$k,
              {
                variant: "outline",
                size: "sm",
                onClick: () => openUpdateDialog(shipment)
              },
              () => h(Edit, { class: "h-4 w-4" })
            )
          ]);
        }
      }
    ];
    const table = useVueTable({
      get data() {
        return props.shipments.data;
      },
      columns,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
      onColumnFiltersChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnFilters),
      onColumnVisibilityChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnVisibility),
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
    watch(
      sorting,
      (newSorting) => {
        if (newSorting.length > 0) {
          router.get(
            index.url(),
            {
              search: search.value || void 0,
              status: statusFilter.value !== "all" ? statusFilter.value : void 0,
              sort_by: newSorting[0].id,
              sort_order: newSorting[0].desc ? "desc" : "asc"
            },
            {
              preserveState: true,
              preserveScroll: true
            }
          );
        }
      },
      { deep: true }
    );
    let searchTimeout;
    watch([search, statusFilter], () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        router.get(
          index.url(),
          {
            search: search.value || void 0,
            status: statusFilter.value !== "all" ? statusFilter.value : void 0,
            sort_by: sorting.value[0]?.id || "created_at",
            sort_order: sorting.value[0]?.desc ? "desc" : "asc"
          },
          {
            preserveState: true,
            preserveScroll: true
          }
        );
      }, 300);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$l, mergeProps({ breadcrumbs: breadcrumbItems }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Pengiriman" }, null, _parent2, _scopeId));
            _push2(`<div class="rounded-xl p-4 space-y-6 py-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="text-3xl font-bold tracking-tight"${_scopeId}>Pengiriman</h1><p class="text-muted-foreground"${_scopeId}>Kelola pengiriman pesanan</p></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, { statistics: __props.statistics }, null, _parent2, _scopeId));
            _push2(`<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"${_scopeId}><div class="flex flex-1 gap-4"${_scopeId}><div class="relative flex-1 max-w-sm"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$d), {
              modelValue: search.value,
              "onUpdate:modelValue": ($event) => search.value = $event,
              placeholder: "Cari order atau customer...",
              class: "pl-9"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$e), {
              modelValue: statusFilter.value,
              "onUpdate:modelValue": ($event) => statusFilter.value = $event
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$f), { class: "w-[180px]" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$g), { placeholder: "Semua Status" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$g), { placeholder: "Semua Status" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$h), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$i), { value: "all" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Semua Status`);
                            } else {
                              return [
                                createTextVNode("Semua Status")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$i), { value: "pending" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Pending`);
                            } else {
                              return [
                                createTextVNode("Pending")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$i), { value: "shipped" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Shipped`);
                            } else {
                              return [
                                createTextVNode("Shipped")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$i), { value: "delivered" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Delivered`);
                            } else {
                              return [
                                createTextVNode("Delivered")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$i), { value: "cancelled" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Cancelled`);
                            } else {
                              return [
                                createTextVNode("Cancelled")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$i), { value: "all" }, {
                            default: withCtx(() => [
                              createTextVNode("Semua Status")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$i), { value: "pending" }, {
                            default: withCtx(() => [
                              createTextVNode("Pending")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$i), { value: "shipped" }, {
                            default: withCtx(() => [
                              createTextVNode("Shipped")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$i), { value: "delivered" }, {
                            default: withCtx(() => [
                              createTextVNode("Delivered")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$i), { value: "cancelled" }, {
                            default: withCtx(() => [
                              createTextVNode("Cancelled")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$f), { class: "w-[180px]" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$g), { placeholder: "Semua Status" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$h), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$i), { value: "all" }, {
                          default: withCtx(() => [
                            createTextVNode("Semua Status")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$i), { value: "pending" }, {
                          default: withCtx(() => [
                            createTextVNode("Pending")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$i), { value: "shipped" }, {
                          default: withCtx(() => [
                            createTextVNode("Shipped")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$i), { value: "delivered" }, {
                          default: withCtx(() => [
                            createTextVNode("Delivered")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$i), { value: "cancelled" }, {
                          default: withCtx(() => [
                            createTextVNode("Cancelled")
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
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$m), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$n), { "as-child": "" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$k), {
                          variant: "outline",
                          class: "ml-auto"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Kolom `);
                              _push5(ssrRenderComponent(unref(ChevronDown), { class: "ml-2 h-4 w-4" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createTextVNode(" Kolom "),
                                createVNode(unref(ChevronDown), { class: "ml-2 h-4 w-4" })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$k), {
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
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$o), { align: "end" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(unref(table).getAllColumns().filter((column) => column.getCanHide()), (column) => {
                          _push4(ssrRenderComponent(unref(_sfc_main$p), {
                            key: column.id,
                            class: "capitalize",
                            "model-value": column.getIsVisible(),
                            "onUpdate:modelValue": (value) => {
                              column.toggleVisibility(!!value);
                            }
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(column.id)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(column.id), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getAllColumns().filter((column) => column.getCanHide()), (column) => {
                            return openBlock(), createBlock(unref(_sfc_main$p), {
                              key: column.id,
                              class: "capitalize",
                              "model-value": column.getIsVisible(),
                              "onUpdate:modelValue": (value) => {
                                column.toggleVisibility(!!value);
                              }
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$n), { "as-child": "" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$k), {
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
                    createVNode(unref(_sfc_main$o), { align: "end" }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getAllColumns().filter((column) => column.getCanHide()), (column) => {
                          return openBlock(), createBlock(unref(_sfc_main$p), {
                            key: column.id,
                            class: "capitalize",
                            "model-value": column.getIsVisible(),
                            "onUpdate:modelValue": (value) => {
                              column.toggleVisibility(!!value);
                            }
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
            }, _parent2, _scopeId));
            _push2(`</div><div class="rounded-md border"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$q), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$r), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(unref(table).getHeaderGroups(), (headerGroup) => {
                          _push4(ssrRenderComponent(unref(_sfc_main$s), {
                            key: headerGroup.id
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(headerGroup.headers, (header) => {
                                  _push5(ssrRenderComponent(unref(_sfc_main$t), {
                                    key: header.id
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        if (!header.isPlaceholder) {
                                          _push6(ssrRenderComponent(unref(FlexRender), {
                                            render: header.column.columnDef.header,
                                            props: header.getContext()
                                          }, null, _parent6, _scopeId5));
                                        } else {
                                          _push6(`<!---->`);
                                        }
                                      } else {
                                        return [
                                          !header.isPlaceholder ? (openBlock(), createBlock(unref(FlexRender), {
                                            key: 0,
                                            render: header.column.columnDef.header,
                                            props: header.getContext()
                                          }, null, 8, ["render", "props"])) : createCommentVNode("", true)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                                    return openBlock(), createBlock(unref(_sfc_main$t), {
                                      key: header.id
                                    }, {
                                      default: withCtx(() => [
                                        !header.isPlaceholder ? (openBlock(), createBlock(unref(FlexRender), {
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
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getHeaderGroups(), (headerGroup) => {
                            return openBlock(), createBlock(unref(_sfc_main$s), {
                              key: headerGroup.id
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                                  return openBlock(), createBlock(unref(_sfc_main$t), {
                                    key: header.id
                                  }, {
                                    default: withCtx(() => [
                                      !header.isPlaceholder ? (openBlock(), createBlock(unref(FlexRender), {
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
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$u), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (unref(table).getRowModel().rows?.length) {
                          _push4(`<!--[-->`);
                          ssrRenderList(unref(table).getRowModel().rows, (row) => {
                            _push4(ssrRenderComponent(unref(_sfc_main$s), {
                              key: row.id
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<!--[-->`);
                                  ssrRenderList(row.getVisibleCells(), (cell) => {
                                    _push5(ssrRenderComponent(unref(_sfc_main$v), {
                                      key: cell.id
                                    }, {
                                      default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(ssrRenderComponent(unref(FlexRender), {
                                            render: cell.column.columnDef.cell,
                                            props: cell.getContext()
                                          }, null, _parent6, _scopeId5));
                                        } else {
                                          return [
                                            createVNode(unref(FlexRender), {
                                              render: cell.column.columnDef.cell,
                                              props: cell.getContext()
                                            }, null, 8, ["render", "props"])
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                  });
                                  _push5(`<!--]-->`);
                                } else {
                                  return [
                                    (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                                      return openBlock(), createBlock(unref(_sfc_main$v), {
                                        key: cell.id
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(FlexRender), {
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
                            }, _parent4, _scopeId3));
                          });
                          _push4(`<!--]-->`);
                        } else {
                          _push4(ssrRenderComponent(unref(_sfc_main$s), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(_sfc_main$v), {
                                  colspan: columns.length,
                                  class: "h-24 text-center"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(` Tidak ada data pengiriman. `);
                                    } else {
                                      return [
                                        createTextVNode(" Tidak ada data pengiriman. ")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(_sfc_main$v), {
                                    colspan: columns.length,
                                    class: "h-24 text-center"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Tidak ada data pengiriman. ")
                                    ]),
                                    _: 1
                                  }, 8, ["colspan"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        }
                      } else {
                        return [
                          unref(table).getRowModel().rows?.length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(table).getRowModel().rows, (row) => {
                            return openBlock(), createBlock(unref(_sfc_main$s), {
                              key: row.id
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                                  return openBlock(), createBlock(unref(_sfc_main$v), {
                                    key: cell.id
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(FlexRender), {
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
                          }), 128)) : (openBlock(), createBlock(unref(_sfc_main$s), { key: 1 }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$v), {
                                colspan: columns.length,
                                class: "h-24 text-center"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Tidak ada data pengiriman. ")
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$r), null, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getHeaderGroups(), (headerGroup) => {
                          return openBlock(), createBlock(unref(_sfc_main$s), {
                            key: headerGroup.id
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                                return openBlock(), createBlock(unref(_sfc_main$t), {
                                  key: header.id
                                }, {
                                  default: withCtx(() => [
                                    !header.isPlaceholder ? (openBlock(), createBlock(unref(FlexRender), {
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
                    createVNode(unref(_sfc_main$u), null, {
                      default: withCtx(() => [
                        unref(table).getRowModel().rows?.length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(table).getRowModel().rows, (row) => {
                          return openBlock(), createBlock(unref(_sfc_main$s), {
                            key: row.id
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                                return openBlock(), createBlock(unref(_sfc_main$v), {
                                  key: cell.id
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(FlexRender), {
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
                        }), 128)) : (openBlock(), createBlock(unref(_sfc_main$s), { key: 1 }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$v), {
                              colspan: columns.length,
                              class: "h-24 text-center"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Tidak ada data pengiriman. ")
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
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (__props.shipments.last_page > 1) {
              _push2(ssrRenderComponent(_sfc_main$w, {
                data: {
                  current_page: __props.shipments.current_page,
                  last_page: __props.shipments.last_page,
                  per_page: __props.shipments.per_page,
                  from: (__props.shipments.current_page - 1) * __props.shipments.per_page + 1,
                  to: Math.min(__props.shipments.current_page * __props.shipments.per_page, __props.shipments.total),
                  total: __props.shipments.total
                },
                url: unref(index).url(),
                filters: {
                  search: search.value || void 0,
                  status: statusFilter.value !== "all" ? statusFilter.value : void 0,
                  sort_by: sorting.value[0]?.id || "created_at",
                  sort_order: sorting.value[0]?.desc ? "desc" : "asc"
                }
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              open: updateDialog.value.open,
              "onUpdate:open": ($event) => updateDialog.value.open = $event,
              "tracking-number": trackingNumber.value,
              "onUpdate:trackingNumber": ($event) => trackingNumber.value = $event,
              status: statusUpdate.value,
              "onUpdate:status": ($event) => statusUpdate.value = $event,
              shipment: updateDialog.value.shipment,
              processing: processing.value,
              onSubmit: handleUpdate
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Head), { title: "Pengiriman" }),
              createVNode("div", { class: "rounded-xl p-4 space-y-6 py-6" }, [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("div", null, [
                    createVNode("h1", { class: "text-3xl font-bold tracking-tight" }, "Pengiriman"),
                    createVNode("p", { class: "text-muted-foreground" }, "Kelola pengiriman pesanan")
                  ])
                ]),
                createVNode(_sfc_main$2, { statistics: __props.statistics }, null, 8, ["statistics"]),
                createVNode("div", { class: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" }, [
                  createVNode("div", { class: "flex flex-1 gap-4" }, [
                    createVNode("div", { class: "relative flex-1 max-w-sm" }, [
                      createVNode(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
                      createVNode(unref(_sfc_main$d), {
                        modelValue: search.value,
                        "onUpdate:modelValue": ($event) => search.value = $event,
                        placeholder: "Cari order atau customer...",
                        class: "pl-9"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(unref(_sfc_main$e), {
                      modelValue: statusFilter.value,
                      "onUpdate:modelValue": ($event) => statusFilter.value = $event
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$f), { class: "w-[180px]" }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$g), { placeholder: "Semua Status" })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$h), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$i), { value: "all" }, {
                              default: withCtx(() => [
                                createTextVNode("Semua Status")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$i), { value: "pending" }, {
                              default: withCtx(() => [
                                createTextVNode("Pending")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$i), { value: "shipped" }, {
                              default: withCtx(() => [
                                createTextVNode("Shipped")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$i), { value: "delivered" }, {
                              default: withCtx(() => [
                                createTextVNode("Delivered")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$i), { value: "cancelled" }, {
                              default: withCtx(() => [
                                createTextVNode("Cancelled")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode(unref(_sfc_main$m), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$n), { "as-child": "" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$k), {
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
                      createVNode(unref(_sfc_main$o), { align: "end" }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getAllColumns().filter((column) => column.getCanHide()), (column) => {
                            return openBlock(), createBlock(unref(_sfc_main$p), {
                              key: column.id,
                              class: "capitalize",
                              "model-value": column.getIsVisible(),
                              "onUpdate:modelValue": (value) => {
                                column.toggleVisibility(!!value);
                              }
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
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "rounded-md border" }, [
                  createVNode(unref(_sfc_main$q), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$r), null, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getHeaderGroups(), (headerGroup) => {
                            return openBlock(), createBlock(unref(_sfc_main$s), {
                              key: headerGroup.id
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                                  return openBlock(), createBlock(unref(_sfc_main$t), {
                                    key: header.id
                                  }, {
                                    default: withCtx(() => [
                                      !header.isPlaceholder ? (openBlock(), createBlock(unref(FlexRender), {
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
                      createVNode(unref(_sfc_main$u), null, {
                        default: withCtx(() => [
                          unref(table).getRowModel().rows?.length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(table).getRowModel().rows, (row) => {
                            return openBlock(), createBlock(unref(_sfc_main$s), {
                              key: row.id
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                                  return openBlock(), createBlock(unref(_sfc_main$v), {
                                    key: cell.id
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(FlexRender), {
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
                          }), 128)) : (openBlock(), createBlock(unref(_sfc_main$s), { key: 1 }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$v), {
                                colspan: columns.length,
                                class: "h-24 text-center"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Tidak ada data pengiriman. ")
                                ]),
                                _: 1
                              }, 8, ["colspan"])
                            ]),
                            _: 1
                          }))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                __props.shipments.last_page > 1 ? (openBlock(), createBlock(_sfc_main$w, {
                  key: 0,
                  data: {
                    current_page: __props.shipments.current_page,
                    last_page: __props.shipments.last_page,
                    per_page: __props.shipments.per_page,
                    from: (__props.shipments.current_page - 1) * __props.shipments.per_page + 1,
                    to: Math.min(__props.shipments.current_page * __props.shipments.per_page, __props.shipments.total),
                    total: __props.shipments.total
                  },
                  url: unref(index).url(),
                  filters: {
                    search: search.value || void 0,
                    status: statusFilter.value !== "all" ? statusFilter.value : void 0,
                    sort_by: sorting.value[0]?.id || "created_at",
                    sort_order: sorting.value[0]?.desc ? "desc" : "asc"
                  }
                }, null, 8, ["data", "url", "filters"])) : createCommentVNode("", true)
              ]),
              createVNode(_sfc_main$1, {
                open: updateDialog.value.open,
                "onUpdate:open": ($event) => updateDialog.value.open = $event,
                "tracking-number": trackingNumber.value,
                "onUpdate:trackingNumber": ($event) => trackingNumber.value = $event,
                status: statusUpdate.value,
                "onUpdate:status": ($event) => statusUpdate.value = $event,
                shipment: updateDialog.value.shipment,
                processing: processing.value,
                onSubmit: handleUpdate
              }, null, 8, ["open", "onUpdate:open", "tracking-number", "onUpdate:trackingNumber", "status", "onUpdate:status", "shipment", "processing"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Shipments/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
