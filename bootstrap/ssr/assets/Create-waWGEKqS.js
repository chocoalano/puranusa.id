import { defineComponent, unref, withCtx, createVNode, createTextVNode, toDisplayString, withModifiers, createBlock, createCommentVNode, openBlock, withDirectives, vModelText, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-BHxY2bcF.js";
import { _ as _sfc_main$3, c as _sfc_main$4 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$2 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$5 } from "./Input-BGi8wCMh.js";
import { toast } from "vue-sonner";
import { ArrowLeft } from "lucide-vue-next";
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
  setup(__props) {
    const form = useForm({
      customer_name: "",
      title: "",
      description: "",
      image: "",
      achievement: "",
      is_active: true,
      sort_order: 0
    });
    const submit = () => {
      form.post("/admin/zenner/hall-of-fames", {
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Hall of Fame berhasil ditambahkan");
        },
        onError: () => {
          toast.error("Gagal menambahkan Hall of Fame");
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Tambah Hall of Fame" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="rounded-xl p-4 space-y-6 py-6"${_scopeId}><div class="flex items-center gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), { href: "/admin/zenner/hall-of-fames" }, {
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
            _push2(`<div${_scopeId}><h1 class="text-3xl font-bold"${_scopeId}>Tambah Hall of Fame</h1><p class="text-muted-foreground"${_scopeId}>Buat entri Hall of Fame baru</p></div></div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$3), { class: "max-w-4xl" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { class: "pt-6" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<form class="space-y-4"${_scopeId3}><div class="space-y-2"${_scopeId3}><label class="text-sm font-medium"${_scopeId3}>Nama Customer</label>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$5), {
                          modelValue: unref(form).customer_name,
                          "onUpdate:modelValue": ($event) => unref(form).customer_name = $event,
                          placeholder: "Nama customer"
                        }, null, _parent4, _scopeId3));
                        if (unref(form).errors.customer_name) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.customer_name)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="space-y-2"${_scopeId3}><label class="text-sm font-medium"${_scopeId3}>Title</label>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$5), {
                          modelValue: unref(form).title,
                          "onUpdate:modelValue": ($event) => unref(form).title = $event,
                          placeholder: "Judul"
                        }, null, _parent4, _scopeId3));
                        if (unref(form).errors.title) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.title)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="space-y-2"${_scopeId3}><label class="text-sm font-medium"${_scopeId3}>Deskripsi</label><textarea class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="Deskripsi"${_scopeId3}>${ssrInterpolate(unref(form).description)}</textarea>`);
                        if (unref(form).errors.description) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.description)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="space-y-2"${_scopeId3}><label class="text-sm font-medium"${_scopeId3}>Image</label>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$5), {
                          modelValue: unref(form).image,
                          "onUpdate:modelValue": ($event) => unref(form).image = $event,
                          placeholder: "URL gambar"
                        }, null, _parent4, _scopeId3));
                        if (unref(form).errors.image) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.image)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="space-y-2"${_scopeId3}><label class="text-sm font-medium"${_scopeId3}>Achievement</label>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$5), {
                          modelValue: unref(form).achievement,
                          "onUpdate:modelValue": ($event) => unref(form).achievement = $event,
                          placeholder: "Achievement"
                        }, null, _parent4, _scopeId3));
                        if (unref(form).errors.achievement) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.achievement)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="space-y-2"${_scopeId3}><label class="text-sm font-medium"${_scopeId3}>Urutan</label>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$5), {
                          modelValue: unref(form).sort_order,
                          "onUpdate:modelValue": ($event) => unref(form).sort_order = $event,
                          type: "number",
                          placeholder: "0"
                        }, null, _parent4, _scopeId3));
                        if (unref(form).errors.sort_order) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.sort_order)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="flex items-center gap-2"${_scopeId3}><input type="checkbox" id="is_active"${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_active) ? ssrLooseContain(unref(form).is_active, null) : unref(form).is_active) ? " checked" : ""} class="h-4 w-4 rounded border-gray-300"${_scopeId3}><label for="is_active" class="text-sm font-medium"${_scopeId3}>Aktif</label></div><div class="flex items-center gap-4 pt-4"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Link), { href: "/admin/zenner/hall-of-fames" }, {
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
                              _push5(`${ssrInterpolate(unref(form).processing ? "Menyimpan..." : "Simpan Hall of Fame")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(unref(form).processing ? "Menyimpan..." : "Simpan Hall of Fame"), 1)
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
                              createVNode("label", { class: "text-sm font-medium" }, "Nama Customer"),
                              createVNode(unref(_sfc_main$5), {
                                modelValue: unref(form).customer_name,
                                "onUpdate:modelValue": ($event) => unref(form).customer_name = $event,
                                placeholder: "Nama customer"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              unref(form).errors.customer_name ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.customer_name), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode("label", { class: "text-sm font-medium" }, "Title"),
                              createVNode(unref(_sfc_main$5), {
                                modelValue: unref(form).title,
                                "onUpdate:modelValue": ($event) => unref(form).title = $event,
                                placeholder: "Judul"
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
                                placeholder: "Deskripsi"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).description]
                              ]),
                              unref(form).errors.description ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.description), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode("label", { class: "text-sm font-medium" }, "Image"),
                              createVNode(unref(_sfc_main$5), {
                                modelValue: unref(form).image,
                                "onUpdate:modelValue": ($event) => unref(form).image = $event,
                                placeholder: "URL gambar"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              unref(form).errors.image ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.image), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode("label", { class: "text-sm font-medium" }, "Achievement"),
                              createVNode(unref(_sfc_main$5), {
                                modelValue: unref(form).achievement,
                                "onUpdate:modelValue": ($event) => unref(form).achievement = $event,
                                placeholder: "Achievement"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              unref(form).errors.achievement ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.achievement), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode("label", { class: "text-sm font-medium" }, "Urutan"),
                              createVNode(unref(_sfc_main$5), {
                                modelValue: unref(form).sort_order,
                                "onUpdate:modelValue": ($event) => unref(form).sort_order = $event,
                                type: "number",
                                placeholder: "0"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              unref(form).errors.sort_order ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.sort_order), 1)) : createCommentVNode("", true)
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
                              createVNode(unref(Link), { href: "/admin/zenner/hall-of-fames" }, {
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
                                  createTextVNode(toDisplayString(unref(form).processing ? "Menyimpan..." : "Simpan Hall of Fame"), 1)
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
                            createVNode("label", { class: "text-sm font-medium" }, "Nama Customer"),
                            createVNode(unref(_sfc_main$5), {
                              modelValue: unref(form).customer_name,
                              "onUpdate:modelValue": ($event) => unref(form).customer_name = $event,
                              placeholder: "Nama customer"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            unref(form).errors.customer_name ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.customer_name), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("label", { class: "text-sm font-medium" }, "Title"),
                            createVNode(unref(_sfc_main$5), {
                              modelValue: unref(form).title,
                              "onUpdate:modelValue": ($event) => unref(form).title = $event,
                              placeholder: "Judul"
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
                              placeholder: "Deskripsi"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).description]
                            ]),
                            unref(form).errors.description ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.description), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("label", { class: "text-sm font-medium" }, "Image"),
                            createVNode(unref(_sfc_main$5), {
                              modelValue: unref(form).image,
                              "onUpdate:modelValue": ($event) => unref(form).image = $event,
                              placeholder: "URL gambar"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            unref(form).errors.image ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.image), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("label", { class: "text-sm font-medium" }, "Achievement"),
                            createVNode(unref(_sfc_main$5), {
                              modelValue: unref(form).achievement,
                              "onUpdate:modelValue": ($event) => unref(form).achievement = $event,
                              placeholder: "Achievement"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            unref(form).errors.achievement ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.achievement), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("label", { class: "text-sm font-medium" }, "Urutan"),
                            createVNode(unref(_sfc_main$5), {
                              modelValue: unref(form).sort_order,
                              "onUpdate:modelValue": ($event) => unref(form).sort_order = $event,
                              type: "number",
                              placeholder: "0"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            unref(form).errors.sort_order ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.sort_order), 1)) : createCommentVNode("", true)
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
                            createVNode(unref(Link), { href: "/admin/zenner/hall-of-fames" }, {
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
                                createTextVNode(toDisplayString(unref(form).processing ? "Menyimpan..." : "Simpan Hall of Fame"), 1)
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
                  createVNode(unref(Link), { href: "/admin/zenner/hall-of-fames" }, {
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
                    createVNode("h1", { class: "text-3xl font-bold" }, "Tambah Hall of Fame"),
                    createVNode("p", { class: "text-muted-foreground" }, "Buat entri Hall of Fame baru")
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
                            createVNode("label", { class: "text-sm font-medium" }, "Nama Customer"),
                            createVNode(unref(_sfc_main$5), {
                              modelValue: unref(form).customer_name,
                              "onUpdate:modelValue": ($event) => unref(form).customer_name = $event,
                              placeholder: "Nama customer"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            unref(form).errors.customer_name ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.customer_name), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("label", { class: "text-sm font-medium" }, "Title"),
                            createVNode(unref(_sfc_main$5), {
                              modelValue: unref(form).title,
                              "onUpdate:modelValue": ($event) => unref(form).title = $event,
                              placeholder: "Judul"
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
                              placeholder: "Deskripsi"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).description]
                            ]),
                            unref(form).errors.description ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.description), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("label", { class: "text-sm font-medium" }, "Image"),
                            createVNode(unref(_sfc_main$5), {
                              modelValue: unref(form).image,
                              "onUpdate:modelValue": ($event) => unref(form).image = $event,
                              placeholder: "URL gambar"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            unref(form).errors.image ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.image), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("label", { class: "text-sm font-medium" }, "Achievement"),
                            createVNode(unref(_sfc_main$5), {
                              modelValue: unref(form).achievement,
                              "onUpdate:modelValue": ($event) => unref(form).achievement = $event,
                              placeholder: "Achievement"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            unref(form).errors.achievement ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.achievement), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("label", { class: "text-sm font-medium" }, "Urutan"),
                            createVNode(unref(_sfc_main$5), {
                              modelValue: unref(form).sort_order,
                              "onUpdate:modelValue": ($event) => unref(form).sort_order = $event,
                              type: "number",
                              placeholder: "0"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            unref(form).errors.sort_order ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.sort_order), 1)) : createCommentVNode("", true)
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
                            createVNode(unref(Link), { href: "/admin/zenner/hall-of-fames" }, {
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
                                createTextVNode(toDisplayString(unref(form).processing ? "Menyimpan..." : "Simpan Hall of Fame"), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Zenner/HallOfFame/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
