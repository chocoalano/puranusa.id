import { defineComponent, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$2 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5, c as _sfc_main$6, d as _sfc_main$7 } from "./SelectValue-BUnv4mQg.js";
import { _ as _sfc_main$8 } from "./index-SN_CnQ_F.js";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TableFilters",
  __ssrInlineRender: true,
  props: {
    filters: {},
    onUpdate: { type: Function }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mb-4 flex gap-4" }, _attrs))}><!--[-->`);
      ssrRenderList(__props.filters, (filter, index) => {
        _push(`<!--[-->`);
        if (filter.type === "search") {
          _push(ssrRenderComponent(unref(_sfc_main$2), {
            "model-value": filter.modelValue,
            placeholder: filter.placeholder || "Cari...",
            class: "max-w-sm",
            onInput: (e) => __props.onUpdate(index, e.target.value)
          }, null, _parent));
        } else if (filter.type === "select") {
          _push(ssrRenderComponent(unref(_sfc_main$3), {
            "model-value": filter.modelValue,
            "onUpdate:modelValue": (value) => __props.onUpdate(index, value)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "w-[180px]" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(unref(_sfc_main$5), {
                        placeholder: filter.placeholder || "Pilih..."
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(unref(_sfc_main$5), {
                          placeholder: filter.placeholder || "Pilih..."
                        }, null, 8, ["placeholder"])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(unref(_sfc_main$6), null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<!--[-->`);
                      ssrRenderList(filter.options, (option) => {
                        _push3(ssrRenderComponent(unref(_sfc_main$7), {
                          key: option.value || "all",
                          value: option.value || "all"
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`${ssrInterpolate(option.label)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(option.label), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      });
                      _push3(`<!--]-->`);
                    } else {
                      return [
                        (openBlock(true), createBlock(Fragment, null, renderList(filter.options, (option) => {
                          return openBlock(), createBlock(unref(_sfc_main$7), {
                            key: option.value || "all",
                            value: option.value || "all"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(option.label), 1)
                            ]),
                            _: 2
                          }, 1032, ["value"]);
                        }), 128))
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(_sfc_main$4), { class: "w-[180px]" }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$5), {
                        placeholder: filter.placeholder || "Pilih..."
                      }, null, 8, ["placeholder"])
                    ]),
                    _: 2
                  }, 1024),
                  createVNode(unref(_sfc_main$6), null, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(filter.options, (option) => {
                        return openBlock(), createBlock(unref(_sfc_main$7), {
                          key: option.value || "all",
                          value: option.value || "all"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(option.label), 1)
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
            _: 2
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/admin/TableFilters.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TablePagination",
  __ssrInlineRender: true,
  props: {
    data: {},
    itemLabel: { default: "item" },
    onPageChange: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-between px-2 py-4" }, _attrs))}><div class="text-sm text-muted-foreground"> Menampilkan ${ssrInterpolate(__props.data.from)} sampai ${ssrInterpolate(__props.data.to)} dari ${ssrInterpolate(__props.data.total)} ${ssrInterpolate(__props.itemLabel)}</div><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(unref(_sfc_main$8), {
        variant: "outline",
        size: "sm",
        disabled: __props.data.current_page === 1,
        onClick: ($event) => __props.onPageChange(1)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Pertama `);
          } else {
            return [
              createTextVNode(" Pertama ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$8), {
        variant: "outline",
        size: "sm",
        disabled: __props.data.current_page === 1,
        onClick: ($event) => __props.onPageChange(__props.data.current_page - 1)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Sebelumnya `);
          } else {
            return [
              createTextVNode(" Sebelumnya ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span class="text-sm"> Halaman ${ssrInterpolate(__props.data.current_page)} dari ${ssrInterpolate(__props.data.last_page)}</span>`);
      _push(ssrRenderComponent(unref(_sfc_main$8), {
        variant: "outline",
        size: "sm",
        disabled: __props.data.current_page === __props.data.last_page,
        onClick: ($event) => __props.onPageChange(__props.data.current_page + 1)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Selanjutnya `);
          } else {
            return [
              createTextVNode(" Selanjutnya ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$8), {
        variant: "outline",
        size: "sm",
        disabled: __props.data.current_page === __props.data.last_page,
        onClick: ($event) => __props.onPageChange(__props.data.last_page)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Terakhir `);
          } else {
            return [
              createTextVNode(" Terakhir ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/admin/TablePagination.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main$1 as _,
  _sfc_main as a
};
