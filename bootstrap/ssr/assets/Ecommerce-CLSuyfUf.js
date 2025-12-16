import { defineComponent, unref, mergeProps, withCtx, renderSlot, useSSRContext, createVNode, computed, ref, watchEffect, onUnmounted, watch, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, withModifiers, resolveDynamicComponent } from "vue";
import { ssrRenderComponent, ssrRenderSlot, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrRenderAttrs, ssrRenderVNode } from "vue/server-renderer";
import { _ as _sfc_main$9, a as _sfc_main$a, b as _sfc_main$b } from "./index-D3PKcwoM.js";
import { c as cn, _ as _sfc_main$l } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$e } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$d } from "./Label-16aMY2sx.js";
import { reactiveOmit } from "@vueuse/core";
import { useForwardPropsEmits, RadioGroupRoot, useForwardProps, RadioGroupItem, RadioGroupIndicator } from "reka-ui";
import { Circle, CheckCircle2, AlertCircle, Package, MapPin, Truck, Loader2, Wallet, CreditCard, Home, Smartphone, Laptop, Tv, LockIcon, Search, Sun, Moon, Heart, Trash2, ShoppingCart, Minus, Plus, User, UserCircle, Shield, Info, LogOut, Menu } from "lucide-vue-next";
import { _ as _sfc_main$f, a as _sfc_main$g, b as _sfc_main$h, c as _sfc_main$i, d as _sfc_main$j } from "./SelectValue-BUnv4mQg.js";
import { h as _sfc_main$4, i as _sfc_main$5, j as _sfc_main$6, k as _sfc_main$7, l as _sfc_main$8, e as _sfc_main$c, n as _sfc_main$k, _ as _sfc_main$m, a as _sfc_main$n, b as _sfc_main$p, f as _sfc_main$q, g as _sfc_main$r, c as _sfc_main$t, o as _sfc_main$u } from "./DropdownMenuTrigger-B1v6pHML.js";
import { usePage, Link, router } from "@inertiajs/vue3";
import axios from "axios";
import { toast } from "vue-sonner";
import { _ as _sfc_main$o } from "./index-BpQimeTM.js";
import { _ as _sfc_main$s } from "./Checkbox-CIOQa2-J.js";
import { u as useAppearance } from "./useAppearance-gspEihnp.js";
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "RadioGroup",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    defaultValue: {},
    disabled: { type: Boolean },
    orientation: {},
    dir: {},
    loop: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    name: {},
    required: { type: Boolean },
    class: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = reactiveOmit(props, "class");
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(RadioGroupRoot), mergeProps({
        class: unref(cn)("grid gap-2", props.class)
      }, unref(forwarded), _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/radio-group/RadioGroup.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "RadioGroupItem",
  __ssrInlineRender: true,
  props: {
    id: {},
    value: {},
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    name: {},
    required: { type: Boolean },
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(RadioGroupItem), mergeProps(unref(forwardedProps), {
        class: unref(cn)(
          "peer aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          props.class
        )
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(RadioGroupIndicator), { class: "flex items-center justify-center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Circle), { class: "h-2.5 w-2.5 fill-current text-current" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Circle), { class: "h-2.5 w-2.5 fill-current text-current" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(RadioGroupIndicator), { class: "flex items-center justify-center" }, {
                default: withCtx(() => [
                  createVNode(unref(Circle), { class: "h-2.5 w-2.5 fill-current text-current" })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/radio-group/RadioGroupItem.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CheckoutSheet",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean },
    item: {},
    items: {}
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const allItems = computed(() => {
      if (props.items && props.items.length > 0) {
        return props.items;
      }
      return props.item ? [props.item] : [];
    });
    const isMultipleItems = computed(() => allItems.value.length > 1);
    const totalWeight = computed(() => {
      return allItems.value.reduce((sum, item) => {
        return sum + item.weight * item.quantity;
      }, 0);
    });
    const subtotal = computed(() => {
      return allItems.value.reduce((sum, item) => {
        return sum + item.price * item.quantity;
      }, 0);
    });
    const page = usePage();
    const userWalletBalance = computed(() => {
      return page.props.auth?.user?.ewallet_saldo ?? 0;
    });
    const alertMessage = ref(
      null
    );
    const provinces = ref([]);
    const cities = ref([]);
    const shippingMethods = ref([]);
    const loadingProvinces = ref(false);
    const loadingCities = ref(false);
    const loadingShipping = ref(false);
    const processingOrder = ref(false);
    const midtransPopupOpen = ref(false);
    const handleSheetOpenChange = (val) => {
      if (!val && (midtransPopupOpen.value || processingOrder.value)) {
        return;
      }
      emit("update:open", val);
    };
    const handleOutsideInteraction = (e) => {
      if (midtransPopupOpen.value || processingOrder.value) {
        e.preventDefault();
      }
    };
    const handleEscapeKey = (e) => {
      if (midtransPopupOpen.value || processingOrder.value) {
        e.preventDefault();
      }
    };
    watchEffect(() => {
      if (typeof document !== "undefined") {
        if (midtransPopupOpen.value) {
          document.body.classList.add("midtrans-popup-active");
        } else {
          document.body.classList.remove("midtrans-popup-active");
        }
      }
    });
    onUnmounted(() => {
      if (typeof document !== "undefined") {
        document.body.classList.remove("midtrans-popup-active");
      }
    });
    const form = ref({
      recipient_name: "",
      recipient_phone: "",
      address_line1: "",
      province_id: "",
      city_id: "",
      postal_code: "",
      shipping_courier: "",
      shipping_service: "",
      shipping_cost: 0,
      shipping_etd: "",
      notes: "",
      payment_method: "midtrans"
    });
    const validProvinces = computed(() => provinces.value.filter((p) => p.id));
    const validCities = computed(() => cities.value.filter((c) => c.id));
    const selectedProvince = computed(() => {
      return provinces.value.find((p) => String(p.id) === form.value.province_id);
    });
    const selectedCity = computed(() => {
      return cities.value.find((c) => String(c.id) === form.value.city_id);
    });
    const total = computed(() => {
      return subtotal.value + form.value.shipping_cost;
    });
    const isWalletSufficient = computed(() => {
      return userWalletBalance.value >= total.value;
    });
    const isFormValid = computed(() => {
      const basicValid = form.value.recipient_name && form.value.recipient_phone && form.value.address_line1 && form.value.province_id && form.value.city_id && form.value.postal_code && form.value.shipping_courier && form.value.shipping_service && form.value.shipping_cost > 0 && form.value.payment_method;
      if (form.value.payment_method === "wallet" && !isWalletSufficient.value) {
        return false;
      }
      return basicValid;
    });
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(amount);
    };
    const loadProvinces = async () => {
      loadingProvinces.value = true;
      try {
        const response = await fetch("/api/shipping/provinces");
        const data = await response.json();
        if (data.success) {
          provinces.value = data.data;
          console.log(
            "Provinces loaded successfully:",
            provinces.value.length
          );
        } else {
          console.error("gagal load provinces: success=false");
          toast.error("Gagal memuat provinsi: success=false");
        }
      } catch (error) {
        console.error("Gagal memuat provinsi:", error);
        toast.error("Gagal memuat provinsi");
      } finally {
        loadingProvinces.value = false;
      }
    };
    watch(
      () => form.value.province_id,
      async (newProvinceId) => {
        console.log("Province changed:", newProvinceId);
        if (!newProvinceId) return;
        form.value.city_id = "";
        form.value.shipping_courier = "";
        form.value.shipping_service = "";
        form.value.shipping_cost = 0;
        cities.value = [];
        shippingMethods.value = [];
        loadingCities.value = true;
        try {
          console.log("Fetching cities for province:", newProvinceId);
          const response = await fetch(
            `/api/shipping/cities?province_id=${newProvinceId}`
          );
          const data = await response.json();
          console.log("Cities response:", data);
          if (data.success) {
            cities.value = data.data;
          } else {
            toast.error("Gagal memuat kota: success=false");
          }
        } catch (error) {
          console.error("Gagal memuat kota:", error);
          toast.error("Gagal memuat kota");
        } finally {
          loadingCities.value = false;
        }
      }
    );
    watch(
      () => form.value.city_id,
      async (newCityId) => {
        console.log("City changed:", newCityId);
        if (!newCityId) return;
        const city = cities.value.find((c) => String(c.id) === newCityId);
        if (city && city.postal_code) {
          form.value.postal_code = city.postal_code;
        }
        form.value.shipping_courier = "";
        form.value.shipping_service = "";
        form.value.shipping_cost = 0;
        shippingMethods.value = [];
        loadingShipping.value = true;
        try {
          const response = await axios.post("/api/shipping/calculate", {
            destination_city_id: parseInt(newCityId),
            weight: totalWeight.value
          });
          const data = response.data;
          if (data.success) {
            shippingMethods.value = data.data;
          }
        } catch (error) {
          toast.error("Gagal menghitung ongkos kirim:");
          console.log(error);
        } finally {
          loadingShipping.value = false;
        }
      }
    );
    const selectShippingService = (courier, service) => {
      form.value.shipping_courier = courier.code;
      form.value.shipping_service = service.service;
      form.value.shipping_cost = service.cost[0].value;
      form.value.shipping_etd = service.cost[0].etd;
    };
    const handleCheckout = async () => {
      if (!isFormValid.value) {
        alertMessage.value = {
          type: "error",
          message: "Mohon lengkapi semua data pengiriman"
        };
        return;
      }
      if (allItems.value.length === 0) {
        alertMessage.value = {
          type: "error",
          message: "Tidak ada produk untuk di-checkout"
        };
        toast.error("Tidak ada produk untuk di-checkout");
        return;
      }
      if (form.value.payment_method === "midtrans") {
        const snapInstance = window.snap;
        if (!snapInstance) {
          alertMessage.value = {
            type: "error",
            message: "Sistem pembayaran belum siap. Mohon refresh halaman."
          };
          return;
        }
      }
      if (form.value.payment_method === "wallet" && !isWalletSufficient.value) {
        alertMessage.value = {
          type: "error",
          message: "Saldo e-wallet Anda tidak mencukupi"
        };
        return;
      }
      processingOrder.value = true;
      alertMessage.value = null;
      try {
        const items = allItems.value.map((item) => ({
          product_id: item.product_id,
          product_name: item.name,
          product_price: item.price,
          quantity: item.quantity,
          weight: item.weight,
          product_image: item.image
        }));
        console.log("Sending checkout data:", {
          items,
          allItems: allItems.value
        });
        const payload = {
          items,
          // Send all items as array
          shipping: {
            recipient_name: form.value.recipient_name,
            recipient_phone: form.value.recipient_phone,
            address_line1: form.value.address_line1,
            province_label: selectedProvince.value?.name,
            province_id: form.value.province_id,
            city_label: `${selectedCity.value?.type} ${selectedCity.value?.name}`,
            city_id: form.value.city_id,
            postal_code: form.value.postal_code,
            courier: form.value.shipping_courier,
            service: form.value.shipping_service,
            cost: form.value.shipping_cost,
            etd: form.value.shipping_etd
          },
          notes: form.value.notes,
          subtotal: subtotal.value,
          shipping_cost: form.value.shipping_cost,
          total: total.value,
          payment_method: form.value.payment_method
        };
        console.log("Full payload:", JSON.stringify(payload, null, 2));
        const response = await axios.post("/checkout/process", payload);
        const data = response.data;
        if (data.success) {
          alertMessage.value = {
            type: "success",
            message: data.message || "Pesanan berhasil dibuat!"
          };
          toast.success(data.message || "Pesanan berhasil dibuat!");
          if (form.value.payment_method === "wallet") {
            if (typeof window !== "undefined") {
              window.location.href = `/checkout/finish?order_no=${data.order_no}`;
            }
            return;
          }
          if (typeof window !== "undefined" && data.snap_token) {
            const snapInstance = window.snap;
            midtransPopupOpen.value = true;
            snapInstance.pay(data.snap_token, {
              onSuccess: function(result) {
                midtransPopupOpen.value = false;
                toast.success("Pembayaran berhasil " + result.order_id);
                if (typeof window !== "undefined") {
                  window.location.href = `/checkout/finish?order_no=${data.order_no}`;
                }
              },
              onPending: function(result) {
                midtransPopupOpen.value = false;
                toast.info("Pembayaran tertunda " + result.order_id);
                if (typeof window !== "undefined") {
                  window.location.href = `/checkout/finish?order_no=${data.order_no}`;
                }
              },
              onError: function(result) {
                midtransPopupOpen.value = false;
                processingOrder.value = false;
                toast.error("Pembayaran gagal. Silakan coba lagi. " + result.order_id);
                alertMessage.value = {
                  type: "error",
                  message: "Pembayaran gagal. Silakan coba lagi."
                };
                setTimeout(() => {
                  document.body.classList.remove("midtrans-popup-active");
                }, 100);
              },
              onClose: function() {
                midtransPopupOpen.value = false;
                processingOrder.value = false;
                toast.info("Pembayaran dibatalkan.");
                setTimeout(() => {
                  document.body.classList.remove("midtrans-popup-active");
                }, 100);
              }
            });
            form.value = {
              recipient_name: "",
              recipient_phone: "",
              address_line1: "",
              province_id: "",
              city_id: "",
              postal_code: "",
              shipping_courier: "",
              shipping_service: "",
              shipping_cost: 0,
              shipping_etd: "",
              notes: "",
              payment_method: "midtrans"
            };
          }
        } else {
          alertMessage.value = {
            type: "error",
            message: data.message || "Gagal memproses checkout. Silakan coba lagi."
          };
          toast.error(
            data.message || "Gagal memproses checkout. Silakan coba lagi."
          );
        }
      } catch (error) {
        if (error.response?.status === 401) {
          const message = error.response?.data?.message || "Anda harus login terlebih dahulu.";
          alertMessage.value = { type: "error", message };
          toast.error(message);
          setTimeout(() => {
            emit("update:open", false);
            if (typeof window !== "undefined") {
              const redirectUrl = error.response?.data?.redirect || "/client/login";
              window.location.href = redirectUrl;
            }
          }, 2e3);
          return;
        }
        alertMessage.value = {
          type: "error",
          message: error.response?.data?.message || "Gagal memproses checkout. Silakan coba lagi."
        };
        toast.error(
          error.response?.data?.message || "Gagal memproses checkout. Silakan coba lagi."
        );
      } finally {
        processingOrder.value = false;
      }
    };
    watch(
      () => props.open,
      (isOpen) => {
        if (isOpen) {
          if (provinces.value.length === 0) {
            loadProvinces();
          } else {
            console.log(
              "Provinces already loaded:",
              provinces.value.length
            );
          }
        }
      },
      { immediate: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$4), mergeProps({
        open: __props.open,
        "onUpdate:open": handleSheetOpenChange
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$5), {
              side: "right",
              class: "w-full overflow-y-auto sm:max-w-2xl",
              "trap-focus": false,
              onPointerDownOutside: handleOutsideInteraction,
              onInteractOutside: handleOutsideInteraction,
              onEscapeKeyDown: handleEscapeKey
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$6), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$7), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Checkout`);
                            } else {
                              return [
                                createTextVNode("Checkout")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$8), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Lengkapi data pengiriman untuk melanjutkan pembelian `);
                            } else {
                              return [
                                createTextVNode(" Lengkapi data pengiriman untuk melanjutkan pembelian ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$7), null, {
                            default: withCtx(() => [
                              createTextVNode("Checkout")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              createTextVNode(" Lengkapi data pengiriman untuk melanjutkan pembelian ")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="space-y-6 py-6"${_scopeId2}>`);
                  if (alertMessage.value?.type === "success") {
                    _push3(ssrRenderComponent(unref(_sfc_main$9), { variant: "default" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(CheckCircle2), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$a), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Berhasil!`);
                              } else {
                                return [
                                  createTextVNode("Berhasil!")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$b), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(alertMessage.value.message)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(alertMessage.value.message), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(CheckCircle2), { class: "h-4 w-4" }),
                            createVNode(unref(_sfc_main$a), null, {
                              default: withCtx(() => [
                                createTextVNode("Berhasil!")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$b), null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(alertMessage.value.message), 1)
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (alertMessage.value?.type === "error") {
                    _push3(ssrRenderComponent(unref(_sfc_main$9), { variant: "destructive" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(AlertCircle), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$a), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Terjadi Kesalahan`);
                              } else {
                                return [
                                  createTextVNode("Terjadi Kesalahan")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$b), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(alertMessage.value.message)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(alertMessage.value.message), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(AlertCircle), { class: "h-4 w-4" }),
                            createVNode(unref(_sfc_main$a), null, {
                              default: withCtx(() => [
                                createTextVNode("Terjadi Kesalahan")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$b), null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(alertMessage.value.message), 1)
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<div class="space-y-3"${_scopeId2}><div class="flex items-center gap-2 text-sm font-medium"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Package), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(`<span${_scopeId2}>Ringkasan Produk</span>`);
                  if (isMultipleItems.value) {
                    _push3(`<span class="ml-auto text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(allItems.value.length)} Produk </span>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="space-y-3"${_scopeId2}><!--[-->`);
                  ssrRenderList(allItems.value, (item) => {
                    _push3(`<div class="flex gap-4 rounded-lg bg-muted p-4"${_scopeId2}><img${ssrRenderAttr("src", item.image)}${ssrRenderAttr("alt", item.name)} class="h-20 w-20 rounded-md object-cover"${_scopeId2}><div class="flex-1"${_scopeId2}><h4 class="font-medium"${_scopeId2}>${ssrInterpolate(item.name)}</h4><p class="text-sm text-muted-foreground"${_scopeId2}>${ssrInterpolate(item.quantity)}x ${ssrInterpolate(formatCurrency(item.price))}</p><p class="text-sm text-muted-foreground"${_scopeId2}> Berat: ${ssrInterpolate(item.weight * item.quantity)}g </p></div><div class="text-right"${_scopeId2}><p class="font-semibold"${_scopeId2}>${ssrInterpolate(formatCurrency(item.price * item.quantity))}</p></div></div>`);
                  });
                  _push3(`<!--]--><div class="space-y-2 rounded-lg bg-muted/50 p-3 text-sm"${_scopeId2}><div class="flex items-center justify-between"${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Subtotal Produk:</span><span class="font-semibold"${_scopeId2}>${ssrInterpolate(formatCurrency(subtotal.value))}</span></div>`);
                  if (isMultipleItems.value) {
                    _push3(`<div class="flex items-center justify-between text-xs text-muted-foreground"${_scopeId2}><span${_scopeId2}>Total Berat:</span><span${_scopeId2}>${ssrInterpolate(totalWeight.value)}g</span></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div></div></div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$c), null, null, _parent3, _scopeId2));
                  _push3(`<div class="space-y-4"${_scopeId2}><div class="flex items-center gap-2 text-sm font-medium"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(MapPin), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(`<span${_scopeId2}>Alamat Pengiriman</span></div><div class="space-y-4"${_scopeId2}><div class="grid grid-cols-2 gap-4"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$d), { for: "recipient_name" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Nama Penerima`);
                      } else {
                        return [
                          createTextVNode("Nama Penerima")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$e), {
                    id: "recipient_name",
                    modelValue: form.value.recipient_name,
                    "onUpdate:modelValue": ($event) => form.value.recipient_name = $event,
                    placeholder: "Nama lengkap"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$d), { for: "recipient_phone" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`No. Telepon`);
                      } else {
                        return [
                          createTextVNode("No. Telepon")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$e), {
                    id: "recipient_phone",
                    modelValue: form.value.recipient_phone,
                    "onUpdate:modelValue": ($event) => form.value.recipient_phone = $event,
                    placeholder: "08xxxxxxxxxx"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$d), { for: "address_line1" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Alamat Lengkap`);
                      } else {
                        return [
                          createTextVNode("Alamat Lengkap")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$e), {
                    id: "address_line1",
                    modelValue: form.value.address_line1,
                    "onUpdate:modelValue": ($event) => form.value.address_line1 = $event,
                    placeholder: "Jalan, nomor rumah, RT/RW"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid grid-cols-2 gap-4"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$d), { for: "province" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Provinsi`);
                      } else {
                        return [
                          createTextVNode("Provinsi")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$f), {
                    modelValue: form.value.province_id,
                    "onUpdate:modelValue": ($event) => form.value.province_id = $event,
                    disabled: loadingProvinces.value
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$g), { id: "province" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$h), {
                                placeholder: loadingProvinces.value ? "Memuat provinsi..." : "Pilih provinsi"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$h), {
                                  placeholder: loadingProvinces.value ? "Memuat provinsi..." : "Pilih provinsi"
                                }, null, 8, ["placeholder"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$i), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(validProvinces.value, (province) => {
                                _push5(ssrRenderComponent(unref(_sfc_main$j), {
                                  key: province.id,
                                  value: String(province.id)
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(province.name)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(province.name), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(true), createBlock(Fragment, null, renderList(validProvinces.value, (province) => {
                                  return openBlock(), createBlock(unref(_sfc_main$j), {
                                    key: province.id,
                                    value: String(province.id)
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(province.name), 1)
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
                          createVNode(unref(_sfc_main$g), { id: "province" }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$h), {
                                placeholder: loadingProvinces.value ? "Memuat provinsi..." : "Pilih provinsi"
                              }, null, 8, ["placeholder"])
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$i), null, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(validProvinces.value, (province) => {
                                return openBlock(), createBlock(unref(_sfc_main$j), {
                                  key: province.id,
                                  value: String(province.id)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(province.name), 1)
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
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$d), { for: "city" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Kota/Kabupaten`);
                      } else {
                        return [
                          createTextVNode("Kota/Kabupaten")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$f), {
                    modelValue: form.value.city_id,
                    "onUpdate:modelValue": ($event) => form.value.city_id = $event,
                    disabled: loadingCities.value || !form.value.province_id
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$g), { id: "city" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$h), {
                                placeholder: loadingCities.value ? "Memuat kota..." : !form.value.province_id ? "Pilih provinsi terlebih dahulu" : "Pilih kota"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$h), {
                                  placeholder: loadingCities.value ? "Memuat kota..." : !form.value.province_id ? "Pilih provinsi terlebih dahulu" : "Pilih kota"
                                }, null, 8, ["placeholder"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$i), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(validCities.value, (city) => {
                                _push5(ssrRenderComponent(unref(_sfc_main$j), {
                                  key: city.id,
                                  value: String(city.id)
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(city.type)} ${ssrInterpolate(city.name)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(city.type) + " " + toDisplayString(city.name), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(true), createBlock(Fragment, null, renderList(validCities.value, (city) => {
                                  return openBlock(), createBlock(unref(_sfc_main$j), {
                                    key: city.id,
                                    value: String(city.id)
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(city.type) + " " + toDisplayString(city.name), 1)
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
                          createVNode(unref(_sfc_main$g), { id: "city" }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$h), {
                                placeholder: loadingCities.value ? "Memuat kota..." : !form.value.province_id ? "Pilih provinsi terlebih dahulu" : "Pilih kota"
                              }, null, 8, ["placeholder"])
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$i), null, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(validCities.value, (city) => {
                                return openBlock(), createBlock(unref(_sfc_main$j), {
                                  key: city.id,
                                  value: String(city.id)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(city.type) + " " + toDisplayString(city.name), 1)
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
                  _push3(`</div></div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$d), { for: "postal_code" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Kode Pos`);
                      } else {
                        return [
                          createTextVNode("Kode Pos")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$e), {
                    id: "postal_code",
                    modelValue: form.value.postal_code,
                    "onUpdate:modelValue": ($event) => form.value.postal_code = $event,
                    placeholder: "12345"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div></div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$c), null, null, _parent3, _scopeId2));
                  _push3(`<div class="space-y-4"${_scopeId2}><div class="flex items-center gap-2 text-sm font-medium"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Truck), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(`<span${_scopeId2}>Metode Pengiriman</span></div>`);
                  if (loadingShipping.value) {
                    _push3(`<div class="flex items-center justify-center py-8"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Loader2), { class: "h-6 w-6 animate-spin text-muted-foreground" }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else if (shippingMethods.value.length > 0) {
                    _push3(`<div class="space-y-3"${_scopeId2}><!--[-->`);
                    ssrRenderList(shippingMethods.value, (courier) => {
                      _push3(`<div class="space-y-2"${_scopeId2}><div class="text-sm font-medium uppercase"${_scopeId2}>${ssrInterpolate(courier.name)}</div><!--[-->`);
                      ssrRenderList(courier.costs, (service) => {
                        _push3(`<div class="${ssrRenderClass([{
                          "border-primary bg-primary/10": form.value.shipping_service === service.service && form.value.shipping_courier === courier.code,
                          "hover:bg-muted": !(form.value.shipping_service === service.service && form.value.shipping_courier === courier.code)
                        }, "flex cursor-pointer items-center space-x-3 rounded-lg border p-3 transition-colors"])}"${_scopeId2}><div class="flex-shrink-0"${_scopeId2}><div class="${ssrRenderClass([{
                          "border-primary bg-primary": form.value.shipping_service === service.service && form.value.shipping_courier === courier.code,
                          "border-muted-foreground": !(form.value.shipping_service === service.service && form.value.shipping_courier === courier.code)
                        }, "flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors"])}"${_scopeId2}>`);
                        if (form.value.shipping_service === service.service && form.value.shipping_courier === courier.code) {
                          _push3(`<div class="h-2 w-2 rounded-full bg-primary-foreground"${_scopeId2}></div>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        _push3(`</div></div><div class="flex-1"${_scopeId2}><div class="flex items-start justify-between"${_scopeId2}><div${_scopeId2}><div class="font-medium"${_scopeId2}>${ssrInterpolate(service.service)}</div><div class="text-sm text-muted-foreground"${_scopeId2}>${ssrInterpolate(service.description)}</div><div class="text-sm text-muted-foreground"${_scopeId2}> Estimasi: ${ssrInterpolate(service.cost[0].etd)} hari </div></div><div class="font-semibold"${_scopeId2}>${ssrInterpolate(formatCurrency(
                          service.cost[0].value
                        ))}</div></div></div></div>`);
                      });
                      _push3(`<!--]--></div>`);
                    });
                    _push3(`<!--]--></div>`);
                  } else if (form.value.city_id) {
                    _push3(`<div class="py-8 text-center text-muted-foreground"${_scopeId2}> Tidak ada metode pengiriman tersedia </div>`);
                  } else {
                    _push3(`<div class="py-8 text-center text-muted-foreground"${_scopeId2}> Pilih alamat pengiriman untuk melihat metode pengiriman </div>`);
                  }
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$c), null, null, _parent3, _scopeId2));
                  _push3(`<div class="space-y-4"${_scopeId2}><div class="flex items-center gap-2 text-sm font-medium"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Wallet), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(`<span${_scopeId2}>Metode Pembayaran</span></div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$3), {
                    modelValue: form.value.payment_method,
                    "onUpdate:modelValue": ($event) => form.value.payment_method = $event,
                    class: "space-y-3"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="${ssrRenderClass([{
                          "border-primary bg-primary/10": form.value.payment_method === "wallet",
                          "hover:bg-muted": form.value.payment_method !== "wallet",
                          "cursor-not-allowed opacity-50": !isWalletSufficient.value
                        }, "flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors"])}"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$2), {
                          value: "wallet",
                          id: "payment-wallet",
                          disabled: !isWalletSufficient.value
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$d), {
                          for: "payment-wallet",
                          class: ["flex-1 cursor-pointer", {
                            "cursor-not-allowed": !isWalletSufficient.value
                          }]
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="flex items-start justify-between"${_scopeId4}><div${_scopeId4}><div class="flex items-center gap-2 font-medium"${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Wallet), { class: "h-4 w-4" }, null, _parent5, _scopeId4));
                              _push5(` E-Wallet </div><div class="text-sm text-muted-foreground"${_scopeId4}> Saldo: ${ssrInterpolate(formatCurrency(
                                userWalletBalance.value
                              ))}</div>`);
                              if (!isWalletSufficient.value) {
                                _push5(`<div class="mt-1 text-xs text-destructive"${_scopeId4}> Saldo tidak mencukupi (kurang ${ssrInterpolate(formatCurrency(
                                  total.value - userWalletBalance.value
                                ))}) </div>`);
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(`</div></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "flex items-start justify-between" }, [
                                  createVNode("div", null, [
                                    createVNode("div", { class: "flex items-center gap-2 font-medium" }, [
                                      createVNode(unref(Wallet), { class: "h-4 w-4" }),
                                      createTextVNode(" E-Wallet ")
                                    ]),
                                    createVNode("div", { class: "text-sm text-muted-foreground" }, " Saldo: " + toDisplayString(formatCurrency(
                                      userWalletBalance.value
                                    )), 1),
                                    !isWalletSufficient.value ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "mt-1 text-xs text-destructive"
                                    }, " Saldo tidak mencukupi (kurang " + toDisplayString(formatCurrency(
                                      total.value - userWalletBalance.value
                                    )) + ") ", 1)) : createCommentVNode("", true)
                                  ])
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div><div class="${ssrRenderClass([{
                          "border-primary bg-primary/10": form.value.payment_method === "midtrans",
                          "hover:bg-muted": form.value.payment_method !== "midtrans"
                        }, "flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors"])}"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$2), {
                          value: "midtrans",
                          id: "payment-midtrans"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$d), {
                          for: "payment-midtrans",
                          class: "flex-1 cursor-pointer"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="flex items-start justify-between"${_scopeId4}><div${_scopeId4}><div class="flex items-center gap-2 font-medium"${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(CreditCard), { class: "h-4 w-4" }, null, _parent5, _scopeId4));
                              _push5(` Payment Gateway </div><div class="text-sm text-muted-foreground"${_scopeId4}> Transfer Bank, E-wallet, Kartu Kredit </div></div></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "flex items-start justify-between" }, [
                                  createVNode("div", null, [
                                    createVNode("div", { class: "flex items-center gap-2 font-medium" }, [
                                      createVNode(unref(CreditCard), { class: "h-4 w-4" }),
                                      createTextVNode(" Payment Gateway ")
                                    ]),
                                    createVNode("div", { class: "text-sm text-muted-foreground" }, " Transfer Bank, E-wallet, Kartu Kredit ")
                                  ])
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", {
                            class: ["flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors", {
                              "border-primary bg-primary/10": form.value.payment_method === "wallet",
                              "hover:bg-muted": form.value.payment_method !== "wallet",
                              "cursor-not-allowed opacity-50": !isWalletSufficient.value
                            }],
                            onClick: ($event) => isWalletSufficient.value && (form.value.payment_method = "wallet")
                          }, [
                            createVNode(unref(_sfc_main$2), {
                              value: "wallet",
                              id: "payment-wallet",
                              disabled: !isWalletSufficient.value
                            }, null, 8, ["disabled"]),
                            createVNode(unref(_sfc_main$d), {
                              for: "payment-wallet",
                              class: ["flex-1 cursor-pointer", {
                                "cursor-not-allowed": !isWalletSufficient.value
                              }]
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex items-start justify-between" }, [
                                  createVNode("div", null, [
                                    createVNode("div", { class: "flex items-center gap-2 font-medium" }, [
                                      createVNode(unref(Wallet), { class: "h-4 w-4" }),
                                      createTextVNode(" E-Wallet ")
                                    ]),
                                    createVNode("div", { class: "text-sm text-muted-foreground" }, " Saldo: " + toDisplayString(formatCurrency(
                                      userWalletBalance.value
                                    )), 1),
                                    !isWalletSufficient.value ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "mt-1 text-xs text-destructive"
                                    }, " Saldo tidak mencukupi (kurang " + toDisplayString(formatCurrency(
                                      total.value - userWalletBalance.value
                                    )) + ") ", 1)) : createCommentVNode("", true)
                                  ])
                                ])
                              ]),
                              _: 1
                            }, 8, ["class"])
                          ], 10, ["onClick"]),
                          createVNode("div", {
                            class: ["flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors", {
                              "border-primary bg-primary/10": form.value.payment_method === "midtrans",
                              "hover:bg-muted": form.value.payment_method !== "midtrans"
                            }],
                            onClick: ($event) => form.value.payment_method = "midtrans"
                          }, [
                            createVNode(unref(_sfc_main$2), {
                              value: "midtrans",
                              id: "payment-midtrans"
                            }),
                            createVNode(unref(_sfc_main$d), {
                              for: "payment-midtrans",
                              class: "flex-1 cursor-pointer"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex items-start justify-between" }, [
                                  createVNode("div", null, [
                                    createVNode("div", { class: "flex items-center gap-2 font-medium" }, [
                                      createVNode(unref(CreditCard), { class: "h-4 w-4" }),
                                      createTextVNode(" Payment Gateway ")
                                    ]),
                                    createVNode("div", { class: "text-sm text-muted-foreground" }, " Transfer Bank, E-wallet, Kartu Kredit ")
                                  ])
                                ])
                              ]),
                              _: 1
                            })
                          ], 10, ["onClick"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$c), null, null, _parent3, _scopeId2));
                  _push3(`<div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$d), { for: "notes" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Catatan (Opsional)`);
                      } else {
                        return [
                          createTextVNode("Catatan (Opsional)")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$e), {
                    id: "notes",
                    modelValue: form.value.notes,
                    "onUpdate:modelValue": ($event) => form.value.notes = $event,
                    placeholder: "Catatan untuk penjual"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$c), null, null, _parent3, _scopeId2));
                  _push3(`<div class="space-y-3"${_scopeId2}><div class="flex items-center gap-2 text-sm font-medium"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(CreditCard), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(`<span${_scopeId2}>Ringkasan Pembayaran</span></div><div class="space-y-2 text-sm"${_scopeId2}><div class="flex justify-between"${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Subtotal</span><span${_scopeId2}>${ssrInterpolate(formatCurrency(subtotal.value))}</span></div><div class="flex justify-between"${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Ongkos Kirim</span><span${_scopeId2}>${ssrInterpolate(formatCurrency(form.value.shipping_cost))}</span></div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$c), null, null, _parent3, _scopeId2));
                  _push3(`<div class="flex justify-between text-base font-semibold"${_scopeId2}><span${_scopeId2}>Total</span><span${_scopeId2}>${ssrInterpolate(formatCurrency(total.value))}</span></div></div></div></div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$k), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$l), {
                          onClick: handleCheckout,
                          disabled: !isFormValid.value || processingOrder.value || midtransPopupOpen.value,
                          class: "w-full",
                          size: "lg"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (processingOrder.value) {
                                _push5(ssrRenderComponent(unref(Loader2), { class: "mr-2 h-4 w-4 animate-spin" }, null, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              if (form.value.payment_method === "wallet") {
                                _push5(`<span${_scopeId4}> Bayar dengan E-Wallet ${ssrInterpolate(formatCurrency(total.value))}</span>`);
                              } else {
                                _push5(`<span${_scopeId4}> Bayar ${ssrInterpolate(formatCurrency(total.value))}</span>`);
                              }
                            } else {
                              return [
                                processingOrder.value ? (openBlock(), createBlock(unref(Loader2), {
                                  key: 0,
                                  class: "mr-2 h-4 w-4 animate-spin"
                                })) : createCommentVNode("", true),
                                form.value.payment_method === "wallet" ? (openBlock(), createBlock("span", { key: 1 }, " Bayar dengan E-Wallet " + toDisplayString(formatCurrency(total.value)), 1)) : (openBlock(), createBlock("span", { key: 2 }, " Bayar " + toDisplayString(formatCurrency(total.value)), 1))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$l), {
                            onClick: handleCheckout,
                            disabled: !isFormValid.value || processingOrder.value || midtransPopupOpen.value,
                            class: "w-full",
                            size: "lg"
                          }, {
                            default: withCtx(() => [
                              processingOrder.value ? (openBlock(), createBlock(unref(Loader2), {
                                key: 0,
                                class: "mr-2 h-4 w-4 animate-spin"
                              })) : createCommentVNode("", true),
                              form.value.payment_method === "wallet" ? (openBlock(), createBlock("span", { key: 1 }, " Bayar dengan E-Wallet " + toDisplayString(formatCurrency(total.value)), 1)) : (openBlock(), createBlock("span", { key: 2 }, " Bayar " + toDisplayString(formatCurrency(total.value)), 1))
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$6), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$7), null, {
                          default: withCtx(() => [
                            createTextVNode("Checkout")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), null, {
                          default: withCtx(() => [
                            createTextVNode(" Lengkapi data pengiriman untuk melanjutkan pembelian ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "space-y-6 py-6" }, [
                      alertMessage.value?.type === "success" ? (openBlock(), createBlock(unref(_sfc_main$9), {
                        key: 0,
                        variant: "default"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(CheckCircle2), { class: "h-4 w-4" }),
                          createVNode(unref(_sfc_main$a), null, {
                            default: withCtx(() => [
                              createTextVNode("Berhasil!")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$b), null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(alertMessage.value.message), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      alertMessage.value?.type === "error" ? (openBlock(), createBlock(unref(_sfc_main$9), {
                        key: 1,
                        variant: "destructive"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(AlertCircle), { class: "h-4 w-4" }),
                          createVNode(unref(_sfc_main$a), null, {
                            default: withCtx(() => [
                              createTextVNode("Terjadi Kesalahan")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$b), null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(alertMessage.value.message), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      createVNode("div", { class: "space-y-3" }, [
                        createVNode("div", { class: "flex items-center gap-2 text-sm font-medium" }, [
                          createVNode(unref(Package), { class: "h-4 w-4" }),
                          createVNode("span", null, "Ringkasan Produk"),
                          isMultipleItems.value ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "ml-auto text-xs text-muted-foreground"
                          }, toDisplayString(allItems.value.length) + " Produk ", 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "space-y-3" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(allItems.value, (item) => {
                            return openBlock(), createBlock("div", {
                              key: item.id,
                              class: "flex gap-4 rounded-lg bg-muted p-4"
                            }, [
                              createVNode("img", {
                                src: item.image,
                                alt: item.name,
                                class: "h-20 w-20 rounded-md object-cover"
                              }, null, 8, ["src", "alt"]),
                              createVNode("div", { class: "flex-1" }, [
                                createVNode("h4", { class: "font-medium" }, toDisplayString(item.name), 1),
                                createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(item.quantity) + "x " + toDisplayString(formatCurrency(item.price)), 1),
                                createVNode("p", { class: "text-sm text-muted-foreground" }, " Berat: " + toDisplayString(item.weight * item.quantity) + "g ", 1)
                              ]),
                              createVNode("div", { class: "text-right" }, [
                                createVNode("p", { class: "font-semibold" }, toDisplayString(formatCurrency(item.price * item.quantity)), 1)
                              ])
                            ]);
                          }), 128)),
                          createVNode("div", { class: "space-y-2 rounded-lg bg-muted/50 p-3 text-sm" }, [
                            createVNode("div", { class: "flex items-center justify-between" }, [
                              createVNode("span", { class: "text-muted-foreground" }, "Subtotal Produk:"),
                              createVNode("span", { class: "font-semibold" }, toDisplayString(formatCurrency(subtotal.value)), 1)
                            ]),
                            isMultipleItems.value ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "flex items-center justify-between text-xs text-muted-foreground"
                            }, [
                              createVNode("span", null, "Total Berat:"),
                              createVNode("span", null, toDisplayString(totalWeight.value) + "g", 1)
                            ])) : createCommentVNode("", true)
                          ])
                        ])
                      ]),
                      createVNode(unref(_sfc_main$c)),
                      createVNode("div", { class: "space-y-4" }, [
                        createVNode("div", { class: "flex items-center gap-2 text-sm font-medium" }, [
                          createVNode(unref(MapPin), { class: "h-4 w-4" }),
                          createVNode("span", null, "Alamat Pengiriman")
                        ]),
                        createVNode("div", { class: "space-y-4" }, [
                          createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$d), { for: "recipient_name" }, {
                                default: withCtx(() => [
                                  createTextVNode("Nama Penerima")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$e), {
                                id: "recipient_name",
                                modelValue: form.value.recipient_name,
                                "onUpdate:modelValue": ($event) => form.value.recipient_name = $event,
                                placeholder: "Nama lengkap"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$d), { for: "recipient_phone" }, {
                                default: withCtx(() => [
                                  createTextVNode("No. Telepon")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$e), {
                                id: "recipient_phone",
                                modelValue: form.value.recipient_phone,
                                "onUpdate:modelValue": ($event) => form.value.recipient_phone = $event,
                                placeholder: "08xxxxxxxxxx"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$d), { for: "address_line1" }, {
                              default: withCtx(() => [
                                createTextVNode("Alamat Lengkap")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$e), {
                              id: "address_line1",
                              modelValue: form.value.address_line1,
                              "onUpdate:modelValue": ($event) => form.value.address_line1 = $event,
                              placeholder: "Jalan, nomor rumah, RT/RW"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$d), { for: "province" }, {
                                default: withCtx(() => [
                                  createTextVNode("Provinsi")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$f), {
                                modelValue: form.value.province_id,
                                "onUpdate:modelValue": ($event) => form.value.province_id = $event,
                                disabled: loadingProvinces.value
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$g), { id: "province" }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$h), {
                                        placeholder: loadingProvinces.value ? "Memuat provinsi..." : "Pilih provinsi"
                                      }, null, 8, ["placeholder"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$i), null, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(validProvinces.value, (province) => {
                                        return openBlock(), createBlock(unref(_sfc_main$j), {
                                          key: province.id,
                                          value: String(province.id)
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(province.name), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["value"]);
                                      }), 128))
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$d), { for: "city" }, {
                                default: withCtx(() => [
                                  createTextVNode("Kota/Kabupaten")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$f), {
                                modelValue: form.value.city_id,
                                "onUpdate:modelValue": ($event) => form.value.city_id = $event,
                                disabled: loadingCities.value || !form.value.province_id
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$g), { id: "city" }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$h), {
                                        placeholder: loadingCities.value ? "Memuat kota..." : !form.value.province_id ? "Pilih provinsi terlebih dahulu" : "Pilih kota"
                                      }, null, 8, ["placeholder"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$i), null, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(validCities.value, (city) => {
                                        return openBlock(), createBlock(unref(_sfc_main$j), {
                                          key: city.id,
                                          value: String(city.id)
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(city.type) + " " + toDisplayString(city.name), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["value"]);
                                      }), 128))
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                            ])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$d), { for: "postal_code" }, {
                              default: withCtx(() => [
                                createTextVNode("Kode Pos")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$e), {
                              id: "postal_code",
                              modelValue: form.value.postal_code,
                              "onUpdate:modelValue": ($event) => form.value.postal_code = $event,
                              placeholder: "12345"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ])
                        ])
                      ]),
                      createVNode(unref(_sfc_main$c)),
                      createVNode("div", { class: "space-y-4" }, [
                        createVNode("div", { class: "flex items-center gap-2 text-sm font-medium" }, [
                          createVNode(unref(Truck), { class: "h-4 w-4" }),
                          createVNode("span", null, "Metode Pengiriman")
                        ]),
                        loadingShipping.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex items-center justify-center py-8"
                        }, [
                          createVNode(unref(Loader2), { class: "h-6 w-6 animate-spin text-muted-foreground" })
                        ])) : shippingMethods.value.length > 0 ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "space-y-3"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(shippingMethods.value, (courier) => {
                            return openBlock(), createBlock("div", {
                              key: courier.code,
                              class: "space-y-2"
                            }, [
                              createVNode("div", { class: "text-sm font-medium uppercase" }, toDisplayString(courier.name), 1),
                              (openBlock(true), createBlock(Fragment, null, renderList(courier.costs, (service) => {
                                return openBlock(), createBlock("div", {
                                  key: `${courier.code}-${service.service}`,
                                  class: ["flex cursor-pointer items-center space-x-3 rounded-lg border p-3 transition-colors", {
                                    "border-primary bg-primary/10": form.value.shipping_service === service.service && form.value.shipping_courier === courier.code,
                                    "hover:bg-muted": !(form.value.shipping_service === service.service && form.value.shipping_courier === courier.code)
                                  }],
                                  onClick: ($event) => selectShippingService(courier, service)
                                }, [
                                  createVNode("div", { class: "flex-shrink-0" }, [
                                    createVNode("div", {
                                      class: ["flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors", {
                                        "border-primary bg-primary": form.value.shipping_service === service.service && form.value.shipping_courier === courier.code,
                                        "border-muted-foreground": !(form.value.shipping_service === service.service && form.value.shipping_courier === courier.code)
                                      }]
                                    }, [
                                      form.value.shipping_service === service.service && form.value.shipping_courier === courier.code ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "h-2 w-2 rounded-full bg-primary-foreground"
                                      })) : createCommentVNode("", true)
                                    ], 2)
                                  ]),
                                  createVNode("div", { class: "flex-1" }, [
                                    createVNode("div", { class: "flex items-start justify-between" }, [
                                      createVNode("div", null, [
                                        createVNode("div", { class: "font-medium" }, toDisplayString(service.service), 1),
                                        createVNode("div", { class: "text-sm text-muted-foreground" }, toDisplayString(service.description), 1),
                                        createVNode("div", { class: "text-sm text-muted-foreground" }, " Estimasi: " + toDisplayString(service.cost[0].etd) + " hari ", 1)
                                      ]),
                                      createVNode("div", { class: "font-semibold" }, toDisplayString(formatCurrency(
                                        service.cost[0].value
                                      )), 1)
                                    ])
                                  ])
                                ], 10, ["onClick"]);
                              }), 128))
                            ]);
                          }), 128))
                        ])) : form.value.city_id ? (openBlock(), createBlock("div", {
                          key: 2,
                          class: "py-8 text-center text-muted-foreground"
                        }, " Tidak ada metode pengiriman tersedia ")) : (openBlock(), createBlock("div", {
                          key: 3,
                          class: "py-8 text-center text-muted-foreground"
                        }, " Pilih alamat pengiriman untuk melihat metode pengiriman "))
                      ]),
                      createVNode(unref(_sfc_main$c)),
                      createVNode("div", { class: "space-y-4" }, [
                        createVNode("div", { class: "flex items-center gap-2 text-sm font-medium" }, [
                          createVNode(unref(Wallet), { class: "h-4 w-4" }),
                          createVNode("span", null, "Metode Pembayaran")
                        ]),
                        createVNode(unref(_sfc_main$3), {
                          modelValue: form.value.payment_method,
                          "onUpdate:modelValue": ($event) => form.value.payment_method = $event,
                          class: "space-y-3"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", {
                              class: ["flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors", {
                                "border-primary bg-primary/10": form.value.payment_method === "wallet",
                                "hover:bg-muted": form.value.payment_method !== "wallet",
                                "cursor-not-allowed opacity-50": !isWalletSufficient.value
                              }],
                              onClick: ($event) => isWalletSufficient.value && (form.value.payment_method = "wallet")
                            }, [
                              createVNode(unref(_sfc_main$2), {
                                value: "wallet",
                                id: "payment-wallet",
                                disabled: !isWalletSufficient.value
                              }, null, 8, ["disabled"]),
                              createVNode(unref(_sfc_main$d), {
                                for: "payment-wallet",
                                class: ["flex-1 cursor-pointer", {
                                  "cursor-not-allowed": !isWalletSufficient.value
                                }]
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex items-start justify-between" }, [
                                    createVNode("div", null, [
                                      createVNode("div", { class: "flex items-center gap-2 font-medium" }, [
                                        createVNode(unref(Wallet), { class: "h-4 w-4" }),
                                        createTextVNode(" E-Wallet ")
                                      ]),
                                      createVNode("div", { class: "text-sm text-muted-foreground" }, " Saldo: " + toDisplayString(formatCurrency(
                                        userWalletBalance.value
                                      )), 1),
                                      !isWalletSufficient.value ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "mt-1 text-xs text-destructive"
                                      }, " Saldo tidak mencukupi (kurang " + toDisplayString(formatCurrency(
                                        total.value - userWalletBalance.value
                                      )) + ") ", 1)) : createCommentVNode("", true)
                                    ])
                                  ])
                                ]),
                                _: 1
                              }, 8, ["class"])
                            ], 10, ["onClick"]),
                            createVNode("div", {
                              class: ["flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors", {
                                "border-primary bg-primary/10": form.value.payment_method === "midtrans",
                                "hover:bg-muted": form.value.payment_method !== "midtrans"
                              }],
                              onClick: ($event) => form.value.payment_method = "midtrans"
                            }, [
                              createVNode(unref(_sfc_main$2), {
                                value: "midtrans",
                                id: "payment-midtrans"
                              }),
                              createVNode(unref(_sfc_main$d), {
                                for: "payment-midtrans",
                                class: "flex-1 cursor-pointer"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex items-start justify-between" }, [
                                    createVNode("div", null, [
                                      createVNode("div", { class: "flex items-center gap-2 font-medium" }, [
                                        createVNode(unref(CreditCard), { class: "h-4 w-4" }),
                                        createTextVNode(" Payment Gateway ")
                                      ]),
                                      createVNode("div", { class: "text-sm text-muted-foreground" }, " Transfer Bank, E-wallet, Kartu Kredit ")
                                    ])
                                  ])
                                ]),
                                _: 1
                              })
                            ], 10, ["onClick"])
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode(unref(_sfc_main$c)),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$d), { for: "notes" }, {
                          default: withCtx(() => [
                            createTextVNode("Catatan (Opsional)")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$e), {
                          id: "notes",
                          modelValue: form.value.notes,
                          "onUpdate:modelValue": ($event) => form.value.notes = $event,
                          placeholder: "Catatan untuk penjual"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode(unref(_sfc_main$c)),
                      createVNode("div", { class: "space-y-3" }, [
                        createVNode("div", { class: "flex items-center gap-2 text-sm font-medium" }, [
                          createVNode(unref(CreditCard), { class: "h-4 w-4" }),
                          createVNode("span", null, "Ringkasan Pembayaran")
                        ]),
                        createVNode("div", { class: "space-y-2 text-sm" }, [
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-muted-foreground" }, "Subtotal"),
                            createVNode("span", null, toDisplayString(formatCurrency(subtotal.value)), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-muted-foreground" }, "Ongkos Kirim"),
                            createVNode("span", null, toDisplayString(formatCurrency(form.value.shipping_cost)), 1)
                          ]),
                          createVNode(unref(_sfc_main$c)),
                          createVNode("div", { class: "flex justify-between text-base font-semibold" }, [
                            createVNode("span", null, "Total"),
                            createVNode("span", null, toDisplayString(formatCurrency(total.value)), 1)
                          ])
                        ])
                      ])
                    ]),
                    createVNode(unref(_sfc_main$k), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$l), {
                          onClick: handleCheckout,
                          disabled: !isFormValid.value || processingOrder.value || midtransPopupOpen.value,
                          class: "w-full",
                          size: "lg"
                        }, {
                          default: withCtx(() => [
                            processingOrder.value ? (openBlock(), createBlock(unref(Loader2), {
                              key: 0,
                              class: "mr-2 h-4 w-4 animate-spin"
                            })) : createCommentVNode("", true),
                            form.value.payment_method === "wallet" ? (openBlock(), createBlock("span", { key: 1 }, " Bayar dengan E-Wallet " + toDisplayString(formatCurrency(total.value)), 1)) : (openBlock(), createBlock("span", { key: 2 }, " Bayar " + toDisplayString(formatCurrency(total.value)), 1))
                          ]),
                          _: 1
                        }, 8, ["disabled"])
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
              createVNode(unref(_sfc_main$5), {
                side: "right",
                class: "w-full overflow-y-auto sm:max-w-2xl",
                "trap-focus": false,
                onPointerDownOutside: handleOutsideInteraction,
                onInteractOutside: handleOutsideInteraction,
                onEscapeKeyDown: handleEscapeKey
              }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$6), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$7), null, {
                        default: withCtx(() => [
                          createTextVNode("Checkout")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$8), null, {
                        default: withCtx(() => [
                          createTextVNode(" Lengkapi data pengiriman untuk melanjutkan pembelian ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "space-y-6 py-6" }, [
                    alertMessage.value?.type === "success" ? (openBlock(), createBlock(unref(_sfc_main$9), {
                      key: 0,
                      variant: "default"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(CheckCircle2), { class: "h-4 w-4" }),
                        createVNode(unref(_sfc_main$a), null, {
                          default: withCtx(() => [
                            createTextVNode("Berhasil!")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$b), null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(alertMessage.value.message), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    alertMessage.value?.type === "error" ? (openBlock(), createBlock(unref(_sfc_main$9), {
                      key: 1,
                      variant: "destructive"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(AlertCircle), { class: "h-4 w-4" }),
                        createVNode(unref(_sfc_main$a), null, {
                          default: withCtx(() => [
                            createTextVNode("Terjadi Kesalahan")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$b), null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(alertMessage.value.message), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    createVNode("div", { class: "space-y-3" }, [
                      createVNode("div", { class: "flex items-center gap-2 text-sm font-medium" }, [
                        createVNode(unref(Package), { class: "h-4 w-4" }),
                        createVNode("span", null, "Ringkasan Produk"),
                        isMultipleItems.value ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "ml-auto text-xs text-muted-foreground"
                        }, toDisplayString(allItems.value.length) + " Produk ", 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "space-y-3" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(allItems.value, (item) => {
                          return openBlock(), createBlock("div", {
                            key: item.id,
                            class: "flex gap-4 rounded-lg bg-muted p-4"
                          }, [
                            createVNode("img", {
                              src: item.image,
                              alt: item.name,
                              class: "h-20 w-20 rounded-md object-cover"
                            }, null, 8, ["src", "alt"]),
                            createVNode("div", { class: "flex-1" }, [
                              createVNode("h4", { class: "font-medium" }, toDisplayString(item.name), 1),
                              createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(item.quantity) + "x " + toDisplayString(formatCurrency(item.price)), 1),
                              createVNode("p", { class: "text-sm text-muted-foreground" }, " Berat: " + toDisplayString(item.weight * item.quantity) + "g ", 1)
                            ]),
                            createVNode("div", { class: "text-right" }, [
                              createVNode("p", { class: "font-semibold" }, toDisplayString(formatCurrency(item.price * item.quantity)), 1)
                            ])
                          ]);
                        }), 128)),
                        createVNode("div", { class: "space-y-2 rounded-lg bg-muted/50 p-3 text-sm" }, [
                          createVNode("div", { class: "flex items-center justify-between" }, [
                            createVNode("span", { class: "text-muted-foreground" }, "Subtotal Produk:"),
                            createVNode("span", { class: "font-semibold" }, toDisplayString(formatCurrency(subtotal.value)), 1)
                          ]),
                          isMultipleItems.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex items-center justify-between text-xs text-muted-foreground"
                          }, [
                            createVNode("span", null, "Total Berat:"),
                            createVNode("span", null, toDisplayString(totalWeight.value) + "g", 1)
                          ])) : createCommentVNode("", true)
                        ])
                      ])
                    ]),
                    createVNode(unref(_sfc_main$c)),
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode("div", { class: "flex items-center gap-2 text-sm font-medium" }, [
                        createVNode(unref(MapPin), { class: "h-4 w-4" }),
                        createVNode("span", null, "Alamat Pengiriman")
                      ]),
                      createVNode("div", { class: "space-y-4" }, [
                        createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$d), { for: "recipient_name" }, {
                              default: withCtx(() => [
                                createTextVNode("Nama Penerima")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$e), {
                              id: "recipient_name",
                              modelValue: form.value.recipient_name,
                              "onUpdate:modelValue": ($event) => form.value.recipient_name = $event,
                              placeholder: "Nama lengkap"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$d), { for: "recipient_phone" }, {
                              default: withCtx(() => [
                                createTextVNode("No. Telepon")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$e), {
                              id: "recipient_phone",
                              modelValue: form.value.recipient_phone,
                              "onUpdate:modelValue": ($event) => form.value.recipient_phone = $event,
                              placeholder: "08xxxxxxxxxx"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$d), { for: "address_line1" }, {
                            default: withCtx(() => [
                              createTextVNode("Alamat Lengkap")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$e), {
                            id: "address_line1",
                            modelValue: form.value.address_line1,
                            "onUpdate:modelValue": ($event) => form.value.address_line1 = $event,
                            placeholder: "Jalan, nomor rumah, RT/RW"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$d), { for: "province" }, {
                              default: withCtx(() => [
                                createTextVNode("Provinsi")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$f), {
                              modelValue: form.value.province_id,
                              "onUpdate:modelValue": ($event) => form.value.province_id = $event,
                              disabled: loadingProvinces.value
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$g), { id: "province" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$h), {
                                      placeholder: loadingProvinces.value ? "Memuat provinsi..." : "Pilih provinsi"
                                    }, null, 8, ["placeholder"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$i), null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(validProvinces.value, (province) => {
                                      return openBlock(), createBlock(unref(_sfc_main$j), {
                                        key: province.id,
                                        value: String(province.id)
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(province.name), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["value"]);
                                    }), 128))
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$d), { for: "city" }, {
                              default: withCtx(() => [
                                createTextVNode("Kota/Kabupaten")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$f), {
                              modelValue: form.value.city_id,
                              "onUpdate:modelValue": ($event) => form.value.city_id = $event,
                              disabled: loadingCities.value || !form.value.province_id
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$g), { id: "city" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$h), {
                                      placeholder: loadingCities.value ? "Memuat kota..." : !form.value.province_id ? "Pilih provinsi terlebih dahulu" : "Pilih kota"
                                    }, null, 8, ["placeholder"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$i), null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(validCities.value, (city) => {
                                      return openBlock(), createBlock(unref(_sfc_main$j), {
                                        key: city.id,
                                        value: String(city.id)
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(city.type) + " " + toDisplayString(city.name), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["value"]);
                                    }), 128))
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                          ])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$d), { for: "postal_code" }, {
                            default: withCtx(() => [
                              createTextVNode("Kode Pos")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$e), {
                            id: "postal_code",
                            modelValue: form.value.postal_code,
                            "onUpdate:modelValue": ($event) => form.value.postal_code = $event,
                            placeholder: "12345"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ])
                    ]),
                    createVNode(unref(_sfc_main$c)),
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode("div", { class: "flex items-center gap-2 text-sm font-medium" }, [
                        createVNode(unref(Truck), { class: "h-4 w-4" }),
                        createVNode("span", null, "Metode Pengiriman")
                      ]),
                      loadingShipping.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex items-center justify-center py-8"
                      }, [
                        createVNode(unref(Loader2), { class: "h-6 w-6 animate-spin text-muted-foreground" })
                      ])) : shippingMethods.value.length > 0 ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "space-y-3"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(shippingMethods.value, (courier) => {
                          return openBlock(), createBlock("div", {
                            key: courier.code,
                            class: "space-y-2"
                          }, [
                            createVNode("div", { class: "text-sm font-medium uppercase" }, toDisplayString(courier.name), 1),
                            (openBlock(true), createBlock(Fragment, null, renderList(courier.costs, (service) => {
                              return openBlock(), createBlock("div", {
                                key: `${courier.code}-${service.service}`,
                                class: ["flex cursor-pointer items-center space-x-3 rounded-lg border p-3 transition-colors", {
                                  "border-primary bg-primary/10": form.value.shipping_service === service.service && form.value.shipping_courier === courier.code,
                                  "hover:bg-muted": !(form.value.shipping_service === service.service && form.value.shipping_courier === courier.code)
                                }],
                                onClick: ($event) => selectShippingService(courier, service)
                              }, [
                                createVNode("div", { class: "flex-shrink-0" }, [
                                  createVNode("div", {
                                    class: ["flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors", {
                                      "border-primary bg-primary": form.value.shipping_service === service.service && form.value.shipping_courier === courier.code,
                                      "border-muted-foreground": !(form.value.shipping_service === service.service && form.value.shipping_courier === courier.code)
                                    }]
                                  }, [
                                    form.value.shipping_service === service.service && form.value.shipping_courier === courier.code ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "h-2 w-2 rounded-full bg-primary-foreground"
                                    })) : createCommentVNode("", true)
                                  ], 2)
                                ]),
                                createVNode("div", { class: "flex-1" }, [
                                  createVNode("div", { class: "flex items-start justify-between" }, [
                                    createVNode("div", null, [
                                      createVNode("div", { class: "font-medium" }, toDisplayString(service.service), 1),
                                      createVNode("div", { class: "text-sm text-muted-foreground" }, toDisplayString(service.description), 1),
                                      createVNode("div", { class: "text-sm text-muted-foreground" }, " Estimasi: " + toDisplayString(service.cost[0].etd) + " hari ", 1)
                                    ]),
                                    createVNode("div", { class: "font-semibold" }, toDisplayString(formatCurrency(
                                      service.cost[0].value
                                    )), 1)
                                  ])
                                ])
                              ], 10, ["onClick"]);
                            }), 128))
                          ]);
                        }), 128))
                      ])) : form.value.city_id ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "py-8 text-center text-muted-foreground"
                      }, " Tidak ada metode pengiriman tersedia ")) : (openBlock(), createBlock("div", {
                        key: 3,
                        class: "py-8 text-center text-muted-foreground"
                      }, " Pilih alamat pengiriman untuk melihat metode pengiriman "))
                    ]),
                    createVNode(unref(_sfc_main$c)),
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode("div", { class: "flex items-center gap-2 text-sm font-medium" }, [
                        createVNode(unref(Wallet), { class: "h-4 w-4" }),
                        createVNode("span", null, "Metode Pembayaran")
                      ]),
                      createVNode(unref(_sfc_main$3), {
                        modelValue: form.value.payment_method,
                        "onUpdate:modelValue": ($event) => form.value.payment_method = $event,
                        class: "space-y-3"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", {
                            class: ["flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors", {
                              "border-primary bg-primary/10": form.value.payment_method === "wallet",
                              "hover:bg-muted": form.value.payment_method !== "wallet",
                              "cursor-not-allowed opacity-50": !isWalletSufficient.value
                            }],
                            onClick: ($event) => isWalletSufficient.value && (form.value.payment_method = "wallet")
                          }, [
                            createVNode(unref(_sfc_main$2), {
                              value: "wallet",
                              id: "payment-wallet",
                              disabled: !isWalletSufficient.value
                            }, null, 8, ["disabled"]),
                            createVNode(unref(_sfc_main$d), {
                              for: "payment-wallet",
                              class: ["flex-1 cursor-pointer", {
                                "cursor-not-allowed": !isWalletSufficient.value
                              }]
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex items-start justify-between" }, [
                                  createVNode("div", null, [
                                    createVNode("div", { class: "flex items-center gap-2 font-medium" }, [
                                      createVNode(unref(Wallet), { class: "h-4 w-4" }),
                                      createTextVNode(" E-Wallet ")
                                    ]),
                                    createVNode("div", { class: "text-sm text-muted-foreground" }, " Saldo: " + toDisplayString(formatCurrency(
                                      userWalletBalance.value
                                    )), 1),
                                    !isWalletSufficient.value ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "mt-1 text-xs text-destructive"
                                    }, " Saldo tidak mencukupi (kurang " + toDisplayString(formatCurrency(
                                      total.value - userWalletBalance.value
                                    )) + ") ", 1)) : createCommentVNode("", true)
                                  ])
                                ])
                              ]),
                              _: 1
                            }, 8, ["class"])
                          ], 10, ["onClick"]),
                          createVNode("div", {
                            class: ["flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors", {
                              "border-primary bg-primary/10": form.value.payment_method === "midtrans",
                              "hover:bg-muted": form.value.payment_method !== "midtrans"
                            }],
                            onClick: ($event) => form.value.payment_method = "midtrans"
                          }, [
                            createVNode(unref(_sfc_main$2), {
                              value: "midtrans",
                              id: "payment-midtrans"
                            }),
                            createVNode(unref(_sfc_main$d), {
                              for: "payment-midtrans",
                              class: "flex-1 cursor-pointer"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex items-start justify-between" }, [
                                  createVNode("div", null, [
                                    createVNode("div", { class: "flex items-center gap-2 font-medium" }, [
                                      createVNode(unref(CreditCard), { class: "h-4 w-4" }),
                                      createTextVNode(" Payment Gateway ")
                                    ]),
                                    createVNode("div", { class: "text-sm text-muted-foreground" }, " Transfer Bank, E-wallet, Kartu Kredit ")
                                  ])
                                ])
                              ]),
                              _: 1
                            })
                          ], 10, ["onClick"])
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(unref(_sfc_main$c)),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$d), { for: "notes" }, {
                        default: withCtx(() => [
                          createTextVNode("Catatan (Opsional)")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$e), {
                        id: "notes",
                        modelValue: form.value.notes,
                        "onUpdate:modelValue": ($event) => form.value.notes = $event,
                        placeholder: "Catatan untuk penjual"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(unref(_sfc_main$c)),
                    createVNode("div", { class: "space-y-3" }, [
                      createVNode("div", { class: "flex items-center gap-2 text-sm font-medium" }, [
                        createVNode(unref(CreditCard), { class: "h-4 w-4" }),
                        createVNode("span", null, "Ringkasan Pembayaran")
                      ]),
                      createVNode("div", { class: "space-y-2 text-sm" }, [
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-muted-foreground" }, "Subtotal"),
                          createVNode("span", null, toDisplayString(formatCurrency(subtotal.value)), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-muted-foreground" }, "Ongkos Kirim"),
                          createVNode("span", null, toDisplayString(formatCurrency(form.value.shipping_cost)), 1)
                        ]),
                        createVNode(unref(_sfc_main$c)),
                        createVNode("div", { class: "flex justify-between text-base font-semibold" }, [
                          createVNode("span", null, "Total"),
                          createVNode("span", null, toDisplayString(formatCurrency(total.value)), 1)
                        ])
                      ])
                    ])
                  ]),
                  createVNode(unref(_sfc_main$k), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$l), {
                        onClick: handleCheckout,
                        disabled: !isFormValid.value || processingOrder.value || midtransPopupOpen.value,
                        class: "w-full",
                        size: "lg"
                      }, {
                        default: withCtx(() => [
                          processingOrder.value ? (openBlock(), createBlock(unref(Loader2), {
                            key: 0,
                            class: "mr-2 h-4 w-4 animate-spin"
                          })) : createCommentVNode("", true),
                          form.value.payment_method === "wallet" ? (openBlock(), createBlock("span", { key: 1 }, " Bayar dengan E-Wallet " + toDisplayString(formatCurrency(total.value)), 1)) : (openBlock(), createBlock("span", { key: 2 }, " Bayar " + toDisplayString(formatCurrency(total.value)), 1))
                        ]),
                        _: 1
                      }, 8, ["disabled"])
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ecommerce/checkout/CheckoutSheet.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Ecommerce",
  __ssrInlineRender: true,
  props: {
    title: {},
    description: {}
  },
  setup(__props) {
    const page = usePage();
    const searchQuery = ref("");
    const mobileMenuOpen = ref(false);
    const searchOpen = ref(false);
    const newsletterEmail = ref("");
    const newsletterSubmitting = ref(false);
    const newsletterSuccess = ref(false);
    const { appearance, updateAppearance } = useAppearance();
    const checkoutSheetOpen = ref(false);
    const selectedCartItems = ref([]);
    const checkoutItems = ref([]);
    const ecommerceData = computed(
      () => page.props.ecommerce || { categories: [] }
    );
    const cartData = computed(() => ecommerceData.value.cart);
    const wishlistData = computed(() => ecommerceData.value.wishlist);
    const navigationCategories = computed(
      () => ecommerceData.value.categories || []
    );
    const settings = computed(
      () => page.props.settings || {}
    );
    const siteName = computed(() => settings.value.site_name || "PURANUSA");
    const siteDescription = computed(
      () => settings.value.site_description || "Puranusa adalah destinasi belanja online terpercaya"
    );
    const paymentMethods = computed(
      () => settings.value.payment_methods || [
        "VISA",
        "Mastercard",
        "GoPay",
        "OVO"
      ]
    );
    const siteLogo = computed(() => settings.value.site_logo);
    const cartItemCount = computed(() => {
      return cartData.value?.items?.length || 0;
    });
    const wishlistItemCount = computed(() => {
      return wishlistData.value?.items?.length || 0;
    });
    const cartItems = computed(() => {
      return cartData.value?.items || [];
    });
    const wishlistItems = computed(() => {
      return wishlistData.value?.items || [];
    });
    const cartTotal = computed(() => {
      return cartData.value?.total || 0;
    });
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(amount);
    };
    const isAuthenticated = computed(() => {
      const user = page.props.auth?.user;
      return !!user && "ewallet_saldo" in user;
    });
    const isDark = computed(() => {
      if (appearance.value === "system") {
        if (typeof window !== "undefined") {
          return window.matchMedia("(prefers-color-scheme: dark)").matches;
        }
        return false;
      }
      return appearance.value === "dark";
    });
    const toggleTheme = () => {
      const newTheme = isDark.value ? "light" : "dark";
      updateAppearance(newTheme);
    };
    const handleLogout = () => {
      router.post("/client/logout", {}, {
        onStart: () => {
          router.flushAll();
        },
        onSuccess: () => {
          toast.success("Berhasil logout");
        },
        onError: () => {
          toast.error("Gagal logout, silakan coba lagi");
        }
      });
    };
    const subscribeNewsletter = async () => {
      if (!newsletterEmail.value || newsletterSubmitting.value) return;
      newsletterSubmitting.value = true;
      try {
        const response = await fetch("/newsletter/subscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": typeof document !== "undefined" ? document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "" : ""
          },
          body: JSON.stringify({
            email: newsletterEmail.value
          })
        });
        const data = await response.json();
        if (data.success) {
          newsletterSuccess.value = true;
          newsletterEmail.value = "";
          toast.success("Berhasil!", {
            description: "Anda telah berlangganan newsletter kami."
          });
          setTimeout(() => {
            newsletterSuccess.value = false;
          }, 3e3);
        } else {
          toast.error("Gagal Berlangganan", {
            description: data.message || "Terjadi kesalahan saat berlangganan"
          });
        }
      } catch (error) {
        console.error("Newsletter subscription failed:", error);
        toast.error("Terjadi Kesalahan", {
          description: "Terjadi kesalahan saat berlangganan. Silakan coba lagi."
        });
      } finally {
        newsletterSubmitting.value = false;
      }
    };
    const stopImpersonating = () => {
      router.post("/manage/customers/stop-impersonating", {}, {
        onSuccess: () => {
          toast.success("Kembali ke akun admin");
        },
        onError: () => {
          toast.error("Gagal kembali ke akun admin");
        }
      });
    };
    const addToCartFromWishlist = async (item) => {
      try {
        const response = await axios.post("/cart/add", {
          product_id: item.product_id,
          quantity: 1
        });
        if (response.data.success) {
          toast.success("Berhasil", {
            description: "Produk berhasil ditambahkan ke keranjang."
          });
          router.reload({ only: ["ecommerce"] });
        }
      } catch (error) {
        console.error("Failed to add to cart:", error);
        const message = error.response?.data?.message || "Gagal menambahkan ke keranjang";
        toast.error("Gagal", {
          description: message
        });
      }
    };
    const removeFromWishlist = async (itemId, productId) => {
      try {
        const response = await axios.post("/wishlist/remove", {
          product_id: productId
        });
        if (response.data.success) {
          if (wishlistData.value?.items) {
            const index = wishlistData.value.items.findIndex(
              (i) => i.id === itemId
            );
            if (index > -1) {
              wishlistData.value.items.splice(index, 1);
            }
          }
          toast.success("Berhasil", {
            description: "Produk berhasil dihapus dari wishlist."
          });
          router.reload({ only: ["ecommerce"] });
        }
      } catch (error) {
        console.error("Failed to remove from wishlist:", error);
        const message = error.response?.data?.message || "Gagal menghapus dari wishlist";
        toast.error("Gagal", {
          description: message
        });
      }
    };
    const updateCartQuantity = async (itemId, newQuantity) => {
      if (newQuantity < 1) return;
      try {
        const response = await axios.post("/cart/update", {
          cart_id: itemId,
          quantity: newQuantity
        });
        if (response.data.success) {
          const item = cartItems.value.find((i) => i.id === itemId);
          if (item) {
            item.quantity = newQuantity;
          }
          if (cartData.value && response.data.cart) {
            cartData.value.subtotal = response.data.cart.subtotal;
            cartData.value.total = response.data.cart.total;
          }
        }
      } catch (error) {
        console.error("Failed to update cart quantity:", error);
        toast.error("Gagal", {
          description: "Gagal memperbarui jumlah produk"
        });
      }
    };
    const removeFromCart = async (itemId) => {
      try {
        const response = await axios.post("/cart/remove", {
          cart_id: itemId
        });
        if (response.data.success) {
          if (cartData.value?.items) {
            const index2 = cartData.value.items.findIndex(
              (i) => i.id === itemId
            );
            if (index2 > -1) {
              cartData.value.items.splice(index2, 1);
            }
          }
          if (cartData.value && response.data.cart) {
            cartData.value.subtotal = response.data.cart.subtotal;
            cartData.value.total = response.data.cart.total;
          }
          const index = selectedCartItems.value.indexOf(itemId);
          if (index > -1) {
            selectedCartItems.value.splice(index, 1);
          }
          toast.success("Berhasil", {
            description: "Produk berhasil dihapus dari keranjang."
          });
          router.reload({ only: ["ecommerce"] });
        }
      } catch (error) {
        console.error("Failed to remove from cart:", error);
        toast.error("Gagal", {
          description: "Gagal menghapus dari keranjang"
        });
      }
    };
    const toggleCartItemSelection = (itemId, checked) => {
      const index = selectedCartItems.value.indexOf(itemId);
      if (checked) {
        if (index === -1) {
          selectedCartItems.value.push(itemId);
        }
      } else if (index > -1) {
        selectedCartItems.value.splice(index, 1);
      }
    };
    const toggleSelectAll = (checked) => {
      if (checked) {
        selectedCartItems.value = cartItems.value.map((item) => item.id);
      } else {
        selectedCartItems.value = [];
      }
    };
    const isAllSelected = computed(() => {
      return cartItems.value.length > 0 && selectedCartItems.value.length === cartItems.value.length;
    });
    const selectedItemsTotal = computed(() => {
      return cartItems.value.filter((item) => selectedCartItems.value.includes(item.id)).reduce((total, item) => total + item.price * item.quantity, 0);
    });
    const selectedItemsCount = computed(() => {
      return selectedCartItems.value.length;
    });
    const handleCheckout = () => {
      const selectedItems = cartItems.value.filter(
        (item) => selectedCartItems.value.includes(item.id)
      );
      if (selectedItems.length === 0) {
        toast.warning("Perhatian", {
          description: "Pilih minimal satu produk untuk checkout"
        });
        return;
      }
      checkoutItems.value = selectedItems;
      checkoutSheetOpen.value = true;
    };
    const footerMenus = computed(() => ecommerceData.value.footerMenus || []);
    const socialLinks = computed(() => ecommerceData.value.socialLinks || []);
    const socialIconPaths = {
      facebook: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
      twitter: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
      instagram: "M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z",
      youtube: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
    };
    const productCategories = computed(() => {
      return navigationCategories.value.map((category) => {
        const iconMap = {
          Mobile: Smartphone,
          "TV & AV": Tv,
          Appliances: Home,
          Computing: Laptop,
          Smartphone,
          Tablet: Smartphone,
          Electronics: Package,
          Fashion: Package,
          Home,
          Beauty: Package
        };
        return {
          name: category.name,
          slug: category.slug,
          icon: iconMap[category.name] || Package,
          items: category.items.map((item) => ({
            ...item,
            href: `/toko?category=${category.slug}&subcategory=${item.slug}`
          }))
        };
      });
    });
    const handleSearch = () => {
      if (typeof window !== "undefined" && searchQuery.value.trim()) {
        window.location.href = `/toko?search=${encodeURIComponent(searchQuery.value.trim())}`;
      }
    };
    const searchSuggestions = computed(() => {
      const query = searchQuery.value.toLowerCase().trim();
      if (!query) {
        const popularSearches = [];
        navigationCategories.value.slice(0, 3).forEach((category) => {
          popularSearches.push({
            label: category.name,
            query: category.name.toLowerCase()
          });
        });
        navigationCategories.value.slice(0, 2).forEach((category) => {
          category.items.slice(0, 1).forEach((item) => {
            popularSearches.push({
              label: item.name,
              query: item.name.toLowerCase()
            });
          });
        });
        return popularSearches.slice(0, 5);
      }
      const suggestions = [];
      navigationCategories.value.forEach((category) => {
        if (category.name.toLowerCase().includes(query)) {
          suggestions.push({
            label: category.name,
            query: category.name.toLowerCase()
          });
        }
        category.items.forEach((item) => {
          if (item.name.toLowerCase().includes(query)) {
            suggestions.push({
              label: item.name,
              query: item.name.toLowerCase()
            });
          }
        });
      });
      if (query.length >= 2) {
        const variations = [
          { label: `${query}`, query },
          { label: `${query} terbaru`, query: `${query} terbaru` },
          { label: `${query} murah`, query: `${query} murah` }
        ];
        variations.forEach((variation) => {
          if (!suggestions.find((s) => s.query === variation.query)) {
            suggestions.push(variation);
          }
        });
      }
      const uniqueSuggestions = suggestions.filter(
        (item, index, self) => index === self.findIndex((t) => t.query === item.query)
      );
      return uniqueSuggestions.slice(0, 5);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen" }, _attrs))}>`);
      if (unref(page).props.impersonating) {
        _push(`<div class="bg-primary dark:bg-zinc-100 text-white dark:text-black py-2 px-4 text-center text-sm font-medium sticky top-0 z-[60] flex items-center justify-center gap-4"><span>`);
        _push(ssrRenderComponent(unref(LockIcon), { class: "inline-block mr-1 h-4 w-4" }, null, _parent));
        _push(` Anda login sebagai <strong>${ssrInterpolate(unref(page).props.impersonating?.customer_name)}</strong> (Admin: ${ssrInterpolate(unref(page).props.impersonating?.admin_name)}) </span>`);
        _push(ssrRenderComponent(unref(_sfc_main$l), {
          size: "sm",
          variant: "secondary",
          onClick: stopImpersonating,
          class: "h-7 text-xs"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Kembali ke Admin `);
            } else {
              return [
                createTextVNode(" Kembali ke Admin ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<header class="${ssrRenderClass([unref(page).props.impersonating ? "top-10" : "top-0", "sticky z-50 border-b bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950"])}"><div class="container mx-auto px-4 lg:px-6"><div class="flex h-16 items-center justify-between gap-4">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "flex min-w-0 flex-shrink-0 items-center gap-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (siteLogo.value) {
              _push2(`<img${ssrRenderAttr("src", siteLogo.value)}${ssrRenderAttr("alt", siteName.value)} class="h-8 w-8 shrink-0 object-contain md:h-10 md:w-10"${_scopeId}>`);
            } else {
              _push2(ssrRenderComponent(unref(Package), { class: "h-6 w-6 shrink-0 text-primary md:h-7 md:w-7" }, null, _parent2, _scopeId));
            }
            _push2(`<span class="truncate bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-base font-bold tracking-tight whitespace-nowrap text-transparent sm:text-lg md:text-xl md:whitespace-normal lg:text-2xl xl:text-3xl"${_scopeId}>${ssrInterpolate(siteName.value)}</span>`);
          } else {
            return [
              siteLogo.value ? (openBlock(), createBlock("img", {
                key: 0,
                src: siteLogo.value,
                alt: siteName.value,
                class: "h-8 w-8 shrink-0 object-contain md:h-10 md:w-10"
              }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(unref(Package), {
                key: 1,
                class: "h-6 w-6 shrink-0 text-primary md:h-7 md:w-7"
              })),
              createVNode("span", { class: "truncate bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-base font-bold tracking-tight whitespace-nowrap text-transparent sm:text-lg md:text-xl md:whitespace-normal lg:text-2xl xl:text-3xl" }, toDisplayString(siteName.value), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="mx-4 hidden max-w-2xl flex-1 lg:flex"><div class="relative w-full">`);
      _push(ssrRenderComponent(unref(Search), { class: "absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$e), {
        modelValue: searchQuery.value,
        "onUpdate:modelValue": ($event) => searchQuery.value = $event,
        placeholder: "Cari produk, kategori, atau brand...",
        class: "h-11 w-full pr-24 pl-11",
        onKeydown: handleSearch
      }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$l), {
        onClick: handleSearch,
        size: "sm",
        class: "absolute top-1/2 right-1 h-9 -translate-y-1/2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Cari `);
          } else {
            return [
              createTextVNode(" Cari ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="flex flex-shrink-0 items-center gap-1">`);
      _push(ssrRenderComponent(unref(_sfc_main$l), {
        variant: "ghost",
        size: "icon",
        onClick: ($event) => searchOpen.value = !searchOpen.value,
        class: "rounded-full lg:hidden",
        "aria-label": "Search"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Search), { class: "h-5 w-5" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Search), { class: "h-5 w-5" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$l), {
        variant: "ghost",
        size: "icon",
        onClick: toggleTheme,
        class: "hidden items-center justify-center rounded-full sm:flex",
        "aria-label": "Toggle theme"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (isDark.value) {
              _push2(ssrRenderComponent(unref(Sun), { class: "h-5 w-5" }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(unref(Moon), { class: "h-5 w-5" }, null, _parent2, _scopeId));
            }
          } else {
            return [
              isDark.value ? (openBlock(), createBlock(unref(Sun), {
                key: 0,
                class: "h-5 w-5"
              })) : (openBlock(), createBlock(unref(Moon), {
                key: 1,
                class: "h-5 w-5"
              }))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$m), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$n), { "as-child": "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$l), {
                    variant: "ghost",
                    size: "icon",
                    class: "relative rounded-full",
                    "aria-label": "Wishlist"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Heart), { class: "h-5 w-5" }, null, _parent4, _scopeId3));
                        if (wishlistItemCount.value > 0) {
                          _push4(ssrRenderComponent(unref(_sfc_main$o), { class: "absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-[10px]" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(wishlistItemCount.value)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(wishlistItemCount.value), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode(unref(Heart), { class: "h-5 w-5" }),
                          wishlistItemCount.value > 0 ? (openBlock(), createBlock(unref(_sfc_main$o), {
                            key: 0,
                            class: "absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-[10px]"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(wishlistItemCount.value), 1)
                            ]),
                            _: 1
                          })) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$l), {
                      variant: "ghost",
                      size: "icon",
                      class: "relative rounded-full",
                      "aria-label": "Wishlist"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Heart), { class: "h-5 w-5" }),
                        wishlistItemCount.value > 0 ? (openBlock(), createBlock(unref(_sfc_main$o), {
                          key: 0,
                          class: "absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-[10px]"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(wishlistItemCount.value), 1)
                          ]),
                          _: 1
                        })) : createCommentVNode("", true)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$p), {
              align: "end",
              class: "w-150"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$q), { class: "flex items-center justify-between" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span${_scopeId3}>Wishlist Saya</span>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$o), { variant: "secondary" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(wishlistItemCount.value)} item`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(wishlistItemCount.value) + " item", 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode("span", null, "Wishlist Saya"),
                          createVNode(unref(_sfc_main$o), { variant: "secondary" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(wishlistItemCount.value) + " item", 1)
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$r), null, null, _parent3, _scopeId2));
                  _push3(`<div class="max-h-96 overflow-y-auto"${_scopeId2}>`);
                  if (wishlistItems.value.length > 0) {
                    _push3(`<div class="space-y-1"${_scopeId2}><!--[-->`);
                    ssrRenderList(wishlistItems.value, (item) => {
                      _push3(`<div class="group rounded-md p-3 transition-colors hover:bg-accent"${_scopeId2}><div class="flex items-center gap-3"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(Link), {
                        href: `/produk/${item.slug}`,
                        class: "flex-shrink-0"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<img${ssrRenderAttr("src", item.image)}${ssrRenderAttr("alt", item.name)} class="h-16 w-16 rounded object-cover"${_scopeId3}>`);
                          } else {
                            return [
                              createVNode("img", {
                                src: item.image,
                                alt: item.name,
                                class: "h-16 w-16 rounded object-cover"
                              }, null, 8, ["src", "alt"])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`<div class="min-w-0 flex-1"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(Link), {
                        href: `/produk/${item.slug}`,
                        class: "line-clamp-2 block text-sm font-medium hover:underline"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(item.name)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(item.name), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`<p class="mt-1 text-sm font-bold text-primary"${_scopeId2}>${ssrInterpolate(formatCurrency(
                        item.price
                      ))}</p></div>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$l), {
                        variant: "ghost",
                        size: "icon",
                        class: "flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100",
                        onClick: ($event) => removeFromWishlist(
                          item.id,
                          item.product_id
                        ),
                        "aria-label": "Remove from wishlist"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(Trash2), { class: "h-4 w-4 text-destructive" }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(unref(Trash2), { class: "h-4 w-4 text-destructive" })
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(unref(_sfc_main$l), {
                        size: "sm",
                        onClick: ($event) => addToCartFromWishlist(
                          item
                        )
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(` + `);
                            _push4(ssrRenderComponent(unref(ShoppingCart), { class: "h-3.5 w-3.5" }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createTextVNode(" + "),
                              createVNode(unref(ShoppingCart), { class: "h-3.5 w-3.5" })
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</div></div>`);
                    });
                    _push3(`<!--]--></div>`);
                  } else {
                    _push3(`<div class="p-8 text-center text-sm text-muted-foreground"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Heart), { class: "mx-auto mb-2 h-12 w-12 opacity-20" }, null, _parent3, _scopeId2));
                    _push3(`<p${_scopeId2}>Wishlist masih kosong</p></div>`);
                  }
                  _push3(`</div>`);
                  if (wishlistItems.value.length > 0) {
                    _push3(ssrRenderComponent(unref(_sfc_main$r), null, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (wishlistItems.value.length > 0) {
                    _push3(`<div class="p-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Link), { href: "/wishlist" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(_sfc_main$l), {
                            class: "w-full",
                            variant: "outline"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` Lihat Semua Wishlist `);
                              } else {
                                return [
                                  createTextVNode(" Lihat Semua Wishlist ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(_sfc_main$l), {
                              class: "w-full",
                              variant: "outline"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Lihat Semua Wishlist ")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(unref(_sfc_main$q), { class: "flex items-center justify-between" }, {
                      default: withCtx(() => [
                        createVNode("span", null, "Wishlist Saya"),
                        createVNode(unref(_sfc_main$o), { variant: "secondary" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(wishlistItemCount.value) + " item", 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$r)),
                    createVNode("div", { class: "max-h-96 overflow-y-auto" }, [
                      wishlistItems.value.length > 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "space-y-1"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(wishlistItems.value, (item) => {
                          return openBlock(), createBlock("div", {
                            key: item.id,
                            class: "group rounded-md p-3 transition-colors hover:bg-accent"
                          }, [
                            createVNode("div", { class: "flex items-center gap-3" }, [
                              createVNode(unref(Link), {
                                href: `/produk/${item.slug}`,
                                class: "flex-shrink-0"
                              }, {
                                default: withCtx(() => [
                                  createVNode("img", {
                                    src: item.image,
                                    alt: item.name,
                                    class: "h-16 w-16 rounded object-cover"
                                  }, null, 8, ["src", "alt"])
                                ]),
                                _: 2
                              }, 1032, ["href"]),
                              createVNode("div", { class: "min-w-0 flex-1" }, [
                                createVNode(unref(Link), {
                                  href: `/produk/${item.slug}`,
                                  class: "line-clamp-2 block text-sm font-medium hover:underline"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(item.name), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["href"]),
                                createVNode("p", { class: "mt-1 text-sm font-bold text-primary" }, toDisplayString(formatCurrency(
                                  item.price
                                )), 1)
                              ]),
                              createVNode(unref(_sfc_main$l), {
                                variant: "ghost",
                                size: "icon",
                                class: "flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100",
                                onClick: withModifiers(($event) => removeFromWishlist(
                                  item.id,
                                  item.product_id
                                ), ["stop"]),
                                "aria-label": "Remove from wishlist"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Trash2), { class: "h-4 w-4 text-destructive" })
                                ]),
                                _: 1
                              }, 8, ["onClick"]),
                              createVNode(unref(_sfc_main$l), {
                                size: "sm",
                                onClick: withModifiers(($event) => addToCartFromWishlist(
                                  item
                                ), ["stop"])
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" + "),
                                  createVNode(unref(ShoppingCart), { class: "h-3.5 w-3.5" })
                                ]),
                                _: 1
                              }, 8, ["onClick"])
                            ])
                          ]);
                        }), 128))
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "p-8 text-center text-sm text-muted-foreground"
                      }, [
                        createVNode(unref(Heart), { class: "mx-auto mb-2 h-12 w-12 opacity-20" }),
                        createVNode("p", null, "Wishlist masih kosong")
                      ]))
                    ]),
                    wishlistItems.value.length > 0 ? (openBlock(), createBlock(unref(_sfc_main$r), { key: 0 })) : createCommentVNode("", true),
                    wishlistItems.value.length > 0 ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "p-2"
                    }, [
                      createVNode(unref(Link), { href: "/wishlist" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$l), {
                            class: "w-full",
                            variant: "outline"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Lihat Semua Wishlist ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$n), { "as-child": "" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$l), {
                    variant: "ghost",
                    size: "icon",
                    class: "relative rounded-full",
                    "aria-label": "Wishlist"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Heart), { class: "h-5 w-5" }),
                      wishlistItemCount.value > 0 ? (openBlock(), createBlock(unref(_sfc_main$o), {
                        key: 0,
                        class: "absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-[10px]"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(wishlistItemCount.value), 1)
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$p), {
                align: "end",
                class: "w-150"
              }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$q), { class: "flex items-center justify-between" }, {
                    default: withCtx(() => [
                      createVNode("span", null, "Wishlist Saya"),
                      createVNode(unref(_sfc_main$o), { variant: "secondary" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(wishlistItemCount.value) + " item", 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$r)),
                  createVNode("div", { class: "max-h-96 overflow-y-auto" }, [
                    wishlistItems.value.length > 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-1"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(wishlistItems.value, (item) => {
                        return openBlock(), createBlock("div", {
                          key: item.id,
                          class: "group rounded-md p-3 transition-colors hover:bg-accent"
                        }, [
                          createVNode("div", { class: "flex items-center gap-3" }, [
                            createVNode(unref(Link), {
                              href: `/produk/${item.slug}`,
                              class: "flex-shrink-0"
                            }, {
                              default: withCtx(() => [
                                createVNode("img", {
                                  src: item.image,
                                  alt: item.name,
                                  class: "h-16 w-16 rounded object-cover"
                                }, null, 8, ["src", "alt"])
                              ]),
                              _: 2
                            }, 1032, ["href"]),
                            createVNode("div", { class: "min-w-0 flex-1" }, [
                              createVNode(unref(Link), {
                                href: `/produk/${item.slug}`,
                                class: "line-clamp-2 block text-sm font-medium hover:underline"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.name), 1)
                                ]),
                                _: 2
                              }, 1032, ["href"]),
                              createVNode("p", { class: "mt-1 text-sm font-bold text-primary" }, toDisplayString(formatCurrency(
                                item.price
                              )), 1)
                            ]),
                            createVNode(unref(_sfc_main$l), {
                              variant: "ghost",
                              size: "icon",
                              class: "flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100",
                              onClick: withModifiers(($event) => removeFromWishlist(
                                item.id,
                                item.product_id
                              ), ["stop"]),
                              "aria-label": "Remove from wishlist"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Trash2), { class: "h-4 w-4 text-destructive" })
                              ]),
                              _: 1
                            }, 8, ["onClick"]),
                            createVNode(unref(_sfc_main$l), {
                              size: "sm",
                              onClick: withModifiers(($event) => addToCartFromWishlist(
                                item
                              ), ["stop"])
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" + "),
                                createVNode(unref(ShoppingCart), { class: "h-3.5 w-3.5" })
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ])
                        ]);
                      }), 128))
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "p-8 text-center text-sm text-muted-foreground"
                    }, [
                      createVNode(unref(Heart), { class: "mx-auto mb-2 h-12 w-12 opacity-20" }),
                      createVNode("p", null, "Wishlist masih kosong")
                    ]))
                  ]),
                  wishlistItems.value.length > 0 ? (openBlock(), createBlock(unref(_sfc_main$r), { key: 0 })) : createCommentVNode("", true),
                  wishlistItems.value.length > 0 ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "p-2"
                  }, [
                    createVNode(unref(Link), { href: "/wishlist" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$l), {
                          class: "w-full",
                          variant: "outline"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Lihat Semua Wishlist ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ])) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$m), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$n), { "as-child": "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$l), {
                    variant: "ghost",
                    size: "icon",
                    class: "relative rounded-full",
                    "aria-label": "Cart"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(ShoppingCart), { class: "h-5 w-5" }, null, _parent4, _scopeId3));
                        if (cartItemCount.value > 0) {
                          _push4(ssrRenderComponent(unref(_sfc_main$o), { class: "absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-[10px]" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(cartItemCount.value)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(cartItemCount.value), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode(unref(ShoppingCart), { class: "h-5 w-5" }),
                          cartItemCount.value > 0 ? (openBlock(), createBlock(unref(_sfc_main$o), {
                            key: 0,
                            class: "absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-[10px]"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(cartItemCount.value), 1)
                            ]),
                            _: 1
                          })) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$l), {
                      variant: "ghost",
                      size: "icon",
                      class: "relative rounded-full",
                      "aria-label": "Cart"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(ShoppingCart), { class: "h-5 w-5" }),
                        cartItemCount.value > 0 ? (openBlock(), createBlock(unref(_sfc_main$o), {
                          key: 0,
                          class: "absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-[10px]"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(cartItemCount.value), 1)
                          ]),
                          _: 1
                        })) : createCommentVNode("", true)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$p), {
              align: "end",
              class: "w-96"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$q), { class: "flex items-center justify-between" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex items-center gap-2"${_scopeId3}>`);
                        if (cartItems.value.length > 0) {
                          _push4(ssrRenderComponent(unref(_sfc_main$s), {
                            "model-value": isAllSelected.value,
                            "onUpdate:modelValue": (checked) => toggleSelectAll(
                              checked === true
                            )
                          }, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`<span${_scopeId3}>Keranjang Belanja</span></div>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$o), { variant: "secondary" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(cartItemCount.value)} item`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(cartItemCount.value) + " item", 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            cartItems.value.length > 0 ? (openBlock(), createBlock(unref(_sfc_main$s), {
                              key: 0,
                              "model-value": isAllSelected.value,
                              "onUpdate:modelValue": (checked) => toggleSelectAll(
                                checked === true
                              )
                            }, null, 8, ["model-value", "onUpdate:modelValue"])) : createCommentVNode("", true),
                            createVNode("span", null, "Keranjang Belanja")
                          ]),
                          createVNode(unref(_sfc_main$o), { variant: "secondary" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(cartItemCount.value) + " item", 1)
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$r), null, null, _parent3, _scopeId2));
                  _push3(`<div class="max-h-96 overflow-y-auto"${_scopeId2}>`);
                  if (cartItems.value.length > 0) {
                    _push3(`<div class="space-y-1"${_scopeId2}><!--[-->`);
                    ssrRenderList(cartItems.value, (item) => {
                      _push3(`<div class="group rounded-md p-3 transition-colors hover:bg-accent"${_scopeId2}><div class="flex items-center gap-3"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$s), {
                        "model-value": selectedCartItems.value.includes(
                          item.id
                        ),
                        "onUpdate:modelValue": (checked) => toggleCartItemSelection(
                          item.id,
                          checked === true
                        ),
                        onClick: () => {
                        }
                      }, null, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(unref(Link), {
                        href: `/produk/${item.slug}`,
                        class: "flex-shrink-0"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<img${ssrRenderAttr("src", item.image)}${ssrRenderAttr("alt", item.name)} class="h-16 w-16 rounded object-cover"${_scopeId3}>`);
                          } else {
                            return [
                              createVNode("img", {
                                src: item.image,
                                alt: item.name,
                                class: "h-16 w-16 rounded object-cover"
                              }, null, 8, ["src", "alt"])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`<div class="min-w-0 flex-1"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(Link), {
                        href: `/produk/${item.slug}`,
                        class: "line-clamp-2 block text-sm font-medium hover:underline"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(item.name)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(item.name), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`<p class="mt-1 text-sm font-bold text-primary"${_scopeId2}>${ssrInterpolate(formatCurrency(
                        item.price
                      ))}</p></div>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$l), {
                        variant: "ghost",
                        size: "icon",
                        class: "flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100",
                        onClick: ($event) => removeFromCart(item.id),
                        "aria-label": "Remove from cart"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(Trash2), { class: "h-4 w-4 text-destructive" }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(unref(Trash2), { class: "h-4 w-4 text-destructive" })
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</div><div class="mt-2 flex items-center justify-between"${_scopeId2}><span class="text-xs text-muted-foreground"${_scopeId2}>Jumlah:</span><div class="flex items-center gap-2"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$l), {
                        variant: "outline",
                        size: "icon",
                        class: "h-7 w-7",
                        onClick: ($event) => updateCartQuantity(
                          item.id,
                          item.quantity - 1
                        ),
                        disabled: item.quantity <= 1
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(Minus), { class: "h-3 w-3" }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(unref(Minus), { class: "h-3 w-3" })
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`<span class="w-8 text-center text-sm font-medium"${_scopeId2}>${ssrInterpolate(item.quantity)}</span>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$l), {
                        variant: "outline",
                        size: "icon",
                        class: "h-7 w-7",
                        onClick: ($event) => updateCartQuantity(
                          item.id,
                          item.quantity + 1
                        )
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(Plus), { class: "h-3 w-3" }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(unref(Plus), { class: "h-3 w-3" })
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</div></div></div>`);
                    });
                    _push3(`<!--]--></div>`);
                  } else {
                    _push3(`<div class="p-8 text-center text-sm text-muted-foreground"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(ShoppingCart), { class: "mx-auto mb-2 h-12 w-12 opacity-20" }, null, _parent3, _scopeId2));
                    _push3(`<p${_scopeId2}>Keranjang masih kosong</p></div>`);
                  }
                  _push3(`</div>`);
                  if (cartItems.value.length > 0) {
                    _push3(ssrRenderComponent(unref(_sfc_main$r), null, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (cartItems.value.length > 0) {
                    _push3(`<div class="space-y-3 p-3"${_scopeId2}><div class="space-y-2"${_scopeId2}><div class="flex items-center justify-between text-sm"${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Total (${ssrInterpolate(cartItemCount.value)} item):</span><span class="text-sm"${_scopeId2}>${ssrInterpolate(formatCurrency(cartTotal.value))}</span></div>`);
                    if (selectedItemsCount.value > 0) {
                      _push3(`<div class="flex items-center justify-between text-sm"${_scopeId2}><span class="font-medium"${_scopeId2}>Dipilih (${ssrInterpolate(selectedItemsCount.value)} item):</span><span class="text-lg font-bold"${_scopeId2}>${ssrInterpolate(formatCurrency(
                        selectedItemsTotal.value
                      ))}</span></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div><div${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$l), {
                      class: "w-full",
                      size: "sm",
                      disabled: selectedItemsCount.value === 0,
                      onClick: handleCheckout
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Checkout `);
                        } else {
                          return [
                            createTextVNode(" Checkout ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(unref(_sfc_main$q), { class: "flex items-center justify-between" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          cartItems.value.length > 0 ? (openBlock(), createBlock(unref(_sfc_main$s), {
                            key: 0,
                            "model-value": isAllSelected.value,
                            "onUpdate:modelValue": (checked) => toggleSelectAll(
                              checked === true
                            )
                          }, null, 8, ["model-value", "onUpdate:modelValue"])) : createCommentVNode("", true),
                          createVNode("span", null, "Keranjang Belanja")
                        ]),
                        createVNode(unref(_sfc_main$o), { variant: "secondary" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(cartItemCount.value) + " item", 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$r)),
                    createVNode("div", { class: "max-h-96 overflow-y-auto" }, [
                      cartItems.value.length > 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "space-y-1"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(cartItems.value, (item) => {
                          return openBlock(), createBlock("div", {
                            key: item.id,
                            class: "group rounded-md p-3 transition-colors hover:bg-accent"
                          }, [
                            createVNode("div", { class: "flex items-center gap-3" }, [
                              createVNode(unref(_sfc_main$s), {
                                "model-value": selectedCartItems.value.includes(
                                  item.id
                                ),
                                "onUpdate:modelValue": (checked) => toggleCartItemSelection(
                                  item.id,
                                  checked === true
                                ),
                                onClick: withModifiers(() => {
                                }, ["stop"])
                              }, null, 8, ["model-value", "onUpdate:modelValue", "onClick"]),
                              createVNode(unref(Link), {
                                href: `/produk/${item.slug}`,
                                class: "flex-shrink-0"
                              }, {
                                default: withCtx(() => [
                                  createVNode("img", {
                                    src: item.image,
                                    alt: item.name,
                                    class: "h-16 w-16 rounded object-cover"
                                  }, null, 8, ["src", "alt"])
                                ]),
                                _: 2
                              }, 1032, ["href"]),
                              createVNode("div", { class: "min-w-0 flex-1" }, [
                                createVNode(unref(Link), {
                                  href: `/produk/${item.slug}`,
                                  class: "line-clamp-2 block text-sm font-medium hover:underline"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(item.name), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["href"]),
                                createVNode("p", { class: "mt-1 text-sm font-bold text-primary" }, toDisplayString(formatCurrency(
                                  item.price
                                )), 1)
                              ]),
                              createVNode(unref(_sfc_main$l), {
                                variant: "ghost",
                                size: "icon",
                                class: "flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100",
                                onClick: withModifiers(($event) => removeFromCart(item.id), ["stop"]),
                                "aria-label": "Remove from cart"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Trash2), { class: "h-4 w-4 text-destructive" })
                                ]),
                                _: 1
                              }, 8, ["onClick"])
                            ]),
                            createVNode("div", { class: "mt-2 flex items-center justify-between" }, [
                              createVNode("span", { class: "text-xs text-muted-foreground" }, "Jumlah:"),
                              createVNode("div", { class: "flex items-center gap-2" }, [
                                createVNode(unref(_sfc_main$l), {
                                  variant: "outline",
                                  size: "icon",
                                  class: "h-7 w-7",
                                  onClick: withModifiers(($event) => updateCartQuantity(
                                    item.id,
                                    item.quantity - 1
                                  ), ["stop"]),
                                  disabled: item.quantity <= 1
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Minus), { class: "h-3 w-3" })
                                  ]),
                                  _: 1
                                }, 8, ["onClick", "disabled"]),
                                createVNode("span", { class: "w-8 text-center text-sm font-medium" }, toDisplayString(item.quantity), 1),
                                createVNode(unref(_sfc_main$l), {
                                  variant: "outline",
                                  size: "icon",
                                  class: "h-7 w-7",
                                  onClick: withModifiers(($event) => updateCartQuantity(
                                    item.id,
                                    item.quantity + 1
                                  ), ["stop"])
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Plus), { class: "h-3 w-3" })
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ])
                            ])
                          ]);
                        }), 128))
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "p-8 text-center text-sm text-muted-foreground"
                      }, [
                        createVNode(unref(ShoppingCart), { class: "mx-auto mb-2 h-12 w-12 opacity-20" }),
                        createVNode("p", null, "Keranjang masih kosong")
                      ]))
                    ]),
                    cartItems.value.length > 0 ? (openBlock(), createBlock(unref(_sfc_main$r), { key: 0 })) : createCommentVNode("", true),
                    cartItems.value.length > 0 ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "space-y-3 p-3"
                    }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode("div", { class: "flex items-center justify-between text-sm" }, [
                          createVNode("span", { class: "text-muted-foreground" }, "Total (" + toDisplayString(cartItemCount.value) + " item):", 1),
                          createVNode("span", { class: "text-sm" }, toDisplayString(formatCurrency(cartTotal.value)), 1)
                        ]),
                        selectedItemsCount.value > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex items-center justify-between text-sm"
                        }, [
                          createVNode("span", { class: "font-medium" }, "Dipilih (" + toDisplayString(selectedItemsCount.value) + " item):", 1),
                          createVNode("span", { class: "text-lg font-bold" }, toDisplayString(formatCurrency(
                            selectedItemsTotal.value
                          )), 1)
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode(unref(_sfc_main$l), {
                          class: "w-full",
                          size: "sm",
                          disabled: selectedItemsCount.value === 0,
                          onClick: withModifiers(handleCheckout, ["stop"])
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Checkout ")
                          ]),
                          _: 1
                        }, 8, ["disabled"])
                      ])
                    ])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$n), { "as-child": "" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$l), {
                    variant: "ghost",
                    size: "icon",
                    class: "relative rounded-full",
                    "aria-label": "Cart"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(ShoppingCart), { class: "h-5 w-5" }),
                      cartItemCount.value > 0 ? (openBlock(), createBlock(unref(_sfc_main$o), {
                        key: 0,
                        class: "absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-[10px]"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(cartItemCount.value), 1)
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$p), {
                align: "end",
                class: "w-96"
              }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$q), { class: "flex items-center justify-between" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        cartItems.value.length > 0 ? (openBlock(), createBlock(unref(_sfc_main$s), {
                          key: 0,
                          "model-value": isAllSelected.value,
                          "onUpdate:modelValue": (checked) => toggleSelectAll(
                            checked === true
                          )
                        }, null, 8, ["model-value", "onUpdate:modelValue"])) : createCommentVNode("", true),
                        createVNode("span", null, "Keranjang Belanja")
                      ]),
                      createVNode(unref(_sfc_main$o), { variant: "secondary" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(cartItemCount.value) + " item", 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$r)),
                  createVNode("div", { class: "max-h-96 overflow-y-auto" }, [
                    cartItems.value.length > 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-1"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(cartItems.value, (item) => {
                        return openBlock(), createBlock("div", {
                          key: item.id,
                          class: "group rounded-md p-3 transition-colors hover:bg-accent"
                        }, [
                          createVNode("div", { class: "flex items-center gap-3" }, [
                            createVNode(unref(_sfc_main$s), {
                              "model-value": selectedCartItems.value.includes(
                                item.id
                              ),
                              "onUpdate:modelValue": (checked) => toggleCartItemSelection(
                                item.id,
                                checked === true
                              ),
                              onClick: withModifiers(() => {
                              }, ["stop"])
                            }, null, 8, ["model-value", "onUpdate:modelValue", "onClick"]),
                            createVNode(unref(Link), {
                              href: `/produk/${item.slug}`,
                              class: "flex-shrink-0"
                            }, {
                              default: withCtx(() => [
                                createVNode("img", {
                                  src: item.image,
                                  alt: item.name,
                                  class: "h-16 w-16 rounded object-cover"
                                }, null, 8, ["src", "alt"])
                              ]),
                              _: 2
                            }, 1032, ["href"]),
                            createVNode("div", { class: "min-w-0 flex-1" }, [
                              createVNode(unref(Link), {
                                href: `/produk/${item.slug}`,
                                class: "line-clamp-2 block text-sm font-medium hover:underline"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.name), 1)
                                ]),
                                _: 2
                              }, 1032, ["href"]),
                              createVNode("p", { class: "mt-1 text-sm font-bold text-primary" }, toDisplayString(formatCurrency(
                                item.price
                              )), 1)
                            ]),
                            createVNode(unref(_sfc_main$l), {
                              variant: "ghost",
                              size: "icon",
                              class: "flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100",
                              onClick: withModifiers(($event) => removeFromCart(item.id), ["stop"]),
                              "aria-label": "Remove from cart"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Trash2), { class: "h-4 w-4 text-destructive" })
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ]),
                          createVNode("div", { class: "mt-2 flex items-center justify-between" }, [
                            createVNode("span", { class: "text-xs text-muted-foreground" }, "Jumlah:"),
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              createVNode(unref(_sfc_main$l), {
                                variant: "outline",
                                size: "icon",
                                class: "h-7 w-7",
                                onClick: withModifiers(($event) => updateCartQuantity(
                                  item.id,
                                  item.quantity - 1
                                ), ["stop"]),
                                disabled: item.quantity <= 1
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Minus), { class: "h-3 w-3" })
                                ]),
                                _: 1
                              }, 8, ["onClick", "disabled"]),
                              createVNode("span", { class: "w-8 text-center text-sm font-medium" }, toDisplayString(item.quantity), 1),
                              createVNode(unref(_sfc_main$l), {
                                variant: "outline",
                                size: "icon",
                                class: "h-7 w-7",
                                onClick: withModifiers(($event) => updateCartQuantity(
                                  item.id,
                                  item.quantity + 1
                                ), ["stop"])
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Plus), { class: "h-3 w-3" })
                                ]),
                                _: 1
                              }, 8, ["onClick"])
                            ])
                          ])
                        ]);
                      }), 128))
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "p-8 text-center text-sm text-muted-foreground"
                    }, [
                      createVNode(unref(ShoppingCart), { class: "mx-auto mb-2 h-12 w-12 opacity-20" }),
                      createVNode("p", null, "Keranjang masih kosong")
                    ]))
                  ]),
                  cartItems.value.length > 0 ? (openBlock(), createBlock(unref(_sfc_main$r), { key: 0 })) : createCommentVNode("", true),
                  cartItems.value.length > 0 ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "space-y-3 p-3"
                  }, [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode("div", { class: "flex items-center justify-between text-sm" }, [
                        createVNode("span", { class: "text-muted-foreground" }, "Total (" + toDisplayString(cartItemCount.value) + " item):", 1),
                        createVNode("span", { class: "text-sm" }, toDisplayString(formatCurrency(cartTotal.value)), 1)
                      ]),
                      selectedItemsCount.value > 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex items-center justify-between text-sm"
                      }, [
                        createVNode("span", { class: "font-medium" }, "Dipilih (" + toDisplayString(selectedItemsCount.value) + " item):", 1),
                        createVNode("span", { class: "text-lg font-bold" }, toDisplayString(formatCurrency(
                          selectedItemsTotal.value
                        )), 1)
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", null, [
                      createVNode(unref(_sfc_main$l), {
                        class: "w-full",
                        size: "sm",
                        disabled: selectedItemsCount.value === 0,
                        onClick: withModifiers(handleCheckout, ["stop"])
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Checkout ")
                        ]),
                        _: 1
                      }, 8, ["disabled"])
                    ])
                  ])) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$m), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$n), { "as-child": "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$l), {
                    variant: "ghost",
                    size: "icon",
                    class: "rounded-full",
                    "aria-label": "Account"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(User), { class: "h-5 w-5" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(User), { class: "h-5 w-5" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$l), {
                      variant: "ghost",
                      size: "icon",
                      class: "rounded-full",
                      "aria-label": "Account"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(User), { class: "h-5 w-5" })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$p), {
              align: "end",
              class: "w-56"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (isAuthenticated.value) {
                    _push3(ssrRenderComponent(unref(_sfc_main$q), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="flex flex-col space-y-1"${_scopeId3}><p class="text-sm font-medium"${_scopeId3}>${ssrInterpolate(unref(page).props.auth?.user?.name || "Customer")}</p><p class="text-xs text-muted-foreground"${_scopeId3}>${ssrInterpolate(unref(page).props.auth?.user?.email)}</p></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "flex flex-col space-y-1" }, [
                              createVNode("p", { class: "text-sm font-medium" }, toDisplayString(unref(page).props.auth?.user?.name || "Customer"), 1),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(unref(page).props.auth?.user?.email), 1)
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(ssrRenderComponent(unref(_sfc_main$q), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Akun Saya`);
                        } else {
                          return [
                            createTextVNode("Akun Saya")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  }
                  _push3(ssrRenderComponent(unref(_sfc_main$r), null, null, _parent3, _scopeId2));
                  if (isAuthenticated.value) {
                    _push3(`<!--[-->`);
                    _push3(ssrRenderComponent(unref(Link), { href: "/client/profile" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(_sfc_main$t), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(UserCircle), { class: "mr-2 h-4 w-4" }, null, _parent5, _scopeId4));
                                _push5(`<span${_scopeId4}>Profil</span>`);
                              } else {
                                return [
                                  createVNode(unref(UserCircle), { class: "mr-2 h-4 w-4" }),
                                  createVNode("span", null, "Profil")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(_sfc_main$t), null, {
                              default: withCtx(() => [
                                createVNode(unref(UserCircle), { class: "mr-2 h-4 w-4" }),
                                createVNode("span", null, "Profil")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(Link), { href: "/client/profile?tab=orders" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(_sfc_main$t), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(Package), { class: "mr-2 h-4 w-4" }, null, _parent5, _scopeId4));
                                _push5(`<span${_scopeId4}>Pesanan Saya</span>`);
                              } else {
                                return [
                                  createVNode(unref(Package), { class: "mr-2 h-4 w-4" }),
                                  createVNode("span", null, "Pesanan Saya")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(_sfc_main$t), null, {
                              default: withCtx(() => [
                                createVNode(unref(Package), { class: "mr-2 h-4 w-4" }),
                                createVNode("span", null, "Pesanan Saya")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(Link), { href: "/client/profile?tab=wallet" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(_sfc_main$t), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(Package), { class: "mr-2 h-4 w-4" }, null, _parent5, _scopeId4));
                                _push5(`<span${_scopeId4}>Dompet Saya</span>`);
                              } else {
                                return [
                                  createVNode(unref(Package), { class: "mr-2 h-4 w-4" }),
                                  createVNode("span", null, "Dompet Saya")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(_sfc_main$t), null, {
                              default: withCtx(() => [
                                createVNode(unref(Package), { class: "mr-2 h-4 w-4" }),
                                createVNode("span", null, "Dompet Saya")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(Link), { href: "/client/profile?tab=security" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(_sfc_main$t), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(Shield), { class: "mr-2 h-4 w-4" }, null, _parent5, _scopeId4));
                                _push5(`<span${_scopeId4}>Keamanan</span>`);
                              } else {
                                return [
                                  createVNode(unref(Shield), { class: "mr-2 h-4 w-4" }),
                                  createVNode("span", null, "Keamanan")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(_sfc_main$t), null, {
                              default: withCtx(() => [
                                createVNode(unref(Shield), { class: "mr-2 h-4 w-4" }),
                                createVNode("span", null, "Keamanan")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(Link), { href: "/client/profile?tab=danger" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(_sfc_main$t), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(Info), { class: "mr-2 h-4 w-4" }, null, _parent5, _scopeId4));
                                _push5(`<span${_scopeId4}>Hapus Akun</span>`);
                              } else {
                                return [
                                  createVNode(unref(Info), { class: "mr-2 h-4 w-4" }),
                                  createVNode("span", null, "Hapus Akun")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(_sfc_main$t), null, {
                              default: withCtx(() => [
                                createVNode(unref(Info), { class: "mr-2 h-4 w-4" }),
                                createVNode("span", null, "Hapus Akun")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$r), null, null, _parent3, _scopeId2));
                    _push3(`<button type="button" class="w-full"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$t), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(LogOut), { class: "mr-2 h-4 w-4" }, null, _parent4, _scopeId3));
                          _push4(`<span${_scopeId3}>Keluar</span>`);
                        } else {
                          return [
                            createVNode(unref(LogOut), { class: "mr-2 h-4 w-4" }),
                            createVNode("span", null, "Keluar")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</button><!--]-->`);
                  } else {
                    _push3(`<!--[-->`);
                    _push3(ssrRenderComponent(unref(Link), { href: "/client/login" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(_sfc_main$t), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(User), { class: "mr-2 h-4 w-4" }, null, _parent5, _scopeId4));
                                _push5(`<span${_scopeId4}>Masuk</span>`);
                              } else {
                                return [
                                  createVNode(unref(User), { class: "mr-2 h-4 w-4" }),
                                  createVNode("span", null, "Masuk")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(_sfc_main$t), null, {
                              default: withCtx(() => [
                                createVNode(unref(User), { class: "mr-2 h-4 w-4" }),
                                createVNode("span", null, "Masuk")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(Link), { href: "/client/register" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(_sfc_main$t), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(UserCircle), { class: "mr-2 h-4 w-4" }, null, _parent5, _scopeId4));
                                _push5(`<span${_scopeId4}>Daftar</span>`);
                              } else {
                                return [
                                  createVNode(unref(UserCircle), { class: "mr-2 h-4 w-4" }),
                                  createVNode("span", null, "Daftar")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(_sfc_main$t), null, {
                              default: withCtx(() => [
                                createVNode(unref(UserCircle), { class: "mr-2 h-4 w-4" }),
                                createVNode("span", null, "Daftar")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<!--]-->`);
                  }
                } else {
                  return [
                    isAuthenticated.value ? (openBlock(), createBlock(unref(_sfc_main$q), { key: 0 }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex flex-col space-y-1" }, [
                          createVNode("p", { class: "text-sm font-medium" }, toDisplayString(unref(page).props.auth?.user?.name || "Customer"), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(unref(page).props.auth?.user?.email), 1)
                        ])
                      ]),
                      _: 1
                    })) : (openBlock(), createBlock(unref(_sfc_main$q), { key: 1 }, {
                      default: withCtx(() => [
                        createTextVNode("Akun Saya")
                      ]),
                      _: 1
                    })),
                    createVNode(unref(_sfc_main$r)),
                    isAuthenticated.value ? (openBlock(), createBlock(Fragment, { key: 2 }, [
                      createVNode(unref(Link), { href: "/client/profile" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$t), null, {
                            default: withCtx(() => [
                              createVNode(unref(UserCircle), { class: "mr-2 h-4 w-4" }),
                              createVNode("span", null, "Profil")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(Link), { href: "/client/profile?tab=orders" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$t), null, {
                            default: withCtx(() => [
                              createVNode(unref(Package), { class: "mr-2 h-4 w-4" }),
                              createVNode("span", null, "Pesanan Saya")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(Link), { href: "/client/profile?tab=wallet" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$t), null, {
                            default: withCtx(() => [
                              createVNode(unref(Package), { class: "mr-2 h-4 w-4" }),
                              createVNode("span", null, "Dompet Saya")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(Link), { href: "/client/profile?tab=security" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$t), null, {
                            default: withCtx(() => [
                              createVNode(unref(Shield), { class: "mr-2 h-4 w-4" }),
                              createVNode("span", null, "Keamanan")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(Link), { href: "/client/profile?tab=danger" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$t), null, {
                            default: withCtx(() => [
                              createVNode(unref(Info), { class: "mr-2 h-4 w-4" }),
                              createVNode("span", null, "Hapus Akun")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$r)),
                      createVNode("button", {
                        type: "button",
                        class: "w-full",
                        onClick: handleLogout
                      }, [
                        createVNode(unref(_sfc_main$t), null, {
                          default: withCtx(() => [
                            createVNode(unref(LogOut), { class: "mr-2 h-4 w-4" }),
                            createVNode("span", null, "Keluar")
                          ]),
                          _: 1
                        })
                      ])
                    ], 64)) : (openBlock(), createBlock(Fragment, { key: 3 }, [
                      createVNode(unref(Link), { href: "/client/login" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$t), null, {
                            default: withCtx(() => [
                              createVNode(unref(User), { class: "mr-2 h-4 w-4" }),
                              createVNode("span", null, "Masuk")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(Link), { href: "/client/register" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$t), null, {
                            default: withCtx(() => [
                              createVNode(unref(UserCircle), { class: "mr-2 h-4 w-4" }),
                              createVNode("span", null, "Daftar")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ], 64))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$n), { "as-child": "" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$l), {
                    variant: "ghost",
                    size: "icon",
                    class: "rounded-full",
                    "aria-label": "Account"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(User), { class: "h-5 w-5" })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$p), {
                align: "end",
                class: "w-56"
              }, {
                default: withCtx(() => [
                  isAuthenticated.value ? (openBlock(), createBlock(unref(_sfc_main$q), { key: 0 }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex flex-col space-y-1" }, [
                        createVNode("p", { class: "text-sm font-medium" }, toDisplayString(unref(page).props.auth?.user?.name || "Customer"), 1),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(unref(page).props.auth?.user?.email), 1)
                      ])
                    ]),
                    _: 1
                  })) : (openBlock(), createBlock(unref(_sfc_main$q), { key: 1 }, {
                    default: withCtx(() => [
                      createTextVNode("Akun Saya")
                    ]),
                    _: 1
                  })),
                  createVNode(unref(_sfc_main$r)),
                  isAuthenticated.value ? (openBlock(), createBlock(Fragment, { key: 2 }, [
                    createVNode(unref(Link), { href: "/client/profile" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$t), null, {
                          default: withCtx(() => [
                            createVNode(unref(UserCircle), { class: "mr-2 h-4 w-4" }),
                            createVNode("span", null, "Profil")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(Link), { href: "/client/profile?tab=orders" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$t), null, {
                          default: withCtx(() => [
                            createVNode(unref(Package), { class: "mr-2 h-4 w-4" }),
                            createVNode("span", null, "Pesanan Saya")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(Link), { href: "/client/profile?tab=wallet" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$t), null, {
                          default: withCtx(() => [
                            createVNode(unref(Package), { class: "mr-2 h-4 w-4" }),
                            createVNode("span", null, "Dompet Saya")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(Link), { href: "/client/profile?tab=security" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$t), null, {
                          default: withCtx(() => [
                            createVNode(unref(Shield), { class: "mr-2 h-4 w-4" }),
                            createVNode("span", null, "Keamanan")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(Link), { href: "/client/profile?tab=danger" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$t), null, {
                          default: withCtx(() => [
                            createVNode(unref(Info), { class: "mr-2 h-4 w-4" }),
                            createVNode("span", null, "Hapus Akun")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$r)),
                    createVNode("button", {
                      type: "button",
                      class: "w-full",
                      onClick: handleLogout
                    }, [
                      createVNode(unref(_sfc_main$t), null, {
                        default: withCtx(() => [
                          createVNode(unref(LogOut), { class: "mr-2 h-4 w-4" }),
                          createVNode("span", null, "Keluar")
                        ]),
                        _: 1
                      })
                    ])
                  ], 64)) : (openBlock(), createBlock(Fragment, { key: 3 }, [
                    createVNode(unref(Link), { href: "/client/login" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$t), null, {
                          default: withCtx(() => [
                            createVNode(unref(User), { class: "mr-2 h-4 w-4" }),
                            createVNode("span", null, "Masuk")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(Link), { href: "/client/register" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$t), null, {
                          default: withCtx(() => [
                            createVNode(unref(UserCircle), { class: "mr-2 h-4 w-4" }),
                            createVNode("span", null, "Daftar")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ], 64))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$4), {
        open: mobileMenuOpen.value,
        "onUpdate:open": ($event) => mobileMenuOpen.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$u), { "as-child": "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$l), {
                    variant: "ghost",
                    size: "icon",
                    class: "rounded-full lg:hidden",
                    "aria-label": "Menu"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Menu), { class: "h-5 w-5" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Menu), { class: "h-5 w-5" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$l), {
                      variant: "ghost",
                      size: "icon",
                      class: "rounded-full lg:hidden",
                      "aria-label": "Menu"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Menu), { class: "h-5 w-5" })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$5), {
              side: "left",
              class: "w-full p-0 sm:w-96"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { class: "border-b px-6 py-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$7), { class: "flex items-center gap-2 text-xl font-bold" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (siteLogo.value) {
                                _push5(`<img${ssrRenderAttr("src", siteLogo.value)}${ssrRenderAttr("alt", siteName.value)} class="h-6 w-6 object-contain"${_scopeId4}>`);
                              } else {
                                _push5(ssrRenderComponent(unref(Package), { class: "h-6 w-6" }, null, _parent5, _scopeId4));
                              }
                              _push5(` ${ssrInterpolate(siteName.value)}`);
                            } else {
                              return [
                                siteLogo.value ? (openBlock(), createBlock("img", {
                                  key: 0,
                                  src: siteLogo.value,
                                  alt: siteName.value,
                                  class: "h-6 w-6 object-contain"
                                }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(unref(Package), {
                                  key: 1,
                                  class: "h-6 w-6"
                                })),
                                createTextVNode(" " + toDisplayString(siteName.value), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$7), { class: "flex items-center gap-2 text-xl font-bold" }, {
                            default: withCtx(() => [
                              siteLogo.value ? (openBlock(), createBlock("img", {
                                key: 0,
                                src: siteLogo.value,
                                alt: siteName.value,
                                class: "h-6 w-6 object-contain"
                              }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(unref(Package), {
                                key: 1,
                                class: "h-6 w-6"
                              })),
                              createTextVNode(" " + toDisplayString(siteName.value), 1)
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="overflow-y-auto p-6"${_scopeId2}><nav class="space-y-6"${_scopeId2}><!--[-->`);
                  ssrRenderList(productCategories.value, (category) => {
                    _push3(`<div${_scopeId2}><div class="mb-3 flex items-center gap-2"${_scopeId2}>`);
                    ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(category.icon), { class: "h-5 w-5" }, null), _parent3, _scopeId2);
                    _push3(`<h3 class="text-base font-bold"${_scopeId2}>${ssrInterpolate(category.name)}</h3></div>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$c), { class: "my-3" }, null, _parent3, _scopeId2));
                    if (category.items.length > 0) {
                      _push3(`<ul class="ml-7 space-y-2"${_scopeId2}><!--[-->`);
                      ssrRenderList(category.items, (item) => {
                        _push3(`<li${_scopeId2}>`);
                        _push3(ssrRenderComponent(unref(Link), {
                          href: item.href,
                          class: "block py-1 text-sm text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white",
                          onClick: ($event) => mobileMenuOpen.value = false
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`${ssrInterpolate(item.name)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(item.name), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                        _push3(`</li>`);
                      });
                      _push3(`<!--]--></ul>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                  });
                  _push3(`<!--]--></nav></div>`);
                } else {
                  return [
                    createVNode(unref(_sfc_main$6), { class: "border-b px-6 py-4" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$7), { class: "flex items-center gap-2 text-xl font-bold" }, {
                          default: withCtx(() => [
                            siteLogo.value ? (openBlock(), createBlock("img", {
                              key: 0,
                              src: siteLogo.value,
                              alt: siteName.value,
                              class: "h-6 w-6 object-contain"
                            }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(unref(Package), {
                              key: 1,
                              class: "h-6 w-6"
                            })),
                            createTextVNode(" " + toDisplayString(siteName.value), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "overflow-y-auto p-6" }, [
                      createVNode("nav", { class: "space-y-6" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(productCategories.value, (category) => {
                          return openBlock(), createBlock("div", {
                            key: category.name
                          }, [
                            createVNode("div", { class: "mb-3 flex items-center gap-2" }, [
                              (openBlock(), createBlock(resolveDynamicComponent(category.icon), { class: "h-5 w-5" })),
                              createVNode("h3", { class: "text-base font-bold" }, toDisplayString(category.name), 1)
                            ]),
                            createVNode(unref(_sfc_main$c), { class: "my-3" }),
                            category.items.length > 0 ? (openBlock(), createBlock("ul", {
                              key: 0,
                              class: "ml-7 space-y-2"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(category.items, (item) => {
                                return openBlock(), createBlock("li", {
                                  key: item.name
                                }, [
                                  createVNode(unref(Link), {
                                    href: item.href,
                                    class: "block py-1 text-sm text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white",
                                    onClick: ($event) => mobileMenuOpen.value = false
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(item.name), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["href", "onClick"])
                                ]);
                              }), 128))
                            ])) : createCommentVNode("", true)
                          ]);
                        }), 128))
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$u), { "as-child": "" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$l), {
                    variant: "ghost",
                    size: "icon",
                    class: "rounded-full lg:hidden",
                    "aria-label": "Menu"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Menu), { class: "h-5 w-5" })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), {
                side: "left",
                class: "w-full p-0 sm:w-96"
              }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$6), { class: "border-b px-6 py-4" }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$7), { class: "flex items-center gap-2 text-xl font-bold" }, {
                        default: withCtx(() => [
                          siteLogo.value ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: siteLogo.value,
                            alt: siteName.value,
                            class: "h-6 w-6 object-contain"
                          }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(unref(Package), {
                            key: 1,
                            class: "h-6 w-6"
                          })),
                          createTextVNode(" " + toDisplayString(siteName.value), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "overflow-y-auto p-6" }, [
                    createVNode("nav", { class: "space-y-6" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(productCategories.value, (category) => {
                        return openBlock(), createBlock("div", {
                          key: category.name
                        }, [
                          createVNode("div", { class: "mb-3 flex items-center gap-2" }, [
                            (openBlock(), createBlock(resolveDynamicComponent(category.icon), { class: "h-5 w-5" })),
                            createVNode("h3", { class: "text-base font-bold" }, toDisplayString(category.name), 1)
                          ]),
                          createVNode(unref(_sfc_main$c), { class: "my-3" }),
                          category.items.length > 0 ? (openBlock(), createBlock("ul", {
                            key: 0,
                            class: "ml-7 space-y-2"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(category.items, (item) => {
                              return openBlock(), createBlock("li", {
                                key: item.name
                              }, [
                                createVNode(unref(Link), {
                                  href: item.href,
                                  class: "block py-1 text-sm text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white",
                                  onClick: ($event) => mobileMenuOpen.value = false
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(item.name), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["href", "onClick"])
                              ]);
                            }), 128))
                          ])) : createCommentVNode("", true)
                        ]);
                      }), 128))
                    ])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div class="hidden border-t lg:block dark:border-gray-800"><div class="container mx-auto px-6"><div class="flex h-12 items-center gap-6">`);
      _push(ssrRenderComponent(unref(_sfc_main$m), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$n), { "as-child": "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$l), {
                    variant: "ghost",
                    class: "h-auto px-3 py-2 text-sm font-medium"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Semua Kategori <svg class="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId3}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"${_scopeId3}></path></svg>`);
                      } else {
                        return [
                          createTextVNode(" Semua Kategori "),
                          (openBlock(), createBlock("svg", {
                            class: "ml-1 h-4 w-4",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M19 9l-7 7-7-7"
                            })
                          ]))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$l), {
                      variant: "ghost",
                      class: "h-auto px-3 py-2 text-sm font-medium"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Semua Kategori "),
                        (openBlock(), createBlock("svg", {
                          class: "ml-1 h-4 w-4",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M19 9l-7 7-7-7"
                          })
                        ]))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$p), {
              align: "start",
              class: "w-[800px] p-6"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid grid-cols-4 gap-6"${_scopeId2}><!--[-->`);
                  ssrRenderList(productCategories.value, (category) => {
                    _push3(`<div class="space-y-3"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Link), {
                      href: `/toko?category=${category.slug}`,
                      class: "group"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="mb-3 flex items-center gap-2 text-sm font-semibold transition-colors hover:text-primary"${_scopeId3}>`);
                          ssrRenderVNode(_push4, createVNode(resolveDynamicComponent(category.icon), { class: "h-4 w-4 text-primary" }, null), _parent4, _scopeId3);
                          _push4(`<span${_scopeId3}>${ssrInterpolate(category.name)}</span></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "mb-3 flex items-center gap-2 text-sm font-semibold transition-colors hover:text-primary" }, [
                              (openBlock(), createBlock(resolveDynamicComponent(category.icon), { class: "h-4 w-4 text-primary" })),
                              createVNode("span", null, toDisplayString(category.name), 1)
                            ])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`<div class="space-y-1.5"${_scopeId2}><!--[-->`);
                    ssrRenderList(category.items.slice(
                      0,
                      5
                    ), (item) => {
                      _push3(ssrRenderComponent(unref(Link), {
                        key: item.name,
                        href: item.href,
                        class: "block py-1 text-xs text-muted-foreground transition-colors hover:text-primary hover:underline"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(item.name)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(item.name), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                    if (category.items.length > 5) {
                      _push3(ssrRenderComponent(unref(Link), {
                        href: `/toko?category=${category.slug}`,
                        class: "block py-1 text-xs font-medium text-primary hover:underline"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(` Lihat Semua → `);
                          } else {
                            return [
                              createTextVNode(" Lihat Semua → ")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div></div>`);
                  });
                  _push3(`<!--]--></div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid grid-cols-4 gap-6" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(productCategories.value, (category) => {
                        return openBlock(), createBlock("div", {
                          key: category.name,
                          class: "space-y-3"
                        }, [
                          createVNode(unref(Link), {
                            href: `/toko?category=${category.slug}`,
                            class: "group"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "mb-3 flex items-center gap-2 text-sm font-semibold transition-colors hover:text-primary" }, [
                                (openBlock(), createBlock(resolveDynamicComponent(category.icon), { class: "h-4 w-4 text-primary" })),
                                createVNode("span", null, toDisplayString(category.name), 1)
                              ])
                            ]),
                            _: 2
                          }, 1032, ["href"]),
                          createVNode("div", { class: "space-y-1.5" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(category.items.slice(
                              0,
                              5
                            ), (item) => {
                              return openBlock(), createBlock(unref(Link), {
                                key: item.name,
                                href: item.href,
                                class: "block py-1 text-xs text-muted-foreground transition-colors hover:text-primary hover:underline"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.name), 1)
                                ]),
                                _: 2
                              }, 1032, ["href"]);
                            }), 128)),
                            category.items.length > 5 ? (openBlock(), createBlock(unref(Link), {
                              key: 0,
                              href: `/toko?category=${category.slug}`,
                              class: "block py-1 text-xs font-medium text-primary hover:underline"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Lihat Semua → ")
                              ]),
                              _: 1
                            }, 8, ["href"])) : createCommentVNode("", true)
                          ])
                        ]);
                      }), 128))
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$n), { "as-child": "" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$l), {
                    variant: "ghost",
                    class: "h-auto px-3 py-2 text-sm font-medium"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Semua Kategori "),
                      (openBlock(), createBlock("svg", {
                        class: "ml-1 h-4 w-4",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M19 9l-7 7-7-7"
                        })
                      ]))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$p), {
                align: "start",
                class: "w-[800px] p-6"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid grid-cols-4 gap-6" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(productCategories.value, (category) => {
                      return openBlock(), createBlock("div", {
                        key: category.name,
                        class: "space-y-3"
                      }, [
                        createVNode(unref(Link), {
                          href: `/toko?category=${category.slug}`,
                          class: "group"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "mb-3 flex items-center gap-2 text-sm font-semibold transition-colors hover:text-primary" }, [
                              (openBlock(), createBlock(resolveDynamicComponent(category.icon), { class: "h-4 w-4 text-primary" })),
                              createVNode("span", null, toDisplayString(category.name), 1)
                            ])
                          ]),
                          _: 2
                        }, 1032, ["href"]),
                        createVNode("div", { class: "space-y-1.5" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(category.items.slice(
                            0,
                            5
                          ), (item) => {
                            return openBlock(), createBlock(unref(Link), {
                              key: item.name,
                              href: item.href,
                              class: "block py-1 text-xs text-muted-foreground transition-colors hover:text-primary hover:underline"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item.name), 1)
                              ]),
                              _: 2
                            }, 1032, ["href"]);
                          }), 128)),
                          category.items.length > 5 ? (openBlock(), createBlock(unref(Link), {
                            key: 0,
                            href: `/toko?category=${category.slug}`,
                            class: "block py-1 text-xs font-medium text-primary hover:underline"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Lihat Semua → ")
                            ]),
                            _: 1
                          }, 8, ["href"])) : createCommentVNode("", true)
                        ])
                      ]);
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
      _push(`<!--[-->`);
      ssrRenderList(productCategories.value.slice(0, 5), (category) => {
        _push(ssrRenderComponent(unref(Link), {
          key: category.name,
          href: `/toko?category=${category.slug}`,
          class: "flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-primary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(category.icon), { class: "h-4 w-4" }, null), _parent2, _scopeId);
              _push2(` ${ssrInterpolate(category.name)}`);
            } else {
              return [
                (openBlock(), createBlock(resolveDynamicComponent(category.icon), { class: "h-4 w-4" })),
                createTextVNode(" " + toDisplayString(category.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--><div class="flex-1"></div>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/artikel",
        class: "flex items-center gap-2 text-sm font-semibold text-primary hover:underline dark:text-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"${_scopeId}></path></svg> Artikel &amp; Blog `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "h-4 w-4",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                })
              ])),
              createTextVNode(" Artikel & Blog ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
      if (searchOpen.value) {
        _push(`<div class="border-t bg-white shadow-lg dark:border-gray-800 dark:bg-gray-950"><div class="container mx-auto px-6 py-6"><div class="mx-auto w-full"><div class="relative">`);
        _push(ssrRenderComponent(unref(Search), { class: "absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-muted-foreground" }, null, _parent));
        _push(ssrRenderComponent(unref(_sfc_main$e), {
          modelValue: searchQuery.value,
          "onUpdate:modelValue": ($event) => searchQuery.value = $event,
          placeholder: "Cari produk, model, atau kata kunci...",
          class: "h-12 w-full pr-12 pl-12 text-base",
          onKeydown: [($event) => searchOpen.value = false, handleSearch],
          autofocus: ""
        }, null, _parent));
        _push(ssrRenderComponent(unref(_sfc_main$l), {
          variant: "ghost",
          size: "icon",
          onClick: ($event) => searchOpen.value = false,
          class: "absolute top-1/2 right-2 -translate-y-1/2 rounded-full"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` ✕ `);
            } else {
              return [
                createTextVNode(" ✕ ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="mt-4">`);
        _push(ssrRenderComponent(unref(_sfc_main$c), { class: "my-4" }, null, _parent));
        _push(`<p class="mb-3 text-sm font-medium">${ssrInterpolate(searchQuery.value.trim() ? "Saran Pencarian:" : "Pencarian Populer:")}</p><div class="flex flex-wrap gap-2"><!--[-->`);
        ssrRenderList(searchSuggestions.value, (suggestion) => {
          _push(ssrRenderComponent(unref(Link), {
            key: suggestion.query,
            href: `/toko?search=${encodeURIComponent(suggestion.query)}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(_sfc_main$o), {
                  variant: "secondary",
                  class: "cursor-pointer hover:bg-accent"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(suggestion.label)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(suggestion.label), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(_sfc_main$o), {
                    variant: "secondary",
                    class: "cursor-pointer hover:bg-accent"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(suggestion.label), 1)
                    ]),
                    _: 2
                  }, 1024)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</header><main>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main><footer class="border-t bg-gradient-to-b from-background to-muted/20"><div class="container mx-auto px-6"><div class="border-b py-12"><div class="mx-auto max-w-3xl text-center"><div class="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10"><svg class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></div><h3 class="mb-3 text-2xl font-bold md:text-3xl"> Dapatkan Penawaran Eksklusif </h3><p class="mb-6 text-sm text-muted-foreground md:text-base"> Berlangganan newsletter kami dan dapatkan diskon hingga 20% untuk pembelian pertama Anda </p><div class="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"><div class="relative flex-1">`);
      _push(ssrRenderComponent(unref(_sfc_main$e), {
        modelValue: newsletterEmail.value,
        "onUpdate:modelValue": ($event) => newsletterEmail.value = $event,
        type: "email",
        placeholder: "Masukkan email Anda",
        class: "h-12 pr-4",
        disabled: newsletterSubmitting.value,
        onKeydown: subscribeNewsletter
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(unref(_sfc_main$l), {
        onClick: subscribeNewsletter,
        class: "h-12 px-8 font-semibold",
        disabled: newsletterSubmitting.value || !newsletterEmail.value
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!newsletterSubmitting.value && !newsletterSuccess.value) {
              _push2(`<span${_scopeId}>Berlangganan</span>`);
            } else if (newsletterSubmitting.value) {
              _push2(`<span class="flex items-center gap-2"${_scopeId}><svg class="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"${_scopeId}></path></svg> Memproses... </span>`);
            } else {
              _push2(`<span class="flex items-center gap-2"${_scopeId}><svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"${_scopeId}></path></svg> Berhasil! </span>`);
            }
          } else {
            return [
              !newsletterSubmitting.value && !newsletterSuccess.value ? (openBlock(), createBlock("span", { key: 0 }, "Berlangganan")) : newsletterSubmitting.value ? (openBlock(), createBlock("span", {
                key: 1,
                class: "flex items-center gap-2"
              }, [
                (openBlock(), createBlock("svg", {
                  class: "h-4 w-4 animate-spin",
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("circle", {
                    class: "opacity-25",
                    cx: "12",
                    cy: "12",
                    r: "10",
                    stroke: "currentColor",
                    "stroke-width": "4"
                  }),
                  createVNode("path", {
                    class: "opacity-75",
                    fill: "currentColor",
                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  })
                ])),
                createTextVNode(" Memproses... ")
              ])) : (openBlock(), createBlock("span", {
                key: 2,
                class: "flex items-center gap-2"
              }, [
                (openBlock(), createBlock("svg", {
                  class: "h-4 w-4",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M5 13l4 4L19 7"
                  })
                ])),
                createTextVNode(" Berhasil! ")
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><p class="mt-4 text-xs text-muted-foreground"> Dengan berlangganan, Anda menyetujui `);
      _push(ssrRenderComponent(unref(Link), {
        href: "/page/privacy",
        class: "underline hover:text-foreground"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Kebijakan Privasi`);
          } else {
            return [
              createTextVNode("Kebijakan Privasi")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` kami </p></div></div><div class="py-12"><div class="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12"><div class="lg:col-span-4">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "mb-4 flex items-center gap-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (siteLogo.value) {
              _push2(`<img${ssrRenderAttr("src", siteLogo.value)}${ssrRenderAttr("alt", siteName.value)} class="h-15 w-15 object-contain"${_scopeId}>`);
            } else {
              _push2(ssrRenderComponent(unref(Package), { class: "h-8 w-8 text-primary" }, null, _parent2, _scopeId));
            }
            _push2(`<span class="text-2xl font-bold"${_scopeId}>${ssrInterpolate(siteName.value)}</span>`);
          } else {
            return [
              siteLogo.value ? (openBlock(), createBlock("img", {
                key: 0,
                src: siteLogo.value,
                alt: siteName.value,
                class: "h-15 w-15 object-contain"
              }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(unref(Package), {
                key: 1,
                class: "h-8 w-8 text-primary"
              })),
              createVNode("span", { class: "text-2xl font-bold" }, toDisplayString(siteName.value), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="mb-6 text-sm leading-relaxed text-muted-foreground">${ssrInterpolate(siteDescription.value)}</p><div class="flex items-center gap-3"><span class="text-sm font-semibold">Ikuti Kami:</span><div class="flex gap-2"><!--[-->`);
      ssrRenderList(socialLinks.value, (social) => {
        _push(ssrRenderComponent(unref(_sfc_main$l), {
          key: social.icon,
          variant: "outline",
          size: "icon",
          "as-child": "",
          class: "rounded-full transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<a${ssrRenderAttr("href", social.href)}${ssrRenderAttr("aria-label", social.name)} target="_blank" rel="noopener noreferrer"${_scopeId}><svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"${_scopeId}><path${ssrRenderAttr(
                "d",
                socialIconPaths[social.icon]
              )}${_scopeId}></path></svg></a>`);
            } else {
              return [
                createVNode("a", {
                  href: social.href,
                  "aria-label": social.name,
                  target: "_blank",
                  rel: "noopener noreferrer"
                }, [
                  (openBlock(), createBlock("svg", {
                    class: "h-4 w-4",
                    fill: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      d: socialIconPaths[social.icon]
                    }, null, 8, ["d"])
                  ]))
                ], 8, ["href", "aria-label"])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div></div><div class="lg:col-span-8"><div class="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4"><!--[-->`);
      ssrRenderList(footerMenus.value.slice(0, 4), (menu) => {
        _push(`<div><h4 class="mb-4 text-sm font-bold text-foreground">${ssrInterpolate(menu.title)}</h4><ul class="space-y-3 text-sm"><!--[-->`);
        ssrRenderList(menu.links, (link) => {
          _push(`<li>`);
          _push(ssrRenderComponent(unref(Link), {
            href: link.href,
            class: "group inline-flex items-center text-muted-foreground transition-colors hover:text-primary"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span${_scopeId}>${ssrInterpolate(link.name)}</span><svg class="ml-1 h-3 w-3 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"${_scopeId}></path></svg>`);
              } else {
                return [
                  createVNode("span", null, toDisplayString(link.name), 1),
                  (openBlock(), createBlock("svg", {
                    class: "ml-1 h-3 w-3 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M9 5l7 7-7 7"
                    })
                  ]))
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li>`);
        });
        _push(`<!--]--></ul></div>`);
      });
      _push(`<!--]--></div></div></div></div><div class="border-t py-6"><div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div class="flex w-full flex-col gap-3 text-xs text-muted-foreground sm:text-sm"><p class="text-center md:text-left"> © ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} Puranusa. All rights reserved. </p><div class="flex flex-wrap justify-center gap-x-4 gap-y-2 md:justify-start">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/page/privacy",
        class: "transition-colors hover:text-foreground"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Privasi `);
          } else {
            return [
              createTextVNode(" Privasi ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span class="hidden text-muted-foreground/50 sm:inline">•</span>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/page/terms",
        class: "transition-colors hover:text-foreground"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Syarat &amp; Ketentuan `);
          } else {
            return [
              createTextVNode(" Syarat & Ketentuan ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span class="hidden text-muted-foreground/50 sm:inline">•</span>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/page/about",
        class: "transition-colors hover:text-foreground"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Tentang Kami `);
          } else {
            return [
              createTextVNode(" Tentang Kami ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="flex w-full flex-col items-center gap-2 md:w-auto md:items-end"><span class="text-center text-xs text-muted-foreground md:text-right"> Metode Pembayaran: </span><div class="flex flex-wrap justify-center gap-2 md:justify-end"><!--[-->`);
      ssrRenderList(paymentMethods.value, (method) => {
        _push(`<div class="rounded border bg-background px-3 py-1.5 text-xs font-medium whitespace-nowrap">${ssrInterpolate(method)}</div>`);
      });
      _push(`<!--]--></div></div></div></div></div></footer>`);
      if (checkoutItems.value.length > 0) {
        _push(ssrRenderComponent(_sfc_main$1, {
          open: checkoutSheetOpen.value,
          "onUpdate:open": ($event) => checkoutSheetOpen.value = $event,
          item: checkoutItems.value.length === 1 ? checkoutItems.value[0] : void 0,
          items: checkoutItems.value.length > 1 ? checkoutItems.value : void 0
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/layouts/store/Ecommerce.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _,
  _sfc_main$1 as a
};
