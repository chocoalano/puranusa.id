import { defineComponent, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import { Package } from "lucide-vue-next";
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "AppLogoIcon",
  __ssrInlineRender: true,
  props: {
    className: {}
  },
  setup(__props) {
    const page = usePage();
    const appSettings = computed(() => page.props.settings);
    const siteName = computed(() => appSettings.value?.site_name || "PURANUSA");
    const siteLogo = computed(() => appSettings.value?.site_logo);
    return (_ctx, _push, _parent, _attrs) => {
      if (siteLogo.value) {
        _push(`<img${ssrRenderAttrs(mergeProps({
          src: siteLogo.value,
          alt: siteName.value,
          class: [__props.className, "object-contain rounded-md"]
        }, _attrs))}>`);
      } else {
        _push(ssrRenderComponent(unref(Package), mergeProps({
          class: [__props.className, "text-primary"]
        }, _attrs), null, _parent));
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/AppLogoIcon.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
