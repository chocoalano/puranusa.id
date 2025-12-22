import { defineComponent, ref, withCtx, unref, createVNode, createTextVNode, withKeys, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-BVMUmVET.js";
import { _ as _sfc_main$3, a as _sfc_main$4, c as _sfc_main$b } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$2 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$5 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$i } from "./index-BpQimeTM.js";
import { _ as _sfc_main$c, a as _sfc_main$d, b as _sfc_main$e, c as _sfc_main$f, d as _sfc_main$g, e as _sfc_main$h } from "./TableHeader-emcE6QAC.js";
import { _ as _sfc_main$6, a as _sfc_main$7, b as _sfc_main$8, c as _sfc_main$9, d as _sfc_main$a } from "./SelectValue-BUnv4mQg.js";
import { _ as _sfc_main$j, b as _sfc_main$k, c as _sfc_main$l, d as _sfc_main$m, e as _sfc_main$n, f as _sfc_main$o, g as _sfc_main$p, h as _sfc_main$q } from "./AlertDialogTrigger-DIWb7xue.js";
import { Plus, Search, Pencil, Trash2 } from "lucide-vue-next";
import { toast } from "vue-sonner";
import "class-variance-authority";
import "./DropdownMenuTrigger-B1v6pHML.js";
import "reka-ui";
import "@vueuse/core";
import "./index-Jhngbhhu.js";
import "./AvatarImage-DWFQMckn.js";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
import "clsx";
import "tailwind-merge";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    articles: {},
    filters: {}
  },
  setup(__props) {
    const props = __props;
    const search = ref(props.filters.search || "");
    const status = ref(props.filters.status || "all");
    const sortBy = ref(props.filters.sort_by);
    const sortOrder = ref(props.filters.sort_order);
    const perPage = ref(props.filters.per_page);
    const articleToDelete = ref(null);
    const isDeleting = ref(false);
    const applyFilters = () => {
      router.get("/admin/articles", {
        search: search.value || void 0,
        status: status.value !== "all" ? status.value : void 0,
        sort_by: sortBy.value,
        sort_order: sortOrder.value,
        per_page: perPage.value
      }, {
        preserveState: true,
        preserveScroll: true
      });
    };
    const deleteArticle = (id) => {
      articleToDelete.value = id;
    };
    const confirmDelete = () => {
      if (!articleToDelete.value) return;
      isDeleting.value = true;
      router.delete(`/admin/articles/${articleToDelete.value}`, {
        onSuccess: () => {
          toast.success("Artikel berhasil dihapus");
          articleToDelete.value = null;
        },
        onError: () => {
          toast.error("Gagal menghapus artikel");
        },
        onFinish: () => {
          isDeleting.value = false;
        }
      });
    };
    const formatDate = (date) => {
      if (!date) return "-";
      return new Date(date).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
    };
    const goToPage = (page) => {
      router.get("/admin/articles", {
        page,
        search: search.value || void 0,
        status: status.value !== "all" ? status.value : void 0,
        sort_by: sortBy.value,
        sort_order: sortOrder.value,
        per_page: perPage.value
      }, {
        preserveState: true,
        preserveScroll: true
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="container mx-auto py-6 space-y-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="text-3xl font-bold tracking-tight"${_scopeId}>Artikel</h1><p class="text-muted-foreground"${_scopeId}> Kelola semua artikel dan konten blog </p></div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), { "as-child": "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<a href="/admin/articles/create"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Plus), { class: "mr-2 h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(` Tambah Artikel </a>`);
                } else {
                  return [
                    createVNode("a", { href: "/admin/articles/create" }, [
                      createVNode(unref(Plus), { class: "mr-2 h-4 w-4" }),
                      createTextVNode(" Tambah Artikel ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$3), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex flex-col md:flex-row gap-4"${_scopeId3}><div class="flex-1"${_scopeId3}><div class="relative"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$5), {
                          modelValue: search.value,
                          "onUpdate:modelValue": ($event) => search.value = $event,
                          placeholder: "Cari artikel...",
                          class: "pl-10",
                          onKeyup: applyFilters
                        }, null, _parent4, _scopeId3));
                        _push4(`</div></div><div class="flex gap-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$6), {
                          modelValue: status.value,
                          "onUpdate:modelValue": [($event) => status.value = $event, applyFilters]
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$7), { class: "w-[140px]" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$8), { placeholder: "Status" }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$8), { placeholder: "Status" })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$9), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$a), { value: "all" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Semua`);
                                        } else {
                                          return [
                                            createTextVNode("Semua")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$a), { value: "published" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Terbit`);
                                        } else {
                                          return [
                                            createTextVNode("Terbit")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$a), { value: "draft" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Draft`);
                                        } else {
                                          return [
                                            createTextVNode("Draft")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$a), { value: "all" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Semua")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$a), { value: "published" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Terbit")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$a), { value: "draft" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Draft")
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
                                createVNode(unref(_sfc_main$7), { class: "w-[140px]" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$8), { placeholder: "Status" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$9), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$a), { value: "all" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Semua")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$a), { value: "published" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Terbit")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$a), { value: "draft" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Draft")
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
                        _push4(ssrRenderComponent(unref(_sfc_main$6), {
                          modelValue: perPage.value,
                          "onUpdate:modelValue": [($event) => perPage.value = $event, applyFilters]
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$7), { class: "w-[100px]" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$8), { placeholder: "Per halaman" }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$8), { placeholder: "Per halaman" })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$9), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$a), { value: "10" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`10`);
                                        } else {
                                          return [
                                            createTextVNode("10")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$a), { value: "25" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`25`);
                                        } else {
                                          return [
                                            createTextVNode("25")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$a), { value: "50" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`50`);
                                        } else {
                                          return [
                                            createTextVNode("50")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$a), { value: "100" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`100`);
                                        } else {
                                          return [
                                            createTextVNode("100")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$a), { value: "10" }, {
                                        default: withCtx(() => [
                                          createTextVNode("10")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$a), { value: "25" }, {
                                        default: withCtx(() => [
                                          createTextVNode("25")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$a), { value: "50" }, {
                                        default: withCtx(() => [
                                          createTextVNode("50")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$a), { value: "100" }, {
                                        default: withCtx(() => [
                                          createTextVNode("100")
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
                                createVNode(unref(_sfc_main$7), { class: "w-[100px]" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$8), { placeholder: "Per halaman" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$9), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$a), { value: "10" }, {
                                      default: withCtx(() => [
                                        createTextVNode("10")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$a), { value: "25" }, {
                                      default: withCtx(() => [
                                        createTextVNode("25")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$a), { value: "50" }, {
                                      default: withCtx(() => [
                                        createTextVNode("50")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$a), { value: "100" }, {
                                      default: withCtx(() => [
                                        createTextVNode("100")
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
                        _push4(`</div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex flex-col md:flex-row gap-4" }, [
                            createVNode("div", { class: "flex-1" }, [
                              createVNode("div", { class: "relative" }, [
                                createVNode(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
                                createVNode(unref(_sfc_main$5), {
                                  modelValue: search.value,
                                  "onUpdate:modelValue": ($event) => search.value = $event,
                                  placeholder: "Cari artikel...",
                                  class: "pl-10",
                                  onKeyup: withKeys(applyFilters, ["enter"])
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ])
                            ]),
                            createVNode("div", { class: "flex gap-2" }, [
                              createVNode(unref(_sfc_main$6), {
                                modelValue: status.value,
                                "onUpdate:modelValue": [($event) => status.value = $event, applyFilters]
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$7), { class: "w-[140px]" }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$8), { placeholder: "Status" })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$9), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$a), { value: "all" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Semua")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$a), { value: "published" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Terbit")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$a), { value: "draft" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Draft")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(unref(_sfc_main$6), {
                                modelValue: perPage.value,
                                "onUpdate:modelValue": [($event) => perPage.value = $event, applyFilters]
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$7), { class: "w-[100px]" }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$8), { placeholder: "Per halaman" })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$9), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$a), { value: "10" }, {
                                        default: withCtx(() => [
                                          createTextVNode("10")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$a), { value: "25" }, {
                                        default: withCtx(() => [
                                          createTextVNode("25")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$a), { value: "50" }, {
                                        default: withCtx(() => [
                                          createTextVNode("50")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$a), { value: "100" }, {
                                        default: withCtx(() => [
                                          createTextVNode("100")
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
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$b), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (__props.articles.data.length > 0) {
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
                                                  _push8(`Judul`);
                                                } else {
                                                  return [
                                                    createTextVNode("Judul")
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
                                                  _push8(`Tanggal Terbit`);
                                                } else {
                                                  return [
                                                    createTextVNode("Tanggal Terbit")
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
                                                  createTextVNode("Judul")
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
                                                  createTextVNode("Tanggal Terbit")
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
                                                createTextVNode("Judul")
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
                                                createTextVNode("Tanggal Terbit")
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
                                      ssrRenderList(__props.articles.data, (article) => {
                                        _push6(ssrRenderComponent(unref(_sfc_main$e), {
                                          key: article.id
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(unref(_sfc_main$h), null, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`<div${_scopeId7}><p class="font-medium"${_scopeId7}>${ssrInterpolate(article.title)}</p><p class="text-sm text-muted-foreground"${_scopeId7}>${ssrInterpolate(article.slug)}</p></div>`);
                                                  } else {
                                                    return [
                                                      createVNode("div", null, [
                                                        createVNode("p", { class: "font-medium" }, toDisplayString(article.title), 1),
                                                        createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(article.slug), 1)
                                                      ])
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                              _push7(ssrRenderComponent(unref(_sfc_main$h), null, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    if (article.is_published) {
                                                      _push8(ssrRenderComponent(unref(_sfc_main$i), { variant: "default" }, {
                                                        default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                          if (_push9) {
                                                            _push9(` Terbit `);
                                                          } else {
                                                            return [
                                                              createTextVNode(" Terbit ")
                                                            ];
                                                          }
                                                        }),
                                                        _: 2
                                                      }, _parent8, _scopeId7));
                                                    } else {
                                                      _push8(ssrRenderComponent(unref(_sfc_main$i), { variant: "secondary" }, {
                                                        default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                          if (_push9) {
                                                            _push9(` Draft `);
                                                          } else {
                                                            return [
                                                              createTextVNode(" Draft ")
                                                            ];
                                                          }
                                                        }),
                                                        _: 2
                                                      }, _parent8, _scopeId7));
                                                    }
                                                  } else {
                                                    return [
                                                      article.is_published ? (openBlock(), createBlock(unref(_sfc_main$i), {
                                                        key: 0,
                                                        variant: "default"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(" Terbit ")
                                                        ]),
                                                        _: 1
                                                      })) : (openBlock(), createBlock(unref(_sfc_main$i), {
                                                        key: 1,
                                                        variant: "secondary"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(" Draft ")
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
                                                    _push8(`${ssrInterpolate(formatDate(article.published_at))}`);
                                                  } else {
                                                    return [
                                                      createTextVNode(toDisplayString(formatDate(article.published_at)), 1)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                              _push7(ssrRenderComponent(unref(_sfc_main$h), null, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`${ssrInterpolate(formatDate(article.created_at))}`);
                                                  } else {
                                                    return [
                                                      createTextVNode(toDisplayString(formatDate(article.created_at)), 1)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                              _push7(ssrRenderComponent(unref(_sfc_main$h), { class: "text-right" }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`<div class="flex justify-end gap-2"${_scopeId7}>`);
                                                    _push8(ssrRenderComponent(unref(_sfc_main$2), {
                                                      "as-child": "",
                                                      variant: "ghost",
                                                      size: "icon"
                                                    }, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(`<a${ssrRenderAttr("href", `/admin/articles/${article.id}/edit`)}${_scopeId8}>`);
                                                          _push9(ssrRenderComponent(unref(Pencil), { class: "h-4 w-4" }, null, _parent9, _scopeId8));
                                                          _push9(`</a>`);
                                                        } else {
                                                          return [
                                                            createVNode("a", {
                                                              href: `/admin/articles/${article.id}/edit`
                                                            }, [
                                                              createVNode(unref(Pencil), { class: "h-4 w-4" })
                                                            ], 8, ["href"])
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                    _push8(ssrRenderComponent(unref(_sfc_main$2), {
                                                      variant: "ghost",
                                                      size: "icon",
                                                      onClick: ($event) => deleteArticle(article.id)
                                                    }, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(ssrRenderComponent(unref(Trash2), { class: "h-4 w-4 text-destructive" }, null, _parent9, _scopeId8));
                                                        } else {
                                                          return [
                                                            createVNode(unref(Trash2), { class: "h-4 w-4 text-destructive" })
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                    _push8(`</div>`);
                                                  } else {
                                                    return [
                                                      createVNode("div", { class: "flex justify-end gap-2" }, [
                                                        createVNode(unref(_sfc_main$2), {
                                                          "as-child": "",
                                                          variant: "ghost",
                                                          size: "icon"
                                                        }, {
                                                          default: withCtx(() => [
                                                            createVNode("a", {
                                                              href: `/admin/articles/${article.id}/edit`
                                                            }, [
                                                              createVNode(unref(Pencil), { class: "h-4 w-4" })
                                                            ], 8, ["href"])
                                                          ]),
                                                          _: 2
                                                        }, 1024),
                                                        createVNode(unref(_sfc_main$2), {
                                                          variant: "ghost",
                                                          size: "icon",
                                                          onClick: ($event) => deleteArticle(article.id)
                                                        }, {
                                                          default: withCtx(() => [
                                                            createVNode(unref(Trash2), { class: "h-4 w-4 text-destructive" })
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
                                                    createVNode("div", null, [
                                                      createVNode("p", { class: "font-medium" }, toDisplayString(article.title), 1),
                                                      createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(article.slug), 1)
                                                    ])
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(unref(_sfc_main$h), null, {
                                                  default: withCtx(() => [
                                                    article.is_published ? (openBlock(), createBlock(unref(_sfc_main$i), {
                                                      key: 0,
                                                      variant: "default"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(" Terbit ")
                                                      ]),
                                                      _: 1
                                                    })) : (openBlock(), createBlock(unref(_sfc_main$i), {
                                                      key: 1,
                                                      variant: "secondary"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(" Draft ")
                                                      ]),
                                                      _: 1
                                                    }))
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(unref(_sfc_main$h), null, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(formatDate(article.published_at)), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(unref(_sfc_main$h), null, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(formatDate(article.created_at)), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                                  default: withCtx(() => [
                                                    createVNode("div", { class: "flex justify-end gap-2" }, [
                                                      createVNode(unref(_sfc_main$2), {
                                                        "as-child": "",
                                                        variant: "ghost",
                                                        size: "icon"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode("a", {
                                                            href: `/admin/articles/${article.id}/edit`
                                                          }, [
                                                            createVNode(unref(Pencil), { class: "h-4 w-4" })
                                                          ], 8, ["href"])
                                                        ]),
                                                        _: 2
                                                      }, 1024),
                                                      createVNode(unref(_sfc_main$2), {
                                                        variant: "ghost",
                                                        size: "icon",
                                                        onClick: ($event) => deleteArticle(article.id)
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode(unref(Trash2), { class: "h-4 w-4 text-destructive" })
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
                                    } else {
                                      return [
                                        (openBlock(true), createBlock(Fragment, null, renderList(__props.articles.data, (article) => {
                                          return openBlock(), createBlock(unref(_sfc_main$e), {
                                            key: article.id
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$h), null, {
                                                default: withCtx(() => [
                                                  createVNode("div", null, [
                                                    createVNode("p", { class: "font-medium" }, toDisplayString(article.title), 1),
                                                    createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(article.slug), 1)
                                                  ])
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$h), null, {
                                                default: withCtx(() => [
                                                  article.is_published ? (openBlock(), createBlock(unref(_sfc_main$i), {
                                                    key: 0,
                                                    variant: "default"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(" Terbit ")
                                                    ]),
                                                    _: 1
                                                  })) : (openBlock(), createBlock(unref(_sfc_main$i), {
                                                    key: 1,
                                                    variant: "secondary"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(" Draft ")
                                                    ]),
                                                    _: 1
                                                  }))
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$h), null, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(formatDate(article.published_at)), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$h), null, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(formatDate(article.created_at)), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                                default: withCtx(() => [
                                                  createVNode("div", { class: "flex justify-end gap-2" }, [
                                                    createVNode(unref(_sfc_main$2), {
                                                      "as-child": "",
                                                      variant: "ghost",
                                                      size: "icon"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode("a", {
                                                          href: `/admin/articles/${article.id}/edit`
                                                        }, [
                                                          createVNode(unref(Pencil), { class: "h-4 w-4" })
                                                        ], 8, ["href"])
                                                      ]),
                                                      _: 2
                                                    }, 1024),
                                                    createVNode(unref(_sfc_main$2), {
                                                      variant: "ghost",
                                                      size: "icon",
                                                      onClick: ($event) => deleteArticle(article.id)
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(unref(Trash2), { class: "h-4 w-4 text-destructive" })
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
                                              createTextVNode("Judul")
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
                                              createTextVNode("Tanggal Terbit")
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
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.articles.data, (article) => {
                                        return openBlock(), createBlock(unref(_sfc_main$e), {
                                          key: article.id
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$h), null, {
                                              default: withCtx(() => [
                                                createVNode("div", null, [
                                                  createVNode("p", { class: "font-medium" }, toDisplayString(article.title), 1),
                                                  createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(article.slug), 1)
                                                ])
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$h), null, {
                                              default: withCtx(() => [
                                                article.is_published ? (openBlock(), createBlock(unref(_sfc_main$i), {
                                                  key: 0,
                                                  variant: "default"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(" Terbit ")
                                                  ]),
                                                  _: 1
                                                })) : (openBlock(), createBlock(unref(_sfc_main$i), {
                                                  key: 1,
                                                  variant: "secondary"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(" Draft ")
                                                  ]),
                                                  _: 1
                                                }))
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$h), null, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(formatDate(article.published_at)), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$h), null, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(formatDate(article.created_at)), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "flex justify-end gap-2" }, [
                                                  createVNode(unref(_sfc_main$2), {
                                                    "as-child": "",
                                                    variant: "ghost",
                                                    size: "icon"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode("a", {
                                                        href: `/admin/articles/${article.id}/edit`
                                                      }, [
                                                        createVNode(unref(Pencil), { class: "h-4 w-4" })
                                                      ], 8, ["href"])
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(unref(_sfc_main$2), {
                                                    variant: "ghost",
                                                    size: "icon",
                                                    onClick: ($event) => deleteArticle(article.id)
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(Trash2), { class: "h-4 w-4 text-destructive" })
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
                          _push4(`<div class="py-12 text-center"${_scopeId3}><p class="text-muted-foreground"${_scopeId3}>Tidak ada artikel ditemukan</p></div>`);
                        }
                        if (__props.articles.last_page > 1) {
                          _push4(`<div class="mt-6 flex items-center justify-between"${_scopeId3}><p class="text-sm text-muted-foreground"${_scopeId3}> Menampilkan ${ssrInterpolate(__props.articles.from)} - ${ssrInterpolate(__props.articles.to)} dari ${ssrInterpolate(__props.articles.total)} artikel </p><div class="flex gap-2"${_scopeId3}>`);
                          _push4(ssrRenderComponent(unref(_sfc_main$2), {
                            variant: "outline",
                            size: "sm",
                            disabled: __props.articles.current_page === 1,
                            onClick: ($event) => goToPage(__props.articles.current_page - 1)
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` Sebelumnya `);
                              } else {
                                return [
                                  createTextVNode(" Sebelumnya ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$2), {
                            variant: "outline",
                            size: "sm",
                            disabled: __props.articles.current_page === __props.articles.last_page,
                            onClick: ($event) => goToPage(__props.articles.current_page + 1)
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` Selanjutnya `);
                              } else {
                                return [
                                  createTextVNode(" Selanjutnya ")
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
                          __props.articles.data.length > 0 ? (openBlock(), createBlock(unref(_sfc_main$c), { key: 0 }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$d), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$e), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$f), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Judul")
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
                                          createTextVNode("Tanggal Terbit")
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
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.articles.data, (article) => {
                                    return openBlock(), createBlock(unref(_sfc_main$e), {
                                      key: article.id
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$h), null, {
                                          default: withCtx(() => [
                                            createVNode("div", null, [
                                              createVNode("p", { class: "font-medium" }, toDisplayString(article.title), 1),
                                              createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(article.slug), 1)
                                            ])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$h), null, {
                                          default: withCtx(() => [
                                            article.is_published ? (openBlock(), createBlock(unref(_sfc_main$i), {
                                              key: 0,
                                              variant: "default"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(" Terbit ")
                                              ]),
                                              _: 1
                                            })) : (openBlock(), createBlock(unref(_sfc_main$i), {
                                              key: 1,
                                              variant: "secondary"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(" Draft ")
                                              ]),
                                              _: 1
                                            }))
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$h), null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(formatDate(article.published_at)), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$h), null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(formatDate(article.created_at)), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "flex justify-end gap-2" }, [
                                              createVNode(unref(_sfc_main$2), {
                                                "as-child": "",
                                                variant: "ghost",
                                                size: "icon"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode("a", {
                                                    href: `/admin/articles/${article.id}/edit`
                                                  }, [
                                                    createVNode(unref(Pencil), { class: "h-4 w-4" })
                                                  ], 8, ["href"])
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$2), {
                                                variant: "ghost",
                                                size: "icon",
                                                onClick: ($event) => deleteArticle(article.id)
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(Trash2), { class: "h-4 w-4 text-destructive" })
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
                                  }), 128))
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "py-12 text-center"
                          }, [
                            createVNode("p", { class: "text-muted-foreground" }, "Tidak ada artikel ditemukan")
                          ])),
                          __props.articles.last_page > 1 ? (openBlock(), createBlock("div", {
                            key: 2,
                            class: "mt-6 flex items-center justify-between"
                          }, [
                            createVNode("p", { class: "text-sm text-muted-foreground" }, " Menampilkan " + toDisplayString(__props.articles.from) + " - " + toDisplayString(__props.articles.to) + " dari " + toDisplayString(__props.articles.total) + " artikel ", 1),
                            createVNode("div", { class: "flex gap-2" }, [
                              createVNode(unref(_sfc_main$2), {
                                variant: "outline",
                                size: "sm",
                                disabled: __props.articles.current_page === 1,
                                onClick: ($event) => goToPage(__props.articles.current_page - 1)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Sebelumnya ")
                                ]),
                                _: 1
                              }, 8, ["disabled", "onClick"]),
                              createVNode(unref(_sfc_main$2), {
                                variant: "outline",
                                size: "sm",
                                disabled: __props.articles.current_page === __props.articles.last_page,
                                onClick: ($event) => goToPage(__props.articles.current_page + 1)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Selanjutnya ")
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
                        createVNode("div", { class: "flex flex-col md:flex-row gap-4" }, [
                          createVNode("div", { class: "flex-1" }, [
                            createVNode("div", { class: "relative" }, [
                              createVNode(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
                              createVNode(unref(_sfc_main$5), {
                                modelValue: search.value,
                                "onUpdate:modelValue": ($event) => search.value = $event,
                                placeholder: "Cari artikel...",
                                class: "pl-10",
                                onKeyup: withKeys(applyFilters, ["enter"])
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ])
                          ]),
                          createVNode("div", { class: "flex gap-2" }, [
                            createVNode(unref(_sfc_main$6), {
                              modelValue: status.value,
                              "onUpdate:modelValue": [($event) => status.value = $event, applyFilters]
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$7), { class: "w-[140px]" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$8), { placeholder: "Status" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$9), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$a), { value: "all" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Semua")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$a), { value: "published" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Terbit")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$a), { value: "draft" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Draft")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(unref(_sfc_main$6), {
                              modelValue: perPage.value,
                              "onUpdate:modelValue": [($event) => perPage.value = $event, applyFilters]
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$7), { class: "w-[100px]" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$8), { placeholder: "Per halaman" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$9), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$a), { value: "10" }, {
                                      default: withCtx(() => [
                                        createTextVNode("10")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$a), { value: "25" }, {
                                      default: withCtx(() => [
                                        createTextVNode("25")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$a), { value: "50" }, {
                                      default: withCtx(() => [
                                        createTextVNode("50")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$a), { value: "100" }, {
                                      default: withCtx(() => [
                                        createTextVNode("100")
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
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$b), null, {
                      default: withCtx(() => [
                        __props.articles.data.length > 0 ? (openBlock(), createBlock(unref(_sfc_main$c), { key: 0 }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$d), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$f), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Judul")
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
                                        createTextVNode("Tanggal Terbit")
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
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.articles.data, (article) => {
                                  return openBlock(), createBlock(unref(_sfc_main$e), {
                                    key: article.id
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$h), null, {
                                        default: withCtx(() => [
                                          createVNode("div", null, [
                                            createVNode("p", { class: "font-medium" }, toDisplayString(article.title), 1),
                                            createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(article.slug), 1)
                                          ])
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$h), null, {
                                        default: withCtx(() => [
                                          article.is_published ? (openBlock(), createBlock(unref(_sfc_main$i), {
                                            key: 0,
                                            variant: "default"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(" Terbit ")
                                            ]),
                                            _: 1
                                          })) : (openBlock(), createBlock(unref(_sfc_main$i), {
                                            key: 1,
                                            variant: "secondary"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(" Draft ")
                                            ]),
                                            _: 1
                                          }))
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$h), null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(formatDate(article.published_at)), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$h), null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(formatDate(article.created_at)), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "flex justify-end gap-2" }, [
                                            createVNode(unref(_sfc_main$2), {
                                              "as-child": "",
                                              variant: "ghost",
                                              size: "icon"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode("a", {
                                                  href: `/admin/articles/${article.id}/edit`
                                                }, [
                                                  createVNode(unref(Pencil), { class: "h-4 w-4" })
                                                ], 8, ["href"])
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$2), {
                                              variant: "ghost",
                                              size: "icon",
                                              onClick: ($event) => deleteArticle(article.id)
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(Trash2), { class: "h-4 w-4 text-destructive" })
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
                                }), 128))
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "py-12 text-center"
                        }, [
                          createVNode("p", { class: "text-muted-foreground" }, "Tidak ada artikel ditemukan")
                        ])),
                        __props.articles.last_page > 1 ? (openBlock(), createBlock("div", {
                          key: 2,
                          class: "mt-6 flex items-center justify-between"
                        }, [
                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Menampilkan " + toDisplayString(__props.articles.from) + " - " + toDisplayString(__props.articles.to) + " dari " + toDisplayString(__props.articles.total) + " artikel ", 1),
                          createVNode("div", { class: "flex gap-2" }, [
                            createVNode(unref(_sfc_main$2), {
                              variant: "outline",
                              size: "sm",
                              disabled: __props.articles.current_page === 1,
                              onClick: ($event) => goToPage(__props.articles.current_page - 1)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Sebelumnya ")
                              ]),
                              _: 1
                            }, 8, ["disabled", "onClick"]),
                            createVNode(unref(_sfc_main$2), {
                              variant: "outline",
                              size: "sm",
                              disabled: __props.articles.current_page === __props.articles.last_page,
                              onClick: ($event) => goToPage(__props.articles.current_page + 1)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Selanjutnya ")
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
            _push2(ssrRenderComponent(unref(_sfc_main$j), {
              open: articleToDelete.value !== null,
              "onUpdate:open": ($event) => articleToDelete.value = null
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
                                    _push6(`Hapus Artikel?`);
                                  } else {
                                    return [
                                      createTextVNode("Hapus Artikel?")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$n), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Artikel akan dipindahkan ke sampah dan dapat dipulihkan nanti. Apakah Anda yakin ingin melanjutkan? `);
                                  } else {
                                    return [
                                      createTextVNode(" Artikel akan dipindahkan ke sampah dan dapat dipulihkan nanti. Apakah Anda yakin ingin melanjutkan? ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$m), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Hapus Artikel?")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$n), null, {
                                  default: withCtx(() => [
                                    createTextVNode(" Artikel akan dipindahkan ke sampah dan dapat dipulihkan nanti. Apakah Anda yakin ingin melanjutkan? ")
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
                              _push5(ssrRenderComponent(unref(_sfc_main$q), {
                                disabled: isDeleting.value,
                                onClick: confirmDelete
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`${ssrInterpolate(isDeleting.value ? "Menghapus..." : "Hapus")}`);
                                  } else {
                                    return [
                                      createTextVNode(toDisplayString(isDeleting.value ? "Menghapus..." : "Hapus"), 1)
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
                                createVNode(unref(_sfc_main$q), {
                                  disabled: isDeleting.value,
                                  onClick: confirmDelete
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(isDeleting.value ? "Menghapus..." : "Hapus"), 1)
                                  ]),
                                  _: 1
                                }, 8, ["disabled"])
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
                                  createTextVNode("Hapus Artikel?")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$n), null, {
                                default: withCtx(() => [
                                  createTextVNode(" Artikel akan dipindahkan ke sampah dan dapat dipulihkan nanti. Apakah Anda yakin ingin melanjutkan? ")
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
                              createVNode(unref(_sfc_main$q), {
                                disabled: isDeleting.value,
                                onClick: confirmDelete
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(isDeleting.value ? "Menghapus..." : "Hapus"), 1)
                                ]),
                                _: 1
                              }, 8, ["disabled"])
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
                                createTextVNode("Hapus Artikel?")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$n), null, {
                              default: withCtx(() => [
                                createTextVNode(" Artikel akan dipindahkan ke sampah dan dapat dipulihkan nanti. Apakah Anda yakin ingin melanjutkan? ")
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
                            createVNode(unref(_sfc_main$q), {
                              disabled: isDeleting.value,
                              onClick: confirmDelete
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(isDeleting.value ? "Menghapus..." : "Hapus"), 1)
                              ]),
                              _: 1
                            }, 8, ["disabled"])
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
              createVNode("div", { class: "container mx-auto py-6 space-y-6" }, [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("div", null, [
                    createVNode("h1", { class: "text-3xl font-bold tracking-tight" }, "Artikel"),
                    createVNode("p", { class: "text-muted-foreground" }, " Kelola semua artikel dan konten blog ")
                  ]),
                  createVNode(unref(_sfc_main$2), { "as-child": "" }, {
                    default: withCtx(() => [
                      createVNode("a", { href: "/admin/articles/create" }, [
                        createVNode(unref(Plus), { class: "mr-2 h-4 w-4" }),
                        createTextVNode(" Tambah Artikel ")
                      ])
                    ]),
                    _: 1
                  })
                ]),
                createVNode(unref(_sfc_main$3), null, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex flex-col md:flex-row gap-4" }, [
                          createVNode("div", { class: "flex-1" }, [
                            createVNode("div", { class: "relative" }, [
                              createVNode(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
                              createVNode(unref(_sfc_main$5), {
                                modelValue: search.value,
                                "onUpdate:modelValue": ($event) => search.value = $event,
                                placeholder: "Cari artikel...",
                                class: "pl-10",
                                onKeyup: withKeys(applyFilters, ["enter"])
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ])
                          ]),
                          createVNode("div", { class: "flex gap-2" }, [
                            createVNode(unref(_sfc_main$6), {
                              modelValue: status.value,
                              "onUpdate:modelValue": [($event) => status.value = $event, applyFilters]
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$7), { class: "w-[140px]" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$8), { placeholder: "Status" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$9), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$a), { value: "all" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Semua")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$a), { value: "published" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Terbit")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$a), { value: "draft" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Draft")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(unref(_sfc_main$6), {
                              modelValue: perPage.value,
                              "onUpdate:modelValue": [($event) => perPage.value = $event, applyFilters]
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$7), { class: "w-[100px]" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$8), { placeholder: "Per halaman" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$9), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$a), { value: "10" }, {
                                      default: withCtx(() => [
                                        createTextVNode("10")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$a), { value: "25" }, {
                                      default: withCtx(() => [
                                        createTextVNode("25")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$a), { value: "50" }, {
                                      default: withCtx(() => [
                                        createTextVNode("50")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$a), { value: "100" }, {
                                      default: withCtx(() => [
                                        createTextVNode("100")
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
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$b), null, {
                      default: withCtx(() => [
                        __props.articles.data.length > 0 ? (openBlock(), createBlock(unref(_sfc_main$c), { key: 0 }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$d), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$f), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Judul")
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
                                        createTextVNode("Tanggal Terbit")
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
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.articles.data, (article) => {
                                  return openBlock(), createBlock(unref(_sfc_main$e), {
                                    key: article.id
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$h), null, {
                                        default: withCtx(() => [
                                          createVNode("div", null, [
                                            createVNode("p", { class: "font-medium" }, toDisplayString(article.title), 1),
                                            createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(article.slug), 1)
                                          ])
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$h), null, {
                                        default: withCtx(() => [
                                          article.is_published ? (openBlock(), createBlock(unref(_sfc_main$i), {
                                            key: 0,
                                            variant: "default"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(" Terbit ")
                                            ]),
                                            _: 1
                                          })) : (openBlock(), createBlock(unref(_sfc_main$i), {
                                            key: 1,
                                            variant: "secondary"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(" Draft ")
                                            ]),
                                            _: 1
                                          }))
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$h), null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(formatDate(article.published_at)), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$h), null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(formatDate(article.created_at)), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "flex justify-end gap-2" }, [
                                            createVNode(unref(_sfc_main$2), {
                                              "as-child": "",
                                              variant: "ghost",
                                              size: "icon"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode("a", {
                                                  href: `/admin/articles/${article.id}/edit`
                                                }, [
                                                  createVNode(unref(Pencil), { class: "h-4 w-4" })
                                                ], 8, ["href"])
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$2), {
                                              variant: "ghost",
                                              size: "icon",
                                              onClick: ($event) => deleteArticle(article.id)
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(Trash2), { class: "h-4 w-4 text-destructive" })
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
                                }), 128))
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "py-12 text-center"
                        }, [
                          createVNode("p", { class: "text-muted-foreground" }, "Tidak ada artikel ditemukan")
                        ])),
                        __props.articles.last_page > 1 ? (openBlock(), createBlock("div", {
                          key: 2,
                          class: "mt-6 flex items-center justify-between"
                        }, [
                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Menampilkan " + toDisplayString(__props.articles.from) + " - " + toDisplayString(__props.articles.to) + " dari " + toDisplayString(__props.articles.total) + " artikel ", 1),
                          createVNode("div", { class: "flex gap-2" }, [
                            createVNode(unref(_sfc_main$2), {
                              variant: "outline",
                              size: "sm",
                              disabled: __props.articles.current_page === 1,
                              onClick: ($event) => goToPage(__props.articles.current_page - 1)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Sebelumnya ")
                              ]),
                              _: 1
                            }, 8, ["disabled", "onClick"]),
                            createVNode(unref(_sfc_main$2), {
                              variant: "outline",
                              size: "sm",
                              disabled: __props.articles.current_page === __props.articles.last_page,
                              onClick: ($event) => goToPage(__props.articles.current_page + 1)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Selanjutnya ")
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
              ]),
              createVNode(unref(_sfc_main$j), {
                open: articleToDelete.value !== null,
                "onUpdate:open": ($event) => articleToDelete.value = null
              }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$k), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$l), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$m), null, {
                            default: withCtx(() => [
                              createTextVNode("Hapus Artikel?")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$n), null, {
                            default: withCtx(() => [
                              createTextVNode(" Artikel akan dipindahkan ke sampah dan dapat dipulihkan nanti. Apakah Anda yakin ingin melanjutkan? ")
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
                          createVNode(unref(_sfc_main$q), {
                            disabled: isDeleting.value,
                            onClick: confirmDelete
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(isDeleting.value ? "Menghapus..." : "Hapus"), 1)
                            ]),
                            _: 1
                          }, 8, ["disabled"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Articles/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
