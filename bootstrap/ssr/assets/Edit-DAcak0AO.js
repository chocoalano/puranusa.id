import { defineComponent, ref, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { Head, Link, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-DbX-9AnN.js";
import { _ as _sfc_main$2 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$3 } from "./PromotionForm-IknUH9-I.js";
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
    promotion: {}
  },
  setup(__props) {
    const props = __props;
    const formatDateTimeLocal = (datetime) => {
      const date = new Date(datetime);
      return date.toISOString().slice(0, 16);
    };
    const form = ref({
      code: props.promotion.code,
      name: props.promotion.name,
      type: props.promotion.type,
      landing_slug: props.promotion.landing_slug || "",
      description: props.promotion.description || "",
      image: props.promotion.image || "",
      start_at: formatDateTimeLocal(props.promotion.start_at),
      end_at: formatDateTimeLocal(props.promotion.end_at),
      is_active: props.promotion.is_active,
      priority: props.promotion.priority,
      max_redemption: props.promotion.max_redemption,
      per_user_limit: props.promotion.per_user_limit,
      conditions_json: props.promotion.conditions_json || "",
      show_on: props.promotion.show_on || "",
      page: props.promotion.page || ""
    });
    const errors = ref({});
    const processing = ref(false);
    const submit = () => {
      processing.value = true;
      router.put(`/admin/promotions/${props.promotion.id}`, form.value, {
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Promosi berhasil diperbarui");
        },
        onError: (err) => {
          errors.value = err;
          toast.error("Gagal memperbarui promosi");
        },
        onFinish: () => {
          processing.value = false;
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: `Edit ${__props.promotion.name}`
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="rounded-xl p-4 space-y-6 py-6"${_scopeId}><div class="flex items-center gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), { href: "/admin/promotions" }, {
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
            _push2(`<div${_scopeId}><h1 class="text-3xl font-bold"${_scopeId}>Edit Promosi</h1><p class="text-muted-foreground"${_scopeId}>Perbarui informasi promosi</p></div></div><div class="max-w-4xl"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              "form-data": form.value,
              "onUpdate:formData": ($event) => form.value = $event,
              errors: errors.value,
              processing: processing.value,
              onSubmit: submit
            }, {
              actions: withCtx(({ processing: processing2 }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Link), { href: "/admin/promotions" }, {
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
                    createVNode(unref(Link), { href: "/admin/promotions" }, {
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
                  createVNode(unref(Link), { href: "/admin/promotions" }, {
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
                    createVNode("h1", { class: "text-3xl font-bold" }, "Edit Promosi"),
                    createVNode("p", { class: "text-muted-foreground" }, "Perbarui informasi promosi")
                  ])
                ]),
                createVNode("div", { class: "max-w-4xl" }, [
                  createVNode(_sfc_main$3, {
                    "form-data": form.value,
                    "onUpdate:formData": ($event) => form.value = $event,
                    errors: errors.value,
                    processing: processing.value,
                    onSubmit: submit
                  }, {
                    actions: withCtx(({ processing: processing2 }) => [
                      createVNode(unref(Link), { href: "/admin/promotions" }, {
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
                  }, 8, ["form-data", "onUpdate:formData", "errors", "processing"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Promotions/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
