import { defineComponent, computed, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AppLayout-hyZArMVS.js";
import { _ as _sfc_main$2 } from "./StatisticsCards-BSah0xWT.js";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5, c as _sfc_main$6 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$d } from "./index-BpQimeTM.js";
import { _ as _sfc_main$7, a as _sfc_main$8, b as _sfc_main$9, c as _sfc_main$a, d as _sfc_main$b, e as _sfc_main$c } from "./TableHeader-emcE6QAC.js";
import { Truck } from "lucide-vue-next";
import "class-variance-authority";
import "./index-SN_CnQ_F.js";
import "reka-ui";
import "clsx";
import "tailwind-merge";
import "./DropdownMenuTrigger-B1v6pHML.js";
import "@vueuse/core";
import "./Input-BGi8wCMh.js";
import "@inertiajs/vue3";
import "./index--D7ld9AJ.js";
import "./AvatarImage-DWFQMckn.js";
import "./index-B0NlPG4h.js";
import "vue-sonner";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    couriers: {},
    statistics: {}
  },
  setup(__props) {
    const props = __props;
    const statistics = computed(() => [
      { label: "Total Kurir", value: props.statistics.total_couriers },
      { label: "Aktif", value: props.statistics.total_active },
      { label: "Tidak Aktif", value: props.statistics.total_inactive }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ title: "Kurir Pengiriman" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-6"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              stats: statistics.value,
              columns: 3
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$3), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$5), { class: "flex items-center gap-2" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Truck), { class: "h-5 w-5" }, null, _parent5, _scopeId4));
                              _push5(` Kurir Pengiriman `);
                            } else {
                              return [
                                createVNode(unref(Truck), { class: "h-5 w-5" }),
                                createTextVNode(" Kurir Pengiriman ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), { class: "flex items-center gap-2" }, {
                            default: withCtx(() => [
                              createVNode(unref(Truck), { class: "h-5 w-5" }),
                              createTextVNode(" Kurir Pengiriman ")
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
                        _push4(`<div class="rounded-md border"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$7), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$8), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$9), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(unref(_sfc_main$a), { class: "w-12" }, {
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
                                          _push7(ssrRenderComponent(unref(_sfc_main$a), null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Kode`);
                                              } else {
                                                return [
                                                  createTextVNode("Kode")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(unref(_sfc_main$a), null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Nama Kurir`);
                                              } else {
                                                return [
                                                  createTextVNode("Nama Kurir")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(unref(_sfc_main$a), null, {
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
                                            createVNode(unref(_sfc_main$a), { class: "w-12" }, {
                                              default: withCtx(() => [
                                                createTextVNode("No")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$a), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Kode")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$a), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Nama Kurir")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$a), null, {
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
                                      createVNode(unref(_sfc_main$9), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$a), { class: "w-12" }, {
                                            default: withCtx(() => [
                                              createTextVNode("No")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$a), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Kode")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$a), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Nama Kurir")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$a), null, {
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
                              _push5(ssrRenderComponent(unref(_sfc_main$b), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<!--[-->`);
                                    ssrRenderList(__props.couriers, (courier, index) => {
                                      _push6(ssrRenderComponent(unref(_sfc_main$9), {
                                        key: courier.code
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(unref(_sfc_main$c), { class: "font-medium" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(index + 1)}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(index + 1), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$c), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`<code class="rounded bg-muted px-2 py-1 text-sm uppercase"${_scopeId7}>${ssrInterpolate(courier.code)}</code>`);
                                                } else {
                                                  return [
                                                    createVNode("code", { class: "rounded bg-muted px-2 py-1 text-sm uppercase" }, toDisplayString(courier.code), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$c), { class: "font-medium" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(courier.name)}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(courier.name), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$c), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(unref(_sfc_main$d), {
                                                    variant: courier.is_active ? "default" : "secondary"
                                                  }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`${ssrInterpolate(courier.is_active ? "Aktif" : "Tidak Aktif")}`);
                                                      } else {
                                                        return [
                                                          createTextVNode(toDisplayString(courier.is_active ? "Aktif" : "Tidak Aktif"), 1)
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                } else {
                                                  return [
                                                    createVNode(unref(_sfc_main$d), {
                                                      variant: courier.is_active ? "default" : "secondary"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(courier.is_active ? "Aktif" : "Tidak Aktif"), 1)
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
                                              createVNode(unref(_sfc_main$c), { class: "font-medium" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(index + 1), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$c), null, {
                                                default: withCtx(() => [
                                                  createVNode("code", { class: "rounded bg-muted px-2 py-1 text-sm uppercase" }, toDisplayString(courier.code), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$c), { class: "font-medium" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(courier.name), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$c), null, {
                                                default: withCtx(() => [
                                                  createVNode(unref(_sfc_main$d), {
                                                    variant: courier.is_active ? "default" : "secondary"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(courier.is_active ? "Aktif" : "Tidak Aktif"), 1)
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
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.couriers, (courier, index) => {
                                        return openBlock(), createBlock(unref(_sfc_main$9), {
                                          key: courier.code
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$c), { class: "font-medium" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(index + 1), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$c), null, {
                                              default: withCtx(() => [
                                                createVNode("code", { class: "rounded bg-muted px-2 py-1 text-sm uppercase" }, toDisplayString(courier.code), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$c), { class: "font-medium" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(courier.name), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$c), null, {
                                              default: withCtx(() => [
                                                createVNode(unref(_sfc_main$d), {
                                                  variant: courier.is_active ? "default" : "secondary"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(courier.is_active ? "Aktif" : "Tidak Aktif"), 1)
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
                                createVNode(unref(_sfc_main$8), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$9), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$a), { class: "w-12" }, {
                                          default: withCtx(() => [
                                            createTextVNode("No")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$a), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Kode")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$a), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Nama Kurir")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$a), null, {
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
                                createVNode(unref(_sfc_main$b), null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.couriers, (courier, index) => {
                                      return openBlock(), createBlock(unref(_sfc_main$9), {
                                        key: courier.code
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$c), { class: "font-medium" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(index + 1), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$c), null, {
                                            default: withCtx(() => [
                                              createVNode("code", { class: "rounded bg-muted px-2 py-1 text-sm uppercase" }, toDisplayString(courier.code), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$c), { class: "font-medium" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(courier.name), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$c), null, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$d), {
                                                variant: courier.is_active ? "default" : "secondary"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(courier.is_active ? "Aktif" : "Tidak Aktif"), 1)
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
                      } else {
                        return [
                          createVNode("div", { class: "rounded-md border" }, [
                            createVNode(unref(_sfc_main$7), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$8), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$9), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$a), { class: "w-12" }, {
                                          default: withCtx(() => [
                                            createTextVNode("No")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$a), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Kode")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$a), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Nama Kurir")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$a), null, {
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
                                createVNode(unref(_sfc_main$b), null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.couriers, (courier, index) => {
                                      return openBlock(), createBlock(unref(_sfc_main$9), {
                                        key: courier.code
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$c), { class: "font-medium" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(index + 1), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$c), null, {
                                            default: withCtx(() => [
                                              createVNode("code", { class: "rounded bg-muted px-2 py-1 text-sm uppercase" }, toDisplayString(courier.code), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$c), { class: "font-medium" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(courier.name), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$c), null, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$d), {
                                                variant: courier.is_active ? "default" : "secondary"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(courier.is_active ? "Aktif" : "Tidak Aktif"), 1)
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
                        createVNode(unref(_sfc_main$5), { class: "flex items-center gap-2" }, {
                          default: withCtx(() => [
                            createVNode(unref(Truck), { class: "h-5 w-5" }),
                            createTextVNode(" Kurir Pengiriman ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "rounded-md border" }, [
                          createVNode(unref(_sfc_main$7), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$8), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$9), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$a), { class: "w-12" }, {
                                        default: withCtx(() => [
                                          createTextVNode("No")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$a), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Kode")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$a), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Nama Kurir")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$a), null, {
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
                              createVNode(unref(_sfc_main$b), null, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.couriers, (courier, index) => {
                                    return openBlock(), createBlock(unref(_sfc_main$9), {
                                      key: courier.code
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$c), { class: "font-medium" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(index + 1), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$c), null, {
                                          default: withCtx(() => [
                                            createVNode("code", { class: "rounded bg-muted px-2 py-1 text-sm uppercase" }, toDisplayString(courier.code), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$c), { class: "font-medium" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(courier.name), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$c), null, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$d), {
                                              variant: courier.is_active ? "default" : "secondary"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(courier.is_active ? "Aktif" : "Tidak Aktif"), 1)
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
              createVNode("div", { class: "space-y-6" }, [
                createVNode(_sfc_main$2, {
                  stats: statistics.value,
                  columns: 3
                }, null, 8, ["stats"]),
                createVNode(unref(_sfc_main$3), null, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$5), { class: "flex items-center gap-2" }, {
                          default: withCtx(() => [
                            createVNode(unref(Truck), { class: "h-5 w-5" }),
                            createTextVNode(" Kurir Pengiriman ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "rounded-md border" }, [
                          createVNode(unref(_sfc_main$7), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$8), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$9), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$a), { class: "w-12" }, {
                                        default: withCtx(() => [
                                          createTextVNode("No")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$a), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Kode")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$a), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Nama Kurir")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$a), null, {
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
                              createVNode(unref(_sfc_main$b), null, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.couriers, (courier, index) => {
                                    return openBlock(), createBlock(unref(_sfc_main$9), {
                                      key: courier.code
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$c), { class: "font-medium" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(index + 1), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$c), null, {
                                          default: withCtx(() => [
                                            createVNode("code", { class: "rounded bg-muted px-2 py-1 text-sm uppercase" }, toDisplayString(courier.code), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$c), { class: "font-medium" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(courier.name), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$c), null, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$d), {
                                              variant: courier.is_active ? "default" : "secondary"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(courier.is_active ? "Aktif" : "Tidak Aktif"), 1)
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
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Couriers/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
