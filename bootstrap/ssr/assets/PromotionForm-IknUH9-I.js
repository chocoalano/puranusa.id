import { defineComponent, mergeModels, useModel, mergeProps, unref, withCtx, createTextVNode, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, withDirectives, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderSlot } from "vue/server-renderer";
import { _ as _sfc_main$7 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$6 } from "./Label-16aMY2sx.js";
import { _ as _sfc_main$d } from "./Textarea-pcFPh_uS.js";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, d as _sfc_main$4, c as _sfc_main$5 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$8, a as _sfc_main$9, b as _sfc_main$a, c as _sfc_main$b, d as _sfc_main$c } from "./SelectValue-BUnv4mQg.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PromotionForm",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    errors: {},
    processing: { type: Boolean }
  }, {
    "formData": { required: true },
    "formDataModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["submit"], ["update:formData"]),
  setup(__props, { emit: __emit }) {
    const formData = useModel(__props, "formData");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<form${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Informasi Dasar`);
                      } else {
                        return [
                          createTextVNode("Informasi Dasar")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Detail utama promosi atau diskon`);
                      } else {
                        return [
                          createTextVNode("Detail utama promosi atau diskon")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Informasi Dasar")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createTextVNode("Detail utama promosi atau diskon")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$5), { class: "space-y-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid gap-4 md:grid-cols-2"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "code" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Kode Promosi *`);
                      } else {
                        return [
                          createTextVNode("Kode Promosi *")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    id: "code",
                    modelValue: formData.value.code,
                    "onUpdate:modelValue": ($event) => formData.value.code = $event,
                    placeholder: "PROMO2024",
                    class: "uppercase",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  if (__props.errors?.code) {
                    _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(__props.errors.code)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "name" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Nama Promosi *`);
                      } else {
                        return [
                          createTextVNode("Nama Promosi *")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    id: "name",
                    modelValue: formData.value.name,
                    "onUpdate:modelValue": ($event) => formData.value.name = $event,
                    placeholder: "Flash Sale Akhir Tahun",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  if (__props.errors?.name) {
                    _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(__props.errors.name)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div></div><div class="grid gap-4 md:grid-cols-2"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "type" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Tipe Promosi *`);
                      } else {
                        return [
                          createTextVNode("Tipe Promosi *")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$8), {
                    modelValue: formData.value.type,
                    "onUpdate:modelValue": ($event) => formData.value.type = $event,
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { id: "type" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$a), { placeholder: "Pilih tipe" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$a), { placeholder: "Pilih tipe" })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$b), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$c), { value: "discount" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Diskon`);
                                  } else {
                                    return [
                                      createTextVNode("Diskon")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), { value: "bundle" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Bundle`);
                                  } else {
                                    return [
                                      createTextVNode("Bundle")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), { value: "flash_sale" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Flash Sale`);
                                  } else {
                                    return [
                                      createTextVNode("Flash Sale")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), { value: "promo" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Promo`);
                                  } else {
                                    return [
                                      createTextVNode("Promo")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$c), { value: "discount" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Diskon")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), { value: "bundle" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Bundle")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), { value: "flash_sale" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Flash Sale")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), { value: "promo" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Promo")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$9), { id: "type" }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$a), { placeholder: "Pilih tipe" })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$b), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$c), { value: "discount" }, {
                                default: withCtx(() => [
                                  createTextVNode("Diskon")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), { value: "bundle" }, {
                                default: withCtx(() => [
                                  createTextVNode("Bundle")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), { value: "flash_sale" }, {
                                default: withCtx(() => [
                                  createTextVNode("Flash Sale")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), { value: "promo" }, {
                                default: withCtx(() => [
                                  createTextVNode("Promo")
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
                  }, _parent3, _scopeId2));
                  if (__props.errors?.type) {
                    _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(__props.errors.type)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "landing_slug" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Landing Page Slug`);
                      } else {
                        return [
                          createTextVNode("Landing Page Slug")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    id: "landing_slug",
                    modelValue: formData.value.landing_slug,
                    "onUpdate:modelValue": ($event) => formData.value.landing_slug = $event,
                    placeholder: "flash-sale-2024"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "description" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Deskripsi`);
                      } else {
                        return [
                          createTextVNode("Deskripsi")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$d), {
                    id: "description",
                    modelValue: formData.value.description,
                    "onUpdate:modelValue": ($event) => formData.value.description = $event,
                    placeholder: "Deskripsi promosi (opsional)",
                    rows: "3"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "image" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`URL Gambar`);
                      } else {
                        return [
                          createTextVNode("URL Gambar")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    id: "image",
                    modelValue: formData.value.image,
                    "onUpdate:modelValue": ($event) => formData.value.image = $event,
                    placeholder: "https://example.com/promo-banner.jpg"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$6), { for: "code" }, {
                          default: withCtx(() => [
                            createTextVNode("Kode Promosi *")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$7), {
                          id: "code",
                          modelValue: formData.value.code,
                          "onUpdate:modelValue": ($event) => formData.value.code = $event,
                          placeholder: "PROMO2024",
                          class: "uppercase",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        __props.errors?.code ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-destructive"
                        }, toDisplayString(__props.errors.code), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$6), { for: "name" }, {
                          default: withCtx(() => [
                            createTextVNode("Nama Promosi *")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$7), {
                          id: "name",
                          modelValue: formData.value.name,
                          "onUpdate:modelValue": ($event) => formData.value.name = $event,
                          placeholder: "Flash Sale Akhir Tahun",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        __props.errors?.name ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-destructive"
                        }, toDisplayString(__props.errors.name), 1)) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$6), { for: "type" }, {
                          default: withCtx(() => [
                            createTextVNode("Tipe Promosi *")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), {
                          modelValue: formData.value.type,
                          "onUpdate:modelValue": ($event) => formData.value.type = $event,
                          required: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$9), { id: "type" }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$a), { placeholder: "Pilih tipe" })
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$b), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$c), { value: "discount" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Diskon")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), { value: "bundle" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Bundle")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), { value: "flash_sale" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Flash Sale")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), { value: "promo" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Promo")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"]),
                        __props.errors?.type ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-destructive"
                        }, toDisplayString(__props.errors.type), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$6), { for: "landing_slug" }, {
                          default: withCtx(() => [
                            createTextVNode("Landing Page Slug")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$7), {
                          id: "landing_slug",
                          modelValue: formData.value.landing_slug,
                          "onUpdate:modelValue": ($event) => formData.value.landing_slug = $event,
                          placeholder: "flash-sale-2024"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), { for: "description" }, {
                        default: withCtx(() => [
                          createTextVNode("Deskripsi")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$d), {
                        id: "description",
                        modelValue: formData.value.description,
                        "onUpdate:modelValue": ($event) => formData.value.description = $event,
                        placeholder: "Deskripsi promosi (opsional)",
                        rows: "3"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), { for: "image" }, {
                        default: withCtx(() => [
                          createTextVNode("URL Gambar")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), {
                        id: "image",
                        modelValue: formData.value.image,
                        "onUpdate:modelValue": ($event) => formData.value.image = $event,
                        placeholder: "https://example.com/promo-banner.jpg"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
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
                      createTextVNode("Informasi Dasar")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createTextVNode("Detail utama promosi atau diskon")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), { class: "space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), { for: "code" }, {
                        default: withCtx(() => [
                          createTextVNode("Kode Promosi *")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), {
                        id: "code",
                        modelValue: formData.value.code,
                        "onUpdate:modelValue": ($event) => formData.value.code = $event,
                        placeholder: "PROMO2024",
                        class: "uppercase",
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      __props.errors?.code ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-destructive"
                      }, toDisplayString(__props.errors.code), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), { for: "name" }, {
                        default: withCtx(() => [
                          createTextVNode("Nama Promosi *")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), {
                        id: "name",
                        modelValue: formData.value.name,
                        "onUpdate:modelValue": ($event) => formData.value.name = $event,
                        placeholder: "Flash Sale Akhir Tahun",
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      __props.errors?.name ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-destructive"
                      }, toDisplayString(__props.errors.name), 1)) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), { for: "type" }, {
                        default: withCtx(() => [
                          createTextVNode("Tipe Promosi *")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$8), {
                        modelValue: formData.value.type,
                        "onUpdate:modelValue": ($event) => formData.value.type = $event,
                        required: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$9), { id: "type" }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$a), { placeholder: "Pilih tipe" })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$b), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$c), { value: "discount" }, {
                                default: withCtx(() => [
                                  createTextVNode("Diskon")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), { value: "bundle" }, {
                                default: withCtx(() => [
                                  createTextVNode("Bundle")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), { value: "flash_sale" }, {
                                default: withCtx(() => [
                                  createTextVNode("Flash Sale")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), { value: "promo" }, {
                                default: withCtx(() => [
                                  createTextVNode("Promo")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"]),
                      __props.errors?.type ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-destructive"
                      }, toDisplayString(__props.errors.type), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), { for: "landing_slug" }, {
                        default: withCtx(() => [
                          createTextVNode("Landing Page Slug")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), {
                        id: "landing_slug",
                        modelValue: formData.value.landing_slug,
                        "onUpdate:modelValue": ($event) => formData.value.landing_slug = $event,
                        placeholder: "flash-sale-2024"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ]),
                  createVNode("div", { class: "space-y-2" }, [
                    createVNode(unref(_sfc_main$6), { for: "description" }, {
                      default: withCtx(() => [
                        createTextVNode("Deskripsi")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$d), {
                      id: "description",
                      modelValue: formData.value.description,
                      "onUpdate:modelValue": ($event) => formData.value.description = $event,
                      placeholder: "Deskripsi promosi (opsional)",
                      rows: "3"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "space-y-2" }, [
                    createVNode(unref(_sfc_main$6), { for: "image" }, {
                      default: withCtx(() => [
                        createTextVNode("URL Gambar")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), {
                      id: "image",
                      modelValue: formData.value.image,
                      "onUpdate:modelValue": ($event) => formData.value.image = $event,
                      placeholder: "https://example.com/promo-banner.jpg"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Periode &amp; Pengaturan`);
                      } else {
                        return [
                          createTextVNode("Periode & Pengaturan")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Atur waktu dan batasan promosi`);
                      } else {
                        return [
                          createTextVNode("Atur waktu dan batasan promosi")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Periode & Pengaturan")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createTextVNode("Atur waktu dan batasan promosi")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$5), { class: "space-y-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid gap-4 md:grid-cols-2"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "start_at" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Tanggal Mulai *`);
                      } else {
                        return [
                          createTextVNode("Tanggal Mulai *")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    id: "start_at",
                    modelValue: formData.value.start_at,
                    "onUpdate:modelValue": ($event) => formData.value.start_at = $event,
                    type: "datetime-local",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  if (__props.errors?.start_at) {
                    _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(__props.errors.start_at)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "end_at" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Tanggal Berakhir *`);
                      } else {
                        return [
                          createTextVNode("Tanggal Berakhir *")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    id: "end_at",
                    modelValue: formData.value.end_at,
                    "onUpdate:modelValue": ($event) => formData.value.end_at = $event,
                    type: "datetime-local",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  if (__props.errors?.end_at) {
                    _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(__props.errors.end_at)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div></div><div class="grid gap-4 md:grid-cols-3"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "priority" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Prioritas`);
                      } else {
                        return [
                          createTextVNode("Prioritas")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    id: "priority",
                    modelValue: formData.value.priority,
                    "onUpdate:modelValue": ($event) => formData.value.priority = $event,
                    modelModifiers: { number: true },
                    type: "number",
                    min: "0",
                    placeholder: "0"
                  }, null, _parent3, _scopeId2));
                  _push3(`<p class="text-sm text-muted-foreground"${_scopeId2}> Angka lebih tinggi = prioritas lebih tinggi </p></div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "max_redemption" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Maks. Penebusan`);
                      } else {
                        return [
                          createTextVNode("Maks. Penebusan")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    id: "max_redemption",
                    value: formData.value.max_redemption ?? "",
                    onInput: ($event) => formData.value.max_redemption = $event.target.value ? Number($event.target.value) : null,
                    type: "number",
                    min: "0",
                    placeholder: "Tidak terbatas"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "per_user_limit" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Limit Per User`);
                      } else {
                        return [
                          createTextVNode("Limit Per User")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    id: "per_user_limit",
                    value: formData.value.per_user_limit ?? "",
                    onInput: ($event) => formData.value.per_user_limit = $event.target.value ? Number($event.target.value) : null,
                    type: "number",
                    min: "0",
                    placeholder: "Tidak terbatas"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div><div class="flex items-center gap-2"${_scopeId2}><input id="is_active"${ssrIncludeBooleanAttr(Array.isArray(formData.value.is_active) ? ssrLooseContain(formData.value.is_active, null) : formData.value.is_active) ? " checked" : ""} type="checkbox" class="rounded"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "is_active" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Promosi Aktif`);
                      } else {
                        return [
                          createTextVNode("Promosi Aktif")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$6), { for: "start_at" }, {
                          default: withCtx(() => [
                            createTextVNode("Tanggal Mulai *")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$7), {
                          id: "start_at",
                          modelValue: formData.value.start_at,
                          "onUpdate:modelValue": ($event) => formData.value.start_at = $event,
                          type: "datetime-local",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        __props.errors?.start_at ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-destructive"
                        }, toDisplayString(__props.errors.start_at), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$6), { for: "end_at" }, {
                          default: withCtx(() => [
                            createTextVNode("Tanggal Berakhir *")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$7), {
                          id: "end_at",
                          modelValue: formData.value.end_at,
                          "onUpdate:modelValue": ($event) => formData.value.end_at = $event,
                          type: "datetime-local",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        __props.errors?.end_at ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-destructive"
                        }, toDisplayString(__props.errors.end_at), 1)) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("div", { class: "grid gap-4 md:grid-cols-3" }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$6), { for: "priority" }, {
                          default: withCtx(() => [
                            createTextVNode("Prioritas")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$7), {
                          id: "priority",
                          modelValue: formData.value.priority,
                          "onUpdate:modelValue": ($event) => formData.value.priority = $event,
                          modelModifiers: { number: true },
                          type: "number",
                          min: "0",
                          placeholder: "0"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("p", { class: "text-sm text-muted-foreground" }, " Angka lebih tinggi = prioritas lebih tinggi ")
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$6), { for: "max_redemption" }, {
                          default: withCtx(() => [
                            createTextVNode("Maks. Penebusan")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$7), {
                          id: "max_redemption",
                          value: formData.value.max_redemption ?? "",
                          onInput: ($event) => formData.value.max_redemption = $event.target.value ? Number($event.target.value) : null,
                          type: "number",
                          min: "0",
                          placeholder: "Tidak terbatas"
                        }, null, 8, ["value", "onInput"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$6), { for: "per_user_limit" }, {
                          default: withCtx(() => [
                            createTextVNode("Limit Per User")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$7), {
                          id: "per_user_limit",
                          value: formData.value.per_user_limit ?? "",
                          onInput: ($event) => formData.value.per_user_limit = $event.target.value ? Number($event.target.value) : null,
                          type: "number",
                          min: "0",
                          placeholder: "Tidak terbatas"
                        }, null, 8, ["value", "onInput"])
                      ])
                    ]),
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      withDirectives(createVNode("input", {
                        id: "is_active",
                        "onUpdate:modelValue": ($event) => formData.value.is_active = $event,
                        type: "checkbox",
                        class: "rounded"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelCheckbox, formData.value.is_active]
                      ]),
                      createVNode(unref(_sfc_main$6), { for: "is_active" }, {
                        default: withCtx(() => [
                          createTextVNode("Promosi Aktif")
                        ]),
                        _: 1
                      })
                    ])
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
                      createTextVNode("Periode & Pengaturan")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createTextVNode("Atur waktu dan batasan promosi")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), { class: "space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), { for: "start_at" }, {
                        default: withCtx(() => [
                          createTextVNode("Tanggal Mulai *")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), {
                        id: "start_at",
                        modelValue: formData.value.start_at,
                        "onUpdate:modelValue": ($event) => formData.value.start_at = $event,
                        type: "datetime-local",
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      __props.errors?.start_at ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-destructive"
                      }, toDisplayString(__props.errors.start_at), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), { for: "end_at" }, {
                        default: withCtx(() => [
                          createTextVNode("Tanggal Berakhir *")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), {
                        id: "end_at",
                        modelValue: formData.value.end_at,
                        "onUpdate:modelValue": ($event) => formData.value.end_at = $event,
                        type: "datetime-local",
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      __props.errors?.end_at ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-destructive"
                      }, toDisplayString(__props.errors.end_at), 1)) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", { class: "grid gap-4 md:grid-cols-3" }, [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), { for: "priority" }, {
                        default: withCtx(() => [
                          createTextVNode("Prioritas")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), {
                        id: "priority",
                        modelValue: formData.value.priority,
                        "onUpdate:modelValue": ($event) => formData.value.priority = $event,
                        modelModifiers: { number: true },
                        type: "number",
                        min: "0",
                        placeholder: "0"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode("p", { class: "text-sm text-muted-foreground" }, " Angka lebih tinggi = prioritas lebih tinggi ")
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), { for: "max_redemption" }, {
                        default: withCtx(() => [
                          createTextVNode("Maks. Penebusan")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), {
                        id: "max_redemption",
                        value: formData.value.max_redemption ?? "",
                        onInput: ($event) => formData.value.max_redemption = $event.target.value ? Number($event.target.value) : null,
                        type: "number",
                        min: "0",
                        placeholder: "Tidak terbatas"
                      }, null, 8, ["value", "onInput"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), { for: "per_user_limit" }, {
                        default: withCtx(() => [
                          createTextVNode("Limit Per User")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), {
                        id: "per_user_limit",
                        value: formData.value.per_user_limit ?? "",
                        onInput: ($event) => formData.value.per_user_limit = $event.target.value ? Number($event.target.value) : null,
                        type: "number",
                        min: "0",
                        placeholder: "Tidak terbatas"
                      }, null, 8, ["value", "onInput"])
                    ])
                  ]),
                  createVNode("div", { class: "flex items-center gap-2" }, [
                    withDirectives(createVNode("input", {
                      id: "is_active",
                      "onUpdate:modelValue": ($event) => formData.value.is_active = $event,
                      type: "checkbox",
                      class: "rounded"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelCheckbox, formData.value.is_active]
                    ]),
                    createVNode(unref(_sfc_main$6), { for: "is_active" }, {
                      default: withCtx(() => [
                        createTextVNode("Promosi Aktif")
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Penempatan`);
                      } else {
                        return [
                          createTextVNode("Penempatan")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Tentukan dimana promosi ditampilkan`);
                      } else {
                        return [
                          createTextVNode("Tentukan dimana promosi ditampilkan")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Penempatan")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createTextVNode("Tentukan dimana promosi ditampilkan")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$5), { class: "space-y-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid gap-4 md:grid-cols-2"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "show_on" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Tampilkan Di`);
                      } else {
                        return [
                          createTextVNode("Tampilkan Di")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$8), {
                    modelValue: formData.value.show_on,
                    "onUpdate:modelValue": ($event) => formData.value.show_on = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { id: "show_on" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$a), { placeholder: "Pilih lokasi" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$a), { placeholder: "Pilih lokasi" })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$b), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$c), { value: "homepage" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Homepage`);
                                  } else {
                                    return [
                                      createTextVNode("Homepage")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), { value: "product_page" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Product Page`);
                                  } else {
                                    return [
                                      createTextVNode("Product Page")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), { value: "checkout" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Checkout`);
                                  } else {
                                    return [
                                      createTextVNode("Checkout")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$c), { value: "homepage" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Homepage")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), { value: "product_page" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Product Page")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), { value: "checkout" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Checkout")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$9), { id: "show_on" }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$a), { placeholder: "Pilih lokasi" })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$b), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$c), { value: "homepage" }, {
                                default: withCtx(() => [
                                  createTextVNode("Homepage")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), { value: "product_page" }, {
                                default: withCtx(() => [
                                  createTextVNode("Product Page")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), { value: "checkout" }, {
                                default: withCtx(() => [
                                  createTextVNode("Checkout")
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
                  }, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "page" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Halaman`);
                      } else {
                        return [
                          createTextVNode("Halaman")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$8), {
                    modelValue: formData.value.page,
                    "onUpdate:modelValue": ($event) => formData.value.page = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { id: "page" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$a), { placeholder: "Pilih halaman" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$a), { placeholder: "Pilih halaman" })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$b), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$c), { value: "home" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Home`);
                                  } else {
                                    return [
                                      createTextVNode("Home")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), { value: "product" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Product`);
                                  } else {
                                    return [
                                      createTextVNode("Product")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), { value: "category" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Category`);
                                  } else {
                                    return [
                                      createTextVNode("Category")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), { value: "cart" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Cart`);
                                  } else {
                                    return [
                                      createTextVNode("Cart")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$c), { value: "home" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Home")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), { value: "product" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Product")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), { value: "category" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Category")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), { value: "cart" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Cart")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$9), { id: "page" }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$a), { placeholder: "Pilih halaman" })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$b), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$c), { value: "home" }, {
                                default: withCtx(() => [
                                  createTextVNode("Home")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), { value: "product" }, {
                                default: withCtx(() => [
                                  createTextVNode("Product")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), { value: "category" }, {
                                default: withCtx(() => [
                                  createTextVNode("Category")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), { value: "cart" }, {
                                default: withCtx(() => [
                                  createTextVNode("Cart")
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
                  }, _parent3, _scopeId2));
                  _push3(`</div></div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "conditions_json" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Kondisi (JSON)`);
                      } else {
                        return [
                          createTextVNode("Kondisi (JSON)")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$d), {
                    id: "conditions_json",
                    modelValue: formData.value.conditions_json,
                    "onUpdate:modelValue": ($event) => formData.value.conditions_json = $event,
                    placeholder: '{"min_purchase": 100000, "categories": [1, 2]}',
                    rows: "3",
                    class: "font-mono text-sm"
                  }, null, _parent3, _scopeId2));
                  _push3(`<p class="text-sm text-muted-foreground"${_scopeId2}> Format JSON untuk kondisi spesifik promosi </p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$6), { for: "show_on" }, {
                          default: withCtx(() => [
                            createTextVNode("Tampilkan Di")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), {
                          modelValue: formData.value.show_on,
                          "onUpdate:modelValue": ($event) => formData.value.show_on = $event
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$9), { id: "show_on" }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$a), { placeholder: "Pilih lokasi" })
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$b), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$c), { value: "homepage" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Homepage")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), { value: "product_page" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Product Page")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), { value: "checkout" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Checkout")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$6), { for: "page" }, {
                          default: withCtx(() => [
                            createTextVNode("Halaman")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), {
                          modelValue: formData.value.page,
                          "onUpdate:modelValue": ($event) => formData.value.page = $event
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$9), { id: "page" }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$a), { placeholder: "Pilih halaman" })
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$b), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$c), { value: "home" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Home")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), { value: "product" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Product")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), { value: "category" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Category")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), { value: "cart" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Cart")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), { for: "conditions_json" }, {
                        default: withCtx(() => [
                          createTextVNode("Kondisi (JSON)")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$d), {
                        id: "conditions_json",
                        modelValue: formData.value.conditions_json,
                        "onUpdate:modelValue": ($event) => formData.value.conditions_json = $event,
                        placeholder: '{"min_purchase": 100000, "categories": [1, 2]}',
                        rows: "3",
                        class: "font-mono text-sm"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode("p", { class: "text-sm text-muted-foreground" }, " Format JSON untuk kondisi spesifik promosi ")
                    ])
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
                      createTextVNode("Penempatan")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createTextVNode("Tentukan dimana promosi ditampilkan")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), { class: "space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), { for: "show_on" }, {
                        default: withCtx(() => [
                          createTextVNode("Tampilkan Di")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$8), {
                        modelValue: formData.value.show_on,
                        "onUpdate:modelValue": ($event) => formData.value.show_on = $event
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$9), { id: "show_on" }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$a), { placeholder: "Pilih lokasi" })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$b), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$c), { value: "homepage" }, {
                                default: withCtx(() => [
                                  createTextVNode("Homepage")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), { value: "product_page" }, {
                                default: withCtx(() => [
                                  createTextVNode("Product Page")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), { value: "checkout" }, {
                                default: withCtx(() => [
                                  createTextVNode("Checkout")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), { for: "page" }, {
                        default: withCtx(() => [
                          createTextVNode("Halaman")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$8), {
                        modelValue: formData.value.page,
                        "onUpdate:modelValue": ($event) => formData.value.page = $event
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$9), { id: "page" }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$a), { placeholder: "Pilih halaman" })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$b), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$c), { value: "home" }, {
                                default: withCtx(() => [
                                  createTextVNode("Home")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), { value: "product" }, {
                                default: withCtx(() => [
                                  createTextVNode("Product")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), { value: "category" }, {
                                default: withCtx(() => [
                                  createTextVNode("Category")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), { value: "cart" }, {
                                default: withCtx(() => [
                                  createTextVNode("Cart")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ]),
                  createVNode("div", { class: "space-y-2" }, [
                    createVNode(unref(_sfc_main$6), { for: "conditions_json" }, {
                      default: withCtx(() => [
                        createTextVNode("Kondisi (JSON)")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$d), {
                      id: "conditions_json",
                      modelValue: formData.value.conditions_json,
                      "onUpdate:modelValue": ($event) => formData.value.conditions_json = $event,
                      placeholder: '{"min_purchase": 100000, "categories": [1, 2]}',
                      rows: "3",
                      class: "font-mono text-sm"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode("p", { class: "text-sm text-muted-foreground" }, " Format JSON untuk kondisi spesifik promosi ")
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex justify-end gap-4">`);
      ssrRenderSlot(_ctx.$slots, "actions", { processing: __props.processing }, null, _push, _parent);
      _push(`</div></form>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/promotions/PromotionForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
