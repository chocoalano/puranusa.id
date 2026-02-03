import { defineComponent, ref, withCtx, unref, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, withKeys, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { router, useForm } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-BHxY2bcF.js";
import { _ as _sfc_main$2, a as _sfc_main$3, c as _sfc_main$5 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$4 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$6 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$i } from "./index-BpQimeTM.js";
import { _ as _sfc_main$c, a as _sfc_main$d, b as _sfc_main$e, c as _sfc_main$f, d as _sfc_main$g, e as _sfc_main$h } from "./TableHeader-emcE6QAC.js";
import { _ as _sfc_main$7, a as _sfc_main$8, b as _sfc_main$9, c as _sfc_main$a, d as _sfc_main$b } from "./SelectValue-BUnv4mQg.js";
import { _ as _sfc_main$j, b as _sfc_main$k, c as _sfc_main$l, d as _sfc_main$m, e as _sfc_main$n, f as _sfc_main$o, g as _sfc_main$p, h as _sfc_main$q } from "./AlertDialogTrigger-DIWb7xue.js";
import { Plus, Search, Pencil, Trash2 } from "lucide-vue-next";
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
    filters: {},
    categories: {}
  },
  setup(__props) {
    const props = __props;
    const search = ref(props.filters.search || "");
    const category = ref(props.filters.category || "");
    const deleteId = ref(null);
    const showDeleteDialog = ref(false);
    const formatDate = (date) => {
      if (!date) return "-";
      return new Date(date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
    };
    const applyFilters = () => {
      router.get("/admin/zenner/selling-guides", {
        search: search.value || void 0,
        category: category.value || void 0
      }, { preserveState: true, replace: true });
    };
    const confirmDelete = (id) => {
      deleteId.value = id;
      showDeleteDialog.value = true;
    };
    const handleDelete = () => {
      if (deleteId.value) {
        useForm({}).delete(`/admin/zenner/selling-guides/${deleteId.value}`, {
          preserveScroll: true,
          onSuccess: () => toast.success("Selling Guide berhasil dihapus")
        });
      }
      showDeleteDialog.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex items-center justify-between"${_scopeId3}><h2 class="text-xl font-semibold"${_scopeId3}>Selling Guide</h2>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$4), {
                          onClick: ($event) => unref(router).visit("/admin/zenner/selling-guides/create")
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
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center justify-between" }, [
                            createVNode("h2", { class: "text-xl font-semibold" }, "Selling Guide"),
                            createVNode(unref(_sfc_main$4), {
                              onClick: ($event) => unref(router).visit("/admin/zenner/selling-guides/create")
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Plus), { class: "mr-2 h-4 w-4" }),
                                createTextVNode(" Tambah ")
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="mb-4 flex items-center gap-4"${_scopeId3}><div class="relative flex-1"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$6), {
                          modelValue: search.value,
                          "onUpdate:modelValue": ($event) => search.value = $event,
                          placeholder: "Cari...",
                          class: "pl-10",
                          onKeyup: applyFilters
                        }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$7), {
                          modelValue: category.value,
                          "onUpdate:modelValue": [($event) => category.value = $event, applyFilters]
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$8), { class: "w-48" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$9), { placeholder: "Semua Kategori" }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$9), { placeholder: "Semua Kategori" })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$a), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$b), { value: "" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Semua Kategori`);
                                        } else {
                                          return [
                                            createTextVNode("Semua Kategori")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`<!--[-->`);
                                    ssrRenderList(__props.categories, (cat) => {
                                      _push6(ssrRenderComponent(unref(_sfc_main$b), {
                                        key: cat,
                                        value: cat
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`${ssrInterpolate(cat)}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString(cat), 1)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    });
                                    _push6(`<!--]-->`);
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$b), { value: "" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Semua Kategori")
                                        ]),
                                        _: 1
                                      }),
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (cat) => {
                                        return openBlock(), createBlock(unref(_sfc_main$b), {
                                          key: cat,
                                          value: cat
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(cat), 1)
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
                                createVNode(unref(_sfc_main$8), { class: "w-48" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$9), { placeholder: "Semua Kategori" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$a), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$b), { value: "" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Semua Kategori")
                                      ]),
                                      _: 1
                                    }),
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (cat) => {
                                      return openBlock(), createBlock(unref(_sfc_main$b), {
                                        key: cat,
                                        value: cat
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(cat), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["value"]);
                                    }), 128))
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$4), {
                          variant: "outline",
                          onClick: applyFilters
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Filter`);
                            } else {
                              return [
                                createTextVNode("Filter")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
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
                                                _push8(`Kategori`);
                                              } else {
                                                return [
                                                  createTextVNode("Kategori")
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
                                                createTextVNode("Kategori")
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
                                              createTextVNode("Kategori")
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
                                            _push7(ssrRenderComponent(unref(_sfc_main$h), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(item.category)}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(item.category), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$h), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(unref(_sfc_main$i), {
                                                    variant: item.is_active ? "default" : "secondary"
                                                  }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`${ssrInterpolate(item.is_active ? "Aktif" : "Nonaktif")}`);
                                                      } else {
                                                        return [
                                                          createTextVNode(toDisplayString(item.is_active ? "Aktif" : "Nonaktif"), 1)
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                } else {
                                                  return [
                                                    createVNode(unref(_sfc_main$i), {
                                                      variant: item.is_active ? "default" : "secondary"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(item.is_active ? "Aktif" : "Nonaktif"), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["variant"])
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
                                                  _push8(ssrRenderComponent(unref(_sfc_main$4), {
                                                    variant: "ghost",
                                                    size: "icon",
                                                    onClick: ($event) => unref(router).visit(`/admin/zenner/selling-guides/${item.id}/edit`)
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
                                                    variant: "ghost",
                                                    size: "icon",
                                                    onClick: ($event) => confirmDelete(item.id)
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
                                                } else {
                                                  return [
                                                    createVNode(unref(_sfc_main$4), {
                                                      variant: "ghost",
                                                      size: "icon",
                                                      onClick: ($event) => unref(router).visit(`/admin/zenner/selling-guides/${item.id}/edit`)
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(unref(Pencil), { class: "h-4 w-4" })
                                                      ]),
                                                      _: 1
                                                    }, 8, ["onClick"]),
                                                    createVNode(unref(_sfc_main$4), {
                                                      variant: "ghost",
                                                      size: "icon",
                                                      onClick: ($event) => confirmDelete(item.id)
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(unref(Trash2), { class: "h-4 w-4" })
                                                      ]),
                                                      _: 1
                                                    }, 8, ["onClick"])
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
                                              createVNode(unref(_sfc_main$h), null, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(item.category), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$h), null, {
                                                default: withCtx(() => [
                                                  createVNode(unref(_sfc_main$i), {
                                                    variant: item.is_active ? "default" : "secondary"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(item.is_active ? "Aktif" : "Nonaktif"), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["variant"])
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
                                                  createVNode(unref(_sfc_main$4), {
                                                    variant: "ghost",
                                                    size: "icon",
                                                    onClick: ($event) => unref(router).visit(`/admin/zenner/selling-guides/${item.id}/edit`)
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(Pencil), { class: "h-4 w-4" })
                                                    ]),
                                                    _: 1
                                                  }, 8, ["onClick"]),
                                                  createVNode(unref(_sfc_main$4), {
                                                    variant: "ghost",
                                                    size: "icon",
                                                    onClick: ($event) => confirmDelete(item.id)
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(Trash2), { class: "h-4 w-4" })
                                                    ]),
                                                    _: 1
                                                  }, 8, ["onClick"])
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
                                            createVNode(unref(_sfc_main$h), null, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(item.category), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$h), null, {
                                              default: withCtx(() => [
                                                createVNode(unref(_sfc_main$i), {
                                                  variant: item.is_active ? "default" : "secondary"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(item.is_active ? "Aktif" : "Nonaktif"), 1)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["variant"])
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
                                                createVNode(unref(_sfc_main$4), {
                                                  variant: "ghost",
                                                  size: "icon",
                                                  onClick: ($event) => unref(router).visit(`/admin/zenner/selling-guides/${item.id}/edit`)
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(Pencil), { class: "h-4 w-4" })
                                                  ]),
                                                  _: 1
                                                }, 8, ["onClick"]),
                                                createVNode(unref(_sfc_main$4), {
                                                  variant: "ghost",
                                                  size: "icon",
                                                  onClick: ($event) => confirmDelete(item.id)
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(Trash2), { class: "h-4 w-4" })
                                                  ]),
                                                  _: 1
                                                }, 8, ["onClick"])
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
                                            createTextVNode("Kategori")
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
                                          createVNode(unref(_sfc_main$h), null, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(item.category), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$h), null, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$i), {
                                                variant: item.is_active ? "default" : "secondary"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(item.is_active ? "Aktif" : "Nonaktif"), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["variant"])
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
                                              createVNode(unref(_sfc_main$4), {
                                                variant: "ghost",
                                                size: "icon",
                                                onClick: ($event) => unref(router).visit(`/admin/zenner/selling-guides/${item.id}/edit`)
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(Pencil), { class: "h-4 w-4" })
                                                ]),
                                                _: 1
                                              }, 8, ["onClick"]),
                                              createVNode(unref(_sfc_main$4), {
                                                variant: "ghost",
                                                size: "icon",
                                                onClick: ($event) => confirmDelete(item.id)
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(Trash2), { class: "h-4 w-4" })
                                                ]),
                                                _: 1
                                              }, 8, ["onClick"])
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
                        _push4(`<div class="mt-4 flex justify-center gap-2"${_scopeId3}><!--[-->`);
                        ssrRenderList(__props.items.links, (link) => {
                          _push4(ssrRenderComponent(unref(_sfc_main$4), {
                            variant: "outline",
                            size: "sm",
                            disabled: !link.url,
                            onClick: ($event) => link.url && unref(router).visit(link.url)
                          }, null, _parent4, _scopeId3));
                        });
                        _push4(`<!--]--></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "mb-4 flex items-center gap-4" }, [
                            createVNode("div", { class: "relative flex-1" }, [
                              createVNode(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
                              createVNode(unref(_sfc_main$6), {
                                modelValue: search.value,
                                "onUpdate:modelValue": ($event) => search.value = $event,
                                placeholder: "Cari...",
                                class: "pl-10",
                                onKeyup: withKeys(applyFilters, ["enter"])
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode(unref(_sfc_main$7), {
                              modelValue: category.value,
                              "onUpdate:modelValue": [($event) => category.value = $event, applyFilters]
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$8), { class: "w-48" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$9), { placeholder: "Semua Kategori" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$a), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$b), { value: "" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Semua Kategori")
                                      ]),
                                      _: 1
                                    }),
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (cat) => {
                                      return openBlock(), createBlock(unref(_sfc_main$b), {
                                        key: cat,
                                        value: cat
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(cat), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["value"]);
                                    }), 128))
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(unref(_sfc_main$4), {
                              variant: "outline",
                              onClick: applyFilters
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Filter")
                              ]),
                              _: 1
                            })
                          ]),
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
                                          createTextVNode("Kategori")
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
                                        createVNode(unref(_sfc_main$h), null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(item.category), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$h), null, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$i), {
                                              variant: item.is_active ? "default" : "secondary"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(item.is_active ? "Aktif" : "Nonaktif"), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["variant"])
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
                                            createVNode(unref(_sfc_main$4), {
                                              variant: "ghost",
                                              size: "icon",
                                              onClick: ($event) => unref(router).visit(`/admin/zenner/selling-guides/${item.id}/edit`)
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(Pencil), { class: "h-4 w-4" })
                                              ]),
                                              _: 1
                                            }, 8, ["onClick"]),
                                            createVNode(unref(_sfc_main$4), {
                                              variant: "ghost",
                                              size: "icon",
                                              onClick: ($event) => confirmDelete(item.id)
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(Trash2), { class: "h-4 w-4" })
                                              ]),
                                              _: 1
                                            }, 8, ["onClick"])
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
                          }),
                          createVNode("div", { class: "mt-4 flex justify-center gap-2" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.items.links, (link) => {
                              return openBlock(), createBlock(unref(_sfc_main$4), {
                                key: link.label,
                                variant: "outline",
                                size: "sm",
                                disabled: !link.url,
                                onClick: ($event) => link.url && unref(router).visit(link.url),
                                innerHTML: link.label
                              }, null, 8, ["disabled", "onClick", "innerHTML"]);
                            }), 128))
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
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("h2", { class: "text-xl font-semibold" }, "Selling Guide"),
                          createVNode(unref(_sfc_main$4), {
                            onClick: ($event) => unref(router).visit("/admin/zenner/selling-guides/create")
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Plus), { class: "mr-2 h-4 w-4" }),
                              createTextVNode(" Tambah ")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "mb-4 flex items-center gap-4" }, [
                          createVNode("div", { class: "relative flex-1" }, [
                            createVNode(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
                            createVNode(unref(_sfc_main$6), {
                              modelValue: search.value,
                              "onUpdate:modelValue": ($event) => search.value = $event,
                              placeholder: "Cari...",
                              class: "pl-10",
                              onKeyup: withKeys(applyFilters, ["enter"])
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode(unref(_sfc_main$7), {
                            modelValue: category.value,
                            "onUpdate:modelValue": [($event) => category.value = $event, applyFilters]
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$8), { class: "w-48" }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$9), { placeholder: "Semua Kategori" })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$b), { value: "" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Semua Kategori")
                                    ]),
                                    _: 1
                                  }),
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (cat) => {
                                    return openBlock(), createBlock(unref(_sfc_main$b), {
                                      key: cat,
                                      value: cat
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(cat), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["value"]);
                                  }), 128))
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(unref(_sfc_main$4), {
                            variant: "outline",
                            onClick: applyFilters
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Filter")
                            ]),
                            _: 1
                          })
                        ]),
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
                                        createTextVNode("Kategori")
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
                                      createVNode(unref(_sfc_main$h), null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(item.category), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$h), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$i), {
                                            variant: item.is_active ? "default" : "secondary"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(item.is_active ? "Aktif" : "Nonaktif"), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["variant"])
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
                                          createVNode(unref(_sfc_main$4), {
                                            variant: "ghost",
                                            size: "icon",
                                            onClick: ($event) => unref(router).visit(`/admin/zenner/selling-guides/${item.id}/edit`)
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(Pencil), { class: "h-4 w-4" })
                                            ]),
                                            _: 1
                                          }, 8, ["onClick"]),
                                          createVNode(unref(_sfc_main$4), {
                                            variant: "ghost",
                                            size: "icon",
                                            onClick: ($event) => confirmDelete(item.id)
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(Trash2), { class: "h-4 w-4" })
                                            ]),
                                            _: 1
                                          }, 8, ["onClick"])
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
                        }),
                        createVNode("div", { class: "mt-4 flex justify-center gap-2" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.items.links, (link) => {
                            return openBlock(), createBlock(unref(_sfc_main$4), {
                              key: link.label,
                              variant: "outline",
                              size: "sm",
                              disabled: !link.url,
                              onClick: ($event) => link.url && unref(router).visit(link.url),
                              innerHTML: link.label
                            }, null, 8, ["disabled", "onClick", "innerHTML"]);
                          }), 128))
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$j), {
              open: showDeleteDialog.value,
              "onUpdate:open": ($event) => showDeleteDialog.value = $event
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
                                    _push6(`Hapus Selling Guide?`);
                                  } else {
                                    return [
                                      createTextVNode("Hapus Selling Guide?")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$n), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Data yang dihapus tidak dapat dikembalikan.`);
                                  } else {
                                    return [
                                      createTextVNode("Data yang dihapus tidak dapat dikembalikan.")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$m), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Hapus Selling Guide?")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$n), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Data yang dihapus tidak dapat dikembalikan.")
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
                                  createTextVNode("Hapus Selling Guide?")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$n), null, {
                                default: withCtx(() => [
                                  createTextVNode("Data yang dihapus tidak dapat dikembalikan.")
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
                                createTextVNode("Hapus Selling Guide?")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$n), null, {
                              default: withCtx(() => [
                                createTextVNode("Data yang dihapus tidak dapat dikembalikan.")
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
                        createVNode("h2", { class: "text-xl font-semibold" }, "Selling Guide"),
                        createVNode(unref(_sfc_main$4), {
                          onClick: ($event) => unref(router).visit("/admin/zenner/selling-guides/create")
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Plus), { class: "mr-2 h-4 w-4" }),
                            createTextVNode(" Tambah ")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$5), null, {
                    default: withCtx(() => [
                      createVNode("div", { class: "mb-4 flex items-center gap-4" }, [
                        createVNode("div", { class: "relative flex-1" }, [
                          createVNode(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
                          createVNode(unref(_sfc_main$6), {
                            modelValue: search.value,
                            "onUpdate:modelValue": ($event) => search.value = $event,
                            placeholder: "Cari...",
                            class: "pl-10",
                            onKeyup: withKeys(applyFilters, ["enter"])
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode(unref(_sfc_main$7), {
                          modelValue: category.value,
                          "onUpdate:modelValue": [($event) => category.value = $event, applyFilters]
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$8), { class: "w-48" }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$9), { placeholder: "Semua Kategori" })
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$a), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$b), { value: "" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Semua Kategori")
                                  ]),
                                  _: 1
                                }),
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (cat) => {
                                  return openBlock(), createBlock(unref(_sfc_main$b), {
                                    key: cat,
                                    value: cat
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(cat), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 128))
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(unref(_sfc_main$4), {
                          variant: "outline",
                          onClick: applyFilters
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Filter")
                          ]),
                          _: 1
                        })
                      ]),
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
                                      createTextVNode("Kategori")
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
                                    createVNode(unref(_sfc_main$h), null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(item.category), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$h), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$i), {
                                          variant: item.is_active ? "default" : "secondary"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(item.is_active ? "Aktif" : "Nonaktif"), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["variant"])
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
                                        createVNode(unref(_sfc_main$4), {
                                          variant: "ghost",
                                          size: "icon",
                                          onClick: ($event) => unref(router).visit(`/admin/zenner/selling-guides/${item.id}/edit`)
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(Pencil), { class: "h-4 w-4" })
                                          ]),
                                          _: 1
                                        }, 8, ["onClick"]),
                                        createVNode(unref(_sfc_main$4), {
                                          variant: "ghost",
                                          size: "icon",
                                          onClick: ($event) => confirmDelete(item.id)
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(Trash2), { class: "h-4 w-4" })
                                          ]),
                                          _: 1
                                        }, 8, ["onClick"])
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
                      }),
                      createVNode("div", { class: "mt-4 flex justify-center gap-2" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.items.links, (link) => {
                          return openBlock(), createBlock(unref(_sfc_main$4), {
                            key: link.label,
                            variant: "outline",
                            size: "sm",
                            disabled: !link.url,
                            onClick: ($event) => link.url && unref(router).visit(link.url),
                            innerHTML: link.label
                          }, null, 8, ["disabled", "onClick", "innerHTML"]);
                        }), 128))
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$j), {
                open: showDeleteDialog.value,
                "onUpdate:open": ($event) => showDeleteDialog.value = $event
              }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$k), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$l), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$m), null, {
                            default: withCtx(() => [
                              createTextVNode("Hapus Selling Guide?")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$n), null, {
                            default: withCtx(() => [
                              createTextVNode("Data yang dihapus tidak dapat dikembalikan.")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Zenner/SellingGuide/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
