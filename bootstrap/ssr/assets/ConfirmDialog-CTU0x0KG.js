import { defineComponent, unref, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1, b as _sfc_main$2, c as _sfc_main$3, d as _sfc_main$4, e as _sfc_main$5, f as _sfc_main$6, g as _sfc_main$7, h as _sfc_main$8 } from "./AlertDialogTrigger-DIWb7xue.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ConfirmDialog",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean },
    title: {},
    description: {},
    confirmText: { default: "Konfirmasi" },
    cancelText: { default: "Batal" },
    variant: { default: "default" }
  },
  emits: ["update:open", "confirm", "cancel"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const handleConfirm = () => {
      emit("confirm");
      emit("update:open", false);
    };
    const handleCancel = () => {
      emit("cancel");
      emit("update:open", false);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$1), mergeProps({
        open: __props.open,
        "onUpdate:open": ($event) => emit("update:open", $event)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$4), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(__props.title)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(__props.title), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(__props.description)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(__props.description), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$4), null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(__props.title), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(__props.description), 1)
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$7), { onClick: handleCancel }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(__props.cancelText)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(__props.cancelText), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$8), {
                          class: {
                            "bg-destructive text-destructive-foreground hover:bg-destructive/90": __props.variant === "destructive"
                          },
                          onClick: handleConfirm
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(__props.confirmText)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(__props.confirmText), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$7), { onClick: handleCancel }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(__props.cancelText), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$8), {
                            class: {
                              "bg-destructive text-destructive-foreground hover:bg-destructive/90": __props.variant === "destructive"
                            },
                            onClick: handleConfirm
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(__props.confirmText), 1)
                            ]),
                            _: 1
                          }, 8, ["class"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$4), null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(__props.title), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(__props.description), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$7), { onClick: handleCancel }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(__props.cancelText), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), {
                          class: {
                            "bg-destructive text-destructive-foreground hover:bg-destructive/90": __props.variant === "destructive"
                          },
                          onClick: handleConfirm
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(__props.confirmText), 1)
                          ]),
                          _: 1
                        }, 8, ["class"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$4), null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(__props.title), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(__props.description), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$6), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$7), { onClick: handleCancel }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(__props.cancelText), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$8), {
                        class: {
                          "bg-destructive text-destructive-foreground hover:bg-destructive/90": __props.variant === "destructive"
                        },
                        onClick: handleConfirm
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(__props.confirmText), 1)
                        ]),
                        _: 1
                      }, 8, ["class"])
                    ]),
                    _: 1
                  })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ConfirmDialog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
