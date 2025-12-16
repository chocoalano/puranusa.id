import { defineComponent, mergeModels, useModel, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, Fragment, renderList, withDirectives, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderSlot } from "vue/server-renderer";
import { _ as _sfc_main$7 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$6 } from "./Label-16aMY2sx.js";
import { _ as _sfc_main$8 } from "./Textarea-pcFPh_uS.js";
import { _ as _sfc_main$9 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, d as _sfc_main$4, c as _sfc_main$5 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$a, a as _sfc_main$b, b as _sfc_main$c, c as _sfc_main$d, d as _sfc_main$e } from "./SelectValue-BUnv4mQg.js";
import { X, Image, Upload } from "lucide-vue-next";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CategoryForm",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    parentCategories: {},
    errors: {},
    processing: { type: Boolean },
    existingImage: {}
  }, {
    "formData": { required: true },
    "formDataModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["submit"], ["update:formData"]),
  setup(__props, { emit: __emit }) {
    const props = __props;
    const formData = useModel(__props, "formData");
    const imagePreview = ref(props.existingImage || null);
    const fileInput = ref(null);
    const generateSlug = () => {
      formData.value.slug = formData.value.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    };
    const handleImageSelect = (event) => {
      const target = event.target;
      const file = target.files?.[0];
      if (file) {
        if (!file.type.startsWith("image/")) {
          alert("File harus berupa gambar");
          return;
        }
        if (file.size > 2 * 1024 * 1024) {
          alert("Ukuran file maksimal 2MB");
          return;
        }
        formData.value.image = file;
        imagePreview.value = URL.createObjectURL(file);
      }
    };
    const removeImage = () => {
      formData.value.image = null;
      imagePreview.value = null;
      if (fileInput.value) {
        fileInput.value.value = "";
      }
    };
    const triggerFileInput = () => {
      fileInput.value?.click();
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
                  _push3(ssrRenderComponent(unref(_sfc_main$6), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Gambar Kategori`);
                      } else {
                        return [
                          createTextVNode("Gambar Kategori")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="space-y-3"${_scopeId2}>`);
                  if (imagePreview.value) {
                    _push3(`<div class="relative inline-block"${_scopeId2}><img${ssrRenderAttr("src", imagePreview.value)} alt="Preview" class="w-32 h-32 object-cover rounded-lg border"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$9), {
                      type: "button",
                      variant: "destructive",
                      size: "icon",
                      class: "absolute -top-2 -right-2 h-6 w-6",
                      onClick: removeImage
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(X), { class: "h-3 w-3" }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(X), { class: "h-3 w-3" })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (!imagePreview.value) {
                    _push3(`<div class="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Image), { class: "h-10 w-10 mx-auto text-muted-foreground mb-2" }, null, _parent3, _scopeId2));
                    _push3(`<p class="text-sm text-muted-foreground"${_scopeId2}> Klik untuk upload gambar </p><p class="text-xs text-muted-foreground mt-1"${_scopeId2}> PNG, JPG, WEBP (max. 2MB) </p></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<input type="file" accept="image/*" class="hidden"${_scopeId2}>`);
                  if (imagePreview.value) {
                    _push3(ssrRenderComponent(unref(_sfc_main$9), {
                      type: "button",
                      variant: "outline",
                      size: "sm",
                      onClick: triggerFileInput
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Upload), { class: "h-4 w-4 mr-2" }, null, _parent4, _scopeId3));
                          _push4(` Ganti Gambar `);
                        } else {
                          return [
                            createVNode(unref(Upload), { class: "h-4 w-4 mr-2" }),
                            createTextVNode(" Ganti Gambar ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                  if (__props.errors?.image) {
                    _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(__props.errors.image)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
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
                      createVNode(unref(_sfc_main$6), null, {
                        default: withCtx(() => [
                          createTextVNode("Gambar Kategori")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "space-y-3" }, [
                        imagePreview.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "relative inline-block"
                        }, [
                          createVNode("img", {
                            src: imagePreview.value,
                            alt: "Preview",
                            class: "w-32 h-32 object-cover rounded-lg border"
                          }, null, 8, ["src"]),
                          createVNode(unref(_sfc_main$9), {
                            type: "button",
                            variant: "destructive",
                            size: "icon",
                            class: "absolute -top-2 -right-2 h-6 w-6",
                            onClick: removeImage
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(X), { class: "h-3 w-3" })
                            ]),
                            _: 1
                          })
                        ])) : createCommentVNode("", true),
                        !imagePreview.value ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors",
                          onClick: triggerFileInput
                        }, [
                          createVNode(unref(Image), { class: "h-10 w-10 mx-auto text-muted-foreground mb-2" }),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Klik untuk upload gambar "),
                          createVNode("p", { class: "text-xs text-muted-foreground mt-1" }, " PNG, JPG, WEBP (max. 2MB) ")
                        ])) : createCommentVNode("", true),
                        createVNode("input", {
                          ref_key: "fileInput",
                          ref: fileInput,
                          type: "file",
                          accept: "image/*",
                          class: "hidden",
                          onChange: handleImageSelect
                        }, null, 544),
                        imagePreview.value ? (openBlock(), createBlock(unref(_sfc_main$9), {
                          key: 2,
                          type: "button",
                          variant: "outline",
                          size: "sm",
                          onClick: triggerFileInput
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Upload), { class: "h-4 w-4 mr-2" }),
                            createTextVNode(" Ganti Gambar ")
                          ]),
                          _: 1
                        })) : createCommentVNode("", true)
                      ]),
                      __props.errors?.image ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-destructive"
                      }, toDisplayString(__props.errors.image), 1)) : createCommentVNode("", true)
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
                    createVNode(unref(_sfc_main$6), null, {
                      default: withCtx(() => [
                        createTextVNode("Gambar Kategori")
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "space-y-3" }, [
                      imagePreview.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "relative inline-block"
                      }, [
                        createVNode("img", {
                          src: imagePreview.value,
                          alt: "Preview",
                          class: "w-32 h-32 object-cover rounded-lg border"
                        }, null, 8, ["src"]),
                        createVNode(unref(_sfc_main$9), {
                          type: "button",
                          variant: "destructive",
                          size: "icon",
                          class: "absolute -top-2 -right-2 h-6 w-6",
                          onClick: removeImage
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(X), { class: "h-3 w-3" })
                          ]),
                          _: 1
                        })
                      ])) : createCommentVNode("", true),
                      !imagePreview.value ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors",
                        onClick: triggerFileInput
                      }, [
                        createVNode(unref(Image), { class: "h-10 w-10 mx-auto text-muted-foreground mb-2" }),
                        createVNode("p", { class: "text-sm text-muted-foreground" }, " Klik untuk upload gambar "),
                        createVNode("p", { class: "text-xs text-muted-foreground mt-1" }, " PNG, JPG, WEBP (max. 2MB) ")
                      ])) : createCommentVNode("", true),
                      createVNode("input", {
                        ref_key: "fileInput",
                        ref: fileInput,
                        type: "file",
                        accept: "image/*",
                        class: "hidden",
                        onChange: handleImageSelect
                      }, null, 544),
                      imagePreview.value ? (openBlock(), createBlock(unref(_sfc_main$9), {
                        key: 2,
                        type: "button",
                        variant: "outline",
                        size: "sm",
                        onClick: triggerFileInput
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Upload), { class: "h-4 w-4 mr-2" }),
                          createTextVNode(" Ganti Gambar ")
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ]),
                    __props.errors?.image ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "text-sm text-destructive"
                    }, toDisplayString(__props.errors.image), 1)) : createCommentVNode("", true)
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
                  _push3(ssrRenderComponent(unref(_sfc_main$a), {
                    modelValue: formData.value.parent_id,
                    "onUpdate:modelValue": ($event) => formData.value.parent_id = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$b), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$c), { placeholder: "Pilih kategori parent (opsional)" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$c), { placeholder: "Pilih kategori parent (opsional)" })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$d), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$e), { value: null }, {
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
                                _push5(ssrRenderComponent(unref(_sfc_main$e), {
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
                                createVNode(unref(_sfc_main$e), { value: null }, {
                                  default: withCtx(() => [
                                    createTextVNode("Tidak ada parent")
                                  ]),
                                  _: 1
                                }),
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.parentCategories, (parent) => {
                                  return openBlock(), createBlock(unref(_sfc_main$e), {
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
                          createVNode(unref(_sfc_main$b), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$c), { placeholder: "Pilih kategori parent (opsional)" })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$d), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$e), { value: null }, {
                                default: withCtx(() => [
                                  createTextVNode("Tidak ada parent")
                                ]),
                                _: 1
                              }),
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.parentCategories, (parent) => {
                                return openBlock(), createBlock(unref(_sfc_main$e), {
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
                      createVNode(unref(_sfc_main$a), {
                        modelValue: formData.value.parent_id,
                        "onUpdate:modelValue": ($event) => formData.value.parent_id = $event
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$b), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$c), { placeholder: "Pilih kategori parent (opsional)" })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$d), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$e), { value: null }, {
                                default: withCtx(() => [
                                  createTextVNode("Tidak ada parent")
                                ]),
                                _: 1
                              }),
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.parentCategories, (parent) => {
                                return openBlock(), createBlock(unref(_sfc_main$e), {
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
                    createVNode(unref(_sfc_main$a), {
                      modelValue: formData.value.parent_id,
                      "onUpdate:modelValue": ($event) => formData.value.parent_id = $event
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$b), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$c), { placeholder: "Pilih kategori parent (opsional)" })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$d), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$e), { value: null }, {
                              default: withCtx(() => [
                                createTextVNode("Tidak ada parent")
                              ]),
                              _: 1
                            }),
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.parentCategories, (parent) => {
                              return openBlock(), createBlock(unref(_sfc_main$e), {
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
