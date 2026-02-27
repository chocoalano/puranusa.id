import { defineComponent, onMounted, watch, unref, withCtx, createVNode, createTextVNode, isRef, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1, i as index, u as update } from "./AppLayout-DtCYuQDV.js";
import { u as useCustomerForm, a as useShippingLocation, _ as _sfc_main$3 } from "./useShippingLocation-l-R5zyXV.js";
import { _ as _sfc_main$2 } from "./index-SN_CnQ_F.js";
import { Head, Link } from "@inertiajs/vue3";
import { ArrowLeft } from "lucide-vue-next";
import { toast } from "vue-sonner";
import "class-variance-authority";
import "./DropdownMenuTrigger-B1v6pHML.js";
import "reka-ui";
import "@vueuse/core";
import "./Input-BGi8wCMh.js";
import "./index-3UqiGNe9.js";
import "./AvatarImage-DWFQMckn.js";
import "./index-DS4dn0_o.js";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
import "./CardTitle-sqUG0LTw.js";
import "./PopoverTrigger-D0RWxIr3.js";
import "./DialogTrigger-DpE8BjOt.js";
import "./Label-16aMY2sx.js";
import "./SelectValue-BUnv4mQg.js";
import "./Textarea-pcFPh_uS.js";
import "clsx";
import "tailwind-merge";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    customer: {},
    sponsors: {}
  },
  setup(__props) {
    const props = __props;
    const { form, toPayload } = useCustomerForm("edit", {
      ...props.customer
    });
    const {
      provinces,
      cities,
      loadingProvinces,
      loadingCities,
      fetchProvinces,
      fetchCities,
      resetCities
    } = useShippingLocation();
    const showFormErrors = (errors) => {
      const messages = Object.values(errors).filter(
        (value) => typeof value === "string" && value.length > 0
      );
      if (messages.length === 0) {
        toast.error(
          "Gagal memperbarui data pelanggan. Silakan periksa kembali input form."
        );
        return;
      }
      toast.error(messages[0]);
      if (messages.length > 1) {
        toast.warning(`Terdapat ${messages.length} kesalahan pada form.`);
      }
    };
    const parseErrorMessage = (error, fallback) => {
      if (error instanceof Error && error.message.trim() !== "") {
        return error.message;
      }
      return fallback;
    };
    onMounted(async () => {
      try {
        await fetchProvinces();
        if (form.province_id) {
          await fetchCities(form.province_id);
        }
      } catch (error) {
        toast.error(
          parseErrorMessage(error, "Gagal memuat data wilayah pelanggan.")
        );
      }
    });
    watch(
      () => form.province_id,
      async (provinceId, previousProvinceId) => {
        if (!provinceId) {
          resetCities();
          form.city_id = null;
          return;
        }
        if (provinceId !== previousProvinceId) {
          form.city_id = null;
        }
        try {
          await fetchCities(provinceId);
        } catch (error) {
          toast.error(
            parseErrorMessage(error, "Gagal memuat daftar kota/kabupaten.")
          );
          resetCities();
        }
      }
    );
    const submit = () => {
      form.transform((data) => toPayload(data)).put(
        update.url(props.customer.id),
        {
          preserveScroll: true,
          onSuccess: () => {
            toast.success("Data pelanggan berhasil diperbarui.");
          },
          onError: (errors) => {
            showFormErrors(errors);
          }
        }
      );
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: `Edit ${__props.customer.name}`
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-6 rounded-xl p-4 py-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="text-3xl font-bold"${_scopeId}>Edit Pelanggan</h1><p class="mt-2 text-muted-foreground"${_scopeId}> Perbarui data identitas, alamat, rekening, dan catatan pelanggan secara terstruktur. </p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(index).url()
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$2), { variant: "outline" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(ArrowLeft), { class: "mr-2 h-4 w-4" }, null, _parent4, _scopeId3));
                        _push4(` Kembali `);
                      } else {
                        return [
                          createVNode(unref(ArrowLeft), { class: "mr-2 h-4 w-4" }),
                          createTextVNode(" Kembali ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$2), { variant: "outline" }, {
                      default: withCtx(() => [
                        createVNode(unref(ArrowLeft), { class: "mr-2 h-4 w-4" }),
                        createTextVNode(" Kembali ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              form: unref(form),
              "onUpdate:form": ($event) => isRef(form) ? form.value = $event : null,
              mode: "edit",
              sponsors: props.sponsors,
              provinces: unref(provinces),
              cities: unref(cities),
              "loading-provinces": unref(loadingProvinces),
              "loading-cities": unref(loadingCities),
              onSubmit: submit
            }, {
              actions: withCtx(({ processing }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Link), {
                    href: unref(index).url()
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$2), {
                          type: "button",
                          variant: "outline"
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Batal `);
                            } else {
                              return [
                                createTextVNode(" Batal ")
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
                              createTextVNode(" Batal ")
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
                    disabled: processing
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(processing ? "Menyimpan..." : "Simpan Perubahan")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(processing ? "Menyimpan..." : "Simpan Perubahan"), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Link), {
                      href: unref(index).url()
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$2), {
                          type: "button",
                          variant: "outline"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Batal ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode(unref(_sfc_main$2), {
                      type: "submit",
                      disabled: processing
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(processing ? "Menyimpan..." : "Simpan Perubahan"), 1)
                      ]),
                      _: 2
                    }, 1032, ["disabled"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-6 rounded-xl p-4 py-6" }, [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("div", null, [
                    createVNode("h1", { class: "text-3xl font-bold" }, "Edit Pelanggan"),
                    createVNode("p", { class: "mt-2 text-muted-foreground" }, " Perbarui data identitas, alamat, rekening, dan catatan pelanggan secara terstruktur. ")
                  ]),
                  createVNode(unref(Link), {
                    href: unref(index).url()
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$2), { variant: "outline" }, {
                        default: withCtx(() => [
                          createVNode(unref(ArrowLeft), { class: "mr-2 h-4 w-4" }),
                          createTextVNode(" Kembali ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["href"])
                ]),
                createVNode(_sfc_main$3, {
                  form: unref(form),
                  "onUpdate:form": ($event) => isRef(form) ? form.value = $event : null,
                  mode: "edit",
                  sponsors: props.sponsors,
                  provinces: unref(provinces),
                  cities: unref(cities),
                  "loading-provinces": unref(loadingProvinces),
                  "loading-cities": unref(loadingCities),
                  onSubmit: submit
                }, {
                  actions: withCtx(({ processing }) => [
                    createVNode(unref(Link), {
                      href: unref(index).url()
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$2), {
                          type: "button",
                          variant: "outline"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Batal ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode(unref(_sfc_main$2), {
                      type: "submit",
                      disabled: processing
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(processing ? "Menyimpan..." : "Simpan Perubahan"), 1)
                      ]),
                      _: 2
                    }, 1032, ["disabled"])
                  ]),
                  _: 1
                }, 8, ["form", "onUpdate:form", "sponsors", "provinces", "cities", "loading-provinces", "loading-cities"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Customers/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
