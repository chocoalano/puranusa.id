import { defineComponent, ref, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, resolveDynamicComponent, createBlock, openBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderVNode } from "vue/server-renderer";
import { V as index, a0 as show, _ as _sfc_main$1, Y as destroy, Z as release } from "./AppLayout-hyZArMVS.js";
import { _ as _sfc_main$8 } from "./ConfirmDialog-CTU0x0KG.js";
import { _ as _sfc_main$3 } from "./index-BpQimeTM.js";
import { _ as _sfc_main$2 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$4, a as _sfc_main$5, b as _sfc_main$6, c as _sfc_main$7 } from "./CardTitle-sqUG0LTw.js";
import { Head, Link, useForm } from "@inertiajs/vue3";
import { ArrowLeft, Layers, CheckCircle, XCircle, Wallet, Trash2 } from "lucide-vue-next";
import "class-variance-authority";
import "./DropdownMenuTrigger-B1v6pHML.js";
import "reka-ui";
import "@vueuse/core";
import "./Input-BGi8wCMh.js";
import "./index--D7ld9AJ.js";
import "./AvatarImage-DWFQMckn.js";
import "./index-B0NlPG4h.js";
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
        title: "Bonus Matching",
        href: index.url()
      },
      {
        title: "Detail Bonus",
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
          window.location.href = index.url();
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
            _push2(ssrRenderComponent(unref(Head), { title: "Detail Bonus Matching" }, null, _parent2, _scopeId));
            _push2(`<div class="rounded-xl p-4 space-y-6 py-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div class="flex items-center gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(index).url()
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$2), {
                    variant: "outline",
                    size: "icon"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(ArrowLeft), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(ArrowLeft), { class: "h-4 w-4" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$2), {
                      variant: "outline",
                      size: "icon"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(ArrowLeft), { class: "h-4 w-4" })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div${_scopeId}><h1 class="text-3xl font-bold tracking-tight"${_scopeId}>Detail Bonus Matching</h1><p class="text-muted-foreground"${_scopeId}>Informasi lengkap bonus matching</p></div></div><div class="flex gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$3), {
              variant: "outline",
              class: "gap-1 text-sm px-3 py-1"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Layers), { class: "h-3 w-3" }, null, _parent3, _scopeId2));
                  _push3(` Level ${ssrInterpolate(__props.bonus.level)}`);
                } else {
                  return [
                    createVNode(unref(Layers), { class: "h-3 w-3" }),
                    createTextVNode(" Level " + toDisplayString(__props.bonus.level), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$3), {
              variant: __props.bonus.status === 1 ? "default" : "secondary",
              class: "gap-1 text-sm px-3 py-1"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(__props.bonus.status === 1 ? unref(CheckCircle) : unref(XCircle)), { class: "h-3 w-3" }, null), _parent3, _scopeId2);
                  _push3(` ${ssrInterpolate(__props.bonus.status_text)}`);
                } else {
                  return [
                    (openBlock(), createBlock(resolveDynamicComponent(__props.bonus.status === 1 ? unref(CheckCircle) : unref(XCircle)), { class: "h-3 w-3" })),
                    createTextVNode(" " + toDisplayString(__props.bonus.status_text), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="grid gap-6 md:grid-cols-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Informasi Bonus`);
                            } else {
                              return [
                                createTextVNode("Informasi Bonus")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("Informasi Bonus")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { class: "space-y-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div${_scopeId3}><p class="text-sm text-muted-foreground"${_scopeId3}>Jumlah</p><p class="text-2xl font-bold text-green-600"${_scopeId3}>${ssrInterpolate(formatCurrency(__props.bonus.amount))}</p></div><div class="grid grid-cols-2 gap-4"${_scopeId3}><div${_scopeId3}><p class="text-sm text-muted-foreground"${_scopeId3}>Level</p><p class="font-medium"${_scopeId3}>${ssrInterpolate(__props.bonus.level)}</p></div><div${_scopeId3}><p class="text-sm text-muted-foreground"${_scopeId3}>Index Value</p><p class="font-medium"${_scopeId3}>${ssrInterpolate(__props.bonus.index_value)}</p></div></div>`);
                        if (__props.bonus.description) {
                          _push4(`<div${_scopeId3}><p class="text-sm text-muted-foreground"${_scopeId3}>Deskripsi</p><p class="mt-1"${_scopeId3}>${ssrInterpolate(__props.bonus.description)}</p></div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm text-muted-foreground" }, "Jumlah"),
                            createVNode("p", { class: "text-2xl font-bold text-green-600" }, toDisplayString(formatCurrency(__props.bonus.amount)), 1)
                          ]),
                          createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                            createVNode("div", null, [
                              createVNode("p", { class: "text-sm text-muted-foreground" }, "Level"),
                              createVNode("p", { class: "font-medium" }, toDisplayString(__props.bonus.level), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("p", { class: "text-sm text-muted-foreground" }, "Index Value"),
                              createVNode("p", { class: "font-medium" }, toDisplayString(__props.bonus.index_value), 1)
                            ])
                          ]),
                          __props.bonus.description ? (openBlock(), createBlock("div", { key: 0 }, [
                            createVNode("p", { class: "text-sm text-muted-foreground" }, "Deskripsi"),
                            createVNode("p", { class: "mt-1" }, toDisplayString(__props.bonus.description), 1)
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
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode("Informasi Bonus")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                      default: withCtx(() => [
                        createVNode("div", null, [
                          createVNode("p", { class: "text-sm text-muted-foreground" }, "Jumlah"),
                          createVNode("p", { class: "text-2xl font-bold text-green-600" }, toDisplayString(formatCurrency(__props.bonus.amount)), 1)
                        ]),
                        createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm text-muted-foreground" }, "Level"),
                            createVNode("p", { class: "font-medium" }, toDisplayString(__props.bonus.level), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm text-muted-foreground" }, "Index Value"),
                            createVNode("p", { class: "font-medium" }, toDisplayString(__props.bonus.index_value), 1)
                          ])
                        ]),
                        __props.bonus.description ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode("p", { class: "text-sm text-muted-foreground" }, "Deskripsi"),
                          createVNode("p", { class: "mt-1" }, toDisplayString(__props.bonus.description), 1)
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
                        _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Penerima Bonus`);
                            } else {
                              return [
                                createTextVNode("Penerima Bonus")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("Penerima Bonus")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { class: "space-y-3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div${_scopeId3}><p class="text-sm text-muted-foreground"${_scopeId3}>Nama</p><p class="font-medium"${_scopeId3}>${ssrInterpolate(__props.bonus.member_name)}</p></div><div${_scopeId3}><p class="text-sm text-muted-foreground"${_scopeId3}>Ewallet ID</p><p class="font-medium"${_scopeId3}>${ssrInterpolate(__props.bonus.member_ewallet_id)}</p></div><div${_scopeId3}><p class="text-sm text-muted-foreground"${_scopeId3}>Email</p><p class="font-medium"${_scopeId3}>${ssrInterpolate(__props.bonus.member_email)}</p></div>`);
                      } else {
                        return [
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm text-muted-foreground" }, "Nama"),
                            createVNode("p", { class: "font-medium" }, toDisplayString(__props.bonus.member_name), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm text-muted-foreground" }, "Ewallet ID"),
                            createVNode("p", { class: "font-medium" }, toDisplayString(__props.bonus.member_ewallet_id), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm text-muted-foreground" }, "Email"),
                            createVNode("p", { class: "font-medium" }, toDisplayString(__props.bonus.member_email), 1)
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
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode("Penerima Bonus")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), { class: "space-y-3" }, {
                      default: withCtx(() => [
                        createVNode("div", null, [
                          createVNode("p", { class: "text-sm text-muted-foreground" }, "Nama"),
                          createVNode("p", { class: "font-medium" }, toDisplayString(__props.bonus.member_name), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("p", { class: "text-sm text-muted-foreground" }, "Ewallet ID"),
                          createVNode("p", { class: "font-medium" }, toDisplayString(__props.bonus.member_ewallet_id), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("p", { class: "text-sm text-muted-foreground" }, "Email"),
                          createVNode("p", { class: "font-medium" }, toDisplayString(__props.bonus.member_email), 1)
                        ])
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
                              _push5(`Sumber Bonus`);
                            } else {
                              return [
                                createTextVNode("Sumber Bonus")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("Sumber Bonus")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { class: "space-y-3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div${_scopeId3}><p class="text-sm text-muted-foreground"${_scopeId3}>Nama</p><p class="font-medium"${_scopeId3}>${ssrInterpolate(__props.bonus.from_member_name)}</p></div><div${_scopeId3}><p class="text-sm text-muted-foreground"${_scopeId3}>Ewallet ID</p><p class="font-medium"${_scopeId3}>${ssrInterpolate(__props.bonus.from_member_ewallet_id)}</p></div><div class="text-sm text-muted-foreground"${_scopeId3}> Bonus ini berasal dari aktivitas member di atas </div>`);
                      } else {
                        return [
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm text-muted-foreground" }, "Nama"),
                            createVNode("p", { class: "font-medium" }, toDisplayString(__props.bonus.from_member_name), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm text-muted-foreground" }, "Ewallet ID"),
                            createVNode("p", { class: "font-medium" }, toDisplayString(__props.bonus.from_member_ewallet_id), 1)
                          ]),
                          createVNode("div", { class: "text-sm text-muted-foreground" }, " Bonus ini berasal dari aktivitas member di atas ")
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
                            createTextVNode("Sumber Bonus")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), { class: "space-y-3" }, {
                      default: withCtx(() => [
                        createVNode("div", null, [
                          createVNode("p", { class: "text-sm text-muted-foreground" }, "Nama"),
                          createVNode("p", { class: "font-medium" }, toDisplayString(__props.bonus.from_member_name), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("p", { class: "text-sm text-muted-foreground" }, "Ewallet ID"),
                          createVNode("p", { class: "font-medium" }, toDisplayString(__props.bonus.from_member_ewallet_id), 1)
                        ]),
                        createVNode("div", { class: "text-sm text-muted-foreground" }, " Bonus ini berasal dari aktivitas member di atas ")
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
                              _push5(`Timeline`);
                            } else {
                              return [
                                createTextVNode("Timeline")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("Timeline")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { class: "space-y-3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div${_scopeId3}><p class="text-sm text-muted-foreground"${_scopeId3}>Dibuat</p><p class="font-medium"${_scopeId3}>${ssrInterpolate(formatDate(__props.bonus.created_at))}</p></div><div${_scopeId3}><p class="text-sm text-muted-foreground"${_scopeId3}>Terakhir Diupdate</p><p class="font-medium"${_scopeId3}>${ssrInterpolate(formatDate(__props.bonus.updated_at))}</p></div>`);
                      } else {
                        return [
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm text-muted-foreground" }, "Dibuat"),
                            createVNode("p", { class: "font-medium" }, toDisplayString(formatDate(__props.bonus.created_at)), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm text-muted-foreground" }, "Terakhir Diupdate"),
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
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode("Timeline")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), { class: "space-y-3" }, {
                      default: withCtx(() => [
                        createVNode("div", null, [
                          createVNode("p", { class: "text-sm text-muted-foreground" }, "Dibuat"),
                          createVNode("p", { class: "font-medium" }, toDisplayString(formatDate(__props.bonus.created_at)), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("p", { class: "text-sm text-muted-foreground" }, "Terakhir Diupdate"),
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
              _push2(`<div class="flex gap-2"${_scopeId}>`);
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
              _push2(ssrRenderComponent(unref(_sfc_main$2), {
                variant: "destructive",
                onClick: ($event) => deleteDialog.value = true
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Trash2), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                    _push3(` Hapus `);
                  } else {
                    return [
                      createVNode(unref(Trash2), { class: "h-4 w-4" }),
                      createTextVNode(" Hapus ")
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
            _push2(ssrRenderComponent(_sfc_main$8, {
              open: deleteDialog.value,
              "onUpdate:open": ($event) => deleteDialog.value = $event,
              title: "Hapus Bonus?",
              description: "Apakah Anda yakin ingin menghapus bonus ini? Tindakan ini tidak dapat dibatalkan.",
              "confirm-text": "Hapus",
              "cancel-text": "Batal",
              variant: "destructive",
              onConfirm: handleDelete
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$8, {
              open: releaseDialog.value,
              "onUpdate:open": ($event) => releaseDialog.value = $event,
              title: "Release Bonus?",
              description: `Bonus sebesar ${formatCurrency(__props.bonus.amount)} akan ditransfer ke ewallet ${__props.bonus.member_name}. Lanjutkan?`,
              "confirm-text": "Release",
              "cancel-text": "Batal",
              onConfirm: handleRelease
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Head), { title: "Detail Bonus Matching" }),
              createVNode("div", { class: "rounded-xl p-4 space-y-6 py-6" }, [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("div", { class: "flex items-center gap-4" }, [
                    createVNode(unref(Link), {
                      href: unref(index).url()
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$2), {
                          variant: "outline",
                          size: "icon"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(ArrowLeft), { class: "h-4 w-4" })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-3xl font-bold tracking-tight" }, "Detail Bonus Matching"),
                      createVNode("p", { class: "text-muted-foreground" }, "Informasi lengkap bonus matching")
                    ])
                  ]),
                  createVNode("div", { class: "flex gap-2" }, [
                    createVNode(unref(_sfc_main$3), {
                      variant: "outline",
                      class: "gap-1 text-sm px-3 py-1"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Layers), { class: "h-3 w-3" }),
                        createTextVNode(" Level " + toDisplayString(__props.bonus.level), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$3), {
                      variant: __props.bonus.status === 1 ? "default" : "secondary",
                      class: "gap-1 text-sm px-3 py-1"
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(resolveDynamicComponent(__props.bonus.status === 1 ? unref(CheckCircle) : unref(XCircle)), { class: "h-3 w-3" })),
                        createTextVNode(" " + toDisplayString(__props.bonus.status_text), 1)
                      ]),
                      _: 1
                    }, 8, ["variant"])
                  ])
                ]),
                createVNode("div", { class: "grid gap-6 md:grid-cols-2" }, [
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("Informasi Bonus")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                        default: withCtx(() => [
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm text-muted-foreground" }, "Jumlah"),
                            createVNode("p", { class: "text-2xl font-bold text-green-600" }, toDisplayString(formatCurrency(__props.bonus.amount)), 1)
                          ]),
                          createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                            createVNode("div", null, [
                              createVNode("p", { class: "text-sm text-muted-foreground" }, "Level"),
                              createVNode("p", { class: "font-medium" }, toDisplayString(__props.bonus.level), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("p", { class: "text-sm text-muted-foreground" }, "Index Value"),
                              createVNode("p", { class: "font-medium" }, toDisplayString(__props.bonus.index_value), 1)
                            ])
                          ]),
                          __props.bonus.description ? (openBlock(), createBlock("div", { key: 0 }, [
                            createVNode("p", { class: "text-sm text-muted-foreground" }, "Deskripsi"),
                            createVNode("p", { class: "mt-1" }, toDisplayString(__props.bonus.description), 1)
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
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("Penerima Bonus")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), { class: "space-y-3" }, {
                        default: withCtx(() => [
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm text-muted-foreground" }, "Nama"),
                            createVNode("p", { class: "font-medium" }, toDisplayString(__props.bonus.member_name), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm text-muted-foreground" }, "Ewallet ID"),
                            createVNode("p", { class: "font-medium" }, toDisplayString(__props.bonus.member_ewallet_id), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm text-muted-foreground" }, "Email"),
                            createVNode("p", { class: "font-medium" }, toDisplayString(__props.bonus.member_email), 1)
                          ])
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
                              createTextVNode("Sumber Bonus")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), { class: "space-y-3" }, {
                        default: withCtx(() => [
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm text-muted-foreground" }, "Nama"),
                            createVNode("p", { class: "font-medium" }, toDisplayString(__props.bonus.from_member_name), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm text-muted-foreground" }, "Ewallet ID"),
                            createVNode("p", { class: "font-medium" }, toDisplayString(__props.bonus.from_member_ewallet_id), 1)
                          ]),
                          createVNode("div", { class: "text-sm text-muted-foreground" }, " Bonus ini berasal dari aktivitas member di atas ")
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
                              createTextVNode("Timeline")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), { class: "space-y-3" }, {
                        default: withCtx(() => [
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm text-muted-foreground" }, "Dibuat"),
                            createVNode("p", { class: "font-medium" }, toDisplayString(formatDate(__props.bonus.created_at)), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm text-muted-foreground" }, "Terakhir Diupdate"),
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
                  class: "flex gap-2"
                }, [
                  createVNode(unref(_sfc_main$2), {
                    onClick: ($event) => releaseDialog.value = true
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Wallet), { class: "h-4 w-4" }),
                      createTextVNode(" Release Bonus ")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(unref(_sfc_main$2), {
                    variant: "destructive",
                    onClick: ($event) => deleteDialog.value = true
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Trash2), { class: "h-4 w-4" }),
                      createTextVNode(" Hapus ")
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ])) : createCommentVNode("", true)
              ]),
              createVNode(_sfc_main$8, {
                open: deleteDialog.value,
                "onUpdate:open": ($event) => deleteDialog.value = $event,
                title: "Hapus Bonus?",
                description: "Apakah Anda yakin ingin menghapus bonus ini? Tindakan ini tidak dapat dibatalkan.",
                "confirm-text": "Hapus",
                "cancel-text": "Batal",
                variant: "destructive",
                onConfirm: handleDelete
              }, null, 8, ["open", "onUpdate:open"]),
              createVNode(_sfc_main$8, {
                open: releaseDialog.value,
                "onUpdate:open": ($event) => releaseDialog.value = $event,
                title: "Release Bonus?",
                description: `Bonus sebesar ${formatCurrency(__props.bonus.amount)} akan ditransfer ke ewallet ${__props.bonus.member_name}. Lanjutkan?`,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/bonus/matching/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
