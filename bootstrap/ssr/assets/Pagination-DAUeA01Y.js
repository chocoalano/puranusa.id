import { defineComponent, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$6 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, c as _sfc_main$4, d as _sfc_main$5 } from "./SelectValue-BUnv4mQg.js";
import { router } from "@inertiajs/vue3";
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-vue-next";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Pagination",
  __ssrInlineRender: true,
  props: {
    data: {},
    url: {},
    filters: { default: () => ({}) },
    preserveScroll: { type: Boolean, default: true },
    preserveState: { type: Boolean, default: true },
    perPageOptions: { default: () => [10, 25, 50, 100] }
  },
  setup(__props) {
    const props = __props;
    const goToPage = (page) => {
      router.visit(props.url, {
        data: {
          ...props.filters,
          page
        },
        preserveScroll: props.preserveScroll,
        preserveState: props.preserveState
      });
    };
    const changePerPage = (perPage) => {
      if (!perPage) return;
      router.visit(props.url, {
        data: {
          ...props.filters,
          per_page: String(perPage),
          page: 1
          // Reset to first page when changing per_page
        },
        preserveScroll: props.preserveScroll,
        preserveState: props.preserveState
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" }, _attrs))}><div class="flex items-center gap-4"><div class="text-sm text-muted-foreground"> Menampilkan ${ssrInterpolate(__props.data.from)} - ${ssrInterpolate(__props.data.to)} dari ${ssrInterpolate(__props.data.total)} data </div><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        "model-value": String(__props.data.per_page),
        "onUpdate:modelValue": changePerPage
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), { class: "h-8 w-[70px]" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), {
                    placeholder: String(__props.data.per_page)
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), {
                      placeholder: String(__props.data.per_page)
                    }, null, 8, ["placeholder"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(__props.perPageOptions, (option) => {
                    _push3(ssrRenderComponent(unref(_sfc_main$5), {
                      key: option,
                      value: String(option)
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(option)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(option), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.perPageOptions, (option) => {
                      return openBlock(), createBlock(unref(_sfc_main$5), {
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), { class: "h-8 w-[70px]" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), {
                    placeholder: String(__props.data.per_page)
                  }, null, 8, ["placeholder"])
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), null, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.perPageOptions, (option) => {
                    return openBlock(), createBlock(unref(_sfc_main$5), {
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
      }, _parent));
      _push(`</div></div><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(unref(_sfc_main$6), {
        variant: "outline",
        size: "icon",
        disabled: __props.data.current_page === 1,
        onClick: ($event) => goToPage(1)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ChevronsLeft), { class: "h-4 w-4" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(ChevronsLeft), { class: "h-4 w-4" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$6), {
        variant: "outline",
        size: "icon",
        disabled: __props.data.current_page === 1,
        onClick: ($event) => goToPage(__props.data.current_page - 1)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ChevronLeft), { class: "h-4 w-4" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(ChevronLeft), { class: "h-4 w-4" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex items-center gap-1 px-2 text-sm"><span class="font-medium">${ssrInterpolate(__props.data.current_page)}</span><span class="text-muted-foreground">of</span><span class="font-medium">${ssrInterpolate(__props.data.last_page)}</span></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$6), {
        variant: "outline",
        size: "icon",
        disabled: __props.data.current_page === __props.data.last_page,
        onClick: ($event) => goToPage(__props.data.current_page + 1)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ChevronRight), { class: "h-4 w-4" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(ChevronRight), { class: "h-4 w-4" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$6), {
        variant: "outline",
        size: "icon",
        disabled: __props.data.current_page === __props.data.last_page,
        onClick: ($event) => goToPage(__props.data.last_page)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ChevronsRight), { class: "h-4 w-4" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(ChevronsRight), { class: "h-4 w-4" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Pagination.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
