import { defineComponent, computed, ref, mergeProps, withCtx, unref, createBlock, openBlock, Fragment, renderList, createVNode, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$5 } from "./InputError-BhTWS2NZ.js";
import { _ as _sfc_main$6 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$7 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$2, a as _sfc_main$3, b as _sfc_main$4 } from "./PinInputSlot-gyWgw-xd.js";
import { _ as _sfc_main$1 } from "./AuthLayout-CxP_IsMW.js";
import { s as store } from "./index-CgCk0bTK.js";
import { Head, Form } from "@inertiajs/vue3";
import "class-variance-authority";
import "reka-ui";
import "clsx";
import "tailwind-merge";
import "@vueuse/core";
import "lucide-vue-next";
import "./AppLogoIcon-CtV9aC-8.js";
import "./index-Jhngbhhu.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TwoFactorChallenge",
  __ssrInlineRender: true,
  setup(__props) {
    const authConfigContent = computed(() => {
      if (showRecoveryInput.value) {
        return {
          title: "Recovery Code",
          description: "Please confirm access to your account by entering one of your emergency recovery codes.",
          toggleText: "login using an authentication code"
        };
      }
      return {
        title: "Authentication Code",
        description: "Enter the authentication code provided by your authenticator application.",
        toggleText: "login using a recovery code"
      };
    });
    const showRecoveryInput = ref(false);
    const toggleRecoveryMode = (clearErrors) => {
      showRecoveryInput.value = !showRecoveryInput.value;
      clearErrors();
      code.value = [];
    };
    const code = ref([]);
    const codeValue = computed(() => code.value.join(""));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        title: authConfigContent.value.title,
        description: authConfigContent.value.description
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Two-Factor Authentication" }, null, _parent2, _scopeId));
            _push2(`<div class="space-y-6"${_scopeId}>`);
            if (!showRecoveryInput.value) {
              _push2(ssrRenderComponent(unref(Form), mergeProps(unref(store).form(), {
                class: "space-y-4",
                "reset-on-error": "",
                onError: ($event) => code.value = []
              }), {
                default: withCtx(({ errors, processing, clearErrors }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<input type="hidden" name="code"${ssrRenderAttr("value", codeValue.value)}${_scopeId2}><div class="flex flex-col items-center justify-center space-y-3 text-center"${_scopeId2}><div class="flex w-full items-center justify-center"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$2), {
                      id: "otp",
                      placeholder: "○",
                      modelValue: code.value,
                      "onUpdate:modelValue": ($event) => code.value = $event,
                      type: "number",
                      otp: ""
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(_sfc_main$3), null, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(6, (id, index) => {
                                  _push5(ssrRenderComponent(unref(_sfc_main$4), {
                                    key: id,
                                    index,
                                    disabled: processing,
                                    autofocus: ""
                                  }, null, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(), createBlock(Fragment, null, renderList(6, (id, index) => {
                                    return createVNode(unref(_sfc_main$4), {
                                      key: id,
                                      index,
                                      disabled: processing,
                                      autofocus: ""
                                    }, null, 8, ["index", "disabled"]);
                                  }), 64))
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(_sfc_main$3), null, {
                              default: withCtx(() => [
                                (openBlock(), createBlock(Fragment, null, renderList(6, (id, index) => {
                                  return createVNode(unref(_sfc_main$4), {
                                    key: id,
                                    index,
                                    disabled: processing,
                                    autofocus: ""
                                  }, null, 8, ["index", "disabled"]);
                                }), 64))
                              ]),
                              _: 2
                            }, 1024)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                    _push3(ssrRenderComponent(_sfc_main$5, {
                      message: errors.code
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$6), {
                      type: "submit",
                      class: "w-full",
                      disabled: processing
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Continue`);
                        } else {
                          return [
                            createTextVNode("Continue")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`<div class="text-center text-sm text-muted-foreground"${_scopeId2}><span${_scopeId2}>or you can </span><button type="button" class="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"${_scopeId2}>${ssrInterpolate(authConfigContent.value.toggleText)}</button></div>`);
                  } else {
                    return [
                      createVNode("input", {
                        type: "hidden",
                        name: "code",
                        value: codeValue.value
                      }, null, 8, ["value"]),
                      createVNode("div", { class: "flex flex-col items-center justify-center space-y-3 text-center" }, [
                        createVNode("div", { class: "flex w-full items-center justify-center" }, [
                          createVNode(unref(_sfc_main$2), {
                            id: "otp",
                            placeholder: "○",
                            modelValue: code.value,
                            "onUpdate:modelValue": ($event) => code.value = $event,
                            type: "number",
                            otp: ""
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$3), null, {
                                default: withCtx(() => [
                                  (openBlock(), createBlock(Fragment, null, renderList(6, (id, index) => {
                                    return createVNode(unref(_sfc_main$4), {
                                      key: id,
                                      index,
                                      disabled: processing,
                                      autofocus: ""
                                    }, null, 8, ["index", "disabled"]);
                                  }), 64))
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1032, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode(_sfc_main$5, {
                          message: errors.code
                        }, null, 8, ["message"])
                      ]),
                      createVNode(unref(_sfc_main$6), {
                        type: "submit",
                        class: "w-full",
                        disabled: processing
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Continue")
                        ]),
                        _: 1
                      }, 8, ["disabled"]),
                      createVNode("div", { class: "text-center text-sm text-muted-foreground" }, [
                        createVNode("span", null, "or you can "),
                        createVNode("button", {
                          type: "button",
                          class: "text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500",
                          onClick: () => toggleRecoveryMode(clearErrors)
                        }, toDisplayString(authConfigContent.value.toggleText), 9, ["onClick"])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(unref(Form), mergeProps(unref(store).form(), {
                class: "space-y-4",
                "reset-on-error": ""
              }), {
                default: withCtx(({ errors, processing, clearErrors }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$7), {
                      name: "recovery_code",
                      type: "text",
                      placeholder: "Enter recovery code",
                      autofocus: showRecoveryInput.value,
                      required: ""
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_sfc_main$5, {
                      message: errors.recovery_code
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$6), {
                      type: "submit",
                      class: "w-full",
                      disabled: processing
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Continue`);
                        } else {
                          return [
                            createTextVNode("Continue")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`<div class="text-center text-sm text-muted-foreground"${_scopeId2}><span${_scopeId2}>or you can </span><button type="button" class="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"${_scopeId2}>${ssrInterpolate(authConfigContent.value.toggleText)}</button></div>`);
                  } else {
                    return [
                      createVNode(unref(_sfc_main$7), {
                        name: "recovery_code",
                        type: "text",
                        placeholder: "Enter recovery code",
                        autofocus: showRecoveryInput.value,
                        required: ""
                      }, null, 8, ["autofocus"]),
                      createVNode(_sfc_main$5, {
                        message: errors.recovery_code
                      }, null, 8, ["message"]),
                      createVNode(unref(_sfc_main$6), {
                        type: "submit",
                        class: "w-full",
                        disabled: processing
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Continue")
                        ]),
                        _: 1
                      }, 8, ["disabled"]),
                      createVNode("div", { class: "text-center text-sm text-muted-foreground" }, [
                        createVNode("span", null, "or you can "),
                        createVNode("button", {
                          type: "button",
                          class: "text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500",
                          onClick: () => toggleRecoveryMode(clearErrors)
                        }, toDisplayString(authConfigContent.value.toggleText), 9, ["onClick"])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Two-Factor Authentication" }),
              createVNode("div", { class: "space-y-6" }, [
                !showRecoveryInput.value ? (openBlock(), createBlock(unref(Form), mergeProps({ key: 0 }, unref(store).form(), {
                  class: "space-y-4",
                  "reset-on-error": "",
                  onError: ($event) => code.value = []
                }), {
                  default: withCtx(({ errors, processing, clearErrors }) => [
                    createVNode("input", {
                      type: "hidden",
                      name: "code",
                      value: codeValue.value
                    }, null, 8, ["value"]),
                    createVNode("div", { class: "flex flex-col items-center justify-center space-y-3 text-center" }, [
                      createVNode("div", { class: "flex w-full items-center justify-center" }, [
                        createVNode(unref(_sfc_main$2), {
                          id: "otp",
                          placeholder: "○",
                          modelValue: code.value,
                          "onUpdate:modelValue": ($event) => code.value = $event,
                          type: "number",
                          otp: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$3), null, {
                              default: withCtx(() => [
                                (openBlock(), createBlock(Fragment, null, renderList(6, (id, index) => {
                                  return createVNode(unref(_sfc_main$4), {
                                    key: id,
                                    index,
                                    disabled: processing,
                                    autofocus: ""
                                  }, null, 8, ["index", "disabled"]);
                                }), 64))
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1032, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode(_sfc_main$5, {
                        message: errors.code
                      }, null, 8, ["message"])
                    ]),
                    createVNode(unref(_sfc_main$6), {
                      type: "submit",
                      class: "w-full",
                      disabled: processing
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Continue")
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    createVNode("div", { class: "text-center text-sm text-muted-foreground" }, [
                      createVNode("span", null, "or you can "),
                      createVNode("button", {
                        type: "button",
                        class: "text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500",
                        onClick: () => toggleRecoveryMode(clearErrors)
                      }, toDisplayString(authConfigContent.value.toggleText), 9, ["onClick"])
                    ])
                  ]),
                  _: 1
                }, 16, ["onError"])) : (openBlock(), createBlock(unref(Form), mergeProps({ key: 1 }, unref(store).form(), {
                  class: "space-y-4",
                  "reset-on-error": ""
                }), {
                  default: withCtx(({ errors, processing, clearErrors }) => [
                    createVNode(unref(_sfc_main$7), {
                      name: "recovery_code",
                      type: "text",
                      placeholder: "Enter recovery code",
                      autofocus: showRecoveryInput.value,
                      required: ""
                    }, null, 8, ["autofocus"]),
                    createVNode(_sfc_main$5, {
                      message: errors.recovery_code
                    }, null, 8, ["message"]),
                    createVNode(unref(_sfc_main$6), {
                      type: "submit",
                      class: "w-full",
                      disabled: processing
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Continue")
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    createVNode("div", { class: "text-center text-sm text-muted-foreground" }, [
                      createVNode("span", null, "or you can "),
                      createVNode("button", {
                        type: "button",
                        class: "text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500",
                        onClick: () => toggleRecoveryMode(clearErrors)
                      }, toDisplayString(authConfigContent.value.toggleText), 9, ["onClick"])
                    ])
                  ]),
                  _: 1
                }, 16))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/auth/TwoFactorChallenge.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
