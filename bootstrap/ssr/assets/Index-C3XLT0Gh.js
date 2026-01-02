import { defineComponent, ref, watch, h, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$j } from "./ConfirmDialog-CTU0x0KG.js";
import { _ as _sfc_main$k } from "./index-BpQimeTM.js";
import { _ as _sfc_main$2 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5, c as _sfc_main$6 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$7 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$8, a as _sfc_main$9, b as _sfc_main$a, c as _sfc_main$b, d as _sfc_main$c } from "./SelectValue-BUnv4mQg.js";
import { _ as _sfc_main$d, a as _sfc_main$e, b as _sfc_main$f, c as _sfc_main$g, d as _sfc_main$h, e as _sfc_main$i } from "./TableHeader-emcE6QAC.js";
import { _ as _sfc_main$1 } from "./AppLayout-BqZcCUfR.js";
import { Head, Link, router } from "@inertiajs/vue3";
import { useVueTable, getSortedRowModel, getCoreRowModel, FlexRender } from "@tanstack/vue-table";
import { Gift, Plus, Clock, CalendarDays, XCircle, Search, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight, ChevronUp, ChevronDown, ChevronsUpDown, Edit, Trash2 } from "lucide-vue-next";
import { toast } from "vue-sonner";
import "./AlertDialogTrigger-DIWb7xue.js";
import "reka-ui";
import "@vueuse/core";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "./DropdownMenuTrigger-B1v6pHML.js";
import "./index--D7ld9AJ.js";
import "./AvatarImage-DWFQMckn.js";
import "./index-B0NlPG4h.js";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    rewards: {},
    statistics: {},
    filters: {}
  },
  setup(__props) {
    const props = __props;
    const breadcrumbItems = [
      { title: "Pengaturan", href: "#" },
      { title: "Promotions Rewards", href: "/admin/settings/promotions-rewards" }
    ];
    const search = ref(props.filters.search || "");
    const statusFilter = ref(props.filters.status || "all");
    const sorting = ref([
      {
        id: props.filters.sort_by,
        desc: props.filters.sort_order === "desc"
      }
    ]);
    const deleteDialog = ref({
      open: false,
      reward: null
    });
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    };
    const formatCurrency = (value) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(value);
    };
    const getRewardStatus = (reward) => {
      const now = /* @__PURE__ */ new Date();
      const start = new Date(reward.start);
      const end = new Date(reward.end);
      if (reward.status === 0) return { text: "Inactive", variant: "secondary" };
      if (now < start) return { text: "Scheduled", variant: "outline" };
      if (now > end) return { text: "Expired", variant: "destructive" };
      return { text: "Active", variant: "default" };
    };
    const openDeleteDialog = (reward) => {
      deleteDialog.value = { open: true, reward };
    };
    const handleDelete = () => {
      if (!deleteDialog.value.reward) return;
      router.delete(`/admin/settings/promotions-rewards/${deleteDialog.value.reward.id}`, {
        preserveScroll: true,
        onSuccess: () => {
          deleteDialog.value = { open: false, reward: null };
          toast.success("Promotions Reward berhasil dihapus");
        }
      });
    };
    const applyFilters = () => {
      router.get(
        "/admin/settings/promotions-rewards",
        {
          search: search.value || void 0,
          status: statusFilter.value !== "all" ? statusFilter.value : void 0,
          sort_by: sorting.value[0]?.id || "created_at",
          sort_order: sorting.value[0]?.desc ? "desc" : "asc"
        },
        { preserveState: true, replace: true }
      );
    };
    watch([statusFilter, sorting], applyFilters, { deep: true });
    let searchTimeout;
    watch(search, () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(applyFilters, 300);
    });
    const columns = [
      {
        id: "index",
        header: () => h("div", { class: "w-12" }, "No"),
        cell: ({ row }) => {
          const index = row.index + 1 + (props.rewards.current_page - 1) * props.rewards.per_page;
          return h("div", { class: "font-medium" }, index);
        }
      },
      {
        accessorKey: "name",
        header: ({ column }) => {
          return h(
            _sfc_main$2,
            {
              variant: "ghost",
              onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
              class: "-ml-4"
            },
            () => [
              "Nama Reward",
              h(
                column.getIsSorted() === "asc" ? ChevronUp : column.getIsSorted() === "desc" ? ChevronDown : ChevronsUpDown,
                { class: "ml-2 h-4 w-4" }
              )
            ]
          );
        },
        cell: ({ row }) => {
          return h("div", [
            h("div", { class: "font-medium" }, row.original.name),
            row.original.code && h("div", { class: "text-xs text-muted-foreground font-mono" }, row.original.code)
          ]);
        }
      },
      {
        accessorKey: "reward",
        header: () => "Reward",
        cell: ({ row }) => h("div", { class: "text-sm" }, row.original.reward || "-")
      },
      {
        accessorKey: "value",
        header: () => "Value",
        cell: ({ row }) => h("div", { class: "font-medium" }, formatCurrency(row.original.value))
      },
      {
        accessorKey: "bv",
        header: () => "BV",
        cell: ({ row }) => h("div", Number(row.original.bv).toFixed(2))
      },
      {
        id: "periode",
        header: () => "Periode",
        cell: ({ row }) => {
          return h("div", { class: "text-sm" }, [
            h("div", formatDate(row.original.start)),
            h("div", { class: "text-muted-foreground" }, formatDate(row.original.end))
          ]);
        }
      },
      {
        id: "status",
        header: () => "Status",
        cell: ({ row }) => {
          const status = getRewardStatus(row.original);
          return h(_sfc_main$k, { variant: status.variant }, () => status.text);
        }
      },
      {
        id: "actions",
        header: () => h("div", { class: "text-right" }, "Aksi"),
        cell: ({ row }) => {
          const reward = row.original;
          return h("div", { class: "flex justify-end gap-2" }, [
            h(
              _sfc_main$2,
              {
                variant: "outline",
                size: "sm",
                onClick: () => router.visit(`/admin/settings/promotions-rewards/${reward.id}/edit`)
              },
              () => [h(Edit, { class: "h-4 w-4" })]
            ),
            h(
              _sfc_main$2,
              {
                variant: "outline",
                size: "sm",
                class: "text-destructive hover:bg-destructive hover:text-destructive-foreground",
                onClick: () => openDeleteDialog(reward)
              },
              () => [h(Trash2, { class: "h-4 w-4" })]
            )
          ]);
        }
      }
    ];
    const table = useVueTable({
      data: props.rewards.data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      manualSorting: true,
      state: {
        get sorting() {
          return sorting.value;
        }
      },
      onSortingChange: (updaterOrValue) => {
        sorting.value = typeof updaterOrValue === "function" ? updaterOrValue(sorting.value) : updaterOrValue;
      }
    });
    const goToPage = (page) => {
      router.get(
        "/admin/settings/promotions-rewards",
        {
          page,
          search: search.value || void 0,
          status: statusFilter.value !== "all" ? statusFilter.value : void 0,
          sort_by: sorting.value[0]?.id || "created_at",
          sort_order: sorting.value[0]?.desc ? "desc" : "asc"
        },
        { preserveState: true, replace: true }
      );
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ breadcrumbs: breadcrumbItems }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Promotions Rewards" }, null, _parent2, _scopeId));
            _push2(`<div class="flex h-full flex-1 flex-col gap-6 p-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="text-3xl font-bold tracking-tight flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Gift), { class: "h-8 w-8" }, null, _parent2, _scopeId));
            _push2(` Promotions Rewards </h1><p class="text-muted-foreground mt-1"${_scopeId}> Kelola reward dengan periode (ada tanggal mulai &amp; berakhir) </p></div>`);
            _push2(ssrRenderComponent(unref(Link), { href: "/admin/settings/promotions-rewards/create" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$2), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Plus), { class: "h-4 w-4 mr-2" }, null, _parent4, _scopeId3));
                        _push4(` Tambah Reward `);
                      } else {
                        return [
                          createVNode(unref(Plus), { class: "h-4 w-4 mr-2" }),
                          createTextVNode(" Tambah Reward ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$2), null, {
                      default: withCtx(() => [
                        createVNode(unref(Plus), { class: "h-4 w-4 mr-2" }),
                        createTextVNode(" Tambah Reward ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="grid gap-4 md:grid-cols-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$3), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Active`);
                            } else {
                              return [
                                createTextVNode("Active")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(Gift), { class: "h-4 w-4 text-green-500" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Active")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(Gift), { class: "h-4 w-4 text-green-500" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-2xl font-bold text-green-600"${_scopeId3}>${ssrInterpolate(__props.statistics.total_active)}</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-2xl font-bold text-green-600" }, toDisplayString(__props.statistics.total_active), 1)
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
                            createTextVNode("Active")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(Gift), { class: "h-4 w-4 text-green-500" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-2xl font-bold text-green-600" }, toDisplayString(__props.statistics.total_active), 1)
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
                              _push5(`Scheduled`);
                            } else {
                              return [
                                createTextVNode("Scheduled")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(Clock), { class: "h-4 w-4 text-blue-500" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Scheduled")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(Clock), { class: "h-4 w-4 text-blue-500" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-2xl font-bold text-blue-600"${_scopeId3}>${ssrInterpolate(__props.statistics.total_scheduled)}</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-2xl font-bold text-blue-600" }, toDisplayString(__props.statistics.total_scheduled), 1)
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
                            createTextVNode("Scheduled")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(Clock), { class: "h-4 w-4 text-blue-500" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-2xl font-bold text-blue-600" }, toDisplayString(__props.statistics.total_scheduled), 1)
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
                              _push5(`Expired`);
                            } else {
                              return [
                                createTextVNode("Expired")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(CalendarDays), { class: "h-4 w-4 text-orange-500" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Expired")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(CalendarDays), { class: "h-4 w-4 text-orange-500" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-2xl font-bold text-orange-600"${_scopeId3}>${ssrInterpolate(__props.statistics.total_expired)}</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-2xl font-bold text-orange-600" }, toDisplayString(__props.statistics.total_expired), 1)
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
                            createTextVNode("Expired")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(CalendarDays), { class: "h-4 w-4 text-orange-500" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-2xl font-bold text-orange-600" }, toDisplayString(__props.statistics.total_expired), 1)
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
                              _push5(`Inactive`);
                            } else {
                              return [
                                createTextVNode("Inactive")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(XCircle), { class: "h-4 w-4 text-gray-500" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Inactive")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(XCircle), { class: "h-4 w-4 text-gray-500" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-2xl font-bold text-gray-600"${_scopeId3}>${ssrInterpolate(__props.statistics.total_inactive)}</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-2xl font-bold text-gray-600" }, toDisplayString(__props.statistics.total_inactive), 1)
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
                            createTextVNode("Inactive")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(XCircle), { class: "h-4 w-4 text-gray-500" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-2xl font-bold text-gray-600" }, toDisplayString(__props.statistics.total_inactive), 1)
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
            _push2(ssrRenderComponent(unref(_sfc_main$7), {
              modelValue: search.value,
              "onUpdate:modelValue": ($event) => search.value = $event,
              placeholder: "Cari nama atau kode...",
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
                        _push4(ssrRenderComponent(unref(_sfc_main$c), { value: "1" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Aktif`);
                            } else {
                              return [
                                createTextVNode("Aktif")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$c), { value: "0" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Tidak Aktif`);
                            } else {
                              return [
                                createTextVNode("Tidak Aktif")
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
                          createVNode(unref(_sfc_main$c), { value: "1" }, {
                            default: withCtx(() => [
                              createTextVNode("Aktif")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$c), { value: "0" }, {
                            default: withCtx(() => [
                              createTextVNode("Tidak Aktif")
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
                        createVNode(unref(_sfc_main$c), { value: "1" }, {
                          default: withCtx(() => [
                            createTextVNode("Aktif")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$c), { value: "0" }, {
                          default: withCtx(() => [
                            createTextVNode("Tidak Aktif")
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
            _push2(`</div></div><div class="rounded-md border"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$d), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$e), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(unref(table).getHeaderGroups(), (headerGroup) => {
                          _push4(ssrRenderComponent(unref(_sfc_main$f), {
                            key: headerGroup.id
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(headerGroup.headers, (header) => {
                                  _push5(ssrRenderComponent(unref(_sfc_main$g), {
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
                                    return openBlock(), createBlock(unref(_sfc_main$g), {
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
                            return openBlock(), createBlock(unref(_sfc_main$f), {
                              key: headerGroup.id
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                                  return openBlock(), createBlock(unref(_sfc_main$g), {
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
                  _push3(ssrRenderComponent(unref(_sfc_main$h), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (unref(table).getRowModel().rows?.length) {
                          _push4(`<!--[-->`);
                          ssrRenderList(unref(table).getRowModel().rows, (row) => {
                            _push4(ssrRenderComponent(unref(_sfc_main$f), {
                              key: row.id
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<!--[-->`);
                                  ssrRenderList(row.getVisibleCells(), (cell) => {
                                    _push5(ssrRenderComponent(unref(_sfc_main$i), {
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
                                      return openBlock(), createBlock(unref(_sfc_main$i), {
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
                          _push4(ssrRenderComponent(unref(_sfc_main$f), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(_sfc_main$i), {
                                  colspan: columns.length,
                                  class: "h-24 text-center"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(` Tidak ada data. `);
                                    } else {
                                      return [
                                        createTextVNode(" Tidak ada data. ")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(_sfc_main$i), {
                                    colspan: columns.length,
                                    class: "h-24 text-center"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Tidak ada data. ")
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
                            return openBlock(), createBlock(unref(_sfc_main$f), {
                              key: row.id
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                                  return openBlock(), createBlock(unref(_sfc_main$i), {
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
                          }), 128)) : (openBlock(), createBlock(unref(_sfc_main$f), { key: 1 }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$i), {
                                colspan: columns.length,
                                class: "h-24 text-center"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Tidak ada data. ")
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
                    createVNode(unref(_sfc_main$e), null, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getHeaderGroups(), (headerGroup) => {
                          return openBlock(), createBlock(unref(_sfc_main$f), {
                            key: headerGroup.id
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                                return openBlock(), createBlock(unref(_sfc_main$g), {
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
                    createVNode(unref(_sfc_main$h), null, {
                      default: withCtx(() => [
                        unref(table).getRowModel().rows?.length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(table).getRowModel().rows, (row) => {
                          return openBlock(), createBlock(unref(_sfc_main$f), {
                            key: row.id
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                                return openBlock(), createBlock(unref(_sfc_main$i), {
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
                        }), 128)) : (openBlock(), createBlock(unref(_sfc_main$f), { key: 1 }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$i), {
                              colspan: columns.length,
                              class: "h-24 text-center"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Tidak ada data. ")
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
            _push2(`</div><div class="flex items-center justify-between"${_scopeId}><div class="text-sm text-muted-foreground"${_scopeId}> Menampilkan ${ssrInterpolate((__props.rewards.current_page - 1) * __props.rewards.per_page + 1)} - ${ssrInterpolate(Math.min(__props.rewards.current_page * __props.rewards.per_page, __props.rewards.total))} dari ${ssrInterpolate(__props.rewards.total)} data </div><div class="flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              variant: "outline",
              size: "sm",
              disabled: __props.rewards.current_page === 1,
              onClick: ($event) => goToPage(1)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ChevronsLeft), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(ChevronsLeft), { class: "h-4 w-4" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              variant: "outline",
              size: "sm",
              disabled: __props.rewards.current_page === 1,
              onClick: ($event) => goToPage(__props.rewards.current_page - 1)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ChevronLeft), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(ChevronLeft), { class: "h-4 w-4" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<span class="text-sm"${_scopeId}> Halaman ${ssrInterpolate(__props.rewards.current_page)} dari ${ssrInterpolate(__props.rewards.last_page)}</span>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              variant: "outline",
              size: "sm",
              disabled: __props.rewards.current_page === __props.rewards.last_page,
              onClick: ($event) => goToPage(__props.rewards.current_page + 1)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ChevronRight), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(ChevronRight), { class: "h-4 w-4" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              variant: "outline",
              size: "sm",
              disabled: __props.rewards.current_page === __props.rewards.last_page,
              onClick: ($event) => goToPage(__props.rewards.last_page)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ChevronsRight), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(ChevronsRight), { class: "h-4 w-4" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$j, {
              open: deleteDialog.value.open,
              title: "Hapus Reward",
              description: `Apakah Anda yakin ingin menghapus reward '${deleteDialog.value.reward?.name}'? Tindakan ini tidak dapat dibatalkan.`,
              "confirm-text": "Hapus",
              "onUpdate:open": ($event) => deleteDialog.value.open = $event,
              onConfirm: handleDelete
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Head), { title: "Promotions Rewards" }),
              createVNode("div", { class: "flex h-full flex-1 flex-col gap-6 p-6" }, [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("div", null, [
                    createVNode("h1", { class: "text-3xl font-bold tracking-tight flex items-center gap-2" }, [
                      createVNode(unref(Gift), { class: "h-8 w-8" }),
                      createTextVNode(" Promotions Rewards ")
                    ]),
                    createVNode("p", { class: "text-muted-foreground mt-1" }, " Kelola reward dengan periode (ada tanggal mulai & berakhir) ")
                  ]),
                  createVNode(unref(Link), { href: "/admin/settings/promotions-rewards/create" }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$2), null, {
                        default: withCtx(() => [
                          createVNode(unref(Plus), { class: "h-4 w-4 mr-2" }),
                          createTextVNode(" Tambah Reward ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "grid gap-4 md:grid-cols-4" }, [
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$4), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Active")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(Gift), { class: "h-4 w-4 text-green-500" })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-2xl font-bold text-green-600" }, toDisplayString(__props.statistics.total_active), 1)
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
                              createTextVNode("Scheduled")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(Clock), { class: "h-4 w-4 text-blue-500" })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-2xl font-bold text-blue-600" }, toDisplayString(__props.statistics.total_scheduled), 1)
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
                              createTextVNode("Expired")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(CalendarDays), { class: "h-4 w-4 text-orange-500" })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-2xl font-bold text-orange-600" }, toDisplayString(__props.statistics.total_expired), 1)
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
                              createTextVNode("Inactive")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(XCircle), { class: "h-4 w-4 text-gray-500" })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-2xl font-bold text-gray-600" }, toDisplayString(__props.statistics.total_inactive), 1)
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
                      createVNode(unref(_sfc_main$7), {
                        modelValue: search.value,
                        "onUpdate:modelValue": ($event) => search.value = $event,
                        placeholder: "Cari nama atau kode...",
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
                            createVNode(unref(_sfc_main$c), { value: "1" }, {
                              default: withCtx(() => [
                                createTextVNode("Aktif")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), { value: "0" }, {
                              default: withCtx(() => [
                                createTextVNode("Tidak Aktif")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "rounded-md border" }, [
                  createVNode(unref(_sfc_main$d), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$e), null, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getHeaderGroups(), (headerGroup) => {
                            return openBlock(), createBlock(unref(_sfc_main$f), {
                              key: headerGroup.id
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                                  return openBlock(), createBlock(unref(_sfc_main$g), {
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
                      createVNode(unref(_sfc_main$h), null, {
                        default: withCtx(() => [
                          unref(table).getRowModel().rows?.length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(table).getRowModel().rows, (row) => {
                            return openBlock(), createBlock(unref(_sfc_main$f), {
                              key: row.id
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                                  return openBlock(), createBlock(unref(_sfc_main$i), {
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
                          }), 128)) : (openBlock(), createBlock(unref(_sfc_main$f), { key: 1 }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$i), {
                                colspan: columns.length,
                                class: "h-24 text-center"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Tidak ada data. ")
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
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("div", { class: "text-sm text-muted-foreground" }, " Menampilkan " + toDisplayString((__props.rewards.current_page - 1) * __props.rewards.per_page + 1) + " - " + toDisplayString(Math.min(__props.rewards.current_page * __props.rewards.per_page, __props.rewards.total)) + " dari " + toDisplayString(__props.rewards.total) + " data ", 1),
                  createVNode("div", { class: "flex items-center gap-2" }, [
                    createVNode(unref(_sfc_main$2), {
                      variant: "outline",
                      size: "sm",
                      disabled: __props.rewards.current_page === 1,
                      onClick: ($event) => goToPage(1)
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(ChevronsLeft), { class: "h-4 w-4" })
                      ]),
                      _: 1
                    }, 8, ["disabled", "onClick"]),
                    createVNode(unref(_sfc_main$2), {
                      variant: "outline",
                      size: "sm",
                      disabled: __props.rewards.current_page === 1,
                      onClick: ($event) => goToPage(__props.rewards.current_page - 1)
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(ChevronLeft), { class: "h-4 w-4" })
                      ]),
                      _: 1
                    }, 8, ["disabled", "onClick"]),
                    createVNode("span", { class: "text-sm" }, " Halaman " + toDisplayString(__props.rewards.current_page) + " dari " + toDisplayString(__props.rewards.last_page), 1),
                    createVNode(unref(_sfc_main$2), {
                      variant: "outline",
                      size: "sm",
                      disabled: __props.rewards.current_page === __props.rewards.last_page,
                      onClick: ($event) => goToPage(__props.rewards.current_page + 1)
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(ChevronRight), { class: "h-4 w-4" })
                      ]),
                      _: 1
                    }, 8, ["disabled", "onClick"]),
                    createVNode(unref(_sfc_main$2), {
                      variant: "outline",
                      size: "sm",
                      disabled: __props.rewards.current_page === __props.rewards.last_page,
                      onClick: ($event) => goToPage(__props.rewards.last_page)
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(ChevronsRight), { class: "h-4 w-4" })
                      ]),
                      _: 1
                    }, 8, ["disabled", "onClick"])
                  ])
                ])
              ]),
              createVNode(_sfc_main$j, {
                open: deleteDialog.value.open,
                title: "Hapus Reward",
                description: `Apakah Anda yakin ingin menghapus reward '${deleteDialog.value.reward?.name}'? Tindakan ini tidak dapat dibatalkan.`,
                "confirm-text": "Hapus",
                "onUpdate:open": ($event) => deleteDialog.value.open = $event,
                onConfirm: handleDelete
              }, null, 8, ["open", "description", "onUpdate:open"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Rewards/Promotions/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
