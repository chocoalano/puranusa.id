import { defineComponent, ref, computed, unref, withCtx, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, toDisplayString, withDirectives, vModelText, Fragment, renderList, vModelRadio, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseEqual } from "vue/server-renderer";
import { useForm, Head, Link, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1, i as index, f as findPosition, s as store } from "./AppLayout-B1qpBBmK.js";
import { _ as _sfc_main$2 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$9 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$8 } from "./Label-16aMY2sx.js";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5, d as _sfc_main$6, c as _sfc_main$7 } from "./CardTitle-sqUG0LTw.js";
import { ArrowLeft, Search } from "lucide-vue-next";
import { toast } from "vue-sonner";
import "class-variance-authority";
import "./DropdownMenuTrigger-B1v6pHML.js";
import "reka-ui";
import "@vueuse/core";
import "./index-D9uuAIUh.js";
import "./AvatarImage-DWFQMckn.js";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
import "clsx";
import "tailwind-merge";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    customers: {},
    suggestedPosition: {}
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      name: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
      sponsor_id: props.suggestedPosition?.sponsor_id || null,
      upline_id: props.suggestedPosition?.upline_id || null,
      preferred_position: props.suggestedPosition?.position || "left",
      registration_amount: 1e5,
      description: ""
    });
    const searchSponsor = ref("");
    const searchUpline = ref("");
    const showSponsorDropdown = ref(false);
    const showUplineDropdown = ref(false);
    const selectedSponsor = computed(() => {
      return props.customers.find((c) => c.id === form.sponsor_id);
    });
    const selectedUpline = computed(() => {
      return props.customers.find((c) => c.id === form.upline_id);
    });
    const filteredSponsors = computed(() => {
      if (!searchSponsor.value) return props.customers;
      const query = searchSponsor.value.toLowerCase();
      return props.customers.filter(
        (c) => c.name.toLowerCase().includes(query) || c.ewallet_id.toLowerCase().includes(query)
      );
    });
    const filteredUplines = computed(() => {
      if (!searchUpline.value) return props.customers;
      const query = searchUpline.value.toLowerCase();
      return props.customers.filter(
        (c) => c.name.toLowerCase().includes(query) || c.ewallet_id.toLowerCase().includes(query)
      );
    });
    const selectSponsor = (customer) => {
      form.sponsor_id = customer.id;
      showSponsorDropdown.value = false;
      searchSponsor.value = "";
    };
    const selectUpline = (customer) => {
      form.upline_id = customer.id;
      showUplineDropdown.value = false;
      searchUpline.value = "";
    };
    const handleSponsorBlur = () => {
      if (typeof window !== "undefined") {
        window.setTimeout(() => {
          showSponsorDropdown.value = false;
        }, 200);
      }
    };
    const handleUplineBlur = () => {
      if (typeof window !== "undefined") {
        window.setTimeout(() => {
          showUplineDropdown.value = false;
        }, 200);
      }
    };
    const suggestPosition = () => {
      if (!form.sponsor_id) {
        toast.error("Pilih sponsor terlebih dahulu");
        return;
      }
      router.get(
        findPosition.url(),
        { sponsor_id: form.sponsor_id },
        {
          preserveState: true,
          onSuccess: (page) => {
            const suggested = page.props.suggestedPosition;
            if (suggested) {
              form.upline_id = suggested.upline_id;
              form.preferred_position = suggested.position;
              toast.success("Posisi disarankan berhasil dimuat");
            }
          },
          onError: () => {
            toast.error("Gagal mendapatkan saran posisi");
          }
        }
      );
    };
    const submit = () => {
      form.post(store.url(), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Pelanggan berhasil didaftarkan");
        },
        onError: () => {
          toast.error("Gagal mendaftarkan pelanggan");
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Tambah Pelanggan" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="rounded-xl p-4 space-y-6 py-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="text-3xl font-bold"${_scopeId}>Tambah Pelanggan</h1><p class="mt-2 text-muted-foreground"${_scopeId}> Daftarkan pelanggan baru ke dalam sistem MLM </p></div>`);
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
            _push2(`</div><form class="space-y-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$3), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Informasi Pribadi`);
                            } else {
                              return [
                                createTextVNode("Informasi Pribadi")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Data pribadi pelanggan yang akan didaftarkan `);
                            } else {
                              return [
                                createTextVNode(" Data pribadi pelanggan yang akan didaftarkan ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Informasi Pribadi")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode(" Data pribadi pelanggan yang akan didaftarkan ")
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
                        _push4(`<div class="grid gap-4 md:grid-cols-2"${_scopeId3}><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { for: "name" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Nama Lengkap *`);
                            } else {
                              return [
                                createTextVNode("Nama Lengkap *")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          id: "name",
                          modelValue: unref(form).name,
                          "onUpdate:modelValue": ($event) => unref(form).name = $event,
                          placeholder: "Masukkan nama lengkap",
                          required: ""
                        }, null, _parent4, _scopeId3));
                        if (unref(form).errors.name) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.name)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { for: "email" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Email *`);
                            } else {
                              return [
                                createTextVNode("Email *")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          id: "email",
                          modelValue: unref(form).email,
                          "onUpdate:modelValue": ($event) => unref(form).email = $event,
                          type: "email",
                          placeholder: "nama@email.com",
                          required: ""
                        }, null, _parent4, _scopeId3));
                        if (unref(form).errors.email) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.email)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { for: "phone" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`No. Telepon`);
                            } else {
                              return [
                                createTextVNode("No. Telepon")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          id: "phone",
                          modelValue: unref(form).phone,
                          "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                          placeholder: "08xxxxxxxxxx"
                        }, null, _parent4, _scopeId3));
                        if (unref(form).errors.phone) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.phone)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { for: "registration_amount" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Biaya Registrasi *`);
                            } else {
                              return [
                                createTextVNode("Biaya Registrasi *")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          id: "registration_amount",
                          modelValue: unref(form).registration_amount,
                          "onUpdate:modelValue": ($event) => unref(form).registration_amount = $event,
                          modelModifiers: { number: true },
                          type: "number",
                          min: "0",
                          step: "1000",
                          required: ""
                        }, null, _parent4, _scopeId3));
                        if (unref(form).errors.registration_amount) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.registration_amount)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { for: "password" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Password *`);
                            } else {
                              return [
                                createTextVNode("Password *")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          id: "password",
                          modelValue: unref(form).password,
                          "onUpdate:modelValue": ($event) => unref(form).password = $event,
                          type: "password",
                          placeholder: "Minimal 8 karakter",
                          required: ""
                        }, null, _parent4, _scopeId3));
                        if (unref(form).errors.password) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.password)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { for: "password_confirmation" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Konfirmasi Password *`);
                            } else {
                              return [
                                createTextVNode("Konfirmasi Password *")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          id: "password_confirmation",
                          modelValue: unref(form).password_confirmation,
                          "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                          type: "password",
                          placeholder: "Ulangi password",
                          required: ""
                        }, null, _parent4, _scopeId3));
                        _push4(`</div></div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { for: "description" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Keterangan`);
                            } else {
                              return [
                                createTextVNode("Keterangan")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<textarea id="description" placeholder="Keterangan tambahan (opsional)" rows="3" class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"${_scopeId3}>${ssrInterpolate(unref(form).description)}</textarea></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$8), { for: "name" }, {
                                default: withCtx(() => [
                                  createTextVNode("Nama Lengkap *")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$9), {
                                id: "name",
                                modelValue: unref(form).name,
                                "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                placeholder: "Masukkan nama lengkap",
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              unref(form).errors.name ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.name), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$8), { for: "email" }, {
                                default: withCtx(() => [
                                  createTextVNode("Email *")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$9), {
                                id: "email",
                                modelValue: unref(form).email,
                                "onUpdate:modelValue": ($event) => unref(form).email = $event,
                                type: "email",
                                placeholder: "nama@email.com",
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              unref(form).errors.email ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.email), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$8), { for: "phone" }, {
                                default: withCtx(() => [
                                  createTextVNode("No. Telepon")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$9), {
                                id: "phone",
                                modelValue: unref(form).phone,
                                "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                                placeholder: "08xxxxxxxxxx"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              unref(form).errors.phone ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.phone), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$8), { for: "registration_amount" }, {
                                default: withCtx(() => [
                                  createTextVNode("Biaya Registrasi *")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$9), {
                                id: "registration_amount",
                                modelValue: unref(form).registration_amount,
                                "onUpdate:modelValue": ($event) => unref(form).registration_amount = $event,
                                modelModifiers: { number: true },
                                type: "number",
                                min: "0",
                                step: "1000",
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              unref(form).errors.registration_amount ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.registration_amount), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$8), { for: "password" }, {
                                default: withCtx(() => [
                                  createTextVNode("Password *")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$9), {
                                id: "password",
                                modelValue: unref(form).password,
                                "onUpdate:modelValue": ($event) => unref(form).password = $event,
                                type: "password",
                                placeholder: "Minimal 8 karakter",
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              unref(form).errors.password ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.password), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$8), { for: "password_confirmation" }, {
                                default: withCtx(() => [
                                  createTextVNode("Konfirmasi Password *")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$9), {
                                id: "password_confirmation",
                                modelValue: unref(form).password_confirmation,
                                "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                                type: "password",
                                placeholder: "Ulangi password",
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "description" }, {
                              default: withCtx(() => [
                                createTextVNode("Keterangan")
                              ]),
                              _: 1
                            }),
                            withDirectives(createVNode("textarea", {
                              id: "description",
                              "onUpdate:modelValue": ($event) => unref(form).description = $event,
                              placeholder: "Keterangan tambahan (opsional)",
                              rows: "3",
                              class: "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).description]
                            ])
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
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Informasi Pribadi")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode(" Data pribadi pelanggan yang akan didaftarkan ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "name" }, {
                              default: withCtx(() => [
                                createTextVNode("Nama Lengkap *")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$9), {
                              id: "name",
                              modelValue: unref(form).name,
                              "onUpdate:modelValue": ($event) => unref(form).name = $event,
                              placeholder: "Masukkan nama lengkap",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            unref(form).errors.name ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.name), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "email" }, {
                              default: withCtx(() => [
                                createTextVNode("Email *")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$9), {
                              id: "email",
                              modelValue: unref(form).email,
                              "onUpdate:modelValue": ($event) => unref(form).email = $event,
                              type: "email",
                              placeholder: "nama@email.com",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            unref(form).errors.email ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.email), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "phone" }, {
                              default: withCtx(() => [
                                createTextVNode("No. Telepon")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$9), {
                              id: "phone",
                              modelValue: unref(form).phone,
                              "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                              placeholder: "08xxxxxxxxxx"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            unref(form).errors.phone ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.phone), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "registration_amount" }, {
                              default: withCtx(() => [
                                createTextVNode("Biaya Registrasi *")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$9), {
                              id: "registration_amount",
                              modelValue: unref(form).registration_amount,
                              "onUpdate:modelValue": ($event) => unref(form).registration_amount = $event,
                              modelModifiers: { number: true },
                              type: "number",
                              min: "0",
                              step: "1000",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            unref(form).errors.registration_amount ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.registration_amount), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "password" }, {
                              default: withCtx(() => [
                                createTextVNode("Password *")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$9), {
                              id: "password",
                              modelValue: unref(form).password,
                              "onUpdate:modelValue": ($event) => unref(form).password = $event,
                              type: "password",
                              placeholder: "Minimal 8 karakter",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            unref(form).errors.password ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.password), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "password_confirmation" }, {
                              default: withCtx(() => [
                                createTextVNode("Konfirmasi Password *")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$9), {
                              id: "password_confirmation",
                              modelValue: unref(form).password_confirmation,
                              "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                              type: "password",
                              placeholder: "Ulangi password",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$8), { for: "description" }, {
                            default: withCtx(() => [
                              createTextVNode("Keterangan")
                            ]),
                            _: 1
                          }),
                          withDirectives(createVNode("textarea", {
                            id: "description",
                            "onUpdate:modelValue": ($event) => unref(form).description = $event,
                            placeholder: "Keterangan tambahan (opsional)",
                            rows: "3",
                            class: "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).description]
                          ])
                        ])
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
                        _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Struktur Jaringan MLM`);
                            } else {
                              return [
                                createTextVNode("Struktur Jaringan MLM")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Pilih sponsor dan posisi dalam binary tree `);
                            } else {
                              return [
                                createTextVNode(" Pilih sponsor dan posisi dalam binary tree ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Struktur Jaringan MLM")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode(" Pilih sponsor dan posisi dalam binary tree ")
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
                        _push4(`<div class="grid gap-4 md:grid-cols-2"${_scopeId3}><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { for: "sponsor" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Sponsor *`);
                            } else {
                              return [
                                createTextVNode("Sponsor *")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<div class="relative"${_scopeId3}><div class="flex gap-2"${_scopeId3}><div class="relative flex-1"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          modelValue: searchSponsor.value,
                          "onUpdate:modelValue": ($event) => searchSponsor.value = $event,
                          onFocus: ($event) => showSponsorDropdown.value = true,
                          onBlur: handleSponsorBlur,
                          placeholder: "Cari sponsor..."
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(Search), { class: "absolute right-3 top-3 h-4 w-4 text-muted-foreground" }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$2), {
                          type: "button",
                          variant: "outline",
                          onClick: suggestPosition,
                          disabled: !unref(form).sponsor_id
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Sarankan Posisi `);
                            } else {
                              return [
                                createTextVNode(" Sarankan Posisi ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                        if (showSponsorDropdown.value && filteredSponsors.value.length > 0) {
                          _push4(`<div class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-1 shadow-md"${_scopeId3}><!--[-->`);
                          ssrRenderList(filteredSponsors.value, (customer) => {
                            _push4(`<button type="button" class="w-full rounded px-3 py-2 text-left text-sm hover:bg-accent"${_scopeId3}><div class="font-medium"${_scopeId3}>${ssrInterpolate(customer.name)}</div><div class="text-xs text-muted-foreground"${_scopeId3}>${ssrInterpolate(customer.ewallet_id)}</div></button>`);
                          });
                          _push4(`<!--]--></div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div>`);
                        if (selectedSponsor.value) {
                          _push4(`<div class="mt-2 rounded-md border bg-muted p-3"${_scopeId3}><p class="text-sm font-medium"${_scopeId3}>${ssrInterpolate(selectedSponsor.value.name)}</p><p class="text-xs text-muted-foreground"${_scopeId3}>${ssrInterpolate(selectedSponsor.value.ewallet_id)}</p></div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        if (unref(form).errors.sponsor_id) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.sponsor_id)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { for: "upline" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Upline *`);
                            } else {
                              return [
                                createTextVNode("Upline *")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<div class="relative"${_scopeId3}><div class="relative"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          modelValue: searchUpline.value,
                          "onUpdate:modelValue": ($event) => searchUpline.value = $event,
                          onFocus: ($event) => showUplineDropdown.value = true,
                          onBlur: handleUplineBlur,
                          placeholder: "Cari upline..."
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(Search), { class: "absolute right-3 top-3 h-4 w-4 text-muted-foreground" }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                        if (showUplineDropdown.value && filteredUplines.value.length > 0) {
                          _push4(`<div class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-1 shadow-md"${_scopeId3}><!--[-->`);
                          ssrRenderList(filteredUplines.value, (customer) => {
                            _push4(`<button type="button" class="w-full rounded px-3 py-2 text-left text-sm hover:bg-accent"${_scopeId3}><div class="font-medium"${_scopeId3}>${ssrInterpolate(customer.name)}</div><div class="text-xs text-muted-foreground"${_scopeId3}>${ssrInterpolate(customer.ewallet_id)}</div></button>`);
                          });
                          _push4(`<!--]--></div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div>`);
                        if (selectedUpline.value) {
                          _push4(`<div class="mt-2 rounded-md border bg-muted p-3"${_scopeId3}><p class="text-sm font-medium"${_scopeId3}>${ssrInterpolate(selectedUpline.value.name)}</p><p class="text-xs text-muted-foreground"${_scopeId3}>${ssrInterpolate(selectedUpline.value.ewallet_id)}</p></div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        if (unref(form).errors.upline_id) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.upline_id)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div></div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Posisi Pilihan *`);
                            } else {
                              return [
                                createTextVNode("Posisi Pilihan *")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<div class="flex gap-4"${_scopeId3}><div class="flex items-center space-x-2"${_scopeId3}><input type="radio" value="left" id="left"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(form).preferred_position, "left")) ? " checked" : ""} class="h-4 w-4 border-gray-300 text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), {
                          for: "left",
                          class: "cursor-pointer font-normal"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Kiri `);
                            } else {
                              return [
                                createTextVNode(" Kiri ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div><div class="flex items-center space-x-2"${_scopeId3}><input type="radio" value="right" id="right"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(form).preferred_position, "right")) ? " checked" : ""} class="h-4 w-4 border-gray-300 text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), {
                          for: "right",
                          class: "cursor-pointer font-normal"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Kanan `);
                            } else {
                              return [
                                createTextVNode(" Kanan ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div></div>`);
                        if (unref(form).errors.preferred_position) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.preferred_position)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div>`);
                        if (props.suggestedPosition) {
                          _push4(`<div class="rounded-lg border-2 border-dashed border-primary/20 bg-primary/5 p-4"${_scopeId3}><p class="text-sm font-medium text-primary"${_scopeId3}> 💡 Posisi yang disarankan telah dimuat </p><p class="mt-1 text-xs text-muted-foreground"${_scopeId3}> Upline dan posisi telah diatur sesuai ketersediaan dalam binary tree </p></div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$8), { for: "sponsor" }, {
                                default: withCtx(() => [
                                  createTextVNode("Sponsor *")
                                ]),
                                _: 1
                              }),
                              createVNode("div", { class: "relative" }, [
                                createVNode("div", { class: "flex gap-2" }, [
                                  createVNode("div", { class: "relative flex-1" }, [
                                    createVNode(unref(_sfc_main$9), {
                                      modelValue: searchSponsor.value,
                                      "onUpdate:modelValue": ($event) => searchSponsor.value = $event,
                                      onFocus: ($event) => showSponsorDropdown.value = true,
                                      onBlur: handleSponsorBlur,
                                      placeholder: "Cari sponsor..."
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "onFocus"]),
                                    createVNode(unref(Search), { class: "absolute right-3 top-3 h-4 w-4 text-muted-foreground" })
                                  ]),
                                  createVNode(unref(_sfc_main$2), {
                                    type: "button",
                                    variant: "outline",
                                    onClick: suggestPosition,
                                    disabled: !unref(form).sponsor_id
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Sarankan Posisi ")
                                    ]),
                                    _: 1
                                  }, 8, ["disabled"])
                                ]),
                                showSponsorDropdown.value && filteredSponsors.value.length > 0 ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-1 shadow-md"
                                }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(filteredSponsors.value, (customer) => {
                                    return openBlock(), createBlock("button", {
                                      key: customer.id,
                                      type: "button",
                                      onClick: ($event) => selectSponsor(customer),
                                      class: "w-full rounded px-3 py-2 text-left text-sm hover:bg-accent"
                                    }, [
                                      createVNode("div", { class: "font-medium" }, toDisplayString(customer.name), 1),
                                      createVNode("div", { class: "text-xs text-muted-foreground" }, toDisplayString(customer.ewallet_id), 1)
                                    ], 8, ["onClick"]);
                                  }), 128))
                                ])) : createCommentVNode("", true)
                              ]),
                              selectedSponsor.value ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mt-2 rounded-md border bg-muted p-3"
                              }, [
                                createVNode("p", { class: "text-sm font-medium" }, toDisplayString(selectedSponsor.value.name), 1),
                                createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(selectedSponsor.value.ewallet_id), 1)
                              ])) : createCommentVNode("", true),
                              unref(form).errors.sponsor_id ? (openBlock(), createBlock("p", {
                                key: 1,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.sponsor_id), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$8), { for: "upline" }, {
                                default: withCtx(() => [
                                  createTextVNode("Upline *")
                                ]),
                                _: 1
                              }),
                              createVNode("div", { class: "relative" }, [
                                createVNode("div", { class: "relative" }, [
                                  createVNode(unref(_sfc_main$9), {
                                    modelValue: searchUpline.value,
                                    "onUpdate:modelValue": ($event) => searchUpline.value = $event,
                                    onFocus: ($event) => showUplineDropdown.value = true,
                                    onBlur: handleUplineBlur,
                                    placeholder: "Cari upline..."
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onFocus"]),
                                  createVNode(unref(Search), { class: "absolute right-3 top-3 h-4 w-4 text-muted-foreground" })
                                ]),
                                showUplineDropdown.value && filteredUplines.value.length > 0 ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-1 shadow-md"
                                }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(filteredUplines.value, (customer) => {
                                    return openBlock(), createBlock("button", {
                                      key: customer.id,
                                      type: "button",
                                      onClick: ($event) => selectUpline(customer),
                                      class: "w-full rounded px-3 py-2 text-left text-sm hover:bg-accent"
                                    }, [
                                      createVNode("div", { class: "font-medium" }, toDisplayString(customer.name), 1),
                                      createVNode("div", { class: "text-xs text-muted-foreground" }, toDisplayString(customer.ewallet_id), 1)
                                    ], 8, ["onClick"]);
                                  }), 128))
                                ])) : createCommentVNode("", true)
                              ]),
                              selectedUpline.value ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mt-2 rounded-md border bg-muted p-3"
                              }, [
                                createVNode("p", { class: "text-sm font-medium" }, toDisplayString(selectedUpline.value.name), 1),
                                createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(selectedUpline.value.ewallet_id), 1)
                              ])) : createCommentVNode("", true),
                              unref(form).errors.upline_id ? (openBlock(), createBlock("p", {
                                key: 1,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.upline_id), 1)) : createCommentVNode("", true)
                            ])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), null, {
                              default: withCtx(() => [
                                createTextVNode("Posisi Pilihan *")
                              ]),
                              _: 1
                            }),
                            createVNode("div", { class: "flex gap-4" }, [
                              createVNode("div", { class: "flex items-center space-x-2" }, [
                                withDirectives(createVNode("input", {
                                  type: "radio",
                                  value: "left",
                                  id: "left",
                                  "onUpdate:modelValue": ($event) => unref(form).preferred_position = $event,
                                  class: "h-4 w-4 border-gray-300 text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelRadio, unref(form).preferred_position]
                                ]),
                                createVNode(unref(_sfc_main$8), {
                                  for: "left",
                                  class: "cursor-pointer font-normal"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Kiri ")
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode("div", { class: "flex items-center space-x-2" }, [
                                withDirectives(createVNode("input", {
                                  type: "radio",
                                  value: "right",
                                  id: "right",
                                  "onUpdate:modelValue": ($event) => unref(form).preferred_position = $event,
                                  class: "h-4 w-4 border-gray-300 text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelRadio, unref(form).preferred_position]
                                ]),
                                createVNode(unref(_sfc_main$8), {
                                  for: "right",
                                  class: "cursor-pointer font-normal"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Kanan ")
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            unref(form).errors.preferred_position ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.preferred_position), 1)) : createCommentVNode("", true)
                          ]),
                          props.suggestedPosition ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "rounded-lg border-2 border-dashed border-primary/20 bg-primary/5 p-4"
                          }, [
                            createVNode("p", { class: "text-sm font-medium text-primary" }, " 💡 Posisi yang disarankan telah dimuat "),
                            createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, " Upline dan posisi telah diatur sesuai ketersediaan dalam binary tree ")
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
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Struktur Jaringan MLM")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode(" Pilih sponsor dan posisi dalam binary tree ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "sponsor" }, {
                              default: withCtx(() => [
                                createTextVNode("Sponsor *")
                              ]),
                              _: 1
                            }),
                            createVNode("div", { class: "relative" }, [
                              createVNode("div", { class: "flex gap-2" }, [
                                createVNode("div", { class: "relative flex-1" }, [
                                  createVNode(unref(_sfc_main$9), {
                                    modelValue: searchSponsor.value,
                                    "onUpdate:modelValue": ($event) => searchSponsor.value = $event,
                                    onFocus: ($event) => showSponsorDropdown.value = true,
                                    onBlur: handleSponsorBlur,
                                    placeholder: "Cari sponsor..."
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onFocus"]),
                                  createVNode(unref(Search), { class: "absolute right-3 top-3 h-4 w-4 text-muted-foreground" })
                                ]),
                                createVNode(unref(_sfc_main$2), {
                                  type: "button",
                                  variant: "outline",
                                  onClick: suggestPosition,
                                  disabled: !unref(form).sponsor_id
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Sarankan Posisi ")
                                  ]),
                                  _: 1
                                }, 8, ["disabled"])
                              ]),
                              showSponsorDropdown.value && filteredSponsors.value.length > 0 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-1 shadow-md"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(filteredSponsors.value, (customer) => {
                                  return openBlock(), createBlock("button", {
                                    key: customer.id,
                                    type: "button",
                                    onClick: ($event) => selectSponsor(customer),
                                    class: "w-full rounded px-3 py-2 text-left text-sm hover:bg-accent"
                                  }, [
                                    createVNode("div", { class: "font-medium" }, toDisplayString(customer.name), 1),
                                    createVNode("div", { class: "text-xs text-muted-foreground" }, toDisplayString(customer.ewallet_id), 1)
                                  ], 8, ["onClick"]);
                                }), 128))
                              ])) : createCommentVNode("", true)
                            ]),
                            selectedSponsor.value ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-2 rounded-md border bg-muted p-3"
                            }, [
                              createVNode("p", { class: "text-sm font-medium" }, toDisplayString(selectedSponsor.value.name), 1),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(selectedSponsor.value.ewallet_id), 1)
                            ])) : createCommentVNode("", true),
                            unref(form).errors.sponsor_id ? (openBlock(), createBlock("p", {
                              key: 1,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.sponsor_id), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "upline" }, {
                              default: withCtx(() => [
                                createTextVNode("Upline *")
                              ]),
                              _: 1
                            }),
                            createVNode("div", { class: "relative" }, [
                              createVNode("div", { class: "relative" }, [
                                createVNode(unref(_sfc_main$9), {
                                  modelValue: searchUpline.value,
                                  "onUpdate:modelValue": ($event) => searchUpline.value = $event,
                                  onFocus: ($event) => showUplineDropdown.value = true,
                                  onBlur: handleUplineBlur,
                                  placeholder: "Cari upline..."
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "onFocus"]),
                                createVNode(unref(Search), { class: "absolute right-3 top-3 h-4 w-4 text-muted-foreground" })
                              ]),
                              showUplineDropdown.value && filteredUplines.value.length > 0 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-1 shadow-md"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(filteredUplines.value, (customer) => {
                                  return openBlock(), createBlock("button", {
                                    key: customer.id,
                                    type: "button",
                                    onClick: ($event) => selectUpline(customer),
                                    class: "w-full rounded px-3 py-2 text-left text-sm hover:bg-accent"
                                  }, [
                                    createVNode("div", { class: "font-medium" }, toDisplayString(customer.name), 1),
                                    createVNode("div", { class: "text-xs text-muted-foreground" }, toDisplayString(customer.ewallet_id), 1)
                                  ], 8, ["onClick"]);
                                }), 128))
                              ])) : createCommentVNode("", true)
                            ]),
                            selectedUpline.value ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-2 rounded-md border bg-muted p-3"
                            }, [
                              createVNode("p", { class: "text-sm font-medium" }, toDisplayString(selectedUpline.value.name), 1),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(selectedUpline.value.ewallet_id), 1)
                            ])) : createCommentVNode("", true),
                            unref(form).errors.upline_id ? (openBlock(), createBlock("p", {
                              key: 1,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.upline_id), 1)) : createCommentVNode("", true)
                          ])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              createTextVNode("Posisi Pilihan *")
                            ]),
                            _: 1
                          }),
                          createVNode("div", { class: "flex gap-4" }, [
                            createVNode("div", { class: "flex items-center space-x-2" }, [
                              withDirectives(createVNode("input", {
                                type: "radio",
                                value: "left",
                                id: "left",
                                "onUpdate:modelValue": ($event) => unref(form).preferred_position = $event,
                                class: "h-4 w-4 border-gray-300 text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelRadio, unref(form).preferred_position]
                              ]),
                              createVNode(unref(_sfc_main$8), {
                                for: "left",
                                class: "cursor-pointer font-normal"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Kiri ")
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("div", { class: "flex items-center space-x-2" }, [
                              withDirectives(createVNode("input", {
                                type: "radio",
                                value: "right",
                                id: "right",
                                "onUpdate:modelValue": ($event) => unref(form).preferred_position = $event,
                                class: "h-4 w-4 border-gray-300 text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelRadio, unref(form).preferred_position]
                              ]),
                              createVNode(unref(_sfc_main$8), {
                                for: "right",
                                class: "cursor-pointer font-normal"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Kanan ")
                                ]),
                                _: 1
                              })
                            ])
                          ]),
                          unref(form).errors.preferred_position ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive"
                          }, toDisplayString(unref(form).errors.preferred_position), 1)) : createCommentVNode("", true)
                        ]),
                        props.suggestedPosition ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "rounded-lg border-2 border-dashed border-primary/20 bg-primary/5 p-4"
                        }, [
                          createVNode("p", { class: "text-sm font-medium text-primary" }, " 💡 Posisi yang disarankan telah dimuat "),
                          createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, " Upline dan posisi telah diatur sesuai ketersediaan dalam binary tree ")
                        ])) : createCommentVNode("", true)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="flex justify-end gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(index).url()
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$2), {
                    type: "button",
                    variant: "outline"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Batal `);
                      } else {
                        return [
                          createTextVNode(" Batal ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
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
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              type: "submit",
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(form).processing ? "Menyimpan..." : "Simpan Pelanggan")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(form).processing ? "Menyimpan..." : "Simpan Pelanggan"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form></div>`);
          } else {
            return [
              createVNode("div", { class: "rounded-xl p-4 space-y-6 py-6" }, [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("div", null, [
                    createVNode("h1", { class: "text-3xl font-bold" }, "Tambah Pelanggan"),
                    createVNode("p", { class: "mt-2 text-muted-foreground" }, " Daftarkan pelanggan baru ke dalam sistem MLM ")
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
                createVNode("form", {
                  onSubmit: withModifiers(submit, ["prevent"]),
                  class: "space-y-6"
                }, [
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$4), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Informasi Pribadi")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode(" Data pribadi pelanggan yang akan didaftarkan ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$8), { for: "name" }, {
                                default: withCtx(() => [
                                  createTextVNode("Nama Lengkap *")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$9), {
                                id: "name",
                                modelValue: unref(form).name,
                                "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                placeholder: "Masukkan nama lengkap",
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              unref(form).errors.name ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.name), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$8), { for: "email" }, {
                                default: withCtx(() => [
                                  createTextVNode("Email *")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$9), {
                                id: "email",
                                modelValue: unref(form).email,
                                "onUpdate:modelValue": ($event) => unref(form).email = $event,
                                type: "email",
                                placeholder: "nama@email.com",
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              unref(form).errors.email ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.email), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$8), { for: "phone" }, {
                                default: withCtx(() => [
                                  createTextVNode("No. Telepon")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$9), {
                                id: "phone",
                                modelValue: unref(form).phone,
                                "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                                placeholder: "08xxxxxxxxxx"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              unref(form).errors.phone ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.phone), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$8), { for: "registration_amount" }, {
                                default: withCtx(() => [
                                  createTextVNode("Biaya Registrasi *")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$9), {
                                id: "registration_amount",
                                modelValue: unref(form).registration_amount,
                                "onUpdate:modelValue": ($event) => unref(form).registration_amount = $event,
                                modelModifiers: { number: true },
                                type: "number",
                                min: "0",
                                step: "1000",
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              unref(form).errors.registration_amount ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.registration_amount), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$8), { for: "password" }, {
                                default: withCtx(() => [
                                  createTextVNode("Password *")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$9), {
                                id: "password",
                                modelValue: unref(form).password,
                                "onUpdate:modelValue": ($event) => unref(form).password = $event,
                                type: "password",
                                placeholder: "Minimal 8 karakter",
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              unref(form).errors.password ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.password), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$8), { for: "password_confirmation" }, {
                                default: withCtx(() => [
                                  createTextVNode("Konfirmasi Password *")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$9), {
                                id: "password_confirmation",
                                modelValue: unref(form).password_confirmation,
                                "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                                type: "password",
                                placeholder: "Ulangi password",
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "description" }, {
                              default: withCtx(() => [
                                createTextVNode("Keterangan")
                              ]),
                              _: 1
                            }),
                            withDirectives(createVNode("textarea", {
                              id: "description",
                              "onUpdate:modelValue": ($event) => unref(form).description = $event,
                              placeholder: "Keterangan tambahan (opsional)",
                              rows: "3",
                              class: "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).description]
                            ])
                          ])
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
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Struktur Jaringan MLM")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode(" Pilih sponsor dan posisi dalam binary tree ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$8), { for: "sponsor" }, {
                                default: withCtx(() => [
                                  createTextVNode("Sponsor *")
                                ]),
                                _: 1
                              }),
                              createVNode("div", { class: "relative" }, [
                                createVNode("div", { class: "flex gap-2" }, [
                                  createVNode("div", { class: "relative flex-1" }, [
                                    createVNode(unref(_sfc_main$9), {
                                      modelValue: searchSponsor.value,
                                      "onUpdate:modelValue": ($event) => searchSponsor.value = $event,
                                      onFocus: ($event) => showSponsorDropdown.value = true,
                                      onBlur: handleSponsorBlur,
                                      placeholder: "Cari sponsor..."
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "onFocus"]),
                                    createVNode(unref(Search), { class: "absolute right-3 top-3 h-4 w-4 text-muted-foreground" })
                                  ]),
                                  createVNode(unref(_sfc_main$2), {
                                    type: "button",
                                    variant: "outline",
                                    onClick: suggestPosition,
                                    disabled: !unref(form).sponsor_id
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Sarankan Posisi ")
                                    ]),
                                    _: 1
                                  }, 8, ["disabled"])
                                ]),
                                showSponsorDropdown.value && filteredSponsors.value.length > 0 ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-1 shadow-md"
                                }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(filteredSponsors.value, (customer) => {
                                    return openBlock(), createBlock("button", {
                                      key: customer.id,
                                      type: "button",
                                      onClick: ($event) => selectSponsor(customer),
                                      class: "w-full rounded px-3 py-2 text-left text-sm hover:bg-accent"
                                    }, [
                                      createVNode("div", { class: "font-medium" }, toDisplayString(customer.name), 1),
                                      createVNode("div", { class: "text-xs text-muted-foreground" }, toDisplayString(customer.ewallet_id), 1)
                                    ], 8, ["onClick"]);
                                  }), 128))
                                ])) : createCommentVNode("", true)
                              ]),
                              selectedSponsor.value ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mt-2 rounded-md border bg-muted p-3"
                              }, [
                                createVNode("p", { class: "text-sm font-medium" }, toDisplayString(selectedSponsor.value.name), 1),
                                createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(selectedSponsor.value.ewallet_id), 1)
                              ])) : createCommentVNode("", true),
                              unref(form).errors.sponsor_id ? (openBlock(), createBlock("p", {
                                key: 1,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.sponsor_id), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$8), { for: "upline" }, {
                                default: withCtx(() => [
                                  createTextVNode("Upline *")
                                ]),
                                _: 1
                              }),
                              createVNode("div", { class: "relative" }, [
                                createVNode("div", { class: "relative" }, [
                                  createVNode(unref(_sfc_main$9), {
                                    modelValue: searchUpline.value,
                                    "onUpdate:modelValue": ($event) => searchUpline.value = $event,
                                    onFocus: ($event) => showUplineDropdown.value = true,
                                    onBlur: handleUplineBlur,
                                    placeholder: "Cari upline..."
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onFocus"]),
                                  createVNode(unref(Search), { class: "absolute right-3 top-3 h-4 w-4 text-muted-foreground" })
                                ]),
                                showUplineDropdown.value && filteredUplines.value.length > 0 ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-1 shadow-md"
                                }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(filteredUplines.value, (customer) => {
                                    return openBlock(), createBlock("button", {
                                      key: customer.id,
                                      type: "button",
                                      onClick: ($event) => selectUpline(customer),
                                      class: "w-full rounded px-3 py-2 text-left text-sm hover:bg-accent"
                                    }, [
                                      createVNode("div", { class: "font-medium" }, toDisplayString(customer.name), 1),
                                      createVNode("div", { class: "text-xs text-muted-foreground" }, toDisplayString(customer.ewallet_id), 1)
                                    ], 8, ["onClick"]);
                                  }), 128))
                                ])) : createCommentVNode("", true)
                              ]),
                              selectedUpline.value ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mt-2 rounded-md border bg-muted p-3"
                              }, [
                                createVNode("p", { class: "text-sm font-medium" }, toDisplayString(selectedUpline.value.name), 1),
                                createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(selectedUpline.value.ewallet_id), 1)
                              ])) : createCommentVNode("", true),
                              unref(form).errors.upline_id ? (openBlock(), createBlock("p", {
                                key: 1,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.upline_id), 1)) : createCommentVNode("", true)
                            ])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), null, {
                              default: withCtx(() => [
                                createTextVNode("Posisi Pilihan *")
                              ]),
                              _: 1
                            }),
                            createVNode("div", { class: "flex gap-4" }, [
                              createVNode("div", { class: "flex items-center space-x-2" }, [
                                withDirectives(createVNode("input", {
                                  type: "radio",
                                  value: "left",
                                  id: "left",
                                  "onUpdate:modelValue": ($event) => unref(form).preferred_position = $event,
                                  class: "h-4 w-4 border-gray-300 text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelRadio, unref(form).preferred_position]
                                ]),
                                createVNode(unref(_sfc_main$8), {
                                  for: "left",
                                  class: "cursor-pointer font-normal"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Kiri ")
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode("div", { class: "flex items-center space-x-2" }, [
                                withDirectives(createVNode("input", {
                                  type: "radio",
                                  value: "right",
                                  id: "right",
                                  "onUpdate:modelValue": ($event) => unref(form).preferred_position = $event,
                                  class: "h-4 w-4 border-gray-300 text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelRadio, unref(form).preferred_position]
                                ]),
                                createVNode(unref(_sfc_main$8), {
                                  for: "right",
                                  class: "cursor-pointer font-normal"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Kanan ")
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            unref(form).errors.preferred_position ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.preferred_position), 1)) : createCommentVNode("", true)
                          ]),
                          props.suggestedPosition ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "rounded-lg border-2 border-dashed border-primary/20 bg-primary/5 p-4"
                          }, [
                            createVNode("p", { class: "text-sm font-medium text-primary" }, " 💡 Posisi yang disarankan telah dimuat "),
                            createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, " Upline dan posisi telah diatur sesuai ketersediaan dalam binary tree ")
                          ])) : createCommentVNode("", true)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "flex justify-end gap-4" }, [
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
                      disabled: unref(form).processing
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(form).processing ? "Menyimpan..." : "Simpan Pelanggan"), 1)
                      ]),
                      _: 1
                    }, 8, ["disabled"])
                  ])
                ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Customers/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
