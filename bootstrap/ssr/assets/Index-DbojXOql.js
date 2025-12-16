import { defineComponent, ref, computed, h, watch, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { L as index, _ as _sfc_main$1, M as create, O as destroy, P as release, Q as flush, R as show } from "./AppLayout-B1qpBBmK.js";
import { _ as _sfc_main$o } from "./ConfirmDialog-CTU0x0KG.js";
import { _ as _sfc_main$n } from "./Pagination-DAUeA01Y.js";
import { _ as _sfc_main$p } from "./index-BpQimeTM.js";
import { v as valueUpdater, _ as _sfc_main$2 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5, c as _sfc_main$6 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$d, a as _sfc_main$e, b as _sfc_main$f, d as _sfc_main$g } from "./DropdownMenuTrigger-B1v6pHML.js";
import { _ as _sfc_main$7 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$8, a as _sfc_main$9, b as _sfc_main$a, c as _sfc_main$b, d as _sfc_main$c } from "./SelectValue-BUnv4mQg.js";
import { _ as _sfc_main$h, a as _sfc_main$i, b as _sfc_main$j, c as _sfc_main$k, d as _sfc_main$l, e as _sfc_main$m } from "./TableHeader-emcE6QAC.js";
import { router, Head } from "@inertiajs/vue3";
import { useVueTable, getFilteredRowModel, getSortedRowModel, getCoreRowModel, FlexRender } from "@tanstack/vue-table";
import { GitMerge, Plus, Receipt, DollarSign, Wallet, Search, Settings2, ChevronDown, CheckCircle, XCircle, ArrowUpDown, Eye, Trash2 } from "lucide-vue-next";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    bonuses: {},
    statistics: {},
    filters: {}
  },
  setup(__props) {
    const props = __props;
    const breadcrumbItems = [
      {
        title: "Bonus Pairing",
        href: index.url()
      }
    ];
    const search = ref(props.filters.search || "");
    const statusFilter = ref(props.filters.status?.toString() || "all");
    const sorting = ref([
      {
        id: props.filters.sort_by,
        desc: props.filters.sort_order === "desc"
      }
    ]);
    const columnFilters = ref([]);
    const columnVisibility = ref({});
    const rowSelection = ref({});
    const deleteDialog = ref({
      open: false,
      bonus: null
    });
    const releaseDialog = ref({
      open: false,
      bonus: null
    });
    const massReleaseDialog = ref({ open: false });
    const flushDialog = ref({ open: false });
    const selectedBonuses = computed(() => {
      return Object.keys(rowSelection.value).map((key) => props.bonuses.data[parseInt(key)]).filter(Boolean);
    });
    const selectedPendingBonuses = computed(
      () => selectedBonuses.value.filter((b) => b.status === 0)
    );
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
    const openDeleteDialog = (bonus) => {
      deleteDialog.value = { open: true, bonus };
    };
    const handleDelete = () => {
      if (!deleteDialog.value.bonus) return;
      router.delete(destroy.url(deleteDialog.value.bonus.id), {
        preserveScroll: true,
        onSuccess: () => {
          deleteDialog.value = { open: false, bonus: null };
        }
      });
    };
    const openReleaseDialog = (bonus) => {
      releaseDialog.value = { open: true, bonus };
    };
    const handleRelease = () => {
      if (!releaseDialog.value.bonus) return;
      router.post(
        release.url(releaseDialog.value.bonus.id),
        {},
        {
          preserveScroll: true,
          onSuccess: () => {
            releaseDialog.value = { open: false, bonus: null };
            rowSelection.value = {};
          }
        }
      );
    };
    const openMassReleaseDialog = () => {
      if (!selectedPendingBonuses.value.length) return;
      massReleaseDialog.value.open = true;
    };
    const handleMassRelease = () => {
      const bonusIds = selectedPendingBonuses.value.map((b) => b.id);
      let completed = 0;
      bonusIds.forEach((id) => {
        router.post(
          release.url(id),
          {},
          {
            preserveScroll: true,
            onSuccess: () => {
              completed++;
              if (completed === bonusIds.length) {
                rowSelection.value = {};
                massReleaseDialog.value.open = false;
                router.reload({ only: ["bonuses", "statistics"] });
              }
            }
          }
        );
      });
    };
    const handleFlush = () => {
      router.post(
        flush.url(),
        {},
        {
          preserveScroll: true,
          onSuccess: () => {
            flushDialog.value.open = false;
          }
        }
      );
    };
    const columns = [
      {
        id: "select",
        header: ({ table: table2 }) => {
          return h("input", {
            type: "checkbox",
            checked: table2.getIsAllPageRowsSelected(),
            indeterminate: table2.getIsSomePageRowsSelected(),
            onChange: table2.getToggleAllPageRowsSelectedHandler(),
            class: "h-4 w-4 rounded border-gray-300"
          });
        },
        cell: ({ row }) => {
          return h("input", {
            type: "checkbox",
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            onChange: row.getToggleSelectedHandler(),
            class: "h-4 w-4 rounded border-gray-300"
          });
        },
        enableSorting: false
      },
      {
        id: "index",
        header: () => h("div", { class: "w-12" }, "No"),
        cell: ({ row }) => {
          const index2 = row.index + 1 + (props.bonuses.current_page - 1) * props.bonuses.per_page;
          return h("div", { class: "font-medium" }, index2);
        }
      },
      {
        accessorKey: "member_name",
        header: () => "Member",
        cell: ({ row }) => {
          return h("div", [
            h("div", { class: "font-medium" }, row.original.member_name),
            h(
              "div",
              { class: "text-xs text-muted-foreground" },
              row.original.member_ewallet_id
            )
          ]);
        }
      },
      {
        accessorKey: "pair_count",
        header: () => "Pasangan",
        cell: ({ row }) => {
          return h(
            _sfc_main$p,
            {
              variant: "outline",
              class: "gap-1"
            },
            () => [h(GitMerge, { class: "h-3 w-3" }), `${row.original.pair_count} pasang`]
          );
        }
      },
      {
        accessorKey: "amount",
        header: () => h("div", { class: "text-right" }, "Jumlah"),
        cell: ({ row }) => {
          return h(
            "div",
            { class: "text-right font-medium" },
            formatCurrency(row.original.amount)
          );
        }
      },
      {
        accessorKey: "status",
        header: () => "Status",
        cell: ({ row }) => {
          const status = row.original.status;
          return h(
            _sfc_main$p,
            {
              variant: status === 1 ? "default" : "secondary",
              class: "gap-1"
            },
            () => [
              h(status === 1 ? CheckCircle : XCircle, { class: "h-3 w-3" }),
              row.original.status_text
            ]
          );
        }
      },
      {
        accessorKey: "created_at",
        header: ({ column }) => {
          return h(
            _sfc_main$2,
            {
              variant: "ghost",
              onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
              class: "-ml-4"
            },
            () => [
              "Tanggal",
              h(ArrowUpDown, { class: "ml-2 h-4 w-4" })
            ]
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
          const bonus = row.original;
          return h("div", { class: "flex justify-end gap-2" }, [
            h(
              _sfc_main$2,
              {
                variant: "outline",
                size: "sm",
                onClick: () => router.visit(show.url(bonus.id))
              },
              () => h(Eye, { class: "h-4 w-4" })
            ),
            bonus.status === 0 ? h(
              _sfc_main$2,
              {
                variant: "default",
                size: "sm",
                onClick: () => openReleaseDialog(bonus)
              },
              () => h(Wallet, { class: "h-4 w-4" })
            ) : null,
            bonus.status === 0 ? h(
              _sfc_main$2,
              {
                variant: "outline",
                size: "sm",
                onClick: () => openDeleteDialog(bonus)
              },
              () => h(Trash2, { class: "h-4 w-4 text-destructive" })
            ) : null
          ]);
        }
      }
    ];
    const table = useVueTable({
      get data() {
        return props.bonuses.data;
      },
      columns,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      state: {
        get sorting() {
          return sorting.value;
        },
        get columnFilters() {
          return columnFilters.value;
        },
        get columnVisibility() {
          return columnVisibility.value;
        },
        get rowSelection() {
          return rowSelection.value;
        }
      },
      onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
      onColumnFiltersChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnFilters),
      onColumnVisibilityChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnVisibility),
      onRowSelectionChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowSelection),
      manualSorting: true,
      enableRowSelection: true
    });
    watch(
      sorting,
      (newSorting) => {
        if (newSorting.length > 0) {
          router.get(
            index.url(),
            {
              search: search.value || void 0,
              status: statusFilter.value !== "all" ? parseInt(statusFilter.value) : void 0,
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
          index.url(),
          {
            search: search.value || void 0,
            status: statusFilter.value !== "all" ? parseInt(statusFilter.value) : void 0,
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
            _push2(ssrRenderComponent(unref(Head), { title: "Bonus Pairing" }, null, _parent2, _scopeId));
            _push2(`<div class="rounded-xl p-4 space-y-6 py-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="text-3xl font-bold tracking-tight"${_scopeId}>Bonus Pairing</h1><p class="text-muted-foreground"${_scopeId}>Kelola bonus pairing binary tree</p></div><div class="flex gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              variant: "outline",
              onClick: ($event) => flushDialog.value.open = true
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(GitMerge), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(` Proses Semua Pairing `);
                } else {
                  return [
                    createVNode(unref(GitMerge), { class: "h-4 w-4" }),
                    createTextVNode(" Proses Semua Pairing ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              onClick: ($event) => unref(router).visit(unref(create).url())
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Plus), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(` Proses Member `);
                } else {
                  return [
                    createVNode(unref(Plus), { class: "h-4 w-4" }),
                    createTextVNode(" Proses Member ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="grid gap-4 md:grid-cols-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$3), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Total Pending`);
                            } else {
                              return [
                                createTextVNode("Total Pending")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(Receipt), { class: "h-4 w-4 text-muted-foreground" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Total Pending")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(Receipt), { class: "h-4 w-4 text-muted-foreground" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-2xl font-bold"${_scopeId3}>${ssrInterpolate(formatCurrency(__props.statistics.total_pending))}</div><p class="text-xs text-muted-foreground"${_scopeId3}>${ssrInterpolate(__props.statistics.count_pending)} bonus </p>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatCurrency(__props.statistics.total_pending)), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(__props.statistics.count_pending) + " bonus ", 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$4), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                          default: withCtx(() => [
                            createTextVNode("Total Pending")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(Receipt), { class: "h-4 w-4 text-muted-foreground" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatCurrency(__props.statistics.total_pending)), 1),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(__props.statistics.count_pending) + " bonus ", 1)
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
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Total Released`);
                            } else {
                              return [
                                createTextVNode("Total Released")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(DollarSign), { class: "h-4 w-4 text-muted-foreground" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Total Released")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(DollarSign), { class: "h-4 w-4 text-muted-foreground" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-2xl font-bold"${_scopeId3}>${ssrInterpolate(formatCurrency(__props.statistics.total_released))}</div><p class="text-xs text-muted-foreground"${_scopeId3}>${ssrInterpolate(__props.statistics.count_released)} bonus </p>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatCurrency(__props.statistics.total_released)), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(__props.statistics.count_released) + " bonus ", 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$4), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                          default: withCtx(() => [
                            createTextVNode("Total Released")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(DollarSign), { class: "h-4 w-4 text-muted-foreground" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatCurrency(__props.statistics.total_released)), 1),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(__props.statistics.count_released) + " bonus ", 1)
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
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Total Pairs Pending`);
                            } else {
                              return [
                                createTextVNode("Total Pairs Pending")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(GitMerge), { class: "h-4 w-4 text-muted-foreground" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Total Pairs Pending")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(GitMerge), { class: "h-4 w-4 text-muted-foreground" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-2xl font-bold"${_scopeId3}>${ssrInterpolate(__props.statistics.total_pairs)}</div><p class="text-xs text-muted-foreground"${_scopeId3}> pairs belum di-release </p>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics.total_pairs), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, " pairs belum di-release ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$4), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                          default: withCtx(() => [
                            createTextVNode("Total Pairs Pending")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(GitMerge), { class: "h-4 w-4 text-muted-foreground" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics.total_pairs), 1),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, " pairs belum di-release ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (selectedPendingBonuses.value.length > 0) {
              _push2(`<div class="flex items-center justify-between rounded-lg border bg-muted/50 p-4"${_scopeId}><p class="text-sm font-medium"${_scopeId}>${ssrInterpolate(selectedPendingBonuses.value.length)} bonus pending dipilih </p>`);
              _push2(ssrRenderComponent(unref(_sfc_main$2), {
                size: "sm",
                onClick: openMassReleaseDialog
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Wallet), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                    _push3(` Release Semua `);
                  } else {
                    return [
                      createVNode(unref(Wallet), { class: "h-4 w-4" }),
                      createTextVNode(" Release Semua ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex items-center gap-4"${_scopeId}><div class="relative flex-1"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$7), {
              modelValue: search.value,
              "onUpdate:modelValue": ($event) => search.value = $event,
              placeholder: "Cari member atau deskripsi...",
              class: "pl-9"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$8), {
              modelValue: statusFilter.value,
              "onUpdate:modelValue": ($event) => statusFilter.value = $event
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$9), { class: "w-40" }, {
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
                        _push4(ssrRenderComponent(unref(_sfc_main$c), { value: "0" }, {
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
                        _push4(ssrRenderComponent(unref(_sfc_main$c), { value: "1" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Released`);
                            } else {
                              return [
                                createTextVNode("Released")
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
                          createVNode(unref(_sfc_main$c), { value: "0" }, {
                            default: withCtx(() => [
                              createTextVNode("Pending")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$c), { value: "1" }, {
                            default: withCtx(() => [
                              createTextVNode("Released")
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
                    createVNode(unref(_sfc_main$9), { class: "w-40" }, {
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
                        createVNode(unref(_sfc_main$c), { value: "0" }, {
                          default: withCtx(() => [
                            createTextVNode("Pending")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$c), { value: "1" }, {
                          default: withCtx(() => [
                            createTextVNode("Released")
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
            _push2(ssrRenderComponent(unref(_sfc_main$d), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$e), { "as-child": "" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$2), {
                          variant: "outline",
                          class: "ml-auto"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Settings2), { class: "h-4 w-4" }, null, _parent5, _scopeId4));
                              _push5(` Kolom `);
                              _push5(ssrRenderComponent(unref(ChevronDown), { class: "ml-2 h-4 w-4" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(Settings2), { class: "h-4 w-4" }),
                                createTextVNode(" Kolom "),
                                createVNode(unref(ChevronDown), { class: "ml-2 h-4 w-4" })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$2), {
                            variant: "outline",
                            class: "ml-auto"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Settings2), { class: "h-4 w-4" }),
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
                            checked: column.getIsVisible(),
                            "onUpdate:checked": (value) => column.toggleVisibility(!!value)
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
                              checked: column.getIsVisible(),
                              "onUpdate:checked": (value) => column.toggleVisibility(!!value)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(column.id), 1)
                              ]),
                              _: 2
                            }, 1032, ["checked", "onUpdate:checked"]);
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
                        createVNode(unref(_sfc_main$2), {
                          variant: "outline",
                          class: "ml-auto"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Settings2), { class: "h-4 w-4" }),
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
                            checked: column.getIsVisible(),
                            "onUpdate:checked": (value) => column.toggleVisibility(!!value)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(column.id), 1)
                            ]),
                            _: 2
                          }, 1032, ["checked", "onUpdate:checked"]);
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
                              key: row.id,
                              "data-state": row.getIsSelected() ? "selected" : void 0
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
                                      _push6(` Tidak ada data bonus. `);
                                    } else {
                                      return [
                                        createTextVNode(" Tidak ada data bonus. ")
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
                                      createTextVNode(" Tidak ada data bonus. ")
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
                              key: row.id,
                              "data-state": row.getIsSelected() ? "selected" : void 0
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
                            }, 1032, ["data-state"]);
                          }), 128)) : (openBlock(), createBlock(unref(_sfc_main$j), { key: 1 }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$m), {
                                colspan: columns.length,
                                class: "h-24 text-center"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Tidak ada data bonus. ")
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
                            key: row.id,
                            "data-state": row.getIsSelected() ? "selected" : void 0
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
                          }, 1032, ["data-state"]);
                        }), 128)) : (openBlock(), createBlock(unref(_sfc_main$j), { key: 1 }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$m), {
                              colspan: columns.length,
                              class: "h-24 text-center"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Tidak ada data bonus. ")
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
            _push2(ssrRenderComponent(_sfc_main$n, {
              data: __props.bonuses,
              url: unref(index).url(),
              filters: {
                search: search.value || void 0,
                status: statusFilter.value !== "all" ? parseInt(statusFilter.value) : void 0,
                sort_by: sorting.value[0]?.id,
                sort_order: sorting.value[0]?.desc ? "desc" : "asc"
              }
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$o, {
              open: deleteDialog.value.open,
              "onUpdate:open": ($event) => deleteDialog.value.open = $event,
              title: "Hapus Bonus?",
              description: `Apakah Anda yakin ingin menghapus bonus ini? Tindakan ini tidak dapat dibatalkan.`,
              "confirm-text": "Hapus",
              "cancel-text": "Batal",
              variant: "destructive",
              onConfirm: handleDelete
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$o, {
              open: releaseDialog.value.open,
              "onUpdate:open": ($event) => releaseDialog.value.open = $event,
              title: "Release Bonus?",
              description: `Bonus sebesar ${releaseDialog.value.bonus ? formatCurrency(releaseDialog.value.bonus.amount) : ""} (${releaseDialog.value.bonus?.pair_count} pasang) akan ditransfer ke ewallet member. Lanjutkan?`,
              "confirm-text": "Release",
              "cancel-text": "Batal",
              onConfirm: handleRelease
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$o, {
              open: massReleaseDialog.value.open,
              "onUpdate:open": ($event) => massReleaseDialog.value.open = $event,
              title: `Release ${selectedPendingBonuses.value.length} Bonus?`,
              description: `Total ${formatCurrency(selectedPendingBonuses.value.reduce((sum, b) => sum + b.amount, 0))} (${selectedPendingBonuses.value.reduce((sum, b) => sum + b.pair_count, 0)} pasang) akan ditransfer ke ewallet member. Lanjutkan?`,
              "confirm-text": "Release Semua",
              "cancel-text": "Batal",
              onConfirm: handleMassRelease
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$o, {
              open: flushDialog.value.open,
              "onUpdate:open": ($event) => flushDialog.value.open = $event,
              title: "Proses Semua Pairing?",
              description: "Sistem akan memproses bonus pairing untuk SEMUA member yang memiliki pasangan pending. Operasi ini biasanya dilakukan bulanan. Lanjutkan?",
              "confirm-text": "Proses Semua",
              "cancel-text": "Batal",
              onConfirm: handleFlush
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Head), { title: "Bonus Pairing" }),
              createVNode("div", { class: "rounded-xl p-4 space-y-6 py-6" }, [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("div", null, [
                    createVNode("h1", { class: "text-3xl font-bold tracking-tight" }, "Bonus Pairing"),
                    createVNode("p", { class: "text-muted-foreground" }, "Kelola bonus pairing binary tree")
                  ]),
                  createVNode("div", { class: "flex gap-2" }, [
                    createVNode(unref(_sfc_main$2), {
                      variant: "outline",
                      onClick: ($event) => flushDialog.value.open = true
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(GitMerge), { class: "h-4 w-4" }),
                        createTextVNode(" Proses Semua Pairing ")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(unref(_sfc_main$2), {
                      onClick: ($event) => unref(router).visit(unref(create).url())
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Plus), { class: "h-4 w-4" }),
                        createTextVNode(" Proses Member ")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ])
                ]),
                createVNode("div", { class: "grid gap-4 md:grid-cols-3" }, [
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$4), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Total Pending")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(Receipt), { class: "h-4 w-4 text-muted-foreground" })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatCurrency(__props.statistics.total_pending)), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(__props.statistics.count_pending) + " bonus ", 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$4), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Total Released")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(DollarSign), { class: "h-4 w-4 text-muted-foreground" })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatCurrency(__props.statistics.total_released)), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(__props.statistics.count_released) + " bonus ", 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$4), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Total Pairs Pending")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(GitMerge), { class: "h-4 w-4 text-muted-foreground" })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics.total_pairs), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, " pairs belum di-release ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                selectedPendingBonuses.value.length > 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "flex items-center justify-between rounded-lg border bg-muted/50 p-4"
                }, [
                  createVNode("p", { class: "text-sm font-medium" }, toDisplayString(selectedPendingBonuses.value.length) + " bonus pending dipilih ", 1),
                  createVNode(unref(_sfc_main$2), {
                    size: "sm",
                    onClick: openMassReleaseDialog
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Wallet), { class: "h-4 w-4" }),
                      createTextVNode(" Release Semua ")
                    ]),
                    _: 1
                  })
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "flex items-center gap-4" }, [
                  createVNode("div", { class: "relative flex-1" }, [
                    createVNode(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
                    createVNode(unref(_sfc_main$7), {
                      modelValue: search.value,
                      "onUpdate:modelValue": ($event) => search.value = $event,
                      placeholder: "Cari member atau deskripsi...",
                      class: "pl-9"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode(unref(_sfc_main$8), {
                    modelValue: statusFilter.value,
                    "onUpdate:modelValue": ($event) => statusFilter.value = $event
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$9), { class: "w-40" }, {
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
                          createVNode(unref(_sfc_main$c), { value: "0" }, {
                            default: withCtx(() => [
                              createTextVNode("Pending")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$c), { value: "1" }, {
                            default: withCtx(() => [
                              createTextVNode("Released")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(unref(_sfc_main$d), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$e), { "as-child": "" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$2), {
                            variant: "outline",
                            class: "ml-auto"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Settings2), { class: "h-4 w-4" }),
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
                              checked: column.getIsVisible(),
                              "onUpdate:checked": (value) => column.toggleVisibility(!!value)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(column.id), 1)
                              ]),
                              _: 2
                            }, 1032, ["checked", "onUpdate:checked"]);
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
                              key: row.id,
                              "data-state": row.getIsSelected() ? "selected" : void 0
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
                            }, 1032, ["data-state"]);
                          }), 128)) : (openBlock(), createBlock(unref(_sfc_main$j), { key: 1 }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$m), {
                                colspan: columns.length,
                                class: "h-24 text-center"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Tidak ada data bonus. ")
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
                createVNode(_sfc_main$n, {
                  data: __props.bonuses,
                  url: unref(index).url(),
                  filters: {
                    search: search.value || void 0,
                    status: statusFilter.value !== "all" ? parseInt(statusFilter.value) : void 0,
                    sort_by: sorting.value[0]?.id,
                    sort_order: sorting.value[0]?.desc ? "desc" : "asc"
                  }
                }, null, 8, ["data", "url", "filters"])
              ]),
              createVNode(_sfc_main$o, {
                open: deleteDialog.value.open,
                "onUpdate:open": ($event) => deleteDialog.value.open = $event,
                title: "Hapus Bonus?",
                description: `Apakah Anda yakin ingin menghapus bonus ini? Tindakan ini tidak dapat dibatalkan.`,
                "confirm-text": "Hapus",
                "cancel-text": "Batal",
                variant: "destructive",
                onConfirm: handleDelete
              }, null, 8, ["open", "onUpdate:open"]),
              createVNode(_sfc_main$o, {
                open: releaseDialog.value.open,
                "onUpdate:open": ($event) => releaseDialog.value.open = $event,
                title: "Release Bonus?",
                description: `Bonus sebesar ${releaseDialog.value.bonus ? formatCurrency(releaseDialog.value.bonus.amount) : ""} (${releaseDialog.value.bonus?.pair_count} pasang) akan ditransfer ke ewallet member. Lanjutkan?`,
                "confirm-text": "Release",
                "cancel-text": "Batal",
                onConfirm: handleRelease
              }, null, 8, ["open", "onUpdate:open", "description"]),
              createVNode(_sfc_main$o, {
                open: massReleaseDialog.value.open,
                "onUpdate:open": ($event) => massReleaseDialog.value.open = $event,
                title: `Release ${selectedPendingBonuses.value.length} Bonus?`,
                description: `Total ${formatCurrency(selectedPendingBonuses.value.reduce((sum, b) => sum + b.amount, 0))} (${selectedPendingBonuses.value.reduce((sum, b) => sum + b.pair_count, 0)} pasang) akan ditransfer ke ewallet member. Lanjutkan?`,
                "confirm-text": "Release Semua",
                "cancel-text": "Batal",
                onConfirm: handleMassRelease
              }, null, 8, ["open", "onUpdate:open", "title", "description"]),
              createVNode(_sfc_main$o, {
                open: flushDialog.value.open,
                "onUpdate:open": ($event) => flushDialog.value.open = $event,
                title: "Proses Semua Pairing?",
                description: "Sistem akan memproses bonus pairing untuk SEMUA member yang memiliki pasangan pending. Operasi ini biasanya dilakukan bulanan. Lanjutkan?",
                "confirm-text": "Proses Semua",
                "cancel-text": "Batal",
                onConfirm: handleFlush
              }, null, 8, ["open", "onUpdate:open"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/bonus/pairing/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
