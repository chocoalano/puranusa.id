import { defineComponent, withCtx, unref, createVNode, createTextVNode, createBlock, openBlock, toDisplayString, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
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
    const formatDate = (date) => {
      if (!date) return "-";
      return new Date(date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
    };
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
                  _push3(ssrRenderComponent(unref(Link), { href: "/admin/zenner/courses" }, {
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
                    createVNode(unref(Link), { href: "/admin/zenner/courses" }, {
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
            _push2(`<div${_scopeId}><h1 class="text-3xl font-bold tracking-tight"${_scopeId}>${ssrInterpolate(__props.item.title)}</h1><p class="text-muted-foreground"${_scopeId}>Detail Course &amp; Lessons</p></div></div>`);
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
                        _push4(`<span class="text-sm text-muted-foreground"${_scopeId3}>Level: ${ssrInterpolate(__props.item.level)}</span></div>`);
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
                            createVNode("span", { class: "text-sm text-muted-foreground" }, "Level: " + toDisplayString(__props.item.level), 1)
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (__props.item.description) {
                          _push4(`<p class="mb-4"${_scopeId3}>${ssrInterpolate(__props.item.description)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`<p class="text-sm text-muted-foreground"${_scopeId3}>Dibuat: ${ssrInterpolate(formatDate(__props.item.created_at))}</p>`);
                      } else {
                        return [
                          __props.item.description ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "mb-4"
                          }, toDisplayString(__props.item.description), 1)) : createCommentVNode("", true),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, "Dibuat: " + toDisplayString(formatDate(__props.item.created_at)), 1)
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
                          createVNode("span", { class: "text-sm text-muted-foreground" }, "Level: " + toDisplayString(__props.item.level), 1)
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), null, {
                      default: withCtx(() => [
                        __props.item.description ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mb-4"
                        }, toDisplayString(__props.item.description), 1)) : createCommentVNode("", true),
                        createVNode("p", { class: "text-sm text-muted-foreground" }, "Dibuat: " + toDisplayString(formatDate(__props.item.created_at)), 1)
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
                        _push4(`<h2 class="text-xl font-semibold"${_scopeId3}>Lessons (${ssrInterpolate(__props.item.lessons?.length || 0)})</h2>`);
                      } else {
                        return [
                          createVNode("h2", { class: "text-xl font-semibold" }, "Lessons (" + toDisplayString(__props.item.lessons?.length || 0) + ")", 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (__props.item.lessons && __props.item.lessons.length > 0) {
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
                                                  _push8(`#`);
                                                } else {
                                                  return [
                                                    createTextVNode("#")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$a), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`Judul`);
                                                } else {
                                                  return [
                                                    createTextVNode("Judul")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$a), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`Durasi (menit)`);
                                                } else {
                                                  return [
                                                    createTextVNode("Durasi (menit)")
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
                                              createVNode(unref(_sfc_main$a), null, {
                                                default: withCtx(() => [
                                                  createTextVNode("#")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(unref(_sfc_main$a), null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Judul")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(unref(_sfc_main$a), null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Durasi (menit)")
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
                                            createVNode(unref(_sfc_main$a), null, {
                                              default: withCtx(() => [
                                                createTextVNode("#")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$a), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Judul")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$a), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Durasi (menit)")
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
                                      ssrRenderList(__props.item.lessons, (lesson) => {
                                        _push6(ssrRenderComponent(unref(_sfc_main$9), {
                                          key: lesson.id
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(unref(_sfc_main$c), null, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`${ssrInterpolate(lesson.sort_order)}`);
                                                  } else {
                                                    return [
                                                      createTextVNode(toDisplayString(lesson.sort_order), 1)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                              _push7(ssrRenderComponent(unref(_sfc_main$c), null, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`${ssrInterpolate(lesson.title)}`);
                                                  } else {
                                                    return [
                                                      createTextVNode(toDisplayString(lesson.title), 1)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                              _push7(ssrRenderComponent(unref(_sfc_main$c), null, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`${ssrInterpolate(lesson.duration_minutes)}`);
                                                  } else {
                                                    return [
                                                      createTextVNode(toDisplayString(lesson.duration_minutes), 1)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                              _push7(ssrRenderComponent(unref(_sfc_main$c), null, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    if (lesson.is_active) {
                                                      _push8(ssrRenderComponent(unref(_sfc_main$5), { variant: "default" }, {
                                                        default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                          if (_push9) {
                                                            _push9(`Aktif`);
                                                          } else {
                                                            return [
                                                              createTextVNode("Aktif")
                                                            ];
                                                          }
                                                        }),
                                                        _: 2
                                                      }, _parent8, _scopeId7));
                                                    } else {
                                                      _push8(ssrRenderComponent(unref(_sfc_main$5), { variant: "secondary" }, {
                                                        default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                          if (_push9) {
                                                            _push9(`Nonaktif`);
                                                          } else {
                                                            return [
                                                              createTextVNode("Nonaktif")
                                                            ];
                                                          }
                                                        }),
                                                        _: 2
                                                      }, _parent8, _scopeId7));
                                                    }
                                                  } else {
                                                    return [
                                                      lesson.is_active ? (openBlock(), createBlock(unref(_sfc_main$5), {
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
                                                      }))
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(unref(_sfc_main$c), null, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(lesson.sort_order), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(unref(_sfc_main$c), null, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(lesson.title), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(unref(_sfc_main$c), null, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(lesson.duration_minutes), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(unref(_sfc_main$c), null, {
                                                  default: withCtx(() => [
                                                    lesson.is_active ? (openBlock(), createBlock(unref(_sfc_main$5), {
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
                                                    }))
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
                                        (openBlock(true), createBlock(Fragment, null, renderList(__props.item.lessons, (lesson) => {
                                          return openBlock(), createBlock(unref(_sfc_main$9), {
                                            key: lesson.id
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$c), null, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(lesson.sort_order), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$c), null, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(lesson.title), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$c), null, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(lesson.duration_minutes), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$c), null, {
                                                default: withCtx(() => [
                                                  lesson.is_active ? (openBlock(), createBlock(unref(_sfc_main$5), {
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
                                                  }))
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
                                              createTextVNode("#")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$a), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Judul")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$a), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Durasi (menit)")
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
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.item.lessons, (lesson) => {
                                        return openBlock(), createBlock(unref(_sfc_main$9), {
                                          key: lesson.id
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$c), null, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(lesson.sort_order), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$c), null, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(lesson.title), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$c), null, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(lesson.duration_minutes), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$c), null, {
                                              default: withCtx(() => [
                                                lesson.is_active ? (openBlock(), createBlock(unref(_sfc_main$5), {
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
                                                }))
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
                        } else {
                          _push4(`<div class="py-8 text-center"${_scopeId3}><p class="text-muted-foreground"${_scopeId3}>Belum ada lesson</p></div>`);
                        }
                      } else {
                        return [
                          __props.item.lessons && __props.item.lessons.length > 0 ? (openBlock(), createBlock(unref(_sfc_main$7), { key: 0 }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$8), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$9), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$a), null, {
                                        default: withCtx(() => [
                                          createTextVNode("#")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$a), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Judul")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$a), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Durasi (menit)")
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
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.item.lessons, (lesson) => {
                                    return openBlock(), createBlock(unref(_sfc_main$9), {
                                      key: lesson.id
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$c), null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(lesson.sort_order), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$c), null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(lesson.title), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$c), null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(lesson.duration_minutes), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$c), null, {
                                          default: withCtx(() => [
                                            lesson.is_active ? (openBlock(), createBlock(unref(_sfc_main$5), {
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
                                            }))
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
                          })) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "py-8 text-center"
                          }, [
                            createVNode("p", { class: "text-muted-foreground" }, "Belum ada lesson")
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
                        createVNode("h2", { class: "text-xl font-semibold" }, "Lessons (" + toDisplayString(__props.item.lessons?.length || 0) + ")", 1)
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), null, {
                      default: withCtx(() => [
                        __props.item.lessons && __props.item.lessons.length > 0 ? (openBlock(), createBlock(unref(_sfc_main$7), { key: 0 }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$8), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$9), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$a), null, {
                                      default: withCtx(() => [
                                        createTextVNode("#")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$a), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Judul")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$a), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Durasi (menit)")
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
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.item.lessons, (lesson) => {
                                  return openBlock(), createBlock(unref(_sfc_main$9), {
                                    key: lesson.id
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$c), null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(lesson.sort_order), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$c), null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(lesson.title), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$c), null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(lesson.duration_minutes), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$c), null, {
                                        default: withCtx(() => [
                                          lesson.is_active ? (openBlock(), createBlock(unref(_sfc_main$5), {
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
                                          }))
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
                        })) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "py-8 text-center"
                        }, [
                          createVNode("p", { class: "text-muted-foreground" }, "Belum ada lesson")
                        ]))
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
              createVNode("div", { class: "container mx-auto py-6 space-y-6" }, [
                createVNode("div", { class: "flex items-center gap-4" }, [
                  createVNode(unref(_sfc_main$2), {
                    variant: "outline",
                    size: "icon",
                    "as-child": ""
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Link), { href: "/admin/zenner/courses" }, {
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
                    createVNode("p", { class: "text-muted-foreground" }, "Detail Course & Lessons")
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
                          createVNode("span", { class: "text-sm text-muted-foreground" }, "Level: " + toDisplayString(__props.item.level), 1)
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), null, {
                      default: withCtx(() => [
                        __props.item.description ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mb-4"
                        }, toDisplayString(__props.item.description), 1)) : createCommentVNode("", true),
                        createVNode("p", { class: "text-sm text-muted-foreground" }, "Dibuat: " + toDisplayString(formatDate(__props.item.created_at)), 1)
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
                        createVNode("h2", { class: "text-xl font-semibold" }, "Lessons (" + toDisplayString(__props.item.lessons?.length || 0) + ")", 1)
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), null, {
                      default: withCtx(() => [
                        __props.item.lessons && __props.item.lessons.length > 0 ? (openBlock(), createBlock(unref(_sfc_main$7), { key: 0 }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$8), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$9), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$a), null, {
                                      default: withCtx(() => [
                                        createTextVNode("#")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$a), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Judul")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$a), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Durasi (menit)")
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
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.item.lessons, (lesson) => {
                                  return openBlock(), createBlock(unref(_sfc_main$9), {
                                    key: lesson.id
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$c), null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(lesson.sort_order), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$c), null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(lesson.title), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$c), null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(lesson.duration_minutes), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$c), null, {
                                        default: withCtx(() => [
                                          lesson.is_active ? (openBlock(), createBlock(unref(_sfc_main$5), {
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
                                          }))
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
                        })) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "py-8 text-center"
                        }, [
                          createVNode("p", { class: "text-muted-foreground" }, "Belum ada lesson")
                        ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Zenner/Course/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
