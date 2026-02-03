import { defineComponent, unref, withCtx, createVNode, createTextVNode, toDisplayString, withModifiers, createBlock, createCommentVNode, openBlock, withDirectives, vModelText, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-B9pGpPI9.js";
import { _ as _sfc_main$3, c as _sfc_main$4 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$2 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$5 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$6, a as _sfc_main$7, b as _sfc_main$8, c as _sfc_main$9, d as _sfc_main$a } from "./SelectValue-BUnv4mQg.js";
import { toast } from "vue-sonner";
import { ArrowLeft } from "lucide-vue-next";
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
  __name: "Create",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      title: "",
      description: "",
      template_image: "",
      type: "completion",
      is_active: true
    });
    const submit = () => {
      form.post("/admin/zenner/certificates", {
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Sertifikat berhasil ditambahkan");
        },
        onError: () => {
          toast.error("Gagal menambahkan sertifikat");
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Tambah Sertifikat" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="rounded-xl p-4 space-y-6 py-6"${_scopeId}><div class="flex items-center gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), { href: "/admin/zenner/certificates" }, {
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
            _push2(`<div${_scopeId}><h1 class="text-3xl font-bold"${_scopeId}>Tambah Sertifikat</h1><p class="text-muted-foreground"${_scopeId}>Buat sertifikat baru</p></div></div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$3), { class: "max-w-4xl" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { class: "pt-6" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<form class="space-y-4"${_scopeId3}><div class="space-y-2"${_scopeId3}><label class="text-sm font-medium"${_scopeId3}>Title</label>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$5), {
                          modelValue: unref(form).title,
                          "onUpdate:modelValue": ($event) => unref(form).title = $event,
                          placeholder: "Judul sertifikat"
                        }, null, _parent4, _scopeId3));
                        if (unref(form).errors.title) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.title)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="space-y-2"${_scopeId3}><label class="text-sm font-medium"${_scopeId3}>Deskripsi</label><textarea class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="Deskripsi sertifikat"${_scopeId3}>${ssrInterpolate(unref(form).description)}</textarea>`);
                        if (unref(form).errors.description) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.description)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="space-y-2"${_scopeId3}><label class="text-sm font-medium"${_scopeId3}>Template Image</label>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$5), {
                          modelValue: unref(form).template_image,
                          "onUpdate:modelValue": ($event) => unref(form).template_image = $event,
                          placeholder: "URL template image"
                        }, null, _parent4, _scopeId3));
                        if (unref(form).errors.template_image) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.template_image)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="space-y-2"${_scopeId3}><label class="text-sm font-medium"${_scopeId3}>Tipe</label>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$6), {
                          modelValue: unref(form).type,
                          "onUpdate:modelValue": ($event) => unref(form).type = $event
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$7), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$8), { placeholder: "Pilih tipe" }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$8), { placeholder: "Pilih tipe" })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$9), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
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
                                createVNode(unref(_sfc_main$7), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$8), { placeholder: "Pilih tipe" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$9), null, {
                                  default: withCtx(() => [
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
                        if (unref(form).errors.type) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.type)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="flex items-center gap-2"${_scopeId3}><input type="checkbox" id="is_active"${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_active) ? ssrLooseContain(unref(form).is_active, null) : unref(form).is_active) ? " checked" : ""} class="h-4 w-4 rounded border-gray-300"${_scopeId3}><label for="is_active" class="text-sm font-medium"${_scopeId3}>Aktif</label></div><div class="flex items-center gap-4 pt-4"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Link), { href: "/admin/zenner/certificates" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$2), {
                                type: "button",
                                variant: "outline"
                              }, {
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
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$2), {
                          type: "submit",
                          disabled: unref(form).processing
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(unref(form).processing ? "Menyimpan..." : "Simpan Sertifikat")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(unref(form).processing ? "Menyimpan..." : "Simpan Sertifikat"), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div></form>`);
                      } else {
                        return [
                          createVNode("form", {
                            onSubmit: withModifiers(submit, ["prevent"]),
                            class: "space-y-4"
                          }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode("label", { class: "text-sm font-medium" }, "Title"),
                              createVNode(unref(_sfc_main$5), {
                                modelValue: unref(form).title,
                                "onUpdate:modelValue": ($event) => unref(form).title = $event,
                                placeholder: "Judul sertifikat"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              unref(form).errors.title ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.title), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode("label", { class: "text-sm font-medium" }, "Deskripsi"),
                              withDirectives(createVNode("textarea", {
                                "onUpdate:modelValue": ($event) => unref(form).description = $event,
                                class: "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                placeholder: "Deskripsi sertifikat"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).description]
                              ]),
                              unref(form).errors.description ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.description), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode("label", { class: "text-sm font-medium" }, "Template Image"),
                              createVNode(unref(_sfc_main$5), {
                                modelValue: unref(form).template_image,
                                "onUpdate:modelValue": ($event) => unref(form).template_image = $event,
                                placeholder: "URL template image"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              unref(form).errors.template_image ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.template_image), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode("label", { class: "text-sm font-medium" }, "Tipe"),
                              createVNode(unref(_sfc_main$6), {
                                modelValue: unref(form).type,
                                "onUpdate:modelValue": ($event) => unref(form).type = $event
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$7), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$8), { placeholder: "Pilih tipe" })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$9), null, {
                                    default: withCtx(() => [
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
                              unref(form).errors.type ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.type), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              withDirectives(createVNode("input", {
                                type: "checkbox",
                                id: "is_active",
                                "onUpdate:modelValue": ($event) => unref(form).is_active = $event,
                                class: "h-4 w-4 rounded border-gray-300"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelCheckbox, unref(form).is_active]
                              ]),
                              createVNode("label", {
                                for: "is_active",
                                class: "text-sm font-medium"
                              }, "Aktif")
                            ]),
                            createVNode("div", { class: "flex items-center gap-4 pt-4" }, [
                              createVNode(unref(Link), { href: "/admin/zenner/certificates" }, {
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
                                disabled: unref(form).processing
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(unref(form).processing ? "Menyimpan..." : "Simpan Sertifikat"), 1)
                                ]),
                                _: 1
                              }, 8, ["disabled"])
                            ])
                          ], 32)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$4), { class: "pt-6" }, {
                      default: withCtx(() => [
                        createVNode("form", {
                          onSubmit: withModifiers(submit, ["prevent"]),
                          class: "space-y-4"
                        }, [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("label", { class: "text-sm font-medium" }, "Title"),
                            createVNode(unref(_sfc_main$5), {
                              modelValue: unref(form).title,
                              "onUpdate:modelValue": ($event) => unref(form).title = $event,
                              placeholder: "Judul sertifikat"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            unref(form).errors.title ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.title), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("label", { class: "text-sm font-medium" }, "Deskripsi"),
                            withDirectives(createVNode("textarea", {
                              "onUpdate:modelValue": ($event) => unref(form).description = $event,
                              class: "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                              placeholder: "Deskripsi sertifikat"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).description]
                            ]),
                            unref(form).errors.description ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.description), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("label", { class: "text-sm font-medium" }, "Template Image"),
                            createVNode(unref(_sfc_main$5), {
                              modelValue: unref(form).template_image,
                              "onUpdate:modelValue": ($event) => unref(form).template_image = $event,
                              placeholder: "URL template image"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            unref(form).errors.template_image ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.template_image), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("label", { class: "text-sm font-medium" }, "Tipe"),
                            createVNode(unref(_sfc_main$6), {
                              modelValue: unref(form).type,
                              "onUpdate:modelValue": ($event) => unref(form).type = $event
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$7), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$8), { placeholder: "Pilih tipe" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$9), null, {
                                  default: withCtx(() => [
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
                            unref(form).errors.type ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.type), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            withDirectives(createVNode("input", {
                              type: "checkbox",
                              id: "is_active",
                              "onUpdate:modelValue": ($event) => unref(form).is_active = $event,
                              class: "h-4 w-4 rounded border-gray-300"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelCheckbox, unref(form).is_active]
                            ]),
                            createVNode("label", {
                              for: "is_active",
                              class: "text-sm font-medium"
                            }, "Aktif")
                          ]),
                          createVNode("div", { class: "flex items-center gap-4 pt-4" }, [
                            createVNode(unref(Link), { href: "/admin/zenner/certificates" }, {
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
                              disabled: unref(form).processing
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(form).processing ? "Menyimpan..." : "Simpan Sertifikat"), 1)
                              ]),
                              _: 1
                            }, 8, ["disabled"])
                          ])
                        ], 32)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "rounded-xl p-4 space-y-6 py-6" }, [
                createVNode("div", { class: "flex items-center gap-4" }, [
                  createVNode(unref(Link), { href: "/admin/zenner/certificates" }, {
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
                    createVNode("h1", { class: "text-3xl font-bold" }, "Tambah Sertifikat"),
                    createVNode("p", { class: "text-muted-foreground" }, "Buat sertifikat baru")
                  ])
                ]),
                createVNode(unref(_sfc_main$3), { class: "max-w-4xl" }, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$4), { class: "pt-6" }, {
                      default: withCtx(() => [
                        createVNode("form", {
                          onSubmit: withModifiers(submit, ["prevent"]),
                          class: "space-y-4"
                        }, [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("label", { class: "text-sm font-medium" }, "Title"),
                            createVNode(unref(_sfc_main$5), {
                              modelValue: unref(form).title,
                              "onUpdate:modelValue": ($event) => unref(form).title = $event,
                              placeholder: "Judul sertifikat"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            unref(form).errors.title ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.title), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("label", { class: "text-sm font-medium" }, "Deskripsi"),
                            withDirectives(createVNode("textarea", {
                              "onUpdate:modelValue": ($event) => unref(form).description = $event,
                              class: "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                              placeholder: "Deskripsi sertifikat"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).description]
                            ]),
                            unref(form).errors.description ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.description), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("label", { class: "text-sm font-medium" }, "Template Image"),
                            createVNode(unref(_sfc_main$5), {
                              modelValue: unref(form).template_image,
                              "onUpdate:modelValue": ($event) => unref(form).template_image = $event,
                              placeholder: "URL template image"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            unref(form).errors.template_image ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.template_image), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("label", { class: "text-sm font-medium" }, "Tipe"),
                            createVNode(unref(_sfc_main$6), {
                              modelValue: unref(form).type,
                              "onUpdate:modelValue": ($event) => unref(form).type = $event
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$7), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$8), { placeholder: "Pilih tipe" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$9), null, {
                                  default: withCtx(() => [
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
                            unref(form).errors.type ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.type), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            withDirectives(createVNode("input", {
                              type: "checkbox",
                              id: "is_active",
                              "onUpdate:modelValue": ($event) => unref(form).is_active = $event,
                              class: "h-4 w-4 rounded border-gray-300"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelCheckbox, unref(form).is_active]
                            ]),
                            createVNode("label", {
                              for: "is_active",
                              class: "text-sm font-medium"
                            }, "Aktif")
                          ]),
                          createVNode("div", { class: "flex items-center gap-4 pt-4" }, [
                            createVNode(unref(Link), { href: "/admin/zenner/certificates" }, {
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
                              disabled: unref(form).processing
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(form).processing ? "Menyimpan..." : "Simpan Sertifikat"), 1)
                              ]),
                              _: 1
                            }, 8, ["disabled"])
                          ])
                        ], 32)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Zenner/Certificate/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
