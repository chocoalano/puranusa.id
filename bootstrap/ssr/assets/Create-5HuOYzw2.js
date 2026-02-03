import { defineComponent, mergeProps, withCtx, unref, createTextVNode, createVNode, withModifiers, createBlock, createCommentVNode, openBlock, toDisplayString, withDirectives, vModelText, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
import { useForm, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-B9pGpPI9.js";
import { _ as _sfc_main$2, a as _sfc_main$3, c as _sfc_main$5 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$4 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$6 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$7, a as _sfc_main$8, b as _sfc_main$9, c as _sfc_main$a, d as _sfc_main$b } from "./SelectValue-BUnv4mQg.js";
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
      description: "",
      thumbnail: "",
      level: "beginner",
      is_active: true,
      sort_order: 0
    });
    const submit = () => {
      form.post("/admin/zenner/courses", {
        onSuccess: () => toast.success("Course berhasil dibuat")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ title: "Tambah Course" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex items-center justify-between"${_scopeId3}><h2 class="text-xl font-semibold"${_scopeId3}>Tambah Course</h2>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$4), {
                          variant: "outline",
                          onClick: ($event) => unref(router).get("/admin/zenner/courses")
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
                            createVNode("h2", { class: "text-xl font-semibold" }, "Tambah Course"),
                            createVNode(unref(_sfc_main$4), {
                              variant: "outline",
                              onClick: ($event) => unref(router).get("/admin/zenner/courses")
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
                        _push4(`<form class="space-y-4 max-w-2xl"${_scopeId3}><div${_scopeId3}><label class="block text-sm font-medium mb-1"${_scopeId3}>Title</label>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$6), {
                          modelValue: unref(form).title,
                          "onUpdate:modelValue": ($event) => unref(form).title = $event
                        }, null, _parent4, _scopeId3));
                        if (unref(form).errors.title) {
                          _push4(`<p class="text-sm text-destructive mt-1"${_scopeId3}>${ssrInterpolate(unref(form).errors.title)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div${_scopeId3}><label class="block text-sm font-medium mb-1"${_scopeId3}>Description</label><textarea rows="4" class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"${_scopeId3}>${ssrInterpolate(unref(form).description)}</textarea>`);
                        if (unref(form).errors.description) {
                          _push4(`<p class="text-sm text-destructive mt-1"${_scopeId3}>${ssrInterpolate(unref(form).errors.description)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div${_scopeId3}><label class="block text-sm font-medium mb-1"${_scopeId3}>Thumbnail URL</label>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$6), {
                          modelValue: unref(form).thumbnail,
                          "onUpdate:modelValue": ($event) => unref(form).thumbnail = $event
                        }, null, _parent4, _scopeId3));
                        if (unref(form).errors.thumbnail) {
                          _push4(`<p class="text-sm text-destructive mt-1"${_scopeId3}>${ssrInterpolate(unref(form).errors.thumbnail)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div${_scopeId3}><label class="block text-sm font-medium mb-1"${_scopeId3}>Level</label>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$7), {
                          modelValue: unref(form).level,
                          "onUpdate:modelValue": ($event) => unref(form).level = $event
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$8), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$9), { placeholder: "Pilih Level" }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$9), { placeholder: "Pilih Level" })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$a), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$b), { value: "beginner" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Beginner`);
                                        } else {
                                          return [
                                            createTextVNode("Beginner")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$b), { value: "intermediate" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Intermediate`);
                                        } else {
                                          return [
                                            createTextVNode("Intermediate")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$b), { value: "advanced" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Advanced`);
                                        } else {
                                          return [
                                            createTextVNode("Advanced")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$b), { value: "beginner" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Beginner")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$b), { value: "intermediate" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Intermediate")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$b), { value: "advanced" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Advanced")
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
                                createVNode(unref(_sfc_main$8), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$9), { placeholder: "Pilih Level" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$a), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$b), { value: "beginner" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Beginner")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$b), { value: "intermediate" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Intermediate")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$b), { value: "advanced" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Advanced")
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
                        if (unref(form).errors.level) {
                          _push4(`<p class="text-sm text-destructive mt-1"${_scopeId3}>${ssrInterpolate(unref(form).errors.level)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div${_scopeId3}><label class="block text-sm font-medium mb-1"${_scopeId3}>Sort Order</label>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$6), {
                          modelValue: unref(form).sort_order,
                          "onUpdate:modelValue": ($event) => unref(form).sort_order = $event,
                          modelModifiers: { number: true },
                          type: "number"
                        }, null, _parent4, _scopeId3));
                        if (unref(form).errors.sort_order) {
                          _push4(`<p class="text-sm text-destructive mt-1"${_scopeId3}>${ssrInterpolate(unref(form).errors.sort_order)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="flex items-center gap-2"${_scopeId3}><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_active) ? ssrLooseContain(unref(form).is_active, null) : unref(form).is_active) ? " checked" : ""} id="is_active" class="rounded border-gray-300"${_scopeId3}><label for="is_active" class="text-sm font-medium"${_scopeId3}>Aktif</label></div>`);
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
                            class: "space-y-4 max-w-2xl"
                          }, [
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium mb-1" }, "Title"),
                              createVNode(unref(_sfc_main$6), {
                                modelValue: unref(form).title,
                                "onUpdate:modelValue": ($event) => unref(form).title = $event
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              unref(form).errors.title ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive mt-1"
                              }, toDisplayString(unref(form).errors.title), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium mb-1" }, "Description"),
                              withDirectives(createVNode("textarea", {
                                "onUpdate:modelValue": ($event) => unref(form).description = $event,
                                rows: "4",
                                class: "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).description]
                              ]),
                              unref(form).errors.description ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive mt-1"
                              }, toDisplayString(unref(form).errors.description), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium mb-1" }, "Thumbnail URL"),
                              createVNode(unref(_sfc_main$6), {
                                modelValue: unref(form).thumbnail,
                                "onUpdate:modelValue": ($event) => unref(form).thumbnail = $event
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              unref(form).errors.thumbnail ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive mt-1"
                              }, toDisplayString(unref(form).errors.thumbnail), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium mb-1" }, "Level"),
                              createVNode(unref(_sfc_main$7), {
                                modelValue: unref(form).level,
                                "onUpdate:modelValue": ($event) => unref(form).level = $event
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$8), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$9), { placeholder: "Pilih Level" })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$a), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$b), { value: "beginner" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Beginner")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$b), { value: "intermediate" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Intermediate")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$b), { value: "advanced" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Advanced")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"]),
                              unref(form).errors.level ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive mt-1"
                              }, toDisplayString(unref(form).errors.level), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium mb-1" }, "Sort Order"),
                              createVNode(unref(_sfc_main$6), {
                                modelValue: unref(form).sort_order,
                                "onUpdate:modelValue": ($event) => unref(form).sort_order = $event,
                                modelModifiers: { number: true },
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
                                "onUpdate:modelValue": ($event) => unref(form).is_active = $event,
                                id: "is_active",
                                class: "rounded border-gray-300"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelCheckbox, unref(form).is_active]
                              ]),
                              createVNode("label", {
                                for: "is_active",
                                class: "text-sm font-medium"
                              }, "Aktif")
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
                          createVNode("h2", { class: "text-xl font-semibold" }, "Tambah Course"),
                          createVNode(unref(_sfc_main$4), {
                            variant: "outline",
                            onClick: ($event) => unref(router).get("/admin/zenner/courses")
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
                          class: "space-y-4 max-w-2xl"
                        }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium mb-1" }, "Title"),
                            createVNode(unref(_sfc_main$6), {
                              modelValue: unref(form).title,
                              "onUpdate:modelValue": ($event) => unref(form).title = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            unref(form).errors.title ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive mt-1"
                            }, toDisplayString(unref(form).errors.title), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium mb-1" }, "Description"),
                            withDirectives(createVNode("textarea", {
                              "onUpdate:modelValue": ($event) => unref(form).description = $event,
                              rows: "4",
                              class: "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).description]
                            ]),
                            unref(form).errors.description ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive mt-1"
                            }, toDisplayString(unref(form).errors.description), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium mb-1" }, "Thumbnail URL"),
                            createVNode(unref(_sfc_main$6), {
                              modelValue: unref(form).thumbnail,
                              "onUpdate:modelValue": ($event) => unref(form).thumbnail = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            unref(form).errors.thumbnail ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive mt-1"
                            }, toDisplayString(unref(form).errors.thumbnail), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium mb-1" }, "Level"),
                            createVNode(unref(_sfc_main$7), {
                              modelValue: unref(form).level,
                              "onUpdate:modelValue": ($event) => unref(form).level = $event
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$8), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$9), { placeholder: "Pilih Level" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$a), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$b), { value: "beginner" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Beginner")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$b), { value: "intermediate" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Intermediate")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$b), { value: "advanced" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Advanced")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"]),
                            unref(form).errors.level ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive mt-1"
                            }, toDisplayString(unref(form).errors.level), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium mb-1" }, "Sort Order"),
                            createVNode(unref(_sfc_main$6), {
                              modelValue: unref(form).sort_order,
                              "onUpdate:modelValue": ($event) => unref(form).sort_order = $event,
                              modelModifiers: { number: true },
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
                              "onUpdate:modelValue": ($event) => unref(form).is_active = $event,
                              id: "is_active",
                              class: "rounded border-gray-300"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelCheckbox, unref(form).is_active]
                            ]),
                            createVNode("label", {
                              for: "is_active",
                              class: "text-sm font-medium"
                            }, "Aktif")
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
                        createVNode("h2", { class: "text-xl font-semibold" }, "Tambah Course"),
                        createVNode(unref(_sfc_main$4), {
                          variant: "outline",
                          onClick: ($event) => unref(router).get("/admin/zenner/courses")
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
                        class: "space-y-4 max-w-2xl"
                      }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium mb-1" }, "Title"),
                          createVNode(unref(_sfc_main$6), {
                            modelValue: unref(form).title,
                            "onUpdate:modelValue": ($event) => unref(form).title = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          unref(form).errors.title ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive mt-1"
                          }, toDisplayString(unref(form).errors.title), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium mb-1" }, "Description"),
                          withDirectives(createVNode("textarea", {
                            "onUpdate:modelValue": ($event) => unref(form).description = $event,
                            rows: "4",
                            class: "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).description]
                          ]),
                          unref(form).errors.description ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive mt-1"
                          }, toDisplayString(unref(form).errors.description), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium mb-1" }, "Thumbnail URL"),
                          createVNode(unref(_sfc_main$6), {
                            modelValue: unref(form).thumbnail,
                            "onUpdate:modelValue": ($event) => unref(form).thumbnail = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          unref(form).errors.thumbnail ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive mt-1"
                          }, toDisplayString(unref(form).errors.thumbnail), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium mb-1" }, "Level"),
                          createVNode(unref(_sfc_main$7), {
                            modelValue: unref(form).level,
                            "onUpdate:modelValue": ($event) => unref(form).level = $event
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$8), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$9), { placeholder: "Pilih Level" })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$b), { value: "beginner" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Beginner")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$b), { value: "intermediate" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Intermediate")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$b), { value: "advanced" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Advanced")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"]),
                          unref(form).errors.level ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive mt-1"
                          }, toDisplayString(unref(form).errors.level), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium mb-1" }, "Sort Order"),
                          createVNode(unref(_sfc_main$6), {
                            modelValue: unref(form).sort_order,
                            "onUpdate:modelValue": ($event) => unref(form).sort_order = $event,
                            modelModifiers: { number: true },
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
                            "onUpdate:modelValue": ($event) => unref(form).is_active = $event,
                            id: "is_active",
                            class: "rounded border-gray-300"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelCheckbox, unref(form).is_active]
                          ]),
                          createVNode("label", {
                            for: "is_active",
                            class: "text-sm font-medium"
                          }, "Aktif")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Zenner/Course/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
