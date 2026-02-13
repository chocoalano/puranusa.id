import { defineComponent, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { U as UserController, _ as _sfc_main$1 } from "./AppLayout-D11fLPDM.js";
import { _ as _sfc_main$3 } from "./HeadingSmall-B1yfmTIh.js";
import { _ as _sfc_main$6 } from "./InputError-BhTWS2NZ.js";
import { _ as _sfc_main$2 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$5 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$4 } from "./Label-16aMY2sx.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { ArrowLeft } from "lucide-vue-next";
import { toast } from "vue-sonner";
import { _ as _sfc_main$7, a as _sfc_main$8, b as _sfc_main$9, c as _sfc_main$a, d as _sfc_main$b } from "./SelectValue-BUnv4mQg.js";
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
    user: {}
  },
  setup(__props) {
    const breadcrumbItems = [
      { title: "User Management", href: UserController.index.url() },
      { title: "Edit User", href: UserController.edit.url(__props.user.id) }
    ];
    const form = useForm({
      name: __props.user.name,
      email: __props.user.email,
      role: __props.user.role ?? "admin",
      password: "",
      password_confirmation: ""
    });
    const submit = () => {
      form.put(UserController.update.url(__props.user.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Berhasil", { description: "Data pengguna berhasil diperbarui" });
          form.reset("password", "password_confirmation");
          form.clearErrors();
        },
        onError: () => {
          toast.error("Gagal", { description: "Terjadi kesalahan saat memperbarui data pengguna" });
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ breadcrumbs: breadcrumbItems }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: `Edit ${__props.user.name}`
            }, null, _parent2, _scopeId));
            _push2(`<div class="rounded-xl p-4 space-y-6 py-6"${_scopeId}><div class="flex items-center gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(UserController).index.url()
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
            _push2(`<div${_scopeId}><h1 class="text-3xl font-bold tracking-tight"${_scopeId}>Edit User</h1><p class="text-muted-foreground"${_scopeId}>Update ${ssrInterpolate(__props.user.name)}&#39;s information</p></div></div><div class="mx-auto max-w-7xl"${_scopeId}><form class="space-y-6"${_scopeId}><div class="rounded-lg border bg-card p-6"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              title: "Informasi Pengguna",
              description: "Perbarui detail pengguna"
            }, null, _parent2, _scopeId));
            _push2(`<div class="mt-6 space-y-4"${_scopeId}><div class="grid gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$4), { for: "name" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Nama Lengkap`);
                } else {
                  return [
                    createTextVNode("Nama Lengkap")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$5), {
              id: "name",
              type: "text",
              modelValue: unref(form).name,
              "onUpdate:modelValue": ($event) => unref(form).name = $event,
              required: "",
              autofocus: "",
              placeholder: "Masukkan nama lengkap pengguna"
            }, null, _parent2, _scopeId));
            _push2(`<p class="text-sm text-muted-foreground"${_scopeId}> Nama lengkap yang akan ditampilkan di sistem </p>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              message: unref(form).errors.name
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="grid gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$4), { for: "email" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Alamat Email`);
                } else {
                  return [
                    createTextVNode("Alamat Email")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$5), {
              id: "email",
              type: "email",
              modelValue: unref(form).email,
              "onUpdate:modelValue": ($event) => unref(form).email = $event,
              required: "",
              placeholder: "contoh@email.com"
            }, null, _parent2, _scopeId));
            _push2(`<p class="text-sm text-muted-foreground"${_scopeId}> Email harus unik dan akan digunakan untuk login </p>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              message: unref(form).errors.email
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="grid gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$4), { for: "role" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Role`);
                } else {
                  return [
                    createTextVNode("Role")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$7), {
              modelValue: unref(form).role,
              "onUpdate:modelValue": ($event) => unref(form).role = $event
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$8), { id: "role" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { placeholder: "Pilih role" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$9), { placeholder: "Pilih role" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$a), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$b), { value: "superadmin" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Super Admin`);
                            } else {
                              return [
                                createTextVNode("Super Admin")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$b), { value: "admin" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Admin`);
                            } else {
                              return [
                                createTextVNode("Admin")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$b), { value: "superadmin" }, {
                            default: withCtx(() => [
                              createTextVNode("Super Admin")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$b), { value: "admin" }, {
                            default: withCtx(() => [
                              createTextVNode("Admin")
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
                    createVNode(unref(_sfc_main$8), { id: "role" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$9), { placeholder: "Pilih role" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$a), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$b), { value: "superadmin" }, {
                          default: withCtx(() => [
                            createTextVNode("Super Admin")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$b), { value: "admin" }, {
                          default: withCtx(() => [
                            createTextVNode("Admin")
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
            _push2(`<p class="text-sm text-muted-foreground"${_scopeId}>Role pengguna dalam sistem</p>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              message: unref(form).errors.role
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="grid gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$4), { for: "password" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Kata Sandi Baru`);
                } else {
                  return [
                    createTextVNode("Kata Sandi Baru")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$5), {
              id: "password",
              type: "password",
              modelValue: unref(form).password,
              "onUpdate:modelValue": ($event) => unref(form).password = $event,
              placeholder: "Kosongkan jika tidak ingin mengubah"
            }, null, _parent2, _scopeId));
            _push2(`<p class="text-sm text-muted-foreground"${_scopeId}> Isi hanya jika ingin mengubah kata sandi. Minimal 8 karakter dengan kombinasi huruf, angka, dan simbol </p>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              message: unref(form).errors.password
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="grid gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$4), { for: "password_confirmation" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Konfirmasi Kata Sandi Baru`);
                } else {
                  return [
                    createTextVNode("Konfirmasi Kata Sandi Baru")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$5), {
              id: "password_confirmation",
              type: "password",
              modelValue: unref(form).password_confirmation,
              "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
              placeholder: "Kosongkan jika tidak ingin mengubah"
            }, null, _parent2, _scopeId));
            _push2(`<p class="text-sm text-muted-foreground"${_scopeId}> Ketik ulang kata sandi baru untuk memastikan tidak ada kesalahan </p>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              message: unref(form).errors.password_confirmation
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="flex justify-end gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(UserController).index.url()
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$2), {
                    type: "button",
                    variant: "outline"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Cancel `);
                      } else {
                        return [
                          createTextVNode(" Cancel ")
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
                        createTextVNode(" Cancel ")
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
                  _push3(`${ssrInterpolate(unref(form).processing ? "Updating..." : "Update User")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(form).processing ? "Updating..." : "Update User"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form></div></div>`);
          } else {
            return [
              createVNode(unref(Head), {
                title: `Edit ${__props.user.name}`
              }, null, 8, ["title"]),
              createVNode("div", { class: "rounded-xl p-4 space-y-6 py-6" }, [
                createVNode("div", { class: "flex items-center gap-4" }, [
                  createVNode(unref(Link), {
                    href: unref(UserController).index.url()
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
                    createVNode("h1", { class: "text-3xl font-bold tracking-tight" }, "Edit User"),
                    createVNode("p", { class: "text-muted-foreground" }, "Update " + toDisplayString(__props.user.name) + "'s information", 1)
                  ])
                ]),
                createVNode("div", { class: "mx-auto max-w-7xl" }, [
                  createVNode("form", {
                    class: "space-y-6",
                    onSubmit: withModifiers(submit, ["prevent"])
                  }, [
                    createVNode("div", { class: "rounded-lg border bg-card p-6" }, [
                      createVNode(_sfc_main$3, {
                        title: "Informasi Pengguna",
                        description: "Perbarui detail pengguna"
                      }),
                      createVNode("div", { class: "mt-6 space-y-4" }, [
                        createVNode("div", { class: "grid gap-2" }, [
                          createVNode(unref(_sfc_main$4), { for: "name" }, {
                            default: withCtx(() => [
                              createTextVNode("Nama Lengkap")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$5), {
                            id: "name",
                            type: "text",
                            modelValue: unref(form).name,
                            "onUpdate:modelValue": ($event) => unref(form).name = $event,
                            required: "",
                            autofocus: "",
                            placeholder: "Masukkan nama lengkap pengguna"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Nama lengkap yang akan ditampilkan di sistem "),
                          createVNode(_sfc_main$6, {
                            message: unref(form).errors.name
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "grid gap-2" }, [
                          createVNode(unref(_sfc_main$4), { for: "email" }, {
                            default: withCtx(() => [
                              createTextVNode("Alamat Email")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$5), {
                            id: "email",
                            type: "email",
                            modelValue: unref(form).email,
                            "onUpdate:modelValue": ($event) => unref(form).email = $event,
                            required: "",
                            placeholder: "contoh@email.com"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Email harus unik dan akan digunakan untuk login "),
                          createVNode(_sfc_main$6, {
                            message: unref(form).errors.email
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "grid gap-2" }, [
                          createVNode(unref(_sfc_main$4), { for: "role" }, {
                            default: withCtx(() => [
                              createTextVNode("Role")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$7), {
                            modelValue: unref(form).role,
                            "onUpdate:modelValue": ($event) => unref(form).role = $event
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$8), { id: "role" }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$9), { placeholder: "Pilih role" })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$b), { value: "superadmin" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Super Admin")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$b), { value: "admin" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Admin")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, "Role pengguna dalam sistem"),
                          createVNode(_sfc_main$6, {
                            message: unref(form).errors.role
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "grid gap-2" }, [
                          createVNode(unref(_sfc_main$4), { for: "password" }, {
                            default: withCtx(() => [
                              createTextVNode("Kata Sandi Baru")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$5), {
                            id: "password",
                            type: "password",
                            modelValue: unref(form).password,
                            "onUpdate:modelValue": ($event) => unref(form).password = $event,
                            placeholder: "Kosongkan jika tidak ingin mengubah"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Isi hanya jika ingin mengubah kata sandi. Minimal 8 karakter dengan kombinasi huruf, angka, dan simbol "),
                          createVNode(_sfc_main$6, {
                            message: unref(form).errors.password
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "grid gap-2" }, [
                          createVNode(unref(_sfc_main$4), { for: "password_confirmation" }, {
                            default: withCtx(() => [
                              createTextVNode("Konfirmasi Kata Sandi Baru")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$5), {
                            id: "password_confirmation",
                            type: "password",
                            modelValue: unref(form).password_confirmation,
                            "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                            placeholder: "Kosongkan jika tidak ingin mengubah"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Ketik ulang kata sandi baru untuk memastikan tidak ada kesalahan "),
                          createVNode(_sfc_main$6, {
                            message: unref(form).errors.password_confirmation
                          }, null, 8, ["message"])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "flex justify-end gap-4" }, [
                      createVNode(unref(Link), {
                        href: unref(UserController).index.url()
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$2), {
                            type: "button",
                            variant: "outline"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Cancel ")
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
                          createTextVNode(toDisplayString(unref(form).processing ? "Updating..." : "Update User"), 1)
                        ]),
                        _: 1
                      }, 8, ["disabled"])
                    ])
                  ], 32)
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Users/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
