import { defineComponent, defineAsyncComponent, ref, computed, watch, withCtx, unref, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, toDisplayString, withKeys, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
import { a as _sfc_main$1, _ as _sfc_main$2 } from "./AppLayout-BHxY2bcF.js";
import { _ as _sfc_main$4, a as _sfc_main$5, b as _sfc_main$6, d as _sfc_main$7, c as _sfc_main$8 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$3 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$a } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$9 } from "./Label-16aMY2sx.js";
import { _ as _sfc_main$b } from "./Textarea-pcFPh_uS.js";
import { _ as _sfc_main$c } from "./Checkbox-CIOQa2-J.js";
import { _ as _sfc_main$d } from "./index-BpQimeTM.js";
import { ArrowLeft, Save, Send, X } from "lucide-vue-next";
import { toast } from "vue-sonner";
import "class-variance-authority";
import "./DropdownMenuTrigger-B1v6pHML.js";
import "reka-ui";
import "@vueuse/core";
import "./index-3UqiGNe9.js";
import "./AvatarImage-DWFQMckn.js";
import "./index-Bfu0FVt6.js";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
import "clsx";
import "tailwind-merge";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Create",
  __ssrInlineRender: true,
  setup(__props) {
    const PageBuilder = defineAsyncComponent({
      loader: () => import("./PageBuilder-CiJr2Ukg.js"),
      loadingComponent: {
        template: '<div class="space-y-4"><Skeleton class="h-12 w-full" /><Skeleton class="h-64 w-full" /><Skeleton class="h-12 w-full" /></div>',
        components: { Skeleton: _sfc_main$1 }
      }
    });
    const form = ref({
      title: "",
      slug: "",
      seo_title: "",
      seo_description: "",
      content: "",
      blocks: [],
      tags: [],
      is_published: false,
      published_at: ""
    });
    const submitFormHelper = useForm({});
    const errors = computed(() => submitFormHelper.errors);
    const processing = computed(() => submitFormHelper.processing);
    const tagInput = ref("");
    const slugify = (text) => {
      return text.toString().toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-");
    };
    const generateSlug = () => {
      form.value.slug = slugify(form.value.title);
    };
    watch(() => form.value.blocks, (newBlocks) => {
      form.value.content = JSON.stringify(newBlocks);
    }, { deep: true });
    const addTag = () => {
      const tag = tagInput.value.trim();
      if (tag && !form.value.tags.includes(tag)) {
        form.value.tags.push(tag);
        tagInput.value = "";
      }
    };
    const removeTag = (index) => {
      form.value.tags.splice(index, 1);
    };
    const submitForm = (publish = false) => {
      const contentToSave = JSON.stringify(form.value.blocks);
      const data = {
        title: form.value.title,
        slug: form.value.slug,
        seo_title: form.value.seo_title,
        seo_description: form.value.seo_description,
        content: contentToSave,
        tags: form.value.tags,
        is_published: publish,
        published_at: publish && !form.value.published_at ? (/* @__PURE__ */ new Date()).toISOString() : form.value.published_at
      };
      submitFormHelper.transform(() => data).post("/admin/articles", {
        onSuccess: () => {
          toast.success(publish ? "Artikel berhasil diterbitkan" : "Artikel berhasil disimpan sebagai draft");
        },
        onError: () => {
          toast.error("Terjadi kesalahan, periksa form Anda");
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$2, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="container mx-auto py-6 space-y-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div class="flex items-center gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$3), {
              variant: "ghost",
              size: "icon",
              "as-child": ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<a href="/admin/articles"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(ArrowLeft), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(`</a>`);
                } else {
                  return [
                    createVNode("a", { href: "/admin/articles" }, [
                      createVNode(unref(ArrowLeft), { class: "h-4 w-4" })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div${_scopeId}><h1 class="text-3xl font-bold tracking-tight"${_scopeId}>Buat Artikel Baru</h1><p class="text-muted-foreground"${_scopeId}> Tambahkan konten artikel baru ke blog </p></div></div><div class="flex gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$3), {
              variant: "outline",
              disabled: processing.value,
              onClick: ($event) => submitForm(false)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Save), { class: "mr-2 h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(` Simpan Draft `);
                } else {
                  return [
                    createVNode(unref(Save), { class: "mr-2 h-4 w-4" }),
                    createTextVNode(" Simpan Draft ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$3), {
              disabled: processing.value,
              onClick: ($event) => submitForm(true)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Send), { class: "mr-2 h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(` Terbitkan `);
                } else {
                  return [
                    createVNode(unref(Send), { class: "mr-2 h-4 w-4" }),
                    createTextVNode(" Terbitkan ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="grid gap-6 lg:grid-cols-3"${_scopeId}><div class="lg:col-span-2 space-y-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Informasi Dasar`);
                            } else {
                              return [
                                createTextVNode("Informasi Dasar")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$7), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Detail utama artikel`);
                            } else {
                              return [
                                createTextVNode("Detail utama artikel")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("Informasi Dasar")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$7), null, {
                            default: withCtx(() => [
                              createTextVNode("Detail utama artikel")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$8), { class: "space-y-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { for: "title" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Judul Artikel`);
                            } else {
                              return [
                                createTextVNode("Judul Artikel")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$a), {
                          id: "title",
                          modelValue: form.value.title,
                          "onUpdate:modelValue": ($event) => form.value.title = $event,
                          placeholder: "Masukkan judul artikel",
                          class: { "border-destructive": errors.value.title },
                          onInput: generateSlug
                        }, null, _parent4, _scopeId3));
                        if (errors.value.title) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(errors.value.title)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { for: "slug" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Slug (URL)`);
                            } else {
                              return [
                                createTextVNode("Slug (URL)")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$a), {
                          id: "slug",
                          modelValue: form.value.slug,
                          "onUpdate:modelValue": ($event) => form.value.slug = $event,
                          placeholder: "slug-artikel",
                          class: { "border-destructive": errors.value.slug }
                        }, null, _parent4, _scopeId3));
                        if (errors.value.slug) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(errors.value.slug)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`<p class="text-sm text-muted-foreground"${_scopeId3}> URL: /articles/${ssrInterpolate(form.value.slug || "slug-artikel")}</p></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$9), { for: "title" }, {
                              default: withCtx(() => [
                                createTextVNode("Judul Artikel")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$a), {
                              id: "title",
                              modelValue: form.value.title,
                              "onUpdate:modelValue": ($event) => form.value.title = $event,
                              placeholder: "Masukkan judul artikel",
                              class: { "border-destructive": errors.value.title },
                              onInput: generateSlug
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            errors.value.title ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(errors.value.title), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$9), { for: "slug" }, {
                              default: withCtx(() => [
                                createTextVNode("Slug (URL)")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$a), {
                              id: "slug",
                              modelValue: form.value.slug,
                              "onUpdate:modelValue": ($event) => form.value.slug = $event,
                              placeholder: "slug-artikel",
                              class: { "border-destructive": errors.value.slug }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            errors.value.slug ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(errors.value.slug), 1)) : createCommentVNode("", true),
                            createVNode("p", { class: "text-sm text-muted-foreground" }, " URL: /articles/" + toDisplayString(form.value.slug || "slug-artikel"), 1)
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode("Informasi Dasar")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$7), null, {
                          default: withCtx(() => [
                            createTextVNode("Detail utama artikel")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$8), { class: "space-y-4" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$9), { for: "title" }, {
                            default: withCtx(() => [
                              createTextVNode("Judul Artikel")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$a), {
                            id: "title",
                            modelValue: form.value.title,
                            "onUpdate:modelValue": ($event) => form.value.title = $event,
                            placeholder: "Masukkan judul artikel",
                            class: { "border-destructive": errors.value.title },
                            onInput: generateSlug
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                          errors.value.title ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive"
                          }, toDisplayString(errors.value.title), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$9), { for: "slug" }, {
                            default: withCtx(() => [
                              createTextVNode("Slug (URL)")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$a), {
                            id: "slug",
                            modelValue: form.value.slug,
                            "onUpdate:modelValue": ($event) => form.value.slug = $event,
                            placeholder: "slug-artikel",
                            class: { "border-destructive": errors.value.slug }
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                          errors.value.slug ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive"
                          }, toDisplayString(errors.value.slug), 1)) : createCommentVNode("", true),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, " URL: /articles/" + toDisplayString(form.value.slug || "slug-artikel"), 1)
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(PageBuilder), {
              modelValue: form.value.blocks,
              "onUpdate:modelValue": ($event) => form.value.blocks = $event
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`SEO`);
                            } else {
                              return [
                                createTextVNode("SEO")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$7), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Optimasi mesin pencari`);
                            } else {
                              return [
                                createTextVNode("Optimasi mesin pencari")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("SEO")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$7), null, {
                            default: withCtx(() => [
                              createTextVNode("Optimasi mesin pencari")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$8), { class: "space-y-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { for: "seo_title" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Judul SEO`);
                            } else {
                              return [
                                createTextVNode("Judul SEO")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$a), {
                          id: "seo_title",
                          modelValue: form.value.seo_title,
                          "onUpdate:modelValue": ($event) => form.value.seo_title = $event,
                          placeholder: "Judul untuk mesin pencari",
                          class: { "border-destructive": errors.value.seo_title }
                        }, null, _parent4, _scopeId3));
                        if (errors.value.seo_title) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(errors.value.seo_title)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`<p class="text-sm text-muted-foreground"${_scopeId3}>${ssrInterpolate(form.value.seo_title.length)}/255 karakter </p></div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { for: "seo_description" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Deskripsi SEO`);
                            } else {
                              return [
                                createTextVNode("Deskripsi SEO")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$b), {
                          id: "seo_description",
                          modelValue: form.value.seo_description,
                          "onUpdate:modelValue": ($event) => form.value.seo_description = $event,
                          placeholder: "Deskripsi singkat untuk mesin pencari",
                          rows: "3",
                          class: { "border-destructive": errors.value.seo_description }
                        }, null, _parent4, _scopeId3));
                        if (errors.value.seo_description) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(errors.value.seo_description)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`<p class="text-sm text-muted-foreground"${_scopeId3}>${ssrInterpolate(form.value.seo_description.length)}/500 karakter </p></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$9), { for: "seo_title" }, {
                              default: withCtx(() => [
                                createTextVNode("Judul SEO")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$a), {
                              id: "seo_title",
                              modelValue: form.value.seo_title,
                              "onUpdate:modelValue": ($event) => form.value.seo_title = $event,
                              placeholder: "Judul untuk mesin pencari",
                              class: { "border-destructive": errors.value.seo_title }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            errors.value.seo_title ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(errors.value.seo_title), 1)) : createCommentVNode("", true),
                            createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(form.value.seo_title.length) + "/255 karakter ", 1)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$9), { for: "seo_description" }, {
                              default: withCtx(() => [
                                createTextVNode("Deskripsi SEO")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$b), {
                              id: "seo_description",
                              modelValue: form.value.seo_description,
                              "onUpdate:modelValue": ($event) => form.value.seo_description = $event,
                              placeholder: "Deskripsi singkat untuk mesin pencari",
                              rows: "3",
                              class: { "border-destructive": errors.value.seo_description }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            errors.value.seo_description ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(errors.value.seo_description), 1)) : createCommentVNode("", true),
                            createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(form.value.seo_description.length) + "/500 karakter ", 1)
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode("SEO")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$7), null, {
                          default: withCtx(() => [
                            createTextVNode("Optimasi mesin pencari")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$8), { class: "space-y-4" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$9), { for: "seo_title" }, {
                            default: withCtx(() => [
                              createTextVNode("Judul SEO")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$a), {
                            id: "seo_title",
                            modelValue: form.value.seo_title,
                            "onUpdate:modelValue": ($event) => form.value.seo_title = $event,
                            placeholder: "Judul untuk mesin pencari",
                            class: { "border-destructive": errors.value.seo_title }
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                          errors.value.seo_title ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive"
                          }, toDisplayString(errors.value.seo_title), 1)) : createCommentVNode("", true),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(form.value.seo_title.length) + "/255 karakter ", 1)
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$9), { for: "seo_description" }, {
                            default: withCtx(() => [
                              createTextVNode("Deskripsi SEO")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$b), {
                            id: "seo_description",
                            modelValue: form.value.seo_description,
                            "onUpdate:modelValue": ($event) => form.value.seo_description = $event,
                            placeholder: "Deskripsi singkat untuk mesin pencari",
                            rows: "3",
                            class: { "border-destructive": errors.value.seo_description }
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                          errors.value.seo_description ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive"
                          }, toDisplayString(errors.value.seo_description), 1)) : createCommentVNode("", true),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(form.value.seo_description.length) + "/500 karakter ", 1)
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="space-y-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Publikasi`);
                            } else {
                              return [
                                createTextVNode("Publikasi")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$7), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Atur tanggal publikasi`);
                            } else {
                              return [
                                createTextVNode("Atur tanggal publikasi")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("Publikasi")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$7), null, {
                            default: withCtx(() => [
                              createTextVNode("Atur tanggal publikasi")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$8), { class: "space-y-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex items-center space-x-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$c), {
                          id: "is_published",
                          checked: form.value.is_published,
                          "onUpdate:checked": (checked) => form.value.is_published = checked
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          for: "is_published",
                          class: "cursor-pointer"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Terbitkan artikel `);
                            } else {
                              return [
                                createTextVNode(" Terbitkan artikel ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                        if (form.value.is_published) {
                          _push4(`<div class="space-y-2"${_scopeId3}>`);
                          _push4(ssrRenderComponent(unref(_sfc_main$9), { for: "published_at" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Tanggal Terbit`);
                              } else {
                                return [
                                  createTextVNode("Tanggal Terbit")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$a), {
                            id: "published_at",
                            modelValue: form.value.published_at,
                            "onUpdate:modelValue": ($event) => form.value.published_at = $event,
                            type: "datetime-local",
                            class: { "border-destructive": errors.value.published_at }
                          }, null, _parent4, _scopeId3));
                          if (errors.value.published_at) {
                            _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(errors.value.published_at)}</p>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`</div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center space-x-2" }, [
                            createVNode(unref(_sfc_main$c), {
                              id: "is_published",
                              checked: form.value.is_published,
                              "onUpdate:checked": (checked) => form.value.is_published = checked
                            }, null, 8, ["checked", "onUpdate:checked"]),
                            createVNode(unref(_sfc_main$9), {
                              for: "is_published",
                              class: "cursor-pointer"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Terbitkan artikel ")
                              ]),
                              _: 1
                            })
                          ]),
                          form.value.is_published ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "space-y-2"
                          }, [
                            createVNode(unref(_sfc_main$9), { for: "published_at" }, {
                              default: withCtx(() => [
                                createTextVNode("Tanggal Terbit")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$a), {
                              id: "published_at",
                              modelValue: form.value.published_at,
                              "onUpdate:modelValue": ($event) => form.value.published_at = $event,
                              type: "datetime-local",
                              class: { "border-destructive": errors.value.published_at }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            errors.value.published_at ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(errors.value.published_at), 1)) : createCommentVNode("", true)
                          ])) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode("Publikasi")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$7), null, {
                          default: withCtx(() => [
                            createTextVNode("Atur tanggal publikasi")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$8), { class: "space-y-4" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex items-center space-x-2" }, [
                          createVNode(unref(_sfc_main$c), {
                            id: "is_published",
                            checked: form.value.is_published,
                            "onUpdate:checked": (checked) => form.value.is_published = checked
                          }, null, 8, ["checked", "onUpdate:checked"]),
                          createVNode(unref(_sfc_main$9), {
                            for: "is_published",
                            class: "cursor-pointer"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Terbitkan artikel ")
                            ]),
                            _: 1
                          })
                        ]),
                        form.value.is_published ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "space-y-2"
                        }, [
                          createVNode(unref(_sfc_main$9), { for: "published_at" }, {
                            default: withCtx(() => [
                              createTextVNode("Tanggal Terbit")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$a), {
                            id: "published_at",
                            modelValue: form.value.published_at,
                            "onUpdate:modelValue": ($event) => form.value.published_at = $event,
                            type: "datetime-local",
                            class: { "border-destructive": errors.value.published_at }
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                          errors.value.published_at ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive"
                          }, toDisplayString(errors.value.published_at), 1)) : createCommentVNode("", true)
                        ])) : createCommentVNode("", true)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Tag`);
                            } else {
                              return [
                                createTextVNode("Tag")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$7), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Tambahkan tag untuk artikel`);
                            } else {
                              return [
                                createTextVNode("Tambahkan tag untuk artikel")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("Tag")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$7), null, {
                            default: withCtx(() => [
                              createTextVNode("Tambahkan tag untuk artikel")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$8), { class: "space-y-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex gap-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$a), {
                          modelValue: tagInput.value,
                          "onUpdate:modelValue": ($event) => tagInput.value = $event,
                          placeholder: "Tambah tag",
                          onKeyup: addTag
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$3), {
                          type: "button",
                          size: "sm",
                          onClick: addTag
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Tambah `);
                            } else {
                              return [
                                createTextVNode(" Tambah ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                        if (form.value.tags.length > 0) {
                          _push4(`<div class="flex flex-wrap gap-2"${_scopeId3}><!--[-->`);
                          ssrRenderList(form.value.tags, (tag, index) => {
                            _push4(ssrRenderComponent(unref(_sfc_main$d), {
                              key: index,
                              variant: "secondary",
                              class: "cursor-pointer hover:bg-destructive hover:text-destructive-foreground",
                              onClick: ($event) => removeTag(index)
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(tag)} `);
                                  _push5(ssrRenderComponent(unref(X), { class: "ml-1 h-3 w-3" }, null, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(tag) + " ", 1),
                                    createVNode(unref(X), { class: "ml-1 h-3 w-3" })
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          });
                          _push4(`<!--]--></div>`);
                        } else {
                          _push4(`<p class="text-sm text-muted-foreground"${_scopeId3}> Belum ada tag </p>`);
                        }
                      } else {
                        return [
                          createVNode("div", { class: "flex gap-2" }, [
                            createVNode(unref(_sfc_main$a), {
                              modelValue: tagInput.value,
                              "onUpdate:modelValue": ($event) => tagInput.value = $event,
                              placeholder: "Tambah tag",
                              onKeyup: withKeys(addTag, ["enter"])
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(unref(_sfc_main$3), {
                              type: "button",
                              size: "sm",
                              onClick: addTag
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Tambah ")
                              ]),
                              _: 1
                            })
                          ]),
                          form.value.tags.length > 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex flex-wrap gap-2"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(form.value.tags, (tag, index) => {
                              return openBlock(), createBlock(unref(_sfc_main$d), {
                                key: index,
                                variant: "secondary",
                                class: "cursor-pointer hover:bg-destructive hover:text-destructive-foreground",
                                onClick: ($event) => removeTag(index)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(tag) + " ", 1),
                                  createVNode(unref(X), { class: "ml-1 h-3 w-3" })
                                ]),
                                _: 2
                              }, 1032, ["onClick"]);
                            }), 128))
                          ])) : (openBlock(), createBlock("p", {
                            key: 1,
                            class: "text-sm text-muted-foreground"
                          }, " Belum ada tag "))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode("Tag")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$7), null, {
                          default: withCtx(() => [
                            createTextVNode("Tambahkan tag untuk artikel")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$8), { class: "space-y-4" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex gap-2" }, [
                          createVNode(unref(_sfc_main$a), {
                            modelValue: tagInput.value,
                            "onUpdate:modelValue": ($event) => tagInput.value = $event,
                            placeholder: "Tambah tag",
                            onKeyup: withKeys(addTag, ["enter"])
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(unref(_sfc_main$3), {
                            type: "button",
                            size: "sm",
                            onClick: addTag
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Tambah ")
                            ]),
                            _: 1
                          })
                        ]),
                        form.value.tags.length > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex flex-wrap gap-2"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(form.value.tags, (tag, index) => {
                            return openBlock(), createBlock(unref(_sfc_main$d), {
                              key: index,
                              variant: "secondary",
                              class: "cursor-pointer hover:bg-destructive hover:text-destructive-foreground",
                              onClick: ($event) => removeTag(index)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(tag) + " ", 1),
                                createVNode(unref(X), { class: "ml-1 h-3 w-3" })
                              ]),
                              _: 2
                            }, 1032, ["onClick"]);
                          }), 128))
                        ])) : (openBlock(), createBlock("p", {
                          key: 1,
                          class: "text-sm text-muted-foreground"
                        }, " Belum ada tag "))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "container mx-auto py-6 space-y-6" }, [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("div", { class: "flex items-center gap-4" }, [
                    createVNode(unref(_sfc_main$3), {
                      variant: "ghost",
                      size: "icon",
                      "as-child": ""
                    }, {
                      default: withCtx(() => [
                        createVNode("a", { href: "/admin/articles" }, [
                          createVNode(unref(ArrowLeft), { class: "h-4 w-4" })
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-3xl font-bold tracking-tight" }, "Buat Artikel Baru"),
                      createVNode("p", { class: "text-muted-foreground" }, " Tambahkan konten artikel baru ke blog ")
                    ])
                  ]),
                  createVNode("div", { class: "flex gap-2" }, [
                    createVNode(unref(_sfc_main$3), {
                      variant: "outline",
                      disabled: processing.value,
                      onClick: ($event) => submitForm(false)
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Save), { class: "mr-2 h-4 w-4" }),
                        createTextVNode(" Simpan Draft ")
                      ]),
                      _: 1
                    }, 8, ["disabled", "onClick"]),
                    createVNode(unref(_sfc_main$3), {
                      disabled: processing.value,
                      onClick: ($event) => submitForm(true)
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Send), { class: "mr-2 h-4 w-4" }),
                        createTextVNode(" Terbitkan ")
                      ]),
                      _: 1
                    }, 8, ["disabled", "onClick"])
                  ])
                ]),
                createVNode("div", { class: "grid gap-6 lg:grid-cols-3" }, [
                  createVNode("div", { class: "lg:col-span-2 space-y-6" }, [
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$6), null, {
                              default: withCtx(() => [
                                createTextVNode("Informasi Dasar")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$7), null, {
                              default: withCtx(() => [
                                createTextVNode("Detail utama artikel")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), { class: "space-y-4" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), { for: "title" }, {
                                default: withCtx(() => [
                                  createTextVNode("Judul Artikel")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), {
                                id: "title",
                                modelValue: form.value.title,
                                "onUpdate:modelValue": ($event) => form.value.title = $event,
                                placeholder: "Masukkan judul artikel",
                                class: { "border-destructive": errors.value.title },
                                onInput: generateSlug
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              errors.value.title ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(errors.value.title), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), { for: "slug" }, {
                                default: withCtx(() => [
                                  createTextVNode("Slug (URL)")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), {
                                id: "slug",
                                modelValue: form.value.slug,
                                "onUpdate:modelValue": ($event) => form.value.slug = $event,
                                placeholder: "slug-artikel",
                                class: { "border-destructive": errors.value.slug }
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              errors.value.slug ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(errors.value.slug), 1)) : createCommentVNode("", true),
                              createVNode("p", { class: "text-sm text-muted-foreground" }, " URL: /articles/" + toDisplayString(form.value.slug || "slug-artikel"), 1)
                            ])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(PageBuilder), {
                      modelValue: form.value.blocks,
                      "onUpdate:modelValue": ($event) => form.value.blocks = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$6), null, {
                              default: withCtx(() => [
                                createTextVNode("SEO")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$7), null, {
                              default: withCtx(() => [
                                createTextVNode("Optimasi mesin pencari")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), { class: "space-y-4" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), { for: "seo_title" }, {
                                default: withCtx(() => [
                                  createTextVNode("Judul SEO")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), {
                                id: "seo_title",
                                modelValue: form.value.seo_title,
                                "onUpdate:modelValue": ($event) => form.value.seo_title = $event,
                                placeholder: "Judul untuk mesin pencari",
                                class: { "border-destructive": errors.value.seo_title }
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              errors.value.seo_title ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(errors.value.seo_title), 1)) : createCommentVNode("", true),
                              createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(form.value.seo_title.length) + "/255 karakter ", 1)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), { for: "seo_description" }, {
                                default: withCtx(() => [
                                  createTextVNode("Deskripsi SEO")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$b), {
                                id: "seo_description",
                                modelValue: form.value.seo_description,
                                "onUpdate:modelValue": ($event) => form.value.seo_description = $event,
                                placeholder: "Deskripsi singkat untuk mesin pencari",
                                rows: "3",
                                class: { "border-destructive": errors.value.seo_description }
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              errors.value.seo_description ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(errors.value.seo_description), 1)) : createCommentVNode("", true),
                              createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(form.value.seo_description.length) + "/500 karakter ", 1)
                            ])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("div", { class: "space-y-6" }, [
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$6), null, {
                              default: withCtx(() => [
                                createTextVNode("Publikasi")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$7), null, {
                              default: withCtx(() => [
                                createTextVNode("Atur tanggal publikasi")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), { class: "space-y-4" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex items-center space-x-2" }, [
                              createVNode(unref(_sfc_main$c), {
                                id: "is_published",
                                checked: form.value.is_published,
                                "onUpdate:checked": (checked) => form.value.is_published = checked
                              }, null, 8, ["checked", "onUpdate:checked"]),
                              createVNode(unref(_sfc_main$9), {
                                for: "is_published",
                                class: "cursor-pointer"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Terbitkan artikel ")
                                ]),
                                _: 1
                              })
                            ]),
                            form.value.is_published ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "space-y-2"
                            }, [
                              createVNode(unref(_sfc_main$9), { for: "published_at" }, {
                                default: withCtx(() => [
                                  createTextVNode("Tanggal Terbit")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), {
                                id: "published_at",
                                modelValue: form.value.published_at,
                                "onUpdate:modelValue": ($event) => form.value.published_at = $event,
                                type: "datetime-local",
                                class: { "border-destructive": errors.value.published_at }
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              errors.value.published_at ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(errors.value.published_at), 1)) : createCommentVNode("", true)
                            ])) : createCommentVNode("", true)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$6), null, {
                              default: withCtx(() => [
                                createTextVNode("Tag")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$7), null, {
                              default: withCtx(() => [
                                createTextVNode("Tambahkan tag untuk artikel")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), { class: "space-y-4" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex gap-2" }, [
                              createVNode(unref(_sfc_main$a), {
                                modelValue: tagInput.value,
                                "onUpdate:modelValue": ($event) => tagInput.value = $event,
                                placeholder: "Tambah tag",
                                onKeyup: withKeys(addTag, ["enter"])
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(unref(_sfc_main$3), {
                                type: "button",
                                size: "sm",
                                onClick: addTag
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Tambah ")
                                ]),
                                _: 1
                              })
                            ]),
                            form.value.tags.length > 0 ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "flex flex-wrap gap-2"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(form.value.tags, (tag, index) => {
                                return openBlock(), createBlock(unref(_sfc_main$d), {
                                  key: index,
                                  variant: "secondary",
                                  class: "cursor-pointer hover:bg-destructive hover:text-destructive-foreground",
                                  onClick: ($event) => removeTag(index)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(tag) + " ", 1),
                                    createVNode(unref(X), { class: "ml-1 h-3 w-3" })
                                  ]),
                                  _: 2
                                }, 1032, ["onClick"]);
                              }), 128))
                            ])) : (openBlock(), createBlock("p", {
                              key: 1,
                              class: "text-sm text-muted-foreground"
                            }, " Belum ada tag "))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ])
                ])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Articles/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
