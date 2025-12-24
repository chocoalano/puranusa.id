import { defineComponent, mergeProps, withCtx, unref, createTextVNode, createBlock, createCommentVNode, openBlock, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$4 } from "./InputError-BhTWS2NZ.js";
import { _ as _sfc_main$5 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$3 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$2 } from "./Label-16aMY2sx.js";
import { _ as _sfc_main$6 } from "./Spinner-HF6xsI_i.js";
import { _ as _sfc_main$1 } from "./AuthLayout-DWijdgiY.js";
import { s as store } from "./index-C0MnmV4S.js";
import { Head, Form } from "@inertiajs/vue3";
import "class-variance-authority";
import "reka-ui";
import "clsx";
import "tailwind-merge";
import "@vueuse/core";
import "lucide-vue-next";
import "./AppLogoIcon-CtV9aC-8.js";
import "./index-B0NlPG4h.js";
import "./index--D7ld9AJ.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ConfirmPassword",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        title: "Confirm your password",
        description: "This is a secure area of the application. Please confirm your password before continuing."
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Confirm password" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Form), mergeProps(unref(store).form(), { "reset-on-success": "" }), {
              default: withCtx(({ errors, processing }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-6"${_scopeId2}><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$2), { htmlFor: "password" }, {
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
                    class: "mt-1 block w-full",
                    required: "",
                    autocomplete: "current-password",
                    autofocus: ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    message: errors.password
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="flex items-center"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), {
                    class: "w-full",
                    disabled: processing,
                    "data-test": "confirm-password-button"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (processing) {
                          _push4(ssrRenderComponent(unref(_sfc_main$6), null, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(` Confirm Password `);
                      } else {
                        return [
                          processing ? (openBlock(), createBlock(unref(_sfc_main$6), { key: 0 })) : createCommentVNode("", true),
                          createTextVNode(" Confirm Password ")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "space-y-6" }, [
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(unref(_sfc_main$2), { htmlFor: "password" }, {
                          default: withCtx(() => [
                            createTextVNode("Password")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$3), {
                          id: "password",
                          type: "password",
                          name: "password",
                          class: "mt-1 block w-full",
                          required: "",
                          autocomplete: "current-password",
                          autofocus: ""
                        }),
                        createVNode(_sfc_main$4, {
                          message: errors.password
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "flex items-center" }, [
                        createVNode(unref(_sfc_main$5), {
                          class: "w-full",
                          disabled: processing,
                          "data-test": "confirm-password-button"
                        }, {
                          default: withCtx(() => [
                            processing ? (openBlock(), createBlock(unref(_sfc_main$6), { key: 0 })) : createCommentVNode("", true),
                            createTextVNode(" Confirm Password ")
                          ]),
                          _: 2
                        }, 1032, ["disabled"])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Head), { title: "Confirm password" }),
              createVNode(unref(Form), mergeProps(unref(store).form(), { "reset-on-success": "" }), {
                default: withCtx(({ errors, processing }) => [
                  createVNode("div", { class: "space-y-6" }, [
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode(unref(_sfc_main$2), { htmlFor: "password" }, {
                        default: withCtx(() => [
                          createTextVNode("Password")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$3), {
                        id: "password",
                        type: "password",
                        name: "password",
                        class: "mt-1 block w-full",
                        required: "",
                        autocomplete: "current-password",
                        autofocus: ""
                      }),
                      createVNode(_sfc_main$4, {
                        message: errors.password
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "flex items-center" }, [
                      createVNode(unref(_sfc_main$5), {
                        class: "w-full",
                        disabled: processing,
                        "data-test": "confirm-password-button"
                      }, {
                        default: withCtx(() => [
                          processing ? (openBlock(), createBlock(unref(_sfc_main$6), { key: 0 })) : createCommentVNode("", true),
                          createTextVNode(" Confirm Password ")
                        ]),
                        _: 2
                      }, 1032, ["disabled"])
                    ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/auth/ConfirmPassword.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
