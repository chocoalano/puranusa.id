import { defineComponent, mergeProps, withCtx, unref, createBlock, createCommentVNode, createTextVNode, openBlock, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$4 } from "./TextLink-DTyK6a-s.js";
import { _ as _sfc_main$2 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$3 } from "./Spinner-HF6xsI_i.js";
import { _ as _sfc_main$1 } from "./AuthLayout-CI9q4vbq.js";
import { l as logout } from "./index-Bfu0FVt6.js";
import { s as send } from "./index-Am7tD5az.js";
import { Head, Form } from "@inertiajs/vue3";
import "class-variance-authority";
import "reka-ui";
import "clsx";
import "tailwind-merge";
import "lucide-vue-next";
import "./AppLogoIcon-CtV9aC-8.js";
import "./index-3UqiGNe9.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "VerifyEmail",
  __ssrInlineRender: true,
  props: {
    status: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        title: "Verify email",
        description: "Please verify your email address by clicking on the link we just emailed to you."
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Email verification" }, null, _parent2, _scopeId));
            if (__props.status === "verification-link-sent") {
              _push2(`<div class="mb-4 text-center text-sm font-medium text-green-600"${_scopeId}> A new verification link has been sent to the email address you provided during registration. </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(Form), mergeProps(unref(send).form(), { class: "space-y-6 text-center" }), {
              default: withCtx(({ processing }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$2), {
                    disabled: processing,
                    variant: "secondary"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (processing) {
                          _push4(ssrRenderComponent(unref(_sfc_main$3), null, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(` Resend verification email `);
                      } else {
                        return [
                          processing ? (openBlock(), createBlock(unref(_sfc_main$3), { key: 0 })) : createCommentVNode("", true),
                          createTextVNode(" Resend verification email ")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    href: unref(logout)(),
                    as: "button",
                    class: "mx-auto block text-sm"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Log out `);
                      } else {
                        return [
                          createTextVNode(" Log out ")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$2), {
                      disabled: processing,
                      variant: "secondary"
                    }, {
                      default: withCtx(() => [
                        processing ? (openBlock(), createBlock(unref(_sfc_main$3), { key: 0 })) : createCommentVNode("", true),
                        createTextVNode(" Resend verification email ")
                      ]),
                      _: 2
                    }, 1032, ["disabled"]),
                    createVNode(_sfc_main$4, {
                      href: unref(logout)(),
                      as: "button",
                      class: "mx-auto block text-sm"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Log out ")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Head), { title: "Email verification" }),
              __props.status === "verification-link-sent" ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mb-4 text-center text-sm font-medium text-green-600"
              }, " A new verification link has been sent to the email address you provided during registration. ")) : createCommentVNode("", true),
              createVNode(unref(Form), mergeProps(unref(send).form(), { class: "space-y-6 text-center" }), {
                default: withCtx(({ processing }) => [
                  createVNode(unref(_sfc_main$2), {
                    disabled: processing,
                    variant: "secondary"
                  }, {
                    default: withCtx(() => [
                      processing ? (openBlock(), createBlock(unref(_sfc_main$3), { key: 0 })) : createCommentVNode("", true),
                      createTextVNode(" Resend verification email ")
                    ]),
                    _: 2
                  }, 1032, ["disabled"]),
                  createVNode(_sfc_main$4, {
                    href: unref(logout)(),
                    as: "button",
                    class: "mx-auto block text-sm"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Log out ")
                    ]),
                    _: 1
                  }, 8, ["href"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/auth/VerifyEmail.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
