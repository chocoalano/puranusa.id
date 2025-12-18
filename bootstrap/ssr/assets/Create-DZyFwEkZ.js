import { defineComponent, ref, computed, unref, withCtx, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, toDisplayString, withDirectives, vModelText, Fragment, renderList, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1, i as index, s as store } from "./AppLayout-Bq9zOrCE.js";
import { _ as _sfc_main$2 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$9 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$8 } from "./Label-16aMY2sx.js";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5, d as _sfc_main$6, c as _sfc_main$7 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$a, a as _sfc_main$b, b as _sfc_main$c, c as _sfc_main$d, d as _sfc_main$e } from "./SelectValue-BUnv4mQg.js";
import { ArrowLeft, Search } from "lucide-vue-next";
import { toast } from "vue-sonner";
import "class-variance-authority";
import "./DropdownMenuTrigger-B1v6pHML.js";
import "reka-ui";
import "@vueuse/core";
import "./index-Jhngbhhu.js";
import "./AvatarImage-DWFQMckn.js";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
import "clsx";
import "tailwind-merge";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    customers: {}
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      name: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
      sponsor_id: null,
      status: 3,
      // 1 = Aktif, 2 = Pasif, 3 = Prospek
      registration_amount: 1e5,
      description: ""
    });
    const searchSponsor = ref("");
    const showSponsorDropdown = ref(false);
    const selectedSponsor = computed(() => {
      return props.customers.find((c) => c.id === form.sponsor_id);
    });
    const filteredSponsors = computed(() => {
      if (!searchSponsor.value) return props.customers;
      const query = searchSponsor.value.toLowerCase();
      return props.customers.filter(
        (c) => c.name.toLowerCase().includes(query) || c.ewallet_id.toLowerCase().includes(query)
      );
    });
    const selectSponsor = (customer) => {
      form.sponsor_id = customer.id;
      showSponsorDropdown.value = false;
      searchSponsor.value = "";
    };
    const handleSponsorBlur = () => {
      if (typeof window !== "undefined") {
        window.setTimeout(() => {
          showSponsorDropdown.value = false;
        }, 200);
      }
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
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { for: "username" }, {
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
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
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
                          class: { "border-destructive": unref(form).errors.email },
                          required: ""
                        }, null, _parent4, _scopeId3));
                        _push4(`<p class="text-xs text-muted-foreground"${_scopeId3}> Email aktif untuk menerima notifikasi dan verifikasi akun </p>`);
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
                          placeholder: "08xxxxxxxxxx",
                          class: { "border-destructive": unref(form).errors.phone }
                        }, null, _parent4, _scopeId3));
                        _push4(`<p class="text-xs text-muted-foreground"${_scopeId3}> Nomor telepon aktif (opsional), maksimal 20 karakter </p>`);
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
                          class: { "border-destructive": unref(form).errors.registration_amount },
                          required: ""
                        }, null, _parent4, _scopeId3));
                        _push4(`<p class="text-xs text-muted-foreground"${_scopeId3}> Biaya pendaftaran dalam Rupiah (Rp), minimal 0 </p>`);
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
                          class: { "border-destructive": unref(form).errors.password },
                          required: ""
                        }, null, _parent4, _scopeId3));
                        _push4(`<p class="text-xs text-muted-foreground"${_scopeId3}> Password minimal 8 karakter, gunakan kombinasi huruf dan angka </p>`);
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
                        _push4(`<p class="text-xs text-muted-foreground"${_scopeId3}> Ketik ulang password yang sama untuk konfirmasi </p></div></div><div class="space-y-2"${_scopeId3}>`);
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
                        _push4(`<textarea id="description" placeholder="Keterangan tambahan (opsional)" rows="3" class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"${_scopeId3}>${ssrInterpolate(unref(form).description)}</textarea><p class="text-xs text-muted-foreground"${_scopeId3}> Catatan tambahan tentang pelanggan, seperti sumber referral atau informasi penting lainnya </p></div>`);
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
                              createVNode(unref(_sfc_main$8), { for: "username" }, {
                                default: withCtx(() => [
                                  createTextVNode("Username *")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$9), {
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
                                class: { "border-destructive": unref(form).errors.email },
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Email aktif untuk menerima notifikasi dan verifikasi akun "),
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
                                placeholder: "08xxxxxxxxxx",
                                class: { "border-destructive": unref(form).errors.phone }
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Nomor telepon aktif (opsional), maksimal 20 karakter "),
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
                                class: { "border-destructive": unref(form).errors.registration_amount },
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Biaya pendaftaran dalam Rupiah (Rp), minimal 0 "),
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
                                class: { "border-destructive": unref(form).errors.password },
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Password minimal 8 karakter, gunakan kombinasi huruf dan angka "),
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
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Ketik ulang password yang sama untuk konfirmasi ")
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
                            createVNode(unref(_sfc_main$8), { for: "username" }, {
                              default: withCtx(() => [
                                createTextVNode("Username *")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$9), {
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
                              class: { "border-destructive": unref(form).errors.email },
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, " Email aktif untuk menerima notifikasi dan verifikasi akun "),
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
                              placeholder: "08xxxxxxxxxx",
                              class: { "border-destructive": unref(form).errors.phone }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, " Nomor telepon aktif (opsional), maksimal 20 karakter "),
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
                              class: { "border-destructive": unref(form).errors.registration_amount },
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, " Biaya pendaftaran dalam Rupiah (Rp), minimal 0 "),
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
                              class: { "border-destructive": unref(form).errors.password },
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, " Password minimal 8 karakter, gunakan kombinasi huruf dan angka "),
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
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, " Ketik ulang password yang sama untuk konfirmasi ")
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
                              _push5(` Pilih sponsor dan status pelanggan `);
                            } else {
                              return [
                                createTextVNode(" Pilih sponsor dan status pelanggan ")
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
                              createTextVNode(" Pilih sponsor dan status pelanggan ")
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
                              _push5(`Sponsor`);
                            } else {
                              return [
                                createTextVNode("Sponsor")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<div class="relative"${_scopeId3}><div class="relative"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          modelValue: searchSponsor.value,
                          "onUpdate:modelValue": ($event) => searchSponsor.value = $event,
                          onFocus: ($event) => showSponsorDropdown.value = true,
                          onBlur: handleSponsorBlur,
                          placeholder: "Cari sponsor berdasarkan nama atau ID...",
                          class: { "border-destructive": unref(form).errors.sponsor_id }
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(Search), { class: "absolute right-3 top-3 h-4 w-4 text-muted-foreground" }, null, _parent4, _scopeId3));
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
                        _push4(`<p class="text-xs text-muted-foreground"${_scopeId3}> Member yang merekomendasikan pelanggan ini (opsional). Kosongkan jika tidak ada sponsor </p>`);
                        if (unref(form).errors.sponsor_id) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.sponsor_id)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { for: "status" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Status *`);
                            } else {
                              return [
                                createTextVNode("Status *")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$a), {
                          modelValue: unref(form).status,
                          "onUpdate:modelValue": ($event) => unref(form).status = $event
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$b), {
                                class: { "border-destructive": unref(form).errors.status }
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$c), { placeholder: "Pilih status" }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$c), { placeholder: "Pilih status" })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$d), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$e), { value: 3 }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Prospek`);
                                        } else {
                                          return [
                                            createTextVNode("Prospek")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$e), { value: 2 }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Pasif`);
                                        } else {
                                          return [
                                            createTextVNode("Pasif")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$e), { value: 1 }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Aktif`);
                                        } else {
                                          return [
                                            createTextVNode("Aktif")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$e), { value: 3 }, {
                                        default: withCtx(() => [
                                          createTextVNode("Prospek")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$e), { value: 2 }, {
                                        default: withCtx(() => [
                                          createTextVNode("Pasif")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$e), { value: 1 }, {
                                        default: withCtx(() => [
                                          createTextVNode("Aktif")
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
                                createVNode(unref(_sfc_main$b), {
                                  class: { "border-destructive": unref(form).errors.status }
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$c), { placeholder: "Pilih status" })
                                  ]),
                                  _: 1
                                }, 8, ["class"]),
                                createVNode(unref(_sfc_main$d), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$e), { value: 3 }, {
                                      default: withCtx(() => [
                                        createTextVNode("Prospek")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$e), { value: 2 }, {
                                      default: withCtx(() => [
                                        createTextVNode("Pasif")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$e), { value: 1 }, {
                                      default: withCtx(() => [
                                        createTextVNode("Aktif")
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
                        _push4(`<p class="text-xs text-muted-foreground"${_scopeId3}><strong${_scopeId3}>Prospek:</strong> Calon member, belum masuk jaringan MLM<br${_scopeId3}><strong${_scopeId3}>Pasif:</strong> Sudah terdaftar tapi belum aktif bertransaksi<br${_scopeId3}><strong${_scopeId3}>Aktif:</strong> Member aktif dengan akses penuh ke sistem </p>`);
                        if (unref(form).errors.status) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.status)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$8), { for: "sponsor" }, {
                                default: withCtx(() => [
                                  createTextVNode("Sponsor")
                                ]),
                                _: 1
                              }),
                              createVNode("div", { class: "relative" }, [
                                createVNode("div", { class: "relative" }, [
                                  createVNode(unref(_sfc_main$9), {
                                    modelValue: searchSponsor.value,
                                    "onUpdate:modelValue": ($event) => searchSponsor.value = $event,
                                    onFocus: ($event) => showSponsorDropdown.value = true,
                                    onBlur: handleSponsorBlur,
                                    placeholder: "Cari sponsor berdasarkan nama atau ID...",
                                    class: { "border-destructive": unref(form).errors.sponsor_id }
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onFocus", "class"]),
                                  createVNode(unref(Search), { class: "absolute right-3 top-3 h-4 w-4 text-muted-foreground" })
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
                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Member yang merekomendasikan pelanggan ini (opsional). Kosongkan jika tidak ada sponsor "),
                              unref(form).errors.sponsor_id ? (openBlock(), createBlock("p", {
                                key: 1,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.sponsor_id), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$8), { for: "status" }, {
                                default: withCtx(() => [
                                  createTextVNode("Status *")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), {
                                modelValue: unref(form).status,
                                "onUpdate:modelValue": ($event) => unref(form).status = $event
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$b), {
                                    class: { "border-destructive": unref(form).errors.status }
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$c), { placeholder: "Pilih status" })
                                    ]),
                                    _: 1
                                  }, 8, ["class"]),
                                  createVNode(unref(_sfc_main$d), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$e), { value: 3 }, {
                                        default: withCtx(() => [
                                          createTextVNode("Prospek")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$e), { value: 2 }, {
                                        default: withCtx(() => [
                                          createTextVNode("Pasif")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$e), { value: 1 }, {
                                        default: withCtx(() => [
                                          createTextVNode("Aktif")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, [
                                createVNode("strong", null, "Prospek:"),
                                createTextVNode(" Calon member, belum masuk jaringan MLM"),
                                createVNode("br"),
                                createVNode("strong", null, "Pasif:"),
                                createTextVNode(" Sudah terdaftar tapi belum aktif bertransaksi"),
                                createVNode("br"),
                                createVNode("strong", null, "Aktif:"),
                                createTextVNode(" Member aktif dengan akses penuh ke sistem ")
                              ]),
                              unref(form).errors.status ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.status), 1)) : createCommentVNode("", true)
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
                            createTextVNode("Struktur Jaringan MLM")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode(" Pilih sponsor dan status pelanggan ")
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
                                createTextVNode("Sponsor")
                              ]),
                              _: 1
                            }),
                            createVNode("div", { class: "relative" }, [
                              createVNode("div", { class: "relative" }, [
                                createVNode(unref(_sfc_main$9), {
                                  modelValue: searchSponsor.value,
                                  "onUpdate:modelValue": ($event) => searchSponsor.value = $event,
                                  onFocus: ($event) => showSponsorDropdown.value = true,
                                  onBlur: handleSponsorBlur,
                                  placeholder: "Cari sponsor berdasarkan nama atau ID...",
                                  class: { "border-destructive": unref(form).errors.sponsor_id }
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "onFocus", "class"]),
                                createVNode(unref(Search), { class: "absolute right-3 top-3 h-4 w-4 text-muted-foreground" })
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
                            createVNode("p", { class: "text-xs text-muted-foreground" }, " Member yang merekomendasikan pelanggan ini (opsional). Kosongkan jika tidak ada sponsor "),
                            unref(form).errors.sponsor_id ? (openBlock(), createBlock("p", {
                              key: 1,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.sponsor_id), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "status" }, {
                              default: withCtx(() => [
                                createTextVNode("Status *")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$a), {
                              modelValue: unref(form).status,
                              "onUpdate:modelValue": ($event) => unref(form).status = $event
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$b), {
                                  class: { "border-destructive": unref(form).errors.status }
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$c), { placeholder: "Pilih status" })
                                  ]),
                                  _: 1
                                }, 8, ["class"]),
                                createVNode(unref(_sfc_main$d), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$e), { value: 3 }, {
                                      default: withCtx(() => [
                                        createTextVNode("Prospek")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$e), { value: 2 }, {
                                      default: withCtx(() => [
                                        createTextVNode("Pasif")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$e), { value: 1 }, {
                                      default: withCtx(() => [
                                        createTextVNode("Aktif")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, [
                              createVNode("strong", null, "Prospek:"),
                              createTextVNode(" Calon member, belum masuk jaringan MLM"),
                              createVNode("br"),
                              createVNode("strong", null, "Pasif:"),
                              createTextVNode(" Sudah terdaftar tapi belum aktif bertransaksi"),
                              createVNode("br"),
                              createVNode("strong", null, "Aktif:"),
                              createTextVNode(" Member aktif dengan akses penuh ke sistem ")
                            ]),
                            unref(form).errors.status ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.status), 1)) : createCommentVNode("", true)
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
                              createVNode(unref(_sfc_main$8), { for: "username" }, {
                                default: withCtx(() => [
                                  createTextVNode("Username *")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$9), {
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
                                class: { "border-destructive": unref(form).errors.email },
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Email aktif untuk menerima notifikasi dan verifikasi akun "),
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
                                placeholder: "08xxxxxxxxxx",
                                class: { "border-destructive": unref(form).errors.phone }
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Nomor telepon aktif (opsional), maksimal 20 karakter "),
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
                                class: { "border-destructive": unref(form).errors.registration_amount },
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Biaya pendaftaran dalam Rupiah (Rp), minimal 0 "),
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
                                class: { "border-destructive": unref(form).errors.password },
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Password minimal 8 karakter, gunakan kombinasi huruf dan angka "),
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
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Ketik ulang password yang sama untuk konfirmasi ")
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
                            ]),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, " Catatan tambahan tentang pelanggan, seperti sumber referral atau informasi penting lainnya ")
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
                              createTextVNode(" Pilih sponsor dan status pelanggan ")
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
                                  createTextVNode("Sponsor")
                                ]),
                                _: 1
                              }),
                              createVNode("div", { class: "relative" }, [
                                createVNode("div", { class: "relative" }, [
                                  createVNode(unref(_sfc_main$9), {
                                    modelValue: searchSponsor.value,
                                    "onUpdate:modelValue": ($event) => searchSponsor.value = $event,
                                    onFocus: ($event) => showSponsorDropdown.value = true,
                                    onBlur: handleSponsorBlur,
                                    placeholder: "Cari sponsor berdasarkan nama atau ID...",
                                    class: { "border-destructive": unref(form).errors.sponsor_id }
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onFocus", "class"]),
                                  createVNode(unref(Search), { class: "absolute right-3 top-3 h-4 w-4 text-muted-foreground" })
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
                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Member yang merekomendasikan pelanggan ini (opsional). Kosongkan jika tidak ada sponsor "),
                              unref(form).errors.sponsor_id ? (openBlock(), createBlock("p", {
                                key: 1,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.sponsor_id), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$8), { for: "status" }, {
                                default: withCtx(() => [
                                  createTextVNode("Status *")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), {
                                modelValue: unref(form).status,
                                "onUpdate:modelValue": ($event) => unref(form).status = $event
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$b), {
                                    class: { "border-destructive": unref(form).errors.status }
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$c), { placeholder: "Pilih status" })
                                    ]),
                                    _: 1
                                  }, 8, ["class"]),
                                  createVNode(unref(_sfc_main$d), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$e), { value: 3 }, {
                                        default: withCtx(() => [
                                          createTextVNode("Prospek")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$e), { value: 2 }, {
                                        default: withCtx(() => [
                                          createTextVNode("Pasif")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$e), { value: 1 }, {
                                        default: withCtx(() => [
                                          createTextVNode("Aktif")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, [
                                createVNode("strong", null, "Prospek:"),
                                createTextVNode(" Calon member, belum masuk jaringan MLM"),
                                createVNode("br"),
                                createVNode("strong", null, "Pasif:"),
                                createTextVNode(" Sudah terdaftar tapi belum aktif bertransaksi"),
                                createVNode("br"),
                                createVNode("strong", null, "Aktif:"),
                                createTextVNode(" Member aktif dengan akses penuh ke sistem ")
                              ]),
                              unref(form).errors.status ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(form).errors.status), 1)) : createCommentVNode("", true)
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
