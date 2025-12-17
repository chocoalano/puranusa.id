import { defineComponent, mergeProps, withCtx, unref, createTextVNode, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$4 } from "./InputError-BhTWS2NZ.js";
import { _ as _sfc_main$5 } from "./TextLink-DTyK6a-s.js";
import { _ as _sfc_main$7 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$6 } from "./Checkbox-CIOQa2-J.js";
import { _ as _sfc_main$3 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$2 } from "./Label-16aMY2sx.js";
import { _ as _sfc_main$8 } from "./Spinner-HF6xsI_i.js";
import { _ as _sfc_main$1 } from "./AuthLayout-CxP_IsMW.js";
import { q as queryParams, r as register } from "./index-Jhngbhhu.js";
import { r as request } from "./index-CPNPBTMo.js";
import { useForm, Head } from "@inertiajs/vue3";
import "class-variance-authority";
import "reka-ui";
import "clsx";
import "tailwind-merge";
import "lucide-vue-next";
import "@vueuse/core";
import "./AppLogoIcon-CtV9aC-8.js";
import "./index-9hRlpKu2.js";
const store = (options) => ({
  url: store.url(options),
  method: "post"
});
store.definition = {
  methods: ["post"],
  url: "/admin/login"
};
store.url = (options) => {
  return store.definition.url + queryParams(options);
};
store.post = (options) => ({
  url: store.url(options),
  method: "post"
});
const storeForm = (options) => ({
  action: store.url(options),
  method: "post"
});
storeForm.post = (options) => ({
  action: store.url(options),
  method: "post"
});
store.form = storeForm;
({
  store: Object.assign(store, store)
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Login",
  __ssrInlineRender: true,
  props: {
    status: {},
    canResetPassword: { type: Boolean },
    canRegister: { type: Boolean }
  },
  setup(__props) {
    const form = useForm({
      email: "",
      password: "",
      remember: false
    });
    const submit = () => {
      form.post(store.url(), {
        onFinish: () => {
          form.reset("password");
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        title: "Masuk ke akun Anda",
        description: "Masukkan email dan kata sandi untuk masuk"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Masuk" }, null, _parent2, _scopeId));
            if (__props.status) {
              _push2(`<div class="mb-4 text-center text-sm font-medium text-green-600"${_scopeId}>${ssrInterpolate(__props.status)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<form class="flex flex-col gap-6"${_scopeId}><div class="grid gap-6"${_scopeId}><div class="grid gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), { for: "email" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Alamat Email`);
                } else {
                  return [
                    createTextVNode("Alamat Email")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$3), {
              id: "email",
              type: "email",
              modelValue: unref(form).email,
              "onUpdate:modelValue": ($event) => unref(form).email = $event,
              required: "",
              autofocus: "",
              tabindex: 1,
              autocomplete: "email",
              placeholder: "email@contoh.com"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(form).errors.email
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="grid gap-2"${_scopeId}><div class="flex items-center justify-between"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), { for: "password" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Kata Sandi`);
                } else {
                  return [
                    createTextVNode("Kata Sandi")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (__props.canResetPassword) {
              _push2(ssrRenderComponent(_sfc_main$5, {
                href: unref(request)(),
                class: "text-sm",
                tabindex: 5
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Lupa kata sandi? `);
                  } else {
                    return [
                      createTextVNode(" Lupa kata sandi? ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$3), {
              id: "password",
              type: "password",
              modelValue: unref(form).password,
              "onUpdate:modelValue": ($event) => unref(form).password = $event,
              required: "",
              tabindex: 2,
              autocomplete: "current-password",
              placeholder: "Kata sandi"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(form).errors.password
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center justify-between"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              for: "remember",
              class: "flex items-center space-x-3"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$6), {
                    id: "remember",
                    checked: unref(form).remember,
                    "onUpdate:checked": ($event) => unref(form).remember = $event,
                    tabindex: 3
                  }, null, _parent3, _scopeId2));
                  _push3(`<span${_scopeId2}>Ingat saya</span>`);
                } else {
                  return [
                    createVNode(unref(_sfc_main$6), {
                      id: "remember",
                      checked: unref(form).remember,
                      "onUpdate:checked": ($event) => unref(form).remember = $event,
                      tabindex: 3
                    }, null, 8, ["checked", "onUpdate:checked"]),
                    createVNode("span", null, "Ingat saya")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$7), {
              type: "submit",
              class: "mt-4 w-full",
              tabindex: 4,
              disabled: unref(form).processing,
              "data-test": "login-button"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(form).processing) {
                    _push3(ssrRenderComponent(unref(_sfc_main$8), null, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(` Masuk `);
                } else {
                  return [
                    unref(form).processing ? (openBlock(), createBlock(unref(_sfc_main$8), { key: 0 })) : createCommentVNode("", true),
                    createTextVNode(" Masuk ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (__props.canRegister) {
              _push2(`<div class="text-center text-sm text-muted-foreground"${_scopeId}> Belum punya akun? `);
              _push2(ssrRenderComponent(_sfc_main$5, {
                href: unref(register)(),
                tabindex: 5
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Daftar`);
                  } else {
                    return [
                      createTextVNode("Daftar")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</form>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Masuk" }),
              __props.status ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mb-4 text-center text-sm font-medium text-green-600"
              }, toDisplayString(__props.status), 1)) : createCommentVNode("", true),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"]),
                class: "flex flex-col gap-6"
              }, [
                createVNode("div", { class: "grid gap-6" }, [
                  createVNode("div", { class: "grid gap-2" }, [
                    createVNode(unref(_sfc_main$2), { for: "email" }, {
                      default: withCtx(() => [
                        createTextVNode("Alamat Email")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$3), {
                      id: "email",
                      type: "email",
                      modelValue: unref(form).email,
                      "onUpdate:modelValue": ($event) => unref(form).email = $event,
                      required: "",
                      autofocus: "",
                      tabindex: 1,
                      autocomplete: "email",
                      placeholder: "email@contoh.com"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_sfc_main$4, {
                      message: unref(form).errors.email
                    }, null, 8, ["message"])
                  ]),
                  createVNode("div", { class: "grid gap-2" }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode(unref(_sfc_main$2), { for: "password" }, {
                        default: withCtx(() => [
                          createTextVNode("Kata Sandi")
                        ]),
                        _: 1
                      }),
                      __props.canResetPassword ? (openBlock(), createBlock(_sfc_main$5, {
                        key: 0,
                        href: unref(request)(),
                        class: "text-sm",
                        tabindex: 5
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Lupa kata sandi? ")
                        ]),
                        _: 1
                      }, 8, ["href"])) : createCommentVNode("", true)
                    ]),
                    createVNode(unref(_sfc_main$3), {
                      id: "password",
                      type: "password",
                      modelValue: unref(form).password,
                      "onUpdate:modelValue": ($event) => unref(form).password = $event,
                      required: "",
                      tabindex: 2,
                      autocomplete: "current-password",
                      placeholder: "Kata sandi"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_sfc_main$4, {
                      message: unref(form).errors.password
                    }, null, 8, ["message"])
                  ]),
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode(unref(_sfc_main$2), {
                      for: "remember",
                      class: "flex items-center space-x-3"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$6), {
                          id: "remember",
                          checked: unref(form).remember,
                          "onUpdate:checked": ($event) => unref(form).remember = $event,
                          tabindex: 3
                        }, null, 8, ["checked", "onUpdate:checked"]),
                        createVNode("span", null, "Ingat saya")
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode(unref(_sfc_main$7), {
                    type: "submit",
                    class: "mt-4 w-full",
                    tabindex: 4,
                    disabled: unref(form).processing,
                    "data-test": "login-button"
                  }, {
                    default: withCtx(() => [
                      unref(form).processing ? (openBlock(), createBlock(unref(_sfc_main$8), { key: 0 })) : createCommentVNode("", true),
                      createTextVNode(" Masuk ")
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ]),
                __props.canRegister ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "text-center text-sm text-muted-foreground"
                }, [
                  createTextVNode(" Belum punya akun? "),
                  createVNode(_sfc_main$5, {
                    href: unref(register)(),
                    tabindex: 5
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Daftar")
                    ]),
                    _: 1
                  }, 8, ["href"])
                ])) : createCommentVNode("", true)
              ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/auth/Login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
