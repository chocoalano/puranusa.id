import { defineComponent, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { U as UserController, _ as _sfc_main$1 } from "./AppLayout-BwB3YbyA.js";
import { _ as _sfc_main$3 } from "./index-BpQimeTM.js";
import { _ as _sfc_main$2 } from "./index-SN_CnQ_F.js";
import { Head, Link } from "@inertiajs/vue3";
import { ArrowLeft, User, Mail, CheckCircle, XCircle } from "lucide-vue-next";
import "class-variance-authority";
import "./DropdownMenuTrigger-B1v6pHML.js";
import "reka-ui";
import "@vueuse/core";
import "./Input-BGi8wCMh.js";
import "./index--D7ld9AJ.js";
import "./AvatarImage-DWFQMckn.js";
import "./index-BsP5JKUP.js";
import "vue-sonner";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
import "clsx";
import "tailwind-merge";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Show",
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
        title: props.user.name,
        href: UserController.show.url(props.user.id)
      }
    ];
    const formatDate = (date) => {
      return new Date(date).toLocaleString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ breadcrumbs: breadcrumbItems }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: __props.user.name
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
            _push2(`<div class="flex-1"${_scopeId}><h1 class="text-3xl font-bold tracking-tight"${_scopeId}>${ssrInterpolate(__props.user.name)}</h1><p class="text-muted-foreground"${_scopeId}>User details and information</p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(UserController).edit.url(__props.user.id)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$2), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Edit User`);
                      } else {
                        return [
                          createTextVNode("Edit User")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$2), null, {
                      default: withCtx(() => [
                        createTextVNode("Edit User")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="mx-auto max-w-7xl space-y-6"${_scopeId}><div class="rounded-lg border bg-card p-6"${_scopeId}><h2 class="mb-4 text-lg font-semibold"${_scopeId}>User Information</h2><div class="space-y-4"${_scopeId}><div class="flex items-start gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(User), { class: "mt-1 h-5 w-5 text-muted-foreground" }, null, _parent2, _scopeId));
            _push2(`<div class="flex-1"${_scopeId}><p class="text-sm font-medium text-muted-foreground"${_scopeId}>Name</p><p class="text-base font-medium"${_scopeId}>${ssrInterpolate(__props.user.name)}</p></div></div><div class="flex items-start gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Mail), { class: "mt-1 h-5 w-5 text-muted-foreground" }, null, _parent2, _scopeId));
            _push2(`<div class="flex-1"${_scopeId}><p class="text-sm font-medium text-muted-foreground"${_scopeId}>Email</p><p class="text-base font-medium"${_scopeId}>${ssrInterpolate(__props.user.email)}</p></div></div><div class="flex items-start gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(CheckCircle), { class: "mt-1 h-5 w-5 text-muted-foreground" }, null, _parent2, _scopeId));
            _push2(`<div class="flex-1"${_scopeId}><p class="text-sm font-medium text-muted-foreground"${_scopeId}> Verification Status </p><div class="mt-1"${_scopeId}>`);
            if (__props.user.email_verified_at) {
              _push2(ssrRenderComponent(unref(_sfc_main$3), {
                variant: "default",
                class: "gap-1"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(CheckCircle), { class: "h-3 w-3" }, null, _parent3, _scopeId2));
                    _push3(` Verified `);
                  } else {
                    return [
                      createVNode(unref(CheckCircle), { class: "h-3 w-3" }),
                      createTextVNode(" Verified ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(unref(_sfc_main$3), {
                variant: "secondary",
                class: "gap-1"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(XCircle), { class: "h-3 w-3" }, null, _parent3, _scopeId2));
                    _push3(` Unverified `);
                  } else {
                    return [
                      createVNode(unref(XCircle), { class: "h-3 w-3" }),
                      createTextVNode(" Unverified ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }
            _push2(`</div></div></div></div></div><div class="rounded-lg border bg-card p-6"${_scopeId}><h2 class="mb-4 text-lg font-semibold"${_scopeId}>Timestamps</h2><div class="space-y-3"${_scopeId}><div${_scopeId}><p class="text-sm font-medium text-muted-foreground"${_scopeId}>Created At</p><p class="text-base"${_scopeId}>${ssrInterpolate(formatDate(__props.user.created_at))}</p></div><div${_scopeId}><p class="text-sm font-medium text-muted-foreground"${_scopeId}>Updated At</p><p class="text-base"${_scopeId}>${ssrInterpolate(formatDate(__props.user.updated_at))}</p></div>`);
            if (__props.user.email_verified_at) {
              _push2(`<div${_scopeId}><p class="text-sm font-medium text-muted-foreground"${_scopeId}> Email Verified At </p><p class="text-base"${_scopeId}>${ssrInterpolate(formatDate(__props.user.email_verified_at))}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), {
                title: __props.user.name
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
                  createVNode("div", { class: "flex-1" }, [
                    createVNode("h1", { class: "text-3xl font-bold tracking-tight" }, toDisplayString(__props.user.name), 1),
                    createVNode("p", { class: "text-muted-foreground" }, "User details and information")
                  ]),
                  createVNode(unref(Link), {
                    href: unref(UserController).edit.url(__props.user.id)
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$2), null, {
                        default: withCtx(() => [
                          createTextVNode("Edit User")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["href"])
                ]),
                createVNode("div", { class: "mx-auto max-w-7xl space-y-6" }, [
                  createVNode("div", { class: "rounded-lg border bg-card p-6" }, [
                    createVNode("h2", { class: "mb-4 text-lg font-semibold" }, "User Information"),
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode("div", { class: "flex items-start gap-3" }, [
                        createVNode(unref(User), { class: "mt-1 h-5 w-5 text-muted-foreground" }),
                        createVNode("div", { class: "flex-1" }, [
                          createVNode("p", { class: "text-sm font-medium text-muted-foreground" }, "Name"),
                          createVNode("p", { class: "text-base font-medium" }, toDisplayString(__props.user.name), 1)
                        ])
                      ]),
                      createVNode("div", { class: "flex items-start gap-3" }, [
                        createVNode(unref(Mail), { class: "mt-1 h-5 w-5 text-muted-foreground" }),
                        createVNode("div", { class: "flex-1" }, [
                          createVNode("p", { class: "text-sm font-medium text-muted-foreground" }, "Email"),
                          createVNode("p", { class: "text-base font-medium" }, toDisplayString(__props.user.email), 1)
                        ])
                      ]),
                      createVNode("div", { class: "flex items-start gap-3" }, [
                        createVNode(unref(CheckCircle), { class: "mt-1 h-5 w-5 text-muted-foreground" }),
                        createVNode("div", { class: "flex-1" }, [
                          createVNode("p", { class: "text-sm font-medium text-muted-foreground" }, " Verification Status "),
                          createVNode("div", { class: "mt-1" }, [
                            __props.user.email_verified_at ? (openBlock(), createBlock(unref(_sfc_main$3), {
                              key: 0,
                              variant: "default",
                              class: "gap-1"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(CheckCircle), { class: "h-3 w-3" }),
                                createTextVNode(" Verified ")
                              ]),
                              _: 1
                            })) : (openBlock(), createBlock(unref(_sfc_main$3), {
                              key: 1,
                              variant: "secondary",
                              class: "gap-1"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(XCircle), { class: "h-3 w-3" }),
                                createTextVNode(" Unverified ")
                              ]),
                              _: 1
                            }))
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "rounded-lg border bg-card p-6" }, [
                    createVNode("h2", { class: "mb-4 text-lg font-semibold" }, "Timestamps"),
                    createVNode("div", { class: "space-y-3" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "text-sm font-medium text-muted-foreground" }, "Created At"),
                        createVNode("p", { class: "text-base" }, toDisplayString(formatDate(__props.user.created_at)), 1)
                      ]),
                      createVNode("div", null, [
                        createVNode("p", { class: "text-sm font-medium text-muted-foreground" }, "Updated At"),
                        createVNode("p", { class: "text-base" }, toDisplayString(formatDate(__props.user.updated_at)), 1)
                      ]),
                      __props.user.email_verified_at ? (openBlock(), createBlock("div", { key: 0 }, [
                        createVNode("p", { class: "text-sm font-medium text-muted-foreground" }, " Email Verified At "),
                        createVNode("p", { class: "text-base" }, toDisplayString(formatDate(__props.user.email_verified_at)), 1)
                      ])) : createCommentVNode("", true)
                    ])
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Users/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
