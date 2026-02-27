import { defineComponent, unref, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, createCommentVNode, openBlock, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AppLayout-DtCYuQDV.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$6, a as _sfc_main$7, b as _sfc_main$8, d as _sfc_main$9, c as _sfc_main$a } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$c } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$b } from "./Label-16aMY2sx.js";
import { _ as _sfc_main$d } from "./Textarea-pcFPh_uS.js";
import { e as _sfc_main$e } from "./DropdownMenuTrigger-B1v6pHML.js";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5 } from "./index-D3PKcwoM.js";
import { ArrowLeft, Info, MessageSquareQuote, Settings2, ExternalLink, Save } from "lucide-vue-next";
import { toast } from "vue-sonner";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "class-variance-authority";
import "reka-ui";
import "@vueuse/core";
import "./index-3UqiGNe9.js";
import "./AvatarImage-DWFQMckn.js";
import "./index-DS4dn0_o.js";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
import "clsx";
import "tailwind-merge";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    defaultTemplateId: {}
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      title: "",
      message: "",
      template_id: props.defaultTemplateId || ""
    });
    const extractErrorMessage = (errors) => {
      const firstError = Object.values(errors)[0];
      if (typeof firstError === "string") return firstError;
      if (Array.isArray(firstError) && typeof firstError[0] === "string") return firstError[0];
      return "Terjadi kesalahan pada input data.";
    };
    const handleSubmit = () => {
      form.post("/admin/whatsapp-broadcasts", {
        preserveScroll: true,
        onSuccess: (page) => {
          const flash = page.props.flash;
          if (flash?.error) {
            toast.error(flash.error);
            return;
          }
          toast.success(flash?.success || "Draft broadcast berhasil disimpan.");
        },
        onError: (submitErrors) => {
          toast.error(extractErrorMessage(submitErrors));
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Buat Broadcast WhatsApp" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="container mx-auto py-8 max-w-7xl space-y-8" data-v-98c07439${_scopeId}><div class="flex items-center justify-between border-b pb-6" data-v-98c07439${_scopeId}><div class="flex items-center gap-4" data-v-98c07439${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), { href: "/admin/whatsapp-broadcasts" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$2), {
                    variant: "ghost",
                    size: "icon",
                    class: "rounded-full"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(ArrowLeft), { class: "h-5 w-5" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(ArrowLeft), { class: "h-5 w-5" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$2), {
                      variant: "ghost",
                      size: "icon",
                      class: "rounded-full"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(ArrowLeft), { class: "h-5 w-5" })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div data-v-98c07439${_scopeId}><h1 class="text-3xl font-extrabold tracking-tight" data-v-98c07439${_scopeId}>Buat Broadcast Baru</h1><p class="text-muted-foreground" data-v-98c07439${_scopeId}>Kirim pesan massal menggunakan infrastruktur Qontak</p></div></div></div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$3), { class: "bg-primary/5 border-primary/20" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Info), { class: "h-5 w-5 text-primary" }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { class: "font-bold text-primary" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Informasi Penting`);
                      } else {
                        return [
                          createTextVNode("Informasi Penting")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$5), { class: "text-primary/80" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Isi pesan di bawah akan dimasukkan ke dalam variabel body template Qontak Anda (biasanya ditandai dengan <code data-v-98c07439${_scopeId3}>${ssrInterpolate(1)}</code>). Pastikan template sudah berstatus <strong data-v-98c07439${_scopeId3}>Approved</strong> di dashboard Qontak. `);
                      } else {
                        return [
                          createTextVNode(" Isi pesan di bawah akan dimasukkan ke dalam variabel body template Qontak Anda (biasanya ditandai dengan "),
                          createVNode("code", null, toDisplayString(1)),
                          createTextVNode("). Pastikan template sudah berstatus "),
                          createVNode("strong", null, "Approved"),
                          createTextVNode(" di dashboard Qontak. ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Info), { class: "h-5 w-5 text-primary" }),
                    createVNode(unref(_sfc_main$4), { class: "font-bold text-primary" }, {
                      default: withCtx(() => [
                        createTextVNode("Informasi Penting")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$5), { class: "text-primary/80" }, {
                      default: withCtx(() => [
                        createTextVNode(" Isi pesan di bawah akan dimasukkan ke dalam variabel body template Qontak Anda (biasanya ditandai dengan "),
                        createVNode("code", null, toDisplayString(1)),
                        createTextVNode("). Pastikan template sudah berstatus "),
                        createVNode("strong", null, "Approved"),
                        createTextVNode(" di dashboard Qontak. ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<form class="grid grid-cols-1 lg:grid-cols-3 gap-8" data-v-98c07439${_scopeId}><div class="lg:col-span-2 space-y-6" data-v-98c07439${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$6), { class: "shadow-sm" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$7), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex items-center gap-2 mb-1" data-v-98c07439${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(MessageSquareQuote), { class: "h-5 w-5 text-muted-foreground" }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$8), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Konten Broadcast`);
                            } else {
                              return [
                                createTextVNode("Konten Broadcast")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Definisikan judul campaign dan isi pesan utama.`);
                            } else {
                              return [
                                createTextVNode("Definisikan judul campaign dan isi pesan utama.")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center gap-2 mb-1" }, [
                            createVNode(unref(MessageSquareQuote), { class: "h-5 w-5 text-muted-foreground" }),
                            createVNode(unref(_sfc_main$8), null, {
                              default: withCtx(() => [
                                createTextVNode("Konten Broadcast")
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode(unref(_sfc_main$9), null, {
                            default: withCtx(() => [
                              createTextVNode("Definisikan judul campaign dan isi pesan utama.")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$a), { class: "space-y-6" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="space-y-2" data-v-98c07439${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$b), {
                          for: "title",
                          class: "text-sm font-bold"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Nama Campaign / Judul *`);
                            } else {
                              return [
                                createTextVNode("Nama Campaign / Judul *")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$c), {
                          id: "title",
                          modelValue: unref(form).title,
                          "onUpdate:modelValue": ($event) => unref(form).title = $event,
                          placeholder: "Contoh: Promo Flash Sale Weekend",
                          class: { "border-destructive ring-destructive": unref(form).errors.title }
                        }, null, _parent4, _scopeId3));
                        _push4(`<p class="text-[11px] text-muted-foreground italic" data-v-98c07439${_scopeId3}>Nama ini hanya untuk kebutuhan internal admin.</p>`);
                        if (unref(form).errors.title) {
                          _push4(`<p class="text-xs font-medium text-destructive mt-1" data-v-98c07439${_scopeId3}>${ssrInterpolate(unref(form).errors.title)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="space-y-2" data-v-98c07439${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$b), {
                          for: "message",
                          class: "text-sm font-bold"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Body Parameter (Pesan) *`);
                            } else {
                              return [
                                createTextVNode("Body Parameter (Pesan) *")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$d), {
                          id: "message",
                          modelValue: unref(form).message,
                          "onUpdate:modelValue": ($event) => unref(form).message = $event,
                          placeholder: "Tulis variabel pesan yang ingin dikirim...",
                          rows: "10",
                          class: ["resize-none leading-relaxed", { "border-destructive ring-destructive": unref(form).errors.message }]
                        }, null, _parent4, _scopeId3));
                        _push4(`<div class="flex justify-between items-center px-1" data-v-98c07439${_scopeId3}><p class="text-[11px] text-muted-foreground" data-v-98c07439${_scopeId3}>Isi teks ini akan menggantikan variabel body pada template.</p><span class="text-[10px] font-mono font-medium py-1 px-2 bg-muted rounded" data-v-98c07439${_scopeId3}>${ssrInterpolate(unref(form).message.length)} Karakter</span></div>`);
                        if (unref(form).errors.message) {
                          _push4(`<p class="text-xs font-medium text-destructive mt-1" data-v-98c07439${_scopeId3}>${ssrInterpolate(unref(form).errors.message)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$b), {
                              for: "title",
                              class: "text-sm font-bold"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Nama Campaign / Judul *")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), {
                              id: "title",
                              modelValue: unref(form).title,
                              "onUpdate:modelValue": ($event) => unref(form).title = $event,
                              placeholder: "Contoh: Promo Flash Sale Weekend",
                              class: { "border-destructive ring-destructive": unref(form).errors.title }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            createVNode("p", { class: "text-[11px] text-muted-foreground italic" }, "Nama ini hanya untuk kebutuhan internal admin."),
                            unref(form).errors.title ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-xs font-medium text-destructive mt-1"
                            }, toDisplayString(unref(form).errors.title), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$b), {
                              for: "message",
                              class: "text-sm font-bold"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Body Parameter (Pesan) *")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$d), {
                              id: "message",
                              modelValue: unref(form).message,
                              "onUpdate:modelValue": ($event) => unref(form).message = $event,
                              placeholder: "Tulis variabel pesan yang ingin dikirim...",
                              rows: "10",
                              class: ["resize-none leading-relaxed", { "border-destructive ring-destructive": unref(form).errors.message }]
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            createVNode("div", { class: "flex justify-between items-center px-1" }, [
                              createVNode("p", { class: "text-[11px] text-muted-foreground" }, "Isi teks ini akan menggantikan variabel body pada template."),
                              createVNode("span", { class: "text-[10px] font-mono font-medium py-1 px-2 bg-muted rounded" }, toDisplayString(unref(form).message.length) + " Karakter", 1)
                            ]),
                            unref(form).errors.message ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-xs font-medium text-destructive mt-1"
                            }, toDisplayString(unref(form).errors.message), 1)) : createCommentVNode("", true)
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$7), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex items-center gap-2 mb-1" }, [
                          createVNode(unref(MessageSquareQuote), { class: "h-5 w-5 text-muted-foreground" }),
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              createTextVNode("Konten Broadcast")
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode(unref(_sfc_main$9), null, {
                          default: withCtx(() => [
                            createTextVNode("Definisikan judul campaign dan isi pesan utama.")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$a), { class: "space-y-6" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$b), {
                            for: "title",
                            class: "text-sm font-bold"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Nama Campaign / Judul *")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$c), {
                            id: "title",
                            modelValue: unref(form).title,
                            "onUpdate:modelValue": ($event) => unref(form).title = $event,
                            placeholder: "Contoh: Promo Flash Sale Weekend",
                            class: { "border-destructive ring-destructive": unref(form).errors.title }
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                          createVNode("p", { class: "text-[11px] text-muted-foreground italic" }, "Nama ini hanya untuk kebutuhan internal admin."),
                          unref(form).errors.title ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-xs font-medium text-destructive mt-1"
                          }, toDisplayString(unref(form).errors.title), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$b), {
                            for: "message",
                            class: "text-sm font-bold"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Body Parameter (Pesan) *")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$d), {
                            id: "message",
                            modelValue: unref(form).message,
                            "onUpdate:modelValue": ($event) => unref(form).message = $event,
                            placeholder: "Tulis variabel pesan yang ingin dikirim...",
                            rows: "10",
                            class: ["resize-none leading-relaxed", { "border-destructive ring-destructive": unref(form).errors.message }]
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                          createVNode("div", { class: "flex justify-between items-center px-1" }, [
                            createVNode("p", { class: "text-[11px] text-muted-foreground" }, "Isi teks ini akan menggantikan variabel body pada template."),
                            createVNode("span", { class: "text-[10px] font-mono font-medium py-1 px-2 bg-muted rounded" }, toDisplayString(unref(form).message.length) + " Karakter", 1)
                          ]),
                          unref(form).errors.message ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-xs font-medium text-destructive mt-1"
                          }, toDisplayString(unref(form).errors.message), 1)) : createCommentVNode("", true)
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="space-y-6" data-v-98c07439${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$6), { class: "border-primary/10 shadow-sm" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$7), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex items-center gap-2 mb-1" data-v-98c07439${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Settings2), { class: "h-4 w-4 text-muted-foreground" }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { class: "text-base" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Konfigurasi Qontak`);
                            } else {
                              return [
                                createTextVNode("Konfigurasi Qontak")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center gap-2 mb-1" }, [
                            createVNode(unref(Settings2), { class: "h-4 w-4 text-muted-foreground" }),
                            createVNode(unref(_sfc_main$8), { class: "text-base" }, {
                              default: withCtx(() => [
                                createTextVNode("Konfigurasi Qontak")
                              ]),
                              _: 1
                            })
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$a), { class: "space-y-5" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="space-y-2" data-v-98c07439${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$b), {
                          for: "template_id",
                          class: "text-xs font-bold uppercase tracking-wider"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Template ID`);
                            } else {
                              return [
                                createTextVNode("Template ID")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$c), {
                          id: "template_id",
                          modelValue: unref(form).template_id,
                          "onUpdate:modelValue": ($event) => unref(form).template_id = $event,
                          placeholder: "ID dari Qontak...",
                          class: "bg-muted/50 font-mono text-xs"
                        }, null, _parent4, _scopeId3));
                        _push4(`<div class="rounded-lg bg-muted p-3 border border-dashed text-center" data-v-98c07439${_scopeId3}><p class="text-[10px] text-muted-foreground font-semibold mb-1 uppercase" data-v-98c07439${_scopeId3}>Saran Default</p><code class="text-xs break-all text-primary font-bold" data-v-98c07439${_scopeId3}>${ssrInterpolate(__props.defaultTemplateId || "N/A")}</code></div></div>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$e), null, null, _parent4, _scopeId3));
                        _push4(`<div class="space-y-3" data-v-98c07439${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$b), { class: "text-xs font-bold text-muted-foreground uppercase tracking-wider" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Tautan Cepat`);
                            } else {
                              return [
                                createTextVNode("Tautan Cepat")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<a href="https://dashboard.qontak.com" target="_blank" class="flex items-center gap-2 text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors" data-v-98c07439${_scopeId3}> Buka Dashboard Qontak `);
                        _push4(ssrRenderComponent(unref(ExternalLink), { class: "h-3 w-3" }, null, _parent4, _scopeId3));
                        _push4(`</a></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$b), {
                              for: "template_id",
                              class: "text-xs font-bold uppercase tracking-wider"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Template ID")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), {
                              id: "template_id",
                              modelValue: unref(form).template_id,
                              "onUpdate:modelValue": ($event) => unref(form).template_id = $event,
                              placeholder: "ID dari Qontak...",
                              class: "bg-muted/50 font-mono text-xs"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode("div", { class: "rounded-lg bg-muted p-3 border border-dashed text-center" }, [
                              createVNode("p", { class: "text-[10px] text-muted-foreground font-semibold mb-1 uppercase" }, "Saran Default"),
                              createVNode("code", { class: "text-xs break-all text-primary font-bold" }, toDisplayString(__props.defaultTemplateId || "N/A"), 1)
                            ])
                          ]),
                          createVNode(unref(_sfc_main$e)),
                          createVNode("div", { class: "space-y-3" }, [
                            createVNode(unref(_sfc_main$b), { class: "text-xs font-bold text-muted-foreground uppercase tracking-wider" }, {
                              default: withCtx(() => [
                                createTextVNode("Tautan Cepat")
                              ]),
                              _: 1
                            }),
                            createVNode("a", {
                              href: "https://dashboard.qontak.com",
                              target: "_blank",
                              class: "flex items-center gap-2 text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors"
                            }, [
                              createTextVNode(" Buka Dashboard Qontak "),
                              createVNode(unref(ExternalLink), { class: "h-3 w-3" })
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$7), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex items-center gap-2 mb-1" }, [
                          createVNode(unref(Settings2), { class: "h-4 w-4 text-muted-foreground" }),
                          createVNode(unref(_sfc_main$8), { class: "text-base" }, {
                            default: withCtx(() => [
                              createTextVNode("Konfigurasi Qontak")
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$a), { class: "space-y-5" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$b), {
                            for: "template_id",
                            class: "text-xs font-bold uppercase tracking-wider"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Template ID")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$c), {
                            id: "template_id",
                            modelValue: unref(form).template_id,
                            "onUpdate:modelValue": ($event) => unref(form).template_id = $event,
                            placeholder: "ID dari Qontak...",
                            class: "bg-muted/50 font-mono text-xs"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("div", { class: "rounded-lg bg-muted p-3 border border-dashed text-center" }, [
                            createVNode("p", { class: "text-[10px] text-muted-foreground font-semibold mb-1 uppercase" }, "Saran Default"),
                            createVNode("code", { class: "text-xs break-all text-primary font-bold" }, toDisplayString(__props.defaultTemplateId || "N/A"), 1)
                          ])
                        ]),
                        createVNode(unref(_sfc_main$e)),
                        createVNode("div", { class: "space-y-3" }, [
                          createVNode(unref(_sfc_main$b), { class: "text-xs font-bold text-muted-foreground uppercase tracking-wider" }, {
                            default: withCtx(() => [
                              createTextVNode("Tautan Cepat")
                            ]),
                            _: 1
                          }),
                          createVNode("a", {
                            href: "https://dashboard.qontak.com",
                            target: "_blank",
                            class: "flex items-center gap-2 text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors"
                          }, [
                            createTextVNode(" Buka Dashboard Qontak "),
                            createVNode(unref(ExternalLink), { class: "h-3 w-3" })
                          ])
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="flex flex-col gap-3" data-v-98c07439${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              class: "w-full py-6 font-bold text-lg shadow-lg",
              disabled: unref(form).processing,
              onClick: handleSubmit
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Save), { class: "h-5 w-5 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` Simpan Draft `);
                } else {
                  return [
                    createVNode(unref(Save), { class: "h-5 w-5 mr-2" }),
                    createTextVNode(" Simpan Draft ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), { href: "/admin/whatsapp-broadcasts" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$2), {
                    variant: "ghost",
                    class: "w-full text-muted-foreground"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Batalkan`);
                      } else {
                        return [
                          createTextVNode("Batalkan")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$2), {
                      variant: "ghost",
                      class: "w-full text-muted-foreground"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Batalkan")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></form></div>`);
          } else {
            return [
              createVNode("div", { class: "container mx-auto py-8 max-w-7xl space-y-8" }, [
                createVNode("div", { class: "flex items-center justify-between border-b pb-6" }, [
                  createVNode("div", { class: "flex items-center gap-4" }, [
                    createVNode(unref(Link), { href: "/admin/whatsapp-broadcasts" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$2), {
                          variant: "ghost",
                          size: "icon",
                          class: "rounded-full"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(ArrowLeft), { class: "h-5 w-5" })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-3xl font-extrabold tracking-tight" }, "Buat Broadcast Baru"),
                      createVNode("p", { class: "text-muted-foreground" }, "Kirim pesan massal menggunakan infrastruktur Qontak")
                    ])
                  ])
                ]),
                createVNode(unref(_sfc_main$3), { class: "bg-primary/5 border-primary/20" }, {
                  default: withCtx(() => [
                    createVNode(unref(Info), { class: "h-5 w-5 text-primary" }),
                    createVNode(unref(_sfc_main$4), { class: "font-bold text-primary" }, {
                      default: withCtx(() => [
                        createTextVNode("Informasi Penting")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$5), { class: "text-primary/80" }, {
                      default: withCtx(() => [
                        createTextVNode(" Isi pesan di bawah akan dimasukkan ke dalam variabel body template Qontak Anda (biasanya ditandai dengan "),
                        createVNode("code", null, toDisplayString(1)),
                        createTextVNode("). Pastikan template sudah berstatus "),
                        createVNode("strong", null, "Approved"),
                        createTextVNode(" di dashboard Qontak. ")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode("form", {
                  onSubmit: withModifiers(handleSubmit, ["prevent"]),
                  class: "grid grid-cols-1 lg:grid-cols-3 gap-8"
                }, [
                  createVNode("div", { class: "lg:col-span-2 space-y-6" }, [
                    createVNode(unref(_sfc_main$6), { class: "shadow-sm" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$7), null, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex items-center gap-2 mb-1" }, [
                              createVNode(unref(MessageSquareQuote), { class: "h-5 w-5 text-muted-foreground" }),
                              createVNode(unref(_sfc_main$8), null, {
                                default: withCtx(() => [
                                  createTextVNode("Konten Broadcast")
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode(unref(_sfc_main$9), null, {
                              default: withCtx(() => [
                                createTextVNode("Definisikan judul campaign dan isi pesan utama.")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$a), { class: "space-y-6" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$b), {
                                for: "title",
                                class: "text-sm font-bold"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Nama Campaign / Judul *")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), {
                                id: "title",
                                modelValue: unref(form).title,
                                "onUpdate:modelValue": ($event) => unref(form).title = $event,
                                placeholder: "Contoh: Promo Flash Sale Weekend",
                                class: { "border-destructive ring-destructive": unref(form).errors.title }
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              createVNode("p", { class: "text-[11px] text-muted-foreground italic" }, "Nama ini hanya untuk kebutuhan internal admin."),
                              unref(form).errors.title ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-xs font-medium text-destructive mt-1"
                              }, toDisplayString(unref(form).errors.title), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$b), {
                                for: "message",
                                class: "text-sm font-bold"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Body Parameter (Pesan) *")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$d), {
                                id: "message",
                                modelValue: unref(form).message,
                                "onUpdate:modelValue": ($event) => unref(form).message = $event,
                                placeholder: "Tulis variabel pesan yang ingin dikirim...",
                                rows: "10",
                                class: ["resize-none leading-relaxed", { "border-destructive ring-destructive": unref(form).errors.message }]
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              createVNode("div", { class: "flex justify-between items-center px-1" }, [
                                createVNode("p", { class: "text-[11px] text-muted-foreground" }, "Isi teks ini akan menggantikan variabel body pada template."),
                                createVNode("span", { class: "text-[10px] font-mono font-medium py-1 px-2 bg-muted rounded" }, toDisplayString(unref(form).message.length) + " Karakter", 1)
                              ]),
                              unref(form).errors.message ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-xs font-medium text-destructive mt-1"
                              }, toDisplayString(unref(form).errors.message), 1)) : createCommentVNode("", true)
                            ])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("div", { class: "space-y-6" }, [
                    createVNode(unref(_sfc_main$6), { class: "border-primary/10 shadow-sm" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$7), null, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex items-center gap-2 mb-1" }, [
                              createVNode(unref(Settings2), { class: "h-4 w-4 text-muted-foreground" }),
                              createVNode(unref(_sfc_main$8), { class: "text-base" }, {
                                default: withCtx(() => [
                                  createTextVNode("Konfigurasi Qontak")
                                ]),
                                _: 1
                              })
                            ])
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$a), { class: "space-y-5" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$b), {
                                for: "template_id",
                                class: "text-xs font-bold uppercase tracking-wider"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Template ID")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), {
                                id: "template_id",
                                modelValue: unref(form).template_id,
                                "onUpdate:modelValue": ($event) => unref(form).template_id = $event,
                                placeholder: "ID dari Qontak...",
                                class: "bg-muted/50 font-mono text-xs"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode("div", { class: "rounded-lg bg-muted p-3 border border-dashed text-center" }, [
                                createVNode("p", { class: "text-[10px] text-muted-foreground font-semibold mb-1 uppercase" }, "Saran Default"),
                                createVNode("code", { class: "text-xs break-all text-primary font-bold" }, toDisplayString(__props.defaultTemplateId || "N/A"), 1)
                              ])
                            ]),
                            createVNode(unref(_sfc_main$e)),
                            createVNode("div", { class: "space-y-3" }, [
                              createVNode(unref(_sfc_main$b), { class: "text-xs font-bold text-muted-foreground uppercase tracking-wider" }, {
                                default: withCtx(() => [
                                  createTextVNode("Tautan Cepat")
                                ]),
                                _: 1
                              }),
                              createVNode("a", {
                                href: "https://dashboard.qontak.com",
                                target: "_blank",
                                class: "flex items-center gap-2 text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors"
                              }, [
                                createTextVNode(" Buka Dashboard Qontak "),
                                createVNode(unref(ExternalLink), { class: "h-3 w-3" })
                              ])
                            ])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "flex flex-col gap-3" }, [
                      createVNode(unref(_sfc_main$2), {
                        class: "w-full py-6 font-bold text-lg shadow-lg",
                        disabled: unref(form).processing,
                        onClick: handleSubmit
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Save), { class: "h-5 w-5 mr-2" }),
                          createTextVNode(" Simpan Draft ")
                        ]),
                        _: 1
                      }, 8, ["disabled"]),
                      createVNode(unref(Link), { href: "/admin/whatsapp-broadcasts" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$2), {
                            variant: "ghost",
                            class: "w-full text-muted-foreground"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Batalkan")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/WhatsAppBroadcasts/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Create = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-98c07439"]]);
export {
  Create as default
};
