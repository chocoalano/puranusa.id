import { defineComponent, ref, computed, h, withCtx, unref, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { router, Head, Link, useForm } from "@inertiajs/vue3";
import { debounce } from "lodash-es";
import { useVueTable, getCoreRowModel, FlexRender } from "@tanstack/vue-table";
import { i as index, _ as _sfc_main$1, c as create, b as show, e as edit, d as destroy } from "./AppLayout-CzI69RVm.js";
import { _ as _sfc_main$2 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$3 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$c } from "./index-BpQimeTM.js";
import { _ as _sfc_main$4, a as _sfc_main$5, b as _sfc_main$6, c as _sfc_main$7, d as _sfc_main$8, e as _sfc_main$9 } from "./TableHeader-emcE6QAC.js";
import { Plus, Search, ArrowUpDown, LogIn, Eye, Pencil, Trash2 } from "lucide-vue-next";
import { _ as _sfc_main$b } from "./ConfirmDialog-CTU0x0KG.js";
import { _ as _sfc_main$a } from "./Pagination-DAUeA01Y.js";
import { toast } from "vue-sonner";
import "class-variance-authority";
import "./DropdownMenuTrigger-B1v6pHML.js";
import "reka-ui";
import "@vueuse/core";
import "./index-Jhngbhhu.js";
import "./AvatarImage-DWFQMckn.js";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
import "clsx";
import "tailwind-merge";
import "./AlertDialogTrigger-DIWb7xue.js";
import "./SelectValue-BUnv4mQg.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    customers: {},
    filters: {}
  },
  setup(__props) {
    const loginAsCustomer = (id, name) => {
      const loginForm = useForm({});
      loginForm.post(`/manage/customers/${id}/login-as`, {
        onSuccess: () => {
          toast.success(`Login sebagai ${name}`);
        },
        onError: () => {
          toast.error("Gagal login sebagai customer");
        }
      });
    };
    const props = __props;
    const search = ref(props.filters.search || "");
    const sortBy = ref(props.filters.sort_by || "created_at");
    const sortOrder = ref(props.filters.sort_order || "desc");
    const perPage = ref(props.filters.per_page || 10);
    const deleteCustomer = (id) => {
      router.delete(destroy.url(id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Pelanggan berhasil dihapus");
        },
        onError: () => {
          toast.error("Gagal menghapus pelanggan");
        }
      });
    };
    const deleteDialog = ref({
      open: false,
      data: null
    });
    const openDeleteDialog = (customer) => {
      deleteDialog.value = {
        open: true,
        data: customer
      };
    };
    const performSearch = debounce(() => {
      router.get(
        index.url(),
        {
          search: search.value,
          sort_by: sortBy.value,
          sort_order: sortOrder.value,
          per_page: perPage.value
        },
        {
          preserveState: true,
          preserveScroll: true
        }
      );
    }, 300);
    const handleSort = (column) => {
      if (sortBy.value === column) {
        sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
      } else {
        sortBy.value = column;
        sortOrder.value = "asc";
      }
      performSearch();
    };
    const handleDelete = () => {
      if (deleteDialog.value.data) {
        deleteCustomer(deleteDialog.value.data.id);
      }
    };
    const columns = [
      {
        id: "index",
        header: () => h("div", { class: "text-left" }, "No"),
        cell: ({ row }) => {
          const indexNum = row.index + 1 + (props.customers.current_page - 1) * props.customers.per_page;
          return h("div", { class: "text-left" }, indexNum.toString());
        }
      },
      {
        accessorKey: "ewallet_id",
        header: () => h(
          _sfc_main$2,
          {
            variant: "ghost",
            onClick: () => handleSort("ewallet_id")
          },
          () => ["Ewallet ID", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
        ),
        cell: ({ row }) => h("div", { class: "font-mono text-sm" }, row.getValue("ewallet_id"))
      },
      {
        accessorKey: "name",
        header: () => h(
          _sfc_main$2,
          {
            variant: "ghost",
            onClick: () => handleSort("name")
          },
          () => ["Nama", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
        ),
        cell: ({ row }) => h("div", {}, row.getValue("name"))
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => h("div", { class: "text-sm" }, row.getValue("email"))
      },
      {
        accessorKey: "phone",
        header: "Telepon",
        cell: ({ row }) => {
          const phone = row.getValue("phone");
          return h("div", { class: "text-sm" }, phone || "-");
        }
      },
      {
        accessorKey: "ewallet_saldo",
        header: () => h("div", { class: "text-right" }, "Saldo"),
        cell: ({ row }) => {
          const saldo = row.getValue("ewallet_saldo");
          return h(
            "div",
            { class: "text-right font-medium" },
            "Rp " + new Intl.NumberFormat("id-ID").format(saldo)
          );
        }
      },
      {
        accessorKey: "position",
        header: "Posisi",
        cell: ({ row }) => {
          const position = row.getValue("position");
          if (!position) return h("div", { class: "text-center" }, "-");
          return h(
            _sfc_main$c,
            {
              variant: position === "left" ? "default" : "secondary",
              class: "capitalize"
            },
            () => position
          );
        }
      },
      {
        accessorKey: "email_verified_at",
        header: "Status",
        cell: ({ row }) => {
          const verified = row.getValue("email_verified_at");
          return h(
            _sfc_main$c,
            {
              variant: verified ? "default" : "outline"
            },
            () => verified ? "Verified" : "Unverified"
          );
        }
      },
      {
        id: "actions",
        header: () => h("div", { class: "text-center" }, "Aksi"),
        cell: ({ row }) => {
          const customer = row.original;
          return h("div", { class: "flex items-center justify-center gap-2" }, [
            h(
              _sfc_main$2,
              {
                variant: "ghost",
                size: "icon",
                onClick: () => loginAsCustomer(customer.id, customer.name),
                title: "Login sebagai customer"
              },
              () => h(LogIn, { class: "h-4 w-4 text-primary" })
            ),
            h(
              Link,
              {
                href: show.url(customer.id)
              },
              () => h(
                _sfc_main$2,
                { variant: "ghost", size: "icon" },
                () => h(Eye, { class: "h-4 w-4" })
              )
            ),
            h(
              Link,
              {
                href: edit.url(customer.id)
              },
              () => h(
                _sfc_main$2,
                { variant: "ghost", size: "icon" },
                () => h(Pencil, { class: "h-4 w-4" })
              )
            ),
            h(
              _sfc_main$2,
              {
                variant: "ghost",
                size: "icon",
                onClick: () => openDeleteDialog(customer)
              },
              () => h(Trash2, { class: "h-4 w-4 text-destructive" })
            )
          ]);
        }
      }
    ];
    const tableData = computed(() => props.customers.data);
    const table = useVueTable({
      get data() {
        return tableData.value;
      },
      columns,
      getCoreRowModel: getCoreRowModel(),
      manualSorting: true,
      manualPagination: true
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Kelola Pelanggan" }, null, _parent2, _scopeId));
            _push2(`<div class="rounded-xl p-4 space-y-6 py-6"${_scopeId}><div class="mb-6 flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="text-3xl font-bold tracking-tight"${_scopeId}>Kelola Pelanggan</h1><p class="text-muted-foreground"${_scopeId}> Kelola data pelanggan dan jaringan MLM </p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(create).url()
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$2), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Plus), { class: "mr-2 h-4 w-4" }, null, _parent4, _scopeId3));
                        _push4(` Tambah Pelanggan `);
                      } else {
                        return [
                          createVNode(unref(Plus), { class: "mr-2 h-4 w-4" }),
                          createTextVNode(" Tambah Pelanggan ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$2), null, {
                      default: withCtx(() => [
                        createVNode(unref(Plus), { class: "mr-2 h-4 w-4" }),
                        createTextVNode(" Tambah Pelanggan ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="mb-4 flex items-center gap-4"${_scopeId}><div class="relative flex-1"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$3), {
              modelValue: search.value,
              "onUpdate:modelValue": ($event) => search.value = $event,
              placeholder: "Cari nama, email, telepon, atau ewallet ID...",
              class: "pl-10",
              onInput: unref(performSearch)
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="rounded-md border"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(unref(table).getHeaderGroups(), (headerGroup) => {
                          _push4(ssrRenderComponent(unref(_sfc_main$6), {
                            key: headerGroup.id
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(headerGroup.headers, (header) => {
                                  _push5(ssrRenderComponent(unref(_sfc_main$7), {
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
                                    return openBlock(), createBlock(unref(_sfc_main$7), {
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
                            return openBlock(), createBlock(unref(_sfc_main$6), {
                              key: headerGroup.id
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                                  return openBlock(), createBlock(unref(_sfc_main$7), {
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
                  _push3(ssrRenderComponent(unref(_sfc_main$8), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (unref(table).getRowModel().rows?.length) {
                          _push4(`<!--[-->`);
                          ssrRenderList(unref(table).getRowModel().rows, (row) => {
                            _push4(ssrRenderComponent(unref(_sfc_main$6), {
                              key: row.id
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<!--[-->`);
                                  ssrRenderList(row.getVisibleCells(), (cell) => {
                                    _push5(ssrRenderComponent(unref(_sfc_main$9), {
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
                                      return openBlock(), createBlock(unref(_sfc_main$9), {
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
                          _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(_sfc_main$9), {
                                  colspan: columns.length,
                                  class: "h-24 text-center"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(` Tidak ada data pelanggan. `);
                                    } else {
                                      return [
                                        createTextVNode(" Tidak ada data pelanggan. ")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(_sfc_main$9), {
                                    colspan: columns.length,
                                    class: "h-24 text-center"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Tidak ada data pelanggan. ")
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
                            return openBlock(), createBlock(unref(_sfc_main$6), {
                              key: row.id
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                                  return openBlock(), createBlock(unref(_sfc_main$9), {
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
                          }), 128)) : (openBlock(), createBlock(unref(_sfc_main$6), { key: 1 }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$9), {
                                colspan: columns.length,
                                class: "h-24 text-center"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Tidak ada data pelanggan. ")
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
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getHeaderGroups(), (headerGroup) => {
                          return openBlock(), createBlock(unref(_sfc_main$6), {
                            key: headerGroup.id
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                                return openBlock(), createBlock(unref(_sfc_main$7), {
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
                    createVNode(unref(_sfc_main$8), null, {
                      default: withCtx(() => [
                        unref(table).getRowModel().rows?.length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(table).getRowModel().rows, (row) => {
                          return openBlock(), createBlock(unref(_sfc_main$6), {
                            key: row.id
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                                return openBlock(), createBlock(unref(_sfc_main$9), {
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
                        }), 128)) : (openBlock(), createBlock(unref(_sfc_main$6), { key: 1 }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$9), {
                              colspan: columns.length,
                              class: "h-24 text-center"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Tidak ada data pelanggan. ")
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
            _push2(ssrRenderComponent(_sfc_main$a, {
              data: __props.customers,
              url: unref(index).url(),
              filters: {
                search: search.value,
                sort_by: sortBy.value,
                sort_order: sortOrder.value,
                per_page: perPage.value
              }
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$b, {
              open: deleteDialog.value.open,
              "onUpdate:open": ($event) => deleteDialog.value.open = $event,
              title: "Hapus Pelanggan?",
              description: `Apakah Anda yakin ingin menghapus pelanggan ${deleteDialog.value.data?.name}? Tindakan ini tidak dapat dibatalkan dan akan menghapus semua data terkait termasuk jaringan dan bonus.`,
              "confirm-text": "Hapus",
              "cancel-text": "Batal",
              variant: "destructive",
              onConfirm: handleDelete
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Head), { title: "Kelola Pelanggan" }),
              createVNode("div", { class: "rounded-xl p-4 space-y-6 py-6" }, [
                createVNode("div", { class: "mb-6 flex items-center justify-between" }, [
                  createVNode("div", null, [
                    createVNode("h1", { class: "text-3xl font-bold tracking-tight" }, "Kelola Pelanggan"),
                    createVNode("p", { class: "text-muted-foreground" }, " Kelola data pelanggan dan jaringan MLM ")
                  ]),
                  createVNode(unref(Link), {
                    href: unref(create).url()
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$2), null, {
                        default: withCtx(() => [
                          createVNode(unref(Plus), { class: "mr-2 h-4 w-4" }),
                          createTextVNode(" Tambah Pelanggan ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["href"])
                ]),
                createVNode("div", { class: "mb-4 flex items-center gap-4" }, [
                  createVNode("div", { class: "relative flex-1" }, [
                    createVNode(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
                    createVNode(unref(_sfc_main$3), {
                      modelValue: search.value,
                      "onUpdate:modelValue": ($event) => search.value = $event,
                      placeholder: "Cari nama, email, telepon, atau ewallet ID...",
                      class: "pl-10",
                      onInput: unref(performSearch)
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "onInput"])
                  ])
                ]),
                createVNode("div", { class: "rounded-md border" }, [
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getHeaderGroups(), (headerGroup) => {
                            return openBlock(), createBlock(unref(_sfc_main$6), {
                              key: headerGroup.id
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                                  return openBlock(), createBlock(unref(_sfc_main$7), {
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
                      createVNode(unref(_sfc_main$8), null, {
                        default: withCtx(() => [
                          unref(table).getRowModel().rows?.length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(table).getRowModel().rows, (row) => {
                            return openBlock(), createBlock(unref(_sfc_main$6), {
                              key: row.id
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                                  return openBlock(), createBlock(unref(_sfc_main$9), {
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
                          }), 128)) : (openBlock(), createBlock(unref(_sfc_main$6), { key: 1 }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$9), {
                                colspan: columns.length,
                                class: "h-24 text-center"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Tidak ada data pelanggan. ")
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
                createVNode(_sfc_main$a, {
                  data: __props.customers,
                  url: unref(index).url(),
                  filters: {
                    search: search.value,
                    sort_by: sortBy.value,
                    sort_order: sortOrder.value,
                    per_page: perPage.value
                  }
                }, null, 8, ["data", "url", "filters"])
              ]),
              createVNode(_sfc_main$b, {
                open: deleteDialog.value.open,
                "onUpdate:open": ($event) => deleteDialog.value.open = $event,
                title: "Hapus Pelanggan?",
                description: `Apakah Anda yakin ingin menghapus pelanggan ${deleteDialog.value.data?.name}? Tindakan ini tidak dapat dibatalkan dan akan menghapus semua data terkait termasuk jaringan dan bonus.`,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Customers/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
