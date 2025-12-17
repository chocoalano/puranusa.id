import { defineComponent, ref, unref, withCtx, createVNode, createTextVNode, createBlock, openBlock, withModifiers, createCommentVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$9 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, d as _sfc_main$4, c as _sfc_main$5 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$8 } from "./Checkbox-CIOQa2-J.js";
import { _ as _sfc_main$7 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$6 } from "./Label-16aMY2sx.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { ShoppingBag, User, Lock, Eye, EyeOff } from "lucide-vue-next";
import { toast } from "vue-sonner";
import "class-variance-authority";
import "reka-ui";
import "clsx";
import "tailwind-merge";
import "@vueuse/core";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Login",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      username: "",
      password: "",
      remember: false
    });
    const showPassword = ref(false);
    const submit = () => {
      form.post("/client/login", {
        onSuccess: () => {
          toast.success("Login berhasil! Mengalihkan...");
        },
        onError: (errors) => {
          const errorMessage = errors.username || errors.password || "Login gagal. Silakan coba lagi.";
          toast.error(errorMessage);
          form.reset("password");
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Login - Puranusa" }, null, _parent));
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
                        _push4(`Masuk ke Akun Anda`);
                      } else {
                        return [
                          createTextVNode("Masuk ke Akun Anda")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Masukkan username dan password untuk melanjutkan`);
                      } else {
                        return [
                          createTextVNode("Masukkan username dan password untuk melanjutkan")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), { class: "text-2xl font-bold" }, {
                      default: withCtx(() => [
                        createTextVNode("Masuk ke Akun Anda")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createTextVNode("Masukkan username dan password untuk melanjutkan")
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
                  _push3(`<form class="space-y-4"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "username" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Username`);
                      } else {
                        return [
                          createTextVNode("Username")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="relative"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(User), { class: "absolute left-3 top-3 h-4 w-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    id: "username",
                    modelValue: unref(form).username,
                    "onUpdate:modelValue": ($event) => unref(form).username = $event,
                    type: "text",
                    placeholder: "masukkan username",
                    class: ["pl-10", { "border-destructive": unref(form).errors.username }],
                    required: "",
                    autofocus: "",
                    autocomplete: "username"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  if (unref(form).errors.username) {
                    _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(unref(form).errors.username)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="space-y-2"${_scopeId2}><div class="flex items-center justify-between"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "password" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Password`);
                      } else {
                        return [
                          createTextVNode("Password")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(Link), {
                    href: "/client/forgot-password",
                    class: "text-sm text-primary hover:underline"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Lupa password? `);
                      } else {
                        return [
                          createTextVNode(" Lupa password? ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div class="relative"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Lock), { class: "absolute left-3 top-3 h-4 w-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    id: "password",
                    modelValue: unref(form).password,
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    type: showPassword.value ? "text" : "password",
                    placeholder: "Masukkan password",
                    class: ["pl-10 pr-10", { "border-destructive": unref(form).errors.password }],
                    required: "",
                    autocomplete: "current-password"
                  }, null, _parent3, _scopeId2));
                  _push3(`<button type="button" class="absolute right-3 top-3 text-muted-foreground hover:text-foreground"${_scopeId2}>`);
                  if (!showPassword.value) {
                    _push3(ssrRenderComponent(unref(Eye), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                  } else {
                    _push3(ssrRenderComponent(unref(EyeOff), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                  }
                  _push3(`</button></div>`);
                  if (unref(form).errors.password) {
                    _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(unref(form).errors.password)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="flex items-center space-x-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$8), {
                    id: "remember",
                    checked: unref(form).remember,
                    "onUpdate:checked": ($event) => unref(form).remember = $event
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    for: "remember",
                    class: "text-sm font-normal cursor-pointer"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Ingat saya`);
                      } else {
                        return [
                          createTextVNode("Ingat saya")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$9), {
                    type: "submit",
                    class: "w-full",
                    disabled: unref(form).processing
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (unref(form).processing) {
                          _push4(`<span${_scopeId3}>Memproses...</span>`);
                        } else {
                          _push4(`<span${_scopeId3}>Masuk</span>`);
                        }
                      } else {
                        return [
                          unref(form).processing ? (openBlock(), createBlock("span", { key: 0 }, "Memproses...")) : (openBlock(), createBlock("span", { key: 1 }, "Masuk"))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</form><div class="relative my-6"${_scopeId2}><div class="absolute inset-0 flex items-center"${_scopeId2}><span class="w-full border-t"${_scopeId2}></span></div><div class="relative flex justify-center text-xs uppercase"${_scopeId2}><span class="bg-background px-2 text-muted-foreground"${_scopeId2}>Atau</span></div></div><div class="text-center text-sm"${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Belum punya akun? </span>`);
                  _push3(ssrRenderComponent(unref(Link), {
                    href: "/client/register",
                    class: "text-primary font-medium hover:underline"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Daftar sekarang `);
                      } else {
                        return [
                          createTextVNode(" Daftar sekarang ")
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
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$6), { for: "username" }, {
                          default: withCtx(() => [
                            createTextVNode("Username")
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "relative" }, [
                          createVNode(unref(User), { class: "absolute left-3 top-3 h-4 w-4 text-muted-foreground" }),
                          createVNode(unref(_sfc_main$7), {
                            id: "username",
                            modelValue: unref(form).username,
                            "onUpdate:modelValue": ($event) => unref(form).username = $event,
                            type: "text",
                            placeholder: "masukkan username",
                            class: ["pl-10", { "border-destructive": unref(form).errors.username }],
                            required: "",
                            autofocus: "",
                            autocomplete: "username"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "class"])
                        ]),
                        unref(form).errors.username ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-destructive"
                        }, toDisplayString(unref(form).errors.username), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode(unref(_sfc_main$6), { for: "password" }, {
                            default: withCtx(() => [
                              createTextVNode("Password")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(Link), {
                            href: "/client/forgot-password",
                            class: "text-sm text-primary hover:underline"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Lupa password? ")
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", { class: "relative" }, [
                          createVNode(unref(Lock), { class: "absolute left-3 top-3 h-4 w-4 text-muted-foreground" }),
                          createVNode(unref(_sfc_main$7), {
                            id: "password",
                            modelValue: unref(form).password,
                            "onUpdate:modelValue": ($event) => unref(form).password = $event,
                            type: showPassword.value ? "text" : "password",
                            placeholder: "Masukkan password",
                            class: ["pl-10 pr-10", { "border-destructive": unref(form).errors.password }],
                            required: "",
                            autocomplete: "current-password"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "type", "class"]),
                          createVNode("button", {
                            type: "button",
                            onClick: ($event) => showPassword.value = !showPassword.value,
                            class: "absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                          }, [
                            !showPassword.value ? (openBlock(), createBlock(unref(Eye), {
                              key: 0,
                              class: "h-4 w-4"
                            })) : (openBlock(), createBlock(unref(EyeOff), {
                              key: 1,
                              class: "h-4 w-4"
                            }))
                          ], 8, ["onClick"])
                        ]),
                        unref(form).errors.password ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-destructive"
                        }, toDisplayString(unref(form).errors.password), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "flex items-center space-x-2" }, [
                        createVNode(unref(_sfc_main$8), {
                          id: "remember",
                          checked: unref(form).remember,
                          "onUpdate:checked": ($event) => unref(form).remember = $event
                        }, null, 8, ["checked", "onUpdate:checked"]),
                        createVNode(unref(_sfc_main$6), {
                          for: "remember",
                          class: "text-sm font-normal cursor-pointer"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Ingat saya")
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode(unref(_sfc_main$9), {
                        type: "submit",
                        class: "w-full",
                        disabled: unref(form).processing
                      }, {
                        default: withCtx(() => [
                          unref(form).processing ? (openBlock(), createBlock("span", { key: 0 }, "Memproses...")) : (openBlock(), createBlock("span", { key: 1 }, "Masuk"))
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
                      createVNode("span", { class: "text-muted-foreground" }, "Belum punya akun? "),
                      createVNode(unref(Link), {
                        href: "/client/register",
                        class: "text-primary font-medium hover:underline"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Daftar sekarang ")
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
                      createTextVNode("Masuk ke Akun Anda")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createTextVNode("Masukkan username dan password untuk melanjutkan")
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
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), { for: "username" }, {
                        default: withCtx(() => [
                          createTextVNode("Username")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "relative" }, [
                        createVNode(unref(User), { class: "absolute left-3 top-3 h-4 w-4 text-muted-foreground" }),
                        createVNode(unref(_sfc_main$7), {
                          id: "username",
                          modelValue: unref(form).username,
                          "onUpdate:modelValue": ($event) => unref(form).username = $event,
                          type: "text",
                          placeholder: "masukkan username",
                          class: ["pl-10", { "border-destructive": unref(form).errors.username }],
                          required: "",
                          autofocus: "",
                          autocomplete: "username"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "class"])
                      ]),
                      unref(form).errors.username ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-destructive"
                      }, toDisplayString(unref(form).errors.username), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode(unref(_sfc_main$6), { for: "password" }, {
                          default: withCtx(() => [
                            createTextVNode("Password")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(Link), {
                          href: "/client/forgot-password",
                          class: "text-sm text-primary hover:underline"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Lupa password? ")
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("div", { class: "relative" }, [
                        createVNode(unref(Lock), { class: "absolute left-3 top-3 h-4 w-4 text-muted-foreground" }),
                        createVNode(unref(_sfc_main$7), {
                          id: "password",
                          modelValue: unref(form).password,
                          "onUpdate:modelValue": ($event) => unref(form).password = $event,
                          type: showPassword.value ? "text" : "password",
                          placeholder: "Masukkan password",
                          class: ["pl-10 pr-10", { "border-destructive": unref(form).errors.password }],
                          required: "",
                          autocomplete: "current-password"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "type", "class"]),
                        createVNode("button", {
                          type: "button",
                          onClick: ($event) => showPassword.value = !showPassword.value,
                          class: "absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                        }, [
                          !showPassword.value ? (openBlock(), createBlock(unref(Eye), {
                            key: 0,
                            class: "h-4 w-4"
                          })) : (openBlock(), createBlock(unref(EyeOff), {
                            key: 1,
                            class: "h-4 w-4"
                          }))
                        ], 8, ["onClick"])
                      ]),
                      unref(form).errors.password ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-destructive"
                      }, toDisplayString(unref(form).errors.password), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "flex items-center space-x-2" }, [
                      createVNode(unref(_sfc_main$8), {
                        id: "remember",
                        checked: unref(form).remember,
                        "onUpdate:checked": ($event) => unref(form).remember = $event
                      }, null, 8, ["checked", "onUpdate:checked"]),
                      createVNode(unref(_sfc_main$6), {
                        for: "remember",
                        class: "text-sm font-normal cursor-pointer"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Ingat saya")
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode(unref(_sfc_main$9), {
                      type: "submit",
                      class: "w-full",
                      disabled: unref(form).processing
                    }, {
                      default: withCtx(() => [
                        unref(form).processing ? (openBlock(), createBlock("span", { key: 0 }, "Memproses...")) : (openBlock(), createBlock("span", { key: 1 }, "Masuk"))
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
                    createVNode("span", { class: "text-muted-foreground" }, "Belum punya akun? "),
                    createVNode(unref(Link), {
                      href: "/client/register",
                      class: "text-primary font-medium hover:underline"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Daftar sekarang ")
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
      _push(`</div></div></div><div class="hidden lg:block relative bg-muted"><div class="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5"></div><div class="relative h-full flex flex-col items-center justify-center p-12 text-center"><div class="max-w-md space-y-6"><h1 class="text-4xl font-bold tracking-tight">Selamat Datang Kembali!</h1><p class="text-lg text-muted-foreground"> Masuk untuk melanjutkan belanja produk berkualitas dengan harga terbaik. </p><div class="grid grid-cols-3 gap-4 pt-8"><div class="space-y-2"><div class="text-3xl font-bold text-primary">10K+</div><p class="text-sm text-muted-foreground">Produk</p></div><div class="space-y-2"><div class="text-3xl font-bold text-primary">50K+</div><p class="text-sm text-muted-foreground">Pelanggan</p></div><div class="space-y-2"><div class="text-3xl font-bold text-primary">4.8</div><p class="text-sm text-muted-foreground">Rating</p></div></div></div></div><div class="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]"></div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/ecommerce/auth/Login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
