import { ref, defineComponent, computed, h, watch, unref, withCtx, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, toDisplayString, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { U as UserController, _ as _sfc_main$8 } from "./AppLayout-1TXr_jx9.js";
import { _ as _sfc_main$i } from "./ConfirmDialog-CTU0x0KG.js";
import { _ as _sfc_main$h } from "./Pagination-DAUeA01Y.js";
import { _ as _sfc_main$k } from "./index-BpQimeTM.js";
import { v as valueUpdater, _ as _sfc_main$3 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$j } from "./Checkbox-CIOQa2-J.js";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$4, f as _sfc_main$5, c as _sfc_main$6, g as _sfc_main$7, d as _sfc_main$a } from "./DropdownMenuTrigger-B1v6pHML.js";
import { _ as _sfc_main$9 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$b, a as _sfc_main$c, b as _sfc_main$d, c as _sfc_main$e, d as _sfc_main$f, e as _sfc_main$g } from "./TableHeader-emcE6QAC.js";
import { router, Link, Head } from "@inertiajs/vue3";
import { toast } from "vue-sonner";
import { useVueTable, getFilteredRowModel, getSortedRowModel, getCoreRowModel, FlexRender } from "@tanstack/vue-table";
import { createReusableTemplate } from "@vueuse/core";
import { MoreHorizontal, Copy, Edit, Trash2, Plus, Search, ChevronDown, ArrowUpDown, CheckCircle, XCircle } from "lucide-vue-next";
import { u as usePermissions } from "./usePermissions-DYRibCI0.js";
import "class-variance-authority";
import "reka-ui";
import "./index--D7ld9AJ.js";
import "./AvatarImage-DWFQMckn.js";
import "./index-BsP5JKUP.js";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
import "./AlertDialogTrigger-DIWb7xue.js";
import "./SelectValue-BUnv4mQg.js";
import "clsx";
import "tailwind-merge";
function useUserActions() {
  const processing = ref(false);
  const deleteUser = async (userId) => {
    return new Promise((resolve, reject) => {
      processing.value = true;
      router.delete(`/manage/users/${userId}`, {
        preserveScroll: true,
        onSuccess: () => {
          processing.value = false;
          toast.success("Berhasil", {
            description: "Pengguna berhasil dihapus"
          });
          resolve();
        },
        onError: () => {
          processing.value = false;
          toast.error("Gagal", {
            description: "Terjadi kesalahan saat menghapus pengguna"
          });
          reject();
        }
      });
    });
  };
  const bulkDelete = async (userIds) => {
    processing.value = true;
    let successCount = 0;
    let failCount = 0;
    for (const id of userIds) {
      try {
        await new Promise((resolve, reject) => {
          router.delete(`/manage/users/${id}`, {
            preserveScroll: true,
            onSuccess: () => {
              successCount++;
              resolve();
            },
            onError: () => {
              failCount++;
              reject();
            }
          });
        });
      } catch {
      }
    }
    processing.value = false;
    if (successCount > 0) {
      toast.success("Berhasil", {
        description: `${successCount} pengguna berhasil dihapus`
      });
      router.reload({ only: ["users"] });
    }
    if (failCount > 0) {
      toast.error("Gagal", {
        description: `${failCount} pengguna gagal dihapus`
      });
    }
  };
  const copyToClipboard = async (users) => {
    const formatDate = (date) => {
      if (!date) return "-";
      return new Date(date).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    };
    const data = users.map((user) => ({
      Name: user.name,
      Email: user.email,
      Status: user.email_verified_at ? "Verified" : "Unverified",
      Created: formatDate(user.created_at)
    }));
    const csv = [
      Object.keys(data[0]).join("	"),
      ...data.map((row) => Object.values(row).join("	"))
    ].join("\n");
    try {
      await navigator.clipboard.writeText(csv);
      toast.success("Berhasil", {
        description: `Data ${users.length} pengguna berhasil disalin ke clipboard`
      });
    } catch {
      toast.error("Gagal", {
        description: "Gagal menyalin data ke clipboard"
      });
    }
  };
  return {
    processing,
    deleteUser,
    bulkDelete,
    copyToClipboard
  };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    users: {},
    filters: {}
  },
  setup(__props) {
    const props = __props;
    const breadcrumbItems = [
      {
        title: "User Management",
        href: UserController.index.url()
      }
    ];
    const search = ref(props.filters.search || "");
    const sorting = ref([
      {
        id: props.filters.sort_by,
        desc: props.filters.sort_order === "desc"
      }
    ]);
    const columnFilters = ref([]);
    const columnVisibility = ref({});
    const rowSelection = ref({});
    const [DefineActionsTemplate, ReuseActionsTemplate] = createReusableTemplate();
    const { deleteUser, bulkDelete, copyToClipboard } = useUserActions();
    const deleteDialog = ref({
      open: false,
      user: null
    });
    const bulkDeleteDialog = ref({ open: false });
    const bulkCopyDialog = ref({ open: false });
    const selectedUsers = computed(() => {
      return Object.keys(rowSelection.value).map((key) => props.users.data[parseInt(key)]).filter(Boolean);
    });
    const selectedCount = computed(() => Object.keys(rowSelection.value).length);
    const formatDate = (date) => {
      if (!date) return "-";
      return new Date(date).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    };
    const openDeleteDialog = (user) => {
      deleteDialog.value = { open: true, user };
    };
    const handleDelete = async () => {
      if (!deleteDialog.value.user) return;
      await deleteUser(deleteDialog.value.user.id);
      rowSelection.value = {};
      deleteDialog.value = { open: false, user: null };
    };
    const openBulkDeleteDialog = () => {
      if (!selectedUsers.value.length) return;
      bulkDeleteDialog.value.open = true;
    };
    const handleBulkDelete = async () => {
      const userIds = selectedUsers.value.map((user) => user.id);
      await bulkDelete(userIds);
      rowSelection.value = {};
      bulkDeleteDialog.value.open = false;
    };
    const openBulkCopyDialog = () => {
      if (!selectedUsers.value.length) return;
      bulkCopyDialog.value.open = true;
    };
    const handleCopyData = async () => {
      await copyToClipboard(selectedUsers.value);
      bulkCopyDialog.value.open = false;
    };
    const { isSuperAdmin } = usePermissions();
    const columns = [
      {
        id: "select",
        header: ({ table: table2 }) => h(_sfc_main$j, {
          modelValue: table2.getIsAllPageRowsSelected() || table2.getIsSomePageRowsSelected() && "indeterminate",
          "onUpdate:modelValue": (value) => table2.toggleAllPageRowsSelected(!!value),
          ariaLabel: "Select all"
        }),
        cell: ({ row }) => h(_sfc_main$j, {
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
        cell: ({ row }) => {
          const index = row.index + 1 + (props.users.current_page - 1) * props.users.per_page;
          return h("div", { class: "font-medium" }, index);
        }
      },
      {
        accessorKey: "name",
        header: ({ column }) => {
          return h(
            _sfc_main$3,
            {
              variant: "ghost",
              onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
              class: "-ml-4"
            },
            () => ["Name", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
          );
        },
        cell: ({ row }) => {
          return h("div", { class: "font-medium" }, row.getValue("name"));
        }
      },
      {
        accessorKey: "email",
        header: ({ column }) => {
          return h(
            _sfc_main$3,
            {
              variant: "ghost",
              onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
              class: "-ml-4"
            },
            () => ["Email", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
          );
        },
        cell: ({ row }) => {
          return h("div", { class: "lowercase" }, row.getValue("email"));
        }
      },
      {
        accessorKey: "email_verified_at",
        header: "Status",
        cell: ({ row }) => {
          const verified = row.getValue("email_verified_at");
          return h(
            _sfc_main$k,
            {
              variant: verified ? "default" : "secondary",
              class: "gap-1 capitalize"
            },
            () => [
              h(verified ? CheckCircle : XCircle, { class: "h-3 w-3" }),
              verified ? "Verified" : "Unverified"
            ]
          );
        }
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
          const role = row.getValue("role");
          return h(
            _sfc_main$k,
            {
              variant: role === "superadmin" ? "default" : "secondary",
              class: "gap-1 capitalize"
            },
            () => [
              h(role === "superadmin" ? CheckCircle : XCircle, { class: "h-3 w-3" }),
              role === "superadmin" ? "Super Admin" : "Admin"
            ]
          );
        }
      },
      {
        accessorKey: "created_at",
        header: ({ column }) => {
          return h(
            _sfc_main$3,
            {
              variant: "ghost",
              onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
              class: "-ml-4"
            },
            () => ["Created At", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
          );
        },
        cell: ({ row }) => {
          return formatDate(row.getValue("created_at"));
        }
      },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const user = row.original;
          return h(ReuseActionsTemplate, {
            user,
            onDelete: () => openDeleteDialog(user)
          });
        }
      }
    ];
    const table = useVueTable({
      get data() {
        return props.users.data;
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
    watch(
      sorting,
      (newSorting) => {
        if (newSorting.length > 0) {
          router.get(
            UserController.index.url(),
            {
              search: search.value || void 0,
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
    watch(search, () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        router.get(
          UserController.index.url(),
          {
            search: search.value || void 0,
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
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(DefineActionsTemplate), null, {
        default: withCtx(({ user, onDelete }, _push2, _parent2, _scopeId) => {
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
                        if (unref(isSuperAdmin)) {
                          _push4(ssrRenderComponent(unref(_sfc_main$6), {
                            onClick: ($event) => unref(copyToClipboard)([user])
                          }, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(Copy), { class: "mr-2 h-4 w-4" }, null, _parent5, _scopeId4));
                                _push5(` Copy user data `);
                              } else {
                                return [
                                  createVNode(unref(Copy), { class: "mr-2 h-4 w-4" }),
                                  createTextVNode(" Copy user data ")
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(ssrRenderComponent(unref(_sfc_main$7), null, null, _parent4, _scopeId3));
                        if (unref(isSuperAdmin)) {
                          _push4(ssrRenderComponent(unref(_sfc_main$6), { "as-child": "" }, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(Link), {
                                  href: unref(UserController).edit.url(user.id)
                                }, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(Edit), { class: "mr-2 h-4 w-4" }, null, _parent6, _scopeId5));
                                      _push6(` Edit user `);
                                    } else {
                                      return [
                                        createVNode(unref(Edit), { class: "mr-2 h-4 w-4" }),
                                        createTextVNode(" Edit user ")
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(Link), {
                                    href: unref(UserController).edit.url(user.id)
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Edit), { class: "mr-2 h-4 w-4" }),
                                      createTextVNode(" Edit user ")
                                    ]),
                                    _: 1
                                  }, 8, ["href"])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        if (unref(isSuperAdmin)) {
                          _push4(ssrRenderComponent(unref(_sfc_main$6), {
                            onClick: onDelete,
                            class: "text-destructive"
                          }, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(Trash2), { class: "mr-2 h-4 w-4" }, null, _parent5, _scopeId4));
                                _push5(` Delete user `);
                              } else {
                                return [
                                  createVNode(unref(Trash2), { class: "mr-2 h-4 w-4" }),
                                  createTextVNode(" Delete user ")
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Actions")
                            ]),
                            _: 1
                          }),
                          unref(isSuperAdmin) ? (openBlock(), createBlock(unref(_sfc_main$6), {
                            key: 0,
                            onClick: ($event) => unref(copyToClipboard)([user])
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Copy), { class: "mr-2 h-4 w-4" }),
                              createTextVNode(" Copy user data ")
                            ]),
                            _: 1
                          }, 8, ["onClick"])) : createCommentVNode("", true),
                          createVNode(unref(_sfc_main$7)),
                          unref(isSuperAdmin) ? (openBlock(), createBlock(unref(_sfc_main$6), {
                            key: 1,
                            "as-child": ""
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Link), {
                                href: unref(UserController).edit.url(user.id)
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Edit), { class: "mr-2 h-4 w-4" }),
                                  createTextVNode(" Edit user ")
                                ]),
                                _: 1
                              }, 8, ["href"])
                            ]),
                            _: 2
                          }, 1024)) : createCommentVNode("", true),
                          unref(isSuperAdmin) ? (openBlock(), createBlock(unref(_sfc_main$6), {
                            key: 2,
                            onClick: onDelete,
                            class: "text-destructive"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Trash2), { class: "mr-2 h-4 w-4" }),
                              createTextVNode(" Delete user ")
                            ]),
                            _: 1
                          }, 8, ["onClick"])) : createCommentVNode("", true)
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
                        unref(isSuperAdmin) ? (openBlock(), createBlock(unref(_sfc_main$6), {
                          key: 0,
                          onClick: ($event) => unref(copyToClipboard)([user])
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Copy), { class: "mr-2 h-4 w-4" }),
                            createTextVNode(" Copy user data ")
                          ]),
                          _: 1
                        }, 8, ["onClick"])) : createCommentVNode("", true),
                        createVNode(unref(_sfc_main$7)),
                        unref(isSuperAdmin) ? (openBlock(), createBlock(unref(_sfc_main$6), {
                          key: 1,
                          "as-child": ""
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Link), {
                              href: unref(UserController).edit.url(user.id)
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Edit), { class: "mr-2 h-4 w-4" }),
                                createTextVNode(" Edit user ")
                              ]),
                              _: 1
                            }, 8, ["href"])
                          ]),
                          _: 2
                        }, 1024)) : createCommentVNode("", true),
                        unref(isSuperAdmin) ? (openBlock(), createBlock(unref(_sfc_main$6), {
                          key: 2,
                          onClick: onDelete,
                          class: "text-destructive"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Trash2), { class: "mr-2 h-4 w-4" }),
                            createTextVNode(" Delete user ")
                          ]),
                          _: 1
                        }, 8, ["onClick"])) : createCommentVNode("", true)
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
                      unref(isSuperAdmin) ? (openBlock(), createBlock(unref(_sfc_main$6), {
                        key: 0,
                        onClick: ($event) => unref(copyToClipboard)([user])
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Copy), { class: "mr-2 h-4 w-4" }),
                          createTextVNode(" Copy user data ")
                        ]),
                        _: 1
                      }, 8, ["onClick"])) : createCommentVNode("", true),
                      createVNode(unref(_sfc_main$7)),
                      unref(isSuperAdmin) ? (openBlock(), createBlock(unref(_sfc_main$6), {
                        key: 1,
                        "as-child": ""
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Link), {
                            href: unref(UserController).edit.url(user.id)
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Edit), { class: "mr-2 h-4 w-4" }),
                              createTextVNode(" Edit user ")
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ]),
                        _: 2
                      }, 1024)) : createCommentVNode("", true),
                      unref(isSuperAdmin) ? (openBlock(), createBlock(unref(_sfc_main$6), {
                        key: 2,
                        onClick: onDelete,
                        class: "text-destructive"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Trash2), { class: "mr-2 h-4 w-4" }),
                          createTextVNode(" Delete user ")
                        ]),
                        _: 1
                      }, 8, ["onClick"])) : createCommentVNode("", true)
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
            _push2(ssrRenderComponent(unref(Head), { title: "User Management" }, null, _parent2, _scopeId));
            _push2(`<div class="rounded-xl p-4 space-y-6 py-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="text-3xl font-bold tracking-tight"${_scopeId}>Users</h1><p class="text-muted-foreground"${_scopeId}> Manage user accounts and permissions </p></div><div class="flex gap-2"${_scopeId}>`);
            if (unref(isSuperAdmin)) {
              _push2(ssrRenderComponent(unref(Link), {
                href: unref(UserController).create.url()
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Plus), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                          _push4(` Add User `);
                        } else {
                          return [
                            createVNode(unref(Plus), { class: "h-4 w-4" }),
                            createTextVNode(" Add User ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$3), null, {
                        default: withCtx(() => [
                          createVNode(unref(Plus), { class: "h-4 w-4" }),
                          createTextVNode(" Add User ")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            if (selectedCount.value > 0) {
              _push2(`<div class="flex items-center justify-between rounded-lg border bg-muted/50 p-4"${_scopeId}><p class="text-sm font-medium"${_scopeId}>${ssrInterpolate(selectedCount.value)} user(s) selected </p><div class="flex gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(_sfc_main$3), {
                variant: "outline",
                size: "sm",
                onClick: openBulkCopyDialog
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Copy), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                    _push3(` Copy Data `);
                  } else {
                    return [
                      createVNode(unref(Copy), { class: "h-4 w-4" }),
                      createTextVNode(" Copy Data ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$3), {
                variant: "destructive",
                size: "sm",
                onClick: openBulkDeleteDialog
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Trash2), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                    _push3(` Delete Selected `);
                  } else {
                    return [
                      createVNode(unref(Trash2), { class: "h-4 w-4" }),
                      createTextVNode(" Delete Selected ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex items-center justify-between gap-4"${_scopeId}><div class="relative flex-1 max-w-sm"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$9), {
              modelValue: search.value,
              "onUpdate:modelValue": ($event) => search.value = $event,
              placeholder: "Filter emails...",
              class: "pl-9"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$1), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$2), { "as-child": "" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$3), {
                          variant: "outline",
                          class: "ml-auto"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Columns `);
                              _push5(ssrRenderComponent(unref(ChevronDown), { class: "ml-2 h-4 w-4" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createTextVNode(" Columns "),
                                createVNode(unref(ChevronDown), { class: "ml-2 h-4 w-4" })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$3), {
                            variant: "outline",
                            class: "ml-auto"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Columns "),
                              createVNode(unref(ChevronDown), { class: "ml-2 h-4 w-4" })
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { align: "end" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(unref(table).getAllColumns().filter((column) => column.getCanHide()), (column) => {
                          _push4(ssrRenderComponent(unref(_sfc_main$a), {
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
                            return openBlock(), createBlock(unref(_sfc_main$a), {
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
                    createVNode(unref(_sfc_main$2), { "as-child": "" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$3), {
                          variant: "outline",
                          class: "ml-auto"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Columns "),
                            createVNode(unref(ChevronDown), { class: "ml-2 h-4 w-4" })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$4), { align: "end" }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getAllColumns().filter((column) => column.getCanHide()), (column) => {
                          return openBlock(), createBlock(unref(_sfc_main$a), {
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
            _push2(ssrRenderComponent(unref(_sfc_main$b), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$c), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(unref(table).getHeaderGroups(), (headerGroup) => {
                          _push4(ssrRenderComponent(unref(_sfc_main$d), {
                            key: headerGroup.id
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(headerGroup.headers, (header) => {
                                  _push5(ssrRenderComponent(unref(_sfc_main$e), {
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
                                    return openBlock(), createBlock(unref(_sfc_main$e), {
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
                            return openBlock(), createBlock(unref(_sfc_main$d), {
                              key: headerGroup.id
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                                  return openBlock(), createBlock(unref(_sfc_main$e), {
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
                  _push3(ssrRenderComponent(unref(_sfc_main$f), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (unref(table).getRowModel().rows?.length) {
                          _push4(`<!--[-->`);
                          ssrRenderList(unref(table).getRowModel().rows, (row) => {
                            _push4(ssrRenderComponent(unref(_sfc_main$d), {
                              key: row.id,
                              "data-state": row.getIsSelected() ? "selected" : void 0
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<!--[-->`);
                                  ssrRenderList(row.getVisibleCells(), (cell) => {
                                    _push5(ssrRenderComponent(unref(_sfc_main$g), {
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
                                      return openBlock(), createBlock(unref(_sfc_main$g), {
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
                          _push4(ssrRenderComponent(unref(_sfc_main$d), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(_sfc_main$g), {
                                  colspan: columns.length,
                                  class: "h-24 text-center"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(` No users found. `);
                                    } else {
                                      return [
                                        createTextVNode(" No users found. ")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(_sfc_main$g), {
                                    colspan: columns.length,
                                    class: "h-24 text-center"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" No users found. ")
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
                            return openBlock(), createBlock(unref(_sfc_main$d), {
                              key: row.id,
                              "data-state": row.getIsSelected() ? "selected" : void 0
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                                  return openBlock(), createBlock(unref(_sfc_main$g), {
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
                          }), 128)) : (openBlock(), createBlock(unref(_sfc_main$d), { key: 1 }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$g), {
                                colspan: columns.length,
                                class: "h-24 text-center"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" No users found. ")
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
                    createVNode(unref(_sfc_main$c), null, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getHeaderGroups(), (headerGroup) => {
                          return openBlock(), createBlock(unref(_sfc_main$d), {
                            key: headerGroup.id
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                                return openBlock(), createBlock(unref(_sfc_main$e), {
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
                    createVNode(unref(_sfc_main$f), null, {
                      default: withCtx(() => [
                        unref(table).getRowModel().rows?.length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(table).getRowModel().rows, (row) => {
                          return openBlock(), createBlock(unref(_sfc_main$d), {
                            key: row.id,
                            "data-state": row.getIsSelected() ? "selected" : void 0
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                                return openBlock(), createBlock(unref(_sfc_main$g), {
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
                        }), 128)) : (openBlock(), createBlock(unref(_sfc_main$d), { key: 1 }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$g), {
                              colspan: columns.length,
                              class: "h-24 text-center"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" No users found. ")
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
            _push2(`</div><div class="flex items-center justify-end space-x-2 py-4"${_scopeId}><div class="flex-1 text-sm text-muted-foreground"${_scopeId}>`);
            if (selectedCount.value > 0) {
              _push2(`<span${_scopeId}>${ssrInterpolate(unref(table).getFilteredSelectedRowModel().rows.length)} dari ${ssrInterpolate(unref(table).getFilteredRowModel().rows.length)} baris dipilih. </span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="space-x-2"${_scopeId}>`);
            if (__props.users.last_page > 1) {
              _push2(ssrRenderComponent(_sfc_main$h, {
                data: {
                  current_page: __props.users.current_page,
                  last_page: __props.users.last_page,
                  per_page: __props.users.per_page,
                  from: (__props.users.current_page - 1) * __props.users.per_page + 1,
                  to: Math.min(__props.users.current_page * __props.users.per_page, __props.users.total),
                  total: __props.users.total
                },
                url: unref(UserController).index.url(),
                filters: {
                  search: search.value || void 0,
                  sort_by: sorting.value[0]?.id || "created_at",
                  sort_order: sorting.value[0]?.desc ? "desc" : "asc"
                }
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$i, {
              open: deleteDialog.value.open,
              "onUpdate:open": ($event) => deleteDialog.value.open = $event,
              title: "Hapus Pengguna?",
              description: `Apakah Anda yakin ingin menghapus pengguna ${deleteDialog.value.user?.name}? Tindakan ini tidak dapat dibatalkan.`,
              "confirm-text": "Hapus",
              "cancel-text": "Batal",
              variant: "destructive",
              onConfirm: handleDelete
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$i, {
              open: bulkDeleteDialog.value.open,
              "onUpdate:open": ($event) => bulkDeleteDialog.value.open = $event,
              title: `Hapus ${selectedCount.value} Pengguna?`,
              description: `Apakah Anda yakin ingin menghapus ${selectedCount.value} pengguna yang dipilih? Tindakan ini tidak dapat dibatalkan dan akan menghapus semua data pengguna tersebut.`,
              "confirm-text": "Hapus Semua",
              "cancel-text": "Batal",
              variant: "destructive",
              onConfirm: handleBulkDelete
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$i, {
              open: bulkCopyDialog.value.open,
              "onUpdate:open": ($event) => bulkCopyDialog.value.open = $event,
              title: "Salin Data Pengguna?",
              description: `Data dari ${selectedCount.value} pengguna yang dipilih akan disalin ke clipboard dalam format tab-separated. Anda dapat mem-paste data ini ke spreadsheet seperti Excel atau Google Sheets.`,
              "confirm-text": "Salin ke Clipboard",
              "cancel-text": "Batal",
              onConfirm: handleCopyData
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Head), { title: "User Management" }),
              createVNode("div", { class: "rounded-xl p-4 space-y-6 py-6" }, [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("div", null, [
                    createVNode("h1", { class: "text-3xl font-bold tracking-tight" }, "Users"),
                    createVNode("p", { class: "text-muted-foreground" }, " Manage user accounts and permissions ")
                  ]),
                  createVNode("div", { class: "flex gap-2" }, [
                    unref(isSuperAdmin) ? (openBlock(), createBlock(unref(Link), {
                      key: 0,
                      href: unref(UserController).create.url()
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$3), null, {
                          default: withCtx(() => [
                            createVNode(unref(Plus), { class: "h-4 w-4" }),
                            createTextVNode(" Add User ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["href"])) : createCommentVNode("", true)
                  ])
                ]),
                selectedCount.value > 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "flex items-center justify-between rounded-lg border bg-muted/50 p-4"
                }, [
                  createVNode("p", { class: "text-sm font-medium" }, toDisplayString(selectedCount.value) + " user(s) selected ", 1),
                  createVNode("div", { class: "flex gap-2" }, [
                    createVNode(unref(_sfc_main$3), {
                      variant: "outline",
                      size: "sm",
                      onClick: openBulkCopyDialog
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Copy), { class: "h-4 w-4" }),
                        createTextVNode(" Copy Data ")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$3), {
                      variant: "destructive",
                      size: "sm",
                      onClick: openBulkDeleteDialog
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Trash2), { class: "h-4 w-4" }),
                        createTextVNode(" Delete Selected ")
                      ]),
                      _: 1
                    })
                  ])
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "flex items-center justify-between gap-4" }, [
                  createVNode("div", { class: "relative flex-1 max-w-sm" }, [
                    createVNode(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
                    createVNode(unref(_sfc_main$9), {
                      modelValue: search.value,
                      "onUpdate:modelValue": ($event) => search.value = $event,
                      placeholder: "Filter emails...",
                      class: "pl-9"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode(unref(_sfc_main$1), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$2), { "as-child": "" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$3), {
                            variant: "outline",
                            class: "ml-auto"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Columns "),
                              createVNode(unref(ChevronDown), { class: "ml-2 h-4 w-4" })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$4), { align: "end" }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getAllColumns().filter((column) => column.getCanHide()), (column) => {
                            return openBlock(), createBlock(unref(_sfc_main$a), {
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
                  createVNode(unref(_sfc_main$b), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$c), null, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getHeaderGroups(), (headerGroup) => {
                            return openBlock(), createBlock(unref(_sfc_main$d), {
                              key: headerGroup.id
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                                  return openBlock(), createBlock(unref(_sfc_main$e), {
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
                      createVNode(unref(_sfc_main$f), null, {
                        default: withCtx(() => [
                          unref(table).getRowModel().rows?.length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(table).getRowModel().rows, (row) => {
                            return openBlock(), createBlock(unref(_sfc_main$d), {
                              key: row.id,
                              "data-state": row.getIsSelected() ? "selected" : void 0
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                                  return openBlock(), createBlock(unref(_sfc_main$g), {
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
                          }), 128)) : (openBlock(), createBlock(unref(_sfc_main$d), { key: 1 }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$g), {
                                colspan: columns.length,
                                class: "h-24 text-center"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" No users found. ")
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
                createVNode("div", { class: "flex items-center justify-end space-x-2 py-4" }, [
                  createVNode("div", { class: "flex-1 text-sm text-muted-foreground" }, [
                    selectedCount.value > 0 ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(unref(table).getFilteredSelectedRowModel().rows.length) + " dari " + toDisplayString(unref(table).getFilteredRowModel().rows.length) + " baris dipilih. ", 1)) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "space-x-2" }, [
                    __props.users.last_page > 1 ? (openBlock(), createBlock(_sfc_main$h, {
                      key: 0,
                      data: {
                        current_page: __props.users.current_page,
                        last_page: __props.users.last_page,
                        per_page: __props.users.per_page,
                        from: (__props.users.current_page - 1) * __props.users.per_page + 1,
                        to: Math.min(__props.users.current_page * __props.users.per_page, __props.users.total),
                        total: __props.users.total
                      },
                      url: unref(UserController).index.url(),
                      filters: {
                        search: search.value || void 0,
                        sort_by: sorting.value[0]?.id || "created_at",
                        sort_order: sorting.value[0]?.desc ? "desc" : "asc"
                      }
                    }, null, 8, ["data", "url", "filters"])) : createCommentVNode("", true)
                  ])
                ])
              ]),
              createVNode(_sfc_main$i, {
                open: deleteDialog.value.open,
                "onUpdate:open": ($event) => deleteDialog.value.open = $event,
                title: "Hapus Pengguna?",
                description: `Apakah Anda yakin ingin menghapus pengguna ${deleteDialog.value.user?.name}? Tindakan ini tidak dapat dibatalkan.`,
                "confirm-text": "Hapus",
                "cancel-text": "Batal",
                variant: "destructive",
                onConfirm: handleDelete
              }, null, 8, ["open", "onUpdate:open", "description"]),
              createVNode(_sfc_main$i, {
                open: bulkDeleteDialog.value.open,
                "onUpdate:open": ($event) => bulkDeleteDialog.value.open = $event,
                title: `Hapus ${selectedCount.value} Pengguna?`,
                description: `Apakah Anda yakin ingin menghapus ${selectedCount.value} pengguna yang dipilih? Tindakan ini tidak dapat dibatalkan dan akan menghapus semua data pengguna tersebut.`,
                "confirm-text": "Hapus Semua",
                "cancel-text": "Batal",
                variant: "destructive",
                onConfirm: handleBulkDelete
              }, null, 8, ["open", "onUpdate:open", "title", "description"]),
              createVNode(_sfc_main$i, {
                open: bulkCopyDialog.value.open,
                "onUpdate:open": ($event) => bulkCopyDialog.value.open = $event,
                title: "Salin Data Pengguna?",
                description: `Data dari ${selectedCount.value} pengguna yang dipilih akan disalin ke clipboard dalam format tab-separated. Anda dapat mem-paste data ini ke spreadsheet seperti Excel atau Google Sheets.`,
                "confirm-text": "Salin ke Clipboard",
                "cancel-text": "Batal",
                onConfirm: handleCopyData
              }, null, 8, ["open", "onUpdate:open", "description"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Users/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
