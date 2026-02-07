import { defineComponent, computed, withCtx, unref, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./Ecommerce-D_5G5ayz.js";
import { _ as _sfc_main$2 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$4, a as _sfc_main$5, b as _sfc_main$6, c as _sfc_main$7 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$3 } from "./index-BpQimeTM.js";
import { ArrowLeft, Link2 } from "lucide-vue-next";
import "./index-D3PKcwoM.js";
import "class-variance-authority";
import "./Input-BGi8wCMh.js";
import "@vueuse/core";
import "./Label-16aMY2sx.js";
import "reka-ui";
import "./SelectValue-BUnv4mQg.js";
import "./DropdownMenuTrigger-B1v6pHML.js";
import "axios";
import "vue-sonner";
import "./Checkbox-CIOQa2-J.js";
import "./useAppearance-gspEihnp.js";
import "clsx";
import "tailwind-merge";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ContentShow",
  __ssrInlineRender: true,
  props: {
    item: {},
    backUrl: {}
  },
  setup(__props) {
    const props = __props;
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
    const formattedDate = computed(() => {
      return new Date(props.item.created_at).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: __props.item.title
            }, null, _parent2, _scopeId));
            _push2(`<div class="container mx-auto px-3 py-6 sm:px-4 sm:py-8 max-w-6xl space-y-6"${_scopeId}><div class="rounded-2xl border bg-gradient-to-br from-primary/10 via-background to-background p-4 sm:p-6"${_scopeId}><div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"${_scopeId}><div class="flex items-start gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), { href: __props.backUrl }, {
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
            _push2(`<div${_scopeId}><h1 class="text-2xl font-semibold leading-tight sm:text-3xl"${_scopeId}>${ssrInterpolate(__props.item.title)}</h1><div class="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$3), { variant: "secondary" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(__props.item.category?.name || "Zenner Club")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(__props.item.category?.name || "Zenner Club"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<span class="text-muted-foreground/60"${_scopeId}>•</span><span${_scopeId}>${ssrInterpolate(formattedDate.value)}</span><span class="text-muted-foreground/60"${_scopeId}>•</span><span class="font-mono text-xs"${_scopeId}>${ssrInterpolate(__props.item.slug)}</span></div></div></div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$3), { variant: "outline" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Materi`);
                } else {
                  return [
                    createTextVNode("Materi")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$6), { class: "text-base" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Deskripsi`);
                            } else {
                              return [
                                createTextVNode("Deskripsi")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$6), { class: "text-base" }, {
                            default: withCtx(() => [
                              createTextVNode("Deskripsi")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { class: "space-y-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="prose prose-neutral max-w-none text-foreground [&amp;_a]:text-primary [&amp;_a]:underline [&amp;_table]:w-full [&amp;_img]:rounded-lg [&amp;_img]:border"${_scopeId3}>${(__props.item.content || "<p>-</p>") ?? ""}</div>`);
                      } else {
                        return [
                          createVNode("div", {
                            class: "prose prose-neutral max-w-none text-foreground [&_a]:text-primary [&_a]:underline [&_table]:w-full [&_img]:rounded-lg [&_img]:border",
                            innerHTML: __props.item.content || "<p>-</p>"
                          }, null, 8, ["innerHTML"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$6), { class: "text-base" }, {
                          default: withCtx(() => [
                            createTextVNode("Deskripsi")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                      default: withCtx(() => [
                        createVNode("div", {
                          class: "prose prose-neutral max-w-none text-foreground [&_a]:text-primary [&_a]:underline [&_table]:w-full [&_img]:rounded-lg [&_img]:border",
                          innerHTML: __props.item.content || "<p>-</p>"
                        }, null, 8, ["innerHTML"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="space-y-4 lg:sticky lg:top-24"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$6), { class: "text-base" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Lampiran`);
                            } else {
                              return [
                                createTextVNode("Lampiran")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$6), { class: "text-base" }, {
                            default: withCtx(() => [
                              createTextVNode("Lampiran")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { class: "space-y-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="space-y-2"${_scopeId3}><p class="text-xs font-semibold uppercase tracking-wide text-muted-foreground"${_scopeId3}>Video Link</p>`);
                        if (__props.item.vlink) {
                          _push4(`<div class="flex items-center gap-2 text-sm"${_scopeId3}>`);
                          _push4(ssrRenderComponent(unref(Link2), { class: "h-4 w-4 text-muted-foreground" }, null, _parent4, _scopeId3));
                          _push4(`<a${ssrRenderAttr("href", __props.item.vlink)} target="_blank" rel="noopener" class="text-primary hover:underline"${_scopeId3}>${ssrInterpolate(__props.item.vlink)}</a></div>`);
                        } else {
                          _push4(`<p class="text-sm text-muted-foreground"${_scopeId3}>-</p>`);
                        }
                        _push4(`</div><div class="space-y-3"${_scopeId3}><p class="text-xs font-semibold uppercase tracking-wide text-muted-foreground"${_scopeId3}>File Lampiran</p>`);
                        if (__props.item.file) {
                          _push4(`<div class="space-y-3"${_scopeId3}>`);
                          if (isPdfFile(__props.item.file)) {
                            _push4(`<div class="space-y-3"${_scopeId3}><iframe${ssrRenderAttr("src", getFileUrl(__props.item.file) || "")} class="h-[320px] w-full rounded-md border" title="PDF Viewer"${_scopeId3}></iframe><a${ssrRenderAttr("href", getFileUrl(__props.item.file) || "")} class="text-sm text-primary underline" download${_scopeId3}> Download PDF </a></div>`);
                          } else if (isVideoFile(__props.item.file)) {
                            _push4(`<div class="space-y-2"${_scopeId3}><video${ssrRenderAttr("src", getFileUrl(__props.item.file) || "")} class="w-full rounded-md border" autoplay muted playsinline controls${_scopeId3}></video><a${ssrRenderAttr("href", getFileUrl(__props.item.file) || "")} class="text-sm text-primary underline" download${_scopeId3}> Download Video </a></div>`);
                          } else if (isImageFile(__props.item.file)) {
                            _push4(`<div class="space-y-2"${_scopeId3}><img${ssrRenderAttr("src", getFileUrl(__props.item.file) || "")} alt="Lampiran" class="max-h-[320px] w-full rounded-md border object-contain"${_scopeId3}><a${ssrRenderAttr("href", getFileUrl(__props.item.file) || "")} class="text-sm text-primary underline" download${_scopeId3}> Download Gambar </a></div>`);
                          } else if (isDocumentFile(__props.item.file)) {
                            _push4(`<div class="space-y-2"${_scopeId3}><a${ssrRenderAttr("href", getFileUrl(__props.item.file) || "")} class="text-sm text-primary underline" download${_scopeId3}> Download Dokumen </a></div>`);
                          } else {
                            _push4(`<div class="space-y-2"${_scopeId3}><a${ssrRenderAttr("href", getFileUrl(__props.item.file) || "")} class="text-sm text-primary underline" download${_scopeId3}> Download File </a></div>`);
                          }
                          _push4(`</div>`);
                        } else {
                          _push4(`<p class="text-sm text-muted-foreground"${_scopeId3}>-</p>`);
                        }
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("p", { class: "text-xs font-semibold uppercase tracking-wide text-muted-foreground" }, "Video Link"),
                            __props.item.vlink ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "flex items-center gap-2 text-sm"
                            }, [
                              createVNode(unref(Link2), { class: "h-4 w-4 text-muted-foreground" }),
                              createVNode("a", {
                                href: __props.item.vlink,
                                target: "_blank",
                                rel: "noopener",
                                class: "text-primary hover:underline"
                              }, toDisplayString(__props.item.vlink), 9, ["href"])
                            ])) : (openBlock(), createBlock("p", {
                              key: 1,
                              class: "text-sm text-muted-foreground"
                            }, "-"))
                          ]),
                          createVNode("div", { class: "space-y-3" }, [
                            createVNode("p", { class: "text-xs font-semibold uppercase tracking-wide text-muted-foreground" }, "File Lampiran"),
                            __props.item.file ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "space-y-3"
                            }, [
                              isPdfFile(__props.item.file) ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "space-y-3"
                              }, [
                                createVNode("iframe", {
                                  src: getFileUrl(__props.item.file) || "",
                                  class: "h-[320px] w-full rounded-md border",
                                  title: "PDF Viewer"
                                }, null, 8, ["src"]),
                                createVNode("a", {
                                  href: getFileUrl(__props.item.file) || "",
                                  class: "text-sm text-primary underline",
                                  download: ""
                                }, " Download PDF ", 8, ["href"])
                              ])) : isVideoFile(__props.item.file) ? (openBlock(), createBlock("div", {
                                key: 1,
                                class: "space-y-2"
                              }, [
                                createVNode("video", {
                                  src: getFileUrl(__props.item.file) || "",
                                  class: "w-full rounded-md border",
                                  autoplay: "",
                                  muted: "",
                                  playsinline: "",
                                  controls: ""
                                }, null, 8, ["src"]),
                                createVNode("a", {
                                  href: getFileUrl(__props.item.file) || "",
                                  class: "text-sm text-primary underline",
                                  download: ""
                                }, " Download Video ", 8, ["href"])
                              ])) : isImageFile(__props.item.file) ? (openBlock(), createBlock("div", {
                                key: 2,
                                class: "space-y-2"
                              }, [
                                createVNode("img", {
                                  src: getFileUrl(__props.item.file) || "",
                                  alt: "Lampiran",
                                  class: "max-h-[320px] w-full rounded-md border object-contain"
                                }, null, 8, ["src"]),
                                createVNode("a", {
                                  href: getFileUrl(__props.item.file) || "",
                                  class: "text-sm text-primary underline",
                                  download: ""
                                }, " Download Gambar ", 8, ["href"])
                              ])) : isDocumentFile(__props.item.file) ? (openBlock(), createBlock("div", {
                                key: 3,
                                class: "space-y-2"
                              }, [
                                createVNode("a", {
                                  href: getFileUrl(__props.item.file) || "",
                                  class: "text-sm text-primary underline",
                                  download: ""
                                }, " Download Dokumen ", 8, ["href"])
                              ])) : (openBlock(), createBlock("div", {
                                key: 4,
                                class: "space-y-2"
                              }, [
                                createVNode("a", {
                                  href: getFileUrl(__props.item.file) || "",
                                  class: "text-sm text-primary underline",
                                  download: ""
                                }, " Download File ", 8, ["href"])
                              ]))
                            ])) : (openBlock(), createBlock("p", {
                              key: 1,
                              class: "text-sm text-muted-foreground"
                            }, "-"))
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$6), { class: "text-base" }, {
                          default: withCtx(() => [
                            createTextVNode("Lampiran")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("p", { class: "text-xs font-semibold uppercase tracking-wide text-muted-foreground" }, "Video Link"),
                          __props.item.vlink ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex items-center gap-2 text-sm"
                          }, [
                            createVNode(unref(Link2), { class: "h-4 w-4 text-muted-foreground" }),
                            createVNode("a", {
                              href: __props.item.vlink,
                              target: "_blank",
                              rel: "noopener",
                              class: "text-primary hover:underline"
                            }, toDisplayString(__props.item.vlink), 9, ["href"])
                          ])) : (openBlock(), createBlock("p", {
                            key: 1,
                            class: "text-sm text-muted-foreground"
                          }, "-"))
                        ]),
                        createVNode("div", { class: "space-y-3" }, [
                          createVNode("p", { class: "text-xs font-semibold uppercase tracking-wide text-muted-foreground" }, "File Lampiran"),
                          __props.item.file ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "space-y-3"
                          }, [
                            isPdfFile(__props.item.file) ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "space-y-3"
                            }, [
                              createVNode("iframe", {
                                src: getFileUrl(__props.item.file) || "",
                                class: "h-[320px] w-full rounded-md border",
                                title: "PDF Viewer"
                              }, null, 8, ["src"]),
                              createVNode("a", {
                                href: getFileUrl(__props.item.file) || "",
                                class: "text-sm text-primary underline",
                                download: ""
                              }, " Download PDF ", 8, ["href"])
                            ])) : isVideoFile(__props.item.file) ? (openBlock(), createBlock("div", {
                              key: 1,
                              class: "space-y-2"
                            }, [
                              createVNode("video", {
                                src: getFileUrl(__props.item.file) || "",
                                class: "w-full rounded-md border",
                                autoplay: "",
                                muted: "",
                                playsinline: "",
                                controls: ""
                              }, null, 8, ["src"]),
                              createVNode("a", {
                                href: getFileUrl(__props.item.file) || "",
                                class: "text-sm text-primary underline",
                                download: ""
                              }, " Download Video ", 8, ["href"])
                            ])) : isImageFile(__props.item.file) ? (openBlock(), createBlock("div", {
                              key: 2,
                              class: "space-y-2"
                            }, [
                              createVNode("img", {
                                src: getFileUrl(__props.item.file) || "",
                                alt: "Lampiran",
                                class: "max-h-[320px] w-full rounded-md border object-contain"
                              }, null, 8, ["src"]),
                              createVNode("a", {
                                href: getFileUrl(__props.item.file) || "",
                                class: "text-sm text-primary underline",
                                download: ""
                              }, " Download Gambar ", 8, ["href"])
                            ])) : isDocumentFile(__props.item.file) ? (openBlock(), createBlock("div", {
                              key: 3,
                              class: "space-y-2"
                            }, [
                              createVNode("a", {
                                href: getFileUrl(__props.item.file) || "",
                                class: "text-sm text-primary underline",
                                download: ""
                              }, " Download Dokumen ", 8, ["href"])
                            ])) : (openBlock(), createBlock("div", {
                              key: 4,
                              class: "space-y-2"
                            }, [
                              createVNode("a", {
                                href: getFileUrl(__props.item.file) || "",
                                class: "text-sm text-primary underline",
                                download: ""
                              }, " Download File ", 8, ["href"])
                            ]))
                          ])) : (openBlock(), createBlock("p", {
                            key: 1,
                            class: "text-sm text-muted-foreground"
                          }, "-"))
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), {
                title: __props.item.title
              }, null, 8, ["title"]),
              createVNode("div", { class: "container mx-auto px-3 py-6 sm:px-4 sm:py-8 max-w-6xl space-y-6" }, [
                createVNode("div", { class: "rounded-2xl border bg-gradient-to-br from-primary/10 via-background to-background p-4 sm:p-6" }, [
                  createVNode("div", { class: "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between" }, [
                    createVNode("div", { class: "flex items-start gap-3" }, [
                      createVNode(unref(Link), { href: __props.backUrl }, {
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
                      }, 8, ["href"]),
                      createVNode("div", null, [
                        createVNode("h1", { class: "text-2xl font-semibold leading-tight sm:text-3xl" }, toDisplayString(__props.item.title), 1),
                        createVNode("div", { class: "mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground" }, [
                          createVNode(unref(_sfc_main$3), { variant: "secondary" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(__props.item.category?.name || "Zenner Club"), 1)
                            ]),
                            _: 1
                          }),
                          createVNode("span", { class: "text-muted-foreground/60" }, "•"),
                          createVNode("span", null, toDisplayString(formattedDate.value), 1),
                          createVNode("span", { class: "text-muted-foreground/60" }, "•"),
                          createVNode("span", { class: "font-mono text-xs" }, toDisplayString(__props.item.slug), 1)
                        ])
                      ])
                    ]),
                    createVNode(unref(_sfc_main$3), { variant: "outline" }, {
                      default: withCtx(() => [
                        createTextVNode("Materi")
                      ]),
                      _: 1
                    })
                  ])
                ]),
                createVNode("div", { class: "grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]" }, [
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$6), { class: "text-base" }, {
                            default: withCtx(() => [
                              createTextVNode("Deskripsi")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                        default: withCtx(() => [
                          createVNode("div", {
                            class: "prose prose-neutral max-w-none text-foreground [&_a]:text-primary [&_a]:underline [&_table]:w-full [&_img]:rounded-lg [&_img]:border",
                            innerHTML: __props.item.content || "<p>-</p>"
                          }, null, 8, ["innerHTML"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "space-y-4 lg:sticky lg:top-24" }, [
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$6), { class: "text-base" }, {
                              default: withCtx(() => [
                                createTextVNode("Lampiran")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode("p", { class: "text-xs font-semibold uppercase tracking-wide text-muted-foreground" }, "Video Link"),
                              __props.item.vlink ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "flex items-center gap-2 text-sm"
                              }, [
                                createVNode(unref(Link2), { class: "h-4 w-4 text-muted-foreground" }),
                                createVNode("a", {
                                  href: __props.item.vlink,
                                  target: "_blank",
                                  rel: "noopener",
                                  class: "text-primary hover:underline"
                                }, toDisplayString(__props.item.vlink), 9, ["href"])
                              ])) : (openBlock(), createBlock("p", {
                                key: 1,
                                class: "text-sm text-muted-foreground"
                              }, "-"))
                            ]),
                            createVNode("div", { class: "space-y-3" }, [
                              createVNode("p", { class: "text-xs font-semibold uppercase tracking-wide text-muted-foreground" }, "File Lampiran"),
                              __props.item.file ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "space-y-3"
                              }, [
                                isPdfFile(__props.item.file) ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "space-y-3"
                                }, [
                                  createVNode("iframe", {
                                    src: getFileUrl(__props.item.file) || "",
                                    class: "h-[320px] w-full rounded-md border",
                                    title: "PDF Viewer"
                                  }, null, 8, ["src"]),
                                  createVNode("a", {
                                    href: getFileUrl(__props.item.file) || "",
                                    class: "text-sm text-primary underline",
                                    download: ""
                                  }, " Download PDF ", 8, ["href"])
                                ])) : isVideoFile(__props.item.file) ? (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "space-y-2"
                                }, [
                                  createVNode("video", {
                                    src: getFileUrl(__props.item.file) || "",
                                    class: "w-full rounded-md border",
                                    autoplay: "",
                                    muted: "",
                                    playsinline: "",
                                    controls: ""
                                  }, null, 8, ["src"]),
                                  createVNode("a", {
                                    href: getFileUrl(__props.item.file) || "",
                                    class: "text-sm text-primary underline",
                                    download: ""
                                  }, " Download Video ", 8, ["href"])
                                ])) : isImageFile(__props.item.file) ? (openBlock(), createBlock("div", {
                                  key: 2,
                                  class: "space-y-2"
                                }, [
                                  createVNode("img", {
                                    src: getFileUrl(__props.item.file) || "",
                                    alt: "Lampiran",
                                    class: "max-h-[320px] w-full rounded-md border object-contain"
                                  }, null, 8, ["src"]),
                                  createVNode("a", {
                                    href: getFileUrl(__props.item.file) || "",
                                    class: "text-sm text-primary underline",
                                    download: ""
                                  }, " Download Gambar ", 8, ["href"])
                                ])) : isDocumentFile(__props.item.file) ? (openBlock(), createBlock("div", {
                                  key: 3,
                                  class: "space-y-2"
                                }, [
                                  createVNode("a", {
                                    href: getFileUrl(__props.item.file) || "",
                                    class: "text-sm text-primary underline",
                                    download: ""
                                  }, " Download Dokumen ", 8, ["href"])
                                ])) : (openBlock(), createBlock("div", {
                                  key: 4,
                                  class: "space-y-2"
                                }, [
                                  createVNode("a", {
                                    href: getFileUrl(__props.item.file) || "",
                                    class: "text-sm text-primary underline",
                                    download: ""
                                  }, " Download File ", 8, ["href"])
                                ]))
                              ])) : (openBlock(), createBlock("p", {
                                key: 1,
                                class: "text-sm text-muted-foreground"
                              }, "-"))
                            ])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ])
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/ecommerce/ZennerClub/ContentShow.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
