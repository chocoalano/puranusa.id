import { defineComponent, ref, computed, h, watch, unref, withCtx, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, Fragment, toDisplayString, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { P as index, _ as _sfc_main$8, Q as destroy, R as release, S as massRelease } from "./AppLayout-B3xU4M63.js";
import { _ as _sfc_main$q } from "./ConfirmDialog-CTU0x0KG.js";
import { _ as _sfc_main$p } from "./Pagination-DAUeA01Y.js";
import { _ as _sfc_main$s } from "./index-BpQimeTM.js";
import { v as valueUpdater, _ as _sfc_main$3 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$9, a as _sfc_main$a, b as _sfc_main$b, c as _sfc_main$c } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$r } from "./Checkbox-CIOQa2-J.js";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$4, f as _sfc_main$5, g as _sfc_main$6, c as _sfc_main$7 } from "./DropdownMenuTrigger-B1v6pHML.js";
import { _ as _sfc_main$d } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$e, a as _sfc_main$f, b as _sfc_main$g, c as _sfc_main$h, d as _sfc_main$i } from "./SelectValue-BUnv4mQg.js";
import { _ as _sfc_main$j, a as _sfc_main$k, b as _sfc_main$l, c as _sfc_main$m, d as _sfc_main$n, e as _sfc_main$o } from "./TableHeader-emcE6QAC.js";
import { router, Head, useForm } from "@inertiajs/vue3";
import { useVueTable, getFilteredRowModel, getSortedRowModel, getCoreRowModel, FlexRender } from "@tanstack/vue-table";
import { createReusableTemplate } from "@vueuse/core";
import { MoreHorizontal, Wallet, Trash2, Award, Plus, Clock, Receipt, XCircle, Search, ArrowUpDown, AlertTriangle, CheckCircle } from "lucide-vue-next";
import "class-variance-authority";
import "reka-ui";
import "./index-Jhngbhhu.js";
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
      { title: "Bonus Lifetime Cash Reward", href: index.url() }
    ];
    const search = ref(props.filters.search || "");
    const statusFilter = ref(props.filters.status?.toString() || "all");
    const sorting = ref([
      { id: props.filters.sort_by, desc: props.filters.sort_order === "desc" }
    ]);
    const columnFilters = ref([]);
    const columnVisibility = ref({});
    const rowSelection = ref({});
    const [DefineActionsTemplate, ReuseActionsTemplate] = createReusableTemplate();
    const deleteDialog = ref({ open: false, bonus: null });
    const releaseDialog = ref({ open: false, bonus: null });
    const massReleaseDialog = ref({ open: false });
    const selectedBonuses = computed(
      () => Object.keys(rowSelection.value).map((key) => props.bonuses.data[parseInt(key)]).filter(Boolean)
    );
    const selectedPendingBonuses = computed(() => selectedBonuses.value.filter((b) => b.status === 0));
    const formatCurrency = (amount) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount);
    const formatNumber = (num) => new Intl.NumberFormat("id-ID").format(num);
    const formatDate = (date) => new Date(date).toLocaleDateString("id-ID", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
    const getStatusVariant = (status) => {
      switch (status) {
        case 1:
          return "default";
        case 2:
          return "destructive";
        default:
          return "secondary";
      }
    };
    const getStatusIcon = (status) => {
      switch (status) {
        case 1:
          return CheckCircle;
        case 2:
          return AlertTriangle;
        default:
          return Clock;
      }
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
      const releaseForm = useForm({});
      releaseForm.post(release.url(releaseDialog.value.bonus.id), {
        preserveScroll: true,
        onSuccess: () => {
          releaseDialog.value = { open: false, bonus: null };
          rowSelection.value = {};
        }
      });
    };
    const openMassReleaseDialog = () => {
      if (!selectedPendingBonuses.value.length) return;
      massReleaseDialog.value.open = true;
    };
    const handleMassRelease = () => {
      const bonusIds = selectedPendingBonuses.value.map((b) => b.id);
      const massReleaseForm = useForm({ ids: bonusIds });
      massReleaseForm.post(massRelease.url(), {
        preserveScroll: true,
        onSuccess: () => {
          rowSelection.value = {};
          massReleaseDialog.value.open = false;
        }
      });
    };
    const columns = [
      {
        id: "select",
        header: ({ table: table2 }) => h(_sfc_main$r, {
          modelValue: table2.getIsAllPageRowsSelected() || table2.getIsSomePageRowsSelected() && "indeterminate",
          "onUpdate:modelValue": (value) => table2.toggleAllPageRowsSelected(!!value),
          ariaLabel: "Select all"
        }),
        cell: ({ row }) => h(_sfc_main$r, {
          modelValue: row.getIsSelected(),
          "onUpdate:modelValue": (value) => row.toggleSelected(!!value),
          ariaLabel: "Select row"
        }),
        enableSorting: false,
        enableHiding: false
      },
      {
        id: "index",
        header: () => h("div", { class: "w-12" }, "No"),
        cell: ({ row }) => h("div", { class: "font-medium" }, row.index + 1 + (props.bonuses.current_page - 1) * props.bonuses.per_page)
      },
      {
        accessorKey: "member_name",
        header: () => "Member",
        cell: ({ row }) => h("div", [
          h("div", { class: "font-medium" }, row.original.member_name),
          h("div", { class: "text-xs text-muted-foreground" }, row.original.member_ewallet_id)
        ])
      },
      {
        accessorKey: "reward_name",
        header: () => "Nama Reward",
        cell: ({ row }) => h("div", { class: "font-medium" }, row.original.reward_name)
      },
      {
        accessorKey: "reward",
        header: () => h("div", { class: "text-right" }, "Reward"),
        cell: ({ row }) => h("div", { class: "text-right font-medium" }, formatCurrency(row.original.reward))
      },
      {
        accessorKey: "bv",
        header: () => h("div", { class: "text-right" }, "BV"),
        cell: ({ row }) => h("div", { class: "text-right text-muted-foreground" }, formatNumber(row.original.bv))
      },
      {
        accessorKey: "status",
        header: () => "Status",
        cell: ({ row }) => h(_sfc_main$s, { variant: getStatusVariant(row.original.status), class: "gap-1" }, () => [
          h(getStatusIcon(row.original.status), { class: "h-3 w-3" }),
          row.original.status_text
        ])
      },
      {
        accessorKey: "created_at",
        header: ({ column }) => h(_sfc_main$3, { variant: "ghost", onClick: () => column.toggleSorting(column.getIsSorted() === "asc"), class: "-ml-4" }, () => ["Tanggal", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]),
        cell: ({ row }) => formatDate(row.getValue("created_at"))
      },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => h(ReuseActionsTemplate, { bonus: row.original, onRelease: () => openReleaseDialog(row.original), onDelete: () => openDeleteDialog(row.original) })
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
      onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
      onColumnFiltersChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnFilters),
      onColumnVisibilityChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnVisibility),
      onRowSelectionChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowSelection),
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
      manualSorting: true,
      enableRowSelection: true
    });
    watch(sorting, (newSorting) => {
      if (newSorting.length > 0) {
        router.get(index.url(), {
          search: search.value || void 0,
          status: statusFilter.value !== "all" ? parseInt(statusFilter.value) : void 0,
          sort_by: newSorting[0].id,
          sort_order: newSorting[0].desc ? "desc" : "asc"
        }, { preserveState: true, preserveScroll: true });
      }
    }, { deep: true });
    let searchTimeout;
    watch([search, statusFilter], () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        router.get(index.url(), {
          search: search.value || void 0,
          status: statusFilter.value !== "all" ? parseInt(statusFilter.value) : void 0,
          sort_by: sorting.value[0]?.id || "created_at",
          sort_order: sorting.value[0]?.desc ? "desc" : "asc"
        }, { preserveState: true, preserveScroll: true });
      }, 300);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(DefineActionsTemplate), null, {
        default: withCtx(({ bonus, onRelease, onDelete }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$1), null, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$2), { "as-child": "" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$3), {
                          variant: "ghost",
                          class: "h-8 w-8 p-0"
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<span class="sr-only"${_scopeId4}>Open menu</span>`);
                              _push5(ssrRenderComponent(unref(MoreHorizontal), { class: "h-4 w-4" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode("span", { class: "sr-only" }, "Open menu"),
                                createVNode(unref(MoreHorizontal), { class: "h-4 w-4" })
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$3), {
                            variant: "ghost",
                            class: "h-8 w-8 p-0"
                          }, {
                            default: withCtx(() => [
                              createVNode("span", { class: "sr-only" }, "Open menu"),
                              createVNode(unref(MoreHorizontal), { class: "h-4 w-4" })
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { align: "end" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Actions`);
                            } else {
                              return [
                                createTextVNode("Actions")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        if (bonus.status === 0) {
                          _push4(`<!--[-->`);
                          _push4(ssrRenderComponent(unref(_sfc_main$6), null, null, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$7), { onClick: onRelease }, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(Wallet), { class: "mr-2 h-4 w-4" }, null, _parent5, _scopeId4));
                                _push5(` Release Bonus `);
                              } else {
                                return [
                                  createVNode(unref(Wallet), { class: "mr-2 h-4 w-4" }),
                                  createTextVNode(" Release Bonus ")
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(`<!--]-->`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(ssrRenderComponent(unref(_sfc_main$6), null, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$7), {
                          class: "text-destructive",
                          onClick: onDelete
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Trash2), { class: "mr-2 h-4 w-4" }, null, _parent5, _scopeId4));
                              _push5(` Hapus `);
                            } else {
                              return [
                                createVNode(unref(Trash2), { class: "mr-2 h-4 w-4" }),
                                createTextVNode(" Hapus ")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Actions")
                            ]),
                            _: 1
                          }),
                          bonus.status === 0 ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                            createVNode(unref(_sfc_main$6)),
                            createVNode(unref(_sfc_main$7), { onClick: onRelease }, {
                              default: withCtx(() => [
                                createVNode(unref(Wallet), { class: "mr-2 h-4 w-4" }),
                                createTextVNode(" Release Bonus ")
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ], 64)) : createCommentVNode("", true),
                          createVNode(unref(_sfc_main$6)),
                          createVNode(unref(_sfc_main$7), {
                            class: "text-destructive",
                            onClick: onDelete
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Trash2), { class: "mr-2 h-4 w-4" }),
                              createTextVNode(" Hapus ")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$2), { "as-child": "" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$3), {
                          variant: "ghost",
                          class: "h-8 w-8 p-0"
                        }, {
                          default: withCtx(() => [
                            createVNode("span", { class: "sr-only" }, "Open menu"),
                            createVNode(unref(MoreHorizontal), { class: "h-4 w-4" })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$4), { align: "end" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Actions")
                          ]),
                          _: 1
                        }),
                        bonus.status === 0 ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                          createVNode(unref(_sfc_main$6)),
                          createVNode(unref(_sfc_main$7), { onClick: onRelease }, {
                            default: withCtx(() => [
                              createVNode(unref(Wallet), { class: "mr-2 h-4 w-4" }),
                              createTextVNode(" Release Bonus ")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ], 64)) : createCommentVNode("", true),
                        createVNode(unref(_sfc_main$6)),
                        createVNode(unref(_sfc_main$7), {
                          class: "text-destructive",
                          onClick: onDelete
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Trash2), { class: "mr-2 h-4 w-4" }),
                            createTextVNode(" Hapus ")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]),
                      _: 2
                    }, 1024)
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$1), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$2), { "as-child": "" }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$3), {
                        variant: "ghost",
                        class: "h-8 w-8 p-0"
                      }, {
                        default: withCtx(() => [
                          createVNode("span", { class: "sr-only" }, "Open menu"),
                          createVNode(unref(MoreHorizontal), { class: "h-4 w-4" })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$4), { align: "end" }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Actions")
                        ]),
                        _: 1
                      }),
                      bonus.status === 0 ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                        createVNode(unref(_sfc_main$6)),
                        createVNode(unref(_sfc_main$7), { onClick: onRelease }, {
                          default: withCtx(() => [
                            createVNode(unref(Wallet), { class: "mr-2 h-4 w-4" }),
                            createTextVNode(" Release Bonus ")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ], 64)) : createCommentVNode("", true),
                      createVNode(unref(_sfc_main$6)),
                      createVNode(unref(_sfc_main$7), {
                        class: "text-destructive",
                        onClick: onDelete
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Trash2), { class: "mr-2 h-4 w-4" }),
                          createTextVNode(" Hapus ")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1024)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$8, { breadcrumbs: breadcrumbItems }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Bonus Lifetime Cash Reward" }, null, _parent2, _scopeId));
            _push2(`<div class="flex h-full flex-1 flex-col gap-6 p-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="text-3xl font-bold tracking-tight flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Award), { class: "h-8 w-8" }, null, _parent2, _scopeId));
            _push2(` Bonus Lifetime Cash Reward </h1><p class="text-muted-foreground"${_scopeId}>Kelola bonus lifetime cash reward member</p></div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$3), {
              onClick: ($event) => unref(router).visit("/bonus/lifetime-cash-reward/create")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Plus), { class: "mr-2 h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(` Tambah Bonus `);
                } else {
                  return [
                    createVNode(unref(Plus), { class: "mr-2 h-4 w-4" }),
                    createTextVNode(" Tambah Bonus ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="grid gap-4 md:grid-cols-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$9), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$a), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$b), { class: "text-sm font-medium" }, {
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
                        _push4(ssrRenderComponent(unref(Clock), { class: "h-4 w-4 text-muted-foreground" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$b), { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Total Pending")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(Clock), { class: "h-4 w-4 text-muted-foreground" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$c), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-2xl font-bold"${_scopeId3}>${ssrInterpolate(formatCurrency(__props.statistics.total_pending))}</div><p class="text-xs text-muted-foreground"${_scopeId3}>${ssrInterpolate(__props.statistics.count_pending)} reward</p>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatCurrency(__props.statistics.total_pending)), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(__props.statistics.count_pending) + " reward", 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$a), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$b), { class: "text-sm font-medium" }, {
                          default: withCtx(() => [
                            createTextVNode("Total Pending")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(Clock), { class: "h-4 w-4 text-muted-foreground" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$c), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatCurrency(__props.statistics.total_pending)), 1),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(__props.statistics.count_pending) + " reward", 1)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$9), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$a), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$b), { class: "text-sm font-medium" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Total Claimed`);
                            } else {
                              return [
                                createTextVNode("Total Claimed")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(Receipt), { class: "h-4 w-4 text-muted-foreground" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$b), { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Total Claimed")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(Receipt), { class: "h-4 w-4 text-muted-foreground" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$c), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-2xl font-bold text-green-600"${_scopeId3}>${ssrInterpolate(formatCurrency(__props.statistics.total_claimed))}</div><p class="text-xs text-muted-foreground"${_scopeId3}>${ssrInterpolate(__props.statistics.count_claimed)} reward</p>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-2xl font-bold text-green-600" }, toDisplayString(formatCurrency(__props.statistics.total_claimed)), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(__props.statistics.count_claimed) + " reward", 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$a), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$b), { class: "text-sm font-medium" }, {
                          default: withCtx(() => [
                            createTextVNode("Total Claimed")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(Receipt), { class: "h-4 w-4 text-muted-foreground" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$c), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-2xl font-bold text-green-600" }, toDisplayString(formatCurrency(__props.statistics.total_claimed)), 1),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(__props.statistics.count_claimed) + " reward", 1)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$9), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$a), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$b), { class: "text-sm font-medium" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Total Expired`);
                            } else {
                              return [
                                createTextVNode("Total Expired")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(XCircle), { class: "h-4 w-4 text-muted-foreground" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$b), { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Total Expired")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(XCircle), { class: "h-4 w-4 text-muted-foreground" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$c), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-2xl font-bold text-red-600"${_scopeId3}>${ssrInterpolate(formatCurrency(__props.statistics.total_expired))}</div><p class="text-xs text-muted-foreground"${_scopeId3}>${ssrInterpolate(__props.statistics.count_expired)} reward</p>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-2xl font-bold text-red-600" }, toDisplayString(formatCurrency(__props.statistics.total_expired)), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(__props.statistics.count_expired) + " reward", 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$a), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$b), { class: "text-sm font-medium" }, {
                          default: withCtx(() => [
                            createTextVNode("Total Expired")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(XCircle), { class: "h-4 w-4 text-muted-foreground" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$c), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-2xl font-bold text-red-600" }, toDisplayString(formatCurrency(__props.statistics.total_expired)), 1),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(__props.statistics.count_expired) + " reward", 1)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"${_scopeId}><div class="flex flex-1 items-center gap-4"${_scopeId}><div class="relative flex-1 md:max-w-sm"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$d), {
              modelValue: search.value,
              "onUpdate:modelValue": ($event) => search.value = $event,
              placeholder: "Cari member atau nama reward...",
              class: "pl-9"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$e), {
              modelValue: statusFilter.value,
              "onUpdate:modelValue": ($event) => statusFilter.value = $event
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$f), { class: "w-40" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$g), { placeholder: "Semua Status" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$g), { placeholder: "Semua Status" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$h), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$i), { value: "all" }, {
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
                        _push4(ssrRenderComponent(unref(_sfc_main$i), { value: "0" }, {
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
                        _push4(ssrRenderComponent(unref(_sfc_main$i), { value: "1" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Claimed`);
                            } else {
                              return [
                                createTextVNode("Claimed")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$i), { value: "2" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Expired`);
                            } else {
                              return [
                                createTextVNode("Expired")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$i), { value: "all" }, {
                            default: withCtx(() => [
                              createTextVNode("Semua Status")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$i), { value: "0" }, {
                            default: withCtx(() => [
                              createTextVNode("Pending")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$i), { value: "1" }, {
                            default: withCtx(() => [
                              createTextVNode("Claimed")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$i), { value: "2" }, {
                            default: withCtx(() => [
                              createTextVNode("Expired")
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
                    createVNode(unref(_sfc_main$f), { class: "w-40" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$g), { placeholder: "Semua Status" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$h), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$i), { value: "all" }, {
                          default: withCtx(() => [
                            createTextVNode("Semua Status")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$i), { value: "0" }, {
                          default: withCtx(() => [
                            createTextVNode("Pending")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$i), { value: "1" }, {
                          default: withCtx(() => [
                            createTextVNode("Claimed")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$i), { value: "2" }, {
                          default: withCtx(() => [
                            createTextVNode("Expired")
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
            if (selectedPendingBonuses.value.length) {
              _push2(ssrRenderComponent(unref(_sfc_main$3), {
                variant: "outline",
                onClick: openMassReleaseDialog
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Wallet), { class: "mr-2 h-4 w-4" }, null, _parent3, _scopeId2));
                    _push3(` Release ${ssrInterpolate(selectedPendingBonuses.value.length)} Bonus `);
                  } else {
                    return [
                      createVNode(unref(Wallet), { class: "mr-2 h-4 w-4" }),
                      createTextVNode(" Release " + toDisplayString(selectedPendingBonuses.value.length) + " Bonus ", 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="rounded-md border"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$j), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$k), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(unref(table).getHeaderGroups(), (headerGroup) => {
                          _push4(ssrRenderComponent(unref(_sfc_main$l), {
                            key: headerGroup.id
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(headerGroup.headers, (header) => {
                                  _push5(ssrRenderComponent(unref(_sfc_main$m), {
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
                                    return openBlock(), createBlock(unref(_sfc_main$m), {
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
                            return openBlock(), createBlock(unref(_sfc_main$l), {
                              key: headerGroup.id
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                                  return openBlock(), createBlock(unref(_sfc_main$m), {
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
                  _push3(ssrRenderComponent(unref(_sfc_main$n), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (unref(table).getRowModel().rows?.length) {
                          _push4(`<!--[-->`);
                          ssrRenderList(unref(table).getRowModel().rows, (row) => {
                            _push4(ssrRenderComponent(unref(_sfc_main$l), {
                              key: row.id,
                              "data-state": row.getIsSelected() && "selected"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<!--[-->`);
                                  ssrRenderList(row.getVisibleCells(), (cell) => {
                                    _push5(ssrRenderComponent(unref(_sfc_main$o), {
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
                                      return openBlock(), createBlock(unref(_sfc_main$o), {
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
                          _push4(ssrRenderComponent(unref(_sfc_main$l), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(_sfc_main$o), {
                                  colspan: columns.length,
                                  class: "h-24 text-center"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`Tidak ada data.`);
                                    } else {
                                      return [
                                        createTextVNode("Tidak ada data.")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(_sfc_main$o), {
                                    colspan: columns.length,
                                    class: "h-24 text-center"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Tidak ada data.")
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
                            return openBlock(), createBlock(unref(_sfc_main$l), {
                              key: row.id,
                              "data-state": row.getIsSelected() && "selected"
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                                  return openBlock(), createBlock(unref(_sfc_main$o), {
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
                          }), 128)) : (openBlock(), createBlock(unref(_sfc_main$l), { key: 1 }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$o), {
                                colspan: columns.length,
                                class: "h-24 text-center"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Tidak ada data.")
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
                    createVNode(unref(_sfc_main$k), null, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getHeaderGroups(), (headerGroup) => {
                          return openBlock(), createBlock(unref(_sfc_main$l), {
                            key: headerGroup.id
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                                return openBlock(), createBlock(unref(_sfc_main$m), {
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
                    createVNode(unref(_sfc_main$n), null, {
                      default: withCtx(() => [
                        unref(table).getRowModel().rows?.length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(table).getRowModel().rows, (row) => {
                          return openBlock(), createBlock(unref(_sfc_main$l), {
                            key: row.id,
                            "data-state": row.getIsSelected() && "selected"
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                                return openBlock(), createBlock(unref(_sfc_main$o), {
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
                        }), 128)) : (openBlock(), createBlock(unref(_sfc_main$l), { key: 1 }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$o), {
                              colspan: columns.length,
                              class: "h-24 text-center"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Tidak ada data.")
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
            _push2(ssrRenderComponent(_sfc_main$p, {
              data: __props.bonuses,
              url: unref(index).url()
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$q, {
              open: deleteDialog.value.open,
              title: "Hapus Bonus",
              description: "Apakah Anda yakin ingin menghapus bonus ini?",
              "confirm-text": "Hapus",
              "onUpdate:open": ($event) => deleteDialog.value.open = $event,
              onConfirm: handleDelete
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$q, {
              open: releaseDialog.value.open,
              title: "Release Bonus",
              description: `Apakah Anda yakin ingin merilis reward ${releaseDialog.value.bonus?.reward_name} sebesar ${releaseDialog.value.bonus ? formatCurrency(releaseDialog.value.bonus.reward) : ""} ke member?`,
              "confirm-text": "Release",
              "onUpdate:open": ($event) => releaseDialog.value.open = $event,
              onConfirm: handleRelease
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$q, {
              open: massReleaseDialog.value.open,
              title: "Mass Release Bonus",
              description: `Apakah Anda yakin ingin merilis ${selectedPendingBonuses.value.length} bonus yang dipilih?`,
              "confirm-text": "Release All",
              "onUpdate:open": ($event) => massReleaseDialog.value.open = $event,
              onConfirm: handleMassRelease
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Head), { title: "Bonus Lifetime Cash Reward" }),
              createVNode("div", { class: "flex h-full flex-1 flex-col gap-6 p-6" }, [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("div", null, [
                    createVNode("h1", { class: "text-3xl font-bold tracking-tight flex items-center gap-2" }, [
                      createVNode(unref(Award), { class: "h-8 w-8" }),
                      createTextVNode(" Bonus Lifetime Cash Reward ")
                    ]),
                    createVNode("p", { class: "text-muted-foreground" }, "Kelola bonus lifetime cash reward member")
                  ]),
                  createVNode(unref(_sfc_main$3), {
                    onClick: ($event) => unref(router).visit("/bonus/lifetime-cash-reward/create")
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Plus), { class: "mr-2 h-4 w-4" }),
                      createTextVNode(" Tambah Bonus ")
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ]),
                createVNode("div", { class: "grid gap-4 md:grid-cols-4" }, [
                  createVNode(unref(_sfc_main$9), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$a), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$b), { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Total Pending")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(Clock), { class: "h-4 w-4 text-muted-foreground" })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$c), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatCurrency(__props.statistics.total_pending)), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(__props.statistics.count_pending) + " reward", 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$9), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$a), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$b), { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Total Claimed")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(Receipt), { class: "h-4 w-4 text-muted-foreground" })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$c), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-2xl font-bold text-green-600" }, toDisplayString(formatCurrency(__props.statistics.total_claimed)), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(__props.statistics.count_claimed) + " reward", 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$9), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$a), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$b), { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Total Expired")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(XCircle), { class: "h-4 w-4 text-muted-foreground" })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$c), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-2xl font-bold text-red-600" }, toDisplayString(formatCurrency(__props.statistics.total_expired)), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(__props.statistics.count_expired) + " reward", 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between" }, [
                  createVNode("div", { class: "flex flex-1 items-center gap-4" }, [
                    createVNode("div", { class: "relative flex-1 md:max-w-sm" }, [
                      createVNode(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
                      createVNode(unref(_sfc_main$d), {
                        modelValue: search.value,
                        "onUpdate:modelValue": ($event) => search.value = $event,
                        placeholder: "Cari member atau nama reward...",
                        class: "pl-9"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(unref(_sfc_main$e), {
                      modelValue: statusFilter.value,
                      "onUpdate:modelValue": ($event) => statusFilter.value = $event
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$f), { class: "w-40" }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$g), { placeholder: "Semua Status" })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$h), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$i), { value: "all" }, {
                              default: withCtx(() => [
                                createTextVNode("Semua Status")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$i), { value: "0" }, {
                              default: withCtx(() => [
                                createTextVNode("Pending")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$i), { value: "1" }, {
                              default: withCtx(() => [
                                createTextVNode("Claimed")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$i), { value: "2" }, {
                              default: withCtx(() => [
                                createTextVNode("Expired")
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
                  selectedPendingBonuses.value.length ? (openBlock(), createBlock(unref(_sfc_main$3), {
                    key: 0,
                    variant: "outline",
                    onClick: openMassReleaseDialog
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Wallet), { class: "mr-2 h-4 w-4" }),
                      createTextVNode(" Release " + toDisplayString(selectedPendingBonuses.value.length) + " Bonus ", 1)
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "rounded-md border" }, [
                  createVNode(unref(_sfc_main$j), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$k), null, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getHeaderGroups(), (headerGroup) => {
                            return openBlock(), createBlock(unref(_sfc_main$l), {
                              key: headerGroup.id
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                                  return openBlock(), createBlock(unref(_sfc_main$m), {
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
                      createVNode(unref(_sfc_main$n), null, {
                        default: withCtx(() => [
                          unref(table).getRowModel().rows?.length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(table).getRowModel().rows, (row) => {
                            return openBlock(), createBlock(unref(_sfc_main$l), {
                              key: row.id,
                              "data-state": row.getIsSelected() && "selected"
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                                  return openBlock(), createBlock(unref(_sfc_main$o), {
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
                          }), 128)) : (openBlock(), createBlock(unref(_sfc_main$l), { key: 1 }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$o), {
                                colspan: columns.length,
                                class: "h-24 text-center"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Tidak ada data.")
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
                createVNode(_sfc_main$p, {
                  data: __props.bonuses,
                  url: unref(index).url()
                }, null, 8, ["data", "url"])
              ]),
              createVNode(_sfc_main$q, {
                open: deleteDialog.value.open,
                title: "Hapus Bonus",
                description: "Apakah Anda yakin ingin menghapus bonus ini?",
                "confirm-text": "Hapus",
                "onUpdate:open": ($event) => deleteDialog.value.open = $event,
                onConfirm: handleDelete
              }, null, 8, ["open", "onUpdate:open"]),
              createVNode(_sfc_main$q, {
                open: releaseDialog.value.open,
                title: "Release Bonus",
                description: `Apakah Anda yakin ingin merilis reward ${releaseDialog.value.bonus?.reward_name} sebesar ${releaseDialog.value.bonus ? formatCurrency(releaseDialog.value.bonus.reward) : ""} ke member?`,
                "confirm-text": "Release",
                "onUpdate:open": ($event) => releaseDialog.value.open = $event,
                onConfirm: handleRelease
              }, null, 8, ["open", "description", "onUpdate:open"]),
              createVNode(_sfc_main$q, {
                open: massReleaseDialog.value.open,
                title: "Mass Release Bonus",
                description: `Apakah Anda yakin ingin merilis ${selectedPendingBonuses.value.length} bonus yang dipilih?`,
                "confirm-text": "Release All",
                "onUpdate:open": ($event) => massReleaseDialog.value.open = $event,
                onConfirm: handleMassRelease
              }, null, 8, ["open", "description", "onUpdate:open"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/bonus/lifetime-cash-reward/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
