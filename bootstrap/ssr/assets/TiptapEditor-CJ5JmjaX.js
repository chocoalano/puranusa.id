import { defineComponent, ref, shallowRef, onMounted, onBeforeUnmount, watch, mergeProps, unref, withCtx, createVNode, resolveDynamicComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrRenderVNode } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./index-SN_CnQ_F.js";
import { Bold, Italic, UnderlineIcon, Strikethrough, Code, Heading1, Heading2, Heading3, List, ListOrdered, Quote, AlignLeft, AlignCenter, AlignRight, AlignJustify, Link2, Undo, Redo } from "lucide-vue-next";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TiptapEditor",
  __ssrInlineRender: true,
  props: {
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const isClient = ref(false);
    let isDestroyed = false;
    const editor = shallowRef(null);
    const EditorContentComponent = shallowRef(null);
    onMounted(async () => {
      isClient.value = true;
      const [tiptapVue3, StarterKit, Link, Image, TextAlign, Underline] = await Promise.all([
        import("@tiptap/vue-3"),
        import("@tiptap/starter-kit"),
        import("@tiptap/extension-link"),
        import("@tiptap/extension-image"),
        import("@tiptap/extension-text-align"),
        import("@tiptap/extension-underline")
      ]);
      if (isDestroyed) {
        return;
      }
      EditorContentComponent.value = tiptapVue3.EditorContent;
      editor.value = new tiptapVue3.Editor({
        content: props.modelValue || "",
        extensions: [
          StarterKit.default.configure({
            // Disable extensions that we're adding separately with custom config
          }),
          Link.default.configure({
            openOnClick: false
          }),
          Image.default,
          TextAlign.default.configure({
            types: ["heading", "paragraph"]
          }),
          Underline.default
        ],
        onUpdate: ({ editor: e }) => {
          emit("update:modelValue", e.getHTML());
        },
        editorProps: {
          attributes: {
            class: "prose prose-sm sm:prose lg:prose-lg dark:prose-invert focus:outline-none max-w-none p-4 min-h-[200px]"
          }
        }
      });
    });
    onBeforeUnmount(() => {
      isDestroyed = true;
      if (editor.value) {
        editor.value.destroy();
        editor.value = null;
      }
      EditorContentComponent.value = null;
    });
    watch(() => props.modelValue, (value) => {
      if (!editor.value || isDestroyed) {
        return;
      }
      const isSame = editor.value.getHTML() === value;
      if (!isSame) {
        editor.value.commands.setContent(value || "", { emitUpdate: false });
      }
    });
    const setLink = () => {
      if (typeof window === "undefined") return;
      const url = window.prompt("Enter URL");
      if (url && editor.value) {
        editor.value.chain().focus().setLink({ href: url }).run();
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      if (!isClient.value || !editor.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "border rounded-lg overflow-hidden" }, _attrs))}><div class="flex flex-wrap gap-1 p-2 bg-muted border-b"><!--[-->`);
        ssrRenderList(10, (i) => {
          _push(`<div class="h-8 w-8 bg-muted-foreground/20 rounded animate-pulse"></div>`);
        });
        _push(`<!--]--></div><div class="p-4 min-h-[200px] flex items-center justify-center text-muted-foreground"><div class="animate-pulse">Loading editor...</div></div></div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "border rounded-lg overflow-hidden" }, _attrs))}><div class="flex flex-wrap gap-1 p-2 bg-muted border-b">`);
        _push(ssrRenderComponent(unref(_sfc_main$1), {
          variant: "ghost",
          size: "icon",
          type: "button",
          onClick: ($event) => editor.value.chain().focus().toggleBold().run(),
          class: { "bg-accent": editor.value.isActive("bold") },
          title: "Bold"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Bold), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(Bold), { class: "h-4 w-4" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(_sfc_main$1), {
          variant: "ghost",
          size: "icon",
          type: "button",
          onClick: ($event) => editor.value.chain().focus().toggleItalic().run(),
          class: { "bg-accent": editor.value.isActive("italic") },
          title: "Italic"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Italic), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(Italic), { class: "h-4 w-4" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(_sfc_main$1), {
          variant: "ghost",
          size: "icon",
          type: "button",
          onClick: ($event) => editor.value.chain().focus().toggleUnderline().run(),
          class: { "bg-accent": editor.value.isActive("underline") },
          title: "Underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(UnderlineIcon), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(UnderlineIcon), { class: "h-4 w-4" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(_sfc_main$1), {
          variant: "ghost",
          size: "icon",
          type: "button",
          onClick: ($event) => editor.value.chain().focus().toggleStrike().run(),
          class: { "bg-accent": editor.value.isActive("strike") },
          title: "Strikethrough"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Strikethrough), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(Strikethrough), { class: "h-4 w-4" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(_sfc_main$1), {
          variant: "ghost",
          size: "icon",
          type: "button",
          onClick: ($event) => editor.value.chain().focus().toggleCode().run(),
          class: { "bg-accent": editor.value.isActive("code") },
          title: "Inline Code"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Code), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(Code), { class: "h-4 w-4" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="w-px h-6 bg-border mx-1"></div>`);
        _push(ssrRenderComponent(unref(_sfc_main$1), {
          variant: "ghost",
          size: "icon",
          type: "button",
          onClick: ($event) => editor.value.chain().focus().toggleHeading({ level: 1 }).run(),
          class: { "bg-accent": editor.value.isActive("heading", { level: 1 }) },
          title: "Heading 1"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Heading1), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(Heading1), { class: "h-4 w-4" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(_sfc_main$1), {
          variant: "ghost",
          size: "icon",
          type: "button",
          onClick: ($event) => editor.value.chain().focus().toggleHeading({ level: 2 }).run(),
          class: { "bg-accent": editor.value.isActive("heading", { level: 2 }) },
          title: "Heading 2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Heading2), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(Heading2), { class: "h-4 w-4" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(_sfc_main$1), {
          variant: "ghost",
          size: "icon",
          type: "button",
          onClick: ($event) => editor.value.chain().focus().toggleHeading({ level: 3 }).run(),
          class: { "bg-accent": editor.value.isActive("heading", { level: 3 }) },
          title: "Heading 3"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Heading3), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(Heading3), { class: "h-4 w-4" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="w-px h-6 bg-border mx-1"></div>`);
        _push(ssrRenderComponent(unref(_sfc_main$1), {
          variant: "ghost",
          size: "icon",
          type: "button",
          onClick: ($event) => editor.value.chain().focus().toggleBulletList().run(),
          class: { "bg-accent": editor.value.isActive("bulletList") },
          title: "Bullet List"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(List), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(List), { class: "h-4 w-4" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(_sfc_main$1), {
          variant: "ghost",
          size: "icon",
          type: "button",
          onClick: ($event) => editor.value.chain().focus().toggleOrderedList().run(),
          class: { "bg-accent": editor.value.isActive("orderedList") },
          title: "Ordered List"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(ListOrdered), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(ListOrdered), { class: "h-4 w-4" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(_sfc_main$1), {
          variant: "ghost",
          size: "icon",
          type: "button",
          onClick: ($event) => editor.value.chain().focus().toggleBlockquote().run(),
          class: { "bg-accent": editor.value.isActive("blockquote") },
          title: "Quote"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Quote), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(Quote), { class: "h-4 w-4" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="w-px h-6 bg-border mx-1"></div>`);
        _push(ssrRenderComponent(unref(_sfc_main$1), {
          variant: "ghost",
          size: "icon",
          type: "button",
          onClick: ($event) => editor.value.chain().focus().setTextAlign("left").run(),
          class: { "bg-accent": editor.value.isActive({ textAlign: "left" }) },
          title: "Align Left"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(AlignLeft), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(AlignLeft), { class: "h-4 w-4" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(_sfc_main$1), {
          variant: "ghost",
          size: "icon",
          type: "button",
          onClick: ($event) => editor.value.chain().focus().setTextAlign("center").run(),
          class: { "bg-accent": editor.value.isActive({ textAlign: "center" }) },
          title: "Align Center"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(AlignCenter), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(AlignCenter), { class: "h-4 w-4" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(_sfc_main$1), {
          variant: "ghost",
          size: "icon",
          type: "button",
          onClick: ($event) => editor.value.chain().focus().setTextAlign("right").run(),
          class: { "bg-accent": editor.value.isActive({ textAlign: "right" }) },
          title: "Align Right"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(AlignRight), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(AlignRight), { class: "h-4 w-4" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(_sfc_main$1), {
          variant: "ghost",
          size: "icon",
          type: "button",
          onClick: ($event) => editor.value.chain().focus().setTextAlign("justify").run(),
          class: { "bg-accent": editor.value.isActive({ textAlign: "justify" }) },
          title: "Align Justify"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(AlignJustify), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(AlignJustify), { class: "h-4 w-4" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="w-px h-6 bg-border mx-1"></div>`);
        _push(ssrRenderComponent(unref(_sfc_main$1), {
          variant: "ghost",
          size: "icon",
          type: "button",
          onClick: setLink,
          class: { "bg-accent": editor.value.isActive("link") },
          title: "Insert Link"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Link2), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(Link2), { class: "h-4 w-4" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="w-px h-6 bg-border mx-1"></div>`);
        _push(ssrRenderComponent(unref(_sfc_main$1), {
          variant: "ghost",
          size: "icon",
          type: "button",
          onClick: ($event) => editor.value.chain().focus().undo().run(),
          disabled: !editor.value.can().undo(),
          title: "Undo"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Undo), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(Undo), { class: "h-4 w-4" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(_sfc_main$1), {
          variant: "ghost",
          size: "icon",
          type: "button",
          onClick: ($event) => editor.value.chain().focus().redo().run(),
          disabled: !editor.value.can().redo(),
          title: "Redo"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Redo), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(Redo), { class: "h-4 w-4" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(EditorContentComponent.value), { editor: editor.value }, null), _parent);
        _push(`</div>`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/admin/TiptapEditor.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
