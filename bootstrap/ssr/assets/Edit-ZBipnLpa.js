import { defineComponent, ref, computed, watch, unref, withCtx, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, toDisplayString, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AppLayout-DtCYuQDV.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5, d as _sfc_main$6, c as _sfc_main$7 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$9 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$8 } from "./Label-16aMY2sx.js";
import { _ as _sfc_main$g } from "./Switch-DQcz5w_A.js";
import { _ as _sfc_main$b, a as _sfc_main$c, b as _sfc_main$d, c as _sfc_main$e, d as _sfc_main$f } from "./SelectValue-BUnv4mQg.js";
import _sfc_main$a from "./PageBuilder-Bk_yT22D.js";
import { ArrowLeft, Save } from "lucide-vue-next";
import { toast } from "vue-sonner";
import "class-variance-authority";
import "./DropdownMenuTrigger-B1v6pHML.js";
import "reka-ui";
import "@vueuse/core";
import "./index-3UqiGNe9.js";
import "./AvatarImage-DWFQMckn.js";
import "./index-DS4dn0_o.js";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
import "clsx";
import "tailwind-merge";
import "./Textarea-pcFPh_uS.js";
import "./TiptapEditor-CJ5JmjaX.js";
import "./DialogTrigger-DpE8BjOt.js";
import "./index-BpQimeTM.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    page: {}
  },
  setup(__props) {
    const props = __props;
    const form = ref({
      title: props.page.title,
      slug: props.page.slug,
      blocks: props.page.blocks || [],
      seo_title: props.page.seo_title || "",
      seo_description: props.page.seo_description || "",
      is_published: props.page.is_published,
      template: props.page.template,
      order: props.page.order
    });
    const submitForm = useForm({});
    const processing = computed(() => submitForm.processing);
    const errors = computed(() => submitForm.errors);
    const extractErrorMessage = (errors2) => {
      const firstError = Object.values(errors2)[0];
      if (typeof firstError === "string") {
        return firstError;
      }
      if (Array.isArray(firstError) && typeof firstError[0] === "string") {
        return firstError[0];
      }
      return "Terjadi kesalahan. Periksa kembali data yang diisi.";
    };
    watch(() => props.page.blocks, (newBlocks) => {
      if (newBlocks) {
        form.value.blocks = JSON.parse(JSON.stringify(newBlocks));
      }
    }, { immediate: true });
    const handleSubmit = () => {
      const data = {
        ...form.value,
        blocks: JSON.stringify(form.value.blocks),
        is_published: Boolean(form.value.is_published),
        order: Number(form.value.order) || 0,
        _method: "PUT"
      };
      submitForm.transform(() => data).post(`/admin/pages/${props.page.id}`, {
        preserveScroll: true,
        onSuccess: (page) => {
          const flash = page.props.flash;
          if (flash?.error) {
            toast.error(flash.error);
            return;
          }
          toast.success(flash?.success || "Halaman berhasil diperbarui.");
        },
        onError: (submitErrors) => {
          toast.error(extractErrorMessage(submitErrors));
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: `Edit: ${__props.page.title}`
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="container mx-auto py-6 space-y-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div class="flex items-center gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), { href: "/admin/pages" }, {
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
            _push2(`<div${_scopeId}><h1 class="text-3xl font-bold tracking-tight"${_scopeId}>Edit Halaman</h1><p class="text-muted-foreground mt-1"${_scopeId}>${ssrInterpolate(__props.page.title)}</p></div></div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              onClick: handleSubmit,
              disabled: processing.value
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Save), { class: "h-4 w-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` Simpan Perubahan `);
                } else {
                  return [
                    createVNode(unref(Save), { class: "h-4 w-4 mr-2" }),
                    createTextVNode(" Simpan Perubahan ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><form class="space-y-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$3), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Informasi Dasar`);
                            } else {
                              return [
                                createTextVNode("Informasi Dasar")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Informasi utama halaman`);
                            } else {
                              return [
                                createTextVNode("Informasi utama halaman")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Informasi Dasar")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("Informasi utama halaman")
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
                              _push5(`Judul Halaman *`);
                            } else {
                              return [
                                createTextVNode("Judul Halaman *")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          id: "title",
                          modelValue: form.value.title,
                          "onUpdate:modelValue": ($event) => form.value.title = $event,
                          placeholder: "Contoh: Tentang Kami, Kebijakan Privasi",
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
                              _push5(`Slug *`);
                            } else {
                              return [
                                createTextVNode("Slug *")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          id: "slug",
                          modelValue: form.value.slug,
                          "onUpdate:modelValue": ($event) => form.value.slug = $event,
                          placeholder: "tentang-kami",
                          class: { "border-destructive": errors.value.slug }
                        }, null, _parent4, _scopeId3));
                        _push4(`<p class="text-xs text-muted-foreground"${_scopeId3}> URL: /page/<span class="font-medium"${_scopeId3}>${ssrInterpolate(form.value.slug)}</span></p>`);
                        if (errors.value.slug) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(errors.value.slug)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Konten Halaman`);
                            } else {
                              return [
                                createTextVNode("Konten Halaman")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_sfc_main$a, {
                          modelValue: form.value.blocks,
                          "onUpdate:modelValue": ($event) => form.value.blocks = $event
                        }, null, _parent4, _scopeId3));
                        _push4(`<p class="text-xs text-muted-foreground"${_scopeId3}> Gunakan PageBuilder untuk membuat konten dengan berbagai jenis block </p>`);
                        if (errors.value.blocks) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(errors.value.blocks)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "title" }, {
                              default: withCtx(() => [
                                createTextVNode("Judul Halaman *")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$9), {
                              id: "title",
                              modelValue: form.value.title,
                              "onUpdate:modelValue": ($event) => form.value.title = $event,
                              placeholder: "Contoh: Tentang Kami, Kebijakan Privasi",
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
                                createTextVNode("Slug *")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$9), {
                              id: "slug",
                              modelValue: form.value.slug,
                              "onUpdate:modelValue": ($event) => form.value.slug = $event,
                              placeholder: "tentang-kami",
                              class: { "border-destructive": errors.value.slug }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, [
                              createTextVNode(" URL: /page/"),
                              createVNode("span", { class: "font-medium" }, toDisplayString(form.value.slug), 1)
                            ]),
                            errors.value.slug ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(errors.value.slug), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), null, {
                              default: withCtx(() => [
                                createTextVNode("Konten Halaman")
                              ]),
                              _: 1
                            }),
                            createVNode(_sfc_main$a, {
                              modelValue: form.value.blocks,
                              "onUpdate:modelValue": ($event) => form.value.blocks = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, " Gunakan PageBuilder untuk membuat konten dengan berbagai jenis block "),
                            errors.value.blocks ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(errors.value.blocks), 1)) : createCommentVNode("", true)
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
                            createTextVNode("Informasi Dasar")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode("Informasi utama halaman")
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
                              createTextVNode("Judul Halaman *")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$9), {
                            id: "title",
                            modelValue: form.value.title,
                            "onUpdate:modelValue": ($event) => form.value.title = $event,
                            placeholder: "Contoh: Tentang Kami, Kebijakan Privasi",
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
                              createTextVNode("Slug *")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$9), {
                            id: "slug",
                            modelValue: form.value.slug,
                            "onUpdate:modelValue": ($event) => form.value.slug = $event,
                            placeholder: "tentang-kami",
                            class: { "border-destructive": errors.value.slug }
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, [
                            createTextVNode(" URL: /page/"),
                            createVNode("span", { class: "font-medium" }, toDisplayString(form.value.slug), 1)
                          ]),
                          errors.value.slug ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive"
                          }, toDisplayString(errors.value.slug), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              createTextVNode("Konten Halaman")
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$a, {
                            modelValue: form.value.blocks,
                            "onUpdate:modelValue": ($event) => form.value.blocks = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, " Gunakan PageBuilder untuk membuat konten dengan berbagai jenis block "),
                          errors.value.blocks ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive"
                          }, toDisplayString(errors.value.blocks), 1)) : createCommentVNode("", true)
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
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Pengaturan`);
                            } else {
                              return [
                                createTextVNode("Pengaturan")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Konfigurasi tampilan dan urutan`);
                            } else {
                              return [
                                createTextVNode("Konfigurasi tampilan dan urutan")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Pengaturan")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("Konfigurasi tampilan dan urutan")
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
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { for: "template" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Template`);
                            } else {
                              return [
                                createTextVNode("Template")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$b), {
                          modelValue: form.value.template,
                          "onUpdate:modelValue": ($event) => form.value.template = $event
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$c), { id: "template" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$d), { placeholder: "Pilih template" }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$d), { placeholder: "Pilih template" })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$e), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$f), { value: "default" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Default`);
                                        } else {
                                          return [
                                            createTextVNode("Default")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$f), { value: "full-width" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Full Width`);
                                        } else {
                                          return [
                                            createTextVNode("Full Width")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$f), { value: "narrow" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Narrow`);
                                        } else {
                                          return [
                                            createTextVNode("Narrow")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$f), { value: "default" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Default")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$f), { value: "full-width" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Full Width")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$f), { value: "narrow" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Narrow")
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
                                createVNode(unref(_sfc_main$c), { id: "template" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$d), { placeholder: "Pilih template" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$f), { value: "default" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Default")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$f), { value: "full-width" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Full Width")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$f), { value: "narrow" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Narrow")
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
                        if (errors.value.template) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(errors.value.template)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { for: "order" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Urutan`);
                            } else {
                              return [
                                createTextVNode("Urutan")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          id: "order",
                          modelValue: form.value.order,
                          "onUpdate:modelValue": ($event) => form.value.order = $event,
                          modelModifiers: { number: true },
                          type: "number",
                          min: "0",
                          class: { "border-destructive": errors.value.order }
                        }, null, _parent4, _scopeId3));
                        _push4(`<p class="text-xs text-muted-foreground"${_scopeId3}> Semakin kecil angka, semakin tinggi prioritasnya </p>`);
                        if (errors.value.order) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(errors.value.order)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="flex items-center justify-between space-x-2"${_scopeId3}><div class="space-y-0.5"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { for: "is_published" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Status Publikasi`);
                            } else {
                              return [
                                createTextVNode("Status Publikasi")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<p class="text-xs text-muted-foreground"${_scopeId3}> Publikasikan halaman ini ke website </p></div>`);
                        _push4(ssrRenderComponent(_sfc_main$g, {
                          id: "is_published",
                          modelValue: form.value.is_published,
                          "onUpdate:modelValue": ($event) => form.value.is_published = $event
                        }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "template" }, {
                              default: withCtx(() => [
                                createTextVNode("Template")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$b), {
                              modelValue: form.value.template,
                              "onUpdate:modelValue": ($event) => form.value.template = $event
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$c), { id: "template" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$d), { placeholder: "Pilih template" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$f), { value: "default" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Default")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$f), { value: "full-width" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Full Width")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$f), { value: "narrow" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Narrow")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"]),
                            errors.value.template ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(errors.value.template), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "order" }, {
                              default: withCtx(() => [
                                createTextVNode("Urutan")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$9), {
                              id: "order",
                              modelValue: form.value.order,
                              "onUpdate:modelValue": ($event) => form.value.order = $event,
                              modelModifiers: { number: true },
                              type: "number",
                              min: "0",
                              class: { "border-destructive": errors.value.order }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, " Semakin kecil angka, semakin tinggi prioritasnya "),
                            errors.value.order ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(errors.value.order), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "flex items-center justify-between space-x-2" }, [
                            createVNode("div", { class: "space-y-0.5" }, [
                              createVNode(unref(_sfc_main$8), { for: "is_published" }, {
                                default: withCtx(() => [
                                  createTextVNode("Status Publikasi")
                                ]),
                                _: 1
                              }),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Publikasikan halaman ini ke website ")
                            ]),
                            createVNode(_sfc_main$g, {
                              id: "is_published",
                              modelValue: form.value.is_published,
                              "onUpdate:modelValue": ($event) => form.value.is_published = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                            createTextVNode("Pengaturan")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode("Konfigurasi tampilan dan urutan")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$8), { for: "template" }, {
                            default: withCtx(() => [
                              createTextVNode("Template")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$b), {
                            modelValue: form.value.template,
                            "onUpdate:modelValue": ($event) => form.value.template = $event
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$c), { id: "template" }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$d), { placeholder: "Pilih template" })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$e), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$f), { value: "default" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Default")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$f), { value: "full-width" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Full Width")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$f), { value: "narrow" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Narrow")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"]),
                          errors.value.template ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive"
                          }, toDisplayString(errors.value.template), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$8), { for: "order" }, {
                            default: withCtx(() => [
                              createTextVNode("Urutan")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$9), {
                            id: "order",
                            modelValue: form.value.order,
                            "onUpdate:modelValue": ($event) => form.value.order = $event,
                            modelModifiers: { number: true },
                            type: "number",
                            min: "0",
                            class: { "border-destructive": errors.value.order }
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, " Semakin kecil angka, semakin tinggi prioritasnya "),
                          errors.value.order ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive"
                          }, toDisplayString(errors.value.order), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex items-center justify-between space-x-2" }, [
                          createVNode("div", { class: "space-y-0.5" }, [
                            createVNode(unref(_sfc_main$8), { for: "is_published" }, {
                              default: withCtx(() => [
                                createTextVNode("Status Publikasi")
                              ]),
                              _: 1
                            }),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, " Publikasikan halaman ini ke website ")
                          ]),
                          createVNode(_sfc_main$g, {
                            id: "is_published",
                            modelValue: form.value.is_published,
                            "onUpdate:modelValue": ($event) => form.value.is_published = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`SEO`);
                            } else {
                              return [
                                createTextVNode("SEO")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Optimasi untuk mesin pencari`);
                            } else {
                              return [
                                createTextVNode("Optimasi untuk mesin pencari")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("SEO")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("Optimasi untuk mesin pencari")
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
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { for: "seo_title" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`SEO Title`);
                            } else {
                              return [
                                createTextVNode("SEO Title")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          id: "seo_title",
                          modelValue: form.value.seo_title,
                          "onUpdate:modelValue": ($event) => form.value.seo_title = $event,
                          placeholder: "Judul untuk Google (kosongkan untuk menggunakan judul halaman)",
                          class: { "border-destructive": errors.value.seo_title }
                        }, null, _parent4, _scopeId3));
                        if (errors.value.seo_title) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(errors.value.seo_title)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { for: "seo_description" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`SEO Description`);
                            } else {
                              return [
                                createTextVNode("SEO Description")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          id: "seo_description",
                          modelValue: form.value.seo_description,
                          "onUpdate:modelValue": ($event) => form.value.seo_description = $event,
                          placeholder: "Deskripsi singkat untuk hasil pencarian (150-160 karakter)",
                          class: { "border-destructive": errors.value.seo_description }
                        }, null, _parent4, _scopeId3));
                        _push4(`<p class="text-xs text-muted-foreground"${_scopeId3}>${ssrInterpolate(form.value.seo_description?.length || 0)}/160 karakter </p>`);
                        if (errors.value.seo_description) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(errors.value.seo_description)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "seo_title" }, {
                              default: withCtx(() => [
                                createTextVNode("SEO Title")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$9), {
                              id: "seo_title",
                              modelValue: form.value.seo_title,
                              "onUpdate:modelValue": ($event) => form.value.seo_title = $event,
                              placeholder: "Judul untuk Google (kosongkan untuk menggunakan judul halaman)",
                              class: { "border-destructive": errors.value.seo_title }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            errors.value.seo_title ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(errors.value.seo_title), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "seo_description" }, {
                              default: withCtx(() => [
                                createTextVNode("SEO Description")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$9), {
                              id: "seo_description",
                              modelValue: form.value.seo_description,
                              "onUpdate:modelValue": ($event) => form.value.seo_description = $event,
                              placeholder: "Deskripsi singkat untuk hasil pencarian (150-160 karakter)",
                              class: { "border-destructive": errors.value.seo_description }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(form.value.seo_description?.length || 0) + "/160 karakter ", 1),
                            errors.value.seo_description ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(errors.value.seo_description), 1)) : createCommentVNode("", true)
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
                            createTextVNode("SEO")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode("Optimasi untuk mesin pencari")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$8), { for: "seo_title" }, {
                            default: withCtx(() => [
                              createTextVNode("SEO Title")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$9), {
                            id: "seo_title",
                            modelValue: form.value.seo_title,
                            "onUpdate:modelValue": ($event) => form.value.seo_title = $event,
                            placeholder: "Judul untuk Google (kosongkan untuk menggunakan judul halaman)",
                            class: { "border-destructive": errors.value.seo_title }
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                          errors.value.seo_title ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive"
                          }, toDisplayString(errors.value.seo_title), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$8), { for: "seo_description" }, {
                            default: withCtx(() => [
                              createTextVNode("SEO Description")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$9), {
                            id: "seo_description",
                            modelValue: form.value.seo_description,
                            "onUpdate:modelValue": ($event) => form.value.seo_description = $event,
                            placeholder: "Deskripsi singkat untuk hasil pencarian (150-160 karakter)",
                            class: { "border-destructive": errors.value.seo_description }
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(form.value.seo_description?.length || 0) + "/160 karakter ", 1),
                          errors.value.seo_description ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive"
                          }, toDisplayString(errors.value.seo_description), 1)) : createCommentVNode("", true)
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="flex justify-end gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), { href: "/admin/pages" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$2), {
                    type: "button",
                    variant: "outline"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Batal `);
                      } else {
                        return [
                          createTextVNode(" Batal ")
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
                        createTextVNode(" Batal ")
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
                  _push3(ssrRenderComponent(unref(Save), { class: "h-4 w-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` Simpan Perubahan `);
                } else {
                  return [
                    createVNode(unref(Save), { class: "h-4 w-4 mr-2" }),
                    createTextVNode(" Simpan Perubahan ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form></div>`);
          } else {
            return [
              createVNode("div", { class: "container mx-auto py-6 space-y-6" }, [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("div", { class: "flex items-center gap-4" }, [
                    createVNode(unref(Link), { href: "/admin/pages" }, {
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
                      createVNode("h1", { class: "text-3xl font-bold tracking-tight" }, "Edit Halaman"),
                      createVNode("p", { class: "text-muted-foreground mt-1" }, toDisplayString(__props.page.title), 1)
                    ])
                  ]),
                  createVNode(unref(_sfc_main$2), {
                    onClick: handleSubmit,
                    disabled: processing.value
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Save), { class: "h-4 w-4 mr-2" }),
                      createTextVNode(" Simpan Perubahan ")
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ]),
                createVNode("form", {
                  onSubmit: withModifiers(handleSubmit, ["prevent"]),
                  class: "space-y-6"
                }, [
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$4), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Informasi Dasar")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("Informasi utama halaman")
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
                                createTextVNode("Judul Halaman *")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$9), {
                              id: "title",
                              modelValue: form.value.title,
                              "onUpdate:modelValue": ($event) => form.value.title = $event,
                              placeholder: "Contoh: Tentang Kami, Kebijakan Privasi",
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
                                createTextVNode("Slug *")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$9), {
                              id: "slug",
                              modelValue: form.value.slug,
                              "onUpdate:modelValue": ($event) => form.value.slug = $event,
                              placeholder: "tentang-kami",
                              class: { "border-destructive": errors.value.slug }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, [
                              createTextVNode(" URL: /page/"),
                              createVNode("span", { class: "font-medium" }, toDisplayString(form.value.slug), 1)
                            ]),
                            errors.value.slug ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(errors.value.slug), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), null, {
                              default: withCtx(() => [
                                createTextVNode("Konten Halaman")
                              ]),
                              _: 1
                            }),
                            createVNode(_sfc_main$a, {
                              modelValue: form.value.blocks,
                              "onUpdate:modelValue": ($event) => form.value.blocks = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, " Gunakan PageBuilder untuk membuat konten dengan berbagai jenis block "),
                            errors.value.blocks ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(errors.value.blocks), 1)) : createCommentVNode("", true)
                          ])
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
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Pengaturan")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("Konfigurasi tampilan dan urutan")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "template" }, {
                              default: withCtx(() => [
                                createTextVNode("Template")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$b), {
                              modelValue: form.value.template,
                              "onUpdate:modelValue": ($event) => form.value.template = $event
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$c), { id: "template" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$d), { placeholder: "Pilih template" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$f), { value: "default" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Default")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$f), { value: "full-width" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Full Width")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$f), { value: "narrow" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Narrow")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"]),
                            errors.value.template ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(errors.value.template), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "order" }, {
                              default: withCtx(() => [
                                createTextVNode("Urutan")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$9), {
                              id: "order",
                              modelValue: form.value.order,
                              "onUpdate:modelValue": ($event) => form.value.order = $event,
                              modelModifiers: { number: true },
                              type: "number",
                              min: "0",
                              class: { "border-destructive": errors.value.order }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, " Semakin kecil angka, semakin tinggi prioritasnya "),
                            errors.value.order ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(errors.value.order), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "flex items-center justify-between space-x-2" }, [
                            createVNode("div", { class: "space-y-0.5" }, [
                              createVNode(unref(_sfc_main$8), { for: "is_published" }, {
                                default: withCtx(() => [
                                  createTextVNode("Status Publikasi")
                                ]),
                                _: 1
                              }),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Publikasikan halaman ini ke website ")
                            ]),
                            createVNode(_sfc_main$g, {
                              id: "is_published",
                              modelValue: form.value.is_published,
                              "onUpdate:modelValue": ($event) => form.value.is_published = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ])
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
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("SEO")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("Optimasi untuk mesin pencari")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "seo_title" }, {
                              default: withCtx(() => [
                                createTextVNode("SEO Title")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$9), {
                              id: "seo_title",
                              modelValue: form.value.seo_title,
                              "onUpdate:modelValue": ($event) => form.value.seo_title = $event,
                              placeholder: "Judul untuk Google (kosongkan untuk menggunakan judul halaman)",
                              class: { "border-destructive": errors.value.seo_title }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            errors.value.seo_title ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(errors.value.seo_title), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "seo_description" }, {
                              default: withCtx(() => [
                                createTextVNode("SEO Description")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$9), {
                              id: "seo_description",
                              modelValue: form.value.seo_description,
                              "onUpdate:modelValue": ($event) => form.value.seo_description = $event,
                              placeholder: "Deskripsi singkat untuk hasil pencarian (150-160 karakter)",
                              class: { "border-destructive": errors.value.seo_description }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(form.value.seo_description?.length || 0) + "/160 karakter ", 1),
                            errors.value.seo_description ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(errors.value.seo_description), 1)) : createCommentVNode("", true)
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "flex justify-end gap-4" }, [
                    createVNode(unref(Link), { href: "/admin/pages" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$2), {
                          type: "button",
                          variant: "outline"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Batal ")
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
                        createVNode(unref(Save), { class: "h-4 w-4 mr-2" }),
                        createTextVNode(" Simpan Perubahan ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Pages/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
