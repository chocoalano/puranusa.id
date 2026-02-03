import { defineComponent, ref, unref, withCtx, createVNode, createTextVNode, withKeys, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { Head, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-B9pGpPI9.js";
import { _ as _sfc_main$2, a as _sfc_main$3, c as _sfc_main$6 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$5 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$4 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$d } from "./index-BpQimeTM.js";
import { _ as _sfc_main$7, a as _sfc_main$8, b as _sfc_main$9, c as _sfc_main$a, d as _sfc_main$b, e as _sfc_main$c } from "./TableHeader-emcE6QAC.js";
import { Search } from "lucide-vue-next";
import { _ as _sfc_main$e } from "./Pagination-DAUeA01Y.js";
import "class-variance-authority";
import "./DropdownMenuTrigger-B1v6pHML.js";
import "reka-ui";
import "@vueuse/core";
import "./index--D7ld9AJ.js";
import "./AvatarImage-DWFQMckn.js";
import "./index-BsP5JKUP.js";
import "vue-sonner";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
import "clsx";
import "tailwind-merge";
import "./SelectValue-BUnv4mQg.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    entries: {},
    filters: {}
  },
  setup(__props) {
    const props = __props;
    const searchQuery = ref(props.filters.search || "");
    const configIdFilter = ref(props.filters.config_id || "");
    const formatDate = (date) => {
      if (!date) return "-";
      return new Date(date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
    };
    const handleSearch = () => {
      router.get("/admin/zenner/leaderboard-entries", {
        search: searchQuery.value,
        config_id: configIdFilter.value
      }, {
        preserveState: true,
        preserveScroll: true
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Leaderboard Entries" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="rounded-xl p-4 space-y-6 py-6"${_scopeId}><div${_scopeId}><h1 class="text-3xl font-bold"${_scopeId}>Leaderboard Entries</h1><p class="text-muted-foreground"${_scopeId}>Daftar entri leaderboard Zenner Club</p></div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex flex-col sm:flex-row gap-4"${_scopeId3}><div class="relative flex-1"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Search), { class: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$4), {
                          modelValue: searchQuery.value,
                          "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                          placeholder: "Cari nama customer...",
                          class: "pl-9",
                          onKeyup: handleSearch
                        }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$4), {
                          modelValue: configIdFilter.value,
                          "onUpdate:modelValue": ($event) => configIdFilter.value = $event,
                          placeholder: "Config ID",
                          class: "w-40",
                          onKeyup: handleSearch
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$5), { onClick: handleSearch }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Search), { class: "h-4 w-4 mr-2" }, null, _parent5, _scopeId4));
                              _push5(` Cari `);
                            } else {
                              return [
                                createVNode(unref(Search), { class: "h-4 w-4 mr-2" }),
                                createTextVNode(" Cari ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex flex-col sm:flex-row gap-4" }, [
                            createVNode("div", { class: "relative flex-1" }, [
                              createVNode(unref(Search), { class: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
                              createVNode(unref(_sfc_main$4), {
                                modelValue: searchQuery.value,
                                "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                                placeholder: "Cari nama customer...",
                                class: "pl-9",
                                onKeyup: withKeys(handleSearch, ["enter"])
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode(unref(_sfc_main$4), {
                              modelValue: configIdFilter.value,
                              "onUpdate:modelValue": ($event) => configIdFilter.value = $event,
                              placeholder: "Config ID",
                              class: "w-40",
                              onKeyup: withKeys(handleSearch, ["enter"])
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(unref(_sfc_main$5), { onClick: handleSearch }, {
                              default: withCtx(() => [
                                createVNode(unref(Search), { class: "h-4 w-4 mr-2" }),
                                createTextVNode(" Cari ")
                              ]),
                              _: 1
                            })
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$7), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$8), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$9), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(unref(_sfc_main$a), null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Rank`);
                                              } else {
                                                return [
                                                  createTextVNode("Rank")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(unref(_sfc_main$a), null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Nama Customer`);
                                              } else {
                                                return [
                                                  createTextVNode("Nama Customer")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(unref(_sfc_main$a), null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Skor`);
                                              } else {
                                                return [
                                                  createTextVNode("Skor")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(unref(_sfc_main$a), null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Periode`);
                                              } else {
                                                return [
                                                  createTextVNode("Periode")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(unref(_sfc_main$a), null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Config`);
                                              } else {
                                                return [
                                                  createTextVNode("Config")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(unref(_sfc_main$a), null, {
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
                                            createVNode(unref(_sfc_main$a), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Rank")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$a), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Nama Customer")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$a), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Skor")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$a), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Periode")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$a), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Config")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$a), null, {
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
                                      createVNode(unref(_sfc_main$9), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$a), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Rank")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$a), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Nama Customer")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$a), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Skor")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$a), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Periode")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$a), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Config")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$a), null, {
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
                              _push5(ssrRenderComponent(unref(_sfc_main$b), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<!--[-->`);
                                    ssrRenderList(__props.entries.data, (entry) => {
                                      _push6(ssrRenderComponent(unref(_sfc_main$9), {
                                        key: entry.id
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(unref(_sfc_main$c), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(unref(_sfc_main$d), { variant: "outline" }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`#${ssrInterpolate(entry.rank)}`);
                                                      } else {
                                                        return [
                                                          createTextVNode("#" + toDisplayString(entry.rank), 1)
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                } else {
                                                  return [
                                                    createVNode(unref(_sfc_main$d), { variant: "outline" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("#" + toDisplayString(entry.rank), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$c), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(entry.customer_name)}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(entry.customer_name), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$c), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(entry.score)}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(entry.score), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$c), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(entry.period_label || "-")}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(entry.period_label || "-"), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$c), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(entry.config?.title || entry.config_id)}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(entry.config?.title || entry.config_id), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$c), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(formatDate(entry.created_at))}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(formatDate(entry.created_at)), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(unref(_sfc_main$c), null, {
                                                default: withCtx(() => [
                                                  createVNode(unref(_sfc_main$d), { variant: "outline" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("#" + toDisplayString(entry.rank), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$c), null, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(entry.customer_name), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$c), null, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(entry.score), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$c), null, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(entry.period_label || "-"), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$c), null, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(entry.config?.title || entry.config_id), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$c), null, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(formatDate(entry.created_at)), 1)
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
                                    if (__props.entries.data.length === 0) {
                                      _push6(ssrRenderComponent(unref(_sfc_main$9), null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(unref(_sfc_main$c), {
                                              colspan: "6",
                                              class: "text-center text-muted-foreground py-8"
                                            }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(` Tidak ada data ditemukan `);
                                                } else {
                                                  return [
                                                    createTextVNode(" Tidak ada data ditemukan ")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(unref(_sfc_main$c), {
                                                colspan: "6",
                                                class: "text-center text-muted-foreground py-8"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" Tidak ada data ditemukan ")
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
                                  } else {
                                    return [
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.entries.data, (entry) => {
                                        return openBlock(), createBlock(unref(_sfc_main$9), {
                                          key: entry.id
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$c), null, {
                                              default: withCtx(() => [
                                                createVNode(unref(_sfc_main$d), { variant: "outline" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("#" + toDisplayString(entry.rank), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$c), null, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(entry.customer_name), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$c), null, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(entry.score), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$c), null, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(entry.period_label || "-"), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$c), null, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(entry.config?.title || entry.config_id), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$c), null, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(formatDate(entry.created_at)), 1)
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 2
                                        }, 1024);
                                      }), 128)),
                                      __props.entries.data.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$9), { key: 0 }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$c), {
                                            colspan: "6",
                                            class: "text-center text-muted-foreground py-8"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(" Tidak ada data ditemukan ")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })) : createCommentVNode("", true)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$8), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$9), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$a), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Rank")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$a), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Nama Customer")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$a), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Skor")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$a), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Periode")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$a), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Config")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$a), null, {
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
                                createVNode(unref(_sfc_main$b), null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.entries.data, (entry) => {
                                      return openBlock(), createBlock(unref(_sfc_main$9), {
                                        key: entry.id
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$c), null, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$d), { variant: "outline" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("#" + toDisplayString(entry.rank), 1)
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$c), null, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(entry.customer_name), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$c), null, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(entry.score), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$c), null, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(entry.period_label || "-"), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$c), null, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(entry.config?.title || entry.config_id), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$c), null, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(formatDate(entry.created_at)), 1)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1024);
                                    }), 128)),
                                    __props.entries.data.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$9), { key: 0 }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$c), {
                                          colspan: "6",
                                          class: "text-center text-muted-foreground py-8"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" Tidak ada data ditemukan ")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })) : createCommentVNode("", true)
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<div class="mt-4"${_scopeId3}>`);
                        if (__props.entries.last_page > 1) {
                          _push4(ssrRenderComponent(_sfc_main$e, {
                            data: __props.entries,
                            url: "/admin/zenner/leaderboard-entries",
                            filters: __props.filters
                          }, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode(unref(_sfc_main$7), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$8), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$9), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$a), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Rank")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$a), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Nama Customer")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$a), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Skor")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$a), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Periode")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$a), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Config")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$a), null, {
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
                              createVNode(unref(_sfc_main$b), null, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.entries.data, (entry) => {
                                    return openBlock(), createBlock(unref(_sfc_main$9), {
                                      key: entry.id
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$c), null, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$d), { variant: "outline" }, {
                                              default: withCtx(() => [
                                                createTextVNode("#" + toDisplayString(entry.rank), 1)
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$c), null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(entry.customer_name), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$c), null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(entry.score), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$c), null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(entry.period_label || "-"), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$c), null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(entry.config?.title || entry.config_id), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$c), null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(formatDate(entry.created_at)), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1024);
                                  }), 128)),
                                  __props.entries.data.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$9), { key: 0 }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$c), {
                                        colspan: "6",
                                        class: "text-center text-muted-foreground py-8"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Tidak ada data ditemukan ")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })) : createCommentVNode("", true)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode("div", { class: "mt-4" }, [
                            __props.entries.last_page > 1 ? (openBlock(), createBlock(_sfc_main$e, {
                              key: 0,
                              data: __props.entries,
                              url: "/admin/zenner/leaderboard-entries",
                              filters: __props.filters
                            }, null, 8, ["data", "filters"])) : createCommentVNode("", true)
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex flex-col sm:flex-row gap-4" }, [
                          createVNode("div", { class: "relative flex-1" }, [
                            createVNode(unref(Search), { class: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
                            createVNode(unref(_sfc_main$4), {
                              modelValue: searchQuery.value,
                              "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                              placeholder: "Cari nama customer...",
                              class: "pl-9",
                              onKeyup: withKeys(handleSearch, ["enter"])
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode(unref(_sfc_main$4), {
                            modelValue: configIdFilter.value,
                            "onUpdate:modelValue": ($event) => configIdFilter.value = $event,
                            placeholder: "Config ID",
                            class: "w-40",
                            onKeyup: withKeys(handleSearch, ["enter"])
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(unref(_sfc_main$5), { onClick: handleSearch }, {
                            default: withCtx(() => [
                              createVNode(unref(Search), { class: "h-4 w-4 mr-2" }),
                              createTextVNode(" Cari ")
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$7), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$8), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$9), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$a), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Rank")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$a), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Nama Customer")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$a), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Skor")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$a), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Periode")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$a), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Config")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$a), null, {
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
                            createVNode(unref(_sfc_main$b), null, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.entries.data, (entry) => {
                                  return openBlock(), createBlock(unref(_sfc_main$9), {
                                    key: entry.id
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$c), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$d), { variant: "outline" }, {
                                            default: withCtx(() => [
                                              createTextVNode("#" + toDisplayString(entry.rank), 1)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$c), null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(entry.customer_name), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$c), null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(entry.score), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$c), null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(entry.period_label || "-"), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$c), null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(entry.config?.title || entry.config_id), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$c), null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(formatDate(entry.created_at)), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 128)),
                                __props.entries.data.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$9), { key: 0 }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$c), {
                                      colspan: "6",
                                      class: "text-center text-muted-foreground py-8"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Tidak ada data ditemukan ")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "mt-4" }, [
                          __props.entries.last_page > 1 ? (openBlock(), createBlock(_sfc_main$e, {
                            key: 0,
                            data: __props.entries,
                            url: "/admin/zenner/leaderboard-entries",
                            filters: __props.filters
                          }, null, 8, ["data", "filters"])) : createCommentVNode("", true)
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
          } else {
            return [
              createVNode("div", { class: "rounded-xl p-4 space-y-6 py-6" }, [
                createVNode("div", null, [
                  createVNode("h1", { class: "text-3xl font-bold" }, "Leaderboard Entries"),
                  createVNode("p", { class: "text-muted-foreground" }, "Daftar entri leaderboard Zenner Club")
                ]),
                createVNode(unref(_sfc_main$2), null, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex flex-col sm:flex-row gap-4" }, [
                          createVNode("div", { class: "relative flex-1" }, [
                            createVNode(unref(Search), { class: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
                            createVNode(unref(_sfc_main$4), {
                              modelValue: searchQuery.value,
                              "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                              placeholder: "Cari nama customer...",
                              class: "pl-9",
                              onKeyup: withKeys(handleSearch, ["enter"])
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode(unref(_sfc_main$4), {
                            modelValue: configIdFilter.value,
                            "onUpdate:modelValue": ($event) => configIdFilter.value = $event,
                            placeholder: "Config ID",
                            class: "w-40",
                            onKeyup: withKeys(handleSearch, ["enter"])
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(unref(_sfc_main$5), { onClick: handleSearch }, {
                            default: withCtx(() => [
                              createVNode(unref(Search), { class: "h-4 w-4 mr-2" }),
                              createTextVNode(" Cari ")
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$7), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$8), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$9), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$a), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Rank")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$a), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Nama Customer")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$a), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Skor")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$a), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Periode")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$a), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Config")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$a), null, {
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
                            createVNode(unref(_sfc_main$b), null, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.entries.data, (entry) => {
                                  return openBlock(), createBlock(unref(_sfc_main$9), {
                                    key: entry.id
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$c), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$d), { variant: "outline" }, {
                                            default: withCtx(() => [
                                              createTextVNode("#" + toDisplayString(entry.rank), 1)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$c), null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(entry.customer_name), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$c), null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(entry.score), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$c), null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(entry.period_label || "-"), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$c), null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(entry.config?.title || entry.config_id), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$c), null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(formatDate(entry.created_at)), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 128)),
                                __props.entries.data.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$9), { key: 0 }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$c), {
                                      colspan: "6",
                                      class: "text-center text-muted-foreground py-8"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Tidak ada data ditemukan ")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "mt-4" }, [
                          __props.entries.last_page > 1 ? (openBlock(), createBlock(_sfc_main$e, {
                            key: 0,
                            data: __props.entries,
                            url: "/admin/zenner/leaderboard-entries",
                            filters: __props.filters
                          }, null, 8, ["data", "filters"])) : createCommentVNode("", true)
                        ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Zenner/LeaderboardEntry/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
