import { defineComponent, mergeProps, unref, createVNode, resolveDynamicComponent, withCtx, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderVNode, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ArticleContent",
  __ssrInlineRender: true,
  props: {
    blocks: {}
  },
  setup(__props) {
    const props = __props;
    const parsedBlocks = typeof props.blocks === "string" ? JSON.parse(props.blocks) : props.blocks;
    const extractVideoId = (url) => {
      const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
      return match ? match[1] : null;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<article${ssrRenderAttrs(mergeProps({ class: "prose prose-lg max-w-none dark:prose-invert" }, _attrs))}><!--[-->`);
      ssrRenderList(unref(parsedBlocks), (block) => {
        _push(`<!--[-->`);
        if (block.type === "heading") {
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(`h${block.content.level || 2}`), { class: "font-bold tracking-tight" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(block.content.text)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(block.content.text), 1)
                ];
              }
            }),
            _: 2
          }), _parent);
        } else if (block.type === "paragraph") {
          _push(`<div class="leading-relaxed">${block.content.text ?? ""}</div>`);
        } else if (block.type === "image") {
          _push(`<figure class="my-8"><img${ssrRenderAttr("src", block.content.url)}${ssrRenderAttr("alt", block.content.alt)} class="rounded-lg w-full object-cover shadow-lg">`);
          if (block.content.caption) {
            _push(`<figcaption class="mt-2 text-center text-sm text-muted-foreground">${ssrInterpolate(block.content.caption)}</figcaption>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</figure>`);
        } else {
          _push(`<!---->`);
        }
        if (block.type === "list" && !block.content.ordered) {
          _push(`<ul class="list-disc list-inside space-y-2"><!--[-->`);
          ssrRenderList(block.content.items, (item, idx) => {
            _push(`<li>${ssrInterpolate(item)}</li>`);
          });
          _push(`<!--]--></ul>`);
        } else if (block.type === "list" && block.content.ordered) {
          _push(`<ol class="list-decimal list-inside space-y-2"><!--[-->`);
          ssrRenderList(block.content.items, (item, idx) => {
            _push(`<li>${ssrInterpolate(item)}</li>`);
          });
          _push(`<!--]--></ol>`);
        } else if (block.type === "quote") {
          _push(`<blockquote class="border-l-4 border-primary pl-6 py-2 italic bg-muted/30 rounded-r-lg my-6"><p class="text-lg">${ssrInterpolate(block.content.text)}</p>`);
          if (block.content.author) {
            _push(`<footer class="mt-2 text-sm font-semibold not-italic"> — ${ssrInterpolate(block.content.author)}</footer>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</blockquote>`);
        } else if (block.type === "code") {
          _push(`<div class="my-6"><div class="bg-muted px-4 py-2 rounded-t-lg border-b border-border"><span class="text-xs font-mono text-muted-foreground uppercase">${ssrInterpolate(block.content.language)}</span></div><pre class="!mt-0 rounded-t-none"><code class="language-{{ block.content.language }}">${ssrInterpolate(block.content.code)}</code></pre></div>`);
        } else if (block.type === "video") {
          _push(`<div class="my-8 aspect-video rounded-lg overflow-hidden shadow-lg">`);
          if (extractVideoId(block.content.url)) {
            _push(`<iframe${ssrRenderAttr("src", `https://www.youtube.com/embed/${extractVideoId(block.content.url)}`)} class="w-full h-full" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else if (block.type === "divider") {
          _push(`<hr class="my-8 border-border">`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></article>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ArticleContent.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
