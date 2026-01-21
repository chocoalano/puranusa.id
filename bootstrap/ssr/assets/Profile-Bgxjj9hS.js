import { defineComponent, useTemplateRef, mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext, createBlock, createCommentVNode, openBlock, Transition, withDirectives, vShow } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { q as queryParams } from "./index--D7ld9AJ.js";
import { an as edit$1, _ as _sfc_main$f } from "./AppLayout-BwB3YbyA.js";
import { s as send } from "./index-D_K-qYYN.js";
import { Form, usePage, Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./HeadingSmall-B1yfmTIh.js";
import { _ as _sfc_main$c } from "./InputError-BhTWS2NZ.js";
import { _ as _sfc_main$5 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$3, f as _sfc_main$4, a as _sfc_main$6, b as _sfc_main$7, c as _sfc_main$8, d as _sfc_main$9, e as _sfc_main$d, g as _sfc_main$e } from "./DialogTrigger-DpE8BjOt.js";
import { _ as _sfc_main$b } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$a } from "./Label-16aMY2sx.js";
import { _ as _sfc_main$g } from "./Layout-B_qTY6de.js";
import "class-variance-authority";
import "./DropdownMenuTrigger-B1v6pHML.js";
import "reka-ui";
import "@vueuse/core";
import "lucide-vue-next";
import "./AvatarImage-DWFQMckn.js";
import "./index-BsP5JKUP.js";
import "vue-sonner";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
import "clsx";
import "tailwind-merge";
import "./Heading-CyRBBIB2.js";
import "./index-CTv85sGw.js";
const edit = (options) => ({
  url: edit.url(options),
  method: "get"
});
edit.definition = {
  methods: ["get", "head"],
  url: "/settings/profile"
};
edit.url = (options) => {
  return edit.definition.url + queryParams(options);
};
edit.get = (options) => ({
  url: edit.url(options),
  method: "get"
});
edit.head = (options) => ({
  url: edit.url(options),
  method: "head"
});
const editForm = (options) => ({
  action: edit.url(options),
  method: "get"
});
editForm.get = (options) => ({
  action: edit.url(options),
  method: "get"
});
editForm.head = (options) => ({
  action: edit.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
edit.form = editForm;
const update = (options) => ({
  url: update.url(options),
  method: "patch"
});
update.definition = {
  methods: ["patch"],
  url: "/settings/profile"
};
update.url = (options) => {
  return update.definition.url + queryParams(options);
};
update.patch = (options) => ({
  url: update.url(options),
  method: "patch"
});
const updateForm = (options) => ({
  action: update.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PATCH",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
updateForm.patch = (options) => ({
  action: update.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PATCH",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
update.form = updateForm;
const destroy = (options) => ({
  url: destroy.url(options),
  method: "delete"
});
destroy.definition = {
  methods: ["delete"],
  url: "/settings/profile"
};
destroy.url = (options) => {
  return destroy.definition.url + queryParams(options);
};
destroy.delete = (options) => ({
  url: destroy.url(options),
  method: "delete"
});
const destroyForm = (options) => ({
  action: destroy.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
destroyForm.delete = (options) => ({
  action: destroy.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
destroy.form = destroyForm;
const ProfileController = { edit, update, destroy };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "DeleteUser",
  __ssrInlineRender: true,
  setup(__props) {
    const passwordInput = useTemplateRef("passwordInput");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        title: "Delete account",
        description: "Delete your account and all of its resources"
      }, null, _parent));
      _push(`<div class="space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10"><div class="relative space-y-0.5 text-red-600 dark:text-red-100"><p class="font-medium">Warning</p><p class="text-sm"> Please proceed with caution, this cannot be undone. </p></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$3), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$4), { "as-child": "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$5), {
                    variant: "destructive",
                    "data-test": "delete-user-button"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Delete account`);
                      } else {
                        return [
                          createTextVNode("Delete account")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$5), {
                      variant: "destructive",
                      "data-test": "delete-user-button"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Delete account")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$6), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Form), mergeProps(unref(ProfileController).destroy.form(), {
                    "reset-on-success": "",
                    onError: () => passwordInput.value?.$el?.focus(),
                    options: {
                      preserveScroll: true
                    },
                    class: "space-y-6"
                  }), {
                    default: withCtx(({ errors, processing, reset, clearErrors }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$7), { class: "space-y-3" }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$8), null, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Are you sure you want to delete your account?`);
                                  } else {
                                    return [
                                      createTextVNode("Are you sure you want to delete your account?")
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$9), null, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Once your account is deleted, all of its resources and data will also be permanently deleted. Please enter your password to confirm you would like to permanently delete your account. `);
                                  } else {
                                    return [
                                      createTextVNode(" Once your account is deleted, all of its resources and data will also be permanently deleted. Please enter your password to confirm you would like to permanently delete your account. ")
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$8), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Are you sure you want to delete your account?")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$9), null, {
                                  default: withCtx(() => [
                                    createTextVNode(" Once your account is deleted, all of its resources and data will also be permanently deleted. Please enter your password to confirm you would like to permanently delete your account. ")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(`<div class="grid gap-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$a), {
                          for: "password",
                          class: "sr-only"
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Password`);
                            } else {
                              return [
                                createTextVNode("Password")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$b), {
                          id: "password",
                          type: "password",
                          name: "password",
                          ref_key: "passwordInput",
                          ref: passwordInput,
                          placeholder: "Password"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_sfc_main$c, {
                          message: errors.password
                        }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$d), { class: "gap-2" }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$e), { "as-child": "" }, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$5), {
                                      variant: "secondary",
                                      onClick: () => {
                                        clearErrors();
                                        reset();
                                      }
                                    }, {
                                      default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` Cancel `);
                                        } else {
                                          return [
                                            createTextVNode(" Cancel ")
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$5), {
                                        variant: "secondary",
                                        onClick: () => {
                                          clearErrors();
                                          reset();
                                        }
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Cancel ")
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$5), {
                                type: "submit",
                                variant: "destructive",
                                disabled: processing,
                                "data-test": "confirm-delete-user-button"
                              }, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Delete account `);
                                  } else {
                                    return [
                                      createTextVNode(" Delete account ")
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$e), { "as-child": "" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$5), {
                                      variant: "secondary",
                                      onClick: () => {
                                        clearErrors();
                                        reset();
                                      }
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Cancel ")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$5), {
                                  type: "submit",
                                  variant: "destructive",
                                  disabled: processing,
                                  "data-test": "confirm-delete-user-button"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Delete account ")
                                  ]),
                                  _: 1
                                }, 8, ["disabled"])
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$7), { class: "space-y-3" }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$8), null, {
                                default: withCtx(() => [
                                  createTextVNode("Are you sure you want to delete your account?")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$9), null, {
                                default: withCtx(() => [
                                  createTextVNode(" Once your account is deleted, all of its resources and data will also be permanently deleted. Please enter your password to confirm you would like to permanently delete your account. ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode("div", { class: "grid gap-2" }, [
                            createVNode(unref(_sfc_main$a), {
                              for: "password",
                              class: "sr-only"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Password")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$b), {
                              id: "password",
                              type: "password",
                              name: "password",
                              ref_key: "passwordInput",
                              ref: passwordInput,
                              placeholder: "Password"
                            }, null, 512),
                            createVNode(_sfc_main$c, {
                              message: errors.password
                            }, null, 8, ["message"])
                          ]),
                          createVNode(unref(_sfc_main$d), { class: "gap-2" }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$e), { "as-child": "" }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$5), {
                                    variant: "secondary",
                                    onClick: () => {
                                      clearErrors();
                                      reset();
                                    }
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Cancel ")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$5), {
                                type: "submit",
                                variant: "destructive",
                                disabled: processing,
                                "data-test": "confirm-delete-user-button"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Delete account ")
                                ]),
                                _: 1
                              }, 8, ["disabled"])
                            ]),
                            _: 2
                          }, 1024)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Form), mergeProps(unref(ProfileController).destroy.form(), {
                      "reset-on-success": "",
                      onError: () => passwordInput.value?.$el?.focus(),
                      options: {
                        preserveScroll: true
                      },
                      class: "space-y-6"
                    }), {
                      default: withCtx(({ errors, processing, reset, clearErrors }) => [
                        createVNode(unref(_sfc_main$7), { class: "space-y-3" }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$8), null, {
                              default: withCtx(() => [
                                createTextVNode("Are you sure you want to delete your account?")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$9), null, {
                              default: withCtx(() => [
                                createTextVNode(" Once your account is deleted, all of its resources and data will also be permanently deleted. Please enter your password to confirm you would like to permanently delete your account. ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "grid gap-2" }, [
                          createVNode(unref(_sfc_main$a), {
                            for: "password",
                            class: "sr-only"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Password")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$b), {
                            id: "password",
                            type: "password",
                            name: "password",
                            ref_key: "passwordInput",
                            ref: passwordInput,
                            placeholder: "Password"
                          }, null, 512),
                          createVNode(_sfc_main$c, {
                            message: errors.password
                          }, null, 8, ["message"])
                        ]),
                        createVNode(unref(_sfc_main$d), { class: "gap-2" }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$e), { "as-child": "" }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$5), {
                                  variant: "secondary",
                                  onClick: () => {
                                    clearErrors();
                                    reset();
                                  }
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Cancel ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(unref(_sfc_main$5), {
                              type: "submit",
                              variant: "destructive",
                              disabled: processing,
                              "data-test": "confirm-delete-user-button"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Delete account ")
                              ]),
                              _: 1
                            }, 8, ["disabled"])
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 1
                    }, 16, ["onError"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$4), { "as-child": "" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$5), {
                    variant: "destructive",
                    "data-test": "delete-user-button"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Delete account")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$6), null, {
                default: withCtx(() => [
                  createVNode(unref(Form), mergeProps(unref(ProfileController).destroy.form(), {
                    "reset-on-success": "",
                    onError: () => passwordInput.value?.$el?.focus(),
                    options: {
                      preserveScroll: true
                    },
                    class: "space-y-6"
                  }), {
                    default: withCtx(({ errors, processing, reset, clearErrors }) => [
                      createVNode(unref(_sfc_main$7), { class: "space-y-3" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              createTextVNode("Are you sure you want to delete your account?")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$9), null, {
                            default: withCtx(() => [
                              createTextVNode(" Once your account is deleted, all of its resources and data will also be permanently deleted. Please enter your password to confirm you would like to permanently delete your account. ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(unref(_sfc_main$a), {
                          for: "password",
                          class: "sr-only"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Password")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$b), {
                          id: "password",
                          type: "password",
                          name: "password",
                          ref_key: "passwordInput",
                          ref: passwordInput,
                          placeholder: "Password"
                        }, null, 512),
                        createVNode(_sfc_main$c, {
                          message: errors.password
                        }, null, 8, ["message"])
                      ]),
                      createVNode(unref(_sfc_main$d), { class: "gap-2" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$e), { "as-child": "" }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$5), {
                                variant: "secondary",
                                onClick: () => {
                                  clearErrors();
                                  reset();
                                }
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Cancel ")
                                ]),
                                _: 1
                              }, 8, ["onClick"])
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$5), {
                            type: "submit",
                            variant: "destructive",
                            disabled: processing,
                            "data-test": "confirm-delete-user-button"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Delete account ")
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 1
                  }, 16, ["onError"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/DeleteUser.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Profile",
  __ssrInlineRender: true,
  props: {
    mustVerifyEmail: { type: Boolean },
    status: {}
  },
  setup(__props) {
    const breadcrumbItems = [
      {
        title: "Profile settings",
        href: edit$1().url
      }
    ];
    const page = usePage();
    const user = page.props.auth.user;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$f, mergeProps({ breadcrumbs: breadcrumbItems }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Profile settings" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$g, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex flex-col space-y-6"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$2, {
                    title: "Profile information",
                    description: "Update your name and email address"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(Form), mergeProps(unref(ProfileController).update.form(), { class: "space-y-6" }), {
                    default: withCtx(({ errors, processing, recentlySuccessful }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="grid gap-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$a), { for: "name" }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Name`);
                            } else {
                              return [
                                createTextVNode("Name")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$b), {
                          id: "name",
                          class: "mt-1 block w-full",
                          name: "name",
                          "default-value": unref(user).name,
                          required: "",
                          autocomplete: "name",
                          placeholder: "Full name"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_sfc_main$c, {
                          class: "mt-2",
                          message: errors.name
                        }, null, _parent4, _scopeId3));
                        _push4(`</div><div class="grid gap-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$a), { for: "email" }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Email address`);
                            } else {
                              return [
                                createTextVNode("Email address")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$b), {
                          id: "email",
                          type: "email",
                          class: "mt-1 block w-full",
                          name: "email",
                          "default-value": unref(user).email,
                          required: "",
                          autocomplete: "username",
                          placeholder: "Email address"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_sfc_main$c, {
                          class: "mt-2",
                          message: errors.email
                        }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                        if (__props.mustVerifyEmail && !unref(user).email_verified_at) {
                          _push4(`<div${_scopeId3}><p class="-mt-4 text-sm text-muted-foreground"${_scopeId3}> Your email address is unverified. `);
                          _push4(ssrRenderComponent(unref(Link), {
                            href: unref(send)(),
                            as: "button",
                            class: "text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                          }, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` Click here to resend the verification email. `);
                              } else {
                                return [
                                  createTextVNode(" Click here to resend the verification email. ")
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(`</p>`);
                          if (__props.status === "verification-link-sent") {
                            _push4(`<div class="mt-2 text-sm font-medium text-green-600"${_scopeId3}> A new verification link has been sent to your email address. </div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`</div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`<div class="flex items-center gap-4"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$5), {
                          disabled: processing,
                          "data-test": "update-profile-button"
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Save`);
                            } else {
                              return [
                                createTextVNode("Save")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(`<p class="text-sm text-neutral-600" style="${ssrRenderStyle(recentlySuccessful ? null : { display: "none" })}"${_scopeId3}> Saved. </p></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "grid gap-2" }, [
                            createVNode(unref(_sfc_main$a), { for: "name" }, {
                              default: withCtx(() => [
                                createTextVNode("Name")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$b), {
                              id: "name",
                              class: "mt-1 block w-full",
                              name: "name",
                              "default-value": unref(user).name,
                              required: "",
                              autocomplete: "name",
                              placeholder: "Full name"
                            }, null, 8, ["default-value"]),
                            createVNode(_sfc_main$c, {
                              class: "mt-2",
                              message: errors.name
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", { class: "grid gap-2" }, [
                            createVNode(unref(_sfc_main$a), { for: "email" }, {
                              default: withCtx(() => [
                                createTextVNode("Email address")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$b), {
                              id: "email",
                              type: "email",
                              class: "mt-1 block w-full",
                              name: "email",
                              "default-value": unref(user).email,
                              required: "",
                              autocomplete: "username",
                              placeholder: "Email address"
                            }, null, 8, ["default-value"]),
                            createVNode(_sfc_main$c, {
                              class: "mt-2",
                              message: errors.email
                            }, null, 8, ["message"])
                          ]),
                          __props.mustVerifyEmail && !unref(user).email_verified_at ? (openBlock(), createBlock("div", { key: 0 }, [
                            createVNode("p", { class: "-mt-4 text-sm text-muted-foreground" }, [
                              createTextVNode(" Your email address is unverified. "),
                              createVNode(unref(Link), {
                                href: unref(send)(),
                                as: "button",
                                class: "text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Click here to resend the verification email. ")
                                ]),
                                _: 1
                              }, 8, ["href"])
                            ]),
                            __props.status === "verification-link-sent" ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-2 text-sm font-medium text-green-600"
                            }, " A new verification link has been sent to your email address. ")) : createCommentVNode("", true)
                          ])) : createCommentVNode("", true),
                          createVNode("div", { class: "flex items-center gap-4" }, [
                            createVNode(unref(_sfc_main$5), {
                              disabled: processing,
                              "data-test": "update-profile-button"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Save")
                              ]),
                              _: 1
                            }, 8, ["disabled"]),
                            createVNode(Transition, {
                              "enter-active-class": "transition ease-in-out",
                              "enter-from-class": "opacity-0",
                              "leave-active-class": "transition ease-in-out",
                              "leave-to-class": "opacity-0"
                            }, {
                              default: withCtx(() => [
                                withDirectives(createVNode("p", { class: "text-sm text-neutral-600" }, " Saved. ", 512), [
                                  [vShow, recentlySuccessful]
                                ])
                              ]),
                              _: 2
                            }, 1024)
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_sfc_main$1, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "flex flex-col space-y-6" }, [
                      createVNode(_sfc_main$2, {
                        title: "Profile information",
                        description: "Update your name and email address"
                      }),
                      createVNode(unref(Form), mergeProps(unref(ProfileController).update.form(), { class: "space-y-6" }), {
                        default: withCtx(({ errors, processing, recentlySuccessful }) => [
                          createVNode("div", { class: "grid gap-2" }, [
                            createVNode(unref(_sfc_main$a), { for: "name" }, {
                              default: withCtx(() => [
                                createTextVNode("Name")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$b), {
                              id: "name",
                              class: "mt-1 block w-full",
                              name: "name",
                              "default-value": unref(user).name,
                              required: "",
                              autocomplete: "name",
                              placeholder: "Full name"
                            }, null, 8, ["default-value"]),
                            createVNode(_sfc_main$c, {
                              class: "mt-2",
                              message: errors.name
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", { class: "grid gap-2" }, [
                            createVNode(unref(_sfc_main$a), { for: "email" }, {
                              default: withCtx(() => [
                                createTextVNode("Email address")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$b), {
                              id: "email",
                              type: "email",
                              class: "mt-1 block w-full",
                              name: "email",
                              "default-value": unref(user).email,
                              required: "",
                              autocomplete: "username",
                              placeholder: "Email address"
                            }, null, 8, ["default-value"]),
                            createVNode(_sfc_main$c, {
                              class: "mt-2",
                              message: errors.email
                            }, null, 8, ["message"])
                          ]),
                          __props.mustVerifyEmail && !unref(user).email_verified_at ? (openBlock(), createBlock("div", { key: 0 }, [
                            createVNode("p", { class: "-mt-4 text-sm text-muted-foreground" }, [
                              createTextVNode(" Your email address is unverified. "),
                              createVNode(unref(Link), {
                                href: unref(send)(),
                                as: "button",
                                class: "text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Click here to resend the verification email. ")
                                ]),
                                _: 1
                              }, 8, ["href"])
                            ]),
                            __props.status === "verification-link-sent" ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-2 text-sm font-medium text-green-600"
                            }, " A new verification link has been sent to your email address. ")) : createCommentVNode("", true)
                          ])) : createCommentVNode("", true),
                          createVNode("div", { class: "flex items-center gap-4" }, [
                            createVNode(unref(_sfc_main$5), {
                              disabled: processing,
                              "data-test": "update-profile-button"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Save")
                              ]),
                              _: 1
                            }, 8, ["disabled"]),
                            createVNode(Transition, {
                              "enter-active-class": "transition ease-in-out",
                              "enter-from-class": "opacity-0",
                              "leave-active-class": "transition ease-in-out",
                              "leave-to-class": "opacity-0"
                            }, {
                              default: withCtx(() => [
                                withDirectives(createVNode("p", { class: "text-sm text-neutral-600" }, " Saved. ", 512), [
                                  [vShow, recentlySuccessful]
                                ])
                              ]),
                              _: 2
                            }, 1024)
                          ])
                        ]),
                        _: 1
                      }, 16)
                    ]),
                    createVNode(_sfc_main$1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Head), { title: "Profile settings" }),
              createVNode(_sfc_main$g, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex flex-col space-y-6" }, [
                    createVNode(_sfc_main$2, {
                      title: "Profile information",
                      description: "Update your name and email address"
                    }),
                    createVNode(unref(Form), mergeProps(unref(ProfileController).update.form(), { class: "space-y-6" }), {
                      default: withCtx(({ errors, processing, recentlySuccessful }) => [
                        createVNode("div", { class: "grid gap-2" }, [
                          createVNode(unref(_sfc_main$a), { for: "name" }, {
                            default: withCtx(() => [
                              createTextVNode("Name")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$b), {
                            id: "name",
                            class: "mt-1 block w-full",
                            name: "name",
                            "default-value": unref(user).name,
                            required: "",
                            autocomplete: "name",
                            placeholder: "Full name"
                          }, null, 8, ["default-value"]),
                          createVNode(_sfc_main$c, {
                            class: "mt-2",
                            message: errors.name
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "grid gap-2" }, [
                          createVNode(unref(_sfc_main$a), { for: "email" }, {
                            default: withCtx(() => [
                              createTextVNode("Email address")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$b), {
                            id: "email",
                            type: "email",
                            class: "mt-1 block w-full",
                            name: "email",
                            "default-value": unref(user).email,
                            required: "",
                            autocomplete: "username",
                            placeholder: "Email address"
                          }, null, 8, ["default-value"]),
                          createVNode(_sfc_main$c, {
                            class: "mt-2",
                            message: errors.email
                          }, null, 8, ["message"])
                        ]),
                        __props.mustVerifyEmail && !unref(user).email_verified_at ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode("p", { class: "-mt-4 text-sm text-muted-foreground" }, [
                            createTextVNode(" Your email address is unverified. "),
                            createVNode(unref(Link), {
                              href: unref(send)(),
                              as: "button",
                              class: "text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Click here to resend the verification email. ")
                              ]),
                              _: 1
                            }, 8, ["href"])
                          ]),
                          __props.status === "verification-link-sent" ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2 text-sm font-medium text-green-600"
                          }, " A new verification link has been sent to your email address. ")) : createCommentVNode("", true)
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "flex items-center gap-4" }, [
                          createVNode(unref(_sfc_main$5), {
                            disabled: processing,
                            "data-test": "update-profile-button"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Save")
                            ]),
                            _: 1
                          }, 8, ["disabled"]),
                          createVNode(Transition, {
                            "enter-active-class": "transition ease-in-out",
                            "enter-from-class": "opacity-0",
                            "leave-active-class": "transition ease-in-out",
                            "leave-to-class": "opacity-0"
                          }, {
                            default: withCtx(() => [
                              withDirectives(createVNode("p", { class: "text-sm text-neutral-600" }, " Saved. ", 512), [
                                [vShow, recentlySuccessful]
                              ])
                            ]),
                            _: 2
                          }, 1024)
                        ])
                      ]),
                      _: 1
                    }, 16)
                  ]),
                  createVNode(_sfc_main$1)
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/settings/Profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
