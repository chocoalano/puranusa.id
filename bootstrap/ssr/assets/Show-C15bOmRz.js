import { defineComponent, ref, unref, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, createCommentVNode, Fragment, renderList, withDirectives, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { Head, Link, useForm, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1, i as index, e as edit, r as releaseBonuses, t as topUp, f as deduct, d as destroy } from "./AppLayout-Bq9zOrCE.js";
import { _ as _sfc_main$2 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$l } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$9 } from "./Label-16aMY2sx.js";
import { _ as _sfc_main$7 } from "./index-BpQimeTM.js";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5, c as _sfc_main$6, d as _sfc_main$8 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$a, a as _sfc_main$b, b as _sfc_main$c, c as _sfc_main$d, d as _sfc_main$e, e as _sfc_main$f } from "./TableHeader-emcE6QAC.js";
import { _ as _sfc_main$g, a as _sfc_main$h, b as _sfc_main$i, c as _sfc_main$j, d as _sfc_main$k, e as _sfc_main$m } from "./DialogTrigger-DV-5YM1v.js";
import { ArrowLeft, Pencil, Trash2, Wallet, Users, Gift, TrendingUp, DollarSign } from "lucide-vue-next";
import { toast } from "vue-sonner";
import "class-variance-authority";
import "./DropdownMenuTrigger-B1v6pHML.js";
import "reka-ui";
import "@vueuse/core";
import "./index-Jhngbhhu.js";
import "./AvatarImage-DWFQMckn.js";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
import "clsx";
import "tailwind-merge";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    customer: {},
    statistics: {},
    recentBonuses: {},
    downlineTree: {}
  },
  setup(__props) {
    const props = __props;
    const topUpDialog = ref(false);
    const deductDialog = ref(false);
    const deleteDialog = ref(false);
    const topUpAmount = ref(0);
    const topUpDescription = ref("");
    const deductAmount = ref(0);
    const deductDescription = ref("");
    const handleReleaseBonuses = () => {
      const releaseForm = useForm({});
      releaseForm.post(releaseBonuses.url(props.customer.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Bonus berhasil dirilis");
        },
        onError: () => {
          toast.error("Gagal release bonus");
        }
      });
    };
    const handleTopUp = () => {
      if (topUpAmount.value <= 0) {
        toast.error("Jumlah top up harus lebih dari 0");
        return;
      }
      const topUpForm = useForm({
        amount: topUpAmount.value,
        description: topUpDescription.value
      });
      topUpForm.post(
        topUp.url(props.customer.id),
        {
          preserveScroll: true,
          onSuccess: () => {
            toast.success(`Saldo berhasil ditambahkan: Rp ${topUpAmount.value.toLocaleString("id-ID")}`);
            topUpDialog.value = false;
            topUpAmount.value = 0;
            topUpDescription.value = "";
          },
          onError: () => {
            toast.error("Gagal top up saldo");
          }
        }
      );
    };
    const handleDeduct = () => {
      if (deductAmount.value <= 0) {
        toast.error("Jumlah pengurangan harus lebih dari 0");
        return;
      }
      const currentSaldo = props.customer.ewallet_saldo || 0;
      if (deductAmount.value > currentSaldo) {
        toast.error("Jumlah pengurangan melebihi saldo");
        return;
      }
      const deductForm = useForm({
        amount: deductAmount.value,
        description: deductDescription.value
      });
      deductForm.post(
        deduct.url(props.customer.id),
        {
          preserveScroll: true,
          onSuccess: () => {
            toast.success(`Saldo berhasil dikurangi: Rp ${deductAmount.value.toLocaleString("id-ID")}`);
            deductDialog.value = false;
            deductAmount.value = 0;
            deductDescription.value = "";
          },
          onError: () => {
            toast.error("Gagal mengurangi saldo");
          }
        }
      );
    };
    const handleDelete = () => {
      router.delete(destroy.url(props.customer.id), {
        onSuccess: () => {
          toast.success("Pelanggan berhasil dihapus");
        },
        onError: () => {
          toast.error("Gagal menghapus pelanggan");
        }
      });
    };
    const formatCurrency = (amount) => {
      if (amount === null || amount === void 0) return "Rp 0";
      return `Rp ${amount.toLocaleString("id-ID")}`;
    };
    const formatDate = (date) => {
      if (!date) return "-";
      return new Date(date).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const getBonusStatusBadge = (status) => {
      const variants = {
        pending: "secondary",
        released: "default",
        cancelled: "destructive"
      };
      return variants[status] || "outline";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: __props.customer.name
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="rounded-xl p-4 space-y-6 py-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="text-3xl font-bold"${_scopeId}>${ssrInterpolate(__props.customer.name)}</h1><p class="mt-2 text-muted-foreground"${_scopeId}> ID Ewallet: ${ssrInterpolate(__props.customer.ewallet_id)}</p></div><div class="flex gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(index).url()
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$2), { variant: "outline" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(ArrowLeft), { class: "mr-2 h-4 w-4" }, null, _parent4, _scopeId3));
                        _push4(` Kembali `);
                      } else {
                        return [
                          createVNode(unref(ArrowLeft), { class: "mr-2 h-4 w-4" }),
                          createTextVNode(" Kembali ")
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
                        createTextVNode(" Kembali ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(edit).url(__props.customer.id)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$2), { variant: "outline" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Pencil), { class: "mr-2 h-4 w-4" }, null, _parent4, _scopeId3));
                        _push4(` Edit `);
                      } else {
                        return [
                          createVNode(unref(Pencil), { class: "mr-2 h-4 w-4" }),
                          createTextVNode(" Edit ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$2), { variant: "outline" }, {
                      default: withCtx(() => [
                        createVNode(unref(Pencil), { class: "mr-2 h-4 w-4" }),
                        createTextVNode(" Edit ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              variant: "destructive",
              onClick: ($event) => deleteDialog.value = true
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Trash2), { class: "mr-2 h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(` Hapus `);
                } else {
                  return [
                    createVNode(unref(Trash2), { class: "mr-2 h-4 w-4" }),
                    createTextVNode(" Hapus ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$3), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Saldo Ewallet`);
                            } else {
                              return [
                                createTextVNode("Saldo Ewallet")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(Wallet), { class: "h-4 w-4 text-muted-foreground" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Saldo Ewallet")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(Wallet), { class: "h-4 w-4 text-muted-foreground" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-2xl font-bold"${_scopeId3}>${ssrInterpolate(formatCurrency(__props.customer.ewallet_saldo || 0))}</div><p class="text-xs text-muted-foreground mt-1"${_scopeId3}>`);
                        if (__props.customer.email_verified_at) {
                          _push4(ssrRenderComponent(unref(_sfc_main$7), {
                            variant: "default",
                            class: "text-xs"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` Terverifikasi `);
                              } else {
                                return [
                                  createTextVNode(" Terverifikasi ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(ssrRenderComponent(unref(_sfc_main$7), {
                            variant: "secondary",
                            class: "text-xs"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` Belum Verifikasi `);
                              } else {
                                return [
                                  createTextVNode(" Belum Verifikasi ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        }
                        _push4(`</p>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatCurrency(__props.customer.ewallet_saldo || 0)), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground mt-1" }, [
                            __props.customer.email_verified_at ? (openBlock(), createBlock(unref(_sfc_main$7), {
                              key: 0,
                              variant: "default",
                              class: "text-xs"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Terverifikasi ")
                              ]),
                              _: 1
                            })) : (openBlock(), createBlock(unref(_sfc_main$7), {
                              key: 1,
                              variant: "secondary",
                              class: "text-xs"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Belum Verifikasi ")
                              ]),
                              _: 1
                            }))
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$4), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                          default: withCtx(() => [
                            createTextVNode("Saldo Ewallet")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(Wallet), { class: "h-4 w-4 text-muted-foreground" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatCurrency(__props.customer.ewallet_saldo || 0)), 1),
                        createVNode("p", { class: "text-xs text-muted-foreground mt-1" }, [
                          __props.customer.email_verified_at ? (openBlock(), createBlock(unref(_sfc_main$7), {
                            key: 0,
                            variant: "default",
                            class: "text-xs"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Terverifikasi ")
                            ]),
                            _: 1
                          })) : (openBlock(), createBlock(unref(_sfc_main$7), {
                            key: 1,
                            variant: "secondary",
                            class: "text-xs"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Belum Verifikasi ")
                            ]),
                            _: 1
                          }))
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
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Total Downlines`);
                            } else {
                              return [
                                createTextVNode("Total Downlines")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(Users), { class: "h-4 w-4 text-muted-foreground" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Total Downlines")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(Users), { class: "h-4 w-4 text-muted-foreground" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-2xl font-bold"${_scopeId3}>${ssrInterpolate(__props.statistics?.totalDownlines || 0)}</div><p class="text-xs text-muted-foreground mt-1"${_scopeId3}> Kiri: ${ssrInterpolate(__props.statistics?.leftDownlines || 0)} | Kanan: ${ssrInterpolate(__props.statistics?.rightDownlines || 0)}</p>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics?.totalDownlines || 0), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground mt-1" }, " Kiri: " + toDisplayString(__props.statistics?.leftDownlines || 0) + " | Kanan: " + toDisplayString(__props.statistics?.rightDownlines || 0), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$4), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                          default: withCtx(() => [
                            createTextVNode("Total Downlines")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(Users), { class: "h-4 w-4 text-muted-foreground" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics?.totalDownlines || 0), 1),
                        createVNode("p", { class: "text-xs text-muted-foreground mt-1" }, " Kiri: " + toDisplayString(__props.statistics?.leftDownlines || 0) + " | Kanan: " + toDisplayString(__props.statistics?.rightDownlines || 0), 1)
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
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Total Bonus`);
                            } else {
                              return [
                                createTextVNode("Total Bonus")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(Gift), { class: "h-4 w-4 text-muted-foreground" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Total Bonus")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(Gift), { class: "h-4 w-4 text-muted-foreground" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-2xl font-bold"${_scopeId3}>${ssrInterpolate(formatCurrency(__props.statistics?.totalBonuses || 0))}</div><p class="text-xs text-muted-foreground mt-1"${_scopeId3}> Bulan ini: ${ssrInterpolate(formatCurrency(__props.statistics?.totalBonusesThisMonth || 0))}</p>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatCurrency(__props.statistics?.totalBonuses || 0)), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground mt-1" }, " Bulan ini: " + toDisplayString(formatCurrency(__props.statistics?.totalBonusesThisMonth || 0)), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$4), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                          default: withCtx(() => [
                            createTextVNode("Total Bonus")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(Gift), { class: "h-4 w-4 text-muted-foreground" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatCurrency(__props.statistics?.totalBonuses || 0)), 1),
                        createVNode("p", { class: "text-xs text-muted-foreground mt-1" }, " Bulan ini: " + toDisplayString(formatCurrency(__props.statistics?.totalBonusesThisMonth || 0)), 1)
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
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Level Matrix`);
                            } else {
                              return [
                                createTextVNode("Level Matrix")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(TrendingUp), { class: "h-4 w-4 text-muted-foreground" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Level Matrix")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(TrendingUp), { class: "h-4 w-4 text-muted-foreground" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-2xl font-bold"${_scopeId3}>Level ${ssrInterpolate(__props.statistics?.matrixLevel || 0)}</div><p class="text-xs text-muted-foreground mt-1"${_scopeId3}> Posisi: ${ssrInterpolate(__props.customer.position ? __props.customer.position === "left" ? "Kiri" : "Kanan" : "-")}</p>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-2xl font-bold" }, "Level " + toDisplayString(__props.statistics?.matrixLevel || 0), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground mt-1" }, " Posisi: " + toDisplayString(__props.customer.position ? __props.customer.position === "left" ? "Kiri" : "Kanan" : "-"), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$4), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                          default: withCtx(() => [
                            createTextVNode("Level Matrix")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(TrendingUp), { class: "h-4 w-4 text-muted-foreground" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-2xl font-bold" }, "Level " + toDisplayString(__props.statistics?.matrixLevel || 0), 1),
                        createVNode("p", { class: "text-xs text-muted-foreground mt-1" }, " Posisi: " + toDisplayString(__props.customer.position ? __props.customer.position === "left" ? "Kiri" : "Kanan" : "-"), 1)
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
                        _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Aksi Ewallet`);
                            } else {
                              return [
                                createTextVNode("Aksi Ewallet")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$8), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Kelola saldo dan bonus pelanggan`);
                            } else {
                              return [
                                createTextVNode("Kelola saldo dan bonus pelanggan")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Aksi Ewallet")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              createTextVNode("Kelola saldo dan bonus pelanggan")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { class: "flex gap-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$2), { onClick: handleReleaseBonuses }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Gift), { class: "mr-2 h-4 w-4" }, null, _parent5, _scopeId4));
                              _push5(` Release Bonuses `);
                            } else {
                              return [
                                createVNode(unref(Gift), { class: "mr-2 h-4 w-4" }),
                                createTextVNode(" Release Bonuses ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$2), {
                          variant: "outline",
                          onClick: ($event) => topUpDialog.value = true
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(DollarSign), { class: "mr-2 h-4 w-4" }, null, _parent5, _scopeId4));
                              _push5(` Top Up `);
                            } else {
                              return [
                                createVNode(unref(DollarSign), { class: "mr-2 h-4 w-4" }),
                                createTextVNode(" Top Up ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$2), {
                          variant: "outline",
                          onClick: ($event) => deductDialog.value = true
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(DollarSign), { class: "mr-2 h-4 w-4" }, null, _parent5, _scopeId4));
                              _push5(` Deduct `);
                            } else {
                              return [
                                createVNode(unref(DollarSign), { class: "mr-2 h-4 w-4" }),
                                createTextVNode(" Deduct ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$2), { onClick: handleReleaseBonuses }, {
                            default: withCtx(() => [
                              createVNode(unref(Gift), { class: "mr-2 h-4 w-4" }),
                              createTextVNode(" Release Bonuses ")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$2), {
                            variant: "outline",
                            onClick: ($event) => topUpDialog.value = true
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(DollarSign), { class: "mr-2 h-4 w-4" }),
                              createTextVNode(" Top Up ")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(unref(_sfc_main$2), {
                            variant: "outline",
                            onClick: ($event) => deductDialog.value = true
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(DollarSign), { class: "mr-2 h-4 w-4" }),
                              createTextVNode(" Deduct ")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
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
                            createTextVNode("Aksi Ewallet")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), null, {
                          default: withCtx(() => [
                            createTextVNode("Kelola saldo dan bonus pelanggan")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), { class: "flex gap-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$2), { onClick: handleReleaseBonuses }, {
                          default: withCtx(() => [
                            createVNode(unref(Gift), { class: "mr-2 h-4 w-4" }),
                            createTextVNode(" Release Bonuses ")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$2), {
                          variant: "outline",
                          onClick: ($event) => topUpDialog.value = true
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(DollarSign), { class: "mr-2 h-4 w-4" }),
                            createTextVNode(" Top Up ")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(unref(_sfc_main$2), {
                          variant: "outline",
                          onClick: ($event) => deductDialog.value = true
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(DollarSign), { class: "mr-2 h-4 w-4" }),
                            createTextVNode(" Deduct ")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="grid gap-6 lg:grid-cols-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$3), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Informasi Pelanggan`);
                            } else {
                              return [
                                createTextVNode("Informasi Pelanggan")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Informasi Pelanggan")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { class: "space-y-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Email`);
                            } else {
                              return [
                                createTextVNode("Email")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<p class="mt-1 font-medium"${_scopeId3}>${ssrInterpolate(__props.customer.email)}</p></div><div${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`No. Telepon`);
                            } else {
                              return [
                                createTextVNode("No. Telepon")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<p class="mt-1 font-medium"${_scopeId3}>${ssrInterpolate(__props.customer.phone || "-")}</p></div><div${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Terdaftar`);
                            } else {
                              return [
                                createTextVNode("Terdaftar")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<p class="mt-1 font-medium"${_scopeId3}>${ssrInterpolate(formatDate(__props.customer.created_at))}</p></div><div${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Terakhir Update`);
                            } else {
                              return [
                                createTextVNode("Terakhir Update")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<p class="mt-1 font-medium"${_scopeId3}>${ssrInterpolate(formatDate(__props.customer.updated_at))}</p></div>`);
                        if (__props.customer.description) {
                          _push4(`<div${_scopeId3}>`);
                          _push4(ssrRenderComponent(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Keterangan`);
                              } else {
                                return [
                                  createTextVNode("Keterangan")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`<p class="mt-1 font-medium"${_scopeId3}>${ssrInterpolate(__props.customer.description)}</p></div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode("div", null, [
                            createVNode(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                              default: withCtx(() => [
                                createTextVNode("Email")
                              ]),
                              _: 1
                            }),
                            createVNode("p", { class: "mt-1 font-medium" }, toDisplayString(__props.customer.email), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                              default: withCtx(() => [
                                createTextVNode("No. Telepon")
                              ]),
                              _: 1
                            }),
                            createVNode("p", { class: "mt-1 font-medium" }, toDisplayString(__props.customer.phone || "-"), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                              default: withCtx(() => [
                                createTextVNode("Terdaftar")
                              ]),
                              _: 1
                            }),
                            createVNode("p", { class: "mt-1 font-medium" }, toDisplayString(formatDate(__props.customer.created_at)), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                              default: withCtx(() => [
                                createTextVNode("Terakhir Update")
                              ]),
                              _: 1
                            }),
                            createVNode("p", { class: "mt-1 font-medium" }, toDisplayString(formatDate(__props.customer.updated_at)), 1)
                          ]),
                          __props.customer.description ? (openBlock(), createBlock("div", { key: 0 }, [
                            createVNode(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                              default: withCtx(() => [
                                createTextVNode("Keterangan")
                              ]),
                              _: 1
                            }),
                            createVNode("p", { class: "mt-1 font-medium" }, toDisplayString(__props.customer.description), 1)
                          ])) : createCommentVNode("", true)
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
                            createTextVNode("Informasi Pelanggan")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), { class: "space-y-4" }, {
                      default: withCtx(() => [
                        createVNode("div", null, [
                          createVNode(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                            default: withCtx(() => [
                              createTextVNode("Email")
                            ]),
                            _: 1
                          }),
                          createVNode("p", { class: "mt-1 font-medium" }, toDisplayString(__props.customer.email), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                            default: withCtx(() => [
                              createTextVNode("No. Telepon")
                            ]),
                            _: 1
                          }),
                          createVNode("p", { class: "mt-1 font-medium" }, toDisplayString(__props.customer.phone || "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                            default: withCtx(() => [
                              createTextVNode("Terdaftar")
                            ]),
                            _: 1
                          }),
                          createVNode("p", { class: "mt-1 font-medium" }, toDisplayString(formatDate(__props.customer.created_at)), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                            default: withCtx(() => [
                              createTextVNode("Terakhir Update")
                            ]),
                            _: 1
                          }),
                          createVNode("p", { class: "mt-1 font-medium" }, toDisplayString(formatDate(__props.customer.updated_at)), 1)
                        ]),
                        __props.customer.description ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                            default: withCtx(() => [
                              createTextVNode("Keterangan")
                            ]),
                            _: 1
                          }),
                          createVNode("p", { class: "mt-1 font-medium" }, toDisplayString(__props.customer.description), 1)
                        ])) : createCommentVNode("", true)
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
                        _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Jaringan MLM`);
                            } else {
                              return [
                                createTextVNode("Jaringan MLM")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Jaringan MLM")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { class: "space-y-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Sponsor`);
                            } else {
                              return [
                                createTextVNode("Sponsor")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        if (__props.customer.sponsor) {
                          _push4(`<div class="mt-1 rounded-md border bg-muted p-3"${_scopeId3}><p class="font-medium"${_scopeId3}>${ssrInterpolate(__props.customer.sponsor.name)}</p><p class="text-sm text-muted-foreground"${_scopeId3}>${ssrInterpolate(__props.customer.sponsor.ewallet_id)}</p></div>`);
                        } else {
                          _push4(`<p class="mt-1 font-medium"${_scopeId3}>-</p>`);
                        }
                        _push4(`</div><div${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Upline`);
                            } else {
                              return [
                                createTextVNode("Upline")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        if (__props.customer.upline) {
                          _push4(`<div class="mt-1 rounded-md border bg-muted p-3"${_scopeId3}><p class="font-medium"${_scopeId3}>${ssrInterpolate(__props.customer.upline.name)}</p><p class="text-sm text-muted-foreground"${_scopeId3}>${ssrInterpolate(__props.customer.upline.ewallet_id)}</p></div>`);
                        } else {
                          _push4(`<p class="mt-1 font-medium"${_scopeId3}>-</p>`);
                        }
                        _push4(`</div><div${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Posisi Binary`);
                            } else {
                              return [
                                createTextVNode("Posisi Binary")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<div class="mt-1"${_scopeId3}>`);
                        if (__props.customer.position) {
                          _push4(ssrRenderComponent(unref(_sfc_main$7), { variant: "outline" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(__props.customer.position === "left" ? "Kiri" : "Kanan")}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(__props.customer.position === "left" ? "Kiri" : "Kanan"), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<span${_scopeId3}>-</span>`);
                        }
                        _push4(`</div></div><div${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Level`);
                            } else {
                              return [
                                createTextVNode("Level")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<p class="mt-1 font-medium"${_scopeId3}>${ssrInterpolate(__props.customer.level || "-")}</p></div>`);
                      } else {
                        return [
                          createVNode("div", null, [
                            createVNode(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                              default: withCtx(() => [
                                createTextVNode("Sponsor")
                              ]),
                              _: 1
                            }),
                            __props.customer.sponsor ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-1 rounded-md border bg-muted p-3"
                            }, [
                              createVNode("p", { class: "font-medium" }, toDisplayString(__props.customer.sponsor.name), 1),
                              createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(__props.customer.sponsor.ewallet_id), 1)
                            ])) : (openBlock(), createBlock("p", {
                              key: 1,
                              class: "mt-1 font-medium"
                            }, "-"))
                          ]),
                          createVNode("div", null, [
                            createVNode(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                              default: withCtx(() => [
                                createTextVNode("Upline")
                              ]),
                              _: 1
                            }),
                            __props.customer.upline ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-1 rounded-md border bg-muted p-3"
                            }, [
                              createVNode("p", { class: "font-medium" }, toDisplayString(__props.customer.upline.name), 1),
                              createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(__props.customer.upline.ewallet_id), 1)
                            ])) : (openBlock(), createBlock("p", {
                              key: 1,
                              class: "mt-1 font-medium"
                            }, "-"))
                          ]),
                          createVNode("div", null, [
                            createVNode(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                              default: withCtx(() => [
                                createTextVNode("Posisi Binary")
                              ]),
                              _: 1
                            }),
                            createVNode("div", { class: "mt-1" }, [
                              __props.customer.position ? (openBlock(), createBlock(unref(_sfc_main$7), {
                                key: 0,
                                variant: "outline"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(__props.customer.position === "left" ? "Kiri" : "Kanan"), 1)
                                ]),
                                _: 1
                              })) : (openBlock(), createBlock("span", { key: 1 }, "-"))
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                              default: withCtx(() => [
                                createTextVNode("Level")
                              ]),
                              _: 1
                            }),
                            createVNode("p", { class: "mt-1 font-medium" }, toDisplayString(__props.customer.level || "-"), 1)
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
                            createTextVNode("Jaringan MLM")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), { class: "space-y-4" }, {
                      default: withCtx(() => [
                        createVNode("div", null, [
                          createVNode(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                            default: withCtx(() => [
                              createTextVNode("Sponsor")
                            ]),
                            _: 1
                          }),
                          __props.customer.sponsor ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-1 rounded-md border bg-muted p-3"
                          }, [
                            createVNode("p", { class: "font-medium" }, toDisplayString(__props.customer.sponsor.name), 1),
                            createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(__props.customer.sponsor.ewallet_id), 1)
                          ])) : (openBlock(), createBlock("p", {
                            key: 1,
                            class: "mt-1 font-medium"
                          }, "-"))
                        ]),
                        createVNode("div", null, [
                          createVNode(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                            default: withCtx(() => [
                              createTextVNode("Upline")
                            ]),
                            _: 1
                          }),
                          __props.customer.upline ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-1 rounded-md border bg-muted p-3"
                          }, [
                            createVNode("p", { class: "font-medium" }, toDisplayString(__props.customer.upline.name), 1),
                            createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(__props.customer.upline.ewallet_id), 1)
                          ])) : (openBlock(), createBlock("p", {
                            key: 1,
                            class: "mt-1 font-medium"
                          }, "-"))
                        ]),
                        createVNode("div", null, [
                          createVNode(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                            default: withCtx(() => [
                              createTextVNode("Posisi Binary")
                            ]),
                            _: 1
                          }),
                          createVNode("div", { class: "mt-1" }, [
                            __props.customer.position ? (openBlock(), createBlock(unref(_sfc_main$7), {
                              key: 0,
                              variant: "outline"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(__props.customer.position === "left" ? "Kiri" : "Kanan"), 1)
                              ]),
                              _: 1
                            })) : (openBlock(), createBlock("span", { key: 1 }, "-"))
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                            default: withCtx(() => [
                              createTextVNode("Level")
                            ]),
                            _: 1
                          }),
                          createVNode("p", { class: "mt-1 font-medium" }, toDisplayString(__props.customer.level || "-"), 1)
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
            if (__props.customer.addresses && __props.customer.addresses.length > 0) {
              _push2(ssrRenderComponent(unref(_sfc_main$3), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Alamat`);
                              } else {
                                return [
                                  createTextVNode("Alamat")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(_sfc_main$5), null, {
                              default: withCtx(() => [
                                createTextVNode("Alamat")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$6), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="space-y-3"${_scopeId3}><!--[-->`);
                          ssrRenderList(__props.customer.addresses, (address) => {
                            _push4(`<div class="rounded-lg border p-3"${_scopeId3}><div class="flex items-start justify-between"${_scopeId3}><div${_scopeId3}><div class="flex items-center gap-2"${_scopeId3}>`);
                            _push4(ssrRenderComponent(unref(_sfc_main$7), { variant: "outline" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(address.type)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(address.type), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            if (address.is_primary) {
                              _push4(ssrRenderComponent(unref(_sfc_main$7), { variant: "default" }, {
                                default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(`Primary`);
                                  } else {
                                    return [
                                      createTextVNode("Primary")
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                            } else {
                              _push4(`<!---->`);
                            }
                            _push4(`</div><p class="mt-2 text-sm"${_scopeId3}>${ssrInterpolate(address.address)}</p><p class="text-sm text-muted-foreground"${_scopeId3}>${ssrInterpolate(address.city)}, ${ssrInterpolate(address.province)} ${ssrInterpolate(address.postal_code)}</p></div></div></div>`);
                          });
                          _push4(`<!--]--></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "space-y-3" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.customer.addresses, (address) => {
                                return openBlock(), createBlock("div", {
                                  key: address.id,
                                  class: "rounded-lg border p-3"
                                }, [
                                  createVNode("div", { class: "flex items-start justify-between" }, [
                                    createVNode("div", null, [
                                      createVNode("div", { class: "flex items-center gap-2" }, [
                                        createVNode(unref(_sfc_main$7), { variant: "outline" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(address.type), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        address.is_primary ? (openBlock(), createBlock(unref(_sfc_main$7), {
                                          key: 0,
                                          variant: "default"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("Primary")
                                          ]),
                                          _: 1
                                        })) : createCommentVNode("", true)
                                      ]),
                                      createVNode("p", { class: "mt-2 text-sm" }, toDisplayString(address.address), 1),
                                      createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(address.city) + ", " + toDisplayString(address.province) + " " + toDisplayString(address.postal_code), 1)
                                    ])
                                  ])
                                ]);
                              }), 128))
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
                              createTextVNode("Alamat")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "space-y-3" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.customer.addresses, (address) => {
                              return openBlock(), createBlock("div", {
                                key: address.id,
                                class: "rounded-lg border p-3"
                              }, [
                                createVNode("div", { class: "flex items-start justify-between" }, [
                                  createVNode("div", null, [
                                    createVNode("div", { class: "flex items-center gap-2" }, [
                                      createVNode(unref(_sfc_main$7), { variant: "outline" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(address.type), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      address.is_primary ? (openBlock(), createBlock(unref(_sfc_main$7), {
                                        key: 0,
                                        variant: "default"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("Primary")
                                        ]),
                                        _: 1
                                      })) : createCommentVNode("", true)
                                    ]),
                                    createVNode("p", { class: "mt-2 text-sm" }, toDisplayString(address.address), 1),
                                    createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(address.city) + ", " + toDisplayString(address.province) + " " + toDisplayString(address.postal_code), 1)
                                  ])
                                ])
                              ]);
                            }), 128))
                          ])
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
            _push2(`<div class="grid gap-6 lg:grid-cols-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$3), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Bonus Regular`);
                            } else {
                              return [
                                createTextVNode("Bonus Regular")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$8), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Bonus regular yang diterima`);
                            } else {
                              return [
                                createTextVNode("Bonus regular yang diterima")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Bonus Regular")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              createTextVNode("Bonus regular yang diterima")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (__props.recentBonuses.regular.length > 0) {
                          _push4(`<div${_scopeId3}>`);
                          _push4(ssrRenderComponent(unref(_sfc_main$a), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(_sfc_main$b), null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(_sfc_main$c), null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(unref(_sfc_main$d), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`Jumlah`);
                                                } else {
                                                  return [
                                                    createTextVNode("Jumlah")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$d), null, {
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
                                            _push7(ssrRenderComponent(unref(_sfc_main$d), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`Dibuat`);
                                                } else {
                                                  return [
                                                    createTextVNode("Dibuat")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(unref(_sfc_main$d), null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Jumlah")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(unref(_sfc_main$d), null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Status")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(unref(_sfc_main$d), null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Dibuat")
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
                                        createVNode(unref(_sfc_main$c), null, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$d), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Jumlah")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$d), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Status")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$d), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Dibuat")
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
                                _push5(ssrRenderComponent(unref(_sfc_main$e), null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<!--[-->`);
                                      ssrRenderList(__props.recentBonuses.regular, (bonus) => {
                                        _push6(ssrRenderComponent(unref(_sfc_main$c), {
                                          key: bonus.id
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(unref(_sfc_main$f), { class: "font-medium" }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`${ssrInterpolate(formatCurrency(bonus.amount))}`);
                                                  } else {
                                                    return [
                                                      createTextVNode(toDisplayString(formatCurrency(bonus.amount)), 1)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                              _push7(ssrRenderComponent(unref(_sfc_main$f), null, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(unref(_sfc_main$7), {
                                                      variant: getBonusStatusBadge(bonus.status)
                                                    }, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(`${ssrInterpolate(bonus.status)}`);
                                                        } else {
                                                          return [
                                                            createTextVNode(toDisplayString(bonus.status), 1)
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                  } else {
                                                    return [
                                                      createVNode(unref(_sfc_main$7), {
                                                        variant: getBonusStatusBadge(bonus.status)
                                                      }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(bonus.status), 1)
                                                        ]),
                                                        _: 2
                                                      }, 1032, ["variant"])
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                              _push7(ssrRenderComponent(unref(_sfc_main$f), { class: "text-sm" }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`${ssrInterpolate(formatDate(bonus.created_at))}`);
                                                  } else {
                                                    return [
                                                      createTextVNode(toDisplayString(formatDate(bonus.created_at)), 1)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(unref(_sfc_main$f), { class: "font-medium" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(formatCurrency(bonus.amount)), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(unref(_sfc_main$f), null, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(_sfc_main$7), {
                                                      variant: getBonusStatusBadge(bonus.status)
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(bonus.status), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["variant"])
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(unref(_sfc_main$f), { class: "text-sm" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(formatDate(bonus.created_at)), 1)
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
                                        (openBlock(true), createBlock(Fragment, null, renderList(__props.recentBonuses.regular, (bonus) => {
                                          return openBlock(), createBlock(unref(_sfc_main$c), {
                                            key: bonus.id
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$f), { class: "font-medium" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(formatCurrency(bonus.amount)), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$f), null, {
                                                default: withCtx(() => [
                                                  createVNode(unref(_sfc_main$7), {
                                                    variant: getBonusStatusBadge(bonus.status)
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(bonus.status), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["variant"])
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$f), { class: "text-sm" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(formatDate(bonus.created_at)), 1)
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
                                  createVNode(unref(_sfc_main$b), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$c), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$d), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Jumlah")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$d), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Status")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$d), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Dibuat")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$e), null, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.recentBonuses.regular, (bonus) => {
                                        return openBlock(), createBlock(unref(_sfc_main$c), {
                                          key: bonus.id
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$f), { class: "font-medium" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(formatCurrency(bonus.amount)), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$f), null, {
                                              default: withCtx(() => [
                                                createVNode(unref(_sfc_main$7), {
                                                  variant: getBonusStatusBadge(bonus.status)
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(bonus.status), 1)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["variant"])
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$f), { class: "text-sm" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(formatDate(bonus.created_at)), 1)
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
                          _push4(`</div>`);
                        } else {
                          _push4(`<p class="text-center text-sm text-muted-foreground py-4"${_scopeId3}> Belum ada bonus regular </p>`);
                        }
                      } else {
                        return [
                          __props.recentBonuses.regular.length > 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                            createVNode(unref(_sfc_main$a), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$b), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$c), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$d), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Jumlah")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$d), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Status")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$d), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Dibuat")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.recentBonuses.regular, (bonus) => {
                                      return openBlock(), createBlock(unref(_sfc_main$c), {
                                        key: bonus.id
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$f), { class: "font-medium" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(formatCurrency(bonus.amount)), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$f), null, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$7), {
                                                variant: getBonusStatusBadge(bonus.status)
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(bonus.status), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["variant"])
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$f), { class: "text-sm" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(formatDate(bonus.created_at)), 1)
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
                          ])) : (openBlock(), createBlock("p", {
                            key: 1,
                            class: "text-center text-sm text-muted-foreground py-4"
                          }, " Belum ada bonus regular "))
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
                            createTextVNode("Bonus Regular")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), null, {
                          default: withCtx(() => [
                            createTextVNode("Bonus regular yang diterima")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), null, {
                      default: withCtx(() => [
                        __props.recentBonuses.regular.length > 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode(unref(_sfc_main$a), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$b), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$c), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$d), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Jumlah")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$d), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Status")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$d), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Dibuat")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$e), null, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.recentBonuses.regular, (bonus) => {
                                    return openBlock(), createBlock(unref(_sfc_main$c), {
                                      key: bonus.id
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$f), { class: "font-medium" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(formatCurrency(bonus.amount)), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$f), null, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$7), {
                                              variant: getBonusStatusBadge(bonus.status)
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(bonus.status), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["variant"])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$f), { class: "text-sm" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(formatDate(bonus.created_at)), 1)
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
                        ])) : (openBlock(), createBlock("p", {
                          key: 1,
                          class: "text-center text-sm text-muted-foreground py-4"
                        }, " Belum ada bonus regular "))
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
                        _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Bonus Matching`);
                            } else {
                              return [
                                createTextVNode("Bonus Matching")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$8), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Bonus matching yang diterima`);
                            } else {
                              return [
                                createTextVNode("Bonus matching yang diterima")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Bonus Matching")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              createTextVNode("Bonus matching yang diterima")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (__props.recentBonuses.matching.length > 0) {
                          _push4(`<div${_scopeId3}>`);
                          _push4(ssrRenderComponent(unref(_sfc_main$a), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(_sfc_main$b), null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(_sfc_main$c), null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(unref(_sfc_main$d), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`Jumlah`);
                                                } else {
                                                  return [
                                                    createTextVNode("Jumlah")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$d), null, {
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
                                            _push7(ssrRenderComponent(unref(_sfc_main$d), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`Dibuat`);
                                                } else {
                                                  return [
                                                    createTextVNode("Dibuat")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(unref(_sfc_main$d), null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Jumlah")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(unref(_sfc_main$d), null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Status")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(unref(_sfc_main$d), null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Dibuat")
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
                                        createVNode(unref(_sfc_main$c), null, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$d), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Jumlah")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$d), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Status")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$d), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Dibuat")
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
                                _push5(ssrRenderComponent(unref(_sfc_main$e), null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<!--[-->`);
                                      ssrRenderList(__props.recentBonuses.matching, (bonus) => {
                                        _push6(ssrRenderComponent(unref(_sfc_main$c), {
                                          key: bonus.id
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(unref(_sfc_main$f), { class: "font-medium" }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`${ssrInterpolate(formatCurrency(bonus.amount))}`);
                                                  } else {
                                                    return [
                                                      createTextVNode(toDisplayString(formatCurrency(bonus.amount)), 1)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                              _push7(ssrRenderComponent(unref(_sfc_main$f), null, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(unref(_sfc_main$7), {
                                                      variant: getBonusStatusBadge(bonus.status)
                                                    }, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(`${ssrInterpolate(bonus.status)}`);
                                                        } else {
                                                          return [
                                                            createTextVNode(toDisplayString(bonus.status), 1)
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                  } else {
                                                    return [
                                                      createVNode(unref(_sfc_main$7), {
                                                        variant: getBonusStatusBadge(bonus.status)
                                                      }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(bonus.status), 1)
                                                        ]),
                                                        _: 2
                                                      }, 1032, ["variant"])
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                              _push7(ssrRenderComponent(unref(_sfc_main$f), { class: "text-sm" }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`${ssrInterpolate(formatDate(bonus.created_at))}`);
                                                  } else {
                                                    return [
                                                      createTextVNode(toDisplayString(formatDate(bonus.created_at)), 1)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(unref(_sfc_main$f), { class: "font-medium" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(formatCurrency(bonus.amount)), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(unref(_sfc_main$f), null, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(_sfc_main$7), {
                                                      variant: getBonusStatusBadge(bonus.status)
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(bonus.status), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["variant"])
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(unref(_sfc_main$f), { class: "text-sm" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(formatDate(bonus.created_at)), 1)
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
                                        (openBlock(true), createBlock(Fragment, null, renderList(__props.recentBonuses.matching, (bonus) => {
                                          return openBlock(), createBlock(unref(_sfc_main$c), {
                                            key: bonus.id
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$f), { class: "font-medium" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(formatCurrency(bonus.amount)), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$f), null, {
                                                default: withCtx(() => [
                                                  createVNode(unref(_sfc_main$7), {
                                                    variant: getBonusStatusBadge(bonus.status)
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(bonus.status), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["variant"])
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$f), { class: "text-sm" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(formatDate(bonus.created_at)), 1)
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
                                  createVNode(unref(_sfc_main$b), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$c), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$d), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Jumlah")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$d), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Status")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$d), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Dibuat")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$e), null, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.recentBonuses.matching, (bonus) => {
                                        return openBlock(), createBlock(unref(_sfc_main$c), {
                                          key: bonus.id
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$f), { class: "font-medium" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(formatCurrency(bonus.amount)), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$f), null, {
                                              default: withCtx(() => [
                                                createVNode(unref(_sfc_main$7), {
                                                  variant: getBonusStatusBadge(bonus.status)
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(bonus.status), 1)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["variant"])
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$f), { class: "text-sm" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(formatDate(bonus.created_at)), 1)
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
                          _push4(`</div>`);
                        } else {
                          _push4(`<p class="text-center text-sm text-muted-foreground py-4"${_scopeId3}> Belum ada bonus matching </p>`);
                        }
                      } else {
                        return [
                          __props.recentBonuses.matching.length > 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                            createVNode(unref(_sfc_main$a), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$b), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$c), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$d), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Jumlah")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$d), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Status")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$d), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Dibuat")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.recentBonuses.matching, (bonus) => {
                                      return openBlock(), createBlock(unref(_sfc_main$c), {
                                        key: bonus.id
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$f), { class: "font-medium" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(formatCurrency(bonus.amount)), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$f), null, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$7), {
                                                variant: getBonusStatusBadge(bonus.status)
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(bonus.status), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["variant"])
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$f), { class: "text-sm" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(formatDate(bonus.created_at)), 1)
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
                          ])) : (openBlock(), createBlock("p", {
                            key: 1,
                            class: "text-center text-sm text-muted-foreground py-4"
                          }, " Belum ada bonus matching "))
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
                            createTextVNode("Bonus Matching")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), null, {
                          default: withCtx(() => [
                            createTextVNode("Bonus matching yang diterima")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), null, {
                      default: withCtx(() => [
                        __props.recentBonuses.matching.length > 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode(unref(_sfc_main$a), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$b), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$c), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$d), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Jumlah")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$d), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Status")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$d), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Dibuat")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$e), null, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.recentBonuses.matching, (bonus) => {
                                    return openBlock(), createBlock(unref(_sfc_main$c), {
                                      key: bonus.id
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$f), { class: "font-medium" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(formatCurrency(bonus.amount)), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$f), null, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$7), {
                                              variant: getBonusStatusBadge(bonus.status)
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(bonus.status), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["variant"])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$f), { class: "text-sm" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(formatDate(bonus.created_at)), 1)
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
                        ])) : (openBlock(), createBlock("p", {
                          key: 1,
                          class: "text-center text-sm text-muted-foreground py-4"
                        }, " Belum ada bonus matching "))
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
                        _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Bonus Pairing`);
                            } else {
                              return [
                                createTextVNode("Bonus Pairing")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$8), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Bonus pairing yang diterima`);
                            } else {
                              return [
                                createTextVNode("Bonus pairing yang diterima")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Bonus Pairing")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              createTextVNode("Bonus pairing yang diterima")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (__props.recentBonuses.pairing.length > 0) {
                          _push4(`<div${_scopeId3}>`);
                          _push4(ssrRenderComponent(unref(_sfc_main$a), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(_sfc_main$b), null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(_sfc_main$c), null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(unref(_sfc_main$d), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`Jumlah`);
                                                } else {
                                                  return [
                                                    createTextVNode("Jumlah")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$d), null, {
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
                                            _push7(ssrRenderComponent(unref(_sfc_main$d), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`Dibuat`);
                                                } else {
                                                  return [
                                                    createTextVNode("Dibuat")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(unref(_sfc_main$d), null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Jumlah")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(unref(_sfc_main$d), null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Status")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(unref(_sfc_main$d), null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Dibuat")
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
                                        createVNode(unref(_sfc_main$c), null, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$d), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Jumlah")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$d), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Status")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$d), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Dibuat")
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
                                _push5(ssrRenderComponent(unref(_sfc_main$e), null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<!--[-->`);
                                      ssrRenderList(__props.recentBonuses.pairing, (bonus) => {
                                        _push6(ssrRenderComponent(unref(_sfc_main$c), {
                                          key: bonus.id
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(unref(_sfc_main$f), { class: "font-medium" }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`${ssrInterpolate(formatCurrency(bonus.amount))}`);
                                                  } else {
                                                    return [
                                                      createTextVNode(toDisplayString(formatCurrency(bonus.amount)), 1)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                              _push7(ssrRenderComponent(unref(_sfc_main$f), null, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(unref(_sfc_main$7), {
                                                      variant: getBonusStatusBadge(bonus.status)
                                                    }, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(`${ssrInterpolate(bonus.status)}`);
                                                        } else {
                                                          return [
                                                            createTextVNode(toDisplayString(bonus.status), 1)
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                  } else {
                                                    return [
                                                      createVNode(unref(_sfc_main$7), {
                                                        variant: getBonusStatusBadge(bonus.status)
                                                      }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(bonus.status), 1)
                                                        ]),
                                                        _: 2
                                                      }, 1032, ["variant"])
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                              _push7(ssrRenderComponent(unref(_sfc_main$f), { class: "text-sm" }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`${ssrInterpolate(formatDate(bonus.created_at))}`);
                                                  } else {
                                                    return [
                                                      createTextVNode(toDisplayString(formatDate(bonus.created_at)), 1)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(unref(_sfc_main$f), { class: "font-medium" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(formatCurrency(bonus.amount)), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(unref(_sfc_main$f), null, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(_sfc_main$7), {
                                                      variant: getBonusStatusBadge(bonus.status)
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(bonus.status), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["variant"])
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(unref(_sfc_main$f), { class: "text-sm" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(formatDate(bonus.created_at)), 1)
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
                                        (openBlock(true), createBlock(Fragment, null, renderList(__props.recentBonuses.pairing, (bonus) => {
                                          return openBlock(), createBlock(unref(_sfc_main$c), {
                                            key: bonus.id
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$f), { class: "font-medium" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(formatCurrency(bonus.amount)), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$f), null, {
                                                default: withCtx(() => [
                                                  createVNode(unref(_sfc_main$7), {
                                                    variant: getBonusStatusBadge(bonus.status)
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(bonus.status), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["variant"])
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$f), { class: "text-sm" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(formatDate(bonus.created_at)), 1)
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
                                  createVNode(unref(_sfc_main$b), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$c), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$d), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Jumlah")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$d), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Status")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$d), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Dibuat")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$e), null, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.recentBonuses.pairing, (bonus) => {
                                        return openBlock(), createBlock(unref(_sfc_main$c), {
                                          key: bonus.id
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$f), { class: "font-medium" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(formatCurrency(bonus.amount)), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$f), null, {
                                              default: withCtx(() => [
                                                createVNode(unref(_sfc_main$7), {
                                                  variant: getBonusStatusBadge(bonus.status)
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(bonus.status), 1)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["variant"])
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$f), { class: "text-sm" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(formatDate(bonus.created_at)), 1)
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
                          _push4(`</div>`);
                        } else {
                          _push4(`<p class="text-center text-sm text-muted-foreground py-4"${_scopeId3}> Belum ada bonus pairing </p>`);
                        }
                      } else {
                        return [
                          __props.recentBonuses.pairing.length > 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                            createVNode(unref(_sfc_main$a), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$b), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$c), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$d), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Jumlah")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$d), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Status")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$d), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Dibuat")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.recentBonuses.pairing, (bonus) => {
                                      return openBlock(), createBlock(unref(_sfc_main$c), {
                                        key: bonus.id
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$f), { class: "font-medium" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(formatCurrency(bonus.amount)), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$f), null, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$7), {
                                                variant: getBonusStatusBadge(bonus.status)
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(bonus.status), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["variant"])
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$f), { class: "text-sm" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(formatDate(bonus.created_at)), 1)
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
                          ])) : (openBlock(), createBlock("p", {
                            key: 1,
                            class: "text-center text-sm text-muted-foreground py-4"
                          }, " Belum ada bonus pairing "))
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
                            createTextVNode("Bonus Pairing")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), null, {
                          default: withCtx(() => [
                            createTextVNode("Bonus pairing yang diterima")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), null, {
                      default: withCtx(() => [
                        __props.recentBonuses.pairing.length > 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode(unref(_sfc_main$a), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$b), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$c), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$d), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Jumlah")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$d), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Status")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$d), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Dibuat")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$e), null, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.recentBonuses.pairing, (bonus) => {
                                    return openBlock(), createBlock(unref(_sfc_main$c), {
                                      key: bonus.id
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$f), { class: "font-medium" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(formatCurrency(bonus.amount)), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$f), null, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$7), {
                                              variant: getBonusStatusBadge(bonus.status)
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(bonus.status), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["variant"])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$f), { class: "text-sm" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(formatDate(bonus.created_at)), 1)
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
                        ])) : (openBlock(), createBlock("p", {
                          key: 1,
                          class: "text-center text-sm text-muted-foreground py-4"
                        }, " Belum ada bonus pairing "))
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
                        _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Bonus Sponsor`);
                            } else {
                              return [
                                createTextVNode("Bonus Sponsor")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$8), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Bonus sponsor yang diterima`);
                            } else {
                              return [
                                createTextVNode("Bonus sponsor yang diterima")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Bonus Sponsor")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              createTextVNode("Bonus sponsor yang diterima")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (__props.recentBonuses.sponsor.length > 0) {
                          _push4(`<div${_scopeId3}>`);
                          _push4(ssrRenderComponent(unref(_sfc_main$a), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(_sfc_main$b), null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(_sfc_main$c), null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(unref(_sfc_main$d), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`Jumlah`);
                                                } else {
                                                  return [
                                                    createTextVNode("Jumlah")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$d), null, {
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
                                            _push7(ssrRenderComponent(unref(_sfc_main$d), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`Dibuat`);
                                                } else {
                                                  return [
                                                    createTextVNode("Dibuat")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(unref(_sfc_main$d), null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Jumlah")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(unref(_sfc_main$d), null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Status")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(unref(_sfc_main$d), null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Dibuat")
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
                                        createVNode(unref(_sfc_main$c), null, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$d), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Jumlah")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$d), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Status")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$d), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Dibuat")
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
                                _push5(ssrRenderComponent(unref(_sfc_main$e), null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<!--[-->`);
                                      ssrRenderList(__props.recentBonuses.sponsor, (bonus) => {
                                        _push6(ssrRenderComponent(unref(_sfc_main$c), {
                                          key: bonus.id
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(unref(_sfc_main$f), { class: "font-medium" }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`${ssrInterpolate(formatCurrency(bonus.amount))}`);
                                                  } else {
                                                    return [
                                                      createTextVNode(toDisplayString(formatCurrency(bonus.amount)), 1)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                              _push7(ssrRenderComponent(unref(_sfc_main$f), null, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(unref(_sfc_main$7), {
                                                      variant: getBonusStatusBadge(bonus.status)
                                                    }, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(`${ssrInterpolate(bonus.status)}`);
                                                        } else {
                                                          return [
                                                            createTextVNode(toDisplayString(bonus.status), 1)
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                  } else {
                                                    return [
                                                      createVNode(unref(_sfc_main$7), {
                                                        variant: getBonusStatusBadge(bonus.status)
                                                      }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(bonus.status), 1)
                                                        ]),
                                                        _: 2
                                                      }, 1032, ["variant"])
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                              _push7(ssrRenderComponent(unref(_sfc_main$f), { class: "text-sm" }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`${ssrInterpolate(formatDate(bonus.created_at))}`);
                                                  } else {
                                                    return [
                                                      createTextVNode(toDisplayString(formatDate(bonus.created_at)), 1)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(unref(_sfc_main$f), { class: "font-medium" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(formatCurrency(bonus.amount)), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(unref(_sfc_main$f), null, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(_sfc_main$7), {
                                                      variant: getBonusStatusBadge(bonus.status)
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(bonus.status), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["variant"])
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(unref(_sfc_main$f), { class: "text-sm" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(formatDate(bonus.created_at)), 1)
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
                                        (openBlock(true), createBlock(Fragment, null, renderList(__props.recentBonuses.sponsor, (bonus) => {
                                          return openBlock(), createBlock(unref(_sfc_main$c), {
                                            key: bonus.id
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$f), { class: "font-medium" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(formatCurrency(bonus.amount)), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$f), null, {
                                                default: withCtx(() => [
                                                  createVNode(unref(_sfc_main$7), {
                                                    variant: getBonusStatusBadge(bonus.status)
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(bonus.status), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["variant"])
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$f), { class: "text-sm" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(formatDate(bonus.created_at)), 1)
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
                                  createVNode(unref(_sfc_main$b), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$c), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$d), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Jumlah")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$d), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Status")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$d), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Dibuat")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$e), null, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.recentBonuses.sponsor, (bonus) => {
                                        return openBlock(), createBlock(unref(_sfc_main$c), {
                                          key: bonus.id
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$f), { class: "font-medium" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(formatCurrency(bonus.amount)), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$f), null, {
                                              default: withCtx(() => [
                                                createVNode(unref(_sfc_main$7), {
                                                  variant: getBonusStatusBadge(bonus.status)
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(bonus.status), 1)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["variant"])
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$f), { class: "text-sm" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(formatDate(bonus.created_at)), 1)
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
                          _push4(`</div>`);
                        } else {
                          _push4(`<p class="text-center text-sm text-muted-foreground py-4"${_scopeId3}> Belum ada bonus sponsor </p>`);
                        }
                      } else {
                        return [
                          __props.recentBonuses.sponsor.length > 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                            createVNode(unref(_sfc_main$a), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$b), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$c), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$d), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Jumlah")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$d), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Status")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$d), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Dibuat")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.recentBonuses.sponsor, (bonus) => {
                                      return openBlock(), createBlock(unref(_sfc_main$c), {
                                        key: bonus.id
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$f), { class: "font-medium" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(formatCurrency(bonus.amount)), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$f), null, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$7), {
                                                variant: getBonusStatusBadge(bonus.status)
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(bonus.status), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["variant"])
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$f), { class: "text-sm" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(formatDate(bonus.created_at)), 1)
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
                          ])) : (openBlock(), createBlock("p", {
                            key: 1,
                            class: "text-center text-sm text-muted-foreground py-4"
                          }, " Belum ada bonus sponsor "))
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
                            createTextVNode("Bonus Sponsor")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), null, {
                          default: withCtx(() => [
                            createTextVNode("Bonus sponsor yang diterima")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), null, {
                      default: withCtx(() => [
                        __props.recentBonuses.sponsor.length > 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode(unref(_sfc_main$a), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$b), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$c), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$d), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Jumlah")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$d), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Status")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$d), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Dibuat")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$e), null, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.recentBonuses.sponsor, (bonus) => {
                                    return openBlock(), createBlock(unref(_sfc_main$c), {
                                      key: bonus.id
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$f), { class: "font-medium" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(formatCurrency(bonus.amount)), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$f), null, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$7), {
                                              variant: getBonusStatusBadge(bonus.status)
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(bonus.status), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["variant"])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$f), { class: "text-sm" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(formatDate(bonus.created_at)), 1)
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
                        ])) : (openBlock(), createBlock("p", {
                          key: 1,
                          class: "text-center text-sm text-muted-foreground py-4"
                        }, " Belum ada bonus sponsor "))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (__props.downlineTree) {
              _push2(ssrRenderComponent(unref(_sfc_main$3), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Genealogy Tree`);
                              } else {
                                return [
                                  createTextVNode("Genealogy Tree")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$8), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Visualisasi downline dalam binary tree`);
                              } else {
                                return [
                                  createTextVNode("Visualisasi downline dalam binary tree")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(_sfc_main$5), null, {
                              default: withCtx(() => [
                                createTextVNode("Genealogy Tree")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$8), null, {
                              default: withCtx(() => [
                                createTextVNode("Visualisasi downline dalam binary tree")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$6), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="overflow-x-auto"${_scopeId3}><pre class="text-sm"${_scopeId3}>${ssrInterpolate(JSON.stringify(__props.downlineTree, null, 2))}</pre></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "overflow-x-auto" }, [
                              createVNode("pre", { class: "text-sm" }, toDisplayString(JSON.stringify(__props.downlineTree, null, 2)), 1)
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
                              createTextVNode("Genealogy Tree")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              createTextVNode("Visualisasi downline dalam binary tree")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "overflow-x-auto" }, [
                            createVNode("pre", { class: "text-sm" }, toDisplayString(JSON.stringify(__props.downlineTree, null, 2)), 1)
                          ])
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
            _push2(ssrRenderComponent(unref(_sfc_main$g), {
              open: topUpDialog.value,
              "onUpdate:open": ($event) => topUpDialog.value = $event
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$h), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$i), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$j), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Top Up Saldo`);
                                  } else {
                                    return [
                                      createTextVNode("Top Up Saldo")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$k), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Tambahkan saldo ke ewallet ${ssrInterpolate(__props.customer.name)}`);
                                  } else {
                                    return [
                                      createTextVNode(" Tambahkan saldo ke ewallet " + toDisplayString(__props.customer.name), 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$j), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Top Up Saldo")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$k), null, {
                                  default: withCtx(() => [
                                    createTextVNode(" Tambahkan saldo ke ewallet " + toDisplayString(__props.customer.name), 1)
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<div class="space-y-4 py-4"${_scopeId3}><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { for: "topup-amount" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Jumlah *`);
                            } else {
                              return [
                                createTextVNode("Jumlah *")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$l), {
                          id: "topup-amount",
                          modelValue: topUpAmount.value,
                          "onUpdate:modelValue": ($event) => topUpAmount.value = $event,
                          modelModifiers: { number: true },
                          type: "number",
                          min: "0",
                          step: "1000",
                          placeholder: "Masukkan jumlah"
                        }, null, _parent4, _scopeId3));
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { for: "topup-description" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Keterangan`);
                            } else {
                              return [
                                createTextVNode("Keterangan")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<textarea id="topup-description" placeholder="Keterangan (opsional)" rows="3" class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"${_scopeId3}>${ssrInterpolate(topUpDescription.value)}</textarea></div></div>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$m), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$2), {
                                variant: "outline",
                                onClick: ($event) => topUpDialog.value = false
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Batal`);
                                  } else {
                                    return [
                                      createTextVNode("Batal")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$2), { onClick: handleTopUp }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Top Up`);
                                  } else {
                                    return [
                                      createTextVNode("Top Up")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$2), {
                                  variant: "outline",
                                  onClick: ($event) => topUpDialog.value = false
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Batal")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"]),
                                createVNode(unref(_sfc_main$2), { onClick: handleTopUp }, {
                                  default: withCtx(() => [
                                    createTextVNode("Top Up")
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
                          createVNode(unref(_sfc_main$i), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$j), null, {
                                default: withCtx(() => [
                                  createTextVNode("Top Up Saldo")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$k), null, {
                                default: withCtx(() => [
                                  createTextVNode(" Tambahkan saldo ke ewallet " + toDisplayString(__props.customer.name), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode("div", { class: "space-y-4 py-4" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), { for: "topup-amount" }, {
                                default: withCtx(() => [
                                  createTextVNode("Jumlah *")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$l), {
                                id: "topup-amount",
                                modelValue: topUpAmount.value,
                                "onUpdate:modelValue": ($event) => topUpAmount.value = $event,
                                modelModifiers: { number: true },
                                type: "number",
                                min: "0",
                                step: "1000",
                                placeholder: "Masukkan jumlah"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), { for: "topup-description" }, {
                                default: withCtx(() => [
                                  createTextVNode("Keterangan")
                                ]),
                                _: 1
                              }),
                              withDirectives(createVNode("textarea", {
                                id: "topup-description",
                                "onUpdate:modelValue": ($event) => topUpDescription.value = $event,
                                placeholder: "Keterangan (opsional)",
                                rows: "3",
                                class: "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, topUpDescription.value]
                              ])
                            ])
                          ]),
                          createVNode(unref(_sfc_main$m), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$2), {
                                variant: "outline",
                                onClick: ($event) => topUpDialog.value = false
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Batal")
                                ]),
                                _: 1
                              }, 8, ["onClick"]),
                              createVNode(unref(_sfc_main$2), { onClick: handleTopUp }, {
                                default: withCtx(() => [
                                  createTextVNode("Top Up")
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
                } else {
                  return [
                    createVNode(unref(_sfc_main$h), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$i), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$j), null, {
                              default: withCtx(() => [
                                createTextVNode("Top Up Saldo")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$k), null, {
                              default: withCtx(() => [
                                createTextVNode(" Tambahkan saldo ke ewallet " + toDisplayString(__props.customer.name), 1)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "space-y-4 py-4" }, [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$9), { for: "topup-amount" }, {
                              default: withCtx(() => [
                                createTextVNode("Jumlah *")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$l), {
                              id: "topup-amount",
                              modelValue: topUpAmount.value,
                              "onUpdate:modelValue": ($event) => topUpAmount.value = $event,
                              modelModifiers: { number: true },
                              type: "number",
                              min: "0",
                              step: "1000",
                              placeholder: "Masukkan jumlah"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$9), { for: "topup-description" }, {
                              default: withCtx(() => [
                                createTextVNode("Keterangan")
                              ]),
                              _: 1
                            }),
                            withDirectives(createVNode("textarea", {
                              id: "topup-description",
                              "onUpdate:modelValue": ($event) => topUpDescription.value = $event,
                              placeholder: "Keterangan (opsional)",
                              rows: "3",
                              class: "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, topUpDescription.value]
                            ])
                          ])
                        ]),
                        createVNode(unref(_sfc_main$m), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$2), {
                              variant: "outline",
                              onClick: ($event) => topUpDialog.value = false
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Batal")
                              ]),
                              _: 1
                            }, 8, ["onClick"]),
                            createVNode(unref(_sfc_main$2), { onClick: handleTopUp }, {
                              default: withCtx(() => [
                                createTextVNode("Top Up")
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$g), {
              open: deductDialog.value,
              "onUpdate:open": ($event) => deductDialog.value = $event
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$h), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$i), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$j), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Kurangi Saldo`);
                                  } else {
                                    return [
                                      createTextVNode("Kurangi Saldo")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$k), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Kurangi saldo dari ewallet ${ssrInterpolate(__props.customer.name)}`);
                                  } else {
                                    return [
                                      createTextVNode(" Kurangi saldo dari ewallet " + toDisplayString(__props.customer.name), 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$j), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Kurangi Saldo")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$k), null, {
                                  default: withCtx(() => [
                                    createTextVNode(" Kurangi saldo dari ewallet " + toDisplayString(__props.customer.name), 1)
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<div class="space-y-4 py-4"${_scopeId3}><div class="rounded-md border bg-muted p-3"${_scopeId3}><p class="text-sm text-muted-foreground"${_scopeId3}>Saldo Saat Ini</p><p class="text-lg font-bold"${_scopeId3}>${ssrInterpolate(formatCurrency(__props.customer.ewallet_saldo || 0))}</p></div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { for: "deduct-amount" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Jumlah *`);
                            } else {
                              return [
                                createTextVNode("Jumlah *")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$l), {
                          id: "deduct-amount",
                          modelValue: deductAmount.value,
                          "onUpdate:modelValue": ($event) => deductAmount.value = $event,
                          modelModifiers: { number: true },
                          type: "number",
                          min: "0",
                          max: __props.customer.ewallet_saldo || 0,
                          step: "1000",
                          placeholder: "Masukkan jumlah"
                        }, null, _parent4, _scopeId3));
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { for: "deduct-description" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Keterangan`);
                            } else {
                              return [
                                createTextVNode("Keterangan")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<textarea id="deduct-description" placeholder="Keterangan (opsional)" rows="3" class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"${_scopeId3}>${ssrInterpolate(deductDescription.value)}</textarea></div></div>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$m), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$2), {
                                variant: "outline",
                                onClick: ($event) => deductDialog.value = false
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Batal`);
                                  } else {
                                    return [
                                      createTextVNode("Batal")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$2), {
                                variant: "destructive",
                                onClick: handleDeduct
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Kurangi`);
                                  } else {
                                    return [
                                      createTextVNode("Kurangi")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$2), {
                                  variant: "outline",
                                  onClick: ($event) => deductDialog.value = false
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Batal")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"]),
                                createVNode(unref(_sfc_main$2), {
                                  variant: "destructive",
                                  onClick: handleDeduct
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Kurangi")
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
                          createVNode(unref(_sfc_main$i), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$j), null, {
                                default: withCtx(() => [
                                  createTextVNode("Kurangi Saldo")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$k), null, {
                                default: withCtx(() => [
                                  createTextVNode(" Kurangi saldo dari ewallet " + toDisplayString(__props.customer.name), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode("div", { class: "space-y-4 py-4" }, [
                            createVNode("div", { class: "rounded-md border bg-muted p-3" }, [
                              createVNode("p", { class: "text-sm text-muted-foreground" }, "Saldo Saat Ini"),
                              createVNode("p", { class: "text-lg font-bold" }, toDisplayString(formatCurrency(__props.customer.ewallet_saldo || 0)), 1)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), { for: "deduct-amount" }, {
                                default: withCtx(() => [
                                  createTextVNode("Jumlah *")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$l), {
                                id: "deduct-amount",
                                modelValue: deductAmount.value,
                                "onUpdate:modelValue": ($event) => deductAmount.value = $event,
                                modelModifiers: { number: true },
                                type: "number",
                                min: "0",
                                max: __props.customer.ewallet_saldo || 0,
                                step: "1000",
                                placeholder: "Masukkan jumlah"
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "max"])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), { for: "deduct-description" }, {
                                default: withCtx(() => [
                                  createTextVNode("Keterangan")
                                ]),
                                _: 1
                              }),
                              withDirectives(createVNode("textarea", {
                                id: "deduct-description",
                                "onUpdate:modelValue": ($event) => deductDescription.value = $event,
                                placeholder: "Keterangan (opsional)",
                                rows: "3",
                                class: "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, deductDescription.value]
                              ])
                            ])
                          ]),
                          createVNode(unref(_sfc_main$m), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$2), {
                                variant: "outline",
                                onClick: ($event) => deductDialog.value = false
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Batal")
                                ]),
                                _: 1
                              }, 8, ["onClick"]),
                              createVNode(unref(_sfc_main$2), {
                                variant: "destructive",
                                onClick: handleDeduct
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Kurangi")
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
                } else {
                  return [
                    createVNode(unref(_sfc_main$h), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$i), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$j), null, {
                              default: withCtx(() => [
                                createTextVNode("Kurangi Saldo")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$k), null, {
                              default: withCtx(() => [
                                createTextVNode(" Kurangi saldo dari ewallet " + toDisplayString(__props.customer.name), 1)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "space-y-4 py-4" }, [
                          createVNode("div", { class: "rounded-md border bg-muted p-3" }, [
                            createVNode("p", { class: "text-sm text-muted-foreground" }, "Saldo Saat Ini"),
                            createVNode("p", { class: "text-lg font-bold" }, toDisplayString(formatCurrency(__props.customer.ewallet_saldo || 0)), 1)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$9), { for: "deduct-amount" }, {
                              default: withCtx(() => [
                                createTextVNode("Jumlah *")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$l), {
                              id: "deduct-amount",
                              modelValue: deductAmount.value,
                              "onUpdate:modelValue": ($event) => deductAmount.value = $event,
                              modelModifiers: { number: true },
                              type: "number",
                              min: "0",
                              max: __props.customer.ewallet_saldo || 0,
                              step: "1000",
                              placeholder: "Masukkan jumlah"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "max"])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$9), { for: "deduct-description" }, {
                              default: withCtx(() => [
                                createTextVNode("Keterangan")
                              ]),
                              _: 1
                            }),
                            withDirectives(createVNode("textarea", {
                              id: "deduct-description",
                              "onUpdate:modelValue": ($event) => deductDescription.value = $event,
                              placeholder: "Keterangan (opsional)",
                              rows: "3",
                              class: "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, deductDescription.value]
                            ])
                          ])
                        ]),
                        createVNode(unref(_sfc_main$m), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$2), {
                              variant: "outline",
                              onClick: ($event) => deductDialog.value = false
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Batal")
                              ]),
                              _: 1
                            }, 8, ["onClick"]),
                            createVNode(unref(_sfc_main$2), {
                              variant: "destructive",
                              onClick: handleDeduct
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Kurangi")
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$g), {
              open: deleteDialog.value,
              "onUpdate:open": ($event) => deleteDialog.value = $event
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$h), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$i), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$j), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Hapus Pelanggan`);
                                  } else {
                                    return [
                                      createTextVNode("Hapus Pelanggan")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$k), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Apakah Anda yakin ingin menghapus pelanggan ini? Tindakan ini tidak dapat dibatalkan. `);
                                  } else {
                                    return [
                                      createTextVNode(" Apakah Anda yakin ingin menghapus pelanggan ini? Tindakan ini tidak dapat dibatalkan. ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$j), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Hapus Pelanggan")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$k), null, {
                                  default: withCtx(() => [
                                    createTextVNode(" Apakah Anda yakin ingin menghapus pelanggan ini? Tindakan ini tidak dapat dibatalkan. ")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$m), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$2), {
                                variant: "outline",
                                onClick: ($event) => deleteDialog.value = false
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Batal`);
                                  } else {
                                    return [
                                      createTextVNode("Batal")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$2), {
                                variant: "destructive",
                                onClick: handleDelete
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Hapus`);
                                  } else {
                                    return [
                                      createTextVNode("Hapus")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$2), {
                                  variant: "outline",
                                  onClick: ($event) => deleteDialog.value = false
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Batal")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"]),
                                createVNode(unref(_sfc_main$2), {
                                  variant: "destructive",
                                  onClick: handleDelete
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Hapus")
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
                          createVNode(unref(_sfc_main$i), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$j), null, {
                                default: withCtx(() => [
                                  createTextVNode("Hapus Pelanggan")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$k), null, {
                                default: withCtx(() => [
                                  createTextVNode(" Apakah Anda yakin ingin menghapus pelanggan ini? Tindakan ini tidak dapat dibatalkan. ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$m), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$2), {
                                variant: "outline",
                                onClick: ($event) => deleteDialog.value = false
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Batal")
                                ]),
                                _: 1
                              }, 8, ["onClick"]),
                              createVNode(unref(_sfc_main$2), {
                                variant: "destructive",
                                onClick: handleDelete
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Hapus")
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
                } else {
                  return [
                    createVNode(unref(_sfc_main$h), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$i), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$j), null, {
                              default: withCtx(() => [
                                createTextVNode("Hapus Pelanggan")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$k), null, {
                              default: withCtx(() => [
                                createTextVNode(" Apakah Anda yakin ingin menghapus pelanggan ini? Tindakan ini tidak dapat dibatalkan. ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$m), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$2), {
                              variant: "outline",
                              onClick: ($event) => deleteDialog.value = false
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Batal")
                              ]),
                              _: 1
                            }, 8, ["onClick"]),
                            createVNode(unref(_sfc_main$2), {
                              variant: "destructive",
                              onClick: handleDelete
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Hapus")
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "rounded-xl p-4 space-y-6 py-6" }, [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("div", null, [
                    createVNode("h1", { class: "text-3xl font-bold" }, toDisplayString(__props.customer.name), 1),
                    createVNode("p", { class: "mt-2 text-muted-foreground" }, " ID Ewallet: " + toDisplayString(__props.customer.ewallet_id), 1)
                  ]),
                  createVNode("div", { class: "flex gap-2" }, [
                    createVNode(unref(Link), {
                      href: unref(index).url()
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$2), { variant: "outline" }, {
                          default: withCtx(() => [
                            createVNode(unref(ArrowLeft), { class: "mr-2 h-4 w-4" }),
                            createTextVNode(" Kembali ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode(unref(Link), {
                      href: unref(edit).url(__props.customer.id)
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$2), { variant: "outline" }, {
                          default: withCtx(() => [
                            createVNode(unref(Pencil), { class: "mr-2 h-4 w-4" }),
                            createTextVNode(" Edit ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode(unref(_sfc_main$2), {
                      variant: "destructive",
                      onClick: ($event) => deleteDialog.value = true
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Trash2), { class: "mr-2 h-4 w-4" }),
                        createTextVNode(" Hapus ")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ])
                ]),
                createVNode("div", { class: "grid gap-4 md:grid-cols-2 lg:grid-cols-4" }, [
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$4), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Saldo Ewallet")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(Wallet), { class: "h-4 w-4 text-muted-foreground" })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatCurrency(__props.customer.ewallet_saldo || 0)), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground mt-1" }, [
                            __props.customer.email_verified_at ? (openBlock(), createBlock(unref(_sfc_main$7), {
                              key: 0,
                              variant: "default",
                              class: "text-xs"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Terverifikasi ")
                              ]),
                              _: 1
                            })) : (openBlock(), createBlock(unref(_sfc_main$7), {
                              key: 1,
                              variant: "secondary",
                              class: "text-xs"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Belum Verifikasi ")
                              ]),
                              _: 1
                            }))
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$4), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Total Downlines")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(Users), { class: "h-4 w-4 text-muted-foreground" })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics?.totalDownlines || 0), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground mt-1" }, " Kiri: " + toDisplayString(__props.statistics?.leftDownlines || 0) + " | Kanan: " + toDisplayString(__props.statistics?.rightDownlines || 0), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$4), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Total Bonus")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(Gift), { class: "h-4 w-4 text-muted-foreground" })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatCurrency(__props.statistics?.totalBonuses || 0)), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground mt-1" }, " Bulan ini: " + toDisplayString(formatCurrency(__props.statistics?.totalBonusesThisMonth || 0)), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$4), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Level Matrix")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(TrendingUp), { class: "h-4 w-4 text-muted-foreground" })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-2xl font-bold" }, "Level " + toDisplayString(__props.statistics?.matrixLevel || 0), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground mt-1" }, " Posisi: " + toDisplayString(__props.customer.position ? __props.customer.position === "left" ? "Kiri" : "Kanan" : "-"), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                createVNode(unref(_sfc_main$3), null, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Aksi Ewallet")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), null, {
                          default: withCtx(() => [
                            createTextVNode("Kelola saldo dan bonus pelanggan")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), { class: "flex gap-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$2), { onClick: handleReleaseBonuses }, {
                          default: withCtx(() => [
                            createVNode(unref(Gift), { class: "mr-2 h-4 w-4" }),
                            createTextVNode(" Release Bonuses ")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$2), {
                          variant: "outline",
                          onClick: ($event) => topUpDialog.value = true
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(DollarSign), { class: "mr-2 h-4 w-4" }),
                            createTextVNode(" Top Up ")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(unref(_sfc_main$2), {
                          variant: "outline",
                          onClick: ($event) => deductDialog.value = true
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(DollarSign), { class: "mr-2 h-4 w-4" }),
                            createTextVNode(" Deduct ")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode("div", { class: "grid gap-6 lg:grid-cols-2" }, [
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$4), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Informasi Pelanggan")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), { class: "space-y-4" }, {
                        default: withCtx(() => [
                          createVNode("div", null, [
                            createVNode(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                              default: withCtx(() => [
                                createTextVNode("Email")
                              ]),
                              _: 1
                            }),
                            createVNode("p", { class: "mt-1 font-medium" }, toDisplayString(__props.customer.email), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                              default: withCtx(() => [
                                createTextVNode("No. Telepon")
                              ]),
                              _: 1
                            }),
                            createVNode("p", { class: "mt-1 font-medium" }, toDisplayString(__props.customer.phone || "-"), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                              default: withCtx(() => [
                                createTextVNode("Terdaftar")
                              ]),
                              _: 1
                            }),
                            createVNode("p", { class: "mt-1 font-medium" }, toDisplayString(formatDate(__props.customer.created_at)), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                              default: withCtx(() => [
                                createTextVNode("Terakhir Update")
                              ]),
                              _: 1
                            }),
                            createVNode("p", { class: "mt-1 font-medium" }, toDisplayString(formatDate(__props.customer.updated_at)), 1)
                          ]),
                          __props.customer.description ? (openBlock(), createBlock("div", { key: 0 }, [
                            createVNode(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                              default: withCtx(() => [
                                createTextVNode("Keterangan")
                              ]),
                              _: 1
                            }),
                            createVNode("p", { class: "mt-1 font-medium" }, toDisplayString(__props.customer.description), 1)
                          ])) : createCommentVNode("", true)
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
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Jaringan MLM")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), { class: "space-y-4" }, {
                        default: withCtx(() => [
                          createVNode("div", null, [
                            createVNode(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                              default: withCtx(() => [
                                createTextVNode("Sponsor")
                              ]),
                              _: 1
                            }),
                            __props.customer.sponsor ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-1 rounded-md border bg-muted p-3"
                            }, [
                              createVNode("p", { class: "font-medium" }, toDisplayString(__props.customer.sponsor.name), 1),
                              createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(__props.customer.sponsor.ewallet_id), 1)
                            ])) : (openBlock(), createBlock("p", {
                              key: 1,
                              class: "mt-1 font-medium"
                            }, "-"))
                          ]),
                          createVNode("div", null, [
                            createVNode(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                              default: withCtx(() => [
                                createTextVNode("Upline")
                              ]),
                              _: 1
                            }),
                            __props.customer.upline ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-1 rounded-md border bg-muted p-3"
                            }, [
                              createVNode("p", { class: "font-medium" }, toDisplayString(__props.customer.upline.name), 1),
                              createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(__props.customer.upline.ewallet_id), 1)
                            ])) : (openBlock(), createBlock("p", {
                              key: 1,
                              class: "mt-1 font-medium"
                            }, "-"))
                          ]),
                          createVNode("div", null, [
                            createVNode(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                              default: withCtx(() => [
                                createTextVNode("Posisi Binary")
                              ]),
                              _: 1
                            }),
                            createVNode("div", { class: "mt-1" }, [
                              __props.customer.position ? (openBlock(), createBlock(unref(_sfc_main$7), {
                                key: 0,
                                variant: "outline"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(__props.customer.position === "left" ? "Kiri" : "Kanan"), 1)
                                ]),
                                _: 1
                              })) : (openBlock(), createBlock("span", { key: 1 }, "-"))
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                              default: withCtx(() => [
                                createTextVNode("Level")
                              ]),
                              _: 1
                            }),
                            createVNode("p", { class: "mt-1 font-medium" }, toDisplayString(__props.customer.level || "-"), 1)
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                __props.customer.addresses && __props.customer.addresses.length > 0 ? (openBlock(), createBlock(unref(_sfc_main$3), { key: 0 }, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Alamat")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "space-y-3" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.customer.addresses, (address) => {
                            return openBlock(), createBlock("div", {
                              key: address.id,
                              class: "rounded-lg border p-3"
                            }, [
                              createVNode("div", { class: "flex items-start justify-between" }, [
                                createVNode("div", null, [
                                  createVNode("div", { class: "flex items-center gap-2" }, [
                                    createVNode(unref(_sfc_main$7), { variant: "outline" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(address.type), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    address.is_primary ? (openBlock(), createBlock(unref(_sfc_main$7), {
                                      key: 0,
                                      variant: "default"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("Primary")
                                      ]),
                                      _: 1
                                    })) : createCommentVNode("", true)
                                  ]),
                                  createVNode("p", { class: "mt-2 text-sm" }, toDisplayString(address.address), 1),
                                  createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(address.city) + ", " + toDisplayString(address.province) + " " + toDisplayString(address.postal_code), 1)
                                ])
                              ])
                            ]);
                          }), 128))
                        ])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })) : createCommentVNode("", true),
                createVNode("div", { class: "grid gap-6 lg:grid-cols-2" }, [
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$4), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Bonus Regular")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              createTextVNode("Bonus regular yang diterima")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), null, {
                        default: withCtx(() => [
                          __props.recentBonuses.regular.length > 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                            createVNode(unref(_sfc_main$a), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$b), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$c), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$d), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Jumlah")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$d), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Status")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$d), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Dibuat")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.recentBonuses.regular, (bonus) => {
                                      return openBlock(), createBlock(unref(_sfc_main$c), {
                                        key: bonus.id
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$f), { class: "font-medium" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(formatCurrency(bonus.amount)), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$f), null, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$7), {
                                                variant: getBonusStatusBadge(bonus.status)
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(bonus.status), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["variant"])
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$f), { class: "text-sm" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(formatDate(bonus.created_at)), 1)
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
                          ])) : (openBlock(), createBlock("p", {
                            key: 1,
                            class: "text-center text-sm text-muted-foreground py-4"
                          }, " Belum ada bonus regular "))
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
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Bonus Matching")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              createTextVNode("Bonus matching yang diterima")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), null, {
                        default: withCtx(() => [
                          __props.recentBonuses.matching.length > 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                            createVNode(unref(_sfc_main$a), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$b), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$c), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$d), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Jumlah")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$d), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Status")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$d), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Dibuat")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.recentBonuses.matching, (bonus) => {
                                      return openBlock(), createBlock(unref(_sfc_main$c), {
                                        key: bonus.id
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$f), { class: "font-medium" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(formatCurrency(bonus.amount)), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$f), null, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$7), {
                                                variant: getBonusStatusBadge(bonus.status)
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(bonus.status), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["variant"])
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$f), { class: "text-sm" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(formatDate(bonus.created_at)), 1)
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
                          ])) : (openBlock(), createBlock("p", {
                            key: 1,
                            class: "text-center text-sm text-muted-foreground py-4"
                          }, " Belum ada bonus matching "))
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
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Bonus Pairing")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              createTextVNode("Bonus pairing yang diterima")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), null, {
                        default: withCtx(() => [
                          __props.recentBonuses.pairing.length > 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                            createVNode(unref(_sfc_main$a), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$b), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$c), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$d), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Jumlah")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$d), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Status")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$d), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Dibuat")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.recentBonuses.pairing, (bonus) => {
                                      return openBlock(), createBlock(unref(_sfc_main$c), {
                                        key: bonus.id
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$f), { class: "font-medium" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(formatCurrency(bonus.amount)), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$f), null, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$7), {
                                                variant: getBonusStatusBadge(bonus.status)
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(bonus.status), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["variant"])
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$f), { class: "text-sm" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(formatDate(bonus.created_at)), 1)
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
                          ])) : (openBlock(), createBlock("p", {
                            key: 1,
                            class: "text-center text-sm text-muted-foreground py-4"
                          }, " Belum ada bonus pairing "))
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
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Bonus Sponsor")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              createTextVNode("Bonus sponsor yang diterima")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), null, {
                        default: withCtx(() => [
                          __props.recentBonuses.sponsor.length > 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                            createVNode(unref(_sfc_main$a), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$b), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$c), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$d), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Jumlah")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$d), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Status")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$d), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Dibuat")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.recentBonuses.sponsor, (bonus) => {
                                      return openBlock(), createBlock(unref(_sfc_main$c), {
                                        key: bonus.id
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$f), { class: "font-medium" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(formatCurrency(bonus.amount)), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$f), null, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$7), {
                                                variant: getBonusStatusBadge(bonus.status)
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(bonus.status), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["variant"])
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$f), { class: "text-sm" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(formatDate(bonus.created_at)), 1)
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
                          ])) : (openBlock(), createBlock("p", {
                            key: 1,
                            class: "text-center text-sm text-muted-foreground py-4"
                          }, " Belum ada bonus sponsor "))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                __props.downlineTree ? (openBlock(), createBlock(unref(_sfc_main$3), { key: 1 }, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Genealogy Tree")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), null, {
                          default: withCtx(() => [
                            createTextVNode("Visualisasi downline dalam binary tree")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "overflow-x-auto" }, [
                          createVNode("pre", { class: "text-sm" }, toDisplayString(JSON.stringify(__props.downlineTree, null, 2)), 1)
                        ])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })) : createCommentVNode("", true)
              ]),
              createVNode(unref(_sfc_main$g), {
                open: topUpDialog.value,
                "onUpdate:open": ($event) => topUpDialog.value = $event
              }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$h), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$i), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$j), null, {
                            default: withCtx(() => [
                              createTextVNode("Top Up Saldo")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$k), null, {
                            default: withCtx(() => [
                              createTextVNode(" Tambahkan saldo ke ewallet " + toDisplayString(__props.customer.name), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "space-y-4 py-4" }, [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$9), { for: "topup-amount" }, {
                            default: withCtx(() => [
                              createTextVNode("Jumlah *")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$l), {
                            id: "topup-amount",
                            modelValue: topUpAmount.value,
                            "onUpdate:modelValue": ($event) => topUpAmount.value = $event,
                            modelModifiers: { number: true },
                            type: "number",
                            min: "0",
                            step: "1000",
                            placeholder: "Masukkan jumlah"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$9), { for: "topup-description" }, {
                            default: withCtx(() => [
                              createTextVNode("Keterangan")
                            ]),
                            _: 1
                          }),
                          withDirectives(createVNode("textarea", {
                            id: "topup-description",
                            "onUpdate:modelValue": ($event) => topUpDescription.value = $event,
                            placeholder: "Keterangan (opsional)",
                            rows: "3",
                            class: "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, topUpDescription.value]
                          ])
                        ])
                      ]),
                      createVNode(unref(_sfc_main$m), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$2), {
                            variant: "outline",
                            onClick: ($event) => topUpDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Batal")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(unref(_sfc_main$2), { onClick: handleTopUp }, {
                            default: withCtx(() => [
                              createTextVNode("Top Up")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["open", "onUpdate:open"]),
              createVNode(unref(_sfc_main$g), {
                open: deductDialog.value,
                "onUpdate:open": ($event) => deductDialog.value = $event
              }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$h), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$i), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$j), null, {
                            default: withCtx(() => [
                              createTextVNode("Kurangi Saldo")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$k), null, {
                            default: withCtx(() => [
                              createTextVNode(" Kurangi saldo dari ewallet " + toDisplayString(__props.customer.name), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "space-y-4 py-4" }, [
                        createVNode("div", { class: "rounded-md border bg-muted p-3" }, [
                          createVNode("p", { class: "text-sm text-muted-foreground" }, "Saldo Saat Ini"),
                          createVNode("p", { class: "text-lg font-bold" }, toDisplayString(formatCurrency(__props.customer.ewallet_saldo || 0)), 1)
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$9), { for: "deduct-amount" }, {
                            default: withCtx(() => [
                              createTextVNode("Jumlah *")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$l), {
                            id: "deduct-amount",
                            modelValue: deductAmount.value,
                            "onUpdate:modelValue": ($event) => deductAmount.value = $event,
                            modelModifiers: { number: true },
                            type: "number",
                            min: "0",
                            max: __props.customer.ewallet_saldo || 0,
                            step: "1000",
                            placeholder: "Masukkan jumlah"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "max"])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$9), { for: "deduct-description" }, {
                            default: withCtx(() => [
                              createTextVNode("Keterangan")
                            ]),
                            _: 1
                          }),
                          withDirectives(createVNode("textarea", {
                            id: "deduct-description",
                            "onUpdate:modelValue": ($event) => deductDescription.value = $event,
                            placeholder: "Keterangan (opsional)",
                            rows: "3",
                            class: "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, deductDescription.value]
                          ])
                        ])
                      ]),
                      createVNode(unref(_sfc_main$m), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$2), {
                            variant: "outline",
                            onClick: ($event) => deductDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Batal")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(unref(_sfc_main$2), {
                            variant: "destructive",
                            onClick: handleDeduct
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Kurangi")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["open", "onUpdate:open"]),
              createVNode(unref(_sfc_main$g), {
                open: deleteDialog.value,
                "onUpdate:open": ($event) => deleteDialog.value = $event
              }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$h), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$i), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$j), null, {
                            default: withCtx(() => [
                              createTextVNode("Hapus Pelanggan")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$k), null, {
                            default: withCtx(() => [
                              createTextVNode(" Apakah Anda yakin ingin menghapus pelanggan ini? Tindakan ini tidak dapat dibatalkan. ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$m), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$2), {
                            variant: "outline",
                            onClick: ($event) => deleteDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Batal")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(unref(_sfc_main$2), {
                            variant: "destructive",
                            onClick: handleDelete
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Hapus")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["open", "onUpdate:open"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Customers/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
