import { defineComponent, computed, unref, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, createBlock, openBlock, Fragment, renderList, useSSRContext, ref, useTemplateRef, onMounted, resolveDynamicComponent, createCommentVNode, nextTick, mergeModels, useModel, watch, onUnmounted } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderVNode, ssrRenderClass, ssrRenderAttr } from "vue/server-renderer";
import { _ as _sfc_main$p } from "./HeadingSmall-B1yfmTIh.js";
import { _ as _sfc_main$4, a as _sfc_main$5, b as _sfc_main$6 } from "./index-D3PKcwoM.js";
import { AlertCircle, LockKeyhole, EyeOff, Eye, RefreshCw, ScanLine, Check, Copy, ShieldCheck, ShieldBan } from "lucide-vue-next";
import { _ as _sfc_main$c } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$7, a as _sfc_main$8, b as _sfc_main$9, d as _sfc_main$a, c as _sfc_main$b } from "./CardTitle-sqUG0LTw.js";
import { r as recoveryCodes, s as secretKey, q as qrCode, b as regenerateRecoveryCodes, c as confirm, d as show, _ as _sfc_main$o, f as enable, g as disable } from "./Layout-Cli-uYCQ.js";
import { Form, Head } from "@inertiajs/vue3";
import { _ as _sfc_main$m } from "./InputError-BhTWS2NZ.js";
import { _ as _sfc_main$i } from "./Spinner-HF6xsI_i.js";
import { _ as _sfc_main$d, a as _sfc_main$e, b as _sfc_main$f, c as _sfc_main$g, d as _sfc_main$h } from "./DialogTrigger-DV-5YM1v.js";
import { _ as _sfc_main$j, a as _sfc_main$k, b as _sfc_main$l } from "./PinInputSlot-gyWgw-xd.js";
import { useClipboard } from "@vueuse/core";
import { _ as _sfc_main$q } from "./index-BpQimeTM.js";
import { _ as _sfc_main$n } from "./AppLayout-CDfd8drY.js";
import "class-variance-authority";
import "reka-ui";
import "clsx";
import "tailwind-merge";
import "./DropdownMenuTrigger-B1v6pHML.js";
import "./index-Jhngbhhu.js";
import "./index-CgCk0bTK.js";
import "./Input-BGi8wCMh.js";
import "./AvatarImage-DWFQMckn.js";
import "vue-sonner";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "AlertError",
  __ssrInlineRender: true,
  props: {
    errors: {},
    title: { default: "Something went wrong." }
  },
  setup(__props) {
    const props = __props;
    const uniqueErrors = computed(() => Array.from(new Set(props.errors)));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$4), mergeProps({ variant: "destructive" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(AlertCircle), { class: "size-4" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$5), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(__props.title)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(__props.title), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$6), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<ul class="list-inside list-disc text-sm"${_scopeId2}><!--[-->`);
                  ssrRenderList(uniqueErrors.value, (error, index) => {
                    _push3(`<li${_scopeId2}>${ssrInterpolate(error)}</li>`);
                  });
                  _push3(`<!--]--></ul>`);
                } else {
                  return [
                    createVNode("ul", { class: "list-inside list-disc text-sm" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(uniqueErrors.value, (error, index) => {
                        return openBlock(), createBlock("li", { key: index }, toDisplayString(error), 1);
                      }), 128))
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(AlertCircle), { class: "size-4" }),
              createVNode(unref(_sfc_main$5), null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(__props.title), 1)
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$6), null, {
                default: withCtx(() => [
                  createVNode("ul", { class: "list-inside list-disc text-sm" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(uniqueErrors.value, (error, index) => {
                      return openBlock(), createBlock("li", { key: index }, toDisplayString(error), 1);
                    }), 128))
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/AlertError.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const fetchJson = async (url) => {
  const response = await fetch(url, {
    headers: { Accept: "application/json" }
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status}`);
  }
  return response.json();
};
const errors = ref([]);
const manualSetupKey = ref(null);
const qrCodeSvg = ref(null);
const recoveryCodesList = ref([]);
const hasSetupData = computed(
  () => qrCodeSvg.value !== null && manualSetupKey.value !== null
);
const useTwoFactorAuth = () => {
  const fetchQrCode = async () => {
    try {
      const { svg } = await fetchJson(
        qrCode.url()
      );
      qrCodeSvg.value = svg;
    } catch {
      errors.value.push("Failed to fetch QR code");
      qrCodeSvg.value = null;
    }
  };
  const fetchSetupKey = async () => {
    try {
      const { secretKey: key } = await fetchJson(
        secretKey.url()
      );
      manualSetupKey.value = key;
    } catch {
      errors.value.push("Failed to fetch a setup key");
      manualSetupKey.value = null;
    }
  };
  const clearSetupData = () => {
    manualSetupKey.value = null;
    qrCodeSvg.value = null;
    clearErrors();
  };
  const clearErrors = () => {
    errors.value = [];
  };
  const clearTwoFactorAuthData = () => {
    clearSetupData();
    clearErrors();
    recoveryCodesList.value = [];
  };
  const fetchRecoveryCodes = async () => {
    try {
      clearErrors();
      recoveryCodesList.value = await fetchJson(
        recoveryCodes.url()
      );
    } catch {
      errors.value.push("Failed to fetch recovery codes");
      recoveryCodesList.value = [];
    }
  };
  const fetchSetupData = async () => {
    try {
      clearErrors();
      await Promise.all([fetchQrCode(), fetchSetupKey()]);
    } catch {
      qrCodeSvg.value = null;
      manualSetupKey.value = null;
    }
  };
  return {
    qrCodeSvg,
    manualSetupKey,
    recoveryCodesList,
    errors,
    hasSetupData,
    clearSetupData,
    clearErrors,
    clearTwoFactorAuthData,
    fetchQrCode,
    fetchSetupKey,
    fetchSetupData,
    fetchRecoveryCodes
  };
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "TwoFactorRecoveryCodes",
  __ssrInlineRender: true,
  setup(__props) {
    const { recoveryCodesList: recoveryCodesList2, fetchRecoveryCodes, errors: errors2 } = useTwoFactorAuth();
    const isRecoveryCodesVisible = ref(false);
    const recoveryCodeSectionRef = useTemplateRef("recoveryCodeSectionRef");
    const toggleRecoveryCodesVisibility = async () => {
      if (!isRecoveryCodesVisible.value && !recoveryCodesList2.value.length) {
        await fetchRecoveryCodes();
      }
      isRecoveryCodesVisible.value = !isRecoveryCodesVisible.value;
      if (isRecoveryCodesVisible.value) {
        await nextTick();
        recoveryCodeSectionRef.value?.scrollIntoView({ behavior: "smooth" });
      }
    };
    onMounted(async () => {
      if (!recoveryCodesList2.value.length) {
        await fetchRecoveryCodes();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$7), mergeProps({ class: "w-full" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$8), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$9), { class: "flex gap-3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(LockKeyhole), { class: "size-4" }, null, _parent4, _scopeId3));
                        _push4(`2FA Recovery Codes `);
                      } else {
                        return [
                          createVNode(unref(LockKeyhole), { class: "size-4" }),
                          createTextVNode("2FA Recovery Codes ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$a), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Recovery codes let you regain access if you lose your 2FA device. Store them in a secure password manager. `);
                      } else {
                        return [
                          createTextVNode(" Recovery codes let you regain access if you lose your 2FA device. Store them in a secure password manager. ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$9), { class: "flex gap-3" }, {
                      default: withCtx(() => [
                        createVNode(unref(LockKeyhole), { class: "size-4" }),
                        createTextVNode("2FA Recovery Codes ")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$a), null, {
                      default: withCtx(() => [
                        createTextVNode(" Recovery codes let you regain access if you lose your 2FA device. Store them in a secure password manager. ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$b), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex flex-col gap-3 select-none sm:flex-row sm:items-center sm:justify-between"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$c), {
                    onClick: toggleRecoveryCodesVisibility,
                    class: "w-fit"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        ssrRenderVNode(_push4, createVNode(resolveDynamicComponent(isRecoveryCodesVisible.value ? unref(EyeOff) : unref(Eye)), { class: "size-4" }, null), _parent4, _scopeId3);
                        _push4(` ${ssrInterpolate(isRecoveryCodesVisible.value ? "Hide" : "View")} Recovery Codes `);
                      } else {
                        return [
                          (openBlock(), createBlock(resolveDynamicComponent(isRecoveryCodesVisible.value ? unref(EyeOff) : unref(Eye)), { class: "size-4" })),
                          createTextVNode(" " + toDisplayString(isRecoveryCodesVisible.value ? "Hide" : "View") + " Recovery Codes ", 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (isRecoveryCodesVisible.value && unref(recoveryCodesList2).length) {
                    _push3(ssrRenderComponent(unref(Form), mergeProps(unref(regenerateRecoveryCodes).form(), {
                      method: "post",
                      options: { preserveScroll: true },
                      onSuccess: unref(fetchRecoveryCodes)
                    }), {
                      default: withCtx(({ processing }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(_sfc_main$c), {
                            variant: "secondary",
                            type: "submit",
                            disabled: processing
                          }, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(RefreshCw), null, null, _parent5, _scopeId4));
                                _push5(` Regenerate Codes `);
                              } else {
                                return [
                                  createVNode(unref(RefreshCw)),
                                  createTextVNode(" Regenerate Codes ")
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(_sfc_main$c), {
                              variant: "secondary",
                              type: "submit",
                              disabled: processing
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(RefreshCw)),
                                createTextVNode(" Regenerate Codes ")
                              ]),
                              _: 1
                            }, 8, ["disabled"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="${ssrRenderClass([
                    "relative overflow-hidden transition-all duration-300",
                    isRecoveryCodesVisible.value ? "h-auto opacity-100" : "h-0 opacity-0"
                  ])}"${_scopeId2}>`);
                  if (unref(errors2)?.length) {
                    _push3(`<div class="mt-6"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_sfc_main$3, { errors: unref(errors2) }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<div class="mt-3 space-y-3"${_scopeId2}><div class="grid gap-1 rounded-lg bg-muted p-4 font-mono text-sm"${_scopeId2}>`);
                    if (!unref(recoveryCodesList2).length) {
                      _push3(`<div class="space-y-2"${_scopeId2}><!--[-->`);
                      ssrRenderList(8, (n) => {
                        _push3(`<div class="h-4 animate-pulse rounded bg-muted-foreground/20"${_scopeId2}></div>`);
                      });
                      _push3(`<!--]--></div>`);
                    } else {
                      _push3(`<!--[-->`);
                      ssrRenderList(unref(recoveryCodesList2), (code, index) => {
                        _push3(`<div${_scopeId2}>${ssrInterpolate(code)}</div>`);
                      });
                      _push3(`<!--]-->`);
                    }
                    _push3(`</div><p class="text-xs text-muted-foreground select-none"${_scopeId2}> Each recovery code can be used once to access your account and will be removed after use. If you need more, click <span class="font-bold"${_scopeId2}>Regenerate Codes</span> above. </p></div>`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex flex-col gap-3 select-none sm:flex-row sm:items-center sm:justify-between" }, [
                      createVNode(unref(_sfc_main$c), {
                        onClick: toggleRecoveryCodesVisibility,
                        class: "w-fit"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(resolveDynamicComponent(isRecoveryCodesVisible.value ? unref(EyeOff) : unref(Eye)), { class: "size-4" })),
                          createTextVNode(" " + toDisplayString(isRecoveryCodesVisible.value ? "Hide" : "View") + " Recovery Codes ", 1)
                        ]),
                        _: 1
                      }),
                      isRecoveryCodesVisible.value && unref(recoveryCodesList2).length ? (openBlock(), createBlock(unref(Form), mergeProps({ key: 0 }, unref(regenerateRecoveryCodes).form(), {
                        method: "post",
                        options: { preserveScroll: true },
                        onSuccess: unref(fetchRecoveryCodes)
                      }), {
                        default: withCtx(({ processing }) => [
                          createVNode(unref(_sfc_main$c), {
                            variant: "secondary",
                            type: "submit",
                            disabled: processing
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(RefreshCw)),
                              createTextVNode(" Regenerate Codes ")
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ]),
                        _: 1
                      }, 16, ["onSuccess"])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", {
                      class: [
                        "relative overflow-hidden transition-all duration-300",
                        isRecoveryCodesVisible.value ? "h-auto opacity-100" : "h-0 opacity-0"
                      ]
                    }, [
                      unref(errors2)?.length ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-6"
                      }, [
                        createVNode(_sfc_main$3, { errors: unref(errors2) }, null, 8, ["errors"])
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "mt-3 space-y-3"
                      }, [
                        createVNode("div", {
                          ref_key: "recoveryCodeSectionRef",
                          ref: recoveryCodeSectionRef,
                          class: "grid gap-1 rounded-lg bg-muted p-4 font-mono text-sm"
                        }, [
                          !unref(recoveryCodesList2).length ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "space-y-2"
                          }, [
                            (openBlock(), createBlock(Fragment, null, renderList(8, (n) => {
                              return createVNode("div", {
                                key: n,
                                class: "h-4 animate-pulse rounded bg-muted-foreground/20"
                              });
                            }), 64))
                          ])) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(unref(recoveryCodesList2), (code, index) => {
                            return openBlock(), createBlock("div", { key: index }, toDisplayString(code), 1);
                          }), 128))
                        ], 512),
                        createVNode("p", { class: "text-xs text-muted-foreground select-none" }, [
                          createTextVNode(" Each recovery code can be used once to access your account and will be removed after use. If you need more, click "),
                          createVNode("span", { class: "font-bold" }, "Regenerate Codes"),
                          createTextVNode(" above. ")
                        ])
                      ]))
                    ], 2)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$8), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$9), { class: "flex gap-3" }, {
                    default: withCtx(() => [
                      createVNode(unref(LockKeyhole), { class: "size-4" }),
                      createTextVNode("2FA Recovery Codes ")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$a), null, {
                    default: withCtx(() => [
                      createTextVNode(" Recovery codes let you regain access if you lose your 2FA device. Store them in a secure password manager. ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$b), null, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex flex-col gap-3 select-none sm:flex-row sm:items-center sm:justify-between" }, [
                    createVNode(unref(_sfc_main$c), {
                      onClick: toggleRecoveryCodesVisibility,
                      class: "w-fit"
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(resolveDynamicComponent(isRecoveryCodesVisible.value ? unref(EyeOff) : unref(Eye)), { class: "size-4" })),
                        createTextVNode(" " + toDisplayString(isRecoveryCodesVisible.value ? "Hide" : "View") + " Recovery Codes ", 1)
                      ]),
                      _: 1
                    }),
                    isRecoveryCodesVisible.value && unref(recoveryCodesList2).length ? (openBlock(), createBlock(unref(Form), mergeProps({ key: 0 }, unref(regenerateRecoveryCodes).form(), {
                      method: "post",
                      options: { preserveScroll: true },
                      onSuccess: unref(fetchRecoveryCodes)
                    }), {
                      default: withCtx(({ processing }) => [
                        createVNode(unref(_sfc_main$c), {
                          variant: "secondary",
                          type: "submit",
                          disabled: processing
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(RefreshCw)),
                            createTextVNode(" Regenerate Codes ")
                          ]),
                          _: 1
                        }, 8, ["disabled"])
                      ]),
                      _: 1
                    }, 16, ["onSuccess"])) : createCommentVNode("", true)
                  ]),
                  createVNode("div", {
                    class: [
                      "relative overflow-hidden transition-all duration-300",
                      isRecoveryCodesVisible.value ? "h-auto opacity-100" : "h-0 opacity-0"
                    ]
                  }, [
                    unref(errors2)?.length ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "mt-6"
                    }, [
                      createVNode(_sfc_main$3, { errors: unref(errors2) }, null, 8, ["errors"])
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "mt-3 space-y-3"
                    }, [
                      createVNode("div", {
                        ref_key: "recoveryCodeSectionRef",
                        ref: recoveryCodeSectionRef,
                        class: "grid gap-1 rounded-lg bg-muted p-4 font-mono text-sm"
                      }, [
                        !unref(recoveryCodesList2).length ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "space-y-2"
                        }, [
                          (openBlock(), createBlock(Fragment, null, renderList(8, (n) => {
                            return createVNode("div", {
                              key: n,
                              class: "h-4 animate-pulse rounded bg-muted-foreground/20"
                            });
                          }), 64))
                        ])) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(unref(recoveryCodesList2), (code, index) => {
                          return openBlock(), createBlock("div", { key: index }, toDisplayString(code), 1);
                        }), 128))
                      ], 512),
                      createVNode("p", { class: "text-xs text-muted-foreground select-none" }, [
                        createTextVNode(" Each recovery code can be used once to access your account and will be removed after use. If you need more, click "),
                        createVNode("span", { class: "font-bold" }, "Regenerate Codes"),
                        createTextVNode(" above. ")
                      ])
                    ]))
                  ], 2)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/TwoFactorRecoveryCodes.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TwoFactorSetupModal",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    requiresConfirmation: { type: Boolean },
    twoFactorEnabled: { type: Boolean }
  }, {
    "isOpen": { type: Boolean },
    "isOpenModifiers": {}
  }),
  emits: ["update:isOpen"],
  setup(__props) {
    const props = __props;
    const isOpen = useModel(__props, "isOpen");
    const { copy, copied } = useClipboard();
    const { qrCodeSvg: qrCodeSvg2, manualSetupKey: manualSetupKey2, clearSetupData, fetchSetupData, errors: errors2 } = useTwoFactorAuth();
    const showVerificationStep = ref(false);
    const code = ref([]);
    const codeValue = computed(() => code.value.join(""));
    const pinInputContainerRef = useTemplateRef("pinInputContainerRef");
    const modalConfig = computed(() => {
      if (props.twoFactorEnabled) {
        return {
          title: "Two-Factor Authentication Enabled",
          description: "Two-factor authentication is now enabled. Scan the QR code or enter the setup key in your authenticator app.",
          buttonText: "Close"
        };
      }
      if (showVerificationStep.value) {
        return {
          title: "Verify Authentication Code",
          description: "Enter the 6-digit code from your authenticator app",
          buttonText: "Continue"
        };
      }
      return {
        title: "Enable Two-Factor Authentication",
        description: "To finish enabling two-factor authentication, scan the QR code or enter the setup key in your authenticator app",
        buttonText: "Continue"
      };
    });
    const handleModalNextStep = () => {
      if (props.requiresConfirmation) {
        showVerificationStep.value = true;
        nextTick(() => {
          pinInputContainerRef.value?.querySelector("input")?.focus();
        });
        return;
      }
      clearSetupData();
      isOpen.value = false;
    };
    const resetModalState = () => {
      if (props.twoFactorEnabled) {
        clearSetupData();
      }
      showVerificationStep.value = false;
      code.value = [];
    };
    watch(
      () => isOpen.value,
      async (isOpen2) => {
        if (!isOpen2) {
          resetModalState();
          return;
        }
        if (!qrCodeSvg2.value) {
          await fetchSetupData();
        }
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$d), mergeProps({
        open: isOpen.value,
        "onUpdate:open": ($event) => isOpen.value = $event
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$e), { class: "sm:max-w-md" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$f), { class: "flex items-center justify-center" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="mb-3 w-auto rounded-full border border-border bg-card p-0.5 shadow-sm"${_scopeId3}><div class="relative overflow-hidden rounded-full border border-border bg-muted p-2.5"${_scopeId3}><div class="absolute inset-0 grid grid-cols-5 opacity-50"${_scopeId3}><!--[-->`);
                        ssrRenderList(5, (i) => {
                          _push4(`<div class="border-r border-border last:border-r-0"${_scopeId3}></div>`);
                        });
                        _push4(`<!--]--></div><div class="absolute inset-0 grid grid-rows-5 opacity-50"${_scopeId3}><!--[-->`);
                        ssrRenderList(5, (i) => {
                          _push4(`<div class="border-b border-border last:border-b-0"${_scopeId3}></div>`);
                        });
                        _push4(`<!--]--></div>`);
                        _push4(ssrRenderComponent(unref(ScanLine), { class: "relative z-20 size-6 text-foreground" }, null, _parent4, _scopeId3));
                        _push4(`</div></div>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$g), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(modalConfig.value.title)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(modalConfig.value.title), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$h), { class: "text-center" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(modalConfig.value.description)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(modalConfig.value.description), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode("div", { class: "mb-3 w-auto rounded-full border border-border bg-card p-0.5 shadow-sm" }, [
                            createVNode("div", { class: "relative overflow-hidden rounded-full border border-border bg-muted p-2.5" }, [
                              createVNode("div", { class: "absolute inset-0 grid grid-cols-5 opacity-50" }, [
                                (openBlock(), createBlock(Fragment, null, renderList(5, (i) => {
                                  return createVNode("div", {
                                    key: `col-${i}`,
                                    class: "border-r border-border last:border-r-0"
                                  });
                                }), 64))
                              ]),
                              createVNode("div", { class: "absolute inset-0 grid grid-rows-5 opacity-50" }, [
                                (openBlock(), createBlock(Fragment, null, renderList(5, (i) => {
                                  return createVNode("div", {
                                    key: `row-${i}`,
                                    class: "border-b border-border last:border-b-0"
                                  });
                                }), 64))
                              ]),
                              createVNode(unref(ScanLine), { class: "relative z-20 size-6 text-foreground" })
                            ])
                          ]),
                          createVNode(unref(_sfc_main$g), null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(modalConfig.value.title), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$h), { class: "text-center" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(modalConfig.value.description), 1)
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="relative flex w-auto flex-col items-center justify-center space-y-5"${_scopeId2}>`);
                  if (!showVerificationStep.value) {
                    _push3(`<!--[-->`);
                    if (unref(errors2)?.length) {
                      _push3(ssrRenderComponent(_sfc_main$3, { errors: unref(errors2) }, null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!--[--><div class="relative mx-auto flex max-w-md items-center overflow-hidden"${_scopeId2}><div class="relative mx-auto aspect-square w-64 overflow-hidden rounded-lg border border-border"${_scopeId2}>`);
                      if (!unref(qrCodeSvg2)) {
                        _push3(`<div class="absolute inset-0 z-10 flex aspect-square h-auto w-full animate-pulse items-center justify-center bg-background"${_scopeId2}>`);
                        _push3(ssrRenderComponent(unref(_sfc_main$i), { class: "size-6" }, null, _parent3, _scopeId2));
                        _push3(`</div>`);
                      } else {
                        _push3(`<div class="relative z-10 overflow-hidden border p-5"${_scopeId2}><div class="flex aspect-square size-full items-center justify-center"${_scopeId2}>${unref(qrCodeSvg2) ?? ""}</div></div>`);
                      }
                      _push3(`</div></div><div class="flex w-full items-center space-x-5"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$c), {
                        class: "w-full",
                        onClick: handleModalNextStep
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(modalConfig.value.buttonText)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(modalConfig.value.buttonText), 1)
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(`</div><div class="relative flex w-full items-center justify-center"${_scopeId2}><div class="absolute inset-0 top-1/2 h-px w-full bg-border"${_scopeId2}></div><span class="relative bg-card px-2 py-1"${_scopeId2}>or, enter the code manually</span></div><div class="flex w-full items-center justify-center space-x-2"${_scopeId2}><div class="flex w-full items-stretch overflow-hidden rounded-xl border border-border"${_scopeId2}>`);
                      if (!unref(manualSetupKey2)) {
                        _push3(`<div class="flex h-full w-full items-center justify-center bg-muted p-3"${_scopeId2}>`);
                        _push3(ssrRenderComponent(unref(_sfc_main$i), null, null, _parent3, _scopeId2));
                        _push3(`</div>`);
                      } else {
                        _push3(`<!--[--><input type="text" readonly${ssrRenderAttr("value", unref(manualSetupKey2))} class="h-full w-full bg-background p-3 text-foreground"${_scopeId2}><button class="relative block h-auto border-l border-border px-3 hover:bg-muted"${_scopeId2}>`);
                        if (unref(copied)) {
                          _push3(ssrRenderComponent(unref(Check), { class: "w-4 text-green-500" }, null, _parent3, _scopeId2));
                        } else {
                          _push3(ssrRenderComponent(unref(Copy), { class: "w-4" }, null, _parent3, _scopeId2));
                        }
                        _push3(`</button><!--]-->`);
                      }
                      _push3(`</div></div><!--]-->`);
                    }
                    _push3(`<!--]-->`);
                  } else {
                    _push3(ssrRenderComponent(unref(Form), mergeProps(unref(confirm).form(), {
                      "reset-on-error": "",
                      onFinish: ($event) => code.value = [],
                      onSuccess: ($event) => isOpen.value = false
                    }), {
                      default: withCtx(({ errors: errors22, processing }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<input type="hidden" name="code"${ssrRenderAttr("value", codeValue.value)}${_scopeId3}><div class="relative w-full space-y-3"${_scopeId3}><div class="flex w-full flex-col items-center justify-center space-y-3 py-2"${_scopeId3}>`);
                          _push4(ssrRenderComponent(unref(_sfc_main$j), {
                            id: "otp",
                            placeholder: "○",
                            modelValue: code.value,
                            "onUpdate:modelValue": ($event) => code.value = $event,
                            type: "number",
                            otp: ""
                          }, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(_sfc_main$k), null, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<!--[-->`);
                                      ssrRenderList(6, (id, index) => {
                                        _push6(ssrRenderComponent(unref(_sfc_main$l), {
                                          autofocus: "",
                                          key: id,
                                          index,
                                          disabled: processing
                                        }, null, _parent6, _scopeId5));
                                      });
                                      _push6(`<!--]-->`);
                                    } else {
                                      return [
                                        (openBlock(), createBlock(Fragment, null, renderList(6, (id, index) => {
                                          return createVNode(unref(_sfc_main$l), {
                                            autofocus: "",
                                            key: id,
                                            index,
                                            disabled: processing
                                          }, null, 8, ["index", "disabled"]);
                                        }), 64))
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(_sfc_main$k), null, {
                                    default: withCtx(() => [
                                      (openBlock(), createBlock(Fragment, null, renderList(6, (id, index) => {
                                        return createVNode(unref(_sfc_main$l), {
                                          autofocus: "",
                                          key: id,
                                          index,
                                          disabled: processing
                                        }, null, 8, ["index", "disabled"]);
                                      }), 64))
                                    ]),
                                    _: 2
                                  }, 1024)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_sfc_main$m, {
                            message: errors22?.confirmTwoFactorAuthentication?.code
                          }, null, _parent4, _scopeId3));
                          _push4(`</div><div class="flex w-full items-center space-x-5"${_scopeId3}>`);
                          _push4(ssrRenderComponent(unref(_sfc_main$c), {
                            type: "button",
                            variant: "outline",
                            class: "w-auto flex-1",
                            onClick: ($event) => showVerificationStep.value = false,
                            disabled: processing
                          }, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` Back `);
                              } else {
                                return [
                                  createTextVNode(" Back ")
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$c), {
                            type: "submit",
                            class: "w-auto flex-1",
                            disabled: processing || codeValue.value.length < 6
                          }, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` Confirm `);
                              } else {
                                return [
                                  createTextVNode(" Confirm ")
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(`</div></div>`);
                        } else {
                          return [
                            createVNode("input", {
                              type: "hidden",
                              name: "code",
                              value: codeValue.value
                            }, null, 8, ["value"]),
                            createVNode("div", {
                              ref_key: "pinInputContainerRef",
                              ref: pinInputContainerRef,
                              class: "relative w-full space-y-3"
                            }, [
                              createVNode("div", { class: "flex w-full flex-col items-center justify-center space-y-3 py-2" }, [
                                createVNode(unref(_sfc_main$j), {
                                  id: "otp",
                                  placeholder: "○",
                                  modelValue: code.value,
                                  "onUpdate:modelValue": ($event) => code.value = $event,
                                  type: "number",
                                  otp: ""
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$k), null, {
                                      default: withCtx(() => [
                                        (openBlock(), createBlock(Fragment, null, renderList(6, (id, index) => {
                                          return createVNode(unref(_sfc_main$l), {
                                            autofocus: "",
                                            key: id,
                                            index,
                                            disabled: processing
                                          }, null, 8, ["index", "disabled"]);
                                        }), 64))
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1032, ["modelValue", "onUpdate:modelValue"]),
                                createVNode(_sfc_main$m, {
                                  message: errors22?.confirmTwoFactorAuthentication?.code
                                }, null, 8, ["message"])
                              ]),
                              createVNode("div", { class: "flex w-full items-center space-x-5" }, [
                                createVNode(unref(_sfc_main$c), {
                                  type: "button",
                                  variant: "outline",
                                  class: "w-auto flex-1",
                                  onClick: ($event) => showVerificationStep.value = false,
                                  disabled: processing
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Back ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick", "disabled"]),
                                createVNode(unref(_sfc_main$c), {
                                  type: "submit",
                                  class: "w-auto flex-1",
                                  disabled: processing || codeValue.value.length < 6
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Confirm ")
                                  ]),
                                  _: 1
                                }, 8, ["disabled"])
                              ])
                            ], 512)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode(unref(_sfc_main$f), { class: "flex items-center justify-center" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "mb-3 w-auto rounded-full border border-border bg-card p-0.5 shadow-sm" }, [
                          createVNode("div", { class: "relative overflow-hidden rounded-full border border-border bg-muted p-2.5" }, [
                            createVNode("div", { class: "absolute inset-0 grid grid-cols-5 opacity-50" }, [
                              (openBlock(), createBlock(Fragment, null, renderList(5, (i) => {
                                return createVNode("div", {
                                  key: `col-${i}`,
                                  class: "border-r border-border last:border-r-0"
                                });
                              }), 64))
                            ]),
                            createVNode("div", { class: "absolute inset-0 grid grid-rows-5 opacity-50" }, [
                              (openBlock(), createBlock(Fragment, null, renderList(5, (i) => {
                                return createVNode("div", {
                                  key: `row-${i}`,
                                  class: "border-b border-border last:border-b-0"
                                });
                              }), 64))
                            ]),
                            createVNode(unref(ScanLine), { class: "relative z-20 size-6 text-foreground" })
                          ])
                        ]),
                        createVNode(unref(_sfc_main$g), null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(modalConfig.value.title), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$h), { class: "text-center" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(modalConfig.value.description), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "relative flex w-auto flex-col items-center justify-center space-y-5" }, [
                      !showVerificationStep.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                        unref(errors2)?.length ? (openBlock(), createBlock(_sfc_main$3, {
                          key: 0,
                          errors: unref(errors2)
                        }, null, 8, ["errors"])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                          createVNode("div", { class: "relative mx-auto flex max-w-md items-center overflow-hidden" }, [
                            createVNode("div", { class: "relative mx-auto aspect-square w-64 overflow-hidden rounded-lg border border-border" }, [
                              !unref(qrCodeSvg2) ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "absolute inset-0 z-10 flex aspect-square h-auto w-full animate-pulse items-center justify-center bg-background"
                              }, [
                                createVNode(unref(_sfc_main$i), { class: "size-6" })
                              ])) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "relative z-10 overflow-hidden border p-5"
                              }, [
                                createVNode("div", {
                                  innerHTML: unref(qrCodeSvg2),
                                  class: "flex aspect-square size-full items-center justify-center"
                                }, null, 8, ["innerHTML"])
                              ]))
                            ])
                          ]),
                          createVNode("div", { class: "flex w-full items-center space-x-5" }, [
                            createVNode(unref(_sfc_main$c), {
                              class: "w-full",
                              onClick: handleModalNextStep
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(modalConfig.value.buttonText), 1)
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("div", { class: "relative flex w-full items-center justify-center" }, [
                            createVNode("div", { class: "absolute inset-0 top-1/2 h-px w-full bg-border" }),
                            createVNode("span", { class: "relative bg-card px-2 py-1" }, "or, enter the code manually")
                          ]),
                          createVNode("div", { class: "flex w-full items-center justify-center space-x-2" }, [
                            createVNode("div", { class: "flex w-full items-stretch overflow-hidden rounded-xl border border-border" }, [
                              !unref(manualSetupKey2) ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "flex h-full w-full items-center justify-center bg-muted p-3"
                              }, [
                                createVNode(unref(_sfc_main$i))
                              ])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                createVNode("input", {
                                  type: "text",
                                  readonly: "",
                                  value: unref(manualSetupKey2),
                                  class: "h-full w-full bg-background p-3 text-foreground"
                                }, null, 8, ["value"]),
                                createVNode("button", {
                                  onClick: ($event) => unref(copy)(unref(manualSetupKey2) || ""),
                                  class: "relative block h-auto border-l border-border px-3 hover:bg-muted"
                                }, [
                                  unref(copied) ? (openBlock(), createBlock(unref(Check), {
                                    key: 0,
                                    class: "w-4 text-green-500"
                                  })) : (openBlock(), createBlock(unref(Copy), {
                                    key: 1,
                                    class: "w-4"
                                  }))
                                ], 8, ["onClick"])
                              ], 64))
                            ])
                          ])
                        ], 64))
                      ], 64)) : (openBlock(), createBlock(unref(Form), mergeProps({ key: 1 }, unref(confirm).form(), {
                        "reset-on-error": "",
                        onFinish: ($event) => code.value = [],
                        onSuccess: ($event) => isOpen.value = false
                      }), {
                        default: withCtx(({ errors: errors22, processing }) => [
                          createVNode("input", {
                            type: "hidden",
                            name: "code",
                            value: codeValue.value
                          }, null, 8, ["value"]),
                          createVNode("div", {
                            ref_key: "pinInputContainerRef",
                            ref: pinInputContainerRef,
                            class: "relative w-full space-y-3"
                          }, [
                            createVNode("div", { class: "flex w-full flex-col items-center justify-center space-y-3 py-2" }, [
                              createVNode(unref(_sfc_main$j), {
                                id: "otp",
                                placeholder: "○",
                                modelValue: code.value,
                                "onUpdate:modelValue": ($event) => code.value = $event,
                                type: "number",
                                otp: ""
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$k), null, {
                                    default: withCtx(() => [
                                      (openBlock(), createBlock(Fragment, null, renderList(6, (id, index) => {
                                        return createVNode(unref(_sfc_main$l), {
                                          autofocus: "",
                                          key: id,
                                          index,
                                          disabled: processing
                                        }, null, 8, ["index", "disabled"]);
                                      }), 64))
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1032, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_sfc_main$m, {
                                message: errors22?.confirmTwoFactorAuthentication?.code
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", { class: "flex w-full items-center space-x-5" }, [
                              createVNode(unref(_sfc_main$c), {
                                type: "button",
                                variant: "outline",
                                class: "w-auto flex-1",
                                onClick: ($event) => showVerificationStep.value = false,
                                disabled: processing
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Back ")
                                ]),
                                _: 1
                              }, 8, ["onClick", "disabled"]),
                              createVNode(unref(_sfc_main$c), {
                                type: "submit",
                                class: "w-auto flex-1",
                                disabled: processing || codeValue.value.length < 6
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Confirm ")
                                ]),
                                _: 1
                              }, 8, ["disabled"])
                            ])
                          ], 512)
                        ]),
                        _: 1
                      }, 16, ["onFinish", "onSuccess"]))
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$e), { class: "sm:max-w-md" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$f), { class: "flex items-center justify-center" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "mb-3 w-auto rounded-full border border-border bg-card p-0.5 shadow-sm" }, [
                        createVNode("div", { class: "relative overflow-hidden rounded-full border border-border bg-muted p-2.5" }, [
                          createVNode("div", { class: "absolute inset-0 grid grid-cols-5 opacity-50" }, [
                            (openBlock(), createBlock(Fragment, null, renderList(5, (i) => {
                              return createVNode("div", {
                                key: `col-${i}`,
                                class: "border-r border-border last:border-r-0"
                              });
                            }), 64))
                          ]),
                          createVNode("div", { class: "absolute inset-0 grid grid-rows-5 opacity-50" }, [
                            (openBlock(), createBlock(Fragment, null, renderList(5, (i) => {
                              return createVNode("div", {
                                key: `row-${i}`,
                                class: "border-b border-border last:border-b-0"
                              });
                            }), 64))
                          ]),
                          createVNode(unref(ScanLine), { class: "relative z-20 size-6 text-foreground" })
                        ])
                      ]),
                      createVNode(unref(_sfc_main$g), null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(modalConfig.value.title), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$h), { class: "text-center" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(modalConfig.value.description), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "relative flex w-auto flex-col items-center justify-center space-y-5" }, [
                    !showVerificationStep.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                      unref(errors2)?.length ? (openBlock(), createBlock(_sfc_main$3, {
                        key: 0,
                        errors: unref(errors2)
                      }, null, 8, ["errors"])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                        createVNode("div", { class: "relative mx-auto flex max-w-md items-center overflow-hidden" }, [
                          createVNode("div", { class: "relative mx-auto aspect-square w-64 overflow-hidden rounded-lg border border-border" }, [
                            !unref(qrCodeSvg2) ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "absolute inset-0 z-10 flex aspect-square h-auto w-full animate-pulse items-center justify-center bg-background"
                            }, [
                              createVNode(unref(_sfc_main$i), { class: "size-6" })
                            ])) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "relative z-10 overflow-hidden border p-5"
                            }, [
                              createVNode("div", {
                                innerHTML: unref(qrCodeSvg2),
                                class: "flex aspect-square size-full items-center justify-center"
                              }, null, 8, ["innerHTML"])
                            ]))
                          ])
                        ]),
                        createVNode("div", { class: "flex w-full items-center space-x-5" }, [
                          createVNode(unref(_sfc_main$c), {
                            class: "w-full",
                            onClick: handleModalNextStep
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(modalConfig.value.buttonText), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", { class: "relative flex w-full items-center justify-center" }, [
                          createVNode("div", { class: "absolute inset-0 top-1/2 h-px w-full bg-border" }),
                          createVNode("span", { class: "relative bg-card px-2 py-1" }, "or, enter the code manually")
                        ]),
                        createVNode("div", { class: "flex w-full items-center justify-center space-x-2" }, [
                          createVNode("div", { class: "flex w-full items-stretch overflow-hidden rounded-xl border border-border" }, [
                            !unref(manualSetupKey2) ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "flex h-full w-full items-center justify-center bg-muted p-3"
                            }, [
                              createVNode(unref(_sfc_main$i))
                            ])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                              createVNode("input", {
                                type: "text",
                                readonly: "",
                                value: unref(manualSetupKey2),
                                class: "h-full w-full bg-background p-3 text-foreground"
                              }, null, 8, ["value"]),
                              createVNode("button", {
                                onClick: ($event) => unref(copy)(unref(manualSetupKey2) || ""),
                                class: "relative block h-auto border-l border-border px-3 hover:bg-muted"
                              }, [
                                unref(copied) ? (openBlock(), createBlock(unref(Check), {
                                  key: 0,
                                  class: "w-4 text-green-500"
                                })) : (openBlock(), createBlock(unref(Copy), {
                                  key: 1,
                                  class: "w-4"
                                }))
                              ], 8, ["onClick"])
                            ], 64))
                          ])
                        ])
                      ], 64))
                    ], 64)) : (openBlock(), createBlock(unref(Form), mergeProps({ key: 1 }, unref(confirm).form(), {
                      "reset-on-error": "",
                      onFinish: ($event) => code.value = [],
                      onSuccess: ($event) => isOpen.value = false
                    }), {
                      default: withCtx(({ errors: errors22, processing }) => [
                        createVNode("input", {
                          type: "hidden",
                          name: "code",
                          value: codeValue.value
                        }, null, 8, ["value"]),
                        createVNode("div", {
                          ref_key: "pinInputContainerRef",
                          ref: pinInputContainerRef,
                          class: "relative w-full space-y-3"
                        }, [
                          createVNode("div", { class: "flex w-full flex-col items-center justify-center space-y-3 py-2" }, [
                            createVNode(unref(_sfc_main$j), {
                              id: "otp",
                              placeholder: "○",
                              modelValue: code.value,
                              "onUpdate:modelValue": ($event) => code.value = $event,
                              type: "number",
                              otp: ""
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$k), null, {
                                  default: withCtx(() => [
                                    (openBlock(), createBlock(Fragment, null, renderList(6, (id, index) => {
                                      return createVNode(unref(_sfc_main$l), {
                                        autofocus: "",
                                        key: id,
                                        index,
                                        disabled: processing
                                      }, null, 8, ["index", "disabled"]);
                                    }), 64))
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1032, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_sfc_main$m, {
                              message: errors22?.confirmTwoFactorAuthentication?.code
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", { class: "flex w-full items-center space-x-5" }, [
                            createVNode(unref(_sfc_main$c), {
                              type: "button",
                              variant: "outline",
                              class: "w-auto flex-1",
                              onClick: ($event) => showVerificationStep.value = false,
                              disabled: processing
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Back ")
                              ]),
                              _: 1
                            }, 8, ["onClick", "disabled"]),
                            createVNode(unref(_sfc_main$c), {
                              type: "submit",
                              class: "w-auto flex-1",
                              disabled: processing || codeValue.value.length < 6
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Confirm ")
                              ]),
                              _: 1
                            }, 8, ["disabled"])
                          ])
                        ], 512)
                      ]),
                      _: 1
                    }, 16, ["onFinish", "onSuccess"]))
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/TwoFactorSetupModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TwoFactor",
  __ssrInlineRender: true,
  props: {
    requiresConfirmation: { type: Boolean, default: false },
    twoFactorEnabled: { type: Boolean, default: false }
  },
  setup(__props) {
    const breadcrumbs = [
      {
        title: "Two-Factor Authentication",
        href: show.url()
      }
    ];
    const { hasSetupData: hasSetupData2, clearTwoFactorAuthData } = useTwoFactorAuth();
    const showSetupModal = ref(false);
    onUnmounted(() => {
      clearTwoFactorAuthData();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$n, mergeProps({ breadcrumbs }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Two-Factor Authentication" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$o, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-6"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$p, {
                    title: "Two-Factor Authentication",
                    description: "Manage your two-factor authentication settings"
                  }, null, _parent3, _scopeId2));
                  if (!__props.twoFactorEnabled) {
                    _push3(`<div class="flex flex-col items-start justify-start space-y-4"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$q), { variant: "destructive" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Disabled`);
                        } else {
                          return [
                            createTextVNode("Disabled")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<p class="text-muted-foreground"${_scopeId2}> When you enable two-factor authentication, you will be prompted for a secure pin during login. This pin can be retrieved from a TOTP-supported application on your phone. </p><div${_scopeId2}>`);
                    if (unref(hasSetupData2)) {
                      _push3(ssrRenderComponent(unref(_sfc_main$c), {
                        onClick: ($event) => showSetupModal.value = true
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(ShieldCheck), null, null, _parent4, _scopeId3));
                            _push4(`Continue Setup `);
                          } else {
                            return [
                              createVNode(unref(ShieldCheck)),
                              createTextVNode("Continue Setup ")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(ssrRenderComponent(unref(Form), mergeProps(unref(enable).form(), {
                        onSuccess: ($event) => showSetupModal.value = true
                      }), {
                        default: withCtx(({ processing }, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(_sfc_main$c), {
                              type: "submit",
                              disabled: processing
                            }, {
                              default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(unref(ShieldCheck), null, null, _parent5, _scopeId4));
                                  _push5(`Enable 2FA`);
                                } else {
                                  return [
                                    createVNode(unref(ShieldCheck)),
                                    createTextVNode("Enable 2FA")
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(unref(_sfc_main$c), {
                                type: "submit",
                                disabled: processing
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(ShieldCheck)),
                                  createTextVNode("Enable 2FA")
                                ]),
                                _: 1
                              }, 8, ["disabled"])
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    }
                    _push3(`</div></div>`);
                  } else {
                    _push3(`<div class="flex flex-col items-start justify-start space-y-4"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$q), { variant: "default" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Enabled`);
                        } else {
                          return [
                            createTextVNode("Enabled")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<p class="text-muted-foreground"${_scopeId2}> With two-factor authentication enabled, you will be prompted for a secure, random pin during login, which you can retrieve from the TOTP-supported application on your phone. </p>`);
                    _push3(ssrRenderComponent(_sfc_main$2, null, null, _parent3, _scopeId2));
                    _push3(`<div class="relative inline"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Form), unref(disable).form(), {
                      default: withCtx(({ processing }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(_sfc_main$c), {
                            variant: "destructive",
                            type: "submit",
                            disabled: processing
                          }, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(ShieldBan), null, null, _parent5, _scopeId4));
                                _push5(` Disable 2FA `);
                              } else {
                                return [
                                  createVNode(unref(ShieldBan)),
                                  createTextVNode(" Disable 2FA ")
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(_sfc_main$c), {
                              variant: "destructive",
                              type: "submit",
                              disabled: processing
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(ShieldBan)),
                                createTextVNode(" Disable 2FA ")
                              ]),
                              _: 1
                            }, 8, ["disabled"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div></div>`);
                  }
                  _push3(ssrRenderComponent(_sfc_main$1, {
                    isOpen: showSetupModal.value,
                    "onUpdate:isOpen": ($event) => showSetupModal.value = $event,
                    requiresConfirmation: __props.requiresConfirmation,
                    twoFactorEnabled: __props.twoFactorEnabled
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "space-y-6" }, [
                      createVNode(_sfc_main$p, {
                        title: "Two-Factor Authentication",
                        description: "Manage your two-factor authentication settings"
                      }),
                      !__props.twoFactorEnabled ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex flex-col items-start justify-start space-y-4"
                      }, [
                        createVNode(unref(_sfc_main$q), { variant: "destructive" }, {
                          default: withCtx(() => [
                            createTextVNode("Disabled")
                          ]),
                          _: 1
                        }),
                        createVNode("p", { class: "text-muted-foreground" }, " When you enable two-factor authentication, you will be prompted for a secure pin during login. This pin can be retrieved from a TOTP-supported application on your phone. "),
                        createVNode("div", null, [
                          unref(hasSetupData2) ? (openBlock(), createBlock(unref(_sfc_main$c), {
                            key: 0,
                            onClick: ($event) => showSetupModal.value = true
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(ShieldCheck)),
                              createTextVNode("Continue Setup ")
                            ]),
                            _: 1
                          }, 8, ["onClick"])) : (openBlock(), createBlock(unref(Form), mergeProps({ key: 1 }, unref(enable).form(), {
                            onSuccess: ($event) => showSetupModal.value = true
                          }), {
                            default: withCtx(({ processing }) => [
                              createVNode(unref(_sfc_main$c), {
                                type: "submit",
                                disabled: processing
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(ShieldCheck)),
                                  createTextVNode("Enable 2FA")
                                ]),
                                _: 1
                              }, 8, ["disabled"])
                            ]),
                            _: 1
                          }, 16, ["onSuccess"]))
                        ])
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex flex-col items-start justify-start space-y-4"
                      }, [
                        createVNode(unref(_sfc_main$q), { variant: "default" }, {
                          default: withCtx(() => [
                            createTextVNode("Enabled")
                          ]),
                          _: 1
                        }),
                        createVNode("p", { class: "text-muted-foreground" }, " With two-factor authentication enabled, you will be prompted for a secure, random pin during login, which you can retrieve from the TOTP-supported application on your phone. "),
                        createVNode(_sfc_main$2),
                        createVNode("div", { class: "relative inline" }, [
                          createVNode(unref(Form), unref(disable).form(), {
                            default: withCtx(({ processing }) => [
                              createVNode(unref(_sfc_main$c), {
                                variant: "destructive",
                                type: "submit",
                                disabled: processing
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(ShieldBan)),
                                  createTextVNode(" Disable 2FA ")
                                ]),
                                _: 1
                              }, 8, ["disabled"])
                            ]),
                            _: 1
                          }, 16)
                        ])
                      ])),
                      createVNode(_sfc_main$1, {
                        isOpen: showSetupModal.value,
                        "onUpdate:isOpen": ($event) => showSetupModal.value = $event,
                        requiresConfirmation: __props.requiresConfirmation,
                        twoFactorEnabled: __props.twoFactorEnabled
                      }, null, 8, ["isOpen", "onUpdate:isOpen", "requiresConfirmation", "twoFactorEnabled"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Head), { title: "Two-Factor Authentication" }),
              createVNode(_sfc_main$o, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "space-y-6" }, [
                    createVNode(_sfc_main$p, {
                      title: "Two-Factor Authentication",
                      description: "Manage your two-factor authentication settings"
                    }),
                    !__props.twoFactorEnabled ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex flex-col items-start justify-start space-y-4"
                    }, [
                      createVNode(unref(_sfc_main$q), { variant: "destructive" }, {
                        default: withCtx(() => [
                          createTextVNode("Disabled")
                        ]),
                        _: 1
                      }),
                      createVNode("p", { class: "text-muted-foreground" }, " When you enable two-factor authentication, you will be prompted for a secure pin during login. This pin can be retrieved from a TOTP-supported application on your phone. "),
                      createVNode("div", null, [
                        unref(hasSetupData2) ? (openBlock(), createBlock(unref(_sfc_main$c), {
                          key: 0,
                          onClick: ($event) => showSetupModal.value = true
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(ShieldCheck)),
                            createTextVNode("Continue Setup ")
                          ]),
                          _: 1
                        }, 8, ["onClick"])) : (openBlock(), createBlock(unref(Form), mergeProps({ key: 1 }, unref(enable).form(), {
                          onSuccess: ($event) => showSetupModal.value = true
                        }), {
                          default: withCtx(({ processing }) => [
                            createVNode(unref(_sfc_main$c), {
                              type: "submit",
                              disabled: processing
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(ShieldCheck)),
                                createTextVNode("Enable 2FA")
                              ]),
                              _: 1
                            }, 8, ["disabled"])
                          ]),
                          _: 1
                        }, 16, ["onSuccess"]))
                      ])
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "flex flex-col items-start justify-start space-y-4"
                    }, [
                      createVNode(unref(_sfc_main$q), { variant: "default" }, {
                        default: withCtx(() => [
                          createTextVNode("Enabled")
                        ]),
                        _: 1
                      }),
                      createVNode("p", { class: "text-muted-foreground" }, " With two-factor authentication enabled, you will be prompted for a secure, random pin during login, which you can retrieve from the TOTP-supported application on your phone. "),
                      createVNode(_sfc_main$2),
                      createVNode("div", { class: "relative inline" }, [
                        createVNode(unref(Form), unref(disable).form(), {
                          default: withCtx(({ processing }) => [
                            createVNode(unref(_sfc_main$c), {
                              variant: "destructive",
                              type: "submit",
                              disabled: processing
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(ShieldBan)),
                                createTextVNode(" Disable 2FA ")
                              ]),
                              _: 1
                            }, 8, ["disabled"])
                          ]),
                          _: 1
                        }, 16)
                      ])
                    ])),
                    createVNode(_sfc_main$1, {
                      isOpen: showSetupModal.value,
                      "onUpdate:isOpen": ($event) => showSetupModal.value = $event,
                      requiresConfirmation: __props.requiresConfirmation,
                      twoFactorEnabled: __props.twoFactorEnabled
                    }, null, 8, ["isOpen", "onUpdate:isOpen", "requiresConfirmation", "twoFactorEnabled"])
                  ])
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/settings/TwoFactor.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
