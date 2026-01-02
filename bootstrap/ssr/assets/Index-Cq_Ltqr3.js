import { defineComponent, ref, computed, h, withCtx, unref, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, toDisplayString, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { useForm, router, Head, Link } from "@inertiajs/vue3";
import { debounce } from "lodash-es";
import { useVueTable, getCoreRowModel, FlexRender } from "@tanstack/vue-table";
import { i as index, _ as _sfc_main$1, c as create, t as topUp, b as show, e as edit, d as destroy, l as loginAsCustomer } from "./AppLayout-BqZcCUfR.js";
import { _ as _sfc_main$2 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$3 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$o } from "./index-BpQimeTM.js";
import { _ as _sfc_main$9, a as _sfc_main$a, b as _sfc_main$b, c as _sfc_main$c, d as _sfc_main$d, e as _sfc_main$e } from "./TableHeader-emcE6QAC.js";
import { Plus, Search, Wallet, ArrowUpDown, LogIn, Eye, Pencil, Trash2 } from "lucide-vue-next";
import { _ as _sfc_main$g } from "./ConfirmDialog-CTU0x0KG.js";
import { _ as _sfc_main$f } from "./Pagination-DAUeA01Y.js";
import { _ as _sfc_main$h, a as _sfc_main$i, b as _sfc_main$j, c as _sfc_main$k, d as _sfc_main$l, e as _sfc_main$n } from "./DialogTrigger-DpE8BjOt.js";
import { _ as _sfc_main$m } from "./Label-16aMY2sx.js";
import { _ as _sfc_main$4, a as _sfc_main$5, b as _sfc_main$6, c as _sfc_main$7, d as _sfc_main$8 } from "./SelectValue-BUnv4mQg.js";
import { toast } from "vue-sonner";
import "class-variance-authority";
import "./DropdownMenuTrigger-B1v6pHML.js";
import "reka-ui";
import "@vueuse/core";
import "./index--D7ld9AJ.js";
import "./AvatarImage-DWFQMckn.js";
import "./index-B0NlPG4h.js";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
import "clsx";
import "tailwind-merge";
import "./AlertDialogTrigger-DIWb7xue.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    customers: {},
    filters: {}
  },
  setup(__props) {
    const injectDialog = ref({
      open: false,
      data: null
    });
    const injectForm = useForm({
      amount: "",
      description: ""
    });
    const openInjectDialog = (customer) => {
      injectDialog.value = {
        open: true,
        data: customer
      };
      injectForm.reset();
      injectForm.clearErrors();
      injectForm.amount = "";
      injectForm.description = "";
    };
    const closeInjectDialog = () => {
      injectDialog.value.open = false;
      injectForm.reset();
      injectForm.clearErrors();
    };
    const handleInject = () => {
      if (!injectDialog.value.data) return;
      const amount = Number(injectForm.amount);
      if (!amount || amount < 1e4) {
        toast.error("Jumlah minimal Rp 10.000");
        return;
      }
      injectForm.post(topUp.url(injectDialog.value.data.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Saldo berhasil ditambahkan");
          closeInjectDialog();
        },
        onError: (errors) => {
          if (errors.amount) {
            toast.error(errors.amount);
          } else {
            toast.error("Gagal menambahkan saldo");
          }
        }
      });
    };
    const loginAsCustomer$1 = (id, name) => {
      router.post(loginAsCustomer.url(id), {}, {
        onSuccess: () => {
          toast.success(`Login sebagai ${name}`);
        },
        onError: (errors) => {
          if (errors.message?.includes("419") || errors.message?.includes("expired")) {
            toast.error("Sesi expired, mencoba ulang...");
            window.location.reload();
            return;
          }
          toast.error("Gagal login sebagai customer");
        },
        onFinish: () => {
        }
      });
    };
    const props = __props;
    const search = ref(props.filters.search || "");
    const sortBy = ref(props.filters.sort_by || "created_at");
    const sortOrder = ref(props.filters.sort_order || "desc");
    const perPage = ref(props.filters.per_page || 10);
    const packageFilter = ref(props.filters.package_id || "all");
    const positionFilter = ref(props.filters.position || "all");
    const emailVerifiedFilter = ref(props.filters.email_verified || "all");
    const statusFilter = ref(props.filters.status || "all");
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
          search: search.value || void 0,
          sort_by: sortBy.value,
          sort_order: sortOrder.value,
          per_page: perPage.value,
          package_id: packageFilter.value && packageFilter.value !== "all" ? packageFilter.value : void 0,
          position: positionFilter.value && positionFilter.value !== "all" ? positionFilter.value : void 0,
          email_verified: emailVerifiedFilter.value && emailVerifiedFilter.value !== "all" ? emailVerifiedFilter.value : void 0,
          status: statusFilter.value && statusFilter.value !== "all" ? statusFilter.value : void 0
        },
        {
          preserveState: true,
          preserveScroll: true
        }
      );
    }, 300);
    const handleFilterChange = () => {
      performSearch();
    };
    const clearFilters = () => {
      search.value = "";
      packageFilter.value = "all";
      positionFilter.value = "all";
      emailVerifiedFilter.value = "all";
      statusFilter.value = "all";
      performSearch();
    };
    const hasActiveFilters = computed(() => {
      return search.value || packageFilter.value && packageFilter.value !== "all" || positionFilter.value && positionFilter.value !== "all" || emailVerifiedFilter.value && emailVerifiedFilter.value !== "all" || statusFilter.value && statusFilter.value !== "all";
    });
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
        accessorKey: "username",
        header: () => h(
          _sfc_main$2,
          {
            variant: "ghost",
            onClick: () => handleSort("username")
          },
          () => ["Username", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
        ),
        cell: ({ row }) => {
          const username = row.getValue("username");
          return h("div", { class: "font-mono text-sm" }, username || "-");
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
        accessorKey: "package_name",
        header: "Peringkat",
        cell: ({ row }) => {
          const packageId = row.original.package_id;
          const packageName = row.getValue("package_name");
          const variant = packageId === 3 ? "default" : packageId === 2 ? "secondary" : packageId === 1 ? "outline" : "outline";
          return h(
            _sfc_main$o,
            { variant },
            () => packageName
          );
        }
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
        accessorKey: "sponsor_username",
        header: "Sponsor",
        cell: ({ row }) => {
          const sponsorUsername = row.getValue("sponsor_username");
          return h("div", { class: "text-sm" }, sponsorUsername ? `@${sponsorUsername}` : "-");
        }
      },
      {
        accessorKey: "upline_username",
        header: "Upline",
        cell: ({ row }) => {
          const uplineUsername = row.getValue("upline_username");
          return h("div", { class: "text-sm" }, uplineUsername ? `@${uplineUsername}` : "-");
        }
      },
      {
        accessorKey: "position",
        header: "Posisi",
        cell: ({ row }) => {
          const position = row.getValue("position");
          if (!position) return h("div", { class: "text-center" }, "-");
          return h(
            _sfc_main$o,
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
            _sfc_main$o,
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
          const actions = [
            h(
              _sfc_main$2,
              {
                variant: "ghost",
                size: "icon",
                onClick: () => openInjectDialog(customer),
                title: "Inject Ewallet"
              },
              () => h(Wallet, { class: "h-4 w-4 text-green-600" })
            ),
            h(
              _sfc_main$2,
              {
                variant: "ghost",
                size: "icon",
                onClick: () => loginAsCustomer$1(customer.id, customer.name),
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
            )
          ];
          if (customer.status !== 2 && customer.status !== 3) {
            actions.push(
              h(
                _sfc_main$2,
                {
                  variant: "ghost",
                  size: "icon",
                  onClick: () => openDeleteDialog(customer)
                },
                () => h(Trash2, { class: "h-4 w-4 text-destructive" })
              )
            );
          }
          return h("div", { class: "flex items-center justify-center gap-2" }, actions);
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
            _push2(`</div><div class="mb-4 space-y-4"${_scopeId}><div class="flex items-center gap-4"${_scopeId}><div class="relative flex-1"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$3), {
              modelValue: search.value,
              "onUpdate:modelValue": ($event) => search.value = $event,
              placeholder: "Cari nama, email, telepon, atau ewallet ID...",
              class: "pl-10",
              onInput: unref(performSearch)
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            if (hasActiveFilters.value) {
              _push2(ssrRenderComponent(unref(_sfc_main$2), {
                variant: "outline",
                size: "sm",
                onClick: clearFilters
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Reset Filter `);
                  } else {
                    return [
                      createTextVNode(" Reset Filter ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex flex-wrap items-center gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$4), {
              modelValue: packageFilter.value,
              "onUpdate:modelValue": [($event) => packageFilter.value = $event, handleFilterChange]
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$5), { class: "w-[180px]" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$6), { placeholder: "Semua Peringkat" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$6), { placeholder: "Semua Peringkat" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { value: "all" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Semua Peringkat`);
                            } else {
                              return [
                                createTextVNode("Semua Peringkat")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { value: "null" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Tidak ada paket`);
                            } else {
                              return [
                                createTextVNode("Tidak ada paket")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { value: "1" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`ZENNER Plus`);
                            } else {
                              return [
                                createTextVNode("ZENNER Plus")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { value: "2" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`ZENNER Prime`);
                            } else {
                              return [
                                createTextVNode("ZENNER Prime")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { value: "3" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`ZENNER Ultra`);
                            } else {
                              return [
                                createTextVNode("ZENNER Ultra")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$8), { value: "all" }, {
                            default: withCtx(() => [
                              createTextVNode("Semua Peringkat")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$8), { value: "null" }, {
                            default: withCtx(() => [
                              createTextVNode("Tidak ada paket")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$8), { value: "1" }, {
                            default: withCtx(() => [
                              createTextVNode("ZENNER Plus")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$8), { value: "2" }, {
                            default: withCtx(() => [
                              createTextVNode("ZENNER Prime")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$8), { value: "3" }, {
                            default: withCtx(() => [
                              createTextVNode("ZENNER Ultra")
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
                    createVNode(unref(_sfc_main$5), { class: "w-[180px]" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$6), { placeholder: "Semua Peringkat" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$8), { value: "all" }, {
                          default: withCtx(() => [
                            createTextVNode("Semua Peringkat")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), { value: "null" }, {
                          default: withCtx(() => [
                            createTextVNode("Tidak ada paket")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), { value: "1" }, {
                          default: withCtx(() => [
                            createTextVNode("ZENNER Plus")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), { value: "2" }, {
                          default: withCtx(() => [
                            createTextVNode("ZENNER Prime")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), { value: "3" }, {
                          default: withCtx(() => [
                            createTextVNode("ZENNER Ultra")
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
            _push2(ssrRenderComponent(unref(_sfc_main$4), {
              modelValue: positionFilter.value,
              "onUpdate:modelValue": [($event) => positionFilter.value = $event, handleFilterChange]
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$5), { class: "w-[150px]" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$6), { placeholder: "Semua Posisi" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$6), { placeholder: "Semua Posisi" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { value: "all" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Semua Posisi`);
                            } else {
                              return [
                                createTextVNode("Semua Posisi")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { value: "left" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Left`);
                            } else {
                              return [
                                createTextVNode("Left")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { value: "right" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Right`);
                            } else {
                              return [
                                createTextVNode("Right")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$8), { value: "all" }, {
                            default: withCtx(() => [
                              createTextVNode("Semua Posisi")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$8), { value: "left" }, {
                            default: withCtx(() => [
                              createTextVNode("Left")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$8), { value: "right" }, {
                            default: withCtx(() => [
                              createTextVNode("Right")
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
                    createVNode(unref(_sfc_main$5), { class: "w-[150px]" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$6), { placeholder: "Semua Posisi" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$8), { value: "all" }, {
                          default: withCtx(() => [
                            createTextVNode("Semua Posisi")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), { value: "left" }, {
                          default: withCtx(() => [
                            createTextVNode("Left")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), { value: "right" }, {
                          default: withCtx(() => [
                            createTextVNode("Right")
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
            _push2(ssrRenderComponent(unref(_sfc_main$4), {
              modelValue: emailVerifiedFilter.value,
              "onUpdate:modelValue": [($event) => emailVerifiedFilter.value = $event, handleFilterChange]
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$5), { class: "w-[160px]" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$6), { placeholder: "Semua Verifikasi" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$6), { placeholder: "Semua Verifikasi" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { value: "all" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Semua Verifikasi`);
                            } else {
                              return [
                                createTextVNode("Semua Verifikasi")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { value: "1" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Verified`);
                            } else {
                              return [
                                createTextVNode("Verified")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { value: "0" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Unverified`);
                            } else {
                              return [
                                createTextVNode("Unverified")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$8), { value: "all" }, {
                            default: withCtx(() => [
                              createTextVNode("Semua Verifikasi")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$8), { value: "1" }, {
                            default: withCtx(() => [
                              createTextVNode("Verified")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$8), { value: "0" }, {
                            default: withCtx(() => [
                              createTextVNode("Unverified")
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
                    createVNode(unref(_sfc_main$5), { class: "w-[160px]" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$6), { placeholder: "Semua Verifikasi" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$8), { value: "all" }, {
                          default: withCtx(() => [
                            createTextVNode("Semua Verifikasi")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), { value: "1" }, {
                          default: withCtx(() => [
                            createTextVNode("Verified")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), { value: "0" }, {
                          default: withCtx(() => [
                            createTextVNode("Unverified")
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
            _push2(ssrRenderComponent(unref(_sfc_main$4), {
              modelValue: statusFilter.value,
              "onUpdate:modelValue": [($event) => statusFilter.value = $event, handleFilterChange]
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$5), { class: "w-[150px]" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$6), { placeholder: "Semua Status" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$6), { placeholder: "Semua Status" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { value: "all" }, {
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
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { value: "1" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Prospek`);
                            } else {
                              return [
                                createTextVNode("Prospek")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { value: "2" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Pasif`);
                            } else {
                              return [
                                createTextVNode("Pasif")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { value: "3" }, {
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
                      } else {
                        return [
                          createVNode(unref(_sfc_main$8), { value: "all" }, {
                            default: withCtx(() => [
                              createTextVNode("Semua Status")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$8), { value: "1" }, {
                            default: withCtx(() => [
                              createTextVNode("Prospek")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$8), { value: "2" }, {
                            default: withCtx(() => [
                              createTextVNode("Pasif")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$8), { value: "3" }, {
                            default: withCtx(() => [
                              createTextVNode("Aktif")
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
                    createVNode(unref(_sfc_main$5), { class: "w-[150px]" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$6), { placeholder: "Semua Status" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$8), { value: "all" }, {
                          default: withCtx(() => [
                            createTextVNode("Semua Status")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), { value: "1" }, {
                          default: withCtx(() => [
                            createTextVNode("Prospek")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), { value: "2" }, {
                          default: withCtx(() => [
                            createTextVNode("Pasif")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), { value: "3" }, {
                          default: withCtx(() => [
                            createTextVNode("Aktif")
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
            _push2(ssrRenderComponent(unref(_sfc_main$9), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$a), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(unref(table).getHeaderGroups(), (headerGroup) => {
                          _push4(ssrRenderComponent(unref(_sfc_main$b), {
                            key: headerGroup.id
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(headerGroup.headers, (header) => {
                                  _push5(ssrRenderComponent(unref(_sfc_main$c), {
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
                                    return openBlock(), createBlock(unref(_sfc_main$c), {
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
                            return openBlock(), createBlock(unref(_sfc_main$b), {
                              key: headerGroup.id
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                                  return openBlock(), createBlock(unref(_sfc_main$c), {
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
                  _push3(ssrRenderComponent(unref(_sfc_main$d), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (unref(table).getRowModel().rows?.length) {
                          _push4(`<!--[-->`);
                          ssrRenderList(unref(table).getRowModel().rows, (row) => {
                            _push4(ssrRenderComponent(unref(_sfc_main$b), {
                              key: row.id
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<!--[-->`);
                                  ssrRenderList(row.getVisibleCells(), (cell) => {
                                    _push5(ssrRenderComponent(unref(_sfc_main$e), {
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
                            }, _parent4, _scopeId3));
                          });
                          _push4(`<!--]-->`);
                        } else {
                          _push4(ssrRenderComponent(unref(_sfc_main$b), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(_sfc_main$e), {
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
                                  createVNode(unref(_sfc_main$e), {
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
                            return openBlock(), createBlock(unref(_sfc_main$b), {
                              key: row.id
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
                            }, 1024);
                          }), 128)) : (openBlock(), createBlock(unref(_sfc_main$b), { key: 1 }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$e), {
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
                    createVNode(unref(_sfc_main$d), null, {
                      default: withCtx(() => [
                        unref(table).getRowModel().rows?.length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(table).getRowModel().rows, (row) => {
                          return openBlock(), createBlock(unref(_sfc_main$b), {
                            key: row.id
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
                          }, 1024);
                        }), 128)) : (openBlock(), createBlock(unref(_sfc_main$b), { key: 1 }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$e), {
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
            _push2(ssrRenderComponent(_sfc_main$f, {
              data: __props.customers,
              url: unref(index).url(),
              filters: {
                search: search.value || void 0,
                sort_by: sortBy.value,
                sort_order: sortOrder.value,
                per_page: perPage.value,
                package_id: packageFilter.value && packageFilter.value !== "all" ? packageFilter.value : void 0,
                position: positionFilter.value && positionFilter.value !== "all" ? positionFilter.value : void 0,
                email_verified: emailVerifiedFilter.value && emailVerifiedFilter.value !== "all" ? emailVerifiedFilter.value : void 0,
                status: statusFilter.value && statusFilter.value !== "all" ? statusFilter.value : void 0
              }
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$g, {
              open: deleteDialog.value.open,
              "onUpdate:open": ($event) => deleteDialog.value.open = $event,
              title: "Hapus Pelanggan?",
              description: `Apakah Anda yakin ingin menghapus pelanggan ${deleteDialog.value.data?.name}? Tindakan ini tidak dapat dibatalkan dan akan menghapus semua data terkait termasuk jaringan dan bonus.`,
              "confirm-text": "Hapus",
              "cancel-text": "Batal",
              variant: "destructive",
              onConfirm: handleDelete
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$h), {
              open: injectDialog.value.open,
              "onUpdate:open": (val) => !val && closeInjectDialog()
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$i), { class: "sm:max-w-md" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$j), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$k), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Inject Ewallet`);
                                  } else {
                                    return [
                                      createTextVNode("Inject Ewallet")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$l), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Tambahkan saldo ke ewallet ${ssrInterpolate(injectDialog.value.data?.name)} (${ssrInterpolate(injectDialog.value.data?.ewallet_id)}) `);
                                  } else {
                                    return [
                                      createTextVNode(" Tambahkan saldo ke ewallet " + toDisplayString(injectDialog.value.data?.name) + " (" + toDisplayString(injectDialog.value.data?.ewallet_id) + ") ", 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$k), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Inject Ewallet")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$l), null, {
                                  default: withCtx(() => [
                                    createTextVNode(" Tambahkan saldo ke ewallet " + toDisplayString(injectDialog.value.data?.name) + " (" + toDisplayString(injectDialog.value.data?.ewallet_id) + ") ", 1)
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<form class="space-y-4"${_scopeId3}><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$m), { for: "amount" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Jumlah (Rp)`);
                            } else {
                              return [
                                createTextVNode("Jumlah (Rp)")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$3), {
                          id: "amount",
                          modelValue: unref(injectForm).amount,
                          "onUpdate:modelValue": ($event) => unref(injectForm).amount = $event,
                          modelModifiers: { number: true },
                          type: "number",
                          min: "10000",
                          step: "1000",
                          placeholder: "Minimal Rp 10.000",
                          required: ""
                        }, null, _parent4, _scopeId3));
                        if (unref(injectForm).errors.amount) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(injectForm).errors.amount)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$m), { for: "description" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Keterangan (Opsional)`);
                            } else {
                              return [
                                createTextVNode("Keterangan (Opsional)")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$3), {
                          id: "description",
                          modelValue: unref(injectForm).description,
                          "onUpdate:modelValue": ($event) => unref(injectForm).description = $event,
                          type: "text",
                          placeholder: "Contoh: Top up manual oleh admin"
                        }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$n), { class: "gap-2 sm:gap-0" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$2), {
                                type: "button",
                                variant: "outline",
                                disabled: unref(injectForm).processing,
                                onClick: closeInjectDialog
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Batal `);
                                  } else {
                                    return [
                                      createTextVNode(" Batal ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$2), {
                                type: "submit",
                                disabled: unref(injectForm).processing || !unref(injectForm).amount || Number(unref(injectForm).amount) < 1e4
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(Wallet), { class: "mr-2 h-4 w-4" }, null, _parent6, _scopeId5));
                                    _push6(` ${ssrInterpolate(unref(injectForm).processing ? "Memproses..." : "Tambahkan Saldo")}`);
                                  } else {
                                    return [
                                      createVNode(unref(Wallet), { class: "mr-2 h-4 w-4" }),
                                      createTextVNode(" " + toDisplayString(unref(injectForm).processing ? "Memproses..." : "Tambahkan Saldo"), 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$2), {
                                  type: "button",
                                  variant: "outline",
                                  disabled: unref(injectForm).processing,
                                  onClick: closeInjectDialog
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Batal ")
                                  ]),
                                  _: 1
                                }, 8, ["disabled"]),
                                createVNode(unref(_sfc_main$2), {
                                  type: "submit",
                                  disabled: unref(injectForm).processing || !unref(injectForm).amount || Number(unref(injectForm).amount) < 1e4
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Wallet), { class: "mr-2 h-4 w-4" }),
                                    createTextVNode(" " + toDisplayString(unref(injectForm).processing ? "Memproses..." : "Tambahkan Saldo"), 1)
                                  ]),
                                  _: 1
                                }, 8, ["disabled"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</form>`);
                      } else {
                        return [
                          createVNode(unref(_sfc_main$j), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$k), null, {
                                default: withCtx(() => [
                                  createTextVNode("Inject Ewallet")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$l), null, {
                                default: withCtx(() => [
                                  createTextVNode(" Tambahkan saldo ke ewallet " + toDisplayString(injectDialog.value.data?.name) + " (" + toDisplayString(injectDialog.value.data?.ewallet_id) + ") ", 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode("form", {
                            onSubmit: withModifiers(handleInject, ["prevent"]),
                            class: "space-y-4"
                          }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$m), { for: "amount" }, {
                                default: withCtx(() => [
                                  createTextVNode("Jumlah (Rp)")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$3), {
                                id: "amount",
                                modelValue: unref(injectForm).amount,
                                "onUpdate:modelValue": ($event) => unref(injectForm).amount = $event,
                                modelModifiers: { number: true },
                                type: "number",
                                min: "10000",
                                step: "1000",
                                placeholder: "Minimal Rp 10.000",
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              unref(injectForm).errors.amount ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(injectForm).errors.amount), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$m), { for: "description" }, {
                                default: withCtx(() => [
                                  createTextVNode("Keterangan (Opsional)")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$3), {
                                id: "description",
                                modelValue: unref(injectForm).description,
                                "onUpdate:modelValue": ($event) => unref(injectForm).description = $event,
                                type: "text",
                                placeholder: "Contoh: Top up manual oleh admin"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode(unref(_sfc_main$n), { class: "gap-2 sm:gap-0" }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$2), {
                                  type: "button",
                                  variant: "outline",
                                  disabled: unref(injectForm).processing,
                                  onClick: closeInjectDialog
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Batal ")
                                  ]),
                                  _: 1
                                }, 8, ["disabled"]),
                                createVNode(unref(_sfc_main$2), {
                                  type: "submit",
                                  disabled: unref(injectForm).processing || !unref(injectForm).amount || Number(unref(injectForm).amount) < 1e4
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Wallet), { class: "mr-2 h-4 w-4" }),
                                    createTextVNode(" " + toDisplayString(unref(injectForm).processing ? "Memproses..." : "Tambahkan Saldo"), 1)
                                  ]),
                                  _: 1
                                }, 8, ["disabled"])
                              ]),
                              _: 1
                            })
                          ], 32)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$i), { class: "sm:max-w-md" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$j), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$k), null, {
                              default: withCtx(() => [
                                createTextVNode("Inject Ewallet")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$l), null, {
                              default: withCtx(() => [
                                createTextVNode(" Tambahkan saldo ke ewallet " + toDisplayString(injectDialog.value.data?.name) + " (" + toDisplayString(injectDialog.value.data?.ewallet_id) + ") ", 1)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode("form", {
                          onSubmit: withModifiers(handleInject, ["prevent"]),
                          class: "space-y-4"
                        }, [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$m), { for: "amount" }, {
                              default: withCtx(() => [
                                createTextVNode("Jumlah (Rp)")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$3), {
                              id: "amount",
                              modelValue: unref(injectForm).amount,
                              "onUpdate:modelValue": ($event) => unref(injectForm).amount = $event,
                              modelModifiers: { number: true },
                              type: "number",
                              min: "10000",
                              step: "1000",
                              placeholder: "Minimal Rp 10.000",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            unref(injectForm).errors.amount ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(injectForm).errors.amount), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$m), { for: "description" }, {
                              default: withCtx(() => [
                                createTextVNode("Keterangan (Opsional)")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$3), {
                              id: "description",
                              modelValue: unref(injectForm).description,
                              "onUpdate:modelValue": ($event) => unref(injectForm).description = $event,
                              type: "text",
                              placeholder: "Contoh: Top up manual oleh admin"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode(unref(_sfc_main$n), { class: "gap-2 sm:gap-0" }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$2), {
                                type: "button",
                                variant: "outline",
                                disabled: unref(injectForm).processing,
                                onClick: closeInjectDialog
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Batal ")
                                ]),
                                _: 1
                              }, 8, ["disabled"]),
                              createVNode(unref(_sfc_main$2), {
                                type: "submit",
                                disabled: unref(injectForm).processing || !unref(injectForm).amount || Number(unref(injectForm).amount) < 1e4
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Wallet), { class: "mr-2 h-4 w-4" }),
                                  createTextVNode(" " + toDisplayString(unref(injectForm).processing ? "Memproses..." : "Tambahkan Saldo"), 1)
                                ]),
                                _: 1
                              }, 8, ["disabled"])
                            ]),
                            _: 1
                          })
                        ], 32)
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
                createVNode("div", { class: "mb-4 space-y-4" }, [
                  createVNode("div", { class: "flex items-center gap-4" }, [
                    createVNode("div", { class: "relative flex-1" }, [
                      createVNode(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
                      createVNode(unref(_sfc_main$3), {
                        modelValue: search.value,
                        "onUpdate:modelValue": ($event) => search.value = $event,
                        placeholder: "Cari nama, email, telepon, atau ewallet ID...",
                        class: "pl-10",
                        onInput: unref(performSearch)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onInput"])
                    ]),
                    hasActiveFilters.value ? (openBlock(), createBlock(unref(_sfc_main$2), {
                      key: 0,
                      variant: "outline",
                      size: "sm",
                      onClick: clearFilters
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Reset Filter ")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "flex flex-wrap items-center gap-4" }, [
                    createVNode(unref(_sfc_main$4), {
                      modelValue: packageFilter.value,
                      "onUpdate:modelValue": [($event) => packageFilter.value = $event, handleFilterChange]
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$5), { class: "w-[180px]" }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$6), { placeholder: "Semua Peringkat" })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$7), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$8), { value: "all" }, {
                              default: withCtx(() => [
                                createTextVNode("Semua Peringkat")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$8), { value: "null" }, {
                              default: withCtx(() => [
                                createTextVNode("Tidak ada paket")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$8), { value: "1" }, {
                              default: withCtx(() => [
                                createTextVNode("ZENNER Plus")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$8), { value: "2" }, {
                              default: withCtx(() => [
                                createTextVNode("ZENNER Prime")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$8), { value: "3" }, {
                              default: withCtx(() => [
                                createTextVNode("ZENNER Ultra")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(unref(_sfc_main$4), {
                      modelValue: positionFilter.value,
                      "onUpdate:modelValue": [($event) => positionFilter.value = $event, handleFilterChange]
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$5), { class: "w-[150px]" }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$6), { placeholder: "Semua Posisi" })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$7), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$8), { value: "all" }, {
                              default: withCtx(() => [
                                createTextVNode("Semua Posisi")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$8), { value: "left" }, {
                              default: withCtx(() => [
                                createTextVNode("Left")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$8), { value: "right" }, {
                              default: withCtx(() => [
                                createTextVNode("Right")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(unref(_sfc_main$4), {
                      modelValue: emailVerifiedFilter.value,
                      "onUpdate:modelValue": [($event) => emailVerifiedFilter.value = $event, handleFilterChange]
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$5), { class: "w-[160px]" }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$6), { placeholder: "Semua Verifikasi" })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$7), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$8), { value: "all" }, {
                              default: withCtx(() => [
                                createTextVNode("Semua Verifikasi")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$8), { value: "1" }, {
                              default: withCtx(() => [
                                createTextVNode("Verified")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$8), { value: "0" }, {
                              default: withCtx(() => [
                                createTextVNode("Unverified")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(unref(_sfc_main$4), {
                      modelValue: statusFilter.value,
                      "onUpdate:modelValue": [($event) => statusFilter.value = $event, handleFilterChange]
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$5), { class: "w-[150px]" }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$6), { placeholder: "Semua Status" })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$7), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$8), { value: "all" }, {
                              default: withCtx(() => [
                                createTextVNode("Semua Status")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$8), { value: "1" }, {
                              default: withCtx(() => [
                                createTextVNode("Prospek")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$8), { value: "2" }, {
                              default: withCtx(() => [
                                createTextVNode("Pasif")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$8), { value: "3" }, {
                              default: withCtx(() => [
                                createTextVNode("Aktif")
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
                      createVNode(unref(_sfc_main$d), null, {
                        default: withCtx(() => [
                          unref(table).getRowModel().rows?.length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(table).getRowModel().rows, (row) => {
                            return openBlock(), createBlock(unref(_sfc_main$b), {
                              key: row.id
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
                            }, 1024);
                          }), 128)) : (openBlock(), createBlock(unref(_sfc_main$b), { key: 1 }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$e), {
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
                createVNode(_sfc_main$f, {
                  data: __props.customers,
                  url: unref(index).url(),
                  filters: {
                    search: search.value || void 0,
                    sort_by: sortBy.value,
                    sort_order: sortOrder.value,
                    per_page: perPage.value,
                    package_id: packageFilter.value && packageFilter.value !== "all" ? packageFilter.value : void 0,
                    position: positionFilter.value && positionFilter.value !== "all" ? positionFilter.value : void 0,
                    email_verified: emailVerifiedFilter.value && emailVerifiedFilter.value !== "all" ? emailVerifiedFilter.value : void 0,
                    status: statusFilter.value && statusFilter.value !== "all" ? statusFilter.value : void 0
                  }
                }, null, 8, ["data", "url", "filters"])
              ]),
              createVNode(_sfc_main$g, {
                open: deleteDialog.value.open,
                "onUpdate:open": ($event) => deleteDialog.value.open = $event,
                title: "Hapus Pelanggan?",
                description: `Apakah Anda yakin ingin menghapus pelanggan ${deleteDialog.value.data?.name}? Tindakan ini tidak dapat dibatalkan dan akan menghapus semua data terkait termasuk jaringan dan bonus.`,
                "confirm-text": "Hapus",
                "cancel-text": "Batal",
                variant: "destructive",
                onConfirm: handleDelete
              }, null, 8, ["open", "onUpdate:open", "description"]),
              createVNode(unref(_sfc_main$h), {
                open: injectDialog.value.open,
                "onUpdate:open": (val) => !val && closeInjectDialog()
              }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$i), { class: "sm:max-w-md" }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$j), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$k), null, {
                            default: withCtx(() => [
                              createTextVNode("Inject Ewallet")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$l), null, {
                            default: withCtx(() => [
                              createTextVNode(" Tambahkan saldo ke ewallet " + toDisplayString(injectDialog.value.data?.name) + " (" + toDisplayString(injectDialog.value.data?.ewallet_id) + ") ", 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode("form", {
                        onSubmit: withModifiers(handleInject, ["prevent"]),
                        class: "space-y-4"
                      }, [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$m), { for: "amount" }, {
                            default: withCtx(() => [
                              createTextVNode("Jumlah (Rp)")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$3), {
                            id: "amount",
                            modelValue: unref(injectForm).amount,
                            "onUpdate:modelValue": ($event) => unref(injectForm).amount = $event,
                            modelModifiers: { number: true },
                            type: "number",
                            min: "10000",
                            step: "1000",
                            placeholder: "Minimal Rp 10.000",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          unref(injectForm).errors.amount ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive"
                          }, toDisplayString(unref(injectForm).errors.amount), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$m), { for: "description" }, {
                            default: withCtx(() => [
                              createTextVNode("Keterangan (Opsional)")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$3), {
                            id: "description",
                            modelValue: unref(injectForm).description,
                            "onUpdate:modelValue": ($event) => unref(injectForm).description = $event,
                            type: "text",
                            placeholder: "Contoh: Top up manual oleh admin"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode(unref(_sfc_main$n), { class: "gap-2 sm:gap-0" }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$2), {
                              type: "button",
                              variant: "outline",
                              disabled: unref(injectForm).processing,
                              onClick: closeInjectDialog
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Batal ")
                              ]),
                              _: 1
                            }, 8, ["disabled"]),
                            createVNode(unref(_sfc_main$2), {
                              type: "submit",
                              disabled: unref(injectForm).processing || !unref(injectForm).amount || Number(unref(injectForm).amount) < 1e4
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Wallet), { class: "mr-2 h-4 w-4" }),
                                createTextVNode(" " + toDisplayString(unref(injectForm).processing ? "Memproses..." : "Tambahkan Saldo"), 1)
                              ]),
                              _: 1
                            }, 8, ["disabled"])
                          ]),
                          _: 1
                        })
                      ], 32)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["open", "onUpdate:open"])
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
