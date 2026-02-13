import { defineComponent, ref, h, watch, mergeProps, withCtx, unref, createTextVNode, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$o } from "./index-BpQimeTM.js";
import { v as valueUpdater, _ as _sfc_main$e } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$2, a as _sfc_main$3, b as _sfc_main$4, c as _sfc_main$5 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$c, a as _sfc_main$d, b as _sfc_main$f, d as _sfc_main$g } from "./DropdownMenuTrigger-B1v6pHML.js";
import { _ as _sfc_main$6 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$n } from "./Pagination-DAUeA01Y.js";
import { _ as _sfc_main$7, a as _sfc_main$8, b as _sfc_main$9, c as _sfc_main$a, d as _sfc_main$b } from "./SelectValue-BUnv4mQg.js";
import { _ as _sfc_main$h, a as _sfc_main$i, b as _sfc_main$j, c as _sfc_main$k, d as _sfc_main$l, e as _sfc_main$m } from "./TableHeader-emcE6QAC.js";
import { _ as _sfc_main$1 } from "./AppLayout-D11fLPDM.js";
import { router, Head, Link } from "@inertiajs/vue3";
import { useVueTable, getFilteredRowModel, getSortedRowModel, getCoreRowModel, FlexRender } from "@tanstack/vue-table";
import { ShoppingCart, DollarSign, Package, CreditCard, Search, ChevronDown, ArrowUpDown, Eye } from "lucide-vue-next";
import { u as usePermissions } from "./usePermissions-DYRibCI0.js";
import "class-variance-authority";
import "@vueuse/core";
import "reka-ui";
import "clsx";
import "tailwind-merge";
import "./index-3UqiGNe9.js";
import "./AvatarImage-DWFQMckn.js";
import "./index-Bfu0FVt6.js";
import "vue-sonner";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Completed",
  __ssrInlineRender: true,
  props: {
    orders: {},
    statistics: {},
    paymentMethods: {},
    filters: {}
  },
  setup(__props) {
    const { isSuperAdmin, isAdmin } = usePermissions();
    const props = __props;
    const breadcrumbItems = [
      {
        title: "Pesanan Selesai",
        href: "/admin/orders/completed"
      }
    ];
    const search = ref(props.filters.search || "");
    const statusFilter = ref(props.filters.status || "all");
    const paymentMethodFilter = ref(props.filters.payment_method || "all");
    const sorting = ref([
      {
        id: props.filters.sort_by,
        desc: props.filters.sort_order === "desc"
      }
    ]);
    const columnFilters = ref([]);
    const columnVisibility = ref({});
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(amount);
    };
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const getStatusVariant = (status) => {
      const variants = {
        pending: "secondary",
        processing: "outline",
        shipped: "default",
        delivered: "default",
        cancelled: "destructive",
        completed: "default"
      };
      return variants[status] || "secondary";
    };
    const columns = [
      {
        id: "index",
        header: () => h("div", { class: "w-12" }, "No"),
        cell: ({ row }) => {
          const index = row.index + 1 + (props.orders.current_page - 1) * props.orders.per_page;
          return h("div", { class: "font-medium" }, index);
        }
      },
      {
        accessorKey: "order_number",
        header: ({ column }) => {
          return h(
            _sfc_main$e,
            {
              variant: "ghost",
              onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
              class: "-ml-4"
            },
            () => ["Order Number", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
          );
        },
        cell: ({ row }) => {
          return h("div", [
            h("div", { class: "font-medium font-mono" }, row.original.order_number),
            h(
              "div",
              { class: "text-xs text-muted-foreground" },
              row.original.customer.name
            )
          ]);
        }
      },
      {
        accessorKey: "total_amount",
        header: () => h("div", { class: "text-right" }, "Total"),
        cell: ({ row }) => {
          return h(
            "div",
            { class: "text-right font-medium" },
            () => formatCurrency(row.getValue("total_amount"))
          );
        }
      },
      {
        accessorKey: "payment_status",
        header: () => "Payment",
        cell: ({ row }) => {
          const status = row.getValue("payment_status");
          return h(
            _sfc_main$o,
            { variant: status === "paid" ? "default" : "secondary" },
            () => status
          );
        }
      },
      {
        id: "payment_method",
        header: () => "Metode",
        cell: ({ row }) => {
          const order = row.original;
          const paymentMethod = order.payments?.[0]?.method?.name;
          return h(
            "div",
            { class: "text-sm" },
            { default: () => paymentMethod || "-" }
          );
        }
      },
      {
        accessorKey: "status",
        header: () => "Status",
        cell: ({ row }) => {
          const status = row.getValue("status");
          return h(
            _sfc_main$o,
            { variant: getStatusVariant(status) },
            () => status
          );
        }
      },
      {
        accessorKey: "created_at",
        header: ({ column }) => {
          return h(
            _sfc_main$e,
            {
              variant: "ghost",
              onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
              class: "-ml-4"
            },
            () => ["Tanggal", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
          );
        },
        cell: ({ row }) => {
          return formatDate(row.getValue("created_at"));
        }
      },
      {
        id: "actions",
        header: () => h("div", { class: "text-right" }, "Actions"),
        cell: ({ row }) => {
          const order = row.original;
          const actions = [];
          if (isSuperAdmin || isAdmin) {
            actions.push(
              h(
                Link,
                { href: `/admin/orders/${order.id}` },
                () => h(
                  _sfc_main$e,
                  { variant: "outline", size: "sm" },
                  () => h(Eye, { class: "h-4 w-4" })
                )
              )
            );
          }
          return h("div", { class: "flex justify-end gap-2" }, actions);
        }
      }
    ];
    const table = useVueTable({
      get data() {
        return props.orders.data;
      },
      columns,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
      onColumnFiltersChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnFilters),
      onColumnVisibilityChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnVisibility),
      state: {
        get sorting() {
          return sorting.value;
        },
        get columnFilters() {
          return columnFilters.value;
        },
        get columnVisibility() {
          return columnVisibility.value;
        }
      },
      manualSorting: true
    });
    watch(
      sorting,
      (newSorting) => {
        if (newSorting.length > 0) {
          router.get(
            "/admin/orders",
            {
              search: search.value || void 0,
              status: statusFilter.value !== "all" ? statusFilter.value : void 0,
              sort_by: newSorting[0].id,
              sort_order: newSorting[0].desc ? "desc" : "asc"
            },
            {
              preserveState: true,
              preserveScroll: true
            }
          );
        }
      },
      { deep: true }
    );
    let searchTimeout;
    watch([search, statusFilter, paymentMethodFilter], () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        router.get(
          "/admin/orders/completed",
          {
            search: search.value || void 0,
            status: statusFilter.value !== "all" ? statusFilter.value : void 0,
            payment_method: paymentMethodFilter.value !== "all" ? paymentMethodFilter.value : void 0,
            sort_by: sorting.value[0]?.id || "created_at",
            sort_order: sorting.value[0]?.desc ? "desc" : "asc"
          },
          {
            preserveState: true,
            preserveScroll: true
          }
        );
      }, 300);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ breadcrumbs: breadcrumbItems }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Pesanan Selesai" }, null, _parent2, _scopeId));
            _push2(`<div class="rounded-xl p-4 space-y-6 py-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="text-3xl font-bold tracking-tight"${_scopeId}>Pesanan Selesai</h1><p class="text-muted-foreground"${_scopeId}>Kelola pesanan yang sudah selesai</p></div></div><div class="grid gap-4 md:grid-cols-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Total Pesanan`);
                            } else {
                              return [
                                createTextVNode("Total Pesanan")
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
                              createTextVNode("Total Pesanan")
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
                        _push4(`<div class="text-2xl font-bold"${_scopeId3}>${ssrInterpolate(__props.statistics.total_orders)}</div><p class="text-xs text-muted-foreground"${_scopeId3}>Semua pesanan</p>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics.total_orders), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Semua pesanan")
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
                            createTextVNode("Total Pesanan")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(ShoppingCart), { class: "h-4 w-4 text-muted-foreground" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics.total_orders), 1),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, "Semua pesanan")
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
                              _push5(`Total Pendapatan`);
                            } else {
                              return [
                                createTextVNode("Total Pendapatan")
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
                              createTextVNode("Total Pendapatan")
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
                        _push4(`<div class="text-2xl font-bold"${_scopeId3}>${ssrInterpolate(formatCurrency(__props.statistics.total_revenue))}</div><p class="text-xs text-muted-foreground"${_scopeId3}>Revenue keseluruhan</p>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatCurrency(__props.statistics.total_revenue)), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Revenue keseluruhan")
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
                            createTextVNode("Total Pendapatan")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(DollarSign), { class: "h-4 w-4 text-muted-foreground" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatCurrency(__props.statistics.total_revenue)), 1),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, "Revenue keseluruhan")
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
                              _push5(`Pending`);
                            } else {
                              return [
                                createTextVNode("Pending")
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
                              createTextVNode("Pending")
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
                        _push4(`<div class="text-2xl font-bold"${_scopeId3}>${ssrInterpolate(__props.statistics.total_pending)}</div><p class="text-xs text-muted-foreground"${_scopeId3}>Menunggu pembayaran</p>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics.total_pending), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Menunggu pembayaran")
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
                            createTextVNode("Pending")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(Package), { class: "h-4 w-4 text-muted-foreground" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics.total_pending), 1),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, "Menunggu pembayaran")
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
                              _push5(`Selesai`);
                            } else {
                              return [
                                createTextVNode("Selesai")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(CreditCard), { class: "h-4 w-4 text-muted-foreground" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Selesai")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(CreditCard), { class: "h-4 w-4 text-muted-foreground" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-2xl font-bold"${_scopeId3}>${ssrInterpolate(__props.statistics.total_completed)}</div><p class="text-xs text-muted-foreground"${_scopeId3}>Order selesai</p>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics.total_completed), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Order selesai")
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
                            createTextVNode("Selesai")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(CreditCard), { class: "h-4 w-4 text-muted-foreground" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics.total_completed), 1),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, "Order selesai")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"${_scopeId}><div class="flex flex-1 gap-4"${_scopeId}><div class="relative flex-1 max-w-sm"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$6), {
              modelValue: search.value,
              "onUpdate:modelValue": ($event) => search.value = $event,
              placeholder: "Cari nomor order atau nama pelanggan...",
              class: "pl-9"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$7), {
              modelValue: statusFilter.value,
              "onUpdate:modelValue": ($event) => statusFilter.value = $event
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$8), { class: "w-[180px]" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { placeholder: "Semua Status" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$9), { placeholder: "Semua Status" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$a), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$b), { value: "all" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Semua Status`);
                            } else {
                              return [
                                createTextVNode("Semua Status")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$b), { value: "pending" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Pending`);
                            } else {
                              return [
                                createTextVNode("Pending")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$b), { value: "processing" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Processing`);
                            } else {
                              return [
                                createTextVNode("Processing")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$b), { value: "shipped" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Shipped`);
                            } else {
                              return [
                                createTextVNode("Shipped")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$b), { value: "delivered" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Delivered`);
                            } else {
                              return [
                                createTextVNode("Delivered")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$b), { value: "completed" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Completed`);
                            } else {
                              return [
                                createTextVNode("Completed")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$b), { value: "cancelled" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Cancelled`);
                            } else {
                              return [
                                createTextVNode("Cancelled")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$b), { value: "all" }, {
                            default: withCtx(() => [
                              createTextVNode("Semua Status")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$b), { value: "pending" }, {
                            default: withCtx(() => [
                              createTextVNode("Pending")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$b), { value: "processing" }, {
                            default: withCtx(() => [
                              createTextVNode("Processing")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$b), { value: "shipped" }, {
                            default: withCtx(() => [
                              createTextVNode("Shipped")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$b), { value: "delivered" }, {
                            default: withCtx(() => [
                              createTextVNode("Delivered")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$b), { value: "completed" }, {
                            default: withCtx(() => [
                              createTextVNode("Completed")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$b), { value: "cancelled" }, {
                            default: withCtx(() => [
                              createTextVNode("Cancelled")
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
                    createVNode(unref(_sfc_main$8), { class: "w-[180px]" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$9), { placeholder: "Semua Status" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$a), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$b), { value: "all" }, {
                          default: withCtx(() => [
                            createTextVNode("Semua Status")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$b), { value: "pending" }, {
                          default: withCtx(() => [
                            createTextVNode("Pending")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$b), { value: "processing" }, {
                          default: withCtx(() => [
                            createTextVNode("Processing")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$b), { value: "shipped" }, {
                          default: withCtx(() => [
                            createTextVNode("Shipped")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$b), { value: "delivered" }, {
                          default: withCtx(() => [
                            createTextVNode("Delivered")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$b), { value: "completed" }, {
                          default: withCtx(() => [
                            createTextVNode("Completed")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$b), { value: "cancelled" }, {
                          default: withCtx(() => [
                            createTextVNode("Cancelled")
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
            _push2(ssrRenderComponent(unref(_sfc_main$7), {
              modelValue: paymentMethodFilter.value,
              "onUpdate:modelValue": ($event) => paymentMethodFilter.value = $event
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$8), { class: "w-[200px]" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { placeholder: "Metode Pembayaran" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$9), { placeholder: "Metode Pembayaran" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$a), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$b), { value: "all" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Semua Metode`);
                            } else {
                              return [
                                createTextVNode("Semua Metode")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<!--[-->`);
                        ssrRenderList(__props.paymentMethods, (method) => {
                          _push4(ssrRenderComponent(unref(_sfc_main$b), {
                            key: method.id,
                            value: method.id.toString()
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(method.name)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(method.name), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          createVNode(unref(_sfc_main$b), { value: "all" }, {
                            default: withCtx(() => [
                              createTextVNode("Semua Metode")
                            ]),
                            _: 1
                          }),
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.paymentMethods, (method) => {
                            return openBlock(), createBlock(unref(_sfc_main$b), {
                              key: method.id,
                              value: method.id.toString()
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(method.name), 1)
                              ]),
                              _: 2
                            }, 1032, ["value"]);
                          }), 128))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$8), { class: "w-[200px]" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$9), { placeholder: "Metode Pembayaran" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$a), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$b), { value: "all" }, {
                          default: withCtx(() => [
                            createTextVNode("Semua Metode")
                          ]),
                          _: 1
                        }),
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.paymentMethods, (method) => {
                          return openBlock(), createBlock(unref(_sfc_main$b), {
                            key: method.id,
                            value: method.id.toString()
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(method.name), 1)
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
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$c), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$d), { "as-child": "" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$e), {
                          variant: "outline",
                          class: "ml-auto"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Kolom `);
                              _push5(ssrRenderComponent(unref(ChevronDown), { class: "ml-2 h-4 w-4" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createTextVNode(" Kolom "),
                                createVNode(unref(ChevronDown), { class: "ml-2 h-4 w-4" })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$e), {
                            variant: "outline",
                            class: "ml-auto"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Kolom "),
                              createVNode(unref(ChevronDown), { class: "ml-2 h-4 w-4" })
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$f), { align: "end" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(unref(table).getAllColumns().filter((column) => column.getCanHide()), (column) => {
                          _push4(ssrRenderComponent(unref(_sfc_main$g), {
                            key: column.id,
                            class: "capitalize",
                            "model-value": column.getIsVisible(),
                            "onUpdate:modelValue": (value) => {
                              column.toggleVisibility(!!value);
                            }
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(column.id)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(column.id), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getAllColumns().filter((column) => column.getCanHide()), (column) => {
                            return openBlock(), createBlock(unref(_sfc_main$g), {
                              key: column.id,
                              class: "capitalize",
                              "model-value": column.getIsVisible(),
                              "onUpdate:modelValue": (value) => {
                                column.toggleVisibility(!!value);
                              }
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(column.id), 1)
                              ]),
                              _: 2
                            }, 1032, ["model-value", "onUpdate:modelValue"]);
                          }), 128))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$d), { "as-child": "" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$e), {
                          variant: "outline",
                          class: "ml-auto"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Kolom "),
                            createVNode(unref(ChevronDown), { class: "ml-2 h-4 w-4" })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$f), { align: "end" }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getAllColumns().filter((column) => column.getCanHide()), (column) => {
                          return openBlock(), createBlock(unref(_sfc_main$g), {
                            key: column.id,
                            class: "capitalize",
                            "model-value": column.getIsVisible(),
                            "onUpdate:modelValue": (value) => {
                              column.toggleVisibility(!!value);
                            }
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(column.id), 1)
                            ]),
                            _: 2
                          }, 1032, ["model-value", "onUpdate:modelValue"]);
                        }), 128))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="rounded-md border"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$h), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$i), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(unref(table).getHeaderGroups(), (headerGroup) => {
                          _push4(ssrRenderComponent(unref(_sfc_main$j), {
                            key: headerGroup.id
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(headerGroup.headers, (header) => {
                                  _push5(ssrRenderComponent(unref(_sfc_main$k), {
                                    key: header.id
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        if (!header.isPlaceholder) {
                                          _push6(ssrRenderComponent(unref(FlexRender), {
                                            render: header.column.columnDef.header,
                                            props: header.getContext()
                                          }, null, _parent6, _scopeId5));
                                        } else {
                                          _push6(`<!---->`);
                                        }
                                      } else {
                                        return [
                                          !header.isPlaceholder ? (openBlock(), createBlock(unref(FlexRender), {
                                            key: 0,
                                            render: header.column.columnDef.header,
                                            props: header.getContext()
                                          }, null, 8, ["render", "props"])) : createCommentVNode("", true)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                                    return openBlock(), createBlock(unref(_sfc_main$k), {
                                      key: header.id
                                    }, {
                                      default: withCtx(() => [
                                        !header.isPlaceholder ? (openBlock(), createBlock(unref(FlexRender), {
                                          key: 0,
                                          render: header.column.columnDef.header,
                                          props: header.getContext()
                                        }, null, 8, ["render", "props"])) : createCommentVNode("", true)
                                      ]),
                                      _: 2
                                    }, 1024);
                                  }), 128))
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getHeaderGroups(), (headerGroup) => {
                            return openBlock(), createBlock(unref(_sfc_main$j), {
                              key: headerGroup.id
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                                  return openBlock(), createBlock(unref(_sfc_main$k), {
                                    key: header.id
                                  }, {
                                    default: withCtx(() => [
                                      !header.isPlaceholder ? (openBlock(), createBlock(unref(FlexRender), {
                                        key: 0,
                                        render: header.column.columnDef.header,
                                        props: header.getContext()
                                      }, null, 8, ["render", "props"])) : createCommentVNode("", true)
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 128))
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$l), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (unref(table).getRowModel().rows?.length) {
                          _push4(`<!--[-->`);
                          ssrRenderList(unref(table).getRowModel().rows, (row) => {
                            _push4(ssrRenderComponent(unref(_sfc_main$j), {
                              key: row.id
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<!--[-->`);
                                  ssrRenderList(row.getVisibleCells(), (cell) => {
                                    _push5(ssrRenderComponent(unref(_sfc_main$m), {
                                      key: cell.id
                                    }, {
                                      default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(ssrRenderComponent(unref(FlexRender), {
                                            render: cell.column.columnDef.cell,
                                            props: cell.getContext()
                                          }, null, _parent6, _scopeId5));
                                        } else {
                                          return [
                                            createVNode(unref(FlexRender), {
                                              render: cell.column.columnDef.cell,
                                              props: cell.getContext()
                                            }, null, 8, ["render", "props"])
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                  });
                                  _push5(`<!--]-->`);
                                } else {
                                  return [
                                    (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                                      return openBlock(), createBlock(unref(_sfc_main$m), {
                                        key: cell.id
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(FlexRender), {
                                            render: cell.column.columnDef.cell,
                                            props: cell.getContext()
                                          }, null, 8, ["render", "props"])
                                        ]),
                                        _: 2
                                      }, 1024);
                                    }), 128))
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          });
                          _push4(`<!--]-->`);
                        } else {
                          _push4(ssrRenderComponent(unref(_sfc_main$j), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(_sfc_main$m), {
                                  colspan: columns.length,
                                  class: "h-24 text-center"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(` Tidak ada data pesanan. `);
                                    } else {
                                      return [
                                        createTextVNode(" Tidak ada data pesanan. ")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(_sfc_main$m), {
                                    colspan: columns.length,
                                    class: "h-24 text-center"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Tidak ada data pesanan. ")
                                    ]),
                                    _: 1
                                  }, 8, ["colspan"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        }
                      } else {
                        return [
                          unref(table).getRowModel().rows?.length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(table).getRowModel().rows, (row) => {
                            return openBlock(), createBlock(unref(_sfc_main$j), {
                              key: row.id
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                                  return openBlock(), createBlock(unref(_sfc_main$m), {
                                    key: cell.id
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(FlexRender), {
                                        render: cell.column.columnDef.cell,
                                        props: cell.getContext()
                                      }, null, 8, ["render", "props"])
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 128))
                              ]),
                              _: 2
                            }, 1024);
                          }), 128)) : (openBlock(), createBlock(unref(_sfc_main$j), { key: 1 }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$m), {
                                colspan: columns.length,
                                class: "h-24 text-center"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Tidak ada data pesanan. ")
                                ]),
                                _: 1
                              }, 8, ["colspan"])
                            ]),
                            _: 1
                          }))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$i), null, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getHeaderGroups(), (headerGroup) => {
                          return openBlock(), createBlock(unref(_sfc_main$j), {
                            key: headerGroup.id
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                                return openBlock(), createBlock(unref(_sfc_main$k), {
                                  key: header.id
                                }, {
                                  default: withCtx(() => [
                                    !header.isPlaceholder ? (openBlock(), createBlock(unref(FlexRender), {
                                      key: 0,
                                      render: header.column.columnDef.header,
                                      props: header.getContext()
                                    }, null, 8, ["render", "props"])) : createCommentVNode("", true)
                                  ]),
                                  _: 2
                                }, 1024);
                              }), 128))
                            ]),
                            _: 2
                          }, 1024);
                        }), 128))
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$l), null, {
                      default: withCtx(() => [
                        unref(table).getRowModel().rows?.length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(table).getRowModel().rows, (row) => {
                          return openBlock(), createBlock(unref(_sfc_main$j), {
                            key: row.id
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                                return openBlock(), createBlock(unref(_sfc_main$m), {
                                  key: cell.id
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(FlexRender), {
                                      render: cell.column.columnDef.cell,
                                      props: cell.getContext()
                                    }, null, 8, ["render", "props"])
                                  ]),
                                  _: 2
                                }, 1024);
                              }), 128))
                            ]),
                            _: 2
                          }, 1024);
                        }), 128)) : (openBlock(), createBlock(unref(_sfc_main$j), { key: 1 }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$m), {
                              colspan: columns.length,
                              class: "h-24 text-center"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Tidak ada data pesanan. ")
                              ]),
                              _: 1
                            }, 8, ["colspan"])
                          ]),
                          _: 1
                        }))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (__props.orders.last_page > 1) {
              _push2(ssrRenderComponent(_sfc_main$n, {
                data: {
                  current_page: __props.orders.current_page,
                  last_page: __props.orders.last_page,
                  per_page: __props.orders.per_page,
                  from: (__props.orders.current_page - 1) * __props.orders.per_page + 1,
                  to: Math.min(__props.orders.current_page * __props.orders.per_page, __props.orders.total),
                  total: __props.orders.total
                },
                url: "/admin/orders/completed",
                filters: {
                  search: search.value || void 0,
                  status: statusFilter.value !== "all" ? statusFilter.value : void 0,
                  payment_method: paymentMethodFilter.value !== "all" ? paymentMethodFilter.value : void 0,
                  sort_by: sorting.value[0]?.id || "created_at",
                  sort_order: sorting.value[0]?.desc ? "desc" : "asc"
                }
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Pesanan Selesai" }),
              createVNode("div", { class: "rounded-xl p-4 space-y-6 py-6" }, [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("div", null, [
                    createVNode("h1", { class: "text-3xl font-bold tracking-tight" }, "Pesanan Selesai"),
                    createVNode("p", { class: "text-muted-foreground" }, "Kelola pesanan yang sudah selesai")
                  ])
                ]),
                createVNode("div", { class: "grid gap-4 md:grid-cols-4" }, [
                  createVNode(unref(_sfc_main$2), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$3), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Total Pesanan")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(ShoppingCart), { class: "h-4 w-4 text-muted-foreground" })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics.total_orders), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Semua pesanan")
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
                              createTextVNode("Total Pendapatan")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(DollarSign), { class: "h-4 w-4 text-muted-foreground" })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatCurrency(__props.statistics.total_revenue)), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Revenue keseluruhan")
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
                              createTextVNode("Pending")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(Package), { class: "h-4 w-4 text-muted-foreground" })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics.total_pending), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Menunggu pembayaran")
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
                              createTextVNode("Selesai")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(CreditCard), { class: "h-4 w-4 text-muted-foreground" })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics.total_completed), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Order selesai")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" }, [
                  createVNode("div", { class: "flex flex-1 gap-4" }, [
                    createVNode("div", { class: "relative flex-1 max-w-sm" }, [
                      createVNode(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
                      createVNode(unref(_sfc_main$6), {
                        modelValue: search.value,
                        "onUpdate:modelValue": ($event) => search.value = $event,
                        placeholder: "Cari nomor order atau nama pelanggan...",
                        class: "pl-9"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(unref(_sfc_main$7), {
                      modelValue: statusFilter.value,
                      "onUpdate:modelValue": ($event) => statusFilter.value = $event
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$8), { class: "w-[180px]" }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$9), { placeholder: "Semua Status" })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$a), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$b), { value: "all" }, {
                              default: withCtx(() => [
                                createTextVNode("Semua Status")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$b), { value: "pending" }, {
                              default: withCtx(() => [
                                createTextVNode("Pending")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$b), { value: "processing" }, {
                              default: withCtx(() => [
                                createTextVNode("Processing")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$b), { value: "shipped" }, {
                              default: withCtx(() => [
                                createTextVNode("Shipped")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$b), { value: "delivered" }, {
                              default: withCtx(() => [
                                createTextVNode("Delivered")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$b), { value: "completed" }, {
                              default: withCtx(() => [
                                createTextVNode("Completed")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$b), { value: "cancelled" }, {
                              default: withCtx(() => [
                                createTextVNode("Cancelled")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(unref(_sfc_main$7), {
                      modelValue: paymentMethodFilter.value,
                      "onUpdate:modelValue": ($event) => paymentMethodFilter.value = $event
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$8), { class: "w-[200px]" }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$9), { placeholder: "Metode Pembayaran" })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$a), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$b), { value: "all" }, {
                              default: withCtx(() => [
                                createTextVNode("Semua Metode")
                              ]),
                              _: 1
                            }),
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.paymentMethods, (method) => {
                              return openBlock(), createBlock(unref(_sfc_main$b), {
                                key: method.id,
                                value: method.id.toString()
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(method.name), 1)
                                ]),
                                _: 2
                              }, 1032, ["value"]);
                            }), 128))
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1032, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode(unref(_sfc_main$c), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$d), { "as-child": "" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$e), {
                            variant: "outline",
                            class: "ml-auto"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Kolom "),
                              createVNode(unref(ChevronDown), { class: "ml-2 h-4 w-4" })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$f), { align: "end" }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getAllColumns().filter((column) => column.getCanHide()), (column) => {
                            return openBlock(), createBlock(unref(_sfc_main$g), {
                              key: column.id,
                              class: "capitalize",
                              "model-value": column.getIsVisible(),
                              "onUpdate:modelValue": (value) => {
                                column.toggleVisibility(!!value);
                              }
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(column.id), 1)
                              ]),
                              _: 2
                            }, 1032, ["model-value", "onUpdate:modelValue"]);
                          }), 128))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "rounded-md border" }, [
                  createVNode(unref(_sfc_main$h), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$i), null, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getHeaderGroups(), (headerGroup) => {
                            return openBlock(), createBlock(unref(_sfc_main$j), {
                              key: headerGroup.id
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                                  return openBlock(), createBlock(unref(_sfc_main$k), {
                                    key: header.id
                                  }, {
                                    default: withCtx(() => [
                                      !header.isPlaceholder ? (openBlock(), createBlock(unref(FlexRender), {
                                        key: 0,
                                        render: header.column.columnDef.header,
                                        props: header.getContext()
                                      }, null, 8, ["render", "props"])) : createCommentVNode("", true)
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 128))
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$l), null, {
                        default: withCtx(() => [
                          unref(table).getRowModel().rows?.length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(table).getRowModel().rows, (row) => {
                            return openBlock(), createBlock(unref(_sfc_main$j), {
                              key: row.id
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                                  return openBlock(), createBlock(unref(_sfc_main$m), {
                                    key: cell.id
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(FlexRender), {
                                        render: cell.column.columnDef.cell,
                                        props: cell.getContext()
                                      }, null, 8, ["render", "props"])
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 128))
                              ]),
                              _: 2
                            }, 1024);
                          }), 128)) : (openBlock(), createBlock(unref(_sfc_main$j), { key: 1 }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$m), {
                                colspan: columns.length,
                                class: "h-24 text-center"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Tidak ada data pesanan. ")
                                ]),
                                _: 1
                              }, 8, ["colspan"])
                            ]),
                            _: 1
                          }))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                __props.orders.last_page > 1 ? (openBlock(), createBlock(_sfc_main$n, {
                  key: 0,
                  data: {
                    current_page: __props.orders.current_page,
                    last_page: __props.orders.last_page,
                    per_page: __props.orders.per_page,
                    from: (__props.orders.current_page - 1) * __props.orders.per_page + 1,
                    to: Math.min(__props.orders.current_page * __props.orders.per_page, __props.orders.total),
                    total: __props.orders.total
                  },
                  url: "/admin/orders/completed",
                  filters: {
                    search: search.value || void 0,
                    status: statusFilter.value !== "all" ? statusFilter.value : void 0,
                    payment_method: paymentMethodFilter.value !== "all" ? paymentMethodFilter.value : void 0,
                    sort_by: sorting.value[0]?.id || "created_at",
                    sort_order: sorting.value[0]?.desc ? "desc" : "asc"
                  }
                }, null, 8, ["data", "filters"])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Orders/Completed.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
