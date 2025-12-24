import { defineComponent, mergeProps, withCtx, unref, createTextVNode, createVNode, Transition, withDirectives, vShow, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { q as queryParams } from "./index--D7ld9AJ.js";
import { _ as _sfc_main$6 } from "./InputError-BhTWS2NZ.js";
import { _ as _sfc_main$1 } from "./AppLayout-hyZArMVS.js";
import { a as edit$1, _ as _sfc_main$2 } from "./Layout-Ryghw2fh.js";
import { Head, Form } from "@inertiajs/vue3";
import { _ as _sfc_main$3 } from "./HeadingSmall-B1yfmTIh.js";
import { _ as _sfc_main$7 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$5 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$4 } from "./Label-16aMY2sx.js";
import "class-variance-authority";
import "./DropdownMenuTrigger-B1v6pHML.js";
import "reka-ui";
import "@vueuse/core";
import "lucide-vue-next";
import "./AvatarImage-DWFQMckn.js";
import "./index-B0NlPG4h.js";
import "vue-sonner";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
import "./Heading-CyRBBIB2.js";
import "./index-CTv85sGw.js";
import "clsx";
import "tailwind-merge";
const edit = (options) => ({
  url: edit.url(options),
  method: "get"
});
edit.definition = {
  methods: ["get", "head"],
  url: "/settings/password"
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
  method: "put"
});
update.definition = {
  methods: ["put"],
  url: "/settings/password"
};
update.url = (options) => {
  return update.definition.url + queryParams(options);
};
update.put = (options) => ({
  url: update.url(options),
  method: "put"
});
const updateForm = (options) => ({
  action: update.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
updateForm.put = (options) => ({
  action: update.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
update.form = updateForm;
const PasswordController = { edit, update };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Password",
  __ssrInlineRender: true,
  setup(__props) {
    const breadcrumbItems = [
      {
        title: "Password settings",
        href: edit$1().url
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ breadcrumbs: breadcrumbItems }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Password settings" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-6"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    title: "Update password",
                    description: "Ensure your account is using a long, random password to stay secure"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(Form), mergeProps(unref(PasswordController).update.form(), {
                    options: {
                      preserveScroll: true
                    },
                    "reset-on-success": "",
                    "reset-on-error": [
                      "password",
                      "password_confirmation",
                      "current_password"
                    ],
                    class: "space-y-6"
                  }), {
                    default: withCtx(({ errors, processing, recentlySuccessful }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="grid gap-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$4), { for: "current_password" }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Current password`);
                            } else {
                              return [
                                createTextVNode("Current password")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$5), {
                          id: "current_password",
                          name: "current_password",
                          type: "password",
                          class: "mt-1 block w-full",
                          autocomplete: "current-password",
                          placeholder: "Current password"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_sfc_main$6, {
                          message: errors.current_password
                        }, null, _parent4, _scopeId3));
                        _push4(`</div><div class="grid gap-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$4), { for: "password" }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`New password`);
                            } else {
                              return [
                                createTextVNode("New password")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$5), {
                          id: "password",
                          name: "password",
                          type: "password",
                          class: "mt-1 block w-full",
                          autocomplete: "new-password",
                          placeholder: "New password"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_sfc_main$6, {
                          message: errors.password
                        }, null, _parent4, _scopeId3));
                        _push4(`</div><div class="grid gap-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$4), { for: "password_confirmation" }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Confirm password`);
                            } else {
                              return [
                                createTextVNode("Confirm password")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$5), {
                          id: "password_confirmation",
                          name: "password_confirmation",
                          type: "password",
                          class: "mt-1 block w-full",
                          autocomplete: "new-password",
                          placeholder: "Confirm password"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_sfc_main$6, {
                          message: errors.password_confirmation
                        }, null, _parent4, _scopeId3));
                        _push4(`</div><div class="flex items-center gap-4"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$7), {
                          disabled: processing,
                          "data-test": "update-password-button"
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Save password`);
                            } else {
                              return [
                                createTextVNode("Save password")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(`<p class="text-sm text-neutral-600" style="${ssrRenderStyle(recentlySuccessful ? null : { display: "none" })}"${_scopeId3}> Saved. </p></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "grid gap-2" }, [
                            createVNode(unref(_sfc_main$4), { for: "current_password" }, {
                              default: withCtx(() => [
                                createTextVNode("Current password")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$5), {
                              id: "current_password",
                              name: "current_password",
                              type: "password",
                              class: "mt-1 block w-full",
                              autocomplete: "current-password",
                              placeholder: "Current password"
                            }),
                            createVNode(_sfc_main$6, {
                              message: errors.current_password
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", { class: "grid gap-2" }, [
                            createVNode(unref(_sfc_main$4), { for: "password" }, {
                              default: withCtx(() => [
                                createTextVNode("New password")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$5), {
                              id: "password",
                              name: "password",
                              type: "password",
                              class: "mt-1 block w-full",
                              autocomplete: "new-password",
                              placeholder: "New password"
                            }),
                            createVNode(_sfc_main$6, {
                              message: errors.password
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", { class: "grid gap-2" }, [
                            createVNode(unref(_sfc_main$4), { for: "password_confirmation" }, {
                              default: withCtx(() => [
                                createTextVNode("Confirm password")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$5), {
                              id: "password_confirmation",
                              name: "password_confirmation",
                              type: "password",
                              class: "mt-1 block w-full",
                              autocomplete: "new-password",
                              placeholder: "Confirm password"
                            }),
                            createVNode(_sfc_main$6, {
                              message: errors.password_confirmation
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", { class: "flex items-center gap-4" }, [
                            createVNode(unref(_sfc_main$7), {
                              disabled: processing,
                              "data-test": "update-password-button"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Save password")
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
                } else {
                  return [
                    createVNode("div", { class: "space-y-6" }, [
                      createVNode(_sfc_main$3, {
                        title: "Update password",
                        description: "Ensure your account is using a long, random password to stay secure"
                      }),
                      createVNode(unref(Form), mergeProps(unref(PasswordController).update.form(), {
                        options: {
                          preserveScroll: true
                        },
                        "reset-on-success": "",
                        "reset-on-error": [
                          "password",
                          "password_confirmation",
                          "current_password"
                        ],
                        class: "space-y-6"
                      }), {
                        default: withCtx(({ errors, processing, recentlySuccessful }) => [
                          createVNode("div", { class: "grid gap-2" }, [
                            createVNode(unref(_sfc_main$4), { for: "current_password" }, {
                              default: withCtx(() => [
                                createTextVNode("Current password")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$5), {
                              id: "current_password",
                              name: "current_password",
                              type: "password",
                              class: "mt-1 block w-full",
                              autocomplete: "current-password",
                              placeholder: "Current password"
                            }),
                            createVNode(_sfc_main$6, {
                              message: errors.current_password
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", { class: "grid gap-2" }, [
                            createVNode(unref(_sfc_main$4), { for: "password" }, {
                              default: withCtx(() => [
                                createTextVNode("New password")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$5), {
                              id: "password",
                              name: "password",
                              type: "password",
                              class: "mt-1 block w-full",
                              autocomplete: "new-password",
                              placeholder: "New password"
                            }),
                            createVNode(_sfc_main$6, {
                              message: errors.password
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", { class: "grid gap-2" }, [
                            createVNode(unref(_sfc_main$4), { for: "password_confirmation" }, {
                              default: withCtx(() => [
                                createTextVNode("Confirm password")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$5), {
                              id: "password_confirmation",
                              name: "password_confirmation",
                              type: "password",
                              class: "mt-1 block w-full",
                              autocomplete: "new-password",
                              placeholder: "Confirm password"
                            }),
                            createVNode(_sfc_main$6, {
                              message: errors.password_confirmation
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", { class: "flex items-center gap-4" }, [
                            createVNode(unref(_sfc_main$7), {
                              disabled: processing,
                              "data-test": "update-password-button"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Save password")
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
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Head), { title: "Password settings" }),
              createVNode(_sfc_main$2, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "space-y-6" }, [
                    createVNode(_sfc_main$3, {
                      title: "Update password",
                      description: "Ensure your account is using a long, random password to stay secure"
                    }),
                    createVNode(unref(Form), mergeProps(unref(PasswordController).update.form(), {
                      options: {
                        preserveScroll: true
                      },
                      "reset-on-success": "",
                      "reset-on-error": [
                        "password",
                        "password_confirmation",
                        "current_password"
                      ],
                      class: "space-y-6"
                    }), {
                      default: withCtx(({ errors, processing, recentlySuccessful }) => [
                        createVNode("div", { class: "grid gap-2" }, [
                          createVNode(unref(_sfc_main$4), { for: "current_password" }, {
                            default: withCtx(() => [
                              createTextVNode("Current password")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$5), {
                            id: "current_password",
                            name: "current_password",
                            type: "password",
                            class: "mt-1 block w-full",
                            autocomplete: "current-password",
                            placeholder: "Current password"
                          }),
                          createVNode(_sfc_main$6, {
                            message: errors.current_password
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "grid gap-2" }, [
                          createVNode(unref(_sfc_main$4), { for: "password" }, {
                            default: withCtx(() => [
                              createTextVNode("New password")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$5), {
                            id: "password",
                            name: "password",
                            type: "password",
                            class: "mt-1 block w-full",
                            autocomplete: "new-password",
                            placeholder: "New password"
                          }),
                          createVNode(_sfc_main$6, {
                            message: errors.password
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "grid gap-2" }, [
                          createVNode(unref(_sfc_main$4), { for: "password_confirmation" }, {
                            default: withCtx(() => [
                              createTextVNode("Confirm password")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$5), {
                            id: "password_confirmation",
                            name: "password_confirmation",
                            type: "password",
                            class: "mt-1 block w-full",
                            autocomplete: "new-password",
                            placeholder: "Confirm password"
                          }),
                          createVNode(_sfc_main$6, {
                            message: errors.password_confirmation
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "flex items-center gap-4" }, [
                          createVNode(unref(_sfc_main$7), {
                            disabled: processing,
                            "data-test": "update-password-button"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Save password")
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
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/settings/Password.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
