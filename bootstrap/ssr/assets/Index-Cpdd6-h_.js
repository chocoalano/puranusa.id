import { defineComponent, ref, unref, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, withKeys, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AppLayout-1TXr_jx9.js";
import { Head, router } from "@inertiajs/vue3";
import { _ as _sfc_main$f } from "./index-BpQimeTM.js";
import { _ as _sfc_main$2 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$3 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$9, a as _sfc_main$a, b as _sfc_main$b, c as _sfc_main$c, d as _sfc_main$d, e as _sfc_main$e } from "./TableHeader-emcE6QAC.js";
import { _ as _sfc_main$g, a as _sfc_main$h, b as _sfc_main$i, c as _sfc_main$j } from "./DropdownMenuTrigger-B1v6pHML.js";
import { _ as _sfc_main$4, a as _sfc_main$5, b as _sfc_main$6, c as _sfc_main$7, d as _sfc_main$8 } from "./SelectValue-BUnv4mQg.js";
import { Plus, Search, ArrowUpDown, MoreHorizontal } from "lucide-vue-next";
import { u as usePermissions } from "./usePermissions-DYRibCI0.js";
import "class-variance-authority";
import "reka-ui";
import "@vueuse/core";
import "./index--D7ld9AJ.js";
import "./AvatarImage-DWFQMckn.js";
import "./index-BsP5JKUP.js";
import "vue-sonner";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
import "clsx";
import "tailwind-merge";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    products: {},
    categories: {},
    filters: {}
  },
  setup(__props) {
    const { isSuperAdmin, isAdmin } = usePermissions();
    const props = __props;
    const searchQuery = ref(props.filters.search || "");
    const selectedCategory = ref(props.filters.category?.toString() || "all");
    const selectedStatus = ref(props.filters.status?.toString() || "all");
    const sortBy = ref(props.filters.sort_by || "created_at");
    const sortOrder = ref(props.filters.sort_order || "desc");
    const perPage = ref(props.filters.per_page || 15);
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(amount);
    };
    const handleSearch = () => {
      router.get("/admin/products", {
        search: searchQuery.value,
        category: selectedCategory.value === "all" ? void 0 : selectedCategory.value,
        status: selectedStatus.value === "all" ? void 0 : selectedStatus.value,
        sort_by: sortBy.value,
        sort_order: sortOrder.value,
        per_page: perPage.value
      }, {
        preserveState: true,
        preserveScroll: true
      });
    };
    const handleSort = (column) => {
      if (sortBy.value === column) {
        sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
      } else {
        sortBy.value = column;
        sortOrder.value = "asc";
      }
      handleSearch();
    };
    const totalBonus = (product) => {
      const bonus = (product.b_sponsor || 0) + (product.b_matching || 0) + (product.b_pairing || 0) + (product.b_cashback || 0) + (product.b_retail || 0);
      return bonus > 0 ? formatCurrency(bonus) : "-";
    };
    const deleteProduct = (id) => {
      if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
        router.delete(`/admin/products/${id}`, {
          preserveScroll: true
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Kelola Produk" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-6rounded-xl p-4 space-y-6 py-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><h2 class="text-3xl font-bold tracking-tight"${_scopeId}>Kelola Produk</h2><p class="text-muted-foreground"${_scopeId}>Kelola semua produk yang tersedia di toko</p></div>`);
            if (unref(isSuperAdmin) || unref(isAdmin)) {
              _push2(ssrRenderComponent(unref(_sfc_main$2), {
                onClick: ($event) => unref(router).visit("/admin/products/create")
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Plus), { class: "mr-2 h-4 w-4" }, null, _parent3, _scopeId2));
                    _push3(` Tambah Produk `);
                  } else {
                    return [
                      createVNode(unref(Plus), { class: "mr-2 h-4 w-4" }),
                      createTextVNode(" Tambah Produk ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex items-center gap-4"${_scopeId}><div class="relative flex-1"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$3), {
              modelValue: searchQuery.value,
              "onUpdate:modelValue": ($event) => searchQuery.value = $event,
              placeholder: "Cari produk...",
              class: "pl-10",
              onKeydown: handleSearch
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$4), {
              modelValue: selectedCategory.value,
              "onUpdate:modelValue": [($event) => selectedCategory.value = $event, handleSearch]
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$5), { class: "w-[200px]" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$6), { placeholder: "Semua Kategori" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$6), { placeholder: "Semua Kategori" })
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
                              _push5(`Semua Kategori`);
                            } else {
                              return [
                                createTextVNode("Semua Kategori")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<!--[-->`);
                        ssrRenderList(__props.categories, (category) => {
                          _push4(ssrRenderComponent(unref(_sfc_main$8), {
                            key: category.id,
                            value: category.id.toString()
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(category.name)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(category.name), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          createVNode(unref(_sfc_main$8), { value: "all" }, {
                            default: withCtx(() => [
                              createTextVNode("Semua Kategori")
                            ]),
                            _: 1
                          }),
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (category) => {
                            return openBlock(), createBlock(unref(_sfc_main$8), {
                              key: category.id,
                              value: category.id.toString()
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(category.name), 1)
                              ]),
                              _: 2
                            }, 1032, ["value"]);
                          }), 128))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$5), { class: "w-[200px]" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$6), { placeholder: "Semua Kategori" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$8), { value: "all" }, {
                          default: withCtx(() => [
                            createTextVNode("Semua Kategori")
                          ]),
                          _: 1
                        }),
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (category) => {
                          return openBlock(), createBlock(unref(_sfc_main$8), {
                            key: category.id,
                            value: category.id.toString()
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(category.name), 1)
                            ]),
                            _: 2
                          }, 1032, ["value"]);
                        }), 128))
                      ]),
                      _: 2
                    }, 1024)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), {
              modelValue: selectedStatus.value,
              "onUpdate:modelValue": [($event) => selectedStatus.value = $event, handleSearch]
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$5), { class: "w-[150px]" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$6), { placeholder: "Status" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$6), { placeholder: "Status" })
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
                              _push5(`Aktif`);
                            } else {
                              return [
                                createTextVNode("Aktif")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { value: "0" }, {
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
                          createVNode(unref(_sfc_main$8), { value: "all" }, {
                            default: withCtx(() => [
                              createTextVNode("Semua Status")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$8), { value: "1" }, {
                            default: withCtx(() => [
                              createTextVNode("Aktif")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$8), { value: "0" }, {
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
                    createVNode(unref(_sfc_main$5), { class: "w-[150px]" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$6), { placeholder: "Status" })
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
                            createTextVNode("Aktif")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), { value: "0" }, {
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
            _push2(ssrRenderComponent(unref(_sfc_main$4), {
              modelValue: perPage.value,
              "onUpdate:modelValue": [($event) => perPage.value = $event, handleSearch]
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$5), { class: "w-[100px]" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$6), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$6))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { value: 10 }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`10`);
                            } else {
                              return [
                                createTextVNode("10")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { value: 25 }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`25`);
                            } else {
                              return [
                                createTextVNode("25")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { value: 50 }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`50`);
                            } else {
                              return [
                                createTextVNode("50")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { value: 100 }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`100`);
                            } else {
                              return [
                                createTextVNode("100")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$8), { value: 10 }, {
                            default: withCtx(() => [
                              createTextVNode("10")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$8), { value: 25 }, {
                            default: withCtx(() => [
                              createTextVNode("25")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$8), { value: 50 }, {
                            default: withCtx(() => [
                              createTextVNode("50")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$8), { value: 100 }, {
                            default: withCtx(() => [
                              createTextVNode("100")
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
                    createVNode(unref(_sfc_main$5), { class: "w-[100px]" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$6))
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$8), { value: 10 }, {
                          default: withCtx(() => [
                            createTextVNode("10")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), { value: 25 }, {
                          default: withCtx(() => [
                            createTextVNode("25")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), { value: 50 }, {
                          default: withCtx(() => [
                            createTextVNode("50")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), { value: 100 }, {
                          default: withCtx(() => [
                            createTextVNode("100")
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
            _push2(`</div><div class="rounded-md border"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$9), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$a), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$b), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$c), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$2), {
                                      variant: "ghost",
                                      onClick: ($event) => handleSort("sku"),
                                      class: "flex items-center gap-1 p-0 h-auto"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` SKU `);
                                          _push7(ssrRenderComponent(unref(ArrowUpDown), { class: "h-3 w-3" }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createTextVNode(" SKU "),
                                            createVNode(unref(ArrowUpDown), { class: "h-3 w-3" })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$2), {
                                        variant: "ghost",
                                        onClick: ($event) => handleSort("sku"),
                                        class: "flex items-center gap-1 p-0 h-auto"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" SKU "),
                                          createVNode(unref(ArrowUpDown), { class: "h-3 w-3" })
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$2), {
                                      variant: "ghost",
                                      onClick: ($event) => handleSort("name"),
                                      class: "flex items-center gap-1 p-0 h-auto"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` Nama Produk `);
                                          _push7(ssrRenderComponent(unref(ArrowUpDown), { class: "h-3 w-3" }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createTextVNode(" Nama Produk "),
                                            createVNode(unref(ArrowUpDown), { class: "h-3 w-3" })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$2), {
                                        variant: "ghost",
                                        onClick: ($event) => handleSort("name"),
                                        class: "flex items-center gap-1 p-0 h-auto"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Nama Produk "),
                                          createVNode(unref(ArrowUpDown), { class: "h-3 w-3" })
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Kategori`);
                                  } else {
                                    return [
                                      createTextVNode("Kategori")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$2), {
                                      variant: "ghost",
                                      onClick: ($event) => handleSort("base_price"),
                                      class: "flex items-center gap-1 p-0 h-auto"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` Harga `);
                                          _push7(ssrRenderComponent(unref(ArrowUpDown), { class: "h-3 w-3" }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createTextVNode(" Harga "),
                                            createVNode(unref(ArrowUpDown), { class: "h-3 w-3" })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$2), {
                                        variant: "ghost",
                                        onClick: ($event) => handleSort("base_price"),
                                        class: "flex items-center gap-1 p-0 h-auto"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Harga "),
                                          createVNode(unref(ArrowUpDown), { class: "h-3 w-3" })
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$2), {
                                      variant: "ghost",
                                      onClick: ($event) => handleSort("bv"),
                                      class: "flex items-center gap-1 p-0 h-auto"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` BV `);
                                          _push7(ssrRenderComponent(unref(ArrowUpDown), { class: "h-3 w-3" }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createTextVNode(" BV "),
                                            createVNode(unref(ArrowUpDown), { class: "h-3 w-3" })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$2), {
                                        variant: "ghost",
                                        onClick: ($event) => handleSort("bv"),
                                        class: "flex items-center gap-1 p-0 h-auto"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" BV "),
                                          createVNode(unref(ArrowUpDown), { class: "h-3 w-3" })
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Total Bonus`);
                                  } else {
                                    return [
                                      createTextVNode("Total Bonus")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$2), {
                                      variant: "ghost",
                                      onClick: ($event) => handleSort("b_retail"),
                                      class: "flex items-center gap-1 p-0 h-auto"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` B. Retail `);
                                          _push7(ssrRenderComponent(unref(ArrowUpDown), { class: "h-3 w-3" }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createTextVNode(" B. Retail "),
                                            createVNode(unref(ArrowUpDown), { class: "h-3 w-3" })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$2), {
                                        variant: "ghost",
                                        onClick: ($event) => handleSort("b_retail"),
                                        class: "flex items-center gap-1 p-0 h-auto"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" B. Retail "),
                                          createVNode(unref(ArrowUpDown), { class: "h-3 w-3" })
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$2), {
                                      variant: "ghost",
                                      onClick: ($event) => handleSort("stock"),
                                      class: "flex items-center gap-1 p-0 h-auto"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` Stok `);
                                          _push7(ssrRenderComponent(unref(ArrowUpDown), { class: "h-3 w-3" }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createTextVNode(" Stok "),
                                            createVNode(unref(ArrowUpDown), { class: "h-3 w-3" })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$2), {
                                        variant: "ghost",
                                        onClick: ($event) => handleSort("stock"),
                                        class: "flex items-center gap-1 p-0 h-auto"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Stok "),
                                          createVNode(unref(ArrowUpDown), { class: "h-3 w-3" })
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Status`);
                                  } else {
                                    return [
                                      createTextVNode("Status")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), { class: "w-[80px]" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$2), {
                                      variant: "ghost",
                                      onClick: ($event) => handleSort("sku"),
                                      class: "flex items-center gap-1 p-0 h-auto"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" SKU "),
                                        createVNode(unref(ArrowUpDown), { class: "h-3 w-3" })
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$2), {
                                      variant: "ghost",
                                      onClick: ($event) => handleSort("name"),
                                      class: "flex items-center gap-1 p-0 h-auto"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Nama Produk "),
                                        createVNode(unref(ArrowUpDown), { class: "h-3 w-3" })
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Kategori")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$2), {
                                      variant: "ghost",
                                      onClick: ($event) => handleSort("base_price"),
                                      class: "flex items-center gap-1 p-0 h-auto"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Harga "),
                                        createVNode(unref(ArrowUpDown), { class: "h-3 w-3" })
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$2), {
                                      variant: "ghost",
                                      onClick: ($event) => handleSort("bv"),
                                      class: "flex items-center gap-1 p-0 h-auto"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" BV "),
                                        createVNode(unref(ArrowUpDown), { class: "h-3 w-3" })
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Total Bonus")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$2), {
                                      variant: "ghost",
                                      onClick: ($event) => handleSort("b_retail"),
                                      class: "flex items-center gap-1 p-0 h-auto"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" B. Retail "),
                                        createVNode(unref(ArrowUpDown), { class: "h-3 w-3" })
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$2), {
                                      variant: "ghost",
                                      onClick: ($event) => handleSort("stock"),
                                      class: "flex items-center gap-1 p-0 h-auto"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Stok "),
                                        createVNode(unref(ArrowUpDown), { class: "h-3 w-3" })
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Status")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), { class: "w-[80px]" })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$b), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$2), {
                                    variant: "ghost",
                                    onClick: ($event) => handleSort("sku"),
                                    class: "flex items-center gap-1 p-0 h-auto"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" SKU "),
                                      createVNode(unref(ArrowUpDown), { class: "h-3 w-3" })
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$2), {
                                    variant: "ghost",
                                    onClick: ($event) => handleSort("name"),
                                    class: "flex items-center gap-1 p-0 h-auto"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Nama Produk "),
                                      createVNode(unref(ArrowUpDown), { class: "h-3 w-3" })
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createTextVNode("Kategori")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$2), {
                                    variant: "ghost",
                                    onClick: ($event) => handleSort("base_price"),
                                    class: "flex items-center gap-1 p-0 h-auto"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Harga "),
                                      createVNode(unref(ArrowUpDown), { class: "h-3 w-3" })
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$2), {
                                    variant: "ghost",
                                    onClick: ($event) => handleSort("bv"),
                                    class: "flex items-center gap-1 p-0 h-auto"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" BV "),
                                      createVNode(unref(ArrowUpDown), { class: "h-3 w-3" })
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createTextVNode("Total Bonus")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$2), {
                                    variant: "ghost",
                                    onClick: ($event) => handleSort("b_retail"),
                                    class: "flex items-center gap-1 p-0 h-auto"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" B. Retail "),
                                      createVNode(unref(ArrowUpDown), { class: "h-3 w-3" })
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$2), {
                                    variant: "ghost",
                                    onClick: ($event) => handleSort("stock"),
                                    class: "flex items-center gap-1 p-0 h-auto"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Stok "),
                                      createVNode(unref(ArrowUpDown), { class: "h-3 w-3" })
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createTextVNode("Status")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), { class: "w-[80px]" })
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$d), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (__props.products.data.length === 0) {
                          _push4(ssrRenderComponent(unref(_sfc_main$b), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(_sfc_main$e), {
                                  colspan: "10",
                                  class: "text-center text-muted-foreground"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(` Tidak ada produk ditemukan `);
                                    } else {
                                      return [
                                        createTextVNode(" Tidak ada produk ditemukan ")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(_sfc_main$e), {
                                    colspan: "10",
                                    class: "text-center text-muted-foreground"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Tidak ada produk ditemukan ")
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`<!--[-->`);
                        ssrRenderList(__props.products.data, (product) => {
                          _push4(ssrRenderComponent(unref(_sfc_main$b), {
                            key: product.id
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(_sfc_main$e), { class: "font-medium" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(product.sku)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(product.sku), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(_sfc_main$e), null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(product.name)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(product.name), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(_sfc_main$e), null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<div class="flex flex-wrap gap-1"${_scopeId5}><!--[-->`);
                                      ssrRenderList(product.categories, (cat) => {
                                        _push6(ssrRenderComponent(unref(_sfc_main$f), {
                                          key: cat.id,
                                          variant: "secondary"
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(cat.name)}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(cat.name), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      });
                                      _push6(`<!--]--></div>`);
                                    } else {
                                      return [
                                        createVNode("div", { class: "flex flex-wrap gap-1" }, [
                                          (openBlock(true), createBlock(Fragment, null, renderList(product.categories, (cat) => {
                                            return openBlock(), createBlock(unref(_sfc_main$f), {
                                              key: cat.id,
                                              variant: "secondary"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(cat.name), 1)
                                              ]),
                                              _: 2
                                            }, 1024);
                                          }), 128))
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(_sfc_main$e), null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(formatCurrency(product.base_price))}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(formatCurrency(product.base_price)), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(_sfc_main$e), null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(_sfc_main$f), { variant: "outline" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`${ssrInterpolate(product.bv || 0)}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString(product.bv || 0), 1)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(unref(_sfc_main$f), { variant: "outline" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(product.bv || 0), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(_sfc_main$e), null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(totalBonus(product))}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(totalBonus(product)), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(_sfc_main$e), null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(_sfc_main$f), { variant: "outline" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`${ssrInterpolate(product.b_retail ? formatCurrency(product.b_retail) : "-")}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString(product.b_retail ? formatCurrency(product.b_retail) : "-"), 1)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(unref(_sfc_main$f), { variant: "outline" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(product.b_retail ? formatCurrency(product.b_retail) : "-"), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(_sfc_main$e), null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(_sfc_main$f), {
                                        variant: product.stock > 0 ? "default" : "destructive"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`${ssrInterpolate(product.stock)}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString(product.stock), 1)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(unref(_sfc_main$f), {
                                          variant: product.stock > 0 ? "default" : "destructive"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(product.stock), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["variant"])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(_sfc_main$e), null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(_sfc_main$f), {
                                        variant: product.is_active ? "default" : "secondary"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`${ssrInterpolate(product.is_active ? "Aktif" : "Tidak Aktif")}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString(product.is_active ? "Aktif" : "Tidak Aktif"), 1)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(unref(_sfc_main$f), {
                                          variant: product.is_active ? "default" : "secondary"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(product.is_active ? "Aktif" : "Tidak Aktif"), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["variant"])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(_sfc_main$e), null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(_sfc_main$g), null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(unref(_sfc_main$h), { "as-child": "" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(unref(_sfc_main$2), {
                                                    variant: "ghost",
                                                    size: "icon"
                                                  }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(ssrRenderComponent(unref(MoreHorizontal), { class: "h-4 w-4" }, null, _parent9, _scopeId8));
                                                      } else {
                                                        return [
                                                          createVNode(unref(MoreHorizontal), { class: "h-4 w-4" })
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                } else {
                                                  return [
                                                    createVNode(unref(_sfc_main$2), {
                                                      variant: "ghost",
                                                      size: "icon"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(unref(MoreHorizontal), { class: "h-4 w-4" })
                                                      ]),
                                                      _: 1
                                                    })
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$i), { align: "end" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  if (unref(isSuperAdmin) || unref(isAdmin)) {
                                                    _push8(ssrRenderComponent(unref(_sfc_main$j), {
                                                      onClick: ($event) => unref(router).visit(`/admin/products/${product.id}/edit`)
                                                    }, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(` Edit `);
                                                        } else {
                                                          return [
                                                            createTextVNode(" Edit ")
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                  } else {
                                                    _push8(`<!---->`);
                                                  }
                                                  if (unref(isSuperAdmin) || unref(isAdmin)) {
                                                    _push8(ssrRenderComponent(unref(_sfc_main$j), {
                                                      onClick: ($event) => deleteProduct(product.id),
                                                      class: "text-destructive"
                                                    }, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(` Hapus `);
                                                        } else {
                                                          return [
                                                            createTextVNode(" Hapus ")
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                  } else {
                                                    _push8(`<!---->`);
                                                  }
                                                } else {
                                                  return [
                                                    unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(_sfc_main$j), {
                                                      key: 0,
                                                      onClick: ($event) => unref(router).visit(`/admin/products/${product.id}/edit`)
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(" Edit ")
                                                      ]),
                                                      _: 1
                                                    }, 8, ["onClick"])) : createCommentVNode("", true),
                                                    unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(_sfc_main$j), {
                                                      key: 1,
                                                      onClick: ($event) => deleteProduct(product.id),
                                                      class: "text-destructive"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(" Hapus ")
                                                      ]),
                                                      _: 1
                                                    }, 8, ["onClick"])) : createCommentVNode("", true)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(unref(_sfc_main$h), { "as-child": "" }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(_sfc_main$2), {
                                                    variant: "ghost",
                                                    size: "icon"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(MoreHorizontal), { class: "h-4 w-4" })
                                                    ]),
                                                    _: 1
                                                  })
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(unref(_sfc_main$i), { align: "end" }, {
                                                default: withCtx(() => [
                                                  unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(_sfc_main$j), {
                                                    key: 0,
                                                    onClick: ($event) => unref(router).visit(`/admin/products/${product.id}/edit`)
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(" Edit ")
                                                    ]),
                                                    _: 1
                                                  }, 8, ["onClick"])) : createCommentVNode("", true),
                                                  unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(_sfc_main$j), {
                                                    key: 1,
                                                    onClick: ($event) => deleteProduct(product.id),
                                                    class: "text-destructive"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(" Hapus ")
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
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(unref(_sfc_main$g), null, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$h), { "as-child": "" }, {
                                              default: withCtx(() => [
                                                createVNode(unref(_sfc_main$2), {
                                                  variant: "ghost",
                                                  size: "icon"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(MoreHorizontal), { class: "h-4 w-4" })
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$i), { align: "end" }, {
                                              default: withCtx(() => [
                                                unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(_sfc_main$j), {
                                                  key: 0,
                                                  onClick: ($event) => unref(router).visit(`/admin/products/${product.id}/edit`)
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(" Edit ")
                                                  ]),
                                                  _: 1
                                                }, 8, ["onClick"])) : createCommentVNode("", true),
                                                unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(_sfc_main$j), {
                                                  key: 1,
                                                  onClick: ($event) => deleteProduct(product.id),
                                                  class: "text-destructive"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(" Hapus ")
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
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(_sfc_main$e), { class: "font-medium" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(product.sku), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(unref(_sfc_main$e), null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(product.name), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(unref(_sfc_main$e), null, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "flex flex-wrap gap-1" }, [
                                        (openBlock(true), createBlock(Fragment, null, renderList(product.categories, (cat) => {
                                          return openBlock(), createBlock(unref(_sfc_main$f), {
                                            key: cat.id,
                                            variant: "secondary"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(cat.name), 1)
                                            ]),
                                            _: 2
                                          }, 1024);
                                        }), 128))
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(unref(_sfc_main$e), null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(formatCurrency(product.base_price)), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(unref(_sfc_main$e), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$f), { variant: "outline" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(product.bv || 0), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(unref(_sfc_main$e), null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(totalBonus(product)), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(unref(_sfc_main$e), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$f), { variant: "outline" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(product.b_retail ? formatCurrency(product.b_retail) : "-"), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(unref(_sfc_main$e), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$f), {
                                        variant: product.stock > 0 ? "default" : "destructive"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(product.stock), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["variant"])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(unref(_sfc_main$e), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$f), {
                                        variant: product.is_active ? "default" : "secondary"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(product.is_active ? "Aktif" : "Tidak Aktif"), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["variant"])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(unref(_sfc_main$e), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$g), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$h), { "as-child": "" }, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$2), {
                                                variant: "ghost",
                                                size: "icon"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(MoreHorizontal), { class: "h-4 w-4" })
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$i), { align: "end" }, {
                                            default: withCtx(() => [
                                              unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(_sfc_main$j), {
                                                key: 0,
                                                onClick: ($event) => unref(router).visit(`/admin/products/${product.id}/edit`)
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" Edit ")
                                                ]),
                                                _: 1
                                              }, 8, ["onClick"])) : createCommentVNode("", true),
                                              unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(_sfc_main$j), {
                                                key: 1,
                                                onClick: ($event) => deleteProduct(product.id),
                                                class: "text-destructive"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" Hapus ")
                                                ]),
                                                _: 1
                                              }, 8, ["onClick"])) : createCommentVNode("", true)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          __props.products.data.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$b), { key: 0 }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$e), {
                                colspan: "10",
                                class: "text-center text-muted-foreground"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Tidak ada produk ditemukan ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })) : createCommentVNode("", true),
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.products.data, (product) => {
                            return openBlock(), createBlock(unref(_sfc_main$b), {
                              key: product.id
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$e), { class: "font-medium" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(product.sku), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(product.name), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "flex flex-wrap gap-1" }, [
                                      (openBlock(true), createBlock(Fragment, null, renderList(product.categories, (cat) => {
                                        return openBlock(), createBlock(unref(_sfc_main$f), {
                                          key: cat.id,
                                          variant: "secondary"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(cat.name), 1)
                                          ]),
                                          _: 2
                                        }, 1024);
                                      }), 128))
                                    ])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(formatCurrency(product.base_price)), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$f), { variant: "outline" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(product.bv || 0), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(totalBonus(product)), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$f), { variant: "outline" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(product.b_retail ? formatCurrency(product.b_retail) : "-"), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$f), {
                                      variant: product.stock > 0 ? "default" : "destructive"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(product.stock), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["variant"])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$f), {
                                      variant: product.is_active ? "default" : "secondary"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(product.is_active ? "Aktif" : "Tidak Aktif"), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["variant"])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$g), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$h), { "as-child": "" }, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$2), {
                                              variant: "ghost",
                                              size: "icon"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(MoreHorizontal), { class: "h-4 w-4" })
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$i), { align: "end" }, {
                                          default: withCtx(() => [
                                            unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(_sfc_main$j), {
                                              key: 0,
                                              onClick: ($event) => unref(router).visit(`/admin/products/${product.id}/edit`)
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(" Edit ")
                                              ]),
                                              _: 1
                                            }, 8, ["onClick"])) : createCommentVNode("", true),
                                            unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(_sfc_main$j), {
                                              key: 1,
                                              onClick: ($event) => deleteProduct(product.id),
                                              class: "text-destructive"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(" Hapus ")
                                              ]),
                                              _: 1
                                            }, 8, ["onClick"])) : createCommentVNode("", true)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$a), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$b), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$c), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$2), {
                                  variant: "ghost",
                                  onClick: ($event) => handleSort("sku"),
                                  class: "flex items-center gap-1 p-0 h-auto"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" SKU "),
                                    createVNode(unref(ArrowUpDown), { class: "h-3 w-3" })
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$2), {
                                  variant: "ghost",
                                  onClick: ($event) => handleSort("name"),
                                  class: "flex items-center gap-1 p-0 h-auto"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Nama Produk "),
                                    createVNode(unref(ArrowUpDown), { class: "h-3 w-3" })
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), null, {
                              default: withCtx(() => [
                                createTextVNode("Kategori")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$2), {
                                  variant: "ghost",
                                  onClick: ($event) => handleSort("base_price"),
                                  class: "flex items-center gap-1 p-0 h-auto"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Harga "),
                                    createVNode(unref(ArrowUpDown), { class: "h-3 w-3" })
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$2), {
                                  variant: "ghost",
                                  onClick: ($event) => handleSort("bv"),
                                  class: "flex items-center gap-1 p-0 h-auto"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" BV "),
                                    createVNode(unref(ArrowUpDown), { class: "h-3 w-3" })
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), null, {
                              default: withCtx(() => [
                                createTextVNode("Total Bonus")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$2), {
                                  variant: "ghost",
                                  onClick: ($event) => handleSort("b_retail"),
                                  class: "flex items-center gap-1 p-0 h-auto"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" B. Retail "),
                                    createVNode(unref(ArrowUpDown), { class: "h-3 w-3" })
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$2), {
                                  variant: "ghost",
                                  onClick: ($event) => handleSort("stock"),
                                  class: "flex items-center gap-1 p-0 h-auto"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Stok "),
                                    createVNode(unref(ArrowUpDown), { class: "h-3 w-3" })
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), null, {
                              default: withCtx(() => [
                                createTextVNode("Status")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), { class: "w-[80px]" })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$d), null, {
                      default: withCtx(() => [
                        __props.products.data.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$b), { key: 0 }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$e), {
                              colspan: "10",
                              class: "text-center text-muted-foreground"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Tidak ada produk ditemukan ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })) : createCommentVNode("", true),
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.products.data, (product) => {
                          return openBlock(), createBlock(unref(_sfc_main$b), {
                            key: product.id
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$e), { class: "font-medium" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(product.sku), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$e), null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(product.name), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$e), null, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex flex-wrap gap-1" }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(product.categories, (cat) => {
                                      return openBlock(), createBlock(unref(_sfc_main$f), {
                                        key: cat.id,
                                        variant: "secondary"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(cat.name), 1)
                                        ]),
                                        _: 2
                                      }, 1024);
                                    }), 128))
                                  ])
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$e), null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(formatCurrency(product.base_price)), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$e), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$f), { variant: "outline" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(product.bv || 0), 1)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$e), null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(totalBonus(product)), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$e), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$f), { variant: "outline" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(product.b_retail ? formatCurrency(product.b_retail) : "-"), 1)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$e), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$f), {
                                    variant: product.stock > 0 ? "default" : "destructive"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(product.stock), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["variant"])
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$e), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$f), {
                                    variant: product.is_active ? "default" : "secondary"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(product.is_active ? "Aktif" : "Tidak Aktif"), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["variant"])
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$e), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$g), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$h), { "as-child": "" }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$2), {
                                            variant: "ghost",
                                            size: "icon"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(MoreHorizontal), { class: "h-4 w-4" })
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$i), { align: "end" }, {
                                        default: withCtx(() => [
                                          unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(_sfc_main$j), {
                                            key: 0,
                                            onClick: ($event) => unref(router).visit(`/admin/products/${product.id}/edit`)
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(" Edit ")
                                            ]),
                                            _: 1
                                          }, 8, ["onClick"])) : createCommentVNode("", true),
                                          unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(_sfc_main$j), {
                                            key: 1,
                                            onClick: ($event) => deleteProduct(product.id),
                                            class: "text-destructive"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(" Hapus ")
                                            ]),
                                            _: 1
                                          }, 8, ["onClick"])) : createCommentVNode("", true)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024);
                        }), 128))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (__props.products.last_page > 1) {
              _push2(`<div class="flex items-center justify-between"${_scopeId}><p class="text-sm text-muted-foreground"${_scopeId}> Menampilkan ${ssrInterpolate(__props.products.data.length)} dari ${ssrInterpolate(__props.products.total)} produk </p><div class="flex gap-2"${_scopeId}><!--[-->`);
              ssrRenderList(__props.products.last_page, (page) => {
                _push2(ssrRenderComponent(unref(_sfc_main$2), {
                  key: page,
                  variant: page === __props.products.current_page ? "default" : "outline",
                  size: "sm",
                  onClick: ($event) => unref(router).get(`/admin/products?page=${page}`)
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(page)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(page), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-6rounded-xl p-4 space-y-6 py-6" }, [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("div", null, [
                    createVNode("h2", { class: "text-3xl font-bold tracking-tight" }, "Kelola Produk"),
                    createVNode("p", { class: "text-muted-foreground" }, "Kelola semua produk yang tersedia di toko")
                  ]),
                  unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(_sfc_main$2), {
                    key: 0,
                    onClick: ($event) => unref(router).visit("/admin/products/create")
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Plus), { class: "mr-2 h-4 w-4" }),
                      createTextVNode(" Tambah Produk ")
                    ]),
                    _: 1
                  }, 8, ["onClick"])) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "flex items-center gap-4" }, [
                  createVNode("div", { class: "relative flex-1" }, [
                    createVNode(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
                    createVNode(unref(_sfc_main$3), {
                      modelValue: searchQuery.value,
                      "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                      placeholder: "Cari produk...",
                      class: "pl-10",
                      onKeydown: withKeys(handleSearch, ["enter"])
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode(unref(_sfc_main$4), {
                    modelValue: selectedCategory.value,
                    "onUpdate:modelValue": [($event) => selectedCategory.value = $event, handleSearch]
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$5), { class: "w-[200px]" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$6), { placeholder: "Semua Kategori" })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$8), { value: "all" }, {
                            default: withCtx(() => [
                              createTextVNode("Semua Kategori")
                            ]),
                            _: 1
                          }),
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (category) => {
                            return openBlock(), createBlock(unref(_sfc_main$8), {
                              key: category.id,
                              value: category.id.toString()
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(category.name), 1)
                              ]),
                              _: 2
                            }, 1032, ["value"]);
                          }), 128))
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1032, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(unref(_sfc_main$4), {
                    modelValue: selectedStatus.value,
                    "onUpdate:modelValue": [($event) => selectedStatus.value = $event, handleSearch]
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$5), { class: "w-[150px]" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$6), { placeholder: "Status" })
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
                              createTextVNode("Aktif")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$8), { value: "0" }, {
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
                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(unref(_sfc_main$4), {
                    modelValue: perPage.value,
                    "onUpdate:modelValue": [($event) => perPage.value = $event, handleSearch]
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$5), { class: "w-[100px]" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$6))
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$8), { value: 10 }, {
                            default: withCtx(() => [
                              createTextVNode("10")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$8), { value: 25 }, {
                            default: withCtx(() => [
                              createTextVNode("25")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$8), { value: 50 }, {
                            default: withCtx(() => [
                              createTextVNode("50")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$8), { value: 100 }, {
                            default: withCtx(() => [
                              createTextVNode("100")
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
                createVNode("div", { class: "rounded-md border" }, [
                  createVNode(unref(_sfc_main$9), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$a), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$b), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$2), {
                                    variant: "ghost",
                                    onClick: ($event) => handleSort("sku"),
                                    class: "flex items-center gap-1 p-0 h-auto"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" SKU "),
                                      createVNode(unref(ArrowUpDown), { class: "h-3 w-3" })
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$2), {
                                    variant: "ghost",
                                    onClick: ($event) => handleSort("name"),
                                    class: "flex items-center gap-1 p-0 h-auto"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Nama Produk "),
                                      createVNode(unref(ArrowUpDown), { class: "h-3 w-3" })
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createTextVNode("Kategori")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$2), {
                                    variant: "ghost",
                                    onClick: ($event) => handleSort("base_price"),
                                    class: "flex items-center gap-1 p-0 h-auto"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Harga "),
                                      createVNode(unref(ArrowUpDown), { class: "h-3 w-3" })
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$2), {
                                    variant: "ghost",
                                    onClick: ($event) => handleSort("bv"),
                                    class: "flex items-center gap-1 p-0 h-auto"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" BV "),
                                      createVNode(unref(ArrowUpDown), { class: "h-3 w-3" })
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createTextVNode("Total Bonus")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$2), {
                                    variant: "ghost",
                                    onClick: ($event) => handleSort("b_retail"),
                                    class: "flex items-center gap-1 p-0 h-auto"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" B. Retail "),
                                      createVNode(unref(ArrowUpDown), { class: "h-3 w-3" })
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$2), {
                                    variant: "ghost",
                                    onClick: ($event) => handleSort("stock"),
                                    class: "flex items-center gap-1 p-0 h-auto"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Stok "),
                                      createVNode(unref(ArrowUpDown), { class: "h-3 w-3" })
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createTextVNode("Status")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), { class: "w-[80px]" })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$d), null, {
                        default: withCtx(() => [
                          __props.products.data.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$b), { key: 0 }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$e), {
                                colspan: "10",
                                class: "text-center text-muted-foreground"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Tidak ada produk ditemukan ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })) : createCommentVNode("", true),
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.products.data, (product) => {
                            return openBlock(), createBlock(unref(_sfc_main$b), {
                              key: product.id
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$e), { class: "font-medium" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(product.sku), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(product.name), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "flex flex-wrap gap-1" }, [
                                      (openBlock(true), createBlock(Fragment, null, renderList(product.categories, (cat) => {
                                        return openBlock(), createBlock(unref(_sfc_main$f), {
                                          key: cat.id,
                                          variant: "secondary"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(cat.name), 1)
                                          ]),
                                          _: 2
                                        }, 1024);
                                      }), 128))
                                    ])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(formatCurrency(product.base_price)), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$f), { variant: "outline" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(product.bv || 0), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(totalBonus(product)), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$f), { variant: "outline" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(product.b_retail ? formatCurrency(product.b_retail) : "-"), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$f), {
                                      variant: product.stock > 0 ? "default" : "destructive"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(product.stock), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["variant"])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$f), {
                                      variant: product.is_active ? "default" : "secondary"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(product.is_active ? "Aktif" : "Tidak Aktif"), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["variant"])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$g), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$h), { "as-child": "" }, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$2), {
                                              variant: "ghost",
                                              size: "icon"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(MoreHorizontal), { class: "h-4 w-4" })
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$i), { align: "end" }, {
                                          default: withCtx(() => [
                                            unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(_sfc_main$j), {
                                              key: 0,
                                              onClick: ($event) => unref(router).visit(`/admin/products/${product.id}/edit`)
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(" Edit ")
                                              ]),
                                              _: 1
                                            }, 8, ["onClick"])) : createCommentVNode("", true),
                                            unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(_sfc_main$j), {
                                              key: 1,
                                              onClick: ($event) => deleteProduct(product.id),
                                              class: "text-destructive"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(" Hapus ")
                                              ]),
                                              _: 1
                                            }, 8, ["onClick"])) : createCommentVNode("", true)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                __props.products.last_page > 1 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "flex items-center justify-between"
                }, [
                  createVNode("p", { class: "text-sm text-muted-foreground" }, " Menampilkan " + toDisplayString(__props.products.data.length) + " dari " + toDisplayString(__props.products.total) + " produk ", 1),
                  createVNode("div", { class: "flex gap-2" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.products.last_page, (page) => {
                      return openBlock(), createBlock(unref(_sfc_main$2), {
                        key: page,
                        variant: page === __props.products.current_page ? "default" : "outline",
                        size: "sm",
                        onClick: ($event) => unref(router).get(`/admin/products?page=${page}`)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(page), 1)
                        ]),
                        _: 2
                      }, 1032, ["variant", "onClick"]);
                    }), 128))
                  ])
                ])) : createCommentVNode("", true)
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Products/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
