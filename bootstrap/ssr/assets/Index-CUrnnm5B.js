import { defineComponent, mergeProps, withCtx, unref, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AppLayout-Cw9UyDBf.js";
import { Head } from "@inertiajs/vue3";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5, d as _sfc_main$6, c as _sfc_main$7 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$8, a as _sfc_main$9, b as _sfc_main$a, c as _sfc_main$b } from "./TabsTrigger-Bvg0QZyC.js";
import { _ as _sfc_main$2 } from "./index-BpQimeTM.js";
import { e as _sfc_main$c } from "./DropdownMenuTrigger-B1v6pHML.js";
import { Info, BookOpen, ShoppingCart, TrendingUp, Wallet, Package, Users, Grid3x3, Settings, ArrowRight, Star, BadgePercent, CheckCircle, AlertCircle, CreditCard, Truck } from "lucide-vue-next";
import "class-variance-authority";
import "./index-SN_CnQ_F.js";
import "reka-ui";
import "clsx";
import "tailwind-merge";
import "./Input-BGi8wCMh.js";
import "@vueuse/core";
import "./index-D9uuAIUh.js";
import "./AvatarImage-DWFQMckn.js";
import "vue-sonner";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Index",
  __ssrInlineRender: true,
  setup(__props) {
    const breadcrumbs = [
      { title: "Dashboard", href: "/admin/dashboard" },
      { title: "Documentation", href: "/admin/documentation" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ breadcrumbs }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="rounded-xl p-4 space-y-6 py-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Head), { title: "Dokumentasi Aplikasi" }, null, _parent2, _scopeId));
            _push2(`<div class="flex flex-col gap-6"${_scopeId}><div class="flex items-start justify-between"${_scopeId}><div class="space-y-1"${_scopeId}><h1 class="text-3xl font-bold tracking-tight"${_scopeId}>Dokumentasi Aplikasi</h1><p class="text-muted-foreground"${_scopeId}> Panduan lengkap penggunaan sistem E-Commerce MLM Puranusa </p></div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              variant: "secondary",
              class: "text-sm"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Info), { class: "w-4 h-4 mr-1" }, null, _parent3, _scopeId2));
                  _push3(` Version 1.0.0 `);
                } else {
                  return [
                    createVNode(unref(Info), { class: "w-4 h-4 mr-1" }),
                    createTextVNode(" Version 1.0.0 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$3), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex items-center gap-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(BookOpen), { class: "w-5 h-5 text-primary" }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Panduan Cepat`);
                            } else {
                              return [
                                createTextVNode("Panduan Cepat")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Memulai menggunakan aplikasi dalam 3 langkah`);
                            } else {
                              return [
                                createTextVNode("Memulai menggunakan aplikasi dalam 3 langkah")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode(unref(BookOpen), { class: "w-5 h-5 text-primary" }),
                            createVNode(unref(_sfc_main$5), null, {
                              default: withCtx(() => [
                                createTextVNode("Panduan Cepat")
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("Memulai menggunakan aplikasi dalam 3 langkah")
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
                        _push4(`<div class="grid gap-4 md:grid-cols-3"${_scopeId3}><div class="flex gap-4 p-4 rounded-lg border bg-card"${_scopeId3}><div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10"${_scopeId3}><span class="text-lg font-bold text-primary"${_scopeId3}>1</span></div><div class="flex-1 space-y-1"${_scopeId3}><h4 class="font-semibold"${_scopeId3}>Login ke Sistem</h4><p class="text-sm text-muted-foreground"${_scopeId3}> Gunakan kredensial admin untuk mengakses dashboard </p></div></div><div class="flex gap-4 p-4 rounded-lg border bg-card"${_scopeId3}><div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10"${_scopeId3}><span class="text-lg font-bold text-primary"${_scopeId3}>2</span></div><div class="flex-1 space-y-1"${_scopeId3}><h4 class="font-semibold"${_scopeId3}>Kelola Konten</h4><p class="text-sm text-muted-foreground"${_scopeId3}> Tambahkan produk, kelola pesanan, dan atur member </p></div></div><div class="flex gap-4 p-4 rounded-lg border bg-card"${_scopeId3}><div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10"${_scopeId3}><span class="text-lg font-bold text-primary"${_scopeId3}>3</span></div><div class="flex-1 space-y-1"${_scopeId3}><h4 class="font-semibold"${_scopeId3}>Monitor &amp; Analisa</h4><p class="text-sm text-muted-foreground"${_scopeId3}> Pantau penjualan, bonus, dan performa jaringan </p></div></div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "grid gap-4 md:grid-cols-3" }, [
                            createVNode("div", { class: "flex gap-4 p-4 rounded-lg border bg-card" }, [
                              createVNode("div", { class: "flex h-10 w-10 items-center justify-center rounded-full bg-primary/10" }, [
                                createVNode("span", { class: "text-lg font-bold text-primary" }, "1")
                              ]),
                              createVNode("div", { class: "flex-1 space-y-1" }, [
                                createVNode("h4", { class: "font-semibold" }, "Login ke Sistem"),
                                createVNode("p", { class: "text-sm text-muted-foreground" }, " Gunakan kredensial admin untuk mengakses dashboard ")
                              ])
                            ]),
                            createVNode("div", { class: "flex gap-4 p-4 rounded-lg border bg-card" }, [
                              createVNode("div", { class: "flex h-10 w-10 items-center justify-center rounded-full bg-primary/10" }, [
                                createVNode("span", { class: "text-lg font-bold text-primary" }, "2")
                              ]),
                              createVNode("div", { class: "flex-1 space-y-1" }, [
                                createVNode("h4", { class: "font-semibold" }, "Kelola Konten"),
                                createVNode("p", { class: "text-sm text-muted-foreground" }, " Tambahkan produk, kelola pesanan, dan atur member ")
                              ])
                            ]),
                            createVNode("div", { class: "flex gap-4 p-4 rounded-lg border bg-card" }, [
                              createVNode("div", { class: "flex h-10 w-10 items-center justify-center rounded-full bg-primary/10" }, [
                                createVNode("span", { class: "text-lg font-bold text-primary" }, "3")
                              ]),
                              createVNode("div", { class: "flex-1 space-y-1" }, [
                                createVNode("h4", { class: "font-semibold" }, "Monitor & Analisa"),
                                createVNode("p", { class: "text-sm text-muted-foreground" }, " Pantau penjualan, bonus, dan performa jaringan ")
                              ])
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode(unref(BookOpen), { class: "w-5 h-5 text-primary" }),
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Panduan Cepat")
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode("Memulai menggunakan aplikasi dalam 3 langkah")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "grid gap-4 md:grid-cols-3" }, [
                          createVNode("div", { class: "flex gap-4 p-4 rounded-lg border bg-card" }, [
                            createVNode("div", { class: "flex h-10 w-10 items-center justify-center rounded-full bg-primary/10" }, [
                              createVNode("span", { class: "text-lg font-bold text-primary" }, "1")
                            ]),
                            createVNode("div", { class: "flex-1 space-y-1" }, [
                              createVNode("h4", { class: "font-semibold" }, "Login ke Sistem"),
                              createVNode("p", { class: "text-sm text-muted-foreground" }, " Gunakan kredensial admin untuk mengakses dashboard ")
                            ])
                          ]),
                          createVNode("div", { class: "flex gap-4 p-4 rounded-lg border bg-card" }, [
                            createVNode("div", { class: "flex h-10 w-10 items-center justify-center rounded-full bg-primary/10" }, [
                              createVNode("span", { class: "text-lg font-bold text-primary" }, "2")
                            ]),
                            createVNode("div", { class: "flex-1 space-y-1" }, [
                              createVNode("h4", { class: "font-semibold" }, "Kelola Konten"),
                              createVNode("p", { class: "text-sm text-muted-foreground" }, " Tambahkan produk, kelola pesanan, dan atur member ")
                            ])
                          ]),
                          createVNode("div", { class: "flex gap-4 p-4 rounded-lg border bg-card" }, [
                            createVNode("div", { class: "flex h-10 w-10 items-center justify-center rounded-full bg-primary/10" }, [
                              createVNode("span", { class: "text-lg font-bold text-primary" }, "3")
                            ]),
                            createVNode("div", { class: "flex-1 space-y-1" }, [
                              createVNode("h4", { class: "font-semibold" }, "Monitor & Analisa"),
                              createVNode("p", { class: "text-sm text-muted-foreground" }, " Pantau penjualan, bonus, dan performa jaringan ")
                            ])
                          ])
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$8), {
              "default-value": "overview",
              class: "w-full"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$9), { class: "grid w-full grid-cols-5" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$a), { value: "overview" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Overview`);
                            } else {
                              return [
                                createTextVNode("Overview")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$a), { value: "ecommerce" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`E-Commerce`);
                            } else {
                              return [
                                createTextVNode("E-Commerce")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$a), { value: "mlm" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`MLM System`);
                            } else {
                              return [
                                createTextVNode("MLM System")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$a), { value: "management" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Manajemen`);
                            } else {
                              return [
                                createTextVNode("Manajemen")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$a), { value: "api" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`API Response`);
                            } else {
                              return [
                                createTextVNode("API Response")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$a), { value: "overview" }, {
                            default: withCtx(() => [
                              createTextVNode("Overview")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$a), { value: "ecommerce" }, {
                            default: withCtx(() => [
                              createTextVNode("E-Commerce")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$a), { value: "mlm" }, {
                            default: withCtx(() => [
                              createTextVNode("MLM System")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$a), { value: "management" }, {
                            default: withCtx(() => [
                              createTextVNode("Manajemen")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$a), { value: "api" }, {
                            default: withCtx(() => [
                              createTextVNode("API Response")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$b), {
                    value: "overview",
                    class: "space-y-4"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$3), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$4), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$5), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Tentang Aplikasi`);
                                        } else {
                                          return [
                                            createTextVNode("Tentang Aplikasi")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$6), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Sistem E-Commerce dengan fitur Multi-Level Marketing`);
                                        } else {
                                          return [
                                            createTextVNode("Sistem E-Commerce dengan fitur Multi-Level Marketing")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$5), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Tentang Aplikasi")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$6), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Sistem E-Commerce dengan fitur Multi-Level Marketing")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$7), { class: "space-y-6" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div${_scopeId5}><h3 class="text-lg font-semibold mb-3"${_scopeId5}>Fitur Utama</h3><div class="grid gap-3 md:grid-cols-2"${_scopeId5}><div class="flex items-start gap-3 p-3 rounded-lg border"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(ShoppingCart), { class: "w-5 h-5 text-primary mt-0.5" }, null, _parent6, _scopeId5));
                                    _push6(`<div${_scopeId5}><h4 class="font-medium"${_scopeId5}>E-Commerce Lengkap</h4><p class="text-sm text-muted-foreground"${_scopeId5}> Manajemen produk, kategori, keranjang, wishlist, review, dan promosi </p></div></div><div class="flex items-start gap-3 p-3 rounded-lg border"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(TrendingUp), { class: "w-5 h-5 text-primary mt-0.5" }, null, _parent6, _scopeId5));
                                    _push6(`<div${_scopeId5}><h4 class="font-medium"${_scopeId5}>Sistem MLM Binary &amp; Matrix</h4><p class="text-sm text-muted-foreground"${_scopeId5}> Jaringan binary tree dan matrix dengan bonus otomatis </p></div></div><div class="flex items-start gap-3 p-3 rounded-lg border"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(Wallet), { class: "w-5 h-5 text-primary mt-0.5" }, null, _parent6, _scopeId5));
                                    _push6(`<div${_scopeId5}><h4 class="font-medium"${_scopeId5}>E-Wallet Terintegrasi</h4><p class="text-sm text-muted-foreground"${_scopeId5}> Sistem wallet dengan top-up dan withdrawal otomatis </p></div></div><div class="flex items-start gap-3 p-3 rounded-lg border"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(Package), { class: "w-5 h-5 text-primary mt-0.5" }, null, _parent6, _scopeId5));
                                    _push6(`<div${_scopeId5}><h4 class="font-medium"${_scopeId5}>Manajemen Order</h4><p class="text-sm text-muted-foreground"${_scopeId5}> Tracking pesanan, pengiriman, retur &amp; refund lengkap </p></div></div></div></div>`);
                                  } else {
                                    return [
                                      createVNode("div", null, [
                                        createVNode("h3", { class: "text-lg font-semibold mb-3" }, "Fitur Utama"),
                                        createVNode("div", { class: "grid gap-3 md:grid-cols-2" }, [
                                          createVNode("div", { class: "flex items-start gap-3 p-3 rounded-lg border" }, [
                                            createVNode(unref(ShoppingCart), { class: "w-5 h-5 text-primary mt-0.5" }),
                                            createVNode("div", null, [
                                              createVNode("h4", { class: "font-medium" }, "E-Commerce Lengkap"),
                                              createVNode("p", { class: "text-sm text-muted-foreground" }, " Manajemen produk, kategori, keranjang, wishlist, review, dan promosi ")
                                            ])
                                          ]),
                                          createVNode("div", { class: "flex items-start gap-3 p-3 rounded-lg border" }, [
                                            createVNode(unref(TrendingUp), { class: "w-5 h-5 text-primary mt-0.5" }),
                                            createVNode("div", null, [
                                              createVNode("h4", { class: "font-medium" }, "Sistem MLM Binary & Matrix"),
                                              createVNode("p", { class: "text-sm text-muted-foreground" }, " Jaringan binary tree dan matrix dengan bonus otomatis ")
                                            ])
                                          ]),
                                          createVNode("div", { class: "flex items-start gap-3 p-3 rounded-lg border" }, [
                                            createVNode(unref(Wallet), { class: "w-5 h-5 text-primary mt-0.5" }),
                                            createVNode("div", null, [
                                              createVNode("h4", { class: "font-medium" }, "E-Wallet Terintegrasi"),
                                              createVNode("p", { class: "text-sm text-muted-foreground" }, " Sistem wallet dengan top-up dan withdrawal otomatis ")
                                            ])
                                          ]),
                                          createVNode("div", { class: "flex items-start gap-3 p-3 rounded-lg border" }, [
                                            createVNode(unref(Package), { class: "w-5 h-5 text-primary mt-0.5" }),
                                            createVNode("div", null, [
                                              createVNode("h4", { class: "font-medium" }, "Manajemen Order"),
                                              createVNode("p", { class: "text-sm text-muted-foreground" }, " Tracking pesanan, pengiriman, retur & refund lengkap ")
                                            ])
                                          ])
                                        ])
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$4), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$5), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Tentang Aplikasi")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$6), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Sistem E-Commerce dengan fitur Multi-Level Marketing")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$7), { class: "space-y-6" }, {
                                  default: withCtx(() => [
                                    createVNode("div", null, [
                                      createVNode("h3", { class: "text-lg font-semibold mb-3" }, "Fitur Utama"),
                                      createVNode("div", { class: "grid gap-3 md:grid-cols-2" }, [
                                        createVNode("div", { class: "flex items-start gap-3 p-3 rounded-lg border" }, [
                                          createVNode(unref(ShoppingCart), { class: "w-5 h-5 text-primary mt-0.5" }),
                                          createVNode("div", null, [
                                            createVNode("h4", { class: "font-medium" }, "E-Commerce Lengkap"),
                                            createVNode("p", { class: "text-sm text-muted-foreground" }, " Manajemen produk, kategori, keranjang, wishlist, review, dan promosi ")
                                          ])
                                        ]),
                                        createVNode("div", { class: "flex items-start gap-3 p-3 rounded-lg border" }, [
                                          createVNode(unref(TrendingUp), { class: "w-5 h-5 text-primary mt-0.5" }),
                                          createVNode("div", null, [
                                            createVNode("h4", { class: "font-medium" }, "Sistem MLM Binary & Matrix"),
                                            createVNode("p", { class: "text-sm text-muted-foreground" }, " Jaringan binary tree dan matrix dengan bonus otomatis ")
                                          ])
                                        ]),
                                        createVNode("div", { class: "flex items-start gap-3 p-3 rounded-lg border" }, [
                                          createVNode(unref(Wallet), { class: "w-5 h-5 text-primary mt-0.5" }),
                                          createVNode("div", null, [
                                            createVNode("h4", { class: "font-medium" }, "E-Wallet Terintegrasi"),
                                            createVNode("p", { class: "text-sm text-muted-foreground" }, " Sistem wallet dengan top-up dan withdrawal otomatis ")
                                          ])
                                        ]),
                                        createVNode("div", { class: "flex items-start gap-3 p-3 rounded-lg border" }, [
                                          createVNode(unref(Package), { class: "w-5 h-5 text-primary mt-0.5" }),
                                          createVNode("div", null, [
                                            createVNode("h4", { class: "font-medium" }, "Manajemen Order"),
                                            createVNode("p", { class: "text-sm text-muted-foreground" }, " Tracking pesanan, pengiriman, retur & refund lengkap ")
                                          ])
                                        ])
                                      ])
                                    ])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$3), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$4), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$5), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Struktur Menu`);
                                        } else {
                                          return [
                                            createTextVNode("Struktur Menu")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$6), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Navigasi dan akses fitur sistem`);
                                        } else {
                                          return [
                                            createTextVNode("Navigasi dan akses fitur sistem")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$5), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Struktur Menu")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$6), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Navigasi dan akses fitur sistem")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$7), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="space-y-3"${_scopeId5}><div class="flex items-center gap-3 p-3 rounded-lg border"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(Users), { class: "w-5 h-5 text-primary" }, null, _parent6, _scopeId5));
                                    _push6(`<div class="flex-1"${_scopeId5}><h4 class="font-medium"${_scopeId5}>Kelola</h4><p class="text-sm text-muted-foreground"${_scopeId5}>User admin dan data pelanggan</p></div></div><div class="flex items-center gap-3 p-3 rounded-lg border"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(ShoppingCart), { class: "w-5 h-5 text-primary" }, null, _parent6, _scopeId5));
                                    _push6(`<div class="flex-1"${_scopeId5}><h4 class="font-medium"${_scopeId5}>E-Commerce</h4><p class="text-sm text-muted-foreground"${_scopeId5}> Produk, kategori, keranjang, wishlist, review, dan promosi </p></div></div><div class="flex items-center gap-3 p-3 rounded-lg border"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(Package), { class: "w-5 h-5 text-primary" }, null, _parent6, _scopeId5));
                                    _push6(`<div class="flex-1"${_scopeId5}><h4 class="font-medium"${_scopeId5}>Pembelian</h4><p class="text-sm text-muted-foreground"${_scopeId5}> Pesanan, pembayaran, pengiriman, dan retur </p></div></div><div class="flex items-center gap-3 p-3 rounded-lg border"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(TrendingUp), { class: "w-5 h-5 text-primary" }, null, _parent6, _scopeId5));
                                    _push6(`<div class="flex-1"${_scopeId5}><h4 class="font-medium"${_scopeId5}>Bonus &amp; Komisi MLM</h4><p class="text-sm text-muted-foreground"${_scopeId5}> Bonus umum, matching, pairing, dan sponsor </p></div></div><div class="flex items-center gap-3 p-3 rounded-lg border"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(Wallet), { class: "w-5 h-5 text-primary" }, null, _parent6, _scopeId5));
                                    _push6(`<div class="flex-1"${_scopeId5}><h4 class="font-medium"${_scopeId5}>E-Wallet</h4><p class="text-sm text-muted-foreground"${_scopeId5}> Saldo, transaksi, top-up, dan withdrawal </p></div></div><div class="flex items-center gap-3 p-3 rounded-lg border"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(Grid3x3), { class: "w-5 h-5 text-primary" }, null, _parent6, _scopeId5));
                                    _push6(`<div class="flex-1"${_scopeId5}><h4 class="font-medium"${_scopeId5}>Jaringan MLM</h4><p class="text-sm text-muted-foreground"${_scopeId5}> Binary tree dan matrix network visualization </p></div></div><div class="flex items-center gap-3 p-3 rounded-lg border"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(Settings), { class: "w-5 h-5 text-primary" }, null, _parent6, _scopeId5));
                                    _push6(`<div class="flex-1"${_scopeId5}><h4 class="font-medium"${_scopeId5}>Pengaturan</h4><p class="text-sm text-muted-foreground"${_scopeId5}> Alamat, payment, kurir, dan newsletter </p></div></div></div>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "space-y-3" }, [
                                        createVNode("div", { class: "flex items-center gap-3 p-3 rounded-lg border" }, [
                                          createVNode(unref(Users), { class: "w-5 h-5 text-primary" }),
                                          createVNode("div", { class: "flex-1" }, [
                                            createVNode("h4", { class: "font-medium" }, "Kelola"),
                                            createVNode("p", { class: "text-sm text-muted-foreground" }, "User admin dan data pelanggan")
                                          ])
                                        ]),
                                        createVNode("div", { class: "flex items-center gap-3 p-3 rounded-lg border" }, [
                                          createVNode(unref(ShoppingCart), { class: "w-5 h-5 text-primary" }),
                                          createVNode("div", { class: "flex-1" }, [
                                            createVNode("h4", { class: "font-medium" }, "E-Commerce"),
                                            createVNode("p", { class: "text-sm text-muted-foreground" }, " Produk, kategori, keranjang, wishlist, review, dan promosi ")
                                          ])
                                        ]),
                                        createVNode("div", { class: "flex items-center gap-3 p-3 rounded-lg border" }, [
                                          createVNode(unref(Package), { class: "w-5 h-5 text-primary" }),
                                          createVNode("div", { class: "flex-1" }, [
                                            createVNode("h4", { class: "font-medium" }, "Pembelian"),
                                            createVNode("p", { class: "text-sm text-muted-foreground" }, " Pesanan, pembayaran, pengiriman, dan retur ")
                                          ])
                                        ]),
                                        createVNode("div", { class: "flex items-center gap-3 p-3 rounded-lg border" }, [
                                          createVNode(unref(TrendingUp), { class: "w-5 h-5 text-primary" }),
                                          createVNode("div", { class: "flex-1" }, [
                                            createVNode("h4", { class: "font-medium" }, "Bonus & Komisi MLM"),
                                            createVNode("p", { class: "text-sm text-muted-foreground" }, " Bonus umum, matching, pairing, dan sponsor ")
                                          ])
                                        ]),
                                        createVNode("div", { class: "flex items-center gap-3 p-3 rounded-lg border" }, [
                                          createVNode(unref(Wallet), { class: "w-5 h-5 text-primary" }),
                                          createVNode("div", { class: "flex-1" }, [
                                            createVNode("h4", { class: "font-medium" }, "E-Wallet"),
                                            createVNode("p", { class: "text-sm text-muted-foreground" }, " Saldo, transaksi, top-up, dan withdrawal ")
                                          ])
                                        ]),
                                        createVNode("div", { class: "flex items-center gap-3 p-3 rounded-lg border" }, [
                                          createVNode(unref(Grid3x3), { class: "w-5 h-5 text-primary" }),
                                          createVNode("div", { class: "flex-1" }, [
                                            createVNode("h4", { class: "font-medium" }, "Jaringan MLM"),
                                            createVNode("p", { class: "text-sm text-muted-foreground" }, " Binary tree dan matrix network visualization ")
                                          ])
                                        ]),
                                        createVNode("div", { class: "flex items-center gap-3 p-3 rounded-lg border" }, [
                                          createVNode(unref(Settings), { class: "w-5 h-5 text-primary" }),
                                          createVNode("div", { class: "flex-1" }, [
                                            createVNode("h4", { class: "font-medium" }, "Pengaturan"),
                                            createVNode("p", { class: "text-sm text-muted-foreground" }, " Alamat, payment, kurir, dan newsletter ")
                                          ])
                                        ])
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$4), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$5), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Struktur Menu")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$6), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Navigasi dan akses fitur sistem")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$7), null, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "space-y-3" }, [
                                      createVNode("div", { class: "flex items-center gap-3 p-3 rounded-lg border" }, [
                                        createVNode(unref(Users), { class: "w-5 h-5 text-primary" }),
                                        createVNode("div", { class: "flex-1" }, [
                                          createVNode("h4", { class: "font-medium" }, "Kelola"),
                                          createVNode("p", { class: "text-sm text-muted-foreground" }, "User admin dan data pelanggan")
                                        ])
                                      ]),
                                      createVNode("div", { class: "flex items-center gap-3 p-3 rounded-lg border" }, [
                                        createVNode(unref(ShoppingCart), { class: "w-5 h-5 text-primary" }),
                                        createVNode("div", { class: "flex-1" }, [
                                          createVNode("h4", { class: "font-medium" }, "E-Commerce"),
                                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Produk, kategori, keranjang, wishlist, review, dan promosi ")
                                        ])
                                      ]),
                                      createVNode("div", { class: "flex items-center gap-3 p-3 rounded-lg border" }, [
                                        createVNode(unref(Package), { class: "w-5 h-5 text-primary" }),
                                        createVNode("div", { class: "flex-1" }, [
                                          createVNode("h4", { class: "font-medium" }, "Pembelian"),
                                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Pesanan, pembayaran, pengiriman, dan retur ")
                                        ])
                                      ]),
                                      createVNode("div", { class: "flex items-center gap-3 p-3 rounded-lg border" }, [
                                        createVNode(unref(TrendingUp), { class: "w-5 h-5 text-primary" }),
                                        createVNode("div", { class: "flex-1" }, [
                                          createVNode("h4", { class: "font-medium" }, "Bonus & Komisi MLM"),
                                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Bonus umum, matching, pairing, dan sponsor ")
                                        ])
                                      ]),
                                      createVNode("div", { class: "flex items-center gap-3 p-3 rounded-lg border" }, [
                                        createVNode(unref(Wallet), { class: "w-5 h-5 text-primary" }),
                                        createVNode("div", { class: "flex-1" }, [
                                          createVNode("h4", { class: "font-medium" }, "E-Wallet"),
                                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Saldo, transaksi, top-up, dan withdrawal ")
                                        ])
                                      ]),
                                      createVNode("div", { class: "flex items-center gap-3 p-3 rounded-lg border" }, [
                                        createVNode(unref(Grid3x3), { class: "w-5 h-5 text-primary" }),
                                        createVNode("div", { class: "flex-1" }, [
                                          createVNode("h4", { class: "font-medium" }, "Jaringan MLM"),
                                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Binary tree dan matrix network visualization ")
                                        ])
                                      ]),
                                      createVNode("div", { class: "flex items-center gap-3 p-3 rounded-lg border" }, [
                                        createVNode(unref(Settings), { class: "w-5 h-5 text-primary" }),
                                        createVNode("div", { class: "flex-1" }, [
                                          createVNode("h4", { class: "font-medium" }, "Pengaturan"),
                                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Alamat, payment, kurir, dan newsletter ")
                                        ])
                                      ])
                                    ])
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
                          createVNode(unref(_sfc_main$3), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$4), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$5), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Tentang Aplikasi")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$6), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Sistem E-Commerce dengan fitur Multi-Level Marketing")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$7), { class: "space-y-6" }, {
                                default: withCtx(() => [
                                  createVNode("div", null, [
                                    createVNode("h3", { class: "text-lg font-semibold mb-3" }, "Fitur Utama"),
                                    createVNode("div", { class: "grid gap-3 md:grid-cols-2" }, [
                                      createVNode("div", { class: "flex items-start gap-3 p-3 rounded-lg border" }, [
                                        createVNode(unref(ShoppingCart), { class: "w-5 h-5 text-primary mt-0.5" }),
                                        createVNode("div", null, [
                                          createVNode("h4", { class: "font-medium" }, "E-Commerce Lengkap"),
                                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Manajemen produk, kategori, keranjang, wishlist, review, dan promosi ")
                                        ])
                                      ]),
                                      createVNode("div", { class: "flex items-start gap-3 p-3 rounded-lg border" }, [
                                        createVNode(unref(TrendingUp), { class: "w-5 h-5 text-primary mt-0.5" }),
                                        createVNode("div", null, [
                                          createVNode("h4", { class: "font-medium" }, "Sistem MLM Binary & Matrix"),
                                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Jaringan binary tree dan matrix dengan bonus otomatis ")
                                        ])
                                      ]),
                                      createVNode("div", { class: "flex items-start gap-3 p-3 rounded-lg border" }, [
                                        createVNode(unref(Wallet), { class: "w-5 h-5 text-primary mt-0.5" }),
                                        createVNode("div", null, [
                                          createVNode("h4", { class: "font-medium" }, "E-Wallet Terintegrasi"),
                                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Sistem wallet dengan top-up dan withdrawal otomatis ")
                                        ])
                                      ]),
                                      createVNode("div", { class: "flex items-start gap-3 p-3 rounded-lg border" }, [
                                        createVNode(unref(Package), { class: "w-5 h-5 text-primary mt-0.5" }),
                                        createVNode("div", null, [
                                          createVNode("h4", { class: "font-medium" }, "Manajemen Order"),
                                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Tracking pesanan, pengiriman, retur & refund lengkap ")
                                        ])
                                      ])
                                    ])
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$3), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$4), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$5), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Struktur Menu")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$6), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Navigasi dan akses fitur sistem")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$7), null, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "space-y-3" }, [
                                    createVNode("div", { class: "flex items-center gap-3 p-3 rounded-lg border" }, [
                                      createVNode(unref(Users), { class: "w-5 h-5 text-primary" }),
                                      createVNode("div", { class: "flex-1" }, [
                                        createVNode("h4", { class: "font-medium" }, "Kelola"),
                                        createVNode("p", { class: "text-sm text-muted-foreground" }, "User admin dan data pelanggan")
                                      ])
                                    ]),
                                    createVNode("div", { class: "flex items-center gap-3 p-3 rounded-lg border" }, [
                                      createVNode(unref(ShoppingCart), { class: "w-5 h-5 text-primary" }),
                                      createVNode("div", { class: "flex-1" }, [
                                        createVNode("h4", { class: "font-medium" }, "E-Commerce"),
                                        createVNode("p", { class: "text-sm text-muted-foreground" }, " Produk, kategori, keranjang, wishlist, review, dan promosi ")
                                      ])
                                    ]),
                                    createVNode("div", { class: "flex items-center gap-3 p-3 rounded-lg border" }, [
                                      createVNode(unref(Package), { class: "w-5 h-5 text-primary" }),
                                      createVNode("div", { class: "flex-1" }, [
                                        createVNode("h4", { class: "font-medium" }, "Pembelian"),
                                        createVNode("p", { class: "text-sm text-muted-foreground" }, " Pesanan, pembayaran, pengiriman, dan retur ")
                                      ])
                                    ]),
                                    createVNode("div", { class: "flex items-center gap-3 p-3 rounded-lg border" }, [
                                      createVNode(unref(TrendingUp), { class: "w-5 h-5 text-primary" }),
                                      createVNode("div", { class: "flex-1" }, [
                                        createVNode("h4", { class: "font-medium" }, "Bonus & Komisi MLM"),
                                        createVNode("p", { class: "text-sm text-muted-foreground" }, " Bonus umum, matching, pairing, dan sponsor ")
                                      ])
                                    ]),
                                    createVNode("div", { class: "flex items-center gap-3 p-3 rounded-lg border" }, [
                                      createVNode(unref(Wallet), { class: "w-5 h-5 text-primary" }),
                                      createVNode("div", { class: "flex-1" }, [
                                        createVNode("h4", { class: "font-medium" }, "E-Wallet"),
                                        createVNode("p", { class: "text-sm text-muted-foreground" }, " Saldo, transaksi, top-up, dan withdrawal ")
                                      ])
                                    ]),
                                    createVNode("div", { class: "flex items-center gap-3 p-3 rounded-lg border" }, [
                                      createVNode(unref(Grid3x3), { class: "w-5 h-5 text-primary" }),
                                      createVNode("div", { class: "flex-1" }, [
                                        createVNode("h4", { class: "font-medium" }, "Jaringan MLM"),
                                        createVNode("p", { class: "text-sm text-muted-foreground" }, " Binary tree dan matrix network visualization ")
                                      ])
                                    ]),
                                    createVNode("div", { class: "flex items-center gap-3 p-3 rounded-lg border" }, [
                                      createVNode(unref(Settings), { class: "w-5 h-5 text-primary" }),
                                      createVNode("div", { class: "flex-1" }, [
                                        createVNode("h4", { class: "font-medium" }, "Pengaturan"),
                                        createVNode("p", { class: "text-sm text-muted-foreground" }, " Alamat, payment, kurir, dan newsletter ")
                                      ])
                                    ])
                                  ])
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
                  _push3(ssrRenderComponent(unref(_sfc_main$b), {
                    value: "ecommerce",
                    class: "space-y-4"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$3), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$4), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$5), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Manajemen Produk`);
                                        } else {
                                          return [
                                            createTextVNode("Manajemen Produk")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$6), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Kelola produk, kategori, dan promosi`);
                                        } else {
                                          return [
                                            createTextVNode("Kelola produk, kategori, dan promosi")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$5), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Manajemen Produk")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$6), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Kelola produk, kategori, dan promosi")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$7), { class: "space-y-4" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="space-y-3"${_scopeId5}><div${_scopeId5}><h4 class="font-semibold mb-2 flex items-center gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(Package), { class: "w-4 h-4" }, null, _parent6, _scopeId5));
                                    _push6(` Produk </h4><ul class="space-y-2 ml-6"${_scopeId5}><li class="text-sm flex items-start gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }, null, _parent6, _scopeId5));
                                    _push6(`<span${_scopeId5}><strong${_scopeId5}>Tambah Produk:</strong> Klik tombol &quot;Tambah Produk&quot;, isi nama, deskripsi, harga, stok, berat, dan kategori </span></li><li class="text-sm flex items-start gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }, null, _parent6, _scopeId5));
                                    _push6(`<span${_scopeId5}><strong${_scopeId5}>Upload Gambar:</strong> Maksimal 5 gambar per produk, gambar pertama akan menjadi gambar utama </span></li><li class="text-sm flex items-start gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }, null, _parent6, _scopeId5));
                                    _push6(`<span${_scopeId5}><strong${_scopeId5}>Edit/Hapus:</strong> Klik icon pensil untuk edit atau icon trash untuk hapus produk </span></li><li class="text-sm flex items-start gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }, null, _parent6, _scopeId5));
                                    _push6(`<span${_scopeId5}><strong${_scopeId5}>Status:</strong> Toggle aktif/non-aktif untuk menampilkan/ menyembunyikan produk di store </span></li></ul></div>`);
                                    _push6(ssrRenderComponent(unref(_sfc_main$c), null, null, _parent6, _scopeId5));
                                    _push6(`<div${_scopeId5}><h4 class="font-semibold mb-2 flex items-center gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(Star), { class: "w-4 h-4" }, null, _parent6, _scopeId5));
                                    _push6(` Review Produk </h4><ul class="space-y-2 ml-6"${_scopeId5}><li class="text-sm flex items-start gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }, null, _parent6, _scopeId5));
                                    _push6(`<span${_scopeId5}>Customer dapat memberikan rating 1-5 bintang dan komentar</span></li><li class="text-sm flex items-start gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }, null, _parent6, _scopeId5));
                                    _push6(`<span${_scopeId5}>Admin dapat approve/reject review sebelum ditampilkan</span></li><li class="text-sm flex items-start gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }, null, _parent6, _scopeId5));
                                    _push6(`<span${_scopeId5}>Review hanya bisa diberikan setelah pesanan selesai (COMPLETED)</span></li></ul></div>`);
                                    _push6(ssrRenderComponent(unref(_sfc_main$c), null, null, _parent6, _scopeId5));
                                    _push6(`<div${_scopeId5}><h4 class="font-semibold mb-2 flex items-center gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(BadgePercent), { class: "w-4 h-4" }, null, _parent6, _scopeId5));
                                    _push6(` Promosi &amp; Diskon </h4><ul class="space-y-2 ml-6"${_scopeId5}><li class="text-sm flex items-start gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }, null, _parent6, _scopeId5));
                                    _push6(`<span${_scopeId5}><strong${_scopeId5}>Tipe Diskon:</strong> Persentase (%) atau Nominal (Rp) </span></li><li class="text-sm flex items-start gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }, null, _parent6, _scopeId5));
                                    _push6(`<span${_scopeId5}><strong${_scopeId5}>Periode:</strong> Set tanggal mulai dan berakhir promosi </span></li><li class="text-sm flex items-start gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }, null, _parent6, _scopeId5));
                                    _push6(`<span${_scopeId5}><strong${_scopeId5}>Minimum Order:</strong> Opsional, set minimal pembelian untuk diskon </span></li></ul></div></div>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "space-y-3" }, [
                                        createVNode("div", null, [
                                          createVNode("h4", { class: "font-semibold mb-2 flex items-center gap-2" }, [
                                            createVNode(unref(Package), { class: "w-4 h-4" }),
                                            createTextVNode(" Produk ")
                                          ]),
                                          createVNode("ul", { class: "space-y-2 ml-6" }, [
                                            createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                              createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                              createVNode("span", null, [
                                                createVNode("strong", null, "Tambah Produk:"),
                                                createTextVNode(' Klik tombol "Tambah Produk", isi nama, deskripsi, harga, stok, berat, dan kategori ')
                                              ])
                                            ]),
                                            createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                              createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                              createVNode("span", null, [
                                                createVNode("strong", null, "Upload Gambar:"),
                                                createTextVNode(" Maksimal 5 gambar per produk, gambar pertama akan menjadi gambar utama ")
                                              ])
                                            ]),
                                            createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                              createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                              createVNode("span", null, [
                                                createVNode("strong", null, "Edit/Hapus:"),
                                                createTextVNode(" Klik icon pensil untuk edit atau icon trash untuk hapus produk ")
                                              ])
                                            ]),
                                            createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                              createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                              createVNode("span", null, [
                                                createVNode("strong", null, "Status:"),
                                                createTextVNode(" Toggle aktif/non-aktif untuk menampilkan/ menyembunyikan produk di store ")
                                              ])
                                            ])
                                          ])
                                        ]),
                                        createVNode(unref(_sfc_main$c)),
                                        createVNode("div", null, [
                                          createVNode("h4", { class: "font-semibold mb-2 flex items-center gap-2" }, [
                                            createVNode(unref(Star), { class: "w-4 h-4" }),
                                            createTextVNode(" Review Produk ")
                                          ]),
                                          createVNode("ul", { class: "space-y-2 ml-6" }, [
                                            createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                              createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                              createVNode("span", null, "Customer dapat memberikan rating 1-5 bintang dan komentar")
                                            ]),
                                            createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                              createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                              createVNode("span", null, "Admin dapat approve/reject review sebelum ditampilkan")
                                            ]),
                                            createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                              createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                              createVNode("span", null, "Review hanya bisa diberikan setelah pesanan selesai (COMPLETED)")
                                            ])
                                          ])
                                        ]),
                                        createVNode(unref(_sfc_main$c)),
                                        createVNode("div", null, [
                                          createVNode("h4", { class: "font-semibold mb-2 flex items-center gap-2" }, [
                                            createVNode(unref(BadgePercent), { class: "w-4 h-4" }),
                                            createTextVNode(" Promosi & Diskon ")
                                          ]),
                                          createVNode("ul", { class: "space-y-2 ml-6" }, [
                                            createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                              createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                              createVNode("span", null, [
                                                createVNode("strong", null, "Tipe Diskon:"),
                                                createTextVNode(" Persentase (%) atau Nominal (Rp) ")
                                              ])
                                            ]),
                                            createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                              createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                              createVNode("span", null, [
                                                createVNode("strong", null, "Periode:"),
                                                createTextVNode(" Set tanggal mulai dan berakhir promosi ")
                                              ])
                                            ]),
                                            createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                              createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                              createVNode("span", null, [
                                                createVNode("strong", null, "Minimum Order:"),
                                                createTextVNode(" Opsional, set minimal pembelian untuk diskon ")
                                              ])
                                            ])
                                          ])
                                        ])
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$4), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$5), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Manajemen Produk")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$6), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Kelola produk, kategori, dan promosi")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "space-y-3" }, [
                                      createVNode("div", null, [
                                        createVNode("h4", { class: "font-semibold mb-2 flex items-center gap-2" }, [
                                          createVNode(unref(Package), { class: "w-4 h-4" }),
                                          createTextVNode(" Produk ")
                                        ]),
                                        createVNode("ul", { class: "space-y-2 ml-6" }, [
                                          createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                            createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                            createVNode("span", null, [
                                              createVNode("strong", null, "Tambah Produk:"),
                                              createTextVNode(' Klik tombol "Tambah Produk", isi nama, deskripsi, harga, stok, berat, dan kategori ')
                                            ])
                                          ]),
                                          createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                            createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                            createVNode("span", null, [
                                              createVNode("strong", null, "Upload Gambar:"),
                                              createTextVNode(" Maksimal 5 gambar per produk, gambar pertama akan menjadi gambar utama ")
                                            ])
                                          ]),
                                          createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                            createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                            createVNode("span", null, [
                                              createVNode("strong", null, "Edit/Hapus:"),
                                              createTextVNode(" Klik icon pensil untuk edit atau icon trash untuk hapus produk ")
                                            ])
                                          ]),
                                          createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                            createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                            createVNode("span", null, [
                                              createVNode("strong", null, "Status:"),
                                              createTextVNode(" Toggle aktif/non-aktif untuk menampilkan/ menyembunyikan produk di store ")
                                            ])
                                          ])
                                        ])
                                      ]),
                                      createVNode(unref(_sfc_main$c)),
                                      createVNode("div", null, [
                                        createVNode("h4", { class: "font-semibold mb-2 flex items-center gap-2" }, [
                                          createVNode(unref(Star), { class: "w-4 h-4" }),
                                          createTextVNode(" Review Produk ")
                                        ]),
                                        createVNode("ul", { class: "space-y-2 ml-6" }, [
                                          createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                            createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                            createVNode("span", null, "Customer dapat memberikan rating 1-5 bintang dan komentar")
                                          ]),
                                          createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                            createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                            createVNode("span", null, "Admin dapat approve/reject review sebelum ditampilkan")
                                          ]),
                                          createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                            createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                            createVNode("span", null, "Review hanya bisa diberikan setelah pesanan selesai (COMPLETED)")
                                          ])
                                        ])
                                      ]),
                                      createVNode(unref(_sfc_main$c)),
                                      createVNode("div", null, [
                                        createVNode("h4", { class: "font-semibold mb-2 flex items-center gap-2" }, [
                                          createVNode(unref(BadgePercent), { class: "w-4 h-4" }),
                                          createTextVNode(" Promosi & Diskon ")
                                        ]),
                                        createVNode("ul", { class: "space-y-2 ml-6" }, [
                                          createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                            createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                            createVNode("span", null, [
                                              createVNode("strong", null, "Tipe Diskon:"),
                                              createTextVNode(" Persentase (%) atau Nominal (Rp) ")
                                            ])
                                          ]),
                                          createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                            createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                            createVNode("span", null, [
                                              createVNode("strong", null, "Periode:"),
                                              createTextVNode(" Set tanggal mulai dan berakhir promosi ")
                                            ])
                                          ]),
                                          createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                            createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                            createVNode("span", null, [
                                              createVNode("strong", null, "Minimum Order:"),
                                              createTextVNode(" Opsional, set minimal pembelian untuk diskon ")
                                            ])
                                          ])
                                        ])
                                      ])
                                    ])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$3), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$4), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$5), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Manajemen Pesanan`);
                                        } else {
                                          return [
                                            createTextVNode("Manajemen Pesanan")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$6), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Proses order dari pembayaran hingga pengiriman`);
                                        } else {
                                          return [
                                            createTextVNode("Proses order dari pembayaran hingga pengiriman")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$5), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Manajemen Pesanan")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$6), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Proses order dari pembayaran hingga pengiriman")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$7), { class: "space-y-4" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div${_scopeId5}><h4 class="font-semibold mb-3"${_scopeId5}>Alur Pesanan</h4><div class="space-y-3"${_scopeId5}><div class="flex items-start gap-3 p-3 rounded-lg border bg-muted/50"${_scopeId5}><div class="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500/10"${_scopeId5}><span class="text-sm font-bold text-yellow-600"${_scopeId5}>1</span></div><div class="flex-1"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(_sfc_main$2), {
                                      variant: "secondary",
                                      class: "mb-1"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`PENDING`);
                                        } else {
                                          return [
                                            createTextVNode("PENDING")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`<p class="text-sm text-muted-foreground"${_scopeId5}> Customer checkout dan menunggu pembayaran via Midtrans </p></div></div><div class="flex items-start gap-3 p-3 rounded-lg border bg-muted/50"${_scopeId5}><div class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10"${_scopeId5}><span class="text-sm font-bold text-blue-600"${_scopeId5}>2</span></div><div class="flex-1"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(_sfc_main$2), {
                                      variant: "default",
                                      class: "mb-1"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`PAID`);
                                        } else {
                                          return [
                                            createTextVNode("PAID")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`<p class="text-sm text-muted-foreground"${_scopeId5}> Pembayaran berhasil, admin setup pengiriman (pilih kurir, input resi) </p></div></div><div class="flex items-start gap-3 p-3 rounded-lg border bg-muted/50"${_scopeId5}><div class="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/10"${_scopeId5}><span class="text-sm font-bold text-purple-600"${_scopeId5}>3</span></div><div class="flex-1"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(_sfc_main$2), {
                                      variant: "secondary",
                                      class: "mb-1"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`SHIPPED`);
                                        } else {
                                          return [
                                            createTextVNode("SHIPPED")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`<p class="text-sm text-muted-foreground"${_scopeId5}> Paket dalam pengiriman, customer bisa tracking dengan nomor resi </p></div></div><div class="flex items-start gap-3 p-3 rounded-lg border bg-muted/50"${_scopeId5}><div class="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/10"${_scopeId5}><span class="text-sm font-bold text-green-600"${_scopeId5}>4</span></div><div class="flex-1"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(_sfc_main$2), {
                                      variant: "default",
                                      class: "mb-1"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`COMPLETED`);
                                        } else {
                                          return [
                                            createTextVNode("COMPLETED")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`<p class="text-sm text-muted-foreground"${_scopeId5}> Paket diterima customer, bonus MLM otomatis dihitung </p></div></div></div></div>`);
                                    _push6(ssrRenderComponent(unref(_sfc_main$c), null, null, _parent6, _scopeId5));
                                    _push6(`<div${_scopeId5}><h4 class="font-semibold mb-2"${_scopeId5}>Aksi Admin</h4><ul class="space-y-2 ml-6"${_scopeId5}><li class="text-sm flex items-start gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(CheckCircle), { class: "w-4 h-4 mt-0.5 text-green-600" }, null, _parent6, _scopeId5));
                                    _push6(`<span${_scopeId5}><strong${_scopeId5}>Setup Pengiriman:</strong> Pilih kurir (JNE, TIKI, POS), input nomor resi, dan konfirmasi </span></li><li class="text-sm flex items-start gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(CheckCircle), { class: "w-4 h-4 mt-0.5 text-green-600" }, null, _parent6, _scopeId5));
                                    _push6(`<span${_scopeId5}><strong${_scopeId5}>Tandai Dikirim:</strong> Update status menjadi SHIPPED setelah paket diserahkan ke kurir </span></li><li class="text-sm flex items-start gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(CheckCircle), { class: "w-4 h-4 mt-0.5 text-green-600" }, null, _parent6, _scopeId5));
                                    _push6(`<span${_scopeId5}><strong${_scopeId5}>Tandai Selesai:</strong> Update status menjadi COMPLETED setelah customer terima paket </span></li><li class="text-sm flex items-start gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(AlertCircle), { class: "w-4 h-4 mt-0.5 text-red-600" }, null, _parent6, _scopeId5));
                                    _push6(`<span${_scopeId5}><strong${_scopeId5}>Batalkan Pesanan:</strong> Hanya bisa dibatalkan jika status PENDING atau PAID </span></li></ul></div>`);
                                  } else {
                                    return [
                                      createVNode("div", null, [
                                        createVNode("h4", { class: "font-semibold mb-3" }, "Alur Pesanan"),
                                        createVNode("div", { class: "space-y-3" }, [
                                          createVNode("div", { class: "flex items-start gap-3 p-3 rounded-lg border bg-muted/50" }, [
                                            createVNode("div", { class: "flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500/10" }, [
                                              createVNode("span", { class: "text-sm font-bold text-yellow-600" }, "1")
                                            ]),
                                            createVNode("div", { class: "flex-1" }, [
                                              createVNode(unref(_sfc_main$2), {
                                                variant: "secondary",
                                                class: "mb-1"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode("PENDING")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode("p", { class: "text-sm text-muted-foreground" }, " Customer checkout dan menunggu pembayaran via Midtrans ")
                                            ])
                                          ]),
                                          createVNode("div", { class: "flex items-start gap-3 p-3 rounded-lg border bg-muted/50" }, [
                                            createVNode("div", { class: "flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10" }, [
                                              createVNode("span", { class: "text-sm font-bold text-blue-600" }, "2")
                                            ]),
                                            createVNode("div", { class: "flex-1" }, [
                                              createVNode(unref(_sfc_main$2), {
                                                variant: "default",
                                                class: "mb-1"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode("PAID")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode("p", { class: "text-sm text-muted-foreground" }, " Pembayaran berhasil, admin setup pengiriman (pilih kurir, input resi) ")
                                            ])
                                          ]),
                                          createVNode("div", { class: "flex items-start gap-3 p-3 rounded-lg border bg-muted/50" }, [
                                            createVNode("div", { class: "flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/10" }, [
                                              createVNode("span", { class: "text-sm font-bold text-purple-600" }, "3")
                                            ]),
                                            createVNode("div", { class: "flex-1" }, [
                                              createVNode(unref(_sfc_main$2), {
                                                variant: "secondary",
                                                class: "mb-1"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode("SHIPPED")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode("p", { class: "text-sm text-muted-foreground" }, " Paket dalam pengiriman, customer bisa tracking dengan nomor resi ")
                                            ])
                                          ]),
                                          createVNode("div", { class: "flex items-start gap-3 p-3 rounded-lg border bg-muted/50" }, [
                                            createVNode("div", { class: "flex h-8 w-8 items-center justify-center rounded-full bg-green-500/10" }, [
                                              createVNode("span", { class: "text-sm font-bold text-green-600" }, "4")
                                            ]),
                                            createVNode("div", { class: "flex-1" }, [
                                              createVNode(unref(_sfc_main$2), {
                                                variant: "default",
                                                class: "mb-1"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode("COMPLETED")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode("p", { class: "text-sm text-muted-foreground" }, " Paket diterima customer, bonus MLM otomatis dihitung ")
                                            ])
                                          ])
                                        ])
                                      ]),
                                      createVNode(unref(_sfc_main$c)),
                                      createVNode("div", null, [
                                        createVNode("h4", { class: "font-semibold mb-2" }, "Aksi Admin"),
                                        createVNode("ul", { class: "space-y-2 ml-6" }, [
                                          createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                            createVNode(unref(CheckCircle), { class: "w-4 h-4 mt-0.5 text-green-600" }),
                                            createVNode("span", null, [
                                              createVNode("strong", null, "Setup Pengiriman:"),
                                              createTextVNode(" Pilih kurir (JNE, TIKI, POS), input nomor resi, dan konfirmasi ")
                                            ])
                                          ]),
                                          createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                            createVNode(unref(CheckCircle), { class: "w-4 h-4 mt-0.5 text-green-600" }),
                                            createVNode("span", null, [
                                              createVNode("strong", null, "Tandai Dikirim:"),
                                              createTextVNode(" Update status menjadi SHIPPED setelah paket diserahkan ke kurir ")
                                            ])
                                          ]),
                                          createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                            createVNode(unref(CheckCircle), { class: "w-4 h-4 mt-0.5 text-green-600" }),
                                            createVNode("span", null, [
                                              createVNode("strong", null, "Tandai Selesai:"),
                                              createTextVNode(" Update status menjadi COMPLETED setelah customer terima paket ")
                                            ])
                                          ]),
                                          createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                            createVNode(unref(AlertCircle), { class: "w-4 h-4 mt-0.5 text-red-600" }),
                                            createVNode("span", null, [
                                              createVNode("strong", null, "Batalkan Pesanan:"),
                                              createTextVNode(" Hanya bisa dibatalkan jika status PENDING atau PAID ")
                                            ])
                                          ])
                                        ])
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$4), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$5), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Manajemen Pesanan")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$6), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Proses order dari pembayaran hingga pengiriman")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                                  default: withCtx(() => [
                                    createVNode("div", null, [
                                      createVNode("h4", { class: "font-semibold mb-3" }, "Alur Pesanan"),
                                      createVNode("div", { class: "space-y-3" }, [
                                        createVNode("div", { class: "flex items-start gap-3 p-3 rounded-lg border bg-muted/50" }, [
                                          createVNode("div", { class: "flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500/10" }, [
                                            createVNode("span", { class: "text-sm font-bold text-yellow-600" }, "1")
                                          ]),
                                          createVNode("div", { class: "flex-1" }, [
                                            createVNode(unref(_sfc_main$2), {
                                              variant: "secondary",
                                              class: "mb-1"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("PENDING")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode("p", { class: "text-sm text-muted-foreground" }, " Customer checkout dan menunggu pembayaran via Midtrans ")
                                          ])
                                        ]),
                                        createVNode("div", { class: "flex items-start gap-3 p-3 rounded-lg border bg-muted/50" }, [
                                          createVNode("div", { class: "flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10" }, [
                                            createVNode("span", { class: "text-sm font-bold text-blue-600" }, "2")
                                          ]),
                                          createVNode("div", { class: "flex-1" }, [
                                            createVNode(unref(_sfc_main$2), {
                                              variant: "default",
                                              class: "mb-1"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("PAID")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode("p", { class: "text-sm text-muted-foreground" }, " Pembayaran berhasil, admin setup pengiriman (pilih kurir, input resi) ")
                                          ])
                                        ]),
                                        createVNode("div", { class: "flex items-start gap-3 p-3 rounded-lg border bg-muted/50" }, [
                                          createVNode("div", { class: "flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/10" }, [
                                            createVNode("span", { class: "text-sm font-bold text-purple-600" }, "3")
                                          ]),
                                          createVNode("div", { class: "flex-1" }, [
                                            createVNode(unref(_sfc_main$2), {
                                              variant: "secondary",
                                              class: "mb-1"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("SHIPPED")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode("p", { class: "text-sm text-muted-foreground" }, " Paket dalam pengiriman, customer bisa tracking dengan nomor resi ")
                                          ])
                                        ]),
                                        createVNode("div", { class: "flex items-start gap-3 p-3 rounded-lg border bg-muted/50" }, [
                                          createVNode("div", { class: "flex h-8 w-8 items-center justify-center rounded-full bg-green-500/10" }, [
                                            createVNode("span", { class: "text-sm font-bold text-green-600" }, "4")
                                          ]),
                                          createVNode("div", { class: "flex-1" }, [
                                            createVNode(unref(_sfc_main$2), {
                                              variant: "default",
                                              class: "mb-1"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("COMPLETED")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode("p", { class: "text-sm text-muted-foreground" }, " Paket diterima customer, bonus MLM otomatis dihitung ")
                                          ])
                                        ])
                                      ])
                                    ]),
                                    createVNode(unref(_sfc_main$c)),
                                    createVNode("div", null, [
                                      createVNode("h4", { class: "font-semibold mb-2" }, "Aksi Admin"),
                                      createVNode("ul", { class: "space-y-2 ml-6" }, [
                                        createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                          createVNode(unref(CheckCircle), { class: "w-4 h-4 mt-0.5 text-green-600" }),
                                          createVNode("span", null, [
                                            createVNode("strong", null, "Setup Pengiriman:"),
                                            createTextVNode(" Pilih kurir (JNE, TIKI, POS), input nomor resi, dan konfirmasi ")
                                          ])
                                        ]),
                                        createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                          createVNode(unref(CheckCircle), { class: "w-4 h-4 mt-0.5 text-green-600" }),
                                          createVNode("span", null, [
                                            createVNode("strong", null, "Tandai Dikirim:"),
                                            createTextVNode(" Update status menjadi SHIPPED setelah paket diserahkan ke kurir ")
                                          ])
                                        ]),
                                        createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                          createVNode(unref(CheckCircle), { class: "w-4 h-4 mt-0.5 text-green-600" }),
                                          createVNode("span", null, [
                                            createVNode("strong", null, "Tandai Selesai:"),
                                            createTextVNode(" Update status menjadi COMPLETED setelah customer terima paket ")
                                          ])
                                        ]),
                                        createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                          createVNode(unref(AlertCircle), { class: "w-4 h-4 mt-0.5 text-red-600" }),
                                          createVNode("span", null, [
                                            createVNode("strong", null, "Batalkan Pesanan:"),
                                            createTextVNode(" Hanya bisa dibatalkan jika status PENDING atau PAID ")
                                          ])
                                        ])
                                      ])
                                    ])
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
                          createVNode(unref(_sfc_main$3), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$4), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$5), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Manajemen Produk")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$6), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Kelola produk, kategori, dan promosi")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "space-y-3" }, [
                                    createVNode("div", null, [
                                      createVNode("h4", { class: "font-semibold mb-2 flex items-center gap-2" }, [
                                        createVNode(unref(Package), { class: "w-4 h-4" }),
                                        createTextVNode(" Produk ")
                                      ]),
                                      createVNode("ul", { class: "space-y-2 ml-6" }, [
                                        createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                          createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                          createVNode("span", null, [
                                            createVNode("strong", null, "Tambah Produk:"),
                                            createTextVNode(' Klik tombol "Tambah Produk", isi nama, deskripsi, harga, stok, berat, dan kategori ')
                                          ])
                                        ]),
                                        createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                          createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                          createVNode("span", null, [
                                            createVNode("strong", null, "Upload Gambar:"),
                                            createTextVNode(" Maksimal 5 gambar per produk, gambar pertama akan menjadi gambar utama ")
                                          ])
                                        ]),
                                        createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                          createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                          createVNode("span", null, [
                                            createVNode("strong", null, "Edit/Hapus:"),
                                            createTextVNode(" Klik icon pensil untuk edit atau icon trash untuk hapus produk ")
                                          ])
                                        ]),
                                        createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                          createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                          createVNode("span", null, [
                                            createVNode("strong", null, "Status:"),
                                            createTextVNode(" Toggle aktif/non-aktif untuk menampilkan/ menyembunyikan produk di store ")
                                          ])
                                        ])
                                      ])
                                    ]),
                                    createVNode(unref(_sfc_main$c)),
                                    createVNode("div", null, [
                                      createVNode("h4", { class: "font-semibold mb-2 flex items-center gap-2" }, [
                                        createVNode(unref(Star), { class: "w-4 h-4" }),
                                        createTextVNode(" Review Produk ")
                                      ]),
                                      createVNode("ul", { class: "space-y-2 ml-6" }, [
                                        createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                          createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                          createVNode("span", null, "Customer dapat memberikan rating 1-5 bintang dan komentar")
                                        ]),
                                        createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                          createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                          createVNode("span", null, "Admin dapat approve/reject review sebelum ditampilkan")
                                        ]),
                                        createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                          createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                          createVNode("span", null, "Review hanya bisa diberikan setelah pesanan selesai (COMPLETED)")
                                        ])
                                      ])
                                    ]),
                                    createVNode(unref(_sfc_main$c)),
                                    createVNode("div", null, [
                                      createVNode("h4", { class: "font-semibold mb-2 flex items-center gap-2" }, [
                                        createVNode(unref(BadgePercent), { class: "w-4 h-4" }),
                                        createTextVNode(" Promosi & Diskon ")
                                      ]),
                                      createVNode("ul", { class: "space-y-2 ml-6" }, [
                                        createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                          createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                          createVNode("span", null, [
                                            createVNode("strong", null, "Tipe Diskon:"),
                                            createTextVNode(" Persentase (%) atau Nominal (Rp) ")
                                          ])
                                        ]),
                                        createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                          createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                          createVNode("span", null, [
                                            createVNode("strong", null, "Periode:"),
                                            createTextVNode(" Set tanggal mulai dan berakhir promosi ")
                                          ])
                                        ]),
                                        createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                          createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                          createVNode("span", null, [
                                            createVNode("strong", null, "Minimum Order:"),
                                            createTextVNode(" Opsional, set minimal pembelian untuk diskon ")
                                          ])
                                        ])
                                      ])
                                    ])
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$3), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$4), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$5), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Manajemen Pesanan")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$6), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Proses order dari pembayaran hingga pengiriman")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                                default: withCtx(() => [
                                  createVNode("div", null, [
                                    createVNode("h4", { class: "font-semibold mb-3" }, "Alur Pesanan"),
                                    createVNode("div", { class: "space-y-3" }, [
                                      createVNode("div", { class: "flex items-start gap-3 p-3 rounded-lg border bg-muted/50" }, [
                                        createVNode("div", { class: "flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500/10" }, [
                                          createVNode("span", { class: "text-sm font-bold text-yellow-600" }, "1")
                                        ]),
                                        createVNode("div", { class: "flex-1" }, [
                                          createVNode(unref(_sfc_main$2), {
                                            variant: "secondary",
                                            class: "mb-1"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("PENDING")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Customer checkout dan menunggu pembayaran via Midtrans ")
                                        ])
                                      ]),
                                      createVNode("div", { class: "flex items-start gap-3 p-3 rounded-lg border bg-muted/50" }, [
                                        createVNode("div", { class: "flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10" }, [
                                          createVNode("span", { class: "text-sm font-bold text-blue-600" }, "2")
                                        ]),
                                        createVNode("div", { class: "flex-1" }, [
                                          createVNode(unref(_sfc_main$2), {
                                            variant: "default",
                                            class: "mb-1"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("PAID")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Pembayaran berhasil, admin setup pengiriman (pilih kurir, input resi) ")
                                        ])
                                      ]),
                                      createVNode("div", { class: "flex items-start gap-3 p-3 rounded-lg border bg-muted/50" }, [
                                        createVNode("div", { class: "flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/10" }, [
                                          createVNode("span", { class: "text-sm font-bold text-purple-600" }, "3")
                                        ]),
                                        createVNode("div", { class: "flex-1" }, [
                                          createVNode(unref(_sfc_main$2), {
                                            variant: "secondary",
                                            class: "mb-1"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("SHIPPED")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Paket dalam pengiriman, customer bisa tracking dengan nomor resi ")
                                        ])
                                      ]),
                                      createVNode("div", { class: "flex items-start gap-3 p-3 rounded-lg border bg-muted/50" }, [
                                        createVNode("div", { class: "flex h-8 w-8 items-center justify-center rounded-full bg-green-500/10" }, [
                                          createVNode("span", { class: "text-sm font-bold text-green-600" }, "4")
                                        ]),
                                        createVNode("div", { class: "flex-1" }, [
                                          createVNode(unref(_sfc_main$2), {
                                            variant: "default",
                                            class: "mb-1"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("COMPLETED")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Paket diterima customer, bonus MLM otomatis dihitung ")
                                        ])
                                      ])
                                    ])
                                  ]),
                                  createVNode(unref(_sfc_main$c)),
                                  createVNode("div", null, [
                                    createVNode("h4", { class: "font-semibold mb-2" }, "Aksi Admin"),
                                    createVNode("ul", { class: "space-y-2 ml-6" }, [
                                      createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                        createVNode(unref(CheckCircle), { class: "w-4 h-4 mt-0.5 text-green-600" }),
                                        createVNode("span", null, [
                                          createVNode("strong", null, "Setup Pengiriman:"),
                                          createTextVNode(" Pilih kurir (JNE, TIKI, POS), input nomor resi, dan konfirmasi ")
                                        ])
                                      ]),
                                      createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                        createVNode(unref(CheckCircle), { class: "w-4 h-4 mt-0.5 text-green-600" }),
                                        createVNode("span", null, [
                                          createVNode("strong", null, "Tandai Dikirim:"),
                                          createTextVNode(" Update status menjadi SHIPPED setelah paket diserahkan ke kurir ")
                                        ])
                                      ]),
                                      createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                        createVNode(unref(CheckCircle), { class: "w-4 h-4 mt-0.5 text-green-600" }),
                                        createVNode("span", null, [
                                          createVNode("strong", null, "Tandai Selesai:"),
                                          createTextVNode(" Update status menjadi COMPLETED setelah customer terima paket ")
                                        ])
                                      ]),
                                      createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                        createVNode(unref(AlertCircle), { class: "w-4 h-4 mt-0.5 text-red-600" }),
                                        createVNode("span", null, [
                                          createVNode("strong", null, "Batalkan Pesanan:"),
                                          createTextVNode(" Hanya bisa dibatalkan jika status PENDING atau PAID ")
                                        ])
                                      ])
                                    ])
                                  ])
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
                  _push3(ssrRenderComponent(unref(_sfc_main$b), {
                    value: "mlm",
                    class: "space-y-4"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$3), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$4), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$5), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Sistem Jaringan MLM`);
                                        } else {
                                          return [
                                            createTextVNode("Sistem Jaringan MLM")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$6), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Binary Tree dan Matrix Network`);
                                        } else {
                                          return [
                                            createTextVNode("Binary Tree dan Matrix Network")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$5), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Sistem Jaringan MLM")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$6), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Binary Tree dan Matrix Network")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$7), { class: "space-y-6" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div${_scopeId5}><h4 class="font-semibold mb-3 flex items-center gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(Grid3x3), { class: "w-4 h-4" }, null, _parent6, _scopeId5));
                                    _push6(` Jaringan Binary </h4><div class="space-y-3"${_scopeId5}><p class="text-sm text-muted-foreground"${_scopeId5}> Setiap member memiliki maksimal 2 downline (kiri dan kanan). Placement otomatis menggunakan algoritma breadth-first search. </p><ul class="space-y-2 ml-6"${_scopeId5}><li class="text-sm flex items-start gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }, null, _parent6, _scopeId5));
                                    _push6(`<span${_scopeId5}><strong${_scopeId5}>Auto Placement:</strong> Member baru otomatis ditempatkan di posisi tersedia pertama </span></li><li class="text-sm flex items-start gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }, null, _parent6, _scopeId5));
                                    _push6(`<span${_scopeId5}><strong${_scopeId5}>Visualisasi Tree:</strong> Lihat struktur jaringan binary dalam bentuk tree diagram </span></li><li class="text-sm flex items-start gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }, null, _parent6, _scopeId5));
                                    _push6(`<span${_scopeId5}><strong${_scopeId5}>Bonus Pairing:</strong> Dihitung berdasarkan pasangan (pair) dari BV kiri dan kanan </span></li></ul></div></div>`);
                                    _push6(ssrRenderComponent(unref(_sfc_main$c), null, null, _parent6, _scopeId5));
                                    _push6(`<div${_scopeId5}><h4 class="font-semibold mb-3 flex items-center gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(TrendingUp), { class: "w-4 h-4" }, null, _parent6, _scopeId5));
                                    _push6(` Jaringan Matrix </h4><div class="space-y-3"${_scopeId5}><p class="text-sm text-muted-foreground"${_scopeId5}> Mencatat hubungan sponsor-member untuk perhitungan bonus sponsor dan matching. </p><ul class="space-y-2 ml-6"${_scopeId5}><li class="text-sm flex items-start gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }, null, _parent6, _scopeId5));
                                    _push6(`<span${_scopeId5}><strong${_scopeId5}>Sponsor Direct:</strong> Member yang langsung direkrut oleh sponsor </span></li><li class="text-sm flex items-start gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }, null, _parent6, _scopeId5));
                                    _push6(`<span${_scopeId5}><strong${_scopeId5}>Level Tracking:</strong> Mencatat level kedalaman setiap member dari sponsor </span></li><li class="text-sm flex items-start gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }, null, _parent6, _scopeId5));
                                    _push6(`<span${_scopeId5}><strong${_scopeId5}>Bonus Sponsor:</strong> Diberikan ke sponsor langsung saat member belanja </span></li></ul></div></div>`);
                                  } else {
                                    return [
                                      createVNode("div", null, [
                                        createVNode("h4", { class: "font-semibold mb-3 flex items-center gap-2" }, [
                                          createVNode(unref(Grid3x3), { class: "w-4 h-4" }),
                                          createTextVNode(" Jaringan Binary ")
                                        ]),
                                        createVNode("div", { class: "space-y-3" }, [
                                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Setiap member memiliki maksimal 2 downline (kiri dan kanan). Placement otomatis menggunakan algoritma breadth-first search. "),
                                          createVNode("ul", { class: "space-y-2 ml-6" }, [
                                            createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                              createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                              createVNode("span", null, [
                                                createVNode("strong", null, "Auto Placement:"),
                                                createTextVNode(" Member baru otomatis ditempatkan di posisi tersedia pertama ")
                                              ])
                                            ]),
                                            createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                              createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                              createVNode("span", null, [
                                                createVNode("strong", null, "Visualisasi Tree:"),
                                                createTextVNode(" Lihat struktur jaringan binary dalam bentuk tree diagram ")
                                              ])
                                            ]),
                                            createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                              createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                              createVNode("span", null, [
                                                createVNode("strong", null, "Bonus Pairing:"),
                                                createTextVNode(" Dihitung berdasarkan pasangan (pair) dari BV kiri dan kanan ")
                                              ])
                                            ])
                                          ])
                                        ])
                                      ]),
                                      createVNode(unref(_sfc_main$c)),
                                      createVNode("div", null, [
                                        createVNode("h4", { class: "font-semibold mb-3 flex items-center gap-2" }, [
                                          createVNode(unref(TrendingUp), { class: "w-4 h-4" }),
                                          createTextVNode(" Jaringan Matrix ")
                                        ]),
                                        createVNode("div", { class: "space-y-3" }, [
                                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Mencatat hubungan sponsor-member untuk perhitungan bonus sponsor dan matching. "),
                                          createVNode("ul", { class: "space-y-2 ml-6" }, [
                                            createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                              createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                              createVNode("span", null, [
                                                createVNode("strong", null, "Sponsor Direct:"),
                                                createTextVNode(" Member yang langsung direkrut oleh sponsor ")
                                              ])
                                            ]),
                                            createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                              createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                              createVNode("span", null, [
                                                createVNode("strong", null, "Level Tracking:"),
                                                createTextVNode(" Mencatat level kedalaman setiap member dari sponsor ")
                                              ])
                                            ]),
                                            createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                              createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                              createVNode("span", null, [
                                                createVNode("strong", null, "Bonus Sponsor:"),
                                                createTextVNode(" Diberikan ke sponsor langsung saat member belanja ")
                                              ])
                                            ])
                                          ])
                                        ])
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$4), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$5), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Sistem Jaringan MLM")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$6), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Binary Tree dan Matrix Network")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$7), { class: "space-y-6" }, {
                                  default: withCtx(() => [
                                    createVNode("div", null, [
                                      createVNode("h4", { class: "font-semibold mb-3 flex items-center gap-2" }, [
                                        createVNode(unref(Grid3x3), { class: "w-4 h-4" }),
                                        createTextVNode(" Jaringan Binary ")
                                      ]),
                                      createVNode("div", { class: "space-y-3" }, [
                                        createVNode("p", { class: "text-sm text-muted-foreground" }, " Setiap member memiliki maksimal 2 downline (kiri dan kanan). Placement otomatis menggunakan algoritma breadth-first search. "),
                                        createVNode("ul", { class: "space-y-2 ml-6" }, [
                                          createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                            createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                            createVNode("span", null, [
                                              createVNode("strong", null, "Auto Placement:"),
                                              createTextVNode(" Member baru otomatis ditempatkan di posisi tersedia pertama ")
                                            ])
                                          ]),
                                          createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                            createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                            createVNode("span", null, [
                                              createVNode("strong", null, "Visualisasi Tree:"),
                                              createTextVNode(" Lihat struktur jaringan binary dalam bentuk tree diagram ")
                                            ])
                                          ]),
                                          createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                            createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                            createVNode("span", null, [
                                              createVNode("strong", null, "Bonus Pairing:"),
                                              createTextVNode(" Dihitung berdasarkan pasangan (pair) dari BV kiri dan kanan ")
                                            ])
                                          ])
                                        ])
                                      ])
                                    ]),
                                    createVNode(unref(_sfc_main$c)),
                                    createVNode("div", null, [
                                      createVNode("h4", { class: "font-semibold mb-3 flex items-center gap-2" }, [
                                        createVNode(unref(TrendingUp), { class: "w-4 h-4" }),
                                        createTextVNode(" Jaringan Matrix ")
                                      ]),
                                      createVNode("div", { class: "space-y-3" }, [
                                        createVNode("p", { class: "text-sm text-muted-foreground" }, " Mencatat hubungan sponsor-member untuk perhitungan bonus sponsor dan matching. "),
                                        createVNode("ul", { class: "space-y-2 ml-6" }, [
                                          createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                            createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                            createVNode("span", null, [
                                              createVNode("strong", null, "Sponsor Direct:"),
                                              createTextVNode(" Member yang langsung direkrut oleh sponsor ")
                                            ])
                                          ]),
                                          createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                            createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                            createVNode("span", null, [
                                              createVNode("strong", null, "Level Tracking:"),
                                              createTextVNode(" Mencatat level kedalaman setiap member dari sponsor ")
                                            ])
                                          ]),
                                          createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                            createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                            createVNode("span", null, [
                                              createVNode("strong", null, "Bonus Sponsor:"),
                                              createTextVNode(" Diberikan ke sponsor langsung saat member belanja ")
                                            ])
                                          ])
                                        ])
                                      ])
                                    ])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$3), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$4), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$5), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Sistem Bonus &amp; Komisi`);
                                        } else {
                                          return [
                                            createTextVNode("Sistem Bonus & Komisi")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$6), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`4 jenis bonus otomatis`);
                                        } else {
                                          return [
                                            createTextVNode("4 jenis bonus otomatis")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$5), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Sistem Bonus & Komisi")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$6), null, {
                                        default: withCtx(() => [
                                          createTextVNode("4 jenis bonus otomatis")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$7), { class: "space-y-4" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="grid gap-4 md:grid-cols-2"${_scopeId5}><div class="p-4 rounded-lg border bg-card space-y-2"${_scopeId5}><div class="flex items-center gap-2 mb-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(Wallet), { class: "w-5 h-5 text-primary" }, null, _parent6, _scopeId5));
                                    _push6(`<h4 class="font-semibold"${_scopeId5}>Bonus Umum</h4></div><p class="text-sm text-muted-foreground"${_scopeId5}> Bonus untuk member saat melakukan pembelian pertama atau pencapaian tertentu. </p><ul class="text-xs space-y-1 ml-4 text-muted-foreground"${_scopeId5}><li${_scopeId5}>• Diberikan sekali saat kondisi terpenuhi</li><li${_scopeId5}>• Status: PENDING → RELEASED</li><li${_scopeId5}>• Otomatis masuk ke wallet saat RELEASED</li></ul></div><div class="p-4 rounded-lg border bg-card space-y-2"${_scopeId5}><div class="flex items-center gap-2 mb-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(CreditCard), { class: "w-5 h-5 text-primary" }, null, _parent6, _scopeId5));
                                    _push6(`<h4 class="font-semibold"${_scopeId5}>Bonus Sponsor</h4></div><p class="text-sm text-muted-foreground"${_scopeId5}> Komisi untuk sponsor langsung saat downline melakukan pembelian. </p><ul class="text-xs space-y-1 ml-4 text-muted-foreground"${_scopeId5}><li${_scopeId5}>• Persentase dari total pembelian downline</li><li${_scopeId5}>• Dihitung otomatis saat order COMPLETED</li><li${_scopeId5}>• Langsung masuk wallet sponsor</li></ul></div><div class="p-4 rounded-lg border bg-card space-y-2"${_scopeId5}><div class="flex items-center gap-2 mb-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(Grid3x3), { class: "w-5 h-5 text-primary" }, null, _parent6, _scopeId5));
                                    _push6(`<h4 class="font-semibold"${_scopeId5}>Bonus Pairing</h4></div><p class="text-sm text-muted-foreground"${_scopeId5}> Bonus dari pasangan (pair) BV antara kaki kiri dan kanan di binary tree. </p><ul class="text-xs space-y-1 ml-4 text-muted-foreground"${_scopeId5}><li${_scopeId5}>• Berdasarkan BV terkecil dari 2 kaki</li><li${_scopeId5}>• Sisa BV carry over ke periode berikutnya</li><li${_scopeId5}>• Dihitung otomatis setiap ada transaksi</li></ul></div><div class="p-4 rounded-lg border bg-card space-y-2"${_scopeId5}><div class="flex items-center gap-2 mb-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(TrendingUp), { class: "w-5 h-5 text-primary" }, null, _parent6, _scopeId5));
                                    _push6(`<h4 class="font-semibold"${_scopeId5}>Bonus Matching</h4></div><p class="text-sm text-muted-foreground"${_scopeId5}> Bonus matching dari bonus pairing downline hingga level tertentu. </p><ul class="text-xs space-y-1 ml-4 text-muted-foreground"${_scopeId5}><li${_scopeId5}>• Persentase dari bonus pairing downline</li><li${_scopeId5}>• Maksimal sampai level N (konfigurasi)</li><li${_scopeId5}>• Dihitung setelah bonus pairing</li></ul></div></div><div class="p-4 rounded-lg border bg-yellow-50 dark:bg-yellow-950/20"${_scopeId5}><div class="flex gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(Info), { class: "w-5 h-5 text-yellow-600 flex-shrink-0" }, null, _parent6, _scopeId5));
                                    _push6(`<div${_scopeId5}><h4 class="font-semibold text-sm text-yellow-900 dark:text-yellow-100 mb-1"${_scopeId5}> Catatan Penting </h4><p class="text-sm text-yellow-800 dark:text-yellow-200"${_scopeId5}> Semua bonus dihitung otomatis oleh sistem saat order mencapai status COMPLETED. Admin hanya perlu melakukan release bonus dari PENDING menjadi RELEASED jika ada approval manual. </p></div></div></div>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                                        createVNode("div", { class: "p-4 rounded-lg border bg-card space-y-2" }, [
                                          createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                            createVNode(unref(Wallet), { class: "w-5 h-5 text-primary" }),
                                            createVNode("h4", { class: "font-semibold" }, "Bonus Umum")
                                          ]),
                                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Bonus untuk member saat melakukan pembelian pertama atau pencapaian tertentu. "),
                                          createVNode("ul", { class: "text-xs space-y-1 ml-4 text-muted-foreground" }, [
                                            createVNode("li", null, "• Diberikan sekali saat kondisi terpenuhi"),
                                            createVNode("li", null, "• Status: PENDING → RELEASED"),
                                            createVNode("li", null, "• Otomatis masuk ke wallet saat RELEASED")
                                          ])
                                        ]),
                                        createVNode("div", { class: "p-4 rounded-lg border bg-card space-y-2" }, [
                                          createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                            createVNode(unref(CreditCard), { class: "w-5 h-5 text-primary" }),
                                            createVNode("h4", { class: "font-semibold" }, "Bonus Sponsor")
                                          ]),
                                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Komisi untuk sponsor langsung saat downline melakukan pembelian. "),
                                          createVNode("ul", { class: "text-xs space-y-1 ml-4 text-muted-foreground" }, [
                                            createVNode("li", null, "• Persentase dari total pembelian downline"),
                                            createVNode("li", null, "• Dihitung otomatis saat order COMPLETED"),
                                            createVNode("li", null, "• Langsung masuk wallet sponsor")
                                          ])
                                        ]),
                                        createVNode("div", { class: "p-4 rounded-lg border bg-card space-y-2" }, [
                                          createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                            createVNode(unref(Grid3x3), { class: "w-5 h-5 text-primary" }),
                                            createVNode("h4", { class: "font-semibold" }, "Bonus Pairing")
                                          ]),
                                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Bonus dari pasangan (pair) BV antara kaki kiri dan kanan di binary tree. "),
                                          createVNode("ul", { class: "text-xs space-y-1 ml-4 text-muted-foreground" }, [
                                            createVNode("li", null, "• Berdasarkan BV terkecil dari 2 kaki"),
                                            createVNode("li", null, "• Sisa BV carry over ke periode berikutnya"),
                                            createVNode("li", null, "• Dihitung otomatis setiap ada transaksi")
                                          ])
                                        ]),
                                        createVNode("div", { class: "p-4 rounded-lg border bg-card space-y-2" }, [
                                          createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                            createVNode(unref(TrendingUp), { class: "w-5 h-5 text-primary" }),
                                            createVNode("h4", { class: "font-semibold" }, "Bonus Matching")
                                          ]),
                                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Bonus matching dari bonus pairing downline hingga level tertentu. "),
                                          createVNode("ul", { class: "text-xs space-y-1 ml-4 text-muted-foreground" }, [
                                            createVNode("li", null, "• Persentase dari bonus pairing downline"),
                                            createVNode("li", null, "• Maksimal sampai level N (konfigurasi)"),
                                            createVNode("li", null, "• Dihitung setelah bonus pairing")
                                          ])
                                        ])
                                      ]),
                                      createVNode("div", { class: "p-4 rounded-lg border bg-yellow-50 dark:bg-yellow-950/20" }, [
                                        createVNode("div", { class: "flex gap-2" }, [
                                          createVNode(unref(Info), { class: "w-5 h-5 text-yellow-600 flex-shrink-0" }),
                                          createVNode("div", null, [
                                            createVNode("h4", { class: "font-semibold text-sm text-yellow-900 dark:text-yellow-100 mb-1" }, " Catatan Penting "),
                                            createVNode("p", { class: "text-sm text-yellow-800 dark:text-yellow-200" }, " Semua bonus dihitung otomatis oleh sistem saat order mencapai status COMPLETED. Admin hanya perlu melakukan release bonus dari PENDING menjadi RELEASED jika ada approval manual. ")
                                          ])
                                        ])
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$4), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$5), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Sistem Bonus & Komisi")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$6), null, {
                                      default: withCtx(() => [
                                        createTextVNode("4 jenis bonus otomatis")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                                      createVNode("div", { class: "p-4 rounded-lg border bg-card space-y-2" }, [
                                        createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                          createVNode(unref(Wallet), { class: "w-5 h-5 text-primary" }),
                                          createVNode("h4", { class: "font-semibold" }, "Bonus Umum")
                                        ]),
                                        createVNode("p", { class: "text-sm text-muted-foreground" }, " Bonus untuk member saat melakukan pembelian pertama atau pencapaian tertentu. "),
                                        createVNode("ul", { class: "text-xs space-y-1 ml-4 text-muted-foreground" }, [
                                          createVNode("li", null, "• Diberikan sekali saat kondisi terpenuhi"),
                                          createVNode("li", null, "• Status: PENDING → RELEASED"),
                                          createVNode("li", null, "• Otomatis masuk ke wallet saat RELEASED")
                                        ])
                                      ]),
                                      createVNode("div", { class: "p-4 rounded-lg border bg-card space-y-2" }, [
                                        createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                          createVNode(unref(CreditCard), { class: "w-5 h-5 text-primary" }),
                                          createVNode("h4", { class: "font-semibold" }, "Bonus Sponsor")
                                        ]),
                                        createVNode("p", { class: "text-sm text-muted-foreground" }, " Komisi untuk sponsor langsung saat downline melakukan pembelian. "),
                                        createVNode("ul", { class: "text-xs space-y-1 ml-4 text-muted-foreground" }, [
                                          createVNode("li", null, "• Persentase dari total pembelian downline"),
                                          createVNode("li", null, "• Dihitung otomatis saat order COMPLETED"),
                                          createVNode("li", null, "• Langsung masuk wallet sponsor")
                                        ])
                                      ]),
                                      createVNode("div", { class: "p-4 rounded-lg border bg-card space-y-2" }, [
                                        createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                          createVNode(unref(Grid3x3), { class: "w-5 h-5 text-primary" }),
                                          createVNode("h4", { class: "font-semibold" }, "Bonus Pairing")
                                        ]),
                                        createVNode("p", { class: "text-sm text-muted-foreground" }, " Bonus dari pasangan (pair) BV antara kaki kiri dan kanan di binary tree. "),
                                        createVNode("ul", { class: "text-xs space-y-1 ml-4 text-muted-foreground" }, [
                                          createVNode("li", null, "• Berdasarkan BV terkecil dari 2 kaki"),
                                          createVNode("li", null, "• Sisa BV carry over ke periode berikutnya"),
                                          createVNode("li", null, "• Dihitung otomatis setiap ada transaksi")
                                        ])
                                      ]),
                                      createVNode("div", { class: "p-4 rounded-lg border bg-card space-y-2" }, [
                                        createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                          createVNode(unref(TrendingUp), { class: "w-5 h-5 text-primary" }),
                                          createVNode("h4", { class: "font-semibold" }, "Bonus Matching")
                                        ]),
                                        createVNode("p", { class: "text-sm text-muted-foreground" }, " Bonus matching dari bonus pairing downline hingga level tertentu. "),
                                        createVNode("ul", { class: "text-xs space-y-1 ml-4 text-muted-foreground" }, [
                                          createVNode("li", null, "• Persentase dari bonus pairing downline"),
                                          createVNode("li", null, "• Maksimal sampai level N (konfigurasi)"),
                                          createVNode("li", null, "• Dihitung setelah bonus pairing")
                                        ])
                                      ])
                                    ]),
                                    createVNode("div", { class: "p-4 rounded-lg border bg-yellow-50 dark:bg-yellow-950/20" }, [
                                      createVNode("div", { class: "flex gap-2" }, [
                                        createVNode(unref(Info), { class: "w-5 h-5 text-yellow-600 flex-shrink-0" }),
                                        createVNode("div", null, [
                                          createVNode("h4", { class: "font-semibold text-sm text-yellow-900 dark:text-yellow-100 mb-1" }, " Catatan Penting "),
                                          createVNode("p", { class: "text-sm text-yellow-800 dark:text-yellow-200" }, " Semua bonus dihitung otomatis oleh sistem saat order mencapai status COMPLETED. Admin hanya perlu melakukan release bonus dari PENDING menjadi RELEASED jika ada approval manual. ")
                                        ])
                                      ])
                                    ])
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
                          createVNode(unref(_sfc_main$3), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$4), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$5), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Sistem Jaringan MLM")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$6), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Binary Tree dan Matrix Network")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$7), { class: "space-y-6" }, {
                                default: withCtx(() => [
                                  createVNode("div", null, [
                                    createVNode("h4", { class: "font-semibold mb-3 flex items-center gap-2" }, [
                                      createVNode(unref(Grid3x3), { class: "w-4 h-4" }),
                                      createTextVNode(" Jaringan Binary ")
                                    ]),
                                    createVNode("div", { class: "space-y-3" }, [
                                      createVNode("p", { class: "text-sm text-muted-foreground" }, " Setiap member memiliki maksimal 2 downline (kiri dan kanan). Placement otomatis menggunakan algoritma breadth-first search. "),
                                      createVNode("ul", { class: "space-y-2 ml-6" }, [
                                        createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                          createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                          createVNode("span", null, [
                                            createVNode("strong", null, "Auto Placement:"),
                                            createTextVNode(" Member baru otomatis ditempatkan di posisi tersedia pertama ")
                                          ])
                                        ]),
                                        createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                          createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                          createVNode("span", null, [
                                            createVNode("strong", null, "Visualisasi Tree:"),
                                            createTextVNode(" Lihat struktur jaringan binary dalam bentuk tree diagram ")
                                          ])
                                        ]),
                                        createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                          createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                          createVNode("span", null, [
                                            createVNode("strong", null, "Bonus Pairing:"),
                                            createTextVNode(" Dihitung berdasarkan pasangan (pair) dari BV kiri dan kanan ")
                                          ])
                                        ])
                                      ])
                                    ])
                                  ]),
                                  createVNode(unref(_sfc_main$c)),
                                  createVNode("div", null, [
                                    createVNode("h4", { class: "font-semibold mb-3 flex items-center gap-2" }, [
                                      createVNode(unref(TrendingUp), { class: "w-4 h-4" }),
                                      createTextVNode(" Jaringan Matrix ")
                                    ]),
                                    createVNode("div", { class: "space-y-3" }, [
                                      createVNode("p", { class: "text-sm text-muted-foreground" }, " Mencatat hubungan sponsor-member untuk perhitungan bonus sponsor dan matching. "),
                                      createVNode("ul", { class: "space-y-2 ml-6" }, [
                                        createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                          createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                          createVNode("span", null, [
                                            createVNode("strong", null, "Sponsor Direct:"),
                                            createTextVNode(" Member yang langsung direkrut oleh sponsor ")
                                          ])
                                        ]),
                                        createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                          createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                          createVNode("span", null, [
                                            createVNode("strong", null, "Level Tracking:"),
                                            createTextVNode(" Mencatat level kedalaman setiap member dari sponsor ")
                                          ])
                                        ]),
                                        createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                          createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                          createVNode("span", null, [
                                            createVNode("strong", null, "Bonus Sponsor:"),
                                            createTextVNode(" Diberikan ke sponsor langsung saat member belanja ")
                                          ])
                                        ])
                                      ])
                                    ])
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$3), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$4), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$5), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Sistem Bonus & Komisi")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$6), null, {
                                    default: withCtx(() => [
                                      createTextVNode("4 jenis bonus otomatis")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                                    createVNode("div", { class: "p-4 rounded-lg border bg-card space-y-2" }, [
                                      createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                        createVNode(unref(Wallet), { class: "w-5 h-5 text-primary" }),
                                        createVNode("h4", { class: "font-semibold" }, "Bonus Umum")
                                      ]),
                                      createVNode("p", { class: "text-sm text-muted-foreground" }, " Bonus untuk member saat melakukan pembelian pertama atau pencapaian tertentu. "),
                                      createVNode("ul", { class: "text-xs space-y-1 ml-4 text-muted-foreground" }, [
                                        createVNode("li", null, "• Diberikan sekali saat kondisi terpenuhi"),
                                        createVNode("li", null, "• Status: PENDING → RELEASED"),
                                        createVNode("li", null, "• Otomatis masuk ke wallet saat RELEASED")
                                      ])
                                    ]),
                                    createVNode("div", { class: "p-4 rounded-lg border bg-card space-y-2" }, [
                                      createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                        createVNode(unref(CreditCard), { class: "w-5 h-5 text-primary" }),
                                        createVNode("h4", { class: "font-semibold" }, "Bonus Sponsor")
                                      ]),
                                      createVNode("p", { class: "text-sm text-muted-foreground" }, " Komisi untuk sponsor langsung saat downline melakukan pembelian. "),
                                      createVNode("ul", { class: "text-xs space-y-1 ml-4 text-muted-foreground" }, [
                                        createVNode("li", null, "• Persentase dari total pembelian downline"),
                                        createVNode("li", null, "• Dihitung otomatis saat order COMPLETED"),
                                        createVNode("li", null, "• Langsung masuk wallet sponsor")
                                      ])
                                    ]),
                                    createVNode("div", { class: "p-4 rounded-lg border bg-card space-y-2" }, [
                                      createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                        createVNode(unref(Grid3x3), { class: "w-5 h-5 text-primary" }),
                                        createVNode("h4", { class: "font-semibold" }, "Bonus Pairing")
                                      ]),
                                      createVNode("p", { class: "text-sm text-muted-foreground" }, " Bonus dari pasangan (pair) BV antara kaki kiri dan kanan di binary tree. "),
                                      createVNode("ul", { class: "text-xs space-y-1 ml-4 text-muted-foreground" }, [
                                        createVNode("li", null, "• Berdasarkan BV terkecil dari 2 kaki"),
                                        createVNode("li", null, "• Sisa BV carry over ke periode berikutnya"),
                                        createVNode("li", null, "• Dihitung otomatis setiap ada transaksi")
                                      ])
                                    ]),
                                    createVNode("div", { class: "p-4 rounded-lg border bg-card space-y-2" }, [
                                      createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                        createVNode(unref(TrendingUp), { class: "w-5 h-5 text-primary" }),
                                        createVNode("h4", { class: "font-semibold" }, "Bonus Matching")
                                      ]),
                                      createVNode("p", { class: "text-sm text-muted-foreground" }, " Bonus matching dari bonus pairing downline hingga level tertentu. "),
                                      createVNode("ul", { class: "text-xs space-y-1 ml-4 text-muted-foreground" }, [
                                        createVNode("li", null, "• Persentase dari bonus pairing downline"),
                                        createVNode("li", null, "• Maksimal sampai level N (konfigurasi)"),
                                        createVNode("li", null, "• Dihitung setelah bonus pairing")
                                      ])
                                    ])
                                  ]),
                                  createVNode("div", { class: "p-4 rounded-lg border bg-yellow-50 dark:bg-yellow-950/20" }, [
                                    createVNode("div", { class: "flex gap-2" }, [
                                      createVNode(unref(Info), { class: "w-5 h-5 text-yellow-600 flex-shrink-0" }),
                                      createVNode("div", null, [
                                        createVNode("h4", { class: "font-semibold text-sm text-yellow-900 dark:text-yellow-100 mb-1" }, " Catatan Penting "),
                                        createVNode("p", { class: "text-sm text-yellow-800 dark:text-yellow-200" }, " Semua bonus dihitung otomatis oleh sistem saat order mencapai status COMPLETED. Admin hanya perlu melakukan release bonus dari PENDING menjadi RELEASED jika ada approval manual. ")
                                      ])
                                    ])
                                  ])
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
                  _push3(ssrRenderComponent(unref(_sfc_main$b), {
                    value: "management",
                    class: "space-y-4"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$3), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$4), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$5), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Manajemen E-Wallet`);
                                        } else {
                                          return [
                                            createTextVNode("Manajemen E-Wallet")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$6), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Top-up dan withdrawal customer`);
                                        } else {
                                          return [
                                            createTextVNode("Top-up dan withdrawal customer")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$5), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Manajemen E-Wallet")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$6), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Top-up dan withdrawal customer")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$7), { class: "space-y-4" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div${_scopeId5}><h4 class="font-semibold mb-3"${_scopeId5}>Top-Up (Deposit)</h4><ul class="space-y-2 ml-6"${_scopeId5}><li class="text-sm flex items-start gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }, null, _parent6, _scopeId5));
                                    _push6(`<span${_scopeId5}>Customer request top-up via Midtrans (transfer bank, e-wallet, dll)</span></li><li class="text-sm flex items-start gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }, null, _parent6, _scopeId5));
                                    _push6(`<span${_scopeId5}> Setelah pembayaran berhasil, saldo otomatis masuk ke wallet customer </span></li><li class="text-sm flex items-start gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }, null, _parent6, _scopeId5));
                                    _push6(`<span${_scopeId5}>Admin bisa melihat riwayat top-up di menu &quot;Permintaan Top Up&quot;</span></li></ul></div>`);
                                    _push6(ssrRenderComponent(unref(_sfc_main$c), null, null, _parent6, _scopeId5));
                                    _push6(`<div${_scopeId5}><h4 class="font-semibold mb-3"${_scopeId5}>Withdrawal (Penarikan)</h4><ul class="space-y-2 ml-6"${_scopeId5}><li class="text-sm flex items-start gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }, null, _parent6, _scopeId5));
                                    _push6(`<span${_scopeId5}>Customer request withdrawal dengan minimum nominal tertentu</span></li><li class="text-sm flex items-start gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }, null, _parent6, _scopeId5));
                                    _push6(`<span${_scopeId5}>Admin approve/reject withdrawal di menu &quot;Permintaan Withdrawal&quot;</span></li><li class="text-sm flex items-start gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }, null, _parent6, _scopeId5));
                                    _push6(`<span${_scopeId5}> Jika approved, saldo customer berkurang dan admin transfer manual ke rekening customer </span></li><li class="text-sm flex items-start gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(AlertCircle), { class: "w-4 h-4 mt-0.5 text-red-600" }, null, _parent6, _scopeId5));
                                    _push6(`<span${_scopeId5}><strong${_scopeId5}>Catatan:</strong> Pastikan saldo customer cukup sebelum approve </span></li></ul></div>`);
                                  } else {
                                    return [
                                      createVNode("div", null, [
                                        createVNode("h4", { class: "font-semibold mb-3" }, "Top-Up (Deposit)"),
                                        createVNode("ul", { class: "space-y-2 ml-6" }, [
                                          createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                            createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                            createVNode("span", null, "Customer request top-up via Midtrans (transfer bank, e-wallet, dll)")
                                          ]),
                                          createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                            createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                            createVNode("span", null, " Setelah pembayaran berhasil, saldo otomatis masuk ke wallet customer ")
                                          ]),
                                          createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                            createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                            createVNode("span", null, 'Admin bisa melihat riwayat top-up di menu "Permintaan Top Up"')
                                          ])
                                        ])
                                      ]),
                                      createVNode(unref(_sfc_main$c)),
                                      createVNode("div", null, [
                                        createVNode("h4", { class: "font-semibold mb-3" }, "Withdrawal (Penarikan)"),
                                        createVNode("ul", { class: "space-y-2 ml-6" }, [
                                          createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                            createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                            createVNode("span", null, "Customer request withdrawal dengan minimum nominal tertentu")
                                          ]),
                                          createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                            createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                            createVNode("span", null, 'Admin approve/reject withdrawal di menu "Permintaan Withdrawal"')
                                          ]),
                                          createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                            createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                            createVNode("span", null, " Jika approved, saldo customer berkurang dan admin transfer manual ke rekening customer ")
                                          ]),
                                          createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                            createVNode(unref(AlertCircle), { class: "w-4 h-4 mt-0.5 text-red-600" }),
                                            createVNode("span", null, [
                                              createVNode("strong", null, "Catatan:"),
                                              createTextVNode(" Pastikan saldo customer cukup sebelum approve ")
                                            ])
                                          ])
                                        ])
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$4), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$5), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Manajemen E-Wallet")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$6), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Top-up dan withdrawal customer")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                                  default: withCtx(() => [
                                    createVNode("div", null, [
                                      createVNode("h4", { class: "font-semibold mb-3" }, "Top-Up (Deposit)"),
                                      createVNode("ul", { class: "space-y-2 ml-6" }, [
                                        createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                          createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                          createVNode("span", null, "Customer request top-up via Midtrans (transfer bank, e-wallet, dll)")
                                        ]),
                                        createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                          createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                          createVNode("span", null, " Setelah pembayaran berhasil, saldo otomatis masuk ke wallet customer ")
                                        ]),
                                        createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                          createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                          createVNode("span", null, 'Admin bisa melihat riwayat top-up di menu "Permintaan Top Up"')
                                        ])
                                      ])
                                    ]),
                                    createVNode(unref(_sfc_main$c)),
                                    createVNode("div", null, [
                                      createVNode("h4", { class: "font-semibold mb-3" }, "Withdrawal (Penarikan)"),
                                      createVNode("ul", { class: "space-y-2 ml-6" }, [
                                        createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                          createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                          createVNode("span", null, "Customer request withdrawal dengan minimum nominal tertentu")
                                        ]),
                                        createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                          createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                          createVNode("span", null, 'Admin approve/reject withdrawal di menu "Permintaan Withdrawal"')
                                        ]),
                                        createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                          createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                          createVNode("span", null, " Jika approved, saldo customer berkurang dan admin transfer manual ke rekening customer ")
                                        ]),
                                        createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                          createVNode(unref(AlertCircle), { class: "w-4 h-4 mt-0.5 text-red-600" }),
                                          createVNode("span", null, [
                                            createVNode("strong", null, "Catatan:"),
                                            createTextVNode(" Pastikan saldo customer cukup sebelum approve ")
                                          ])
                                        ])
                                      ])
                                    ])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$3), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$4), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$5), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Manajemen User &amp; Customer`);
                                        } else {
                                          return [
                                            createTextVNode("Manajemen User & Customer")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$6), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Kelola akses dan data pengguna`);
                                        } else {
                                          return [
                                            createTextVNode("Kelola akses dan data pengguna")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$5), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Manajemen User & Customer")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$6), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Kelola akses dan data pengguna")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$7), { class: "space-y-4" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div${_scopeId5}><h4 class="font-semibold mb-2"${_scopeId5}>User Admin</h4><p class="text-sm text-muted-foreground mb-2"${_scopeId5}> User dengan akses ke admin panel untuk mengelola sistem </p><ul class="space-y-1 ml-6 text-sm"${_scopeId5}><li class="flex items-start gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }, null, _parent6, _scopeId5));
                                    _push6(`<span${_scopeId5}>Tambah/edit/hapus user admin</span></li><li class="flex items-start gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }, null, _parent6, _scopeId5));
                                    _push6(`<span${_scopeId5}>Set password dan email untuk login</span></li><li class="flex items-start gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }, null, _parent6, _scopeId5));
                                    _push6(`<span${_scopeId5}>Upload avatar/foto profil</span></li></ul></div>`);
                                    _push6(ssrRenderComponent(unref(_sfc_main$c), null, null, _parent6, _scopeId5));
                                    _push6(`<div${_scopeId5}><h4 class="font-semibold mb-2"${_scopeId5}>Customer/Member</h4><p class="text-sm text-muted-foreground mb-2"${_scopeId5}> Data pelanggan yang berbelanja dan bergabung dalam jaringan MLM </p><ul class="space-y-1 ml-6 text-sm"${_scopeId5}><li class="flex items-start gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }, null, _parent6, _scopeId5));
                                    _push6(`<span${_scopeId5}>Lihat data lengkap customer (nama, email, phone, alamat)</span></li><li class="flex items-start gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }, null, _parent6, _scopeId5));
                                    _push6(`<span${_scopeId5}>Lihat riwayat pesanan dan transaksi wallet</span></li><li class="flex items-start gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }, null, _parent6, _scopeId5));
                                    _push6(`<span${_scopeId5}>Lihat posisi dalam jaringan (upline, downline, level)</span></li><li class="flex items-start gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }, null, _parent6, _scopeId5));
                                    _push6(`<span${_scopeId5}>Lihat total bonus yang diterima</span></li></ul></div>`);
                                  } else {
                                    return [
                                      createVNode("div", null, [
                                        createVNode("h4", { class: "font-semibold mb-2" }, "User Admin"),
                                        createVNode("p", { class: "text-sm text-muted-foreground mb-2" }, " User dengan akses ke admin panel untuk mengelola sistem "),
                                        createVNode("ul", { class: "space-y-1 ml-6 text-sm" }, [
                                          createVNode("li", { class: "flex items-start gap-2" }, [
                                            createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                            createVNode("span", null, "Tambah/edit/hapus user admin")
                                          ]),
                                          createVNode("li", { class: "flex items-start gap-2" }, [
                                            createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                            createVNode("span", null, "Set password dan email untuk login")
                                          ]),
                                          createVNode("li", { class: "flex items-start gap-2" }, [
                                            createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                            createVNode("span", null, "Upload avatar/foto profil")
                                          ])
                                        ])
                                      ]),
                                      createVNode(unref(_sfc_main$c)),
                                      createVNode("div", null, [
                                        createVNode("h4", { class: "font-semibold mb-2" }, "Customer/Member"),
                                        createVNode("p", { class: "text-sm text-muted-foreground mb-2" }, " Data pelanggan yang berbelanja dan bergabung dalam jaringan MLM "),
                                        createVNode("ul", { class: "space-y-1 ml-6 text-sm" }, [
                                          createVNode("li", { class: "flex items-start gap-2" }, [
                                            createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                            createVNode("span", null, "Lihat data lengkap customer (nama, email, phone, alamat)")
                                          ]),
                                          createVNode("li", { class: "flex items-start gap-2" }, [
                                            createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                            createVNode("span", null, "Lihat riwayat pesanan dan transaksi wallet")
                                          ]),
                                          createVNode("li", { class: "flex items-start gap-2" }, [
                                            createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                            createVNode("span", null, "Lihat posisi dalam jaringan (upline, downline, level)")
                                          ]),
                                          createVNode("li", { class: "flex items-start gap-2" }, [
                                            createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                            createVNode("span", null, "Lihat total bonus yang diterima")
                                          ])
                                        ])
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$4), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$5), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Manajemen User & Customer")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$6), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Kelola akses dan data pengguna")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                                  default: withCtx(() => [
                                    createVNode("div", null, [
                                      createVNode("h4", { class: "font-semibold mb-2" }, "User Admin"),
                                      createVNode("p", { class: "text-sm text-muted-foreground mb-2" }, " User dengan akses ke admin panel untuk mengelola sistem "),
                                      createVNode("ul", { class: "space-y-1 ml-6 text-sm" }, [
                                        createVNode("li", { class: "flex items-start gap-2" }, [
                                          createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                          createVNode("span", null, "Tambah/edit/hapus user admin")
                                        ]),
                                        createVNode("li", { class: "flex items-start gap-2" }, [
                                          createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                          createVNode("span", null, "Set password dan email untuk login")
                                        ]),
                                        createVNode("li", { class: "flex items-start gap-2" }, [
                                          createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                          createVNode("span", null, "Upload avatar/foto profil")
                                        ])
                                      ])
                                    ]),
                                    createVNode(unref(_sfc_main$c)),
                                    createVNode("div", null, [
                                      createVNode("h4", { class: "font-semibold mb-2" }, "Customer/Member"),
                                      createVNode("p", { class: "text-sm text-muted-foreground mb-2" }, " Data pelanggan yang berbelanja dan bergabung dalam jaringan MLM "),
                                      createVNode("ul", { class: "space-y-1 ml-6 text-sm" }, [
                                        createVNode("li", { class: "flex items-start gap-2" }, [
                                          createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                          createVNode("span", null, "Lihat data lengkap customer (nama, email, phone, alamat)")
                                        ]),
                                        createVNode("li", { class: "flex items-start gap-2" }, [
                                          createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                          createVNode("span", null, "Lihat riwayat pesanan dan transaksi wallet")
                                        ]),
                                        createVNode("li", { class: "flex items-start gap-2" }, [
                                          createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                          createVNode("span", null, "Lihat posisi dalam jaringan (upline, downline, level)")
                                        ]),
                                        createVNode("li", { class: "flex items-start gap-2" }, [
                                          createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                          createVNode("span", null, "Lihat total bonus yang diterima")
                                        ])
                                      ])
                                    ])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$3), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$4), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$5), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Pengaturan Sistem`);
                                        } else {
                                          return [
                                            createTextVNode("Pengaturan Sistem")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$6), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Konfigurasi payment, shipping, dan lainnya`);
                                        } else {
                                          return [
                                            createTextVNode("Konfigurasi payment, shipping, dan lainnya")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$5), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Pengaturan Sistem")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$6), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Konfigurasi payment, shipping, dan lainnya")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$7), { class: "space-y-4" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="grid gap-4 md:grid-cols-2"${_scopeId5}><div class="p-3 rounded-lg border"${_scopeId5}><h4 class="font-semibold mb-2 flex items-center gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(CreditCard), { class: "w-4 h-4" }, null, _parent6, _scopeId5));
                                    _push6(` Metode Pembayaran </h4><p class="text-sm text-muted-foreground"${_scopeId5}> Konfigurasi payment gateway Midtrans (server key, client key, environment) </p></div><div class="p-3 rounded-lg border"${_scopeId5}><h4 class="font-semibold mb-2 flex items-center gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(Truck), { class: "w-4 h-4" }, null, _parent6, _scopeId5));
                                    _push6(` Kurir Pengiriman </h4><p class="text-sm text-muted-foreground"${_scopeId5}> Aktifkan/nonaktifkan kurir (JNE, TIKI, POS) dan set biaya admin </p></div><div class="p-3 rounded-lg border"${_scopeId5}><h4 class="font-semibold mb-2 flex items-center gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(Settings), { class: "w-4 h-4" }, null, _parent6, _scopeId5));
                                    _push6(` Alamat Pengiriman </h4><p class="text-sm text-muted-foreground"${_scopeId5}> Kelola alamat customer untuk pengiriman produk </p></div><div class="p-3 rounded-lg border"${_scopeId5}><h4 class="font-semibold mb-2 flex items-center gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(Package), { class: "w-4 h-4" }, null, _parent6, _scopeId5));
                                    _push6(` Newsletter </h4><p class="text-sm text-muted-foreground"${_scopeId5}> Kelola subscriber newsletter dan kirim email campaign </p></div></div>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                                        createVNode("div", { class: "p-3 rounded-lg border" }, [
                                          createVNode("h4", { class: "font-semibold mb-2 flex items-center gap-2" }, [
                                            createVNode(unref(CreditCard), { class: "w-4 h-4" }),
                                            createTextVNode(" Metode Pembayaran ")
                                          ]),
                                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Konfigurasi payment gateway Midtrans (server key, client key, environment) ")
                                        ]),
                                        createVNode("div", { class: "p-3 rounded-lg border" }, [
                                          createVNode("h4", { class: "font-semibold mb-2 flex items-center gap-2" }, [
                                            createVNode(unref(Truck), { class: "w-4 h-4" }),
                                            createTextVNode(" Kurir Pengiriman ")
                                          ]),
                                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Aktifkan/nonaktifkan kurir (JNE, TIKI, POS) dan set biaya admin ")
                                        ]),
                                        createVNode("div", { class: "p-3 rounded-lg border" }, [
                                          createVNode("h4", { class: "font-semibold mb-2 flex items-center gap-2" }, [
                                            createVNode(unref(Settings), { class: "w-4 h-4" }),
                                            createTextVNode(" Alamat Pengiriman ")
                                          ]),
                                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Kelola alamat customer untuk pengiriman produk ")
                                        ]),
                                        createVNode("div", { class: "p-3 rounded-lg border" }, [
                                          createVNode("h4", { class: "font-semibold mb-2 flex items-center gap-2" }, [
                                            createVNode(unref(Package), { class: "w-4 h-4" }),
                                            createTextVNode(" Newsletter ")
                                          ]),
                                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Kelola subscriber newsletter dan kirim email campaign ")
                                        ])
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$4), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$5), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Pengaturan Sistem")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$6), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Konfigurasi payment, shipping, dan lainnya")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                                      createVNode("div", { class: "p-3 rounded-lg border" }, [
                                        createVNode("h4", { class: "font-semibold mb-2 flex items-center gap-2" }, [
                                          createVNode(unref(CreditCard), { class: "w-4 h-4" }),
                                          createTextVNode(" Metode Pembayaran ")
                                        ]),
                                        createVNode("p", { class: "text-sm text-muted-foreground" }, " Konfigurasi payment gateway Midtrans (server key, client key, environment) ")
                                      ]),
                                      createVNode("div", { class: "p-3 rounded-lg border" }, [
                                        createVNode("h4", { class: "font-semibold mb-2 flex items-center gap-2" }, [
                                          createVNode(unref(Truck), { class: "w-4 h-4" }),
                                          createTextVNode(" Kurir Pengiriman ")
                                        ]),
                                        createVNode("p", { class: "text-sm text-muted-foreground" }, " Aktifkan/nonaktifkan kurir (JNE, TIKI, POS) dan set biaya admin ")
                                      ]),
                                      createVNode("div", { class: "p-3 rounded-lg border" }, [
                                        createVNode("h4", { class: "font-semibold mb-2 flex items-center gap-2" }, [
                                          createVNode(unref(Settings), { class: "w-4 h-4" }),
                                          createTextVNode(" Alamat Pengiriman ")
                                        ]),
                                        createVNode("p", { class: "text-sm text-muted-foreground" }, " Kelola alamat customer untuk pengiriman produk ")
                                      ]),
                                      createVNode("div", { class: "p-3 rounded-lg border" }, [
                                        createVNode("h4", { class: "font-semibold mb-2 flex items-center gap-2" }, [
                                          createVNode(unref(Package), { class: "w-4 h-4" }),
                                          createTextVNode(" Newsletter ")
                                        ]),
                                        createVNode("p", { class: "text-sm text-muted-foreground" }, " Kelola subscriber newsletter dan kirim email campaign ")
                                      ])
                                    ])
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
                          createVNode(unref(_sfc_main$3), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$4), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$5), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Manajemen E-Wallet")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$6), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Top-up dan withdrawal customer")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                                default: withCtx(() => [
                                  createVNode("div", null, [
                                    createVNode("h4", { class: "font-semibold mb-3" }, "Top-Up (Deposit)"),
                                    createVNode("ul", { class: "space-y-2 ml-6" }, [
                                      createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                        createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                        createVNode("span", null, "Customer request top-up via Midtrans (transfer bank, e-wallet, dll)")
                                      ]),
                                      createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                        createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                        createVNode("span", null, " Setelah pembayaran berhasil, saldo otomatis masuk ke wallet customer ")
                                      ]),
                                      createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                        createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                        createVNode("span", null, 'Admin bisa melihat riwayat top-up di menu "Permintaan Top Up"')
                                      ])
                                    ])
                                  ]),
                                  createVNode(unref(_sfc_main$c)),
                                  createVNode("div", null, [
                                    createVNode("h4", { class: "font-semibold mb-3" }, "Withdrawal (Penarikan)"),
                                    createVNode("ul", { class: "space-y-2 ml-6" }, [
                                      createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                        createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                        createVNode("span", null, "Customer request withdrawal dengan minimum nominal tertentu")
                                      ]),
                                      createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                        createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                        createVNode("span", null, 'Admin approve/reject withdrawal di menu "Permintaan Withdrawal"')
                                      ]),
                                      createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                        createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                        createVNode("span", null, " Jika approved, saldo customer berkurang dan admin transfer manual ke rekening customer ")
                                      ]),
                                      createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                        createVNode(unref(AlertCircle), { class: "w-4 h-4 mt-0.5 text-red-600" }),
                                        createVNode("span", null, [
                                          createVNode("strong", null, "Catatan:"),
                                          createTextVNode(" Pastikan saldo customer cukup sebelum approve ")
                                        ])
                                      ])
                                    ])
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$3), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$4), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$5), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Manajemen User & Customer")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$6), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Kelola akses dan data pengguna")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                                default: withCtx(() => [
                                  createVNode("div", null, [
                                    createVNode("h4", { class: "font-semibold mb-2" }, "User Admin"),
                                    createVNode("p", { class: "text-sm text-muted-foreground mb-2" }, " User dengan akses ke admin panel untuk mengelola sistem "),
                                    createVNode("ul", { class: "space-y-1 ml-6 text-sm" }, [
                                      createVNode("li", { class: "flex items-start gap-2" }, [
                                        createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                        createVNode("span", null, "Tambah/edit/hapus user admin")
                                      ]),
                                      createVNode("li", { class: "flex items-start gap-2" }, [
                                        createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                        createVNode("span", null, "Set password dan email untuk login")
                                      ]),
                                      createVNode("li", { class: "flex items-start gap-2" }, [
                                        createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                        createVNode("span", null, "Upload avatar/foto profil")
                                      ])
                                    ])
                                  ]),
                                  createVNode(unref(_sfc_main$c)),
                                  createVNode("div", null, [
                                    createVNode("h4", { class: "font-semibold mb-2" }, "Customer/Member"),
                                    createVNode("p", { class: "text-sm text-muted-foreground mb-2" }, " Data pelanggan yang berbelanja dan bergabung dalam jaringan MLM "),
                                    createVNode("ul", { class: "space-y-1 ml-6 text-sm" }, [
                                      createVNode("li", { class: "flex items-start gap-2" }, [
                                        createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                        createVNode("span", null, "Lihat data lengkap customer (nama, email, phone, alamat)")
                                      ]),
                                      createVNode("li", { class: "flex items-start gap-2" }, [
                                        createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                        createVNode("span", null, "Lihat riwayat pesanan dan transaksi wallet")
                                      ]),
                                      createVNode("li", { class: "flex items-start gap-2" }, [
                                        createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                        createVNode("span", null, "Lihat posisi dalam jaringan (upline, downline, level)")
                                      ]),
                                      createVNode("li", { class: "flex items-start gap-2" }, [
                                        createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                        createVNode("span", null, "Lihat total bonus yang diterima")
                                      ])
                                    ])
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$3), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$4), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$5), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Pengaturan Sistem")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$6), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Konfigurasi payment, shipping, dan lainnya")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                                    createVNode("div", { class: "p-3 rounded-lg border" }, [
                                      createVNode("h4", { class: "font-semibold mb-2 flex items-center gap-2" }, [
                                        createVNode(unref(CreditCard), { class: "w-4 h-4" }),
                                        createTextVNode(" Metode Pembayaran ")
                                      ]),
                                      createVNode("p", { class: "text-sm text-muted-foreground" }, " Konfigurasi payment gateway Midtrans (server key, client key, environment) ")
                                    ]),
                                    createVNode("div", { class: "p-3 rounded-lg border" }, [
                                      createVNode("h4", { class: "font-semibold mb-2 flex items-center gap-2" }, [
                                        createVNode(unref(Truck), { class: "w-4 h-4" }),
                                        createTextVNode(" Kurir Pengiriman ")
                                      ]),
                                      createVNode("p", { class: "text-sm text-muted-foreground" }, " Aktifkan/nonaktifkan kurir (JNE, TIKI, POS) dan set biaya admin ")
                                    ]),
                                    createVNode("div", { class: "p-3 rounded-lg border" }, [
                                      createVNode("h4", { class: "font-semibold mb-2 flex items-center gap-2" }, [
                                        createVNode(unref(Settings), { class: "w-4 h-4" }),
                                        createTextVNode(" Alamat Pengiriman ")
                                      ]),
                                      createVNode("p", { class: "text-sm text-muted-foreground" }, " Kelola alamat customer untuk pengiriman produk ")
                                    ]),
                                    createVNode("div", { class: "p-3 rounded-lg border" }, [
                                      createVNode("h4", { class: "font-semibold mb-2 flex items-center gap-2" }, [
                                        createVNode(unref(Package), { class: "w-4 h-4" }),
                                        createTextVNode(" Newsletter ")
                                      ]),
                                      createVNode("p", { class: "text-sm text-muted-foreground" }, " Kelola subscriber newsletter dan kirim email campaign ")
                                    ])
                                  ])
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
                  _push3(ssrRenderComponent(unref(_sfc_main$b), {
                    value: "api",
                    class: "space-y-4"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$3), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$4), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$5), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Format Response Standar`);
                                        } else {
                                          return [
                                            createTextVNode("Format Response Standar")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$6), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Struktur response dari backend ke frontend`);
                                        } else {
                                          return [
                                            createTextVNode("Struktur response dari backend ke frontend")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$5), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Format Response Standar")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$6), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Struktur response dari backend ke frontend")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$7), { class: "space-y-4" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div${_scopeId5}><h4 class="font-semibold mb-2 flex items-center gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(CheckCircle), { class: "w-4 h-4 text-green-600" }, null, _parent6, _scopeId5));
                                    _push6(` Success Response </h4><div class="rounded-lg bg-muted p-4"${_scopeId5}><pre class="text-xs overflow-x-auto"${_scopeId5}><code${_scopeId5}>{
  &quot;success&quot;: true,
  &quot;message&quot;: &quot;Data berhasil disimpan&quot;,
  &quot;data&quot;: {
    // Data object sesuai resource
  }
}</code></pre></div></div><div${_scopeId5}><h4 class="font-semibold mb-2 flex items-center gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(AlertCircle), { class: "w-4 h-4 text-red-600" }, null, _parent6, _scopeId5));
                                    _push6(` Error Response </h4><div class="rounded-lg bg-muted p-4"${_scopeId5}><pre class="text-xs overflow-x-auto"${_scopeId5}><code${_scopeId5}>{
  &quot;success&quot;: false,
  &quot;message&quot;: &quot;Validation Error&quot;,
  &quot;errors&quot;: {
    &quot;field_name&quot;: [&quot;Error message 1&quot;, &quot;Error message 2&quot;]
  }
}</code></pre></div></div>`);
                                    _push6(ssrRenderComponent(unref(_sfc_main$c), null, null, _parent6, _scopeId5));
                                    _push6(`<div${_scopeId5}><h4 class="font-semibold mb-3"${_scopeId5}>Flash Messages</h4><p class="text-sm text-muted-foreground mb-2"${_scopeId5}> Flash messages ditampilkan menggunakan toast notification di pojok kanan atas: </p><ul class="space-y-2 ml-6 text-sm"${_scopeId5}><li class="flex items-start gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(CheckCircle), { class: "w-4 h-4 mt-0.5 text-green-600" }, null, _parent6, _scopeId5));
                                    _push6(`<span${_scopeId5}><strong${_scopeId5}>Success:</strong> Background hijau untuk aksi berhasil (create, update, delete) </span></li><li class="flex items-start gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(AlertCircle), { class: "w-4 h-4 mt-0.5 text-red-600" }, null, _parent6, _scopeId5));
                                    _push6(`<span${_scopeId5}><strong${_scopeId5}>Error:</strong> Background merah untuk aksi gagal atau validation error </span></li><li class="flex items-start gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(Info), { class: "w-4 h-4 mt-0.5 text-blue-600" }, null, _parent6, _scopeId5));
                                    _push6(`<span${_scopeId5}><strong${_scopeId5}>Info:</strong> Background biru untuk informasi umum </span></li></ul></div>`);
                                  } else {
                                    return [
                                      createVNode("div", null, [
                                        createVNode("h4", { class: "font-semibold mb-2 flex items-center gap-2" }, [
                                          createVNode(unref(CheckCircle), { class: "w-4 h-4 text-green-600" }),
                                          createTextVNode(" Success Response ")
                                        ]),
                                        createVNode("div", { class: "rounded-lg bg-muted p-4" }, [
                                          createVNode("pre", { class: "text-xs overflow-x-auto" }, [
                                            createVNode("code", null, '{\n  "success": true,\n  "message": "Data berhasil disimpan",\n  "data": {\n    // Data object sesuai resource\n  }\n}')
                                          ])
                                        ])
                                      ]),
                                      createVNode("div", null, [
                                        createVNode("h4", { class: "font-semibold mb-2 flex items-center gap-2" }, [
                                          createVNode(unref(AlertCircle), { class: "w-4 h-4 text-red-600" }),
                                          createTextVNode(" Error Response ")
                                        ]),
                                        createVNode("div", { class: "rounded-lg bg-muted p-4" }, [
                                          createVNode("pre", { class: "text-xs overflow-x-auto" }, [
                                            createVNode("code", null, '{\n  "success": false,\n  "message": "Validation Error",\n  "errors": {\n    "field_name": ["Error message 1", "Error message 2"]\n  }\n}')
                                          ])
                                        ])
                                      ]),
                                      createVNode(unref(_sfc_main$c)),
                                      createVNode("div", null, [
                                        createVNode("h4", { class: "font-semibold mb-3" }, "Flash Messages"),
                                        createVNode("p", { class: "text-sm text-muted-foreground mb-2" }, " Flash messages ditampilkan menggunakan toast notification di pojok kanan atas: "),
                                        createVNode("ul", { class: "space-y-2 ml-6 text-sm" }, [
                                          createVNode("li", { class: "flex items-start gap-2" }, [
                                            createVNode(unref(CheckCircle), { class: "w-4 h-4 mt-0.5 text-green-600" }),
                                            createVNode("span", null, [
                                              createVNode("strong", null, "Success:"),
                                              createTextVNode(" Background hijau untuk aksi berhasil (create, update, delete) ")
                                            ])
                                          ]),
                                          createVNode("li", { class: "flex items-start gap-2" }, [
                                            createVNode(unref(AlertCircle), { class: "w-4 h-4 mt-0.5 text-red-600" }),
                                            createVNode("span", null, [
                                              createVNode("strong", null, "Error:"),
                                              createTextVNode(" Background merah untuk aksi gagal atau validation error ")
                                            ])
                                          ]),
                                          createVNode("li", { class: "flex items-start gap-2" }, [
                                            createVNode(unref(Info), { class: "w-4 h-4 mt-0.5 text-blue-600" }),
                                            createVNode("span", null, [
                                              createVNode("strong", null, "Info:"),
                                              createTextVNode(" Background biru untuk informasi umum ")
                                            ])
                                          ])
                                        ])
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$4), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$5), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Format Response Standar")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$6), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Struktur response dari backend ke frontend")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                                  default: withCtx(() => [
                                    createVNode("div", null, [
                                      createVNode("h4", { class: "font-semibold mb-2 flex items-center gap-2" }, [
                                        createVNode(unref(CheckCircle), { class: "w-4 h-4 text-green-600" }),
                                        createTextVNode(" Success Response ")
                                      ]),
                                      createVNode("div", { class: "rounded-lg bg-muted p-4" }, [
                                        createVNode("pre", { class: "text-xs overflow-x-auto" }, [
                                          createVNode("code", null, '{\n  "success": true,\n  "message": "Data berhasil disimpan",\n  "data": {\n    // Data object sesuai resource\n  }\n}')
                                        ])
                                      ])
                                    ]),
                                    createVNode("div", null, [
                                      createVNode("h4", { class: "font-semibold mb-2 flex items-center gap-2" }, [
                                        createVNode(unref(AlertCircle), { class: "w-4 h-4 text-red-600" }),
                                        createTextVNode(" Error Response ")
                                      ]),
                                      createVNode("div", { class: "rounded-lg bg-muted p-4" }, [
                                        createVNode("pre", { class: "text-xs overflow-x-auto" }, [
                                          createVNode("code", null, '{\n  "success": false,\n  "message": "Validation Error",\n  "errors": {\n    "field_name": ["Error message 1", "Error message 2"]\n  }\n}')
                                        ])
                                      ])
                                    ]),
                                    createVNode(unref(_sfc_main$c)),
                                    createVNode("div", null, [
                                      createVNode("h4", { class: "font-semibold mb-3" }, "Flash Messages"),
                                      createVNode("p", { class: "text-sm text-muted-foreground mb-2" }, " Flash messages ditampilkan menggunakan toast notification di pojok kanan atas: "),
                                      createVNode("ul", { class: "space-y-2 ml-6 text-sm" }, [
                                        createVNode("li", { class: "flex items-start gap-2" }, [
                                          createVNode(unref(CheckCircle), { class: "w-4 h-4 mt-0.5 text-green-600" }),
                                          createVNode("span", null, [
                                            createVNode("strong", null, "Success:"),
                                            createTextVNode(" Background hijau untuk aksi berhasil (create, update, delete) ")
                                          ])
                                        ]),
                                        createVNode("li", { class: "flex items-start gap-2" }, [
                                          createVNode(unref(AlertCircle), { class: "w-4 h-4 mt-0.5 text-red-600" }),
                                          createVNode("span", null, [
                                            createVNode("strong", null, "Error:"),
                                            createTextVNode(" Background merah untuk aksi gagal atau validation error ")
                                          ])
                                        ]),
                                        createVNode("li", { class: "flex items-start gap-2" }, [
                                          createVNode(unref(Info), { class: "w-4 h-4 mt-0.5 text-blue-600" }),
                                          createVNode("span", null, [
                                            createVNode("strong", null, "Info:"),
                                            createTextVNode(" Background biru untuk informasi umum ")
                                          ])
                                        ])
                                      ])
                                    ])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$3), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$4), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$5), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Status Code HTTP`);
                                        } else {
                                          return [
                                            createTextVNode("Status Code HTTP")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$6), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Kode status yang digunakan aplikasi`);
                                        } else {
                                          return [
                                            createTextVNode("Kode status yang digunakan aplikasi")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$5), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Status Code HTTP")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$6), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Kode status yang digunakan aplikasi")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$7), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="space-y-2"${_scopeId5}><div class="flex items-center justify-between p-2 rounded border"${_scopeId5}><div class="flex items-center gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(_sfc_main$2), { variant: "default" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`200`);
                                        } else {
                                          return [
                                            createTextVNode("200")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`<span class="text-sm font-medium"${_scopeId5}>OK</span></div><span class="text-sm text-muted-foreground"${_scopeId5}>Request berhasil</span></div><div class="flex items-center justify-between p-2 rounded border"${_scopeId5}><div class="flex items-center gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(_sfc_main$2), { variant: "default" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`201`);
                                        } else {
                                          return [
                                            createTextVNode("201")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`<span class="text-sm font-medium"${_scopeId5}>Created</span></div><span class="text-sm text-muted-foreground"${_scopeId5}>Data berhasil dibuat</span></div><div class="flex items-center justify-between p-2 rounded border"${_scopeId5}><div class="flex items-center gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(_sfc_main$2), { variant: "secondary" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`400`);
                                        } else {
                                          return [
                                            createTextVNode("400")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`<span class="text-sm font-medium"${_scopeId5}>Bad Request</span></div><span class="text-sm text-muted-foreground"${_scopeId5}>Request tidak valid</span></div><div class="flex items-center justify-between p-2 rounded border"${_scopeId5}><div class="flex items-center gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(_sfc_main$2), { variant: "secondary" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`401`);
                                        } else {
                                          return [
                                            createTextVNode("401")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`<span class="text-sm font-medium"${_scopeId5}>Unauthorized</span></div><span class="text-sm text-muted-foreground"${_scopeId5}>Belum login/autentikasi</span></div><div class="flex items-center justify-between p-2 rounded border"${_scopeId5}><div class="flex items-center gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(_sfc_main$2), { variant: "secondary" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`403`);
                                        } else {
                                          return [
                                            createTextVNode("403")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`<span class="text-sm font-medium"${_scopeId5}>Forbidden</span></div><span class="text-sm text-muted-foreground"${_scopeId5}>Tidak memiliki akses</span></div><div class="flex items-center justify-between p-2 rounded border"${_scopeId5}><div class="flex items-center gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(_sfc_main$2), { variant: "secondary" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`404`);
                                        } else {
                                          return [
                                            createTextVNode("404")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`<span class="text-sm font-medium"${_scopeId5}>Not Found</span></div><span class="text-sm text-muted-foreground"${_scopeId5}>Data tidak ditemukan</span></div><div class="flex items-center justify-between p-2 rounded border"${_scopeId5}><div class="flex items-center gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(_sfc_main$2), { variant: "destructive" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`422`);
                                        } else {
                                          return [
                                            createTextVNode("422")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`<span class="text-sm font-medium"${_scopeId5}>Unprocessable Entity</span></div><span class="text-sm text-muted-foreground"${_scopeId5}>Validation error</span></div><div class="flex items-center justify-between p-2 rounded border"${_scopeId5}><div class="flex items-center gap-2"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(_sfc_main$2), { variant: "destructive" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`500`);
                                        } else {
                                          return [
                                            createTextVNode("500")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`<span class="text-sm font-medium"${_scopeId5}>Internal Server Error</span></div><span class="text-sm text-muted-foreground"${_scopeId5}>Error server</span></div></div>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "space-y-2" }, [
                                        createVNode("div", { class: "flex items-center justify-between p-2 rounded border" }, [
                                          createVNode("div", { class: "flex items-center gap-2" }, [
                                            createVNode(unref(_sfc_main$2), { variant: "default" }, {
                                              default: withCtx(() => [
                                                createTextVNode("200")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode("span", { class: "text-sm font-medium" }, "OK")
                                          ]),
                                          createVNode("span", { class: "text-sm text-muted-foreground" }, "Request berhasil")
                                        ]),
                                        createVNode("div", { class: "flex items-center justify-between p-2 rounded border" }, [
                                          createVNode("div", { class: "flex items-center gap-2" }, [
                                            createVNode(unref(_sfc_main$2), { variant: "default" }, {
                                              default: withCtx(() => [
                                                createTextVNode("201")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode("span", { class: "text-sm font-medium" }, "Created")
                                          ]),
                                          createVNode("span", { class: "text-sm text-muted-foreground" }, "Data berhasil dibuat")
                                        ]),
                                        createVNode("div", { class: "flex items-center justify-between p-2 rounded border" }, [
                                          createVNode("div", { class: "flex items-center gap-2" }, [
                                            createVNode(unref(_sfc_main$2), { variant: "secondary" }, {
                                              default: withCtx(() => [
                                                createTextVNode("400")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode("span", { class: "text-sm font-medium" }, "Bad Request")
                                          ]),
                                          createVNode("span", { class: "text-sm text-muted-foreground" }, "Request tidak valid")
                                        ]),
                                        createVNode("div", { class: "flex items-center justify-between p-2 rounded border" }, [
                                          createVNode("div", { class: "flex items-center gap-2" }, [
                                            createVNode(unref(_sfc_main$2), { variant: "secondary" }, {
                                              default: withCtx(() => [
                                                createTextVNode("401")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode("span", { class: "text-sm font-medium" }, "Unauthorized")
                                          ]),
                                          createVNode("span", { class: "text-sm text-muted-foreground" }, "Belum login/autentikasi")
                                        ]),
                                        createVNode("div", { class: "flex items-center justify-between p-2 rounded border" }, [
                                          createVNode("div", { class: "flex items-center gap-2" }, [
                                            createVNode(unref(_sfc_main$2), { variant: "secondary" }, {
                                              default: withCtx(() => [
                                                createTextVNode("403")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode("span", { class: "text-sm font-medium" }, "Forbidden")
                                          ]),
                                          createVNode("span", { class: "text-sm text-muted-foreground" }, "Tidak memiliki akses")
                                        ]),
                                        createVNode("div", { class: "flex items-center justify-between p-2 rounded border" }, [
                                          createVNode("div", { class: "flex items-center gap-2" }, [
                                            createVNode(unref(_sfc_main$2), { variant: "secondary" }, {
                                              default: withCtx(() => [
                                                createTextVNode("404")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode("span", { class: "text-sm font-medium" }, "Not Found")
                                          ]),
                                          createVNode("span", { class: "text-sm text-muted-foreground" }, "Data tidak ditemukan")
                                        ]),
                                        createVNode("div", { class: "flex items-center justify-between p-2 rounded border" }, [
                                          createVNode("div", { class: "flex items-center gap-2" }, [
                                            createVNode(unref(_sfc_main$2), { variant: "destructive" }, {
                                              default: withCtx(() => [
                                                createTextVNode("422")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode("span", { class: "text-sm font-medium" }, "Unprocessable Entity")
                                          ]),
                                          createVNode("span", { class: "text-sm text-muted-foreground" }, "Validation error")
                                        ]),
                                        createVNode("div", { class: "flex items-center justify-between p-2 rounded border" }, [
                                          createVNode("div", { class: "flex items-center gap-2" }, [
                                            createVNode(unref(_sfc_main$2), { variant: "destructive" }, {
                                              default: withCtx(() => [
                                                createTextVNode("500")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode("span", { class: "text-sm font-medium" }, "Internal Server Error")
                                          ]),
                                          createVNode("span", { class: "text-sm text-muted-foreground" }, "Error server")
                                        ])
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$4), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$5), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Status Code HTTP")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$6), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Kode status yang digunakan aplikasi")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$7), null, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "space-y-2" }, [
                                      createVNode("div", { class: "flex items-center justify-between p-2 rounded border" }, [
                                        createVNode("div", { class: "flex items-center gap-2" }, [
                                          createVNode(unref(_sfc_main$2), { variant: "default" }, {
                                            default: withCtx(() => [
                                              createTextVNode("200")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode("span", { class: "text-sm font-medium" }, "OK")
                                        ]),
                                        createVNode("span", { class: "text-sm text-muted-foreground" }, "Request berhasil")
                                      ]),
                                      createVNode("div", { class: "flex items-center justify-between p-2 rounded border" }, [
                                        createVNode("div", { class: "flex items-center gap-2" }, [
                                          createVNode(unref(_sfc_main$2), { variant: "default" }, {
                                            default: withCtx(() => [
                                              createTextVNode("201")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode("span", { class: "text-sm font-medium" }, "Created")
                                        ]),
                                        createVNode("span", { class: "text-sm text-muted-foreground" }, "Data berhasil dibuat")
                                      ]),
                                      createVNode("div", { class: "flex items-center justify-between p-2 rounded border" }, [
                                        createVNode("div", { class: "flex items-center gap-2" }, [
                                          createVNode(unref(_sfc_main$2), { variant: "secondary" }, {
                                            default: withCtx(() => [
                                              createTextVNode("400")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode("span", { class: "text-sm font-medium" }, "Bad Request")
                                        ]),
                                        createVNode("span", { class: "text-sm text-muted-foreground" }, "Request tidak valid")
                                      ]),
                                      createVNode("div", { class: "flex items-center justify-between p-2 rounded border" }, [
                                        createVNode("div", { class: "flex items-center gap-2" }, [
                                          createVNode(unref(_sfc_main$2), { variant: "secondary" }, {
                                            default: withCtx(() => [
                                              createTextVNode("401")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode("span", { class: "text-sm font-medium" }, "Unauthorized")
                                        ]),
                                        createVNode("span", { class: "text-sm text-muted-foreground" }, "Belum login/autentikasi")
                                      ]),
                                      createVNode("div", { class: "flex items-center justify-between p-2 rounded border" }, [
                                        createVNode("div", { class: "flex items-center gap-2" }, [
                                          createVNode(unref(_sfc_main$2), { variant: "secondary" }, {
                                            default: withCtx(() => [
                                              createTextVNode("403")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode("span", { class: "text-sm font-medium" }, "Forbidden")
                                        ]),
                                        createVNode("span", { class: "text-sm text-muted-foreground" }, "Tidak memiliki akses")
                                      ]),
                                      createVNode("div", { class: "flex items-center justify-between p-2 rounded border" }, [
                                        createVNode("div", { class: "flex items-center gap-2" }, [
                                          createVNode(unref(_sfc_main$2), { variant: "secondary" }, {
                                            default: withCtx(() => [
                                              createTextVNode("404")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode("span", { class: "text-sm font-medium" }, "Not Found")
                                        ]),
                                        createVNode("span", { class: "text-sm text-muted-foreground" }, "Data tidak ditemukan")
                                      ]),
                                      createVNode("div", { class: "flex items-center justify-between p-2 rounded border" }, [
                                        createVNode("div", { class: "flex items-center gap-2" }, [
                                          createVNode(unref(_sfc_main$2), { variant: "destructive" }, {
                                            default: withCtx(() => [
                                              createTextVNode("422")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode("span", { class: "text-sm font-medium" }, "Unprocessable Entity")
                                        ]),
                                        createVNode("span", { class: "text-sm text-muted-foreground" }, "Validation error")
                                      ]),
                                      createVNode("div", { class: "flex items-center justify-between p-2 rounded border" }, [
                                        createVNode("div", { class: "flex items-center gap-2" }, [
                                          createVNode(unref(_sfc_main$2), { variant: "destructive" }, {
                                            default: withCtx(() => [
                                              createTextVNode("500")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode("span", { class: "text-sm font-medium" }, "Internal Server Error")
                                        ]),
                                        createVNode("span", { class: "text-sm text-muted-foreground" }, "Error server")
                                      ])
                                    ])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$3), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$4), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$5), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Contoh Response API`);
                                        } else {
                                          return [
                                            createTextVNode("Contoh Response API")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$6), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Response dari berbagai endpoint`);
                                        } else {
                                          return [
                                            createTextVNode("Response dari berbagai endpoint")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$5), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Contoh Response API")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$6), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Response dari berbagai endpoint")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$7), { class: "space-y-4" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div${_scopeId5}><h4 class="font-semibold mb-2"${_scopeId5}>Product List</h4><div class="rounded-lg bg-muted p-4"${_scopeId5}><pre class="text-xs overflow-x-auto"${_scopeId5}><code${_scopeId5}>{
  &quot;data&quot;: [
    {
      &quot;id&quot;: 1,
      &quot;name&quot;: &quot;Samsung Galaxy S24&quot;,
      &quot;slug&quot;: &quot;samsung-galaxy-s24&quot;,
      &quot;base_price&quot;: 12000000,
      &quot;selling_price&quot;: 11500000,
      &quot;stock_quantity&quot;: 50,
      &quot;weight&quot;: 500,
      &quot;is_active&quot;: true,
      &quot;category&quot;: {
        &quot;id&quot;: 1,
        &quot;name&quot;: &quot;Smartphone&quot;
      },
      &quot;images&quot;: [
        {
          &quot;id&quot;: 1,
          &quot;url&quot;: &quot;/storage/products/image1.jpg&quot;,
          &quot;is_primary&quot;: true
        }
      ]
    }
  ],
  &quot;meta&quot;: {
    &quot;current_page&quot;: 1,
    &quot;per_page&quot;: 10,
    &quot;total&quot;: 100
  }
}</code></pre></div></div><div${_scopeId5}><h4 class="font-semibold mb-2"${_scopeId5}>Order Detail</h4><div class="rounded-lg bg-muted p-4"${_scopeId5}><pre class="text-xs overflow-x-auto"${_scopeId5}><code${_scopeId5}>{
  &quot;id&quot;: 1,
  &quot;order_no&quot;: &quot;ORD-20250121-001&quot;,
  &quot;status&quot;: &quot;PAID&quot;,
  &quot;subtotal_amount&quot;: 11500000,
  &quot;shipping_cost&quot;: 50000,
  &quot;grand_total&quot;: 11550000,
  &quot;customer&quot;: {
    &quot;id&quot;: 1,
    &quot;name&quot;: &quot;John Doe&quot;,
    &quot;email&quot;: &quot;john@example.com&quot;
  },
  &quot;items&quot;: [
    {
      &quot;product_id&quot;: 1,
      &quot;product_name&quot;: &quot;Samsung Galaxy S24&quot;,
      &quot;quantity&quot;: 1,
      &quot;unit_price&quot;: 11500000
    }
  ],
  &quot;shipment&quot;: {
    &quot;courier_code&quot;: &quot;jne&quot;,
    &quot;service_code&quot;: &quot;REG&quot;,
    &quot;tracking_number&quot;: &quot;JNE123456789&quot;,
    &quot;status&quot;: &quot;IN_TRANSIT&quot;
  }
}</code></pre></div></div><div${_scopeId5}><h4 class="font-semibold mb-2"${_scopeId5}>Bonus Detail</h4><div class="rounded-lg bg-muted p-4"${_scopeId5}><pre class="text-xs overflow-x-auto"${_scopeId5}><code${_scopeId5}>{
  &quot;id&quot;: 1,
  &quot;member_id&quot;: 1,
  &quot;bonus_type&quot;: &quot;PAIRING&quot;,
  &quot;amount&quot;: 500000,
  &quot;status&quot;: &quot;RELEASED&quot;,
  &quot;description&quot;: &quot;Bonus pairing dari pair BV kiri-kanan&quot;,
  &quot;released_at&quot;: &quot;2025-01-21T10:30:00Z&quot;,
  &quot;created_at&quot;: &quot;2025-01-21T10:00:00Z&quot;
}</code></pre></div></div>`);
                                  } else {
                                    return [
                                      createVNode("div", null, [
                                        createVNode("h4", { class: "font-semibold mb-2" }, "Product List"),
                                        createVNode("div", { class: "rounded-lg bg-muted p-4" }, [
                                          createVNode("pre", { class: "text-xs overflow-x-auto" }, [
                                            createVNode("code", null, '{\n  "data": [\n    {\n      "id": 1,\n      "name": "Samsung Galaxy S24",\n      "slug": "samsung-galaxy-s24",\n      "base_price": 12000000,\n      "selling_price": 11500000,\n      "stock_quantity": 50,\n      "weight": 500,\n      "is_active": true,\n      "category": {\n        "id": 1,\n        "name": "Smartphone"\n      },\n      "images": [\n        {\n          "id": 1,\n          "url": "/storage/products/image1.jpg",\n          "is_primary": true\n        }\n      ]\n    }\n  ],\n  "meta": {\n    "current_page": 1,\n    "per_page": 10,\n    "total": 100\n  }\n}')
                                          ])
                                        ])
                                      ]),
                                      createVNode("div", null, [
                                        createVNode("h4", { class: "font-semibold mb-2" }, "Order Detail"),
                                        createVNode("div", { class: "rounded-lg bg-muted p-4" }, [
                                          createVNode("pre", { class: "text-xs overflow-x-auto" }, [
                                            createVNode("code", null, '{\n  "id": 1,\n  "order_no": "ORD-20250121-001",\n  "status": "PAID",\n  "subtotal_amount": 11500000,\n  "shipping_cost": 50000,\n  "grand_total": 11550000,\n  "customer": {\n    "id": 1,\n    "name": "John Doe",\n    "email": "john@example.com"\n  },\n  "items": [\n    {\n      "product_id": 1,\n      "product_name": "Samsung Galaxy S24",\n      "quantity": 1,\n      "unit_price": 11500000\n    }\n  ],\n  "shipment": {\n    "courier_code": "jne",\n    "service_code": "REG",\n    "tracking_number": "JNE123456789",\n    "status": "IN_TRANSIT"\n  }\n}')
                                          ])
                                        ])
                                      ]),
                                      createVNode("div", null, [
                                        createVNode("h4", { class: "font-semibold mb-2" }, "Bonus Detail"),
                                        createVNode("div", { class: "rounded-lg bg-muted p-4" }, [
                                          createVNode("pre", { class: "text-xs overflow-x-auto" }, [
                                            createVNode("code", null, '{\n  "id": 1,\n  "member_id": 1,\n  "bonus_type": "PAIRING",\n  "amount": 500000,\n  "status": "RELEASED",\n  "description": "Bonus pairing dari pair BV kiri-kanan",\n  "released_at": "2025-01-21T10:30:00Z",\n  "created_at": "2025-01-21T10:00:00Z"\n}')
                                          ])
                                        ])
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$4), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$5), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Contoh Response API")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$6), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Response dari berbagai endpoint")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                                  default: withCtx(() => [
                                    createVNode("div", null, [
                                      createVNode("h4", { class: "font-semibold mb-2" }, "Product List"),
                                      createVNode("div", { class: "rounded-lg bg-muted p-4" }, [
                                        createVNode("pre", { class: "text-xs overflow-x-auto" }, [
                                          createVNode("code", null, '{\n  "data": [\n    {\n      "id": 1,\n      "name": "Samsung Galaxy S24",\n      "slug": "samsung-galaxy-s24",\n      "base_price": 12000000,\n      "selling_price": 11500000,\n      "stock_quantity": 50,\n      "weight": 500,\n      "is_active": true,\n      "category": {\n        "id": 1,\n        "name": "Smartphone"\n      },\n      "images": [\n        {\n          "id": 1,\n          "url": "/storage/products/image1.jpg",\n          "is_primary": true\n        }\n      ]\n    }\n  ],\n  "meta": {\n    "current_page": 1,\n    "per_page": 10,\n    "total": 100\n  }\n}')
                                        ])
                                      ])
                                    ]),
                                    createVNode("div", null, [
                                      createVNode("h4", { class: "font-semibold mb-2" }, "Order Detail"),
                                      createVNode("div", { class: "rounded-lg bg-muted p-4" }, [
                                        createVNode("pre", { class: "text-xs overflow-x-auto" }, [
                                          createVNode("code", null, '{\n  "id": 1,\n  "order_no": "ORD-20250121-001",\n  "status": "PAID",\n  "subtotal_amount": 11500000,\n  "shipping_cost": 50000,\n  "grand_total": 11550000,\n  "customer": {\n    "id": 1,\n    "name": "John Doe",\n    "email": "john@example.com"\n  },\n  "items": [\n    {\n      "product_id": 1,\n      "product_name": "Samsung Galaxy S24",\n      "quantity": 1,\n      "unit_price": 11500000\n    }\n  ],\n  "shipment": {\n    "courier_code": "jne",\n    "service_code": "REG",\n    "tracking_number": "JNE123456789",\n    "status": "IN_TRANSIT"\n  }\n}')
                                        ])
                                      ])
                                    ]),
                                    createVNode("div", null, [
                                      createVNode("h4", { class: "font-semibold mb-2" }, "Bonus Detail"),
                                      createVNode("div", { class: "rounded-lg bg-muted p-4" }, [
                                        createVNode("pre", { class: "text-xs overflow-x-auto" }, [
                                          createVNode("code", null, '{\n  "id": 1,\n  "member_id": 1,\n  "bonus_type": "PAIRING",\n  "amount": 500000,\n  "status": "RELEASED",\n  "description": "Bonus pairing dari pair BV kiri-kanan",\n  "released_at": "2025-01-21T10:30:00Z",\n  "created_at": "2025-01-21T10:00:00Z"\n}')
                                        ])
                                      ])
                                    ])
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
                          createVNode(unref(_sfc_main$3), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$4), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$5), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Format Response Standar")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$6), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Struktur response dari backend ke frontend")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                                default: withCtx(() => [
                                  createVNode("div", null, [
                                    createVNode("h4", { class: "font-semibold mb-2 flex items-center gap-2" }, [
                                      createVNode(unref(CheckCircle), { class: "w-4 h-4 text-green-600" }),
                                      createTextVNode(" Success Response ")
                                    ]),
                                    createVNode("div", { class: "rounded-lg bg-muted p-4" }, [
                                      createVNode("pre", { class: "text-xs overflow-x-auto" }, [
                                        createVNode("code", null, '{\n  "success": true,\n  "message": "Data berhasil disimpan",\n  "data": {\n    // Data object sesuai resource\n  }\n}')
                                      ])
                                    ])
                                  ]),
                                  createVNode("div", null, [
                                    createVNode("h4", { class: "font-semibold mb-2 flex items-center gap-2" }, [
                                      createVNode(unref(AlertCircle), { class: "w-4 h-4 text-red-600" }),
                                      createTextVNode(" Error Response ")
                                    ]),
                                    createVNode("div", { class: "rounded-lg bg-muted p-4" }, [
                                      createVNode("pre", { class: "text-xs overflow-x-auto" }, [
                                        createVNode("code", null, '{\n  "success": false,\n  "message": "Validation Error",\n  "errors": {\n    "field_name": ["Error message 1", "Error message 2"]\n  }\n}')
                                      ])
                                    ])
                                  ]),
                                  createVNode(unref(_sfc_main$c)),
                                  createVNode("div", null, [
                                    createVNode("h4", { class: "font-semibold mb-3" }, "Flash Messages"),
                                    createVNode("p", { class: "text-sm text-muted-foreground mb-2" }, " Flash messages ditampilkan menggunakan toast notification di pojok kanan atas: "),
                                    createVNode("ul", { class: "space-y-2 ml-6 text-sm" }, [
                                      createVNode("li", { class: "flex items-start gap-2" }, [
                                        createVNode(unref(CheckCircle), { class: "w-4 h-4 mt-0.5 text-green-600" }),
                                        createVNode("span", null, [
                                          createVNode("strong", null, "Success:"),
                                          createTextVNode(" Background hijau untuk aksi berhasil (create, update, delete) ")
                                        ])
                                      ]),
                                      createVNode("li", { class: "flex items-start gap-2" }, [
                                        createVNode(unref(AlertCircle), { class: "w-4 h-4 mt-0.5 text-red-600" }),
                                        createVNode("span", null, [
                                          createVNode("strong", null, "Error:"),
                                          createTextVNode(" Background merah untuk aksi gagal atau validation error ")
                                        ])
                                      ]),
                                      createVNode("li", { class: "flex items-start gap-2" }, [
                                        createVNode(unref(Info), { class: "w-4 h-4 mt-0.5 text-blue-600" }),
                                        createVNode("span", null, [
                                          createVNode("strong", null, "Info:"),
                                          createTextVNode(" Background biru untuk informasi umum ")
                                        ])
                                      ])
                                    ])
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$3), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$4), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$5), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Status Code HTTP")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$6), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Kode status yang digunakan aplikasi")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$7), null, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "space-y-2" }, [
                                    createVNode("div", { class: "flex items-center justify-between p-2 rounded border" }, [
                                      createVNode("div", { class: "flex items-center gap-2" }, [
                                        createVNode(unref(_sfc_main$2), { variant: "default" }, {
                                          default: withCtx(() => [
                                            createTextVNode("200")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("span", { class: "text-sm font-medium" }, "OK")
                                      ]),
                                      createVNode("span", { class: "text-sm text-muted-foreground" }, "Request berhasil")
                                    ]),
                                    createVNode("div", { class: "flex items-center justify-between p-2 rounded border" }, [
                                      createVNode("div", { class: "flex items-center gap-2" }, [
                                        createVNode(unref(_sfc_main$2), { variant: "default" }, {
                                          default: withCtx(() => [
                                            createTextVNode("201")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("span", { class: "text-sm font-medium" }, "Created")
                                      ]),
                                      createVNode("span", { class: "text-sm text-muted-foreground" }, "Data berhasil dibuat")
                                    ]),
                                    createVNode("div", { class: "flex items-center justify-between p-2 rounded border" }, [
                                      createVNode("div", { class: "flex items-center gap-2" }, [
                                        createVNode(unref(_sfc_main$2), { variant: "secondary" }, {
                                          default: withCtx(() => [
                                            createTextVNode("400")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("span", { class: "text-sm font-medium" }, "Bad Request")
                                      ]),
                                      createVNode("span", { class: "text-sm text-muted-foreground" }, "Request tidak valid")
                                    ]),
                                    createVNode("div", { class: "flex items-center justify-between p-2 rounded border" }, [
                                      createVNode("div", { class: "flex items-center gap-2" }, [
                                        createVNode(unref(_sfc_main$2), { variant: "secondary" }, {
                                          default: withCtx(() => [
                                            createTextVNode("401")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("span", { class: "text-sm font-medium" }, "Unauthorized")
                                      ]),
                                      createVNode("span", { class: "text-sm text-muted-foreground" }, "Belum login/autentikasi")
                                    ]),
                                    createVNode("div", { class: "flex items-center justify-between p-2 rounded border" }, [
                                      createVNode("div", { class: "flex items-center gap-2" }, [
                                        createVNode(unref(_sfc_main$2), { variant: "secondary" }, {
                                          default: withCtx(() => [
                                            createTextVNode("403")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("span", { class: "text-sm font-medium" }, "Forbidden")
                                      ]),
                                      createVNode("span", { class: "text-sm text-muted-foreground" }, "Tidak memiliki akses")
                                    ]),
                                    createVNode("div", { class: "flex items-center justify-between p-2 rounded border" }, [
                                      createVNode("div", { class: "flex items-center gap-2" }, [
                                        createVNode(unref(_sfc_main$2), { variant: "secondary" }, {
                                          default: withCtx(() => [
                                            createTextVNode("404")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("span", { class: "text-sm font-medium" }, "Not Found")
                                      ]),
                                      createVNode("span", { class: "text-sm text-muted-foreground" }, "Data tidak ditemukan")
                                    ]),
                                    createVNode("div", { class: "flex items-center justify-between p-2 rounded border" }, [
                                      createVNode("div", { class: "flex items-center gap-2" }, [
                                        createVNode(unref(_sfc_main$2), { variant: "destructive" }, {
                                          default: withCtx(() => [
                                            createTextVNode("422")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("span", { class: "text-sm font-medium" }, "Unprocessable Entity")
                                      ]),
                                      createVNode("span", { class: "text-sm text-muted-foreground" }, "Validation error")
                                    ]),
                                    createVNode("div", { class: "flex items-center justify-between p-2 rounded border" }, [
                                      createVNode("div", { class: "flex items-center gap-2" }, [
                                        createVNode(unref(_sfc_main$2), { variant: "destructive" }, {
                                          default: withCtx(() => [
                                            createTextVNode("500")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("span", { class: "text-sm font-medium" }, "Internal Server Error")
                                      ]),
                                      createVNode("span", { class: "text-sm text-muted-foreground" }, "Error server")
                                    ])
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$3), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$4), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$5), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Contoh Response API")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$6), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Response dari berbagai endpoint")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                                default: withCtx(() => [
                                  createVNode("div", null, [
                                    createVNode("h4", { class: "font-semibold mb-2" }, "Product List"),
                                    createVNode("div", { class: "rounded-lg bg-muted p-4" }, [
                                      createVNode("pre", { class: "text-xs overflow-x-auto" }, [
                                        createVNode("code", null, '{\n  "data": [\n    {\n      "id": 1,\n      "name": "Samsung Galaxy S24",\n      "slug": "samsung-galaxy-s24",\n      "base_price": 12000000,\n      "selling_price": 11500000,\n      "stock_quantity": 50,\n      "weight": 500,\n      "is_active": true,\n      "category": {\n        "id": 1,\n        "name": "Smartphone"\n      },\n      "images": [\n        {\n          "id": 1,\n          "url": "/storage/products/image1.jpg",\n          "is_primary": true\n        }\n      ]\n    }\n  ],\n  "meta": {\n    "current_page": 1,\n    "per_page": 10,\n    "total": 100\n  }\n}')
                                      ])
                                    ])
                                  ]),
                                  createVNode("div", null, [
                                    createVNode("h4", { class: "font-semibold mb-2" }, "Order Detail"),
                                    createVNode("div", { class: "rounded-lg bg-muted p-4" }, [
                                      createVNode("pre", { class: "text-xs overflow-x-auto" }, [
                                        createVNode("code", null, '{\n  "id": 1,\n  "order_no": "ORD-20250121-001",\n  "status": "PAID",\n  "subtotal_amount": 11500000,\n  "shipping_cost": 50000,\n  "grand_total": 11550000,\n  "customer": {\n    "id": 1,\n    "name": "John Doe",\n    "email": "john@example.com"\n  },\n  "items": [\n    {\n      "product_id": 1,\n      "product_name": "Samsung Galaxy S24",\n      "quantity": 1,\n      "unit_price": 11500000\n    }\n  ],\n  "shipment": {\n    "courier_code": "jne",\n    "service_code": "REG",\n    "tracking_number": "JNE123456789",\n    "status": "IN_TRANSIT"\n  }\n}')
                                      ])
                                    ])
                                  ]),
                                  createVNode("div", null, [
                                    createVNode("h4", { class: "font-semibold mb-2" }, "Bonus Detail"),
                                    createVNode("div", { class: "rounded-lg bg-muted p-4" }, [
                                      createVNode("pre", { class: "text-xs overflow-x-auto" }, [
                                        createVNode("code", null, '{\n  "id": 1,\n  "member_id": 1,\n  "bonus_type": "PAIRING",\n  "amount": 500000,\n  "status": "RELEASED",\n  "description": "Bonus pairing dari pair BV kiri-kanan",\n  "released_at": "2025-01-21T10:30:00Z",\n  "created_at": "2025-01-21T10:00:00Z"\n}')
                                      ])
                                    ])
                                  ])
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
                } else {
                  return [
                    createVNode(unref(_sfc_main$9), { class: "grid w-full grid-cols-5" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$a), { value: "overview" }, {
                          default: withCtx(() => [
                            createTextVNode("Overview")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$a), { value: "ecommerce" }, {
                          default: withCtx(() => [
                            createTextVNode("E-Commerce")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$a), { value: "mlm" }, {
                          default: withCtx(() => [
                            createTextVNode("MLM System")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$a), { value: "management" }, {
                          default: withCtx(() => [
                            createTextVNode("Manajemen")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$a), { value: "api" }, {
                          default: withCtx(() => [
                            createTextVNode("API Response")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$b), {
                      value: "overview",
                      class: "space-y-4"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$3), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$4), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$5), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Tentang Aplikasi")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$6), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Sistem E-Commerce dengan fitur Multi-Level Marketing")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$7), { class: "space-y-6" }, {
                              default: withCtx(() => [
                                createVNode("div", null, [
                                  createVNode("h3", { class: "text-lg font-semibold mb-3" }, "Fitur Utama"),
                                  createVNode("div", { class: "grid gap-3 md:grid-cols-2" }, [
                                    createVNode("div", { class: "flex items-start gap-3 p-3 rounded-lg border" }, [
                                      createVNode(unref(ShoppingCart), { class: "w-5 h-5 text-primary mt-0.5" }),
                                      createVNode("div", null, [
                                        createVNode("h4", { class: "font-medium" }, "E-Commerce Lengkap"),
                                        createVNode("p", { class: "text-sm text-muted-foreground" }, " Manajemen produk, kategori, keranjang, wishlist, review, dan promosi ")
                                      ])
                                    ]),
                                    createVNode("div", { class: "flex items-start gap-3 p-3 rounded-lg border" }, [
                                      createVNode(unref(TrendingUp), { class: "w-5 h-5 text-primary mt-0.5" }),
                                      createVNode("div", null, [
                                        createVNode("h4", { class: "font-medium" }, "Sistem MLM Binary & Matrix"),
                                        createVNode("p", { class: "text-sm text-muted-foreground" }, " Jaringan binary tree dan matrix dengan bonus otomatis ")
                                      ])
                                    ]),
                                    createVNode("div", { class: "flex items-start gap-3 p-3 rounded-lg border" }, [
                                      createVNode(unref(Wallet), { class: "w-5 h-5 text-primary mt-0.5" }),
                                      createVNode("div", null, [
                                        createVNode("h4", { class: "font-medium" }, "E-Wallet Terintegrasi"),
                                        createVNode("p", { class: "text-sm text-muted-foreground" }, " Sistem wallet dengan top-up dan withdrawal otomatis ")
                                      ])
                                    ]),
                                    createVNode("div", { class: "flex items-start gap-3 p-3 rounded-lg border" }, [
                                      createVNode(unref(Package), { class: "w-5 h-5 text-primary mt-0.5" }),
                                      createVNode("div", null, [
                                        createVNode("h4", { class: "font-medium" }, "Manajemen Order"),
                                        createVNode("p", { class: "text-sm text-muted-foreground" }, " Tracking pesanan, pengiriman, retur & refund lengkap ")
                                      ])
                                    ])
                                  ])
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$3), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$4), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$5), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Struktur Menu")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$6), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Navigasi dan akses fitur sistem")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$7), null, {
                              default: withCtx(() => [
                                createVNode("div", { class: "space-y-3" }, [
                                  createVNode("div", { class: "flex items-center gap-3 p-3 rounded-lg border" }, [
                                    createVNode(unref(Users), { class: "w-5 h-5 text-primary" }),
                                    createVNode("div", { class: "flex-1" }, [
                                      createVNode("h4", { class: "font-medium" }, "Kelola"),
                                      createVNode("p", { class: "text-sm text-muted-foreground" }, "User admin dan data pelanggan")
                                    ])
                                  ]),
                                  createVNode("div", { class: "flex items-center gap-3 p-3 rounded-lg border" }, [
                                    createVNode(unref(ShoppingCart), { class: "w-5 h-5 text-primary" }),
                                    createVNode("div", { class: "flex-1" }, [
                                      createVNode("h4", { class: "font-medium" }, "E-Commerce"),
                                      createVNode("p", { class: "text-sm text-muted-foreground" }, " Produk, kategori, keranjang, wishlist, review, dan promosi ")
                                    ])
                                  ]),
                                  createVNode("div", { class: "flex items-center gap-3 p-3 rounded-lg border" }, [
                                    createVNode(unref(Package), { class: "w-5 h-5 text-primary" }),
                                    createVNode("div", { class: "flex-1" }, [
                                      createVNode("h4", { class: "font-medium" }, "Pembelian"),
                                      createVNode("p", { class: "text-sm text-muted-foreground" }, " Pesanan, pembayaran, pengiriman, dan retur ")
                                    ])
                                  ]),
                                  createVNode("div", { class: "flex items-center gap-3 p-3 rounded-lg border" }, [
                                    createVNode(unref(TrendingUp), { class: "w-5 h-5 text-primary" }),
                                    createVNode("div", { class: "flex-1" }, [
                                      createVNode("h4", { class: "font-medium" }, "Bonus & Komisi MLM"),
                                      createVNode("p", { class: "text-sm text-muted-foreground" }, " Bonus umum, matching, pairing, dan sponsor ")
                                    ])
                                  ]),
                                  createVNode("div", { class: "flex items-center gap-3 p-3 rounded-lg border" }, [
                                    createVNode(unref(Wallet), { class: "w-5 h-5 text-primary" }),
                                    createVNode("div", { class: "flex-1" }, [
                                      createVNode("h4", { class: "font-medium" }, "E-Wallet"),
                                      createVNode("p", { class: "text-sm text-muted-foreground" }, " Saldo, transaksi, top-up, dan withdrawal ")
                                    ])
                                  ]),
                                  createVNode("div", { class: "flex items-center gap-3 p-3 rounded-lg border" }, [
                                    createVNode(unref(Grid3x3), { class: "w-5 h-5 text-primary" }),
                                    createVNode("div", { class: "flex-1" }, [
                                      createVNode("h4", { class: "font-medium" }, "Jaringan MLM"),
                                      createVNode("p", { class: "text-sm text-muted-foreground" }, " Binary tree dan matrix network visualization ")
                                    ])
                                  ]),
                                  createVNode("div", { class: "flex items-center gap-3 p-3 rounded-lg border" }, [
                                    createVNode(unref(Settings), { class: "w-5 h-5 text-primary" }),
                                    createVNode("div", { class: "flex-1" }, [
                                      createVNode("h4", { class: "font-medium" }, "Pengaturan"),
                                      createVNode("p", { class: "text-sm text-muted-foreground" }, " Alamat, payment, kurir, dan newsletter ")
                                    ])
                                  ])
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$b), {
                      value: "ecommerce",
                      class: "space-y-4"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$3), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$4), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$5), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Manajemen Produk")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$6), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Kelola produk, kategori, dan promosi")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "space-y-3" }, [
                                  createVNode("div", null, [
                                    createVNode("h4", { class: "font-semibold mb-2 flex items-center gap-2" }, [
                                      createVNode(unref(Package), { class: "w-4 h-4" }),
                                      createTextVNode(" Produk ")
                                    ]),
                                    createVNode("ul", { class: "space-y-2 ml-6" }, [
                                      createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                        createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                        createVNode("span", null, [
                                          createVNode("strong", null, "Tambah Produk:"),
                                          createTextVNode(' Klik tombol "Tambah Produk", isi nama, deskripsi, harga, stok, berat, dan kategori ')
                                        ])
                                      ]),
                                      createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                        createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                        createVNode("span", null, [
                                          createVNode("strong", null, "Upload Gambar:"),
                                          createTextVNode(" Maksimal 5 gambar per produk, gambar pertama akan menjadi gambar utama ")
                                        ])
                                      ]),
                                      createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                        createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                        createVNode("span", null, [
                                          createVNode("strong", null, "Edit/Hapus:"),
                                          createTextVNode(" Klik icon pensil untuk edit atau icon trash untuk hapus produk ")
                                        ])
                                      ]),
                                      createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                        createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                        createVNode("span", null, [
                                          createVNode("strong", null, "Status:"),
                                          createTextVNode(" Toggle aktif/non-aktif untuk menampilkan/ menyembunyikan produk di store ")
                                        ])
                                      ])
                                    ])
                                  ]),
                                  createVNode(unref(_sfc_main$c)),
                                  createVNode("div", null, [
                                    createVNode("h4", { class: "font-semibold mb-2 flex items-center gap-2" }, [
                                      createVNode(unref(Star), { class: "w-4 h-4" }),
                                      createTextVNode(" Review Produk ")
                                    ]),
                                    createVNode("ul", { class: "space-y-2 ml-6" }, [
                                      createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                        createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                        createVNode("span", null, "Customer dapat memberikan rating 1-5 bintang dan komentar")
                                      ]),
                                      createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                        createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                        createVNode("span", null, "Admin dapat approve/reject review sebelum ditampilkan")
                                      ]),
                                      createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                        createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                        createVNode("span", null, "Review hanya bisa diberikan setelah pesanan selesai (COMPLETED)")
                                      ])
                                    ])
                                  ]),
                                  createVNode(unref(_sfc_main$c)),
                                  createVNode("div", null, [
                                    createVNode("h4", { class: "font-semibold mb-2 flex items-center gap-2" }, [
                                      createVNode(unref(BadgePercent), { class: "w-4 h-4" }),
                                      createTextVNode(" Promosi & Diskon ")
                                    ]),
                                    createVNode("ul", { class: "space-y-2 ml-6" }, [
                                      createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                        createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                        createVNode("span", null, [
                                          createVNode("strong", null, "Tipe Diskon:"),
                                          createTextVNode(" Persentase (%) atau Nominal (Rp) ")
                                        ])
                                      ]),
                                      createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                        createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                        createVNode("span", null, [
                                          createVNode("strong", null, "Periode:"),
                                          createTextVNode(" Set tanggal mulai dan berakhir promosi ")
                                        ])
                                      ]),
                                      createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                        createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                        createVNode("span", null, [
                                          createVNode("strong", null, "Minimum Order:"),
                                          createTextVNode(" Opsional, set minimal pembelian untuk diskon ")
                                        ])
                                      ])
                                    ])
                                  ])
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$3), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$4), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$5), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Manajemen Pesanan")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$6), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Proses order dari pembayaran hingga pengiriman")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                              default: withCtx(() => [
                                createVNode("div", null, [
                                  createVNode("h4", { class: "font-semibold mb-3" }, "Alur Pesanan"),
                                  createVNode("div", { class: "space-y-3" }, [
                                    createVNode("div", { class: "flex items-start gap-3 p-3 rounded-lg border bg-muted/50" }, [
                                      createVNode("div", { class: "flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500/10" }, [
                                        createVNode("span", { class: "text-sm font-bold text-yellow-600" }, "1")
                                      ]),
                                      createVNode("div", { class: "flex-1" }, [
                                        createVNode(unref(_sfc_main$2), {
                                          variant: "secondary",
                                          class: "mb-1"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("PENDING")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("p", { class: "text-sm text-muted-foreground" }, " Customer checkout dan menunggu pembayaran via Midtrans ")
                                      ])
                                    ]),
                                    createVNode("div", { class: "flex items-start gap-3 p-3 rounded-lg border bg-muted/50" }, [
                                      createVNode("div", { class: "flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10" }, [
                                        createVNode("span", { class: "text-sm font-bold text-blue-600" }, "2")
                                      ]),
                                      createVNode("div", { class: "flex-1" }, [
                                        createVNode(unref(_sfc_main$2), {
                                          variant: "default",
                                          class: "mb-1"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("PAID")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("p", { class: "text-sm text-muted-foreground" }, " Pembayaran berhasil, admin setup pengiriman (pilih kurir, input resi) ")
                                      ])
                                    ]),
                                    createVNode("div", { class: "flex items-start gap-3 p-3 rounded-lg border bg-muted/50" }, [
                                      createVNode("div", { class: "flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/10" }, [
                                        createVNode("span", { class: "text-sm font-bold text-purple-600" }, "3")
                                      ]),
                                      createVNode("div", { class: "flex-1" }, [
                                        createVNode(unref(_sfc_main$2), {
                                          variant: "secondary",
                                          class: "mb-1"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("SHIPPED")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("p", { class: "text-sm text-muted-foreground" }, " Paket dalam pengiriman, customer bisa tracking dengan nomor resi ")
                                      ])
                                    ]),
                                    createVNode("div", { class: "flex items-start gap-3 p-3 rounded-lg border bg-muted/50" }, [
                                      createVNode("div", { class: "flex h-8 w-8 items-center justify-center rounded-full bg-green-500/10" }, [
                                        createVNode("span", { class: "text-sm font-bold text-green-600" }, "4")
                                      ]),
                                      createVNode("div", { class: "flex-1" }, [
                                        createVNode(unref(_sfc_main$2), {
                                          variant: "default",
                                          class: "mb-1"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("COMPLETED")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("p", { class: "text-sm text-muted-foreground" }, " Paket diterima customer, bonus MLM otomatis dihitung ")
                                      ])
                                    ])
                                  ])
                                ]),
                                createVNode(unref(_sfc_main$c)),
                                createVNode("div", null, [
                                  createVNode("h4", { class: "font-semibold mb-2" }, "Aksi Admin"),
                                  createVNode("ul", { class: "space-y-2 ml-6" }, [
                                    createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                      createVNode(unref(CheckCircle), { class: "w-4 h-4 mt-0.5 text-green-600" }),
                                      createVNode("span", null, [
                                        createVNode("strong", null, "Setup Pengiriman:"),
                                        createTextVNode(" Pilih kurir (JNE, TIKI, POS), input nomor resi, dan konfirmasi ")
                                      ])
                                    ]),
                                    createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                      createVNode(unref(CheckCircle), { class: "w-4 h-4 mt-0.5 text-green-600" }),
                                      createVNode("span", null, [
                                        createVNode("strong", null, "Tandai Dikirim:"),
                                        createTextVNode(" Update status menjadi SHIPPED setelah paket diserahkan ke kurir ")
                                      ])
                                    ]),
                                    createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                      createVNode(unref(CheckCircle), { class: "w-4 h-4 mt-0.5 text-green-600" }),
                                      createVNode("span", null, [
                                        createVNode("strong", null, "Tandai Selesai:"),
                                        createTextVNode(" Update status menjadi COMPLETED setelah customer terima paket ")
                                      ])
                                    ]),
                                    createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                      createVNode(unref(AlertCircle), { class: "w-4 h-4 mt-0.5 text-red-600" }),
                                      createVNode("span", null, [
                                        createVNode("strong", null, "Batalkan Pesanan:"),
                                        createTextVNode(" Hanya bisa dibatalkan jika status PENDING atau PAID ")
                                      ])
                                    ])
                                  ])
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$b), {
                      value: "mlm",
                      class: "space-y-4"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$3), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$4), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$5), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Sistem Jaringan MLM")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$6), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Binary Tree dan Matrix Network")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$7), { class: "space-y-6" }, {
                              default: withCtx(() => [
                                createVNode("div", null, [
                                  createVNode("h4", { class: "font-semibold mb-3 flex items-center gap-2" }, [
                                    createVNode(unref(Grid3x3), { class: "w-4 h-4" }),
                                    createTextVNode(" Jaringan Binary ")
                                  ]),
                                  createVNode("div", { class: "space-y-3" }, [
                                    createVNode("p", { class: "text-sm text-muted-foreground" }, " Setiap member memiliki maksimal 2 downline (kiri dan kanan). Placement otomatis menggunakan algoritma breadth-first search. "),
                                    createVNode("ul", { class: "space-y-2 ml-6" }, [
                                      createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                        createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                        createVNode("span", null, [
                                          createVNode("strong", null, "Auto Placement:"),
                                          createTextVNode(" Member baru otomatis ditempatkan di posisi tersedia pertama ")
                                        ])
                                      ]),
                                      createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                        createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                        createVNode("span", null, [
                                          createVNode("strong", null, "Visualisasi Tree:"),
                                          createTextVNode(" Lihat struktur jaringan binary dalam bentuk tree diagram ")
                                        ])
                                      ]),
                                      createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                        createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                        createVNode("span", null, [
                                          createVNode("strong", null, "Bonus Pairing:"),
                                          createTextVNode(" Dihitung berdasarkan pasangan (pair) dari BV kiri dan kanan ")
                                        ])
                                      ])
                                    ])
                                  ])
                                ]),
                                createVNode(unref(_sfc_main$c)),
                                createVNode("div", null, [
                                  createVNode("h4", { class: "font-semibold mb-3 flex items-center gap-2" }, [
                                    createVNode(unref(TrendingUp), { class: "w-4 h-4" }),
                                    createTextVNode(" Jaringan Matrix ")
                                  ]),
                                  createVNode("div", { class: "space-y-3" }, [
                                    createVNode("p", { class: "text-sm text-muted-foreground" }, " Mencatat hubungan sponsor-member untuk perhitungan bonus sponsor dan matching. "),
                                    createVNode("ul", { class: "space-y-2 ml-6" }, [
                                      createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                        createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                        createVNode("span", null, [
                                          createVNode("strong", null, "Sponsor Direct:"),
                                          createTextVNode(" Member yang langsung direkrut oleh sponsor ")
                                        ])
                                      ]),
                                      createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                        createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                        createVNode("span", null, [
                                          createVNode("strong", null, "Level Tracking:"),
                                          createTextVNode(" Mencatat level kedalaman setiap member dari sponsor ")
                                        ])
                                      ]),
                                      createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                        createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                        createVNode("span", null, [
                                          createVNode("strong", null, "Bonus Sponsor:"),
                                          createTextVNode(" Diberikan ke sponsor langsung saat member belanja ")
                                        ])
                                      ])
                                    ])
                                  ])
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$3), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$4), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$5), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Sistem Bonus & Komisi")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$6), null, {
                                  default: withCtx(() => [
                                    createTextVNode("4 jenis bonus otomatis")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                                  createVNode("div", { class: "p-4 rounded-lg border bg-card space-y-2" }, [
                                    createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                      createVNode(unref(Wallet), { class: "w-5 h-5 text-primary" }),
                                      createVNode("h4", { class: "font-semibold" }, "Bonus Umum")
                                    ]),
                                    createVNode("p", { class: "text-sm text-muted-foreground" }, " Bonus untuk member saat melakukan pembelian pertama atau pencapaian tertentu. "),
                                    createVNode("ul", { class: "text-xs space-y-1 ml-4 text-muted-foreground" }, [
                                      createVNode("li", null, "• Diberikan sekali saat kondisi terpenuhi"),
                                      createVNode("li", null, "• Status: PENDING → RELEASED"),
                                      createVNode("li", null, "• Otomatis masuk ke wallet saat RELEASED")
                                    ])
                                  ]),
                                  createVNode("div", { class: "p-4 rounded-lg border bg-card space-y-2" }, [
                                    createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                      createVNode(unref(CreditCard), { class: "w-5 h-5 text-primary" }),
                                      createVNode("h4", { class: "font-semibold" }, "Bonus Sponsor")
                                    ]),
                                    createVNode("p", { class: "text-sm text-muted-foreground" }, " Komisi untuk sponsor langsung saat downline melakukan pembelian. "),
                                    createVNode("ul", { class: "text-xs space-y-1 ml-4 text-muted-foreground" }, [
                                      createVNode("li", null, "• Persentase dari total pembelian downline"),
                                      createVNode("li", null, "• Dihitung otomatis saat order COMPLETED"),
                                      createVNode("li", null, "• Langsung masuk wallet sponsor")
                                    ])
                                  ]),
                                  createVNode("div", { class: "p-4 rounded-lg border bg-card space-y-2" }, [
                                    createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                      createVNode(unref(Grid3x3), { class: "w-5 h-5 text-primary" }),
                                      createVNode("h4", { class: "font-semibold" }, "Bonus Pairing")
                                    ]),
                                    createVNode("p", { class: "text-sm text-muted-foreground" }, " Bonus dari pasangan (pair) BV antara kaki kiri dan kanan di binary tree. "),
                                    createVNode("ul", { class: "text-xs space-y-1 ml-4 text-muted-foreground" }, [
                                      createVNode("li", null, "• Berdasarkan BV terkecil dari 2 kaki"),
                                      createVNode("li", null, "• Sisa BV carry over ke periode berikutnya"),
                                      createVNode("li", null, "• Dihitung otomatis setiap ada transaksi")
                                    ])
                                  ]),
                                  createVNode("div", { class: "p-4 rounded-lg border bg-card space-y-2" }, [
                                    createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                      createVNode(unref(TrendingUp), { class: "w-5 h-5 text-primary" }),
                                      createVNode("h4", { class: "font-semibold" }, "Bonus Matching")
                                    ]),
                                    createVNode("p", { class: "text-sm text-muted-foreground" }, " Bonus matching dari bonus pairing downline hingga level tertentu. "),
                                    createVNode("ul", { class: "text-xs space-y-1 ml-4 text-muted-foreground" }, [
                                      createVNode("li", null, "• Persentase dari bonus pairing downline"),
                                      createVNode("li", null, "• Maksimal sampai level N (konfigurasi)"),
                                      createVNode("li", null, "• Dihitung setelah bonus pairing")
                                    ])
                                  ])
                                ]),
                                createVNode("div", { class: "p-4 rounded-lg border bg-yellow-50 dark:bg-yellow-950/20" }, [
                                  createVNode("div", { class: "flex gap-2" }, [
                                    createVNode(unref(Info), { class: "w-5 h-5 text-yellow-600 flex-shrink-0" }),
                                    createVNode("div", null, [
                                      createVNode("h4", { class: "font-semibold text-sm text-yellow-900 dark:text-yellow-100 mb-1" }, " Catatan Penting "),
                                      createVNode("p", { class: "text-sm text-yellow-800 dark:text-yellow-200" }, " Semua bonus dihitung otomatis oleh sistem saat order mencapai status COMPLETED. Admin hanya perlu melakukan release bonus dari PENDING menjadi RELEASED jika ada approval manual. ")
                                    ])
                                  ])
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$b), {
                      value: "management",
                      class: "space-y-4"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$3), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$4), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$5), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Manajemen E-Wallet")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$6), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Top-up dan withdrawal customer")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                              default: withCtx(() => [
                                createVNode("div", null, [
                                  createVNode("h4", { class: "font-semibold mb-3" }, "Top-Up (Deposit)"),
                                  createVNode("ul", { class: "space-y-2 ml-6" }, [
                                    createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                      createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                      createVNode("span", null, "Customer request top-up via Midtrans (transfer bank, e-wallet, dll)")
                                    ]),
                                    createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                      createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                      createVNode("span", null, " Setelah pembayaran berhasil, saldo otomatis masuk ke wallet customer ")
                                    ]),
                                    createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                      createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                      createVNode("span", null, 'Admin bisa melihat riwayat top-up di menu "Permintaan Top Up"')
                                    ])
                                  ])
                                ]),
                                createVNode(unref(_sfc_main$c)),
                                createVNode("div", null, [
                                  createVNode("h4", { class: "font-semibold mb-3" }, "Withdrawal (Penarikan)"),
                                  createVNode("ul", { class: "space-y-2 ml-6" }, [
                                    createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                      createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                      createVNode("span", null, "Customer request withdrawal dengan minimum nominal tertentu")
                                    ]),
                                    createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                      createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                      createVNode("span", null, 'Admin approve/reject withdrawal di menu "Permintaan Withdrawal"')
                                    ]),
                                    createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                      createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                      createVNode("span", null, " Jika approved, saldo customer berkurang dan admin transfer manual ke rekening customer ")
                                    ]),
                                    createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                      createVNode(unref(AlertCircle), { class: "w-4 h-4 mt-0.5 text-red-600" }),
                                      createVNode("span", null, [
                                        createVNode("strong", null, "Catatan:"),
                                        createTextVNode(" Pastikan saldo customer cukup sebelum approve ")
                                      ])
                                    ])
                                  ])
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$3), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$4), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$5), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Manajemen User & Customer")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$6), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Kelola akses dan data pengguna")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                              default: withCtx(() => [
                                createVNode("div", null, [
                                  createVNode("h4", { class: "font-semibold mb-2" }, "User Admin"),
                                  createVNode("p", { class: "text-sm text-muted-foreground mb-2" }, " User dengan akses ke admin panel untuk mengelola sistem "),
                                  createVNode("ul", { class: "space-y-1 ml-6 text-sm" }, [
                                    createVNode("li", { class: "flex items-start gap-2" }, [
                                      createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                      createVNode("span", null, "Tambah/edit/hapus user admin")
                                    ]),
                                    createVNode("li", { class: "flex items-start gap-2" }, [
                                      createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                      createVNode("span", null, "Set password dan email untuk login")
                                    ]),
                                    createVNode("li", { class: "flex items-start gap-2" }, [
                                      createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                      createVNode("span", null, "Upload avatar/foto profil")
                                    ])
                                  ])
                                ]),
                                createVNode(unref(_sfc_main$c)),
                                createVNode("div", null, [
                                  createVNode("h4", { class: "font-semibold mb-2" }, "Customer/Member"),
                                  createVNode("p", { class: "text-sm text-muted-foreground mb-2" }, " Data pelanggan yang berbelanja dan bergabung dalam jaringan MLM "),
                                  createVNode("ul", { class: "space-y-1 ml-6 text-sm" }, [
                                    createVNode("li", { class: "flex items-start gap-2" }, [
                                      createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                      createVNode("span", null, "Lihat data lengkap customer (nama, email, phone, alamat)")
                                    ]),
                                    createVNode("li", { class: "flex items-start gap-2" }, [
                                      createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                      createVNode("span", null, "Lihat riwayat pesanan dan transaksi wallet")
                                    ]),
                                    createVNode("li", { class: "flex items-start gap-2" }, [
                                      createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                      createVNode("span", null, "Lihat posisi dalam jaringan (upline, downline, level)")
                                    ]),
                                    createVNode("li", { class: "flex items-start gap-2" }, [
                                      createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                      createVNode("span", null, "Lihat total bonus yang diterima")
                                    ])
                                  ])
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$3), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$4), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$5), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Pengaturan Sistem")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$6), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Konfigurasi payment, shipping, dan lainnya")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                                  createVNode("div", { class: "p-3 rounded-lg border" }, [
                                    createVNode("h4", { class: "font-semibold mb-2 flex items-center gap-2" }, [
                                      createVNode(unref(CreditCard), { class: "w-4 h-4" }),
                                      createTextVNode(" Metode Pembayaran ")
                                    ]),
                                    createVNode("p", { class: "text-sm text-muted-foreground" }, " Konfigurasi payment gateway Midtrans (server key, client key, environment) ")
                                  ]),
                                  createVNode("div", { class: "p-3 rounded-lg border" }, [
                                    createVNode("h4", { class: "font-semibold mb-2 flex items-center gap-2" }, [
                                      createVNode(unref(Truck), { class: "w-4 h-4" }),
                                      createTextVNode(" Kurir Pengiriman ")
                                    ]),
                                    createVNode("p", { class: "text-sm text-muted-foreground" }, " Aktifkan/nonaktifkan kurir (JNE, TIKI, POS) dan set biaya admin ")
                                  ]),
                                  createVNode("div", { class: "p-3 rounded-lg border" }, [
                                    createVNode("h4", { class: "font-semibold mb-2 flex items-center gap-2" }, [
                                      createVNode(unref(Settings), { class: "w-4 h-4" }),
                                      createTextVNode(" Alamat Pengiriman ")
                                    ]),
                                    createVNode("p", { class: "text-sm text-muted-foreground" }, " Kelola alamat customer untuk pengiriman produk ")
                                  ]),
                                  createVNode("div", { class: "p-3 rounded-lg border" }, [
                                    createVNode("h4", { class: "font-semibold mb-2 flex items-center gap-2" }, [
                                      createVNode(unref(Package), { class: "w-4 h-4" }),
                                      createTextVNode(" Newsletter ")
                                    ]),
                                    createVNode("p", { class: "text-sm text-muted-foreground" }, " Kelola subscriber newsletter dan kirim email campaign ")
                                  ])
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$b), {
                      value: "api",
                      class: "space-y-4"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$3), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$4), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$5), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Format Response Standar")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$6), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Struktur response dari backend ke frontend")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                              default: withCtx(() => [
                                createVNode("div", null, [
                                  createVNode("h4", { class: "font-semibold mb-2 flex items-center gap-2" }, [
                                    createVNode(unref(CheckCircle), { class: "w-4 h-4 text-green-600" }),
                                    createTextVNode(" Success Response ")
                                  ]),
                                  createVNode("div", { class: "rounded-lg bg-muted p-4" }, [
                                    createVNode("pre", { class: "text-xs overflow-x-auto" }, [
                                      createVNode("code", null, '{\n  "success": true,\n  "message": "Data berhasil disimpan",\n  "data": {\n    // Data object sesuai resource\n  }\n}')
                                    ])
                                  ])
                                ]),
                                createVNode("div", null, [
                                  createVNode("h4", { class: "font-semibold mb-2 flex items-center gap-2" }, [
                                    createVNode(unref(AlertCircle), { class: "w-4 h-4 text-red-600" }),
                                    createTextVNode(" Error Response ")
                                  ]),
                                  createVNode("div", { class: "rounded-lg bg-muted p-4" }, [
                                    createVNode("pre", { class: "text-xs overflow-x-auto" }, [
                                      createVNode("code", null, '{\n  "success": false,\n  "message": "Validation Error",\n  "errors": {\n    "field_name": ["Error message 1", "Error message 2"]\n  }\n}')
                                    ])
                                  ])
                                ]),
                                createVNode(unref(_sfc_main$c)),
                                createVNode("div", null, [
                                  createVNode("h4", { class: "font-semibold mb-3" }, "Flash Messages"),
                                  createVNode("p", { class: "text-sm text-muted-foreground mb-2" }, " Flash messages ditampilkan menggunakan toast notification di pojok kanan atas: "),
                                  createVNode("ul", { class: "space-y-2 ml-6 text-sm" }, [
                                    createVNode("li", { class: "flex items-start gap-2" }, [
                                      createVNode(unref(CheckCircle), { class: "w-4 h-4 mt-0.5 text-green-600" }),
                                      createVNode("span", null, [
                                        createVNode("strong", null, "Success:"),
                                        createTextVNode(" Background hijau untuk aksi berhasil (create, update, delete) ")
                                      ])
                                    ]),
                                    createVNode("li", { class: "flex items-start gap-2" }, [
                                      createVNode(unref(AlertCircle), { class: "w-4 h-4 mt-0.5 text-red-600" }),
                                      createVNode("span", null, [
                                        createVNode("strong", null, "Error:"),
                                        createTextVNode(" Background merah untuk aksi gagal atau validation error ")
                                      ])
                                    ]),
                                    createVNode("li", { class: "flex items-start gap-2" }, [
                                      createVNode(unref(Info), { class: "w-4 h-4 mt-0.5 text-blue-600" }),
                                      createVNode("span", null, [
                                        createVNode("strong", null, "Info:"),
                                        createTextVNode(" Background biru untuk informasi umum ")
                                      ])
                                    ])
                                  ])
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$3), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$4), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$5), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Status Code HTTP")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$6), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Kode status yang digunakan aplikasi")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$7), null, {
                              default: withCtx(() => [
                                createVNode("div", { class: "space-y-2" }, [
                                  createVNode("div", { class: "flex items-center justify-between p-2 rounded border" }, [
                                    createVNode("div", { class: "flex items-center gap-2" }, [
                                      createVNode(unref(_sfc_main$2), { variant: "default" }, {
                                        default: withCtx(() => [
                                          createTextVNode("200")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode("span", { class: "text-sm font-medium" }, "OK")
                                    ]),
                                    createVNode("span", { class: "text-sm text-muted-foreground" }, "Request berhasil")
                                  ]),
                                  createVNode("div", { class: "flex items-center justify-between p-2 rounded border" }, [
                                    createVNode("div", { class: "flex items-center gap-2" }, [
                                      createVNode(unref(_sfc_main$2), { variant: "default" }, {
                                        default: withCtx(() => [
                                          createTextVNode("201")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode("span", { class: "text-sm font-medium" }, "Created")
                                    ]),
                                    createVNode("span", { class: "text-sm text-muted-foreground" }, "Data berhasil dibuat")
                                  ]),
                                  createVNode("div", { class: "flex items-center justify-between p-2 rounded border" }, [
                                    createVNode("div", { class: "flex items-center gap-2" }, [
                                      createVNode(unref(_sfc_main$2), { variant: "secondary" }, {
                                        default: withCtx(() => [
                                          createTextVNode("400")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode("span", { class: "text-sm font-medium" }, "Bad Request")
                                    ]),
                                    createVNode("span", { class: "text-sm text-muted-foreground" }, "Request tidak valid")
                                  ]),
                                  createVNode("div", { class: "flex items-center justify-between p-2 rounded border" }, [
                                    createVNode("div", { class: "flex items-center gap-2" }, [
                                      createVNode(unref(_sfc_main$2), { variant: "secondary" }, {
                                        default: withCtx(() => [
                                          createTextVNode("401")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode("span", { class: "text-sm font-medium" }, "Unauthorized")
                                    ]),
                                    createVNode("span", { class: "text-sm text-muted-foreground" }, "Belum login/autentikasi")
                                  ]),
                                  createVNode("div", { class: "flex items-center justify-between p-2 rounded border" }, [
                                    createVNode("div", { class: "flex items-center gap-2" }, [
                                      createVNode(unref(_sfc_main$2), { variant: "secondary" }, {
                                        default: withCtx(() => [
                                          createTextVNode("403")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode("span", { class: "text-sm font-medium" }, "Forbidden")
                                    ]),
                                    createVNode("span", { class: "text-sm text-muted-foreground" }, "Tidak memiliki akses")
                                  ]),
                                  createVNode("div", { class: "flex items-center justify-between p-2 rounded border" }, [
                                    createVNode("div", { class: "flex items-center gap-2" }, [
                                      createVNode(unref(_sfc_main$2), { variant: "secondary" }, {
                                        default: withCtx(() => [
                                          createTextVNode("404")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode("span", { class: "text-sm font-medium" }, "Not Found")
                                    ]),
                                    createVNode("span", { class: "text-sm text-muted-foreground" }, "Data tidak ditemukan")
                                  ]),
                                  createVNode("div", { class: "flex items-center justify-between p-2 rounded border" }, [
                                    createVNode("div", { class: "flex items-center gap-2" }, [
                                      createVNode(unref(_sfc_main$2), { variant: "destructive" }, {
                                        default: withCtx(() => [
                                          createTextVNode("422")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode("span", { class: "text-sm font-medium" }, "Unprocessable Entity")
                                    ]),
                                    createVNode("span", { class: "text-sm text-muted-foreground" }, "Validation error")
                                  ]),
                                  createVNode("div", { class: "flex items-center justify-between p-2 rounded border" }, [
                                    createVNode("div", { class: "flex items-center gap-2" }, [
                                      createVNode(unref(_sfc_main$2), { variant: "destructive" }, {
                                        default: withCtx(() => [
                                          createTextVNode("500")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode("span", { class: "text-sm font-medium" }, "Internal Server Error")
                                    ]),
                                    createVNode("span", { class: "text-sm text-muted-foreground" }, "Error server")
                                  ])
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$3), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$4), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$5), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Contoh Response API")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$6), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Response dari berbagai endpoint")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                              default: withCtx(() => [
                                createVNode("div", null, [
                                  createVNode("h4", { class: "font-semibold mb-2" }, "Product List"),
                                  createVNode("div", { class: "rounded-lg bg-muted p-4" }, [
                                    createVNode("pre", { class: "text-xs overflow-x-auto" }, [
                                      createVNode("code", null, '{\n  "data": [\n    {\n      "id": 1,\n      "name": "Samsung Galaxy S24",\n      "slug": "samsung-galaxy-s24",\n      "base_price": 12000000,\n      "selling_price": 11500000,\n      "stock_quantity": 50,\n      "weight": 500,\n      "is_active": true,\n      "category": {\n        "id": 1,\n        "name": "Smartphone"\n      },\n      "images": [\n        {\n          "id": 1,\n          "url": "/storage/products/image1.jpg",\n          "is_primary": true\n        }\n      ]\n    }\n  ],\n  "meta": {\n    "current_page": 1,\n    "per_page": 10,\n    "total": 100\n  }\n}')
                                    ])
                                  ])
                                ]),
                                createVNode("div", null, [
                                  createVNode("h4", { class: "font-semibold mb-2" }, "Order Detail"),
                                  createVNode("div", { class: "rounded-lg bg-muted p-4" }, [
                                    createVNode("pre", { class: "text-xs overflow-x-auto" }, [
                                      createVNode("code", null, '{\n  "id": 1,\n  "order_no": "ORD-20250121-001",\n  "status": "PAID",\n  "subtotal_amount": 11500000,\n  "shipping_cost": 50000,\n  "grand_total": 11550000,\n  "customer": {\n    "id": 1,\n    "name": "John Doe",\n    "email": "john@example.com"\n  },\n  "items": [\n    {\n      "product_id": 1,\n      "product_name": "Samsung Galaxy S24",\n      "quantity": 1,\n      "unit_price": 11500000\n    }\n  ],\n  "shipment": {\n    "courier_code": "jne",\n    "service_code": "REG",\n    "tracking_number": "JNE123456789",\n    "status": "IN_TRANSIT"\n  }\n}')
                                    ])
                                  ])
                                ]),
                                createVNode("div", null, [
                                  createVNode("h4", { class: "font-semibold mb-2" }, "Bonus Detail"),
                                  createVNode("div", { class: "rounded-lg bg-muted p-4" }, [
                                    createVNode("pre", { class: "text-xs overflow-x-auto" }, [
                                      createVNode("code", null, '{\n  "id": 1,\n  "member_id": 1,\n  "bonus_type": "PAIRING",\n  "amount": 500000,\n  "status": "RELEASED",\n  "description": "Bonus pairing dari pair BV kiri-kanan",\n  "released_at": "2025-01-21T10:30:00Z",\n  "created_at": "2025-01-21T10:00:00Z"\n}')
                                    ])
                                  ])
                                ])
                              ]),
                              _: 1
                            })
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
            _push2(ssrRenderComponent(unref(_sfc_main$3), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Butuh Bantuan?`);
                            } else {
                              return [
                                createTextVNode("Butuh Bantuan?")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Hubungi tim support untuk assistance`);
                            } else {
                              return [
                                createTextVNode("Hubungi tim support untuk assistance")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Butuh Bantuan?")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("Hubungi tim support untuk assistance")
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
                        _push4(`<div class="grid gap-4 md:grid-cols-3"${_scopeId3}><div class="p-4 rounded-lg border bg-card text-center"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Users), { class: "w-8 h-8 mx-auto mb-2 text-primary" }, null, _parent4, _scopeId3));
                        _push4(`<h4 class="font-semibold mb-1"${_scopeId3}>Support Team</h4><p class="text-sm text-muted-foreground"${_scopeId3}>support@puranusa.id</p></div><div class="p-4 rounded-lg border bg-card text-center"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(BookOpen), { class: "w-8 h-8 mx-auto mb-2 text-primary" }, null, _parent4, _scopeId3));
                        _push4(`<h4 class="font-semibold mb-1"${_scopeId3}>Developer</h4><p class="text-sm text-muted-foreground"${_scopeId3}>chocoalano.github.io</p></div><div class="p-4 rounded-lg border bg-card text-center"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Info), { class: "w-8 h-8 mx-auto mb-2 text-primary" }, null, _parent4, _scopeId3));
                        _push4(`<h4 class="font-semibold mb-1"${_scopeId3}>Version</h4><p class="text-sm text-muted-foreground"${_scopeId3}>1.0.0</p></div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "grid gap-4 md:grid-cols-3" }, [
                            createVNode("div", { class: "p-4 rounded-lg border bg-card text-center" }, [
                              createVNode(unref(Users), { class: "w-8 h-8 mx-auto mb-2 text-primary" }),
                              createVNode("h4", { class: "font-semibold mb-1" }, "Support Team"),
                              createVNode("p", { class: "text-sm text-muted-foreground" }, "support@puranusa.id")
                            ]),
                            createVNode("div", { class: "p-4 rounded-lg border bg-card text-center" }, [
                              createVNode(unref(BookOpen), { class: "w-8 h-8 mx-auto mb-2 text-primary" }),
                              createVNode("h4", { class: "font-semibold mb-1" }, "Developer"),
                              createVNode("p", { class: "text-sm text-muted-foreground" }, "chocoalano.github.io")
                            ]),
                            createVNode("div", { class: "p-4 rounded-lg border bg-card text-center" }, [
                              createVNode(unref(Info), { class: "w-8 h-8 mx-auto mb-2 text-primary" }),
                              createVNode("h4", { class: "font-semibold mb-1" }, "Version"),
                              createVNode("p", { class: "text-sm text-muted-foreground" }, "1.0.0")
                            ])
                          ])
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
                            createTextVNode("Butuh Bantuan?")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode("Hubungi tim support untuk assistance")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "grid gap-4 md:grid-cols-3" }, [
                          createVNode("div", { class: "p-4 rounded-lg border bg-card text-center" }, [
                            createVNode(unref(Users), { class: "w-8 h-8 mx-auto mb-2 text-primary" }),
                            createVNode("h4", { class: "font-semibold mb-1" }, "Support Team"),
                            createVNode("p", { class: "text-sm text-muted-foreground" }, "support@puranusa.id")
                          ]),
                          createVNode("div", { class: "p-4 rounded-lg border bg-card text-center" }, [
                            createVNode(unref(BookOpen), { class: "w-8 h-8 mx-auto mb-2 text-primary" }),
                            createVNode("h4", { class: "font-semibold mb-1" }, "Developer"),
                            createVNode("p", { class: "text-sm text-muted-foreground" }, "chocoalano.github.io")
                          ]),
                          createVNode("div", { class: "p-4 rounded-lg border bg-card text-center" }, [
                            createVNode(unref(Info), { class: "w-8 h-8 mx-auto mb-2 text-primary" }),
                            createVNode("h4", { class: "font-semibold mb-1" }, "Version"),
                            createVNode("p", { class: "text-sm text-muted-foreground" }, "1.0.0")
                          ])
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "rounded-xl p-4 space-y-6 py-6" }, [
                createVNode(unref(Head), { title: "Dokumentasi Aplikasi" }),
                createVNode("div", { class: "flex flex-col gap-6" }, [
                  createVNode("div", { class: "flex items-start justify-between" }, [
                    createVNode("div", { class: "space-y-1" }, [
                      createVNode("h1", { class: "text-3xl font-bold tracking-tight" }, "Dokumentasi Aplikasi"),
                      createVNode("p", { class: "text-muted-foreground" }, " Panduan lengkap penggunaan sistem E-Commerce MLM Puranusa ")
                    ]),
                    createVNode(unref(_sfc_main$2), {
                      variant: "secondary",
                      class: "text-sm"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Info), { class: "w-4 h-4 mr-1" }),
                        createTextVNode(" Version 1.0.0 ")
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$4), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode(unref(BookOpen), { class: "w-5 h-5 text-primary" }),
                            createVNode(unref(_sfc_main$5), null, {
                              default: withCtx(() => [
                                createTextVNode("Panduan Cepat")
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("Memulai menggunakan aplikasi dalam 3 langkah")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "grid gap-4 md:grid-cols-3" }, [
                            createVNode("div", { class: "flex gap-4 p-4 rounded-lg border bg-card" }, [
                              createVNode("div", { class: "flex h-10 w-10 items-center justify-center rounded-full bg-primary/10" }, [
                                createVNode("span", { class: "text-lg font-bold text-primary" }, "1")
                              ]),
                              createVNode("div", { class: "flex-1 space-y-1" }, [
                                createVNode("h4", { class: "font-semibold" }, "Login ke Sistem"),
                                createVNode("p", { class: "text-sm text-muted-foreground" }, " Gunakan kredensial admin untuk mengakses dashboard ")
                              ])
                            ]),
                            createVNode("div", { class: "flex gap-4 p-4 rounded-lg border bg-card" }, [
                              createVNode("div", { class: "flex h-10 w-10 items-center justify-center rounded-full bg-primary/10" }, [
                                createVNode("span", { class: "text-lg font-bold text-primary" }, "2")
                              ]),
                              createVNode("div", { class: "flex-1 space-y-1" }, [
                                createVNode("h4", { class: "font-semibold" }, "Kelola Konten"),
                                createVNode("p", { class: "text-sm text-muted-foreground" }, " Tambahkan produk, kelola pesanan, dan atur member ")
                              ])
                            ]),
                            createVNode("div", { class: "flex gap-4 p-4 rounded-lg border bg-card" }, [
                              createVNode("div", { class: "flex h-10 w-10 items-center justify-center rounded-full bg-primary/10" }, [
                                createVNode("span", { class: "text-lg font-bold text-primary" }, "3")
                              ]),
                              createVNode("div", { class: "flex-1 space-y-1" }, [
                                createVNode("h4", { class: "font-semibold" }, "Monitor & Analisa"),
                                createVNode("p", { class: "text-sm text-muted-foreground" }, " Pantau penjualan, bonus, dan performa jaringan ")
                              ])
                            ])
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$8), {
                    "default-value": "overview",
                    class: "w-full"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$9), { class: "grid w-full grid-cols-5" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$a), { value: "overview" }, {
                            default: withCtx(() => [
                              createTextVNode("Overview")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$a), { value: "ecommerce" }, {
                            default: withCtx(() => [
                              createTextVNode("E-Commerce")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$a), { value: "mlm" }, {
                            default: withCtx(() => [
                              createTextVNode("MLM System")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$a), { value: "management" }, {
                            default: withCtx(() => [
                              createTextVNode("Manajemen")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$a), { value: "api" }, {
                            default: withCtx(() => [
                              createTextVNode("API Response")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$b), {
                        value: "overview",
                        class: "space-y-4"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$3), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$4), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$5), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Tentang Aplikasi")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$6), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Sistem E-Commerce dengan fitur Multi-Level Marketing")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$7), { class: "space-y-6" }, {
                                default: withCtx(() => [
                                  createVNode("div", null, [
                                    createVNode("h3", { class: "text-lg font-semibold mb-3" }, "Fitur Utama"),
                                    createVNode("div", { class: "grid gap-3 md:grid-cols-2" }, [
                                      createVNode("div", { class: "flex items-start gap-3 p-3 rounded-lg border" }, [
                                        createVNode(unref(ShoppingCart), { class: "w-5 h-5 text-primary mt-0.5" }),
                                        createVNode("div", null, [
                                          createVNode("h4", { class: "font-medium" }, "E-Commerce Lengkap"),
                                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Manajemen produk, kategori, keranjang, wishlist, review, dan promosi ")
                                        ])
                                      ]),
                                      createVNode("div", { class: "flex items-start gap-3 p-3 rounded-lg border" }, [
                                        createVNode(unref(TrendingUp), { class: "w-5 h-5 text-primary mt-0.5" }),
                                        createVNode("div", null, [
                                          createVNode("h4", { class: "font-medium" }, "Sistem MLM Binary & Matrix"),
                                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Jaringan binary tree dan matrix dengan bonus otomatis ")
                                        ])
                                      ]),
                                      createVNode("div", { class: "flex items-start gap-3 p-3 rounded-lg border" }, [
                                        createVNode(unref(Wallet), { class: "w-5 h-5 text-primary mt-0.5" }),
                                        createVNode("div", null, [
                                          createVNode("h4", { class: "font-medium" }, "E-Wallet Terintegrasi"),
                                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Sistem wallet dengan top-up dan withdrawal otomatis ")
                                        ])
                                      ]),
                                      createVNode("div", { class: "flex items-start gap-3 p-3 rounded-lg border" }, [
                                        createVNode(unref(Package), { class: "w-5 h-5 text-primary mt-0.5" }),
                                        createVNode("div", null, [
                                          createVNode("h4", { class: "font-medium" }, "Manajemen Order"),
                                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Tracking pesanan, pengiriman, retur & refund lengkap ")
                                        ])
                                      ])
                                    ])
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$3), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$4), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$5), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Struktur Menu")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$6), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Navigasi dan akses fitur sistem")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$7), null, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "space-y-3" }, [
                                    createVNode("div", { class: "flex items-center gap-3 p-3 rounded-lg border" }, [
                                      createVNode(unref(Users), { class: "w-5 h-5 text-primary" }),
                                      createVNode("div", { class: "flex-1" }, [
                                        createVNode("h4", { class: "font-medium" }, "Kelola"),
                                        createVNode("p", { class: "text-sm text-muted-foreground" }, "User admin dan data pelanggan")
                                      ])
                                    ]),
                                    createVNode("div", { class: "flex items-center gap-3 p-3 rounded-lg border" }, [
                                      createVNode(unref(ShoppingCart), { class: "w-5 h-5 text-primary" }),
                                      createVNode("div", { class: "flex-1" }, [
                                        createVNode("h4", { class: "font-medium" }, "E-Commerce"),
                                        createVNode("p", { class: "text-sm text-muted-foreground" }, " Produk, kategori, keranjang, wishlist, review, dan promosi ")
                                      ])
                                    ]),
                                    createVNode("div", { class: "flex items-center gap-3 p-3 rounded-lg border" }, [
                                      createVNode(unref(Package), { class: "w-5 h-5 text-primary" }),
                                      createVNode("div", { class: "flex-1" }, [
                                        createVNode("h4", { class: "font-medium" }, "Pembelian"),
                                        createVNode("p", { class: "text-sm text-muted-foreground" }, " Pesanan, pembayaran, pengiriman, dan retur ")
                                      ])
                                    ]),
                                    createVNode("div", { class: "flex items-center gap-3 p-3 rounded-lg border" }, [
                                      createVNode(unref(TrendingUp), { class: "w-5 h-5 text-primary" }),
                                      createVNode("div", { class: "flex-1" }, [
                                        createVNode("h4", { class: "font-medium" }, "Bonus & Komisi MLM"),
                                        createVNode("p", { class: "text-sm text-muted-foreground" }, " Bonus umum, matching, pairing, dan sponsor ")
                                      ])
                                    ]),
                                    createVNode("div", { class: "flex items-center gap-3 p-3 rounded-lg border" }, [
                                      createVNode(unref(Wallet), { class: "w-5 h-5 text-primary" }),
                                      createVNode("div", { class: "flex-1" }, [
                                        createVNode("h4", { class: "font-medium" }, "E-Wallet"),
                                        createVNode("p", { class: "text-sm text-muted-foreground" }, " Saldo, transaksi, top-up, dan withdrawal ")
                                      ])
                                    ]),
                                    createVNode("div", { class: "flex items-center gap-3 p-3 rounded-lg border" }, [
                                      createVNode(unref(Grid3x3), { class: "w-5 h-5 text-primary" }),
                                      createVNode("div", { class: "flex-1" }, [
                                        createVNode("h4", { class: "font-medium" }, "Jaringan MLM"),
                                        createVNode("p", { class: "text-sm text-muted-foreground" }, " Binary tree dan matrix network visualization ")
                                      ])
                                    ]),
                                    createVNode("div", { class: "flex items-center gap-3 p-3 rounded-lg border" }, [
                                      createVNode(unref(Settings), { class: "w-5 h-5 text-primary" }),
                                      createVNode("div", { class: "flex-1" }, [
                                        createVNode("h4", { class: "font-medium" }, "Pengaturan"),
                                        createVNode("p", { class: "text-sm text-muted-foreground" }, " Alamat, payment, kurir, dan newsletter ")
                                      ])
                                    ])
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$b), {
                        value: "ecommerce",
                        class: "space-y-4"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$3), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$4), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$5), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Manajemen Produk")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$6), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Kelola produk, kategori, dan promosi")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "space-y-3" }, [
                                    createVNode("div", null, [
                                      createVNode("h4", { class: "font-semibold mb-2 flex items-center gap-2" }, [
                                        createVNode(unref(Package), { class: "w-4 h-4" }),
                                        createTextVNode(" Produk ")
                                      ]),
                                      createVNode("ul", { class: "space-y-2 ml-6" }, [
                                        createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                          createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                          createVNode("span", null, [
                                            createVNode("strong", null, "Tambah Produk:"),
                                            createTextVNode(' Klik tombol "Tambah Produk", isi nama, deskripsi, harga, stok, berat, dan kategori ')
                                          ])
                                        ]),
                                        createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                          createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                          createVNode("span", null, [
                                            createVNode("strong", null, "Upload Gambar:"),
                                            createTextVNode(" Maksimal 5 gambar per produk, gambar pertama akan menjadi gambar utama ")
                                          ])
                                        ]),
                                        createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                          createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                          createVNode("span", null, [
                                            createVNode("strong", null, "Edit/Hapus:"),
                                            createTextVNode(" Klik icon pensil untuk edit atau icon trash untuk hapus produk ")
                                          ])
                                        ]),
                                        createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                          createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                          createVNode("span", null, [
                                            createVNode("strong", null, "Status:"),
                                            createTextVNode(" Toggle aktif/non-aktif untuk menampilkan/ menyembunyikan produk di store ")
                                          ])
                                        ])
                                      ])
                                    ]),
                                    createVNode(unref(_sfc_main$c)),
                                    createVNode("div", null, [
                                      createVNode("h4", { class: "font-semibold mb-2 flex items-center gap-2" }, [
                                        createVNode(unref(Star), { class: "w-4 h-4" }),
                                        createTextVNode(" Review Produk ")
                                      ]),
                                      createVNode("ul", { class: "space-y-2 ml-6" }, [
                                        createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                          createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                          createVNode("span", null, "Customer dapat memberikan rating 1-5 bintang dan komentar")
                                        ]),
                                        createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                          createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                          createVNode("span", null, "Admin dapat approve/reject review sebelum ditampilkan")
                                        ]),
                                        createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                          createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                          createVNode("span", null, "Review hanya bisa diberikan setelah pesanan selesai (COMPLETED)")
                                        ])
                                      ])
                                    ]),
                                    createVNode(unref(_sfc_main$c)),
                                    createVNode("div", null, [
                                      createVNode("h4", { class: "font-semibold mb-2 flex items-center gap-2" }, [
                                        createVNode(unref(BadgePercent), { class: "w-4 h-4" }),
                                        createTextVNode(" Promosi & Diskon ")
                                      ]),
                                      createVNode("ul", { class: "space-y-2 ml-6" }, [
                                        createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                          createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                          createVNode("span", null, [
                                            createVNode("strong", null, "Tipe Diskon:"),
                                            createTextVNode(" Persentase (%) atau Nominal (Rp) ")
                                          ])
                                        ]),
                                        createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                          createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                          createVNode("span", null, [
                                            createVNode("strong", null, "Periode:"),
                                            createTextVNode(" Set tanggal mulai dan berakhir promosi ")
                                          ])
                                        ]),
                                        createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                          createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                          createVNode("span", null, [
                                            createVNode("strong", null, "Minimum Order:"),
                                            createTextVNode(" Opsional, set minimal pembelian untuk diskon ")
                                          ])
                                        ])
                                      ])
                                    ])
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$3), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$4), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$5), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Manajemen Pesanan")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$6), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Proses order dari pembayaran hingga pengiriman")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                                default: withCtx(() => [
                                  createVNode("div", null, [
                                    createVNode("h4", { class: "font-semibold mb-3" }, "Alur Pesanan"),
                                    createVNode("div", { class: "space-y-3" }, [
                                      createVNode("div", { class: "flex items-start gap-3 p-3 rounded-lg border bg-muted/50" }, [
                                        createVNode("div", { class: "flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500/10" }, [
                                          createVNode("span", { class: "text-sm font-bold text-yellow-600" }, "1")
                                        ]),
                                        createVNode("div", { class: "flex-1" }, [
                                          createVNode(unref(_sfc_main$2), {
                                            variant: "secondary",
                                            class: "mb-1"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("PENDING")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Customer checkout dan menunggu pembayaran via Midtrans ")
                                        ])
                                      ]),
                                      createVNode("div", { class: "flex items-start gap-3 p-3 rounded-lg border bg-muted/50" }, [
                                        createVNode("div", { class: "flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10" }, [
                                          createVNode("span", { class: "text-sm font-bold text-blue-600" }, "2")
                                        ]),
                                        createVNode("div", { class: "flex-1" }, [
                                          createVNode(unref(_sfc_main$2), {
                                            variant: "default",
                                            class: "mb-1"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("PAID")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Pembayaran berhasil, admin setup pengiriman (pilih kurir, input resi) ")
                                        ])
                                      ]),
                                      createVNode("div", { class: "flex items-start gap-3 p-3 rounded-lg border bg-muted/50" }, [
                                        createVNode("div", { class: "flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/10" }, [
                                          createVNode("span", { class: "text-sm font-bold text-purple-600" }, "3")
                                        ]),
                                        createVNode("div", { class: "flex-1" }, [
                                          createVNode(unref(_sfc_main$2), {
                                            variant: "secondary",
                                            class: "mb-1"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("SHIPPED")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Paket dalam pengiriman, customer bisa tracking dengan nomor resi ")
                                        ])
                                      ]),
                                      createVNode("div", { class: "flex items-start gap-3 p-3 rounded-lg border bg-muted/50" }, [
                                        createVNode("div", { class: "flex h-8 w-8 items-center justify-center rounded-full bg-green-500/10" }, [
                                          createVNode("span", { class: "text-sm font-bold text-green-600" }, "4")
                                        ]),
                                        createVNode("div", { class: "flex-1" }, [
                                          createVNode(unref(_sfc_main$2), {
                                            variant: "default",
                                            class: "mb-1"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("COMPLETED")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode("p", { class: "text-sm text-muted-foreground" }, " Paket diterima customer, bonus MLM otomatis dihitung ")
                                        ])
                                      ])
                                    ])
                                  ]),
                                  createVNode(unref(_sfc_main$c)),
                                  createVNode("div", null, [
                                    createVNode("h4", { class: "font-semibold mb-2" }, "Aksi Admin"),
                                    createVNode("ul", { class: "space-y-2 ml-6" }, [
                                      createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                        createVNode(unref(CheckCircle), { class: "w-4 h-4 mt-0.5 text-green-600" }),
                                        createVNode("span", null, [
                                          createVNode("strong", null, "Setup Pengiriman:"),
                                          createTextVNode(" Pilih kurir (JNE, TIKI, POS), input nomor resi, dan konfirmasi ")
                                        ])
                                      ]),
                                      createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                        createVNode(unref(CheckCircle), { class: "w-4 h-4 mt-0.5 text-green-600" }),
                                        createVNode("span", null, [
                                          createVNode("strong", null, "Tandai Dikirim:"),
                                          createTextVNode(" Update status menjadi SHIPPED setelah paket diserahkan ke kurir ")
                                        ])
                                      ]),
                                      createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                        createVNode(unref(CheckCircle), { class: "w-4 h-4 mt-0.5 text-green-600" }),
                                        createVNode("span", null, [
                                          createVNode("strong", null, "Tandai Selesai:"),
                                          createTextVNode(" Update status menjadi COMPLETED setelah customer terima paket ")
                                        ])
                                      ]),
                                      createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                        createVNode(unref(AlertCircle), { class: "w-4 h-4 mt-0.5 text-red-600" }),
                                        createVNode("span", null, [
                                          createVNode("strong", null, "Batalkan Pesanan:"),
                                          createTextVNode(" Hanya bisa dibatalkan jika status PENDING atau PAID ")
                                        ])
                                      ])
                                    ])
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$b), {
                        value: "mlm",
                        class: "space-y-4"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$3), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$4), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$5), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Sistem Jaringan MLM")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$6), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Binary Tree dan Matrix Network")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$7), { class: "space-y-6" }, {
                                default: withCtx(() => [
                                  createVNode("div", null, [
                                    createVNode("h4", { class: "font-semibold mb-3 flex items-center gap-2" }, [
                                      createVNode(unref(Grid3x3), { class: "w-4 h-4" }),
                                      createTextVNode(" Jaringan Binary ")
                                    ]),
                                    createVNode("div", { class: "space-y-3" }, [
                                      createVNode("p", { class: "text-sm text-muted-foreground" }, " Setiap member memiliki maksimal 2 downline (kiri dan kanan). Placement otomatis menggunakan algoritma breadth-first search. "),
                                      createVNode("ul", { class: "space-y-2 ml-6" }, [
                                        createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                          createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                          createVNode("span", null, [
                                            createVNode("strong", null, "Auto Placement:"),
                                            createTextVNode(" Member baru otomatis ditempatkan di posisi tersedia pertama ")
                                          ])
                                        ]),
                                        createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                          createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                          createVNode("span", null, [
                                            createVNode("strong", null, "Visualisasi Tree:"),
                                            createTextVNode(" Lihat struktur jaringan binary dalam bentuk tree diagram ")
                                          ])
                                        ]),
                                        createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                          createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                          createVNode("span", null, [
                                            createVNode("strong", null, "Bonus Pairing:"),
                                            createTextVNode(" Dihitung berdasarkan pasangan (pair) dari BV kiri dan kanan ")
                                          ])
                                        ])
                                      ])
                                    ])
                                  ]),
                                  createVNode(unref(_sfc_main$c)),
                                  createVNode("div", null, [
                                    createVNode("h4", { class: "font-semibold mb-3 flex items-center gap-2" }, [
                                      createVNode(unref(TrendingUp), { class: "w-4 h-4" }),
                                      createTextVNode(" Jaringan Matrix ")
                                    ]),
                                    createVNode("div", { class: "space-y-3" }, [
                                      createVNode("p", { class: "text-sm text-muted-foreground" }, " Mencatat hubungan sponsor-member untuk perhitungan bonus sponsor dan matching. "),
                                      createVNode("ul", { class: "space-y-2 ml-6" }, [
                                        createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                          createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                          createVNode("span", null, [
                                            createVNode("strong", null, "Sponsor Direct:"),
                                            createTextVNode(" Member yang langsung direkrut oleh sponsor ")
                                          ])
                                        ]),
                                        createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                          createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                          createVNode("span", null, [
                                            createVNode("strong", null, "Level Tracking:"),
                                            createTextVNode(" Mencatat level kedalaman setiap member dari sponsor ")
                                          ])
                                        ]),
                                        createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                          createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                          createVNode("span", null, [
                                            createVNode("strong", null, "Bonus Sponsor:"),
                                            createTextVNode(" Diberikan ke sponsor langsung saat member belanja ")
                                          ])
                                        ])
                                      ])
                                    ])
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$3), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$4), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$5), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Sistem Bonus & Komisi")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$6), null, {
                                    default: withCtx(() => [
                                      createTextVNode("4 jenis bonus otomatis")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                                    createVNode("div", { class: "p-4 rounded-lg border bg-card space-y-2" }, [
                                      createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                        createVNode(unref(Wallet), { class: "w-5 h-5 text-primary" }),
                                        createVNode("h4", { class: "font-semibold" }, "Bonus Umum")
                                      ]),
                                      createVNode("p", { class: "text-sm text-muted-foreground" }, " Bonus untuk member saat melakukan pembelian pertama atau pencapaian tertentu. "),
                                      createVNode("ul", { class: "text-xs space-y-1 ml-4 text-muted-foreground" }, [
                                        createVNode("li", null, "• Diberikan sekali saat kondisi terpenuhi"),
                                        createVNode("li", null, "• Status: PENDING → RELEASED"),
                                        createVNode("li", null, "• Otomatis masuk ke wallet saat RELEASED")
                                      ])
                                    ]),
                                    createVNode("div", { class: "p-4 rounded-lg border bg-card space-y-2" }, [
                                      createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                        createVNode(unref(CreditCard), { class: "w-5 h-5 text-primary" }),
                                        createVNode("h4", { class: "font-semibold" }, "Bonus Sponsor")
                                      ]),
                                      createVNode("p", { class: "text-sm text-muted-foreground" }, " Komisi untuk sponsor langsung saat downline melakukan pembelian. "),
                                      createVNode("ul", { class: "text-xs space-y-1 ml-4 text-muted-foreground" }, [
                                        createVNode("li", null, "• Persentase dari total pembelian downline"),
                                        createVNode("li", null, "• Dihitung otomatis saat order COMPLETED"),
                                        createVNode("li", null, "• Langsung masuk wallet sponsor")
                                      ])
                                    ]),
                                    createVNode("div", { class: "p-4 rounded-lg border bg-card space-y-2" }, [
                                      createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                        createVNode(unref(Grid3x3), { class: "w-5 h-5 text-primary" }),
                                        createVNode("h4", { class: "font-semibold" }, "Bonus Pairing")
                                      ]),
                                      createVNode("p", { class: "text-sm text-muted-foreground" }, " Bonus dari pasangan (pair) BV antara kaki kiri dan kanan di binary tree. "),
                                      createVNode("ul", { class: "text-xs space-y-1 ml-4 text-muted-foreground" }, [
                                        createVNode("li", null, "• Berdasarkan BV terkecil dari 2 kaki"),
                                        createVNode("li", null, "• Sisa BV carry over ke periode berikutnya"),
                                        createVNode("li", null, "• Dihitung otomatis setiap ada transaksi")
                                      ])
                                    ]),
                                    createVNode("div", { class: "p-4 rounded-lg border bg-card space-y-2" }, [
                                      createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                        createVNode(unref(TrendingUp), { class: "w-5 h-5 text-primary" }),
                                        createVNode("h4", { class: "font-semibold" }, "Bonus Matching")
                                      ]),
                                      createVNode("p", { class: "text-sm text-muted-foreground" }, " Bonus matching dari bonus pairing downline hingga level tertentu. "),
                                      createVNode("ul", { class: "text-xs space-y-1 ml-4 text-muted-foreground" }, [
                                        createVNode("li", null, "• Persentase dari bonus pairing downline"),
                                        createVNode("li", null, "• Maksimal sampai level N (konfigurasi)"),
                                        createVNode("li", null, "• Dihitung setelah bonus pairing")
                                      ])
                                    ])
                                  ]),
                                  createVNode("div", { class: "p-4 rounded-lg border bg-yellow-50 dark:bg-yellow-950/20" }, [
                                    createVNode("div", { class: "flex gap-2" }, [
                                      createVNode(unref(Info), { class: "w-5 h-5 text-yellow-600 flex-shrink-0" }),
                                      createVNode("div", null, [
                                        createVNode("h4", { class: "font-semibold text-sm text-yellow-900 dark:text-yellow-100 mb-1" }, " Catatan Penting "),
                                        createVNode("p", { class: "text-sm text-yellow-800 dark:text-yellow-200" }, " Semua bonus dihitung otomatis oleh sistem saat order mencapai status COMPLETED. Admin hanya perlu melakukan release bonus dari PENDING menjadi RELEASED jika ada approval manual. ")
                                      ])
                                    ])
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$b), {
                        value: "management",
                        class: "space-y-4"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$3), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$4), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$5), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Manajemen E-Wallet")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$6), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Top-up dan withdrawal customer")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                                default: withCtx(() => [
                                  createVNode("div", null, [
                                    createVNode("h4", { class: "font-semibold mb-3" }, "Top-Up (Deposit)"),
                                    createVNode("ul", { class: "space-y-2 ml-6" }, [
                                      createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                        createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                        createVNode("span", null, "Customer request top-up via Midtrans (transfer bank, e-wallet, dll)")
                                      ]),
                                      createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                        createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                        createVNode("span", null, " Setelah pembayaran berhasil, saldo otomatis masuk ke wallet customer ")
                                      ]),
                                      createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                        createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                        createVNode("span", null, 'Admin bisa melihat riwayat top-up di menu "Permintaan Top Up"')
                                      ])
                                    ])
                                  ]),
                                  createVNode(unref(_sfc_main$c)),
                                  createVNode("div", null, [
                                    createVNode("h4", { class: "font-semibold mb-3" }, "Withdrawal (Penarikan)"),
                                    createVNode("ul", { class: "space-y-2 ml-6" }, [
                                      createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                        createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                        createVNode("span", null, "Customer request withdrawal dengan minimum nominal tertentu")
                                      ]),
                                      createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                        createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                        createVNode("span", null, 'Admin approve/reject withdrawal di menu "Permintaan Withdrawal"')
                                      ]),
                                      createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                        createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                        createVNode("span", null, " Jika approved, saldo customer berkurang dan admin transfer manual ke rekening customer ")
                                      ]),
                                      createVNode("li", { class: "text-sm flex items-start gap-2" }, [
                                        createVNode(unref(AlertCircle), { class: "w-4 h-4 mt-0.5 text-red-600" }),
                                        createVNode("span", null, [
                                          createVNode("strong", null, "Catatan:"),
                                          createTextVNode(" Pastikan saldo customer cukup sebelum approve ")
                                        ])
                                      ])
                                    ])
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$3), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$4), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$5), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Manajemen User & Customer")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$6), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Kelola akses dan data pengguna")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                                default: withCtx(() => [
                                  createVNode("div", null, [
                                    createVNode("h4", { class: "font-semibold mb-2" }, "User Admin"),
                                    createVNode("p", { class: "text-sm text-muted-foreground mb-2" }, " User dengan akses ke admin panel untuk mengelola sistem "),
                                    createVNode("ul", { class: "space-y-1 ml-6 text-sm" }, [
                                      createVNode("li", { class: "flex items-start gap-2" }, [
                                        createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                        createVNode("span", null, "Tambah/edit/hapus user admin")
                                      ]),
                                      createVNode("li", { class: "flex items-start gap-2" }, [
                                        createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                        createVNode("span", null, "Set password dan email untuk login")
                                      ]),
                                      createVNode("li", { class: "flex items-start gap-2" }, [
                                        createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                        createVNode("span", null, "Upload avatar/foto profil")
                                      ])
                                    ])
                                  ]),
                                  createVNode(unref(_sfc_main$c)),
                                  createVNode("div", null, [
                                    createVNode("h4", { class: "font-semibold mb-2" }, "Customer/Member"),
                                    createVNode("p", { class: "text-sm text-muted-foreground mb-2" }, " Data pelanggan yang berbelanja dan bergabung dalam jaringan MLM "),
                                    createVNode("ul", { class: "space-y-1 ml-6 text-sm" }, [
                                      createVNode("li", { class: "flex items-start gap-2" }, [
                                        createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                        createVNode("span", null, "Lihat data lengkap customer (nama, email, phone, alamat)")
                                      ]),
                                      createVNode("li", { class: "flex items-start gap-2" }, [
                                        createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                        createVNode("span", null, "Lihat riwayat pesanan dan transaksi wallet")
                                      ]),
                                      createVNode("li", { class: "flex items-start gap-2" }, [
                                        createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                        createVNode("span", null, "Lihat posisi dalam jaringan (upline, downline, level)")
                                      ]),
                                      createVNode("li", { class: "flex items-start gap-2" }, [
                                        createVNode(unref(ArrowRight), { class: "w-4 h-4 mt-0.5 text-primary" }),
                                        createVNode("span", null, "Lihat total bonus yang diterima")
                                      ])
                                    ])
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$3), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$4), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$5), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Pengaturan Sistem")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$6), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Konfigurasi payment, shipping, dan lainnya")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                                    createVNode("div", { class: "p-3 rounded-lg border" }, [
                                      createVNode("h4", { class: "font-semibold mb-2 flex items-center gap-2" }, [
                                        createVNode(unref(CreditCard), { class: "w-4 h-4" }),
                                        createTextVNode(" Metode Pembayaran ")
                                      ]),
                                      createVNode("p", { class: "text-sm text-muted-foreground" }, " Konfigurasi payment gateway Midtrans (server key, client key, environment) ")
                                    ]),
                                    createVNode("div", { class: "p-3 rounded-lg border" }, [
                                      createVNode("h4", { class: "font-semibold mb-2 flex items-center gap-2" }, [
                                        createVNode(unref(Truck), { class: "w-4 h-4" }),
                                        createTextVNode(" Kurir Pengiriman ")
                                      ]),
                                      createVNode("p", { class: "text-sm text-muted-foreground" }, " Aktifkan/nonaktifkan kurir (JNE, TIKI, POS) dan set biaya admin ")
                                    ]),
                                    createVNode("div", { class: "p-3 rounded-lg border" }, [
                                      createVNode("h4", { class: "font-semibold mb-2 flex items-center gap-2" }, [
                                        createVNode(unref(Settings), { class: "w-4 h-4" }),
                                        createTextVNode(" Alamat Pengiriman ")
                                      ]),
                                      createVNode("p", { class: "text-sm text-muted-foreground" }, " Kelola alamat customer untuk pengiriman produk ")
                                    ]),
                                    createVNode("div", { class: "p-3 rounded-lg border" }, [
                                      createVNode("h4", { class: "font-semibold mb-2 flex items-center gap-2" }, [
                                        createVNode(unref(Package), { class: "w-4 h-4" }),
                                        createTextVNode(" Newsletter ")
                                      ]),
                                      createVNode("p", { class: "text-sm text-muted-foreground" }, " Kelola subscriber newsletter dan kirim email campaign ")
                                    ])
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$b), {
                        value: "api",
                        class: "space-y-4"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$3), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$4), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$5), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Format Response Standar")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$6), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Struktur response dari backend ke frontend")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                                default: withCtx(() => [
                                  createVNode("div", null, [
                                    createVNode("h4", { class: "font-semibold mb-2 flex items-center gap-2" }, [
                                      createVNode(unref(CheckCircle), { class: "w-4 h-4 text-green-600" }),
                                      createTextVNode(" Success Response ")
                                    ]),
                                    createVNode("div", { class: "rounded-lg bg-muted p-4" }, [
                                      createVNode("pre", { class: "text-xs overflow-x-auto" }, [
                                        createVNode("code", null, '{\n  "success": true,\n  "message": "Data berhasil disimpan",\n  "data": {\n    // Data object sesuai resource\n  }\n}')
                                      ])
                                    ])
                                  ]),
                                  createVNode("div", null, [
                                    createVNode("h4", { class: "font-semibold mb-2 flex items-center gap-2" }, [
                                      createVNode(unref(AlertCircle), { class: "w-4 h-4 text-red-600" }),
                                      createTextVNode(" Error Response ")
                                    ]),
                                    createVNode("div", { class: "rounded-lg bg-muted p-4" }, [
                                      createVNode("pre", { class: "text-xs overflow-x-auto" }, [
                                        createVNode("code", null, '{\n  "success": false,\n  "message": "Validation Error",\n  "errors": {\n    "field_name": ["Error message 1", "Error message 2"]\n  }\n}')
                                      ])
                                    ])
                                  ]),
                                  createVNode(unref(_sfc_main$c)),
                                  createVNode("div", null, [
                                    createVNode("h4", { class: "font-semibold mb-3" }, "Flash Messages"),
                                    createVNode("p", { class: "text-sm text-muted-foreground mb-2" }, " Flash messages ditampilkan menggunakan toast notification di pojok kanan atas: "),
                                    createVNode("ul", { class: "space-y-2 ml-6 text-sm" }, [
                                      createVNode("li", { class: "flex items-start gap-2" }, [
                                        createVNode(unref(CheckCircle), { class: "w-4 h-4 mt-0.5 text-green-600" }),
                                        createVNode("span", null, [
                                          createVNode("strong", null, "Success:"),
                                          createTextVNode(" Background hijau untuk aksi berhasil (create, update, delete) ")
                                        ])
                                      ]),
                                      createVNode("li", { class: "flex items-start gap-2" }, [
                                        createVNode(unref(AlertCircle), { class: "w-4 h-4 mt-0.5 text-red-600" }),
                                        createVNode("span", null, [
                                          createVNode("strong", null, "Error:"),
                                          createTextVNode(" Background merah untuk aksi gagal atau validation error ")
                                        ])
                                      ]),
                                      createVNode("li", { class: "flex items-start gap-2" }, [
                                        createVNode(unref(Info), { class: "w-4 h-4 mt-0.5 text-blue-600" }),
                                        createVNode("span", null, [
                                          createVNode("strong", null, "Info:"),
                                          createTextVNode(" Background biru untuk informasi umum ")
                                        ])
                                      ])
                                    ])
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$3), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$4), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$5), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Status Code HTTP")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$6), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Kode status yang digunakan aplikasi")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$7), null, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "space-y-2" }, [
                                    createVNode("div", { class: "flex items-center justify-between p-2 rounded border" }, [
                                      createVNode("div", { class: "flex items-center gap-2" }, [
                                        createVNode(unref(_sfc_main$2), { variant: "default" }, {
                                          default: withCtx(() => [
                                            createTextVNode("200")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("span", { class: "text-sm font-medium" }, "OK")
                                      ]),
                                      createVNode("span", { class: "text-sm text-muted-foreground" }, "Request berhasil")
                                    ]),
                                    createVNode("div", { class: "flex items-center justify-between p-2 rounded border" }, [
                                      createVNode("div", { class: "flex items-center gap-2" }, [
                                        createVNode(unref(_sfc_main$2), { variant: "default" }, {
                                          default: withCtx(() => [
                                            createTextVNode("201")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("span", { class: "text-sm font-medium" }, "Created")
                                      ]),
                                      createVNode("span", { class: "text-sm text-muted-foreground" }, "Data berhasil dibuat")
                                    ]),
                                    createVNode("div", { class: "flex items-center justify-between p-2 rounded border" }, [
                                      createVNode("div", { class: "flex items-center gap-2" }, [
                                        createVNode(unref(_sfc_main$2), { variant: "secondary" }, {
                                          default: withCtx(() => [
                                            createTextVNode("400")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("span", { class: "text-sm font-medium" }, "Bad Request")
                                      ]),
                                      createVNode("span", { class: "text-sm text-muted-foreground" }, "Request tidak valid")
                                    ]),
                                    createVNode("div", { class: "flex items-center justify-between p-2 rounded border" }, [
                                      createVNode("div", { class: "flex items-center gap-2" }, [
                                        createVNode(unref(_sfc_main$2), { variant: "secondary" }, {
                                          default: withCtx(() => [
                                            createTextVNode("401")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("span", { class: "text-sm font-medium" }, "Unauthorized")
                                      ]),
                                      createVNode("span", { class: "text-sm text-muted-foreground" }, "Belum login/autentikasi")
                                    ]),
                                    createVNode("div", { class: "flex items-center justify-between p-2 rounded border" }, [
                                      createVNode("div", { class: "flex items-center gap-2" }, [
                                        createVNode(unref(_sfc_main$2), { variant: "secondary" }, {
                                          default: withCtx(() => [
                                            createTextVNode("403")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("span", { class: "text-sm font-medium" }, "Forbidden")
                                      ]),
                                      createVNode("span", { class: "text-sm text-muted-foreground" }, "Tidak memiliki akses")
                                    ]),
                                    createVNode("div", { class: "flex items-center justify-between p-2 rounded border" }, [
                                      createVNode("div", { class: "flex items-center gap-2" }, [
                                        createVNode(unref(_sfc_main$2), { variant: "secondary" }, {
                                          default: withCtx(() => [
                                            createTextVNode("404")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("span", { class: "text-sm font-medium" }, "Not Found")
                                      ]),
                                      createVNode("span", { class: "text-sm text-muted-foreground" }, "Data tidak ditemukan")
                                    ]),
                                    createVNode("div", { class: "flex items-center justify-between p-2 rounded border" }, [
                                      createVNode("div", { class: "flex items-center gap-2" }, [
                                        createVNode(unref(_sfc_main$2), { variant: "destructive" }, {
                                          default: withCtx(() => [
                                            createTextVNode("422")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("span", { class: "text-sm font-medium" }, "Unprocessable Entity")
                                      ]),
                                      createVNode("span", { class: "text-sm text-muted-foreground" }, "Validation error")
                                    ]),
                                    createVNode("div", { class: "flex items-center justify-between p-2 rounded border" }, [
                                      createVNode("div", { class: "flex items-center gap-2" }, [
                                        createVNode(unref(_sfc_main$2), { variant: "destructive" }, {
                                          default: withCtx(() => [
                                            createTextVNode("500")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("span", { class: "text-sm font-medium" }, "Internal Server Error")
                                      ]),
                                      createVNode("span", { class: "text-sm text-muted-foreground" }, "Error server")
                                    ])
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$3), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$4), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$5), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Contoh Response API")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$6), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Response dari berbagai endpoint")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                                default: withCtx(() => [
                                  createVNode("div", null, [
                                    createVNode("h4", { class: "font-semibold mb-2" }, "Product List"),
                                    createVNode("div", { class: "rounded-lg bg-muted p-4" }, [
                                      createVNode("pre", { class: "text-xs overflow-x-auto" }, [
                                        createVNode("code", null, '{\n  "data": [\n    {\n      "id": 1,\n      "name": "Samsung Galaxy S24",\n      "slug": "samsung-galaxy-s24",\n      "base_price": 12000000,\n      "selling_price": 11500000,\n      "stock_quantity": 50,\n      "weight": 500,\n      "is_active": true,\n      "category": {\n        "id": 1,\n        "name": "Smartphone"\n      },\n      "images": [\n        {\n          "id": 1,\n          "url": "/storage/products/image1.jpg",\n          "is_primary": true\n        }\n      ]\n    }\n  ],\n  "meta": {\n    "current_page": 1,\n    "per_page": 10,\n    "total": 100\n  }\n}')
                                      ])
                                    ])
                                  ]),
                                  createVNode("div", null, [
                                    createVNode("h4", { class: "font-semibold mb-2" }, "Order Detail"),
                                    createVNode("div", { class: "rounded-lg bg-muted p-4" }, [
                                      createVNode("pre", { class: "text-xs overflow-x-auto" }, [
                                        createVNode("code", null, '{\n  "id": 1,\n  "order_no": "ORD-20250121-001",\n  "status": "PAID",\n  "subtotal_amount": 11500000,\n  "shipping_cost": 50000,\n  "grand_total": 11550000,\n  "customer": {\n    "id": 1,\n    "name": "John Doe",\n    "email": "john@example.com"\n  },\n  "items": [\n    {\n      "product_id": 1,\n      "product_name": "Samsung Galaxy S24",\n      "quantity": 1,\n      "unit_price": 11500000\n    }\n  ],\n  "shipment": {\n    "courier_code": "jne",\n    "service_code": "REG",\n    "tracking_number": "JNE123456789",\n    "status": "IN_TRANSIT"\n  }\n}')
                                      ])
                                    ])
                                  ]),
                                  createVNode("div", null, [
                                    createVNode("h4", { class: "font-semibold mb-2" }, "Bonus Detail"),
                                    createVNode("div", { class: "rounded-lg bg-muted p-4" }, [
                                      createVNode("pre", { class: "text-xs overflow-x-auto" }, [
                                        createVNode("code", null, '{\n  "id": 1,\n  "member_id": 1,\n  "bonus_type": "PAIRING",\n  "amount": 500000,\n  "status": "RELEASED",\n  "description": "Bonus pairing dari pair BV kiri-kanan",\n  "released_at": "2025-01-21T10:30:00Z",\n  "created_at": "2025-01-21T10:00:00Z"\n}')
                                      ])
                                    ])
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$4), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Butuh Bantuan?")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("Hubungi tim support untuk assistance")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "grid gap-4 md:grid-cols-3" }, [
                            createVNode("div", { class: "p-4 rounded-lg border bg-card text-center" }, [
                              createVNode(unref(Users), { class: "w-8 h-8 mx-auto mb-2 text-primary" }),
                              createVNode("h4", { class: "font-semibold mb-1" }, "Support Team"),
                              createVNode("p", { class: "text-sm text-muted-foreground" }, "support@puranusa.id")
                            ]),
                            createVNode("div", { class: "p-4 rounded-lg border bg-card text-center" }, [
                              createVNode(unref(BookOpen), { class: "w-8 h-8 mx-auto mb-2 text-primary" }),
                              createVNode("h4", { class: "font-semibold mb-1" }, "Developer"),
                              createVNode("p", { class: "text-sm text-muted-foreground" }, "chocoalano.github.io")
                            ]),
                            createVNode("div", { class: "p-4 rounded-lg border bg-card text-center" }, [
                              createVNode(unref(Info), { class: "w-8 h-8 mx-auto mb-2 text-primary" }),
                              createVNode("h4", { class: "font-semibold mb-1" }, "Version"),
                              createVNode("p", { class: "text-sm text-muted-foreground" }, "1.0.0")
                            ])
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Documentation/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
