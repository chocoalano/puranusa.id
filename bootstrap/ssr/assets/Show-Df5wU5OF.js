import { defineComponent, withCtx, unref, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-B9pGpPI9.js";
import { _ as _sfc_main$3, a as _sfc_main$4, c as _sfc_main$6 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$2 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$5 } from "./index-BpQimeTM.js";
import { _ as _sfc_main$7, a as _sfc_main$8, b as _sfc_main$9, c as _sfc_main$a, d as _sfc_main$b, e as _sfc_main$c } from "./TableHeader-emcE6QAC.js";
import { ArrowLeft } from "lucide-vue-next";
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
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    item: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="container mx-auto py-6 space-y-6"${_scopeId}><div class="flex items-center gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              variant: "outline",
              size: "icon",
              "as-child": ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Link), { href: "/admin/zenner/leaderboard-configs" }, {
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
                    createVNode(unref(Link), { href: "/admin/zenner/leaderboard-configs" }, {
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
            _push2(`<div${_scopeId}><h1 class="text-3xl font-bold tracking-tight"${_scopeId}>${ssrInterpolate(__props.item.title)}</h1><p class="text-muted-foreground"${_scopeId}>Detail leaderboard &amp; entries</p></div></div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$3), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex items-center gap-4"${_scopeId3}>`);
                        if (__props.item.is_active) {
                          _push4(ssrRenderComponent(unref(_sfc_main$5), { variant: "default" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Aktif`);
                              } else {
                                return [
                                  createTextVNode("Aktif")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(ssrRenderComponent(unref(_sfc_main$5), { variant: "secondary" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Nonaktif`);
                              } else {
                                return [
                                  createTextVNode("Nonaktif")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        }
                        _push4(ssrRenderComponent(unref(_sfc_main$5), { variant: "outline" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(__props.item.type)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(__props.item.type), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<span class="text-sm text-muted-foreground"${_scopeId3}>Periode: ${ssrInterpolate(__props.item.period)}</span><span class="text-sm text-muted-foreground"${_scopeId3}>Field: ${ssrInterpolate(__props.item.calculation_field)}</span></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center gap-4" }, [
                            __props.item.is_active ? (openBlock(), createBlock(unref(_sfc_main$5), {
                              key: 0,
                              variant: "default"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Aktif")
                              ]),
                              _: 1
                            })) : (openBlock(), createBlock(unref(_sfc_main$5), {
                              key: 1,
                              variant: "secondary"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Nonaktif")
                              ]),
                              _: 1
                            })),
                            createVNode(unref(_sfc_main$5), { variant: "outline" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(__props.item.type), 1)
                              ]),
                              _: 1
                            }),
                            createVNode("span", { class: "text-sm text-muted-foreground" }, "Periode: " + toDisplayString(__props.item.period), 1),
                            createVNode("span", { class: "text-sm text-muted-foreground" }, "Field: " + toDisplayString(__props.item.calculation_field), 1)
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
                        createVNode("div", { class: "flex items-center gap-4" }, [
                          __props.item.is_active ? (openBlock(), createBlock(unref(_sfc_main$5), {
                            key: 0,
                            variant: "default"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Aktif")
                            ]),
                            _: 1
                          })) : (openBlock(), createBlock(unref(_sfc_main$5), {
                            key: 1,
                            variant: "secondary"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Nonaktif")
                            ]),
                            _: 1
                          })),
                          createVNode(unref(_sfc_main$5), { variant: "outline" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(__props.item.type), 1)
                            ]),
                            _: 1
                          }),
                          createVNode("span", { class: "text-sm text-muted-foreground" }, "Periode: " + toDisplayString(__props.item.period), 1),
                          createVNode("span", { class: "text-sm text-muted-foreground" }, "Field: " + toDisplayString(__props.item.calculation_field), 1)
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
                        _push4(`<h2 class="text-xl font-semibold"${_scopeId3}>Entries (${ssrInterpolate(__props.item.entries?.length || 0)})</h2>`);
                      } else {
                        return [
                          createVNode("h2", { class: "text-xl font-semibold" }, "Entries (" + toDisplayString(__props.item.entries?.length || 0) + ")", 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (__props.item.entries && __props.item.entries.length > 0) {
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
                                                  _push8(`Customer`);
                                                } else {
                                                  return [
                                                    createTextVNode("Customer")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$a), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`Score`);
                                                } else {
                                                  return [
                                                    createTextVNode("Score")
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
                                                  createTextVNode("Customer")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(unref(_sfc_main$a), null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Score")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(unref(_sfc_main$a), null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Periode")
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
                                                createTextVNode("Customer")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$a), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Score")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$a), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Periode")
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
                                      ssrRenderList(__props.item.entries, (entry) => {
                                        _push6(ssrRenderComponent(unref(_sfc_main$9), {
                                          key: entry.id
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(unref(_sfc_main$c), null, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(unref(_sfc_main$5), { variant: "outline" }, {
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
                                                      createVNode(unref(_sfc_main$5), { variant: "outline" }, {
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
                                                    _push8(`${ssrInterpolate(entry.score.toLocaleString("id-ID"))}`);
                                                  } else {
                                                    return [
                                                      createTextVNode(toDisplayString(entry.score.toLocaleString("id-ID")), 1)
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
                                            } else {
                                              return [
                                                createVNode(unref(_sfc_main$c), null, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(_sfc_main$5), { variant: "outline" }, {
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
                                                    createTextVNode(toDisplayString(entry.score.toLocaleString("id-ID")), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(unref(_sfc_main$c), null, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(entry.period_label || "-"), 1)
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
                                        (openBlock(true), createBlock(Fragment, null, renderList(__props.item.entries, (entry) => {
                                          return openBlock(), createBlock(unref(_sfc_main$9), {
                                            key: entry.id
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$c), null, {
                                                default: withCtx(() => [
                                                  createVNode(unref(_sfc_main$5), { variant: "outline" }, {
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
                                                  createTextVNode(toDisplayString(entry.score.toLocaleString("id-ID")), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$c), null, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(entry.period_label || "-"), 1)
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
                                              createTextVNode("Customer")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$a), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Score")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$a), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Periode")
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
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.item.entries, (entry) => {
                                        return openBlock(), createBlock(unref(_sfc_main$9), {
                                          key: entry.id
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$c), null, {
                                              default: withCtx(() => [
                                                createVNode(unref(_sfc_main$5), { variant: "outline" }, {
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
                                                createTextVNode(toDisplayString(entry.score.toLocaleString("id-ID")), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$c), null, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(entry.period_label || "-"), 1)
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 2
                                        }, 1024);
                                      }), 128))
                                    ]),
                                    _: 2
                                  }, 1024)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<div class="py-8 text-center"${_scopeId3}><p class="text-muted-foreground"${_scopeId3}>Belum ada entries</p></div>`);
                        }
                      } else {
                        return [
                          __props.item.entries && __props.item.entries.length > 0 ? (openBlock(), createBlock(unref(_sfc_main$7), { key: 0 }, {
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
                                          createTextVNode("Customer")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$a), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Score")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$a), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Periode")
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
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.item.entries, (entry) => {
                                    return openBlock(), createBlock(unref(_sfc_main$9), {
                                      key: entry.id
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$c), null, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$5), { variant: "outline" }, {
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
                                            createTextVNode(toDisplayString(entry.score.toLocaleString("id-ID")), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$c), null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(entry.period_label || "-"), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1024);
                                  }), 128))
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024)) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "py-8 text-center"
                          }, [
                            createVNode("p", { class: "text-muted-foreground" }, "Belum ada entries")
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
                        createVNode("h2", { class: "text-xl font-semibold" }, "Entries (" + toDisplayString(__props.item.entries?.length || 0) + ")", 1)
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), null, {
                      default: withCtx(() => [
                        __props.item.entries && __props.item.entries.length > 0 ? (openBlock(), createBlock(unref(_sfc_main$7), { key: 0 }, {
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
                                        createTextVNode("Customer")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$a), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Score")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$a), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Periode")
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
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.item.entries, (entry) => {
                                  return openBlock(), createBlock(unref(_sfc_main$9), {
                                    key: entry.id
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$c), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$5), { variant: "outline" }, {
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
                                          createTextVNode(toDisplayString(entry.score.toLocaleString("id-ID")), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$c), null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(entry.period_label || "-"), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 128))
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024)) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "py-8 text-center"
                        }, [
                          createVNode("p", { class: "text-muted-foreground" }, "Belum ada entries")
                        ]))
                      ]),
                      _: 2
                    }, 1024)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "container mx-auto py-6 space-y-6" }, [
                createVNode("div", { class: "flex items-center gap-4" }, [
                  createVNode(unref(_sfc_main$2), {
                    variant: "outline",
                    size: "icon",
                    "as-child": ""
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Link), { href: "/admin/zenner/leaderboard-configs" }, {
                        default: withCtx(() => [
                          createVNode(unref(ArrowLeft), { class: "h-4 w-4" })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("div", null, [
                    createVNode("h1", { class: "text-3xl font-bold tracking-tight" }, toDisplayString(__props.item.title), 1),
                    createVNode("p", { class: "text-muted-foreground" }, "Detail leaderboard & entries")
                  ])
                ]),
                createVNode(unref(_sfc_main$3), null, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex items-center gap-4" }, [
                          __props.item.is_active ? (openBlock(), createBlock(unref(_sfc_main$5), {
                            key: 0,
                            variant: "default"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Aktif")
                            ]),
                            _: 1
                          })) : (openBlock(), createBlock(unref(_sfc_main$5), {
                            key: 1,
                            variant: "secondary"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Nonaktif")
                            ]),
                            _: 1
                          })),
                          createVNode(unref(_sfc_main$5), { variant: "outline" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(__props.item.type), 1)
                            ]),
                            _: 1
                          }),
                          createVNode("span", { class: "text-sm text-muted-foreground" }, "Periode: " + toDisplayString(__props.item.period), 1),
                          createVNode("span", { class: "text-sm text-muted-foreground" }, "Field: " + toDisplayString(__props.item.calculation_field), 1)
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
                        createVNode("h2", { class: "text-xl font-semibold" }, "Entries (" + toDisplayString(__props.item.entries?.length || 0) + ")", 1)
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), null, {
                      default: withCtx(() => [
                        __props.item.entries && __props.item.entries.length > 0 ? (openBlock(), createBlock(unref(_sfc_main$7), { key: 0 }, {
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
                                        createTextVNode("Customer")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$a), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Score")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$a), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Periode")
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
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.item.entries, (entry) => {
                                  return openBlock(), createBlock(unref(_sfc_main$9), {
                                    key: entry.id
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$c), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$5), { variant: "outline" }, {
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
                                          createTextVNode(toDisplayString(entry.score.toLocaleString("id-ID")), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$c), null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(entry.period_label || "-"), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 128))
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024)) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "py-8 text-center"
                        }, [
                          createVNode("p", { class: "text-muted-foreground" }, "Belum ada entries")
                        ]))
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1024)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Zenner/LeaderboardConfig/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
