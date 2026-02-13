import { defineComponent, ref, computed, watch, withCtx, unref, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { B as getCities, _ as _sfc_main$1, C as index, D as store } from "./AppLayout-D11fLPDM.js";
import { _ as _sfc_main$2, c as cn } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$8 } from "./Label-16aMY2sx.js";
import { _ as _sfc_main$j, a as _sfc_main$k, b as _sfc_main$l, c as _sfc_main$m, d as _sfc_main$n } from "./SelectValue-BUnv4mQg.js";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5, d as _sfc_main$6, c as _sfc_main$7 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$9, a as _sfc_main$a, b as _sfc_main$c, c as _sfc_main$d, d as _sfc_main$e, e as _sfc_main$f, f as _sfc_main$g, g as _sfc_main$h, h as _sfc_main$i } from "./PopoverTrigger-D0RWxIr3.js";
import { _ as _sfc_main$b } from "./index-BpQimeTM.js";
import { ArrowLeft, User, ChevronsUpDown, Check, MapPin, Loader2, AlertCircle, Store } from "lucide-vue-next";
import { toast } from "vue-sonner";
import "class-variance-authority";
import "./DropdownMenuTrigger-B1v6pHML.js";
import "reka-ui";
import "@vueuse/core";
import "./Input-BGi8wCMh.js";
import "./index-3UqiGNe9.js";
import "./AvatarImage-DWFQMckn.js";
import "./index-Bfu0FVt6.js";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
import "clsx";
import "tailwind-merge";
import "./DialogTrigger-DpE8BjOt.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    customers: {},
    provinces: {},
    assignedKabupaten: {}
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      customer_id: null,
      stockist_kabupaten_id: null,
      stockist_kabupaten_name: "",
      stockist_province_id: null,
      stockist_province_name: ""
    });
    const customerOpen = ref(false);
    const customerSearch = ref("");
    const selectedProvinceId = ref(null);
    const citiesList = ref([]);
    const loadingCities = ref(false);
    const cityOpen = ref(false);
    const selectedCustomer = computed(() => {
      return props.customers.find((c) => c.id === form.customer_id) || null;
    });
    const filteredCustomers = computed(() => {
      if (!customerSearch.value) return props.customers;
      const search = customerSearch.value.toLowerCase();
      return props.customers.filter(
        (c) => c.name.toLowerCase().includes(search) || c.ewallet_id.toLowerCase().includes(search) || c.email.toLowerCase().includes(search)
      );
    });
    watch(selectedProvinceId, async (provinceId) => {
      if (!provinceId) {
        citiesList.value = [];
        form.stockist_kabupaten_id = null;
        form.stockist_kabupaten_name = "";
        form.stockist_province_id = null;
        form.stockist_province_name = "";
        return;
      }
      const province = props.provinces.find((p) => p.id === provinceId);
      if (province) {
        form.stockist_province_id = province.id;
        form.stockist_province_name = province.name;
      }
      form.stockist_kabupaten_id = null;
      form.stockist_kabupaten_name = "";
      loadingCities.value = true;
      try {
        const url = `${getCities.url()}?province_id=${provinceId}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest"
          },
          credentials: "same-origin"
        });
        if (!response.ok) {
          throw new Error("Failed to fetch cities");
        }
        citiesList.value = await response.json();
      } catch {
        toast.error("Gagal memuat daftar kota");
        citiesList.value = [];
      } finally {
        loadingCities.value = false;
      }
    });
    const handleCitySelect = (city) => {
      form.stockist_kabupaten_id = city.id;
      form.stockist_kabupaten_name = city.name;
      cityOpen.value = false;
    };
    const isKabupatenAssigned = (cityId) => {
      return props.assignedKabupaten.includes(cityId);
    };
    const submit = () => {
      form.post(store.url(), {
        onSuccess: () => {
          toast.success("Stokist berhasil ditambahkan");
        },
        onError: (errors) => {
          const firstError = Object.values(errors)[0];
          if (firstError) {
            toast.error(firstError);
          }
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Tambah Stokist" }, null, _parent2, _scopeId));
            _push2(`<div class="rounded-xl p-4 space-y-6 py-6"${_scopeId}><div class="mb-6 flex items-center gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(index).url()
            }, {
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
            _push2(`<div${_scopeId}><h1 class="text-3xl font-bold tracking-tight"${_scopeId}>Tambah Stokist</h1><p class="text-muted-foreground"${_scopeId}> Pilih pelanggan dan tentukan kabupaten/kota untuk dijadikan stokist </p></div></div><form class="space-y-6 max-w-2xl"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$3), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$5), { class: "flex items-center gap-2" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(User), { class: "h-5 w-5" }, null, _parent5, _scopeId4));
                              _push5(` Pilih Pelanggan `);
                            } else {
                              return [
                                createVNode(unref(User), { class: "h-5 w-5" }),
                                createTextVNode(" Pilih Pelanggan ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Pilih pelanggan aktif yang akan dijadikan stokist. Hanya pelanggan yang belum menjadi stokist yang ditampilkan. `);
                            } else {
                              return [
                                createTextVNode(" Pilih pelanggan aktif yang akan dijadikan stokist. Hanya pelanggan yang belum menjadi stokist yang ditampilkan. ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), { class: "flex items-center gap-2" }, {
                            default: withCtx(() => [
                              createVNode(unref(User), { class: "h-5 w-5" }),
                              createTextVNode(" Pilih Pelanggan ")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode(" Pilih pelanggan aktif yang akan dijadikan stokist. Hanya pelanggan yang belum menjadi stokist yang ditampilkan. ")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { class: "space-y-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Pelanggan <span class="text-destructive"${_scopeId4}>*</span>`);
                            } else {
                              return [
                                createTextVNode("Pelanggan "),
                                createVNode("span", { class: "text-destructive" }, "*")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          open: customerOpen.value,
                          "onUpdate:open": ($event) => customerOpen.value = $event
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$a), { "as-child": "" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$2), {
                                      variant: "outline",
                                      role: "combobox",
                                      "aria-expanded": customerOpen.value,
                                      class: ["w-full justify-between", { "border-destructive": unref(form).errors.customer_id }]
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          if (selectedCustomer.value) {
                                            _push7(`<span class="flex items-center gap-2"${_scopeId6}>`);
                                            _push7(ssrRenderComponent(unref(_sfc_main$b), {
                                              variant: "secondary",
                                              class: "font-mono"
                                            }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(selectedCustomer.value.ewallet_id)}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(selectedCustomer.value.ewallet_id), 1)
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                            _push7(` ${ssrInterpolate(selectedCustomer.value.name)}</span>`);
                                          } else {
                                            _push7(`<span class="text-muted-foreground"${_scopeId6}>Pilih pelanggan...</span>`);
                                          }
                                          _push7(ssrRenderComponent(unref(ChevronsUpDown), { class: "ml-2 h-4 w-4 shrink-0 opacity-50" }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            selectedCustomer.value ? (openBlock(), createBlock("span", {
                                              key: 0,
                                              class: "flex items-center gap-2"
                                            }, [
                                              createVNode(unref(_sfc_main$b), {
                                                variant: "secondary",
                                                class: "font-mono"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(selectedCustomer.value.ewallet_id), 1)
                                                ]),
                                                _: 1
                                              }),
                                              createTextVNode(" " + toDisplayString(selectedCustomer.value.name), 1)
                                            ])) : (openBlock(), createBlock("span", {
                                              key: 1,
                                              class: "text-muted-foreground"
                                            }, "Pilih pelanggan...")),
                                            createVNode(unref(ChevronsUpDown), { class: "ml-2 h-4 w-4 shrink-0 opacity-50" })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$2), {
                                        variant: "outline",
                                        role: "combobox",
                                        "aria-expanded": customerOpen.value,
                                        class: ["w-full justify-between", { "border-destructive": unref(form).errors.customer_id }]
                                      }, {
                                        default: withCtx(() => [
                                          selectedCustomer.value ? (openBlock(), createBlock("span", {
                                            key: 0,
                                            class: "flex items-center gap-2"
                                          }, [
                                            createVNode(unref(_sfc_main$b), {
                                              variant: "secondary",
                                              class: "font-mono"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(selectedCustomer.value.ewallet_id), 1)
                                              ]),
                                              _: 1
                                            }),
                                            createTextVNode(" " + toDisplayString(selectedCustomer.value.name), 1)
                                          ])) : (openBlock(), createBlock("span", {
                                            key: 1,
                                            class: "text-muted-foreground"
                                          }, "Pilih pelanggan...")),
                                          createVNode(unref(ChevronsUpDown), { class: "ml-2 h-4 w-4 shrink-0 opacity-50" })
                                        ]),
                                        _: 1
                                      }, 8, ["aria-expanded", "class"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), { class: "w-[400px] p-0" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$d), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(unref(_sfc_main$e), {
                                            modelValue: customerSearch.value,
                                            "onUpdate:modelValue": ($event) => customerSearch.value = $event,
                                            placeholder: "Cari nama, ewallet ID, atau email..."
                                          }, null, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(unref(_sfc_main$f), null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(unref(_sfc_main$g), null, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`Tidak ada pelanggan ditemukan.`);
                                                    } else {
                                                      return [
                                                        createTextVNode("Tidak ada pelanggan ditemukan.")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(unref(_sfc_main$h), null, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`<!--[-->`);
                                                      ssrRenderList(filteredCustomers.value, (customer) => {
                                                        _push9(ssrRenderComponent(unref(_sfc_main$i), {
                                                          key: customer.id,
                                                          value: customer.name,
                                                          onSelect: () => {
                                                            unref(form).customer_id = customer.id;
                                                            customerOpen.value = false;
                                                          },
                                                          class: "flex items-center gap-2"
                                                        }, {
                                                          default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                            if (_push10) {
                                                              _push10(ssrRenderComponent(unref(Check), {
                                                                class: unref(cn)(
                                                                  "mr-2 h-4 w-4",
                                                                  unref(form).customer_id === customer.id ? "opacity-100" : "opacity-0"
                                                                )
                                                              }, null, _parent10, _scopeId9));
                                                              _push10(`<div class="flex flex-col"${_scopeId9}><div class="flex items-center gap-2"${_scopeId9}>`);
                                                              _push10(ssrRenderComponent(unref(_sfc_main$b), {
                                                                variant: "outline",
                                                                class: "font-mono text-xs"
                                                              }, {
                                                                default: withCtx((_10, _push11, _parent11, _scopeId10) => {
                                                                  if (_push11) {
                                                                    _push11(`${ssrInterpolate(customer.ewallet_id)}`);
                                                                  } else {
                                                                    return [
                                                                      createTextVNode(toDisplayString(customer.ewallet_id), 1)
                                                                    ];
                                                                  }
                                                                }),
                                                                _: 2
                                                              }, _parent10, _scopeId9));
                                                              _push10(`<span class="font-medium"${_scopeId9}>${ssrInterpolate(customer.name)}</span></div><span class="text-xs text-muted-foreground"${_scopeId9}>${ssrInterpolate(customer.email)}</span></div>`);
                                                            } else {
                                                              return [
                                                                createVNode(unref(Check), {
                                                                  class: unref(cn)(
                                                                    "mr-2 h-4 w-4",
                                                                    unref(form).customer_id === customer.id ? "opacity-100" : "opacity-0"
                                                                  )
                                                                }, null, 8, ["class"]),
                                                                createVNode("div", { class: "flex flex-col" }, [
                                                                  createVNode("div", { class: "flex items-center gap-2" }, [
                                                                    createVNode(unref(_sfc_main$b), {
                                                                      variant: "outline",
                                                                      class: "font-mono text-xs"
                                                                    }, {
                                                                      default: withCtx(() => [
                                                                        createTextVNode(toDisplayString(customer.ewallet_id), 1)
                                                                      ]),
                                                                      _: 2
                                                                    }, 1024),
                                                                    createVNode("span", { class: "font-medium" }, toDisplayString(customer.name), 1)
                                                                  ]),
                                                                  createVNode("span", { class: "text-xs text-muted-foreground" }, toDisplayString(customer.email), 1)
                                                                ])
                                                              ];
                                                            }
                                                          }),
                                                          _: 2
                                                        }, _parent9, _scopeId8));
                                                      });
                                                      _push9(`<!--]-->`);
                                                    } else {
                                                      return [
                                                        (openBlock(true), createBlock(Fragment, null, renderList(filteredCustomers.value, (customer) => {
                                                          return openBlock(), createBlock(unref(_sfc_main$i), {
                                                            key: customer.id,
                                                            value: customer.name,
                                                            onSelect: () => {
                                                              unref(form).customer_id = customer.id;
                                                              customerOpen.value = false;
                                                            },
                                                            class: "flex items-center gap-2"
                                                          }, {
                                                            default: withCtx(() => [
                                                              createVNode(unref(Check), {
                                                                class: unref(cn)(
                                                                  "mr-2 h-4 w-4",
                                                                  unref(form).customer_id === customer.id ? "opacity-100" : "opacity-0"
                                                                )
                                                              }, null, 8, ["class"]),
                                                              createVNode("div", { class: "flex flex-col" }, [
                                                                createVNode("div", { class: "flex items-center gap-2" }, [
                                                                  createVNode(unref(_sfc_main$b), {
                                                                    variant: "outline",
                                                                    class: "font-mono text-xs"
                                                                  }, {
                                                                    default: withCtx(() => [
                                                                      createTextVNode(toDisplayString(customer.ewallet_id), 1)
                                                                    ]),
                                                                    _: 2
                                                                  }, 1024),
                                                                  createVNode("span", { class: "font-medium" }, toDisplayString(customer.name), 1)
                                                                ]),
                                                                createVNode("span", { class: "text-xs text-muted-foreground" }, toDisplayString(customer.email), 1)
                                                              ])
                                                            ]),
                                                            _: 2
                                                          }, 1032, ["value", "onSelect"]);
                                                        }), 128))
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(unref(_sfc_main$g), null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Tidak ada pelanggan ditemukan.")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(unref(_sfc_main$h), null, {
                                                    default: withCtx(() => [
                                                      (openBlock(true), createBlock(Fragment, null, renderList(filteredCustomers.value, (customer) => {
                                                        return openBlock(), createBlock(unref(_sfc_main$i), {
                                                          key: customer.id,
                                                          value: customer.name,
                                                          onSelect: () => {
                                                            unref(form).customer_id = customer.id;
                                                            customerOpen.value = false;
                                                          },
                                                          class: "flex items-center gap-2"
                                                        }, {
                                                          default: withCtx(() => [
                                                            createVNode(unref(Check), {
                                                              class: unref(cn)(
                                                                "mr-2 h-4 w-4",
                                                                unref(form).customer_id === customer.id ? "opacity-100" : "opacity-0"
                                                              )
                                                            }, null, 8, ["class"]),
                                                            createVNode("div", { class: "flex flex-col" }, [
                                                              createVNode("div", { class: "flex items-center gap-2" }, [
                                                                createVNode(unref(_sfc_main$b), {
                                                                  variant: "outline",
                                                                  class: "font-mono text-xs"
                                                                }, {
                                                                  default: withCtx(() => [
                                                                    createTextVNode(toDisplayString(customer.ewallet_id), 1)
                                                                  ]),
                                                                  _: 2
                                                                }, 1024),
                                                                createVNode("span", { class: "font-medium" }, toDisplayString(customer.name), 1)
                                                              ]),
                                                              createVNode("span", { class: "text-xs text-muted-foreground" }, toDisplayString(customer.email), 1)
                                                            ])
                                                          ]),
                                                          _: 2
                                                        }, 1032, ["value", "onSelect"]);
                                                      }), 128))
                                                    ]),
                                                    _: 1
                                                  })
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(unref(_sfc_main$e), {
                                              modelValue: customerSearch.value,
                                              "onUpdate:modelValue": ($event) => customerSearch.value = $event,
                                              placeholder: "Cari nama, ewallet ID, atau email..."
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                            createVNode(unref(_sfc_main$f), null, {
                                              default: withCtx(() => [
                                                createVNode(unref(_sfc_main$g), null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Tidak ada pelanggan ditemukan.")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(unref(_sfc_main$h), null, {
                                                  default: withCtx(() => [
                                                    (openBlock(true), createBlock(Fragment, null, renderList(filteredCustomers.value, (customer) => {
                                                      return openBlock(), createBlock(unref(_sfc_main$i), {
                                                        key: customer.id,
                                                        value: customer.name,
                                                        onSelect: () => {
                                                          unref(form).customer_id = customer.id;
                                                          customerOpen.value = false;
                                                        },
                                                        class: "flex items-center gap-2"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode(unref(Check), {
                                                            class: unref(cn)(
                                                              "mr-2 h-4 w-4",
                                                              unref(form).customer_id === customer.id ? "opacity-100" : "opacity-0"
                                                            )
                                                          }, null, 8, ["class"]),
                                                          createVNode("div", { class: "flex flex-col" }, [
                                                            createVNode("div", { class: "flex items-center gap-2" }, [
                                                              createVNode(unref(_sfc_main$b), {
                                                                variant: "outline",
                                                                class: "font-mono text-xs"
                                                              }, {
                                                                default: withCtx(() => [
                                                                  createTextVNode(toDisplayString(customer.ewallet_id), 1)
                                                                ]),
                                                                _: 2
                                                              }, 1024),
                                                              createVNode("span", { class: "font-medium" }, toDisplayString(customer.name), 1)
                                                            ]),
                                                            createVNode("span", { class: "text-xs text-muted-foreground" }, toDisplayString(customer.email), 1)
                                                          ])
                                                        ]),
                                                        _: 2
                                                      }, 1032, ["value", "onSelect"]);
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
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$d), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$e), {
                                            modelValue: customerSearch.value,
                                            "onUpdate:modelValue": ($event) => customerSearch.value = $event,
                                            placeholder: "Cari nama, ewallet ID, atau email..."
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                          createVNode(unref(_sfc_main$f), null, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$g), null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Tidak ada pelanggan ditemukan.")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(unref(_sfc_main$h), null, {
                                                default: withCtx(() => [
                                                  (openBlock(true), createBlock(Fragment, null, renderList(filteredCustomers.value, (customer) => {
                                                    return openBlock(), createBlock(unref(_sfc_main$i), {
                                                      key: customer.id,
                                                      value: customer.name,
                                                      onSelect: () => {
                                                        unref(form).customer_id = customer.id;
                                                        customerOpen.value = false;
                                                      },
                                                      class: "flex items-center gap-2"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(unref(Check), {
                                                          class: unref(cn)(
                                                            "mr-2 h-4 w-4",
                                                            unref(form).customer_id === customer.id ? "opacity-100" : "opacity-0"
                                                          )
                                                        }, null, 8, ["class"]),
                                                        createVNode("div", { class: "flex flex-col" }, [
                                                          createVNode("div", { class: "flex items-center gap-2" }, [
                                                            createVNode(unref(_sfc_main$b), {
                                                              variant: "outline",
                                                              class: "font-mono text-xs"
                                                            }, {
                                                              default: withCtx(() => [
                                                                createTextVNode(toDisplayString(customer.ewallet_id), 1)
                                                              ]),
                                                              _: 2
                                                            }, 1024),
                                                            createVNode("span", { class: "font-medium" }, toDisplayString(customer.name), 1)
                                                          ]),
                                                          createVNode("span", { class: "text-xs text-muted-foreground" }, toDisplayString(customer.email), 1)
                                                        ])
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["value", "onSelect"]);
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
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$a), { "as-child": "" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$2), {
                                      variant: "outline",
                                      role: "combobox",
                                      "aria-expanded": customerOpen.value,
                                      class: ["w-full justify-between", { "border-destructive": unref(form).errors.customer_id }]
                                    }, {
                                      default: withCtx(() => [
                                        selectedCustomer.value ? (openBlock(), createBlock("span", {
                                          key: 0,
                                          class: "flex items-center gap-2"
                                        }, [
                                          createVNode(unref(_sfc_main$b), {
                                            variant: "secondary",
                                            class: "font-mono"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(selectedCustomer.value.ewallet_id), 1)
                                            ]),
                                            _: 1
                                          }),
                                          createTextVNode(" " + toDisplayString(selectedCustomer.value.name), 1)
                                        ])) : (openBlock(), createBlock("span", {
                                          key: 1,
                                          class: "text-muted-foreground"
                                        }, "Pilih pelanggan...")),
                                        createVNode(unref(ChevronsUpDown), { class: "ml-2 h-4 w-4 shrink-0 opacity-50" })
                                      ]),
                                      _: 1
                                    }, 8, ["aria-expanded", "class"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), { class: "w-[400px] p-0" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$d), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$e), {
                                          modelValue: customerSearch.value,
                                          "onUpdate:modelValue": ($event) => customerSearch.value = $event,
                                          placeholder: "Cari nama, ewallet ID, atau email..."
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                        createVNode(unref(_sfc_main$f), null, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$g), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Tidak ada pelanggan ditemukan.")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$h), null, {
                                              default: withCtx(() => [
                                                (openBlock(true), createBlock(Fragment, null, renderList(filteredCustomers.value, (customer) => {
                                                  return openBlock(), createBlock(unref(_sfc_main$i), {
                                                    key: customer.id,
                                                    value: customer.name,
                                                    onSelect: () => {
                                                      unref(form).customer_id = customer.id;
                                                      customerOpen.value = false;
                                                    },
                                                    class: "flex items-center gap-2"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(Check), {
                                                        class: unref(cn)(
                                                          "mr-2 h-4 w-4",
                                                          unref(form).customer_id === customer.id ? "opacity-100" : "opacity-0"
                                                        )
                                                      }, null, 8, ["class"]),
                                                      createVNode("div", { class: "flex flex-col" }, [
                                                        createVNode("div", { class: "flex items-center gap-2" }, [
                                                          createVNode(unref(_sfc_main$b), {
                                                            variant: "outline",
                                                            class: "font-mono text-xs"
                                                          }, {
                                                            default: withCtx(() => [
                                                              createTextVNode(toDisplayString(customer.ewallet_id), 1)
                                                            ]),
                                                            _: 2
                                                          }, 1024),
                                                          createVNode("span", { class: "font-medium" }, toDisplayString(customer.name), 1)
                                                        ]),
                                                        createVNode("span", { class: "text-xs text-muted-foreground" }, toDisplayString(customer.email), 1)
                                                      ])
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["value", "onSelect"]);
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
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        if (unref(form).errors.customer_id) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.customer_id)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`<p class="text-sm text-muted-foreground"${_scopeId3}> Pilih pelanggan yang akan bertanggung jawab sebagai stokist di wilayah tertentu. </p></div>`);
                        if (selectedCustomer.value) {
                          _push4(`<div class="rounded-lg bg-muted p-4 space-y-2"${_scopeId3}><div class="flex items-center gap-2 text-sm"${_scopeId3}><span class="font-medium"${_scopeId3}>Nama:</span><span${_scopeId3}>${ssrInterpolate(selectedCustomer.value.name)}</span></div><div class="flex items-center gap-2 text-sm"${_scopeId3}><span class="font-medium"${_scopeId3}>Email:</span><span${_scopeId3}>${ssrInterpolate(selectedCustomer.value.email)}</span></div><div class="flex items-center gap-2 text-sm"${_scopeId3}><span class="font-medium"${_scopeId3}>Telepon:</span><span${_scopeId3}>${ssrInterpolate(selectedCustomer.value.phone || "-")}</span></div></div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), null, {
                              default: withCtx(() => [
                                createTextVNode("Pelanggan "),
                                createVNode("span", { class: "text-destructive" }, "*")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$9), {
                              open: customerOpen.value,
                              "onUpdate:open": ($event) => customerOpen.value = $event
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$a), { "as-child": "" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$2), {
                                      variant: "outline",
                                      role: "combobox",
                                      "aria-expanded": customerOpen.value,
                                      class: ["w-full justify-between", { "border-destructive": unref(form).errors.customer_id }]
                                    }, {
                                      default: withCtx(() => [
                                        selectedCustomer.value ? (openBlock(), createBlock("span", {
                                          key: 0,
                                          class: "flex items-center gap-2"
                                        }, [
                                          createVNode(unref(_sfc_main$b), {
                                            variant: "secondary",
                                            class: "font-mono"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(selectedCustomer.value.ewallet_id), 1)
                                            ]),
                                            _: 1
                                          }),
                                          createTextVNode(" " + toDisplayString(selectedCustomer.value.name), 1)
                                        ])) : (openBlock(), createBlock("span", {
                                          key: 1,
                                          class: "text-muted-foreground"
                                        }, "Pilih pelanggan...")),
                                        createVNode(unref(ChevronsUpDown), { class: "ml-2 h-4 w-4 shrink-0 opacity-50" })
                                      ]),
                                      _: 1
                                    }, 8, ["aria-expanded", "class"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), { class: "w-[400px] p-0" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$d), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$e), {
                                          modelValue: customerSearch.value,
                                          "onUpdate:modelValue": ($event) => customerSearch.value = $event,
                                          placeholder: "Cari nama, ewallet ID, atau email..."
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                        createVNode(unref(_sfc_main$f), null, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$g), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Tidak ada pelanggan ditemukan.")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$h), null, {
                                              default: withCtx(() => [
                                                (openBlock(true), createBlock(Fragment, null, renderList(filteredCustomers.value, (customer) => {
                                                  return openBlock(), createBlock(unref(_sfc_main$i), {
                                                    key: customer.id,
                                                    value: customer.name,
                                                    onSelect: () => {
                                                      unref(form).customer_id = customer.id;
                                                      customerOpen.value = false;
                                                    },
                                                    class: "flex items-center gap-2"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(Check), {
                                                        class: unref(cn)(
                                                          "mr-2 h-4 w-4",
                                                          unref(form).customer_id === customer.id ? "opacity-100" : "opacity-0"
                                                        )
                                                      }, null, 8, ["class"]),
                                                      createVNode("div", { class: "flex flex-col" }, [
                                                        createVNode("div", { class: "flex items-center gap-2" }, [
                                                          createVNode(unref(_sfc_main$b), {
                                                            variant: "outline",
                                                            class: "font-mono text-xs"
                                                          }, {
                                                            default: withCtx(() => [
                                                              createTextVNode(toDisplayString(customer.ewallet_id), 1)
                                                            ]),
                                                            _: 2
                                                          }, 1024),
                                                          createVNode("span", { class: "font-medium" }, toDisplayString(customer.name), 1)
                                                        ]),
                                                        createVNode("span", { class: "text-xs text-muted-foreground" }, toDisplayString(customer.email), 1)
                                                      ])
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["value", "onSelect"]);
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
                                })
                              ]),
                              _: 1
                            }, 8, ["open", "onUpdate:open"]),
                            unref(form).errors.customer_id ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.customer_id), 1)) : createCommentVNode("", true),
                            createVNode("p", { class: "text-sm text-muted-foreground" }, " Pilih pelanggan yang akan bertanggung jawab sebagai stokist di wilayah tertentu. ")
                          ]),
                          selectedCustomer.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "rounded-lg bg-muted p-4 space-y-2"
                          }, [
                            createVNode("div", { class: "flex items-center gap-2 text-sm" }, [
                              createVNode("span", { class: "font-medium" }, "Nama:"),
                              createVNode("span", null, toDisplayString(selectedCustomer.value.name), 1)
                            ]),
                            createVNode("div", { class: "flex items-center gap-2 text-sm" }, [
                              createVNode("span", { class: "font-medium" }, "Email:"),
                              createVNode("span", null, toDisplayString(selectedCustomer.value.email), 1)
                            ]),
                            createVNode("div", { class: "flex items-center gap-2 text-sm" }, [
                              createVNode("span", { class: "font-medium" }, "Telepon:"),
                              createVNode("span", null, toDisplayString(selectedCustomer.value.phone || "-"), 1)
                            ])
                          ])) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$5), { class: "flex items-center gap-2" }, {
                          default: withCtx(() => [
                            createVNode(unref(User), { class: "h-5 w-5" }),
                            createTextVNode(" Pilih Pelanggan ")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode(" Pilih pelanggan aktif yang akan dijadikan stokist. Hanya pelanggan yang belum menjadi stokist yang ditampilkan. ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              createTextVNode("Pelanggan "),
                              createVNode("span", { class: "text-destructive" }, "*")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$9), {
                            open: customerOpen.value,
                            "onUpdate:open": ($event) => customerOpen.value = $event
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$a), { "as-child": "" }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$2), {
                                    variant: "outline",
                                    role: "combobox",
                                    "aria-expanded": customerOpen.value,
                                    class: ["w-full justify-between", { "border-destructive": unref(form).errors.customer_id }]
                                  }, {
                                    default: withCtx(() => [
                                      selectedCustomer.value ? (openBlock(), createBlock("span", {
                                        key: 0,
                                        class: "flex items-center gap-2"
                                      }, [
                                        createVNode(unref(_sfc_main$b), {
                                          variant: "secondary",
                                          class: "font-mono"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(selectedCustomer.value.ewallet_id), 1)
                                          ]),
                                          _: 1
                                        }),
                                        createTextVNode(" " + toDisplayString(selectedCustomer.value.name), 1)
                                      ])) : (openBlock(), createBlock("span", {
                                        key: 1,
                                        class: "text-muted-foreground"
                                      }, "Pilih pelanggan...")),
                                      createVNode(unref(ChevronsUpDown), { class: "ml-2 h-4 w-4 shrink-0 opacity-50" })
                                    ]),
                                    _: 1
                                  }, 8, ["aria-expanded", "class"])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), { class: "w-[400px] p-0" }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$d), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$e), {
                                        modelValue: customerSearch.value,
                                        "onUpdate:modelValue": ($event) => customerSearch.value = $event,
                                        placeholder: "Cari nama, ewallet ID, atau email..."
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                      createVNode(unref(_sfc_main$f), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$g), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Tidak ada pelanggan ditemukan.")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$h), null, {
                                            default: withCtx(() => [
                                              (openBlock(true), createBlock(Fragment, null, renderList(filteredCustomers.value, (customer) => {
                                                return openBlock(), createBlock(unref(_sfc_main$i), {
                                                  key: customer.id,
                                                  value: customer.name,
                                                  onSelect: () => {
                                                    unref(form).customer_id = customer.id;
                                                    customerOpen.value = false;
                                                  },
                                                  class: "flex items-center gap-2"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(Check), {
                                                      class: unref(cn)(
                                                        "mr-2 h-4 w-4",
                                                        unref(form).customer_id === customer.id ? "opacity-100" : "opacity-0"
                                                      )
                                                    }, null, 8, ["class"]),
                                                    createVNode("div", { class: "flex flex-col" }, [
                                                      createVNode("div", { class: "flex items-center gap-2" }, [
                                                        createVNode(unref(_sfc_main$b), {
                                                          variant: "outline",
                                                          class: "font-mono text-xs"
                                                        }, {
                                                          default: withCtx(() => [
                                                            createTextVNode(toDisplayString(customer.ewallet_id), 1)
                                                          ]),
                                                          _: 2
                                                        }, 1024),
                                                        createVNode("span", { class: "font-medium" }, toDisplayString(customer.name), 1)
                                                      ]),
                                                      createVNode("span", { class: "text-xs text-muted-foreground" }, toDisplayString(customer.email), 1)
                                                    ])
                                                  ]),
                                                  _: 2
                                                }, 1032, ["value", "onSelect"]);
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
                              })
                            ]),
                            _: 1
                          }, 8, ["open", "onUpdate:open"]),
                          unref(form).errors.customer_id ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive"
                          }, toDisplayString(unref(form).errors.customer_id), 1)) : createCommentVNode("", true),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Pilih pelanggan yang akan bertanggung jawab sebagai stokist di wilayah tertentu. ")
                        ]),
                        selectedCustomer.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "rounded-lg bg-muted p-4 space-y-2"
                        }, [
                          createVNode("div", { class: "flex items-center gap-2 text-sm" }, [
                            createVNode("span", { class: "font-medium" }, "Nama:"),
                            createVNode("span", null, toDisplayString(selectedCustomer.value.name), 1)
                          ]),
                          createVNode("div", { class: "flex items-center gap-2 text-sm" }, [
                            createVNode("span", { class: "font-medium" }, "Email:"),
                            createVNode("span", null, toDisplayString(selectedCustomer.value.email), 1)
                          ]),
                          createVNode("div", { class: "flex items-center gap-2 text-sm" }, [
                            createVNode("span", { class: "font-medium" }, "Telepon:"),
                            createVNode("span", null, toDisplayString(selectedCustomer.value.phone || "-"), 1)
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
            _push2(ssrRenderComponent(unref(_sfc_main$3), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$5), { class: "flex items-center gap-2" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(MapPin), { class: "h-5 w-5" }, null, _parent5, _scopeId4));
                              _push5(` Wilayah Stokist `);
                            } else {
                              return [
                                createVNode(unref(MapPin), { class: "h-5 w-5" }),
                                createTextVNode(" Wilayah Stokist ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Tentukan kota yang akan dijadikan wilayah stokist. Setiap kota hanya dapat memiliki 1 stokist. `);
                            } else {
                              return [
                                createTextVNode(" Tentukan kota yang akan dijadikan wilayah stokist. Setiap kota hanya dapat memiliki 1 stokist. ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), { class: "flex items-center gap-2" }, {
                            default: withCtx(() => [
                              createVNode(unref(MapPin), { class: "h-5 w-5" }),
                              createTextVNode(" Wilayah Stokist ")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode(" Tentukan kota yang akan dijadikan wilayah stokist. Setiap kota hanya dapat memiliki 1 stokist. ")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { class: "space-y-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Provinsi <span class="text-destructive"${_scopeId4}>*</span>`);
                            } else {
                              return [
                                createTextVNode("Provinsi "),
                                createVNode("span", { class: "text-destructive" }, "*")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$j), {
                          modelValue: selectedProvinceId.value,
                          "onUpdate:modelValue": ($event) => selectedProvinceId.value = $event
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$k), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$l), { placeholder: "Pilih provinsi..." }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$l), { placeholder: "Pilih provinsi..." })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$m), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<!--[-->`);
                                    ssrRenderList(__props.provinces, (province) => {
                                      _push6(ssrRenderComponent(unref(_sfc_main$n), {
                                        key: province.id,
                                        value: province.id
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`${ssrInterpolate(province.name)}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString(province.name), 1)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    });
                                    _push6(`<!--]-->`);
                                  } else {
                                    return [
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.provinces, (province) => {
                                        return openBlock(), createBlock(unref(_sfc_main$n), {
                                          key: province.id,
                                          value: province.id
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
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$k), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$l), { placeholder: "Pilih provinsi..." })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$m), null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.provinces, (province) => {
                                      return openBlock(), createBlock(unref(_sfc_main$n), {
                                        key: province.id,
                                        value: province.id
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
                        }, _parent4, _scopeId3));
                        _push4(`<p class="text-sm text-muted-foreground"${_scopeId3}> Pilih provinsi terlebih dahulu untuk menampilkan daftar kabupaten/kota. </p></div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Kota <span class="text-destructive"${_scopeId4}>*</span>`);
                            } else {
                              return [
                                createTextVNode("Kota "),
                                createVNode("span", { class: "text-destructive" }, "*")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          open: cityOpen.value,
                          "onUpdate:open": ($event) => cityOpen.value = $event
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$a), { "as-child": "" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$2), {
                                      variant: "outline",
                                      role: "combobox",
                                      "aria-expanded": cityOpen.value,
                                      class: ["w-full justify-between", { "border-destructive": unref(form).errors.stockist_kabupaten_id }],
                                      disabled: !selectedProvinceId.value || loadingCities.value
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          if (loadingCities.value) {
                                            _push7(`<span class="flex items-center gap-2"${_scopeId6}>`);
                                            _push7(ssrRenderComponent(unref(Loader2), { class: "h-4 w-4 animate-spin" }, null, _parent7, _scopeId6));
                                            _push7(` Memuat... </span>`);
                                          } else if (unref(form).stockist_kabupaten_name) {
                                            _push7(`<span${_scopeId6}>${ssrInterpolate(unref(form).stockist_kabupaten_name)}</span>`);
                                          } else {
                                            _push7(`<span class="text-muted-foreground"${_scopeId6}>${ssrInterpolate(selectedProvinceId.value ? "Pilih kota..." : "Pilih provinsi terlebih dahulu")}</span>`);
                                          }
                                          _push7(ssrRenderComponent(unref(ChevronsUpDown), { class: "ml-2 h-4 w-4 shrink-0 opacity-50" }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            loadingCities.value ? (openBlock(), createBlock("span", {
                                              key: 0,
                                              class: "flex items-center gap-2"
                                            }, [
                                              createVNode(unref(Loader2), { class: "h-4 w-4 animate-spin" }),
                                              createTextVNode(" Memuat... ")
                                            ])) : unref(form).stockist_kabupaten_name ? (openBlock(), createBlock("span", { key: 1 }, toDisplayString(unref(form).stockist_kabupaten_name), 1)) : (openBlock(), createBlock("span", {
                                              key: 2,
                                              class: "text-muted-foreground"
                                            }, toDisplayString(selectedProvinceId.value ? "Pilih kota..." : "Pilih provinsi terlebih dahulu"), 1)),
                                            createVNode(unref(ChevronsUpDown), { class: "ml-2 h-4 w-4 shrink-0 opacity-50" })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$2), {
                                        variant: "outline",
                                        role: "combobox",
                                        "aria-expanded": cityOpen.value,
                                        class: ["w-full justify-between", { "border-destructive": unref(form).errors.stockist_kabupaten_id }],
                                        disabled: !selectedProvinceId.value || loadingCities.value
                                      }, {
                                        default: withCtx(() => [
                                          loadingCities.value ? (openBlock(), createBlock("span", {
                                            key: 0,
                                            class: "flex items-center gap-2"
                                          }, [
                                            createVNode(unref(Loader2), { class: "h-4 w-4 animate-spin" }),
                                            createTextVNode(" Memuat... ")
                                          ])) : unref(form).stockist_kabupaten_name ? (openBlock(), createBlock("span", { key: 1 }, toDisplayString(unref(form).stockist_kabupaten_name), 1)) : (openBlock(), createBlock("span", {
                                            key: 2,
                                            class: "text-muted-foreground"
                                          }, toDisplayString(selectedProvinceId.value ? "Pilih kota..." : "Pilih provinsi terlebih dahulu"), 1)),
                                          createVNode(unref(ChevronsUpDown), { class: "ml-2 h-4 w-4 shrink-0 opacity-50" })
                                        ]),
                                        _: 1
                                      }, 8, ["aria-expanded", "class", "disabled"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), { class: "w-[400px] p-0" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$d), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(unref(_sfc_main$e), { placeholder: "Cari kota..." }, null, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(unref(_sfc_main$f), null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(unref(_sfc_main$g), null, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`Tidak ada kota ditemukan.`);
                                                    } else {
                                                      return [
                                                        createTextVNode("Tidak ada kota ditemukan.")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(unref(_sfc_main$h), null, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`<!--[-->`);
                                                      ssrRenderList(citiesList.value, (city) => {
                                                        _push9(ssrRenderComponent(unref(_sfc_main$i), {
                                                          key: city.id,
                                                          value: city.name,
                                                          disabled: isKabupatenAssigned(city.id),
                                                          onSelect: () => handleCitySelect(city),
                                                          class: "flex items-center justify-between"
                                                        }, {
                                                          default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                            if (_push10) {
                                                              _push10(`<div class="flex items-center gap-2"${_scopeId9}>`);
                                                              _push10(ssrRenderComponent(unref(Check), {
                                                                class: unref(cn)(
                                                                  "mr-2 h-4 w-4",
                                                                  unref(form).stockist_kabupaten_id === city.id ? "opacity-100" : "opacity-0"
                                                                )
                                                              }, null, _parent10, _scopeId9));
                                                              _push10(`<span${_scopeId9}>${ssrInterpolate(city.name)}</span></div>`);
                                                              if (isKabupatenAssigned(city.id)) {
                                                                _push10(ssrRenderComponent(unref(_sfc_main$b), {
                                                                  variant: "secondary",
                                                                  class: "text-xs"
                                                                }, {
                                                                  default: withCtx((_10, _push11, _parent11, _scopeId10) => {
                                                                    if (_push11) {
                                                                      _push11(` Sudah ada stokist `);
                                                                    } else {
                                                                      return [
                                                                        createTextVNode(" Sudah ada stokist ")
                                                                      ];
                                                                    }
                                                                  }),
                                                                  _: 2
                                                                }, _parent10, _scopeId9));
                                                              } else {
                                                                _push10(`<!---->`);
                                                              }
                                                            } else {
                                                              return [
                                                                createVNode("div", { class: "flex items-center gap-2" }, [
                                                                  createVNode(unref(Check), {
                                                                    class: unref(cn)(
                                                                      "mr-2 h-4 w-4",
                                                                      unref(form).stockist_kabupaten_id === city.id ? "opacity-100" : "opacity-0"
                                                                    )
                                                                  }, null, 8, ["class"]),
                                                                  createVNode("span", null, toDisplayString(city.name), 1)
                                                                ]),
                                                                isKabupatenAssigned(city.id) ? (openBlock(), createBlock(unref(_sfc_main$b), {
                                                                  key: 0,
                                                                  variant: "secondary",
                                                                  class: "text-xs"
                                                                }, {
                                                                  default: withCtx(() => [
                                                                    createTextVNode(" Sudah ada stokist ")
                                                                  ]),
                                                                  _: 1
                                                                })) : createCommentVNode("", true)
                                                              ];
                                                            }
                                                          }),
                                                          _: 2
                                                        }, _parent9, _scopeId8));
                                                      });
                                                      _push9(`<!--]-->`);
                                                    } else {
                                                      return [
                                                        (openBlock(true), createBlock(Fragment, null, renderList(citiesList.value, (city) => {
                                                          return openBlock(), createBlock(unref(_sfc_main$i), {
                                                            key: city.id,
                                                            value: city.name,
                                                            disabled: isKabupatenAssigned(city.id),
                                                            onSelect: () => handleCitySelect(city),
                                                            class: "flex items-center justify-between"
                                                          }, {
                                                            default: withCtx(() => [
                                                              createVNode("div", { class: "flex items-center gap-2" }, [
                                                                createVNode(unref(Check), {
                                                                  class: unref(cn)(
                                                                    "mr-2 h-4 w-4",
                                                                    unref(form).stockist_kabupaten_id === city.id ? "opacity-100" : "opacity-0"
                                                                  )
                                                                }, null, 8, ["class"]),
                                                                createVNode("span", null, toDisplayString(city.name), 1)
                                                              ]),
                                                              isKabupatenAssigned(city.id) ? (openBlock(), createBlock(unref(_sfc_main$b), {
                                                                key: 0,
                                                                variant: "secondary",
                                                                class: "text-xs"
                                                              }, {
                                                                default: withCtx(() => [
                                                                  createTextVNode(" Sudah ada stokist ")
                                                                ]),
                                                                _: 1
                                                              })) : createCommentVNode("", true)
                                                            ]),
                                                            _: 2
                                                          }, 1032, ["value", "disabled", "onSelect"]);
                                                        }), 128))
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(unref(_sfc_main$g), null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Tidak ada kota ditemukan.")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(unref(_sfc_main$h), null, {
                                                    default: withCtx(() => [
                                                      (openBlock(true), createBlock(Fragment, null, renderList(citiesList.value, (city) => {
                                                        return openBlock(), createBlock(unref(_sfc_main$i), {
                                                          key: city.id,
                                                          value: city.name,
                                                          disabled: isKabupatenAssigned(city.id),
                                                          onSelect: () => handleCitySelect(city),
                                                          class: "flex items-center justify-between"
                                                        }, {
                                                          default: withCtx(() => [
                                                            createVNode("div", { class: "flex items-center gap-2" }, [
                                                              createVNode(unref(Check), {
                                                                class: unref(cn)(
                                                                  "mr-2 h-4 w-4",
                                                                  unref(form).stockist_kabupaten_id === city.id ? "opacity-100" : "opacity-0"
                                                                )
                                                              }, null, 8, ["class"]),
                                                              createVNode("span", null, toDisplayString(city.name), 1)
                                                            ]),
                                                            isKabupatenAssigned(city.id) ? (openBlock(), createBlock(unref(_sfc_main$b), {
                                                              key: 0,
                                                              variant: "secondary",
                                                              class: "text-xs"
                                                            }, {
                                                              default: withCtx(() => [
                                                                createTextVNode(" Sudah ada stokist ")
                                                              ]),
                                                              _: 1
                                                            })) : createCommentVNode("", true)
                                                          ]),
                                                          _: 2
                                                        }, 1032, ["value", "disabled", "onSelect"]);
                                                      }), 128))
                                                    ]),
                                                    _: 1
                                                  })
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(unref(_sfc_main$e), { placeholder: "Cari kota..." }),
                                            createVNode(unref(_sfc_main$f), null, {
                                              default: withCtx(() => [
                                                createVNode(unref(_sfc_main$g), null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Tidak ada kota ditemukan.")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(unref(_sfc_main$h), null, {
                                                  default: withCtx(() => [
                                                    (openBlock(true), createBlock(Fragment, null, renderList(citiesList.value, (city) => {
                                                      return openBlock(), createBlock(unref(_sfc_main$i), {
                                                        key: city.id,
                                                        value: city.name,
                                                        disabled: isKabupatenAssigned(city.id),
                                                        onSelect: () => handleCitySelect(city),
                                                        class: "flex items-center justify-between"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode("div", { class: "flex items-center gap-2" }, [
                                                            createVNode(unref(Check), {
                                                              class: unref(cn)(
                                                                "mr-2 h-4 w-4",
                                                                unref(form).stockist_kabupaten_id === city.id ? "opacity-100" : "opacity-0"
                                                              )
                                                            }, null, 8, ["class"]),
                                                            createVNode("span", null, toDisplayString(city.name), 1)
                                                          ]),
                                                          isKabupatenAssigned(city.id) ? (openBlock(), createBlock(unref(_sfc_main$b), {
                                                            key: 0,
                                                            variant: "secondary",
                                                            class: "text-xs"
                                                          }, {
                                                            default: withCtx(() => [
                                                              createTextVNode(" Sudah ada stokist ")
                                                            ]),
                                                            _: 1
                                                          })) : createCommentVNode("", true)
                                                        ]),
                                                        _: 2
                                                      }, 1032, ["value", "disabled", "onSelect"]);
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
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$d), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$e), { placeholder: "Cari kota..." }),
                                          createVNode(unref(_sfc_main$f), null, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$g), null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Tidak ada kota ditemukan.")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(unref(_sfc_main$h), null, {
                                                default: withCtx(() => [
                                                  (openBlock(true), createBlock(Fragment, null, renderList(citiesList.value, (city) => {
                                                    return openBlock(), createBlock(unref(_sfc_main$i), {
                                                      key: city.id,
                                                      value: city.name,
                                                      disabled: isKabupatenAssigned(city.id),
                                                      onSelect: () => handleCitySelect(city),
                                                      class: "flex items-center justify-between"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode("div", { class: "flex items-center gap-2" }, [
                                                          createVNode(unref(Check), {
                                                            class: unref(cn)(
                                                              "mr-2 h-4 w-4",
                                                              unref(form).stockist_kabupaten_id === city.id ? "opacity-100" : "opacity-0"
                                                            )
                                                          }, null, 8, ["class"]),
                                                          createVNode("span", null, toDisplayString(city.name), 1)
                                                        ]),
                                                        isKabupatenAssigned(city.id) ? (openBlock(), createBlock(unref(_sfc_main$b), {
                                                          key: 0,
                                                          variant: "secondary",
                                                          class: "text-xs"
                                                        }, {
                                                          default: withCtx(() => [
                                                            createTextVNode(" Sudah ada stokist ")
                                                          ]),
                                                          _: 1
                                                        })) : createCommentVNode("", true)
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["value", "disabled", "onSelect"]);
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
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$a), { "as-child": "" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$2), {
                                      variant: "outline",
                                      role: "combobox",
                                      "aria-expanded": cityOpen.value,
                                      class: ["w-full justify-between", { "border-destructive": unref(form).errors.stockist_kabupaten_id }],
                                      disabled: !selectedProvinceId.value || loadingCities.value
                                    }, {
                                      default: withCtx(() => [
                                        loadingCities.value ? (openBlock(), createBlock("span", {
                                          key: 0,
                                          class: "flex items-center gap-2"
                                        }, [
                                          createVNode(unref(Loader2), { class: "h-4 w-4 animate-spin" }),
                                          createTextVNode(" Memuat... ")
                                        ])) : unref(form).stockist_kabupaten_name ? (openBlock(), createBlock("span", { key: 1 }, toDisplayString(unref(form).stockist_kabupaten_name), 1)) : (openBlock(), createBlock("span", {
                                          key: 2,
                                          class: "text-muted-foreground"
                                        }, toDisplayString(selectedProvinceId.value ? "Pilih kota..." : "Pilih provinsi terlebih dahulu"), 1)),
                                        createVNode(unref(ChevronsUpDown), { class: "ml-2 h-4 w-4 shrink-0 opacity-50" })
                                      ]),
                                      _: 1
                                    }, 8, ["aria-expanded", "class", "disabled"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), { class: "w-[400px] p-0" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$d), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$e), { placeholder: "Cari kota..." }),
                                        createVNode(unref(_sfc_main$f), null, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$g), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Tidak ada kota ditemukan.")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$h), null, {
                                              default: withCtx(() => [
                                                (openBlock(true), createBlock(Fragment, null, renderList(citiesList.value, (city) => {
                                                  return openBlock(), createBlock(unref(_sfc_main$i), {
                                                    key: city.id,
                                                    value: city.name,
                                                    disabled: isKabupatenAssigned(city.id),
                                                    onSelect: () => handleCitySelect(city),
                                                    class: "flex items-center justify-between"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode("div", { class: "flex items-center gap-2" }, [
                                                        createVNode(unref(Check), {
                                                          class: unref(cn)(
                                                            "mr-2 h-4 w-4",
                                                            unref(form).stockist_kabupaten_id === city.id ? "opacity-100" : "opacity-0"
                                                          )
                                                        }, null, 8, ["class"]),
                                                        createVNode("span", null, toDisplayString(city.name), 1)
                                                      ]),
                                                      isKabupatenAssigned(city.id) ? (openBlock(), createBlock(unref(_sfc_main$b), {
                                                        key: 0,
                                                        variant: "secondary",
                                                        class: "text-xs"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(" Sudah ada stokist ")
                                                        ]),
                                                        _: 1
                                                      })) : createCommentVNode("", true)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["value", "disabled", "onSelect"]);
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
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        if (unref(form).errors.stockist_kabupaten_id) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.stockist_kabupaten_id)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`<p class="text-sm text-muted-foreground"${_scopeId3}> Kota yang sudah memiliki stokist akan ditandai dan tidak dapat dipilih. </p></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), null, {
                              default: withCtx(() => [
                                createTextVNode("Provinsi "),
                                createVNode("span", { class: "text-destructive" }, "*")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$j), {
                              modelValue: selectedProvinceId.value,
                              "onUpdate:modelValue": ($event) => selectedProvinceId.value = $event
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$k), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$l), { placeholder: "Pilih provinsi..." })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$m), null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.provinces, (province) => {
                                      return openBlock(), createBlock(unref(_sfc_main$n), {
                                        key: province.id,
                                        value: province.id
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
                            }, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode("p", { class: "text-sm text-muted-foreground" }, " Pilih provinsi terlebih dahulu untuk menampilkan daftar kabupaten/kota. ")
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), null, {
                              default: withCtx(() => [
                                createTextVNode("Kota "),
                                createVNode("span", { class: "text-destructive" }, "*")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$9), {
                              open: cityOpen.value,
                              "onUpdate:open": ($event) => cityOpen.value = $event
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$a), { "as-child": "" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$2), {
                                      variant: "outline",
                                      role: "combobox",
                                      "aria-expanded": cityOpen.value,
                                      class: ["w-full justify-between", { "border-destructive": unref(form).errors.stockist_kabupaten_id }],
                                      disabled: !selectedProvinceId.value || loadingCities.value
                                    }, {
                                      default: withCtx(() => [
                                        loadingCities.value ? (openBlock(), createBlock("span", {
                                          key: 0,
                                          class: "flex items-center gap-2"
                                        }, [
                                          createVNode(unref(Loader2), { class: "h-4 w-4 animate-spin" }),
                                          createTextVNode(" Memuat... ")
                                        ])) : unref(form).stockist_kabupaten_name ? (openBlock(), createBlock("span", { key: 1 }, toDisplayString(unref(form).stockist_kabupaten_name), 1)) : (openBlock(), createBlock("span", {
                                          key: 2,
                                          class: "text-muted-foreground"
                                        }, toDisplayString(selectedProvinceId.value ? "Pilih kota..." : "Pilih provinsi terlebih dahulu"), 1)),
                                        createVNode(unref(ChevronsUpDown), { class: "ml-2 h-4 w-4 shrink-0 opacity-50" })
                                      ]),
                                      _: 1
                                    }, 8, ["aria-expanded", "class", "disabled"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), { class: "w-[400px] p-0" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$d), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$e), { placeholder: "Cari kota..." }),
                                        createVNode(unref(_sfc_main$f), null, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$g), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Tidak ada kota ditemukan.")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$h), null, {
                                              default: withCtx(() => [
                                                (openBlock(true), createBlock(Fragment, null, renderList(citiesList.value, (city) => {
                                                  return openBlock(), createBlock(unref(_sfc_main$i), {
                                                    key: city.id,
                                                    value: city.name,
                                                    disabled: isKabupatenAssigned(city.id),
                                                    onSelect: () => handleCitySelect(city),
                                                    class: "flex items-center justify-between"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode("div", { class: "flex items-center gap-2" }, [
                                                        createVNode(unref(Check), {
                                                          class: unref(cn)(
                                                            "mr-2 h-4 w-4",
                                                            unref(form).stockist_kabupaten_id === city.id ? "opacity-100" : "opacity-0"
                                                          )
                                                        }, null, 8, ["class"]),
                                                        createVNode("span", null, toDisplayString(city.name), 1)
                                                      ]),
                                                      isKabupatenAssigned(city.id) ? (openBlock(), createBlock(unref(_sfc_main$b), {
                                                        key: 0,
                                                        variant: "secondary",
                                                        class: "text-xs"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(" Sudah ada stokist ")
                                                        ]),
                                                        _: 1
                                                      })) : createCommentVNode("", true)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["value", "disabled", "onSelect"]);
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
                                })
                              ]),
                              _: 1
                            }, 8, ["open", "onUpdate:open"]),
                            unref(form).errors.stockist_kabupaten_id ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.stockist_kabupaten_id), 1)) : createCommentVNode("", true),
                            createVNode("p", { class: "text-sm text-muted-foreground" }, " Kota yang sudah memiliki stokist akan ditandai dan tidak dapat dipilih. ")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$5), { class: "flex items-center gap-2" }, {
                          default: withCtx(() => [
                            createVNode(unref(MapPin), { class: "h-5 w-5" }),
                            createTextVNode(" Wilayah Stokist ")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode(" Tentukan kota yang akan dijadikan wilayah stokist. Setiap kota hanya dapat memiliki 1 stokist. ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              createTextVNode("Provinsi "),
                              createVNode("span", { class: "text-destructive" }, "*")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$j), {
                            modelValue: selectedProvinceId.value,
                            "onUpdate:modelValue": ($event) => selectedProvinceId.value = $event
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$k), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$l), { placeholder: "Pilih provinsi..." })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$m), null, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.provinces, (province) => {
                                    return openBlock(), createBlock(unref(_sfc_main$n), {
                                      key: province.id,
                                      value: province.id
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
                          }, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Pilih provinsi terlebih dahulu untuk menampilkan daftar kabupaten/kota. ")
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              createTextVNode("Kota "),
                              createVNode("span", { class: "text-destructive" }, "*")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$9), {
                            open: cityOpen.value,
                            "onUpdate:open": ($event) => cityOpen.value = $event
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$a), { "as-child": "" }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$2), {
                                    variant: "outline",
                                    role: "combobox",
                                    "aria-expanded": cityOpen.value,
                                    class: ["w-full justify-between", { "border-destructive": unref(form).errors.stockist_kabupaten_id }],
                                    disabled: !selectedProvinceId.value || loadingCities.value
                                  }, {
                                    default: withCtx(() => [
                                      loadingCities.value ? (openBlock(), createBlock("span", {
                                        key: 0,
                                        class: "flex items-center gap-2"
                                      }, [
                                        createVNode(unref(Loader2), { class: "h-4 w-4 animate-spin" }),
                                        createTextVNode(" Memuat... ")
                                      ])) : unref(form).stockist_kabupaten_name ? (openBlock(), createBlock("span", { key: 1 }, toDisplayString(unref(form).stockist_kabupaten_name), 1)) : (openBlock(), createBlock("span", {
                                        key: 2,
                                        class: "text-muted-foreground"
                                      }, toDisplayString(selectedProvinceId.value ? "Pilih kota..." : "Pilih provinsi terlebih dahulu"), 1)),
                                      createVNode(unref(ChevronsUpDown), { class: "ml-2 h-4 w-4 shrink-0 opacity-50" })
                                    ]),
                                    _: 1
                                  }, 8, ["aria-expanded", "class", "disabled"])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), { class: "w-[400px] p-0" }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$d), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$e), { placeholder: "Cari kota..." }),
                                      createVNode(unref(_sfc_main$f), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$g), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Tidak ada kota ditemukan.")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$h), null, {
                                            default: withCtx(() => [
                                              (openBlock(true), createBlock(Fragment, null, renderList(citiesList.value, (city) => {
                                                return openBlock(), createBlock(unref(_sfc_main$i), {
                                                  key: city.id,
                                                  value: city.name,
                                                  disabled: isKabupatenAssigned(city.id),
                                                  onSelect: () => handleCitySelect(city),
                                                  class: "flex items-center justify-between"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode("div", { class: "flex items-center gap-2" }, [
                                                      createVNode(unref(Check), {
                                                        class: unref(cn)(
                                                          "mr-2 h-4 w-4",
                                                          unref(form).stockist_kabupaten_id === city.id ? "opacity-100" : "opacity-0"
                                                        )
                                                      }, null, 8, ["class"]),
                                                      createVNode("span", null, toDisplayString(city.name), 1)
                                                    ]),
                                                    isKabupatenAssigned(city.id) ? (openBlock(), createBlock(unref(_sfc_main$b), {
                                                      key: 0,
                                                      variant: "secondary",
                                                      class: "text-xs"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(" Sudah ada stokist ")
                                                      ]),
                                                      _: 1
                                                    })) : createCommentVNode("", true)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["value", "disabled", "onSelect"]);
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
                              })
                            ]),
                            _: 1
                          }, 8, ["open", "onUpdate:open"]),
                          unref(form).errors.stockist_kabupaten_id ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive"
                          }, toDisplayString(unref(form).errors.stockist_kabupaten_id), 1)) : createCommentVNode("", true),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Kota yang sudah memiliki stokist akan ditandai dan tidak dapat dipilih. ")
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950"${_scopeId}><div class="flex items-start gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(AlertCircle), { class: "h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" }, null, _parent2, _scopeId));
            _push2(`<div class="text-sm text-blue-700 dark:text-blue-300"${_scopeId}><p class="font-medium"${_scopeId}>Informasi</p><p class="mt-1"${_scopeId}> Setelah pelanggan dijadikan stokist, mereka akan bertanggung jawab atas distribusi produk di wilayah kota yang ditentukan. Setiap kota hanya dapat memiliki 1 stokist aktif. </p></div></div></div><div class="flex items-center gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              type: "submit",
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Store), { class: "mr-2 h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(` ${ssrInterpolate(unref(form).processing ? "Menyimpan..." : "Simpan Stokist")}`);
                } else {
                  return [
                    createVNode(unref(Store), { class: "mr-2 h-4 w-4" }),
                    createTextVNode(" " + toDisplayString(unref(form).processing ? "Menyimpan..." : "Simpan Stokist"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(index).url()
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$2), {
                    variant: "outline",
                    type: "button"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Batal`);
                      } else {
                        return [
                          createTextVNode("Batal")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$2), {
                      variant: "outline",
                      type: "button"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Batal")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Tambah Stokist" }),
              createVNode("div", { class: "rounded-xl p-4 space-y-6 py-6" }, [
                createVNode("div", { class: "mb-6 flex items-center gap-4" }, [
                  createVNode(unref(Link), {
                    href: unref(index).url()
                  }, {
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
                  }, 8, ["href"]),
                  createVNode("div", null, [
                    createVNode("h1", { class: "text-3xl font-bold tracking-tight" }, "Tambah Stokist"),
                    createVNode("p", { class: "text-muted-foreground" }, " Pilih pelanggan dan tentukan kabupaten/kota untuk dijadikan stokist ")
                  ])
                ]),
                createVNode("form", {
                  onSubmit: withModifiers(submit, ["prevent"]),
                  class: "space-y-6 max-w-2xl"
                }, [
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$4), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$5), { class: "flex items-center gap-2" }, {
                            default: withCtx(() => [
                              createVNode(unref(User), { class: "h-5 w-5" }),
                              createTextVNode(" Pilih Pelanggan ")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode(" Pilih pelanggan aktif yang akan dijadikan stokist. Hanya pelanggan yang belum menjadi stokist yang ditampilkan. ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), null, {
                              default: withCtx(() => [
                                createTextVNode("Pelanggan "),
                                createVNode("span", { class: "text-destructive" }, "*")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$9), {
                              open: customerOpen.value,
                              "onUpdate:open": ($event) => customerOpen.value = $event
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$a), { "as-child": "" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$2), {
                                      variant: "outline",
                                      role: "combobox",
                                      "aria-expanded": customerOpen.value,
                                      class: ["w-full justify-between", { "border-destructive": unref(form).errors.customer_id }]
                                    }, {
                                      default: withCtx(() => [
                                        selectedCustomer.value ? (openBlock(), createBlock("span", {
                                          key: 0,
                                          class: "flex items-center gap-2"
                                        }, [
                                          createVNode(unref(_sfc_main$b), {
                                            variant: "secondary",
                                            class: "font-mono"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(selectedCustomer.value.ewallet_id), 1)
                                            ]),
                                            _: 1
                                          }),
                                          createTextVNode(" " + toDisplayString(selectedCustomer.value.name), 1)
                                        ])) : (openBlock(), createBlock("span", {
                                          key: 1,
                                          class: "text-muted-foreground"
                                        }, "Pilih pelanggan...")),
                                        createVNode(unref(ChevronsUpDown), { class: "ml-2 h-4 w-4 shrink-0 opacity-50" })
                                      ]),
                                      _: 1
                                    }, 8, ["aria-expanded", "class"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), { class: "w-[400px] p-0" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$d), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$e), {
                                          modelValue: customerSearch.value,
                                          "onUpdate:modelValue": ($event) => customerSearch.value = $event,
                                          placeholder: "Cari nama, ewallet ID, atau email..."
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                        createVNode(unref(_sfc_main$f), null, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$g), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Tidak ada pelanggan ditemukan.")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$h), null, {
                                              default: withCtx(() => [
                                                (openBlock(true), createBlock(Fragment, null, renderList(filteredCustomers.value, (customer) => {
                                                  return openBlock(), createBlock(unref(_sfc_main$i), {
                                                    key: customer.id,
                                                    value: customer.name,
                                                    onSelect: () => {
                                                      unref(form).customer_id = customer.id;
                                                      customerOpen.value = false;
                                                    },
                                                    class: "flex items-center gap-2"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(Check), {
                                                        class: unref(cn)(
                                                          "mr-2 h-4 w-4",
                                                          unref(form).customer_id === customer.id ? "opacity-100" : "opacity-0"
                                                        )
                                                      }, null, 8, ["class"]),
                                                      createVNode("div", { class: "flex flex-col" }, [
                                                        createVNode("div", { class: "flex items-center gap-2" }, [
                                                          createVNode(unref(_sfc_main$b), {
                                                            variant: "outline",
                                                            class: "font-mono text-xs"
                                                          }, {
                                                            default: withCtx(() => [
                                                              createTextVNode(toDisplayString(customer.ewallet_id), 1)
                                                            ]),
                                                            _: 2
                                                          }, 1024),
                                                          createVNode("span", { class: "font-medium" }, toDisplayString(customer.name), 1)
                                                        ]),
                                                        createVNode("span", { class: "text-xs text-muted-foreground" }, toDisplayString(customer.email), 1)
                                                      ])
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["value", "onSelect"]);
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
                                })
                              ]),
                              _: 1
                            }, 8, ["open", "onUpdate:open"]),
                            unref(form).errors.customer_id ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.customer_id), 1)) : createCommentVNode("", true),
                            createVNode("p", { class: "text-sm text-muted-foreground" }, " Pilih pelanggan yang akan bertanggung jawab sebagai stokist di wilayah tertentu. ")
                          ]),
                          selectedCustomer.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "rounded-lg bg-muted p-4 space-y-2"
                          }, [
                            createVNode("div", { class: "flex items-center gap-2 text-sm" }, [
                              createVNode("span", { class: "font-medium" }, "Nama:"),
                              createVNode("span", null, toDisplayString(selectedCustomer.value.name), 1)
                            ]),
                            createVNode("div", { class: "flex items-center gap-2 text-sm" }, [
                              createVNode("span", { class: "font-medium" }, "Email:"),
                              createVNode("span", null, toDisplayString(selectedCustomer.value.email), 1)
                            ]),
                            createVNode("div", { class: "flex items-center gap-2 text-sm" }, [
                              createVNode("span", { class: "font-medium" }, "Telepon:"),
                              createVNode("span", null, toDisplayString(selectedCustomer.value.phone || "-"), 1)
                            ])
                          ])) : createCommentVNode("", true)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$4), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$5), { class: "flex items-center gap-2" }, {
                            default: withCtx(() => [
                              createVNode(unref(MapPin), { class: "h-5 w-5" }),
                              createTextVNode(" Wilayah Stokist ")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode(" Tentukan kota yang akan dijadikan wilayah stokist. Setiap kota hanya dapat memiliki 1 stokist. ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), null, {
                              default: withCtx(() => [
                                createTextVNode("Provinsi "),
                                createVNode("span", { class: "text-destructive" }, "*")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$j), {
                              modelValue: selectedProvinceId.value,
                              "onUpdate:modelValue": ($event) => selectedProvinceId.value = $event
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$k), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$l), { placeholder: "Pilih provinsi..." })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$m), null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.provinces, (province) => {
                                      return openBlock(), createBlock(unref(_sfc_main$n), {
                                        key: province.id,
                                        value: province.id
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
                            }, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode("p", { class: "text-sm text-muted-foreground" }, " Pilih provinsi terlebih dahulu untuk menampilkan daftar kabupaten/kota. ")
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), null, {
                              default: withCtx(() => [
                                createTextVNode("Kota "),
                                createVNode("span", { class: "text-destructive" }, "*")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$9), {
                              open: cityOpen.value,
                              "onUpdate:open": ($event) => cityOpen.value = $event
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$a), { "as-child": "" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$2), {
                                      variant: "outline",
                                      role: "combobox",
                                      "aria-expanded": cityOpen.value,
                                      class: ["w-full justify-between", { "border-destructive": unref(form).errors.stockist_kabupaten_id }],
                                      disabled: !selectedProvinceId.value || loadingCities.value
                                    }, {
                                      default: withCtx(() => [
                                        loadingCities.value ? (openBlock(), createBlock("span", {
                                          key: 0,
                                          class: "flex items-center gap-2"
                                        }, [
                                          createVNode(unref(Loader2), { class: "h-4 w-4 animate-spin" }),
                                          createTextVNode(" Memuat... ")
                                        ])) : unref(form).stockist_kabupaten_name ? (openBlock(), createBlock("span", { key: 1 }, toDisplayString(unref(form).stockist_kabupaten_name), 1)) : (openBlock(), createBlock("span", {
                                          key: 2,
                                          class: "text-muted-foreground"
                                        }, toDisplayString(selectedProvinceId.value ? "Pilih kota..." : "Pilih provinsi terlebih dahulu"), 1)),
                                        createVNode(unref(ChevronsUpDown), { class: "ml-2 h-4 w-4 shrink-0 opacity-50" })
                                      ]),
                                      _: 1
                                    }, 8, ["aria-expanded", "class", "disabled"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), { class: "w-[400px] p-0" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$d), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$e), { placeholder: "Cari kota..." }),
                                        createVNode(unref(_sfc_main$f), null, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$g), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Tidak ada kota ditemukan.")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$h), null, {
                                              default: withCtx(() => [
                                                (openBlock(true), createBlock(Fragment, null, renderList(citiesList.value, (city) => {
                                                  return openBlock(), createBlock(unref(_sfc_main$i), {
                                                    key: city.id,
                                                    value: city.name,
                                                    disabled: isKabupatenAssigned(city.id),
                                                    onSelect: () => handleCitySelect(city),
                                                    class: "flex items-center justify-between"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode("div", { class: "flex items-center gap-2" }, [
                                                        createVNode(unref(Check), {
                                                          class: unref(cn)(
                                                            "mr-2 h-4 w-4",
                                                            unref(form).stockist_kabupaten_id === city.id ? "opacity-100" : "opacity-0"
                                                          )
                                                        }, null, 8, ["class"]),
                                                        createVNode("span", null, toDisplayString(city.name), 1)
                                                      ]),
                                                      isKabupatenAssigned(city.id) ? (openBlock(), createBlock(unref(_sfc_main$b), {
                                                        key: 0,
                                                        variant: "secondary",
                                                        class: "text-xs"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(" Sudah ada stokist ")
                                                        ]),
                                                        _: 1
                                                      })) : createCommentVNode("", true)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["value", "disabled", "onSelect"]);
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
                                })
                              ]),
                              _: 1
                            }, 8, ["open", "onUpdate:open"]),
                            unref(form).errors.stockist_kabupaten_id ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.stockist_kabupaten_id), 1)) : createCommentVNode("", true),
                            createVNode("p", { class: "text-sm text-muted-foreground" }, " Kota yang sudah memiliki stokist akan ditandai dan tidak dapat dipilih. ")
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950" }, [
                    createVNode("div", { class: "flex items-start gap-3" }, [
                      createVNode(unref(AlertCircle), { class: "h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" }),
                      createVNode("div", { class: "text-sm text-blue-700 dark:text-blue-300" }, [
                        createVNode("p", { class: "font-medium" }, "Informasi"),
                        createVNode("p", { class: "mt-1" }, " Setelah pelanggan dijadikan stokist, mereka akan bertanggung jawab atas distribusi produk di wilayah kota yang ditentukan. Setiap kota hanya dapat memiliki 1 stokist aktif. ")
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "flex items-center gap-4" }, [
                    createVNode(unref(_sfc_main$2), {
                      type: "submit",
                      disabled: unref(form).processing
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Store), { class: "mr-2 h-4 w-4" }),
                        createTextVNode(" " + toDisplayString(unref(form).processing ? "Menyimpan..." : "Simpan Stokist"), 1)
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    createVNode(unref(Link), {
                      href: unref(index).url()
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$2), {
                          variant: "outline",
                          type: "button"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Batal")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ])
                ], 32)
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Stockists/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
