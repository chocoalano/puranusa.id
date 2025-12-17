import { defineComponent, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext, useModel, ref, h, watch, createBlock, createCommentVNode, openBlock, Fragment, renderList } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { h as index, _ as _sfc_main$d, j as create, k as destroy, l as edit } from "./AppLayout-CzI69RVm.js";
import { _ as _sfc_main$l } from "./ConfirmDialog-CTU0x0KG.js";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5, c as _sfc_main$6 } from "./CardTitle-sqUG0LTw.js";
import { BadgePercent, Calendar, Tag, Search, Plus, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight, ChevronUp, ChevronDown, ChevronsUpDown, Edit, Trash2 } from "lucide-vue-next";
import { _ as _sfc_main$7 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$8, a as _sfc_main$9, b as _sfc_main$a, c as _sfc_main$b, d as _sfc_main$c } from "./SelectValue-BUnv4mQg.js";
import { _ as _sfc_main$m } from "./index-BpQimeTM.js";
import { _ as _sfc_main$e } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$f, a as _sfc_main$g, b as _sfc_main$h, c as _sfc_main$i, d as _sfc_main$j, e as _sfc_main$k } from "./TableHeader-emcE6QAC.js";
import { router, Head, Link } from "@inertiajs/vue3";
import { useVueTable, getSortedRowModel, getCoreRowModel, FlexRender } from "@tanstack/vue-table";
import "class-variance-authority";
import "./DropdownMenuTrigger-B1v6pHML.js";
import "reka-ui";
import "@vueuse/core";
import "./index-Jhngbhhu.js";
import "./AvatarImage-DWFQMckn.js";
import "vue-sonner";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
import "./AlertDialogTrigger-DIWb7xue.js";
import "clsx";
import "tailwind-merge";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "PromotionStatistics",
  __ssrInlineRender: true,
  props: {
    statistics: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid gap-4 md:grid-cols-3" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(_sfc_main$3), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Promosi Aktif`);
                      } else {
                        return [
                          createTextVNode("Promosi Aktif")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(BadgePercent), { class: "h-4 w-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                      default: withCtx(() => [
                        createTextVNode("Promosi Aktif")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(BadgePercent), { class: "h-4 w-4 text-muted-foreground" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$6), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(__props.statistics.total_active)}</div><p class="text-xs text-muted-foreground"${_scopeId2}>Sedang berjalan</p>`);
                } else {
                  return [
                    createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics.total_active), 1),
                    createVNode("p", { class: "text-xs text-muted-foreground" }, "Sedang berjalan")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$4), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                    default: withCtx(() => [
                      createTextVNode("Promosi Aktif")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(BadgePercent), { class: "h-4 w-4 text-muted-foreground" })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$6), null, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics.total_active), 1),
                  createVNode("p", { class: "text-xs text-muted-foreground" }, "Sedang berjalan")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$3), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Terjadwal`);
                      } else {
                        return [
                          createTextVNode("Terjadwal")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(Calendar), { class: "h-4 w-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                      default: withCtx(() => [
                        createTextVNode("Terjadwal")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(Calendar), { class: "h-4 w-4 text-muted-foreground" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$6), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(__props.statistics.total_scheduled)}</div><p class="text-xs text-muted-foreground"${_scopeId2}>Akan datang</p>`);
                } else {
                  return [
                    createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics.total_scheduled), 1),
                    createVNode("p", { class: "text-xs text-muted-foreground" }, "Akan datang")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$4), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                    default: withCtx(() => [
                      createTextVNode("Terjadwal")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(Calendar), { class: "h-4 w-4 text-muted-foreground" })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$6), null, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics.total_scheduled), 1),
                  createVNode("p", { class: "text-xs text-muted-foreground" }, "Akan datang")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$3), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Kadaluarsa`);
                      } else {
                        return [
                          createTextVNode("Kadaluarsa")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(Tag), { class: "h-4 w-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                      default: withCtx(() => [
                        createTextVNode("Kadaluarsa")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(Tag), { class: "h-4 w-4 text-muted-foreground" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$6), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(__props.statistics.total_expired)}</div><p class="text-xs text-muted-foreground"${_scopeId2}>Sudah berakhir</p>`);
                } else {
                  return [
                    createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics.total_expired), 1),
                    createVNode("p", { class: "text-xs text-muted-foreground" }, "Sudah berakhir")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$4), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$5), { class: "text-sm font-medium" }, {
                    default: withCtx(() => [
                      createTextVNode("Kadaluarsa")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(Tag), { class: "h-4 w-4 text-muted-foreground" })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$6), null, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics.total_expired), 1),
                  createVNode("p", { class: "text-xs text-muted-foreground" }, "Sudah berakhir")
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/promotions/PromotionStatistics.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "PromotionFilters",
  __ssrInlineRender: true,
  props: {
    "search": { required: true },
    "searchModifiers": {},
    "type": { required: true },
    "typeModifiers": {}
  },
  emits: ["update:search", "update:type"],
  setup(__props) {
    const search = useModel(__props, "search");
    const type = useModel(__props, "type");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center gap-4" }, _attrs))}><div class="relative flex-1">`);
      _push(ssrRenderComponent(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$7), {
        modelValue: search.value,
        "onUpdate:modelValue": ($event) => search.value = $event,
        placeholder: "Cari promosi...",
        class: "pl-9"
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(unref(_sfc_main$8), {
        modelValue: type.value,
        "onUpdate:modelValue": ($event) => type.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$9), { class: "w-40" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$a), { placeholder: "Semua Tipe" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$a), { placeholder: "Semua Tipe" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$b), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$c), { value: "all" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Semua Tipe`);
                      } else {
                        return [
                          createTextVNode("Semua Tipe")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$c), { value: "discount" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Diskon`);
                      } else {
                        return [
                          createTextVNode("Diskon")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$c), { value: "bundle" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Bundle`);
                      } else {
                        return [
                          createTextVNode("Bundle")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$c), { value: "flash_sale" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Flash Sale`);
                      } else {
                        return [
                          createTextVNode("Flash Sale")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$c), { value: "promo" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Promo`);
                      } else {
                        return [
                          createTextVNode("Promo")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$c), { value: "all" }, {
                      default: withCtx(() => [
                        createTextVNode("Semua Tipe")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$c), { value: "discount" }, {
                      default: withCtx(() => [
                        createTextVNode("Diskon")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$c), { value: "bundle" }, {
                      default: withCtx(() => [
                        createTextVNode("Bundle")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$c), { value: "flash_sale" }, {
                      default: withCtx(() => [
                        createTextVNode("Flash Sale")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$c), { value: "promo" }, {
                      default: withCtx(() => [
                        createTextVNode("Promo")
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
              createVNode(unref(_sfc_main$9), { class: "w-40" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$a), { placeholder: "Semua Tipe" })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$b), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$c), { value: "all" }, {
                    default: withCtx(() => [
                      createTextVNode("Semua Tipe")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$c), { value: "discount" }, {
                    default: withCtx(() => [
                      createTextVNode("Diskon")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$c), { value: "bundle" }, {
                    default: withCtx(() => [
                      createTextVNode("Bundle")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$c), { value: "flash_sale" }, {
                    default: withCtx(() => [
                      createTextVNode("Flash Sale")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$c), { value: "promo" }, {
                    default: withCtx(() => [
                      createTextVNode("Promo")
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
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/promotions/PromotionFilters.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    promotions: {},
    statistics: {},
    filters: {}
  },
  setup(__props) {
    const props = __props;
    const breadcrumbItems = [
      {
        title: "Promosi & Diskon",
        href: index.url()
      }
    ];
    const search = ref(props.filters.search || "");
    const typeFilter = ref(props.filters.type || "all");
    const sorting = ref([
      {
        id: props.filters.sort_by,
        desc: props.filters.sort_order === "desc"
      }
    ]);
    const rowSelection = ref({});
    const deleteDialog = ref({
      open: false,
      promotion: null
    });
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    };
    const getPromotionStatus = (promotion) => {
      const now = /* @__PURE__ */ new Date();
      const start = new Date(promotion.start_at);
      const end = new Date(promotion.end_at);
      if (!promotion.is_active) return { text: "Inactive", variant: "secondary" };
      if (now < start) return { text: "Scheduled", variant: "outline" };
      if (now > end) return { text: "Expired", variant: "destructive" };
      return { text: "Active", variant: "default" };
    };
    const openDeleteDialog = (promotion) => {
      deleteDialog.value = { open: true, promotion };
    };
    const handleDelete = () => {
      if (!deleteDialog.value.promotion) return;
      router.delete(destroy.url(deleteDialog.value.promotion.id), {
        preserveScroll: true,
        onSuccess: () => {
          deleteDialog.value = { open: false, promotion: null };
        }
      });
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
          const index2 = row.index + 1 + (props.promotions.current_page - 1) * props.promotions.per_page;
          return h("div", { class: "font-medium" }, index2);
        }
      },
      {
        accessorKey: "name",
        header: ({ column }) => {
          return h(
            _sfc_main$e,
            {
              variant: "ghost",
              onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
              class: "-ml-4"
            },
            () => [
              "Nama Promosi",
              h(
                column.getIsSorted() === "asc" ? ChevronUp : column.getIsSorted() === "desc" ? ChevronDown : ChevronsUpDown,
                {
                  class: "ml-2 h-4 w-4"
                }
              )
            ]
          );
        },
        cell: ({ row }) => {
          return h("div", [
            h("div", { class: "font-medium" }, row.original.name),
            h(
              "div",
              { class: "text-xs text-muted-foreground" },
              row.original.type
            )
          ]);
        }
      },
      {
        accessorKey: "code",
        header: () => h("div", "Kode"),
        cell: ({ row }) => {
          return h("div", { class: "font-mono text-sm" }, row.original.code);
        }
      },
      {
        accessorKey: "start_at",
        header: () => "Periode",
        cell: ({ row }) => {
          return h("div", { class: "text-sm" }, [
            h("div", formatDate(row.original.start_at)),
            h("div", { class: "text-muted-foreground" }, formatDate(row.original.end_at))
          ]);
        }
      },
      {
        id: "status",
        header: () => "Status",
        cell: ({ row }) => {
          const status = getPromotionStatus(row.original);
          return h(
            _sfc_main$m,
            { variant: status.variant },
            () => status.text
          );
        }
      },
      {
        id: "actions",
        header: () => h("div", { class: "text-right" }, "Actions"),
        cell: ({ row }) => {
          const promotion = row.original;
          return h("div", { class: "flex justify-end gap-2" }, [
            h(
              _sfc_main$e,
              {
                variant: "outline",
                size: "sm",
                onClick: () => router.visit(edit.url(promotion.id))
              },
              () => h(Edit, { class: "h-4 w-4" })
            ),
            h(
              _sfc_main$e,
              {
                variant: "outline",
                size: "sm",
                onClick: () => openDeleteDialog(promotion)
              },
              () => h(Trash2, { class: "h-4 w-4 text-destructive" })
            )
          ]);
        }
      }
    ];
    const table = useVueTable({
      get data() {
        return props.promotions.data;
      },
      columns,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      state: {
        get sorting() {
          return sorting.value;
        },
        get rowSelection() {
          return rowSelection.value;
        }
      },
      onSortingChange: (updaterOrValue) => {
        sorting.value = typeof updaterOrValue === "function" ? updaterOrValue(sorting.value) : updaterOrValue;
      },
      onRowSelectionChange: (updaterOrValue) => {
        rowSelection.value = typeof updaterOrValue === "function" ? updaterOrValue(rowSelection.value) : updaterOrValue;
      },
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
              type: typeFilter.value !== "all" ? typeFilter.value : void 0,
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
    watch([search, typeFilter], () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        router.get(
          index.url(),
          {
            search: search.value || void 0,
            type: typeFilter.value !== "all" ? typeFilter.value : void 0,
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
      _push(ssrRenderComponent(_sfc_main$d, mergeProps({ breadcrumbs: breadcrumbItems }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Promosi & Diskon" }, null, _parent2, _scopeId));
            _push2(`<div class="rounded-xl p-4 space-y-6 py-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="text-3xl font-bold tracking-tight"${_scopeId}>Promosi &amp; Diskon</h1><p class="text-muted-foreground"${_scopeId}>Kelola promosi dan diskon produk</p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(create).url()
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$e), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Plus), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                        _push4(` Tambah Promosi `);
                      } else {
                        return [
                          createVNode(unref(Plus), { class: "h-4 w-4" }),
                          createTextVNode(" Tambah Promosi ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$e), null, {
                      default: withCtx(() => [
                        createVNode(unref(Plus), { class: "h-4 w-4" }),
                        createTextVNode(" Tambah Promosi ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$2, { statistics: __props.statistics }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, {
              search: search.value,
              "onUpdate:search": ($event) => search.value = $event,
              type: typeFilter.value,
              "onUpdate:type": ($event) => typeFilter.value = $event
            }, null, _parent2, _scopeId));
            _push2(`<div class="rounded-md border"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$f), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$g), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(unref(table).getHeaderGroups(), (headerGroup) => {
                          _push4(ssrRenderComponent(unref(_sfc_main$h), {
                            key: headerGroup.id
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(headerGroup.headers, (header) => {
                                  _push5(ssrRenderComponent(unref(_sfc_main$i), {
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
                                    return openBlock(), createBlock(unref(_sfc_main$i), {
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
                            return openBlock(), createBlock(unref(_sfc_main$h), {
                              key: headerGroup.id
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                                  return openBlock(), createBlock(unref(_sfc_main$i), {
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
                  _push3(ssrRenderComponent(unref(_sfc_main$j), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (unref(table).getRowModel().rows?.length) {
                          _push4(`<!--[-->`);
                          ssrRenderList(unref(table).getRowModel().rows, (row) => {
                            _push4(ssrRenderComponent(unref(_sfc_main$h), {
                              key: row.id,
                              "data-state": row.getIsSelected() ? "selected" : void 0
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<!--[-->`);
                                  ssrRenderList(row.getVisibleCells(), (cell) => {
                                    _push5(ssrRenderComponent(unref(_sfc_main$k), {
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
                                      return openBlock(), createBlock(unref(_sfc_main$k), {
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
                          _push4(ssrRenderComponent(unref(_sfc_main$h), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(_sfc_main$k), {
                                  colspan: columns.length,
                                  class: "h-24 text-center"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(` Tidak ada data promosi. `);
                                    } else {
                                      return [
                                        createTextVNode(" Tidak ada data promosi. ")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(_sfc_main$k), {
                                    colspan: columns.length,
                                    class: "h-24 text-center"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Tidak ada data promosi. ")
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
                            return openBlock(), createBlock(unref(_sfc_main$h), {
                              key: row.id,
                              "data-state": row.getIsSelected() ? "selected" : void 0
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                                  return openBlock(), createBlock(unref(_sfc_main$k), {
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
                          }), 128)) : (openBlock(), createBlock(unref(_sfc_main$h), { key: 1 }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$k), {
                                colspan: columns.length,
                                class: "h-24 text-center"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Tidak ada data promosi. ")
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
                    createVNode(unref(_sfc_main$g), null, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getHeaderGroups(), (headerGroup) => {
                          return openBlock(), createBlock(unref(_sfc_main$h), {
                            key: headerGroup.id
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                                return openBlock(), createBlock(unref(_sfc_main$i), {
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
                    createVNode(unref(_sfc_main$j), null, {
                      default: withCtx(() => [
                        unref(table).getRowModel().rows?.length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(table).getRowModel().rows, (row) => {
                          return openBlock(), createBlock(unref(_sfc_main$h), {
                            key: row.id,
                            "data-state": row.getIsSelected() ? "selected" : void 0
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                                return openBlock(), createBlock(unref(_sfc_main$k), {
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
                        }), 128)) : (openBlock(), createBlock(unref(_sfc_main$h), { key: 1 }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$k), {
                              colspan: columns.length,
                              class: "h-24 text-center"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Tidak ada data promosi. ")
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
            if (__props.promotions.last_page > 1) {
              _push2(`<div class="flex items-center justify-between"${_scopeId}><p class="text-sm text-muted-foreground"${_scopeId}> Menampilkan ${ssrInterpolate((__props.promotions.current_page - 1) * __props.promotions.per_page + 1)} hingga ${ssrInterpolate(Math.min(__props.promotions.current_page * __props.promotions.per_page, __props.promotions.total))} dari ${ssrInterpolate(__props.promotions.total)} hasil </p><div class="flex gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(_sfc_main$e), {
                variant: "outline",
                size: "sm",
                disabled: __props.promotions.current_page === 1,
                "as-child": ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Link), {
                      href: unref(index).url({
                        query: {
                          page: 1,
                          search: search.value || void 0,
                          type: typeFilter.value !== "all" ? typeFilter.value : void 0,
                          sort_by: sorting.value[0]?.id,
                          sort_order: sorting.value[0]?.desc ? "desc" : "asc"
                        }
                      }),
                      class: {
                        "pointer-events-none opacity-50": __props.promotions.current_page === 1
                      },
                      "preserve-scroll": "",
                      "preserve-state": ""
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(ChevronsLeft), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(ChevronsLeft), { class: "h-4 w-4" })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(Link), {
                        href: unref(index).url({
                          query: {
                            page: 1,
                            search: search.value || void 0,
                            type: typeFilter.value !== "all" ? typeFilter.value : void 0,
                            sort_by: sorting.value[0]?.id,
                            sort_order: sorting.value[0]?.desc ? "desc" : "asc"
                          }
                        }),
                        class: {
                          "pointer-events-none opacity-50": __props.promotions.current_page === 1
                        },
                        "preserve-scroll": "",
                        "preserve-state": ""
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(ChevronsLeft), { class: "h-4 w-4" })
                        ]),
                        _: 1
                      }, 8, ["href", "class"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$e), {
                variant: "outline",
                size: "sm",
                disabled: !__props.promotions.links[0]?.url,
                "as-child": ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Link), {
                      href: __props.promotions.links[0]?.url || "#",
                      class: {
                        "pointer-events-none opacity-50": !__props.promotions.links[0]?.url
                      },
                      "preserve-scroll": "",
                      "preserve-state": ""
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(ChevronLeft), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(ChevronLeft), { class: "h-4 w-4" })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(Link), {
                        href: __props.promotions.links[0]?.url || "#",
                        class: {
                          "pointer-events-none opacity-50": !__props.promotions.links[0]?.url
                        },
                        "preserve-scroll": "",
                        "preserve-state": ""
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(ChevronLeft), { class: "h-4 w-4" })
                        ]),
                        _: 1
                      }, 8, ["href", "class"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$e), {
                variant: "outline",
                size: "sm",
                disabled: !__props.promotions.links[__props.promotions.links.length - 1]?.url,
                "as-child": ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Link), {
                      href: __props.promotions.links[__props.promotions.links.length - 1]?.url || "#",
                      class: {
                        "pointer-events-none opacity-50": !__props.promotions.links[__props.promotions.links.length - 1]?.url
                      },
                      "preserve-scroll": "",
                      "preserve-state": ""
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(ChevronRight), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(ChevronRight), { class: "h-4 w-4" })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(Link), {
                        href: __props.promotions.links[__props.promotions.links.length - 1]?.url || "#",
                        class: {
                          "pointer-events-none opacity-50": !__props.promotions.links[__props.promotions.links.length - 1]?.url
                        },
                        "preserve-scroll": "",
                        "preserve-state": ""
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(ChevronRight), { class: "h-4 w-4" })
                        ]),
                        _: 1
                      }, 8, ["href", "class"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$e), {
                variant: "outline",
                size: "sm",
                disabled: __props.promotions.current_page === __props.promotions.last_page,
                "as-child": ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Link), {
                      href: unref(index).url({
                        query: {
                          page: __props.promotions.last_page,
                          search: search.value || void 0,
                          type: typeFilter.value !== "all" ? typeFilter.value : void 0,
                          sort_by: sorting.value[0]?.id,
                          sort_order: sorting.value[0]?.desc ? "desc" : "asc"
                        }
                      }),
                      class: {
                        "pointer-events-none opacity-50": __props.promotions.current_page === __props.promotions.last_page
                      },
                      "preserve-scroll": "",
                      "preserve-state": ""
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(ChevronsRight), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(ChevronsRight), { class: "h-4 w-4" })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(Link), {
                        href: unref(index).url({
                          query: {
                            page: __props.promotions.last_page,
                            search: search.value || void 0,
                            type: typeFilter.value !== "all" ? typeFilter.value : void 0,
                            sort_by: sorting.value[0]?.id,
                            sort_order: sorting.value[0]?.desc ? "desc" : "asc"
                          }
                        }),
                        class: {
                          "pointer-events-none opacity-50": __props.promotions.current_page === __props.promotions.last_page
                        },
                        "preserve-scroll": "",
                        "preserve-state": ""
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(ChevronsRight), { class: "h-4 w-4" })
                        ]),
                        _: 1
                      }, 8, ["href", "class"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$l, {
              open: deleteDialog.value.open,
              "onUpdate:open": ($event) => deleteDialog.value.open = $event,
              title: "Hapus Promosi?",
              description: `Apakah Anda yakin ingin menghapus promosi '${deleteDialog.value.promotion?.name}'? Tindakan ini tidak dapat dibatalkan.`,
              "confirm-text": "Hapus",
              "cancel-text": "Batal",
              variant: "destructive",
              onConfirm: handleDelete
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Head), { title: "Promosi & Diskon" }),
              createVNode("div", { class: "rounded-xl p-4 space-y-6 py-6" }, [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("div", null, [
                    createVNode("h1", { class: "text-3xl font-bold tracking-tight" }, "Promosi & Diskon"),
                    createVNode("p", { class: "text-muted-foreground" }, "Kelola promosi dan diskon produk")
                  ]),
                  createVNode(unref(Link), {
                    href: unref(create).url()
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$e), null, {
                        default: withCtx(() => [
                          createVNode(unref(Plus), { class: "h-4 w-4" }),
                          createTextVNode(" Tambah Promosi ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["href"])
                ]),
                createVNode(_sfc_main$2, { statistics: __props.statistics }, null, 8, ["statistics"]),
                createVNode(_sfc_main$1, {
                  search: search.value,
                  "onUpdate:search": ($event) => search.value = $event,
                  type: typeFilter.value,
                  "onUpdate:type": ($event) => typeFilter.value = $event
                }, null, 8, ["search", "onUpdate:search", "type", "onUpdate:type"]),
                createVNode("div", { class: "rounded-md border" }, [
                  createVNode(unref(_sfc_main$f), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$g), null, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getHeaderGroups(), (headerGroup) => {
                            return openBlock(), createBlock(unref(_sfc_main$h), {
                              key: headerGroup.id
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                                  return openBlock(), createBlock(unref(_sfc_main$i), {
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
                      createVNode(unref(_sfc_main$j), null, {
                        default: withCtx(() => [
                          unref(table).getRowModel().rows?.length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(table).getRowModel().rows, (row) => {
                            return openBlock(), createBlock(unref(_sfc_main$h), {
                              key: row.id,
                              "data-state": row.getIsSelected() ? "selected" : void 0
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                                  return openBlock(), createBlock(unref(_sfc_main$k), {
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
                          }), 128)) : (openBlock(), createBlock(unref(_sfc_main$h), { key: 1 }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$k), {
                                colspan: columns.length,
                                class: "h-24 text-center"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Tidak ada data promosi. ")
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
                __props.promotions.last_page > 1 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "flex items-center justify-between"
                }, [
                  createVNode("p", { class: "text-sm text-muted-foreground" }, " Menampilkan " + toDisplayString((__props.promotions.current_page - 1) * __props.promotions.per_page + 1) + " hingga " + toDisplayString(Math.min(__props.promotions.current_page * __props.promotions.per_page, __props.promotions.total)) + " dari " + toDisplayString(__props.promotions.total) + " hasil ", 1),
                  createVNode("div", { class: "flex gap-2" }, [
                    createVNode(unref(_sfc_main$e), {
                      variant: "outline",
                      size: "sm",
                      disabled: __props.promotions.current_page === 1,
                      "as-child": ""
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Link), {
                          href: unref(index).url({
                            query: {
                              page: 1,
                              search: search.value || void 0,
                              type: typeFilter.value !== "all" ? typeFilter.value : void 0,
                              sort_by: sorting.value[0]?.id,
                              sort_order: sorting.value[0]?.desc ? "desc" : "asc"
                            }
                          }),
                          class: {
                            "pointer-events-none opacity-50": __props.promotions.current_page === 1
                          },
                          "preserve-scroll": "",
                          "preserve-state": ""
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(ChevronsLeft), { class: "h-4 w-4" })
                          ]),
                          _: 1
                        }, 8, ["href", "class"])
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    createVNode(unref(_sfc_main$e), {
                      variant: "outline",
                      size: "sm",
                      disabled: !__props.promotions.links[0]?.url,
                      "as-child": ""
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Link), {
                          href: __props.promotions.links[0]?.url || "#",
                          class: {
                            "pointer-events-none opacity-50": !__props.promotions.links[0]?.url
                          },
                          "preserve-scroll": "",
                          "preserve-state": ""
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(ChevronLeft), { class: "h-4 w-4" })
                          ]),
                          _: 1
                        }, 8, ["href", "class"])
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    createVNode(unref(_sfc_main$e), {
                      variant: "outline",
                      size: "sm",
                      disabled: !__props.promotions.links[__props.promotions.links.length - 1]?.url,
                      "as-child": ""
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Link), {
                          href: __props.promotions.links[__props.promotions.links.length - 1]?.url || "#",
                          class: {
                            "pointer-events-none opacity-50": !__props.promotions.links[__props.promotions.links.length - 1]?.url
                          },
                          "preserve-scroll": "",
                          "preserve-state": ""
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(ChevronRight), { class: "h-4 w-4" })
                          ]),
                          _: 1
                        }, 8, ["href", "class"])
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    createVNode(unref(_sfc_main$e), {
                      variant: "outline",
                      size: "sm",
                      disabled: __props.promotions.current_page === __props.promotions.last_page,
                      "as-child": ""
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Link), {
                          href: unref(index).url({
                            query: {
                              page: __props.promotions.last_page,
                              search: search.value || void 0,
                              type: typeFilter.value !== "all" ? typeFilter.value : void 0,
                              sort_by: sorting.value[0]?.id,
                              sort_order: sorting.value[0]?.desc ? "desc" : "asc"
                            }
                          }),
                          class: {
                            "pointer-events-none opacity-50": __props.promotions.current_page === __props.promotions.last_page
                          },
                          "preserve-scroll": "",
                          "preserve-state": ""
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(ChevronsRight), { class: "h-4 w-4" })
                          ]),
                          _: 1
                        }, 8, ["href", "class"])
                      ]),
                      _: 1
                    }, 8, ["disabled"])
                  ])
                ])) : createCommentVNode("", true)
              ]),
              createVNode(_sfc_main$l, {
                open: deleteDialog.value.open,
                "onUpdate:open": ($event) => deleteDialog.value.open = $event,
                title: "Hapus Promosi?",
                description: `Apakah Anda yakin ingin menghapus promosi '${deleteDialog.value.promotion?.name}'? Tindakan ini tidak dapat dibatalkan.`,
                "confirm-text": "Hapus",
                "cancel-text": "Batal",
                variant: "destructive",
                onConfirm: handleDelete
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Promotions/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
