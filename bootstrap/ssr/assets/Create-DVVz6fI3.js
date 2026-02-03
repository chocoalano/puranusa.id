import { defineComponent, mergeProps, withCtx, unref, createVNode, createTextVNode, withDirectives, createBlock, createCommentVNode, vModelSelect, openBlock, toDisplayString, Fragment, renderList, vModelText, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrInterpolate, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { ag as index, ah as create, _ as _sfc_main$1, ai as store } from "./AppLayout-BHxY2bcF.js";
import { _ as _sfc_main$2 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5, d as _sfc_main$6, c as _sfc_main$7 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$9 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$8 } from "./Label-16aMY2sx.js";
import { useForm, Head, router } from "@inertiajs/vue3";
import { ArrowLeft, UserPlus } from "lucide-vue-next";
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
        title: "Bonus Sponsor",
        href: index.url()
      },
      {
        title: "Tambah Bonus",
        href: create.url()
      }
    ];
    const form = useForm({
      type: "registration",
      from_member_id: "",
      amount: "",
      percentage: "",
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
            _push2(ssrRenderComponent(unref(Head), { title: "Tambah Bonus Sponsor" }, null, _parent2, _scopeId));
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
            _push2(`<div${_scopeId}><h1 class="text-3xl font-bold tracking-tight"${_scopeId}>Tambah Bonus Sponsor</h1><p class="text-muted-foreground"${_scopeId}>Buat bonus sponsor baru dari aktivitas downline</p></div></div><form class="space-y-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$3), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$5), { class: "flex items-center gap-2" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(UserPlus), { class: "h-5 w-5" }, null, _parent5, _scopeId4));
                              _push5(` Informasi Bonus `);
                            } else {
                              return [
                                createVNode(unref(UserPlus), { class: "h-5 w-5" }),
                                createTextVNode(" Informasi Bonus ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Masukkan detail bonus sponsor yang akan diberikan `);
                            } else {
                              return [
                                createTextVNode(" Masukkan detail bonus sponsor yang akan diberikan ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), { class: "flex items-center gap-2" }, {
                            default: withCtx(() => [
                              createVNode(unref(UserPlus), { class: "h-5 w-5" }),
                              createTextVNode(" Informasi Bonus ")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode(" Masukkan detail bonus sponsor yang akan diberikan ")
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
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { for: "type" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Tipe Bonus *`);
                            } else {
                              return [
                                createTextVNode("Tipe Bonus *")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<select id="type" class="${ssrRenderClass([{ "border-destructive": unref(form).errors.type }, "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"])}"${_scopeId3}><option value="registration"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "registration") : ssrLooseEqual(unref(form).type, "registration")) ? " selected" : ""}${_scopeId3}>Registrasi</option><option value="transaction"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "transaction") : ssrLooseEqual(unref(form).type, "transaction")) ? " selected" : ""}${_scopeId3}>Transaksi</option></select>`);
                        if (unref(form).errors.type) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.type)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`<p class="text-sm text-muted-foreground"${_scopeId3}> Pilih tipe bonus: dari registrasi member baru atau dari transaksi </p></div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { for: "from_member_id" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Member (Downline) *`);
                            } else {
                              return [
                                createTextVNode("Member (Downline) *")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<select id="from_member_id" class="${ssrRenderClass([{ "border-destructive": unref(form).errors.from_member_id }, "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"])}"${_scopeId3}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).from_member_id) ? ssrLooseContain(unref(form).from_member_id, "") : ssrLooseEqual(unref(form).from_member_id, "")) ? " selected" : ""}${_scopeId3}>Pilih member...</option><!--[-->`);
                        ssrRenderList(__props.members, (member) => {
                          _push4(`<option${ssrRenderAttr("value", member.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).from_member_id) ? ssrLooseContain(unref(form).from_member_id, member.id) : ssrLooseEqual(unref(form).from_member_id, member.id)) ? " selected" : ""}${_scopeId3}>${ssrInterpolate(member.name)} (${ssrInterpolate(member.ewallet_id)}) </option>`);
                        });
                        _push4(`<!--]--></select>`);
                        if (unref(form).errors.from_member_id) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.from_member_id)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`<p class="text-sm text-muted-foreground"${_scopeId3}> Sistem akan otomatis memberikan bonus kepada sponsor member ini </p></div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { for: "amount" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Nilai Transaksi/Registrasi (Rp) *`);
                            } else {
                              return [
                                createTextVNode("Nilai Transaksi/Registrasi (Rp) *")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          id: "amount",
                          modelValue: unref(form).amount,
                          "onUpdate:modelValue": ($event) => unref(form).amount = $event,
                          type: "number",
                          step: "0.01",
                          placeholder: "Contoh: 100000",
                          class: { "border-destructive": unref(form).errors.amount }
                        }, null, _parent4, _scopeId3));
                        if (unref(form).errors.amount) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.amount)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`<p class="text-sm text-muted-foreground"${_scopeId3}> Nilai transaksi atau registrasi yang menjadi dasar perhitungan bonus </p></div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { for: "percentage" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Persentase Bonus (%) *`);
                            } else {
                              return [
                                createTextVNode("Persentase Bonus (%) *")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          id: "percentage",
                          modelValue: unref(form).percentage,
                          "onUpdate:modelValue": ($event) => unref(form).percentage = $event,
                          type: "number",
                          step: "0.01",
                          placeholder: "Contoh: 5",
                          class: { "border-destructive": unref(form).errors.percentage }
                        }, null, _parent4, _scopeId3));
                        if (unref(form).errors.percentage) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.percentage)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`<p class="text-sm text-muted-foreground"${_scopeId3}> Persentase bonus yang akan diberikan kepada sponsor </p></div><div class="space-y-2"${_scopeId3}>`);
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
                        _push4(`<textarea id="description" rows="3" placeholder="Catatan tambahan tentang bonus ini..." class="${ssrRenderClass([{ "border-destructive": unref(form).errors.description }, "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"])}"${_scopeId3}>${ssrInterpolate(unref(form).description)}</textarea>`);
                        if (unref(form).errors.description) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.description)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "type" }, {
                              default: withCtx(() => [
                                createTextVNode("Tipe Bonus *")
                              ]),
                              _: 1
                            }),
                            withDirectives(createVNode("select", {
                              id: "type",
                              "onUpdate:modelValue": ($event) => unref(form).type = $event,
                              class: ["flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", { "border-destructive": unref(form).errors.type }]
                            }, [
                              createVNode("option", { value: "registration" }, "Registrasi"),
                              createVNode("option", { value: "transaction" }, "Transaksi")
                            ], 10, ["onUpdate:modelValue"]), [
                              [vModelSelect, unref(form).type]
                            ]),
                            unref(form).errors.type ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.type), 1)) : createCommentVNode("", true),
                            createVNode("p", { class: "text-sm text-muted-foreground" }, " Pilih tipe bonus: dari registrasi member baru atau dari transaksi ")
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "from_member_id" }, {
                              default: withCtx(() => [
                                createTextVNode("Member (Downline) *")
                              ]),
                              _: 1
                            }),
                            withDirectives(createVNode("select", {
                              id: "from_member_id",
                              "onUpdate:modelValue": ($event) => unref(form).from_member_id = $event,
                              class: ["flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", { "border-destructive": unref(form).errors.from_member_id }]
                            }, [
                              createVNode("option", { value: "" }, "Pilih member..."),
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.members, (member) => {
                                return openBlock(), createBlock("option", {
                                  key: member.id,
                                  value: member.id
                                }, toDisplayString(member.name) + " (" + toDisplayString(member.ewallet_id) + ") ", 9, ["value"]);
                              }), 128))
                            ], 10, ["onUpdate:modelValue"]), [
                              [vModelSelect, unref(form).from_member_id]
                            ]),
                            unref(form).errors.from_member_id ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.from_member_id), 1)) : createCommentVNode("", true),
                            createVNode("p", { class: "text-sm text-muted-foreground" }, " Sistem akan otomatis memberikan bonus kepada sponsor member ini ")
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "amount" }, {
                              default: withCtx(() => [
                                createTextVNode("Nilai Transaksi/Registrasi (Rp) *")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$9), {
                              id: "amount",
                              modelValue: unref(form).amount,
                              "onUpdate:modelValue": ($event) => unref(form).amount = $event,
                              type: "number",
                              step: "0.01",
                              placeholder: "Contoh: 100000",
                              class: { "border-destructive": unref(form).errors.amount }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            unref(form).errors.amount ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.amount), 1)) : createCommentVNode("", true),
                            createVNode("p", { class: "text-sm text-muted-foreground" }, " Nilai transaksi atau registrasi yang menjadi dasar perhitungan bonus ")
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "percentage" }, {
                              default: withCtx(() => [
                                createTextVNode("Persentase Bonus (%) *")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$9), {
                              id: "percentage",
                              modelValue: unref(form).percentage,
                              "onUpdate:modelValue": ($event) => unref(form).percentage = $event,
                              type: "number",
                              step: "0.01",
                              placeholder: "Contoh: 5",
                              class: { "border-destructive": unref(form).errors.percentage }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            unref(form).errors.percentage ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.percentage), 1)) : createCommentVNode("", true),
                            createVNode("p", { class: "text-sm text-muted-foreground" }, " Persentase bonus yang akan diberikan kepada sponsor ")
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
                              placeholder: "Catatan tambahan tentang bonus ini..."
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
                            createVNode(unref(UserPlus), { class: "h-5 w-5" }),
                            createTextVNode(" Informasi Bonus ")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode(" Masukkan detail bonus sponsor yang akan diberikan ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$8), { for: "type" }, {
                            default: withCtx(() => [
                              createTextVNode("Tipe Bonus *")
                            ]),
                            _: 1
                          }),
                          withDirectives(createVNode("select", {
                            id: "type",
                            "onUpdate:modelValue": ($event) => unref(form).type = $event,
                            class: ["flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", { "border-destructive": unref(form).errors.type }]
                          }, [
                            createVNode("option", { value: "registration" }, "Registrasi"),
                            createVNode("option", { value: "transaction" }, "Transaksi")
                          ], 10, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(form).type]
                          ]),
                          unref(form).errors.type ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive"
                          }, toDisplayString(unref(form).errors.type), 1)) : createCommentVNode("", true),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Pilih tipe bonus: dari registrasi member baru atau dari transaksi ")
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$8), { for: "from_member_id" }, {
                            default: withCtx(() => [
                              createTextVNode("Member (Downline) *")
                            ]),
                            _: 1
                          }),
                          withDirectives(createVNode("select", {
                            id: "from_member_id",
                            "onUpdate:modelValue": ($event) => unref(form).from_member_id = $event,
                            class: ["flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", { "border-destructive": unref(form).errors.from_member_id }]
                          }, [
                            createVNode("option", { value: "" }, "Pilih member..."),
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.members, (member) => {
                              return openBlock(), createBlock("option", {
                                key: member.id,
                                value: member.id
                              }, toDisplayString(member.name) + " (" + toDisplayString(member.ewallet_id) + ") ", 9, ["value"]);
                            }), 128))
                          ], 10, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(form).from_member_id]
                          ]),
                          unref(form).errors.from_member_id ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive"
                          }, toDisplayString(unref(form).errors.from_member_id), 1)) : createCommentVNode("", true),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Sistem akan otomatis memberikan bonus kepada sponsor member ini ")
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$8), { for: "amount" }, {
                            default: withCtx(() => [
                              createTextVNode("Nilai Transaksi/Registrasi (Rp) *")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$9), {
                            id: "amount",
                            modelValue: unref(form).amount,
                            "onUpdate:modelValue": ($event) => unref(form).amount = $event,
                            type: "number",
                            step: "0.01",
                            placeholder: "Contoh: 100000",
                            class: { "border-destructive": unref(form).errors.amount }
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                          unref(form).errors.amount ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive"
                          }, toDisplayString(unref(form).errors.amount), 1)) : createCommentVNode("", true),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Nilai transaksi atau registrasi yang menjadi dasar perhitungan bonus ")
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$8), { for: "percentage" }, {
                            default: withCtx(() => [
                              createTextVNode("Persentase Bonus (%) *")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$9), {
                            id: "percentage",
                            modelValue: unref(form).percentage,
                            "onUpdate:modelValue": ($event) => unref(form).percentage = $event,
                            type: "number",
                            step: "0.01",
                            placeholder: "Contoh: 5",
                            class: { "border-destructive": unref(form).errors.percentage }
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                          unref(form).errors.percentage ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive"
                          }, toDisplayString(unref(form).errors.percentage), 1)) : createCommentVNode("", true),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Persentase bonus yang akan diberikan kepada sponsor ")
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
                            placeholder: "Catatan tambahan tentang bonus ini..."
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
                  _push3(`${ssrInterpolate(unref(form).processing ? "Menyimpan..." : "Simpan Bonus")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(form).processing ? "Menyimpan..." : "Simpan Bonus"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Tambah Bonus Sponsor" }),
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
                    createVNode("h1", { class: "text-3xl font-bold tracking-tight" }, "Tambah Bonus Sponsor"),
                    createVNode("p", { class: "text-muted-foreground" }, "Buat bonus sponsor baru dari aktivitas downline")
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
                              createVNode(unref(UserPlus), { class: "h-5 w-5" }),
                              createTextVNode(" Informasi Bonus ")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode(" Masukkan detail bonus sponsor yang akan diberikan ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "type" }, {
                              default: withCtx(() => [
                                createTextVNode("Tipe Bonus *")
                              ]),
                              _: 1
                            }),
                            withDirectives(createVNode("select", {
                              id: "type",
                              "onUpdate:modelValue": ($event) => unref(form).type = $event,
                              class: ["flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", { "border-destructive": unref(form).errors.type }]
                            }, [
                              createVNode("option", { value: "registration" }, "Registrasi"),
                              createVNode("option", { value: "transaction" }, "Transaksi")
                            ], 10, ["onUpdate:modelValue"]), [
                              [vModelSelect, unref(form).type]
                            ]),
                            unref(form).errors.type ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.type), 1)) : createCommentVNode("", true),
                            createVNode("p", { class: "text-sm text-muted-foreground" }, " Pilih tipe bonus: dari registrasi member baru atau dari transaksi ")
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "from_member_id" }, {
                              default: withCtx(() => [
                                createTextVNode("Member (Downline) *")
                              ]),
                              _: 1
                            }),
                            withDirectives(createVNode("select", {
                              id: "from_member_id",
                              "onUpdate:modelValue": ($event) => unref(form).from_member_id = $event,
                              class: ["flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", { "border-destructive": unref(form).errors.from_member_id }]
                            }, [
                              createVNode("option", { value: "" }, "Pilih member..."),
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.members, (member) => {
                                return openBlock(), createBlock("option", {
                                  key: member.id,
                                  value: member.id
                                }, toDisplayString(member.name) + " (" + toDisplayString(member.ewallet_id) + ") ", 9, ["value"]);
                              }), 128))
                            ], 10, ["onUpdate:modelValue"]), [
                              [vModelSelect, unref(form).from_member_id]
                            ]),
                            unref(form).errors.from_member_id ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.from_member_id), 1)) : createCommentVNode("", true),
                            createVNode("p", { class: "text-sm text-muted-foreground" }, " Sistem akan otomatis memberikan bonus kepada sponsor member ini ")
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "amount" }, {
                              default: withCtx(() => [
                                createTextVNode("Nilai Transaksi/Registrasi (Rp) *")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$9), {
                              id: "amount",
                              modelValue: unref(form).amount,
                              "onUpdate:modelValue": ($event) => unref(form).amount = $event,
                              type: "number",
                              step: "0.01",
                              placeholder: "Contoh: 100000",
                              class: { "border-destructive": unref(form).errors.amount }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            unref(form).errors.amount ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.amount), 1)) : createCommentVNode("", true),
                            createVNode("p", { class: "text-sm text-muted-foreground" }, " Nilai transaksi atau registrasi yang menjadi dasar perhitungan bonus ")
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "percentage" }, {
                              default: withCtx(() => [
                                createTextVNode("Persentase Bonus (%) *")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$9), {
                              id: "percentage",
                              modelValue: unref(form).percentage,
                              "onUpdate:modelValue": ($event) => unref(form).percentage = $event,
                              type: "number",
                              step: "0.01",
                              placeholder: "Contoh: 5",
                              class: { "border-destructive": unref(form).errors.percentage }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            unref(form).errors.percentage ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.percentage), 1)) : createCommentVNode("", true),
                            createVNode("p", { class: "text-sm text-muted-foreground" }, " Persentase bonus yang akan diberikan kepada sponsor ")
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
                              placeholder: "Catatan tambahan tentang bonus ini..."
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
                        createTextVNode(toDisplayString(unref(form).processing ? "Menyimpan..." : "Simpan Bonus"), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/bonus/sponsor/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
