import { defineComponent, ref, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, withDirectives, createBlock, openBlock, Fragment, renderList, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { E as index, F as create, _ as _sfc_main$1, G as store } from "./AppLayout-CDfd8drY.js";
import { _ as _sfc_main$3 } from "./HeadingSmall-B1yfmTIh.js";
import { _ as _sfc_main$5 } from "./InputError-BhTWS2NZ.js";
import { _ as _sfc_main$2 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$6 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$4 } from "./Label-16aMY2sx.js";
import { Head, Link, Form } from "@inertiajs/vue3";
import { ArrowLeft } from "lucide-vue-next";
import { toast } from "vue-sonner";
import "class-variance-authority";
import "./DropdownMenuTrigger-B1v6pHML.js";
import "reka-ui";
import "@vueuse/core";
import "./index-Jhngbhhu.js";
import "./AvatarImage-DWFQMckn.js";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
import "clsx";
import "tailwind-merge";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    members: {}
  },
  setup(__props) {
    const breadcrumbItems = [
      {
        title: "Bonus Matching",
        href: index.url()
      },
      {
        title: "Tambah Bonus",
        href: create.url()
      }
    ];
    const selectedMember = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ breadcrumbs: breadcrumbItems }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Tambah Bonus Matching" }, null, _parent2, _scopeId));
            _push2(`<div class="rounded-xl p-4 space-y-6 py-6"${_scopeId}><div class="flex items-center gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(index).url()
            }, {
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
            _push2(`<div${_scopeId}><h1 class="text-3xl font-bold tracking-tight"${_scopeId}>Tambah Bonus Matching</h1><p class="text-muted-foreground"${_scopeId}>Distribusi bonus matching ke upline</p></div></div><div class="mx-auto max-w-2xl"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Form), {
              action: unref(store).url(),
              method: "post",
              class: "space-y-6",
              onSuccess: () => unref(toast).success("Berhasil", {
                description: "Bonus matching berhasil didistribusikan"
              }),
              onError: () => unref(toast).error("Gagal", {
                description: "Terjadi kesalahan saat mendistribusikan bonus"
              })
            }, {
              default: withCtx(({ errors, processing }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="rounded-lg border bg-card p-6"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    title: "Informasi Bonus Matching",
                    description: "Bonus akan didistribusikan ke upline sesuai level"
                  }, null, _parent3, _scopeId2));
                  _push3(`<div class="mt-6 space-y-4"${_scopeId2}><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { for: "from_member_id" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Dari Member (Sumber)`);
                      } else {
                        return [
                          createTextVNode("Dari Member (Sumber)")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(`<select id="from_member_id" name="from_member_id" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"${_scopeId2}><option value=""${ssrIncludeBooleanAttr(Array.isArray(selectedMember.value) ? ssrLooseContain(selectedMember.value, "") : ssrLooseEqual(selectedMember.value, "")) ? " selected" : ""}${_scopeId2}>Pilih member...</option><!--[-->`);
                  ssrRenderList(__props.members, (member) => {
                    _push3(`<option${ssrRenderAttr("value", member.id)}${ssrIncludeBooleanAttr(Array.isArray(selectedMember.value) ? ssrLooseContain(selectedMember.value, member.id) : ssrLooseEqual(selectedMember.value, member.id)) ? " selected" : ""}${_scopeId2}>${ssrInterpolate(member.name)} (${ssrInterpolate(member.ewallet_id)}) </option>`);
                  });
                  _push3(`<!--]--></select><p class="text-sm text-muted-foreground"${_scopeId2}> Member yang memicu bonus matching </p>`);
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    message: errors.from_member_id
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { for: "amount" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Total Amount`);
                      } else {
                        return [
                          createTextVNode("Total Amount")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    id: "amount",
                    name: "amount",
                    type: "number",
                    step: "0.01",
                    min: "0",
                    required: "",
                    placeholder: "0"
                  }, null, _parent3, _scopeId2));
                  _push3(`<p class="text-sm text-muted-foreground"${_scopeId2}> Total amount yang akan didistribusikan </p>`);
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    message: errors.amount
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { for: "max_level" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Maksimal Level`);
                      } else {
                        return [
                          createTextVNode("Maksimal Level")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    id: "max_level",
                    name: "max_level",
                    type: "number",
                    min: "1",
                    max: "5",
                    value: "5",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`<p class="text-sm text-muted-foreground"${_scopeId2}> Jumlah level upline yang akan menerima bonus (1-5) </p>`);
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    message: errors.max_level
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="rounded-lg border bg-muted/50 p-4"${_scopeId2}><h3 class="font-semibold mb-3"${_scopeId2}>Persentase Per Level</h3><div class="grid gap-3"${_scopeId2}><div class="flex items-center gap-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$4), {
                    for: "level_1",
                    class: "w-20"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Level 1`);
                      } else {
                        return [
                          createTextVNode("Level 1")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    id: "level_1",
                    name: "level_percentages[1]",
                    type: "number",
                    step: "0.01",
                    min: "0",
                    max: "100",
                    value: "40",
                    class: "flex-1"
                  }, null, _parent3, _scopeId2));
                  _push3(`<span class="text-sm text-muted-foreground w-8"${_scopeId2}>%</span></div><div class="flex items-center gap-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$4), {
                    for: "level_2",
                    class: "w-20"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Level 2`);
                      } else {
                        return [
                          createTextVNode("Level 2")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    id: "level_2",
                    name: "level_percentages[2]",
                    type: "number",
                    step: "0.01",
                    min: "0",
                    max: "100",
                    value: "25",
                    class: "flex-1"
                  }, null, _parent3, _scopeId2));
                  _push3(`<span class="text-sm text-muted-foreground w-8"${_scopeId2}>%</span></div><div class="flex items-center gap-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$4), {
                    for: "level_3",
                    class: "w-20"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Level 3`);
                      } else {
                        return [
                          createTextVNode("Level 3")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    id: "level_3",
                    name: "level_percentages[3]",
                    type: "number",
                    step: "0.01",
                    min: "0",
                    max: "100",
                    value: "15",
                    class: "flex-1"
                  }, null, _parent3, _scopeId2));
                  _push3(`<span class="text-sm text-muted-foreground w-8"${_scopeId2}>%</span></div><div class="flex items-center gap-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$4), {
                    for: "level_4",
                    class: "w-20"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Level 4`);
                      } else {
                        return [
                          createTextVNode("Level 4")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    id: "level_4",
                    name: "level_percentages[4]",
                    type: "number",
                    step: "0.01",
                    min: "0",
                    max: "100",
                    value: "10",
                    class: "flex-1"
                  }, null, _parent3, _scopeId2));
                  _push3(`<span class="text-sm text-muted-foreground w-8"${_scopeId2}>%</span></div><div class="flex items-center gap-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$4), {
                    for: "level_5",
                    class: "w-20"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Level 5`);
                      } else {
                        return [
                          createTextVNode("Level 5")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    id: "level_5",
                    name: "level_percentages[5]",
                    type: "number",
                    step: "0.01",
                    min: "0",
                    max: "100",
                    value: "10",
                    class: "flex-1"
                  }, null, _parent3, _scopeId2));
                  _push3(`<span class="text-sm text-muted-foreground w-8"${_scopeId2}>%</span></div></div>`);
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    message: errors["level_percentages"]
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div></div><div class="flex gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$2), {
                    type: "submit",
                    disabled: processing || !selectedMember.value
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(processing ? "Mendistribusikan..." : "Distribusikan Bonus")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(processing ? "Mendistribusikan..." : "Distribusikan Bonus"), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(Link), {
                    href: unref(index).url()
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$2), {
                          type: "button",
                          variant: "outline"
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Batal`);
                            } else {
                              return [
                                createTextVNode("Batal")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
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
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "rounded-lg border bg-card p-6" }, [
                      createVNode(_sfc_main$3, {
                        title: "Informasi Bonus Matching",
                        description: "Bonus akan didistribusikan ke upline sesuai level"
                      }),
                      createVNode("div", { class: "mt-6 space-y-4" }, [
                        createVNode("div", { class: "grid gap-2" }, [
                          createVNode(unref(_sfc_main$4), { for: "from_member_id" }, {
                            default: withCtx(() => [
                              createTextVNode("Dari Member (Sumber)")
                            ]),
                            _: 1
                          }),
                          withDirectives(createVNode("select", {
                            id: "from_member_id",
                            name: "from_member_id",
                            "onUpdate:modelValue": ($event) => selectedMember.value = $event,
                            required: "",
                            class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                          }, [
                            createVNode("option", { value: "" }, "Pilih member..."),
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.members, (member) => {
                              return openBlock(), createBlock("option", {
                                key: member.id,
                                value: member.id
                              }, toDisplayString(member.name) + " (" + toDisplayString(member.ewallet_id) + ") ", 9, ["value"]);
                            }), 128))
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, selectedMember.value]
                          ]),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Member yang memicu bonus matching "),
                          createVNode(_sfc_main$5, {
                            message: errors.from_member_id
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "grid gap-2" }, [
                          createVNode(unref(_sfc_main$4), { for: "amount" }, {
                            default: withCtx(() => [
                              createTextVNode("Total Amount")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), {
                            id: "amount",
                            name: "amount",
                            type: "number",
                            step: "0.01",
                            min: "0",
                            required: "",
                            placeholder: "0"
                          }),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Total amount yang akan didistribusikan "),
                          createVNode(_sfc_main$5, {
                            message: errors.amount
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "grid gap-2" }, [
                          createVNode(unref(_sfc_main$4), { for: "max_level" }, {
                            default: withCtx(() => [
                              createTextVNode("Maksimal Level")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), {
                            id: "max_level",
                            name: "max_level",
                            type: "number",
                            min: "1",
                            max: "5",
                            value: "5",
                            required: ""
                          }),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Jumlah level upline yang akan menerima bonus (1-5) "),
                          createVNode(_sfc_main$5, {
                            message: errors.max_level
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "rounded-lg border bg-muted/50 p-4" }, [
                          createVNode("h3", { class: "font-semibold mb-3" }, "Persentase Per Level"),
                          createVNode("div", { class: "grid gap-3" }, [
                            createVNode("div", { class: "flex items-center gap-4" }, [
                              createVNode(unref(_sfc_main$4), {
                                for: "level_1",
                                class: "w-20"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Level 1")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$6), {
                                id: "level_1",
                                name: "level_percentages[1]",
                                type: "number",
                                step: "0.01",
                                min: "0",
                                max: "100",
                                value: "40",
                                class: "flex-1"
                              }),
                              createVNode("span", { class: "text-sm text-muted-foreground w-8" }, "%")
                            ]),
                            createVNode("div", { class: "flex items-center gap-4" }, [
                              createVNode(unref(_sfc_main$4), {
                                for: "level_2",
                                class: "w-20"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Level 2")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$6), {
                                id: "level_2",
                                name: "level_percentages[2]",
                                type: "number",
                                step: "0.01",
                                min: "0",
                                max: "100",
                                value: "25",
                                class: "flex-1"
                              }),
                              createVNode("span", { class: "text-sm text-muted-foreground w-8" }, "%")
                            ]),
                            createVNode("div", { class: "flex items-center gap-4" }, [
                              createVNode(unref(_sfc_main$4), {
                                for: "level_3",
                                class: "w-20"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Level 3")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$6), {
                                id: "level_3",
                                name: "level_percentages[3]",
                                type: "number",
                                step: "0.01",
                                min: "0",
                                max: "100",
                                value: "15",
                                class: "flex-1"
                              }),
                              createVNode("span", { class: "text-sm text-muted-foreground w-8" }, "%")
                            ]),
                            createVNode("div", { class: "flex items-center gap-4" }, [
                              createVNode(unref(_sfc_main$4), {
                                for: "level_4",
                                class: "w-20"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Level 4")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$6), {
                                id: "level_4",
                                name: "level_percentages[4]",
                                type: "number",
                                step: "0.01",
                                min: "0",
                                max: "100",
                                value: "10",
                                class: "flex-1"
                              }),
                              createVNode("span", { class: "text-sm text-muted-foreground w-8" }, "%")
                            ]),
                            createVNode("div", { class: "flex items-center gap-4" }, [
                              createVNode(unref(_sfc_main$4), {
                                for: "level_5",
                                class: "w-20"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Level 5")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$6), {
                                id: "level_5",
                                name: "level_percentages[5]",
                                type: "number",
                                step: "0.01",
                                min: "0",
                                max: "100",
                                value: "10",
                                class: "flex-1"
                              }),
                              createVNode("span", { class: "text-sm text-muted-foreground w-8" }, "%")
                            ])
                          ]),
                          createVNode(_sfc_main$5, {
                            message: errors["level_percentages"]
                          }, null, 8, ["message"])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode(unref(_sfc_main$2), {
                        type: "submit",
                        disabled: processing || !selectedMember.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(processing ? "Mendistribusikan..." : "Distribusikan Bonus"), 1)
                        ]),
                        _: 2
                      }, 1032, ["disabled"]),
                      createVNode(unref(Link), {
                        href: unref(index).url()
                      }, {
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
                      }, 8, ["href"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Tambah Bonus Matching" }),
              createVNode("div", { class: "rounded-xl p-4 space-y-6 py-6" }, [
                createVNode("div", { class: "flex items-center gap-4" }, [
                  createVNode(unref(Link), {
                    href: unref(index).url()
                  }, {
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
                    createVNode("h1", { class: "text-3xl font-bold tracking-tight" }, "Tambah Bonus Matching"),
                    createVNode("p", { class: "text-muted-foreground" }, "Distribusi bonus matching ke upline")
                  ])
                ]),
                createVNode("div", { class: "mx-auto max-w-2xl" }, [
                  createVNode(unref(Form), {
                    action: unref(store).url(),
                    method: "post",
                    class: "space-y-6",
                    onSuccess: () => unref(toast).success("Berhasil", {
                      description: "Bonus matching berhasil didistribusikan"
                    }),
                    onError: () => unref(toast).error("Gagal", {
                      description: "Terjadi kesalahan saat mendistribusikan bonus"
                    })
                  }, {
                    default: withCtx(({ errors, processing }) => [
                      createVNode("div", { class: "rounded-lg border bg-card p-6" }, [
                        createVNode(_sfc_main$3, {
                          title: "Informasi Bonus Matching",
                          description: "Bonus akan didistribusikan ke upline sesuai level"
                        }),
                        createVNode("div", { class: "mt-6 space-y-4" }, [
                          createVNode("div", { class: "grid gap-2" }, [
                            createVNode(unref(_sfc_main$4), { for: "from_member_id" }, {
                              default: withCtx(() => [
                                createTextVNode("Dari Member (Sumber)")
                              ]),
                              _: 1
                            }),
                            withDirectives(createVNode("select", {
                              id: "from_member_id",
                              name: "from_member_id",
                              "onUpdate:modelValue": ($event) => selectedMember.value = $event,
                              required: "",
                              class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                            }, [
                              createVNode("option", { value: "" }, "Pilih member..."),
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.members, (member) => {
                                return openBlock(), createBlock("option", {
                                  key: member.id,
                                  value: member.id
                                }, toDisplayString(member.name) + " (" + toDisplayString(member.ewallet_id) + ") ", 9, ["value"]);
                              }), 128))
                            ], 8, ["onUpdate:modelValue"]), [
                              [vModelSelect, selectedMember.value]
                            ]),
                            createVNode("p", { class: "text-sm text-muted-foreground" }, " Member yang memicu bonus matching "),
                            createVNode(_sfc_main$5, {
                              message: errors.from_member_id
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", { class: "grid gap-2" }, [
                            createVNode(unref(_sfc_main$4), { for: "amount" }, {
                              default: withCtx(() => [
                                createTextVNode("Total Amount")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$6), {
                              id: "amount",
                              name: "amount",
                              type: "number",
                              step: "0.01",
                              min: "0",
                              required: "",
                              placeholder: "0"
                            }),
                            createVNode("p", { class: "text-sm text-muted-foreground" }, " Total amount yang akan didistribusikan "),
                            createVNode(_sfc_main$5, {
                              message: errors.amount
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", { class: "grid gap-2" }, [
                            createVNode(unref(_sfc_main$4), { for: "max_level" }, {
                              default: withCtx(() => [
                                createTextVNode("Maksimal Level")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$6), {
                              id: "max_level",
                              name: "max_level",
                              type: "number",
                              min: "1",
                              max: "5",
                              value: "5",
                              required: ""
                            }),
                            createVNode("p", { class: "text-sm text-muted-foreground" }, " Jumlah level upline yang akan menerima bonus (1-5) "),
                            createVNode(_sfc_main$5, {
                              message: errors.max_level
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", { class: "rounded-lg border bg-muted/50 p-4" }, [
                            createVNode("h3", { class: "font-semibold mb-3" }, "Persentase Per Level"),
                            createVNode("div", { class: "grid gap-3" }, [
                              createVNode("div", { class: "flex items-center gap-4" }, [
                                createVNode(unref(_sfc_main$4), {
                                  for: "level_1",
                                  class: "w-20"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Level 1")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$6), {
                                  id: "level_1",
                                  name: "level_percentages[1]",
                                  type: "number",
                                  step: "0.01",
                                  min: "0",
                                  max: "100",
                                  value: "40",
                                  class: "flex-1"
                                }),
                                createVNode("span", { class: "text-sm text-muted-foreground w-8" }, "%")
                              ]),
                              createVNode("div", { class: "flex items-center gap-4" }, [
                                createVNode(unref(_sfc_main$4), {
                                  for: "level_2",
                                  class: "w-20"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Level 2")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$6), {
                                  id: "level_2",
                                  name: "level_percentages[2]",
                                  type: "number",
                                  step: "0.01",
                                  min: "0",
                                  max: "100",
                                  value: "25",
                                  class: "flex-1"
                                }),
                                createVNode("span", { class: "text-sm text-muted-foreground w-8" }, "%")
                              ]),
                              createVNode("div", { class: "flex items-center gap-4" }, [
                                createVNode(unref(_sfc_main$4), {
                                  for: "level_3",
                                  class: "w-20"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Level 3")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$6), {
                                  id: "level_3",
                                  name: "level_percentages[3]",
                                  type: "number",
                                  step: "0.01",
                                  min: "0",
                                  max: "100",
                                  value: "15",
                                  class: "flex-1"
                                }),
                                createVNode("span", { class: "text-sm text-muted-foreground w-8" }, "%")
                              ]),
                              createVNode("div", { class: "flex items-center gap-4" }, [
                                createVNode(unref(_sfc_main$4), {
                                  for: "level_4",
                                  class: "w-20"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Level 4")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$6), {
                                  id: "level_4",
                                  name: "level_percentages[4]",
                                  type: "number",
                                  step: "0.01",
                                  min: "0",
                                  max: "100",
                                  value: "10",
                                  class: "flex-1"
                                }),
                                createVNode("span", { class: "text-sm text-muted-foreground w-8" }, "%")
                              ]),
                              createVNode("div", { class: "flex items-center gap-4" }, [
                                createVNode(unref(_sfc_main$4), {
                                  for: "level_5",
                                  class: "w-20"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Level 5")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$6), {
                                  id: "level_5",
                                  name: "level_percentages[5]",
                                  type: "number",
                                  step: "0.01",
                                  min: "0",
                                  max: "100",
                                  value: "10",
                                  class: "flex-1"
                                }),
                                createVNode("span", { class: "text-sm text-muted-foreground w-8" }, "%")
                              ])
                            ]),
                            createVNode(_sfc_main$5, {
                              message: errors["level_percentages"]
                            }, null, 8, ["message"])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "flex gap-2" }, [
                        createVNode(unref(_sfc_main$2), {
                          type: "submit",
                          disabled: processing || !selectedMember.value
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(processing ? "Mendistribusikan..." : "Distribusikan Bonus"), 1)
                          ]),
                          _: 2
                        }, 1032, ["disabled"]),
                        createVNode(unref(Link), {
                          href: unref(index).url()
                        }, {
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
                        }, 8, ["href"])
                      ])
                    ]),
                    _: 1
                  }, 8, ["action", "onSuccess", "onError"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/bonus/matching/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
