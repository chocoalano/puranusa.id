import { defineComponent, mergeProps, withCtx, unref, createTextVNode, createBlock, createCommentVNode, openBlock, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$4 } from "./InputError-BhTWS2NZ.js";
import { _ as _sfc_main$7 } from "./TextLink-DTyK6a-s.js";
import { _ as _sfc_main$5 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$3 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$2 } from "./Label-16aMY2sx.js";
import { _ as _sfc_main$6 } from "./Spinner-HF6xsI_i.js";
import { _ as _sfc_main$1 } from "./AuthLayout-CxP_IsMW.js";
import { q as queryParams, b as login } from "./index-Jhngbhhu.js";
import { Head, Form } from "@inertiajs/vue3";
import "class-variance-authority";
import "reka-ui";
import "clsx";
import "tailwind-merge";
import "@vueuse/core";
import "lucide-vue-next";
import "./AppLogoIcon-CtV9aC-8.js";
const store = (options) => ({
  url: store.url(options),
  method: "post"
});
store.definition = {
  methods: ["post"],
  url: "/admin/register"
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
  __name: "Register",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        title: "Create an account",
        description: "Enter your details below to create your account"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Register" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Form), mergeProps(unref(store).form(), {
              "reset-on-success": ["password", "password_confirmation"],
              class: "flex flex-col gap-6"
            }), {
              default: withCtx(({ errors, processing }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid gap-6"${_scopeId2}><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$2), { for: "name" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Name`);
                      } else {
                        return [
                          createTextVNode("Name")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$3), {
                    id: "name",
                    type: "text",
                    required: "",
                    autofocus: "",
                    tabindex: 1,
                    autocomplete: "name",
                    name: "name",
                    placeholder: "Full name"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    message: errors.name
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid gap-2"${_scopeId2}>`);
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
                    required: "",
                    tabindex: 2,
                    autocomplete: "email",
                    name: "email",
                    placeholder: "email@example.com"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    message: errors.email
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid gap-2"${_scopeId2}>`);
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
                  _push3(ssrRenderComponent(unref(_sfc_main$3), {
                    id: "password",
                    type: "password",
                    required: "",
                    tabindex: 3,
                    autocomplete: "new-password",
                    name: "password",
                    placeholder: "Password"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    message: errors.password
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$2), { for: "password_confirmation" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Confirm password`);
                      } else {
                        return [
                          createTextVNode("Confirm password")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$3), {
                    id: "password_confirmation",
                    type: "password",
                    required: "",
                    tabindex: 4,
                    autocomplete: "new-password",
                    name: "password_confirmation",
                    placeholder: "Confirm password"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    message: errors.password_confirmation
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), {
                    type: "submit",
                    class: "mt-2 w-full",
                    tabindex: "5",
                    disabled: processing,
                    "data-test": "register-user-button"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (processing) {
                          _push4(ssrRenderComponent(unref(_sfc_main$6), null, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(` Create account `);
                      } else {
                        return [
                          processing ? (openBlock(), createBlock(unref(_sfc_main$6), { key: 0 })) : createCommentVNode("", true),
                          createTextVNode(" Create account ")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(`</div><div class="text-center text-sm text-muted-foreground"${_scopeId2}> Already have an account? `);
                  _push3(ssrRenderComponent(_sfc_main$7, {
                    href: unref(login)(),
                    class: "underline underline-offset-4",
                    tabindex: 6
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Log in`);
                      } else {
                        return [
                          createTextVNode("Log in")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid gap-6" }, [
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(unref(_sfc_main$2), { for: "name" }, {
                          default: withCtx(() => [
                            createTextVNode("Name")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$3), {
                          id: "name",
                          type: "text",
                          required: "",
                          autofocus: "",
                          tabindex: 1,
                          autocomplete: "name",
                          name: "name",
                          placeholder: "Full name"
                        }),
                        createVNode(_sfc_main$4, {
                          message: errors.name
                        }, null, 8, ["message"])
                      ]),
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
                          required: "",
                          tabindex: 2,
                          autocomplete: "email",
                          name: "email",
                          placeholder: "email@example.com"
                        }),
                        createVNode(_sfc_main$4, {
                          message: errors.email
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(unref(_sfc_main$2), { for: "password" }, {
                          default: withCtx(() => [
                            createTextVNode("Password")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$3), {
                          id: "password",
                          type: "password",
                          required: "",
                          tabindex: 3,
                          autocomplete: "new-password",
                          name: "password",
                          placeholder: "Password"
                        }),
                        createVNode(_sfc_main$4, {
                          message: errors.password
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(unref(_sfc_main$2), { for: "password_confirmation" }, {
                          default: withCtx(() => [
                            createTextVNode("Confirm password")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$3), {
                          id: "password_confirmation",
                          type: "password",
                          required: "",
                          tabindex: 4,
                          autocomplete: "new-password",
                          name: "password_confirmation",
                          placeholder: "Confirm password"
                        }),
                        createVNode(_sfc_main$4, {
                          message: errors.password_confirmation
                        }, null, 8, ["message"])
                      ]),
                      createVNode(unref(_sfc_main$5), {
                        type: "submit",
                        class: "mt-2 w-full",
                        tabindex: "5",
                        disabled: processing,
                        "data-test": "register-user-button"
                      }, {
                        default: withCtx(() => [
                          processing ? (openBlock(), createBlock(unref(_sfc_main$6), { key: 0 })) : createCommentVNode("", true),
                          createTextVNode(" Create account ")
                        ]),
                        _: 2
                      }, 1032, ["disabled"])
                    ]),
                    createVNode("div", { class: "text-center text-sm text-muted-foreground" }, [
                      createTextVNode(" Already have an account? "),
                      createVNode(_sfc_main$7, {
                        href: unref(login)(),
                        class: "underline underline-offset-4",
                        tabindex: 6
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Log in")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Head), { title: "Register" }),
              createVNode(unref(Form), mergeProps(unref(store).form(), {
                "reset-on-success": ["password", "password_confirmation"],
                class: "flex flex-col gap-6"
              }), {
                default: withCtx(({ errors, processing }) => [
                  createVNode("div", { class: "grid gap-6" }, [
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$2), { for: "name" }, {
                        default: withCtx(() => [
                          createTextVNode("Name")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$3), {
                        id: "name",
                        type: "text",
                        required: "",
                        autofocus: "",
                        tabindex: 1,
                        autocomplete: "name",
                        name: "name",
                        placeholder: "Full name"
                      }),
                      createVNode(_sfc_main$4, {
                        message: errors.name
                      }, null, 8, ["message"])
                    ]),
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
                        required: "",
                        tabindex: 2,
                        autocomplete: "email",
                        name: "email",
                        placeholder: "email@example.com"
                      }),
                      createVNode(_sfc_main$4, {
                        message: errors.email
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$2), { for: "password" }, {
                        default: withCtx(() => [
                          createTextVNode("Password")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$3), {
                        id: "password",
                        type: "password",
                        required: "",
                        tabindex: 3,
                        autocomplete: "new-password",
                        name: "password",
                        placeholder: "Password"
                      }),
                      createVNode(_sfc_main$4, {
                        message: errors.password
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$2), { for: "password_confirmation" }, {
                        default: withCtx(() => [
                          createTextVNode("Confirm password")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$3), {
                        id: "password_confirmation",
                        type: "password",
                        required: "",
                        tabindex: 4,
                        autocomplete: "new-password",
                        name: "password_confirmation",
                        placeholder: "Confirm password"
                      }),
                      createVNode(_sfc_main$4, {
                        message: errors.password_confirmation
                      }, null, 8, ["message"])
                    ]),
                    createVNode(unref(_sfc_main$5), {
                      type: "submit",
                      class: "mt-2 w-full",
                      tabindex: "5",
                      disabled: processing,
                      "data-test": "register-user-button"
                    }, {
                      default: withCtx(() => [
                        processing ? (openBlock(), createBlock(unref(_sfc_main$6), { key: 0 })) : createCommentVNode("", true),
                        createTextVNode(" Create account ")
                      ]),
                      _: 2
                    }, 1032, ["disabled"])
                  ]),
                  createVNode("div", { class: "text-center text-sm text-muted-foreground" }, [
                    createTextVNode(" Already have an account? "),
                    createVNode(_sfc_main$7, {
                      href: unref(login)(),
                      class: "underline underline-offset-4",
                      tabindex: 6
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Log in")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/auth/Register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
