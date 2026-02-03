import { defineComponent, ref, mergeProps, withCtx, unref, createVNode, createTextVNode, withKeys, toDisplayString, createBlock, openBlock, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { router, useForm } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-BHxY2bcF.js";
import { _ as _sfc_main$2, a as _sfc_main$3, c as _sfc_main$b } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$4 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$5 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$i } from "./index-BpQimeTM.js";
import { _ as _sfc_main$c, a as _sfc_main$d, b as _sfc_main$e, c as _sfc_main$f, d as _sfc_main$g, e as _sfc_main$h } from "./TableHeader-emcE6QAC.js";
import { _ as _sfc_main$6, a as _sfc_main$7, b as _sfc_main$8, c as _sfc_main$9, d as _sfc_main$a } from "./SelectValue-BUnv4mQg.js";
import { _ as _sfc_main$j, b as _sfc_main$k, c as _sfc_main$l, d as _sfc_main$m, e as _sfc_main$n, f as _sfc_main$o, g as _sfc_main$p, h as _sfc_main$q } from "./AlertDialogTrigger-DIWb7xue.js";
import { Plus, Search, Eye, Pencil, Trash2 } from "lucide-vue-next";
import { toast } from "vue-sonner";
import "class-variance-authority";
import "./DropdownMenuTrigger-B1v6pHML.js";
import "reka-ui";
import "@vueuse/core";
import "./index-3UqiGNe9.js";
import "./AvatarImage-DWFQMckn.js";
import "./index-Bfu0FVt6.js";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
import "clsx";
import "tailwind-merge";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    items: {},
    filters: {}
  },
  setup(__props) {
    const props = __props;
    const search = ref(props.filters.search || "");
    const status = ref(props.filters.status || "");
    const deleteDialogOpen = ref(false);
    const deleteTarget = ref(null);
    const formatDate = (date) => {
      if (!date) return "-";
      return new Date(date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
    };
    const applyFilters = () => {
      router.get("/admin/zenner/courses", {
        search: search.value || void 0,
        status: status.value || void 0
      }, { preserveState: true, replace: true });
    };
    const confirmDelete = (item) => {
      deleteTarget.value = item;
      deleteDialogOpen.value = true;
    };
    const handleDelete = () => {
      if (!deleteTarget.value) return;
      useForm({}).delete(`/admin/zenner/courses/${deleteTarget.value.id}`, {
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Course berhasil dihapus");
          deleteDialogOpen.value = false;
          deleteTarget.value = null;
        },
        onError: () => toast.error("Gagal menghapus course")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ title: "Courses" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex items-center justify-between"${_scopeId3}><h2 class="text-xl font-semibold"${_scopeId3}>Courses</h2>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$4), {
                          onClick: ($event) => unref(router).get("/admin/zenner/courses/create")
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Plus), { class: "mr-2 h-4 w-4" }, null, _parent5, _scopeId4));
                              _push5(` Tambah `);
                            } else {
                              return [
                                createVNode(unref(Plus), { class: "mr-2 h-4 w-4" }),
                                createTextVNode(" Tambah ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div><div class="mt-4 flex items-center gap-4"${_scopeId3}><div class="relative flex-1"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$5), {
                          modelValue: search.value,
                          "onUpdate:modelValue": ($event) => search.value = $event,
                          placeholder: "Cari...",
                          class: "pl-10",
                          onKeyup: applyFilters
                        }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$6), {
                          modelValue: status.value,
                          "onUpdate:modelValue": [($event) => status.value = $event, applyFilters]
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$7), { class: "w-[180px]" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$8), { placeholder: "Semua Status" }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$8), { placeholder: "Semua Status" })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$9), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$a), { value: "" }, {
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
                                    _push6(ssrRenderComponent(unref(_sfc_main$a), { value: "active" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Aktif`);
                                        } else {
                                          return [
                                            createTextVNode("Aktif")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$a), { value: "inactive" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Nonaktif`);
                                        } else {
                                          return [
                                            createTextVNode("Nonaktif")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$a), { value: "" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Semua Status")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$a), { value: "active" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Aktif")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$a), { value: "inactive" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Nonaktif")
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
                                createVNode(unref(_sfc_main$7), { class: "w-[180px]" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$8), { placeholder: "Semua Status" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$9), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$a), { value: "" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Semua Status")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$a), { value: "active" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Aktif")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$a), { value: "inactive" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Nonaktif")
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
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center justify-between" }, [
                            createVNode("h2", { class: "text-xl font-semibold" }, "Courses"),
                            createVNode(unref(_sfc_main$4), {
                              onClick: ($event) => unref(router).get("/admin/zenner/courses/create")
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Plus), { class: "mr-2 h-4 w-4" }),
                                createTextVNode(" Tambah ")
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ]),
                          createVNode("div", { class: "mt-4 flex items-center gap-4" }, [
                            createVNode("div", { class: "relative flex-1" }, [
                              createVNode(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
                              createVNode(unref(_sfc_main$5), {
                                modelValue: search.value,
                                "onUpdate:modelValue": ($event) => search.value = $event,
                                placeholder: "Cari...",
                                class: "pl-10",
                                onKeyup: withKeys(applyFilters, ["enter"])
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode(unref(_sfc_main$6), {
                              modelValue: status.value,
                              "onUpdate:modelValue": [($event) => status.value = $event, applyFilters]
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$7), { class: "w-[180px]" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$8), { placeholder: "Semua Status" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$9), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$a), { value: "" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Semua Status")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$a), { value: "active" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Aktif")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$a), { value: "inactive" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Nonaktif")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$b), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$c), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$d), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$e), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(unref(_sfc_main$f), null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Title`);
                                              } else {
                                                return [
                                                  createTextVNode("Title")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(unref(_sfc_main$f), null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Level`);
                                              } else {
                                                return [
                                                  createTextVNode("Level")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(unref(_sfc_main$f), null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Jumlah Lesson`);
                                              } else {
                                                return [
                                                  createTextVNode("Jumlah Lesson")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(unref(_sfc_main$f), null, {
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
                                          _push7(ssrRenderComponent(unref(_sfc_main$f), null, {
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
                                          _push7(ssrRenderComponent(unref(_sfc_main$f), { class: "text-right" }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Aksi`);
                                              } else {
                                                return [
                                                  createTextVNode("Aksi")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(unref(_sfc_main$f), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Title")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$f), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Level")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$f), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Jumlah Lesson")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$f), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Status")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$f), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Dibuat")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$f), { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Aksi")
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
                                      createVNode(unref(_sfc_main$e), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$f), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Title")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$f), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Level")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$f), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Jumlah Lesson")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$f), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Status")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$f), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Dibuat")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$f), { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Aksi")
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
                              _push5(ssrRenderComponent(unref(_sfc_main$g), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<!--[-->`);
                                    ssrRenderList(__props.items.data, (item) => {
                                      _push6(ssrRenderComponent(unref(_sfc_main$e), {
                                        key: item.id
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(unref(_sfc_main$h), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(item.title)}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(item.title), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$h), { class: "capitalize" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(item.level)}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(item.level), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$h), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(item.lessons_count)}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(item.lessons_count), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$h), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  if (item.is_active) {
                                                    _push8(ssrRenderComponent(unref(_sfc_main$i), { variant: "default" }, {
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
                                                    _push8(ssrRenderComponent(unref(_sfc_main$i), { variant: "secondary" }, {
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
                                                    item.is_active ? (openBlock(), createBlock(unref(_sfc_main$i), {
                                                      key: 0,
                                                      variant: "default"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Aktif")
                                                      ]),
                                                      _: 1
                                                    })) : (openBlock(), createBlock(unref(_sfc_main$i), {
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
                                            _push7(ssrRenderComponent(unref(_sfc_main$h), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(formatDate(item.created_at))}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(formatDate(item.created_at)), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$h), { class: "text-right" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`<div class="flex justify-end gap-2"${_scopeId7}>`);
                                                  _push8(ssrRenderComponent(unref(_sfc_main$4), {
                                                    size: "sm",
                                                    variant: "outline",
                                                    onClick: ($event) => unref(router).get(`/admin/zenner/courses/${item.id}`)
                                                  }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(ssrRenderComponent(unref(Eye), { class: "h-4 w-4" }, null, _parent9, _scopeId8));
                                                      } else {
                                                        return [
                                                          createVNode(unref(Eye), { class: "h-4 w-4" })
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(unref(_sfc_main$4), {
                                                    size: "sm",
                                                    variant: "outline",
                                                    onClick: ($event) => unref(router).get(`/admin/zenner/courses/${item.id}/edit`)
                                                  }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(ssrRenderComponent(unref(Pencil), { class: "h-4 w-4" }, null, _parent9, _scopeId8));
                                                      } else {
                                                        return [
                                                          createVNode(unref(Pencil), { class: "h-4 w-4" })
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(unref(_sfc_main$4), {
                                                    size: "sm",
                                                    variant: "destructive",
                                                    onClick: ($event) => confirmDelete(item)
                                                  }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(ssrRenderComponent(unref(Trash2), { class: "h-4 w-4" }, null, _parent9, _scopeId8));
                                                      } else {
                                                        return [
                                                          createVNode(unref(Trash2), { class: "h-4 w-4" })
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                  _push8(`</div>`);
                                                } else {
                                                  return [
                                                    createVNode("div", { class: "flex justify-end gap-2" }, [
                                                      createVNode(unref(_sfc_main$4), {
                                                        size: "sm",
                                                        variant: "outline",
                                                        onClick: ($event) => unref(router).get(`/admin/zenner/courses/${item.id}`)
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode(unref(Eye), { class: "h-4 w-4" })
                                                        ]),
                                                        _: 1
                                                      }, 8, ["onClick"]),
                                                      createVNode(unref(_sfc_main$4), {
                                                        size: "sm",
                                                        variant: "outline",
                                                        onClick: ($event) => unref(router).get(`/admin/zenner/courses/${item.id}/edit`)
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode(unref(Pencil), { class: "h-4 w-4" })
                                                        ]),
                                                        _: 1
                                                      }, 8, ["onClick"]),
                                                      createVNode(unref(_sfc_main$4), {
                                                        size: "sm",
                                                        variant: "destructive",
                                                        onClick: ($event) => confirmDelete(item)
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode(unref(Trash2), { class: "h-4 w-4" })
                                                        ]),
                                                        _: 1
                                                      }, 8, ["onClick"])
                                                    ])
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(unref(_sfc_main$h), null, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(item.title), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$h), { class: "capitalize" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(item.level), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$h), null, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(item.lessons_count), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$h), null, {
                                                default: withCtx(() => [
                                                  item.is_active ? (openBlock(), createBlock(unref(_sfc_main$i), {
                                                    key: 0,
                                                    variant: "default"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Aktif")
                                                    ]),
                                                    _: 1
                                                  })) : (openBlock(), createBlock(unref(_sfc_main$i), {
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
                                              }, 1024),
                                              createVNode(unref(_sfc_main$h), null, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(formatDate(item.created_at)), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                                default: withCtx(() => [
                                                  createVNode("div", { class: "flex justify-end gap-2" }, [
                                                    createVNode(unref(_sfc_main$4), {
                                                      size: "sm",
                                                      variant: "outline",
                                                      onClick: ($event) => unref(router).get(`/admin/zenner/courses/${item.id}`)
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(unref(Eye), { class: "h-4 w-4" })
                                                      ]),
                                                      _: 1
                                                    }, 8, ["onClick"]),
                                                    createVNode(unref(_sfc_main$4), {
                                                      size: "sm",
                                                      variant: "outline",
                                                      onClick: ($event) => unref(router).get(`/admin/zenner/courses/${item.id}/edit`)
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(unref(Pencil), { class: "h-4 w-4" })
                                                      ]),
                                                      _: 1
                                                    }, 8, ["onClick"]),
                                                    createVNode(unref(_sfc_main$4), {
                                                      size: "sm",
                                                      variant: "destructive",
                                                      onClick: ($event) => confirmDelete(item)
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(unref(Trash2), { class: "h-4 w-4" })
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
                                      }, _parent6, _scopeId5));
                                    });
                                    _push6(`<!--]-->`);
                                    if (__props.items.data.length === 0) {
                                      _push6(ssrRenderComponent(unref(_sfc_main$e), null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(unref(_sfc_main$h), {
                                              colspan: 6,
                                              class: "text-center text-muted-foreground"
                                            }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`Tidak ada data`);
                                                } else {
                                                  return [
                                                    createTextVNode("Tidak ada data")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(unref(_sfc_main$h), {
                                                colspan: 6,
                                                class: "text-center text-muted-foreground"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Tidak ada data")
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
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.items.data, (item) => {
                                        return openBlock(), createBlock(unref(_sfc_main$e), {
                                          key: item.id
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$h), null, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(item.title), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$h), { class: "capitalize" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(item.level), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$h), null, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(item.lessons_count), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$h), null, {
                                              default: withCtx(() => [
                                                item.is_active ? (openBlock(), createBlock(unref(_sfc_main$i), {
                                                  key: 0,
                                                  variant: "default"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Aktif")
                                                  ]),
                                                  _: 1
                                                })) : (openBlock(), createBlock(unref(_sfc_main$i), {
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
                                            }, 1024),
                                            createVNode(unref(_sfc_main$h), null, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(formatDate(item.created_at)), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "flex justify-end gap-2" }, [
                                                  createVNode(unref(_sfc_main$4), {
                                                    size: "sm",
                                                    variant: "outline",
                                                    onClick: ($event) => unref(router).get(`/admin/zenner/courses/${item.id}`)
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(Eye), { class: "h-4 w-4" })
                                                    ]),
                                                    _: 1
                                                  }, 8, ["onClick"]),
                                                  createVNode(unref(_sfc_main$4), {
                                                    size: "sm",
                                                    variant: "outline",
                                                    onClick: ($event) => unref(router).get(`/admin/zenner/courses/${item.id}/edit`)
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(Pencil), { class: "h-4 w-4" })
                                                    ]),
                                                    _: 1
                                                  }, 8, ["onClick"]),
                                                  createVNode(unref(_sfc_main$4), {
                                                    size: "sm",
                                                    variant: "destructive",
                                                    onClick: ($event) => confirmDelete(item)
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(Trash2), { class: "h-4 w-4" })
                                                    ]),
                                                    _: 1
                                                  }, 8, ["onClick"])
                                                ])
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 2
                                        }, 1024);
                                      }), 128)),
                                      __props.items.data.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$e), { key: 0 }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$h), {
                                            colspan: 6,
                                            class: "text-center text-muted-foreground"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("Tidak ada data")
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
                                createVNode(unref(_sfc_main$d), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$e), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$f), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Title")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$f), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Level")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$f), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Jumlah Lesson")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$f), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Status")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$f), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Dibuat")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$f), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Aksi")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$g), null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.items.data, (item) => {
                                      return openBlock(), createBlock(unref(_sfc_main$e), {
                                        key: item.id
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$h), null, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(item.title), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$h), { class: "capitalize" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(item.level), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$h), null, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(item.lessons_count), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$h), null, {
                                            default: withCtx(() => [
                                              item.is_active ? (openBlock(), createBlock(unref(_sfc_main$i), {
                                                key: 0,
                                                variant: "default"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Aktif")
                                                ]),
                                                _: 1
                                              })) : (openBlock(), createBlock(unref(_sfc_main$i), {
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
                                          }, 1024),
                                          createVNode(unref(_sfc_main$h), null, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(formatDate(item.created_at)), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "flex justify-end gap-2" }, [
                                                createVNode(unref(_sfc_main$4), {
                                                  size: "sm",
                                                  variant: "outline",
                                                  onClick: ($event) => unref(router).get(`/admin/zenner/courses/${item.id}`)
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(Eye), { class: "h-4 w-4" })
                                                  ]),
                                                  _: 1
                                                }, 8, ["onClick"]),
                                                createVNode(unref(_sfc_main$4), {
                                                  size: "sm",
                                                  variant: "outline",
                                                  onClick: ($event) => unref(router).get(`/admin/zenner/courses/${item.id}/edit`)
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(Pencil), { class: "h-4 w-4" })
                                                  ]),
                                                  _: 1
                                                }, 8, ["onClick"]),
                                                createVNode(unref(_sfc_main$4), {
                                                  size: "sm",
                                                  variant: "destructive",
                                                  onClick: ($event) => confirmDelete(item)
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(Trash2), { class: "h-4 w-4" })
                                                  ]),
                                                  _: 1
                                                }, 8, ["onClick"])
                                              ])
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1024);
                                    }), 128)),
                                    __props.items.data.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$e), { key: 0 }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$h), {
                                          colspan: 6,
                                          class: "text-center text-muted-foreground"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("Tidak ada data")
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
                        if (__props.items.last_page > 1) {
                          _push4(`<div class="mt-4 flex justify-center gap-2"${_scopeId3}><!--[-->`);
                          ssrRenderList(__props.items.links, (link) => {
                            _push4(ssrRenderComponent(unref(_sfc_main$4), {
                              size: "sm",
                              variant: link.active ? "default" : "outline",
                              disabled: !link.url,
                              onClick: ($event) => link.url && unref(router).get(link.url)
                            }, null, _parent4, _scopeId3));
                          });
                          _push4(`<!--]--></div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode(unref(_sfc_main$c), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$d), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$e), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$f), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Title")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$f), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Level")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$f), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Jumlah Lesson")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$f), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Status")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$f), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Dibuat")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$f), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Aksi")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$g), null, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.items.data, (item) => {
                                    return openBlock(), createBlock(unref(_sfc_main$e), {
                                      key: item.id
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$h), null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(item.title), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$h), { class: "capitalize" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(item.level), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$h), null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(item.lessons_count), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$h), null, {
                                          default: withCtx(() => [
                                            item.is_active ? (openBlock(), createBlock(unref(_sfc_main$i), {
                                              key: 0,
                                              variant: "default"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("Aktif")
                                              ]),
                                              _: 1
                                            })) : (openBlock(), createBlock(unref(_sfc_main$i), {
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
                                        }, 1024),
                                        createVNode(unref(_sfc_main$h), null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(formatDate(item.created_at)), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "flex justify-end gap-2" }, [
                                              createVNode(unref(_sfc_main$4), {
                                                size: "sm",
                                                variant: "outline",
                                                onClick: ($event) => unref(router).get(`/admin/zenner/courses/${item.id}`)
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(Eye), { class: "h-4 w-4" })
                                                ]),
                                                _: 1
                                              }, 8, ["onClick"]),
                                              createVNode(unref(_sfc_main$4), {
                                                size: "sm",
                                                variant: "outline",
                                                onClick: ($event) => unref(router).get(`/admin/zenner/courses/${item.id}/edit`)
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(Pencil), { class: "h-4 w-4" })
                                                ]),
                                                _: 1
                                              }, 8, ["onClick"]),
                                              createVNode(unref(_sfc_main$4), {
                                                size: "sm",
                                                variant: "destructive",
                                                onClick: ($event) => confirmDelete(item)
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(Trash2), { class: "h-4 w-4" })
                                                ]),
                                                _: 1
                                              }, 8, ["onClick"])
                                            ])
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1024);
                                  }), 128)),
                                  __props.items.data.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$e), { key: 0 }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$h), {
                                        colspan: 6,
                                        class: "text-center text-muted-foreground"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("Tidak ada data")
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
                          __props.items.last_page > 1 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-4 flex justify-center gap-2"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.items.links, (link) => {
                              return openBlock(), createBlock(unref(_sfc_main$4), {
                                key: link.label,
                                size: "sm",
                                variant: link.active ? "default" : "outline",
                                disabled: !link.url,
                                onClick: ($event) => link.url && unref(router).get(link.url),
                                innerHTML: link.label
                              }, null, 8, ["variant", "disabled", "onClick", "innerHTML"]);
                            }), 128))
                          ])) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("h2", { class: "text-xl font-semibold" }, "Courses"),
                          createVNode(unref(_sfc_main$4), {
                            onClick: ($event) => unref(router).get("/admin/zenner/courses/create")
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Plus), { class: "mr-2 h-4 w-4" }),
                              createTextVNode(" Tambah ")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ]),
                        createVNode("div", { class: "mt-4 flex items-center gap-4" }, [
                          createVNode("div", { class: "relative flex-1" }, [
                            createVNode(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
                            createVNode(unref(_sfc_main$5), {
                              modelValue: search.value,
                              "onUpdate:modelValue": ($event) => search.value = $event,
                              placeholder: "Cari...",
                              class: "pl-10",
                              onKeyup: withKeys(applyFilters, ["enter"])
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode(unref(_sfc_main$6), {
                            modelValue: status.value,
                            "onUpdate:modelValue": [($event) => status.value = $event, applyFilters]
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$7), { class: "w-[180px]" }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$8), { placeholder: "Semua Status" })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$9), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$a), { value: "" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Semua Status")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$a), { value: "active" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Aktif")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$a), { value: "inactive" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Nonaktif")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$b), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$c), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$d), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$f), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Title")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$f), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Level")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$f), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Jumlah Lesson")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$f), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Status")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$f), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Dibuat")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$f), { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Aksi")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$g), null, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.items.data, (item) => {
                                  return openBlock(), createBlock(unref(_sfc_main$e), {
                                    key: item.id
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$h), null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(item.title), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$h), { class: "capitalize" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(item.level), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$h), null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(item.lessons_count), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$h), null, {
                                        default: withCtx(() => [
                                          item.is_active ? (openBlock(), createBlock(unref(_sfc_main$i), {
                                            key: 0,
                                            variant: "default"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("Aktif")
                                            ]),
                                            _: 1
                                          })) : (openBlock(), createBlock(unref(_sfc_main$i), {
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
                                      }, 1024),
                                      createVNode(unref(_sfc_main$h), null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(formatDate(item.created_at)), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "flex justify-end gap-2" }, [
                                            createVNode(unref(_sfc_main$4), {
                                              size: "sm",
                                              variant: "outline",
                                              onClick: ($event) => unref(router).get(`/admin/zenner/courses/${item.id}`)
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(Eye), { class: "h-4 w-4" })
                                              ]),
                                              _: 1
                                            }, 8, ["onClick"]),
                                            createVNode(unref(_sfc_main$4), {
                                              size: "sm",
                                              variant: "outline",
                                              onClick: ($event) => unref(router).get(`/admin/zenner/courses/${item.id}/edit`)
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(Pencil), { class: "h-4 w-4" })
                                              ]),
                                              _: 1
                                            }, 8, ["onClick"]),
                                            createVNode(unref(_sfc_main$4), {
                                              size: "sm",
                                              variant: "destructive",
                                              onClick: ($event) => confirmDelete(item)
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(Trash2), { class: "h-4 w-4" })
                                              ]),
                                              _: 1
                                            }, 8, ["onClick"])
                                          ])
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 128)),
                                __props.items.data.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$e), { key: 0 }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$h), {
                                      colspan: 6,
                                      class: "text-center text-muted-foreground"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("Tidak ada data")
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
                        __props.items.last_page > 1 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-4 flex justify-center gap-2"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.items.links, (link) => {
                            return openBlock(), createBlock(unref(_sfc_main$4), {
                              key: link.label,
                              size: "sm",
                              variant: link.active ? "default" : "outline",
                              disabled: !link.url,
                              onClick: ($event) => link.url && unref(router).get(link.url),
                              innerHTML: link.label
                            }, null, 8, ["variant", "disabled", "onClick", "innerHTML"]);
                          }), 128))
                        ])) : createCommentVNode("", true)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$j), {
              open: deleteDialogOpen.value,
              "onUpdate:open": ($event) => deleteDialogOpen.value = $event
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$k), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$l), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$m), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Hapus Course`);
                                  } else {
                                    return [
                                      createTextVNode("Hapus Course")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$n), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Apakah Anda yakin ingin menghapus &quot;${ssrInterpolate(deleteTarget.value?.title)}&quot;? Tindakan ini tidak dapat dibatalkan. `);
                                  } else {
                                    return [
                                      createTextVNode(' Apakah Anda yakin ingin menghapus "' + toDisplayString(deleteTarget.value?.title) + '"? Tindakan ini tidak dapat dibatalkan. ', 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$m), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Hapus Course")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$n), null, {
                                  default: withCtx(() => [
                                    createTextVNode(' Apakah Anda yakin ingin menghapus "' + toDisplayString(deleteTarget.value?.title) + '"? Tindakan ini tidak dapat dibatalkan. ', 1)
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$o), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$p), null, {
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
                              _push5(ssrRenderComponent(unref(_sfc_main$q), { onClick: handleDelete }, {
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
                                createVNode(unref(_sfc_main$p), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Batal")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$q), { onClick: handleDelete }, {
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
                          createVNode(unref(_sfc_main$l), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$m), null, {
                                default: withCtx(() => [
                                  createTextVNode("Hapus Course")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$n), null, {
                                default: withCtx(() => [
                                  createTextVNode(' Apakah Anda yakin ingin menghapus "' + toDisplayString(deleteTarget.value?.title) + '"? Tindakan ini tidak dapat dibatalkan. ', 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$o), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$p), null, {
                                default: withCtx(() => [
                                  createTextVNode("Batal")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$q), { onClick: handleDelete }, {
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
                    createVNode(unref(_sfc_main$k), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$l), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$m), null, {
                              default: withCtx(() => [
                                createTextVNode("Hapus Course")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$n), null, {
                              default: withCtx(() => [
                                createTextVNode(' Apakah Anda yakin ingin menghapus "' + toDisplayString(deleteTarget.value?.title) + '"? Tindakan ini tidak dapat dibatalkan. ', 1)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$o), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$p), null, {
                              default: withCtx(() => [
                                createTextVNode("Batal")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$q), { onClick: handleDelete }, {
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
              createVNode(unref(_sfc_main$2), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("h2", { class: "text-xl font-semibold" }, "Courses"),
                        createVNode(unref(_sfc_main$4), {
                          onClick: ($event) => unref(router).get("/admin/zenner/courses/create")
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Plus), { class: "mr-2 h-4 w-4" }),
                            createTextVNode(" Tambah ")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]),
                      createVNode("div", { class: "mt-4 flex items-center gap-4" }, [
                        createVNode("div", { class: "relative flex-1" }, [
                          createVNode(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
                          createVNode(unref(_sfc_main$5), {
                            modelValue: search.value,
                            "onUpdate:modelValue": ($event) => search.value = $event,
                            placeholder: "Cari...",
                            class: "pl-10",
                            onKeyup: withKeys(applyFilters, ["enter"])
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode(unref(_sfc_main$6), {
                          modelValue: status.value,
                          "onUpdate:modelValue": [($event) => status.value = $event, applyFilters]
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$7), { class: "w-[180px]" }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$8), { placeholder: "Semua Status" })
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$9), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$a), { value: "" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Semua Status")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$a), { value: "active" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Aktif")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$a), { value: "inactive" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Nonaktif")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$b), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$c), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$d), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$e), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$f), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Title")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$f), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Level")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$f), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Jumlah Lesson")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$f), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Status")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$f), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Dibuat")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$f), { class: "text-right" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Aksi")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$g), null, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.items.data, (item) => {
                                return openBlock(), createBlock(unref(_sfc_main$e), {
                                  key: item.id
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$h), null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(item.title), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$h), { class: "capitalize" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(item.level), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$h), null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(item.lessons_count), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$h), null, {
                                      default: withCtx(() => [
                                        item.is_active ? (openBlock(), createBlock(unref(_sfc_main$i), {
                                          key: 0,
                                          variant: "default"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("Aktif")
                                          ]),
                                          _: 1
                                        })) : (openBlock(), createBlock(unref(_sfc_main$i), {
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
                                    }, 1024),
                                    createVNode(unref(_sfc_main$h), null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(formatDate(item.created_at)), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "flex justify-end gap-2" }, [
                                          createVNode(unref(_sfc_main$4), {
                                            size: "sm",
                                            variant: "outline",
                                            onClick: ($event) => unref(router).get(`/admin/zenner/courses/${item.id}`)
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(Eye), { class: "h-4 w-4" })
                                            ]),
                                            _: 1
                                          }, 8, ["onClick"]),
                                          createVNode(unref(_sfc_main$4), {
                                            size: "sm",
                                            variant: "outline",
                                            onClick: ($event) => unref(router).get(`/admin/zenner/courses/${item.id}/edit`)
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(Pencil), { class: "h-4 w-4" })
                                            ]),
                                            _: 1
                                          }, 8, ["onClick"]),
                                          createVNode(unref(_sfc_main$4), {
                                            size: "sm",
                                            variant: "destructive",
                                            onClick: ($event) => confirmDelete(item)
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(Trash2), { class: "h-4 w-4" })
                                            ]),
                                            _: 1
                                          }, 8, ["onClick"])
                                        ])
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024);
                              }), 128)),
                              __props.items.data.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$e), { key: 0 }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$h), {
                                    colspan: 6,
                                    class: "text-center text-muted-foreground"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Tidak ada data")
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
                      __props.items.last_page > 1 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-4 flex justify-center gap-2"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.items.links, (link) => {
                          return openBlock(), createBlock(unref(_sfc_main$4), {
                            key: link.label,
                            size: "sm",
                            variant: link.active ? "default" : "outline",
                            disabled: !link.url,
                            onClick: ($event) => link.url && unref(router).get(link.url),
                            innerHTML: link.label
                          }, null, 8, ["variant", "disabled", "onClick", "innerHTML"]);
                        }), 128))
                      ])) : createCommentVNode("", true)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$j), {
                open: deleteDialogOpen.value,
                "onUpdate:open": ($event) => deleteDialogOpen.value = $event
              }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$k), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$l), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$m), null, {
                            default: withCtx(() => [
                              createTextVNode("Hapus Course")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$n), null, {
                            default: withCtx(() => [
                              createTextVNode(' Apakah Anda yakin ingin menghapus "' + toDisplayString(deleteTarget.value?.title) + '"? Tindakan ini tidak dapat dibatalkan. ', 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$o), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$p), null, {
                            default: withCtx(() => [
                              createTextVNode("Batal")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$q), { onClick: handleDelete }, {
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
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Zenner/Course/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
