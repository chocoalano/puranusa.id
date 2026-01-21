import { defineComponent, ref, mergeProps, withCtx, unref, createTextVNode, createBlock, createCommentVNode, openBlock, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$4 } from "./InputError-BhTWS2NZ.js";
import { _ as _sfc_main$5 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$3 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$2 } from "./Label-16aMY2sx.js";
import { _ as _sfc_main$6 } from "./Spinner-HF6xsI_i.js";
import { _ as _sfc_main$1 } from "./AuthLayout-BBbPJ38e.js";
import { u as update } from "./index-C9A1yc0c.js";
import { Head, Form } from "@inertiajs/vue3";
import "class-variance-authority";
import "reka-ui";
import "clsx";
import "tailwind-merge";
import "@vueuse/core";
import "lucide-vue-next";
import "./AppLogoIcon-CtV9aC-8.js";
import "./index-BsP5JKUP.js";
import "./index--D7ld9AJ.js";
import "./index-C0MnmV4S.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ResetPassword",
  __ssrInlineRender: true,
  props: {
    token: {},
    email: {}
  },
  setup(__props) {
    const props = __props;
    const inputEmail = ref(props.email);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        title: "Reset password",
        description: "Please enter your new password below"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Reset password" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Form), mergeProps(unref(update).form(), {
              transform: (data) => ({ ...data, token: __props.token, email: __props.email }),
              "reset-on-success": ["password", "password_confirmation"]
            }), {
              default: withCtx(({ errors, processing }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid gap-6"${_scopeId2}><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$2), { for: "email" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Email`);
                      } else {
                        return [
                          createTextVNode("Email")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$3), {
                    id: "email",
                    type: "email",
                    name: "email",
                    autocomplete: "email",
                    modelValue: inputEmail.value,
                    "onUpdate:modelValue": ($event) => inputEmail.value = $event,
                    class: "mt-1 block w-full",
                    readonly: ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    message: errors.email,
                    class: "mt-2"
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
                    name: "password",
                    autocomplete: "new-password",
                    class: "mt-1 block w-full",
                    autofocus: "",
                    placeholder: "Password"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    message: errors.password
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$2), { for: "password_confirmation" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Confirm Password `);
                      } else {
                        return [
                          createTextVNode(" Confirm Password ")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$3), {
                    id: "password_confirmation",
                    type: "password",
                    name: "password_confirmation",
                    autocomplete: "new-password",
                    class: "mt-1 block w-full",
                    placeholder: "Confirm password"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    message: errors.password_confirmation
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), {
                    type: "submit",
                    class: "mt-4 w-full",
                    disabled: processing,
                    "data-test": "reset-password-button"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (processing) {
                          _push4(ssrRenderComponent(unref(_sfc_main$6), null, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(` Reset password `);
                      } else {
                        return [
                          processing ? (openBlock(), createBlock(unref(_sfc_main$6), { key: 0 })) : createCommentVNode("", true),
                          createTextVNode(" Reset password ")
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
                        createVNode(unref(_sfc_main$2), { for: "email" }, {
                          default: withCtx(() => [
                            createTextVNode("Email")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$3), {
                          id: "email",
                          type: "email",
                          name: "email",
                          autocomplete: "email",
                          modelValue: inputEmail.value,
                          "onUpdate:modelValue": ($event) => inputEmail.value = $event,
                          class: "mt-1 block w-full",
                          readonly: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$4, {
                          message: errors.email,
                          class: "mt-2"
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
                          name: "password",
                          autocomplete: "new-password",
                          class: "mt-1 block w-full",
                          autofocus: "",
                          placeholder: "Password"
                        }),
                        createVNode(_sfc_main$4, {
                          message: errors.password
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(unref(_sfc_main$2), { for: "password_confirmation" }, {
                          default: withCtx(() => [
                            createTextVNode(" Confirm Password ")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$3), {
                          id: "password_confirmation",
                          type: "password",
                          name: "password_confirmation",
                          autocomplete: "new-password",
                          class: "mt-1 block w-full",
                          placeholder: "Confirm password"
                        }),
                        createVNode(_sfc_main$4, {
                          message: errors.password_confirmation
                        }, null, 8, ["message"])
                      ]),
                      createVNode(unref(_sfc_main$5), {
                        type: "submit",
                        class: "mt-4 w-full",
                        disabled: processing,
                        "data-test": "reset-password-button"
                      }, {
                        default: withCtx(() => [
                          processing ? (openBlock(), createBlock(unref(_sfc_main$6), { key: 0 })) : createCommentVNode("", true),
                          createTextVNode(" Reset password ")
                        ]),
                        _: 2
                      }, 1032, ["disabled"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Head), { title: "Reset password" }),
              createVNode(unref(Form), mergeProps(unref(update).form(), {
                transform: (data) => ({ ...data, token: __props.token, email: __props.email }),
                "reset-on-success": ["password", "password_confirmation"]
              }), {
                default: withCtx(({ errors, processing }) => [
                  createVNode("div", { class: "grid gap-6" }, [
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$2), { for: "email" }, {
                        default: withCtx(() => [
                          createTextVNode("Email")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$3), {
                        id: "email",
                        type: "email",
                        name: "email",
                        autocomplete: "email",
                        modelValue: inputEmail.value,
                        "onUpdate:modelValue": ($event) => inputEmail.value = $event,
                        class: "mt-1 block w-full",
                        readonly: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$4, {
                        message: errors.email,
                        class: "mt-2"
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
                        name: "password",
                        autocomplete: "new-password",
                        class: "mt-1 block w-full",
                        autofocus: "",
                        placeholder: "Password"
                      }),
                      createVNode(_sfc_main$4, {
                        message: errors.password
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$2), { for: "password_confirmation" }, {
                        default: withCtx(() => [
                          createTextVNode(" Confirm Password ")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$3), {
                        id: "password_confirmation",
                        type: "password",
                        name: "password_confirmation",
                        autocomplete: "new-password",
                        class: "mt-1 block w-full",
                        placeholder: "Confirm password"
                      }),
                      createVNode(_sfc_main$4, {
                        message: errors.password_confirmation
                      }, null, 8, ["message"])
                    ]),
                    createVNode(unref(_sfc_main$5), {
                      type: "submit",
                      class: "mt-4 w-full",
                      disabled: processing,
                      "data-test": "reset-password-button"
                    }, {
                      default: withCtx(() => [
                        processing ? (openBlock(), createBlock(unref(_sfc_main$6), { key: 0 })) : createCommentVNode("", true),
                        createTextVNode(" Reset password ")
                      ]),
                      _: 2
                    }, 1032, ["disabled"])
                  ])
                ]),
                _: 1
              }, 16, ["transform"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/auth/ResetPassword.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
