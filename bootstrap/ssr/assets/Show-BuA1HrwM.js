import { defineComponent, ref, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, createBlock, createCommentVNode, openBlock, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { a0 as index, a6 as show, _ as _sfc_main$1, a3 as destroy, a4 as release } from "./AppLayout-B3xU4M63.js";
import { _ as _sfc_main$9 } from "./ConfirmDialog-CTU0x0KG.js";
import { _ as _sfc_main$3 } from "./index-BpQimeTM.js";
import { _ as _sfc_main$2 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$4, a as _sfc_main$5, b as _sfc_main$6, d as _sfc_main$7, c as _sfc_main$8 } from "./CardTitle-sqUG0LTw.js";
import { Head, router, useForm } from "@inertiajs/vue3";
import { ArrowLeft, CheckCircle, XCircle, DollarSign, Hash, User, Wallet, GitMerge, Calendar, Trash2 } from "lucide-vue-next";
import "class-variance-authority";
import "./DropdownMenuTrigger-B1v6pHML.js";
import "reka-ui";
import "@vueuse/core";
import "./Input-BGi8wCMh.js";
import "./index-Jhngbhhu.js";
import "./AvatarImage-DWFQMckn.js";
import "vue-sonner";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
import "./AlertDialogTrigger-DIWb7xue.js";
import "clsx";
import "tailwind-merge";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    bonus: {}
  },
  setup(__props) {
    const props = __props;
    const breadcrumbItems = [
      {
        title: "Bonus Pairing",
        href: index.url()
      },
      {
        title: `Detail Bonus #${props.bonus.id}`,
        href: show.url(props.bonus.id)
      }
    ];
    const deleteDialog = ref(false);
    const releaseDialog = ref(false);
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(amount);
    };
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const handleDelete = () => {
      const deleteForm = useForm({});
      deleteForm.delete(destroy.url(props.bonus.id), {
        onSuccess: () => {
          router.visit(index.url());
        }
      });
    };
    const handleRelease = () => {
      const releaseForm = useForm({});
      releaseForm.post(release.url(props.bonus.id), {
        preserveScroll: true,
        onSuccess: () => {
          releaseDialog.value = false;
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ breadcrumbs: breadcrumbItems }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: `Detail Bonus Pairing #${__props.bonus.id}`
            }, null, _parent2, _scopeId));
            _push2(`<div class="rounded-xl p-4 space-y-6 py-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div class="flex items-center gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              variant: "outline",
              size: "icon",
              onClick: ($event) => unref(router).visit(unref(index).url())
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ArrowLeft), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(ArrowLeft), { class: "h-4 w-4" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div${_scopeId}><h1 class="text-3xl font-bold tracking-tight"${_scopeId}>Detail Bonus Pairing</h1><p class="text-muted-foreground"${_scopeId}>ID: #${ssrInterpolate(__props.bonus.id)}</p></div></div><div class="flex gap-2"${_scopeId}>`);
            if (__props.bonus.status === 1) {
              _push2(ssrRenderComponent(unref(_sfc_main$3), {
                variant: "default",
                class: "gap-1"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(CheckCircle), { class: "h-3 w-3" }, null, _parent3, _scopeId2));
                    _push3(` ${ssrInterpolate(__props.bonus.status_text)}`);
                  } else {
                    return [
                      createVNode(unref(CheckCircle), { class: "h-3 w-3" }),
                      createTextVNode(" " + toDisplayString(__props.bonus.status_text), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(unref(_sfc_main$3), {
                variant: "secondary",
                class: "gap-1"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(XCircle), { class: "h-3 w-3" }, null, _parent3, _scopeId2));
                    _push3(` ${ssrInterpolate(__props.bonus.status_text)}`);
                  } else {
                    return [
                      createVNode(unref(XCircle), { class: "h-3 w-3" }),
                      createTextVNode(" " + toDisplayString(__props.bonus.status_text), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }
            _push2(`</div></div><div class="grid gap-6 lg:grid-cols-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$6), { class: "flex items-center gap-2" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(DollarSign), { class: "h-5 w-5" }, null, _parent5, _scopeId4));
                              _push5(` Informasi Bonus `);
                            } else {
                              return [
                                createVNode(unref(DollarSign), { class: "h-5 w-5" }),
                                createTextVNode(" Informasi Bonus ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$7), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Detail jumlah dan perhitungan pairing`);
                            } else {
                              return [
                                createTextVNode("Detail jumlah dan perhitungan pairing")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$6), { class: "flex items-center gap-2" }, {
                            default: withCtx(() => [
                              createVNode(unref(DollarSign), { class: "h-5 w-5" }),
                              createTextVNode(" Informasi Bonus ")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$7), null, {
                            default: withCtx(() => [
                              createTextVNode("Detail jumlah dan perhitungan pairing")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$8), { class: "space-y-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="space-y-2"${_scopeId3}><div class="flex items-center gap-2 text-sm text-muted-foreground"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Hash), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                        _push4(`<span${_scopeId3}>ID Bonus</span></div><p class="text-lg font-semibold"${_scopeId3}>#${ssrInterpolate(__props.bonus.id)}</p></div><div class="space-y-2"${_scopeId3}><div class="flex items-center gap-2 text-sm text-muted-foreground"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(DollarSign), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                        _push4(`<span${_scopeId3}>Total Bonus</span></div><p class="text-2xl font-bold"${_scopeId3}>${ssrInterpolate(formatCurrency(__props.bonus.amount))}</p></div><div class="rounded-lg border bg-muted/50 p-4 space-y-3"${_scopeId3}><p class="text-sm font-medium text-muted-foreground"${_scopeId3}>Perhitungan:</p><div class="space-y-2"${_scopeId3}><div class="flex items-center justify-between"${_scopeId3}><span class="text-sm"${_scopeId3}>Jumlah Pasangan:</span><span class="font-semibold"${_scopeId3}>${ssrInterpolate(__props.bonus.pair_count)} pasang</span></div><div class="flex items-center justify-between"${_scopeId3}><span class="text-sm"${_scopeId3}>Bonus Per Pasang:</span><span class="font-semibold"${_scopeId3}>${ssrInterpolate(formatCurrency(__props.bonus.bonus_per_pair))}</span></div><div class="h-px bg-border"${_scopeId3}></div><div class="flex items-center justify-between"${_scopeId3}><span class="text-sm font-medium"${_scopeId3}>Total:</span><span class="font-bold text-lg"${_scopeId3}>${ssrInterpolate(formatCurrency(__props.bonus.amount))}</span></div></div></div><div class="space-y-2"${_scopeId3}><div class="flex items-center gap-2 text-sm text-muted-foreground"${_scopeId3}><span${_scopeId3}>Index Value</span></div><p class="font-medium"${_scopeId3}>${ssrInterpolate(__props.bonus.index_value)}</p></div>`);
                        if (__props.bonus.description) {
                          _push4(`<div class="space-y-2"${_scopeId3}><div class="flex items-center gap-2 text-sm text-muted-foreground"${_scopeId3}><span${_scopeId3}>Keterangan</span></div><p class="text-sm"${_scopeId3}>${ssrInterpolate(__props.bonus.description)}</p></div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("div", { class: "flex items-center gap-2 text-sm text-muted-foreground" }, [
                              createVNode(unref(Hash), { class: "h-4 w-4" }),
                              createVNode("span", null, "ID Bonus")
                            ]),
                            createVNode("p", { class: "text-lg font-semibold" }, "#" + toDisplayString(__props.bonus.id), 1)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("div", { class: "flex items-center gap-2 text-sm text-muted-foreground" }, [
                              createVNode(unref(DollarSign), { class: "h-4 w-4" }),
                              createVNode("span", null, "Total Bonus")
                            ]),
                            createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(formatCurrency(__props.bonus.amount)), 1)
                          ]),
                          createVNode("div", { class: "rounded-lg border bg-muted/50 p-4 space-y-3" }, [
                            createVNode("p", { class: "text-sm font-medium text-muted-foreground" }, "Perhitungan:"),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode("div", { class: "flex items-center justify-between" }, [
                                createVNode("span", { class: "text-sm" }, "Jumlah Pasangan:"),
                                createVNode("span", { class: "font-semibold" }, toDisplayString(__props.bonus.pair_count) + " pasang", 1)
                              ]),
                              createVNode("div", { class: "flex items-center justify-between" }, [
                                createVNode("span", { class: "text-sm" }, "Bonus Per Pasang:"),
                                createVNode("span", { class: "font-semibold" }, toDisplayString(formatCurrency(__props.bonus.bonus_per_pair)), 1)
                              ]),
                              createVNode("div", { class: "h-px bg-border" }),
                              createVNode("div", { class: "flex items-center justify-between" }, [
                                createVNode("span", { class: "text-sm font-medium" }, "Total:"),
                                createVNode("span", { class: "font-bold text-lg" }, toDisplayString(formatCurrency(__props.bonus.amount)), 1)
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("div", { class: "flex items-center gap-2 text-sm text-muted-foreground" }, [
                              createVNode("span", null, "Index Value")
                            ]),
                            createVNode("p", { class: "font-medium" }, toDisplayString(__props.bonus.index_value), 1)
                          ]),
                          __props.bonus.description ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "space-y-2"
                          }, [
                            createVNode("div", { class: "flex items-center gap-2 text-sm text-muted-foreground" }, [
                              createVNode("span", null, "Keterangan")
                            ]),
                            createVNode("p", { class: "text-sm" }, toDisplayString(__props.bonus.description), 1)
                          ])) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$6), { class: "flex items-center gap-2" }, {
                          default: withCtx(() => [
                            createVNode(unref(DollarSign), { class: "h-5 w-5" }),
                            createTextVNode(" Informasi Bonus ")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$7), null, {
                          default: withCtx(() => [
                            createTextVNode("Detail jumlah dan perhitungan pairing")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$8), { class: "space-y-4" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("div", { class: "flex items-center gap-2 text-sm text-muted-foreground" }, [
                            createVNode(unref(Hash), { class: "h-4 w-4" }),
                            createVNode("span", null, "ID Bonus")
                          ]),
                          createVNode("p", { class: "text-lg font-semibold" }, "#" + toDisplayString(__props.bonus.id), 1)
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("div", { class: "flex items-center gap-2 text-sm text-muted-foreground" }, [
                            createVNode(unref(DollarSign), { class: "h-4 w-4" }),
                            createVNode("span", null, "Total Bonus")
                          ]),
                          createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(formatCurrency(__props.bonus.amount)), 1)
                        ]),
                        createVNode("div", { class: "rounded-lg border bg-muted/50 p-4 space-y-3" }, [
                          createVNode("p", { class: "text-sm font-medium text-muted-foreground" }, "Perhitungan:"),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("div", { class: "flex items-center justify-between" }, [
                              createVNode("span", { class: "text-sm" }, "Jumlah Pasangan:"),
                              createVNode("span", { class: "font-semibold" }, toDisplayString(__props.bonus.pair_count) + " pasang", 1)
                            ]),
                            createVNode("div", { class: "flex items-center justify-between" }, [
                              createVNode("span", { class: "text-sm" }, "Bonus Per Pasang:"),
                              createVNode("span", { class: "font-semibold" }, toDisplayString(formatCurrency(__props.bonus.bonus_per_pair)), 1)
                            ]),
                            createVNode("div", { class: "h-px bg-border" }),
                            createVNode("div", { class: "flex items-center justify-between" }, [
                              createVNode("span", { class: "text-sm font-medium" }, "Total:"),
                              createVNode("span", { class: "font-bold text-lg" }, toDisplayString(formatCurrency(__props.bonus.amount)), 1)
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("div", { class: "flex items-center gap-2 text-sm text-muted-foreground" }, [
                            createVNode("span", null, "Index Value")
                          ]),
                          createVNode("p", { class: "font-medium" }, toDisplayString(__props.bonus.index_value), 1)
                        ]),
                        __props.bonus.description ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "space-y-2"
                        }, [
                          createVNode("div", { class: "flex items-center gap-2 text-sm text-muted-foreground" }, [
                            createVNode("span", null, "Keterangan")
                          ]),
                          createVNode("p", { class: "text-sm" }, toDisplayString(__props.bonus.description), 1)
                        ])) : createCommentVNode("", true)
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
                        _push4(ssrRenderComponent(unref(_sfc_main$6), { class: "flex items-center gap-2" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(User), { class: "h-5 w-5" }, null, _parent5, _scopeId4));
                              _push5(` Informasi Member `);
                            } else {
                              return [
                                createVNode(unref(User), { class: "h-5 w-5" }),
                                createTextVNode(" Informasi Member ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$7), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Member yang menerima bonus pairing`);
                            } else {
                              return [
                                createTextVNode("Member yang menerima bonus pairing")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$6), { class: "flex items-center gap-2" }, {
                            default: withCtx(() => [
                              createVNode(unref(User), { class: "h-5 w-5" }),
                              createTextVNode(" Informasi Member ")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$7), null, {
                            default: withCtx(() => [
                              createTextVNode("Member yang menerima bonus pairing")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$8), { class: "space-y-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="space-y-2"${_scopeId3}><div class="flex items-center gap-2 text-sm text-muted-foreground"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(User), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                        _push4(`<span${_scopeId3}>Nama</span></div><p class="text-lg font-semibold"${_scopeId3}>${ssrInterpolate(__props.bonus.member_name)}</p></div><div class="space-y-2"${_scopeId3}><div class="flex items-center gap-2 text-sm text-muted-foreground"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Wallet), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                        _push4(`<span${_scopeId3}>ID E-Wallet</span></div><p class="font-mono font-medium"${_scopeId3}>${ssrInterpolate(__props.bonus.member_ewallet_id)}</p></div><div class="space-y-2"${_scopeId3}><div class="flex items-center gap-2 text-sm text-muted-foreground"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Hash), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                        _push4(`<span${_scopeId3}>Member ID</span></div><p class="font-medium"${_scopeId3}>#${ssrInterpolate(__props.bonus.member_id)}</p></div><div class="space-y-2"${_scopeId3}><div class="flex items-center gap-2 text-sm text-muted-foreground"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(GitMerge), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                        _push4(`<span${_scopeId3}>Pasangan Terbentuk</span></div>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$3), {
                          variant: "outline",
                          class: "text-base"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(__props.bonus.pair_count)} Pasang `);
                            } else {
                              return [
                                createTextVNode(toDisplayString(__props.bonus.pair_count) + " Pasang ", 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("div", { class: "flex items-center gap-2 text-sm text-muted-foreground" }, [
                              createVNode(unref(User), { class: "h-4 w-4" }),
                              createVNode("span", null, "Nama")
                            ]),
                            createVNode("p", { class: "text-lg font-semibold" }, toDisplayString(__props.bonus.member_name), 1)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("div", { class: "flex items-center gap-2 text-sm text-muted-foreground" }, [
                              createVNode(unref(Wallet), { class: "h-4 w-4" }),
                              createVNode("span", null, "ID E-Wallet")
                            ]),
                            createVNode("p", { class: "font-mono font-medium" }, toDisplayString(__props.bonus.member_ewallet_id), 1)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("div", { class: "flex items-center gap-2 text-sm text-muted-foreground" }, [
                              createVNode(unref(Hash), { class: "h-4 w-4" }),
                              createVNode("span", null, "Member ID")
                            ]),
                            createVNode("p", { class: "font-medium" }, "#" + toDisplayString(__props.bonus.member_id), 1)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("div", { class: "flex items-center gap-2 text-sm text-muted-foreground" }, [
                              createVNode(unref(GitMerge), { class: "h-4 w-4" }),
                              createVNode("span", null, "Pasangan Terbentuk")
                            ]),
                            createVNode(unref(_sfc_main$3), {
                              variant: "outline",
                              class: "text-base"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(__props.bonus.pair_count) + " Pasang ", 1)
                              ]),
                              _: 1
                            })
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$6), { class: "flex items-center gap-2" }, {
                          default: withCtx(() => [
                            createVNode(unref(User), { class: "h-5 w-5" }),
                            createTextVNode(" Informasi Member ")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$7), null, {
                          default: withCtx(() => [
                            createTextVNode("Member yang menerima bonus pairing")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$8), { class: "space-y-4" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("div", { class: "flex items-center gap-2 text-sm text-muted-foreground" }, [
                            createVNode(unref(User), { class: "h-4 w-4" }),
                            createVNode("span", null, "Nama")
                          ]),
                          createVNode("p", { class: "text-lg font-semibold" }, toDisplayString(__props.bonus.member_name), 1)
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("div", { class: "flex items-center gap-2 text-sm text-muted-foreground" }, [
                            createVNode(unref(Wallet), { class: "h-4 w-4" }),
                            createVNode("span", null, "ID E-Wallet")
                          ]),
                          createVNode("p", { class: "font-mono font-medium" }, toDisplayString(__props.bonus.member_ewallet_id), 1)
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("div", { class: "flex items-center gap-2 text-sm text-muted-foreground" }, [
                            createVNode(unref(Hash), { class: "h-4 w-4" }),
                            createVNode("span", null, "Member ID")
                          ]),
                          createVNode("p", { class: "font-medium" }, "#" + toDisplayString(__props.bonus.member_id), 1)
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("div", { class: "flex items-center gap-2 text-sm text-muted-foreground" }, [
                            createVNode(unref(GitMerge), { class: "h-4 w-4" }),
                            createVNode("span", null, "Pasangan Terbentuk")
                          ]),
                          createVNode(unref(_sfc_main$3), {
                            variant: "outline",
                            class: "text-base"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(__props.bonus.pair_count) + " Pasang ", 1)
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "lg:col-span-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$6), { class: "flex items-center gap-2" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Calendar), { class: "h-5 w-5" }, null, _parent5, _scopeId4));
                              _push5(` Timeline `);
                            } else {
                              return [
                                createVNode(unref(Calendar), { class: "h-5 w-5" }),
                                createTextVNode(" Timeline ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$7), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Riwayat waktu bonus`);
                            } else {
                              return [
                                createTextVNode("Riwayat waktu bonus")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$6), { class: "flex items-center gap-2" }, {
                            default: withCtx(() => [
                              createVNode(unref(Calendar), { class: "h-5 w-5" }),
                              createTextVNode(" Timeline ")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$7), null, {
                            default: withCtx(() => [
                              createTextVNode("Riwayat waktu bonus")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$8), { class: "grid gap-4 md:grid-cols-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="space-y-2"${_scopeId3}><div class="flex items-center gap-2 text-sm text-muted-foreground"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Calendar), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                        _push4(`<span${_scopeId3}>Dibuat</span></div><p class="font-medium"${_scopeId3}>${ssrInterpolate(formatDate(__props.bonus.created_at))}</p></div><div class="space-y-2"${_scopeId3}><div class="flex items-center gap-2 text-sm text-muted-foreground"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Calendar), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                        _push4(`<span${_scopeId3}>Terakhir Diperbarui</span></div><p class="font-medium"${_scopeId3}>${ssrInterpolate(formatDate(__props.bonus.updated_at))}</p></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("div", { class: "flex items-center gap-2 text-sm text-muted-foreground" }, [
                              createVNode(unref(Calendar), { class: "h-4 w-4" }),
                              createVNode("span", null, "Dibuat")
                            ]),
                            createVNode("p", { class: "font-medium" }, toDisplayString(formatDate(__props.bonus.created_at)), 1)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("div", { class: "flex items-center gap-2 text-sm text-muted-foreground" }, [
                              createVNode(unref(Calendar), { class: "h-4 w-4" }),
                              createVNode("span", null, "Terakhir Diperbarui")
                            ]),
                            createVNode("p", { class: "font-medium" }, toDisplayString(formatDate(__props.bonus.updated_at)), 1)
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$6), { class: "flex items-center gap-2" }, {
                          default: withCtx(() => [
                            createVNode(unref(Calendar), { class: "h-5 w-5" }),
                            createTextVNode(" Timeline ")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$7), null, {
                          default: withCtx(() => [
                            createTextVNode("Riwayat waktu bonus")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$8), { class: "grid gap-4 md:grid-cols-2" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("div", { class: "flex items-center gap-2 text-sm text-muted-foreground" }, [
                            createVNode(unref(Calendar), { class: "h-4 w-4" }),
                            createVNode("span", null, "Dibuat")
                          ]),
                          createVNode("p", { class: "font-medium" }, toDisplayString(formatDate(__props.bonus.created_at)), 1)
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("div", { class: "flex items-center gap-2 text-sm text-muted-foreground" }, [
                            createVNode(unref(Calendar), { class: "h-4 w-4" }),
                            createVNode("span", null, "Terakhir Diperbarui")
                          ]),
                          createVNode("p", { class: "font-medium" }, toDisplayString(formatDate(__props.bonus.updated_at)), 1)
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
            if (__props.bonus.status === 0) {
              _push2(`<div class="flex justify-end gap-4"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(_sfc_main$2), {
                variant: "outline",
                onClick: ($event) => deleteDialog.value = true
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Trash2), { class: "h-4 w-4 text-destructive" }, null, _parent3, _scopeId2));
                    _push3(` Hapus `);
                  } else {
                    return [
                      createVNode(unref(Trash2), { class: "h-4 w-4 text-destructive" }),
                      createTextVNode(" Hapus ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$2), {
                onClick: ($event) => releaseDialog.value = true
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Wallet), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                    _push3(` Release Bonus `);
                  } else {
                    return [
                      createVNode(unref(Wallet), { class: "h-4 w-4" }),
                      createTextVNode(" Release Bonus ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$9, {
              open: deleteDialog.value,
              "onUpdate:open": ($event) => deleteDialog.value = $event,
              title: "Hapus Bonus?",
              description: "Apakah Anda yakin ingin menghapus bonus ini? Tindakan ini tidak dapat dibatalkan.",
              "confirm-text": "Hapus",
              "cancel-text": "Batal",
              variant: "destructive",
              onConfirm: handleDelete
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$9, {
              open: releaseDialog.value,
              "onUpdate:open": ($event) => releaseDialog.value = $event,
              title: "Release Bonus?",
              description: `Bonus sebesar ${formatCurrency(__props.bonus.amount)} (${__props.bonus.pair_count} pasang) akan ditransfer ke ewallet ${__props.bonus.member_name}. Lanjutkan?`,
              "confirm-text": "Release",
              "cancel-text": "Batal",
              onConfirm: handleRelease
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Head), {
                title: `Detail Bonus Pairing #${__props.bonus.id}`
              }, null, 8, ["title"]),
              createVNode("div", { class: "rounded-xl p-4 space-y-6 py-6" }, [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("div", { class: "flex items-center gap-4" }, [
                    createVNode(unref(_sfc_main$2), {
                      variant: "outline",
                      size: "icon",
                      onClick: ($event) => unref(router).visit(unref(index).url())
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(ArrowLeft), { class: "h-4 w-4" })
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-3xl font-bold tracking-tight" }, "Detail Bonus Pairing"),
                      createVNode("p", { class: "text-muted-foreground" }, "ID: #" + toDisplayString(__props.bonus.id), 1)
                    ])
                  ]),
                  createVNode("div", { class: "flex gap-2" }, [
                    __props.bonus.status === 1 ? (openBlock(), createBlock(unref(_sfc_main$3), {
                      key: 0,
                      variant: "default",
                      class: "gap-1"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(CheckCircle), { class: "h-3 w-3" }),
                        createTextVNode(" " + toDisplayString(__props.bonus.status_text), 1)
                      ]),
                      _: 1
                    })) : (openBlock(), createBlock(unref(_sfc_main$3), {
                      key: 1,
                      variant: "secondary",
                      class: "gap-1"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(XCircle), { class: "h-3 w-3" }),
                        createTextVNode(" " + toDisplayString(__props.bonus.status_text), 1)
                      ]),
                      _: 1
                    }))
                  ])
                ]),
                createVNode("div", { class: "grid gap-6 lg:grid-cols-2" }, [
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$6), { class: "flex items-center gap-2" }, {
                            default: withCtx(() => [
                              createVNode(unref(DollarSign), { class: "h-5 w-5" }),
                              createTextVNode(" Informasi Bonus ")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$7), null, {
                            default: withCtx(() => [
                              createTextVNode("Detail jumlah dan perhitungan pairing")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$8), { class: "space-y-4" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("div", { class: "flex items-center gap-2 text-sm text-muted-foreground" }, [
                              createVNode(unref(Hash), { class: "h-4 w-4" }),
                              createVNode("span", null, "ID Bonus")
                            ]),
                            createVNode("p", { class: "text-lg font-semibold" }, "#" + toDisplayString(__props.bonus.id), 1)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("div", { class: "flex items-center gap-2 text-sm text-muted-foreground" }, [
                              createVNode(unref(DollarSign), { class: "h-4 w-4" }),
                              createVNode("span", null, "Total Bonus")
                            ]),
                            createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(formatCurrency(__props.bonus.amount)), 1)
                          ]),
                          createVNode("div", { class: "rounded-lg border bg-muted/50 p-4 space-y-3" }, [
                            createVNode("p", { class: "text-sm font-medium text-muted-foreground" }, "Perhitungan:"),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode("div", { class: "flex items-center justify-between" }, [
                                createVNode("span", { class: "text-sm" }, "Jumlah Pasangan:"),
                                createVNode("span", { class: "font-semibold" }, toDisplayString(__props.bonus.pair_count) + " pasang", 1)
                              ]),
                              createVNode("div", { class: "flex items-center justify-between" }, [
                                createVNode("span", { class: "text-sm" }, "Bonus Per Pasang:"),
                                createVNode("span", { class: "font-semibold" }, toDisplayString(formatCurrency(__props.bonus.bonus_per_pair)), 1)
                              ]),
                              createVNode("div", { class: "h-px bg-border" }),
                              createVNode("div", { class: "flex items-center justify-between" }, [
                                createVNode("span", { class: "text-sm font-medium" }, "Total:"),
                                createVNode("span", { class: "font-bold text-lg" }, toDisplayString(formatCurrency(__props.bonus.amount)), 1)
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("div", { class: "flex items-center gap-2 text-sm text-muted-foreground" }, [
                              createVNode("span", null, "Index Value")
                            ]),
                            createVNode("p", { class: "font-medium" }, toDisplayString(__props.bonus.index_value), 1)
                          ]),
                          __props.bonus.description ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "space-y-2"
                          }, [
                            createVNode("div", { class: "flex items-center gap-2 text-sm text-muted-foreground" }, [
                              createVNode("span", null, "Keterangan")
                            ]),
                            createVNode("p", { class: "text-sm" }, toDisplayString(__props.bonus.description), 1)
                          ])) : createCommentVNode("", true)
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
                          createVNode(unref(_sfc_main$6), { class: "flex items-center gap-2" }, {
                            default: withCtx(() => [
                              createVNode(unref(User), { class: "h-5 w-5" }),
                              createTextVNode(" Informasi Member ")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$7), null, {
                            default: withCtx(() => [
                              createTextVNode("Member yang menerima bonus pairing")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$8), { class: "space-y-4" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("div", { class: "flex items-center gap-2 text-sm text-muted-foreground" }, [
                              createVNode(unref(User), { class: "h-4 w-4" }),
                              createVNode("span", null, "Nama")
                            ]),
                            createVNode("p", { class: "text-lg font-semibold" }, toDisplayString(__props.bonus.member_name), 1)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("div", { class: "flex items-center gap-2 text-sm text-muted-foreground" }, [
                              createVNode(unref(Wallet), { class: "h-4 w-4" }),
                              createVNode("span", null, "ID E-Wallet")
                            ]),
                            createVNode("p", { class: "font-mono font-medium" }, toDisplayString(__props.bonus.member_ewallet_id), 1)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("div", { class: "flex items-center gap-2 text-sm text-muted-foreground" }, [
                              createVNode(unref(Hash), { class: "h-4 w-4" }),
                              createVNode("span", null, "Member ID")
                            ]),
                            createVNode("p", { class: "font-medium" }, "#" + toDisplayString(__props.bonus.member_id), 1)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("div", { class: "flex items-center gap-2 text-sm text-muted-foreground" }, [
                              createVNode(unref(GitMerge), { class: "h-4 w-4" }),
                              createVNode("span", null, "Pasangan Terbentuk")
                            ]),
                            createVNode(unref(_sfc_main$3), {
                              variant: "outline",
                              class: "text-base"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(__props.bonus.pair_count) + " Pasang ", 1)
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$4), { class: "lg:col-span-2" }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$6), { class: "flex items-center gap-2" }, {
                            default: withCtx(() => [
                              createVNode(unref(Calendar), { class: "h-5 w-5" }),
                              createTextVNode(" Timeline ")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$7), null, {
                            default: withCtx(() => [
                              createTextVNode("Riwayat waktu bonus")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$8), { class: "grid gap-4 md:grid-cols-2" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("div", { class: "flex items-center gap-2 text-sm text-muted-foreground" }, [
                              createVNode(unref(Calendar), { class: "h-4 w-4" }),
                              createVNode("span", null, "Dibuat")
                            ]),
                            createVNode("p", { class: "font-medium" }, toDisplayString(formatDate(__props.bonus.created_at)), 1)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("div", { class: "flex items-center gap-2 text-sm text-muted-foreground" }, [
                              createVNode(unref(Calendar), { class: "h-4 w-4" }),
                              createVNode("span", null, "Terakhir Diperbarui")
                            ]),
                            createVNode("p", { class: "font-medium" }, toDisplayString(formatDate(__props.bonus.updated_at)), 1)
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                __props.bonus.status === 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "flex justify-end gap-4"
                }, [
                  createVNode(unref(_sfc_main$2), {
                    variant: "outline",
                    onClick: ($event) => deleteDialog.value = true
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Trash2), { class: "h-4 w-4 text-destructive" }),
                      createTextVNode(" Hapus ")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(unref(_sfc_main$2), {
                    onClick: ($event) => releaseDialog.value = true
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Wallet), { class: "h-4 w-4" }),
                      createTextVNode(" Release Bonus ")
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ])) : createCommentVNode("", true)
              ]),
              createVNode(_sfc_main$9, {
                open: deleteDialog.value,
                "onUpdate:open": ($event) => deleteDialog.value = $event,
                title: "Hapus Bonus?",
                description: "Apakah Anda yakin ingin menghapus bonus ini? Tindakan ini tidak dapat dibatalkan.",
                "confirm-text": "Hapus",
                "cancel-text": "Batal",
                variant: "destructive",
                onConfirm: handleDelete
              }, null, 8, ["open", "onUpdate:open"]),
              createVNode(_sfc_main$9, {
                open: releaseDialog.value,
                "onUpdate:open": ($event) => releaseDialog.value = $event,
                title: "Release Bonus?",
                description: `Bonus sebesar ${formatCurrency(__props.bonus.amount)} (${__props.bonus.pair_count} pasang) akan ditransfer ke ewallet ${__props.bonus.member_name}. Lanjutkan?`,
                "confirm-text": "Release",
                "cancel-text": "Batal",
                onConfirm: handleRelease
              }, null, 8, ["open", "onUpdate:open", "description"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/bonus/pairing/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
