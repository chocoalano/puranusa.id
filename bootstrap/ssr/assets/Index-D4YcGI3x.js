import { defineComponent, ref, computed, unref, withCtx, createVNode, createTextVNode, withKeys, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { Head, Link, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-D11fLPDM.js";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5, d as _sfc_main$6, c as _sfc_main$7 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$2 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$8 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$k } from "./index-BpQimeTM.js";
import { _ as _sfc_main$e, a as _sfc_main$f, b as _sfc_main$g, c as _sfc_main$h, d as _sfc_main$i, e as _sfc_main$j } from "./TableHeader-emcE6QAC.js";
import { _ as _sfc_main$9, a as _sfc_main$a, b as _sfc_main$b, c as _sfc_main$c, d as _sfc_main$d } from "./SelectValue-BUnv4mQg.js";
import { _ as _sfc_main$m, b as _sfc_main$n, c as _sfc_main$o, d as _sfc_main$p, e as _sfc_main$q, f as _sfc_main$r, g as _sfc_main$s, h as _sfc_main$t } from "./AlertDialogTrigger-DIWb7xue.js";
import { _ as _sfc_main$l } from "./Pagination-DAUeA01Y.js";
import { Plus, Search, Eye, Pencil, Trash2 } from "lucide-vue-next";
import { u as usePermissions } from "./usePermissions-DYRibCI0.js";
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
    const { isSuperAdmin, isAdmin } = usePermissions();
    const search = ref(props.filters.search || "");
    const parentId = ref(props.filters.parent_id ? String(props.filters.parent_id) : "");
    const sortBy = ref(props.filters.sort_by || "name");
    const sortOrder = ref(props.filters.sort_order || "asc");
    const applyFilters = () => {
      router.get("/admin/zenner-club/categories", {
        search: search.value || void 0,
        parent_id: parentId.value ? Number(parentId.value) : void 0,
        sort_by: sortBy.value,
        sort_order: sortOrder.value
      }, {
        preserveScroll: true,
        preserveState: true
      });
    };
    const clearFilters = () => {
      search.value = "";
      parentId.value = "";
      sortBy.value = "name";
      sortOrder.value = "asc";
      applyFilters();
    };
    const categoryToDelete = ref(null);
    const isDeleting = ref(false);
    const deleteCategory = (id) => {
      categoryToDelete.value = id;
    };
    const confirmDelete = () => {
      if (!categoryToDelete.value) return;
      isDeleting.value = true;
      router.delete(`/admin/zenner-club/categories/${categoryToDelete.value}`, {
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Kategori berhasil dihapus");
          categoryToDelete.value = null;
        },
        onError: () => {
          toast.error("Gagal menghapus kategori");
        },
        onFinish: () => {
          isDeleting.value = false;
        }
      });
    };
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
    };
    const paginationFilters = computed(() => ({
      search: search.value || void 0,
      parent_id: parentId.value ? Number(parentId.value) : void 0,
      sort_by: sortBy.value,
      sort_order: sortOrder.value
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Kategori Zenner Club" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="container mx-auto py-6 space-y-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="text-3xl font-bold tracking-tight"${_scopeId}>Kategori Zenner Club</h1><p class="text-muted-foreground"${_scopeId}>Kelola kategori konten Zenner Club</p></div>`);
            if (unref(isSuperAdmin) || unref(isAdmin)) {
              _push2(ssrRenderComponent(unref(Link), { href: "/admin/zenner-club/categories/create" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$2), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Plus), { class: "mr-2 h-4 w-4" }, null, _parent4, _scopeId3));
                          _push4(` Tambah Kategori `);
                        } else {
                          return [
                            createVNode(unref(Plus), { class: "mr-2 h-4 w-4" }),
                            createTextVNode(" Tambah Kategori ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$2), null, {
                        default: withCtx(() => [
                          createVNode(unref(Plus), { class: "mr-2 h-4 w-4" }),
                          createTextVNode(" Tambah Kategori ")
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
                        _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Filter &amp; Pencarian`);
                            } else {
                              return [
                                createTextVNode("Filter & Pencarian")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Cari dan filter kategori`);
                            } else {
                              return [
                                createTextVNode("Cari dan filter kategori")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Filter & Pencarian")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("Cari dan filter kategori")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex flex-col gap-4 lg:flex-row"${_scopeId3}><div class="flex-1 relative"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$8), {
                          modelValue: search.value,
                          "onUpdate:modelValue": ($event) => search.value = $event,
                          placeholder: "Cari nama atau slug...",
                          class: "pl-10",
                          onKeyup: applyFilters
                        }, null, _parent4, _scopeId3));
                        _push4(`</div><div class="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-3"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), {
                          modelValue: parentId.value,
                          "onUpdate:modelValue": ($event) => parentId.value = $event,
                          type: "number",
                          placeholder: "Parent ID"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          modelValue: sortBy.value,
                          "onUpdate:modelValue": [($event) => sortBy.value = $event, applyFilters]
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$a), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$b), { placeholder: "Urutkan" }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$b), { placeholder: "Urutkan" })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$d), { value: "name" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Nama`);
                                        } else {
                                          return [
                                            createTextVNode("Nama")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$d), { value: "created_at" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Tanggal`);
                                        } else {
                                          return [
                                            createTextVNode("Tanggal")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$d), { value: "name" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Nama")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$d), { value: "created_at" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Tanggal")
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
                                createVNode(unref(_sfc_main$a), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$b), { placeholder: "Urutkan" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$d), { value: "name" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Nama")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$d), { value: "created_at" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Tanggal")
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
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          modelValue: sortOrder.value,
                          "onUpdate:modelValue": [($event) => sortOrder.value = $event, applyFilters]
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$a), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$b), { placeholder: "Arah" }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$b), { placeholder: "Arah" })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$d), { value: "asc" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`A-Z`);
                                        } else {
                                          return [
                                            createTextVNode("A-Z")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$d), { value: "desc" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Z-A`);
                                        } else {
                                          return [
                                            createTextVNode("Z-A")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$d), { value: "asc" }, {
                                        default: withCtx(() => [
                                          createTextVNode("A-Z")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$d), { value: "desc" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Z-A")
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
                                createVNode(unref(_sfc_main$a), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$b), { placeholder: "Arah" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$d), { value: "asc" }, {
                                      default: withCtx(() => [
                                        createTextVNode("A-Z")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$d), { value: "desc" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Z-A")
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
                        _push4(`</div><div class="flex gap-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$2), { onClick: applyFilters }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Cari`);
                            } else {
                              return [
                                createTextVNode("Cari")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$2), {
                          variant: "outline",
                          onClick: clearFilters
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Reset`);
                            } else {
                              return [
                                createTextVNode("Reset")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex flex-col gap-4 lg:flex-row" }, [
                            createVNode("div", { class: "flex-1 relative" }, [
                              createVNode(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
                              createVNode(unref(_sfc_main$8), {
                                modelValue: search.value,
                                "onUpdate:modelValue": ($event) => search.value = $event,
                                placeholder: "Cari nama atau slug...",
                                class: "pl-10",
                                onKeyup: withKeys(applyFilters, ["enter"])
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-3" }, [
                              createVNode(unref(_sfc_main$8), {
                                modelValue: parentId.value,
                                "onUpdate:modelValue": ($event) => parentId.value = $event,
                                type: "number",
                                placeholder: "Parent ID"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(unref(_sfc_main$9), {
                                modelValue: sortBy.value,
                                "onUpdate:modelValue": [($event) => sortBy.value = $event, applyFilters]
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$a), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$b), { placeholder: "Urutkan" })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$c), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$d), { value: "name" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Nama")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$d), { value: "created_at" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Tanggal")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(unref(_sfc_main$9), {
                                modelValue: sortOrder.value,
                                "onUpdate:modelValue": [($event) => sortOrder.value = $event, applyFilters]
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$a), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$b), { placeholder: "Arah" })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$c), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$d), { value: "asc" }, {
                                        default: withCtx(() => [
                                          createTextVNode("A-Z")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$d), { value: "desc" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Z-A")
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
                            createVNode("div", { class: "flex gap-2" }, [
                              createVNode(unref(_sfc_main$2), { onClick: applyFilters }, {
                                default: withCtx(() => [
                                  createTextVNode("Cari")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$2), {
                                variant: "outline",
                                onClick: clearFilters
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Reset")
                                ]),
                                _: 1
                              })
                            ])
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
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Filter & Pencarian")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode("Cari dan filter kategori")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex flex-col gap-4 lg:flex-row" }, [
                          createVNode("div", { class: "flex-1 relative" }, [
                            createVNode(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
                            createVNode(unref(_sfc_main$8), {
                              modelValue: search.value,
                              "onUpdate:modelValue": ($event) => search.value = $event,
                              placeholder: "Cari nama atau slug...",
                              class: "pl-10",
                              onKeyup: withKeys(applyFilters, ["enter"])
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-3" }, [
                            createVNode(unref(_sfc_main$8), {
                              modelValue: parentId.value,
                              "onUpdate:modelValue": ($event) => parentId.value = $event,
                              type: "number",
                              placeholder: "Parent ID"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(unref(_sfc_main$9), {
                              modelValue: sortBy.value,
                              "onUpdate:modelValue": [($event) => sortBy.value = $event, applyFilters]
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$a), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$b), { placeholder: "Urutkan" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$d), { value: "name" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Nama")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$d), { value: "created_at" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Tanggal")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(unref(_sfc_main$9), {
                              modelValue: sortOrder.value,
                              "onUpdate:modelValue": [($event) => sortOrder.value = $event, applyFilters]
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$a), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$b), { placeholder: "Arah" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$d), { value: "asc" }, {
                                      default: withCtx(() => [
                                        createTextVNode("A-Z")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$d), { value: "desc" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Z-A")
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
                          createVNode("div", { class: "flex gap-2" }, [
                            createVNode(unref(_sfc_main$2), { onClick: applyFilters }, {
                              default: withCtx(() => [
                                createTextVNode("Cari")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$2), {
                              variant: "outline",
                              onClick: clearFilters
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Reset")
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$3), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { class: "p-0" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
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
                                                _push8(`Nama`);
                                              } else {
                                                return [
                                                  createTextVNode("Nama")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(unref(_sfc_main$h), null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Parent`);
                                              } else {
                                                return [
                                                  createTextVNode("Parent")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(unref(_sfc_main$h), null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Konten`);
                                              } else {
                                                return [
                                                  createTextVNode("Konten")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(unref(_sfc_main$h), null, {
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
                                          _push7(ssrRenderComponent(unref(_sfc_main$h), { class: "text-right" }, {
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
                                            createVNode(unref(_sfc_main$h), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Nama")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$h), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Parent")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$h), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Konten")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$h), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Dibuat")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$h), { class: "text-right" }, {
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
                                      createVNode(unref(_sfc_main$g), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$h), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Nama")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$h), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Parent")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$h), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Konten")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$h), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Dibuat")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$h), { class: "text-right" }, {
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
                              _push5(ssrRenderComponent(unref(_sfc_main$i), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    if (__props.items.data.length === 0) {
                                      _push6(ssrRenderComponent(unref(_sfc_main$g), null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(unref(_sfc_main$j), {
                                              colspan: "5",
                                              class: "text-center text-muted-foreground py-8"
                                            }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(` Belum ada kategori. `);
                                                } else {
                                                  return [
                                                    createTextVNode(" Belum ada kategori. ")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(unref(_sfc_main$j), {
                                                colspan: "5",
                                                class: "text-center text-muted-foreground py-8"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" Belum ada kategori. ")
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
                                    ssrRenderList(__props.items.data, (item) => {
                                      _push6(ssrRenderComponent(unref(_sfc_main$g), {
                                        key: item.id
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(unref(_sfc_main$j), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`<div${_scopeId7}><p class="font-medium"${_scopeId7}>${ssrInterpolate(item.name)}</p><p class="text-sm text-muted-foreground"${_scopeId7}>${ssrInterpolate(item.slug)}</p></div>`);
                                                } else {
                                                  return [
                                                    createVNode("div", null, [
                                                      createVNode("p", { class: "font-medium" }, toDisplayString(item.name), 1),
                                                      createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(item.slug), 1)
                                                    ])
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$j), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(item.parent?.name || "-")}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(item.parent?.name || "-"), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$j), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(unref(_sfc_main$k), { variant: "outline" }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`${ssrInterpolate(item.contents_count || 0)} konten`);
                                                      } else {
                                                        return [
                                                          createTextVNode(toDisplayString(item.contents_count || 0) + " konten", 1)
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                } else {
                                                  return [
                                                    createVNode(unref(_sfc_main$k), { variant: "outline" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(item.contents_count || 0) + " konten", 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$j), { class: "text-sm text-muted-foreground" }, {
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
                                            _push7(ssrRenderComponent(unref(_sfc_main$j), { class: "text-right" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`<div class="flex items-center justify-end gap-2"${_scopeId7}>`);
                                                  _push8(ssrRenderComponent(unref(Link), {
                                                    href: `/admin/zenner-club/categories/${item.id}`
                                                  }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(ssrRenderComponent(unref(_sfc_main$2), {
                                                          variant: "ghost",
                                                          size: "icon"
                                                        }, {
                                                          default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                            if (_push10) {
                                                              _push10(ssrRenderComponent(unref(Eye), { class: "h-4 w-4" }, null, _parent10, _scopeId9));
                                                            } else {
                                                              return [
                                                                createVNode(unref(Eye), { class: "h-4 w-4" })
                                                              ];
                                                            }
                                                          }),
                                                          _: 2
                                                        }, _parent9, _scopeId8));
                                                      } else {
                                                        return [
                                                          createVNode(unref(_sfc_main$2), {
                                                            variant: "ghost",
                                                            size: "icon"
                                                          }, {
                                                            default: withCtx(() => [
                                                              createVNode(unref(Eye), { class: "h-4 w-4" })
                                                            ]),
                                                            _: 1
                                                          })
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                  if (unref(isSuperAdmin) || unref(isAdmin)) {
                                                    _push8(ssrRenderComponent(unref(Link), {
                                                      href: `/admin/zenner-club/categories/${item.id}/edit`
                                                    }, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(ssrRenderComponent(unref(_sfc_main$2), {
                                                            variant: "ghost",
                                                            size: "icon"
                                                          }, {
                                                            default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                              if (_push10) {
                                                                _push10(ssrRenderComponent(unref(Pencil), { class: "h-4 w-4" }, null, _parent10, _scopeId9));
                                                              } else {
                                                                return [
                                                                  createVNode(unref(Pencil), { class: "h-4 w-4" })
                                                                ];
                                                              }
                                                            }),
                                                            _: 2
                                                          }, _parent9, _scopeId8));
                                                        } else {
                                                          return [
                                                            createVNode(unref(_sfc_main$2), {
                                                              variant: "ghost",
                                                              size: "icon"
                                                            }, {
                                                              default: withCtx(() => [
                                                                createVNode(unref(Pencil), { class: "h-4 w-4" })
                                                              ]),
                                                              _: 1
                                                            })
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                  } else {
                                                    _push8(`<!---->`);
                                                  }
                                                  if (unref(isSuperAdmin) || unref(isAdmin)) {
                                                    _push8(ssrRenderComponent(unref(_sfc_main$2), {
                                                      variant: "ghost",
                                                      size: "icon",
                                                      onClick: ($event) => deleteCategory(item.id)
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
                                                  } else {
                                                    _push8(`<!---->`);
                                                  }
                                                  _push8(`</div>`);
                                                } else {
                                                  return [
                                                    createVNode("div", { class: "flex items-center justify-end gap-2" }, [
                                                      createVNode(unref(Link), {
                                                        href: `/admin/zenner-club/categories/${item.id}`
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode(unref(_sfc_main$2), {
                                                            variant: "ghost",
                                                            size: "icon"
                                                          }, {
                                                            default: withCtx(() => [
                                                              createVNode(unref(Eye), { class: "h-4 w-4" })
                                                            ]),
                                                            _: 1
                                                          })
                                                        ]),
                                                        _: 1
                                                      }, 8, ["href"]),
                                                      unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(Link), {
                                                        key: 0,
                                                        href: `/admin/zenner-club/categories/${item.id}/edit`
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode(unref(_sfc_main$2), {
                                                            variant: "ghost",
                                                            size: "icon"
                                                          }, {
                                                            default: withCtx(() => [
                                                              createVNode(unref(Pencil), { class: "h-4 w-4" })
                                                            ]),
                                                            _: 1
                                                          })
                                                        ]),
                                                        _: 1
                                                      }, 8, ["href"])) : createCommentVNode("", true),
                                                      unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(_sfc_main$2), {
                                                        key: 1,
                                                        variant: "ghost",
                                                        size: "icon",
                                                        onClick: ($event) => deleteCategory(item.id)
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode(unref(Trash2), { class: "h-4 w-4 text-destructive" })
                                                        ]),
                                                        _: 1
                                                      }, 8, ["onClick"])) : createCommentVNode("", true)
                                                    ])
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(unref(_sfc_main$j), null, {
                                                default: withCtx(() => [
                                                  createVNode("div", null, [
                                                    createVNode("p", { class: "font-medium" }, toDisplayString(item.name), 1),
                                                    createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(item.slug), 1)
                                                  ])
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$j), null, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(item.parent?.name || "-"), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$j), null, {
                                                default: withCtx(() => [
                                                  createVNode(unref(_sfc_main$k), { variant: "outline" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(item.contents_count || 0) + " konten", 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$j), { class: "text-sm text-muted-foreground" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(formatDate(item.created_at)), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                                default: withCtx(() => [
                                                  createVNode("div", { class: "flex items-center justify-end gap-2" }, [
                                                    createVNode(unref(Link), {
                                                      href: `/admin/zenner-club/categories/${item.id}`
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(unref(_sfc_main$2), {
                                                          variant: "ghost",
                                                          size: "icon"
                                                        }, {
                                                          default: withCtx(() => [
                                                            createVNode(unref(Eye), { class: "h-4 w-4" })
                                                          ]),
                                                          _: 1
                                                        })
                                                      ]),
                                                      _: 1
                                                    }, 8, ["href"]),
                                                    unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(Link), {
                                                      key: 0,
                                                      href: `/admin/zenner-club/categories/${item.id}/edit`
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(unref(_sfc_main$2), {
                                                          variant: "ghost",
                                                          size: "icon"
                                                        }, {
                                                          default: withCtx(() => [
                                                            createVNode(unref(Pencil), { class: "h-4 w-4" })
                                                          ]),
                                                          _: 1
                                                        })
                                                      ]),
                                                      _: 1
                                                    }, 8, ["href"])) : createCommentVNode("", true),
                                                    unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(_sfc_main$2), {
                                                      key: 1,
                                                      variant: "ghost",
                                                      size: "icon",
                                                      onClick: ($event) => deleteCategory(item.id)
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(unref(Trash2), { class: "h-4 w-4 text-destructive" })
                                                      ]),
                                                      _: 1
                                                    }, 8, ["onClick"])) : createCommentVNode("", true)
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
                                      __props.items.data.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$g), { key: 0 }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$j), {
                                            colspan: "5",
                                            class: "text-center text-muted-foreground py-8"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(" Belum ada kategori. ")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })) : createCommentVNode("", true),
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.items.data, (item) => {
                                        return openBlock(), createBlock(unref(_sfc_main$g), {
                                          key: item.id
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$j), null, {
                                              default: withCtx(() => [
                                                createVNode("div", null, [
                                                  createVNode("p", { class: "font-medium" }, toDisplayString(item.name), 1),
                                                  createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(item.slug), 1)
                                                ])
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$j), null, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(item.parent?.name || "-"), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$j), null, {
                                              default: withCtx(() => [
                                                createVNode(unref(_sfc_main$k), { variant: "outline" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(item.contents_count || 0) + " konten", 1)
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$j), { class: "text-sm text-muted-foreground" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(formatDate(item.created_at)), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "flex items-center justify-end gap-2" }, [
                                                  createVNode(unref(Link), {
                                                    href: `/admin/zenner-club/categories/${item.id}`
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(_sfc_main$2), {
                                                        variant: "ghost",
                                                        size: "icon"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode(unref(Eye), { class: "h-4 w-4" })
                                                        ]),
                                                        _: 1
                                                      })
                                                    ]),
                                                    _: 1
                                                  }, 8, ["href"]),
                                                  unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(Link), {
                                                    key: 0,
                                                    href: `/admin/zenner-club/categories/${item.id}/edit`
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(_sfc_main$2), {
                                                        variant: "ghost",
                                                        size: "icon"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode(unref(Pencil), { class: "h-4 w-4" })
                                                        ]),
                                                        _: 1
                                                      })
                                                    ]),
                                                    _: 1
                                                  }, 8, ["href"])) : createCommentVNode("", true),
                                                  unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(_sfc_main$2), {
                                                    key: 1,
                                                    variant: "ghost",
                                                    size: "icon",
                                                    onClick: ($event) => deleteCategory(item.id)
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(Trash2), { class: "h-4 w-4 text-destructive" })
                                                    ]),
                                                    _: 1
                                                  }, 8, ["onClick"])) : createCommentVNode("", true)
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
                                createVNode(unref(_sfc_main$f), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$g), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$h), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Nama")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$h), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Parent")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$h), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Konten")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$h), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Dibuat")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$h), { class: "text-right" }, {
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
                                createVNode(unref(_sfc_main$i), null, {
                                  default: withCtx(() => [
                                    __props.items.data.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$g), { key: 0 }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$j), {
                                          colspan: "5",
                                          class: "text-center text-muted-foreground py-8"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" Belum ada kategori. ")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })) : createCommentVNode("", true),
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.items.data, (item) => {
                                      return openBlock(), createBlock(unref(_sfc_main$g), {
                                        key: item.id
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$j), null, {
                                            default: withCtx(() => [
                                              createVNode("div", null, [
                                                createVNode("p", { class: "font-medium" }, toDisplayString(item.name), 1),
                                                createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(item.slug), 1)
                                              ])
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$j), null, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(item.parent?.name || "-"), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$j), null, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$k), { variant: "outline" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(item.contents_count || 0) + " konten", 1)
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$j), { class: "text-sm text-muted-foreground" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(formatDate(item.created_at)), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "flex items-center justify-end gap-2" }, [
                                                createVNode(unref(Link), {
                                                  href: `/admin/zenner-club/categories/${item.id}`
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(_sfc_main$2), {
                                                      variant: "ghost",
                                                      size: "icon"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(unref(Eye), { class: "h-4 w-4" })
                                                      ]),
                                                      _: 1
                                                    })
                                                  ]),
                                                  _: 1
                                                }, 8, ["href"]),
                                                unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(Link), {
                                                  key: 0,
                                                  href: `/admin/zenner-club/categories/${item.id}/edit`
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(_sfc_main$2), {
                                                      variant: "ghost",
                                                      size: "icon"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(unref(Pencil), { class: "h-4 w-4" })
                                                      ]),
                                                      _: 1
                                                    })
                                                  ]),
                                                  _: 1
                                                }, 8, ["href"])) : createCommentVNode("", true),
                                                unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(_sfc_main$2), {
                                                  key: 1,
                                                  variant: "ghost",
                                                  size: "icon",
                                                  onClick: ($event) => deleteCategory(item.id)
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(Trash2), { class: "h-4 w-4 text-destructive" })
                                                  ]),
                                                  _: 1
                                                }, 8, ["onClick"])) : createCommentVNode("", true)
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
                        return [
                          createVNode(unref(_sfc_main$e), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$f), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$g), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$h), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Nama")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$h), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Parent")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$h), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Konten")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$h), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Dibuat")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$h), { class: "text-right" }, {
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
                              createVNode(unref(_sfc_main$i), null, {
                                default: withCtx(() => [
                                  __props.items.data.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$g), { key: 0 }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$j), {
                                        colspan: "5",
                                        class: "text-center text-muted-foreground py-8"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Belum ada kategori. ")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })) : createCommentVNode("", true),
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.items.data, (item) => {
                                    return openBlock(), createBlock(unref(_sfc_main$g), {
                                      key: item.id
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$j), null, {
                                          default: withCtx(() => [
                                            createVNode("div", null, [
                                              createVNode("p", { class: "font-medium" }, toDisplayString(item.name), 1),
                                              createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(item.slug), 1)
                                            ])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$j), null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(item.parent?.name || "-"), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$j), null, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$k), { variant: "outline" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(item.contents_count || 0) + " konten", 1)
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$j), { class: "text-sm text-muted-foreground" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(formatDate(item.created_at)), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "flex items-center justify-end gap-2" }, [
                                              createVNode(unref(Link), {
                                                href: `/admin/zenner-club/categories/${item.id}`
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(_sfc_main$2), {
                                                    variant: "ghost",
                                                    size: "icon"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(Eye), { class: "h-4 w-4" })
                                                    ]),
                                                    _: 1
                                                  })
                                                ]),
                                                _: 1
                                              }, 8, ["href"]),
                                              unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(Link), {
                                                key: 0,
                                                href: `/admin/zenner-club/categories/${item.id}/edit`
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(_sfc_main$2), {
                                                    variant: "ghost",
                                                    size: "icon"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(Pencil), { class: "h-4 w-4" })
                                                    ]),
                                                    _: 1
                                                  })
                                                ]),
                                                _: 1
                                              }, 8, ["href"])) : createCommentVNode("", true),
                                              unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(_sfc_main$2), {
                                                key: 1,
                                                variant: "ghost",
                                                size: "icon",
                                                onClick: ($event) => deleteCategory(item.id)
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(Trash2), { class: "h-4 w-4 text-destructive" })
                                                ]),
                                                _: 1
                                              }, 8, ["onClick"])) : createCommentVNode("", true)
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
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$7), { class: "p-0" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$e), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$f), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$g), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$h), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Nama")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$h), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Parent")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$h), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Konten")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$h), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Dibuat")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$h), { class: "text-right" }, {
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
                            createVNode(unref(_sfc_main$i), null, {
                              default: withCtx(() => [
                                __props.items.data.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$g), { key: 0 }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$j), {
                                      colspan: "5",
                                      class: "text-center text-muted-foreground py-8"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Belum ada kategori. ")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true),
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.items.data, (item) => {
                                  return openBlock(), createBlock(unref(_sfc_main$g), {
                                    key: item.id
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$j), null, {
                                        default: withCtx(() => [
                                          createVNode("div", null, [
                                            createVNode("p", { class: "font-medium" }, toDisplayString(item.name), 1),
                                            createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(item.slug), 1)
                                          ])
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$j), null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(item.parent?.name || "-"), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$j), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$k), { variant: "outline" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(item.contents_count || 0) + " konten", 1)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$j), { class: "text-sm text-muted-foreground" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(formatDate(item.created_at)), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "flex items-center justify-end gap-2" }, [
                                            createVNode(unref(Link), {
                                              href: `/admin/zenner-club/categories/${item.id}`
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(_sfc_main$2), {
                                                  variant: "ghost",
                                                  size: "icon"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(Eye), { class: "h-4 w-4" })
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 1
                                            }, 8, ["href"]),
                                            unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(Link), {
                                              key: 0,
                                              href: `/admin/zenner-club/categories/${item.id}/edit`
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(_sfc_main$2), {
                                                  variant: "ghost",
                                                  size: "icon"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(Pencil), { class: "h-4 w-4" })
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 1
                                            }, 8, ["href"])) : createCommentVNode("", true),
                                            unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(_sfc_main$2), {
                                              key: 1,
                                              variant: "ghost",
                                              size: "icon",
                                              onClick: ($event) => deleteCategory(item.id)
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(Trash2), { class: "h-4 w-4 text-destructive" })
                                              ]),
                                              _: 1
                                            }, 8, ["onClick"])) : createCommentVNode("", true)
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
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (__props.items.last_page > 1) {
              _push2(ssrRenderComponent(_sfc_main$l, {
                data: __props.items,
                url: "/admin/zenner-club/categories",
                filters: paginationFilters.value
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$m), {
              open: categoryToDelete.value !== null,
              "onUpdate:open": ($event) => categoryToDelete.value = null
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$n), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$o), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$p), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Hapus Kategori?`);
                                  } else {
                                    return [
                                      createTextVNode("Hapus Kategori?")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$q), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Kategori akan dihapus permanen. Pastikan tidak ada sub-kategori atau konten terkait. `);
                                  } else {
                                    return [
                                      createTextVNode(" Kategori akan dihapus permanen. Pastikan tidak ada sub-kategori atau konten terkait. ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$p), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Hapus Kategori?")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$q), null, {
                                  default: withCtx(() => [
                                    createTextVNode(" Kategori akan dihapus permanen. Pastikan tidak ada sub-kategori atau konten terkait. ")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$r), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$s), null, {
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
                              _push5(ssrRenderComponent(unref(_sfc_main$t), {
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
                                createVNode(unref(_sfc_main$s), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Batal")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$t), {
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
                          createVNode(unref(_sfc_main$o), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$p), null, {
                                default: withCtx(() => [
                                  createTextVNode("Hapus Kategori?")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$q), null, {
                                default: withCtx(() => [
                                  createTextVNode(" Kategori akan dihapus permanen. Pastikan tidak ada sub-kategori atau konten terkait. ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$r), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$s), null, {
                                default: withCtx(() => [
                                  createTextVNode("Batal")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$t), {
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
                    createVNode(unref(_sfc_main$n), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$o), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$p), null, {
                              default: withCtx(() => [
                                createTextVNode("Hapus Kategori?")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$q), null, {
                              default: withCtx(() => [
                                createTextVNode(" Kategori akan dihapus permanen. Pastikan tidak ada sub-kategori atau konten terkait. ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$r), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$s), null, {
                              default: withCtx(() => [
                                createTextVNode("Batal")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$t), {
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
                    createVNode("h1", { class: "text-3xl font-bold tracking-tight" }, "Kategori Zenner Club"),
                    createVNode("p", { class: "text-muted-foreground" }, "Kelola kategori konten Zenner Club")
                  ]),
                  unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(Link), {
                    key: 0,
                    href: "/admin/zenner-club/categories/create"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$2), null, {
                        default: withCtx(() => [
                          createVNode(unref(Plus), { class: "mr-2 h-4 w-4" }),
                          createTextVNode(" Tambah Kategori ")
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
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Filter & Pencarian")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode("Cari dan filter kategori")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex flex-col gap-4 lg:flex-row" }, [
                          createVNode("div", { class: "flex-1 relative" }, [
                            createVNode(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
                            createVNode(unref(_sfc_main$8), {
                              modelValue: search.value,
                              "onUpdate:modelValue": ($event) => search.value = $event,
                              placeholder: "Cari nama atau slug...",
                              class: "pl-10",
                              onKeyup: withKeys(applyFilters, ["enter"])
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-3" }, [
                            createVNode(unref(_sfc_main$8), {
                              modelValue: parentId.value,
                              "onUpdate:modelValue": ($event) => parentId.value = $event,
                              type: "number",
                              placeholder: "Parent ID"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(unref(_sfc_main$9), {
                              modelValue: sortBy.value,
                              "onUpdate:modelValue": [($event) => sortBy.value = $event, applyFilters]
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$a), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$b), { placeholder: "Urutkan" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$d), { value: "name" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Nama")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$d), { value: "created_at" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Tanggal")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(unref(_sfc_main$9), {
                              modelValue: sortOrder.value,
                              "onUpdate:modelValue": [($event) => sortOrder.value = $event, applyFilters]
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$a), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$b), { placeholder: "Arah" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$d), { value: "asc" }, {
                                      default: withCtx(() => [
                                        createTextVNode("A-Z")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$d), { value: "desc" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Z-A")
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
                          createVNode("div", { class: "flex gap-2" }, [
                            createVNode(unref(_sfc_main$2), { onClick: applyFilters }, {
                              default: withCtx(() => [
                                createTextVNode("Cari")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$2), {
                              variant: "outline",
                              onClick: clearFilters
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Reset")
                              ]),
                              _: 1
                            })
                          ])
                        ])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(unref(_sfc_main$3), null, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$7), { class: "p-0" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$e), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$f), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$g), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$h), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Nama")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$h), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Parent")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$h), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Konten")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$h), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Dibuat")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$h), { class: "text-right" }, {
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
                            createVNode(unref(_sfc_main$i), null, {
                              default: withCtx(() => [
                                __props.items.data.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$g), { key: 0 }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$j), {
                                      colspan: "5",
                                      class: "text-center text-muted-foreground py-8"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Belum ada kategori. ")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true),
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.items.data, (item) => {
                                  return openBlock(), createBlock(unref(_sfc_main$g), {
                                    key: item.id
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$j), null, {
                                        default: withCtx(() => [
                                          createVNode("div", null, [
                                            createVNode("p", { class: "font-medium" }, toDisplayString(item.name), 1),
                                            createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(item.slug), 1)
                                          ])
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$j), null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(item.parent?.name || "-"), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$j), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$k), { variant: "outline" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(item.contents_count || 0) + " konten", 1)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$j), { class: "text-sm text-muted-foreground" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(formatDate(item.created_at)), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "flex items-center justify-end gap-2" }, [
                                            createVNode(unref(Link), {
                                              href: `/admin/zenner-club/categories/${item.id}`
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(_sfc_main$2), {
                                                  variant: "ghost",
                                                  size: "icon"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(Eye), { class: "h-4 w-4" })
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 1
                                            }, 8, ["href"]),
                                            unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(Link), {
                                              key: 0,
                                              href: `/admin/zenner-club/categories/${item.id}/edit`
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(_sfc_main$2), {
                                                  variant: "ghost",
                                                  size: "icon"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(Pencil), { class: "h-4 w-4" })
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 1
                                            }, 8, ["href"])) : createCommentVNode("", true),
                                            unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(_sfc_main$2), {
                                              key: 1,
                                              variant: "ghost",
                                              size: "icon",
                                              onClick: ($event) => deleteCategory(item.id)
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(Trash2), { class: "h-4 w-4 text-destructive" })
                                              ]),
                                              _: 1
                                            }, 8, ["onClick"])) : createCommentVNode("", true)
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
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                __props.items.last_page > 1 ? (openBlock(), createBlock(_sfc_main$l, {
                  key: 0,
                  data: __props.items,
                  url: "/admin/zenner-club/categories",
                  filters: paginationFilters.value
                }, null, 8, ["data", "filters"])) : createCommentVNode("", true)
              ]),
              createVNode(unref(_sfc_main$m), {
                open: categoryToDelete.value !== null,
                "onUpdate:open": ($event) => categoryToDelete.value = null
              }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$n), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$o), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$p), null, {
                            default: withCtx(() => [
                              createTextVNode("Hapus Kategori?")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$q), null, {
                            default: withCtx(() => [
                              createTextVNode(" Kategori akan dihapus permanen. Pastikan tidak ada sub-kategori atau konten terkait. ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$r), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$s), null, {
                            default: withCtx(() => [
                              createTextVNode("Batal")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$t), {
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
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/ZennerClub/Categories/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
