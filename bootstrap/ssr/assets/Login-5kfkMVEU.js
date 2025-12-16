import { defineComponent, mergeProps, withCtx, unref, createTextVNode, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$4 } from "./InputError-BhTWS2NZ.js";
import { _ as _sfc_main$5 } from "./TextLink-DTyK6a-s.js";
import { _ as _sfc_main$7 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$6 } from "./Checkbox-CIOQa2-J.js";
import { _ as _sfc_main$3 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$2 } from "./Label-16aMY2sx.js";
import { _ as _sfc_main$8 } from "./Spinner-HF6xsI_i.js";
import { _ as _sfc_main$1 } from "./AuthLayout-DsdX4JqG.js";
import { q as queryParams, r as register } from "./index-D9uuAIUh.js";
import { r as request } from "./index-DmpbqxzY.js";
import { Head, Form } from "@inertiajs/vue3";
import "class-variance-authority";
import "reka-ui";
import "clsx";
import "tailwind-merge";
import "lucide-vue-next";
import "@vueuse/core";
import "./AppLogoIcon-CtV9aC-8.js";
import "./index-C3x9ukl1.js";
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        title: "Log in to your account",
        description: "Enter your email and password below to log in"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Log in" }, null, _parent2, _scopeId));
            if (__props.status) {
              _push2(`<div class="mb-4 text-center text-sm font-medium text-green-600"${_scopeId}>${ssrInterpolate(__props.status)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(Form), mergeProps(unref(store).form(), {
              "reset-on-success": ["password"],
              class: "flex flex-col gap-6"
            }), {
              default: withCtx(({ errors, processing }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid gap-6"${_scopeId2}><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$2), { for: "email" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Email address`);
                      } else {
                        return [
                          createTextVNode("Email address")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$3), {
                    id: "email",
                    type: "email",
                    name: "email",
                    required: "",
                    autofocus: "",
                    tabindex: 1,
                    autocomplete: "email",
                    placeholder: "email@example.com"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    message: errors.email
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid gap-2"${_scopeId2}><div class="flex items-center justify-between"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$2), { for: "password" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Password`);
                      } else {
                        return [
                          createTextVNode("Password")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  if (__props.canResetPassword) {
                    _push3(ssrRenderComponent(_sfc_main$5, {
                      href: unref(request)(),
                      class: "text-sm",
                      tabindex: 5
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Forgot password? `);
                        } else {
                          return [
                            createTextVNode(" Forgot password? ")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$3), {
                    id: "password",
                    type: "password",
                    name: "password",
                    required: "",
                    tabindex: 2,
                    autocomplete: "current-password",
                    placeholder: "Password"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    message: errors.password
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="flex items-center justify-between"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$2), {
                    for: "remember",
                    class: "flex items-center space-x-3"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$6), {
                          id: "remember",
                          name: "remember",
                          tabindex: 3
                        }, null, _parent4, _scopeId3));
                        _push4(`<span${_scopeId3}>Remember me</span>`);
                      } else {
                        return [
                          createVNode(unref(_sfc_main$6), {
                            id: "remember",
                            name: "remember",
                            tabindex: 3
                          }),
                          createVNode("span", null, "Remember me")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    type: "submit",
                    class: "mt-4 w-full",
                    tabindex: 4,
                    disabled: processing,
                    "data-test": "login-button"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (processing) {
                          _push4(ssrRenderComponent(unref(_sfc_main$8), null, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(` Log in `);
                      } else {
                        return [
                          processing ? (openBlock(), createBlock(unref(_sfc_main$8), { key: 0 })) : createCommentVNode("", true),
                          createTextVNode(" Log in ")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  if (__props.canRegister) {
                    _push3(`<div class="text-center text-sm text-muted-foreground"${_scopeId2}> Don&#39;t have an account? `);
                    _push3(ssrRenderComponent(_sfc_main$5, {
                      href: unref(register)(),
                      tabindex: 5
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Sign up`);
                        } else {
                          return [
                            createTextVNode("Sign up")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode("div", { class: "grid gap-6" }, [
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(unref(_sfc_main$2), { for: "email" }, {
                          default: withCtx(() => [
                            createTextVNode("Email address")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$3), {
                          id: "email",
                          type: "email",
                          name: "email",
                          required: "",
                          autofocus: "",
                          tabindex: 1,
                          autocomplete: "email",
                          placeholder: "email@example.com"
                        }),
                        createVNode(_sfc_main$4, {
                          message: errors.email
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode(unref(_sfc_main$2), { for: "password" }, {
                            default: withCtx(() => [
                              createTextVNode("Password")
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
                              createTextVNode(" Forgot password? ")
                            ]),
                            _: 1
                          }, 8, ["href"])) : createCommentVNode("", true)
                        ]),
                        createVNode(unref(_sfc_main$3), {
                          id: "password",
                          type: "password",
                          name: "password",
                          required: "",
                          tabindex: 2,
                          autocomplete: "current-password",
                          placeholder: "Password"
                        }),
                        createVNode(_sfc_main$4, {
                          message: errors.password
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
                              name: "remember",
                              tabindex: 3
                            }),
                            createVNode("span", null, "Remember me")
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode(unref(_sfc_main$7), {
                        type: "submit",
                        class: "mt-4 w-full",
                        tabindex: 4,
                        disabled: processing,
                        "data-test": "login-button"
                      }, {
                        default: withCtx(() => [
                          processing ? (openBlock(), createBlock(unref(_sfc_main$8), { key: 0 })) : createCommentVNode("", true),
                          createTextVNode(" Log in ")
                        ]),
                        _: 2
                      }, 1032, ["disabled"])
                    ]),
                    __props.canRegister ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "text-center text-sm text-muted-foreground"
                    }, [
                      createTextVNode(" Don't have an account? "),
                      createVNode(_sfc_main$5, {
                        href: unref(register)(),
                        tabindex: 5
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Sign up")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Head), { title: "Log in" }),
              __props.status ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mb-4 text-center text-sm font-medium text-green-600"
              }, toDisplayString(__props.status), 1)) : createCommentVNode("", true),
              createVNode(unref(Form), mergeProps(unref(store).form(), {
                "reset-on-success": ["password"],
                class: "flex flex-col gap-6"
              }), {
                default: withCtx(({ errors, processing }) => [
                  createVNode("div", { class: "grid gap-6" }, [
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$2), { for: "email" }, {
                        default: withCtx(() => [
                          createTextVNode("Email address")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$3), {
                        id: "email",
                        type: "email",
                        name: "email",
                        required: "",
                        autofocus: "",
                        tabindex: 1,
                        autocomplete: "email",
                        placeholder: "email@example.com"
                      }),
                      createVNode(_sfc_main$4, {
                        message: errors.email
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode(unref(_sfc_main$2), { for: "password" }, {
                          default: withCtx(() => [
                            createTextVNode("Password")
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
                            createTextVNode(" Forgot password? ")
                          ]),
                          _: 1
                        }, 8, ["href"])) : createCommentVNode("", true)
                      ]),
                      createVNode(unref(_sfc_main$3), {
                        id: "password",
                        type: "password",
                        name: "password",
                        required: "",
                        tabindex: 2,
                        autocomplete: "current-password",
                        placeholder: "Password"
                      }),
                      createVNode(_sfc_main$4, {
                        message: errors.password
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
                            name: "remember",
                            tabindex: 3
                          }),
                          createVNode("span", null, "Remember me")
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode(unref(_sfc_main$7), {
                      type: "submit",
                      class: "mt-4 w-full",
                      tabindex: 4,
                      disabled: processing,
                      "data-test": "login-button"
                    }, {
                      default: withCtx(() => [
                        processing ? (openBlock(), createBlock(unref(_sfc_main$8), { key: 0 })) : createCommentVNode("", true),
                        createTextVNode(" Log in ")
                      ]),
                      _: 2
                    }, 1032, ["disabled"])
                  ]),
                  __props.canRegister ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-center text-sm text-muted-foreground"
                  }, [
                    createTextVNode(" Don't have an account? "),
                    createVNode(_sfc_main$5, {
                      href: unref(register)(),
                      tabindex: 5
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Sign up")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ])) : createCommentVNode("", true)
                ]),
                _: 1
              }, 16)
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
