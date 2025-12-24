import { defineComponent, unref, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, createCommentVNode, withDirectives, vModelText, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1, i as index, u as update } from "./AppLayout-hyZArMVS.js";
import { _ as _sfc_main$2 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$a } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$9 } from "./Label-16aMY2sx.js";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5, d as _sfc_main$6, c as _sfc_main$8 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$7 } from "./index-BpQimeTM.js";
import { ArrowLeft } from "lucide-vue-next";
import { toast } from "vue-sonner";
import "class-variance-authority";
import "./DropdownMenuTrigger-B1v6pHML.js";
import "reka-ui";
import "@vueuse/core";
import "./index--D7ld9AJ.js";
import "./AvatarImage-DWFQMckn.js";
import "./index-B0NlPG4h.js";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
import "clsx";
import "tailwind-merge";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    customer: {}
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      name: props.customer.name,
      username: props.customer.username,
      email: props.customer.email,
      phone: props.customer.phone || "",
      password: "",
      password_confirmation: "",
      description: props.customer.description || ""
    });
    const submit = () => {
      form.put(update.url(props.customer.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Data pelanggan berhasil diperbarui");
        },
        onError: (errors) => {
          const errorMessages = Object.values(errors);
          if (errorMessages.length > 0) {
            toast.error(errorMessages[0]);
            if (errorMessages.length > 1) {
              toast.warning(`Terdapat ${errorMessages.length} kesalahan pada form. Silakan periksa kembali.`);
            }
          } else {
            toast.error("Gagal memperbarui data pelanggan. Silakan periksa data yang dimasukkan.");
          }
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: `Edit ${__props.customer.name}`
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="rounded-xl p-4 space-y-6 py-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="text-3xl font-bold"${_scopeId}>Edit Pelanggan</h1><p class="mt-2 text-muted-foreground"${_scopeId}> Perbarui informasi pelanggan </p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(index).url()
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$2), { variant: "outline" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(ArrowLeft), { class: "mr-2 h-4 w-4" }, null, _parent4, _scopeId3));
                        _push4(` Kembali `);
                      } else {
                        return [
                          createVNode(unref(ArrowLeft), { class: "mr-2 h-4 w-4" }),
                          createTextVNode(" Kembali ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$2), { variant: "outline" }, {
                      default: withCtx(() => [
                        createVNode(unref(ArrowLeft), { class: "mr-2 h-4 w-4" }),
                        createTextVNode(" Kembali ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><form class="space-y-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$3), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex items-center justify-between"${_scopeId3}><div${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Informasi Akun`);
                            } else {
                              return [
                                createTextVNode("Informasi Akun")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`ID Ewallet: ${ssrInterpolate(__props.customer.ewallet_id)}`);
                            } else {
                              return [
                                createTextVNode("ID Ewallet: " + toDisplayString(__props.customer.ewallet_id), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div><div class="flex items-center gap-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$7), { variant: "outline" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Saldo: Rp ${ssrInterpolate(__props.customer.ewallet_saldo.toLocaleString("id-ID"))}`);
                            } else {
                              return [
                                createTextVNode(" Saldo: Rp " + toDisplayString(__props.customer.ewallet_saldo.toLocaleString("id-ID")), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        if (__props.customer.email_verified_at) {
                          _push4(ssrRenderComponent(unref(_sfc_main$7), { variant: "default" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` Terverifikasi `);
                              } else {
                                return [
                                  createTextVNode(" Terverifikasi ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(ssrRenderComponent(unref(_sfc_main$7), { variant: "secondary" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` Belum Verifikasi `);
                              } else {
                                return [
                                  createTextVNode(" Belum Verifikasi ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        }
                        _push4(`</div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center justify-between" }, [
                            createVNode("div", null, [
                              createVNode(unref(_sfc_main$5), null, {
                                default: withCtx(() => [
                                  createTextVNode("Informasi Akun")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$6), null, {
                                default: withCtx(() => [
                                  createTextVNode("ID Ewallet: " + toDisplayString(__props.customer.ewallet_id), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              createVNode(unref(_sfc_main$7), { variant: "outline" }, {
                                default: withCtx(() => [
                                  createTextVNode(" Saldo: Rp " + toDisplayString(__props.customer.ewallet_saldo.toLocaleString("id-ID")), 1)
                                ]),
                                _: 2
                              }, 1024),
                              __props.customer.email_verified_at ? (openBlock(), createBlock(unref(_sfc_main$7), {
                                key: 0,
                                variant: "default"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Terverifikasi ")
                                ]),
                                _: 1
                              })) : (openBlock(), createBlock(unref(_sfc_main$7), {
                                key: 1,
                                variant: "secondary"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Belum Verifikasi ")
                                ]),
                                _: 1
                              }))
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$8), { class: "space-y-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="grid gap-4 md:grid-cols-2"${_scopeId3}><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { for: "name" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Nama Lengkap *`);
                            } else {
                              return [
                                createTextVNode("Nama Lengkap *")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$a), {
                          id: "name",
                          modelValue: unref(form).name,
                          "onUpdate:modelValue": ($event) => unref(form).name = $event,
                          placeholder: "Masukkan nama lengkap",
                          class: { "border-destructive": unref(form).errors.name },
                          required: ""
                        }, null, _parent4, _scopeId3));
                        _push4(`<p class="text-xs text-muted-foreground"${_scopeId3}> Nama lengkap sesuai identitas, maksimal 255 karakter </p>`);
                        if (unref(form).errors.name) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.name)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { for: "username" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Username *`);
                            } else {
                              return [
                                createTextVNode("Username *")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$a), {
                          id: "username",
                          modelValue: unref(form).username,
                          "onUpdate:modelValue": ($event) => unref(form).username = $event,
                          placeholder: "contoh: johndoe123",
                          class: { "border-destructive": unref(form).errors.username },
                          required: ""
                        }, null, _parent4, _scopeId3));
                        _push4(`<p class="text-xs text-muted-foreground"${_scopeId3}> Username untuk login. Hanya boleh huruf, angka, dash (-) dan underscore (_) </p>`);
                        if (unref(form).errors.username) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.username)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { for: "email" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Email *`);
                            } else {
                              return [
                                createTextVNode("Email *")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$a), {
                          id: "email",
                          modelValue: unref(form).email,
                          "onUpdate:modelValue": ($event) => unref(form).email = $event,
                          type: "email",
                          placeholder: "nama@email.com",
                          class: { "border-destructive": unref(form).errors.email },
                          required: ""
                        }, null, _parent4, _scopeId3));
                        _push4(`<p class="text-xs text-muted-foreground"${_scopeId3}> Email aktif untuk menerima notifikasi dan verifikasi akun </p>`);
                        if (unref(form).errors.email) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.email)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { for: "phone" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`No. Telepon`);
                            } else {
                              return [
                                createTextVNode("No. Telepon")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$a), {
                          id: "phone",
                          modelValue: unref(form).phone,
                          "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                          placeholder: "08xxxxxxxxxx",
                          class: { "border-destructive": unref(form).errors.phone }
                        }, null, _parent4, _scopeId3));
                        _push4(`<p class="text-xs text-muted-foreground"${_scopeId3}> Nomor telepon aktif (opsional), maksimal 20 karakter </p>`);
                        if (unref(form).errors.phone) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.phone)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div></div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { for: "description" }, {
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
                        _push4(`<textarea id="description" placeholder="Keterangan tambahan (opsional)" rows="3" class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"${_scopeId3}>${ssrInterpolate(unref(form).description)}</textarea><p class="text-xs text-muted-foreground"${_scopeId3}> Catatan tambahan tentang pelanggan, seperti sumber referral atau informasi penting lainnya </p></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), { for: "name" }, {
                                default: withCtx(() => [
                                  createTextVNode("Nama Lengkap *")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), {
                                id: "name",
                                modelValue: unref(form).name,
                                "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                placeholder: "Masukkan nama lengkap",
                                class: { "border-destructive": unref(form).errors.name },
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Nama lengkap sesuai identitas, maksimal 255 karakter "),
                              unref(form).errors.name ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.name), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), { for: "username" }, {
                                default: withCtx(() => [
                                  createTextVNode("Username *")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), {
                                id: "username",
                                modelValue: unref(form).username,
                                "onUpdate:modelValue": ($event) => unref(form).username = $event,
                                placeholder: "contoh: johndoe123",
                                class: { "border-destructive": unref(form).errors.username },
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Username untuk login. Hanya boleh huruf, angka, dash (-) dan underscore (_) "),
                              unref(form).errors.username ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.username), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), { for: "email" }, {
                                default: withCtx(() => [
                                  createTextVNode("Email *")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), {
                                id: "email",
                                modelValue: unref(form).email,
                                "onUpdate:modelValue": ($event) => unref(form).email = $event,
                                type: "email",
                                placeholder: "nama@email.com",
                                class: { "border-destructive": unref(form).errors.email },
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Email aktif untuk menerima notifikasi dan verifikasi akun "),
                              unref(form).errors.email ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.email), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), { for: "phone" }, {
                                default: withCtx(() => [
                                  createTextVNode("No. Telepon")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), {
                                id: "phone",
                                modelValue: unref(form).phone,
                                "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                                placeholder: "08xxxxxxxxxx",
                                class: { "border-destructive": unref(form).errors.phone }
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Nomor telepon aktif (opsional), maksimal 20 karakter "),
                              unref(form).errors.phone ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.phone), 1)) : createCommentVNode("", true)
                            ])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$9), { for: "description" }, {
                              default: withCtx(() => [
                                createTextVNode("Keterangan")
                              ]),
                              _: 1
                            }),
                            withDirectives(createVNode("textarea", {
                              id: "description",
                              "onUpdate:modelValue": ($event) => unref(form).description = $event,
                              placeholder: "Keterangan tambahan (opsional)",
                              rows: "3",
                              class: "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).description]
                            ]),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, " Catatan tambahan tentang pelanggan, seperti sumber referral atau informasi penting lainnya ")
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
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("div", null, [
                            createVNode(unref(_sfc_main$5), null, {
                              default: withCtx(() => [
                                createTextVNode("Informasi Akun")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$6), null, {
                              default: withCtx(() => [
                                createTextVNode("ID Ewallet: " + toDisplayString(__props.customer.ewallet_id), 1)
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode(unref(_sfc_main$7), { variant: "outline" }, {
                              default: withCtx(() => [
                                createTextVNode(" Saldo: Rp " + toDisplayString(__props.customer.ewallet_saldo.toLocaleString("id-ID")), 1)
                              ]),
                              _: 2
                            }, 1024),
                            __props.customer.email_verified_at ? (openBlock(), createBlock(unref(_sfc_main$7), {
                              key: 0,
                              variant: "default"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Terverifikasi ")
                              ]),
                              _: 1
                            })) : (openBlock(), createBlock(unref(_sfc_main$7), {
                              key: 1,
                              variant: "secondary"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Belum Verifikasi ")
                              ]),
                              _: 1
                            }))
                          ])
                        ])
                      ]),
                      _: 2
                    }, 1024),
                    createVNode(unref(_sfc_main$8), { class: "space-y-4" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$9), { for: "name" }, {
                              default: withCtx(() => [
                                createTextVNode("Nama Lengkap *")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$a), {
                              id: "name",
                              modelValue: unref(form).name,
                              "onUpdate:modelValue": ($event) => unref(form).name = $event,
                              placeholder: "Masukkan nama lengkap",
                              class: { "border-destructive": unref(form).errors.name },
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, " Nama lengkap sesuai identitas, maksimal 255 karakter "),
                            unref(form).errors.name ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.name), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$9), { for: "username" }, {
                              default: withCtx(() => [
                                createTextVNode("Username *")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$a), {
                              id: "username",
                              modelValue: unref(form).username,
                              "onUpdate:modelValue": ($event) => unref(form).username = $event,
                              placeholder: "contoh: johndoe123",
                              class: { "border-destructive": unref(form).errors.username },
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, " Username untuk login. Hanya boleh huruf, angka, dash (-) dan underscore (_) "),
                            unref(form).errors.username ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.username), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$9), { for: "email" }, {
                              default: withCtx(() => [
                                createTextVNode("Email *")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$a), {
                              id: "email",
                              modelValue: unref(form).email,
                              "onUpdate:modelValue": ($event) => unref(form).email = $event,
                              type: "email",
                              placeholder: "nama@email.com",
                              class: { "border-destructive": unref(form).errors.email },
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, " Email aktif untuk menerima notifikasi dan verifikasi akun "),
                            unref(form).errors.email ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.email), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$9), { for: "phone" }, {
                              default: withCtx(() => [
                                createTextVNode("No. Telepon")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$a), {
                              id: "phone",
                              modelValue: unref(form).phone,
                              "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                              placeholder: "08xxxxxxxxxx",
                              class: { "border-destructive": unref(form).errors.phone }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, " Nomor telepon aktif (opsional), maksimal 20 karakter "),
                            unref(form).errors.phone ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.phone), 1)) : createCommentVNode("", true)
                          ])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$9), { for: "description" }, {
                            default: withCtx(() => [
                              createTextVNode("Keterangan")
                            ]),
                            _: 1
                          }),
                          withDirectives(createVNode("textarea", {
                            id: "description",
                            "onUpdate:modelValue": ($event) => unref(form).description = $event,
                            placeholder: "Keterangan tambahan (opsional)",
                            rows: "3",
                            class: "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).description]
                          ]),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, " Catatan tambahan tentang pelanggan, seperti sumber referral atau informasi penting lainnya ")
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$3), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Informasi Jaringan MLM`);
                            } else {
                              return [
                                createTextVNode("Informasi Jaringan MLM")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Data jaringan tidak dapat diubah `);
                            } else {
                              return [
                                createTextVNode(" Data jaringan tidak dapat diubah ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Informasi Jaringan MLM")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode(" Data jaringan tidak dapat diubah ")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$8), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="grid gap-4 md:grid-cols-3"${_scopeId3}><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Sponsor`);
                            } else {
                              return [
                                createTextVNode("Sponsor")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<div class="rounded-md border bg-muted p-3"${_scopeId3}><p class="text-sm font-medium"${_scopeId3}>${ssrInterpolate(__props.customer.sponsor_name || "-")}</p></div></div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Upline`);
                            } else {
                              return [
                                createTextVNode("Upline")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<div class="rounded-md border bg-muted p-3"${_scopeId3}><p class="text-sm font-medium"${_scopeId3}>${ssrInterpolate(__props.customer.upline_name || "-")}</p></div></div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Posisi`);
                            } else {
                              return [
                                createTextVNode("Posisi")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<div class="rounded-md border bg-muted p-3"${_scopeId3}>`);
                        if (__props.customer.position) {
                          _push4(ssrRenderComponent(unref(_sfc_main$7), { variant: "outline" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(__props.customer.position === "left" ? "Kiri" : "Kanan")}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(__props.customer.position === "left" ? "Kiri" : "Kanan"), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<span class="text-sm"${_scopeId3}>-</span>`);
                        }
                        _push4(`</div></div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "grid gap-4 md:grid-cols-3" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                                default: withCtx(() => [
                                  createTextVNode("Sponsor")
                                ]),
                                _: 1
                              }),
                              createVNode("div", { class: "rounded-md border bg-muted p-3" }, [
                                createVNode("p", { class: "text-sm font-medium" }, toDisplayString(__props.customer.sponsor_name || "-"), 1)
                              ])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                                default: withCtx(() => [
                                  createTextVNode("Upline")
                                ]),
                                _: 1
                              }),
                              createVNode("div", { class: "rounded-md border bg-muted p-3" }, [
                                createVNode("p", { class: "text-sm font-medium" }, toDisplayString(__props.customer.upline_name || "-"), 1)
                              ])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                                default: withCtx(() => [
                                  createTextVNode("Posisi")
                                ]),
                                _: 1
                              }),
                              createVNode("div", { class: "rounded-md border bg-muted p-3" }, [
                                __props.customer.position ? (openBlock(), createBlock(unref(_sfc_main$7), {
                                  key: 0,
                                  variant: "outline"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(__props.customer.position === "left" ? "Kiri" : "Kanan"), 1)
                                  ]),
                                  _: 1
                                })) : (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: "text-sm"
                                }, "-"))
                              ])
                            ])
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
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Informasi Jaringan MLM")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode(" Data jaringan tidak dapat diubah ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$8), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "grid gap-4 md:grid-cols-3" }, [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                              default: withCtx(() => [
                                createTextVNode("Sponsor")
                              ]),
                              _: 1
                            }),
                            createVNode("div", { class: "rounded-md border bg-muted p-3" }, [
                              createVNode("p", { class: "text-sm font-medium" }, toDisplayString(__props.customer.sponsor_name || "-"), 1)
                            ])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                              default: withCtx(() => [
                                createTextVNode("Upline")
                              ]),
                              _: 1
                            }),
                            createVNode("div", { class: "rounded-md border bg-muted p-3" }, [
                              createVNode("p", { class: "text-sm font-medium" }, toDisplayString(__props.customer.upline_name || "-"), 1)
                            ])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                              default: withCtx(() => [
                                createTextVNode("Posisi")
                              ]),
                              _: 1
                            }),
                            createVNode("div", { class: "rounded-md border bg-muted p-3" }, [
                              __props.customer.position ? (openBlock(), createBlock(unref(_sfc_main$7), {
                                key: 0,
                                variant: "outline"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(__props.customer.position === "left" ? "Kiri" : "Kanan"), 1)
                                ]),
                                _: 1
                              })) : (openBlock(), createBlock("span", {
                                key: 1,
                                class: "text-sm"
                              }, "-"))
                            ])
                          ])
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$3), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Ubah Password`);
                            } else {
                              return [
                                createTextVNode("Ubah Password")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Kosongkan jika tidak ingin mengubah password `);
                            } else {
                              return [
                                createTextVNode(" Kosongkan jika tidak ingin mengubah password ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Ubah Password")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode(" Kosongkan jika tidak ingin mengubah password ")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$8), { class: "space-y-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="grid gap-4 md:grid-cols-2"${_scopeId3}><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { for: "password" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Password Baru`);
                            } else {
                              return [
                                createTextVNode("Password Baru")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$a), {
                          id: "password",
                          modelValue: unref(form).password,
                          "onUpdate:modelValue": ($event) => unref(form).password = $event,
                          type: "password",
                          placeholder: "Minimal 8 karakter",
                          class: { "border-destructive": unref(form).errors.password }
                        }, null, _parent4, _scopeId3));
                        _push4(`<p class="text-xs text-muted-foreground"${_scopeId3}> Password minimal 8 karakter, gunakan kombinasi huruf dan angka </p>`);
                        if (unref(form).errors.password) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.password)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { for: "password_confirmation" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Konfirmasi Password`);
                            } else {
                              return [
                                createTextVNode("Konfirmasi Password")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$a), {
                          id: "password_confirmation",
                          modelValue: unref(form).password_confirmation,
                          "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                          type: "password",
                          placeholder: "Ulangi password"
                        }, null, _parent4, _scopeId3));
                        _push4(`<p class="text-xs text-muted-foreground"${_scopeId3}> Ketik ulang password baru yang sama untuk konfirmasi </p></div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), { for: "password" }, {
                                default: withCtx(() => [
                                  createTextVNode("Password Baru")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), {
                                id: "password",
                                modelValue: unref(form).password,
                                "onUpdate:modelValue": ($event) => unref(form).password = $event,
                                type: "password",
                                placeholder: "Minimal 8 karakter",
                                class: { "border-destructive": unref(form).errors.password }
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Password minimal 8 karakter, gunakan kombinasi huruf dan angka "),
                              unref(form).errors.password ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.password), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), { for: "password_confirmation" }, {
                                default: withCtx(() => [
                                  createTextVNode("Konfirmasi Password")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), {
                                id: "password_confirmation",
                                modelValue: unref(form).password_confirmation,
                                "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                                type: "password",
                                placeholder: "Ulangi password"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Ketik ulang password baru yang sama untuk konfirmasi ")
                            ])
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
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Ubah Password")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode(" Kosongkan jika tidak ingin mengubah password ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$8), { class: "space-y-4" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$9), { for: "password" }, {
                              default: withCtx(() => [
                                createTextVNode("Password Baru")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$a), {
                              id: "password",
                              modelValue: unref(form).password,
                              "onUpdate:modelValue": ($event) => unref(form).password = $event,
                              type: "password",
                              placeholder: "Minimal 8 karakter",
                              class: { "border-destructive": unref(form).errors.password }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, " Password minimal 8 karakter, gunakan kombinasi huruf dan angka "),
                            unref(form).errors.password ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.password), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$9), { for: "password_confirmation" }, {
                              default: withCtx(() => [
                                createTextVNode("Konfirmasi Password")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$a), {
                              id: "password_confirmation",
                              modelValue: unref(form).password_confirmation,
                              "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                              type: "password",
                              placeholder: "Ulangi password"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, " Ketik ulang password baru yang sama untuk konfirmasi ")
                          ])
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
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(index).url()
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$2), {
                    type: "button",
                    variant: "outline"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Batal `);
                      } else {
                        return [
                          createTextVNode(" Batal ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$2), {
                      type: "button",
                      variant: "outline"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Batal ")
                      ]),
                      _: 1
                    })
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
                  _push3(`${ssrInterpolate(unref(form).processing ? "Menyimpan..." : "Simpan Perubahan")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(form).processing ? "Menyimpan..." : "Simpan Perubahan"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form></div>`);
          } else {
            return [
              createVNode("div", { class: "rounded-xl p-4 space-y-6 py-6" }, [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("div", null, [
                    createVNode("h1", { class: "text-3xl font-bold" }, "Edit Pelanggan"),
                    createVNode("p", { class: "mt-2 text-muted-foreground" }, " Perbarui informasi pelanggan ")
                  ]),
                  createVNode(unref(Link), {
                    href: unref(index).url()
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$2), { variant: "outline" }, {
                        default: withCtx(() => [
                          createVNode(unref(ArrowLeft), { class: "mr-2 h-4 w-4" }),
                          createTextVNode(" Kembali ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["href"])
                ]),
                createVNode("form", {
                  onSubmit: withModifiers(submit, ["prevent"]),
                  class: "space-y-6"
                }, [
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$4), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex items-center justify-between" }, [
                            createVNode("div", null, [
                              createVNode(unref(_sfc_main$5), null, {
                                default: withCtx(() => [
                                  createTextVNode("Informasi Akun")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$6), null, {
                                default: withCtx(() => [
                                  createTextVNode("ID Ewallet: " + toDisplayString(__props.customer.ewallet_id), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              createVNode(unref(_sfc_main$7), { variant: "outline" }, {
                                default: withCtx(() => [
                                  createTextVNode(" Saldo: Rp " + toDisplayString(__props.customer.ewallet_saldo.toLocaleString("id-ID")), 1)
                                ]),
                                _: 2
                              }, 1024),
                              __props.customer.email_verified_at ? (openBlock(), createBlock(unref(_sfc_main$7), {
                                key: 0,
                                variant: "default"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Terverifikasi ")
                                ]),
                                _: 1
                              })) : (openBlock(), createBlock(unref(_sfc_main$7), {
                                key: 1,
                                variant: "secondary"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Belum Verifikasi ")
                                ]),
                                _: 1
                              }))
                            ])
                          ])
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(unref(_sfc_main$8), { class: "space-y-4" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), { for: "name" }, {
                                default: withCtx(() => [
                                  createTextVNode("Nama Lengkap *")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), {
                                id: "name",
                                modelValue: unref(form).name,
                                "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                placeholder: "Masukkan nama lengkap",
                                class: { "border-destructive": unref(form).errors.name },
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Nama lengkap sesuai identitas, maksimal 255 karakter "),
                              unref(form).errors.name ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.name), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), { for: "username" }, {
                                default: withCtx(() => [
                                  createTextVNode("Username *")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), {
                                id: "username",
                                modelValue: unref(form).username,
                                "onUpdate:modelValue": ($event) => unref(form).username = $event,
                                placeholder: "contoh: johndoe123",
                                class: { "border-destructive": unref(form).errors.username },
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Username untuk login. Hanya boleh huruf, angka, dash (-) dan underscore (_) "),
                              unref(form).errors.username ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.username), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), { for: "email" }, {
                                default: withCtx(() => [
                                  createTextVNode("Email *")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), {
                                id: "email",
                                modelValue: unref(form).email,
                                "onUpdate:modelValue": ($event) => unref(form).email = $event,
                                type: "email",
                                placeholder: "nama@email.com",
                                class: { "border-destructive": unref(form).errors.email },
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Email aktif untuk menerima notifikasi dan verifikasi akun "),
                              unref(form).errors.email ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.email), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), { for: "phone" }, {
                                default: withCtx(() => [
                                  createTextVNode("No. Telepon")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), {
                                id: "phone",
                                modelValue: unref(form).phone,
                                "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                                placeholder: "08xxxxxxxxxx",
                                class: { "border-destructive": unref(form).errors.phone }
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Nomor telepon aktif (opsional), maksimal 20 karakter "),
                              unref(form).errors.phone ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.phone), 1)) : createCommentVNode("", true)
                            ])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$9), { for: "description" }, {
                              default: withCtx(() => [
                                createTextVNode("Keterangan")
                              ]),
                              _: 1
                            }),
                            withDirectives(createVNode("textarea", {
                              id: "description",
                              "onUpdate:modelValue": ($event) => unref(form).description = $event,
                              placeholder: "Keterangan tambahan (opsional)",
                              rows: "3",
                              class: "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).description]
                            ]),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, " Catatan tambahan tentang pelanggan, seperti sumber referral atau informasi penting lainnya ")
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 2
                  }, 1024),
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$4), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Informasi Jaringan MLM")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode(" Data jaringan tidak dapat diubah ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$8), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "grid gap-4 md:grid-cols-3" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                                default: withCtx(() => [
                                  createTextVNode("Sponsor")
                                ]),
                                _: 1
                              }),
                              createVNode("div", { class: "rounded-md border bg-muted p-3" }, [
                                createVNode("p", { class: "text-sm font-medium" }, toDisplayString(__props.customer.sponsor_name || "-"), 1)
                              ])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                                default: withCtx(() => [
                                  createTextVNode("Upline")
                                ]),
                                _: 1
                              }),
                              createVNode("div", { class: "rounded-md border bg-muted p-3" }, [
                                createVNode("p", { class: "text-sm font-medium" }, toDisplayString(__props.customer.upline_name || "-"), 1)
                              ])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                                default: withCtx(() => [
                                  createTextVNode("Posisi")
                                ]),
                                _: 1
                              }),
                              createVNode("div", { class: "rounded-md border bg-muted p-3" }, [
                                __props.customer.position ? (openBlock(), createBlock(unref(_sfc_main$7), {
                                  key: 0,
                                  variant: "outline"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(__props.customer.position === "left" ? "Kiri" : "Kanan"), 1)
                                  ]),
                                  _: 1
                                })) : (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: "text-sm"
                                }, "-"))
                              ])
                            ])
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$4), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Ubah Password")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode(" Kosongkan jika tidak ingin mengubah password ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$8), { class: "space-y-4" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), { for: "password" }, {
                                default: withCtx(() => [
                                  createTextVNode("Password Baru")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), {
                                id: "password",
                                modelValue: unref(form).password,
                                "onUpdate:modelValue": ($event) => unref(form).password = $event,
                                type: "password",
                                placeholder: "Minimal 8 karakter",
                                class: { "border-destructive": unref(form).errors.password }
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Password minimal 8 karakter, gunakan kombinasi huruf dan angka "),
                              unref(form).errors.password ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.password), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), { for: "password_confirmation" }, {
                                default: withCtx(() => [
                                  createTextVNode("Konfirmasi Password")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), {
                                id: "password_confirmation",
                                modelValue: unref(form).password_confirmation,
                                "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                                type: "password",
                                placeholder: "Ulangi password"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Ketik ulang password baru yang sama untuk konfirmasi ")
                            ])
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "flex justify-end gap-4" }, [
                    createVNode(unref(Link), {
                      href: unref(index).url()
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$2), {
                          type: "button",
                          variant: "outline"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Batal ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode(unref(_sfc_main$2), {
                      type: "submit",
                      disabled: unref(form).processing
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(form).processing ? "Menyimpan..." : "Simpan Perubahan"), 1)
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
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Customers/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
