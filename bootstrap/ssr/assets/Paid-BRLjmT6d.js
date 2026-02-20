import { defineComponent, mergeProps, unref, useSSRContext, ref, computed, watch, withCtx, createTextVNode, toDisplayString, createVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, h } from "vue";
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$v } from "./index-BpQimeTM.js";
import { c as cn, _ as _sfc_main$7, v as valueUpdater } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$a, a as _sfc_main$b, b as _sfc_main$c, c as _sfc_main$d } from "./CardTitle-sqUG0LTw.js";
import { e as _sfc_main$8, _ as _sfc_main$k, a as _sfc_main$l, b as _sfc_main$m, d as _sfc_main$n } from "./DropdownMenuTrigger-B1v6pHML.js";
import { _ as _sfc_main$e } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$u } from "./Pagination-DAUeA01Y.js";
import { _ as _sfc_main$3, a as _sfc_main$4, c as _sfc_main$5, d as _sfc_main$6 } from "./DialogTrigger-DpE8BjOt.js";
import { Printer, Download, Package, DollarSign, Search, ChevronDown, ArrowUpDown, FileText, Eye } from "lucide-vue-next";
import axios from "axios";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { _ as _sfc_main$f, a as _sfc_main$g, b as _sfc_main$h, c as _sfc_main$i, d as _sfc_main$j } from "./SelectValue-BUnv4mQg.js";
import { _ as _sfc_main$o, a as _sfc_main$p, b as _sfc_main$q, c as _sfc_main$r, d as _sfc_main$s, e as _sfc_main$t } from "./TableHeader-emcE6QAC.js";
import { _ as _sfc_main$9 } from "./AppLayout-D11fLPDM.js";
import { router, Head, Link } from "@inertiajs/vue3";
import { useVueTable, getFilteredRowModel, getSortedRowModel, getCoreRowModel, FlexRender } from "@tanstack/vue-table";
import { u as usePermissions } from "./usePermissions-DYRibCI0.js";
import "class-variance-authority";
import "@vueuse/core";
import "reka-ui";
import "clsx";
import "tailwind-merge";
import "./index-3UqiGNe9.js";
import "./AvatarImage-DWFQMckn.js";
import "./index-Bfu0FVt6.js";
import "vue-sonner";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "VisuallyHidden",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(mergeProps({
        class: unref(cn)("sr-only", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</span>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/visually-hidden/VisuallyHidden.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const companyLogoUrl = "/storage/logos/jKNIuJViG3uBVnl5x7kWFPahJGXBhx8yLeri4qb0.png";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "InvoiceDialog",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean },
    orderId: {}
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const order = ref(null);
    const loading = ref(false);
    const PICKUP_OFFICE_ADDRESS_LINES = [
      "18 Office Park Building, 21TH Floor Unit C",
      "Jl. TB Simatupang No.18, Jakarta Selatan",
      "DKI Jakarta"
    ];
    const isMeaningfulAddressValue = (value) => {
      if (!value) return false;
      const trimmedValue = value.trim();
      return trimmedValue !== "" && trimmedValue !== "-";
    };
    const buildAddressLines = (address) => {
      if (!address) return [];
      const line1 = (address.address_line1 ?? address.address ?? "").trim();
      const line2 = address.address_line2?.trim() ?? "";
      const isPickupAddress = line1.toUpperCase().includes("PICKUP") || line2.toUpperCase().includes("PICKUP");
      if (isPickupAddress) {
        return PICKUP_OFFICE_ADDRESS_LINES;
      }
      const lines = [];
      if (isMeaningfulAddressValue(line1)) {
        lines.push(line1);
      }
      if (isMeaningfulAddressValue(line2)) {
        lines.push(line2);
      }
      const cityProvince = [address.city_label ?? address.city, address.province_label ?? address.province].filter((value) => isMeaningfulAddressValue(value)).join(", ");
      const rawPostalCode = address.postal_code?.trim() ?? "";
      const postalCode = isMeaningfulAddressValue(rawPostalCode) ? rawPostalCode : "";
      const cityProvincePostal = [cityProvince, postalCode].filter((value) => value.length > 0).join(" ");
      if (cityProvincePostal) {
        lines.push(cityProvincePostal);
      }
      const country = address.country?.trim() ?? "";
      if (isMeaningfulAddressValue(country)) {
        lines.push(country);
      }
      return lines;
    };
    const billTo = computed(() => {
      if (!order.value) return null;
      const selectedAddress = order.value.billing_address ?? order.value.billingAddress ?? order.value.shipping_address ?? order.value.shippingAddress;
      const phone = selectedAddress?.recipient_phone?.trim() || selectedAddress?.phone?.trim() || order.value.customer.phone?.trim() || null;
      return {
        name: selectedAddress?.recipient_name?.trim() || selectedAddress?.full_name?.trim() || order.value.customer.name,
        email: order.value.customer.email,
        phone,
        addressLines: buildAddressLines(selectedAddress)
      };
    });
    const toSafeNumber = (value) => {
      if (typeof value === "number") {
        return Number.isFinite(value) ? value : 0;
      }
      if (typeof value === "string") {
        const normalized = value.replace(/[^0-9.-]/g, "");
        const parsed = Number(normalized);
        return Number.isFinite(parsed) ? parsed : 0;
      }
      return 0;
    };
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(toSafeNumber(amount));
    };
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    const formatDateTime = (date) => {
      return new Date(date).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const fetchOrderData = async () => {
      if (!props.orderId) return;
      loading.value = true;
      try {
        const response = await axios.get(`/admin/orders/${props.orderId}/invoice`);
        order.value = response.data.data;
      } catch (error) {
        console.error("Failed to fetch order data:", error);
      } finally {
        loading.value = false;
      }
    };
    const handlePrint = () => {
      window.print();
    };
    const handleDownloadPDF = () => {
      window.print();
    };
    watch(() => props.open, (newVal) => {
      if (newVal && props.orderId) {
        fetchOrderData();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$3), mergeProps({
        open: __props.open,
        "onUpdate:open": (val) => emit("update:open", val)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "max-w-7xl max-h-[90vh] overflow-y-auto print:max-w-full print:max-h-full print:overflow-visible" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$2), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Invoice ${ssrInterpolate(order.value?.order_no || "")}`);
                            } else {
                              return [
                                createTextVNode("Invoice " + toDisplayString(order.value?.order_no || ""), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Detail invoice untuk order ${ssrInterpolate(order.value?.order_no || "")}. Anda dapat mencetak atau mengunduh invoice ini. `);
                            } else {
                              return [
                                createTextVNode(" Detail invoice untuk order " + toDisplayString(order.value?.order_no || "") + ". Anda dapat mencetak atau mengunduh invoice ini. ", 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Invoice " + toDisplayString(order.value?.order_no || ""), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode(" Detail invoice untuk order " + toDisplayString(order.value?.order_no || "") + ". Anda dapat mencetak atau mengunduh invoice ini. ", 1)
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (loading.value) {
                    _push3(`<div class="flex items-center justify-center py-12" data-v-c96ce62d${_scopeId2}><div class="text-center" data-v-c96ce62d${_scopeId2}><div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" data-v-c96ce62d${_scopeId2}></div><p class="mt-4 text-muted-foreground" data-v-c96ce62d${_scopeId2}>Memuat invoice...</p></div></div>`);
                  } else if (order.value) {
                    _push3(`<div class="invoice-content" data-v-c96ce62d${_scopeId2}><div class="flex justify-end gap-2 mb-6 print:hidden" data-v-c96ce62d${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$7), {
                      variant: "outline",
                      size: "sm",
                      onClick: handlePrint
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Printer), { class: "h-4 w-4 mr-2" }, null, _parent4, _scopeId3));
                          _push4(` Print `);
                        } else {
                          return [
                            createVNode(unref(Printer), { class: "h-4 w-4 mr-2" }),
                            createTextVNode(" Print ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$7), {
                      variant: "outline",
                      size: "sm",
                      onClick: handleDownloadPDF
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Download), { class: "h-4 w-4 mr-2" }, null, _parent4, _scopeId3));
                          _push4(` Download PDF `);
                        } else {
                          return [
                            createVNode(unref(Download), { class: "h-4 w-4 mr-2" }),
                            createTextVNode(" Download PDF ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div><div class="mb-8" data-v-c96ce62d${_scopeId2}><div class="flex items-start justify-between" data-v-c96ce62d${_scopeId2}><div data-v-c96ce62d${_scopeId2}><div class="flex items-center gap-3 mb-2" data-v-c96ce62d${_scopeId2}><img${ssrRenderAttr("src", companyLogoUrl)} alt="Puranusa Logo" class="w-16 h-16 object-contain" data-v-c96ce62d${_scopeId2}><div data-v-c96ce62d${_scopeId2}><h1 class="text-2xl font-bold" data-v-c96ce62d${_scopeId2}>PURANUSA</h1><p class="text-sm text-muted-foreground" data-v-c96ce62d${_scopeId2}>Natural Health &amp; Wellness</p></div></div><div class="text-sm text-muted-foreground mt-3" data-v-c96ce62d${_scopeId2}><p data-v-c96ce62d${_scopeId2}>18 Office Park Building, 21TH Floor Unit C</p><p data-v-c96ce62d${_scopeId2}>Jl. TB Simatupang No.18, Jakarta Selatan, DKI Jakarta</p></div></div><div class="text-right" data-v-c96ce62d${_scopeId2}><h2 class="text-3xl font-bold mb-2" data-v-c96ce62d${_scopeId2}>INVOICE</h2><div class="space-y-1" data-v-c96ce62d${_scopeId2}><p class="text-sm" data-v-c96ce62d${_scopeId2}><span class="font-semibold" data-v-c96ce62d${_scopeId2}>Invoice No:</span><span class="ml-2 font-mono" data-v-c96ce62d${_scopeId2}>${ssrInterpolate(order.value.order_no)}</span></p><p class="text-sm" data-v-c96ce62d${_scopeId2}><span class="font-semibold" data-v-c96ce62d${_scopeId2}>Tanggal:</span><span class="ml-2" data-v-c96ce62d${_scopeId2}>${ssrInterpolate(formatDate(order.value.created_at))}</span></p><p class="text-sm" data-v-c96ce62d${_scopeId2}><span class="font-semibold" data-v-c96ce62d${_scopeId2}>Status:</span><span class="${ssrRenderClass([{
                      "bg-green-100 text-green-800": order.value.payment_status === "PAID",
                      "bg-yellow-100 text-yellow-800": order.value.payment_status === "PENDING"
                    }, "ml-2 px-2 py-1 rounded text-xs font-medium"])}" data-v-c96ce62d${_scopeId2}>${ssrInterpolate(order.value.payment_status)}</span></p></div></div></div></div>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$8), { class: "my-6" }, null, _parent3, _scopeId2));
                    _push3(`<div class="mb-8" data-v-c96ce62d${_scopeId2}><div data-v-c96ce62d${_scopeId2}><h3 class="font-semibold text-sm mb-3 text-muted-foreground" data-v-c96ce62d${_scopeId2}>BILL TO:</h3><div class="space-y-1" data-v-c96ce62d${_scopeId2}><p class="font-semibold" data-v-c96ce62d${_scopeId2}>${ssrInterpolate(billTo.value?.name)}</p><p class="text-sm text-muted-foreground" data-v-c96ce62d${_scopeId2}>${ssrInterpolate(billTo.value?.email)}</p>`);
                    if (billTo.value?.phone) {
                      _push3(`<p class="text-sm text-muted-foreground" data-v-c96ce62d${_scopeId2}>${ssrInterpolate(billTo.value.phone)}</p>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    if (billTo.value?.addressLines.length) {
                      _push3(`<div class="text-sm text-muted-foreground mt-2" data-v-c96ce62d${_scopeId2}><!--[-->`);
                      ssrRenderList(billTo.value.addressLines, (line, index) => {
                        _push3(`<p data-v-c96ce62d${_scopeId2}>${ssrInterpolate(line)}</p>`);
                      });
                      _push3(`<!--]--></div>`);
                    } else {
                      _push3(`<p class="text-sm text-muted-foreground mt-2" data-v-c96ce62d${_scopeId2}>Alamat tidak tersedia</p>`);
                    }
                    _push3(`</div></div></div><div class="mb-8" data-v-c96ce62d${_scopeId2}><table class="w-full" data-v-c96ce62d${_scopeId2}><thead data-v-c96ce62d${_scopeId2}><tr class="border-b-2 border-border" data-v-c96ce62d${_scopeId2}><th class="text-left py-3 px-2 text-sm font-semibold" data-v-c96ce62d${_scopeId2}>No</th><th class="text-left py-3 px-2 text-sm font-semibold" data-v-c96ce62d${_scopeId2}>Produk</th><th class="text-center py-3 px-2 text-sm font-semibold" data-v-c96ce62d${_scopeId2}>Qty</th><th class="text-right py-3 px-2 text-sm font-semibold" data-v-c96ce62d${_scopeId2}>Harga</th><th class="text-right py-3 px-2 text-sm font-semibold" data-v-c96ce62d${_scopeId2}>Subtotal</th></tr></thead><tbody data-v-c96ce62d${_scopeId2}><!--[-->`);
                    ssrRenderList(order.value.items, (item, index) => {
                      _push3(`<tr class="border-b border-border" data-v-c96ce62d${_scopeId2}><td class="py-3 px-2 text-sm" data-v-c96ce62d${_scopeId2}>${ssrInterpolate(index + 1)}</td><td class="py-3 px-2" data-v-c96ce62d${_scopeId2}><div data-v-c96ce62d${_scopeId2}><p class="font-medium" data-v-c96ce62d${_scopeId2}>${ssrInterpolate(item.product.name)}</p><p class="text-xs text-muted-foreground" data-v-c96ce62d${_scopeId2}>SKU: ${ssrInterpolate(item.product.sku)}</p></div></td><td class="py-3 px-2 text-center" data-v-c96ce62d${_scopeId2}>${ssrInterpolate(item.qty)}</td><td class="py-3 px-2 text-right" data-v-c96ce62d${_scopeId2}>${ssrInterpolate(formatCurrency(item.unit_price ?? item.price))}</td><td class="py-3 px-2 text-right font-medium" data-v-c96ce62d${_scopeId2}>${ssrInterpolate(formatCurrency(item.row_total ?? item.total))}</td></tr>`);
                    });
                    _push3(`<!--]--></tbody></table></div><div class="flex justify-end mb-8" data-v-c96ce62d${_scopeId2}><div class="w-80 space-y-3" data-v-c96ce62d${_scopeId2}><div class="flex justify-between text-sm" data-v-c96ce62d${_scopeId2}><span class="text-muted-foreground" data-v-c96ce62d${_scopeId2}>Subtotal:</span><span class="font-medium" data-v-c96ce62d${_scopeId2}>${ssrInterpolate(formatCurrency(order.value.subtotal_amount))}</span></div>`);
                    if (order.value.discount_amount > 0) {
                      _push3(`<div class="flex justify-between text-sm" data-v-c96ce62d${_scopeId2}><span class="text-muted-foreground" data-v-c96ce62d${_scopeId2}>Diskon:</span><span class="font-medium text-red-600" data-v-c96ce62d${_scopeId2}>-${ssrInterpolate(formatCurrency(order.value.discount_amount))}</span></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<div class="flex justify-between text-sm" data-v-c96ce62d${_scopeId2}><span class="text-muted-foreground" data-v-c96ce62d${_scopeId2}>Ongkir:</span><span class="font-medium" data-v-c96ce62d${_scopeId2}>${ssrInterpolate(formatCurrency(order.value.shipping_amount))}</span></div>`);
                    if (order.value.tax_amount > 0) {
                      _push3(`<div class="flex justify-between text-sm" data-v-c96ce62d${_scopeId2}><span class="text-muted-foreground" data-v-c96ce62d${_scopeId2}>Pajak:</span><span class="font-medium" data-v-c96ce62d${_scopeId2}>${ssrInterpolate(formatCurrency(order.value.tax_amount))}</span></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(ssrRenderComponent(unref(_sfc_main$8), null, null, _parent3, _scopeId2));
                    _push3(`<div class="flex justify-between text-lg font-bold" data-v-c96ce62d${_scopeId2}><span data-v-c96ce62d${_scopeId2}>Total:</span><span class="text-primary" data-v-c96ce62d${_scopeId2}>${ssrInterpolate(formatCurrency(order.value.grand_total))}</span></div></div></div>`);
                    if (order.value.payments && order.value.payments.length > 0) {
                      _push3(`<div class="mb-8" data-v-c96ce62d${_scopeId2}><h3 class="font-semibold text-sm mb-3" data-v-c96ce62d${_scopeId2}>INFORMASI PEMBAYARAN:</h3><div class="bg-muted/50 rounded-lg p-4" data-v-c96ce62d${_scopeId2}><!--[-->`);
                      ssrRenderList(order.value.payments, (payment, index) => {
                        _push3(`<div class="${ssrRenderClass([{ "mt-4 pt-4 border-t": index > 0 }, "text-sm"])}" data-v-c96ce62d${_scopeId2}><div class="flex justify-between mb-1" data-v-c96ce62d${_scopeId2}><span data-v-c96ce62d${_scopeId2}>Metode Pembayaran:</span><span class="font-medium" data-v-c96ce62d${_scopeId2}>${ssrInterpolate(payment.method?.name || "N/A")}</span></div><div class="flex justify-between mb-1" data-v-c96ce62d${_scopeId2}><span data-v-c96ce62d${_scopeId2}>Kode:</span><span class="font-medium uppercase text-xs" data-v-c96ce62d${_scopeId2}>${ssrInterpolate(payment.method?.code || "N/A")}</span></div><div class="flex justify-between mb-1" data-v-c96ce62d${_scopeId2}><span data-v-c96ce62d${_scopeId2}>Jumlah:</span><span class="font-medium" data-v-c96ce62d${_scopeId2}>${ssrInterpolate(formatCurrency(payment.amount))}</span></div><div class="flex justify-between mb-1" data-v-c96ce62d${_scopeId2}><span data-v-c96ce62d${_scopeId2}>Tanggal:</span><span class="font-medium" data-v-c96ce62d${_scopeId2}>${ssrInterpolate(formatDateTime(payment.created_at))}</span></div><div class="flex justify-between" data-v-c96ce62d${_scopeId2}><span data-v-c96ce62d${_scopeId2}>Status:</span><span class="${ssrRenderClass([{
                          "bg-green-100 text-green-700": payment.status === "success",
                          "bg-yellow-100 text-yellow-700": payment.status === "pending",
                          "bg-red-100 text-red-700": payment.status === "failed"
                        }, "font-medium uppercase text-xs px-2 py-0.5 rounded"])}" data-v-c96ce62d${_scopeId2}>${ssrInterpolate(payment.status)}</span></div></div>`);
                      });
                      _push3(`<!--]--></div></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<div class="border-t pt-6 mt-8" data-v-c96ce62d${_scopeId2}><p class="text-xs text-muted-foreground mb-2" data-v-c96ce62d${_scopeId2}>Catatan:</p><ul class="text-xs text-muted-foreground space-y-1" data-v-c96ce62d${_scopeId2}><li data-v-c96ce62d${_scopeId2}>• Invoice ini sah dan diproses oleh komputer</li><li data-v-c96ce62d${_scopeId2}>• Harap simpan invoice ini sebagai bukti pembelian yang sah</li><li data-v-c96ce62d${_scopeId2}>• Untuk pertanyaan lebih lanjut, hubungi customer service kami</li></ul></div><div class="text-center mt-8 pt-6 border-t" data-v-c96ce62d${_scopeId2}><p class="text-xs text-muted-foreground" data-v-c96ce62d${_scopeId2}> Terima kasih atas kepercayaan Anda berbelanja di Puranusa </p><p class="text-xs text-muted-foreground mt-1" data-v-c96ce62d${_scopeId2}> www.puranusa.id | CS: cs@puranusa.id | WA: +62 812-3456-7890 </p></div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(unref(_sfc_main$2), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Invoice " + toDisplayString(order.value?.order_no || ""), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode(" Detail invoice untuk order " + toDisplayString(order.value?.order_no || "") + ". Anda dapat mencetak atau mengunduh invoice ini. ", 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    loading.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex items-center justify-center py-12"
                    }, [
                      createVNode("div", { class: "text-center" }, [
                        createVNode("div", { class: "inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" }),
                        createVNode("p", { class: "mt-4 text-muted-foreground" }, "Memuat invoice...")
                      ])
                    ])) : order.value ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "invoice-content"
                    }, [
                      createVNode("div", { class: "flex justify-end gap-2 mb-6 print:hidden" }, [
                        createVNode(unref(_sfc_main$7), {
                          variant: "outline",
                          size: "sm",
                          onClick: handlePrint
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Printer), { class: "h-4 w-4 mr-2" }),
                            createTextVNode(" Print ")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$7), {
                          variant: "outline",
                          size: "sm",
                          onClick: handleDownloadPDF
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Download), { class: "h-4 w-4 mr-2" }),
                            createTextVNode(" Download PDF ")
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("div", { class: "mb-8" }, [
                        createVNode("div", { class: "flex items-start justify-between" }, [
                          createVNode("div", null, [
                            createVNode("div", { class: "flex items-center gap-3 mb-2" }, [
                              createVNode("img", {
                                src: companyLogoUrl,
                                alt: "Puranusa Logo",
                                class: "w-16 h-16 object-contain"
                              }),
                              createVNode("div", null, [
                                createVNode("h1", { class: "text-2xl font-bold" }, "PURANUSA"),
                                createVNode("p", { class: "text-sm text-muted-foreground" }, "Natural Health & Wellness")
                              ])
                            ]),
                            createVNode("div", { class: "text-sm text-muted-foreground mt-3" }, [
                              createVNode("p", null, "18 Office Park Building, 21TH Floor Unit C"),
                              createVNode("p", null, "Jl. TB Simatupang No.18, Jakarta Selatan, DKI Jakarta")
                            ])
                          ]),
                          createVNode("div", { class: "text-right" }, [
                            createVNode("h2", { class: "text-3xl font-bold mb-2" }, "INVOICE"),
                            createVNode("div", { class: "space-y-1" }, [
                              createVNode("p", { class: "text-sm" }, [
                                createVNode("span", { class: "font-semibold" }, "Invoice No:"),
                                createVNode("span", { class: "ml-2 font-mono" }, toDisplayString(order.value.order_no), 1)
                              ]),
                              createVNode("p", { class: "text-sm" }, [
                                createVNode("span", { class: "font-semibold" }, "Tanggal:"),
                                createVNode("span", { class: "ml-2" }, toDisplayString(formatDate(order.value.created_at)), 1)
                              ]),
                              createVNode("p", { class: "text-sm" }, [
                                createVNode("span", { class: "font-semibold" }, "Status:"),
                                createVNode("span", {
                                  class: ["ml-2 px-2 py-1 rounded text-xs font-medium", {
                                    "bg-green-100 text-green-800": order.value.payment_status === "PAID",
                                    "bg-yellow-100 text-yellow-800": order.value.payment_status === "PENDING"
                                  }]
                                }, toDisplayString(order.value.payment_status), 3)
                              ])
                            ])
                          ])
                        ])
                      ]),
                      createVNode(unref(_sfc_main$8), { class: "my-6" }),
                      createVNode("div", { class: "mb-8" }, [
                        createVNode("div", null, [
                          createVNode("h3", { class: "font-semibold text-sm mb-3 text-muted-foreground" }, "BILL TO:"),
                          createVNode("div", { class: "space-y-1" }, [
                            createVNode("p", { class: "font-semibold" }, toDisplayString(billTo.value?.name), 1),
                            createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(billTo.value?.email), 1),
                            billTo.value?.phone ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-muted-foreground"
                            }, toDisplayString(billTo.value.phone), 1)) : createCommentVNode("", true),
                            billTo.value?.addressLines.length ? (openBlock(), createBlock("div", {
                              key: 1,
                              class: "text-sm text-muted-foreground mt-2"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(billTo.value.addressLines, (line, index) => {
                                return openBlock(), createBlock("p", {
                                  key: `${line}-${index}`
                                }, toDisplayString(line), 1);
                              }), 128))
                            ])) : (openBlock(), createBlock("p", {
                              key: 2,
                              class: "text-sm text-muted-foreground mt-2"
                            }, "Alamat tidak tersedia"))
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "mb-8" }, [
                        createVNode("table", { class: "w-full" }, [
                          createVNode("thead", null, [
                            createVNode("tr", { class: "border-b-2 border-border" }, [
                              createVNode("th", { class: "text-left py-3 px-2 text-sm font-semibold" }, "No"),
                              createVNode("th", { class: "text-left py-3 px-2 text-sm font-semibold" }, "Produk"),
                              createVNode("th", { class: "text-center py-3 px-2 text-sm font-semibold" }, "Qty"),
                              createVNode("th", { class: "text-right py-3 px-2 text-sm font-semibold" }, "Harga"),
                              createVNode("th", { class: "text-right py-3 px-2 text-sm font-semibold" }, "Subtotal")
                            ])
                          ]),
                          createVNode("tbody", null, [
                            (openBlock(true), createBlock(Fragment, null, renderList(order.value.items, (item, index) => {
                              return openBlock(), createBlock("tr", {
                                key: item.id,
                                class: "border-b border-border"
                              }, [
                                createVNode("td", { class: "py-3 px-2 text-sm" }, toDisplayString(index + 1), 1),
                                createVNode("td", { class: "py-3 px-2" }, [
                                  createVNode("div", null, [
                                    createVNode("p", { class: "font-medium" }, toDisplayString(item.product.name), 1),
                                    createVNode("p", { class: "text-xs text-muted-foreground" }, "SKU: " + toDisplayString(item.product.sku), 1)
                                  ])
                                ]),
                                createVNode("td", { class: "py-3 px-2 text-center" }, toDisplayString(item.qty), 1),
                                createVNode("td", { class: "py-3 px-2 text-right" }, toDisplayString(formatCurrency(item.unit_price ?? item.price)), 1),
                                createVNode("td", { class: "py-3 px-2 text-right font-medium" }, toDisplayString(formatCurrency(item.row_total ?? item.total)), 1)
                              ]);
                            }), 128))
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "flex justify-end mb-8" }, [
                        createVNode("div", { class: "w-80 space-y-3" }, [
                          createVNode("div", { class: "flex justify-between text-sm" }, [
                            createVNode("span", { class: "text-muted-foreground" }, "Subtotal:"),
                            createVNode("span", { class: "font-medium" }, toDisplayString(formatCurrency(order.value.subtotal_amount)), 1)
                          ]),
                          order.value.discount_amount > 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex justify-between text-sm"
                          }, [
                            createVNode("span", { class: "text-muted-foreground" }, "Diskon:"),
                            createVNode("span", { class: "font-medium text-red-600" }, "-" + toDisplayString(formatCurrency(order.value.discount_amount)), 1)
                          ])) : createCommentVNode("", true),
                          createVNode("div", { class: "flex justify-between text-sm" }, [
                            createVNode("span", { class: "text-muted-foreground" }, "Ongkir:"),
                            createVNode("span", { class: "font-medium" }, toDisplayString(formatCurrency(order.value.shipping_amount)), 1)
                          ]),
                          order.value.tax_amount > 0 ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "flex justify-between text-sm"
                          }, [
                            createVNode("span", { class: "text-muted-foreground" }, "Pajak:"),
                            createVNode("span", { class: "font-medium" }, toDisplayString(formatCurrency(order.value.tax_amount)), 1)
                          ])) : createCommentVNode("", true),
                          createVNode(unref(_sfc_main$8)),
                          createVNode("div", { class: "flex justify-between text-lg font-bold" }, [
                            createVNode("span", null, "Total:"),
                            createVNode("span", { class: "text-primary" }, toDisplayString(formatCurrency(order.value.grand_total)), 1)
                          ])
                        ])
                      ]),
                      order.value.payments && order.value.payments.length > 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mb-8"
                      }, [
                        createVNode("h3", { class: "font-semibold text-sm mb-3" }, "INFORMASI PEMBAYARAN:"),
                        createVNode("div", { class: "bg-muted/50 rounded-lg p-4" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(order.value.payments, (payment, index) => {
                            return openBlock(), createBlock("div", {
                              key: index,
                              class: ["text-sm", { "mt-4 pt-4 border-t": index > 0 }]
                            }, [
                              createVNode("div", { class: "flex justify-between mb-1" }, [
                                createVNode("span", null, "Metode Pembayaran:"),
                                createVNode("span", { class: "font-medium" }, toDisplayString(payment.method?.name || "N/A"), 1)
                              ]),
                              createVNode("div", { class: "flex justify-between mb-1" }, [
                                createVNode("span", null, "Kode:"),
                                createVNode("span", { class: "font-medium uppercase text-xs" }, toDisplayString(payment.method?.code || "N/A"), 1)
                              ]),
                              createVNode("div", { class: "flex justify-between mb-1" }, [
                                createVNode("span", null, "Jumlah:"),
                                createVNode("span", { class: "font-medium" }, toDisplayString(formatCurrency(payment.amount)), 1)
                              ]),
                              createVNode("div", { class: "flex justify-between mb-1" }, [
                                createVNode("span", null, "Tanggal:"),
                                createVNode("span", { class: "font-medium" }, toDisplayString(formatDateTime(payment.created_at)), 1)
                              ]),
                              createVNode("div", { class: "flex justify-between" }, [
                                createVNode("span", null, "Status:"),
                                createVNode("span", {
                                  class: ["font-medium uppercase text-xs px-2 py-0.5 rounded", {
                                    "bg-green-100 text-green-700": payment.status === "success",
                                    "bg-yellow-100 text-yellow-700": payment.status === "pending",
                                    "bg-red-100 text-red-700": payment.status === "failed"
                                  }]
                                }, toDisplayString(payment.status), 3)
                              ])
                            ], 2);
                          }), 128))
                        ])
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "border-t pt-6 mt-8" }, [
                        createVNode("p", { class: "text-xs text-muted-foreground mb-2" }, "Catatan:"),
                        createVNode("ul", { class: "text-xs text-muted-foreground space-y-1" }, [
                          createVNode("li", null, "• Invoice ini sah dan diproses oleh komputer"),
                          createVNode("li", null, "• Harap simpan invoice ini sebagai bukti pembelian yang sah"),
                          createVNode("li", null, "• Untuk pertanyaan lebih lanjut, hubungi customer service kami")
                        ])
                      ]),
                      createVNode("div", { class: "text-center mt-8 pt-6 border-t" }, [
                        createVNode("p", { class: "text-xs text-muted-foreground" }, " Terima kasih atas kepercayaan Anda berbelanja di Puranusa "),
                        createVNode("p", { class: "text-xs text-muted-foreground mt-1" }, " www.puranusa.id | CS: cs@puranusa.id | WA: +62 812-3456-7890 ")
                      ])
                    ])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$4), { class: "max-w-7xl max-h-[90vh] overflow-y-auto print:max-w-full print:max-h-full print:overflow-visible" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$2), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Invoice " + toDisplayString(order.value?.order_no || ""), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), null, {
                        default: withCtx(() => [
                          createTextVNode(" Detail invoice untuk order " + toDisplayString(order.value?.order_no || "") + ". Anda dapat mencetak atau mengunduh invoice ini. ", 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  loading.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex items-center justify-center py-12"
                  }, [
                    createVNode("div", { class: "text-center" }, [
                      createVNode("div", { class: "inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" }),
                      createVNode("p", { class: "mt-4 text-muted-foreground" }, "Memuat invoice...")
                    ])
                  ])) : order.value ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "invoice-content"
                  }, [
                    createVNode("div", { class: "flex justify-end gap-2 mb-6 print:hidden" }, [
                      createVNode(unref(_sfc_main$7), {
                        variant: "outline",
                        size: "sm",
                        onClick: handlePrint
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Printer), { class: "h-4 w-4 mr-2" }),
                          createTextVNode(" Print ")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), {
                        variant: "outline",
                        size: "sm",
                        onClick: handleDownloadPDF
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Download), { class: "h-4 w-4 mr-2" }),
                          createTextVNode(" Download PDF ")
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { class: "mb-8" }, [
                      createVNode("div", { class: "flex items-start justify-between" }, [
                        createVNode("div", null, [
                          createVNode("div", { class: "flex items-center gap-3 mb-2" }, [
                            createVNode("img", {
                              src: companyLogoUrl,
                              alt: "Puranusa Logo",
                              class: "w-16 h-16 object-contain"
                            }),
                            createVNode("div", null, [
                              createVNode("h1", { class: "text-2xl font-bold" }, "PURANUSA"),
                              createVNode("p", { class: "text-sm text-muted-foreground" }, "Natural Health & Wellness")
                            ])
                          ]),
                          createVNode("div", { class: "text-sm text-muted-foreground mt-3" }, [
                            createVNode("p", null, "18 Office Park Building, 21TH Floor Unit C"),
                            createVNode("p", null, "Jl. TB Simatupang No.18, Jakarta Selatan, DKI Jakarta")
                          ])
                        ]),
                        createVNode("div", { class: "text-right" }, [
                          createVNode("h2", { class: "text-3xl font-bold mb-2" }, "INVOICE"),
                          createVNode("div", { class: "space-y-1" }, [
                            createVNode("p", { class: "text-sm" }, [
                              createVNode("span", { class: "font-semibold" }, "Invoice No:"),
                              createVNode("span", { class: "ml-2 font-mono" }, toDisplayString(order.value.order_no), 1)
                            ]),
                            createVNode("p", { class: "text-sm" }, [
                              createVNode("span", { class: "font-semibold" }, "Tanggal:"),
                              createVNode("span", { class: "ml-2" }, toDisplayString(formatDate(order.value.created_at)), 1)
                            ]),
                            createVNode("p", { class: "text-sm" }, [
                              createVNode("span", { class: "font-semibold" }, "Status:"),
                              createVNode("span", {
                                class: ["ml-2 px-2 py-1 rounded text-xs font-medium", {
                                  "bg-green-100 text-green-800": order.value.payment_status === "PAID",
                                  "bg-yellow-100 text-yellow-800": order.value.payment_status === "PENDING"
                                }]
                              }, toDisplayString(order.value.payment_status), 3)
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode(unref(_sfc_main$8), { class: "my-6" }),
                    createVNode("div", { class: "mb-8" }, [
                      createVNode("div", null, [
                        createVNode("h3", { class: "font-semibold text-sm mb-3 text-muted-foreground" }, "BILL TO:"),
                        createVNode("div", { class: "space-y-1" }, [
                          createVNode("p", { class: "font-semibold" }, toDisplayString(billTo.value?.name), 1),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(billTo.value?.email), 1),
                          billTo.value?.phone ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-muted-foreground"
                          }, toDisplayString(billTo.value.phone), 1)) : createCommentVNode("", true),
                          billTo.value?.addressLines.length ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "text-sm text-muted-foreground mt-2"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(billTo.value.addressLines, (line, index) => {
                              return openBlock(), createBlock("p", {
                                key: `${line}-${index}`
                              }, toDisplayString(line), 1);
                            }), 128))
                          ])) : (openBlock(), createBlock("p", {
                            key: 2,
                            class: "text-sm text-muted-foreground mt-2"
                          }, "Alamat tidak tersedia"))
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "mb-8" }, [
                      createVNode("table", { class: "w-full" }, [
                        createVNode("thead", null, [
                          createVNode("tr", { class: "border-b-2 border-border" }, [
                            createVNode("th", { class: "text-left py-3 px-2 text-sm font-semibold" }, "No"),
                            createVNode("th", { class: "text-left py-3 px-2 text-sm font-semibold" }, "Produk"),
                            createVNode("th", { class: "text-center py-3 px-2 text-sm font-semibold" }, "Qty"),
                            createVNode("th", { class: "text-right py-3 px-2 text-sm font-semibold" }, "Harga"),
                            createVNode("th", { class: "text-right py-3 px-2 text-sm font-semibold" }, "Subtotal")
                          ])
                        ]),
                        createVNode("tbody", null, [
                          (openBlock(true), createBlock(Fragment, null, renderList(order.value.items, (item, index) => {
                            return openBlock(), createBlock("tr", {
                              key: item.id,
                              class: "border-b border-border"
                            }, [
                              createVNode("td", { class: "py-3 px-2 text-sm" }, toDisplayString(index + 1), 1),
                              createVNode("td", { class: "py-3 px-2" }, [
                                createVNode("div", null, [
                                  createVNode("p", { class: "font-medium" }, toDisplayString(item.product.name), 1),
                                  createVNode("p", { class: "text-xs text-muted-foreground" }, "SKU: " + toDisplayString(item.product.sku), 1)
                                ])
                              ]),
                              createVNode("td", { class: "py-3 px-2 text-center" }, toDisplayString(item.qty), 1),
                              createVNode("td", { class: "py-3 px-2 text-right" }, toDisplayString(formatCurrency(item.unit_price ?? item.price)), 1),
                              createVNode("td", { class: "py-3 px-2 text-right font-medium" }, toDisplayString(formatCurrency(item.row_total ?? item.total)), 1)
                            ]);
                          }), 128))
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "flex justify-end mb-8" }, [
                      createVNode("div", { class: "w-80 space-y-3" }, [
                        createVNode("div", { class: "flex justify-between text-sm" }, [
                          createVNode("span", { class: "text-muted-foreground" }, "Subtotal:"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(formatCurrency(order.value.subtotal_amount)), 1)
                        ]),
                        order.value.discount_amount > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex justify-between text-sm"
                        }, [
                          createVNode("span", { class: "text-muted-foreground" }, "Diskon:"),
                          createVNode("span", { class: "font-medium text-red-600" }, "-" + toDisplayString(formatCurrency(order.value.discount_amount)), 1)
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "flex justify-between text-sm" }, [
                          createVNode("span", { class: "text-muted-foreground" }, "Ongkir:"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(formatCurrency(order.value.shipping_amount)), 1)
                        ]),
                        order.value.tax_amount > 0 ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "flex justify-between text-sm"
                        }, [
                          createVNode("span", { class: "text-muted-foreground" }, "Pajak:"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(formatCurrency(order.value.tax_amount)), 1)
                        ])) : createCommentVNode("", true),
                        createVNode(unref(_sfc_main$8)),
                        createVNode("div", { class: "flex justify-between text-lg font-bold" }, [
                          createVNode("span", null, "Total:"),
                          createVNode("span", { class: "text-primary" }, toDisplayString(formatCurrency(order.value.grand_total)), 1)
                        ])
                      ])
                    ]),
                    order.value.payments && order.value.payments.length > 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "mb-8"
                    }, [
                      createVNode("h3", { class: "font-semibold text-sm mb-3" }, "INFORMASI PEMBAYARAN:"),
                      createVNode("div", { class: "bg-muted/50 rounded-lg p-4" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(order.value.payments, (payment, index) => {
                          return openBlock(), createBlock("div", {
                            key: index,
                            class: ["text-sm", { "mt-4 pt-4 border-t": index > 0 }]
                          }, [
                            createVNode("div", { class: "flex justify-between mb-1" }, [
                              createVNode("span", null, "Metode Pembayaran:"),
                              createVNode("span", { class: "font-medium" }, toDisplayString(payment.method?.name || "N/A"), 1)
                            ]),
                            createVNode("div", { class: "flex justify-between mb-1" }, [
                              createVNode("span", null, "Kode:"),
                              createVNode("span", { class: "font-medium uppercase text-xs" }, toDisplayString(payment.method?.code || "N/A"), 1)
                            ]),
                            createVNode("div", { class: "flex justify-between mb-1" }, [
                              createVNode("span", null, "Jumlah:"),
                              createVNode("span", { class: "font-medium" }, toDisplayString(formatCurrency(payment.amount)), 1)
                            ]),
                            createVNode("div", { class: "flex justify-between mb-1" }, [
                              createVNode("span", null, "Tanggal:"),
                              createVNode("span", { class: "font-medium" }, toDisplayString(formatDateTime(payment.created_at)), 1)
                            ]),
                            createVNode("div", { class: "flex justify-between" }, [
                              createVNode("span", null, "Status:"),
                              createVNode("span", {
                                class: ["font-medium uppercase text-xs px-2 py-0.5 rounded", {
                                  "bg-green-100 text-green-700": payment.status === "success",
                                  "bg-yellow-100 text-yellow-700": payment.status === "pending",
                                  "bg-red-100 text-red-700": payment.status === "failed"
                                }]
                              }, toDisplayString(payment.status), 3)
                            ])
                          ], 2);
                        }), 128))
                      ])
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "border-t pt-6 mt-8" }, [
                      createVNode("p", { class: "text-xs text-muted-foreground mb-2" }, "Catatan:"),
                      createVNode("ul", { class: "text-xs text-muted-foreground space-y-1" }, [
                        createVNode("li", null, "• Invoice ini sah dan diproses oleh komputer"),
                        createVNode("li", null, "• Harap simpan invoice ini sebagai bukti pembelian yang sah"),
                        createVNode("li", null, "• Untuk pertanyaan lebih lanjut, hubungi customer service kami")
                      ])
                    ]),
                    createVNode("div", { class: "text-center mt-8 pt-6 border-t" }, [
                      createVNode("p", { class: "text-xs text-muted-foreground" }, " Terima kasih atas kepercayaan Anda berbelanja di Puranusa "),
                      createVNode("p", { class: "text-xs text-muted-foreground mt-1" }, " www.puranusa.id | CS: cs@puranusa.id | WA: +62 812-3456-7890 ")
                    ])
                  ])) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/orders/InvoiceDialog.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const InvoiceDialog = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-c96ce62d"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Paid",
  __ssrInlineRender: true,
  props: {
    orders: {},
    statistics: {},
    paymentMethods: {},
    filters: {}
  },
  setup(__props) {
    const { isSuperAdmin, isAdmin } = usePermissions();
    const props = __props;
    const breadcrumbItems = [
      {
        title: "Pesanan Dibayar",
        href: "/admin/orders/paid"
      }
    ];
    const search = ref(props.filters.search || "");
    const statusFilter = ref(props.filters.status || "all");
    const paymentMethodFilter = ref(props.filters.payment_method || "all");
    const sorting = ref([
      {
        id: props.filters.sort_by,
        desc: props.filters.sort_order === "desc"
      }
    ]);
    const columnFilters = ref([]);
    const columnVisibility = ref({});
    const invoiceDialog = ref({
      open: false,
      orderId: null
    });
    const openInvoiceDialog = (orderId) => {
      invoiceDialog.value = { open: true, orderId };
    };
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(amount);
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
    const getStatusVariant = (status) => {
      const normalizedStatus = status.toUpperCase();
      const variants = {
        PENDING: "secondary",
        PROCESSING: "outline",
        SHIPPED: "default",
        DELIVERED: "default",
        CANCELLED: "destructive",
        CANCELED: "destructive",
        // Support US spelling
        COMPLETED: "default",
        PAID: "default"
      };
      return variants[normalizedStatus] || "secondary";
    };
    const columns = [
      {
        id: "index",
        header: () => h("div", { class: "w-12" }, "No"),
        cell: ({ row }) => {
          const index = row.index + 1 + (props.orders.current_page - 1) * props.orders.per_page;
          return h("div", { class: "font-medium" }, index);
        }
      },
      {
        accessorKey: "order_no",
        header: ({ column }) => {
          return h(
            _sfc_main$7,
            {
              variant: "ghost",
              onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
              class: "-ml-4"
            },
            () => ["Order Number", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
          );
        },
        cell: ({ row }) => {
          return h("div", [
            h("div", { class: "font-medium font-mono" }, row.original.order_no),
            h(
              "div",
              { class: "text-xs text-muted-foreground" },
              row.original.customer.name
            )
          ]);
        }
      },
      {
        accessorKey: "grand_total",
        header: () => h("div", { class: "text-right" }, "Total"),
        cell: ({ row }) => {
          return h(
            "div",
            { class: "text-right font-medium" },
            formatCurrency(row.getValue("grand_total"))
          );
        }
      },
      {
        accessorKey: "payment_status",
        header: () => "Payment",
        cell: ({ row }) => {
          const status = row.getValue("payment_status");
          return h(
            _sfc_main$v,
            { variant: status === "PAID" ? "default" : "secondary" },
            () => status
          );
        }
      },
      {
        id: "payment_method",
        header: () => "Metode",
        cell: ({ row }) => {
          const order = row.original;
          const paymentMethod = order.payments?.[0]?.method?.name;
          return h(
            "div",
            { class: "text-sm" },
            { default: () => paymentMethod || "-" }
          );
        }
      },
      {
        accessorKey: "status",
        header: () => "Status",
        cell: ({ row }) => {
          const status = row.getValue("status");
          return h(
            _sfc_main$v,
            { variant: getStatusVariant(status) },
            () => status
          );
        }
      },
      {
        accessorKey: "created_at",
        header: ({ column }) => {
          return h(
            _sfc_main$7,
            {
              variant: "ghost",
              onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
              class: "-ml-4"
            },
            () => ["Tanggal", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
          );
        },
        cell: ({ row }) => {
          return formatDate(row.getValue("created_at"));
        }
      },
      {
        id: "actions",
        header: () => h("div", { class: "text-right" }, "Actions"),
        cell: ({ row }) => {
          const order = row.original;
          const actions = [];
          actions.push(
            h(
              _sfc_main$7,
              {
                variant: "outline",
                size: "sm",
                onClick: () => openInvoiceDialog(order.id)
              },
              () => h(FileText, { class: "h-4 w-4" })
            )
          );
          if (isSuperAdmin || isAdmin) {
            actions.push(
              h(
                Link,
                { href: `/admin/orders/${order.id}` },
                () => h(
                  _sfc_main$7,
                  { variant: "outline", size: "sm" },
                  () => h(Eye, { class: "h-4 w-4" })
                )
              )
            );
          }
          return h("div", { class: "flex justify-end gap-2" }, actions);
        }
      }
    ];
    const table = useVueTable({
      get data() {
        return props.orders.data;
      },
      columns,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
      onColumnFiltersChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnFilters),
      onColumnVisibilityChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnVisibility),
      state: {
        get sorting() {
          return sorting.value;
        },
        get columnFilters() {
          return columnFilters.value;
        },
        get columnVisibility() {
          return columnVisibility.value;
        }
      },
      manualSorting: true
    });
    watch(
      sorting,
      (newSorting) => {
        if (newSorting.length > 0) {
          router.get(
            "/admin/orders",
            {
              search: search.value || void 0,
              status: statusFilter.value !== "all" ? statusFilter.value : void 0,
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
    watch([search, statusFilter, paymentMethodFilter], () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        router.get(
          "/admin/orders/paid",
          {
            search: search.value || void 0,
            status: statusFilter.value !== "all" ? statusFilter.value : void 0,
            payment_method: paymentMethodFilter.value !== "all" ? paymentMethodFilter.value : void 0,
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
      _push(ssrRenderComponent(_sfc_main$9, mergeProps({ breadcrumbs: breadcrumbItems }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Pesanan Dibayar" }, null, _parent2, _scopeId));
            _push2(`<div class="rounded-xl p-4 space-y-6 py-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="text-3xl font-bold tracking-tight"${_scopeId}>Pesanan Dibayar</h1><p class="text-muted-foreground"${_scopeId}>Kelola pesanan yang sudah dibayar</p></div></div><div class="grid gap-4 md:grid-cols-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$a), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$b), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$c), { class: "text-sm font-medium" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Total Dibayar`);
                            } else {
                              return [
                                createTextVNode("Total Dibayar")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(Package), { class: "h-4 w-4 text-muted-foreground" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$c), { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Total Dibayar")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(Package), { class: "h-4 w-4 text-muted-foreground" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$d), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-2xl font-bold"${_scopeId3}>${ssrInterpolate(__props.statistics.total_paid)}</div><p class="text-xs text-muted-foreground"${_scopeId3}>Pesanan sudah dibayar</p>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics.total_paid), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Pesanan sudah dibayar")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$b), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$c), { class: "text-sm font-medium" }, {
                          default: withCtx(() => [
                            createTextVNode("Total Dibayar")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(Package), { class: "h-4 w-4 text-muted-foreground" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$d), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics.total_paid), 1),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, "Pesanan sudah dibayar")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$a), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$b), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$c), { class: "text-sm font-medium" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Total Amount`);
                            } else {
                              return [
                                createTextVNode("Total Amount")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(DollarSign), { class: "h-4 w-4 text-muted-foreground" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$c), { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Total Amount")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(DollarSign), { class: "h-4 w-4 text-muted-foreground" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$d), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-2xl font-bold"${_scopeId3}>${ssrInterpolate(formatCurrency(__props.statistics.total_amount))}</div><p class="text-xs text-muted-foreground"${_scopeId3}>Total nilai terbayar</p>`);
                      } else {
                        return [
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatCurrency(__props.statistics.total_amount)), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Total nilai terbayar")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$b), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$c), { class: "text-sm font-medium" }, {
                          default: withCtx(() => [
                            createTextVNode("Total Amount")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(DollarSign), { class: "h-4 w-4 text-muted-foreground" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$d), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatCurrency(__props.statistics.total_amount)), 1),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, "Total nilai terbayar")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"${_scopeId}><div class="flex flex-1 gap-4"${_scopeId}><div class="relative flex-1 max-w-sm"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$e), {
              modelValue: search.value,
              "onUpdate:modelValue": ($event) => search.value = $event,
              placeholder: "Cari nomor order atau nama pelanggan...",
              class: "pl-9"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$f), {
              modelValue: statusFilter.value,
              "onUpdate:modelValue": ($event) => statusFilter.value = $event
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$g), { class: "w-[180px]" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$h), { placeholder: "Semua Status" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$h), { placeholder: "Semua Status" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$i), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$j), { value: "all" }, {
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
                        _push4(ssrRenderComponent(unref(_sfc_main$j), { value: "pending" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Pending`);
                            } else {
                              return [
                                createTextVNode("Pending")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$j), { value: "processing" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Processing`);
                            } else {
                              return [
                                createTextVNode("Processing")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$j), { value: "shipped" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Shipped`);
                            } else {
                              return [
                                createTextVNode("Shipped")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$j), { value: "delivered" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Delivered`);
                            } else {
                              return [
                                createTextVNode("Delivered")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$j), { value: "completed" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Completed`);
                            } else {
                              return [
                                createTextVNode("Completed")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$j), { value: "cancelled" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Cancelled`);
                            } else {
                              return [
                                createTextVNode("Cancelled")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$j), { value: "all" }, {
                            default: withCtx(() => [
                              createTextVNode("Semua Status")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$j), { value: "pending" }, {
                            default: withCtx(() => [
                              createTextVNode("Pending")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$j), { value: "processing" }, {
                            default: withCtx(() => [
                              createTextVNode("Processing")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$j), { value: "shipped" }, {
                            default: withCtx(() => [
                              createTextVNode("Shipped")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$j), { value: "delivered" }, {
                            default: withCtx(() => [
                              createTextVNode("Delivered")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$j), { value: "completed" }, {
                            default: withCtx(() => [
                              createTextVNode("Completed")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$j), { value: "cancelled" }, {
                            default: withCtx(() => [
                              createTextVNode("Cancelled")
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
                    createVNode(unref(_sfc_main$g), { class: "w-[180px]" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$h), { placeholder: "Semua Status" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$i), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$j), { value: "all" }, {
                          default: withCtx(() => [
                            createTextVNode("Semua Status")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$j), { value: "pending" }, {
                          default: withCtx(() => [
                            createTextVNode("Pending")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$j), { value: "processing" }, {
                          default: withCtx(() => [
                            createTextVNode("Processing")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$j), { value: "shipped" }, {
                          default: withCtx(() => [
                            createTextVNode("Shipped")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$j), { value: "delivered" }, {
                          default: withCtx(() => [
                            createTextVNode("Delivered")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$j), { value: "completed" }, {
                          default: withCtx(() => [
                            createTextVNode("Completed")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$j), { value: "cancelled" }, {
                          default: withCtx(() => [
                            createTextVNode("Cancelled")
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
            _push2(ssrRenderComponent(unref(_sfc_main$f), {
              modelValue: paymentMethodFilter.value,
              "onUpdate:modelValue": ($event) => paymentMethodFilter.value = $event
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$g), { class: "w-[200px]" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$h), { placeholder: "Metode Pembayaran" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$h), { placeholder: "Metode Pembayaran" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$i), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$j), { value: "all" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Semua Metode`);
                            } else {
                              return [
                                createTextVNode("Semua Metode")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<!--[-->`);
                        ssrRenderList(__props.paymentMethods, (method) => {
                          _push4(ssrRenderComponent(unref(_sfc_main$j), {
                            key: method.id,
                            value: method.id.toString()
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(method.name)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(method.name), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          createVNode(unref(_sfc_main$j), { value: "all" }, {
                            default: withCtx(() => [
                              createTextVNode("Semua Metode")
                            ]),
                            _: 1
                          }),
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.paymentMethods, (method) => {
                            return openBlock(), createBlock(unref(_sfc_main$j), {
                              key: method.id,
                              value: method.id.toString()
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(method.name), 1)
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
                    createVNode(unref(_sfc_main$g), { class: "w-[200px]" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$h), { placeholder: "Metode Pembayaran" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$i), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$j), { value: "all" }, {
                          default: withCtx(() => [
                            createTextVNode("Semua Metode")
                          ]),
                          _: 1
                        }),
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.paymentMethods, (method) => {
                          return openBlock(), createBlock(unref(_sfc_main$j), {
                            key: method.id,
                            value: method.id.toString()
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(method.name), 1)
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
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$k), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$l), { "as-child": "" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$7), {
                          variant: "outline",
                          class: "ml-auto"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Kolom `);
                              _push5(ssrRenderComponent(unref(ChevronDown), { class: "ml-2 h-4 w-4" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createTextVNode(" Kolom "),
                                createVNode(unref(ChevronDown), { class: "ml-2 h-4 w-4" })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$7), {
                            variant: "outline",
                            class: "ml-auto"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Kolom "),
                              createVNode(unref(ChevronDown), { class: "ml-2 h-4 w-4" })
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$m), { align: "end" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(unref(table).getAllColumns().filter((column) => column.getCanHide()), (column) => {
                          _push4(ssrRenderComponent(unref(_sfc_main$n), {
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
                            return openBlock(), createBlock(unref(_sfc_main$n), {
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
                    createVNode(unref(_sfc_main$l), { "as-child": "" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$7), {
                          variant: "outline",
                          class: "ml-auto"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Kolom "),
                            createVNode(unref(ChevronDown), { class: "ml-2 h-4 w-4" })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$m), { align: "end" }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getAllColumns().filter((column) => column.getCanHide()), (column) => {
                          return openBlock(), createBlock(unref(_sfc_main$n), {
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
            _push2(ssrRenderComponent(unref(_sfc_main$o), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$p), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(unref(table).getHeaderGroups(), (headerGroup) => {
                          _push4(ssrRenderComponent(unref(_sfc_main$q), {
                            key: headerGroup.id
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(headerGroup.headers, (header) => {
                                  _push5(ssrRenderComponent(unref(_sfc_main$r), {
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
                                    return openBlock(), createBlock(unref(_sfc_main$r), {
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
                            return openBlock(), createBlock(unref(_sfc_main$q), {
                              key: headerGroup.id
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                                  return openBlock(), createBlock(unref(_sfc_main$r), {
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
                  _push3(ssrRenderComponent(unref(_sfc_main$s), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (unref(table).getRowModel().rows?.length) {
                          _push4(`<!--[-->`);
                          ssrRenderList(unref(table).getRowModel().rows, (row) => {
                            _push4(ssrRenderComponent(unref(_sfc_main$q), {
                              key: row.id
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<!--[-->`);
                                  ssrRenderList(row.getVisibleCells(), (cell) => {
                                    _push5(ssrRenderComponent(unref(_sfc_main$t), {
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
                                      return openBlock(), createBlock(unref(_sfc_main$t), {
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
                          _push4(ssrRenderComponent(unref(_sfc_main$q), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(_sfc_main$t), {
                                  colspan: columns.length,
                                  class: "h-24 text-center"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(` Tidak ada data pesanan. `);
                                    } else {
                                      return [
                                        createTextVNode(" Tidak ada data pesanan. ")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(_sfc_main$t), {
                                    colspan: columns.length,
                                    class: "h-24 text-center"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Tidak ada data pesanan. ")
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
                            return openBlock(), createBlock(unref(_sfc_main$q), {
                              key: row.id
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                                  return openBlock(), createBlock(unref(_sfc_main$t), {
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
                          }), 128)) : (openBlock(), createBlock(unref(_sfc_main$q), { key: 1 }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$t), {
                                colspan: columns.length,
                                class: "h-24 text-center"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Tidak ada data pesanan. ")
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
                    createVNode(unref(_sfc_main$p), null, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getHeaderGroups(), (headerGroup) => {
                          return openBlock(), createBlock(unref(_sfc_main$q), {
                            key: headerGroup.id
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                                return openBlock(), createBlock(unref(_sfc_main$r), {
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
                    createVNode(unref(_sfc_main$s), null, {
                      default: withCtx(() => [
                        unref(table).getRowModel().rows?.length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(table).getRowModel().rows, (row) => {
                          return openBlock(), createBlock(unref(_sfc_main$q), {
                            key: row.id
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                                return openBlock(), createBlock(unref(_sfc_main$t), {
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
                        }), 128)) : (openBlock(), createBlock(unref(_sfc_main$q), { key: 1 }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$t), {
                              colspan: columns.length,
                              class: "h-24 text-center"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Tidak ada data pesanan. ")
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
            if (__props.orders.last_page > 1) {
              _push2(ssrRenderComponent(_sfc_main$u, {
                data: {
                  current_page: __props.orders.current_page,
                  last_page: __props.orders.last_page,
                  per_page: __props.orders.per_page,
                  from: (__props.orders.current_page - 1) * __props.orders.per_page + 1,
                  to: Math.min(__props.orders.current_page * __props.orders.per_page, __props.orders.total),
                  total: __props.orders.total
                },
                url: "/admin/orders/paid",
                filters: {
                  search: search.value || void 0,
                  status: statusFilter.value !== "all" ? statusFilter.value : void 0,
                  payment_method: paymentMethodFilter.value !== "all" ? paymentMethodFilter.value : void 0,
                  sort_by: sorting.value[0]?.id || "created_at",
                  sort_order: sorting.value[0]?.desc ? "desc" : "asc"
                }
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(InvoiceDialog, {
              open: invoiceDialog.value.open,
              "onUpdate:open": ($event) => invoiceDialog.value.open = $event,
              "order-id": invoiceDialog.value.orderId
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Head), { title: "Pesanan Dibayar" }),
              createVNode("div", { class: "rounded-xl p-4 space-y-6 py-6" }, [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("div", null, [
                    createVNode("h1", { class: "text-3xl font-bold tracking-tight" }, "Pesanan Dibayar"),
                    createVNode("p", { class: "text-muted-foreground" }, "Kelola pesanan yang sudah dibayar")
                  ])
                ]),
                createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                  createVNode(unref(_sfc_main$a), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$b), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$c), { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Total Dibayar")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(Package), { class: "h-4 w-4 text-muted-foreground" })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$d), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(__props.statistics.total_paid), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Pesanan sudah dibayar")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$a), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$b), { class: "flex flex-row items-center justify-between space-y-0 pb-2" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$c), { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Total Amount")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(DollarSign), { class: "h-4 w-4 text-muted-foreground" })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$d), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(formatCurrency(__props.statistics.total_amount)), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Total nilai terbayar")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" }, [
                  createVNode("div", { class: "flex flex-1 gap-4" }, [
                    createVNode("div", { class: "relative flex-1 max-w-sm" }, [
                      createVNode(unref(Search), { class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
                      createVNode(unref(_sfc_main$e), {
                        modelValue: search.value,
                        "onUpdate:modelValue": ($event) => search.value = $event,
                        placeholder: "Cari nomor order atau nama pelanggan...",
                        class: "pl-9"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(unref(_sfc_main$f), {
                      modelValue: statusFilter.value,
                      "onUpdate:modelValue": ($event) => statusFilter.value = $event
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$g), { class: "w-[180px]" }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$h), { placeholder: "Semua Status" })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$i), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$j), { value: "all" }, {
                              default: withCtx(() => [
                                createTextVNode("Semua Status")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$j), { value: "pending" }, {
                              default: withCtx(() => [
                                createTextVNode("Pending")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$j), { value: "processing" }, {
                              default: withCtx(() => [
                                createTextVNode("Processing")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$j), { value: "shipped" }, {
                              default: withCtx(() => [
                                createTextVNode("Shipped")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$j), { value: "delivered" }, {
                              default: withCtx(() => [
                                createTextVNode("Delivered")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$j), { value: "completed" }, {
                              default: withCtx(() => [
                                createTextVNode("Completed")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$j), { value: "cancelled" }, {
                              default: withCtx(() => [
                                createTextVNode("Cancelled")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(unref(_sfc_main$f), {
                      modelValue: paymentMethodFilter.value,
                      "onUpdate:modelValue": ($event) => paymentMethodFilter.value = $event
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$g), { class: "w-[200px]" }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$h), { placeholder: "Metode Pembayaran" })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$i), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$j), { value: "all" }, {
                              default: withCtx(() => [
                                createTextVNode("Semua Metode")
                              ]),
                              _: 1
                            }),
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.paymentMethods, (method) => {
                              return openBlock(), createBlock(unref(_sfc_main$j), {
                                key: method.id,
                                value: method.id.toString()
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(method.name), 1)
                                ]),
                                _: 2
                              }, 1032, ["value"]);
                            }), 128))
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1032, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode(unref(_sfc_main$k), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$l), { "as-child": "" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$7), {
                            variant: "outline",
                            class: "ml-auto"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Kolom "),
                              createVNode(unref(ChevronDown), { class: "ml-2 h-4 w-4" })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$m), { align: "end" }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getAllColumns().filter((column) => column.getCanHide()), (column) => {
                            return openBlock(), createBlock(unref(_sfc_main$n), {
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
                  createVNode(unref(_sfc_main$o), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$p), null, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getHeaderGroups(), (headerGroup) => {
                            return openBlock(), createBlock(unref(_sfc_main$q), {
                              key: headerGroup.id
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                                  return openBlock(), createBlock(unref(_sfc_main$r), {
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
                      createVNode(unref(_sfc_main$s), null, {
                        default: withCtx(() => [
                          unref(table).getRowModel().rows?.length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(table).getRowModel().rows, (row) => {
                            return openBlock(), createBlock(unref(_sfc_main$q), {
                              key: row.id
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                                  return openBlock(), createBlock(unref(_sfc_main$t), {
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
                          }), 128)) : (openBlock(), createBlock(unref(_sfc_main$q), { key: 1 }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$t), {
                                colspan: columns.length,
                                class: "h-24 text-center"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Tidak ada data pesanan. ")
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
                __props.orders.last_page > 1 ? (openBlock(), createBlock(_sfc_main$u, {
                  key: 0,
                  data: {
                    current_page: __props.orders.current_page,
                    last_page: __props.orders.last_page,
                    per_page: __props.orders.per_page,
                    from: (__props.orders.current_page - 1) * __props.orders.per_page + 1,
                    to: Math.min(__props.orders.current_page * __props.orders.per_page, __props.orders.total),
                    total: __props.orders.total
                  },
                  url: "/admin/orders/paid",
                  filters: {
                    search: search.value || void 0,
                    status: statusFilter.value !== "all" ? statusFilter.value : void 0,
                    payment_method: paymentMethodFilter.value !== "all" ? paymentMethodFilter.value : void 0,
                    sort_by: sorting.value[0]?.id || "created_at",
                    sort_order: sorting.value[0]?.desc ? "desc" : "asc"
                  }
                }, null, 8, ["data", "filters"])) : createCommentVNode("", true)
              ]),
              createVNode(InvoiceDialog, {
                open: invoiceDialog.value.open,
                "onUpdate:open": ($event) => invoiceDialog.value.open = $event,
                "order-id": invoiceDialog.value.orderId
              }, null, 8, ["open", "onUpdate:open", "order-id"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Orders/Paid.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
