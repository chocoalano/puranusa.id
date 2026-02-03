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
      title: "",
      description: "",
      image: "",
      start_date: "",
      end_date: "",
      reward: "",
      is_active: true
    });
    const submit = () => {
      form.post("/admin/zenner/monthly-challenges", {
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Monthly Challenge berhasil ditambahkan");
        },
        onError: () => {
          toast.error("Gagal menambahkan Monthly Challenge");
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Tambah Monthly Challenge" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="rounded-xl p-4 space-y-6 py-6"${_scopeId}><div class="flex items-center gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), { href: "/admin/zenner/monthly-challenges" }, {
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
            _push2(`<div${_scopeId}><h1 class="text-3xl font-bold"${_scopeId}>Tambah Monthly Challenge</h1><p class="text-muted-foreground"${_scopeId}>Buat tantangan bulanan baru</p></div></div>`);
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
                          placeholder: "Judul challenge"
                        }, null, _parent4, _scopeId3));
                        if (unref(form).errors.title) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.title)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="space-y-2"${_scopeId3}><label class="text-sm font-medium"${_scopeId3}>Deskripsi</label><textarea class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="Deskripsi challenge"${_scopeId3}>${ssrInterpolate(unref(form).description)}</textarea>`);
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
                        _push4(`</div><div class="grid grid-cols-2 gap-4"${_scopeId3}><div class="space-y-2"${_scopeId3}><label class="text-sm font-medium"${_scopeId3}>Tanggal Mulai</label>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$5), {
                          modelValue: unref(form).start_date,
                          "onUpdate:modelValue": ($event) => unref(form).start_date = $event,
                          type: "date"
                        }, null, _parent4, _scopeId3));
                        if (unref(form).errors.start_date) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.start_date)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="space-y-2"${_scopeId3}><label class="text-sm font-medium"${_scopeId3}>Tanggal Selesai</label>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$5), {
                          modelValue: unref(form).end_date,
                          "onUpdate:modelValue": ($event) => unref(form).end_date = $event,
                          type: "date"
                        }, null, _parent4, _scopeId3));
                        if (unref(form).errors.end_date) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.end_date)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div></div><div class="space-y-2"${_scopeId3}><label class="text-sm font-medium"${_scopeId3}>Reward</label><textarea class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="Deskripsi reward"${_scopeId3}>${ssrInterpolate(unref(form).reward)}</textarea>`);
                        if (unref(form).errors.reward) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.reward)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="flex items-center gap-2"${_scopeId3}><input type="checkbox" id="is_active"${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_active) ? ssrLooseContain(unref(form).is_active, null) : unref(form).is_active) ? " checked" : ""} class="h-4 w-4 rounded border-gray-300"${_scopeId3}><label for="is_active" class="text-sm font-medium"${_scopeId3}>Aktif</label></div><div class="flex items-center gap-4 pt-4"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Link), { href: "/admin/zenner/monthly-challenges" }, {
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
                              _push5(`${ssrInterpolate(unref(form).processing ? "Menyimpan..." : "Simpan Challenge")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(unref(form).processing ? "Menyimpan..." : "Simpan Challenge"), 1)
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
                                placeholder: "Judul challenge"
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
                                placeholder: "Deskripsi challenge"
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
                            createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                              createVNode("div", { class: "space-y-2" }, [
                                createVNode("label", { class: "text-sm font-medium" }, "Tanggal Mulai"),
                                createVNode(unref(_sfc_main$5), {
                                  modelValue: unref(form).start_date,
                                  "onUpdate:modelValue": ($event) => unref(form).start_date = $event,
                                  type: "date"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                unref(form).errors.start_date ? (openBlock(), createBlock("p", {
                                  key: 0,
                                  class: "text-sm text-destructive"
                                }, toDisplayString(unref(form).errors.start_date), 1)) : createCommentVNode("", true)
                              ]),
                              createVNode("div", { class: "space-y-2" }, [
                                createVNode("label", { class: "text-sm font-medium" }, "Tanggal Selesai"),
                                createVNode(unref(_sfc_main$5), {
                                  modelValue: unref(form).end_date,
                                  "onUpdate:modelValue": ($event) => unref(form).end_date = $event,
                                  type: "date"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                unref(form).errors.end_date ? (openBlock(), createBlock("p", {
                                  key: 0,
                                  class: "text-sm text-destructive"
                                }, toDisplayString(unref(form).errors.end_date), 1)) : createCommentVNode("", true)
                              ])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode("label", { class: "text-sm font-medium" }, "Reward"),
                              withDirectives(createVNode("textarea", {
                                "onUpdate:modelValue": ($event) => unref(form).reward = $event,
                                class: "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                placeholder: "Deskripsi reward"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).reward]
                              ]),
                              unref(form).errors.reward ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.reward), 1)) : createCommentVNode("", true)
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
                              createVNode(unref(Link), { href: "/admin/zenner/monthly-challenges" }, {
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
                                  createTextVNode(toDisplayString(unref(form).processing ? "Menyimpan..." : "Simpan Challenge"), 1)
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
                              placeholder: "Judul challenge"
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
                              placeholder: "Deskripsi challenge"
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
                          createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode("label", { class: "text-sm font-medium" }, "Tanggal Mulai"),
                              createVNode(unref(_sfc_main$5), {
                                modelValue: unref(form).start_date,
                                "onUpdate:modelValue": ($event) => unref(form).start_date = $event,
                                type: "date"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              unref(form).errors.start_date ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.start_date), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode("label", { class: "text-sm font-medium" }, "Tanggal Selesai"),
                              createVNode(unref(_sfc_main$5), {
                                modelValue: unref(form).end_date,
                                "onUpdate:modelValue": ($event) => unref(form).end_date = $event,
                                type: "date"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              unref(form).errors.end_date ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.end_date), 1)) : createCommentVNode("", true)
                            ])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("label", { class: "text-sm font-medium" }, "Reward"),
                            withDirectives(createVNode("textarea", {
                              "onUpdate:modelValue": ($event) => unref(form).reward = $event,
                              class: "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                              placeholder: "Deskripsi reward"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).reward]
                            ]),
                            unref(form).errors.reward ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.reward), 1)) : createCommentVNode("", true)
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
                            createVNode(unref(Link), { href: "/admin/zenner/monthly-challenges" }, {
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
                                createTextVNode(toDisplayString(unref(form).processing ? "Menyimpan..." : "Simpan Challenge"), 1)
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
                  createVNode(unref(Link), { href: "/admin/zenner/monthly-challenges" }, {
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
                    createVNode("h1", { class: "text-3xl font-bold" }, "Tambah Monthly Challenge"),
                    createVNode("p", { class: "text-muted-foreground" }, "Buat tantangan bulanan baru")
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
                              placeholder: "Judul challenge"
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
                              placeholder: "Deskripsi challenge"
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
                          createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode("label", { class: "text-sm font-medium" }, "Tanggal Mulai"),
                              createVNode(unref(_sfc_main$5), {
                                modelValue: unref(form).start_date,
                                "onUpdate:modelValue": ($event) => unref(form).start_date = $event,
                                type: "date"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              unref(form).errors.start_date ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.start_date), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode("label", { class: "text-sm font-medium" }, "Tanggal Selesai"),
                              createVNode(unref(_sfc_main$5), {
                                modelValue: unref(form).end_date,
                                "onUpdate:modelValue": ($event) => unref(form).end_date = $event,
                                type: "date"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              unref(form).errors.end_date ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.end_date), 1)) : createCommentVNode("", true)
                            ])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("label", { class: "text-sm font-medium" }, "Reward"),
                            withDirectives(createVNode("textarea", {
                              "onUpdate:modelValue": ($event) => unref(form).reward = $event,
                              class: "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                              placeholder: "Deskripsi reward"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).reward]
                            ]),
                            unref(form).errors.reward ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.reward), 1)) : createCommentVNode("", true)
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
                            createVNode(unref(Link), { href: "/admin/zenner/monthly-challenges" }, {
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
                                createTextVNode(toDisplayString(unref(form).processing ? "Menyimpan..." : "Simpan Challenge"), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Zenner/MonthlyChallenge/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
