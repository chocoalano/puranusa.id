import { defineComponent, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { U as UserController, _ as _sfc_main$1 } from "./AppLayout-B3xU4M63.js";
import { _ as _sfc_main$3 } from "./HeadingSmall-B1yfmTIh.js";
import { _ as _sfc_main$6 } from "./InputError-BhTWS2NZ.js";
import { _ as _sfc_main$2 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$5 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$4 } from "./Label-16aMY2sx.js";
import { Head, Link, Form } from "@inertiajs/vue3";
import { ArrowLeft } from "lucide-vue-next";
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
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    user: {}
  },
  setup(__props) {
    const props = __props;
    const breadcrumbItems = [
      {
        title: "User Management",
        href: UserController.index.url()
      },
      {
        title: "Edit User",
        href: UserController.edit.url(props.user.id)
      }
    ];
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
            _push2(`<div${_scopeId}><h1 class="text-3xl font-bold tracking-tight"${_scopeId}>Edit User</h1><p class="text-muted-foreground"${_scopeId}>Update ${ssrInterpolate(__props.user.name)}&#39;s information</p></div></div><div class="mx-auto max-w-2xl"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Form), {
              action: unref(UserController).update.url(__props.user.id),
              method: "put",
              class: "space-y-6",
              onSuccess: () => unref(toast).success("Berhasil", { description: "Data pengguna berhasil diperbarui" }),
              onError: () => unref(toast).error("Gagal", { description: "Terjadi kesalahan saat memperbarui data pengguna" })
            }, {
              default: withCtx(({ errors, processing }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="rounded-lg border bg-card p-6"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    title: "Informasi Pengguna",
                    description: "Perbarui detail pengguna"
                  }, null, _parent3, _scopeId2));
                  _push3(`<div class="mt-6 space-y-4"${_scopeId2}><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { for: "name" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Nama Lengkap`);
                      } else {
                        return [
                          createTextVNode("Nama Lengkap")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$5), {
                    id: "name",
                    name: "name",
                    type: "text",
                    value: __props.user.name,
                    required: "",
                    autofocus: "",
                    placeholder: "Masukkan nama lengkap pengguna"
                  }, null, _parent3, _scopeId2));
                  _push3(`<p class="text-sm text-muted-foreground"${_scopeId2}>Nama lengkap yang akan ditampilkan di sistem</p>`);
                  _push3(ssrRenderComponent(_sfc_main$6, {
                    message: errors.name
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { for: "email" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Alamat Email`);
                      } else {
                        return [
                          createTextVNode("Alamat Email")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$5), {
                    id: "email",
                    name: "email",
                    type: "email",
                    value: __props.user.email,
                    required: "",
                    placeholder: "contoh@email.com"
                  }, null, _parent3, _scopeId2));
                  _push3(`<p class="text-sm text-muted-foreground"${_scopeId2}>Email harus unik dan akan digunakan untuk login</p>`);
                  _push3(ssrRenderComponent(_sfc_main$6, {
                    message: errors.email
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { for: "password" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Kata Sandi Baru`);
                      } else {
                        return [
                          createTextVNode("Kata Sandi Baru")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$5), {
                    id: "password",
                    name: "password",
                    type: "password",
                    placeholder: "Kosongkan jika tidak ingin mengubah"
                  }, null, _parent3, _scopeId2));
                  _push3(`<p class="text-sm text-muted-foreground"${_scopeId2}>Isi hanya jika ingin mengubah kata sandi. Minimal 8 karakter dengan kombinasi huruf, angka, dan simbol</p>`);
                  _push3(ssrRenderComponent(_sfc_main$6, {
                    message: errors.password
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { for: "password_confirmation" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Konfirmasi Kata Sandi Baru`);
                      } else {
                        return [
                          createTextVNode("Konfirmasi Kata Sandi Baru")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$5), {
                    id: "password_confirmation",
                    name: "password_confirmation",
                    type: "password",
                    placeholder: "Kosongkan jika tidak ingin mengubah"
                  }, null, _parent3, _scopeId2));
                  _push3(`<p class="text-sm text-muted-foreground"${_scopeId2}>Ketik ulang kata sandi baru untuk memastikan tidak ada kesalahan</p></div></div></div><div class="flex justify-end gap-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Link), {
                    href: unref(UserController).index.url()
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$2), {
                          type: "button",
                          variant: "outline"
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Cancel `);
                            } else {
                              return [
                                createTextVNode(" Cancel ")
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
                              createTextVNode(" Cancel ")
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
                        _push4(`${ssrInterpolate(processing ? "Updating..." : "Update User")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(processing ? "Updating..." : "Update User"), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
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
                            name: "name",
                            type: "text",
                            value: __props.user.name,
                            required: "",
                            autofocus: "",
                            placeholder: "Masukkan nama lengkap pengguna"
                          }, null, 8, ["value"]),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, "Nama lengkap yang akan ditampilkan di sistem"),
                          createVNode(_sfc_main$6, {
                            message: errors.name
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
                            name: "email",
                            type: "email",
                            value: __props.user.email,
                            required: "",
                            placeholder: "contoh@email.com"
                          }, null, 8, ["value"]),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, "Email harus unik dan akan digunakan untuk login"),
                          createVNode(_sfc_main$6, {
                            message: errors.email
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
                            name: "password",
                            type: "password",
                            placeholder: "Kosongkan jika tidak ingin mengubah"
                          }),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, "Isi hanya jika ingin mengubah kata sandi. Minimal 8 karakter dengan kombinasi huruf, angka, dan simbol"),
                          createVNode(_sfc_main$6, {
                            message: errors.password
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
                            name: "password_confirmation",
                            type: "password",
                            placeholder: "Kosongkan jika tidak ingin mengubah"
                          }),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, "Ketik ulang kata sandi baru untuk memastikan tidak ada kesalahan")
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
                        disabled: processing
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(processing ? "Updating..." : "Update User"), 1)
                        ]),
                        _: 2
                      }, 1032, ["disabled"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
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
                createVNode("div", { class: "mx-auto max-w-2xl" }, [
                  createVNode(unref(Form), {
                    action: unref(UserController).update.url(__props.user.id),
                    method: "put",
                    class: "space-y-6",
                    onSuccess: () => unref(toast).success("Berhasil", { description: "Data pengguna berhasil diperbarui" }),
                    onError: () => unref(toast).error("Gagal", { description: "Terjadi kesalahan saat memperbarui data pengguna" })
                  }, {
                    default: withCtx(({ errors, processing }) => [
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
                              name: "name",
                              type: "text",
                              value: __props.user.name,
                              required: "",
                              autofocus: "",
                              placeholder: "Masukkan nama lengkap pengguna"
                            }, null, 8, ["value"]),
                            createVNode("p", { class: "text-sm text-muted-foreground" }, "Nama lengkap yang akan ditampilkan di sistem"),
                            createVNode(_sfc_main$6, {
                              message: errors.name
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
                              name: "email",
                              type: "email",
                              value: __props.user.email,
                              required: "",
                              placeholder: "contoh@email.com"
                            }, null, 8, ["value"]),
                            createVNode("p", { class: "text-sm text-muted-foreground" }, "Email harus unik dan akan digunakan untuk login"),
                            createVNode(_sfc_main$6, {
                              message: errors.email
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
                              name: "password",
                              type: "password",
                              placeholder: "Kosongkan jika tidak ingin mengubah"
                            }),
                            createVNode("p", { class: "text-sm text-muted-foreground" }, "Isi hanya jika ingin mengubah kata sandi. Minimal 8 karakter dengan kombinasi huruf, angka, dan simbol"),
                            createVNode(_sfc_main$6, {
                              message: errors.password
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
                              name: "password_confirmation",
                              type: "password",
                              placeholder: "Kosongkan jika tidak ingin mengubah"
                            }),
                            createVNode("p", { class: "text-sm text-muted-foreground" }, "Ketik ulang kata sandi baru untuk memastikan tidak ada kesalahan")
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
                          disabled: processing
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(processing ? "Updating..." : "Update User"), 1)
                          ]),
                          _: 2
                        }, 1032, ["disabled"])
                      ])
                    ]),
                    _: 1
                  }, 8, ["action", "onSuccess", "onError"])
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
