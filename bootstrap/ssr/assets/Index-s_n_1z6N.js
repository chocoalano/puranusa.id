import { defineComponent, ref, computed, unref, withCtx, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, withKeys, toDisplayString, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AppLayout-BHxY2bcF.js";
import { Head, Link, router } from "@inertiajs/vue3";
import { _ as _sfc_main$k } from "./index-BpQimeTM.js";
import { _ as _sfc_main$2 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5, d as _sfc_main$6, c as _sfc_main$7 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$8 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$e, a as _sfc_main$f, b as _sfc_main$g, c as _sfc_main$h, d as _sfc_main$i, e as _sfc_main$j } from "./TableHeader-emcE6QAC.js";
import { _ as _sfc_main$9, a as _sfc_main$a, b as _sfc_main$b, c as _sfc_main$c, d as _sfc_main$d } from "./SelectValue-BUnv4mQg.js";
import { _ as _sfc_main$l, a as _sfc_main$m, b as _sfc_main$n, f as _sfc_main$o, g as _sfc_main$p, c as _sfc_main$q } from "./DropdownMenuTrigger-B1v6pHML.js";
import { Plus, Search, FileText, MoreVertical, Eye, Pencil, Trash2 } from "lucide-vue-next";
import { u as usePermissions } from "./usePermissions-DYRibCI0.js";
import "class-variance-authority";
import "reka-ui";
import "@vueuse/core";
import "./index-3UqiGNe9.js";
import "./AvatarImage-DWFQMckn.js";
import "./index-Bfu0FVt6.js";
import "vue-sonner";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
import "clsx";
import "tailwind-merge";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    pages: {},
    filters: {}
  },
  setup(__props) {
    const { isSuperAdmin, isAdmin } = usePermissions();
    const props = __props;
    const searchQuery = ref(props.filters.search || "");
    const selectedStatus = ref(props.filters.status || "all");
    const performSearch = () => {
      router.get("/admin/pages", {
        search: searchQuery.value || void 0,
        status: selectedStatus.value !== "all" ? selectedStatus.value : void 0
      }, {
        preserveState: true,
        preserveScroll: true
      });
    };
    const clearFilters = () => {
      searchQuery.value = "";
      selectedStatus.value = "all";
      router.get("/admin/pages");
    };
    const deletePage = (id) => {
      if (confirm("Apakah Anda yakin ingin menghapus halaman ini?")) {
        router.delete(`/admin/pages/${id}`, {
          preserveScroll: true
        });
      }
    };
    const hasActiveFilters = computed(() => {
      return !!searchQuery.value || selectedStatus.value !== "all";
    });
    const getTemplateLabel = (template) => {
      const templates = {
        "default": "Default",
        "full-width": "Full Width",
        "narrow": "Narrow"
      };
      return templates[template] || template;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Kelola Halaman" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="container mx-auto py-6 space-y-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="text-3xl font-bold tracking-tight"${_scopeId}>Kelola Halaman</h1><p class="text-muted-foreground mt-1"${_scopeId}> Kelola semua halaman statis di website Anda </p></div>`);
            if (unref(isSuperAdmin) || unref(isAdmin)) {
              _push2(ssrRenderComponent(unref(Link), { href: "/admin/pages/create" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (unref(isSuperAdmin) || unref(isAdmin)) {
                      _push3(ssrRenderComponent(unref(_sfc_main$2), null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(Plus), { class: "h-4 w-4 mr-2" }, null, _parent4, _scopeId3));
                            _push4(` Tambah Halaman `);
                          } else {
                            return [
                              createVNode(unref(Plus), { class: "h-4 w-4 mr-2" }),
                              createTextVNode(" Tambah Halaman ")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(_sfc_main$2), { key: 0 }, {
                        default: withCtx(() => [
                          createVNode(unref(Plus), { class: "h-4 w-4 mr-2" }),
                          createTextVNode(" Tambah Halaman ")
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
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
                              _push5(`Cari dan filter halaman`);
                            } else {
                              return [
                                createTextVNode("Cari dan filter halaman")
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
                              createTextVNode("Cari dan filter halaman")
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
                        _push4(`<div class="flex flex-col md:flex-row gap-4"${_scopeId3}><div class="flex-1 relative"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Search), { class: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$8), {
                          modelValue: searchQuery.value,
                          "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                          placeholder: "Cari berdasarkan judul atau slug...",
                          class: "pl-10",
                          onKeydown: performSearch
                        }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          modelValue: selectedStatus.value,
                          "onUpdate:modelValue": [($event) => selectedStatus.value = $event, performSearch]
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$a), { class: "w-full md:w-[200px]" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$b), { placeholder: "Status" }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$b), { placeholder: "Status" })
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
                                    _push6(ssrRenderComponent(unref(_sfc_main$d), { value: "published" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Published`);
                                        } else {
                                          return [
                                            createTextVNode("Published")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$d), { value: "draft" }, {
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
                                      createVNode(unref(_sfc_main$d), { value: "all" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Semua Status")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$d), { value: "published" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Published")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$d), { value: "draft" }, {
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
                                createVNode(unref(_sfc_main$a), { class: "w-full md:w-[200px]" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$b), { placeholder: "Status" })
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
                                    createVNode(unref(_sfc_main$d), { value: "published" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Published")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$d), { value: "draft" }, {
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
                        _push4(ssrRenderComponent(unref(_sfc_main$2), { onClick: performSearch }, {
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
                        if (hasActiveFilters.value) {
                          _push4(ssrRenderComponent(unref(_sfc_main$2), {
                            onClick: clearFilters,
                            variant: "outline"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` Reset `);
                              } else {
                                return [
                                  createTextVNode(" Reset ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex flex-col md:flex-row gap-4" }, [
                            createVNode("div", { class: "flex-1 relative" }, [
                              createVNode(unref(Search), { class: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
                              createVNode(unref(_sfc_main$8), {
                                modelValue: searchQuery.value,
                                "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                                placeholder: "Cari berdasarkan judul atau slug...",
                                class: "pl-10",
                                onKeydown: withKeys(performSearch, ["enter"])
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode(unref(_sfc_main$9), {
                              modelValue: selectedStatus.value,
                              "onUpdate:modelValue": [($event) => selectedStatus.value = $event, performSearch]
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$a), { class: "w-full md:w-[200px]" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$b), { placeholder: "Status" })
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
                                    createVNode(unref(_sfc_main$d), { value: "published" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Published")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$d), { value: "draft" }, {
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
                            createVNode(unref(_sfc_main$2), { onClick: performSearch }, {
                              default: withCtx(() => [
                                createTextVNode("Cari")
                              ]),
                              _: 1
                            }),
                            hasActiveFilters.value ? (openBlock(), createBlock(unref(_sfc_main$2), {
                              key: 0,
                              onClick: clearFilters,
                              variant: "outline"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Reset ")
                              ]),
                              _: 1
                            })) : createCommentVNode("", true)
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
                            createTextVNode("Cari dan filter halaman")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex flex-col md:flex-row gap-4" }, [
                          createVNode("div", { class: "flex-1 relative" }, [
                            createVNode(unref(Search), { class: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
                            createVNode(unref(_sfc_main$8), {
                              modelValue: searchQuery.value,
                              "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                              placeholder: "Cari berdasarkan judul atau slug...",
                              class: "pl-10",
                              onKeydown: withKeys(performSearch, ["enter"])
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode(unref(_sfc_main$9), {
                            modelValue: selectedStatus.value,
                            "onUpdate:modelValue": [($event) => selectedStatus.value = $event, performSearch]
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$a), { class: "w-full md:w-[200px]" }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$b), { placeholder: "Status" })
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
                                  createVNode(unref(_sfc_main$d), { value: "published" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Published")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$d), { value: "draft" }, {
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
                          createVNode(unref(_sfc_main$2), { onClick: performSearch }, {
                            default: withCtx(() => [
                              createTextVNode("Cari")
                            ]),
                            _: 1
                          }),
                          hasActiveFilters.value ? (openBlock(), createBlock(unref(_sfc_main$2), {
                            key: 0,
                            onClick: clearFilters,
                            variant: "outline"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Reset ")
                            ]),
                            _: 1
                          })) : createCommentVNode("", true)
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
                                                _push8(`Judul`);
                                              } else {
                                                return [
                                                  createTextVNode("Judul")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(unref(_sfc_main$h), null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Slug`);
                                              } else {
                                                return [
                                                  createTextVNode("Slug")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(unref(_sfc_main$h), null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Template`);
                                              } else {
                                                return [
                                                  createTextVNode("Template")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(unref(_sfc_main$h), null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Urutan`);
                                              } else {
                                                return [
                                                  createTextVNode("Urutan")
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
                                          _push7(ssrRenderComponent(unref(_sfc_main$h), null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Tanggal Dibuat`);
                                              } else {
                                                return [
                                                  createTextVNode("Tanggal Dibuat")
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
                                                createTextVNode("Judul")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$h), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Slug")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$h), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Template")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$h), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Urutan")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$h), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Status")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$h), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Tanggal Dibuat")
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
                                              createTextVNode("Judul")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$h), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Slug")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$h), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Template")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$h), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Urutan")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$h), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Status")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$h), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Tanggal Dibuat")
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
                                    if (__props.pages.data.length === 0) {
                                      _push6(ssrRenderComponent(unref(_sfc_main$g), null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(unref(_sfc_main$j), {
                                              colspan: "7",
                                              class: "text-center py-8 text-muted-foreground"
                                            }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(unref(FileText), { class: "h-12 w-12 mx-auto mb-2 opacity-20" }, null, _parent8, _scopeId7));
                                                  _push8(`<p${_scopeId7}>Belum ada halaman</p>`);
                                                } else {
                                                  return [
                                                    createVNode(unref(FileText), { class: "h-12 w-12 mx-auto mb-2 opacity-20" }),
                                                    createVNode("p", null, "Belum ada halaman")
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
                                                  createVNode(unref(FileText), { class: "h-12 w-12 mx-auto mb-2 opacity-20" }),
                                                  createVNode("p", null, "Belum ada halaman")
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
                                    ssrRenderList(__props.pages.data, (page) => {
                                      _push6(ssrRenderComponent(unref(_sfc_main$g), {
                                        key: page.id
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(unref(_sfc_main$j), { class: "font-medium" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(page.title)}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(page.title), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$j), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`<code class="text-xs bg-muted px-2 py-1 rounded"${_scopeId7}>${ssrInterpolate(page.slug)}</code>`);
                                                } else {
                                                  return [
                                                    createVNode("code", { class: "text-xs bg-muted px-2 py-1 rounded" }, toDisplayString(page.slug), 1)
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
                                                        _push9(`${ssrInterpolate(getTemplateLabel(page.template))}`);
                                                      } else {
                                                        return [
                                                          createTextVNode(toDisplayString(getTemplateLabel(page.template)), 1)
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                } else {
                                                  return [
                                                    createVNode(unref(_sfc_main$k), { variant: "outline" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(getTemplateLabel(page.template)), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$j), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(unref(_sfc_main$k), { variant: "secondary" }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`${ssrInterpolate(page.order)}`);
                                                      } else {
                                                        return [
                                                          createTextVNode(toDisplayString(page.order), 1)
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                } else {
                                                  return [
                                                    createVNode(unref(_sfc_main$k), { variant: "secondary" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(page.order), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$j), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  if (page.is_published) {
                                                    _push8(ssrRenderComponent(unref(_sfc_main$k), { variant: "default" }, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(` Published `);
                                                        } else {
                                                          return [
                                                            createTextVNode(" Published ")
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                  } else {
                                                    _push8(ssrRenderComponent(unref(_sfc_main$k), { variant: "secondary" }, {
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
                                                    page.is_published ? (openBlock(), createBlock(unref(_sfc_main$k), {
                                                      key: 0,
                                                      variant: "default"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(" Published ")
                                                      ]),
                                                      _: 1
                                                    })) : (openBlock(), createBlock(unref(_sfc_main$k), {
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
                                            _push7(ssrRenderComponent(unref(_sfc_main$j), { class: "text-sm text-muted-foreground" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(new Date(page.created_at).toLocaleDateString("id-ID"))}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(new Date(page.created_at).toLocaleDateString("id-ID")), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$j), { class: "text-right" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(unref(_sfc_main$l), null, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(ssrRenderComponent(unref(_sfc_main$m), { "as-child": "" }, {
                                                          default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                            if (_push10) {
                                                              _push10(ssrRenderComponent(unref(_sfc_main$2), {
                                                                variant: "ghost",
                                                                size: "icon"
                                                              }, {
                                                                default: withCtx((_10, _push11, _parent11, _scopeId10) => {
                                                                  if (_push11) {
                                                                    _push11(ssrRenderComponent(unref(MoreVertical), { class: "h-4 w-4" }, null, _parent11, _scopeId10));
                                                                  } else {
                                                                    return [
                                                                      createVNode(unref(MoreVertical), { class: "h-4 w-4" })
                                                                    ];
                                                                  }
                                                                }),
                                                                _: 2
                                                              }, _parent10, _scopeId9));
                                                            } else {
                                                              return [
                                                                createVNode(unref(_sfc_main$2), {
                                                                  variant: "ghost",
                                                                  size: "icon"
                                                                }, {
                                                                  default: withCtx(() => [
                                                                    createVNode(unref(MoreVertical), { class: "h-4 w-4" })
                                                                  ]),
                                                                  _: 1
                                                                })
                                                              ];
                                                            }
                                                          }),
                                                          _: 2
                                                        }, _parent9, _scopeId8));
                                                        _push9(ssrRenderComponent(unref(_sfc_main$n), { align: "end" }, {
                                                          default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                            if (_push10) {
                                                              _push10(ssrRenderComponent(unref(_sfc_main$o), null, {
                                                                default: withCtx((_10, _push11, _parent11, _scopeId10) => {
                                                                  if (_push11) {
                                                                    _push11(`Aksi`);
                                                                  } else {
                                                                    return [
                                                                      createTextVNode("Aksi")
                                                                    ];
                                                                  }
                                                                }),
                                                                _: 2
                                                              }, _parent10, _scopeId9));
                                                              _push10(ssrRenderComponent(unref(_sfc_main$p), null, null, _parent10, _scopeId9));
                                                              if (unref(isSuperAdmin) || unref(isAdmin)) {
                                                                _push10(ssrRenderComponent(unref(Link), {
                                                                  href: `/page/${page.slug}`,
                                                                  target: "_blank"
                                                                }, {
                                                                  default: withCtx((_10, _push11, _parent11, _scopeId10) => {
                                                                    if (_push11) {
                                                                      _push11(ssrRenderComponent(unref(_sfc_main$q), null, {
                                                                        default: withCtx((_11, _push12, _parent12, _scopeId11) => {
                                                                          if (_push12) {
                                                                            _push12(ssrRenderComponent(unref(Eye), { class: "h-4 w-4 mr-2" }, null, _parent12, _scopeId11));
                                                                            _push12(` Lihat `);
                                                                          } else {
                                                                            return [
                                                                              createVNode(unref(Eye), { class: "h-4 w-4 mr-2" }),
                                                                              createTextVNode(" Lihat ")
                                                                            ];
                                                                          }
                                                                        }),
                                                                        _: 2
                                                                      }, _parent11, _scopeId10));
                                                                    } else {
                                                                      return [
                                                                        createVNode(unref(_sfc_main$q), null, {
                                                                          default: withCtx(() => [
                                                                            createVNode(unref(Eye), { class: "h-4 w-4 mr-2" }),
                                                                            createTextVNode(" Lihat ")
                                                                          ]),
                                                                          _: 1
                                                                        })
                                                                      ];
                                                                    }
                                                                  }),
                                                                  _: 2
                                                                }, _parent10, _scopeId9));
                                                              } else {
                                                                _push10(`<!---->`);
                                                              }
                                                              _push10(ssrRenderComponent(unref(Link), {
                                                                href: `/admin/pages/${page.id}/edit`
                                                              }, {
                                                                default: withCtx((_10, _push11, _parent11, _scopeId10) => {
                                                                  if (_push11) {
                                                                    _push11(ssrRenderComponent(unref(_sfc_main$q), null, {
                                                                      default: withCtx((_11, _push12, _parent12, _scopeId11) => {
                                                                        if (_push12) {
                                                                          _push12(ssrRenderComponent(unref(Pencil), { class: "h-4 w-4 mr-2" }, null, _parent12, _scopeId11));
                                                                          _push12(` Edit `);
                                                                        } else {
                                                                          return [
                                                                            createVNode(unref(Pencil), { class: "h-4 w-4 mr-2" }),
                                                                            createTextVNode(" Edit ")
                                                                          ];
                                                                        }
                                                                      }),
                                                                      _: 2
                                                                    }, _parent11, _scopeId10));
                                                                  } else {
                                                                    return [
                                                                      createVNode(unref(_sfc_main$q), null, {
                                                                        default: withCtx(() => [
                                                                          createVNode(unref(Pencil), { class: "h-4 w-4 mr-2" }),
                                                                          createTextVNode(" Edit ")
                                                                        ]),
                                                                        _: 1
                                                                      })
                                                                    ];
                                                                  }
                                                                }),
                                                                _: 2
                                                              }, _parent10, _scopeId9));
                                                              _push10(ssrRenderComponent(unref(_sfc_main$p), null, null, _parent10, _scopeId9));
                                                              if (unref(isSuperAdmin) || unref(isAdmin)) {
                                                                _push10(ssrRenderComponent(unref(_sfc_main$q), {
                                                                  onClick: ($event) => deletePage(page.id),
                                                                  class: "text-destructive focus:text-destructive"
                                                                }, {
                                                                  default: withCtx((_10, _push11, _parent11, _scopeId10) => {
                                                                    if (_push11) {
                                                                      _push11(ssrRenderComponent(unref(Trash2), { class: "h-4 w-4 mr-2" }, null, _parent11, _scopeId10));
                                                                      _push11(` Hapus `);
                                                                    } else {
                                                                      return [
                                                                        createVNode(unref(Trash2), { class: "h-4 w-4 mr-2" }),
                                                                        createTextVNode(" Hapus ")
                                                                      ];
                                                                    }
                                                                  }),
                                                                  _: 2
                                                                }, _parent10, _scopeId9));
                                                              } else {
                                                                _push10(`<!---->`);
                                                              }
                                                            } else {
                                                              return [
                                                                createVNode(unref(_sfc_main$o), null, {
                                                                  default: withCtx(() => [
                                                                    createTextVNode("Aksi")
                                                                  ]),
                                                                  _: 1
                                                                }),
                                                                createVNode(unref(_sfc_main$p)),
                                                                unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(Link), {
                                                                  key: 0,
                                                                  href: `/page/${page.slug}`,
                                                                  target: "_blank"
                                                                }, {
                                                                  default: withCtx(() => [
                                                                    createVNode(unref(_sfc_main$q), null, {
                                                                      default: withCtx(() => [
                                                                        createVNode(unref(Eye), { class: "h-4 w-4 mr-2" }),
                                                                        createTextVNode(" Lihat ")
                                                                      ]),
                                                                      _: 1
                                                                    })
                                                                  ]),
                                                                  _: 1
                                                                }, 8, ["href"])) : createCommentVNode("", true),
                                                                createVNode(unref(Link), {
                                                                  href: `/admin/pages/${page.id}/edit`
                                                                }, {
                                                                  default: withCtx(() => [
                                                                    createVNode(unref(_sfc_main$q), null, {
                                                                      default: withCtx(() => [
                                                                        createVNode(unref(Pencil), { class: "h-4 w-4 mr-2" }),
                                                                        createTextVNode(" Edit ")
                                                                      ]),
                                                                      _: 1
                                                                    })
                                                                  ]),
                                                                  _: 1
                                                                }, 8, ["href"]),
                                                                createVNode(unref(_sfc_main$p)),
                                                                unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(_sfc_main$q), {
                                                                  key: 1,
                                                                  onClick: ($event) => deletePage(page.id),
                                                                  class: "text-destructive focus:text-destructive"
                                                                }, {
                                                                  default: withCtx(() => [
                                                                    createVNode(unref(Trash2), { class: "h-4 w-4 mr-2" }),
                                                                    createTextVNode(" Hapus ")
                                                                  ]),
                                                                  _: 1
                                                                }, 8, ["onClick"])) : createCommentVNode("", true)
                                                              ];
                                                            }
                                                          }),
                                                          _: 2
                                                        }, _parent9, _scopeId8));
                                                      } else {
                                                        return [
                                                          createVNode(unref(_sfc_main$m), { "as-child": "" }, {
                                                            default: withCtx(() => [
                                                              createVNode(unref(_sfc_main$2), {
                                                                variant: "ghost",
                                                                size: "icon"
                                                              }, {
                                                                default: withCtx(() => [
                                                                  createVNode(unref(MoreVertical), { class: "h-4 w-4" })
                                                                ]),
                                                                _: 1
                                                              })
                                                            ]),
                                                            _: 1
                                                          }),
                                                          createVNode(unref(_sfc_main$n), { align: "end" }, {
                                                            default: withCtx(() => [
                                                              createVNode(unref(_sfc_main$o), null, {
                                                                default: withCtx(() => [
                                                                  createTextVNode("Aksi")
                                                                ]),
                                                                _: 1
                                                              }),
                                                              createVNode(unref(_sfc_main$p)),
                                                              unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(Link), {
                                                                key: 0,
                                                                href: `/page/${page.slug}`,
                                                                target: "_blank"
                                                              }, {
                                                                default: withCtx(() => [
                                                                  createVNode(unref(_sfc_main$q), null, {
                                                                    default: withCtx(() => [
                                                                      createVNode(unref(Eye), { class: "h-4 w-4 mr-2" }),
                                                                      createTextVNode(" Lihat ")
                                                                    ]),
                                                                    _: 1
                                                                  })
                                                                ]),
                                                                _: 1
                                                              }, 8, ["href"])) : createCommentVNode("", true),
                                                              createVNode(unref(Link), {
                                                                href: `/admin/pages/${page.id}/edit`
                                                              }, {
                                                                default: withCtx(() => [
                                                                  createVNode(unref(_sfc_main$q), null, {
                                                                    default: withCtx(() => [
                                                                      createVNode(unref(Pencil), { class: "h-4 w-4 mr-2" }),
                                                                      createTextVNode(" Edit ")
                                                                    ]),
                                                                    _: 1
                                                                  })
                                                                ]),
                                                                _: 1
                                                              }, 8, ["href"]),
                                                              createVNode(unref(_sfc_main$p)),
                                                              unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(_sfc_main$q), {
                                                                key: 1,
                                                                onClick: ($event) => deletePage(page.id),
                                                                class: "text-destructive focus:text-destructive"
                                                              }, {
                                                                default: withCtx(() => [
                                                                  createVNode(unref(Trash2), { class: "h-4 w-4 mr-2" }),
                                                                  createTextVNode(" Hapus ")
                                                                ]),
                                                                _: 1
                                                              }, 8, ["onClick"])) : createCommentVNode("", true)
                                                            ]),
                                                            _: 2
                                                          }, 1024)
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                } else {
                                                  return [
                                                    createVNode(unref(_sfc_main$l), null, {
                                                      default: withCtx(() => [
                                                        createVNode(unref(_sfc_main$m), { "as-child": "" }, {
                                                          default: withCtx(() => [
                                                            createVNode(unref(_sfc_main$2), {
                                                              variant: "ghost",
                                                              size: "icon"
                                                            }, {
                                                              default: withCtx(() => [
                                                                createVNode(unref(MoreVertical), { class: "h-4 w-4" })
                                                              ]),
                                                              _: 1
                                                            })
                                                          ]),
                                                          _: 1
                                                        }),
                                                        createVNode(unref(_sfc_main$n), { align: "end" }, {
                                                          default: withCtx(() => [
                                                            createVNode(unref(_sfc_main$o), null, {
                                                              default: withCtx(() => [
                                                                createTextVNode("Aksi")
                                                              ]),
                                                              _: 1
                                                            }),
                                                            createVNode(unref(_sfc_main$p)),
                                                            unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(Link), {
                                                              key: 0,
                                                              href: `/page/${page.slug}`,
                                                              target: "_blank"
                                                            }, {
                                                              default: withCtx(() => [
                                                                createVNode(unref(_sfc_main$q), null, {
                                                                  default: withCtx(() => [
                                                                    createVNode(unref(Eye), { class: "h-4 w-4 mr-2" }),
                                                                    createTextVNode(" Lihat ")
                                                                  ]),
                                                                  _: 1
                                                                })
                                                              ]),
                                                              _: 1
                                                            }, 8, ["href"])) : createCommentVNode("", true),
                                                            createVNode(unref(Link), {
                                                              href: `/admin/pages/${page.id}/edit`
                                                            }, {
                                                              default: withCtx(() => [
                                                                createVNode(unref(_sfc_main$q), null, {
                                                                  default: withCtx(() => [
                                                                    createVNode(unref(Pencil), { class: "h-4 w-4 mr-2" }),
                                                                    createTextVNode(" Edit ")
                                                                  ]),
                                                                  _: 1
                                                                })
                                                              ]),
                                                              _: 1
                                                            }, 8, ["href"]),
                                                            createVNode(unref(_sfc_main$p)),
                                                            unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(_sfc_main$q), {
                                                              key: 1,
                                                              onClick: ($event) => deletePage(page.id),
                                                              class: "text-destructive focus:text-destructive"
                                                            }, {
                                                              default: withCtx(() => [
                                                                createVNode(unref(Trash2), { class: "h-4 w-4 mr-2" }),
                                                                createTextVNode(" Hapus ")
                                                              ]),
                                                              _: 1
                                                            }, 8, ["onClick"])) : createCommentVNode("", true)
                                                          ]),
                                                          _: 2
                                                        }, 1024)
                                                      ]),
                                                      _: 2
                                                    }, 1024)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(unref(_sfc_main$j), { class: "font-medium" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(page.title), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$j), null, {
                                                default: withCtx(() => [
                                                  createVNode("code", { class: "text-xs bg-muted px-2 py-1 rounded" }, toDisplayString(page.slug), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$j), null, {
                                                default: withCtx(() => [
                                                  createVNode(unref(_sfc_main$k), { variant: "outline" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(getTemplateLabel(page.template)), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$j), null, {
                                                default: withCtx(() => [
                                                  createVNode(unref(_sfc_main$k), { variant: "secondary" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(page.order), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$j), null, {
                                                default: withCtx(() => [
                                                  page.is_published ? (openBlock(), createBlock(unref(_sfc_main$k), {
                                                    key: 0,
                                                    variant: "default"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(" Published ")
                                                    ]),
                                                    _: 1
                                                  })) : (openBlock(), createBlock(unref(_sfc_main$k), {
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
                                              createVNode(unref(_sfc_main$j), { class: "text-sm text-muted-foreground" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(new Date(page.created_at).toLocaleDateString("id-ID")), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(_sfc_main$l), null, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(_sfc_main$m), { "as-child": "" }, {
                                                        default: withCtx(() => [
                                                          createVNode(unref(_sfc_main$2), {
                                                            variant: "ghost",
                                                            size: "icon"
                                                          }, {
                                                            default: withCtx(() => [
                                                              createVNode(unref(MoreVertical), { class: "h-4 w-4" })
                                                            ]),
                                                            _: 1
                                                          })
                                                        ]),
                                                        _: 1
                                                      }),
                                                      createVNode(unref(_sfc_main$n), { align: "end" }, {
                                                        default: withCtx(() => [
                                                          createVNode(unref(_sfc_main$o), null, {
                                                            default: withCtx(() => [
                                                              createTextVNode("Aksi")
                                                            ]),
                                                            _: 1
                                                          }),
                                                          createVNode(unref(_sfc_main$p)),
                                                          unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(Link), {
                                                            key: 0,
                                                            href: `/page/${page.slug}`,
                                                            target: "_blank"
                                                          }, {
                                                            default: withCtx(() => [
                                                              createVNode(unref(_sfc_main$q), null, {
                                                                default: withCtx(() => [
                                                                  createVNode(unref(Eye), { class: "h-4 w-4 mr-2" }),
                                                                  createTextVNode(" Lihat ")
                                                                ]),
                                                                _: 1
                                                              })
                                                            ]),
                                                            _: 1
                                                          }, 8, ["href"])) : createCommentVNode("", true),
                                                          createVNode(unref(Link), {
                                                            href: `/admin/pages/${page.id}/edit`
                                                          }, {
                                                            default: withCtx(() => [
                                                              createVNode(unref(_sfc_main$q), null, {
                                                                default: withCtx(() => [
                                                                  createVNode(unref(Pencil), { class: "h-4 w-4 mr-2" }),
                                                                  createTextVNode(" Edit ")
                                                                ]),
                                                                _: 1
                                                              })
                                                            ]),
                                                            _: 1
                                                          }, 8, ["href"]),
                                                          createVNode(unref(_sfc_main$p)),
                                                          unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(_sfc_main$q), {
                                                            key: 1,
                                                            onClick: ($event) => deletePage(page.id),
                                                            class: "text-destructive focus:text-destructive"
                                                          }, {
                                                            default: withCtx(() => [
                                                              createVNode(unref(Trash2), { class: "h-4 w-4 mr-2" }),
                                                              createTextVNode(" Hapus ")
                                                            ]),
                                                            _: 1
                                                          }, 8, ["onClick"])) : createCommentVNode("", true)
                                                        ]),
                                                        _: 2
                                                      }, 1024)
                                                    ]),
                                                    _: 2
                                                  }, 1024)
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
                                      __props.pages.data.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$g), { key: 0 }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$j), {
                                            colspan: "7",
                                            class: "text-center py-8 text-muted-foreground"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(FileText), { class: "h-12 w-12 mx-auto mb-2 opacity-20" }),
                                              createVNode("p", null, "Belum ada halaman")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })) : createCommentVNode("", true),
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.pages.data, (page) => {
                                        return openBlock(), createBlock(unref(_sfc_main$g), {
                                          key: page.id
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$j), { class: "font-medium" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(page.title), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$j), null, {
                                              default: withCtx(() => [
                                                createVNode("code", { class: "text-xs bg-muted px-2 py-1 rounded" }, toDisplayString(page.slug), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$j), null, {
                                              default: withCtx(() => [
                                                createVNode(unref(_sfc_main$k), { variant: "outline" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(getTemplateLabel(page.template)), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$j), null, {
                                              default: withCtx(() => [
                                                createVNode(unref(_sfc_main$k), { variant: "secondary" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(page.order), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$j), null, {
                                              default: withCtx(() => [
                                                page.is_published ? (openBlock(), createBlock(unref(_sfc_main$k), {
                                                  key: 0,
                                                  variant: "default"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(" Published ")
                                                  ]),
                                                  _: 1
                                                })) : (openBlock(), createBlock(unref(_sfc_main$k), {
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
                                            createVNode(unref(_sfc_main$j), { class: "text-sm text-muted-foreground" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(new Date(page.created_at).toLocaleDateString("id-ID")), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createVNode(unref(_sfc_main$l), null, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(_sfc_main$m), { "as-child": "" }, {
                                                      default: withCtx(() => [
                                                        createVNode(unref(_sfc_main$2), {
                                                          variant: "ghost",
                                                          size: "icon"
                                                        }, {
                                                          default: withCtx(() => [
                                                            createVNode(unref(MoreVertical), { class: "h-4 w-4" })
                                                          ]),
                                                          _: 1
                                                        })
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(unref(_sfc_main$n), { align: "end" }, {
                                                      default: withCtx(() => [
                                                        createVNode(unref(_sfc_main$o), null, {
                                                          default: withCtx(() => [
                                                            createTextVNode("Aksi")
                                                          ]),
                                                          _: 1
                                                        }),
                                                        createVNode(unref(_sfc_main$p)),
                                                        unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(Link), {
                                                          key: 0,
                                                          href: `/page/${page.slug}`,
                                                          target: "_blank"
                                                        }, {
                                                          default: withCtx(() => [
                                                            createVNode(unref(_sfc_main$q), null, {
                                                              default: withCtx(() => [
                                                                createVNode(unref(Eye), { class: "h-4 w-4 mr-2" }),
                                                                createTextVNode(" Lihat ")
                                                              ]),
                                                              _: 1
                                                            })
                                                          ]),
                                                          _: 1
                                                        }, 8, ["href"])) : createCommentVNode("", true),
                                                        createVNode(unref(Link), {
                                                          href: `/admin/pages/${page.id}/edit`
                                                        }, {
                                                          default: withCtx(() => [
                                                            createVNode(unref(_sfc_main$q), null, {
                                                              default: withCtx(() => [
                                                                createVNode(unref(Pencil), { class: "h-4 w-4 mr-2" }),
                                                                createTextVNode(" Edit ")
                                                              ]),
                                                              _: 1
                                                            })
                                                          ]),
                                                          _: 1
                                                        }, 8, ["href"]),
                                                        createVNode(unref(_sfc_main$p)),
                                                        unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(_sfc_main$q), {
                                                          key: 1,
                                                          onClick: ($event) => deletePage(page.id),
                                                          class: "text-destructive focus:text-destructive"
                                                        }, {
                                                          default: withCtx(() => [
                                                            createVNode(unref(Trash2), { class: "h-4 w-4 mr-2" }),
                                                            createTextVNode(" Hapus ")
                                                          ]),
                                                          _: 1
                                                        }, 8, ["onClick"])) : createCommentVNode("", true)
                                                      ]),
                                                      _: 2
                                                    }, 1024)
                                                  ]),
                                                  _: 2
                                                }, 1024)
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
                                            createTextVNode("Judul")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$h), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Slug")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$h), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Template")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$h), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Urutan")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$h), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Status")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$h), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Tanggal Dibuat")
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
                                    __props.pages.data.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$g), { key: 0 }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$j), {
                                          colspan: "7",
                                          class: "text-center py-8 text-muted-foreground"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(FileText), { class: "h-12 w-12 mx-auto mb-2 opacity-20" }),
                                            createVNode("p", null, "Belum ada halaman")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })) : createCommentVNode("", true),
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.pages.data, (page) => {
                                      return openBlock(), createBlock(unref(_sfc_main$g), {
                                        key: page.id
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$j), { class: "font-medium" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(page.title), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$j), null, {
                                            default: withCtx(() => [
                                              createVNode("code", { class: "text-xs bg-muted px-2 py-1 rounded" }, toDisplayString(page.slug), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$j), null, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$k), { variant: "outline" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(getTemplateLabel(page.template)), 1)
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$j), null, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$k), { variant: "secondary" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(page.order), 1)
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$j), null, {
                                            default: withCtx(() => [
                                              page.is_published ? (openBlock(), createBlock(unref(_sfc_main$k), {
                                                key: 0,
                                                variant: "default"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" Published ")
                                                ]),
                                                _: 1
                                              })) : (openBlock(), createBlock(unref(_sfc_main$k), {
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
                                          createVNode(unref(_sfc_main$j), { class: "text-sm text-muted-foreground" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(new Date(page.created_at).toLocaleDateString("id-ID")), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$l), null, {
                                                default: withCtx(() => [
                                                  createVNode(unref(_sfc_main$m), { "as-child": "" }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(_sfc_main$2), {
                                                        variant: "ghost",
                                                        size: "icon"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode(unref(MoreVertical), { class: "h-4 w-4" })
                                                        ]),
                                                        _: 1
                                                      })
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(unref(_sfc_main$n), { align: "end" }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(_sfc_main$o), null, {
                                                        default: withCtx(() => [
                                                          createTextVNode("Aksi")
                                                        ]),
                                                        _: 1
                                                      }),
                                                      createVNode(unref(_sfc_main$p)),
                                                      unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(Link), {
                                                        key: 0,
                                                        href: `/page/${page.slug}`,
                                                        target: "_blank"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode(unref(_sfc_main$q), null, {
                                                            default: withCtx(() => [
                                                              createVNode(unref(Eye), { class: "h-4 w-4 mr-2" }),
                                                              createTextVNode(" Lihat ")
                                                            ]),
                                                            _: 1
                                                          })
                                                        ]),
                                                        _: 1
                                                      }, 8, ["href"])) : createCommentVNode("", true),
                                                      createVNode(unref(Link), {
                                                        href: `/admin/pages/${page.id}/edit`
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode(unref(_sfc_main$q), null, {
                                                            default: withCtx(() => [
                                                              createVNode(unref(Pencil), { class: "h-4 w-4 mr-2" }),
                                                              createTextVNode(" Edit ")
                                                            ]),
                                                            _: 1
                                                          })
                                                        ]),
                                                        _: 1
                                                      }, 8, ["href"]),
                                                      createVNode(unref(_sfc_main$p)),
                                                      unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(_sfc_main$q), {
                                                        key: 1,
                                                        onClick: ($event) => deletePage(page.id),
                                                        class: "text-destructive focus:text-destructive"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode(unref(Trash2), { class: "h-4 w-4 mr-2" }),
                                                          createTextVNode(" Hapus ")
                                                        ]),
                                                        _: 1
                                                      }, 8, ["onClick"])) : createCommentVNode("", true)
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ]),
                                                _: 2
                                              }, 1024)
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
                                          createTextVNode("Judul")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$h), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Slug")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$h), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Template")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$h), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Urutan")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$h), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Status")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$h), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Tanggal Dibuat")
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
                                  __props.pages.data.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$g), { key: 0 }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$j), {
                                        colspan: "7",
                                        class: "text-center py-8 text-muted-foreground"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(FileText), { class: "h-12 w-12 mx-auto mb-2 opacity-20" }),
                                          createVNode("p", null, "Belum ada halaman")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })) : createCommentVNode("", true),
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.pages.data, (page) => {
                                    return openBlock(), createBlock(unref(_sfc_main$g), {
                                      key: page.id
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$j), { class: "font-medium" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(page.title), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$j), null, {
                                          default: withCtx(() => [
                                            createVNode("code", { class: "text-xs bg-muted px-2 py-1 rounded" }, toDisplayString(page.slug), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$j), null, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$k), { variant: "outline" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(getTemplateLabel(page.template)), 1)
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$j), null, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$k), { variant: "secondary" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(page.order), 1)
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$j), null, {
                                          default: withCtx(() => [
                                            page.is_published ? (openBlock(), createBlock(unref(_sfc_main$k), {
                                              key: 0,
                                              variant: "default"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(" Published ")
                                              ]),
                                              _: 1
                                            })) : (openBlock(), createBlock(unref(_sfc_main$k), {
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
                                        createVNode(unref(_sfc_main$j), { class: "text-sm text-muted-foreground" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(new Date(page.created_at).toLocaleDateString("id-ID")), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$l), null, {
                                              default: withCtx(() => [
                                                createVNode(unref(_sfc_main$m), { "as-child": "" }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(_sfc_main$2), {
                                                      variant: "ghost",
                                                      size: "icon"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(unref(MoreVertical), { class: "h-4 w-4" })
                                                      ]),
                                                      _: 1
                                                    })
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(unref(_sfc_main$n), { align: "end" }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(_sfc_main$o), null, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Aksi")
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(unref(_sfc_main$p)),
                                                    unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(Link), {
                                                      key: 0,
                                                      href: `/page/${page.slug}`,
                                                      target: "_blank"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(unref(_sfc_main$q), null, {
                                                          default: withCtx(() => [
                                                            createVNode(unref(Eye), { class: "h-4 w-4 mr-2" }),
                                                            createTextVNode(" Lihat ")
                                                          ]),
                                                          _: 1
                                                        })
                                                      ]),
                                                      _: 1
                                                    }, 8, ["href"])) : createCommentVNode("", true),
                                                    createVNode(unref(Link), {
                                                      href: `/admin/pages/${page.id}/edit`
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(unref(_sfc_main$q), null, {
                                                          default: withCtx(() => [
                                                            createVNode(unref(Pencil), { class: "h-4 w-4 mr-2" }),
                                                            createTextVNode(" Edit ")
                                                          ]),
                                                          _: 1
                                                        })
                                                      ]),
                                                      _: 1
                                                    }, 8, ["href"]),
                                                    createVNode(unref(_sfc_main$p)),
                                                    unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(_sfc_main$q), {
                                                      key: 1,
                                                      onClick: ($event) => deletePage(page.id),
                                                      class: "text-destructive focus:text-destructive"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(unref(Trash2), { class: "h-4 w-4 mr-2" }),
                                                        createTextVNode(" Hapus ")
                                                      ]),
                                                      _: 1
                                                    }, 8, ["onClick"])) : createCommentVNode("", true)
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ]),
                                              _: 2
                                            }, 1024)
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
                                        createTextVNode("Judul")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$h), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Slug")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$h), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Template")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$h), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Urutan")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$h), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Status")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$h), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Tanggal Dibuat")
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
                                __props.pages.data.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$g), { key: 0 }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$j), {
                                      colspan: "7",
                                      class: "text-center py-8 text-muted-foreground"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(FileText), { class: "h-12 w-12 mx-auto mb-2 opacity-20" }),
                                        createVNode("p", null, "Belum ada halaman")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true),
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.pages.data, (page) => {
                                  return openBlock(), createBlock(unref(_sfc_main$g), {
                                    key: page.id
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$j), { class: "font-medium" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(page.title), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$j), null, {
                                        default: withCtx(() => [
                                          createVNode("code", { class: "text-xs bg-muted px-2 py-1 rounded" }, toDisplayString(page.slug), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$j), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$k), { variant: "outline" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(getTemplateLabel(page.template)), 1)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$j), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$k), { variant: "secondary" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(page.order), 1)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$j), null, {
                                        default: withCtx(() => [
                                          page.is_published ? (openBlock(), createBlock(unref(_sfc_main$k), {
                                            key: 0,
                                            variant: "default"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(" Published ")
                                            ]),
                                            _: 1
                                          })) : (openBlock(), createBlock(unref(_sfc_main$k), {
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
                                      createVNode(unref(_sfc_main$j), { class: "text-sm text-muted-foreground" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(new Date(page.created_at).toLocaleDateString("id-ID")), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$l), null, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$m), { "as-child": "" }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(_sfc_main$2), {
                                                    variant: "ghost",
                                                    size: "icon"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(MoreVertical), { class: "h-4 w-4" })
                                                    ]),
                                                    _: 1
                                                  })
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(unref(_sfc_main$n), { align: "end" }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(_sfc_main$o), null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Aksi")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(unref(_sfc_main$p)),
                                                  unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(Link), {
                                                    key: 0,
                                                    href: `/page/${page.slug}`,
                                                    target: "_blank"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(_sfc_main$q), null, {
                                                        default: withCtx(() => [
                                                          createVNode(unref(Eye), { class: "h-4 w-4 mr-2" }),
                                                          createTextVNode(" Lihat ")
                                                        ]),
                                                        _: 1
                                                      })
                                                    ]),
                                                    _: 1
                                                  }, 8, ["href"])) : createCommentVNode("", true),
                                                  createVNode(unref(Link), {
                                                    href: `/admin/pages/${page.id}/edit`
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(_sfc_main$q), null, {
                                                        default: withCtx(() => [
                                                          createVNode(unref(Pencil), { class: "h-4 w-4 mr-2" }),
                                                          createTextVNode(" Edit ")
                                                        ]),
                                                        _: 1
                                                      })
                                                    ]),
                                                    _: 1
                                                  }, 8, ["href"]),
                                                  createVNode(unref(_sfc_main$p)),
                                                  unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(_sfc_main$q), {
                                                    key: 1,
                                                    onClick: ($event) => deletePage(page.id),
                                                    class: "text-destructive focus:text-destructive"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(Trash2), { class: "h-4 w-4 mr-2" }),
                                                      createTextVNode(" Hapus ")
                                                    ]),
                                                    _: 1
                                                  }, 8, ["onClick"])) : createCommentVNode("", true)
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ]),
                                            _: 2
                                          }, 1024)
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
            if (__props.pages.last_page > 1) {
              _push2(`<div class="flex justify-center"${_scopeId}><nav class="flex items-center gap-2"${_scopeId}><!--[-->`);
              ssrRenderList(__props.pages.links, (link, index) => {
                _push2(ssrRenderComponent(unref(_sfc_main$2), {
                  variant: link.active ? "default" : "outline",
                  disabled: !link.url,
                  size: "sm",
                  onClick: ($event) => link.url && unref(router).visit(link.url)
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<span${_scopeId2}>${link.label ?? ""}</span>`);
                    } else {
                      return [
                        createVNode("span", {
                          innerHTML: link.label
                        }, null, 8, ["innerHTML"])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]--></nav></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "container mx-auto py-6 space-y-6" }, [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("div", null, [
                    createVNode("h1", { class: "text-3xl font-bold tracking-tight" }, "Kelola Halaman"),
                    createVNode("p", { class: "text-muted-foreground mt-1" }, " Kelola semua halaman statis di website Anda ")
                  ]),
                  unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(Link), {
                    key: 0,
                    href: "/admin/pages/create"
                  }, {
                    default: withCtx(() => [
                      unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(_sfc_main$2), { key: 0 }, {
                        default: withCtx(() => [
                          createVNode(unref(Plus), { class: "h-4 w-4 mr-2" }),
                          createTextVNode(" Tambah Halaman ")
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
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
                            createTextVNode("Cari dan filter halaman")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex flex-col md:flex-row gap-4" }, [
                          createVNode("div", { class: "flex-1 relative" }, [
                            createVNode(unref(Search), { class: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
                            createVNode(unref(_sfc_main$8), {
                              modelValue: searchQuery.value,
                              "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                              placeholder: "Cari berdasarkan judul atau slug...",
                              class: "pl-10",
                              onKeydown: withKeys(performSearch, ["enter"])
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode(unref(_sfc_main$9), {
                            modelValue: selectedStatus.value,
                            "onUpdate:modelValue": [($event) => selectedStatus.value = $event, performSearch]
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$a), { class: "w-full md:w-[200px]" }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$b), { placeholder: "Status" })
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
                                  createVNode(unref(_sfc_main$d), { value: "published" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Published")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$d), { value: "draft" }, {
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
                          createVNode(unref(_sfc_main$2), { onClick: performSearch }, {
                            default: withCtx(() => [
                              createTextVNode("Cari")
                            ]),
                            _: 1
                          }),
                          hasActiveFilters.value ? (openBlock(), createBlock(unref(_sfc_main$2), {
                            key: 0,
                            onClick: clearFilters,
                            variant: "outline"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Reset ")
                            ]),
                            _: 1
                          })) : createCommentVNode("", true)
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
                                        createTextVNode("Judul")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$h), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Slug")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$h), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Template")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$h), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Urutan")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$h), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Status")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$h), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Tanggal Dibuat")
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
                                __props.pages.data.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$g), { key: 0 }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$j), {
                                      colspan: "7",
                                      class: "text-center py-8 text-muted-foreground"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(FileText), { class: "h-12 w-12 mx-auto mb-2 opacity-20" }),
                                        createVNode("p", null, "Belum ada halaman")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true),
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.pages.data, (page) => {
                                  return openBlock(), createBlock(unref(_sfc_main$g), {
                                    key: page.id
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$j), { class: "font-medium" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(page.title), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$j), null, {
                                        default: withCtx(() => [
                                          createVNode("code", { class: "text-xs bg-muted px-2 py-1 rounded" }, toDisplayString(page.slug), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$j), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$k), { variant: "outline" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(getTemplateLabel(page.template)), 1)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$j), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$k), { variant: "secondary" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(page.order), 1)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$j), null, {
                                        default: withCtx(() => [
                                          page.is_published ? (openBlock(), createBlock(unref(_sfc_main$k), {
                                            key: 0,
                                            variant: "default"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(" Published ")
                                            ]),
                                            _: 1
                                          })) : (openBlock(), createBlock(unref(_sfc_main$k), {
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
                                      createVNode(unref(_sfc_main$j), { class: "text-sm text-muted-foreground" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(new Date(page.created_at).toLocaleDateString("id-ID")), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$l), null, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$m), { "as-child": "" }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(_sfc_main$2), {
                                                    variant: "ghost",
                                                    size: "icon"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(MoreVertical), { class: "h-4 w-4" })
                                                    ]),
                                                    _: 1
                                                  })
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(unref(_sfc_main$n), { align: "end" }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(_sfc_main$o), null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Aksi")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(unref(_sfc_main$p)),
                                                  unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(Link), {
                                                    key: 0,
                                                    href: `/page/${page.slug}`,
                                                    target: "_blank"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(_sfc_main$q), null, {
                                                        default: withCtx(() => [
                                                          createVNode(unref(Eye), { class: "h-4 w-4 mr-2" }),
                                                          createTextVNode(" Lihat ")
                                                        ]),
                                                        _: 1
                                                      })
                                                    ]),
                                                    _: 1
                                                  }, 8, ["href"])) : createCommentVNode("", true),
                                                  createVNode(unref(Link), {
                                                    href: `/admin/pages/${page.id}/edit`
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(_sfc_main$q), null, {
                                                        default: withCtx(() => [
                                                          createVNode(unref(Pencil), { class: "h-4 w-4 mr-2" }),
                                                          createTextVNode(" Edit ")
                                                        ]),
                                                        _: 1
                                                      })
                                                    ]),
                                                    _: 1
                                                  }, 8, ["href"]),
                                                  createVNode(unref(_sfc_main$p)),
                                                  unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(_sfc_main$q), {
                                                    key: 1,
                                                    onClick: ($event) => deletePage(page.id),
                                                    class: "text-destructive focus:text-destructive"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(Trash2), { class: "h-4 w-4 mr-2" }),
                                                      createTextVNode(" Hapus ")
                                                    ]),
                                                    _: 1
                                                  }, 8, ["onClick"])) : createCommentVNode("", true)
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ]),
                                            _: 2
                                          }, 1024)
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
                __props.pages.last_page > 1 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "flex justify-center"
                }, [
                  createVNode("nav", { class: "flex items-center gap-2" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.pages.links, (link, index) => {
                      return openBlock(), createBlock(unref(_sfc_main$2), {
                        key: index,
                        variant: link.active ? "default" : "outline",
                        disabled: !link.url,
                        size: "sm",
                        onClick: ($event) => link.url && unref(router).visit(link.url)
                      }, {
                        default: withCtx(() => [
                          createVNode("span", {
                            innerHTML: link.label
                          }, null, 8, ["innerHTML"])
                        ]),
                        _: 2
                      }, 1032, ["variant", "disabled", "onClick"]);
                    }), 128))
                  ])
                ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Pages/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
