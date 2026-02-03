import { defineComponent, withCtx, unref, createVNode, createTextVNode, withModifiers, createBlock, createCommentVNode, openBlock, toDisplayString, withDirectives, vModelText, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
import { useForm, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-BHxY2bcF.js";
import { _ as _sfc_main$2, c as _sfc_main$3 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$a } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$4 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$5, a as _sfc_main$6, b as _sfc_main$7, c as _sfc_main$8, d as _sfc_main$9 } from "./SelectValue-BUnv4mQg.js";
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
      description: "",
      type: "bonus",
      conditions: "",
      rewards: "",
      is_active: true,
      sort_order: 0
    });
    const submit = () => {
      form.transform((data) => ({
        ...data,
        conditions: data.conditions ? JSON.parse(data.conditions) : null,
        rewards: data.rewards ? JSON.parse(data.rewards) : null
      })).post("/admin/zenner/incentive-rules", {
        onSuccess: () => toast.success("Rule berhasil ditambahkan"),
        onError: () => toast.error("Gagal menyimpan data")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="container mx-auto py-6 space-y-6"${_scopeId}><h1 class="text-3xl font-bold tracking-tight"${_scopeId}>Tambah Skema Insentif</h1>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "pt-6" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<form class="space-y-4"${_scopeId3}><div${_scopeId3}><label class="block text-sm font-medium mb-1"${_scopeId3}>Judul</label>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$4), {
                          modelValue: unref(form).title,
                          "onUpdate:modelValue": ($event) => unref(form).title = $event
                        }, null, _parent4, _scopeId3));
                        if (unref(form).errors.title) {
                          _push4(`<p class="text-sm text-destructive mt-1"${_scopeId3}>${ssrInterpolate(unref(form).errors.title)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div${_scopeId3}><label class="block text-sm font-medium mb-1"${_scopeId3}>Deskripsi</label><textarea rows="4" class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"${_scopeId3}>${ssrInterpolate(unref(form).description)}</textarea></div><div${_scopeId3}><label class="block text-sm font-medium mb-1"${_scopeId3}>Tipe</label>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$5), {
                          modelValue: unref(form).type,
                          "onUpdate:modelValue": ($event) => unref(form).type = $event
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$6), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$7), null, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$7))
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$8), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$9), { value: "bonus" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Bonus`);
                                        } else {
                                          return [
                                            createTextVNode("Bonus")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$9), { value: "reward" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Reward`);
                                        } else {
                                          return [
                                            createTextVNode("Reward")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$9), { value: "commission" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Komisi`);
                                        } else {
                                          return [
                                            createTextVNode("Komisi")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$9), { value: "bonus" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Bonus")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$9), { value: "reward" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Reward")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$9), { value: "commission" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Komisi")
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
                                createVNode(unref(_sfc_main$6), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$7))
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$8), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$9), { value: "bonus" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Bonus")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$9), { value: "reward" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Reward")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$9), { value: "commission" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Komisi")
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
                        _push4(`</div><div${_scopeId3}><label class="block text-sm font-medium mb-1"${_scopeId3}>Kondisi (JSON)</label><textarea rows="3" class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono text-xs" placeholder="{&quot;min_omzet&quot;: 1000000}"${_scopeId3}>${ssrInterpolate(unref(form).conditions)}</textarea>`);
                        if (unref(form).errors.conditions) {
                          _push4(`<p class="text-sm text-destructive mt-1"${_scopeId3}>${ssrInterpolate(unref(form).errors.conditions)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div${_scopeId3}><label class="block text-sm font-medium mb-1"${_scopeId3}>Rewards (JSON)</label><textarea rows="3" class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono text-xs" placeholder="{&quot;amount&quot;: 500000}"${_scopeId3}>${ssrInterpolate(unref(form).rewards)}</textarea>`);
                        if (unref(form).errors.rewards) {
                          _push4(`<p class="text-sm text-destructive mt-1"${_scopeId3}>${ssrInterpolate(unref(form).errors.rewards)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div${_scopeId3}><label class="block text-sm font-medium mb-1"${_scopeId3}>Urutan</label>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$4), {
                          modelValue: unref(form).sort_order,
                          "onUpdate:modelValue": ($event) => unref(form).sort_order = $event,
                          modelModifiers: { number: true },
                          type: "number"
                        }, null, _parent4, _scopeId3));
                        _push4(`</div><div class="flex items-center gap-2"${_scopeId3}><input type="checkbox" id="is_active"${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_active) ? ssrLooseContain(unref(form).is_active, null) : unref(form).is_active) ? " checked" : ""} class="rounded"${_scopeId3}><label for="is_active" class="text-sm"${_scopeId3}>Aktif</label></div><div class="flex gap-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$a), {
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
                        _push4(ssrRenderComponent(unref(_sfc_main$a), {
                          variant: "outline",
                          "as-child": ""
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Link), { href: "/admin/zenner/incentive-rules" }, {
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
                                createVNode(unref(Link), { href: "/admin/zenner/incentive-rules" }, {
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
                              createVNode("label", { class: "block text-sm font-medium mb-1" }, "Judul"),
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
                              createVNode("label", { class: "block text-sm font-medium mb-1" }, "Deskripsi"),
                              withDirectives(createVNode("textarea", {
                                "onUpdate:modelValue": ($event) => unref(form).description = $event,
                                rows: "4",
                                class: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).description]
                              ])
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium mb-1" }, "Tipe"),
                              createVNode(unref(_sfc_main$5), {
                                modelValue: unref(form).type,
                                "onUpdate:modelValue": ($event) => unref(form).type = $event
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$6), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$7))
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$8), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$9), { value: "bonus" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Bonus")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$9), { value: "reward" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Reward")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$9), { value: "commission" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Komisi")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium mb-1" }, "Kondisi (JSON)"),
                              withDirectives(createVNode("textarea", {
                                "onUpdate:modelValue": ($event) => unref(form).conditions = $event,
                                rows: "3",
                                class: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono text-xs",
                                placeholder: '{"min_omzet": 1000000}'
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).conditions]
                              ]),
                              unref(form).errors.conditions ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive mt-1"
                              }, toDisplayString(unref(form).errors.conditions), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium mb-1" }, "Rewards (JSON)"),
                              withDirectives(createVNode("textarea", {
                                "onUpdate:modelValue": ($event) => unref(form).rewards = $event,
                                rows: "3",
                                class: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono text-xs",
                                placeholder: '{"amount": 500000}'
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).rewards]
                              ]),
                              unref(form).errors.rewards ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive mt-1"
                              }, toDisplayString(unref(form).errors.rewards), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium mb-1" }, "Urutan"),
                              createVNode(unref(_sfc_main$4), {
                                modelValue: unref(form).sort_order,
                                "onUpdate:modelValue": ($event) => unref(form).sort_order = $event,
                                modelModifiers: { number: true },
                                type: "number"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                              createVNode(unref(_sfc_main$a), {
                                type: "submit",
                                disabled: unref(form).processing
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Simpan")
                                ]),
                                _: 1
                              }, 8, ["disabled"]),
                              createVNode(unref(_sfc_main$a), {
                                variant: "outline",
                                "as-child": ""
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Link), { href: "/admin/zenner/incentive-rules" }, {
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
                            createVNode("label", { class: "block text-sm font-medium mb-1" }, "Judul"),
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
                            createVNode("label", { class: "block text-sm font-medium mb-1" }, "Deskripsi"),
                            withDirectives(createVNode("textarea", {
                              "onUpdate:modelValue": ($event) => unref(form).description = $event,
                              rows: "4",
                              class: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).description]
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium mb-1" }, "Tipe"),
                            createVNode(unref(_sfc_main$5), {
                              modelValue: unref(form).type,
                              "onUpdate:modelValue": ($event) => unref(form).type = $event
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$6), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$7))
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$8), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$9), { value: "bonus" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Bonus")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$9), { value: "reward" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Reward")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$9), { value: "commission" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Komisi")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium mb-1" }, "Kondisi (JSON)"),
                            withDirectives(createVNode("textarea", {
                              "onUpdate:modelValue": ($event) => unref(form).conditions = $event,
                              rows: "3",
                              class: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono text-xs",
                              placeholder: '{"min_omzet": 1000000}'
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).conditions]
                            ]),
                            unref(form).errors.conditions ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive mt-1"
                            }, toDisplayString(unref(form).errors.conditions), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium mb-1" }, "Rewards (JSON)"),
                            withDirectives(createVNode("textarea", {
                              "onUpdate:modelValue": ($event) => unref(form).rewards = $event,
                              rows: "3",
                              class: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono text-xs",
                              placeholder: '{"amount": 500000}'
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).rewards]
                            ]),
                            unref(form).errors.rewards ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive mt-1"
                            }, toDisplayString(unref(form).errors.rewards), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium mb-1" }, "Urutan"),
                            createVNode(unref(_sfc_main$4), {
                              modelValue: unref(form).sort_order,
                              "onUpdate:modelValue": ($event) => unref(form).sort_order = $event,
                              modelModifiers: { number: true },
                              type: "number"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                            createVNode(unref(_sfc_main$a), {
                              type: "submit",
                              disabled: unref(form).processing
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Simpan")
                              ]),
                              _: 1
                            }, 8, ["disabled"]),
                            createVNode(unref(_sfc_main$a), {
                              variant: "outline",
                              "as-child": ""
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Link), { href: "/admin/zenner/incentive-rules" }, {
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
                createVNode("h1", { class: "text-3xl font-bold tracking-tight" }, "Tambah Skema Insentif"),
                createVNode(unref(_sfc_main$2), null, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$3), { class: "pt-6" }, {
                      default: withCtx(() => [
                        createVNode("form", {
                          onSubmit: withModifiers(submit, ["prevent"]),
                          class: "space-y-4"
                        }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium mb-1" }, "Judul"),
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
                            createVNode("label", { class: "block text-sm font-medium mb-1" }, "Deskripsi"),
                            withDirectives(createVNode("textarea", {
                              "onUpdate:modelValue": ($event) => unref(form).description = $event,
                              rows: "4",
                              class: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).description]
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium mb-1" }, "Tipe"),
                            createVNode(unref(_sfc_main$5), {
                              modelValue: unref(form).type,
                              "onUpdate:modelValue": ($event) => unref(form).type = $event
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$6), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$7))
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$8), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$9), { value: "bonus" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Bonus")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$9), { value: "reward" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Reward")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$9), { value: "commission" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Komisi")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium mb-1" }, "Kondisi (JSON)"),
                            withDirectives(createVNode("textarea", {
                              "onUpdate:modelValue": ($event) => unref(form).conditions = $event,
                              rows: "3",
                              class: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono text-xs",
                              placeholder: '{"min_omzet": 1000000}'
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).conditions]
                            ]),
                            unref(form).errors.conditions ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive mt-1"
                            }, toDisplayString(unref(form).errors.conditions), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium mb-1" }, "Rewards (JSON)"),
                            withDirectives(createVNode("textarea", {
                              "onUpdate:modelValue": ($event) => unref(form).rewards = $event,
                              rows: "3",
                              class: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono text-xs",
                              placeholder: '{"amount": 500000}'
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).rewards]
                            ]),
                            unref(form).errors.rewards ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive mt-1"
                            }, toDisplayString(unref(form).errors.rewards), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium mb-1" }, "Urutan"),
                            createVNode(unref(_sfc_main$4), {
                              modelValue: unref(form).sort_order,
                              "onUpdate:modelValue": ($event) => unref(form).sort_order = $event,
                              modelModifiers: { number: true },
                              type: "number"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                            createVNode(unref(_sfc_main$a), {
                              type: "submit",
                              disabled: unref(form).processing
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Simpan")
                              ]),
                              _: 1
                            }, 8, ["disabled"]),
                            createVNode(unref(_sfc_main$a), {
                              variant: "outline",
                              "as-child": ""
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Link), { href: "/admin/zenner/incentive-rules" }, {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Zenner/IncentiveRule/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
