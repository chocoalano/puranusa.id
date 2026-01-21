import { defineComponent, toRefs, ref, computed, h, watch, mergeProps, withCtx, unref, createTextVNode, createVNode, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$d } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$2, a as _sfc_main$3, b as _sfc_main$4, c as _sfc_main$5 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$6 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$7, a as _sfc_main$8, b as _sfc_main$9, c as _sfc_main$a, d as _sfc_main$b, e as _sfc_main$c } from "./TableHeader-emcE6QAC.js";
import { _ as _sfc_main$1 } from "./AppLayout-BwB3YbyA.js";
import { router, Head, Link } from "@inertiajs/vue3";
import { useVueTable, getSortedRowModel, getCoreRowModel, FlexRender } from "@tanstack/vue-table";
import { ShoppingCart, Package, Search, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight, ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-vue-next";
import "class-variance-authority";
import "reka-ui";
import "clsx";
import "tailwind-merge";
import "@vueuse/core";
import "./DropdownMenuTrigger-B1v6pHML.js";
import "./index--D7ld9AJ.js";
import "./AvatarImage-DWFQMckn.js";
import "./index-BsP5JKUP.js";
import "vue-sonner";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
const baseUrl = "/admin/carts";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    carts: {},
    statistics: {},
    filters: {}
  },
  setup(__props) {
    const props = __props;
    const { carts, statistics, filters } = toRefs(props);
    const breadcrumbItems = [
      { title: "Keranjang Pelanggan", href: baseUrl }
    ];
    const search = ref(filters.value.search || "");
    const sorting = ref([
      {
        id: filters.value.sort_by || "created_at",
        desc: filters.value.sort_order === "desc"
      }
    ]);
    const formatCurrency = (amount) => new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(amount);
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
    const getCustomerName = (c) => c.customer?.name ?? c.customer_name ?? "-";
    const getCustomerEmail = (c) => c.customer?.email ?? c.customer_email ?? "-";
    const getProductName = (c) => c.product?.name ?? c.product_name ?? "-";
    const getPrice = (c) => c.product?.price ?? c.product?.base_price ?? c.product_price ?? 0;
    const getQty = (c) => c.quantity ?? c.qty ?? 0;
    const prevUrl = computed(() => {
      const l = carts.value.links.find((x) => /prev|previous|&laquo;/i.test(x.label));
      return l?.url ?? null;
    });
    const nextUrl = computed(() => {
      const l = carts.value.links.find((x) => /next|&raquo;/i.test(x.label));
      return l?.url ?? null;
    });
    const columns = [
      {
        id: "index",
        header: () => h("div", { class: "w-12" }, "No"),
        cell: ({ row }) => {
          const index = row.index + 1 + (carts.value.current_page - 1) * carts.value.per_page;
          return h("div", { class: "font-medium" }, String(index));
        }
      },
      {
        id: "customer_name",
        // penting: id dipakai untuk query sort_by
        header: ({ column }) => h(
          _sfc_main$d,
          {
            variant: "ghost",
            onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
            class: "-ml-4"
          },
          () => [
            "Pelanggan",
            h(
              column.getIsSorted() === "asc" ? ChevronUp : column.getIsSorted() === "desc" ? ChevronDown : ChevronsUpDown,
              { class: "ml-2 h-4 w-4" }
            )
          ]
        ),
        accessorFn: (row) => getCustomerName(row),
        cell: ({ row }) => {
          const name = getCustomerName(row.original);
          const email = getCustomerEmail(row.original);
          return h("div", [
            h("div", { class: "font-medium" }, name),
            h("div", { class: "text-xs text-muted-foreground" }, email)
          ]);
        }
      },
      {
        id: "product_name",
        header: () => "Produk",
        accessorFn: (row) => getProductName(row),
        cell: ({ row }) => h("div", { class: "max-w-xs truncate" }, getProductName(row.original))
      },
      {
        id: "quantity",
        header: () => h("div", { class: "text-center" }, "Qty"),
        accessorFn: (row) => getQty(row),
        cell: ({ row }) => h("div", { class: "text-center font-medium" }, String(getQty(row.original)))
      },
      {
        id: "subtotal",
        header: () => h("div", { class: "text-right" }, "Subtotal"),
        accessorFn: (row) => getPrice(row) * getQty(row),
        cell: ({ row }) => {
          const subtotal = getPrice(row.original) * getQty(row.original);
          return h("div", { class: "text-right font-medium" }, formatCurrency(subtotal));
        }
      },
      {
        id: "created_at",
        header: ({ column }) => h(
          _sfc_main$d,
          {
            variant: "ghost",
            onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
            class: "-ml-4"
          },
          () => [
            "Ditambahkan",
            h(
              column.getIsSorted() === "asc" ? ChevronUp : column.getIsSorted() === "desc" ? ChevronDown : ChevronsUpDown,
              { class: "ml-2 h-4 w-4" }
            )
          ]
        ),
        accessorFn: (row) => row.created_at ?? null,
        cell: ({ row }) => formatDate(row.original.created_at)
      }
    ];
    const table = useVueTable({
      get data() {
        return carts.value.data;
      },
      columns,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      state: {
        get sorting() {
          return sorting.value;
        }
      },
      onSortingChange: (updaterOrValue) => {
        sorting.value = typeof updaterOrValue === "function" ? updaterOrValue(sorting.value) : updaterOrValue;
      },
      manualSorting: true
    });
    watch(
      sorting,
      (newSorting) => {
        if (!newSorting.length) return;
        router.get(
          baseUrl,
          {
            page: 1,
            search: search.value || void 0,
            sort_by: newSorting[0].id,
            sort_order: newSorting[0].desc ? "desc" : "asc"
          },
          { preserveState: true, preserveScroll: true }
        );
      },
      { deep: true }
    );
    let searchTimeout;
    watch(search, () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        router.get(
          baseUrl,
          {
            page: 1,
            search: search.value || void 0,
            sort_by: sorting.value[0]?.id || "created_at",
            sort_order: sorting.value[0]?.desc ? "desc" : "asc"
          },
          { preserveState: true, preserveScroll: true }
        );
      }, 300);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ breadcrumbs: breadcrumbItems }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Keranjang Pelanggan" }, null, _parent2, _scopeId));
            _push2(`<div class="rounded-xl p-4 space-y-6 py-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="text-3xl font-bold tracking-tight"${_scopeId}>Keranjang Pelanggan</h1><p class="text-muted-foreground"${_scopeId}>Monitor keranjang belanja pelanggan</p></div></div><div class="grid gap-4 md:grid-cols-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Total Keranjang`);
                            } else {
                              return [
                                createTextVNode("Total Keranjang")
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
                              createTextVNode("Total Keranjang")
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
                        _push4(`<div class="text-2xl font-bold"${_scopeId3}>${ssrInterpolate(unref(statistics).total_carts)}</div><p class="text-xs text-muted-foreground"${_scopeId3}>Aktif</p>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(unref(statistics).total_carts), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Aktif")
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
                            createTextVNode("Total Keranjang")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(ShoppingCart), { class: "h-4 w-4 text-muted-foreground" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(unref(statistics).total_carts), 1),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, "Aktif")
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
                              _push5(`Total Item`);
                            } else {
                              return [
                                createTextVNode("Total Item")
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
                              createTextVNode("Total Item")
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
                        _push4(`<div class="text-2xl font-bold"${_scopeId3}>${ssrInterpolate(unref(statistics).total_items)}</div><p class="text-xs text-muted-foreground"${_scopeId3}>Produk di keranjang</p>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(unref(statistics).total_items), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Produk di keranjang")
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
                            createTextVNode("Total Item")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(Package), { class: "h-4 w-4 text-muted-foreground" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(unref(statistics).total_items), 1),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, "Produk di keranjang")
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
                              _push5(`Nilai Total`);
                            } else {
                              return [
                                createTextVNode("Nilai Total")
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
                              createTextVNode("Nilai Total")
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
                        _push4(`<div class="text-2xl font-bold"${_scopeId3}>${ssrInterpolate(formatCurrency(unref(statistics).total_value))}</div><p class="text-xs text-muted-foreground"${_scopeId3}>Potential revenue</p>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatCurrency(unref(statistics).total_value)), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Potential revenue")
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
                            createTextVNode("Nilai Total")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(ShoppingCart), { class: "h-4 w-4 text-muted-foreground" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatCurrency(unref(statistics).total_value)), 1),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, "Potential revenue")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center gap-4"${_scopeId}><div class="relative flex-1"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$6), {
              modelValue: search.value,
              "onUpdate:modelValue": ($event) => search.value = $event,
              placeholder: "Cari pelanggan atau produk...",
              class: "pl-9"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="rounded-md border"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$7), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$8), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(unref(table).getHeaderGroups(), (headerGroup) => {
                          _push4(ssrRenderComponent(unref(_sfc_main$9), {
                            key: headerGroup.id
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(headerGroup.headers, (header) => {
                                  _push5(ssrRenderComponent(unref(_sfc_main$a), {
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
                                    return openBlock(), createBlock(unref(_sfc_main$a), {
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
                            return openBlock(), createBlock(unref(_sfc_main$9), {
                              key: headerGroup.id
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                                  return openBlock(), createBlock(unref(_sfc_main$a), {
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
                  _push3(ssrRenderComponent(unref(_sfc_main$b), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (unref(table).getRowModel().rows?.length) {
                          _push4(`<!--[-->`);
                          ssrRenderList(unref(table).getRowModel().rows, (row) => {
                            _push4(ssrRenderComponent(unref(_sfc_main$9), {
                              key: row.id
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<!--[-->`);
                                  ssrRenderList(row.getVisibleCells(), (cell) => {
                                    _push5(ssrRenderComponent(unref(_sfc_main$c), {
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
                                      return openBlock(), createBlock(unref(_sfc_main$c), {
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
                          _push4(ssrRenderComponent(unref(_sfc_main$9), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(_sfc_main$c), {
                                  colspan: columns.length,
                                  class: "h-24 text-center"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(` Tidak ada data keranjang. `);
                                    } else {
                                      return [
                                        createTextVNode(" Tidak ada data keranjang. ")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(_sfc_main$c), {
                                    colspan: columns.length,
                                    class: "h-24 text-center"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Tidak ada data keranjang. ")
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
                            return openBlock(), createBlock(unref(_sfc_main$9), {
                              key: row.id
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                                  return openBlock(), createBlock(unref(_sfc_main$c), {
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
                          }), 128)) : (openBlock(), createBlock(unref(_sfc_main$9), { key: 1 }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$c), {
                                colspan: columns.length,
                                class: "h-24 text-center"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Tidak ada data keranjang. ")
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
                    createVNode(unref(_sfc_main$8), null, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getHeaderGroups(), (headerGroup) => {
                          return openBlock(), createBlock(unref(_sfc_main$9), {
                            key: headerGroup.id
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                                return openBlock(), createBlock(unref(_sfc_main$a), {
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
                    createVNode(unref(_sfc_main$b), null, {
                      default: withCtx(() => [
                        unref(table).getRowModel().rows?.length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(table).getRowModel().rows, (row) => {
                          return openBlock(), createBlock(unref(_sfc_main$9), {
                            key: row.id
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                                return openBlock(), createBlock(unref(_sfc_main$c), {
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
                        }), 128)) : (openBlock(), createBlock(unref(_sfc_main$9), { key: 1 }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$c), {
                              colspan: columns.length,
                              class: "h-24 text-center"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Tidak ada data keranjang. ")
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
            if (unref(carts).last_page > 1) {
              _push2(`<div class="flex items-center justify-between"${_scopeId}><p class="text-sm text-muted-foreground"${_scopeId}> Menampilkan ${ssrInterpolate((unref(carts).current_page - 1) * unref(carts).per_page + 1)} hingga ${ssrInterpolate(Math.min(unref(carts).current_page * unref(carts).per_page, unref(carts).total))} dari ${ssrInterpolate(unref(carts).total)} hasil </p><div class="flex gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(_sfc_main$d), {
                variant: "outline",
                size: "sm",
                disabled: unref(carts).current_page === 1,
                "as-child": ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Link), {
                      href: baseUrl,
                      data: {
                        page: 1,
                        search: search.value || void 0,
                        sort_by: sorting.value[0]?.id || "created_at",
                        sort_order: sorting.value[0]?.desc ? "desc" : "asc"
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
                        href: baseUrl,
                        data: {
                          page: 1,
                          search: search.value || void 0,
                          sort_by: sorting.value[0]?.id || "created_at",
                          sort_order: sorting.value[0]?.desc ? "desc" : "asc"
                        },
                        "preserve-scroll": "",
                        "preserve-state": ""
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(ChevronsLeft), { class: "h-4 w-4" })
                        ]),
                        _: 1
                      }, 8, ["data"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$d), {
                variant: "outline",
                size: "sm",
                disabled: !prevUrl.value,
                "as-child": ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Link), {
                      href: prevUrl.value || "#",
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
                        href: prevUrl.value || "#",
                        "preserve-scroll": "",
                        "preserve-state": ""
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(ChevronLeft), { class: "h-4 w-4" })
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$d), {
                variant: "outline",
                size: "sm",
                disabled: !nextUrl.value,
                "as-child": ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Link), {
                      href: nextUrl.value || "#",
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
                        href: nextUrl.value || "#",
                        "preserve-scroll": "",
                        "preserve-state": ""
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(ChevronRight), { class: "h-4 w-4" })
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$d), {
                variant: "outline",
                size: "sm",
                disabled: unref(carts).current_page === unref(carts).last_page,
                "as-child": ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Link), {
                      href: baseUrl,
                      data: {
                        page: unref(carts).last_page,
                        search: search.value || void 0,
                        sort_by: sorting.value[0]?.id || "created_at",
                        sort_order: sorting.value[0]?.desc ? "desc" : "asc"
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
                        href: baseUrl,
                        data: {
                          page: unref(carts).last_page,
                          search: search.value || void 0,
                          sort_by: sorting.value[0]?.id || "created_at",
                          sort_order: sorting.value[0]?.desc ? "desc" : "asc"
                        },
                        "preserve-scroll": "",
                        "preserve-state": ""
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(ChevronsRight), { class: "h-4 w-4" })
                        ]),
                        _: 1
                      }, 8, ["data"])
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
          } else {
            return [
              createVNode(unref(Head), { title: "Keranjang Pelanggan" }),
              createVNode("div", { class: "rounded-xl p-4 space-y-6 py-6" }, [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("div", null, [
                    createVNode("h1", { class: "text-3xl font-bold tracking-tight" }, "Keranjang Pelanggan"),
                    createVNode("p", { class: "text-muted-foreground" }, "Monitor keranjang belanja pelanggan")
                  ])
                ]),
                createVNode("div", { class: "grid gap-4 md:grid-cols-3" }, [
                  createVNode(unref(_sfc_main$2), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$3), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$4), { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Total Keranjang")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(ShoppingCart), { class: "h-4 w-4 text-muted-foreground" })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(unref(statistics).total_carts), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Aktif")
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
                              createTextVNode("Total Item")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(Package), { class: "h-4 w-4 text-muted-foreground" })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(unref(statistics).total_items), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Produk di keranjang")
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
                              createTextVNode("Nilai Total")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(ShoppingCart), { class: "h-4 w-4 text-muted-foreground" })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatCurrency(unref(statistics).total_value)), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Potential revenue")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "flex items-center gap-4" }, [
                  createVNode("div", { class: "relative flex-1" }, [
                    createVNode(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
                    createVNode(unref(_sfc_main$6), {
                      modelValue: search.value,
                      "onUpdate:modelValue": ($event) => search.value = $event,
                      placeholder: "Cari pelanggan atau produk...",
                      class: "pl-9"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "rounded-md border" }, [
                  createVNode(unref(_sfc_main$7), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$8), null, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getHeaderGroups(), (headerGroup) => {
                            return openBlock(), createBlock(unref(_sfc_main$9), {
                              key: headerGroup.id
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                                  return openBlock(), createBlock(unref(_sfc_main$a), {
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
                      createVNode(unref(_sfc_main$b), null, {
                        default: withCtx(() => [
                          unref(table).getRowModel().rows?.length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(table).getRowModel().rows, (row) => {
                            return openBlock(), createBlock(unref(_sfc_main$9), {
                              key: row.id
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                                  return openBlock(), createBlock(unref(_sfc_main$c), {
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
                          }), 128)) : (openBlock(), createBlock(unref(_sfc_main$9), { key: 1 }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$c), {
                                colspan: columns.length,
                                class: "h-24 text-center"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Tidak ada data keranjang. ")
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
                unref(carts).last_page > 1 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "flex items-center justify-between"
                }, [
                  createVNode("p", { class: "text-sm text-muted-foreground" }, " Menampilkan " + toDisplayString((unref(carts).current_page - 1) * unref(carts).per_page + 1) + " hingga " + toDisplayString(Math.min(unref(carts).current_page * unref(carts).per_page, unref(carts).total)) + " dari " + toDisplayString(unref(carts).total) + " hasil ", 1),
                  createVNode("div", { class: "flex gap-2" }, [
                    createVNode(unref(_sfc_main$d), {
                      variant: "outline",
                      size: "sm",
                      disabled: unref(carts).current_page === 1,
                      "as-child": ""
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Link), {
                          href: baseUrl,
                          data: {
                            page: 1,
                            search: search.value || void 0,
                            sort_by: sorting.value[0]?.id || "created_at",
                            sort_order: sorting.value[0]?.desc ? "desc" : "asc"
                          },
                          "preserve-scroll": "",
                          "preserve-state": ""
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(ChevronsLeft), { class: "h-4 w-4" })
                          ]),
                          _: 1
                        }, 8, ["data"])
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    createVNode(unref(_sfc_main$d), {
                      variant: "outline",
                      size: "sm",
                      disabled: !prevUrl.value,
                      "as-child": ""
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Link), {
                          href: prevUrl.value || "#",
                          "preserve-scroll": "",
                          "preserve-state": ""
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(ChevronLeft), { class: "h-4 w-4" })
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    createVNode(unref(_sfc_main$d), {
                      variant: "outline",
                      size: "sm",
                      disabled: !nextUrl.value,
                      "as-child": ""
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Link), {
                          href: nextUrl.value || "#",
                          "preserve-scroll": "",
                          "preserve-state": ""
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(ChevronRight), { class: "h-4 w-4" })
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    createVNode(unref(_sfc_main$d), {
                      variant: "outline",
                      size: "sm",
                      disabled: unref(carts).current_page === unref(carts).last_page,
                      "as-child": ""
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Link), {
                          href: baseUrl,
                          data: {
                            page: unref(carts).last_page,
                            search: search.value || void 0,
                            sort_by: sorting.value[0]?.id || "created_at",
                            sort_order: sorting.value[0]?.desc ? "desc" : "asc"
                          },
                          "preserve-scroll": "",
                          "preserve-state": ""
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(ChevronsRight), { class: "h-4 w-4" })
                          ]),
                          _: 1
                        }, 8, ["data"])
                      ]),
                      _: 1
                    }, 8, ["disabled"])
                  ])
                ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Carts/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
