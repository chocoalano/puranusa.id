import { defineComponent, ref, unref, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { Head, Link, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1, b as show } from "./AppLayout-DI-Jpkmn.js";
import { _ as _sfc_main$2 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$e } from "./index-BpQimeTM.js";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5, d as _sfc_main$6, c as _sfc_main$7 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$8, a as _sfc_main$9, b as _sfc_main$a, c as _sfc_main$b, d as _sfc_main$c, e as _sfc_main$d } from "./TableHeader-emcE6QAC.js";
import { Infinity, ArrowLeft, Gift, CheckCircle, Loader2, Trophy } from "lucide-vue-next";
import { toast } from "vue-sonner";
import "class-variance-authority";
import "./DropdownMenuTrigger-B1v6pHML.js";
import "reka-ui";
import "@vueuse/core";
import "./Input-BGi8wCMh.js";
import "./index--D7ld9AJ.js";
import "./AvatarImage-DWFQMckn.js";
import "./index-B0NlPG4h.js";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
import "clsx";
import "tailwind-merge";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LifetimeRewards",
  __ssrInlineRender: true,
  props: {
    customer: {},
    activeRewards: {},
    claimedRewards: {}
  },
  setup(__props) {
    const props = __props;
    const claimingRewardId = ref(null);
    const formatNumber = (value) => {
      return new Intl.NumberFormat("id-ID").format(value);
    };
    const formatCurrency = (value) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value);
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
    const handleClaimReward = (reward) => {
      if (claimingRewardId.value !== null) return;
      claimingRewardId.value = reward.id;
      router.post(`/manage/customers/${props.customer.id}/lifetime-rewards/${reward.id}/claim`, {}, {
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Berhasil", {
            description: `Reward "${reward.name}" berhasil diklaim!`
          });
        },
        onError: (errors) => {
          const errorMessage = Object.values(errors)[0];
          toast.error("Gagal", {
            description: errorMessage || "Terjadi kesalahan saat mengklaim reward."
          });
        },
        onFinish: () => {
          claimingRewardId.value = null;
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: `Lifetime Cash Rewards - ${__props.customer.name}`
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="rounded-xl p-4 space-y-6 py-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="text-3xl font-bold flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Infinity), { class: "h-8 w-8" }, null, _parent2, _scopeId));
            _push2(` Lifetime Cash Rewards </h1><p class="mt-2 text-muted-foreground"${_scopeId}> Reward lifetime untuk <strong${_scopeId}>${ssrInterpolate(__props.customer.name)}</strong> (${ssrInterpolate(__props.customer.ewallet_id)}) </p></div>`);
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
                        _push4(ssrRenderComponent(unref(_sfc_main$5), { class: "text-lg" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Omset Retail Member`);
                            } else {
                              return [
                                createTextVNode("Omset Retail Member")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Omset retail yang digunakan untuk syarat klaim lifetime reward `);
                            } else {
                              return [
                                createTextVNode(" Omset retail yang digunakan untuk syarat klaim lifetime reward ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), { class: "text-lg" }, {
                            default: withCtx(() => [
                              createTextVNode("Omset Retail Member")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode(" Omset retail yang digunakan untuk syarat klaim lifetime reward ")
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
                        _push4(`<div class="grid gap-4 md:grid-cols-2"${_scopeId3}><div class="p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800"${_scopeId3}><p class="text-sm text-blue-600 dark:text-blue-400 font-medium"${_scopeId3}>Omset Grup Kiri (Plan B)</p><p class="text-2xl font-bold text-blue-700 dark:text-blue-300"${_scopeId3}>${ssrInterpolate(formatNumber(__props.customer.omzet_left))} BV </p></div><div class="p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800"${_scopeId3}><p class="text-sm text-green-600 dark:text-green-400 font-medium"${_scopeId3}>Omset Grup Kanan (Plan B)</p><p class="text-2xl font-bold text-green-700 dark:text-green-300"${_scopeId3}>${ssrInterpolate(formatNumber(__props.customer.omzet_right))} BV </p></div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                            createVNode("div", { class: "p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800" }, [
                              createVNode("p", { class: "text-sm text-blue-600 dark:text-blue-400 font-medium" }, "Omset Grup Kiri (Plan B)"),
                              createVNode("p", { class: "text-2xl font-bold text-blue-700 dark:text-blue-300" }, toDisplayString(formatNumber(__props.customer.omzet_left)) + " BV ", 1)
                            ]),
                            createVNode("div", { class: "p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800" }, [
                              createVNode("p", { class: "text-sm text-green-600 dark:text-green-400 font-medium" }, "Omset Grup Kanan (Plan B)"),
                              createVNode("p", { class: "text-2xl font-bold text-green-700 dark:text-green-300" }, toDisplayString(formatNumber(__props.customer.omzet_right)) + " BV ", 1)
                            ])
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
                        createVNode(unref(_sfc_main$5), { class: "text-lg" }, {
                          default: withCtx(() => [
                            createTextVNode("Omset Retail Member")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode(" Omset retail yang digunakan untuk syarat klaim lifetime reward ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                          createVNode("div", { class: "p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800" }, [
                            createVNode("p", { class: "text-sm text-blue-600 dark:text-blue-400 font-medium" }, "Omset Grup Kiri (Plan B)"),
                            createVNode("p", { class: "text-2xl font-bold text-blue-700 dark:text-blue-300" }, toDisplayString(formatNumber(__props.customer.omzet_left)) + " BV ", 1)
                          ]),
                          createVNode("div", { class: "p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800" }, [
                            createVNode("p", { class: "text-sm text-green-600 dark:text-green-400 font-medium" }, "Omset Grup Kanan (Plan B)"),
                            createVNode("p", { class: "text-2xl font-bold text-green-700 dark:text-green-300" }, toDisplayString(formatNumber(__props.customer.omzet_right)) + " BV ", 1)
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
            _push2(ssrRenderComponent(unref(_sfc_main$3), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex items-center gap-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Gift), { class: "h-5 w-5 text-primary" }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Reward Lifetime Tersedia`);
                            } else {
                              return [
                                createTextVNode("Reward Lifetime Tersedia")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Daftar reward lifetime yang dapat diklaim jika omset memenuhi syarat `);
                            } else {
                              return [
                                createTextVNode(" Daftar reward lifetime yang dapat diklaim jika omset memenuhi syarat ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode(unref(Gift), { class: "h-5 w-5 text-primary" }),
                            createVNode(unref(_sfc_main$5), null, {
                              default: withCtx(() => [
                                createTextVNode("Reward Lifetime Tersedia")
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode(" Daftar reward lifetime yang dapat diklaim jika omset memenuhi syarat ")
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
                          _push4(`<p${_scopeId3}>Tidak ada reward lifetime aktif saat ini</p></div>`);
                        } else {
                          _push4(ssrRenderComponent(unref(_sfc_main$8), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(_sfc_main$9), null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(_sfc_main$a), null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(unref(_sfc_main$b), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`Nama`);
                                                } else {
                                                  return [
                                                    createTextVNode("Nama")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$b), null, {
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
                                            _push7(ssrRenderComponent(unref(_sfc_main$b), { class: "text-right" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`Syarat Omset Grup Kiri (BV)`);
                                                } else {
                                                  return [
                                                    createTextVNode("Syarat Omset Grup Kiri (BV)")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$b), { class: "text-right" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`Syarat Omset Grup Kanan (BV)`);
                                                } else {
                                                  return [
                                                    createTextVNode("Syarat Omset Grup Kanan (BV)")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$b), { class: "text-center" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`Klaim`);
                                                } else {
                                                  return [
                                                    createTextVNode("Klaim")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(unref(_sfc_main$b), null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Nama")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(unref(_sfc_main$b), null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Reward")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(unref(_sfc_main$b), { class: "text-right" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Syarat Omset Grup Kiri (BV)")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(unref(_sfc_main$b), { class: "text-right" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Syarat Omset Grup Kanan (BV)")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(unref(_sfc_main$b), { class: "text-center" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Klaim")
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
                                        createVNode(unref(_sfc_main$a), null, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$b), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Nama")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$b), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Reward")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$b), { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Syarat Omset Grup Kiri (BV)")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$b), { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Syarat Omset Grup Kanan (BV)")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$b), { class: "text-center" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Klaim")
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
                                _push5(ssrRenderComponent(unref(_sfc_main$c), null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<!--[-->`);
                                      ssrRenderList(__props.activeRewards, (reward) => {
                                        _push6(ssrRenderComponent(unref(_sfc_main$a), {
                                          key: reward.id
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(unref(_sfc_main$d), { class: "font-medium" }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`${ssrInterpolate(reward.name)}`);
                                                  } else {
                                                    return [
                                                      createTextVNode(toDisplayString(reward.name), 1)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                              _push7(ssrRenderComponent(unref(_sfc_main$d), null, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`${ssrInterpolate(reward.reward ? formatCurrency(reward.value) : "-")}`);
                                                  } else {
                                                    return [
                                                      createTextVNode(toDisplayString(reward.reward ? formatCurrency(reward.value) : "-"), 1)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                              _push7(ssrRenderComponent(unref(_sfc_main$d), { class: "text-right" }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`<span class="${ssrRenderClass(__props.customer.omzet_left >= reward.bv_required ? "text-green-600 font-semibold" : "")}"${_scopeId7}>${ssrInterpolate(formatNumber(reward.bv_required))}</span>`);
                                                  } else {
                                                    return [
                                                      createVNode("span", {
                                                        class: __props.customer.omzet_left >= reward.bv_required ? "text-green-600 font-semibold" : ""
                                                      }, toDisplayString(formatNumber(reward.bv_required)), 3)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                              _push7(ssrRenderComponent(unref(_sfc_main$d), { class: "text-right" }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`<span class="${ssrRenderClass(__props.customer.omzet_right >= reward.bv_required ? "text-green-600 font-semibold" : "")}"${_scopeId7}>${ssrInterpolate(formatNumber(reward.bv_required))}</span>`);
                                                  } else {
                                                    return [
                                                      createVNode("span", {
                                                        class: __props.customer.omzet_right >= reward.bv_required ? "text-green-600 font-semibold" : ""
                                                      }, toDisplayString(formatNumber(reward.bv_required)), 3)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                              _push7(ssrRenderComponent(unref(_sfc_main$d), { class: "text-center" }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    if (reward.already_claimed) {
                                                      _push8(ssrRenderComponent(unref(_sfc_main$e), {
                                                        variant: "secondary",
                                                        class: "bg-gray-100 text-gray-600"
                                                      }, {
                                                        default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                          if (_push9) {
                                                            _push9(ssrRenderComponent(unref(CheckCircle), { class: "h-3 w-3 mr-1" }, null, _parent9, _scopeId8));
                                                            _push9(` Sudah Diklaim `);
                                                          } else {
                                                            return [
                                                              createVNode(unref(CheckCircle), { class: "h-3 w-3 mr-1" }),
                                                              createTextVNode(" Sudah Diklaim ")
                                                            ];
                                                          }
                                                        }),
                                                        _: 2
                                                      }, _parent8, _scopeId7));
                                                    } else if (reward.can_claim) {
                                                      _push8(ssrRenderComponent(unref(_sfc_main$2), {
                                                        size: "sm",
                                                        onClick: ($event) => handleClaimReward(reward),
                                                        disabled: claimingRewardId.value !== null
                                                      }, {
                                                        default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                          if (_push9) {
                                                            if (claimingRewardId.value === reward.id) {
                                                              _push9(ssrRenderComponent(unref(Loader2), { class: "h-4 w-4 mr-1 animate-spin" }, null, _parent9, _scopeId8));
                                                            } else {
                                                              _push9(ssrRenderComponent(unref(Gift), { class: "h-4 w-4 mr-1" }, null, _parent9, _scopeId8));
                                                            }
                                                            _push9(` ${ssrInterpolate(claimingRewardId.value === reward.id ? "Mengklaim..." : "Klaim")}`);
                                                          } else {
                                                            return [
                                                              claimingRewardId.value === reward.id ? (openBlock(), createBlock(unref(Loader2), {
                                                                key: 0,
                                                                class: "h-4 w-4 mr-1 animate-spin"
                                                              })) : (openBlock(), createBlock(unref(Gift), {
                                                                key: 1,
                                                                class: "h-4 w-4 mr-1"
                                                              })),
                                                              createTextVNode(" " + toDisplayString(claimingRewardId.value === reward.id ? "Mengklaim..." : "Klaim"), 1)
                                                            ];
                                                          }
                                                        }),
                                                        _: 2
                                                      }, _parent8, _scopeId7));
                                                    } else {
                                                      _push8(ssrRenderComponent(unref(_sfc_main$e), {
                                                        variant: "outline",
                                                        class: "text-muted-foreground"
                                                      }, {
                                                        default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                          if (_push9) {
                                                            _push9(` Belum Memenuhi Syarat `);
                                                          } else {
                                                            return [
                                                              createTextVNode(" Belum Memenuhi Syarat ")
                                                            ];
                                                          }
                                                        }),
                                                        _: 2
                                                      }, _parent8, _scopeId7));
                                                    }
                                                  } else {
                                                    return [
                                                      reward.already_claimed ? (openBlock(), createBlock(unref(_sfc_main$e), {
                                                        key: 0,
                                                        variant: "secondary",
                                                        class: "bg-gray-100 text-gray-600"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode(unref(CheckCircle), { class: "h-3 w-3 mr-1" }),
                                                          createTextVNode(" Sudah Diklaim ")
                                                        ]),
                                                        _: 1
                                                      })) : reward.can_claim ? (openBlock(), createBlock(unref(_sfc_main$2), {
                                                        key: 1,
                                                        size: "sm",
                                                        onClick: ($event) => handleClaimReward(reward),
                                                        disabled: claimingRewardId.value !== null
                                                      }, {
                                                        default: withCtx(() => [
                                                          claimingRewardId.value === reward.id ? (openBlock(), createBlock(unref(Loader2), {
                                                            key: 0,
                                                            class: "h-4 w-4 mr-1 animate-spin"
                                                          })) : (openBlock(), createBlock(unref(Gift), {
                                                            key: 1,
                                                            class: "h-4 w-4 mr-1"
                                                          })),
                                                          createTextVNode(" " + toDisplayString(claimingRewardId.value === reward.id ? "Mengklaim..." : "Klaim"), 1)
                                                        ]),
                                                        _: 2
                                                      }, 1032, ["onClick", "disabled"])) : (openBlock(), createBlock(unref(_sfc_main$e), {
                                                        key: 2,
                                                        variant: "outline",
                                                        class: "text-muted-foreground"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(" Belum Memenuhi Syarat ")
                                                        ]),
                                                        _: 1
                                                      }))
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(unref(_sfc_main$d), { class: "font-medium" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(reward.name), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(unref(_sfc_main$d), null, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(reward.reward ? formatCurrency(reward.value) : "-"), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(unref(_sfc_main$d), { class: "text-right" }, {
                                                  default: withCtx(() => [
                                                    createVNode("span", {
                                                      class: __props.customer.omzet_left >= reward.bv_required ? "text-green-600 font-semibold" : ""
                                                    }, toDisplayString(formatNumber(reward.bv_required)), 3)
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(unref(_sfc_main$d), { class: "text-right" }, {
                                                  default: withCtx(() => [
                                                    createVNode("span", {
                                                      class: __props.customer.omzet_right >= reward.bv_required ? "text-green-600 font-semibold" : ""
                                                    }, toDisplayString(formatNumber(reward.bv_required)), 3)
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(unref(_sfc_main$d), { class: "text-center" }, {
                                                  default: withCtx(() => [
                                                    reward.already_claimed ? (openBlock(), createBlock(unref(_sfc_main$e), {
                                                      key: 0,
                                                      variant: "secondary",
                                                      class: "bg-gray-100 text-gray-600"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(unref(CheckCircle), { class: "h-3 w-3 mr-1" }),
                                                        createTextVNode(" Sudah Diklaim ")
                                                      ]),
                                                      _: 1
                                                    })) : reward.can_claim ? (openBlock(), createBlock(unref(_sfc_main$2), {
                                                      key: 1,
                                                      size: "sm",
                                                      onClick: ($event) => handleClaimReward(reward),
                                                      disabled: claimingRewardId.value !== null
                                                    }, {
                                                      default: withCtx(() => [
                                                        claimingRewardId.value === reward.id ? (openBlock(), createBlock(unref(Loader2), {
                                                          key: 0,
                                                          class: "h-4 w-4 mr-1 animate-spin"
                                                        })) : (openBlock(), createBlock(unref(Gift), {
                                                          key: 1,
                                                          class: "h-4 w-4 mr-1"
                                                        })),
                                                        createTextVNode(" " + toDisplayString(claimingRewardId.value === reward.id ? "Mengklaim..." : "Klaim"), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["onClick", "disabled"])) : (openBlock(), createBlock(unref(_sfc_main$e), {
                                                      key: 2,
                                                      variant: "outline",
                                                      class: "text-muted-foreground"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(" Belum Memenuhi Syarat ")
                                                      ]),
                                                      _: 1
                                                    }))
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      });
                                      _push6(`<!--]-->`);
                                    } else {
                                      return [
                                        (openBlock(true), createBlock(Fragment, null, renderList(__props.activeRewards, (reward) => {
                                          return openBlock(), createBlock(unref(_sfc_main$a), {
                                            key: reward.id
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$d), { class: "font-medium" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(reward.name), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$d), null, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(reward.reward ? formatCurrency(reward.value) : "-"), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$d), { class: "text-right" }, {
                                                default: withCtx(() => [
                                                  createVNode("span", {
                                                    class: __props.customer.omzet_left >= reward.bv_required ? "text-green-600 font-semibold" : ""
                                                  }, toDisplayString(formatNumber(reward.bv_required)), 3)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$d), { class: "text-right" }, {
                                                default: withCtx(() => [
                                                  createVNode("span", {
                                                    class: __props.customer.omzet_right >= reward.bv_required ? "text-green-600 font-semibold" : ""
                                                  }, toDisplayString(formatNumber(reward.bv_required)), 3)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$d), { class: "text-center" }, {
                                                default: withCtx(() => [
                                                  reward.already_claimed ? (openBlock(), createBlock(unref(_sfc_main$e), {
                                                    key: 0,
                                                    variant: "secondary",
                                                    class: "bg-gray-100 text-gray-600"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(CheckCircle), { class: "h-3 w-3 mr-1" }),
                                                      createTextVNode(" Sudah Diklaim ")
                                                    ]),
                                                    _: 1
                                                  })) : reward.can_claim ? (openBlock(), createBlock(unref(_sfc_main$2), {
                                                    key: 1,
                                                    size: "sm",
                                                    onClick: ($event) => handleClaimReward(reward),
                                                    disabled: claimingRewardId.value !== null
                                                  }, {
                                                    default: withCtx(() => [
                                                      claimingRewardId.value === reward.id ? (openBlock(), createBlock(unref(Loader2), {
                                                        key: 0,
                                                        class: "h-4 w-4 mr-1 animate-spin"
                                                      })) : (openBlock(), createBlock(unref(Gift), {
                                                        key: 1,
                                                        class: "h-4 w-4 mr-1"
                                                      })),
                                                      createTextVNode(" " + toDisplayString(claimingRewardId.value === reward.id ? "Mengklaim..." : "Klaim"), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["onClick", "disabled"])) : (openBlock(), createBlock(unref(_sfc_main$e), {
                                                    key: 2,
                                                    variant: "outline",
                                                    class: "text-muted-foreground"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(" Belum Memenuhi Syarat ")
                                                    ]),
                                                    _: 1
                                                  }))
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
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(_sfc_main$9), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$a), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$b), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Nama")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$b), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Reward")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$b), { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Syarat Omset Grup Kiri (BV)")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$b), { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Syarat Omset Grup Kanan (BV)")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$b), { class: "text-center" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Klaim")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$c), null, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.activeRewards, (reward) => {
                                        return openBlock(), createBlock(unref(_sfc_main$a), {
                                          key: reward.id
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$d), { class: "font-medium" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(reward.name), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$d), null, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(reward.reward ? formatCurrency(reward.value) : "-"), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$d), { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createVNode("span", {
                                                  class: __props.customer.omzet_left >= reward.bv_required ? "text-green-600 font-semibold" : ""
                                                }, toDisplayString(formatNumber(reward.bv_required)), 3)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$d), { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createVNode("span", {
                                                  class: __props.customer.omzet_right >= reward.bv_required ? "text-green-600 font-semibold" : ""
                                                }, toDisplayString(formatNumber(reward.bv_required)), 3)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$d), { class: "text-center" }, {
                                              default: withCtx(() => [
                                                reward.already_claimed ? (openBlock(), createBlock(unref(_sfc_main$e), {
                                                  key: 0,
                                                  variant: "secondary",
                                                  class: "bg-gray-100 text-gray-600"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(CheckCircle), { class: "h-3 w-3 mr-1" }),
                                                    createTextVNode(" Sudah Diklaim ")
                                                  ]),
                                                  _: 1
                                                })) : reward.can_claim ? (openBlock(), createBlock(unref(_sfc_main$2), {
                                                  key: 1,
                                                  size: "sm",
                                                  onClick: ($event) => handleClaimReward(reward),
                                                  disabled: claimingRewardId.value !== null
                                                }, {
                                                  default: withCtx(() => [
                                                    claimingRewardId.value === reward.id ? (openBlock(), createBlock(unref(Loader2), {
                                                      key: 0,
                                                      class: "h-4 w-4 mr-1 animate-spin"
                                                    })) : (openBlock(), createBlock(unref(Gift), {
                                                      key: 1,
                                                      class: "h-4 w-4 mr-1"
                                                    })),
                                                    createTextVNode(" " + toDisplayString(claimingRewardId.value === reward.id ? "Mengklaim..." : "Klaim"), 1)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["onClick", "disabled"])) : (openBlock(), createBlock(unref(_sfc_main$e), {
                                                  key: 2,
                                                  variant: "outline",
                                                  class: "text-muted-foreground"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(" Belum Memenuhi Syarat ")
                                                  ]),
                                                  _: 1
                                                }))
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
                          }, _parent4, _scopeId3));
                        }
                      } else {
                        return [
                          __props.activeRewards.length === 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-center py-8 text-muted-foreground"
                          }, [
                            createVNode(unref(Gift), { class: "h-12 w-12 mx-auto mb-3 opacity-50" }),
                            createVNode("p", null, "Tidak ada reward lifetime aktif saat ini")
                          ])) : (openBlock(), createBlock(unref(_sfc_main$8), { key: 1 }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$9), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$a), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$b), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Nama")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$b), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Reward")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$b), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Syarat Omset Grup Kiri (BV)")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$b), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Syarat Omset Grup Kanan (BV)")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$b), { class: "text-center" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Klaim")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.activeRewards, (reward) => {
                                    return openBlock(), createBlock(unref(_sfc_main$a), {
                                      key: reward.id
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$d), { class: "font-medium" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(reward.name), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$d), null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(reward.reward ? formatCurrency(reward.value) : "-"), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$d), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createVNode("span", {
                                              class: __props.customer.omzet_left >= reward.bv_required ? "text-green-600 font-semibold" : ""
                                            }, toDisplayString(formatNumber(reward.bv_required)), 3)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$d), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createVNode("span", {
                                              class: __props.customer.omzet_right >= reward.bv_required ? "text-green-600 font-semibold" : ""
                                            }, toDisplayString(formatNumber(reward.bv_required)), 3)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$d), { class: "text-center" }, {
                                          default: withCtx(() => [
                                            reward.already_claimed ? (openBlock(), createBlock(unref(_sfc_main$e), {
                                              key: 0,
                                              variant: "secondary",
                                              class: "bg-gray-100 text-gray-600"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(CheckCircle), { class: "h-3 w-3 mr-1" }),
                                                createTextVNode(" Sudah Diklaim ")
                                              ]),
                                              _: 1
                                            })) : reward.can_claim ? (openBlock(), createBlock(unref(_sfc_main$2), {
                                              key: 1,
                                              size: "sm",
                                              onClick: ($event) => handleClaimReward(reward),
                                              disabled: claimingRewardId.value !== null
                                            }, {
                                              default: withCtx(() => [
                                                claimingRewardId.value === reward.id ? (openBlock(), createBlock(unref(Loader2), {
                                                  key: 0,
                                                  class: "h-4 w-4 mr-1 animate-spin"
                                                })) : (openBlock(), createBlock(unref(Gift), {
                                                  key: 1,
                                                  class: "h-4 w-4 mr-1"
                                                })),
                                                createTextVNode(" " + toDisplayString(claimingRewardId.value === reward.id ? "Mengklaim..." : "Klaim"), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["onClick", "disabled"])) : (openBlock(), createBlock(unref(_sfc_main$e), {
                                              key: 2,
                                              variant: "outline",
                                              class: "text-muted-foreground"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(" Belum Memenuhi Syarat ")
                                              ]),
                                              _: 1
                                            }))
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
                          createVNode(unref(Gift), { class: "h-5 w-5 text-primary" }),
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Reward Lifetime Tersedia")
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode(" Daftar reward lifetime yang dapat diklaim jika omset memenuhi syarat ")
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
                          createVNode("p", null, "Tidak ada reward lifetime aktif saat ini")
                        ])) : (openBlock(), createBlock(unref(_sfc_main$8), { key: 1 }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$9), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$a), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$b), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Nama")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$b), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Reward")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$b), { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Syarat Omset Grup Kiri (BV)")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$b), { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Syarat Omset Grup Kanan (BV)")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$b), { class: "text-center" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Klaim")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), null, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.activeRewards, (reward) => {
                                  return openBlock(), createBlock(unref(_sfc_main$a), {
                                    key: reward.id
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$d), { class: "font-medium" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(reward.name), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$d), null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(reward.reward ? formatCurrency(reward.value) : "-"), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$d), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createVNode("span", {
                                            class: __props.customer.omzet_left >= reward.bv_required ? "text-green-600 font-semibold" : ""
                                          }, toDisplayString(formatNumber(reward.bv_required)), 3)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$d), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createVNode("span", {
                                            class: __props.customer.omzet_right >= reward.bv_required ? "text-green-600 font-semibold" : ""
                                          }, toDisplayString(formatNumber(reward.bv_required)), 3)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$d), { class: "text-center" }, {
                                        default: withCtx(() => [
                                          reward.already_claimed ? (openBlock(), createBlock(unref(_sfc_main$e), {
                                            key: 0,
                                            variant: "secondary",
                                            class: "bg-gray-100 text-gray-600"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(CheckCircle), { class: "h-3 w-3 mr-1" }),
                                              createTextVNode(" Sudah Diklaim ")
                                            ]),
                                            _: 1
                                          })) : reward.can_claim ? (openBlock(), createBlock(unref(_sfc_main$2), {
                                            key: 1,
                                            size: "sm",
                                            onClick: ($event) => handleClaimReward(reward),
                                            disabled: claimingRewardId.value !== null
                                          }, {
                                            default: withCtx(() => [
                                              claimingRewardId.value === reward.id ? (openBlock(), createBlock(unref(Loader2), {
                                                key: 0,
                                                class: "h-4 w-4 mr-1 animate-spin"
                                              })) : (openBlock(), createBlock(unref(Gift), {
                                                key: 1,
                                                class: "h-4 w-4 mr-1"
                                              })),
                                              createTextVNode(" " + toDisplayString(claimingRewardId.value === reward.id ? "Mengklaim..." : "Klaim"), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["onClick", "disabled"])) : (openBlock(), createBlock(unref(_sfc_main$e), {
                                            key: 2,
                                            variant: "outline",
                                            class: "text-muted-foreground"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(" Belum Memenuhi Syarat ")
                                            ]),
                                            _: 1
                                          }))
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
                              _push5(` Riwayat reward lifetime yang telah berhasil diklaim oleh member ini `);
                            } else {
                              return [
                                createTextVNode(" Riwayat reward lifetime yang telah berhasil diklaim oleh member ini ")
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
                              createTextVNode(" Riwayat reward lifetime yang telah berhasil diklaim oleh member ini ")
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
                          _push4(ssrRenderComponent(unref(_sfc_main$8), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(_sfc_main$9), null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(_sfc_main$a), null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(unref(_sfc_main$b), null, {
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
                                            _push7(ssrRenderComponent(unref(_sfc_main$b), { class: "text-right" }, {
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
                                            _push7(ssrRenderComponent(unref(_sfc_main$b), null, {
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
                                          } else {
                                            return [
                                              createVNode(unref(_sfc_main$b), null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Reward")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(unref(_sfc_main$b), { class: "text-right" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Syarat Omset Group (BV)")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(unref(_sfc_main$b), null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Tanggal Klaim")
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
                                        createVNode(unref(_sfc_main$a), null, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$b), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Reward")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$b), { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Syarat Omset Group (BV)")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$b), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Tanggal Klaim")
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
                                _push5(ssrRenderComponent(unref(_sfc_main$c), null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<!--[-->`);
                                      ssrRenderList(__props.claimedRewards, (claimed) => {
                                        _push6(ssrRenderComponent(unref(_sfc_main$a), {
                                          key: claimed.id
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(unref(_sfc_main$d), { class: "font-medium" }, {
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
                                              _push7(ssrRenderComponent(unref(_sfc_main$d), { class: "text-right" }, {
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
                                              _push7(ssrRenderComponent(unref(_sfc_main$d), null, {
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
                                            } else {
                                              return [
                                                createVNode(unref(_sfc_main$d), { class: "font-medium" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(claimed.reward), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(unref(_sfc_main$d), { class: "text-right" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(formatNumber(claimed.bv)), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(unref(_sfc_main$d), null, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(formatDateTime(claimed.claimed_at)), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024)
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
                                          return openBlock(), createBlock(unref(_sfc_main$a), {
                                            key: claimed.id
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$d), { class: "font-medium" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(claimed.reward), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$d), { class: "text-right" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(formatNumber(claimed.bv)), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$d), null, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(formatDateTime(claimed.claimed_at)), 1)
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
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(_sfc_main$9), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$a), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$b), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Reward")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$b), { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Syarat Omset Group (BV)")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$b), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Tanggal Klaim")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$c), null, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.claimedRewards, (claimed) => {
                                        return openBlock(), createBlock(unref(_sfc_main$a), {
                                          key: claimed.id
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$d), { class: "font-medium" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(claimed.reward), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$d), { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(formatNumber(claimed.bv)), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$d), null, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(formatDateTime(claimed.claimed_at)), 1)
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
                          ])) : (openBlock(), createBlock(unref(_sfc_main$8), { key: 1 }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$9), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$a), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$b), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Reward")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$b), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Syarat Omset Group (BV)")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$b), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Tanggal Klaim")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.claimedRewards, (claimed) => {
                                    return openBlock(), createBlock(unref(_sfc_main$a), {
                                      key: claimed.id
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$d), { class: "font-medium" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(claimed.reward), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$d), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(formatNumber(claimed.bv)), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$d), null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(formatDateTime(claimed.claimed_at)), 1)
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
                            createTextVNode(" Riwayat reward lifetime yang telah berhasil diklaim oleh member ini ")
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
                        ])) : (openBlock(), createBlock(unref(_sfc_main$8), { key: 1 }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$9), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$a), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$b), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Reward")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$b), { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Syarat Omset Group (BV)")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$b), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Tanggal Klaim")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), null, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.claimedRewards, (claimed) => {
                                  return openBlock(), createBlock(unref(_sfc_main$a), {
                                    key: claimed.id
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$d), { class: "font-medium" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(claimed.reward), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$d), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(formatNumber(claimed.bv)), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$d), null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(formatDateTime(claimed.claimed_at)), 1)
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
                      createVNode(unref(Infinity), { class: "h-8 w-8" }),
                      createTextVNode(" Lifetime Cash Rewards ")
                    ]),
                    createVNode("p", { class: "mt-2 text-muted-foreground" }, [
                      createTextVNode(" Reward lifetime untuk "),
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
                        createVNode(unref(_sfc_main$5), { class: "text-lg" }, {
                          default: withCtx(() => [
                            createTextVNode("Omset Retail Member")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode(" Omset retail yang digunakan untuk syarat klaim lifetime reward ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                          createVNode("div", { class: "p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800" }, [
                            createVNode("p", { class: "text-sm text-blue-600 dark:text-blue-400 font-medium" }, "Omset Grup Kiri (Plan B)"),
                            createVNode("p", { class: "text-2xl font-bold text-blue-700 dark:text-blue-300" }, toDisplayString(formatNumber(__props.customer.omzet_left)) + " BV ", 1)
                          ]),
                          createVNode("div", { class: "p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800" }, [
                            createVNode("p", { class: "text-sm text-green-600 dark:text-green-400 font-medium" }, "Omset Grup Kanan (Plan B)"),
                            createVNode("p", { class: "text-2xl font-bold text-green-700 dark:text-green-300" }, toDisplayString(formatNumber(__props.customer.omzet_right)) + " BV ", 1)
                          ])
                        ])
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
                          createVNode(unref(Gift), { class: "h-5 w-5 text-primary" }),
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Reward Lifetime Tersedia")
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode(" Daftar reward lifetime yang dapat diklaim jika omset memenuhi syarat ")
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
                          createVNode("p", null, "Tidak ada reward lifetime aktif saat ini")
                        ])) : (openBlock(), createBlock(unref(_sfc_main$8), { key: 1 }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$9), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$a), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$b), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Nama")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$b), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Reward")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$b), { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Syarat Omset Grup Kiri (BV)")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$b), { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Syarat Omset Grup Kanan (BV)")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$b), { class: "text-center" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Klaim")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), null, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.activeRewards, (reward) => {
                                  return openBlock(), createBlock(unref(_sfc_main$a), {
                                    key: reward.id
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$d), { class: "font-medium" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(reward.name), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$d), null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(reward.reward ? formatCurrency(reward.value) : "-"), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$d), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createVNode("span", {
                                            class: __props.customer.omzet_left >= reward.bv_required ? "text-green-600 font-semibold" : ""
                                          }, toDisplayString(formatNumber(reward.bv_required)), 3)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$d), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createVNode("span", {
                                            class: __props.customer.omzet_right >= reward.bv_required ? "text-green-600 font-semibold" : ""
                                          }, toDisplayString(formatNumber(reward.bv_required)), 3)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$d), { class: "text-center" }, {
                                        default: withCtx(() => [
                                          reward.already_claimed ? (openBlock(), createBlock(unref(_sfc_main$e), {
                                            key: 0,
                                            variant: "secondary",
                                            class: "bg-gray-100 text-gray-600"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(CheckCircle), { class: "h-3 w-3 mr-1" }),
                                              createTextVNode(" Sudah Diklaim ")
                                            ]),
                                            _: 1
                                          })) : reward.can_claim ? (openBlock(), createBlock(unref(_sfc_main$2), {
                                            key: 1,
                                            size: "sm",
                                            onClick: ($event) => handleClaimReward(reward),
                                            disabled: claimingRewardId.value !== null
                                          }, {
                                            default: withCtx(() => [
                                              claimingRewardId.value === reward.id ? (openBlock(), createBlock(unref(Loader2), {
                                                key: 0,
                                                class: "h-4 w-4 mr-1 animate-spin"
                                              })) : (openBlock(), createBlock(unref(Gift), {
                                                key: 1,
                                                class: "h-4 w-4 mr-1"
                                              })),
                                              createTextVNode(" " + toDisplayString(claimingRewardId.value === reward.id ? "Mengklaim..." : "Klaim"), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["onClick", "disabled"])) : (openBlock(), createBlock(unref(_sfc_main$e), {
                                            key: 2,
                                            variant: "outline",
                                            class: "text-muted-foreground"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(" Belum Memenuhi Syarat ")
                                            ]),
                                            _: 1
                                          }))
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
                          ]),
                          _: 1
                        }))
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
                            createTextVNode(" Riwayat reward lifetime yang telah berhasil diklaim oleh member ini ")
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
                        ])) : (openBlock(), createBlock(unref(_sfc_main$8), { key: 1 }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$9), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$a), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$b), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Reward")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$b), { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Syarat Omset Group (BV)")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$b), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Tanggal Klaim")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), null, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.claimedRewards, (claimed) => {
                                  return openBlock(), createBlock(unref(_sfc_main$a), {
                                    key: claimed.id
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$d), { class: "font-medium" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(claimed.reward), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$d), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(formatNumber(claimed.bv)), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$d), null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(formatDateTime(claimed.claimed_at)), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Customers/LifetimeRewards.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
