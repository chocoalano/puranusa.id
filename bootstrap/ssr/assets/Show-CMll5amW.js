import { defineComponent, onMounted, ref, unref, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$3 } from "./index-BpQimeTM.js";
import { _ as _sfc_main$2 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$4, a as _sfc_main$5, b as _sfc_main$6, c as _sfc_main$7, d as _sfc_main$f } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$g, a as _sfc_main$h, b as _sfc_main$i, c as _sfc_main$j, d as _sfc_main$k, e as _sfc_main$n } from "./DialogTrigger-DpE8BjOt.js";
import { _ as _sfc_main$m } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$l } from "./Label-16aMY2sx.js";
import { e as _sfc_main$e } from "./DropdownMenuTrigger-B1v6pHML.js";
import { _ as _sfc_main$8, a as _sfc_main$9, b as _sfc_main$a, c as _sfc_main$b, d as _sfc_main$c, e as _sfc_main$d } from "./TableHeader-emcE6QAC.js";
import { _ as _sfc_main$1 } from "./AppLayout-DTAmF_5Z.js";
import { usePage, Head, Link, useForm } from "@inertiajs/vue3";
import { ArrowLeft, Truck, User, Package, MapPin, CreditCard, Gift } from "lucide-vue-next";
import { toast } from "vue-sonner";
import "class-variance-authority";
import "@vueuse/core";
import "reka-ui";
import "clsx";
import "tailwind-merge";
import "./index-3UqiGNe9.js";
import "./AvatarImage-DWFQMckn.js";
import "./index-Bfu0FVt6.js";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    order: {}
  },
  setup(__props) {
    const props = __props;
    const page = usePage();
    onMounted(() => {
      const flash = page.props.flash;
      if (flash?.success) {
        toast.success(flash.success);
      }
      if (flash?.error) {
        toast.error(flash.error);
      }
    });
    const showShipmentDialog = ref(false);
    const showCancelDialog = ref(false);
    const showShipDialog = ref(false);
    const showDeliverDialog = ref(false);
    const selectedShipmentId = ref(null);
    const shipmentForm = ref({
      tracking_no: "",
      courier_id: null,
      shipping_fee: props.order.shipping_amount,
      items: props.order.items.map((item) => ({
        order_item_id: item.id,
        qty: item.qty
      }))
    });
    const isProcessing = ref(false);
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(amount);
    };
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const getStatusVariant = (status) => {
      const statusMap = {
        PENDING: "secondary",
        PAID: "default",
        PROCESSING: "default",
        SHIPPED: "default",
        COMPLETED: "default",
        CANCELLED: "destructive",
        CANCELED: "destructive"
      };
      return statusMap[status.toUpperCase()] || "outline";
    };
    const getShipmentStatusVariant = (status) => {
      const statusMap = {
        READY_TO_SHIP: "secondary",
        IN_TRANSIT: "default",
        DELIVERED: "default",
        FAILED: "destructive",
        RETURNED: "outline"
      };
      return statusMap[status.toUpperCase()] || "outline";
    };
    const openCancelDialog = () => {
      showCancelDialog.value = true;
    };
    const cancelOrder = () => {
      showCancelDialog.value = false;
      const cancelForm = useForm({});
      cancelForm.post(
        `/admin/orders/${props.order.id}/cancel`,
        {
          preserveScroll: true,
          onSuccess: () => {
            toast.success("Order berhasil dibatalkan");
          },
          onError: () => {
            toast.error("Gagal membatalkan order");
          }
        }
      );
    };
    const setupShipment = () => {
      if (!shipmentForm.value.tracking_no) {
        toast.error("Nomor resi harus diisi");
        return;
      }
      isProcessing.value = true;
      const setupForm = useForm(shipmentForm.value);
      setupForm.post(
        `/admin/orders/${props.order.id}/setup-shipment`,
        {
          preserveScroll: true,
          onSuccess: (page2) => {
            showShipmentDialog.value = false;
            shipmentForm.value.tracking_no = "";
            const flash = page2.props.flash;
            if (flash?.success) {
              toast.success(flash.success);
            } else if (flash?.error) {
              toast.error(flash.error);
            }
          },
          onError: () => {
            toast.error("Gagal setup pengiriman");
          },
          onFinish: () => {
            isProcessing.value = false;
          }
        }
      );
    };
    const openShipDialog = (shipmentId) => {
      selectedShipmentId.value = shipmentId;
      showShipDialog.value = true;
    };
    const shipOrder = () => {
      if (!selectedShipmentId.value) return;
      showShipDialog.value = false;
      const shipForm = useForm({ shipment_id: selectedShipmentId.value });
      shipForm.post(
        `/admin/orders/${props.order.id}/ship`,
        {
          preserveScroll: true,
          onSuccess: (page2) => {
            const flash = page2.props.flash;
            if (flash?.success) {
              toast.success(flash.success);
            } else if (flash?.error) {
              toast.error(flash.error);
            }
          },
          onError: () => {
            toast.error("Gagal menandai order sebagai dikirim");
          }
        }
      );
    };
    const openDeliverDialog = (shipmentId) => {
      selectedShipmentId.value = shipmentId;
      showDeliverDialog.value = true;
    };
    const deliverOrder = () => {
      if (!selectedShipmentId.value) return;
      showDeliverDialog.value = false;
      const deliverForm = useForm({ shipment_id: selectedShipmentId.value });
      deliverForm.post(
        `/admin/orders/${props.order.id}/deliver`,
        {
          preserveScroll: true,
          onSuccess: (page2) => {
            const flash = page2.props.flash;
            if (flash?.success) {
              toast.success(flash.success);
            } else if (flash?.error) {
              toast.error(flash.error);
            }
          },
          onError: () => {
            toast.error("Gagal menandai order sebagai diterima");
          }
        }
      );
    };
    const shippingInfo = props.order.applied_promos?.shipping || {};
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: `Order ${__props.order.order_no}`
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-6 rounded-xl p-4 py-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div class="flex items-center gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), { href: "/admin/orders" }, {
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
            _push2(`<div${_scopeId}><h1 class="text-3xl font-bold"${_scopeId}>Detail Order</h1><p class="text-muted-foreground"${_scopeId}>${ssrInterpolate(__props.order.order_no)}</p></div></div><div class="flex gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$3), {
              variant: getStatusVariant(__props.order.status),
              class: "text-sm"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(__props.order.status)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(__props.order.status), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (["PAID", "PROCESSING"].includes(__props.order.status.toUpperCase())) {
              _push2(ssrRenderComponent(unref(_sfc_main$2), {
                variant: "default",
                size: "sm",
                onClick: ($event) => showShipmentDialog.value = true
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Truck), { class: "mr-2 h-4 w-4" }, null, _parent3, _scopeId2));
                    _push3(` Setup Pengiriman `);
                  } else {
                    return [
                      createVNode(unref(Truck), { class: "mr-2 h-4 w-4" }),
                      createTextVNode(" Setup Pengiriman ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (["PENDING", "PAID"].includes(__props.order.status.toUpperCase())) {
              _push2(ssrRenderComponent(unref(_sfc_main$2), {
                variant: "destructive",
                size: "sm",
                onClick: openCancelDialog
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Batalkan Order `);
                  } else {
                    return [
                      createTextVNode(" Batalkan Order ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="grid gap-6 md:grid-cols-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex items-center gap-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(User), { class: "h-5 w-5" }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Informasi Customer`);
                            } else {
                              return [
                                createTextVNode("Informasi Customer")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode(unref(User), { class: "h-5 w-5" }),
                            createVNode(unref(_sfc_main$6), null, {
                              default: withCtx(() => [
                                createTextVNode("Informasi Customer")
                              ]),
                              _: 1
                            })
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { class: "space-y-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div${_scopeId3}><p class="text-sm text-muted-foreground"${_scopeId3}>Nama</p><p class="font-medium"${_scopeId3}>${ssrInterpolate(__props.order.customer.name)}</p></div><div${_scopeId3}><p class="text-sm text-muted-foreground"${_scopeId3}>Email</p><p class="font-medium"${_scopeId3}>${ssrInterpolate(__props.order.customer.email)}</p></div>`);
                        if (__props.order.customer.phone) {
                          _push4(`<div${_scopeId3}><p class="text-sm text-muted-foreground"${_scopeId3}>Telepon</p><p class="font-medium"${_scopeId3}>${ssrInterpolate(__props.order.customer.phone)}</p></div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm text-muted-foreground" }, "Nama"),
                            createVNode("p", { class: "font-medium" }, toDisplayString(__props.order.customer.name), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm text-muted-foreground" }, "Email"),
                            createVNode("p", { class: "font-medium" }, toDisplayString(__props.order.customer.email), 1)
                          ]),
                          __props.order.customer.phone ? (openBlock(), createBlock("div", { key: 0 }, [
                            createVNode("p", { class: "text-sm text-muted-foreground" }, "Telepon"),
                            createVNode("p", { class: "font-medium" }, toDisplayString(__props.order.customer.phone), 1)
                          ])) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode(unref(User), { class: "h-5 w-5" }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("Informasi Customer")
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), { class: "space-y-2" }, {
                      default: withCtx(() => [
                        createVNode("div", null, [
                          createVNode("p", { class: "text-sm text-muted-foreground" }, "Nama"),
                          createVNode("p", { class: "font-medium" }, toDisplayString(__props.order.customer.name), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("p", { class: "text-sm text-muted-foreground" }, "Email"),
                          createVNode("p", { class: "font-medium" }, toDisplayString(__props.order.customer.email), 1)
                        ]),
                        __props.order.customer.phone ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode("p", { class: "text-sm text-muted-foreground" }, "Telepon"),
                          createVNode("p", { class: "font-medium" }, toDisplayString(__props.order.customer.phone), 1)
                        ])) : createCommentVNode("", true)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex items-center gap-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Package), { class: "h-5 w-5" }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Informasi Order`);
                            } else {
                              return [
                                createTextVNode("Informasi Order")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode(unref(Package), { class: "h-5 w-5" }),
                            createVNode(unref(_sfc_main$6), null, {
                              default: withCtx(() => [
                                createTextVNode("Informasi Order")
                              ]),
                              _: 1
                            })
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { class: "space-y-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div${_scopeId3}><p class="text-sm text-muted-foreground"${_scopeId3}>Tanggal Order</p><p class="font-medium"${_scopeId3}>${ssrInterpolate(formatDate(__props.order.created_at))}</p></div>`);
                        if (__props.order.paid_at) {
                          _push4(`<div${_scopeId3}><p class="text-sm text-muted-foreground"${_scopeId3}>Tanggal Bayar</p><p class="font-medium"${_scopeId3}>${ssrInterpolate(formatDate(__props.order.paid_at))}</p></div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`<div${_scopeId3}><p class="text-sm text-muted-foreground"${_scopeId3}>Status</p>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$3), {
                          variant: getStatusVariant(__props.order.status)
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(__props.order.status)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(__props.order.status), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm text-muted-foreground" }, "Tanggal Order"),
                            createVNode("p", { class: "font-medium" }, toDisplayString(formatDate(__props.order.created_at)), 1)
                          ]),
                          __props.order.paid_at ? (openBlock(), createBlock("div", { key: 0 }, [
                            createVNode("p", { class: "text-sm text-muted-foreground" }, "Tanggal Bayar"),
                            createVNode("p", { class: "font-medium" }, toDisplayString(formatDate(__props.order.paid_at)), 1)
                          ])) : createCommentVNode("", true),
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm text-muted-foreground" }, "Status"),
                            createVNode(unref(_sfc_main$3), {
                              variant: getStatusVariant(__props.order.status)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(__props.order.status), 1)
                              ]),
                              _: 1
                            }, 8, ["variant"])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode(unref(Package), { class: "h-5 w-5" }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("Informasi Order")
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), { class: "space-y-2" }, {
                      default: withCtx(() => [
                        createVNode("div", null, [
                          createVNode("p", { class: "text-sm text-muted-foreground" }, "Tanggal Order"),
                          createVNode("p", { class: "font-medium" }, toDisplayString(formatDate(__props.order.created_at)), 1)
                        ]),
                        __props.order.paid_at ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode("p", { class: "text-sm text-muted-foreground" }, "Tanggal Bayar"),
                          createVNode("p", { class: "font-medium" }, toDisplayString(formatDate(__props.order.paid_at)), 1)
                        ])) : createCommentVNode("", true),
                        createVNode("div", null, [
                          createVNode("p", { class: "text-sm text-muted-foreground" }, "Status"),
                          createVNode(unref(_sfc_main$3), {
                            variant: getStatusVariant(__props.order.status)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(__props.order.status), 1)
                            ]),
                            _: 1
                          }, 8, ["variant"])
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (__props.order.shippingAddress) {
              _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="flex items-center gap-2"${_scopeId3}>`);
                          _push4(ssrRenderComponent(unref(MapPin), { class: "h-5 w-5" }, null, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Alamat Pengiriman`);
                              } else {
                                return [
                                  createTextVNode("Alamat Pengiriman")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          return [
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              createVNode(unref(MapPin), { class: "h-5 w-5" }),
                              createVNode(unref(_sfc_main$6), null, {
                                default: withCtx(() => [
                                  createTextVNode("Alamat Pengiriman")
                                ]),
                                _: 1
                              })
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$7), { class: "space-y-2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div${_scopeId3}><p class="font-medium"${_scopeId3}>${ssrInterpolate(__props.order.shippingAddress.recipient_name)}</p><p class="text-sm text-muted-foreground"${_scopeId3}>${ssrInterpolate(__props.order.shippingAddress.recipient_phone)}</p></div><div${_scopeId3}><p class="text-sm"${_scopeId3}>${ssrInterpolate(__props.order.shippingAddress.address_line1)}</p>`);
                          if (__props.order.shippingAddress.address_line2) {
                            _push4(`<p class="text-sm"${_scopeId3}>${ssrInterpolate(__props.order.shippingAddress.address_line2)}</p>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`<p class="text-sm"${_scopeId3}>${ssrInterpolate(__props.order.shippingAddress.city_label)}, ${ssrInterpolate(__props.order.shippingAddress.province_label)} ${ssrInterpolate(__props.order.shippingAddress.postal_code)}</p><p class="text-sm"${_scopeId3}>${ssrInterpolate(__props.order.shippingAddress.country)}</p></div>`);
                          if (unref(shippingInfo).courier) {
                            _push4(`<div class="pt-2"${_scopeId3}><div class="flex items-center gap-2"${_scopeId3}>`);
                            _push4(ssrRenderComponent(unref(Truck), { class: "h-4 w-4 text-muted-foreground" }, null, _parent4, _scopeId3));
                            _push4(`<div${_scopeId3}><p class="text-sm font-medium"${_scopeId3}>${ssrInterpolate(unref(shippingInfo).courier)} - ${ssrInterpolate(unref(shippingInfo).service)}</p><p class="text-xs text-muted-foreground"${_scopeId3}> Estimasi: ${ssrInterpolate(unref(shippingInfo).etd)}</p></div></div></div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                        } else {
                          return [
                            createVNode("div", null, [
                              createVNode("p", { class: "font-medium" }, toDisplayString(__props.order.shippingAddress.recipient_name), 1),
                              createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(__props.order.shippingAddress.recipient_phone), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("p", { class: "text-sm" }, toDisplayString(__props.order.shippingAddress.address_line1), 1),
                              __props.order.shippingAddress.address_line2 ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm"
                              }, toDisplayString(__props.order.shippingAddress.address_line2), 1)) : createCommentVNode("", true),
                              createVNode("p", { class: "text-sm" }, toDisplayString(__props.order.shippingAddress.city_label) + ", " + toDisplayString(__props.order.shippingAddress.province_label) + " " + toDisplayString(__props.order.shippingAddress.postal_code), 1),
                              createVNode("p", { class: "text-sm" }, toDisplayString(__props.order.shippingAddress.country), 1)
                            ]),
                            unref(shippingInfo).courier ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "pt-2"
                            }, [
                              createVNode("div", { class: "flex items-center gap-2" }, [
                                createVNode(unref(Truck), { class: "h-4 w-4 text-muted-foreground" }),
                                createVNode("div", null, [
                                  createVNode("p", { class: "text-sm font-medium" }, toDisplayString(unref(shippingInfo).courier) + " - " + toDisplayString(unref(shippingInfo).service), 1),
                                  createVNode("p", { class: "text-xs text-muted-foreground" }, " Estimasi: " + toDisplayString(unref(shippingInfo).etd), 1)
                                ])
                              ])
                            ])) : createCommentVNode("", true)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode(unref(MapPin), { class: "h-5 w-5" }),
                            createVNode(unref(_sfc_main$6), null, {
                              default: withCtx(() => [
                                createTextVNode("Alamat Pengiriman")
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), { class: "space-y-2" }, {
                        default: withCtx(() => [
                          createVNode("div", null, [
                            createVNode("p", { class: "font-medium" }, toDisplayString(__props.order.shippingAddress.recipient_name), 1),
                            createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(__props.order.shippingAddress.recipient_phone), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm" }, toDisplayString(__props.order.shippingAddress.address_line1), 1),
                            __props.order.shippingAddress.address_line2 ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm"
                            }, toDisplayString(__props.order.shippingAddress.address_line2), 1)) : createCommentVNode("", true),
                            createVNode("p", { class: "text-sm" }, toDisplayString(__props.order.shippingAddress.city_label) + ", " + toDisplayString(__props.order.shippingAddress.province_label) + " " + toDisplayString(__props.order.shippingAddress.postal_code), 1),
                            createVNode("p", { class: "text-sm" }, toDisplayString(__props.order.shippingAddress.country), 1)
                          ]),
                          unref(shippingInfo).courier ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "pt-2"
                          }, [
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              createVNode(unref(Truck), { class: "h-4 w-4 text-muted-foreground" }),
                              createVNode("div", null, [
                                createVNode("p", { class: "text-sm font-medium" }, toDisplayString(unref(shippingInfo).courier) + " - " + toDisplayString(unref(shippingInfo).service), 1),
                                createVNode("p", { class: "text-xs text-muted-foreground" }, " Estimasi: " + toDisplayString(unref(shippingInfo).etd), 1)
                              ])
                            ])
                          ])) : createCommentVNode("", true)
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Produk yang Dipesan`);
                            } else {
                              return [
                                createTextVNode("Produk yang Dipesan")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("Produk yang Dipesan")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$8), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$9), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$a), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(unref(_sfc_main$b), null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Produk`);
                                              } else {
                                                return [
                                                  createTextVNode("Produk")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(unref(_sfc_main$b), null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`SKU`);
                                              } else {
                                                return [
                                                  createTextVNode("SKU")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(unref(_sfc_main$b), { class: "text-right" }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Harga`);
                                              } else {
                                                return [
                                                  createTextVNode("Harga")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(unref(_sfc_main$b), { class: "text-right" }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Qty`);
                                              } else {
                                                return [
                                                  createTextVNode("Qty")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(unref(_sfc_main$b), { class: "text-right" }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Total`);
                                              } else {
                                                return [
                                                  createTextVNode("Total")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(unref(_sfc_main$b), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Produk")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$b), null, {
                                              default: withCtx(() => [
                                                createTextVNode("SKU")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$b), { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Harga")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$b), { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Qty")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$b), { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Total")
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$a), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$b), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Produk")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$b), null, {
                                            default: withCtx(() => [
                                              createTextVNode("SKU")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$b), { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Harga")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$b), { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Qty")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$b), { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Total")
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
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<!--[-->`);
                                    ssrRenderList(__props.order.items, (item) => {
                                      _push6(ssrRenderComponent(unref(_sfc_main$a), {
                                        key: item.id
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(unref(_sfc_main$d), { class: "font-medium" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(item.name)}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(item.name), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$d), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(item.sku)}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(item.sku), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$d), { class: "text-right" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(formatCurrency(item.unit_price))}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(formatCurrency(item.unit_price)), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$d), { class: "text-right" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(item.qty)}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(item.qty), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$d), { class: "text-right" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(formatCurrency(item.row_total))}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(formatCurrency(item.row_total)), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(unref(_sfc_main$d), { class: "font-medium" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(item.name), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$d), null, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(item.sku), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$d), { class: "text-right" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(formatCurrency(item.unit_price)), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$d), { class: "text-right" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(item.qty), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$d), { class: "text-right" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(formatCurrency(item.row_total)), 1)
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    });
                                    _push6(`<!--]-->`);
                                  } else {
                                    return [
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.order.items, (item) => {
                                        return openBlock(), createBlock(unref(_sfc_main$a), {
                                          key: item.id
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$d), { class: "font-medium" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(item.name), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$d), null, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(item.sku), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$d), { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(formatCurrency(item.unit_price)), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$d), { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(item.qty), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$d), { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(formatCurrency(item.row_total)), 1)
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 2
                                        }, 1024);
                                      }), 128))
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$9), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$a), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$b), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Produk")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$b), null, {
                                          default: withCtx(() => [
                                            createTextVNode("SKU")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$b), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Harga")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$b), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Qty")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$b), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Total")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.order.items, (item) => {
                                      return openBlock(), createBlock(unref(_sfc_main$a), {
                                        key: item.id
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$d), { class: "font-medium" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(item.name), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$d), null, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(item.sku), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$d), { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(formatCurrency(item.unit_price)), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$d), { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(item.qty), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$d), { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(formatCurrency(item.row_total)), 1)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1024);
                                    }), 128))
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
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$9), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$a), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$b), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Produk")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$b), null, {
                                        default: withCtx(() => [
                                          createTextVNode("SKU")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$b), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Harga")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$b), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Qty")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$b), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Total")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.order.items, (item) => {
                                    return openBlock(), createBlock(unref(_sfc_main$a), {
                                      key: item.id
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$d), { class: "font-medium" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(item.name), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$d), null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(item.sku), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$d), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(formatCurrency(item.unit_price)), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$d), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(item.qty), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$d), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(formatCurrency(item.row_total)), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1024);
                                  }), 128))
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
                } else {
                  return [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode("Produk yang Dipesan")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$8), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$9), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$a), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$b), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Produk")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$b), null, {
                                      default: withCtx(() => [
                                        createTextVNode("SKU")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$b), { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Harga")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$b), { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Qty")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$b), { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Total")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), null, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.order.items, (item) => {
                                  return openBlock(), createBlock(unref(_sfc_main$a), {
                                    key: item.id
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$d), { class: "font-medium" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(item.name), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$d), null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(item.sku), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$d), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(formatCurrency(item.unit_price)), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$d), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(item.qty), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$d), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(formatCurrency(item.row_total)), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 128))
                              ]),
                              _: 1
                            })
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
            }, _parent2, _scopeId));
            if (__props.order.shipments && __props.order.shipments.length > 0) {
              _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="flex items-center gap-2"${_scopeId3}>`);
                          _push4(ssrRenderComponent(unref(Truck), { class: "h-5 w-5" }, null, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Informasi Pengiriman`);
                              } else {
                                return [
                                  createTextVNode("Informasi Pengiriman")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          return [
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              createVNode(unref(Truck), { class: "h-5 w-5" }),
                              createVNode(unref(_sfc_main$6), null, {
                                default: withCtx(() => [
                                  createTextVNode("Informasi Pengiriman")
                                ]),
                                _: 1
                              })
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$7), { class: "space-y-4" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<!--[-->`);
                          ssrRenderList(__props.order.shipments, (shipment) => {
                            _push4(`<div class="rounded-lg border p-4 space-y-3"${_scopeId3}><div class="flex items-center justify-between"${_scopeId3}><div${_scopeId3}><p class="font-medium"${_scopeId3}>Resi: ${ssrInterpolate(shipment.tracking_no)}</p><p class="text-sm text-muted-foreground"${_scopeId3}> Biaya: ${ssrInterpolate(formatCurrency(shipment.shipping_fee))}</p></div>`);
                            _push4(ssrRenderComponent(unref(_sfc_main$3), {
                              variant: getShipmentStatusVariant(shipment.status)
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(shipment.status)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(shipment.status), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(`</div>`);
                            if (shipment.shipped_at) {
                              _push4(`<div class="text-sm text-muted-foreground"${_scopeId3}> Dikirim: ${ssrInterpolate(formatDate(shipment.shipped_at))}</div>`);
                            } else {
                              _push4(`<!---->`);
                            }
                            if (shipment.delivered_at) {
                              _push4(`<div class="text-sm text-muted-foreground"${_scopeId3}> Diterima: ${ssrInterpolate(formatDate(shipment.delivered_at))}</div>`);
                            } else {
                              _push4(`<!---->`);
                            }
                            _push4(`<div class="flex gap-2"${_scopeId3}>`);
                            if (shipment.status === "READY_TO_SHIP") {
                              _push4(ssrRenderComponent(unref(_sfc_main$2), {
                                size: "sm",
                                onClick: ($event) => openShipDialog(shipment.id)
                              }, {
                                default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(` Tandai Sudah Dikirim `);
                                  } else {
                                    return [
                                      createTextVNode(" Tandai Sudah Dikirim ")
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                            } else {
                              _push4(`<!---->`);
                            }
                            if (shipment.status === "IN_TRANSIT") {
                              _push4(ssrRenderComponent(unref(_sfc_main$2), {
                                size: "sm",
                                variant: "default",
                                onClick: ($event) => openDeliverDialog(shipment.id)
                              }, {
                                default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(` Tandai Sudah Diterima `);
                                  } else {
                                    return [
                                      createTextVNode(" Tandai Sudah Diterima ")
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                            } else {
                              _push4(`<!---->`);
                            }
                            _push4(`</div></div>`);
                          });
                          _push4(`<!--]-->`);
                        } else {
                          return [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.order.shipments, (shipment) => {
                              return openBlock(), createBlock("div", {
                                key: shipment.id,
                                class: "rounded-lg border p-4 space-y-3"
                              }, [
                                createVNode("div", { class: "flex items-center justify-between" }, [
                                  createVNode("div", null, [
                                    createVNode("p", { class: "font-medium" }, "Resi: " + toDisplayString(shipment.tracking_no), 1),
                                    createVNode("p", { class: "text-sm text-muted-foreground" }, " Biaya: " + toDisplayString(formatCurrency(shipment.shipping_fee)), 1)
                                  ]),
                                  createVNode(unref(_sfc_main$3), {
                                    variant: getShipmentStatusVariant(shipment.status)
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(shipment.status), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["variant"])
                                ]),
                                shipment.shipped_at ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "text-sm text-muted-foreground"
                                }, " Dikirim: " + toDisplayString(formatDate(shipment.shipped_at)), 1)) : createCommentVNode("", true),
                                shipment.delivered_at ? (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "text-sm text-muted-foreground"
                                }, " Diterima: " + toDisplayString(formatDate(shipment.delivered_at)), 1)) : createCommentVNode("", true),
                                createVNode("div", { class: "flex gap-2" }, [
                                  shipment.status === "READY_TO_SHIP" ? (openBlock(), createBlock(unref(_sfc_main$2), {
                                    key: 0,
                                    size: "sm",
                                    onClick: ($event) => openShipDialog(shipment.id)
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Tandai Sudah Dikirim ")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])) : createCommentVNode("", true),
                                  shipment.status === "IN_TRANSIT" ? (openBlock(), createBlock(unref(_sfc_main$2), {
                                    key: 1,
                                    size: "sm",
                                    variant: "default",
                                    onClick: ($event) => openDeliverDialog(shipment.id)
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Tandai Sudah Diterima ")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])) : createCommentVNode("", true)
                                ])
                              ]);
                            }), 128))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode(unref(Truck), { class: "h-5 w-5" }),
                            createVNode(unref(_sfc_main$6), null, {
                              default: withCtx(() => [
                                createTextVNode("Informasi Pengiriman")
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.order.shipments, (shipment) => {
                            return openBlock(), createBlock("div", {
                              key: shipment.id,
                              class: "rounded-lg border p-4 space-y-3"
                            }, [
                              createVNode("div", { class: "flex items-center justify-between" }, [
                                createVNode("div", null, [
                                  createVNode("p", { class: "font-medium" }, "Resi: " + toDisplayString(shipment.tracking_no), 1),
                                  createVNode("p", { class: "text-sm text-muted-foreground" }, " Biaya: " + toDisplayString(formatCurrency(shipment.shipping_fee)), 1)
                                ]),
                                createVNode(unref(_sfc_main$3), {
                                  variant: getShipmentStatusVariant(shipment.status)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(shipment.status), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["variant"])
                              ]),
                              shipment.shipped_at ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "text-sm text-muted-foreground"
                              }, " Dikirim: " + toDisplayString(formatDate(shipment.shipped_at)), 1)) : createCommentVNode("", true),
                              shipment.delivered_at ? (openBlock(), createBlock("div", {
                                key: 1,
                                class: "text-sm text-muted-foreground"
                              }, " Diterima: " + toDisplayString(formatDate(shipment.delivered_at)), 1)) : createCommentVNode("", true),
                              createVNode("div", { class: "flex gap-2" }, [
                                shipment.status === "READY_TO_SHIP" ? (openBlock(), createBlock(unref(_sfc_main$2), {
                                  key: 0,
                                  size: "sm",
                                  onClick: ($event) => openShipDialog(shipment.id)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Tandai Sudah Dikirim ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])) : createCommentVNode("", true),
                                shipment.status === "IN_TRANSIT" ? (openBlock(), createBlock(unref(_sfc_main$2), {
                                  key: 1,
                                  size: "sm",
                                  variant: "default",
                                  onClick: ($event) => openDeliverDialog(shipment.id)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Tandai Sudah Diterima ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])) : createCommentVNode("", true)
                              ])
                            ]);
                          }), 128))
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="grid gap-6 md:grid-cols-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex items-center gap-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(CreditCard), { class: "h-5 w-5" }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Ringkasan Pembayaran`);
                            } else {
                              return [
                                createTextVNode("Ringkasan Pembayaran")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode(unref(CreditCard), { class: "h-5 w-5" }),
                            createVNode(unref(_sfc_main$6), null, {
                              default: withCtx(() => [
                                createTextVNode("Ringkasan Pembayaran")
                              ]),
                              _: 1
                            })
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { class: "space-y-3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex justify-between"${_scopeId3}><span class="text-muted-foreground"${_scopeId3}>Subtotal</span><span class="font-medium"${_scopeId3}>${ssrInterpolate(formatCurrency(__props.order.subtotal_amount))}</span></div>`);
                        if (__props.order.discount_amount > 0) {
                          _push4(`<div class="flex justify-between"${_scopeId3}><span class="text-muted-foreground"${_scopeId3}>Diskon</span><span class="font-medium text-green-600"${_scopeId3}> -${ssrInterpolate(formatCurrency(__props.order.discount_amount))}</span></div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`<div class="flex justify-between"${_scopeId3}><span class="text-muted-foreground"${_scopeId3}>Ongkir</span><span class="font-medium"${_scopeId3}>${ssrInterpolate(formatCurrency(__props.order.shipping_amount))}</span></div>`);
                        if (__props.order.tax_amount > 0) {
                          _push4(`<div class="flex justify-between"${_scopeId3}><span class="text-muted-foreground"${_scopeId3}>Pajak</span><span class="font-medium"${_scopeId3}>${ssrInterpolate(formatCurrency(__props.order.tax_amount))}</span></div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(ssrRenderComponent(unref(_sfc_main$e), null, null, _parent4, _scopeId3));
                        _push4(`<div class="flex justify-between text-lg"${_scopeId3}><span class="font-semibold"${_scopeId3}>Total</span><span class="font-bold"${_scopeId3}>${ssrInterpolate(formatCurrency(__props.order.grand_total))}</span></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-muted-foreground" }, "Subtotal"),
                            createVNode("span", { class: "font-medium" }, toDisplayString(formatCurrency(__props.order.subtotal_amount)), 1)
                          ]),
                          __props.order.discount_amount > 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex justify-between"
                          }, [
                            createVNode("span", { class: "text-muted-foreground" }, "Diskon"),
                            createVNode("span", { class: "font-medium text-green-600" }, " -" + toDisplayString(formatCurrency(__props.order.discount_amount)), 1)
                          ])) : createCommentVNode("", true),
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-muted-foreground" }, "Ongkir"),
                            createVNode("span", { class: "font-medium" }, toDisplayString(formatCurrency(__props.order.shipping_amount)), 1)
                          ]),
                          __props.order.tax_amount > 0 ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "flex justify-between"
                          }, [
                            createVNode("span", { class: "text-muted-foreground" }, "Pajak"),
                            createVNode("span", { class: "font-medium" }, toDisplayString(formatCurrency(__props.order.tax_amount)), 1)
                          ])) : createCommentVNode("", true),
                          createVNode(unref(_sfc_main$e)),
                          createVNode("div", { class: "flex justify-between text-lg" }, [
                            createVNode("span", { class: "font-semibold" }, "Total"),
                            createVNode("span", { class: "font-bold" }, toDisplayString(formatCurrency(__props.order.grand_total)), 1)
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode(unref(CreditCard), { class: "h-5 w-5" }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("Ringkasan Pembayaran")
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), { class: "space-y-3" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-muted-foreground" }, "Subtotal"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(formatCurrency(__props.order.subtotal_amount)), 1)
                        ]),
                        __props.order.discount_amount > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex justify-between"
                        }, [
                          createVNode("span", { class: "text-muted-foreground" }, "Diskon"),
                          createVNode("span", { class: "font-medium text-green-600" }, " -" + toDisplayString(formatCurrency(__props.order.discount_amount)), 1)
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-muted-foreground" }, "Ongkir"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(formatCurrency(__props.order.shipping_amount)), 1)
                        ]),
                        __props.order.tax_amount > 0 ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "flex justify-between"
                        }, [
                          createVNode("span", { class: "text-muted-foreground" }, "Pajak"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(formatCurrency(__props.order.tax_amount)), 1)
                        ])) : createCommentVNode("", true),
                        createVNode(unref(_sfc_main$e)),
                        createVNode("div", { class: "flex justify-between text-lg" }, [
                          createVNode("span", { class: "font-semibold" }, "Total"),
                          createVNode("span", { class: "font-bold" }, toDisplayString(formatCurrency(__props.order.grand_total)), 1)
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex items-center gap-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Gift), { class: "h-5 w-5" }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`MLM Bonuses`);
                            } else {
                              return [
                                createTextVNode("MLM Bonuses")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$f), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Bonus yang dihasilkan dari order ini`);
                            } else {
                              return [
                                createTextVNode("Bonus yang dihasilkan dari order ini")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode(unref(Gift), { class: "h-5 w-5" }),
                            createVNode(unref(_sfc_main$6), null, {
                              default: withCtx(() => [
                                createTextVNode("MLM Bonuses")
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode(unref(_sfc_main$f), null, {
                            default: withCtx(() => [
                              createTextVNode("Bonus yang dihasilkan dari order ini")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { class: "space-y-3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex justify-between"${_scopeId3}><span class="text-muted-foreground"${_scopeId3}>Business Value (BV)</span><span class="font-medium"${_scopeId3}>${ssrInterpolate(__props.order.bv_amount || 0)}</span></div><div class="flex justify-between"${_scopeId3}><span class="text-muted-foreground"${_scopeId3}>Bonus Sponsor</span><span class="font-medium"${_scopeId3}>${ssrInterpolate(formatCurrency(__props.order.sponsor_amount || 0))}</span></div><div class="flex justify-between"${_scopeId3}><span class="text-muted-foreground"${_scopeId3}>Bonus Matching</span><span class="font-medium"${_scopeId3}>${ssrInterpolate(formatCurrency(__props.order.match_amount || 0))}</span></div><div class="flex justify-between"${_scopeId3}><span class="text-muted-foreground"${_scopeId3}>Bonus Pairing</span><span class="font-medium"${_scopeId3}>${ssrInterpolate(formatCurrency(__props.order.pairing_amount || 0))}</span></div><div class="flex justify-between"${_scopeId3}><span class="text-muted-foreground"${_scopeId3}>Cashback</span><span class="font-medium"${_scopeId3}>${ssrInterpolate(formatCurrency(__props.order.cashback_amount || 0))}</span></div>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$e), null, null, _parent4, _scopeId3));
                        _push4(`<div class="flex justify-between text-lg"${_scopeId3}><span class="font-semibold"${_scopeId3}>Total Bonus</span><span class="font-bold text-green-600"${_scopeId3}>${ssrInterpolate(formatCurrency(__props.order.total_bonuses || 0))}</span></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-muted-foreground" }, "Business Value (BV)"),
                            createVNode("span", { class: "font-medium" }, toDisplayString(__props.order.bv_amount || 0), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-muted-foreground" }, "Bonus Sponsor"),
                            createVNode("span", { class: "font-medium" }, toDisplayString(formatCurrency(__props.order.sponsor_amount || 0)), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-muted-foreground" }, "Bonus Matching"),
                            createVNode("span", { class: "font-medium" }, toDisplayString(formatCurrency(__props.order.match_amount || 0)), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-muted-foreground" }, "Bonus Pairing"),
                            createVNode("span", { class: "font-medium" }, toDisplayString(formatCurrency(__props.order.pairing_amount || 0)), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-muted-foreground" }, "Cashback"),
                            createVNode("span", { class: "font-medium" }, toDisplayString(formatCurrency(__props.order.cashback_amount || 0)), 1)
                          ]),
                          createVNode(unref(_sfc_main$e)),
                          createVNode("div", { class: "flex justify-between text-lg" }, [
                            createVNode("span", { class: "font-semibold" }, "Total Bonus"),
                            createVNode("span", { class: "font-bold text-green-600" }, toDisplayString(formatCurrency(__props.order.total_bonuses || 0)), 1)
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode(unref(Gift), { class: "h-5 w-5" }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("MLM Bonuses")
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode(unref(_sfc_main$f), null, {
                          default: withCtx(() => [
                            createTextVNode("Bonus yang dihasilkan dari order ini")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), { class: "space-y-3" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-muted-foreground" }, "Business Value (BV)"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(__props.order.bv_amount || 0), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-muted-foreground" }, "Bonus Sponsor"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(formatCurrency(__props.order.sponsor_amount || 0)), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-muted-foreground" }, "Bonus Matching"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(formatCurrency(__props.order.match_amount || 0)), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-muted-foreground" }, "Bonus Pairing"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(formatCurrency(__props.order.pairing_amount || 0)), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-muted-foreground" }, "Cashback"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(formatCurrency(__props.order.cashback_amount || 0)), 1)
                        ]),
                        createVNode(unref(_sfc_main$e)),
                        createVNode("div", { class: "flex justify-between text-lg" }, [
                          createVNode("span", { class: "font-semibold" }, "Total Bonus"),
                          createVNode("span", { class: "font-bold text-green-600" }, toDisplayString(formatCurrency(__props.order.total_bonuses || 0)), 1)
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (__props.order.notes) {
              _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Catatan`);
                              } else {
                                return [
                                  createTextVNode("Catatan")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(_sfc_main$6), null, {
                              default: withCtx(() => [
                                createTextVNode("Catatan")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$7), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<p class="text-sm"${_scopeId3}>${ssrInterpolate(__props.order.notes)}</p>`);
                        } else {
                          return [
                            createVNode("p", { class: "text-sm" }, toDisplayString(__props.order.notes), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("Catatan")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), null, {
                        default: withCtx(() => [
                          createVNode("p", { class: "text-sm" }, toDisplayString(__props.order.notes), 1)
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$g), {
              open: showShipmentDialog.value,
              "onUpdate:open": ($event) => showShipmentDialog.value = $event
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$h), { class: "sm:max-w-[600px]" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$i), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$j), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Setup Pengiriman`);
                                  } else {
                                    return [
                                      createTextVNode("Setup Pengiriman")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$k), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Masukkan informasi pengiriman untuk order ${ssrInterpolate(__props.order.order_no)}`);
                                  } else {
                                    return [
                                      createTextVNode(" Masukkan informasi pengiriman untuk order " + toDisplayString(__props.order.order_no), 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$j), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Setup Pengiriman")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$k), null, {
                                  default: withCtx(() => [
                                    createTextVNode(" Masukkan informasi pengiriman untuk order " + toDisplayString(__props.order.order_no), 1)
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<div class="grid gap-4 py-4"${_scopeId3}><div class="grid gap-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$l), { for: "tracking_no" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Nomor Resi *`);
                            } else {
                              return [
                                createTextVNode("Nomor Resi *")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$m), {
                          id: "tracking_no",
                          modelValue: shipmentForm.value.tracking_no,
                          "onUpdate:modelValue": ($event) => shipmentForm.value.tracking_no = $event,
                          placeholder: "Contoh: JNE123456789",
                          required: ""
                        }, null, _parent4, _scopeId3));
                        _push4(`</div><div class="grid gap-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$l), { for: "shipping_fee" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Biaya Kirim`);
                            } else {
                              return [
                                createTextVNode("Biaya Kirim")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$m), {
                          id: "shipping_fee",
                          modelValue: shipmentForm.value.shipping_fee,
                          "onUpdate:modelValue": ($event) => shipmentForm.value.shipping_fee = $event,
                          modelModifiers: { number: true },
                          type: "number",
                          step: "0.01",
                          min: "0"
                        }, null, _parent4, _scopeId3));
                        _push4(`<p class="text-xs text-muted-foreground"${_scopeId3}> Default: ${ssrInterpolate(formatCurrency(__props.order.shipping_amount))}</p></div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$l), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Item yang Dikirim`);
                            } else {
                              return [
                                createTextVNode("Item yang Dikirim")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<div class="rounded-md border"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$9), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$a), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(unref(_sfc_main$b), null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Produk`);
                                              } else {
                                                return [
                                                  createTextVNode("Produk")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(unref(_sfc_main$b), { class: "text-right" }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Qty Order`);
                                              } else {
                                                return [
                                                  createTextVNode("Qty Order")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(unref(_sfc_main$b), { class: "text-right" }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Qty Kirim`);
                                              } else {
                                                return [
                                                  createTextVNode("Qty Kirim")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(unref(_sfc_main$b), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Produk")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$b), { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Qty Order")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$b), { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Qty Kirim")
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$a), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$b), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Produk")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$b), { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Qty Order")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$b), { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Qty Kirim")
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
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<!--[-->`);
                                    ssrRenderList(shipmentForm.value.items, (item, index) => {
                                      _push6(ssrRenderComponent(unref(_sfc_main$a), {
                                        key: item.order_item_id
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(unref(_sfc_main$d), { class: "font-medium" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(__props.order.items[index].name)}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(__props.order.items[index].name), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$d), { class: "text-right" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(__props.order.items[index].qty)}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(__props.order.items[index].qty), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$d), { class: "text-right" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(unref(_sfc_main$m), {
                                                    modelValue: item.qty,
                                                    "onUpdate:modelValue": ($event) => item.qty = $event,
                                                    modelModifiers: { number: true },
                                                    type: "number",
                                                    min: 1,
                                                    max: __props.order.items[index].qty,
                                                    class: "w-20 text-right"
                                                  }, null, _parent8, _scopeId7));
                                                } else {
                                                  return [
                                                    createVNode(unref(_sfc_main$m), {
                                                      modelValue: item.qty,
                                                      "onUpdate:modelValue": ($event) => item.qty = $event,
                                                      modelModifiers: { number: true },
                                                      type: "number",
                                                      min: 1,
                                                      max: __props.order.items[index].qty,
                                                      class: "w-20 text-right"
                                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "max"])
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(unref(_sfc_main$d), { class: "font-medium" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(__props.order.items[index].name), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$d), { class: "text-right" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(__props.order.items[index].qty), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$d), { class: "text-right" }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(_sfc_main$m), {
                                                    modelValue: item.qty,
                                                    "onUpdate:modelValue": ($event) => item.qty = $event,
                                                    modelModifiers: { number: true },
                                                    type: "number",
                                                    min: 1,
                                                    max: __props.order.items[index].qty,
                                                    class: "w-20 text-right"
                                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "max"])
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    });
                                    _push6(`<!--]-->`);
                                  } else {
                                    return [
                                      (openBlock(true), createBlock(Fragment, null, renderList(shipmentForm.value.items, (item, index) => {
                                        return openBlock(), createBlock(unref(_sfc_main$a), {
                                          key: item.order_item_id
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$d), { class: "font-medium" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(__props.order.items[index].name), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$d), { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(__props.order.items[index].qty), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$d), { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createVNode(unref(_sfc_main$m), {
                                                  modelValue: item.qty,
                                                  "onUpdate:modelValue": ($event) => item.qty = $event,
                                                  modelModifiers: { number: true },
                                                  type: "number",
                                                  min: 1,
                                                  max: __props.order.items[index].qty,
                                                  class: "w-20 text-right"
                                                }, null, 8, ["modelValue", "onUpdate:modelValue", "max"])
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 2
                                        }, 1024);
                                      }), 128))
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$9), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$a), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$b), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Produk")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$b), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Qty Order")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$b), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Qty Kirim")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(shipmentForm.value.items, (item, index) => {
                                      return openBlock(), createBlock(unref(_sfc_main$a), {
                                        key: item.order_item_id
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$d), { class: "font-medium" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(__props.order.items[index].name), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$d), { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(__props.order.items[index].qty), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$d), { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$m), {
                                                modelValue: item.qty,
                                                "onUpdate:modelValue": ($event) => item.qty = $event,
                                                modelModifiers: { number: true },
                                                type: "number",
                                                min: 1,
                                                max: __props.order.items[index].qty,
                                                class: "w-20 text-right"
                                              }, null, 8, ["modelValue", "onUpdate:modelValue", "max"])
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1024);
                                    }), 128))
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div></div></div>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$n), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$2), {
                                type: "button",
                                variant: "outline",
                                onClick: ($event) => showShipmentDialog.value = false,
                                disabled: isProcessing.value
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Batal `);
                                  } else {
                                    return [
                                      createTextVNode(" Batal ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$2), {
                                type: "button",
                                onClick: setupShipment,
                                disabled: isProcessing.value
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`${ssrInterpolate(isProcessing.value ? "Memproses..." : "Setup Pengiriman")}`);
                                  } else {
                                    return [
                                      createTextVNode(toDisplayString(isProcessing.value ? "Memproses..." : "Setup Pengiriman"), 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$2), {
                                  type: "button",
                                  variant: "outline",
                                  onClick: ($event) => showShipmentDialog.value = false,
                                  disabled: isProcessing.value
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Batal ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick", "disabled"]),
                                createVNode(unref(_sfc_main$2), {
                                  type: "button",
                                  onClick: setupShipment,
                                  disabled: isProcessing.value
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(isProcessing.value ? "Memproses..." : "Setup Pengiriman"), 1)
                                  ]),
                                  _: 1
                                }, 8, ["disabled"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$i), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$j), null, {
                                default: withCtx(() => [
                                  createTextVNode("Setup Pengiriman")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$k), null, {
                                default: withCtx(() => [
                                  createTextVNode(" Masukkan informasi pengiriman untuk order " + toDisplayString(__props.order.order_no), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode("div", { class: "grid gap-4 py-4" }, [
                            createVNode("div", { class: "grid gap-2" }, [
                              createVNode(unref(_sfc_main$l), { for: "tracking_no" }, {
                                default: withCtx(() => [
                                  createTextVNode("Nomor Resi *")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$m), {
                                id: "tracking_no",
                                modelValue: shipmentForm.value.tracking_no,
                                "onUpdate:modelValue": ($event) => shipmentForm.value.tracking_no = $event,
                                placeholder: "Contoh: JNE123456789",
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "grid gap-2" }, [
                              createVNode(unref(_sfc_main$l), { for: "shipping_fee" }, {
                                default: withCtx(() => [
                                  createTextVNode("Biaya Kirim")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$m), {
                                id: "shipping_fee",
                                modelValue: shipmentForm.value.shipping_fee,
                                "onUpdate:modelValue": ($event) => shipmentForm.value.shipping_fee = $event,
                                modelModifiers: { number: true },
                                type: "number",
                                step: "0.01",
                                min: "0"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Default: " + toDisplayString(formatCurrency(__props.order.shipping_amount)), 1)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$l), null, {
                                default: withCtx(() => [
                                  createTextVNode("Item yang Dikirim")
                                ]),
                                _: 1
                              }),
                              createVNode("div", { class: "rounded-md border" }, [
                                createVNode(unref(_sfc_main$8), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$9), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$a), null, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$b), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Produk")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$b), { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Qty Order")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$b), { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Qty Kirim")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$c), null, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(shipmentForm.value.items, (item, index) => {
                                          return openBlock(), createBlock(unref(_sfc_main$a), {
                                            key: item.order_item_id
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$d), { class: "font-medium" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(__props.order.items[index].name), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$d), { class: "text-right" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(__props.order.items[index].qty), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$d), { class: "text-right" }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(_sfc_main$m), {
                                                    modelValue: item.qty,
                                                    "onUpdate:modelValue": ($event) => item.qty = $event,
                                                    modelModifiers: { number: true },
                                                    type: "number",
                                                    min: 1,
                                                    max: __props.order.items[index].qty,
                                                    class: "w-20 text-right"
                                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "max"])
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ]),
                                            _: 2
                                          }, 1024);
                                        }), 128))
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ])
                            ])
                          ]),
                          createVNode(unref(_sfc_main$n), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$2), {
                                type: "button",
                                variant: "outline",
                                onClick: ($event) => showShipmentDialog.value = false,
                                disabled: isProcessing.value
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Batal ")
                                ]),
                                _: 1
                              }, 8, ["onClick", "disabled"]),
                              createVNode(unref(_sfc_main$2), {
                                type: "button",
                                onClick: setupShipment,
                                disabled: isProcessing.value
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(isProcessing.value ? "Memproses..." : "Setup Pengiriman"), 1)
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$h), { class: "sm:max-w-[600px]" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$i), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$j), null, {
                              default: withCtx(() => [
                                createTextVNode("Setup Pengiriman")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$k), null, {
                              default: withCtx(() => [
                                createTextVNode(" Masukkan informasi pengiriman untuk order " + toDisplayString(__props.order.order_no), 1)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "grid gap-4 py-4" }, [
                          createVNode("div", { class: "grid gap-2" }, [
                            createVNode(unref(_sfc_main$l), { for: "tracking_no" }, {
                              default: withCtx(() => [
                                createTextVNode("Nomor Resi *")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$m), {
                              id: "tracking_no",
                              modelValue: shipmentForm.value.tracking_no,
                              "onUpdate:modelValue": ($event) => shipmentForm.value.tracking_no = $event,
                              placeholder: "Contoh: JNE123456789",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "grid gap-2" }, [
                            createVNode(unref(_sfc_main$l), { for: "shipping_fee" }, {
                              default: withCtx(() => [
                                createTextVNode("Biaya Kirim")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$m), {
                              id: "shipping_fee",
                              modelValue: shipmentForm.value.shipping_fee,
                              "onUpdate:modelValue": ($event) => shipmentForm.value.shipping_fee = $event,
                              modelModifiers: { number: true },
                              type: "number",
                              step: "0.01",
                              min: "0"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, " Default: " + toDisplayString(formatCurrency(__props.order.shipping_amount)), 1)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$l), null, {
                              default: withCtx(() => [
                                createTextVNode("Item yang Dikirim")
                              ]),
                              _: 1
                            }),
                            createVNode("div", { class: "rounded-md border" }, [
                              createVNode(unref(_sfc_main$8), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$9), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$a), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$b), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Produk")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$b), { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Qty Order")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$b), { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Qty Kirim")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$c), null, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(shipmentForm.value.items, (item, index) => {
                                        return openBlock(), createBlock(unref(_sfc_main$a), {
                                          key: item.order_item_id
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$d), { class: "font-medium" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(__props.order.items[index].name), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$d), { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(__props.order.items[index].qty), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$d), { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createVNode(unref(_sfc_main$m), {
                                                  modelValue: item.qty,
                                                  "onUpdate:modelValue": ($event) => item.qty = $event,
                                                  modelModifiers: { number: true },
                                                  type: "number",
                                                  min: 1,
                                                  max: __props.order.items[index].qty,
                                                  class: "w-20 text-right"
                                                }, null, 8, ["modelValue", "onUpdate:modelValue", "max"])
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 2
                                        }, 1024);
                                      }), 128))
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ])
                          ])
                        ]),
                        createVNode(unref(_sfc_main$n), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$2), {
                              type: "button",
                              variant: "outline",
                              onClick: ($event) => showShipmentDialog.value = false,
                              disabled: isProcessing.value
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Batal ")
                              ]),
                              _: 1
                            }, 8, ["onClick", "disabled"]),
                            createVNode(unref(_sfc_main$2), {
                              type: "button",
                              onClick: setupShipment,
                              disabled: isProcessing.value
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(isProcessing.value ? "Memproses..." : "Setup Pengiriman"), 1)
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$g), {
              open: showCancelDialog.value,
              "onUpdate:open": ($event) => showCancelDialog.value = $event
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$h), { class: "sm:max-w-[425px]" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$i), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$j), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Batalkan Order`);
                                  } else {
                                    return [
                                      createTextVNode("Batalkan Order")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$k), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Apakah Anda yakin ingin membatalkan order ${ssrInterpolate(__props.order.order_no)}? Tindakan ini tidak dapat dibatalkan. `);
                                  } else {
                                    return [
                                      createTextVNode(" Apakah Anda yakin ingin membatalkan order " + toDisplayString(__props.order.order_no) + "? Tindakan ini tidak dapat dibatalkan. ", 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$j), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Batalkan Order")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$k), null, {
                                  default: withCtx(() => [
                                    createTextVNode(" Apakah Anda yakin ingin membatalkan order " + toDisplayString(__props.order.order_no) + "? Tindakan ini tidak dapat dibatalkan. ", 1)
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$n), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$2), {
                                type: "button",
                                variant: "outline",
                                onClick: ($event) => showCancelDialog.value = false
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Tidak `);
                                  } else {
                                    return [
                                      createTextVNode(" Tidak ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$2), {
                                type: "button",
                                variant: "destructive",
                                onClick: cancelOrder
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Ya, Batalkan `);
                                  } else {
                                    return [
                                      createTextVNode(" Ya, Batalkan ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$2), {
                                  type: "button",
                                  variant: "outline",
                                  onClick: ($event) => showCancelDialog.value = false
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Tidak ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"]),
                                createVNode(unref(_sfc_main$2), {
                                  type: "button",
                                  variant: "destructive",
                                  onClick: cancelOrder
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Ya, Batalkan ")
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
                          createVNode(unref(_sfc_main$i), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$j), null, {
                                default: withCtx(() => [
                                  createTextVNode("Batalkan Order")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$k), null, {
                                default: withCtx(() => [
                                  createTextVNode(" Apakah Anda yakin ingin membatalkan order " + toDisplayString(__props.order.order_no) + "? Tindakan ini tidak dapat dibatalkan. ", 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$n), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$2), {
                                type: "button",
                                variant: "outline",
                                onClick: ($event) => showCancelDialog.value = false
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Tidak ")
                                ]),
                                _: 1
                              }, 8, ["onClick"]),
                              createVNode(unref(_sfc_main$2), {
                                type: "button",
                                variant: "destructive",
                                onClick: cancelOrder
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Ya, Batalkan ")
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
                } else {
                  return [
                    createVNode(unref(_sfc_main$h), { class: "sm:max-w-[425px]" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$i), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$j), null, {
                              default: withCtx(() => [
                                createTextVNode("Batalkan Order")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$k), null, {
                              default: withCtx(() => [
                                createTextVNode(" Apakah Anda yakin ingin membatalkan order " + toDisplayString(__props.order.order_no) + "? Tindakan ini tidak dapat dibatalkan. ", 1)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$n), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$2), {
                              type: "button",
                              variant: "outline",
                              onClick: ($event) => showCancelDialog.value = false
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Tidak ")
                              ]),
                              _: 1
                            }, 8, ["onClick"]),
                            createVNode(unref(_sfc_main$2), {
                              type: "button",
                              variant: "destructive",
                              onClick: cancelOrder
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Ya, Batalkan ")
                              ]),
                              _: 1
                            })
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$g), {
              open: showShipDialog.value,
              "onUpdate:open": ($event) => showShipDialog.value = $event
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$h), { class: "sm:max-w-[425px]" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$i), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$j), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Tandai Sudah Dikirim`);
                                  } else {
                                    return [
                                      createTextVNode("Tandai Sudah Dikirim")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$k), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Tandai pengiriman ini sebagai sudah dikirim? Status order akan berubah menjadi SHIPPED. `);
                                  } else {
                                    return [
                                      createTextVNode(" Tandai pengiriman ini sebagai sudah dikirim? Status order akan berubah menjadi SHIPPED. ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$j), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Tandai Sudah Dikirim")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$k), null, {
                                  default: withCtx(() => [
                                    createTextVNode(" Tandai pengiriman ini sebagai sudah dikirim? Status order akan berubah menjadi SHIPPED. ")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$n), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$2), {
                                type: "button",
                                variant: "outline",
                                onClick: ($event) => showShipDialog.value = false
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Batal `);
                                  } else {
                                    return [
                                      createTextVNode(" Batal ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$2), {
                                type: "button",
                                onClick: shipOrder
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Ya, Tandai Dikirim `);
                                  } else {
                                    return [
                                      createTextVNode(" Ya, Tandai Dikirim ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$2), {
                                  type: "button",
                                  variant: "outline",
                                  onClick: ($event) => showShipDialog.value = false
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Batal ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"]),
                                createVNode(unref(_sfc_main$2), {
                                  type: "button",
                                  onClick: shipOrder
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Ya, Tandai Dikirim ")
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
                          createVNode(unref(_sfc_main$i), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$j), null, {
                                default: withCtx(() => [
                                  createTextVNode("Tandai Sudah Dikirim")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$k), null, {
                                default: withCtx(() => [
                                  createTextVNode(" Tandai pengiriman ini sebagai sudah dikirim? Status order akan berubah menjadi SHIPPED. ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$n), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$2), {
                                type: "button",
                                variant: "outline",
                                onClick: ($event) => showShipDialog.value = false
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Batal ")
                                ]),
                                _: 1
                              }, 8, ["onClick"]),
                              createVNode(unref(_sfc_main$2), {
                                type: "button",
                                onClick: shipOrder
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Ya, Tandai Dikirim ")
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
                } else {
                  return [
                    createVNode(unref(_sfc_main$h), { class: "sm:max-w-[425px]" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$i), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$j), null, {
                              default: withCtx(() => [
                                createTextVNode("Tandai Sudah Dikirim")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$k), null, {
                              default: withCtx(() => [
                                createTextVNode(" Tandai pengiriman ini sebagai sudah dikirim? Status order akan berubah menjadi SHIPPED. ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$n), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$2), {
                              type: "button",
                              variant: "outline",
                              onClick: ($event) => showShipDialog.value = false
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Batal ")
                              ]),
                              _: 1
                            }, 8, ["onClick"]),
                            createVNode(unref(_sfc_main$2), {
                              type: "button",
                              onClick: shipOrder
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Ya, Tandai Dikirim ")
                              ]),
                              _: 1
                            })
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$g), {
              open: showDeliverDialog.value,
              "onUpdate:open": ($event) => showDeliverDialog.value = $event
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$h), { class: "sm:max-w-[425px]" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$i), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$j), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Tandai Sudah Diterima`);
                                  } else {
                                    return [
                                      createTextVNode("Tandai Sudah Diterima")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$k), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Tandai pengiriman ini sebagai sudah diterima? Status order akan berubah menjadi COMPLETED. `);
                                  } else {
                                    return [
                                      createTextVNode(" Tandai pengiriman ini sebagai sudah diterima? Status order akan berubah menjadi COMPLETED. ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$j), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Tandai Sudah Diterima")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$k), null, {
                                  default: withCtx(() => [
                                    createTextVNode(" Tandai pengiriman ini sebagai sudah diterima? Status order akan berubah menjadi COMPLETED. ")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$n), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$2), {
                                type: "button",
                                variant: "outline",
                                onClick: ($event) => showDeliverDialog.value = false
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Batal `);
                                  } else {
                                    return [
                                      createTextVNode(" Batal ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$2), {
                                type: "button",
                                onClick: deliverOrder
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Ya, Tandai Diterima `);
                                  } else {
                                    return [
                                      createTextVNode(" Ya, Tandai Diterima ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$2), {
                                  type: "button",
                                  variant: "outline",
                                  onClick: ($event) => showDeliverDialog.value = false
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Batal ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"]),
                                createVNode(unref(_sfc_main$2), {
                                  type: "button",
                                  onClick: deliverOrder
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Ya, Tandai Diterima ")
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
                          createVNode(unref(_sfc_main$i), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$j), null, {
                                default: withCtx(() => [
                                  createTextVNode("Tandai Sudah Diterima")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$k), null, {
                                default: withCtx(() => [
                                  createTextVNode(" Tandai pengiriman ini sebagai sudah diterima? Status order akan berubah menjadi COMPLETED. ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$n), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$2), {
                                type: "button",
                                variant: "outline",
                                onClick: ($event) => showDeliverDialog.value = false
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Batal ")
                                ]),
                                _: 1
                              }, 8, ["onClick"]),
                              createVNode(unref(_sfc_main$2), {
                                type: "button",
                                onClick: deliverOrder
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Ya, Tandai Diterima ")
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
                } else {
                  return [
                    createVNode(unref(_sfc_main$h), { class: "sm:max-w-[425px]" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$i), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$j), null, {
                              default: withCtx(() => [
                                createTextVNode("Tandai Sudah Diterima")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$k), null, {
                              default: withCtx(() => [
                                createTextVNode(" Tandai pengiriman ini sebagai sudah diterima? Status order akan berubah menjadi COMPLETED. ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$n), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$2), {
                              type: "button",
                              variant: "outline",
                              onClick: ($event) => showDeliverDialog.value = false
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Batal ")
                              ]),
                              _: 1
                            }, 8, ["onClick"]),
                            createVNode(unref(_sfc_main$2), {
                              type: "button",
                              onClick: deliverOrder
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Ya, Tandai Diterima ")
                              ]),
                              _: 1
                            })
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "space-y-6 rounded-xl p-4 py-6" }, [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("div", { class: "flex items-center gap-4" }, [
                    createVNode(unref(Link), { href: "/admin/orders" }, {
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
                      createVNode("h1", { class: "text-3xl font-bold" }, "Detail Order"),
                      createVNode("p", { class: "text-muted-foreground" }, toDisplayString(__props.order.order_no), 1)
                    ])
                  ]),
                  createVNode("div", { class: "flex gap-2" }, [
                    createVNode(unref(_sfc_main$3), {
                      variant: getStatusVariant(__props.order.status),
                      class: "text-sm"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(__props.order.status), 1)
                      ]),
                      _: 1
                    }, 8, ["variant"]),
                    ["PAID", "PROCESSING"].includes(__props.order.status.toUpperCase()) ? (openBlock(), createBlock(unref(_sfc_main$2), {
                      key: 0,
                      variant: "default",
                      size: "sm",
                      onClick: ($event) => showShipmentDialog.value = true
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Truck), { class: "mr-2 h-4 w-4" }),
                        createTextVNode(" Setup Pengiriman ")
                      ]),
                      _: 1
                    }, 8, ["onClick"])) : createCommentVNode("", true),
                    ["PENDING", "PAID"].includes(__props.order.status.toUpperCase()) ? (openBlock(), createBlock(unref(_sfc_main$2), {
                      key: 1,
                      variant: "destructive",
                      size: "sm",
                      onClick: openCancelDialog
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Batalkan Order ")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
                  ])
                ]),
                createVNode("div", { class: "grid gap-6 md:grid-cols-2" }, [
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode(unref(User), { class: "h-5 w-5" }),
                            createVNode(unref(_sfc_main$6), null, {
                              default: withCtx(() => [
                                createTextVNode("Informasi Customer")
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), { class: "space-y-2" }, {
                        default: withCtx(() => [
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm text-muted-foreground" }, "Nama"),
                            createVNode("p", { class: "font-medium" }, toDisplayString(__props.order.customer.name), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm text-muted-foreground" }, "Email"),
                            createVNode("p", { class: "font-medium" }, toDisplayString(__props.order.customer.email), 1)
                          ]),
                          __props.order.customer.phone ? (openBlock(), createBlock("div", { key: 0 }, [
                            createVNode("p", { class: "text-sm text-muted-foreground" }, "Telepon"),
                            createVNode("p", { class: "font-medium" }, toDisplayString(__props.order.customer.phone), 1)
                          ])) : createCommentVNode("", true)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode(unref(Package), { class: "h-5 w-5" }),
                            createVNode(unref(_sfc_main$6), null, {
                              default: withCtx(() => [
                                createTextVNode("Informasi Order")
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), { class: "space-y-2" }, {
                        default: withCtx(() => [
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm text-muted-foreground" }, "Tanggal Order"),
                            createVNode("p", { class: "font-medium" }, toDisplayString(formatDate(__props.order.created_at)), 1)
                          ]),
                          __props.order.paid_at ? (openBlock(), createBlock("div", { key: 0 }, [
                            createVNode("p", { class: "text-sm text-muted-foreground" }, "Tanggal Bayar"),
                            createVNode("p", { class: "font-medium" }, toDisplayString(formatDate(__props.order.paid_at)), 1)
                          ])) : createCommentVNode("", true),
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm text-muted-foreground" }, "Status"),
                            createVNode(unref(_sfc_main$3), {
                              variant: getStatusVariant(__props.order.status)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(__props.order.status), 1)
                              ]),
                              _: 1
                            }, 8, ["variant"])
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                __props.order.shippingAddress ? (openBlock(), createBlock(unref(_sfc_main$4), { key: 0 }, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode(unref(MapPin), { class: "h-5 w-5" }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("Alamat Pengiriman")
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), { class: "space-y-2" }, {
                      default: withCtx(() => [
                        createVNode("div", null, [
                          createVNode("p", { class: "font-medium" }, toDisplayString(__props.order.shippingAddress.recipient_name), 1),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(__props.order.shippingAddress.recipient_phone), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("p", { class: "text-sm" }, toDisplayString(__props.order.shippingAddress.address_line1), 1),
                          __props.order.shippingAddress.address_line2 ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm"
                          }, toDisplayString(__props.order.shippingAddress.address_line2), 1)) : createCommentVNode("", true),
                          createVNode("p", { class: "text-sm" }, toDisplayString(__props.order.shippingAddress.city_label) + ", " + toDisplayString(__props.order.shippingAddress.province_label) + " " + toDisplayString(__props.order.shippingAddress.postal_code), 1),
                          createVNode("p", { class: "text-sm" }, toDisplayString(__props.order.shippingAddress.country), 1)
                        ]),
                        unref(shippingInfo).courier ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "pt-2"
                        }, [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode(unref(Truck), { class: "h-4 w-4 text-muted-foreground" }),
                            createVNode("div", null, [
                              createVNode("p", { class: "text-sm font-medium" }, toDisplayString(unref(shippingInfo).courier) + " - " + toDisplayString(unref(shippingInfo).service), 1),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Estimasi: " + toDisplayString(unref(shippingInfo).etd), 1)
                            ])
                          ])
                        ])) : createCommentVNode("", true)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })) : createCommentVNode("", true),
                createVNode(unref(_sfc_main$4), null, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode("Produk yang Dipesan")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$8), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$9), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$a), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$b), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Produk")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$b), null, {
                                      default: withCtx(() => [
                                        createTextVNode("SKU")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$b), { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Harga")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$b), { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Qty")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$b), { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Total")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), null, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.order.items, (item) => {
                                  return openBlock(), createBlock(unref(_sfc_main$a), {
                                    key: item.id
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$d), { class: "font-medium" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(item.name), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$d), null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(item.sku), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$d), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(formatCurrency(item.unit_price)), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$d), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(item.qty), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$d), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(formatCurrency(item.row_total)), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 128))
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                __props.order.shipments && __props.order.shipments.length > 0 ? (openBlock(), createBlock(unref(_sfc_main$4), { key: 1 }, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode(unref(Truck), { class: "h-5 w-5" }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("Informasi Pengiriman")
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.order.shipments, (shipment) => {
                          return openBlock(), createBlock("div", {
                            key: shipment.id,
                            class: "rounded-lg border p-4 space-y-3"
                          }, [
                            createVNode("div", { class: "flex items-center justify-between" }, [
                              createVNode("div", null, [
                                createVNode("p", { class: "font-medium" }, "Resi: " + toDisplayString(shipment.tracking_no), 1),
                                createVNode("p", { class: "text-sm text-muted-foreground" }, " Biaya: " + toDisplayString(formatCurrency(shipment.shipping_fee)), 1)
                              ]),
                              createVNode(unref(_sfc_main$3), {
                                variant: getShipmentStatusVariant(shipment.status)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(shipment.status), 1)
                                ]),
                                _: 2
                              }, 1032, ["variant"])
                            ]),
                            shipment.shipped_at ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "text-sm text-muted-foreground"
                            }, " Dikirim: " + toDisplayString(formatDate(shipment.shipped_at)), 1)) : createCommentVNode("", true),
                            shipment.delivered_at ? (openBlock(), createBlock("div", {
                              key: 1,
                              class: "text-sm text-muted-foreground"
                            }, " Diterima: " + toDisplayString(formatDate(shipment.delivered_at)), 1)) : createCommentVNode("", true),
                            createVNode("div", { class: "flex gap-2" }, [
                              shipment.status === "READY_TO_SHIP" ? (openBlock(), createBlock(unref(_sfc_main$2), {
                                key: 0,
                                size: "sm",
                                onClick: ($event) => openShipDialog(shipment.id)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Tandai Sudah Dikirim ")
                                ]),
                                _: 1
                              }, 8, ["onClick"])) : createCommentVNode("", true),
                              shipment.status === "IN_TRANSIT" ? (openBlock(), createBlock(unref(_sfc_main$2), {
                                key: 1,
                                size: "sm",
                                variant: "default",
                                onClick: ($event) => openDeliverDialog(shipment.id)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Tandai Sudah Diterima ")
                                ]),
                                _: 1
                              }, 8, ["onClick"])) : createCommentVNode("", true)
                            ])
                          ]);
                        }), 128))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })) : createCommentVNode("", true),
                createVNode("div", { class: "grid gap-6 md:grid-cols-2" }, [
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode(unref(CreditCard), { class: "h-5 w-5" }),
                            createVNode(unref(_sfc_main$6), null, {
                              default: withCtx(() => [
                                createTextVNode("Ringkasan Pembayaran")
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), { class: "space-y-3" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-muted-foreground" }, "Subtotal"),
                            createVNode("span", { class: "font-medium" }, toDisplayString(formatCurrency(__props.order.subtotal_amount)), 1)
                          ]),
                          __props.order.discount_amount > 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex justify-between"
                          }, [
                            createVNode("span", { class: "text-muted-foreground" }, "Diskon"),
                            createVNode("span", { class: "font-medium text-green-600" }, " -" + toDisplayString(formatCurrency(__props.order.discount_amount)), 1)
                          ])) : createCommentVNode("", true),
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-muted-foreground" }, "Ongkir"),
                            createVNode("span", { class: "font-medium" }, toDisplayString(formatCurrency(__props.order.shipping_amount)), 1)
                          ]),
                          __props.order.tax_amount > 0 ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "flex justify-between"
                          }, [
                            createVNode("span", { class: "text-muted-foreground" }, "Pajak"),
                            createVNode("span", { class: "font-medium" }, toDisplayString(formatCurrency(__props.order.tax_amount)), 1)
                          ])) : createCommentVNode("", true),
                          createVNode(unref(_sfc_main$e)),
                          createVNode("div", { class: "flex justify-between text-lg" }, [
                            createVNode("span", { class: "font-semibold" }, "Total"),
                            createVNode("span", { class: "font-bold" }, toDisplayString(formatCurrency(__props.order.grand_total)), 1)
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode(unref(Gift), { class: "h-5 w-5" }),
                            createVNode(unref(_sfc_main$6), null, {
                              default: withCtx(() => [
                                createTextVNode("MLM Bonuses")
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode(unref(_sfc_main$f), null, {
                            default: withCtx(() => [
                              createTextVNode("Bonus yang dihasilkan dari order ini")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), { class: "space-y-3" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-muted-foreground" }, "Business Value (BV)"),
                            createVNode("span", { class: "font-medium" }, toDisplayString(__props.order.bv_amount || 0), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-muted-foreground" }, "Bonus Sponsor"),
                            createVNode("span", { class: "font-medium" }, toDisplayString(formatCurrency(__props.order.sponsor_amount || 0)), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-muted-foreground" }, "Bonus Matching"),
                            createVNode("span", { class: "font-medium" }, toDisplayString(formatCurrency(__props.order.match_amount || 0)), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-muted-foreground" }, "Bonus Pairing"),
                            createVNode("span", { class: "font-medium" }, toDisplayString(formatCurrency(__props.order.pairing_amount || 0)), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-muted-foreground" }, "Cashback"),
                            createVNode("span", { class: "font-medium" }, toDisplayString(formatCurrency(__props.order.cashback_amount || 0)), 1)
                          ]),
                          createVNode(unref(_sfc_main$e)),
                          createVNode("div", { class: "flex justify-between text-lg" }, [
                            createVNode("span", { class: "font-semibold" }, "Total Bonus"),
                            createVNode("span", { class: "font-bold text-green-600" }, toDisplayString(formatCurrency(__props.order.total_bonuses || 0)), 1)
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                __props.order.notes ? (openBlock(), createBlock(unref(_sfc_main$4), { key: 2 }, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode("Catatan")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), null, {
                      default: withCtx(() => [
                        createVNode("p", { class: "text-sm" }, toDisplayString(__props.order.notes), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })) : createCommentVNode("", true)
              ]),
              createVNode(unref(_sfc_main$g), {
                open: showShipmentDialog.value,
                "onUpdate:open": ($event) => showShipmentDialog.value = $event
              }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$h), { class: "sm:max-w-[600px]" }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$i), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$j), null, {
                            default: withCtx(() => [
                              createTextVNode("Setup Pengiriman")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$k), null, {
                            default: withCtx(() => [
                              createTextVNode(" Masukkan informasi pengiriman untuk order " + toDisplayString(__props.order.order_no), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "grid gap-4 py-4" }, [
                        createVNode("div", { class: "grid gap-2" }, [
                          createVNode(unref(_sfc_main$l), { for: "tracking_no" }, {
                            default: withCtx(() => [
                              createTextVNode("Nomor Resi *")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$m), {
                            id: "tracking_no",
                            modelValue: shipmentForm.value.tracking_no,
                            "onUpdate:modelValue": ($event) => shipmentForm.value.tracking_no = $event,
                            placeholder: "Contoh: JNE123456789",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "grid gap-2" }, [
                          createVNode(unref(_sfc_main$l), { for: "shipping_fee" }, {
                            default: withCtx(() => [
                              createTextVNode("Biaya Kirim")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$m), {
                            id: "shipping_fee",
                            modelValue: shipmentForm.value.shipping_fee,
                            "onUpdate:modelValue": ($event) => shipmentForm.value.shipping_fee = $event,
                            modelModifiers: { number: true },
                            type: "number",
                            step: "0.01",
                            min: "0"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, " Default: " + toDisplayString(formatCurrency(__props.order.shipping_amount)), 1)
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$l), null, {
                            default: withCtx(() => [
                              createTextVNode("Item yang Dikirim")
                            ]),
                            _: 1
                          }),
                          createVNode("div", { class: "rounded-md border" }, [
                            createVNode(unref(_sfc_main$8), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$9), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$a), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$b), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Produk")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$b), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Qty Order")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$b), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Qty Kirim")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(shipmentForm.value.items, (item, index) => {
                                      return openBlock(), createBlock(unref(_sfc_main$a), {
                                        key: item.order_item_id
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$d), { class: "font-medium" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(__props.order.items[index].name), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$d), { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(__props.order.items[index].qty), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$d), { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$m), {
                                                modelValue: item.qty,
                                                "onUpdate:modelValue": ($event) => item.qty = $event,
                                                modelModifiers: { number: true },
                                                type: "number",
                                                min: 1,
                                                max: __props.order.items[index].qty,
                                                class: "w-20 text-right"
                                              }, null, 8, ["modelValue", "onUpdate:modelValue", "max"])
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1024);
                                    }), 128))
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ])
                        ])
                      ]),
                      createVNode(unref(_sfc_main$n), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$2), {
                            type: "button",
                            variant: "outline",
                            onClick: ($event) => showShipmentDialog.value = false,
                            disabled: isProcessing.value
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Batal ")
                            ]),
                            _: 1
                          }, 8, ["onClick", "disabled"]),
                          createVNode(unref(_sfc_main$2), {
                            type: "button",
                            onClick: setupShipment,
                            disabled: isProcessing.value
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(isProcessing.value ? "Memproses..." : "Setup Pengiriman"), 1)
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["open", "onUpdate:open"]),
              createVNode(unref(_sfc_main$g), {
                open: showCancelDialog.value,
                "onUpdate:open": ($event) => showCancelDialog.value = $event
              }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$h), { class: "sm:max-w-[425px]" }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$i), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$j), null, {
                            default: withCtx(() => [
                              createTextVNode("Batalkan Order")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$k), null, {
                            default: withCtx(() => [
                              createTextVNode(" Apakah Anda yakin ingin membatalkan order " + toDisplayString(__props.order.order_no) + "? Tindakan ini tidak dapat dibatalkan. ", 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$n), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$2), {
                            type: "button",
                            variant: "outline",
                            onClick: ($event) => showCancelDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Tidak ")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(unref(_sfc_main$2), {
                            type: "button",
                            variant: "destructive",
                            onClick: cancelOrder
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Ya, Batalkan ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["open", "onUpdate:open"]),
              createVNode(unref(_sfc_main$g), {
                open: showShipDialog.value,
                "onUpdate:open": ($event) => showShipDialog.value = $event
              }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$h), { class: "sm:max-w-[425px]" }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$i), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$j), null, {
                            default: withCtx(() => [
                              createTextVNode("Tandai Sudah Dikirim")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$k), null, {
                            default: withCtx(() => [
                              createTextVNode(" Tandai pengiriman ini sebagai sudah dikirim? Status order akan berubah menjadi SHIPPED. ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$n), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$2), {
                            type: "button",
                            variant: "outline",
                            onClick: ($event) => showShipDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Batal ")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(unref(_sfc_main$2), {
                            type: "button",
                            onClick: shipOrder
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Ya, Tandai Dikirim ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["open", "onUpdate:open"]),
              createVNode(unref(_sfc_main$g), {
                open: showDeliverDialog.value,
                "onUpdate:open": ($event) => showDeliverDialog.value = $event
              }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$h), { class: "sm:max-w-[425px]" }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$i), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$j), null, {
                            default: withCtx(() => [
                              createTextVNode("Tandai Sudah Diterima")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$k), null, {
                            default: withCtx(() => [
                              createTextVNode(" Tandai pengiriman ini sebagai sudah diterima? Status order akan berubah menjadi COMPLETED. ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$n), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$2), {
                            type: "button",
                            variant: "outline",
                            onClick: ($event) => showDeliverDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Batal ")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(unref(_sfc_main$2), {
                            type: "button",
                            onClick: deliverOrder
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Ya, Tandai Diterima ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["open", "onUpdate:open"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Orders/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
