import { defineComponent, computed, ref, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, toDisplayString, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { usePage, router, Head } from "@inertiajs/vue3";
import { debounce } from "lodash-es";
import { _ as _sfc_main$1 } from "./AppLayout-B9pGpPI9.js";
import { _ as _sfc_main$f } from "./Pagination-DAUeA01Y.js";
import { _ as _sfc_main$2 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$8 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5, c as _sfc_main$6, d as _sfc_main$7 } from "./SelectValue-BUnv4mQg.js";
import { _ as _sfc_main$9, a as _sfc_main$a, b as _sfc_main$b, c as _sfc_main$c, d as _sfc_main$d, e as _sfc_main$e } from "./TableHeader-emcE6QAC.js";
import { Loader2, Download, Search } from "lucide-vue-next";
import "class-variance-authority";
import "./DropdownMenuTrigger-B1v6pHML.js";
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
  __name: "TaxSummaryReport",
  __ssrInlineRender: true,
  props: {
    data: {},
    filters: {}
  },
  setup(__props) {
    const props = __props;
    const page = usePage();
    const baseUrl = computed(() => page.url.split("?")[0]);
    const yearFilter = ref(props.filters.year ? String(props.filters.year) : "all");
    const monthFilter = ref(props.filters.month || "all");
    const searchQuery = ref(props.filters.search || "");
    const isExporting = ref(false);
    const yearOptions = computed(() => {
      const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
      const years = Array.from({ length: 6 }, (_, i) => currentYear - i);
      const selectedYear = props.filters.year;
      if (selectedYear && !years.includes(selectedYear)) {
        years.unshift(selectedYear);
      }
      return years;
    });
    const monthOptions = [
      { value: "all", label: "Semua Bulan" },
      { value: "01", label: "Januari" },
      { value: "02", label: "Februari" },
      { value: "03", label: "Maret" },
      { value: "04", label: "April" },
      { value: "05", label: "Mei" },
      { value: "06", label: "Juni" },
      { value: "07", label: "Juli" },
      { value: "08", label: "Agustus" },
      { value: "09", label: "September" },
      { value: "10", label: "Oktober" },
      { value: "11", label: "November" },
      { value: "12", label: "Desember" }
    ];
    const performSearch = debounce(() => {
      router.get(
        baseUrl.value,
        {
          year: yearFilter.value !== "all" ? yearFilter.value : void 0,
          month: monthFilter.value !== "all" ? monthFilter.value : void 0,
          search: searchQuery.value || void 0,
          per_page: props.data.per_page
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
      yearFilter.value = "all";
      monthFilter.value = "all";
      searchQuery.value = "";
      performSearch();
    };
    const hasActiveFilters = computed(() => {
      return yearFilter.value !== "all" || monthFilter.value !== "all" || searchQuery.value !== "";
    });
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", {
        minimumFractionDigits: 0
      }).format(amount || 0);
    };
    const formatDate = (date) => {
      if (!date) return "-";
      const parsed = new Date(date);
      if (Number.isNaN(parsed.getTime())) return date;
      return parsed.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    };
    const handleExport = async () => {
      isExporting.value = true;
      try {
        const params = new URLSearchParams();
        if (yearFilter.value !== "all") params.append("year", yearFilter.value);
        if (monthFilter.value !== "all") params.append("month", monthFilter.value);
        if (searchQuery.value) params.append("search", searchQuery.value);
        const exportUrl = `${baseUrl.value}/export?${params.toString()}`;
        const link = document.createElement("a");
        link.href = exportUrl;
        link.download = "";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Export error:", error);
        alert("Terjadi kesalahan saat export data");
      } finally {
        isExporting.value = false;
      }
    };
    const paginationFilters = computed(() => ({
      year: yearFilter.value !== "all" ? yearFilter.value : void 0,
      month: monthFilter.value !== "all" ? monthFilter.value : void 0,
      search: searchQuery.value || void 0,
      per_page: props.data.per_page
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Laporan Pajak Ringkasan" }, null, _parent2, _scopeId));
            _push2(`<div class="rounded-xl p-4 space-y-6 py-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="text-3xl font-bold tracking-tight"${_scopeId}>Laporan Pajak Ringkasan</h1><p class="text-muted-foreground"${_scopeId}> Data lengkap laporan PPh21 dan bukti potong pajak. </p></div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              onClick: handleExport,
              disabled: isExporting.value,
              variant: "default",
              class: "gap-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (isExporting.value) {
                    _push3(ssrRenderComponent(unref(Loader2), { class: "h-4 w-4 animate-spin" }, null, _parent3, _scopeId2));
                  } else {
                    _push3(ssrRenderComponent(unref(Download), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                  }
                  _push3(` Export Excel `);
                } else {
                  return [
                    isExporting.value ? (openBlock(), createBlock(unref(Loader2), {
                      key: 0,
                      class: "h-4 w-4 animate-spin"
                    })) : (openBlock(), createBlock(unref(Download), {
                      key: 1,
                      class: "h-4 w-4"
                    })),
                    createTextVNode(" Export Excel ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="mb-4 space-y-4"${_scopeId}><div class="flex flex-wrap items-center gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$3), {
              modelValue: yearFilter.value,
              "onUpdate:modelValue": [($event) => yearFilter.value = $event, handleFilterChange]
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { class: "w-[160px]" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$5), { placeholder: "Semua Tahun" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), { placeholder: "Semua Tahun" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$7), { value: "all" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Semua Tahun`);
                            } else {
                              return [
                                createTextVNode("Semua Tahun")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<!--[-->`);
                        ssrRenderList(yearOptions.value, (option) => {
                          _push4(ssrRenderComponent(unref(_sfc_main$7), {
                            key: option,
                            value: String(option)
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(option)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(option), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          createVNode(unref(_sfc_main$7), { value: "all" }, {
                            default: withCtx(() => [
                              createTextVNode("Semua Tahun")
                            ]),
                            _: 1
                          }),
                          (openBlock(true), createBlock(Fragment, null, renderList(yearOptions.value, (option) => {
                            return openBlock(), createBlock(unref(_sfc_main$7), {
                              key: option,
                              value: String(option)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(option), 1)
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
                    createVNode(unref(_sfc_main$4), { class: "w-[160px]" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$5), { placeholder: "Semua Tahun" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$7), { value: "all" }, {
                          default: withCtx(() => [
                            createTextVNode("Semua Tahun")
                          ]),
                          _: 1
                        }),
                        (openBlock(true), createBlock(Fragment, null, renderList(yearOptions.value, (option) => {
                          return openBlock(), createBlock(unref(_sfc_main$7), {
                            key: option,
                            value: String(option)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(option), 1)
                            ]),
                            _: 2
                          }, 1032, ["value"]);
                        }), 128))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$3), {
              modelValue: monthFilter.value,
              "onUpdate:modelValue": [($event) => monthFilter.value = $event, handleFilterChange]
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { class: "w-[160px]" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$5), { placeholder: "Semua Bulan" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), { placeholder: "Semua Bulan" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(monthOptions, (option) => {
                          _push4(ssrRenderComponent(unref(_sfc_main$7), {
                            key: option.value,
                            value: option.value
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(option.label)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(option.label), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(), createBlock(Fragment, null, renderList(monthOptions, (option) => {
                            return createVNode(unref(_sfc_main$7), {
                              key: option.value,
                              value: option.value
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(option.label), 1)
                              ]),
                              _: 2
                            }, 1032, ["value"]);
                          }), 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$4), { class: "w-[160px]" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$5), { placeholder: "Semua Bulan" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), null, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(monthOptions, (option) => {
                          return createVNode(unref(_sfc_main$7), {
                            key: option.value,
                            value: option.value
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(option.label), 1)
                            ]),
                            _: 2
                          }, 1032, ["value"]);
                        }), 64))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="relative flex-1 max-w-md"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$8), {
              modelValue: searchQuery.value,
              "onUpdate:modelValue": ($event) => searchQuery.value = $event,
              type: "text",
              placeholder: "Cari nama, NPWP, email...",
              class: "pl-10",
              onInput: handleFilterChange
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
            _push2(`</div></div><div class="rounded-md border overflow-x-auto"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$9), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$a), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$b), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$c), { class: "w-[60px]" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`No`);
                                  } else {
                                    return [
                                      createTextVNode("No")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Tanggal`);
                                  } else {
                                    return [
                                      createTextVNode("Tanggal")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Username`);
                                  } else {
                                    return [
                                      createTextVNode("Username")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Nama Member`);
                                  } else {
                                    return [
                                      createTextVNode("Nama Member")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Email`);
                                  } else {
                                    return [
                                      createTextVNode("Email")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`No Telepon`);
                                  } else {
                                    return [
                                      createTextVNode("No Telepon")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Masa Pajak`);
                                  } else {
                                    return [
                                      createTextVNode("Masa Pajak")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Tahun Pajak`);
                                  } else {
                                    return [
                                      createTextVNode("Tahun Pajak")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Pembetulan`);
                                  } else {
                                    return [
                                      createTextVNode("Pembetulan")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`No. Bukti Potong`);
                                  } else {
                                    return [
                                      createTextVNode("No. Bukti Potong")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`NPWP`);
                                  } else {
                                    return [
                                      createTextVNode("NPWP")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`NIK`);
                                  } else {
                                    return [
                                      createTextVNode("NIK")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Nama`);
                                  } else {
                                    return [
                                      createTextVNode("Nama")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Alamat`);
                                  } else {
                                    return [
                                      createTextVNode("Alamat")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`WP Luar Negeri`);
                                  } else {
                                    return [
                                      createTextVNode("WP Luar Negeri")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Kode Negara`);
                                  } else {
                                    return [
                                      createTextVNode("Kode Negara")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Kode Pajak`);
                                  } else {
                                    return [
                                      createTextVNode("Kode Pajak")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), { class: "text-right" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Jumlah Bruto (Rp)`);
                                  } else {
                                    return [
                                      createTextVNode("Jumlah Bruto (Rp)")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), { class: "text-right" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Jumlah DPP (Rp)`);
                                  } else {
                                    return [
                                      createTextVNode("Jumlah DPP (Rp)")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Tanpa NPWP (Rp)`);
                                  } else {
                                    return [
                                      createTextVNode("Tanpa NPWP (Rp)")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), { class: "text-right" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Tarif (Rp)`);
                                  } else {
                                    return [
                                      createTextVNode("Tarif (Rp)")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`PPH21 (Rp)`);
                                  } else {
                                    return [
                                      createTextVNode("PPH21 (Rp)")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`NPWP Pemotong`);
                                  } else {
                                    return [
                                      createTextVNode("NPWP Pemotong")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Nama Pemotong`);
                                  } else {
                                    return [
                                      createTextVNode("Nama Pemotong")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$c), { class: "w-[60px]" }, {
                                  default: withCtx(() => [
                                    createTextVNode("No")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Tanggal")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Username")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Nama Member")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Email")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    createTextVNode("No Telepon")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Masa Pajak")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Tahun Pajak")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Pembetulan")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    createTextVNode("No. Bukti Potong")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    createTextVNode("NPWP")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    createTextVNode("NIK")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Nama")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Alamat")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    createTextVNode("WP Luar Negeri")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Kode Negara")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Kode Pajak")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), { class: "text-right" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Jumlah Bruto (Rp)")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), { class: "text-right" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Jumlah DPP (Rp)")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Tanpa NPWP (Rp)")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), { class: "text-right" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Tarif (Rp)")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    createTextVNode("PPH21 (Rp)")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    createTextVNode("NPWP Pemotong")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Nama Pemotong")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$b), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$c), { class: "w-[60px]" }, {
                                default: withCtx(() => [
                                  createTextVNode("No")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createTextVNode("Tanggal")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createTextVNode("Username")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createTextVNode("Nama Member")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createTextVNode("Email")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createTextVNode("No Telepon")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createTextVNode("Masa Pajak")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createTextVNode("Tahun Pajak")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createTextVNode("Pembetulan")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createTextVNode("No. Bukti Potong")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createTextVNode("NPWP")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createTextVNode("NIK")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createTextVNode("Nama")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createTextVNode("Alamat")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createTextVNode("WP Luar Negeri")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createTextVNode("Kode Negara")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createTextVNode("Kode Pajak")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), { class: "text-right" }, {
                                default: withCtx(() => [
                                  createTextVNode("Jumlah Bruto (Rp)")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), { class: "text-right" }, {
                                default: withCtx(() => [
                                  createTextVNode("Jumlah DPP (Rp)")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createTextVNode("Tanpa NPWP (Rp)")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), { class: "text-right" }, {
                                default: withCtx(() => [
                                  createTextVNode("Tarif (Rp)")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createTextVNode("PPH21 (Rp)")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createTextVNode("NPWP Pemotong")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createTextVNode("Nama Pemotong")
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
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$d), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (props.data.data.length) {
                          _push4(`<!--[-->`);
                          ssrRenderList(props.data.data, (row, index) => {
                            _push4(ssrRenderComponent(unref(_sfc_main$b), { key: index }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(unref(_sfc_main$e), { class: "font-medium" }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(index + 1 + (props.data.current_page - 1) * props.data.per_page)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(index + 1 + (props.data.current_page - 1) * props.data.per_page), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(unref(_sfc_main$e), null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(formatDate(row.tgl))}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(formatDate(row.tgl)), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(unref(_sfc_main$e), null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(row.member?.username || "-")}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(row.member?.username || "-"), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(unref(_sfc_main$e), null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(row.member?.fullname || "-")}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(row.member?.fullname || "-"), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(unref(_sfc_main$e), null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(row.member?.email || "-")}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(row.member?.email || "-"), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(unref(_sfc_main$e), null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(row.member?.phone || "-")}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(row.member?.phone || "-"), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(unref(_sfc_main$e), null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(row.masapajak || "-")}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(row.masapajak || "-"), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(unref(_sfc_main$e), null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(row.tahunpajak || "-")}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(row.tahunpajak || "-"), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(unref(_sfc_main$e), null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(row.pembetulan || "-")}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(row.pembetulan || "-"), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(unref(_sfc_main$e), null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(row.nomorbuktipotong || "-")}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(row.nomorbuktipotong || "-"), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(unref(_sfc_main$e), null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(row.npwp || "-")}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(row.npwp || "-"), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(unref(_sfc_main$e), null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(row.fnik || "-")}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(row.fnik || "-"), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(unref(_sfc_main$e), null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(row.nama || "-")}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(row.nama || "-"), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(unref(_sfc_main$e), {
                                    class: "max-w-[220px] truncate",
                                    title: row.alamat || "-"
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(row.alamat || "-")}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(row.alamat || "-"), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(unref(_sfc_main$e), null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(row.wpluarnegri || "-")}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(row.wpluarnegri || "-"), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(unref(_sfc_main$e), null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(row.kodenegara || "-")}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(row.kodenegara || "-"), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(unref(_sfc_main$e), null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(row.kodepajak || "-")}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(row.kodepajak || "-"), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(unref(_sfc_main$e), { class: "text-right font-medium" }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(formatCurrency(row.jumlahbruto))}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(formatCurrency(row.jumlahbruto)), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(unref(_sfc_main$e), { class: "text-right font-medium" }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(formatCurrency(row.jumlahdpp))}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(formatCurrency(row.jumlahdpp)), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(unref(_sfc_main$e), null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(row.tanpanpwp || "-")}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(row.tanpanpwp || "-"), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(unref(_sfc_main$e), { class: "text-right font-medium" }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(formatCurrency(row.tarif))}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(formatCurrency(row.tarif)), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(unref(_sfc_main$e), null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(row.pph21 || "-")}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(row.pph21 || "-"), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(unref(_sfc_main$e), null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(row.npwppemotong || "-")}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(row.npwppemotong || "-"), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(unref(_sfc_main$e), null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(row.namapemotong || "-")}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(row.namapemotong || "-"), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(unref(_sfc_main$e), { class: "font-medium" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(index + 1 + (props.data.current_page - 1) * props.data.per_page), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$e), null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(formatDate(row.tgl)), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$e), null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(row.member?.username || "-"), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$e), null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(row.member?.fullname || "-"), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$e), null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(row.member?.email || "-"), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$e), null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(row.member?.phone || "-"), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$e), null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(row.masapajak || "-"), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$e), null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(row.tahunpajak || "-"), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$e), null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(row.pembetulan || "-"), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$e), null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(row.nomorbuktipotong || "-"), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$e), null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(row.npwp || "-"), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$e), null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(row.fnik || "-"), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$e), null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(row.nama || "-"), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$e), {
                                      class: "max-w-[220px] truncate",
                                      title: row.alamat || "-"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(row.alamat || "-"), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["title"]),
                                    createVNode(unref(_sfc_main$e), null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(row.wpluarnegri || "-"), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$e), null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(row.kodenegara || "-"), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$e), null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(row.kodepajak || "-"), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$e), { class: "text-right font-medium" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(formatCurrency(row.jumlahbruto)), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$e), { class: "text-right font-medium" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(formatCurrency(row.jumlahdpp)), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$e), null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(row.tanpanpwp || "-"), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$e), { class: "text-right font-medium" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(formatCurrency(row.tarif)), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$e), null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(row.pph21 || "-"), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$e), null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(row.npwppemotong || "-"), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$e), null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(row.namapemotong || "-"), 1)
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
                          _push4(ssrRenderComponent(unref(_sfc_main$b), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(_sfc_main$e), {
                                  colspan: "24",
                                  class: "h-32 text-center text-muted-foreground"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<div class="flex flex-col items-center justify-center gap-2"${_scopeId5}>`);
                                      _push6(ssrRenderComponent(unref(Search), { class: "h-8 w-8 opacity-40" }, null, _parent6, _scopeId5));
                                      _push6(`<p${_scopeId5}>Tidak ada data yang ditemukan</p></div>`);
                                    } else {
                                      return [
                                        createVNode("div", { class: "flex flex-col items-center justify-center gap-2" }, [
                                          createVNode(unref(Search), { class: "h-8 w-8 opacity-40" }),
                                          createVNode("p", null, "Tidak ada data yang ditemukan")
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(_sfc_main$e), {
                                    colspan: "24",
                                    class: "h-32 text-center text-muted-foreground"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "flex flex-col items-center justify-center gap-2" }, [
                                        createVNode(unref(Search), { class: "h-8 w-8 opacity-40" }),
                                        createVNode("p", null, "Tidak ada data yang ditemukan")
                                      ])
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        }
                      } else {
                        return [
                          props.data.data.length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(props.data.data, (row, index) => {
                            return openBlock(), createBlock(unref(_sfc_main$b), { key: index }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$e), { class: "font-medium" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(index + 1 + (props.data.current_page - 1) * props.data.per_page), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(formatDate(row.tgl)), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(row.member?.username || "-"), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(row.member?.fullname || "-"), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(row.member?.email || "-"), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(row.member?.phone || "-"), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(row.masapajak || "-"), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(row.tahunpajak || "-"), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(row.pembetulan || "-"), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(row.nomorbuktipotong || "-"), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(row.npwp || "-"), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(row.fnik || "-"), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(row.nama || "-"), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), {
                                  class: "max-w-[220px] truncate",
                                  title: row.alamat || "-"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(row.alamat || "-"), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["title"]),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(row.wpluarnegri || "-"), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(row.kodenegara || "-"), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(row.kodepajak || "-"), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), { class: "text-right font-medium" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(formatCurrency(row.jumlahbruto)), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), { class: "text-right font-medium" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(formatCurrency(row.jumlahdpp)), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(row.tanpanpwp || "-"), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), { class: "text-right font-medium" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(formatCurrency(row.tarif)), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(row.pph21 || "-"), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(row.npwppemotong || "-"), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(row.namapemotong || "-"), 1)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024);
                          }), 128)) : (openBlock(), createBlock(unref(_sfc_main$b), { key: 1 }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$e), {
                                colspan: "24",
                                class: "h-32 text-center text-muted-foreground"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex flex-col items-center justify-center gap-2" }, [
                                    createVNode(unref(Search), { class: "h-8 w-8 opacity-40" }),
                                    createVNode("p", null, "Tidak ada data yang ditemukan")
                                  ])
                                ]),
                                _: 1
                              })
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
                        createVNode(unref(_sfc_main$b), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$c), { class: "w-[60px]" }, {
                              default: withCtx(() => [
                                createTextVNode("No")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), null, {
                              default: withCtx(() => [
                                createTextVNode("Tanggal")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), null, {
                              default: withCtx(() => [
                                createTextVNode("Username")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), null, {
                              default: withCtx(() => [
                                createTextVNode("Nama Member")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), null, {
                              default: withCtx(() => [
                                createTextVNode("Email")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), null, {
                              default: withCtx(() => [
                                createTextVNode("No Telepon")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), null, {
                              default: withCtx(() => [
                                createTextVNode("Masa Pajak")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), null, {
                              default: withCtx(() => [
                                createTextVNode("Tahun Pajak")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), null, {
                              default: withCtx(() => [
                                createTextVNode("Pembetulan")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), null, {
                              default: withCtx(() => [
                                createTextVNode("No. Bukti Potong")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), null, {
                              default: withCtx(() => [
                                createTextVNode("NPWP")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), null, {
                              default: withCtx(() => [
                                createTextVNode("NIK")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), null, {
                              default: withCtx(() => [
                                createTextVNode("Nama")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), null, {
                              default: withCtx(() => [
                                createTextVNode("Alamat")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), null, {
                              default: withCtx(() => [
                                createTextVNode("WP Luar Negeri")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), null, {
                              default: withCtx(() => [
                                createTextVNode("Kode Negara")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), null, {
                              default: withCtx(() => [
                                createTextVNode("Kode Pajak")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), { class: "text-right" }, {
                              default: withCtx(() => [
                                createTextVNode("Jumlah Bruto (Rp)")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), { class: "text-right" }, {
                              default: withCtx(() => [
                                createTextVNode("Jumlah DPP (Rp)")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), null, {
                              default: withCtx(() => [
                                createTextVNode("Tanpa NPWP (Rp)")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), { class: "text-right" }, {
                              default: withCtx(() => [
                                createTextVNode("Tarif (Rp)")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), null, {
                              default: withCtx(() => [
                                createTextVNode("PPH21 (Rp)")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), null, {
                              default: withCtx(() => [
                                createTextVNode("NPWP Pemotong")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), null, {
                              default: withCtx(() => [
                                createTextVNode("Nama Pemotong")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$d), null, {
                      default: withCtx(() => [
                        props.data.data.length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(props.data.data, (row, index) => {
                          return openBlock(), createBlock(unref(_sfc_main$b), { key: index }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$e), { class: "font-medium" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(index + 1 + (props.data.current_page - 1) * props.data.per_page), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$e), null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(formatDate(row.tgl)), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$e), null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(row.member?.username || "-"), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$e), null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(row.member?.fullname || "-"), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$e), null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(row.member?.email || "-"), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$e), null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(row.member?.phone || "-"), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$e), null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(row.masapajak || "-"), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$e), null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(row.tahunpajak || "-"), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$e), null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(row.pembetulan || "-"), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$e), null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(row.nomorbuktipotong || "-"), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$e), null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(row.npwp || "-"), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$e), null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(row.fnik || "-"), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$e), null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(row.nama || "-"), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$e), {
                                class: "max-w-[220px] truncate",
                                title: row.alamat || "-"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(row.alamat || "-"), 1)
                                ]),
                                _: 2
                              }, 1032, ["title"]),
                              createVNode(unref(_sfc_main$e), null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(row.wpluarnegri || "-"), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$e), null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(row.kodenegara || "-"), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$e), null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(row.kodepajak || "-"), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$e), { class: "text-right font-medium" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(formatCurrency(row.jumlahbruto)), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$e), { class: "text-right font-medium" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(formatCurrency(row.jumlahdpp)), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$e), null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(row.tanpanpwp || "-"), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$e), { class: "text-right font-medium" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(formatCurrency(row.tarif)), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$e), null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(row.pph21 || "-"), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$e), null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(row.npwppemotong || "-"), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$e), null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(row.namapemotong || "-"), 1)
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024);
                        }), 128)) : (openBlock(), createBlock(unref(_sfc_main$b), { key: 1 }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$e), {
                              colspan: "24",
                              class: "h-32 text-center text-muted-foreground"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex flex-col items-center justify-center gap-2" }, [
                                  createVNode(unref(Search), { class: "h-8 w-8 opacity-40" }),
                                  createVNode("p", null, "Tidak ada data yang ditemukan")
                                ])
                              ]),
                              _: 1
                            })
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
              data: __props.data,
              url: baseUrl.value,
              filters: paginationFilters.value,
              perPageOptions: [15, 25, 50, 100, 200]
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Laporan Pajak Ringkasan" }),
              createVNode("div", { class: "rounded-xl p-4 space-y-6 py-6" }, [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("div", null, [
                    createVNode("h1", { class: "text-3xl font-bold tracking-tight" }, "Laporan Pajak Ringkasan"),
                    createVNode("p", { class: "text-muted-foreground" }, " Data lengkap laporan PPh21 dan bukti potong pajak. ")
                  ]),
                  createVNode(unref(_sfc_main$2), {
                    onClick: handleExport,
                    disabled: isExporting.value,
                    variant: "default",
                    class: "gap-2"
                  }, {
                    default: withCtx(() => [
                      isExporting.value ? (openBlock(), createBlock(unref(Loader2), {
                        key: 0,
                        class: "h-4 w-4 animate-spin"
                      })) : (openBlock(), createBlock(unref(Download), {
                        key: 1,
                        class: "h-4 w-4"
                      })),
                      createTextVNode(" Export Excel ")
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ]),
                createVNode("div", { class: "mb-4 space-y-4" }, [
                  createVNode("div", { class: "flex flex-wrap items-center gap-4" }, [
                    createVNode(unref(_sfc_main$3), {
                      modelValue: yearFilter.value,
                      "onUpdate:modelValue": [($event) => yearFilter.value = $event, handleFilterChange]
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$4), { class: "w-[160px]" }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$5), { placeholder: "Semua Tahun" })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$7), { value: "all" }, {
                              default: withCtx(() => [
                                createTextVNode("Semua Tahun")
                              ]),
                              _: 1
                            }),
                            (openBlock(true), createBlock(Fragment, null, renderList(yearOptions.value, (option) => {
                              return openBlock(), createBlock(unref(_sfc_main$7), {
                                key: option,
                                value: String(option)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(option), 1)
                                ]),
                                _: 2
                              }, 1032, ["value"]);
                            }), 128))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(unref(_sfc_main$3), {
                      modelValue: monthFilter.value,
                      "onUpdate:modelValue": [($event) => monthFilter.value = $event, handleFilterChange]
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$4), { class: "w-[160px]" }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$5), { placeholder: "Semua Bulan" })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(Fragment, null, renderList(monthOptions, (option) => {
                              return createVNode(unref(_sfc_main$7), {
                                key: option.value,
                                value: option.value
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(option.label), 1)
                                ]),
                                _: 2
                              }, 1032, ["value"]);
                            }), 64))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode("div", { class: "relative flex-1 max-w-md" }, [
                      createVNode(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
                      createVNode(unref(_sfc_main$8), {
                        modelValue: searchQuery.value,
                        "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                        type: "text",
                        placeholder: "Cari nama, NPWP, email...",
                        class: "pl-10",
                        onInput: handleFilterChange
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                  ])
                ]),
                createVNode("div", { class: "rounded-md border overflow-x-auto" }, [
                  createVNode(unref(_sfc_main$9), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$a), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$b), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$c), { class: "w-[60px]" }, {
                                default: withCtx(() => [
                                  createTextVNode("No")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createTextVNode("Tanggal")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createTextVNode("Username")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createTextVNode("Nama Member")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createTextVNode("Email")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createTextVNode("No Telepon")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createTextVNode("Masa Pajak")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createTextVNode("Tahun Pajak")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createTextVNode("Pembetulan")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createTextVNode("No. Bukti Potong")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createTextVNode("NPWP")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createTextVNode("NIK")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createTextVNode("Nama")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createTextVNode("Alamat")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createTextVNode("WP Luar Negeri")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createTextVNode("Kode Negara")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createTextVNode("Kode Pajak")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), { class: "text-right" }, {
                                default: withCtx(() => [
                                  createTextVNode("Jumlah Bruto (Rp)")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), { class: "text-right" }, {
                                default: withCtx(() => [
                                  createTextVNode("Jumlah DPP (Rp)")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createTextVNode("Tanpa NPWP (Rp)")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), { class: "text-right" }, {
                                default: withCtx(() => [
                                  createTextVNode("Tarif (Rp)")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createTextVNode("PPH21 (Rp)")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createTextVNode("NPWP Pemotong")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createTextVNode("Nama Pemotong")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$d), null, {
                        default: withCtx(() => [
                          props.data.data.length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(props.data.data, (row, index) => {
                            return openBlock(), createBlock(unref(_sfc_main$b), { key: index }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$e), { class: "font-medium" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(index + 1 + (props.data.current_page - 1) * props.data.per_page), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(formatDate(row.tgl)), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(row.member?.username || "-"), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(row.member?.fullname || "-"), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(row.member?.email || "-"), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(row.member?.phone || "-"), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(row.masapajak || "-"), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(row.tahunpajak || "-"), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(row.pembetulan || "-"), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(row.nomorbuktipotong || "-"), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(row.npwp || "-"), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(row.fnik || "-"), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(row.nama || "-"), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), {
                                  class: "max-w-[220px] truncate",
                                  title: row.alamat || "-"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(row.alamat || "-"), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["title"]),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(row.wpluarnegri || "-"), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(row.kodenegara || "-"), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(row.kodepajak || "-"), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), { class: "text-right font-medium" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(formatCurrency(row.jumlahbruto)), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), { class: "text-right font-medium" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(formatCurrency(row.jumlahdpp)), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(row.tanpanpwp || "-"), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), { class: "text-right font-medium" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(formatCurrency(row.tarif)), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(row.pph21 || "-"), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(row.npwppemotong || "-"), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(row.namapemotong || "-"), 1)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024);
                          }), 128)) : (openBlock(), createBlock(unref(_sfc_main$b), { key: 1 }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$e), {
                                colspan: "24",
                                class: "h-32 text-center text-muted-foreground"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex flex-col items-center justify-center gap-2" }, [
                                    createVNode(unref(Search), { class: "h-8 w-8 opacity-40" }),
                                    createVNode("p", null, "Tidak ada data yang ditemukan")
                                  ])
                                ]),
                                _: 1
                              })
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
                  data: __props.data,
                  url: baseUrl.value,
                  filters: paginationFilters.value,
                  perPageOptions: [15, 25, 50, 100, 200]
                }, null, 8, ["data", "url", "filters"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Reports/TaxSummaryReport.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
