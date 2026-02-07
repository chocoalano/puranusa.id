import { defineComponent, ref, watch, unref, withCtx, createTextVNode, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, resolveDynamicComponent, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderVNode } from "vue/server-renderer";
import { _ as _sfc_main$k } from "./index-BpQimeTM.js";
import { _ as _sfc_main$2 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5, c as _sfc_main$6, d as _sfc_main$7 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$8 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$9, a as _sfc_main$a, b as _sfc_main$b, c as _sfc_main$c, d as _sfc_main$d } from "./SelectValue-BUnv4mQg.js";
import { _ as _sfc_main$e, a as _sfc_main$f, b as _sfc_main$g, c as _sfc_main$h, d as _sfc_main$i, e as _sfc_main$j } from "./TableHeader-emcE6QAC.js";
import { _ as _sfc_main$1, b as show } from "./AppLayout-DTAmF_5Z.js";
import { Head, Link, router } from "@inertiajs/vue3";
import { Gift, Target, Users, Search, Clock, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight, Trophy, CheckCircle } from "lucide-vue-next";
import "class-variance-authority";
import "@vueuse/core";
import "reka-ui";
import "clsx";
import "tailwind-merge";
import "./DropdownMenuTrigger-B1v6pHML.js";
import "./index-3UqiGNe9.js";
import "./AvatarImage-DWFQMckn.js";
import "./index-Bfu0FVt6.js";
import "vue-sonner";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    activeRewards: {},
    progressData: {},
    claimedRewards: {},
    filters: {}
  },
  setup(__props) {
    const props = __props;
    const breadcrumbItems = [
      { title: "Pengaturan", href: "#" },
      { title: "Promotions Rewards Progress", href: "/admin/settings/promotions-rewards/progress" }
    ];
    const search = ref(props.filters.search || "");
    const selectedReward = ref(props.filters.reward_id || "all");
    const selectedStatus = ref(props.filters.status || "all");
    const claimedSearch = ref(props.filters.claimed_search || "");
    const formatNumber = (value) => {
      return new Intl.NumberFormat("id-ID").format(value);
    };
    const formatCurrency = (value) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(value);
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
    const applyFilters = () => {
      router.get("/admin/settings/promotions-rewards/progress", {
        search: search.value || void 0,
        reward_id: selectedReward.value !== "all" ? selectedReward.value : void 0,
        status: selectedStatus.value !== "all" ? selectedStatus.value : void 0,
        claimed_search: claimedSearch.value || void 0
      }, {
        preserveState: true,
        replace: true
      });
    };
    let searchTimeout;
    watch([search, claimedSearch], () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(applyFilters, 300);
    });
    watch([selectedReward, selectedStatus], applyFilters);
    const goToProgressPage = (page) => {
      router.get("/admin/settings/promotions-rewards/progress", {
        page,
        search: search.value || void 0,
        reward_id: selectedReward.value !== "all" ? selectedReward.value : void 0,
        status: selectedStatus.value !== "all" ? selectedStatus.value : void 0,
        claimed_search: claimedSearch.value || void 0
      }, {
        preserveState: true,
        replace: true
      });
    };
    const goToClaimedPage = (page) => {
      router.get("/admin/settings/promotions-rewards/progress", {
        claimed_page: page,
        search: search.value || void 0,
        reward_id: selectedReward.value !== "all" ? selectedReward.value : void 0,
        status: selectedStatus.value !== "all" ? selectedStatus.value : void 0,
        claimed_search: claimedSearch.value || void 0
      }, {
        preserveState: true,
        replace: true
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Promotions Rewards Progress" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, { breadcrumbs: breadcrumbItems }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-full flex-1 flex-col gap-6 rounded-xl p-4"${_scopeId}><div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"${_scopeId}><div${_scopeId}><h1 class="text-3xl font-bold tracking-tight flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Gift), { class: "h-8 w-8" }, null, _parent2, _scopeId));
            _push2(` Promotions Rewards Progress </h1><p class="text-muted-foreground mt-1"${_scopeId}> Lihat progress dan riwayat klaim reward promosi semua member </p></div>`);
            _push2(ssrRenderComponent(unref(Link), { href: "/admin/settings/promotions-rewards" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$2), { variant: "outline" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Kelola Rewards `);
                      } else {
                        return [
                          createTextVNode(" Kelola Rewards ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$2), { variant: "outline" }, {
                      default: withCtx(() => [
                        createTextVNode(" Kelola Rewards ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4"${_scopeId}><!--[-->`);
            ssrRenderList(__props.activeRewards, (reward) => {
              _push2(ssrRenderComponent(unref(_sfc_main$3), {
                key: reward.id
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$4), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(reward.name)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(reward.name), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(Target), { class: "h-4 w-4 text-muted-foreground" }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(reward.name), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(unref(Target), { class: "h-4 w-4 text-muted-foreground" })
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$6), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="text-xs text-muted-foreground mb-1"${_scopeId3}>${ssrInterpolate(reward.reward)}</div><div class="text-sm"${_scopeId3}><span class="font-semibold"${_scopeId3}>${ssrInterpolate(reward.progress_count)}</span> member dalam progress </div><div class="text-sm text-green-600"${_scopeId3}><span class="font-semibold"${_scopeId3}>${ssrInterpolate(reward.achieved_count)}</span> tercapai/diproses </div><div class="text-xs text-muted-foreground mt-2"${_scopeId3}>${ssrInterpolate(formatDate(reward.start))} - ${ssrInterpolate(formatDate(reward.end))}</div><div class="text-xs text-muted-foreground"${_scopeId3}> Syarat: ${ssrInterpolate(formatNumber(reward.bv_left))} BV Kiri &amp; Kanan </div>`);
                        } else {
                          return [
                            createVNode("div", { class: "text-xs text-muted-foreground mb-1" }, toDisplayString(reward.reward), 1),
                            createVNode("div", { class: "text-sm" }, [
                              createVNode("span", { class: "font-semibold" }, toDisplayString(reward.progress_count), 1),
                              createTextVNode(" member dalam progress ")
                            ]),
                            createVNode("div", { class: "text-sm text-green-600" }, [
                              createVNode("span", { class: "font-semibold" }, toDisplayString(reward.achieved_count), 1),
                              createTextVNode(" tercapai/diproses ")
                            ]),
                            createVNode("div", { class: "text-xs text-muted-foreground mt-2" }, toDisplayString(formatDate(reward.start)) + " - " + toDisplayString(formatDate(reward.end)), 1),
                            createVNode("div", { class: "text-xs text-muted-foreground" }, " Syarat: " + toDisplayString(formatNumber(reward.bv_left)) + " BV Kiri & Kanan ", 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$4), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(reward.name), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(Target), { class: "h-4 w-4 text-muted-foreground" })
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(unref(_sfc_main$6), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-xs text-muted-foreground mb-1" }, toDisplayString(reward.reward), 1),
                          createVNode("div", { class: "text-sm" }, [
                            createVNode("span", { class: "font-semibold" }, toDisplayString(reward.progress_count), 1),
                            createTextVNode(" member dalam progress ")
                          ]),
                          createVNode("div", { class: "text-sm text-green-600" }, [
                            createVNode("span", { class: "font-semibold" }, toDisplayString(reward.achieved_count), 1),
                            createTextVNode(" tercapai/diproses ")
                          ]),
                          createVNode("div", { class: "text-xs text-muted-foreground mt-2" }, toDisplayString(formatDate(reward.start)) + " - " + toDisplayString(formatDate(reward.end)), 1),
                          createVNode("div", { class: "text-xs text-muted-foreground" }, " Syarat: " + toDisplayString(formatNumber(reward.bv_left)) + " BV Kiri & Kanan ", 1)
                        ]),
                        _: 2
                      }, 1024)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
            if (__props.activeRewards.length === 0) {
              _push2(ssrRenderComponent(unref(_sfc_main$3), { class: "md:col-span-2 lg:col-span-4" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$6), { class: "flex items-center justify-center py-8" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="text-center text-muted-foreground"${_scopeId3}>`);
                          _push4(ssrRenderComponent(unref(Gift), { class: "h-12 w-12 mx-auto mb-2 opacity-50" }, null, _parent4, _scopeId3));
                          _push4(`<p${_scopeId3}>Tidak ada reward promosi aktif saat ini</p></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "text-center text-muted-foreground" }, [
                              createVNode(unref(Gift), { class: "h-12 w-12 mx-auto mb-2 opacity-50" }),
                              createVNode("p", null, "Tidak ada reward promosi aktif saat ini")
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$6), { class: "flex items-center justify-center py-8" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-center text-muted-foreground" }, [
                            createVNode(unref(Gift), { class: "h-12 w-12 mx-auto mb-2 opacity-50" }),
                            createVNode("p", null, "Tidak ada reward promosi aktif saat ini")
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
            _push2(ssrRenderComponent(unref(_sfc_main$3), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex items-center gap-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Users), { class: "h-5 w-5 text-primary" }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Progress Reward Member`);
                            } else {
                              return [
                                createTextVNode("Progress Reward Member")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$7), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Daftar member dengan progress pencapaian reward promosi aktif `);
                            } else {
                              return [
                                createTextVNode(" Daftar member dengan progress pencapaian reward promosi aktif ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode(unref(Users), { class: "h-5 w-5 text-primary" }),
                            createVNode(unref(_sfc_main$5), null, {
                              default: withCtx(() => [
                                createTextVNode("Progress Reward Member")
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode(unref(_sfc_main$7), null, {
                            default: withCtx(() => [
                              createTextVNode(" Daftar member dengan progress pencapaian reward promosi aktif ")
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
                        _push4(`<div class="flex flex-col gap-4 md:flex-row md:items-center mb-4"${_scopeId3}><div class="relative flex-1 md:max-w-sm"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$8), {
                          modelValue: search.value,
                          "onUpdate:modelValue": ($event) => search.value = $event,
                          placeholder: "Cari member...",
                          class: "pl-9"
                        }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          modelValue: selectedReward.value,
                          "onUpdate:modelValue": ($event) => selectedReward.value = $event
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$a), { class: "w-full md:w-48" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$b), { placeholder: "Filter Reward" }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$b), { placeholder: "Filter Reward" })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$d), { value: "all" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Semua Reward`);
                                        } else {
                                          return [
                                            createTextVNode("Semua Reward")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`<!--[-->`);
                                    ssrRenderList(__props.activeRewards, (reward) => {
                                      _push6(ssrRenderComponent(unref(_sfc_main$d), {
                                        key: reward.id,
                                        value: reward.id.toString()
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`${ssrInterpolate(reward.name)}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString(reward.name), 1)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    });
                                    _push6(`<!--]-->`);
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$d), { value: "all" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Semua Reward")
                                        ]),
                                        _: 1
                                      }),
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.activeRewards, (reward) => {
                                        return openBlock(), createBlock(unref(_sfc_main$d), {
                                          key: reward.id,
                                          value: reward.id.toString()
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(reward.name), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["value"]);
                                      }), 128))
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$a), { class: "w-full md:w-48" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$b), { placeholder: "Filter Reward" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$d), { value: "all" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Semua Reward")
                                      ]),
                                      _: 1
                                    }),
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.activeRewards, (reward) => {
                                      return openBlock(), createBlock(unref(_sfc_main$d), {
                                        key: reward.id,
                                        value: reward.id.toString()
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(reward.name), 1)
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
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          modelValue: selectedStatus.value,
                          "onUpdate:modelValue": ($event) => selectedStatus.value = $event
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$a), { class: "w-full md:w-40" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$b), { placeholder: "Filter Status" }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$b), { placeholder: "Filter Status" })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$d), { value: "all" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Semua Status`);
                                        } else {
                                          return [
                                            createTextVNode("Semua Status")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$d), { value: "0" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Belum Tercapai`);
                                        } else {
                                          return [
                                            createTextVNode("Belum Tercapai")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$d), { value: "1" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Diproses`);
                                        } else {
                                          return [
                                            createTextVNode("Diproses")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$d), { value: "all" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Semua Status")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$d), { value: "0" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Belum Tercapai")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$d), { value: "1" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Diproses")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$a), { class: "w-full md:w-40" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$b), { placeholder: "Filter Status" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$d), { value: "all" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Semua Status")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$d), { value: "0" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Belum Tercapai")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$d), { value: "1" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Diproses")
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
                        }, _parent4, _scopeId3));
                        _push4(`</div><div class="rounded-md border"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$e), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$f), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$g), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(unref(_sfc_main$h), null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`No`);
                                              } else {
                                                return [
                                                  createTextVNode("No")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(unref(_sfc_main$h), null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Member`);
                                              } else {
                                                return [
                                                  createTextVNode("Member")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(unref(_sfc_main$h), null, {
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
                                          _push7(ssrRenderComponent(unref(_sfc_main$h), { class: "text-right" }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Syarat BV Kiri`);
                                              } else {
                                                return [
                                                  createTextVNode("Syarat BV Kiri")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(unref(_sfc_main$h), { class: "text-right" }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Syarat BV Kanan`);
                                              } else {
                                                return [
                                                  createTextVNode("Syarat BV Kanan")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(unref(_sfc_main$h), { class: "text-right" }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Omset Kiri`);
                                              } else {
                                                return [
                                                  createTextVNode("Omset Kiri")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(unref(_sfc_main$h), { class: "text-right" }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Omset Kanan`);
                                              } else {
                                                return [
                                                  createTextVNode("Omset Kanan")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(unref(_sfc_main$h), null, {
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
                                            createVNode(unref(_sfc_main$h), null, {
                                              default: withCtx(() => [
                                                createTextVNode("No")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$h), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Member")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$h), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Reward")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Syarat BV Kiri")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Syarat BV Kanan")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Omset Kiri")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Omset Kanan")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$h), null, {
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
                                      createVNode(unref(_sfc_main$g), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$h), null, {
                                            default: withCtx(() => [
                                              createTextVNode("No")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$h), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Member")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$h), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Reward")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Syarat BV Kiri")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Syarat BV Kanan")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Omset Kiri")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Omset Kanan")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$h), null, {
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
                              _push5(ssrRenderComponent(unref(_sfc_main$i), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    if (__props.progressData.data.length === 0) {
                                      _push6(ssrRenderComponent(unref(_sfc_main$g), null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(unref(_sfc_main$j), {
                                              colspan: "8",
                                              class: "text-center py-8 text-muted-foreground"
                                            }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(` Tidak ada data progress `);
                                                } else {
                                                  return [
                                                    createTextVNode(" Tidak ada data progress ")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(unref(_sfc_main$j), {
                                                colspan: "8",
                                                class: "text-center py-8 text-muted-foreground"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" Tidak ada data progress ")
                                                ]),
                                                _: 1
                                              })
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      _push6(`<!---->`);
                                    }
                                    _push6(`<!--[-->`);
                                    ssrRenderList(__props.progressData.data, (item, index) => {
                                      _push6(ssrRenderComponent(unref(_sfc_main$g), {
                                        key: item.id
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(unref(_sfc_main$j), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate((__props.progressData.current_page - 1) * __props.progressData.per_page + index + 1)}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString((__props.progressData.current_page - 1) * __props.progressData.per_page + index + 1), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$j), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(unref(Link), {
                                                    href: unref(show).url(item.member_id),
                                                    class: "hover:underline"
                                                  }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`<div class="font-medium"${_scopeId8}>${ssrInterpolate(item.member_name)}</div><div class="text-xs text-muted-foreground"${_scopeId8}>${ssrInterpolate(item.member_ewallet_id)}</div>`);
                                                      } else {
                                                        return [
                                                          createVNode("div", { class: "font-medium" }, toDisplayString(item.member_name), 1),
                                                          createVNode("div", { class: "text-xs text-muted-foreground" }, toDisplayString(item.member_ewallet_id), 1)
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                } else {
                                                  return [
                                                    createVNode(unref(Link), {
                                                      href: unref(show).url(item.member_id),
                                                      class: "hover:underline"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode("div", { class: "font-medium" }, toDisplayString(item.member_name), 1),
                                                        createVNode("div", { class: "text-xs text-muted-foreground" }, toDisplayString(item.member_ewallet_id), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["href"])
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$j), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`<div class="font-medium"${_scopeId7}>${ssrInterpolate(item.reward_name)}</div><div class="text-xs text-muted-foreground"${_scopeId7}>${ssrInterpolate(item.reward_prize)}</div>`);
                                                } else {
                                                  return [
                                                    createVNode("div", { class: "font-medium" }, toDisplayString(item.reward_name), 1),
                                                    createVNode("div", { class: "text-xs text-muted-foreground" }, toDisplayString(item.reward_prize), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$j), { class: "text-right" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(formatNumber(item.bv_required))}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(formatNumber(item.bv_required)), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$j), { class: "text-right" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(formatNumber(item.bv_required))}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(formatNumber(item.bv_required)), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$j), { class: "text-right" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`<span class="${ssrRenderClass(item.omzet_left >= item.bv_required ? "text-green-600 font-semibold" : "")}"${_scopeId7}>${ssrInterpolate(formatNumber(item.omzet_left))}</span>`);
                                                } else {
                                                  return [
                                                    createVNode("span", {
                                                      class: item.omzet_left >= item.bv_required ? "text-green-600 font-semibold" : ""
                                                    }, toDisplayString(formatNumber(item.omzet_left)), 3)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$j), { class: "text-right" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`<span class="${ssrRenderClass(item.omzet_right >= item.bv_required ? "text-green-600 font-semibold" : "")}"${_scopeId7}>${ssrInterpolate(formatNumber(item.omzet_right))}</span>`);
                                                } else {
                                                  return [
                                                    createVNode("span", {
                                                      class: item.omzet_right >= item.bv_required ? "text-green-600 font-semibold" : ""
                                                    }, toDisplayString(formatNumber(item.omzet_right)), 3)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$j), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(unref(_sfc_main$k), {
                                                    variant: getStatusBadge(item.status).variant
                                                  }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        ssrRenderVNode(_push9, createVNode(resolveDynamicComponent(item.status === 1 ? unref(Clock) : unref(Target)), { class: "h-3 w-3 mr-1" }, null), _parent9, _scopeId8);
                                                        _push9(` ${ssrInterpolate(getStatusBadge(item.status).text)}`);
                                                      } else {
                                                        return [
                                                          (openBlock(), createBlock(resolveDynamicComponent(item.status === 1 ? unref(Clock) : unref(Target)), { class: "h-3 w-3 mr-1" })),
                                                          createTextVNode(" " + toDisplayString(getStatusBadge(item.status).text), 1)
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                } else {
                                                  return [
                                                    createVNode(unref(_sfc_main$k), {
                                                      variant: getStatusBadge(item.status).variant
                                                    }, {
                                                      default: withCtx(() => [
                                                        (openBlock(), createBlock(resolveDynamicComponent(item.status === 1 ? unref(Clock) : unref(Target)), { class: "h-3 w-3 mr-1" })),
                                                        createTextVNode(" " + toDisplayString(getStatusBadge(item.status).text), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["variant"])
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(unref(_sfc_main$j), null, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString((__props.progressData.current_page - 1) * __props.progressData.per_page + index + 1), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$j), null, {
                                                default: withCtx(() => [
                                                  createVNode(unref(Link), {
                                                    href: unref(show).url(item.member_id),
                                                    class: "hover:underline"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode("div", { class: "font-medium" }, toDisplayString(item.member_name), 1),
                                                      createVNode("div", { class: "text-xs text-muted-foreground" }, toDisplayString(item.member_ewallet_id), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["href"])
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$j), null, {
                                                default: withCtx(() => [
                                                  createVNode("div", { class: "font-medium" }, toDisplayString(item.reward_name), 1),
                                                  createVNode("div", { class: "text-xs text-muted-foreground" }, toDisplayString(item.reward_prize), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(formatNumber(item.bv_required)), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(formatNumber(item.bv_required)), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                                default: withCtx(() => [
                                                  createVNode("span", {
                                                    class: item.omzet_left >= item.bv_required ? "text-green-600 font-semibold" : ""
                                                  }, toDisplayString(formatNumber(item.omzet_left)), 3)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                                default: withCtx(() => [
                                                  createVNode("span", {
                                                    class: item.omzet_right >= item.bv_required ? "text-green-600 font-semibold" : ""
                                                  }, toDisplayString(formatNumber(item.omzet_right)), 3)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$j), null, {
                                                default: withCtx(() => [
                                                  createVNode(unref(_sfc_main$k), {
                                                    variant: getStatusBadge(item.status).variant
                                                  }, {
                                                    default: withCtx(() => [
                                                      (openBlock(), createBlock(resolveDynamicComponent(item.status === 1 ? unref(Clock) : unref(Target)), { class: "h-3 w-3 mr-1" })),
                                                      createTextVNode(" " + toDisplayString(getStatusBadge(item.status).text), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["variant"])
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
                                      __props.progressData.data.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$g), { key: 0 }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$j), {
                                            colspan: "8",
                                            class: "text-center py-8 text-muted-foreground"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(" Tidak ada data progress ")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })) : createCommentVNode("", true),
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.progressData.data, (item, index) => {
                                        return openBlock(), createBlock(unref(_sfc_main$g), {
                                          key: item.id
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$j), null, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString((__props.progressData.current_page - 1) * __props.progressData.per_page + index + 1), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$j), null, {
                                              default: withCtx(() => [
                                                createVNode(unref(Link), {
                                                  href: unref(show).url(item.member_id),
                                                  class: "hover:underline"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode("div", { class: "font-medium" }, toDisplayString(item.member_name), 1),
                                                    createVNode("div", { class: "text-xs text-muted-foreground" }, toDisplayString(item.member_ewallet_id), 1)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["href"])
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$j), null, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "font-medium" }, toDisplayString(item.reward_name), 1),
                                                createVNode("div", { class: "text-xs text-muted-foreground" }, toDisplayString(item.reward_prize), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(formatNumber(item.bv_required)), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(formatNumber(item.bv_required)), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createVNode("span", {
                                                  class: item.omzet_left >= item.bv_required ? "text-green-600 font-semibold" : ""
                                                }, toDisplayString(formatNumber(item.omzet_left)), 3)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createVNode("span", {
                                                  class: item.omzet_right >= item.bv_required ? "text-green-600 font-semibold" : ""
                                                }, toDisplayString(formatNumber(item.omzet_right)), 3)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$j), null, {
                                              default: withCtx(() => [
                                                createVNode(unref(_sfc_main$k), {
                                                  variant: getStatusBadge(item.status).variant
                                                }, {
                                                  default: withCtx(() => [
                                                    (openBlock(), createBlock(resolveDynamicComponent(item.status === 1 ? unref(Clock) : unref(Target)), { class: "h-3 w-3 mr-1" })),
                                                    createTextVNode(" " + toDisplayString(getStatusBadge(item.status).text), 1)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["variant"])
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
                                createVNode(unref(_sfc_main$f), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$g), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$h), null, {
                                          default: withCtx(() => [
                                            createTextVNode("No")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$h), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Member")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$h), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Reward")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Syarat BV Kiri")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Syarat BV Kanan")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Omset Kiri")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Omset Kanan")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$h), null, {
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
                                createVNode(unref(_sfc_main$i), null, {
                                  default: withCtx(() => [
                                    __props.progressData.data.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$g), { key: 0 }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$j), {
                                          colspan: "8",
                                          class: "text-center py-8 text-muted-foreground"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" Tidak ada data progress ")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })) : createCommentVNode("", true),
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.progressData.data, (item, index) => {
                                      return openBlock(), createBlock(unref(_sfc_main$g), {
                                        key: item.id
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$j), null, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString((__props.progressData.current_page - 1) * __props.progressData.per_page + index + 1), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$j), null, {
                                            default: withCtx(() => [
                                              createVNode(unref(Link), {
                                                href: unref(show).url(item.member_id),
                                                class: "hover:underline"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode("div", { class: "font-medium" }, toDisplayString(item.member_name), 1),
                                                  createVNode("div", { class: "text-xs text-muted-foreground" }, toDisplayString(item.member_ewallet_id), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["href"])
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$j), null, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "font-medium" }, toDisplayString(item.reward_name), 1),
                                              createVNode("div", { class: "text-xs text-muted-foreground" }, toDisplayString(item.reward_prize), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(formatNumber(item.bv_required)), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(formatNumber(item.bv_required)), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createVNode("span", {
                                                class: item.omzet_left >= item.bv_required ? "text-green-600 font-semibold" : ""
                                              }, toDisplayString(formatNumber(item.omzet_left)), 3)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createVNode("span", {
                                                class: item.omzet_right >= item.bv_required ? "text-green-600 font-semibold" : ""
                                              }, toDisplayString(formatNumber(item.omzet_right)), 3)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$j), null, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$k), {
                                                variant: getStatusBadge(item.status).variant
                                              }, {
                                                default: withCtx(() => [
                                                  (openBlock(), createBlock(resolveDynamicComponent(item.status === 1 ? unref(Clock) : unref(Target)), { class: "h-3 w-3 mr-1" })),
                                                  createTextVNode(" " + toDisplayString(getStatusBadge(item.status).text), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["variant"])
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
                        if (__props.progressData.total > 0) {
                          _push4(`<div class="flex items-center justify-between mt-4"${_scopeId3}><div class="text-sm text-muted-foreground"${_scopeId3}> Menampilkan ${ssrInterpolate((__props.progressData.current_page - 1) * __props.progressData.per_page + 1)} - ${ssrInterpolate(Math.min(__props.progressData.current_page * __props.progressData.per_page, __props.progressData.total))} dari ${ssrInterpolate(__props.progressData.total)} data </div><div class="flex items-center gap-2"${_scopeId3}>`);
                          _push4(ssrRenderComponent(unref(_sfc_main$2), {
                            variant: "outline",
                            size: "sm",
                            disabled: __props.progressData.current_page === 1,
                            onClick: ($event) => goToProgressPage(1)
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(ChevronsLeft), { class: "h-4 w-4" }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(ChevronsLeft), { class: "h-4 w-4" })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$2), {
                            variant: "outline",
                            size: "sm",
                            disabled: __props.progressData.current_page === 1,
                            onClick: ($event) => goToProgressPage(__props.progressData.current_page - 1)
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(ChevronLeft), { class: "h-4 w-4" }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(ChevronLeft), { class: "h-4 w-4" })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`<span class="text-sm"${_scopeId3}>${ssrInterpolate(__props.progressData.current_page)} / ${ssrInterpolate(__props.progressData.last_page)}</span>`);
                          _push4(ssrRenderComponent(unref(_sfc_main$2), {
                            variant: "outline",
                            size: "sm",
                            disabled: __props.progressData.current_page === __props.progressData.last_page,
                            onClick: ($event) => goToProgressPage(__props.progressData.current_page + 1)
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(ChevronRight), { class: "h-4 w-4" }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(ChevronRight), { class: "h-4 w-4" })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$2), {
                            variant: "outline",
                            size: "sm",
                            disabled: __props.progressData.current_page === __props.progressData.last_page,
                            onClick: ($event) => goToProgressPage(__props.progressData.last_page)
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(ChevronsRight), { class: "h-4 w-4" }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(ChevronsRight), { class: "h-4 w-4" })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`</div></div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode("div", { class: "flex flex-col gap-4 md:flex-row md:items-center mb-4" }, [
                            createVNode("div", { class: "relative flex-1 md:max-w-sm" }, [
                              createVNode(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
                              createVNode(unref(_sfc_main$8), {
                                modelValue: search.value,
                                "onUpdate:modelValue": ($event) => search.value = $event,
                                placeholder: "Cari member...",
                                class: "pl-9"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode(unref(_sfc_main$9), {
                              modelValue: selectedReward.value,
                              "onUpdate:modelValue": ($event) => selectedReward.value = $event
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$a), { class: "w-full md:w-48" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$b), { placeholder: "Filter Reward" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$d), { value: "all" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Semua Reward")
                                      ]),
                                      _: 1
                                    }),
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.activeRewards, (reward) => {
                                      return openBlock(), createBlock(unref(_sfc_main$d), {
                                        key: reward.id,
                                        value: reward.id.toString()
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(reward.name), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["value"]);
                                    }), 128))
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1032, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(unref(_sfc_main$9), {
                              modelValue: selectedStatus.value,
                              "onUpdate:modelValue": ($event) => selectedStatus.value = $event
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$a), { class: "w-full md:w-40" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$b), { placeholder: "Filter Status" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$d), { value: "all" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Semua Status")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$d), { value: "0" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Belum Tercapai")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$d), { value: "1" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Diproses")
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
                          createVNode("div", { class: "rounded-md border" }, [
                            createVNode(unref(_sfc_main$e), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$f), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$g), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$h), null, {
                                          default: withCtx(() => [
                                            createTextVNode("No")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$h), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Member")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$h), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Reward")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Syarat BV Kiri")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Syarat BV Kanan")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Omset Kiri")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Omset Kanan")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$h), null, {
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
                                createVNode(unref(_sfc_main$i), null, {
                                  default: withCtx(() => [
                                    __props.progressData.data.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$g), { key: 0 }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$j), {
                                          colspan: "8",
                                          class: "text-center py-8 text-muted-foreground"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" Tidak ada data progress ")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })) : createCommentVNode("", true),
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.progressData.data, (item, index) => {
                                      return openBlock(), createBlock(unref(_sfc_main$g), {
                                        key: item.id
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$j), null, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString((__props.progressData.current_page - 1) * __props.progressData.per_page + index + 1), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$j), null, {
                                            default: withCtx(() => [
                                              createVNode(unref(Link), {
                                                href: unref(show).url(item.member_id),
                                                class: "hover:underline"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode("div", { class: "font-medium" }, toDisplayString(item.member_name), 1),
                                                  createVNode("div", { class: "text-xs text-muted-foreground" }, toDisplayString(item.member_ewallet_id), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["href"])
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$j), null, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "font-medium" }, toDisplayString(item.reward_name), 1),
                                              createVNode("div", { class: "text-xs text-muted-foreground" }, toDisplayString(item.reward_prize), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(formatNumber(item.bv_required)), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(formatNumber(item.bv_required)), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createVNode("span", {
                                                class: item.omzet_left >= item.bv_required ? "text-green-600 font-semibold" : ""
                                              }, toDisplayString(formatNumber(item.omzet_left)), 3)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createVNode("span", {
                                                class: item.omzet_right >= item.bv_required ? "text-green-600 font-semibold" : ""
                                              }, toDisplayString(formatNumber(item.omzet_right)), 3)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$j), null, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$k), {
                                                variant: getStatusBadge(item.status).variant
                                              }, {
                                                default: withCtx(() => [
                                                  (openBlock(), createBlock(resolveDynamicComponent(item.status === 1 ? unref(Clock) : unref(Target)), { class: "h-3 w-3 mr-1" })),
                                                  createTextVNode(" " + toDisplayString(getStatusBadge(item.status).text), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["variant"])
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
                          __props.progressData.total > 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex items-center justify-between mt-4"
                          }, [
                            createVNode("div", { class: "text-sm text-muted-foreground" }, " Menampilkan " + toDisplayString((__props.progressData.current_page - 1) * __props.progressData.per_page + 1) + " - " + toDisplayString(Math.min(__props.progressData.current_page * __props.progressData.per_page, __props.progressData.total)) + " dari " + toDisplayString(__props.progressData.total) + " data ", 1),
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              createVNode(unref(_sfc_main$2), {
                                variant: "outline",
                                size: "sm",
                                disabled: __props.progressData.current_page === 1,
                                onClick: ($event) => goToProgressPage(1)
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(ChevronsLeft), { class: "h-4 w-4" })
                                ]),
                                _: 1
                              }, 8, ["disabled", "onClick"]),
                              createVNode(unref(_sfc_main$2), {
                                variant: "outline",
                                size: "sm",
                                disabled: __props.progressData.current_page === 1,
                                onClick: ($event) => goToProgressPage(__props.progressData.current_page - 1)
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(ChevronLeft), { class: "h-4 w-4" })
                                ]),
                                _: 1
                              }, 8, ["disabled", "onClick"]),
                              createVNode("span", { class: "text-sm" }, toDisplayString(__props.progressData.current_page) + " / " + toDisplayString(__props.progressData.last_page), 1),
                              createVNode(unref(_sfc_main$2), {
                                variant: "outline",
                                size: "sm",
                                disabled: __props.progressData.current_page === __props.progressData.last_page,
                                onClick: ($event) => goToProgressPage(__props.progressData.current_page + 1)
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(ChevronRight), { class: "h-4 w-4" })
                                ]),
                                _: 1
                              }, 8, ["disabled", "onClick"]),
                              createVNode(unref(_sfc_main$2), {
                                variant: "outline",
                                size: "sm",
                                disabled: __props.progressData.current_page === __props.progressData.last_page,
                                onClick: ($event) => goToProgressPage(__props.progressData.last_page)
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(ChevronsRight), { class: "h-4 w-4" })
                                ]),
                                _: 1
                              }, 8, ["disabled", "onClick"])
                            ])
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
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode(unref(Users), { class: "h-5 w-5 text-primary" }),
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Progress Reward Member")
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode(unref(_sfc_main$7), null, {
                          default: withCtx(() => [
                            createTextVNode(" Daftar member dengan progress pencapaian reward promosi aktif ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex flex-col gap-4 md:flex-row md:items-center mb-4" }, [
                          createVNode("div", { class: "relative flex-1 md:max-w-sm" }, [
                            createVNode(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
                            createVNode(unref(_sfc_main$8), {
                              modelValue: search.value,
                              "onUpdate:modelValue": ($event) => search.value = $event,
                              placeholder: "Cari member...",
                              class: "pl-9"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode(unref(_sfc_main$9), {
                            modelValue: selectedReward.value,
                            "onUpdate:modelValue": ($event) => selectedReward.value = $event
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$a), { class: "w-full md:w-48" }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$b), { placeholder: "Filter Reward" })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$d), { value: "all" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Semua Reward")
                                    ]),
                                    _: 1
                                  }),
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.activeRewards, (reward) => {
                                    return openBlock(), createBlock(unref(_sfc_main$d), {
                                      key: reward.id,
                                      value: reward.id.toString()
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(reward.name), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["value"]);
                                  }), 128))
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1032, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(unref(_sfc_main$9), {
                            modelValue: selectedStatus.value,
                            "onUpdate:modelValue": ($event) => selectedStatus.value = $event
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$a), { class: "w-full md:w-40" }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$b), { placeholder: "Filter Status" })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$d), { value: "all" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Semua Status")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$d), { value: "0" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Belum Tercapai")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$d), { value: "1" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Diproses")
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
                        createVNode("div", { class: "rounded-md border" }, [
                          createVNode(unref(_sfc_main$e), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$f), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$g), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$h), null, {
                                        default: withCtx(() => [
                                          createTextVNode("No")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$h), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Member")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$h), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Reward")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Syarat BV Kiri")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Syarat BV Kanan")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Omset Kiri")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Omset Kanan")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$h), null, {
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
                              createVNode(unref(_sfc_main$i), null, {
                                default: withCtx(() => [
                                  __props.progressData.data.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$g), { key: 0 }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$j), {
                                        colspan: "8",
                                        class: "text-center py-8 text-muted-foreground"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Tidak ada data progress ")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })) : createCommentVNode("", true),
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.progressData.data, (item, index) => {
                                    return openBlock(), createBlock(unref(_sfc_main$g), {
                                      key: item.id
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$j), null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString((__props.progressData.current_page - 1) * __props.progressData.per_page + index + 1), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$j), null, {
                                          default: withCtx(() => [
                                            createVNode(unref(Link), {
                                              href: unref(show).url(item.member_id),
                                              class: "hover:underline"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "font-medium" }, toDisplayString(item.member_name), 1),
                                                createVNode("div", { class: "text-xs text-muted-foreground" }, toDisplayString(item.member_ewallet_id), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["href"])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$j), null, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "font-medium" }, toDisplayString(item.reward_name), 1),
                                            createVNode("div", { class: "text-xs text-muted-foreground" }, toDisplayString(item.reward_prize), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(formatNumber(item.bv_required)), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(formatNumber(item.bv_required)), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createVNode("span", {
                                              class: item.omzet_left >= item.bv_required ? "text-green-600 font-semibold" : ""
                                            }, toDisplayString(formatNumber(item.omzet_left)), 3)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createVNode("span", {
                                              class: item.omzet_right >= item.bv_required ? "text-green-600 font-semibold" : ""
                                            }, toDisplayString(formatNumber(item.omzet_right)), 3)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$j), null, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$k), {
                                              variant: getStatusBadge(item.status).variant
                                            }, {
                                              default: withCtx(() => [
                                                (openBlock(), createBlock(resolveDynamicComponent(item.status === 1 ? unref(Clock) : unref(Target)), { class: "h-3 w-3 mr-1" })),
                                                createTextVNode(" " + toDisplayString(getStatusBadge(item.status).text), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["variant"])
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
                        __props.progressData.total > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex items-center justify-between mt-4"
                        }, [
                          createVNode("div", { class: "text-sm text-muted-foreground" }, " Menampilkan " + toDisplayString((__props.progressData.current_page - 1) * __props.progressData.per_page + 1) + " - " + toDisplayString(Math.min(__props.progressData.current_page * __props.progressData.per_page, __props.progressData.total)) + " dari " + toDisplayString(__props.progressData.total) + " data ", 1),
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode(unref(_sfc_main$2), {
                              variant: "outline",
                              size: "sm",
                              disabled: __props.progressData.current_page === 1,
                              onClick: ($event) => goToProgressPage(1)
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(ChevronsLeft), { class: "h-4 w-4" })
                              ]),
                              _: 1
                            }, 8, ["disabled", "onClick"]),
                            createVNode(unref(_sfc_main$2), {
                              variant: "outline",
                              size: "sm",
                              disabled: __props.progressData.current_page === 1,
                              onClick: ($event) => goToProgressPage(__props.progressData.current_page - 1)
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(ChevronLeft), { class: "h-4 w-4" })
                              ]),
                              _: 1
                            }, 8, ["disabled", "onClick"]),
                            createVNode("span", { class: "text-sm" }, toDisplayString(__props.progressData.current_page) + " / " + toDisplayString(__props.progressData.last_page), 1),
                            createVNode(unref(_sfc_main$2), {
                              variant: "outline",
                              size: "sm",
                              disabled: __props.progressData.current_page === __props.progressData.last_page,
                              onClick: ($event) => goToProgressPage(__props.progressData.current_page + 1)
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(ChevronRight), { class: "h-4 w-4" })
                              ]),
                              _: 1
                            }, 8, ["disabled", "onClick"]),
                            createVNode(unref(_sfc_main$2), {
                              variant: "outline",
                              size: "sm",
                              disabled: __props.progressData.current_page === __props.progressData.last_page,
                              onClick: ($event) => goToProgressPage(__props.progressData.last_page)
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(ChevronsRight), { class: "h-4 w-4" })
                              ]),
                              _: 1
                            }, 8, ["disabled", "onClick"])
                          ])
                        ])) : createCommentVNode("", true)
                      ]),
                      _: 2
                    }, 1024)
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
                        _push4(ssrRenderComponent(unref(_sfc_main$7), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Riwayat reward promosi yang telah berhasil diklaim oleh member `);
                            } else {
                              return [
                                createTextVNode(" Riwayat reward promosi yang telah berhasil diklaim oleh member ")
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
                          createVNode(unref(_sfc_main$7), null, {
                            default: withCtx(() => [
                              createTextVNode(" Riwayat reward promosi yang telah berhasil diklaim oleh member ")
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
                        _push4(`<div class="flex flex-col gap-4 md:flex-row md:items-center mb-4"${_scopeId3}><div class="relative flex-1 md:max-w-sm"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$8), {
                          modelValue: claimedSearch.value,
                          "onUpdate:modelValue": ($event) => claimedSearch.value = $event,
                          placeholder: "Cari member...",
                          class: "pl-9"
                        }, null, _parent4, _scopeId3));
                        _push4(`</div></div><div class="rounded-md border"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$e), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$f), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$g), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(unref(_sfc_main$h), null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`No`);
                                              } else {
                                                return [
                                                  createTextVNode("No")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(unref(_sfc_main$h), null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Member`);
                                              } else {
                                                return [
                                                  createTextVNode("Member")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(unref(_sfc_main$h), null, {
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
                                          _push7(ssrRenderComponent(unref(_sfc_main$h), { class: "text-right" }, {
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
                                          _push7(ssrRenderComponent(unref(_sfc_main$h), { class: "text-right" }, {
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
                                          _push7(ssrRenderComponent(unref(_sfc_main$h), null, {
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
                                          _push7(ssrRenderComponent(unref(_sfc_main$h), null, {
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
                                            createVNode(unref(_sfc_main$h), null, {
                                              default: withCtx(() => [
                                                createTextVNode("No")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$h), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Member")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$h), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Reward")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Syarat Omset Group (BV)")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Nilai")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$h), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Tanggal Klaim")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$h), null, {
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
                                      createVNode(unref(_sfc_main$g), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$h), null, {
                                            default: withCtx(() => [
                                              createTextVNode("No")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$h), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Member")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$h), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Reward")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Syarat Omset Group (BV)")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Nilai")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$h), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Tanggal Klaim")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$h), null, {
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
                              _push5(ssrRenderComponent(unref(_sfc_main$i), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    if (__props.claimedRewards.data.length === 0) {
                                      _push6(ssrRenderComponent(unref(_sfc_main$g), null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(unref(_sfc_main$j), {
                                              colspan: "7",
                                              class: "text-center py-8 text-muted-foreground"
                                            }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(` Belum ada reward yang diklaim `);
                                                } else {
                                                  return [
                                                    createTextVNode(" Belum ada reward yang diklaim ")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(unref(_sfc_main$j), {
                                                colspan: "7",
                                                class: "text-center py-8 text-muted-foreground"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" Belum ada reward yang diklaim ")
                                                ]),
                                                _: 1
                                              })
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      _push6(`<!---->`);
                                    }
                                    _push6(`<!--[-->`);
                                    ssrRenderList(__props.claimedRewards.data, (item, index) => {
                                      _push6(ssrRenderComponent(unref(_sfc_main$g), {
                                        key: item.id
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(unref(_sfc_main$j), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate((__props.claimedRewards.current_page - 1) * __props.claimedRewards.per_page + index + 1)}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString((__props.claimedRewards.current_page - 1) * __props.claimedRewards.per_page + index + 1), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$j), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(unref(Link), {
                                                    href: unref(show).url(item.member_id),
                                                    class: "hover:underline"
                                                  }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`<div class="font-medium"${_scopeId8}>${ssrInterpolate(item.member_name)}</div><div class="text-xs text-muted-foreground"${_scopeId8}>${ssrInterpolate(item.member_ewallet_id)}</div>`);
                                                      } else {
                                                        return [
                                                          createVNode("div", { class: "font-medium" }, toDisplayString(item.member_name), 1),
                                                          createVNode("div", { class: "text-xs text-muted-foreground" }, toDisplayString(item.member_ewallet_id), 1)
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                } else {
                                                  return [
                                                    createVNode(unref(Link), {
                                                      href: unref(show).url(item.member_id),
                                                      class: "hover:underline"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode("div", { class: "font-medium" }, toDisplayString(item.member_name), 1),
                                                        createVNode("div", { class: "text-xs text-muted-foreground" }, toDisplayString(item.member_ewallet_id), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["href"])
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$j), { class: "font-medium" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(item.reward)}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(item.reward), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$j), { class: "text-right" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(formatNumber(item.bv))}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(formatNumber(item.bv)), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$j), { class: "text-right" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(formatCurrency(item.amount))}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(formatCurrency(item.amount)), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$j), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(formatDateTime(item.claimed_at))}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(formatDateTime(item.claimed_at)), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$j), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(unref(_sfc_main$k), {
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
                                                    createVNode(unref(_sfc_main$k), {
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
                                              createVNode(unref(_sfc_main$j), null, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString((__props.claimedRewards.current_page - 1) * __props.claimedRewards.per_page + index + 1), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$j), null, {
                                                default: withCtx(() => [
                                                  createVNode(unref(Link), {
                                                    href: unref(show).url(item.member_id),
                                                    class: "hover:underline"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode("div", { class: "font-medium" }, toDisplayString(item.member_name), 1),
                                                      createVNode("div", { class: "text-xs text-muted-foreground" }, toDisplayString(item.member_ewallet_id), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["href"])
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$j), { class: "font-medium" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(item.reward), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(formatNumber(item.bv)), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(formatCurrency(item.amount)), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$j), null, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(formatDateTime(item.claimed_at)), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$j), null, {
                                                default: withCtx(() => [
                                                  createVNode(unref(_sfc_main$k), {
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
                                      __props.claimedRewards.data.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$g), { key: 0 }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$j), {
                                            colspan: "7",
                                            class: "text-center py-8 text-muted-foreground"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(" Belum ada reward yang diklaim ")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })) : createCommentVNode("", true),
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.claimedRewards.data, (item, index) => {
                                        return openBlock(), createBlock(unref(_sfc_main$g), {
                                          key: item.id
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$j), null, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString((__props.claimedRewards.current_page - 1) * __props.claimedRewards.per_page + index + 1), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$j), null, {
                                              default: withCtx(() => [
                                                createVNode(unref(Link), {
                                                  href: unref(show).url(item.member_id),
                                                  class: "hover:underline"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode("div", { class: "font-medium" }, toDisplayString(item.member_name), 1),
                                                    createVNode("div", { class: "text-xs text-muted-foreground" }, toDisplayString(item.member_ewallet_id), 1)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["href"])
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$j), { class: "font-medium" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(item.reward), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(formatNumber(item.bv)), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(formatCurrency(item.amount)), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$j), null, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(formatDateTime(item.claimed_at)), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$j), null, {
                                              default: withCtx(() => [
                                                createVNode(unref(_sfc_main$k), {
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
                                createVNode(unref(_sfc_main$f), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$g), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$h), null, {
                                          default: withCtx(() => [
                                            createTextVNode("No")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$h), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Member")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$h), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Reward")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Syarat Omset Group (BV)")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Nilai")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$h), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Tanggal Klaim")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$h), null, {
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
                                createVNode(unref(_sfc_main$i), null, {
                                  default: withCtx(() => [
                                    __props.claimedRewards.data.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$g), { key: 0 }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$j), {
                                          colspan: "7",
                                          class: "text-center py-8 text-muted-foreground"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" Belum ada reward yang diklaim ")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })) : createCommentVNode("", true),
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.claimedRewards.data, (item, index) => {
                                      return openBlock(), createBlock(unref(_sfc_main$g), {
                                        key: item.id
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$j), null, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString((__props.claimedRewards.current_page - 1) * __props.claimedRewards.per_page + index + 1), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$j), null, {
                                            default: withCtx(() => [
                                              createVNode(unref(Link), {
                                                href: unref(show).url(item.member_id),
                                                class: "hover:underline"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode("div", { class: "font-medium" }, toDisplayString(item.member_name), 1),
                                                  createVNode("div", { class: "text-xs text-muted-foreground" }, toDisplayString(item.member_ewallet_id), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["href"])
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$j), { class: "font-medium" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(item.reward), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(formatNumber(item.bv)), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(formatCurrency(item.amount)), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$j), null, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(formatDateTime(item.claimed_at)), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$j), null, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$k), {
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
                        _push4(`</div>`);
                        if (__props.claimedRewards.total > 0) {
                          _push4(`<div class="flex items-center justify-between mt-4"${_scopeId3}><div class="text-sm text-muted-foreground"${_scopeId3}> Menampilkan ${ssrInterpolate((__props.claimedRewards.current_page - 1) * __props.claimedRewards.per_page + 1)} - ${ssrInterpolate(Math.min(__props.claimedRewards.current_page * __props.claimedRewards.per_page, __props.claimedRewards.total))} dari ${ssrInterpolate(__props.claimedRewards.total)} data </div><div class="flex items-center gap-2"${_scopeId3}>`);
                          _push4(ssrRenderComponent(unref(_sfc_main$2), {
                            variant: "outline",
                            size: "sm",
                            disabled: __props.claimedRewards.current_page === 1,
                            onClick: ($event) => goToClaimedPage(1)
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(ChevronsLeft), { class: "h-4 w-4" }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(ChevronsLeft), { class: "h-4 w-4" })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$2), {
                            variant: "outline",
                            size: "sm",
                            disabled: __props.claimedRewards.current_page === 1,
                            onClick: ($event) => goToClaimedPage(__props.claimedRewards.current_page - 1)
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(ChevronLeft), { class: "h-4 w-4" }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(ChevronLeft), { class: "h-4 w-4" })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`<span class="text-sm"${_scopeId3}>${ssrInterpolate(__props.claimedRewards.current_page)} / ${ssrInterpolate(__props.claimedRewards.last_page)}</span>`);
                          _push4(ssrRenderComponent(unref(_sfc_main$2), {
                            variant: "outline",
                            size: "sm",
                            disabled: __props.claimedRewards.current_page === __props.claimedRewards.last_page,
                            onClick: ($event) => goToClaimedPage(__props.claimedRewards.current_page + 1)
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(ChevronRight), { class: "h-4 w-4" }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(ChevronRight), { class: "h-4 w-4" })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$2), {
                            variant: "outline",
                            size: "sm",
                            disabled: __props.claimedRewards.current_page === __props.claimedRewards.last_page,
                            onClick: ($event) => goToClaimedPage(__props.claimedRewards.last_page)
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(ChevronsRight), { class: "h-4 w-4" }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(ChevronsRight), { class: "h-4 w-4" })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`</div></div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode("div", { class: "flex flex-col gap-4 md:flex-row md:items-center mb-4" }, [
                            createVNode("div", { class: "relative flex-1 md:max-w-sm" }, [
                              createVNode(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
                              createVNode(unref(_sfc_main$8), {
                                modelValue: claimedSearch.value,
                                "onUpdate:modelValue": ($event) => claimedSearch.value = $event,
                                placeholder: "Cari member...",
                                class: "pl-9"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ])
                          ]),
                          createVNode("div", { class: "rounded-md border" }, [
                            createVNode(unref(_sfc_main$e), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$f), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$g), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$h), null, {
                                          default: withCtx(() => [
                                            createTextVNode("No")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$h), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Member")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$h), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Reward")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Syarat Omset Group (BV)")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Nilai")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$h), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Tanggal Klaim")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$h), null, {
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
                                createVNode(unref(_sfc_main$i), null, {
                                  default: withCtx(() => [
                                    __props.claimedRewards.data.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$g), { key: 0 }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$j), {
                                          colspan: "7",
                                          class: "text-center py-8 text-muted-foreground"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" Belum ada reward yang diklaim ")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })) : createCommentVNode("", true),
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.claimedRewards.data, (item, index) => {
                                      return openBlock(), createBlock(unref(_sfc_main$g), {
                                        key: item.id
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$j), null, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString((__props.claimedRewards.current_page - 1) * __props.claimedRewards.per_page + index + 1), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$j), null, {
                                            default: withCtx(() => [
                                              createVNode(unref(Link), {
                                                href: unref(show).url(item.member_id),
                                                class: "hover:underline"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode("div", { class: "font-medium" }, toDisplayString(item.member_name), 1),
                                                  createVNode("div", { class: "text-xs text-muted-foreground" }, toDisplayString(item.member_ewallet_id), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["href"])
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$j), { class: "font-medium" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(item.reward), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(formatNumber(item.bv)), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(formatCurrency(item.amount)), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$j), null, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(formatDateTime(item.claimed_at)), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$j), null, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$k), {
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
                            })
                          ]),
                          __props.claimedRewards.total > 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex items-center justify-between mt-4"
                          }, [
                            createVNode("div", { class: "text-sm text-muted-foreground" }, " Menampilkan " + toDisplayString((__props.claimedRewards.current_page - 1) * __props.claimedRewards.per_page + 1) + " - " + toDisplayString(Math.min(__props.claimedRewards.current_page * __props.claimedRewards.per_page, __props.claimedRewards.total)) + " dari " + toDisplayString(__props.claimedRewards.total) + " data ", 1),
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              createVNode(unref(_sfc_main$2), {
                                variant: "outline",
                                size: "sm",
                                disabled: __props.claimedRewards.current_page === 1,
                                onClick: ($event) => goToClaimedPage(1)
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(ChevronsLeft), { class: "h-4 w-4" })
                                ]),
                                _: 1
                              }, 8, ["disabled", "onClick"]),
                              createVNode(unref(_sfc_main$2), {
                                variant: "outline",
                                size: "sm",
                                disabled: __props.claimedRewards.current_page === 1,
                                onClick: ($event) => goToClaimedPage(__props.claimedRewards.current_page - 1)
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(ChevronLeft), { class: "h-4 w-4" })
                                ]),
                                _: 1
                              }, 8, ["disabled", "onClick"]),
                              createVNode("span", { class: "text-sm" }, toDisplayString(__props.claimedRewards.current_page) + " / " + toDisplayString(__props.claimedRewards.last_page), 1),
                              createVNode(unref(_sfc_main$2), {
                                variant: "outline",
                                size: "sm",
                                disabled: __props.claimedRewards.current_page === __props.claimedRewards.last_page,
                                onClick: ($event) => goToClaimedPage(__props.claimedRewards.current_page + 1)
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(ChevronRight), { class: "h-4 w-4" })
                                ]),
                                _: 1
                              }, 8, ["disabled", "onClick"]),
                              createVNode(unref(_sfc_main$2), {
                                variant: "outline",
                                size: "sm",
                                disabled: __props.claimedRewards.current_page === __props.claimedRewards.last_page,
                                onClick: ($event) => goToClaimedPage(__props.claimedRewards.last_page)
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(ChevronsRight), { class: "h-4 w-4" })
                                ]),
                                _: 1
                              }, 8, ["disabled", "onClick"])
                            ])
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
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode(unref(Trophy), { class: "h-5 w-5 text-yellow-500" }),
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Reward Yang Sudah Diklaim")
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode(unref(_sfc_main$7), null, {
                          default: withCtx(() => [
                            createTextVNode(" Riwayat reward promosi yang telah berhasil diklaim oleh member ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex flex-col gap-4 md:flex-row md:items-center mb-4" }, [
                          createVNode("div", { class: "relative flex-1 md:max-w-sm" }, [
                            createVNode(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
                            createVNode(unref(_sfc_main$8), {
                              modelValue: claimedSearch.value,
                              "onUpdate:modelValue": ($event) => claimedSearch.value = $event,
                              placeholder: "Cari member...",
                              class: "pl-9"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ])
                        ]),
                        createVNode("div", { class: "rounded-md border" }, [
                          createVNode(unref(_sfc_main$e), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$f), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$g), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$h), null, {
                                        default: withCtx(() => [
                                          createTextVNode("No")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$h), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Member")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$h), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Reward")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Syarat Omset Group (BV)")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Nilai")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$h), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Tanggal Klaim")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$h), null, {
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
                              createVNode(unref(_sfc_main$i), null, {
                                default: withCtx(() => [
                                  __props.claimedRewards.data.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$g), { key: 0 }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$j), {
                                        colspan: "7",
                                        class: "text-center py-8 text-muted-foreground"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Belum ada reward yang diklaim ")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })) : createCommentVNode("", true),
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.claimedRewards.data, (item, index) => {
                                    return openBlock(), createBlock(unref(_sfc_main$g), {
                                      key: item.id
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$j), null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString((__props.claimedRewards.current_page - 1) * __props.claimedRewards.per_page + index + 1), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$j), null, {
                                          default: withCtx(() => [
                                            createVNode(unref(Link), {
                                              href: unref(show).url(item.member_id),
                                              class: "hover:underline"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "font-medium" }, toDisplayString(item.member_name), 1),
                                                createVNode("div", { class: "text-xs text-muted-foreground" }, toDisplayString(item.member_ewallet_id), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["href"])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$j), { class: "font-medium" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(item.reward), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(formatNumber(item.bv)), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(formatCurrency(item.amount)), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$j), null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(formatDateTime(item.claimed_at)), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$j), null, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$k), {
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
                          })
                        ]),
                        __props.claimedRewards.total > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex items-center justify-between mt-4"
                        }, [
                          createVNode("div", { class: "text-sm text-muted-foreground" }, " Menampilkan " + toDisplayString((__props.claimedRewards.current_page - 1) * __props.claimedRewards.per_page + 1) + " - " + toDisplayString(Math.min(__props.claimedRewards.current_page * __props.claimedRewards.per_page, __props.claimedRewards.total)) + " dari " + toDisplayString(__props.claimedRewards.total) + " data ", 1),
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode(unref(_sfc_main$2), {
                              variant: "outline",
                              size: "sm",
                              disabled: __props.claimedRewards.current_page === 1,
                              onClick: ($event) => goToClaimedPage(1)
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(ChevronsLeft), { class: "h-4 w-4" })
                              ]),
                              _: 1
                            }, 8, ["disabled", "onClick"]),
                            createVNode(unref(_sfc_main$2), {
                              variant: "outline",
                              size: "sm",
                              disabled: __props.claimedRewards.current_page === 1,
                              onClick: ($event) => goToClaimedPage(__props.claimedRewards.current_page - 1)
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(ChevronLeft), { class: "h-4 w-4" })
                              ]),
                              _: 1
                            }, 8, ["disabled", "onClick"]),
                            createVNode("span", { class: "text-sm" }, toDisplayString(__props.claimedRewards.current_page) + " / " + toDisplayString(__props.claimedRewards.last_page), 1),
                            createVNode(unref(_sfc_main$2), {
                              variant: "outline",
                              size: "sm",
                              disabled: __props.claimedRewards.current_page === __props.claimedRewards.last_page,
                              onClick: ($event) => goToClaimedPage(__props.claimedRewards.current_page + 1)
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(ChevronRight), { class: "h-4 w-4" })
                              ]),
                              _: 1
                            }, 8, ["disabled", "onClick"]),
                            createVNode(unref(_sfc_main$2), {
                              variant: "outline",
                              size: "sm",
                              disabled: __props.claimedRewards.current_page === __props.claimedRewards.last_page,
                              onClick: ($event) => goToClaimedPage(__props.claimedRewards.last_page)
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(ChevronsRight), { class: "h-4 w-4" })
                              ]),
                              _: 1
                            }, 8, ["disabled", "onClick"])
                          ])
                        ])) : createCommentVNode("", true)
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
              createVNode("div", { class: "flex h-full flex-1 flex-col gap-6 rounded-xl p-4" }, [
                createVNode("div", { class: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between" }, [
                  createVNode("div", null, [
                    createVNode("h1", { class: "text-3xl font-bold tracking-tight flex items-center gap-2" }, [
                      createVNode(unref(Gift), { class: "h-8 w-8" }),
                      createTextVNode(" Promotions Rewards Progress ")
                    ]),
                    createVNode("p", { class: "text-muted-foreground mt-1" }, " Lihat progress dan riwayat klaim reward promosi semua member ")
                  ]),
                  createVNode(unref(Link), { href: "/admin/settings/promotions-rewards" }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$2), { variant: "outline" }, {
                        default: withCtx(() => [
                          createTextVNode(" Kelola Rewards ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "grid gap-4 md:grid-cols-2 lg:grid-cols-4" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.activeRewards, (reward) => {
                    return openBlock(), createBlock(unref(_sfc_main$3), {
                      key: reward.id
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$4), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(reward.name), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(unref(Target), { class: "h-4 w-4 text-muted-foreground" })
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createVNode("div", { class: "text-xs text-muted-foreground mb-1" }, toDisplayString(reward.reward), 1),
                            createVNode("div", { class: "text-sm" }, [
                              createVNode("span", { class: "font-semibold" }, toDisplayString(reward.progress_count), 1),
                              createTextVNode(" member dalam progress ")
                            ]),
                            createVNode("div", { class: "text-sm text-green-600" }, [
                              createVNode("span", { class: "font-semibold" }, toDisplayString(reward.achieved_count), 1),
                              createTextVNode(" tercapai/diproses ")
                            ]),
                            createVNode("div", { class: "text-xs text-muted-foreground mt-2" }, toDisplayString(formatDate(reward.start)) + " - " + toDisplayString(formatDate(reward.end)), 1),
                            createVNode("div", { class: "text-xs text-muted-foreground" }, " Syarat: " + toDisplayString(formatNumber(reward.bv_left)) + " BV Kiri & Kanan ", 1)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024);
                  }), 128)),
                  __props.activeRewards.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$3), {
                    key: 0,
                    class: "md:col-span-2 lg:col-span-4"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$6), { class: "flex items-center justify-center py-8" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-center text-muted-foreground" }, [
                            createVNode(unref(Gift), { class: "h-12 w-12 mx-auto mb-2 opacity-50" }),
                            createVNode("p", null, "Tidak ada reward promosi aktif saat ini")
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ]),
                createVNode(unref(_sfc_main$3), null, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode(unref(Users), { class: "h-5 w-5 text-primary" }),
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Progress Reward Member")
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode(unref(_sfc_main$7), null, {
                          default: withCtx(() => [
                            createTextVNode(" Daftar member dengan progress pencapaian reward promosi aktif ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex flex-col gap-4 md:flex-row md:items-center mb-4" }, [
                          createVNode("div", { class: "relative flex-1 md:max-w-sm" }, [
                            createVNode(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
                            createVNode(unref(_sfc_main$8), {
                              modelValue: search.value,
                              "onUpdate:modelValue": ($event) => search.value = $event,
                              placeholder: "Cari member...",
                              class: "pl-9"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode(unref(_sfc_main$9), {
                            modelValue: selectedReward.value,
                            "onUpdate:modelValue": ($event) => selectedReward.value = $event
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$a), { class: "w-full md:w-48" }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$b), { placeholder: "Filter Reward" })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$d), { value: "all" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Semua Reward")
                                    ]),
                                    _: 1
                                  }),
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.activeRewards, (reward) => {
                                    return openBlock(), createBlock(unref(_sfc_main$d), {
                                      key: reward.id,
                                      value: reward.id.toString()
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(reward.name), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["value"]);
                                  }), 128))
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1032, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(unref(_sfc_main$9), {
                            modelValue: selectedStatus.value,
                            "onUpdate:modelValue": ($event) => selectedStatus.value = $event
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$a), { class: "w-full md:w-40" }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$b), { placeholder: "Filter Status" })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$d), { value: "all" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Semua Status")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$d), { value: "0" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Belum Tercapai")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$d), { value: "1" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Diproses")
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
                        createVNode("div", { class: "rounded-md border" }, [
                          createVNode(unref(_sfc_main$e), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$f), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$g), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$h), null, {
                                        default: withCtx(() => [
                                          createTextVNode("No")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$h), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Member")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$h), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Reward")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Syarat BV Kiri")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Syarat BV Kanan")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Omset Kiri")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Omset Kanan")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$h), null, {
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
                              createVNode(unref(_sfc_main$i), null, {
                                default: withCtx(() => [
                                  __props.progressData.data.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$g), { key: 0 }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$j), {
                                        colspan: "8",
                                        class: "text-center py-8 text-muted-foreground"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Tidak ada data progress ")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })) : createCommentVNode("", true),
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.progressData.data, (item, index) => {
                                    return openBlock(), createBlock(unref(_sfc_main$g), {
                                      key: item.id
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$j), null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString((__props.progressData.current_page - 1) * __props.progressData.per_page + index + 1), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$j), null, {
                                          default: withCtx(() => [
                                            createVNode(unref(Link), {
                                              href: unref(show).url(item.member_id),
                                              class: "hover:underline"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "font-medium" }, toDisplayString(item.member_name), 1),
                                                createVNode("div", { class: "text-xs text-muted-foreground" }, toDisplayString(item.member_ewallet_id), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["href"])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$j), null, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "font-medium" }, toDisplayString(item.reward_name), 1),
                                            createVNode("div", { class: "text-xs text-muted-foreground" }, toDisplayString(item.reward_prize), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(formatNumber(item.bv_required)), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(formatNumber(item.bv_required)), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createVNode("span", {
                                              class: item.omzet_left >= item.bv_required ? "text-green-600 font-semibold" : ""
                                            }, toDisplayString(formatNumber(item.omzet_left)), 3)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createVNode("span", {
                                              class: item.omzet_right >= item.bv_required ? "text-green-600 font-semibold" : ""
                                            }, toDisplayString(formatNumber(item.omzet_right)), 3)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$j), null, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$k), {
                                              variant: getStatusBadge(item.status).variant
                                            }, {
                                              default: withCtx(() => [
                                                (openBlock(), createBlock(resolveDynamicComponent(item.status === 1 ? unref(Clock) : unref(Target)), { class: "h-3 w-3 mr-1" })),
                                                createTextVNode(" " + toDisplayString(getStatusBadge(item.status).text), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["variant"])
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
                        __props.progressData.total > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex items-center justify-between mt-4"
                        }, [
                          createVNode("div", { class: "text-sm text-muted-foreground" }, " Menampilkan " + toDisplayString((__props.progressData.current_page - 1) * __props.progressData.per_page + 1) + " - " + toDisplayString(Math.min(__props.progressData.current_page * __props.progressData.per_page, __props.progressData.total)) + " dari " + toDisplayString(__props.progressData.total) + " data ", 1),
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode(unref(_sfc_main$2), {
                              variant: "outline",
                              size: "sm",
                              disabled: __props.progressData.current_page === 1,
                              onClick: ($event) => goToProgressPage(1)
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(ChevronsLeft), { class: "h-4 w-4" })
                              ]),
                              _: 1
                            }, 8, ["disabled", "onClick"]),
                            createVNode(unref(_sfc_main$2), {
                              variant: "outline",
                              size: "sm",
                              disabled: __props.progressData.current_page === 1,
                              onClick: ($event) => goToProgressPage(__props.progressData.current_page - 1)
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(ChevronLeft), { class: "h-4 w-4" })
                              ]),
                              _: 1
                            }, 8, ["disabled", "onClick"]),
                            createVNode("span", { class: "text-sm" }, toDisplayString(__props.progressData.current_page) + " / " + toDisplayString(__props.progressData.last_page), 1),
                            createVNode(unref(_sfc_main$2), {
                              variant: "outline",
                              size: "sm",
                              disabled: __props.progressData.current_page === __props.progressData.last_page,
                              onClick: ($event) => goToProgressPage(__props.progressData.current_page + 1)
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(ChevronRight), { class: "h-4 w-4" })
                              ]),
                              _: 1
                            }, 8, ["disabled", "onClick"]),
                            createVNode(unref(_sfc_main$2), {
                              variant: "outline",
                              size: "sm",
                              disabled: __props.progressData.current_page === __props.progressData.last_page,
                              onClick: ($event) => goToProgressPage(__props.progressData.last_page)
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(ChevronsRight), { class: "h-4 w-4" })
                              ]),
                              _: 1
                            }, 8, ["disabled", "onClick"])
                          ])
                        ])) : createCommentVNode("", true)
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1024),
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
                        createVNode(unref(_sfc_main$7), null, {
                          default: withCtx(() => [
                            createTextVNode(" Riwayat reward promosi yang telah berhasil diklaim oleh member ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex flex-col gap-4 md:flex-row md:items-center mb-4" }, [
                          createVNode("div", { class: "relative flex-1 md:max-w-sm" }, [
                            createVNode(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
                            createVNode(unref(_sfc_main$8), {
                              modelValue: claimedSearch.value,
                              "onUpdate:modelValue": ($event) => claimedSearch.value = $event,
                              placeholder: "Cari member...",
                              class: "pl-9"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ])
                        ]),
                        createVNode("div", { class: "rounded-md border" }, [
                          createVNode(unref(_sfc_main$e), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$f), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$g), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$h), null, {
                                        default: withCtx(() => [
                                          createTextVNode("No")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$h), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Member")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$h), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Reward")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Syarat Omset Group (BV)")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Nilai")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$h), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Tanggal Klaim")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$h), null, {
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
                              createVNode(unref(_sfc_main$i), null, {
                                default: withCtx(() => [
                                  __props.claimedRewards.data.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$g), { key: 0 }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$j), {
                                        colspan: "7",
                                        class: "text-center py-8 text-muted-foreground"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Belum ada reward yang diklaim ")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })) : createCommentVNode("", true),
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.claimedRewards.data, (item, index) => {
                                    return openBlock(), createBlock(unref(_sfc_main$g), {
                                      key: item.id
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$j), null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString((__props.claimedRewards.current_page - 1) * __props.claimedRewards.per_page + index + 1), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$j), null, {
                                          default: withCtx(() => [
                                            createVNode(unref(Link), {
                                              href: unref(show).url(item.member_id),
                                              class: "hover:underline"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "font-medium" }, toDisplayString(item.member_name), 1),
                                                createVNode("div", { class: "text-xs text-muted-foreground" }, toDisplayString(item.member_ewallet_id), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["href"])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$j), { class: "font-medium" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(item.reward), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(formatNumber(item.bv)), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(formatCurrency(item.amount)), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$j), null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(formatDateTime(item.claimed_at)), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$j), null, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$k), {
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
                          })
                        ]),
                        __props.claimedRewards.total > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex items-center justify-between mt-4"
                        }, [
                          createVNode("div", { class: "text-sm text-muted-foreground" }, " Menampilkan " + toDisplayString((__props.claimedRewards.current_page - 1) * __props.claimedRewards.per_page + 1) + " - " + toDisplayString(Math.min(__props.claimedRewards.current_page * __props.claimedRewards.per_page, __props.claimedRewards.total)) + " dari " + toDisplayString(__props.claimedRewards.total) + " data ", 1),
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode(unref(_sfc_main$2), {
                              variant: "outline",
                              size: "sm",
                              disabled: __props.claimedRewards.current_page === 1,
                              onClick: ($event) => goToClaimedPage(1)
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(ChevronsLeft), { class: "h-4 w-4" })
                              ]),
                              _: 1
                            }, 8, ["disabled", "onClick"]),
                            createVNode(unref(_sfc_main$2), {
                              variant: "outline",
                              size: "sm",
                              disabled: __props.claimedRewards.current_page === 1,
                              onClick: ($event) => goToClaimedPage(__props.claimedRewards.current_page - 1)
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(ChevronLeft), { class: "h-4 w-4" })
                              ]),
                              _: 1
                            }, 8, ["disabled", "onClick"]),
                            createVNode("span", { class: "text-sm" }, toDisplayString(__props.claimedRewards.current_page) + " / " + toDisplayString(__props.claimedRewards.last_page), 1),
                            createVNode(unref(_sfc_main$2), {
                              variant: "outline",
                              size: "sm",
                              disabled: __props.claimedRewards.current_page === __props.claimedRewards.last_page,
                              onClick: ($event) => goToClaimedPage(__props.claimedRewards.current_page + 1)
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(ChevronRight), { class: "h-4 w-4" })
                              ]),
                              _: 1
                            }, 8, ["disabled", "onClick"]),
                            createVNode(unref(_sfc_main$2), {
                              variant: "outline",
                              size: "sm",
                              disabled: __props.claimedRewards.current_page === __props.claimedRewards.last_page,
                              onClick: ($event) => goToClaimedPage(__props.claimedRewards.last_page)
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(ChevronsRight), { class: "h-4 w-4" })
                              ]),
                              _: 1
                            }, 8, ["disabled", "onClick"])
                          ])
                        ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Rewards/PromotionsProgress/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
