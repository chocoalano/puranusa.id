import { defineComponent, mergeModels, useModel, mergeProps, unref, withCtx, createTextVNode, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, Fragment, renderList, withDirectives, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderSlot } from "vue/server-renderer";
import { _ as _sfc_main$7 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$6 } from "./Label-16aMY2sx.js";
import { _ as _sfc_main$8 } from "./Textarea-pcFPh_uS.js";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, d as _sfc_main$4, c as _sfc_main$5 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$9, a as _sfc_main$a, b as _sfc_main$b, c as _sfc_main$c, d as _sfc_main$d } from "./SelectValue-BUnv4mQg.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CategoryForm",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    parentCategories: {},
    errors: {},
    processing: { type: Boolean }
  }, {
    "formData": { required: true },
    "formDataModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["submit"], ["update:formData"]),
  setup(__props, { emit: __emit }) {
    const formData = useModel(__props, "formData");
    const generateSlug = () => {
      formData.value.slug = formData.value.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    };
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
                        _push4(`Informasi utama kategori produk`);
                      } else {
                        return [
                          createTextVNode("Informasi utama kategori produk")
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
                        createTextVNode("Informasi utama kategori produk")
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
                  _push3(`<div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "name" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Nama Kategori *`);
                      } else {
                        return [
                          createTextVNode("Nama Kategori *")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    id: "name",
                    modelValue: formData.value.name,
                    "onUpdate:modelValue": ($event) => formData.value.name = $event,
                    placeholder: "Masukkan nama kategori",
                    onInput: generateSlug,
                    required: ""
                  }, null, _parent3, _scopeId2));
                  if (__props.errors?.name) {
                    _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(__props.errors.name)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "slug" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Slug *`);
                      } else {
                        return [
                          createTextVNode("Slug *")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    id: "slug",
                    modelValue: formData.value.slug,
                    "onUpdate:modelValue": ($event) => formData.value.slug = $event,
                    placeholder: "nama-kategori",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`<p class="text-sm text-muted-foreground"${_scopeId2}> URL-friendly identifier (contoh: fashion-pria) </p>`);
                  if (__props.errors?.slug) {
                    _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(__props.errors.slug)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
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
                  _push3(ssrRenderComponent(unref(_sfc_main$8), {
                    id: "description",
                    modelValue: formData.value.description,
                    "onUpdate:modelValue": ($event) => formData.value.description = $event,
                    placeholder: "Deskripsi kategori (opsional)",
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
                    placeholder: "https://example.com/image.jpg"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), { for: "name" }, {
                        default: withCtx(() => [
                          createTextVNode("Nama Kategori *")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), {
                        id: "name",
                        modelValue: formData.value.name,
                        "onUpdate:modelValue": ($event) => formData.value.name = $event,
                        placeholder: "Masukkan nama kategori",
                        onInput: generateSlug,
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      __props.errors?.name ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-destructive"
                      }, toDisplayString(__props.errors.name), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), { for: "slug" }, {
                        default: withCtx(() => [
                          createTextVNode("Slug *")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), {
                        id: "slug",
                        modelValue: formData.value.slug,
                        "onUpdate:modelValue": ($event) => formData.value.slug = $event,
                        placeholder: "nama-kategori",
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode("p", { class: "text-sm text-muted-foreground" }, " URL-friendly identifier (contoh: fashion-pria) "),
                      __props.errors?.slug ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-destructive"
                      }, toDisplayString(__props.errors.slug), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), { for: "description" }, {
                        default: withCtx(() => [
                          createTextVNode("Deskripsi")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$8), {
                        id: "description",
                        modelValue: formData.value.description,
                        "onUpdate:modelValue": ($event) => formData.value.description = $event,
                        placeholder: "Deskripsi kategori (opsional)",
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
                        placeholder: "https://example.com/image.jpg"
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
                      createTextVNode("Informasi utama kategori produk")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), { class: "space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "space-y-2" }, [
                    createVNode(unref(_sfc_main$6), { for: "name" }, {
                      default: withCtx(() => [
                        createTextVNode("Nama Kategori *")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), {
                      id: "name",
                      modelValue: formData.value.name,
                      "onUpdate:modelValue": ($event) => formData.value.name = $event,
                      placeholder: "Masukkan nama kategori",
                      onInput: generateSlug,
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    __props.errors?.name ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "text-sm text-destructive"
                    }, toDisplayString(__props.errors.name), 1)) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "space-y-2" }, [
                    createVNode(unref(_sfc_main$6), { for: "slug" }, {
                      default: withCtx(() => [
                        createTextVNode("Slug *")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), {
                      id: "slug",
                      modelValue: formData.value.slug,
                      "onUpdate:modelValue": ($event) => formData.value.slug = $event,
                      placeholder: "nama-kategori",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode("p", { class: "text-sm text-muted-foreground" }, " URL-friendly identifier (contoh: fashion-pria) "),
                    __props.errors?.slug ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "text-sm text-destructive"
                    }, toDisplayString(__props.errors.slug), 1)) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "space-y-2" }, [
                    createVNode(unref(_sfc_main$6), { for: "description" }, {
                      default: withCtx(() => [
                        createTextVNode("Deskripsi")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$8), {
                      id: "description",
                      modelValue: formData.value.description,
                      "onUpdate:modelValue": ($event) => formData.value.description = $event,
                      placeholder: "Deskripsi kategori (opsional)",
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
                      placeholder: "https://example.com/image.jpg"
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
                        _push4(`Pengaturan`);
                      } else {
                        return [
                          createTextVNode("Pengaturan")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Atur hierarki dan status kategori`);
                      } else {
                        return [
                          createTextVNode("Atur hierarki dan status kategori")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Pengaturan")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createTextVNode("Atur hierarki dan status kategori")
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
                  _push3(`<div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "parent_id" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Kategori Parent`);
                      } else {
                        return [
                          createTextVNode("Kategori Parent")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$9), {
                    modelValue: formData.value.parent_id,
                    "onUpdate:modelValue": ($event) => formData.value.parent_id = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$a), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$b), { placeholder: "Pilih kategori parent (opsional)" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$b), { placeholder: "Pilih kategori parent (opsional)" })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$c), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$d), { value: null }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Tidak ada parent`);
                                  } else {
                                    return [
                                      createTextVNode("Tidak ada parent")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<!--[-->`);
                              ssrRenderList(__props.parentCategories, (parent) => {
                                _push5(ssrRenderComponent(unref(_sfc_main$d), {
                                  key: parent.id,
                                  value: parent.id
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(parent.name)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(parent.name), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                createVNode(unref(_sfc_main$d), { value: null }, {
                                  default: withCtx(() => [
                                    createTextVNode("Tidak ada parent")
                                  ]),
                                  _: 1
                                }),
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.parentCategories, (parent) => {
                                  return openBlock(), createBlock(unref(_sfc_main$d), {
                                    key: parent.id,
                                    value: parent.id
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(parent.name), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 128))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$a), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$b), { placeholder: "Pilih kategori parent (opsional)" })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$c), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$d), { value: null }, {
                                default: withCtx(() => [
                                  createTextVNode("Tidak ada parent")
                                ]),
                                _: 1
                              }),
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.parentCategories, (parent) => {
                                return openBlock(), createBlock(unref(_sfc_main$d), {
                                  key: parent.id,
                                  value: parent.id
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(parent.name), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["value"]);
                              }), 128))
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<p class="text-sm text-muted-foreground"${_scopeId2}> Kosongkan jika ini adalah kategori utama </p></div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "sort_order" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Urutan Tampilan`);
                      } else {
                        return [
                          createTextVNode("Urutan Tampilan")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    id: "sort_order",
                    modelValue: formData.value.sort_order,
                    "onUpdate:modelValue": ($event) => formData.value.sort_order = $event,
                    modelModifiers: { number: true },
                    type: "number",
                    min: "0"
                  }, null, _parent3, _scopeId2));
                  _push3(`<p class="text-sm text-muted-foreground"${_scopeId2}> Angka lebih kecil akan ditampilkan lebih dulu </p></div><div class="flex items-center gap-2"${_scopeId2}><input id="is_active"${ssrIncludeBooleanAttr(Array.isArray(formData.value.is_active) ? ssrLooseContain(formData.value.is_active, null) : formData.value.is_active) ? " checked" : ""} type="checkbox" class="rounded"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "is_active" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Kategori Aktif`);
                      } else {
                        return [
                          createTextVNode("Kategori Aktif")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), { for: "parent_id" }, {
                        default: withCtx(() => [
                          createTextVNode("Kategori Parent")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$9), {
                        modelValue: formData.value.parent_id,
                        "onUpdate:modelValue": ($event) => formData.value.parent_id = $event
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$a), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$b), { placeholder: "Pilih kategori parent (opsional)" })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$c), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$d), { value: null }, {
                                default: withCtx(() => [
                                  createTextVNode("Tidak ada parent")
                                ]),
                                _: 1
                              }),
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.parentCategories, (parent) => {
                                return openBlock(), createBlock(unref(_sfc_main$d), {
                                  key: parent.id,
                                  value: parent.id
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(parent.name), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["value"]);
                              }), 128))
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode("p", { class: "text-sm text-muted-foreground" }, " Kosongkan jika ini adalah kategori utama ")
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), { for: "sort_order" }, {
                        default: withCtx(() => [
                          createTextVNode("Urutan Tampilan")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), {
                        id: "sort_order",
                        modelValue: formData.value.sort_order,
                        "onUpdate:modelValue": ($event) => formData.value.sort_order = $event,
                        modelModifiers: { number: true },
                        type: "number",
                        min: "0"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode("p", { class: "text-sm text-muted-foreground" }, " Angka lebih kecil akan ditampilkan lebih dulu ")
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
                          createTextVNode("Kategori Aktif")
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
                      createTextVNode("Pengaturan")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createTextVNode("Atur hierarki dan status kategori")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), { class: "space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "space-y-2" }, [
                    createVNode(unref(_sfc_main$6), { for: "parent_id" }, {
                      default: withCtx(() => [
                        createTextVNode("Kategori Parent")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$9), {
                      modelValue: formData.value.parent_id,
                      "onUpdate:modelValue": ($event) => formData.value.parent_id = $event
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$a), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$b), { placeholder: "Pilih kategori parent (opsional)" })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$c), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$d), { value: null }, {
                              default: withCtx(() => [
                                createTextVNode("Tidak ada parent")
                              ]),
                              _: 1
                            }),
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.parentCategories, (parent) => {
                              return openBlock(), createBlock(unref(_sfc_main$d), {
                                key: parent.id,
                                value: parent.id
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(parent.name), 1)
                                ]),
                                _: 2
                              }, 1032, ["value"]);
                            }), 128))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode("p", { class: "text-sm text-muted-foreground" }, " Kosongkan jika ini adalah kategori utama ")
                  ]),
                  createVNode("div", { class: "space-y-2" }, [
                    createVNode(unref(_sfc_main$6), { for: "sort_order" }, {
                      default: withCtx(() => [
                        createTextVNode("Urutan Tampilan")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), {
                      id: "sort_order",
                      modelValue: formData.value.sort_order,
                      "onUpdate:modelValue": ($event) => formData.value.sort_order = $event,
                      modelModifiers: { number: true },
                      type: "number",
                      min: "0"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode("p", { class: "text-sm text-muted-foreground" }, " Angka lebih kecil akan ditampilkan lebih dulu ")
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
                        createTextVNode("Kategori Aktif")
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
      _push(`<div class="flex justify-end gap-4">`);
      ssrRenderSlot(_ctx.$slots, "actions", { processing: __props.processing }, null, _push, _parent);
      _push(`</div></form>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/categories/CategoryForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
