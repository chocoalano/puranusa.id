import { defineComponent, useModel, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext, toDisplayString, createBlock, createCommentVNode, openBlock, ref, computed, watch } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$i, v as approve, w as reject, x as destroy } from "./AppLayout-BqZcCUfR.js";
import { router, Head, useForm } from "@inertiajs/vue3";
import { _ as _sfc_main$k } from "./ConfirmDialog-CTU0x0KG.js";
import { _ as _sfc_main$5 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$6, a as _sfc_main$7, b as _sfc_main$8, c as _sfc_main$9, d as _sfc_main$a } from "./SelectValue-BUnv4mQg.js";
import { Search, Star, ShieldCheck, Check, X, Trash2, MessageSquare, CheckCircle, Clock } from "lucide-vue-next";
import { _ as _sfc_main$e } from "./index-BpQimeTM.js";
import { _ as _sfc_main$g } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$b, c as _sfc_main$c, a as _sfc_main$d, d as _sfc_main$f, b as _sfc_main$h } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$j } from "./Pagination-DAUeA01Y.js";
import "class-variance-authority";
import "./DropdownMenuTrigger-B1v6pHML.js";
import "reka-ui";
import "@vueuse/core";
import "./index--D7ld9AJ.js";
import "./AvatarImage-DWFQMckn.js";
import "./index-B0NlPG4h.js";
import "vue-sonner";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
import "./AlertDialogTrigger-DIWb7xue.js";
import "clsx";
import "tailwind-merge";
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ReviewFilters",
  __ssrInlineRender: true,
  props: {
    "search": { required: true },
    "searchModifiers": {},
    "rating": { required: true },
    "ratingModifiers": {},
    "approved": { required: true },
    "approvedModifiers": {}
  },
  emits: ["update:search", "update:rating", "update:approved"],
  setup(__props) {
    const search = useModel(__props, "search");
    const rating = useModel(__props, "rating");
    const approved = useModel(__props, "approved");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center gap-4" }, _attrs))}><div class="relative flex-1">`);
      _push(ssrRenderComponent(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$5), {
        modelValue: search.value,
        "onUpdate:modelValue": ($event) => search.value = $event,
        placeholder: "Cari produk atau pelanggan...",
        class: "pl-9"
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(unref(_sfc_main$6), {
        modelValue: rating.value,
        "onUpdate:modelValue": ($event) => rating.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$7), { class: "w-32" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$8), { placeholder: "Rating" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$8), { placeholder: "Rating" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$9), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$a), { value: "all" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Semua Rating`);
                      } else {
                        return [
                          createTextVNode("Semua Rating")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$a), { value: "5" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`5 Bintang`);
                      } else {
                        return [
                          createTextVNode("5 Bintang")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$a), { value: "4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`4 Bintang`);
                      } else {
                        return [
                          createTextVNode("4 Bintang")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$a), { value: "3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`3 Bintang`);
                      } else {
                        return [
                          createTextVNode("3 Bintang")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$a), { value: "2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`2 Bintang`);
                      } else {
                        return [
                          createTextVNode("2 Bintang")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$a), { value: "1" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`1 Bintang`);
                      } else {
                        return [
                          createTextVNode("1 Bintang")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$a), { value: "all" }, {
                      default: withCtx(() => [
                        createTextVNode("Semua Rating")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$a), { value: "5" }, {
                      default: withCtx(() => [
                        createTextVNode("5 Bintang")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$a), { value: "4" }, {
                      default: withCtx(() => [
                        createTextVNode("4 Bintang")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$a), { value: "3" }, {
                      default: withCtx(() => [
                        createTextVNode("3 Bintang")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$a), { value: "2" }, {
                      default: withCtx(() => [
                        createTextVNode("2 Bintang")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$a), { value: "1" }, {
                      default: withCtx(() => [
                        createTextVNode("1 Bintang")
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
              createVNode(unref(_sfc_main$7), { class: "w-32" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$8), { placeholder: "Rating" })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$9), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$a), { value: "all" }, {
                    default: withCtx(() => [
                      createTextVNode("Semua Rating")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$a), { value: "5" }, {
                    default: withCtx(() => [
                      createTextVNode("5 Bintang")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$a), { value: "4" }, {
                    default: withCtx(() => [
                      createTextVNode("4 Bintang")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$a), { value: "3" }, {
                    default: withCtx(() => [
                      createTextVNode("3 Bintang")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$a), { value: "2" }, {
                    default: withCtx(() => [
                      createTextVNode("2 Bintang")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$a), { value: "1" }, {
                    default: withCtx(() => [
                      createTextVNode("1 Bintang")
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
      _push(ssrRenderComponent(unref(_sfc_main$6), {
        modelValue: approved.value,
        "onUpdate:modelValue": ($event) => approved.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$7), { class: "w-40" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$8), { placeholder: "Status" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$8), { placeholder: "Status" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$9), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$a), { value: "all" }, {
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
                  _push3(ssrRenderComponent(unref(_sfc_main$a), { value: "1" }, {
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
                  _push3(ssrRenderComponent(unref(_sfc_main$a), { value: "0" }, {
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
                } else {
                  return [
                    createVNode(unref(_sfc_main$a), { value: "all" }, {
                      default: withCtx(() => [
                        createTextVNode("Semua Status")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$a), { value: "1" }, {
                      default: withCtx(() => [
                        createTextVNode("Disetujui")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$a), { value: "0" }, {
                      default: withCtx(() => [
                        createTextVNode("Pending")
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
              createVNode(unref(_sfc_main$7), { class: "w-40" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$8), { placeholder: "Status" })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$9), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$a), { value: "all" }, {
                    default: withCtx(() => [
                      createTextVNode("Semua Status")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$a), { value: "1" }, {
                    default: withCtx(() => [
                      createTextVNode("Disetujui")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$a), { value: "0" }, {
                    default: withCtx(() => [
                      createTextVNode("Pending")
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
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/reviews/ReviewFilters.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "StarRating",
  __ssrInlineRender: true,
  props: {
    rating: {},
    size: { default: "md" },
    showNumber: { type: Boolean, default: false }
  },
  setup(__props) {
    const sizeClasses = {
      sm: "h-3 w-3",
      md: "h-4 w-4",
      lg: "h-5 w-5"
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center gap-1" }, _attrs))}><!--[-->`);
      ssrRenderList(5, (i) => {
        _push(ssrRenderComponent(unref(Star), {
          key: i,
          class: [
            sizeClasses[__props.size],
            i <= __props.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-300"
          ]
        }, null, _parent));
      });
      _push(`<!--]-->`);
      if (__props.showNumber) {
        _push(`<span class="ml-1 text-sm text-muted-foreground">${ssrInterpolate(__props.rating)}/5 </span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/reviews/StarRating.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ReviewCard",
  __ssrInlineRender: true,
  props: {
    reviews: {}
  },
  emits: ["approve", "reject", "delete"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}>`);
      if (__props.reviews.length === 0) {
        _push(ssrRenderComponent(unref(_sfc_main$b), null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$c), { class: "py-12 text-center text-muted-foreground" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Tidak ada review ditemukan `);
                  } else {
                    return [
                      createTextVNode(" Tidak ada review ditemukan ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$c), { class: "py-12 text-center text-muted-foreground" }, {
                  default: withCtx(() => [
                    createTextVNode(" Tidak ada review ditemukan ")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(__props.reviews, (review) => {
        _push(ssrRenderComponent(unref(_sfc_main$b), {
          key: review.id
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$d), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex items-start justify-between"${_scopeId2}><div class="space-y-1"${_scopeId2}><div class="flex items-center gap-2"${_scopeId2}><h3 class="font-semibold"${_scopeId2}>${ssrInterpolate(review.product?.name || "N/A")}</h3>`);
                    if (review.is_verified_purchase) {
                      _push3(ssrRenderComponent(unref(_sfc_main$e), {
                        variant: "secondary",
                        class: "gap-1"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(ShieldCheck), { class: "h-3 w-3" }, null, _parent4, _scopeId3));
                            _push4(` Verified `);
                          } else {
                            return [
                              createVNode(unref(ShieldCheck), { class: "h-3 w-3" }),
                              createTextVNode(" Verified ")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$f), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Oleh ${ssrInterpolate(review.customer?.name || "N/A")} · ${ssrInterpolate(formatDate(review.created_at))}`);
                        } else {
                          return [
                            createTextVNode(" Oleh " + toDisplayString(review.customer?.name || "N/A") + " · " + toDisplayString(formatDate(review.created_at)), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$e), {
                      variant: review.is_approved ? "default" : "secondary"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(review.is_approved ? "Disetujui" : "Pending")}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(review.is_approved ? "Disetujui" : "Pending"), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex items-start justify-between" }, [
                        createVNode("div", { class: "space-y-1" }, [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode("h3", { class: "font-semibold" }, toDisplayString(review.product?.name || "N/A"), 1),
                            review.is_verified_purchase ? (openBlock(), createBlock(unref(_sfc_main$e), {
                              key: 0,
                              variant: "secondary",
                              class: "gap-1"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(ShieldCheck), { class: "h-3 w-3" }),
                                createTextVNode(" Verified ")
                              ]),
                              _: 1
                            })) : createCommentVNode("", true)
                          ]),
                          createVNode(unref(_sfc_main$f), null, {
                            default: withCtx(() => [
                              createTextVNode(" Oleh " + toDisplayString(review.customer?.name || "N/A") + " · " + toDisplayString(formatDate(review.created_at)), 1)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        createVNode(unref(_sfc_main$e), {
                          variant: review.is_approved ? "default" : "secondary"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(review.is_approved ? "Disetujui" : "Pending"), 1)
                          ]),
                          _: 2
                        }, 1032, ["variant"])
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$c), { class: "space-y-4" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="space-y-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_sfc_main$3, {
                      rating: review.rating,
                      "show-number": true
                    }, null, _parent3, _scopeId2));
                    _push3(`<h4 class="font-medium"${_scopeId2}>${ssrInterpolate(review.title)}</h4><p class="text-sm text-muted-foreground"${_scopeId2}>${ssrInterpolate(review.comment)}</p></div><div class="flex gap-2 pt-2 border-t"${_scopeId2}>`);
                    if (!review.is_approved) {
                      _push3(ssrRenderComponent(unref(_sfc_main$g), {
                        size: "sm",
                        onClick: ($event) => emit("approve", review.id)
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(Check), { class: "mr-2 h-4 w-4" }, null, _parent4, _scopeId3));
                            _push4(` Setujui `);
                          } else {
                            return [
                              createVNode(unref(Check), { class: "mr-2 h-4 w-4" }),
                              createTextVNode(" Setujui ")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    if (review.is_approved) {
                      _push3(ssrRenderComponent(unref(_sfc_main$g), {
                        size: "sm",
                        variant: "outline",
                        onClick: ($event) => emit("reject", review.id)
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(X), { class: "mr-2 h-4 w-4" }, null, _parent4, _scopeId3));
                            _push4(` Tolak `);
                          } else {
                            return [
                              createVNode(unref(X), { class: "mr-2 h-4 w-4" }),
                              createTextVNode(" Tolak ")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(ssrRenderComponent(unref(_sfc_main$g), {
                      size: "sm",
                      variant: "destructive",
                      onClick: ($event) => emit("delete", review.id)
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Trash2), { class: "mr-2 h-4 w-4" }, null, _parent4, _scopeId3));
                          _push4(` Hapus `);
                        } else {
                          return [
                            createVNode(unref(Trash2), { class: "mr-2 h-4 w-4" }),
                            createTextVNode(" Hapus ")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_sfc_main$3, {
                          rating: review.rating,
                          "show-number": true
                        }, null, 8, ["rating"]),
                        createVNode("h4", { class: "font-medium" }, toDisplayString(review.title), 1),
                        createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(review.comment), 1)
                      ]),
                      createVNode("div", { class: "flex gap-2 pt-2 border-t" }, [
                        !review.is_approved ? (openBlock(), createBlock(unref(_sfc_main$g), {
                          key: 0,
                          size: "sm",
                          onClick: ($event) => emit("approve", review.id)
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Check), { class: "mr-2 h-4 w-4" }),
                            createTextVNode(" Setujui ")
                          ]),
                          _: 1
                        }, 8, ["onClick"])) : createCommentVNode("", true),
                        review.is_approved ? (openBlock(), createBlock(unref(_sfc_main$g), {
                          key: 1,
                          size: "sm",
                          variant: "outline",
                          onClick: ($event) => emit("reject", review.id)
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(X), { class: "mr-2 h-4 w-4" }),
                            createTextVNode(" Tolak ")
                          ]),
                          _: 1
                        }, 8, ["onClick"])) : createCommentVNode("", true),
                        createVNode(unref(_sfc_main$g), {
                          size: "sm",
                          variant: "destructive",
                          onClick: ($event) => emit("delete", review.id)
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Trash2), { class: "mr-2 h-4 w-4" }),
                            createTextVNode(" Hapus ")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$d), null, {
                  default: withCtx(() => [
                    createVNode("div", { class: "flex items-start justify-between" }, [
                      createVNode("div", { class: "space-y-1" }, [
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode("h3", { class: "font-semibold" }, toDisplayString(review.product?.name || "N/A"), 1),
                          review.is_verified_purchase ? (openBlock(), createBlock(unref(_sfc_main$e), {
                            key: 0,
                            variant: "secondary",
                            class: "gap-1"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(ShieldCheck), { class: "h-3 w-3" }),
                              createTextVNode(" Verified ")
                            ]),
                            _: 1
                          })) : createCommentVNode("", true)
                        ]),
                        createVNode(unref(_sfc_main$f), null, {
                          default: withCtx(() => [
                            createTextVNode(" Oleh " + toDisplayString(review.customer?.name || "N/A") + " · " + toDisplayString(formatDate(review.created_at)), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      createVNode(unref(_sfc_main$e), {
                        variant: review.is_approved ? "default" : "secondary"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(review.is_approved ? "Disetujui" : "Pending"), 1)
                        ]),
                        _: 2
                      }, 1032, ["variant"])
                    ])
                  ]),
                  _: 2
                }, 1024),
                createVNode(unref(_sfc_main$c), { class: "space-y-4" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_sfc_main$3, {
                        rating: review.rating,
                        "show-number": true
                      }, null, 8, ["rating"]),
                      createVNode("h4", { class: "font-medium" }, toDisplayString(review.title), 1),
                      createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(review.comment), 1)
                    ]),
                    createVNode("div", { class: "flex gap-2 pt-2 border-t" }, [
                      !review.is_approved ? (openBlock(), createBlock(unref(_sfc_main$g), {
                        key: 0,
                        size: "sm",
                        onClick: ($event) => emit("approve", review.id)
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Check), { class: "mr-2 h-4 w-4" }),
                          createTextVNode(" Setujui ")
                        ]),
                        _: 1
                      }, 8, ["onClick"])) : createCommentVNode("", true),
                      review.is_approved ? (openBlock(), createBlock(unref(_sfc_main$g), {
                        key: 1,
                        size: "sm",
                        variant: "outline",
                        onClick: ($event) => emit("reject", review.id)
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(X), { class: "mr-2 h-4 w-4" }),
                          createTextVNode(" Tolak ")
                        ]),
                        _: 1
                      }, 8, ["onClick"])) : createCommentVNode("", true),
                      createVNode(unref(_sfc_main$g), {
                        size: "sm",
                        variant: "destructive",
                        onClick: ($event) => emit("delete", review.id)
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Trash2), { class: "mr-2 h-4 w-4" }),
                          createTextVNode(" Hapus ")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ])
                  ]),
                  _: 2
                }, 1024)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/reviews/ReviewCard.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ReviewStatistics",
  __ssrInlineRender: true,
  props: {
    statistics: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid gap-4 md:grid-cols-4" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(_sfc_main$b), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$d), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$h), { class: "text-sm font-medium" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Total Review`);
                      } else {
                        return [
                          createTextVNode("Total Review")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(MessageSquare), { class: "h-4 w-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$h), { class: "text-sm font-medium" }, {
                      default: withCtx(() => [
                        createTextVNode("Total Review")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(MessageSquare), { class: "h-4 w-4 text-muted-foreground" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$c), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(__props.statistics.total)}</div><p class="text-xs text-muted-foreground"${_scopeId2}>Semua review</p>`);
                } else {
                  return [
                    createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics.total), 1),
                    createVNode("p", { class: "text-xs text-muted-foreground" }, "Semua review")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$d), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$h), { class: "text-sm font-medium" }, {
                    default: withCtx(() => [
                      createTextVNode("Total Review")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(MessageSquare), { class: "h-4 w-4 text-muted-foreground" })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$c), null, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics.total), 1),
                  createVNode("p", { class: "text-xs text-muted-foreground" }, "Semua review")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$b), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$d), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$h), { class: "text-sm font-medium" }, {
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
                    createVNode(unref(_sfc_main$h), { class: "text-sm font-medium" }, {
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
            _push2(ssrRenderComponent(unref(_sfc_main$c), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(__props.statistics.approved)}</div><p class="text-xs text-muted-foreground"${_scopeId2}>Review disetujui</p>`);
                } else {
                  return [
                    createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics.approved), 1),
                    createVNode("p", { class: "text-xs text-muted-foreground" }, "Review disetujui")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$d), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$h), { class: "text-sm font-medium" }, {
                    default: withCtx(() => [
                      createTextVNode("Disetujui")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(CheckCircle), { class: "h-4 w-4 text-muted-foreground" })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$c), null, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics.approved), 1),
                  createVNode("p", { class: "text-xs text-muted-foreground" }, "Review disetujui")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$b), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$d), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$h), { class: "text-sm font-medium" }, {
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
                    createVNode(unref(_sfc_main$h), { class: "text-sm font-medium" }, {
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
            _push2(ssrRenderComponent(unref(_sfc_main$c), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(__props.statistics.pending)}</div><p class="text-xs text-muted-foreground"${_scopeId2}>Menunggu moderasi</p>`);
                } else {
                  return [
                    createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics.pending), 1),
                    createVNode("p", { class: "text-xs text-muted-foreground" }, "Menunggu moderasi")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$d), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$h), { class: "text-sm font-medium" }, {
                    default: withCtx(() => [
                      createTextVNode("Pending")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(Clock), { class: "h-4 w-4 text-muted-foreground" })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$c), null, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics.pending), 1),
                  createVNode("p", { class: "text-xs text-muted-foreground" }, "Menunggu moderasi")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$b), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$d), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$h), { class: "text-sm font-medium" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Rating Rata-rata`);
                      } else {
                        return [
                          createTextVNode("Rating Rata-rata")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(Star), { class: "h-4 w-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$h), { class: "text-sm font-medium" }, {
                      default: withCtx(() => [
                        createTextVNode("Rating Rata-rata")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(Star), { class: "h-4 w-4 text-muted-foreground" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$c), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(__props.statistics.average_rating.toFixed(1))}</div><p class="text-xs text-muted-foreground"${_scopeId2}>Dari 5.0</p>`);
                } else {
                  return [
                    createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics.average_rating.toFixed(1)), 1),
                    createVNode("p", { class: "text-xs text-muted-foreground" }, "Dari 5.0")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$d), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$h), { class: "text-sm font-medium" }, {
                    default: withCtx(() => [
                      createTextVNode("Rating Rata-rata")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(Star), { class: "h-4 w-4 text-muted-foreground" })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$c), null, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics.average_rating.toFixed(1)), 1),
                  createVNode("p", { class: "text-xs text-muted-foreground" }, "Dari 5.0")
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/reviews/ReviewStatistics.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    reviews: {},
    filters: {}
  },
  setup(__props) {
    const props = __props;
    const searchQuery = ref(props.filters.search || "");
    const ratingFilter = ref(props.filters.rating?.toString() || "all");
    const approvedFilter = ref(
      props.filters.approved === true ? "1" : props.filters.approved === false ? "0" : "all"
    );
    const deleteDialog = ref({
      open: false,
      review: null
    });
    const statistics = computed(() => {
      const approved = props.reviews.data.filter((r) => r.is_approved).length;
      const total = props.reviews.total;
      const pending = total - approved;
      const avgRating = props.reviews.data.reduce((acc, r) => acc + r.rating, 0) / props.reviews.data.length || 0;
      return {
        total,
        approved,
        pending,
        average_rating: avgRating
      };
    });
    const handleApprove = (id) => {
      const approveForm = useForm({});
      approveForm.post(approve.url(id), { preserveScroll: true });
    };
    const handleReject = (id) => {
      const rejectForm = useForm({});
      rejectForm.post(reject.url(id), { preserveScroll: true });
    };
    const openDeleteDialog = (id) => {
      const review = props.reviews.data.find((r) => r.id === id);
      deleteDialog.value = { open: true, review: review || null };
    };
    const handleDelete = () => {
      if (!deleteDialog.value.review) return;
      const deleteForm = useForm({});
      deleteForm.delete(destroy.url(deleteDialog.value.review.id), {
        preserveScroll: true,
        onSuccess: () => {
          deleteDialog.value = { open: false, review: null };
        }
      });
    };
    let searchTimeout;
    watch([searchQuery, ratingFilter, approvedFilter], () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        router.get(
          "/admin/reviews",
          {
            search: searchQuery.value || void 0,
            rating: ratingFilter.value !== "all" ? ratingFilter.value : void 0,
            approved: approvedFilter.value !== "all" ? approvedFilter.value === "1" ? true : false : void 0
          },
          {
            preserveState: true,
            preserveScroll: true
          }
        );
      }, 300);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Kelola Review" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$i, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="rounded-xl p-4 space-y-6 py-6"${_scopeId}><div${_scopeId}><h2 class="text-3xl font-bold tracking-tight"${_scopeId}>Kelola Review Produk</h2><p class="text-muted-foreground"${_scopeId}>Kelola dan moderasi review dari pelanggan</p></div>`);
            _push2(ssrRenderComponent(_sfc_main$1, { statistics: statistics.value }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              search: searchQuery.value,
              "onUpdate:search": ($event) => searchQuery.value = $event,
              rating: ratingFilter.value,
              "onUpdate:rating": ($event) => ratingFilter.value = $event,
              approved: approvedFilter.value,
              "onUpdate:approved": ($event) => approvedFilter.value = $event
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              reviews: __props.reviews.data,
              onApprove: handleApprove,
              onReject: handleReject,
              onDelete: openDeleteDialog
            }, null, _parent2, _scopeId));
            if (__props.reviews.last_page > 1) {
              _push2(ssrRenderComponent(_sfc_main$j, {
                data: __props.reviews,
                url: "/admin/reviews",
                filters: __props.filters
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$k, {
              open: deleteDialog.value.open,
              "onUpdate:open": ($event) => deleteDialog.value.open = $event,
              title: "Hapus Review?",
              description: `Apakah Anda yakin ingin menghapus review '${deleteDialog.value.review?.title}'? Tindakan ini tidak dapat dibatalkan.`,
              "confirm-text": "Hapus",
              "cancel-text": "Batal",
              variant: "destructive",
              onConfirm: handleDelete
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "rounded-xl p-4 space-y-6 py-6" }, [
                createVNode("div", null, [
                  createVNode("h2", { class: "text-3xl font-bold tracking-tight" }, "Kelola Review Produk"),
                  createVNode("p", { class: "text-muted-foreground" }, "Kelola dan moderasi review dari pelanggan")
                ]),
                createVNode(_sfc_main$1, { statistics: statistics.value }, null, 8, ["statistics"]),
                createVNode(_sfc_main$4, {
                  search: searchQuery.value,
                  "onUpdate:search": ($event) => searchQuery.value = $event,
                  rating: ratingFilter.value,
                  "onUpdate:rating": ($event) => ratingFilter.value = $event,
                  approved: approvedFilter.value,
                  "onUpdate:approved": ($event) => approvedFilter.value = $event
                }, null, 8, ["search", "onUpdate:search", "rating", "onUpdate:rating", "approved", "onUpdate:approved"]),
                createVNode(_sfc_main$2, {
                  reviews: __props.reviews.data,
                  onApprove: handleApprove,
                  onReject: handleReject,
                  onDelete: openDeleteDialog
                }, null, 8, ["reviews"]),
                __props.reviews.last_page > 1 ? (openBlock(), createBlock(_sfc_main$j, {
                  key: 0,
                  data: __props.reviews,
                  url: "/admin/reviews",
                  filters: __props.filters
                }, null, 8, ["data", "filters"])) : createCommentVNode("", true)
              ]),
              createVNode(_sfc_main$k, {
                open: deleteDialog.value.open,
                "onUpdate:open": ($event) => deleteDialog.value.open = $event,
                title: "Hapus Review?",
                description: `Apakah Anda yakin ingin menghapus review '${deleteDialog.value.review?.title}'? Tindakan ini tidak dapat dibatalkan.`,
                "confirm-text": "Hapus",
                "cancel-text": "Batal",
                variant: "destructive",
                onConfirm: handleDelete
              }, null, 8, ["open", "onUpdate:open", "description"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Reviews/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
