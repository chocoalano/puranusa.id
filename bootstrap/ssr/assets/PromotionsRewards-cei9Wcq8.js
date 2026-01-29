import { defineComponent, unref, withCtx, createVNode, createTextVNode, resolveDynamicComponent, createBlock, openBlock, toDisplayString, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderVNode, ssrRenderStyle } from "vue/server-renderer";
import { Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1, b as show } from "./AppLayout-Dl_X7-UB.js";
import { _ as _sfc_main$2 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$8 } from "./index-BpQimeTM.js";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5, d as _sfc_main$6, c as _sfc_main$7 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$9, a as _sfc_main$a, b as _sfc_main$b, c as _sfc_main$c, d as _sfc_main$d, e as _sfc_main$e } from "./TableHeader-emcE6QAC.js";
import { Gift, ArrowLeft, Target, Clock, Trophy, CheckCircle } from "lucide-vue-next";
import "class-variance-authority";
import "./DropdownMenuTrigger-B1v6pHML.js";
import "reka-ui";
import "@vueuse/core";
import "./Input-BGi8wCMh.js";
import "./index--D7ld9AJ.js";
import "./AvatarImage-DWFQMckn.js";
import "./index-BsP5JKUP.js";
import "vue-sonner";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
import "clsx";
import "tailwind-merge";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PromotionsRewards",
  __ssrInlineRender: true,
  props: {
    customer: {},
    activeRewards: {},
    claimedRewards: {}
  },
  setup(__props) {
    const formatCurrency = (value) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(value);
    };
    const formatNumber = (value) => {
      return new Intl.NumberFormat("id-ID").format(value);
    };
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
    };
    const formatDateTime = (dateString) => {
      return new Date(dateString).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const getStatusBadge = (status) => {
      if (status === 0) {
        return { text: "Belum Tercapai", variant: "secondary" };
      }
      return { text: "Diproses", variant: "default" };
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: `Promotions Rewards - ${__props.customer.name}`
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="rounded-xl p-4 space-y-6 py-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="text-3xl font-bold flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Gift), { class: "h-8 w-8" }, null, _parent2, _scopeId));
            _push2(` Promotions Rewards </h1><p class="mt-2 text-muted-foreground"${_scopeId}> Progress reward promosi untuk <strong${_scopeId}>${ssrInterpolate(__props.customer.name)}</strong> (${ssrInterpolate(__props.customer.ewallet_id)}) </p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(show).url(__props.customer.id)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$2), { variant: "outline" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(ArrowLeft), { class: "mr-2 h-4 w-4" }, null, _parent4, _scopeId3));
                        _push4(` Kembali ke Detail `);
                      } else {
                        return [
                          createVNode(unref(ArrowLeft), { class: "mr-2 h-4 w-4" }),
                          createTextVNode(" Kembali ke Detail ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$2), { variant: "outline" }, {
                      default: withCtx(() => [
                        createVNode(unref(ArrowLeft), { class: "mr-2 h-4 w-4" }),
                        createTextVNode(" Kembali ke Detail ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$3), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex items-center gap-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Target), { class: "h-5 w-5 text-primary" }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Reward Promosi Aktif`);
                            } else {
                              return [
                                createTextVNode("Reward Promosi Aktif")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Daftar reward promosi yang sedang berlangsung dan progress pencapaiannya `);
                            } else {
                              return [
                                createTextVNode(" Daftar reward promosi yang sedang berlangsung dan progress pencapaiannya ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode(unref(Target), { class: "h-5 w-5 text-primary" }),
                            createVNode(unref(_sfc_main$5), null, {
                              default: withCtx(() => [
                                createTextVNode("Reward Promosi Aktif")
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode(" Daftar reward promosi yang sedang berlangsung dan progress pencapaiannya ")
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
                        if (__props.activeRewards.length === 0) {
                          _push4(`<div class="text-center py-8 text-muted-foreground"${_scopeId3}>`);
                          _push4(ssrRenderComponent(unref(Gift), { class: "h-12 w-12 mx-auto mb-3 opacity-50" }, null, _parent4, _scopeId3));
                          _push4(`<p${_scopeId3}>Tidak ada reward promosi aktif saat ini</p></div>`);
                        } else {
                          _push4(`<div class="space-y-4"${_scopeId3}><!--[-->`);
                          ssrRenderList(__props.activeRewards, (reward) => {
                            _push4(`<div class="border rounded-lg p-4 space-y-4"${_scopeId3}><div class="flex items-start justify-between"${_scopeId3}><div${_scopeId3}><h3 class="font-semibold text-lg"${_scopeId3}>${ssrInterpolate(reward.name)}</h3><p class="text-sm text-muted-foreground"${_scopeId3}>${ssrInterpolate(reward.reward)}</p></div>`);
                            _push4(ssrRenderComponent(unref(_sfc_main$8), {
                              variant: getStatusBadge(reward.status).variant
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  ssrRenderVNode(_push5, createVNode(resolveDynamicComponent(reward.status === 1 ? unref(Clock) : unref(Target)), { class: "h-3 w-3 mr-1" }, null), _parent5, _scopeId4);
                                  _push5(` ${ssrInterpolate(getStatusBadge(reward.status).text)}`);
                                } else {
                                  return [
                                    (openBlock(), createBlock(resolveDynamicComponent(reward.status === 1 ? unref(Clock) : unref(Target)), { class: "h-3 w-3 mr-1" })),
                                    createTextVNode(" " + toDisplayString(getStatusBadge(reward.status).text), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(`</div><div class="grid gap-4 md:grid-cols-2"${_scopeId3}><div class="space-y-2"${_scopeId3}><div class="flex justify-between text-sm"${_scopeId3}><span class="font-medium"${_scopeId3}>Omset Grup Kiri</span><span${_scopeId3}>${ssrInterpolate(formatNumber(reward.omzet_left))} / ${ssrInterpolate(formatNumber(reward.bv_required))} BV </span></div><div class="h-3 w-full overflow-hidden rounded-full bg-secondary"${_scopeId3}><div class="h-full bg-primary transition-all" style="${ssrRenderStyle({ width: `${reward.progress_left_percent}%` })}"${_scopeId3}></div></div><p class="text-xs text-muted-foreground text-right"${_scopeId3}>${ssrInterpolate(reward.progress_left_percent.toFixed(1))}% </p></div><div class="space-y-2"${_scopeId3}><div class="flex justify-between text-sm"${_scopeId3}><span class="font-medium"${_scopeId3}>Omset Grup Kanan</span><span${_scopeId3}>${ssrInterpolate(formatNumber(reward.omzet_right))} / ${ssrInterpolate(formatNumber(reward.bv_required))} BV </span></div><div class="h-3 w-full overflow-hidden rounded-full bg-secondary"${_scopeId3}><div class="h-full bg-primary transition-all" style="${ssrRenderStyle({ width: `${reward.progress_right_percent}%` })}"${_scopeId3}></div></div><p class="text-xs text-muted-foreground text-right"${_scopeId3}>${ssrInterpolate(reward.progress_right_percent.toFixed(1))}% </p></div></div><div class="flex items-center justify-between pt-2 border-t text-sm text-muted-foreground"${_scopeId3}><span${_scopeId3}>Syarat: ${ssrInterpolate(formatNumber(reward.bv_required))} BV (Kiri &amp; Kanan)</span><span${_scopeId3}>Periode: ${ssrInterpolate(formatDate(reward.start))} - ${ssrInterpolate(formatDate(reward.end))}</span></div></div>`);
                          });
                          _push4(`<!--]--></div>`);
                        }
                      } else {
                        return [
                          __props.activeRewards.length === 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-center py-8 text-muted-foreground"
                          }, [
                            createVNode(unref(Gift), { class: "h-12 w-12 mx-auto mb-3 opacity-50" }),
                            createVNode("p", null, "Tidak ada reward promosi aktif saat ini")
                          ])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "space-y-4"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.activeRewards, (reward) => {
                              return openBlock(), createBlock("div", {
                                key: reward.id,
                                class: "border rounded-lg p-4 space-y-4"
                              }, [
                                createVNode("div", { class: "flex items-start justify-between" }, [
                                  createVNode("div", null, [
                                    createVNode("h3", { class: "font-semibold text-lg" }, toDisplayString(reward.name), 1),
                                    createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(reward.reward), 1)
                                  ]),
                                  createVNode(unref(_sfc_main$8), {
                                    variant: getStatusBadge(reward.status).variant
                                  }, {
                                    default: withCtx(() => [
                                      (openBlock(), createBlock(resolveDynamicComponent(reward.status === 1 ? unref(Clock) : unref(Target)), { class: "h-3 w-3 mr-1" })),
                                      createTextVNode(" " + toDisplayString(getStatusBadge(reward.status).text), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["variant"])
                                ]),
                                createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                                  createVNode("div", { class: "space-y-2" }, [
                                    createVNode("div", { class: "flex justify-between text-sm" }, [
                                      createVNode("span", { class: "font-medium" }, "Omset Grup Kiri"),
                                      createVNode("span", null, toDisplayString(formatNumber(reward.omzet_left)) + " / " + toDisplayString(formatNumber(reward.bv_required)) + " BV ", 1)
                                    ]),
                                    createVNode("div", { class: "h-3 w-full overflow-hidden rounded-full bg-secondary" }, [
                                      createVNode("div", {
                                        class: "h-full bg-primary transition-all",
                                        style: { width: `${reward.progress_left_percent}%` }
                                      }, null, 4)
                                    ]),
                                    createVNode("p", { class: "text-xs text-muted-foreground text-right" }, toDisplayString(reward.progress_left_percent.toFixed(1)) + "% ", 1)
                                  ]),
                                  createVNode("div", { class: "space-y-2" }, [
                                    createVNode("div", { class: "flex justify-between text-sm" }, [
                                      createVNode("span", { class: "font-medium" }, "Omset Grup Kanan"),
                                      createVNode("span", null, toDisplayString(formatNumber(reward.omzet_right)) + " / " + toDisplayString(formatNumber(reward.bv_required)) + " BV ", 1)
                                    ]),
                                    createVNode("div", { class: "h-3 w-full overflow-hidden rounded-full bg-secondary" }, [
                                      createVNode("div", {
                                        class: "h-full bg-primary transition-all",
                                        style: { width: `${reward.progress_right_percent}%` }
                                      }, null, 4)
                                    ]),
                                    createVNode("p", { class: "text-xs text-muted-foreground text-right" }, toDisplayString(reward.progress_right_percent.toFixed(1)) + "% ", 1)
                                  ])
                                ]),
                                createVNode("div", { class: "flex items-center justify-between pt-2 border-t text-sm text-muted-foreground" }, [
                                  createVNode("span", null, "Syarat: " + toDisplayString(formatNumber(reward.bv_required)) + " BV (Kiri & Kanan)", 1),
                                  createVNode("span", null, "Periode: " + toDisplayString(formatDate(reward.start)) + " - " + toDisplayString(formatDate(reward.end)), 1)
                                ])
                              ]);
                            }), 128))
                          ]))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode(unref(Target), { class: "h-5 w-5 text-primary" }),
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Reward Promosi Aktif")
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode(" Daftar reward promosi yang sedang berlangsung dan progress pencapaiannya ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), null, {
                      default: withCtx(() => [
                        __props.activeRewards.length === 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-center py-8 text-muted-foreground"
                        }, [
                          createVNode(unref(Gift), { class: "h-12 w-12 mx-auto mb-3 opacity-50" }),
                          createVNode("p", null, "Tidak ada reward promosi aktif saat ini")
                        ])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "space-y-4"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.activeRewards, (reward) => {
                            return openBlock(), createBlock("div", {
                              key: reward.id,
                              class: "border rounded-lg p-4 space-y-4"
                            }, [
                              createVNode("div", { class: "flex items-start justify-between" }, [
                                createVNode("div", null, [
                                  createVNode("h3", { class: "font-semibold text-lg" }, toDisplayString(reward.name), 1),
                                  createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(reward.reward), 1)
                                ]),
                                createVNode(unref(_sfc_main$8), {
                                  variant: getStatusBadge(reward.status).variant
                                }, {
                                  default: withCtx(() => [
                                    (openBlock(), createBlock(resolveDynamicComponent(reward.status === 1 ? unref(Clock) : unref(Target)), { class: "h-3 w-3 mr-1" })),
                                    createTextVNode(" " + toDisplayString(getStatusBadge(reward.status).text), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["variant"])
                              ]),
                              createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                                createVNode("div", { class: "space-y-2" }, [
                                  createVNode("div", { class: "flex justify-between text-sm" }, [
                                    createVNode("span", { class: "font-medium" }, "Omset Grup Kiri"),
                                    createVNode("span", null, toDisplayString(formatNumber(reward.omzet_left)) + " / " + toDisplayString(formatNumber(reward.bv_required)) + " BV ", 1)
                                  ]),
                                  createVNode("div", { class: "h-3 w-full overflow-hidden rounded-full bg-secondary" }, [
                                    createVNode("div", {
                                      class: "h-full bg-primary transition-all",
                                      style: { width: `${reward.progress_left_percent}%` }
                                    }, null, 4)
                                  ]),
                                  createVNode("p", { class: "text-xs text-muted-foreground text-right" }, toDisplayString(reward.progress_left_percent.toFixed(1)) + "% ", 1)
                                ]),
                                createVNode("div", { class: "space-y-2" }, [
                                  createVNode("div", { class: "flex justify-between text-sm" }, [
                                    createVNode("span", { class: "font-medium" }, "Omset Grup Kanan"),
                                    createVNode("span", null, toDisplayString(formatNumber(reward.omzet_right)) + " / " + toDisplayString(formatNumber(reward.bv_required)) + " BV ", 1)
                                  ]),
                                  createVNode("div", { class: "h-3 w-full overflow-hidden rounded-full bg-secondary" }, [
                                    createVNode("div", {
                                      class: "h-full bg-primary transition-all",
                                      style: { width: `${reward.progress_right_percent}%` }
                                    }, null, 4)
                                  ]),
                                  createVNode("p", { class: "text-xs text-muted-foreground text-right" }, toDisplayString(reward.progress_right_percent.toFixed(1)) + "% ", 1)
                                ])
                              ]),
                              createVNode("div", { class: "flex items-center justify-between pt-2 border-t text-sm text-muted-foreground" }, [
                                createVNode("span", null, "Syarat: " + toDisplayString(formatNumber(reward.bv_required)) + " BV (Kiri & Kanan)", 1),
                                createVNode("span", null, "Periode: " + toDisplayString(formatDate(reward.start)) + " - " + toDisplayString(formatDate(reward.end)), 1)
                              ])
                            ]);
                          }), 128))
                        ]))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$3), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex items-center gap-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Trophy), { class: "h-5 w-5 text-yellow-500" }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Reward Yang Sudah Diklaim`);
                            } else {
                              return [
                                createTextVNode("Reward Yang Sudah Diklaim")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Riwayat reward promosi yang telah berhasil diklaim oleh member ini `);
                            } else {
                              return [
                                createTextVNode(" Riwayat reward promosi yang telah berhasil diklaim oleh member ini ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode(unref(Trophy), { class: "h-5 w-5 text-yellow-500" }),
                            createVNode(unref(_sfc_main$5), null, {
                              default: withCtx(() => [
                                createTextVNode("Reward Yang Sudah Diklaim")
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode(" Riwayat reward promosi yang telah berhasil diklaim oleh member ini ")
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
                        if (__props.claimedRewards.length === 0) {
                          _push4(`<div class="text-center py-8 text-muted-foreground"${_scopeId3}>`);
                          _push4(ssrRenderComponent(unref(Trophy), { class: "h-12 w-12 mx-auto mb-3 opacity-50" }, null, _parent4, _scopeId3));
                          _push4(`<p${_scopeId3}>Belum ada reward yang diklaim</p></div>`);
                        } else {
                          _push4(ssrRenderComponent(unref(_sfc_main$9), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(_sfc_main$a), null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(_sfc_main$b), null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(unref(_sfc_main$c), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`Reward`);
                                                } else {
                                                  return [
                                                    createTextVNode("Reward")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$c), { class: "text-right" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`Syarat Omset Group (BV)`);
                                                } else {
                                                  return [
                                                    createTextVNode("Syarat Omset Group (BV)")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$c), { class: "text-right" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`Nilai`);
                                                } else {
                                                  return [
                                                    createTextVNode("Nilai")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$c), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`Tanggal Klaim`);
                                                } else {
                                                  return [
                                                    createTextVNode("Tanggal Klaim")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$c), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`Status`);
                                                } else {
                                                  return [
                                                    createTextVNode("Status")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(unref(_sfc_main$c), null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Reward")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(unref(_sfc_main$c), { class: "text-right" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Syarat Omset Group (BV)")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(unref(_sfc_main$c), { class: "text-right" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Nilai")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(unref(_sfc_main$c), null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Tanggal Klaim")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(unref(_sfc_main$c), null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Status")
                                                ]),
                                                _: 1
                                              })
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(unref(_sfc_main$b), null, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$c), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Reward")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$c), { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Syarat Omset Group (BV)")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$c), { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Nilai")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$c), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Tanggal Klaim")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$c), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Status")
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
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(_sfc_main$d), null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<!--[-->`);
                                      ssrRenderList(__props.claimedRewards, (claimed) => {
                                        _push6(ssrRenderComponent(unref(_sfc_main$b), {
                                          key: claimed.id
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(unref(_sfc_main$e), { class: "font-medium" }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`${ssrInterpolate(claimed.reward)}`);
                                                  } else {
                                                    return [
                                                      createTextVNode(toDisplayString(claimed.reward), 1)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                              _push7(ssrRenderComponent(unref(_sfc_main$e), { class: "text-right" }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`${ssrInterpolate(formatNumber(claimed.bv))}`);
                                                  } else {
                                                    return [
                                                      createTextVNode(toDisplayString(formatNumber(claimed.bv)), 1)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                              _push7(ssrRenderComponent(unref(_sfc_main$e), { class: "text-right" }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`${ssrInterpolate(formatCurrency(claimed.amount))}`);
                                                  } else {
                                                    return [
                                                      createTextVNode(toDisplayString(formatCurrency(claimed.amount)), 1)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                              _push7(ssrRenderComponent(unref(_sfc_main$e), null, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`${ssrInterpolate(formatDateTime(claimed.claimed_at))}`);
                                                  } else {
                                                    return [
                                                      createTextVNode(toDisplayString(formatDateTime(claimed.claimed_at)), 1)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                              _push7(ssrRenderComponent(unref(_sfc_main$e), null, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(unref(_sfc_main$8), {
                                                      variant: "default",
                                                      class: "bg-green-500"
                                                    }, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(ssrRenderComponent(unref(CheckCircle), { class: "h-3 w-3 mr-1" }, null, _parent9, _scopeId8));
                                                          _push9(` Diklaim `);
                                                        } else {
                                                          return [
                                                            createVNode(unref(CheckCircle), { class: "h-3 w-3 mr-1" }),
                                                            createTextVNode(" Diklaim ")
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                  } else {
                                                    return [
                                                      createVNode(unref(_sfc_main$8), {
                                                        variant: "default",
                                                        class: "bg-green-500"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode(unref(CheckCircle), { class: "h-3 w-3 mr-1" }),
                                                          createTextVNode(" Diklaim ")
                                                        ]),
                                                        _: 1
                                                      })
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(unref(_sfc_main$e), { class: "font-medium" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(claimed.reward), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(unref(_sfc_main$e), { class: "text-right" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(formatNumber(claimed.bv)), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(unref(_sfc_main$e), { class: "text-right" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(formatCurrency(claimed.amount)), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(unref(_sfc_main$e), null, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(formatDateTime(claimed.claimed_at)), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(unref(_sfc_main$e), null, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(_sfc_main$8), {
                                                      variant: "default",
                                                      class: "bg-green-500"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(unref(CheckCircle), { class: "h-3 w-3 mr-1" }),
                                                        createTextVNode(" Diklaim ")
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
                                        }, _parent6, _scopeId5));
                                      });
                                      _push6(`<!--]-->`);
                                    } else {
                                      return [
                                        (openBlock(true), createBlock(Fragment, null, renderList(__props.claimedRewards, (claimed) => {
                                          return openBlock(), createBlock(unref(_sfc_main$b), {
                                            key: claimed.id
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$e), { class: "font-medium" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(claimed.reward), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$e), { class: "text-right" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(formatNumber(claimed.bv)), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$e), { class: "text-right" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(formatCurrency(claimed.amount)), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$e), null, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(formatDateTime(claimed.claimed_at)), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$e), null, {
                                                default: withCtx(() => [
                                                  createVNode(unref(_sfc_main$8), {
                                                    variant: "default",
                                                    class: "bg-green-500"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(CheckCircle), { class: "h-3 w-3 mr-1" }),
                                                      createTextVNode(" Diklaim ")
                                                    ]),
                                                    _: 1
                                                  })
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 2
                                          }, 1024);
                                        }), 128))
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(_sfc_main$a), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$b), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$c), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Reward")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$c), { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Syarat Omset Group (BV)")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$c), { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Nilai")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$c), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Tanggal Klaim")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$c), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Status")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$d), null, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.claimedRewards, (claimed) => {
                                        return openBlock(), createBlock(unref(_sfc_main$b), {
                                          key: claimed.id
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$e), { class: "font-medium" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(claimed.reward), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$e), { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(formatNumber(claimed.bv)), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$e), { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(formatCurrency(claimed.amount)), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$e), null, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(formatDateTime(claimed.claimed_at)), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$e), null, {
                                              default: withCtx(() => [
                                                createVNode(unref(_sfc_main$8), {
                                                  variant: "default",
                                                  class: "bg-green-500"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(CheckCircle), { class: "h-3 w-3 mr-1" }),
                                                    createTextVNode(" Diklaim ")
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 1
                                            })
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
                          }, _parent4, _scopeId3));
                        }
                      } else {
                        return [
                          __props.claimedRewards.length === 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-center py-8 text-muted-foreground"
                          }, [
                            createVNode(unref(Trophy), { class: "h-12 w-12 mx-auto mb-3 opacity-50" }),
                            createVNode("p", null, "Belum ada reward yang diklaim")
                          ])) : (openBlock(), createBlock(unref(_sfc_main$9), { key: 1 }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$a), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$b), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$c), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Reward")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$c), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Syarat Omset Group (BV)")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$c), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Nilai")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$c), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Tanggal Klaim")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$c), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Status")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$d), null, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.claimedRewards, (claimed) => {
                                    return openBlock(), createBlock(unref(_sfc_main$b), {
                                      key: claimed.id
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$e), { class: "font-medium" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(claimed.reward), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$e), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(formatNumber(claimed.bv)), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$e), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(formatCurrency(claimed.amount)), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$e), null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(formatDateTime(claimed.claimed_at)), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$e), null, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$8), {
                                              variant: "default",
                                              class: "bg-green-500"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(CheckCircle), { class: "h-3 w-3 mr-1" }),
                                                createTextVNode(" Diklaim ")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 2
                                    }, 1024);
                                  }), 128))
                                ]),
                                _: 1
                              })
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
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode(unref(Trophy), { class: "h-5 w-5 text-yellow-500" }),
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Reward Yang Sudah Diklaim")
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode(" Riwayat reward promosi yang telah berhasil diklaim oleh member ini ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), null, {
                      default: withCtx(() => [
                        __props.claimedRewards.length === 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-center py-8 text-muted-foreground"
                        }, [
                          createVNode(unref(Trophy), { class: "h-12 w-12 mx-auto mb-3 opacity-50" }),
                          createVNode("p", null, "Belum ada reward yang diklaim")
                        ])) : (openBlock(), createBlock(unref(_sfc_main$9), { key: 1 }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$a), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$b), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$c), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Reward")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$c), { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Syarat Omset Group (BV)")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$c), { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Nilai")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$c), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Tanggal Klaim")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$c), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Status")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$d), null, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.claimedRewards, (claimed) => {
                                  return openBlock(), createBlock(unref(_sfc_main$b), {
                                    key: claimed.id
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$e), { class: "font-medium" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(claimed.reward), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$e), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(formatNumber(claimed.bv)), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$e), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(formatCurrency(claimed.amount)), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$e), null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(formatDateTime(claimed.claimed_at)), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$e), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$8), {
                                            variant: "default",
                                            class: "bg-green-500"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(CheckCircle), { class: "h-3 w-3 mr-1" }),
                                              createTextVNode(" Diklaim ")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 128))
                              ]),
                              _: 1
                            })
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
          } else {
            return [
              createVNode("div", { class: "rounded-xl p-4 space-y-6 py-6" }, [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("div", null, [
                    createVNode("h1", { class: "text-3xl font-bold flex items-center gap-2" }, [
                      createVNode(unref(Gift), { class: "h-8 w-8" }),
                      createTextVNode(" Promotions Rewards ")
                    ]),
                    createVNode("p", { class: "mt-2 text-muted-foreground" }, [
                      createTextVNode(" Progress reward promosi untuk "),
                      createVNode("strong", null, toDisplayString(__props.customer.name), 1),
                      createTextVNode(" (" + toDisplayString(__props.customer.ewallet_id) + ") ", 1)
                    ])
                  ]),
                  createVNode(unref(Link), {
                    href: unref(show).url(__props.customer.id)
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$2), { variant: "outline" }, {
                        default: withCtx(() => [
                          createVNode(unref(ArrowLeft), { class: "mr-2 h-4 w-4" }),
                          createTextVNode(" Kembali ke Detail ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["href"])
                ]),
                createVNode(unref(_sfc_main$3), null, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode(unref(Target), { class: "h-5 w-5 text-primary" }),
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Reward Promosi Aktif")
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode(" Daftar reward promosi yang sedang berlangsung dan progress pencapaiannya ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), null, {
                      default: withCtx(() => [
                        __props.activeRewards.length === 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-center py-8 text-muted-foreground"
                        }, [
                          createVNode(unref(Gift), { class: "h-12 w-12 mx-auto mb-3 opacity-50" }),
                          createVNode("p", null, "Tidak ada reward promosi aktif saat ini")
                        ])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "space-y-4"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.activeRewards, (reward) => {
                            return openBlock(), createBlock("div", {
                              key: reward.id,
                              class: "border rounded-lg p-4 space-y-4"
                            }, [
                              createVNode("div", { class: "flex items-start justify-between" }, [
                                createVNode("div", null, [
                                  createVNode("h3", { class: "font-semibold text-lg" }, toDisplayString(reward.name), 1),
                                  createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(reward.reward), 1)
                                ]),
                                createVNode(unref(_sfc_main$8), {
                                  variant: getStatusBadge(reward.status).variant
                                }, {
                                  default: withCtx(() => [
                                    (openBlock(), createBlock(resolveDynamicComponent(reward.status === 1 ? unref(Clock) : unref(Target)), { class: "h-3 w-3 mr-1" })),
                                    createTextVNode(" " + toDisplayString(getStatusBadge(reward.status).text), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["variant"])
                              ]),
                              createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                                createVNode("div", { class: "space-y-2" }, [
                                  createVNode("div", { class: "flex justify-between text-sm" }, [
                                    createVNode("span", { class: "font-medium" }, "Omset Grup Kiri"),
                                    createVNode("span", null, toDisplayString(formatNumber(reward.omzet_left)) + " / " + toDisplayString(formatNumber(reward.bv_required)) + " BV ", 1)
                                  ]),
                                  createVNode("div", { class: "h-3 w-full overflow-hidden rounded-full bg-secondary" }, [
                                    createVNode("div", {
                                      class: "h-full bg-primary transition-all",
                                      style: { width: `${reward.progress_left_percent}%` }
                                    }, null, 4)
                                  ]),
                                  createVNode("p", { class: "text-xs text-muted-foreground text-right" }, toDisplayString(reward.progress_left_percent.toFixed(1)) + "% ", 1)
                                ]),
                                createVNode("div", { class: "space-y-2" }, [
                                  createVNode("div", { class: "flex justify-between text-sm" }, [
                                    createVNode("span", { class: "font-medium" }, "Omset Grup Kanan"),
                                    createVNode("span", null, toDisplayString(formatNumber(reward.omzet_right)) + " / " + toDisplayString(formatNumber(reward.bv_required)) + " BV ", 1)
                                  ]),
                                  createVNode("div", { class: "h-3 w-full overflow-hidden rounded-full bg-secondary" }, [
                                    createVNode("div", {
                                      class: "h-full bg-primary transition-all",
                                      style: { width: `${reward.progress_right_percent}%` }
                                    }, null, 4)
                                  ]),
                                  createVNode("p", { class: "text-xs text-muted-foreground text-right" }, toDisplayString(reward.progress_right_percent.toFixed(1)) + "% ", 1)
                                ])
                              ]),
                              createVNode("div", { class: "flex items-center justify-between pt-2 border-t text-sm text-muted-foreground" }, [
                                createVNode("span", null, "Syarat: " + toDisplayString(formatNumber(reward.bv_required)) + " BV (Kiri & Kanan)", 1),
                                createVNode("span", null, "Periode: " + toDisplayString(formatDate(reward.start)) + " - " + toDisplayString(formatDate(reward.end)), 1)
                              ])
                            ]);
                          }), 128))
                        ]))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(unref(_sfc_main$3), null, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode(unref(Trophy), { class: "h-5 w-5 text-yellow-500" }),
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Reward Yang Sudah Diklaim")
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode(" Riwayat reward promosi yang telah berhasil diklaim oleh member ini ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), null, {
                      default: withCtx(() => [
                        __props.claimedRewards.length === 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-center py-8 text-muted-foreground"
                        }, [
                          createVNode(unref(Trophy), { class: "h-12 w-12 mx-auto mb-3 opacity-50" }),
                          createVNode("p", null, "Belum ada reward yang diklaim")
                        ])) : (openBlock(), createBlock(unref(_sfc_main$9), { key: 1 }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$a), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$b), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$c), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Reward")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$c), { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Syarat Omset Group (BV)")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$c), { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Nilai")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$c), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Tanggal Klaim")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$c), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Status")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$d), null, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.claimedRewards, (claimed) => {
                                  return openBlock(), createBlock(unref(_sfc_main$b), {
                                    key: claimed.id
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$e), { class: "font-medium" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(claimed.reward), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$e), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(formatNumber(claimed.bv)), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$e), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(formatCurrency(claimed.amount)), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$e), null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(formatDateTime(claimed.claimed_at)), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$e), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$8), {
                                            variant: "default",
                                            class: "bg-green-500"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(CheckCircle), { class: "h-3 w-3 mr-1" }),
                                              createTextVNode(" Diklaim ")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 128))
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Customers/PromotionsRewards.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
