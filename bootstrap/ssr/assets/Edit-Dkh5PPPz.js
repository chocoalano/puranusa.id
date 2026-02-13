import { defineComponent, computed, unref, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-D11fLPDM.js";
import { _ as _sfc_main$2 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$e } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$8 } from "./Label-16aMY2sx.js";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5, d as _sfc_main$6, c as _sfc_main$7 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$9, a as _sfc_main$a, b as _sfc_main$b, c as _sfc_main$c, d as _sfc_main$d } from "./SelectValue-BUnv4mQg.js";
import { ArrowLeft, Save } from "lucide-vue-next";
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
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    item: {},
    parents: {}
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      parent_id: props.item.parent_id,
      name: props.item.name,
      slug: props.item.slug
    });
    const selectedParent = computed({
      get() {
        return form.parent_id ? String(form.parent_id) : "none";
      },
      set(value) {
        form.parent_id = value === "none" ? null : Number(value);
      }
    });
    const submit = () => {
      form.transform((data) => {
        const payload = { ...data };
        if (!payload.slug) delete payload.slug;
        if (!payload.parent_id) delete payload.parent_id;
        return payload;
      }).put(
        `/admin/zenner-club/categories/${props.item.id}`,
        {
          preserveScroll: true,
          onSuccess: () => {
            toast.success("Kategori berhasil diperbarui");
          },
          onError: () => {
            toast.error("Gagal memperbarui kategori");
          }
        }
      );
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: `Edit ${__props.item.name}`
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="container mx-auto py-6 space-y-6"${_scopeId}><div class="flex items-center gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), { href: "/admin/zenner-club/categories" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$2), {
                    variant: "outline",
                    size: "icon"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(ArrowLeft), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(ArrowLeft), { class: "h-4 w-4" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$2), {
                      variant: "outline",
                      size: "icon"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(ArrowLeft), { class: "h-4 w-4" })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div${_scopeId}><h1 class="text-3xl font-bold"${_scopeId}>Edit Kategori</h1><p class="text-muted-foreground"${_scopeId}>Perbarui kategori Zenner Club</p></div></div><form class="space-y-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$3), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Informasi Kategori`);
                            } else {
                              return [
                                createTextVNode("Informasi Kategori")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Perbarui data kategori`);
                            } else {
                              return [
                                createTextVNode("Perbarui data kategori")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Informasi Kategori")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("Perbarui data kategori")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { class: "space-y-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Parent Kategori`);
                            } else {
                              return [
                                createTextVNode("Parent Kategori")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          modelValue: selectedParent.value,
                          "onUpdate:modelValue": ($event) => selectedParent.value = $event
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$a), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$b), { placeholder: "Pilih parent" }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$b), { placeholder: "Pilih parent" })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$d), { value: "none" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Tanpa Parent`);
                                        } else {
                                          return [
                                            createTextVNode("Tanpa Parent")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`<!--[-->`);
                                    ssrRenderList(__props.parents, (item) => {
                                      _push6(ssrRenderComponent(unref(_sfc_main$d), {
                                        key: item.id,
                                        value: String(item.id)
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`${ssrInterpolate(item.name)}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString(item.name), 1)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    });
                                    _push6(`<!--]-->`);
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$d), { value: "none" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Tanpa Parent")
                                        ]),
                                        _: 1
                                      }),
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.parents, (item) => {
                                        return openBlock(), createBlock(unref(_sfc_main$d), {
                                          key: item.id,
                                          value: String(item.id)
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(item.name), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["value"]);
                                      }), 128))
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$a), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$b), { placeholder: "Pilih parent" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$d), { value: "none" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Tanpa Parent")
                                      ]),
                                      _: 1
                                    }),
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.parents, (item) => {
                                      return openBlock(), createBlock(unref(_sfc_main$d), {
                                        key: item.id,
                                        value: String(item.id)
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(item.name), 1)
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
                        }, _parent4, _scopeId3));
                        if (unref(form).errors.parent_id) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.parent_id)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { for: "name" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Nama`);
                            } else {
                              return [
                                createTextVNode("Nama")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$e), {
                          id: "name",
                          modelValue: unref(form).name,
                          "onUpdate:modelValue": ($event) => unref(form).name = $event,
                          class: { "border-destructive": unref(form).errors.name }
                        }, null, _parent4, _scopeId3));
                        if (unref(form).errors.name) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.name)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { for: "slug" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Slug`);
                            } else {
                              return [
                                createTextVNode("Slug")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$e), {
                          id: "slug",
                          modelValue: unref(form).slug,
                          "onUpdate:modelValue": ($event) => unref(form).slug = $event,
                          class: { "border-destructive": unref(form).errors.slug }
                        }, null, _parent4, _scopeId3));
                        if (unref(form).errors.slug) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.slug)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), null, {
                              default: withCtx(() => [
                                createTextVNode("Parent Kategori")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$9), {
                              modelValue: selectedParent.value,
                              "onUpdate:modelValue": ($event) => selectedParent.value = $event
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$a), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$b), { placeholder: "Pilih parent" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$d), { value: "none" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Tanpa Parent")
                                      ]),
                                      _: 1
                                    }),
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.parents, (item) => {
                                      return openBlock(), createBlock(unref(_sfc_main$d), {
                                        key: item.id,
                                        value: String(item.id)
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(item.name), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["value"]);
                                    }), 128))
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"]),
                            unref(form).errors.parent_id ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.parent_id), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "name" }, {
                              default: withCtx(() => [
                                createTextVNode("Nama")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$e), {
                              id: "name",
                              modelValue: unref(form).name,
                              "onUpdate:modelValue": ($event) => unref(form).name = $event,
                              class: { "border-destructive": unref(form).errors.name }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            unref(form).errors.name ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.name), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "slug" }, {
                              default: withCtx(() => [
                                createTextVNode("Slug")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$e), {
                              id: "slug",
                              modelValue: unref(form).slug,
                              "onUpdate:modelValue": ($event) => unref(form).slug = $event,
                              class: { "border-destructive": unref(form).errors.slug }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            unref(form).errors.slug ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.slug), 1)) : createCommentVNode("", true)
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Informasi Kategori")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode("Perbarui data kategori")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              createTextVNode("Parent Kategori")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$9), {
                            modelValue: selectedParent.value,
                            "onUpdate:modelValue": ($event) => selectedParent.value = $event
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$a), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$b), { placeholder: "Pilih parent" })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$d), { value: "none" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Tanpa Parent")
                                    ]),
                                    _: 1
                                  }),
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.parents, (item) => {
                                    return openBlock(), createBlock(unref(_sfc_main$d), {
                                      key: item.id,
                                      value: String(item.id)
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(item.name), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["value"]);
                                  }), 128))
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"]),
                          unref(form).errors.parent_id ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive"
                          }, toDisplayString(unref(form).errors.parent_id), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$8), { for: "name" }, {
                            default: withCtx(() => [
                              createTextVNode("Nama")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$e), {
                            id: "name",
                            modelValue: unref(form).name,
                            "onUpdate:modelValue": ($event) => unref(form).name = $event,
                            class: { "border-destructive": unref(form).errors.name }
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                          unref(form).errors.name ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive"
                          }, toDisplayString(unref(form).errors.name), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$8), { for: "slug" }, {
                            default: withCtx(() => [
                              createTextVNode("Slug")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$e), {
                            id: "slug",
                            modelValue: unref(form).slug,
                            "onUpdate:modelValue": ($event) => unref(form).slug = $event,
                            class: { "border-destructive": unref(form).errors.slug }
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                          unref(form).errors.slug ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive"
                          }, toDisplayString(unref(form).errors.slug), 1)) : createCommentVNode("", true)
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="flex justify-end gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), { href: "/admin/zenner-club/categories" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$2), {
                    type: "button",
                    variant: "outline"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Batal`);
                      } else {
                        return [
                          createTextVNode("Batal")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$2), {
                      type: "button",
                      variant: "outline"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Batal")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              type: "submit",
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Save), { class: "mr-2 h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(` ${ssrInterpolate(unref(form).processing ? "Menyimpan..." : "Simpan Perubahan")}`);
                } else {
                  return [
                    createVNode(unref(Save), { class: "mr-2 h-4 w-4" }),
                    createTextVNode(" " + toDisplayString(unref(form).processing ? "Menyimpan..." : "Simpan Perubahan"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form></div>`);
          } else {
            return [
              createVNode("div", { class: "container mx-auto py-6 space-y-6" }, [
                createVNode("div", { class: "flex items-center gap-4" }, [
                  createVNode(unref(Link), { href: "/admin/zenner-club/categories" }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$2), {
                        variant: "outline",
                        size: "icon"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(ArrowLeft), { class: "h-4 w-4" })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("div", null, [
                    createVNode("h1", { class: "text-3xl font-bold" }, "Edit Kategori"),
                    createVNode("p", { class: "text-muted-foreground" }, "Perbarui kategori Zenner Club")
                  ])
                ]),
                createVNode("form", {
                  onSubmit: withModifiers(submit, ["prevent"]),
                  class: "space-y-6"
                }, [
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$4), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Informasi Kategori")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("Perbarui data kategori")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), { class: "space-y-4" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), null, {
                              default: withCtx(() => [
                                createTextVNode("Parent Kategori")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$9), {
                              modelValue: selectedParent.value,
                              "onUpdate:modelValue": ($event) => selectedParent.value = $event
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$a), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$b), { placeholder: "Pilih parent" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$d), { value: "none" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Tanpa Parent")
                                      ]),
                                      _: 1
                                    }),
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.parents, (item) => {
                                      return openBlock(), createBlock(unref(_sfc_main$d), {
                                        key: item.id,
                                        value: String(item.id)
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(item.name), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["value"]);
                                    }), 128))
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"]),
                            unref(form).errors.parent_id ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.parent_id), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "name" }, {
                              default: withCtx(() => [
                                createTextVNode("Nama")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$e), {
                              id: "name",
                              modelValue: unref(form).name,
                              "onUpdate:modelValue": ($event) => unref(form).name = $event,
                              class: { "border-destructive": unref(form).errors.name }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            unref(form).errors.name ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.name), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "slug" }, {
                              default: withCtx(() => [
                                createTextVNode("Slug")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$e), {
                              id: "slug",
                              modelValue: unref(form).slug,
                              "onUpdate:modelValue": ($event) => unref(form).slug = $event,
                              class: { "border-destructive": unref(form).errors.slug }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            unref(form).errors.slug ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.slug), 1)) : createCommentVNode("", true)
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "flex justify-end gap-2" }, [
                    createVNode(unref(Link), { href: "/admin/zenner-club/categories" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$2), {
                          type: "button",
                          variant: "outline"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Batal")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$2), {
                      type: "submit",
                      disabled: unref(form).processing
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Save), { class: "mr-2 h-4 w-4" }),
                        createTextVNode(" " + toDisplayString(unref(form).processing ? "Menyimpan..." : "Simpan Perubahan"), 1)
                      ]),
                      _: 1
                    }, 8, ["disabled"])
                  ])
                ], 32)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/ZennerClub/Categories/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
