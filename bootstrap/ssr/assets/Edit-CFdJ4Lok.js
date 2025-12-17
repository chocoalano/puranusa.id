import { defineComponent, ref, computed, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-DbX-9AnN.js";
import { _ as _sfc_main$2 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$3 } from "./CategoryForm-C0FvTiMu.js";
import { ArrowLeft } from "lucide-vue-next";
import { toast } from "vue-sonner";
import "class-variance-authority";
import "./DropdownMenuTrigger-B1v6pHML.js";
import "reka-ui";
import "@vueuse/core";
import "./Input-BGi8wCMh.js";
import "./index-Jhngbhhu.js";
import "./AvatarImage-DWFQMckn.js";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
import "clsx";
import "tailwind-merge";
import "./Label-16aMY2sx.js";
import "./Textarea-pcFPh_uS.js";
import "./CardTitle-sqUG0LTw.js";
import "./SelectValue-BUnv4mQg.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    category: {},
    parentCategories: {}
  },
  setup(__props) {
    const props = __props;
    const form = ref({
      parent_id: props.category.parent_id,
      slug: props.category.slug,
      name: props.category.name,
      description: props.category.description || "",
      sort_order: props.category.sort_order,
      is_active: props.category.is_active,
      image: null
    });
    const existingImage = computed(() => props.category.image);
    const submitForm = useForm({});
    const errors = computed(() => submitForm.errors);
    const processing = computed(() => submitForm.processing);
    const submit = () => {
      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("name", form.value.name);
      formData.append("slug", form.value.slug);
      formData.append("description", form.value.description || "");
      formData.append("sort_order", String(form.value.sort_order));
      formData.append("is_active", form.value.is_active ? "1" : "0");
      if (form.value.parent_id) {
        formData.append("parent_id", String(form.value.parent_id));
      }
      if (form.value.image instanceof File) {
        formData.append("image", form.value.image);
      } else if (form.value.image === null && props.category.image) {
        formData.append("remove_image", "1");
      }
      submitForm.transform(() => formData).post(`/admin/categories/${props.category.id}`, {
        preserveScroll: true,
        forceFormData: true,
        onSuccess: () => {
          toast.success("Kategori berhasil diperbarui");
        },
        onError: () => {
          toast.error("Gagal memperbarui kategori");
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: `Edit ${__props.category.name}`
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="rounded-xl p-4 space-y-6 py-6"${_scopeId}><div class="flex items-center gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), { href: "/admin/categories" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$2), {
                    variant: "outline",
                    size: "icon"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(ArrowLeft), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(ArrowLeft), { class: "h-4 w-4" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$2), {
                      variant: "outline",
                      size: "icon"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(ArrowLeft), { class: "h-4 w-4" })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div${_scopeId}><h1 class="text-3xl font-bold"${_scopeId}>Edit Kategori</h1><p class="text-muted-foreground"${_scopeId}>Perbarui informasi kategori</p></div></div><div class="max-w-4xl"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              "form-data": form.value,
              "onUpdate:formData": ($event) => form.value = $event,
              "parent-categories": __props.parentCategories,
              errors: errors.value,
              processing: processing.value,
              "existing-image": existingImage.value,
              onSubmit: submit
            }, {
              actions: withCtx(({ processing: processing2 }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Link), { href: "/admin/categories" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$2), {
                          type: "button",
                          variant: "outline"
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Batal`);
                            } else {
                              return [
                                createTextVNode("Batal")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$2), {
                            type: "button",
                            variant: "outline"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Batal")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$2), {
                    type: "submit",
                    disabled: processing2
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(processing2 ? "Menyimpan..." : "Simpan Perubahan")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(processing2 ? "Menyimpan..." : "Simpan Perubahan"), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Link), { href: "/admin/categories" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$2), {
                          type: "button",
                          variant: "outline"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Batal")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$2), {
                      type: "submit",
                      disabled: processing2
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(processing2 ? "Menyimpan..." : "Simpan Perubahan"), 1)
                      ]),
                      _: 2
                    }, 1032, ["disabled"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "rounded-xl p-4 space-y-6 py-6" }, [
                createVNode("div", { class: "flex items-center gap-4" }, [
                  createVNode(unref(Link), { href: "/admin/categories" }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$2), {
                        variant: "outline",
                        size: "icon"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(ArrowLeft), { class: "h-4 w-4" })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("div", null, [
                    createVNode("h1", { class: "text-3xl font-bold" }, "Edit Kategori"),
                    createVNode("p", { class: "text-muted-foreground" }, "Perbarui informasi kategori")
                  ])
                ]),
                createVNode("div", { class: "max-w-4xl" }, [
                  createVNode(_sfc_main$3, {
                    "form-data": form.value,
                    "onUpdate:formData": ($event) => form.value = $event,
                    "parent-categories": __props.parentCategories,
                    errors: errors.value,
                    processing: processing.value,
                    "existing-image": existingImage.value,
                    onSubmit: submit
                  }, {
                    actions: withCtx(({ processing: processing2 }) => [
                      createVNode(unref(Link), { href: "/admin/categories" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$2), {
                            type: "button",
                            variant: "outline"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Batal")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$2), {
                        type: "submit",
                        disabled: processing2
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(processing2 ? "Menyimpan..." : "Simpan Perubahan"), 1)
                        ]),
                        _: 2
                      }, 1032, ["disabled"])
                    ]),
                    _: 1
                  }, 8, ["form-data", "onUpdate:formData", "parent-categories", "errors", "processing", "existing-image"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Categories/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
