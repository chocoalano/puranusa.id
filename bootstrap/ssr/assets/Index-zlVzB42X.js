import { defineComponent, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext, ref, h, watch, createBlock, openBlock, Fragment, renderList, createCommentVNode } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { m as indexReturns, _ as _sfc_main$6, n as approveReturn, o as rejectReturn } from "./AppLayout-Cw9UyDBf.js";
import { _ as _sfc_main$p } from "./ConfirmDialog-CTU0x0KG.js";
import { _ as _sfc_main$o } from "./Pagination-DAUeA01Y.js";
import { _ as _sfc_main$2, a as _sfc_main$3, b as _sfc_main$4, c as _sfc_main$5 } from "./CardTitle-sqUG0LTw.js";
import { Clock, CheckCircle, XCircle, Search, ChevronDown, ArrowUpDown } from "lucide-vue-next";
import { _ as _sfc_main$q } from "./index-BpQimeTM.js";
import { v as valueUpdater, _ as _sfc_main$f } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$d, a as _sfc_main$e, b as _sfc_main$g, d as _sfc_main$h } from "./DropdownMenuTrigger-B1v6pHML.js";
import { _ as _sfc_main$7 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$8, a as _sfc_main$9, b as _sfc_main$a, c as _sfc_main$b, d as _sfc_main$c } from "./SelectValue-BUnv4mQg.js";
import { _ as _sfc_main$i, a as _sfc_main$j, b as _sfc_main$k, c as _sfc_main$l, d as _sfc_main$m, e as _sfc_main$n } from "./TableHeader-emcE6QAC.js";
import { router, Head } from "@inertiajs/vue3";
import { useVueTable, getFilteredRowModel, getSortedRowModel, getCoreRowModel, FlexRender } from "@tanstack/vue-table";
import "class-variance-authority";
import "reka-ui";
import "@vueuse/core";
import "./index-D9uuAIUh.js";
import "./AvatarImage-DWFQMckn.js";
import "vue-sonner";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
import "./AlertDialogTrigger-DIWb7xue.js";
import "clsx";
import "tailwind-merge";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ReturnStatistics",
  __ssrInlineRender: true,
  props: {
    statistics: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid gap-4 md:grid-cols-3" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(_sfc_main$2), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$3), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Pending`);
                      } else {
                        return [
                          createTextVNode("Pending")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(Clock), { class: "h-4 w-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                      default: withCtx(() => [
                        createTextVNode("Pending")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(Clock), { class: "h-4 w-4 text-muted-foreground" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$5), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(__props.statistics.total_pending)}</div><p class="text-xs text-muted-foreground"${_scopeId2}>Menunggu persetujuan</p>`);
                } else {
                  return [
                    createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics.total_pending), 1),
                    createVNode("p", { class: "text-xs text-muted-foreground" }, "Menunggu persetujuan")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
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
                  createVNode(unref(Clock), { class: "h-4 w-4 text-muted-foreground" })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), null, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics.total_pending), 1),
                  createVNode("p", { class: "text-xs text-muted-foreground" }, "Menunggu persetujuan")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$2), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$3), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Disetujui`);
                      } else {
                        return [
                          createTextVNode("Disetujui")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(CheckCircle), { class: "h-4 w-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                      default: withCtx(() => [
                        createTextVNode("Disetujui")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(CheckCircle), { class: "h-4 w-4 text-muted-foreground" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$5), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(__props.statistics.total_approved)}</div><p class="text-xs text-muted-foreground"${_scopeId2}>Retur disetujui</p>`);
                } else {
                  return [
                    createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics.total_approved), 1),
                    createVNode("p", { class: "text-xs text-muted-foreground" }, "Retur disetujui")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$3), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                    default: withCtx(() => [
                      createTextVNode("Disetujui")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(CheckCircle), { class: "h-4 w-4 text-muted-foreground" })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), null, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics.total_approved), 1),
                  createVNode("p", { class: "text-xs text-muted-foreground" }, "Retur disetujui")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$2), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$3), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Ditolak`);
                      } else {
                        return [
                          createTextVNode("Ditolak")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(XCircle), { class: "h-4 w-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                      default: withCtx(() => [
                        createTextVNode("Ditolak")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(XCircle), { class: "h-4 w-4 text-muted-foreground" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$5), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(__props.statistics.total_rejected)}</div><p class="text-xs text-muted-foreground"${_scopeId2}>Retur ditolak</p>`);
                } else {
                  return [
                    createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics.total_rejected), 1),
                    createVNode("p", { class: "text-xs text-muted-foreground" }, "Retur ditolak")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$3), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                    default: withCtx(() => [
                      createTextVNode("Ditolak")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(XCircle), { class: "h-4 w-4 text-muted-foreground" })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), null, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics.total_rejected), 1),
                  createVNode("p", { class: "text-xs text-muted-foreground" }, "Retur ditolak")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/returns/ReturnStatistics.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    returns: {},
    statistics: {},
    filters: {}
  },
  setup(__props) {
    const props = __props;
    const breadcrumbItems = [
      {
        title: "Retur & Refund",
        href: indexReturns.url()
      }
    ];
    const search = ref(props.filters.search || "");
    const statusFilter = ref(props.filters.status || "all");
    const sorting = ref([
      {
        id: props.filters.sort_by,
        desc: props.filters.sort_order === "desc"
      }
    ]);
    const columnFilters = ref([]);
    const columnVisibility = ref({});
    const approveDialog = ref({
      open: false,
      return: null
    });
    const rejectDialog = ref({
      open: false,
      return: null
    });
    const formatDate = (date) => {
      if (!date) return "-";
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
        approved: "default",
        rejected: "destructive"
      };
      return variants[status] || "secondary";
    };
    const openApproveDialog = (returnItem) => {
      approveDialog.value = { open: true, return: returnItem };
    };
    const handleApprove = () => {
      if (!approveDialog.value.return) return;
      router.post(
        approveReturn.url(approveDialog.value.return.id),
        {},
        {
          preserveScroll: true,
          onSuccess: () => {
            approveDialog.value = { open: false, return: null };
          }
        }
      );
    };
    const openRejectDialog = (returnItem) => {
      rejectDialog.value = { open: true, return: returnItem };
    };
    const handleReject = () => {
      if (!rejectDialog.value.return) return;
      router.post(
        rejectReturn.url(rejectDialog.value.return.id),
        {},
        {
          preserveScroll: true,
          onSuccess: () => {
            rejectDialog.value = { open: false, return: null };
          }
        }
      );
    };
    const columns = [
      {
        id: "index",
        header: () => h("div", { class: "w-12" }, "No"),
        cell: ({ row }) => {
          const index = row.index + 1 + (props.returns.current_page - 1) * props.returns.per_page;
          return h("div", { class: "font-medium" }, index);
        }
      },
      {
        accessorKey: "order.order_number",
        header: ({ column }) => {
          return h(
            _sfc_main$f,
            {
              variant: "ghost",
              onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
              class: "-ml-4"
            },
            () => ["Order", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
          );
        },
        cell: ({ row }) => {
          const order = row.original.order;
          if (!order) {
            return h("div", { class: "text-muted-foreground" }, "N/A");
          }
          return h("div", [
            h("div", { class: "font-medium" }, order.order_number),
            h(
              "div",
              { class: "text-xs text-muted-foreground" },
              order.customer?.name || "Unknown"
            )
          ]);
        }
      },
      {
        accessorKey: "reason",
        header: () => "Alasan",
        cell: ({ row }) => {
          return h("div", { class: "max-w-xs truncate" }, row.getValue("reason"));
        }
      },
      {
        accessorKey: "status",
        header: () => "Status",
        cell: ({ row }) => {
          const status = row.getValue("status");
          return h(
            _sfc_main$q,
            { variant: getStatusVariant(status) },
            () => status
          );
        }
      },
      {
        accessorKey: "requested_at",
        header: () => "Tanggal Permintaan",
        cell: ({ row }) => {
          return formatDate(row.getValue("requested_at"));
        }
      },
      {
        id: "actions",
        header: () => h("div", { class: "text-right" }, "Actions"),
        cell: ({ row }) => {
          const returnItem = row.original;
          if (returnItem.status !== "pending") return null;
          return h("div", { class: "flex justify-end gap-2" }, [
            h(
              _sfc_main$f,
              {
                variant: "default",
                size: "sm",
                onClick: () => openApproveDialog(returnItem)
              },
              () => h(CheckCircle, { class: "h-4 w-4" })
            ),
            h(
              _sfc_main$f,
              {
                variant: "destructive",
                size: "sm",
                onClick: () => openRejectDialog(returnItem)
              },
              () => h(XCircle, { class: "h-4 w-4" })
            )
          ]);
        }
      }
    ];
    const table = useVueTable({
      get data() {
        return props.returns.data;
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
            indexReturns.url(),
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
    watch([search, statusFilter], () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        router.get(
          indexReturns.url(),
          {
            search: search.value || void 0,
            status: statusFilter.value !== "all" ? statusFilter.value : void 0,
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
      _push(ssrRenderComponent(_sfc_main$6, mergeProps({ breadcrumbs: breadcrumbItems }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Retur & Refund" }, null, _parent2, _scopeId));
            _push2(`<div class="rounded-xl p-4 space-y-6 py-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="text-3xl font-bold tracking-tight"${_scopeId}>Retur &amp; Refund</h1><p class="text-muted-foreground"${_scopeId}>Kelola permintaan retur produk</p></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$1, { statistics: __props.statistics }, null, _parent2, _scopeId));
            _push2(`<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"${_scopeId}><div class="flex flex-1 gap-4"${_scopeId}><div class="relative flex-1 max-w-sm"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$7), {
              modelValue: search.value,
              "onUpdate:modelValue": ($event) => search.value = $event,
              placeholder: "Cari order atau customer...",
              class: "pl-9"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$8), {
              modelValue: statusFilter.value,
              "onUpdate:modelValue": ($event) => statusFilter.value = $event
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$9), { class: "w-[180px]" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$a), { placeholder: "Semua Status" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$a), { placeholder: "Semua Status" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$b), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$c), { value: "all" }, {
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
                        _push4(ssrRenderComponent(unref(_sfc_main$c), { value: "pending" }, {
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
                        _push4(ssrRenderComponent(unref(_sfc_main$c), { value: "approved" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Approved`);
                            } else {
                              return [
                                createTextVNode("Approved")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$c), { value: "rejected" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Rejected`);
                            } else {
                              return [
                                createTextVNode("Rejected")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$c), { value: "all" }, {
                            default: withCtx(() => [
                              createTextVNode("Semua Status")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$c), { value: "pending" }, {
                            default: withCtx(() => [
                              createTextVNode("Pending")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$c), { value: "approved" }, {
                            default: withCtx(() => [
                              createTextVNode("Approved")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$c), { value: "rejected" }, {
                            default: withCtx(() => [
                              createTextVNode("Rejected")
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
                    createVNode(unref(_sfc_main$9), { class: "w-[180px]" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$a), { placeholder: "Semua Status" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$b), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$c), { value: "all" }, {
                          default: withCtx(() => [
                            createTextVNode("Semua Status")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$c), { value: "pending" }, {
                          default: withCtx(() => [
                            createTextVNode("Pending")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$c), { value: "approved" }, {
                          default: withCtx(() => [
                            createTextVNode("Approved")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$c), { value: "rejected" }, {
                          default: withCtx(() => [
                            createTextVNode("Rejected")
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
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$d), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$e), { "as-child": "" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$f), {
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
                          createVNode(unref(_sfc_main$f), {
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
                  _push3(ssrRenderComponent(unref(_sfc_main$g), { align: "end" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(unref(table).getAllColumns().filter((column) => column.getCanHide()), (column) => {
                          _push4(ssrRenderComponent(unref(_sfc_main$h), {
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
                            return openBlock(), createBlock(unref(_sfc_main$h), {
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
                    createVNode(unref(_sfc_main$e), { "as-child": "" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$f), {
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
                    createVNode(unref(_sfc_main$g), { align: "end" }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getAllColumns().filter((column) => column.getCanHide()), (column) => {
                          return openBlock(), createBlock(unref(_sfc_main$h), {
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
            _push2(ssrRenderComponent(unref(_sfc_main$i), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$j), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(unref(table).getHeaderGroups(), (headerGroup) => {
                          _push4(ssrRenderComponent(unref(_sfc_main$k), {
                            key: headerGroup.id
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(headerGroup.headers, (header) => {
                                  _push5(ssrRenderComponent(unref(_sfc_main$l), {
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
                                    return openBlock(), createBlock(unref(_sfc_main$l), {
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
                            return openBlock(), createBlock(unref(_sfc_main$k), {
                              key: headerGroup.id
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                                  return openBlock(), createBlock(unref(_sfc_main$l), {
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
                  _push3(ssrRenderComponent(unref(_sfc_main$m), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (unref(table).getRowModel().rows?.length) {
                          _push4(`<!--[-->`);
                          ssrRenderList(unref(table).getRowModel().rows, (row) => {
                            _push4(ssrRenderComponent(unref(_sfc_main$k), {
                              key: row.id
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<!--[-->`);
                                  ssrRenderList(row.getVisibleCells(), (cell) => {
                                    _push5(ssrRenderComponent(unref(_sfc_main$n), {
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
                                      return openBlock(), createBlock(unref(_sfc_main$n), {
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
                          _push4(ssrRenderComponent(unref(_sfc_main$k), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(_sfc_main$n), {
                                  colspan: columns.length,
                                  class: "h-24 text-center"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(` Tidak ada data retur. `);
                                    } else {
                                      return [
                                        createTextVNode(" Tidak ada data retur. ")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(_sfc_main$n), {
                                    colspan: columns.length,
                                    class: "h-24 text-center"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Tidak ada data retur. ")
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
                            return openBlock(), createBlock(unref(_sfc_main$k), {
                              key: row.id
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                                  return openBlock(), createBlock(unref(_sfc_main$n), {
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
                          }), 128)) : (openBlock(), createBlock(unref(_sfc_main$k), { key: 1 }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$n), {
                                colspan: columns.length,
                                class: "h-24 text-center"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Tidak ada data retur. ")
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
                    createVNode(unref(_sfc_main$j), null, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getHeaderGroups(), (headerGroup) => {
                          return openBlock(), createBlock(unref(_sfc_main$k), {
                            key: headerGroup.id
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                                return openBlock(), createBlock(unref(_sfc_main$l), {
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
                    createVNode(unref(_sfc_main$m), null, {
                      default: withCtx(() => [
                        unref(table).getRowModel().rows?.length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(table).getRowModel().rows, (row) => {
                          return openBlock(), createBlock(unref(_sfc_main$k), {
                            key: row.id
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                                return openBlock(), createBlock(unref(_sfc_main$n), {
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
                        }), 128)) : (openBlock(), createBlock(unref(_sfc_main$k), { key: 1 }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$n), {
                              colspan: columns.length,
                              class: "h-24 text-center"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Tidak ada data retur. ")
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
            if (__props.returns.last_page > 1) {
              _push2(ssrRenderComponent(_sfc_main$o, {
                data: {
                  current_page: __props.returns.current_page,
                  last_page: __props.returns.last_page,
                  per_page: __props.returns.per_page,
                  from: (__props.returns.current_page - 1) * __props.returns.per_page + 1,
                  to: Math.min(__props.returns.current_page * __props.returns.per_page, __props.returns.total),
                  total: __props.returns.total
                },
                url: unref(indexReturns).url(),
                filters: {
                  search: search.value || void 0,
                  status: statusFilter.value !== "all" ? statusFilter.value : void 0,
                  sort_by: sorting.value[0]?.id || "created_at",
                  sort_order: sorting.value[0]?.desc ? "desc" : "asc"
                }
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$p, {
              open: approveDialog.value.open,
              "onUpdate:open": ($event) => approveDialog.value.open = $event,
              title: "Setujui Retur?",
              description: `Apakah Anda yakin ingin menyetujui permintaan retur untuk order ${approveDialog.value.return?.order.order_number}?`,
              "confirm-text": "Setujui",
              "cancel-text": "Batal",
              onConfirm: handleApprove
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$p, {
              open: rejectDialog.value.open,
              "onUpdate:open": ($event) => rejectDialog.value.open = $event,
              title: "Tolak Retur?",
              description: `Apakah Anda yakin ingin menolak permintaan retur untuk order ${rejectDialog.value.return?.order.order_number}?`,
              "confirm-text": "Tolak",
              "cancel-text": "Batal",
              variant: "destructive",
              onConfirm: handleReject
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Head), { title: "Retur & Refund" }),
              createVNode("div", { class: "rounded-xl p-4 space-y-6 py-6" }, [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("div", null, [
                    createVNode("h1", { class: "text-3xl font-bold tracking-tight" }, "Retur & Refund"),
                    createVNode("p", { class: "text-muted-foreground" }, "Kelola permintaan retur produk")
                  ])
                ]),
                createVNode(_sfc_main$1, { statistics: __props.statistics }, null, 8, ["statistics"]),
                createVNode("div", { class: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" }, [
                  createVNode("div", { class: "flex flex-1 gap-4" }, [
                    createVNode("div", { class: "relative flex-1 max-w-sm" }, [
                      createVNode(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
                      createVNode(unref(_sfc_main$7), {
                        modelValue: search.value,
                        "onUpdate:modelValue": ($event) => search.value = $event,
                        placeholder: "Cari order atau customer...",
                        class: "pl-9"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(unref(_sfc_main$8), {
                      modelValue: statusFilter.value,
                      "onUpdate:modelValue": ($event) => statusFilter.value = $event
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$9), { class: "w-[180px]" }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$a), { placeholder: "Semua Status" })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$b), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$c), { value: "all" }, {
                              default: withCtx(() => [
                                createTextVNode("Semua Status")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), { value: "pending" }, {
                              default: withCtx(() => [
                                createTextVNode("Pending")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), { value: "approved" }, {
                              default: withCtx(() => [
                                createTextVNode("Approved")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), { value: "rejected" }, {
                              default: withCtx(() => [
                                createTextVNode("Rejected")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode(unref(_sfc_main$d), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$e), { "as-child": "" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$f), {
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
                      createVNode(unref(_sfc_main$g), { align: "end" }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getAllColumns().filter((column) => column.getCanHide()), (column) => {
                            return openBlock(), createBlock(unref(_sfc_main$h), {
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
                  createVNode(unref(_sfc_main$i), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$j), null, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getHeaderGroups(), (headerGroup) => {
                            return openBlock(), createBlock(unref(_sfc_main$k), {
                              key: headerGroup.id
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                                  return openBlock(), createBlock(unref(_sfc_main$l), {
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
                      createVNode(unref(_sfc_main$m), null, {
                        default: withCtx(() => [
                          unref(table).getRowModel().rows?.length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(table).getRowModel().rows, (row) => {
                            return openBlock(), createBlock(unref(_sfc_main$k), {
                              key: row.id
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                                  return openBlock(), createBlock(unref(_sfc_main$n), {
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
                          }), 128)) : (openBlock(), createBlock(unref(_sfc_main$k), { key: 1 }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$n), {
                                colspan: columns.length,
                                class: "h-24 text-center"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Tidak ada data retur. ")
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
                __props.returns.last_page > 1 ? (openBlock(), createBlock(_sfc_main$o, {
                  key: 0,
                  data: {
                    current_page: __props.returns.current_page,
                    last_page: __props.returns.last_page,
                    per_page: __props.returns.per_page,
                    from: (__props.returns.current_page - 1) * __props.returns.per_page + 1,
                    to: Math.min(__props.returns.current_page * __props.returns.per_page, __props.returns.total),
                    total: __props.returns.total
                  },
                  url: unref(indexReturns).url(),
                  filters: {
                    search: search.value || void 0,
                    status: statusFilter.value !== "all" ? statusFilter.value : void 0,
                    sort_by: sorting.value[0]?.id || "created_at",
                    sort_order: sorting.value[0]?.desc ? "desc" : "asc"
                  }
                }, null, 8, ["data", "url", "filters"])) : createCommentVNode("", true)
              ]),
              createVNode(_sfc_main$p, {
                open: approveDialog.value.open,
                "onUpdate:open": ($event) => approveDialog.value.open = $event,
                title: "Setujui Retur?",
                description: `Apakah Anda yakin ingin menyetujui permintaan retur untuk order ${approveDialog.value.return?.order.order_number}?`,
                "confirm-text": "Setujui",
                "cancel-text": "Batal",
                onConfirm: handleApprove
              }, null, 8, ["open", "onUpdate:open", "description"]),
              createVNode(_sfc_main$p, {
                open: rejectDialog.value.open,
                "onUpdate:open": ($event) => rejectDialog.value.open = $event,
                title: "Tolak Retur?",
                description: `Apakah Anda yakin ingin menolak permintaan retur untuk order ${rejectDialog.value.return?.order.order_number}?`,
                "confirm-text": "Tolak",
                "cancel-text": "Batal",
                variant: "destructive",
                onConfirm: handleReject
              }, null, 8, ["open", "onUpdate:open", "description"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Returns/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
