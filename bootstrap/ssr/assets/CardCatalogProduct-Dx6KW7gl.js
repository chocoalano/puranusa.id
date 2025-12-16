import { defineComponent, ref, computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, createBlock, openBlock, Fragment, createCommentVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { _ as _sfc_main$2 } from "./index-BpQimeTM.js";
import { _ as _sfc_main$3 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$1, c as _sfc_main$4 } from "./CardTitle-sqUG0LTw.js";
import { Link, router } from "@inertiajs/vue3";
import { Heart, ShoppingCart, Info, Star } from "lucide-vue-next";
import { toast } from "vue-sonner";
import axios from "axios";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CardCatalogProduct",
  __ssrInlineRender: true,
  props: {
    product: {}
  },
  setup(__props) {
    const props = __props;
    const addingToCart = ref(false);
    const addingToWishlist = ref(false);
    const isInWishlist = ref(false);
    const isInStock = computed(() => props.product.stock > 0);
    const stockLabel = computed(() => isInStock.value ? "Ready Stock" : "Stok Habis");
    const stockBadgeClass = computed(() => isInStock.value ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" : "bg-destructive/10 text-destructive hover:bg-destructive/10");
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(amount);
    };
    const addToCart = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (addingToCart.value || !isInStock.value) return;
      addingToCart.value = true;
      try {
        const response = await axios.post("/cart/add", {
          product_id: props.product.id,
          quantity: 1
        });
        if (response.data.success) {
          toast.success("Berhasil", {
            description: response.data.message || "Produk berhasil ditambahkan ke keranjang."
          });
          router.reload({ only: ["ecommerce"] });
        } else {
          toast.error("Gagal", {
            description: response.data.message || "Gagal menambahkan ke keranjang."
          });
        }
      } catch (error) {
        console.error("Add to cart error:", error);
        if (error.response?.status === 401) {
          toast.error("Autentikasi Diperlukan", {
            description: error.response.data.message || "Anda harus login terlebih dahulu."
          });
          if (error.response.data.redirect) {
            router.visit(error.response.data.redirect);
          } else {
            router.visit("/client/login");
          }
          return;
        }
        toast.error("Gagal", {
          description: "Gagal menambahkan ke keranjang. Silakan coba lagi."
        });
      } finally {
        addingToCart.value = false;
      }
    };
    const toggleWishlist = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (addingToWishlist.value) return;
      addingToWishlist.value = true;
      try {
        const endpoint = isInWishlist.value ? "/wishlist/remove" : "/wishlist/add";
        const response = await axios.post(endpoint, {
          product_id: props.product.id
        });
        if (response.data.success) {
          isInWishlist.value = !isInWishlist.value;
          toast.success("Berhasil", {
            description: response.data.message || `Produk berhasil ${isInWishlist.value ? "ditambahkan ke" : "dihapus dari"} wishlist.`
          });
          router.reload({ only: ["ecommerce"] });
        } else {
          toast.error("Gagal", {
            description: response.data.message || "Gagal memperbarui wishlist."
          });
        }
      } catch (error) {
        console.error("Wishlist error:", error);
        if (error.response?.status === 401) {
          toast.error("Autentikasi Diperlukan", {
            description: error.response.data.message || "Anda harus login terlebih dahulu."
          });
          if (error.response.data.redirect) {
            router.visit(error.response.data.redirect);
          } else {
            router.visit("/client/login");
          }
          return;
        }
        toast.error("Gagal", {
          description: "Gagal memperbarui wishlist. Silakan coba lagi."
        });
      } finally {
        addingToWishlist.value = false;
      }
    };
    const goToProduct = () => {
      router.visit(`/produk/${props.product.slug}`);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<article${ssrRenderAttrs(mergeProps({
        itemscope: "",
        itemtype: "https://schema.org/Product",
        class: "h-full"
      }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Link), {
        href: `/produk/${__props.product.slug}`,
        class: "group block h-full",
        "aria-label": `Lihat detail produk ${__props.product.name}`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$1), { class: "group flex h-full flex-col gap-0 rounded-2xl border border-border/90 bg-background/95 p-3 transition-all hover:-translate-y-0.5 hover:shadow-lg sm:p-5" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="relative overflow-hidden rounded-xl bg-muted/20"${_scopeId2}><div class="relative h-44 w-full sm:h-56 lg:h-64"${_scopeId2}><img${ssrRenderAttr("src", __props.product.image)}${ssrRenderAttr("alt", `${__props.product.name} - ${__props.product.description || "Produk berkualitas"}`)} class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" width="500" height="500" itemprop="image"${_scopeId2}></div><div class="absolute top-3 left-3 flex flex-col gap-1"${_scopeId2}>`);
                  if (__props.product.discount_percentage > 0) {
                    _push3(ssrRenderComponent(unref(_sfc_main$2), {
                      variant: "destructive",
                      class: "text-xs px-2 py-0.5"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` -${ssrInterpolate(__props.product.discount_percentage)}% `);
                        } else {
                          return [
                            createTextVNode(" -" + toDisplayString(__props.product.discount_percentage) + "% ", 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else if (__props.product.badge) {
                    _push3(ssrRenderComponent(unref(_sfc_main$2), { class: "text-xs px-2 py-0.5 border-0 bg-primary text-primary-foreground" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(__props.product.badge)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(__props.product.badge), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="absolute top-3 right-3 flex flex-wrap justify-end gap-1.5 sm:flex-col sm:items-end sm:gap-2"${_scopeId2}>`);
                  if (__props.product.is_new) {
                    _push3(ssrRenderComponent(unref(_sfc_main$2), {
                      variant: "secondary",
                      class: "text-xs px-2 py-0.5 bg-green-500 text-white"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` BARU `);
                        } else {
                          return [
                            createTextVNode(" BARU ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<div class="flex flex-wrap justify-end gap-1.5 sm:flex-col sm:items-end sm:gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$3), {
                    size: "icon",
                    variant: isInWishlist.value ? "default" : "secondary",
                    class: "rounded-lg bg-white/95 p-0 text-foreground shadow-sm backdrop-blur hover:bg-white h-8 w-8 /* HP kecil */ sm:h-9 sm:w-9 /* HP lebar */ md:h-10 md:w-10 /* Tablet */ lg:h-11 lg:w-11 /* Desktop */",
                    onClick: toggleWishlist,
                    disabled: addingToWishlist.value,
                    "aria-label": isInWishlist.value ? "Hapus dari wishlist" : "Tambah ke wishlist"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Heart), {
                          class: [
                            "transition-colors",
                            "h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5",
                            isInWishlist.value ? "fill-red-500 text-red-500" : "text-muted-foreground"
                          ]
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Heart), {
                            class: [
                              "transition-colors",
                              "h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5",
                              isInWishlist.value ? "fill-red-500 text-red-500" : "text-muted-foreground"
                            ]
                          }, null, 8, ["class"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$3), {
                    size: "icon",
                    variant: "default",
                    class: "rounded-lg bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-11 lg:w-11",
                    onClick: addToCart,
                    disabled: addingToCart.value || !isInStock.value,
                    "aria-label": isInStock.value ? "Tambah ke keranjang" : "Stok habis"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(ShoppingCart), {
                          class: [
                            "transition-transform",
                            "h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5",
                            addingToCart.value ? "animate-bounce" : ""
                          ]
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(ShoppingCart), {
                            class: [
                              "transition-transform",
                              "h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5",
                              addingToCart.value ? "animate-bounce" : ""
                            ]
                          }, null, 8, ["class"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$3), {
                    size: "icon",
                    variant: "secondary",
                    class: "rounded-lg p-0 text-foreground shadow-sm backdrop-blur h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-11 lg:w-11",
                    onClick: goToProduct,
                    "aria-label": "Lihat detail produk"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Info), { class: "h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Info), { class: "h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div></div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { class: "flex flex-1 flex-col gap-3 px-0 pt-4 sm:gap-4 sm:pt-5" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex flex-wrap items-center gap-2 text-[11px] font-medium text-muted-foreground sm:text-xs"${_scopeId3}><div class="flex items-center gap-1.5" itemprop="aggregateRating" itemscope itemtype="https://schema.org/AggregateRating"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Star), { class: "h-4 w-4 text-yellow-400" }, null, _parent4, _scopeId3));
                        if (__props.product.rating) {
                          _push4(`<!--[--><meta itemprop="ratingValue"${ssrRenderAttr("content", __props.product.rating.toString())}${_scopeId3}><meta itemprop="reviewCount"${ssrRenderAttr("content", __props.product.review_count?.toString() || "0")}${_scopeId3}><span class="text-foreground"${_scopeId3}>${ssrInterpolate(__props.product.rating)}</span><span${_scopeId3}>(${ssrInterpolate(__props.product.review_count || 0)})</span><!--]-->`);
                        } else {
                          _push4(`<span class="text-muted-foreground"${_scopeId3}>Belum ada ulasan</span>`);
                        }
                        _push4(`</div><span class="hidden h-1 w-1 rounded-full bg-border sm:inline-flex" aria-hidden="true"${_scopeId3}></span>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$2), {
                          variant: "secondary",
                          class: ["border-0 text-[10px] font-semibold uppercase tracking-wide", stockBadgeClass.value]
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(stockLabel.value)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(stockLabel.value), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div><div class="space-y-2"${_scopeId3}><span class="font-semibold leading-tight text-foreground line-clamp-2 text-sm sm:text-base md:text-lg lg:text-xl break-words" itemprop="name"${_scopeId3}>${ssrInterpolate(__props.product.name)}</span></div><div class="mt-auto space-y-1.5" itemprop="offers" itemscope itemtype="https://schema.org/Offer"${_scopeId3}><meta itemprop="priceCurrency" content="IDR"${_scopeId3}><meta itemprop="price"${ssrRenderAttr("content", __props.product.price.toString())}${_scopeId3}><meta itemprop="availability"${ssrRenderAttr("content", __props.product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock")}${_scopeId3}><link itemprop="url"${ssrRenderAttr("href", `/produk/${__props.product.slug}`)}${_scopeId3}><div class="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1 text-gray-900 dark:text-gray-100"${_scopeId3}><span class="font-bold text-base sm:text-lg md:text-xl lg:text-2xl"${_scopeId3}>${ssrInterpolate(formatCurrency(__props.product.price))}</span>`);
                        if (__props.product.original_price && __props.product.discount_percentage > 0) {
                          _push4(`<span class="line-through text-muted-foreground text-[10px] sm:text-xs md:text-sm"${_scopeId3}>${ssrInterpolate(formatCurrency(__props.product.original_price))}</span>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><p class="${ssrRenderClass([isInStock.value ? "text-emerald-600" : "text-destructive", "text-[11px] font-medium"])}"${_scopeId3}>${ssrInterpolate(isInStock.value ? "Siap dikirim 24 jam" : "Sedang tidak tersedia")}</p></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex flex-wrap items-center gap-2 text-[11px] font-medium text-muted-foreground sm:text-xs" }, [
                            createVNode("div", {
                              class: "flex items-center gap-1.5",
                              itemprop: "aggregateRating",
                              itemscope: "",
                              itemtype: "https://schema.org/AggregateRating"
                            }, [
                              createVNode(unref(Star), { class: "h-4 w-4 text-yellow-400" }),
                              __props.product.rating ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                createVNode("meta", {
                                  itemprop: "ratingValue",
                                  content: __props.product.rating.toString()
                                }, null, 8, ["content"]),
                                createVNode("meta", {
                                  itemprop: "reviewCount",
                                  content: __props.product.review_count?.toString() || "0"
                                }, null, 8, ["content"]),
                                createVNode("span", { class: "text-foreground" }, toDisplayString(__props.product.rating), 1),
                                createVNode("span", null, "(" + toDisplayString(__props.product.review_count || 0) + ")", 1)
                              ], 64)) : (openBlock(), createBlock("span", {
                                key: 1,
                                class: "text-muted-foreground"
                              }, "Belum ada ulasan"))
                            ]),
                            createVNode("span", {
                              class: "hidden h-1 w-1 rounded-full bg-border sm:inline-flex",
                              "aria-hidden": "true"
                            }),
                            createVNode(unref(_sfc_main$2), {
                              variant: "secondary",
                              class: ["border-0 text-[10px] font-semibold uppercase tracking-wide", stockBadgeClass.value]
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(stockLabel.value), 1)
                              ]),
                              _: 1
                            }, 8, ["class"])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("span", {
                              class: "font-semibold leading-tight text-foreground line-clamp-2 text-sm sm:text-base md:text-lg lg:text-xl break-words",
                              itemprop: "name"
                            }, toDisplayString(__props.product.name), 1)
                          ]),
                          createVNode("div", {
                            class: "mt-auto space-y-1.5",
                            itemprop: "offers",
                            itemscope: "",
                            itemtype: "https://schema.org/Offer"
                          }, [
                            createVNode("meta", {
                              itemprop: "priceCurrency",
                              content: "IDR"
                            }),
                            createVNode("meta", {
                              itemprop: "price",
                              content: __props.product.price.toString()
                            }, null, 8, ["content"]),
                            createVNode("meta", {
                              itemprop: "availability",
                              content: __props.product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
                            }, null, 8, ["content"]),
                            createVNode("link", {
                              itemprop: "url",
                              href: `/produk/${__props.product.slug}`
                            }, null, 8, ["href"]),
                            createVNode("div", { class: "flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1 text-gray-900 dark:text-gray-100" }, [
                              createVNode("span", { class: "font-bold text-base sm:text-lg md:text-xl lg:text-2xl" }, toDisplayString(formatCurrency(__props.product.price)), 1),
                              __props.product.original_price && __props.product.discount_percentage > 0 ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "line-through text-muted-foreground text-[10px] sm:text-xs md:text-sm"
                              }, toDisplayString(formatCurrency(__props.product.original_price)), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("p", {
                              class: ["text-[11px] font-medium", isInStock.value ? "text-emerald-600" : "text-destructive"]
                            }, toDisplayString(isInStock.value ? "Siap dikirim 24 jam" : "Sedang tidak tersedia"), 3)
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "relative overflow-hidden rounded-xl bg-muted/20" }, [
                      createVNode("div", { class: "relative h-44 w-full sm:h-56 lg:h-64" }, [
                        createVNode("img", {
                          src: __props.product.image,
                          alt: `${__props.product.name} - ${__props.product.description || "Produk berkualitas"}`,
                          class: "absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105",
                          loading: "lazy",
                          width: "500",
                          height: "500",
                          itemprop: "image"
                        }, null, 8, ["src", "alt"])
                      ]),
                      createVNode("div", { class: "absolute top-3 left-3 flex flex-col gap-1" }, [
                        __props.product.discount_percentage > 0 ? (openBlock(), createBlock(unref(_sfc_main$2), {
                          key: 0,
                          variant: "destructive",
                          class: "text-xs px-2 py-0.5"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" -" + toDisplayString(__props.product.discount_percentage) + "% ", 1)
                          ]),
                          _: 1
                        })) : __props.product.badge ? (openBlock(), createBlock(unref(_sfc_main$2), {
                          key: 1,
                          class: "text-xs px-2 py-0.5 border-0 bg-primary text-primary-foreground"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(__props.product.badge), 1)
                          ]),
                          _: 1
                        })) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "absolute top-3 right-3 flex flex-wrap justify-end gap-1.5 sm:flex-col sm:items-end sm:gap-2" }, [
                        __props.product.is_new ? (openBlock(), createBlock(unref(_sfc_main$2), {
                          key: 0,
                          variant: "secondary",
                          class: "text-xs px-2 py-0.5 bg-green-500 text-white"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" BARU ")
                          ]),
                          _: 1
                        })) : createCommentVNode("", true),
                        createVNode("div", { class: "flex flex-wrap justify-end gap-1.5 sm:flex-col sm:items-end sm:gap-2" }, [
                          createVNode(unref(_sfc_main$3), {
                            size: "icon",
                            variant: isInWishlist.value ? "default" : "secondary",
                            class: "rounded-lg bg-white/95 p-0 text-foreground shadow-sm backdrop-blur hover:bg-white h-8 w-8 /* HP kecil */ sm:h-9 sm:w-9 /* HP lebar */ md:h-10 md:w-10 /* Tablet */ lg:h-11 lg:w-11 /* Desktop */",
                            onClick: withModifiers(toggleWishlist, ["prevent", "stop"]),
                            disabled: addingToWishlist.value,
                            "aria-label": isInWishlist.value ? "Hapus dari wishlist" : "Tambah ke wishlist"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Heart), {
                                class: [
                                  "transition-colors",
                                  "h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5",
                                  isInWishlist.value ? "fill-red-500 text-red-500" : "text-muted-foreground"
                                ]
                              }, null, 8, ["class"])
                            ]),
                            _: 1
                          }, 8, ["variant", "disabled", "aria-label"]),
                          createVNode(unref(_sfc_main$3), {
                            size: "icon",
                            variant: "default",
                            class: "rounded-lg bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-11 lg:w-11",
                            onClick: withModifiers(addToCart, ["prevent", "stop"]),
                            disabled: addingToCart.value || !isInStock.value,
                            "aria-label": isInStock.value ? "Tambah ke keranjang" : "Stok habis"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(ShoppingCart), {
                                class: [
                                  "transition-transform",
                                  "h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5",
                                  addingToCart.value ? "animate-bounce" : ""
                                ]
                              }, null, 8, ["class"])
                            ]),
                            _: 1
                          }, 8, ["disabled", "aria-label"]),
                          createVNode(unref(_sfc_main$3), {
                            size: "icon",
                            variant: "secondary",
                            class: "rounded-lg p-0 text-foreground shadow-sm backdrop-blur h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-11 lg:w-11",
                            onClick: withModifiers(goToProduct, ["prevent", "stop"]),
                            "aria-label": "Lihat detail produk"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Info), { class: "h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" })
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    createVNode(unref(_sfc_main$4), { class: "flex flex-1 flex-col gap-3 px-0 pt-4 sm:gap-4 sm:pt-5" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex flex-wrap items-center gap-2 text-[11px] font-medium text-muted-foreground sm:text-xs" }, [
                          createVNode("div", {
                            class: "flex items-center gap-1.5",
                            itemprop: "aggregateRating",
                            itemscope: "",
                            itemtype: "https://schema.org/AggregateRating"
                          }, [
                            createVNode(unref(Star), { class: "h-4 w-4 text-yellow-400" }),
                            __props.product.rating ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                              createVNode("meta", {
                                itemprop: "ratingValue",
                                content: __props.product.rating.toString()
                              }, null, 8, ["content"]),
                              createVNode("meta", {
                                itemprop: "reviewCount",
                                content: __props.product.review_count?.toString() || "0"
                              }, null, 8, ["content"]),
                              createVNode("span", { class: "text-foreground" }, toDisplayString(__props.product.rating), 1),
                              createVNode("span", null, "(" + toDisplayString(__props.product.review_count || 0) + ")", 1)
                            ], 64)) : (openBlock(), createBlock("span", {
                              key: 1,
                              class: "text-muted-foreground"
                            }, "Belum ada ulasan"))
                          ]),
                          createVNode("span", {
                            class: "hidden h-1 w-1 rounded-full bg-border sm:inline-flex",
                            "aria-hidden": "true"
                          }),
                          createVNode(unref(_sfc_main$2), {
                            variant: "secondary",
                            class: ["border-0 text-[10px] font-semibold uppercase tracking-wide", stockBadgeClass.value]
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(stockLabel.value), 1)
                            ]),
                            _: 1
                          }, 8, ["class"])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("span", {
                            class: "font-semibold leading-tight text-foreground line-clamp-2 text-sm sm:text-base md:text-lg lg:text-xl break-words",
                            itemprop: "name"
                          }, toDisplayString(__props.product.name), 1)
                        ]),
                        createVNode("div", {
                          class: "mt-auto space-y-1.5",
                          itemprop: "offers",
                          itemscope: "",
                          itemtype: "https://schema.org/Offer"
                        }, [
                          createVNode("meta", {
                            itemprop: "priceCurrency",
                            content: "IDR"
                          }),
                          createVNode("meta", {
                            itemprop: "price",
                            content: __props.product.price.toString()
                          }, null, 8, ["content"]),
                          createVNode("meta", {
                            itemprop: "availability",
                            content: __props.product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
                          }, null, 8, ["content"]),
                          createVNode("link", {
                            itemprop: "url",
                            href: `/produk/${__props.product.slug}`
                          }, null, 8, ["href"]),
                          createVNode("div", { class: "flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1 text-gray-900 dark:text-gray-100" }, [
                            createVNode("span", { class: "font-bold text-base sm:text-lg md:text-xl lg:text-2xl" }, toDisplayString(formatCurrency(__props.product.price)), 1),
                            __props.product.original_price && __props.product.discount_percentage > 0 ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "line-through text-muted-foreground text-[10px] sm:text-xs md:text-sm"
                            }, toDisplayString(formatCurrency(__props.product.original_price)), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("p", {
                            class: ["text-[11px] font-medium", isInStock.value ? "text-emerald-600" : "text-destructive"]
                          }, toDisplayString(isInStock.value ? "Siap dikirim 24 jam" : "Sedang tidak tersedia"), 3)
                        ])
                      ]),
                      _: 2
                    }, 1024)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$1), { class: "group flex h-full flex-col gap-0 rounded-2xl border border-border/90 bg-background/95 p-3 transition-all hover:-translate-y-0.5 hover:shadow-lg sm:p-5" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "relative overflow-hidden rounded-xl bg-muted/20" }, [
                    createVNode("div", { class: "relative h-44 w-full sm:h-56 lg:h-64" }, [
                      createVNode("img", {
                        src: __props.product.image,
                        alt: `${__props.product.name} - ${__props.product.description || "Produk berkualitas"}`,
                        class: "absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105",
                        loading: "lazy",
                        width: "500",
                        height: "500",
                        itemprop: "image"
                      }, null, 8, ["src", "alt"])
                    ]),
                    createVNode("div", { class: "absolute top-3 left-3 flex flex-col gap-1" }, [
                      __props.product.discount_percentage > 0 ? (openBlock(), createBlock(unref(_sfc_main$2), {
                        key: 0,
                        variant: "destructive",
                        class: "text-xs px-2 py-0.5"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" -" + toDisplayString(__props.product.discount_percentage) + "% ", 1)
                        ]),
                        _: 1
                      })) : __props.product.badge ? (openBlock(), createBlock(unref(_sfc_main$2), {
                        key: 1,
                        class: "text-xs px-2 py-0.5 border-0 bg-primary text-primary-foreground"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(__props.product.badge), 1)
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "absolute top-3 right-3 flex flex-wrap justify-end gap-1.5 sm:flex-col sm:items-end sm:gap-2" }, [
                      __props.product.is_new ? (openBlock(), createBlock(unref(_sfc_main$2), {
                        key: 0,
                        variant: "secondary",
                        class: "text-xs px-2 py-0.5 bg-green-500 text-white"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" BARU ")
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      createVNode("div", { class: "flex flex-wrap justify-end gap-1.5 sm:flex-col sm:items-end sm:gap-2" }, [
                        createVNode(unref(_sfc_main$3), {
                          size: "icon",
                          variant: isInWishlist.value ? "default" : "secondary",
                          class: "rounded-lg bg-white/95 p-0 text-foreground shadow-sm backdrop-blur hover:bg-white h-8 w-8 /* HP kecil */ sm:h-9 sm:w-9 /* HP lebar */ md:h-10 md:w-10 /* Tablet */ lg:h-11 lg:w-11 /* Desktop */",
                          onClick: withModifiers(toggleWishlist, ["prevent", "stop"]),
                          disabled: addingToWishlist.value,
                          "aria-label": isInWishlist.value ? "Hapus dari wishlist" : "Tambah ke wishlist"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Heart), {
                              class: [
                                "transition-colors",
                                "h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5",
                                isInWishlist.value ? "fill-red-500 text-red-500" : "text-muted-foreground"
                              ]
                            }, null, 8, ["class"])
                          ]),
                          _: 1
                        }, 8, ["variant", "disabled", "aria-label"]),
                        createVNode(unref(_sfc_main$3), {
                          size: "icon",
                          variant: "default",
                          class: "rounded-lg bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-11 lg:w-11",
                          onClick: withModifiers(addToCart, ["prevent", "stop"]),
                          disabled: addingToCart.value || !isInStock.value,
                          "aria-label": isInStock.value ? "Tambah ke keranjang" : "Stok habis"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(ShoppingCart), {
                              class: [
                                "transition-transform",
                                "h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5",
                                addingToCart.value ? "animate-bounce" : ""
                              ]
                            }, null, 8, ["class"])
                          ]),
                          _: 1
                        }, 8, ["disabled", "aria-label"]),
                        createVNode(unref(_sfc_main$3), {
                          size: "icon",
                          variant: "secondary",
                          class: "rounded-lg p-0 text-foreground shadow-sm backdrop-blur h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-11 lg:w-11",
                          onClick: withModifiers(goToProduct, ["prevent", "stop"]),
                          "aria-label": "Lihat detail produk"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Info), { class: "h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" })
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  createVNode(unref(_sfc_main$4), { class: "flex flex-1 flex-col gap-3 px-0 pt-4 sm:gap-4 sm:pt-5" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex flex-wrap items-center gap-2 text-[11px] font-medium text-muted-foreground sm:text-xs" }, [
                        createVNode("div", {
                          class: "flex items-center gap-1.5",
                          itemprop: "aggregateRating",
                          itemscope: "",
                          itemtype: "https://schema.org/AggregateRating"
                        }, [
                          createVNode(unref(Star), { class: "h-4 w-4 text-yellow-400" }),
                          __props.product.rating ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                            createVNode("meta", {
                              itemprop: "ratingValue",
                              content: __props.product.rating.toString()
                            }, null, 8, ["content"]),
                            createVNode("meta", {
                              itemprop: "reviewCount",
                              content: __props.product.review_count?.toString() || "0"
                            }, null, 8, ["content"]),
                            createVNode("span", { class: "text-foreground" }, toDisplayString(__props.product.rating), 1),
                            createVNode("span", null, "(" + toDisplayString(__props.product.review_count || 0) + ")", 1)
                          ], 64)) : (openBlock(), createBlock("span", {
                            key: 1,
                            class: "text-muted-foreground"
                          }, "Belum ada ulasan"))
                        ]),
                        createVNode("span", {
                          class: "hidden h-1 w-1 rounded-full bg-border sm:inline-flex",
                          "aria-hidden": "true"
                        }),
                        createVNode(unref(_sfc_main$2), {
                          variant: "secondary",
                          class: ["border-0 text-[10px] font-semibold uppercase tracking-wide", stockBadgeClass.value]
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(stockLabel.value), 1)
                          ]),
                          _: 1
                        }, 8, ["class"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode("span", {
                          class: "font-semibold leading-tight text-foreground line-clamp-2 text-sm sm:text-base md:text-lg lg:text-xl break-words",
                          itemprop: "name"
                        }, toDisplayString(__props.product.name), 1)
                      ]),
                      createVNode("div", {
                        class: "mt-auto space-y-1.5",
                        itemprop: "offers",
                        itemscope: "",
                        itemtype: "https://schema.org/Offer"
                      }, [
                        createVNode("meta", {
                          itemprop: "priceCurrency",
                          content: "IDR"
                        }),
                        createVNode("meta", {
                          itemprop: "price",
                          content: __props.product.price.toString()
                        }, null, 8, ["content"]),
                        createVNode("meta", {
                          itemprop: "availability",
                          content: __props.product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
                        }, null, 8, ["content"]),
                        createVNode("link", {
                          itemprop: "url",
                          href: `/produk/${__props.product.slug}`
                        }, null, 8, ["href"]),
                        createVNode("div", { class: "flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1 text-gray-900 dark:text-gray-100" }, [
                          createVNode("span", { class: "font-bold text-base sm:text-lg md:text-xl lg:text-2xl" }, toDisplayString(formatCurrency(__props.product.price)), 1),
                          __props.product.original_price && __props.product.discount_percentage > 0 ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "line-through text-muted-foreground text-[10px] sm:text-xs md:text-sm"
                          }, toDisplayString(formatCurrency(__props.product.original_price)), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("p", {
                          class: ["text-[11px] font-medium", isInStock.value ? "text-emerald-600" : "text-destructive"]
                        }, toDisplayString(isInStock.value ? "Siap dikirim 24 jam" : "Sedang tidak tersedia"), 3)
                      ])
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
      _push(`</article>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ecommerce/CardCatalogProduct.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
