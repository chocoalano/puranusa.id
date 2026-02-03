import { defineComponent, withCtx, unref, createTextVNode, createVNode, withModifiers, createBlock, createCommentVNode, openBlock, toDisplayString, withDirectives, vModelText, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
import { useForm, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-B9pGpPI9.js";
import { _ as _sfc_main$2, a as _sfc_main$3, c as _sfc_main$5 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$4 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$6 } from "./Input-BGi8wCMh.js";
import { toast } from "vue-sonner";
import "class-variance-authority";
import "./DropdownMenuTrigger-B1v6pHML.js";
import "reka-ui";
import "@vueuse/core";
import "lucide-vue-next";
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
      content: "",
      image: "",
      category: "",
      is_active: true,
      sort_order: 0
    });
    const submit = () => {
      form.post("/admin/zenner/selling-guides", {
        onSuccess: () => toast.success("Selling Guide berhasil dibuat")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex items-center justify-between"${_scopeId3}><h2 class="text-xl font-semibold"${_scopeId3}>Tambah Selling Guide</h2>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$4), {
                          variant: "outline",
                          onClick: ($event) => unref(router).visit("/admin/zenner/selling-guides")
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Kembali`);
                            } else {
                              return [
                                createTextVNode("Kembali")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center justify-between" }, [
                            createVNode("h2", { class: "text-xl font-semibold" }, "Tambah Selling Guide"),
                            createVNode(unref(_sfc_main$4), {
                              variant: "outline",
                              onClick: ($event) => unref(router).visit("/admin/zenner/selling-guides")
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Kembali")
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<form class="space-y-4"${_scopeId3}><div${_scopeId3}><label class="mb-1 block text-sm font-medium"${_scopeId3}>Title</label>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$6), {
                          modelValue: unref(form).title,
                          "onUpdate:modelValue": ($event) => unref(form).title = $event
                        }, null, _parent4, _scopeId3));
                        if (unref(form).errors.title) {
                          _push4(`<p class="mt-1 text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.title)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div${_scopeId3}><label class="mb-1 block text-sm font-medium"${_scopeId3}>Content</label><textarea rows="6" class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"${_scopeId3}>${ssrInterpolate(unref(form).content)}</textarea>`);
                        if (unref(form).errors.content) {
                          _push4(`<p class="mt-1 text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.content)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div${_scopeId3}><label class="mb-1 block text-sm font-medium"${_scopeId3}>Image</label>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$6), {
                          modelValue: unref(form).image,
                          "onUpdate:modelValue": ($event) => unref(form).image = $event
                        }, null, _parent4, _scopeId3));
                        if (unref(form).errors.image) {
                          _push4(`<p class="mt-1 text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.image)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div${_scopeId3}><label class="mb-1 block text-sm font-medium"${_scopeId3}>Category</label>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$6), {
                          modelValue: unref(form).category,
                          "onUpdate:modelValue": ($event) => unref(form).category = $event
                        }, null, _parent4, _scopeId3));
                        if (unref(form).errors.category) {
                          _push4(`<p class="mt-1 text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.category)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="flex items-center gap-2"${_scopeId3}><input type="checkbox" id="is_active"${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_active) ? ssrLooseContain(unref(form).is_active, null) : unref(form).is_active) ? " checked" : ""} class="rounded border-input"${_scopeId3}><label for="is_active" class="text-sm font-medium"${_scopeId3}>Aktif</label></div><div${_scopeId3}><label class="mb-1 block text-sm font-medium"${_scopeId3}>Sort Order</label>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$6), {
                          modelValue: unref(form).sort_order,
                          "onUpdate:modelValue": ($event) => unref(form).sort_order = $event,
                          modelModifiers: { number: true },
                          type: "number"
                        }, null, _parent4, _scopeId3));
                        if (unref(form).errors.sort_order) {
                          _push4(`<p class="mt-1 text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.sort_order)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$4), {
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
                        _push4(`</form>`);
                      } else {
                        return [
                          createVNode("form", {
                            onSubmit: withModifiers(submit, ["prevent"]),
                            class: "space-y-4"
                          }, [
                            createVNode("div", null, [
                              createVNode("label", { class: "mb-1 block text-sm font-medium" }, "Title"),
                              createVNode(unref(_sfc_main$6), {
                                modelValue: unref(form).title,
                                "onUpdate:modelValue": ($event) => unref(form).title = $event
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              unref(form).errors.title ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "mt-1 text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.title), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "mb-1 block text-sm font-medium" }, "Content"),
                              withDirectives(createVNode("textarea", {
                                "onUpdate:modelValue": ($event) => unref(form).content = $event,
                                rows: "6",
                                class: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).content]
                              ]),
                              unref(form).errors.content ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "mt-1 text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.content), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "mb-1 block text-sm font-medium" }, "Image"),
                              createVNode(unref(_sfc_main$6), {
                                modelValue: unref(form).image,
                                "onUpdate:modelValue": ($event) => unref(form).image = $event
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              unref(form).errors.image ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "mt-1 text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.image), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "mb-1 block text-sm font-medium" }, "Category"),
                              createVNode(unref(_sfc_main$6), {
                                modelValue: unref(form).category,
                                "onUpdate:modelValue": ($event) => unref(form).category = $event
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              unref(form).errors.category ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "mt-1 text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.category), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              withDirectives(createVNode("input", {
                                type: "checkbox",
                                id: "is_active",
                                "onUpdate:modelValue": ($event) => unref(form).is_active = $event,
                                class: "rounded border-input"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelCheckbox, unref(form).is_active]
                              ]),
                              createVNode("label", {
                                for: "is_active",
                                class: "text-sm font-medium"
                              }, "Aktif")
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "mb-1 block text-sm font-medium" }, "Sort Order"),
                              createVNode(unref(_sfc_main$6), {
                                modelValue: unref(form).sort_order,
                                "onUpdate:modelValue": ($event) => unref(form).sort_order = $event,
                                modelModifiers: { number: true },
                                type: "number"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              unref(form).errors.sort_order ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "mt-1 text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.sort_order), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode(unref(_sfc_main$4), {
                              type: "submit",
                              disabled: unref(form).processing
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Simpan")
                              ]),
                              _: 1
                            }, 8, ["disabled"])
                          ], 32)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("h2", { class: "text-xl font-semibold" }, "Tambah Selling Guide"),
                          createVNode(unref(_sfc_main$4), {
                            variant: "outline",
                            onClick: ($event) => unref(router).visit("/admin/zenner/selling-guides")
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Kembali")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createVNode("form", {
                          onSubmit: withModifiers(submit, ["prevent"]),
                          class: "space-y-4"
                        }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "mb-1 block text-sm font-medium" }, "Title"),
                            createVNode(unref(_sfc_main$6), {
                              modelValue: unref(form).title,
                              "onUpdate:modelValue": ($event) => unref(form).title = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            unref(form).errors.title ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "mt-1 text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.title), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "mb-1 block text-sm font-medium" }, "Content"),
                            withDirectives(createVNode("textarea", {
                              "onUpdate:modelValue": ($event) => unref(form).content = $event,
                              rows: "6",
                              class: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).content]
                            ]),
                            unref(form).errors.content ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "mt-1 text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.content), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "mb-1 block text-sm font-medium" }, "Image"),
                            createVNode(unref(_sfc_main$6), {
                              modelValue: unref(form).image,
                              "onUpdate:modelValue": ($event) => unref(form).image = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            unref(form).errors.image ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "mt-1 text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.image), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "mb-1 block text-sm font-medium" }, "Category"),
                            createVNode(unref(_sfc_main$6), {
                              modelValue: unref(form).category,
                              "onUpdate:modelValue": ($event) => unref(form).category = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            unref(form).errors.category ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "mt-1 text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.category), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            withDirectives(createVNode("input", {
                              type: "checkbox",
                              id: "is_active",
                              "onUpdate:modelValue": ($event) => unref(form).is_active = $event,
                              class: "rounded border-input"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelCheckbox, unref(form).is_active]
                            ]),
                            createVNode("label", {
                              for: "is_active",
                              class: "text-sm font-medium"
                            }, "Aktif")
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "mb-1 block text-sm font-medium" }, "Sort Order"),
                            createVNode(unref(_sfc_main$6), {
                              modelValue: unref(form).sort_order,
                              "onUpdate:modelValue": ($event) => unref(form).sort_order = $event,
                              modelModifiers: { number: true },
                              type: "number"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            unref(form).errors.sort_order ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "mt-1 text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.sort_order), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode(unref(_sfc_main$4), {
                            type: "submit",
                            disabled: unref(form).processing
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Simpan")
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ], 32)
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
              createVNode(unref(_sfc_main$2), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("h2", { class: "text-xl font-semibold" }, "Tambah Selling Guide"),
                        createVNode(unref(_sfc_main$4), {
                          variant: "outline",
                          onClick: ($event) => unref(router).visit("/admin/zenner/selling-guides")
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Kembali")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$5), null, {
                    default: withCtx(() => [
                      createVNode("form", {
                        onSubmit: withModifiers(submit, ["prevent"]),
                        class: "space-y-4"
                      }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "mb-1 block text-sm font-medium" }, "Title"),
                          createVNode(unref(_sfc_main$6), {
                            modelValue: unref(form).title,
                            "onUpdate:modelValue": ($event) => unref(form).title = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          unref(form).errors.title ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "mt-1 text-sm text-destructive"
                          }, toDisplayString(unref(form).errors.title), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "mb-1 block text-sm font-medium" }, "Content"),
                          withDirectives(createVNode("textarea", {
                            "onUpdate:modelValue": ($event) => unref(form).content = $event,
                            rows: "6",
                            class: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).content]
                          ]),
                          unref(form).errors.content ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "mt-1 text-sm text-destructive"
                          }, toDisplayString(unref(form).errors.content), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "mb-1 block text-sm font-medium" }, "Image"),
                          createVNode(unref(_sfc_main$6), {
                            modelValue: unref(form).image,
                            "onUpdate:modelValue": ($event) => unref(form).image = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          unref(form).errors.image ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "mt-1 text-sm text-destructive"
                          }, toDisplayString(unref(form).errors.image), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "mb-1 block text-sm font-medium" }, "Category"),
                          createVNode(unref(_sfc_main$6), {
                            modelValue: unref(form).category,
                            "onUpdate:modelValue": ($event) => unref(form).category = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          unref(form).errors.category ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "mt-1 text-sm text-destructive"
                          }, toDisplayString(unref(form).errors.category), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          withDirectives(createVNode("input", {
                            type: "checkbox",
                            id: "is_active",
                            "onUpdate:modelValue": ($event) => unref(form).is_active = $event,
                            class: "rounded border-input"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelCheckbox, unref(form).is_active]
                          ]),
                          createVNode("label", {
                            for: "is_active",
                            class: "text-sm font-medium"
                          }, "Aktif")
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "mb-1 block text-sm font-medium" }, "Sort Order"),
                          createVNode(unref(_sfc_main$6), {
                            modelValue: unref(form).sort_order,
                            "onUpdate:modelValue": ($event) => unref(form).sort_order = $event,
                            modelModifiers: { number: true },
                            type: "number"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          unref(form).errors.sort_order ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "mt-1 text-sm text-destructive"
                          }, toDisplayString(unref(form).errors.sort_order), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode(unref(_sfc_main$4), {
                          type: "submit",
                          disabled: unref(form).processing
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Simpan")
                          ]),
                          _: 1
                        }, 8, ["disabled"])
                      ], 32)
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
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Zenner/SellingGuide/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
