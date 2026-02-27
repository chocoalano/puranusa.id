import { defineComponent, mergeProps, withCtx, unref, createTextVNode, createBlock, createCommentVNode, openBlock, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$4 } from "./InputError-BhTWS2NZ.js";
import { _ as _sfc_main$7 } from "./TextLink-DTyK6a-s.js";
import { _ as _sfc_main$5 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$3 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$2 } from "./Label-16aMY2sx.js";
import { _ as _sfc_main$6 } from "./Spinner-HF6xsI_i.js";
import { _ as _sfc_main$1 } from "./AuthLayout-ClX7-EIq.js";
import { a as login } from "./index-DS4dn0_o.js";
import { e as email } from "./index-BoqT-rJ6.js";
import { Head, Form } from "@inertiajs/vue3";
import "class-variance-authority";
import "reka-ui";
import "clsx";
import "tailwind-merge";
import "@vueuse/core";
import "lucide-vue-next";
import "./AppLogoIcon-CtV9aC-8.js";
import "./index-3UqiGNe9.js";
import "./index-hRDvBeTG.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ForgotPassword",
  __ssrInlineRender: true,
  props: {
    status: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        title: "Forgot password",
        description: "Enter your email to receive a password reset link"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Forgot password" }, null, _parent2, _scopeId));
            if (__props.status) {
              _push2(`<div class="mb-4 text-center text-sm font-medium text-green-600"${_scopeId}>${ssrInterpolate(__props.status)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="space-y-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Form), unref(email).form(), {
              default: withCtx(({ errors, processing }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid gap-2"${_scopeId2}>`);
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
                    autocomplete: "off",
                    autofocus: "",
                    placeholder: "email@example.com"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    message: errors.email
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="my-6 flex items-center justify-start"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), {
                    class: "w-full",
                    disabled: processing,
                    "data-test": "email-password-reset-link-button"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (processing) {
                          _push4(ssrRenderComponent(unref(_sfc_main$6), null, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(` Email password reset link `);
                      } else {
                        return [
                          processing ? (openBlock(), createBlock(unref(_sfc_main$6), { key: 0 })) : createCommentVNode("", true),
                          createTextVNode(" Email password reset link ")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
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
                        autocomplete: "off",
                        autofocus: "",
                        placeholder: "email@example.com"
                      }),
                      createVNode(_sfc_main$4, {
                        message: errors.email
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "my-6 flex items-center justify-start" }, [
                      createVNode(unref(_sfc_main$5), {
                        class: "w-full",
                        disabled: processing,
                        "data-test": "email-password-reset-link-button"
                      }, {
                        default: withCtx(() => [
                          processing ? (openBlock(), createBlock(unref(_sfc_main$6), { key: 0 })) : createCommentVNode("", true),
                          createTextVNode(" Email password reset link ")
                        ]),
                        _: 2
                      }, 1032, ["disabled"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="space-x-1 text-center text-sm text-muted-foreground"${_scopeId}><span${_scopeId}>Or, return to</span>`);
            _push2(ssrRenderComponent(_sfc_main$7, {
              href: unref(login)()
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`log in`);
                } else {
                  return [
                    createTextVNode("log in")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Forgot password" }),
              __props.status ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mb-4 text-center text-sm font-medium text-green-600"
              }, toDisplayString(__props.status), 1)) : createCommentVNode("", true),
              createVNode("div", { class: "space-y-6" }, [
                createVNode(unref(Form), unref(email).form(), {
                  default: withCtx(({ errors, processing }) => [
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
                        autocomplete: "off",
                        autofocus: "",
                        placeholder: "email@example.com"
                      }),
                      createVNode(_sfc_main$4, {
                        message: errors.email
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "my-6 flex items-center justify-start" }, [
                      createVNode(unref(_sfc_main$5), {
                        class: "w-full",
                        disabled: processing,
                        "data-test": "email-password-reset-link-button"
                      }, {
                        default: withCtx(() => [
                          processing ? (openBlock(), createBlock(unref(_sfc_main$6), { key: 0 })) : createCommentVNode("", true),
                          createTextVNode(" Email password reset link ")
                        ]),
                        _: 2
                      }, 1032, ["disabled"])
                    ])
                  ]),
                  _: 1
                }, 16),
                createVNode("div", { class: "space-x-1 text-center text-sm text-muted-foreground" }, [
                  createVNode("span", null, "Or, return to"),
                  createVNode(_sfc_main$7, {
                    href: unref(login)()
                  }, {
                    default: withCtx(() => [
                      createTextVNode("log in")
                    ]),
                    _: 1
                  }, 8, ["href"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/auth/ForgotPassword.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
