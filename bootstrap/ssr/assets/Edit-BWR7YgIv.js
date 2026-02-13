import { defineComponent, computed, ref, unref, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, createCommentVNode, withDirectives, vModelText, Fragment, renderList, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1, i as index, u as update } from "./AppLayout-D11fLPDM.js";
import { _ as _sfc_main$2 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$a } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$9 } from "./Label-16aMY2sx.js";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5, d as _sfc_main$6, c as _sfc_main$8 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$7 } from "./index-BpQimeTM.js";
import { _ as _sfc_main$b, a as _sfc_main$c, b as _sfc_main$d, c as _sfc_main$e, d as _sfc_main$f } from "./SelectValue-BUnv4mQg.js";
import { ArrowLeft, Search } from "lucide-vue-next";
import { toast } from "vue-sonner";
import "class-variance-authority";
import "./DropdownMenuTrigger-B1v6pHML.js";
import "reka-ui";
import "@vueuse/core";
import "./index-3UqiGNe9.js";
import "./AvatarImage-DWFQMckn.js";
import "./index-Bfu0FVt6.js";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
import "clsx";
import "tailwind-merge";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    customer: {},
    customers: {},
    packages: {},
    levels: {}
  },
  setup(__props) {
    const props = __props;
    const isProspek = computed(() => props.customer.status === 1);
    const isAktif = computed(() => props.customer.status === 3);
    const sponsorSearch = ref("");
    const showSponsorDropdown = ref(false);
    const filteredCustomers = computed(() => {
      if (!sponsorSearch.value) return props.customers;
      const search = sponsorSearch.value.toLowerCase();
      return props.customers.filter(
        (c) => (c.name?.toLowerCase().includes(search) ?? false) || (c.ewallet_id?.toLowerCase().includes(search) ?? false) || (c.username?.toLowerCase().includes(search) ?? false)
      );
    });
    const selectedSponsor = computed(() => {
      return props.customers.find((c) => c.id === form.sponsor_id);
    });
    const form = useForm({
      name: props.customer.name,
      username: props.customer.username,
      email: props.customer.email,
      phone: props.customer.phone || "",
      password: "",
      password_confirmation: "",
      description: props.customer.description || "",
      sponsor_id: props.customer.sponsor_id,
      package_id: props.customer.package_id?.toString() || "",
      level: props.customer.level || ""
    });
    const selectedPackageName = computed(() => {
      if (!form.package_id) return null;
      const pkg = props.packages.find((p) => p.id.toString() === form.package_id);
      return pkg?.name || null;
    });
    const selectedLevelName = computed(() => {
      if (!form.level) return null;
      const level = props.levels.find((l) => l.value === form.level);
      return level?.label || null;
    });
    const selectSponsor = (customer) => {
      form.sponsor_id = customer.id;
      showSponsorDropdown.value = false;
      sponsorSearch.value = "";
    };
    const clearSponsor = () => {
      form.sponsor_id = null;
    };
    const closeSponsorDropdown = () => {
      if (typeof window !== "undefined") {
        window.setTimeout(() => {
          showSponsorDropdown.value = false;
        }, 200);
      }
    };
    const submit = () => {
      form.transform((data) => ({
        ...data,
        package_id: data.package_id ? parseInt(data.package_id, 10) : null,
        level: data.level || null
      })).put(update.url(props.customer.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Data pelanggan berhasil diperbarui");
        },
        onError: (errors) => {
          const errorMessages = Object.values(errors);
          if (errorMessages.length > 0) {
            toast.error(errorMessages[0]);
            if (errorMessages.length > 1) {
              toast.warning(`Terdapat ${errorMessages.length} kesalahan pada form. Silakan periksa kembali.`);
            }
          } else {
            toast.error("Gagal memperbarui data pelanggan. Silakan periksa data yang dimasukkan.");
          }
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: `Edit ${__props.customer.name}`
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="rounded-xl p-4 space-y-6 py-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="text-3xl font-bold"${_scopeId}>Edit Pelanggan</h1><p class="mt-2 text-muted-foreground"${_scopeId}> Perbarui informasi pelanggan </p></div>`);
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
                        _push4(`<div class="flex items-center justify-between"${_scopeId3}><div${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Informasi Akun`);
                            } else {
                              return [
                                createTextVNode("Informasi Akun")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`ID Ewallet: ${ssrInterpolate(__props.customer.ewallet_id)}`);
                            } else {
                              return [
                                createTextVNode("ID Ewallet: " + toDisplayString(__props.customer.ewallet_id), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div><div class="flex items-center gap-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$7), { variant: "outline" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Saldo: Rp ${ssrInterpolate(__props.customer.ewallet_saldo.toLocaleString("id-ID"))}`);
                            } else {
                              return [
                                createTextVNode(" Saldo: Rp " + toDisplayString(__props.customer.ewallet_saldo.toLocaleString("id-ID")), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        if (__props.customer.email_verified_at) {
                          _push4(ssrRenderComponent(unref(_sfc_main$7), { variant: "default" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` Terverifikasi `);
                              } else {
                                return [
                                  createTextVNode(" Terverifikasi ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(ssrRenderComponent(unref(_sfc_main$7), { variant: "secondary" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` Belum Verifikasi `);
                              } else {
                                return [
                                  createTextVNode(" Belum Verifikasi ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        }
                        _push4(`</div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center justify-between" }, [
                            createVNode("div", null, [
                              createVNode(unref(_sfc_main$5), null, {
                                default: withCtx(() => [
                                  createTextVNode("Informasi Akun")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$6), null, {
                                default: withCtx(() => [
                                  createTextVNode("ID Ewallet: " + toDisplayString(__props.customer.ewallet_id), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              createVNode(unref(_sfc_main$7), { variant: "outline" }, {
                                default: withCtx(() => [
                                  createTextVNode(" Saldo: Rp " + toDisplayString(__props.customer.ewallet_saldo.toLocaleString("id-ID")), 1)
                                ]),
                                _: 2
                              }, 1024),
                              __props.customer.email_verified_at ? (openBlock(), createBlock(unref(_sfc_main$7), {
                                key: 0,
                                variant: "default"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Terverifikasi ")
                                ]),
                                _: 1
                              })) : (openBlock(), createBlock(unref(_sfc_main$7), {
                                key: 1,
                                variant: "secondary"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Belum Verifikasi ")
                                ]),
                                _: 1
                              }))
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$8), { class: "space-y-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="grid gap-4 md:grid-cols-2"${_scopeId3}><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { for: "name" }, {
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
                        _push4(ssrRenderComponent(unref(_sfc_main$a), {
                          id: "name",
                          modelValue: unref(form).name,
                          "onUpdate:modelValue": ($event) => unref(form).name = $event,
                          placeholder: "Masukkan nama lengkap",
                          class: { "border-destructive": unref(form).errors.name },
                          required: ""
                        }, null, _parent4, _scopeId3));
                        _push4(`<p class="text-xs text-muted-foreground"${_scopeId3}> Nama lengkap sesuai identitas, maksimal 255 karakter </p>`);
                        if (unref(form).errors.name) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.name)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { for: "username" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Username *`);
                            } else {
                              return [
                                createTextVNode("Username *")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$a), {
                          id: "username",
                          modelValue: unref(form).username,
                          "onUpdate:modelValue": ($event) => unref(form).username = $event,
                          placeholder: "contoh: johndoe123",
                          class: { "border-destructive": unref(form).errors.username },
                          required: ""
                        }, null, _parent4, _scopeId3));
                        _push4(`<p class="text-xs text-muted-foreground"${_scopeId3}> Username untuk login. Hanya boleh huruf, angka, dash (-) dan underscore (_) </p>`);
                        if (unref(form).errors.username) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.username)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { for: "email" }, {
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
                        _push4(ssrRenderComponent(unref(_sfc_main$a), {
                          id: "email",
                          modelValue: unref(form).email,
                          "onUpdate:modelValue": ($event) => unref(form).email = $event,
                          type: "email",
                          placeholder: "nama@email.com",
                          class: { "border-destructive": unref(form).errors.email },
                          required: ""
                        }, null, _parent4, _scopeId3));
                        _push4(`<p class="text-xs text-muted-foreground"${_scopeId3}> Email aktif untuk notifikasi dan verifikasi. Satu email dapat digunakan maksimal 7 akun. </p>`);
                        if (unref(form).errors.email) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.email)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { for: "phone" }, {
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
                        _push4(ssrRenderComponent(unref(_sfc_main$a), {
                          id: "phone",
                          modelValue: unref(form).phone,
                          "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                          placeholder: "08xxxxxxxxxx",
                          class: { "border-destructive": unref(form).errors.phone }
                        }, null, _parent4, _scopeId3));
                        _push4(`<p class="text-xs text-muted-foreground"${_scopeId3}> Nomor telepon aktif (opsional), maksimal 20 karakter </p>`);
                        if (unref(form).errors.phone) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.phone)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div></div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { for: "description" }, {
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
                        _push4(`<textarea id="description" placeholder="Keterangan tambahan (opsional)" rows="3" class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"${_scopeId3}>${ssrInterpolate(unref(form).description)}</textarea><p class="text-xs text-muted-foreground"${_scopeId3}> Catatan tambahan tentang pelanggan, seperti sumber referral atau informasi penting lainnya </p></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), { for: "name" }, {
                                default: withCtx(() => [
                                  createTextVNode("Nama Lengkap *")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), {
                                id: "name",
                                modelValue: unref(form).name,
                                "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                placeholder: "Masukkan nama lengkap",
                                class: { "border-destructive": unref(form).errors.name },
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Nama lengkap sesuai identitas, maksimal 255 karakter "),
                              unref(form).errors.name ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.name), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), { for: "username" }, {
                                default: withCtx(() => [
                                  createTextVNode("Username *")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), {
                                id: "username",
                                modelValue: unref(form).username,
                                "onUpdate:modelValue": ($event) => unref(form).username = $event,
                                placeholder: "contoh: johndoe123",
                                class: { "border-destructive": unref(form).errors.username },
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Username untuk login. Hanya boleh huruf, angka, dash (-) dan underscore (_) "),
                              unref(form).errors.username ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.username), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), { for: "email" }, {
                                default: withCtx(() => [
                                  createTextVNode("Email *")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), {
                                id: "email",
                                modelValue: unref(form).email,
                                "onUpdate:modelValue": ($event) => unref(form).email = $event,
                                type: "email",
                                placeholder: "nama@email.com",
                                class: { "border-destructive": unref(form).errors.email },
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Email aktif untuk notifikasi dan verifikasi. Satu email dapat digunakan maksimal 7 akun. "),
                              unref(form).errors.email ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.email), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), { for: "phone" }, {
                                default: withCtx(() => [
                                  createTextVNode("No. Telepon")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), {
                                id: "phone",
                                modelValue: unref(form).phone,
                                "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                                placeholder: "08xxxxxxxxxx",
                                class: { "border-destructive": unref(form).errors.phone }
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Nomor telepon aktif (opsional), maksimal 20 karakter "),
                              unref(form).errors.phone ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.phone), 1)) : createCommentVNode("", true)
                            ])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$9), { for: "description" }, {
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
                            ]),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, " Catatan tambahan tentang pelanggan, seperti sumber referral atau informasi penting lainnya ")
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
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("div", null, [
                            createVNode(unref(_sfc_main$5), null, {
                              default: withCtx(() => [
                                createTextVNode("Informasi Akun")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$6), null, {
                              default: withCtx(() => [
                                createTextVNode("ID Ewallet: " + toDisplayString(__props.customer.ewallet_id), 1)
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode(unref(_sfc_main$7), { variant: "outline" }, {
                              default: withCtx(() => [
                                createTextVNode(" Saldo: Rp " + toDisplayString(__props.customer.ewallet_saldo.toLocaleString("id-ID")), 1)
                              ]),
                              _: 2
                            }, 1024),
                            __props.customer.email_verified_at ? (openBlock(), createBlock(unref(_sfc_main$7), {
                              key: 0,
                              variant: "default"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Terverifikasi ")
                              ]),
                              _: 1
                            })) : (openBlock(), createBlock(unref(_sfc_main$7), {
                              key: 1,
                              variant: "secondary"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Belum Verifikasi ")
                              ]),
                              _: 1
                            }))
                          ])
                        ])
                      ]),
                      _: 2
                    }, 1024),
                    createVNode(unref(_sfc_main$8), { class: "space-y-4" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$9), { for: "name" }, {
                              default: withCtx(() => [
                                createTextVNode("Nama Lengkap *")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$a), {
                              id: "name",
                              modelValue: unref(form).name,
                              "onUpdate:modelValue": ($event) => unref(form).name = $event,
                              placeholder: "Masukkan nama lengkap",
                              class: { "border-destructive": unref(form).errors.name },
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, " Nama lengkap sesuai identitas, maksimal 255 karakter "),
                            unref(form).errors.name ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.name), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$9), { for: "username" }, {
                              default: withCtx(() => [
                                createTextVNode("Username *")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$a), {
                              id: "username",
                              modelValue: unref(form).username,
                              "onUpdate:modelValue": ($event) => unref(form).username = $event,
                              placeholder: "contoh: johndoe123",
                              class: { "border-destructive": unref(form).errors.username },
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, " Username untuk login. Hanya boleh huruf, angka, dash (-) dan underscore (_) "),
                            unref(form).errors.username ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.username), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$9), { for: "email" }, {
                              default: withCtx(() => [
                                createTextVNode("Email *")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$a), {
                              id: "email",
                              modelValue: unref(form).email,
                              "onUpdate:modelValue": ($event) => unref(form).email = $event,
                              type: "email",
                              placeholder: "nama@email.com",
                              class: { "border-destructive": unref(form).errors.email },
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, " Email aktif untuk notifikasi dan verifikasi. Satu email dapat digunakan maksimal 7 akun. "),
                            unref(form).errors.email ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.email), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$9), { for: "phone" }, {
                              default: withCtx(() => [
                                createTextVNode("No. Telepon")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$a), {
                              id: "phone",
                              modelValue: unref(form).phone,
                              "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                              placeholder: "08xxxxxxxxxx",
                              class: { "border-destructive": unref(form).errors.phone }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, " Nomor telepon aktif (opsional), maksimal 20 karakter "),
                            unref(form).errors.phone ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.phone), 1)) : createCommentVNode("", true)
                          ])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$9), { for: "description" }, {
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
                          ]),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, " Catatan tambahan tentang pelanggan, seperti sumber referral atau informasi penting lainnya ")
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
                              _push5(`Informasi Jaringan MLM`);
                            } else {
                              return [
                                createTextVNode("Informasi Jaringan MLM")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (isProspek.value) {
                                _push5(`<!--[--> Sponsor dapat diubah untuk member Prospek <!--]-->`);
                              } else {
                                _push5(`<!--[--> Data jaringan tidak dapat diubah untuk member aktif/pasif <!--]-->`);
                              }
                            } else {
                              return [
                                isProspek.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                  createTextVNode(" Sponsor dapat diubah untuk member Prospek ")
                                ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                  createTextVNode(" Data jaringan tidak dapat diubah untuk member aktif/pasif ")
                                ], 64))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Informasi Jaringan MLM")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              isProspek.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                createTextVNode(" Sponsor dapat diubah untuk member Prospek ")
                              ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                createTextVNode(" Data jaringan tidak dapat diubah untuk member aktif/pasif ")
                              ], 64))
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$8), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="grid gap-4 md:grid-cols-3"${_scopeId3}><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          class: { "text-muted-foreground": !isProspek.value }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Sponsor`);
                            } else {
                              return [
                                createTextVNode("Sponsor")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        if (isProspek.value) {
                          _push4(`<!--[-->`);
                          if (selectedSponsor.value) {
                            _push4(`<div class="flex items-center justify-between rounded-md border p-3"${_scopeId3}><div${_scopeId3}><p class="font-medium"${_scopeId3}>${ssrInterpolate(selectedSponsor.value.name)}</p><p class="text-xs text-muted-foreground"${_scopeId3}>${ssrInterpolate(selectedSponsor.value.ewallet_id)}</p></div>`);
                            _push4(ssrRenderComponent(unref(_sfc_main$2), {
                              type: "button",
                              variant: "ghost",
                              size: "sm",
                              onClick: clearSponsor
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(` Hapus `);
                                } else {
                                  return [
                                    createTextVNode(" Hapus ")
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                            _push4(`</div>`);
                          } else {
                            _push4(`<div class="relative"${_scopeId3}><div class="relative"${_scopeId3}>`);
                            _push4(ssrRenderComponent(unref(_sfc_main$a), {
                              modelValue: sponsorSearch.value,
                              "onUpdate:modelValue": ($event) => sponsorSearch.value = $event,
                              onFocus: ($event) => showSponsorDropdown.value = true,
                              onBlur: closeSponsorDropdown,
                              placeholder: "Cari sponsor berdasarkan nama atau ID...",
                              class: { "border-destructive": unref(form).errors.sponsor_id }
                            }, null, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(unref(Search), { class: "absolute right-3 top-3 h-4 w-4 text-muted-foreground" }, null, _parent4, _scopeId3));
                            _push4(`</div>`);
                            if (showSponsorDropdown.value && filteredCustomers.value.length > 0) {
                              _push4(`<div class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-1 shadow-md"${_scopeId3}><!--[-->`);
                              ssrRenderList(filteredCustomers.value, (c) => {
                                _push4(`<button type="button" class="w-full rounded px-3 py-2 text-left text-sm hover:bg-accent"${_scopeId3}><div class="font-medium"${_scopeId3}>${ssrInterpolate(c.name)}</div><div class="text-xs text-muted-foreground"${_scopeId3}>${ssrInterpolate(c.ewallet_id)} (@${ssrInterpolate(c.username)})</div></button>`);
                              });
                              _push4(`<!--]--></div>`);
                            } else {
                              _push4(`<!---->`);
                            }
                            _push4(`</div>`);
                          }
                          _push4(`<p class="text-xs text-muted-foreground"${_scopeId3}> Pilih sponsor baru (opsional). Hanya member Pasif/Aktif yang dapat menjadi sponsor. </p>`);
                          if (unref(form).errors.sponsor_id) {
                            _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.sponsor_id)}</p>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`<!--]-->`);
                        } else {
                          _push4(`<div class="rounded-md border bg-muted p-3"${_scopeId3}><p class="text-sm font-medium"${_scopeId3}>${ssrInterpolate(__props.customer.sponsor_name || "-")}</p></div>`);
                        }
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Upline`);
                            } else {
                              return [
                                createTextVNode("Upline")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<div class="rounded-md border bg-muted p-3"${_scopeId3}><p class="text-sm font-medium"${_scopeId3}>${ssrInterpolate(__props.customer.upline_name || "-")}</p></div></div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Posisi`);
                            } else {
                              return [
                                createTextVNode("Posisi")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<div class="rounded-md border bg-muted p-3"${_scopeId3}>`);
                        if (__props.customer.position) {
                          _push4(ssrRenderComponent(unref(_sfc_main$7), { variant: "outline" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(__props.customer.position === "left" ? "Kiri" : "Kanan")}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(__props.customer.position === "left" ? "Kiri" : "Kanan"), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<span class="text-sm"${_scopeId3}>-</span>`);
                        }
                        _push4(`</div></div></div><div class="${ssrRenderClass([{
                          "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-900": isProspek.value,
                          "bg-muted": !isProspek.value
                        }, "mt-4 rounded-md border p-3"])}"${_scopeId3}><div class="flex items-center gap-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$7), {
                          variant: isProspek.value ? "secondary" : "default"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(__props.customer.status === 1 ? "Prospek" : __props.customer.status === 2 ? "Pasif" : "Aktif")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(__props.customer.status === 1 ? "Prospek" : __props.customer.status === 2 ? "Pasif" : "Aktif"), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<span class="text-sm text-muted-foreground"${_scopeId3}>`);
                        if (isProspek.value) {
                          _push4(`<!--[--> Member ini masih berstatus Prospek, sponsor dapat diubah. <!--]-->`);
                        } else {
                          _push4(`<!--[--> Member ini sudah ${ssrInterpolate(__props.customer.status === 2 ? "Pasif" : "Aktif")}, jaringan tidak dapat diubah. <!--]-->`);
                        }
                        _push4(`</span></div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "grid gap-4 md:grid-cols-3" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), {
                                class: { "text-muted-foreground": !isProspek.value }
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Sponsor")
                                ]),
                                _: 1
                              }, 8, ["class"]),
                              isProspek.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                selectedSponsor.value ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "flex items-center justify-between rounded-md border p-3"
                                }, [
                                  createVNode("div", null, [
                                    createVNode("p", { class: "font-medium" }, toDisplayString(selectedSponsor.value.name), 1),
                                    createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(selectedSponsor.value.ewallet_id), 1)
                                  ]),
                                  createVNode(unref(_sfc_main$2), {
                                    type: "button",
                                    variant: "ghost",
                                    size: "sm",
                                    onClick: clearSponsor
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Hapus ")
                                    ]),
                                    _: 1
                                  })
                                ])) : (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "relative"
                                }, [
                                  createVNode("div", { class: "relative" }, [
                                    createVNode(unref(_sfc_main$a), {
                                      modelValue: sponsorSearch.value,
                                      "onUpdate:modelValue": ($event) => sponsorSearch.value = $event,
                                      onFocus: ($event) => showSponsorDropdown.value = true,
                                      onBlur: closeSponsorDropdown,
                                      placeholder: "Cari sponsor berdasarkan nama atau ID...",
                                      class: { "border-destructive": unref(form).errors.sponsor_id }
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "onFocus", "class"]),
                                    createVNode(unref(Search), { class: "absolute right-3 top-3 h-4 w-4 text-muted-foreground" })
                                  ]),
                                  showSponsorDropdown.value && filteredCustomers.value.length > 0 ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-1 shadow-md"
                                  }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(filteredCustomers.value, (c) => {
                                      return openBlock(), createBlock("button", {
                                        key: c.id,
                                        type: "button",
                                        onClick: ($event) => selectSponsor(c),
                                        class: "w-full rounded px-3 py-2 text-left text-sm hover:bg-accent"
                                      }, [
                                        createVNode("div", { class: "font-medium" }, toDisplayString(c.name), 1),
                                        createVNode("div", { class: "text-xs text-muted-foreground" }, toDisplayString(c.ewallet_id) + " (@" + toDisplayString(c.username) + ")", 1)
                                      ], 8, ["onClick"]);
                                    }), 128))
                                  ])) : createCommentVNode("", true)
                                ])),
                                createVNode("p", { class: "text-xs text-muted-foreground" }, " Pilih sponsor baru (opsional). Hanya member Pasif/Aktif yang dapat menjadi sponsor. "),
                                unref(form).errors.sponsor_id ? (openBlock(), createBlock("p", {
                                  key: 2,
                                  class: "text-sm text-destructive"
                                }, toDisplayString(unref(form).errors.sponsor_id), 1)) : createCommentVNode("", true)
                              ], 64)) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "rounded-md border bg-muted p-3"
                              }, [
                                createVNode("p", { class: "text-sm font-medium" }, toDisplayString(__props.customer.sponsor_name || "-"), 1)
                              ]))
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                                default: withCtx(() => [
                                  createTextVNode("Upline")
                                ]),
                                _: 1
                              }),
                              createVNode("div", { class: "rounded-md border bg-muted p-3" }, [
                                createVNode("p", { class: "text-sm font-medium" }, toDisplayString(__props.customer.upline_name || "-"), 1)
                              ])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                                default: withCtx(() => [
                                  createTextVNode("Posisi")
                                ]),
                                _: 1
                              }),
                              createVNode("div", { class: "rounded-md border bg-muted p-3" }, [
                                __props.customer.position ? (openBlock(), createBlock(unref(_sfc_main$7), {
                                  key: 0,
                                  variant: "outline"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(__props.customer.position === "left" ? "Kiri" : "Kanan"), 1)
                                  ]),
                                  _: 1
                                })) : (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: "text-sm"
                                }, "-"))
                              ])
                            ])
                          ]),
                          createVNode("div", {
                            class: ["mt-4 rounded-md border p-3", {
                              "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-900": isProspek.value,
                              "bg-muted": !isProspek.value
                            }]
                          }, [
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              createVNode(unref(_sfc_main$7), {
                                variant: isProspek.value ? "secondary" : "default"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(__props.customer.status === 1 ? "Prospek" : __props.customer.status === 2 ? "Pasif" : "Aktif"), 1)
                                ]),
                                _: 1
                              }, 8, ["variant"]),
                              createVNode("span", { class: "text-sm text-muted-foreground" }, [
                                isProspek.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                  createTextVNode(" Member ini masih berstatus Prospek, sponsor dapat diubah. ")
                                ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                  createTextVNode(" Member ini sudah " + toDisplayString(__props.customer.status === 2 ? "Pasif" : "Aktif") + ", jaringan tidak dapat diubah. ", 1)
                                ], 64))
                              ])
                            ])
                          ], 2)
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
                            createTextVNode("Informasi Jaringan MLM")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            isProspek.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                              createTextVNode(" Sponsor dapat diubah untuk member Prospek ")
                            ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                              createTextVNode(" Data jaringan tidak dapat diubah untuk member aktif/pasif ")
                            ], 64))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$8), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "grid gap-4 md:grid-cols-3" }, [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$9), {
                              class: { "text-muted-foreground": !isProspek.value }
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Sponsor")
                              ]),
                              _: 1
                            }, 8, ["class"]),
                            isProspek.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                              selectedSponsor.value ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "flex items-center justify-between rounded-md border p-3"
                              }, [
                                createVNode("div", null, [
                                  createVNode("p", { class: "font-medium" }, toDisplayString(selectedSponsor.value.name), 1),
                                  createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(selectedSponsor.value.ewallet_id), 1)
                                ]),
                                createVNode(unref(_sfc_main$2), {
                                  type: "button",
                                  variant: "ghost",
                                  size: "sm",
                                  onClick: clearSponsor
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Hapus ")
                                  ]),
                                  _: 1
                                })
                              ])) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "relative"
                              }, [
                                createVNode("div", { class: "relative" }, [
                                  createVNode(unref(_sfc_main$a), {
                                    modelValue: sponsorSearch.value,
                                    "onUpdate:modelValue": ($event) => sponsorSearch.value = $event,
                                    onFocus: ($event) => showSponsorDropdown.value = true,
                                    onBlur: closeSponsorDropdown,
                                    placeholder: "Cari sponsor berdasarkan nama atau ID...",
                                    class: { "border-destructive": unref(form).errors.sponsor_id }
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onFocus", "class"]),
                                  createVNode(unref(Search), { class: "absolute right-3 top-3 h-4 w-4 text-muted-foreground" })
                                ]),
                                showSponsorDropdown.value && filteredCustomers.value.length > 0 ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-1 shadow-md"
                                }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(filteredCustomers.value, (c) => {
                                    return openBlock(), createBlock("button", {
                                      key: c.id,
                                      type: "button",
                                      onClick: ($event) => selectSponsor(c),
                                      class: "w-full rounded px-3 py-2 text-left text-sm hover:bg-accent"
                                    }, [
                                      createVNode("div", { class: "font-medium" }, toDisplayString(c.name), 1),
                                      createVNode("div", { class: "text-xs text-muted-foreground" }, toDisplayString(c.ewallet_id) + " (@" + toDisplayString(c.username) + ")", 1)
                                    ], 8, ["onClick"]);
                                  }), 128))
                                ])) : createCommentVNode("", true)
                              ])),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Pilih sponsor baru (opsional). Hanya member Pasif/Aktif yang dapat menjadi sponsor. "),
                              unref(form).errors.sponsor_id ? (openBlock(), createBlock("p", {
                                key: 2,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.sponsor_id), 1)) : createCommentVNode("", true)
                            ], 64)) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "rounded-md border bg-muted p-3"
                            }, [
                              createVNode("p", { class: "text-sm font-medium" }, toDisplayString(__props.customer.sponsor_name || "-"), 1)
                            ]))
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                              default: withCtx(() => [
                                createTextVNode("Upline")
                              ]),
                              _: 1
                            }),
                            createVNode("div", { class: "rounded-md border bg-muted p-3" }, [
                              createVNode("p", { class: "text-sm font-medium" }, toDisplayString(__props.customer.upline_name || "-"), 1)
                            ])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                              default: withCtx(() => [
                                createTextVNode("Posisi")
                              ]),
                              _: 1
                            }),
                            createVNode("div", { class: "rounded-md border bg-muted p-3" }, [
                              __props.customer.position ? (openBlock(), createBlock(unref(_sfc_main$7), {
                                key: 0,
                                variant: "outline"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(__props.customer.position === "left" ? "Kiri" : "Kanan"), 1)
                                ]),
                                _: 1
                              })) : (openBlock(), createBlock("span", {
                                key: 1,
                                class: "text-sm"
                              }, "-"))
                            ])
                          ])
                        ]),
                        createVNode("div", {
                          class: ["mt-4 rounded-md border p-3", {
                            "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-900": isProspek.value,
                            "bg-muted": !isProspek.value
                          }]
                        }, [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode(unref(_sfc_main$7), {
                              variant: isProspek.value ? "secondary" : "default"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(__props.customer.status === 1 ? "Prospek" : __props.customer.status === 2 ? "Pasif" : "Aktif"), 1)
                              ]),
                              _: 1
                            }, 8, ["variant"]),
                            createVNode("span", { class: "text-sm text-muted-foreground" }, [
                              isProspek.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                createTextVNode(" Member ini masih berstatus Prospek, sponsor dapat diubah. ")
                              ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                createTextVNode(" Member ini sudah " + toDisplayString(__props.customer.status === 2 ? "Pasif" : "Aktif") + ", jaringan tidak dapat diubah. ", 1)
                              ], 64))
                            ])
                          ])
                        ], 2)
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
                              _push5(`Paket Member`);
                            } else {
                              return [
                                createTextVNode("Paket Member")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (isAktif.value) {
                                _push5(`<!--[--> Paket dapat diubah untuk member Aktif <!--]-->`);
                              } else {
                                _push5(`<!--[--> Paket hanya dapat diubah untuk member dengan status Aktif <!--]-->`);
                              }
                            } else {
                              return [
                                isAktif.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                  createTextVNode(" Paket dapat diubah untuk member Aktif ")
                                ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                  createTextVNode(" Paket hanya dapat diubah untuk member dengan status Aktif ")
                                ], 64))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Paket Member")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              isAktif.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                createTextVNode(" Paket dapat diubah untuk member Aktif ")
                              ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                createTextVNode(" Paket hanya dapat diubah untuk member dengan status Aktif ")
                              ], 64))
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$8), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="space-y-4"${_scopeId3}><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          class: { "text-muted-foreground": !isAktif.value }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Paket Saat Ini`);
                            } else {
                              return [
                                createTextVNode("Paket Saat Ini")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        if (isAktif.value) {
                          _push4(`<!--[-->`);
                          _push4(ssrRenderComponent(unref(_sfc_main$b), {
                            modelValue: unref(form).package_id,
                            "onUpdate:modelValue": ($event) => unref(form).package_id = $event
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(_sfc_main$c), {
                                  class: { "border-destructive": unref(form).errors.package_id }
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(_sfc_main$d), { placeholder: "Pilih paket" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`${ssrInterpolate(selectedPackageName.value || "Pilih paket")}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString(selectedPackageName.value || "Pilih paket"), 1)
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(unref(_sfc_main$d), { placeholder: "Pilih paket" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(selectedPackageName.value || "Pilih paket"), 1)
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(_sfc_main$e), null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<!--[-->`);
                                      ssrRenderList(__props.packages, (pkg) => {
                                        _push6(ssrRenderComponent(unref(_sfc_main$f), {
                                          key: pkg.id,
                                          value: pkg.id.toString()
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(pkg.name)}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(pkg.name), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      });
                                      _push6(`<!--]-->`);
                                    } else {
                                      return [
                                        (openBlock(true), createBlock(Fragment, null, renderList(__props.packages, (pkg) => {
                                          return openBlock(), createBlock(unref(_sfc_main$f), {
                                            key: pkg.id,
                                            value: pkg.id.toString()
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(pkg.name), 1)
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
                                  createVNode(unref(_sfc_main$c), {
                                    class: { "border-destructive": unref(form).errors.package_id }
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$d), { placeholder: "Pilih paket" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(selectedPackageName.value || "Pilih paket"), 1)
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }, 8, ["class"]),
                                  createVNode(unref(_sfc_main$e), null, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.packages, (pkg) => {
                                        return openBlock(), createBlock(unref(_sfc_main$f), {
                                          key: pkg.id,
                                          value: pkg.id.toString()
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(pkg.name), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["value"]);
                                      }), 128))
                                    ]),
                                    _: 2
                                  }, 1024)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`<p class="text-xs text-muted-foreground"${_scopeId3}> Pilih paket untuk member ini: ZENNER Plus, ZENNER Prime, atau ZENNER Ultra </p>`);
                          if (unref(form).errors.package_id) {
                            _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.package_id)}</p>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`<!--]-->`);
                        } else {
                          _push4(`<!--[--><div class="rounded-md border bg-muted p-3"${_scopeId3}>`);
                          if (__props.customer.package_id) {
                            _push4(ssrRenderComponent(unref(_sfc_main$7), { variant: "outline" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(__props.customer.package_name)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(__props.customer.package_name), 1)
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                          } else {
                            _push4(`<span class="text-sm text-muted-foreground"${_scopeId3}>Belum ada paket</span>`);
                          }
                          _push4(`</div><p class="text-xs text-muted-foreground"${_scopeId3}> Paket akan ditetapkan saat member melakukan pembelian pertama dan menjadi Aktif. </p><!--]-->`);
                        }
                        _push4(`</div><div class="${ssrRenderClass([{
                          "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900": isAktif.value,
                          "bg-muted": !isAktif.value
                        }, "rounded-md border p-3"])}"${_scopeId3}><div class="flex items-center gap-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$7), {
                          variant: isAktif.value ? "default" : "secondary"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(__props.customer.status === 1 ? "Prospek" : __props.customer.status === 2 ? "Pasif" : "Aktif")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(__props.customer.status === 1 ? "Prospek" : __props.customer.status === 2 ? "Pasif" : "Aktif"), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<span class="text-sm text-muted-foreground"${_scopeId3}>`);
                        if (isAktif.value) {
                          _push4(`<!--[--> Member Aktif - paket dapat diubah. <!--]-->`);
                        } else {
                          _push4(`<!--[--> Member belum Aktif - paket tidak dapat diubah. <!--]-->`);
                        }
                        _push4(`</span></div></div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "space-y-4" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), {
                                class: { "text-muted-foreground": !isAktif.value }
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Paket Saat Ini")
                                ]),
                                _: 1
                              }, 8, ["class"]),
                              isAktif.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                createVNode(unref(_sfc_main$b), {
                                  modelValue: unref(form).package_id,
                                  "onUpdate:modelValue": ($event) => unref(form).package_id = $event
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$c), {
                                      class: { "border-destructive": unref(form).errors.package_id }
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$d), { placeholder: "Pilih paket" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(selectedPackageName.value || "Pilih paket"), 1)
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }, 8, ["class"]),
                                    createVNode(unref(_sfc_main$e), null, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(__props.packages, (pkg) => {
                                          return openBlock(), createBlock(unref(_sfc_main$f), {
                                            key: pkg.id,
                                            value: pkg.id.toString()
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(pkg.name), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["value"]);
                                        }), 128))
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1032, ["modelValue", "onUpdate:modelValue"]),
                                createVNode("p", { class: "text-xs text-muted-foreground" }, " Pilih paket untuk member ini: ZENNER Plus, ZENNER Prime, atau ZENNER Ultra "),
                                unref(form).errors.package_id ? (openBlock(), createBlock("p", {
                                  key: 0,
                                  class: "text-sm text-destructive"
                                }, toDisplayString(unref(form).errors.package_id), 1)) : createCommentVNode("", true)
                              ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                createVNode("div", { class: "rounded-md border bg-muted p-3" }, [
                                  __props.customer.package_id ? (openBlock(), createBlock(unref(_sfc_main$7), {
                                    key: 0,
                                    variant: "outline"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(__props.customer.package_name), 1)
                                    ]),
                                    _: 1
                                  })) : (openBlock(), createBlock("span", {
                                    key: 1,
                                    class: "text-sm text-muted-foreground"
                                  }, "Belum ada paket"))
                                ]),
                                createVNode("p", { class: "text-xs text-muted-foreground" }, " Paket akan ditetapkan saat member melakukan pembelian pertama dan menjadi Aktif. ")
                              ], 64))
                            ]),
                            createVNode("div", {
                              class: ["rounded-md border p-3", {
                                "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900": isAktif.value,
                                "bg-muted": !isAktif.value
                              }]
                            }, [
                              createVNode("div", { class: "flex items-center gap-2" }, [
                                createVNode(unref(_sfc_main$7), {
                                  variant: isAktif.value ? "default" : "secondary"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(__props.customer.status === 1 ? "Prospek" : __props.customer.status === 2 ? "Pasif" : "Aktif"), 1)
                                  ]),
                                  _: 1
                                }, 8, ["variant"]),
                                createVNode("span", { class: "text-sm text-muted-foreground" }, [
                                  isAktif.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                    createTextVNode(" Member Aktif - paket dapat diubah. ")
                                  ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                    createTextVNode(" Member belum Aktif - paket tidak dapat diubah. ")
                                  ], 64))
                                ])
                              ])
                            ], 2)
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
                            createTextVNode("Paket Member")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            isAktif.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                              createTextVNode(" Paket dapat diubah untuk member Aktif ")
                            ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                              createTextVNode(" Paket hanya dapat diubah untuk member dengan status Aktif ")
                            ], 64))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$8), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "space-y-4" }, [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$9), {
                              class: { "text-muted-foreground": !isAktif.value }
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Paket Saat Ini")
                              ]),
                              _: 1
                            }, 8, ["class"]),
                            isAktif.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                              createVNode(unref(_sfc_main$b), {
                                modelValue: unref(form).package_id,
                                "onUpdate:modelValue": ($event) => unref(form).package_id = $event
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$c), {
                                    class: { "border-destructive": unref(form).errors.package_id }
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$d), { placeholder: "Pilih paket" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(selectedPackageName.value || "Pilih paket"), 1)
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }, 8, ["class"]),
                                  createVNode(unref(_sfc_main$e), null, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.packages, (pkg) => {
                                        return openBlock(), createBlock(unref(_sfc_main$f), {
                                          key: pkg.id,
                                          value: pkg.id.toString()
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(pkg.name), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["value"]);
                                      }), 128))
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1032, ["modelValue", "onUpdate:modelValue"]),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Pilih paket untuk member ini: ZENNER Plus, ZENNER Prime, atau ZENNER Ultra "),
                              unref(form).errors.package_id ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.package_id), 1)) : createCommentVNode("", true)
                            ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                              createVNode("div", { class: "rounded-md border bg-muted p-3" }, [
                                __props.customer.package_id ? (openBlock(), createBlock(unref(_sfc_main$7), {
                                  key: 0,
                                  variant: "outline"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(__props.customer.package_name), 1)
                                  ]),
                                  _: 1
                                })) : (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: "text-sm text-muted-foreground"
                                }, "Belum ada paket"))
                              ]),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Paket akan ditetapkan saat member melakukan pembelian pertama dan menjadi Aktif. ")
                            ], 64))
                          ]),
                          createVNode("div", {
                            class: ["rounded-md border p-3", {
                              "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900": isAktif.value,
                              "bg-muted": !isAktif.value
                            }]
                          }, [
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              createVNode(unref(_sfc_main$7), {
                                variant: isAktif.value ? "default" : "secondary"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(__props.customer.status === 1 ? "Prospek" : __props.customer.status === 2 ? "Pasif" : "Aktif"), 1)
                                ]),
                                _: 1
                              }, 8, ["variant"]),
                              createVNode("span", { class: "text-sm text-muted-foreground" }, [
                                isAktif.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                  createTextVNode(" Member Aktif - paket dapat diubah. ")
                                ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                  createTextVNode(" Member belum Aktif - paket tidak dapat diubah. ")
                                ], 64))
                              ])
                            ])
                          ], 2)
                        ])
                      ]),
                      _: 2
                    }, 1024)
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
                              _push5(`Peringkat Member`);
                            } else {
                              return [
                                createTextVNode("Peringkat Member")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (isAktif.value) {
                                _push5(`<!--[--> Peringkat dapat diubah untuk member Aktif <!--]-->`);
                              } else {
                                _push5(`<!--[--> Peringkat hanya dapat diubah untuk member dengan status Aktif <!--]-->`);
                              }
                            } else {
                              return [
                                isAktif.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                  createTextVNode(" Peringkat dapat diubah untuk member Aktif ")
                                ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                  createTextVNode(" Peringkat hanya dapat diubah untuk member dengan status Aktif ")
                                ], 64))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Peringkat Member")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              isAktif.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                createTextVNode(" Peringkat dapat diubah untuk member Aktif ")
                              ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                createTextVNode(" Peringkat hanya dapat diubah untuk member dengan status Aktif ")
                              ], 64))
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$8), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="space-y-4"${_scopeId3}><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          class: { "text-muted-foreground": !isAktif.value }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Peringkat Saat Ini`);
                            } else {
                              return [
                                createTextVNode("Peringkat Saat Ini")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        if (isAktif.value) {
                          _push4(`<!--[-->`);
                          _push4(ssrRenderComponent(unref(_sfc_main$b), {
                            modelValue: unref(form).level,
                            "onUpdate:modelValue": ($event) => unref(form).level = $event
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(_sfc_main$c), {
                                  class: { "border-destructive": unref(form).errors.level }
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(_sfc_main$d), { placeholder: "Pilih peringkat" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`${ssrInterpolate(selectedLevelName.value || "Pilih peringkat")}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString(selectedLevelName.value || "Pilih peringkat"), 1)
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(unref(_sfc_main$d), { placeholder: "Pilih peringkat" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(selectedLevelName.value || "Pilih peringkat"), 1)
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(_sfc_main$e), null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<!--[-->`);
                                      ssrRenderList(__props.levels, (lvl) => {
                                        _push6(ssrRenderComponent(unref(_sfc_main$f), {
                                          key: lvl.value,
                                          value: lvl.value
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(lvl.label)}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(lvl.label), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      });
                                      _push6(`<!--]-->`);
                                    } else {
                                      return [
                                        (openBlock(true), createBlock(Fragment, null, renderList(__props.levels, (lvl) => {
                                          return openBlock(), createBlock(unref(_sfc_main$f), {
                                            key: lvl.value,
                                            value: lvl.value
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(lvl.label), 1)
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
                                  createVNode(unref(_sfc_main$c), {
                                    class: { "border-destructive": unref(form).errors.level }
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$d), { placeholder: "Pilih peringkat" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(selectedLevelName.value || "Pilih peringkat"), 1)
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }, 8, ["class"]),
                                  createVNode(unref(_sfc_main$e), null, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.levels, (lvl) => {
                                        return openBlock(), createBlock(unref(_sfc_main$f), {
                                          key: lvl.value,
                                          value: lvl.value
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(lvl.label), 1)
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
                          _push4(`<p class="text-xs text-muted-foreground"${_scopeId3}> Pilih peringkat untuk member ini: Associate, Senior Associate, Executive, atau Director </p>`);
                          if (unref(form).errors.level) {
                            _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.level)}</p>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`<!--]-->`);
                        } else {
                          _push4(`<!--[--><div class="rounded-md border bg-muted p-3"${_scopeId3}>`);
                          if (__props.customer.level) {
                            _push4(ssrRenderComponent(unref(_sfc_main$7), { variant: "outline" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(__props.customer.level)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(__props.customer.level), 1)
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                          } else {
                            _push4(`<span class="text-sm text-muted-foreground"${_scopeId3}>Belum ada peringkat</span>`);
                          }
                          _push4(`</div><p class="text-xs text-muted-foreground"${_scopeId3}> Peringkat akan ditetapkan saat member menjadi Aktif. </p><!--]-->`);
                        }
                        _push4(`</div><div class="${ssrRenderClass([{
                          "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900": isAktif.value,
                          "bg-muted": !isAktif.value
                        }, "rounded-md border p-3"])}"${_scopeId3}><div class="flex items-center gap-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$7), {
                          variant: isAktif.value ? "default" : "secondary"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(__props.customer.status === 1 ? "Prospek" : __props.customer.status === 2 ? "Pasif" : "Aktif")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(__props.customer.status === 1 ? "Prospek" : __props.customer.status === 2 ? "Pasif" : "Aktif"), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<span class="text-sm text-muted-foreground"${_scopeId3}>`);
                        if (isAktif.value) {
                          _push4(`<!--[--> Member Aktif - peringkat dapat diubah. <!--]-->`);
                        } else {
                          _push4(`<!--[--> Member belum Aktif - peringkat tidak dapat diubah. <!--]-->`);
                        }
                        _push4(`</span></div></div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "space-y-4" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), {
                                class: { "text-muted-foreground": !isAktif.value }
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Peringkat Saat Ini")
                                ]),
                                _: 1
                              }, 8, ["class"]),
                              isAktif.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                createVNode(unref(_sfc_main$b), {
                                  modelValue: unref(form).level,
                                  "onUpdate:modelValue": ($event) => unref(form).level = $event
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$c), {
                                      class: { "border-destructive": unref(form).errors.level }
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$d), { placeholder: "Pilih peringkat" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(selectedLevelName.value || "Pilih peringkat"), 1)
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }, 8, ["class"]),
                                    createVNode(unref(_sfc_main$e), null, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(__props.levels, (lvl) => {
                                          return openBlock(), createBlock(unref(_sfc_main$f), {
                                            key: lvl.value,
                                            value: lvl.value
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(lvl.label), 1)
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
                                createVNode("p", { class: "text-xs text-muted-foreground" }, " Pilih peringkat untuk member ini: Associate, Senior Associate, Executive, atau Director "),
                                unref(form).errors.level ? (openBlock(), createBlock("p", {
                                  key: 0,
                                  class: "text-sm text-destructive"
                                }, toDisplayString(unref(form).errors.level), 1)) : createCommentVNode("", true)
                              ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                createVNode("div", { class: "rounded-md border bg-muted p-3" }, [
                                  __props.customer.level ? (openBlock(), createBlock(unref(_sfc_main$7), {
                                    key: 0,
                                    variant: "outline"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(__props.customer.level), 1)
                                    ]),
                                    _: 1
                                  })) : (openBlock(), createBlock("span", {
                                    key: 1,
                                    class: "text-sm text-muted-foreground"
                                  }, "Belum ada peringkat"))
                                ]),
                                createVNode("p", { class: "text-xs text-muted-foreground" }, " Peringkat akan ditetapkan saat member menjadi Aktif. ")
                              ], 64))
                            ]),
                            createVNode("div", {
                              class: ["rounded-md border p-3", {
                                "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900": isAktif.value,
                                "bg-muted": !isAktif.value
                              }]
                            }, [
                              createVNode("div", { class: "flex items-center gap-2" }, [
                                createVNode(unref(_sfc_main$7), {
                                  variant: isAktif.value ? "default" : "secondary"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(__props.customer.status === 1 ? "Prospek" : __props.customer.status === 2 ? "Pasif" : "Aktif"), 1)
                                  ]),
                                  _: 1
                                }, 8, ["variant"]),
                                createVNode("span", { class: "text-sm text-muted-foreground" }, [
                                  isAktif.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                    createTextVNode(" Member Aktif - peringkat dapat diubah. ")
                                  ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                    createTextVNode(" Member belum Aktif - peringkat tidak dapat diubah. ")
                                  ], 64))
                                ])
                              ])
                            ], 2)
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
                            createTextVNode("Peringkat Member")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            isAktif.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                              createTextVNode(" Peringkat dapat diubah untuk member Aktif ")
                            ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                              createTextVNode(" Peringkat hanya dapat diubah untuk member dengan status Aktif ")
                            ], 64))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$8), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "space-y-4" }, [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$9), {
                              class: { "text-muted-foreground": !isAktif.value }
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Peringkat Saat Ini")
                              ]),
                              _: 1
                            }, 8, ["class"]),
                            isAktif.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                              createVNode(unref(_sfc_main$b), {
                                modelValue: unref(form).level,
                                "onUpdate:modelValue": ($event) => unref(form).level = $event
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$c), {
                                    class: { "border-destructive": unref(form).errors.level }
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$d), { placeholder: "Pilih peringkat" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(selectedLevelName.value || "Pilih peringkat"), 1)
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }, 8, ["class"]),
                                  createVNode(unref(_sfc_main$e), null, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.levels, (lvl) => {
                                        return openBlock(), createBlock(unref(_sfc_main$f), {
                                          key: lvl.value,
                                          value: lvl.value
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(lvl.label), 1)
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
                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Pilih peringkat untuk member ini: Associate, Senior Associate, Executive, atau Director "),
                              unref(form).errors.level ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.level), 1)) : createCommentVNode("", true)
                            ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                              createVNode("div", { class: "rounded-md border bg-muted p-3" }, [
                                __props.customer.level ? (openBlock(), createBlock(unref(_sfc_main$7), {
                                  key: 0,
                                  variant: "outline"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(__props.customer.level), 1)
                                  ]),
                                  _: 1
                                })) : (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: "text-sm text-muted-foreground"
                                }, "Belum ada peringkat"))
                              ]),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Peringkat akan ditetapkan saat member menjadi Aktif. ")
                            ], 64))
                          ]),
                          createVNode("div", {
                            class: ["rounded-md border p-3", {
                              "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900": isAktif.value,
                              "bg-muted": !isAktif.value
                            }]
                          }, [
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              createVNode(unref(_sfc_main$7), {
                                variant: isAktif.value ? "default" : "secondary"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(__props.customer.status === 1 ? "Prospek" : __props.customer.status === 2 ? "Pasif" : "Aktif"), 1)
                                ]),
                                _: 1
                              }, 8, ["variant"]),
                              createVNode("span", { class: "text-sm text-muted-foreground" }, [
                                isAktif.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                  createTextVNode(" Member Aktif - peringkat dapat diubah. ")
                                ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                  createTextVNode(" Member belum Aktif - peringkat tidak dapat diubah. ")
                                ], 64))
                              ])
                            ])
                          ], 2)
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
                              _push5(`Ubah Password`);
                            } else {
                              return [
                                createTextVNode("Ubah Password")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Kosongkan jika tidak ingin mengubah password `);
                            } else {
                              return [
                                createTextVNode(" Kosongkan jika tidak ingin mengubah password ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Ubah Password")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode(" Kosongkan jika tidak ingin mengubah password ")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$8), { class: "space-y-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="grid gap-4 md:grid-cols-2"${_scopeId3}><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { for: "password" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Password Baru`);
                            } else {
                              return [
                                createTextVNode("Password Baru")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$a), {
                          id: "password",
                          modelValue: unref(form).password,
                          "onUpdate:modelValue": ($event) => unref(form).password = $event,
                          type: "password",
                          placeholder: "Minimal 8 karakter",
                          class: { "border-destructive": unref(form).errors.password }
                        }, null, _parent4, _scopeId3));
                        _push4(`<p class="text-xs text-muted-foreground"${_scopeId3}> Password minimal 8 karakter, gunakan kombinasi huruf dan angka </p>`);
                        if (unref(form).errors.password) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.password)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { for: "password_confirmation" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Konfirmasi Password`);
                            } else {
                              return [
                                createTextVNode("Konfirmasi Password")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$a), {
                          id: "password_confirmation",
                          modelValue: unref(form).password_confirmation,
                          "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                          type: "password",
                          placeholder: "Ulangi password"
                        }, null, _parent4, _scopeId3));
                        _push4(`<p class="text-xs text-muted-foreground"${_scopeId3}> Ketik ulang password baru yang sama untuk konfirmasi </p></div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), { for: "password" }, {
                                default: withCtx(() => [
                                  createTextVNode("Password Baru")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), {
                                id: "password",
                                modelValue: unref(form).password,
                                "onUpdate:modelValue": ($event) => unref(form).password = $event,
                                type: "password",
                                placeholder: "Minimal 8 karakter",
                                class: { "border-destructive": unref(form).errors.password }
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Password minimal 8 karakter, gunakan kombinasi huruf dan angka "),
                              unref(form).errors.password ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.password), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), { for: "password_confirmation" }, {
                                default: withCtx(() => [
                                  createTextVNode("Konfirmasi Password")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), {
                                id: "password_confirmation",
                                modelValue: unref(form).password_confirmation,
                                "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                                type: "password",
                                placeholder: "Ulangi password"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Ketik ulang password baru yang sama untuk konfirmasi ")
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
                            createTextVNode("Ubah Password")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode(" Kosongkan jika tidak ingin mengubah password ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$8), { class: "space-y-4" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$9), { for: "password" }, {
                              default: withCtx(() => [
                                createTextVNode("Password Baru")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$a), {
                              id: "password",
                              modelValue: unref(form).password,
                              "onUpdate:modelValue": ($event) => unref(form).password = $event,
                              type: "password",
                              placeholder: "Minimal 8 karakter",
                              class: { "border-destructive": unref(form).errors.password }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, " Password minimal 8 karakter, gunakan kombinasi huruf dan angka "),
                            unref(form).errors.password ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.password), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$9), { for: "password_confirmation" }, {
                              default: withCtx(() => [
                                createTextVNode("Konfirmasi Password")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$a), {
                              id: "password_confirmation",
                              modelValue: unref(form).password_confirmation,
                              "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                              type: "password",
                              placeholder: "Ulangi password"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, " Ketik ulang password baru yang sama untuk konfirmasi ")
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
                  _push3(`${ssrInterpolate(unref(form).processing ? "Menyimpan..." : "Simpan Perubahan")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(form).processing ? "Menyimpan..." : "Simpan Perubahan"), 1)
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
                    createVNode("h1", { class: "text-3xl font-bold" }, "Edit Pelanggan"),
                    createVNode("p", { class: "mt-2 text-muted-foreground" }, " Perbarui informasi pelanggan ")
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
                          createVNode("div", { class: "flex items-center justify-between" }, [
                            createVNode("div", null, [
                              createVNode(unref(_sfc_main$5), null, {
                                default: withCtx(() => [
                                  createTextVNode("Informasi Akun")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$6), null, {
                                default: withCtx(() => [
                                  createTextVNode("ID Ewallet: " + toDisplayString(__props.customer.ewallet_id), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              createVNode(unref(_sfc_main$7), { variant: "outline" }, {
                                default: withCtx(() => [
                                  createTextVNode(" Saldo: Rp " + toDisplayString(__props.customer.ewallet_saldo.toLocaleString("id-ID")), 1)
                                ]),
                                _: 2
                              }, 1024),
                              __props.customer.email_verified_at ? (openBlock(), createBlock(unref(_sfc_main$7), {
                                key: 0,
                                variant: "default"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Terverifikasi ")
                                ]),
                                _: 1
                              })) : (openBlock(), createBlock(unref(_sfc_main$7), {
                                key: 1,
                                variant: "secondary"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Belum Verifikasi ")
                                ]),
                                _: 1
                              }))
                            ])
                          ])
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(unref(_sfc_main$8), { class: "space-y-4" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), { for: "name" }, {
                                default: withCtx(() => [
                                  createTextVNode("Nama Lengkap *")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), {
                                id: "name",
                                modelValue: unref(form).name,
                                "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                placeholder: "Masukkan nama lengkap",
                                class: { "border-destructive": unref(form).errors.name },
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Nama lengkap sesuai identitas, maksimal 255 karakter "),
                              unref(form).errors.name ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.name), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), { for: "username" }, {
                                default: withCtx(() => [
                                  createTextVNode("Username *")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), {
                                id: "username",
                                modelValue: unref(form).username,
                                "onUpdate:modelValue": ($event) => unref(form).username = $event,
                                placeholder: "contoh: johndoe123",
                                class: { "border-destructive": unref(form).errors.username },
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Username untuk login. Hanya boleh huruf, angka, dash (-) dan underscore (_) "),
                              unref(form).errors.username ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.username), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), { for: "email" }, {
                                default: withCtx(() => [
                                  createTextVNode("Email *")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), {
                                id: "email",
                                modelValue: unref(form).email,
                                "onUpdate:modelValue": ($event) => unref(form).email = $event,
                                type: "email",
                                placeholder: "nama@email.com",
                                class: { "border-destructive": unref(form).errors.email },
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Email aktif untuk notifikasi dan verifikasi. Satu email dapat digunakan maksimal 7 akun. "),
                              unref(form).errors.email ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.email), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), { for: "phone" }, {
                                default: withCtx(() => [
                                  createTextVNode("No. Telepon")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), {
                                id: "phone",
                                modelValue: unref(form).phone,
                                "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                                placeholder: "08xxxxxxxxxx",
                                class: { "border-destructive": unref(form).errors.phone }
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Nomor telepon aktif (opsional), maksimal 20 karakter "),
                              unref(form).errors.phone ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.phone), 1)) : createCommentVNode("", true)
                            ])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$9), { for: "description" }, {
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
                            ]),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, " Catatan tambahan tentang pelanggan, seperti sumber referral atau informasi penting lainnya ")
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 2
                  }, 1024),
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$4), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Informasi Jaringan MLM")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              isProspek.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                createTextVNode(" Sponsor dapat diubah untuk member Prospek ")
                              ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                createTextVNode(" Data jaringan tidak dapat diubah untuk member aktif/pasif ")
                              ], 64))
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$8), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "grid gap-4 md:grid-cols-3" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), {
                                class: { "text-muted-foreground": !isProspek.value }
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Sponsor")
                                ]),
                                _: 1
                              }, 8, ["class"]),
                              isProspek.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                selectedSponsor.value ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "flex items-center justify-between rounded-md border p-3"
                                }, [
                                  createVNode("div", null, [
                                    createVNode("p", { class: "font-medium" }, toDisplayString(selectedSponsor.value.name), 1),
                                    createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(selectedSponsor.value.ewallet_id), 1)
                                  ]),
                                  createVNode(unref(_sfc_main$2), {
                                    type: "button",
                                    variant: "ghost",
                                    size: "sm",
                                    onClick: clearSponsor
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Hapus ")
                                    ]),
                                    _: 1
                                  })
                                ])) : (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "relative"
                                }, [
                                  createVNode("div", { class: "relative" }, [
                                    createVNode(unref(_sfc_main$a), {
                                      modelValue: sponsorSearch.value,
                                      "onUpdate:modelValue": ($event) => sponsorSearch.value = $event,
                                      onFocus: ($event) => showSponsorDropdown.value = true,
                                      onBlur: closeSponsorDropdown,
                                      placeholder: "Cari sponsor berdasarkan nama atau ID...",
                                      class: { "border-destructive": unref(form).errors.sponsor_id }
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "onFocus", "class"]),
                                    createVNode(unref(Search), { class: "absolute right-3 top-3 h-4 w-4 text-muted-foreground" })
                                  ]),
                                  showSponsorDropdown.value && filteredCustomers.value.length > 0 ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-1 shadow-md"
                                  }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(filteredCustomers.value, (c) => {
                                      return openBlock(), createBlock("button", {
                                        key: c.id,
                                        type: "button",
                                        onClick: ($event) => selectSponsor(c),
                                        class: "w-full rounded px-3 py-2 text-left text-sm hover:bg-accent"
                                      }, [
                                        createVNode("div", { class: "font-medium" }, toDisplayString(c.name), 1),
                                        createVNode("div", { class: "text-xs text-muted-foreground" }, toDisplayString(c.ewallet_id) + " (@" + toDisplayString(c.username) + ")", 1)
                                      ], 8, ["onClick"]);
                                    }), 128))
                                  ])) : createCommentVNode("", true)
                                ])),
                                createVNode("p", { class: "text-xs text-muted-foreground" }, " Pilih sponsor baru (opsional). Hanya member Pasif/Aktif yang dapat menjadi sponsor. "),
                                unref(form).errors.sponsor_id ? (openBlock(), createBlock("p", {
                                  key: 2,
                                  class: "text-sm text-destructive"
                                }, toDisplayString(unref(form).errors.sponsor_id), 1)) : createCommentVNode("", true)
                              ], 64)) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "rounded-md border bg-muted p-3"
                              }, [
                                createVNode("p", { class: "text-sm font-medium" }, toDisplayString(__props.customer.sponsor_name || "-"), 1)
                              ]))
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                                default: withCtx(() => [
                                  createTextVNode("Upline")
                                ]),
                                _: 1
                              }),
                              createVNode("div", { class: "rounded-md border bg-muted p-3" }, [
                                createVNode("p", { class: "text-sm font-medium" }, toDisplayString(__props.customer.upline_name || "-"), 1)
                              ])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), { class: "text-muted-foreground" }, {
                                default: withCtx(() => [
                                  createTextVNode("Posisi")
                                ]),
                                _: 1
                              }),
                              createVNode("div", { class: "rounded-md border bg-muted p-3" }, [
                                __props.customer.position ? (openBlock(), createBlock(unref(_sfc_main$7), {
                                  key: 0,
                                  variant: "outline"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(__props.customer.position === "left" ? "Kiri" : "Kanan"), 1)
                                  ]),
                                  _: 1
                                })) : (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: "text-sm"
                                }, "-"))
                              ])
                            ])
                          ]),
                          createVNode("div", {
                            class: ["mt-4 rounded-md border p-3", {
                              "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-900": isProspek.value,
                              "bg-muted": !isProspek.value
                            }]
                          }, [
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              createVNode(unref(_sfc_main$7), {
                                variant: isProspek.value ? "secondary" : "default"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(__props.customer.status === 1 ? "Prospek" : __props.customer.status === 2 ? "Pasif" : "Aktif"), 1)
                                ]),
                                _: 1
                              }, 8, ["variant"]),
                              createVNode("span", { class: "text-sm text-muted-foreground" }, [
                                isProspek.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                  createTextVNode(" Member ini masih berstatus Prospek, sponsor dapat diubah. ")
                                ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                  createTextVNode(" Member ini sudah " + toDisplayString(__props.customer.status === 2 ? "Pasif" : "Aktif") + ", jaringan tidak dapat diubah. ", 1)
                                ], 64))
                              ])
                            ])
                          ], 2)
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
                              createTextVNode("Paket Member")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              isAktif.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                createTextVNode(" Paket dapat diubah untuk member Aktif ")
                              ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                createTextVNode(" Paket hanya dapat diubah untuk member dengan status Aktif ")
                              ], 64))
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$8), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "space-y-4" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), {
                                class: { "text-muted-foreground": !isAktif.value }
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Paket Saat Ini")
                                ]),
                                _: 1
                              }, 8, ["class"]),
                              isAktif.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                createVNode(unref(_sfc_main$b), {
                                  modelValue: unref(form).package_id,
                                  "onUpdate:modelValue": ($event) => unref(form).package_id = $event
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$c), {
                                      class: { "border-destructive": unref(form).errors.package_id }
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$d), { placeholder: "Pilih paket" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(selectedPackageName.value || "Pilih paket"), 1)
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }, 8, ["class"]),
                                    createVNode(unref(_sfc_main$e), null, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(__props.packages, (pkg) => {
                                          return openBlock(), createBlock(unref(_sfc_main$f), {
                                            key: pkg.id,
                                            value: pkg.id.toString()
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(pkg.name), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["value"]);
                                        }), 128))
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1032, ["modelValue", "onUpdate:modelValue"]),
                                createVNode("p", { class: "text-xs text-muted-foreground" }, " Pilih paket untuk member ini: ZENNER Plus, ZENNER Prime, atau ZENNER Ultra "),
                                unref(form).errors.package_id ? (openBlock(), createBlock("p", {
                                  key: 0,
                                  class: "text-sm text-destructive"
                                }, toDisplayString(unref(form).errors.package_id), 1)) : createCommentVNode("", true)
                              ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                createVNode("div", { class: "rounded-md border bg-muted p-3" }, [
                                  __props.customer.package_id ? (openBlock(), createBlock(unref(_sfc_main$7), {
                                    key: 0,
                                    variant: "outline"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(__props.customer.package_name), 1)
                                    ]),
                                    _: 1
                                  })) : (openBlock(), createBlock("span", {
                                    key: 1,
                                    class: "text-sm text-muted-foreground"
                                  }, "Belum ada paket"))
                                ]),
                                createVNode("p", { class: "text-xs text-muted-foreground" }, " Paket akan ditetapkan saat member melakukan pembelian pertama dan menjadi Aktif. ")
                              ], 64))
                            ]),
                            createVNode("div", {
                              class: ["rounded-md border p-3", {
                                "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900": isAktif.value,
                                "bg-muted": !isAktif.value
                              }]
                            }, [
                              createVNode("div", { class: "flex items-center gap-2" }, [
                                createVNode(unref(_sfc_main$7), {
                                  variant: isAktif.value ? "default" : "secondary"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(__props.customer.status === 1 ? "Prospek" : __props.customer.status === 2 ? "Pasif" : "Aktif"), 1)
                                  ]),
                                  _: 1
                                }, 8, ["variant"]),
                                createVNode("span", { class: "text-sm text-muted-foreground" }, [
                                  isAktif.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                    createTextVNode(" Member Aktif - paket dapat diubah. ")
                                  ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                    createTextVNode(" Member belum Aktif - paket tidak dapat diubah. ")
                                  ], 64))
                                ])
                              ])
                            ], 2)
                          ])
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024),
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$4), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Peringkat Member")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              isAktif.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                createTextVNode(" Peringkat dapat diubah untuk member Aktif ")
                              ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                createTextVNode(" Peringkat hanya dapat diubah untuk member dengan status Aktif ")
                              ], 64))
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$8), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "space-y-4" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), {
                                class: { "text-muted-foreground": !isAktif.value }
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Peringkat Saat Ini")
                                ]),
                                _: 1
                              }, 8, ["class"]),
                              isAktif.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                createVNode(unref(_sfc_main$b), {
                                  modelValue: unref(form).level,
                                  "onUpdate:modelValue": ($event) => unref(form).level = $event
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$c), {
                                      class: { "border-destructive": unref(form).errors.level }
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$d), { placeholder: "Pilih peringkat" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(selectedLevelName.value || "Pilih peringkat"), 1)
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }, 8, ["class"]),
                                    createVNode(unref(_sfc_main$e), null, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(__props.levels, (lvl) => {
                                          return openBlock(), createBlock(unref(_sfc_main$f), {
                                            key: lvl.value,
                                            value: lvl.value
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(lvl.label), 1)
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
                                createVNode("p", { class: "text-xs text-muted-foreground" }, " Pilih peringkat untuk member ini: Associate, Senior Associate, Executive, atau Director "),
                                unref(form).errors.level ? (openBlock(), createBlock("p", {
                                  key: 0,
                                  class: "text-sm text-destructive"
                                }, toDisplayString(unref(form).errors.level), 1)) : createCommentVNode("", true)
                              ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                createVNode("div", { class: "rounded-md border bg-muted p-3" }, [
                                  __props.customer.level ? (openBlock(), createBlock(unref(_sfc_main$7), {
                                    key: 0,
                                    variant: "outline"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(__props.customer.level), 1)
                                    ]),
                                    _: 1
                                  })) : (openBlock(), createBlock("span", {
                                    key: 1,
                                    class: "text-sm text-muted-foreground"
                                  }, "Belum ada peringkat"))
                                ]),
                                createVNode("p", { class: "text-xs text-muted-foreground" }, " Peringkat akan ditetapkan saat member menjadi Aktif. ")
                              ], 64))
                            ]),
                            createVNode("div", {
                              class: ["rounded-md border p-3", {
                                "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900": isAktif.value,
                                "bg-muted": !isAktif.value
                              }]
                            }, [
                              createVNode("div", { class: "flex items-center gap-2" }, [
                                createVNode(unref(_sfc_main$7), {
                                  variant: isAktif.value ? "default" : "secondary"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(__props.customer.status === 1 ? "Prospek" : __props.customer.status === 2 ? "Pasif" : "Aktif"), 1)
                                  ]),
                                  _: 1
                                }, 8, ["variant"]),
                                createVNode("span", { class: "text-sm text-muted-foreground" }, [
                                  isAktif.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                    createTextVNode(" Member Aktif - peringkat dapat diubah. ")
                                  ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                    createTextVNode(" Member belum Aktif - peringkat tidak dapat diubah. ")
                                  ], 64))
                                ])
                              ])
                            ], 2)
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
                              createTextVNode("Ubah Password")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode(" Kosongkan jika tidak ingin mengubah password ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$8), { class: "space-y-4" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), { for: "password" }, {
                                default: withCtx(() => [
                                  createTextVNode("Password Baru")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), {
                                id: "password",
                                modelValue: unref(form).password,
                                "onUpdate:modelValue": ($event) => unref(form).password = $event,
                                type: "password",
                                placeholder: "Minimal 8 karakter",
                                class: { "border-destructive": unref(form).errors.password }
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Password minimal 8 karakter, gunakan kombinasi huruf dan angka "),
                              unref(form).errors.password ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.password), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), { for: "password_confirmation" }, {
                                default: withCtx(() => [
                                  createTextVNode("Konfirmasi Password")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), {
                                id: "password_confirmation",
                                modelValue: unref(form).password_confirmation,
                                "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                                type: "password",
                                placeholder: "Ulangi password"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Ketik ulang password baru yang sama untuk konfirmasi ")
                            ])
                          ])
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
                        createTextVNode(toDisplayString(unref(form).processing ? "Menyimpan..." : "Simpan Perubahan"), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Customers/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
