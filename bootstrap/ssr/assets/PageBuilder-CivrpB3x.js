import { defineComponent, ref, onMounted, onBeforeUnmount, watch, mergeProps, unref, withCtx, createVNode, resolveDynamicComponent, useSSRContext, shallowRef, createTextVNode, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, renderList } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrRenderVNode, ssrRenderStyle, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$4, a as _sfc_main$5, b as _sfc_main$6, d as _sfc_main$7, c as _sfc_main$8 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$3 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$l } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$f } from "./Label-16aMY2sx.js";
import { _ as _sfc_main$m } from "./Textarea-pcFPh_uS.js";
import { Bold, Italic, UnderlineIcon, Strikethrough, Code, Heading1, Heading2, Heading3, List, ListOrdered, Quote, AlignLeft, AlignCenter, AlignRight, AlignJustify, Link2, Undo, Redo, Plus, GripVertical, ChevronUp, ChevronDown, Edit, Trash2, Image, Youtube, Type, FileText } from "lucide-vue-next";
import { _ as _sfc_main$g, a as _sfc_main$h, b as _sfc_main$i, c as _sfc_main$j, d as _sfc_main$k } from "./SelectValue-BUnv4mQg.js";
import { _ as _sfc_main$a, a as _sfc_main$b, b as _sfc_main$c, c as _sfc_main$d, d as _sfc_main$e, e as _sfc_main$n } from "./DialogTrigger-DV-5YM1v.js";
import { _ as _sfc_main$9 } from "./index-BpQimeTM.js";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
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
    const editor = ref(null);
    const EditorContentComponent = ref(null);
    onMounted(async () => {
      isClient.value = true;
      const [tiptapVue3, StarterKit, Link, Image2, TextAlign, Underline] = await Promise.all([
        import("@tiptap/vue-3"),
        import("@tiptap/starter-kit"),
        import("@tiptap/extension-link"),
        import("@tiptap/extension-image"),
        import("@tiptap/extension-text-align"),
        import("@tiptap/extension-underline")
      ]);
      EditorContentComponent.value = tiptapVue3.EditorContent;
      editor.value = new tiptapVue3.Editor({
        content: props.modelValue || "",
        extensions: [
          StarterKit.default,
          Link.default.configure({
            openOnClick: false
          }),
          Image2.default,
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
      if (editor.value) {
        editor.value.destroy();
      }
    });
    watch(() => props.modelValue, (value) => {
      const isSame = editor.value?.getHTML() === value;
      if (!isSame && editor.value) {
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
        _push(ssrRenderComponent(unref(_sfc_main$3), {
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
        _push(ssrRenderComponent(unref(_sfc_main$3), {
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
        _push(ssrRenderComponent(unref(_sfc_main$3), {
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
        _push(ssrRenderComponent(unref(_sfc_main$3), {
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
        _push(ssrRenderComponent(unref(_sfc_main$3), {
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
        _push(ssrRenderComponent(unref(_sfc_main$3), {
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
        _push(ssrRenderComponent(unref(_sfc_main$3), {
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
        _push(ssrRenderComponent(unref(_sfc_main$3), {
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
        _push(ssrRenderComponent(unref(_sfc_main$3), {
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
        _push(ssrRenderComponent(unref(_sfc_main$3), {
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
        _push(ssrRenderComponent(unref(_sfc_main$3), {
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
        _push(ssrRenderComponent(unref(_sfc_main$3), {
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
        _push(ssrRenderComponent(unref(_sfc_main$3), {
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
        _push(ssrRenderComponent(unref(_sfc_main$3), {
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
        _push(ssrRenderComponent(unref(_sfc_main$3), {
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
        _push(ssrRenderComponent(unref(_sfc_main$3), {
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
        _push(ssrRenderComponent(unref(_sfc_main$3), {
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
        _push(ssrRenderComponent(unref(_sfc_main$3), {
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/admin/TiptapEditor.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MonacoEditor",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    language: { default: "javascript" },
    height: { default: "400px" }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const localValue = ref(props.modelValue || "");
    const isClient = ref(false);
    const MonacoEditorComponent = shallowRef(null);
    onMounted(async () => {
      isClient.value = true;
      const module = await import("monaco-editor-vue3");
      MonacoEditorComponent.value = module.default;
    });
    watch(() => props.modelValue, (newValue) => {
      if (localValue.value !== newValue) {
        localValue.value = newValue || "";
      }
    });
    const handleChange = (value) => {
      localValue.value = value;
      emit("update:modelValue", value);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "border rounded-md overflow-hidden" }, _attrs))}>`);
      if (!isClient.value || !MonacoEditorComponent.value) {
        _push(`<div class="flex items-center justify-center bg-zinc-900 text-zinc-400" style="${ssrRenderStyle({ height: __props.height })}"><div class="text-center"><div class="animate-pulse">Loading editor...</div></div></div>`);
      } else {
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(MonacoEditorComponent.value), {
          value: localValue.value,
          language: __props.language,
          height: __props.height,
          theme: "vs-dark",
          options: {
            automaticLayout: true,
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            wordWrap: "on",
            wrappingIndent: "indent",
            tabSize: 2,
            insertSpaces: true
          },
          onChange: handleChange
        }, null), _parent);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/admin/MonacoEditor.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PageBuilder",
  __ssrInlineRender: true,
  props: {
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const blocks = ref(props.modelValue || []);
    const showBlockSelector = ref(false);
    const editingBlock = ref(null);
    const draggedIndex = ref(null);
    const uploadingImage = ref(false);
    const imageInputMethod = ref("url");
    watch(() => props.modelValue, (newValue) => {
      blocks.value = newValue || [];
    }, { deep: true });
    watch(blocks, (newBlocks) => {
      emit("update:modelValue", newBlocks);
    }, { deep: true });
    const blockTypes = [
      { type: "heading", label: "Heading", icon: Type, description: "Judul dengan berbagai ukuran" },
      { type: "paragraph", label: "Paragraph", icon: AlignLeft, description: "Teks paragraf biasa" },
      { type: "image", label: "Gambar", icon: Image, description: "Upload atau embed gambar" },
      { type: "list", label: "List", icon: List, description: "List berurutan atau tidak" },
      { type: "quote", label: "Quote", icon: FileText, description: "Kutipan atau highlight teks" },
      { type: "code", label: "Code", icon: Code, description: "Blok kode dengan syntax highlighting" },
      { type: "video", label: "Video", icon: Youtube, description: "Embed video YouTube" },
      { type: "divider", label: "Divider", icon: AlignLeft, description: "Garis pemisah" }
    ];
    const addBlock = (type) => {
      const newBlock = {
        id: `block-${Date.now()}-${Math.random()}`,
        type,
        content: getDefaultContent(type)
      };
      blocks.value.push(newBlock);
      showBlockSelector.value = false;
    };
    const getDefaultContent = (type) => {
      switch (type) {
        case "heading":
          return { level: 2, text: "" };
        case "paragraph":
          return { text: "" };
        case "image":
          return { url: "", alt: "", caption: "" };
        case "list":
          return { ordered: false, items: [""] };
        case "quote":
          return { text: "", author: "" };
        case "code":
          return { language: "javascript", code: "" };
        case "video":
          return { url: "" };
        case "divider":
          return {};
        default:
          return {};
      }
    };
    const removeBlock = (index) => {
      blocks.value.splice(index, 1);
    };
    const moveBlock = (index, direction) => {
      const newIndex = direction === "up" ? index - 1 : index + 1;
      if (newIndex >= 0 && newIndex < blocks.value.length) {
        [blocks.value[index], blocks.value[newIndex]] = [blocks.value[newIndex], blocks.value[index]];
      }
    };
    const editBlock = (index) => {
      const block = blocks.value[index];
      if (!block.content) {
        block.content = getDefaultContent(block.type);
      }
      editingBlock.value = { index, block: JSON.parse(JSON.stringify(block)) };
    };
    const saveBlockEdit = () => {
      if (editingBlock.value) {
        blocks.value[editingBlock.value.index] = editingBlock.value.block;
        editingBlock.value = null;
      }
    };
    const addListItem = (blockIndex) => {
      if (blocks.value[blockIndex].type === "list") {
        if (!blocks.value[blockIndex].content) {
          blocks.value[blockIndex].content = { ordered: false, items: [] };
        }
        if (!blocks.value[blockIndex].content.items) {
          blocks.value[blockIndex].content.items = [];
        }
        blocks.value[blockIndex].content.items.push("");
      }
    };
    const removeListItem = (blockIndex, itemIndex) => {
      if (blocks.value[blockIndex].type === "list" && blocks.value[blockIndex].content?.items) {
        blocks.value[blockIndex].content.items.splice(itemIndex, 1);
      }
    };
    const onDragStart = (index) => {
      draggedIndex.value = index;
    };
    const onDragOver = (event) => {
      event.preventDefault();
    };
    const onDrop = (index) => {
      if (draggedIndex.value !== null && draggedIndex.value !== index) {
        const draggedBlock = blocks.value[draggedIndex.value];
        blocks.value.splice(draggedIndex.value, 1);
        blocks.value.splice(index, 0, draggedBlock);
      }
      draggedIndex.value = null;
    };
    const getBlockLabel = (type) => {
      return blockTypes.find((bt) => bt.type === type)?.label || type;
    };
    const extractVideoId = (url) => {
      const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
      return match ? match[1] : null;
    };
    const handleImageUpload = async (event) => {
      const target = event.target;
      const file = target.files?.[0];
      if (!file || !editingBlock.value) return;
      if (!file.type.startsWith("image/")) {
        alert("File harus berupa gambar");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("Ukuran file maksimal 5MB");
        return;
      }
      uploadingImage.value = true;
      try {
        const formData = new FormData();
        formData.append("image", file);
        const response = await fetch("/admin/upload-image", {
          method: "POST",
          headers: {
            "X-CSRF-TOKEN": typeof document !== "undefined" ? document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "" : "",
            "Accept": "application/json"
          },
          body: formData
        });
        if (!response.ok) {
          throw new Error("Upload gagal");
        }
        const data = await response.json();
        if (editingBlock.value.block.type === "image") {
          editingBlock.value.block.content.url = data.url;
        }
      } catch (error) {
        console.error("Upload error:", error);
        alert("Gagal mengupload gambar. Silakan coba lagi.");
      } finally {
        uploadingImage.value = false;
        target.value = "";
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(_sfc_main$4), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$5), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center justify-between"${_scopeId2}><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Page Builder`);
                      } else {
                        return [
                          createTextVNode("Page Builder")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Bangun konten dengan blok-blok yang dapat disesuaikan`);
                      } else {
                        return [
                          createTextVNode("Bangun konten dengan blok-blok yang dapat disesuaikan")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$3), {
                    onClick: ($event) => showBlockSelector.value = true
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Plus), { class: "mr-2 h-4 w-4" }, null, _parent4, _scopeId3));
                        _push4(` Tambah Blok `);
                      } else {
                        return [
                          createVNode(unref(Plus), { class: "mr-2 h-4 w-4" }),
                          createTextVNode(" Tambah Blok ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", null, [
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode("Page Builder")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$7), null, {
                          default: withCtx(() => [
                            createTextVNode("Bangun konten dengan blok-blok yang dapat disesuaikan")
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode(unref(_sfc_main$3), {
                        onClick: ($event) => showBlockSelector.value = true
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Plus), { class: "mr-2 h-4 w-4" }),
                          createTextVNode(" Tambah Blok ")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$8), { class: "space-y-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (blocks.value.length === 0) {
                    _push3(`<div class="py-12 text-center border-2 border-dashed rounded-lg"${_scopeId2}><p class="text-muted-foreground mb-4"${_scopeId2}>Belum ada konten. Tambahkan blok untuk memulai.</p>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$3), {
                      onClick: ($event) => showBlockSelector.value = true
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Plus), { class: "mr-2 h-4 w-4" }, null, _parent4, _scopeId3));
                          _push4(` Tambah Blok Pertama `);
                        } else {
                          return [
                            createVNode(unref(Plus), { class: "mr-2 h-4 w-4" }),
                            createTextVNode(" Tambah Blok Pertama ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<!--[-->`);
                  ssrRenderList(blocks.value, (block, index) => {
                    _push3(`<div class="group relative border rounded-lg p-4 hover:border-primary transition-colors" draggable="true"${_scopeId2}><div class="absolute left-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-move"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(GripVertical), { class: "h-5 w-5 text-muted-foreground" }, null, _parent3, _scopeId2));
                    _push3(`</div><div class="pl-8"${_scopeId2}><div class="flex items-center justify-between mb-3"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$9), { variant: "secondary" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(getBlockLabel(block.type))}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(getBlockLabel(block.type)), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`<div class="flex gap-1"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$3), {
                      variant: "ghost",
                      size: "icon",
                      class: "h-8 w-8",
                      disabled: index === 0,
                      onClick: ($event) => moveBlock(index, "up")
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(ChevronUp), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(ChevronUp), { class: "h-4 w-4" })
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$3), {
                      variant: "ghost",
                      size: "icon",
                      class: "h-8 w-8",
                      disabled: index === blocks.value.length - 1,
                      onClick: ($event) => moveBlock(index, "down")
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(ChevronDown), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(ChevronDown), { class: "h-4 w-4" })
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$3), {
                      variant: "ghost",
                      size: "icon",
                      class: "h-8 w-8",
                      onClick: ($event) => editBlock(index)
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Edit), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(Edit), { class: "h-4 w-4" })
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$3), {
                      variant: "ghost",
                      size: "icon",
                      class: "h-8 w-8 text-destructive",
                      onClick: ($event) => removeBlock(index)
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Trash2), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(Trash2), { class: "h-4 w-4" })
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div></div><div class="prose prose-sm max-w-none"${_scopeId2}>`);
                    if (block.type === "heading" && block.content) {
                      ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(`h${block.content?.level || 2}`), { class: "font-bold" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(block.content?.text || "Heading kosong")}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(block.content?.text || "Heading kosong"), 1)
                            ];
                          }
                        }),
                        _: 2
                      }), _parent3, _scopeId2);
                    } else if (block.type === "paragraph" && block.content) {
                      _push3(`<div class="prose prose-sm dark:prose-invert max-w-none"${_scopeId2}>${(block.content?.text || "<p>Paragraf kosong</p>") ?? ""}</div>`);
                    } else if (block.type === "image" && block.content) {
                      _push3(`<div class="space-y-2"${_scopeId2}>`);
                      if (block.content?.url) {
                        _push3(`<img${ssrRenderAttr("src", block.content.url)}${ssrRenderAttr("alt", block.content?.alt || "")} class="rounded-lg max-h-64 object-cover"${_scopeId2}>`);
                      } else {
                        _push3(`<div class="bg-muted h-48 rounded-lg flex items-center justify-center"${_scopeId2}>`);
                        _push3(ssrRenderComponent(unref(Image), { class: "h-12 w-12 text-muted-foreground" }, null, _parent3, _scopeId2));
                        _push3(`</div>`);
                      }
                      if (block.content?.caption) {
                        _push3(`<p class="text-sm text-muted-foreground"${_scopeId2}>${ssrInterpolate(block.content.caption)}</p>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div>`);
                    } else if (block.type === "list" && block.content && !block.content.ordered) {
                      _push3(`<ul class="list-disc list-inside"${_scopeId2}><!--[-->`);
                      ssrRenderList(block.content?.items || [], (item, idx) => {
                        _push3(`<li${_scopeId2}>${ssrInterpolate(item || "Item kosong")}</li>`);
                      });
                      _push3(`<!--]--></ul>`);
                    } else if (block.type === "list" && block.content && block.content.ordered) {
                      _push3(`<ol class="list-decimal list-inside"${_scopeId2}><!--[-->`);
                      ssrRenderList(block.content?.items || [], (item, idx) => {
                        _push3(`<li${_scopeId2}>${ssrInterpolate(item || "Item kosong")}</li>`);
                      });
                      _push3(`<!--]--></ol>`);
                    } else if (block.type === "quote" && block.content) {
                      _push3(`<blockquote class="border-l-4 border-primary pl-4 italic"${_scopeId2}><p${_scopeId2}>${ssrInterpolate(block.content?.text || "Quote kosong")}</p>`);
                      if (block.content?.author) {
                        _push3(`<footer class="text-sm"${_scopeId2}>— ${ssrInterpolate(block.content.author)}</footer>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</blockquote>`);
                    } else if (block.type === "code" && block.content) {
                      _push3(`<pre class="bg-muted p-4 rounded-lg overflow-x-auto"${_scopeId2}><code${_scopeId2}>${ssrInterpolate(block.content?.code || "// Kode kosong")}</code></pre>`);
                    } else if (block.type === "video" && block.content) {
                      _push3(`<div class="aspect-video"${_scopeId2}>`);
                      if (block.content?.url && extractVideoId(block.content.url)) {
                        _push3(`<iframe${ssrRenderAttr("src", `https://www.youtube.com/embed/${extractVideoId(block.content.url)}`)} class="w-full h-full rounded-lg" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen${_scopeId2}></iframe>`);
                      } else {
                        _push3(`<div class="bg-muted h-full rounded-lg flex items-center justify-center"${_scopeId2}>`);
                        _push3(ssrRenderComponent(unref(Youtube), { class: "h-12 w-12 text-muted-foreground" }, null, _parent3, _scopeId2));
                        _push3(`</div>`);
                      }
                      _push3(`</div>`);
                    } else if (block.type === "divider") {
                      _push3(`<hr class="my-4"${_scopeId2}>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div></div></div>`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    blocks.value.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "py-12 text-center border-2 border-dashed rounded-lg"
                    }, [
                      createVNode("p", { class: "text-muted-foreground mb-4" }, "Belum ada konten. Tambahkan blok untuk memulai."),
                      createVNode(unref(_sfc_main$3), {
                        onClick: ($event) => showBlockSelector.value = true
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Plus), { class: "mr-2 h-4 w-4" }),
                          createTextVNode(" Tambah Blok Pertama ")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ])) : createCommentVNode("", true),
                    (openBlock(true), createBlock(Fragment, null, renderList(blocks.value, (block, index) => {
                      return openBlock(), createBlock("div", {
                        key: block.id,
                        class: "group relative border rounded-lg p-4 hover:border-primary transition-colors",
                        draggable: "true",
                        onDragstart: ($event) => onDragStart(index),
                        onDragover: onDragOver,
                        onDrop: ($event) => onDrop(index)
                      }, [
                        createVNode("div", { class: "absolute left-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-move" }, [
                          createVNode(unref(GripVertical), { class: "h-5 w-5 text-muted-foreground" })
                        ]),
                        createVNode("div", { class: "pl-8" }, [
                          createVNode("div", { class: "flex items-center justify-between mb-3" }, [
                            createVNode(unref(_sfc_main$9), { variant: "secondary" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(getBlockLabel(block.type)), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode("div", { class: "flex gap-1" }, [
                              createVNode(unref(_sfc_main$3), {
                                variant: "ghost",
                                size: "icon",
                                class: "h-8 w-8",
                                disabled: index === 0,
                                onClick: ($event) => moveBlock(index, "up")
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(ChevronUp), { class: "h-4 w-4" })
                                ]),
                                _: 1
                              }, 8, ["disabled", "onClick"]),
                              createVNode(unref(_sfc_main$3), {
                                variant: "ghost",
                                size: "icon",
                                class: "h-8 w-8",
                                disabled: index === blocks.value.length - 1,
                                onClick: ($event) => moveBlock(index, "down")
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(ChevronDown), { class: "h-4 w-4" })
                                ]),
                                _: 1
                              }, 8, ["disabled", "onClick"]),
                              createVNode(unref(_sfc_main$3), {
                                variant: "ghost",
                                size: "icon",
                                class: "h-8 w-8",
                                onClick: ($event) => editBlock(index)
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Edit), { class: "h-4 w-4" })
                                ]),
                                _: 1
                              }, 8, ["onClick"]),
                              createVNode(unref(_sfc_main$3), {
                                variant: "ghost",
                                size: "icon",
                                class: "h-8 w-8 text-destructive",
                                onClick: ($event) => removeBlock(index)
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Trash2), { class: "h-4 w-4" })
                                ]),
                                _: 1
                              }, 8, ["onClick"])
                            ])
                          ]),
                          createVNode("div", { class: "prose prose-sm max-w-none" }, [
                            block.type === "heading" && block.content ? (openBlock(), createBlock(resolveDynamicComponent(`h${block.content?.level || 2}`), {
                              key: 0,
                              class: "font-bold"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(block.content?.text || "Heading kosong"), 1)
                              ]),
                              _: 2
                            }, 1024)) : block.type === "paragraph" && block.content ? (openBlock(), createBlock("div", {
                              key: 1,
                              class: "prose prose-sm dark:prose-invert max-w-none",
                              innerHTML: block.content?.text || "<p>Paragraf kosong</p>"
                            }, null, 8, ["innerHTML"])) : block.type === "image" && block.content ? (openBlock(), createBlock("div", {
                              key: 2,
                              class: "space-y-2"
                            }, [
                              block.content?.url ? (openBlock(), createBlock("img", {
                                key: 0,
                                src: block.content.url,
                                alt: block.content?.alt || "",
                                class: "rounded-lg max-h-64 object-cover"
                              }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "bg-muted h-48 rounded-lg flex items-center justify-center"
                              }, [
                                createVNode(unref(Image), { class: "h-12 w-12 text-muted-foreground" })
                              ])),
                              block.content?.caption ? (openBlock(), createBlock("p", {
                                key: 2,
                                class: "text-sm text-muted-foreground"
                              }, toDisplayString(block.content.caption), 1)) : createCommentVNode("", true)
                            ])) : block.type === "list" && block.content && !block.content.ordered ? (openBlock(), createBlock("ul", {
                              key: 3,
                              class: "list-disc list-inside"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(block.content?.items || [], (item, idx) => {
                                return openBlock(), createBlock("li", { key: idx }, toDisplayString(item || "Item kosong"), 1);
                              }), 128))
                            ])) : block.type === "list" && block.content && block.content.ordered ? (openBlock(), createBlock("ol", {
                              key: 4,
                              class: "list-decimal list-inside"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(block.content?.items || [], (item, idx) => {
                                return openBlock(), createBlock("li", { key: idx }, toDisplayString(item || "Item kosong"), 1);
                              }), 128))
                            ])) : block.type === "quote" && block.content ? (openBlock(), createBlock("blockquote", {
                              key: 5,
                              class: "border-l-4 border-primary pl-4 italic"
                            }, [
                              createVNode("p", null, toDisplayString(block.content?.text || "Quote kosong"), 1),
                              block.content?.author ? (openBlock(), createBlock("footer", {
                                key: 0,
                                class: "text-sm"
                              }, "— " + toDisplayString(block.content.author), 1)) : createCommentVNode("", true)
                            ])) : block.type === "code" && block.content ? (openBlock(), createBlock("pre", {
                              key: 6,
                              class: "bg-muted p-4 rounded-lg overflow-x-auto"
                            }, [
                              createVNode("code", null, toDisplayString(block.content?.code || "// Kode kosong"), 1)
                            ])) : block.type === "video" && block.content ? (openBlock(), createBlock("div", {
                              key: 7,
                              class: "aspect-video"
                            }, [
                              block.content?.url && extractVideoId(block.content.url) ? (openBlock(), createBlock("iframe", {
                                key: 0,
                                src: `https://www.youtube.com/embed/${extractVideoId(block.content.url)}`,
                                class: "w-full h-full rounded-lg",
                                frameborder: "0",
                                allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                                allowfullscreen: ""
                              }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "bg-muted h-full rounded-lg flex items-center justify-center"
                              }, [
                                createVNode(unref(Youtube), { class: "h-12 w-12 text-muted-foreground" })
                              ]))
                            ])) : block.type === "divider" ? (openBlock(), createBlock("hr", {
                              key: 8,
                              class: "my-4"
                            })) : createCommentVNode("", true)
                          ])
                        ])
                      ], 40, ["onDragstart", "onDrop"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$5), null, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("div", null, [
                      createVNode(unref(_sfc_main$6), null, {
                        default: withCtx(() => [
                          createTextVNode("Page Builder")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), null, {
                        default: withCtx(() => [
                          createTextVNode("Bangun konten dengan blok-blok yang dapat disesuaikan")
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode(unref(_sfc_main$3), {
                      onClick: ($event) => showBlockSelector.value = true
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Plus), { class: "mr-2 h-4 w-4" }),
                        createTextVNode(" Tambah Blok ")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ])
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$8), { class: "space-y-4" }, {
                default: withCtx(() => [
                  blocks.value.length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "py-12 text-center border-2 border-dashed rounded-lg"
                  }, [
                    createVNode("p", { class: "text-muted-foreground mb-4" }, "Belum ada konten. Tambahkan blok untuk memulai."),
                    createVNode(unref(_sfc_main$3), {
                      onClick: ($event) => showBlockSelector.value = true
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Plus), { class: "mr-2 h-4 w-4" }),
                        createTextVNode(" Tambah Blok Pertama ")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ])) : createCommentVNode("", true),
                  (openBlock(true), createBlock(Fragment, null, renderList(blocks.value, (block, index) => {
                    return openBlock(), createBlock("div", {
                      key: block.id,
                      class: "group relative border rounded-lg p-4 hover:border-primary transition-colors",
                      draggable: "true",
                      onDragstart: ($event) => onDragStart(index),
                      onDragover: onDragOver,
                      onDrop: ($event) => onDrop(index)
                    }, [
                      createVNode("div", { class: "absolute left-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-move" }, [
                        createVNode(unref(GripVertical), { class: "h-5 w-5 text-muted-foreground" })
                      ]),
                      createVNode("div", { class: "pl-8" }, [
                        createVNode("div", { class: "flex items-center justify-between mb-3" }, [
                          createVNode(unref(_sfc_main$9), { variant: "secondary" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(getBlockLabel(block.type)), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode("div", { class: "flex gap-1" }, [
                            createVNode(unref(_sfc_main$3), {
                              variant: "ghost",
                              size: "icon",
                              class: "h-8 w-8",
                              disabled: index === 0,
                              onClick: ($event) => moveBlock(index, "up")
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(ChevronUp), { class: "h-4 w-4" })
                              ]),
                              _: 1
                            }, 8, ["disabled", "onClick"]),
                            createVNode(unref(_sfc_main$3), {
                              variant: "ghost",
                              size: "icon",
                              class: "h-8 w-8",
                              disabled: index === blocks.value.length - 1,
                              onClick: ($event) => moveBlock(index, "down")
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(ChevronDown), { class: "h-4 w-4" })
                              ]),
                              _: 1
                            }, 8, ["disabled", "onClick"]),
                            createVNode(unref(_sfc_main$3), {
                              variant: "ghost",
                              size: "icon",
                              class: "h-8 w-8",
                              onClick: ($event) => editBlock(index)
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Edit), { class: "h-4 w-4" })
                              ]),
                              _: 1
                            }, 8, ["onClick"]),
                            createVNode(unref(_sfc_main$3), {
                              variant: "ghost",
                              size: "icon",
                              class: "h-8 w-8 text-destructive",
                              onClick: ($event) => removeBlock(index)
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Trash2), { class: "h-4 w-4" })
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ])
                        ]),
                        createVNode("div", { class: "prose prose-sm max-w-none" }, [
                          block.type === "heading" && block.content ? (openBlock(), createBlock(resolveDynamicComponent(`h${block.content?.level || 2}`), {
                            key: 0,
                            class: "font-bold"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(block.content?.text || "Heading kosong"), 1)
                            ]),
                            _: 2
                          }, 1024)) : block.type === "paragraph" && block.content ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "prose prose-sm dark:prose-invert max-w-none",
                            innerHTML: block.content?.text || "<p>Paragraf kosong</p>"
                          }, null, 8, ["innerHTML"])) : block.type === "image" && block.content ? (openBlock(), createBlock("div", {
                            key: 2,
                            class: "space-y-2"
                          }, [
                            block.content?.url ? (openBlock(), createBlock("img", {
                              key: 0,
                              src: block.content.url,
                              alt: block.content?.alt || "",
                              class: "rounded-lg max-h-64 object-cover"
                            }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "bg-muted h-48 rounded-lg flex items-center justify-center"
                            }, [
                              createVNode(unref(Image), { class: "h-12 w-12 text-muted-foreground" })
                            ])),
                            block.content?.caption ? (openBlock(), createBlock("p", {
                              key: 2,
                              class: "text-sm text-muted-foreground"
                            }, toDisplayString(block.content.caption), 1)) : createCommentVNode("", true)
                          ])) : block.type === "list" && block.content && !block.content.ordered ? (openBlock(), createBlock("ul", {
                            key: 3,
                            class: "list-disc list-inside"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(block.content?.items || [], (item, idx) => {
                              return openBlock(), createBlock("li", { key: idx }, toDisplayString(item || "Item kosong"), 1);
                            }), 128))
                          ])) : block.type === "list" && block.content && block.content.ordered ? (openBlock(), createBlock("ol", {
                            key: 4,
                            class: "list-decimal list-inside"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(block.content?.items || [], (item, idx) => {
                              return openBlock(), createBlock("li", { key: idx }, toDisplayString(item || "Item kosong"), 1);
                            }), 128))
                          ])) : block.type === "quote" && block.content ? (openBlock(), createBlock("blockquote", {
                            key: 5,
                            class: "border-l-4 border-primary pl-4 italic"
                          }, [
                            createVNode("p", null, toDisplayString(block.content?.text || "Quote kosong"), 1),
                            block.content?.author ? (openBlock(), createBlock("footer", {
                              key: 0,
                              class: "text-sm"
                            }, "— " + toDisplayString(block.content.author), 1)) : createCommentVNode("", true)
                          ])) : block.type === "code" && block.content ? (openBlock(), createBlock("pre", {
                            key: 6,
                            class: "bg-muted p-4 rounded-lg overflow-x-auto"
                          }, [
                            createVNode("code", null, toDisplayString(block.content?.code || "// Kode kosong"), 1)
                          ])) : block.type === "video" && block.content ? (openBlock(), createBlock("div", {
                            key: 7,
                            class: "aspect-video"
                          }, [
                            block.content?.url && extractVideoId(block.content.url) ? (openBlock(), createBlock("iframe", {
                              key: 0,
                              src: `https://www.youtube.com/embed/${extractVideoId(block.content.url)}`,
                              class: "w-full h-full rounded-lg",
                              frameborder: "0",
                              allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                              allowfullscreen: ""
                            }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "bg-muted h-full rounded-lg flex items-center justify-center"
                            }, [
                              createVNode(unref(Youtube), { class: "h-12 w-12 text-muted-foreground" })
                            ]))
                          ])) : block.type === "divider" ? (openBlock(), createBlock("hr", {
                            key: 8,
                            class: "my-4"
                          })) : createCommentVNode("", true)
                        ])
                      ])
                    ], 40, ["onDragstart", "onDrop"]);
                  }), 128))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$a), {
        open: showBlockSelector.value,
        "onUpdate:open": ($event) => showBlockSelector.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$b), { class: "max-w-7xl" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$c), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$d), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Pilih Tipe Blok`);
                            } else {
                              return [
                                createTextVNode("Pilih Tipe Blok")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$e), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Pilih blok yang ingin ditambahkan ke konten`);
                            } else {
                              return [
                                createTextVNode("Pilih blok yang ingin ditambahkan ke konten")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$d), null, {
                            default: withCtx(() => [
                              createTextVNode("Pilih Tipe Blok")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$e), null, {
                            default: withCtx(() => [
                              createTextVNode("Pilih blok yang ingin ditambahkan ke konten")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="grid grid-cols-2 md:grid-cols-4 gap-4"${_scopeId2}><!--[-->`);
                  ssrRenderList(blockTypes, (blockType) => {
                    _push3(`<button class="flex flex-col items-center gap-2 p-4 border rounded-lg hover:border-primary hover:bg-accent transition-colors"${_scopeId2}>`);
                    ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(blockType.icon), { class: "h-8 w-8" }, null), _parent3, _scopeId2);
                    _push3(`<span class="font-medium"${_scopeId2}>${ssrInterpolate(blockType.label)}</span><span class="text-xs text-muted-foreground text-center"${_scopeId2}>${ssrInterpolate(blockType.description)}</span></button>`);
                  });
                  _push3(`<!--]--></div>`);
                } else {
                  return [
                    createVNode(unref(_sfc_main$c), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$d), null, {
                          default: withCtx(() => [
                            createTextVNode("Pilih Tipe Blok")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$e), null, {
                          default: withCtx(() => [
                            createTextVNode("Pilih blok yang ingin ditambahkan ke konten")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "grid grid-cols-2 md:grid-cols-4 gap-4" }, [
                      (openBlock(), createBlock(Fragment, null, renderList(blockTypes, (blockType) => {
                        return createVNode("button", {
                          key: blockType.type,
                          class: "flex flex-col items-center gap-2 p-4 border rounded-lg hover:border-primary hover:bg-accent transition-colors",
                          onClick: ($event) => addBlock(blockType.type)
                        }, [
                          (openBlock(), createBlock(resolveDynamicComponent(blockType.icon), { class: "h-8 w-8" })),
                          createVNode("span", { class: "font-medium" }, toDisplayString(blockType.label), 1),
                          createVNode("span", { class: "text-xs text-muted-foreground text-center" }, toDisplayString(blockType.description), 1)
                        ], 8, ["onClick"]);
                      }), 64))
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$b), { class: "max-w-7xl" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$c), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$d), null, {
                        default: withCtx(() => [
                          createTextVNode("Pilih Tipe Blok")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$e), null, {
                        default: withCtx(() => [
                          createTextVNode("Pilih blok yang ingin ditambahkan ke konten")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "grid grid-cols-2 md:grid-cols-4 gap-4" }, [
                    (openBlock(), createBlock(Fragment, null, renderList(blockTypes, (blockType) => {
                      return createVNode("button", {
                        key: blockType.type,
                        class: "flex flex-col items-center gap-2 p-4 border rounded-lg hover:border-primary hover:bg-accent transition-colors",
                        onClick: ($event) => addBlock(blockType.type)
                      }, [
                        (openBlock(), createBlock(resolveDynamicComponent(blockType.icon), { class: "h-8 w-8" })),
                        createVNode("span", { class: "font-medium" }, toDisplayString(blockType.label), 1),
                        createVNode("span", { class: "text-xs text-muted-foreground text-center" }, toDisplayString(blockType.description), 1)
                      ], 8, ["onClick"]);
                    }), 64))
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$a), {
        open: editingBlock.value !== null,
        "onUpdate:open": ($event) => editingBlock.value = null
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$b), { class: "max-w-7xl max-h-[80vh] overflow-y-auto" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$c), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$d), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Edit ${ssrInterpolate(editingBlock.value ? getBlockLabel(editingBlock.value.block.type) : "")}`);
                            } else {
                              return [
                                createTextVNode("Edit " + toDisplayString(editingBlock.value ? getBlockLabel(editingBlock.value.block.type) : ""), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$d), null, {
                            default: withCtx(() => [
                              createTextVNode("Edit " + toDisplayString(editingBlock.value ? getBlockLabel(editingBlock.value.block.type) : ""), 1)
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (editingBlock.value) {
                    _push3(`<div class="space-y-4"${_scopeId2}>`);
                    if (editingBlock.value.block.type === "heading") {
                      _push3(`<div class="space-y-4"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$f), null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Ukuran Heading`);
                          } else {
                            return [
                              createTextVNode("Ukuran Heading")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(unref(_sfc_main$g), {
                        modelValue: editingBlock.value.block.content.level,
                        "onUpdate:modelValue": ($event) => editingBlock.value.block.content.level = $event
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(_sfc_main$h), null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(unref(_sfc_main$i), { placeholder: "Pilih ukuran" }, null, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(unref(_sfc_main$i), { placeholder: "Pilih ukuran" })
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(unref(_sfc_main$j), null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(unref(_sfc_main$k), { value: 1 }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`H1 - Heading 1`);
                                      } else {
                                        return [
                                          createTextVNode("H1 - Heading 1")
                                        ];
                                      }
                                    }),
                                    _: 1
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(unref(_sfc_main$k), { value: 2 }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`H2 - Heading 2`);
                                      } else {
                                        return [
                                          createTextVNode("H2 - Heading 2")
                                        ];
                                      }
                                    }),
                                    _: 1
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(unref(_sfc_main$k), { value: 3 }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`H3 - Heading 3`);
                                      } else {
                                        return [
                                          createTextVNode("H3 - Heading 3")
                                        ];
                                      }
                                    }),
                                    _: 1
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(unref(_sfc_main$k), { value: 4 }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`H4 - Heading 4`);
                                      } else {
                                        return [
                                          createTextVNode("H4 - Heading 4")
                                        ];
                                      }
                                    }),
                                    _: 1
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(unref(_sfc_main$k), { value: 5 }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`H5 - Heading 5`);
                                      } else {
                                        return [
                                          createTextVNode("H5 - Heading 5")
                                        ];
                                      }
                                    }),
                                    _: 1
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(unref(_sfc_main$k), { value: 6 }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`H6 - Heading 6`);
                                      } else {
                                        return [
                                          createTextVNode("H6 - Heading 6")
                                        ];
                                      }
                                    }),
                                    _: 1
                                  }, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(unref(_sfc_main$k), { value: 1 }, {
                                      default: withCtx(() => [
                                        createTextVNode("H1 - Heading 1")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$k), { value: 2 }, {
                                      default: withCtx(() => [
                                        createTextVNode("H2 - Heading 2")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$k), { value: 3 }, {
                                      default: withCtx(() => [
                                        createTextVNode("H3 - Heading 3")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$k), { value: 4 }, {
                                      default: withCtx(() => [
                                        createTextVNode("H4 - Heading 4")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$k), { value: 5 }, {
                                      default: withCtx(() => [
                                        createTextVNode("H5 - Heading 5")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$k), { value: 6 }, {
                                      default: withCtx(() => [
                                        createTextVNode("H6 - Heading 6")
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
                              createVNode(unref(_sfc_main$h), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$i), { placeholder: "Pilih ukuran" })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$j), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$k), { value: 1 }, {
                                    default: withCtx(() => [
                                      createTextVNode("H1 - Heading 1")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$k), { value: 2 }, {
                                    default: withCtx(() => [
                                      createTextVNode("H2 - Heading 2")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$k), { value: 3 }, {
                                    default: withCtx(() => [
                                      createTextVNode("H3 - Heading 3")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$k), { value: 4 }, {
                                    default: withCtx(() => [
                                      createTextVNode("H4 - Heading 4")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$k), { value: 5 }, {
                                    default: withCtx(() => [
                                      createTextVNode("H5 - Heading 5")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$k), { value: 6 }, {
                                    default: withCtx(() => [
                                      createTextVNode("H6 - Heading 6")
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
                      _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$f), null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Teks Heading`);
                          } else {
                            return [
                              createTextVNode("Teks Heading")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(unref(_sfc_main$l), {
                        modelValue: editingBlock.value.block.content.text,
                        "onUpdate:modelValue": ($event) => editingBlock.value.block.content.text = $event,
                        placeholder: "Masukkan teks heading"
                      }, null, _parent3, _scopeId2));
                      _push3(`</div></div>`);
                    } else if (editingBlock.value.block.type === "paragraph") {
                      _push3(`<div class="space-y-2"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$f), null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Konten Paragraf`);
                          } else {
                            return [
                              createTextVNode("Konten Paragraf")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_sfc_main$2, {
                        modelValue: editingBlock.value.block.content.text,
                        "onUpdate:modelValue": ($event) => editingBlock.value.block.content.text = $event
                      }, null, _parent3, _scopeId2));
                      _push3(`<p class="text-xs text-muted-foreground"${_scopeId2}>Gunakan toolbar untuk memformat teks dengan rich text editor</p></div>`);
                    } else if (editingBlock.value.block.type === "image") {
                      _push3(`<div class="space-y-4"${_scopeId2}><div class="flex gap-2 p-1 bg-muted rounded-lg"${_scopeId2}><button type="button" class="${ssrRenderClass([
                        "flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                        imageInputMethod.value === "url" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                      ])}"${_scopeId2}> URL </button><button type="button" class="${ssrRenderClass([
                        "flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                        imageInputMethod.value === "upload" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                      ])}"${_scopeId2}> Upload File </button></div>`);
                      if (imageInputMethod.value === "url") {
                        _push3(`<div class="space-y-2"${_scopeId2}>`);
                        _push3(ssrRenderComponent(unref(_sfc_main$f), null, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`URL Gambar`);
                            } else {
                              return [
                                createTextVNode("URL Gambar")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent3, _scopeId2));
                        _push3(ssrRenderComponent(unref(_sfc_main$l), {
                          modelValue: editingBlock.value.block.content.url,
                          "onUpdate:modelValue": ($event) => editingBlock.value.block.content.url = $event,
                          placeholder: "https://example.com/image.jpg"
                        }, null, _parent3, _scopeId2));
                        _push3(`<p class="text-xs text-muted-foreground"${_scopeId2}>Masukkan URL gambar dari internet</p></div>`);
                      } else {
                        _push3(`<div class="space-y-2"${_scopeId2}>`);
                        _push3(ssrRenderComponent(unref(_sfc_main$f), null, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`Upload Gambar`);
                            } else {
                              return [
                                createTextVNode("Upload Gambar")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent3, _scopeId2));
                        _push3(`<div class="space-y-2"${_scopeId2}><input type="file" accept="image/*"${ssrIncludeBooleanAttr(uploadingImage.value) ? " disabled" : ""} class="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 file:cursor-pointer disabled:opacity-50"${_scopeId2}><p class="text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(uploadingImage.value ? "Mengupload..." : "Format: JPG, PNG, GIF, WEBP. Maksimal 5MB")}</p></div>`);
                        if (editingBlock.value.block.content.url) {
                          _push3(`<div class="mt-2"${_scopeId2}>`);
                          _push3(ssrRenderComponent(unref(_sfc_main$f), { class: "text-xs" }, {
                            default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                              if (_push4) {
                                _push4(`Preview:`);
                              } else {
                                return [
                                  createTextVNode("Preview:")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent3, _scopeId2));
                          _push3(`<img${ssrRenderAttr("src", editingBlock.value.block.content.url)} alt="Preview" class="mt-1 max-h-40 rounded-md border"${_scopeId2}></div>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        _push3(`</div>`);
                      }
                      _push3(`<div class="space-y-2"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$f), null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Alt Text`);
                          } else {
                            return [
                              createTextVNode("Alt Text")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(unref(_sfc_main$l), {
                        modelValue: editingBlock.value.block.content.alt,
                        "onUpdate:modelValue": ($event) => editingBlock.value.block.content.alt = $event,
                        placeholder: "Deskripsi gambar"
                      }, null, _parent3, _scopeId2));
                      _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$f), null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Caption (Opsional)`);
                          } else {
                            return [
                              createTextVNode("Caption (Opsional)")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(unref(_sfc_main$l), {
                        modelValue: editingBlock.value.block.content.caption,
                        "onUpdate:modelValue": ($event) => editingBlock.value.block.content.caption = $event,
                        placeholder: "Caption gambar"
                      }, null, _parent3, _scopeId2));
                      _push3(`</div></div>`);
                    } else if (editingBlock.value.block.type === "list") {
                      _push3(`<div class="space-y-4"${_scopeId2}><div class="flex items-center space-x-2"${_scopeId2}><input type="checkbox"${ssrIncludeBooleanAttr(editingBlock.value.block.content.ordered) ? " checked" : ""} class="rounded"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$f), null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`List Berurutan (Numbered)`);
                          } else {
                            return [
                              createTextVNode("List Berurutan (Numbered)")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$f), null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Items`);
                          } else {
                            return [
                              createTextVNode("Items")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(`<!--[-->`);
                      ssrRenderList(editingBlock.value.block.content.items, (item, idx) => {
                        _push3(`<div class="flex gap-2"${_scopeId2}>`);
                        _push3(ssrRenderComponent(unref(_sfc_main$l), {
                          modelValue: editingBlock.value.block.content.items[idx],
                          "onUpdate:modelValue": ($event) => editingBlock.value.block.content.items[idx] = $event,
                          placeholder: "Item list"
                        }, null, _parent3, _scopeId2));
                        _push3(ssrRenderComponent(unref(_sfc_main$3), {
                          variant: "ghost",
                          size: "icon",
                          onClick: ($event) => removeListItem(editingBlock.value.index, idx),
                          disabled: editingBlock.value.block.content.items.length <= 1
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(ssrRenderComponent(unref(Trash2), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                            } else {
                              return [
                                createVNode(unref(Trash2), { class: "h-4 w-4" })
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                        _push3(`</div>`);
                      });
                      _push3(`<!--]-->`);
                      _push3(ssrRenderComponent(unref(_sfc_main$3), {
                        variant: "outline",
                        size: "sm",
                        onClick: ($event) => addListItem(editingBlock.value.index)
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(Plus), { class: "mr-2 h-4 w-4" }, null, _parent4, _scopeId3));
                            _push4(` Tambah Item `);
                          } else {
                            return [
                              createVNode(unref(Plus), { class: "mr-2 h-4 w-4" }),
                              createTextVNode(" Tambah Item ")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(`</div></div>`);
                    } else if (editingBlock.value.block.type === "quote") {
                      _push3(`<div class="space-y-4"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$f), null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Teks Quote`);
                          } else {
                            return [
                              createTextVNode("Teks Quote")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(unref(_sfc_main$m), {
                        modelValue: editingBlock.value.block.content.text,
                        "onUpdate:modelValue": ($event) => editingBlock.value.block.content.text = $event,
                        rows: "4",
                        placeholder: "Masukkan quote"
                      }, null, _parent3, _scopeId2));
                      _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$f), null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Author (Opsional)`);
                          } else {
                            return [
                              createTextVNode("Author (Opsional)")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(unref(_sfc_main$l), {
                        modelValue: editingBlock.value.block.content.author,
                        "onUpdate:modelValue": ($event) => editingBlock.value.block.content.author = $event,
                        placeholder: "Nama author"
                      }, null, _parent3, _scopeId2));
                      _push3(`</div></div>`);
                    } else if (editingBlock.value.block.type === "code") {
                      _push3(`<div class="space-y-4"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$f), null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Bahasa`);
                          } else {
                            return [
                              createTextVNode("Bahasa")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(unref(_sfc_main$g), {
                        modelValue: editingBlock.value.block.content.language,
                        "onUpdate:modelValue": ($event) => editingBlock.value.block.content.language = $event
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(_sfc_main$h), null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(unref(_sfc_main$i), { placeholder: "Pilih bahasa" }, null, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(unref(_sfc_main$i), { placeholder: "Pilih bahasa" })
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(unref(_sfc_main$j), null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(unref(_sfc_main$k), { value: "javascript" }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`JavaScript`);
                                      } else {
                                        return [
                                          createTextVNode("JavaScript")
                                        ];
                                      }
                                    }),
                                    _: 1
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(unref(_sfc_main$k), { value: "typescript" }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`TypeScript`);
                                      } else {
                                        return [
                                          createTextVNode("TypeScript")
                                        ];
                                      }
                                    }),
                                    _: 1
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(unref(_sfc_main$k), { value: "php" }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`PHP`);
                                      } else {
                                        return [
                                          createTextVNode("PHP")
                                        ];
                                      }
                                    }),
                                    _: 1
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(unref(_sfc_main$k), { value: "python" }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`Python`);
                                      } else {
                                        return [
                                          createTextVNode("Python")
                                        ];
                                      }
                                    }),
                                    _: 1
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(unref(_sfc_main$k), { value: "html" }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`HTML`);
                                      } else {
                                        return [
                                          createTextVNode("HTML")
                                        ];
                                      }
                                    }),
                                    _: 1
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(unref(_sfc_main$k), { value: "css" }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`CSS`);
                                      } else {
                                        return [
                                          createTextVNode("CSS")
                                        ];
                                      }
                                    }),
                                    _: 1
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(unref(_sfc_main$k), { value: "sql" }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`SQL`);
                                      } else {
                                        return [
                                          createTextVNode("SQL")
                                        ];
                                      }
                                    }),
                                    _: 1
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(unref(_sfc_main$k), { value: "bash" }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`Bash`);
                                      } else {
                                        return [
                                          createTextVNode("Bash")
                                        ];
                                      }
                                    }),
                                    _: 1
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(unref(_sfc_main$k), { value: "json" }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`JSON`);
                                      } else {
                                        return [
                                          createTextVNode("JSON")
                                        ];
                                      }
                                    }),
                                    _: 1
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(unref(_sfc_main$k), { value: "xml" }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`XML`);
                                      } else {
                                        return [
                                          createTextVNode("XML")
                                        ];
                                      }
                                    }),
                                    _: 1
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(unref(_sfc_main$k), { value: "markdown" }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`Markdown`);
                                      } else {
                                        return [
                                          createTextVNode("Markdown")
                                        ];
                                      }
                                    }),
                                    _: 1
                                  }, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(unref(_sfc_main$k), { value: "javascript" }, {
                                      default: withCtx(() => [
                                        createTextVNode("JavaScript")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$k), { value: "typescript" }, {
                                      default: withCtx(() => [
                                        createTextVNode("TypeScript")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$k), { value: "php" }, {
                                      default: withCtx(() => [
                                        createTextVNode("PHP")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$k), { value: "python" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Python")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$k), { value: "html" }, {
                                      default: withCtx(() => [
                                        createTextVNode("HTML")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$k), { value: "css" }, {
                                      default: withCtx(() => [
                                        createTextVNode("CSS")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$k), { value: "sql" }, {
                                      default: withCtx(() => [
                                        createTextVNode("SQL")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$k), { value: "bash" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Bash")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$k), { value: "json" }, {
                                      default: withCtx(() => [
                                        createTextVNode("JSON")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$k), { value: "xml" }, {
                                      default: withCtx(() => [
                                        createTextVNode("XML")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$k), { value: "markdown" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Markdown")
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
                              createVNode(unref(_sfc_main$h), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$i), { placeholder: "Pilih bahasa" })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$j), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$k), { value: "javascript" }, {
                                    default: withCtx(() => [
                                      createTextVNode("JavaScript")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$k), { value: "typescript" }, {
                                    default: withCtx(() => [
                                      createTextVNode("TypeScript")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$k), { value: "php" }, {
                                    default: withCtx(() => [
                                      createTextVNode("PHP")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$k), { value: "python" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Python")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$k), { value: "html" }, {
                                    default: withCtx(() => [
                                      createTextVNode("HTML")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$k), { value: "css" }, {
                                    default: withCtx(() => [
                                      createTextVNode("CSS")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$k), { value: "sql" }, {
                                    default: withCtx(() => [
                                      createTextVNode("SQL")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$k), { value: "bash" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Bash")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$k), { value: "json" }, {
                                    default: withCtx(() => [
                                      createTextVNode("JSON")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$k), { value: "xml" }, {
                                    default: withCtx(() => [
                                      createTextVNode("XML")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$k), { value: "markdown" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Markdown")
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
                      _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$f), null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Kode`);
                          } else {
                            return [
                              createTextVNode("Kode")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_sfc_main$1, {
                        modelValue: editingBlock.value.block.content.code,
                        "onUpdate:modelValue": ($event) => editingBlock.value.block.content.code = $event,
                        language: editingBlock.value.block.content.language || "javascript",
                        height: "300px"
                      }, null, _parent3, _scopeId2));
                      _push3(`</div></div>`);
                    } else if (editingBlock.value.block.type === "video") {
                      _push3(`<div class="space-y-2"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$f), null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`URL Video YouTube`);
                          } else {
                            return [
                              createTextVNode("URL Video YouTube")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(unref(_sfc_main$l), {
                        modelValue: editingBlock.value.block.content.url,
                        "onUpdate:modelValue": ($event) => editingBlock.value.block.content.url = $event,
                        placeholder: "https://www.youtube.com/watch?v=..."
                      }, null, _parent3, _scopeId2));
                      _push3(`<p class="text-sm text-muted-foreground"${_scopeId2}>Masukkan URL video YouTube lengkap</p></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(unref(_sfc_main$n), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$3), {
                          variant: "outline",
                          onClick: ($event) => editingBlock.value = null
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Batal`);
                            } else {
                              return [
                                createTextVNode("Batal")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$3), { onClick: saveBlockEdit }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Simpan`);
                            } else {
                              return [
                                createTextVNode("Simpan")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$3), {
                            variant: "outline",
                            onClick: ($event) => editingBlock.value = null
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Batal")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(unref(_sfc_main$3), { onClick: saveBlockEdit }, {
                            default: withCtx(() => [
                              createTextVNode("Simpan")
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
                    createVNode(unref(_sfc_main$c), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$d), null, {
                          default: withCtx(() => [
                            createTextVNode("Edit " + toDisplayString(editingBlock.value ? getBlockLabel(editingBlock.value.block.type) : ""), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    editingBlock.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-4"
                    }, [
                      editingBlock.value.block.type === "heading" ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "space-y-4"
                      }, [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$f), null, {
                            default: withCtx(() => [
                              createTextVNode("Ukuran Heading")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$g), {
                            modelValue: editingBlock.value.block.content.level,
                            "onUpdate:modelValue": ($event) => editingBlock.value.block.content.level = $event
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$h), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$i), { placeholder: "Pilih ukuran" })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$j), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$k), { value: 1 }, {
                                    default: withCtx(() => [
                                      createTextVNode("H1 - Heading 1")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$k), { value: 2 }, {
                                    default: withCtx(() => [
                                      createTextVNode("H2 - Heading 2")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$k), { value: 3 }, {
                                    default: withCtx(() => [
                                      createTextVNode("H3 - Heading 3")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$k), { value: 4 }, {
                                    default: withCtx(() => [
                                      createTextVNode("H4 - Heading 4")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$k), { value: 5 }, {
                                    default: withCtx(() => [
                                      createTextVNode("H5 - Heading 5")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$k), { value: 6 }, {
                                    default: withCtx(() => [
                                      createTextVNode("H6 - Heading 6")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$f), null, {
                            default: withCtx(() => [
                              createTextVNode("Teks Heading")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$l), {
                            modelValue: editingBlock.value.block.content.text,
                            "onUpdate:modelValue": ($event) => editingBlock.value.block.content.text = $event,
                            placeholder: "Masukkan teks heading"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ])) : editingBlock.value.block.type === "paragraph" ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "space-y-2"
                      }, [
                        createVNode(unref(_sfc_main$f), null, {
                          default: withCtx(() => [
                            createTextVNode("Konten Paragraf")
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$2, {
                          modelValue: editingBlock.value.block.content.text,
                          "onUpdate:modelValue": ($event) => editingBlock.value.block.content.text = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, "Gunakan toolbar untuk memformat teks dengan rich text editor")
                      ])) : editingBlock.value.block.type === "image" ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "space-y-4"
                      }, [
                        createVNode("div", { class: "flex gap-2 p-1 bg-muted rounded-lg" }, [
                          createVNode("button", {
                            type: "button",
                            onClick: ($event) => imageInputMethod.value = "url",
                            class: [
                              "flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                              imageInputMethod.value === "url" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                            ]
                          }, " URL ", 10, ["onClick"]),
                          createVNode("button", {
                            type: "button",
                            onClick: ($event) => imageInputMethod.value = "upload",
                            class: [
                              "flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                              imageInputMethod.value === "upload" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                            ]
                          }, " Upload File ", 10, ["onClick"])
                        ]),
                        imageInputMethod.value === "url" ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "space-y-2"
                        }, [
                          createVNode(unref(_sfc_main$f), null, {
                            default: withCtx(() => [
                              createTextVNode("URL Gambar")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$l), {
                            modelValue: editingBlock.value.block.content.url,
                            "onUpdate:modelValue": ($event) => editingBlock.value.block.content.url = $event,
                            placeholder: "https://example.com/image.jpg"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Masukkan URL gambar dari internet")
                        ])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "space-y-2"
                        }, [
                          createVNode(unref(_sfc_main$f), null, {
                            default: withCtx(() => [
                              createTextVNode("Upload Gambar")
                            ]),
                            _: 1
                          }),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("input", {
                              type: "file",
                              accept: "image/*",
                              onChange: handleImageUpload,
                              disabled: uploadingImage.value,
                              class: "block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 file:cursor-pointer disabled:opacity-50"
                            }, null, 40, ["disabled"]),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(uploadingImage.value ? "Mengupload..." : "Format: JPG, PNG, GIF, WEBP. Maksimal 5MB"), 1)
                          ]),
                          editingBlock.value.block.content.url ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2"
                          }, [
                            createVNode(unref(_sfc_main$f), { class: "text-xs" }, {
                              default: withCtx(() => [
                                createTextVNode("Preview:")
                              ]),
                              _: 1
                            }),
                            createVNode("img", {
                              src: editingBlock.value.block.content.url,
                              alt: "Preview",
                              class: "mt-1 max-h-40 rounded-md border"
                            }, null, 8, ["src"])
                          ])) : createCommentVNode("", true)
                        ])),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$f), null, {
                            default: withCtx(() => [
                              createTextVNode("Alt Text")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$l), {
                            modelValue: editingBlock.value.block.content.alt,
                            "onUpdate:modelValue": ($event) => editingBlock.value.block.content.alt = $event,
                            placeholder: "Deskripsi gambar"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$f), null, {
                            default: withCtx(() => [
                              createTextVNode("Caption (Opsional)")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$l), {
                            modelValue: editingBlock.value.block.content.caption,
                            "onUpdate:modelValue": ($event) => editingBlock.value.block.content.caption = $event,
                            placeholder: "Caption gambar"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ])) : editingBlock.value.block.type === "list" ? (openBlock(), createBlock("div", {
                        key: 3,
                        class: "space-y-4"
                      }, [
                        createVNode("div", { class: "flex items-center space-x-2" }, [
                          createVNode("input", {
                            type: "checkbox",
                            checked: editingBlock.value.block.content.ordered,
                            onChange: ($event) => editingBlock.value.block.content.ordered = !editingBlock.value.block.content.ordered,
                            class: "rounded"
                          }, null, 40, ["checked", "onChange"]),
                          createVNode(unref(_sfc_main$f), null, {
                            default: withCtx(() => [
                              createTextVNode("List Berurutan (Numbered)")
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$f), null, {
                            default: withCtx(() => [
                              createTextVNode("Items")
                            ]),
                            _: 1
                          }),
                          (openBlock(true), createBlock(Fragment, null, renderList(editingBlock.value.block.content.items, (item, idx) => {
                            return openBlock(), createBlock("div", {
                              key: idx,
                              class: "flex gap-2"
                            }, [
                              createVNode(unref(_sfc_main$l), {
                                modelValue: editingBlock.value.block.content.items[idx],
                                "onUpdate:modelValue": ($event) => editingBlock.value.block.content.items[idx] = $event,
                                placeholder: "Item list"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(unref(_sfc_main$3), {
                                variant: "ghost",
                                size: "icon",
                                onClick: ($event) => removeListItem(editingBlock.value.index, idx),
                                disabled: editingBlock.value.block.content.items.length <= 1
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Trash2), { class: "h-4 w-4" })
                                ]),
                                _: 1
                              }, 8, ["onClick", "disabled"])
                            ]);
                          }), 128)),
                          createVNode(unref(_sfc_main$3), {
                            variant: "outline",
                            size: "sm",
                            onClick: ($event) => addListItem(editingBlock.value.index)
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Plus), { class: "mr-2 h-4 w-4" }),
                              createTextVNode(" Tambah Item ")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ])
                      ])) : editingBlock.value.block.type === "quote" ? (openBlock(), createBlock("div", {
                        key: 4,
                        class: "space-y-4"
                      }, [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$f), null, {
                            default: withCtx(() => [
                              createTextVNode("Teks Quote")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$m), {
                            modelValue: editingBlock.value.block.content.text,
                            "onUpdate:modelValue": ($event) => editingBlock.value.block.content.text = $event,
                            rows: "4",
                            placeholder: "Masukkan quote"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$f), null, {
                            default: withCtx(() => [
                              createTextVNode("Author (Opsional)")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$l), {
                            modelValue: editingBlock.value.block.content.author,
                            "onUpdate:modelValue": ($event) => editingBlock.value.block.content.author = $event,
                            placeholder: "Nama author"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ])) : editingBlock.value.block.type === "code" ? (openBlock(), createBlock("div", {
                        key: 5,
                        class: "space-y-4"
                      }, [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$f), null, {
                            default: withCtx(() => [
                              createTextVNode("Bahasa")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$g), {
                            modelValue: editingBlock.value.block.content.language,
                            "onUpdate:modelValue": ($event) => editingBlock.value.block.content.language = $event
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$h), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$i), { placeholder: "Pilih bahasa" })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$j), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$k), { value: "javascript" }, {
                                    default: withCtx(() => [
                                      createTextVNode("JavaScript")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$k), { value: "typescript" }, {
                                    default: withCtx(() => [
                                      createTextVNode("TypeScript")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$k), { value: "php" }, {
                                    default: withCtx(() => [
                                      createTextVNode("PHP")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$k), { value: "python" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Python")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$k), { value: "html" }, {
                                    default: withCtx(() => [
                                      createTextVNode("HTML")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$k), { value: "css" }, {
                                    default: withCtx(() => [
                                      createTextVNode("CSS")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$k), { value: "sql" }, {
                                    default: withCtx(() => [
                                      createTextVNode("SQL")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$k), { value: "bash" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Bash")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$k), { value: "json" }, {
                                    default: withCtx(() => [
                                      createTextVNode("JSON")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$k), { value: "xml" }, {
                                    default: withCtx(() => [
                                      createTextVNode("XML")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$k), { value: "markdown" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Markdown")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$f), null, {
                            default: withCtx(() => [
                              createTextVNode("Kode")
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$1, {
                            modelValue: editingBlock.value.block.content.code,
                            "onUpdate:modelValue": ($event) => editingBlock.value.block.content.code = $event,
                            language: editingBlock.value.block.content.language || "javascript",
                            height: "300px"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "language"])
                        ])
                      ])) : editingBlock.value.block.type === "video" ? (openBlock(), createBlock("div", {
                        key: 6,
                        class: "space-y-2"
                      }, [
                        createVNode(unref(_sfc_main$f), null, {
                          default: withCtx(() => [
                            createTextVNode("URL Video YouTube")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$l), {
                          modelValue: editingBlock.value.block.content.url,
                          "onUpdate:modelValue": ($event) => editingBlock.value.block.content.url = $event,
                          placeholder: "https://www.youtube.com/watch?v=..."
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("p", { class: "text-sm text-muted-foreground" }, "Masukkan URL video YouTube lengkap")
                      ])) : createCommentVNode("", true)
                    ])) : createCommentVNode("", true),
                    createVNode(unref(_sfc_main$n), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$3), {
                          variant: "outline",
                          onClick: ($event) => editingBlock.value = null
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Batal")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(unref(_sfc_main$3), { onClick: saveBlockEdit }, {
                          default: withCtx(() => [
                            createTextVNode("Simpan")
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
          } else {
            return [
              createVNode(unref(_sfc_main$b), { class: "max-w-7xl max-h-[80vh] overflow-y-auto" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$c), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$d), null, {
                        default: withCtx(() => [
                          createTextVNode("Edit " + toDisplayString(editingBlock.value ? getBlockLabel(editingBlock.value.block.type) : ""), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  editingBlock.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "space-y-4"
                  }, [
                    editingBlock.value.block.type === "heading" ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-4"
                    }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$f), null, {
                          default: withCtx(() => [
                            createTextVNode("Ukuran Heading")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$g), {
                          modelValue: editingBlock.value.block.content.level,
                          "onUpdate:modelValue": ($event) => editingBlock.value.block.content.level = $event
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$h), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$i), { placeholder: "Pilih ukuran" })
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$j), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$k), { value: 1 }, {
                                  default: withCtx(() => [
                                    createTextVNode("H1 - Heading 1")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$k), { value: 2 }, {
                                  default: withCtx(() => [
                                    createTextVNode("H2 - Heading 2")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$k), { value: 3 }, {
                                  default: withCtx(() => [
                                    createTextVNode("H3 - Heading 3")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$k), { value: 4 }, {
                                  default: withCtx(() => [
                                    createTextVNode("H4 - Heading 4")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$k), { value: 5 }, {
                                  default: withCtx(() => [
                                    createTextVNode("H5 - Heading 5")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$k), { value: 6 }, {
                                  default: withCtx(() => [
                                    createTextVNode("H6 - Heading 6")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$f), null, {
                          default: withCtx(() => [
                            createTextVNode("Teks Heading")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$l), {
                          modelValue: editingBlock.value.block.content.text,
                          "onUpdate:modelValue": ($event) => editingBlock.value.block.content.text = $event,
                          placeholder: "Masukkan teks heading"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ])) : editingBlock.value.block.type === "paragraph" ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "space-y-2"
                    }, [
                      createVNode(unref(_sfc_main$f), null, {
                        default: withCtx(() => [
                          createTextVNode("Konten Paragraf")
                        ]),
                        _: 1
                      }),
                      createVNode(_sfc_main$2, {
                        modelValue: editingBlock.value.block.content.text,
                        "onUpdate:modelValue": ($event) => editingBlock.value.block.content.text = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode("p", { class: "text-xs text-muted-foreground" }, "Gunakan toolbar untuk memformat teks dengan rich text editor")
                    ])) : editingBlock.value.block.type === "image" ? (openBlock(), createBlock("div", {
                      key: 2,
                      class: "space-y-4"
                    }, [
                      createVNode("div", { class: "flex gap-2 p-1 bg-muted rounded-lg" }, [
                        createVNode("button", {
                          type: "button",
                          onClick: ($event) => imageInputMethod.value = "url",
                          class: [
                            "flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                            imageInputMethod.value === "url" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                          ]
                        }, " URL ", 10, ["onClick"]),
                        createVNode("button", {
                          type: "button",
                          onClick: ($event) => imageInputMethod.value = "upload",
                          class: [
                            "flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                            imageInputMethod.value === "upload" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                          ]
                        }, " Upload File ", 10, ["onClick"])
                      ]),
                      imageInputMethod.value === "url" ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "space-y-2"
                      }, [
                        createVNode(unref(_sfc_main$f), null, {
                          default: withCtx(() => [
                            createTextVNode("URL Gambar")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$l), {
                          modelValue: editingBlock.value.block.content.url,
                          "onUpdate:modelValue": ($event) => editingBlock.value.block.content.url = $event,
                          placeholder: "https://example.com/image.jpg"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, "Masukkan URL gambar dari internet")
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "space-y-2"
                      }, [
                        createVNode(unref(_sfc_main$f), null, {
                          default: withCtx(() => [
                            createTextVNode("Upload Gambar")
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("input", {
                            type: "file",
                            accept: "image/*",
                            onChange: handleImageUpload,
                            disabled: uploadingImage.value,
                            class: "block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 file:cursor-pointer disabled:opacity-50"
                          }, null, 40, ["disabled"]),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(uploadingImage.value ? "Mengupload..." : "Format: JPG, PNG, GIF, WEBP. Maksimal 5MB"), 1)
                        ]),
                        editingBlock.value.block.content.url ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-2"
                        }, [
                          createVNode(unref(_sfc_main$f), { class: "text-xs" }, {
                            default: withCtx(() => [
                              createTextVNode("Preview:")
                            ]),
                            _: 1
                          }),
                          createVNode("img", {
                            src: editingBlock.value.block.content.url,
                            alt: "Preview",
                            class: "mt-1 max-h-40 rounded-md border"
                          }, null, 8, ["src"])
                        ])) : createCommentVNode("", true)
                      ])),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$f), null, {
                          default: withCtx(() => [
                            createTextVNode("Alt Text")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$l), {
                          modelValue: editingBlock.value.block.content.alt,
                          "onUpdate:modelValue": ($event) => editingBlock.value.block.content.alt = $event,
                          placeholder: "Deskripsi gambar"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$f), null, {
                          default: withCtx(() => [
                            createTextVNode("Caption (Opsional)")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$l), {
                          modelValue: editingBlock.value.block.content.caption,
                          "onUpdate:modelValue": ($event) => editingBlock.value.block.content.caption = $event,
                          placeholder: "Caption gambar"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ])) : editingBlock.value.block.type === "list" ? (openBlock(), createBlock("div", {
                      key: 3,
                      class: "space-y-4"
                    }, [
                      createVNode("div", { class: "flex items-center space-x-2" }, [
                        createVNode("input", {
                          type: "checkbox",
                          checked: editingBlock.value.block.content.ordered,
                          onChange: ($event) => editingBlock.value.block.content.ordered = !editingBlock.value.block.content.ordered,
                          class: "rounded"
                        }, null, 40, ["checked", "onChange"]),
                        createVNode(unref(_sfc_main$f), null, {
                          default: withCtx(() => [
                            createTextVNode("List Berurutan (Numbered)")
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$f), null, {
                          default: withCtx(() => [
                            createTextVNode("Items")
                          ]),
                          _: 1
                        }),
                        (openBlock(true), createBlock(Fragment, null, renderList(editingBlock.value.block.content.items, (item, idx) => {
                          return openBlock(), createBlock("div", {
                            key: idx,
                            class: "flex gap-2"
                          }, [
                            createVNode(unref(_sfc_main$l), {
                              modelValue: editingBlock.value.block.content.items[idx],
                              "onUpdate:modelValue": ($event) => editingBlock.value.block.content.items[idx] = $event,
                              placeholder: "Item list"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(unref(_sfc_main$3), {
                              variant: "ghost",
                              size: "icon",
                              onClick: ($event) => removeListItem(editingBlock.value.index, idx),
                              disabled: editingBlock.value.block.content.items.length <= 1
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Trash2), { class: "h-4 w-4" })
                              ]),
                              _: 1
                            }, 8, ["onClick", "disabled"])
                          ]);
                        }), 128)),
                        createVNode(unref(_sfc_main$3), {
                          variant: "outline",
                          size: "sm",
                          onClick: ($event) => addListItem(editingBlock.value.index)
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Plus), { class: "mr-2 h-4 w-4" }),
                            createTextVNode(" Tambah Item ")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ])
                    ])) : editingBlock.value.block.type === "quote" ? (openBlock(), createBlock("div", {
                      key: 4,
                      class: "space-y-4"
                    }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$f), null, {
                          default: withCtx(() => [
                            createTextVNode("Teks Quote")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$m), {
                          modelValue: editingBlock.value.block.content.text,
                          "onUpdate:modelValue": ($event) => editingBlock.value.block.content.text = $event,
                          rows: "4",
                          placeholder: "Masukkan quote"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$f), null, {
                          default: withCtx(() => [
                            createTextVNode("Author (Opsional)")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$l), {
                          modelValue: editingBlock.value.block.content.author,
                          "onUpdate:modelValue": ($event) => editingBlock.value.block.content.author = $event,
                          placeholder: "Nama author"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ])) : editingBlock.value.block.type === "code" ? (openBlock(), createBlock("div", {
                      key: 5,
                      class: "space-y-4"
                    }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$f), null, {
                          default: withCtx(() => [
                            createTextVNode("Bahasa")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$g), {
                          modelValue: editingBlock.value.block.content.language,
                          "onUpdate:modelValue": ($event) => editingBlock.value.block.content.language = $event
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$h), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$i), { placeholder: "Pilih bahasa" })
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$j), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$k), { value: "javascript" }, {
                                  default: withCtx(() => [
                                    createTextVNode("JavaScript")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$k), { value: "typescript" }, {
                                  default: withCtx(() => [
                                    createTextVNode("TypeScript")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$k), { value: "php" }, {
                                  default: withCtx(() => [
                                    createTextVNode("PHP")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$k), { value: "python" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Python")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$k), { value: "html" }, {
                                  default: withCtx(() => [
                                    createTextVNode("HTML")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$k), { value: "css" }, {
                                  default: withCtx(() => [
                                    createTextVNode("CSS")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$k), { value: "sql" }, {
                                  default: withCtx(() => [
                                    createTextVNode("SQL")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$k), { value: "bash" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Bash")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$k), { value: "json" }, {
                                  default: withCtx(() => [
                                    createTextVNode("JSON")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$k), { value: "xml" }, {
                                  default: withCtx(() => [
                                    createTextVNode("XML")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$k), { value: "markdown" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Markdown")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$f), null, {
                          default: withCtx(() => [
                            createTextVNode("Kode")
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$1, {
                          modelValue: editingBlock.value.block.content.code,
                          "onUpdate:modelValue": ($event) => editingBlock.value.block.content.code = $event,
                          language: editingBlock.value.block.content.language || "javascript",
                          height: "300px"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "language"])
                      ])
                    ])) : editingBlock.value.block.type === "video" ? (openBlock(), createBlock("div", {
                      key: 6,
                      class: "space-y-2"
                    }, [
                      createVNode(unref(_sfc_main$f), null, {
                        default: withCtx(() => [
                          createTextVNode("URL Video YouTube")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$l), {
                        modelValue: editingBlock.value.block.content.url,
                        "onUpdate:modelValue": ($event) => editingBlock.value.block.content.url = $event,
                        placeholder: "https://www.youtube.com/watch?v=..."
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode("p", { class: "text-sm text-muted-foreground" }, "Masukkan URL video YouTube lengkap")
                    ])) : createCommentVNode("", true)
                  ])) : createCommentVNode("", true),
                  createVNode(unref(_sfc_main$n), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$3), {
                        variant: "outline",
                        onClick: ($event) => editingBlock.value = null
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Batal")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(unref(_sfc_main$3), { onClick: saveBlockEdit }, {
                        default: withCtx(() => [
                          createTextVNode("Simpan")
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
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/admin/PageBuilder.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
