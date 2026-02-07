import { defineComponent, computed, ref, unref, withCtx, createVNode, createBlock, openBlock, createTextVNode, toDisplayString, Fragment, withModifiers, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$6, a as _sfc_main$7, b as _sfc_main$8 } from "./index-D3PKcwoM.js";
import { _ as _sfc_main$h } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, d as _sfc_main$4, c as _sfc_main$5 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$a } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$9 } from "./Label-16aMY2sx.js";
import { _ as _sfc_main$b, a as _sfc_main$c, b as _sfc_main$d, c as _sfc_main$e, d as _sfc_main$f } from "./SelectValue-BUnv4mQg.js";
import { _ as _sfc_main$g } from "./Textarea-pcFPh_uS.js";
import { usePage, useForm, Head, Link } from "@inertiajs/vue3";
import { toast } from "vue-sonner";
import "class-variance-authority";
import "reka-ui";
import "clsx";
import "tailwind-merge";
import "@vueuse/core";
import "lucide-vue-next";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Register",
  __ssrInlineRender: true,
  props: {
    ref_code: { default: "" }
  },
  setup(__props) {
    const props = __props;
    const page = usePage();
    const referralFromQuery = computed(() => {
      try {
        const url = new URL(page.url, "http://localhost");
        return (url.searchParams.get("ref") || url.searchParams.get("ref_code") || "").trim();
      } catch {
        return "";
      }
    });
    const initialRefCode = (props.ref_code || referralFromQuery.value || "").trim();
    const isReferralLocked = computed(() => !!initialRefCode);
    const flashSuccess = computed(() => page.props.flash?.success);
    const form = useForm({
      name: "",
      username: "",
      email: "",
      phone: "",
      nik: "",
      gender: "",
      alamat: "",
      password: "",
      password_confirmation: "",
      ref_code: initialRefCode
    });
    const showPassword = ref(false);
    const showPasswordConfirmation = ref(false);
    const submit = () => {
      form.transform((data) => ({
        ...data,
        ref_code: isReferralLocked.value ? (data.ref_code || "").trim() : (data.ref_code || "").trim() || null
      }));
      form.post("/client/register", {
        onSuccess: () => {
          toast.success("Pendaftaran berhasil! Selamat datang!");
        },
        onError: (errors) => {
          if (errors.ref_code && isReferralLocked.value) {
            toast.error("Kode referral pada link tidak valid. Silakan gunakan link referral yang benar atau daftar tanpa referral.");
            return;
          }
          const firstError = Object.values(errors)[0];
          const errorMessage = typeof firstError === "string" ? firstError : "Pendaftaran gagal. Silakan periksa form Anda.";
          toast.error(errorMessage);
        },
        onFinish: () => {
          form.reset("password", "password_confirmation");
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Daftar - Puranusa" }, null, _parent));
      _push(`<div class="grid min-h-screen lg:grid-cols-2"><div class="relative hidden bg-muted lg:block"><div class="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5"></div><div class="relative flex h-full flex-col items-center justify-center p-12 text-center"><div class="max-w-md space-y-6"><h1 class="text-4xl font-bold tracking-tight">Bergabunglah dengan Kami!</h1><p class="text-lg text-muted-foreground"> Daftar sekarang dan nikmati pengalaman belanja yang luar biasa dengan berbagai keuntungan. </p><div class="grid grid-cols-2 gap-4 pt-8"><div class="space-y-2 rounded-lg bg-background/50 p-4"><div class="text-2xl">🎁</div><p class="text-sm font-medium">Bonus Member</p></div><div class="space-y-2 rounded-lg bg-background/50 p-4"><div class="text-2xl">🚚</div><p class="text-sm font-medium">Gratis Ongkir</p></div><div class="space-y-2 rounded-lg bg-background/50 p-4"><div class="text-2xl">💳</div><p class="text-sm font-medium">E-Wallet</p></div><div class="space-y-2 rounded-lg bg-background/50 p-4"><div class="text-2xl">⭐</div><p class="text-sm font-medium">Reward Points</p></div></div></div></div><div class="bg-grid-white/10 absolute inset-0 bg-[size:20px_20px]"></div></div><div class="flex items-center justify-center bg-background p-8"><div class="w-full max-w-md space-y-8"><div class="flex justify-center">`);
      _push(ssrRenderComponent(unref(Link), { href: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-2"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"${_scopeId}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"${_scopeId}></path><path d="M3 6h18"${_scopeId}></path><path d="M16 10a4 4 0 0 1-8 0"${_scopeId}></path></svg><span class="text-2xl font-bold"${_scopeId}>Puranusa</span></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-2" }, [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "32",
                  height: "32",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  class: "text-primary"
                }, [
                  createVNode("path", { d: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" }),
                  createVNode("path", { d: "M3 6h18" }),
                  createVNode("path", { d: "M16 10a4 4 0 0 1-8 0" })
                ])),
                createVNode("span", { class: "text-2xl font-bold" }, "Puranusa")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), { class: "space-y-1" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "text-2xl font-bold" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Buat Akun Baru`);
                      } else {
                        return [
                          createTextVNode("Buat Akun Baru")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Isi formulir di bawah untuk mendaftar`);
                      } else {
                        return [
                          createTextVNode("Isi formulir di bawah untuk mendaftar")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), { class: "text-2xl font-bold" }, {
                      default: withCtx(() => [
                        createTextVNode("Buat Akun Baru")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createTextVNode("Isi formulir di bawah untuk mendaftar")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$5), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<form class="space-y-4"${_scopeId2}>`);
                  if (flashSuccess.value) {
                    _push3(ssrRenderComponent(unref(_sfc_main$6), { variant: "default" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"${_scopeId3}><circle cx="12" cy="12" r="10"${_scopeId3}></circle><path d="m9 12 2 2 4-4"${_scopeId3}></path></svg>`);
                          _push4(ssrRenderComponent(unref(_sfc_main$7), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Berhasil!`);
                              } else {
                                return [
                                  createTextVNode("Berhasil!")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$8), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(flashSuccess.value)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(flashSuccess.value), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              width: "16",
                              height: "16",
                              viewBox: "0 0 24 24",
                              fill: "none",
                              stroke: "currentColor",
                              "stroke-width": "2",
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              class: "h-4 w-4"
                            }, [
                              createVNode("circle", {
                                cx: "12",
                                cy: "12",
                                r: "10"
                              }),
                              createVNode("path", { d: "m9 12 2 2 4-4" })
                            ])),
                            createVNode(unref(_sfc_main$7), null, {
                              default: withCtx(() => [
                                createTextVNode("Berhasil!")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$8), null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(flashSuccess.value), 1)
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$9), { for: "name" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Nama Lengkap <span class="text-destructive"${_scopeId3}>*</span>`);
                      } else {
                        return [
                          createTextVNode("Nama Lengkap "),
                          createVNode("span", { class: "text-destructive" }, "*")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="relative"${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute top-3 left-3 h-4 w-4 text-muted-foreground"${_scopeId2}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"${_scopeId2}></path><circle cx="12" cy="7" r="4"${_scopeId2}></circle></svg>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$a), {
                    id: "name",
                    modelValue: unref(form).name,
                    "onUpdate:modelValue": ($event) => unref(form).name = $event,
                    type: "text",
                    placeholder: "Masukkan nama lengkap",
                    class: ["pl-10", { "border-destructive": unref(form).errors.name }],
                    required: "",
                    autofocus: "",
                    autocomplete: "name"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  if (unref(form).errors.name) {
                    _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(unref(form).errors.name)}</p>`);
                  } else {
                    _push3(`<p class="text-xs text-muted-foreground"${_scopeId2}> Nama lengkap sesuai identitas, maksimal 255 karakter </p>`);
                  }
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$9), { for: "username" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Username <span class="text-destructive"${_scopeId3}>*</span>`);
                      } else {
                        return [
                          createTextVNode("Username "),
                          createVNode("span", { class: "text-destructive" }, "*")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="relative"${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute top-3 left-3 h-4 w-4 text-muted-foreground"${_scopeId2}><circle cx="12" cy="12" r="4"${_scopeId2}></circle><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"${_scopeId2}></path></svg>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$a), {
                    id: "username",
                    modelValue: unref(form).username,
                    "onUpdate:modelValue": ($event) => unref(form).username = $event,
                    type: "text",
                    placeholder: "contoh: puranusa123",
                    class: ["pl-10", { "border-destructive": unref(form).errors.username }],
                    required: "",
                    autocomplete: "username"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  if (unref(form).errors.username) {
                    _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(unref(form).errors.username)}</p>`);
                  } else {
                    _push3(`<p class="text-xs text-muted-foreground"${_scopeId2}> Username untuk login, hanya boleh huruf, angka, dash (-), dan underscore (_). Maksimal 100 karakter </p>`);
                  }
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$9), { for: "email" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Email <span class="text-destructive"${_scopeId3}>*</span>`);
                      } else {
                        return [
                          createTextVNode("Email "),
                          createVNode("span", { class: "text-destructive" }, "*")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="relative"${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute top-3 left-3 h-4 w-4 text-muted-foreground"${_scopeId2}><rect width="20" height="16" x="2" y="4" rx="2"${_scopeId2}></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"${_scopeId2}></path></svg>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$a), {
                    id: "email",
                    modelValue: unref(form).email,
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    type: "email",
                    placeholder: "nama@email.com",
                    class: ["pl-10", { "border-destructive": unref(form).errors.email }],
                    required: "",
                    autocomplete: "email"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  if (unref(form).errors.email) {
                    _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(unref(form).errors.email)}</p>`);
                  } else {
                    _push3(`<p class="text-xs text-muted-foreground"${_scopeId2}> Email aktif untuk menerima notifikasi dan informasi akun </p>`);
                  }
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$9), { for: "phone" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Nomor Telepon <span class="text-destructive"${_scopeId3}>*</span>`);
                      } else {
                        return [
                          createTextVNode("Nomor Telepon "),
                          createVNode("span", { class: "text-destructive" }, "*")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="relative"${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute top-3 left-3 h-4 w-4 text-muted-foreground"${_scopeId2}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"${_scopeId2}></path></svg>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$a), {
                    id: "phone",
                    modelValue: unref(form).phone,
                    "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                    type: "tel",
                    placeholder: "08xxxxxxxxxx",
                    class: ["pl-10", { "border-destructive": unref(form).errors.phone }],
                    required: "",
                    autocomplete: "tel"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  if (unref(form).errors.phone) {
                    _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(unref(form).errors.phone)}</p>`);
                  } else {
                    _push3(`<p class="text-xs text-muted-foreground"${_scopeId2}> Nomor telepon aktif (WhatsApp), maksimal 20 karakter </p>`);
                  }
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$9), { for: "nik" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`NIK (Opsional)`);
                      } else {
                        return [
                          createTextVNode("NIK (Opsional)")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="relative"${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute top-3 left-3 h-4 w-4 text-muted-foreground"${_scopeId2}><rect width="20" height="14" x="2" y="5" rx="2"${_scopeId2}></rect><line x1="2" x2="22" y1="10" y2="10"${_scopeId2}></line></svg>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$a), {
                    id: "nik",
                    modelValue: unref(form).nik,
                    "onUpdate:modelValue": ($event) => unref(form).nik = $event,
                    type: "text",
                    inputmode: "numeric",
                    placeholder: "Contoh: 3201234567890001",
                    class: ["pl-10", { "border-destructive": unref(form).errors.nik }],
                    autocomplete: "off",
                    maxlength: "32"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  if (unref(form).errors.nik) {
                    _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(unref(form).errors.nik)}</p>`);
                  } else {
                    _push3(`<p class="text-xs text-muted-foreground"${_scopeId2}> Nomor Induk Kependudukan (8-32 digit angka) </p>`);
                  }
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$9), { for: "gender" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Jenis Kelamin (Opsional)`);
                      } else {
                        return [
                          createTextVNode("Jenis Kelamin (Opsional)")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$b), {
                    modelValue: unref(form).gender,
                    "onUpdate:modelValue": ($event) => unref(form).gender = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$c), {
                          class: { "border-destructive": unref(form).errors.gender }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$d), { placeholder: "Pilih jenis kelamin" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$d), { placeholder: "Pilih jenis kelamin" })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$e), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$f), { value: "L" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Laki-laki`);
                                  } else {
                                    return [
                                      createTextVNode("Laki-laki")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$f), { value: "P" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Perempuan`);
                                  } else {
                                    return [
                                      createTextVNode("Perempuan")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$f), { value: "L" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Laki-laki")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$f), { value: "P" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Perempuan")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$c), {
                            class: { "border-destructive": unref(form).errors.gender }
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$d), { placeholder: "Pilih jenis kelamin" })
                            ]),
                            _: 1
                          }, 8, ["class"]),
                          createVNode(unref(_sfc_main$e), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$f), { value: "L" }, {
                                default: withCtx(() => [
                                  createTextVNode("Laki-laki")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$f), { value: "P" }, {
                                default: withCtx(() => [
                                  createTextVNode("Perempuan")
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
                  }, _parent3, _scopeId2));
                  if (unref(form).errors.gender) {
                    _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(unref(form).errors.gender)}</p>`);
                  } else {
                    _push3(`<p class="text-xs text-muted-foreground"${_scopeId2}> Pilih jenis kelamin Anda </p>`);
                  }
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$9), { for: "alamat" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Alamat (Opsional)`);
                      } else {
                        return [
                          createTextVNode("Alamat (Opsional)")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$g), {
                    id: "alamat",
                    modelValue: unref(form).alamat,
                    "onUpdate:modelValue": ($event) => unref(form).alamat = $event,
                    placeholder: "Tulis alamat lengkap (jalan, RT/RW, kelurahan, kecamatan, kota)",
                    class: { "border-destructive": unref(form).errors.alamat },
                    rows: "3"
                  }, null, _parent3, _scopeId2));
                  if (unref(form).errors.alamat) {
                    _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(unref(form).errors.alamat)}</p>`);
                  } else {
                    _push3(`<p class="text-xs text-muted-foreground"${_scopeId2}> Alamat lengkap untuk keperluan pengiriman </p>`);
                  }
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$9), { for: "ref_code" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Kode Referral (Opsional)`);
                      } else {
                        return [
                          createTextVNode("Kode Referral (Opsional)")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="relative"${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute top-3 left-3 h-4 w-4 text-muted-foreground"${_scopeId2}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"${_scopeId2}></path><circle cx="9" cy="7" r="4"${_scopeId2}></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"${_scopeId2}></path><path d="M16 3.13a4 4 0 0 1 0 7.75"${_scopeId2}></path></svg>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$a), {
                    id: "ref_code",
                    modelValue: unref(form).ref_code,
                    "onUpdate:modelValue": ($event) => unref(form).ref_code = $event,
                    type: "text",
                    placeholder: "Contoh: REF-XXXXXXXX",
                    class: ["pl-10", { "border-destructive": unref(form).errors.ref_code }],
                    autocomplete: "off",
                    disabled: isReferralLocked.value,
                    readonly: isReferralLocked.value
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  if (unref(form).errors.ref_code) {
                    _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(unref(form).errors.ref_code)}</p>`);
                  } else if (isReferralLocked.value) {
                    _push3(`<p class="text-xs text-muted-foreground"${_scopeId2}> Kode referral diisi otomatis dari link dan tidak dapat diubah. Jika salah, silakan daftar tanpa referral. </p>`);
                  } else {
                    _push3(`<p class="text-xs text-muted-foreground"${_scopeId2}> Masukkan kode referral dari sponsor yang mengajak Anda (jika ada) </p>`);
                  }
                  if (isReferralLocked.value) {
                    _push3(ssrRenderComponent(unref(Link), {
                      href: "/client/register",
                      class: "inline-flex text-xs font-medium text-primary hover:underline"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Daftar tanpa referral `);
                        } else {
                          return [
                            createTextVNode(" Daftar tanpa referral ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$9), { for: "password" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Password <span class="text-destructive"${_scopeId3}>*</span>`);
                      } else {
                        return [
                          createTextVNode("Password "),
                          createVNode("span", { class: "text-destructive" }, "*")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="relative"${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute top-3 left-3 h-4 w-4 text-muted-foreground"${_scopeId2}><rect width="18" height="11" x="3" y="11" rx="2" ry="2"${_scopeId2}></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"${_scopeId2}></path></svg>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$a), {
                    id: "password",
                    modelValue: unref(form).password,
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    type: showPassword.value ? "text" : "password",
                    placeholder: "Minimal 8 karakter",
                    class: ["pr-10 pl-10", { "border-destructive": unref(form).errors.password }],
                    required: "",
                    autocomplete: "new-password"
                  }, null, _parent3, _scopeId2));
                  _push3(`<button type="button" class="absolute top-3 right-3 text-muted-foreground hover:text-foreground"${_scopeId2}>`);
                  if (!showPassword.value) {
                    _push3(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"${_scopeId2}><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"${_scopeId2}></path><circle cx="12" cy="12" r="3"${_scopeId2}></circle></svg>`);
                  } else {
                    _push3(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"${_scopeId2}><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"${_scopeId2}></path><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"${_scopeId2}></path><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"${_scopeId2}></path><path d="m2 2 20 20"${_scopeId2}></path></svg>`);
                  }
                  _push3(`</button></div>`);
                  if (unref(form).errors.password) {
                    _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(unref(form).errors.password)}</p>`);
                  } else {
                    _push3(`<p class="text-xs text-muted-foreground"${_scopeId2}> Password minimal 8 karakter, gunakan kombinasi huruf dan angka </p>`);
                  }
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$9), { for: "password_confirmation" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Konfirmasi Password <span class="text-destructive"${_scopeId3}>*</span>`);
                      } else {
                        return [
                          createTextVNode("Konfirmasi Password "),
                          createVNode("span", { class: "text-destructive" }, "*")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="relative"${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute top-3 left-3 h-4 w-4 text-muted-foreground"${_scopeId2}><rect width="18" height="11" x="3" y="11" rx="2" ry="2"${_scopeId2}></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"${_scopeId2}></path></svg>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$a), {
                    id: "password_confirmation",
                    modelValue: unref(form).password_confirmation,
                    "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                    type: showPasswordConfirmation.value ? "text" : "password",
                    placeholder: "Ulangi password",
                    class: ["pr-10 pl-10", { "border-destructive": unref(form).errors.password_confirmation }],
                    required: "",
                    autocomplete: "new-password"
                  }, null, _parent3, _scopeId2));
                  _push3(`<button type="button" class="absolute top-3 right-3 text-muted-foreground hover:text-foreground"${_scopeId2}>`);
                  if (!showPasswordConfirmation.value) {
                    _push3(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"${_scopeId2}><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"${_scopeId2}></path><circle cx="12" cy="12" r="3"${_scopeId2}></circle></svg>`);
                  } else {
                    _push3(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"${_scopeId2}><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"${_scopeId2}></path><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"${_scopeId2}></path><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"${_scopeId2}></path><path d="m2 2 20 20"${_scopeId2}></path></svg>`);
                  }
                  _push3(`</button></div>`);
                  if (unref(form).errors.password_confirmation) {
                    _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(unref(form).errors.password_confirmation)}</p>`);
                  } else {
                    _push3(`<p class="text-xs text-muted-foreground"${_scopeId2}> Ketik ulang password yang sama untuk konfirmasi </p>`);
                  }
                  _push3(`</div><p class="text-xs text-muted-foreground"${_scopeId2}> Dengan mendaftar, Anda menyetujui `);
                  _push3(ssrRenderComponent(unref(Link), {
                    href: "/terms",
                    class: "text-primary hover:underline"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Syarat &amp; Ketentuan`);
                      } else {
                        return [
                          createTextVNode("Syarat & Ketentuan")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(` dan `);
                  _push3(ssrRenderComponent(unref(Link), {
                    href: "/privacy",
                    class: "text-primary hover:underline"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Kebijakan Privasi`);
                      } else {
                        return [
                          createTextVNode("Kebijakan Privasi")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(` kami. </p>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$h), {
                    type: "submit",
                    class: "w-full",
                    disabled: unref(form).processing
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (unref(form).processing) {
                          _push4(`<!--[--><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-4 w-4 animate-spin"${_scopeId3}><path d="M21 12a9 9 0 1 1-6.219-8.56"${_scopeId3}></path></svg> Memproses... <!--]-->`);
                        } else {
                          _push4(`<span${_scopeId3}>Daftar Sekarang</span>`);
                        }
                      } else {
                        return [
                          unref(form).processing ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              width: "16",
                              height: "16",
                              viewBox: "0 0 24 24",
                              fill: "none",
                              stroke: "currentColor",
                              "stroke-width": "2",
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              class: "mr-2 h-4 w-4 animate-spin"
                            }, [
                              createVNode("path", { d: "M21 12a9 9 0 1 1-6.219-8.56" })
                            ])),
                            createTextVNode(" Memproses... ")
                          ], 64)) : (openBlock(), createBlock("span", { key: 1 }, "Daftar Sekarang"))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</form><div class="relative my-6"${_scopeId2}><div class="absolute inset-0 flex items-center"${_scopeId2}><span class="w-full border-t"${_scopeId2}></span></div><div class="relative flex justify-center text-xs uppercase"${_scopeId2}><span class="bg-background px-2 text-muted-foreground"${_scopeId2}>Atau</span></div></div><div class="text-center text-sm"${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Sudah punya akun? </span>`);
                  _push3(ssrRenderComponent(unref(Link), {
                    href: "/client/login",
                    class: "font-medium text-primary hover:underline"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Masuk`);
                      } else {
                        return [
                          createTextVNode("Masuk")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("form", {
                      onSubmit: withModifiers(submit, ["prevent"]),
                      class: "space-y-4"
                    }, [
                      flashSuccess.value ? (openBlock(), createBlock(unref(_sfc_main$6), {
                        key: 0,
                        variant: "default"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "16",
                            height: "16",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            "stroke-width": "2",
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            class: "h-4 w-4"
                          }, [
                            createVNode("circle", {
                              cx: "12",
                              cy: "12",
                              r: "10"
                            }),
                            createVNode("path", { d: "m9 12 2 2 4-4" })
                          ])),
                          createVNode(unref(_sfc_main$7), null, {
                            default: withCtx(() => [
                              createTextVNode("Berhasil!")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(flashSuccess.value), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$9), { for: "name" }, {
                          default: withCtx(() => [
                            createTextVNode("Nama Lengkap "),
                            createVNode("span", { class: "text-destructive" }, "*")
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "relative" }, [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "16",
                            height: "16",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            "stroke-width": "2",
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            class: "absolute top-3 left-3 h-4 w-4 text-muted-foreground"
                          }, [
                            createVNode("path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }),
                            createVNode("circle", {
                              cx: "12",
                              cy: "7",
                              r: "4"
                            })
                          ])),
                          createVNode(unref(_sfc_main$a), {
                            id: "name",
                            modelValue: unref(form).name,
                            "onUpdate:modelValue": ($event) => unref(form).name = $event,
                            type: "text",
                            placeholder: "Masukkan nama lengkap",
                            class: ["pl-10", { "border-destructive": unref(form).errors.name }],
                            required: "",
                            autofocus: "",
                            autocomplete: "name"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "class"])
                        ]),
                        unref(form).errors.name ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-destructive"
                        }, toDisplayString(unref(form).errors.name), 1)) : (openBlock(), createBlock("p", {
                          key: 1,
                          class: "text-xs text-muted-foreground"
                        }, " Nama lengkap sesuai identitas, maksimal 255 karakter "))
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$9), { for: "username" }, {
                          default: withCtx(() => [
                            createTextVNode("Username "),
                            createVNode("span", { class: "text-destructive" }, "*")
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "relative" }, [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "16",
                            height: "16",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            "stroke-width": "2",
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            class: "absolute top-3 left-3 h-4 w-4 text-muted-foreground"
                          }, [
                            createVNode("circle", {
                              cx: "12",
                              cy: "12",
                              r: "4"
                            }),
                            createVNode("path", { d: "M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" })
                          ])),
                          createVNode(unref(_sfc_main$a), {
                            id: "username",
                            modelValue: unref(form).username,
                            "onUpdate:modelValue": ($event) => unref(form).username = $event,
                            type: "text",
                            placeholder: "contoh: puranusa123",
                            class: ["pl-10", { "border-destructive": unref(form).errors.username }],
                            required: "",
                            autocomplete: "username"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "class"])
                        ]),
                        unref(form).errors.username ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-destructive"
                        }, toDisplayString(unref(form).errors.username), 1)) : (openBlock(), createBlock("p", {
                          key: 1,
                          class: "text-xs text-muted-foreground"
                        }, " Username untuk login, hanya boleh huruf, angka, dash (-), dan underscore (_). Maksimal 100 karakter "))
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$9), { for: "email" }, {
                          default: withCtx(() => [
                            createTextVNode("Email "),
                            createVNode("span", { class: "text-destructive" }, "*")
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "relative" }, [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "16",
                            height: "16",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            "stroke-width": "2",
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            class: "absolute top-3 left-3 h-4 w-4 text-muted-foreground"
                          }, [
                            createVNode("rect", {
                              width: "20",
                              height: "16",
                              x: "2",
                              y: "4",
                              rx: "2"
                            }),
                            createVNode("path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" })
                          ])),
                          createVNode(unref(_sfc_main$a), {
                            id: "email",
                            modelValue: unref(form).email,
                            "onUpdate:modelValue": ($event) => unref(form).email = $event,
                            type: "email",
                            placeholder: "nama@email.com",
                            class: ["pl-10", { "border-destructive": unref(form).errors.email }],
                            required: "",
                            autocomplete: "email"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "class"])
                        ]),
                        unref(form).errors.email ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-destructive"
                        }, toDisplayString(unref(form).errors.email), 1)) : (openBlock(), createBlock("p", {
                          key: 1,
                          class: "text-xs text-muted-foreground"
                        }, " Email aktif untuk menerima notifikasi dan informasi akun "))
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$9), { for: "phone" }, {
                          default: withCtx(() => [
                            createTextVNode("Nomor Telepon "),
                            createVNode("span", { class: "text-destructive" }, "*")
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "relative" }, [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "16",
                            height: "16",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            "stroke-width": "2",
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            class: "absolute top-3 left-3 h-4 w-4 text-muted-foreground"
                          }, [
                            createVNode("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" })
                          ])),
                          createVNode(unref(_sfc_main$a), {
                            id: "phone",
                            modelValue: unref(form).phone,
                            "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                            type: "tel",
                            placeholder: "08xxxxxxxxxx",
                            class: ["pl-10", { "border-destructive": unref(form).errors.phone }],
                            required: "",
                            autocomplete: "tel"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "class"])
                        ]),
                        unref(form).errors.phone ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-destructive"
                        }, toDisplayString(unref(form).errors.phone), 1)) : (openBlock(), createBlock("p", {
                          key: 1,
                          class: "text-xs text-muted-foreground"
                        }, " Nomor telepon aktif (WhatsApp), maksimal 20 karakter "))
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$9), { for: "nik" }, {
                          default: withCtx(() => [
                            createTextVNode("NIK (Opsional)")
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "relative" }, [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "16",
                            height: "16",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            "stroke-width": "2",
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            class: "absolute top-3 left-3 h-4 w-4 text-muted-foreground"
                          }, [
                            createVNode("rect", {
                              width: "20",
                              height: "14",
                              x: "2",
                              y: "5",
                              rx: "2"
                            }),
                            createVNode("line", {
                              x1: "2",
                              x2: "22",
                              y1: "10",
                              y2: "10"
                            })
                          ])),
                          createVNode(unref(_sfc_main$a), {
                            id: "nik",
                            modelValue: unref(form).nik,
                            "onUpdate:modelValue": ($event) => unref(form).nik = $event,
                            type: "text",
                            inputmode: "numeric",
                            placeholder: "Contoh: 3201234567890001",
                            class: ["pl-10", { "border-destructive": unref(form).errors.nik }],
                            autocomplete: "off",
                            maxlength: "32"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "class"])
                        ]),
                        unref(form).errors.nik ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-destructive"
                        }, toDisplayString(unref(form).errors.nik), 1)) : (openBlock(), createBlock("p", {
                          key: 1,
                          class: "text-xs text-muted-foreground"
                        }, " Nomor Induk Kependudukan (8-32 digit angka) "))
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$9), { for: "gender" }, {
                          default: withCtx(() => [
                            createTextVNode("Jenis Kelamin (Opsional)")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$b), {
                          modelValue: unref(form).gender,
                          "onUpdate:modelValue": ($event) => unref(form).gender = $event
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$c), {
                              class: { "border-destructive": unref(form).errors.gender }
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$d), { placeholder: "Pilih jenis kelamin" })
                              ]),
                              _: 1
                            }, 8, ["class"]),
                            createVNode(unref(_sfc_main$e), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$f), { value: "L" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Laki-laki")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$f), { value: "P" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Perempuan")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"]),
                        unref(form).errors.gender ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-destructive"
                        }, toDisplayString(unref(form).errors.gender), 1)) : (openBlock(), createBlock("p", {
                          key: 1,
                          class: "text-xs text-muted-foreground"
                        }, " Pilih jenis kelamin Anda "))
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$9), { for: "alamat" }, {
                          default: withCtx(() => [
                            createTextVNode("Alamat (Opsional)")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$g), {
                          id: "alamat",
                          modelValue: unref(form).alamat,
                          "onUpdate:modelValue": ($event) => unref(form).alamat = $event,
                          placeholder: "Tulis alamat lengkap (jalan, RT/RW, kelurahan, kecamatan, kota)",
                          class: { "border-destructive": unref(form).errors.alamat },
                          rows: "3"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                        unref(form).errors.alamat ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-destructive"
                        }, toDisplayString(unref(form).errors.alamat), 1)) : (openBlock(), createBlock("p", {
                          key: 1,
                          class: "text-xs text-muted-foreground"
                        }, " Alamat lengkap untuk keperluan pengiriman "))
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$9), { for: "ref_code" }, {
                          default: withCtx(() => [
                            createTextVNode("Kode Referral (Opsional)")
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "relative" }, [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "16",
                            height: "16",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            "stroke-width": "2",
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            class: "absolute top-3 left-3 h-4 w-4 text-muted-foreground"
                          }, [
                            createVNode("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
                            createVNode("circle", {
                              cx: "9",
                              cy: "7",
                              r: "4"
                            }),
                            createVNode("path", { d: "M22 21v-2a4 4 0 0 0-3-3.87" }),
                            createVNode("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" })
                          ])),
                          createVNode(unref(_sfc_main$a), {
                            id: "ref_code",
                            modelValue: unref(form).ref_code,
                            "onUpdate:modelValue": ($event) => unref(form).ref_code = $event,
                            type: "text",
                            placeholder: "Contoh: REF-XXXXXXXX",
                            class: ["pl-10", { "border-destructive": unref(form).errors.ref_code }],
                            autocomplete: "off",
                            disabled: isReferralLocked.value,
                            readonly: isReferralLocked.value
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "class", "disabled", "readonly"])
                        ]),
                        unref(form).errors.ref_code ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-destructive"
                        }, toDisplayString(unref(form).errors.ref_code), 1)) : isReferralLocked.value ? (openBlock(), createBlock("p", {
                          key: 1,
                          class: "text-xs text-muted-foreground"
                        }, " Kode referral diisi otomatis dari link dan tidak dapat diubah. Jika salah, silakan daftar tanpa referral. ")) : (openBlock(), createBlock("p", {
                          key: 2,
                          class: "text-xs text-muted-foreground"
                        }, " Masukkan kode referral dari sponsor yang mengajak Anda (jika ada) ")),
                        isReferralLocked.value ? (openBlock(), createBlock(unref(Link), {
                          key: 3,
                          href: "/client/register",
                          class: "inline-flex text-xs font-medium text-primary hover:underline"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Daftar tanpa referral ")
                          ]),
                          _: 1
                        })) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$9), { for: "password" }, {
                          default: withCtx(() => [
                            createTextVNode("Password "),
                            createVNode("span", { class: "text-destructive" }, "*")
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "relative" }, [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "16",
                            height: "16",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            "stroke-width": "2",
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            class: "absolute top-3 left-3 h-4 w-4 text-muted-foreground"
                          }, [
                            createVNode("rect", {
                              width: "18",
                              height: "11",
                              x: "3",
                              y: "11",
                              rx: "2",
                              ry: "2"
                            }),
                            createVNode("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })
                          ])),
                          createVNode(unref(_sfc_main$a), {
                            id: "password",
                            modelValue: unref(form).password,
                            "onUpdate:modelValue": ($event) => unref(form).password = $event,
                            type: showPassword.value ? "text" : "password",
                            placeholder: "Minimal 8 karakter",
                            class: ["pr-10 pl-10", { "border-destructive": unref(form).errors.password }],
                            required: "",
                            autocomplete: "new-password"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "type", "class"]),
                          createVNode("button", {
                            type: "button",
                            onClick: ($event) => showPassword.value = !showPassword.value,
                            class: "absolute top-3 right-3 text-muted-foreground hover:text-foreground"
                          }, [
                            !showPassword.value ? (openBlock(), createBlock("svg", {
                              key: 0,
                              xmlns: "http://www.w3.org/2000/svg",
                              width: "16",
                              height: "16",
                              viewBox: "0 0 24 24",
                              fill: "none",
                              stroke: "currentColor",
                              "stroke-width": "2",
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              class: "h-4 w-4"
                            }, [
                              createVNode("path", { d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" }),
                              createVNode("circle", {
                                cx: "12",
                                cy: "12",
                                r: "3"
                              })
                            ])) : (openBlock(), createBlock("svg", {
                              key: 1,
                              xmlns: "http://www.w3.org/2000/svg",
                              width: "16",
                              height: "16",
                              viewBox: "0 0 24 24",
                              fill: "none",
                              stroke: "currentColor",
                              "stroke-width": "2",
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              class: "h-4 w-4"
                            }, [
                              createVNode("path", { d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" }),
                              createVNode("path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242" }),
                              createVNode("path", { d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" }),
                              createVNode("path", { d: "m2 2 20 20" })
                            ]))
                          ], 8, ["onClick"])
                        ]),
                        unref(form).errors.password ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-destructive"
                        }, toDisplayString(unref(form).errors.password), 1)) : (openBlock(), createBlock("p", {
                          key: 1,
                          class: "text-xs text-muted-foreground"
                        }, " Password minimal 8 karakter, gunakan kombinasi huruf dan angka "))
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$9), { for: "password_confirmation" }, {
                          default: withCtx(() => [
                            createTextVNode("Konfirmasi Password "),
                            createVNode("span", { class: "text-destructive" }, "*")
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "relative" }, [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "16",
                            height: "16",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            "stroke-width": "2",
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            class: "absolute top-3 left-3 h-4 w-4 text-muted-foreground"
                          }, [
                            createVNode("rect", {
                              width: "18",
                              height: "11",
                              x: "3",
                              y: "11",
                              rx: "2",
                              ry: "2"
                            }),
                            createVNode("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })
                          ])),
                          createVNode(unref(_sfc_main$a), {
                            id: "password_confirmation",
                            modelValue: unref(form).password_confirmation,
                            "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                            type: showPasswordConfirmation.value ? "text" : "password",
                            placeholder: "Ulangi password",
                            class: ["pr-10 pl-10", { "border-destructive": unref(form).errors.password_confirmation }],
                            required: "",
                            autocomplete: "new-password"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "type", "class"]),
                          createVNode("button", {
                            type: "button",
                            onClick: ($event) => showPasswordConfirmation.value = !showPasswordConfirmation.value,
                            class: "absolute top-3 right-3 text-muted-foreground hover:text-foreground"
                          }, [
                            !showPasswordConfirmation.value ? (openBlock(), createBlock("svg", {
                              key: 0,
                              xmlns: "http://www.w3.org/2000/svg",
                              width: "16",
                              height: "16",
                              viewBox: "0 0 24 24",
                              fill: "none",
                              stroke: "currentColor",
                              "stroke-width": "2",
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              class: "h-4 w-4"
                            }, [
                              createVNode("path", { d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" }),
                              createVNode("circle", {
                                cx: "12",
                                cy: "12",
                                r: "3"
                              })
                            ])) : (openBlock(), createBlock("svg", {
                              key: 1,
                              xmlns: "http://www.w3.org/2000/svg",
                              width: "16",
                              height: "16",
                              viewBox: "0 0 24 24",
                              fill: "none",
                              stroke: "currentColor",
                              "stroke-width": "2",
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              class: "h-4 w-4"
                            }, [
                              createVNode("path", { d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" }),
                              createVNode("path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242" }),
                              createVNode("path", { d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" }),
                              createVNode("path", { d: "m2 2 20 20" })
                            ]))
                          ], 8, ["onClick"])
                        ]),
                        unref(form).errors.password_confirmation ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-destructive"
                        }, toDisplayString(unref(form).errors.password_confirmation), 1)) : (openBlock(), createBlock("p", {
                          key: 1,
                          class: "text-xs text-muted-foreground"
                        }, " Ketik ulang password yang sama untuk konfirmasi "))
                      ]),
                      createVNode("p", { class: "text-xs text-muted-foreground" }, [
                        createTextVNode(" Dengan mendaftar, Anda menyetujui "),
                        createVNode(unref(Link), {
                          href: "/terms",
                          class: "text-primary hover:underline"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Syarat & Ketentuan")
                          ]),
                          _: 1
                        }),
                        createTextVNode(" dan "),
                        createVNode(unref(Link), {
                          href: "/privacy",
                          class: "text-primary hover:underline"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Kebijakan Privasi")
                          ]),
                          _: 1
                        }),
                        createTextVNode(" kami. ")
                      ]),
                      createVNode(unref(_sfc_main$h), {
                        type: "submit",
                        class: "w-full",
                        disabled: unref(form).processing
                      }, {
                        default: withCtx(() => [
                          unref(form).processing ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              width: "16",
                              height: "16",
                              viewBox: "0 0 24 24",
                              fill: "none",
                              stroke: "currentColor",
                              "stroke-width": "2",
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              class: "mr-2 h-4 w-4 animate-spin"
                            }, [
                              createVNode("path", { d: "M21 12a9 9 0 1 1-6.219-8.56" })
                            ])),
                            createTextVNode(" Memproses... ")
                          ], 64)) : (openBlock(), createBlock("span", { key: 1 }, "Daftar Sekarang"))
                        ]),
                        _: 1
                      }, 8, ["disabled"])
                    ], 32),
                    createVNode("div", { class: "relative my-6" }, [
                      createVNode("div", { class: "absolute inset-0 flex items-center" }, [
                        createVNode("span", { class: "w-full border-t" })
                      ]),
                      createVNode("div", { class: "relative flex justify-center text-xs uppercase" }, [
                        createVNode("span", { class: "bg-background px-2 text-muted-foreground" }, "Atau")
                      ])
                    ]),
                    createVNode("div", { class: "text-center text-sm" }, [
                      createVNode("span", { class: "text-muted-foreground" }, "Sudah punya akun? "),
                      createVNode(unref(Link), {
                        href: "/client/login",
                        class: "font-medium text-primary hover:underline"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Masuk")
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), { class: "space-y-1" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), { class: "text-2xl font-bold" }, {
                    default: withCtx(() => [
                      createTextVNode("Buat Akun Baru")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createTextVNode("Isi formulir di bawah untuk mendaftar")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), null, {
                default: withCtx(() => [
                  createVNode("form", {
                    onSubmit: withModifiers(submit, ["prevent"]),
                    class: "space-y-4"
                  }, [
                    flashSuccess.value ? (openBlock(), createBlock(unref(_sfc_main$6), {
                      key: 0,
                      variant: "default"
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          width: "16",
                          height: "16",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          stroke: "currentColor",
                          "stroke-width": "2",
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          class: "h-4 w-4"
                        }, [
                          createVNode("circle", {
                            cx: "12",
                            cy: "12",
                            r: "10"
                          }),
                          createVNode("path", { d: "m9 12 2 2 4-4" })
                        ])),
                        createVNode(unref(_sfc_main$7), null, {
                          default: withCtx(() => [
                            createTextVNode("Berhasil!")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(flashSuccess.value), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$9), { for: "name" }, {
                        default: withCtx(() => [
                          createTextVNode("Nama Lengkap "),
                          createVNode("span", { class: "text-destructive" }, "*")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "relative" }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          width: "16",
                          height: "16",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          stroke: "currentColor",
                          "stroke-width": "2",
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          class: "absolute top-3 left-3 h-4 w-4 text-muted-foreground"
                        }, [
                          createVNode("path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }),
                          createVNode("circle", {
                            cx: "12",
                            cy: "7",
                            r: "4"
                          })
                        ])),
                        createVNode(unref(_sfc_main$a), {
                          id: "name",
                          modelValue: unref(form).name,
                          "onUpdate:modelValue": ($event) => unref(form).name = $event,
                          type: "text",
                          placeholder: "Masukkan nama lengkap",
                          class: ["pl-10", { "border-destructive": unref(form).errors.name }],
                          required: "",
                          autofocus: "",
                          autocomplete: "name"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "class"])
                      ]),
                      unref(form).errors.name ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-destructive"
                      }, toDisplayString(unref(form).errors.name), 1)) : (openBlock(), createBlock("p", {
                        key: 1,
                        class: "text-xs text-muted-foreground"
                      }, " Nama lengkap sesuai identitas, maksimal 255 karakter "))
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$9), { for: "username" }, {
                        default: withCtx(() => [
                          createTextVNode("Username "),
                          createVNode("span", { class: "text-destructive" }, "*")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "relative" }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          width: "16",
                          height: "16",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          stroke: "currentColor",
                          "stroke-width": "2",
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          class: "absolute top-3 left-3 h-4 w-4 text-muted-foreground"
                        }, [
                          createVNode("circle", {
                            cx: "12",
                            cy: "12",
                            r: "4"
                          }),
                          createVNode("path", { d: "M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" })
                        ])),
                        createVNode(unref(_sfc_main$a), {
                          id: "username",
                          modelValue: unref(form).username,
                          "onUpdate:modelValue": ($event) => unref(form).username = $event,
                          type: "text",
                          placeholder: "contoh: puranusa123",
                          class: ["pl-10", { "border-destructive": unref(form).errors.username }],
                          required: "",
                          autocomplete: "username"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "class"])
                      ]),
                      unref(form).errors.username ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-destructive"
                      }, toDisplayString(unref(form).errors.username), 1)) : (openBlock(), createBlock("p", {
                        key: 1,
                        class: "text-xs text-muted-foreground"
                      }, " Username untuk login, hanya boleh huruf, angka, dash (-), dan underscore (_). Maksimal 100 karakter "))
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$9), { for: "email" }, {
                        default: withCtx(() => [
                          createTextVNode("Email "),
                          createVNode("span", { class: "text-destructive" }, "*")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "relative" }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          width: "16",
                          height: "16",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          stroke: "currentColor",
                          "stroke-width": "2",
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          class: "absolute top-3 left-3 h-4 w-4 text-muted-foreground"
                        }, [
                          createVNode("rect", {
                            width: "20",
                            height: "16",
                            x: "2",
                            y: "4",
                            rx: "2"
                          }),
                          createVNode("path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" })
                        ])),
                        createVNode(unref(_sfc_main$a), {
                          id: "email",
                          modelValue: unref(form).email,
                          "onUpdate:modelValue": ($event) => unref(form).email = $event,
                          type: "email",
                          placeholder: "nama@email.com",
                          class: ["pl-10", { "border-destructive": unref(form).errors.email }],
                          required: "",
                          autocomplete: "email"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "class"])
                      ]),
                      unref(form).errors.email ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-destructive"
                      }, toDisplayString(unref(form).errors.email), 1)) : (openBlock(), createBlock("p", {
                        key: 1,
                        class: "text-xs text-muted-foreground"
                      }, " Email aktif untuk menerima notifikasi dan informasi akun "))
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$9), { for: "phone" }, {
                        default: withCtx(() => [
                          createTextVNode("Nomor Telepon "),
                          createVNode("span", { class: "text-destructive" }, "*")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "relative" }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          width: "16",
                          height: "16",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          stroke: "currentColor",
                          "stroke-width": "2",
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          class: "absolute top-3 left-3 h-4 w-4 text-muted-foreground"
                        }, [
                          createVNode("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" })
                        ])),
                        createVNode(unref(_sfc_main$a), {
                          id: "phone",
                          modelValue: unref(form).phone,
                          "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                          type: "tel",
                          placeholder: "08xxxxxxxxxx",
                          class: ["pl-10", { "border-destructive": unref(form).errors.phone }],
                          required: "",
                          autocomplete: "tel"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "class"])
                      ]),
                      unref(form).errors.phone ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-destructive"
                      }, toDisplayString(unref(form).errors.phone), 1)) : (openBlock(), createBlock("p", {
                        key: 1,
                        class: "text-xs text-muted-foreground"
                      }, " Nomor telepon aktif (WhatsApp), maksimal 20 karakter "))
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$9), { for: "nik" }, {
                        default: withCtx(() => [
                          createTextVNode("NIK (Opsional)")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "relative" }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          width: "16",
                          height: "16",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          stroke: "currentColor",
                          "stroke-width": "2",
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          class: "absolute top-3 left-3 h-4 w-4 text-muted-foreground"
                        }, [
                          createVNode("rect", {
                            width: "20",
                            height: "14",
                            x: "2",
                            y: "5",
                            rx: "2"
                          }),
                          createVNode("line", {
                            x1: "2",
                            x2: "22",
                            y1: "10",
                            y2: "10"
                          })
                        ])),
                        createVNode(unref(_sfc_main$a), {
                          id: "nik",
                          modelValue: unref(form).nik,
                          "onUpdate:modelValue": ($event) => unref(form).nik = $event,
                          type: "text",
                          inputmode: "numeric",
                          placeholder: "Contoh: 3201234567890001",
                          class: ["pl-10", { "border-destructive": unref(form).errors.nik }],
                          autocomplete: "off",
                          maxlength: "32"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "class"])
                      ]),
                      unref(form).errors.nik ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-destructive"
                      }, toDisplayString(unref(form).errors.nik), 1)) : (openBlock(), createBlock("p", {
                        key: 1,
                        class: "text-xs text-muted-foreground"
                      }, " Nomor Induk Kependudukan (8-32 digit angka) "))
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$9), { for: "gender" }, {
                        default: withCtx(() => [
                          createTextVNode("Jenis Kelamin (Opsional)")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$b), {
                        modelValue: unref(form).gender,
                        "onUpdate:modelValue": ($event) => unref(form).gender = $event
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$c), {
                            class: { "border-destructive": unref(form).errors.gender }
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$d), { placeholder: "Pilih jenis kelamin" })
                            ]),
                            _: 1
                          }, 8, ["class"]),
                          createVNode(unref(_sfc_main$e), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$f), { value: "L" }, {
                                default: withCtx(() => [
                                  createTextVNode("Laki-laki")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$f), { value: "P" }, {
                                default: withCtx(() => [
                                  createTextVNode("Perempuan")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"]),
                      unref(form).errors.gender ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-destructive"
                      }, toDisplayString(unref(form).errors.gender), 1)) : (openBlock(), createBlock("p", {
                        key: 1,
                        class: "text-xs text-muted-foreground"
                      }, " Pilih jenis kelamin Anda "))
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$9), { for: "alamat" }, {
                        default: withCtx(() => [
                          createTextVNode("Alamat (Opsional)")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$g), {
                        id: "alamat",
                        modelValue: unref(form).alamat,
                        "onUpdate:modelValue": ($event) => unref(form).alamat = $event,
                        placeholder: "Tulis alamat lengkap (jalan, RT/RW, kelurahan, kecamatan, kota)",
                        class: { "border-destructive": unref(form).errors.alamat },
                        rows: "3"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                      unref(form).errors.alamat ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-destructive"
                      }, toDisplayString(unref(form).errors.alamat), 1)) : (openBlock(), createBlock("p", {
                        key: 1,
                        class: "text-xs text-muted-foreground"
                      }, " Alamat lengkap untuk keperluan pengiriman "))
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$9), { for: "ref_code" }, {
                        default: withCtx(() => [
                          createTextVNode("Kode Referral (Opsional)")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "relative" }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          width: "16",
                          height: "16",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          stroke: "currentColor",
                          "stroke-width": "2",
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          class: "absolute top-3 left-3 h-4 w-4 text-muted-foreground"
                        }, [
                          createVNode("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
                          createVNode("circle", {
                            cx: "9",
                            cy: "7",
                            r: "4"
                          }),
                          createVNode("path", { d: "M22 21v-2a4 4 0 0 0-3-3.87" }),
                          createVNode("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" })
                        ])),
                        createVNode(unref(_sfc_main$a), {
                          id: "ref_code",
                          modelValue: unref(form).ref_code,
                          "onUpdate:modelValue": ($event) => unref(form).ref_code = $event,
                          type: "text",
                          placeholder: "Contoh: REF-XXXXXXXX",
                          class: ["pl-10", { "border-destructive": unref(form).errors.ref_code }],
                          autocomplete: "off",
                          disabled: isReferralLocked.value,
                          readonly: isReferralLocked.value
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "class", "disabled", "readonly"])
                      ]),
                      unref(form).errors.ref_code ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-destructive"
                      }, toDisplayString(unref(form).errors.ref_code), 1)) : isReferralLocked.value ? (openBlock(), createBlock("p", {
                        key: 1,
                        class: "text-xs text-muted-foreground"
                      }, " Kode referral diisi otomatis dari link dan tidak dapat diubah. Jika salah, silakan daftar tanpa referral. ")) : (openBlock(), createBlock("p", {
                        key: 2,
                        class: "text-xs text-muted-foreground"
                      }, " Masukkan kode referral dari sponsor yang mengajak Anda (jika ada) ")),
                      isReferralLocked.value ? (openBlock(), createBlock(unref(Link), {
                        key: 3,
                        href: "/client/register",
                        class: "inline-flex text-xs font-medium text-primary hover:underline"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Daftar tanpa referral ")
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$9), { for: "password" }, {
                        default: withCtx(() => [
                          createTextVNode("Password "),
                          createVNode("span", { class: "text-destructive" }, "*")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "relative" }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          width: "16",
                          height: "16",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          stroke: "currentColor",
                          "stroke-width": "2",
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          class: "absolute top-3 left-3 h-4 w-4 text-muted-foreground"
                        }, [
                          createVNode("rect", {
                            width: "18",
                            height: "11",
                            x: "3",
                            y: "11",
                            rx: "2",
                            ry: "2"
                          }),
                          createVNode("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })
                        ])),
                        createVNode(unref(_sfc_main$a), {
                          id: "password",
                          modelValue: unref(form).password,
                          "onUpdate:modelValue": ($event) => unref(form).password = $event,
                          type: showPassword.value ? "text" : "password",
                          placeholder: "Minimal 8 karakter",
                          class: ["pr-10 pl-10", { "border-destructive": unref(form).errors.password }],
                          required: "",
                          autocomplete: "new-password"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "type", "class"]),
                        createVNode("button", {
                          type: "button",
                          onClick: ($event) => showPassword.value = !showPassword.value,
                          class: "absolute top-3 right-3 text-muted-foreground hover:text-foreground"
                        }, [
                          !showPassword.value ? (openBlock(), createBlock("svg", {
                            key: 0,
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "16",
                            height: "16",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            "stroke-width": "2",
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            class: "h-4 w-4"
                          }, [
                            createVNode("path", { d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" }),
                            createVNode("circle", {
                              cx: "12",
                              cy: "12",
                              r: "3"
                            })
                          ])) : (openBlock(), createBlock("svg", {
                            key: 1,
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "16",
                            height: "16",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            "stroke-width": "2",
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            class: "h-4 w-4"
                          }, [
                            createVNode("path", { d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" }),
                            createVNode("path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242" }),
                            createVNode("path", { d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" }),
                            createVNode("path", { d: "m2 2 20 20" })
                          ]))
                        ], 8, ["onClick"])
                      ]),
                      unref(form).errors.password ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-destructive"
                      }, toDisplayString(unref(form).errors.password), 1)) : (openBlock(), createBlock("p", {
                        key: 1,
                        class: "text-xs text-muted-foreground"
                      }, " Password minimal 8 karakter, gunakan kombinasi huruf dan angka "))
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$9), { for: "password_confirmation" }, {
                        default: withCtx(() => [
                          createTextVNode("Konfirmasi Password "),
                          createVNode("span", { class: "text-destructive" }, "*")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "relative" }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          width: "16",
                          height: "16",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          stroke: "currentColor",
                          "stroke-width": "2",
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          class: "absolute top-3 left-3 h-4 w-4 text-muted-foreground"
                        }, [
                          createVNode("rect", {
                            width: "18",
                            height: "11",
                            x: "3",
                            y: "11",
                            rx: "2",
                            ry: "2"
                          }),
                          createVNode("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })
                        ])),
                        createVNode(unref(_sfc_main$a), {
                          id: "password_confirmation",
                          modelValue: unref(form).password_confirmation,
                          "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                          type: showPasswordConfirmation.value ? "text" : "password",
                          placeholder: "Ulangi password",
                          class: ["pr-10 pl-10", { "border-destructive": unref(form).errors.password_confirmation }],
                          required: "",
                          autocomplete: "new-password"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "type", "class"]),
                        createVNode("button", {
                          type: "button",
                          onClick: ($event) => showPasswordConfirmation.value = !showPasswordConfirmation.value,
                          class: "absolute top-3 right-3 text-muted-foreground hover:text-foreground"
                        }, [
                          !showPasswordConfirmation.value ? (openBlock(), createBlock("svg", {
                            key: 0,
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "16",
                            height: "16",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            "stroke-width": "2",
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            class: "h-4 w-4"
                          }, [
                            createVNode("path", { d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" }),
                            createVNode("circle", {
                              cx: "12",
                              cy: "12",
                              r: "3"
                            })
                          ])) : (openBlock(), createBlock("svg", {
                            key: 1,
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "16",
                            height: "16",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            "stroke-width": "2",
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            class: "h-4 w-4"
                          }, [
                            createVNode("path", { d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" }),
                            createVNode("path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242" }),
                            createVNode("path", { d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" }),
                            createVNode("path", { d: "m2 2 20 20" })
                          ]))
                        ], 8, ["onClick"])
                      ]),
                      unref(form).errors.password_confirmation ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-destructive"
                      }, toDisplayString(unref(form).errors.password_confirmation), 1)) : (openBlock(), createBlock("p", {
                        key: 1,
                        class: "text-xs text-muted-foreground"
                      }, " Ketik ulang password yang sama untuk konfirmasi "))
                    ]),
                    createVNode("p", { class: "text-xs text-muted-foreground" }, [
                      createTextVNode(" Dengan mendaftar, Anda menyetujui "),
                      createVNode(unref(Link), {
                        href: "/terms",
                        class: "text-primary hover:underline"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Syarat & Ketentuan")
                        ]),
                        _: 1
                      }),
                      createTextVNode(" dan "),
                      createVNode(unref(Link), {
                        href: "/privacy",
                        class: "text-primary hover:underline"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Kebijakan Privasi")
                        ]),
                        _: 1
                      }),
                      createTextVNode(" kami. ")
                    ]),
                    createVNode(unref(_sfc_main$h), {
                      type: "submit",
                      class: "w-full",
                      disabled: unref(form).processing
                    }, {
                      default: withCtx(() => [
                        unref(form).processing ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "16",
                            height: "16",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            "stroke-width": "2",
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            class: "mr-2 h-4 w-4 animate-spin"
                          }, [
                            createVNode("path", { d: "M21 12a9 9 0 1 1-6.219-8.56" })
                          ])),
                          createTextVNode(" Memproses... ")
                        ], 64)) : (openBlock(), createBlock("span", { key: 1 }, "Daftar Sekarang"))
                      ]),
                      _: 1
                    }, 8, ["disabled"])
                  ], 32),
                  createVNode("div", { class: "relative my-6" }, [
                    createVNode("div", { class: "absolute inset-0 flex items-center" }, [
                      createVNode("span", { class: "w-full border-t" })
                    ]),
                    createVNode("div", { class: "relative flex justify-center text-xs uppercase" }, [
                      createVNode("span", { class: "bg-background px-2 text-muted-foreground" }, "Atau")
                    ])
                  ]),
                  createVNode("div", { class: "text-center text-sm" }, [
                    createVNode("span", { class: "text-muted-foreground" }, "Sudah punya akun? "),
                    createVNode(unref(Link), {
                      href: "/client/login",
                      class: "font-medium text-primary hover:underline"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Masuk")
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="text-center">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "text-sm text-muted-foreground hover:text-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` ← Kembali ke Beranda `);
          } else {
            return [
              createTextVNode(" ← Kembali ke Beranda ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/ecommerce/auth/Register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
