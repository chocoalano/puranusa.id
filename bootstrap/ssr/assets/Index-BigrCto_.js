import { defineComponent, ref, computed, unref, withCtx, createTextVNode, toDisplayString, createVNode, createBlock, openBlock, useSSRContext, watch, resolveDynamicComponent, Fragment, renderList, createCommentVNode, withModifiers, watchEffect, onUnmounted, mergeProps, onMounted } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderVNode, ssrRenderAttr, ssrRenderAttrs, ssrIncludeBooleanAttr, ssrRenderStyle } from "vue/server-renderer";
import { _ as _sfc_main$Y, a as _sfc_main$Z, b as _sfc_main$_, c as _sfc_main$$ } from "./TabsTrigger-Bvg0QZyC.js";
import { b as _sfc_main$T, c as _sfc_main$U, _ as _sfc_main$10 } from "./Ecommerce-CcXwhgpk.js";
import { router, useForm, usePage, Link, Head } from "@inertiajs/vue3";
import { CheckCircle, AlertCircle, Check, Copy, Share2, MapPin, Plus, Pencil, Trash2, Home, Building2, Trophy, Calendar, UserCircle, User, CreditCard, Mail, Phone, Loader2, Package, Truck, Wallet, CheckCircle2, Star, RefreshCw, PackageCheck, ArrowDownLeft, ArrowUpRight, Lock, Eye, EyeOff, ShieldCheck, Clock, UserPlus, GitBranch, Users, TrendingUp, ZoomOut, ZoomIn, RotateCcw, Handshake, DollarSign, Percent, ShoppingCart, Gift, Network } from "lucide-vue-next";
import { _ as _sfc_main$q, a as _sfc_main$r, b as _sfc_main$s } from "./AvatarImage-DWFQMckn.js";
import { _ as _sfc_main$t } from "./index-BpQimeTM.js";
import { _ as _sfc_main$o, c as _sfc_main$p, a as _sfc_main$v, b as _sfc_main$w, d as _sfc_main$N } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$u } from "./index-SN_CnQ_F.js";
import { toast } from "vue-sonner";
import axios from "axios";
import { _ as _sfc_main$y, a as _sfc_main$z, b as _sfc_main$A, c as _sfc_main$B, d as _sfc_main$C, e as _sfc_main$M } from "./DialogTrigger-DpE8BjOt.js";
import { _ as _sfc_main$E } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$D } from "./Label-16aMY2sx.js";
import { _ as _sfc_main$G } from "./Textarea-pcFPh_uS.js";
import { _ as _sfc_main$F } from "./Switch-DQcz5w_A.js";
import { e as _sfc_main$x, h as _sfc_main$O, i as _sfc_main$P, j as _sfc_main$Q, k as _sfc_main$R, l as _sfc_main$S } from "./DropdownMenuTrigger-B1v6pHML.js";
import { _ as _sfc_main$H, a as _sfc_main$I, b as _sfc_main$J, c as _sfc_main$K, d as _sfc_main$L } from "./SelectValue-BUnv4mQg.js";
import { _ as _sfc_main$V, a as _sfc_main$W, b as _sfc_main$X } from "./index-D3PKcwoM.js";
import * as go from "gojs";
import "reka-ui";
import "@vueuse/core";
import "./Checkbox-CIOQa2-J.js";
import "./useAppearance-gspEihnp.js";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
function useFormatter() {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(amount);
  };
  const formatDate = (date) => {
    return new Intl.DateTimeFormat("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(new Date(date));
  };
  const getStatusLabel = (status) => {
    const labels = {
      pending: "Menunggu",
      processing: "Diproses",
      shipped: "Dikirim",
      delivered: "Selesai",
      cancelled: "Dibatalkan"
    };
    return labels[status] || status;
  };
  const getTransactionTypeLabel = (type) => {
    const labels = {
      topup: "Top Up",
      withdrawal: "Penarikan",
      bonus: "Bonus",
      purchase: "Pembelian",
      refund: "Refund"
    };
    return labels[type] || type;
  };
  const getTransactionStatusLabel = (status) => {
    const labels = {
      pending: "Menunggu",
      completed: "Selesai",
      failed: "Gagal",
      cancelled: "Dibatalkan"
    };
    return labels[status] || status;
  };
  return {
    formatCurrency,
    formatDate,
    getStatusLabel,
    getTransactionTypeLabel,
    getTransactionStatusLabel
  };
}
const _sfc_main$n = /* @__PURE__ */ defineComponent({
  __name: "ProfileCard",
  __ssrInlineRender: true,
  props: {
    customer: {}
  },
  setup(__props) {
    const props = __props;
    const { formatCurrency } = useFormatter();
    const copied = ref(false);
    const initials = computed(() => {
      return props.customer.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
    });
    const referralLink = computed(() => {
      if (typeof window === "undefined") {
        return "";
      }
      const baseUrl = window.location.origin;
      return `${baseUrl}/client/register?ref=${props.customer.ref_code}`;
    });
    const copyReferralLink = async () => {
      if (typeof window === "undefined" || !navigator.clipboard) {
        toast.error("Tidak dapat menyalin link ke clipboard");
        return;
      }
      try {
        await navigator.clipboard.writeText(referralLink.value);
        copied.value = true;
        toast.success("Link referral telah disalin ke clipboard");
        setTimeout(() => {
          copied.value = false;
        }, 2e3);
      } catch {
        toast.error("Tidak dapat menyalin link ke clipboard");
      }
    };
    const shareReferralLink = async () => {
      if (typeof window === "undefined") return;
      const shareData = {
        title: "Bergabung dengan Referral Saya",
        text: `Gunakan kode referral saya: ${props.customer.ref_code}`,
        url: referralLink.value
      };
      if (navigator.share) {
        try {
          await navigator.share(shareData);
          toast.success("Link referral berhasil dibagikan");
        } catch (err) {
          if (err.name !== "AbortError") {
            console.error("Error sharing:", err);
          }
        }
      } else {
        await copyReferralLink();
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$o), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$p), { class: "pt-6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex flex-col items-center text-center"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$q), { class: "h-24 w-24 mb-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$r), {
                          src: `https://api.dicebear.com/7.x/initials/svg?seed=${__props.customer.name}`
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$s), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(initials.value)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(initials.value), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$r), {
                            src: `https://api.dicebear.com/7.x/initials/svg?seed=${__props.customer.name}`
                          }, null, 8, ["src"]),
                          createVNode(unref(_sfc_main$s), null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(initials.value), 1)
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<h2 class="text-xl font-bold text-gray-900 dark:text-gray-100"${_scopeId2}>${ssrInterpolate(__props.customer.name)}</h2><p class="text-sm text-gray-500 dark:text-gray-400 mt-1"${_scopeId2}>${ssrInterpolate(__props.customer.email)}</p>`);
                  if (__props.customer.email_verified_at) {
                    _push3(ssrRenderComponent(unref(_sfc_main$t), { class: "mt-3 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900 dark:text-emerald-100" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(CheckCircle), { class: "w-3 h-3 mr-1" }, null, _parent4, _scopeId3));
                          _push4(` Email Terverifikasi `);
                        } else {
                          return [
                            createVNode(unref(CheckCircle), { class: "w-3 h-3 mr-1" }),
                            createTextVNode(" Email Terverifikasi ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(ssrRenderComponent(unref(_sfc_main$t), {
                      variant: "secondary",
                      class: "mt-3"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(AlertCircle), { class: "w-3 h-3 mr-1" }, null, _parent4, _scopeId3));
                          _push4(` Email Belum Terverifikasi `);
                        } else {
                          return [
                            createVNode(unref(AlertCircle), { class: "w-3 h-3 mr-1" }),
                            createTextVNode(" Email Belum Terverifikasi ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  }
                  _push3(`<div class="mt-4 w-full space-y-2 text-sm"${_scopeId2}><div class="space-y-1.5"${_scopeId2}><div class="flex items-center justify-between"${_scopeId2}><span class="text-xs text-gray-600 dark:text-gray-400"${_scopeId2}>Referral Link</span><div class="flex gap-1"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$u), {
                    size: "sm",
                    variant: "outline",
                    class: "h-6 px-2 text-[10px]",
                    onClick: copyReferralLink
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (copied.value) {
                          _push4(ssrRenderComponent(unref(Check), { class: "w-3 h-3 mr-1" }, null, _parent4, _scopeId3));
                        } else {
                          _push4(ssrRenderComponent(unref(Copy), { class: "w-3 h-3 mr-1" }, null, _parent4, _scopeId3));
                        }
                        _push4(` ${ssrInterpolate(copied.value ? "Tersalin" : "Salin")}`);
                      } else {
                        return [
                          copied.value ? (openBlock(), createBlock(unref(Check), {
                            key: 0,
                            class: "w-3 h-3 mr-1"
                          })) : (openBlock(), createBlock(unref(Copy), {
                            key: 1,
                            class: "w-3 h-3 mr-1"
                          })),
                          createTextVNode(" " + toDisplayString(copied.value ? "Tersalin" : "Salin"), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$u), {
                    size: "sm",
                    variant: "outline",
                    class: "h-6 px-2 text-[10px]",
                    onClick: shareReferralLink
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Share2), { class: "w-3 h-3 mr-1" }, null, _parent4, _scopeId3));
                        _push4(` Bagikan `);
                      } else {
                        return [
                          createVNode(unref(Share2), { class: "w-3 h-3 mr-1" }),
                          createTextVNode(" Bagikan ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div><div class="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"${_scopeId2}><div class="flex items-center justify-between"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>Kode Referral</span><span class="font-mono font-semibold"${_scopeId2}>${ssrInterpolate(__props.customer.ref_code)}</span></div><p class="text-[10px] text-gray-500 dark:text-gray-400 mt-1 break-all"${_scopeId2}>${ssrInterpolate(referralLink.value)}</p></div></div><div class="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"${_scopeId2}><span class="text-gray-600 dark:text-gray-400"${_scopeId2}>E-Wallet ID</span><span class="font-mono font-semibold"${_scopeId2}>${ssrInterpolate(__props.customer.ewallet_id)}</span></div><div class="flex items-center justify-between p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg"${_scopeId2}><span class="text-emerald-700 dark:text-emerald-400"${_scopeId2}>Saldo</span><span class="font-semibold text-emerald-700 dark:text-emerald-400"${_scopeId2}>${ssrInterpolate(unref(formatCurrency)(__props.customer.ewallet_saldo))}</span></div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex flex-col items-center text-center" }, [
                      createVNode(unref(_sfc_main$q), { class: "h-24 w-24 mb-4" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$r), {
                            src: `https://api.dicebear.com/7.x/initials/svg?seed=${__props.customer.name}`
                          }, null, 8, ["src"]),
                          createVNode(unref(_sfc_main$s), null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(initials.value), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode("h2", { class: "text-xl font-bold text-gray-900 dark:text-gray-100" }, toDisplayString(__props.customer.name), 1),
                      createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400 mt-1" }, toDisplayString(__props.customer.email), 1),
                      __props.customer.email_verified_at ? (openBlock(), createBlock(unref(_sfc_main$t), {
                        key: 0,
                        class: "mt-3 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900 dark:text-emerald-100"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(CheckCircle), { class: "w-3 h-3 mr-1" }),
                          createTextVNode(" Email Terverifikasi ")
                        ]),
                        _: 1
                      })) : (openBlock(), createBlock(unref(_sfc_main$t), {
                        key: 1,
                        variant: "secondary",
                        class: "mt-3"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(AlertCircle), { class: "w-3 h-3 mr-1" }),
                          createTextVNode(" Email Belum Terverifikasi ")
                        ]),
                        _: 1
                      })),
                      createVNode("div", { class: "mt-4 w-full space-y-2 text-sm" }, [
                        createVNode("div", { class: "space-y-1.5" }, [
                          createVNode("div", { class: "flex items-center justify-between" }, [
                            createVNode("span", { class: "text-xs text-gray-600 dark:text-gray-400" }, "Referral Link"),
                            createVNode("div", { class: "flex gap-1" }, [
                              createVNode(unref(_sfc_main$u), {
                                size: "sm",
                                variant: "outline",
                                class: "h-6 px-2 text-[10px]",
                                onClick: copyReferralLink
                              }, {
                                default: withCtx(() => [
                                  copied.value ? (openBlock(), createBlock(unref(Check), {
                                    key: 0,
                                    class: "w-3 h-3 mr-1"
                                  })) : (openBlock(), createBlock(unref(Copy), {
                                    key: 1,
                                    class: "w-3 h-3 mr-1"
                                  })),
                                  createTextVNode(" " + toDisplayString(copied.value ? "Tersalin" : "Salin"), 1)
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$u), {
                                size: "sm",
                                variant: "outline",
                                class: "h-6 px-2 text-[10px]",
                                onClick: shareReferralLink
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Share2), { class: "w-3 h-3 mr-1" }),
                                  createTextVNode(" Bagikan ")
                                ]),
                                _: 1
                              })
                            ])
                          ]),
                          createVNode("div", { class: "p-2 bg-gray-50 dark:bg-gray-800 rounded-lg" }, [
                            createVNode("div", { class: "flex items-center justify-between" }, [
                              createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Kode Referral"),
                              createVNode("span", { class: "font-mono font-semibold" }, toDisplayString(__props.customer.ref_code), 1)
                            ]),
                            createVNode("p", { class: "text-[10px] text-gray-500 dark:text-gray-400 mt-1 break-all" }, toDisplayString(referralLink.value), 1)
                          ])
                        ]),
                        createVNode("div", { class: "flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg" }, [
                          createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "E-Wallet ID"),
                          createVNode("span", { class: "font-mono font-semibold" }, toDisplayString(__props.customer.ewallet_id), 1)
                        ]),
                        createVNode("div", { class: "flex items-center justify-between p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg" }, [
                          createVNode("span", { class: "text-emerald-700 dark:text-emerald-400" }, "Saldo"),
                          createVNode("span", { class: "font-semibold text-emerald-700 dark:text-emerald-400" }, toDisplayString(unref(formatCurrency)(__props.customer.ewallet_saldo)), 1)
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$p), { class: "pt-6" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex flex-col items-center text-center" }, [
                    createVNode(unref(_sfc_main$q), { class: "h-24 w-24 mb-4" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$r), {
                          src: `https://api.dicebear.com/7.x/initials/svg?seed=${__props.customer.name}`
                        }, null, 8, ["src"]),
                        createVNode(unref(_sfc_main$s), null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(initials.value), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("h2", { class: "text-xl font-bold text-gray-900 dark:text-gray-100" }, toDisplayString(__props.customer.name), 1),
                    createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400 mt-1" }, toDisplayString(__props.customer.email), 1),
                    __props.customer.email_verified_at ? (openBlock(), createBlock(unref(_sfc_main$t), {
                      key: 0,
                      class: "mt-3 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900 dark:text-emerald-100"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(CheckCircle), { class: "w-3 h-3 mr-1" }),
                        createTextVNode(" Email Terverifikasi ")
                      ]),
                      _: 1
                    })) : (openBlock(), createBlock(unref(_sfc_main$t), {
                      key: 1,
                      variant: "secondary",
                      class: "mt-3"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(AlertCircle), { class: "w-3 h-3 mr-1" }),
                        createTextVNode(" Email Belum Terverifikasi ")
                      ]),
                      _: 1
                    })),
                    createVNode("div", { class: "mt-4 w-full space-y-2 text-sm" }, [
                      createVNode("div", { class: "space-y-1.5" }, [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("span", { class: "text-xs text-gray-600 dark:text-gray-400" }, "Referral Link"),
                          createVNode("div", { class: "flex gap-1" }, [
                            createVNode(unref(_sfc_main$u), {
                              size: "sm",
                              variant: "outline",
                              class: "h-6 px-2 text-[10px]",
                              onClick: copyReferralLink
                            }, {
                              default: withCtx(() => [
                                copied.value ? (openBlock(), createBlock(unref(Check), {
                                  key: 0,
                                  class: "w-3 h-3 mr-1"
                                })) : (openBlock(), createBlock(unref(Copy), {
                                  key: 1,
                                  class: "w-3 h-3 mr-1"
                                })),
                                createTextVNode(" " + toDisplayString(copied.value ? "Tersalin" : "Salin"), 1)
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$u), {
                              size: "sm",
                              variant: "outline",
                              class: "h-6 px-2 text-[10px]",
                              onClick: shareReferralLink
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Share2), { class: "w-3 h-3 mr-1" }),
                                createTextVNode(" Bagikan ")
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        createVNode("div", { class: "p-2 bg-gray-50 dark:bg-gray-800 rounded-lg" }, [
                          createVNode("div", { class: "flex items-center justify-between" }, [
                            createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Kode Referral"),
                            createVNode("span", { class: "font-mono font-semibold" }, toDisplayString(__props.customer.ref_code), 1)
                          ]),
                          createVNode("p", { class: "text-[10px] text-gray-500 dark:text-gray-400 mt-1 break-all" }, toDisplayString(referralLink.value), 1)
                        ])
                      ]),
                      createVNode("div", { class: "flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg" }, [
                        createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "E-Wallet ID"),
                        createVNode("span", { class: "font-mono font-semibold" }, toDisplayString(__props.customer.ewallet_id), 1)
                      ]),
                      createVNode("div", { class: "flex items-center justify-between p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg" }, [
                        createVNode("span", { class: "text-emerald-700 dark:text-emerald-400" }, "Saldo"),
                        createVNode("span", { class: "font-semibold text-emerald-700 dark:text-emerald-400" }, toDisplayString(unref(formatCurrency)(__props.customer.ewallet_saldo)), 1)
                      ])
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
    };
  }
});
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/profile/ProfileCard.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  __name: "AddressManagement",
  __ssrInlineRender: true,
  props: {
    addresses: {}
  },
  setup(__props) {
    const showDialog = ref(false);
    const isEdit = ref(false);
    const isDeleting = ref(false);
    const processing = ref(false);
    const provinces = ref([]);
    const cities = ref([]);
    const loadingProvinces = ref(false);
    const loadingCities = ref(false);
    const selectedProvince = ref("");
    const selectedCity = ref("");
    const formData = ref({
      label: "",
      is_default: false,
      recipient_name: "",
      recipient_phone: "",
      address_line1: "",
      address_line2: "",
      province_label: "",
      province_id: 0,
      city_label: "",
      city_id: 0,
      postal_code: "",
      country: "Indonesia",
      description: ""
    });
    const selectedAddressId = ref(null);
    const loadProvinces = async () => {
      loadingProvinces.value = true;
      try {
        const response = await axios.get("/api/shipping/provinces");
        provinces.value = response.data.data;
      } catch (error) {
        toast.error("Gagal memuat data provinsi");
        console.error("Error loading provinces:", error);
      } finally {
        loadingProvinces.value = false;
      }
    };
    const loadCities = async (provinceId) => {
      if (!provinceId) return;
      loadingCities.value = true;
      cities.value = [];
      selectedCity.value = "";
      try {
        const response = await axios.get("/api/shipping/cities", {
          params: { province_id: provinceId }
        });
        cities.value = response.data.data;
      } catch (error) {
        toast.error("Gagal memuat data kota");
        console.error("Error loading cities:", error);
      } finally {
        loadingCities.value = false;
      }
    };
    watch(selectedProvince, (newProvinceId) => {
      if (!newProvinceId) return;
      const province = provinces.value.find((p) => p.id.toString() === newProvinceId);
      if (province) {
        formData.value.province_id = parseInt(newProvinceId);
        formData.value.province_label = province.name;
        loadCities(newProvinceId);
      }
    });
    watch(selectedCity, (newCityId) => {
      if (!newCityId) return;
      const city = cities.value.find((c) => c.id.toString() === newCityId);
      if (city) {
        formData.value.city_id = parseInt(newCityId);
        formData.value.city_label = city.name;
      }
    });
    const openAddDialog = () => {
      isEdit.value = false;
      formData.value = {
        label: "",
        is_default: false,
        recipient_name: "",
        recipient_phone: "",
        address_line1: "",
        address_line2: "",
        province_label: "",
        province_id: 0,
        city_label: "",
        city_id: 0,
        postal_code: "",
        country: "Indonesia",
        description: ""
      };
      selectedProvince.value = "";
      selectedCity.value = "";
      cities.value = [];
      loadProvinces();
      showDialog.value = true;
    };
    const openEditDialog = (address) => {
      isEdit.value = true;
      selectedAddressId.value = address.id;
      formData.value = { ...address };
      loadProvinces().then(() => {
        if (address.province_id) {
          selectedProvince.value = address.province_id.toString();
          loadCities(address.province_id.toString()).then(() => {
            if (address.city_id) {
              selectedCity.value = address.city_id.toString();
            }
          });
        }
      });
      showDialog.value = true;
    };
    const closeDialog = () => {
      showDialog.value = false;
      selectedAddressId.value = null;
    };
    const saveAddress = () => {
      if (!formData.value.recipient_name || !formData.value.recipient_phone || !formData.value.address_line1) {
        toast.error("Mohon lengkapi nama penerima, telepon, dan alamat");
        return;
      }
      if (!formData.value.province_id || !formData.value.city_id) {
        toast.error("Mohon pilih provinsi dan kota/kabupaten");
        return;
      }
      processing.value = true;
      const url = isEdit.value && selectedAddressId.value ? `/client/profile/addresses/${selectedAddressId.value}` : "/client/profile/addresses";
      const method = isEdit.value ? "put" : "post";
      router[method](url, formData.value, {
        preserveScroll: true,
        onSuccess: () => {
          toast.success(`Alamat berhasil ${isEdit.value ? "diperbarui" : "ditambahkan"}`);
          closeDialog();
        },
        onError: (errors) => {
          console.error("Address save error:", errors);
          if (typeof errors === "object" && errors !== null) {
            const firstError = Object.values(errors)[0];
            const errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
            toast.error(errorMessage || "Gagal menyimpan alamat");
          } else {
            toast.error("Gagal menyimpan alamat. Silakan coba lagi.");
          }
        },
        onFinish: () => {
          processing.value = false;
        }
      });
    };
    const deleteAddress = (addressId) => {
      if (!confirm("Apakah Anda yakin ingin menghapus alamat ini?")) {
        return;
      }
      isDeleting.value = true;
      router.delete(`/client/profile/addresses/${addressId}`, {
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Alamat berhasil dihapus");
        },
        onError: (errors) => {
          console.error("Address delete error:", errors);
          if (typeof errors === "object" && errors !== null) {
            const firstError = Object.values(errors)[0];
            const errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
            toast.error(errorMessage || "Gagal menghapus alamat");
          } else {
            toast.error("Gagal menghapus alamat. Silakan coba lagi.");
          }
        },
        onFinish: () => {
          isDeleting.value = false;
        }
      });
    };
    const setDefaultAddress = (addressId) => {
      const setDefaultForm = useForm({});
      setDefaultForm.post(`/client/profile/addresses/${addressId}/set-default`, {
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Alamat utama berhasil diubah");
        },
        onError: (errors) => {
          console.error("Set default address error:", errors);
          if (typeof errors === "object" && errors !== null) {
            const firstError = Object.values(errors)[0];
            const errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
            toast.error(errorMessage || "Gagal mengubah alamat utama");
          } else {
            toast.error("Gagal mengubah alamat utama. Silakan coba lagi.");
          }
        }
      });
    };
    const getLabelIcon = (label) => {
      if (!label) return MapPin;
      if (label.toLowerCase().includes("rumah") || label.toLowerCase().includes("home")) return Home;
      if (label.toLowerCase().includes("kantor") || label.toLowerCase().includes("office")) return Building2;
      return MapPin;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(_sfc_main$o), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$v), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center justify-between"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$w), { class: "flex items-center gap-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(MapPin), { class: "w-5 h-5" }, null, _parent4, _scopeId3));
                        _push4(` Kelola Alamat `);
                      } else {
                        return [
                          createVNode(unref(MapPin), { class: "w-5 h-5" }),
                          createTextVNode(" Kelola Alamat ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$u), {
                    size: "sm",
                    onClick: openAddDialog
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Plus), { class: "w-4 h-4 mr-2" }, null, _parent4, _scopeId3));
                        _push4(` Tambah Alamat `);
                      } else {
                        return [
                          createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Tambah Alamat ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode(unref(_sfc_main$w), { class: "flex items-center gap-2" }, {
                        default: withCtx(() => [
                          createVNode(unref(MapPin), { class: "w-5 h-5" }),
                          createTextVNode(" Kelola Alamat ")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$u), {
                        size: "sm",
                        onClick: openAddDialog
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Tambah Alamat ")
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$p), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (__props.addresses.length === 0) {
                    _push3(`<div class="text-center py-12 text-muted-foreground"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(MapPin), { class: "w-12 h-12 mx-auto mb-4 opacity-20" }, null, _parent3, _scopeId2));
                    _push3(`<p class="mb-2"${_scopeId2}>Belum ada alamat tersimpan</p><p class="text-sm"${_scopeId2}>Tambahkan alamat untuk mempermudah proses pengiriman</p></div>`);
                  } else {
                    _push3(`<div class="space-y-4"${_scopeId2}><!--[-->`);
                    ssrRenderList(__props.addresses, (address) => {
                      _push3(`<div class="${ssrRenderClass([address.is_default ? "border-primary bg-primary/5" : "border-gray-200 dark:border-gray-700", "relative p-4 rounded-lg border transition-all"])}"${_scopeId2}>`);
                      if (address.is_default) {
                        _push3(ssrRenderComponent(unref(_sfc_main$t), {
                          variant: "default",
                          class: "absolute top-2 right-2 text-xs"
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(` Utama `);
                            } else {
                              return [
                                createTextVNode(" Utama ")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`<div class="flex items-start gap-3 mb-3"${_scopeId2}>`);
                      ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(getLabelIcon(address.label)), {
                        class: ["w-5 h-5 mt-1 flex-shrink-0", address.is_default ? "text-primary" : "text-muted-foreground"]
                      }, null), _parent3, _scopeId2);
                      _push3(`<div class="flex-1 min-w-0"${_scopeId2}><div class="flex items-center gap-2 mb-1"${_scopeId2}><h4 class="font-semibold text-sm"${_scopeId2}>${ssrInterpolate(address.label || "Alamat")}</h4></div><p class="text-sm font-medium"${_scopeId2}>${ssrInterpolate(address.recipient_name)}</p><p class="text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(address.recipient_phone)}</p></div></div><div class="space-y-1 mb-3"${_scopeId2}><p class="text-sm"${_scopeId2}>${ssrInterpolate(address.address_line1)}</p>`);
                      if (address.address_line2) {
                        _push3(`<p class="text-sm text-muted-foreground"${_scopeId2}>${ssrInterpolate(address.address_line2)}</p>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`<p class="text-sm text-muted-foreground"${_scopeId2}>${ssrInterpolate(address.city_label)}, ${ssrInterpolate(address.province_label)} `);
                      if (address.postal_code) {
                        _push3(`<span${_scopeId2}>${ssrInterpolate(address.postal_code)}</span>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</p><p class="text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(address.country)}</p>`);
                      if (address.description) {
                        _push3(`<p class="text-xs text-muted-foreground italic mt-2"${_scopeId2}>${ssrInterpolate(address.description)}</p>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$x), { class: "my-3" }, null, _parent3, _scopeId2));
                      _push3(`<div class="flex items-center gap-2"${_scopeId2}>`);
                      if (!address.is_default) {
                        _push3(ssrRenderComponent(unref(_sfc_main$u), {
                          variant: "outline",
                          size: "sm",
                          onClick: ($event) => setDefaultAddress(address.id)
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(` Jadikan Utama `);
                            } else {
                              return [
                                createTextVNode(" Jadikan Utama ")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(ssrRenderComponent(unref(_sfc_main$u), {
                        variant: "outline",
                        size: "sm",
                        onClick: ($event) => openEditDialog(address)
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(Pencil), { class: "w-3 h-3 mr-1" }, null, _parent4, _scopeId3));
                            _push4(` Edit `);
                          } else {
                            return [
                              createVNode(unref(Pencil), { class: "w-3 h-3 mr-1" }),
                              createTextVNode(" Edit ")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(unref(_sfc_main$u), {
                        variant: "destructive",
                        size: "sm",
                        disabled: isDeleting.value,
                        onClick: ($event) => deleteAddress(address.id)
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(Trash2), { class: "w-3 h-3 mr-1" }, null, _parent4, _scopeId3));
                            _push4(` Hapus `);
                          } else {
                            return [
                              createVNode(unref(Trash2), { class: "w-3 h-3 mr-1" }),
                              createTextVNode(" Hapus ")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</div></div>`);
                    });
                    _push3(`<!--]--></div>`);
                  }
                } else {
                  return [
                    __props.addresses.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "text-center py-12 text-muted-foreground"
                    }, [
                      createVNode(unref(MapPin), { class: "w-12 h-12 mx-auto mb-4 opacity-20" }),
                      createVNode("p", { class: "mb-2" }, "Belum ada alamat tersimpan"),
                      createVNode("p", { class: "text-sm" }, "Tambahkan alamat untuk mempermudah proses pengiriman")
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "space-y-4"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.addresses, (address) => {
                        return openBlock(), createBlock("div", {
                          key: address.id,
                          class: ["relative p-4 rounded-lg border transition-all", address.is_default ? "border-primary bg-primary/5" : "border-gray-200 dark:border-gray-700"]
                        }, [
                          address.is_default ? (openBlock(), createBlock(unref(_sfc_main$t), {
                            key: 0,
                            variant: "default",
                            class: "absolute top-2 right-2 text-xs"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Utama ")
                            ]),
                            _: 1
                          })) : createCommentVNode("", true),
                          createVNode("div", { class: "flex items-start gap-3 mb-3" }, [
                            (openBlock(), createBlock(resolveDynamicComponent(getLabelIcon(address.label)), {
                              class: ["w-5 h-5 mt-1 flex-shrink-0", address.is_default ? "text-primary" : "text-muted-foreground"]
                            }, null, 8, ["class"])),
                            createVNode("div", { class: "flex-1 min-w-0" }, [
                              createVNode("div", { class: "flex items-center gap-2 mb-1" }, [
                                createVNode("h4", { class: "font-semibold text-sm" }, toDisplayString(address.label || "Alamat"), 1)
                              ]),
                              createVNode("p", { class: "text-sm font-medium" }, toDisplayString(address.recipient_name), 1),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(address.recipient_phone), 1)
                            ])
                          ]),
                          createVNode("div", { class: "space-y-1 mb-3" }, [
                            createVNode("p", { class: "text-sm" }, toDisplayString(address.address_line1), 1),
                            address.address_line2 ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-muted-foreground"
                            }, toDisplayString(address.address_line2), 1)) : createCommentVNode("", true),
                            createVNode("p", { class: "text-sm text-muted-foreground" }, [
                              createTextVNode(toDisplayString(address.city_label) + ", " + toDisplayString(address.province_label) + " ", 1),
                              address.postal_code ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(address.postal_code), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(address.country), 1),
                            address.description ? (openBlock(), createBlock("p", {
                              key: 1,
                              class: "text-xs text-muted-foreground italic mt-2"
                            }, toDisplayString(address.description), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode(unref(_sfc_main$x), { class: "my-3" }),
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            !address.is_default ? (openBlock(), createBlock(unref(_sfc_main$u), {
                              key: 0,
                              variant: "outline",
                              size: "sm",
                              onClick: ($event) => setDefaultAddress(address.id)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Jadikan Utama ")
                              ]),
                              _: 1
                            }, 8, ["onClick"])) : createCommentVNode("", true),
                            createVNode(unref(_sfc_main$u), {
                              variant: "outline",
                              size: "sm",
                              onClick: ($event) => openEditDialog(address)
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Pencil), { class: "w-3 h-3 mr-1" }),
                                createTextVNode(" Edit ")
                              ]),
                              _: 1
                            }, 8, ["onClick"]),
                            createVNode(unref(_sfc_main$u), {
                              variant: "destructive",
                              size: "sm",
                              disabled: isDeleting.value,
                              onClick: ($event) => deleteAddress(address.id)
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Trash2), { class: "w-3 h-3 mr-1" }),
                                createTextVNode(" Hapus ")
                              ]),
                              _: 1
                            }, 8, ["disabled", "onClick"])
                          ])
                        ], 2);
                      }), 128))
                    ]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$v), null, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode(unref(_sfc_main$w), { class: "flex items-center gap-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(MapPin), { class: "w-5 h-5" }),
                        createTextVNode(" Kelola Alamat ")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$u), {
                      size: "sm",
                      onClick: openAddDialog
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                        createTextVNode(" Tambah Alamat ")
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$p), null, {
                default: withCtx(() => [
                  __props.addresses.length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-center py-12 text-muted-foreground"
                  }, [
                    createVNode(unref(MapPin), { class: "w-12 h-12 mx-auto mb-4 opacity-20" }),
                    createVNode("p", { class: "mb-2" }, "Belum ada alamat tersimpan"),
                    createVNode("p", { class: "text-sm" }, "Tambahkan alamat untuk mempermudah proses pengiriman")
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "space-y-4"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.addresses, (address) => {
                      return openBlock(), createBlock("div", {
                        key: address.id,
                        class: ["relative p-4 rounded-lg border transition-all", address.is_default ? "border-primary bg-primary/5" : "border-gray-200 dark:border-gray-700"]
                      }, [
                        address.is_default ? (openBlock(), createBlock(unref(_sfc_main$t), {
                          key: 0,
                          variant: "default",
                          class: "absolute top-2 right-2 text-xs"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Utama ")
                          ]),
                          _: 1
                        })) : createCommentVNode("", true),
                        createVNode("div", { class: "flex items-start gap-3 mb-3" }, [
                          (openBlock(), createBlock(resolveDynamicComponent(getLabelIcon(address.label)), {
                            class: ["w-5 h-5 mt-1 flex-shrink-0", address.is_default ? "text-primary" : "text-muted-foreground"]
                          }, null, 8, ["class"])),
                          createVNode("div", { class: "flex-1 min-w-0" }, [
                            createVNode("div", { class: "flex items-center gap-2 mb-1" }, [
                              createVNode("h4", { class: "font-semibold text-sm" }, toDisplayString(address.label || "Alamat"), 1)
                            ]),
                            createVNode("p", { class: "text-sm font-medium" }, toDisplayString(address.recipient_name), 1),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(address.recipient_phone), 1)
                          ])
                        ]),
                        createVNode("div", { class: "space-y-1 mb-3" }, [
                          createVNode("p", { class: "text-sm" }, toDisplayString(address.address_line1), 1),
                          address.address_line2 ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-muted-foreground"
                          }, toDisplayString(address.address_line2), 1)) : createCommentVNode("", true),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, [
                            createTextVNode(toDisplayString(address.city_label) + ", " + toDisplayString(address.province_label) + " ", 1),
                            address.postal_code ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(address.postal_code), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(address.country), 1),
                          address.description ? (openBlock(), createBlock("p", {
                            key: 1,
                            class: "text-xs text-muted-foreground italic mt-2"
                          }, toDisplayString(address.description), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode(unref(_sfc_main$x), { class: "my-3" }),
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          !address.is_default ? (openBlock(), createBlock(unref(_sfc_main$u), {
                            key: 0,
                            variant: "outline",
                            size: "sm",
                            onClick: ($event) => setDefaultAddress(address.id)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Jadikan Utama ")
                            ]),
                            _: 1
                          }, 8, ["onClick"])) : createCommentVNode("", true),
                          createVNode(unref(_sfc_main$u), {
                            variant: "outline",
                            size: "sm",
                            onClick: ($event) => openEditDialog(address)
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Pencil), { class: "w-3 h-3 mr-1" }),
                              createTextVNode(" Edit ")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(unref(_sfc_main$u), {
                            variant: "destructive",
                            size: "sm",
                            disabled: isDeleting.value,
                            onClick: ($event) => deleteAddress(address.id)
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Trash2), { class: "w-3 h-3 mr-1" }),
                              createTextVNode(" Hapus ")
                            ]),
                            _: 1
                          }, 8, ["disabled", "onClick"])
                        ])
                      ], 2);
                    }), 128))
                  ]))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$y), {
        open: showDialog.value,
        "onUpdate:open": closeDialog
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$z), { class: "sm:max-w-2xl max-h-[90vh] overflow-y-auto" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$A), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$B), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(isEdit.value ? "Edit Alamat" : "Tambah Alamat Baru")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(isEdit.value ? "Edit Alamat" : "Tambah Alamat Baru"), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$C), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(isEdit.value ? "Perbarui informasi alamat Anda" : "Tambahkan alamat pengiriman baru")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(isEdit.value ? "Perbarui informasi alamat Anda" : "Tambahkan alamat pengiriman baru"), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$B), null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(isEdit.value ? "Edit Alamat" : "Tambah Alamat Baru"), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$C), null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(isEdit.value ? "Perbarui informasi alamat Anda" : "Tambahkan alamat pengiriman baru"), 1)
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="space-y-4 py-4"${_scopeId2}><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$D), { for: "label" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Label Alamat`);
                      } else {
                        return [
                          createTextVNode("Label Alamat")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$E), {
                    id: "label",
                    modelValue: formData.value.label,
                    "onUpdate:modelValue": ($event) => formData.value.label = $event,
                    placeholder: "Rumah, Kantor, dll"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="flex items-center space-x-2 pt-8"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$F), {
                    id: "is_default",
                    checked: formData.value.is_default,
                    "onUpdate:checked": ($event) => formData.value.is_default = $event
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$D), {
                    for: "is_default",
                    class: "cursor-pointer"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Jadikan alamat utama`);
                      } else {
                        return [
                          createTextVNode("Jadikan alamat utama")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$D), { for: "recipient_name" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Nama Penerima <span class="text-red-500"${_scopeId3}>*</span>`);
                      } else {
                        return [
                          createTextVNode("Nama Penerima "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$E), {
                    id: "recipient_name",
                    modelValue: formData.value.recipient_name,
                    "onUpdate:modelValue": ($event) => formData.value.recipient_name = $event,
                    placeholder: "Nama lengkap penerima",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$D), { for: "recipient_phone" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`No. Telepon Penerima <span class="text-red-500"${_scopeId3}>*</span>`);
                      } else {
                        return [
                          createTextVNode("No. Telepon Penerima "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$E), {
                    id: "recipient_phone",
                    modelValue: formData.value.recipient_phone,
                    "onUpdate:modelValue": ($event) => formData.value.recipient_phone = $event,
                    placeholder: "08xxxxxxxxxx",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$D), { for: "address_line1" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Alamat Lengkap <span class="text-red-500"${_scopeId3}>*</span>`);
                      } else {
                        return [
                          createTextVNode("Alamat Lengkap "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$G), {
                    id: "address_line1",
                    modelValue: formData.value.address_line1,
                    "onUpdate:modelValue": ($event) => formData.value.address_line1 = $event,
                    placeholder: "Jalan, nomor rumah, RT/RW, blok",
                    rows: "3",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$D), { for: "address_line2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Detail Tambahan (Opsional)`);
                      } else {
                        return [
                          createTextVNode("Detail Tambahan (Opsional)")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$E), {
                    id: "address_line2",
                    modelValue: formData.value.address_line2,
                    "onUpdate:modelValue": ($event) => formData.value.address_line2 = $event,
                    placeholder: "Patokan, gedung, unit, warna rumah, dll"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$D), { for: "province" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Provinsi <span class="text-red-500"${_scopeId3}>*</span>`);
                      } else {
                        return [
                          createTextVNode("Provinsi "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$H), {
                    modelValue: selectedProvince.value,
                    "onUpdate:modelValue": ($event) => selectedProvince.value = $event,
                    disabled: loadingProvinces.value
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$I), { id: "province" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$J), {
                                placeholder: loadingProvinces.value ? "Memuat provinsi..." : "Pilih provinsi"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$J), {
                                  placeholder: loadingProvinces.value ? "Memuat provinsi..." : "Pilih provinsi"
                                }, null, 8, ["placeholder"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$K), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(provinces.value, (province) => {
                                _push5(ssrRenderComponent(unref(_sfc_main$L), {
                                  key: province.id,
                                  value: province.id.toString()
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(province.name)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(province.name), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(true), createBlock(Fragment, null, renderList(provinces.value, (province) => {
                                  return openBlock(), createBlock(unref(_sfc_main$L), {
                                    key: province.id,
                                    value: province.id.toString()
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(province.name), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 128))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$I), { id: "province" }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$J), {
                                placeholder: loadingProvinces.value ? "Memuat provinsi..." : "Pilih provinsi"
                              }, null, 8, ["placeholder"])
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$K), null, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(provinces.value, (province) => {
                                return openBlock(), createBlock(unref(_sfc_main$L), {
                                  key: province.id,
                                  value: province.id.toString()
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(province.name), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["value"]);
                              }), 128))
                            ]),
                            _: 2
                          }, 1024)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$D), { for: "city" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Kota/Kabupaten <span class="text-red-500"${_scopeId3}>*</span>`);
                      } else {
                        return [
                          createTextVNode("Kota/Kabupaten "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$H), {
                    modelValue: selectedCity.value,
                    "onUpdate:modelValue": ($event) => selectedCity.value = $event,
                    disabled: !selectedProvince.value || loadingCities.value
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$I), { id: "city" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$J), {
                                placeholder: loadingCities.value ? "Memuat kota..." : selectedProvince.value ? "Pilih kota/kabupaten" : "Pilih provinsi terlebih dahulu"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$J), {
                                  placeholder: loadingCities.value ? "Memuat kota..." : selectedProvince.value ? "Pilih kota/kabupaten" : "Pilih provinsi terlebih dahulu"
                                }, null, 8, ["placeholder"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$K), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(cities.value, (city) => {
                                _push5(ssrRenderComponent(unref(_sfc_main$L), {
                                  key: city.id,
                                  value: city.id.toString()
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(city.name)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(city.name), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(true), createBlock(Fragment, null, renderList(cities.value, (city) => {
                                  return openBlock(), createBlock(unref(_sfc_main$L), {
                                    key: city.id,
                                    value: city.id.toString()
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(city.name), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 128))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$I), { id: "city" }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$J), {
                                placeholder: loadingCities.value ? "Memuat kota..." : selectedProvince.value ? "Pilih kota/kabupaten" : "Pilih provinsi terlebih dahulu"
                              }, null, 8, ["placeholder"])
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$K), null, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(cities.value, (city) => {
                                return openBlock(), createBlock(unref(_sfc_main$L), {
                                  key: city.id,
                                  value: city.id.toString()
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(city.name), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["value"]);
                              }), 128))
                            ]),
                            _: 2
                          }, 1024)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$D), { for: "postal_code" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Kode Pos`);
                      } else {
                        return [
                          createTextVNode("Kode Pos")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$E), {
                    id: "postal_code",
                    modelValue: formData.value.postal_code,
                    "onUpdate:modelValue": ($event) => formData.value.postal_code = $event,
                    placeholder: "12345"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$D), { for: "country" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Negara`);
                      } else {
                        return [
                          createTextVNode("Negara")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$E), {
                    id: "country",
                    modelValue: formData.value.country,
                    "onUpdate:modelValue": ($event) => formData.value.country = $event,
                    placeholder: "Indonesia"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$D), { for: "description" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Catatan (Opsional)`);
                      } else {
                        return [
                          createTextVNode("Catatan (Opsional)")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$G), {
                    id: "description",
                    modelValue: formData.value.description,
                    "onUpdate:modelValue": ($event) => formData.value.description = $event,
                    placeholder: "Catatan khusus untuk alamat ini",
                    rows: "2"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$M), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$u), {
                          variant: "outline",
                          onClick: closeDialog,
                          disabled: processing.value
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
                        _push4(ssrRenderComponent(unref(_sfc_main$u), {
                          onClick: saveAddress,
                          disabled: processing.value
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(processing.value ? "Menyimpan..." : isEdit.value ? "Perbarui" : "Simpan")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(processing.value ? "Menyimpan..." : isEdit.value ? "Perbarui" : "Simpan"), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$u), {
                            variant: "outline",
                            onClick: closeDialog,
                            disabled: processing.value
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Batal ")
                            ]),
                            _: 1
                          }, 8, ["disabled"]),
                          createVNode(unref(_sfc_main$u), {
                            onClick: saveAddress,
                            disabled: processing.value
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(processing.value ? "Menyimpan..." : isEdit.value ? "Perbarui" : "Simpan"), 1)
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$A), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$B), null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(isEdit.value ? "Edit Alamat" : "Tambah Alamat Baru"), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$C), null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(isEdit.value ? "Perbarui informasi alamat Anda" : "Tambahkan alamat pengiriman baru"), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "space-y-4 py-4" }, [
                      createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$D), { for: "label" }, {
                            default: withCtx(() => [
                              createTextVNode("Label Alamat")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$E), {
                            id: "label",
                            modelValue: formData.value.label,
                            "onUpdate:modelValue": ($event) => formData.value.label = $event,
                            placeholder: "Rumah, Kantor, dll"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "flex items-center space-x-2 pt-8" }, [
                          createVNode(unref(_sfc_main$F), {
                            id: "is_default",
                            checked: formData.value.is_default,
                            "onUpdate:checked": ($event) => formData.value.is_default = $event
                          }, null, 8, ["checked", "onUpdate:checked"]),
                          createVNode(unref(_sfc_main$D), {
                            for: "is_default",
                            class: "cursor-pointer"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Jadikan alamat utama")
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$D), { for: "recipient_name" }, {
                            default: withCtx(() => [
                              createTextVNode("Nama Penerima "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$E), {
                            id: "recipient_name",
                            modelValue: formData.value.recipient_name,
                            "onUpdate:modelValue": ($event) => formData.value.recipient_name = $event,
                            placeholder: "Nama lengkap penerima",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$D), { for: "recipient_phone" }, {
                            default: withCtx(() => [
                              createTextVNode("No. Telepon Penerima "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$E), {
                            id: "recipient_phone",
                            modelValue: formData.value.recipient_phone,
                            "onUpdate:modelValue": ($event) => formData.value.recipient_phone = $event,
                            placeholder: "08xxxxxxxxxx",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$D), { for: "address_line1" }, {
                          default: withCtx(() => [
                            createTextVNode("Alamat Lengkap "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$G), {
                          id: "address_line1",
                          modelValue: formData.value.address_line1,
                          "onUpdate:modelValue": ($event) => formData.value.address_line1 = $event,
                          placeholder: "Jalan, nomor rumah, RT/RW, blok",
                          rows: "3",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$D), { for: "address_line2" }, {
                          default: withCtx(() => [
                            createTextVNode("Detail Tambahan (Opsional)")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$E), {
                          id: "address_line2",
                          modelValue: formData.value.address_line2,
                          "onUpdate:modelValue": ($event) => formData.value.address_line2 = $event,
                          placeholder: "Patokan, gedung, unit, warna rumah, dll"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$D), { for: "province" }, {
                            default: withCtx(() => [
                              createTextVNode("Provinsi "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$H), {
                            modelValue: selectedProvince.value,
                            "onUpdate:modelValue": ($event) => selectedProvince.value = $event,
                            disabled: loadingProvinces.value
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$I), { id: "province" }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$J), {
                                    placeholder: loadingProvinces.value ? "Memuat provinsi..." : "Pilih provinsi"
                                  }, null, 8, ["placeholder"])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$K), null, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(provinces.value, (province) => {
                                    return openBlock(), createBlock(unref(_sfc_main$L), {
                                      key: province.id,
                                      value: province.id.toString()
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(province.name), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["value"]);
                                  }), 128))
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1032, ["modelValue", "onUpdate:modelValue", "disabled"])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$D), { for: "city" }, {
                            default: withCtx(() => [
                              createTextVNode("Kota/Kabupaten "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$H), {
                            modelValue: selectedCity.value,
                            "onUpdate:modelValue": ($event) => selectedCity.value = $event,
                            disabled: !selectedProvince.value || loadingCities.value
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$I), { id: "city" }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$J), {
                                    placeholder: loadingCities.value ? "Memuat kota..." : selectedProvince.value ? "Pilih kota/kabupaten" : "Pilih provinsi terlebih dahulu"
                                  }, null, 8, ["placeholder"])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$K), null, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(cities.value, (city) => {
                                    return openBlock(), createBlock(unref(_sfc_main$L), {
                                      key: city.id,
                                      value: city.id.toString()
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(city.name), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["value"]);
                                  }), 128))
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1032, ["modelValue", "onUpdate:modelValue", "disabled"])
                        ])
                      ]),
                      createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$D), { for: "postal_code" }, {
                            default: withCtx(() => [
                              createTextVNode("Kode Pos")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$E), {
                            id: "postal_code",
                            modelValue: formData.value.postal_code,
                            "onUpdate:modelValue": ($event) => formData.value.postal_code = $event,
                            placeholder: "12345"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$D), { for: "country" }, {
                            default: withCtx(() => [
                              createTextVNode("Negara")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$E), {
                            id: "country",
                            modelValue: formData.value.country,
                            "onUpdate:modelValue": ($event) => formData.value.country = $event,
                            placeholder: "Indonesia"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$D), { for: "description" }, {
                          default: withCtx(() => [
                            createTextVNode("Catatan (Opsional)")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$G), {
                          id: "description",
                          modelValue: formData.value.description,
                          "onUpdate:modelValue": ($event) => formData.value.description = $event,
                          placeholder: "Catatan khusus untuk alamat ini",
                          rows: "2"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    createVNode(unref(_sfc_main$M), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$u), {
                          variant: "outline",
                          onClick: closeDialog,
                          disabled: processing.value
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Batal ")
                          ]),
                          _: 1
                        }, 8, ["disabled"]),
                        createVNode(unref(_sfc_main$u), {
                          onClick: saveAddress,
                          disabled: processing.value
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(processing.value ? "Menyimpan..." : isEdit.value ? "Perbarui" : "Simpan"), 1)
                          ]),
                          _: 1
                        }, 8, ["disabled"])
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
              createVNode(unref(_sfc_main$z), { class: "sm:max-w-2xl max-h-[90vh] overflow-y-auto" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$A), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$B), null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(isEdit.value ? "Edit Alamat" : "Tambah Alamat Baru"), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$C), null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(isEdit.value ? "Perbarui informasi alamat Anda" : "Tambahkan alamat pengiriman baru"), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "space-y-4 py-4" }, [
                    createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$D), { for: "label" }, {
                          default: withCtx(() => [
                            createTextVNode("Label Alamat")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$E), {
                          id: "label",
                          modelValue: formData.value.label,
                          "onUpdate:modelValue": ($event) => formData.value.label = $event,
                          placeholder: "Rumah, Kantor, dll"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "flex items-center space-x-2 pt-8" }, [
                        createVNode(unref(_sfc_main$F), {
                          id: "is_default",
                          checked: formData.value.is_default,
                          "onUpdate:checked": ($event) => formData.value.is_default = $event
                        }, null, 8, ["checked", "onUpdate:checked"]),
                        createVNode(unref(_sfc_main$D), {
                          for: "is_default",
                          class: "cursor-pointer"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Jadikan alamat utama")
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$D), { for: "recipient_name" }, {
                          default: withCtx(() => [
                            createTextVNode("Nama Penerima "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$E), {
                          id: "recipient_name",
                          modelValue: formData.value.recipient_name,
                          "onUpdate:modelValue": ($event) => formData.value.recipient_name = $event,
                          placeholder: "Nama lengkap penerima",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$D), { for: "recipient_phone" }, {
                          default: withCtx(() => [
                            createTextVNode("No. Telepon Penerima "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$E), {
                          id: "recipient_phone",
                          modelValue: formData.value.recipient_phone,
                          "onUpdate:modelValue": ($event) => formData.value.recipient_phone = $event,
                          placeholder: "08xxxxxxxxxx",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$D), { for: "address_line1" }, {
                        default: withCtx(() => [
                          createTextVNode("Alamat Lengkap "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$G), {
                        id: "address_line1",
                        modelValue: formData.value.address_line1,
                        "onUpdate:modelValue": ($event) => formData.value.address_line1 = $event,
                        placeholder: "Jalan, nomor rumah, RT/RW, blok",
                        rows: "3",
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$D), { for: "address_line2" }, {
                        default: withCtx(() => [
                          createTextVNode("Detail Tambahan (Opsional)")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$E), {
                        id: "address_line2",
                        modelValue: formData.value.address_line2,
                        "onUpdate:modelValue": ($event) => formData.value.address_line2 = $event,
                        placeholder: "Patokan, gedung, unit, warna rumah, dll"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$D), { for: "province" }, {
                          default: withCtx(() => [
                            createTextVNode("Provinsi "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$H), {
                          modelValue: selectedProvince.value,
                          "onUpdate:modelValue": ($event) => selectedProvince.value = $event,
                          disabled: loadingProvinces.value
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$I), { id: "province" }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$J), {
                                  placeholder: loadingProvinces.value ? "Memuat provinsi..." : "Pilih provinsi"
                                }, null, 8, ["placeholder"])
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$K), null, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(provinces.value, (province) => {
                                  return openBlock(), createBlock(unref(_sfc_main$L), {
                                    key: province.id,
                                    value: province.id.toString()
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(province.name), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 128))
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1032, ["modelValue", "onUpdate:modelValue", "disabled"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$D), { for: "city" }, {
                          default: withCtx(() => [
                            createTextVNode("Kota/Kabupaten "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$H), {
                          modelValue: selectedCity.value,
                          "onUpdate:modelValue": ($event) => selectedCity.value = $event,
                          disabled: !selectedProvince.value || loadingCities.value
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$I), { id: "city" }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$J), {
                                  placeholder: loadingCities.value ? "Memuat kota..." : selectedProvince.value ? "Pilih kota/kabupaten" : "Pilih provinsi terlebih dahulu"
                                }, null, 8, ["placeholder"])
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$K), null, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(cities.value, (city) => {
                                  return openBlock(), createBlock(unref(_sfc_main$L), {
                                    key: city.id,
                                    value: city.id.toString()
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(city.name), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 128))
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1032, ["modelValue", "onUpdate:modelValue", "disabled"])
                      ])
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$D), { for: "postal_code" }, {
                          default: withCtx(() => [
                            createTextVNode("Kode Pos")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$E), {
                          id: "postal_code",
                          modelValue: formData.value.postal_code,
                          "onUpdate:modelValue": ($event) => formData.value.postal_code = $event,
                          placeholder: "12345"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$D), { for: "country" }, {
                          default: withCtx(() => [
                            createTextVNode("Negara")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$E), {
                          id: "country",
                          modelValue: formData.value.country,
                          "onUpdate:modelValue": ($event) => formData.value.country = $event,
                          placeholder: "Indonesia"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$D), { for: "description" }, {
                        default: withCtx(() => [
                          createTextVNode("Catatan (Opsional)")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$G), {
                        id: "description",
                        modelValue: formData.value.description,
                        "onUpdate:modelValue": ($event) => formData.value.description = $event,
                        placeholder: "Catatan khusus untuk alamat ini",
                        rows: "2"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ]),
                  createVNode(unref(_sfc_main$M), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$u), {
                        variant: "outline",
                        onClick: closeDialog,
                        disabled: processing.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Batal ")
                        ]),
                        _: 1
                      }, 8, ["disabled"]),
                      createVNode(unref(_sfc_main$u), {
                        onClick: saveAddress,
                        disabled: processing.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(processing.value ? "Menyimpan..." : isEdit.value ? "Perbarui" : "Simpan"), 1)
                        ]),
                        _: 1
                      }, 8, ["disabled"])
                    ]),
                    _: 1
                  })
                ]),
                _: 2
              }, 1024)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/profile/AddressManagement.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const _sfc_main$l = /* @__PURE__ */ defineComponent({
  __name: "BonusStatsCard",
  __ssrInlineRender: true,
  props: {
    customer: {}
  },
  setup(__props) {
    const { formatCurrency } = useFormatter();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$o), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$v), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$w), { class: "flex items-center gap-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Trophy), { class: "w-5 h-5" }, null, _parent4, _scopeId3));
                        _push4(` Statistik Bonus `);
                      } else {
                        return [
                          createVNode(unref(Trophy), { class: "w-5 h-5" }),
                          createTextVNode(" Statistik Bonus ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$w), { class: "flex items-center gap-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(Trophy), { class: "w-5 h-5" }),
                        createTextVNode(" Statistik Bonus ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$p), { class: "space-y-3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg"${_scopeId2}><p class="text-xs text-emerald-700 dark:text-emerald-400 mb-1"${_scopeId2}>Total Dirilis</p><p class="text-xl font-bold text-emerald-700 dark:text-emerald-400"${_scopeId2}>${ssrInterpolate(unref(formatCurrency)(__props.customer.bonus_stats.total_released))}</p></div><div class="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg"${_scopeId2}><p class="text-xs text-amber-700 dark:text-amber-400 mb-1"${_scopeId2}>Total Pending</p><p class="text-xl font-bold text-amber-700 dark:text-amber-400"${_scopeId2}>${ssrInterpolate(unref(formatCurrency)(__props.customer.bonus_stats.total_pending))}</p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg" }, [
                      createVNode("p", { class: "text-xs text-emerald-700 dark:text-emerald-400 mb-1" }, "Total Dirilis"),
                      createVNode("p", { class: "text-xl font-bold text-emerald-700 dark:text-emerald-400" }, toDisplayString(unref(formatCurrency)(__props.customer.bonus_stats.total_released)), 1)
                    ]),
                    createVNode("div", { class: "p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg" }, [
                      createVNode("p", { class: "text-xs text-amber-700 dark:text-amber-400 mb-1" }, "Total Pending"),
                      createVNode("p", { class: "text-xl font-bold text-amber-700 dark:text-amber-400" }, toDisplayString(unref(formatCurrency)(__props.customer.bonus_stats.total_pending)), 1)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$v), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$w), { class: "flex items-center gap-2" }, {
                    default: withCtx(() => [
                      createVNode(unref(Trophy), { class: "w-5 h-5" }),
                      createTextVNode(" Statistik Bonus ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$p), { class: "space-y-3" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg" }, [
                    createVNode("p", { class: "text-xs text-emerald-700 dark:text-emerald-400 mb-1" }, "Total Dirilis"),
                    createVNode("p", { class: "text-xl font-bold text-emerald-700 dark:text-emerald-400" }, toDisplayString(unref(formatCurrency)(__props.customer.bonus_stats.total_released)), 1)
                  ]),
                  createVNode("div", { class: "p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg" }, [
                    createVNode("p", { class: "text-xs text-amber-700 dark:text-amber-400 mb-1" }, "Total Pending"),
                    createVNode("p", { class: "text-xl font-bold text-amber-700 dark:text-amber-400" }, toDisplayString(unref(formatCurrency)(__props.customer.bonus_stats.total_pending)), 1)
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
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/profile/BonusStatsCard.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  __name: "MemberSinceCard",
  __ssrInlineRender: true,
  props: {
    createdAt: {}
  },
  setup(__props) {
    const { formatDate } = useFormatter();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$o), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$p), { class: "pt-6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center gap-3"${_scopeId2}><div class="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Calendar), { class: "w-5 h-5 text-blue-600 dark:text-blue-400" }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}><p class="text-xs text-gray-500 dark:text-gray-400"${_scopeId2}>Member Sejak</p><p class="font-semibold"${_scopeId2}>${ssrInterpolate(unref(formatDate)(__props.createdAt))}</p></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center gap-3" }, [
                      createVNode("div", { class: "p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg" }, [
                        createVNode(unref(Calendar), { class: "w-5 h-5 text-blue-600 dark:text-blue-400" })
                      ]),
                      createVNode("div", null, [
                        createVNode("p", { class: "text-xs text-gray-500 dark:text-gray-400" }, "Member Sejak"),
                        createVNode("p", { class: "font-semibold" }, toDisplayString(unref(formatDate)(__props.createdAt)), 1)
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$p), { class: "pt-6" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex items-center gap-3" }, [
                    createVNode("div", { class: "p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg" }, [
                      createVNode(unref(Calendar), { class: "w-5 h-5 text-blue-600 dark:text-blue-400" })
                    ]),
                    createVNode("div", null, [
                      createVNode("p", { class: "text-xs text-gray-500 dark:text-gray-400" }, "Member Sejak"),
                      createVNode("p", { class: "font-semibold" }, toDisplayString(unref(formatDate)(__props.createdAt)), 1)
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
    };
  }
});
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/profile/MemberSinceCard.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "ProfileInformationTab",
  __ssrInlineRender: true,
  props: {
    customer: {}
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      name: props.customer.name,
      username: props.customer.username || "",
      nik: props.customer.nik || "",
      gender: props.customer.gender || "",
      alamat: props.customer.alamat || "",
      email: props.customer.email,
      phone: props.customer.phone,
      description: props.customer.description || ""
    });
    const submitForm = () => {
      form.patch("/client/profile", {
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Informasi profil berhasil diperbarui");
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$o), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$v), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$w), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Informasi Profile`);
                      } else {
                        return [
                          createTextVNode("Informasi Profile")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$N), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Update informasi profil Anda di sini `);
                      } else {
                        return [
                          createTextVNode(" Update informasi profil Anda di sini ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$w), null, {
                      default: withCtx(() => [
                        createTextVNode("Informasi Profile")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$N), null, {
                      default: withCtx(() => [
                        createTextVNode(" Update informasi profil Anda di sini ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$p), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<form class="space-y-6"${_scopeId2}><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$D), { for: "username" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Username <span class="text-red-500"${_scopeId3}>*</span>`);
                      } else {
                        return [
                          createTextVNode(" Username "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="relative"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(UserCircle), { class: "absolute left-3 top-3 h-4 w-4 text-gray-400" }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$E), {
                    id: "username",
                    modelValue: unref(form).username,
                    "onUpdate:modelValue": ($event) => unref(form).username = $event,
                    type: "text",
                    placeholder: "username",
                    class: "pl-10",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  if (unref(form).errors.username) {
                    _push3(`<p class="text-sm text-red-500"${_scopeId2}>${ssrInterpolate(unref(form).errors.username)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$D), { for: "name" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Nama Lengkap <span class="text-red-500"${_scopeId3}>*</span>`);
                      } else {
                        return [
                          createTextVNode(" Nama Lengkap "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="relative"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(User), { class: "absolute left-3 top-3 h-4 w-4 text-gray-400" }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$E), {
                    id: "name",
                    modelValue: unref(form).name,
                    "onUpdate:modelValue": ($event) => unref(form).name = $event,
                    type: "text",
                    placeholder: "Masukkan nama lengkap",
                    class: "pl-10",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  if (unref(form).errors.name) {
                    _push3(`<p class="text-sm text-red-500"${_scopeId2}>${ssrInterpolate(unref(form).errors.name)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$D), { for: "nik" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`NIK (Nomor Induk Kependudukan)`);
                      } else {
                        return [
                          createTextVNode("NIK (Nomor Induk Kependudukan)")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="relative"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(CreditCard), { class: "absolute left-3 top-3 h-4 w-4 text-gray-400" }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$E), {
                    id: "nik",
                    modelValue: unref(form).nik,
                    "onUpdate:modelValue": ($event) => unref(form).nik = $event,
                    type: "text",
                    placeholder: "16 digit NIK",
                    class: "pl-10",
                    maxlength: "16"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  if (unref(form).errors.nik) {
                    _push3(`<p class="text-sm text-red-500"${_scopeId2}>${ssrInterpolate(unref(form).errors.nik)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$D), { for: "gender" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Jenis Kelamin`);
                      } else {
                        return [
                          createTextVNode("Jenis Kelamin")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$H), {
                    modelValue: unref(form).gender,
                    "onUpdate:modelValue": ($event) => unref(form).gender = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$I), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$J), { placeholder: "Pilih jenis kelamin" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$J), { placeholder: "Pilih jenis kelamin" })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$K), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$L), { value: "male" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Laki-laki`);
                                  } else {
                                    return [
                                      createTextVNode("Laki-laki")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$L), { value: "female" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Perempuan`);
                                  } else {
                                    return [
                                      createTextVNode("Perempuan")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$L), { value: "male" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Laki-laki")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$L), { value: "female" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Perempuan")
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
                          createVNode(unref(_sfc_main$I), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$J), { placeholder: "Pilih jenis kelamin" })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$K), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$L), { value: "male" }, {
                                default: withCtx(() => [
                                  createTextVNode("Laki-laki")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$L), { value: "female" }, {
                                default: withCtx(() => [
                                  createTextVNode("Perempuan")
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
                  if (unref(form).errors.gender) {
                    _push3(`<p class="text-sm text-red-500"${_scopeId2}>${ssrInterpolate(unref(form).errors.gender)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$D), { for: "email" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Email <span class="text-red-500"${_scopeId3}>*</span>`);
                      } else {
                        return [
                          createTextVNode(" Email "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="relative"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Mail), { class: "absolute left-3 top-3 h-4 w-4 text-gray-400" }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$E), {
                    id: "email",
                    modelValue: unref(form).email,
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    type: "email",
                    placeholder: "email@example.com",
                    class: "pl-10",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  if (unref(form).errors.email) {
                    _push3(`<p class="text-sm text-red-500"${_scopeId2}>${ssrInterpolate(unref(form).errors.email)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$D), { for: "phone" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Nomor Telepon <span class="text-red-500"${_scopeId3}>*</span>`);
                      } else {
                        return [
                          createTextVNode(" Nomor Telepon "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="relative"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Phone), { class: "absolute left-3 top-3 h-4 w-4 text-gray-400" }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$E), {
                    id: "phone",
                    modelValue: unref(form).phone,
                    "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                    type: "tel",
                    placeholder: "08123456789",
                    class: "pl-10",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  if (unref(form).errors.phone) {
                    _push3(`<p class="text-sm text-red-500"${_scopeId2}>${ssrInterpolate(unref(form).errors.phone)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div></div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$D), { for: "alamat" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Alamat`);
                      } else {
                        return [
                          createTextVNode("Alamat")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="relative"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(MapPin), { class: "absolute left-3 top-3 h-4 w-4 text-gray-400" }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$G), {
                    id: "alamat",
                    modelValue: unref(form).alamat,
                    "onUpdate:modelValue": ($event) => unref(form).alamat = $event,
                    placeholder: "Masukkan alamat lengkap...",
                    rows: "3",
                    class: "pl-10"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  if (unref(form).errors.alamat) {
                    _push3(`<p class="text-sm text-red-500"${_scopeId2}>${ssrInterpolate(unref(form).errors.alamat)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$D), { for: "description" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Deskripsi`);
                      } else {
                        return [
                          createTextVNode("Deskripsi")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$G), {
                    id: "description",
                    modelValue: unref(form).description,
                    "onUpdate:modelValue": ($event) => unref(form).description = $event,
                    placeholder: "Ceritakan tentang diri Anda...",
                    rows: "4"
                  }, null, _parent3, _scopeId2));
                  _push3(`<p class="text-xs text-gray-500 dark:text-gray-400"${_scopeId2}> Maksimal 1000 karakter </p>`);
                  if (unref(form).errors.description) {
                    _push3(`<p class="text-sm text-red-500"${_scopeId2}>${ssrInterpolate(unref(form).errors.description)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="flex items-center justify-end gap-3"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$u), {
                    type: "button",
                    variant: "outline",
                    onClick: ($event) => unref(form).reset(),
                    disabled: unref(form).processing
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
                  _push3(ssrRenderComponent(unref(_sfc_main$u), {
                    type: "submit",
                    disabled: unref(form).processing
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (!unref(form).processing) {
                          _push4(ssrRenderComponent(unref(CheckCircle), { class: "w-4 h-4 mr-2" }, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(` ${ssrInterpolate(unref(form).processing ? "Menyimpan..." : "Simpan Perubahan")}`);
                      } else {
                        return [
                          !unref(form).processing ? (openBlock(), createBlock(unref(CheckCircle), {
                            key: 0,
                            class: "w-4 h-4 mr-2"
                          })) : createCommentVNode("", true),
                          createTextVNode(" " + toDisplayString(unref(form).processing ? "Menyimpan..." : "Simpan Perubahan"), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></form>`);
                } else {
                  return [
                    createVNode("form", {
                      onSubmit: withModifiers(submitForm, ["prevent"]),
                      class: "space-y-6"
                    }, [
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$D), { for: "username" }, {
                            default: withCtx(() => [
                              createTextVNode(" Username "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            _: 1
                          }),
                          createVNode("div", { class: "relative" }, [
                            createVNode(unref(UserCircle), { class: "absolute left-3 top-3 h-4 w-4 text-gray-400" }),
                            createVNode(unref(_sfc_main$E), {
                              id: "username",
                              modelValue: unref(form).username,
                              "onUpdate:modelValue": ($event) => unref(form).username = $event,
                              type: "text",
                              placeholder: "username",
                              class: "pl-10",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          unref(form).errors.username ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-red-500"
                          }, toDisplayString(unref(form).errors.username), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$D), { for: "name" }, {
                            default: withCtx(() => [
                              createTextVNode(" Nama Lengkap "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            _: 1
                          }),
                          createVNode("div", { class: "relative" }, [
                            createVNode(unref(User), { class: "absolute left-3 top-3 h-4 w-4 text-gray-400" }),
                            createVNode(unref(_sfc_main$E), {
                              id: "name",
                              modelValue: unref(form).name,
                              "onUpdate:modelValue": ($event) => unref(form).name = $event,
                              type: "text",
                              placeholder: "Masukkan nama lengkap",
                              class: "pl-10",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          unref(form).errors.name ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-red-500"
                          }, toDisplayString(unref(form).errors.name), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$D), { for: "nik" }, {
                            default: withCtx(() => [
                              createTextVNode("NIK (Nomor Induk Kependudukan)")
                            ]),
                            _: 1
                          }),
                          createVNode("div", { class: "relative" }, [
                            createVNode(unref(CreditCard), { class: "absolute left-3 top-3 h-4 w-4 text-gray-400" }),
                            createVNode(unref(_sfc_main$E), {
                              id: "nik",
                              modelValue: unref(form).nik,
                              "onUpdate:modelValue": ($event) => unref(form).nik = $event,
                              type: "text",
                              placeholder: "16 digit NIK",
                              class: "pl-10",
                              maxlength: "16"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          unref(form).errors.nik ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-red-500"
                          }, toDisplayString(unref(form).errors.nik), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$D), { for: "gender" }, {
                            default: withCtx(() => [
                              createTextVNode("Jenis Kelamin")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$H), {
                            modelValue: unref(form).gender,
                            "onUpdate:modelValue": ($event) => unref(form).gender = $event
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$I), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$J), { placeholder: "Pilih jenis kelamin" })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$K), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$L), { value: "male" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Laki-laki")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$L), { value: "female" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Perempuan")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"]),
                          unref(form).errors.gender ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-red-500"
                          }, toDisplayString(unref(form).errors.gender), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$D), { for: "email" }, {
                            default: withCtx(() => [
                              createTextVNode(" Email "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            _: 1
                          }),
                          createVNode("div", { class: "relative" }, [
                            createVNode(unref(Mail), { class: "absolute left-3 top-3 h-4 w-4 text-gray-400" }),
                            createVNode(unref(_sfc_main$E), {
                              id: "email",
                              modelValue: unref(form).email,
                              "onUpdate:modelValue": ($event) => unref(form).email = $event,
                              type: "email",
                              placeholder: "email@example.com",
                              class: "pl-10",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          unref(form).errors.email ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-red-500"
                          }, toDisplayString(unref(form).errors.email), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$D), { for: "phone" }, {
                            default: withCtx(() => [
                              createTextVNode(" Nomor Telepon "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            _: 1
                          }),
                          createVNode("div", { class: "relative" }, [
                            createVNode(unref(Phone), { class: "absolute left-3 top-3 h-4 w-4 text-gray-400" }),
                            createVNode(unref(_sfc_main$E), {
                              id: "phone",
                              modelValue: unref(form).phone,
                              "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                              type: "tel",
                              placeholder: "08123456789",
                              class: "pl-10",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          unref(form).errors.phone ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-red-500"
                          }, toDisplayString(unref(form).errors.phone), 1)) : createCommentVNode("", true)
                        ])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$D), { for: "alamat" }, {
                          default: withCtx(() => [
                            createTextVNode("Alamat")
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "relative" }, [
                          createVNode(unref(MapPin), { class: "absolute left-3 top-3 h-4 w-4 text-gray-400" }),
                          createVNode(unref(_sfc_main$G), {
                            id: "alamat",
                            modelValue: unref(form).alamat,
                            "onUpdate:modelValue": ($event) => unref(form).alamat = $event,
                            placeholder: "Masukkan alamat lengkap...",
                            rows: "3",
                            class: "pl-10"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        unref(form).errors.alamat ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-red-500"
                        }, toDisplayString(unref(form).errors.alamat), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$D), { for: "description" }, {
                          default: withCtx(() => [
                            createTextVNode("Deskripsi")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$G), {
                          id: "description",
                          modelValue: unref(form).description,
                          "onUpdate:modelValue": ($event) => unref(form).description = $event,
                          placeholder: "Ceritakan tentang diri Anda...",
                          rows: "4"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("p", { class: "text-xs text-gray-500 dark:text-gray-400" }, " Maksimal 1000 karakter "),
                        unref(form).errors.description ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-red-500"
                        }, toDisplayString(unref(form).errors.description), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "flex items-center justify-end gap-3" }, [
                        createVNode(unref(_sfc_main$u), {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => unref(form).reset(),
                          disabled: unref(form).processing
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Reset ")
                          ]),
                          _: 1
                        }, 8, ["onClick", "disabled"]),
                        createVNode(unref(_sfc_main$u), {
                          type: "submit",
                          disabled: unref(form).processing
                        }, {
                          default: withCtx(() => [
                            !unref(form).processing ? (openBlock(), createBlock(unref(CheckCircle), {
                              key: 0,
                              class: "w-4 h-4 mr-2"
                            })) : createCommentVNode("", true),
                            createTextVNode(" " + toDisplayString(unref(form).processing ? "Menyimpan..." : "Simpan Perubahan"), 1)
                          ]),
                          _: 1
                        }, 8, ["disabled"])
                      ])
                    ], 32)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$v), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$w), null, {
                    default: withCtx(() => [
                      createTextVNode("Informasi Profile")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$N), null, {
                    default: withCtx(() => [
                      createTextVNode(" Update informasi profil Anda di sini ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$p), null, {
                default: withCtx(() => [
                  createVNode("form", {
                    onSubmit: withModifiers(submitForm, ["prevent"]),
                    class: "space-y-6"
                  }, [
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$D), { for: "username" }, {
                          default: withCtx(() => [
                            createTextVNode(" Username "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "relative" }, [
                          createVNode(unref(UserCircle), { class: "absolute left-3 top-3 h-4 w-4 text-gray-400" }),
                          createVNode(unref(_sfc_main$E), {
                            id: "username",
                            modelValue: unref(form).username,
                            "onUpdate:modelValue": ($event) => unref(form).username = $event,
                            type: "text",
                            placeholder: "username",
                            class: "pl-10",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        unref(form).errors.username ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-red-500"
                        }, toDisplayString(unref(form).errors.username), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$D), { for: "name" }, {
                          default: withCtx(() => [
                            createTextVNode(" Nama Lengkap "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "relative" }, [
                          createVNode(unref(User), { class: "absolute left-3 top-3 h-4 w-4 text-gray-400" }),
                          createVNode(unref(_sfc_main$E), {
                            id: "name",
                            modelValue: unref(form).name,
                            "onUpdate:modelValue": ($event) => unref(form).name = $event,
                            type: "text",
                            placeholder: "Masukkan nama lengkap",
                            class: "pl-10",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        unref(form).errors.name ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-red-500"
                        }, toDisplayString(unref(form).errors.name), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$D), { for: "nik" }, {
                          default: withCtx(() => [
                            createTextVNode("NIK (Nomor Induk Kependudukan)")
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "relative" }, [
                          createVNode(unref(CreditCard), { class: "absolute left-3 top-3 h-4 w-4 text-gray-400" }),
                          createVNode(unref(_sfc_main$E), {
                            id: "nik",
                            modelValue: unref(form).nik,
                            "onUpdate:modelValue": ($event) => unref(form).nik = $event,
                            type: "text",
                            placeholder: "16 digit NIK",
                            class: "pl-10",
                            maxlength: "16"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        unref(form).errors.nik ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-red-500"
                        }, toDisplayString(unref(form).errors.nik), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$D), { for: "gender" }, {
                          default: withCtx(() => [
                            createTextVNode("Jenis Kelamin")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$H), {
                          modelValue: unref(form).gender,
                          "onUpdate:modelValue": ($event) => unref(form).gender = $event
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$I), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$J), { placeholder: "Pilih jenis kelamin" })
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$K), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$L), { value: "male" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Laki-laki")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$L), { value: "female" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Perempuan")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"]),
                        unref(form).errors.gender ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-red-500"
                        }, toDisplayString(unref(form).errors.gender), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$D), { for: "email" }, {
                          default: withCtx(() => [
                            createTextVNode(" Email "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "relative" }, [
                          createVNode(unref(Mail), { class: "absolute left-3 top-3 h-4 w-4 text-gray-400" }),
                          createVNode(unref(_sfc_main$E), {
                            id: "email",
                            modelValue: unref(form).email,
                            "onUpdate:modelValue": ($event) => unref(form).email = $event,
                            type: "email",
                            placeholder: "email@example.com",
                            class: "pl-10",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        unref(form).errors.email ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-red-500"
                        }, toDisplayString(unref(form).errors.email), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$D), { for: "phone" }, {
                          default: withCtx(() => [
                            createTextVNode(" Nomor Telepon "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "relative" }, [
                          createVNode(unref(Phone), { class: "absolute left-3 top-3 h-4 w-4 text-gray-400" }),
                          createVNode(unref(_sfc_main$E), {
                            id: "phone",
                            modelValue: unref(form).phone,
                            "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                            type: "tel",
                            placeholder: "08123456789",
                            class: "pl-10",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        unref(form).errors.phone ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-red-500"
                        }, toDisplayString(unref(form).errors.phone), 1)) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$D), { for: "alamat" }, {
                        default: withCtx(() => [
                          createTextVNode("Alamat")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "relative" }, [
                        createVNode(unref(MapPin), { class: "absolute left-3 top-3 h-4 w-4 text-gray-400" }),
                        createVNode(unref(_sfc_main$G), {
                          id: "alamat",
                          modelValue: unref(form).alamat,
                          "onUpdate:modelValue": ($event) => unref(form).alamat = $event,
                          placeholder: "Masukkan alamat lengkap...",
                          rows: "3",
                          class: "pl-10"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      unref(form).errors.alamat ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-red-500"
                      }, toDisplayString(unref(form).errors.alamat), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$D), { for: "description" }, {
                        default: withCtx(() => [
                          createTextVNode("Deskripsi")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$G), {
                        id: "description",
                        modelValue: unref(form).description,
                        "onUpdate:modelValue": ($event) => unref(form).description = $event,
                        placeholder: "Ceritakan tentang diri Anda...",
                        rows: "4"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode("p", { class: "text-xs text-gray-500 dark:text-gray-400" }, " Maksimal 1000 karakter "),
                      unref(form).errors.description ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-red-500"
                      }, toDisplayString(unref(form).errors.description), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "flex items-center justify-end gap-3" }, [
                      createVNode(unref(_sfc_main$u), {
                        type: "button",
                        variant: "outline",
                        onClick: ($event) => unref(form).reset(),
                        disabled: unref(form).processing
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Reset ")
                        ]),
                        _: 1
                      }, 8, ["onClick", "disabled"]),
                      createVNode(unref(_sfc_main$u), {
                        type: "submit",
                        disabled: unref(form).processing
                      }, {
                        default: withCtx(() => [
                          !unref(form).processing ? (openBlock(), createBlock(unref(CheckCircle), {
                            key: 0,
                            class: "w-4 h-4 mr-2"
                          })) : createCommentVNode("", true),
                          createTextVNode(" " + toDisplayString(unref(form).processing ? "Menyimpan..." : "Simpan Perubahan"), 1)
                        ]),
                        _: 1
                      }, 8, ["disabled"])
                    ])
                  ], 32)
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
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/profile/ProfileInformationTab.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "OrderDetailSheet",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean },
    orderId: {}
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { formatCurrency, formatDate, getStatusLabel } = useFormatter();
    const page = usePage();
    const userWalletBalance = computed(() => {
      return page.props.auth?.user?.ewallet_saldo ?? 0;
    });
    const loadingOrder = ref(false);
    const updatingStatus = ref(false);
    const processingPayment = ref(false);
    const midtransPopupOpen = ref(false);
    const orderDetail = ref(null);
    const paymentMethod = ref("midtrans");
    const canMarkCompleted = computed(() => {
      return orderDetail.value?.status?.toUpperCase() === "SHIPPED";
    });
    const canPay = computed(() => {
      return orderDetail.value?.status?.toUpperCase() === "PENDING" && !orderDetail.value?.paid_at;
    });
    const isWalletSufficient = computed(() => {
      if (!orderDetail.value) return false;
      return userWalletBalance.value >= orderDetail.value.grand_total;
    });
    watchEffect(() => {
      if (typeof document !== "undefined") {
        if (midtransPopupOpen.value) {
          document.body.classList.add("midtrans-popup-active");
        } else {
          document.body.classList.remove("midtrans-popup-active");
        }
      }
    });
    onUnmounted(() => {
      if (typeof document !== "undefined") {
        document.body.classList.remove("midtrans-popup-active");
      }
    });
    const statusBadgeClass = computed(() => {
      const status = orderDetail.value?.status?.toLowerCase();
      return {
        "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-100": status === "pending",
        "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100": status === "processing" || status === "paid",
        "bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-100": status === "shipped",
        "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900 dark:text-emerald-100": status === "delivered" || status === "completed",
        "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-100": status === "cancelled"
      };
    });
    const loadOrderDetail = async () => {
      if (!props.orderId) return;
      loadingOrder.value = true;
      try {
        const response = await axios.get(`/api/client/orders/${props.orderId}`);
        orderDetail.value = response.data.data;
      } catch (error) {
        console.error("Failed to load order:", error);
        toast.error("Gagal memuat detail pesanan");
      } finally {
        loadingOrder.value = false;
      }
    };
    const markAsCompleted = async () => {
      if (!orderDetail.value || !canMarkCompleted.value || updatingStatus.value) return;
      updatingStatus.value = true;
      try {
        await axios.post(`/api/client/orders/${orderDetail.value.id}/complete`);
        await loadOrderDetail();
        router.reload({ only: ["orders"] });
        toast.success('Status pesanan berhasil diperbarui menjadi "Selesai".');
      } catch (error) {
        console.error("Failed to update order status:", error);
        toast.error(error.response?.data?.message || "Gagal memperbarui status pesanan");
      } finally {
        updatingStatus.value = false;
      }
    };
    const payWithMidtrans = async () => {
      if (!orderDetail.value || !canPay.value || processingPayment.value) return;
      const snapInstance = window.snap;
      if (!snapInstance) {
        toast.error("Sistem pembayaran belum siap. Mohon refresh halaman.");
        return;
      }
      processingPayment.value = true;
      try {
        const response = await axios.post(`/api/client/orders/${orderDetail.value.id}/pay`);
        const data = response.data;
        if (data.success && data.snap_token) {
          midtransPopupOpen.value = true;
          snapInstance.pay(data.snap_token, {
            onSuccess: function() {
              midtransPopupOpen.value = false;
              processingPayment.value = false;
              toast.success("Pembayaran berhasil!");
              loadOrderDetail();
              router.reload({ only: ["orders"] });
            },
            onPending: function() {
              midtransPopupOpen.value = false;
              processingPayment.value = false;
              toast.info("Pembayaran tertunda. Silakan selesaikan pembayaran.");
              loadOrderDetail();
              router.reload({ only: ["orders"] });
            },
            onError: function() {
              midtransPopupOpen.value = false;
              processingPayment.value = false;
              toast.error("Pembayaran gagal. Silakan coba lagi.");
              setTimeout(() => {
                document.body.classList.remove("midtrans-popup-active");
              }, 100);
            },
            onClose: function() {
              midtransPopupOpen.value = false;
              processingPayment.value = false;
              toast.info("Pembayaran dibatalkan.");
              setTimeout(() => {
                document.body.classList.remove("midtrans-popup-active");
              }, 100);
            }
          });
        } else {
          toast.error(data.message || "Gagal memproses pembayaran");
        }
      } catch (error) {
        console.error("Failed to initiate payment:", error);
        toast.error(error.response?.data?.message || "Gagal memproses pembayaran");
      } finally {
        if (!midtransPopupOpen.value) {
          processingPayment.value = false;
        }
      }
    };
    const payWithWallet = async () => {
      if (!orderDetail.value || !canPay.value || processingPayment.value) return;
      if (!isWalletSufficient.value) {
        toast.error("Saldo e-wallet Anda tidak mencukupi");
        return;
      }
      processingPayment.value = true;
      try {
        const response = await axios.post(`/api/client/orders/${orderDetail.value.id}/pay-wallet`);
        const data = response.data;
        if (data.success) {
          toast.success(data.message || "Pembayaran berhasil!");
          await loadOrderDetail();
          router.reload({ only: ["orders", "auth"] });
        } else {
          toast.error(data.message || "Gagal memproses pembayaran");
        }
      } catch (error) {
        console.error("Failed to pay with wallet:", error);
        toast.error(error.response?.data?.message || "Gagal memproses pembayaran");
      } finally {
        processingPayment.value = false;
      }
    };
    const handlePayment = () => {
      if (paymentMethod.value === "wallet") {
        payWithWallet();
      } else {
        payWithMidtrans();
      }
    };
    watch(
      () => [props.open, props.orderId],
      ([isOpen, id]) => {
        if (isOpen && id) {
          loadOrderDetail();
        }
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$O), mergeProps({
        open: __props.open,
        "onUpdate:open": (val) => emit("update:open", val)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$P), {
              side: "right",
              class: "sm:max-w-2xl w-full overflow-y-auto"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$Q), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$R), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Detail Pesanan`);
                            } else {
                              return [
                                createTextVNode("Detail Pesanan")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$S), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Informasi lengkap pesanan Anda `);
                            } else {
                              return [
                                createTextVNode(" Informasi lengkap pesanan Anda ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$R), null, {
                            default: withCtx(() => [
                              createTextVNode("Detail Pesanan")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$S), null, {
                            default: withCtx(() => [
                              createTextVNode(" Informasi lengkap pesanan Anda ")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (loadingOrder.value) {
                    _push3(`<div class="flex items-center justify-center py-12"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Loader2), { class: "h-8 w-8 animate-spin text-muted-foreground" }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else if (orderDetail.value) {
                    _push3(`<div class="space-y-6 py-6"${_scopeId2}><div class="space-y-3"${_scopeId2}><div class="flex items-center gap-2 text-sm font-medium"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Package), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                    _push3(`<span${_scopeId2}>Ringkasan Pesanan</span></div><div class="space-y-2"${_scopeId2}><div class="flex justify-between"${_scopeId2}><span class="text-sm text-muted-foreground"${_scopeId2}>Nomor Pesanan</span><span class="text-sm font-medium"${_scopeId2}>${ssrInterpolate(orderDetail.value.order_no)}</span></div><div class="flex justify-between items-center"${_scopeId2}><span class="text-sm text-muted-foreground"${_scopeId2}>Status</span>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$t), { class: statusBadgeClass.value }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(unref(getStatusLabel)(orderDetail.value.status))}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(unref(getStatusLabel)(orderDetail.value.status)), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                    if (orderDetail.value.placed_at) {
                      _push3(`<div class="flex justify-between"${_scopeId2}><span class="text-sm text-muted-foreground"${_scopeId2}>Tanggal Pesan</span><span class="text-sm font-medium"${_scopeId2}>${ssrInterpolate(unref(formatDate)(orderDetail.value.placed_at))}</span></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    if (orderDetail.value.paid_at) {
                      _push3(`<div class="flex justify-between items-center"${_scopeId2}><span class="text-sm text-muted-foreground"${_scopeId2}>Status Pembayaran</span>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$t), { variant: "secondary" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(CheckCircle), { class: "w-3 h-3 mr-1" }, null, _parent4, _scopeId3));
                            _push4(` Dibayar ${ssrInterpolate(unref(formatDate)(orderDetail.value.paid_at))}`);
                          } else {
                            return [
                              createVNode(unref(CheckCircle), { class: "w-3 h-3 mr-1" }),
                              createTextVNode(" Dibayar " + toDisplayString(unref(formatDate)(orderDetail.value.paid_at)), 1)
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(`</div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div></div>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$x), null, null, _parent3, _scopeId2));
                    _push3(`<div class="space-y-3"${_scopeId2}><div class="flex items-center gap-2 text-sm font-medium"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Package), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                    _push3(`<span${_scopeId2}>Produk Pesanan</span></div><div class="space-y-3"${_scopeId2}><!--[-->`);
                    ssrRenderList(orderDetail.value.items, (item) => {
                      _push3(`<div class="flex gap-4 p-3 bg-muted/30 rounded-lg"${_scopeId2}>`);
                      if (item.meta_json?.image) {
                        _push3(`<img${ssrRenderAttr("src", item.meta_json.image)}${ssrRenderAttr("alt", item.name)} class="w-16 h-16 object-cover rounded-md"${_scopeId2}>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`<div class="flex-1"${_scopeId2}><h4 class="font-medium text-sm"${_scopeId2}>${ssrInterpolate(item.name)}</h4><p class="text-xs text-muted-foreground"${_scopeId2}>SKU: ${ssrInterpolate(item.sku)}</p><p class="text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(item.qty)}x ${ssrInterpolate(unref(formatCurrency)(item.unit_price))}</p></div><div class="text-right"${_scopeId2}><p class="font-semibold text-sm"${_scopeId2}>${ssrInterpolate(unref(formatCurrency)(item.row_total))}</p></div></div>`);
                    });
                    _push3(`<!--]--></div></div>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$x), null, null, _parent3, _scopeId2));
                    if (orderDetail.value.shipping_address) {
                      _push3(`<div class="space-y-3"${_scopeId2}><div class="flex items-center gap-2 text-sm font-medium"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(MapPin), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                      _push3(`<span${_scopeId2}>Alamat Pengiriman</span></div><div class="p-3 bg-muted/30 rounded-lg space-y-1"${_scopeId2}><p class="font-medium text-sm"${_scopeId2}>${ssrInterpolate(orderDetail.value.shipping_address.recipient_name)}</p><p class="text-sm text-muted-foreground"${_scopeId2}>${ssrInterpolate(orderDetail.value.shipping_address.recipient_phone)}</p><p class="text-sm text-muted-foreground"${_scopeId2}>${ssrInterpolate(orderDetail.value.shipping_address.address_line1)}</p><p class="text-sm text-muted-foreground"${_scopeId2}>${ssrInterpolate(orderDetail.value.shipping_address.city_label)}, ${ssrInterpolate(orderDetail.value.shipping_address.province_label)} ${ssrInterpolate(orderDetail.value.shipping_address.postal_code)}</p></div></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(ssrRenderComponent(unref(_sfc_main$x), null, null, _parent3, _scopeId2));
                    if (orderDetail.value.applied_promos?.shipping) {
                      _push3(`<div class="space-y-3"${_scopeId2}><div class="flex items-center gap-2 text-sm font-medium"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(Truck), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                      _push3(`<span${_scopeId2}>Informasi Pengiriman</span></div><div class="p-3 bg-muted/30 rounded-lg space-y-2"${_scopeId2}><div class="flex justify-between"${_scopeId2}><span class="text-sm text-muted-foreground"${_scopeId2}>Kurir</span><span class="text-sm font-medium"${_scopeId2}>${ssrInterpolate(orderDetail.value.applied_promos.shipping.courier)}</span></div><div class="flex justify-between"${_scopeId2}><span class="text-sm text-muted-foreground"${_scopeId2}>Layanan</span><span class="text-sm font-medium"${_scopeId2}>${ssrInterpolate(orderDetail.value.applied_promos.shipping.service)}</span></div><div class="flex justify-between"${_scopeId2}><span class="text-sm text-muted-foreground"${_scopeId2}>Estimasi</span><span class="text-sm font-medium"${_scopeId2}>${ssrInterpolate(orderDetail.value.applied_promos.shipping.etd)} hari</span></div></div></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(ssrRenderComponent(unref(_sfc_main$x), null, null, _parent3, _scopeId2));
                    _push3(`<div class="space-y-3"${_scopeId2}><div class="flex items-center gap-2 text-sm font-medium"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(CreditCard), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                    _push3(`<span${_scopeId2}>Ringkasan Pembayaran</span></div><div class="space-y-2 text-sm"${_scopeId2}><div class="flex justify-between"${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Subtotal</span><span${_scopeId2}>${ssrInterpolate(unref(formatCurrency)(orderDetail.value.subtotal_amount))}</span></div>`);
                    if (orderDetail.value.discount_amount > 0) {
                      _push3(`<div class="flex justify-between"${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Diskon</span><span class="text-red-600"${_scopeId2}>-${ssrInterpolate(unref(formatCurrency)(orderDetail.value.discount_amount))}</span></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<div class="flex justify-between"${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Ongkos Kirim</span><span${_scopeId2}>${ssrInterpolate(unref(formatCurrency)(orderDetail.value.shipping_amount))}</span></div>`);
                    if (orderDetail.value.tax_amount > 0) {
                      _push3(`<div class="flex justify-between"${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Pajak</span><span${_scopeId2}>${ssrInterpolate(unref(formatCurrency)(orderDetail.value.tax_amount))}</span></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(ssrRenderComponent(unref(_sfc_main$x), null, null, _parent3, _scopeId2));
                    _push3(`<div class="flex justify-between font-semibold text-base"${_scopeId2}><span${_scopeId2}>Total</span><span class="text-primary"${_scopeId2}>${ssrInterpolate(unref(formatCurrency)(orderDetail.value.grand_total))}</span></div></div></div>`);
                    if (orderDetail.value.notes) {
                      _push3(`<div class="space-y-2"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$x), null, null, _parent3, _scopeId2));
                      _push3(`<div class="space-y-1"${_scopeId2}><p class="text-sm font-medium"${_scopeId2}>Catatan</p><p class="text-sm text-muted-foreground"${_scopeId2}>${ssrInterpolate(orderDetail.value.notes)}</p></div></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    if (canPay.value) {
                      _push3(`<div class="space-y-4 pt-4"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$x), null, null, _parent3, _scopeId2));
                      _push3(`<div class="space-y-3"${_scopeId2}><div class="flex items-center gap-2 text-sm font-medium"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(Wallet), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                      _push3(`<span${_scopeId2}>Metode Pembayaran</span></div>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$T), {
                        modelValue: paymentMethod.value,
                        "onUpdate:modelValue": ($event) => paymentMethod.value = $event,
                        class: "space-y-3"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<div class="${ssrRenderClass([{
                              "border-primary bg-primary/10": paymentMethod.value === "wallet",
                              "hover:bg-muted": paymentMethod.value !== "wallet",
                              "cursor-not-allowed opacity-50": !isWalletSufficient.value
                            }, "flex cursor-pointer items-center space-x-3 rounded-lg border p-3 transition-colors"])}"${_scopeId3}>`);
                            _push4(ssrRenderComponent(unref(_sfc_main$U), {
                              value: "wallet",
                              id: "payment-wallet-detail",
                              disabled: !isWalletSufficient.value
                            }, null, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(unref(_sfc_main$D), {
                              for: "payment-wallet-detail",
                              class: ["flex-1 cursor-pointer", { "cursor-not-allowed": !isWalletSufficient.value }]
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<div class="flex items-start justify-between"${_scopeId4}><div${_scopeId4}><div class="flex items-center gap-2 font-medium text-sm"${_scopeId4}>`);
                                  _push5(ssrRenderComponent(unref(Wallet), { class: "h-4 w-4" }, null, _parent5, _scopeId4));
                                  _push5(` E-Wallet </div><div class="text-xs text-muted-foreground"${_scopeId4}> Saldo: ${ssrInterpolate(unref(formatCurrency)(userWalletBalance.value))}</div>`);
                                  if (!isWalletSufficient.value) {
                                    _push5(`<div class="mt-1 text-xs text-destructive"${_scopeId4}> Saldo tidak mencukupi (kurang ${ssrInterpolate(unref(formatCurrency)(orderDetail.value.grand_total - userWalletBalance.value))}) </div>`);
                                  } else {
                                    _push5(`<!---->`);
                                  }
                                  _push5(`</div></div>`);
                                } else {
                                  return [
                                    createVNode("div", { class: "flex items-start justify-between" }, [
                                      createVNode("div", null, [
                                        createVNode("div", { class: "flex items-center gap-2 font-medium text-sm" }, [
                                          createVNode(unref(Wallet), { class: "h-4 w-4" }),
                                          createTextVNode(" E-Wallet ")
                                        ]),
                                        createVNode("div", { class: "text-xs text-muted-foreground" }, " Saldo: " + toDisplayString(unref(formatCurrency)(userWalletBalance.value)), 1),
                                        !isWalletSufficient.value ? (openBlock(), createBlock("div", {
                                          key: 0,
                                          class: "mt-1 text-xs text-destructive"
                                        }, " Saldo tidak mencukupi (kurang " + toDisplayString(unref(formatCurrency)(orderDetail.value.grand_total - userWalletBalance.value)) + ") ", 1)) : createCommentVNode("", true)
                                      ])
                                    ])
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                            _push4(`</div><div class="${ssrRenderClass([{
                              "border-primary bg-primary/10": paymentMethod.value === "midtrans",
                              "hover:bg-muted": paymentMethod.value !== "midtrans"
                            }, "flex cursor-pointer items-center space-x-3 rounded-lg border p-3 transition-colors"])}"${_scopeId3}>`);
                            _push4(ssrRenderComponent(unref(_sfc_main$U), {
                              value: "midtrans",
                              id: "payment-midtrans-detail"
                            }, null, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(unref(_sfc_main$D), {
                              for: "payment-midtrans-detail",
                              class: "flex-1 cursor-pointer"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<div class="flex items-start justify-between"${_scopeId4}><div${_scopeId4}><div class="flex items-center gap-2 font-medium text-sm"${_scopeId4}>`);
                                  _push5(ssrRenderComponent(unref(CreditCard), { class: "h-4 w-4" }, null, _parent5, _scopeId4));
                                  _push5(` Payment Gateway </div><div class="text-xs text-muted-foreground"${_scopeId4}> Transfer Bank, E-wallet, Kartu Kredit </div></div></div>`);
                                } else {
                                  return [
                                    createVNode("div", { class: "flex items-start justify-between" }, [
                                      createVNode("div", null, [
                                        createVNode("div", { class: "flex items-center gap-2 font-medium text-sm" }, [
                                          createVNode(unref(CreditCard), { class: "h-4 w-4" }),
                                          createTextVNode(" Payment Gateway ")
                                        ]),
                                        createVNode("div", { class: "text-xs text-muted-foreground" }, " Transfer Bank, E-wallet, Kartu Kredit ")
                                      ])
                                    ])
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                            _push4(`</div>`);
                          } else {
                            return [
                              createVNode("div", {
                                class: ["flex cursor-pointer items-center space-x-3 rounded-lg border p-3 transition-colors", {
                                  "border-primary bg-primary/10": paymentMethod.value === "wallet",
                                  "hover:bg-muted": paymentMethod.value !== "wallet",
                                  "cursor-not-allowed opacity-50": !isWalletSufficient.value
                                }],
                                onClick: ($event) => isWalletSufficient.value && (paymentMethod.value = "wallet")
                              }, [
                                createVNode(unref(_sfc_main$U), {
                                  value: "wallet",
                                  id: "payment-wallet-detail",
                                  disabled: !isWalletSufficient.value
                                }, null, 8, ["disabled"]),
                                createVNode(unref(_sfc_main$D), {
                                  for: "payment-wallet-detail",
                                  class: ["flex-1 cursor-pointer", { "cursor-not-allowed": !isWalletSufficient.value }]
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "flex items-start justify-between" }, [
                                      createVNode("div", null, [
                                        createVNode("div", { class: "flex items-center gap-2 font-medium text-sm" }, [
                                          createVNode(unref(Wallet), { class: "h-4 w-4" }),
                                          createTextVNode(" E-Wallet ")
                                        ]),
                                        createVNode("div", { class: "text-xs text-muted-foreground" }, " Saldo: " + toDisplayString(unref(formatCurrency)(userWalletBalance.value)), 1),
                                        !isWalletSufficient.value ? (openBlock(), createBlock("div", {
                                          key: 0,
                                          class: "mt-1 text-xs text-destructive"
                                        }, " Saldo tidak mencukupi (kurang " + toDisplayString(unref(formatCurrency)(orderDetail.value.grand_total - userWalletBalance.value)) + ") ", 1)) : createCommentVNode("", true)
                                      ])
                                    ])
                                  ]),
                                  _: 1
                                }, 8, ["class"])
                              ], 10, ["onClick"]),
                              createVNode("div", {
                                class: ["flex cursor-pointer items-center space-x-3 rounded-lg border p-3 transition-colors", {
                                  "border-primary bg-primary/10": paymentMethod.value === "midtrans",
                                  "hover:bg-muted": paymentMethod.value !== "midtrans"
                                }],
                                onClick: ($event) => paymentMethod.value = "midtrans"
                              }, [
                                createVNode(unref(_sfc_main$U), {
                                  value: "midtrans",
                                  id: "payment-midtrans-detail"
                                }),
                                createVNode(unref(_sfc_main$D), {
                                  for: "payment-midtrans-detail",
                                  class: "flex-1 cursor-pointer"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "flex items-start justify-between" }, [
                                      createVNode("div", null, [
                                        createVNode("div", { class: "flex items-center gap-2 font-medium text-sm" }, [
                                          createVNode(unref(CreditCard), { class: "h-4 w-4" }),
                                          createTextVNode(" Payment Gateway ")
                                        ]),
                                        createVNode("div", { class: "text-xs text-muted-foreground" }, " Transfer Bank, E-wallet, Kartu Kredit ")
                                      ])
                                    ])
                                  ]),
                                  _: 1
                                })
                              ], 10, ["onClick"])
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(`</div>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$u), {
                        onClick: handlePayment,
                        disabled: processingPayment.value || midtransPopupOpen.value || paymentMethod.value === "wallet" && !isWalletSufficient.value,
                        class: "w-full",
                        size: "lg"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            if (processingPayment.value) {
                              _push4(ssrRenderComponent(unref(Loader2), { class: "h-4 w-4 mr-2 animate-spin" }, null, _parent4, _scopeId3));
                            } else if (paymentMethod.value === "wallet") {
                              _push4(ssrRenderComponent(unref(Wallet), { class: "h-4 w-4 mr-2" }, null, _parent4, _scopeId3));
                            } else {
                              _push4(ssrRenderComponent(unref(CreditCard), { class: "h-4 w-4 mr-2" }, null, _parent4, _scopeId3));
                            }
                            if (paymentMethod.value === "wallet") {
                              _push4(`<span${_scopeId3}> Bayar dengan E-Wallet ${ssrInterpolate(unref(formatCurrency)(orderDetail.value.grand_total))}</span>`);
                            } else {
                              _push4(`<span${_scopeId3}> Bayar ${ssrInterpolate(unref(formatCurrency)(orderDetail.value.grand_total))}</span>`);
                            }
                          } else {
                            return [
                              processingPayment.value ? (openBlock(), createBlock(unref(Loader2), {
                                key: 0,
                                class: "h-4 w-4 mr-2 animate-spin"
                              })) : paymentMethod.value === "wallet" ? (openBlock(), createBlock(unref(Wallet), {
                                key: 1,
                                class: "h-4 w-4 mr-2"
                              })) : (openBlock(), createBlock(unref(CreditCard), {
                                key: 2,
                                class: "h-4 w-4 mr-2"
                              })),
                              paymentMethod.value === "wallet" ? (openBlock(), createBlock("span", { key: 3 }, " Bayar dengan E-Wallet " + toDisplayString(unref(formatCurrency)(orderDetail.value.grand_total)), 1)) : (openBlock(), createBlock("span", { key: 4 }, " Bayar " + toDisplayString(unref(formatCurrency)(orderDetail.value.grand_total)), 1))
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(`</div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    if (canMarkCompleted.value) {
                      _push3(`<div class="pt-4"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$u), {
                        onClick: markAsCompleted,
                        disabled: updatingStatus.value,
                        class: "w-full",
                        size: "lg"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            if (updatingStatus.value) {
                              _push4(ssrRenderComponent(unref(Loader2), { class: "h-4 w-4 mr-2 animate-spin" }, null, _parent4, _scopeId3));
                            } else {
                              _push4(ssrRenderComponent(unref(CheckCircle), { class: "h-4 w-4 mr-2" }, null, _parent4, _scopeId3));
                            }
                            _push4(` Tandai Pesanan Selesai `);
                          } else {
                            return [
                              updatingStatus.value ? (openBlock(), createBlock(unref(Loader2), {
                                key: 0,
                                class: "h-4 w-4 mr-2 animate-spin"
                              })) : (openBlock(), createBlock(unref(CheckCircle), {
                                key: 1,
                                class: "h-4 w-4 mr-2"
                              })),
                              createTextVNode(" Tandai Pesanan Selesai ")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(`</div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                  } else {
                    _push3(`<div class="flex items-center justify-center py-12 text-muted-foreground"${_scopeId2}> Tidak ada data pesanan </div>`);
                  }
                } else {
                  return [
                    createVNode(unref(_sfc_main$Q), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$R), null, {
                          default: withCtx(() => [
                            createTextVNode("Detail Pesanan")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$S), null, {
                          default: withCtx(() => [
                            createTextVNode(" Informasi lengkap pesanan Anda ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    loadingOrder.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex items-center justify-center py-12"
                    }, [
                      createVNode(unref(Loader2), { class: "h-8 w-8 animate-spin text-muted-foreground" })
                    ])) : orderDetail.value ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "space-y-6 py-6"
                    }, [
                      createVNode("div", { class: "space-y-3" }, [
                        createVNode("div", { class: "flex items-center gap-2 text-sm font-medium" }, [
                          createVNode(unref(Package), { class: "h-4 w-4" }),
                          createVNode("span", null, "Ringkasan Pesanan")
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-sm text-muted-foreground" }, "Nomor Pesanan"),
                            createVNode("span", { class: "text-sm font-medium" }, toDisplayString(orderDetail.value.order_no), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between items-center" }, [
                            createVNode("span", { class: "text-sm text-muted-foreground" }, "Status"),
                            createVNode(unref(_sfc_main$t), { class: statusBadgeClass.value }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(getStatusLabel)(orderDetail.value.status)), 1)
                              ]),
                              _: 1
                            }, 8, ["class"])
                          ]),
                          orderDetail.value.placed_at ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex justify-between"
                          }, [
                            createVNode("span", { class: "text-sm text-muted-foreground" }, "Tanggal Pesan"),
                            createVNode("span", { class: "text-sm font-medium" }, toDisplayString(unref(formatDate)(orderDetail.value.placed_at)), 1)
                          ])) : createCommentVNode("", true),
                          orderDetail.value.paid_at ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "flex justify-between items-center"
                          }, [
                            createVNode("span", { class: "text-sm text-muted-foreground" }, "Status Pembayaran"),
                            createVNode(unref(_sfc_main$t), { variant: "secondary" }, {
                              default: withCtx(() => [
                                createVNode(unref(CheckCircle), { class: "w-3 h-3 mr-1" }),
                                createTextVNode(" Dibayar " + toDisplayString(unref(formatDate)(orderDetail.value.paid_at)), 1)
                              ]),
                              _: 1
                            })
                          ])) : createCommentVNode("", true)
                        ])
                      ]),
                      createVNode(unref(_sfc_main$x)),
                      createVNode("div", { class: "space-y-3" }, [
                        createVNode("div", { class: "flex items-center gap-2 text-sm font-medium" }, [
                          createVNode(unref(Package), { class: "h-4 w-4" }),
                          createVNode("span", null, "Produk Pesanan")
                        ]),
                        createVNode("div", { class: "space-y-3" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(orderDetail.value.items, (item) => {
                            return openBlock(), createBlock("div", {
                              key: item.id,
                              class: "flex gap-4 p-3 bg-muted/30 rounded-lg"
                            }, [
                              item.meta_json?.image ? (openBlock(), createBlock("img", {
                                key: 0,
                                src: item.meta_json.image,
                                alt: item.name,
                                class: "w-16 h-16 object-cover rounded-md"
                              }, null, 8, ["src", "alt"])) : createCommentVNode("", true),
                              createVNode("div", { class: "flex-1" }, [
                                createVNode("h4", { class: "font-medium text-sm" }, toDisplayString(item.name), 1),
                                createVNode("p", { class: "text-xs text-muted-foreground" }, "SKU: " + toDisplayString(item.sku), 1),
                                createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(item.qty) + "x " + toDisplayString(unref(formatCurrency)(item.unit_price)), 1)
                              ]),
                              createVNode("div", { class: "text-right" }, [
                                createVNode("p", { class: "font-semibold text-sm" }, toDisplayString(unref(formatCurrency)(item.row_total)), 1)
                              ])
                            ]);
                          }), 128))
                        ])
                      ]),
                      createVNode(unref(_sfc_main$x)),
                      orderDetail.value.shipping_address ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "space-y-3"
                      }, [
                        createVNode("div", { class: "flex items-center gap-2 text-sm font-medium" }, [
                          createVNode(unref(MapPin), { class: "h-4 w-4" }),
                          createVNode("span", null, "Alamat Pengiriman")
                        ]),
                        createVNode("div", { class: "p-3 bg-muted/30 rounded-lg space-y-1" }, [
                          createVNode("p", { class: "font-medium text-sm" }, toDisplayString(orderDetail.value.shipping_address.recipient_name), 1),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(orderDetail.value.shipping_address.recipient_phone), 1),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(orderDetail.value.shipping_address.address_line1), 1),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(orderDetail.value.shipping_address.city_label) + ", " + toDisplayString(orderDetail.value.shipping_address.province_label) + " " + toDisplayString(orderDetail.value.shipping_address.postal_code), 1)
                        ])
                      ])) : createCommentVNode("", true),
                      createVNode(unref(_sfc_main$x)),
                      orderDetail.value.applied_promos?.shipping ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "space-y-3"
                      }, [
                        createVNode("div", { class: "flex items-center gap-2 text-sm font-medium" }, [
                          createVNode(unref(Truck), { class: "h-4 w-4" }),
                          createVNode("span", null, "Informasi Pengiriman")
                        ]),
                        createVNode("div", { class: "p-3 bg-muted/30 rounded-lg space-y-2" }, [
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-sm text-muted-foreground" }, "Kurir"),
                            createVNode("span", { class: "text-sm font-medium" }, toDisplayString(orderDetail.value.applied_promos.shipping.courier), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-sm text-muted-foreground" }, "Layanan"),
                            createVNode("span", { class: "text-sm font-medium" }, toDisplayString(orderDetail.value.applied_promos.shipping.service), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-sm text-muted-foreground" }, "Estimasi"),
                            createVNode("span", { class: "text-sm font-medium" }, toDisplayString(orderDetail.value.applied_promos.shipping.etd) + " hari", 1)
                          ])
                        ])
                      ])) : createCommentVNode("", true),
                      createVNode(unref(_sfc_main$x)),
                      createVNode("div", { class: "space-y-3" }, [
                        createVNode("div", { class: "flex items-center gap-2 text-sm font-medium" }, [
                          createVNode(unref(CreditCard), { class: "h-4 w-4" }),
                          createVNode("span", null, "Ringkasan Pembayaran")
                        ]),
                        createVNode("div", { class: "space-y-2 text-sm" }, [
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-muted-foreground" }, "Subtotal"),
                            createVNode("span", null, toDisplayString(unref(formatCurrency)(orderDetail.value.subtotal_amount)), 1)
                          ]),
                          orderDetail.value.discount_amount > 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex justify-between"
                          }, [
                            createVNode("span", { class: "text-muted-foreground" }, "Diskon"),
                            createVNode("span", { class: "text-red-600" }, "-" + toDisplayString(unref(formatCurrency)(orderDetail.value.discount_amount)), 1)
                          ])) : createCommentVNode("", true),
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-muted-foreground" }, "Ongkos Kirim"),
                            createVNode("span", null, toDisplayString(unref(formatCurrency)(orderDetail.value.shipping_amount)), 1)
                          ]),
                          orderDetail.value.tax_amount > 0 ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "flex justify-between"
                          }, [
                            createVNode("span", { class: "text-muted-foreground" }, "Pajak"),
                            createVNode("span", null, toDisplayString(unref(formatCurrency)(orderDetail.value.tax_amount)), 1)
                          ])) : createCommentVNode("", true),
                          createVNode(unref(_sfc_main$x)),
                          createVNode("div", { class: "flex justify-between font-semibold text-base" }, [
                            createVNode("span", null, "Total"),
                            createVNode("span", { class: "text-primary" }, toDisplayString(unref(formatCurrency)(orderDetail.value.grand_total)), 1)
                          ])
                        ])
                      ]),
                      orderDetail.value.notes ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "space-y-2"
                      }, [
                        createVNode(unref(_sfc_main$x)),
                        createVNode("div", { class: "space-y-1" }, [
                          createVNode("p", { class: "text-sm font-medium" }, "Catatan"),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(orderDetail.value.notes), 1)
                        ])
                      ])) : createCommentVNode("", true),
                      canPay.value ? (openBlock(), createBlock("div", {
                        key: 3,
                        class: "space-y-4 pt-4"
                      }, [
                        createVNode(unref(_sfc_main$x)),
                        createVNode("div", { class: "space-y-3" }, [
                          createVNode("div", { class: "flex items-center gap-2 text-sm font-medium" }, [
                            createVNode(unref(Wallet), { class: "h-4 w-4" }),
                            createVNode("span", null, "Metode Pembayaran")
                          ]),
                          createVNode(unref(_sfc_main$T), {
                            modelValue: paymentMethod.value,
                            "onUpdate:modelValue": ($event) => paymentMethod.value = $event,
                            class: "space-y-3"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", {
                                class: ["flex cursor-pointer items-center space-x-3 rounded-lg border p-3 transition-colors", {
                                  "border-primary bg-primary/10": paymentMethod.value === "wallet",
                                  "hover:bg-muted": paymentMethod.value !== "wallet",
                                  "cursor-not-allowed opacity-50": !isWalletSufficient.value
                                }],
                                onClick: ($event) => isWalletSufficient.value && (paymentMethod.value = "wallet")
                              }, [
                                createVNode(unref(_sfc_main$U), {
                                  value: "wallet",
                                  id: "payment-wallet-detail",
                                  disabled: !isWalletSufficient.value
                                }, null, 8, ["disabled"]),
                                createVNode(unref(_sfc_main$D), {
                                  for: "payment-wallet-detail",
                                  class: ["flex-1 cursor-pointer", { "cursor-not-allowed": !isWalletSufficient.value }]
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "flex items-start justify-between" }, [
                                      createVNode("div", null, [
                                        createVNode("div", { class: "flex items-center gap-2 font-medium text-sm" }, [
                                          createVNode(unref(Wallet), { class: "h-4 w-4" }),
                                          createTextVNode(" E-Wallet ")
                                        ]),
                                        createVNode("div", { class: "text-xs text-muted-foreground" }, " Saldo: " + toDisplayString(unref(formatCurrency)(userWalletBalance.value)), 1),
                                        !isWalletSufficient.value ? (openBlock(), createBlock("div", {
                                          key: 0,
                                          class: "mt-1 text-xs text-destructive"
                                        }, " Saldo tidak mencukupi (kurang " + toDisplayString(unref(formatCurrency)(orderDetail.value.grand_total - userWalletBalance.value)) + ") ", 1)) : createCommentVNode("", true)
                                      ])
                                    ])
                                  ]),
                                  _: 1
                                }, 8, ["class"])
                              ], 10, ["onClick"]),
                              createVNode("div", {
                                class: ["flex cursor-pointer items-center space-x-3 rounded-lg border p-3 transition-colors", {
                                  "border-primary bg-primary/10": paymentMethod.value === "midtrans",
                                  "hover:bg-muted": paymentMethod.value !== "midtrans"
                                }],
                                onClick: ($event) => paymentMethod.value = "midtrans"
                              }, [
                                createVNode(unref(_sfc_main$U), {
                                  value: "midtrans",
                                  id: "payment-midtrans-detail"
                                }),
                                createVNode(unref(_sfc_main$D), {
                                  for: "payment-midtrans-detail",
                                  class: "flex-1 cursor-pointer"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "flex items-start justify-between" }, [
                                      createVNode("div", null, [
                                        createVNode("div", { class: "flex items-center gap-2 font-medium text-sm" }, [
                                          createVNode(unref(CreditCard), { class: "h-4 w-4" }),
                                          createTextVNode(" Payment Gateway ")
                                        ]),
                                        createVNode("div", { class: "text-xs text-muted-foreground" }, " Transfer Bank, E-wallet, Kartu Kredit ")
                                      ])
                                    ])
                                  ]),
                                  _: 1
                                })
                              ], 10, ["onClick"])
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode(unref(_sfc_main$u), {
                          onClick: handlePayment,
                          disabled: processingPayment.value || midtransPopupOpen.value || paymentMethod.value === "wallet" && !isWalletSufficient.value,
                          class: "w-full",
                          size: "lg"
                        }, {
                          default: withCtx(() => [
                            processingPayment.value ? (openBlock(), createBlock(unref(Loader2), {
                              key: 0,
                              class: "h-4 w-4 mr-2 animate-spin"
                            })) : paymentMethod.value === "wallet" ? (openBlock(), createBlock(unref(Wallet), {
                              key: 1,
                              class: "h-4 w-4 mr-2"
                            })) : (openBlock(), createBlock(unref(CreditCard), {
                              key: 2,
                              class: "h-4 w-4 mr-2"
                            })),
                            paymentMethod.value === "wallet" ? (openBlock(), createBlock("span", { key: 3 }, " Bayar dengan E-Wallet " + toDisplayString(unref(formatCurrency)(orderDetail.value.grand_total)), 1)) : (openBlock(), createBlock("span", { key: 4 }, " Bayar " + toDisplayString(unref(formatCurrency)(orderDetail.value.grand_total)), 1))
                          ]),
                          _: 1
                        }, 8, ["disabled"])
                      ])) : createCommentVNode("", true),
                      canMarkCompleted.value ? (openBlock(), createBlock("div", {
                        key: 4,
                        class: "pt-4"
                      }, [
                        createVNode(unref(_sfc_main$u), {
                          onClick: markAsCompleted,
                          disabled: updatingStatus.value,
                          class: "w-full",
                          size: "lg"
                        }, {
                          default: withCtx(() => [
                            updatingStatus.value ? (openBlock(), createBlock(unref(Loader2), {
                              key: 0,
                              class: "h-4 w-4 mr-2 animate-spin"
                            })) : (openBlock(), createBlock(unref(CheckCircle), {
                              key: 1,
                              class: "h-4 w-4 mr-2"
                            })),
                            createTextVNode(" Tandai Pesanan Selesai ")
                          ]),
                          _: 1
                        }, 8, ["disabled"])
                      ])) : createCommentVNode("", true)
                    ])) : (openBlock(), createBlock("div", {
                      key: 2,
                      class: "flex items-center justify-center py-12 text-muted-foreground"
                    }, " Tidak ada data pesanan "))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$P), {
                side: "right",
                class: "sm:max-w-2xl w-full overflow-y-auto"
              }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$Q), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$R), null, {
                        default: withCtx(() => [
                          createTextVNode("Detail Pesanan")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$S), null, {
                        default: withCtx(() => [
                          createTextVNode(" Informasi lengkap pesanan Anda ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  loadingOrder.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex items-center justify-center py-12"
                  }, [
                    createVNode(unref(Loader2), { class: "h-8 w-8 animate-spin text-muted-foreground" })
                  ])) : orderDetail.value ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "space-y-6 py-6"
                  }, [
                    createVNode("div", { class: "space-y-3" }, [
                      createVNode("div", { class: "flex items-center gap-2 text-sm font-medium" }, [
                        createVNode(unref(Package), { class: "h-4 w-4" }),
                        createVNode("span", null, "Ringkasan Pesanan")
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-sm text-muted-foreground" }, "Nomor Pesanan"),
                          createVNode("span", { class: "text-sm font-medium" }, toDisplayString(orderDetail.value.order_no), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between items-center" }, [
                          createVNode("span", { class: "text-sm text-muted-foreground" }, "Status"),
                          createVNode(unref(_sfc_main$t), { class: statusBadgeClass.value }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(getStatusLabel)(orderDetail.value.status)), 1)
                            ]),
                            _: 1
                          }, 8, ["class"])
                        ]),
                        orderDetail.value.placed_at ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex justify-between"
                        }, [
                          createVNode("span", { class: "text-sm text-muted-foreground" }, "Tanggal Pesan"),
                          createVNode("span", { class: "text-sm font-medium" }, toDisplayString(unref(formatDate)(orderDetail.value.placed_at)), 1)
                        ])) : createCommentVNode("", true),
                        orderDetail.value.paid_at ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "flex justify-between items-center"
                        }, [
                          createVNode("span", { class: "text-sm text-muted-foreground" }, "Status Pembayaran"),
                          createVNode(unref(_sfc_main$t), { variant: "secondary" }, {
                            default: withCtx(() => [
                              createVNode(unref(CheckCircle), { class: "w-3 h-3 mr-1" }),
                              createTextVNode(" Dibayar " + toDisplayString(unref(formatDate)(orderDetail.value.paid_at)), 1)
                            ]),
                            _: 1
                          })
                        ])) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode(unref(_sfc_main$x)),
                    createVNode("div", { class: "space-y-3" }, [
                      createVNode("div", { class: "flex items-center gap-2 text-sm font-medium" }, [
                        createVNode(unref(Package), { class: "h-4 w-4" }),
                        createVNode("span", null, "Produk Pesanan")
                      ]),
                      createVNode("div", { class: "space-y-3" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(orderDetail.value.items, (item) => {
                          return openBlock(), createBlock("div", {
                            key: item.id,
                            class: "flex gap-4 p-3 bg-muted/30 rounded-lg"
                          }, [
                            item.meta_json?.image ? (openBlock(), createBlock("img", {
                              key: 0,
                              src: item.meta_json.image,
                              alt: item.name,
                              class: "w-16 h-16 object-cover rounded-md"
                            }, null, 8, ["src", "alt"])) : createCommentVNode("", true),
                            createVNode("div", { class: "flex-1" }, [
                              createVNode("h4", { class: "font-medium text-sm" }, toDisplayString(item.name), 1),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, "SKU: " + toDisplayString(item.sku), 1),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(item.qty) + "x " + toDisplayString(unref(formatCurrency)(item.unit_price)), 1)
                            ]),
                            createVNode("div", { class: "text-right" }, [
                              createVNode("p", { class: "font-semibold text-sm" }, toDisplayString(unref(formatCurrency)(item.row_total)), 1)
                            ])
                          ]);
                        }), 128))
                      ])
                    ]),
                    createVNode(unref(_sfc_main$x)),
                    orderDetail.value.shipping_address ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-3"
                    }, [
                      createVNode("div", { class: "flex items-center gap-2 text-sm font-medium" }, [
                        createVNode(unref(MapPin), { class: "h-4 w-4" }),
                        createVNode("span", null, "Alamat Pengiriman")
                      ]),
                      createVNode("div", { class: "p-3 bg-muted/30 rounded-lg space-y-1" }, [
                        createVNode("p", { class: "font-medium text-sm" }, toDisplayString(orderDetail.value.shipping_address.recipient_name), 1),
                        createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(orderDetail.value.shipping_address.recipient_phone), 1),
                        createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(orderDetail.value.shipping_address.address_line1), 1),
                        createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(orderDetail.value.shipping_address.city_label) + ", " + toDisplayString(orderDetail.value.shipping_address.province_label) + " " + toDisplayString(orderDetail.value.shipping_address.postal_code), 1)
                      ])
                    ])) : createCommentVNode("", true),
                    createVNode(unref(_sfc_main$x)),
                    orderDetail.value.applied_promos?.shipping ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "space-y-3"
                    }, [
                      createVNode("div", { class: "flex items-center gap-2 text-sm font-medium" }, [
                        createVNode(unref(Truck), { class: "h-4 w-4" }),
                        createVNode("span", null, "Informasi Pengiriman")
                      ]),
                      createVNode("div", { class: "p-3 bg-muted/30 rounded-lg space-y-2" }, [
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-sm text-muted-foreground" }, "Kurir"),
                          createVNode("span", { class: "text-sm font-medium" }, toDisplayString(orderDetail.value.applied_promos.shipping.courier), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-sm text-muted-foreground" }, "Layanan"),
                          createVNode("span", { class: "text-sm font-medium" }, toDisplayString(orderDetail.value.applied_promos.shipping.service), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-sm text-muted-foreground" }, "Estimasi"),
                          createVNode("span", { class: "text-sm font-medium" }, toDisplayString(orderDetail.value.applied_promos.shipping.etd) + " hari", 1)
                        ])
                      ])
                    ])) : createCommentVNode("", true),
                    createVNode(unref(_sfc_main$x)),
                    createVNode("div", { class: "space-y-3" }, [
                      createVNode("div", { class: "flex items-center gap-2 text-sm font-medium" }, [
                        createVNode(unref(CreditCard), { class: "h-4 w-4" }),
                        createVNode("span", null, "Ringkasan Pembayaran")
                      ]),
                      createVNode("div", { class: "space-y-2 text-sm" }, [
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-muted-foreground" }, "Subtotal"),
                          createVNode("span", null, toDisplayString(unref(formatCurrency)(orderDetail.value.subtotal_amount)), 1)
                        ]),
                        orderDetail.value.discount_amount > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex justify-between"
                        }, [
                          createVNode("span", { class: "text-muted-foreground" }, "Diskon"),
                          createVNode("span", { class: "text-red-600" }, "-" + toDisplayString(unref(formatCurrency)(orderDetail.value.discount_amount)), 1)
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-muted-foreground" }, "Ongkos Kirim"),
                          createVNode("span", null, toDisplayString(unref(formatCurrency)(orderDetail.value.shipping_amount)), 1)
                        ]),
                        orderDetail.value.tax_amount > 0 ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "flex justify-between"
                        }, [
                          createVNode("span", { class: "text-muted-foreground" }, "Pajak"),
                          createVNode("span", null, toDisplayString(unref(formatCurrency)(orderDetail.value.tax_amount)), 1)
                        ])) : createCommentVNode("", true),
                        createVNode(unref(_sfc_main$x)),
                        createVNode("div", { class: "flex justify-between font-semibold text-base" }, [
                          createVNode("span", null, "Total"),
                          createVNode("span", { class: "text-primary" }, toDisplayString(unref(formatCurrency)(orderDetail.value.grand_total)), 1)
                        ])
                      ])
                    ]),
                    orderDetail.value.notes ? (openBlock(), createBlock("div", {
                      key: 2,
                      class: "space-y-2"
                    }, [
                      createVNode(unref(_sfc_main$x)),
                      createVNode("div", { class: "space-y-1" }, [
                        createVNode("p", { class: "text-sm font-medium" }, "Catatan"),
                        createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(orderDetail.value.notes), 1)
                      ])
                    ])) : createCommentVNode("", true),
                    canPay.value ? (openBlock(), createBlock("div", {
                      key: 3,
                      class: "space-y-4 pt-4"
                    }, [
                      createVNode(unref(_sfc_main$x)),
                      createVNode("div", { class: "space-y-3" }, [
                        createVNode("div", { class: "flex items-center gap-2 text-sm font-medium" }, [
                          createVNode(unref(Wallet), { class: "h-4 w-4" }),
                          createVNode("span", null, "Metode Pembayaran")
                        ]),
                        createVNode(unref(_sfc_main$T), {
                          modelValue: paymentMethod.value,
                          "onUpdate:modelValue": ($event) => paymentMethod.value = $event,
                          class: "space-y-3"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", {
                              class: ["flex cursor-pointer items-center space-x-3 rounded-lg border p-3 transition-colors", {
                                "border-primary bg-primary/10": paymentMethod.value === "wallet",
                                "hover:bg-muted": paymentMethod.value !== "wallet",
                                "cursor-not-allowed opacity-50": !isWalletSufficient.value
                              }],
                              onClick: ($event) => isWalletSufficient.value && (paymentMethod.value = "wallet")
                            }, [
                              createVNode(unref(_sfc_main$U), {
                                value: "wallet",
                                id: "payment-wallet-detail",
                                disabled: !isWalletSufficient.value
                              }, null, 8, ["disabled"]),
                              createVNode(unref(_sfc_main$D), {
                                for: "payment-wallet-detail",
                                class: ["flex-1 cursor-pointer", { "cursor-not-allowed": !isWalletSufficient.value }]
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex items-start justify-between" }, [
                                    createVNode("div", null, [
                                      createVNode("div", { class: "flex items-center gap-2 font-medium text-sm" }, [
                                        createVNode(unref(Wallet), { class: "h-4 w-4" }),
                                        createTextVNode(" E-Wallet ")
                                      ]),
                                      createVNode("div", { class: "text-xs text-muted-foreground" }, " Saldo: " + toDisplayString(unref(formatCurrency)(userWalletBalance.value)), 1),
                                      !isWalletSufficient.value ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "mt-1 text-xs text-destructive"
                                      }, " Saldo tidak mencukupi (kurang " + toDisplayString(unref(formatCurrency)(orderDetail.value.grand_total - userWalletBalance.value)) + ") ", 1)) : createCommentVNode("", true)
                                    ])
                                  ])
                                ]),
                                _: 1
                              }, 8, ["class"])
                            ], 10, ["onClick"]),
                            createVNode("div", {
                              class: ["flex cursor-pointer items-center space-x-3 rounded-lg border p-3 transition-colors", {
                                "border-primary bg-primary/10": paymentMethod.value === "midtrans",
                                "hover:bg-muted": paymentMethod.value !== "midtrans"
                              }],
                              onClick: ($event) => paymentMethod.value = "midtrans"
                            }, [
                              createVNode(unref(_sfc_main$U), {
                                value: "midtrans",
                                id: "payment-midtrans-detail"
                              }),
                              createVNode(unref(_sfc_main$D), {
                                for: "payment-midtrans-detail",
                                class: "flex-1 cursor-pointer"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex items-start justify-between" }, [
                                    createVNode("div", null, [
                                      createVNode("div", { class: "flex items-center gap-2 font-medium text-sm" }, [
                                        createVNode(unref(CreditCard), { class: "h-4 w-4" }),
                                        createTextVNode(" Payment Gateway ")
                                      ]),
                                      createVNode("div", { class: "text-xs text-muted-foreground" }, " Transfer Bank, E-wallet, Kartu Kredit ")
                                    ])
                                  ])
                                ]),
                                _: 1
                              })
                            ], 10, ["onClick"])
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode(unref(_sfc_main$u), {
                        onClick: handlePayment,
                        disabled: processingPayment.value || midtransPopupOpen.value || paymentMethod.value === "wallet" && !isWalletSufficient.value,
                        class: "w-full",
                        size: "lg"
                      }, {
                        default: withCtx(() => [
                          processingPayment.value ? (openBlock(), createBlock(unref(Loader2), {
                            key: 0,
                            class: "h-4 w-4 mr-2 animate-spin"
                          })) : paymentMethod.value === "wallet" ? (openBlock(), createBlock(unref(Wallet), {
                            key: 1,
                            class: "h-4 w-4 mr-2"
                          })) : (openBlock(), createBlock(unref(CreditCard), {
                            key: 2,
                            class: "h-4 w-4 mr-2"
                          })),
                          paymentMethod.value === "wallet" ? (openBlock(), createBlock("span", { key: 3 }, " Bayar dengan E-Wallet " + toDisplayString(unref(formatCurrency)(orderDetail.value.grand_total)), 1)) : (openBlock(), createBlock("span", { key: 4 }, " Bayar " + toDisplayString(unref(formatCurrency)(orderDetail.value.grand_total)), 1))
                        ]),
                        _: 1
                      }, 8, ["disabled"])
                    ])) : createCommentVNode("", true),
                    canMarkCompleted.value ? (openBlock(), createBlock("div", {
                      key: 4,
                      class: "pt-4"
                    }, [
                      createVNode(unref(_sfc_main$u), {
                        onClick: markAsCompleted,
                        disabled: updatingStatus.value,
                        class: "w-full",
                        size: "lg"
                      }, {
                        default: withCtx(() => [
                          updatingStatus.value ? (openBlock(), createBlock(unref(Loader2), {
                            key: 0,
                            class: "h-4 w-4 mr-2 animate-spin"
                          })) : (openBlock(), createBlock(unref(CheckCircle), {
                            key: 1,
                            class: "h-4 w-4 mr-2"
                          })),
                          createTextVNode(" Tandai Pesanan Selesai ")
                        ]),
                        _: 1
                      }, 8, ["disabled"])
                    ])) : createCommentVNode("", true)
                  ])) : (openBlock(), createBlock("div", {
                    key: 2,
                    class: "flex items-center justify-center py-12 text-muted-foreground"
                  }, " Tidak ada data pesanan "))
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
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/profile/OrderDetailSheet.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "ProductReviewDialog",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean },
    orderId: {},
    orderItems: {}
  },
  emits: ["update:open", "review-submitted"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const currentItemIndex = ref(0);
    const alertMessage = ref(
      null
    );
    const processing = ref(false);
    const errors = ref({});
    const currentItem = computed(() => props.orderItems[currentItemIndex.value]);
    const hasMoreItems = computed(
      () => currentItemIndex.value < props.orderItems.length - 1
    );
    const isLastItem = computed(
      () => currentItemIndex.value === props.orderItems.length - 1
    );
    const formData = ref({
      order_item_id: 0,
      product_id: 0,
      rating: 5,
      title: "",
      comment: ""
    });
    const hoverRating = ref(0);
    const setRating = (rating) => {
      formData.value.rating = rating;
    };
    const submitReview = async () => {
      if (!currentItem.value) return;
      formData.value.order_item_id = currentItem.value.id;
      formData.value.product_id = currentItem.value.product_id;
      alertMessage.value = null;
      errors.value = {};
      processing.value = true;
      try {
        const response = await axios.post(
          `/api/client/orders/${props.orderId}/reviews`,
          formData.value
        );
        if (response.data.success) {
          const successMessage = response.data.message || "Review berhasil dikirim dan menunggu persetujuan!";
          alertMessage.value = {
            type: "success",
            message: successMessage
          };
          toast.success(successMessage);
          if (hasMoreItems.value) {
            setTimeout(() => {
              currentItemIndex.value++;
              resetForm();
              alertMessage.value = null;
            }, 1500);
          } else {
            setTimeout(() => {
              emit("update:open", false);
              emit("review-submitted");
              resetDialog();
            }, 2e3);
          }
        }
      } catch (error) {
        console.error("Submit review error:", error);
        let errorMessage = "Gagal mengirim review. Silakan coba lagi.";
        if (error.response?.data) {
          const data = error.response.data;
          if (data.message) {
            errorMessage = data.message;
          }
          if (data.errors) {
            errors.value = data.errors;
            const firstError = Object.values(data.errors)[0];
            if (Array.isArray(firstError) && firstError.length > 0) {
              errorMessage = firstError[0];
            } else if (typeof firstError === "string") {
              errorMessage = firstError;
            }
          }
        }
        alertMessage.value = {
          type: "error",
          message: errorMessage
        };
        toast.error(errorMessage);
      } finally {
        processing.value = false;
      }
    };
    const skipReview = () => {
      if (hasMoreItems.value) {
        currentItemIndex.value++;
        resetForm();
        alertMessage.value = null;
      } else {
        emit("update:open", false);
        emit("review-submitted");
        resetDialog();
      }
    };
    const resetForm = () => {
      formData.value = {
        order_item_id: 0,
        product_id: 0,
        rating: 5,
        title: "",
        comment: ""
      };
      errors.value = {};
    };
    const resetDialog = () => {
      currentItemIndex.value = 0;
      resetForm();
      alertMessage.value = null;
    };
    const handleOpenChange = (value) => {
      emit("update:open", value);
      if (!value) {
        resetDialog();
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$y), mergeProps({
        open: __props.open,
        "onUpdate:open": handleOpenChange
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$z), { class: "sm:max-w-[500px]" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$A), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$B), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Beri Rating &amp; Review`);
                            } else {
                              return [
                                createTextVNode("Beri Rating & Review")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$C), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Bagikan pengalaman Anda dengan produk ini (${ssrInterpolate(currentItemIndex.value + 1)} dari ${ssrInterpolate(__props.orderItems.length)}) `);
                            } else {
                              return [
                                createTextVNode(" Bagikan pengalaman Anda dengan produk ini (" + toDisplayString(currentItemIndex.value + 1) + " dari " + toDisplayString(__props.orderItems.length) + ") ", 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$B), null, {
                            default: withCtx(() => [
                              createTextVNode("Beri Rating & Review")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$C), null, {
                            default: withCtx(() => [
                              createTextVNode(" Bagikan pengalaman Anda dengan produk ini (" + toDisplayString(currentItemIndex.value + 1) + " dari " + toDisplayString(__props.orderItems.length) + ") ", 1)
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="space-y-6 py-4"${_scopeId2}>`);
                  if (!currentItem.value || __props.orderItems.length === 0) {
                    _push3(ssrRenderComponent(unref(_sfc_main$V), { variant: "default" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(AlertCircle), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$W), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Tidak Ada Item`);
                              } else {
                                return [
                                  createTextVNode("Tidak Ada Item")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$X), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` Tidak ada produk yang dapat direview dari pesanan ini. `);
                              } else {
                                return [
                                  createTextVNode(" Tidak ada produk yang dapat direview dari pesanan ini. ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(AlertCircle), { class: "h-4 w-4" }),
                            createVNode(unref(_sfc_main$W), null, {
                              default: withCtx(() => [
                                createTextVNode("Tidak Ada Item")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$X), null, {
                              default: withCtx(() => [
                                createTextVNode(" Tidak ada produk yang dapat direview dari pesanan ini. ")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!--[-->`);
                    if (alertMessage.value?.type === "success") {
                      _push3(ssrRenderComponent(unref(_sfc_main$V), { variant: "default" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(CheckCircle2), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(unref(_sfc_main$W), null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`Berhasil!`);
                                } else {
                                  return [
                                    createTextVNode("Berhasil!")
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(unref(_sfc_main$X), null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(alertMessage.value.message)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(alertMessage.value.message), 1)
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(unref(CheckCircle2), { class: "h-4 w-4" }),
                              createVNode(unref(_sfc_main$W), null, {
                                default: withCtx(() => [
                                  createTextVNode("Berhasil!")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$X), null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(alertMessage.value.message), 1)
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
                    if (alertMessage.value?.type === "error") {
                      _push3(ssrRenderComponent(unref(_sfc_main$V), { variant: "destructive" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(AlertCircle), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(unref(_sfc_main$W), null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`Terjadi Kesalahan`);
                                } else {
                                  return [
                                    createTextVNode("Terjadi Kesalahan")
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(unref(_sfc_main$X), null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(alertMessage.value.message)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(alertMessage.value.message), 1)
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(unref(AlertCircle), { class: "h-4 w-4" }),
                              createVNode(unref(_sfc_main$W), null, {
                                default: withCtx(() => [
                                  createTextVNode("Terjadi Kesalahan")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$X), null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(alertMessage.value.message), 1)
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
                    if (currentItem.value) {
                      _push3(`<div class="flex gap-4 rounded-lg bg-muted p-4"${_scopeId2}>`);
                      if (currentItem.value.product_image) {
                        _push3(`<img${ssrRenderAttr("src", currentItem.value.product_image)}${ssrRenderAttr("alt", currentItem.value.product_name)} class="h-20 w-20 rounded-md object-cover"${_scopeId2}>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`<div class="flex-1"${_scopeId2}><h4 class="font-medium"${_scopeId2}>${ssrInterpolate(currentItem.value.product_name)}</h4></div></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<div class="space-y-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$D), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Rating Produk`);
                        } else {
                          return [
                            createTextVNode("Rating Produk")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<div class="flex items-center gap-2"${_scopeId2}><!--[-->`);
                    ssrRenderList(5, (star) => {
                      _push3(`<button type="button" class="transition-transform hover:scale-110 focus:outline-none"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(Star), {
                        class: [
                          "h-8 w-8 transition-colors",
                          (hoverRating.value || formData.value.rating) >= star ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        ]
                      }, null, _parent3, _scopeId2));
                      _push3(`</button>`);
                    });
                    _push3(`<!--]--><span class="ml-2 text-sm text-muted-foreground"${_scopeId2}>${ssrInterpolate(formData.value.rating)} / 5 </span></div></div><div class="space-y-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$D), { for: "title" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Judul Review (Opsional)`);
                        } else {
                          return [
                            createTextVNode("Judul Review (Opsional)")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$E), {
                      id: "title",
                      modelValue: formData.value.title,
                      "onUpdate:modelValue": ($event) => formData.value.title = $event,
                      placeholder: "Ringkasan singkat pengalaman Anda",
                      maxlength: "100"
                    }, null, _parent3, _scopeId2));
                    if (errors.value.title) {
                      _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(errors.value.title)}</p>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$D), { for: "comment" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Komentar (Opsional)`);
                        } else {
                          return [
                            createTextVNode("Komentar (Opsional)")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$G), {
                      id: "comment",
                      modelValue: formData.value.comment,
                      "onUpdate:modelValue": ($event) => formData.value.comment = $event,
                      placeholder: "Ceritakan pengalaman Anda dengan produk ini...",
                      rows: "4",
                      maxlength: "500"
                    }, null, _parent3, _scopeId2));
                    _push3(`<p class="text-right text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(formData.value.comment?.length || 0)} / 500 karakter </p>`);
                    if (errors.value.comment) {
                      _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(errors.value.comment)}</p>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div><!--]-->`);
                  }
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$M), { class: "flex-col gap-2 sm:flex-row" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (currentItem.value && __props.orderItems.length > 0) {
                          _push4(`<!--[-->`);
                          if (hasMoreItems.value || isLastItem.value) {
                            _push4(ssrRenderComponent(unref(_sfc_main$u), {
                              type: "button",
                              variant: "outline",
                              onClick: skipReview,
                              disabled: processing.value
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(hasMoreItems.value ? "Lewati" : "Tutup")}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(hasMoreItems.value ? "Lewati" : "Tutup"), 1)
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(ssrRenderComponent(unref(_sfc_main$u), {
                            type: "button",
                            onClick: submitReview,
                            disabled: processing.value || formData.value.rating === 0,
                            class: "w-full sm:w-auto"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                if (processing.value) {
                                  _push5(ssrRenderComponent(unref(Loader2), { class: "mr-2 h-4 w-4 animate-spin" }, null, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                                _push5(` ${ssrInterpolate(hasMoreItems.value ? "Kirim & Lanjut" : "Kirim Review")}`);
                              } else {
                                return [
                                  processing.value ? (openBlock(), createBlock(unref(Loader2), {
                                    key: 0,
                                    class: "mr-2 h-4 w-4 animate-spin"
                                  })) : createCommentVNode("", true),
                                  createTextVNode(" " + toDisplayString(hasMoreItems.value ? "Kirim & Lanjut" : "Kirim Review"), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`<!--]-->`);
                        } else {
                          _push4(ssrRenderComponent(unref(_sfc_main$u), {
                            type: "button",
                            variant: "outline",
                            onClick: ($event) => handleOpenChange(false)
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` Tutup `);
                              } else {
                                return [
                                  createTextVNode(" Tutup ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        }
                      } else {
                        return [
                          currentItem.value && __props.orderItems.length > 0 ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                            hasMoreItems.value || isLastItem.value ? (openBlock(), createBlock(unref(_sfc_main$u), {
                              key: 0,
                              type: "button",
                              variant: "outline",
                              onClick: skipReview,
                              disabled: processing.value
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(hasMoreItems.value ? "Lewati" : "Tutup"), 1)
                              ]),
                              _: 1
                            }, 8, ["disabled"])) : createCommentVNode("", true),
                            createVNode(unref(_sfc_main$u), {
                              type: "button",
                              onClick: submitReview,
                              disabled: processing.value || formData.value.rating === 0,
                              class: "w-full sm:w-auto"
                            }, {
                              default: withCtx(() => [
                                processing.value ? (openBlock(), createBlock(unref(Loader2), {
                                  key: 0,
                                  class: "mr-2 h-4 w-4 animate-spin"
                                })) : createCommentVNode("", true),
                                createTextVNode(" " + toDisplayString(hasMoreItems.value ? "Kirim & Lanjut" : "Kirim Review"), 1)
                              ]),
                              _: 1
                            }, 8, ["disabled"])
                          ], 64)) : (openBlock(), createBlock(unref(_sfc_main$u), {
                            key: 1,
                            type: "button",
                            variant: "outline",
                            onClick: ($event) => handleOpenChange(false)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Tutup ")
                            ]),
                            _: 1
                          }, 8, ["onClick"]))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$A), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$B), null, {
                          default: withCtx(() => [
                            createTextVNode("Beri Rating & Review")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$C), null, {
                          default: withCtx(() => [
                            createTextVNode(" Bagikan pengalaman Anda dengan produk ini (" + toDisplayString(currentItemIndex.value + 1) + " dari " + toDisplayString(__props.orderItems.length) + ") ", 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "space-y-6 py-4" }, [
                      !currentItem.value || __props.orderItems.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$V), {
                        key: 0,
                        variant: "default"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(AlertCircle), { class: "h-4 w-4" }),
                          createVNode(unref(_sfc_main$W), null, {
                            default: withCtx(() => [
                              createTextVNode("Tidak Ada Item")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$X), null, {
                            default: withCtx(() => [
                              createTextVNode(" Tidak ada produk yang dapat direview dari pesanan ini. ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                        alertMessage.value?.type === "success" ? (openBlock(), createBlock(unref(_sfc_main$V), {
                          key: 0,
                          variant: "default"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(CheckCircle2), { class: "h-4 w-4" }),
                            createVNode(unref(_sfc_main$W), null, {
                              default: withCtx(() => [
                                createTextVNode("Berhasil!")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$X), null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(alertMessage.value.message), 1)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })) : createCommentVNode("", true),
                        alertMessage.value?.type === "error" ? (openBlock(), createBlock(unref(_sfc_main$V), {
                          key: 1,
                          variant: "destructive"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(AlertCircle), { class: "h-4 w-4" }),
                            createVNode(unref(_sfc_main$W), null, {
                              default: withCtx(() => [
                                createTextVNode("Terjadi Kesalahan")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$X), null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(alertMessage.value.message), 1)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })) : createCommentVNode("", true),
                        currentItem.value ? (openBlock(), createBlock("div", {
                          key: 2,
                          class: "flex gap-4 rounded-lg bg-muted p-4"
                        }, [
                          currentItem.value.product_image ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: currentItem.value.product_image,
                            alt: currentItem.value.product_name,
                            class: "h-20 w-20 rounded-md object-cover"
                          }, null, 8, ["src", "alt"])) : createCommentVNode("", true),
                          createVNode("div", { class: "flex-1" }, [
                            createVNode("h4", { class: "font-medium" }, toDisplayString(currentItem.value.product_name), 1)
                          ])
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$D), null, {
                            default: withCtx(() => [
                              createTextVNode("Rating Produk")
                            ]),
                            _: 1
                          }),
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            (openBlock(), createBlock(Fragment, null, renderList(5, (star) => {
                              return createVNode("button", {
                                key: star,
                                type: "button",
                                onClick: ($event) => setRating(star),
                                onMouseenter: ($event) => hoverRating.value = star,
                                onMouseleave: ($event) => hoverRating.value = 0,
                                class: "transition-transform hover:scale-110 focus:outline-none"
                              }, [
                                createVNode(unref(Star), {
                                  class: [
                                    "h-8 w-8 transition-colors",
                                    (hoverRating.value || formData.value.rating) >= star ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                  ]
                                }, null, 8, ["class"])
                              ], 40, ["onClick", "onMouseenter", "onMouseleave"]);
                            }), 64)),
                            createVNode("span", { class: "ml-2 text-sm text-muted-foreground" }, toDisplayString(formData.value.rating) + " / 5 ", 1)
                          ])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$D), { for: "title" }, {
                            default: withCtx(() => [
                              createTextVNode("Judul Review (Opsional)")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$E), {
                            id: "title",
                            modelValue: formData.value.title,
                            "onUpdate:modelValue": ($event) => formData.value.title = $event,
                            placeholder: "Ringkasan singkat pengalaman Anda",
                            maxlength: "100"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          errors.value.title ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive"
                          }, toDisplayString(errors.value.title), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$D), { for: "comment" }, {
                            default: withCtx(() => [
                              createTextVNode("Komentar (Opsional)")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$G), {
                            id: "comment",
                            modelValue: formData.value.comment,
                            "onUpdate:modelValue": ($event) => formData.value.comment = $event,
                            placeholder: "Ceritakan pengalaman Anda dengan produk ini...",
                            rows: "4",
                            maxlength: "500"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("p", { class: "text-right text-xs text-muted-foreground" }, toDisplayString(formData.value.comment?.length || 0) + " / 500 karakter ", 1),
                          errors.value.comment ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive"
                          }, toDisplayString(errors.value.comment), 1)) : createCommentVNode("", true)
                        ])
                      ], 64))
                    ]),
                    createVNode(unref(_sfc_main$M), { class: "flex-col gap-2 sm:flex-row" }, {
                      default: withCtx(() => [
                        currentItem.value && __props.orderItems.length > 0 ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                          hasMoreItems.value || isLastItem.value ? (openBlock(), createBlock(unref(_sfc_main$u), {
                            key: 0,
                            type: "button",
                            variant: "outline",
                            onClick: skipReview,
                            disabled: processing.value
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(hasMoreItems.value ? "Lewati" : "Tutup"), 1)
                            ]),
                            _: 1
                          }, 8, ["disabled"])) : createCommentVNode("", true),
                          createVNode(unref(_sfc_main$u), {
                            type: "button",
                            onClick: submitReview,
                            disabled: processing.value || formData.value.rating === 0,
                            class: "w-full sm:w-auto"
                          }, {
                            default: withCtx(() => [
                              processing.value ? (openBlock(), createBlock(unref(Loader2), {
                                key: 0,
                                class: "mr-2 h-4 w-4 animate-spin"
                              })) : createCommentVNode("", true),
                              createTextVNode(" " + toDisplayString(hasMoreItems.value ? "Kirim & Lanjut" : "Kirim Review"), 1)
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ], 64)) : (openBlock(), createBlock(unref(_sfc_main$u), {
                          key: 1,
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => handleOpenChange(false)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Tutup ")
                          ]),
                          _: 1
                        }, 8, ["onClick"]))
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
              createVNode(unref(_sfc_main$z), { class: "sm:max-w-[500px]" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$A), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$B), null, {
                        default: withCtx(() => [
                          createTextVNode("Beri Rating & Review")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$C), null, {
                        default: withCtx(() => [
                          createTextVNode(" Bagikan pengalaman Anda dengan produk ini (" + toDisplayString(currentItemIndex.value + 1) + " dari " + toDisplayString(__props.orderItems.length) + ") ", 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "space-y-6 py-4" }, [
                    !currentItem.value || __props.orderItems.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$V), {
                      key: 0,
                      variant: "default"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(AlertCircle), { class: "h-4 w-4" }),
                        createVNode(unref(_sfc_main$W), null, {
                          default: withCtx(() => [
                            createTextVNode("Tidak Ada Item")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$X), null, {
                          default: withCtx(() => [
                            createTextVNode(" Tidak ada produk yang dapat direview dari pesanan ini. ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                      alertMessage.value?.type === "success" ? (openBlock(), createBlock(unref(_sfc_main$V), {
                        key: 0,
                        variant: "default"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(CheckCircle2), { class: "h-4 w-4" }),
                          createVNode(unref(_sfc_main$W), null, {
                            default: withCtx(() => [
                              createTextVNode("Berhasil!")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$X), null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(alertMessage.value.message), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      alertMessage.value?.type === "error" ? (openBlock(), createBlock(unref(_sfc_main$V), {
                        key: 1,
                        variant: "destructive"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(AlertCircle), { class: "h-4 w-4" }),
                          createVNode(unref(_sfc_main$W), null, {
                            default: withCtx(() => [
                              createTextVNode("Terjadi Kesalahan")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$X), null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(alertMessage.value.message), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      currentItem.value ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "flex gap-4 rounded-lg bg-muted p-4"
                      }, [
                        currentItem.value.product_image ? (openBlock(), createBlock("img", {
                          key: 0,
                          src: currentItem.value.product_image,
                          alt: currentItem.value.product_name,
                          class: "h-20 w-20 rounded-md object-cover"
                        }, null, 8, ["src", "alt"])) : createCommentVNode("", true),
                        createVNode("div", { class: "flex-1" }, [
                          createVNode("h4", { class: "font-medium" }, toDisplayString(currentItem.value.product_name), 1)
                        ])
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$D), null, {
                          default: withCtx(() => [
                            createTextVNode("Rating Produk")
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          (openBlock(), createBlock(Fragment, null, renderList(5, (star) => {
                            return createVNode("button", {
                              key: star,
                              type: "button",
                              onClick: ($event) => setRating(star),
                              onMouseenter: ($event) => hoverRating.value = star,
                              onMouseleave: ($event) => hoverRating.value = 0,
                              class: "transition-transform hover:scale-110 focus:outline-none"
                            }, [
                              createVNode(unref(Star), {
                                class: [
                                  "h-8 w-8 transition-colors",
                                  (hoverRating.value || formData.value.rating) >= star ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                ]
                              }, null, 8, ["class"])
                            ], 40, ["onClick", "onMouseenter", "onMouseleave"]);
                          }), 64)),
                          createVNode("span", { class: "ml-2 text-sm text-muted-foreground" }, toDisplayString(formData.value.rating) + " / 5 ", 1)
                        ])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$D), { for: "title" }, {
                          default: withCtx(() => [
                            createTextVNode("Judul Review (Opsional)")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$E), {
                          id: "title",
                          modelValue: formData.value.title,
                          "onUpdate:modelValue": ($event) => formData.value.title = $event,
                          placeholder: "Ringkasan singkat pengalaman Anda",
                          maxlength: "100"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        errors.value.title ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-destructive"
                        }, toDisplayString(errors.value.title), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$D), { for: "comment" }, {
                          default: withCtx(() => [
                            createTextVNode("Komentar (Opsional)")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$G), {
                          id: "comment",
                          modelValue: formData.value.comment,
                          "onUpdate:modelValue": ($event) => formData.value.comment = $event,
                          placeholder: "Ceritakan pengalaman Anda dengan produk ini...",
                          rows: "4",
                          maxlength: "500"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("p", { class: "text-right text-xs text-muted-foreground" }, toDisplayString(formData.value.comment?.length || 0) + " / 500 karakter ", 1),
                        errors.value.comment ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-destructive"
                        }, toDisplayString(errors.value.comment), 1)) : createCommentVNode("", true)
                      ])
                    ], 64))
                  ]),
                  createVNode(unref(_sfc_main$M), { class: "flex-col gap-2 sm:flex-row" }, {
                    default: withCtx(() => [
                      currentItem.value && __props.orderItems.length > 0 ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                        hasMoreItems.value || isLastItem.value ? (openBlock(), createBlock(unref(_sfc_main$u), {
                          key: 0,
                          type: "button",
                          variant: "outline",
                          onClick: skipReview,
                          disabled: processing.value
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(hasMoreItems.value ? "Lewati" : "Tutup"), 1)
                          ]),
                          _: 1
                        }, 8, ["disabled"])) : createCommentVNode("", true),
                        createVNode(unref(_sfc_main$u), {
                          type: "button",
                          onClick: submitReview,
                          disabled: processing.value || formData.value.rating === 0,
                          class: "w-full sm:w-auto"
                        }, {
                          default: withCtx(() => [
                            processing.value ? (openBlock(), createBlock(unref(Loader2), {
                              key: 0,
                              class: "mr-2 h-4 w-4 animate-spin"
                            })) : createCommentVNode("", true),
                            createTextVNode(" " + toDisplayString(hasMoreItems.value ? "Kirim & Lanjut" : "Kirim Review"), 1)
                          ]),
                          _: 1
                        }, 8, ["disabled"])
                      ], 64)) : (openBlock(), createBlock(unref(_sfc_main$u), {
                        key: 1,
                        type: "button",
                        variant: "outline",
                        onClick: ($event) => handleOpenChange(false)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Tutup ")
                        ]),
                        _: 1
                      }, 8, ["onClick"]))
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
    };
  }
});
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/profile/ProductReviewDialog.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "OrderCard",
  __ssrInlineRender: true,
  props: {
    order: {}
  },
  setup(__props) {
    const props = __props;
    const { formatCurrency, formatDate, getStatusLabel } = useFormatter();
    const sheetOpen = ref(false);
    const reviewDialogOpen = ref(false);
    const checkingStatus = ref(false);
    const completingOrder = ref(false);
    const localStatus = ref(props.order.status);
    const localPaidAt = ref(props.order.paid_at);
    const checkPaymentStatus = async () => {
      if (checkingStatus.value) return;
      checkingStatus.value = true;
      try {
        const response = await axios.post(
          `/api/client/orders/${props.order.id}/check-payment-status`
        );
        if (response.data.success) {
          localStatus.value = response.data.status;
          if (response.data.paid_at) {
            localPaidAt.value = response.data.paid_at;
          }
          toast.success(response.data.message);
          setTimeout(() => {
            router.reload({ only: ["orders"] });
          }, 500);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Check payment status error:", error);
        toast.error(
          error.response?.data?.message || "Gagal memeriksa status pembayaran"
        );
      } finally {
        checkingStatus.value = false;
      }
    };
    const completeOrder = async () => {
      if (completingOrder.value) return;
      completingOrder.value = true;
      try {
        const response = await axios.post(
          `/api/client/orders/${props.order.id}/complete`
        );
        if (response.data.success) {
          localStatus.value = "COMPLETED";
          toast.success(
            response.data.message || "Pesanan berhasil diselesaikan"
          );
          if (response.data.items && response.data.items.length > 0) {
            props.order.items = response.data.items;
            reviewDialogOpen.value = true;
          } else {
            setTimeout(() => {
              router.reload({ only: ["orders"] });
            }, 500);
          }
        }
      } catch (error) {
        console.error("Complete order error:", error);
        toast.error(
          error.response?.data?.message || "Gagal menandai pesanan sebagai diterima"
        );
      } finally {
        completingOrder.value = false;
      }
    };
    const handleReviewSubmitted = () => {
      router.reload({ only: ["orders"] });
    };
    const openReviewDialog = () => {
      const unreviewedItems = (props.order.items || []).filter((item) => !item.has_review);
      if (unreviewedItems.length > 0) {
        props.order.items = unreviewedItems;
        reviewDialogOpen.value = true;
      } else {
        toast.info("Semua produk sudah direview");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "rounded-lg border p-4 transition-colors hover:border-primary" }, _attrs))}><div class="flex flex-col justify-between gap-4 md:flex-row md:items-center"><div class="flex-1"><div class="mb-2 flex items-center gap-3">`);
      _push(ssrRenderComponent(unref(Package), { class: "h-5 w-5 text-muted-foreground" }, null, _parent));
      _push(`<div><p class="text-sm font-semibold">${ssrInterpolate(__props.order.order_no)}</p><p class="text-xs text-muted-foreground">${ssrInterpolate(__props.order.placed_at ? unref(formatDate)(__props.order.placed_at) : "Belum ditempatkan")}</p></div></div><div class="mt-2 flex items-center gap-2">`);
      _push(ssrRenderComponent(unref(_sfc_main$t), {
        class: {
          "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-100": localStatus.value.toUpperCase() === "PENDING",
          "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100": localStatus.value.toUpperCase() === "PROCESSING" || localStatus.value.toUpperCase() === "PAID",
          "bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-100": localStatus.value.toUpperCase() === "SHIPPED",
          "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900 dark:text-emerald-100": localStatus.value.toUpperCase() === "DELIVERED" || localStatus.value.toUpperCase() === "COMPLETED",
          "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-100": localStatus.value.toUpperCase() === "CANCELLED"
        }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(getStatusLabel)(localStatus.value))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(getStatusLabel)(localStatus.value)), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (localPaidAt.value) {
        _push(ssrRenderComponent(unref(_sfc_main$t), { variant: "secondary" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(CheckCircle), { class: "mr-1 h-3 w-3" }, null, _parent2, _scopeId));
              _push2(` Dibayar `);
            } else {
              return [
                createVNode(unref(CheckCircle), { class: "mr-1 h-3 w-3" }),
                createTextVNode(" Dibayar ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="flex flex-col gap-2 md:items-end"><p class="text-lg font-bold text-primary">${ssrInterpolate(unref(formatCurrency)(__props.order.grand_total))}</p><div class="flex flex-wrap gap-2">`);
      if (localStatus.value.toUpperCase() === "PENDING" && !localPaidAt.value) {
        _push(ssrRenderComponent(unref(_sfc_main$u), {
          variant: "outline",
          size: "sm",
          disabled: checkingStatus.value,
          onClick: checkPaymentStatus
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(RefreshCw), {
                class: ["mr-1 h-3 w-3", { "animate-spin": checkingStatus.value }]
              }, null, _parent2, _scopeId));
              _push2(` Cek Status `);
            } else {
              return [
                createVNode(unref(RefreshCw), {
                  class: ["mr-1 h-3 w-3", { "animate-spin": checkingStatus.value }]
                }, null, 8, ["class"]),
                createTextVNode(" Cek Status ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (localStatus.value.toUpperCase() === "SHIPPED") {
        _push(ssrRenderComponent(unref(_sfc_main$u), {
          variant: "default",
          size: "sm",
          disabled: completingOrder.value,
          onClick: completeOrder
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(PackageCheck), { class: "mr-1 h-3 w-3" }, null, _parent2, _scopeId));
              _push2(` Pesanan Diterima `);
            } else {
              return [
                createVNode(unref(PackageCheck), { class: "mr-1 h-3 w-3" }),
                createTextVNode(" Pesanan Diterima ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (localStatus.value.toUpperCase() === "COMPLETED" && __props.order.has_unreviewed_items) {
        _push(ssrRenderComponent(unref(_sfc_main$u), {
          variant: "outline",
          size: "sm",
          onClick: openReviewDialog
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Star), { class: "mr-1 h-3 w-3" }, null, _parent2, _scopeId));
              _push2(` Tambah Review `);
            } else {
              return [
                createVNode(unref(Star), { class: "mr-1 h-3 w-3" }),
                createTextVNode(" Tambah Review ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(unref(_sfc_main$u), {
        variant: "outline",
        size: "sm",
        onClick: ($event) => sheetOpen.value = true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Lihat Detail `);
          } else {
            return [
              createTextVNode(" Lihat Detail ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
      _push(ssrRenderComponent(_sfc_main$i, {
        open: sheetOpen.value,
        "onUpdate:open": ($event) => sheetOpen.value = $event,
        "order-id": __props.order.id
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$h, {
        open: reviewDialogOpen.value,
        "onUpdate:open": ($event) => reviewDialogOpen.value = $event,
        "order-id": __props.order.id,
        "order-items": __props.order.items || [],
        onReviewSubmitted: handleReviewSubmitted
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/profile/OrderCard.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "OrdersTab",
  __ssrInlineRender: true,
  props: {
    orders: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$o), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$v), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$w), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Pesanan Saya`);
                      } else {
                        return [
                          createTextVNode("Pesanan Saya")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$N), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Riwayat pesanan dan status pengiriman `);
                      } else {
                        return [
                          createTextVNode(" Riwayat pesanan dan status pengiriman ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$w), null, {
                      default: withCtx(() => [
                        createTextVNode("Pesanan Saya")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$N), null, {
                      default: withCtx(() => [
                        createTextVNode(" Riwayat pesanan dan status pengiriman ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$p), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (__props.orders.length > 0) {
                    _push3(`<div class="space-y-4"${_scopeId2}><!--[-->`);
                    ssrRenderList(__props.orders, (order) => {
                      _push3(ssrRenderComponent(_sfc_main$g, {
                        key: order.id,
                        order
                      }, null, _parent3, _scopeId2));
                    });
                    _push3(`<!--]--></div>`);
                  } else {
                    _push3(`<div class="py-12 text-center"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Package), { class: "h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-20" }, null, _parent3, _scopeId2));
                    _push3(`<p class="text-muted-foreground mb-4"${_scopeId2}>Belum ada pesanan</p>`);
                    _push3(ssrRenderComponent(unref(Link), { href: "/beranda" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(_sfc_main$u), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` Mulai Belanja `);
                              } else {
                                return [
                                  createTextVNode(" Mulai Belanja ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(_sfc_main$u), null, {
                              default: withCtx(() => [
                                createTextVNode(" Mulai Belanja ")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  }
                } else {
                  return [
                    __props.orders.length > 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-4"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.orders, (order) => {
                        return openBlock(), createBlock(_sfc_main$g, {
                          key: order.id,
                          order
                        }, null, 8, ["order"]);
                      }), 128))
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "py-12 text-center"
                    }, [
                      createVNode(unref(Package), { class: "h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-20" }),
                      createVNode("p", { class: "text-muted-foreground mb-4" }, "Belum ada pesanan"),
                      createVNode(unref(Link), { href: "/beranda" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$u), null, {
                            default: withCtx(() => [
                              createTextVNode(" Mulai Belanja ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$v), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$w), null, {
                    default: withCtx(() => [
                      createTextVNode("Pesanan Saya")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$N), null, {
                    default: withCtx(() => [
                      createTextVNode(" Riwayat pesanan dan status pengiriman ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$p), null, {
                default: withCtx(() => [
                  __props.orders.length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "space-y-4"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.orders, (order) => {
                      return openBlock(), createBlock(_sfc_main$g, {
                        key: order.id,
                        order
                      }, null, 8, ["order"]);
                    }), 128))
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "py-12 text-center"
                  }, [
                    createVNode(unref(Package), { class: "h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-20" }),
                    createVNode("p", { class: "text-muted-foreground mb-4" }, "Belum ada pesanan"),
                    createVNode(unref(Link), { href: "/beranda" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$u), null, {
                          default: withCtx(() => [
                            createTextVNode(" Mulai Belanja ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]))
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
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/profile/OrdersTab.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "WalletBalance",
  __ssrInlineRender: true,
  props: {
    balance: {}
  },
  emits: ["topup", "withdrawal"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const { formatCurrency } = useFormatter();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$o), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$p), { class: "pt-6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-center"${_scopeId2}><p class="text-sm text-muted-foreground mb-2"${_scopeId2}>Saldo E-Wallet</p><p class="text-4xl font-bold text-primary mb-4"${_scopeId2}>${ssrInterpolate(unref(formatCurrency)(__props.balance))}</p><div class="flex gap-3 justify-center"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$u), {
                    onClick: ($event) => emit("topup"),
                    size: "sm"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(ArrowDownLeft), { class: "w-4 h-4 mr-2" }, null, _parent4, _scopeId3));
                        _push4(` Top Up `);
                      } else {
                        return [
                          createVNode(unref(ArrowDownLeft), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Top Up ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$u), {
                    onClick: ($event) => emit("withdrawal"),
                    variant: "outline",
                    size: "sm"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(ArrowUpRight), { class: "w-4 h-4 mr-2" }, null, _parent4, _scopeId3));
                        _push4(` Tarik Dana `);
                      } else {
                        return [
                          createVNode(unref(ArrowUpRight), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Tarik Dana ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "text-center" }, [
                      createVNode("p", { class: "text-sm text-muted-foreground mb-2" }, "Saldo E-Wallet"),
                      createVNode("p", { class: "text-4xl font-bold text-primary mb-4" }, toDisplayString(unref(formatCurrency)(__props.balance)), 1),
                      createVNode("div", { class: "flex gap-3 justify-center" }, [
                        createVNode(unref(_sfc_main$u), {
                          onClick: ($event) => emit("topup"),
                          size: "sm"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(ArrowDownLeft), { class: "w-4 h-4 mr-2" }),
                            createTextVNode(" Top Up ")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(unref(_sfc_main$u), {
                          onClick: ($event) => emit("withdrawal"),
                          variant: "outline",
                          size: "sm"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(ArrowUpRight), { class: "w-4 h-4 mr-2" }),
                            createTextVNode(" Tarik Dana ")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$p), { class: "pt-6" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-center" }, [
                    createVNode("p", { class: "text-sm text-muted-foreground mb-2" }, "Saldo E-Wallet"),
                    createVNode("p", { class: "text-4xl font-bold text-primary mb-4" }, toDisplayString(unref(formatCurrency)(__props.balance)), 1),
                    createVNode("div", { class: "flex gap-3 justify-center" }, [
                      createVNode(unref(_sfc_main$u), {
                        onClick: ($event) => emit("topup"),
                        size: "sm"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(ArrowDownLeft), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Top Up ")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(unref(_sfc_main$u), {
                        onClick: ($event) => emit("withdrawal"),
                        variant: "outline",
                        size: "sm"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(ArrowUpRight), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Tarik Dana ")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
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
    };
  }
});
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/profile/wallet/WalletBalance.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "WalletTopupForm",
  __ssrInlineRender: true,
  emits: ["cancel"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const form = useForm({
      amount: "",
      payment_method: "midtrans"
      // static identifier
    });
    const snapLoaded = ref(false);
    const snapLoadError = ref(false);
    onMounted(() => {
      if (window.snap) {
        snapLoaded.value = true;
        return;
      }
      if (typeof window === "undefined") return;
      const handler = () => {
        if (window.snap) {
          snapLoaded.value = true;
          snapLoadError.value = false;
          console.log("Midtrans Snap loaded (event).");
        }
      };
      window.addEventListener("midtrans:snap:loaded", handler, { once: true });
      setTimeout(() => {
        if (!snapLoaded.value) {
          if (window.snap) {
            snapLoaded.value = true;
            console.log("Midtrans Snap loaded (fallback).");
          } else {
            snapLoadError.value = true;
            console.error("Failed to load Midtrans Snap (timeout).");
          }
        }
      }, 5e3);
    });
    const openSnapModal = (snapToken) => {
      if (!window.snap) {
        console.error("Snap not available");
        alert("Pembayaran tidak dapat diproses. Silakan refresh halaman dan coba lagi.");
        emit("cancel");
        return;
      }
      try {
        window.snap.pay(snapToken, {
          onSuccess: function(result) {
            console.log("Payment success:", result);
            toast.success("Pembayaran berhasil.");
            if (typeof window !== "undefined") {
              window.location.href = "/client/profile?tab=wallet";
            }
          },
          onPending: function(result) {
            console.log("Payment pending:", result);
            toast.info("Pembayaran sedang diproses.");
            if (typeof window !== "undefined") {
              window.location.href = "/client/profile?tab=wallet";
            }
          },
          onError: function(result) {
            console.error("Payment error (Midtrans):", result);
            toast.error("Pembayaran gagal.");
            try {
              console.log("Midtrans raw error JSON:", JSON.stringify(result, null, 2));
            } catch {
            }
            const message = result?.status_message || result?.status_code || "Terjadi kesalahan pembayaran.";
            const advisory = result?.status_code === "505" ? "\nCatatan: Sandbox sering menolak VA dengan nominal rendah (coba >= 15000 atau metode lain)." : "";
            if (result?.status_code === "505") {
              alert("Midtrans Error: " + message + advisory + "\nSandbox akan otomatis mencoba QRIS.");
              retryAlternate("qris");
              return;
            }
            alert("Midtrans Error: " + message + "\nSilakan coba metode lain atau refresh.");
            emit("cancel");
          },
          onClose: function() {
            console.log("Payment modal closed");
            toast("Pembayaran ditutup sebelum selesai.");
            emit("cancel");
          }
        });
      } catch (error) {
        console.error("Error opening Snap modal:", error);
        alert("Terjadi kesalahan saat membuka pembayaran. Silakan coba lagi.");
        toast.error("Terjadi kesalahan saat membuka pembayaran. Silakan coba lagi.");
        emit("cancel");
      }
    };
    const submitForm = async () => {
      if (form.processing) return;
      if (!snapLoaded.value || !window.snap) {
        toast.error("Sistem pembayaran belum siap. Silakan tunggu beberapa saat atau refresh halaman.");
        return;
      }
      try {
        form.processing = true;
        const response = await axios.post("/client/wallet/topup", {
          amount: form.amount,
          payment_method: form.payment_method
        });
        const data = response.data;
        const snapToken = data.snap_token;
        if (data.success === false && data.message) {
          toast.error(data.message);
          form.processing = false;
          return;
        }
        if (snapToken && typeof snapToken === "string" && snapToken.trim() !== "") {
          form.reset();
          form.processing = false;
          setTimeout(() => {
            openSnapModal(snapToken);
          }, 100);
        } else {
          form.processing = false;
          console.error("Invalid snap token:", snapToken);
          console.error("Full response:", data);
          toast.error("Gagal mendapatkan token pembayaran. Silakan coba lagi.");
          form.reset();
          emit("cancel");
        }
      } catch (error) {
        form.processing = false;
        console.error("Form submission error:", error);
        toast.error("Terjadi kesalahan saat mengirim formulir.");
        if (error.response?.status === 422 && error.response?.data?.errors) {
          const errors = error.response.data.errors;
          const firstError = Object.values(errors)[0];
          const errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
          toast.error(errorMessage);
        } else {
          const errorMessage = error.response?.data?.message || error.message || "Terjadi kesalahan. Silakan coba lagi.";
          toast.error(errorMessage);
        }
        form.reset();
      }
    };
    const retryAlternate = async (method) => {
      if (form.processing) return;
      if (!snapLoaded.value || !window.snap) {
        alert("Sistem pembayaran belum siap untuk retry.");
        return;
      }
      try {
        form.processing = true;
        const response = await axios.post("/client/wallet/topup", {
          amount: form.amount || "20000",
          payment_method: form.payment_method,
          force_payment: method
        });
        const data = response.data;
        const snapToken = data.snap_token;
        if (!data.success || !snapToken) {
          toast.error(data.message || "Retry gagal mendapatkan token.");
          form.processing = false;
          return;
        }
        form.processing = false;
        toast.success("Metode dialihkan ke " + method.toUpperCase() + ". Silakan lanjutkan pembayaran.");
        openSnapModal(snapToken);
      } catch (e) {
        form.processing = false;
        toast.error(e?.response?.data?.message || e.message || "Retry gagal.");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$o), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$v), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$w), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Top Up E-Wallet`);
                      } else {
                        return [
                          createTextVNode("Top Up E-Wallet")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$N), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Isi saldo e-wallet Anda melalui Midtrans `);
                      } else {
                        return [
                          createTextVNode(" Isi saldo e-wallet Anda melalui Midtrans ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$w), null, {
                      default: withCtx(() => [
                        createTextVNode("Top Up E-Wallet")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$N), null, {
                      default: withCtx(() => [
                        createTextVNode(" Isi saldo e-wallet Anda melalui Midtrans ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$p), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<form class="space-y-6"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$D), { for: "topup_amount" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Jumlah Top Up <span class="text-red-500"${_scopeId3}>*</span>`);
                      } else {
                        return [
                          createTextVNode(" Jumlah Top Up "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="relative"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(CreditCard), { class: "absolute left-3 top-3 h-4 w-4 text-gray-400" }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$E), {
                    id: "topup_amount",
                    modelValue: unref(form).amount,
                    "onUpdate:modelValue": ($event) => unref(form).amount = $event,
                    type: "number",
                    placeholder: "Minimal Rp 10.000",
                    class: "pl-10",
                    min: "10000",
                    max: "10000000",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><p class="text-xs text-muted-foreground"${_scopeId2}> Minimum Rp 10.000 - Maximum Rp 10.000.000. Disarankan &gt;= Rp 15.000 untuk Virtual Account agar tidak ditolak (505). </p>`);
                  if (unref(form).errors.amount) {
                    _push3(`<p class="text-sm text-red-500"${_scopeId2}>${ssrInterpolate(unref(form).errors.amount)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900 rounded-lg"${_scopeId2}><div class="flex items-start gap-3"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(CreditCard), { class: "w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" }, null, _parent3, _scopeId2));
                  _push3(`<div${_scopeId2}><p class="text-sm font-semibold text-blue-900 dark:text-blue-100"${_scopeId2}> Pembayaran via Midtrans </p><p class="text-xs text-blue-700 dark:text-blue-300 mt-1"${_scopeId2}> Anda akan diarahkan ke halaman pembayaran Midtrans untuk menyelesaikan transaksi </p></div></div></div>`);
                  if (snapLoadError.value) {
                    _push3(`<div class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-lg"${_scopeId2}><div class="flex items-start gap-3"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(AlertCircle), { class: "w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" }, null, _parent3, _scopeId2));
                    _push3(`<div${_scopeId2}><p class="text-sm font-semibold text-red-900 dark:text-red-100"${_scopeId2}> Sistem Pembayaran Belum Siap </p><p class="text-xs text-red-700 dark:text-red-300 mt-1"${_scopeId2}> Silakan refresh halaman untuk memuat ulang sistem pembayaran. </p></div></div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<div class="flex items-center justify-end gap-3"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$u), {
                    type: "button",
                    variant: "outline",
                    onClick: ($event) => {
                      unref(form).reset();
                      emit("cancel");
                    },
                    disabled: unref(form).processing
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Batal `);
                      } else {
                        return [
                          createTextVNode(" Batal ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$u), {
                    type: "submit",
                    disabled: unref(form).processing || snapLoadError.value || !snapLoaded.value
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (unref(form).processing) {
                          _push4(`<span${_scopeId3}>Memproses...</span>`);
                        } else if (!snapLoaded.value && !snapLoadError.value) {
                          _push4(`<span${_scopeId3}>Memuat sistem pembayaran...</span>`);
                        } else if (snapLoadError.value) {
                          _push4(`<span${_scopeId3}>Sistem pembayaran error</span>`);
                        } else {
                          _push4(`<span${_scopeId3}>Lanjut ke Pembayaran</span>`);
                        }
                      } else {
                        return [
                          unref(form).processing ? (openBlock(), createBlock("span", { key: 0 }, "Memproses...")) : !snapLoaded.value && !snapLoadError.value ? (openBlock(), createBlock("span", { key: 1 }, "Memuat sistem pembayaran...")) : snapLoadError.value ? (openBlock(), createBlock("span", { key: 2 }, "Sistem pembayaran error")) : (openBlock(), createBlock("span", { key: 3 }, "Lanjut ke Pembayaran"))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></form>`);
                } else {
                  return [
                    createVNode("form", {
                      onSubmit: withModifiers(submitForm, ["prevent"]),
                      class: "space-y-6"
                    }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$D), { for: "topup_amount" }, {
                          default: withCtx(() => [
                            createTextVNode(" Jumlah Top Up "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "relative" }, [
                          createVNode(unref(CreditCard), { class: "absolute left-3 top-3 h-4 w-4 text-gray-400" }),
                          createVNode(unref(_sfc_main$E), {
                            id: "topup_amount",
                            modelValue: unref(form).amount,
                            "onUpdate:modelValue": ($event) => unref(form).amount = $event,
                            type: "number",
                            placeholder: "Minimal Rp 10.000",
                            class: "pl-10",
                            min: "10000",
                            max: "10000000",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, " Minimum Rp 10.000 - Maximum Rp 10.000.000. Disarankan >= Rp 15.000 untuk Virtual Account agar tidak ditolak (505). "),
                        unref(form).errors.amount ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-red-500"
                        }, toDisplayString(unref(form).errors.amount), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900 rounded-lg" }, [
                        createVNode("div", { class: "flex items-start gap-3" }, [
                          createVNode(unref(CreditCard), { class: "w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" }),
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm font-semibold text-blue-900 dark:text-blue-100" }, " Pembayaran via Midtrans "),
                            createVNode("p", { class: "text-xs text-blue-700 dark:text-blue-300 mt-1" }, " Anda akan diarahkan ke halaman pembayaran Midtrans untuk menyelesaikan transaksi ")
                          ])
                        ])
                      ]),
                      snapLoadError.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-lg"
                      }, [
                        createVNode("div", { class: "flex items-start gap-3" }, [
                          createVNode(unref(AlertCircle), { class: "w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" }),
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm font-semibold text-red-900 dark:text-red-100" }, " Sistem Pembayaran Belum Siap "),
                            createVNode("p", { class: "text-xs text-red-700 dark:text-red-300 mt-1" }, " Silakan refresh halaman untuk memuat ulang sistem pembayaran. ")
                          ])
                        ])
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "flex items-center justify-end gap-3" }, [
                        createVNode(unref(_sfc_main$u), {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => {
                            unref(form).reset();
                            emit("cancel");
                          },
                          disabled: unref(form).processing
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Batal ")
                          ]),
                          _: 1
                        }, 8, ["onClick", "disabled"]),
                        createVNode(unref(_sfc_main$u), {
                          type: "submit",
                          disabled: unref(form).processing || snapLoadError.value || !snapLoaded.value
                        }, {
                          default: withCtx(() => [
                            unref(form).processing ? (openBlock(), createBlock("span", { key: 0 }, "Memproses...")) : !snapLoaded.value && !snapLoadError.value ? (openBlock(), createBlock("span", { key: 1 }, "Memuat sistem pembayaran...")) : snapLoadError.value ? (openBlock(), createBlock("span", { key: 2 }, "Sistem pembayaran error")) : (openBlock(), createBlock("span", { key: 3 }, "Lanjut ke Pembayaran"))
                          ]),
                          _: 1
                        }, 8, ["disabled"])
                      ])
                    ], 32)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$v), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$w), null, {
                    default: withCtx(() => [
                      createTextVNode("Top Up E-Wallet")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$N), null, {
                    default: withCtx(() => [
                      createTextVNode(" Isi saldo e-wallet Anda melalui Midtrans ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$p), null, {
                default: withCtx(() => [
                  createVNode("form", {
                    onSubmit: withModifiers(submitForm, ["prevent"]),
                    class: "space-y-6"
                  }, [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$D), { for: "topup_amount" }, {
                        default: withCtx(() => [
                          createTextVNode(" Jumlah Top Up "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "relative" }, [
                        createVNode(unref(CreditCard), { class: "absolute left-3 top-3 h-4 w-4 text-gray-400" }),
                        createVNode(unref(_sfc_main$E), {
                          id: "topup_amount",
                          modelValue: unref(form).amount,
                          "onUpdate:modelValue": ($event) => unref(form).amount = $event,
                          type: "number",
                          placeholder: "Minimal Rp 10.000",
                          class: "pl-10",
                          min: "10000",
                          max: "10000000",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("p", { class: "text-xs text-muted-foreground" }, " Minimum Rp 10.000 - Maximum Rp 10.000.000. Disarankan >= Rp 15.000 untuk Virtual Account agar tidak ditolak (505). "),
                      unref(form).errors.amount ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-red-500"
                      }, toDisplayString(unref(form).errors.amount), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900 rounded-lg" }, [
                      createVNode("div", { class: "flex items-start gap-3" }, [
                        createVNode(unref(CreditCard), { class: "w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" }),
                        createVNode("div", null, [
                          createVNode("p", { class: "text-sm font-semibold text-blue-900 dark:text-blue-100" }, " Pembayaran via Midtrans "),
                          createVNode("p", { class: "text-xs text-blue-700 dark:text-blue-300 mt-1" }, " Anda akan diarahkan ke halaman pembayaran Midtrans untuk menyelesaikan transaksi ")
                        ])
                      ])
                    ]),
                    snapLoadError.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-lg"
                    }, [
                      createVNode("div", { class: "flex items-start gap-3" }, [
                        createVNode(unref(AlertCircle), { class: "w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" }),
                        createVNode("div", null, [
                          createVNode("p", { class: "text-sm font-semibold text-red-900 dark:text-red-100" }, " Sistem Pembayaran Belum Siap "),
                          createVNode("p", { class: "text-xs text-red-700 dark:text-red-300 mt-1" }, " Silakan refresh halaman untuk memuat ulang sistem pembayaran. ")
                        ])
                      ])
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "flex items-center justify-end gap-3" }, [
                      createVNode(unref(_sfc_main$u), {
                        type: "button",
                        variant: "outline",
                        onClick: ($event) => {
                          unref(form).reset();
                          emit("cancel");
                        },
                        disabled: unref(form).processing
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Batal ")
                        ]),
                        _: 1
                      }, 8, ["onClick", "disabled"]),
                      createVNode(unref(_sfc_main$u), {
                        type: "submit",
                        disabled: unref(form).processing || snapLoadError.value || !snapLoaded.value
                      }, {
                        default: withCtx(() => [
                          unref(form).processing ? (openBlock(), createBlock("span", { key: 0 }, "Memproses...")) : !snapLoaded.value && !snapLoadError.value ? (openBlock(), createBlock("span", { key: 1 }, "Memuat sistem pembayaran...")) : snapLoadError.value ? (openBlock(), createBlock("span", { key: 2 }, "Sistem pembayaran error")) : (openBlock(), createBlock("span", { key: 3 }, "Lanjut ke Pembayaran"))
                        ]),
                        _: 1
                      }, 8, ["disabled"])
                    ])
                  ], 32)
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
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/profile/wallet/WalletTopupForm.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "WalletWithdrawalForm",
  __ssrInlineRender: true,
  props: {
    maxAmount: {}
  },
  emits: ["cancel"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const form = useForm({
      amount: "",
      bank_name: "",
      bank_account: "",
      bank_holder: ""
    });
    const submitForm = () => {
      form.post("/client/wallet/withdrawal", {
        preserveScroll: true,
        onSuccess: () => {
          form.reset();
          emit("cancel");
          toast.success("Permintaan penarikan berhasil diajukan.");
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$o), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$v), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$w), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Tarik Dana E-Wallet`);
                      } else {
                        return [
                          createTextVNode("Tarik Dana E-Wallet")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$N), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Tarik saldo ke rekening bank Anda `);
                      } else {
                        return [
                          createTextVNode(" Tarik saldo ke rekening bank Anda ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$w), null, {
                      default: withCtx(() => [
                        createTextVNode("Tarik Dana E-Wallet")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$N), null, {
                      default: withCtx(() => [
                        createTextVNode(" Tarik saldo ke rekening bank Anda ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$p), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<form class="space-y-6"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$D), { for: "withdrawal_amount" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Jumlah Penarikan <span class="text-red-500"${_scopeId3}>*</span>`);
                      } else {
                        return [
                          createTextVNode(" Jumlah Penarikan "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="relative"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(CreditCard), { class: "absolute left-3 top-3 h-4 w-4 text-gray-400" }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$E), {
                    id: "withdrawal_amount",
                    modelValue: unref(form).amount,
                    "onUpdate:modelValue": ($event) => unref(form).amount = $event,
                    type: "number",
                    placeholder: "Minimal Rp 50.000",
                    class: "pl-10",
                    min: "50000",
                    max: __props.maxAmount,
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><p class="text-xs text-muted-foreground"${_scopeId2}> Minimum Rp 50.000 - Maksimal Rp ${ssrInterpolate(__props.maxAmount.toLocaleString("id-ID"))}</p>`);
                  if (unref(form).errors.amount) {
                    _push3(`<p class="text-sm text-red-500"${_scopeId2}>${ssrInterpolate(unref(form).errors.amount)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$x), null, null, _parent3, _scopeId2));
                  _push3(`<div class="space-y-4"${_scopeId2}><h4 class="font-semibold"${_scopeId2}>Informasi Rekening</h4><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$D), { for: "bank_name" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Nama Bank <span class="text-red-500"${_scopeId3}>*</span>`);
                      } else {
                        return [
                          createTextVNode(" Nama Bank "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$E), {
                    id: "bank_name",
                    modelValue: unref(form).bank_name,
                    "onUpdate:modelValue": ($event) => unref(form).bank_name = $event,
                    type: "text",
                    placeholder: "e.g., BCA, Mandiri, BNI",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  if (unref(form).errors.bank_name) {
                    _push3(`<p class="text-sm text-red-500"${_scopeId2}>${ssrInterpolate(unref(form).errors.bank_name)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$D), { for: "bank_account" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Nomor Rekening <span class="text-red-500"${_scopeId3}>*</span>`);
                      } else {
                        return [
                          createTextVNode(" Nomor Rekening "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$E), {
                    id: "bank_account",
                    modelValue: unref(form).bank_account,
                    "onUpdate:modelValue": ($event) => unref(form).bank_account = $event,
                    type: "text",
                    placeholder: "Nomor rekening bank",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  if (unref(form).errors.bank_account) {
                    _push3(`<p class="text-sm text-red-500"${_scopeId2}>${ssrInterpolate(unref(form).errors.bank_account)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$D), { for: "bank_holder" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Nama Pemilik Rekening <span class="text-red-500"${_scopeId3}>*</span>`);
                      } else {
                        return [
                          createTextVNode(" Nama Pemilik Rekening "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$E), {
                    id: "bank_holder",
                    modelValue: unref(form).bank_holder,
                    "onUpdate:modelValue": ($event) => unref(form).bank_holder = $event,
                    type: "text",
                    placeholder: "Nama sesuai rekening bank",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  if (unref(form).errors.bank_holder) {
                    _push3(`<p class="text-sm text-red-500"${_scopeId2}>${ssrInterpolate(unref(form).errors.bank_holder)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div></div><div class="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900 rounded-lg"${_scopeId2}><p class="text-sm text-amber-700 dark:text-amber-300"${_scopeId2}><strong${_scopeId2}>Catatan:</strong> Penarikan akan diproses dalam 1-3 hari kerja. Pastikan data rekening sudah benar. </p></div><div class="flex items-center justify-end gap-3"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$u), {
                    type: "button",
                    variant: "outline",
                    onClick: ($event) => {
                      unref(form).reset();
                      emit("cancel");
                    },
                    disabled: unref(form).processing
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Batal `);
                      } else {
                        return [
                          createTextVNode(" Batal ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$u), {
                    type: "submit",
                    disabled: unref(form).processing
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(unref(form).processing ? "Memproses..." : "Ajukan Penarikan")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(unref(form).processing ? "Memproses..." : "Ajukan Penarikan"), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></form>`);
                } else {
                  return [
                    createVNode("form", {
                      onSubmit: withModifiers(submitForm, ["prevent"]),
                      class: "space-y-6"
                    }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$D), { for: "withdrawal_amount" }, {
                          default: withCtx(() => [
                            createTextVNode(" Jumlah Penarikan "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "relative" }, [
                          createVNode(unref(CreditCard), { class: "absolute left-3 top-3 h-4 w-4 text-gray-400" }),
                          createVNode(unref(_sfc_main$E), {
                            id: "withdrawal_amount",
                            modelValue: unref(form).amount,
                            "onUpdate:modelValue": ($event) => unref(form).amount = $event,
                            type: "number",
                            placeholder: "Minimal Rp 50.000",
                            class: "pl-10",
                            min: "50000",
                            max: __props.maxAmount,
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "max"])
                        ]),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, " Minimum Rp 50.000 - Maksimal Rp " + toDisplayString(__props.maxAmount.toLocaleString("id-ID")), 1),
                        unref(form).errors.amount ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-red-500"
                        }, toDisplayString(unref(form).errors.amount), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode(unref(_sfc_main$x)),
                      createVNode("div", { class: "space-y-4" }, [
                        createVNode("h4", { class: "font-semibold" }, "Informasi Rekening"),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$D), { for: "bank_name" }, {
                            default: withCtx(() => [
                              createTextVNode(" Nama Bank "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$E), {
                            id: "bank_name",
                            modelValue: unref(form).bank_name,
                            "onUpdate:modelValue": ($event) => unref(form).bank_name = $event,
                            type: "text",
                            placeholder: "e.g., BCA, Mandiri, BNI",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          unref(form).errors.bank_name ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-red-500"
                          }, toDisplayString(unref(form).errors.bank_name), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$D), { for: "bank_account" }, {
                            default: withCtx(() => [
                              createTextVNode(" Nomor Rekening "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$E), {
                            id: "bank_account",
                            modelValue: unref(form).bank_account,
                            "onUpdate:modelValue": ($event) => unref(form).bank_account = $event,
                            type: "text",
                            placeholder: "Nomor rekening bank",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          unref(form).errors.bank_account ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-red-500"
                          }, toDisplayString(unref(form).errors.bank_account), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$D), { for: "bank_holder" }, {
                            default: withCtx(() => [
                              createTextVNode(" Nama Pemilik Rekening "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$E), {
                            id: "bank_holder",
                            modelValue: unref(form).bank_holder,
                            "onUpdate:modelValue": ($event) => unref(form).bank_holder = $event,
                            type: "text",
                            placeholder: "Nama sesuai rekening bank",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          unref(form).errors.bank_holder ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-red-500"
                          }, toDisplayString(unref(form).errors.bank_holder), 1)) : createCommentVNode("", true)
                        ])
                      ]),
                      createVNode("div", { class: "p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900 rounded-lg" }, [
                        createVNode("p", { class: "text-sm text-amber-700 dark:text-amber-300" }, [
                          createVNode("strong", null, "Catatan:"),
                          createTextVNode(" Penarikan akan diproses dalam 1-3 hari kerja. Pastikan data rekening sudah benar. ")
                        ])
                      ]),
                      createVNode("div", { class: "flex items-center justify-end gap-3" }, [
                        createVNode(unref(_sfc_main$u), {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => {
                            unref(form).reset();
                            emit("cancel");
                          },
                          disabled: unref(form).processing
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Batal ")
                          ]),
                          _: 1
                        }, 8, ["onClick", "disabled"]),
                        createVNode(unref(_sfc_main$u), {
                          type: "submit",
                          disabled: unref(form).processing
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(form).processing ? "Memproses..." : "Ajukan Penarikan"), 1)
                          ]),
                          _: 1
                        }, 8, ["disabled"])
                      ])
                    ], 32)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$v), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$w), null, {
                    default: withCtx(() => [
                      createTextVNode("Tarik Dana E-Wallet")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$N), null, {
                    default: withCtx(() => [
                      createTextVNode(" Tarik saldo ke rekening bank Anda ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$p), null, {
                default: withCtx(() => [
                  createVNode("form", {
                    onSubmit: withModifiers(submitForm, ["prevent"]),
                    class: "space-y-6"
                  }, [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$D), { for: "withdrawal_amount" }, {
                        default: withCtx(() => [
                          createTextVNode(" Jumlah Penarikan "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "relative" }, [
                        createVNode(unref(CreditCard), { class: "absolute left-3 top-3 h-4 w-4 text-gray-400" }),
                        createVNode(unref(_sfc_main$E), {
                          id: "withdrawal_amount",
                          modelValue: unref(form).amount,
                          "onUpdate:modelValue": ($event) => unref(form).amount = $event,
                          type: "number",
                          placeholder: "Minimal Rp 50.000",
                          class: "pl-10",
                          min: "50000",
                          max: __props.maxAmount,
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "max"])
                      ]),
                      createVNode("p", { class: "text-xs text-muted-foreground" }, " Minimum Rp 50.000 - Maksimal Rp " + toDisplayString(__props.maxAmount.toLocaleString("id-ID")), 1),
                      unref(form).errors.amount ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-red-500"
                      }, toDisplayString(unref(form).errors.amount), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode(unref(_sfc_main$x)),
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode("h4", { class: "font-semibold" }, "Informasi Rekening"),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$D), { for: "bank_name" }, {
                          default: withCtx(() => [
                            createTextVNode(" Nama Bank "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$E), {
                          id: "bank_name",
                          modelValue: unref(form).bank_name,
                          "onUpdate:modelValue": ($event) => unref(form).bank_name = $event,
                          type: "text",
                          placeholder: "e.g., BCA, Mandiri, BNI",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        unref(form).errors.bank_name ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-red-500"
                        }, toDisplayString(unref(form).errors.bank_name), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$D), { for: "bank_account" }, {
                          default: withCtx(() => [
                            createTextVNode(" Nomor Rekening "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$E), {
                          id: "bank_account",
                          modelValue: unref(form).bank_account,
                          "onUpdate:modelValue": ($event) => unref(form).bank_account = $event,
                          type: "text",
                          placeholder: "Nomor rekening bank",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        unref(form).errors.bank_account ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-red-500"
                        }, toDisplayString(unref(form).errors.bank_account), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$D), { for: "bank_holder" }, {
                          default: withCtx(() => [
                            createTextVNode(" Nama Pemilik Rekening "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$E), {
                          id: "bank_holder",
                          modelValue: unref(form).bank_holder,
                          "onUpdate:modelValue": ($event) => unref(form).bank_holder = $event,
                          type: "text",
                          placeholder: "Nama sesuai rekening bank",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        unref(form).errors.bank_holder ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-red-500"
                        }, toDisplayString(unref(form).errors.bank_holder), 1)) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("div", { class: "p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900 rounded-lg" }, [
                      createVNode("p", { class: "text-sm text-amber-700 dark:text-amber-300" }, [
                        createVNode("strong", null, "Catatan:"),
                        createTextVNode(" Penarikan akan diproses dalam 1-3 hari kerja. Pastikan data rekening sudah benar. ")
                      ])
                    ]),
                    createVNode("div", { class: "flex items-center justify-end gap-3" }, [
                      createVNode(unref(_sfc_main$u), {
                        type: "button",
                        variant: "outline",
                        onClick: ($event) => {
                          unref(form).reset();
                          emit("cancel");
                        },
                        disabled: unref(form).processing
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Batal ")
                        ]),
                        _: 1
                      }, 8, ["onClick", "disabled"]),
                      createVNode(unref(_sfc_main$u), {
                        type: "submit",
                        disabled: unref(form).processing
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(form).processing ? "Memproses..." : "Ajukan Penarikan"), 1)
                        ]),
                        _: 1
                      }, 8, ["disabled"])
                    ])
                  ], 32)
                ]),
                _: 2
              }, 1024)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/profile/wallet/WalletWithdrawalForm.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "WalletTransactionCard",
  __ssrInlineRender: true,
  props: {
    transaction: {}
  },
  emits: ["continue-payment", "status-updated"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { formatCurrency, formatDate, getTransactionTypeLabel, getTransactionStatusLabel } = useFormatter();
    const checkingStatus = ref(false);
    const localStatus = ref(props.transaction.status);
    const checkPaymentStatus = async (transactionRef) => {
      if (checkingStatus.value) return;
      checkingStatus.value = true;
      try {
        const response = await axios.post("/client/wallet/check-status", {
          transaction_ref: transactionRef
        });
        if (response.data.success) {
          localStatus.value = response.data.status;
          emit("status-updated", {
            transactionRef,
            status: response.data.status,
            newBalance: response.data.new_balance
          });
          toast.success(response.data.message);
          setTimeout(() => {
            router.reload({ only: ["customer", "transactions"] });
          }, 500);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Check status error:", error);
        toast.error(error.response?.data?.message || "Gagal memeriksa status pembayaran");
      } finally {
        checkingStatus.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-3 border rounded-lg" }, _attrs))}><div class="flex items-center justify-between"><div class="flex items-center gap-3"><div class="${ssrRenderClass([{
        "bg-emerald-100 dark:bg-emerald-900/20": __props.transaction.type === "topup" || __props.transaction.type === "bonus",
        "bg-red-100 dark:bg-red-900/20": __props.transaction.type === "withdrawal" || __props.transaction.type === "purchase",
        "bg-blue-100 dark:bg-blue-900/20": __props.transaction.type === "refund"
      }, "p-2 rounded-full"])}">`);
      if (__props.transaction.type === "topup" || __props.transaction.type === "bonus" || __props.transaction.type === "refund") {
        _push(ssrRenderComponent(unref(ArrowDownLeft), {
          class: ["w-4 h-4", {
            "text-emerald-600 dark:text-emerald-400": __props.transaction.type === "topup" || __props.transaction.type === "bonus",
            "text-blue-600 dark:text-blue-400": __props.transaction.type === "refund"
          }]
        }, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(ArrowUpRight), { class: "w-4 h-4 text-red-600 dark:text-red-400" }, null, _parent));
      }
      _push(`</div><div><p class="font-semibold text-sm">${ssrInterpolate(unref(getTransactionTypeLabel)(__props.transaction.type))}</p><p class="text-xs text-muted-foreground">${ssrInterpolate(__props.transaction.transaction_ref)}</p><p class="text-xs text-muted-foreground">${ssrInterpolate(unref(formatDate)(__props.transaction.created_at))}</p></div></div><div class="text-right"><p class="${ssrRenderClass([{
        "text-emerald-600 dark:text-emerald-400": __props.transaction.type === "topup" || __props.transaction.type === "bonus" || __props.transaction.type === "refund",
        "text-red-600 dark:text-red-400": __props.transaction.type === "withdrawal" || __props.transaction.type === "purchase"
      }, "font-bold"])}">${ssrInterpolate(__props.transaction.type === "topup" || __props.transaction.type === "bonus" || __props.transaction.type === "refund" ? "+" : "-")} ${ssrInterpolate(unref(formatCurrency)(__props.transaction.amount))}</p>`);
      _push(ssrRenderComponent(unref(_sfc_main$t), {
        variant: "secondary",
        class: {
          "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-100": localStatus.value === "pending",
          "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-100": localStatus.value === "completed",
          "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100": localStatus.value === "failed" || localStatus.value === "cancelled"
        }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(getTransactionStatusLabel)(localStatus.value))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(getTransactionStatusLabel)(localStatus.value)), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      if (__props.transaction.type === "topup" && localStatus.value === "pending" && __props.transaction.midtrans_transaction_id) {
        _push(`<div class="mt-3 pt-3 border-t"><div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"><p class="text-xs text-muted-foreground"> Pembayaran menunggu konfirmasi </p><div class="flex gap-2">`);
        _push(ssrRenderComponent(unref(_sfc_main$u), {
          size: "sm",
          variant: "outline",
          disabled: checkingStatus.value,
          onClick: ($event) => checkPaymentStatus(__props.transaction.transaction_ref),
          class: "shrink-0"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(RefreshCw), {
                class: ["w-3 h-3 mr-1", { "animate-spin": checkingStatus.value }]
              }, null, _parent2, _scopeId));
              _push2(` Cek Status `);
            } else {
              return [
                createVNode(unref(RefreshCw), {
                  class: ["w-3 h-3 mr-1", { "animate-spin": checkingStatus.value }]
                }, null, 8, ["class"]),
                createTextVNode(" Cek Status ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(_sfc_main$u), {
          size: "sm",
          onClick: ($event) => emit("continue-payment", __props.transaction.midtrans_transaction_id),
          class: "shrink-0"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(CreditCard), { class: "w-3 h-3 mr-1" }, null, _parent2, _scopeId));
              _push2(` Lanjutkan Pembayaran `);
            } else {
              return [
                createVNode(unref(CreditCard), { class: "w-3 h-3 mr-1" }),
                createTextVNode(" Lanjutkan Pembayaran ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/profile/wallet/WalletTransactionCard.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "WalletTransactionList",
  __ssrInlineRender: true,
  props: {
    transactions: {}
  },
  setup(__props) {
    const page = usePage();
    const customer = computed(() => page.props.customer);
    const continuePayment = (snapToken) => {
      if (typeof window === "undefined") return;
      if (window.snap) {
        window.snap.pay(snapToken, {
          onSuccess: function(result) {
            console.log("Payment success:", result);
            toast.success("Pembayaran berhasil.");
            if (typeof window !== "undefined") {
              window.location.href = "/client/profile?tab=wallet";
            }
          },
          onPending: function(result) {
            console.log("Payment pending:", result);
            toast.info("Pembayaran sedang diproses.");
            if (typeof window !== "undefined") {
              window.location.href = "/client/profile?tab=wallet";
            }
          },
          onError: function(result) {
            toast.error("Pembayaran gagal.");
            console.error("Payment error:", result);
          },
          onClose: function() {
            toast("Pembayaran ditutup sebelum selesai.");
            console.log("Payment modal closed");
          }
        });
      } else {
        alert("Midtrans Snap belum siap. Silakan refresh halaman.");
      }
    };
    const handleStatusUpdated = (data) => {
      if (data.newBalance !== void 0 && customer.value) {
        customer.value.ewallet_saldo = data.newBalance;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$o), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$v), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$w), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Riwayat Transaksi`);
                      } else {
                        return [
                          createTextVNode("Riwayat Transaksi")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$N), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(__props.transactions.length)} transaksi e-wallet terbaru `);
                      } else {
                        return [
                          createTextVNode(toDisplayString(__props.transactions.length) + " transaksi e-wallet terbaru ", 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$w), null, {
                      default: withCtx(() => [
                        createTextVNode("Riwayat Transaksi")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$N), null, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(__props.transactions.length) + " transaksi e-wallet terbaru ", 1)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$p), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (__props.transactions.length > 0) {
                    _push3(`<div class="space-y-3"${_scopeId2}><!--[-->`);
                    ssrRenderList(__props.transactions, (transaction) => {
                      _push3(ssrRenderComponent(_sfc_main$b, {
                        key: transaction.id,
                        transaction,
                        onContinuePayment: continuePayment,
                        onStatusUpdated: handleStatusUpdated
                      }, null, _parent3, _scopeId2));
                    });
                    _push3(`<!--]--></div>`);
                  } else {
                    _push3(`<div class="py-12 text-center"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Wallet), { class: "h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-20" }, null, _parent3, _scopeId2));
                    _push3(`<p class="text-muted-foreground"${_scopeId2}>Belum ada transaksi</p></div>`);
                  }
                } else {
                  return [
                    __props.transactions.length > 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-3"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.transactions, (transaction) => {
                        return openBlock(), createBlock(_sfc_main$b, {
                          key: transaction.id,
                          transaction,
                          onContinuePayment: continuePayment,
                          onStatusUpdated: handleStatusUpdated
                        }, null, 8, ["transaction"]);
                      }), 128))
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "py-12 text-center"
                    }, [
                      createVNode(unref(Wallet), { class: "h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-20" }),
                      createVNode("p", { class: "text-muted-foreground" }, "Belum ada transaksi")
                    ]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$v), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$w), null, {
                    default: withCtx(() => [
                      createTextVNode("Riwayat Transaksi")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$N), null, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(__props.transactions.length) + " transaksi e-wallet terbaru ", 1)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$p), null, {
                default: withCtx(() => [
                  __props.transactions.length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "space-y-3"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.transactions, (transaction) => {
                      return openBlock(), createBlock(_sfc_main$b, {
                        key: transaction.id,
                        transaction,
                        onContinuePayment: continuePayment,
                        onStatusUpdated: handleStatusUpdated
                      }, null, 8, ["transaction"]);
                    }), 128))
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "py-12 text-center"
                  }, [
                    createVNode(unref(Wallet), { class: "h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-20" }),
                    createVNode("p", { class: "text-muted-foreground" }, "Belum ada transaksi")
                  ]))
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
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/profile/wallet/WalletTransactionList.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "WalletStatusBanner",
  __ssrInlineRender: true,
  props: {
    initialTransactions: {}
  },
  setup(__props) {
    const props = __props;
    const loading = ref(false);
    const error = ref(null);
    const latest = ref(null);
    const statusInfo = computed(() => {
      const s = latest.value?.status || "";
      if (s === "completed" || s === "success") {
        return { tone: "success", title: "Top up berhasil", bg: "bg-green-50 dark:bg-green-900/20", border: "border-green-200 dark:border-green-900", text: "text-green-800 dark:text-green-200" };
      }
      if (s === "pending") {
        return { tone: "pending", title: "Menunggu pembayaran", bg: "bg-yellow-50 dark:bg-yellow-900/20", border: "border-yellow-200 dark:border-yellow-900", text: "text-yellow-800 dark:text-yellow-200" };
      }
      if (s === "cancelled" || s === "failed" || s === "expire" || s === "denied" || s === "deny") {
        return { tone: "failed", title: "Pembayaran gagal / dibatalkan", bg: "bg-red-50 dark:bg-red-900/20", border: "border-red-200 dark:border-red-900", text: "text-red-800 dark:text-red-200" };
      }
      return { tone: "info", title: "Status transaksi", bg: "bg-blue-50 dark:bg-blue-900/20", border: "border-blue-200 dark:border-blue-900", text: "text-blue-800 dark:text-blue-200" };
    });
    function isRecent(iso, hours = 2) {
      const created = new Date(iso).getTime();
      const now = Date.now();
      const diffH = (now - created) / 36e5;
      return diffH <= hours;
    }
    const shouldShow = computed(() => {
      if (!latest.value) return false;
      const s = latest.value.status;
      if (s === "pending") return true;
      if (s === "completed" || s === "success") return isRecent(latest.value.created_at, 2);
      return isRecent(latest.value.created_at, 6);
    });
    async function fetchLatest() {
      try {
        loading.value = true;
        error.value = null;
        const { data } = await axios.get("/client/wallet/history", { params: { type: "topup" } });
        const items = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];
        if (items.length > 0) {
          latest.value = items[0];
        }
      } catch (e) {
        error.value = e?.response?.data?.message || e?.message || "Gagal memuat status transaksi.";
      } finally {
        loading.value = false;
      }
    }
    onMounted(() => {
      if (props.initialTransactions && props.initialTransactions.length > 0) {
        latest.value = props.initialTransactions[0];
      }
      fetchLatest();
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (shouldShow.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: ["border rounded-lg p-4 flex items-start gap-3", statusInfo.value.border, statusInfo.value.bg]
        }, _attrs))}><div class="flex-1"><p class="${ssrRenderClass(["text-sm font-semibold", statusInfo.value.text])}">${ssrInterpolate(statusInfo.value.title)}</p>`);
        if (latest.value) {
          _push(`<p class="text-xs mt-1 text-gray-700 dark:text-gray-300"> Ref: <span class="font-mono">${ssrInterpolate(latest.value.transaction_ref)}</span> • Jumlah: Rp ${ssrInterpolate(new Intl.NumberFormat("id-ID").format(latest.value.amount))} • Status: <span class="uppercase">${ssrInterpolate(latest.value.status)}</span></p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><button type="button" class="text-xs underline text-gray-700 dark:text-gray-300"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""}>${ssrInterpolate(loading.value ? "Menyegarkan..." : "Segarkan")}</button></div>`);
      } else if (error.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 text-xs text-amber-800 dark:text-amber-200" }, _attrs))}>${ssrInterpolate(error.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/profile/wallet/WalletStatusBanner.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "WalletTab",
  __ssrInlineRender: true,
  props: {
    customer: {},
    transactions: {}
  },
  setup(__props) {
    const walletView = ref("wallet");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$e, {
        balance: Number(__props.customer.ewallet_saldo) || 0,
        onTopup: ($event) => walletView.value = "wallet-topup",
        onWithdrawal: ($event) => walletView.value = "wallet-withdrawal"
      }, null, _parent));
      if (walletView.value === "wallet") {
        _push(ssrRenderComponent(_sfc_main$9, { "initial-transactions": __props.transactions }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (walletView.value === "wallet-topup") {
        _push(ssrRenderComponent(_sfc_main$d, {
          onCancel: ($event) => walletView.value = "wallet"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (walletView.value === "wallet-withdrawal") {
        _push(ssrRenderComponent(_sfc_main$c, {
          "max-amount": Number(__props.customer.ewallet_saldo) || 0,
          onCancel: ($event) => walletView.value = "wallet"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (walletView.value === "wallet") {
        _push(ssrRenderComponent(_sfc_main$a, { transactions: __props.transactions }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/profile/WalletTab.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "SecurityTab",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      current_password: "",
      password: "",
      password_confirmation: ""
    });
    const showCurrentPassword = ref(false);
    const showNewPassword = ref(false);
    const showConfirmPassword = ref(false);
    const submitForm = () => {
      form.patch("/client/profile/password", {
        preserveScroll: true,
        onSuccess: () => {
          form.reset();
          showCurrentPassword.value = false;
          showNewPassword.value = false;
          showConfirmPassword.value = false;
          toast.success("Password berhasil diubah");
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$o), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$v), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$w), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Ubah Password`);
                      } else {
                        return [
                          createTextVNode("Ubah Password")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$N), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Pastikan akun Anda menggunakan password yang kuat `);
                      } else {
                        return [
                          createTextVNode(" Pastikan akun Anda menggunakan password yang kuat ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$w), null, {
                      default: withCtx(() => [
                        createTextVNode("Ubah Password")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$N), null, {
                      default: withCtx(() => [
                        createTextVNode(" Pastikan akun Anda menggunakan password yang kuat ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$p), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<form class="space-y-6"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$D), { for: "current_password" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Password Saat Ini <span class="text-red-500"${_scopeId3}>*</span>`);
                      } else {
                        return [
                          createTextVNode(" Password Saat Ini "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="relative"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Lock), { class: "absolute left-3 top-3 h-4 w-4 text-gray-400" }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$E), {
                    id: "current_password",
                    modelValue: unref(form).current_password,
                    "onUpdate:modelValue": ($event) => unref(form).current_password = $event,
                    type: showCurrentPassword.value ? "text" : "password",
                    placeholder: "Masukkan password saat ini",
                    class: "pl-10 pr-10",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`<button type="button" class="absolute right-3 top-3 text-gray-400 hover:text-gray-600"${_scopeId2}>`);
                  if (!showCurrentPassword.value) {
                    _push3(ssrRenderComponent(unref(Eye), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                  } else {
                    _push3(ssrRenderComponent(unref(EyeOff), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                  }
                  _push3(`</button></div>`);
                  if (unref(form).errors.current_password) {
                    _push3(`<p class="text-sm text-red-500"${_scopeId2}>${ssrInterpolate(unref(form).errors.current_password)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$x), null, null, _parent3, _scopeId2));
                  _push3(`<div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$D), { for: "password" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Password Baru <span class="text-red-500"${_scopeId3}>*</span>`);
                      } else {
                        return [
                          createTextVNode(" Password Baru "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="relative"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(ShieldCheck), { class: "absolute left-3 top-3 h-4 w-4 text-gray-400" }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$E), {
                    id: "password",
                    modelValue: unref(form).password,
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    type: showNewPassword.value ? "text" : "password",
                    placeholder: "Masukkan password baru",
                    class: "pl-10 pr-10",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`<button type="button" class="absolute right-3 top-3 text-gray-400 hover:text-gray-600"${_scopeId2}>`);
                  if (!showNewPassword.value) {
                    _push3(ssrRenderComponent(unref(Eye), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                  } else {
                    _push3(ssrRenderComponent(unref(EyeOff), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                  }
                  _push3(`</button></div><p class="text-xs text-gray-500 dark:text-gray-400"${_scopeId2}> Minimal 8 karakter </p>`);
                  if (unref(form).errors.password) {
                    _push3(`<p class="text-sm text-red-500"${_scopeId2}>${ssrInterpolate(unref(form).errors.password)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$D), { for: "password_confirmation" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Konfirmasi Password Baru <span class="text-red-500"${_scopeId3}>*</span>`);
                      } else {
                        return [
                          createTextVNode(" Konfirmasi Password Baru "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="relative"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(ShieldCheck), { class: "absolute left-3 top-3 h-4 w-4 text-gray-400" }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$E), {
                    id: "password_confirmation",
                    modelValue: unref(form).password_confirmation,
                    "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                    type: showConfirmPassword.value ? "text" : "password",
                    placeholder: "Konfirmasi password baru",
                    class: "pl-10 pr-10",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`<button type="button" class="absolute right-3 top-3 text-gray-400 hover:text-gray-600"${_scopeId2}>`);
                  if (!showConfirmPassword.value) {
                    _push3(ssrRenderComponent(unref(Eye), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                  } else {
                    _push3(ssrRenderComponent(unref(EyeOff), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                  }
                  _push3(`</button></div></div><div class="flex items-center justify-end gap-3"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$u), {
                    type: "button",
                    variant: "outline",
                    onClick: ($event) => unref(form).reset(),
                    disabled: unref(form).processing
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
                  _push3(ssrRenderComponent(unref(_sfc_main$u), {
                    type: "submit",
                    disabled: unref(form).processing
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (!unref(form).processing) {
                          _push4(ssrRenderComponent(unref(Lock), { class: "w-4 h-4 mr-2" }, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(` ${ssrInterpolate(unref(form).processing ? "Mengupdate..." : "Update Password")}`);
                      } else {
                        return [
                          !unref(form).processing ? (openBlock(), createBlock(unref(Lock), {
                            key: 0,
                            class: "w-4 h-4 mr-2"
                          })) : createCommentVNode("", true),
                          createTextVNode(" " + toDisplayString(unref(form).processing ? "Mengupdate..." : "Update Password"), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></form>`);
                } else {
                  return [
                    createVNode("form", {
                      onSubmit: withModifiers(submitForm, ["prevent"]),
                      class: "space-y-6"
                    }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$D), { for: "current_password" }, {
                          default: withCtx(() => [
                            createTextVNode(" Password Saat Ini "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "relative" }, [
                          createVNode(unref(Lock), { class: "absolute left-3 top-3 h-4 w-4 text-gray-400" }),
                          createVNode(unref(_sfc_main$E), {
                            id: "current_password",
                            modelValue: unref(form).current_password,
                            "onUpdate:modelValue": ($event) => unref(form).current_password = $event,
                            type: showCurrentPassword.value ? "text" : "password",
                            placeholder: "Masukkan password saat ini",
                            class: "pl-10 pr-10",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "type"]),
                          createVNode("button", {
                            type: "button",
                            onClick: ($event) => showCurrentPassword.value = !showCurrentPassword.value,
                            class: "absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                          }, [
                            !showCurrentPassword.value ? (openBlock(), createBlock(unref(Eye), {
                              key: 0,
                              class: "h-4 w-4"
                            })) : (openBlock(), createBlock(unref(EyeOff), {
                              key: 1,
                              class: "h-4 w-4"
                            }))
                          ], 8, ["onClick"])
                        ]),
                        unref(form).errors.current_password ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-red-500"
                        }, toDisplayString(unref(form).errors.current_password), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode(unref(_sfc_main$x)),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$D), { for: "password" }, {
                          default: withCtx(() => [
                            createTextVNode(" Password Baru "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "relative" }, [
                          createVNode(unref(ShieldCheck), { class: "absolute left-3 top-3 h-4 w-4 text-gray-400" }),
                          createVNode(unref(_sfc_main$E), {
                            id: "password",
                            modelValue: unref(form).password,
                            "onUpdate:modelValue": ($event) => unref(form).password = $event,
                            type: showNewPassword.value ? "text" : "password",
                            placeholder: "Masukkan password baru",
                            class: "pl-10 pr-10",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "type"]),
                          createVNode("button", {
                            type: "button",
                            onClick: ($event) => showNewPassword.value = !showNewPassword.value,
                            class: "absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                          }, [
                            !showNewPassword.value ? (openBlock(), createBlock(unref(Eye), {
                              key: 0,
                              class: "h-4 w-4"
                            })) : (openBlock(), createBlock(unref(EyeOff), {
                              key: 1,
                              class: "h-4 w-4"
                            }))
                          ], 8, ["onClick"])
                        ]),
                        createVNode("p", { class: "text-xs text-gray-500 dark:text-gray-400" }, " Minimal 8 karakter "),
                        unref(form).errors.password ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-red-500"
                        }, toDisplayString(unref(form).errors.password), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$D), { for: "password_confirmation" }, {
                          default: withCtx(() => [
                            createTextVNode(" Konfirmasi Password Baru "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "relative" }, [
                          createVNode(unref(ShieldCheck), { class: "absolute left-3 top-3 h-4 w-4 text-gray-400" }),
                          createVNode(unref(_sfc_main$E), {
                            id: "password_confirmation",
                            modelValue: unref(form).password_confirmation,
                            "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                            type: showConfirmPassword.value ? "text" : "password",
                            placeholder: "Konfirmasi password baru",
                            class: "pl-10 pr-10",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "type"]),
                          createVNode("button", {
                            type: "button",
                            onClick: ($event) => showConfirmPassword.value = !showConfirmPassword.value,
                            class: "absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                          }, [
                            !showConfirmPassword.value ? (openBlock(), createBlock(unref(Eye), {
                              key: 0,
                              class: "h-4 w-4"
                            })) : (openBlock(), createBlock(unref(EyeOff), {
                              key: 1,
                              class: "h-4 w-4"
                            }))
                          ], 8, ["onClick"])
                        ])
                      ]),
                      createVNode("div", { class: "flex items-center justify-end gap-3" }, [
                        createVNode(unref(_sfc_main$u), {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => unref(form).reset(),
                          disabled: unref(form).processing
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Reset ")
                          ]),
                          _: 1
                        }, 8, ["onClick", "disabled"]),
                        createVNode(unref(_sfc_main$u), {
                          type: "submit",
                          disabled: unref(form).processing
                        }, {
                          default: withCtx(() => [
                            !unref(form).processing ? (openBlock(), createBlock(unref(Lock), {
                              key: 0,
                              class: "w-4 h-4 mr-2"
                            })) : createCommentVNode("", true),
                            createTextVNode(" " + toDisplayString(unref(form).processing ? "Mengupdate..." : "Update Password"), 1)
                          ]),
                          _: 1
                        }, 8, ["disabled"])
                      ])
                    ], 32)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$v), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$w), null, {
                    default: withCtx(() => [
                      createTextVNode("Ubah Password")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$N), null, {
                    default: withCtx(() => [
                      createTextVNode(" Pastikan akun Anda menggunakan password yang kuat ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$p), null, {
                default: withCtx(() => [
                  createVNode("form", {
                    onSubmit: withModifiers(submitForm, ["prevent"]),
                    class: "space-y-6"
                  }, [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$D), { for: "current_password" }, {
                        default: withCtx(() => [
                          createTextVNode(" Password Saat Ini "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "relative" }, [
                        createVNode(unref(Lock), { class: "absolute left-3 top-3 h-4 w-4 text-gray-400" }),
                        createVNode(unref(_sfc_main$E), {
                          id: "current_password",
                          modelValue: unref(form).current_password,
                          "onUpdate:modelValue": ($event) => unref(form).current_password = $event,
                          type: showCurrentPassword.value ? "text" : "password",
                          placeholder: "Masukkan password saat ini",
                          class: "pl-10 pr-10",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "type"]),
                        createVNode("button", {
                          type: "button",
                          onClick: ($event) => showCurrentPassword.value = !showCurrentPassword.value,
                          class: "absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        }, [
                          !showCurrentPassword.value ? (openBlock(), createBlock(unref(Eye), {
                            key: 0,
                            class: "h-4 w-4"
                          })) : (openBlock(), createBlock(unref(EyeOff), {
                            key: 1,
                            class: "h-4 w-4"
                          }))
                        ], 8, ["onClick"])
                      ]),
                      unref(form).errors.current_password ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-red-500"
                      }, toDisplayString(unref(form).errors.current_password), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode(unref(_sfc_main$x)),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$D), { for: "password" }, {
                        default: withCtx(() => [
                          createTextVNode(" Password Baru "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "relative" }, [
                        createVNode(unref(ShieldCheck), { class: "absolute left-3 top-3 h-4 w-4 text-gray-400" }),
                        createVNode(unref(_sfc_main$E), {
                          id: "password",
                          modelValue: unref(form).password,
                          "onUpdate:modelValue": ($event) => unref(form).password = $event,
                          type: showNewPassword.value ? "text" : "password",
                          placeholder: "Masukkan password baru",
                          class: "pl-10 pr-10",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "type"]),
                        createVNode("button", {
                          type: "button",
                          onClick: ($event) => showNewPassword.value = !showNewPassword.value,
                          class: "absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        }, [
                          !showNewPassword.value ? (openBlock(), createBlock(unref(Eye), {
                            key: 0,
                            class: "h-4 w-4"
                          })) : (openBlock(), createBlock(unref(EyeOff), {
                            key: 1,
                            class: "h-4 w-4"
                          }))
                        ], 8, ["onClick"])
                      ]),
                      createVNode("p", { class: "text-xs text-gray-500 dark:text-gray-400" }, " Minimal 8 karakter "),
                      unref(form).errors.password ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-red-500"
                      }, toDisplayString(unref(form).errors.password), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$D), { for: "password_confirmation" }, {
                        default: withCtx(() => [
                          createTextVNode(" Konfirmasi Password Baru "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "relative" }, [
                        createVNode(unref(ShieldCheck), { class: "absolute left-3 top-3 h-4 w-4 text-gray-400" }),
                        createVNode(unref(_sfc_main$E), {
                          id: "password_confirmation",
                          modelValue: unref(form).password_confirmation,
                          "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                          type: showConfirmPassword.value ? "text" : "password",
                          placeholder: "Konfirmasi password baru",
                          class: "pl-10 pr-10",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "type"]),
                        createVNode("button", {
                          type: "button",
                          onClick: ($event) => showConfirmPassword.value = !showConfirmPassword.value,
                          class: "absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        }, [
                          !showConfirmPassword.value ? (openBlock(), createBlock(unref(Eye), {
                            key: 0,
                            class: "h-4 w-4"
                          })) : (openBlock(), createBlock(unref(EyeOff), {
                            key: 1,
                            class: "h-4 w-4"
                          }))
                        ], 8, ["onClick"])
                      ])
                    ]),
                    createVNode("div", { class: "flex items-center justify-end gap-3" }, [
                      createVNode(unref(_sfc_main$u), {
                        type: "button",
                        variant: "outline",
                        onClick: ($event) => unref(form).reset(),
                        disabled: unref(form).processing
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Reset ")
                        ]),
                        _: 1
                      }, 8, ["onClick", "disabled"]),
                      createVNode(unref(_sfc_main$u), {
                        type: "submit",
                        disabled: unref(form).processing
                      }, {
                        default: withCtx(() => [
                          !unref(form).processing ? (openBlock(), createBlock(unref(Lock), {
                            key: 0,
                            class: "w-4 h-4 mr-2"
                          })) : createCommentVNode("", true),
                          createTextVNode(" " + toDisplayString(unref(form).processing ? "Mengupdate..." : "Update Password"), 1)
                        ]),
                        _: 1
                      }, 8, ["disabled"])
                    ])
                  ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/profile/SecurityTab.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "DangerZoneTab",
  __ssrInlineRender: true,
  setup(__props) {
    const showDeleteDialog = ref(false);
    const deleteForm = useForm({});
    const deleteAccount = () => {
      deleteForm.delete("/client/profile", {
        onFinish: () => {
          showDeleteDialog.value = false;
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(_sfc_main$o), { class: "border-red-200 dark:border-red-900" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$v), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$w), { class: "text-red-600 dark:text-red-400" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Zona Bahaya`);
                      } else {
                        return [
                          createTextVNode("Zona Bahaya")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$N), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Tindakan di bawah ini bersifat permanen dan tidak dapat dibatalkan `);
                      } else {
                        return [
                          createTextVNode(" Tindakan di bawah ini bersifat permanen dan tidak dapat dibatalkan ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$w), { class: "text-red-600 dark:text-red-400" }, {
                      default: withCtx(() => [
                        createTextVNode("Zona Bahaya")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$N), null, {
                      default: withCtx(() => [
                        createTextVNode(" Tindakan di bawah ini bersifat permanen dan tidak dapat dibatalkan ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$p), { class: "space-y-6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-lg"${_scopeId2}><div class="flex items-start gap-3"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(AlertCircle), { class: "w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" }, null, _parent3, _scopeId2));
                  _push3(`<div class="flex-1"${_scopeId2}><h3 class="font-semibold text-red-900 dark:text-red-100"${_scopeId2}> Hapus Akun </h3><p class="text-sm text-red-700 dark:text-red-300 mt-1"${_scopeId2}> Setelah akun Anda dihapus, semua data akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan. </p>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$u), {
                    type: "button",
                    variant: "destructive",
                    class: "mt-4",
                    onClick: ($event) => showDeleteDialog.value = true
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Trash2), { class: "w-4 h-4 mr-2" }, null, _parent4, _scopeId3));
                        _push4(` Hapus Akun Saya `);
                      } else {
                        return [
                          createVNode(unref(Trash2), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Hapus Akun Saya ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-lg" }, [
                      createVNode("div", { class: "flex items-start gap-3" }, [
                        createVNode(unref(AlertCircle), { class: "w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" }),
                        createVNode("div", { class: "flex-1" }, [
                          createVNode("h3", { class: "font-semibold text-red-900 dark:text-red-100" }, " Hapus Akun "),
                          createVNode("p", { class: "text-sm text-red-700 dark:text-red-300 mt-1" }, " Setelah akun Anda dihapus, semua data akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan. "),
                          createVNode(unref(_sfc_main$u), {
                            type: "button",
                            variant: "destructive",
                            class: "mt-4",
                            onClick: ($event) => showDeleteDialog.value = true
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Trash2), { class: "w-4 h-4 mr-2" }),
                              createTextVNode(" Hapus Akun Saya ")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$v), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$w), { class: "text-red-600 dark:text-red-400" }, {
                    default: withCtx(() => [
                      createTextVNode("Zona Bahaya")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$N), null, {
                    default: withCtx(() => [
                      createTextVNode(" Tindakan di bawah ini bersifat permanen dan tidak dapat dibatalkan ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$p), { class: "space-y-6" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-lg" }, [
                    createVNode("div", { class: "flex items-start gap-3" }, [
                      createVNode(unref(AlertCircle), { class: "w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" }),
                      createVNode("div", { class: "flex-1" }, [
                        createVNode("h3", { class: "font-semibold text-red-900 dark:text-red-100" }, " Hapus Akun "),
                        createVNode("p", { class: "text-sm text-red-700 dark:text-red-300 mt-1" }, " Setelah akun Anda dihapus, semua data akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan. "),
                        createVNode(unref(_sfc_main$u), {
                          type: "button",
                          variant: "destructive",
                          class: "mt-4",
                          onClick: ($event) => showDeleteDialog.value = true
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Trash2), { class: "w-4 h-4 mr-2" }),
                            createTextVNode(" Hapus Akun Saya ")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ])
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
      _push(ssrRenderComponent(unref(_sfc_main$y), {
        open: showDeleteDialog.value,
        "onUpdate:open": ($event) => showDeleteDialog.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$z), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$A), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$B), { class: "flex items-center gap-2 text-red-600" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(AlertCircle), { class: "w-5 h-5" }, null, _parent5, _scopeId4));
                              _push5(` Konfirmasi Hapus Akun `);
                            } else {
                              return [
                                createVNode(unref(AlertCircle), { class: "w-5 h-5" }),
                                createTextVNode(" Konfirmasi Hapus Akun ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$C), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Apakah Anda yakin ingin menghapus akun Anda? Tindakan ini tidak dapat dibatalkan dan semua data Anda akan dihapus secara permanen. `);
                            } else {
                              return [
                                createTextVNode(" Apakah Anda yakin ingin menghapus akun Anda? Tindakan ini tidak dapat dibatalkan dan semua data Anda akan dihapus secara permanen. ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$B), { class: "flex items-center gap-2 text-red-600" }, {
                            default: withCtx(() => [
                              createVNode(unref(AlertCircle), { class: "w-5 h-5" }),
                              createTextVNode(" Konfirmasi Hapus Akun ")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$C), null, {
                            default: withCtx(() => [
                              createTextVNode(" Apakah Anda yakin ingin menghapus akun Anda? Tindakan ini tidak dapat dibatalkan dan semua data Anda akan dihapus secara permanen. ")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="py-4"${_scopeId2}><div class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-lg"${_scopeId2}><p class="text-sm text-red-700 dark:text-red-300"${_scopeId2}><strong${_scopeId2}>Data yang akan dihapus:</strong></p><ul class="mt-2 text-sm text-red-700 dark:text-red-300 list-disc list-inside space-y-1"${_scopeId2}><li${_scopeId2}>Informasi profil dan akun</li><li${_scopeId2}>Riwayat transaksi</li><li${_scopeId2}>E-wallet dan saldo</li><li${_scopeId2}>Jaringan dan bonus</li></ul></div></div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$M), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$u), {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => showDeleteDialog.value = false,
                          disabled: unref(deleteForm).processing
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
                        _push4(ssrRenderComponent(unref(_sfc_main$u), {
                          type: "button",
                          variant: "destructive",
                          onClick: deleteAccount,
                          disabled: unref(deleteForm).processing
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Trash2), { class: "w-4 h-4 mr-2" }, null, _parent5, _scopeId4));
                              _push5(` ${ssrInterpolate(unref(deleteForm).processing ? "Menghapus..." : "Ya, Hapus Akun")}`);
                            } else {
                              return [
                                createVNode(unref(Trash2), { class: "w-4 h-4 mr-2" }),
                                createTextVNode(" " + toDisplayString(unref(deleteForm).processing ? "Menghapus..." : "Ya, Hapus Akun"), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$u), {
                            type: "button",
                            variant: "outline",
                            onClick: ($event) => showDeleteDialog.value = false,
                            disabled: unref(deleteForm).processing
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Batal ")
                            ]),
                            _: 1
                          }, 8, ["onClick", "disabled"]),
                          createVNode(unref(_sfc_main$u), {
                            type: "button",
                            variant: "destructive",
                            onClick: deleteAccount,
                            disabled: unref(deleteForm).processing
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Trash2), { class: "w-4 h-4 mr-2" }),
                              createTextVNode(" " + toDisplayString(unref(deleteForm).processing ? "Menghapus..." : "Ya, Hapus Akun"), 1)
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$A), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$B), { class: "flex items-center gap-2 text-red-600" }, {
                          default: withCtx(() => [
                            createVNode(unref(AlertCircle), { class: "w-5 h-5" }),
                            createTextVNode(" Konfirmasi Hapus Akun ")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$C), null, {
                          default: withCtx(() => [
                            createTextVNode(" Apakah Anda yakin ingin menghapus akun Anda? Tindakan ini tidak dapat dibatalkan dan semua data Anda akan dihapus secara permanen. ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "py-4" }, [
                      createVNode("div", { class: "p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-lg" }, [
                        createVNode("p", { class: "text-sm text-red-700 dark:text-red-300" }, [
                          createVNode("strong", null, "Data yang akan dihapus:")
                        ]),
                        createVNode("ul", { class: "mt-2 text-sm text-red-700 dark:text-red-300 list-disc list-inside space-y-1" }, [
                          createVNode("li", null, "Informasi profil dan akun"),
                          createVNode("li", null, "Riwayat transaksi"),
                          createVNode("li", null, "E-wallet dan saldo"),
                          createVNode("li", null, "Jaringan dan bonus")
                        ])
                      ])
                    ]),
                    createVNode(unref(_sfc_main$M), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$u), {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => showDeleteDialog.value = false,
                          disabled: unref(deleteForm).processing
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Batal ")
                          ]),
                          _: 1
                        }, 8, ["onClick", "disabled"]),
                        createVNode(unref(_sfc_main$u), {
                          type: "button",
                          variant: "destructive",
                          onClick: deleteAccount,
                          disabled: unref(deleteForm).processing
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Trash2), { class: "w-4 h-4 mr-2" }),
                            createTextVNode(" " + toDisplayString(unref(deleteForm).processing ? "Menghapus..." : "Ya, Hapus Akun"), 1)
                          ]),
                          _: 1
                        }, 8, ["disabled"])
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
              createVNode(unref(_sfc_main$z), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$A), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$B), { class: "flex items-center gap-2 text-red-600" }, {
                        default: withCtx(() => [
                          createVNode(unref(AlertCircle), { class: "w-5 h-5" }),
                          createTextVNode(" Konfirmasi Hapus Akun ")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$C), null, {
                        default: withCtx(() => [
                          createTextVNode(" Apakah Anda yakin ingin menghapus akun Anda? Tindakan ini tidak dapat dibatalkan dan semua data Anda akan dihapus secara permanen. ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "py-4" }, [
                    createVNode("div", { class: "p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-lg" }, [
                      createVNode("p", { class: "text-sm text-red-700 dark:text-red-300" }, [
                        createVNode("strong", null, "Data yang akan dihapus:")
                      ]),
                      createVNode("ul", { class: "mt-2 text-sm text-red-700 dark:text-red-300 list-disc list-inside space-y-1" }, [
                        createVNode("li", null, "Informasi profil dan akun"),
                        createVNode("li", null, "Riwayat transaksi"),
                        createVNode("li", null, "E-wallet dan saldo"),
                        createVNode("li", null, "Jaringan dan bonus")
                      ])
                    ])
                  ]),
                  createVNode(unref(_sfc_main$M), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$u), {
                        type: "button",
                        variant: "outline",
                        onClick: ($event) => showDeleteDialog.value = false,
                        disabled: unref(deleteForm).processing
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Batal ")
                        ]),
                        _: 1
                      }, 8, ["onClick", "disabled"]),
                      createVNode(unref(_sfc_main$u), {
                        type: "button",
                        variant: "destructive",
                        onClick: deleteAccount,
                        disabled: unref(deleteForm).processing
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Trash2), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" " + toDisplayString(unref(deleteForm).processing ? "Menghapus..." : "Ya, Hapus Akun"), 1)
                        ]),
                        _: 1
                      }, 8, ["disabled"])
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
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/profile/DangerZoneTab.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "NetworkMembersTab",
  __ssrInlineRender: true,
  props: {
    activeMembers: {},
    passiveMembers: {},
    prospectMembers: {}
  },
  setup(__props) {
    const showPlacementDialog = ref(false);
    const selectedMember = ref(null);
    const selectedPosition = ref(null);
    const placementForm = useForm({
      member_id: 0,
      position: ""
    });
    const openPlacementDialog = (member) => {
      selectedMember.value = member;
      selectedPosition.value = null;
      placementForm.member_id = member.id;
      placementForm.position = "";
      showPlacementDialog.value = true;
    };
    const closePlacementDialog = () => {
      showPlacementDialog.value = false;
      selectedMember.value = null;
      selectedPosition.value = null;
      placementForm.reset();
    };
    const placeToBinaryTree = () => {
      if (!selectedMember.value || !selectedPosition.value) {
        toast.error("Pilih posisi terlebih dahulu");
        return;
      }
      placementForm.position = selectedPosition.value;
      placementForm.post("/client/profile/place-member", {
        onSuccess: () => {
          toast.success(`${selectedMember.value?.name} berhasil ditempatkan di posisi ${selectedPosition.value}`);
          closePlacementDialog();
        },
        onError: (errors) => {
          const errorMessage = errors.error || "Gagal menempatkan member ke binary tree";
          toast.error(errorMessage);
        }
      });
    };
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
    };
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount);
    };
    const getPositionBadge = (position) => {
      if (!position) return { variant: "outline", text: "Belum Ditempatkan" };
      return {
        variant: position === "left" ? "default" : "secondary",
        text: position === "left" ? "Kiri" : "Kanan"
      };
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(_sfc_main$o), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$v), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$w), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Jaringan Member`);
                      } else {
                        return [
                          createTextVNode("Jaringan Member")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$N), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Kelola dan lihat member dalam jaringan Anda`);
                      } else {
                        return [
                          createTextVNode("Kelola dan lihat member dalam jaringan Anda")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$w), null, {
                      default: withCtx(() => [
                        createTextVNode("Jaringan Member")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$N), null, {
                      default: withCtx(() => [
                        createTextVNode("Kelola dan lihat member dalam jaringan Anda")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$p), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$Y), {
                    "default-value": "active",
                    class: "w-full"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$Z), { class: "grid w-full grid-cols-3" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$_), { value: "active" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(CheckCircle), { class: "w-4 h-4 mr-2" }, null, _parent6, _scopeId5));
                                    _push6(` Aktif (${ssrInterpolate(__props.activeMembers.length)}) `);
                                  } else {
                                    return [
                                      createVNode(unref(CheckCircle), { class: "w-4 h-4 mr-2" }),
                                      createTextVNode(" Aktif (" + toDisplayString(__props.activeMembers.length) + ") ", 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$_), { value: "passive" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(Clock), { class: "w-4 h-4 mr-2" }, null, _parent6, _scopeId5));
                                    _push6(` Pasif (${ssrInterpolate(__props.passiveMembers.length)}) `);
                                  } else {
                                    return [
                                      createVNode(unref(Clock), { class: "w-4 h-4 mr-2" }),
                                      createTextVNode(" Pasif (" + toDisplayString(__props.passiveMembers.length) + ") ", 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$_), { value: "prospect" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(UserPlus), { class: "w-4 h-4 mr-2" }, null, _parent6, _scopeId5));
                                    _push6(` Prospek (${ssrInterpolate(__props.prospectMembers.length)}) `);
                                  } else {
                                    return [
                                      createVNode(unref(UserPlus), { class: "w-4 h-4 mr-2" }),
                                      createTextVNode(" Prospek (" + toDisplayString(__props.prospectMembers.length) + ") ", 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$_), { value: "active" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(CheckCircle), { class: "w-4 h-4 mr-2" }),
                                    createTextVNode(" Aktif (" + toDisplayString(__props.activeMembers.length) + ") ", 1)
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$_), { value: "passive" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Clock), { class: "w-4 h-4 mr-2" }),
                                    createTextVNode(" Pasif (" + toDisplayString(__props.passiveMembers.length) + ") ", 1)
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$_), { value: "prospect" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(UserPlus), { class: "w-4 h-4 mr-2" }),
                                    createTextVNode(" Prospek (" + toDisplayString(__props.prospectMembers.length) + ") ", 1)
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$$), {
                          value: "active",
                          class: "space-y-4"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (__props.activeMembers.length === 0) {
                                _push5(`<div class="text-center py-12 text-muted-foreground"${_scopeId4}>`);
                                _push5(ssrRenderComponent(unref(CheckCircle), { class: "w-12 h-12 mx-auto mb-4 opacity-20" }, null, _parent5, _scopeId4));
                                _push5(`<p${_scopeId4}>Belum ada member aktif</p><p class="text-sm mt-2"${_scopeId4}>Member aktif adalah member yang sudah ditempatkan di binary tree</p></div>`);
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(`<!--[-->`);
                              ssrRenderList(__props.activeMembers, (member) => {
                                _push5(ssrRenderComponent(unref(_sfc_main$o), {
                                  key: member.id,
                                  class: "hover:shadow-md transition-shadow"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(_sfc_main$p), { class: "p-4" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`<div class="flex items-start justify-between"${_scopeId6}><div class="flex-1"${_scopeId6}><div class="flex items-center gap-2 mb-2"${_scopeId6}><h4 class="font-semibold text-lg"${_scopeId6}>${ssrInterpolate(member.name)}</h4>`);
                                            _push7(ssrRenderComponent(unref(_sfc_main$t), {
                                              variant: getPositionBadge(member.position).variant
                                            }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(getPositionBadge(member.position).text)}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(getPositionBadge(member.position).text), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            if (member.level) {
                                              _push7(ssrRenderComponent(unref(_sfc_main$t), { variant: "outline" }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(` Level ${ssrInterpolate(member.level)}`);
                                                  } else {
                                                    return [
                                                      createTextVNode(" Level " + toDisplayString(member.level), 1)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                            } else {
                                              _push7(`<!---->`);
                                            }
                                            _push7(`</div><div class="space-y-1 text-sm text-muted-foreground"${_scopeId6}><p${_scopeId6}>${ssrInterpolate(member.email)}</p>`);
                                            if (member.phone) {
                                              _push7(`<p${_scopeId6}>${ssrInterpolate(member.phone)}</p>`);
                                            } else {
                                              _push7(`<!---->`);
                                            }
                                            if (member.package_name) {
                                              _push7(`<p class="text-xs font-medium text-primary"${_scopeId6}> Paket: ${ssrInterpolate(member.package_name)}</p>`);
                                            } else {
                                              _push7(`<!---->`);
                                            }
                                            if ((member.total_left ?? 0) > 0 || (member.total_right ?? 0) > 0) {
                                              _push7(`<p class="text-xs"${_scopeId6}><span class="text-blue-600 dark:text-blue-400"${_scopeId6}>Kiri: ${ssrInterpolate(member.total_left ?? 0)}</span><span class="mx-1"${_scopeId6}>|</span><span class="text-green-600 dark:text-green-400"${_scopeId6}>Kanan: ${ssrInterpolate(member.total_right ?? 0)}</span></p>`);
                                            } else {
                                              _push7(`<!---->`);
                                            }
                                            _push7(`<p class="text-xs"${_scopeId6}>Bergabung: ${ssrInterpolate(formatDate(member.joined_at))}</p><p class="text-xs font-medium text-green-600 dark:text-green-400"${_scopeId6}> Omzet: ${ssrInterpolate(formatCurrency(member.omzet))}</p></div></div><div class="flex flex-col items-end gap-2"${_scopeId6}>`);
                                            _push7(ssrRenderComponent(unref(_sfc_main$t), { variant: "default" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(unref(CheckCircle), { class: "w-3 h-3 mr-1" }, null, _parent8, _scopeId7));
                                                  _push8(` Aktif `);
                                                } else {
                                                  return [
                                                    createVNode(unref(CheckCircle), { class: "w-3 h-3 mr-1" }),
                                                    createTextVNode(" Aktif ")
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(`</div></div>`);
                                          } else {
                                            return [
                                              createVNode("div", { class: "flex items-start justify-between" }, [
                                                createVNode("div", { class: "flex-1" }, [
                                                  createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                                    createVNode("h4", { class: "font-semibold text-lg" }, toDisplayString(member.name), 1),
                                                    createVNode(unref(_sfc_main$t), {
                                                      variant: getPositionBadge(member.position).variant
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(getPositionBadge(member.position).text), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["variant"]),
                                                    member.level ? (openBlock(), createBlock(unref(_sfc_main$t), {
                                                      key: 0,
                                                      variant: "outline"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(" Level " + toDisplayString(member.level), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024)) : createCommentVNode("", true)
                                                  ]),
                                                  createVNode("div", { class: "space-y-1 text-sm text-muted-foreground" }, [
                                                    createVNode("p", null, toDisplayString(member.email), 1),
                                                    member.phone ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(member.phone), 1)) : createCommentVNode("", true),
                                                    member.package_name ? (openBlock(), createBlock("p", {
                                                      key: 1,
                                                      class: "text-xs font-medium text-primary"
                                                    }, " Paket: " + toDisplayString(member.package_name), 1)) : createCommentVNode("", true),
                                                    (member.total_left ?? 0) > 0 || (member.total_right ?? 0) > 0 ? (openBlock(), createBlock("p", {
                                                      key: 2,
                                                      class: "text-xs"
                                                    }, [
                                                      createVNode("span", { class: "text-blue-600 dark:text-blue-400" }, "Kiri: " + toDisplayString(member.total_left ?? 0), 1),
                                                      createVNode("span", { class: "mx-1" }, "|"),
                                                      createVNode("span", { class: "text-green-600 dark:text-green-400" }, "Kanan: " + toDisplayString(member.total_right ?? 0), 1)
                                                    ])) : createCommentVNode("", true),
                                                    createVNode("p", { class: "text-xs" }, "Bergabung: " + toDisplayString(formatDate(member.joined_at)), 1),
                                                    createVNode("p", { class: "text-xs font-medium text-green-600 dark:text-green-400" }, " Omzet: " + toDisplayString(formatCurrency(member.omzet)), 1)
                                                  ])
                                                ]),
                                                createVNode("div", { class: "flex flex-col items-end gap-2" }, [
                                                  createVNode(unref(_sfc_main$t), { variant: "default" }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(CheckCircle), { class: "w-3 h-3 mr-1" }),
                                                      createTextVNode(" Aktif ")
                                                    ]),
                                                    _: 1
                                                  })
                                                ])
                                              ])
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(unref(_sfc_main$p), { class: "p-4" }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "flex items-start justify-between" }, [
                                              createVNode("div", { class: "flex-1" }, [
                                                createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                                  createVNode("h4", { class: "font-semibold text-lg" }, toDisplayString(member.name), 1),
                                                  createVNode(unref(_sfc_main$t), {
                                                    variant: getPositionBadge(member.position).variant
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(getPositionBadge(member.position).text), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["variant"]),
                                                  member.level ? (openBlock(), createBlock(unref(_sfc_main$t), {
                                                    key: 0,
                                                    variant: "outline"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(" Level " + toDisplayString(member.level), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024)) : createCommentVNode("", true)
                                                ]),
                                                createVNode("div", { class: "space-y-1 text-sm text-muted-foreground" }, [
                                                  createVNode("p", null, toDisplayString(member.email), 1),
                                                  member.phone ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(member.phone), 1)) : createCommentVNode("", true),
                                                  member.package_name ? (openBlock(), createBlock("p", {
                                                    key: 1,
                                                    class: "text-xs font-medium text-primary"
                                                  }, " Paket: " + toDisplayString(member.package_name), 1)) : createCommentVNode("", true),
                                                  (member.total_left ?? 0) > 0 || (member.total_right ?? 0) > 0 ? (openBlock(), createBlock("p", {
                                                    key: 2,
                                                    class: "text-xs"
                                                  }, [
                                                    createVNode("span", { class: "text-blue-600 dark:text-blue-400" }, "Kiri: " + toDisplayString(member.total_left ?? 0), 1),
                                                    createVNode("span", { class: "mx-1" }, "|"),
                                                    createVNode("span", { class: "text-green-600 dark:text-green-400" }, "Kanan: " + toDisplayString(member.total_right ?? 0), 1)
                                                  ])) : createCommentVNode("", true),
                                                  createVNode("p", { class: "text-xs" }, "Bergabung: " + toDisplayString(formatDate(member.joined_at)), 1),
                                                  createVNode("p", { class: "text-xs font-medium text-green-600 dark:text-green-400" }, " Omzet: " + toDisplayString(formatCurrency(member.omzet)), 1)
                                                ])
                                              ]),
                                              createVNode("div", { class: "flex flex-col items-end gap-2" }, [
                                                createVNode(unref(_sfc_main$t), { variant: "default" }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(CheckCircle), { class: "w-3 h-3 mr-1" }),
                                                    createTextVNode(" Aktif ")
                                                  ]),
                                                  _: 1
                                                })
                                              ])
                                            ])
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                __props.activeMembers.length === 0 ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "text-center py-12 text-muted-foreground"
                                }, [
                                  createVNode(unref(CheckCircle), { class: "w-12 h-12 mx-auto mb-4 opacity-20" }),
                                  createVNode("p", null, "Belum ada member aktif"),
                                  createVNode("p", { class: "text-sm mt-2" }, "Member aktif adalah member yang sudah ditempatkan di binary tree")
                                ])) : createCommentVNode("", true),
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.activeMembers, (member) => {
                                  return openBlock(), createBlock(unref(_sfc_main$o), {
                                    key: member.id,
                                    class: "hover:shadow-md transition-shadow"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$p), { class: "p-4" }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "flex items-start justify-between" }, [
                                            createVNode("div", { class: "flex-1" }, [
                                              createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                                createVNode("h4", { class: "font-semibold text-lg" }, toDisplayString(member.name), 1),
                                                createVNode(unref(_sfc_main$t), {
                                                  variant: getPositionBadge(member.position).variant
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(getPositionBadge(member.position).text), 1)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["variant"]),
                                                member.level ? (openBlock(), createBlock(unref(_sfc_main$t), {
                                                  key: 0,
                                                  variant: "outline"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(" Level " + toDisplayString(member.level), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024)) : createCommentVNode("", true)
                                              ]),
                                              createVNode("div", { class: "space-y-1 text-sm text-muted-foreground" }, [
                                                createVNode("p", null, toDisplayString(member.email), 1),
                                                member.phone ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(member.phone), 1)) : createCommentVNode("", true),
                                                member.package_name ? (openBlock(), createBlock("p", {
                                                  key: 1,
                                                  class: "text-xs font-medium text-primary"
                                                }, " Paket: " + toDisplayString(member.package_name), 1)) : createCommentVNode("", true),
                                                (member.total_left ?? 0) > 0 || (member.total_right ?? 0) > 0 ? (openBlock(), createBlock("p", {
                                                  key: 2,
                                                  class: "text-xs"
                                                }, [
                                                  createVNode("span", { class: "text-blue-600 dark:text-blue-400" }, "Kiri: " + toDisplayString(member.total_left ?? 0), 1),
                                                  createVNode("span", { class: "mx-1" }, "|"),
                                                  createVNode("span", { class: "text-green-600 dark:text-green-400" }, "Kanan: " + toDisplayString(member.total_right ?? 0), 1)
                                                ])) : createCommentVNode("", true),
                                                createVNode("p", { class: "text-xs" }, "Bergabung: " + toDisplayString(formatDate(member.joined_at)), 1),
                                                createVNode("p", { class: "text-xs font-medium text-green-600 dark:text-green-400" }, " Omzet: " + toDisplayString(formatCurrency(member.omzet)), 1)
                                              ])
                                            ]),
                                            createVNode("div", { class: "flex flex-col items-end gap-2" }, [
                                              createVNode(unref(_sfc_main$t), { variant: "default" }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(CheckCircle), { class: "w-3 h-3 mr-1" }),
                                                  createTextVNode(" Aktif ")
                                                ]),
                                                _: 1
                                              })
                                            ])
                                          ])
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
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$$), {
                          value: "passive",
                          class: "space-y-4"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (__props.passiveMembers.length === 0) {
                                _push5(`<div class="text-center py-12 text-muted-foreground"${_scopeId4}>`);
                                _push5(ssrRenderComponent(unref(Clock), { class: "w-12 h-12 mx-auto mb-4 opacity-20" }, null, _parent5, _scopeId4));
                                _push5(`<p${_scopeId4}>Belum ada member pasif</p><p class="text-sm mt-2"${_scopeId4}>Member pasif adalah member yang belum ditempatkan di binary tree tapi sudah memiliki pembelian/order</p></div>`);
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(`<!--[-->`);
                              ssrRenderList(__props.passiveMembers, (member) => {
                                _push5(ssrRenderComponent(unref(_sfc_main$o), {
                                  key: member.id,
                                  class: "hover:shadow-md transition-shadow"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(_sfc_main$p), { class: "p-4" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`<div class="flex items-start justify-between"${_scopeId6}><div class="flex-1"${_scopeId6}><div class="flex items-center gap-2 mb-2"${_scopeId6}><h4 class="font-semibold text-lg"${_scopeId6}>${ssrInterpolate(member.name)}</h4>`);
                                            _push7(ssrRenderComponent(unref(_sfc_main$t), { variant: "secondary" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`Belum Ditempatkan`);
                                                } else {
                                                  return [
                                                    createTextVNode("Belum Ditempatkan")
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(`</div><div class="space-y-1 text-sm text-muted-foreground"${_scopeId6}><p${_scopeId6}>${ssrInterpolate(member.email)}</p>`);
                                            if (member.phone) {
                                              _push7(`<p${_scopeId6}>${ssrInterpolate(member.phone)}</p>`);
                                            } else {
                                              _push7(`<!---->`);
                                            }
                                            if (member.package_name) {
                                              _push7(`<p class="text-xs font-medium text-primary"${_scopeId6}> Paket: ${ssrInterpolate(member.package_name)}</p>`);
                                            } else {
                                              _push7(`<!---->`);
                                            }
                                            if ((member.total_left ?? 0) > 0 || (member.total_right ?? 0) > 0) {
                                              _push7(`<p class="text-xs"${_scopeId6}><span class="text-blue-600 dark:text-blue-400"${_scopeId6}>Kiri: ${ssrInterpolate(member.total_left ?? 0)}</span><span class="mx-1"${_scopeId6}>|</span><span class="text-green-600 dark:text-green-400"${_scopeId6}>Kanan: ${ssrInterpolate(member.total_right ?? 0)}</span></p>`);
                                            } else {
                                              _push7(`<!---->`);
                                            }
                                            _push7(`<p class="text-xs"${_scopeId6}>Bergabung: ${ssrInterpolate(formatDate(member.joined_at))}</p><p class="text-xs font-medium text-orange-600 dark:text-orange-400"${_scopeId6}> Omzet: ${ssrInterpolate(formatCurrency(member.omzet))}</p></div></div><div class="flex flex-col items-end gap-2"${_scopeId6}>`);
                                            _push7(ssrRenderComponent(unref(_sfc_main$t), { variant: "outline" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(unref(Clock), { class: "w-3 h-3 mr-1" }, null, _parent8, _scopeId7));
                                                  _push8(` Pasif `);
                                                } else {
                                                  return [
                                                    createVNode(unref(Clock), { class: "w-3 h-3 mr-1" }),
                                                    createTextVNode(" Pasif ")
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$t), { variant: "default" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(` Sudah Belanja `);
                                                } else {
                                                  return [
                                                    createTextVNode(" Sudah Belanja ")
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            if (__props.activeMembers.length < 2) {
                                              _push7(ssrRenderComponent(unref(_sfc_main$u), {
                                                size: "sm",
                                                variant: "default",
                                                class: "mt-2",
                                                onClick: ($event) => openPlacementDialog(member)
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(unref(GitBranch), { class: "w-3 h-3 mr-1" }, null, _parent8, _scopeId7));
                                                    _push8(` Tempatkan ke Binary `);
                                                  } else {
                                                    return [
                                                      createVNode(unref(GitBranch), { class: "w-3 h-3 mr-1" }),
                                                      createTextVNode(" Tempatkan ke Binary ")
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                            } else {
                                              _push7(`<!---->`);
                                            }
                                            _push7(`</div></div>`);
                                          } else {
                                            return [
                                              createVNode("div", { class: "flex items-start justify-between" }, [
                                                createVNode("div", { class: "flex-1" }, [
                                                  createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                                    createVNode("h4", { class: "font-semibold text-lg" }, toDisplayString(member.name), 1),
                                                    createVNode(unref(_sfc_main$t), { variant: "secondary" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Belum Ditempatkan")
                                                      ]),
                                                      _: 1
                                                    })
                                                  ]),
                                                  createVNode("div", { class: "space-y-1 text-sm text-muted-foreground" }, [
                                                    createVNode("p", null, toDisplayString(member.email), 1),
                                                    member.phone ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(member.phone), 1)) : createCommentVNode("", true),
                                                    member.package_name ? (openBlock(), createBlock("p", {
                                                      key: 1,
                                                      class: "text-xs font-medium text-primary"
                                                    }, " Paket: " + toDisplayString(member.package_name), 1)) : createCommentVNode("", true),
                                                    (member.total_left ?? 0) > 0 || (member.total_right ?? 0) > 0 ? (openBlock(), createBlock("p", {
                                                      key: 2,
                                                      class: "text-xs"
                                                    }, [
                                                      createVNode("span", { class: "text-blue-600 dark:text-blue-400" }, "Kiri: " + toDisplayString(member.total_left ?? 0), 1),
                                                      createVNode("span", { class: "mx-1" }, "|"),
                                                      createVNode("span", { class: "text-green-600 dark:text-green-400" }, "Kanan: " + toDisplayString(member.total_right ?? 0), 1)
                                                    ])) : createCommentVNode("", true),
                                                    createVNode("p", { class: "text-xs" }, "Bergabung: " + toDisplayString(formatDate(member.joined_at)), 1),
                                                    createVNode("p", { class: "text-xs font-medium text-orange-600 dark:text-orange-400" }, " Omzet: " + toDisplayString(formatCurrency(member.omzet)), 1)
                                                  ])
                                                ]),
                                                createVNode("div", { class: "flex flex-col items-end gap-2" }, [
                                                  createVNode(unref(_sfc_main$t), { variant: "outline" }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(Clock), { class: "w-3 h-3 mr-1" }),
                                                      createTextVNode(" Pasif ")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(unref(_sfc_main$t), { variant: "default" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(" Sudah Belanja ")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  __props.activeMembers.length < 2 ? (openBlock(), createBlock(unref(_sfc_main$u), {
                                                    key: 0,
                                                    size: "sm",
                                                    variant: "default",
                                                    class: "mt-2",
                                                    onClick: ($event) => openPlacementDialog(member)
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(GitBranch), { class: "w-3 h-3 mr-1" }),
                                                      createTextVNode(" Tempatkan ke Binary ")
                                                    ]),
                                                    _: 1
                                                  }, 8, ["onClick"])) : createCommentVNode("", true)
                                                ])
                                              ])
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(unref(_sfc_main$p), { class: "p-4" }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "flex items-start justify-between" }, [
                                              createVNode("div", { class: "flex-1" }, [
                                                createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                                  createVNode("h4", { class: "font-semibold text-lg" }, toDisplayString(member.name), 1),
                                                  createVNode(unref(_sfc_main$t), { variant: "secondary" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Belum Ditempatkan")
                                                    ]),
                                                    _: 1
                                                  })
                                                ]),
                                                createVNode("div", { class: "space-y-1 text-sm text-muted-foreground" }, [
                                                  createVNode("p", null, toDisplayString(member.email), 1),
                                                  member.phone ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(member.phone), 1)) : createCommentVNode("", true),
                                                  member.package_name ? (openBlock(), createBlock("p", {
                                                    key: 1,
                                                    class: "text-xs font-medium text-primary"
                                                  }, " Paket: " + toDisplayString(member.package_name), 1)) : createCommentVNode("", true),
                                                  (member.total_left ?? 0) > 0 || (member.total_right ?? 0) > 0 ? (openBlock(), createBlock("p", {
                                                    key: 2,
                                                    class: "text-xs"
                                                  }, [
                                                    createVNode("span", { class: "text-blue-600 dark:text-blue-400" }, "Kiri: " + toDisplayString(member.total_left ?? 0), 1),
                                                    createVNode("span", { class: "mx-1" }, "|"),
                                                    createVNode("span", { class: "text-green-600 dark:text-green-400" }, "Kanan: " + toDisplayString(member.total_right ?? 0), 1)
                                                  ])) : createCommentVNode("", true),
                                                  createVNode("p", { class: "text-xs" }, "Bergabung: " + toDisplayString(formatDate(member.joined_at)), 1),
                                                  createVNode("p", { class: "text-xs font-medium text-orange-600 dark:text-orange-400" }, " Omzet: " + toDisplayString(formatCurrency(member.omzet)), 1)
                                                ])
                                              ]),
                                              createVNode("div", { class: "flex flex-col items-end gap-2" }, [
                                                createVNode(unref(_sfc_main$t), { variant: "outline" }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(Clock), { class: "w-3 h-3 mr-1" }),
                                                    createTextVNode(" Pasif ")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(unref(_sfc_main$t), { variant: "default" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(" Sudah Belanja ")
                                                  ]),
                                                  _: 1
                                                }),
                                                __props.activeMembers.length < 2 ? (openBlock(), createBlock(unref(_sfc_main$u), {
                                                  key: 0,
                                                  size: "sm",
                                                  variant: "default",
                                                  class: "mt-2",
                                                  onClick: ($event) => openPlacementDialog(member)
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(GitBranch), { class: "w-3 h-3 mr-1" }),
                                                    createTextVNode(" Tempatkan ke Binary ")
                                                  ]),
                                                  _: 1
                                                }, 8, ["onClick"])) : createCommentVNode("", true)
                                              ])
                                            ])
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                __props.passiveMembers.length === 0 ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "text-center py-12 text-muted-foreground"
                                }, [
                                  createVNode(unref(Clock), { class: "w-12 h-12 mx-auto mb-4 opacity-20" }),
                                  createVNode("p", null, "Belum ada member pasif"),
                                  createVNode("p", { class: "text-sm mt-2" }, "Member pasif adalah member yang belum ditempatkan di binary tree tapi sudah memiliki pembelian/order")
                                ])) : createCommentVNode("", true),
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.passiveMembers, (member) => {
                                  return openBlock(), createBlock(unref(_sfc_main$o), {
                                    key: member.id,
                                    class: "hover:shadow-md transition-shadow"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$p), { class: "p-4" }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "flex items-start justify-between" }, [
                                            createVNode("div", { class: "flex-1" }, [
                                              createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                                createVNode("h4", { class: "font-semibold text-lg" }, toDisplayString(member.name), 1),
                                                createVNode(unref(_sfc_main$t), { variant: "secondary" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Belum Ditempatkan")
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              createVNode("div", { class: "space-y-1 text-sm text-muted-foreground" }, [
                                                createVNode("p", null, toDisplayString(member.email), 1),
                                                member.phone ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(member.phone), 1)) : createCommentVNode("", true),
                                                member.package_name ? (openBlock(), createBlock("p", {
                                                  key: 1,
                                                  class: "text-xs font-medium text-primary"
                                                }, " Paket: " + toDisplayString(member.package_name), 1)) : createCommentVNode("", true),
                                                (member.total_left ?? 0) > 0 || (member.total_right ?? 0) > 0 ? (openBlock(), createBlock("p", {
                                                  key: 2,
                                                  class: "text-xs"
                                                }, [
                                                  createVNode("span", { class: "text-blue-600 dark:text-blue-400" }, "Kiri: " + toDisplayString(member.total_left ?? 0), 1),
                                                  createVNode("span", { class: "mx-1" }, "|"),
                                                  createVNode("span", { class: "text-green-600 dark:text-green-400" }, "Kanan: " + toDisplayString(member.total_right ?? 0), 1)
                                                ])) : createCommentVNode("", true),
                                                createVNode("p", { class: "text-xs" }, "Bergabung: " + toDisplayString(formatDate(member.joined_at)), 1),
                                                createVNode("p", { class: "text-xs font-medium text-orange-600 dark:text-orange-400" }, " Omzet: " + toDisplayString(formatCurrency(member.omzet)), 1)
                                              ])
                                            ]),
                                            createVNode("div", { class: "flex flex-col items-end gap-2" }, [
                                              createVNode(unref(_sfc_main$t), { variant: "outline" }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(Clock), { class: "w-3 h-3 mr-1" }),
                                                  createTextVNode(" Pasif ")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(unref(_sfc_main$t), { variant: "default" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" Sudah Belanja ")
                                                ]),
                                                _: 1
                                              }),
                                              __props.activeMembers.length < 2 ? (openBlock(), createBlock(unref(_sfc_main$u), {
                                                key: 0,
                                                size: "sm",
                                                variant: "default",
                                                class: "mt-2",
                                                onClick: ($event) => openPlacementDialog(member)
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(GitBranch), { class: "w-3 h-3 mr-1" }),
                                                  createTextVNode(" Tempatkan ke Binary ")
                                                ]),
                                                _: 1
                                              }, 8, ["onClick"])) : createCommentVNode("", true)
                                            ])
                                          ])
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
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$$), {
                          value: "prospect",
                          class: "space-y-4"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (__props.prospectMembers.length === 0) {
                                _push5(`<div class="text-center py-12 text-muted-foreground"${_scopeId4}>`);
                                _push5(ssrRenderComponent(unref(UserPlus), { class: "w-12 h-12 mx-auto mb-4 opacity-20" }, null, _parent5, _scopeId4));
                                _push5(`<p${_scopeId4}>Belum ada member prospek</p><p class="text-sm mt-2"${_scopeId4}>Member prospek adalah member yang baru mendaftar, belum ditempatkan di binary tree dan belum memiliki pembelian/order</p></div>`);
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(`<!--[-->`);
                              ssrRenderList(__props.prospectMembers, (member) => {
                                _push5(ssrRenderComponent(unref(_sfc_main$o), {
                                  key: member.id,
                                  class: "hover:shadow-md transition-shadow"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(_sfc_main$p), { class: "p-4" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`<div class="flex items-start justify-between"${_scopeId6}><div class="flex-1"${_scopeId6}><div class="flex items-center gap-2 mb-2"${_scopeId6}><h4 class="font-semibold text-lg"${_scopeId6}>${ssrInterpolate(member.name)}</h4>`);
                                            _push7(ssrRenderComponent(unref(_sfc_main$t), { variant: "outline" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`Baru Bergabung`);
                                                } else {
                                                  return [
                                                    createTextVNode("Baru Bergabung")
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(`</div><div class="space-y-1 text-sm text-muted-foreground"${_scopeId6}><p${_scopeId6}>${ssrInterpolate(member.email)}</p>`);
                                            if (member.phone) {
                                              _push7(`<p${_scopeId6}>${ssrInterpolate(member.phone)}</p>`);
                                            } else {
                                              _push7(`<!---->`);
                                            }
                                            if (member.package_name) {
                                              _push7(`<p class="text-xs font-medium text-primary"${_scopeId6}> Paket: ${ssrInterpolate(member.package_name)}</p>`);
                                            } else {
                                              _push7(`<!---->`);
                                            }
                                            if ((member.total_left ?? 0) > 0 || (member.total_right ?? 0) > 0) {
                                              _push7(`<p class="text-xs"${_scopeId6}><span class="text-blue-600 dark:text-blue-400"${_scopeId6}>Kiri: ${ssrInterpolate(member.total_left ?? 0)}</span><span class="mx-1"${_scopeId6}>|</span><span class="text-green-600 dark:text-green-400"${_scopeId6}>Kanan: ${ssrInterpolate(member.total_right ?? 0)}</span></p>`);
                                            } else {
                                              _push7(`<!---->`);
                                            }
                                            _push7(`<p class="text-xs"${_scopeId6}>Bergabung: ${ssrInterpolate(formatDate(member.joined_at))}</p><p class="text-xs font-medium text-gray-500 dark:text-gray-400"${_scopeId6}> Omzet: ${ssrInterpolate(formatCurrency(member.omzet))}</p></div></div><div class="flex flex-col items-end gap-2"${_scopeId6}>`);
                                            _push7(ssrRenderComponent(unref(_sfc_main$t), { variant: "secondary" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(unref(UserPlus), { class: "w-3 h-3 mr-1" }, null, _parent8, _scopeId7));
                                                  _push8(` Prospek `);
                                                } else {
                                                  return [
                                                    createVNode(unref(UserPlus), { class: "w-3 h-3 mr-1" }),
                                                    createTextVNode(" Prospek ")
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$t), { variant: "secondary" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(` Belum Belanja `);
                                                } else {
                                                  return [
                                                    createTextVNode(" Belum Belanja ")
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(`</div></div>`);
                                          } else {
                                            return [
                                              createVNode("div", { class: "flex items-start justify-between" }, [
                                                createVNode("div", { class: "flex-1" }, [
                                                  createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                                    createVNode("h4", { class: "font-semibold text-lg" }, toDisplayString(member.name), 1),
                                                    createVNode(unref(_sfc_main$t), { variant: "outline" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Baru Bergabung")
                                                      ]),
                                                      _: 1
                                                    })
                                                  ]),
                                                  createVNode("div", { class: "space-y-1 text-sm text-muted-foreground" }, [
                                                    createVNode("p", null, toDisplayString(member.email), 1),
                                                    member.phone ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(member.phone), 1)) : createCommentVNode("", true),
                                                    member.package_name ? (openBlock(), createBlock("p", {
                                                      key: 1,
                                                      class: "text-xs font-medium text-primary"
                                                    }, " Paket: " + toDisplayString(member.package_name), 1)) : createCommentVNode("", true),
                                                    (member.total_left ?? 0) > 0 || (member.total_right ?? 0) > 0 ? (openBlock(), createBlock("p", {
                                                      key: 2,
                                                      class: "text-xs"
                                                    }, [
                                                      createVNode("span", { class: "text-blue-600 dark:text-blue-400" }, "Kiri: " + toDisplayString(member.total_left ?? 0), 1),
                                                      createVNode("span", { class: "mx-1" }, "|"),
                                                      createVNode("span", { class: "text-green-600 dark:text-green-400" }, "Kanan: " + toDisplayString(member.total_right ?? 0), 1)
                                                    ])) : createCommentVNode("", true),
                                                    createVNode("p", { class: "text-xs" }, "Bergabung: " + toDisplayString(formatDate(member.joined_at)), 1),
                                                    createVNode("p", { class: "text-xs font-medium text-gray-500 dark:text-gray-400" }, " Omzet: " + toDisplayString(formatCurrency(member.omzet)), 1)
                                                  ])
                                                ]),
                                                createVNode("div", { class: "flex flex-col items-end gap-2" }, [
                                                  createVNode(unref(_sfc_main$t), { variant: "secondary" }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(UserPlus), { class: "w-3 h-3 mr-1" }),
                                                      createTextVNode(" Prospek ")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(unref(_sfc_main$t), { variant: "secondary" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(" Belum Belanja ")
                                                    ]),
                                                    _: 1
                                                  })
                                                ])
                                              ])
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(unref(_sfc_main$p), { class: "p-4" }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "flex items-start justify-between" }, [
                                              createVNode("div", { class: "flex-1" }, [
                                                createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                                  createVNode("h4", { class: "font-semibold text-lg" }, toDisplayString(member.name), 1),
                                                  createVNode(unref(_sfc_main$t), { variant: "outline" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Baru Bergabung")
                                                    ]),
                                                    _: 1
                                                  })
                                                ]),
                                                createVNode("div", { class: "space-y-1 text-sm text-muted-foreground" }, [
                                                  createVNode("p", null, toDisplayString(member.email), 1),
                                                  member.phone ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(member.phone), 1)) : createCommentVNode("", true),
                                                  member.package_name ? (openBlock(), createBlock("p", {
                                                    key: 1,
                                                    class: "text-xs font-medium text-primary"
                                                  }, " Paket: " + toDisplayString(member.package_name), 1)) : createCommentVNode("", true),
                                                  (member.total_left ?? 0) > 0 || (member.total_right ?? 0) > 0 ? (openBlock(), createBlock("p", {
                                                    key: 2,
                                                    class: "text-xs"
                                                  }, [
                                                    createVNode("span", { class: "text-blue-600 dark:text-blue-400" }, "Kiri: " + toDisplayString(member.total_left ?? 0), 1),
                                                    createVNode("span", { class: "mx-1" }, "|"),
                                                    createVNode("span", { class: "text-green-600 dark:text-green-400" }, "Kanan: " + toDisplayString(member.total_right ?? 0), 1)
                                                  ])) : createCommentVNode("", true),
                                                  createVNode("p", { class: "text-xs" }, "Bergabung: " + toDisplayString(formatDate(member.joined_at)), 1),
                                                  createVNode("p", { class: "text-xs font-medium text-gray-500 dark:text-gray-400" }, " Omzet: " + toDisplayString(formatCurrency(member.omzet)), 1)
                                                ])
                                              ]),
                                              createVNode("div", { class: "flex flex-col items-end gap-2" }, [
                                                createVNode(unref(_sfc_main$t), { variant: "secondary" }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(UserPlus), { class: "w-3 h-3 mr-1" }),
                                                    createTextVNode(" Prospek ")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(unref(_sfc_main$t), { variant: "secondary" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(" Belum Belanja ")
                                                  ]),
                                                  _: 1
                                                })
                                              ])
                                            ])
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                __props.prospectMembers.length === 0 ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "text-center py-12 text-muted-foreground"
                                }, [
                                  createVNode(unref(UserPlus), { class: "w-12 h-12 mx-auto mb-4 opacity-20" }),
                                  createVNode("p", null, "Belum ada member prospek"),
                                  createVNode("p", { class: "text-sm mt-2" }, "Member prospek adalah member yang baru mendaftar, belum ditempatkan di binary tree dan belum memiliki pembelian/order")
                                ])) : createCommentVNode("", true),
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.prospectMembers, (member) => {
                                  return openBlock(), createBlock(unref(_sfc_main$o), {
                                    key: member.id,
                                    class: "hover:shadow-md transition-shadow"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$p), { class: "p-4" }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "flex items-start justify-between" }, [
                                            createVNode("div", { class: "flex-1" }, [
                                              createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                                createVNode("h4", { class: "font-semibold text-lg" }, toDisplayString(member.name), 1),
                                                createVNode(unref(_sfc_main$t), { variant: "outline" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Baru Bergabung")
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              createVNode("div", { class: "space-y-1 text-sm text-muted-foreground" }, [
                                                createVNode("p", null, toDisplayString(member.email), 1),
                                                member.phone ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(member.phone), 1)) : createCommentVNode("", true),
                                                member.package_name ? (openBlock(), createBlock("p", {
                                                  key: 1,
                                                  class: "text-xs font-medium text-primary"
                                                }, " Paket: " + toDisplayString(member.package_name), 1)) : createCommentVNode("", true),
                                                (member.total_left ?? 0) > 0 || (member.total_right ?? 0) > 0 ? (openBlock(), createBlock("p", {
                                                  key: 2,
                                                  class: "text-xs"
                                                }, [
                                                  createVNode("span", { class: "text-blue-600 dark:text-blue-400" }, "Kiri: " + toDisplayString(member.total_left ?? 0), 1),
                                                  createVNode("span", { class: "mx-1" }, "|"),
                                                  createVNode("span", { class: "text-green-600 dark:text-green-400" }, "Kanan: " + toDisplayString(member.total_right ?? 0), 1)
                                                ])) : createCommentVNode("", true),
                                                createVNode("p", { class: "text-xs" }, "Bergabung: " + toDisplayString(formatDate(member.joined_at)), 1),
                                                createVNode("p", { class: "text-xs font-medium text-gray-500 dark:text-gray-400" }, " Omzet: " + toDisplayString(formatCurrency(member.omzet)), 1)
                                              ])
                                            ]),
                                            createVNode("div", { class: "flex flex-col items-end gap-2" }, [
                                              createVNode(unref(_sfc_main$t), { variant: "secondary" }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(UserPlus), { class: "w-3 h-3 mr-1" }),
                                                  createTextVNode(" Prospek ")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(unref(_sfc_main$t), { variant: "secondary" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" Belum Belanja ")
                                                ]),
                                                _: 1
                                              })
                                            ])
                                          ])
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
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$Z), { class: "grid w-full grid-cols-3" }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$_), { value: "active" }, {
                                default: withCtx(() => [
                                  createVNode(unref(CheckCircle), { class: "w-4 h-4 mr-2" }),
                                  createTextVNode(" Aktif (" + toDisplayString(__props.activeMembers.length) + ") ", 1)
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$_), { value: "passive" }, {
                                default: withCtx(() => [
                                  createVNode(unref(Clock), { class: "w-4 h-4 mr-2" }),
                                  createTextVNode(" Pasif (" + toDisplayString(__props.passiveMembers.length) + ") ", 1)
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$_), { value: "prospect" }, {
                                default: withCtx(() => [
                                  createVNode(unref(UserPlus), { class: "w-4 h-4 mr-2" }),
                                  createTextVNode(" Prospek (" + toDisplayString(__props.prospectMembers.length) + ") ", 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$$), {
                            value: "active",
                            class: "space-y-4"
                          }, {
                            default: withCtx(() => [
                              __props.activeMembers.length === 0 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "text-center py-12 text-muted-foreground"
                              }, [
                                createVNode(unref(CheckCircle), { class: "w-12 h-12 mx-auto mb-4 opacity-20" }),
                                createVNode("p", null, "Belum ada member aktif"),
                                createVNode("p", { class: "text-sm mt-2" }, "Member aktif adalah member yang sudah ditempatkan di binary tree")
                              ])) : createCommentVNode("", true),
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.activeMembers, (member) => {
                                return openBlock(), createBlock(unref(_sfc_main$o), {
                                  key: member.id,
                                  class: "hover:shadow-md transition-shadow"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$p), { class: "p-4" }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "flex items-start justify-between" }, [
                                          createVNode("div", { class: "flex-1" }, [
                                            createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                              createVNode("h4", { class: "font-semibold text-lg" }, toDisplayString(member.name), 1),
                                              createVNode(unref(_sfc_main$t), {
                                                variant: getPositionBadge(member.position).variant
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(getPositionBadge(member.position).text), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["variant"]),
                                              member.level ? (openBlock(), createBlock(unref(_sfc_main$t), {
                                                key: 0,
                                                variant: "outline"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" Level " + toDisplayString(member.level), 1)
                                                ]),
                                                _: 2
                                              }, 1024)) : createCommentVNode("", true)
                                            ]),
                                            createVNode("div", { class: "space-y-1 text-sm text-muted-foreground" }, [
                                              createVNode("p", null, toDisplayString(member.email), 1),
                                              member.phone ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(member.phone), 1)) : createCommentVNode("", true),
                                              member.package_name ? (openBlock(), createBlock("p", {
                                                key: 1,
                                                class: "text-xs font-medium text-primary"
                                              }, " Paket: " + toDisplayString(member.package_name), 1)) : createCommentVNode("", true),
                                              (member.total_left ?? 0) > 0 || (member.total_right ?? 0) > 0 ? (openBlock(), createBlock("p", {
                                                key: 2,
                                                class: "text-xs"
                                              }, [
                                                createVNode("span", { class: "text-blue-600 dark:text-blue-400" }, "Kiri: " + toDisplayString(member.total_left ?? 0), 1),
                                                createVNode("span", { class: "mx-1" }, "|"),
                                                createVNode("span", { class: "text-green-600 dark:text-green-400" }, "Kanan: " + toDisplayString(member.total_right ?? 0), 1)
                                              ])) : createCommentVNode("", true),
                                              createVNode("p", { class: "text-xs" }, "Bergabung: " + toDisplayString(formatDate(member.joined_at)), 1),
                                              createVNode("p", { class: "text-xs font-medium text-green-600 dark:text-green-400" }, " Omzet: " + toDisplayString(formatCurrency(member.omzet)), 1)
                                            ])
                                          ]),
                                          createVNode("div", { class: "flex flex-col items-end gap-2" }, [
                                            createVNode(unref(_sfc_main$t), { variant: "default" }, {
                                              default: withCtx(() => [
                                                createVNode(unref(CheckCircle), { class: "w-3 h-3 mr-1" }),
                                                createTextVNode(" Aktif ")
                                              ]),
                                              _: 1
                                            })
                                          ])
                                        ])
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024);
                              }), 128))
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$$), {
                            value: "passive",
                            class: "space-y-4"
                          }, {
                            default: withCtx(() => [
                              __props.passiveMembers.length === 0 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "text-center py-12 text-muted-foreground"
                              }, [
                                createVNode(unref(Clock), { class: "w-12 h-12 mx-auto mb-4 opacity-20" }),
                                createVNode("p", null, "Belum ada member pasif"),
                                createVNode("p", { class: "text-sm mt-2" }, "Member pasif adalah member yang belum ditempatkan di binary tree tapi sudah memiliki pembelian/order")
                              ])) : createCommentVNode("", true),
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.passiveMembers, (member) => {
                                return openBlock(), createBlock(unref(_sfc_main$o), {
                                  key: member.id,
                                  class: "hover:shadow-md transition-shadow"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$p), { class: "p-4" }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "flex items-start justify-between" }, [
                                          createVNode("div", { class: "flex-1" }, [
                                            createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                              createVNode("h4", { class: "font-semibold text-lg" }, toDisplayString(member.name), 1),
                                              createVNode(unref(_sfc_main$t), { variant: "secondary" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Belum Ditempatkan")
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            createVNode("div", { class: "space-y-1 text-sm text-muted-foreground" }, [
                                              createVNode("p", null, toDisplayString(member.email), 1),
                                              member.phone ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(member.phone), 1)) : createCommentVNode("", true),
                                              member.package_name ? (openBlock(), createBlock("p", {
                                                key: 1,
                                                class: "text-xs font-medium text-primary"
                                              }, " Paket: " + toDisplayString(member.package_name), 1)) : createCommentVNode("", true),
                                              (member.total_left ?? 0) > 0 || (member.total_right ?? 0) > 0 ? (openBlock(), createBlock("p", {
                                                key: 2,
                                                class: "text-xs"
                                              }, [
                                                createVNode("span", { class: "text-blue-600 dark:text-blue-400" }, "Kiri: " + toDisplayString(member.total_left ?? 0), 1),
                                                createVNode("span", { class: "mx-1" }, "|"),
                                                createVNode("span", { class: "text-green-600 dark:text-green-400" }, "Kanan: " + toDisplayString(member.total_right ?? 0), 1)
                                              ])) : createCommentVNode("", true),
                                              createVNode("p", { class: "text-xs" }, "Bergabung: " + toDisplayString(formatDate(member.joined_at)), 1),
                                              createVNode("p", { class: "text-xs font-medium text-orange-600 dark:text-orange-400" }, " Omzet: " + toDisplayString(formatCurrency(member.omzet)), 1)
                                            ])
                                          ]),
                                          createVNode("div", { class: "flex flex-col items-end gap-2" }, [
                                            createVNode(unref(_sfc_main$t), { variant: "outline" }, {
                                              default: withCtx(() => [
                                                createVNode(unref(Clock), { class: "w-3 h-3 mr-1" }),
                                                createTextVNode(" Pasif ")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$t), { variant: "default" }, {
                                              default: withCtx(() => [
                                                createTextVNode(" Sudah Belanja ")
                                              ]),
                                              _: 1
                                            }),
                                            __props.activeMembers.length < 2 ? (openBlock(), createBlock(unref(_sfc_main$u), {
                                              key: 0,
                                              size: "sm",
                                              variant: "default",
                                              class: "mt-2",
                                              onClick: ($event) => openPlacementDialog(member)
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(GitBranch), { class: "w-3 h-3 mr-1" }),
                                                createTextVNode(" Tempatkan ke Binary ")
                                              ]),
                                              _: 1
                                            }, 8, ["onClick"])) : createCommentVNode("", true)
                                          ])
                                        ])
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024);
                              }), 128))
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$$), {
                            value: "prospect",
                            class: "space-y-4"
                          }, {
                            default: withCtx(() => [
                              __props.prospectMembers.length === 0 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "text-center py-12 text-muted-foreground"
                              }, [
                                createVNode(unref(UserPlus), { class: "w-12 h-12 mx-auto mb-4 opacity-20" }),
                                createVNode("p", null, "Belum ada member prospek"),
                                createVNode("p", { class: "text-sm mt-2" }, "Member prospek adalah member yang baru mendaftar, belum ditempatkan di binary tree dan belum memiliki pembelian/order")
                              ])) : createCommentVNode("", true),
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.prospectMembers, (member) => {
                                return openBlock(), createBlock(unref(_sfc_main$o), {
                                  key: member.id,
                                  class: "hover:shadow-md transition-shadow"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$p), { class: "p-4" }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "flex items-start justify-between" }, [
                                          createVNode("div", { class: "flex-1" }, [
                                            createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                              createVNode("h4", { class: "font-semibold text-lg" }, toDisplayString(member.name), 1),
                                              createVNode(unref(_sfc_main$t), { variant: "outline" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Baru Bergabung")
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            createVNode("div", { class: "space-y-1 text-sm text-muted-foreground" }, [
                                              createVNode("p", null, toDisplayString(member.email), 1),
                                              member.phone ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(member.phone), 1)) : createCommentVNode("", true),
                                              member.package_name ? (openBlock(), createBlock("p", {
                                                key: 1,
                                                class: "text-xs font-medium text-primary"
                                              }, " Paket: " + toDisplayString(member.package_name), 1)) : createCommentVNode("", true),
                                              (member.total_left ?? 0) > 0 || (member.total_right ?? 0) > 0 ? (openBlock(), createBlock("p", {
                                                key: 2,
                                                class: "text-xs"
                                              }, [
                                                createVNode("span", { class: "text-blue-600 dark:text-blue-400" }, "Kiri: " + toDisplayString(member.total_left ?? 0), 1),
                                                createVNode("span", { class: "mx-1" }, "|"),
                                                createVNode("span", { class: "text-green-600 dark:text-green-400" }, "Kanan: " + toDisplayString(member.total_right ?? 0), 1)
                                              ])) : createCommentVNode("", true),
                                              createVNode("p", { class: "text-xs" }, "Bergabung: " + toDisplayString(formatDate(member.joined_at)), 1),
                                              createVNode("p", { class: "text-xs font-medium text-gray-500 dark:text-gray-400" }, " Omzet: " + toDisplayString(formatCurrency(member.omzet)), 1)
                                            ])
                                          ]),
                                          createVNode("div", { class: "flex flex-col items-end gap-2" }, [
                                            createVNode(unref(_sfc_main$t), { variant: "secondary" }, {
                                              default: withCtx(() => [
                                                createVNode(unref(UserPlus), { class: "w-3 h-3 mr-1" }),
                                                createTextVNode(" Prospek ")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$t), { variant: "secondary" }, {
                                              default: withCtx(() => [
                                                createTextVNode(" Belum Belanja ")
                                              ]),
                                              _: 1
                                            })
                                          ])
                                        ])
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$Y), {
                      "default-value": "active",
                      class: "w-full"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$Z), { class: "grid w-full grid-cols-3" }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$_), { value: "active" }, {
                              default: withCtx(() => [
                                createVNode(unref(CheckCircle), { class: "w-4 h-4 mr-2" }),
                                createTextVNode(" Aktif (" + toDisplayString(__props.activeMembers.length) + ") ", 1)
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$_), { value: "passive" }, {
                              default: withCtx(() => [
                                createVNode(unref(Clock), { class: "w-4 h-4 mr-2" }),
                                createTextVNode(" Pasif (" + toDisplayString(__props.passiveMembers.length) + ") ", 1)
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$_), { value: "prospect" }, {
                              default: withCtx(() => [
                                createVNode(unref(UserPlus), { class: "w-4 h-4 mr-2" }),
                                createTextVNode(" Prospek (" + toDisplayString(__props.prospectMembers.length) + ") ", 1)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$$), {
                          value: "active",
                          class: "space-y-4"
                        }, {
                          default: withCtx(() => [
                            __props.activeMembers.length === 0 ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "text-center py-12 text-muted-foreground"
                            }, [
                              createVNode(unref(CheckCircle), { class: "w-12 h-12 mx-auto mb-4 opacity-20" }),
                              createVNode("p", null, "Belum ada member aktif"),
                              createVNode("p", { class: "text-sm mt-2" }, "Member aktif adalah member yang sudah ditempatkan di binary tree")
                            ])) : createCommentVNode("", true),
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.activeMembers, (member) => {
                              return openBlock(), createBlock(unref(_sfc_main$o), {
                                key: member.id,
                                class: "hover:shadow-md transition-shadow"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$p), { class: "p-4" }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "flex items-start justify-between" }, [
                                        createVNode("div", { class: "flex-1" }, [
                                          createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                            createVNode("h4", { class: "font-semibold text-lg" }, toDisplayString(member.name), 1),
                                            createVNode(unref(_sfc_main$t), {
                                              variant: getPositionBadge(member.position).variant
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(getPositionBadge(member.position).text), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["variant"]),
                                            member.level ? (openBlock(), createBlock(unref(_sfc_main$t), {
                                              key: 0,
                                              variant: "outline"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(" Level " + toDisplayString(member.level), 1)
                                              ]),
                                              _: 2
                                            }, 1024)) : createCommentVNode("", true)
                                          ]),
                                          createVNode("div", { class: "space-y-1 text-sm text-muted-foreground" }, [
                                            createVNode("p", null, toDisplayString(member.email), 1),
                                            member.phone ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(member.phone), 1)) : createCommentVNode("", true),
                                            member.package_name ? (openBlock(), createBlock("p", {
                                              key: 1,
                                              class: "text-xs font-medium text-primary"
                                            }, " Paket: " + toDisplayString(member.package_name), 1)) : createCommentVNode("", true),
                                            (member.total_left ?? 0) > 0 || (member.total_right ?? 0) > 0 ? (openBlock(), createBlock("p", {
                                              key: 2,
                                              class: "text-xs"
                                            }, [
                                              createVNode("span", { class: "text-blue-600 dark:text-blue-400" }, "Kiri: " + toDisplayString(member.total_left ?? 0), 1),
                                              createVNode("span", { class: "mx-1" }, "|"),
                                              createVNode("span", { class: "text-green-600 dark:text-green-400" }, "Kanan: " + toDisplayString(member.total_right ?? 0), 1)
                                            ])) : createCommentVNode("", true),
                                            createVNode("p", { class: "text-xs" }, "Bergabung: " + toDisplayString(formatDate(member.joined_at)), 1),
                                            createVNode("p", { class: "text-xs font-medium text-green-600 dark:text-green-400" }, " Omzet: " + toDisplayString(formatCurrency(member.omzet)), 1)
                                          ])
                                        ]),
                                        createVNode("div", { class: "flex flex-col items-end gap-2" }, [
                                          createVNode(unref(_sfc_main$t), { variant: "default" }, {
                                            default: withCtx(() => [
                                              createVNode(unref(CheckCircle), { class: "w-3 h-3 mr-1" }),
                                              createTextVNode(" Aktif ")
                                            ]),
                                            _: 1
                                          })
                                        ])
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024);
                            }), 128))
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$$), {
                          value: "passive",
                          class: "space-y-4"
                        }, {
                          default: withCtx(() => [
                            __props.passiveMembers.length === 0 ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "text-center py-12 text-muted-foreground"
                            }, [
                              createVNode(unref(Clock), { class: "w-12 h-12 mx-auto mb-4 opacity-20" }),
                              createVNode("p", null, "Belum ada member pasif"),
                              createVNode("p", { class: "text-sm mt-2" }, "Member pasif adalah member yang belum ditempatkan di binary tree tapi sudah memiliki pembelian/order")
                            ])) : createCommentVNode("", true),
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.passiveMembers, (member) => {
                              return openBlock(), createBlock(unref(_sfc_main$o), {
                                key: member.id,
                                class: "hover:shadow-md transition-shadow"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$p), { class: "p-4" }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "flex items-start justify-between" }, [
                                        createVNode("div", { class: "flex-1" }, [
                                          createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                            createVNode("h4", { class: "font-semibold text-lg" }, toDisplayString(member.name), 1),
                                            createVNode(unref(_sfc_main$t), { variant: "secondary" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Belum Ditempatkan")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          createVNode("div", { class: "space-y-1 text-sm text-muted-foreground" }, [
                                            createVNode("p", null, toDisplayString(member.email), 1),
                                            member.phone ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(member.phone), 1)) : createCommentVNode("", true),
                                            member.package_name ? (openBlock(), createBlock("p", {
                                              key: 1,
                                              class: "text-xs font-medium text-primary"
                                            }, " Paket: " + toDisplayString(member.package_name), 1)) : createCommentVNode("", true),
                                            (member.total_left ?? 0) > 0 || (member.total_right ?? 0) > 0 ? (openBlock(), createBlock("p", {
                                              key: 2,
                                              class: "text-xs"
                                            }, [
                                              createVNode("span", { class: "text-blue-600 dark:text-blue-400" }, "Kiri: " + toDisplayString(member.total_left ?? 0), 1),
                                              createVNode("span", { class: "mx-1" }, "|"),
                                              createVNode("span", { class: "text-green-600 dark:text-green-400" }, "Kanan: " + toDisplayString(member.total_right ?? 0), 1)
                                            ])) : createCommentVNode("", true),
                                            createVNode("p", { class: "text-xs" }, "Bergabung: " + toDisplayString(formatDate(member.joined_at)), 1),
                                            createVNode("p", { class: "text-xs font-medium text-orange-600 dark:text-orange-400" }, " Omzet: " + toDisplayString(formatCurrency(member.omzet)), 1)
                                          ])
                                        ]),
                                        createVNode("div", { class: "flex flex-col items-end gap-2" }, [
                                          createVNode(unref(_sfc_main$t), { variant: "outline" }, {
                                            default: withCtx(() => [
                                              createVNode(unref(Clock), { class: "w-3 h-3 mr-1" }),
                                              createTextVNode(" Pasif ")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$t), { variant: "default" }, {
                                            default: withCtx(() => [
                                              createTextVNode(" Sudah Belanja ")
                                            ]),
                                            _: 1
                                          }),
                                          __props.activeMembers.length < 2 ? (openBlock(), createBlock(unref(_sfc_main$u), {
                                            key: 0,
                                            size: "sm",
                                            variant: "default",
                                            class: "mt-2",
                                            onClick: ($event) => openPlacementDialog(member)
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(GitBranch), { class: "w-3 h-3 mr-1" }),
                                              createTextVNode(" Tempatkan ke Binary ")
                                            ]),
                                            _: 1
                                          }, 8, ["onClick"])) : createCommentVNode("", true)
                                        ])
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024);
                            }), 128))
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$$), {
                          value: "prospect",
                          class: "space-y-4"
                        }, {
                          default: withCtx(() => [
                            __props.prospectMembers.length === 0 ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "text-center py-12 text-muted-foreground"
                            }, [
                              createVNode(unref(UserPlus), { class: "w-12 h-12 mx-auto mb-4 opacity-20" }),
                              createVNode("p", null, "Belum ada member prospek"),
                              createVNode("p", { class: "text-sm mt-2" }, "Member prospek adalah member yang baru mendaftar, belum ditempatkan di binary tree dan belum memiliki pembelian/order")
                            ])) : createCommentVNode("", true),
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.prospectMembers, (member) => {
                              return openBlock(), createBlock(unref(_sfc_main$o), {
                                key: member.id,
                                class: "hover:shadow-md transition-shadow"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$p), { class: "p-4" }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "flex items-start justify-between" }, [
                                        createVNode("div", { class: "flex-1" }, [
                                          createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                            createVNode("h4", { class: "font-semibold text-lg" }, toDisplayString(member.name), 1),
                                            createVNode(unref(_sfc_main$t), { variant: "outline" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Baru Bergabung")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          createVNode("div", { class: "space-y-1 text-sm text-muted-foreground" }, [
                                            createVNode("p", null, toDisplayString(member.email), 1),
                                            member.phone ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(member.phone), 1)) : createCommentVNode("", true),
                                            member.package_name ? (openBlock(), createBlock("p", {
                                              key: 1,
                                              class: "text-xs font-medium text-primary"
                                            }, " Paket: " + toDisplayString(member.package_name), 1)) : createCommentVNode("", true),
                                            (member.total_left ?? 0) > 0 || (member.total_right ?? 0) > 0 ? (openBlock(), createBlock("p", {
                                              key: 2,
                                              class: "text-xs"
                                            }, [
                                              createVNode("span", { class: "text-blue-600 dark:text-blue-400" }, "Kiri: " + toDisplayString(member.total_left ?? 0), 1),
                                              createVNode("span", { class: "mx-1" }, "|"),
                                              createVNode("span", { class: "text-green-600 dark:text-green-400" }, "Kanan: " + toDisplayString(member.total_right ?? 0), 1)
                                            ])) : createCommentVNode("", true),
                                            createVNode("p", { class: "text-xs" }, "Bergabung: " + toDisplayString(formatDate(member.joined_at)), 1),
                                            createVNode("p", { class: "text-xs font-medium text-gray-500 dark:text-gray-400" }, " Omzet: " + toDisplayString(formatCurrency(member.omzet)), 1)
                                          ])
                                        ]),
                                        createVNode("div", { class: "flex flex-col items-end gap-2" }, [
                                          createVNode(unref(_sfc_main$t), { variant: "secondary" }, {
                                            default: withCtx(() => [
                                              createVNode(unref(UserPlus), { class: "w-3 h-3 mr-1" }),
                                              createTextVNode(" Prospek ")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$t), { variant: "secondary" }, {
                                            default: withCtx(() => [
                                              createTextVNode(" Belum Belanja ")
                                            ]),
                                            _: 1
                                          })
                                        ])
                                      ])
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
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$v), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$w), null, {
                    default: withCtx(() => [
                      createTextVNode("Jaringan Member")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$N), null, {
                    default: withCtx(() => [
                      createTextVNode("Kelola dan lihat member dalam jaringan Anda")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$p), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$Y), {
                    "default-value": "active",
                    class: "w-full"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$Z), { class: "grid w-full grid-cols-3" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$_), { value: "active" }, {
                            default: withCtx(() => [
                              createVNode(unref(CheckCircle), { class: "w-4 h-4 mr-2" }),
                              createTextVNode(" Aktif (" + toDisplayString(__props.activeMembers.length) + ") ", 1)
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$_), { value: "passive" }, {
                            default: withCtx(() => [
                              createVNode(unref(Clock), { class: "w-4 h-4 mr-2" }),
                              createTextVNode(" Pasif (" + toDisplayString(__props.passiveMembers.length) + ") ", 1)
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$_), { value: "prospect" }, {
                            default: withCtx(() => [
                              createVNode(unref(UserPlus), { class: "w-4 h-4 mr-2" }),
                              createTextVNode(" Prospek (" + toDisplayString(__props.prospectMembers.length) + ") ", 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$$), {
                        value: "active",
                        class: "space-y-4"
                      }, {
                        default: withCtx(() => [
                          __props.activeMembers.length === 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-center py-12 text-muted-foreground"
                          }, [
                            createVNode(unref(CheckCircle), { class: "w-12 h-12 mx-auto mb-4 opacity-20" }),
                            createVNode("p", null, "Belum ada member aktif"),
                            createVNode("p", { class: "text-sm mt-2" }, "Member aktif adalah member yang sudah ditempatkan di binary tree")
                          ])) : createCommentVNode("", true),
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.activeMembers, (member) => {
                            return openBlock(), createBlock(unref(_sfc_main$o), {
                              key: member.id,
                              class: "hover:shadow-md transition-shadow"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$p), { class: "p-4" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "flex items-start justify-between" }, [
                                      createVNode("div", { class: "flex-1" }, [
                                        createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                          createVNode("h4", { class: "font-semibold text-lg" }, toDisplayString(member.name), 1),
                                          createVNode(unref(_sfc_main$t), {
                                            variant: getPositionBadge(member.position).variant
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(getPositionBadge(member.position).text), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["variant"]),
                                          member.level ? (openBlock(), createBlock(unref(_sfc_main$t), {
                                            key: 0,
                                            variant: "outline"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(" Level " + toDisplayString(member.level), 1)
                                            ]),
                                            _: 2
                                          }, 1024)) : createCommentVNode("", true)
                                        ]),
                                        createVNode("div", { class: "space-y-1 text-sm text-muted-foreground" }, [
                                          createVNode("p", null, toDisplayString(member.email), 1),
                                          member.phone ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(member.phone), 1)) : createCommentVNode("", true),
                                          member.package_name ? (openBlock(), createBlock("p", {
                                            key: 1,
                                            class: "text-xs font-medium text-primary"
                                          }, " Paket: " + toDisplayString(member.package_name), 1)) : createCommentVNode("", true),
                                          (member.total_left ?? 0) > 0 || (member.total_right ?? 0) > 0 ? (openBlock(), createBlock("p", {
                                            key: 2,
                                            class: "text-xs"
                                          }, [
                                            createVNode("span", { class: "text-blue-600 dark:text-blue-400" }, "Kiri: " + toDisplayString(member.total_left ?? 0), 1),
                                            createVNode("span", { class: "mx-1" }, "|"),
                                            createVNode("span", { class: "text-green-600 dark:text-green-400" }, "Kanan: " + toDisplayString(member.total_right ?? 0), 1)
                                          ])) : createCommentVNode("", true),
                                          createVNode("p", { class: "text-xs" }, "Bergabung: " + toDisplayString(formatDate(member.joined_at)), 1),
                                          createVNode("p", { class: "text-xs font-medium text-green-600 dark:text-green-400" }, " Omzet: " + toDisplayString(formatCurrency(member.omzet)), 1)
                                        ])
                                      ]),
                                      createVNode("div", { class: "flex flex-col items-end gap-2" }, [
                                        createVNode(unref(_sfc_main$t), { variant: "default" }, {
                                          default: withCtx(() => [
                                            createVNode(unref(CheckCircle), { class: "w-3 h-3 mr-1" }),
                                            createTextVNode(" Aktif ")
                                          ]),
                                          _: 1
                                        })
                                      ])
                                    ])
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$$), {
                        value: "passive",
                        class: "space-y-4"
                      }, {
                        default: withCtx(() => [
                          __props.passiveMembers.length === 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-center py-12 text-muted-foreground"
                          }, [
                            createVNode(unref(Clock), { class: "w-12 h-12 mx-auto mb-4 opacity-20" }),
                            createVNode("p", null, "Belum ada member pasif"),
                            createVNode("p", { class: "text-sm mt-2" }, "Member pasif adalah member yang belum ditempatkan di binary tree tapi sudah memiliki pembelian/order")
                          ])) : createCommentVNode("", true),
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.passiveMembers, (member) => {
                            return openBlock(), createBlock(unref(_sfc_main$o), {
                              key: member.id,
                              class: "hover:shadow-md transition-shadow"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$p), { class: "p-4" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "flex items-start justify-between" }, [
                                      createVNode("div", { class: "flex-1" }, [
                                        createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                          createVNode("h4", { class: "font-semibold text-lg" }, toDisplayString(member.name), 1),
                                          createVNode(unref(_sfc_main$t), { variant: "secondary" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Belum Ditempatkan")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        createVNode("div", { class: "space-y-1 text-sm text-muted-foreground" }, [
                                          createVNode("p", null, toDisplayString(member.email), 1),
                                          member.phone ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(member.phone), 1)) : createCommentVNode("", true),
                                          member.package_name ? (openBlock(), createBlock("p", {
                                            key: 1,
                                            class: "text-xs font-medium text-primary"
                                          }, " Paket: " + toDisplayString(member.package_name), 1)) : createCommentVNode("", true),
                                          (member.total_left ?? 0) > 0 || (member.total_right ?? 0) > 0 ? (openBlock(), createBlock("p", {
                                            key: 2,
                                            class: "text-xs"
                                          }, [
                                            createVNode("span", { class: "text-blue-600 dark:text-blue-400" }, "Kiri: " + toDisplayString(member.total_left ?? 0), 1),
                                            createVNode("span", { class: "mx-1" }, "|"),
                                            createVNode("span", { class: "text-green-600 dark:text-green-400" }, "Kanan: " + toDisplayString(member.total_right ?? 0), 1)
                                          ])) : createCommentVNode("", true),
                                          createVNode("p", { class: "text-xs" }, "Bergabung: " + toDisplayString(formatDate(member.joined_at)), 1),
                                          createVNode("p", { class: "text-xs font-medium text-orange-600 dark:text-orange-400" }, " Omzet: " + toDisplayString(formatCurrency(member.omzet)), 1)
                                        ])
                                      ]),
                                      createVNode("div", { class: "flex flex-col items-end gap-2" }, [
                                        createVNode(unref(_sfc_main$t), { variant: "outline" }, {
                                          default: withCtx(() => [
                                            createVNode(unref(Clock), { class: "w-3 h-3 mr-1" }),
                                            createTextVNode(" Pasif ")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$t), { variant: "default" }, {
                                          default: withCtx(() => [
                                            createTextVNode(" Sudah Belanja ")
                                          ]),
                                          _: 1
                                        }),
                                        __props.activeMembers.length < 2 ? (openBlock(), createBlock(unref(_sfc_main$u), {
                                          key: 0,
                                          size: "sm",
                                          variant: "default",
                                          class: "mt-2",
                                          onClick: ($event) => openPlacementDialog(member)
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(GitBranch), { class: "w-3 h-3 mr-1" }),
                                            createTextVNode(" Tempatkan ke Binary ")
                                          ]),
                                          _: 1
                                        }, 8, ["onClick"])) : createCommentVNode("", true)
                                      ])
                                    ])
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$$), {
                        value: "prospect",
                        class: "space-y-4"
                      }, {
                        default: withCtx(() => [
                          __props.prospectMembers.length === 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-center py-12 text-muted-foreground"
                          }, [
                            createVNode(unref(UserPlus), { class: "w-12 h-12 mx-auto mb-4 opacity-20" }),
                            createVNode("p", null, "Belum ada member prospek"),
                            createVNode("p", { class: "text-sm mt-2" }, "Member prospek adalah member yang baru mendaftar, belum ditempatkan di binary tree dan belum memiliki pembelian/order")
                          ])) : createCommentVNode("", true),
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.prospectMembers, (member) => {
                            return openBlock(), createBlock(unref(_sfc_main$o), {
                              key: member.id,
                              class: "hover:shadow-md transition-shadow"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$p), { class: "p-4" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "flex items-start justify-between" }, [
                                      createVNode("div", { class: "flex-1" }, [
                                        createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                          createVNode("h4", { class: "font-semibold text-lg" }, toDisplayString(member.name), 1),
                                          createVNode(unref(_sfc_main$t), { variant: "outline" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Baru Bergabung")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        createVNode("div", { class: "space-y-1 text-sm text-muted-foreground" }, [
                                          createVNode("p", null, toDisplayString(member.email), 1),
                                          member.phone ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(member.phone), 1)) : createCommentVNode("", true),
                                          member.package_name ? (openBlock(), createBlock("p", {
                                            key: 1,
                                            class: "text-xs font-medium text-primary"
                                          }, " Paket: " + toDisplayString(member.package_name), 1)) : createCommentVNode("", true),
                                          (member.total_left ?? 0) > 0 || (member.total_right ?? 0) > 0 ? (openBlock(), createBlock("p", {
                                            key: 2,
                                            class: "text-xs"
                                          }, [
                                            createVNode("span", { class: "text-blue-600 dark:text-blue-400" }, "Kiri: " + toDisplayString(member.total_left ?? 0), 1),
                                            createVNode("span", { class: "mx-1" }, "|"),
                                            createVNode("span", { class: "text-green-600 dark:text-green-400" }, "Kanan: " + toDisplayString(member.total_right ?? 0), 1)
                                          ])) : createCommentVNode("", true),
                                          createVNode("p", { class: "text-xs" }, "Bergabung: " + toDisplayString(formatDate(member.joined_at)), 1),
                                          createVNode("p", { class: "text-xs font-medium text-gray-500 dark:text-gray-400" }, " Omzet: " + toDisplayString(formatCurrency(member.omzet)), 1)
                                        ])
                                      ]),
                                      createVNode("div", { class: "flex flex-col items-end gap-2" }, [
                                        createVNode(unref(_sfc_main$t), { variant: "secondary" }, {
                                          default: withCtx(() => [
                                            createVNode(unref(UserPlus), { class: "w-3 h-3 mr-1" }),
                                            createTextVNode(" Prospek ")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$t), { variant: "secondary" }, {
                                          default: withCtx(() => [
                                            createTextVNode(" Belum Belanja ")
                                          ]),
                                          _: 1
                                        })
                                      ])
                                    ])
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
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$y), {
        open: showPlacementDialog.value,
        "onUpdate:open": closePlacementDialog
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$z), { class: "sm:max-w-md" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$A), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$B), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Tempatkan Member ke Binary Tree`);
                            } else {
                              return [
                                createTextVNode("Tempatkan Member ke Binary Tree")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$C), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Pilih posisi untuk menempatkan <span class="font-semibold"${_scopeId4}>${ssrInterpolate(selectedMember.value?.name)}</span> di jaringan binary tree Anda. `);
                            } else {
                              return [
                                createTextVNode(" Pilih posisi untuk menempatkan "),
                                createVNode("span", { class: "font-semibold" }, toDisplayString(selectedMember.value?.name), 1),
                                createTextVNode(" di jaringan binary tree Anda. ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$B), null, {
                            default: withCtx(() => [
                              createTextVNode("Tempatkan Member ke Binary Tree")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$C), null, {
                            default: withCtx(() => [
                              createTextVNode(" Pilih posisi untuk menempatkan "),
                              createVNode("span", { class: "font-semibold" }, toDisplayString(selectedMember.value?.name), 1),
                              createTextVNode(" di jaringan binary tree Anda. ")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="grid grid-cols-2 gap-4 py-4"${_scopeId2}><button type="button" class="${ssrRenderClass([
                    "flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all",
                    selectedPosition.value === "left" ? "border-primary bg-primary/10" : "border-gray-200 hover:border-gray-300"
                  ])}"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(GitBranch), { class: "w-8 h-8 mb-2 rotate-90" }, null, _parent3, _scopeId2));
                  _push3(`<span class="font-semibold"${_scopeId2}>Posisi Kiri</span><span class="text-xs text-muted-foreground mt-1"${_scopeId2}>Left Position</span></button><button type="button" class="${ssrRenderClass([
                    "flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all",
                    selectedPosition.value === "right" ? "border-primary bg-primary/10" : "border-gray-200 hover:border-gray-300"
                  ])}"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(GitBranch), { class: "w-8 h-8 mb-2 -rotate-90" }, null, _parent3, _scopeId2));
                  _push3(`<span class="font-semibold"${_scopeId2}>Posisi Kanan</span><span class="text-xs text-muted-foreground mt-1"${_scopeId2}>Right Position</span></button></div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$M), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$u), {
                          variant: "outline",
                          onClick: closePlacementDialog,
                          disabled: unref(placementForm).processing
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
                        _push4(ssrRenderComponent(unref(_sfc_main$u), {
                          onClick: placeToBinaryTree,
                          disabled: !selectedPosition.value || unref(placementForm).processing
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(unref(placementForm).processing ? "Memproses..." : "Tempatkan")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(unref(placementForm).processing ? "Memproses..." : "Tempatkan"), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$u), {
                            variant: "outline",
                            onClick: closePlacementDialog,
                            disabled: unref(placementForm).processing
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Batal ")
                            ]),
                            _: 1
                          }, 8, ["disabled"]),
                          createVNode(unref(_sfc_main$u), {
                            onClick: placeToBinaryTree,
                            disabled: !selectedPosition.value || unref(placementForm).processing
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(placementForm).processing ? "Memproses..." : "Tempatkan"), 1)
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$A), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$B), null, {
                          default: withCtx(() => [
                            createTextVNode("Tempatkan Member ke Binary Tree")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$C), null, {
                          default: withCtx(() => [
                            createTextVNode(" Pilih posisi untuk menempatkan "),
                            createVNode("span", { class: "font-semibold" }, toDisplayString(selectedMember.value?.name), 1),
                            createTextVNode(" di jaringan binary tree Anda. ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "grid grid-cols-2 gap-4 py-4" }, [
                      createVNode("button", {
                        type: "button",
                        class: [
                          "flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all",
                          selectedPosition.value === "left" ? "border-primary bg-primary/10" : "border-gray-200 hover:border-gray-300"
                        ],
                        onClick: ($event) => selectedPosition.value = "left"
                      }, [
                        createVNode(unref(GitBranch), { class: "w-8 h-8 mb-2 rotate-90" }),
                        createVNode("span", { class: "font-semibold" }, "Posisi Kiri"),
                        createVNode("span", { class: "text-xs text-muted-foreground mt-1" }, "Left Position")
                      ], 10, ["onClick"]),
                      createVNode("button", {
                        type: "button",
                        class: [
                          "flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all",
                          selectedPosition.value === "right" ? "border-primary bg-primary/10" : "border-gray-200 hover:border-gray-300"
                        ],
                        onClick: ($event) => selectedPosition.value = "right"
                      }, [
                        createVNode(unref(GitBranch), { class: "w-8 h-8 mb-2 -rotate-90" }),
                        createVNode("span", { class: "font-semibold" }, "Posisi Kanan"),
                        createVNode("span", { class: "text-xs text-muted-foreground mt-1" }, "Right Position")
                      ], 10, ["onClick"])
                    ]),
                    createVNode(unref(_sfc_main$M), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$u), {
                          variant: "outline",
                          onClick: closePlacementDialog,
                          disabled: unref(placementForm).processing
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Batal ")
                          ]),
                          _: 1
                        }, 8, ["disabled"]),
                        createVNode(unref(_sfc_main$u), {
                          onClick: placeToBinaryTree,
                          disabled: !selectedPosition.value || unref(placementForm).processing
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(placementForm).processing ? "Memproses..." : "Tempatkan"), 1)
                          ]),
                          _: 1
                        }, 8, ["disabled"])
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
              createVNode(unref(_sfc_main$z), { class: "sm:max-w-md" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$A), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$B), null, {
                        default: withCtx(() => [
                          createTextVNode("Tempatkan Member ke Binary Tree")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$C), null, {
                        default: withCtx(() => [
                          createTextVNode(" Pilih posisi untuk menempatkan "),
                          createVNode("span", { class: "font-semibold" }, toDisplayString(selectedMember.value?.name), 1),
                          createTextVNode(" di jaringan binary tree Anda. ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "grid grid-cols-2 gap-4 py-4" }, [
                    createVNode("button", {
                      type: "button",
                      class: [
                        "flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all",
                        selectedPosition.value === "left" ? "border-primary bg-primary/10" : "border-gray-200 hover:border-gray-300"
                      ],
                      onClick: ($event) => selectedPosition.value = "left"
                    }, [
                      createVNode(unref(GitBranch), { class: "w-8 h-8 mb-2 rotate-90" }),
                      createVNode("span", { class: "font-semibold" }, "Posisi Kiri"),
                      createVNode("span", { class: "text-xs text-muted-foreground mt-1" }, "Left Position")
                    ], 10, ["onClick"]),
                    createVNode("button", {
                      type: "button",
                      class: [
                        "flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all",
                        selectedPosition.value === "right" ? "border-primary bg-primary/10" : "border-gray-200 hover:border-gray-300"
                      ],
                      onClick: ($event) => selectedPosition.value = "right"
                    }, [
                      createVNode(unref(GitBranch), { class: "w-8 h-8 mb-2 -rotate-90" }),
                      createVNode("span", { class: "font-semibold" }, "Posisi Kanan"),
                      createVNode("span", { class: "text-xs text-muted-foreground mt-1" }, "Right Position")
                    ], 10, ["onClick"])
                  ]),
                  createVNode(unref(_sfc_main$M), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$u), {
                        variant: "outline",
                        onClick: closePlacementDialog,
                        disabled: unref(placementForm).processing
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Batal ")
                        ]),
                        _: 1
                      }, 8, ["disabled"]),
                      createVNode(unref(_sfc_main$u), {
                        onClick: placeToBinaryTree,
                        disabled: !selectedPosition.value || unref(placementForm).processing
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(placementForm).processing ? "Memproses..." : "Tempatkan"), 1)
                        ]),
                        _: 1
                      }, 8, ["disabled"])
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
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/profile/NetworkMembersTab.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "GoJSBinaryTree",
  __ssrInlineRender: true,
  props: {
    binaryTree: {},
    onOpenPlacement: { type: Function }
  },
  emits: ["openPlacement"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const diagramDiv = ref(null);
    let myDiagram = null;
    const convertTreeToModel = (node, parentKey = null) => {
      if (!node) return { nodes: [], links: [] };
      const nodes = [];
      const links = [];
      const addNode = (n, pKey, position) => {
        const nodeData = {
          key: n.id,
          name: n.name,
          email: n.email,
          package: n.package_name || "Tidak ada paket",
          totalLeft: n.total_left || 0,
          totalRight: n.total_right || 0,
          position,
          isActive: n.status,
          hasLeft: !!n.left,
          hasRight: !!n.right,
          // Add order for proper left-right positioning
          order: position === "left" ? 0 : position === "right" ? 1 : 0
        };
        nodes.push(nodeData);
        if (pKey !== null) {
          links.push({
            from: pKey,
            to: n.id,
            order: position === "left" ? 0 : 1
          });
        }
        if (!n.left && n.status) {
          const placeholderLeftKey = -n.id * 2;
          nodes.push({
            key: placeholderLeftKey,
            name: "+ Kiri",
            email: "",
            package: "",
            isPlaceholder: true,
            parentId: n.id,
            placeholderPosition: "left",
            order: 0
          });
          links.push({ from: n.id, to: placeholderLeftKey, order: 0 });
        }
        if (!n.right && n.status) {
          const placeholderRightKey = -n.id * 2 - 1;
          nodes.push({
            key: placeholderRightKey,
            name: "+ Kanan",
            email: "",
            package: "",
            isPlaceholder: true,
            parentId: n.id,
            placeholderPosition: "right",
            order: 1
          });
          links.push({ from: n.id, to: placeholderRightKey, order: 1 });
        }
        if (n.left) {
          addNode(n.left, n.id, "left");
        }
        if (n.right) {
          addNode(n.right, n.id, "right");
        }
      };
      addNode(node, parentKey, null);
      return { nodes, links };
    };
    const initDiagram = () => {
      if (!diagramDiv.value) return;
      const $ = go.GraphObject.make;
      myDiagram = $(go.Diagram, diagramDiv.value, {
        "undoManager.isEnabled": false,
        "animationManager.isEnabled": true,
        initialAutoScale: go.AutoScale.Uniform,
        contentAlignment: go.Spot.Top,
        layout: $(go.TreeLayout, {
          angle: 90,
          layerSpacing: 50,
          nodeSpacing: 20,
          arrangement: go.TreeArrangement.Horizontal,
          // Sort children by order property to ensure left (0) before right (1)
          sorting: go.TreeSorting.Ascending,
          comparer: (a, b) => {
            const aOrder = a.node?.data?.order ?? 0;
            const bOrder = b.node?.data?.order ?? 0;
            return aOrder - bOrder;
          }
        }),
        maxSelectionCount: 1
      });
      myDiagram.nodeTemplate = $(
        go.Node,
        "Auto",
        {
          cursor: "pointer",
          selectionAdorned: false
        },
        $(
          go.Shape,
          "RoundedRectangle",
          {
            fill: "white",
            stroke: "#e2e8f0",
            strokeWidth: 2,
            parameter1: 8
          },
          new go.Binding("fill", "", (data) => {
            if (data.isPlaceholder) return "#f8fafc";
            return data.isActive ? "#ffffff" : "#fef3c7";
          }),
          new go.Binding("stroke", "", (data) => {
            if (data.isPlaceholder) return "#cbd5e1";
            if (data.position === "left") return "#3b82f6";
            if (data.position === "right") return "#22c55e";
            return "#6366f1";
          }),
          new go.Binding("strokeWidth", "", (data) => {
            return data.isPlaceholder ? 1 : 2;
          }),
          new go.Binding("strokeDashArray", "isPlaceholder", (isPlaceholder) => {
            return isPlaceholder ? [4, 4] : null;
          })
        ),
        $(
          go.Panel,
          "Vertical",
          { margin: 8, defaultAlignment: go.Spot.Left },
          // Name
          $(
            go.TextBlock,
            {
              font: "bold 13px Inter, sans-serif",
              stroke: "#1e293b",
              maxSize: new go.Size(140, NaN),
              wrap: go.Wrap.Fit,
              textAlign: "center",
              alignment: go.Spot.Center
            },
            new go.Binding("text", "name"),
            new go.Binding("stroke", "isPlaceholder", (isPlaceholder) => {
              return isPlaceholder ? "#64748b" : "#1e293b";
            }),
            new go.Binding("font", "isPlaceholder", (isPlaceholder) => {
              return isPlaceholder ? "12px Inter, sans-serif" : "bold 13px Inter, sans-serif";
            })
          ),
          // Email (hidden for placeholders)
          $(
            go.TextBlock,
            {
              font: "11px Inter, sans-serif",
              stroke: "#64748b",
              maxSize: new go.Size(140, NaN),
              wrap: go.Wrap.Fit,
              margin: new go.Margin(2, 0, 0, 0),
              alignment: go.Spot.Center
            },
            new go.Binding("text", "email"),
            new go.Binding("visible", "isPlaceholder", (isPlaceholder) => !isPlaceholder)
          ),
          // Package badge
          $(
            go.Panel,
            "Auto",
            {
              margin: new go.Margin(4, 0, 0, 0),
              alignment: go.Spot.Center
            },
            new go.Binding("visible", "isPlaceholder", (isPlaceholder) => !isPlaceholder),
            $(go.Shape, "RoundedRectangle", {
              fill: "#eff6ff",
              stroke: "#bfdbfe",
              strokeWidth: 1,
              parameter1: 4
            }),
            $(
              go.TextBlock,
              {
                font: "10px Inter, sans-serif",
                stroke: "#1d4ed8",
                margin: new go.Margin(2, 6, 2, 6)
              },
              new go.Binding("text", "package")
            )
          ),
          // Network stats
          $(
            go.Panel,
            "Horizontal",
            {
              margin: new go.Margin(6, 0, 0, 0),
              alignment: go.Spot.Center
            },
            new go.Binding("visible", "isPlaceholder", (isPlaceholder) => !isPlaceholder),
            // Left count
            $(
              go.Panel,
              "Horizontal",
              $(go.Shape, "Circle", {
                width: 8,
                height: 8,
                fill: "#3b82f6",
                stroke: null,
                margin: new go.Margin(0, 4, 0, 0)
              }),
              $(
                go.TextBlock,
                {
                  font: "10px Inter, sans-serif",
                  stroke: "#64748b"
                },
                new go.Binding("text", "totalLeft", (v) => `L: ${v}`)
              )
            ),
            $(go.TextBlock, " | ", {
              font: "10px Inter, sans-serif",
              stroke: "#cbd5e1"
            }),
            // Right count
            $(
              go.Panel,
              "Horizontal",
              $(go.Shape, "Circle", {
                width: 8,
                height: 8,
                fill: "#22c55e",
                stroke: null,
                margin: new go.Margin(0, 4, 0, 0)
              }),
              $(
                go.TextBlock,
                {
                  font: "10px Inter, sans-serif",
                  stroke: "#64748b"
                },
                new go.Binding("text", "totalRight", (v) => `R: ${v}`)
              )
            )
          )
        ),
        {
          click: (e, obj) => {
            const data = obj.part?.data;
            if (data?.isPlaceholder && data?.parentId && data?.placeholderPosition) {
              emit("openPlacement", data.parentId, data.placeholderPosition);
            }
          }
        }
      );
      myDiagram.linkTemplate = $(
        go.Link,
        {
          routing: go.Routing.Orthogonal,
          corner: 10,
          selectable: false
        },
        $(go.Shape, {
          strokeWidth: 2,
          stroke: "#cbd5e1"
        })
      );
      updateDiagram();
    };
    const updateDiagram = () => {
      if (!myDiagram || !props.binaryTree) return;
      const { nodes, links } = convertTreeToModel(props.binaryTree);
      myDiagram.model = new go.GraphLinksModel(nodes, links);
      myDiagram.zoomToFit();
    };
    const zoomIn = () => {
      if (myDiagram) {
        myDiagram.commandHandler.increaseZoom();
      }
    };
    const zoomOut = () => {
      if (myDiagram) {
        myDiagram.commandHandler.decreaseZoom();
      }
    };
    const resetZoom = () => {
      if (myDiagram) {
        myDiagram.zoomToFit();
      }
    };
    watch(
      () => props.binaryTree,
      () => {
        updateDiagram();
      },
      { deep: true }
    );
    onMounted(() => {
      initDiagram();
    });
    onUnmounted(() => {
      if (myDiagram) {
        myDiagram.div = null;
        myDiagram = null;
      }
    });
    __expose({
      zoomIn,
      zoomOut,
      resetZoom
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "diagramDiv",
        ref: diagramDiv,
        class: "w-full h-[500px] sm:h-[600px] border rounded-lg bg-slate-50"
      }, _attrs))}></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/profile/GoJSBinaryTree.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "BinaryTreeTab",
  __ssrInlineRender: true,
  props: {
    binaryTree: {},
    totalDownlines: {},
    totalLeft: {},
    totalRight: {},
    passiveMembers: {}
  },
  setup(__props) {
    const goJSTreeRef = ref(null);
    const showPlacementDialog = ref(false);
    const selectedUplineId = ref(null);
    const selectedPosition = ref(null);
    const selectedMember = ref(null);
    const placementForm = useForm({
      member_id: 0,
      position: ""
    });
    const openPlacementDialog = (uplineId, position) => {
      selectedUplineId.value = uplineId;
      selectedPosition.value = position;
      selectedMember.value = null;
      showPlacementDialog.value = true;
    };
    const closePlacementDialog = () => {
      showPlacementDialog.value = false;
      selectedUplineId.value = null;
      selectedPosition.value = null;
      selectedMember.value = null;
    };
    const selectMember = (member) => {
      selectedMember.value = member;
    };
    const placeMemberToBinaryTree = () => {
      if (!selectedMember.value || !selectedPosition.value) {
        toast.error("Pilih member terlebih dahulu");
        return;
      }
      placementForm.member_id = selectedMember.value.id;
      placementForm.position = selectedPosition.value;
      placementForm.post("/client/profile/place-member", {
        onSuccess: () => {
          toast.success(`${selectedMember.value?.name} berhasil ditempatkan di posisi ${selectedPosition.value}`);
          closePlacementDialog();
        },
        onError: (errors) => {
          const errorMessage = errors.error || "Gagal menempatkan member ke binary tree";
          toast.error(errorMessage);
        }
      });
    };
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
    };
    const handleZoomIn = () => {
      goJSTreeRef.value?.zoomIn();
    };
    const handleZoomOut = () => {
      goJSTreeRef.value?.zoomOut();
    };
    const handleResetZoom = () => {
      goJSTreeRef.value?.resetZoom();
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="space-y-4 sm:space-y-6"><div class="grid grid-cols-3 gap-2 sm:gap-4">`);
      _push(ssrRenderComponent(unref(_sfc_main$o), { class: "p-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$v), { class: "flex flex-row items-center justify-between space-y-0 p-2 sm:p-4 pb-1 sm:pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$w), { class: "text-[10px] sm:text-sm font-medium truncate" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Total Jaringan`);
                      } else {
                        return [
                          createTextVNode("Total Jaringan")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(Users), { class: "h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$w), { class: "text-[10px] sm:text-sm font-medium truncate" }, {
                      default: withCtx(() => [
                        createTextVNode("Total Jaringan")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(Users), { class: "h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$p), { class: "p-2 sm:p-4 pt-0 sm:pt-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-lg sm:text-2xl font-bold"${_scopeId2}>${ssrInterpolate(__props.totalDownlines)}</div><p class="text-[8px] sm:text-xs text-muted-foreground hidden sm:block"${_scopeId2}>Member aktif di jaringan Anda</p>`);
                } else {
                  return [
                    createVNode("div", { class: "text-lg sm:text-2xl font-bold" }, toDisplayString(__props.totalDownlines), 1),
                    createVNode("p", { class: "text-[8px] sm:text-xs text-muted-foreground hidden sm:block" }, "Member aktif di jaringan Anda")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$v), { class: "flex flex-row items-center justify-between space-y-0 p-2 sm:p-4 pb-1 sm:pb-2" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$w), { class: "text-[10px] sm:text-sm font-medium truncate" }, {
                    default: withCtx(() => [
                      createTextVNode("Total Jaringan")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(Users), { class: "h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$p), { class: "p-2 sm:p-4 pt-0 sm:pt-0" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-lg sm:text-2xl font-bold" }, toDisplayString(__props.totalDownlines), 1),
                  createVNode("p", { class: "text-[8px] sm:text-xs text-muted-foreground hidden sm:block" }, "Member aktif di jaringan Anda")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$o), { class: "p-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$v), { class: "flex flex-row items-center justify-between space-y-0 p-2 sm:p-4 pb-1 sm:pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$w), { class: "text-[10px] sm:text-sm font-medium truncate" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Kaki Kiri`);
                      } else {
                        return [
                          createTextVNode("Kaki Kiri")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(TrendingUp), { class: "h-3 w-3 sm:h-4 sm:w-4 text-blue-600 flex-shrink-0" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$w), { class: "text-[10px] sm:text-sm font-medium truncate" }, {
                      default: withCtx(() => [
                        createTextVNode("Kaki Kiri")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(TrendingUp), { class: "h-3 w-3 sm:h-4 sm:w-4 text-blue-600 flex-shrink-0" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$p), { class: "p-2 sm:p-4 pt-0 sm:pt-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-lg sm:text-2xl font-bold text-blue-600"${_scopeId2}>${ssrInterpolate(__props.totalLeft)}</div><p class="text-[8px] sm:text-xs text-muted-foreground hidden sm:block"${_scopeId2}>Member di posisi kiri</p>`);
                } else {
                  return [
                    createVNode("div", { class: "text-lg sm:text-2xl font-bold text-blue-600" }, toDisplayString(__props.totalLeft), 1),
                    createVNode("p", { class: "text-[8px] sm:text-xs text-muted-foreground hidden sm:block" }, "Member di posisi kiri")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$v), { class: "flex flex-row items-center justify-between space-y-0 p-2 sm:p-4 pb-1 sm:pb-2" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$w), { class: "text-[10px] sm:text-sm font-medium truncate" }, {
                    default: withCtx(() => [
                      createTextVNode("Kaki Kiri")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(TrendingUp), { class: "h-3 w-3 sm:h-4 sm:w-4 text-blue-600 flex-shrink-0" })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$p), { class: "p-2 sm:p-4 pt-0 sm:pt-0" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-lg sm:text-2xl font-bold text-blue-600" }, toDisplayString(__props.totalLeft), 1),
                  createVNode("p", { class: "text-[8px] sm:text-xs text-muted-foreground hidden sm:block" }, "Member di posisi kiri")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$o), { class: "p-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$v), { class: "flex flex-row items-center justify-between space-y-0 p-2 sm:p-4 pb-1 sm:pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$w), { class: "text-[10px] sm:text-sm font-medium truncate" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Kaki Kanan`);
                      } else {
                        return [
                          createTextVNode("Kaki Kanan")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(TrendingUp), { class: "h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$w), { class: "text-[10px] sm:text-sm font-medium truncate" }, {
                      default: withCtx(() => [
                        createTextVNode("Kaki Kanan")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(TrendingUp), { class: "h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$p), { class: "p-2 sm:p-4 pt-0 sm:pt-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-lg sm:text-2xl font-bold text-green-600"${_scopeId2}>${ssrInterpolate(__props.totalRight)}</div><p class="text-[8px] sm:text-xs text-muted-foreground hidden sm:block"${_scopeId2}>Member di posisi kanan</p>`);
                } else {
                  return [
                    createVNode("div", { class: "text-lg sm:text-2xl font-bold text-green-600" }, toDisplayString(__props.totalRight), 1),
                    createVNode("p", { class: "text-[8px] sm:text-xs text-muted-foreground hidden sm:block" }, "Member di posisi kanan")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$v), { class: "flex flex-row items-center justify-between space-y-0 p-2 sm:p-4 pb-1 sm:pb-2" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$w), { class: "text-[10px] sm:text-sm font-medium truncate" }, {
                    default: withCtx(() => [
                      createTextVNode("Kaki Kanan")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(TrendingUp), { class: "h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$p), { class: "p-2 sm:p-4 pt-0 sm:pt-0" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-lg sm:text-2xl font-bold text-green-600" }, toDisplayString(__props.totalRight), 1),
                  createVNode("p", { class: "text-[8px] sm:text-xs text-muted-foreground hidden sm:block" }, "Member di posisi kanan")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(unref(_sfc_main$o), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$v), { class: "p-3 sm:p-6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"${_scopeId2}><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$w), { class: "text-sm sm:text-base" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Struktur Binary Tree`);
                      } else {
                        return [
                          createTextVNode("Struktur Binary Tree")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$N), { class: "text-xs sm:text-sm" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Visualisasi jaringan MLM binary tree Anda `);
                      } else {
                        return [
                          createTextVNode(" Visualisasi jaringan MLM binary tree Anda ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div class="flex items-center gap-1 sm:gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$u), {
                    variant: "outline",
                    size: "icon",
                    class: "h-7 w-7 sm:h-8 sm:w-8",
                    onClick: handleZoomOut
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(ZoomOut), { class: "h-3.5 w-3.5 sm:h-4 sm:w-4" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(ZoomOut), { class: "h-3.5 w-3.5 sm:h-4 sm:w-4" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$u), {
                    variant: "outline",
                    size: "icon",
                    class: "h-7 w-7 sm:h-8 sm:w-8",
                    onClick: handleZoomIn
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(ZoomIn), { class: "h-3.5 w-3.5 sm:h-4 sm:w-4" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(ZoomIn), { class: "h-3.5 w-3.5 sm:h-4 sm:w-4" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$u), {
                    variant: "ghost",
                    size: "icon",
                    class: "h-7 w-7 sm:h-8 sm:w-8",
                    onClick: handleResetZoom,
                    title: "Fit to Screen"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(RotateCcw), { class: "h-3.5 w-3.5 sm:h-4 sm:w-4" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(RotateCcw), { class: "h-3.5 w-3.5 sm:h-4 sm:w-4" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2" }, [
                      createVNode("div", null, [
                        createVNode(unref(_sfc_main$w), { class: "text-sm sm:text-base" }, {
                          default: withCtx(() => [
                            createTextVNode("Struktur Binary Tree")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$N), { class: "text-xs sm:text-sm" }, {
                          default: withCtx(() => [
                            createTextVNode(" Visualisasi jaringan MLM binary tree Anda ")
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("div", { class: "flex items-center gap-1 sm:gap-2" }, [
                        createVNode(unref(_sfc_main$u), {
                          variant: "outline",
                          size: "icon",
                          class: "h-7 w-7 sm:h-8 sm:w-8",
                          onClick: handleZoomOut
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(ZoomOut), { class: "h-3.5 w-3.5 sm:h-4 sm:w-4" })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$u), {
                          variant: "outline",
                          size: "icon",
                          class: "h-7 w-7 sm:h-8 sm:w-8",
                          onClick: handleZoomIn
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(ZoomIn), { class: "h-3.5 w-3.5 sm:h-4 sm:w-4" })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$u), {
                          variant: "ghost",
                          size: "icon",
                          class: "h-7 w-7 sm:h-8 sm:w-8",
                          onClick: handleResetZoom,
                          title: "Fit to Screen"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(RotateCcw), { class: "h-3.5 w-3.5 sm:h-4 sm:w-4" })
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$p), { class: "p-2 sm:p-6 pt-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (__props.binaryTree) {
                    _push3(ssrRenderComponent(_sfc_main$4, {
                      ref_key: "goJSTreeRef",
                      ref: goJSTreeRef,
                      "binary-tree": __props.binaryTree,
                      onOpenPlacement: openPlacementDialog
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<div class="h-[400px] flex items-center justify-center text-muted-foreground"${_scopeId2}><div class="text-center"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Users), { class: "w-12 h-12 mx-auto mb-4 opacity-20" }, null, _parent3, _scopeId2));
                    _push3(`<p${_scopeId2}>Belum ada jaringan binary tree</p></div></div>`);
                  }
                  _push3(`<div class="mt-4 sm:mt-6 p-2 sm:p-4 rounded-lg bg-muted/50"${_scopeId2}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-center sm:text-left"${_scopeId2}><p class="text-[10px] sm:text-sm text-muted-foreground"${_scopeId2}> 💡 <span class="hidden sm:inline"${_scopeId2}>Klik node &quot;+&quot; untuk menambahkan member ke posisi tersebut</span><span class="sm:hidden"${_scopeId2}>Klik &quot;+&quot; untuk tambah member</span></p><p class="text-[10px] sm:text-sm text-muted-foreground"${_scopeId2}><span class="hidden sm:inline"${_scopeId2}>Scroll/drag untuk navigasi • Mouse wheel untuk zoom</span><span class="sm:hidden"${_scopeId2}>Drag &amp; Pinch untuk navigasi</span></p></div></div>`);
                } else {
                  return [
                    __props.binaryTree ? (openBlock(), createBlock(_sfc_main$4, {
                      key: 0,
                      ref_key: "goJSTreeRef",
                      ref: goJSTreeRef,
                      "binary-tree": __props.binaryTree,
                      onOpenPlacement: openPlacementDialog
                    }, null, 8, ["binary-tree"])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "h-[400px] flex items-center justify-center text-muted-foreground"
                    }, [
                      createVNode("div", { class: "text-center" }, [
                        createVNode(unref(Users), { class: "w-12 h-12 mx-auto mb-4 opacity-20" }),
                        createVNode("p", null, "Belum ada jaringan binary tree")
                      ])
                    ])),
                    createVNode("div", { class: "mt-4 sm:mt-6 p-2 sm:p-4 rounded-lg bg-muted/50" }, [
                      createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-center sm:text-left" }, [
                        createVNode("p", { class: "text-[10px] sm:text-sm text-muted-foreground" }, [
                          createTextVNode(" 💡 "),
                          createVNode("span", { class: "hidden sm:inline" }, 'Klik node "+" untuk menambahkan member ke posisi tersebut'),
                          createVNode("span", { class: "sm:hidden" }, 'Klik "+" untuk tambah member')
                        ]),
                        createVNode("p", { class: "text-[10px] sm:text-sm text-muted-foreground" }, [
                          createVNode("span", { class: "hidden sm:inline" }, "Scroll/drag untuk navigasi • Mouse wheel untuk zoom"),
                          createVNode("span", { class: "sm:hidden" }, "Drag & Pinch untuk navigasi")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$v), { class: "p-3 sm:p-6" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2" }, [
                    createVNode("div", null, [
                      createVNode(unref(_sfc_main$w), { class: "text-sm sm:text-base" }, {
                        default: withCtx(() => [
                          createTextVNode("Struktur Binary Tree")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$N), { class: "text-xs sm:text-sm" }, {
                        default: withCtx(() => [
                          createTextVNode(" Visualisasi jaringan MLM binary tree Anda ")
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { class: "flex items-center gap-1 sm:gap-2" }, [
                      createVNode(unref(_sfc_main$u), {
                        variant: "outline",
                        size: "icon",
                        class: "h-7 w-7 sm:h-8 sm:w-8",
                        onClick: handleZoomOut
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(ZoomOut), { class: "h-3.5 w-3.5 sm:h-4 sm:w-4" })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$u), {
                        variant: "outline",
                        size: "icon",
                        class: "h-7 w-7 sm:h-8 sm:w-8",
                        onClick: handleZoomIn
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(ZoomIn), { class: "h-3.5 w-3.5 sm:h-4 sm:w-4" })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$u), {
                        variant: "ghost",
                        size: "icon",
                        class: "h-7 w-7 sm:h-8 sm:w-8",
                        onClick: handleResetZoom,
                        title: "Fit to Screen"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(RotateCcw), { class: "h-3.5 w-3.5 sm:h-4 sm:w-4" })
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$p), { class: "p-2 sm:p-6 pt-0" }, {
                default: withCtx(() => [
                  __props.binaryTree ? (openBlock(), createBlock(_sfc_main$4, {
                    key: 0,
                    ref_key: "goJSTreeRef",
                    ref: goJSTreeRef,
                    "binary-tree": __props.binaryTree,
                    onOpenPlacement: openPlacementDialog
                  }, null, 8, ["binary-tree"])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "h-[400px] flex items-center justify-center text-muted-foreground"
                  }, [
                    createVNode("div", { class: "text-center" }, [
                      createVNode(unref(Users), { class: "w-12 h-12 mx-auto mb-4 opacity-20" }),
                      createVNode("p", null, "Belum ada jaringan binary tree")
                    ])
                  ])),
                  createVNode("div", { class: "mt-4 sm:mt-6 p-2 sm:p-4 rounded-lg bg-muted/50" }, [
                    createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-center sm:text-left" }, [
                      createVNode("p", { class: "text-[10px] sm:text-sm text-muted-foreground" }, [
                        createTextVNode(" 💡 "),
                        createVNode("span", { class: "hidden sm:inline" }, 'Klik node "+" untuk menambahkan member ke posisi tersebut'),
                        createVNode("span", { class: "sm:hidden" }, 'Klik "+" untuk tambah member')
                      ]),
                      createVNode("p", { class: "text-[10px] sm:text-sm text-muted-foreground" }, [
                        createVNode("span", { class: "hidden sm:inline" }, "Scroll/drag untuk navigasi • Mouse wheel untuk zoom"),
                        createVNode("span", { class: "sm:hidden" }, "Drag & Pinch untuk navigasi")
                      ])
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
      _push(ssrRenderComponent(unref(_sfc_main$y), {
        open: showPlacementDialog.value,
        "onUpdate:open": closePlacementDialog
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$z), { class: "w-[95vw] max-w-2xl max-h-[85vh] overflow-hidden flex flex-col p-4 sm:p-6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$A), { class: "space-y-1 sm:space-y-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$B), { class: "text-base sm:text-lg" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Pilih Member untuk Ditempatkan`);
                            } else {
                              return [
                                createTextVNode("Pilih Member untuk Ditempatkan")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$C), { class: "text-xs sm:text-sm" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Pilih member pasif untuk ditempatkan di posisi <span class="font-semibold"${_scopeId4}>${ssrInterpolate(selectedPosition.value === "left" ? "Kiri" : "Kanan")}</span>`);
                            } else {
                              return [
                                createTextVNode(" Pilih member pasif untuk ditempatkan di posisi "),
                                createVNode("span", { class: "font-semibold" }, toDisplayString(selectedPosition.value === "left" ? "Kiri" : "Kanan"), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$B), { class: "text-base sm:text-lg" }, {
                            default: withCtx(() => [
                              createTextVNode("Pilih Member untuk Ditempatkan")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$C), { class: "text-xs sm:text-sm" }, {
                            default: withCtx(() => [
                              createTextVNode(" Pilih member pasif untuk ditempatkan di posisi "),
                              createVNode("span", { class: "font-semibold" }, toDisplayString(selectedPosition.value === "left" ? "Kiri" : "Kanan"), 1)
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="flex-1 overflow-y-auto py-2 sm:py-4"${_scopeId2}>`);
                  if (__props.passiveMembers.length === 0) {
                    _push3(`<div class="text-center py-8 sm:py-12 text-muted-foreground"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(UserPlus), { class: "w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 opacity-20" }, null, _parent3, _scopeId2));
                    _push3(`<p class="text-sm sm:text-base"${_scopeId2}>Tidak ada member pasif</p><p class="text-xs sm:text-sm mt-1 sm:mt-2"${_scopeId2}>Semua member sudah ditempatkan</p></div>`);
                  } else {
                    _push3(`<div class="space-y-2"${_scopeId2}><!--[-->`);
                    ssrRenderList(__props.passiveMembers, (member) => {
                      _push3(`<button type="button" class="${ssrRenderClass([
                        "w-full p-3 sm:p-4 rounded-lg border-2 text-left transition-all",
                        selectedMember.value?.id === member.id ? "border-primary bg-primary/10" : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                      ])}"${_scopeId2}><div class="flex items-start justify-between gap-2"${_scopeId2}><div class="flex-1 min-w-0"${_scopeId2}><div class="flex flex-wrap items-center gap-1 sm:gap-2 mb-1"${_scopeId2}><h4 class="font-semibold text-sm sm:text-base truncate"${_scopeId2}>${ssrInterpolate(member.name)}</h4>`);
                      if (member.has_purchase) {
                        _push3(ssrRenderComponent(unref(_sfc_main$t), {
                          variant: "default",
                          class: "text-[10px] sm:text-xs"
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`<span class="hidden sm:inline"${_scopeId3}>Ada Pembelian</span><span class="sm:hidden"${_scopeId3}>Beli</span>`);
                            } else {
                              return [
                                createVNode("span", { class: "hidden sm:inline" }, "Ada Pembelian"),
                                createVNode("span", { class: "sm:hidden" }, "Beli")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      } else {
                        _push3(ssrRenderComponent(unref(_sfc_main$t), {
                          variant: "secondary",
                          class: "text-[10px] sm:text-xs"
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`<span class="hidden sm:inline"${_scopeId3}>Belum Belanja</span><span class="sm:hidden"${_scopeId3}>Belum</span>`);
                            } else {
                              return [
                                createVNode("span", { class: "hidden sm:inline" }, "Belum Belanja"),
                                createVNode("span", { class: "sm:hidden" }, "Belum")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      }
                      _push3(`</div><div class="space-y-0.5 text-xs sm:text-sm text-muted-foreground"${_scopeId2}><p class="truncate"${_scopeId2}>${ssrInterpolate(member.email)}</p>`);
                      if (member.phone) {
                        _push3(`<p class="truncate"${_scopeId2}>${ssrInterpolate(member.phone)}</p>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`<p class="text-[10px] sm:text-xs"${_scopeId2}>Bergabung: ${ssrInterpolate(formatDate(member.joined_at))}</p></div></div>`);
                      if (selectedMember.value?.id === member.id) {
                        _push3(`<div class="flex-shrink-0"${_scopeId2}><div class="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-primary text-primary-foreground"${_scopeId2}><svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"${_scopeId2}></path></svg></div></div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div></button>`);
                    });
                    _push3(`<!--]--></div>`);
                  }
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$M), { class: "flex-col-reverse sm:flex-row gap-2 sm:gap-0" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$u), {
                          variant: "outline",
                          onClick: closePlacementDialog,
                          disabled: unref(placementForm).processing,
                          class: "w-full sm:w-auto"
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
                        _push4(ssrRenderComponent(unref(_sfc_main$u), {
                          onClick: placeMemberToBinaryTree,
                          disabled: !selectedMember.value || unref(placementForm).processing,
                          class: "w-full sm:w-auto"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(unref(placementForm).processing ? "Memproses..." : "Tempatkan")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(unref(placementForm).processing ? "Memproses..." : "Tempatkan"), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$u), {
                            variant: "outline",
                            onClick: closePlacementDialog,
                            disabled: unref(placementForm).processing,
                            class: "w-full sm:w-auto"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Batal ")
                            ]),
                            _: 1
                          }, 8, ["disabled"]),
                          createVNode(unref(_sfc_main$u), {
                            onClick: placeMemberToBinaryTree,
                            disabled: !selectedMember.value || unref(placementForm).processing,
                            class: "w-full sm:w-auto"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(placementForm).processing ? "Memproses..." : "Tempatkan"), 1)
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$A), { class: "space-y-1 sm:space-y-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$B), { class: "text-base sm:text-lg" }, {
                          default: withCtx(() => [
                            createTextVNode("Pilih Member untuk Ditempatkan")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$C), { class: "text-xs sm:text-sm" }, {
                          default: withCtx(() => [
                            createTextVNode(" Pilih member pasif untuk ditempatkan di posisi "),
                            createVNode("span", { class: "font-semibold" }, toDisplayString(selectedPosition.value === "left" ? "Kiri" : "Kanan"), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "flex-1 overflow-y-auto py-2 sm:py-4" }, [
                      __props.passiveMembers.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-center py-8 sm:py-12 text-muted-foreground"
                      }, [
                        createVNode(unref(UserPlus), { class: "w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 opacity-20" }),
                        createVNode("p", { class: "text-sm sm:text-base" }, "Tidak ada member pasif"),
                        createVNode("p", { class: "text-xs sm:text-sm mt-1 sm:mt-2" }, "Semua member sudah ditempatkan")
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "space-y-2"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.passiveMembers, (member) => {
                          return openBlock(), createBlock("button", {
                            key: member.id,
                            type: "button",
                            class: [
                              "w-full p-3 sm:p-4 rounded-lg border-2 text-left transition-all",
                              selectedMember.value?.id === member.id ? "border-primary bg-primary/10" : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                            ],
                            onClick: ($event) => selectMember(member)
                          }, [
                            createVNode("div", { class: "flex items-start justify-between gap-2" }, [
                              createVNode("div", { class: "flex-1 min-w-0" }, [
                                createVNode("div", { class: "flex flex-wrap items-center gap-1 sm:gap-2 mb-1" }, [
                                  createVNode("h4", { class: "font-semibold text-sm sm:text-base truncate" }, toDisplayString(member.name), 1),
                                  member.has_purchase ? (openBlock(), createBlock(unref(_sfc_main$t), {
                                    key: 0,
                                    variant: "default",
                                    class: "text-[10px] sm:text-xs"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("span", { class: "hidden sm:inline" }, "Ada Pembelian"),
                                      createVNode("span", { class: "sm:hidden" }, "Beli")
                                    ]),
                                    _: 1
                                  })) : (openBlock(), createBlock(unref(_sfc_main$t), {
                                    key: 1,
                                    variant: "secondary",
                                    class: "text-[10px] sm:text-xs"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("span", { class: "hidden sm:inline" }, "Belum Belanja"),
                                      createVNode("span", { class: "sm:hidden" }, "Belum")
                                    ]),
                                    _: 1
                                  }))
                                ]),
                                createVNode("div", { class: "space-y-0.5 text-xs sm:text-sm text-muted-foreground" }, [
                                  createVNode("p", { class: "truncate" }, toDisplayString(member.email), 1),
                                  member.phone ? (openBlock(), createBlock("p", {
                                    key: 0,
                                    class: "truncate"
                                  }, toDisplayString(member.phone), 1)) : createCommentVNode("", true),
                                  createVNode("p", { class: "text-[10px] sm:text-xs" }, "Bergabung: " + toDisplayString(formatDate(member.joined_at)), 1)
                                ])
                              ]),
                              selectedMember.value?.id === member.id ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "flex-shrink-0"
                              }, [
                                createVNode("div", { class: "flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-primary text-primary-foreground" }, [
                                  (openBlock(), createBlock("svg", {
                                    class: "w-3 h-3 sm:w-4 sm:h-4",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    stroke: "currentColor"
                                  }, [
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      "stroke-width": "2",
                                      d: "M5 13l4 4L19 7"
                                    })
                                  ]))
                                ])
                              ])) : createCommentVNode("", true)
                            ])
                          ], 10, ["onClick"]);
                        }), 128))
                      ]))
                    ]),
                    createVNode(unref(_sfc_main$M), { class: "flex-col-reverse sm:flex-row gap-2 sm:gap-0" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$u), {
                          variant: "outline",
                          onClick: closePlacementDialog,
                          disabled: unref(placementForm).processing,
                          class: "w-full sm:w-auto"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Batal ")
                          ]),
                          _: 1
                        }, 8, ["disabled"]),
                        createVNode(unref(_sfc_main$u), {
                          onClick: placeMemberToBinaryTree,
                          disabled: !selectedMember.value || unref(placementForm).processing,
                          class: "w-full sm:w-auto"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(placementForm).processing ? "Memproses..." : "Tempatkan"), 1)
                          ]),
                          _: 1
                        }, 8, ["disabled"])
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
              createVNode(unref(_sfc_main$z), { class: "w-[95vw] max-w-2xl max-h-[85vh] overflow-hidden flex flex-col p-4 sm:p-6" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$A), { class: "space-y-1 sm:space-y-2" }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$B), { class: "text-base sm:text-lg" }, {
                        default: withCtx(() => [
                          createTextVNode("Pilih Member untuk Ditempatkan")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$C), { class: "text-xs sm:text-sm" }, {
                        default: withCtx(() => [
                          createTextVNode(" Pilih member pasif untuk ditempatkan di posisi "),
                          createVNode("span", { class: "font-semibold" }, toDisplayString(selectedPosition.value === "left" ? "Kiri" : "Kanan"), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "flex-1 overflow-y-auto py-2 sm:py-4" }, [
                    __props.passiveMembers.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "text-center py-8 sm:py-12 text-muted-foreground"
                    }, [
                      createVNode(unref(UserPlus), { class: "w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 opacity-20" }),
                      createVNode("p", { class: "text-sm sm:text-base" }, "Tidak ada member pasif"),
                      createVNode("p", { class: "text-xs sm:text-sm mt-1 sm:mt-2" }, "Semua member sudah ditempatkan")
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "space-y-2"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.passiveMembers, (member) => {
                        return openBlock(), createBlock("button", {
                          key: member.id,
                          type: "button",
                          class: [
                            "w-full p-3 sm:p-4 rounded-lg border-2 text-left transition-all",
                            selectedMember.value?.id === member.id ? "border-primary bg-primary/10" : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                          ],
                          onClick: ($event) => selectMember(member)
                        }, [
                          createVNode("div", { class: "flex items-start justify-between gap-2" }, [
                            createVNode("div", { class: "flex-1 min-w-0" }, [
                              createVNode("div", { class: "flex flex-wrap items-center gap-1 sm:gap-2 mb-1" }, [
                                createVNode("h4", { class: "font-semibold text-sm sm:text-base truncate" }, toDisplayString(member.name), 1),
                                member.has_purchase ? (openBlock(), createBlock(unref(_sfc_main$t), {
                                  key: 0,
                                  variant: "default",
                                  class: "text-[10px] sm:text-xs"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("span", { class: "hidden sm:inline" }, "Ada Pembelian"),
                                    createVNode("span", { class: "sm:hidden" }, "Beli")
                                  ]),
                                  _: 1
                                })) : (openBlock(), createBlock(unref(_sfc_main$t), {
                                  key: 1,
                                  variant: "secondary",
                                  class: "text-[10px] sm:text-xs"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("span", { class: "hidden sm:inline" }, "Belum Belanja"),
                                    createVNode("span", { class: "sm:hidden" }, "Belum")
                                  ]),
                                  _: 1
                                }))
                              ]),
                              createVNode("div", { class: "space-y-0.5 text-xs sm:text-sm text-muted-foreground" }, [
                                createVNode("p", { class: "truncate" }, toDisplayString(member.email), 1),
                                member.phone ? (openBlock(), createBlock("p", {
                                  key: 0,
                                  class: "truncate"
                                }, toDisplayString(member.phone), 1)) : createCommentVNode("", true),
                                createVNode("p", { class: "text-[10px] sm:text-xs" }, "Bergabung: " + toDisplayString(formatDate(member.joined_at)), 1)
                              ])
                            ]),
                            selectedMember.value?.id === member.id ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "flex-shrink-0"
                            }, [
                              createVNode("div", { class: "flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-primary text-primary-foreground" }, [
                                (openBlock(), createBlock("svg", {
                                  class: "w-3 h-3 sm:w-4 sm:h-4",
                                  fill: "none",
                                  viewBox: "0 0 24 24",
                                  stroke: "currentColor"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "2",
                                    d: "M5 13l4 4L19 7"
                                  })
                                ]))
                              ])
                            ])) : createCommentVNode("", true)
                          ])
                        ], 10, ["onClick"]);
                      }), 128))
                    ]))
                  ]),
                  createVNode(unref(_sfc_main$M), { class: "flex-col-reverse sm:flex-row gap-2 sm:gap-0" }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$u), {
                        variant: "outline",
                        onClick: closePlacementDialog,
                        disabled: unref(placementForm).processing,
                        class: "w-full sm:w-auto"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Batal ")
                        ]),
                        _: 1
                      }, 8, ["disabled"]),
                      createVNode(unref(_sfc_main$u), {
                        onClick: placeMemberToBinaryTree,
                        disabled: !selectedMember.value || unref(placementForm).processing,
                        class: "w-full sm:w-auto"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(placementForm).processing ? "Memproses..." : "Tempatkan"), 1)
                        ]),
                        _: 1
                      }, 8, ["disabled"])
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
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/profile/BinaryTreeTab.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "BonusTab",
  __ssrInlineRender: true,
  props: {
    bonusSponsors: {},
    bonusMatchings: {},
    bonusPairings: {},
    bonusCashbacks: {},
    bonusRewards: {},
    bonusRetails: {},
    bonusLifetimeCashRewards: {}
  },
  setup(__props) {
    const props = __props;
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(amount);
    };
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
    };
    const totalSponsor = computed(
      () => props.bonusSponsors.reduce((sum, bonus) => sum + bonus.amount, 0)
    );
    const totalMatching = computed(
      () => props.bonusMatchings.reduce((sum, bonus) => sum + bonus.amount, 0)
    );
    const totalPairing = computed(
      () => props.bonusPairings.reduce((sum, bonus) => sum + bonus.amount, 0)
    );
    const totalCashback = computed(
      () => props.bonusCashbacks.reduce((sum, bonus) => sum + bonus.amount, 0)
    );
    const totalReward = computed(
      () => props.bonusRewards.reduce((sum, bonus) => sum + bonus.amount, 0)
    );
    const pendingSponsor = computed(
      () => props.bonusSponsors.filter((b) => b.status === 0).reduce((sum, b) => sum + b.amount, 0)
    );
    const releasedSponsor = computed(
      () => props.bonusSponsors.filter((b) => b.status === 1).reduce((sum, b) => sum + b.amount, 0)
    );
    const pendingMatching = computed(
      () => props.bonusMatchings.filter((b) => b.status === 0).reduce((sum, b) => sum + b.amount, 0)
    );
    const releasedMatching = computed(
      () => props.bonusMatchings.filter((b) => b.status === 1).reduce((sum, b) => sum + b.amount, 0)
    );
    const pendingPairing = computed(
      () => props.bonusPairings.filter((b) => b.status === 0).reduce((sum, b) => sum + b.amount, 0)
    );
    const releasedPairing = computed(
      () => props.bonusPairings.filter((b) => b.status === 1).reduce((sum, b) => sum + b.amount, 0)
    );
    const pendingCashback = computed(
      () => props.bonusCashbacks.filter((b) => b.status === 0).reduce((sum, b) => sum + b.amount, 0)
    );
    const releasedCashback = computed(
      () => props.bonusCashbacks.filter((b) => b.status === 1).reduce((sum, b) => sum + b.amount, 0)
    );
    const pendingReward = computed(
      () => props.bonusRewards.filter((b) => b.status === 0).reduce((sum, b) => sum + b.amount, 0)
    );
    const releasedReward = computed(
      () => props.bonusRewards.filter((b) => b.status === 1).reduce((sum, b) => sum + b.amount, 0)
    );
    const totalRetail = computed(
      () => props.bonusRetails.reduce((sum, bonus) => sum + bonus.amount, 0)
    );
    const pendingRetail = computed(
      () => props.bonusRetails.filter((b) => b.status === 0).reduce((sum, b) => sum + b.amount, 0)
    );
    const releasedRetail = computed(
      () => props.bonusRetails.filter((b) => b.status === 1).reduce((sum, b) => sum + b.amount, 0)
    );
    const totalLifetimeCashReward = computed(
      () => props.bonusLifetimeCashRewards.reduce((sum, bonus) => sum + bonus.amount, 0)
    );
    const pendingLifetimeCashReward = computed(
      () => props.bonusLifetimeCashRewards.filter((b) => b.status === 0).reduce((sum, b) => sum + b.amount, 0)
    );
    const releasedLifetimeCashReward = computed(
      () => props.bonusLifetimeCashRewards.filter((b) => b.status === 1).reduce((sum, b) => sum + b.amount, 0)
    );
    const grandTotal = computed(
      () => totalSponsor.value + totalMatching.value + totalPairing.value + totalCashback.value + totalReward.value + totalRetail.value + totalLifetimeCashReward.value
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4 sm:space-y-6" }, _attrs))}><div class="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">`);
      _push(ssrRenderComponent(unref(_sfc_main$o), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$v), { class: "pb-2 sm:pb-3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$w), { class: "text-xs sm:text-sm font-medium flex items-center gap-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Users), { class: "h-3 w-3 sm:h-4 sm:w-4 text-blue-500 flex-shrink-0" }, null, _parent4, _scopeId3));
                        _push4(`<span class="truncate"${_scopeId3}>Referral Incentive</span>`);
                      } else {
                        return [
                          createVNode(unref(Users), { class: "h-3 w-3 sm:h-4 sm:w-4 text-blue-500 flex-shrink-0" }),
                          createVNode("span", { class: "truncate" }, "Referral Incentive")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$w), { class: "text-xs sm:text-sm font-medium flex items-center gap-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(Users), { class: "h-3 w-3 sm:h-4 sm:w-4 text-blue-500 flex-shrink-0" }),
                        createVNode("span", { class: "truncate" }, "Referral Incentive")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$p), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-xl sm:text-2xl font-bold truncate"${_scopeId2}>${ssrInterpolate(formatCurrency(totalSponsor.value))}</div><p class="text-[10px] sm:text-xs text-muted-foreground mt-1"${_scopeId2}>${ssrInterpolate(__props.bonusSponsors.length)} transaksi </p><div class="flex flex-col sm:flex-row gap-1 sm:gap-2 mt-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$t), {
                    variant: "outline",
                    class: "text-[10px] sm:text-xs justify-center sm:justify-start"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Pending: ${ssrInterpolate(formatCurrency(pendingSponsor.value))}`);
                      } else {
                        return [
                          createTextVNode(" Pending: " + toDisplayString(formatCurrency(pendingSponsor.value)), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$t), {
                    variant: "secondary",
                    class: "text-[10px] sm:text-xs justify-center sm:justify-start"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Released: ${ssrInterpolate(formatCurrency(releasedSponsor.value))}`);
                      } else {
                        return [
                          createTextVNode(" Released: " + toDisplayString(formatCurrency(releasedSponsor.value)), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "text-xl sm:text-2xl font-bold truncate" }, toDisplayString(formatCurrency(totalSponsor.value)), 1),
                    createVNode("p", { class: "text-[10px] sm:text-xs text-muted-foreground mt-1" }, toDisplayString(__props.bonusSponsors.length) + " transaksi ", 1),
                    createVNode("div", { class: "flex flex-col sm:flex-row gap-1 sm:gap-2 mt-2" }, [
                      createVNode(unref(_sfc_main$t), {
                        variant: "outline",
                        class: "text-[10px] sm:text-xs justify-center sm:justify-start"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Pending: " + toDisplayString(formatCurrency(pendingSponsor.value)), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$t), {
                        variant: "secondary",
                        class: "text-[10px] sm:text-xs justify-center sm:justify-start"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Released: " + toDisplayString(formatCurrency(releasedSponsor.value)), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$v), { class: "pb-2 sm:pb-3" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$w), { class: "text-xs sm:text-sm font-medium flex items-center gap-2" }, {
                    default: withCtx(() => [
                      createVNode(unref(Users), { class: "h-3 w-3 sm:h-4 sm:w-4 text-blue-500 flex-shrink-0" }),
                      createVNode("span", { class: "truncate" }, "Referral Incentive")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$p), null, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-xl sm:text-2xl font-bold truncate" }, toDisplayString(formatCurrency(totalSponsor.value)), 1),
                  createVNode("p", { class: "text-[10px] sm:text-xs text-muted-foreground mt-1" }, toDisplayString(__props.bonusSponsors.length) + " transaksi ", 1),
                  createVNode("div", { class: "flex flex-col sm:flex-row gap-1 sm:gap-2 mt-2" }, [
                    createVNode(unref(_sfc_main$t), {
                      variant: "outline",
                      class: "text-[10px] sm:text-xs justify-center sm:justify-start"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Pending: " + toDisplayString(formatCurrency(pendingSponsor.value)), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$t), {
                      variant: "secondary",
                      class: "text-[10px] sm:text-xs justify-center sm:justify-start"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Released: " + toDisplayString(formatCurrency(releasedSponsor.value)), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$o), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$v), { class: "pb-2 sm:pb-3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$w), { class: "text-xs sm:text-sm font-medium flex items-center gap-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Handshake), { class: "h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" }, null, _parent4, _scopeId3));
                        _push4(`<span class="truncate"${_scopeId3}>Team Affiliate Commission</span>`);
                      } else {
                        return [
                          createVNode(unref(Handshake), { class: "h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" }),
                          createVNode("span", { class: "truncate" }, "Team Affiliate Commission")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$w), { class: "text-xs sm:text-sm font-medium flex items-center gap-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(Handshake), { class: "h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" }),
                        createVNode("span", { class: "truncate" }, "Team Affiliate Commission")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$p), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-xl sm:text-2xl font-bold truncate"${_scopeId2}>${ssrInterpolate(formatCurrency(totalMatching.value))}</div><p class="text-[10px] sm:text-xs text-muted-foreground mt-1"${_scopeId2}>${ssrInterpolate(__props.bonusMatchings.length)} transaksi </p><div class="flex flex-col sm:flex-row gap-1 sm:gap-2 mt-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$t), {
                    variant: "outline",
                    class: "text-[10px] sm:text-xs justify-center sm:justify-start"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Pending: ${ssrInterpolate(formatCurrency(pendingMatching.value))}`);
                      } else {
                        return [
                          createTextVNode(" Pending: " + toDisplayString(formatCurrency(pendingMatching.value)), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$t), {
                    variant: "secondary",
                    class: "text-[10px] sm:text-xs justify-center sm:justify-start"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Released: ${ssrInterpolate(formatCurrency(releasedMatching.value))}`);
                      } else {
                        return [
                          createTextVNode(" Released: " + toDisplayString(formatCurrency(releasedMatching.value)), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "text-xl sm:text-2xl font-bold truncate" }, toDisplayString(formatCurrency(totalMatching.value)), 1),
                    createVNode("p", { class: "text-[10px] sm:text-xs text-muted-foreground mt-1" }, toDisplayString(__props.bonusMatchings.length) + " transaksi ", 1),
                    createVNode("div", { class: "flex flex-col sm:flex-row gap-1 sm:gap-2 mt-2" }, [
                      createVNode(unref(_sfc_main$t), {
                        variant: "outline",
                        class: "text-[10px] sm:text-xs justify-center sm:justify-start"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Pending: " + toDisplayString(formatCurrency(pendingMatching.value)), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$t), {
                        variant: "secondary",
                        class: "text-[10px] sm:text-xs justify-center sm:justify-start"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Released: " + toDisplayString(formatCurrency(releasedMatching.value)), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$v), { class: "pb-2 sm:pb-3" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$w), { class: "text-xs sm:text-sm font-medium flex items-center gap-2" }, {
                    default: withCtx(() => [
                      createVNode(unref(Handshake), { class: "h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" }),
                      createVNode("span", { class: "truncate" }, "Team Affiliate Commission")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$p), null, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-xl sm:text-2xl font-bold truncate" }, toDisplayString(formatCurrency(totalMatching.value)), 1),
                  createVNode("p", { class: "text-[10px] sm:text-xs text-muted-foreground mt-1" }, toDisplayString(__props.bonusMatchings.length) + " transaksi ", 1),
                  createVNode("div", { class: "flex flex-col sm:flex-row gap-1 sm:gap-2 mt-2" }, [
                    createVNode(unref(_sfc_main$t), {
                      variant: "outline",
                      class: "text-[10px] sm:text-xs justify-center sm:justify-start"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Pending: " + toDisplayString(formatCurrency(pendingMatching.value)), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$t), {
                      variant: "secondary",
                      class: "text-[10px] sm:text-xs justify-center sm:justify-start"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Released: " + toDisplayString(formatCurrency(releasedMatching.value)), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$o), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$v), { class: "pb-2 sm:pb-3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$w), { class: "text-xs sm:text-sm font-medium flex items-center gap-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(DollarSign), { class: "h-3 w-3 sm:h-4 sm:w-4 text-purple-500 flex-shrink-0" }, null, _parent4, _scopeId3));
                        _push4(`<span class="truncate"${_scopeId3}>Partner Team Commission</span>`);
                      } else {
                        return [
                          createVNode(unref(DollarSign), { class: "h-3 w-3 sm:h-4 sm:w-4 text-purple-500 flex-shrink-0" }),
                          createVNode("span", { class: "truncate" }, "Partner Team Commission")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$w), { class: "text-xs sm:text-sm font-medium flex items-center gap-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(DollarSign), { class: "h-3 w-3 sm:h-4 sm:w-4 text-purple-500 flex-shrink-0" }),
                        createVNode("span", { class: "truncate" }, "Partner Team Commission")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$p), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-xl sm:text-2xl font-bold truncate"${_scopeId2}>${ssrInterpolate(formatCurrency(totalPairing.value))}</div><p class="text-[10px] sm:text-xs text-muted-foreground mt-1"${_scopeId2}>${ssrInterpolate(__props.bonusPairings.length)} transaksi </p><div class="flex flex-col sm:flex-row gap-1 sm:gap-2 mt-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$t), {
                    variant: "outline",
                    class: "text-[10px] sm:text-xs justify-center sm:justify-start"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Pending: ${ssrInterpolate(formatCurrency(pendingPairing.value))}`);
                      } else {
                        return [
                          createTextVNode(" Pending: " + toDisplayString(formatCurrency(pendingPairing.value)), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$t), {
                    variant: "secondary",
                    class: "text-[10px] sm:text-xs justify-center sm:justify-start"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Released: ${ssrInterpolate(formatCurrency(releasedPairing.value))}`);
                      } else {
                        return [
                          createTextVNode(" Released: " + toDisplayString(formatCurrency(releasedPairing.value)), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "text-xl sm:text-2xl font-bold truncate" }, toDisplayString(formatCurrency(totalPairing.value)), 1),
                    createVNode("p", { class: "text-[10px] sm:text-xs text-muted-foreground mt-1" }, toDisplayString(__props.bonusPairings.length) + " transaksi ", 1),
                    createVNode("div", { class: "flex flex-col sm:flex-row gap-1 sm:gap-2 mt-2" }, [
                      createVNode(unref(_sfc_main$t), {
                        variant: "outline",
                        class: "text-[10px] sm:text-xs justify-center sm:justify-start"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Pending: " + toDisplayString(formatCurrency(pendingPairing.value)), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$t), {
                        variant: "secondary",
                        class: "text-[10px] sm:text-xs justify-center sm:justify-start"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Released: " + toDisplayString(formatCurrency(releasedPairing.value)), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$v), { class: "pb-2 sm:pb-3" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$w), { class: "text-xs sm:text-sm font-medium flex items-center gap-2" }, {
                    default: withCtx(() => [
                      createVNode(unref(DollarSign), { class: "h-3 w-3 sm:h-4 sm:w-4 text-purple-500 flex-shrink-0" }),
                      createVNode("span", { class: "truncate" }, "Partner Team Commission")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$p), null, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-xl sm:text-2xl font-bold truncate" }, toDisplayString(formatCurrency(totalPairing.value)), 1),
                  createVNode("p", { class: "text-[10px] sm:text-xs text-muted-foreground mt-1" }, toDisplayString(__props.bonusPairings.length) + " transaksi ", 1),
                  createVNode("div", { class: "flex flex-col sm:flex-row gap-1 sm:gap-2 mt-2" }, [
                    createVNode(unref(_sfc_main$t), {
                      variant: "outline",
                      class: "text-[10px] sm:text-xs justify-center sm:justify-start"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Pending: " + toDisplayString(formatCurrency(pendingPairing.value)), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$t), {
                      variant: "secondary",
                      class: "text-[10px] sm:text-xs justify-center sm:justify-start"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Released: " + toDisplayString(formatCurrency(releasedPairing.value)), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$o), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$v), { class: "pb-2 sm:pb-3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$w), { class: "text-xs sm:text-sm font-medium flex items-center gap-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Percent), { class: "h-3 w-3 sm:h-4 sm:w-4 text-orange-500 flex-shrink-0" }, null, _parent4, _scopeId3));
                        _push4(`<span class="truncate"${_scopeId3}>Cashback Commission</span>`);
                      } else {
                        return [
                          createVNode(unref(Percent), { class: "h-3 w-3 sm:h-4 sm:w-4 text-orange-500 flex-shrink-0" }),
                          createVNode("span", { class: "truncate" }, "Cashback Commission")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$w), { class: "text-xs sm:text-sm font-medium flex items-center gap-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(Percent), { class: "h-3 w-3 sm:h-4 sm:w-4 text-orange-500 flex-shrink-0" }),
                        createVNode("span", { class: "truncate" }, "Cashback Commission")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$p), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-xl sm:text-2xl font-bold truncate"${_scopeId2}>${ssrInterpolate(formatCurrency(totalCashback.value))}</div><p class="text-[10px] sm:text-xs text-muted-foreground mt-1"${_scopeId2}>${ssrInterpolate(__props.bonusCashbacks.length)} transaksi </p><div class="flex flex-col sm:flex-row gap-1 sm:gap-2 mt-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$t), {
                    variant: "outline",
                    class: "text-[10px] sm:text-xs justify-center sm:justify-start"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Pending: ${ssrInterpolate(formatCurrency(pendingCashback.value))}`);
                      } else {
                        return [
                          createTextVNode(" Pending: " + toDisplayString(formatCurrency(pendingCashback.value)), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$t), {
                    variant: "secondary",
                    class: "text-[10px] sm:text-xs justify-center sm:justify-start"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Released: ${ssrInterpolate(formatCurrency(releasedCashback.value))}`);
                      } else {
                        return [
                          createTextVNode(" Released: " + toDisplayString(formatCurrency(releasedCashback.value)), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "text-xl sm:text-2xl font-bold truncate" }, toDisplayString(formatCurrency(totalCashback.value)), 1),
                    createVNode("p", { class: "text-[10px] sm:text-xs text-muted-foreground mt-1" }, toDisplayString(__props.bonusCashbacks.length) + " transaksi ", 1),
                    createVNode("div", { class: "flex flex-col sm:flex-row gap-1 sm:gap-2 mt-2" }, [
                      createVNode(unref(_sfc_main$t), {
                        variant: "outline",
                        class: "text-[10px] sm:text-xs justify-center sm:justify-start"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Pending: " + toDisplayString(formatCurrency(pendingCashback.value)), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$t), {
                        variant: "secondary",
                        class: "text-[10px] sm:text-xs justify-center sm:justify-start"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Released: " + toDisplayString(formatCurrency(releasedCashback.value)), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$v), { class: "pb-2 sm:pb-3" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$w), { class: "text-xs sm:text-sm font-medium flex items-center gap-2" }, {
                    default: withCtx(() => [
                      createVNode(unref(Percent), { class: "h-3 w-3 sm:h-4 sm:w-4 text-orange-500 flex-shrink-0" }),
                      createVNode("span", { class: "truncate" }, "Cashback Commission")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$p), null, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-xl sm:text-2xl font-bold truncate" }, toDisplayString(formatCurrency(totalCashback.value)), 1),
                  createVNode("p", { class: "text-[10px] sm:text-xs text-muted-foreground mt-1" }, toDisplayString(__props.bonusCashbacks.length) + " transaksi ", 1),
                  createVNode("div", { class: "flex flex-col sm:flex-row gap-1 sm:gap-2 mt-2" }, [
                    createVNode(unref(_sfc_main$t), {
                      variant: "outline",
                      class: "text-[10px] sm:text-xs justify-center sm:justify-start"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Pending: " + toDisplayString(formatCurrency(pendingCashback.value)), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$t), {
                      variant: "secondary",
                      class: "text-[10px] sm:text-xs justify-center sm:justify-start"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Released: " + toDisplayString(formatCurrency(releasedCashback.value)), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$o), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$v), { class: "pb-2 sm:pb-3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$w), { class: "text-xs sm:text-sm font-medium flex items-center gap-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Trophy), { class: "h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 flex-shrink-0" }, null, _parent4, _scopeId3));
                        _push4(`<span class="truncate"${_scopeId3}>Promotions Rewards</span>`);
                      } else {
                        return [
                          createVNode(unref(Trophy), { class: "h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 flex-shrink-0" }),
                          createVNode("span", { class: "truncate" }, "Promotions Rewards")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$w), { class: "text-xs sm:text-sm font-medium flex items-center gap-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(Trophy), { class: "h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 flex-shrink-0" }),
                        createVNode("span", { class: "truncate" }, "Promotions Rewards")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$p), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-xl sm:text-2xl font-bold truncate"${_scopeId2}>${ssrInterpolate(formatCurrency(totalReward.value))}</div><p class="text-[10px] sm:text-xs text-muted-foreground mt-1"${_scopeId2}>${ssrInterpolate(__props.bonusRewards.length)} transaksi </p><div class="flex flex-col sm:flex-row gap-1 sm:gap-2 mt-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$t), {
                    variant: "outline",
                    class: "text-[10px] sm:text-xs justify-center sm:justify-start"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Pending: ${ssrInterpolate(formatCurrency(pendingReward.value))}`);
                      } else {
                        return [
                          createTextVNode(" Pending: " + toDisplayString(formatCurrency(pendingReward.value)), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$t), {
                    variant: "secondary",
                    class: "text-[10px] sm:text-xs justify-center sm:justify-start"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Released: ${ssrInterpolate(formatCurrency(releasedReward.value))}`);
                      } else {
                        return [
                          createTextVNode(" Released: " + toDisplayString(formatCurrency(releasedReward.value)), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "text-xl sm:text-2xl font-bold truncate" }, toDisplayString(formatCurrency(totalReward.value)), 1),
                    createVNode("p", { class: "text-[10px] sm:text-xs text-muted-foreground mt-1" }, toDisplayString(__props.bonusRewards.length) + " transaksi ", 1),
                    createVNode("div", { class: "flex flex-col sm:flex-row gap-1 sm:gap-2 mt-2" }, [
                      createVNode(unref(_sfc_main$t), {
                        variant: "outline",
                        class: "text-[10px] sm:text-xs justify-center sm:justify-start"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Pending: " + toDisplayString(formatCurrency(pendingReward.value)), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$t), {
                        variant: "secondary",
                        class: "text-[10px] sm:text-xs justify-center sm:justify-start"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Released: " + toDisplayString(formatCurrency(releasedReward.value)), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$v), { class: "pb-2 sm:pb-3" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$w), { class: "text-xs sm:text-sm font-medium flex items-center gap-2" }, {
                    default: withCtx(() => [
                      createVNode(unref(Trophy), { class: "h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 flex-shrink-0" }),
                      createVNode("span", { class: "truncate" }, "Promotions Rewards")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$p), null, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-xl sm:text-2xl font-bold truncate" }, toDisplayString(formatCurrency(totalReward.value)), 1),
                  createVNode("p", { class: "text-[10px] sm:text-xs text-muted-foreground mt-1" }, toDisplayString(__props.bonusRewards.length) + " transaksi ", 1),
                  createVNode("div", { class: "flex flex-col sm:flex-row gap-1 sm:gap-2 mt-2" }, [
                    createVNode(unref(_sfc_main$t), {
                      variant: "outline",
                      class: "text-[10px] sm:text-xs justify-center sm:justify-start"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Pending: " + toDisplayString(formatCurrency(pendingReward.value)), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$t), {
                      variant: "secondary",
                      class: "text-[10px] sm:text-xs justify-center sm:justify-start"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Released: " + toDisplayString(formatCurrency(releasedReward.value)), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$o), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$v), { class: "pb-2 sm:pb-3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$w), { class: "text-xs sm:text-sm font-medium flex items-center gap-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(ShoppingCart), { class: "h-3 w-3 sm:h-4 sm:w-4 text-cyan-500 flex-shrink-0" }, null, _parent4, _scopeId3));
                        _push4(`<span class="truncate"${_scopeId3}>Retail Commission</span>`);
                      } else {
                        return [
                          createVNode(unref(ShoppingCart), { class: "h-3 w-3 sm:h-4 sm:w-4 text-cyan-500 flex-shrink-0" }),
                          createVNode("span", { class: "truncate" }, "Retail Commission")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$w), { class: "text-xs sm:text-sm font-medium flex items-center gap-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(ShoppingCart), { class: "h-3 w-3 sm:h-4 sm:w-4 text-cyan-500 flex-shrink-0" }),
                        createVNode("span", { class: "truncate" }, "Retail Commission")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$p), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-xl sm:text-2xl font-bold truncate"${_scopeId2}>${ssrInterpolate(formatCurrency(totalRetail.value))}</div><p class="text-[10px] sm:text-xs text-muted-foreground mt-1"${_scopeId2}>${ssrInterpolate(__props.bonusRetails.length)} transaksi </p><div class="flex flex-col sm:flex-row gap-1 sm:gap-2 mt-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$t), {
                    variant: "outline",
                    class: "text-[10px] sm:text-xs justify-center sm:justify-start"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Pending: ${ssrInterpolate(formatCurrency(pendingRetail.value))}`);
                      } else {
                        return [
                          createTextVNode(" Pending: " + toDisplayString(formatCurrency(pendingRetail.value)), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$t), {
                    variant: "secondary",
                    class: "text-[10px] sm:text-xs justify-center sm:justify-start"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Released: ${ssrInterpolate(formatCurrency(releasedRetail.value))}`);
                      } else {
                        return [
                          createTextVNode(" Released: " + toDisplayString(formatCurrency(releasedRetail.value)), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "text-xl sm:text-2xl font-bold truncate" }, toDisplayString(formatCurrency(totalRetail.value)), 1),
                    createVNode("p", { class: "text-[10px] sm:text-xs text-muted-foreground mt-1" }, toDisplayString(__props.bonusRetails.length) + " transaksi ", 1),
                    createVNode("div", { class: "flex flex-col sm:flex-row gap-1 sm:gap-2 mt-2" }, [
                      createVNode(unref(_sfc_main$t), {
                        variant: "outline",
                        class: "text-[10px] sm:text-xs justify-center sm:justify-start"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Pending: " + toDisplayString(formatCurrency(pendingRetail.value)), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$t), {
                        variant: "secondary",
                        class: "text-[10px] sm:text-xs justify-center sm:justify-start"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Released: " + toDisplayString(formatCurrency(releasedRetail.value)), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$v), { class: "pb-2 sm:pb-3" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$w), { class: "text-xs sm:text-sm font-medium flex items-center gap-2" }, {
                    default: withCtx(() => [
                      createVNode(unref(ShoppingCart), { class: "h-3 w-3 sm:h-4 sm:w-4 text-cyan-500 flex-shrink-0" }),
                      createVNode("span", { class: "truncate" }, "Retail Commission")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$p), null, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-xl sm:text-2xl font-bold truncate" }, toDisplayString(formatCurrency(totalRetail.value)), 1),
                  createVNode("p", { class: "text-[10px] sm:text-xs text-muted-foreground mt-1" }, toDisplayString(__props.bonusRetails.length) + " transaksi ", 1),
                  createVNode("div", { class: "flex flex-col sm:flex-row gap-1 sm:gap-2 mt-2" }, [
                    createVNode(unref(_sfc_main$t), {
                      variant: "outline",
                      class: "text-[10px] sm:text-xs justify-center sm:justify-start"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Pending: " + toDisplayString(formatCurrency(pendingRetail.value)), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$t), {
                      variant: "secondary",
                      class: "text-[10px] sm:text-xs justify-center sm:justify-start"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Released: " + toDisplayString(formatCurrency(releasedRetail.value)), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$o), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$v), { class: "pb-2 sm:pb-3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$w), { class: "text-xs sm:text-sm font-medium flex items-center gap-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Star), { class: "h-3 w-3 sm:h-4 sm:w-4 text-amber-500 flex-shrink-0" }, null, _parent4, _scopeId3));
                        _push4(`<span class="truncate"${_scopeId3}>Lifetime Cash Rewards</span>`);
                      } else {
                        return [
                          createVNode(unref(Star), { class: "h-3 w-3 sm:h-4 sm:w-4 text-amber-500 flex-shrink-0" }),
                          createVNode("span", { class: "truncate" }, "Lifetime Cash Rewards")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$w), { class: "text-xs sm:text-sm font-medium flex items-center gap-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(Star), { class: "h-3 w-3 sm:h-4 sm:w-4 text-amber-500 flex-shrink-0" }),
                        createVNode("span", { class: "truncate" }, "Lifetime Cash Rewards")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$p), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-xl sm:text-2xl font-bold truncate"${_scopeId2}>${ssrInterpolate(formatCurrency(totalLifetimeCashReward.value))}</div><p class="text-[10px] sm:text-xs text-muted-foreground mt-1"${_scopeId2}>${ssrInterpolate(__props.bonusLifetimeCashRewards.length)} transaksi </p><div class="flex flex-col sm:flex-row gap-1 sm:gap-2 mt-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$t), {
                    variant: "outline",
                    class: "text-[10px] sm:text-xs justify-center sm:justify-start"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Pending: ${ssrInterpolate(formatCurrency(pendingLifetimeCashReward.value))}`);
                      } else {
                        return [
                          createTextVNode(" Pending: " + toDisplayString(formatCurrency(pendingLifetimeCashReward.value)), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$t), {
                    variant: "secondary",
                    class: "text-[10px] sm:text-xs justify-center sm:justify-start"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Released: ${ssrInterpolate(formatCurrency(releasedLifetimeCashReward.value))}`);
                      } else {
                        return [
                          createTextVNode(" Released: " + toDisplayString(formatCurrency(releasedLifetimeCashReward.value)), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "text-xl sm:text-2xl font-bold truncate" }, toDisplayString(formatCurrency(totalLifetimeCashReward.value)), 1),
                    createVNode("p", { class: "text-[10px] sm:text-xs text-muted-foreground mt-1" }, toDisplayString(__props.bonusLifetimeCashRewards.length) + " transaksi ", 1),
                    createVNode("div", { class: "flex flex-col sm:flex-row gap-1 sm:gap-2 mt-2" }, [
                      createVNode(unref(_sfc_main$t), {
                        variant: "outline",
                        class: "text-[10px] sm:text-xs justify-center sm:justify-start"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Pending: " + toDisplayString(formatCurrency(pendingLifetimeCashReward.value)), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$t), {
                        variant: "secondary",
                        class: "text-[10px] sm:text-xs justify-center sm:justify-start"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Released: " + toDisplayString(formatCurrency(releasedLifetimeCashReward.value)), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$v), { class: "pb-2 sm:pb-3" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$w), { class: "text-xs sm:text-sm font-medium flex items-center gap-2" }, {
                    default: withCtx(() => [
                      createVNode(unref(Star), { class: "h-3 w-3 sm:h-4 sm:w-4 text-amber-500 flex-shrink-0" }),
                      createVNode("span", { class: "truncate" }, "Lifetime Cash Rewards")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$p), null, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-xl sm:text-2xl font-bold truncate" }, toDisplayString(formatCurrency(totalLifetimeCashReward.value)), 1),
                  createVNode("p", { class: "text-[10px] sm:text-xs text-muted-foreground mt-1" }, toDisplayString(__props.bonusLifetimeCashRewards.length) + " transaksi ", 1),
                  createVNode("div", { class: "flex flex-col sm:flex-row gap-1 sm:gap-2 mt-2" }, [
                    createVNode(unref(_sfc_main$t), {
                      variant: "outline",
                      class: "text-[10px] sm:text-xs justify-center sm:justify-start"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Pending: " + toDisplayString(formatCurrency(pendingLifetimeCashReward.value)), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$t), {
                      variant: "secondary",
                      class: "text-[10px] sm:text-xs justify-center sm:justify-start"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Released: " + toDisplayString(formatCurrency(releasedLifetimeCashReward.value)), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$o), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$v), { class: "pb-2 sm:pb-3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$w), { class: "text-xs sm:text-sm font-medium flex items-center gap-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Gift), { class: "h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" }, null, _parent4, _scopeId3));
                        _push4(`<span class="truncate"${_scopeId3}>Total Bonus</span>`);
                      } else {
                        return [
                          createVNode(unref(Gift), { class: "h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" }),
                          createVNode("span", { class: "truncate" }, "Total Bonus")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$w), { class: "text-xs sm:text-sm font-medium flex items-center gap-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(Gift), { class: "h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" }),
                        createVNode("span", { class: "truncate" }, "Total Bonus")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$p), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-xl sm:text-2xl font-bold text-primary truncate"${_scopeId2}>${ssrInterpolate(formatCurrency(grandTotal.value))}</div><p class="text-[10px] sm:text-xs text-muted-foreground mt-1"${_scopeId2}> Semua jenis bonus </p>`);
                } else {
                  return [
                    createVNode("div", { class: "text-xl sm:text-2xl font-bold text-primary truncate" }, toDisplayString(formatCurrency(grandTotal.value)), 1),
                    createVNode("p", { class: "text-[10px] sm:text-xs text-muted-foreground mt-1" }, " Semua jenis bonus ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$v), { class: "pb-2 sm:pb-3" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$w), { class: "text-xs sm:text-sm font-medium flex items-center gap-2" }, {
                    default: withCtx(() => [
                      createVNode(unref(Gift), { class: "h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" }),
                      createVNode("span", { class: "truncate" }, "Total Bonus")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$p), null, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-xl sm:text-2xl font-bold text-primary truncate" }, toDisplayString(formatCurrency(grandTotal.value)), 1),
                  createVNode("p", { class: "text-[10px] sm:text-xs text-muted-foreground mt-1" }, " Semua jenis bonus ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(unref(_sfc_main$o), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$v), { class: "p-2 sm:p-4 md:p-6 pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$w), { class: "text-xs sm:text-base md:text-lg" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Riwayat Bonus`);
                      } else {
                        return [
                          createTextVNode("Riwayat Bonus")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$N), { class: "text-[9px] sm:text-xs md:text-sm" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Detail transaksi bonus `);
                      } else {
                        return [
                          createTextVNode(" Detail transaksi bonus ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$w), { class: "text-xs sm:text-base md:text-lg" }, {
                      default: withCtx(() => [
                        createTextVNode("Riwayat Bonus")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$N), { class: "text-[9px] sm:text-xs md:text-sm" }, {
                      default: withCtx(() => [
                        createTextVNode(" Detail transaksi bonus ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$p), { class: "p-2 sm:p-4 md:p-6 pt-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$Y), {
                    "default-value": "sponsor",
                    class: "w-full"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="w-full text-center overflow-x-auto [&amp;::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-2 px-2 sm:mx-0 sm:px-0" style="${ssrRenderStyle({ "-webkit-overflow-scrolling": "touch" })}"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$Z), { class: "flex w-max sm:grid sm:w-full sm:grid-cols-7 gap-0.5 sm:gap-1 h-7 sm:h-auto bg-muted/30" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$_), {
                                value: "sponsor",
                                class: "text-[12px] sm:text-xs md:text-sm whitespace-nowrap px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 h-6 sm:h-auto"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Referral `);
                                  } else {
                                    return [
                                      createTextVNode(" Referral ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$_), {
                                value: "matching",
                                class: "text-[12px] sm:text-xs md:text-sm whitespace-nowrap px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 h-6 sm:h-auto"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Team Aff. `);
                                  } else {
                                    return [
                                      createTextVNode(" Team Aff. ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$_), {
                                value: "pairing",
                                class: "text-[12px] sm:text-xs md:text-sm whitespace-nowrap px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 h-6 sm:h-auto"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Partner `);
                                  } else {
                                    return [
                                      createTextVNode(" Partner ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$_), {
                                value: "cashback",
                                class: "text-[12px] sm:text-xs md:text-sm whitespace-nowrap px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 h-6 sm:h-auto"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Cashback `);
                                  } else {
                                    return [
                                      createTextVNode(" Cashback ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$_), {
                                value: "reward",
                                class: "text-[12px] sm:text-xs md:text-sm whitespace-nowrap px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 h-6 sm:h-auto"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Rewards `);
                                  } else {
                                    return [
                                      createTextVNode(" Rewards ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$_), {
                                value: "retail",
                                class: "text-[12px] sm:text-xs md:text-sm whitespace-nowrap px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 h-6 sm:h-auto"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Retail `);
                                  } else {
                                    return [
                                      createTextVNode(" Retail ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$_), {
                                value: "lifetime",
                                class: "text-[12px] sm:text-xs md:text-sm whitespace-nowrap px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 h-6 sm:h-auto"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Lifetime `);
                                  } else {
                                    return [
                                      createTextVNode(" Lifetime ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$_), {
                                  value: "sponsor",
                                  class: "text-[12px] sm:text-xs md:text-sm whitespace-nowrap px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 h-6 sm:h-auto"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Referral ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$_), {
                                  value: "matching",
                                  class: "text-[12px] sm:text-xs md:text-sm whitespace-nowrap px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 h-6 sm:h-auto"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Team Aff. ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$_), {
                                  value: "pairing",
                                  class: "text-[12px] sm:text-xs md:text-sm whitespace-nowrap px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 h-6 sm:h-auto"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Partner ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$_), {
                                  value: "cashback",
                                  class: "text-[12px] sm:text-xs md:text-sm whitespace-nowrap px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 h-6 sm:h-auto"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Cashback ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$_), {
                                  value: "reward",
                                  class: "text-[12px] sm:text-xs md:text-sm whitespace-nowrap px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 h-6 sm:h-auto"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Rewards ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$_), {
                                  value: "retail",
                                  class: "text-[12px] sm:text-xs md:text-sm whitespace-nowrap px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 h-6 sm:h-auto"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Retail ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$_), {
                                  value: "lifetime",
                                  class: "text-[12px] sm:text-xs md:text-sm whitespace-nowrap px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 h-6 sm:h-auto"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Lifetime ")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$$), {
                          value: "sponsor",
                          class: "mt-2 sm:mt-4"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (__props.bonusSponsors.length === 0) {
                                _push5(`<div class="text-center py-4 sm:py-8 text-muted-foreground text-[10px] sm:text-sm"${_scopeId4}> Belum ada bonus referral incentive </div>`);
                              } else {
                                _push5(`<div class="space-y-1.5 sm:space-y-3"${_scopeId4}><!--[-->`);
                                ssrRenderList(__props.bonusSponsors, (bonus) => {
                                  _push5(`<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-3 p-2 sm:p-3 md:p-4 border rounded-lg hover:bg-muted/50 transition-colors"${_scopeId4}><div class="flex-1 min-w-0"${_scopeId4}><div class="flex flex-wrap items-center gap-1 sm:gap-2"${_scopeId4}>`);
                                  _push5(ssrRenderComponent(unref(_sfc_main$t), {
                                    variant: bonus.status === 1 ? "secondary" : "outline",
                                    class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(bonus.status === 1 ? "R" : "P")}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(bonus.status === 1 ? "R" : "P"), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(`<span class="text-[10px] sm:text-xs md:text-sm font-medium break-words line-clamp-1"${_scopeId4}>${ssrInterpolate(bonus.description || "Bonus Sponsor")}</span></div><p class="text-[8px] sm:text-[10px] md:text-xs text-muted-foreground mt-0.5"${_scopeId4}>`);
                                  if (bonus.from_member) {
                                    _push5(`<span class="block sm:inline"${_scopeId4}> Dari: ${ssrInterpolate(bonus.from_member.name)}</span>`);
                                  } else {
                                    _push5(`<!---->`);
                                  }
                                  _push5(`<span class="block sm:inline sm:ml-1"${_scopeId4}>${ssrInterpolate(formatDate(bonus.created_at))}</span></p></div><div class="text-left sm:text-right flex-shrink-0"${_scopeId4}><div class="text-xs sm:text-base md:text-lg font-bold text-green-600"${_scopeId4}>${ssrInterpolate(formatCurrency(bonus.amount))}</div><div class="${ssrRenderClass(["text-[8px] sm:text-xs", bonus.status === 1 ? "text-green-600" : "text-yellow-600"])}"${_scopeId4}>${ssrInterpolate(bonus.status === 1 ? "Processed" : "Pending")}</div></div></div>`);
                                });
                                _push5(`<!--]--></div>`);
                              }
                            } else {
                              return [
                                __props.bonusSponsors.length === 0 ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "text-center py-4 sm:py-8 text-muted-foreground text-[10px] sm:text-sm"
                                }, " Belum ada bonus referral incentive ")) : (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "space-y-1.5 sm:space-y-3"
                                }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.bonusSponsors, (bonus) => {
                                    return openBlock(), createBlock("div", {
                                      key: bonus.id,
                                      class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-3 p-2 sm:p-3 md:p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                    }, [
                                      createVNode("div", { class: "flex-1 min-w-0" }, [
                                        createVNode("div", { class: "flex flex-wrap items-center gap-1 sm:gap-2" }, [
                                          createVNode(unref(_sfc_main$t), {
                                            variant: bonus.status === 1 ? "secondary" : "outline",
                                            class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(bonus.status === 1 ? "R" : "P"), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["variant"]),
                                          createVNode("span", { class: "text-[10px] sm:text-xs md:text-sm font-medium break-words line-clamp-1" }, toDisplayString(bonus.description || "Bonus Sponsor"), 1)
                                        ]),
                                        createVNode("p", { class: "text-[8px] sm:text-[10px] md:text-xs text-muted-foreground mt-0.5" }, [
                                          bonus.from_member ? (openBlock(), createBlock("span", {
                                            key: 0,
                                            class: "block sm:inline"
                                          }, " Dari: " + toDisplayString(bonus.from_member.name), 1)) : createCommentVNode("", true),
                                          createVNode("span", { class: "block sm:inline sm:ml-1" }, toDisplayString(formatDate(bonus.created_at)), 1)
                                        ])
                                      ]),
                                      createVNode("div", { class: "text-left sm:text-right flex-shrink-0" }, [
                                        createVNode("div", { class: "text-xs sm:text-base md:text-lg font-bold text-green-600" }, toDisplayString(formatCurrency(bonus.amount)), 1),
                                        createVNode("div", {
                                          class: ["text-[8px] sm:text-xs", bonus.status === 1 ? "text-green-600" : "text-yellow-600"]
                                        }, toDisplayString(bonus.status === 1 ? "Processed" : "Pending"), 3)
                                      ])
                                    ]);
                                  }), 128))
                                ]))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$$), {
                          value: "matching",
                          class: "mt-2 sm:mt-4"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (__props.bonusMatchings.length === 0) {
                                _push5(`<div class="text-center py-4 sm:py-8 text-muted-foreground text-[10px] sm:text-sm"${_scopeId4}> Belum ada bonus team affiliate commission </div>`);
                              } else {
                                _push5(`<div class="space-y-1.5 sm:space-y-3"${_scopeId4}><!--[-->`);
                                ssrRenderList(__props.bonusMatchings, (bonus) => {
                                  _push5(`<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-3 p-2 sm:p-3 md:p-4 border rounded-lg hover:bg-muted/50 transition-colors"${_scopeId4}><div class="flex-1 min-w-0"${_scopeId4}><div class="flex flex-wrap items-center gap-1 sm:gap-2"${_scopeId4}>`);
                                  _push5(ssrRenderComponent(unref(_sfc_main$t), {
                                    variant: bonus.status === 1 ? "secondary" : "outline",
                                    class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(bonus.status === 1 ? "R" : "P")}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(bonus.status === 1 ? "R" : "P"), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(unref(_sfc_main$t), {
                                    variant: "outline",
                                    class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(` L${ssrInterpolate(bonus.level)}`);
                                      } else {
                                        return [
                                          createTextVNode(" L" + toDisplayString(bonus.level), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(`<span class="text-[10px] sm:text-xs md:text-sm font-medium break-words line-clamp-1"${_scopeId4}>${ssrInterpolate(bonus.description || "Bonus Matching")}</span></div><p class="text-[8px] sm:text-[10px] md:text-xs text-muted-foreground mt-0.5"${_scopeId4}>`);
                                  if (bonus.from_member) {
                                    _push5(`<span class="block sm:inline"${_scopeId4}> Dari: ${ssrInterpolate(bonus.from_member.name)}</span>`);
                                  } else {
                                    _push5(`<!---->`);
                                  }
                                  _push5(`<span class="block sm:inline sm:ml-2"${_scopeId4}>${ssrInterpolate(formatDate(bonus.created_at))}</span></p></div><div class="text-left sm:text-right flex-shrink-0"${_scopeId4}><div class="text-xs sm:text-base md:text-lg font-bold text-green-600"${_scopeId4}>${ssrInterpolate(formatCurrency(bonus.amount))}</div><div class="${ssrRenderClass(["text-[8px] sm:text-xs", bonus.status === 1 ? "text-green-600" : "text-yellow-600"])}"${_scopeId4}>${ssrInterpolate(bonus.status === 1 ? "Processed" : "Pending")}</div></div></div>`);
                                });
                                _push5(`<!--]--></div>`);
                              }
                            } else {
                              return [
                                __props.bonusMatchings.length === 0 ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "text-center py-4 sm:py-8 text-muted-foreground text-[10px] sm:text-sm"
                                }, " Belum ada bonus team affiliate commission ")) : (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "space-y-1.5 sm:space-y-3"
                                }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.bonusMatchings, (bonus) => {
                                    return openBlock(), createBlock("div", {
                                      key: bonus.id,
                                      class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-3 p-2 sm:p-3 md:p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                    }, [
                                      createVNode("div", { class: "flex-1 min-w-0" }, [
                                        createVNode("div", { class: "flex flex-wrap items-center gap-1 sm:gap-2" }, [
                                          createVNode(unref(_sfc_main$t), {
                                            variant: bonus.status === 1 ? "secondary" : "outline",
                                            class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(bonus.status === 1 ? "R" : "P"), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["variant"]),
                                          createVNode(unref(_sfc_main$t), {
                                            variant: "outline",
                                            class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(" L" + toDisplayString(bonus.level), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode("span", { class: "text-[10px] sm:text-xs md:text-sm font-medium break-words line-clamp-1" }, toDisplayString(bonus.description || "Bonus Matching"), 1)
                                        ]),
                                        createVNode("p", { class: "text-[8px] sm:text-[10px] md:text-xs text-muted-foreground mt-0.5" }, [
                                          bonus.from_member ? (openBlock(), createBlock("span", {
                                            key: 0,
                                            class: "block sm:inline"
                                          }, " Dari: " + toDisplayString(bonus.from_member.name), 1)) : createCommentVNode("", true),
                                          createVNode("span", { class: "block sm:inline sm:ml-2" }, toDisplayString(formatDate(bonus.created_at)), 1)
                                        ])
                                      ]),
                                      createVNode("div", { class: "text-left sm:text-right flex-shrink-0" }, [
                                        createVNode("div", { class: "text-xs sm:text-base md:text-lg font-bold text-green-600" }, toDisplayString(formatCurrency(bonus.amount)), 1),
                                        createVNode("div", {
                                          class: ["text-[8px] sm:text-xs", bonus.status === 1 ? "text-green-600" : "text-yellow-600"]
                                        }, toDisplayString(bonus.status === 1 ? "Processed" : "Pending"), 3)
                                      ])
                                    ]);
                                  }), 128))
                                ]))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$$), {
                          value: "pairing",
                          class: "mt-2 sm:mt-4"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (__props.bonusPairings.length === 0) {
                                _push5(`<div class="text-center py-4 sm:py-8 text-muted-foreground text-[10px] sm:text-sm"${_scopeId4}> Belum ada bonus partner team commission </div>`);
                              } else {
                                _push5(`<div class="space-y-3"${_scopeId4}><!--[-->`);
                                ssrRenderList(__props.bonusPairings, (bonus) => {
                                  _push5(`<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 border rounded-lg hover:bg-muted/50 transition-colors"${_scopeId4}><div class="flex-1 min-w-0"${_scopeId4}><div class="flex flex-wrap items-center gap-2"${_scopeId4}>`);
                                  _push5(ssrRenderComponent(unref(_sfc_main$t), {
                                    variant: bonus.status === 1 ? "secondary" : "outline",
                                    class: "text-xs"
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(bonus.status === 1 ? "Released" : "Pending")}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(bonus.status === 1 ? "Released" : "Pending"), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(unref(_sfc_main$t), {
                                    variant: "outline",
                                    class: "text-xs"
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(bonus.pair)} Pairs `);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(bonus.pair) + " Pairs ", 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(`<span class="text-xs sm:text-sm font-medium break-words"${_scopeId4}>${ssrInterpolate(bonus.description || "Bonus Pairing")}</span></div><p class="text-[10px] sm:text-xs text-muted-foreground mt-1"${_scopeId4}>${ssrInterpolate(formatDate(bonus.created_at))}</p></div><div class="text-left sm:text-right flex-shrink-0"${_scopeId4}><div class="text-base sm:text-lg font-bold text-green-600"${_scopeId4}>${ssrInterpolate(formatCurrency(bonus.amount))}</div><div class="${ssrRenderClass(["text-[8px] sm:text-xs", bonus.status === 1 ? "text-green-600" : "text-yellow-600"])}"${_scopeId4}>${ssrInterpolate(bonus.status === 1 ? "Processed" : "Pending")}</div></div></div>`);
                                });
                                _push5(`<!--]--></div>`);
                              }
                            } else {
                              return [
                                __props.bonusPairings.length === 0 ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "text-center py-4 sm:py-8 text-muted-foreground text-[10px] sm:text-sm"
                                }, " Belum ada bonus partner team commission ")) : (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "space-y-3"
                                }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.bonusPairings, (bonus) => {
                                    return openBlock(), createBlock("div", {
                                      key: bonus.id,
                                      class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                    }, [
                                      createVNode("div", { class: "flex-1 min-w-0" }, [
                                        createVNode("div", { class: "flex flex-wrap items-center gap-2" }, [
                                          createVNode(unref(_sfc_main$t), {
                                            variant: bonus.status === 1 ? "secondary" : "outline",
                                            class: "text-xs"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(bonus.status === 1 ? "Released" : "Pending"), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["variant"]),
                                          createVNode(unref(_sfc_main$t), {
                                            variant: "outline",
                                            class: "text-xs"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(bonus.pair) + " Pairs ", 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode("span", { class: "text-xs sm:text-sm font-medium break-words" }, toDisplayString(bonus.description || "Bonus Pairing"), 1)
                                        ]),
                                        createVNode("p", { class: "text-[10px] sm:text-xs text-muted-foreground mt-1" }, toDisplayString(formatDate(bonus.created_at)), 1)
                                      ]),
                                      createVNode("div", { class: "text-left sm:text-right flex-shrink-0" }, [
                                        createVNode("div", { class: "text-base sm:text-lg font-bold text-green-600" }, toDisplayString(formatCurrency(bonus.amount)), 1),
                                        createVNode("div", {
                                          class: ["text-[8px] sm:text-xs", bonus.status === 1 ? "text-green-600" : "text-yellow-600"]
                                        }, toDisplayString(bonus.status === 1 ? "Processed" : "Pending"), 3)
                                      ])
                                    ]);
                                  }), 128))
                                ]))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$$), {
                          value: "cashback",
                          class: "mt-2 sm:mt-4"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (__props.bonusCashbacks.length === 0) {
                                _push5(`<div class="text-center py-4 sm:py-8 text-muted-foreground text-[10px] sm:text-sm"${_scopeId4}> Belum ada bonus cashback commission </div>`);
                              } else {
                                _push5(`<div class="space-y-1.5 sm:space-y-3"${_scopeId4}><!--[-->`);
                                ssrRenderList(__props.bonusCashbacks, (bonus) => {
                                  _push5(`<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-3 p-2 sm:p-3 md:p-4 border rounded-lg hover:bg-muted/50 transition-colors"${_scopeId4}><div class="flex-1 min-w-0"${_scopeId4}><div class="flex flex-wrap items-center gap-1 sm:gap-2"${_scopeId4}>`);
                                  _push5(ssrRenderComponent(unref(_sfc_main$t), {
                                    variant: bonus.status === 1 ? "secondary" : "outline",
                                    class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(bonus.status === 1 ? "R" : "P")}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(bonus.status === 1 ? "R" : "P"), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(`<span class="text-[10px] sm:text-xs md:text-sm font-medium break-words line-clamp-1"${_scopeId4}>${ssrInterpolate(bonus.description || "Bonus Cashback")}</span></div><p class="text-[8px] sm:text-[10px] md:text-xs text-muted-foreground mt-0.5"${_scopeId4}>eground mt-0.5&quot;&gt; `);
                                  if (bonus.order_id) {
                                    _push5(`<span class="block sm:inline"${_scopeId4}> #${ssrInterpolate(bonus.order_id)}</span>`);
                                  } else {
                                    _push5(`<!---->`);
                                  }
                                  _push5(`<span class="block sm:inline sm:ml-1"${_scopeId4}>${ssrInterpolate(formatDate(bonus.created_at))}</span></p></div><div class="text-left sm:text-right flex-shrink-0"${_scopeId4}><div class="text-xs sm:text-base md:text-lg font-bold text-green-600"${_scopeId4}>${ssrInterpolate(formatCurrency(bonus.amount))}</div><div class="${ssrRenderClass(["text-[8px] sm:text-xs", bonus.status === 1 ? "text-green-600" : "text-yellow-600"])}"${_scopeId4}>${ssrInterpolate(bonus.status === 1 ? "Processed" : "Pending")}</div></div></div>`);
                                });
                                _push5(`<!--]--></div>`);
                              }
                            } else {
                              return [
                                __props.bonusCashbacks.length === 0 ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "text-center py-4 sm:py-8 text-muted-foreground text-[10px] sm:text-sm"
                                }, " Belum ada bonus cashback commission ")) : (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "space-y-1.5 sm:space-y-3"
                                }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.bonusCashbacks, (bonus) => {
                                    return openBlock(), createBlock("div", {
                                      key: bonus.id,
                                      class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-3 p-2 sm:p-3 md:p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                    }, [
                                      createVNode("div", { class: "flex-1 min-w-0" }, [
                                        createVNode("div", { class: "flex flex-wrap items-center gap-1 sm:gap-2" }, [
                                          createVNode(unref(_sfc_main$t), {
                                            variant: bonus.status === 1 ? "secondary" : "outline",
                                            class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(bonus.status === 1 ? "R" : "P"), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["variant"]),
                                          createVNode("span", { class: "text-[10px] sm:text-xs md:text-sm font-medium break-words line-clamp-1" }, toDisplayString(bonus.description || "Bonus Cashback"), 1)
                                        ]),
                                        createVNode("p", { class: "text-[8px] sm:text-[10px] md:text-xs text-muted-foreground mt-0.5" }, [
                                          createTextVNode('eground mt-0.5"> '),
                                          bonus.order_id ? (openBlock(), createBlock("span", {
                                            key: 0,
                                            class: "block sm:inline"
                                          }, " #" + toDisplayString(bonus.order_id), 1)) : createCommentVNode("", true),
                                          createVNode("span", { class: "block sm:inline sm:ml-1" }, toDisplayString(formatDate(bonus.created_at)), 1)
                                        ])
                                      ]),
                                      createVNode("div", { class: "text-left sm:text-right flex-shrink-0" }, [
                                        createVNode("div", { class: "text-xs sm:text-base md:text-lg font-bold text-green-600" }, toDisplayString(formatCurrency(bonus.amount)), 1),
                                        createVNode("div", {
                                          class: ["text-[8px] sm:text-xs", bonus.status === 1 ? "text-green-600" : "text-yellow-600"]
                                        }, toDisplayString(bonus.status === 1 ? "Processed" : "Pending"), 3)
                                      ])
                                    ]);
                                  }), 128))
                                ]))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$$), {
                          value: "reward",
                          class: "mt-2 sm:mt-4"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (__props.bonusRewards.length === 0) {
                                _push5(`<div class="text-center py-4 sm:py-8 text-muted-foreground text-[10px] sm:text-sm"${_scopeId4}> Belum ada promotions rewards </div>`);
                              } else {
                                _push5(`<div class="space-y-1.5 sm:space-y-3"${_scopeId4}><!--[-->`);
                                ssrRenderList(__props.bonusRewards, (bonus) => {
                                  _push5(`<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-3 p-2 sm:p-3 md:p-4 border rounded-lg hover:bg-muted/50 transition-colors"${_scopeId4}><div class="flex-1 min-w-0"${_scopeId4}><div class="flex flex-wrap items-center gap-1 sm:gap-2"${_scopeId4}>`);
                                  _push5(ssrRenderComponent(unref(_sfc_main$t), {
                                    variant: bonus.status === 1 ? "secondary" : "outline",
                                    class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(bonus.status === 1 ? "R" : "P")}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(bonus.status === 1 ? "R" : "P"), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  if (bonus.reward_type) {
                                    _push5(ssrRenderComponent(unref(_sfc_main$t), {
                                      variant: "outline",
                                      class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                    }, {
                                      default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(`${ssrInterpolate(bonus.reward_type)}`);
                                        } else {
                                          return [
                                            createTextVNode(toDisplayString(bonus.reward_type), 1)
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                  } else {
                                    _push5(`<!---->`);
                                  }
                                  _push5(`<span class="text-[10px] sm:text-xs md:text-sm font-medium break-words line-clamp-1"${_scopeId4}>${ssrInterpolate(bonus.description || "Promotions Reward")}</span></div><p class="text-[8px] sm:text-[10px] md:text-xs text-muted-foreground mt-0.5"${_scopeId4}>${ssrInterpolate(formatDate(bonus.created_at))}</p></div><div class="text-left sm:text-right flex-shrink-0"${_scopeId4}><div class="text-xs sm:text-base md:text-lg font-bold text-green-600"${_scopeId4}>${ssrInterpolate(formatCurrency(bonus.amount))}</div><div class="${ssrRenderClass(["text-[8px] sm:text-xs", bonus.status === 1 ? "text-green-600" : "text-yellow-600"])}"${_scopeId4}>${ssrInterpolate(bonus.status === 1 ? "Processed" : "Pending")}</div></div></div>`);
                                });
                                _push5(`<!--]--></div>`);
                              }
                            } else {
                              return [
                                __props.bonusRewards.length === 0 ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "text-center py-4 sm:py-8 text-muted-foreground text-[10px] sm:text-sm"
                                }, " Belum ada promotions rewards ")) : (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "space-y-1.5 sm:space-y-3"
                                }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.bonusRewards, (bonus) => {
                                    return openBlock(), createBlock("div", {
                                      key: bonus.id,
                                      class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-3 p-2 sm:p-3 md:p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                    }, [
                                      createVNode("div", { class: "flex-1 min-w-0" }, [
                                        createVNode("div", { class: "flex flex-wrap items-center gap-1 sm:gap-2" }, [
                                          createVNode(unref(_sfc_main$t), {
                                            variant: bonus.status === 1 ? "secondary" : "outline",
                                            class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(bonus.status === 1 ? "R" : "P"), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["variant"]),
                                          bonus.reward_type ? (openBlock(), createBlock(unref(_sfc_main$t), {
                                            key: 0,
                                            variant: "outline",
                                            class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(bonus.reward_type), 1)
                                            ]),
                                            _: 2
                                          }, 1024)) : createCommentVNode("", true),
                                          createVNode("span", { class: "text-[10px] sm:text-xs md:text-sm font-medium break-words line-clamp-1" }, toDisplayString(bonus.description || "Promotions Reward"), 1)
                                        ]),
                                        createVNode("p", { class: "text-[8px] sm:text-[10px] md:text-xs text-muted-foreground mt-0.5" }, toDisplayString(formatDate(bonus.created_at)), 1)
                                      ]),
                                      createVNode("div", { class: "text-left sm:text-right flex-shrink-0" }, [
                                        createVNode("div", { class: "text-xs sm:text-base md:text-lg font-bold text-green-600" }, toDisplayString(formatCurrency(bonus.amount)), 1),
                                        createVNode("div", {
                                          class: ["text-[8px] sm:text-xs", bonus.status === 1 ? "text-green-600" : "text-yellow-600"]
                                        }, toDisplayString(bonus.status === 1 ? "Processed" : "Pending"), 3)
                                      ])
                                    ]);
                                  }), 128))
                                ]))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$$), {
                          value: "retail",
                          class: "mt-2 sm:mt-4"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (__props.bonusRetails.length === 0) {
                                _push5(`<div class="text-center py-4 sm:py-8 text-muted-foreground text-[10px] sm:text-sm"${_scopeId4}> Belum ada bonus retail commission </div>`);
                              } else {
                                _push5(`<div class="space-y-1.5 sm:space-y-3"${_scopeId4}><!--[-->`);
                                ssrRenderList(__props.bonusRetails, (bonus) => {
                                  _push5(`<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-3 p-2 sm:p-3 md:p-4 border rounded-lg hover:bg-muted/50 transition-colors"${_scopeId4}><div class="flex-1 min-w-0"${_scopeId4}><div class="flex flex-wrap items-center gap-1 sm:gap-2"${_scopeId4}>`);
                                  _push5(ssrRenderComponent(unref(_sfc_main$t), {
                                    variant: bonus.status === 1 ? "secondary" : "outline",
                                    class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(bonus.status === 1 ? "R" : "P")}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(bonus.status === 1 ? "R" : "P"), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  if (bonus.index_value) {
                                    _push5(ssrRenderComponent(unref(_sfc_main$t), {
                                      variant: "outline",
                                      class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                    }, {
                                      default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(` IDX: ${ssrInterpolate(bonus.index_value)}`);
                                        } else {
                                          return [
                                            createTextVNode(" IDX: " + toDisplayString(bonus.index_value), 1)
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                  } else {
                                    _push5(`<!---->`);
                                  }
                                  _push5(`<span class="text-[10px] sm:text-xs md:text-sm font-medium break-words line-clamp-1"${_scopeId4}>${ssrInterpolate(bonus.description || "Retail Commission")}</span></div><p class="text-[8px] sm:text-[10px] md:text-xs text-muted-foreground mt-0.5"${_scopeId4}>`);
                                  if (bonus.from_member) {
                                    _push5(`<span class="block sm:inline"${_scopeId4}> Dari: ${ssrInterpolate(bonus.from_member.name)}</span>`);
                                  } else {
                                    _push5(`<!---->`);
                                  }
                                  _push5(`<span class="block sm:inline sm:ml-1"${_scopeId4}>${ssrInterpolate(formatDate(bonus.created_at))}</span></p></div><div class="text-left sm:text-right flex-shrink-0"${_scopeId4}><div class="text-xs sm:text-base md:text-lg font-bold text-green-600"${_scopeId4}>${ssrInterpolate(formatCurrency(bonus.amount))}</div><div class="${ssrRenderClass(["text-[8px] sm:text-xs", bonus.status === 1 ? "text-green-600" : "text-yellow-600"])}"${_scopeId4}>${ssrInterpolate(bonus.status === 1 ? "Processed" : "Pending")}</div></div></div>`);
                                });
                                _push5(`<!--]--></div>`);
                              }
                            } else {
                              return [
                                __props.bonusRetails.length === 0 ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "text-center py-4 sm:py-8 text-muted-foreground text-[10px] sm:text-sm"
                                }, " Belum ada bonus retail commission ")) : (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "space-y-1.5 sm:space-y-3"
                                }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.bonusRetails, (bonus) => {
                                    return openBlock(), createBlock("div", {
                                      key: bonus.id,
                                      class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-3 p-2 sm:p-3 md:p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                    }, [
                                      createVNode("div", { class: "flex-1 min-w-0" }, [
                                        createVNode("div", { class: "flex flex-wrap items-center gap-1 sm:gap-2" }, [
                                          createVNode(unref(_sfc_main$t), {
                                            variant: bonus.status === 1 ? "secondary" : "outline",
                                            class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(bonus.status === 1 ? "R" : "P"), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["variant"]),
                                          bonus.index_value ? (openBlock(), createBlock(unref(_sfc_main$t), {
                                            key: 0,
                                            variant: "outline",
                                            class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(" IDX: " + toDisplayString(bonus.index_value), 1)
                                            ]),
                                            _: 2
                                          }, 1024)) : createCommentVNode("", true),
                                          createVNode("span", { class: "text-[10px] sm:text-xs md:text-sm font-medium break-words line-clamp-1" }, toDisplayString(bonus.description || "Retail Commission"), 1)
                                        ]),
                                        createVNode("p", { class: "text-[8px] sm:text-[10px] md:text-xs text-muted-foreground mt-0.5" }, [
                                          bonus.from_member ? (openBlock(), createBlock("span", {
                                            key: 0,
                                            class: "block sm:inline"
                                          }, " Dari: " + toDisplayString(bonus.from_member.name), 1)) : createCommentVNode("", true),
                                          createVNode("span", { class: "block sm:inline sm:ml-1" }, toDisplayString(formatDate(bonus.created_at)), 1)
                                        ])
                                      ]),
                                      createVNode("div", { class: "text-left sm:text-right flex-shrink-0" }, [
                                        createVNode("div", { class: "text-xs sm:text-base md:text-lg font-bold text-green-600" }, toDisplayString(formatCurrency(bonus.amount)), 1),
                                        createVNode("div", {
                                          class: ["text-[8px] sm:text-xs", bonus.status === 1 ? "text-green-600" : "text-yellow-600"]
                                        }, toDisplayString(bonus.status === 1 ? "Processed" : "Pending"), 3)
                                      ])
                                    ]);
                                  }), 128))
                                ]))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$$), {
                          value: "lifetime",
                          class: "mt-2 sm:mt-4"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (__props.bonusLifetimeCashRewards.length === 0) {
                                _push5(`<div class="text-center py-4 sm:py-8 text-muted-foreground text-[10px] sm:text-sm"${_scopeId4}> Belum ada lifetime cash rewards </div>`);
                              } else {
                                _push5(`<div class="space-y-1.5 sm:space-y-3"${_scopeId4}><!--[-->`);
                                ssrRenderList(__props.bonusLifetimeCashRewards, (bonus) => {
                                  _push5(`<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-3 p-2 sm:p-3 md:p-4 border rounded-lg hover:bg-muted/50 transition-colors"${_scopeId4}><div class="flex-1 min-w-0"${_scopeId4}><div class="flex flex-wrap items-center gap-1 sm:gap-2"${_scopeId4}>`);
                                  _push5(ssrRenderComponent(unref(_sfc_main$t), {
                                    variant: bonus.status === 1 ? "secondary" : "outline",
                                    class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(bonus.status === 1 ? "R" : "P")}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(bonus.status === 1 ? "R" : "P"), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(unref(_sfc_main$t), {
                                    variant: "outline",
                                    class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(bonus.reward_name)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(bonus.reward_name), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(`<span class="text-[10px] sm:text-xs md:text-sm font-medium break-words line-clamp-1"${_scopeId4}>${ssrInterpolate(bonus.description || "Lifetime Cash Reward")}</span></div><p class="text-[8px] sm:text-[10px] md:text-xs text-muted-foreground mt-0.5"${_scopeId4}><span class="block sm:inline"${_scopeId4}> Reward: ${ssrInterpolate(formatCurrency(bonus.reward))} | BV: ${ssrInterpolate(bonus.bv)}</span><span class="block sm:inline sm:ml-1"${_scopeId4}>${ssrInterpolate(formatDate(bonus.created_at))}</span></p></div><div class="text-left sm:text-right flex-shrink-0"${_scopeId4}><div class="text-xs sm:text-base md:text-lg font-bold text-green-600"${_scopeId4}>${ssrInterpolate(formatCurrency(bonus.amount))}</div><div class="${ssrRenderClass(["text-[8px] sm:text-xs", bonus.status === 1 ? "text-green-600" : "text-yellow-600"])}"${_scopeId4}>${ssrInterpolate(bonus.status === 1 ? "Processed" : "Pending")}</div></div></div>`);
                                });
                                _push5(`<!--]--></div>`);
                              }
                            } else {
                              return [
                                __props.bonusLifetimeCashRewards.length === 0 ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "text-center py-4 sm:py-8 text-muted-foreground text-[10px] sm:text-sm"
                                }, " Belum ada lifetime cash rewards ")) : (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "space-y-1.5 sm:space-y-3"
                                }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.bonusLifetimeCashRewards, (bonus) => {
                                    return openBlock(), createBlock("div", {
                                      key: bonus.id,
                                      class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-3 p-2 sm:p-3 md:p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                    }, [
                                      createVNode("div", { class: "flex-1 min-w-0" }, [
                                        createVNode("div", { class: "flex flex-wrap items-center gap-1 sm:gap-2" }, [
                                          createVNode(unref(_sfc_main$t), {
                                            variant: bonus.status === 1 ? "secondary" : "outline",
                                            class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(bonus.status === 1 ? "R" : "P"), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["variant"]),
                                          createVNode(unref(_sfc_main$t), {
                                            variant: "outline",
                                            class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(bonus.reward_name), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode("span", { class: "text-[10px] sm:text-xs md:text-sm font-medium break-words line-clamp-1" }, toDisplayString(bonus.description || "Lifetime Cash Reward"), 1)
                                        ]),
                                        createVNode("p", { class: "text-[8px] sm:text-[10px] md:text-xs text-muted-foreground mt-0.5" }, [
                                          createVNode("span", { class: "block sm:inline" }, " Reward: " + toDisplayString(formatCurrency(bonus.reward)) + " | BV: " + toDisplayString(bonus.bv), 1),
                                          createVNode("span", { class: "block sm:inline sm:ml-1" }, toDisplayString(formatDate(bonus.created_at)), 1)
                                        ])
                                      ]),
                                      createVNode("div", { class: "text-left sm:text-right flex-shrink-0" }, [
                                        createVNode("div", { class: "text-xs sm:text-base md:text-lg font-bold text-green-600" }, toDisplayString(formatCurrency(bonus.amount)), 1),
                                        createVNode("div", {
                                          class: ["text-[8px] sm:text-xs", bonus.status === 1 ? "text-green-600" : "text-yellow-600"]
                                        }, toDisplayString(bonus.status === 1 ? "Processed" : "Pending"), 3)
                                      ])
                                    ]);
                                  }), 128))
                                ]))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode("div", {
                            class: "w-full text-center overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-2 px-2 sm:mx-0 sm:px-0",
                            style: { "-webkit-overflow-scrolling": "touch" }
                          }, [
                            createVNode(unref(_sfc_main$Z), { class: "flex w-max sm:grid sm:w-full sm:grid-cols-7 gap-0.5 sm:gap-1 h-7 sm:h-auto bg-muted/30" }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$_), {
                                  value: "sponsor",
                                  class: "text-[12px] sm:text-xs md:text-sm whitespace-nowrap px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 h-6 sm:h-auto"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Referral ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$_), {
                                  value: "matching",
                                  class: "text-[12px] sm:text-xs md:text-sm whitespace-nowrap px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 h-6 sm:h-auto"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Team Aff. ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$_), {
                                  value: "pairing",
                                  class: "text-[12px] sm:text-xs md:text-sm whitespace-nowrap px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 h-6 sm:h-auto"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Partner ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$_), {
                                  value: "cashback",
                                  class: "text-[12px] sm:text-xs md:text-sm whitespace-nowrap px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 h-6 sm:h-auto"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Cashback ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$_), {
                                  value: "reward",
                                  class: "text-[12px] sm:text-xs md:text-sm whitespace-nowrap px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 h-6 sm:h-auto"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Rewards ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$_), {
                                  value: "retail",
                                  class: "text-[12px] sm:text-xs md:text-sm whitespace-nowrap px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 h-6 sm:h-auto"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Retail ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$_), {
                                  value: "lifetime",
                                  class: "text-[12px] sm:text-xs md:text-sm whitespace-nowrap px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 h-6 sm:h-auto"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Lifetime ")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode(unref(_sfc_main$$), {
                            value: "sponsor",
                            class: "mt-2 sm:mt-4"
                          }, {
                            default: withCtx(() => [
                              __props.bonusSponsors.length === 0 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "text-center py-4 sm:py-8 text-muted-foreground text-[10px] sm:text-sm"
                              }, " Belum ada bonus referral incentive ")) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "space-y-1.5 sm:space-y-3"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.bonusSponsors, (bonus) => {
                                  return openBlock(), createBlock("div", {
                                    key: bonus.id,
                                    class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-3 p-2 sm:p-3 md:p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                  }, [
                                    createVNode("div", { class: "flex-1 min-w-0" }, [
                                      createVNode("div", { class: "flex flex-wrap items-center gap-1 sm:gap-2" }, [
                                        createVNode(unref(_sfc_main$t), {
                                          variant: bonus.status === 1 ? "secondary" : "outline",
                                          class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(bonus.status === 1 ? "R" : "P"), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["variant"]),
                                        createVNode("span", { class: "text-[10px] sm:text-xs md:text-sm font-medium break-words line-clamp-1" }, toDisplayString(bonus.description || "Bonus Sponsor"), 1)
                                      ]),
                                      createVNode("p", { class: "text-[8px] sm:text-[10px] md:text-xs text-muted-foreground mt-0.5" }, [
                                        bonus.from_member ? (openBlock(), createBlock("span", {
                                          key: 0,
                                          class: "block sm:inline"
                                        }, " Dari: " + toDisplayString(bonus.from_member.name), 1)) : createCommentVNode("", true),
                                        createVNode("span", { class: "block sm:inline sm:ml-1" }, toDisplayString(formatDate(bonus.created_at)), 1)
                                      ])
                                    ]),
                                    createVNode("div", { class: "text-left sm:text-right flex-shrink-0" }, [
                                      createVNode("div", { class: "text-xs sm:text-base md:text-lg font-bold text-green-600" }, toDisplayString(formatCurrency(bonus.amount)), 1),
                                      createVNode("div", {
                                        class: ["text-[8px] sm:text-xs", bonus.status === 1 ? "text-green-600" : "text-yellow-600"]
                                      }, toDisplayString(bonus.status === 1 ? "Processed" : "Pending"), 3)
                                    ])
                                  ]);
                                }), 128))
                              ]))
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$$), {
                            value: "matching",
                            class: "mt-2 sm:mt-4"
                          }, {
                            default: withCtx(() => [
                              __props.bonusMatchings.length === 0 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "text-center py-4 sm:py-8 text-muted-foreground text-[10px] sm:text-sm"
                              }, " Belum ada bonus team affiliate commission ")) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "space-y-1.5 sm:space-y-3"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.bonusMatchings, (bonus) => {
                                  return openBlock(), createBlock("div", {
                                    key: bonus.id,
                                    class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-3 p-2 sm:p-3 md:p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                  }, [
                                    createVNode("div", { class: "flex-1 min-w-0" }, [
                                      createVNode("div", { class: "flex flex-wrap items-center gap-1 sm:gap-2" }, [
                                        createVNode(unref(_sfc_main$t), {
                                          variant: bonus.status === 1 ? "secondary" : "outline",
                                          class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(bonus.status === 1 ? "R" : "P"), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["variant"]),
                                        createVNode(unref(_sfc_main$t), {
                                          variant: "outline",
                                          class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" L" + toDisplayString(bonus.level), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode("span", { class: "text-[10px] sm:text-xs md:text-sm font-medium break-words line-clamp-1" }, toDisplayString(bonus.description || "Bonus Matching"), 1)
                                      ]),
                                      createVNode("p", { class: "text-[8px] sm:text-[10px] md:text-xs text-muted-foreground mt-0.5" }, [
                                        bonus.from_member ? (openBlock(), createBlock("span", {
                                          key: 0,
                                          class: "block sm:inline"
                                        }, " Dari: " + toDisplayString(bonus.from_member.name), 1)) : createCommentVNode("", true),
                                        createVNode("span", { class: "block sm:inline sm:ml-2" }, toDisplayString(formatDate(bonus.created_at)), 1)
                                      ])
                                    ]),
                                    createVNode("div", { class: "text-left sm:text-right flex-shrink-0" }, [
                                      createVNode("div", { class: "text-xs sm:text-base md:text-lg font-bold text-green-600" }, toDisplayString(formatCurrency(bonus.amount)), 1),
                                      createVNode("div", {
                                        class: ["text-[8px] sm:text-xs", bonus.status === 1 ? "text-green-600" : "text-yellow-600"]
                                      }, toDisplayString(bonus.status === 1 ? "Processed" : "Pending"), 3)
                                    ])
                                  ]);
                                }), 128))
                              ]))
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$$), {
                            value: "pairing",
                            class: "mt-2 sm:mt-4"
                          }, {
                            default: withCtx(() => [
                              __props.bonusPairings.length === 0 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "text-center py-4 sm:py-8 text-muted-foreground text-[10px] sm:text-sm"
                              }, " Belum ada bonus partner team commission ")) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "space-y-3"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.bonusPairings, (bonus) => {
                                  return openBlock(), createBlock("div", {
                                    key: bonus.id,
                                    class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                  }, [
                                    createVNode("div", { class: "flex-1 min-w-0" }, [
                                      createVNode("div", { class: "flex flex-wrap items-center gap-2" }, [
                                        createVNode(unref(_sfc_main$t), {
                                          variant: bonus.status === 1 ? "secondary" : "outline",
                                          class: "text-xs"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(bonus.status === 1 ? "Released" : "Pending"), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["variant"]),
                                        createVNode(unref(_sfc_main$t), {
                                          variant: "outline",
                                          class: "text-xs"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(bonus.pair) + " Pairs ", 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode("span", { class: "text-xs sm:text-sm font-medium break-words" }, toDisplayString(bonus.description || "Bonus Pairing"), 1)
                                      ]),
                                      createVNode("p", { class: "text-[10px] sm:text-xs text-muted-foreground mt-1" }, toDisplayString(formatDate(bonus.created_at)), 1)
                                    ]),
                                    createVNode("div", { class: "text-left sm:text-right flex-shrink-0" }, [
                                      createVNode("div", { class: "text-base sm:text-lg font-bold text-green-600" }, toDisplayString(formatCurrency(bonus.amount)), 1),
                                      createVNode("div", {
                                        class: ["text-[8px] sm:text-xs", bonus.status === 1 ? "text-green-600" : "text-yellow-600"]
                                      }, toDisplayString(bonus.status === 1 ? "Processed" : "Pending"), 3)
                                    ])
                                  ]);
                                }), 128))
                              ]))
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$$), {
                            value: "cashback",
                            class: "mt-2 sm:mt-4"
                          }, {
                            default: withCtx(() => [
                              __props.bonusCashbacks.length === 0 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "text-center py-4 sm:py-8 text-muted-foreground text-[10px] sm:text-sm"
                              }, " Belum ada bonus cashback commission ")) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "space-y-1.5 sm:space-y-3"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.bonusCashbacks, (bonus) => {
                                  return openBlock(), createBlock("div", {
                                    key: bonus.id,
                                    class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-3 p-2 sm:p-3 md:p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                  }, [
                                    createVNode("div", { class: "flex-1 min-w-0" }, [
                                      createVNode("div", { class: "flex flex-wrap items-center gap-1 sm:gap-2" }, [
                                        createVNode(unref(_sfc_main$t), {
                                          variant: bonus.status === 1 ? "secondary" : "outline",
                                          class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(bonus.status === 1 ? "R" : "P"), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["variant"]),
                                        createVNode("span", { class: "text-[10px] sm:text-xs md:text-sm font-medium break-words line-clamp-1" }, toDisplayString(bonus.description || "Bonus Cashback"), 1)
                                      ]),
                                      createVNode("p", { class: "text-[8px] sm:text-[10px] md:text-xs text-muted-foreground mt-0.5" }, [
                                        createTextVNode('eground mt-0.5"> '),
                                        bonus.order_id ? (openBlock(), createBlock("span", {
                                          key: 0,
                                          class: "block sm:inline"
                                        }, " #" + toDisplayString(bonus.order_id), 1)) : createCommentVNode("", true),
                                        createVNode("span", { class: "block sm:inline sm:ml-1" }, toDisplayString(formatDate(bonus.created_at)), 1)
                                      ])
                                    ]),
                                    createVNode("div", { class: "text-left sm:text-right flex-shrink-0" }, [
                                      createVNode("div", { class: "text-xs sm:text-base md:text-lg font-bold text-green-600" }, toDisplayString(formatCurrency(bonus.amount)), 1),
                                      createVNode("div", {
                                        class: ["text-[8px] sm:text-xs", bonus.status === 1 ? "text-green-600" : "text-yellow-600"]
                                      }, toDisplayString(bonus.status === 1 ? "Processed" : "Pending"), 3)
                                    ])
                                  ]);
                                }), 128))
                              ]))
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$$), {
                            value: "reward",
                            class: "mt-2 sm:mt-4"
                          }, {
                            default: withCtx(() => [
                              __props.bonusRewards.length === 0 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "text-center py-4 sm:py-8 text-muted-foreground text-[10px] sm:text-sm"
                              }, " Belum ada promotions rewards ")) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "space-y-1.5 sm:space-y-3"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.bonusRewards, (bonus) => {
                                  return openBlock(), createBlock("div", {
                                    key: bonus.id,
                                    class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-3 p-2 sm:p-3 md:p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                  }, [
                                    createVNode("div", { class: "flex-1 min-w-0" }, [
                                      createVNode("div", { class: "flex flex-wrap items-center gap-1 sm:gap-2" }, [
                                        createVNode(unref(_sfc_main$t), {
                                          variant: bonus.status === 1 ? "secondary" : "outline",
                                          class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(bonus.status === 1 ? "R" : "P"), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["variant"]),
                                        bonus.reward_type ? (openBlock(), createBlock(unref(_sfc_main$t), {
                                          key: 0,
                                          variant: "outline",
                                          class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(bonus.reward_type), 1)
                                          ]),
                                          _: 2
                                        }, 1024)) : createCommentVNode("", true),
                                        createVNode("span", { class: "text-[10px] sm:text-xs md:text-sm font-medium break-words line-clamp-1" }, toDisplayString(bonus.description || "Promotions Reward"), 1)
                                      ]),
                                      createVNode("p", { class: "text-[8px] sm:text-[10px] md:text-xs text-muted-foreground mt-0.5" }, toDisplayString(formatDate(bonus.created_at)), 1)
                                    ]),
                                    createVNode("div", { class: "text-left sm:text-right flex-shrink-0" }, [
                                      createVNode("div", { class: "text-xs sm:text-base md:text-lg font-bold text-green-600" }, toDisplayString(formatCurrency(bonus.amount)), 1),
                                      createVNode("div", {
                                        class: ["text-[8px] sm:text-xs", bonus.status === 1 ? "text-green-600" : "text-yellow-600"]
                                      }, toDisplayString(bonus.status === 1 ? "Processed" : "Pending"), 3)
                                    ])
                                  ]);
                                }), 128))
                              ]))
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$$), {
                            value: "retail",
                            class: "mt-2 sm:mt-4"
                          }, {
                            default: withCtx(() => [
                              __props.bonusRetails.length === 0 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "text-center py-4 sm:py-8 text-muted-foreground text-[10px] sm:text-sm"
                              }, " Belum ada bonus retail commission ")) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "space-y-1.5 sm:space-y-3"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.bonusRetails, (bonus) => {
                                  return openBlock(), createBlock("div", {
                                    key: bonus.id,
                                    class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-3 p-2 sm:p-3 md:p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                  }, [
                                    createVNode("div", { class: "flex-1 min-w-0" }, [
                                      createVNode("div", { class: "flex flex-wrap items-center gap-1 sm:gap-2" }, [
                                        createVNode(unref(_sfc_main$t), {
                                          variant: bonus.status === 1 ? "secondary" : "outline",
                                          class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(bonus.status === 1 ? "R" : "P"), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["variant"]),
                                        bonus.index_value ? (openBlock(), createBlock(unref(_sfc_main$t), {
                                          key: 0,
                                          variant: "outline",
                                          class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" IDX: " + toDisplayString(bonus.index_value), 1)
                                          ]),
                                          _: 2
                                        }, 1024)) : createCommentVNode("", true),
                                        createVNode("span", { class: "text-[10px] sm:text-xs md:text-sm font-medium break-words line-clamp-1" }, toDisplayString(bonus.description || "Retail Commission"), 1)
                                      ]),
                                      createVNode("p", { class: "text-[8px] sm:text-[10px] md:text-xs text-muted-foreground mt-0.5" }, [
                                        bonus.from_member ? (openBlock(), createBlock("span", {
                                          key: 0,
                                          class: "block sm:inline"
                                        }, " Dari: " + toDisplayString(bonus.from_member.name), 1)) : createCommentVNode("", true),
                                        createVNode("span", { class: "block sm:inline sm:ml-1" }, toDisplayString(formatDate(bonus.created_at)), 1)
                                      ])
                                    ]),
                                    createVNode("div", { class: "text-left sm:text-right flex-shrink-0" }, [
                                      createVNode("div", { class: "text-xs sm:text-base md:text-lg font-bold text-green-600" }, toDisplayString(formatCurrency(bonus.amount)), 1),
                                      createVNode("div", {
                                        class: ["text-[8px] sm:text-xs", bonus.status === 1 ? "text-green-600" : "text-yellow-600"]
                                      }, toDisplayString(bonus.status === 1 ? "Processed" : "Pending"), 3)
                                    ])
                                  ]);
                                }), 128))
                              ]))
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$$), {
                            value: "lifetime",
                            class: "mt-2 sm:mt-4"
                          }, {
                            default: withCtx(() => [
                              __props.bonusLifetimeCashRewards.length === 0 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "text-center py-4 sm:py-8 text-muted-foreground text-[10px] sm:text-sm"
                              }, " Belum ada lifetime cash rewards ")) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "space-y-1.5 sm:space-y-3"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.bonusLifetimeCashRewards, (bonus) => {
                                  return openBlock(), createBlock("div", {
                                    key: bonus.id,
                                    class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-3 p-2 sm:p-3 md:p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                  }, [
                                    createVNode("div", { class: "flex-1 min-w-0" }, [
                                      createVNode("div", { class: "flex flex-wrap items-center gap-1 sm:gap-2" }, [
                                        createVNode(unref(_sfc_main$t), {
                                          variant: bonus.status === 1 ? "secondary" : "outline",
                                          class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(bonus.status === 1 ? "R" : "P"), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["variant"]),
                                        createVNode(unref(_sfc_main$t), {
                                          variant: "outline",
                                          class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(bonus.reward_name), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode("span", { class: "text-[10px] sm:text-xs md:text-sm font-medium break-words line-clamp-1" }, toDisplayString(bonus.description || "Lifetime Cash Reward"), 1)
                                      ]),
                                      createVNode("p", { class: "text-[8px] sm:text-[10px] md:text-xs text-muted-foreground mt-0.5" }, [
                                        createVNode("span", { class: "block sm:inline" }, " Reward: " + toDisplayString(formatCurrency(bonus.reward)) + " | BV: " + toDisplayString(bonus.bv), 1),
                                        createVNode("span", { class: "block sm:inline sm:ml-1" }, toDisplayString(formatDate(bonus.created_at)), 1)
                                      ])
                                    ]),
                                    createVNode("div", { class: "text-left sm:text-right flex-shrink-0" }, [
                                      createVNode("div", { class: "text-xs sm:text-base md:text-lg font-bold text-green-600" }, toDisplayString(formatCurrency(bonus.amount)), 1),
                                      createVNode("div", {
                                        class: ["text-[8px] sm:text-xs", bonus.status === 1 ? "text-green-600" : "text-yellow-600"]
                                      }, toDisplayString(bonus.status === 1 ? "Processed" : "Pending"), 3)
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$Y), {
                      "default-value": "sponsor",
                      class: "w-full"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", {
                          class: "w-full text-center overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-2 px-2 sm:mx-0 sm:px-0",
                          style: { "-webkit-overflow-scrolling": "touch" }
                        }, [
                          createVNode(unref(_sfc_main$Z), { class: "flex w-max sm:grid sm:w-full sm:grid-cols-7 gap-0.5 sm:gap-1 h-7 sm:h-auto bg-muted/30" }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$_), {
                                value: "sponsor",
                                class: "text-[12px] sm:text-xs md:text-sm whitespace-nowrap px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 h-6 sm:h-auto"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Referral ")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$_), {
                                value: "matching",
                                class: "text-[12px] sm:text-xs md:text-sm whitespace-nowrap px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 h-6 sm:h-auto"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Team Aff. ")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$_), {
                                value: "pairing",
                                class: "text-[12px] sm:text-xs md:text-sm whitespace-nowrap px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 h-6 sm:h-auto"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Partner ")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$_), {
                                value: "cashback",
                                class: "text-[12px] sm:text-xs md:text-sm whitespace-nowrap px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 h-6 sm:h-auto"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Cashback ")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$_), {
                                value: "reward",
                                class: "text-[12px] sm:text-xs md:text-sm whitespace-nowrap px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 h-6 sm:h-auto"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Rewards ")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$_), {
                                value: "retail",
                                class: "text-[12px] sm:text-xs md:text-sm whitespace-nowrap px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 h-6 sm:h-auto"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Retail ")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$_), {
                                value: "lifetime",
                                class: "text-[12px] sm:text-xs md:text-sm whitespace-nowrap px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 h-6 sm:h-auto"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Lifetime ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode(unref(_sfc_main$$), {
                          value: "sponsor",
                          class: "mt-2 sm:mt-4"
                        }, {
                          default: withCtx(() => [
                            __props.bonusSponsors.length === 0 ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "text-center py-4 sm:py-8 text-muted-foreground text-[10px] sm:text-sm"
                            }, " Belum ada bonus referral incentive ")) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "space-y-1.5 sm:space-y-3"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.bonusSponsors, (bonus) => {
                                return openBlock(), createBlock("div", {
                                  key: bonus.id,
                                  class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-3 p-2 sm:p-3 md:p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                }, [
                                  createVNode("div", { class: "flex-1 min-w-0" }, [
                                    createVNode("div", { class: "flex flex-wrap items-center gap-1 sm:gap-2" }, [
                                      createVNode(unref(_sfc_main$t), {
                                        variant: bonus.status === 1 ? "secondary" : "outline",
                                        class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(bonus.status === 1 ? "R" : "P"), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["variant"]),
                                      createVNode("span", { class: "text-[10px] sm:text-xs md:text-sm font-medium break-words line-clamp-1" }, toDisplayString(bonus.description || "Bonus Sponsor"), 1)
                                    ]),
                                    createVNode("p", { class: "text-[8px] sm:text-[10px] md:text-xs text-muted-foreground mt-0.5" }, [
                                      bonus.from_member ? (openBlock(), createBlock("span", {
                                        key: 0,
                                        class: "block sm:inline"
                                      }, " Dari: " + toDisplayString(bonus.from_member.name), 1)) : createCommentVNode("", true),
                                      createVNode("span", { class: "block sm:inline sm:ml-1" }, toDisplayString(formatDate(bonus.created_at)), 1)
                                    ])
                                  ]),
                                  createVNode("div", { class: "text-left sm:text-right flex-shrink-0" }, [
                                    createVNode("div", { class: "text-xs sm:text-base md:text-lg font-bold text-green-600" }, toDisplayString(formatCurrency(bonus.amount)), 1),
                                    createVNode("div", {
                                      class: ["text-[8px] sm:text-xs", bonus.status === 1 ? "text-green-600" : "text-yellow-600"]
                                    }, toDisplayString(bonus.status === 1 ? "Processed" : "Pending"), 3)
                                  ])
                                ]);
                              }), 128))
                            ]))
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$$), {
                          value: "matching",
                          class: "mt-2 sm:mt-4"
                        }, {
                          default: withCtx(() => [
                            __props.bonusMatchings.length === 0 ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "text-center py-4 sm:py-8 text-muted-foreground text-[10px] sm:text-sm"
                            }, " Belum ada bonus team affiliate commission ")) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "space-y-1.5 sm:space-y-3"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.bonusMatchings, (bonus) => {
                                return openBlock(), createBlock("div", {
                                  key: bonus.id,
                                  class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-3 p-2 sm:p-3 md:p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                }, [
                                  createVNode("div", { class: "flex-1 min-w-0" }, [
                                    createVNode("div", { class: "flex flex-wrap items-center gap-1 sm:gap-2" }, [
                                      createVNode(unref(_sfc_main$t), {
                                        variant: bonus.status === 1 ? "secondary" : "outline",
                                        class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(bonus.status === 1 ? "R" : "P"), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["variant"]),
                                      createVNode(unref(_sfc_main$t), {
                                        variant: "outline",
                                        class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" L" + toDisplayString(bonus.level), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode("span", { class: "text-[10px] sm:text-xs md:text-sm font-medium break-words line-clamp-1" }, toDisplayString(bonus.description || "Bonus Matching"), 1)
                                    ]),
                                    createVNode("p", { class: "text-[8px] sm:text-[10px] md:text-xs text-muted-foreground mt-0.5" }, [
                                      bonus.from_member ? (openBlock(), createBlock("span", {
                                        key: 0,
                                        class: "block sm:inline"
                                      }, " Dari: " + toDisplayString(bonus.from_member.name), 1)) : createCommentVNode("", true),
                                      createVNode("span", { class: "block sm:inline sm:ml-2" }, toDisplayString(formatDate(bonus.created_at)), 1)
                                    ])
                                  ]),
                                  createVNode("div", { class: "text-left sm:text-right flex-shrink-0" }, [
                                    createVNode("div", { class: "text-xs sm:text-base md:text-lg font-bold text-green-600" }, toDisplayString(formatCurrency(bonus.amount)), 1),
                                    createVNode("div", {
                                      class: ["text-[8px] sm:text-xs", bonus.status === 1 ? "text-green-600" : "text-yellow-600"]
                                    }, toDisplayString(bonus.status === 1 ? "Processed" : "Pending"), 3)
                                  ])
                                ]);
                              }), 128))
                            ]))
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$$), {
                          value: "pairing",
                          class: "mt-2 sm:mt-4"
                        }, {
                          default: withCtx(() => [
                            __props.bonusPairings.length === 0 ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "text-center py-4 sm:py-8 text-muted-foreground text-[10px] sm:text-sm"
                            }, " Belum ada bonus partner team commission ")) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "space-y-3"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.bonusPairings, (bonus) => {
                                return openBlock(), createBlock("div", {
                                  key: bonus.id,
                                  class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                }, [
                                  createVNode("div", { class: "flex-1 min-w-0" }, [
                                    createVNode("div", { class: "flex flex-wrap items-center gap-2" }, [
                                      createVNode(unref(_sfc_main$t), {
                                        variant: bonus.status === 1 ? "secondary" : "outline",
                                        class: "text-xs"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(bonus.status === 1 ? "Released" : "Pending"), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["variant"]),
                                      createVNode(unref(_sfc_main$t), {
                                        variant: "outline",
                                        class: "text-xs"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(bonus.pair) + " Pairs ", 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode("span", { class: "text-xs sm:text-sm font-medium break-words" }, toDisplayString(bonus.description || "Bonus Pairing"), 1)
                                    ]),
                                    createVNode("p", { class: "text-[10px] sm:text-xs text-muted-foreground mt-1" }, toDisplayString(formatDate(bonus.created_at)), 1)
                                  ]),
                                  createVNode("div", { class: "text-left sm:text-right flex-shrink-0" }, [
                                    createVNode("div", { class: "text-base sm:text-lg font-bold text-green-600" }, toDisplayString(formatCurrency(bonus.amount)), 1),
                                    createVNode("div", {
                                      class: ["text-[8px] sm:text-xs", bonus.status === 1 ? "text-green-600" : "text-yellow-600"]
                                    }, toDisplayString(bonus.status === 1 ? "Processed" : "Pending"), 3)
                                  ])
                                ]);
                              }), 128))
                            ]))
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$$), {
                          value: "cashback",
                          class: "mt-2 sm:mt-4"
                        }, {
                          default: withCtx(() => [
                            __props.bonusCashbacks.length === 0 ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "text-center py-4 sm:py-8 text-muted-foreground text-[10px] sm:text-sm"
                            }, " Belum ada bonus cashback commission ")) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "space-y-1.5 sm:space-y-3"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.bonusCashbacks, (bonus) => {
                                return openBlock(), createBlock("div", {
                                  key: bonus.id,
                                  class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-3 p-2 sm:p-3 md:p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                }, [
                                  createVNode("div", { class: "flex-1 min-w-0" }, [
                                    createVNode("div", { class: "flex flex-wrap items-center gap-1 sm:gap-2" }, [
                                      createVNode(unref(_sfc_main$t), {
                                        variant: bonus.status === 1 ? "secondary" : "outline",
                                        class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(bonus.status === 1 ? "R" : "P"), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["variant"]),
                                      createVNode("span", { class: "text-[10px] sm:text-xs md:text-sm font-medium break-words line-clamp-1" }, toDisplayString(bonus.description || "Bonus Cashback"), 1)
                                    ]),
                                    createVNode("p", { class: "text-[8px] sm:text-[10px] md:text-xs text-muted-foreground mt-0.5" }, [
                                      createTextVNode('eground mt-0.5"> '),
                                      bonus.order_id ? (openBlock(), createBlock("span", {
                                        key: 0,
                                        class: "block sm:inline"
                                      }, " #" + toDisplayString(bonus.order_id), 1)) : createCommentVNode("", true),
                                      createVNode("span", { class: "block sm:inline sm:ml-1" }, toDisplayString(formatDate(bonus.created_at)), 1)
                                    ])
                                  ]),
                                  createVNode("div", { class: "text-left sm:text-right flex-shrink-0" }, [
                                    createVNode("div", { class: "text-xs sm:text-base md:text-lg font-bold text-green-600" }, toDisplayString(formatCurrency(bonus.amount)), 1),
                                    createVNode("div", {
                                      class: ["text-[8px] sm:text-xs", bonus.status === 1 ? "text-green-600" : "text-yellow-600"]
                                    }, toDisplayString(bonus.status === 1 ? "Processed" : "Pending"), 3)
                                  ])
                                ]);
                              }), 128))
                            ]))
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$$), {
                          value: "reward",
                          class: "mt-2 sm:mt-4"
                        }, {
                          default: withCtx(() => [
                            __props.bonusRewards.length === 0 ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "text-center py-4 sm:py-8 text-muted-foreground text-[10px] sm:text-sm"
                            }, " Belum ada promotions rewards ")) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "space-y-1.5 sm:space-y-3"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.bonusRewards, (bonus) => {
                                return openBlock(), createBlock("div", {
                                  key: bonus.id,
                                  class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-3 p-2 sm:p-3 md:p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                }, [
                                  createVNode("div", { class: "flex-1 min-w-0" }, [
                                    createVNode("div", { class: "flex flex-wrap items-center gap-1 sm:gap-2" }, [
                                      createVNode(unref(_sfc_main$t), {
                                        variant: bonus.status === 1 ? "secondary" : "outline",
                                        class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(bonus.status === 1 ? "R" : "P"), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["variant"]),
                                      bonus.reward_type ? (openBlock(), createBlock(unref(_sfc_main$t), {
                                        key: 0,
                                        variant: "outline",
                                        class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(bonus.reward_type), 1)
                                        ]),
                                        _: 2
                                      }, 1024)) : createCommentVNode("", true),
                                      createVNode("span", { class: "text-[10px] sm:text-xs md:text-sm font-medium break-words line-clamp-1" }, toDisplayString(bonus.description || "Promotions Reward"), 1)
                                    ]),
                                    createVNode("p", { class: "text-[8px] sm:text-[10px] md:text-xs text-muted-foreground mt-0.5" }, toDisplayString(formatDate(bonus.created_at)), 1)
                                  ]),
                                  createVNode("div", { class: "text-left sm:text-right flex-shrink-0" }, [
                                    createVNode("div", { class: "text-xs sm:text-base md:text-lg font-bold text-green-600" }, toDisplayString(formatCurrency(bonus.amount)), 1),
                                    createVNode("div", {
                                      class: ["text-[8px] sm:text-xs", bonus.status === 1 ? "text-green-600" : "text-yellow-600"]
                                    }, toDisplayString(bonus.status === 1 ? "Processed" : "Pending"), 3)
                                  ])
                                ]);
                              }), 128))
                            ]))
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$$), {
                          value: "retail",
                          class: "mt-2 sm:mt-4"
                        }, {
                          default: withCtx(() => [
                            __props.bonusRetails.length === 0 ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "text-center py-4 sm:py-8 text-muted-foreground text-[10px] sm:text-sm"
                            }, " Belum ada bonus retail commission ")) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "space-y-1.5 sm:space-y-3"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.bonusRetails, (bonus) => {
                                return openBlock(), createBlock("div", {
                                  key: bonus.id,
                                  class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-3 p-2 sm:p-3 md:p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                }, [
                                  createVNode("div", { class: "flex-1 min-w-0" }, [
                                    createVNode("div", { class: "flex flex-wrap items-center gap-1 sm:gap-2" }, [
                                      createVNode(unref(_sfc_main$t), {
                                        variant: bonus.status === 1 ? "secondary" : "outline",
                                        class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(bonus.status === 1 ? "R" : "P"), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["variant"]),
                                      bonus.index_value ? (openBlock(), createBlock(unref(_sfc_main$t), {
                                        key: 0,
                                        variant: "outline",
                                        class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" IDX: " + toDisplayString(bonus.index_value), 1)
                                        ]),
                                        _: 2
                                      }, 1024)) : createCommentVNode("", true),
                                      createVNode("span", { class: "text-[10px] sm:text-xs md:text-sm font-medium break-words line-clamp-1" }, toDisplayString(bonus.description || "Retail Commission"), 1)
                                    ]),
                                    createVNode("p", { class: "text-[8px] sm:text-[10px] md:text-xs text-muted-foreground mt-0.5" }, [
                                      bonus.from_member ? (openBlock(), createBlock("span", {
                                        key: 0,
                                        class: "block sm:inline"
                                      }, " Dari: " + toDisplayString(bonus.from_member.name), 1)) : createCommentVNode("", true),
                                      createVNode("span", { class: "block sm:inline sm:ml-1" }, toDisplayString(formatDate(bonus.created_at)), 1)
                                    ])
                                  ]),
                                  createVNode("div", { class: "text-left sm:text-right flex-shrink-0" }, [
                                    createVNode("div", { class: "text-xs sm:text-base md:text-lg font-bold text-green-600" }, toDisplayString(formatCurrency(bonus.amount)), 1),
                                    createVNode("div", {
                                      class: ["text-[8px] sm:text-xs", bonus.status === 1 ? "text-green-600" : "text-yellow-600"]
                                    }, toDisplayString(bonus.status === 1 ? "Processed" : "Pending"), 3)
                                  ])
                                ]);
                              }), 128))
                            ]))
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$$), {
                          value: "lifetime",
                          class: "mt-2 sm:mt-4"
                        }, {
                          default: withCtx(() => [
                            __props.bonusLifetimeCashRewards.length === 0 ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "text-center py-4 sm:py-8 text-muted-foreground text-[10px] sm:text-sm"
                            }, " Belum ada lifetime cash rewards ")) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "space-y-1.5 sm:space-y-3"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.bonusLifetimeCashRewards, (bonus) => {
                                return openBlock(), createBlock("div", {
                                  key: bonus.id,
                                  class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-3 p-2 sm:p-3 md:p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                }, [
                                  createVNode("div", { class: "flex-1 min-w-0" }, [
                                    createVNode("div", { class: "flex flex-wrap items-center gap-1 sm:gap-2" }, [
                                      createVNode(unref(_sfc_main$t), {
                                        variant: bonus.status === 1 ? "secondary" : "outline",
                                        class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(bonus.status === 1 ? "R" : "P"), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["variant"]),
                                      createVNode(unref(_sfc_main$t), {
                                        variant: "outline",
                                        class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(bonus.reward_name), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode("span", { class: "text-[10px] sm:text-xs md:text-sm font-medium break-words line-clamp-1" }, toDisplayString(bonus.description || "Lifetime Cash Reward"), 1)
                                    ]),
                                    createVNode("p", { class: "text-[8px] sm:text-[10px] md:text-xs text-muted-foreground mt-0.5" }, [
                                      createVNode("span", { class: "block sm:inline" }, " Reward: " + toDisplayString(formatCurrency(bonus.reward)) + " | BV: " + toDisplayString(bonus.bv), 1),
                                      createVNode("span", { class: "block sm:inline sm:ml-1" }, toDisplayString(formatDate(bonus.created_at)), 1)
                                    ])
                                  ]),
                                  createVNode("div", { class: "text-left sm:text-right flex-shrink-0" }, [
                                    createVNode("div", { class: "text-xs sm:text-base md:text-lg font-bold text-green-600" }, toDisplayString(formatCurrency(bonus.amount)), 1),
                                    createVNode("div", {
                                      class: ["text-[8px] sm:text-xs", bonus.status === 1 ? "text-green-600" : "text-yellow-600"]
                                    }, toDisplayString(bonus.status === 1 ? "Processed" : "Pending"), 3)
                                  ])
                                ]);
                              }), 128))
                            ]))
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
          } else {
            return [
              createVNode(unref(_sfc_main$v), { class: "p-2 sm:p-4 md:p-6 pb-2" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$w), { class: "text-xs sm:text-base md:text-lg" }, {
                    default: withCtx(() => [
                      createTextVNode("Riwayat Bonus")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$N), { class: "text-[9px] sm:text-xs md:text-sm" }, {
                    default: withCtx(() => [
                      createTextVNode(" Detail transaksi bonus ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$p), { class: "p-2 sm:p-4 md:p-6 pt-0" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$Y), {
                    "default-value": "sponsor",
                    class: "w-full"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", {
                        class: "w-full text-center overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-2 px-2 sm:mx-0 sm:px-0",
                        style: { "-webkit-overflow-scrolling": "touch" }
                      }, [
                        createVNode(unref(_sfc_main$Z), { class: "flex w-max sm:grid sm:w-full sm:grid-cols-7 gap-0.5 sm:gap-1 h-7 sm:h-auto bg-muted/30" }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$_), {
                              value: "sponsor",
                              class: "text-[12px] sm:text-xs md:text-sm whitespace-nowrap px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 h-6 sm:h-auto"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Referral ")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$_), {
                              value: "matching",
                              class: "text-[12px] sm:text-xs md:text-sm whitespace-nowrap px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 h-6 sm:h-auto"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Team Aff. ")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$_), {
                              value: "pairing",
                              class: "text-[12px] sm:text-xs md:text-sm whitespace-nowrap px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 h-6 sm:h-auto"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Partner ")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$_), {
                              value: "cashback",
                              class: "text-[12px] sm:text-xs md:text-sm whitespace-nowrap px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 h-6 sm:h-auto"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Cashback ")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$_), {
                              value: "reward",
                              class: "text-[12px] sm:text-xs md:text-sm whitespace-nowrap px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 h-6 sm:h-auto"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Rewards ")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$_), {
                              value: "retail",
                              class: "text-[12px] sm:text-xs md:text-sm whitespace-nowrap px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 h-6 sm:h-auto"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Retail ")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$_), {
                              value: "lifetime",
                              class: "text-[12px] sm:text-xs md:text-sm whitespace-nowrap px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 h-6 sm:h-auto"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Lifetime ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode(unref(_sfc_main$$), {
                        value: "sponsor",
                        class: "mt-2 sm:mt-4"
                      }, {
                        default: withCtx(() => [
                          __props.bonusSponsors.length === 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-center py-4 sm:py-8 text-muted-foreground text-[10px] sm:text-sm"
                          }, " Belum ada bonus referral incentive ")) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "space-y-1.5 sm:space-y-3"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.bonusSponsors, (bonus) => {
                              return openBlock(), createBlock("div", {
                                key: bonus.id,
                                class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-3 p-2 sm:p-3 md:p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                              }, [
                                createVNode("div", { class: "flex-1 min-w-0" }, [
                                  createVNode("div", { class: "flex flex-wrap items-center gap-1 sm:gap-2" }, [
                                    createVNode(unref(_sfc_main$t), {
                                      variant: bonus.status === 1 ? "secondary" : "outline",
                                      class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(bonus.status === 1 ? "R" : "P"), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["variant"]),
                                    createVNode("span", { class: "text-[10px] sm:text-xs md:text-sm font-medium break-words line-clamp-1" }, toDisplayString(bonus.description || "Bonus Sponsor"), 1)
                                  ]),
                                  createVNode("p", { class: "text-[8px] sm:text-[10px] md:text-xs text-muted-foreground mt-0.5" }, [
                                    bonus.from_member ? (openBlock(), createBlock("span", {
                                      key: 0,
                                      class: "block sm:inline"
                                    }, " Dari: " + toDisplayString(bonus.from_member.name), 1)) : createCommentVNode("", true),
                                    createVNode("span", { class: "block sm:inline sm:ml-1" }, toDisplayString(formatDate(bonus.created_at)), 1)
                                  ])
                                ]),
                                createVNode("div", { class: "text-left sm:text-right flex-shrink-0" }, [
                                  createVNode("div", { class: "text-xs sm:text-base md:text-lg font-bold text-green-600" }, toDisplayString(formatCurrency(bonus.amount)), 1),
                                  createVNode("div", {
                                    class: ["text-[8px] sm:text-xs", bonus.status === 1 ? "text-green-600" : "text-yellow-600"]
                                  }, toDisplayString(bonus.status === 1 ? "Processed" : "Pending"), 3)
                                ])
                              ]);
                            }), 128))
                          ]))
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$$), {
                        value: "matching",
                        class: "mt-2 sm:mt-4"
                      }, {
                        default: withCtx(() => [
                          __props.bonusMatchings.length === 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-center py-4 sm:py-8 text-muted-foreground text-[10px] sm:text-sm"
                          }, " Belum ada bonus team affiliate commission ")) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "space-y-1.5 sm:space-y-3"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.bonusMatchings, (bonus) => {
                              return openBlock(), createBlock("div", {
                                key: bonus.id,
                                class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-3 p-2 sm:p-3 md:p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                              }, [
                                createVNode("div", { class: "flex-1 min-w-0" }, [
                                  createVNode("div", { class: "flex flex-wrap items-center gap-1 sm:gap-2" }, [
                                    createVNode(unref(_sfc_main$t), {
                                      variant: bonus.status === 1 ? "secondary" : "outline",
                                      class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(bonus.status === 1 ? "R" : "P"), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["variant"]),
                                    createVNode(unref(_sfc_main$t), {
                                      variant: "outline",
                                      class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" L" + toDisplayString(bonus.level), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode("span", { class: "text-[10px] sm:text-xs md:text-sm font-medium break-words line-clamp-1" }, toDisplayString(bonus.description || "Bonus Matching"), 1)
                                  ]),
                                  createVNode("p", { class: "text-[8px] sm:text-[10px] md:text-xs text-muted-foreground mt-0.5" }, [
                                    bonus.from_member ? (openBlock(), createBlock("span", {
                                      key: 0,
                                      class: "block sm:inline"
                                    }, " Dari: " + toDisplayString(bonus.from_member.name), 1)) : createCommentVNode("", true),
                                    createVNode("span", { class: "block sm:inline sm:ml-2" }, toDisplayString(formatDate(bonus.created_at)), 1)
                                  ])
                                ]),
                                createVNode("div", { class: "text-left sm:text-right flex-shrink-0" }, [
                                  createVNode("div", { class: "text-xs sm:text-base md:text-lg font-bold text-green-600" }, toDisplayString(formatCurrency(bonus.amount)), 1),
                                  createVNode("div", {
                                    class: ["text-[8px] sm:text-xs", bonus.status === 1 ? "text-green-600" : "text-yellow-600"]
                                  }, toDisplayString(bonus.status === 1 ? "Processed" : "Pending"), 3)
                                ])
                              ]);
                            }), 128))
                          ]))
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$$), {
                        value: "pairing",
                        class: "mt-2 sm:mt-4"
                      }, {
                        default: withCtx(() => [
                          __props.bonusPairings.length === 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-center py-4 sm:py-8 text-muted-foreground text-[10px] sm:text-sm"
                          }, " Belum ada bonus partner team commission ")) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "space-y-3"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.bonusPairings, (bonus) => {
                              return openBlock(), createBlock("div", {
                                key: bonus.id,
                                class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                              }, [
                                createVNode("div", { class: "flex-1 min-w-0" }, [
                                  createVNode("div", { class: "flex flex-wrap items-center gap-2" }, [
                                    createVNode(unref(_sfc_main$t), {
                                      variant: bonus.status === 1 ? "secondary" : "outline",
                                      class: "text-xs"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(bonus.status === 1 ? "Released" : "Pending"), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["variant"]),
                                    createVNode(unref(_sfc_main$t), {
                                      variant: "outline",
                                      class: "text-xs"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(bonus.pair) + " Pairs ", 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode("span", { class: "text-xs sm:text-sm font-medium break-words" }, toDisplayString(bonus.description || "Bonus Pairing"), 1)
                                  ]),
                                  createVNode("p", { class: "text-[10px] sm:text-xs text-muted-foreground mt-1" }, toDisplayString(formatDate(bonus.created_at)), 1)
                                ]),
                                createVNode("div", { class: "text-left sm:text-right flex-shrink-0" }, [
                                  createVNode("div", { class: "text-base sm:text-lg font-bold text-green-600" }, toDisplayString(formatCurrency(bonus.amount)), 1),
                                  createVNode("div", {
                                    class: ["text-[8px] sm:text-xs", bonus.status === 1 ? "text-green-600" : "text-yellow-600"]
                                  }, toDisplayString(bonus.status === 1 ? "Processed" : "Pending"), 3)
                                ])
                              ]);
                            }), 128))
                          ]))
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$$), {
                        value: "cashback",
                        class: "mt-2 sm:mt-4"
                      }, {
                        default: withCtx(() => [
                          __props.bonusCashbacks.length === 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-center py-4 sm:py-8 text-muted-foreground text-[10px] sm:text-sm"
                          }, " Belum ada bonus cashback commission ")) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "space-y-1.5 sm:space-y-3"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.bonusCashbacks, (bonus) => {
                              return openBlock(), createBlock("div", {
                                key: bonus.id,
                                class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-3 p-2 sm:p-3 md:p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                              }, [
                                createVNode("div", { class: "flex-1 min-w-0" }, [
                                  createVNode("div", { class: "flex flex-wrap items-center gap-1 sm:gap-2" }, [
                                    createVNode(unref(_sfc_main$t), {
                                      variant: bonus.status === 1 ? "secondary" : "outline",
                                      class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(bonus.status === 1 ? "R" : "P"), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["variant"]),
                                    createVNode("span", { class: "text-[10px] sm:text-xs md:text-sm font-medium break-words line-clamp-1" }, toDisplayString(bonus.description || "Bonus Cashback"), 1)
                                  ]),
                                  createVNode("p", { class: "text-[8px] sm:text-[10px] md:text-xs text-muted-foreground mt-0.5" }, [
                                    createTextVNode('eground mt-0.5"> '),
                                    bonus.order_id ? (openBlock(), createBlock("span", {
                                      key: 0,
                                      class: "block sm:inline"
                                    }, " #" + toDisplayString(bonus.order_id), 1)) : createCommentVNode("", true),
                                    createVNode("span", { class: "block sm:inline sm:ml-1" }, toDisplayString(formatDate(bonus.created_at)), 1)
                                  ])
                                ]),
                                createVNode("div", { class: "text-left sm:text-right flex-shrink-0" }, [
                                  createVNode("div", { class: "text-xs sm:text-base md:text-lg font-bold text-green-600" }, toDisplayString(formatCurrency(bonus.amount)), 1),
                                  createVNode("div", {
                                    class: ["text-[8px] sm:text-xs", bonus.status === 1 ? "text-green-600" : "text-yellow-600"]
                                  }, toDisplayString(bonus.status === 1 ? "Processed" : "Pending"), 3)
                                ])
                              ]);
                            }), 128))
                          ]))
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$$), {
                        value: "reward",
                        class: "mt-2 sm:mt-4"
                      }, {
                        default: withCtx(() => [
                          __props.bonusRewards.length === 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-center py-4 sm:py-8 text-muted-foreground text-[10px] sm:text-sm"
                          }, " Belum ada promotions rewards ")) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "space-y-1.5 sm:space-y-3"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.bonusRewards, (bonus) => {
                              return openBlock(), createBlock("div", {
                                key: bonus.id,
                                class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-3 p-2 sm:p-3 md:p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                              }, [
                                createVNode("div", { class: "flex-1 min-w-0" }, [
                                  createVNode("div", { class: "flex flex-wrap items-center gap-1 sm:gap-2" }, [
                                    createVNode(unref(_sfc_main$t), {
                                      variant: bonus.status === 1 ? "secondary" : "outline",
                                      class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(bonus.status === 1 ? "R" : "P"), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["variant"]),
                                    bonus.reward_type ? (openBlock(), createBlock(unref(_sfc_main$t), {
                                      key: 0,
                                      variant: "outline",
                                      class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(bonus.reward_type), 1)
                                      ]),
                                      _: 2
                                    }, 1024)) : createCommentVNode("", true),
                                    createVNode("span", { class: "text-[10px] sm:text-xs md:text-sm font-medium break-words line-clamp-1" }, toDisplayString(bonus.description || "Promotions Reward"), 1)
                                  ]),
                                  createVNode("p", { class: "text-[8px] sm:text-[10px] md:text-xs text-muted-foreground mt-0.5" }, toDisplayString(formatDate(bonus.created_at)), 1)
                                ]),
                                createVNode("div", { class: "text-left sm:text-right flex-shrink-0" }, [
                                  createVNode("div", { class: "text-xs sm:text-base md:text-lg font-bold text-green-600" }, toDisplayString(formatCurrency(bonus.amount)), 1),
                                  createVNode("div", {
                                    class: ["text-[8px] sm:text-xs", bonus.status === 1 ? "text-green-600" : "text-yellow-600"]
                                  }, toDisplayString(bonus.status === 1 ? "Processed" : "Pending"), 3)
                                ])
                              ]);
                            }), 128))
                          ]))
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$$), {
                        value: "retail",
                        class: "mt-2 sm:mt-4"
                      }, {
                        default: withCtx(() => [
                          __props.bonusRetails.length === 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-center py-4 sm:py-8 text-muted-foreground text-[10px] sm:text-sm"
                          }, " Belum ada bonus retail commission ")) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "space-y-1.5 sm:space-y-3"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.bonusRetails, (bonus) => {
                              return openBlock(), createBlock("div", {
                                key: bonus.id,
                                class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-3 p-2 sm:p-3 md:p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                              }, [
                                createVNode("div", { class: "flex-1 min-w-0" }, [
                                  createVNode("div", { class: "flex flex-wrap items-center gap-1 sm:gap-2" }, [
                                    createVNode(unref(_sfc_main$t), {
                                      variant: bonus.status === 1 ? "secondary" : "outline",
                                      class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(bonus.status === 1 ? "R" : "P"), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["variant"]),
                                    bonus.index_value ? (openBlock(), createBlock(unref(_sfc_main$t), {
                                      key: 0,
                                      variant: "outline",
                                      class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" IDX: " + toDisplayString(bonus.index_value), 1)
                                      ]),
                                      _: 2
                                    }, 1024)) : createCommentVNode("", true),
                                    createVNode("span", { class: "text-[10px] sm:text-xs md:text-sm font-medium break-words line-clamp-1" }, toDisplayString(bonus.description || "Retail Commission"), 1)
                                  ]),
                                  createVNode("p", { class: "text-[8px] sm:text-[10px] md:text-xs text-muted-foreground mt-0.5" }, [
                                    bonus.from_member ? (openBlock(), createBlock("span", {
                                      key: 0,
                                      class: "block sm:inline"
                                    }, " Dari: " + toDisplayString(bonus.from_member.name), 1)) : createCommentVNode("", true),
                                    createVNode("span", { class: "block sm:inline sm:ml-1" }, toDisplayString(formatDate(bonus.created_at)), 1)
                                  ])
                                ]),
                                createVNode("div", { class: "text-left sm:text-right flex-shrink-0" }, [
                                  createVNode("div", { class: "text-xs sm:text-base md:text-lg font-bold text-green-600" }, toDisplayString(formatCurrency(bonus.amount)), 1),
                                  createVNode("div", {
                                    class: ["text-[8px] sm:text-xs", bonus.status === 1 ? "text-green-600" : "text-yellow-600"]
                                  }, toDisplayString(bonus.status === 1 ? "Processed" : "Pending"), 3)
                                ])
                              ]);
                            }), 128))
                          ]))
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$$), {
                        value: "lifetime",
                        class: "mt-2 sm:mt-4"
                      }, {
                        default: withCtx(() => [
                          __props.bonusLifetimeCashRewards.length === 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-center py-4 sm:py-8 text-muted-foreground text-[10px] sm:text-sm"
                          }, " Belum ada lifetime cash rewards ")) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "space-y-1.5 sm:space-y-3"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.bonusLifetimeCashRewards, (bonus) => {
                              return openBlock(), createBlock("div", {
                                key: bonus.id,
                                class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-3 p-2 sm:p-3 md:p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                              }, [
                                createVNode("div", { class: "flex-1 min-w-0" }, [
                                  createVNode("div", { class: "flex flex-wrap items-center gap-1 sm:gap-2" }, [
                                    createVNode(unref(_sfc_main$t), {
                                      variant: bonus.status === 1 ? "secondary" : "outline",
                                      class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(bonus.status === 1 ? "R" : "P"), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["variant"]),
                                    createVNode(unref(_sfc_main$t), {
                                      variant: "outline",
                                      class: "text-[8px] sm:text-xs px-1 sm:px-2 py-0"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(bonus.reward_name), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode("span", { class: "text-[10px] sm:text-xs md:text-sm font-medium break-words line-clamp-1" }, toDisplayString(bonus.description || "Lifetime Cash Reward"), 1)
                                  ]),
                                  createVNode("p", { class: "text-[8px] sm:text-[10px] md:text-xs text-muted-foreground mt-0.5" }, [
                                    createVNode("span", { class: "block sm:inline" }, " Reward: " + toDisplayString(formatCurrency(bonus.reward)) + " | BV: " + toDisplayString(bonus.bv), 1),
                                    createVNode("span", { class: "block sm:inline sm:ml-1" }, toDisplayString(formatDate(bonus.created_at)), 1)
                                  ])
                                ]),
                                createVNode("div", { class: "text-left sm:text-right flex-shrink-0" }, [
                                  createVNode("div", { class: "text-xs sm:text-base md:text-lg font-bold text-green-600" }, toDisplayString(formatCurrency(bonus.amount)), 1),
                                  createVNode("div", {
                                    class: ["text-[8px] sm:text-xs", bonus.status === 1 ? "text-green-600" : "text-yellow-600"]
                                  }, toDisplayString(bonus.status === 1 ? "Processed" : "Pending"), 3)
                                ])
                              ]);
                            }), 128))
                          ]))
                        ]),
                        _: 1
                      })
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
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/profile/BonusTab.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "NetworkStatsCard",
  __ssrInlineRender: true,
  props: {
    customer: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$o), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$v), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$w), { class: "flex items-center gap-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Network), { class: "w-5 h-5" }, null, _parent4, _scopeId3));
                        _push4(` Statistik Jaringan `);
                      } else {
                        return [
                          createVNode(unref(Network), { class: "w-5 h-5" }),
                          createTextVNode(" Statistik Jaringan ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$w), { class: "flex items-center gap-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(Network), { class: "w-5 h-5" }),
                        createTextVNode(" Statistik Jaringan ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$p), { class: "space-y-3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center justify-between"${_scopeId2}><span class="text-sm text-gray-600 dark:text-gray-400"${_scopeId2}>Jaringan Kiri</span><span class="font-semibold"${_scopeId2}>${ssrInterpolate(__props.customer.network_stats.left_count)}</span></div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$x), null, null, _parent3, _scopeId2));
                  _push3(`<div class="flex items-center justify-between"${_scopeId2}><span class="text-sm text-gray-600 dark:text-gray-400"${_scopeId2}>Jaringan Kanan</span><span class="font-semibold"${_scopeId2}>${ssrInterpolate(__props.customer.network_stats.right_count)}</span></div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$x), null, null, _parent3, _scopeId2));
                  _push3(`<div class="flex items-center justify-between"${_scopeId2}><span class="text-sm text-gray-600 dark:text-gray-400"${_scopeId2}>Total Downline</span>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$t), { variant: "secondary" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(__props.customer.network_stats.total_downlines)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(__props.customer.network_stats.total_downlines), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("span", { class: "text-sm text-gray-600 dark:text-gray-400" }, "Jaringan Kiri"),
                      createVNode("span", { class: "font-semibold" }, toDisplayString(__props.customer.network_stats.left_count), 1)
                    ]),
                    createVNode(unref(_sfc_main$x)),
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("span", { class: "text-sm text-gray-600 dark:text-gray-400" }, "Jaringan Kanan"),
                      createVNode("span", { class: "font-semibold" }, toDisplayString(__props.customer.network_stats.right_count), 1)
                    ]),
                    createVNode(unref(_sfc_main$x)),
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("span", { class: "text-sm text-gray-600 dark:text-gray-400" }, "Total Downline"),
                      createVNode(unref(_sfc_main$t), { variant: "secondary" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(__props.customer.network_stats.total_downlines), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$v), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$w), { class: "flex items-center gap-2" }, {
                    default: withCtx(() => [
                      createVNode(unref(Network), { class: "w-5 h-5" }),
                      createTextVNode(" Statistik Jaringan ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$p), { class: "space-y-3" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("span", { class: "text-sm text-gray-600 dark:text-gray-400" }, "Jaringan Kiri"),
                    createVNode("span", { class: "font-semibold" }, toDisplayString(__props.customer.network_stats.left_count), 1)
                  ]),
                  createVNode(unref(_sfc_main$x)),
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("span", { class: "text-sm text-gray-600 dark:text-gray-400" }, "Jaringan Kanan"),
                    createVNode("span", { class: "font-semibold" }, toDisplayString(__props.customer.network_stats.right_count), 1)
                  ]),
                  createVNode(unref(_sfc_main$x)),
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("span", { class: "text-sm text-gray-600 dark:text-gray-400" }, "Total Downline"),
                    createVNode(unref(_sfc_main$t), { variant: "secondary" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(__props.customer.network_stats.total_downlines), 1)
                      ]),
                      _: 1
                    })
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/profile/NetworkStatsCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    customer: {},
    orders: {},
    walletTransactions: {},
    activeMembers: {},
    passiveMembers: {},
    prospectMembers: {},
    binaryTree: {},
    totalDownlines: {},
    totalLeft: {},
    totalRight: {},
    bonusSponsors: {},
    bonusMatchings: {},
    bonusPairings: {},
    bonusCashbacks: {},
    bonusRewards: {},
    bonusRetails: {},
    bonusLifetimeCashRewards: {},
    addresses: {}
  },
  setup(__props) {
    const props = __props;
    const page = usePage();
    const isActiveMember = computed(() => {
      return Number(props.customer.status) === 3;
    });
    const activeTab = computed(() => {
      if (typeof window === "undefined") {
        return "profile";
      }
      const url = page.url;
      try {
        const urlObj = new URL(url, window.location.origin);
        return urlObj.searchParams.get("tab") || "profile";
      } catch {
        return "profile";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$10, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Profile Saya" }, null, _parent2, _scopeId));
            _push2(`<div class="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-b"${_scopeId}><div class="container mx-auto px-3 py-6 sm:px-4 sm:py-12 max-w-7xl"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1 sm:mb-2"${_scopeId}>Profile Saya</h1><p class="text-sm sm:text-base md:text-lg text-muted-foreground"${_scopeId}> Kelola informasi profil dan keamanan akun Anda </p></div><div class="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-background/80 backdrop-blur-sm border shadow-sm"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(User), { class: "w-5 h-5 text-primary" }, null, _parent2, _scopeId));
            _push2(`<span class="font-semibold"${_scopeId}>${ssrInterpolate(__props.customer.name)}</span></div></div></div></div><div class="container mx-auto px-3 py-4 sm:px-4 sm:py-8 max-w-7xl"${_scopeId}><div class="grid gap-4 sm:gap-6 lg:grid-cols-3"${_scopeId}><div class="lg:col-span-1 space-y-4 sm:space-y-6"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$n, { customer: __props.customer }, null, _parent2, _scopeId));
            if (isActiveMember.value) {
              _push2(ssrRenderComponent(_sfc_main$1, { customer: __props.customer }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$m, { addresses: __props.addresses }, null, _parent2, _scopeId));
            if (isActiveMember.value) {
              _push2(ssrRenderComponent(_sfc_main$l, { customer: __props.customer }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$k, {
              "created-at": __props.customer.created_at
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="lg:col-span-2"${_scopeId}><div class="rounded-xl border bg-card overflow-hidden"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$Y), {
              "default-value": activeTab.value,
              class: "w-full"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="border-b bg-muted/30"${_scopeId2}><div class="overflow-x-auto text-center overflow-y-hidden px-1.5 py-1.5 sm:px-2 sm:py-2 [&amp;::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$Z), { class: "inline-flex h-auto w-max bg-transparent gap-1 sm:gap-1.5 p-0" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$_), {
                          value: "profile",
                          class: "flex-shrink-0 flex flex-col items-center justify-center gap-0.5 py-1 px-1.5 sm:py-1.5 sm:px-2 w-[38px] sm:w-[55px] md:w-[70px] data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(User), { class: "w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" }, null, _parent5, _scopeId4));
                              _push5(`<span class="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight"${_scopeId4}>Info</span>`);
                            } else {
                              return [
                                createVNode(unref(User), { class: "w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" }),
                                createVNode("span", { class: "text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight" }, "Info")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$_), {
                          value: "orders",
                          class: "flex-shrink-0 flex flex-col items-center justify-center gap-0.5 py-1 px-1.5 sm:py-1.5 sm:px-2 w-[38px] sm:w-[55px] md:w-[70px] data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Package), { class: "w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" }, null, _parent5, _scopeId4));
                              _push5(`<span class="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight"${_scopeId4}>Order</span>`);
                            } else {
                              return [
                                createVNode(unref(Package), { class: "w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" }),
                                createVNode("span", { class: "text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight" }, "Order")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        if (isActiveMember.value) {
                          _push4(ssrRenderComponent(unref(_sfc_main$_), {
                            value: "network",
                            class: "flex-shrink-0 flex flex-col items-center justify-center gap-0.5 py-1 px-1.5 sm:py-1.5 sm:px-2 w-[38px] sm:w-[55px] md:w-[70px] data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(Network), { class: "w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" }, null, _parent5, _scopeId4));
                                _push5(`<span class="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight"${_scopeId4}>Mitra</span>`);
                              } else {
                                return [
                                  createVNode(unref(Network), { class: "w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" }),
                                  createVNode("span", { class: "text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight" }, "Mitra")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        if (isActiveMember.value) {
                          _push4(ssrRenderComponent(unref(_sfc_main$_), {
                            value: "binary",
                            class: "flex-shrink-0 flex flex-col items-center justify-center gap-0.5 py-1 px-1.5 sm:py-1.5 sm:px-2 w-[38px] sm:w-[55px] md:w-[70px] data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(GitBranch), { class: "w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" }, null, _parent5, _scopeId4));
                                _push5(`<span class="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight"${_scopeId4}>Network</span>`);
                              } else {
                                return [
                                  createVNode(unref(GitBranch), { class: "w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" }),
                                  createVNode("span", { class: "text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight" }, "Network")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        if (isActiveMember.value) {
                          _push4(ssrRenderComponent(unref(_sfc_main$_), {
                            value: "bonus",
                            class: "flex-shrink-0 flex flex-col items-center justify-center gap-0.5 py-1 px-1.5 sm:py-1.5 sm:px-2 w-[38px] sm:w-[55px] md:w-[70px] data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(Gift), { class: "w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" }, null, _parent5, _scopeId4));
                                _push5(`<span class="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight"${_scopeId4}>Bonus</span>`);
                              } else {
                                return [
                                  createVNode(unref(Gift), { class: "w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" }),
                                  createVNode("span", { class: "text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight" }, "Bonus")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(ssrRenderComponent(unref(_sfc_main$_), {
                          value: "wallet",
                          class: "flex-shrink-0 flex flex-col items-center justify-center gap-0.5 py-1 px-1.5 sm:py-1.5 sm:px-2 w-[38px] sm:w-[55px] md:w-[70px] data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Wallet), { class: "w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" }, null, _parent5, _scopeId4));
                              _push5(`<span class="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight"${_scopeId4}>Wallet</span>`);
                            } else {
                              return [
                                createVNode(unref(Wallet), { class: "w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" }),
                                createVNode("span", { class: "text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight" }, "Wallet")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$_), {
                          value: "security",
                          class: "flex-shrink-0 flex flex-col items-center justify-center gap-0.5 py-1 px-1.5 sm:py-1.5 sm:px-2 w-[38px] sm:w-[55px] md:w-[70px] data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Lock), { class: "w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" }, null, _parent5, _scopeId4));
                              _push5(`<span class="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight"${_scopeId4}>Lock</span>`);
                            } else {
                              return [
                                createVNode(unref(Lock), { class: "w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" }),
                                createVNode("span", { class: "text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight" }, "Lock")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$_), {
                          value: "danger",
                          class: "flex-shrink-0 flex flex-col items-center justify-center gap-0.5 py-1 px-1.5 sm:py-1.5 sm:px-2 w-[38px] sm:w-[55px] md:w-[70px] data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(AlertCircle), { class: "w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" }, null, _parent5, _scopeId4));
                              _push5(`<span class="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight"${_scopeId4}>Del</span>`);
                            } else {
                              return [
                                createVNode(unref(AlertCircle), { class: "w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" }),
                                createVNode("span", { class: "text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight" }, "Del")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$_), {
                            value: "profile",
                            class: "flex-shrink-0 flex flex-col items-center justify-center gap-0.5 py-1 px-1.5 sm:py-1.5 sm:px-2 w-[38px] sm:w-[55px] md:w-[70px] data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(User), { class: "w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" }),
                              createVNode("span", { class: "text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight" }, "Info")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$_), {
                            value: "orders",
                            class: "flex-shrink-0 flex flex-col items-center justify-center gap-0.5 py-1 px-1.5 sm:py-1.5 sm:px-2 w-[38px] sm:w-[55px] md:w-[70px] data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Package), { class: "w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" }),
                              createVNode("span", { class: "text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight" }, "Order")
                            ]),
                            _: 1
                          }),
                          isActiveMember.value ? (openBlock(), createBlock(unref(_sfc_main$_), {
                            key: 0,
                            value: "network",
                            class: "flex-shrink-0 flex flex-col items-center justify-center gap-0.5 py-1 px-1.5 sm:py-1.5 sm:px-2 w-[38px] sm:w-[55px] md:w-[70px] data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Network), { class: "w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" }),
                              createVNode("span", { class: "text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight" }, "Mitra")
                            ]),
                            _: 1
                          })) : createCommentVNode("", true),
                          isActiveMember.value ? (openBlock(), createBlock(unref(_sfc_main$_), {
                            key: 1,
                            value: "binary",
                            class: "flex-shrink-0 flex flex-col items-center justify-center gap-0.5 py-1 px-1.5 sm:py-1.5 sm:px-2 w-[38px] sm:w-[55px] md:w-[70px] data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(GitBranch), { class: "w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" }),
                              createVNode("span", { class: "text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight" }, "Network")
                            ]),
                            _: 1
                          })) : createCommentVNode("", true),
                          isActiveMember.value ? (openBlock(), createBlock(unref(_sfc_main$_), {
                            key: 2,
                            value: "bonus",
                            class: "flex-shrink-0 flex flex-col items-center justify-center gap-0.5 py-1 px-1.5 sm:py-1.5 sm:px-2 w-[38px] sm:w-[55px] md:w-[70px] data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Gift), { class: "w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" }),
                              createVNode("span", { class: "text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight" }, "Bonus")
                            ]),
                            _: 1
                          })) : createCommentVNode("", true),
                          createVNode(unref(_sfc_main$_), {
                            value: "wallet",
                            class: "flex-shrink-0 flex flex-col items-center justify-center gap-0.5 py-1 px-1.5 sm:py-1.5 sm:px-2 w-[38px] sm:w-[55px] md:w-[70px] data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Wallet), { class: "w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" }),
                              createVNode("span", { class: "text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight" }, "Wallet")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$_), {
                            value: "security",
                            class: "flex-shrink-0 flex flex-col items-center justify-center gap-0.5 py-1 px-1.5 sm:py-1.5 sm:px-2 w-[38px] sm:w-[55px] md:w-[70px] data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Lock), { class: "w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" }),
                              createVNode("span", { class: "text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight" }, "Lock")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$_), {
                            value: "danger",
                            class: "flex-shrink-0 flex flex-col items-center justify-center gap-0.5 py-1 px-1.5 sm:py-1.5 sm:px-2 w-[38px] sm:w-[55px] md:w-[70px] data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(AlertCircle), { class: "w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" }),
                              createVNode("span", { class: "text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight" }, "Del")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div><div class="p-3 sm:p-4 md:p-6"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$$), {
                    value: "profile",
                    class: "mt-0"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$j, { customer: __props.customer }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$j, { customer: __props.customer }, null, 8, ["customer"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$$), {
                    value: "orders",
                    class: "mt-0"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$f, { orders: __props.orders }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$f, { orders: __props.orders }, null, 8, ["orders"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (isActiveMember.value) {
                    _push3(ssrRenderComponent(unref(_sfc_main$$), {
                      value: "network",
                      class: "mt-0"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_sfc_main$5, {
                            "active-members": __props.activeMembers,
                            "passive-members": __props.passiveMembers,
                            "prospect-members": __props.prospectMembers
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_sfc_main$5, {
                              "active-members": __props.activeMembers,
                              "passive-members": __props.passiveMembers,
                              "prospect-members": __props.prospectMembers
                            }, null, 8, ["active-members", "passive-members", "prospect-members"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (isActiveMember.value) {
                    _push3(ssrRenderComponent(unref(_sfc_main$$), {
                      value: "binary",
                      class: "mt-0"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          if (__props.binaryTree) {
                            _push4(ssrRenderComponent(_sfc_main$3, {
                              "binary-tree": __props.binaryTree,
                              "total-downlines": __props.totalDownlines,
                              "total-left": __props.totalLeft,
                              "total-right": __props.totalRight,
                              "passive-members": __props.passiveMembers
                            }, null, _parent4, _scopeId3));
                          } else {
                            _push4(`<div class="text-center py-12"${_scopeId3}>`);
                            _push4(ssrRenderComponent(unref(GitBranch), { class: "w-12 h-12 mx-auto text-muted-foreground mb-4" }, null, _parent4, _scopeId3));
                            _push4(`<h3 class="text-lg font-semibold mb-2"${_scopeId3}>Belum Ada Jaringan Binary</h3><p class="text-muted-foreground"${_scopeId3}> Anda belum memiliki posisi dalam jaringan binary tree MLM. </p></div>`);
                          }
                        } else {
                          return [
                            __props.binaryTree ? (openBlock(), createBlock(_sfc_main$3, {
                              key: 0,
                              "binary-tree": __props.binaryTree,
                              "total-downlines": __props.totalDownlines,
                              "total-left": __props.totalLeft,
                              "total-right": __props.totalRight,
                              "passive-members": __props.passiveMembers
                            }, null, 8, ["binary-tree", "total-downlines", "total-left", "total-right", "passive-members"])) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "text-center py-12"
                            }, [
                              createVNode(unref(GitBranch), { class: "w-12 h-12 mx-auto text-muted-foreground mb-4" }),
                              createVNode("h3", { class: "text-lg font-semibold mb-2" }, "Belum Ada Jaringan Binary"),
                              createVNode("p", { class: "text-muted-foreground" }, " Anda belum memiliki posisi dalam jaringan binary tree MLM. ")
                            ]))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (isActiveMember.value) {
                    _push3(ssrRenderComponent(unref(_sfc_main$$), {
                      value: "bonus",
                      class: "mt-0"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_sfc_main$2, {
                            "bonus-sponsors": __props.bonusSponsors,
                            "bonus-matchings": __props.bonusMatchings,
                            "bonus-pairings": __props.bonusPairings,
                            "bonus-cashbacks": __props.bonusCashbacks,
                            "bonus-rewards": __props.bonusRewards,
                            "bonus-retails": __props.bonusRetails,
                            "bonus-lifetime-cash-rewards": __props.bonusLifetimeCashRewards
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_sfc_main$2, {
                              "bonus-sponsors": __props.bonusSponsors,
                              "bonus-matchings": __props.bonusMatchings,
                              "bonus-pairings": __props.bonusPairings,
                              "bonus-cashbacks": __props.bonusCashbacks,
                              "bonus-rewards": __props.bonusRewards,
                              "bonus-retails": __props.bonusRetails,
                              "bonus-lifetime-cash-rewards": __props.bonusLifetimeCashRewards
                            }, null, 8, ["bonus-sponsors", "bonus-matchings", "bonus-pairings", "bonus-cashbacks", "bonus-rewards", "bonus-retails", "bonus-lifetime-cash-rewards"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(unref(_sfc_main$$), {
                    value: "wallet",
                    class: "mt-0"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$8, {
                          customer: __props.customer,
                          transactions: __props.walletTransactions
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$8, {
                            customer: __props.customer,
                            transactions: __props.walletTransactions
                          }, null, 8, ["customer", "transactions"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$$), {
                    value: "security",
                    class: "mt-0"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$7, null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$7)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$$), {
                    value: "danger",
                    class: "mt-0"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$6, null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$6)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "border-b bg-muted/30" }, [
                      createVNode("div", { class: "overflow-x-auto text-center overflow-y-hidden px-1.5 py-1.5 sm:px-2 sm:py-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" }, [
                        createVNode(unref(_sfc_main$Z), { class: "inline-flex h-auto w-max bg-transparent gap-1 sm:gap-1.5 p-0" }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$_), {
                              value: "profile",
                              class: "flex-shrink-0 flex flex-col items-center justify-center gap-0.5 py-1 px-1.5 sm:py-1.5 sm:px-2 w-[38px] sm:w-[55px] md:w-[70px] data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(User), { class: "w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" }),
                                createVNode("span", { class: "text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight" }, "Info")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$_), {
                              value: "orders",
                              class: "flex-shrink-0 flex flex-col items-center justify-center gap-0.5 py-1 px-1.5 sm:py-1.5 sm:px-2 w-[38px] sm:w-[55px] md:w-[70px] data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Package), { class: "w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" }),
                                createVNode("span", { class: "text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight" }, "Order")
                              ]),
                              _: 1
                            }),
                            isActiveMember.value ? (openBlock(), createBlock(unref(_sfc_main$_), {
                              key: 0,
                              value: "network",
                              class: "flex-shrink-0 flex flex-col items-center justify-center gap-0.5 py-1 px-1.5 sm:py-1.5 sm:px-2 w-[38px] sm:w-[55px] md:w-[70px] data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Network), { class: "w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" }),
                                createVNode("span", { class: "text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight" }, "Mitra")
                              ]),
                              _: 1
                            })) : createCommentVNode("", true),
                            isActiveMember.value ? (openBlock(), createBlock(unref(_sfc_main$_), {
                              key: 1,
                              value: "binary",
                              class: "flex-shrink-0 flex flex-col items-center justify-center gap-0.5 py-1 px-1.5 sm:py-1.5 sm:px-2 w-[38px] sm:w-[55px] md:w-[70px] data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(GitBranch), { class: "w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" }),
                                createVNode("span", { class: "text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight" }, "Network")
                              ]),
                              _: 1
                            })) : createCommentVNode("", true),
                            isActiveMember.value ? (openBlock(), createBlock(unref(_sfc_main$_), {
                              key: 2,
                              value: "bonus",
                              class: "flex-shrink-0 flex flex-col items-center justify-center gap-0.5 py-1 px-1.5 sm:py-1.5 sm:px-2 w-[38px] sm:w-[55px] md:w-[70px] data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Gift), { class: "w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" }),
                                createVNode("span", { class: "text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight" }, "Bonus")
                              ]),
                              _: 1
                            })) : createCommentVNode("", true),
                            createVNode(unref(_sfc_main$_), {
                              value: "wallet",
                              class: "flex-shrink-0 flex flex-col items-center justify-center gap-0.5 py-1 px-1.5 sm:py-1.5 sm:px-2 w-[38px] sm:w-[55px] md:w-[70px] data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Wallet), { class: "w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" }),
                                createVNode("span", { class: "text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight" }, "Wallet")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$_), {
                              value: "security",
                              class: "flex-shrink-0 flex flex-col items-center justify-center gap-0.5 py-1 px-1.5 sm:py-1.5 sm:px-2 w-[38px] sm:w-[55px] md:w-[70px] data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Lock), { class: "w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" }),
                                createVNode("span", { class: "text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight" }, "Lock")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$_), {
                              value: "danger",
                              class: "flex-shrink-0 flex flex-col items-center justify-center gap-0.5 py-1 px-1.5 sm:py-1.5 sm:px-2 w-[38px] sm:w-[55px] md:w-[70px] data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(AlertCircle), { class: "w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" }),
                                createVNode("span", { class: "text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight" }, "Del")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    createVNode("div", { class: "p-3 sm:p-4 md:p-6" }, [
                      createVNode(unref(_sfc_main$$), {
                        value: "profile",
                        class: "mt-0"
                      }, {
                        default: withCtx(() => [
                          createVNode(_sfc_main$j, { customer: __props.customer }, null, 8, ["customer"])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$$), {
                        value: "orders",
                        class: "mt-0"
                      }, {
                        default: withCtx(() => [
                          createVNode(_sfc_main$f, { orders: __props.orders }, null, 8, ["orders"])
                        ]),
                        _: 1
                      }),
                      isActiveMember.value ? (openBlock(), createBlock(unref(_sfc_main$$), {
                        key: 0,
                        value: "network",
                        class: "mt-0"
                      }, {
                        default: withCtx(() => [
                          createVNode(_sfc_main$5, {
                            "active-members": __props.activeMembers,
                            "passive-members": __props.passiveMembers,
                            "prospect-members": __props.prospectMembers
                          }, null, 8, ["active-members", "passive-members", "prospect-members"])
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      isActiveMember.value ? (openBlock(), createBlock(unref(_sfc_main$$), {
                        key: 1,
                        value: "binary",
                        class: "mt-0"
                      }, {
                        default: withCtx(() => [
                          __props.binaryTree ? (openBlock(), createBlock(_sfc_main$3, {
                            key: 0,
                            "binary-tree": __props.binaryTree,
                            "total-downlines": __props.totalDownlines,
                            "total-left": __props.totalLeft,
                            "total-right": __props.totalRight,
                            "passive-members": __props.passiveMembers
                          }, null, 8, ["binary-tree", "total-downlines", "total-left", "total-right", "passive-members"])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "text-center py-12"
                          }, [
                            createVNode(unref(GitBranch), { class: "w-12 h-12 mx-auto text-muted-foreground mb-4" }),
                            createVNode("h3", { class: "text-lg font-semibold mb-2" }, "Belum Ada Jaringan Binary"),
                            createVNode("p", { class: "text-muted-foreground" }, " Anda belum memiliki posisi dalam jaringan binary tree MLM. ")
                          ]))
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      isActiveMember.value ? (openBlock(), createBlock(unref(_sfc_main$$), {
                        key: 2,
                        value: "bonus",
                        class: "mt-0"
                      }, {
                        default: withCtx(() => [
                          createVNode(_sfc_main$2, {
                            "bonus-sponsors": __props.bonusSponsors,
                            "bonus-matchings": __props.bonusMatchings,
                            "bonus-pairings": __props.bonusPairings,
                            "bonus-cashbacks": __props.bonusCashbacks,
                            "bonus-rewards": __props.bonusRewards,
                            "bonus-retails": __props.bonusRetails,
                            "bonus-lifetime-cash-rewards": __props.bonusLifetimeCashRewards
                          }, null, 8, ["bonus-sponsors", "bonus-matchings", "bonus-pairings", "bonus-cashbacks", "bonus-rewards", "bonus-retails", "bonus-lifetime-cash-rewards"])
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      createVNode(unref(_sfc_main$$), {
                        value: "wallet",
                        class: "mt-0"
                      }, {
                        default: withCtx(() => [
                          createVNode(_sfc_main$8, {
                            customer: __props.customer,
                            transactions: __props.walletTransactions
                          }, null, 8, ["customer", "transactions"])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$$), {
                        value: "security",
                        class: "mt-0"
                      }, {
                        default: withCtx(() => [
                          createVNode(_sfc_main$7)
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$$), {
                        value: "danger",
                        class: "mt-0"
                      }, {
                        default: withCtx(() => [
                          createVNode(_sfc_main$6)
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Profile Saya" }),
              createVNode("div", { class: "bg-gradient-to-br from-primary/10 via-primary/5 to-background border-b" }, [
                createVNode("div", { class: "container mx-auto px-3 py-6 sm:px-4 sm:py-12 max-w-7xl" }, [
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1 sm:mb-2" }, "Profile Saya"),
                      createVNode("p", { class: "text-sm sm:text-base md:text-lg text-muted-foreground" }, " Kelola informasi profil dan keamanan akun Anda ")
                    ]),
                    createVNode("div", { class: "hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-background/80 backdrop-blur-sm border shadow-sm" }, [
                      createVNode(unref(User), { class: "w-5 h-5 text-primary" }),
                      createVNode("span", { class: "font-semibold" }, toDisplayString(__props.customer.name), 1)
                    ])
                  ])
                ])
              ]),
              createVNode("div", { class: "container mx-auto px-3 py-4 sm:px-4 sm:py-8 max-w-7xl" }, [
                createVNode("div", { class: "grid gap-4 sm:gap-6 lg:grid-cols-3" }, [
                  createVNode("div", { class: "lg:col-span-1 space-y-4 sm:space-y-6" }, [
                    createVNode(_sfc_main$n, { customer: __props.customer }, null, 8, ["customer"]),
                    isActiveMember.value ? (openBlock(), createBlock(_sfc_main$1, {
                      key: 0,
                      customer: __props.customer
                    }, null, 8, ["customer"])) : createCommentVNode("", true),
                    createVNode(_sfc_main$m, { addresses: __props.addresses }, null, 8, ["addresses"]),
                    isActiveMember.value ? (openBlock(), createBlock(_sfc_main$l, {
                      key: 1,
                      customer: __props.customer
                    }, null, 8, ["customer"])) : createCommentVNode("", true),
                    createVNode(_sfc_main$k, {
                      "created-at": __props.customer.created_at
                    }, null, 8, ["created-at"])
                  ]),
                  createVNode("div", { class: "lg:col-span-2" }, [
                    createVNode("div", { class: "rounded-xl border bg-card overflow-hidden" }, [
                      createVNode(unref(_sfc_main$Y), {
                        "default-value": activeTab.value,
                        class: "w-full"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "border-b bg-muted/30" }, [
                            createVNode("div", { class: "overflow-x-auto text-center overflow-y-hidden px-1.5 py-1.5 sm:px-2 sm:py-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" }, [
                              createVNode(unref(_sfc_main$Z), { class: "inline-flex h-auto w-max bg-transparent gap-1 sm:gap-1.5 p-0" }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$_), {
                                    value: "profile",
                                    class: "flex-shrink-0 flex flex-col items-center justify-center gap-0.5 py-1 px-1.5 sm:py-1.5 sm:px-2 w-[38px] sm:w-[55px] md:w-[70px] data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(User), { class: "w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" }),
                                      createVNode("span", { class: "text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight" }, "Info")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$_), {
                                    value: "orders",
                                    class: "flex-shrink-0 flex flex-col items-center justify-center gap-0.5 py-1 px-1.5 sm:py-1.5 sm:px-2 w-[38px] sm:w-[55px] md:w-[70px] data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Package), { class: "w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" }),
                                      createVNode("span", { class: "text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight" }, "Order")
                                    ]),
                                    _: 1
                                  }),
                                  isActiveMember.value ? (openBlock(), createBlock(unref(_sfc_main$_), {
                                    key: 0,
                                    value: "network",
                                    class: "flex-shrink-0 flex flex-col items-center justify-center gap-0.5 py-1 px-1.5 sm:py-1.5 sm:px-2 w-[38px] sm:w-[55px] md:w-[70px] data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Network), { class: "w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" }),
                                      createVNode("span", { class: "text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight" }, "Mitra")
                                    ]),
                                    _: 1
                                  })) : createCommentVNode("", true),
                                  isActiveMember.value ? (openBlock(), createBlock(unref(_sfc_main$_), {
                                    key: 1,
                                    value: "binary",
                                    class: "flex-shrink-0 flex flex-col items-center justify-center gap-0.5 py-1 px-1.5 sm:py-1.5 sm:px-2 w-[38px] sm:w-[55px] md:w-[70px] data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(GitBranch), { class: "w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" }),
                                      createVNode("span", { class: "text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight" }, "Network")
                                    ]),
                                    _: 1
                                  })) : createCommentVNode("", true),
                                  isActiveMember.value ? (openBlock(), createBlock(unref(_sfc_main$_), {
                                    key: 2,
                                    value: "bonus",
                                    class: "flex-shrink-0 flex flex-col items-center justify-center gap-0.5 py-1 px-1.5 sm:py-1.5 sm:px-2 w-[38px] sm:w-[55px] md:w-[70px] data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Gift), { class: "w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" }),
                                      createVNode("span", { class: "text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight" }, "Bonus")
                                    ]),
                                    _: 1
                                  })) : createCommentVNode("", true),
                                  createVNode(unref(_sfc_main$_), {
                                    value: "wallet",
                                    class: "flex-shrink-0 flex flex-col items-center justify-center gap-0.5 py-1 px-1.5 sm:py-1.5 sm:px-2 w-[38px] sm:w-[55px] md:w-[70px] data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Wallet), { class: "w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" }),
                                      createVNode("span", { class: "text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight" }, "Wallet")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$_), {
                                    value: "security",
                                    class: "flex-shrink-0 flex flex-col items-center justify-center gap-0.5 py-1 px-1.5 sm:py-1.5 sm:px-2 w-[38px] sm:w-[55px] md:w-[70px] data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Lock), { class: "w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" }),
                                      createVNode("span", { class: "text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight" }, "Lock")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$_), {
                                    value: "danger",
                                    class: "flex-shrink-0 flex flex-col items-center justify-center gap-0.5 py-1 px-1.5 sm:py-1.5 sm:px-2 w-[38px] sm:w-[55px] md:w-[70px] data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(AlertCircle), { class: "w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" }),
                                      createVNode("span", { class: "text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight" }, "Del")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ])
                          ]),
                          createVNode("div", { class: "p-3 sm:p-4 md:p-6" }, [
                            createVNode(unref(_sfc_main$$), {
                              value: "profile",
                              class: "mt-0"
                            }, {
                              default: withCtx(() => [
                                createVNode(_sfc_main$j, { customer: __props.customer }, null, 8, ["customer"])
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$$), {
                              value: "orders",
                              class: "mt-0"
                            }, {
                              default: withCtx(() => [
                                createVNode(_sfc_main$f, { orders: __props.orders }, null, 8, ["orders"])
                              ]),
                              _: 1
                            }),
                            isActiveMember.value ? (openBlock(), createBlock(unref(_sfc_main$$), {
                              key: 0,
                              value: "network",
                              class: "mt-0"
                            }, {
                              default: withCtx(() => [
                                createVNode(_sfc_main$5, {
                                  "active-members": __props.activeMembers,
                                  "passive-members": __props.passiveMembers,
                                  "prospect-members": __props.prospectMembers
                                }, null, 8, ["active-members", "passive-members", "prospect-members"])
                              ]),
                              _: 1
                            })) : createCommentVNode("", true),
                            isActiveMember.value ? (openBlock(), createBlock(unref(_sfc_main$$), {
                              key: 1,
                              value: "binary",
                              class: "mt-0"
                            }, {
                              default: withCtx(() => [
                                __props.binaryTree ? (openBlock(), createBlock(_sfc_main$3, {
                                  key: 0,
                                  "binary-tree": __props.binaryTree,
                                  "total-downlines": __props.totalDownlines,
                                  "total-left": __props.totalLeft,
                                  "total-right": __props.totalRight,
                                  "passive-members": __props.passiveMembers
                                }, null, 8, ["binary-tree", "total-downlines", "total-left", "total-right", "passive-members"])) : (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "text-center py-12"
                                }, [
                                  createVNode(unref(GitBranch), { class: "w-12 h-12 mx-auto text-muted-foreground mb-4" }),
                                  createVNode("h3", { class: "text-lg font-semibold mb-2" }, "Belum Ada Jaringan Binary"),
                                  createVNode("p", { class: "text-muted-foreground" }, " Anda belum memiliki posisi dalam jaringan binary tree MLM. ")
                                ]))
                              ]),
                              _: 1
                            })) : createCommentVNode("", true),
                            isActiveMember.value ? (openBlock(), createBlock(unref(_sfc_main$$), {
                              key: 2,
                              value: "bonus",
                              class: "mt-0"
                            }, {
                              default: withCtx(() => [
                                createVNode(_sfc_main$2, {
                                  "bonus-sponsors": __props.bonusSponsors,
                                  "bonus-matchings": __props.bonusMatchings,
                                  "bonus-pairings": __props.bonusPairings,
                                  "bonus-cashbacks": __props.bonusCashbacks,
                                  "bonus-rewards": __props.bonusRewards,
                                  "bonus-retails": __props.bonusRetails,
                                  "bonus-lifetime-cash-rewards": __props.bonusLifetimeCashRewards
                                }, null, 8, ["bonus-sponsors", "bonus-matchings", "bonus-pairings", "bonus-cashbacks", "bonus-rewards", "bonus-retails", "bonus-lifetime-cash-rewards"])
                              ]),
                              _: 1
                            })) : createCommentVNode("", true),
                            createVNode(unref(_sfc_main$$), {
                              value: "wallet",
                              class: "mt-0"
                            }, {
                              default: withCtx(() => [
                                createVNode(_sfc_main$8, {
                                  customer: __props.customer,
                                  transactions: __props.walletTransactions
                                }, null, 8, ["customer", "transactions"])
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$$), {
                              value: "security",
                              class: "mt-0"
                            }, {
                              default: withCtx(() => [
                                createVNode(_sfc_main$7)
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$$), {
                              value: "danger",
                              class: "mt-0"
                            }, {
                              default: withCtx(() => [
                                createVNode(_sfc_main$6)
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        _: 1
                      }, 8, ["default-value"])
                    ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/ecommerce/profile/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
