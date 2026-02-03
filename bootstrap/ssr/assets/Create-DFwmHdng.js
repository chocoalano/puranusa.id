import { defineComponent, ref, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, withDirectives, createBlock, openBlock, Fragment, renderList, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { i as index, c as create, s as store } from "./BonusController-B0N7ywPz.js";
import { _ as _sfc_main$3 } from "./HeadingSmall-B1yfmTIh.js";
import { _ as _sfc_main$5 } from "./InputError-BhTWS2NZ.js";
import { _ as _sfc_main$2 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$6 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$4 } from "./Label-16aMY2sx.js";
import { _ as _sfc_main$1 } from "./AppLayout-B9pGpPI9.js";
import { Head, Link, Form } from "@inertiajs/vue3";
import { ArrowLeft } from "lucide-vue-next";
import { toast } from "vue-sonner";
import "./index--D7ld9AJ.js";
import "class-variance-authority";
import "reka-ui";
import "clsx";
import "tailwind-merge";
import "@vueuse/core";
import "./DropdownMenuTrigger-B1v6pHML.js";
import "./AvatarImage-DWFQMckn.js";
import "./index-BsP5JKUP.js";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    members: {}
  },
  setup(__props) {
    const breadcrumbItems = [
      {
        title: "Bonus Regular",
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
            _push2(ssrRenderComponent(unref(Head), { title: "Tambah Bonus Reguler" }, null, _parent2, _scopeId));
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
            _push2(`<div${_scopeId}><h1 class="text-3xl font-bold tracking-tight"${_scopeId}>Tambah Bonus Reguler</h1><p class="text-muted-foreground"${_scopeId}> Buat dan atur bonus reguler yang akan diterima oleh member. </p></div></div><div class="mx-auto"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Form), {
              action: unref(store).url(),
              method: "post",
              class: "space-y-6",
              onSuccess: () => unref(toast).success("Berhasil", {
                description: "Bonus berhasil dibuat."
              }),
              onError: () => unref(toast).error("Gagal", {
                description: "Terjadi kesalahan saat membuat bonus."
              })
            }, {
              default: withCtx(({ errors, processing }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="rounded-lg border bg-card p-6"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    title: "Informasi Bonus",
                    description: "Isi data berikut untuk menghitung dan mencatat bonus reguler member."
                  }, null, _parent3, _scopeId2));
                  _push3(`<div class="mt-6 grid gap-6 md:grid-cols-2"${_scopeId2}><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { for: "member_id" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Member`);
                      } else {
                        return [
                          createTextVNode("Member")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(`<select id="member_id" name="member_id" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"${_scopeId2}><option value=""${ssrIncludeBooleanAttr(Array.isArray(selectedMember.value) ? ssrLooseContain(selectedMember.value, "") : ssrLooseEqual(selectedMember.value, "")) ? " selected" : ""}${_scopeId2}>Pilih member...</option><!--[-->`);
                  ssrRenderList(__props.members, (member) => {
                    _push3(`<option${ssrRenderAttr("value", member.id)}${ssrIncludeBooleanAttr(Array.isArray(selectedMember.value) ? ssrLooseContain(selectedMember.value, member.id) : ssrLooseEqual(selectedMember.value, member.id)) ? " selected" : ""}${_scopeId2}>${ssrInterpolate(member.name)} (${ssrInterpolate(member.ewallet_id)}) </option>`);
                  });
                  _push3(`<!--]--></select><p class="text-sm text-muted-foreground"${_scopeId2}> Pilih member yang akan menerima bonus. Wajib diisi sebelum menyimpan. </p>`);
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    message: errors.member_id
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { for: "amount" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Jumlah Bonus`);
                      } else {
                        return [
                          createTextVNode("Jumlah Bonus")
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
                  _push3(`<p class="text-sm text-muted-foreground"${_scopeId2}> Masukkan nominal bonus kotor (sebelum dipotong pajak), dalam Rupiah. </p>`);
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    message: errors.amount
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { for: "tax_percent" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Persentase Pajak (%)`);
                      } else {
                        return [
                          createTextVNode("Persentase Pajak (%)")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    id: "tax_percent",
                    name: "tax_percent",
                    type: "number",
                    step: "0.01",
                    min: "0",
                    max: "100",
                    value: "10",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`<p class="text-sm text-muted-foreground"${_scopeId2}> Persentase pajak yang akan dipotong dari bonus. Default 10%. Ubah jika kebijakan pajak berbeda. </p>`);
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    message: errors.tax_percent
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { for: "index_value" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Nilai Indeks`);
                      } else {
                        return [
                          createTextVNode("Nilai Indeks")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    id: "index_value",
                    name: "index_value",
                    type: "number",
                    step: "0.01",
                    min: "0",
                    value: "1",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`<p class="text-sm text-muted-foreground"${_scopeId2}> Nilai pengali untuk perhitungan bonus. Biarkan bernilai 1 jika tidak ada penyesuaian khusus. </p>`);
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    message: errors.index_value
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid gap-2 md:col-span-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { for: "description" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Deskripsi`);
                      } else {
                        return [
                          createTextVNode("Deskripsi")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(`<textarea id="description" name="description" rows="3" placeholder="Tulis catatan, alasan pemberian bonus, periode perhitungan, atau informasi lain yang relevan..." class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"${_scopeId2}></textarea><p class="text-sm text-muted-foreground"${_scopeId2}> Opsional. Membantu tim keuangan dan admin memahami konteks bonus yang diberikan. </p>`);
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    message: errors.description
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div></div><div class="flex gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$2), {
                    type: "submit",
                    disabled: processing || !selectedMember.value
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(processing ? "Menyimpan..." : "Simpan Bonus")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(processing ? "Menyimpan..." : "Simpan Bonus"), 1)
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
                        title: "Informasi Bonus",
                        description: "Isi data berikut untuk menghitung dan mencatat bonus reguler member."
                      }),
                      createVNode("div", { class: "mt-6 grid gap-6 md:grid-cols-2" }, [
                        createVNode("div", { class: "grid gap-2" }, [
                          createVNode(unref(_sfc_main$4), { for: "member_id" }, {
                            default: withCtx(() => [
                              createTextVNode("Member")
                            ]),
                            _: 1
                          }),
                          withDirectives(createVNode("select", {
                            id: "member_id",
                            name: "member_id",
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
                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Pilih member yang akan menerima bonus. Wajib diisi sebelum menyimpan. "),
                          createVNode(_sfc_main$5, {
                            message: errors.member_id
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "grid gap-2" }, [
                          createVNode(unref(_sfc_main$4), { for: "amount" }, {
                            default: withCtx(() => [
                              createTextVNode("Jumlah Bonus")
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
                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Masukkan nominal bonus kotor (sebelum dipotong pajak), dalam Rupiah. "),
                          createVNode(_sfc_main$5, {
                            message: errors.amount
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "grid gap-2" }, [
                          createVNode(unref(_sfc_main$4), { for: "tax_percent" }, {
                            default: withCtx(() => [
                              createTextVNode("Persentase Pajak (%)")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), {
                            id: "tax_percent",
                            name: "tax_percent",
                            type: "number",
                            step: "0.01",
                            min: "0",
                            max: "100",
                            value: "10",
                            required: ""
                          }),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Persentase pajak yang akan dipotong dari bonus. Default 10%. Ubah jika kebijakan pajak berbeda. "),
                          createVNode(_sfc_main$5, {
                            message: errors.tax_percent
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "grid gap-2" }, [
                          createVNode(unref(_sfc_main$4), { for: "index_value" }, {
                            default: withCtx(() => [
                              createTextVNode("Nilai Indeks")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), {
                            id: "index_value",
                            name: "index_value",
                            type: "number",
                            step: "0.01",
                            min: "0",
                            value: "1",
                            required: ""
                          }),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Nilai pengali untuk perhitungan bonus. Biarkan bernilai 1 jika tidak ada penyesuaian khusus. "),
                          createVNode(_sfc_main$5, {
                            message: errors.index_value
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "grid gap-2 md:col-span-2" }, [
                          createVNode(unref(_sfc_main$4), { for: "description" }, {
                            default: withCtx(() => [
                              createTextVNode("Deskripsi")
                            ]),
                            _: 1
                          }),
                          createVNode("textarea", {
                            id: "description",
                            name: "description",
                            rows: "3",
                            placeholder: "Tulis catatan, alasan pemberian bonus, periode perhitungan, atau informasi lain yang relevan...",
                            class: "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                          }),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Opsional. Membantu tim keuangan dan admin memahami konteks bonus yang diberikan. "),
                          createVNode(_sfc_main$5, {
                            message: errors.description
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
                          createTextVNode(toDisplayString(processing ? "Menyimpan..." : "Simpan Bonus"), 1)
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
              createVNode(unref(Head), { title: "Tambah Bonus Reguler" }),
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
                    createVNode("h1", { class: "text-3xl font-bold tracking-tight" }, "Tambah Bonus Reguler"),
                    createVNode("p", { class: "text-muted-foreground" }, " Buat dan atur bonus reguler yang akan diterima oleh member. ")
                  ])
                ]),
                createVNode("div", { class: "mx-auto" }, [
                  createVNode(unref(Form), {
                    action: unref(store).url(),
                    method: "post",
                    class: "space-y-6",
                    onSuccess: () => unref(toast).success("Berhasil", {
                      description: "Bonus berhasil dibuat."
                    }),
                    onError: () => unref(toast).error("Gagal", {
                      description: "Terjadi kesalahan saat membuat bonus."
                    })
                  }, {
                    default: withCtx(({ errors, processing }) => [
                      createVNode("div", { class: "rounded-lg border bg-card p-6" }, [
                        createVNode(_sfc_main$3, {
                          title: "Informasi Bonus",
                          description: "Isi data berikut untuk menghitung dan mencatat bonus reguler member."
                        }),
                        createVNode("div", { class: "mt-6 grid gap-6 md:grid-cols-2" }, [
                          createVNode("div", { class: "grid gap-2" }, [
                            createVNode(unref(_sfc_main$4), { for: "member_id" }, {
                              default: withCtx(() => [
                                createTextVNode("Member")
                              ]),
                              _: 1
                            }),
                            withDirectives(createVNode("select", {
                              id: "member_id",
                              name: "member_id",
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
                            createVNode("p", { class: "text-sm text-muted-foreground" }, " Pilih member yang akan menerima bonus. Wajib diisi sebelum menyimpan. "),
                            createVNode(_sfc_main$5, {
                              message: errors.member_id
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", { class: "grid gap-2" }, [
                            createVNode(unref(_sfc_main$4), { for: "amount" }, {
                              default: withCtx(() => [
                                createTextVNode("Jumlah Bonus")
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
                            createVNode("p", { class: "text-sm text-muted-foreground" }, " Masukkan nominal bonus kotor (sebelum dipotong pajak), dalam Rupiah. "),
                            createVNode(_sfc_main$5, {
                              message: errors.amount
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", { class: "grid gap-2" }, [
                            createVNode(unref(_sfc_main$4), { for: "tax_percent" }, {
                              default: withCtx(() => [
                                createTextVNode("Persentase Pajak (%)")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$6), {
                              id: "tax_percent",
                              name: "tax_percent",
                              type: "number",
                              step: "0.01",
                              min: "0",
                              max: "100",
                              value: "10",
                              required: ""
                            }),
                            createVNode("p", { class: "text-sm text-muted-foreground" }, " Persentase pajak yang akan dipotong dari bonus. Default 10%. Ubah jika kebijakan pajak berbeda. "),
                            createVNode(_sfc_main$5, {
                              message: errors.tax_percent
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", { class: "grid gap-2" }, [
                            createVNode(unref(_sfc_main$4), { for: "index_value" }, {
                              default: withCtx(() => [
                                createTextVNode("Nilai Indeks")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$6), {
                              id: "index_value",
                              name: "index_value",
                              type: "number",
                              step: "0.01",
                              min: "0",
                              value: "1",
                              required: ""
                            }),
                            createVNode("p", { class: "text-sm text-muted-foreground" }, " Nilai pengali untuk perhitungan bonus. Biarkan bernilai 1 jika tidak ada penyesuaian khusus. "),
                            createVNode(_sfc_main$5, {
                              message: errors.index_value
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", { class: "grid gap-2 md:col-span-2" }, [
                            createVNode(unref(_sfc_main$4), { for: "description" }, {
                              default: withCtx(() => [
                                createTextVNode("Deskripsi")
                              ]),
                              _: 1
                            }),
                            createVNode("textarea", {
                              id: "description",
                              name: "description",
                              rows: "3",
                              placeholder: "Tulis catatan, alasan pemberian bonus, periode perhitungan, atau informasi lain yang relevan...",
                              class: "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                            }),
                            createVNode("p", { class: "text-sm text-muted-foreground" }, " Opsional. Membantu tim keuangan dan admin memahami konteks bonus yang diberikan. "),
                            createVNode(_sfc_main$5, {
                              message: errors.description
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
                            createTextVNode(toDisplayString(processing ? "Menyimpan..." : "Simpan Bonus"), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/bonus/regular/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
