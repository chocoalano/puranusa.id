import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, useSSRContext, createTextVNode, Fragment, renderList, onMounted } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import { router, Head } from "@inertiajs/vue3";
import { a as _sfc_main$c, _ as _sfc_main$j } from "./Ecommerce-BbDWQ8z6.js";
import { _ as _sfc_main$7, a as _sfc_main$d, b as _sfc_main$e, c as _sfc_main$f } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$8 } from "./index-SN_CnQ_F.js";
import { ChevronLeft, ChevronRight, ZoomIn, Award, Package, Star, Truck, Minus, Plus, ShoppingCart, Heart, Share2, Ruler } from "lucide-vue-next";
import { _ as _sfc_main$9 } from "./index-BpQimeTM.js";
import { e as _sfc_main$a } from "./DropdownMenuTrigger-B1v6pHML.js";
import { _ as _sfc_main$b } from "./Input-BGi8wCMh.js";
import axios from "axios";
import { toast } from "vue-sonner";
import { _ as _sfc_main$g, b as _sfc_main$h } from "./AvatarImage-DWFQMckn.js";
import { _ as _sfc_main$i } from "./CardCatalogProduct-Dx6KW7gl.js";
import { _ as _sfc_main$q, a as _sfc_main$r, b as _sfc_main$s, c as _sfc_main$t } from "./TabsTrigger-Bvg0QZyC.js";
import { _ as _sfc_main$k, a as _sfc_main$l, b as _sfc_main$m, d as _sfc_main$n, e as _sfc_main$o, c as _sfc_main$p } from "./BreadcrumbSeparator-YMzfzP6z.js";
import "./index-D3PKcwoM.js";
import "class-variance-authority";
import "./Label-16aMY2sx.js";
import "reka-ui";
import "@vueuse/core";
import "./SelectValue-BUnv4mQg.js";
import "./Checkbox-CIOQa2-J.js";
import "./useAppearance-gspEihnp.js";
import "clsx";
import "tailwind-merge";
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "ProductImageGallery",
  __ssrInlineRender: true,
  props: {
    images: {},
    productName: {}
  },
  setup(__props) {
    const props = __props;
    const selectedImageIndex = ref(0);
    const isZoomed = ref(false);
    const nextImage = () => {
      selectedImageIndex.value = (selectedImageIndex.value + 1) % props.images.length;
    };
    const prevImage = () => {
      selectedImageIndex.value = (selectedImageIndex.value - 1 + props.images.length) % props.images.length;
    };
    const toggleZoom = () => {
      isZoomed.value = !isZoomed.value;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(_sfc_main$7), { class: "overflow-hidden relative group" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="aspect-square bg-muted/30 relative"${_scopeId}><img${ssrRenderAttr("src", __props.images[selectedImageIndex.value])}${ssrRenderAttr("alt", __props.productName)} class="${ssrRenderClass([{ "cursor-zoom-in": !isZoomed.value, "cursor-zoom-out scale-150": isZoomed.value }, "w-full h-full object-cover"])}"${_scopeId}>`);
            if (__props.images.length > 1) {
              _push2(`<div class="absolute inset-y-0 left-0 right-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(_sfc_main$8), {
                variant: "secondary",
                size: "icon",
                class: "rounded-full",
                onClick: prevImage
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(ChevronLeft), { class: "h-5 w-5" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(ChevronLeft), { class: "h-5 w-5" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$8), {
                variant: "secondary",
                size: "icon",
                class: "rounded-full",
                onClick: nextImage
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(ChevronRight), { class: "h-5 w-5" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(ChevronRight), { class: "h-5 w-5" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$8), {
              variant: "secondary",
              size: "icon",
              class: "rounded-full",
              onClick: toggleZoom
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ZoomIn), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(ZoomIn), { class: "h-4 w-4" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (__props.images.length > 1) {
              _push2(`<div class="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm"${_scopeId}>${ssrInterpolate(selectedImageIndex.value + 1)} / ${ssrInterpolate(__props.images.length)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "aspect-square bg-muted/30 relative" }, [
                createVNode("img", {
                  src: __props.images[selectedImageIndex.value],
                  alt: __props.productName,
                  class: ["w-full h-full object-cover", { "cursor-zoom-in": !isZoomed.value, "cursor-zoom-out scale-150": isZoomed.value }],
                  onClick: toggleZoom
                }, null, 10, ["src", "alt"]),
                __props.images.length > 1 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "absolute inset-y-0 left-0 right-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity"
                }, [
                  createVNode(unref(_sfc_main$8), {
                    variant: "secondary",
                    size: "icon",
                    class: "rounded-full",
                    onClick: prevImage
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(ChevronLeft), { class: "h-5 w-5" })
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$8), {
                    variant: "secondary",
                    size: "icon",
                    class: "rounded-full",
                    onClick: nextImage
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(ChevronRight), { class: "h-5 w-5" })
                    ]),
                    _: 1
                  })
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity" }, [
                  createVNode(unref(_sfc_main$8), {
                    variant: "secondary",
                    size: "icon",
                    class: "rounded-full",
                    onClick: toggleZoom
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(ZoomIn), { class: "h-4 w-4" })
                    ]),
                    _: 1
                  })
                ]),
                __props.images.length > 1 ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm"
                }, toDisplayString(selectedImageIndex.value + 1) + " / " + toDisplayString(__props.images.length), 1)) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (__props.images.length > 1) {
        _push(`<div class="grid grid-cols-5 gap-3"><!--[-->`);
        ssrRenderList(__props.images, (image, index) => {
          _push(`<button class="${ssrRenderClass([{
            "border-primary ring-2 ring-primary ring-offset-2": selectedImageIndex.value === index,
            "border-border": selectedImageIndex.value !== index
          }, "aspect-square overflow-hidden rounded-lg border-2 transition-all hover:border-primary"])}"><img${ssrRenderAttr("src", image)}${ssrRenderAttr("alt", `${__props.productName} - Image ${index + 1}`)} class="w-full h-full object-cover"></button>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ecommerce/product/ProductImageGallery.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "ProductInfo",
  __ssrInlineRender: true,
  props: {
    name: {},
    brand: {},
    sku: {},
    rating: {},
    reviewCount: {},
    price: {},
    originalPrice: {},
    discountPercentage: {},
    stock: {},
    categories: {},
    warrantyMonths: {},
    isNew: { type: Boolean }
  },
  setup(__props) {
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(amount);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex flex-wrap items-center gap-2"><!--[-->`);
      ssrRenderList(__props.categories, (category) => {
        _push(ssrRenderComponent(unref(_sfc_main$9), {
          key: category.id,
          variant: "secondary",
          class: "text-xs"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(category.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(category.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]-->`);
      if (__props.isNew) {
        _push(ssrRenderComponent(unref(_sfc_main$9), {
          variant: "default",
          class: "text-xs bg-green-500"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` BARU `);
            } else {
              return [
                createTextVNode(" BARU ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><h1 class="text-3xl md:text-4xl font-bold mb-2">${ssrInterpolate(__props.name)}</h1><div class="flex items-center gap-4 text-sm text-muted-foreground">`);
      if (__props.brand) {
        _push(`<span class="flex items-center gap-1">`);
        _push(ssrRenderComponent(unref(Award), { class: "h-4 w-4" }, null, _parent));
        _push(` Brand: <span class="font-medium text-foreground">${ssrInterpolate(__props.brand)}</span></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="flex items-center gap-1">`);
      _push(ssrRenderComponent(unref(Package), { class: "h-4 w-4" }, null, _parent));
      _push(` SKU: <span class="font-medium">${ssrInterpolate(__props.sku)}</span></span></div></div><div class="flex items-center gap-3"><div class="flex items-center gap-1">`);
      _push(ssrRenderComponent(unref(Star), { class: "h-5 w-5 fill-yellow-400 text-yellow-400" }, null, _parent));
      _push(`<span class="text-xl font-bold">${ssrInterpolate(__props.rating)}</span></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$a), {
        orientation: "vertical",
        class: "h-6"
      }, null, _parent));
      _push(`<span class="text-sm text-muted-foreground">${ssrInterpolate(__props.reviewCount)} ulasan</span>`);
      _push(ssrRenderComponent(unref(_sfc_main$a), {
        orientation: "vertical",
        class: "h-6"
      }, null, _parent));
      _push(`<span class="${ssrRenderClass([__props.stock > 0 ? "text-green-600" : "text-red-600", "text-sm"])}">${ssrInterpolate(__props.stock > 0 ? `${__props.stock} stok tersedia` : "Stok habis")}</span></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$a), null, null, _parent));
      _push(`<div class="space-y-2">`);
      if (__props.originalPrice && __props.discountPercentage > 0) {
        _push(`<div class="flex items-center gap-3"><span class="text-2xl text-muted-foreground line-through">${ssrInterpolate(formatCurrency(__props.originalPrice))}</span>`);
        _push(ssrRenderComponent(unref(_sfc_main$9), {
          variant: "destructive",
          class: "text-base px-3 py-1"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` -${ssrInterpolate(__props.discountPercentage)}% `);
            } else {
              return [
                createTextVNode(" -" + toDisplayString(__props.discountPercentage) + "% ", 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="text-4xl font-bold text-primary">${ssrInterpolate(formatCurrency(__props.price))}</div></div><div class="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">`);
      if (__props.warrantyMonths) {
        _push(`<div class="flex items-start gap-2">`);
        _push(ssrRenderComponent(unref(Award), { class: "h-5 w-5 text-primary mt-0.5" }, null, _parent));
        _push(`<div><p class="text-sm font-medium">Garansi</p><p class="text-xs text-muted-foreground">${ssrInterpolate(__props.warrantyMonths)} bulan</p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex items-start gap-2">`);
      _push(ssrRenderComponent(unref(Truck), { class: "h-5 w-5 text-primary mt-0.5" }, null, _parent));
      _push(`<div><p class="text-sm font-medium">Pengiriman</p><p class="text-xs text-muted-foreground">Gratis ongkir min. 100k</p></div></div></div></div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ecommerce/product/ProductInfo.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ProductActions",
  __ssrInlineRender: true,
  props: {
    productId: {},
    productName: {},
    productPrice: {},
    productImage: {},
    productWeight: {},
    stock: {}
  },
  setup(__props) {
    const props = __props;
    const quantity = ref(1);
    const addingToCart = ref(false);
    const addingToWishlist = ref(false);
    const isInWishlist = ref(false);
    const checkoutSheetOpen = ref(false);
    const incrementQuantity = () => {
      if (quantity.value < props.stock) {
        quantity.value++;
      }
    };
    const decrementQuantity = () => {
      if (quantity.value > 1) {
        quantity.value--;
      }
    };
    const addToCart = async () => {
      if (addingToCart.value) return;
      addingToCart.value = true;
      try {
        const response = await axios.post("/cart/add", {
          product_id: props.productId,
          quantity: quantity.value
        });
        if (response.data.success) {
          toast.success("Berhasil", {
            description: response.data.message || "Produk berhasil ditambahkan ke keranjang."
          });
          router.reload({ only: ["ecommerce"] });
        }
      } catch (error) {
        console.error("Failed to add to cart:", error);
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
        const message = error.response?.data?.message || "Gagal menambahkan ke keranjang. Silakan coba lagi.";
        toast.error("Gagal", {
          description: message
        });
      } finally {
        addingToCart.value = false;
      }
    };
    const buyNow = () => {
      checkoutSheetOpen.value = true;
    };
    const toggleWishlist = async () => {
      if (addingToWishlist.value) return;
      addingToWishlist.value = true;
      const endpoint = isInWishlist.value ? "/wishlist/remove" : "/wishlist/add";
      try {
        const response = await axios.post(endpoint, {
          product_id: props.productId
        });
        if (response.data.success) {
          isInWishlist.value = !isInWishlist.value;
          toast.success("Berhasil", {
            description: response.data.message || (isInWishlist.value ? "Produk ditambahkan ke wishlist." : "Produk dihapus dari wishlist.")
          });
          router.reload({ only: ["ecommerce"] });
        }
      } catch (error) {
        console.error("Failed to update wishlist:", error);
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
        const message = error.response?.data?.message || "Gagal mengubah wishlist. Silakan coba lagi.";
        toast.error("Gagal", {
          description: message
        });
      } finally {
        addingToWishlist.value = false;
      }
    };
    const shareProduct = async () => {
      if (typeof window === "undefined" || typeof navigator === "undefined") return;
      if (navigator.share) {
        try {
          await navigator.share({
            title: props.productName,
            url: window.location.href
          });
        } catch {
          console.log("Share cancelled");
        }
      } else {
        navigator.clipboard.writeText(window.location.href);
        toast.success("Berhasil", {
          description: "Link produk telah disalin!"
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}><div class="space-y-2"><label class="text-sm font-medium">Jumlah</label><div class="flex items-center gap-3"><div class="flex items-center rounded-lg border">`);
      _push(ssrRenderComponent(unref(_sfc_main$8), {
        variant: "ghost",
        size: "icon",
        onClick: decrementQuantity,
        disabled: quantity.value <= 1
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Minus), { class: "h-4 w-4" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Minus), { class: "h-4 w-4" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$b), {
        modelValue: quantity.value,
        "onUpdate:modelValue": ($event) => quantity.value = $event,
        modelModifiers: { number: true },
        type: "number",
        min: "1",
        max: __props.stock,
        class: "w-20 border-0 text-center focus-visible:ring-0"
      }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$8), {
        variant: "ghost",
        size: "icon",
        onClick: incrementQuantity,
        disabled: quantity.value >= __props.stock
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Plus), { class: "h-4 w-4" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Plus), { class: "h-4 w-4" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><span class="text-sm text-muted-foreground"> Maksimal ${ssrInterpolate(__props.stock)} unit </span></div></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$a), null, null, _parent));
      _push(`<div class="flex flex-col gap-3 sm:flex-row">`);
      _push(ssrRenderComponent(unref(_sfc_main$8), {
        variant: "outline",
        size: "lg",
        class: "min-h-11 sm:flex-1",
        onClick: addToCart,
        disabled: addingToCart.value || __props.stock === 0
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ShoppingCart), { class: "mr-2 h-5 w-5" }, null, _parent2, _scopeId));
            _push2(` Tambah ke Keranjang `);
          } else {
            return [
              createVNode(unref(ShoppingCart), { class: "mr-2 h-5 w-5" }),
              createTextVNode(" Tambah ke Keranjang ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$8), {
        size: "lg",
        class: "min-h-11 sm:flex-1",
        onClick: buyNow,
        disabled: __props.stock === 0
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Beli Sekarang `);
          } else {
            return [
              createTextVNode(" Beli Sekarang ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex gap-2">`);
      _push(ssrRenderComponent(unref(_sfc_main$8), {
        variant: "outline",
        size: "lg",
        class: "flex-1",
        onClick: toggleWishlist,
        disabled: addingToWishlist.value
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Heart), {
              class: [
                "mr-2 h-5 w-5",
                isInWishlist.value ? "fill-red-500 text-red-500" : ""
              ]
            }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(isInWishlist.value ? "Di Wishlist" : "Tambah Wishlist")}`);
          } else {
            return [
              createVNode(unref(Heart), {
                class: [
                  "mr-2 h-5 w-5",
                  isInWishlist.value ? "fill-red-500 text-red-500" : ""
                ]
              }, null, 8, ["class"]),
              createTextVNode(" " + toDisplayString(isInWishlist.value ? "Di Wishlist" : "Tambah Wishlist"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$8), {
        variant: "outline",
        size: "lg",
        onClick: shareProduct
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Share2), { class: "h-5 w-5" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Share2), { class: "h-5 w-5" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$c, {
        open: checkoutSheetOpen.value,
        "onUpdate:open": ($event) => checkoutSheetOpen.value = $event,
        item: {
          id: __props.productId,
          product_id: __props.productId,
          name: __props.productName,
          price: __props.productPrice,
          quantity: quantity.value,
          weight: __props.productWeight,
          image: __props.productImage
        }
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ecommerce/product/ProductActions.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ProductDescription",
  __ssrInlineRender: true,
  props: {
    shortDescription: {},
    longDescription: {},
    weightGram: {},
    dimensions: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      if (__props.shortDescription) {
        _push(`<div><h3 class="text-lg font-semibold mb-3">Deskripsi Singkat</h3><p class="text-muted-foreground leading-relaxed">${ssrInterpolate(__props.shortDescription)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(unref(_sfc_main$a), null, null, _parent));
      if (__props.longDescription) {
        _push(`<div><h3 class="text-lg font-semibold mb-3">Deskripsi Lengkap</h3><div class="prose prose-sm max-w-none">${__props.longDescription ?? ""}</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(unref(_sfc_main$a), null, null, _parent));
      _push(`<div><h3 class="text-lg font-semibold mb-4">Spesifikasi Produk</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4">`);
      if (__props.weightGram) {
        _push(ssrRenderComponent(unref(_sfc_main$7), null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$d), { class: "pb-3" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$e), { class: "text-sm flex items-center gap-2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Package), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                          _push4(` Berat `);
                        } else {
                          return [
                            createVNode(unref(Package), { class: "h-4 w-4" }),
                            createTextVNode(" Berat ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$e), { class: "text-sm flex items-center gap-2" }, {
                        default: withCtx(() => [
                          createVNode(unref(Package), { class: "h-4 w-4" }),
                          createTextVNode(" Berat ")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$f), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<p class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(__props.weightGram)} gr</p>`);
                  } else {
                    return [
                      createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(__props.weightGram) + " gr", 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$d), { class: "pb-3" }, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$e), { class: "text-sm flex items-center gap-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(Package), { class: "h-4 w-4" }),
                        createTextVNode(" Berat ")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(unref(_sfc_main$f), null, {
                  default: withCtx(() => [
                    createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(__props.weightGram) + " gr", 1)
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (__props.dimensions) {
        _push(ssrRenderComponent(unref(_sfc_main$7), null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$d), { class: "pb-3" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$e), { class: "text-sm flex items-center gap-2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Ruler), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                          _push4(` Dimensi `);
                        } else {
                          return [
                            createVNode(unref(Ruler), { class: "h-4 w-4" }),
                            createTextVNode(" Dimensi ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$e), { class: "text-sm flex items-center gap-2" }, {
                        default: withCtx(() => [
                          createVNode(unref(Ruler), { class: "h-4 w-4" }),
                          createTextVNode(" Dimensi ")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$f), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<p class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(__props.dimensions.length)} x ${ssrInterpolate(__props.dimensions.width)} x ${ssrInterpolate(__props.dimensions.height)} mm </p>`);
                  } else {
                    return [
                      createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(__props.dimensions.length) + " x " + toDisplayString(__props.dimensions.width) + " x " + toDisplayString(__props.dimensions.height) + " mm ", 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$d), { class: "pb-3" }, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$e), { class: "text-sm flex items-center gap-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(Ruler), { class: "h-4 w-4" }),
                        createTextVNode(" Dimensi ")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(unref(_sfc_main$f), null, {
                  default: withCtx(() => [
                    createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(__props.dimensions.length) + " x " + toDisplayString(__props.dimensions.width) + " x " + toDisplayString(__props.dimensions.height) + " mm ", 1)
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ecommerce/product/ProductDescription.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ProductReviews",
  __ssrInlineRender: true,
  props: {
    reviews: {},
    averageRating: {},
    totalReviews: {}
  },
  setup(__props) {
    const getInitials = (name) => {
      return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center justify-between"><h3 class="text-2xl font-bold">Ulasan Pelanggan</h3><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(unref(Star), { class: "h-6 w-6 fill-yellow-400 text-yellow-400" }, null, _parent));
      _push(`<span class="text-2xl font-bold">${ssrInterpolate(__props.averageRating)}</span><span class="text-muted-foreground">/ 5.0</span></div></div><p class="text-sm text-muted-foreground"> Berdasarkan ${ssrInterpolate(__props.totalReviews)} ulasan pelanggan </p>`);
      if (__props.reviews.length > 0) {
        _push(`<div class="space-y-4"><!--[-->`);
        ssrRenderList(__props.reviews, (review) => {
          _push(ssrRenderComponent(unref(_sfc_main$7), {
            key: review.id
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(_sfc_main$f), { class: "p-6" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="flex items-start gap-4"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$g), null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(_sfc_main$h), null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(getInitials(review.customer_name))}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(getInitials(review.customer_name)), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(unref(_sfc_main$h), null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(getInitials(review.customer_name)), 1)
                                ]),
                                _: 2
                              }, 1024)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`<div class="flex-1 space-y-2"${_scopeId2}><div class="flex items-center justify-between"${_scopeId2}><h4 class="font-semibold"${_scopeId2}>${ssrInterpolate(review.customer_name)}</h4><span class="text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(review.created_at)}</span></div><div class="flex items-center gap-1"${_scopeId2}><!--[-->`);
                      ssrRenderList(5, (i) => {
                        _push3(ssrRenderComponent(unref(Star), {
                          key: i,
                          class: ["h-4 w-4", i <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"]
                        }, null, _parent3, _scopeId2));
                      });
                      _push3(`<!--]--></div><p class="text-sm text-muted-foreground leading-relaxed"${_scopeId2}>${ssrInterpolate(review.comment)}</p></div></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "flex items-start gap-4" }, [
                          createVNode(unref(_sfc_main$g), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$h), null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(getInitials(review.customer_name)), 1)
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode("div", { class: "flex-1 space-y-2" }, [
                            createVNode("div", { class: "flex items-center justify-between" }, [
                              createVNode("h4", { class: "font-semibold" }, toDisplayString(review.customer_name), 1),
                              createVNode("span", { class: "text-xs text-muted-foreground" }, toDisplayString(review.created_at), 1)
                            ]),
                            createVNode("div", { class: "flex items-center gap-1" }, [
                              (openBlock(), createBlock(Fragment, null, renderList(5, (i) => {
                                return createVNode(unref(Star), {
                                  key: i,
                                  class: ["h-4 w-4", i <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"]
                                }, null, 8, ["class"]);
                              }), 64))
                            ]),
                            createVNode("p", { class: "text-sm text-muted-foreground leading-relaxed" }, toDisplayString(review.comment), 1)
                          ])
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(_sfc_main$f), { class: "p-6" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex items-start gap-4" }, [
                        createVNode(unref(_sfc_main$g), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$h), null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(getInitials(review.customer_name)), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode("div", { class: "flex-1 space-y-2" }, [
                          createVNode("div", { class: "flex items-center justify-between" }, [
                            createVNode("h4", { class: "font-semibold" }, toDisplayString(review.customer_name), 1),
                            createVNode("span", { class: "text-xs text-muted-foreground" }, toDisplayString(review.created_at), 1)
                          ]),
                          createVNode("div", { class: "flex items-center gap-1" }, [
                            (openBlock(), createBlock(Fragment, null, renderList(5, (i) => {
                              return createVNode(unref(Star), {
                                key: i,
                                class: ["h-4 w-4", i <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"]
                              }, null, 8, ["class"]);
                            }), 64))
                          ]),
                          createVNode("p", { class: "text-sm text-muted-foreground leading-relaxed" }, toDisplayString(review.comment), 1)
                        ])
                      ])
                    ]),
                    _: 2
                  }, 1024)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="text-center py-12 text-muted-foreground"><p>Belum ada ulasan untuk produk ini</p></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ecommerce/product/ProductReviews.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "RelatedProducts",
  __ssrInlineRender: true,
  props: {
    products: {},
    title: { default: "Produk Terkait" }
  },
  setup(__props) {
    const scrollContainer = ref(null);
    const scroll = (direction) => {
      if (scrollContainer.value) {
        const scrollAmount = 300;
        scrollContainer.value.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth"
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "py-12 bg-muted/30" }, _attrs))} data-v-e404f6d4><div class="container mx-auto px-4" data-v-e404f6d4><div class="flex items-center justify-between mb-6" data-v-e404f6d4><h2 class="text-2xl md:text-3xl font-bold" data-v-e404f6d4>${ssrInterpolate(__props.title)}</h2><div class="hidden md:flex gap-2" data-v-e404f6d4>`);
      _push(ssrRenderComponent(unref(_sfc_main$8), {
        variant: "outline",
        size: "icon",
        onClick: ($event) => scroll("left")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ChevronLeft), { class: "h-5 w-5" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(ChevronLeft), { class: "h-5 w-5" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$8), {
        variant: "outline",
        size: "icon",
        onClick: ($event) => scroll("right")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ChevronRight), { class: "h-5 w-5" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(ChevronRight), { class: "h-5 w-5" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide" style="${ssrRenderStyle({ "scroll-snap-type": "x mandatory" })}" data-v-e404f6d4><!--[-->`);
      ssrRenderList(__props.products, (product) => {
        _push(`<div class="flex-shrink-0 w-64 snap-start" data-v-e404f6d4>`);
        _push(ssrRenderComponent(_sfc_main$i, { product }, null, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ecommerce/product/RelatedProducts.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const RelatedProducts = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-e404f6d4"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Produk",
  __ssrInlineRender: true,
  props: {
    product: {},
    relatedProducts: {}
  },
  setup(__props) {
    const props = __props;
    const metaTitle = `${props.product.name} - ${props.product.brand || "Puranusa"}`;
    const metaDescription = props.product.short_description || `Beli ${props.product.name} dengan harga terbaik. ${props.product.stock > 0 ? "Stok tersedia" : "Segera hadir kembali"}.`;
    const metaImage = props.product.main_image;
    const canonicalUrl = `/produk/${props.product.slug}`;
    const productJsonLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: props.product.name,
      description: props.product.short_description,
      image: props.product.images,
      brand: {
        "@type": "Brand",
        name: props.product.brand || "Puranusa"
      },
      sku: props.product.sku,
      offers: {
        "@type": "Offer",
        price: props.product.price,
        priceCurrency: "IDR",
        availability: props.product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        url: canonicalUrl
      },
      aggregateRating: props.product.review_count > 0 ? {
        "@type": "AggregateRating",
        ratingValue: props.product.rating,
        reviewCount: props.product.review_count
      } : void 0
    };
    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Beranda",
          item: "/beranda"
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Toko",
          item: "/toko"
        },
        {
          "@type": "ListItem",
          position: 3,
          name: props.product.name,
          item: canonicalUrl
        }
      ]
    };
    onMounted(() => {
      if (typeof document === "undefined") return;
      const productScript = document.createElement("script");
      productScript.type = "application/ld+json";
      productScript.textContent = JSON.stringify(productJsonLd);
      document.head.appendChild(productScript);
      const breadcrumbScript = document.createElement("script");
      breadcrumbScript.type = "application/ld+json";
      breadcrumbScript.textContent = JSON.stringify(breadcrumbJsonLd);
      document.head.appendChild(breadcrumbScript);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$j, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<title${_scopeId2}>${ssrInterpolate(metaTitle)}</title><meta name="description"${ssrRenderAttr("content", unref(metaDescription))}${_scopeId2}><meta property="og:type" content="product"${_scopeId2}><meta property="og:title"${ssrRenderAttr("content", metaTitle)}${_scopeId2}><meta property="og:description"${ssrRenderAttr("content", unref(metaDescription))}${_scopeId2}><meta property="og:image"${ssrRenderAttr("content", unref(metaImage))}${_scopeId2}><meta property="og:url"${ssrRenderAttr("content", canonicalUrl)}${_scopeId2}><meta name="twitter:card" content="summary_large_image"${_scopeId2}><meta name="twitter:title"${ssrRenderAttr("content", metaTitle)}${_scopeId2}><meta name="twitter:description"${ssrRenderAttr("content", unref(metaDescription))}${_scopeId2}><meta name="twitter:image"${ssrRenderAttr("content", unref(metaImage))}${_scopeId2}><meta property="product:price:amount"${ssrRenderAttr("content", __props.product.price.toString())}${_scopeId2}><meta property="product:price:currency" content="IDR"${_scopeId2}><meta property="product:availability"${ssrRenderAttr("content", __props.product.stock > 0 ? "in stock" : "out of stock")}${_scopeId2}><link rel="canonical"${ssrRenderAttr("href", canonicalUrl)}${_scopeId2}>`);
                } else {
                  return [
                    createVNode("title", null, toDisplayString(metaTitle)),
                    createVNode("meta", {
                      name: "description",
                      content: unref(metaDescription)
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      property: "og:type",
                      content: "product"
                    }),
                    createVNode("meta", {
                      property: "og:title",
                      content: metaTitle
                    }),
                    createVNode("meta", {
                      property: "og:description",
                      content: unref(metaDescription)
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      property: "og:image",
                      content: unref(metaImage)
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      property: "og:url",
                      content: canonicalUrl
                    }),
                    createVNode("meta", {
                      name: "twitter:card",
                      content: "summary_large_image"
                    }),
                    createVNode("meta", {
                      name: "twitter:title",
                      content: metaTitle
                    }),
                    createVNode("meta", {
                      name: "twitter:description",
                      content: unref(metaDescription)
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      name: "twitter:image",
                      content: unref(metaImage)
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      property: "product:price:amount",
                      content: __props.product.price.toString()
                    }, null, 8, ["content"]),
                    createVNode("meta", {
                      property: "product:price:currency",
                      content: "IDR"
                    }),
                    createVNode("meta", {
                      property: "product:availability",
                      content: __props.product.stock > 0 ? "in stock" : "out of stock"
                    }, null, 8, ["content"]),
                    createVNode("link", {
                      rel: "canonical",
                      href: canonicalUrl
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="container mx-auto px-4 py-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$k), { class: "mb-6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$l), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$m), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$n), { href: "/beranda" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Beranda`);
                                  } else {
                                    return [
                                      createTextVNode("Beranda")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$n), { href: "/beranda" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Beranda")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$o), null, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$m), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$n), { href: "/toko" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Toko`);
                                  } else {
                                    return [
                                      createTextVNode("Toko")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$n), { href: "/toko" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Toko")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$o), null, null, _parent4, _scopeId3));
                        if (__props.product.categories.length > 0) {
                          _push4(ssrRenderComponent(unref(_sfc_main$m), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(_sfc_main$n), {
                                  href: `/toko?category=${__props.product.categories[0].slug}`
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(__props.product.categories[0].name)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(__props.product.categories[0].name), 1)
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(_sfc_main$n), {
                                    href: `/toko?category=${__props.product.categories[0].slug}`
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(__props.product.categories[0].name), 1)
                                    ]),
                                    _: 1
                                  }, 8, ["href"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        if (__props.product.categories.length > 0) {
                          _push4(ssrRenderComponent(unref(_sfc_main$o), null, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(ssrRenderComponent(unref(_sfc_main$m), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$p), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`${ssrInterpolate(__props.product.name)}`);
                                  } else {
                                    return [
                                      createTextVNode(toDisplayString(__props.product.name), 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$p), null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(__props.product.name), 1)
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
                          createVNode(unref(_sfc_main$m), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$n), { href: "/beranda" }, {
                                default: withCtx(() => [
                                  createTextVNode("Beranda")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$o)),
                          createVNode(unref(_sfc_main$m), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$n), { href: "/toko" }, {
                                default: withCtx(() => [
                                  createTextVNode("Toko")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$o)),
                          __props.product.categories.length > 0 ? (openBlock(), createBlock(unref(_sfc_main$m), { key: 0 }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$n), {
                                href: `/toko?category=${__props.product.categories[0].slug}`
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(__props.product.categories[0].name), 1)
                                ]),
                                _: 1
                              }, 8, ["href"])
                            ]),
                            _: 1
                          })) : createCommentVNode("", true),
                          __props.product.categories.length > 0 ? (openBlock(), createBlock(unref(_sfc_main$o), { key: 1 })) : createCommentVNode("", true),
                          createVNode(unref(_sfc_main$m), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$p), null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(__props.product.name), 1)
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
                    createVNode(unref(_sfc_main$l), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$m), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$n), { href: "/beranda" }, {
                              default: withCtx(() => [
                                createTextVNode("Beranda")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$o)),
                        createVNode(unref(_sfc_main$m), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$n), { href: "/toko" }, {
                              default: withCtx(() => [
                                createTextVNode("Toko")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$o)),
                        __props.product.categories.length > 0 ? (openBlock(), createBlock(unref(_sfc_main$m), { key: 0 }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$n), {
                              href: `/toko?category=${__props.product.categories[0].slug}`
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(__props.product.categories[0].name), 1)
                              ]),
                              _: 1
                            }, 8, ["href"])
                          ]),
                          _: 1
                        })) : createCommentVNode("", true),
                        __props.product.categories.length > 0 ? (openBlock(), createBlock(unref(_sfc_main$o), { key: 1 })) : createCommentVNode("", true),
                        createVNode(unref(_sfc_main$m), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$p), null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(__props.product.name), 1)
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
            _push2(`<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              images: __props.product.images,
              "product-name": __props.product.name
            }, null, _parent2, _scopeId));
            _push2(`<div class="space-y-6"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$5, {
              name: __props.product.name,
              brand: __props.product.brand,
              sku: __props.product.sku,
              rating: __props.product.rating,
              "review-count": __props.product.review_count,
              price: __props.product.price,
              "original-price": __props.product.original_price,
              "discount-percentage": __props.product.discount_percentage,
              stock: __props.product.stock,
              categories: __props.product.categories,
              "warranty-months": __props.product.warranty_months,
              "is-new": __props.product.is_new
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$a), null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              "product-id": __props.product.id,
              "product-name": __props.product.name,
              "product-price": __props.product.price,
              "product-image": __props.product.main_image,
              "product-weight": __props.product.weight_gram || 1e3,
              stock: __props.product.stock
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="mb-12"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$q), {
              "default-value": "description",
              class: "w-full"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$r), { class: "grid w-full grid-cols-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$s), { value: "description" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Deskripsi &amp; Spesifikasi`);
                            } else {
                              return [
                                createTextVNode("Deskripsi & Spesifikasi")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$s), { value: "reviews" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Ulasan (${ssrInterpolate(__props.product.review_count)}) `);
                            } else {
                              return [
                                createTextVNode(" Ulasan (" + toDisplayString(__props.product.review_count) + ") ", 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$s), { value: "description" }, {
                            default: withCtx(() => [
                              createTextVNode("Deskripsi & Spesifikasi")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$s), { value: "reviews" }, {
                            default: withCtx(() => [
                              createTextVNode(" Ulasan (" + toDisplayString(__props.product.review_count) + ") ", 1)
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$t), {
                    value: "description",
                    class: "mt-6"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$3, {
                          "short-description": __props.product.short_description,
                          "long-description": __props.product.long_description,
                          "weight-gram": __props.product.weight_gram,
                          dimensions: __props.product.dimensions
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$3, {
                            "short-description": __props.product.short_description,
                            "long-description": __props.product.long_description,
                            "weight-gram": __props.product.weight_gram,
                            dimensions: __props.product.dimensions
                          }, null, 8, ["short-description", "long-description", "weight-gram", "dimensions"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$t), {
                    value: "reviews",
                    class: "mt-6"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$2, {
                          reviews: __props.product.reviews,
                          "average-rating": __props.product.rating,
                          "total-reviews": __props.product.review_count
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$2, {
                            reviews: __props.product.reviews,
                            "average-rating": __props.product.rating,
                            "total-reviews": __props.product.review_count
                          }, null, 8, ["reviews", "average-rating", "total-reviews"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$r), { class: "grid w-full grid-cols-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$s), { value: "description" }, {
                          default: withCtx(() => [
                            createTextVNode("Deskripsi & Spesifikasi")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$s), { value: "reviews" }, {
                          default: withCtx(() => [
                            createTextVNode(" Ulasan (" + toDisplayString(__props.product.review_count) + ") ", 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$t), {
                      value: "description",
                      class: "mt-6"
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$3, {
                          "short-description": __props.product.short_description,
                          "long-description": __props.product.long_description,
                          "weight-gram": __props.product.weight_gram,
                          dimensions: __props.product.dimensions
                        }, null, 8, ["short-description", "long-description", "weight-gram", "dimensions"])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$t), {
                      value: "reviews",
                      class: "mt-6"
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$2, {
                          reviews: __props.product.reviews,
                          "average-rating": __props.product.rating,
                          "total-reviews": __props.product.review_count
                        }, null, 8, ["reviews", "average-rating", "total-reviews"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
            if (__props.relatedProducts.length > 0) {
              _push2(ssrRenderComponent(RelatedProducts, { products: __props.relatedProducts }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(unref(Head), null, {
                default: withCtx(() => [
                  createVNode("title", null, toDisplayString(metaTitle)),
                  createVNode("meta", {
                    name: "description",
                    content: unref(metaDescription)
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    property: "og:type",
                    content: "product"
                  }),
                  createVNode("meta", {
                    property: "og:title",
                    content: metaTitle
                  }),
                  createVNode("meta", {
                    property: "og:description",
                    content: unref(metaDescription)
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    property: "og:image",
                    content: unref(metaImage)
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    property: "og:url",
                    content: canonicalUrl
                  }),
                  createVNode("meta", {
                    name: "twitter:card",
                    content: "summary_large_image"
                  }),
                  createVNode("meta", {
                    name: "twitter:title",
                    content: metaTitle
                  }),
                  createVNode("meta", {
                    name: "twitter:description",
                    content: unref(metaDescription)
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    name: "twitter:image",
                    content: unref(metaImage)
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    property: "product:price:amount",
                    content: __props.product.price.toString()
                  }, null, 8, ["content"]),
                  createVNode("meta", {
                    property: "product:price:currency",
                    content: "IDR"
                  }),
                  createVNode("meta", {
                    property: "product:availability",
                    content: __props.product.stock > 0 ? "in stock" : "out of stock"
                  }, null, 8, ["content"]),
                  createVNode("link", {
                    rel: "canonical",
                    href: canonicalUrl
                  })
                ]),
                _: 2
              }, 1024),
              createVNode("div", { class: "container mx-auto px-4 py-6" }, [
                createVNode(unref(_sfc_main$k), { class: "mb-6" }, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$l), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$m), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$n), { href: "/beranda" }, {
                              default: withCtx(() => [
                                createTextVNode("Beranda")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$o)),
                        createVNode(unref(_sfc_main$m), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$n), { href: "/toko" }, {
                              default: withCtx(() => [
                                createTextVNode("Toko")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$o)),
                        __props.product.categories.length > 0 ? (openBlock(), createBlock(unref(_sfc_main$m), { key: 0 }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$n), {
                              href: `/toko?category=${__props.product.categories[0].slug}`
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(__props.product.categories[0].name), 1)
                              ]),
                              _: 1
                            }, 8, ["href"])
                          ]),
                          _: 1
                        })) : createCommentVNode("", true),
                        __props.product.categories.length > 0 ? (openBlock(), createBlock(unref(_sfc_main$o), { key: 1 })) : createCommentVNode("", true),
                        createVNode(unref(_sfc_main$m), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$p), null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(__props.product.name), 1)
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
                createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12" }, [
                  createVNode(_sfc_main$6, {
                    images: __props.product.images,
                    "product-name": __props.product.name
                  }, null, 8, ["images", "product-name"]),
                  createVNode("div", { class: "space-y-6" }, [
                    createVNode(_sfc_main$5, {
                      name: __props.product.name,
                      brand: __props.product.brand,
                      sku: __props.product.sku,
                      rating: __props.product.rating,
                      "review-count": __props.product.review_count,
                      price: __props.product.price,
                      "original-price": __props.product.original_price,
                      "discount-percentage": __props.product.discount_percentage,
                      stock: __props.product.stock,
                      categories: __props.product.categories,
                      "warranty-months": __props.product.warranty_months,
                      "is-new": __props.product.is_new
                    }, null, 8, ["name", "brand", "sku", "rating", "review-count", "price", "original-price", "discount-percentage", "stock", "categories", "warranty-months", "is-new"]),
                    createVNode(unref(_sfc_main$a)),
                    createVNode(_sfc_main$4, {
                      "product-id": __props.product.id,
                      "product-name": __props.product.name,
                      "product-price": __props.product.price,
                      "product-image": __props.product.main_image,
                      "product-weight": __props.product.weight_gram || 1e3,
                      stock: __props.product.stock
                    }, null, 8, ["product-id", "product-name", "product-price", "product-image", "product-weight", "stock"])
                  ])
                ]),
                createVNode("div", { class: "mb-12" }, [
                  createVNode(unref(_sfc_main$q), {
                    "default-value": "description",
                    class: "w-full"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$r), { class: "grid w-full grid-cols-2" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$s), { value: "description" }, {
                            default: withCtx(() => [
                              createTextVNode("Deskripsi & Spesifikasi")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$s), { value: "reviews" }, {
                            default: withCtx(() => [
                              createTextVNode(" Ulasan (" + toDisplayString(__props.product.review_count) + ") ", 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$t), {
                        value: "description",
                        class: "mt-6"
                      }, {
                        default: withCtx(() => [
                          createVNode(_sfc_main$3, {
                            "short-description": __props.product.short_description,
                            "long-description": __props.product.long_description,
                            "weight-gram": __props.product.weight_gram,
                            dimensions: __props.product.dimensions
                          }, null, 8, ["short-description", "long-description", "weight-gram", "dimensions"])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$t), {
                        value: "reviews",
                        class: "mt-6"
                      }, {
                        default: withCtx(() => [
                          createVNode(_sfc_main$2, {
                            reviews: __props.product.reviews,
                            "average-rating": __props.product.rating,
                            "total-reviews": __props.product.review_count
                          }, null, 8, ["reviews", "average-rating", "total-reviews"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ])
              ]),
              __props.relatedProducts.length > 0 ? (openBlock(), createBlock(RelatedProducts, {
                key: 0,
                products: __props.relatedProducts
              }, null, 8, ["products"])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/ecommerce/Produk.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
