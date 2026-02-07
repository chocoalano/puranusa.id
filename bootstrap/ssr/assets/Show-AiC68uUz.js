import { defineComponent, computed, unref, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-DTAmF_5Z.js";
import { _ as _sfc_main$2 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5, d as _sfc_main$6, c as _sfc_main$7 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$8 } from "./index-BpQimeTM.js";
import { ArrowLeft, Pencil } from "lucide-vue-next";
import { u as usePermissions } from "./usePermissions-DYRibCI0.js";
import "class-variance-authority";
import "./DropdownMenuTrigger-B1v6pHML.js";
import "reka-ui";
import "@vueuse/core";
import "./Input-BGi8wCMh.js";
import "./index-3UqiGNe9.js";
import "./AvatarImage-DWFQMckn.js";
import "./index-Bfu0FVt6.js";
import "vue-sonner";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
import "clsx";
import "tailwind-merge";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    category: {},
    contents: {}
  },
  setup(__props) {
    const props = __props;
    const { isSuperAdmin, isAdmin } = usePermissions();
    const totalContents = computed(() => props.contents.length);
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
    };
    const getFileUrl = (file) => {
      if (!file) return null;
      if (file.startsWith("http")) return file;
      return `/storage/${file}`;
    };
    const getFileExtension = (file) => {
      if (!file) return "";
      const clean = file.split("?")[0].split("#")[0];
      return clean.split(".").pop()?.toLowerCase() ?? "";
    };
    const isImageFile = (file) => {
      const ext = getFileExtension(file);
      return ["jpg", "jpeg", "png", "webp", "gif", "svg"].includes(ext);
    };
    const isVideoFile = (file) => {
      const ext = getFileExtension(file);
      return ["mp4", "mov", "avi", "webm", "mkv"].includes(ext);
    };
    const isPdfFile = (file) => getFileExtension(file) === "pdf";
    const isDocumentFile = (file) => {
      const ext = getFileExtension(file);
      return ["doc", "docx", "xls", "xlsx", "ppt", "pptx", "txt"].includes(ext);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: `Zenner Club - ${__props.category.name}`
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="container mx-auto py-6 space-y-6"${_scopeId}><div class="flex flex-wrap items-center justify-between gap-4"${_scopeId}><div class="flex items-center gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), { href: "/admin/zenner-club/categories" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$2), {
                    variant: "outline",
                    size: "icon"
                  }, {
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
                    createVNode(unref(_sfc_main$2), {
                      variant: "outline",
                      size: "icon"
                    }, {
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
            _push2(`<div${_scopeId}><h1 class="text-3xl font-bold"${_scopeId}>${ssrInterpolate(__props.category.name)}</h1><p class="text-muted-foreground"${_scopeId}>Detail kategori Zenner Club</p></div></div>`);
            if (unref(isSuperAdmin) || unref(isAdmin)) {
              _push2(ssrRenderComponent(unref(Link), {
                href: `/admin/zenner-club/categories/${__props.category.id}/edit`
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$2), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Pencil), { class: "mr-2 h-4 w-4" }, null, _parent4, _scopeId3));
                          _push4(` Edit Kategori `);
                        } else {
                          return [
                            createVNode(unref(Pencil), { class: "mr-2 h-4 w-4" }),
                            createTextVNode(" Edit Kategori ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$2), null, {
                        default: withCtx(() => [
                          createVNode(unref(Pencil), { class: "mr-2 h-4 w-4" }),
                          createTextVNode(" Edit Kategori ")
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
                              _push5(`${ssrInterpolate(__props.category.name)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(__props.category.name), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(__props.category.slug)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(__props.category.slug), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(__props.category.name), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(__props.category.slug), 1)
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { class: "flex flex-wrap gap-3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { variant: "outline" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(__props.category.parent?.name || "Tanpa Parent")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(__props.category.parent?.name || "Tanpa Parent"), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { variant: "outline" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Total Konten: ${ssrInterpolate(totalContents.value)}`);
                            } else {
                              return [
                                createTextVNode(" Total Konten: " + toDisplayString(totalContents.value), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$8), { variant: "outline" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(__props.category.parent?.name || "Tanpa Parent"), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$8), { variant: "outline" }, {
                            default: withCtx(() => [
                              createTextVNode(" Total Konten: " + toDisplayString(totalContents.value), 1)
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
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(__props.category.name), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(__props.category.slug), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), { class: "flex flex-wrap gap-3" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$8), { variant: "outline" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(__props.category.parent?.name || "Tanpa Parent"), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), { variant: "outline" }, {
                          default: withCtx(() => [
                            createTextVNode(" Total Konten: " + toDisplayString(totalContents.value), 1)
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
            _push2(`<div class="space-y-4"${_scopeId}><div${_scopeId}><h2 class="text-xl font-semibold"${_scopeId}>Konten</h2><p class="text-muted-foreground"${_scopeId}>Menampilkan data lengkap berdasarkan kategori ini.</p></div>`);
            if (!__props.contents.length) {
              _push2(ssrRenderComponent(unref(_sfc_main$3), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$7), { class: "py-6 text-sm text-muted-foreground" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Belum ada konten untuk kategori ini. `);
                        } else {
                          return [
                            createTextVNode(" Belum ada konten untuk kategori ini. ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$7), { class: "py-6 text-sm text-muted-foreground" }, {
                        default: withCtx(() => [
                          createTextVNode(" Belum ada konten untuk kategori ini. ")
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
            _push2(`<!--[-->`);
            ssrRenderList(__props.contents, (item) => {
              _push2(ssrRenderComponent(unref(_sfc_main$3), {
                key: item.id
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$4), { class: "flex flex-wrap items-start justify-between gap-4" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div${_scopeId3}>`);
                          _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(item.title)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(item.title), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(item.slug)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(item.slug), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                          if (unref(isSuperAdmin) || unref(isAdmin)) {
                            _push4(ssrRenderComponent(unref(Link), {
                              href: `/admin/zenner-club/contents/${item.id}/edit`
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(unref(_sfc_main$2), { size: "sm" }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(unref(Pencil), { class: "mr-2 h-4 w-4" }, null, _parent6, _scopeId5));
                                        _push6(` Edit Konten `);
                                      } else {
                                        return [
                                          createVNode(unref(Pencil), { class: "mr-2 h-4 w-4" }),
                                          createTextVNode(" Edit Konten ")
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(unref(_sfc_main$2), { size: "sm" }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Pencil), { class: "mr-2 h-4 w-4" }),
                                        createTextVNode(" Edit Konten ")
                                      ]),
                                      _: 1
                                    })
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            _push4(`<!---->`);
                          }
                        } else {
                          return [
                            createVNode("div", null, [
                              createVNode(unref(_sfc_main$5), null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.title), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$6), null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.slug), 1)
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(Link), {
                              key: 0,
                              href: `/admin/zenner-club/contents/${item.id}/edit`
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$2), { size: "sm" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Pencil), { class: "mr-2 h-4 w-4" }),
                                    createTextVNode(" Edit Konten ")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["href"])) : createCommentVNode("", true)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$7), { class: "space-y-4" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="flex flex-wrap gap-3"${_scopeId3}>`);
                          if (item.status === "published") {
                            _push4(ssrRenderComponent(unref(_sfc_main$8), { variant: "default" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`Published`);
                                } else {
                                  return [
                                    createTextVNode("Published")
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else if (item.status === "draft") {
                            _push4(ssrRenderComponent(unref(_sfc_main$8), { variant: "secondary" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`Draft`);
                                } else {
                                  return [
                                    createTextVNode("Draft")
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            _push4(ssrRenderComponent(unref(_sfc_main$8), { variant: "outline" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(item.status || "Draft")}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(item.status || "Draft"), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          }
                          _push4(ssrRenderComponent(unref(_sfc_main$8), { variant: "outline" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Dibuat ${ssrInterpolate(formatDate(item.created_at))}`);
                              } else {
                                return [
                                  createTextVNode("Dibuat " + toDisplayString(formatDate(item.created_at)), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          if (item.creator?.name) {
                            _push4(ssrRenderComponent(unref(_sfc_main$8), { variant: "outline" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`Oleh ${ssrInterpolate(item.creator.name)}`);
                                } else {
                                  return [
                                    createTextVNode("Oleh " + toDisplayString(item.creator.name), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`</div><div class="space-y-2"${_scopeId3}><p class="text-sm text-muted-foreground"${_scopeId3}>Video Link</p>`);
                          if (item.vlink) {
                            _push4(`<p class="text-sm"${_scopeId3}><a${ssrRenderAttr("href", item.vlink)} target="_blank" class="text-primary underline"${_scopeId3}>${ssrInterpolate(item.vlink)}</a></p>`);
                          } else {
                            _push4(`<p class="text-sm text-muted-foreground"${_scopeId3}>-</p>`);
                          }
                          _push4(`</div>`);
                          if (item.file) {
                            _push4(`<div class="space-y-2"${_scopeId3}><p class="text-sm text-muted-foreground"${_scopeId3}>File Lampiran</p>`);
                            if (isPdfFile(item.file)) {
                              _push4(`<div class="space-y-3"${_scopeId3}><iframe${ssrRenderAttr("src", getFileUrl(item.file) || "")} class="h-[420px] w-full rounded-md border" title="PDF Viewer"${_scopeId3}></iframe><a${ssrRenderAttr("href", getFileUrl(item.file) || "")} class="text-sm text-primary underline" download${_scopeId3}> Download PDF </a></div>`);
                            } else if (isVideoFile(item.file)) {
                              _push4(`<div class="space-y-2"${_scopeId3}><video${ssrRenderAttr("src", getFileUrl(item.file) || "")} class="w-full rounded-md border" autoplay muted playsinline controls${_scopeId3}></video><a${ssrRenderAttr("href", getFileUrl(item.file) || "")} class="text-sm text-primary underline" download${_scopeId3}> Download Video </a></div>`);
                            } else if (isImageFile(item.file)) {
                              _push4(`<div class="space-y-2"${_scopeId3}><img${ssrRenderAttr("src", getFileUrl(item.file) || "")} alt="Lampiran" class="max-h-[480px] w-full rounded-md border object-contain"${_scopeId3}><a${ssrRenderAttr("href", getFileUrl(item.file) || "")} class="text-sm text-primary underline" download${_scopeId3}> Download Gambar </a></div>`);
                            } else if (isDocumentFile(item.file)) {
                              _push4(`<div class="space-y-2"${_scopeId3}><a${ssrRenderAttr("href", getFileUrl(item.file) || "")} class="text-sm text-primary underline" download${_scopeId3}> Download Dokumen </a></div>`);
                            } else {
                              _push4(`<div class="space-y-2"${_scopeId3}><a${ssrRenderAttr("href", getFileUrl(item.file) || "")} class="text-sm text-primary underline" download${_scopeId3}> Download File </a></div>`);
                            }
                            _push4(`</div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`<div class="space-y-2"${_scopeId3}><p class="text-sm text-muted-foreground"${_scopeId3}>Deskripsi</p><div class="prose max-w-none"${_scopeId3}>${(item.content || "<p>-</p>") ?? ""}</div></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "flex flex-wrap gap-3" }, [
                              item.status === "published" ? (openBlock(), createBlock(unref(_sfc_main$8), {
                                key: 0,
                                variant: "default"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Published")
                                ]),
                                _: 1
                              })) : item.status === "draft" ? (openBlock(), createBlock(unref(_sfc_main$8), {
                                key: 1,
                                variant: "secondary"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Draft")
                                ]),
                                _: 1
                              })) : (openBlock(), createBlock(unref(_sfc_main$8), {
                                key: 2,
                                variant: "outline"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.status || "Draft"), 1)
                                ]),
                                _: 2
                              }, 1024)),
                              createVNode(unref(_sfc_main$8), { variant: "outline" }, {
                                default: withCtx(() => [
                                  createTextVNode("Dibuat " + toDisplayString(formatDate(item.created_at)), 1)
                                ]),
                                _: 2
                              }, 1024),
                              item.creator?.name ? (openBlock(), createBlock(unref(_sfc_main$8), {
                                key: 3,
                                variant: "outline"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Oleh " + toDisplayString(item.creator.name), 1)
                                ]),
                                _: 2
                              }, 1024)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode("p", { class: "text-sm text-muted-foreground" }, "Video Link"),
                              item.vlink ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm"
                              }, [
                                createVNode("a", {
                                  href: item.vlink,
                                  target: "_blank",
                                  class: "text-primary underline"
                                }, toDisplayString(item.vlink), 9, ["href"])
                              ])) : (openBlock(), createBlock("p", {
                                key: 1,
                                class: "text-sm text-muted-foreground"
                              }, "-"))
                            ]),
                            item.file ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "space-y-2"
                            }, [
                              createVNode("p", { class: "text-sm text-muted-foreground" }, "File Lampiran"),
                              isPdfFile(item.file) ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "space-y-3"
                              }, [
                                createVNode("iframe", {
                                  src: getFileUrl(item.file) || "",
                                  class: "h-[420px] w-full rounded-md border",
                                  title: "PDF Viewer"
                                }, null, 8, ["src"]),
                                createVNode("a", {
                                  href: getFileUrl(item.file) || "",
                                  class: "text-sm text-primary underline",
                                  download: ""
                                }, " Download PDF ", 8, ["href"])
                              ])) : isVideoFile(item.file) ? (openBlock(), createBlock("div", {
                                key: 1,
                                class: "space-y-2"
                              }, [
                                createVNode("video", {
                                  src: getFileUrl(item.file) || "",
                                  class: "w-full rounded-md border",
                                  autoplay: "",
                                  muted: "",
                                  playsinline: "",
                                  controls: ""
                                }, null, 8, ["src"]),
                                createVNode("a", {
                                  href: getFileUrl(item.file) || "",
                                  class: "text-sm text-primary underline",
                                  download: ""
                                }, " Download Video ", 8, ["href"])
                              ])) : isImageFile(item.file) ? (openBlock(), createBlock("div", {
                                key: 2,
                                class: "space-y-2"
                              }, [
                                createVNode("img", {
                                  src: getFileUrl(item.file) || "",
                                  alt: "Lampiran",
                                  class: "max-h-[480px] w-full rounded-md border object-contain"
                                }, null, 8, ["src"]),
                                createVNode("a", {
                                  href: getFileUrl(item.file) || "",
                                  class: "text-sm text-primary underline",
                                  download: ""
                                }, " Download Gambar ", 8, ["href"])
                              ])) : isDocumentFile(item.file) ? (openBlock(), createBlock("div", {
                                key: 3,
                                class: "space-y-2"
                              }, [
                                createVNode("a", {
                                  href: getFileUrl(item.file) || "",
                                  class: "text-sm text-primary underline",
                                  download: ""
                                }, " Download Dokumen ", 8, ["href"])
                              ])) : (openBlock(), createBlock("div", {
                                key: 4,
                                class: "space-y-2"
                              }, [
                                createVNode("a", {
                                  href: getFileUrl(item.file) || "",
                                  class: "text-sm text-primary underline",
                                  download: ""
                                }, " Download File ", 8, ["href"])
                              ]))
                            ])) : createCommentVNode("", true),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode("p", { class: "text-sm text-muted-foreground" }, "Deskripsi"),
                              createVNode("div", {
                                class: "prose max-w-none",
                                innerHTML: item.content || "<p>-</p>"
                              }, null, 8, ["innerHTML"])
                            ])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$4), { class: "flex flex-wrap items-start justify-between gap-4" }, {
                        default: withCtx(() => [
                          createVNode("div", null, [
                            createVNode(unref(_sfc_main$5), null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item.title), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(unref(_sfc_main$6), null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item.slug), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(Link), {
                            key: 0,
                            href: `/admin/zenner-club/contents/${item.id}/edit`
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$2), { size: "sm" }, {
                                default: withCtx(() => [
                                  createVNode(unref(Pencil), { class: "mr-2 h-4 w-4" }),
                                  createTextVNode(" Edit Konten ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["href"])) : createCommentVNode("", true)
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex flex-wrap gap-3" }, [
                            item.status === "published" ? (openBlock(), createBlock(unref(_sfc_main$8), {
                              key: 0,
                              variant: "default"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Published")
                              ]),
                              _: 1
                            })) : item.status === "draft" ? (openBlock(), createBlock(unref(_sfc_main$8), {
                              key: 1,
                              variant: "secondary"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Draft")
                              ]),
                              _: 1
                            })) : (openBlock(), createBlock(unref(_sfc_main$8), {
                              key: 2,
                              variant: "outline"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item.status || "Draft"), 1)
                              ]),
                              _: 2
                            }, 1024)),
                            createVNode(unref(_sfc_main$8), { variant: "outline" }, {
                              default: withCtx(() => [
                                createTextVNode("Dibuat " + toDisplayString(formatDate(item.created_at)), 1)
                              ]),
                              _: 2
                            }, 1024),
                            item.creator?.name ? (openBlock(), createBlock(unref(_sfc_main$8), {
                              key: 3,
                              variant: "outline"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Oleh " + toDisplayString(item.creator.name), 1)
                              ]),
                              _: 2
                            }, 1024)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("p", { class: "text-sm text-muted-foreground" }, "Video Link"),
                            item.vlink ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm"
                            }, [
                              createVNode("a", {
                                href: item.vlink,
                                target: "_blank",
                                class: "text-primary underline"
                              }, toDisplayString(item.vlink), 9, ["href"])
                            ])) : (openBlock(), createBlock("p", {
                              key: 1,
                              class: "text-sm text-muted-foreground"
                            }, "-"))
                          ]),
                          item.file ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "space-y-2"
                          }, [
                            createVNode("p", { class: "text-sm text-muted-foreground" }, "File Lampiran"),
                            isPdfFile(item.file) ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "space-y-3"
                            }, [
                              createVNode("iframe", {
                                src: getFileUrl(item.file) || "",
                                class: "h-[420px] w-full rounded-md border",
                                title: "PDF Viewer"
                              }, null, 8, ["src"]),
                              createVNode("a", {
                                href: getFileUrl(item.file) || "",
                                class: "text-sm text-primary underline",
                                download: ""
                              }, " Download PDF ", 8, ["href"])
                            ])) : isVideoFile(item.file) ? (openBlock(), createBlock("div", {
                              key: 1,
                              class: "space-y-2"
                            }, [
                              createVNode("video", {
                                src: getFileUrl(item.file) || "",
                                class: "w-full rounded-md border",
                                autoplay: "",
                                muted: "",
                                playsinline: "",
                                controls: ""
                              }, null, 8, ["src"]),
                              createVNode("a", {
                                href: getFileUrl(item.file) || "",
                                class: "text-sm text-primary underline",
                                download: ""
                              }, " Download Video ", 8, ["href"])
                            ])) : isImageFile(item.file) ? (openBlock(), createBlock("div", {
                              key: 2,
                              class: "space-y-2"
                            }, [
                              createVNode("img", {
                                src: getFileUrl(item.file) || "",
                                alt: "Lampiran",
                                class: "max-h-[480px] w-full rounded-md border object-contain"
                              }, null, 8, ["src"]),
                              createVNode("a", {
                                href: getFileUrl(item.file) || "",
                                class: "text-sm text-primary underline",
                                download: ""
                              }, " Download Gambar ", 8, ["href"])
                            ])) : isDocumentFile(item.file) ? (openBlock(), createBlock("div", {
                              key: 3,
                              class: "space-y-2"
                            }, [
                              createVNode("a", {
                                href: getFileUrl(item.file) || "",
                                class: "text-sm text-primary underline",
                                download: ""
                              }, " Download Dokumen ", 8, ["href"])
                            ])) : (openBlock(), createBlock("div", {
                              key: 4,
                              class: "space-y-2"
                            }, [
                              createVNode("a", {
                                href: getFileUrl(item.file) || "",
                                class: "text-sm text-primary underline",
                                download: ""
                              }, " Download File ", 8, ["href"])
                            ]))
                          ])) : createCommentVNode("", true),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("p", { class: "text-sm text-muted-foreground" }, "Deskripsi"),
                            createVNode("div", {
                              class: "prose max-w-none",
                              innerHTML: item.content || "<p>-</p>"
                            }, null, 8, ["innerHTML"])
                          ])
                        ]),
                        _: 2
                      }, 1024)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div></div>`);
          } else {
            return [
              createVNode("div", { class: "container mx-auto py-6 space-y-6" }, [
                createVNode("div", { class: "flex flex-wrap items-center justify-between gap-4" }, [
                  createVNode("div", { class: "flex items-center gap-4" }, [
                    createVNode(unref(Link), { href: "/admin/zenner-club/categories" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$2), {
                          variant: "outline",
                          size: "icon"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(ArrowLeft), { class: "h-4 w-4" })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-3xl font-bold" }, toDisplayString(__props.category.name), 1),
                      createVNode("p", { class: "text-muted-foreground" }, "Detail kategori Zenner Club")
                    ])
                  ]),
                  unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(Link), {
                    key: 0,
                    href: `/admin/zenner-club/categories/${__props.category.id}/edit`
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$2), null, {
                        default: withCtx(() => [
                          createVNode(unref(Pencil), { class: "mr-2 h-4 w-4" }),
                          createTextVNode(" Edit Kategori ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["href"])) : createCommentVNode("", true)
                ]),
                createVNode(unref(_sfc_main$3), null, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(__props.category.name), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(__props.category.slug), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), { class: "flex flex-wrap gap-3" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$8), { variant: "outline" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(__props.category.parent?.name || "Tanpa Parent"), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), { variant: "outline" }, {
                          default: withCtx(() => [
                            createTextVNode(" Total Konten: " + toDisplayString(totalContents.value), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode("div", { class: "space-y-4" }, [
                  createVNode("div", null, [
                    createVNode("h2", { class: "text-xl font-semibold" }, "Konten"),
                    createVNode("p", { class: "text-muted-foreground" }, "Menampilkan data lengkap berdasarkan kategori ini.")
                  ]),
                  !__props.contents.length ? (openBlock(), createBlock(unref(_sfc_main$3), { key: 0 }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$7), { class: "py-6 text-sm text-muted-foreground" }, {
                        default: withCtx(() => [
                          createTextVNode(" Belum ada konten untuk kategori ini. ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.contents, (item) => {
                    return openBlock(), createBlock(unref(_sfc_main$3), {
                      key: item.id
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$4), { class: "flex flex-wrap items-start justify-between gap-4" }, {
                          default: withCtx(() => [
                            createVNode("div", null, [
                              createVNode(unref(_sfc_main$5), null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.title), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$6), null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.slug), 1)
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(Link), {
                              key: 0,
                              href: `/admin/zenner-club/contents/${item.id}/edit`
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$2), { size: "sm" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Pencil), { class: "mr-2 h-4 w-4" }),
                                    createTextVNode(" Edit Konten ")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["href"])) : createCommentVNode("", true)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex flex-wrap gap-3" }, [
                              item.status === "published" ? (openBlock(), createBlock(unref(_sfc_main$8), {
                                key: 0,
                                variant: "default"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Published")
                                ]),
                                _: 1
                              })) : item.status === "draft" ? (openBlock(), createBlock(unref(_sfc_main$8), {
                                key: 1,
                                variant: "secondary"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Draft")
                                ]),
                                _: 1
                              })) : (openBlock(), createBlock(unref(_sfc_main$8), {
                                key: 2,
                                variant: "outline"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.status || "Draft"), 1)
                                ]),
                                _: 2
                              }, 1024)),
                              createVNode(unref(_sfc_main$8), { variant: "outline" }, {
                                default: withCtx(() => [
                                  createTextVNode("Dibuat " + toDisplayString(formatDate(item.created_at)), 1)
                                ]),
                                _: 2
                              }, 1024),
                              item.creator?.name ? (openBlock(), createBlock(unref(_sfc_main$8), {
                                key: 3,
                                variant: "outline"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Oleh " + toDisplayString(item.creator.name), 1)
                                ]),
                                _: 2
                              }, 1024)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode("p", { class: "text-sm text-muted-foreground" }, "Video Link"),
                              item.vlink ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm"
                              }, [
                                createVNode("a", {
                                  href: item.vlink,
                                  target: "_blank",
                                  class: "text-primary underline"
                                }, toDisplayString(item.vlink), 9, ["href"])
                              ])) : (openBlock(), createBlock("p", {
                                key: 1,
                                class: "text-sm text-muted-foreground"
                              }, "-"))
                            ]),
                            item.file ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "space-y-2"
                            }, [
                              createVNode("p", { class: "text-sm text-muted-foreground" }, "File Lampiran"),
                              isPdfFile(item.file) ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "space-y-3"
                              }, [
                                createVNode("iframe", {
                                  src: getFileUrl(item.file) || "",
                                  class: "h-[420px] w-full rounded-md border",
                                  title: "PDF Viewer"
                                }, null, 8, ["src"]),
                                createVNode("a", {
                                  href: getFileUrl(item.file) || "",
                                  class: "text-sm text-primary underline",
                                  download: ""
                                }, " Download PDF ", 8, ["href"])
                              ])) : isVideoFile(item.file) ? (openBlock(), createBlock("div", {
                                key: 1,
                                class: "space-y-2"
                              }, [
                                createVNode("video", {
                                  src: getFileUrl(item.file) || "",
                                  class: "w-full rounded-md border",
                                  autoplay: "",
                                  muted: "",
                                  playsinline: "",
                                  controls: ""
                                }, null, 8, ["src"]),
                                createVNode("a", {
                                  href: getFileUrl(item.file) || "",
                                  class: "text-sm text-primary underline",
                                  download: ""
                                }, " Download Video ", 8, ["href"])
                              ])) : isImageFile(item.file) ? (openBlock(), createBlock("div", {
                                key: 2,
                                class: "space-y-2"
                              }, [
                                createVNode("img", {
                                  src: getFileUrl(item.file) || "",
                                  alt: "Lampiran",
                                  class: "max-h-[480px] w-full rounded-md border object-contain"
                                }, null, 8, ["src"]),
                                createVNode("a", {
                                  href: getFileUrl(item.file) || "",
                                  class: "text-sm text-primary underline",
                                  download: ""
                                }, " Download Gambar ", 8, ["href"])
                              ])) : isDocumentFile(item.file) ? (openBlock(), createBlock("div", {
                                key: 3,
                                class: "space-y-2"
                              }, [
                                createVNode("a", {
                                  href: getFileUrl(item.file) || "",
                                  class: "text-sm text-primary underline",
                                  download: ""
                                }, " Download Dokumen ", 8, ["href"])
                              ])) : (openBlock(), createBlock("div", {
                                key: 4,
                                class: "space-y-2"
                              }, [
                                createVNode("a", {
                                  href: getFileUrl(item.file) || "",
                                  class: "text-sm text-primary underline",
                                  download: ""
                                }, " Download File ", 8, ["href"])
                              ]))
                            ])) : createCommentVNode("", true),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode("p", { class: "text-sm text-muted-foreground" }, "Deskripsi"),
                              createVNode("div", {
                                class: "prose max-w-none",
                                innerHTML: item.content || "<p>-</p>"
                              }, null, 8, ["innerHTML"])
                            ])
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024);
                  }), 128))
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/ZennerClub/CategoryContent/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
