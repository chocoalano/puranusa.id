import { defineComponent, ref, computed, h, mergeProps, withCtx, unref, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-Dl_X7-UB.js";
import { _ as _sfc_main$2 } from "./StatisticsCards-BSah0xWT.js";
import { _ as _sfc_main$7, a as _sfc_main$e } from "./TablePagination-DVCBMZBm.js";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5, c as _sfc_main$6 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$f } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$8, a as _sfc_main$9, b as _sfc_main$a, c as _sfc_main$b, d as _sfc_main$c, e as _sfc_main$d } from "./TableHeader-emcE6QAC.js";
import { useVueTable, getSortedRowModel, getCoreRowModel, FlexRender } from "@tanstack/vue-table";
import { Mail, Trash2 } from "lucide-vue-next";
import { u as usePermissions } from "./usePermissions-DYRibCI0.js";
import "class-variance-authority";
import "./DropdownMenuTrigger-B1v6pHML.js";
import "reka-ui";
import "@vueuse/core";
import "./Input-BGi8wCMh.js";
import "./index--D7ld9AJ.js";
import "./AvatarImage-DWFQMckn.js";
import "./index-BsP5JKUP.js";
import "vue-sonner";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
import "./SelectValue-BUnv4mQg.js";
import "clsx";
import "tailwind-merge";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    newsletters: {},
    statistics: {},
    filters: {}
  },
  setup(__props) {
    const { isSuperAdmin, isAdmin } = usePermissions();
    const props = __props;
    const searchQuery = ref(props.filters?.search || "");
    const sorting = ref([]);
    let searchTimeout;
    const statistics = computed(() => [
      { label: "Total Subscriber", value: props.statistics.total_subscribers },
      { label: "Hari Ini", value: props.statistics.total_today },
      { label: "Bulan Ini", value: props.statistics.total_this_month }
    ]);
    const filterConfigs = computed(() => [
      {
        type: "search",
        placeholder: "Cari email...",
        modelValue: searchQuery.value
      }
    ]);
    const handleSearch = () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        router.get(
          "/admin/settings/newsletters",
          { search: searchQuery.value },
          { preserveState: true, preserveScroll: true }
        );
      }, 300);
    };
    const handleFilterUpdate = (index, value) => {
      const val = value?.toString() || "";
      if (index === 0) {
        searchQuery.value = val;
        handleSearch();
      }
    };
    const handleDelete = (subscriberId) => {
      if (confirm("Apakah Anda yakin ingin menghapus subscriber ini?")) {
        router.delete(`/admin/settings/newsletters/${subscriberId}`, {
          preserveScroll: true
        });
      }
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
    const columns = [
      {
        id: "index",
        header: () => h("div", { class: "w-12" }, "No"),
        cell: ({ row }) => {
          const index = row.index + 1 + (props.newsletters.current_page - 1) * props.newsletters.per_page;
          return h("div", { class: "font-medium" }, index);
        }
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => {
          return h("div", { class: "font-medium" }, row.getValue("email"));
        }
      },
      {
        accessorKey: "ip_address",
        header: "IP Address",
        cell: ({ row }) => {
          return h("code", { class: "rounded bg-muted px-2 py-1 text-xs" }, row.getValue("ip_address"));
        }
      },
      {
        accessorKey: "created_at",
        header: "Tanggal Daftar",
        cell: ({ row }) => {
          return h("div", { class: "text-sm" }, formatDate(row.getValue("created_at")));
        }
      },
      {
        id: "actions",
        header: () => h("div", { class: "text-right" }, "Aksi"),
        cell: ({ row }) => {
          const newsletter = row.original;
          const actions = [];
          if (isSuperAdmin || isAdmin) {
            actions.push(h(
              _sfc_main$f,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => handleDelete(newsletter.id)
              },
              () => h(Trash2, { class: "h-4 w-4 text-destructive" })
            ));
          }
          return h("div", { class: "flex justify-end gap-2" }, actions);
        }
      }
    ];
    const table = useVueTable({
      data: computed(() => props.newsletters.data),
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
    const goToPage = (page) => {
      router.get(
        "/admin/settings/newsletters",
        { page, search: searchQuery.value },
        { preserveState: true, preserveScroll: true }
      );
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ title: "Newsletter Subscribers" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-6"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              stats: statistics.value,
              columns: 3
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$3), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$5), { class: "flex items-center gap-2" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Mail), { class: "h-5 w-5" }, null, _parent5, _scopeId4));
                              _push5(` Newsletter Subscribers `);
                            } else {
                              return [
                                createVNode(unref(Mail), { class: "h-5 w-5" }),
                                createTextVNode(" Newsletter Subscribers ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), { class: "flex items-center gap-2" }, {
                            default: withCtx(() => [
                              createVNode(unref(Mail), { class: "h-5 w-5" }),
                              createTextVNode(" Newsletter Subscribers ")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { class: "space-y-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$7, {
                          filters: filterConfigs.value,
                          "on-update": handleFilterUpdate
                        }, null, _parent4, _scopeId3));
                        _push4(`<div class="rounded-md border"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$9), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<!--[-->`);
                                    ssrRenderList(unref(table).getHeaderGroups(), (headerGroup) => {
                                      _push6(ssrRenderComponent(unref(_sfc_main$a), {
                                        key: headerGroup.id
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`<!--[-->`);
                                            ssrRenderList(headerGroup.headers, (header) => {
                                              _push7(ssrRenderComponent(unref(_sfc_main$b), {
                                                key: header.id
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    if (!header.isPlaceholder) {
                                                      _push8(ssrRenderComponent(unref(FlexRender), {
                                                        render: header.column.columnDef.header,
                                                        props: header.getContext()
                                                      }, null, _parent8, _scopeId7));
                                                    } else {
                                                      _push8(`<!---->`);
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
                                              }, _parent7, _scopeId6));
                                            });
                                            _push7(`<!--]-->`);
                                          } else {
                                            return [
                                              (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                                                return openBlock(), createBlock(unref(_sfc_main$b), {
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
                                      }, _parent6, _scopeId5));
                                    });
                                    _push6(`<!--]-->`);
                                  } else {
                                    return [
                                      (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getHeaderGroups(), (headerGroup) => {
                                        return openBlock(), createBlock(unref(_sfc_main$a), {
                                          key: headerGroup.id
                                        }, {
                                          default: withCtx(() => [
                                            (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                                              return openBlock(), createBlock(unref(_sfc_main$b), {
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
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    if (unref(table).getRowModel().rows?.length) {
                                      _push6(`<!--[-->`);
                                      ssrRenderList(unref(table).getRowModel().rows, (row) => {
                                        _push6(ssrRenderComponent(unref(_sfc_main$a), {
                                          key: row.id
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`<!--[-->`);
                                              ssrRenderList(row.getVisibleCells(), (cell) => {
                                                _push7(ssrRenderComponent(unref(_sfc_main$d), {
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
                                                  return openBlock(), createBlock(unref(_sfc_main$d), {
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
                                      _push6(ssrRenderComponent(unref(_sfc_main$a), null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(unref(_sfc_main$d), {
                                              colspan: columns.length,
                                              class: "h-24 text-center"
                                            }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(` Tidak ada data subscriber. `);
                                                } else {
                                                  return [
                                                    createTextVNode(" Tidak ada data subscriber. ")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(unref(_sfc_main$d), {
                                                colspan: columns.length,
                                                class: "h-24 text-center"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" Tidak ada data subscriber. ")
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
                                        return openBlock(), createBlock(unref(_sfc_main$a), {
                                          key: row.id
                                        }, {
                                          default: withCtx(() => [
                                            (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                                              return openBlock(), createBlock(unref(_sfc_main$d), {
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
                                      }), 128)) : (openBlock(), createBlock(unref(_sfc_main$a), { key: 1 }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$d), {
                                            colspan: columns.length,
                                            class: "h-24 text-center"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(" Tidak ada data subscriber. ")
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
                                createVNode(unref(_sfc_main$9), null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getHeaderGroups(), (headerGroup) => {
                                      return openBlock(), createBlock(unref(_sfc_main$a), {
                                        key: headerGroup.id
                                      }, {
                                        default: withCtx(() => [
                                          (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                                            return openBlock(), createBlock(unref(_sfc_main$b), {
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
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    unref(table).getRowModel().rows?.length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(table).getRowModel().rows, (row) => {
                                      return openBlock(), createBlock(unref(_sfc_main$a), {
                                        key: row.id
                                      }, {
                                        default: withCtx(() => [
                                          (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                                            return openBlock(), createBlock(unref(_sfc_main$d), {
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
                                    }), 128)) : (openBlock(), createBlock(unref(_sfc_main$a), { key: 1 }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$d), {
                                          colspan: columns.length,
                                          class: "h-24 text-center"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" Tidak ada data subscriber. ")
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
                        if (__props.newsletters.last_page > 1) {
                          _push4(ssrRenderComponent(_sfc_main$e, {
                            data: __props.newsletters,
                            "on-page-change": goToPage,
                            "item-label": "subscriber"
                          }, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode(_sfc_main$7, {
                            filters: filterConfigs.value,
                            "on-update": handleFilterUpdate
                          }, null, 8, ["filters"]),
                          createVNode("div", { class: "rounded-md border" }, [
                            createVNode(unref(_sfc_main$8), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$9), null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getHeaderGroups(), (headerGroup) => {
                                      return openBlock(), createBlock(unref(_sfc_main$a), {
                                        key: headerGroup.id
                                      }, {
                                        default: withCtx(() => [
                                          (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                                            return openBlock(), createBlock(unref(_sfc_main$b), {
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
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    unref(table).getRowModel().rows?.length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(table).getRowModel().rows, (row) => {
                                      return openBlock(), createBlock(unref(_sfc_main$a), {
                                        key: row.id
                                      }, {
                                        default: withCtx(() => [
                                          (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                                            return openBlock(), createBlock(unref(_sfc_main$d), {
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
                                    }), 128)) : (openBlock(), createBlock(unref(_sfc_main$a), { key: 1 }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$d), {
                                          colspan: columns.length,
                                          class: "h-24 text-center"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" Tidak ada data subscriber. ")
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
                          __props.newsletters.last_page > 1 ? (openBlock(), createBlock(_sfc_main$e, {
                            key: 0,
                            data: __props.newsletters,
                            "on-page-change": goToPage,
                            "item-label": "subscriber"
                          }, null, 8, ["data"])) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$5), { class: "flex items-center gap-2" }, {
                          default: withCtx(() => [
                            createVNode(unref(Mail), { class: "h-5 w-5" }),
                            createTextVNode(" Newsletter Subscribers ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), { class: "space-y-4" }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$7, {
                          filters: filterConfigs.value,
                          "on-update": handleFilterUpdate
                        }, null, 8, ["filters"]),
                        createVNode("div", { class: "rounded-md border" }, [
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$9), null, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getHeaderGroups(), (headerGroup) => {
                                    return openBlock(), createBlock(unref(_sfc_main$a), {
                                      key: headerGroup.id
                                    }, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                                          return openBlock(), createBlock(unref(_sfc_main$b), {
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
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  unref(table).getRowModel().rows?.length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(table).getRowModel().rows, (row) => {
                                    return openBlock(), createBlock(unref(_sfc_main$a), {
                                      key: row.id
                                    }, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                                          return openBlock(), createBlock(unref(_sfc_main$d), {
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
                                  }), 128)) : (openBlock(), createBlock(unref(_sfc_main$a), { key: 1 }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$d), {
                                        colspan: columns.length,
                                        class: "h-24 text-center"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Tidak ada data subscriber. ")
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
                        __props.newsletters.last_page > 1 ? (openBlock(), createBlock(_sfc_main$e, {
                          key: 0,
                          data: __props.newsletters,
                          "on-page-change": goToPage,
                          "item-label": "subscriber"
                        }, null, 8, ["data"])) : createCommentVNode("", true)
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
                  columns: 3
                }, null, 8, ["stats"]),
                createVNode(unref(_sfc_main$3), null, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$5), { class: "flex items-center gap-2" }, {
                          default: withCtx(() => [
                            createVNode(unref(Mail), { class: "h-5 w-5" }),
                            createTextVNode(" Newsletter Subscribers ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), { class: "space-y-4" }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$7, {
                          filters: filterConfigs.value,
                          "on-update": handleFilterUpdate
                        }, null, 8, ["filters"]),
                        createVNode("div", { class: "rounded-md border" }, [
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$9), null, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getHeaderGroups(), (headerGroup) => {
                                    return openBlock(), createBlock(unref(_sfc_main$a), {
                                      key: headerGroup.id
                                    }, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                                          return openBlock(), createBlock(unref(_sfc_main$b), {
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
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  unref(table).getRowModel().rows?.length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(table).getRowModel().rows, (row) => {
                                    return openBlock(), createBlock(unref(_sfc_main$a), {
                                      key: row.id
                                    }, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                                          return openBlock(), createBlock(unref(_sfc_main$d), {
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
                                  }), 128)) : (openBlock(), createBlock(unref(_sfc_main$a), { key: 1 }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$d), {
                                        colspan: columns.length,
                                        class: "h-24 text-center"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Tidak ada data subscriber. ")
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
                        __props.newsletters.last_page > 1 ? (openBlock(), createBlock(_sfc_main$e, {
                          key: 0,
                          data: __props.newsletters,
                          "on-page-change": goToPage,
                          "item-label": "subscriber"
                        }, null, 8, ["data"])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Newsletters/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
