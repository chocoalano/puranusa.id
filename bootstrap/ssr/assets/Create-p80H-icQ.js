import { defineComponent, mergeProps, withCtx, unref, createVNode, createTextVNode, withDirectives, createBlock, createCommentVNode, openBlock, Fragment, renderList, toDisplayString, vModelSelect, vModelText, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { a1 as index, a2 as create, _ as _sfc_main$1, a3 as store } from "./AppLayout-D11fLPDM.js";
import { _ as _sfc_main$2 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5, d as _sfc_main$6, c as _sfc_main$7 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$9 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$8 } from "./Label-16aMY2sx.js";
import { useForm, Head, router } from "@inertiajs/vue3";
import { ArrowLeft, GitMerge } from "lucide-vue-next";
import "class-variance-authority";
import "./DropdownMenuTrigger-B1v6pHML.js";
import "reka-ui";
import "@vueuse/core";
import "./index-3UqiGNe9.js";
import "./AvatarImage-DWFQMckn.js";
import "./index-Bfu0FVt6.js";
import "vue-sonner";
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
        title: "Bonus Pairing",
        href: index.url()
      },
      {
        title: "Tambah Bonus",
        href: create.url()
      }
    ];
    const form = useForm({
      member_id: "",
      bonus_per_pair: "",
      max_pairs: "",
      description: ""
    });
    const handleSubmit = () => {
      form.post(store.url(), {
        preserveScroll: true
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ breadcrumbs: breadcrumbItems }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Tambah Bonus Pairing" }, null, _parent2, _scopeId));
            _push2(`<div class="rounded-xl p-4 space-y-6 py-6"${_scopeId}><div class="flex items-center gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              variant: "outline",
              size: "icon",
              onClick: ($event) => unref(router).visit(unref(index).url())
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ArrowLeft), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(ArrowLeft), { class: "h-4 w-4" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div${_scopeId}><h1 class="text-3xl font-bold tracking-tight"${_scopeId}>Tambah Bonus Pairing</h1><p class="text-muted-foreground"${_scopeId}>Proses bonus pairing untuk member tertentu</p></div></div><form class="space-y-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$3), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$5), { class: "flex items-center gap-2" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(GitMerge), { class: "h-5 w-5" }, null, _parent5, _scopeId4));
                              _push5(` Informasi Pairing `);
                            } else {
                              return [
                                createVNode(unref(GitMerge), { class: "h-5 w-5" }),
                                createTextVNode(" Informasi Pairing ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Masukkan detail untuk memproses bonus pairing member `);
                            } else {
                              return [
                                createTextVNode(" Masukkan detail untuk memproses bonus pairing member ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), { class: "flex items-center gap-2" }, {
                            default: withCtx(() => [
                              createVNode(unref(GitMerge), { class: "h-5 w-5" }),
                              createTextVNode(" Informasi Pairing ")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode(" Masukkan detail untuk memproses bonus pairing member ")
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
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { for: "member_id" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Member *`);
                            } else {
                              return [
                                createTextVNode("Member *")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<select id="member_id" class="${ssrRenderClass([{ "border-destructive": unref(form).errors.member_id }, "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"])}"${_scopeId3}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).member_id) ? ssrLooseContain(unref(form).member_id, "") : ssrLooseEqual(unref(form).member_id, "")) ? " selected" : ""}${_scopeId3}>Pilih member...</option><!--[-->`);
                        ssrRenderList(__props.members, (member) => {
                          _push4(`<option${ssrRenderAttr("value", member.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).member_id) ? ssrLooseContain(unref(form).member_id, member.id) : ssrLooseEqual(unref(form).member_id, member.id)) ? " selected" : ""}${_scopeId3}>${ssrInterpolate(member.name)} (${ssrInterpolate(member.ewallet_id)}) </option>`);
                        });
                        _push4(`<!--]--></select>`);
                        if (unref(form).errors.member_id) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.member_id)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { for: "bonus_per_pair" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Bonus Per Pasang (Rp) *`);
                            } else {
                              return [
                                createTextVNode("Bonus Per Pasang (Rp) *")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          id: "bonus_per_pair",
                          modelValue: unref(form).bonus_per_pair,
                          "onUpdate:modelValue": ($event) => unref(form).bonus_per_pair = $event,
                          type: "number",
                          step: "0.01",
                          placeholder: "Contoh: 50000",
                          class: { "border-destructive": unref(form).errors.bonus_per_pair }
                        }, null, _parent4, _scopeId3));
                        if (unref(form).errors.bonus_per_pair) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.bonus_per_pair)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`<p class="text-sm text-muted-foreground"${_scopeId3}> Jumlah bonus yang diberikan per pasangan kiri-kanan </p></div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { for: "max_pairs" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Maksimal Pasangan`);
                            } else {
                              return [
                                createTextVNode("Maksimal Pasangan")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          id: "max_pairs",
                          modelValue: unref(form).max_pairs,
                          "onUpdate:modelValue": ($event) => unref(form).max_pairs = $event,
                          type: "number",
                          placeholder: "Kosongkan untuk tidak dibatasi",
                          class: { "border-destructive": unref(form).errors.max_pairs }
                        }, null, _parent4, _scopeId3));
                        if (unref(form).errors.max_pairs) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.max_pairs)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`<p class="text-sm text-muted-foreground"${_scopeId3}> Opsional - batasi jumlah pasangan yang diproses </p></div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { for: "description" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Keterangan`);
                            } else {
                              return [
                                createTextVNode("Keterangan")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<textarea id="description" rows="3" placeholder="Catatan tambahan tentang proses pairing ini..." class="${ssrRenderClass([{ "border-destructive": unref(form).errors.description }, "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"])}"${_scopeId3}>${ssrInterpolate(unref(form).description)}</textarea>`);
                        if (unref(form).errors.description) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.description)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "member_id" }, {
                              default: withCtx(() => [
                                createTextVNode("Member *")
                              ]),
                              _: 1
                            }),
                            withDirectives(createVNode("select", {
                              id: "member_id",
                              "onUpdate:modelValue": ($event) => unref(form).member_id = $event,
                              class: ["flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", { "border-destructive": unref(form).errors.member_id }]
                            }, [
                              createVNode("option", { value: "" }, "Pilih member..."),
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.members, (member) => {
                                return openBlock(), createBlock("option", {
                                  key: member.id,
                                  value: member.id
                                }, toDisplayString(member.name) + " (" + toDisplayString(member.ewallet_id) + ") ", 9, ["value"]);
                              }), 128))
                            ], 10, ["onUpdate:modelValue"]), [
                              [vModelSelect, unref(form).member_id]
                            ]),
                            unref(form).errors.member_id ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.member_id), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "bonus_per_pair" }, {
                              default: withCtx(() => [
                                createTextVNode("Bonus Per Pasang (Rp) *")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$9), {
                              id: "bonus_per_pair",
                              modelValue: unref(form).bonus_per_pair,
                              "onUpdate:modelValue": ($event) => unref(form).bonus_per_pair = $event,
                              type: "number",
                              step: "0.01",
                              placeholder: "Contoh: 50000",
                              class: { "border-destructive": unref(form).errors.bonus_per_pair }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            unref(form).errors.bonus_per_pair ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.bonus_per_pair), 1)) : createCommentVNode("", true),
                            createVNode("p", { class: "text-sm text-muted-foreground" }, " Jumlah bonus yang diberikan per pasangan kiri-kanan ")
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "max_pairs" }, {
                              default: withCtx(() => [
                                createTextVNode("Maksimal Pasangan")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$9), {
                              id: "max_pairs",
                              modelValue: unref(form).max_pairs,
                              "onUpdate:modelValue": ($event) => unref(form).max_pairs = $event,
                              type: "number",
                              placeholder: "Kosongkan untuk tidak dibatasi",
                              class: { "border-destructive": unref(form).errors.max_pairs }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            unref(form).errors.max_pairs ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.max_pairs), 1)) : createCommentVNode("", true),
                            createVNode("p", { class: "text-sm text-muted-foreground" }, " Opsional - batasi jumlah pasangan yang diproses ")
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "description" }, {
                              default: withCtx(() => [
                                createTextVNode("Keterangan")
                              ]),
                              _: 1
                            }),
                            withDirectives(createVNode("textarea", {
                              id: "description",
                              "onUpdate:modelValue": ($event) => unref(form).description = $event,
                              rows: "3",
                              class: ["flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", { "border-destructive": unref(form).errors.description }],
                              placeholder: "Catatan tambahan tentang proses pairing ini..."
                            }, null, 10, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).description]
                            ]),
                            unref(form).errors.description ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.description), 1)) : createCommentVNode("", true)
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
                        createVNode(unref(_sfc_main$5), { class: "flex items-center gap-2" }, {
                          default: withCtx(() => [
                            createVNode(unref(GitMerge), { class: "h-5 w-5" }),
                            createTextVNode(" Informasi Pairing ")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode(" Masukkan detail untuk memproses bonus pairing member ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$8), { for: "member_id" }, {
                            default: withCtx(() => [
                              createTextVNode("Member *")
                            ]),
                            _: 1
                          }),
                          withDirectives(createVNode("select", {
                            id: "member_id",
                            "onUpdate:modelValue": ($event) => unref(form).member_id = $event,
                            class: ["flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", { "border-destructive": unref(form).errors.member_id }]
                          }, [
                            createVNode("option", { value: "" }, "Pilih member..."),
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.members, (member) => {
                              return openBlock(), createBlock("option", {
                                key: member.id,
                                value: member.id
                              }, toDisplayString(member.name) + " (" + toDisplayString(member.ewallet_id) + ") ", 9, ["value"]);
                            }), 128))
                          ], 10, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(form).member_id]
                          ]),
                          unref(form).errors.member_id ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive"
                          }, toDisplayString(unref(form).errors.member_id), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$8), { for: "bonus_per_pair" }, {
                            default: withCtx(() => [
                              createTextVNode("Bonus Per Pasang (Rp) *")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$9), {
                            id: "bonus_per_pair",
                            modelValue: unref(form).bonus_per_pair,
                            "onUpdate:modelValue": ($event) => unref(form).bonus_per_pair = $event,
                            type: "number",
                            step: "0.01",
                            placeholder: "Contoh: 50000",
                            class: { "border-destructive": unref(form).errors.bonus_per_pair }
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                          unref(form).errors.bonus_per_pair ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive"
                          }, toDisplayString(unref(form).errors.bonus_per_pair), 1)) : createCommentVNode("", true),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Jumlah bonus yang diberikan per pasangan kiri-kanan ")
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$8), { for: "max_pairs" }, {
                            default: withCtx(() => [
                              createTextVNode("Maksimal Pasangan")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$9), {
                            id: "max_pairs",
                            modelValue: unref(form).max_pairs,
                            "onUpdate:modelValue": ($event) => unref(form).max_pairs = $event,
                            type: "number",
                            placeholder: "Kosongkan untuk tidak dibatasi",
                            class: { "border-destructive": unref(form).errors.max_pairs }
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                          unref(form).errors.max_pairs ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive"
                          }, toDisplayString(unref(form).errors.max_pairs), 1)) : createCommentVNode("", true),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Opsional - batasi jumlah pasangan yang diproses ")
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$8), { for: "description" }, {
                            default: withCtx(() => [
                              createTextVNode("Keterangan")
                            ]),
                            _: 1
                          }),
                          withDirectives(createVNode("textarea", {
                            id: "description",
                            "onUpdate:modelValue": ($event) => unref(form).description = $event,
                            rows: "3",
                            class: ["flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", { "border-destructive": unref(form).errors.description }],
                            placeholder: "Catatan tambahan tentang proses pairing ini..."
                          }, null, 10, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).description]
                          ]),
                          unref(form).errors.description ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive"
                          }, toDisplayString(unref(form).errors.description), 1)) : createCommentVNode("", true)
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$3), { class: "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$5), { class: "text-blue-900 dark:text-blue-100" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Tentang Bonus Pairing `);
                            } else {
                              return [
                                createTextVNode(" Tentang Bonus Pairing ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), { class: "text-blue-900 dark:text-blue-100" }, {
                            default: withCtx(() => [
                              createTextVNode(" Tentang Bonus Pairing ")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { class: "space-y-2 text-sm text-blue-800 dark:text-blue-200" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p${_scopeId3}> Sistem akan menghitung pasangan dari downline kiri dan kanan member, kemudian memberikan bonus berdasarkan jumlah pasangan yang terbentuk. </p><p${_scopeId3}> Rumus: <span class="font-mono font-semibold"${_scopeId3}>Total Bonus = Jumlah Pasangan × Bonus Per Pasang</span></p>`);
                      } else {
                        return [
                          createVNode("p", null, " Sistem akan menghitung pasangan dari downline kiri dan kanan member, kemudian memberikan bonus berdasarkan jumlah pasangan yang terbentuk. "),
                          createVNode("p", null, [
                            createTextVNode(" Rumus: "),
                            createVNode("span", { class: "font-mono font-semibold" }, "Total Bonus = Jumlah Pasangan × Bonus Per Pasang")
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
                        createVNode(unref(_sfc_main$5), { class: "text-blue-900 dark:text-blue-100" }, {
                          default: withCtx(() => [
                            createTextVNode(" Tentang Bonus Pairing ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), { class: "space-y-2 text-sm text-blue-800 dark:text-blue-200" }, {
                      default: withCtx(() => [
                        createVNode("p", null, " Sistem akan menghitung pasangan dari downline kiri dan kanan member, kemudian memberikan bonus berdasarkan jumlah pasangan yang terbentuk. "),
                        createVNode("p", null, [
                          createTextVNode(" Rumus: "),
                          createVNode("span", { class: "font-mono font-semibold" }, "Total Bonus = Jumlah Pasangan × Bonus Per Pasang")
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
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              type: "button",
              variant: "outline",
              onClick: ($event) => unref(router).visit(unref(index).url()),
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Batal `);
                } else {
                  return [
                    createTextVNode(" Batal ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              type: "submit",
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(form).processing ? "Memproses..." : "Proses Pairing")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(form).processing ? "Memproses..." : "Proses Pairing"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Tambah Bonus Pairing" }),
              createVNode("div", { class: "rounded-xl p-4 space-y-6 py-6" }, [
                createVNode("div", { class: "flex items-center gap-4" }, [
                  createVNode(unref(_sfc_main$2), {
                    variant: "outline",
                    size: "icon",
                    onClick: ($event) => unref(router).visit(unref(index).url())
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(ArrowLeft), { class: "h-4 w-4" })
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode("div", null, [
                    createVNode("h1", { class: "text-3xl font-bold tracking-tight" }, "Tambah Bonus Pairing"),
                    createVNode("p", { class: "text-muted-foreground" }, "Proses bonus pairing untuk member tertentu")
                  ])
                ]),
                createVNode("form", {
                  onSubmit: withModifiers(handleSubmit, ["prevent"]),
                  class: "space-y-6"
                }, [
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$4), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$5), { class: "flex items-center gap-2" }, {
                            default: withCtx(() => [
                              createVNode(unref(GitMerge), { class: "h-5 w-5" }),
                              createTextVNode(" Informasi Pairing ")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode(" Masukkan detail untuk memproses bonus pairing member ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "member_id" }, {
                              default: withCtx(() => [
                                createTextVNode("Member *")
                              ]),
                              _: 1
                            }),
                            withDirectives(createVNode("select", {
                              id: "member_id",
                              "onUpdate:modelValue": ($event) => unref(form).member_id = $event,
                              class: ["flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", { "border-destructive": unref(form).errors.member_id }]
                            }, [
                              createVNode("option", { value: "" }, "Pilih member..."),
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.members, (member) => {
                                return openBlock(), createBlock("option", {
                                  key: member.id,
                                  value: member.id
                                }, toDisplayString(member.name) + " (" + toDisplayString(member.ewallet_id) + ") ", 9, ["value"]);
                              }), 128))
                            ], 10, ["onUpdate:modelValue"]), [
                              [vModelSelect, unref(form).member_id]
                            ]),
                            unref(form).errors.member_id ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.member_id), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "bonus_per_pair" }, {
                              default: withCtx(() => [
                                createTextVNode("Bonus Per Pasang (Rp) *")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$9), {
                              id: "bonus_per_pair",
                              modelValue: unref(form).bonus_per_pair,
                              "onUpdate:modelValue": ($event) => unref(form).bonus_per_pair = $event,
                              type: "number",
                              step: "0.01",
                              placeholder: "Contoh: 50000",
                              class: { "border-destructive": unref(form).errors.bonus_per_pair }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            unref(form).errors.bonus_per_pair ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.bonus_per_pair), 1)) : createCommentVNode("", true),
                            createVNode("p", { class: "text-sm text-muted-foreground" }, " Jumlah bonus yang diberikan per pasangan kiri-kanan ")
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "max_pairs" }, {
                              default: withCtx(() => [
                                createTextVNode("Maksimal Pasangan")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$9), {
                              id: "max_pairs",
                              modelValue: unref(form).max_pairs,
                              "onUpdate:modelValue": ($event) => unref(form).max_pairs = $event,
                              type: "number",
                              placeholder: "Kosongkan untuk tidak dibatasi",
                              class: { "border-destructive": unref(form).errors.max_pairs }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            unref(form).errors.max_pairs ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.max_pairs), 1)) : createCommentVNode("", true),
                            createVNode("p", { class: "text-sm text-muted-foreground" }, " Opsional - batasi jumlah pasangan yang diproses ")
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "description" }, {
                              default: withCtx(() => [
                                createTextVNode("Keterangan")
                              ]),
                              _: 1
                            }),
                            withDirectives(createVNode("textarea", {
                              id: "description",
                              "onUpdate:modelValue": ($event) => unref(form).description = $event,
                              rows: "3",
                              class: ["flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", { "border-destructive": unref(form).errors.description }],
                              placeholder: "Catatan tambahan tentang proses pairing ini..."
                            }, null, 10, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).description]
                            ]),
                            unref(form).errors.description ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.description), 1)) : createCommentVNode("", true)
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$3), { class: "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950" }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$4), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$5), { class: "text-blue-900 dark:text-blue-100" }, {
                            default: withCtx(() => [
                              createTextVNode(" Tentang Bonus Pairing ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), { class: "space-y-2 text-sm text-blue-800 dark:text-blue-200" }, {
                        default: withCtx(() => [
                          createVNode("p", null, " Sistem akan menghitung pasangan dari downline kiri dan kanan member, kemudian memberikan bonus berdasarkan jumlah pasangan yang terbentuk. "),
                          createVNode("p", null, [
                            createTextVNode(" Rumus: "),
                            createVNode("span", { class: "font-mono font-semibold" }, "Total Bonus = Jumlah Pasangan × Bonus Per Pasang")
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "flex justify-end gap-4" }, [
                    createVNode(unref(_sfc_main$2), {
                      type: "button",
                      variant: "outline",
                      onClick: ($event) => unref(router).visit(unref(index).url()),
                      disabled: unref(form).processing
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Batal ")
                      ]),
                      _: 1
                    }, 8, ["onClick", "disabled"]),
                    createVNode(unref(_sfc_main$2), {
                      type: "submit",
                      disabled: unref(form).processing
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(form).processing ? "Memproses..." : "Proses Pairing"), 1)
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
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/bonus/pairing/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
