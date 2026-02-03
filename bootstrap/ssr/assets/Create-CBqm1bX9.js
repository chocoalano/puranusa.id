import { defineComponent, withCtx, unref, createTextVNode, createVNode, withModifiers, createBlock, createCommentVNode, openBlock, toDisplayString, withDirectives, vModelText, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
import { useForm, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-BHxY2bcF.js";
import { _ as _sfc_main$2, c as _sfc_main$3 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$5 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$4 } from "./Input-BGi8wCMh.js";
import { toast } from "vue-sonner";
import "class-variance-authority";
import "./DropdownMenuTrigger-B1v6pHML.js";
import "reka-ui";
import "@vueuse/core";
import "lucide-vue-next";
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
      content: "",
      category: "",
      is_active: true,
      sort_order: 0
    });
    const submit = () => {
      form.post("/admin/zenner/copywritings", {
        onSuccess: () => toast.success("Data berhasil ditambahkan"),
        onError: () => toast.error("Gagal menyimpan data")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="container mx-auto py-6 space-y-6"${_scopeId}><h1 class="text-3xl font-bold tracking-tight"${_scopeId}>Tambah Copywriting</h1>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "pt-6" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<form class="space-y-4"${_scopeId3}><div${_scopeId3}><label class="block text-sm font-medium mb-1"${_scopeId3}>Title</label>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$4), {
                          modelValue: unref(form).title,
                          "onUpdate:modelValue": ($event) => unref(form).title = $event
                        }, null, _parent4, _scopeId3));
                        if (unref(form).errors.title) {
                          _push4(`<p class="text-sm text-destructive mt-1"${_scopeId3}>${ssrInterpolate(unref(form).errors.title)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div${_scopeId3}><label class="block text-sm font-medium mb-1"${_scopeId3}>Konten</label><textarea rows="6" class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"${_scopeId3}>${ssrInterpolate(unref(form).content)}</textarea>`);
                        if (unref(form).errors.content) {
                          _push4(`<p class="text-sm text-destructive mt-1"${_scopeId3}>${ssrInterpolate(unref(form).errors.content)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div${_scopeId3}><label class="block text-sm font-medium mb-1"${_scopeId3}>Kategori</label>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$4), {
                          modelValue: unref(form).category,
                          "onUpdate:modelValue": ($event) => unref(form).category = $event
                        }, null, _parent4, _scopeId3));
                        if (unref(form).errors.category) {
                          _push4(`<p class="text-sm text-destructive mt-1"${_scopeId3}>${ssrInterpolate(unref(form).errors.category)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div${_scopeId3}><label class="block text-sm font-medium mb-1"${_scopeId3}>Urutan</label>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$4), {
                          modelValue: unref(form).sort_order,
                          "onUpdate:modelValue": ($event) => unref(form).sort_order = $event,
                          type: "number"
                        }, null, _parent4, _scopeId3));
                        if (unref(form).errors.sort_order) {
                          _push4(`<p class="text-sm text-destructive mt-1"${_scopeId3}>${ssrInterpolate(unref(form).errors.sort_order)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="flex items-center gap-2"${_scopeId3}><input type="checkbox" id="is_active"${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_active) ? ssrLooseContain(unref(form).is_active, null) : unref(form).is_active) ? " checked" : ""} class="rounded"${_scopeId3}><label for="is_active" class="text-sm"${_scopeId3}>Aktif</label></div><div class="flex gap-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$5), {
                          type: "submit",
                          disabled: unref(form).processing
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Simpan`);
                            } else {
                              return [
                                createTextVNode("Simpan")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$5), {
                          variant: "outline",
                          "as-child": ""
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Link), { href: "/admin/zenner/copywritings" }, {
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
                                createVNode(unref(Link), { href: "/admin/zenner/copywritings" }, {
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
                        _push4(`</div></form>`);
                      } else {
                        return [
                          createVNode("form", {
                            onSubmit: withModifiers(submit, ["prevent"]),
                            class: "space-y-4"
                          }, [
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium mb-1" }, "Title"),
                              createVNode(unref(_sfc_main$4), {
                                modelValue: unref(form).title,
                                "onUpdate:modelValue": ($event) => unref(form).title = $event
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              unref(form).errors.title ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive mt-1"
                              }, toDisplayString(unref(form).errors.title), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium mb-1" }, "Konten"),
                              withDirectives(createVNode("textarea", {
                                "onUpdate:modelValue": ($event) => unref(form).content = $event,
                                rows: "6",
                                class: "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).content]
                              ]),
                              unref(form).errors.content ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive mt-1"
                              }, toDisplayString(unref(form).errors.content), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium mb-1" }, "Kategori"),
                              createVNode(unref(_sfc_main$4), {
                                modelValue: unref(form).category,
                                "onUpdate:modelValue": ($event) => unref(form).category = $event
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              unref(form).errors.category ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive mt-1"
                              }, toDisplayString(unref(form).errors.category), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium mb-1" }, "Urutan"),
                              createVNode(unref(_sfc_main$4), {
                                modelValue: unref(form).sort_order,
                                "onUpdate:modelValue": ($event) => unref(form).sort_order = $event,
                                type: "number"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              unref(form).errors.sort_order ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive mt-1"
                              }, toDisplayString(unref(form).errors.sort_order), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              withDirectives(createVNode("input", {
                                type: "checkbox",
                                id: "is_active",
                                "onUpdate:modelValue": ($event) => unref(form).is_active = $event,
                                class: "rounded"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelCheckbox, unref(form).is_active]
                              ]),
                              createVNode("label", {
                                for: "is_active",
                                class: "text-sm"
                              }, "Aktif")
                            ]),
                            createVNode("div", { class: "flex gap-2" }, [
                              createVNode(unref(_sfc_main$5), {
                                type: "submit",
                                disabled: unref(form).processing
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Simpan")
                                ]),
                                _: 1
                              }, 8, ["disabled"]),
                              createVNode(unref(_sfc_main$5), {
                                variant: "outline",
                                "as-child": ""
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Link), { href: "/admin/zenner/copywritings" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Batal")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ])
                          ], 32)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), { class: "pt-6" }, {
                      default: withCtx(() => [
                        createVNode("form", {
                          onSubmit: withModifiers(submit, ["prevent"]),
                          class: "space-y-4"
                        }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium mb-1" }, "Title"),
                            createVNode(unref(_sfc_main$4), {
                              modelValue: unref(form).title,
                              "onUpdate:modelValue": ($event) => unref(form).title = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            unref(form).errors.title ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive mt-1"
                            }, toDisplayString(unref(form).errors.title), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium mb-1" }, "Konten"),
                            withDirectives(createVNode("textarea", {
                              "onUpdate:modelValue": ($event) => unref(form).content = $event,
                              rows: "6",
                              class: "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).content]
                            ]),
                            unref(form).errors.content ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive mt-1"
                            }, toDisplayString(unref(form).errors.content), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium mb-1" }, "Kategori"),
                            createVNode(unref(_sfc_main$4), {
                              modelValue: unref(form).category,
                              "onUpdate:modelValue": ($event) => unref(form).category = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            unref(form).errors.category ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive mt-1"
                            }, toDisplayString(unref(form).errors.category), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium mb-1" }, "Urutan"),
                            createVNode(unref(_sfc_main$4), {
                              modelValue: unref(form).sort_order,
                              "onUpdate:modelValue": ($event) => unref(form).sort_order = $event,
                              type: "number"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            unref(form).errors.sort_order ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive mt-1"
                            }, toDisplayString(unref(form).errors.sort_order), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            withDirectives(createVNode("input", {
                              type: "checkbox",
                              id: "is_active",
                              "onUpdate:modelValue": ($event) => unref(form).is_active = $event,
                              class: "rounded"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelCheckbox, unref(form).is_active]
                            ]),
                            createVNode("label", {
                              for: "is_active",
                              class: "text-sm"
                            }, "Aktif")
                          ]),
                          createVNode("div", { class: "flex gap-2" }, [
                            createVNode(unref(_sfc_main$5), {
                              type: "submit",
                              disabled: unref(form).processing
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Simpan")
                              ]),
                              _: 1
                            }, 8, ["disabled"]),
                            createVNode(unref(_sfc_main$5), {
                              variant: "outline",
                              "as-child": ""
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Link), { href: "/admin/zenner/copywritings" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Batal")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
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
              createVNode("div", { class: "container mx-auto py-6 space-y-6" }, [
                createVNode("h1", { class: "text-3xl font-bold tracking-tight" }, "Tambah Copywriting"),
                createVNode(unref(_sfc_main$2), null, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$3), { class: "pt-6" }, {
                      default: withCtx(() => [
                        createVNode("form", {
                          onSubmit: withModifiers(submit, ["prevent"]),
                          class: "space-y-4"
                        }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium mb-1" }, "Title"),
                            createVNode(unref(_sfc_main$4), {
                              modelValue: unref(form).title,
                              "onUpdate:modelValue": ($event) => unref(form).title = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            unref(form).errors.title ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive mt-1"
                            }, toDisplayString(unref(form).errors.title), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium mb-1" }, "Konten"),
                            withDirectives(createVNode("textarea", {
                              "onUpdate:modelValue": ($event) => unref(form).content = $event,
                              rows: "6",
                              class: "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).content]
                            ]),
                            unref(form).errors.content ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive mt-1"
                            }, toDisplayString(unref(form).errors.content), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium mb-1" }, "Kategori"),
                            createVNode(unref(_sfc_main$4), {
                              modelValue: unref(form).category,
                              "onUpdate:modelValue": ($event) => unref(form).category = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            unref(form).errors.category ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive mt-1"
                            }, toDisplayString(unref(form).errors.category), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium mb-1" }, "Urutan"),
                            createVNode(unref(_sfc_main$4), {
                              modelValue: unref(form).sort_order,
                              "onUpdate:modelValue": ($event) => unref(form).sort_order = $event,
                              type: "number"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            unref(form).errors.sort_order ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive mt-1"
                            }, toDisplayString(unref(form).errors.sort_order), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            withDirectives(createVNode("input", {
                              type: "checkbox",
                              id: "is_active",
                              "onUpdate:modelValue": ($event) => unref(form).is_active = $event,
                              class: "rounded"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelCheckbox, unref(form).is_active]
                            ]),
                            createVNode("label", {
                              for: "is_active",
                              class: "text-sm"
                            }, "Aktif")
                          ]),
                          createVNode("div", { class: "flex gap-2" }, [
                            createVNode(unref(_sfc_main$5), {
                              type: "submit",
                              disabled: unref(form).processing
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Simpan")
                              ]),
                              _: 1
                            }, 8, ["disabled"]),
                            createVNode(unref(_sfc_main$5), {
                              variant: "outline",
                              "as-child": ""
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Link), { href: "/admin/zenner/copywritings" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Batal")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
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
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Zenner/Copywriting/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
