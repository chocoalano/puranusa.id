import { defineComponent, computed, unref, withCtx, createTextVNode, createVNode, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import { _ as _sfc_main$2, a as _sfc_main$3, b as _sfc_main$4, c as _sfc_main$5, d as _sfc_main$6 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$7 } from "./index-BpQimeTM.js";
import { _ as _sfc_main$1 } from "./AppLayout-CDfd8drY.js";
import { d as dashboard } from "./index-Jhngbhhu.js";
import { Head } from "@inertiajs/vue3";
import { DollarSign, ShoppingCart, Users, Package, Activity, Wallet, Award, TrendingUp } from "lucide-vue-next";
import { VisXYContainer, VisArea, VisLine, VisAxis, VisTooltip, VisGroupedBar } from "@unovis/vue";
import "./index-SN_CnQ_F.js";
import "class-variance-authority";
import "reka-ui";
import "clsx";
import "tailwind-merge";
import "@vueuse/core";
import "./DropdownMenuTrigger-B1v6pHML.js";
import "./Input-BGi8wCMh.js";
import "./AvatarImage-DWFQMckn.js";
import "vue-sonner";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Dashboard",
  __ssrInlineRender: true,
  props: {
    stats: {}
  },
  setup(__props) {
    const props = __props;
    const monthlyRevenueData = computed(() => props.stats.monthlyRevenue || []);
    const dailySalesData = computed(() => props.stats.dailySales || []);
    const revenueChartConfig = {
      revenue: {
        color: "hsl(var(--primary))"
      }
    };
    const dailySalesChartConfig = {
      orders: {
        color: "hsl(var(--chart-1))"
      },
      revenue: {
        color: "hsl(var(--chart-2))"
      }
    };
    const breadcrumbs = [
      {
        title: "Dashboard",
        href: dashboard().url
      }
    ];
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(amount);
    };
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
    };
    const getStatusVariant = (status) => {
      const statusMap = {
        PENDING: "secondary",
        PAID: "default",
        PROCESSING: "default",
        SHIPPED: "default",
        COMPLETED: "default",
        CANCELLED: "destructive"
      };
      return statusMap[status.toUpperCase()] || "outline";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Dashboard" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, { breadcrumbs }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4 py-6"${_scopeId}><div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Total Revenue`);
                            } else {
                              return [
                                createTextVNode("Total Revenue")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(DollarSign), { class: "h-4 w-4 text-muted-foreground" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Total Revenue")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(DollarSign), { class: "h-4 w-4 text-muted-foreground" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-2xl font-bold"${_scopeId3}>${ssrInterpolate(formatCurrency(__props.stats.totalRevenue))}</div><p class="text-xs text-muted-foreground"${_scopeId3}> Dari ${ssrInterpolate(__props.stats.totalOrders)} pesanan </p>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatCurrency(__props.stats.totalRevenue)), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, " Dari " + toDisplayString(__props.stats.totalOrders) + " pesanan ", 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                          default: withCtx(() => [
                            createTextVNode("Total Revenue")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(DollarSign), { class: "h-4 w-4 text-muted-foreground" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatCurrency(__props.stats.totalRevenue)), 1),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, " Dari " + toDisplayString(__props.stats.totalOrders) + " pesanan ", 1)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Total Orders`);
                            } else {
                              return [
                                createTextVNode("Total Orders")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(ShoppingCart), { class: "h-4 w-4 text-muted-foreground" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Total Orders")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(ShoppingCart), { class: "h-4 w-4 text-muted-foreground" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-2xl font-bold"${_scopeId3}>${ssrInterpolate(__props.stats.totalOrders)}</div><p class="text-xs text-muted-foreground"${_scopeId3}>${ssrInterpolate(__props.stats.pendingOrders)} pending </p>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.stats.totalOrders), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(__props.stats.pendingOrders) + " pending ", 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                          default: withCtx(() => [
                            createTextVNode("Total Orders")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(ShoppingCart), { class: "h-4 w-4 text-muted-foreground" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.stats.totalOrders), 1),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(__props.stats.pendingOrders) + " pending ", 1)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Total Customers`);
                            } else {
                              return [
                                createTextVNode("Total Customers")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(Users), { class: "h-4 w-4 text-muted-foreground" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Total Customers")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(Users), { class: "h-4 w-4 text-muted-foreground" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-2xl font-bold"${_scopeId3}>${ssrInterpolate(__props.stats.totalCustomers)}</div><p class="text-xs text-muted-foreground"${_scopeId3}>${ssrInterpolate(__props.stats.activeCustomers)} active </p>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.stats.totalCustomers), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(__props.stats.activeCustomers) + " active ", 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                          default: withCtx(() => [
                            createTextVNode("Total Customers")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(Users), { class: "h-4 w-4 text-muted-foreground" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.stats.totalCustomers), 1),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(__props.stats.activeCustomers) + " active ", 1)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Total Products`);
                            } else {
                              return [
                                createTextVNode("Total Products")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(Package), { class: "h-4 w-4 text-muted-foreground" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Total Products")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(Package), { class: "h-4 w-4 text-muted-foreground" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-2xl font-bold"${_scopeId3}>${ssrInterpolate(__props.stats.totalProducts)}</div><p class="text-xs text-muted-foreground"${_scopeId3}>Active products</p>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.stats.totalProducts), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Active products")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                          default: withCtx(() => [
                            createTextVNode("Total Products")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(Package), { class: "h-4 w-4 text-muted-foreground" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.stats.totalProducts), 1),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, "Active products")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Total Business Value`);
                            } else {
                              return [
                                createTextVNode("Total Business Value")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(Activity), { class: "h-4 w-4 text-muted-foreground" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Total Business Value")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(Activity), { class: "h-4 w-4 text-muted-foreground" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-2xl font-bold"${_scopeId3}>${ssrInterpolate(formatCurrency(__props.stats.totalBV))}</div><p class="text-xs text-muted-foreground"${_scopeId3}>Total BV accumulated</p>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatCurrency(__props.stats.totalBV)), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Total BV accumulated")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                          default: withCtx(() => [
                            createTextVNode("Total Business Value")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(Activity), { class: "h-4 w-4 text-muted-foreground" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatCurrency(__props.stats.totalBV)), 1),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, "Total BV accumulated")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Total Bonuses`);
                            } else {
                              return [
                                createTextVNode("Total Bonuses")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(Wallet), { class: "h-4 w-4 text-muted-foreground" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Total Bonuses")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(Wallet), { class: "h-4 w-4 text-muted-foreground" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-2xl font-bold"${_scopeId3}>${ssrInterpolate(formatCurrency(__props.stats.totalBonuses))}</div><p class="text-xs text-muted-foreground"${_scopeId3}>All bonus types</p>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatCurrency(__props.stats.totalBonuses)), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "All bonus types")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                          default: withCtx(() => [
                            createTextVNode("Total Bonuses")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(Wallet), { class: "h-4 w-4 text-muted-foreground" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatCurrency(__props.stats.totalBonuses)), 1),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, "All bonus types")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Network Members`);
                            } else {
                              return [
                                createTextVNode("Network Members")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(Award), { class: "h-4 w-4 text-muted-foreground" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Network Members")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(Award), { class: "h-4 w-4 text-muted-foreground" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-2xl font-bold"${_scopeId3}>${ssrInterpolate(__props.stats.totalNetworkMembers)}</div><p class="text-xs text-muted-foreground"${_scopeId3}>Total MLM members</p>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.stats.totalNetworkMembers), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Total MLM members")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                          default: withCtx(() => [
                            createTextVNode("Network Members")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(Award), { class: "h-4 w-4 text-muted-foreground" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.stats.totalNetworkMembers), 1),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, "Total MLM members")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Completed Orders`);
                            } else {
                              return [
                                createTextVNode("Completed Orders")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(TrendingUp), { class: "h-4 w-4 text-muted-foreground" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Completed Orders")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(TrendingUp), { class: "h-4 w-4 text-muted-foreground" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-2xl font-bold"${_scopeId3}>${ssrInterpolate(__props.stats.completedOrders)}</div><p class="text-xs text-muted-foreground"${_scopeId3}>${ssrInterpolate((__props.stats.completedOrders / __props.stats.totalOrders * 100).toFixed(1))}% completion rate </p>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.stats.completedOrders), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString((__props.stats.completedOrders / __props.stats.totalOrders * 100).toFixed(1)) + "% completion rate ", 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                          default: withCtx(() => [
                            createTextVNode("Completed Orders")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(TrendingUp), { class: "h-4 w-4 text-muted-foreground" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.stats.completedOrders), 1),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString((__props.stats.completedOrders / __props.stats.totalOrders * 100).toFixed(1)) + "% completion rate ", 1)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="grid gap-4 md:grid-cols-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$4), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Recent Orders`);
                            } else {
                              return [
                                createTextVNode("Recent Orders")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Latest 5 orders from customers`);
                            } else {
                              return [
                                createTextVNode("Latest 5 orders from customers")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$4), null, {
                            default: withCtx(() => [
                              createTextVNode("Recent Orders")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("Latest 5 orders from customers")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="space-y-4"${_scopeId3}><!--[-->`);
                        ssrRenderList(__props.stats.recentOrders, (order) => {
                          _push4(`<div class="flex items-center justify-between border-b pb-3 last:border-0"${_scopeId3}><div class="space-y-1"${_scopeId3}><p class="text-sm font-medium"${_scopeId3}>${ssrInterpolate(order.order_no)}</p><p class="text-xs text-muted-foreground"${_scopeId3}>${ssrInterpolate(order.customer_name)}</p><p class="text-xs text-muted-foreground"${_scopeId3}>${ssrInterpolate(formatDate(order.created_at))}</p></div><div class="flex flex-col items-end gap-2"${_scopeId3}>`);
                          _push4(ssrRenderComponent(unref(_sfc_main$7), {
                            variant: getStatusVariant(order.status)
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(order.status)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(order.status), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(`<p class="text-sm font-bold"${_scopeId3}>${ssrInterpolate(formatCurrency(order.grand_total))}</p></div></div>`);
                        });
                        _push4(`<!--]-->`);
                        if (!__props.stats.recentOrders || __props.stats.recentOrders.length === 0) {
                          _push4(`<div class="py-8 text-center text-sm text-muted-foreground"${_scopeId3}> No recent orders </div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "space-y-4" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.stats.recentOrders, (order) => {
                              return openBlock(), createBlock("div", {
                                key: order.order_no,
                                class: "flex items-center justify-between border-b pb-3 last:border-0"
                              }, [
                                createVNode("div", { class: "space-y-1" }, [
                                  createVNode("p", { class: "text-sm font-medium" }, toDisplayString(order.order_no), 1),
                                  createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(order.customer_name), 1),
                                  createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(formatDate(order.created_at)), 1)
                                ]),
                                createVNode("div", { class: "flex flex-col items-end gap-2" }, [
                                  createVNode(unref(_sfc_main$7), {
                                    variant: getStatusVariant(order.status)
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(order.status), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["variant"]),
                                  createVNode("p", { class: "text-sm font-bold" }, toDisplayString(formatCurrency(order.grand_total)), 1)
                                ])
                              ]);
                            }), 128)),
                            !__props.stats.recentOrders || __props.stats.recentOrders.length === 0 ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "py-8 text-center text-sm text-muted-foreground"
                            }, " No recent orders ")) : createCommentVNode("", true)
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$4), null, {
                          default: withCtx(() => [
                            createTextVNode("Recent Orders")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode("Latest 5 orders from customers")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "space-y-4" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.stats.recentOrders, (order) => {
                            return openBlock(), createBlock("div", {
                              key: order.order_no,
                              class: "flex items-center justify-between border-b pb-3 last:border-0"
                            }, [
                              createVNode("div", { class: "space-y-1" }, [
                                createVNode("p", { class: "text-sm font-medium" }, toDisplayString(order.order_no), 1),
                                createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(order.customer_name), 1),
                                createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(formatDate(order.created_at)), 1)
                              ]),
                              createVNode("div", { class: "flex flex-col items-end gap-2" }, [
                                createVNode(unref(_sfc_main$7), {
                                  variant: getStatusVariant(order.status)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(order.status), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["variant"]),
                                createVNode("p", { class: "text-sm font-bold" }, toDisplayString(formatCurrency(order.grand_total)), 1)
                              ])
                            ]);
                          }), 128)),
                          !__props.stats.recentOrders || __props.stats.recentOrders.length === 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "py-8 text-center text-sm text-muted-foreground"
                          }, " No recent orders ")) : createCommentVNode("", true)
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$4), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Top Products`);
                            } else {
                              return [
                                createTextVNode("Top Products")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Best selling products`);
                            } else {
                              return [
                                createTextVNode("Best selling products")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$4), null, {
                            default: withCtx(() => [
                              createTextVNode("Top Products")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("Best selling products")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="space-y-4"${_scopeId3}><!--[-->`);
                        ssrRenderList(__props.stats.topProducts, (product, index) => {
                          _push4(`<div class="flex items-center justify-between border-b pb-3 last:border-0"${_scopeId3}><div class="flex items-center gap-3"${_scopeId3}><div class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground"${_scopeId3}>${ssrInterpolate(index + 1)}</div><div class="space-y-1"${_scopeId3}><p class="text-sm font-medium leading-tight"${_scopeId3}>${ssrInterpolate(product.name)}</p><p class="text-xs text-muted-foreground"${_scopeId3}>${ssrInterpolate(product.total_sold)} sold </p></div></div><p class="text-sm font-bold"${_scopeId3}>${ssrInterpolate(formatCurrency(product.total_revenue))}</p></div>`);
                        });
                        _push4(`<!--]-->`);
                        if (!__props.stats.topProducts || __props.stats.topProducts.length === 0) {
                          _push4(`<div class="py-8 text-center text-sm text-muted-foreground"${_scopeId3}> No product sales yet </div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "space-y-4" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.stats.topProducts, (product, index) => {
                              return openBlock(), createBlock("div", {
                                key: product.name,
                                class: "flex items-center justify-between border-b pb-3 last:border-0"
                              }, [
                                createVNode("div", { class: "flex items-center gap-3" }, [
                                  createVNode("div", { class: "flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground" }, toDisplayString(index + 1), 1),
                                  createVNode("div", { class: "space-y-1" }, [
                                    createVNode("p", { class: "text-sm font-medium leading-tight" }, toDisplayString(product.name), 1),
                                    createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(product.total_sold) + " sold ", 1)
                                  ])
                                ]),
                                createVNode("p", { class: "text-sm font-bold" }, toDisplayString(formatCurrency(product.total_revenue)), 1)
                              ]);
                            }), 128)),
                            !__props.stats.topProducts || __props.stats.topProducts.length === 0 ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "py-8 text-center text-sm text-muted-foreground"
                            }, " No product sales yet ")) : createCommentVNode("", true)
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$4), null, {
                          default: withCtx(() => [
                            createTextVNode("Top Products")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode("Best selling products")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "space-y-4" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.stats.topProducts, (product, index) => {
                            return openBlock(), createBlock("div", {
                              key: product.name,
                              class: "flex items-center justify-between border-b pb-3 last:border-0"
                            }, [
                              createVNode("div", { class: "flex items-center gap-3" }, [
                                createVNode("div", { class: "flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground" }, toDisplayString(index + 1), 1),
                                createVNode("div", { class: "space-y-1" }, [
                                  createVNode("p", { class: "text-sm font-medium leading-tight" }, toDisplayString(product.name), 1),
                                  createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(product.total_sold) + " sold ", 1)
                                ])
                              ]),
                              createVNode("p", { class: "text-sm font-bold" }, toDisplayString(formatCurrency(product.total_revenue)), 1)
                            ]);
                          }), 128)),
                          !__props.stats.topProducts || __props.stats.topProducts.length === 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "py-8 text-center text-sm text-muted-foreground"
                          }, " No product sales yet ")) : createCommentVNode("", true)
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="grid gap-4 md:grid-cols-2"${_scopeId}>`);
            if (__props.stats.monthlyRevenue && __props.stats.monthlyRevenue.length > 0) {
              _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(_sfc_main$4), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Monthly Revenue`);
                              } else {
                                return [
                                  createTextVNode("Monthly Revenue")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Revenue over the past 6 months`);
                              } else {
                                return [
                                  createTextVNode("Revenue over the past 6 months")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(_sfc_main$4), null, {
                              default: withCtx(() => [
                                createTextVNode("Monthly Revenue")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$6), null, {
                              default: withCtx(() => [
                                createTextVNode("Revenue over the past 6 months")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="h-[300px]"${_scopeId3}>`);
                          _push4(ssrRenderComponent(unref(VisXYContainer), {
                            data: monthlyRevenueData.value,
                            height: 300
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(VisArea), {
                                  x: (d, i) => i,
                                  y: (d) => d.revenue,
                                  color: revenueChartConfig.revenue.color,
                                  opacity: 0.3
                                }, null, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(VisLine), {
                                  x: (d, i) => i,
                                  y: (d) => d.revenue,
                                  color: revenueChartConfig.revenue.color
                                }, null, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(VisAxis), {
                                  type: "x",
                                  "tick-format": (d) => monthlyRevenueData.value[d]?.month || "",
                                  "tick-values": monthlyRevenueData.value.map((_5, i) => i),
                                  "tick-line": false,
                                  "domain-line": false,
                                  "grid-line": false
                                }, null, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(VisAxis), {
                                  type: "y",
                                  "tick-format": (d) => "Rp " + (d / 1e6).toFixed(0) + "M",
                                  "tick-line": false,
                                  "domain-line": false,
                                  "grid-line": true
                                }, null, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(VisTooltip), {
                                  triggers: {
                                    "circle": (d, i) => `
                                        <div class='rounded-lg border bg-background p-3 shadow-lg'>
                                            <div class='font-semibold mb-1'>${monthlyRevenueData.value[i]?.month || ""}</div>
                                            <div class='text-sm text-muted-foreground'>Revenue: ${formatCurrency(monthlyRevenueData.value[i]?.revenue || 0)}</div>
                                            <div class='text-sm text-muted-foreground'>${monthlyRevenueData.value[i]?.orders || 0} orders</div>
                                        </div>
                                    `
                                  }
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(VisArea), {
                                    x: (d, i) => i,
                                    y: (d) => d.revenue,
                                    color: revenueChartConfig.revenue.color,
                                    opacity: 0.3
                                  }, null, 8, ["x", "y", "color"]),
                                  createVNode(unref(VisLine), {
                                    x: (d, i) => i,
                                    y: (d) => d.revenue,
                                    color: revenueChartConfig.revenue.color
                                  }, null, 8, ["x", "y", "color"]),
                                  createVNode(unref(VisAxis), {
                                    type: "x",
                                    "tick-format": (d) => monthlyRevenueData.value[d]?.month || "",
                                    "tick-values": monthlyRevenueData.value.map((_5, i) => i),
                                    "tick-line": false,
                                    "domain-line": false,
                                    "grid-line": false
                                  }, null, 8, ["tick-format", "tick-values"]),
                                  createVNode(unref(VisAxis), {
                                    type: "y",
                                    "tick-format": (d) => "Rp " + (d / 1e6).toFixed(0) + "M",
                                    "tick-line": false,
                                    "domain-line": false,
                                    "grid-line": true
                                  }, null, 8, ["tick-format"]),
                                  createVNode(unref(VisTooltip), {
                                    triggers: {
                                      "circle": (d, i) => `
                                        <div class='rounded-lg border bg-background p-3 shadow-lg'>
                                            <div class='font-semibold mb-1'>${monthlyRevenueData.value[i]?.month || ""}</div>
                                            <div class='text-sm text-muted-foreground'>Revenue: ${formatCurrency(monthlyRevenueData.value[i]?.revenue || 0)}</div>
                                            <div class='text-sm text-muted-foreground'>${monthlyRevenueData.value[i]?.orders || 0} orders</div>
                                        </div>
                                    `
                                    }
                                  }, null, 8, ["triggers"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          return [
                            createVNode("div", { class: "h-[300px]" }, [
                              createVNode(unref(VisXYContainer), {
                                data: monthlyRevenueData.value,
                                height: 300
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(VisArea), {
                                    x: (d, i) => i,
                                    y: (d) => d.revenue,
                                    color: revenueChartConfig.revenue.color,
                                    opacity: 0.3
                                  }, null, 8, ["x", "y", "color"]),
                                  createVNode(unref(VisLine), {
                                    x: (d, i) => i,
                                    y: (d) => d.revenue,
                                    color: revenueChartConfig.revenue.color
                                  }, null, 8, ["x", "y", "color"]),
                                  createVNode(unref(VisAxis), {
                                    type: "x",
                                    "tick-format": (d) => monthlyRevenueData.value[d]?.month || "",
                                    "tick-values": monthlyRevenueData.value.map((_4, i) => i),
                                    "tick-line": false,
                                    "domain-line": false,
                                    "grid-line": false
                                  }, null, 8, ["tick-format", "tick-values"]),
                                  createVNode(unref(VisAxis), {
                                    type: "y",
                                    "tick-format": (d) => "Rp " + (d / 1e6).toFixed(0) + "M",
                                    "tick-line": false,
                                    "domain-line": false,
                                    "grid-line": true
                                  }, null, 8, ["tick-format"]),
                                  createVNode(unref(VisTooltip), {
                                    triggers: {
                                      "circle": (d, i) => `
                                        <div class='rounded-lg border bg-background p-3 shadow-lg'>
                                            <div class='font-semibold mb-1'>${monthlyRevenueData.value[i]?.month || ""}</div>
                                            <div class='text-sm text-muted-foreground'>Revenue: ${formatCurrency(monthlyRevenueData.value[i]?.revenue || 0)}</div>
                                            <div class='text-sm text-muted-foreground'>${monthlyRevenueData.value[i]?.orders || 0} orders</div>
                                        </div>
                                    `
                                    }
                                  }, null, 8, ["triggers"])
                                ]),
                                _: 1
                              }, 8, ["data"])
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$3), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$4), null, {
                            default: withCtx(() => [
                              createTextVNode("Monthly Revenue")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("Revenue over the past 6 months")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "h-[300px]" }, [
                            createVNode(unref(VisXYContainer), {
                              data: monthlyRevenueData.value,
                              height: 300
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(VisArea), {
                                  x: (d, i) => i,
                                  y: (d) => d.revenue,
                                  color: revenueChartConfig.revenue.color,
                                  opacity: 0.3
                                }, null, 8, ["x", "y", "color"]),
                                createVNode(unref(VisLine), {
                                  x: (d, i) => i,
                                  y: (d) => d.revenue,
                                  color: revenueChartConfig.revenue.color
                                }, null, 8, ["x", "y", "color"]),
                                createVNode(unref(VisAxis), {
                                  type: "x",
                                  "tick-format": (d) => monthlyRevenueData.value[d]?.month || "",
                                  "tick-values": monthlyRevenueData.value.map((_3, i) => i),
                                  "tick-line": false,
                                  "domain-line": false,
                                  "grid-line": false
                                }, null, 8, ["tick-format", "tick-values"]),
                                createVNode(unref(VisAxis), {
                                  type: "y",
                                  "tick-format": (d) => "Rp " + (d / 1e6).toFixed(0) + "M",
                                  "tick-line": false,
                                  "domain-line": false,
                                  "grid-line": true
                                }, null, 8, ["tick-format"]),
                                createVNode(unref(VisTooltip), {
                                  triggers: {
                                    "circle": (d, i) => `
                                        <div class='rounded-lg border bg-background p-3 shadow-lg'>
                                            <div class='font-semibold mb-1'>${monthlyRevenueData.value[i]?.month || ""}</div>
                                            <div class='text-sm text-muted-foreground'>Revenue: ${formatCurrency(monthlyRevenueData.value[i]?.revenue || 0)}</div>
                                            <div class='text-sm text-muted-foreground'>${monthlyRevenueData.value[i]?.orders || 0} orders</div>
                                        </div>
                                    `
                                  }
                                }, null, 8, ["triggers"])
                              ]),
                              _: 1
                            }, 8, ["data"])
                          ])
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (__props.stats.orderStatusDistribution && __props.stats.orderStatusDistribution.length > 0) {
              _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(_sfc_main$4), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Order Status Distribution`);
                              } else {
                                return [
                                  createTextVNode("Order Status Distribution")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Breakdown of orders by status`);
                              } else {
                                return [
                                  createTextVNode("Breakdown of orders by status")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(_sfc_main$4), null, {
                              default: withCtx(() => [
                                createTextVNode("Order Status Distribution")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$6), null, {
                              default: withCtx(() => [
                                createTextVNode("Breakdown of orders by status")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="space-y-2"${_scopeId3}><!--[-->`);
                          ssrRenderList(__props.stats.orderStatusDistribution, (entry) => {
                            _push4(`<div class="flex items-center justify-between rounded-lg border p-3"${_scopeId3}><div class="flex items-center gap-3"${_scopeId3}>`);
                            _push4(ssrRenderComponent(unref(_sfc_main$7), {
                              variant: getStatusVariant(entry.status)
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(entry.status)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(entry.status), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(`</div><p class="text-sm font-bold"${_scopeId3}>${ssrInterpolate(entry.count)} orders</p></div>`);
                          });
                          _push4(`<!--]--></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "space-y-2" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.stats.orderStatusDistribution, (entry) => {
                                return openBlock(), createBlock("div", {
                                  key: entry.status,
                                  class: "flex items-center justify-between rounded-lg border p-3"
                                }, [
                                  createVNode("div", { class: "flex items-center gap-3" }, [
                                    createVNode(unref(_sfc_main$7), {
                                      variant: getStatusVariant(entry.status)
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(entry.status), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["variant"])
                                  ]),
                                  createVNode("p", { class: "text-sm font-bold" }, toDisplayString(entry.count) + " orders", 1)
                                ]);
                              }), 128))
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$3), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$4), null, {
                            default: withCtx(() => [
                              createTextVNode("Order Status Distribution")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("Breakdown of orders by status")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "space-y-2" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.stats.orderStatusDistribution, (entry) => {
                              return openBlock(), createBlock("div", {
                                key: entry.status,
                                class: "flex items-center justify-between rounded-lg border p-3"
                              }, [
                                createVNode("div", { class: "flex items-center gap-3" }, [
                                  createVNode(unref(_sfc_main$7), {
                                    variant: getStatusVariant(entry.status)
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(entry.status), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["variant"])
                                ]),
                                createVNode("p", { class: "text-sm font-bold" }, toDisplayString(entry.count) + " orders", 1)
                              ]);
                            }), 128))
                          ])
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (__props.stats.dailySales && __props.stats.dailySales.length > 0) {
              _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(_sfc_main$4), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Daily Sales (Last 7 Days)`);
                              } else {
                                return [
                                  createTextVNode("Daily Sales (Last 7 Days)")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Orders and revenue per day`);
                              } else {
                                return [
                                  createTextVNode("Orders and revenue per day")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(_sfc_main$4), null, {
                              default: withCtx(() => [
                                createTextVNode("Daily Sales (Last 7 Days)")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$6), null, {
                              default: withCtx(() => [
                                createTextVNode("Orders and revenue per day")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="h-[300px]"${_scopeId3}>`);
                          _push4(ssrRenderComponent(unref(VisXYContainer), {
                            data: dailySalesData.value,
                            height: 300
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(VisGroupedBar), {
                                  x: (d, i) => i,
                                  y: [(d) => d.orders, (d) => d.revenue / 1e4],
                                  color: [dailySalesChartConfig.orders.color, dailySalesChartConfig.revenue.color],
                                  "rounded-corners": 4,
                                  "bar-padding": "0.1",
                                  "group-padding": "0.2"
                                }, null, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(VisAxis), {
                                  type: "x",
                                  "tick-format": (d) => dailySalesData.value[d]?.date || "",
                                  "tick-values": dailySalesData.value.map((_5, i) => i),
                                  "tick-line": false,
                                  "domain-line": false,
                                  "grid-line": false
                                }, null, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(VisAxis), {
                                  type: "y",
                                  "tick-line": false,
                                  "domain-line": false,
                                  "grid-line": true
                                }, null, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(VisTooltip), {
                                  triggers: {
                                    "rect": (d, i) => `
                                    <div class='rounded-lg border bg-background p-3 shadow-lg'>
                                        <div class='font-semibold mb-2'>${dailySalesData.value[i]?.date || ""}</div>
                                        <div class='flex items-center gap-2 text-sm mb-1'>
                                            <span style='color: ${dailySalesChartConfig.orders.color}'>●</span>
                                            <span>Orders: <strong>${dailySalesData.value[i]?.orders || 0}</strong></span>
                                        </div>
                                        <div class='flex items-center gap-2 text-sm'>
                                            <span style='color: ${dailySalesChartConfig.revenue.color}'>●</span>
                                            <span>Revenue: <strong>${formatCurrency(dailySalesData.value[i]?.revenue || 0)}</strong></span>
                                        </div>
                                    </div>
                                `
                                  }
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(VisGroupedBar), {
                                    x: (d, i) => i,
                                    y: [(d) => d.orders, (d) => d.revenue / 1e4],
                                    color: [dailySalesChartConfig.orders.color, dailySalesChartConfig.revenue.color],
                                    "rounded-corners": 4,
                                    "bar-padding": "0.1",
                                    "group-padding": "0.2"
                                  }, null, 8, ["x", "y", "color"]),
                                  createVNode(unref(VisAxis), {
                                    type: "x",
                                    "tick-format": (d) => dailySalesData.value[d]?.date || "",
                                    "tick-values": dailySalesData.value.map((_5, i) => i),
                                    "tick-line": false,
                                    "domain-line": false,
                                    "grid-line": false
                                  }, null, 8, ["tick-format", "tick-values"]),
                                  createVNode(unref(VisAxis), {
                                    type: "y",
                                    "tick-line": false,
                                    "domain-line": false,
                                    "grid-line": true
                                  }),
                                  createVNode(unref(VisTooltip), {
                                    triggers: {
                                      "rect": (d, i) => `
                                    <div class='rounded-lg border bg-background p-3 shadow-lg'>
                                        <div class='font-semibold mb-2'>${dailySalesData.value[i]?.date || ""}</div>
                                        <div class='flex items-center gap-2 text-sm mb-1'>
                                            <span style='color: ${dailySalesChartConfig.orders.color}'>●</span>
                                            <span>Orders: <strong>${dailySalesData.value[i]?.orders || 0}</strong></span>
                                        </div>
                                        <div class='flex items-center gap-2 text-sm'>
                                            <span style='color: ${dailySalesChartConfig.revenue.color}'>●</span>
                                            <span>Revenue: <strong>${formatCurrency(dailySalesData.value[i]?.revenue || 0)}</strong></span>
                                        </div>
                                    </div>
                                `
                                    }
                                  }, null, 8, ["triggers"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`<div class="mt-4 flex items-center justify-center gap-4 text-sm"${_scopeId3}><div class="flex items-center gap-2"${_scopeId3}><div class="h-3 w-3 rounded" style="${ssrRenderStyle({ backgroundColor: dailySalesChartConfig.orders.color })}"${_scopeId3}></div><span${_scopeId3}>Orders</span></div><div class="flex items-center gap-2"${_scopeId3}><div class="h-3 w-3 rounded" style="${ssrRenderStyle({ backgroundColor: dailySalesChartConfig.revenue.color })}"${_scopeId3}></div><span${_scopeId3}>Revenue (÷10K)</span></div></div></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "h-[300px]" }, [
                              createVNode(unref(VisXYContainer), {
                                data: dailySalesData.value,
                                height: 300
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(VisGroupedBar), {
                                    x: (d, i) => i,
                                    y: [(d) => d.orders, (d) => d.revenue / 1e4],
                                    color: [dailySalesChartConfig.orders.color, dailySalesChartConfig.revenue.color],
                                    "rounded-corners": 4,
                                    "bar-padding": "0.1",
                                    "group-padding": "0.2"
                                  }, null, 8, ["x", "y", "color"]),
                                  createVNode(unref(VisAxis), {
                                    type: "x",
                                    "tick-format": (d) => dailySalesData.value[d]?.date || "",
                                    "tick-values": dailySalesData.value.map((_4, i) => i),
                                    "tick-line": false,
                                    "domain-line": false,
                                    "grid-line": false
                                  }, null, 8, ["tick-format", "tick-values"]),
                                  createVNode(unref(VisAxis), {
                                    type: "y",
                                    "tick-line": false,
                                    "domain-line": false,
                                    "grid-line": true
                                  }),
                                  createVNode(unref(VisTooltip), {
                                    triggers: {
                                      "rect": (d, i) => `
                                    <div class='rounded-lg border bg-background p-3 shadow-lg'>
                                        <div class='font-semibold mb-2'>${dailySalesData.value[i]?.date || ""}</div>
                                        <div class='flex items-center gap-2 text-sm mb-1'>
                                            <span style='color: ${dailySalesChartConfig.orders.color}'>●</span>
                                            <span>Orders: <strong>${dailySalesData.value[i]?.orders || 0}</strong></span>
                                        </div>
                                        <div class='flex items-center gap-2 text-sm'>
                                            <span style='color: ${dailySalesChartConfig.revenue.color}'>●</span>
                                            <span>Revenue: <strong>${formatCurrency(dailySalesData.value[i]?.revenue || 0)}</strong></span>
                                        </div>
                                    </div>
                                `
                                    }
                                  }, null, 8, ["triggers"])
                                ]),
                                _: 1
                              }, 8, ["data"]),
                              createVNode("div", { class: "mt-4 flex items-center justify-center gap-4 text-sm" }, [
                                createVNode("div", { class: "flex items-center gap-2" }, [
                                  createVNode("div", {
                                    class: "h-3 w-3 rounded",
                                    style: { backgroundColor: dailySalesChartConfig.orders.color }
                                  }, null, 4),
                                  createVNode("span", null, "Orders")
                                ]),
                                createVNode("div", { class: "flex items-center gap-2" }, [
                                  createVNode("div", {
                                    class: "h-3 w-3 rounded",
                                    style: { backgroundColor: dailySalesChartConfig.revenue.color }
                                  }, null, 4),
                                  createVNode("span", null, "Revenue (÷10K)")
                                ])
                              ])
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$3), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$4), null, {
                            default: withCtx(() => [
                              createTextVNode("Daily Sales (Last 7 Days)")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("Orders and revenue per day")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "h-[300px]" }, [
                            createVNode(unref(VisXYContainer), {
                              data: dailySalesData.value,
                              height: 300
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(VisGroupedBar), {
                                  x: (d, i) => i,
                                  y: [(d) => d.orders, (d) => d.revenue / 1e4],
                                  color: [dailySalesChartConfig.orders.color, dailySalesChartConfig.revenue.color],
                                  "rounded-corners": 4,
                                  "bar-padding": "0.1",
                                  "group-padding": "0.2"
                                }, null, 8, ["x", "y", "color"]),
                                createVNode(unref(VisAxis), {
                                  type: "x",
                                  "tick-format": (d) => dailySalesData.value[d]?.date || "",
                                  "tick-values": dailySalesData.value.map((_3, i) => i),
                                  "tick-line": false,
                                  "domain-line": false,
                                  "grid-line": false
                                }, null, 8, ["tick-format", "tick-values"]),
                                createVNode(unref(VisAxis), {
                                  type: "y",
                                  "tick-line": false,
                                  "domain-line": false,
                                  "grid-line": true
                                }),
                                createVNode(unref(VisTooltip), {
                                  triggers: {
                                    "rect": (d, i) => `
                                    <div class='rounded-lg border bg-background p-3 shadow-lg'>
                                        <div class='font-semibold mb-2'>${dailySalesData.value[i]?.date || ""}</div>
                                        <div class='flex items-center gap-2 text-sm mb-1'>
                                            <span style='color: ${dailySalesChartConfig.orders.color}'>●</span>
                                            <span>Orders: <strong>${dailySalesData.value[i]?.orders || 0}</strong></span>
                                        </div>
                                        <div class='flex items-center gap-2 text-sm'>
                                            <span style='color: ${dailySalesChartConfig.revenue.color}'>●</span>
                                            <span>Revenue: <strong>${formatCurrency(dailySalesData.value[i]?.revenue || 0)}</strong></span>
                                        </div>
                                    </div>
                                `
                                  }
                                }, null, 8, ["triggers"])
                              ]),
                              _: 1
                            }, 8, ["data"]),
                            createVNode("div", { class: "mt-4 flex items-center justify-center gap-4 text-sm" }, [
                              createVNode("div", { class: "flex items-center gap-2" }, [
                                createVNode("div", {
                                  class: "h-3 w-3 rounded",
                                  style: { backgroundColor: dailySalesChartConfig.orders.color }
                                }, null, 4),
                                createVNode("span", null, "Orders")
                              ]),
                              createVNode("div", { class: "flex items-center gap-2" }, [
                                createVNode("div", {
                                  class: "h-3 w-3 rounded",
                                  style: { backgroundColor: dailySalesChartConfig.revenue.color }
                                }, null, 4),
                                createVNode("span", null, "Revenue (÷10K)")
                              ])
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
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4 py-6" }, [
                createVNode("div", { class: "grid gap-4 md:grid-cols-2 lg:grid-cols-4" }, [
                  createVNode(unref(_sfc_main$2), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$3), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Total Revenue")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(DollarSign), { class: "h-4 w-4 text-muted-foreground" })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatCurrency(__props.stats.totalRevenue)), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, " Dari " + toDisplayString(__props.stats.totalOrders) + " pesanan ", 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$2), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$3), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Total Orders")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(ShoppingCart), { class: "h-4 w-4 text-muted-foreground" })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.stats.totalOrders), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(__props.stats.pendingOrders) + " pending ", 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$2), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$3), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Total Customers")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(Users), { class: "h-4 w-4 text-muted-foreground" })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.stats.totalCustomers), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(__props.stats.activeCustomers) + " active ", 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$2), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$3), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Total Products")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(Package), { class: "h-4 w-4 text-muted-foreground" })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.stats.totalProducts), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Active products")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "grid gap-4 md:grid-cols-2 lg:grid-cols-4" }, [
                  createVNode(unref(_sfc_main$2), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$3), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Total Business Value")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(Activity), { class: "h-4 w-4 text-muted-foreground" })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatCurrency(__props.stats.totalBV)), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Total BV accumulated")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$2), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$3), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Total Bonuses")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(Wallet), { class: "h-4 w-4 text-muted-foreground" })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatCurrency(__props.stats.totalBonuses)), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "All bonus types")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$2), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$3), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Network Members")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(Award), { class: "h-4 w-4 text-muted-foreground" })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.stats.totalNetworkMembers), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Total MLM members")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$2), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$3), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Completed Orders")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(TrendingUp), { class: "h-4 w-4 text-muted-foreground" })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.stats.completedOrders), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString((__props.stats.completedOrders / __props.stats.totalOrders * 100).toFixed(1)) + "% completion rate ", 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                  createVNode(unref(_sfc_main$2), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$3), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$4), null, {
                            default: withCtx(() => [
                              createTextVNode("Recent Orders")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("Latest 5 orders from customers")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "space-y-4" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.stats.recentOrders, (order) => {
                              return openBlock(), createBlock("div", {
                                key: order.order_no,
                                class: "flex items-center justify-between border-b pb-3 last:border-0"
                              }, [
                                createVNode("div", { class: "space-y-1" }, [
                                  createVNode("p", { class: "text-sm font-medium" }, toDisplayString(order.order_no), 1),
                                  createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(order.customer_name), 1),
                                  createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(formatDate(order.created_at)), 1)
                                ]),
                                createVNode("div", { class: "flex flex-col items-end gap-2" }, [
                                  createVNode(unref(_sfc_main$7), {
                                    variant: getStatusVariant(order.status)
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(order.status), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["variant"]),
                                  createVNode("p", { class: "text-sm font-bold" }, toDisplayString(formatCurrency(order.grand_total)), 1)
                                ])
                              ]);
                            }), 128)),
                            !__props.stats.recentOrders || __props.stats.recentOrders.length === 0 ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "py-8 text-center text-sm text-muted-foreground"
                            }, " No recent orders ")) : createCommentVNode("", true)
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$2), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$3), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$4), null, {
                            default: withCtx(() => [
                              createTextVNode("Top Products")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("Best selling products")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "space-y-4" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.stats.topProducts, (product, index) => {
                              return openBlock(), createBlock("div", {
                                key: product.name,
                                class: "flex items-center justify-between border-b pb-3 last:border-0"
                              }, [
                                createVNode("div", { class: "flex items-center gap-3" }, [
                                  createVNode("div", { class: "flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground" }, toDisplayString(index + 1), 1),
                                  createVNode("div", { class: "space-y-1" }, [
                                    createVNode("p", { class: "text-sm font-medium leading-tight" }, toDisplayString(product.name), 1),
                                    createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(product.total_sold) + " sold ", 1)
                                  ])
                                ]),
                                createVNode("p", { class: "text-sm font-bold" }, toDisplayString(formatCurrency(product.total_revenue)), 1)
                              ]);
                            }), 128)),
                            !__props.stats.topProducts || __props.stats.topProducts.length === 0 ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "py-8 text-center text-sm text-muted-foreground"
                            }, " No product sales yet ")) : createCommentVNode("", true)
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                  __props.stats.monthlyRevenue && __props.stats.monthlyRevenue.length > 0 ? (openBlock(), createBlock(unref(_sfc_main$2), { key: 0 }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$3), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$4), null, {
                            default: withCtx(() => [
                              createTextVNode("Monthly Revenue")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("Revenue over the past 6 months")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "h-[300px]" }, [
                            createVNode(unref(VisXYContainer), {
                              data: monthlyRevenueData.value,
                              height: 300
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(VisArea), {
                                  x: (d, i) => i,
                                  y: (d) => d.revenue,
                                  color: revenueChartConfig.revenue.color,
                                  opacity: 0.3
                                }, null, 8, ["x", "y", "color"]),
                                createVNode(unref(VisLine), {
                                  x: (d, i) => i,
                                  y: (d) => d.revenue,
                                  color: revenueChartConfig.revenue.color
                                }, null, 8, ["x", "y", "color"]),
                                createVNode(unref(VisAxis), {
                                  type: "x",
                                  "tick-format": (d) => monthlyRevenueData.value[d]?.month || "",
                                  "tick-values": monthlyRevenueData.value.map((_2, i) => i),
                                  "tick-line": false,
                                  "domain-line": false,
                                  "grid-line": false
                                }, null, 8, ["tick-format", "tick-values"]),
                                createVNode(unref(VisAxis), {
                                  type: "y",
                                  "tick-format": (d) => "Rp " + (d / 1e6).toFixed(0) + "M",
                                  "tick-line": false,
                                  "domain-line": false,
                                  "grid-line": true
                                }, null, 8, ["tick-format"]),
                                createVNode(unref(VisTooltip), {
                                  triggers: {
                                    "circle": (d, i) => `
                                        <div class='rounded-lg border bg-background p-3 shadow-lg'>
                                            <div class='font-semibold mb-1'>${monthlyRevenueData.value[i]?.month || ""}</div>
                                            <div class='text-sm text-muted-foreground'>Revenue: ${formatCurrency(monthlyRevenueData.value[i]?.revenue || 0)}</div>
                                            <div class='text-sm text-muted-foreground'>${monthlyRevenueData.value[i]?.orders || 0} orders</div>
                                        </div>
                                    `
                                  }
                                }, null, 8, ["triggers"])
                              ]),
                              _: 1
                            }, 8, ["data"])
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  __props.stats.orderStatusDistribution && __props.stats.orderStatusDistribution.length > 0 ? (openBlock(), createBlock(unref(_sfc_main$2), { key: 1 }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$3), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$4), null, {
                            default: withCtx(() => [
                              createTextVNode("Order Status Distribution")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("Breakdown of orders by status")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "space-y-2" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.stats.orderStatusDistribution, (entry) => {
                              return openBlock(), createBlock("div", {
                                key: entry.status,
                                class: "flex items-center justify-between rounded-lg border p-3"
                              }, [
                                createVNode("div", { class: "flex items-center gap-3" }, [
                                  createVNode(unref(_sfc_main$7), {
                                    variant: getStatusVariant(entry.status)
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(entry.status), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["variant"])
                                ]),
                                createVNode("p", { class: "text-sm font-bold" }, toDisplayString(entry.count) + " orders", 1)
                              ]);
                            }), 128))
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ]),
                __props.stats.dailySales && __props.stats.dailySales.length > 0 ? (openBlock(), createBlock(unref(_sfc_main$2), { key: 0 }, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$4), null, {
                          default: withCtx(() => [
                            createTextVNode("Daily Sales (Last 7 Days)")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode("Orders and revenue per day")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "h-[300px]" }, [
                          createVNode(unref(VisXYContainer), {
                            data: dailySalesData.value,
                            height: 300
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(VisGroupedBar), {
                                x: (d, i) => i,
                                y: [(d) => d.orders, (d) => d.revenue / 1e4],
                                color: [dailySalesChartConfig.orders.color, dailySalesChartConfig.revenue.color],
                                "rounded-corners": 4,
                                "bar-padding": "0.1",
                                "group-padding": "0.2"
                              }, null, 8, ["x", "y", "color"]),
                              createVNode(unref(VisAxis), {
                                type: "x",
                                "tick-format": (d) => dailySalesData.value[d]?.date || "",
                                "tick-values": dailySalesData.value.map((_2, i) => i),
                                "tick-line": false,
                                "domain-line": false,
                                "grid-line": false
                              }, null, 8, ["tick-format", "tick-values"]),
                              createVNode(unref(VisAxis), {
                                type: "y",
                                "tick-line": false,
                                "domain-line": false,
                                "grid-line": true
                              }),
                              createVNode(unref(VisTooltip), {
                                triggers: {
                                  "rect": (d, i) => `
                                    <div class='rounded-lg border bg-background p-3 shadow-lg'>
                                        <div class='font-semibold mb-2'>${dailySalesData.value[i]?.date || ""}</div>
                                        <div class='flex items-center gap-2 text-sm mb-1'>
                                            <span style='color: ${dailySalesChartConfig.orders.color}'>●</span>
                                            <span>Orders: <strong>${dailySalesData.value[i]?.orders || 0}</strong></span>
                                        </div>
                                        <div class='flex items-center gap-2 text-sm'>
                                            <span style='color: ${dailySalesChartConfig.revenue.color}'>●</span>
                                            <span>Revenue: <strong>${formatCurrency(dailySalesData.value[i]?.revenue || 0)}</strong></span>
                                        </div>
                                    </div>
                                `
                                }
                              }, null, 8, ["triggers"])
                            ]),
                            _: 1
                          }, 8, ["data"]),
                          createVNode("div", { class: "mt-4 flex items-center justify-center gap-4 text-sm" }, [
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              createVNode("div", {
                                class: "h-3 w-3 rounded",
                                style: { backgroundColor: dailySalesChartConfig.orders.color }
                              }, null, 4),
                              createVNode("span", null, "Orders")
                            ]),
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              createVNode("div", {
                                class: "h-3 w-3 rounded",
                                style: { backgroundColor: dailySalesChartConfig.revenue.color }
                              }, null, 4),
                              createVNode("span", null, "Revenue (÷10K)")
                            ])
                          ])
                        ])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
