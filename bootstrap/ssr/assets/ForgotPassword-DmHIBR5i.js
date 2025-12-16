import { defineComponent, unref, withCtx, createVNode, createTextVNode, createBlock, openBlock, createCommentVNode, toDisplayString, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$8 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, d as _sfc_main$4, c as _sfc_main$5 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$7 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$6 } from "./Label-16aMY2sx.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { ShoppingBag, Mail, ArrowLeft } from "lucide-vue-next";
import { toast } from "vue-sonner";
import "class-variance-authority";
import "reka-ui";
import "clsx";
import "tailwind-merge";
import "@vueuse/core";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ForgotPassword",
  __ssrInlineRender: true,
  props: {
    status: {}
  },
  setup(__props) {
    const form = useForm({
      email: ""
    });
    const submit = () => {
      form.post("/client/forgot-password", {
        onFinish: () => {
          form.reset("email");
          toast.success("Link reset password telah dikirim ke email Anda.");
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Lupa Password - Puranusa" }, null, _parent));
      _push(`<div class="min-h-screen grid lg:grid-cols-2"><div class="flex items-center justify-center p-8 bg-background"><div class="w-full max-w-md space-y-8"><div class="flex justify-center">`);
      _push(ssrRenderComponent(unref(Link), { href: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ShoppingBag), { class: "h-8 w-8 text-primary" }, null, _parent2, _scopeId));
            _push2(`<span class="text-2xl font-bold"${_scopeId}>Puranusa</span></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-2" }, [
                createVNode(unref(ShoppingBag), { class: "h-8 w-8 text-primary" }),
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
                        _push4(`Lupa Password?`);
                      } else {
                        return [
                          createTextVNode("Lupa Password?")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Masukkan email Anda dan kami akan mengirimkan link untuk mereset password `);
                      } else {
                        return [
                          createTextVNode(" Masukkan email Anda dan kami akan mengirimkan link untuk mereset password ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), { class: "text-2xl font-bold" }, {
                      default: withCtx(() => [
                        createTextVNode("Lupa Password?")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createTextVNode(" Masukkan email Anda dan kami akan mengirimkan link untuk mereset password ")
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
                  if (__props.status) {
                    _push3(`<div class="mb-4 p-4 rounded-md bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"${_scopeId2}><p class="text-sm text-green-800 dark:text-green-200"${_scopeId2}>${ssrInterpolate(__props.status)}</p></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<form class="space-y-4"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "email" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Email`);
                      } else {
                        return [
                          createTextVNode("Email")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="relative"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Mail), { class: "absolute left-3 top-3 h-4 w-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    id: "email",
                    modelValue: unref(form).email,
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    type: "email",
                    placeholder: "nama@email.com",
                    class: ["pl-10", { "border-destructive": unref(form).errors.email }],
                    required: "",
                    autofocus: "",
                    autocomplete: "email"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  if (unref(form).errors.email) {
                    _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(unref(form).errors.email)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$8), {
                    type: "submit",
                    class: "w-full",
                    disabled: unref(form).processing
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (unref(form).processing) {
                          _push4(`<span${_scopeId3}>Mengirim...</span>`);
                        } else {
                          _push4(`<span${_scopeId3}>Kirim Link Reset Password</span>`);
                        }
                      } else {
                        return [
                          unref(form).processing ? (openBlock(), createBlock("span", { key: 0 }, "Mengirim...")) : (openBlock(), createBlock("span", { key: 1 }, "Kirim Link Reset Password"))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</form><div class="relative my-6"${_scopeId2}><div class="absolute inset-0 flex items-center"${_scopeId2}><span class="w-full border-t"${_scopeId2}></span></div><div class="relative flex justify-center text-xs uppercase"${_scopeId2}><span class="bg-background px-2 text-muted-foreground"${_scopeId2}> Atau </span></div></div><div class="text-center"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Link), {
                    href: "/client/login",
                    class: "inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(ArrowLeft), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                        _push4(` Kembali ke Login `);
                      } else {
                        return [
                          createVNode(unref(ArrowLeft), { class: "h-4 w-4" }),
                          createTextVNode(" Kembali ke Login ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    __props.status ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "mb-4 p-4 rounded-md bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                    }, [
                      createVNode("p", { class: "text-sm text-green-800 dark:text-green-200" }, toDisplayString(__props.status), 1)
                    ])) : createCommentVNode("", true),
                    createVNode("form", {
                      onSubmit: withModifiers(submit, ["prevent"]),
                      class: "space-y-4"
                    }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$6), { for: "email" }, {
                          default: withCtx(() => [
                            createTextVNode("Email")
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "relative" }, [
                          createVNode(unref(Mail), { class: "absolute left-3 top-3 h-4 w-4 text-muted-foreground" }),
                          createVNode(unref(_sfc_main$7), {
                            id: "email",
                            modelValue: unref(form).email,
                            "onUpdate:modelValue": ($event) => unref(form).email = $event,
                            type: "email",
                            placeholder: "nama@email.com",
                            class: ["pl-10", { "border-destructive": unref(form).errors.email }],
                            required: "",
                            autofocus: "",
                            autocomplete: "email"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "class"])
                        ]),
                        unref(form).errors.email ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-destructive"
                        }, toDisplayString(unref(form).errors.email), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode(unref(_sfc_main$8), {
                        type: "submit",
                        class: "w-full",
                        disabled: unref(form).processing
                      }, {
                        default: withCtx(() => [
                          unref(form).processing ? (openBlock(), createBlock("span", { key: 0 }, "Mengirim...")) : (openBlock(), createBlock("span", { key: 1 }, "Kirim Link Reset Password"))
                        ]),
                        _: 1
                      }, 8, ["disabled"])
                    ], 32),
                    createVNode("div", { class: "relative my-6" }, [
                      createVNode("div", { class: "absolute inset-0 flex items-center" }, [
                        createVNode("span", { class: "w-full border-t" })
                      ]),
                      createVNode("div", { class: "relative flex justify-center text-xs uppercase" }, [
                        createVNode("span", { class: "bg-background px-2 text-muted-foreground" }, " Atau ")
                      ])
                    ]),
                    createVNode("div", { class: "text-center" }, [
                      createVNode(unref(Link), {
                        href: "/client/login",
                        class: "inline-flex items-center gap-2 text-sm text-primary hover:underline"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(ArrowLeft), { class: "h-4 w-4" }),
                          createTextVNode(" Kembali ke Login ")
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
                      createTextVNode("Lupa Password?")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createTextVNode(" Masukkan email Anda dan kami akan mengirimkan link untuk mereset password ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), null, {
                default: withCtx(() => [
                  __props.status ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mb-4 p-4 rounded-md bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                  }, [
                    createVNode("p", { class: "text-sm text-green-800 dark:text-green-200" }, toDisplayString(__props.status), 1)
                  ])) : createCommentVNode("", true),
                  createVNode("form", {
                    onSubmit: withModifiers(submit, ["prevent"]),
                    class: "space-y-4"
                  }, [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), { for: "email" }, {
                        default: withCtx(() => [
                          createTextVNode("Email")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "relative" }, [
                        createVNode(unref(Mail), { class: "absolute left-3 top-3 h-4 w-4 text-muted-foreground" }),
                        createVNode(unref(_sfc_main$7), {
                          id: "email",
                          modelValue: unref(form).email,
                          "onUpdate:modelValue": ($event) => unref(form).email = $event,
                          type: "email",
                          placeholder: "nama@email.com",
                          class: ["pl-10", { "border-destructive": unref(form).errors.email }],
                          required: "",
                          autofocus: "",
                          autocomplete: "email"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "class"])
                      ]),
                      unref(form).errors.email ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-destructive"
                      }, toDisplayString(unref(form).errors.email), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode(unref(_sfc_main$8), {
                      type: "submit",
                      class: "w-full",
                      disabled: unref(form).processing
                    }, {
                      default: withCtx(() => [
                        unref(form).processing ? (openBlock(), createBlock("span", { key: 0 }, "Mengirim...")) : (openBlock(), createBlock("span", { key: 1 }, "Kirim Link Reset Password"))
                      ]),
                      _: 1
                    }, 8, ["disabled"])
                  ], 32),
                  createVNode("div", { class: "relative my-6" }, [
                    createVNode("div", { class: "absolute inset-0 flex items-center" }, [
                      createVNode("span", { class: "w-full border-t" })
                    ]),
                    createVNode("div", { class: "relative flex justify-center text-xs uppercase" }, [
                      createVNode("span", { class: "bg-background px-2 text-muted-foreground" }, " Atau ")
                    ])
                  ]),
                  createVNode("div", { class: "text-center" }, [
                    createVNode(unref(Link), {
                      href: "/client/login",
                      class: "inline-flex items-center gap-2 text-sm text-primary hover:underline"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(ArrowLeft), { class: "h-4 w-4" }),
                        createTextVNode(" Kembali ke Login ")
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
      _push(`</div></div></div><div class="hidden lg:block relative bg-muted"><div class="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5"></div><div class="relative h-full flex flex-col items-center justify-center p-12 text-center"><div class="max-w-md space-y-6"><div class="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-8">`);
      _push(ssrRenderComponent(unref(Mail), { class: "h-10 w-10 text-primary" }, null, _parent));
      _push(`</div><h1 class="text-4xl font-bold tracking-tight"> Reset Password Mudah </h1><p class="text-lg text-muted-foreground"> Kami akan mengirimkan link reset password ke email Anda. Ikuti instruksi di email untuk membuat password baru. </p><div class="pt-8 space-y-4"><div class="flex items-center gap-3 text-left"><div class="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold"> 1 </div><p class="text-sm text-muted-foreground">Masukkan email Anda</p></div><div class="flex items-center gap-3 text-left"><div class="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold"> 2 </div><p class="text-sm text-muted-foreground">Cek inbox email Anda</p></div><div class="flex items-center gap-3 text-left"><div class="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold"> 3 </div><p class="text-sm text-muted-foreground">Klik link dan buat password baru</p></div></div></div></div><div class="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]"></div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/ecommerce/auth/ForgotPassword.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
