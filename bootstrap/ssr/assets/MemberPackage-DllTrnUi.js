import { defineComponent, mergeProps, withCtx, unref, createTextVNode, createVNode, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$3 } from "./HeadingSmall-B1yfmTIh.js";
import { _ as _sfc_main$4, a as _sfc_main$5, b as _sfc_main$6, c as _sfc_main$7, d as _sfc_main$8, e as _sfc_main$9 } from "./TableHeader-emcE6QAC.js";
import { _ as _sfc_main$1 } from "./AppLayout-Dj5p5Ehf.js";
import { i as index, _ as _sfc_main$2 } from "./Layout-CkewMZYd.js";
import { Head } from "@inertiajs/vue3";
import "./index-SN_CnQ_F.js";
import "class-variance-authority";
import "reka-ui";
import "clsx";
import "tailwind-merge";
import "@vueuse/core";
import "./DropdownMenuTrigger-B1v6pHML.js";
import "lucide-vue-next";
import "./Input-BGi8wCMh.js";
import "./index-Jhngbhhu.js";
import "./AvatarImage-DWFQMckn.js";
import "vue-sonner";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
import "./index-CgCk0bTK.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MemberPackage",
  __ssrInlineRender: true,
  props: {
    packages: {}
  },
  setup(__props) {
    const breadcrumbItems = [
      {
        title: "Paket Member",
        href: index().url
      }
    ];
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ breadcrumbs: breadcrumbItems }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Paket Member" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-6"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    title: "Paket Member",
                    description: "Daftar paket member yang tersedia dalam sistem"
                  }, null, _parent3, _scopeId2));
                  _push3(`<div class="rounded-md border"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$6), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$7), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Nama Paket`);
                                        } else {
                                          return [
                                            createTextVNode("Nama Paket")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$7), { class: "text-right" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Akumulasi Omset`);
                                        } else {
                                          return [
                                            createTextVNode("Akumulasi Omset")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$7), { class: "text-right" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Bonus Pairing`);
                                        } else {
                                          return [
                                            createTextVNode("Bonus Pairing")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$7), { class: "text-right" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Flush Out Pairing`);
                                        } else {
                                          return [
                                            createTextVNode("Flush Out Pairing")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$7), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Nama Paket")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$7), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Akumulasi Omset")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$7), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Bonus Pairing")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$7), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Flush Out Pairing")
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
                                createVNode(unref(_sfc_main$6), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$7), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Nama Paket")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$7), { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Akumulasi Omset")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$7), { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Bonus Pairing")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$7), { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Flush Out Pairing")
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
                        _push4(ssrRenderComponent(unref(_sfc_main$8), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(__props.packages, (pkg) => {
                                _push5(ssrRenderComponent(unref(_sfc_main$6), {
                                  key: pkg.id
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(_sfc_main$9), { class: "font-medium" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`${ssrInterpolate(pkg.name)}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString(pkg.name), 1)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(unref(_sfc_main$9), { class: "text-right" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`${ssrInterpolate(formatCurrency(pkg.price))}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString(formatCurrency(pkg.price)), 1)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(unref(_sfc_main$9), { class: "text-right" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`${ssrInterpolate(formatCurrency(pkg.pairing))}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString(formatCurrency(pkg.pairing)), 1)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(unref(_sfc_main$9), { class: "text-right" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`${ssrInterpolate(formatCurrency(pkg.flush_out))}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString(formatCurrency(pkg.flush_out)), 1)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(unref(_sfc_main$9), { class: "font-medium" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(pkg.name), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$9), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(formatCurrency(pkg.price)), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$9), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(formatCurrency(pkg.pairing)), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$9), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(formatCurrency(pkg.flush_out)), 1)
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
                              if (__props.packages.length === 0) {
                                _push5(ssrRenderComponent(unref(_sfc_main$6), null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(_sfc_main$9), {
                                        colspan: "4",
                                        class: "text-center text-muted-foreground"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(` Tidak ada data paket member `);
                                          } else {
                                            return [
                                              createTextVNode(" Tidak ada data paket member ")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(unref(_sfc_main$9), {
                                          colspan: "4",
                                          class: "text-center text-muted-foreground"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" Tidak ada data paket member ")
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                            } else {
                              return [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.packages, (pkg) => {
                                  return openBlock(), createBlock(unref(_sfc_main$6), {
                                    key: pkg.id
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$9), { class: "font-medium" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(pkg.name), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$9), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(formatCurrency(pkg.price)), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$9), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(formatCurrency(pkg.pairing)), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$9), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(formatCurrency(pkg.flush_out)), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 128)),
                                __props.packages.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$6), { key: 0 }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$9), {
                                      colspan: "4",
                                      class: "text-center text-muted-foreground"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Tidak ada data paket member ")
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
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$6), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$7), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Nama Paket")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$7), { class: "text-right" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Akumulasi Omset")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$7), { class: "text-right" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Bonus Pairing")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$7), { class: "text-right" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Flush Out Pairing")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.packages, (pkg) => {
                                return openBlock(), createBlock(unref(_sfc_main$6), {
                                  key: pkg.id
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$9), { class: "font-medium" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(pkg.name), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$9), { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(formatCurrency(pkg.price)), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$9), { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(formatCurrency(pkg.pairing)), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$9), { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(formatCurrency(pkg.flush_out)), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024);
                              }), 128)),
                              __props.packages.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$6), { key: 0 }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$9), {
                                    colspan: "4",
                                    class: "text-center text-muted-foreground"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Tidak ada data paket member ")
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
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "space-y-6" }, [
                      createVNode(_sfc_main$3, {
                        title: "Paket Member",
                        description: "Daftar paket member yang tersedia dalam sistem"
                      }),
                      createVNode("div", { class: "rounded-md border" }, [
                        createVNode(unref(_sfc_main$4), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$5), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$6), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$7), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Nama Paket")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$7), { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Akumulasi Omset")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$7), { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Bonus Pairing")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$7), { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Flush Out Pairing")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$8), null, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.packages, (pkg) => {
                                  return openBlock(), createBlock(unref(_sfc_main$6), {
                                    key: pkg.id
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$9), { class: "font-medium" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(pkg.name), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$9), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(formatCurrency(pkg.price)), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$9), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(formatCurrency(pkg.pairing)), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$9), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(formatCurrency(pkg.flush_out)), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 128)),
                                __props.packages.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$6), { key: 0 }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$9), {
                                      colspan: "4",
                                      class: "text-center text-muted-foreground"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Tidak ada data paket member ")
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
                        })
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Head), { title: "Paket Member" }),
              createVNode(_sfc_main$2, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "space-y-6" }, [
                    createVNode(_sfc_main$3, {
                      title: "Paket Member",
                      description: "Daftar paket member yang tersedia dalam sistem"
                    }),
                    createVNode("div", { class: "rounded-md border" }, [
                      createVNode(unref(_sfc_main$4), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$6), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$7), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Nama Paket")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$7), { class: "text-right" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Akumulasi Omset")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$7), { class: "text-right" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Bonus Pairing")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$7), { class: "text-right" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Flush Out Pairing")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.packages, (pkg) => {
                                return openBlock(), createBlock(unref(_sfc_main$6), {
                                  key: pkg.id
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$9), { class: "font-medium" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(pkg.name), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$9), { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(formatCurrency(pkg.price)), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$9), { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(formatCurrency(pkg.pairing)), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$9), { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(formatCurrency(pkg.flush_out)), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024);
                              }), 128)),
                              __props.packages.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$6), { key: 0 }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$9), {
                                    colspan: "4",
                                    class: "text-center text-muted-foreground"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Tidak ada data paket member ")
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
                      })
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/settings/MemberPackage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
