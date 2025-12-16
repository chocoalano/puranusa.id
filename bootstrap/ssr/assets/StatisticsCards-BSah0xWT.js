import { defineComponent, computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2, d as _sfc_main$3, b as _sfc_main$4 } from "./CardTitle-sqUG0LTw.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "StatisticsCards",
  __ssrInlineRender: true,
  props: {
    stats: {},
    columns: { default: 4 }
  },
  setup(__props) {
    const props = __props;
    const formatValue = (stat) => {
      if (typeof stat.value === "string") {
        return stat.value;
      }
      if (stat.formatter) {
        return stat.formatter(stat.value);
      }
      return stat.value.toLocaleString("id-ID");
    };
    const gridClass = computed(() => {
      const cols = {
        2: "md:grid-cols-2",
        3: "md:grid-cols-3",
        4: "md:grid-cols-4",
        5: "md:grid-cols-5",
        6: "md:grid-cols-6"
      };
      return `grid gap-4 ${cols[props.columns] || "md:grid-cols-4"}`;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: gridClass.value }, _attrs))}><!--[-->`);
      ssrRenderList(__props.stats, (stat, index) => {
        _push(ssrRenderComponent(unref(_sfc_main$1), { key: index }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$2), { class: "pb-2" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(stat.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(stat.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$4), { class: "text-3xl" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(formatValue(stat))}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(formatValue(stat)), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$3), null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(stat.label), 1)
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(unref(_sfc_main$4), { class: "text-3xl" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(formatValue(stat)), 1)
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
                createVNode(unref(_sfc_main$2), { class: "pb-2" }, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(stat.label), 1)
                      ]),
                      _: 2
                    }, 1024),
                    createVNode(unref(_sfc_main$4), { class: "text-3xl" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(formatValue(stat)), 1)
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
        }, _parent));
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/admin/StatisticsCards.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
