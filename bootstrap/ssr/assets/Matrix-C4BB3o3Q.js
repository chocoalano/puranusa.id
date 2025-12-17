import { defineComponent, ref, computed, mergeProps, withCtx, unref, createTextVNode, createVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, h, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-Dj5p5Ehf.js";
import { _ as _sfc_main$2 } from "./StatisticsCards-BSah0xWT.js";
import { _ as _sfc_main$8, a as _sfc_main$f } from "./TablePagination-DVCBMZBm.js";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5, d as _sfc_main$6, c as _sfc_main$7 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$9, a as _sfc_main$a, b as _sfc_main$b, c as _sfc_main$c, d as _sfc_main$d, e as _sfc_main$e } from "./TableHeader-emcE6QAC.js";
import { useVueTable, getSortedRowModel, getCoreRowModel, FlexRender } from "@tanstack/vue-table";
import "class-variance-authority";
import "./index-SN_CnQ_F.js";
import "reka-ui";
import "clsx";
import "tailwind-merge";
import "./DropdownMenuTrigger-B1v6pHML.js";
import "@vueuse/core";
import "lucide-vue-next";
import "./Input-BGi8wCMh.js";
import "./index-Jhngbhhu.js";
import "./AvatarImage-DWFQMckn.js";
import "vue-sonner";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
import "./SelectValue-BUnv4mQg.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Matrix",
  __ssrInlineRender: true,
  props: {
    networks: {},
    statistics: {},
    filters: {}
  },
  setup(__props) {
    const props = __props;
    const searchQuery = ref(props.filters?.search || "");
    const selectedLevel = ref(props.filters?.level || "all");
    const sorting = ref([]);
    let searchTimeout;
    const statistics = computed(() => [
      {
        label: "Total Member",
        value: props.statistics.total_members
      },
      {
        label: "Level 1",
        value: props.statistics.level_1
      },
      {
        label: "Level 2",
        value: props.statistics.level_2
      },
      {
        label: "Level 3+",
        value: props.statistics.level_3_plus
      }
    ]);
    const filterConfigs = computed(() => [
      {
        type: "search",
        placeholder: "Cari member...",
        modelValue: searchQuery.value
      },
      {
        type: "select",
        placeholder: "Semua Level",
        modelValue: selectedLevel.value,
        options: [
          { value: "all", label: "Semua Level" },
          { value: "1", label: "Level 1" },
          { value: "2", label: "Level 2" },
          { value: "3", label: "Level 3" },
          { value: "4", label: "Level 4" },
          { value: "5", label: "Level 5+" }
        ]
      }
    ]);
    const columns = [
      {
        accessorKey: "member",
        header: "Member",
        cell: ({ row }) => {
          const member = row.original.member;
          return h("div", { class: "space-y-1" }, [
            h("div", { class: "font-medium" }, member.name),
            h("div", { class: "text-xs text-muted-foreground" }, member.email)
          ]);
        }
      },
      {
        accessorKey: "sponsor",
        header: "Sponsor",
        cell: ({ row }) => {
          const sponsor = row.original.sponsor;
          return h("div", { class: "space-y-1" }, [
            h("div", { class: "font-medium" }, sponsor.name),
            h("div", { class: "text-xs text-muted-foreground" }, sponsor.email)
          ]);
        }
      },
      {
        accessorKey: "level",
        header: "Level"
      },
      {
        accessorKey: "created_at",
        header: "Tanggal Bergabung",
        cell: ({ row }) => {
          const date = new Date(row.getValue("created_at"));
          return new Intl.DateTimeFormat("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric"
          }).format(date);
        }
      }
    ];
    const table = useVueTable({
      data: computed(() => props.networks.data),
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
      }
    });
    const handleSearch = () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        router.get(
          "/admin/networks/matrix",
          { search: searchQuery.value, level: selectedLevel.value },
          { preserveState: true, preserveScroll: true }
        );
      }, 300);
    };
    const handleFilterUpdate = (index, value) => {
      const val = value?.toString() || "all";
      if (index === 0) {
        searchQuery.value = val;
        handleSearch();
      } else if (index === 1) {
        selectedLevel.value = val;
        router.get(
          "/admin/networks/matrix",
          { search: searchQuery.value, level: val === "all" ? void 0 : val },
          { preserveState: true, preserveScroll: true }
        );
      }
    };
    const goToPage = (page) => {
      router.get(
        "/admin/networks/matrix",
        { page, search: searchQuery.value, level: selectedLevel.value === "all" ? void 0 : selectedLevel.value },
        { preserveState: true, preserveScroll: true }
      );
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ title: "Jaringan Matrix" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-6"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              stats: statistics.value,
              columns: 4
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$3), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Jaringan Matrix`);
                            } else {
                              return [
                                createTextVNode("Jaringan Matrix")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Monitoring member dalam struktur jaringan matrix (sponsor - downline) `);
                            } else {
                              return [
                                createTextVNode(" Monitoring member dalam struktur jaringan matrix (sponsor - downline) ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Jaringan Matrix")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode(" Monitoring member dalam struktur jaringan matrix (sponsor - downline) ")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$8, {
                          filters: filterConfigs.value,
                          "on-update": handleFilterUpdate
                        }, null, _parent4, _scopeId3));
                        _push4(`<div class="rounded-md border"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$a), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<!--[-->`);
                                    ssrRenderList(unref(table).getHeaderGroups(), (headerGroup) => {
                                      _push6(ssrRenderComponent(unref(_sfc_main$b), {
                                        key: headerGroup.id
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`<!--[-->`);
                                            ssrRenderList(headerGroup.headers, (header) => {
                                              _push7(ssrRenderComponent(unref(_sfc_main$c), {
                                                key: header.id
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    if (!header.isPlaceholder) {
                                                      _push8(`<div class="${ssrRenderClass(header.column.getCanSort() ? "cursor-pointer select-none" : "")}"${_scopeId7}>`);
                                                      _push8(ssrRenderComponent(unref(FlexRender), {
                                                        render: header.column.columnDef.header,
                                                        props: header.getContext()
                                                      }, null, _parent8, _scopeId7));
                                                      if (header.column.getIsSorted() === "asc") {
                                                        _push8(`<span${_scopeId7}> ↑</span>`);
                                                      } else if (header.column.getIsSorted() === "desc") {
                                                        _push8(`<span${_scopeId7}> ↓</span>`);
                                                      } else {
                                                        _push8(`<!---->`);
                                                      }
                                                      _push8(`</div>`);
                                                    } else {
                                                      _push8(`<!---->`);
                                                    }
                                                  } else {
                                                    return [
                                                      !header.isPlaceholder ? (openBlock(), createBlock("div", {
                                                        key: 0,
                                                        class: header.column.getCanSort() ? "cursor-pointer select-none" : "",
                                                        onClick: ($event) => header.column.getToggleSortingHandler()?.($event)
                                                      }, [
                                                        createVNode(unref(FlexRender), {
                                                          render: header.column.columnDef.header,
                                                          props: header.getContext()
                                                        }, null, 8, ["render", "props"]),
                                                        header.column.getIsSorted() === "asc" ? (openBlock(), createBlock("span", { key: 0 }, " ↑")) : header.column.getIsSorted() === "desc" ? (openBlock(), createBlock("span", { key: 1 }, " ↓")) : createCommentVNode("", true)
                                                      ], 10, ["onClick"])) : createCommentVNode("", true)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                            });
                                            _push7(`<!--]-->`);
                                          } else {
                                            return [
                                              (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                                                return openBlock(), createBlock(unref(_sfc_main$c), {
                                                  key: header.id
                                                }, {
                                                  default: withCtx(() => [
                                                    !header.isPlaceholder ? (openBlock(), createBlock("div", {
                                                      key: 0,
                                                      class: header.column.getCanSort() ? "cursor-pointer select-none" : "",
                                                      onClick: ($event) => header.column.getToggleSortingHandler()?.($event)
                                                    }, [
                                                      createVNode(unref(FlexRender), {
                                                        render: header.column.columnDef.header,
                                                        props: header.getContext()
                                                      }, null, 8, ["render", "props"]),
                                                      header.column.getIsSorted() === "asc" ? (openBlock(), createBlock("span", { key: 0 }, " ↑")) : header.column.getIsSorted() === "desc" ? (openBlock(), createBlock("span", { key: 1 }, " ↓")) : createCommentVNode("", true)
                                                    ], 10, ["onClick"])) : createCommentVNode("", true)
                                                  ]),
                                                  _: 2
                                                }, 1024);
                                              }), 128))
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    });
                                    _push6(`<!--]-->`);
                                  } else {
                                    return [
                                      (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getHeaderGroups(), (headerGroup) => {
                                        return openBlock(), createBlock(unref(_sfc_main$b), {
                                          key: headerGroup.id
                                        }, {
                                          default: withCtx(() => [
                                            (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                                              return openBlock(), createBlock(unref(_sfc_main$c), {
                                                key: header.id
                                              }, {
                                                default: withCtx(() => [
                                                  !header.isPlaceholder ? (openBlock(), createBlock("div", {
                                                    key: 0,
                                                    class: header.column.getCanSort() ? "cursor-pointer select-none" : "",
                                                    onClick: ($event) => header.column.getToggleSortingHandler()?.($event)
                                                  }, [
                                                    createVNode(unref(FlexRender), {
                                                      render: header.column.columnDef.header,
                                                      props: header.getContext()
                                                    }, null, 8, ["render", "props"]),
                                                    header.column.getIsSorted() === "asc" ? (openBlock(), createBlock("span", { key: 0 }, " ↑")) : header.column.getIsSorted() === "desc" ? (openBlock(), createBlock("span", { key: 1 }, " ↓")) : createCommentVNode("", true)
                                                  ], 10, ["onClick"])) : createCommentVNode("", true)
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
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$d), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    if (unref(table).getRowModel().rows?.length) {
                                      _push6(`<!--[-->`);
                                      ssrRenderList(unref(table).getRowModel().rows, (row) => {
                                        _push6(ssrRenderComponent(unref(_sfc_main$b), {
                                          key: row.id,
                                          "data-state": row.getIsSelected() ? "selected" : void 0
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`<!--[-->`);
                                              ssrRenderList(row.getVisibleCells(), (cell) => {
                                                _push7(ssrRenderComponent(unref(_sfc_main$e), {
                                                  key: cell.id
                                                }, {
                                                  default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                    if (_push8) {
                                                      _push8(ssrRenderComponent(unref(FlexRender), {
                                                        render: cell.column.columnDef.cell,
                                                        props: cell.getContext()
                                                      }, null, _parent8, _scopeId7));
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
                                                }, _parent7, _scopeId6));
                                              });
                                              _push7(`<!--]-->`);
                                            } else {
                                              return [
                                                (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                                                  return openBlock(), createBlock(unref(_sfc_main$e), {
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
                                        }, _parent6, _scopeId5));
                                      });
                                      _push6(`<!--]-->`);
                                    } else {
                                      _push6(ssrRenderComponent(unref(_sfc_main$b), null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(unref(_sfc_main$e), {
                                              colspan: columns.length,
                                              class: "h-24 text-center"
                                            }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(` Tidak ada data. `);
                                                } else {
                                                  return [
                                                    createTextVNode(" Tidak ada data. ")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(unref(_sfc_main$e), {
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
                                      }, _parent6, _scopeId5));
                                    }
                                  } else {
                                    return [
                                      unref(table).getRowModel().rows?.length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(table).getRowModel().rows, (row) => {
                                        return openBlock(), createBlock(unref(_sfc_main$b), {
                                          key: row.id,
                                          "data-state": row.getIsSelected() ? "selected" : void 0
                                        }, {
                                          default: withCtx(() => [
                                            (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                                              return openBlock(), createBlock(unref(_sfc_main$e), {
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
                                      }), 128)) : (openBlock(), createBlock(unref(_sfc_main$b), { key: 1 }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$e), {
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
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$a), null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getHeaderGroups(), (headerGroup) => {
                                      return openBlock(), createBlock(unref(_sfc_main$b), {
                                        key: headerGroup.id
                                      }, {
                                        default: withCtx(() => [
                                          (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                                            return openBlock(), createBlock(unref(_sfc_main$c), {
                                              key: header.id
                                            }, {
                                              default: withCtx(() => [
                                                !header.isPlaceholder ? (openBlock(), createBlock("div", {
                                                  key: 0,
                                                  class: header.column.getCanSort() ? "cursor-pointer select-none" : "",
                                                  onClick: ($event) => header.column.getToggleSortingHandler()?.($event)
                                                }, [
                                                  createVNode(unref(FlexRender), {
                                                    render: header.column.columnDef.header,
                                                    props: header.getContext()
                                                  }, null, 8, ["render", "props"]),
                                                  header.column.getIsSorted() === "asc" ? (openBlock(), createBlock("span", { key: 0 }, " ↑")) : header.column.getIsSorted() === "desc" ? (openBlock(), createBlock("span", { key: 1 }, " ↓")) : createCommentVNode("", true)
                                                ], 10, ["onClick"])) : createCommentVNode("", true)
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
                                createVNode(unref(_sfc_main$d), null, {
                                  default: withCtx(() => [
                                    unref(table).getRowModel().rows?.length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(table).getRowModel().rows, (row) => {
                                      return openBlock(), createBlock(unref(_sfc_main$b), {
                                        key: row.id,
                                        "data-state": row.getIsSelected() ? "selected" : void 0
                                      }, {
                                        default: withCtx(() => [
                                          (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                                            return openBlock(), createBlock(unref(_sfc_main$e), {
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
                                    }), 128)) : (openBlock(), createBlock(unref(_sfc_main$b), { key: 1 }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$e), {
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
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                        _push4(ssrRenderComponent(_sfc_main$f, {
                          data: __props.networks,
                          "item-label": "member",
                          "on-page-change": goToPage
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$8, {
                            filters: filterConfigs.value,
                            "on-update": handleFilterUpdate
                          }, null, 8, ["filters"]),
                          createVNode("div", { class: "rounded-md border" }, [
                            createVNode(unref(_sfc_main$9), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$a), null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getHeaderGroups(), (headerGroup) => {
                                      return openBlock(), createBlock(unref(_sfc_main$b), {
                                        key: headerGroup.id
                                      }, {
                                        default: withCtx(() => [
                                          (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                                            return openBlock(), createBlock(unref(_sfc_main$c), {
                                              key: header.id
                                            }, {
                                              default: withCtx(() => [
                                                !header.isPlaceholder ? (openBlock(), createBlock("div", {
                                                  key: 0,
                                                  class: header.column.getCanSort() ? "cursor-pointer select-none" : "",
                                                  onClick: ($event) => header.column.getToggleSortingHandler()?.($event)
                                                }, [
                                                  createVNode(unref(FlexRender), {
                                                    render: header.column.columnDef.header,
                                                    props: header.getContext()
                                                  }, null, 8, ["render", "props"]),
                                                  header.column.getIsSorted() === "asc" ? (openBlock(), createBlock("span", { key: 0 }, " ↑")) : header.column.getIsSorted() === "desc" ? (openBlock(), createBlock("span", { key: 1 }, " ↓")) : createCommentVNode("", true)
                                                ], 10, ["onClick"])) : createCommentVNode("", true)
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
                                createVNode(unref(_sfc_main$d), null, {
                                  default: withCtx(() => [
                                    unref(table).getRowModel().rows?.length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(table).getRowModel().rows, (row) => {
                                      return openBlock(), createBlock(unref(_sfc_main$b), {
                                        key: row.id,
                                        "data-state": row.getIsSelected() ? "selected" : void 0
                                      }, {
                                        default: withCtx(() => [
                                          (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                                            return openBlock(), createBlock(unref(_sfc_main$e), {
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
                                    }), 128)) : (openBlock(), createBlock(unref(_sfc_main$b), { key: 1 }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$e), {
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
                          createVNode(_sfc_main$f, {
                            data: __props.networks,
                            "item-label": "member",
                            "on-page-change": goToPage
                          }, null, 8, ["data"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Jaringan Matrix")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode(" Monitoring member dalam struktur jaringan matrix (sponsor - downline) ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), null, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$8, {
                          filters: filterConfigs.value,
                          "on-update": handleFilterUpdate
                        }, null, 8, ["filters"]),
                        createVNode("div", { class: "rounded-md border" }, [
                          createVNode(unref(_sfc_main$9), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$a), null, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getHeaderGroups(), (headerGroup) => {
                                    return openBlock(), createBlock(unref(_sfc_main$b), {
                                      key: headerGroup.id
                                    }, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                                          return openBlock(), createBlock(unref(_sfc_main$c), {
                                            key: header.id
                                          }, {
                                            default: withCtx(() => [
                                              !header.isPlaceholder ? (openBlock(), createBlock("div", {
                                                key: 0,
                                                class: header.column.getCanSort() ? "cursor-pointer select-none" : "",
                                                onClick: ($event) => header.column.getToggleSortingHandler()?.($event)
                                              }, [
                                                createVNode(unref(FlexRender), {
                                                  render: header.column.columnDef.header,
                                                  props: header.getContext()
                                                }, null, 8, ["render", "props"]),
                                                header.column.getIsSorted() === "asc" ? (openBlock(), createBlock("span", { key: 0 }, " ↑")) : header.column.getIsSorted() === "desc" ? (openBlock(), createBlock("span", { key: 1 }, " ↓")) : createCommentVNode("", true)
                                              ], 10, ["onClick"])) : createCommentVNode("", true)
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
                              createVNode(unref(_sfc_main$d), null, {
                                default: withCtx(() => [
                                  unref(table).getRowModel().rows?.length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(table).getRowModel().rows, (row) => {
                                    return openBlock(), createBlock(unref(_sfc_main$b), {
                                      key: row.id,
                                      "data-state": row.getIsSelected() ? "selected" : void 0
                                    }, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                                          return openBlock(), createBlock(unref(_sfc_main$e), {
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
                                  }), 128)) : (openBlock(), createBlock(unref(_sfc_main$b), { key: 1 }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$e), {
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
                        createVNode(_sfc_main$f, {
                          data: __props.networks,
                          "item-label": "member",
                          "on-page-change": goToPage
                        }, null, 8, ["data"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-6" }, [
                createVNode(_sfc_main$2, {
                  stats: statistics.value,
                  columns: 4
                }, null, 8, ["stats"]),
                createVNode(unref(_sfc_main$3), null, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Jaringan Matrix")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode(" Monitoring member dalam struktur jaringan matrix (sponsor - downline) ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), null, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$8, {
                          filters: filterConfigs.value,
                          "on-update": handleFilterUpdate
                        }, null, 8, ["filters"]),
                        createVNode("div", { class: "rounded-md border" }, [
                          createVNode(unref(_sfc_main$9), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$a), null, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getHeaderGroups(), (headerGroup) => {
                                    return openBlock(), createBlock(unref(_sfc_main$b), {
                                      key: headerGroup.id
                                    }, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                                          return openBlock(), createBlock(unref(_sfc_main$c), {
                                            key: header.id
                                          }, {
                                            default: withCtx(() => [
                                              !header.isPlaceholder ? (openBlock(), createBlock("div", {
                                                key: 0,
                                                class: header.column.getCanSort() ? "cursor-pointer select-none" : "",
                                                onClick: ($event) => header.column.getToggleSortingHandler()?.($event)
                                              }, [
                                                createVNode(unref(FlexRender), {
                                                  render: header.column.columnDef.header,
                                                  props: header.getContext()
                                                }, null, 8, ["render", "props"]),
                                                header.column.getIsSorted() === "asc" ? (openBlock(), createBlock("span", { key: 0 }, " ↑")) : header.column.getIsSorted() === "desc" ? (openBlock(), createBlock("span", { key: 1 }, " ↓")) : createCommentVNode("", true)
                                              ], 10, ["onClick"])) : createCommentVNode("", true)
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
                              createVNode(unref(_sfc_main$d), null, {
                                default: withCtx(() => [
                                  unref(table).getRowModel().rows?.length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(table).getRowModel().rows, (row) => {
                                    return openBlock(), createBlock(unref(_sfc_main$b), {
                                      key: row.id,
                                      "data-state": row.getIsSelected() ? "selected" : void 0
                                    }, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                                          return openBlock(), createBlock(unref(_sfc_main$e), {
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
                                  }), 128)) : (openBlock(), createBlock(unref(_sfc_main$b), { key: 1 }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$e), {
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
                        createVNode(_sfc_main$f, {
                          data: __props.networks,
                          "item-label": "member",
                          "on-page-change": goToPage
                        }, null, 8, ["data"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Networks/Matrix.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
