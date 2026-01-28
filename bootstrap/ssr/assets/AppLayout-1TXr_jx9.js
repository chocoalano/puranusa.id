import { defineComponent, mergeProps, unref, withCtx, createTextVNode, createVNode, renderSlot, useSSRContext, computed, resolveDynamicComponent, createBlock, openBlock, Fragment, toDisplayString, ref, renderList, createCommentVNode } from "vue";
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderVNode, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { cva } from "class-variance-authority";
import { c as cn, _ as _sfc_main$Q, t as toUrl, u as urlIsActive } from "./index-SN_CnQ_F.js";
import { h as _sfc_main$J, i as _sfc_main$K, j as _sfc_main$L, k as _sfc_main$M, l as _sfc_main$N, e as _sfc_main$P, f as _sfc_main$U, g as _sfc_main$V, m as _sfc_main$W, c as _sfc_main$X, _ as _sfc_main$Y, a as _sfc_main$Z, b as _sfc_main$_ } from "./DropdownMenuTrigger-B1v6pHML.js";
import { createContext, Primitive, useForwardPropsEmits, TooltipRoot, TooltipPortal, TooltipContent, TooltipArrow, TooltipProvider, TooltipTrigger, CollapsibleRoot, CollapsibleContent, CollapsibleTrigger } from "reka-ui";
import { _ as _sfc_main$O } from "./Input-BGi8wCMh.js";
import { reactiveOmit, useMediaQuery, useVModel, useEventListener } from "@vueuse/core";
import { PanelLeft, ChevronRight, Settings, LogOut, ChevronsUpDown, LayoutGrid, Users, Users2Icon, Store, Package, FolderTree, FileEdit, FileText, ShoppingCart, Heart, Star, BadgePercent, CreditCard, Truck, ArrowLeftRight, Wallet, WalletCards, Wallet2Icon, WalletIcon, Gift, TrendingUp, Infinity, Wallet2, Grid3x3, ChartBar, BookCheck, BookDashed, BookOpen, MapPin } from "lucide-vue-next";
import { usePage, Link, useForm } from "@inertiajs/vue3";
import { q as queryParams, a as applyUrlDefaults } from "./index--D7ld9AJ.js";
import { _ as _sfc_main$R, a as _sfc_main$S, b as _sfc_main$T } from "./AvatarImage-DWFQMckn.js";
import { l as logout, d as dashboard } from "./index-BsP5JKUP.js";
import { toast } from "vue-sonner";
import { _ as _sfc_main$$ } from "./AppLogoIcon-CtV9aC-8.js";
import { _ as _sfc_main$10, a as _sfc_main$11, b as _sfc_main$12, c as _sfc_main$13, d as _sfc_main$14, e as _sfc_main$15 } from "./BreadcrumbSeparator-YMzfzP6z.js";
const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";
const [useSidebar, provideSidebarContext] = createContext("Sidebar");
const _sfc_main$I = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "Sidebar",
  __ssrInlineRender: true,
  props: {
    side: { default: "left" },
    variant: { default: "sidebar" },
    collapsible: { default: "offcanvas" },
    class: {}
  },
  setup(__props) {
    const props = __props;
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.collapsible === "none") {
        _push(`<div${ssrRenderAttrs(mergeProps({
          "data-slot": "sidebar",
          class: unref(cn)("bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col", props.class)
        }, _ctx.$attrs, _attrs))}>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</div>`);
      } else if (unref(isMobile)) {
        _push(ssrRenderComponent(unref(_sfc_main$J), mergeProps({ open: unref(openMobile) }, _ctx.$attrs, { "onUpdate:open": unref(setOpenMobile) }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$K), {
                "data-sidebar": "sidebar",
                "data-slot": "sidebar",
                "data-mobile": "true",
                side: __props.side,
                class: "bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden",
                style: {
                  "--sidebar-width": unref(SIDEBAR_WIDTH_MOBILE)
                }
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_sfc_main$L, { class: "sr-only" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_sfc_main$M, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Sidebar`);
                              } else {
                                return [
                                  createTextVNode("Sidebar")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_sfc_main$N, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Displays the mobile sidebar.`);
                              } else {
                                return [
                                  createTextVNode("Displays the mobile sidebar.")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_sfc_main$M, null, {
                              default: withCtx(() => [
                                createTextVNode("Sidebar")
                              ]),
                              _: 1
                            }),
                            createVNode(_sfc_main$N, null, {
                              default: withCtx(() => [
                                createTextVNode("Displays the mobile sidebar.")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<div class="flex h-full w-full flex-col"${_scopeId2}>`);
                    ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode(_sfc_main$L, { class: "sr-only" }, {
                        default: withCtx(() => [
                          createVNode(_sfc_main$M, null, {
                            default: withCtx(() => [
                              createTextVNode("Sidebar")
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$N, null, {
                            default: withCtx(() => [
                              createTextVNode("Displays the mobile sidebar.")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "flex h-full w-full flex-col" }, [
                        renderSlot(_ctx.$slots, "default")
                      ])
                    ];
                  }
                }),
                _: 3
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$K), {
                  "data-sidebar": "sidebar",
                  "data-slot": "sidebar",
                  "data-mobile": "true",
                  side: __props.side,
                  class: "bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden",
                  style: {
                    "--sidebar-width": unref(SIDEBAR_WIDTH_MOBILE)
                  }
                }, {
                  default: withCtx(() => [
                    createVNode(_sfc_main$L, { class: "sr-only" }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$M, null, {
                          default: withCtx(() => [
                            createTextVNode("Sidebar")
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$N, null, {
                          default: withCtx(() => [
                            createTextVNode("Displays the mobile sidebar.")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "flex h-full w-full flex-col" }, [
                      renderSlot(_ctx.$slots, "default")
                    ])
                  ]),
                  _: 3
                }, 8, ["side", "style"])
              ];
            }
          }),
          _: 3
        }, _parent));
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: "group peer text-sidebar-foreground hidden md:block",
          "data-slot": "sidebar",
          "data-state": unref(state),
          "data-collapsible": unref(state) === "collapsed" ? __props.collapsible : "",
          "data-variant": __props.variant,
          "data-side": __props.side
        }, _attrs))}><div class="${ssrRenderClass(unref(cn)(
          "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          __props.variant === "floating" || __props.variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
        ))}"></div><div${ssrRenderAttrs(mergeProps({
          class: unref(cn)(
            "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
            __props.side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
            // Adjust the padding for floating and inset variants.
            __props.variant === "floating" || __props.variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
            props.class
          )
        }, _ctx.$attrs))}><div data-sidebar="sidebar" class="bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm">`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</div></div></div>`);
      }
    };
  }
});
const _sfc_setup$I = _sfc_main$I.setup;
_sfc_main$I.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sidebar/Sidebar.vue");
  return _sfc_setup$I ? _sfc_setup$I(props, ctx) : void 0;
};
const _sfc_main$H = /* @__PURE__ */ defineComponent({
  __name: "SidebarContent",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "sidebar-content",
        "data-sidebar": "content",
        class: unref(cn)("flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$H = _sfc_main$H.setup;
_sfc_main$H.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sidebar/SidebarContent.vue");
  return _sfc_setup$H ? _sfc_setup$H(props, ctx) : void 0;
};
const _sfc_main$G = /* @__PURE__ */ defineComponent({
  __name: "SidebarFooter",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "sidebar-footer",
        "data-sidebar": "footer",
        class: unref(cn)("flex flex-col gap-2 p-2", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$G = _sfc_main$G.setup;
_sfc_main$G.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sidebar/SidebarFooter.vue");
  return _sfc_setup$G ? _sfc_setup$G(props, ctx) : void 0;
};
const _sfc_main$F = /* @__PURE__ */ defineComponent({
  __name: "SidebarGroup",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "sidebar-group",
        "data-sidebar": "group",
        class: unref(cn)("relative flex w-full min-w-0 flex-col p-2", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$F = _sfc_main$F.setup;
_sfc_main$F.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sidebar/SidebarGroup.vue");
  return _sfc_setup$F ? _sfc_setup$F(props, ctx) : void 0;
};
const _sfc_main$E = /* @__PURE__ */ defineComponent({
  __name: "SidebarGroupAction",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        "data-slot": "sidebar-group-action",
        "data-sidebar": "group-action",
        as: __props.as,
        "as-child": __props.asChild,
        class: unref(cn)(
          "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
          "after:absolute after:-inset-2 md:after:hidden",
          "group-data-[collapsible=icon]:hidden",
          props.class
        )
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$E = _sfc_main$E.setup;
_sfc_main$E.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sidebar/SidebarGroupAction.vue");
  return _sfc_setup$E ? _sfc_setup$E(props, ctx) : void 0;
};
const _sfc_main$D = /* @__PURE__ */ defineComponent({
  __name: "SidebarGroupContent",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "sidebar-group-content",
        "data-sidebar": "group-content",
        class: unref(cn)("w-full text-sm", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$D = _sfc_main$D.setup;
_sfc_main$D.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sidebar/SidebarGroupContent.vue");
  return _sfc_setup$D ? _sfc_setup$D(props, ctx) : void 0;
};
const _sfc_main$C = /* @__PURE__ */ defineComponent({
  __name: "SidebarGroupLabel",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        "data-slot": "sidebar-group-label",
        "data-sidebar": "group-label",
        as: __props.as,
        "as-child": __props.asChild,
        class: unref(cn)(
          "text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
          "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
          props.class
        )
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$C = _sfc_main$C.setup;
_sfc_main$C.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sidebar/SidebarGroupLabel.vue");
  return _sfc_setup$C ? _sfc_setup$C(props, ctx) : void 0;
};
const _sfc_main$B = /* @__PURE__ */ defineComponent({
  __name: "SidebarHeader",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "sidebar-header",
        "data-sidebar": "header",
        class: unref(cn)("flex flex-col gap-2 p-2", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$B = _sfc_main$B.setup;
_sfc_main$B.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sidebar/SidebarHeader.vue");
  return _sfc_setup$B ? _sfc_setup$B(props, ctx) : void 0;
};
const _sfc_main$A = /* @__PURE__ */ defineComponent({
  __name: "SidebarInput",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$O), mergeProps({
        "data-slot": "sidebar-input",
        "data-sidebar": "input",
        class: unref(cn)(
          "bg-background h-8 w-full shadow-none",
          props.class
        )
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$A = _sfc_main$A.setup;
_sfc_main$A.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sidebar/SidebarInput.vue");
  return _sfc_setup$A ? _sfc_setup$A(props, ctx) : void 0;
};
const _sfc_main$z = /* @__PURE__ */ defineComponent({
  __name: "SidebarInset",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({
        "data-slot": "sidebar-inset",
        class: unref(cn)(
          "bg-background relative flex w-full flex-1 flex-col",
          "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-0",
          props.class
        )
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main>`);
    };
  }
});
const _sfc_setup$z = _sfc_main$z.setup;
_sfc_main$z.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sidebar/SidebarInset.vue");
  return _sfc_setup$z ? _sfc_setup$z(props, ctx) : void 0;
};
const _sfc_main$y = /* @__PURE__ */ defineComponent({
  __name: "SidebarMenu",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<ul${ssrRenderAttrs(mergeProps({
        "data-slot": "sidebar-menu",
        "data-sidebar": "menu",
        class: unref(cn)("flex w-full min-w-0 flex-col gap-1", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</ul>`);
    };
  }
});
const _sfc_setup$y = _sfc_main$y.setup;
_sfc_main$y.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sidebar/SidebarMenu.vue");
  return _sfc_setup$y ? _sfc_setup$y(props, ctx) : void 0;
};
const _sfc_main$x = /* @__PURE__ */ defineComponent({
  __name: "SidebarMenuAction",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: { default: "button" },
    showOnHover: { type: Boolean },
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        "data-slot": "sidebar-menu-action",
        "data-sidebar": "menu-action",
        class: unref(cn)(
          "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
          "after:absolute after:-inset-2 md:after:hidden",
          "peer-data-[size=sm]/menu-button:top-1",
          "peer-data-[size=default]/menu-button:top-1.5",
          "peer-data-[size=lg]/menu-button:top-2.5",
          "group-data-[collapsible=icon]:hidden",
          __props.showOnHover && "peer-data-[active=true]/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0",
          props.class
        ),
        as: __props.as,
        "as-child": __props.asChild
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$x = _sfc_main$x.setup;
_sfc_main$x.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sidebar/SidebarMenuAction.vue");
  return _sfc_setup$x ? _sfc_setup$x(props, ctx) : void 0;
};
const _sfc_main$w = /* @__PURE__ */ defineComponent({
  __name: "SidebarMenuBadge",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "sidebar-menu-badge",
        "data-sidebar": "menu-badge",
        class: unref(cn)(
          "text-sidebar-foreground pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums select-none",
          "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
          "peer-data-[size=sm]/menu-button:top-1",
          "peer-data-[size=default]/menu-button:top-1.5",
          "peer-data-[size=lg]/menu-button:top-2.5",
          "group-data-[collapsible=icon]:hidden",
          props.class
        )
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$w = _sfc_main$w.setup;
_sfc_main$w.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sidebar/SidebarMenuBadge.vue");
  return _sfc_setup$w ? _sfc_setup$w(props, ctx) : void 0;
};
const _sfc_main$v = /* @__PURE__ */ defineComponent({
  __name: "Tooltip",
  __ssrInlineRender: true,
  props: {
    defaultOpen: { type: Boolean },
    open: { type: Boolean },
    delayDuration: {},
    disableHoverableContent: { type: Boolean },
    disableClosingTrigger: { type: Boolean },
    disabled: { type: Boolean },
    ignoreNonKeyboardFocus: { type: Boolean }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TooltipRoot), mergeProps({ "data-slot": "tooltip" }, unref(forwarded), _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$v = _sfc_main$v.setup;
_sfc_main$v.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/tooltip/Tooltip.vue");
  return _sfc_setup$v ? _sfc_setup$v(props, ctx) : void 0;
};
const _sfc_main$u = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "TooltipContent",
  __ssrInlineRender: true,
  props: {
    forceMount: { type: Boolean },
    ariaLabel: {},
    asChild: { type: Boolean },
    as: {},
    side: {},
    sideOffset: { default: 4 },
    align: {},
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    positionStrategy: {},
    updatePositionStrategy: {},
    class: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = reactiveOmit(props, "class");
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TooltipPortal), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(TooltipContent), mergeProps({ "data-slot": "tooltip-content" }, { ...unref(forwarded), ..._ctx.$attrs }, {
              class: unref(cn)("bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit rounded-md px-3 py-1.5 text-xs text-balance", props.class)
            }), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                  _push3(ssrRenderComponent(unref(TooltipArrow), { class: "bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    renderSlot(_ctx.$slots, "default"),
                    createVNode(unref(TooltipArrow), { class: "bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" })
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(TooltipContent), mergeProps({ "data-slot": "tooltip-content" }, { ...unref(forwarded), ..._ctx.$attrs }, {
                class: unref(cn)("bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit rounded-md px-3 py-1.5 text-xs text-balance", props.class)
              }), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default"),
                  createVNode(unref(TooltipArrow), { class: "bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" })
                ]),
                _: 3
              }, 16, ["class"])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$u = _sfc_main$u.setup;
_sfc_main$u.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/tooltip/TooltipContent.vue");
  return _sfc_setup$u ? _sfc_setup$u(props, ctx) : void 0;
};
const _sfc_main$t = /* @__PURE__ */ defineComponent({
  __name: "TooltipProvider",
  __ssrInlineRender: true,
  props: {
    delayDuration: { default: 0 },
    skipDelayDuration: {},
    disableHoverableContent: { type: Boolean },
    disableClosingTrigger: { type: Boolean },
    disabled: { type: Boolean },
    ignoreNonKeyboardFocus: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TooltipProvider), mergeProps(props, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$t = _sfc_main$t.setup;
_sfc_main$t.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/tooltip/TooltipProvider.vue");
  return _sfc_setup$t ? _sfc_setup$t(props, ctx) : void 0;
};
const _sfc_main$s = /* @__PURE__ */ defineComponent({
  __name: "TooltipTrigger",
  __ssrInlineRender: true,
  props: {
    reference: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TooltipTrigger), mergeProps({ "data-slot": "tooltip-trigger" }, props, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$s = _sfc_main$s.setup;
_sfc_main$s.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/tooltip/TooltipTrigger.vue");
  return _sfc_setup$s ? _sfc_setup$s(props, ctx) : void 0;
};
const _sfc_main$r = /* @__PURE__ */ defineComponent({
  __name: "SidebarMenuButtonChild",
  __ssrInlineRender: true,
  props: {
    variant: { default: "default" },
    size: { default: "default" },
    isActive: { type: Boolean },
    class: {},
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        "data-slot": "sidebar-menu-button",
        "data-sidebar": "menu-button",
        "data-size": __props.size,
        "data-active": __props.isActive,
        class: unref(cn)(unref(sidebarMenuButtonVariants)({ variant: __props.variant, size: __props.size }), props.class),
        as: __props.as,
        "as-child": __props.asChild
      }, _ctx.$attrs, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$r = _sfc_main$r.setup;
_sfc_main$r.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sidebar/SidebarMenuButtonChild.vue");
  return _sfc_setup$r ? _sfc_setup$r(props, ctx) : void 0;
};
const _sfc_main$q = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "SidebarMenuButton",
  __ssrInlineRender: true,
  props: {
    variant: { default: "default" },
    size: { default: "default" },
    isActive: { type: Boolean },
    class: {},
    asChild: { type: Boolean },
    as: { default: "button" },
    tooltip: {}
  },
  setup(__props) {
    const props = __props;
    const { isMobile, state } = useSidebar();
    const delegatedProps = computed(() => {
      const { tooltip, ...delegated } = props;
      return delegated;
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (!__props.tooltip) {
        _push(ssrRenderComponent(_sfc_main$r, mergeProps({ ...delegatedProps.value, ..._ctx.$attrs }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "default")
              ];
            }
          }),
          _: 3
        }, _parent));
      } else {
        _push(ssrRenderComponent(unref(_sfc_main$v), _attrs, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$s), { "as-child": "" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_sfc_main$r, { ...delegatedProps.value, ..._ctx.$attrs }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          ssrRenderSlot(_ctx.$slots, "default", {}, null, _push4, _parent4, _scopeId3);
                        } else {
                          return [
                            renderSlot(_ctx.$slots, "default")
                          ];
                        }
                      }),
                      _: 3
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_sfc_main$r, { ...delegatedProps.value, ..._ctx.$attrs }, {
                        default: withCtx(() => [
                          renderSlot(_ctx.$slots, "default")
                        ]),
                        _: 3
                      }, 16)
                    ];
                  }
                }),
                _: 3
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$u), {
                side: "right",
                align: "center",
                hidden: unref(state) !== "collapsed" || unref(isMobile)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (typeof __props.tooltip === "string") {
                      _push3(`<!--[-->${ssrInterpolate(__props.tooltip)}<!--]-->`);
                    } else {
                      ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(__props.tooltip), null, null), _parent3, _scopeId2);
                    }
                  } else {
                    return [
                      typeof __props.tooltip === "string" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                        createTextVNode(toDisplayString(__props.tooltip), 1)
                      ], 64)) : (openBlock(), createBlock(resolveDynamicComponent(__props.tooltip), { key: 1 }))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$s), { "as-child": "" }, {
                  default: withCtx(() => [
                    createVNode(_sfc_main$r, { ...delegatedProps.value, ..._ctx.$attrs }, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "default")
                      ]),
                      _: 3
                    }, 16)
                  ]),
                  _: 3
                }),
                createVNode(unref(_sfc_main$u), {
                  side: "right",
                  align: "center",
                  hidden: unref(state) !== "collapsed" || unref(isMobile)
                }, {
                  default: withCtx(() => [
                    typeof __props.tooltip === "string" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                      createTextVNode(toDisplayString(__props.tooltip), 1)
                    ], 64)) : (openBlock(), createBlock(resolveDynamicComponent(__props.tooltip), { key: 1 }))
                  ]),
                  _: 1
                }, 8, ["hidden"])
              ];
            }
          }),
          _: 3
        }, _parent));
      }
    };
  }
});
const _sfc_setup$q = _sfc_main$q.setup;
_sfc_main$q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sidebar/SidebarMenuButton.vue");
  return _sfc_setup$q ? _sfc_setup$q(props, ctx) : void 0;
};
const _sfc_main$p = /* @__PURE__ */ defineComponent({
  __name: "SidebarMenuItem",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<li${ssrRenderAttrs(mergeProps({
        "data-slot": "sidebar-menu-item",
        "data-sidebar": "menu-item",
        class: unref(cn)("group/menu-item relative", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</li>`);
    };
  }
});
const _sfc_setup$p = _sfc_main$p.setup;
_sfc_main$p.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sidebar/SidebarMenuItem.vue");
  return _sfc_setup$p ? _sfc_setup$p(props, ctx) : void 0;
};
const _sfc_main$o = /* @__PURE__ */ defineComponent({
  __name: "Skeleton",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "skeleton",
        class: unref(cn)("animate-pulse rounded-md bg-primary/10", props.class)
      }, _attrs))}></div>`);
    };
  }
});
const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/skeleton/Skeleton.vue");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};
const _sfc_main$n = /* @__PURE__ */ defineComponent({
  __name: "SidebarMenuSkeleton",
  __ssrInlineRender: true,
  props: {
    showIcon: { type: Boolean },
    class: {}
  },
  setup(__props) {
    const props = __props;
    const width = computed(() => {
      return `${Math.floor(Math.random() * 40) + 50}%`;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "sidebar-menu-skeleton",
        "data-sidebar": "menu-skeleton",
        class: unref(cn)("flex h-8 items-center gap-2 rounded-md px-2", props.class)
      }, _attrs))}>`);
      if (__props.showIcon) {
        _push(ssrRenderComponent(unref(_sfc_main$o), {
          class: "size-4 rounded-md",
          "data-sidebar": "menu-skeleton-icon"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(unref(_sfc_main$o), {
        class: "h-4 max-w-(--skeleton-width) flex-1",
        "data-sidebar": "menu-skeleton-text",
        style: { "--skeleton-width": width.value }
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sidebar/SidebarMenuSkeleton.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  __name: "SidebarMenuSub",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<ul${ssrRenderAttrs(mergeProps({
        "data-slot": "sidebar-menu-sub",
        "data-sidebar": "menu-badge",
        class: unref(cn)(
          "border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5",
          "group-data-[collapsible=icon]:hidden",
          props.class
        )
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</ul>`);
    };
  }
});
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sidebar/SidebarMenuSub.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const _sfc_main$l = /* @__PURE__ */ defineComponent({
  __name: "SidebarMenuSubButton",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: { default: "a" },
    size: { default: "md" },
    isActive: { type: Boolean },
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        "data-slot": "sidebar-menu-sub-button",
        "data-sidebar": "menu-sub-button",
        as: __props.as,
        "as-child": __props.asChild,
        "data-size": __props.size,
        "data-active": __props.isActive,
        class: unref(cn)(
          "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
          "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
          __props.size === "sm" && "text-xs",
          __props.size === "md" && "text-sm",
          "group-data-[collapsible=icon]:hidden",
          props.class
        )
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sidebar/SidebarMenuSubButton.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  __name: "SidebarMenuSubItem",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<li${ssrRenderAttrs(mergeProps({
        "data-slot": "sidebar-menu-sub-item",
        "data-sidebar": "menu-sub-item",
        class: unref(cn)("group/menu-sub-item relative", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</li>`);
    };
  }
});
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sidebar/SidebarMenuSubItem.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "SidebarProvider",
  __ssrInlineRender: true,
  props: {
    defaultOpen: { type: Boolean, default: true },
    open: { type: Boolean, default: void 0 },
    class: {}
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const isMobile = useMediaQuery("(max-width: 768px)");
    const openMobile = ref(false);
    const open = useVModel(props, "open", emits, {
      defaultValue: props.defaultOpen ?? false,
      passive: props.open === void 0
    });
    function setOpen(value) {
      open.value = value;
      if (typeof document !== "undefined") {
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${open.value}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
      }
    }
    function setOpenMobile(value) {
      openMobile.value = value;
    }
    function toggleSidebar() {
      return isMobile.value ? setOpenMobile(!openMobile.value) : setOpen(!open.value);
    }
    useEventListener("keydown", (event) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    });
    const state = computed(() => open.value ? "expanded" : "collapsed");
    provideSidebarContext({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TooltipProvider), mergeProps({ "delay-duration": 0 }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${ssrRenderAttrs(mergeProps({
              "data-slot": "sidebar-wrapper",
              style: {
                "--sidebar-width": unref(SIDEBAR_WIDTH),
                "--sidebar-width-icon": unref(SIDEBAR_WIDTH_ICON)
              },
              class: unref(cn)("group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full", props.class)
            }, _ctx.$attrs))}${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", mergeProps({
                "data-slot": "sidebar-wrapper",
                style: {
                  "--sidebar-width": unref(SIDEBAR_WIDTH),
                  "--sidebar-width-icon": unref(SIDEBAR_WIDTH_ICON)
                },
                class: unref(cn)("group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full", props.class)
              }, _ctx.$attrs), [
                renderSlot(_ctx.$slots, "default")
              ], 16)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sidebar/SidebarProvider.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "SidebarRail",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    const { toggleSidebar } = useSidebar();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        "data-sidebar": "rail",
        "data-slot": "sidebar-rail",
        "aria-label": "Toggle Sidebar",
        tabindex: -1,
        title: "Toggle Sidebar",
        class: unref(cn)(
          "hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex",
          "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
          "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
          "hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full",
          "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
          "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
          props.class
        )
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</button>`);
    };
  }
});
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sidebar/SidebarRail.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "SidebarSeparator",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$P), mergeProps({
        "data-slot": "sidebar-separator",
        "data-sidebar": "separator",
        class: unref(cn)("bg-sidebar-border mx-2 w-auto", props.class)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sidebar/SidebarSeparator.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "SidebarTrigger",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    const { toggleSidebar } = useSidebar();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$Q), mergeProps({
        "data-sidebar": "trigger",
        "data-slot": "sidebar-trigger",
        variant: "ghost",
        size: "icon",
        class: unref(cn)("h-7 w-7", props.class),
        onClick: unref(toggleSidebar)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(PanelLeft), null, null, _parent2, _scopeId));
            _push2(`<span class="sr-only"${_scopeId}>Toggle Sidebar</span>`);
          } else {
            return [
              createVNode(unref(PanelLeft)),
              createVNode("span", { class: "sr-only" }, "Toggle Sidebar")
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/sidebar/SidebarTrigger.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:pr-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline: "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "AppContent",
  __ssrInlineRender: true,
  props: {
    variant: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const className = computed(() => props.class);
    return (_ctx, _push, _parent, _attrs) => {
      if (props.variant === "sidebar") {
        _push(ssrRenderComponent(unref(_sfc_main$z), mergeProps({ class: className.value }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "default")
              ];
            }
          }),
          _: 3
        }, _parent));
      } else {
        _push(`<main${ssrRenderAttrs(mergeProps({
          class: ["mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl", className.value]
        }, _attrs))}>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</main>`);
      }
    };
  }
});
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/AppContent.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "AppShell",
  __ssrInlineRender: true,
  props: {
    variant: {}
  },
  setup(__props) {
    const isOpen = usePage().props.sidebarOpen;
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.variant === "header") {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen w-full flex-col" }, _attrs))}>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(ssrRenderComponent(unref(_sfc_main$j), mergeProps({ "default-open": unref(isOpen) }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "default")
              ];
            }
          }),
          _: 3
        }, _parent));
      }
    };
  }
});
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/AppShell.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const index$q = (options) => ({
  url: index$q.url(options),
  method: "get"
});
index$q.definition = {
  methods: ["get", "head"],
  url: "/bonus/sponsor"
};
index$q.url = (options) => {
  return index$q.definition.url + queryParams(options);
};
index$q.get = (options) => ({
  url: index$q.url(options),
  method: "get"
});
index$q.head = (options) => ({
  url: index$q.url(options),
  method: "head"
});
const indexForm$q = (options) => ({
  action: index$q.url(options),
  method: "get"
});
indexForm$q.get = (options) => ({
  action: index$q.url(options),
  method: "get"
});
indexForm$q.head = (options) => ({
  action: index$q.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
index$q.form = indexForm$q;
const create$e = (options) => ({
  url: create$e.url(options),
  method: "get"
});
create$e.definition = {
  methods: ["get", "head"],
  url: "/bonus/sponsor/create"
};
create$e.url = (options) => {
  return create$e.definition.url + queryParams(options);
};
create$e.get = (options) => ({
  url: create$e.url(options),
  method: "get"
});
create$e.head = (options) => ({
  url: create$e.url(options),
  method: "head"
});
const createForm$e = (options) => ({
  action: create$e.url(options),
  method: "get"
});
createForm$e.get = (options) => ({
  action: create$e.url(options),
  method: "get"
});
createForm$e.head = (options) => ({
  action: create$e.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
create$e.form = createForm$e;
const store$e = (options) => ({
  url: store$e.url(options),
  method: "post"
});
store$e.definition = {
  methods: ["post"],
  url: "/bonus/sponsor"
};
store$e.url = (options) => {
  return store$e.definition.url + queryParams(options);
};
store$e.post = (options) => ({
  url: store$e.url(options),
  method: "post"
});
const storeForm$e = (options) => ({
  action: store$e.url(options),
  method: "post"
});
storeForm$e.post = (options) => ({
  action: store$e.url(options),
  method: "post"
});
store$e.form = storeForm$e;
const show$d = (args, options) => ({
  url: show$d.url(args, options),
  method: "get"
});
show$d.definition = {
  methods: ["get", "head"],
  url: "/bonus/sponsor/{customerBonusSponsor}"
};
show$d.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { customerBonusSponsor: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { customerBonusSponsor: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      customerBonusSponsor: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    customerBonusSponsor: typeof args.customerBonusSponsor === "object" ? args.customerBonusSponsor.id : args.customerBonusSponsor
  };
  return show$d.definition.url.replace("{customerBonusSponsor}", parsedArgs.customerBonusSponsor.toString()).replace(/\/+$/, "") + queryParams(options);
};
show$d.get = (args, options) => ({
  url: show$d.url(args, options),
  method: "get"
});
show$d.head = (args, options) => ({
  url: show$d.url(args, options),
  method: "head"
});
const showForm$d = (args, options) => ({
  action: show$d.url(args, options),
  method: "get"
});
showForm$d.get = (args, options) => ({
  action: show$d.url(args, options),
  method: "get"
});
showForm$d.head = (args, options) => ({
  action: show$d.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
show$d.form = showForm$d;
const edit$f = (args, options) => ({
  url: edit$f.url(args, options),
  method: "get"
});
edit$f.definition = {
  methods: ["get", "head"],
  url: "/bonus/sponsor/{customerBonusSponsor}/edit"
};
edit$f.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { customerBonusSponsor: args };
  }
  if (Array.isArray(args)) {
    args = {
      customerBonusSponsor: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    customerBonusSponsor: args.customerBonusSponsor
  };
  return edit$f.definition.url.replace("{customerBonusSponsor}", parsedArgs.customerBonusSponsor.toString()).replace(/\/+$/, "") + queryParams(options);
};
edit$f.get = (args, options) => ({
  url: edit$f.url(args, options),
  method: "get"
});
edit$f.head = (args, options) => ({
  url: edit$f.url(args, options),
  method: "head"
});
const editForm$f = (args, options) => ({
  action: edit$f.url(args, options),
  method: "get"
});
editForm$f.get = (args, options) => ({
  action: edit$f.url(args, options),
  method: "get"
});
editForm$f.head = (args, options) => ({
  action: edit$f.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
edit$f.form = editForm$f;
const update$i = (args, options) => ({
  url: update$i.url(args, options),
  method: "put"
});
update$i.definition = {
  methods: ["put", "patch"],
  url: "/bonus/sponsor/{customerBonusSponsor}"
};
update$i.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { customerBonusSponsor: args };
  }
  if (Array.isArray(args)) {
    args = {
      customerBonusSponsor: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    customerBonusSponsor: args.customerBonusSponsor
  };
  return update$i.definition.url.replace("{customerBonusSponsor}", parsedArgs.customerBonusSponsor.toString()).replace(/\/+$/, "") + queryParams(options);
};
update$i.put = (args, options) => ({
  url: update$i.url(args, options),
  method: "put"
});
update$i.patch = (args, options) => ({
  url: update$i.url(args, options),
  method: "patch"
});
const updateForm$i = (args, options) => ({
  action: update$i.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
updateForm$i.put = (args, options) => ({
  action: update$i.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
updateForm$i.patch = (args, options) => ({
  action: update$i.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PATCH",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
update$i.form = updateForm$i;
const destroy$h = (args, options) => ({
  url: destroy$h.url(args, options),
  method: "delete"
});
destroy$h.definition = {
  methods: ["delete"],
  url: "/bonus/sponsor/{customerBonusSponsor}"
};
destroy$h.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { customerBonusSponsor: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { customerBonusSponsor: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      customerBonusSponsor: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    customerBonusSponsor: typeof args.customerBonusSponsor === "object" ? args.customerBonusSponsor.id : args.customerBonusSponsor
  };
  return destroy$h.definition.url.replace("{customerBonusSponsor}", parsedArgs.customerBonusSponsor.toString()).replace(/\/+$/, "") + queryParams(options);
};
destroy$h.delete = (args, options) => ({
  url: destroy$h.url(args, options),
  method: "delete"
});
const destroyForm$h = (args, options) => ({
  action: destroy$h.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
destroyForm$h.delete = (args, options) => ({
  action: destroy$h.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
destroy$h.form = destroyForm$h;
const release$6 = (args, options) => ({
  url: release$6.url(args, options),
  method: "post"
});
release$6.definition = {
  methods: ["post"],
  url: "/bonus/sponsor/{customerBonusSponsor}/release"
};
release$6.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { customerBonusSponsor: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { customerBonusSponsor: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      customerBonusSponsor: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    customerBonusSponsor: typeof args.customerBonusSponsor === "object" ? args.customerBonusSponsor.id : args.customerBonusSponsor
  };
  return release$6.definition.url.replace("{customerBonusSponsor}", parsedArgs.customerBonusSponsor.toString()).replace(/\/+$/, "") + queryParams(options);
};
release$6.post = (args, options) => ({
  url: release$6.url(args, options),
  method: "post"
});
const releaseForm$6 = (args, options) => ({
  action: release$6.url(args, options),
  method: "post"
});
releaseForm$6.post = (args, options) => ({
  action: release$6.url(args, options),
  method: "post"
});
release$6.form = releaseForm$6;
const massRelease$5 = (options) => ({
  url: massRelease$5.url(options),
  method: "post"
});
massRelease$5.definition = {
  methods: ["post"],
  url: "/bonus/sponsor/mass-release"
};
massRelease$5.url = (options) => {
  return massRelease$5.definition.url + queryParams(options);
};
massRelease$5.post = (options) => ({
  url: massRelease$5.url(options),
  method: "post"
});
const massReleaseForm$5 = (options) => ({
  action: massRelease$5.url(options),
  method: "post"
});
massReleaseForm$5.post = (options) => ({
  action: massRelease$5.url(options),
  method: "post"
});
massRelease$5.form = massReleaseForm$5;
const index$p = (options) => ({
  url: index$p.url(options),
  method: "get"
});
index$p.definition = {
  methods: ["get", "head"],
  url: "/bonus/matching"
};
index$p.url = (options) => {
  return index$p.definition.url + queryParams(options);
};
index$p.get = (options) => ({
  url: index$p.url(options),
  method: "get"
});
index$p.head = (options) => ({
  url: index$p.url(options),
  method: "head"
});
const indexForm$p = (options) => ({
  action: index$p.url(options),
  method: "get"
});
indexForm$p.get = (options) => ({
  action: index$p.url(options),
  method: "get"
});
indexForm$p.head = (options) => ({
  action: index$p.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
index$p.form = indexForm$p;
const create$d = (options) => ({
  url: create$d.url(options),
  method: "get"
});
create$d.definition = {
  methods: ["get", "head"],
  url: "/bonus/matching/create"
};
create$d.url = (options) => {
  return create$d.definition.url + queryParams(options);
};
create$d.get = (options) => ({
  url: create$d.url(options),
  method: "get"
});
create$d.head = (options) => ({
  url: create$d.url(options),
  method: "head"
});
const createForm$d = (options) => ({
  action: create$d.url(options),
  method: "get"
});
createForm$d.get = (options) => ({
  action: create$d.url(options),
  method: "get"
});
createForm$d.head = (options) => ({
  action: create$d.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
create$d.form = createForm$d;
const store$d = (options) => ({
  url: store$d.url(options),
  method: "post"
});
store$d.definition = {
  methods: ["post"],
  url: "/bonus/matching"
};
store$d.url = (options) => {
  return store$d.definition.url + queryParams(options);
};
store$d.post = (options) => ({
  url: store$d.url(options),
  method: "post"
});
const storeForm$d = (options) => ({
  action: store$d.url(options),
  method: "post"
});
storeForm$d.post = (options) => ({
  action: store$d.url(options),
  method: "post"
});
store$d.form = storeForm$d;
const show$c = (args, options) => ({
  url: show$c.url(args, options),
  method: "get"
});
show$c.definition = {
  methods: ["get", "head"],
  url: "/bonus/matching/{customerBonusMatching}"
};
show$c.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { customerBonusMatching: args };
  }
  if (Array.isArray(args)) {
    args = {
      customerBonusMatching: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    customerBonusMatching: args.customerBonusMatching
  };
  return show$c.definition.url.replace("{customerBonusMatching}", parsedArgs.customerBonusMatching.toString()).replace(/\/+$/, "") + queryParams(options);
};
show$c.get = (args, options) => ({
  url: show$c.url(args, options),
  method: "get"
});
show$c.head = (args, options) => ({
  url: show$c.url(args, options),
  method: "head"
});
const showForm$c = (args, options) => ({
  action: show$c.url(args, options),
  method: "get"
});
showForm$c.get = (args, options) => ({
  action: show$c.url(args, options),
  method: "get"
});
showForm$c.head = (args, options) => ({
  action: show$c.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
show$c.form = showForm$c;
const edit$e = (args, options) => ({
  url: edit$e.url(args, options),
  method: "get"
});
edit$e.definition = {
  methods: ["get", "head"],
  url: "/bonus/matching/{customerBonusMatching}/edit"
};
edit$e.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { customerBonusMatching: args };
  }
  if (Array.isArray(args)) {
    args = {
      customerBonusMatching: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    customerBonusMatching: args.customerBonusMatching
  };
  return edit$e.definition.url.replace("{customerBonusMatching}", parsedArgs.customerBonusMatching.toString()).replace(/\/+$/, "") + queryParams(options);
};
edit$e.get = (args, options) => ({
  url: edit$e.url(args, options),
  method: "get"
});
edit$e.head = (args, options) => ({
  url: edit$e.url(args, options),
  method: "head"
});
const editForm$e = (args, options) => ({
  action: edit$e.url(args, options),
  method: "get"
});
editForm$e.get = (args, options) => ({
  action: edit$e.url(args, options),
  method: "get"
});
editForm$e.head = (args, options) => ({
  action: edit$e.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
edit$e.form = editForm$e;
const update$h = (args, options) => ({
  url: update$h.url(args, options),
  method: "put"
});
update$h.definition = {
  methods: ["put", "patch"],
  url: "/bonus/matching/{customerBonusMatching}"
};
update$h.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { customerBonusMatching: args };
  }
  if (Array.isArray(args)) {
    args = {
      customerBonusMatching: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    customerBonusMatching: args.customerBonusMatching
  };
  return update$h.definition.url.replace("{customerBonusMatching}", parsedArgs.customerBonusMatching.toString()).replace(/\/+$/, "") + queryParams(options);
};
update$h.put = (args, options) => ({
  url: update$h.url(args, options),
  method: "put"
});
update$h.patch = (args, options) => ({
  url: update$h.url(args, options),
  method: "patch"
});
const updateForm$h = (args, options) => ({
  action: update$h.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
updateForm$h.put = (args, options) => ({
  action: update$h.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
updateForm$h.patch = (args, options) => ({
  action: update$h.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PATCH",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
update$h.form = updateForm$h;
const destroy$g = (args, options) => ({
  url: destroy$g.url(args, options),
  method: "delete"
});
destroy$g.definition = {
  methods: ["delete"],
  url: "/bonus/matching/{customerBonusMatching}"
};
destroy$g.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { customerBonusMatching: args };
  }
  if (Array.isArray(args)) {
    args = {
      customerBonusMatching: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    customerBonusMatching: args.customerBonusMatching
  };
  return destroy$g.definition.url.replace("{customerBonusMatching}", parsedArgs.customerBonusMatching.toString()).replace(/\/+$/, "") + queryParams(options);
};
destroy$g.delete = (args, options) => ({
  url: destroy$g.url(args, options),
  method: "delete"
});
const destroyForm$g = (args, options) => ({
  action: destroy$g.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
destroyForm$g.delete = (args, options) => ({
  action: destroy$g.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
destroy$g.form = destroyForm$g;
const release$5 = (args, options) => ({
  url: release$5.url(args, options),
  method: "post"
});
release$5.definition = {
  methods: ["post"],
  url: "/bonus/matching/{customerBonusMatching}/release"
};
release$5.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { customerBonusMatching: args };
  }
  if (Array.isArray(args)) {
    args = {
      customerBonusMatching: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    customerBonusMatching: args.customerBonusMatching
  };
  return release$5.definition.url.replace("{customerBonusMatching}", parsedArgs.customerBonusMatching.toString()).replace(/\/+$/, "") + queryParams(options);
};
release$5.post = (args, options) => ({
  url: release$5.url(args, options),
  method: "post"
});
const releaseForm$5 = (args, options) => ({
  action: release$5.url(args, options),
  method: "post"
});
releaseForm$5.post = (args, options) => ({
  action: release$5.url(args, options),
  method: "post"
});
release$5.form = releaseForm$5;
const massRelease$4 = (options) => ({
  url: massRelease$4.url(options),
  method: "post"
});
massRelease$4.definition = {
  methods: ["post"],
  url: "/bonus/matching/mass-release"
};
massRelease$4.url = (options) => {
  return massRelease$4.definition.url + queryParams(options);
};
massRelease$4.post = (options) => ({
  url: massRelease$4.url(options),
  method: "post"
});
const massReleaseForm$4 = (options) => ({
  action: massRelease$4.url(options),
  method: "post"
});
massReleaseForm$4.post = (options) => ({
  action: massRelease$4.url(options),
  method: "post"
});
massRelease$4.form = massReleaseForm$4;
const index$o = (options) => ({
  url: index$o.url(options),
  method: "get"
});
index$o.definition = {
  methods: ["get", "head"],
  url: "/bonus/pairing"
};
index$o.url = (options) => {
  return index$o.definition.url + queryParams(options);
};
index$o.get = (options) => ({
  url: index$o.url(options),
  method: "get"
});
index$o.head = (options) => ({
  url: index$o.url(options),
  method: "head"
});
const indexForm$o = (options) => ({
  action: index$o.url(options),
  method: "get"
});
indexForm$o.get = (options) => ({
  action: index$o.url(options),
  method: "get"
});
indexForm$o.head = (options) => ({
  action: index$o.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
index$o.form = indexForm$o;
const create$c = (options) => ({
  url: create$c.url(options),
  method: "get"
});
create$c.definition = {
  methods: ["get", "head"],
  url: "/bonus/pairing/create"
};
create$c.url = (options) => {
  return create$c.definition.url + queryParams(options);
};
create$c.get = (options) => ({
  url: create$c.url(options),
  method: "get"
});
create$c.head = (options) => ({
  url: create$c.url(options),
  method: "head"
});
const createForm$c = (options) => ({
  action: create$c.url(options),
  method: "get"
});
createForm$c.get = (options) => ({
  action: create$c.url(options),
  method: "get"
});
createForm$c.head = (options) => ({
  action: create$c.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
create$c.form = createForm$c;
const store$c = (options) => ({
  url: store$c.url(options),
  method: "post"
});
store$c.definition = {
  methods: ["post"],
  url: "/bonus/pairing"
};
store$c.url = (options) => {
  return store$c.definition.url + queryParams(options);
};
store$c.post = (options) => ({
  url: store$c.url(options),
  method: "post"
});
const storeForm$c = (options) => ({
  action: store$c.url(options),
  method: "post"
});
storeForm$c.post = (options) => ({
  action: store$c.url(options),
  method: "post"
});
store$c.form = storeForm$c;
const show$b = (args, options) => ({
  url: show$b.url(args, options),
  method: "get"
});
show$b.definition = {
  methods: ["get", "head"],
  url: "/bonus/pairing/{customerBonusPairing}"
};
show$b.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { customerBonusPairing: args };
  }
  if (Array.isArray(args)) {
    args = {
      customerBonusPairing: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    customerBonusPairing: args.customerBonusPairing
  };
  return show$b.definition.url.replace("{customerBonusPairing}", parsedArgs.customerBonusPairing.toString()).replace(/\/+$/, "") + queryParams(options);
};
show$b.get = (args, options) => ({
  url: show$b.url(args, options),
  method: "get"
});
show$b.head = (args, options) => ({
  url: show$b.url(args, options),
  method: "head"
});
const showForm$b = (args, options) => ({
  action: show$b.url(args, options),
  method: "get"
});
showForm$b.get = (args, options) => ({
  action: show$b.url(args, options),
  method: "get"
});
showForm$b.head = (args, options) => ({
  action: show$b.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
show$b.form = showForm$b;
const edit$d = (args, options) => ({
  url: edit$d.url(args, options),
  method: "get"
});
edit$d.definition = {
  methods: ["get", "head"],
  url: "/bonus/pairing/{customerBonusPairing}/edit"
};
edit$d.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { customerBonusPairing: args };
  }
  if (Array.isArray(args)) {
    args = {
      customerBonusPairing: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    customerBonusPairing: args.customerBonusPairing
  };
  return edit$d.definition.url.replace("{customerBonusPairing}", parsedArgs.customerBonusPairing.toString()).replace(/\/+$/, "") + queryParams(options);
};
edit$d.get = (args, options) => ({
  url: edit$d.url(args, options),
  method: "get"
});
edit$d.head = (args, options) => ({
  url: edit$d.url(args, options),
  method: "head"
});
const editForm$d = (args, options) => ({
  action: edit$d.url(args, options),
  method: "get"
});
editForm$d.get = (args, options) => ({
  action: edit$d.url(args, options),
  method: "get"
});
editForm$d.head = (args, options) => ({
  action: edit$d.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
edit$d.form = editForm$d;
const update$g = (args, options) => ({
  url: update$g.url(args, options),
  method: "put"
});
update$g.definition = {
  methods: ["put", "patch"],
  url: "/bonus/pairing/{customerBonusPairing}"
};
update$g.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { customerBonusPairing: args };
  }
  if (Array.isArray(args)) {
    args = {
      customerBonusPairing: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    customerBonusPairing: args.customerBonusPairing
  };
  return update$g.definition.url.replace("{customerBonusPairing}", parsedArgs.customerBonusPairing.toString()).replace(/\/+$/, "") + queryParams(options);
};
update$g.put = (args, options) => ({
  url: update$g.url(args, options),
  method: "put"
});
update$g.patch = (args, options) => ({
  url: update$g.url(args, options),
  method: "patch"
});
const updateForm$g = (args, options) => ({
  action: update$g.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
updateForm$g.put = (args, options) => ({
  action: update$g.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
updateForm$g.patch = (args, options) => ({
  action: update$g.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PATCH",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
update$g.form = updateForm$g;
const destroy$f = (args, options) => ({
  url: destroy$f.url(args, options),
  method: "delete"
});
destroy$f.definition = {
  methods: ["delete"],
  url: "/bonus/pairing/{customerBonusPairing}"
};
destroy$f.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { customerBonusPairing: args };
  }
  if (Array.isArray(args)) {
    args = {
      customerBonusPairing: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    customerBonusPairing: args.customerBonusPairing
  };
  return destroy$f.definition.url.replace("{customerBonusPairing}", parsedArgs.customerBonusPairing.toString()).replace(/\/+$/, "") + queryParams(options);
};
destroy$f.delete = (args, options) => ({
  url: destroy$f.url(args, options),
  method: "delete"
});
const destroyForm$f = (args, options) => ({
  action: destroy$f.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
destroyForm$f.delete = (args, options) => ({
  action: destroy$f.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
destroy$f.form = destroyForm$f;
const release$4 = (args, options) => ({
  url: release$4.url(args, options),
  method: "post"
});
release$4.definition = {
  methods: ["post"],
  url: "/bonus/pairing/{customerBonusPairing}/release"
};
release$4.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { customerBonusPairing: args };
  }
  if (Array.isArray(args)) {
    args = {
      customerBonusPairing: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    customerBonusPairing: args.customerBonusPairing
  };
  return release$4.definition.url.replace("{customerBonusPairing}", parsedArgs.customerBonusPairing.toString()).replace(/\/+$/, "") + queryParams(options);
};
release$4.post = (args, options) => ({
  url: release$4.url(args, options),
  method: "post"
});
const releaseForm$4 = (args, options) => ({
  action: release$4.url(args, options),
  method: "post"
});
releaseForm$4.post = (args, options) => ({
  action: release$4.url(args, options),
  method: "post"
});
release$4.form = releaseForm$4;
const flush = (options) => ({
  url: flush.url(options),
  method: "post"
});
flush.definition = {
  methods: ["post"],
  url: "/bonus/pairing/flush"
};
flush.url = (options) => {
  return flush.definition.url + queryParams(options);
};
flush.post = (options) => ({
  url: flush.url(options),
  method: "post"
});
const flushForm = (options) => ({
  action: flush.url(options),
  method: "post"
});
flushForm.post = (options) => ({
  action: flush.url(options),
  method: "post"
});
flush.form = flushForm;
const index$n = (options) => ({
  url: index$n.url(options),
  method: "get"
});
index$n.definition = {
  methods: ["get", "head"],
  url: "/bonus/cashback"
};
index$n.url = (options) => {
  return index$n.definition.url + queryParams(options);
};
index$n.get = (options) => ({
  url: index$n.url(options),
  method: "get"
});
index$n.head = (options) => ({
  url: index$n.url(options),
  method: "head"
});
const indexForm$n = (options) => ({
  action: index$n.url(options),
  method: "get"
});
indexForm$n.get = (options) => ({
  action: index$n.url(options),
  method: "get"
});
indexForm$n.head = (options) => ({
  action: index$n.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
index$n.form = indexForm$n;
const create$b = (options) => ({
  url: create$b.url(options),
  method: "get"
});
create$b.definition = {
  methods: ["get", "head"],
  url: "/bonus/cashback/create"
};
create$b.url = (options) => {
  return create$b.definition.url + queryParams(options);
};
create$b.get = (options) => ({
  url: create$b.url(options),
  method: "get"
});
create$b.head = (options) => ({
  url: create$b.url(options),
  method: "head"
});
const createForm$b = (options) => ({
  action: create$b.url(options),
  method: "get"
});
createForm$b.get = (options) => ({
  action: create$b.url(options),
  method: "get"
});
createForm$b.head = (options) => ({
  action: create$b.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
create$b.form = createForm$b;
const store$b = (options) => ({
  url: store$b.url(options),
  method: "post"
});
store$b.definition = {
  methods: ["post"],
  url: "/bonus/cashback"
};
store$b.url = (options) => {
  return store$b.definition.url + queryParams(options);
};
store$b.post = (options) => ({
  url: store$b.url(options),
  method: "post"
});
const storeForm$b = (options) => ({
  action: store$b.url(options),
  method: "post"
});
storeForm$b.post = (options) => ({
  action: store$b.url(options),
  method: "post"
});
store$b.form = storeForm$b;
const show$a = (args, options) => ({
  url: show$a.url(args, options),
  method: "get"
});
show$a.definition = {
  methods: ["get", "head"],
  url: "/bonus/cashback/{customerBonusCashback}"
};
show$a.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { customerBonusCashback: args };
  }
  if (Array.isArray(args)) {
    args = {
      customerBonusCashback: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    customerBonusCashback: args.customerBonusCashback
  };
  return show$a.definition.url.replace("{customerBonusCashback}", parsedArgs.customerBonusCashback.toString()).replace(/\/+$/, "") + queryParams(options);
};
show$a.get = (args, options) => ({
  url: show$a.url(args, options),
  method: "get"
});
show$a.head = (args, options) => ({
  url: show$a.url(args, options),
  method: "head"
});
const showForm$a = (args, options) => ({
  action: show$a.url(args, options),
  method: "get"
});
showForm$a.get = (args, options) => ({
  action: show$a.url(args, options),
  method: "get"
});
showForm$a.head = (args, options) => ({
  action: show$a.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
show$a.form = showForm$a;
const edit$c = (args, options) => ({
  url: edit$c.url(args, options),
  method: "get"
});
edit$c.definition = {
  methods: ["get", "head"],
  url: "/bonus/cashback/{customerBonusCashback}/edit"
};
edit$c.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { customerBonusCashback: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { customerBonusCashback: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      customerBonusCashback: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    customerBonusCashback: typeof args.customerBonusCashback === "object" ? args.customerBonusCashback.id : args.customerBonusCashback
  };
  return edit$c.definition.url.replace("{customerBonusCashback}", parsedArgs.customerBonusCashback.toString()).replace(/\/+$/, "") + queryParams(options);
};
edit$c.get = (args, options) => ({
  url: edit$c.url(args, options),
  method: "get"
});
edit$c.head = (args, options) => ({
  url: edit$c.url(args, options),
  method: "head"
});
const editForm$c = (args, options) => ({
  action: edit$c.url(args, options),
  method: "get"
});
editForm$c.get = (args, options) => ({
  action: edit$c.url(args, options),
  method: "get"
});
editForm$c.head = (args, options) => ({
  action: edit$c.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
edit$c.form = editForm$c;
const update$f = (args, options) => ({
  url: update$f.url(args, options),
  method: "put"
});
update$f.definition = {
  methods: ["put", "patch"],
  url: "/bonus/cashback/{customerBonusCashback}"
};
update$f.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { customerBonusCashback: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { customerBonusCashback: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      customerBonusCashback: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    customerBonusCashback: typeof args.customerBonusCashback === "object" ? args.customerBonusCashback.id : args.customerBonusCashback
  };
  return update$f.definition.url.replace("{customerBonusCashback}", parsedArgs.customerBonusCashback.toString()).replace(/\/+$/, "") + queryParams(options);
};
update$f.put = (args, options) => ({
  url: update$f.url(args, options),
  method: "put"
});
update$f.patch = (args, options) => ({
  url: update$f.url(args, options),
  method: "patch"
});
const updateForm$f = (args, options) => ({
  action: update$f.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
updateForm$f.put = (args, options) => ({
  action: update$f.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
updateForm$f.patch = (args, options) => ({
  action: update$f.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PATCH",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
update$f.form = updateForm$f;
const destroy$e = (args, options) => ({
  url: destroy$e.url(args, options),
  method: "delete"
});
destroy$e.definition = {
  methods: ["delete"],
  url: "/bonus/cashback/{customerBonusCashback}"
};
destroy$e.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { customerBonusCashback: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { customerBonusCashback: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      customerBonusCashback: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    customerBonusCashback: typeof args.customerBonusCashback === "object" ? args.customerBonusCashback.id : args.customerBonusCashback
  };
  return destroy$e.definition.url.replace("{customerBonusCashback}", parsedArgs.customerBonusCashback.toString()).replace(/\/+$/, "") + queryParams(options);
};
destroy$e.delete = (args, options) => ({
  url: destroy$e.url(args, options),
  method: "delete"
});
const destroyForm$e = (args, options) => ({
  action: destroy$e.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
destroyForm$e.delete = (args, options) => ({
  action: destroy$e.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
destroy$e.form = destroyForm$e;
const release$3 = (args, options) => ({
  url: release$3.url(args, options),
  method: "post"
});
release$3.definition = {
  methods: ["post"],
  url: "/bonus/cashback/{customerBonusCashback}/release"
};
release$3.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { customerBonusCashback: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { customerBonusCashback: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      customerBonusCashback: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    customerBonusCashback: typeof args.customerBonusCashback === "object" ? args.customerBonusCashback.id : args.customerBonusCashback
  };
  return release$3.definition.url.replace("{customerBonusCashback}", parsedArgs.customerBonusCashback.toString()).replace(/\/+$/, "") + queryParams(options);
};
release$3.post = (args, options) => ({
  url: release$3.url(args, options),
  method: "post"
});
const releaseForm$3 = (args, options) => ({
  action: release$3.url(args, options),
  method: "post"
});
releaseForm$3.post = (args, options) => ({
  action: release$3.url(args, options),
  method: "post"
});
release$3.form = releaseForm$3;
const massRelease$3 = (options) => ({
  url: massRelease$3.url(options),
  method: "post"
});
massRelease$3.definition = {
  methods: ["post"],
  url: "/bonus/cashback/mass-release"
};
massRelease$3.url = (options) => {
  return massRelease$3.definition.url + queryParams(options);
};
massRelease$3.post = (options) => ({
  url: massRelease$3.url(options),
  method: "post"
});
const massReleaseForm$3 = (options) => ({
  action: massRelease$3.url(options),
  method: "post"
});
massReleaseForm$3.post = (options) => ({
  action: massRelease$3.url(options),
  method: "post"
});
massRelease$3.form = massReleaseForm$3;
const index$m = (options) => ({
  url: index$m.url(options),
  method: "get"
});
index$m.definition = {
  methods: ["get", "head"],
  url: "/bonus/reward"
};
index$m.url = (options) => {
  return index$m.definition.url + queryParams(options);
};
index$m.get = (options) => ({
  url: index$m.url(options),
  method: "get"
});
index$m.head = (options) => ({
  url: index$m.url(options),
  method: "head"
});
const indexForm$m = (options) => ({
  action: index$m.url(options),
  method: "get"
});
indexForm$m.get = (options) => ({
  action: index$m.url(options),
  method: "get"
});
indexForm$m.head = (options) => ({
  action: index$m.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
index$m.form = indexForm$m;
const create$a = (options) => ({
  url: create$a.url(options),
  method: "get"
});
create$a.definition = {
  methods: ["get", "head"],
  url: "/bonus/reward/create"
};
create$a.url = (options) => {
  return create$a.definition.url + queryParams(options);
};
create$a.get = (options) => ({
  url: create$a.url(options),
  method: "get"
});
create$a.head = (options) => ({
  url: create$a.url(options),
  method: "head"
});
const createForm$a = (options) => ({
  action: create$a.url(options),
  method: "get"
});
createForm$a.get = (options) => ({
  action: create$a.url(options),
  method: "get"
});
createForm$a.head = (options) => ({
  action: create$a.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
create$a.form = createForm$a;
const store$a = (options) => ({
  url: store$a.url(options),
  method: "post"
});
store$a.definition = {
  methods: ["post"],
  url: "/bonus/reward"
};
store$a.url = (options) => {
  return store$a.definition.url + queryParams(options);
};
store$a.post = (options) => ({
  url: store$a.url(options),
  method: "post"
});
const storeForm$a = (options) => ({
  action: store$a.url(options),
  method: "post"
});
storeForm$a.post = (options) => ({
  action: store$a.url(options),
  method: "post"
});
store$a.form = storeForm$a;
const show$9 = (args, options) => ({
  url: show$9.url(args, options),
  method: "get"
});
show$9.definition = {
  methods: ["get", "head"],
  url: "/bonus/reward/{customerBonusReward}"
};
show$9.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { customerBonusReward: args };
  }
  if (Array.isArray(args)) {
    args = {
      customerBonusReward: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    customerBonusReward: args.customerBonusReward
  };
  return show$9.definition.url.replace("{customerBonusReward}", parsedArgs.customerBonusReward.toString()).replace(/\/+$/, "") + queryParams(options);
};
show$9.get = (args, options) => ({
  url: show$9.url(args, options),
  method: "get"
});
show$9.head = (args, options) => ({
  url: show$9.url(args, options),
  method: "head"
});
const showForm$9 = (args, options) => ({
  action: show$9.url(args, options),
  method: "get"
});
showForm$9.get = (args, options) => ({
  action: show$9.url(args, options),
  method: "get"
});
showForm$9.head = (args, options) => ({
  action: show$9.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
show$9.form = showForm$9;
const edit$b = (args, options) => ({
  url: edit$b.url(args, options),
  method: "get"
});
edit$b.definition = {
  methods: ["get", "head"],
  url: "/bonus/reward/{customerBonusReward}/edit"
};
edit$b.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { customerBonusReward: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { customerBonusReward: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      customerBonusReward: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    customerBonusReward: typeof args.customerBonusReward === "object" ? args.customerBonusReward.id : args.customerBonusReward
  };
  return edit$b.definition.url.replace("{customerBonusReward}", parsedArgs.customerBonusReward.toString()).replace(/\/+$/, "") + queryParams(options);
};
edit$b.get = (args, options) => ({
  url: edit$b.url(args, options),
  method: "get"
});
edit$b.head = (args, options) => ({
  url: edit$b.url(args, options),
  method: "head"
});
const editForm$b = (args, options) => ({
  action: edit$b.url(args, options),
  method: "get"
});
editForm$b.get = (args, options) => ({
  action: edit$b.url(args, options),
  method: "get"
});
editForm$b.head = (args, options) => ({
  action: edit$b.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
edit$b.form = editForm$b;
const update$e = (args, options) => ({
  url: update$e.url(args, options),
  method: "put"
});
update$e.definition = {
  methods: ["put", "patch"],
  url: "/bonus/reward/{customerBonusReward}"
};
update$e.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { customerBonusReward: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { customerBonusReward: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      customerBonusReward: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    customerBonusReward: typeof args.customerBonusReward === "object" ? args.customerBonusReward.id : args.customerBonusReward
  };
  return update$e.definition.url.replace("{customerBonusReward}", parsedArgs.customerBonusReward.toString()).replace(/\/+$/, "") + queryParams(options);
};
update$e.put = (args, options) => ({
  url: update$e.url(args, options),
  method: "put"
});
update$e.patch = (args, options) => ({
  url: update$e.url(args, options),
  method: "patch"
});
const updateForm$e = (args, options) => ({
  action: update$e.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
updateForm$e.put = (args, options) => ({
  action: update$e.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
updateForm$e.patch = (args, options) => ({
  action: update$e.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PATCH",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
update$e.form = updateForm$e;
const destroy$d = (args, options) => ({
  url: destroy$d.url(args, options),
  method: "delete"
});
destroy$d.definition = {
  methods: ["delete"],
  url: "/bonus/reward/{customerBonusReward}"
};
destroy$d.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { customerBonusReward: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { customerBonusReward: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      customerBonusReward: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    customerBonusReward: typeof args.customerBonusReward === "object" ? args.customerBonusReward.id : args.customerBonusReward
  };
  return destroy$d.definition.url.replace("{customerBonusReward}", parsedArgs.customerBonusReward.toString()).replace(/\/+$/, "") + queryParams(options);
};
destroy$d.delete = (args, options) => ({
  url: destroy$d.url(args, options),
  method: "delete"
});
const destroyForm$d = (args, options) => ({
  action: destroy$d.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
destroyForm$d.delete = (args, options) => ({
  action: destroy$d.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
destroy$d.form = destroyForm$d;
const release$2 = (args, options) => ({
  url: release$2.url(args, options),
  method: "post"
});
release$2.definition = {
  methods: ["post"],
  url: "/bonus/reward/{customerBonusReward}/release"
};
release$2.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { customerBonusReward: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { customerBonusReward: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      customerBonusReward: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    customerBonusReward: typeof args.customerBonusReward === "object" ? args.customerBonusReward.id : args.customerBonusReward
  };
  return release$2.definition.url.replace("{customerBonusReward}", parsedArgs.customerBonusReward.toString()).replace(/\/+$/, "") + queryParams(options);
};
release$2.post = (args, options) => ({
  url: release$2.url(args, options),
  method: "post"
});
const releaseForm$2 = (args, options) => ({
  action: release$2.url(args, options),
  method: "post"
});
releaseForm$2.post = (args, options) => ({
  action: release$2.url(args, options),
  method: "post"
});
release$2.form = releaseForm$2;
const massRelease$2 = (options) => ({
  url: massRelease$2.url(options),
  method: "post"
});
massRelease$2.definition = {
  methods: ["post"],
  url: "/bonus/reward/mass-release"
};
massRelease$2.url = (options) => {
  return massRelease$2.definition.url + queryParams(options);
};
massRelease$2.post = (options) => ({
  url: massRelease$2.url(options),
  method: "post"
});
const massReleaseForm$2 = (options) => ({
  action: massRelease$2.url(options),
  method: "post"
});
massReleaseForm$2.post = (options) => ({
  action: massRelease$2.url(options),
  method: "post"
});
massRelease$2.form = massReleaseForm$2;
const index$l = (options) => ({
  url: index$l.url(options),
  method: "get"
});
index$l.definition = {
  methods: ["get", "head"],
  url: "/bonus/retail"
};
index$l.url = (options) => {
  return index$l.definition.url + queryParams(options);
};
index$l.get = (options) => ({
  url: index$l.url(options),
  method: "get"
});
index$l.head = (options) => ({
  url: index$l.url(options),
  method: "head"
});
const indexForm$l = (options) => ({
  action: index$l.url(options),
  method: "get"
});
indexForm$l.get = (options) => ({
  action: index$l.url(options),
  method: "get"
});
indexForm$l.head = (options) => ({
  action: index$l.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
index$l.form = indexForm$l;
const create$9 = (options) => ({
  url: create$9.url(options),
  method: "get"
});
create$9.definition = {
  methods: ["get", "head"],
  url: "/bonus/retail/create"
};
create$9.url = (options) => {
  return create$9.definition.url + queryParams(options);
};
create$9.get = (options) => ({
  url: create$9.url(options),
  method: "get"
});
create$9.head = (options) => ({
  url: create$9.url(options),
  method: "head"
});
const createForm$9 = (options) => ({
  action: create$9.url(options),
  method: "get"
});
createForm$9.get = (options) => ({
  action: create$9.url(options),
  method: "get"
});
createForm$9.head = (options) => ({
  action: create$9.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
create$9.form = createForm$9;
const store$9 = (options) => ({
  url: store$9.url(options),
  method: "post"
});
store$9.definition = {
  methods: ["post"],
  url: "/bonus/retail"
};
store$9.url = (options) => {
  return store$9.definition.url + queryParams(options);
};
store$9.post = (options) => ({
  url: store$9.url(options),
  method: "post"
});
const storeForm$9 = (options) => ({
  action: store$9.url(options),
  method: "post"
});
storeForm$9.post = (options) => ({
  action: store$9.url(options),
  method: "post"
});
store$9.form = storeForm$9;
const show$8 = (args, options) => ({
  url: show$8.url(args, options),
  method: "get"
});
show$8.definition = {
  methods: ["get", "head"],
  url: "/bonus/retail/{customerBonusRetail}"
};
show$8.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { customerBonusRetail: args };
  }
  if (Array.isArray(args)) {
    args = {
      customerBonusRetail: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    customerBonusRetail: args.customerBonusRetail
  };
  return show$8.definition.url.replace("{customerBonusRetail}", parsedArgs.customerBonusRetail.toString()).replace(/\/+$/, "") + queryParams(options);
};
show$8.get = (args, options) => ({
  url: show$8.url(args, options),
  method: "get"
});
show$8.head = (args, options) => ({
  url: show$8.url(args, options),
  method: "head"
});
const showForm$8 = (args, options) => ({
  action: show$8.url(args, options),
  method: "get"
});
showForm$8.get = (args, options) => ({
  action: show$8.url(args, options),
  method: "get"
});
showForm$8.head = (args, options) => ({
  action: show$8.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
show$8.form = showForm$8;
const edit$a = (args, options) => ({
  url: edit$a.url(args, options),
  method: "get"
});
edit$a.definition = {
  methods: ["get", "head"],
  url: "/bonus/retail/{customerBonusRetail}/edit"
};
edit$a.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { customerBonusRetail: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { customerBonusRetail: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      customerBonusRetail: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    customerBonusRetail: typeof args.customerBonusRetail === "object" ? args.customerBonusRetail.id : args.customerBonusRetail
  };
  return edit$a.definition.url.replace("{customerBonusRetail}", parsedArgs.customerBonusRetail.toString()).replace(/\/+$/, "") + queryParams(options);
};
edit$a.get = (args, options) => ({
  url: edit$a.url(args, options),
  method: "get"
});
edit$a.head = (args, options) => ({
  url: edit$a.url(args, options),
  method: "head"
});
const editForm$a = (args, options) => ({
  action: edit$a.url(args, options),
  method: "get"
});
editForm$a.get = (args, options) => ({
  action: edit$a.url(args, options),
  method: "get"
});
editForm$a.head = (args, options) => ({
  action: edit$a.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
edit$a.form = editForm$a;
const update$d = (args, options) => ({
  url: update$d.url(args, options),
  method: "put"
});
update$d.definition = {
  methods: ["put", "patch"],
  url: "/bonus/retail/{customerBonusRetail}"
};
update$d.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { customerBonusRetail: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { customerBonusRetail: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      customerBonusRetail: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    customerBonusRetail: typeof args.customerBonusRetail === "object" ? args.customerBonusRetail.id : args.customerBonusRetail
  };
  return update$d.definition.url.replace("{customerBonusRetail}", parsedArgs.customerBonusRetail.toString()).replace(/\/+$/, "") + queryParams(options);
};
update$d.put = (args, options) => ({
  url: update$d.url(args, options),
  method: "put"
});
update$d.patch = (args, options) => ({
  url: update$d.url(args, options),
  method: "patch"
});
const updateForm$d = (args, options) => ({
  action: update$d.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
updateForm$d.put = (args, options) => ({
  action: update$d.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
updateForm$d.patch = (args, options) => ({
  action: update$d.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PATCH",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
update$d.form = updateForm$d;
const destroy$c = (args, options) => ({
  url: destroy$c.url(args, options),
  method: "delete"
});
destroy$c.definition = {
  methods: ["delete"],
  url: "/bonus/retail/{customerBonusRetail}"
};
destroy$c.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { customerBonusRetail: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { customerBonusRetail: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      customerBonusRetail: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    customerBonusRetail: typeof args.customerBonusRetail === "object" ? args.customerBonusRetail.id : args.customerBonusRetail
  };
  return destroy$c.definition.url.replace("{customerBonusRetail}", parsedArgs.customerBonusRetail.toString()).replace(/\/+$/, "") + queryParams(options);
};
destroy$c.delete = (args, options) => ({
  url: destroy$c.url(args, options),
  method: "delete"
});
const destroyForm$c = (args, options) => ({
  action: destroy$c.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
destroyForm$c.delete = (args, options) => ({
  action: destroy$c.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
destroy$c.form = destroyForm$c;
const release$1 = (args, options) => ({
  url: release$1.url(args, options),
  method: "post"
});
release$1.definition = {
  methods: ["post"],
  url: "/bonus/retail/{customerBonusRetail}/release"
};
release$1.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { customerBonusRetail: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { customerBonusRetail: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      customerBonusRetail: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    customerBonusRetail: typeof args.customerBonusRetail === "object" ? args.customerBonusRetail.id : args.customerBonusRetail
  };
  return release$1.definition.url.replace("{customerBonusRetail}", parsedArgs.customerBonusRetail.toString()).replace(/\/+$/, "") + queryParams(options);
};
release$1.post = (args, options) => ({
  url: release$1.url(args, options),
  method: "post"
});
const releaseForm$1 = (args, options) => ({
  action: release$1.url(args, options),
  method: "post"
});
releaseForm$1.post = (args, options) => ({
  action: release$1.url(args, options),
  method: "post"
});
release$1.form = releaseForm$1;
const massRelease$1 = (options) => ({
  url: massRelease$1.url(options),
  method: "post"
});
massRelease$1.definition = {
  methods: ["post"],
  url: "/bonus/retail/mass-release"
};
massRelease$1.url = (options) => {
  return massRelease$1.definition.url + queryParams(options);
};
massRelease$1.post = (options) => ({
  url: massRelease$1.url(options),
  method: "post"
});
const massReleaseForm$1 = (options) => ({
  action: massRelease$1.url(options),
  method: "post"
});
massReleaseForm$1.post = (options) => ({
  action: massRelease$1.url(options),
  method: "post"
});
massRelease$1.form = massReleaseForm$1;
const index$k = (options) => ({
  url: index$k.url(options),
  method: "get"
});
index$k.definition = {
  methods: ["get", "head"],
  url: "/bonus/lifetime-cash-reward"
};
index$k.url = (options) => {
  return index$k.definition.url + queryParams(options);
};
index$k.get = (options) => ({
  url: index$k.url(options),
  method: "get"
});
index$k.head = (options) => ({
  url: index$k.url(options),
  method: "head"
});
const indexForm$k = (options) => ({
  action: index$k.url(options),
  method: "get"
});
indexForm$k.get = (options) => ({
  action: index$k.url(options),
  method: "get"
});
indexForm$k.head = (options) => ({
  action: index$k.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
index$k.form = indexForm$k;
const create$8 = (options) => ({
  url: create$8.url(options),
  method: "get"
});
create$8.definition = {
  methods: ["get", "head"],
  url: "/bonus/lifetime-cash-reward/create"
};
create$8.url = (options) => {
  return create$8.definition.url + queryParams(options);
};
create$8.get = (options) => ({
  url: create$8.url(options),
  method: "get"
});
create$8.head = (options) => ({
  url: create$8.url(options),
  method: "head"
});
const createForm$8 = (options) => ({
  action: create$8.url(options),
  method: "get"
});
createForm$8.get = (options) => ({
  action: create$8.url(options),
  method: "get"
});
createForm$8.head = (options) => ({
  action: create$8.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
create$8.form = createForm$8;
const store$8 = (options) => ({
  url: store$8.url(options),
  method: "post"
});
store$8.definition = {
  methods: ["post"],
  url: "/bonus/lifetime-cash-reward"
};
store$8.url = (options) => {
  return store$8.definition.url + queryParams(options);
};
store$8.post = (options) => ({
  url: store$8.url(options),
  method: "post"
});
const storeForm$8 = (options) => ({
  action: store$8.url(options),
  method: "post"
});
storeForm$8.post = (options) => ({
  action: store$8.url(options),
  method: "post"
});
store$8.form = storeForm$8;
const show$7 = (args, options) => ({
  url: show$7.url(args, options),
  method: "get"
});
show$7.definition = {
  methods: ["get", "head"],
  url: "/bonus/lifetime-cash-reward/{customerBonusLifetimeCashReward}"
};
show$7.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { customerBonusLifetimeCashReward: args };
  }
  if (Array.isArray(args)) {
    args = {
      customerBonusLifetimeCashReward: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    customerBonusLifetimeCashReward: args.customerBonusLifetimeCashReward
  };
  return show$7.definition.url.replace("{customerBonusLifetimeCashReward}", parsedArgs.customerBonusLifetimeCashReward.toString()).replace(/\/+$/, "") + queryParams(options);
};
show$7.get = (args, options) => ({
  url: show$7.url(args, options),
  method: "get"
});
show$7.head = (args, options) => ({
  url: show$7.url(args, options),
  method: "head"
});
const showForm$7 = (args, options) => ({
  action: show$7.url(args, options),
  method: "get"
});
showForm$7.get = (args, options) => ({
  action: show$7.url(args, options),
  method: "get"
});
showForm$7.head = (args, options) => ({
  action: show$7.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
show$7.form = showForm$7;
const edit$9 = (args, options) => ({
  url: edit$9.url(args, options),
  method: "get"
});
edit$9.definition = {
  methods: ["get", "head"],
  url: "/bonus/lifetime-cash-reward/{customerBonusLifetimeCashReward}/edit"
};
edit$9.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { customerBonusLifetimeCashReward: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { customerBonusLifetimeCashReward: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      customerBonusLifetimeCashReward: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    customerBonusLifetimeCashReward: typeof args.customerBonusLifetimeCashReward === "object" ? args.customerBonusLifetimeCashReward.id : args.customerBonusLifetimeCashReward
  };
  return edit$9.definition.url.replace("{customerBonusLifetimeCashReward}", parsedArgs.customerBonusLifetimeCashReward.toString()).replace(/\/+$/, "") + queryParams(options);
};
edit$9.get = (args, options) => ({
  url: edit$9.url(args, options),
  method: "get"
});
edit$9.head = (args, options) => ({
  url: edit$9.url(args, options),
  method: "head"
});
const editForm$9 = (args, options) => ({
  action: edit$9.url(args, options),
  method: "get"
});
editForm$9.get = (args, options) => ({
  action: edit$9.url(args, options),
  method: "get"
});
editForm$9.head = (args, options) => ({
  action: edit$9.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
edit$9.form = editForm$9;
const update$c = (args, options) => ({
  url: update$c.url(args, options),
  method: "put"
});
update$c.definition = {
  methods: ["put", "patch"],
  url: "/bonus/lifetime-cash-reward/{customerBonusLifetimeCashReward}"
};
update$c.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { customerBonusLifetimeCashReward: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { customerBonusLifetimeCashReward: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      customerBonusLifetimeCashReward: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    customerBonusLifetimeCashReward: typeof args.customerBonusLifetimeCashReward === "object" ? args.customerBonusLifetimeCashReward.id : args.customerBonusLifetimeCashReward
  };
  return update$c.definition.url.replace("{customerBonusLifetimeCashReward}", parsedArgs.customerBonusLifetimeCashReward.toString()).replace(/\/+$/, "") + queryParams(options);
};
update$c.put = (args, options) => ({
  url: update$c.url(args, options),
  method: "put"
});
update$c.patch = (args, options) => ({
  url: update$c.url(args, options),
  method: "patch"
});
const updateForm$c = (args, options) => ({
  action: update$c.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
updateForm$c.put = (args, options) => ({
  action: update$c.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
updateForm$c.patch = (args, options) => ({
  action: update$c.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PATCH",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
update$c.form = updateForm$c;
const destroy$b = (args, options) => ({
  url: destroy$b.url(args, options),
  method: "delete"
});
destroy$b.definition = {
  methods: ["delete"],
  url: "/bonus/lifetime-cash-reward/{customerBonusLifetimeCashReward}"
};
destroy$b.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { customerBonusLifetimeCashReward: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { customerBonusLifetimeCashReward: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      customerBonusLifetimeCashReward: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    customerBonusLifetimeCashReward: typeof args.customerBonusLifetimeCashReward === "object" ? args.customerBonusLifetimeCashReward.id : args.customerBonusLifetimeCashReward
  };
  return destroy$b.definition.url.replace("{customerBonusLifetimeCashReward}", parsedArgs.customerBonusLifetimeCashReward.toString()).replace(/\/+$/, "") + queryParams(options);
};
destroy$b.delete = (args, options) => ({
  url: destroy$b.url(args, options),
  method: "delete"
});
const destroyForm$b = (args, options) => ({
  action: destroy$b.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
destroyForm$b.delete = (args, options) => ({
  action: destroy$b.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
destroy$b.form = destroyForm$b;
const release = (args, options) => ({
  url: release.url(args, options),
  method: "post"
});
release.definition = {
  methods: ["post"],
  url: "/bonus/lifetime-cash-reward/{customerBonusLifetimeCashReward}/release"
};
release.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { customerBonusLifetimeCashReward: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { customerBonusLifetimeCashReward: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      customerBonusLifetimeCashReward: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    customerBonusLifetimeCashReward: typeof args.customerBonusLifetimeCashReward === "object" ? args.customerBonusLifetimeCashReward.id : args.customerBonusLifetimeCashReward
  };
  return release.definition.url.replace("{customerBonusLifetimeCashReward}", parsedArgs.customerBonusLifetimeCashReward.toString()).replace(/\/+$/, "") + queryParams(options);
};
release.post = (args, options) => ({
  url: release.url(args, options),
  method: "post"
});
const releaseForm = (args, options) => ({
  action: release.url(args, options),
  method: "post"
});
releaseForm.post = (args, options) => ({
  action: release.url(args, options),
  method: "post"
});
release.form = releaseForm;
const massRelease = (options) => ({
  url: massRelease.url(options),
  method: "post"
});
massRelease.definition = {
  methods: ["post"],
  url: "/bonus/lifetime-cash-reward/mass-release"
};
massRelease.url = (options) => {
  return massRelease.definition.url + queryParams(options);
};
massRelease.post = (options) => ({
  url: massRelease.url(options),
  method: "post"
});
const massReleaseForm = (options) => ({
  action: massRelease.url(options),
  method: "post"
});
massReleaseForm.post = (options) => ({
  action: massRelease.url(options),
  method: "post"
});
massRelease.form = massReleaseForm;
const index$j = (options) => ({
  url: index$j.url(options),
  method: "get"
});
index$j.definition = {
  methods: ["get", "head"],
  url: "/manage/users"
};
index$j.url = (options) => {
  return index$j.definition.url + queryParams(options);
};
index$j.get = (options) => ({
  url: index$j.url(options),
  method: "get"
});
index$j.head = (options) => ({
  url: index$j.url(options),
  method: "head"
});
const indexForm$j = (options) => ({
  action: index$j.url(options),
  method: "get"
});
indexForm$j.get = (options) => ({
  action: index$j.url(options),
  method: "get"
});
indexForm$j.head = (options) => ({
  action: index$j.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
index$j.form = indexForm$j;
const create$7 = (options) => ({
  url: create$7.url(options),
  method: "get"
});
create$7.definition = {
  methods: ["get", "head"],
  url: "/manage/users/create"
};
create$7.url = (options) => {
  return create$7.definition.url + queryParams(options);
};
create$7.get = (options) => ({
  url: create$7.url(options),
  method: "get"
});
create$7.head = (options) => ({
  url: create$7.url(options),
  method: "head"
});
const createForm$7 = (options) => ({
  action: create$7.url(options),
  method: "get"
});
createForm$7.get = (options) => ({
  action: create$7.url(options),
  method: "get"
});
createForm$7.head = (options) => ({
  action: create$7.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
create$7.form = createForm$7;
const store$7 = (options) => ({
  url: store$7.url(options),
  method: "post"
});
store$7.definition = {
  methods: ["post"],
  url: "/manage/users"
};
store$7.url = (options) => {
  return store$7.definition.url + queryParams(options);
};
store$7.post = (options) => ({
  url: store$7.url(options),
  method: "post"
});
const storeForm$7 = (options) => ({
  action: store$7.url(options),
  method: "post"
});
storeForm$7.post = (options) => ({
  action: store$7.url(options),
  method: "post"
});
store$7.form = storeForm$7;
const show$6 = (args, options) => ({
  url: show$6.url(args, options),
  method: "get"
});
show$6.definition = {
  methods: ["get", "head"],
  url: "/manage/users/{user}"
};
show$6.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { user: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { user: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      user: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    user: typeof args.user === "object" ? args.user.id : args.user
  };
  return show$6.definition.url.replace("{user}", parsedArgs.user.toString()).replace(/\/+$/, "") + queryParams(options);
};
show$6.get = (args, options) => ({
  url: show$6.url(args, options),
  method: "get"
});
show$6.head = (args, options) => ({
  url: show$6.url(args, options),
  method: "head"
});
const showForm$6 = (args, options) => ({
  action: show$6.url(args, options),
  method: "get"
});
showForm$6.get = (args, options) => ({
  action: show$6.url(args, options),
  method: "get"
});
showForm$6.head = (args, options) => ({
  action: show$6.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
show$6.form = showForm$6;
const edit$8 = (args, options) => ({
  url: edit$8.url(args, options),
  method: "get"
});
edit$8.definition = {
  methods: ["get", "head"],
  url: "/manage/users/{user}/edit"
};
edit$8.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { user: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { user: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      user: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    user: typeof args.user === "object" ? args.user.id : args.user
  };
  return edit$8.definition.url.replace("{user}", parsedArgs.user.toString()).replace(/\/+$/, "") + queryParams(options);
};
edit$8.get = (args, options) => ({
  url: edit$8.url(args, options),
  method: "get"
});
edit$8.head = (args, options) => ({
  url: edit$8.url(args, options),
  method: "head"
});
const editForm$8 = (args, options) => ({
  action: edit$8.url(args, options),
  method: "get"
});
editForm$8.get = (args, options) => ({
  action: edit$8.url(args, options),
  method: "get"
});
editForm$8.head = (args, options) => ({
  action: edit$8.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
edit$8.form = editForm$8;
const update$b = (args, options) => ({
  url: update$b.url(args, options),
  method: "put"
});
update$b.definition = {
  methods: ["put", "patch"],
  url: "/manage/users/{user}"
};
update$b.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { user: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { user: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      user: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    user: typeof args.user === "object" ? args.user.id : args.user
  };
  return update$b.definition.url.replace("{user}", parsedArgs.user.toString()).replace(/\/+$/, "") + queryParams(options);
};
update$b.put = (args, options) => ({
  url: update$b.url(args, options),
  method: "put"
});
update$b.patch = (args, options) => ({
  url: update$b.url(args, options),
  method: "patch"
});
const updateForm$b = (args, options) => ({
  action: update$b.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
updateForm$b.put = (args, options) => ({
  action: update$b.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
updateForm$b.patch = (args, options) => ({
  action: update$b.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PATCH",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
update$b.form = updateForm$b;
const destroy$a = (args, options) => ({
  url: destroy$a.url(args, options),
  method: "delete"
});
destroy$a.definition = {
  methods: ["delete"],
  url: "/manage/users/{user}"
};
destroy$a.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { user: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { user: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      user: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    user: typeof args.user === "object" ? args.user.id : args.user
  };
  return destroy$a.definition.url.replace("{user}", parsedArgs.user.toString()).replace(/\/+$/, "") + queryParams(options);
};
destroy$a.delete = (args, options) => ({
  url: destroy$a.url(args, options),
  method: "delete"
});
const destroyForm$a = (args, options) => ({
  action: destroy$a.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
destroyForm$a.delete = (args, options) => ({
  action: destroy$a.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
destroy$a.form = destroyForm$a;
const UserController = { index: index$j, create: create$7, store: store$7, show: show$6, edit: edit$8, update: update$b, destroy: destroy$a };
const loginAsCustomer = (args, options) => ({
  url: loginAsCustomer.url(args, options),
  method: "post"
});
loginAsCustomer.definition = {
  methods: ["post"],
  url: "/manage/customers/{customer}/login-as"
};
loginAsCustomer.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { customer: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { customer: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      customer: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    customer: typeof args.customer === "object" ? args.customer.id : args.customer
  };
  return loginAsCustomer.definition.url.replace("{customer}", parsedArgs.customer.toString()).replace(/\/+$/, "") + queryParams(options);
};
loginAsCustomer.post = (args, options) => ({
  url: loginAsCustomer.url(args, options),
  method: "post"
});
const loginAsCustomerForm = (args, options) => ({
  action: loginAsCustomer.url(args, options),
  method: "post"
});
loginAsCustomerForm.post = (args, options) => ({
  action: loginAsCustomer.url(args, options),
  method: "post"
});
loginAsCustomer.form = loginAsCustomerForm;
const stopImpersonating = (options) => ({
  url: stopImpersonating.url(options),
  method: "post"
});
stopImpersonating.definition = {
  methods: ["post"],
  url: "/manage/customers/stop-impersonating"
};
stopImpersonating.url = (options) => {
  return stopImpersonating.definition.url + queryParams(options);
};
stopImpersonating.post = (options) => ({
  url: stopImpersonating.url(options),
  method: "post"
});
const stopImpersonatingForm = (options) => ({
  action: stopImpersonating.url(options),
  method: "post"
});
stopImpersonatingForm.post = (options) => ({
  action: stopImpersonating.url(options),
  method: "post"
});
stopImpersonating.form = stopImpersonatingForm;
const releaseBonuses = (args, options) => ({
  url: releaseBonuses.url(args, options),
  method: "post"
});
releaseBonuses.definition = {
  methods: ["post"],
  url: "/manage/customers/{customer}/release-bonuses"
};
releaseBonuses.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { customer: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { customer: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      customer: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    customer: typeof args.customer === "object" ? args.customer.id : args.customer
  };
  return releaseBonuses.definition.url.replace("{customer}", parsedArgs.customer.toString()).replace(/\/+$/, "") + queryParams(options);
};
releaseBonuses.post = (args, options) => ({
  url: releaseBonuses.url(args, options),
  method: "post"
});
const releaseBonusesForm = (args, options) => ({
  action: releaseBonuses.url(args, options),
  method: "post"
});
releaseBonusesForm.post = (args, options) => ({
  action: releaseBonuses.url(args, options),
  method: "post"
});
releaseBonuses.form = releaseBonusesForm;
const topUp = (args, options) => ({
  url: topUp.url(args, options),
  method: "post"
});
topUp.definition = {
  methods: ["post"],
  url: "/manage/customers/{customer}/top-up"
};
topUp.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { customer: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { customer: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      customer: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    customer: typeof args.customer === "object" ? args.customer.id : args.customer
  };
  return topUp.definition.url.replace("{customer}", parsedArgs.customer.toString()).replace(/\/+$/, "") + queryParams(options);
};
topUp.post = (args, options) => ({
  url: topUp.url(args, options),
  method: "post"
});
const topUpForm = (args, options) => ({
  action: topUp.url(args, options),
  method: "post"
});
topUpForm.post = (args, options) => ({
  action: topUp.url(args, options),
  method: "post"
});
topUp.form = topUpForm;
const deduct = (args, options) => ({
  url: deduct.url(args, options),
  method: "post"
});
deduct.definition = {
  methods: ["post"],
  url: "/manage/customers/{customer}/deduct"
};
deduct.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { customer: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { customer: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      customer: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    customer: typeof args.customer === "object" ? args.customer.id : args.customer
  };
  return deduct.definition.url.replace("{customer}", parsedArgs.customer.toString()).replace(/\/+$/, "") + queryParams(options);
};
deduct.post = (args, options) => ({
  url: deduct.url(args, options),
  method: "post"
});
const deductForm = (args, options) => ({
  action: deduct.url(args, options),
  method: "post"
});
deductForm.post = (args, options) => ({
  action: deduct.url(args, options),
  method: "post"
});
deduct.form = deductForm;
const findPosition = (options) => ({
  url: findPosition.url(options),
  method: "get"
});
findPosition.definition = {
  methods: ["get", "head"],
  url: "/manage/customers/placement/find-position"
};
findPosition.url = (options) => {
  return findPosition.definition.url + queryParams(options);
};
findPosition.get = (options) => ({
  url: findPosition.url(options),
  method: "get"
});
findPosition.head = (options) => ({
  url: findPosition.url(options),
  method: "head"
});
const findPositionForm = (options) => ({
  action: findPosition.url(options),
  method: "get"
});
findPositionForm.get = (options) => ({
  action: findPosition.url(options),
  method: "get"
});
findPositionForm.head = (options) => ({
  action: findPosition.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
findPosition.form = findPositionForm;
const validatePosition = (options) => ({
  url: validatePosition.url(options),
  method: "post"
});
validatePosition.definition = {
  methods: ["post"],
  url: "/manage/customers/placement/validate"
};
validatePosition.url = (options) => {
  return validatePosition.definition.url + queryParams(options);
};
validatePosition.post = (options) => ({
  url: validatePosition.url(options),
  method: "post"
});
const validatePositionForm = (options) => ({
  action: validatePosition.url(options),
  method: "post"
});
validatePositionForm.post = (options) => ({
  action: validatePosition.url(options),
  method: "post"
});
validatePosition.form = validatePositionForm;
const index$i = (options) => ({
  url: index$i.url(options),
  method: "get"
});
index$i.definition = {
  methods: ["get", "head"],
  url: "/manage/customers"
};
index$i.url = (options) => {
  return index$i.definition.url + queryParams(options);
};
index$i.get = (options) => ({
  url: index$i.url(options),
  method: "get"
});
index$i.head = (options) => ({
  url: index$i.url(options),
  method: "head"
});
const indexForm$i = (options) => ({
  action: index$i.url(options),
  method: "get"
});
indexForm$i.get = (options) => ({
  action: index$i.url(options),
  method: "get"
});
indexForm$i.head = (options) => ({
  action: index$i.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
index$i.form = indexForm$i;
const create$6 = (options) => ({
  url: create$6.url(options),
  method: "get"
});
create$6.definition = {
  methods: ["get", "head"],
  url: "/manage/customers/create"
};
create$6.url = (options) => {
  return create$6.definition.url + queryParams(options);
};
create$6.get = (options) => ({
  url: create$6.url(options),
  method: "get"
});
create$6.head = (options) => ({
  url: create$6.url(options),
  method: "head"
});
const createForm$6 = (options) => ({
  action: create$6.url(options),
  method: "get"
});
createForm$6.get = (options) => ({
  action: create$6.url(options),
  method: "get"
});
createForm$6.head = (options) => ({
  action: create$6.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
create$6.form = createForm$6;
const store$6 = (options) => ({
  url: store$6.url(options),
  method: "post"
});
store$6.definition = {
  methods: ["post"],
  url: "/manage/customers"
};
store$6.url = (options) => {
  return store$6.definition.url + queryParams(options);
};
store$6.post = (options) => ({
  url: store$6.url(options),
  method: "post"
});
const storeForm$6 = (options) => ({
  action: store$6.url(options),
  method: "post"
});
storeForm$6.post = (options) => ({
  action: store$6.url(options),
  method: "post"
});
store$6.form = storeForm$6;
const show$5 = (args, options) => ({
  url: show$5.url(args, options),
  method: "get"
});
show$5.definition = {
  methods: ["get", "head"],
  url: "/manage/customers/{customer}"
};
show$5.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { customer: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { customer: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      customer: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    customer: typeof args.customer === "object" ? args.customer.id : args.customer
  };
  return show$5.definition.url.replace("{customer}", parsedArgs.customer.toString()).replace(/\/+$/, "") + queryParams(options);
};
show$5.get = (args, options) => ({
  url: show$5.url(args, options),
  method: "get"
});
show$5.head = (args, options) => ({
  url: show$5.url(args, options),
  method: "head"
});
const showForm$5 = (args, options) => ({
  action: show$5.url(args, options),
  method: "get"
});
showForm$5.get = (args, options) => ({
  action: show$5.url(args, options),
  method: "get"
});
showForm$5.head = (args, options) => ({
  action: show$5.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
show$5.form = showForm$5;
const edit$7 = (args, options) => ({
  url: edit$7.url(args, options),
  method: "get"
});
edit$7.definition = {
  methods: ["get", "head"],
  url: "/manage/customers/{customer}/edit"
};
edit$7.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { customer: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { customer: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      customer: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    customer: typeof args.customer === "object" ? args.customer.id : args.customer
  };
  return edit$7.definition.url.replace("{customer}", parsedArgs.customer.toString()).replace(/\/+$/, "") + queryParams(options);
};
edit$7.get = (args, options) => ({
  url: edit$7.url(args, options),
  method: "get"
});
edit$7.head = (args, options) => ({
  url: edit$7.url(args, options),
  method: "head"
});
const editForm$7 = (args, options) => ({
  action: edit$7.url(args, options),
  method: "get"
});
editForm$7.get = (args, options) => ({
  action: edit$7.url(args, options),
  method: "get"
});
editForm$7.head = (args, options) => ({
  action: edit$7.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
edit$7.form = editForm$7;
const update$a = (args, options) => ({
  url: update$a.url(args, options),
  method: "put"
});
update$a.definition = {
  methods: ["put", "patch"],
  url: "/manage/customers/{customer}"
};
update$a.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { customer: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { customer: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      customer: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    customer: typeof args.customer === "object" ? args.customer.id : args.customer
  };
  return update$a.definition.url.replace("{customer}", parsedArgs.customer.toString()).replace(/\/+$/, "") + queryParams(options);
};
update$a.put = (args, options) => ({
  url: update$a.url(args, options),
  method: "put"
});
update$a.patch = (args, options) => ({
  url: update$a.url(args, options),
  method: "patch"
});
const updateForm$a = (args, options) => ({
  action: update$a.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
updateForm$a.put = (args, options) => ({
  action: update$a.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
updateForm$a.patch = (args, options) => ({
  action: update$a.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PATCH",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
update$a.form = updateForm$a;
const destroy$9 = (args, options) => ({
  url: destroy$9.url(args, options),
  method: "delete"
});
destroy$9.definition = {
  methods: ["delete"],
  url: "/manage/customers/{customer}"
};
destroy$9.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { customer: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { customer: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      customer: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    customer: typeof args.customer === "object" ? args.customer.id : args.customer
  };
  return destroy$9.definition.url.replace("{customer}", parsedArgs.customer.toString()).replace(/\/+$/, "") + queryParams(options);
};
destroy$9.delete = (args, options) => ({
  url: destroy$9.url(args, options),
  method: "delete"
});
const destroyForm$9 = (args, options) => ({
  action: destroy$9.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
destroyForm$9.delete = (args, options) => ({
  action: destroy$9.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
destroy$9.form = destroyForm$9;
const getCities = (options) => ({
  url: getCities.url(options),
  method: "get"
});
getCities.definition = {
  methods: ["get", "head"],
  url: "/admin/stockists/cities"
};
getCities.url = (options) => {
  return getCities.definition.url + queryParams(options);
};
getCities.get = (options) => ({
  url: getCities.url(options),
  method: "get"
});
getCities.head = (options) => ({
  url: getCities.url(options),
  method: "head"
});
const getCitiesForm = (options) => ({
  action: getCities.url(options),
  method: "get"
});
getCitiesForm.get = (options) => ({
  action: getCities.url(options),
  method: "get"
});
getCitiesForm.head = (options) => ({
  action: getCities.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
getCities.form = getCitiesForm;
const index$h = (options) => ({
  url: index$h.url(options),
  method: "get"
});
index$h.definition = {
  methods: ["get", "head"],
  url: "/admin/stockists"
};
index$h.url = (options) => {
  return index$h.definition.url + queryParams(options);
};
index$h.get = (options) => ({
  url: index$h.url(options),
  method: "get"
});
index$h.head = (options) => ({
  url: index$h.url(options),
  method: "head"
});
const indexForm$h = (options) => ({
  action: index$h.url(options),
  method: "get"
});
indexForm$h.get = (options) => ({
  action: index$h.url(options),
  method: "get"
});
indexForm$h.head = (options) => ({
  action: index$h.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
index$h.form = indexForm$h;
const create$5 = (options) => ({
  url: create$5.url(options),
  method: "get"
});
create$5.definition = {
  methods: ["get", "head"],
  url: "/admin/stockists/create"
};
create$5.url = (options) => {
  return create$5.definition.url + queryParams(options);
};
create$5.get = (options) => ({
  url: create$5.url(options),
  method: "get"
});
create$5.head = (options) => ({
  url: create$5.url(options),
  method: "head"
});
const createForm$5 = (options) => ({
  action: create$5.url(options),
  method: "get"
});
createForm$5.get = (options) => ({
  action: create$5.url(options),
  method: "get"
});
createForm$5.head = (options) => ({
  action: create$5.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
create$5.form = createForm$5;
const store$5 = (options) => ({
  url: store$5.url(options),
  method: "post"
});
store$5.definition = {
  methods: ["post"],
  url: "/admin/stockists"
};
store$5.url = (options) => {
  return store$5.definition.url + queryParams(options);
};
store$5.post = (options) => ({
  url: store$5.url(options),
  method: "post"
});
const storeForm$5 = (options) => ({
  action: store$5.url(options),
  method: "post"
});
storeForm$5.post = (options) => ({
  action: store$5.url(options),
  method: "post"
});
store$5.form = storeForm$5;
const show$4 = (args, options) => ({
  url: show$4.url(args, options),
  method: "get"
});
show$4.definition = {
  methods: ["get", "head"],
  url: "/admin/stockists/{stockist}"
};
show$4.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { stockist: args };
  }
  if (Array.isArray(args)) {
    args = {
      stockist: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    stockist: args.stockist
  };
  return show$4.definition.url.replace("{stockist}", parsedArgs.stockist.toString()).replace(/\/+$/, "") + queryParams(options);
};
show$4.get = (args, options) => ({
  url: show$4.url(args, options),
  method: "get"
});
show$4.head = (args, options) => ({
  url: show$4.url(args, options),
  method: "head"
});
const showForm$4 = (args, options) => ({
  action: show$4.url(args, options),
  method: "get"
});
showForm$4.get = (args, options) => ({
  action: show$4.url(args, options),
  method: "get"
});
showForm$4.head = (args, options) => ({
  action: show$4.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
show$4.form = showForm$4;
const edit$6 = (args, options) => ({
  url: edit$6.url(args, options),
  method: "get"
});
edit$6.definition = {
  methods: ["get", "head"],
  url: "/admin/stockists/{stockist}/edit"
};
edit$6.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { stockist: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { stockist: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      stockist: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    stockist: typeof args.stockist === "object" ? args.stockist.id : args.stockist
  };
  return edit$6.definition.url.replace("{stockist}", parsedArgs.stockist.toString()).replace(/\/+$/, "") + queryParams(options);
};
edit$6.get = (args, options) => ({
  url: edit$6.url(args, options),
  method: "get"
});
edit$6.head = (args, options) => ({
  url: edit$6.url(args, options),
  method: "head"
});
const editForm$6 = (args, options) => ({
  action: edit$6.url(args, options),
  method: "get"
});
editForm$6.get = (args, options) => ({
  action: edit$6.url(args, options),
  method: "get"
});
editForm$6.head = (args, options) => ({
  action: edit$6.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
edit$6.form = editForm$6;
const update$9 = (args, options) => ({
  url: update$9.url(args, options),
  method: "put"
});
update$9.definition = {
  methods: ["put", "patch"],
  url: "/admin/stockists/{stockist}"
};
update$9.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { stockist: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { stockist: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      stockist: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    stockist: typeof args.stockist === "object" ? args.stockist.id : args.stockist
  };
  return update$9.definition.url.replace("{stockist}", parsedArgs.stockist.toString()).replace(/\/+$/, "") + queryParams(options);
};
update$9.put = (args, options) => ({
  url: update$9.url(args, options),
  method: "put"
});
update$9.patch = (args, options) => ({
  url: update$9.url(args, options),
  method: "patch"
});
const updateForm$9 = (args, options) => ({
  action: update$9.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
updateForm$9.put = (args, options) => ({
  action: update$9.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
updateForm$9.patch = (args, options) => ({
  action: update$9.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PATCH",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
update$9.form = updateForm$9;
const destroy$8 = (args, options) => ({
  url: destroy$8.url(args, options),
  method: "delete"
});
destroy$8.definition = {
  methods: ["delete"],
  url: "/admin/stockists/{stockist}"
};
destroy$8.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { stockist: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { stockist: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      stockist: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    stockist: typeof args.stockist === "object" ? args.stockist.id : args.stockist
  };
  return destroy$8.definition.url.replace("{stockist}", parsedArgs.stockist.toString()).replace(/\/+$/, "") + queryParams(options);
};
destroy$8.delete = (args, options) => ({
  url: destroy$8.url(args, options),
  method: "delete"
});
const destroyForm$8 = (args, options) => ({
  action: destroy$8.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
destroyForm$8.delete = (args, options) => ({
  action: destroy$8.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
destroy$8.form = destroyForm$8;
const index$g = (options) => ({
  url: index$g.url(options),
  method: "get"
});
index$g.definition = {
  methods: ["get", "head"],
  url: "/admin/products"
};
index$g.url = (options) => {
  return index$g.definition.url + queryParams(options);
};
index$g.get = (options) => ({
  url: index$g.url(options),
  method: "get"
});
index$g.head = (options) => ({
  url: index$g.url(options),
  method: "head"
});
const indexForm$g = (options) => ({
  action: index$g.url(options),
  method: "get"
});
indexForm$g.get = (options) => ({
  action: index$g.url(options),
  method: "get"
});
indexForm$g.head = (options) => ({
  action: index$g.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
index$g.form = indexForm$g;
const create$4 = (options) => ({
  url: create$4.url(options),
  method: "get"
});
create$4.definition = {
  methods: ["get", "head"],
  url: "/admin/products/create"
};
create$4.url = (options) => {
  return create$4.definition.url + queryParams(options);
};
create$4.get = (options) => ({
  url: create$4.url(options),
  method: "get"
});
create$4.head = (options) => ({
  url: create$4.url(options),
  method: "head"
});
const createForm$4 = (options) => ({
  action: create$4.url(options),
  method: "get"
});
createForm$4.get = (options) => ({
  action: create$4.url(options),
  method: "get"
});
createForm$4.head = (options) => ({
  action: create$4.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
create$4.form = createForm$4;
const store$4 = (options) => ({
  url: store$4.url(options),
  method: "post"
});
store$4.definition = {
  methods: ["post"],
  url: "/admin/products"
};
store$4.url = (options) => {
  return store$4.definition.url + queryParams(options);
};
store$4.post = (options) => ({
  url: store$4.url(options),
  method: "post"
});
const storeForm$4 = (options) => ({
  action: store$4.url(options),
  method: "post"
});
storeForm$4.post = (options) => ({
  action: store$4.url(options),
  method: "post"
});
store$4.form = storeForm$4;
const show$3 = (args, options) => ({
  url: show$3.url(args, options),
  method: "get"
});
show$3.definition = {
  methods: ["get", "head"],
  url: "/admin/products/{product}"
};
show$3.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { product: args };
  }
  if (Array.isArray(args)) {
    args = {
      product: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    product: args.product
  };
  return show$3.definition.url.replace("{product}", parsedArgs.product.toString()).replace(/\/+$/, "") + queryParams(options);
};
show$3.get = (args, options) => ({
  url: show$3.url(args, options),
  method: "get"
});
show$3.head = (args, options) => ({
  url: show$3.url(args, options),
  method: "head"
});
const showForm$3 = (args, options) => ({
  action: show$3.url(args, options),
  method: "get"
});
showForm$3.get = (args, options) => ({
  action: show$3.url(args, options),
  method: "get"
});
showForm$3.head = (args, options) => ({
  action: show$3.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
show$3.form = showForm$3;
const edit$5 = (args, options) => ({
  url: edit$5.url(args, options),
  method: "get"
});
edit$5.definition = {
  methods: ["get", "head"],
  url: "/admin/products/{product}/edit"
};
edit$5.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { product: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { product: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      product: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    product: typeof args.product === "object" ? args.product.id : args.product
  };
  return edit$5.definition.url.replace("{product}", parsedArgs.product.toString()).replace(/\/+$/, "") + queryParams(options);
};
edit$5.get = (args, options) => ({
  url: edit$5.url(args, options),
  method: "get"
});
edit$5.head = (args, options) => ({
  url: edit$5.url(args, options),
  method: "head"
});
const editForm$5 = (args, options) => ({
  action: edit$5.url(args, options),
  method: "get"
});
editForm$5.get = (args, options) => ({
  action: edit$5.url(args, options),
  method: "get"
});
editForm$5.head = (args, options) => ({
  action: edit$5.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
edit$5.form = editForm$5;
const update$8 = (args, options) => ({
  url: update$8.url(args, options),
  method: "put"
});
update$8.definition = {
  methods: ["put", "patch"],
  url: "/admin/products/{product}"
};
update$8.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { product: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { product: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      product: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    product: typeof args.product === "object" ? args.product.id : args.product
  };
  return update$8.definition.url.replace("{product}", parsedArgs.product.toString()).replace(/\/+$/, "") + queryParams(options);
};
update$8.put = (args, options) => ({
  url: update$8.url(args, options),
  method: "put"
});
update$8.patch = (args, options) => ({
  url: update$8.url(args, options),
  method: "patch"
});
const updateForm$8 = (args, options) => ({
  action: update$8.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
updateForm$8.put = (args, options) => ({
  action: update$8.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
updateForm$8.patch = (args, options) => ({
  action: update$8.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PATCH",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
update$8.form = updateForm$8;
const destroy$7 = (args, options) => ({
  url: destroy$7.url(args, options),
  method: "delete"
});
destroy$7.definition = {
  methods: ["delete"],
  url: "/admin/products/{product}"
};
destroy$7.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { product: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { product: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      product: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    product: typeof args.product === "object" ? args.product.id : args.product
  };
  return destroy$7.definition.url.replace("{product}", parsedArgs.product.toString()).replace(/\/+$/, "") + queryParams(options);
};
destroy$7.delete = (args, options) => ({
  url: destroy$7.url(args, options),
  method: "delete"
});
const destroyForm$7 = (args, options) => ({
  action: destroy$7.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
destroyForm$7.delete = (args, options) => ({
  action: destroy$7.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
destroy$7.form = destroyForm$7;
const deleteImage = (args, options) => ({
  url: deleteImage.url(args, options),
  method: "delete"
});
deleteImage.definition = {
  methods: ["delete"],
  url: "/admin/products/{media}/image"
};
deleteImage.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { media: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { media: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      media: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    media: typeof args.media === "object" ? args.media.id : args.media
  };
  return deleteImage.definition.url.replace("{media}", parsedArgs.media.toString()).replace(/\/+$/, "") + queryParams(options);
};
deleteImage.delete = (args, options) => ({
  url: deleteImage.url(args, options),
  method: "delete"
});
const deleteImageForm = (args, options) => ({
  action: deleteImage.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
deleteImageForm.delete = (args, options) => ({
  action: deleteImage.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
deleteImage.form = deleteImageForm;
const setPrimaryImage = (args, options) => ({
  url: setPrimaryImage.url(args, options),
  method: "post"
});
setPrimaryImage.definition = {
  methods: ["post"],
  url: "/admin/products/{product}/image/primary"
};
setPrimaryImage.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { product: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { product: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      product: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    product: typeof args.product === "object" ? args.product.id : args.product
  };
  return setPrimaryImage.definition.url.replace("{product}", parsedArgs.product.toString()).replace(/\/+$/, "") + queryParams(options);
};
setPrimaryImage.post = (args, options) => ({
  url: setPrimaryImage.url(args, options),
  method: "post"
});
const setPrimaryImageForm = (args, options) => ({
  action: setPrimaryImage.url(args, options),
  method: "post"
});
setPrimaryImageForm.post = (args, options) => ({
  action: setPrimaryImage.url(args, options),
  method: "post"
});
setPrimaryImage.form = setPrimaryImageForm;
const reorderImages = (args, options) => ({
  url: reorderImages.url(args, options),
  method: "post"
});
reorderImages.definition = {
  methods: ["post"],
  url: "/admin/products/{product}/images/reorder"
};
reorderImages.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { product: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { product: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      product: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    product: typeof args.product === "object" ? args.product.id : args.product
  };
  return reorderImages.definition.url.replace("{product}", parsedArgs.product.toString()).replace(/\/+$/, "") + queryParams(options);
};
reorderImages.post = (args, options) => ({
  url: reorderImages.url(args, options),
  method: "post"
});
const reorderImagesForm = (args, options) => ({
  action: reorderImages.url(args, options),
  method: "post"
});
reorderImagesForm.post = (args, options) => ({
  action: reorderImages.url(args, options),
  method: "post"
});
reorderImages.form = reorderImagesForm;
const index$f = (options) => ({
  url: index$f.url(options),
  method: "get"
});
index$f.definition = {
  methods: ["get", "head"],
  url: "/admin/categories"
};
index$f.url = (options) => {
  return index$f.definition.url + queryParams(options);
};
index$f.get = (options) => ({
  url: index$f.url(options),
  method: "get"
});
index$f.head = (options) => ({
  url: index$f.url(options),
  method: "head"
});
const indexForm$f = (options) => ({
  action: index$f.url(options),
  method: "get"
});
indexForm$f.get = (options) => ({
  action: index$f.url(options),
  method: "get"
});
indexForm$f.head = (options) => ({
  action: index$f.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
index$f.form = indexForm$f;
const create$3 = (options) => ({
  url: create$3.url(options),
  method: "get"
});
create$3.definition = {
  methods: ["get", "head"],
  url: "/admin/categories/create"
};
create$3.url = (options) => {
  return create$3.definition.url + queryParams(options);
};
create$3.get = (options) => ({
  url: create$3.url(options),
  method: "get"
});
create$3.head = (options) => ({
  url: create$3.url(options),
  method: "head"
});
const createForm$3 = (options) => ({
  action: create$3.url(options),
  method: "get"
});
createForm$3.get = (options) => ({
  action: create$3.url(options),
  method: "get"
});
createForm$3.head = (options) => ({
  action: create$3.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
create$3.form = createForm$3;
const store$3 = (options) => ({
  url: store$3.url(options),
  method: "post"
});
store$3.definition = {
  methods: ["post"],
  url: "/admin/categories"
};
store$3.url = (options) => {
  return store$3.definition.url + queryParams(options);
};
store$3.post = (options) => ({
  url: store$3.url(options),
  method: "post"
});
const storeForm$3 = (options) => ({
  action: store$3.url(options),
  method: "post"
});
storeForm$3.post = (options) => ({
  action: store$3.url(options),
  method: "post"
});
store$3.form = storeForm$3;
const show$2 = (args, options) => ({
  url: show$2.url(args, options),
  method: "get"
});
show$2.definition = {
  methods: ["get", "head"],
  url: "/admin/categories/{category}"
};
show$2.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { category: args };
  }
  if (Array.isArray(args)) {
    args = {
      category: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    category: args.category
  };
  return show$2.definition.url.replace("{category}", parsedArgs.category.toString()).replace(/\/+$/, "") + queryParams(options);
};
show$2.get = (args, options) => ({
  url: show$2.url(args, options),
  method: "get"
});
show$2.head = (args, options) => ({
  url: show$2.url(args, options),
  method: "head"
});
const showForm$2 = (args, options) => ({
  action: show$2.url(args, options),
  method: "get"
});
showForm$2.get = (args, options) => ({
  action: show$2.url(args, options),
  method: "get"
});
showForm$2.head = (args, options) => ({
  action: show$2.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
show$2.form = showForm$2;
const edit$4 = (args, options) => ({
  url: edit$4.url(args, options),
  method: "get"
});
edit$4.definition = {
  methods: ["get", "head"],
  url: "/admin/categories/{category}/edit"
};
edit$4.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { category: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { category: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      category: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    category: typeof args.category === "object" ? args.category.id : args.category
  };
  return edit$4.definition.url.replace("{category}", parsedArgs.category.toString()).replace(/\/+$/, "") + queryParams(options);
};
edit$4.get = (args, options) => ({
  url: edit$4.url(args, options),
  method: "get"
});
edit$4.head = (args, options) => ({
  url: edit$4.url(args, options),
  method: "head"
});
const editForm$4 = (args, options) => ({
  action: edit$4.url(args, options),
  method: "get"
});
editForm$4.get = (args, options) => ({
  action: edit$4.url(args, options),
  method: "get"
});
editForm$4.head = (args, options) => ({
  action: edit$4.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
edit$4.form = editForm$4;
const update$7 = (args, options) => ({
  url: update$7.url(args, options),
  method: "put"
});
update$7.definition = {
  methods: ["put", "patch"],
  url: "/admin/categories/{category}"
};
update$7.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { category: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { category: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      category: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    category: typeof args.category === "object" ? args.category.id : args.category
  };
  return update$7.definition.url.replace("{category}", parsedArgs.category.toString()).replace(/\/+$/, "") + queryParams(options);
};
update$7.put = (args, options) => ({
  url: update$7.url(args, options),
  method: "put"
});
update$7.patch = (args, options) => ({
  url: update$7.url(args, options),
  method: "patch"
});
const updateForm$7 = (args, options) => ({
  action: update$7.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
updateForm$7.put = (args, options) => ({
  action: update$7.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
updateForm$7.patch = (args, options) => ({
  action: update$7.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PATCH",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
update$7.form = updateForm$7;
const destroy$6 = (args, options) => ({
  url: destroy$6.url(args, options),
  method: "delete"
});
destroy$6.definition = {
  methods: ["delete"],
  url: "/admin/categories/{category}"
};
destroy$6.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { category: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { category: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      category: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    category: typeof args.category === "object" ? args.category.id : args.category
  };
  return destroy$6.definition.url.replace("{category}", parsedArgs.category.toString()).replace(/\/+$/, "") + queryParams(options);
};
destroy$6.delete = (args, options) => ({
  url: destroy$6.url(args, options),
  method: "delete"
});
const destroyForm$6 = (args, options) => ({
  action: destroy$6.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
destroyForm$6.delete = (args, options) => ({
  action: destroy$6.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
destroy$6.form = destroyForm$6;
const index$e = (options) => ({
  url: index$e.url(options),
  method: "get"
});
index$e.definition = {
  methods: ["get", "head"],
  url: "/admin/articles"
};
index$e.url = (options) => {
  return index$e.definition.url + queryParams(options);
};
index$e.get = (options) => ({
  url: index$e.url(options),
  method: "get"
});
index$e.head = (options) => ({
  url: index$e.url(options),
  method: "head"
});
const indexForm$e = (options) => ({
  action: index$e.url(options),
  method: "get"
});
indexForm$e.get = (options) => ({
  action: index$e.url(options),
  method: "get"
});
indexForm$e.head = (options) => ({
  action: index$e.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
index$e.form = indexForm$e;
const create$2 = (options) => ({
  url: create$2.url(options),
  method: "get"
});
create$2.definition = {
  methods: ["get", "head"],
  url: "/admin/articles/create"
};
create$2.url = (options) => {
  return create$2.definition.url + queryParams(options);
};
create$2.get = (options) => ({
  url: create$2.url(options),
  method: "get"
});
create$2.head = (options) => ({
  url: create$2.url(options),
  method: "head"
});
const createForm$2 = (options) => ({
  action: create$2.url(options),
  method: "get"
});
createForm$2.get = (options) => ({
  action: create$2.url(options),
  method: "get"
});
createForm$2.head = (options) => ({
  action: create$2.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
create$2.form = createForm$2;
const store$2 = (options) => ({
  url: store$2.url(options),
  method: "post"
});
store$2.definition = {
  methods: ["post"],
  url: "/admin/articles"
};
store$2.url = (options) => {
  return store$2.definition.url + queryParams(options);
};
store$2.post = (options) => ({
  url: store$2.url(options),
  method: "post"
});
const storeForm$2 = (options) => ({
  action: store$2.url(options),
  method: "post"
});
storeForm$2.post = (options) => ({
  action: store$2.url(options),
  method: "post"
});
store$2.form = storeForm$2;
const edit$3 = (args, options) => ({
  url: edit$3.url(args, options),
  method: "get"
});
edit$3.definition = {
  methods: ["get", "head"],
  url: "/admin/articles/{article}/edit"
};
edit$3.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { article: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { article: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      article: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    article: typeof args.article === "object" ? args.article.id : args.article
  };
  return edit$3.definition.url.replace("{article}", parsedArgs.article.toString()).replace(/\/+$/, "") + queryParams(options);
};
edit$3.get = (args, options) => ({
  url: edit$3.url(args, options),
  method: "get"
});
edit$3.head = (args, options) => ({
  url: edit$3.url(args, options),
  method: "head"
});
const editForm$3 = (args, options) => ({
  action: edit$3.url(args, options),
  method: "get"
});
editForm$3.get = (args, options) => ({
  action: edit$3.url(args, options),
  method: "get"
});
editForm$3.head = (args, options) => ({
  action: edit$3.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
edit$3.form = editForm$3;
const update$6 = (args, options) => ({
  url: update$6.url(args, options),
  method: "put"
});
update$6.definition = {
  methods: ["put", "patch"],
  url: "/admin/articles/{article}"
};
update$6.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { article: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { article: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      article: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    article: typeof args.article === "object" ? args.article.id : args.article
  };
  return update$6.definition.url.replace("{article}", parsedArgs.article.toString()).replace(/\/+$/, "") + queryParams(options);
};
update$6.put = (args, options) => ({
  url: update$6.url(args, options),
  method: "put"
});
update$6.patch = (args, options) => ({
  url: update$6.url(args, options),
  method: "patch"
});
const updateForm$6 = (args, options) => ({
  action: update$6.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
updateForm$6.put = (args, options) => ({
  action: update$6.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
updateForm$6.patch = (args, options) => ({
  action: update$6.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PATCH",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
update$6.form = updateForm$6;
const destroy$5 = (args, options) => ({
  url: destroy$5.url(args, options),
  method: "delete"
});
destroy$5.definition = {
  methods: ["delete"],
  url: "/admin/articles/{article}"
};
destroy$5.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { article: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { article: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      article: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    article: typeof args.article === "object" ? args.article.id : args.article
  };
  return destroy$5.definition.url.replace("{article}", parsedArgs.article.toString()).replace(/\/+$/, "") + queryParams(options);
};
destroy$5.delete = (args, options) => ({
  url: destroy$5.url(args, options),
  method: "delete"
});
const destroyForm$5 = (args, options) => ({
  action: destroy$5.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
destroyForm$5.delete = (args, options) => ({
  action: destroy$5.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
destroy$5.form = destroyForm$5;
const index$d = (options) => ({
  url: index$d.url(options),
  method: "get"
});
index$d.definition = {
  methods: ["get", "head"],
  url: "/admin/pages"
};
index$d.url = (options) => {
  return index$d.definition.url + queryParams(options);
};
index$d.get = (options) => ({
  url: index$d.url(options),
  method: "get"
});
index$d.head = (options) => ({
  url: index$d.url(options),
  method: "head"
});
const indexForm$d = (options) => ({
  action: index$d.url(options),
  method: "get"
});
indexForm$d.get = (options) => ({
  action: index$d.url(options),
  method: "get"
});
indexForm$d.head = (options) => ({
  action: index$d.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
index$d.form = indexForm$d;
const create$1 = (options) => ({
  url: create$1.url(options),
  method: "get"
});
create$1.definition = {
  methods: ["get", "head"],
  url: "/admin/pages/create"
};
create$1.url = (options) => {
  return create$1.definition.url + queryParams(options);
};
create$1.get = (options) => ({
  url: create$1.url(options),
  method: "get"
});
create$1.head = (options) => ({
  url: create$1.url(options),
  method: "head"
});
const createForm$1 = (options) => ({
  action: create$1.url(options),
  method: "get"
});
createForm$1.get = (options) => ({
  action: create$1.url(options),
  method: "get"
});
createForm$1.head = (options) => ({
  action: create$1.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
create$1.form = createForm$1;
const store$1 = (options) => ({
  url: store$1.url(options),
  method: "post"
});
store$1.definition = {
  methods: ["post"],
  url: "/admin/pages"
};
store$1.url = (options) => {
  return store$1.definition.url + queryParams(options);
};
store$1.post = (options) => ({
  url: store$1.url(options),
  method: "post"
});
const storeForm$1 = (options) => ({
  action: store$1.url(options),
  method: "post"
});
storeForm$1.post = (options) => ({
  action: store$1.url(options),
  method: "post"
});
store$1.form = storeForm$1;
const show$1 = (args, options) => ({
  url: show$1.url(args, options),
  method: "get"
});
show$1.definition = {
  methods: ["get", "head"],
  url: "/admin/pages/{page}"
};
show$1.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { page: args };
  }
  if (Array.isArray(args)) {
    args = {
      page: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    page: args.page
  };
  return show$1.definition.url.replace("{page}", parsedArgs.page.toString()).replace(/\/+$/, "") + queryParams(options);
};
show$1.get = (args, options) => ({
  url: show$1.url(args, options),
  method: "get"
});
show$1.head = (args, options) => ({
  url: show$1.url(args, options),
  method: "head"
});
const showForm$1 = (args, options) => ({
  action: show$1.url(args, options),
  method: "get"
});
showForm$1.get = (args, options) => ({
  action: show$1.url(args, options),
  method: "get"
});
showForm$1.head = (args, options) => ({
  action: show$1.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
show$1.form = showForm$1;
const edit$2 = (args, options) => ({
  url: edit$2.url(args, options),
  method: "get"
});
edit$2.definition = {
  methods: ["get", "head"],
  url: "/admin/pages/{page}/edit"
};
edit$2.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { page: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { page: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      page: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    page: typeof args.page === "object" ? args.page.id : args.page
  };
  return edit$2.definition.url.replace("{page}", parsedArgs.page.toString()).replace(/\/+$/, "") + queryParams(options);
};
edit$2.get = (args, options) => ({
  url: edit$2.url(args, options),
  method: "get"
});
edit$2.head = (args, options) => ({
  url: edit$2.url(args, options),
  method: "head"
});
const editForm$2 = (args, options) => ({
  action: edit$2.url(args, options),
  method: "get"
});
editForm$2.get = (args, options) => ({
  action: edit$2.url(args, options),
  method: "get"
});
editForm$2.head = (args, options) => ({
  action: edit$2.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
edit$2.form = editForm$2;
const update$5 = (args, options) => ({
  url: update$5.url(args, options),
  method: "put"
});
update$5.definition = {
  methods: ["put", "patch"],
  url: "/admin/pages/{page}"
};
update$5.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { page: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { page: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      page: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    page: typeof args.page === "object" ? args.page.id : args.page
  };
  return update$5.definition.url.replace("{page}", parsedArgs.page.toString()).replace(/\/+$/, "") + queryParams(options);
};
update$5.put = (args, options) => ({
  url: update$5.url(args, options),
  method: "put"
});
update$5.patch = (args, options) => ({
  url: update$5.url(args, options),
  method: "patch"
});
const updateForm$5 = (args, options) => ({
  action: update$5.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
updateForm$5.put = (args, options) => ({
  action: update$5.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
updateForm$5.patch = (args, options) => ({
  action: update$5.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PATCH",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
update$5.form = updateForm$5;
const destroy$4 = (args, options) => ({
  url: destroy$4.url(args, options),
  method: "delete"
});
destroy$4.definition = {
  methods: ["delete"],
  url: "/admin/pages/{page}"
};
destroy$4.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { page: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { page: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      page: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    page: typeof args.page === "object" ? args.page.id : args.page
  };
  return destroy$4.definition.url.replace("{page}", parsedArgs.page.toString()).replace(/\/+$/, "") + queryParams(options);
};
destroy$4.delete = (args, options) => ({
  url: destroy$4.url(args, options),
  method: "delete"
});
const destroyForm$4 = (args, options) => ({
  action: destroy$4.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
destroyForm$4.delete = (args, options) => ({
  action: destroy$4.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
destroy$4.form = destroyForm$4;
const index$c = (options) => ({
  url: index$c.url(options),
  method: "get"
});
index$c.definition = {
  methods: ["get", "head"],
  url: "/admin/reviews"
};
index$c.url = (options) => {
  return index$c.definition.url + queryParams(options);
};
index$c.get = (options) => ({
  url: index$c.url(options),
  method: "get"
});
index$c.head = (options) => ({
  url: index$c.url(options),
  method: "head"
});
const indexForm$c = (options) => ({
  action: index$c.url(options),
  method: "get"
});
indexForm$c.get = (options) => ({
  action: index$c.url(options),
  method: "get"
});
indexForm$c.head = (options) => ({
  action: index$c.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
index$c.form = indexForm$c;
const approve$2 = (args, options) => ({
  url: approve$2.url(args, options),
  method: "post"
});
approve$2.definition = {
  methods: ["post"],
  url: "/admin/reviews/{review}/approve"
};
approve$2.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { review: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { review: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      review: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    review: typeof args.review === "object" ? args.review.id : args.review
  };
  return approve$2.definition.url.replace("{review}", parsedArgs.review.toString()).replace(/\/+$/, "") + queryParams(options);
};
approve$2.post = (args, options) => ({
  url: approve$2.url(args, options),
  method: "post"
});
const approveForm$2 = (args, options) => ({
  action: approve$2.url(args, options),
  method: "post"
});
approveForm$2.post = (args, options) => ({
  action: approve$2.url(args, options),
  method: "post"
});
approve$2.form = approveForm$2;
const reject$2 = (args, options) => ({
  url: reject$2.url(args, options),
  method: "post"
});
reject$2.definition = {
  methods: ["post"],
  url: "/admin/reviews/{review}/reject"
};
reject$2.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { review: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { review: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      review: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    review: typeof args.review === "object" ? args.review.id : args.review
  };
  return reject$2.definition.url.replace("{review}", parsedArgs.review.toString()).replace(/\/+$/, "") + queryParams(options);
};
reject$2.post = (args, options) => ({
  url: reject$2.url(args, options),
  method: "post"
});
const rejectForm$2 = (args, options) => ({
  action: reject$2.url(args, options),
  method: "post"
});
rejectForm$2.post = (args, options) => ({
  action: reject$2.url(args, options),
  method: "post"
});
reject$2.form = rejectForm$2;
const destroy$3 = (args, options) => ({
  url: destroy$3.url(args, options),
  method: "delete"
});
destroy$3.definition = {
  methods: ["delete"],
  url: "/admin/reviews/{review}"
};
destroy$3.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { review: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { review: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      review: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    review: typeof args.review === "object" ? args.review.id : args.review
  };
  return destroy$3.definition.url.replace("{review}", parsedArgs.review.toString()).replace(/\/+$/, "") + queryParams(options);
};
destroy$3.delete = (args, options) => ({
  url: destroy$3.url(args, options),
  method: "delete"
});
const destroyForm$3 = (args, options) => ({
  action: destroy$3.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
destroyForm$3.delete = (args, options) => ({
  action: destroy$3.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
destroy$3.form = destroyForm$3;
const index$b = (options) => ({
  url: index$b.url(options),
  method: "get"
});
index$b.definition = {
  methods: ["get", "head"],
  url: "/admin/promotions"
};
index$b.url = (options) => {
  return index$b.definition.url + queryParams(options);
};
index$b.get = (options) => ({
  url: index$b.url(options),
  method: "get"
});
index$b.head = (options) => ({
  url: index$b.url(options),
  method: "head"
});
const indexForm$b = (options) => ({
  action: index$b.url(options),
  method: "get"
});
indexForm$b.get = (options) => ({
  action: index$b.url(options),
  method: "get"
});
indexForm$b.head = (options) => ({
  action: index$b.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
index$b.form = indexForm$b;
const create = (options) => ({
  url: create.url(options),
  method: "get"
});
create.definition = {
  methods: ["get", "head"],
  url: "/admin/promotions/create"
};
create.url = (options) => {
  return create.definition.url + queryParams(options);
};
create.get = (options) => ({
  url: create.url(options),
  method: "get"
});
create.head = (options) => ({
  url: create.url(options),
  method: "head"
});
const createForm = (options) => ({
  action: create.url(options),
  method: "get"
});
createForm.get = (options) => ({
  action: create.url(options),
  method: "get"
});
createForm.head = (options) => ({
  action: create.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
create.form = createForm;
const store = (options) => ({
  url: store.url(options),
  method: "post"
});
store.definition = {
  methods: ["post"],
  url: "/admin/promotions"
};
store.url = (options) => {
  return store.definition.url + queryParams(options);
};
store.post = (options) => ({
  url: store.url(options),
  method: "post"
});
const storeForm = (options) => ({
  action: store.url(options),
  method: "post"
});
storeForm.post = (options) => ({
  action: store.url(options),
  method: "post"
});
store.form = storeForm;
const show = (args, options) => ({
  url: show.url(args, options),
  method: "get"
});
show.definition = {
  methods: ["get", "head"],
  url: "/admin/promotions/{promotion}"
};
show.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { promotion: args };
  }
  if (Array.isArray(args)) {
    args = {
      promotion: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    promotion: args.promotion
  };
  return show.definition.url.replace("{promotion}", parsedArgs.promotion.toString()).replace(/\/+$/, "") + queryParams(options);
};
show.get = (args, options) => ({
  url: show.url(args, options),
  method: "get"
});
show.head = (args, options) => ({
  url: show.url(args, options),
  method: "head"
});
const showForm = (args, options) => ({
  action: show.url(args, options),
  method: "get"
});
showForm.get = (args, options) => ({
  action: show.url(args, options),
  method: "get"
});
showForm.head = (args, options) => ({
  action: show.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
show.form = showForm;
const edit$1 = (args, options) => ({
  url: edit$1.url(args, options),
  method: "get"
});
edit$1.definition = {
  methods: ["get", "head"],
  url: "/admin/promotions/{promotion}/edit"
};
edit$1.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { promotion: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { promotion: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      promotion: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    promotion: typeof args.promotion === "object" ? args.promotion.id : args.promotion
  };
  return edit$1.definition.url.replace("{promotion}", parsedArgs.promotion.toString()).replace(/\/+$/, "") + queryParams(options);
};
edit$1.get = (args, options) => ({
  url: edit$1.url(args, options),
  method: "get"
});
edit$1.head = (args, options) => ({
  url: edit$1.url(args, options),
  method: "head"
});
const editForm$1 = (args, options) => ({
  action: edit$1.url(args, options),
  method: "get"
});
editForm$1.get = (args, options) => ({
  action: edit$1.url(args, options),
  method: "get"
});
editForm$1.head = (args, options) => ({
  action: edit$1.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
edit$1.form = editForm$1;
const update$4 = (args, options) => ({
  url: update$4.url(args, options),
  method: "put"
});
update$4.definition = {
  methods: ["put", "patch"],
  url: "/admin/promotions/{promotion}"
};
update$4.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { promotion: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { promotion: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      promotion: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    promotion: typeof args.promotion === "object" ? args.promotion.id : args.promotion
  };
  return update$4.definition.url.replace("{promotion}", parsedArgs.promotion.toString()).replace(/\/+$/, "") + queryParams(options);
};
update$4.put = (args, options) => ({
  url: update$4.url(args, options),
  method: "put"
});
update$4.patch = (args, options) => ({
  url: update$4.url(args, options),
  method: "patch"
});
const updateForm$4 = (args, options) => ({
  action: update$4.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
updateForm$4.put = (args, options) => ({
  action: update$4.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
updateForm$4.patch = (args, options) => ({
  action: update$4.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PATCH",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
update$4.form = updateForm$4;
const destroy$2 = (args, options) => ({
  url: destroy$2.url(args, options),
  method: "delete"
});
destroy$2.definition = {
  methods: ["delete"],
  url: "/admin/promotions/{promotion}"
};
destroy$2.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { promotion: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { promotion: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      promotion: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    promotion: typeof args.promotion === "object" ? args.promotion.id : args.promotion
  };
  return destroy$2.definition.url.replace("{promotion}", parsedArgs.promotion.toString()).replace(/\/+$/, "") + queryParams(options);
};
destroy$2.delete = (args, options) => ({
  url: destroy$2.url(args, options),
  method: "delete"
});
const destroyForm$2 = (args, options) => ({
  action: destroy$2.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
destroyForm$2.delete = (args, options) => ({
  action: destroy$2.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
destroy$2.form = destroyForm$2;
const index$a = (options) => ({
  url: index$a.url(options),
  method: "get"
});
index$a.definition = {
  methods: ["get", "head"],
  url: "/admin/shipments"
};
index$a.url = (options) => {
  return index$a.definition.url + queryParams(options);
};
index$a.get = (options) => ({
  url: index$a.url(options),
  method: "get"
});
index$a.head = (options) => ({
  url: index$a.url(options),
  method: "head"
});
const indexForm$a = (options) => ({
  action: index$a.url(options),
  method: "get"
});
indexForm$a.get = (options) => ({
  action: index$a.url(options),
  method: "get"
});
indexForm$a.head = (options) => ({
  action: index$a.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
index$a.form = indexForm$a;
const update$3 = (args, options) => ({
  url: update$3.url(args, options),
  method: "put"
});
update$3.definition = {
  methods: ["put"],
  url: "/admin/shipments/{shipment}"
};
update$3.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { shipment: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { shipment: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      shipment: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    shipment: typeof args.shipment === "object" ? args.shipment.id : args.shipment
  };
  return update$3.definition.url.replace("{shipment}", parsedArgs.shipment.toString()).replace(/\/+$/, "") + queryParams(options);
};
update$3.put = (args, options) => ({
  url: update$3.url(args, options),
  method: "put"
});
const updateForm$3 = (args, options) => ({
  action: update$3.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
updateForm$3.put = (args, options) => ({
  action: update$3.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
update$3.form = updateForm$3;
const indexReturns = (options) => ({
  url: indexReturns.url(options),
  method: "get"
});
indexReturns.definition = {
  methods: ["get", "head"],
  url: "/admin/returns"
};
indexReturns.url = (options) => {
  return indexReturns.definition.url + queryParams(options);
};
indexReturns.get = (options) => ({
  url: indexReturns.url(options),
  method: "get"
});
indexReturns.head = (options) => ({
  url: indexReturns.url(options),
  method: "head"
});
const indexReturnsForm = (options) => ({
  action: indexReturns.url(options),
  method: "get"
});
indexReturnsForm.get = (options) => ({
  action: indexReturns.url(options),
  method: "get"
});
indexReturnsForm.head = (options) => ({
  action: indexReturns.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
indexReturns.form = indexReturnsForm;
const approveReturn = (args, options) => ({
  url: approveReturn.url(args, options),
  method: "post"
});
approveReturn.definition = {
  methods: ["post"],
  url: "/admin/returns/{return}/approve"
};
approveReturn.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { return: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { return: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      return: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    return: typeof args.return === "object" ? args.return.id : args.return
  };
  return approveReturn.definition.url.replace("{return}", parsedArgs.return.toString()).replace(/\/+$/, "") + queryParams(options);
};
approveReturn.post = (args, options) => ({
  url: approveReturn.url(args, options),
  method: "post"
});
const approveReturnForm = (args, options) => ({
  action: approveReturn.url(args, options),
  method: "post"
});
approveReturnForm.post = (args, options) => ({
  action: approveReturn.url(args, options),
  method: "post"
});
approveReturn.form = approveReturnForm;
const rejectReturn = (args, options) => ({
  url: rejectReturn.url(args, options),
  method: "post"
});
rejectReturn.definition = {
  methods: ["post"],
  url: "/admin/returns/{return}/reject"
};
rejectReturn.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { return: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { return: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      return: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    return: typeof args.return === "object" ? args.return.id : args.return
  };
  return rejectReturn.definition.url.replace("{return}", parsedArgs.return.toString()).replace(/\/+$/, "") + queryParams(options);
};
rejectReturn.post = (args, options) => ({
  url: rejectReturn.url(args, options),
  method: "post"
});
const rejectReturnForm = (args, options) => ({
  action: rejectReturn.url(args, options),
  method: "post"
});
rejectReturnForm.post = (args, options) => ({
  action: rejectReturn.url(args, options),
  method: "post"
});
rejectReturn.form = rejectReturnForm;
const indexRefunds = (options) => ({
  url: indexRefunds.url(options),
  method: "get"
});
indexRefunds.definition = {
  methods: ["get", "head"],
  url: "/admin/refunds"
};
indexRefunds.url = (options) => {
  return indexRefunds.definition.url + queryParams(options);
};
indexRefunds.get = (options) => ({
  url: indexRefunds.url(options),
  method: "get"
});
indexRefunds.head = (options) => ({
  url: indexRefunds.url(options),
  method: "head"
});
const indexRefundsForm = (options) => ({
  action: indexRefunds.url(options),
  method: "get"
});
indexRefundsForm.get = (options) => ({
  action: indexRefunds.url(options),
  method: "get"
});
indexRefundsForm.head = (options) => ({
  action: indexRefunds.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
indexRefunds.form = indexRefundsForm;
const processRefund = (args, options) => ({
  url: processRefund.url(args, options),
  method: "post"
});
processRefund.definition = {
  methods: ["post"],
  url: "/admin/refunds/{refund}/process"
};
processRefund.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { refund: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { refund: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      refund: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    refund: typeof args.refund === "object" ? args.refund.id : args.refund
  };
  return processRefund.definition.url.replace("{refund}", parsedArgs.refund.toString()).replace(/\/+$/, "") + queryParams(options);
};
processRefund.post = (args, options) => ({
  url: processRefund.url(args, options),
  method: "post"
});
const processRefundForm = (args, options) => ({
  action: processRefund.url(args, options),
  method: "post"
});
processRefundForm.post = (args, options) => ({
  action: processRefund.url(args, options),
  method: "post"
});
processRefund.form = processRefundForm;
const index$9 = (options) => ({
  url: index$9.url(options),
  method: "get"
});
index$9.definition = {
  methods: ["get", "head"],
  url: "/admin/topups"
};
index$9.url = (options) => {
  return index$9.definition.url + queryParams(options);
};
index$9.get = (options) => ({
  url: index$9.url(options),
  method: "get"
});
index$9.head = (options) => ({
  url: index$9.url(options),
  method: "head"
});
const indexForm$9 = (options) => ({
  action: index$9.url(options),
  method: "get"
});
indexForm$9.get = (options) => ({
  action: index$9.url(options),
  method: "get"
});
indexForm$9.head = (options) => ({
  action: index$9.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
index$9.form = indexForm$9;
const approve$1 = (args, options) => ({
  url: approve$1.url(args, options),
  method: "post"
});
approve$1.definition = {
  methods: ["post"],
  url: "/admin/topups/{topup}/approve"
};
approve$1.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { topup: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { topup: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      topup: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    topup: typeof args.topup === "object" ? args.topup.id : args.topup
  };
  return approve$1.definition.url.replace("{topup}", parsedArgs.topup.toString()).replace(/\/+$/, "") + queryParams(options);
};
approve$1.post = (args, options) => ({
  url: approve$1.url(args, options),
  method: "post"
});
const approveForm$1 = (args, options) => ({
  action: approve$1.url(args, options),
  method: "post"
});
approveForm$1.post = (args, options) => ({
  action: approve$1.url(args, options),
  method: "post"
});
approve$1.form = approveForm$1;
const reject$1 = (args, options) => ({
  url: reject$1.url(args, options),
  method: "post"
});
reject$1.definition = {
  methods: ["post"],
  url: "/admin/topups/{topup}/reject"
};
reject$1.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { topup: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { topup: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      topup: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    topup: typeof args.topup === "object" ? args.topup.id : args.topup
  };
  return reject$1.definition.url.replace("{topup}", parsedArgs.topup.toString()).replace(/\/+$/, "") + queryParams(options);
};
reject$1.post = (args, options) => ({
  url: reject$1.url(args, options),
  method: "post"
});
const rejectForm$1 = (args, options) => ({
  action: reject$1.url(args, options),
  method: "post"
});
rejectForm$1.post = (args, options) => ({
  action: reject$1.url(args, options),
  method: "post"
});
reject$1.form = rejectForm$1;
const index$8 = (options) => ({
  url: index$8.url(options),
  method: "get"
});
index$8.definition = {
  methods: ["get", "head"],
  url: "/admin/withdrawals"
};
index$8.url = (options) => {
  return index$8.definition.url + queryParams(options);
};
index$8.get = (options) => ({
  url: index$8.url(options),
  method: "get"
});
index$8.head = (options) => ({
  url: index$8.url(options),
  method: "head"
});
const indexForm$8 = (options) => ({
  action: index$8.url(options),
  method: "get"
});
indexForm$8.get = (options) => ({
  action: index$8.url(options),
  method: "get"
});
indexForm$8.head = (options) => ({
  action: index$8.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
index$8.form = indexForm$8;
const approve = (args, options) => ({
  url: approve.url(args, options),
  method: "post"
});
approve.definition = {
  methods: ["post"],
  url: "/admin/withdrawals/{withdrawal}/approve"
};
approve.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { withdrawal: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { withdrawal: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      withdrawal: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    withdrawal: typeof args.withdrawal === "object" ? args.withdrawal.id : args.withdrawal
  };
  return approve.definition.url.replace("{withdrawal}", parsedArgs.withdrawal.toString()).replace(/\/+$/, "") + queryParams(options);
};
approve.post = (args, options) => ({
  url: approve.url(args, options),
  method: "post"
});
const approveForm = (args, options) => ({
  action: approve.url(args, options),
  method: "post"
});
approveForm.post = (args, options) => ({
  action: approve.url(args, options),
  method: "post"
});
approve.form = approveForm;
const reject = (args, options) => ({
  url: reject.url(args, options),
  method: "post"
});
reject.definition = {
  methods: ["post"],
  url: "/admin/withdrawals/{withdrawal}/reject"
};
reject.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { withdrawal: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { withdrawal: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      withdrawal: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    withdrawal: typeof args.withdrawal === "object" ? args.withdrawal.id : args.withdrawal
  };
  return reject.definition.url.replace("{withdrawal}", parsedArgs.withdrawal.toString()).replace(/\/+$/, "") + queryParams(options);
};
reject.post = (args, options) => ({
  url: reject.url(args, options),
  method: "post"
});
const rejectForm = (args, options) => ({
  action: reject.url(args, options),
  method: "post"
});
rejectForm.post = (args, options) => ({
  action: reject.url(args, options),
  method: "post"
});
reject.form = rejectForm;
const index$7 = (options) => ({
  url: index$7.url(options),
  method: "get"
});
index$7.definition = {
  methods: ["get", "head"],
  url: "/admin/networks/binary"
};
index$7.url = (options) => {
  return index$7.definition.url + queryParams(options);
};
index$7.get = (options) => ({
  url: index$7.url(options),
  method: "get"
});
index$7.head = (options) => ({
  url: index$7.url(options),
  method: "head"
});
const indexForm$7 = (options) => ({
  action: index$7.url(options),
  method: "get"
});
indexForm$7.get = (options) => ({
  action: index$7.url(options),
  method: "get"
});
indexForm$7.head = (options) => ({
  action: index$7.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
index$7.form = indexForm$7;
const index$6 = (options) => ({
  url: index$6.url(options),
  method: "get"
});
index$6.definition = {
  methods: ["get", "head"],
  url: "/admin/networks/matrix"
};
index$6.url = (options) => {
  return index$6.definition.url + queryParams(options);
};
index$6.get = (options) => ({
  url: index$6.url(options),
  method: "get"
});
index$6.head = (options) => ({
  url: index$6.url(options),
  method: "head"
});
const indexForm$6 = (options) => ({
  action: index$6.url(options),
  method: "get"
});
indexForm$6.get = (options) => ({
  action: index$6.url(options),
  method: "get"
});
indexForm$6.head = (options) => ({
  action: index$6.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
index$6.form = indexForm$6;
const index$5 = (options) => ({
  url: index$5.url(options),
  method: "get"
});
index$5.definition = {
  methods: ["get", "head"],
  url: "/admin/settings/addresses"
};
index$5.url = (options) => {
  return index$5.definition.url + queryParams(options);
};
index$5.get = (options) => ({
  url: index$5.url(options),
  method: "get"
});
index$5.head = (options) => ({
  url: index$5.url(options),
  method: "head"
});
const indexForm$5 = (options) => ({
  action: index$5.url(options),
  method: "get"
});
indexForm$5.get = (options) => ({
  action: index$5.url(options),
  method: "get"
});
indexForm$5.head = (options) => ({
  action: index$5.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
index$5.form = indexForm$5;
const destroy$1 = (args, options) => ({
  url: destroy$1.url(args, options),
  method: "delete"
});
destroy$1.definition = {
  methods: ["delete"],
  url: "/admin/settings/addresses/{address}"
};
destroy$1.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { address: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { address: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      address: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    address: typeof args.address === "object" ? args.address.id : args.address
  };
  return destroy$1.definition.url.replace("{address}", parsedArgs.address.toString()).replace(/\/+$/, "") + queryParams(options);
};
destroy$1.delete = (args, options) => ({
  url: destroy$1.url(args, options),
  method: "delete"
});
const destroyForm$1 = (args, options) => ({
  action: destroy$1.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
destroyForm$1.delete = (args, options) => ({
  action: destroy$1.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
destroy$1.form = destroyForm$1;
const index$4 = (options) => ({
  url: index$4.url(options),
  method: "get"
});
index$4.definition = {
  methods: ["get", "head"],
  url: "/admin/settings/payment-methods"
};
index$4.url = (options) => {
  return index$4.definition.url + queryParams(options);
};
index$4.get = (options) => ({
  url: index$4.url(options),
  method: "get"
});
index$4.head = (options) => ({
  url: index$4.url(options),
  method: "head"
});
const indexForm$4 = (options) => ({
  action: index$4.url(options),
  method: "get"
});
indexForm$4.get = (options) => ({
  action: index$4.url(options),
  method: "get"
});
indexForm$4.head = (options) => ({
  action: index$4.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
index$4.form = indexForm$4;
const update$2 = (args, options) => ({
  url: update$2.url(args, options),
  method: "put"
});
update$2.definition = {
  methods: ["put"],
  url: "/admin/settings/payment-methods/{paymentMethod}"
};
update$2.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { paymentMethod: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { paymentMethod: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      paymentMethod: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    paymentMethod: typeof args.paymentMethod === "object" ? args.paymentMethod.id : args.paymentMethod
  };
  return update$2.definition.url.replace("{paymentMethod}", parsedArgs.paymentMethod.toString()).replace(/\/+$/, "") + queryParams(options);
};
update$2.put = (args, options) => ({
  url: update$2.url(args, options),
  method: "put"
});
const updateForm$2 = (args, options) => ({
  action: update$2.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
updateForm$2.put = (args, options) => ({
  action: update$2.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
update$2.form = updateForm$2;
const index$3 = (options) => ({
  url: index$3.url(options),
  method: "get"
});
index$3.definition = {
  methods: ["get", "head"],
  url: "/admin/settings/couriers"
};
index$3.url = (options) => {
  return index$3.definition.url + queryParams(options);
};
index$3.get = (options) => ({
  url: index$3.url(options),
  method: "get"
});
index$3.head = (options) => ({
  url: index$3.url(options),
  method: "head"
});
const indexForm$3 = (options) => ({
  action: index$3.url(options),
  method: "get"
});
indexForm$3.get = (options) => ({
  action: index$3.url(options),
  method: "get"
});
indexForm$3.head = (options) => ({
  action: index$3.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
index$3.form = indexForm$3;
const index$2 = (options) => ({
  url: index$2.url(options),
  method: "get"
});
index$2.definition = {
  methods: ["get", "head"],
  url: "/admin/settings"
};
index$2.url = (options) => {
  return index$2.definition.url + queryParams(options);
};
index$2.get = (options) => ({
  url: index$2.url(options),
  method: "get"
});
index$2.head = (options) => ({
  url: index$2.url(options),
  method: "head"
});
const indexForm$2 = (options) => ({
  action: index$2.url(options),
  method: "get"
});
indexForm$2.get = (options) => ({
  action: index$2.url(options),
  method: "get"
});
indexForm$2.head = (options) => ({
  action: index$2.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
index$2.form = indexForm$2;
const update$1 = (options) => ({
  url: update$1.url(options),
  method: "post"
});
update$1.definition = {
  methods: ["post"],
  url: "/admin/settings"
};
update$1.url = (options) => {
  return update$1.definition.url + queryParams(options);
};
update$1.post = (options) => ({
  url: update$1.url(options),
  method: "post"
});
const updateForm$1 = (options) => ({
  action: update$1.url(options),
  method: "post"
});
updateForm$1.post = (options) => ({
  action: update$1.url(options),
  method: "post"
});
update$1.form = updateForm$1;
const index$1 = (options) => ({
  url: index$1.url(options),
  method: "get"
});
index$1.definition = {
  methods: ["get", "head"],
  url: "/admin/settings/member-package"
};
index$1.url = (options) => {
  return index$1.definition.url + queryParams(options);
};
index$1.get = (options) => ({
  url: index$1.url(options),
  method: "get"
});
index$1.head = (options) => ({
  url: index$1.url(options),
  method: "head"
});
const indexForm$1 = (options) => ({
  action: index$1.url(options),
  method: "get"
});
indexForm$1.get = (options) => ({
  action: index$1.url(options),
  method: "get"
});
indexForm$1.head = (options) => ({
  action: index$1.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
index$1.form = indexForm$1;
const promotions = (options) => ({
  url: promotions.url(options),
  method: "get"
});
promotions.definition = {
  methods: ["get", "head"],
  url: "/admin/settings/promotions-rewards"
};
promotions.url = (options) => {
  return promotions.definition.url + queryParams(options);
};
promotions.get = (options) => ({
  url: promotions.url(options),
  method: "get"
});
promotions.head = (options) => ({
  url: promotions.url(options),
  method: "head"
});
const promotionsForm = (options) => ({
  action: promotions.url(options),
  method: "get"
});
promotionsForm.get = (options) => ({
  action: promotions.url(options),
  method: "get"
});
promotionsForm.head = (options) => ({
  action: promotions.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
promotions.form = promotionsForm;
const promotionsProgress = (options) => ({
  url: promotionsProgress.url(options),
  method: "get"
});
promotionsProgress.definition = {
  methods: ["get", "head"],
  url: "/admin/settings/promotions-rewards/progress"
};
promotionsProgress.url = (options) => {
  return promotionsProgress.definition.url + queryParams(options);
};
promotionsProgress.get = (options) => ({
  url: promotionsProgress.url(options),
  method: "get"
});
promotionsProgress.head = (options) => ({
  url: promotionsProgress.url(options),
  method: "head"
});
const promotionsProgressForm = (options) => ({
  action: promotionsProgress.url(options),
  method: "get"
});
promotionsProgressForm.get = (options) => ({
  action: promotionsProgress.url(options),
  method: "get"
});
promotionsProgressForm.head = (options) => ({
  action: promotionsProgress.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
promotionsProgress.form = promotionsProgressForm;
const createPromotion = (options) => ({
  url: createPromotion.url(options),
  method: "get"
});
createPromotion.definition = {
  methods: ["get", "head"],
  url: "/admin/settings/promotions-rewards/create"
};
createPromotion.url = (options) => {
  return createPromotion.definition.url + queryParams(options);
};
createPromotion.get = (options) => ({
  url: createPromotion.url(options),
  method: "get"
});
createPromotion.head = (options) => ({
  url: createPromotion.url(options),
  method: "head"
});
const createPromotionForm = (options) => ({
  action: createPromotion.url(options),
  method: "get"
});
createPromotionForm.get = (options) => ({
  action: createPromotion.url(options),
  method: "get"
});
createPromotionForm.head = (options) => ({
  action: createPromotion.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
createPromotion.form = createPromotionForm;
const storePromotion = (options) => ({
  url: storePromotion.url(options),
  method: "post"
});
storePromotion.definition = {
  methods: ["post"],
  url: "/admin/settings/promotions-rewards"
};
storePromotion.url = (options) => {
  return storePromotion.definition.url + queryParams(options);
};
storePromotion.post = (options) => ({
  url: storePromotion.url(options),
  method: "post"
});
const storePromotionForm = (options) => ({
  action: storePromotion.url(options),
  method: "post"
});
storePromotionForm.post = (options) => ({
  action: storePromotion.url(options),
  method: "post"
});
storePromotion.form = storePromotionForm;
const editPromotion = (args, options) => ({
  url: editPromotion.url(args, options),
  method: "get"
});
editPromotion.definition = {
  methods: ["get", "head"],
  url: "/admin/settings/promotions-rewards/{reward}/edit"
};
editPromotion.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { reward: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { reward: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      reward: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    reward: typeof args.reward === "object" ? args.reward.id : args.reward
  };
  return editPromotion.definition.url.replace("{reward}", parsedArgs.reward.toString()).replace(/\/+$/, "") + queryParams(options);
};
editPromotion.get = (args, options) => ({
  url: editPromotion.url(args, options),
  method: "get"
});
editPromotion.head = (args, options) => ({
  url: editPromotion.url(args, options),
  method: "head"
});
const editPromotionForm = (args, options) => ({
  action: editPromotion.url(args, options),
  method: "get"
});
editPromotionForm.get = (args, options) => ({
  action: editPromotion.url(args, options),
  method: "get"
});
editPromotionForm.head = (args, options) => ({
  action: editPromotion.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
editPromotion.form = editPromotionForm;
const updatePromotion = (args, options) => ({
  url: updatePromotion.url(args, options),
  method: "put"
});
updatePromotion.definition = {
  methods: ["put"],
  url: "/admin/settings/promotions-rewards/{reward}"
};
updatePromotion.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { reward: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { reward: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      reward: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    reward: typeof args.reward === "object" ? args.reward.id : args.reward
  };
  return updatePromotion.definition.url.replace("{reward}", parsedArgs.reward.toString()).replace(/\/+$/, "") + queryParams(options);
};
updatePromotion.put = (args, options) => ({
  url: updatePromotion.url(args, options),
  method: "put"
});
const updatePromotionForm = (args, options) => ({
  action: updatePromotion.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
updatePromotionForm.put = (args, options) => ({
  action: updatePromotion.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
updatePromotion.form = updatePromotionForm;
const destroyPromotion = (args, options) => ({
  url: destroyPromotion.url(args, options),
  method: "delete"
});
destroyPromotion.definition = {
  methods: ["delete"],
  url: "/admin/settings/promotions-rewards/{reward}"
};
destroyPromotion.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { reward: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { reward: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      reward: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    reward: typeof args.reward === "object" ? args.reward.id : args.reward
  };
  return destroyPromotion.definition.url.replace("{reward}", parsedArgs.reward.toString()).replace(/\/+$/, "") + queryParams(options);
};
destroyPromotion.delete = (args, options) => ({
  url: destroyPromotion.url(args, options),
  method: "delete"
});
const destroyPromotionForm = (args, options) => ({
  action: destroyPromotion.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
destroyPromotionForm.delete = (args, options) => ({
  action: destroyPromotion.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
destroyPromotion.form = destroyPromotionForm;
const lifetime = (options) => ({
  url: lifetime.url(options),
  method: "get"
});
lifetime.definition = {
  methods: ["get", "head"],
  url: "/admin/settings/lifetime-cash-rewards"
};
lifetime.url = (options) => {
  return lifetime.definition.url + queryParams(options);
};
lifetime.get = (options) => ({
  url: lifetime.url(options),
  method: "get"
});
lifetime.head = (options) => ({
  url: lifetime.url(options),
  method: "head"
});
const lifetimeForm = (options) => ({
  action: lifetime.url(options),
  method: "get"
});
lifetimeForm.get = (options) => ({
  action: lifetime.url(options),
  method: "get"
});
lifetimeForm.head = (options) => ({
  action: lifetime.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
lifetime.form = lifetimeForm;
const createLifetime = (options) => ({
  url: createLifetime.url(options),
  method: "get"
});
createLifetime.definition = {
  methods: ["get", "head"],
  url: "/admin/settings/lifetime-cash-rewards/create"
};
createLifetime.url = (options) => {
  return createLifetime.definition.url + queryParams(options);
};
createLifetime.get = (options) => ({
  url: createLifetime.url(options),
  method: "get"
});
createLifetime.head = (options) => ({
  url: createLifetime.url(options),
  method: "head"
});
const createLifetimeForm = (options) => ({
  action: createLifetime.url(options),
  method: "get"
});
createLifetimeForm.get = (options) => ({
  action: createLifetime.url(options),
  method: "get"
});
createLifetimeForm.head = (options) => ({
  action: createLifetime.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
createLifetime.form = createLifetimeForm;
const storeLifetime = (options) => ({
  url: storeLifetime.url(options),
  method: "post"
});
storeLifetime.definition = {
  methods: ["post"],
  url: "/admin/settings/lifetime-cash-rewards"
};
storeLifetime.url = (options) => {
  return storeLifetime.definition.url + queryParams(options);
};
storeLifetime.post = (options) => ({
  url: storeLifetime.url(options),
  method: "post"
});
const storeLifetimeForm = (options) => ({
  action: storeLifetime.url(options),
  method: "post"
});
storeLifetimeForm.post = (options) => ({
  action: storeLifetime.url(options),
  method: "post"
});
storeLifetime.form = storeLifetimeForm;
const editLifetime = (args, options) => ({
  url: editLifetime.url(args, options),
  method: "get"
});
editLifetime.definition = {
  methods: ["get", "head"],
  url: "/admin/settings/lifetime-cash-rewards/{reward}/edit"
};
editLifetime.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { reward: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { reward: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      reward: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    reward: typeof args.reward === "object" ? args.reward.id : args.reward
  };
  return editLifetime.definition.url.replace("{reward}", parsedArgs.reward.toString()).replace(/\/+$/, "") + queryParams(options);
};
editLifetime.get = (args, options) => ({
  url: editLifetime.url(args, options),
  method: "get"
});
editLifetime.head = (args, options) => ({
  url: editLifetime.url(args, options),
  method: "head"
});
const editLifetimeForm = (args, options) => ({
  action: editLifetime.url(args, options),
  method: "get"
});
editLifetimeForm.get = (args, options) => ({
  action: editLifetime.url(args, options),
  method: "get"
});
editLifetimeForm.head = (args, options) => ({
  action: editLifetime.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
editLifetime.form = editLifetimeForm;
const updateLifetime = (args, options) => ({
  url: updateLifetime.url(args, options),
  method: "put"
});
updateLifetime.definition = {
  methods: ["put"],
  url: "/admin/settings/lifetime-cash-rewards/{reward}"
};
updateLifetime.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { reward: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { reward: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      reward: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    reward: typeof args.reward === "object" ? args.reward.id : args.reward
  };
  return updateLifetime.definition.url.replace("{reward}", parsedArgs.reward.toString()).replace(/\/+$/, "") + queryParams(options);
};
updateLifetime.put = (args, options) => ({
  url: updateLifetime.url(args, options),
  method: "put"
});
const updateLifetimeForm = (args, options) => ({
  action: updateLifetime.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
updateLifetimeForm.put = (args, options) => ({
  action: updateLifetime.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
updateLifetime.form = updateLifetimeForm;
const destroyLifetime = (args, options) => ({
  url: destroyLifetime.url(args, options),
  method: "delete"
});
destroyLifetime.definition = {
  methods: ["delete"],
  url: "/admin/settings/lifetime-cash-rewards/{reward}"
};
destroyLifetime.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { reward: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { reward: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      reward: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    reward: typeof args.reward === "object" ? args.reward.id : args.reward
  };
  return destroyLifetime.definition.url.replace("{reward}", parsedArgs.reward.toString()).replace(/\/+$/, "") + queryParams(options);
};
destroyLifetime.delete = (args, options) => ({
  url: destroyLifetime.url(args, options),
  method: "delete"
});
const destroyLifetimeForm = (args, options) => ({
  action: destroyLifetime.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
destroyLifetimeForm.delete = (args, options) => ({
  action: destroyLifetime.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
destroyLifetime.form = destroyLifetimeForm;
const index = (options) => ({
  url: index.url(options),
  method: "get"
});
index.definition = {
  methods: ["get", "head"],
  url: "/documentation"
};
index.url = (options) => {
  return index.definition.url + queryParams(options);
};
index.get = (options) => ({
  url: index.url(options),
  method: "get"
});
index.head = (options) => ({
  url: index.url(options),
  method: "head"
});
const indexForm = (options) => ({
  action: index.url(options),
  method: "get"
});
indexForm.get = (options) => ({
  action: index.url(options),
  method: "get"
});
indexForm.head = (options) => ({
  action: index.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
index.form = indexForm;
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "NavFooter",
  __ssrInlineRender: true,
  props: {
    items: {},
    class: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$F), mergeProps({
        class: `group-data-[collapsible=icon]:p-0 ${_ctx.$props.class || ""}`
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$D), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$y), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(__props.items, (item) => {
                          _push4(ssrRenderComponent(unref(_sfc_main$p), {
                            key: item.title
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(_sfc_main$q), {
                                  class: "text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100",
                                  "as-child": ""
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<a${ssrRenderAttr("href", unref(toUrl)(item.href))} target="_blank" rel="noopener noreferrer"${_scopeId5}>`);
                                      ssrRenderVNode(_push6, createVNode(resolveDynamicComponent(item.icon), null, null), _parent6, _scopeId5);
                                      _push6(`<span${_scopeId5}>${ssrInterpolate(item.title)}</span></a>`);
                                    } else {
                                      return [
                                        createVNode("a", {
                                          href: unref(toUrl)(item.href),
                                          target: "_blank",
                                          rel: "noopener noreferrer"
                                        }, [
                                          (openBlock(), createBlock(resolveDynamicComponent(item.icon))),
                                          createVNode("span", null, toDisplayString(item.title), 1)
                                        ], 8, ["href"])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(_sfc_main$q), {
                                    class: "text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100",
                                    "as-child": ""
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("a", {
                                        href: unref(toUrl)(item.href),
                                        target: "_blank",
                                        rel: "noopener noreferrer"
                                      }, [
                                        (openBlock(), createBlock(resolveDynamicComponent(item.icon))),
                                        createVNode("span", null, toDisplayString(item.title), 1)
                                      ], 8, ["href"])
                                    ]),
                                    _: 2
                                  }, 1024)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.items, (item) => {
                            return openBlock(), createBlock(unref(_sfc_main$p), {
                              key: item.title
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$q), {
                                  class: "text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100",
                                  "as-child": ""
                                }, {
                                  default: withCtx(() => [
                                    createVNode("a", {
                                      href: unref(toUrl)(item.href),
                                      target: "_blank",
                                      rel: "noopener noreferrer"
                                    }, [
                                      (openBlock(), createBlock(resolveDynamicComponent(item.icon))),
                                      createVNode("span", null, toDisplayString(item.title), 1)
                                    ], 8, ["href"])
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$y), null, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.items, (item) => {
                          return openBlock(), createBlock(unref(_sfc_main$p), {
                            key: item.title
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$q), {
                                class: "text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100",
                                "as-child": ""
                              }, {
                                default: withCtx(() => [
                                  createVNode("a", {
                                    href: unref(toUrl)(item.href),
                                    target: "_blank",
                                    rel: "noopener noreferrer"
                                  }, [
                                    (openBlock(), createBlock(resolveDynamicComponent(item.icon))),
                                    createVNode("span", null, toDisplayString(item.title), 1)
                                  ], 8, ["href"])
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$D), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$y), null, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.items, (item) => {
                        return openBlock(), createBlock(unref(_sfc_main$p), {
                          key: item.title
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$q), {
                              class: "text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100",
                              "as-child": ""
                            }, {
                              default: withCtx(() => [
                                createVNode("a", {
                                  href: unref(toUrl)(item.href),
                                  target: "_blank",
                                  rel: "noopener noreferrer"
                                }, [
                                  (openBlock(), createBlock(resolveDynamicComponent(item.icon))),
                                  createVNode("span", null, toDisplayString(item.title), 1)
                                ], 8, ["href"])
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
      }, _parent));
    };
  }
});
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/NavFooter.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "Collapsible",
  __ssrInlineRender: true,
  props: {
    defaultOpen: { type: Boolean },
    open: { type: Boolean },
    disabled: { type: Boolean },
    unmountOnHide: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(CollapsibleRoot), mergeProps({ "data-slot": "collapsible" }, unref(forwarded), _attrs), {
        default: withCtx(({ open }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", { open }, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", { open })
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/collapsible/Collapsible.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "CollapsibleContent",
  __ssrInlineRender: true,
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(CollapsibleContent), mergeProps({ "data-slot": "collapsible-content" }, props, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/collapsible/CollapsibleContent.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "CollapsibleTrigger",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(CollapsibleTrigger), mergeProps({ "data-slot": "collapsible-trigger" }, props, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/collapsible/CollapsibleTrigger.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "NavMain",
  __ssrInlineRender: true,
  props: {
    items: {}
  },
  setup(__props) {
    const page = usePage();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$F), mergeProps({ class: "px-2 py-0" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$C), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Platform`);
                } else {
                  return [
                    createTextVNode("Platform")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$y), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(__props.items, (item) => {
                    _push3(ssrRenderComponent(unref(_sfc_main$c), {
                      key: item.title,
                      "as-child": "",
                      "default-open": item.items?.some((subItem) => unref(urlIsActive)(subItem.href, unref(page).url)),
                      class: "group/collapsible"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(_sfc_main$p), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                if (item.items && item.items.length > 0) {
                                  _push5(`<!--[-->`);
                                  _push5(ssrRenderComponent(unref(_sfc_main$a), { "as-child": "" }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(unref(_sfc_main$q), {
                                          tooltip: item.title
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              if (item.icon) {
                                                ssrRenderVNode(_push7, createVNode(resolveDynamicComponent(item.icon), null, null), _parent7, _scopeId6);
                                              } else {
                                                _push7(`<!---->`);
                                              }
                                              _push7(`<span${_scopeId6}>${ssrInterpolate(item.title)}</span>`);
                                              _push7(ssrRenderComponent(unref(ChevronRight), { class: "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" }, null, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                item.icon ? (openBlock(), createBlock(resolveDynamicComponent(item.icon), { key: 0 })) : createCommentVNode("", true),
                                                createVNode("span", null, toDisplayString(item.title), 1),
                                                createVNode(unref(ChevronRight), { class: "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" })
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(unref(_sfc_main$q), {
                                            tooltip: item.title
                                          }, {
                                            default: withCtx(() => [
                                              item.icon ? (openBlock(), createBlock(resolveDynamicComponent(item.icon), { key: 0 })) : createCommentVNode("", true),
                                              createVNode("span", null, toDisplayString(item.title), 1),
                                              createVNode(unref(ChevronRight), { class: "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" })
                                            ]),
                                            _: 2
                                          }, 1032, ["tooltip"])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(unref(_sfc_main$b), null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(unref(_sfc_main$m), null, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`<!--[-->`);
                                              ssrRenderList(item.items, (subItem) => {
                                                _push7(ssrRenderComponent(unref(_sfc_main$k), {
                                                  key: subItem.title
                                                }, {
                                                  default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                    if (_push8) {
                                                      _push8(ssrRenderComponent(unref(_sfc_main$l), {
                                                        "as-child": "",
                                                        "is-active": unref(urlIsActive)(subItem.href, unref(page).url)
                                                      }, {
                                                        default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                          if (_push9) {
                                                            _push9(ssrRenderComponent(unref(Link), {
                                                              href: subItem.href
                                                            }, {
                                                              default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                                if (_push10) {
                                                                  if (subItem.icon) {
                                                                    ssrRenderVNode(_push10, createVNode(resolveDynamicComponent(subItem.icon), null, null), _parent10, _scopeId9);
                                                                  } else {
                                                                    _push10(`<!---->`);
                                                                  }
                                                                  _push10(`<span${_scopeId9}>${ssrInterpolate(subItem.title)}</span>`);
                                                                } else {
                                                                  return [
                                                                    subItem.icon ? (openBlock(), createBlock(resolveDynamicComponent(subItem.icon), { key: 0 })) : createCommentVNode("", true),
                                                                    createVNode("span", null, toDisplayString(subItem.title), 1)
                                                                  ];
                                                                }
                                                              }),
                                                              _: 2
                                                            }, _parent9, _scopeId8));
                                                          } else {
                                                            return [
                                                              createVNode(unref(Link), {
                                                                href: subItem.href
                                                              }, {
                                                                default: withCtx(() => [
                                                                  subItem.icon ? (openBlock(), createBlock(resolveDynamicComponent(subItem.icon), { key: 0 })) : createCommentVNode("", true),
                                                                  createVNode("span", null, toDisplayString(subItem.title), 1)
                                                                ]),
                                                                _: 2
                                                              }, 1032, ["href"])
                                                            ];
                                                          }
                                                        }),
                                                        _: 2
                                                      }, _parent8, _scopeId7));
                                                    } else {
                                                      return [
                                                        createVNode(unref(_sfc_main$l), {
                                                          "as-child": "",
                                                          "is-active": unref(urlIsActive)(subItem.href, unref(page).url)
                                                        }, {
                                                          default: withCtx(() => [
                                                            createVNode(unref(Link), {
                                                              href: subItem.href
                                                            }, {
                                                              default: withCtx(() => [
                                                                subItem.icon ? (openBlock(), createBlock(resolveDynamicComponent(subItem.icon), { key: 0 })) : createCommentVNode("", true),
                                                                createVNode("span", null, toDisplayString(subItem.title), 1)
                                                              ]),
                                                              _: 2
                                                            }, 1032, ["href"])
                                                          ]),
                                                          _: 2
                                                        }, 1032, ["is-active"])
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent7, _scopeId6));
                                              });
                                              _push7(`<!--]-->`);
                                            } else {
                                              return [
                                                (openBlock(true), createBlock(Fragment, null, renderList(item.items, (subItem) => {
                                                  return openBlock(), createBlock(unref(_sfc_main$k), {
                                                    key: subItem.title
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(_sfc_main$l), {
                                                        "as-child": "",
                                                        "is-active": unref(urlIsActive)(subItem.href, unref(page).url)
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode(unref(Link), {
                                                            href: subItem.href
                                                          }, {
                                                            default: withCtx(() => [
                                                              subItem.icon ? (openBlock(), createBlock(resolveDynamicComponent(subItem.icon), { key: 0 })) : createCommentVNode("", true),
                                                              createVNode("span", null, toDisplayString(subItem.title), 1)
                                                            ]),
                                                            _: 2
                                                          }, 1032, ["href"])
                                                        ]),
                                                        _: 2
                                                      }, 1032, ["is-active"])
                                                    ]),
                                                    _: 2
                                                  }, 1024);
                                                }), 128))
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(unref(_sfc_main$m), null, {
                                            default: withCtx(() => [
                                              (openBlock(true), createBlock(Fragment, null, renderList(item.items, (subItem) => {
                                                return openBlock(), createBlock(unref(_sfc_main$k), {
                                                  key: subItem.title
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(_sfc_main$l), {
                                                      "as-child": "",
                                                      "is-active": unref(urlIsActive)(subItem.href, unref(page).url)
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(unref(Link), {
                                                          href: subItem.href
                                                        }, {
                                                          default: withCtx(() => [
                                                            subItem.icon ? (openBlock(), createBlock(resolveDynamicComponent(subItem.icon), { key: 0 })) : createCommentVNode("", true),
                                                            createVNode("span", null, toDisplayString(subItem.title), 1)
                                                          ]),
                                                          _: 2
                                                        }, 1032, ["href"])
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["is-active"])
                                                  ]),
                                                  _: 2
                                                }, 1024);
                                              }), 128))
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(`<!--]-->`);
                                } else {
                                  _push5(ssrRenderComponent(unref(_sfc_main$q), {
                                    "as-child": "",
                                    "is-active": unref(urlIsActive)(item.href, unref(page).url),
                                    tooltip: item.title
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(unref(Link), {
                                          href: item.href
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              if (item.icon) {
                                                ssrRenderVNode(_push7, createVNode(resolveDynamicComponent(item.icon), null, null), _parent7, _scopeId6);
                                              } else {
                                                _push7(`<!---->`);
                                              }
                                              _push7(`<span${_scopeId6}>${ssrInterpolate(item.title)}</span>`);
                                            } else {
                                              return [
                                                item.icon ? (openBlock(), createBlock(resolveDynamicComponent(item.icon), { key: 0 })) : createCommentVNode("", true),
                                                createVNode("span", null, toDisplayString(item.title), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(unref(Link), {
                                            href: item.href
                                          }, {
                                            default: withCtx(() => [
                                              item.icon ? (openBlock(), createBlock(resolveDynamicComponent(item.icon), { key: 0 })) : createCommentVNode("", true),
                                              createVNode("span", null, toDisplayString(item.title), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["href"])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                }
                              } else {
                                return [
                                  item.items && item.items.length > 0 ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                    createVNode(unref(_sfc_main$a), { "as-child": "" }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$q), {
                                          tooltip: item.title
                                        }, {
                                          default: withCtx(() => [
                                            item.icon ? (openBlock(), createBlock(resolveDynamicComponent(item.icon), { key: 0 })) : createCommentVNode("", true),
                                            createVNode("span", null, toDisplayString(item.title), 1),
                                            createVNode(unref(ChevronRight), { class: "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" })
                                          ]),
                                          _: 2
                                        }, 1032, ["tooltip"])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$b), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$m), null, {
                                          default: withCtx(() => [
                                            (openBlock(true), createBlock(Fragment, null, renderList(item.items, (subItem) => {
                                              return openBlock(), createBlock(unref(_sfc_main$k), {
                                                key: subItem.title
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(_sfc_main$l), {
                                                    "as-child": "",
                                                    "is-active": unref(urlIsActive)(subItem.href, unref(page).url)
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(Link), {
                                                        href: subItem.href
                                                      }, {
                                                        default: withCtx(() => [
                                                          subItem.icon ? (openBlock(), createBlock(resolveDynamicComponent(subItem.icon), { key: 0 })) : createCommentVNode("", true),
                                                          createVNode("span", null, toDisplayString(subItem.title), 1)
                                                        ]),
                                                        _: 2
                                                      }, 1032, ["href"])
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["is-active"])
                                                ]),
                                                _: 2
                                              }, 1024);
                                            }), 128))
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ], 64)) : (openBlock(), createBlock(unref(_sfc_main$q), {
                                    key: 1,
                                    "as-child": "",
                                    "is-active": unref(urlIsActive)(item.href, unref(page).url),
                                    tooltip: item.title
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Link), {
                                        href: item.href
                                      }, {
                                        default: withCtx(() => [
                                          item.icon ? (openBlock(), createBlock(resolveDynamicComponent(item.icon), { key: 0 })) : createCommentVNode("", true),
                                          createVNode("span", null, toDisplayString(item.title), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["href"])
                                    ]),
                                    _: 2
                                  }, 1032, ["is-active", "tooltip"]))
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(_sfc_main$p), null, {
                              default: withCtx(() => [
                                item.items && item.items.length > 0 ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                  createVNode(unref(_sfc_main$a), { "as-child": "" }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$q), {
                                        tooltip: item.title
                                      }, {
                                        default: withCtx(() => [
                                          item.icon ? (openBlock(), createBlock(resolveDynamicComponent(item.icon), { key: 0 })) : createCommentVNode("", true),
                                          createVNode("span", null, toDisplayString(item.title), 1),
                                          createVNode(unref(ChevronRight), { class: "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" })
                                        ]),
                                        _: 2
                                      }, 1032, ["tooltip"])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(unref(_sfc_main$b), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$m), null, {
                                        default: withCtx(() => [
                                          (openBlock(true), createBlock(Fragment, null, renderList(item.items, (subItem) => {
                                            return openBlock(), createBlock(unref(_sfc_main$k), {
                                              key: subItem.title
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(_sfc_main$l), {
                                                  "as-child": "",
                                                  "is-active": unref(urlIsActive)(subItem.href, unref(page).url)
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(Link), {
                                                      href: subItem.href
                                                    }, {
                                                      default: withCtx(() => [
                                                        subItem.icon ? (openBlock(), createBlock(resolveDynamicComponent(subItem.icon), { key: 0 })) : createCommentVNode("", true),
                                                        createVNode("span", null, toDisplayString(subItem.title), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["href"])
                                                  ]),
                                                  _: 2
                                                }, 1032, ["is-active"])
                                              ]),
                                              _: 2
                                            }, 1024);
                                          }), 128))
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ], 64)) : (openBlock(), createBlock(unref(_sfc_main$q), {
                                  key: 1,
                                  "as-child": "",
                                  "is-active": unref(urlIsActive)(item.href, unref(page).url),
                                  tooltip: item.title
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Link), {
                                      href: item.href
                                    }, {
                                      default: withCtx(() => [
                                        item.icon ? (openBlock(), createBlock(resolveDynamicComponent(item.icon), { key: 0 })) : createCommentVNode("", true),
                                        createVNode("span", null, toDisplayString(item.title), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["href"])
                                  ]),
                                  _: 2
                                }, 1032, ["is-active", "tooltip"]))
                              ]),
                              _: 2
                            }, 1024)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.items, (item) => {
                      return openBlock(), createBlock(unref(_sfc_main$c), {
                        key: item.title,
                        "as-child": "",
                        "default-open": item.items?.some((subItem) => unref(urlIsActive)(subItem.href, unref(page).url)),
                        class: "group/collapsible"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$p), null, {
                            default: withCtx(() => [
                              item.items && item.items.length > 0 ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                createVNode(unref(_sfc_main$a), { "as-child": "" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$q), {
                                      tooltip: item.title
                                    }, {
                                      default: withCtx(() => [
                                        item.icon ? (openBlock(), createBlock(resolveDynamicComponent(item.icon), { key: 0 })) : createCommentVNode("", true),
                                        createVNode("span", null, toDisplayString(item.title), 1),
                                        createVNode(unref(ChevronRight), { class: "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" })
                                      ]),
                                      _: 2
                                    }, 1032, ["tooltip"])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$b), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$m), null, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(item.items, (subItem) => {
                                          return openBlock(), createBlock(unref(_sfc_main$k), {
                                            key: subItem.title
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$l), {
                                                "as-child": "",
                                                "is-active": unref(urlIsActive)(subItem.href, unref(page).url)
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(Link), {
                                                    href: subItem.href
                                                  }, {
                                                    default: withCtx(() => [
                                                      subItem.icon ? (openBlock(), createBlock(resolveDynamicComponent(subItem.icon), { key: 0 })) : createCommentVNode("", true),
                                                      createVNode("span", null, toDisplayString(subItem.title), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["href"])
                                                ]),
                                                _: 2
                                              }, 1032, ["is-active"])
                                            ]),
                                            _: 2
                                          }, 1024);
                                        }), 128))
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024)
                              ], 64)) : (openBlock(), createBlock(unref(_sfc_main$q), {
                                key: 1,
                                "as-child": "",
                                "is-active": unref(urlIsActive)(item.href, unref(page).url),
                                tooltip: item.title
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Link), {
                                    href: item.href
                                  }, {
                                    default: withCtx(() => [
                                      item.icon ? (openBlock(), createBlock(resolveDynamicComponent(item.icon), { key: 0 })) : createCommentVNode("", true),
                                      createVNode("span", null, toDisplayString(item.title), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["href"])
                                ]),
                                _: 2
                              }, 1032, ["is-active", "tooltip"]))
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1032, ["default-open"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$C), null, {
                default: withCtx(() => [
                  createTextVNode("Platform")
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$y), null, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.items, (item) => {
                    return openBlock(), createBlock(unref(_sfc_main$c), {
                      key: item.title,
                      "as-child": "",
                      "default-open": item.items?.some((subItem) => unref(urlIsActive)(subItem.href, unref(page).url)),
                      class: "group/collapsible"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$p), null, {
                          default: withCtx(() => [
                            item.items && item.items.length > 0 ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                              createVNode(unref(_sfc_main$a), { "as-child": "" }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$q), {
                                    tooltip: item.title
                                  }, {
                                    default: withCtx(() => [
                                      item.icon ? (openBlock(), createBlock(resolveDynamicComponent(item.icon), { key: 0 })) : createCommentVNode("", true),
                                      createVNode("span", null, toDisplayString(item.title), 1),
                                      createVNode(unref(ChevronRight), { class: "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" })
                                    ]),
                                    _: 2
                                  }, 1032, ["tooltip"])
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$b), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$m), null, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(item.items, (subItem) => {
                                        return openBlock(), createBlock(unref(_sfc_main$k), {
                                          key: subItem.title
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$l), {
                                              "as-child": "",
                                              "is-active": unref(urlIsActive)(subItem.href, unref(page).url)
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(Link), {
                                                  href: subItem.href
                                                }, {
                                                  default: withCtx(() => [
                                                    subItem.icon ? (openBlock(), createBlock(resolveDynamicComponent(subItem.icon), { key: 0 })) : createCommentVNode("", true),
                                                    createVNode("span", null, toDisplayString(subItem.title), 1)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["href"])
                                              ]),
                                              _: 2
                                            }, 1032, ["is-active"])
                                          ]),
                                          _: 2
                                        }, 1024);
                                      }), 128))
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024)
                            ], 64)) : (openBlock(), createBlock(unref(_sfc_main$q), {
                              key: 1,
                              "as-child": "",
                              "is-active": unref(urlIsActive)(item.href, unref(page).url),
                              tooltip: item.title
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Link), {
                                  href: item.href
                                }, {
                                  default: withCtx(() => [
                                    item.icon ? (openBlock(), createBlock(resolveDynamicComponent(item.icon), { key: 0 })) : createCommentVNode("", true),
                                    createVNode("span", null, toDisplayString(item.title), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["href"])
                              ]),
                              _: 2
                            }, 1032, ["is-active", "tooltip"]))
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1032, ["default-open"]);
                  }), 128))
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
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/NavMain.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
function getInitials(fullName) {
  if (!fullName) return "";
  const names = fullName.trim().split(" ");
  if (names.length === 0) return "";
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase();
}
function useInitials() {
  return { getInitials };
}
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "UserInfo",
  __ssrInlineRender: true,
  props: {
    user: { default: null },
    showEmail: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const { getInitials: getInitials2 } = useInitials();
    const showAvatar = computed(
      () => props.user?.avatar && props.user.avatar !== ""
    );
    const userName = computed(() => props.user?.name || "Guest");
    const userEmail = computed(() => props.user?.email || "");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(_sfc_main$R), { class: "h-8 w-8 overflow-hidden rounded-lg" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (showAvatar.value) {
              _push2(ssrRenderComponent(unref(_sfc_main$S), {
                src: __props.user?.avatar,
                alt: userName.value
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(_sfc_main$T), { class: "rounded-lg text-black dark:text-white" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(getInitials2)(userName.value))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(getInitials2)(userName.value)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              showAvatar.value ? (openBlock(), createBlock(unref(_sfc_main$S), {
                key: 0,
                src: __props.user?.avatar,
                alt: userName.value
              }, null, 8, ["src", "alt"])) : createCommentVNode("", true),
              createVNode(unref(_sfc_main$T), { class: "rounded-lg text-black dark:text-white" }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(getInitials2)(userName.value)), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="grid flex-1 text-left text-sm leading-tight"><span class="truncate font-medium">${ssrInterpolate(userName.value)}</span>`);
      if (__props.showEmail && userEmail.value) {
        _push(`<span class="truncate text-xs text-muted-foreground">${ssrInterpolate(userEmail.value)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!--]-->`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/UserInfo.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
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
({
  edit: Object.assign(edit, edit),
  update: Object.assign(update, update),
  destroy: Object.assign(destroy, destroy)
});
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "UserMenuContent",
  __ssrInlineRender: true,
  props: {
    user: {}
  },
  setup(__props) {
    const logoutForm = useForm({});
    const handleLogout = () => {
      logoutForm.post(logout.url(), {
        onSuccess: () => {
          toast.success("Berhasil logout");
        },
        onError: () => {
          toast.error("Gagal logout, silakan coba lagi");
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(_sfc_main$U), { class: "p-0 font-normal" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$8, {
              user: __props.user,
              "show-email": true
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-2 px-1 py-1.5 text-left text-sm" }, [
                createVNode(_sfc_main$8, {
                  user: __props.user,
                  "show-email": true
                }, null, 8, ["user"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$V), null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$W), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$X), { "as-child": true }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Link), {
                    class: "block w-full",
                    href: unref(edit)(),
                    prefetch: "",
                    as: "button"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Settings), { class: "mr-2 h-4 w-4" }, null, _parent4, _scopeId3));
                        _push4(` Settings `);
                      } else {
                        return [
                          createVNode(unref(Settings), { class: "mr-2 h-4 w-4" }),
                          createTextVNode(" Settings ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Link), {
                      class: "block w-full",
                      href: unref(edit)(),
                      prefetch: "",
                      as: "button"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Settings), { class: "mr-2 h-4 w-4" }),
                        createTextVNode(" Settings ")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$X), { "as-child": true }, {
                default: withCtx(() => [
                  createVNode(unref(Link), {
                    class: "block w-full",
                    href: unref(edit)(),
                    prefetch: "",
                    as: "button"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Settings), { class: "mr-2 h-4 w-4" }),
                      createTextVNode(" Settings ")
                    ]),
                    _: 1
                  }, 8, ["href"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$V), null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$X), { "as-child": true }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button type="button" class="w-full cursor-pointer" data-test="logout-button"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(LogOut), { class: "mr-2 h-4 w-4" }, null, _parent2, _scopeId));
            _push2(` Log out </button>`);
          } else {
            return [
              createVNode("button", {
                type: "button",
                class: "w-full cursor-pointer",
                onClick: handleLogout,
                "data-test": "logout-button"
              }, [
                createVNode(unref(LogOut), { class: "mr-2 h-4 w-4" }),
                createTextVNode(" Log out ")
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
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/UserMenuContent.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "NavUser",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const user = page.props.auth.user;
    const { isMobile, state } = useSidebar();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$y), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$p), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$Y), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$Z), { "as-child": "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$q), {
                                size: "lg",
                                class: "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground",
                                "data-test": "sidebar-menu-button"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_sfc_main$8, { user: unref(user) }, null, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(ChevronsUpDown), { class: "ml-auto size-4" }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_sfc_main$8, { user: unref(user) }, null, 8, ["user"]),
                                      createVNode(unref(ChevronsUpDown), { class: "ml-auto size-4" })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$q), {
                                  size: "lg",
                                  class: "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground",
                                  "data-test": "sidebar-menu-button"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_sfc_main$8, { user: unref(user) }, null, 8, ["user"]),
                                    createVNode(unref(ChevronsUpDown), { class: "ml-auto size-4" })
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$_), {
                          class: "w-(--reka-dropdown-menu-trigger-width) min-w-56 rounded-lg",
                          side: unref(isMobile) ? "bottom" : unref(state) === "collapsed" ? "left" : "bottom",
                          align: "end",
                          "side-offset": 4
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_sfc_main$7, { user: unref(user) }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_sfc_main$7, { user: unref(user) }, null, 8, ["user"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$Z), { "as-child": "" }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$q), {
                                size: "lg",
                                class: "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground",
                                "data-test": "sidebar-menu-button"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_sfc_main$8, { user: unref(user) }, null, 8, ["user"]),
                                  createVNode(unref(ChevronsUpDown), { class: "ml-auto size-4" })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$_), {
                            class: "w-(--reka-dropdown-menu-trigger-width) min-w-56 rounded-lg",
                            side: unref(isMobile) ? "bottom" : unref(state) === "collapsed" ? "left" : "bottom",
                            align: "end",
                            "side-offset": 4
                          }, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$7, { user: unref(user) }, null, 8, ["user"])
                            ]),
                            _: 1
                          }, 8, ["side"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$Y), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$Z), { "as-child": "" }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$q), {
                              size: "lg",
                              class: "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground",
                              "data-test": "sidebar-menu-button"
                            }, {
                              default: withCtx(() => [
                                createVNode(_sfc_main$8, { user: unref(user) }, null, 8, ["user"]),
                                createVNode(unref(ChevronsUpDown), { class: "ml-auto size-4" })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$_), {
                          class: "w-(--reka-dropdown-menu-trigger-width) min-w-56 rounded-lg",
                          side: unref(isMobile) ? "bottom" : unref(state) === "collapsed" ? "left" : "bottom",
                          align: "end",
                          "side-offset": 4
                        }, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$7, { user: unref(user) }, null, 8, ["user"])
                          ]),
                          _: 1
                        }, 8, ["side"])
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
              createVNode(unref(_sfc_main$p), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$Y), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$Z), { "as-child": "" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$q), {
                            size: "lg",
                            class: "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground",
                            "data-test": "sidebar-menu-button"
                          }, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$8, { user: unref(user) }, null, 8, ["user"]),
                              createVNode(unref(ChevronsUpDown), { class: "ml-auto size-4" })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$_), {
                        class: "w-(--reka-dropdown-menu-trigger-width) min-w-56 rounded-lg",
                        side: unref(isMobile) ? "bottom" : unref(state) === "collapsed" ? "left" : "bottom",
                        align: "end",
                        "side-offset": 4
                      }, {
                        default: withCtx(() => [
                          createVNode(_sfc_main$7, { user: unref(user) }, null, 8, ["user"])
                        ]),
                        _: 1
                      }, 8, ["side"])
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
      }, _parent));
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/NavUser.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "AppLogo",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const appSettings = computed(() => page.props.appSettings);
    const siteName = computed(() => appSettings.value?.site_name || "PURANUSA");
    const siteLogo = computed(() => appSettings.value?.site_logo);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="flex aspect-square size-8 items-center justify-center rounded-md border text-sidebar-primary-foreground">`);
      if (siteLogo.value) {
        _push(`<img${ssrRenderAttr("src", siteLogo.value)}${ssrRenderAttr("alt", siteName.value)} class="size-8 object-contain rounded-md">`);
      } else {
        _push(ssrRenderComponent(_sfc_main$$, { class: "size-5 fill-current text-white dark:text-black" }, null, _parent));
      }
      _push(`</div><div class="ml-1 grid flex-1 text-left text-sm"><span class="mb-0.5 truncate leading-tight font-semibold">${ssrInterpolate(siteName.value)}</span></div><!--]-->`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/AppLogo.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "AppSidebar",
  __ssrInlineRender: true,
  setup(__props) {
    const mainNavItems = [
      {
        title: "Dashboard",
        href: dashboard(),
        icon: LayoutGrid
      },
      {
        title: "Kelola",
        href: "#",
        icon: Settings,
        items: [
          {
            title: "User",
            href: index$j(),
            icon: Users
          },
          {
            title: "Pelanggan",
            href: index$i(),
            icon: Users2Icon
          },
          {
            title: "Stokist",
            href: index$h(),
            icon: Store
          }
        ]
      },
      {
        title: "E-Commerce",
        href: "#",
        icon: ShoppingCart,
        items: [
          {
            title: "Produk",
            href: index$g(),
            icon: Package
          },
          {
            title: "Kategori Produk",
            href: index$f(),
            icon: FolderTree
          },
          {
            title: "Artikel & Blog",
            href: index$e(),
            icon: FileEdit
          },
          {
            title: "Halaman Statis",
            href: index$d(),
            icon: FileText
          },
          {
            title: "Keranjang Pelanggan",
            href: "/admin/carts",
            icon: ShoppingCart
          },
          {
            title: "Wishlist Pelanggan",
            href: "/admin/wishlists",
            icon: Heart
          },
          {
            title: "Review Produk",
            href: index$c(),
            icon: Star
          },
          {
            title: "Promosi & Diskon",
            href: index$b(),
            icon: BadgePercent
          }
        ]
      },
      {
        title: "Pembelian",
        href: "#",
        icon: Package,
        items: [
          {
            title: "Semua Pesanan",
            href: "/admin/orders",
            icon: FileText
          },
          {
            title: "Pesanan Pending",
            href: "/admin/orders/pending",
            icon: Package
          },
          {
            title: "Pesanan Dibayar",
            href: "/admin/orders/paid",
            icon: CreditCard
          },
          {
            title: "Pengiriman",
            href: index$a(),
            icon: Truck
          },
          {
            title: "Pesanan Selesai",
            href: "/admin/orders/completed",
            icon: BadgePercent
          },
          {
            title: "Retur & Refund",
            href: indexReturns(),
            icon: ArrowLeftRight
          }
        ]
      },
      {
        title: "Bonus & Komisi MLM",
        href: "#",
        icon: TrendingUp,
        items: [
          {
            title: "Bonus Sponsor",
            href: index$q(),
            icon: Wallet
          },
          {
            title: "Bonus Matching",
            href: index$p(),
            icon: WalletCards
          },
          {
            title: "Bonus Pairing",
            href: index$o(),
            icon: Wallet2Icon
          },
          {
            title: "Bonus Cashback",
            href: index$n(),
            icon: WalletIcon
          },
          {
            title: "Bonus Reward",
            href: index$m(),
            icon: Gift
          },
          {
            title: "Bonus Retail",
            href: index$l(),
            icon: ShoppingCart
          },
          {
            title: "Promotions Progress",
            href: promotionsProgress.url(),
            icon: TrendingUp
          },
          {
            title: " bonus Lifetime Cash Reward",
            href: index$k(),
            icon: Infinity
          }
        ]
      },
      {
        title: "E-Wallet",
        href: "#",
        icon: Wallet2,
        items: [
          {
            title: "Saldo Pelanggan",
            href: "/admin/wallets",
            icon: Wallet
          },
          {
            title: "Transaksi Wallet",
            href: "/admin/wallet-transactions",
            icon: WalletCards
          },
          {
            title: "Permintaan Top Up",
            href: index$9(),
            icon: CreditCard
          },
          {
            title: "Permintaan Withdrawal",
            href: index$8(),
            icon: ArrowLeftRight
          }
        ]
      },
      {
        title: "Jaringan MLM",
        href: "#",
        icon: Grid3x3,
        items: [
          {
            title: "Jaringan Binary",
            href: index$7(),
            icon: Grid3x3
          },
          {
            title: "Jaringan Sponsor",
            href: index$6(),
            icon: FolderTree
          }
        ]
      },
      {
        title: "Laporan",
        href: "#",
        icon: BookOpen,
        items: [
          {
            title: "Analytic",
            href: index$7(),
            icon: ChartBar
          },
          {
            title: "Tax Daily Report",
            href: index$6(),
            icon: BookCheck
          },
          {
            title: "Tax Summary Report",
            href: index$6(),
            icon: BookDashed
          }
        ]
      },
      {
        title: "Pengaturan",
        href: "#",
        icon: Settings,
        items: [
          {
            title: "Pengaturan Ecommerce",
            href: index$2(),
            icon: Settings
          },
          {
            title: "Alamat Pelanggan",
            href: index$5(),
            icon: MapPin
          },
          {
            title: "Metode Pembayaran",
            href: index$4(),
            icon: CreditCard
          },
          {
            title: "Kurir Pengiriman",
            href: index$3(),
            icon: Truck
          },
          {
            title: "Newsletter",
            href: "/admin/settings/newsletters",
            icon: FileText
          },
          {
            title: "Promotions Rewards",
            href: promotions.url(),
            icon: Gift
          },
          {
            title: "Lifetime Cash Rewards",
            href: lifetime.url(),
            icon: Infinity
          },
          {
            title: "Paket Member",
            href: index$1(),
            icon: Package
          }
        ]
      }
    ];
    const footerNavItems = [
      {
        title: "Documentation",
        href: index(),
        icon: BookOpen
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(_sfc_main$I), {
        collapsible: "icon",
        variant: "inset"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$B), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$y), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$p), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$q), {
                                size: "lg",
                                "as-child": ""
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(Link), {
                                      href: unref(dashboard)()
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_sfc_main$5, null, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_sfc_main$5)
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(Link), {
                                        href: unref(dashboard)()
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_sfc_main$5)
                                        ]),
                                        _: 1
                                      }, 8, ["href"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$q), {
                                  size: "lg",
                                  "as-child": ""
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Link), {
                                      href: unref(dashboard)()
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_sfc_main$5)
                                      ]),
                                      _: 1
                                    }, 8, ["href"])
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
                          createVNode(unref(_sfc_main$p), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$q), {
                                size: "lg",
                                "as-child": ""
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Link), {
                                    href: unref(dashboard)()
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_sfc_main$5)
                                    ]),
                                    _: 1
                                  }, 8, ["href"])
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
                    createVNode(unref(_sfc_main$y), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$p), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$q), {
                              size: "lg",
                              "as-child": ""
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Link), {
                                  href: unref(dashboard)()
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_sfc_main$5)
                                  ]),
                                  _: 1
                                }, 8, ["href"])
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
            _push2(ssrRenderComponent(unref(_sfc_main$H), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$9, { items: mainNavItems }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$9, { items: mainNavItems })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$G), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$d, { items: footerNavItems }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$6, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$d, { items: footerNavItems }),
                    createVNode(_sfc_main$6)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$B), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$y), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$p), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$q), {
                            size: "lg",
                            "as-child": ""
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Link), {
                                href: unref(dashboard)()
                              }, {
                                default: withCtx(() => [
                                  createVNode(_sfc_main$5)
                                ]),
                                _: 1
                              }, 8, ["href"])
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
              createVNode(unref(_sfc_main$H), null, {
                default: withCtx(() => [
                  createVNode(_sfc_main$9, { items: mainNavItems })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$G), null, {
                default: withCtx(() => [
                  createVNode(_sfc_main$d, { items: footerNavItems }),
                  createVNode(_sfc_main$6)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/AppSidebar.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Breadcrumbs",
  __ssrInlineRender: true,
  props: {
    breadcrumbs: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$10), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$11), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(__props.breadcrumbs, (item, index2) => {
                    _push3(`<!--[-->`);
                    _push3(ssrRenderComponent(unref(_sfc_main$12), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          if (index2 === __props.breadcrumbs.length - 1) {
                            _push4(ssrRenderComponent(unref(_sfc_main$13), null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(item.title)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(item.title), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            _push4(ssrRenderComponent(unref(_sfc_main$14), { "as-child": "" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(unref(Link), {
                                    href: item.href ?? "#"
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(item.title)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(item.title), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(unref(Link), {
                                      href: item.href ?? "#"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(item.title), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["href"])
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          }
                        } else {
                          return [
                            index2 === __props.breadcrumbs.length - 1 ? (openBlock(), createBlock(unref(_sfc_main$13), { key: 0 }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item.title), 1)
                              ]),
                              _: 2
                            }, 1024)) : (openBlock(), createBlock(unref(_sfc_main$14), {
                              key: 1,
                              "as-child": ""
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Link), {
                                  href: item.href ?? "#"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(item.title), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["href"])
                              ]),
                              _: 2
                            }, 1024))
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    if (index2 !== __props.breadcrumbs.length - 1) {
                      _push3(ssrRenderComponent(unref(_sfc_main$15), null, null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<!--]-->`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.breadcrumbs, (item, index2) => {
                      return openBlock(), createBlock(Fragment, { key: index2 }, [
                        createVNode(unref(_sfc_main$12), null, {
                          default: withCtx(() => [
                            index2 === __props.breadcrumbs.length - 1 ? (openBlock(), createBlock(unref(_sfc_main$13), { key: 0 }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item.title), 1)
                              ]),
                              _: 2
                            }, 1024)) : (openBlock(), createBlock(unref(_sfc_main$14), {
                              key: 1,
                              "as-child": ""
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Link), {
                                  href: item.href ?? "#"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(item.title), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["href"])
                              ]),
                              _: 2
                            }, 1024))
                          ]),
                          _: 2
                        }, 1024),
                        index2 !== __props.breadcrumbs.length - 1 ? (openBlock(), createBlock(unref(_sfc_main$15), { key: 0 })) : createCommentVNode("", true)
                      ], 64);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$11), null, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.breadcrumbs, (item, index2) => {
                    return openBlock(), createBlock(Fragment, { key: index2 }, [
                      createVNode(unref(_sfc_main$12), null, {
                        default: withCtx(() => [
                          index2 === __props.breadcrumbs.length - 1 ? (openBlock(), createBlock(unref(_sfc_main$13), { key: 0 }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.title), 1)
                            ]),
                            _: 2
                          }, 1024)) : (openBlock(), createBlock(unref(_sfc_main$14), {
                            key: 1,
                            "as-child": ""
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Link), {
                                href: item.href ?? "#"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.title), 1)
                                ]),
                                _: 2
                              }, 1032, ["href"])
                            ]),
                            _: 2
                          }, 1024))
                        ]),
                        _: 2
                      }, 1024),
                      index2 !== __props.breadcrumbs.length - 1 ? (openBlock(), createBlock(unref(_sfc_main$15), { key: 0 })) : createCommentVNode("", true)
                    ], 64);
                  }), 128))
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Breadcrumbs.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AppSidebarHeader",
  __ssrInlineRender: true,
  props: {
    breadcrumbs: { default: () => [] }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "flex h-16 shrink-0 items-center gap-2 border-b border-sidebar-border/70 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4" }, _attrs))}><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(unref(_sfc_main$g), { class: "-ml-1" }, null, _parent));
      if (__props.breadcrumbs && __props.breadcrumbs.length > 0) {
        _push(ssrRenderComponent(_sfc_main$3, { breadcrumbs: __props.breadcrumbs }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></header>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/AppSidebarHeader.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AppSidebarLayout",
  __ssrInlineRender: true,
  props: {
    breadcrumbs: { default: () => [] }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$e, mergeProps({ variant: "sidebar" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$4, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$f, {
              variant: "sidebar",
              class: "overflow-x-hidden"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$2, { breadcrumbs: __props.breadcrumbs }, null, _parent3, _scopeId2));
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    createVNode(_sfc_main$2, { breadcrumbs: __props.breadcrumbs }, null, 8, ["breadcrumbs"]),
                    renderSlot(_ctx.$slots, "default")
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$4),
              createVNode(_sfc_main$f, {
                variant: "sidebar",
                class: "overflow-x-hidden"
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$2, { breadcrumbs: __props.breadcrumbs }, null, 8, ["breadcrumbs"]),
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              })
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/layouts/app/AppSidebarLayout.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AppLayout",
  __ssrInlineRender: true,
  props: {
    breadcrumbs: { default: () => [] }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ breadcrumbs: __props.breadcrumbs }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/layouts/AppLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  massRelease$4 as $,
  update$3 as A,
  getCities as B,
  index$h as C,
  store$5 as D,
  update$9 as E,
  create$5 as F,
  edit$6 as G,
  destroy$8 as H,
  approve$1 as I,
  reject$1 as J,
  reject as K,
  approve as L,
  index$n as M,
  destroy$e as N,
  release$3 as O,
  massRelease$3 as P,
  index$k as Q,
  destroy$b as R,
  release as S,
  massRelease as T,
  UserController as U,
  index$p as V,
  create$d as W,
  store$d as X,
  destroy$g as Y,
  release$5 as Z,
  _sfc_main as _,
  _sfc_main$o as a,
  show$c as a0,
  index$o as a1,
  create$c as a2,
  store$c as a3,
  destroy$f as a4,
  release$4 as a5,
  flush as a6,
  show$b as a7,
  index$l as a8,
  destroy$c as a9,
  release$1 as aa,
  massRelease$1 as ab,
  index$m as ac,
  destroy$d as ad,
  release$2 as ae,
  massRelease$2 as af,
  index$q as ag,
  create$e as ah,
  store$e as ai,
  show$d as aj,
  destroy$h as ak,
  release$6 as al,
  massRelease$5 as am,
  edit as an,
  show$5 as b,
  create$6 as c,
  destroy$9 as d,
  edit$7 as e,
  deduct as f,
  index$b as g,
  create as h,
  index$i as i,
  destroy$2 as j,
  edit$1 as k,
  loginAsCustomer as l,
  indexRefunds as m,
  indexReturns as n,
  approveReturn as o,
  processRefund as p,
  rejectReturn as q,
  releaseBonuses as r,
  store$6 as s,
  topUp as t,
  update$a as u,
  approve$2 as v,
  reject$2 as w,
  destroy$3 as x,
  index$1 as y,
  index$a as z
};
