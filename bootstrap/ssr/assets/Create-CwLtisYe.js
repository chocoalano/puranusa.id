import { defineComponent, ref, computed, watch, unref, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-D11fLPDM.js";
import { _ as _sfc_main$2 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$9 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$8 } from "./Label-16aMY2sx.js";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5, d as _sfc_main$6, c as _sfc_main$7 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$a, a as _sfc_main$b, b as _sfc_main$c, c as _sfc_main$d, d as _sfc_main$e } from "./SelectValue-BUnv4mQg.js";
import { _ as _sfc_main$f } from "./TiptapEditor-CJ5JmjaX.js";
import { ArrowLeft, Save } from "lucide-vue-next";
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
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    categories: {}
  },
  setup(__props) {
    const form = ref({
      category_id: null,
      title: "",
      slug: "",
      content: "",
      file: null,
      vlink: "",
      status: "draft"
    });
    const allowedFileExtensions = [
      "jpg",
      "jpeg",
      "png",
      "webp",
      "gif",
      "svg",
      "mp4",
      "mov",
      "avi",
      "webm",
      "mkv",
      "pdf",
      "doc",
      "docx",
      "xls",
      "xlsx",
      "ppt",
      "pptx",
      "txt"
    ];
    const allowedFileMimes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "text/plain"
    ];
    const isAllowedFile = (file) => {
      const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
      if (extension && allowedFileExtensions.includes(extension)) return true;
      if (file.type.startsWith("image/") || file.type.startsWith("video/")) return true;
      return allowedFileMimes.includes(file.type);
    };
    const submitForm = useForm({});
    const errors = computed(() => submitForm.errors);
    const processing = computed(() => submitForm.processing);
    const slugTouched = ref(false);
    const slugify = (text) => {
      return text.toString().toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-").replace(/^-+|-+$/g, "");
    };
    watch(() => form.value.title, (value) => {
      if (!slugTouched.value) {
        form.value.slug = slugify(value);
      }
    });
    const selectedCategory = computed({
      get() {
        return form.value.category_id ? String(form.value.category_id) : "none";
      },
      set(value) {
        form.value.category_id = value === "none" ? null : Number(value);
      }
    });
    const handleFileChange = (event) => {
      const target = event.target;
      const file = target.files ? target.files[0] : null;
      if (!file) {
        form.value.file = null;
        return;
      }
      if (!isAllowedFile(file)) {
        toast.error("Format file tidak didukung. Gunakan gambar, video, PDF, atau dokumen kantor.");
        form.value.file = null;
        target.value = "";
        return;
      }
      form.value.file = file;
    };
    const submit = () => {
      const formData = new FormData();
      formData.append("title", form.value.title);
      if (form.value.slug) {
        formData.append("slug", form.value.slug);
      }
      if (form.value.category_id) {
        formData.append("category_id", String(form.value.category_id));
      }
      if (form.value.content) {
        formData.append("content", form.value.content);
      }
      if (form.value.file instanceof File) {
        formData.append("file", form.value.file);
      }
      if (form.value.vlink) {
        formData.append("vlink", form.value.vlink);
      }
      if (form.value.status) {
        formData.append("status", form.value.status);
      }
      submitForm.transform(() => formData).post("/admin/zenner-club/contents", {
        preserveScroll: true,
        forceFormData: true,
        onSuccess: () => {
          toast.success("Konten berhasil ditambahkan");
        },
        onError: () => {
          toast.error("Gagal menambahkan konten");
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Tambah Konten" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="container mx-auto py-6 space-y-6"${_scopeId}><div class="flex items-center gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), { href: "/admin/zenner-club/contents" }, {
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
            _push2(`<div${_scopeId}><h1 class="text-3xl font-bold"${_scopeId}>Tambah Konten</h1><p class="text-muted-foreground"${_scopeId}>Buat konten Zenner Club baru</p></div></div><form class="space-y-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$3), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Informasi Utama`);
                            } else {
                              return [
                                createTextVNode("Informasi Utama")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Lengkapi data konten`);
                            } else {
                              return [
                                createTextVNode("Lengkapi data konten")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Informasi Utama")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("Lengkapi data konten")
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
                        _push4(`<div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { for: "title" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Judul`);
                            } else {
                              return [
                                createTextVNode("Judul")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          id: "title",
                          modelValue: form.value.title,
                          "onUpdate:modelValue": ($event) => form.value.title = $event,
                          placeholder: "Judul konten",
                          class: { "border-destructive": errors.value.title }
                        }, null, _parent4, _scopeId3));
                        if (errors.value.title) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(errors.value.title)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { for: "slug" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Slug`);
                            } else {
                              return [
                                createTextVNode("Slug")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          id: "slug",
                          modelValue: form.value.slug,
                          "onUpdate:modelValue": ($event) => form.value.slug = $event,
                          placeholder: "slug-konten",
                          class: { "border-destructive": errors.value.slug },
                          onInput: ($event) => slugTouched.value = true
                        }, null, _parent4, _scopeId3));
                        _push4(`<p class="text-xs text-muted-foreground"${_scopeId3}> URL: /zenner-club/${ssrInterpolate(form.value.slug || "slug-konten")}</p>`);
                        if (errors.value.slug) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(errors.value.slug)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="grid gap-4 lg:grid-cols-2"${_scopeId3}><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Kategori`);
                            } else {
                              return [
                                createTextVNode("Kategori")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$a), {
                          modelValue: selectedCategory.value,
                          "onUpdate:modelValue": ($event) => selectedCategory.value = $event
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$b), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$c), { placeholder: "Pilih kategori" }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$c), { placeholder: "Pilih kategori" })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$d), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$e), { value: "none" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Tanpa Kategori`);
                                        } else {
                                          return [
                                            createTextVNode("Tanpa Kategori")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`<!--[-->`);
                                    ssrRenderList(__props.categories, (item) => {
                                      _push6(ssrRenderComponent(unref(_sfc_main$e), {
                                        key: item.id,
                                        value: String(item.id)
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`${ssrInterpolate(item.name)}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString(item.name), 1)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    });
                                    _push6(`<!--]-->`);
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$e), { value: "none" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Tanpa Kategori")
                                        ]),
                                        _: 1
                                      }),
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (item) => {
                                        return openBlock(), createBlock(unref(_sfc_main$e), {
                                          key: item.id,
                                          value: String(item.id)
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(item.name), 1)
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
                                createVNode(unref(_sfc_main$b), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$c), { placeholder: "Pilih kategori" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$d), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$e), { value: "none" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Tanpa Kategori")
                                      ]),
                                      _: 1
                                    }),
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (item) => {
                                      return openBlock(), createBlock(unref(_sfc_main$e), {
                                        key: item.id,
                                        value: String(item.id)
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(item.name), 1)
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
                        if (errors.value.category_id) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(errors.value.category_id)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Status`);
                            } else {
                              return [
                                createTextVNode("Status")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$a), {
                          modelValue: form.value.status,
                          "onUpdate:modelValue": ($event) => form.value.status = $event
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$b), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$c), { placeholder: "Pilih status" }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$c), { placeholder: "Pilih status" })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$d), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$e), { value: "draft" }, {
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
                                    _push6(ssrRenderComponent(unref(_sfc_main$e), { value: "published" }, {
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
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$e), { value: "draft" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Draft")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$e), { value: "published" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Published")
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
                                createVNode(unref(_sfc_main$b), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$c), { placeholder: "Pilih status" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$d), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$e), { value: "draft" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Draft")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$e), { value: "published" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Published")
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
                        if (errors.value.status) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(errors.value.status)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div></div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Deskripsi Konten`);
                            } else {
                              return [
                                createTextVNode("Deskripsi Konten")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_sfc_main$f, {
                          modelValue: form.value.content,
                          "onUpdate:modelValue": ($event) => form.value.content = $event
                        }, null, _parent4, _scopeId3));
                        if (errors.value.content) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(errors.value.content)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="grid gap-4 lg:grid-cols-2"${_scopeId3}><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { for: "file" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`File Lampiran`);
                            } else {
                              return [
                                createTextVNode("File Lampiran")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<input id="file" type="file" class="${ssrRenderClass([
                          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                          errors.value.file ? "border-destructive" : ""
                        ])}" accept="image/*,video/*,application/pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"${_scopeId3}><p class="text-xs text-muted-foreground"${_scopeId3}> Format: gambar (JPG/PNG/WebP/GIF/SVG), video (MP4/MOV/AVI/WebM/MKV), PDF, atau dokumen (DOC/DOCX/XLS/XLSX/PPT/PPTX/TXT). Maks 10MB. </p>`);
                        if (errors.value.file) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(errors.value.file)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { for: "vlink" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Video Link`);
                            } else {
                              return [
                                createTextVNode("Video Link")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          id: "vlink",
                          modelValue: form.value.vlink,
                          "onUpdate:modelValue": ($event) => form.value.vlink = $event,
                          placeholder: "https://...",
                          class: { "border-destructive": errors.value.vlink }
                        }, null, _parent4, _scopeId3));
                        if (errors.value.vlink) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(errors.value.vlink)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "title" }, {
                              default: withCtx(() => [
                                createTextVNode("Judul")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$9), {
                              id: "title",
                              modelValue: form.value.title,
                              "onUpdate:modelValue": ($event) => form.value.title = $event,
                              placeholder: "Judul konten",
                              class: { "border-destructive": errors.value.title }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            errors.value.title ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(errors.value.title), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "slug" }, {
                              default: withCtx(() => [
                                createTextVNode("Slug")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$9), {
                              id: "slug",
                              modelValue: form.value.slug,
                              "onUpdate:modelValue": ($event) => form.value.slug = $event,
                              placeholder: "slug-konten",
                              class: { "border-destructive": errors.value.slug },
                              onInput: ($event) => slugTouched.value = true
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class", "onInput"]),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, " URL: /zenner-club/" + toDisplayString(form.value.slug || "slug-konten"), 1),
                            errors.value.slug ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(errors.value.slug), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "grid gap-4 lg:grid-cols-2" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$8), null, {
                                default: withCtx(() => [
                                  createTextVNode("Kategori")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), {
                                modelValue: selectedCategory.value,
                                "onUpdate:modelValue": ($event) => selectedCategory.value = $event
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$b), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$c), { placeholder: "Pilih kategori" })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$d), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$e), { value: "none" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Tanpa Kategori")
                                        ]),
                                        _: 1
                                      }),
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (item) => {
                                        return openBlock(), createBlock(unref(_sfc_main$e), {
                                          key: item.id,
                                          value: String(item.id)
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(item.name), 1)
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
                              errors.value.category_id ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(errors.value.category_id), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$8), null, {
                                default: withCtx(() => [
                                  createTextVNode("Status")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), {
                                modelValue: form.value.status,
                                "onUpdate:modelValue": ($event) => form.value.status = $event
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$b), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$c), { placeholder: "Pilih status" })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$d), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$e), { value: "draft" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Draft")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$e), { value: "published" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Published")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"]),
                              errors.value.status ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(errors.value.status), 1)) : createCommentVNode("", true)
                            ])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), null, {
                              default: withCtx(() => [
                                createTextVNode("Deskripsi Konten")
                              ]),
                              _: 1
                            }),
                            createVNode(_sfc_main$f, {
                              modelValue: form.value.content,
                              "onUpdate:modelValue": ($event) => form.value.content = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            errors.value.content ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(errors.value.content), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "grid gap-4 lg:grid-cols-2" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$8), { for: "file" }, {
                                default: withCtx(() => [
                                  createTextVNode("File Lampiran")
                                ]),
                                _: 1
                              }),
                              createVNode("input", {
                                id: "file",
                                type: "file",
                                class: [
                                  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                                  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                                  errors.value.file ? "border-destructive" : ""
                                ],
                                accept: "image/*,video/*,application/pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt",
                                onChange: handleFileChange
                              }, null, 34),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Format: gambar (JPG/PNG/WebP/GIF/SVG), video (MP4/MOV/AVI/WebM/MKV), PDF, atau dokumen (DOC/DOCX/XLS/XLSX/PPT/PPTX/TXT). Maks 10MB. "),
                              errors.value.file ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(errors.value.file), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$8), { for: "vlink" }, {
                                default: withCtx(() => [
                                  createTextVNode("Video Link")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$9), {
                                id: "vlink",
                                modelValue: form.value.vlink,
                                "onUpdate:modelValue": ($event) => form.value.vlink = $event,
                                placeholder: "https://...",
                                class: { "border-destructive": errors.value.vlink }
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              errors.value.vlink ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(errors.value.vlink), 1)) : createCommentVNode("", true)
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
                            createTextVNode("Informasi Utama")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode("Lengkapi data konten")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$8), { for: "title" }, {
                            default: withCtx(() => [
                              createTextVNode("Judul")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$9), {
                            id: "title",
                            modelValue: form.value.title,
                            "onUpdate:modelValue": ($event) => form.value.title = $event,
                            placeholder: "Judul konten",
                            class: { "border-destructive": errors.value.title }
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                          errors.value.title ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive"
                          }, toDisplayString(errors.value.title), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$8), { for: "slug" }, {
                            default: withCtx(() => [
                              createTextVNode("Slug")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$9), {
                            id: "slug",
                            modelValue: form.value.slug,
                            "onUpdate:modelValue": ($event) => form.value.slug = $event,
                            placeholder: "slug-konten",
                            class: { "border-destructive": errors.value.slug },
                            onInput: ($event) => slugTouched.value = true
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "class", "onInput"]),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, " URL: /zenner-club/" + toDisplayString(form.value.slug || "slug-konten"), 1),
                          errors.value.slug ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive"
                          }, toDisplayString(errors.value.slug), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "grid gap-4 lg:grid-cols-2" }, [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), null, {
                              default: withCtx(() => [
                                createTextVNode("Kategori")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$a), {
                              modelValue: selectedCategory.value,
                              "onUpdate:modelValue": ($event) => selectedCategory.value = $event
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$b), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$c), { placeholder: "Pilih kategori" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$d), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$e), { value: "none" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Tanpa Kategori")
                                      ]),
                                      _: 1
                                    }),
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (item) => {
                                      return openBlock(), createBlock(unref(_sfc_main$e), {
                                        key: item.id,
                                        value: String(item.id)
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(item.name), 1)
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
                            errors.value.category_id ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(errors.value.category_id), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), null, {
                              default: withCtx(() => [
                                createTextVNode("Status")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$a), {
                              modelValue: form.value.status,
                              "onUpdate:modelValue": ($event) => form.value.status = $event
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$b), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$c), { placeholder: "Pilih status" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$d), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$e), { value: "draft" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Draft")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$e), { value: "published" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Published")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"]),
                            errors.value.status ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(errors.value.status), 1)) : createCommentVNode("", true)
                          ])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              createTextVNode("Deskripsi Konten")
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$f, {
                            modelValue: form.value.content,
                            "onUpdate:modelValue": ($event) => form.value.content = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          errors.value.content ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive"
                          }, toDisplayString(errors.value.content), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "grid gap-4 lg:grid-cols-2" }, [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "file" }, {
                              default: withCtx(() => [
                                createTextVNode("File Lampiran")
                              ]),
                              _: 1
                            }),
                            createVNode("input", {
                              id: "file",
                              type: "file",
                              class: [
                                "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                                errors.value.file ? "border-destructive" : ""
                              ],
                              accept: "image/*,video/*,application/pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt",
                              onChange: handleFileChange
                            }, null, 34),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, " Format: gambar (JPG/PNG/WebP/GIF/SVG), video (MP4/MOV/AVI/WebM/MKV), PDF, atau dokumen (DOC/DOCX/XLS/XLSX/PPT/PPTX/TXT). Maks 10MB. "),
                            errors.value.file ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(errors.value.file), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "vlink" }, {
                              default: withCtx(() => [
                                createTextVNode("Video Link")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$9), {
                              id: "vlink",
                              modelValue: form.value.vlink,
                              "onUpdate:modelValue": ($event) => form.value.vlink = $event,
                              placeholder: "https://...",
                              class: { "border-destructive": errors.value.vlink }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            errors.value.vlink ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(errors.value.vlink), 1)) : createCommentVNode("", true)
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
            _push2(`<div class="flex justify-end gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), { href: "/admin/zenner-club/contents" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$2), {
                    type: "button",
                    variant: "outline"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Batal`);
                      } else {
                        return [
                          createTextVNode("Batal")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$2), {
                      type: "button",
                      variant: "outline"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Batal")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              type: "submit",
              disabled: processing.value
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Save), { class: "mr-2 h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(` ${ssrInterpolate(processing.value ? "Menyimpan..." : "Simpan Konten")}`);
                } else {
                  return [
                    createVNode(unref(Save), { class: "mr-2 h-4 w-4" }),
                    createTextVNode(" " + toDisplayString(processing.value ? "Menyimpan..." : "Simpan Konten"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form></div>`);
          } else {
            return [
              createVNode("div", { class: "container mx-auto py-6 space-y-6" }, [
                createVNode("div", { class: "flex items-center gap-4" }, [
                  createVNode(unref(Link), { href: "/admin/zenner-club/contents" }, {
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
                    createVNode("h1", { class: "text-3xl font-bold" }, "Tambah Konten"),
                    createVNode("p", { class: "text-muted-foreground" }, "Buat konten Zenner Club baru")
                  ])
                ]),
                createVNode("form", {
                  onSubmit: withModifiers(submit, ["prevent"]),
                  class: "space-y-6"
                }, [
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$4), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Informasi Utama")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("Lengkapi data konten")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "title" }, {
                              default: withCtx(() => [
                                createTextVNode("Judul")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$9), {
                              id: "title",
                              modelValue: form.value.title,
                              "onUpdate:modelValue": ($event) => form.value.title = $event,
                              placeholder: "Judul konten",
                              class: { "border-destructive": errors.value.title }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            errors.value.title ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(errors.value.title), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "slug" }, {
                              default: withCtx(() => [
                                createTextVNode("Slug")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$9), {
                              id: "slug",
                              modelValue: form.value.slug,
                              "onUpdate:modelValue": ($event) => form.value.slug = $event,
                              placeholder: "slug-konten",
                              class: { "border-destructive": errors.value.slug },
                              onInput: ($event) => slugTouched.value = true
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class", "onInput"]),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, " URL: /zenner-club/" + toDisplayString(form.value.slug || "slug-konten"), 1),
                            errors.value.slug ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(errors.value.slug), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "grid gap-4 lg:grid-cols-2" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$8), null, {
                                default: withCtx(() => [
                                  createTextVNode("Kategori")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), {
                                modelValue: selectedCategory.value,
                                "onUpdate:modelValue": ($event) => selectedCategory.value = $event
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$b), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$c), { placeholder: "Pilih kategori" })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$d), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$e), { value: "none" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Tanpa Kategori")
                                        ]),
                                        _: 1
                                      }),
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (item) => {
                                        return openBlock(), createBlock(unref(_sfc_main$e), {
                                          key: item.id,
                                          value: String(item.id)
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(item.name), 1)
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
                              errors.value.category_id ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(errors.value.category_id), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$8), null, {
                                default: withCtx(() => [
                                  createTextVNode("Status")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), {
                                modelValue: form.value.status,
                                "onUpdate:modelValue": ($event) => form.value.status = $event
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$b), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$c), { placeholder: "Pilih status" })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$d), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$e), { value: "draft" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Draft")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$e), { value: "published" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Published")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"]),
                              errors.value.status ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(errors.value.status), 1)) : createCommentVNode("", true)
                            ])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), null, {
                              default: withCtx(() => [
                                createTextVNode("Deskripsi Konten")
                              ]),
                              _: 1
                            }),
                            createVNode(_sfc_main$f, {
                              modelValue: form.value.content,
                              "onUpdate:modelValue": ($event) => form.value.content = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            errors.value.content ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(errors.value.content), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "grid gap-4 lg:grid-cols-2" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$8), { for: "file" }, {
                                default: withCtx(() => [
                                  createTextVNode("File Lampiran")
                                ]),
                                _: 1
                              }),
                              createVNode("input", {
                                id: "file",
                                type: "file",
                                class: [
                                  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                                  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                                  errors.value.file ? "border-destructive" : ""
                                ],
                                accept: "image/*,video/*,application/pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt",
                                onChange: handleFileChange
                              }, null, 34),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Format: gambar (JPG/PNG/WebP/GIF/SVG), video (MP4/MOV/AVI/WebM/MKV), PDF, atau dokumen (DOC/DOCX/XLS/XLSX/PPT/PPTX/TXT). Maks 10MB. "),
                              errors.value.file ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(errors.value.file), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$8), { for: "vlink" }, {
                                default: withCtx(() => [
                                  createTextVNode("Video Link")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$9), {
                                id: "vlink",
                                modelValue: form.value.vlink,
                                "onUpdate:modelValue": ($event) => form.value.vlink = $event,
                                placeholder: "https://...",
                                class: { "border-destructive": errors.value.vlink }
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              errors.value.vlink ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(errors.value.vlink), 1)) : createCommentVNode("", true)
                            ])
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "flex justify-end gap-2" }, [
                    createVNode(unref(Link), { href: "/admin/zenner-club/contents" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$2), {
                          type: "button",
                          variant: "outline"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Batal")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$2), {
                      type: "submit",
                      disabled: processing.value
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Save), { class: "mr-2 h-4 w-4" }),
                        createTextVNode(" " + toDisplayString(processing.value ? "Menyimpan..." : "Simpan Konten"), 1)
                      ]),
                      _: 1
                    }, 8, ["disabled"])
                  ])
                ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/ZennerClub/Contents/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
