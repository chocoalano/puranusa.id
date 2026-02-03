import { defineComponent, ref, unref, withCtx, createVNode, createTextVNode, withKeys, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { Head, Link, router, useForm } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-B9pGpPI9.js";
import { _ as _sfc_main$3, a as _sfc_main$4, c as _sfc_main$b } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$2 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$5 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$i } from "./index-BpQimeTM.js";
import { _ as _sfc_main$c, a as _sfc_main$d, b as _sfc_main$e, c as _sfc_main$f, d as _sfc_main$g, e as _sfc_main$h } from "./TableHeader-emcE6QAC.js";
import { _ as _sfc_main$6, a as _sfc_main$7, b as _sfc_main$8, c as _sfc_main$9, d as _sfc_main$a } from "./SelectValue-BUnv4mQg.js";
import { _ as _sfc_main$k, b as _sfc_main$l, c as _sfc_main$m, d as _sfc_main$n, e as _sfc_main$o, f as _sfc_main$p, g as _sfc_main$q, h as _sfc_main$r } from "./AlertDialogTrigger-DIWb7xue.js";
import { Plus, Search, Pencil, Trash2 } from "lucide-vue-next";
import { toast } from "vue-sonner";
import { _ as _sfc_main$j } from "./Pagination-DAUeA01Y.js";
import "class-variance-authority";
import "./DropdownMenuTrigger-B1v6pHML.js";
import "reka-ui";
import "@vueuse/core";
import "./index--D7ld9AJ.js";
import "./AvatarImage-DWFQMckn.js";
import "./index-BsP5JKUP.js";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
import "clsx";
import "tailwind-merge";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    certificates: {},
    filters: {}
  },
  setup(__props) {
    const props = __props;
    const searchQuery = ref(props.filters.search || "");
    const typeFilter = ref(props.filters.type || "");
    const deleteId = ref(null);
    const showDeleteDialog = ref(false);
    const formatDate = (date) => {
      if (!date) return "-";
      return new Date(date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
    };
    const handleSearch = () => {
      router.get("/admin/zenner/certificates", {
        search: searchQuery.value,
        type: typeFilter.value
      }, {
        preserveState: true,
        preserveScroll: true
      });
    };
    const confirmDelete = (id) => {
      deleteId.value = id;
      showDeleteDialog.value = true;
    };
    const handleDelete = () => {
      if (deleteId.value) {
        useForm({}).delete(`/admin/zenner/certificates/${deleteId.value}`, {
          preserveScroll: true,
          onSuccess: () => {
            toast.success("Sertifikat berhasil dihapus");
            showDeleteDialog.value = false;
          },
          onError: () => {
            toast.error("Gagal menghapus sertifikat");
          }
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Sertifikat" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="rounded-xl p-4 space-y-6 py-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="text-3xl font-bold"${_scopeId}>Sertifikat</h1><p class="text-muted-foreground"${_scopeId}>Kelola sertifikat Zenner Club</p></div>`);
            _push2(ssrRenderComponent(unref(Link), { href: "/admin/zenner/certificates/create" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$2), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Plus), { class: "h-4 w-4 mr-2" }, null, _parent4, _scopeId3));
                        _push4(` Tambah Sertifikat `);
                      } else {
                        return [
                          createVNode(unref(Plus), { class: "h-4 w-4 mr-2" }),
                          createTextVNode(" Tambah Sertifikat ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$2), null, {
                      default: withCtx(() => [
                        createVNode(unref(Plus), { class: "h-4 w-4 mr-2" }),
                        createTextVNode(" Tambah Sertifikat ")
                      ]),
                      _: 1
                    })
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
                        _push4(`<div class="flex flex-col sm:flex-row gap-4"${_scopeId3}><div class="relative flex-1"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Search), { class: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$5), {
                          modelValue: searchQuery.value,
                          "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                          placeholder: "Cari sertifikat...",
                          class: "pl-9",
                          onKeyup: handleSearch
                        }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$6), {
                          modelValue: typeFilter.value,
                          "onUpdate:modelValue": [($event) => typeFilter.value = $event, handleSearch]
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$7), { class: "w-48" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$8), { placeholder: "Semua Tipe" }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$8), { placeholder: "Semua Tipe" })
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
                                          _push7(`Semua Tipe`);
                                        } else {
                                          return [
                                            createTextVNode("Semua Tipe")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$a), { value: "completion" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Completion`);
                                        } else {
                                          return [
                                            createTextVNode("Completion")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$a), { value: "achievement" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Achievement`);
                                        } else {
                                          return [
                                            createTextVNode("Achievement")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$a), { value: "participation" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Participation`);
                                        } else {
                                          return [
                                            createTextVNode("Participation")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$a), { value: "" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Semua Tipe")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$a), { value: "completion" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Completion")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$a), { value: "achievement" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Achievement")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$a), { value: "participation" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Participation")
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
                                createVNode(unref(_sfc_main$7), { class: "w-48" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$8), { placeholder: "Semua Tipe" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$9), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$a), { value: "" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Semua Tipe")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$a), { value: "completion" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Completion")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$a), { value: "achievement" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Achievement")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$a), { value: "participation" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Participation")
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
                        _push4(ssrRenderComponent(unref(_sfc_main$2), { onClick: handleSearch }, {
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
                              createVNode(unref(_sfc_main$5), {
                                modelValue: searchQuery.value,
                                "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                                placeholder: "Cari sertifikat...",
                                class: "pl-9",
                                onKeyup: withKeys(handleSearch, ["enter"])
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode(unref(_sfc_main$6), {
                              modelValue: typeFilter.value,
                              "onUpdate:modelValue": [($event) => typeFilter.value = $event, handleSearch]
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$7), { class: "w-48" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$8), { placeholder: "Semua Tipe" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$9), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$a), { value: "" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Semua Tipe")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$a), { value: "completion" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Completion")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$a), { value: "achievement" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Achievement")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$a), { value: "participation" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Participation")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(unref(_sfc_main$2), { onClick: handleSearch }, {
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
                                                _push8(`Tipe`);
                                              } else {
                                                return [
                                                  createTextVNode("Tipe")
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
                                                createTextVNode("Tipe")
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
                                              createTextVNode("Tipe")
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
                                    ssrRenderList(__props.certificates.data, (cert) => {
                                      _push6(ssrRenderComponent(unref(_sfc_main$e), {
                                        key: cert.id
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(unref(_sfc_main$h), { class: "font-medium" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(cert.title)}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(cert.title), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$h), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(unref(_sfc_main$i), { variant: "outline" }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`${ssrInterpolate(cert.type)}`);
                                                      } else {
                                                        return [
                                                          createTextVNode(toDisplayString(cert.type), 1)
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                } else {
                                                  return [
                                                    createVNode(unref(_sfc_main$i), { variant: "outline" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(cert.type), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$h), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(unref(_sfc_main$i), {
                                                    variant: cert.is_active ? "default" : "secondary"
                                                  }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`${ssrInterpolate(cert.is_active ? "Aktif" : "Nonaktif")}`);
                                                      } else {
                                                        return [
                                                          createTextVNode(toDisplayString(cert.is_active ? "Aktif" : "Nonaktif"), 1)
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                } else {
                                                  return [
                                                    createVNode(unref(_sfc_main$i), {
                                                      variant: cert.is_active ? "default" : "secondary"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(cert.is_active ? "Aktif" : "Nonaktif"), 1)
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
                                                  _push8(`${ssrInterpolate(formatDate(cert.created_at))}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(formatDate(cert.created_at)), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$h), { class: "text-right" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`<div class="flex items-center justify-end gap-2"${_scopeId7}>`);
                                                  _push8(ssrRenderComponent(unref(Link), {
                                                    href: `/admin/zenner/certificates/${cert.id}/edit`
                                                  }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(ssrRenderComponent(unref(_sfc_main$2), {
                                                          variant: "outline",
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
                                                            variant: "outline",
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
                                                  _push8(ssrRenderComponent(unref(_sfc_main$2), {
                                                    variant: "outline",
                                                    size: "icon",
                                                    onClick: ($event) => confirmDelete(cert.id)
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
                                                    createVNode("div", { class: "flex items-center justify-end gap-2" }, [
                                                      createVNode(unref(Link), {
                                                        href: `/admin/zenner/certificates/${cert.id}/edit`
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode(unref(_sfc_main$2), {
                                                            variant: "outline",
                                                            size: "icon"
                                                          }, {
                                                            default: withCtx(() => [
                                                              createVNode(unref(Pencil), { class: "h-4 w-4" })
                                                            ]),
                                                            _: 1
                                                          })
                                                        ]),
                                                        _: 1
                                                      }, 8, ["href"]),
                                                      createVNode(unref(_sfc_main$2), {
                                                        variant: "outline",
                                                        size: "icon",
                                                        onClick: ($event) => confirmDelete(cert.id)
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
                                              createVNode(unref(_sfc_main$h), { class: "font-medium" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(cert.title), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$h), null, {
                                                default: withCtx(() => [
                                                  createVNode(unref(_sfc_main$i), { variant: "outline" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(cert.type), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$h), null, {
                                                default: withCtx(() => [
                                                  createVNode(unref(_sfc_main$i), {
                                                    variant: cert.is_active ? "default" : "secondary"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(cert.is_active ? "Aktif" : "Nonaktif"), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["variant"])
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$h), null, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(formatDate(cert.created_at)), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                                default: withCtx(() => [
                                                  createVNode("div", { class: "flex items-center justify-end gap-2" }, [
                                                    createVNode(unref(Link), {
                                                      href: `/admin/zenner/certificates/${cert.id}/edit`
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(unref(_sfc_main$2), {
                                                          variant: "outline",
                                                          size: "icon"
                                                        }, {
                                                          default: withCtx(() => [
                                                            createVNode(unref(Pencil), { class: "h-4 w-4" })
                                                          ]),
                                                          _: 1
                                                        })
                                                      ]),
                                                      _: 1
                                                    }, 8, ["href"]),
                                                    createVNode(unref(_sfc_main$2), {
                                                      variant: "outline",
                                                      size: "icon",
                                                      onClick: ($event) => confirmDelete(cert.id)
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
                                    if (__props.certificates.data.length === 0) {
                                      _push6(ssrRenderComponent(unref(_sfc_main$e), null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(unref(_sfc_main$h), {
                                              colspan: "5",
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
                                              createVNode(unref(_sfc_main$h), {
                                                colspan: "5",
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
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.certificates.data, (cert) => {
                                        return openBlock(), createBlock(unref(_sfc_main$e), {
                                          key: cert.id
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$h), { class: "font-medium" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(cert.title), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$h), null, {
                                              default: withCtx(() => [
                                                createVNode(unref(_sfc_main$i), { variant: "outline" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(cert.type), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$h), null, {
                                              default: withCtx(() => [
                                                createVNode(unref(_sfc_main$i), {
                                                  variant: cert.is_active ? "default" : "secondary"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(cert.is_active ? "Aktif" : "Nonaktif"), 1)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["variant"])
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$h), null, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(formatDate(cert.created_at)), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "flex items-center justify-end gap-2" }, [
                                                  createVNode(unref(Link), {
                                                    href: `/admin/zenner/certificates/${cert.id}/edit`
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(_sfc_main$2), {
                                                        variant: "outline",
                                                        size: "icon"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode(unref(Pencil), { class: "h-4 w-4" })
                                                        ]),
                                                        _: 1
                                                      })
                                                    ]),
                                                    _: 1
                                                  }, 8, ["href"]),
                                                  createVNode(unref(_sfc_main$2), {
                                                    variant: "outline",
                                                    size: "icon",
                                                    onClick: ($event) => confirmDelete(cert.id)
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
                                      __props.certificates.data.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$e), { key: 0 }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$h), {
                                            colspan: "5",
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
                                            createTextVNode("Tipe")
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
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.certificates.data, (cert) => {
                                      return openBlock(), createBlock(unref(_sfc_main$e), {
                                        key: cert.id
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$h), { class: "font-medium" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(cert.title), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$h), null, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$i), { variant: "outline" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(cert.type), 1)
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$h), null, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$i), {
                                                variant: cert.is_active ? "default" : "secondary"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(cert.is_active ? "Aktif" : "Nonaktif"), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["variant"])
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$h), null, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(formatDate(cert.created_at)), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "flex items-center justify-end gap-2" }, [
                                                createVNode(unref(Link), {
                                                  href: `/admin/zenner/certificates/${cert.id}/edit`
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(_sfc_main$2), {
                                                      variant: "outline",
                                                      size: "icon"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(unref(Pencil), { class: "h-4 w-4" })
                                                      ]),
                                                      _: 1
                                                    })
                                                  ]),
                                                  _: 1
                                                }, 8, ["href"]),
                                                createVNode(unref(_sfc_main$2), {
                                                  variant: "outline",
                                                  size: "icon",
                                                  onClick: ($event) => confirmDelete(cert.id)
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
                                    __props.certificates.data.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$e), { key: 0 }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$h), {
                                          colspan: "5",
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
                        if (__props.certificates.last_page > 1) {
                          _push4(ssrRenderComponent(_sfc_main$j, {
                            data: __props.certificates,
                            url: "/admin/zenner/certificates",
                            filters: __props.filters
                          }, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div>`);
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
                                          createTextVNode("Tipe")
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
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.certificates.data, (cert) => {
                                    return openBlock(), createBlock(unref(_sfc_main$e), {
                                      key: cert.id
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$h), { class: "font-medium" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(cert.title), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$h), null, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$i), { variant: "outline" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(cert.type), 1)
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$h), null, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$i), {
                                              variant: cert.is_active ? "default" : "secondary"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(cert.is_active ? "Aktif" : "Nonaktif"), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["variant"])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$h), null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(formatDate(cert.created_at)), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "flex items-center justify-end gap-2" }, [
                                              createVNode(unref(Link), {
                                                href: `/admin/zenner/certificates/${cert.id}/edit`
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(_sfc_main$2), {
                                                    variant: "outline",
                                                    size: "icon"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(Pencil), { class: "h-4 w-4" })
                                                    ]),
                                                    _: 1
                                                  })
                                                ]),
                                                _: 1
                                              }, 8, ["href"]),
                                              createVNode(unref(_sfc_main$2), {
                                                variant: "outline",
                                                size: "icon",
                                                onClick: ($event) => confirmDelete(cert.id)
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
                                  __props.certificates.data.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$e), { key: 0 }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$h), {
                                        colspan: "5",
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
                            __props.certificates.last_page > 1 ? (openBlock(), createBlock(_sfc_main$j, {
                              key: 0,
                              data: __props.certificates,
                              url: "/admin/zenner/certificates",
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
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex flex-col sm:flex-row gap-4" }, [
                          createVNode("div", { class: "relative flex-1" }, [
                            createVNode(unref(Search), { class: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
                            createVNode(unref(_sfc_main$5), {
                              modelValue: searchQuery.value,
                              "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                              placeholder: "Cari sertifikat...",
                              class: "pl-9",
                              onKeyup: withKeys(handleSearch, ["enter"])
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode(unref(_sfc_main$6), {
                            modelValue: typeFilter.value,
                            "onUpdate:modelValue": [($event) => typeFilter.value = $event, handleSearch]
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$7), { class: "w-48" }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$8), { placeholder: "Semua Tipe" })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$9), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$a), { value: "" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Semua Tipe")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$a), { value: "completion" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Completion")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$a), { value: "achievement" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Achievement")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$a), { value: "participation" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Participation")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(unref(_sfc_main$2), { onClick: handleSearch }, {
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
                                        createTextVNode("Tipe")
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
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.certificates.data, (cert) => {
                                  return openBlock(), createBlock(unref(_sfc_main$e), {
                                    key: cert.id
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$h), { class: "font-medium" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(cert.title), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$h), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$i), { variant: "outline" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(cert.type), 1)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$h), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$i), {
                                            variant: cert.is_active ? "default" : "secondary"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(cert.is_active ? "Aktif" : "Nonaktif"), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["variant"])
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$h), null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(formatDate(cert.created_at)), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "flex items-center justify-end gap-2" }, [
                                            createVNode(unref(Link), {
                                              href: `/admin/zenner/certificates/${cert.id}/edit`
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(_sfc_main$2), {
                                                  variant: "outline",
                                                  size: "icon"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(Pencil), { class: "h-4 w-4" })
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 1
                                            }, 8, ["href"]),
                                            createVNode(unref(_sfc_main$2), {
                                              variant: "outline",
                                              size: "icon",
                                              onClick: ($event) => confirmDelete(cert.id)
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
                                __props.certificates.data.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$e), { key: 0 }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$h), {
                                      colspan: "5",
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
                          __props.certificates.last_page > 1 ? (openBlock(), createBlock(_sfc_main$j, {
                            key: 0,
                            data: __props.certificates,
                            url: "/admin/zenner/certificates",
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
            _push2(ssrRenderComponent(unref(_sfc_main$k), {
              open: showDeleteDialog.value,
              "onUpdate:open": ($event) => showDeleteDialog.value = $event
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$l), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$m), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$n), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Hapus Sertifikat`);
                                  } else {
                                    return [
                                      createTextVNode("Hapus Sertifikat")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$o), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Apakah Anda yakin ingin menghapus sertifikat ini? Tindakan ini tidak dapat dibatalkan. `);
                                  } else {
                                    return [
                                      createTextVNode(" Apakah Anda yakin ingin menghapus sertifikat ini? Tindakan ini tidak dapat dibatalkan. ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$n), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Hapus Sertifikat")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$o), null, {
                                  default: withCtx(() => [
                                    createTextVNode(" Apakah Anda yakin ingin menghapus sertifikat ini? Tindakan ini tidak dapat dibatalkan. ")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$p), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$q), null, {
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
                              _push5(ssrRenderComponent(unref(_sfc_main$r), { onClick: handleDelete }, {
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
                                createVNode(unref(_sfc_main$q), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Batal")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$r), { onClick: handleDelete }, {
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
                          createVNode(unref(_sfc_main$m), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$n), null, {
                                default: withCtx(() => [
                                  createTextVNode("Hapus Sertifikat")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$o), null, {
                                default: withCtx(() => [
                                  createTextVNode(" Apakah Anda yakin ingin menghapus sertifikat ini? Tindakan ini tidak dapat dibatalkan. ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$p), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$q), null, {
                                default: withCtx(() => [
                                  createTextVNode("Batal")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$r), { onClick: handleDelete }, {
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
                    createVNode(unref(_sfc_main$l), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$m), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$n), null, {
                              default: withCtx(() => [
                                createTextVNode("Hapus Sertifikat")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$o), null, {
                              default: withCtx(() => [
                                createTextVNode(" Apakah Anda yakin ingin menghapus sertifikat ini? Tindakan ini tidak dapat dibatalkan. ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$p), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$q), null, {
                              default: withCtx(() => [
                                createTextVNode("Batal")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$r), { onClick: handleDelete }, {
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
              createVNode("div", { class: "rounded-xl p-4 space-y-6 py-6" }, [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("div", null, [
                    createVNode("h1", { class: "text-3xl font-bold" }, "Sertifikat"),
                    createVNode("p", { class: "text-muted-foreground" }, "Kelola sertifikat Zenner Club")
                  ]),
                  createVNode(unref(Link), { href: "/admin/zenner/certificates/create" }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$2), null, {
                        default: withCtx(() => [
                          createVNode(unref(Plus), { class: "h-4 w-4 mr-2" }),
                          createTextVNode(" Tambah Sertifikat ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                createVNode(unref(_sfc_main$3), null, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex flex-col sm:flex-row gap-4" }, [
                          createVNode("div", { class: "relative flex-1" }, [
                            createVNode(unref(Search), { class: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
                            createVNode(unref(_sfc_main$5), {
                              modelValue: searchQuery.value,
                              "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                              placeholder: "Cari sertifikat...",
                              class: "pl-9",
                              onKeyup: withKeys(handleSearch, ["enter"])
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode(unref(_sfc_main$6), {
                            modelValue: typeFilter.value,
                            "onUpdate:modelValue": [($event) => typeFilter.value = $event, handleSearch]
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$7), { class: "w-48" }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$8), { placeholder: "Semua Tipe" })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$9), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$a), { value: "" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Semua Tipe")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$a), { value: "completion" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Completion")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$a), { value: "achievement" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Achievement")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$a), { value: "participation" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Participation")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(unref(_sfc_main$2), { onClick: handleSearch }, {
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
                                        createTextVNode("Tipe")
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
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.certificates.data, (cert) => {
                                  return openBlock(), createBlock(unref(_sfc_main$e), {
                                    key: cert.id
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$h), { class: "font-medium" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(cert.title), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$h), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$i), { variant: "outline" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(cert.type), 1)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$h), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$i), {
                                            variant: cert.is_active ? "default" : "secondary"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(cert.is_active ? "Aktif" : "Nonaktif"), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["variant"])
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$h), null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(formatDate(cert.created_at)), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$h), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "flex items-center justify-end gap-2" }, [
                                            createVNode(unref(Link), {
                                              href: `/admin/zenner/certificates/${cert.id}/edit`
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(_sfc_main$2), {
                                                  variant: "outline",
                                                  size: "icon"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(Pencil), { class: "h-4 w-4" })
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 1
                                            }, 8, ["href"]),
                                            createVNode(unref(_sfc_main$2), {
                                              variant: "outline",
                                              size: "icon",
                                              onClick: ($event) => confirmDelete(cert.id)
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
                                __props.certificates.data.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$e), { key: 0 }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$h), {
                                      colspan: "5",
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
                          __props.certificates.last_page > 1 ? (openBlock(), createBlock(_sfc_main$j, {
                            key: 0,
                            data: __props.certificates,
                            url: "/admin/zenner/certificates",
                            filters: __props.filters
                          }, null, 8, ["data", "filters"])) : createCommentVNode("", true)
                        ])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              createVNode(unref(_sfc_main$k), {
                open: showDeleteDialog.value,
                "onUpdate:open": ($event) => showDeleteDialog.value = $event
              }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$l), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$m), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$n), null, {
                            default: withCtx(() => [
                              createTextVNode("Hapus Sertifikat")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$o), null, {
                            default: withCtx(() => [
                              createTextVNode(" Apakah Anda yakin ingin menghapus sertifikat ini? Tindakan ini tidak dapat dibatalkan. ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$p), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$q), null, {
                            default: withCtx(() => [
                              createTextVNode("Batal")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$r), { onClick: handleDelete }, {
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
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Zenner/Certificate/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
