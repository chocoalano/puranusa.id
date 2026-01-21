import { defineComponent, computed, mergeProps, unref, withCtx, createVNode, resolveDynamicComponent, toDisplayString, createTextVNode, useSSRContext, renderSlot } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderVNode, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import { _ as _sfc_main$2 } from "./AppLogoIcon-CtV9aC-8.js";
import { h as home } from "./index-BsP5JKUP.js";
import { usePage, Link } from "@inertiajs/vue3";
import { Shield, Truck, Award } from "lucide-vue-next";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AuthSplitLayout",
  __ssrInlineRender: true,
  props: {
    title: {},
    description: {}
  },
  setup(__props) {
    const page = usePage();
    const quote = page.props.quote;
    const settings = computed(() => page.props.settings);
    const siteName = computed(() => settings.value?.site_name || "PURANUSA");
    const features = [
      {
        icon: Shield,
        title: "Aman & Terpercaya",
        description: "Transaksi terlindungi dengan sistem keamanan terbaik"
      },
      {
        icon: Truck,
        title: "Pengiriman Cepat",
        description: "Gratis ongkir untuk pembelian pertama"
      },
      {
        icon: Award,
        title: "Kualitas Terjamin",
        description: "Produk original dengan garansi resmi"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen grid lg:grid-cols-2" }, _attrs))}><div class="relative hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white overflow-hidden"><div class="absolute inset-0 bg-grid-white/10 bg-[size:30px_30px] [mask-image:radial-gradient(white,transparent_85%)]"></div><div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div><div class="relative z-10 text-center">`);
      _push(ssrRenderComponent(unref(Link), {
        href: unref(home)(),
        class: "inline-flex items-center gap-3 group transition-all hover:gap-4"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-2 bg-white backdrop-blur-sm rounded-xl group-hover:bg-white/90 transition-all"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, { class: "size-8" }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "p-2 bg-white backdrop-blur-sm rounded-xl group-hover:bg-white/90 transition-all" }, [
                createVNode(_sfc_main$2, { class: "size-8" })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="relative z-10 mt-10 space-y-15"><div class="space-y-4"><h2 class="text-2xl font-bold leading-tight"> Belanja Mudah,<br> Harga Terjangkau </h2><p class="text-lg text-white/90"> Bergabunglah dengan ribuan pelanggan yang mempercayai kami untuk kebutuhan belanja online mereka </p></div><div class="grid grid-cols-3 gap-4"><!--[-->`);
      ssrRenderList(features, (feature, index) => {
        _push(`<div class="flex items-start gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/15 transition-all"><div class="p-2 bg-white/20 rounded-lg">`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(feature.icon), { class: "size-5" }, null), _parent);
        _push(`</div><div><h3 class="font-semibold mb-1">${ssrInterpolate(feature.title)}</h3><p class="text-sm text-white/80">${ssrInterpolate(feature.description)}</p></div></div>`);
      });
      _push(`<!--]--></div></div>`);
      if (unref(quote)) {
        _push(`<div class="relative z-10 mt-5"><blockquote class="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10"><p class="text-lg italic mb-3">“${ssrInterpolate(unref(quote).message)}”</p><footer class="text-sm text-white/80"> — ${ssrInterpolate(unref(quote).author)}</footer></blockquote></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="absolute top-20 right-20 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div><div class="absolute bottom-20 left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div></div><div class="flex items-center justify-center p-8 bg-background"><div class="w-full max-w-md space-y-8"><div class="lg:hidden text-center mb-8">`);
      _push(ssrRenderComponent(unref(Link), {
        href: unref(home)(),
        class: "inline-flex items-center gap-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, { class: "size-10" }, null, _parent2, _scopeId));
            _push2(`<span class="text-2xl font-bold"${_scopeId}>${ssrInterpolate(siteName.value)}</span>`);
          } else {
            return [
              createVNode(_sfc_main$2, { class: "size-10" }),
              createVNode("span", { class: "text-2xl font-bold" }, toDisplayString(siteName.value), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="space-y-2 text-center">`);
      if (__props.title) {
        _push(`<h1 class="text-3xl font-bold tracking-tight">${ssrInterpolate(__props.title)}</h1>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.description) {
        _push(`<p class="text-muted-foreground">${ssrInterpolate(__props.description)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="space-y-6">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div><div class="lg:hidden text-center pt-4">`);
      _push(ssrRenderComponent(unref(Link), {
        href: unref(home)(),
        class: "text-sm text-muted-foreground hover:text-primary transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` ← Kembali ke Beranda `);
          } else {
            return [
              createTextVNode(" ← Kembali ke Beranda ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/layouts/auth/AuthSplitLayout.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AuthLayout",
  __ssrInlineRender: true,
  props: {
    title: {},
    description: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        title: __props.title,
        description: __props.description
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/layouts/AuthLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
