import { defineComponent, watch, ref, computed, withCtx, unref, createVNode, createTextVNode, toDisplayString, createBlock, createCommentVNode, withDirectives, vModelRadio, openBlock, Fragment, renderList, withKeys, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseEqual, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AppLayout-BHxY2bcF.js";
import { useForm, Head, router } from "@inertiajs/vue3";
import { u as usePermissions } from "./usePermissions-DYRibCI0.js";
import { _ as _sfc_main$g } from "./index-BpQimeTM.js";
import { _ as _sfc_main$2 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$7, a as _sfc_main$8, b as _sfc_main$9, d as _sfc_main$a, c as _sfc_main$b } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$d } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$c } from "./Label-16aMY2sx.js";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5, c as _sfc_main$6 } from "./TabsTrigger-Bvg0QZyC.js";
import { e as _sfc_main$e } from "./DropdownMenuTrigger-B1v6pHML.js";
import { Settings, Save, Globe, Facebook, CreditCard, Upload, X, Twitter, Instagram, Youtube, Info } from "lucide-vue-next";
import { _ as _sfc_main$f } from "./TiptapEditor-DwYmVXGi.js";
import "class-variance-authority";
import "reka-ui";
import "@vueuse/core";
import "./index-3UqiGNe9.js";
import "./AvatarImage-DWFQMckn.js";
import "./index-Bfu0FVt6.js";
import "vue-sonner";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
import "clsx";
import "tailwind-merge";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    settings: {}
  },
  setup(__props) {
    const { isSuperAdmin, isAdmin } = usePermissions();
    const props = __props;
    const populateFormSettings = () => {
      Object.values(props.settings).flat().forEach((setting) => {
        form.settings[setting.key] = setting.value;
      });
    };
    const form = useForm({
      settings: {},
      site_logo: null
    });
    populateFormSettings();
    watch(() => props.settings, () => {
      populateFormSettings();
      paymentMethods.value = getPaymentMethods();
    }, { deep: true });
    const getPaymentMethods = () => {
      const value = form.settings["payment_methods"];
      if (!value) return [];
      try {
        return JSON.parse(value);
      } catch {
        return [];
      }
    };
    const paymentMethods = ref(getPaymentMethods());
    const newPaymentMethod = ref("");
    const logoInputMode = ref("url");
    const logoPreview = ref(null);
    const currentLogoUrl = computed(() => {
      if (logoPreview.value) return logoPreview.value;
      return form.settings["site_logo"] || null;
    });
    const handleLogoUpload = (event) => {
      const target = event.target;
      const file = target.files?.[0];
      if (file) {
        form.site_logo = file;
        form.settings["site_logo"] = null;
        const reader = new FileReader();
        reader.onload = (e) => {
          logoPreview.value = e.target?.result;
        };
        reader.readAsDataURL(file);
      }
    };
    const triggerFileInput = () => {
      if (typeof window === "undefined") return;
      const input = window.document.getElementById("logo_upload");
      if (input) input.click();
    };
    const removeLogo = () => {
      form.site_logo = null;
      logoPreview.value = null;
      form.settings["site_logo"] = null;
      if (typeof document !== "undefined") {
        const fileInput = document.getElementById("logo_upload");
        if (fileInput) fileInput.value = "";
      }
    };
    watch(logoInputMode, (newMode) => {
      if (newMode === "url") {
        form.site_logo = null;
        logoPreview.value = null;
        if (typeof document !== "undefined") {
          const fileInput = document.getElementById("logo_upload");
          if (fileInput) fileInput.value = "";
        }
      }
    });
    const addPaymentMethod = () => {
      if (newPaymentMethod.value.trim() && !paymentMethods.value.includes(newPaymentMethod.value.trim())) {
        paymentMethods.value.push(newPaymentMethod.value.trim());
        form.settings["payment_methods"] = JSON.stringify(paymentMethods.value);
        newPaymentMethod.value = "";
      }
    };
    const removePaymentMethod = (method) => {
      paymentMethods.value = paymentMethods.value.filter((m) => m !== method);
      form.settings["payment_methods"] = JSON.stringify(paymentMethods.value);
    };
    const saveSettings = () => {
      form.post("/admin/settings", {
        preserveScroll: true,
        forceFormData: true,
        onSuccess: () => {
          logoPreview.value = null;
          form.site_logo = null;
          if (typeof document !== "undefined") {
            const fileInput = document.getElementById("logo_upload");
            if (fileInput) fileInput.value = "";
          }
          router.reload({ only: [] });
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Pengaturan Ecommerce" }, null, _parent2, _scopeId));
            _push2(`<div class="container mx-auto py-6 space-y-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="text-3xl font-bold tracking-tight flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Settings), { class: "h-8 w-8" }, null, _parent2, _scopeId));
            _push2(` Pengaturan Ecommerce </h1><p class="text-muted-foreground mt-1"${_scopeId}> Kelola pengaturan situs, media sosial, dan metode pembayaran </p></div>`);
            if (unref(isSuperAdmin) || unref(isAdmin)) {
              _push2(ssrRenderComponent(unref(_sfc_main$2), {
                onClick: saveSettings,
                disabled: unref(form).processing,
                size: "lg"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Save), { class: "h-4 w-4 mr-2" }, null, _parent3, _scopeId2));
                    _push3(` ${ssrInterpolate(unref(form).processing ? "Menyimpan..." : "Simpan Perubahan")}`);
                  } else {
                    return [
                      createVNode(unref(Save), { class: "h-4 w-4 mr-2" }),
                      createTextVNode(" " + toDisplayString(unref(form).processing ? "Menyimpan..." : "Simpan Perubahan"), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (unref(isSuperAdmin) || unref(isAdmin)) {
              _push2(ssrRenderComponent(unref(_sfc_main$3), {
                "default-value": "general",
                class: "space-y-6"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$4), { class: "grid w-full grid-cols-3" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(_sfc_main$5), {
                            value: "general",
                            class: "flex items-center gap-2"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(Globe), { class: "h-4 w-4" }, null, _parent5, _scopeId4));
                                _push5(`<span${_scopeId4}>Umum</span>`);
                              } else {
                                return [
                                  createVNode(unref(Globe), { class: "h-4 w-4" }),
                                  createVNode("span", null, "Umum")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$5), {
                            value: "social",
                            class: "flex items-center gap-2"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(Facebook), { class: "h-4 w-4" }, null, _parent5, _scopeId4));
                                _push5(`<span${_scopeId4}>Media Sosial</span>`);
                              } else {
                                return [
                                  createVNode(unref(Facebook), { class: "h-4 w-4" }),
                                  createVNode("span", null, "Media Sosial")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$5), {
                            value: "payment",
                            class: "flex items-center gap-2"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(CreditCard), { class: "h-4 w-4" }, null, _parent5, _scopeId4));
                                _push5(`<span${_scopeId4}>Pembayaran</span>`);
                              } else {
                                return [
                                  createVNode(unref(CreditCard), { class: "h-4 w-4" }),
                                  createVNode("span", null, "Pembayaran")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(_sfc_main$5), {
                              value: "general",
                              class: "flex items-center gap-2"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Globe), { class: "h-4 w-4" }),
                                createVNode("span", null, "Umum")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$5), {
                              value: "social",
                              class: "flex items-center gap-2"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Facebook), { class: "h-4 w-4" }),
                                createVNode("span", null, "Media Sosial")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$5), {
                              value: "payment",
                              class: "flex items-center gap-2"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(CreditCard), { class: "h-4 w-4" }),
                                createVNode("span", null, "Pembayaran")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$6), { value: "general" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(_sfc_main$7), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(_sfc_main$8), null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(_sfc_main$9), null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Pengaturan Umum`);
                                          } else {
                                            return [
                                              createTextVNode("Pengaturan Umum")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(unref(_sfc_main$a), null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(` Atur informasi dasar situs seperti nama, deskripsi, dan logo `);
                                          } else {
                                            return [
                                              createTextVNode(" Atur informasi dasar situs seperti nama, deskripsi, dan logo ")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(unref(_sfc_main$9), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Pengaturan Umum")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$a), null, {
                                          default: withCtx(() => [
                                            createTextVNode(" Atur informasi dasar situs seperti nama, deskripsi, dan logo ")
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(_sfc_main$b), { class: "space-y-6" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<div class="space-y-2"${_scopeId5}>`);
                                      _push6(ssrRenderComponent(unref(_sfc_main$c), { for: "site_name" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Nama Situs`);
                                          } else {
                                            return [
                                              createTextVNode("Nama Situs")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(unref(_sfc_main$d), {
                                        id: "site_name",
                                        modelValue: unref(form).settings["site_name"],
                                        "onUpdate:modelValue": ($event) => unref(form).settings["site_name"] = $event,
                                        placeholder: "PURANUSA",
                                        disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                      }, null, _parent6, _scopeId5));
                                      _push6(`<p class="text-xs text-muted-foreground"${_scopeId5}> Nama situs yang akan ditampilkan di header dan footer </p></div>`);
                                      _push6(ssrRenderComponent(unref(_sfc_main$e), null, null, _parent6, _scopeId5));
                                      _push6(`<div class="space-y-2"${_scopeId5}>`);
                                      _push6(ssrRenderComponent(unref(_sfc_main$c), { for: "site_description" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Deskripsi Situs`);
                                          } else {
                                            return [
                                              createTextVNode("Deskripsi Situs")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_sfc_main$f, {
                                        modelValue: unref(form).settings["site_description"],
                                        "onUpdate:modelValue": ($event) => unref(form).settings["site_description"] = $event,
                                        disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                      }, null, _parent6, _scopeId5));
                                      _push6(`<p class="text-xs text-muted-foreground"${_scopeId5}> Deskripsi singkat tentang situs yang akan ditampilkan di footer </p></div>`);
                                      _push6(ssrRenderComponent(unref(_sfc_main$e), null, null, _parent6, _scopeId5));
                                      _push6(`<div class="space-y-4"${_scopeId5}><div${_scopeId5}>`);
                                      _push6(ssrRenderComponent(unref(_sfc_main$c), null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Logo Situs`);
                                          } else {
                                            return [
                                              createTextVNode("Logo Situs")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(`<p class="text-xs text-muted-foreground mt-1"${_scopeId5}> Upload logo atau masukkan URL logo yang akan ditampilkan di situs </p></div><div class="flex gap-4"${_scopeId5}><label class="flex items-center gap-2 cursor-pointer"${_scopeId5}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(logoInputMode.value, "url")) ? " checked" : ""} value="url" class="w-4 h-4"${_scopeId5}><span class="text-sm"${_scopeId5}>Input URL</span></label><label class="flex items-center gap-2 cursor-pointer"${_scopeId5}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(logoInputMode.value, "upload")) ? " checked" : ""} value="upload" class="w-4 h-4"${_scopeId5}><span class="text-sm"${_scopeId5}>Upload File</span></label></div>`);
                                      if (logoInputMode.value === "url") {
                                        _push6(`<div class="space-y-2"${_scopeId5}>`);
                                        _push6(ssrRenderComponent(unref(_sfc_main$d), {
                                          id: "site_logo_url",
                                          modelValue: unref(form).settings["site_logo"],
                                          "onUpdate:modelValue": ($event) => unref(form).settings["site_logo"] = $event,
                                          placeholder: "https://example.com/logo.png",
                                          type: "url",
                                          disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                        }, null, _parent6, _scopeId5));
                                        _push6(`</div>`);
                                      } else {
                                        _push6(`<div class="space-y-2"${_scopeId5}><div class="flex gap-2"${_scopeId5}><div class="flex-1"${_scopeId5}><input id="logo_upload" type="file" accept="image/*" class="hidden"${ssrIncludeBooleanAttr(!(unref(isSuperAdmin) || unref(isAdmin))) ? " disabled" : ""}${_scopeId5}>`);
                                        _push6(ssrRenderComponent(unref(_sfc_main$2), {
                                          type: "button",
                                          variant: "outline",
                                          class: "w-full",
                                          onClick: triggerFileInput,
                                          disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(unref(Upload), { class: "h-4 w-4 mr-2" }, null, _parent7, _scopeId6));
                                              _push7(` ${ssrInterpolate(unref(form).site_logo ? "Ganti File" : "Pilih File")}`);
                                            } else {
                                              return [
                                                createVNode(unref(Upload), { class: "h-4 w-4 mr-2" }),
                                                createTextVNode(" " + toDisplayString(unref(form).site_logo ? "Ganti File" : "Pilih File"), 1)
                                              ];
                                            }
                                          }),
                                          _: 1
                                        }, _parent6, _scopeId5));
                                        _push6(`</div>`);
                                        if (currentLogoUrl.value) {
                                          _push6(ssrRenderComponent(unref(_sfc_main$2), {
                                            type: "button",
                                            variant: "destructive",
                                            onClick: removeLogo,
                                            disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                          }, {
                                            default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                              if (_push7) {
                                                _push7(ssrRenderComponent(unref(X), { class: "h-4 w-4" }, null, _parent7, _scopeId6));
                                              } else {
                                                return [
                                                  createVNode(unref(X), { class: "h-4 w-4" })
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent6, _scopeId5));
                                        } else {
                                          _push6(`<!---->`);
                                        }
                                        _push6(`</div><p class="text-xs text-muted-foreground"${_scopeId5}> Format: JPG, PNG, GIF (Max: 2MB) </p></div>`);
                                      }
                                      if (currentLogoUrl.value) {
                                        _push6(`<div class="mt-4"${_scopeId5}>`);
                                        _push6(ssrRenderComponent(unref(_sfc_main$c), { class: "mb-2 block" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`Preview`);
                                            } else {
                                              return [
                                                createTextVNode("Preview")
                                              ];
                                            }
                                          }),
                                          _: 1
                                        }, _parent6, _scopeId5));
                                        _push6(`<div class="border rounded-lg p-4 bg-muted/50 flex items-center justify-center"${_scopeId5}><img${ssrRenderAttr("src", currentLogoUrl.value)} alt="Logo Preview" class="max-h-32 max-w-full object-contain"${_scopeId5}></div></div>`);
                                      } else {
                                        _push6(`<!---->`);
                                      }
                                      _push6(`</div>`);
                                    } else {
                                      return [
                                        createVNode("div", { class: "space-y-2" }, [
                                          createVNode(unref(_sfc_main$c), { for: "site_name" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Nama Situs")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$d), {
                                            id: "site_name",
                                            modelValue: unref(form).settings["site_name"],
                                            "onUpdate:modelValue": ($event) => unref(form).settings["site_name"] = $event,
                                            placeholder: "PURANUSA",
                                            disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                                          createVNode("p", { class: "text-xs text-muted-foreground" }, " Nama situs yang akan ditampilkan di header dan footer ")
                                        ]),
                                        createVNode(unref(_sfc_main$e)),
                                        createVNode("div", { class: "space-y-2" }, [
                                          createVNode(unref(_sfc_main$c), { for: "site_description" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Deskripsi Situs")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_sfc_main$f, {
                                            modelValue: unref(form).settings["site_description"],
                                            "onUpdate:modelValue": ($event) => unref(form).settings["site_description"] = $event,
                                            disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                                          createVNode("p", { class: "text-xs text-muted-foreground" }, " Deskripsi singkat tentang situs yang akan ditampilkan di footer ")
                                        ]),
                                        createVNode(unref(_sfc_main$e)),
                                        createVNode("div", { class: "space-y-4" }, [
                                          createVNode("div", null, [
                                            createVNode(unref(_sfc_main$c), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Logo Situs")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode("p", { class: "text-xs text-muted-foreground mt-1" }, " Upload logo atau masukkan URL logo yang akan ditampilkan di situs ")
                                          ]),
                                          createVNode("div", { class: "flex gap-4" }, [
                                            createVNode("label", { class: "flex items-center gap-2 cursor-pointer" }, [
                                              withDirectives(createVNode("input", {
                                                type: "radio",
                                                "onUpdate:modelValue": ($event) => logoInputMode.value = $event,
                                                value: "url",
                                                class: "w-4 h-4"
                                              }, null, 8, ["onUpdate:modelValue"]), [
                                                [vModelRadio, logoInputMode.value]
                                              ]),
                                              createVNode("span", { class: "text-sm" }, "Input URL")
                                            ]),
                                            createVNode("label", { class: "flex items-center gap-2 cursor-pointer" }, [
                                              withDirectives(createVNode("input", {
                                                type: "radio",
                                                "onUpdate:modelValue": ($event) => logoInputMode.value = $event,
                                                value: "upload",
                                                class: "w-4 h-4"
                                              }, null, 8, ["onUpdate:modelValue"]), [
                                                [vModelRadio, logoInputMode.value]
                                              ]),
                                              createVNode("span", { class: "text-sm" }, "Upload File")
                                            ])
                                          ]),
                                          logoInputMode.value === "url" ? (openBlock(), createBlock("div", {
                                            key: 0,
                                            class: "space-y-2"
                                          }, [
                                            createVNode(unref(_sfc_main$d), {
                                              id: "site_logo_url",
                                              modelValue: unref(form).settings["site_logo"],
                                              "onUpdate:modelValue": ($event) => unref(form).settings["site_logo"] = $event,
                                              placeholder: "https://example.com/logo.png",
                                              type: "url",
                                              disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                                          ])) : (openBlock(), createBlock("div", {
                                            key: 1,
                                            class: "space-y-2"
                                          }, [
                                            createVNode("div", { class: "flex gap-2" }, [
                                              createVNode("div", { class: "flex-1" }, [
                                                createVNode("input", {
                                                  id: "logo_upload",
                                                  type: "file",
                                                  accept: "image/*",
                                                  onChange: handleLogoUpload,
                                                  class: "hidden",
                                                  disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                                }, null, 40, ["disabled"]),
                                                createVNode(unref(_sfc_main$2), {
                                                  type: "button",
                                                  variant: "outline",
                                                  class: "w-full",
                                                  onClick: triggerFileInput,
                                                  disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(Upload), { class: "h-4 w-4 mr-2" }),
                                                    createTextVNode(" " + toDisplayString(unref(form).site_logo ? "Ganti File" : "Pilih File"), 1)
                                                  ]),
                                                  _: 1
                                                }, 8, ["disabled"])
                                              ]),
                                              currentLogoUrl.value ? (openBlock(), createBlock(unref(_sfc_main$2), {
                                                key: 0,
                                                type: "button",
                                                variant: "destructive",
                                                onClick: removeLogo,
                                                disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(X), { class: "h-4 w-4" })
                                                ]),
                                                _: 1
                                              }, 8, ["disabled"])) : createCommentVNode("", true)
                                            ]),
                                            createVNode("p", { class: "text-xs text-muted-foreground" }, " Format: JPG, PNG, GIF (Max: 2MB) ")
                                          ])),
                                          currentLogoUrl.value ? (openBlock(), createBlock("div", {
                                            key: 2,
                                            class: "mt-4"
                                          }, [
                                            createVNode(unref(_sfc_main$c), { class: "mb-2 block" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Preview")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode("div", { class: "border rounded-lg p-4 bg-muted/50 flex items-center justify-center" }, [
                                              createVNode("img", {
                                                src: currentLogoUrl.value,
                                                alt: "Logo Preview",
                                                class: "max-h-32 max-w-full object-contain",
                                                onError: () => {
                                                  if (logoInputMode.value === "url") unref(form).settings["site_logo"] = null;
                                                }
                                              }, null, 40, ["src", "onError"])
                                            ])
                                          ])) : createCommentVNode("", true)
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(_sfc_main$8), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$9), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Pengaturan Umum")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$a), null, {
                                        default: withCtx(() => [
                                          createTextVNode(" Atur informasi dasar situs seperti nama, deskripsi, dan logo ")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$b), { class: "space-y-6" }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "space-y-2" }, [
                                        createVNode(unref(_sfc_main$c), { for: "site_name" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Nama Situs")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$d), {
                                          id: "site_name",
                                          modelValue: unref(form).settings["site_name"],
                                          "onUpdate:modelValue": ($event) => unref(form).settings["site_name"] = $event,
                                          placeholder: "PURANUSA",
                                          disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                                        createVNode("p", { class: "text-xs text-muted-foreground" }, " Nama situs yang akan ditampilkan di header dan footer ")
                                      ]),
                                      createVNode(unref(_sfc_main$e)),
                                      createVNode("div", { class: "space-y-2" }, [
                                        createVNode(unref(_sfc_main$c), { for: "site_description" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Deskripsi Situs")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_sfc_main$f, {
                                          modelValue: unref(form).settings["site_description"],
                                          "onUpdate:modelValue": ($event) => unref(form).settings["site_description"] = $event,
                                          disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                                        createVNode("p", { class: "text-xs text-muted-foreground" }, " Deskripsi singkat tentang situs yang akan ditampilkan di footer ")
                                      ]),
                                      createVNode(unref(_sfc_main$e)),
                                      createVNode("div", { class: "space-y-4" }, [
                                        createVNode("div", null, [
                                          createVNode(unref(_sfc_main$c), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Logo Situs")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode("p", { class: "text-xs text-muted-foreground mt-1" }, " Upload logo atau masukkan URL logo yang akan ditampilkan di situs ")
                                        ]),
                                        createVNode("div", { class: "flex gap-4" }, [
                                          createVNode("label", { class: "flex items-center gap-2 cursor-pointer" }, [
                                            withDirectives(createVNode("input", {
                                              type: "radio",
                                              "onUpdate:modelValue": ($event) => logoInputMode.value = $event,
                                              value: "url",
                                              class: "w-4 h-4"
                                            }, null, 8, ["onUpdate:modelValue"]), [
                                              [vModelRadio, logoInputMode.value]
                                            ]),
                                            createVNode("span", { class: "text-sm" }, "Input URL")
                                          ]),
                                          createVNode("label", { class: "flex items-center gap-2 cursor-pointer" }, [
                                            withDirectives(createVNode("input", {
                                              type: "radio",
                                              "onUpdate:modelValue": ($event) => logoInputMode.value = $event,
                                              value: "upload",
                                              class: "w-4 h-4"
                                            }, null, 8, ["onUpdate:modelValue"]), [
                                              [vModelRadio, logoInputMode.value]
                                            ]),
                                            createVNode("span", { class: "text-sm" }, "Upload File")
                                          ])
                                        ]),
                                        logoInputMode.value === "url" ? (openBlock(), createBlock("div", {
                                          key: 0,
                                          class: "space-y-2"
                                        }, [
                                          createVNode(unref(_sfc_main$d), {
                                            id: "site_logo_url",
                                            modelValue: unref(form).settings["site_logo"],
                                            "onUpdate:modelValue": ($event) => unref(form).settings["site_logo"] = $event,
                                            placeholder: "https://example.com/logo.png",
                                            type: "url",
                                            disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                                        ])) : (openBlock(), createBlock("div", {
                                          key: 1,
                                          class: "space-y-2"
                                        }, [
                                          createVNode("div", { class: "flex gap-2" }, [
                                            createVNode("div", { class: "flex-1" }, [
                                              createVNode("input", {
                                                id: "logo_upload",
                                                type: "file",
                                                accept: "image/*",
                                                onChange: handleLogoUpload,
                                                class: "hidden",
                                                disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                              }, null, 40, ["disabled"]),
                                              createVNode(unref(_sfc_main$2), {
                                                type: "button",
                                                variant: "outline",
                                                class: "w-full",
                                                onClick: triggerFileInput,
                                                disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(Upload), { class: "h-4 w-4 mr-2" }),
                                                  createTextVNode(" " + toDisplayString(unref(form).site_logo ? "Ganti File" : "Pilih File"), 1)
                                                ]),
                                                _: 1
                                              }, 8, ["disabled"])
                                            ]),
                                            currentLogoUrl.value ? (openBlock(), createBlock(unref(_sfc_main$2), {
                                              key: 0,
                                              type: "button",
                                              variant: "destructive",
                                              onClick: removeLogo,
                                              disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(X), { class: "h-4 w-4" })
                                              ]),
                                              _: 1
                                            }, 8, ["disabled"])) : createCommentVNode("", true)
                                          ]),
                                          createVNode("p", { class: "text-xs text-muted-foreground" }, " Format: JPG, PNG, GIF (Max: 2MB) ")
                                        ])),
                                        currentLogoUrl.value ? (openBlock(), createBlock("div", {
                                          key: 2,
                                          class: "mt-4"
                                        }, [
                                          createVNode(unref(_sfc_main$c), { class: "mb-2 block" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Preview")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode("div", { class: "border rounded-lg p-4 bg-muted/50 flex items-center justify-center" }, [
                                            createVNode("img", {
                                              src: currentLogoUrl.value,
                                              alt: "Logo Preview",
                                              class: "max-h-32 max-w-full object-contain",
                                              onError: () => {
                                                if (logoInputMode.value === "url") unref(form).settings["site_logo"] = null;
                                              }
                                            }, null, 40, ["src", "onError"])
                                          ])
                                        ])) : createCommentVNode("", true)
                                      ])
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
                            createVNode(unref(_sfc_main$7), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$8), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$9), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Pengaturan Umum")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$a), null, {
                                      default: withCtx(() => [
                                        createTextVNode(" Atur informasi dasar situs seperti nama, deskripsi, dan logo ")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$b), { class: "space-y-6" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "space-y-2" }, [
                                      createVNode(unref(_sfc_main$c), { for: "site_name" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Nama Situs")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$d), {
                                        id: "site_name",
                                        modelValue: unref(form).settings["site_name"],
                                        "onUpdate:modelValue": ($event) => unref(form).settings["site_name"] = $event,
                                        placeholder: "PURANUSA",
                                        disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                                      createVNode("p", { class: "text-xs text-muted-foreground" }, " Nama situs yang akan ditampilkan di header dan footer ")
                                    ]),
                                    createVNode(unref(_sfc_main$e)),
                                    createVNode("div", { class: "space-y-2" }, [
                                      createVNode(unref(_sfc_main$c), { for: "site_description" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Deskripsi Situs")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_sfc_main$f, {
                                        modelValue: unref(form).settings["site_description"],
                                        "onUpdate:modelValue": ($event) => unref(form).settings["site_description"] = $event,
                                        disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                                      createVNode("p", { class: "text-xs text-muted-foreground" }, " Deskripsi singkat tentang situs yang akan ditampilkan di footer ")
                                    ]),
                                    createVNode(unref(_sfc_main$e)),
                                    createVNode("div", { class: "space-y-4" }, [
                                      createVNode("div", null, [
                                        createVNode(unref(_sfc_main$c), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Logo Situs")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("p", { class: "text-xs text-muted-foreground mt-1" }, " Upload logo atau masukkan URL logo yang akan ditampilkan di situs ")
                                      ]),
                                      createVNode("div", { class: "flex gap-4" }, [
                                        createVNode("label", { class: "flex items-center gap-2 cursor-pointer" }, [
                                          withDirectives(createVNode("input", {
                                            type: "radio",
                                            "onUpdate:modelValue": ($event) => logoInputMode.value = $event,
                                            value: "url",
                                            class: "w-4 h-4"
                                          }, null, 8, ["onUpdate:modelValue"]), [
                                            [vModelRadio, logoInputMode.value]
                                          ]),
                                          createVNode("span", { class: "text-sm" }, "Input URL")
                                        ]),
                                        createVNode("label", { class: "flex items-center gap-2 cursor-pointer" }, [
                                          withDirectives(createVNode("input", {
                                            type: "radio",
                                            "onUpdate:modelValue": ($event) => logoInputMode.value = $event,
                                            value: "upload",
                                            class: "w-4 h-4"
                                          }, null, 8, ["onUpdate:modelValue"]), [
                                            [vModelRadio, logoInputMode.value]
                                          ]),
                                          createVNode("span", { class: "text-sm" }, "Upload File")
                                        ])
                                      ]),
                                      logoInputMode.value === "url" ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "space-y-2"
                                      }, [
                                        createVNode(unref(_sfc_main$d), {
                                          id: "site_logo_url",
                                          modelValue: unref(form).settings["site_logo"],
                                          "onUpdate:modelValue": ($event) => unref(form).settings["site_logo"] = $event,
                                          placeholder: "https://example.com/logo.png",
                                          type: "url",
                                          disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                                      ])) : (openBlock(), createBlock("div", {
                                        key: 1,
                                        class: "space-y-2"
                                      }, [
                                        createVNode("div", { class: "flex gap-2" }, [
                                          createVNode("div", { class: "flex-1" }, [
                                            createVNode("input", {
                                              id: "logo_upload",
                                              type: "file",
                                              accept: "image/*",
                                              onChange: handleLogoUpload,
                                              class: "hidden",
                                              disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                            }, null, 40, ["disabled"]),
                                            createVNode(unref(_sfc_main$2), {
                                              type: "button",
                                              variant: "outline",
                                              class: "w-full",
                                              onClick: triggerFileInput,
                                              disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(Upload), { class: "h-4 w-4 mr-2" }),
                                                createTextVNode(" " + toDisplayString(unref(form).site_logo ? "Ganti File" : "Pilih File"), 1)
                                              ]),
                                              _: 1
                                            }, 8, ["disabled"])
                                          ]),
                                          currentLogoUrl.value ? (openBlock(), createBlock(unref(_sfc_main$2), {
                                            key: 0,
                                            type: "button",
                                            variant: "destructive",
                                            onClick: removeLogo,
                                            disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(X), { class: "h-4 w-4" })
                                            ]),
                                            _: 1
                                          }, 8, ["disabled"])) : createCommentVNode("", true)
                                        ]),
                                        createVNode("p", { class: "text-xs text-muted-foreground" }, " Format: JPG, PNG, GIF (Max: 2MB) ")
                                      ])),
                                      currentLogoUrl.value ? (openBlock(), createBlock("div", {
                                        key: 2,
                                        class: "mt-4"
                                      }, [
                                        createVNode(unref(_sfc_main$c), { class: "mb-2 block" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Preview")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("div", { class: "border rounded-lg p-4 bg-muted/50 flex items-center justify-center" }, [
                                          createVNode("img", {
                                            src: currentLogoUrl.value,
                                            alt: "Logo Preview",
                                            class: "max-h-32 max-w-full object-contain",
                                            onError: () => {
                                              if (logoInputMode.value === "url") unref(form).settings["site_logo"] = null;
                                            }
                                          }, null, 40, ["src", "onError"])
                                        ])
                                      ])) : createCommentVNode("", true)
                                    ])
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
                    _push3(ssrRenderComponent(unref(_sfc_main$6), { value: "social" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(_sfc_main$7), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(_sfc_main$8), null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(_sfc_main$9), null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Media Sosial`);
                                          } else {
                                            return [
                                              createTextVNode("Media Sosial")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(unref(_sfc_main$a), null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(` Kelola link media sosial yang akan ditampilkan di footer `);
                                          } else {
                                            return [
                                              createTextVNode(" Kelola link media sosial yang akan ditampilkan di footer ")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(unref(_sfc_main$9), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Media Sosial")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$a), null, {
                                          default: withCtx(() => [
                                            createTextVNode(" Kelola link media sosial yang akan ditampilkan di footer ")
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(_sfc_main$b), { class: "space-y-6" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<div class="space-y-2"${_scopeId5}>`);
                                      _push6(ssrRenderComponent(unref(_sfc_main$c), {
                                        for: "social_facebook",
                                        class: "flex items-center gap-2"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(unref(Facebook), { class: "h-4 w-4 text-blue-600" }, null, _parent7, _scopeId6));
                                            _push7(` Facebook `);
                                          } else {
                                            return [
                                              createVNode(unref(Facebook), { class: "h-4 w-4 text-blue-600" }),
                                              createTextVNode(" Facebook ")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(unref(_sfc_main$d), {
                                        id: "social_facebook",
                                        modelValue: unref(form).settings["social_facebook"],
                                        "onUpdate:modelValue": ($event) => unref(form).settings["social_facebook"] = $event,
                                        placeholder: "https://facebook.com/puranusa",
                                        type: "url",
                                        disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                      }, null, _parent6, _scopeId5));
                                      _push6(`</div>`);
                                      _push6(ssrRenderComponent(unref(_sfc_main$e), null, null, _parent6, _scopeId5));
                                      _push6(`<div class="space-y-2"${_scopeId5}>`);
                                      _push6(ssrRenderComponent(unref(_sfc_main$c), {
                                        for: "social_twitter",
                                        class: "flex items-center gap-2"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(unref(Twitter), { class: "h-4 w-4 text-sky-500" }, null, _parent7, _scopeId6));
                                            _push7(` Twitter `);
                                          } else {
                                            return [
                                              createVNode(unref(Twitter), { class: "h-4 w-4 text-sky-500" }),
                                              createTextVNode(" Twitter ")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(unref(_sfc_main$d), {
                                        id: "social_twitter",
                                        modelValue: unref(form).settings["social_twitter"],
                                        "onUpdate:modelValue": ($event) => unref(form).settings["social_twitter"] = $event,
                                        placeholder: "https://twitter.com/puranusa",
                                        type: "url",
                                        disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                      }, null, _parent6, _scopeId5));
                                      _push6(`</div>`);
                                      _push6(ssrRenderComponent(unref(_sfc_main$e), null, null, _parent6, _scopeId5));
                                      _push6(`<div class="space-y-2"${_scopeId5}>`);
                                      _push6(ssrRenderComponent(unref(_sfc_main$c), {
                                        for: "social_instagram",
                                        class: "flex items-center gap-2"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(unref(Instagram), { class: "h-4 w-4 text-pink-600" }, null, _parent7, _scopeId6));
                                            _push7(` Instagram `);
                                          } else {
                                            return [
                                              createVNode(unref(Instagram), { class: "h-4 w-4 text-pink-600" }),
                                              createTextVNode(" Instagram ")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(unref(_sfc_main$d), {
                                        id: "social_instagram",
                                        modelValue: unref(form).settings["social_instagram"],
                                        "onUpdate:modelValue": ($event) => unref(form).settings["social_instagram"] = $event,
                                        placeholder: "https://instagram.com/puranusa",
                                        type: "url",
                                        disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                      }, null, _parent6, _scopeId5));
                                      _push6(`</div>`);
                                      _push6(ssrRenderComponent(unref(_sfc_main$e), null, null, _parent6, _scopeId5));
                                      _push6(`<div class="space-y-2"${_scopeId5}>`);
                                      _push6(ssrRenderComponent(unref(_sfc_main$c), {
                                        for: "social_youtube",
                                        class: "flex items-center gap-2"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(unref(Youtube), { class: "h-4 w-4 text-red-600" }, null, _parent7, _scopeId6));
                                            _push7(` YouTube `);
                                          } else {
                                            return [
                                              createVNode(unref(Youtube), { class: "h-4 w-4 text-red-600" }),
                                              createTextVNode(" YouTube ")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(unref(_sfc_main$d), {
                                        id: "social_youtube",
                                        modelValue: unref(form).settings["social_youtube"],
                                        "onUpdate:modelValue": ($event) => unref(form).settings["social_youtube"] = $event,
                                        placeholder: "https://youtube.com/@puranusa",
                                        type: "url",
                                        disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                      }, null, _parent6, _scopeId5));
                                      _push6(`</div><div class="rounded-lg bg-muted p-4 mt-6"${_scopeId5}><p class="text-sm text-muted-foreground flex items-start gap-2"${_scopeId5}>`);
                                      _push6(ssrRenderComponent(unref(Info), { class: "h-4 w-4 mt-0.5 flex-shrink-0" }, null, _parent6, _scopeId5));
                                      _push6(`<span${_scopeId5}>Kosongkan URL untuk menyembunyikan ikon media sosial dari footer</span></p></div>`);
                                    } else {
                                      return [
                                        createVNode("div", { class: "space-y-2" }, [
                                          createVNode(unref(_sfc_main$c), {
                                            for: "social_facebook",
                                            class: "flex items-center gap-2"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(Facebook), { class: "h-4 w-4 text-blue-600" }),
                                              createTextVNode(" Facebook ")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$d), {
                                            id: "social_facebook",
                                            modelValue: unref(form).settings["social_facebook"],
                                            "onUpdate:modelValue": ($event) => unref(form).settings["social_facebook"] = $event,
                                            placeholder: "https://facebook.com/puranusa",
                                            type: "url",
                                            disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                                        ]),
                                        createVNode(unref(_sfc_main$e)),
                                        createVNode("div", { class: "space-y-2" }, [
                                          createVNode(unref(_sfc_main$c), {
                                            for: "social_twitter",
                                            class: "flex items-center gap-2"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(Twitter), { class: "h-4 w-4 text-sky-500" }),
                                              createTextVNode(" Twitter ")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$d), {
                                            id: "social_twitter",
                                            modelValue: unref(form).settings["social_twitter"],
                                            "onUpdate:modelValue": ($event) => unref(form).settings["social_twitter"] = $event,
                                            placeholder: "https://twitter.com/puranusa",
                                            type: "url",
                                            disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                                        ]),
                                        createVNode(unref(_sfc_main$e)),
                                        createVNode("div", { class: "space-y-2" }, [
                                          createVNode(unref(_sfc_main$c), {
                                            for: "social_instagram",
                                            class: "flex items-center gap-2"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(Instagram), { class: "h-4 w-4 text-pink-600" }),
                                              createTextVNode(" Instagram ")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$d), {
                                            id: "social_instagram",
                                            modelValue: unref(form).settings["social_instagram"],
                                            "onUpdate:modelValue": ($event) => unref(form).settings["social_instagram"] = $event,
                                            placeholder: "https://instagram.com/puranusa",
                                            type: "url",
                                            disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                                        ]),
                                        createVNode(unref(_sfc_main$e)),
                                        createVNode("div", { class: "space-y-2" }, [
                                          createVNode(unref(_sfc_main$c), {
                                            for: "social_youtube",
                                            class: "flex items-center gap-2"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(Youtube), { class: "h-4 w-4 text-red-600" }),
                                              createTextVNode(" YouTube ")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$d), {
                                            id: "social_youtube",
                                            modelValue: unref(form).settings["social_youtube"],
                                            "onUpdate:modelValue": ($event) => unref(form).settings["social_youtube"] = $event,
                                            placeholder: "https://youtube.com/@puranusa",
                                            type: "url",
                                            disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                                        ]),
                                        createVNode("div", { class: "rounded-lg bg-muted p-4 mt-6" }, [
                                          createVNode("p", { class: "text-sm text-muted-foreground flex items-start gap-2" }, [
                                            createVNode(unref(Info), { class: "h-4 w-4 mt-0.5 flex-shrink-0" }),
                                            createVNode("span", null, "Kosongkan URL untuk menyembunyikan ikon media sosial dari footer")
                                          ])
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(_sfc_main$8), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$9), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Media Sosial")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$a), null, {
                                        default: withCtx(() => [
                                          createTextVNode(" Kelola link media sosial yang akan ditampilkan di footer ")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$b), { class: "space-y-6" }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "space-y-2" }, [
                                        createVNode(unref(_sfc_main$c), {
                                          for: "social_facebook",
                                          class: "flex items-center gap-2"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(Facebook), { class: "h-4 w-4 text-blue-600" }),
                                            createTextVNode(" Facebook ")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$d), {
                                          id: "social_facebook",
                                          modelValue: unref(form).settings["social_facebook"],
                                          "onUpdate:modelValue": ($event) => unref(form).settings["social_facebook"] = $event,
                                          placeholder: "https://facebook.com/puranusa",
                                          type: "url",
                                          disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                                      ]),
                                      createVNode(unref(_sfc_main$e)),
                                      createVNode("div", { class: "space-y-2" }, [
                                        createVNode(unref(_sfc_main$c), {
                                          for: "social_twitter",
                                          class: "flex items-center gap-2"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(Twitter), { class: "h-4 w-4 text-sky-500" }),
                                            createTextVNode(" Twitter ")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$d), {
                                          id: "social_twitter",
                                          modelValue: unref(form).settings["social_twitter"],
                                          "onUpdate:modelValue": ($event) => unref(form).settings["social_twitter"] = $event,
                                          placeholder: "https://twitter.com/puranusa",
                                          type: "url",
                                          disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                                      ]),
                                      createVNode(unref(_sfc_main$e)),
                                      createVNode("div", { class: "space-y-2" }, [
                                        createVNode(unref(_sfc_main$c), {
                                          for: "social_instagram",
                                          class: "flex items-center gap-2"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(Instagram), { class: "h-4 w-4 text-pink-600" }),
                                            createTextVNode(" Instagram ")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$d), {
                                          id: "social_instagram",
                                          modelValue: unref(form).settings["social_instagram"],
                                          "onUpdate:modelValue": ($event) => unref(form).settings["social_instagram"] = $event,
                                          placeholder: "https://instagram.com/puranusa",
                                          type: "url",
                                          disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                                      ]),
                                      createVNode(unref(_sfc_main$e)),
                                      createVNode("div", { class: "space-y-2" }, [
                                        createVNode(unref(_sfc_main$c), {
                                          for: "social_youtube",
                                          class: "flex items-center gap-2"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(Youtube), { class: "h-4 w-4 text-red-600" }),
                                            createTextVNode(" YouTube ")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$d), {
                                          id: "social_youtube",
                                          modelValue: unref(form).settings["social_youtube"],
                                          "onUpdate:modelValue": ($event) => unref(form).settings["social_youtube"] = $event,
                                          placeholder: "https://youtube.com/@puranusa",
                                          type: "url",
                                          disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                                      ]),
                                      createVNode("div", { class: "rounded-lg bg-muted p-4 mt-6" }, [
                                        createVNode("p", { class: "text-sm text-muted-foreground flex items-start gap-2" }, [
                                          createVNode(unref(Info), { class: "h-4 w-4 mt-0.5 flex-shrink-0" }),
                                          createVNode("span", null, "Kosongkan URL untuk menyembunyikan ikon media sosial dari footer")
                                        ])
                                      ])
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
                            createVNode(unref(_sfc_main$7), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$8), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$9), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Media Sosial")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$a), null, {
                                      default: withCtx(() => [
                                        createTextVNode(" Kelola link media sosial yang akan ditampilkan di footer ")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$b), { class: "space-y-6" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "space-y-2" }, [
                                      createVNode(unref(_sfc_main$c), {
                                        for: "social_facebook",
                                        class: "flex items-center gap-2"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(Facebook), { class: "h-4 w-4 text-blue-600" }),
                                          createTextVNode(" Facebook ")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$d), {
                                        id: "social_facebook",
                                        modelValue: unref(form).settings["social_facebook"],
                                        "onUpdate:modelValue": ($event) => unref(form).settings["social_facebook"] = $event,
                                        placeholder: "https://facebook.com/puranusa",
                                        type: "url",
                                        disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                                    ]),
                                    createVNode(unref(_sfc_main$e)),
                                    createVNode("div", { class: "space-y-2" }, [
                                      createVNode(unref(_sfc_main$c), {
                                        for: "social_twitter",
                                        class: "flex items-center gap-2"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(Twitter), { class: "h-4 w-4 text-sky-500" }),
                                          createTextVNode(" Twitter ")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$d), {
                                        id: "social_twitter",
                                        modelValue: unref(form).settings["social_twitter"],
                                        "onUpdate:modelValue": ($event) => unref(form).settings["social_twitter"] = $event,
                                        placeholder: "https://twitter.com/puranusa",
                                        type: "url",
                                        disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                                    ]),
                                    createVNode(unref(_sfc_main$e)),
                                    createVNode("div", { class: "space-y-2" }, [
                                      createVNode(unref(_sfc_main$c), {
                                        for: "social_instagram",
                                        class: "flex items-center gap-2"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(Instagram), { class: "h-4 w-4 text-pink-600" }),
                                          createTextVNode(" Instagram ")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$d), {
                                        id: "social_instagram",
                                        modelValue: unref(form).settings["social_instagram"],
                                        "onUpdate:modelValue": ($event) => unref(form).settings["social_instagram"] = $event,
                                        placeholder: "https://instagram.com/puranusa",
                                        type: "url",
                                        disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                                    ]),
                                    createVNode(unref(_sfc_main$e)),
                                    createVNode("div", { class: "space-y-2" }, [
                                      createVNode(unref(_sfc_main$c), {
                                        for: "social_youtube",
                                        class: "flex items-center gap-2"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(Youtube), { class: "h-4 w-4 text-red-600" }),
                                          createTextVNode(" YouTube ")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$d), {
                                        id: "social_youtube",
                                        modelValue: unref(form).settings["social_youtube"],
                                        "onUpdate:modelValue": ($event) => unref(form).settings["social_youtube"] = $event,
                                        placeholder: "https://youtube.com/@puranusa",
                                        type: "url",
                                        disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                                    ]),
                                    createVNode("div", { class: "rounded-lg bg-muted p-4 mt-6" }, [
                                      createVNode("p", { class: "text-sm text-muted-foreground flex items-start gap-2" }, [
                                        createVNode(unref(Info), { class: "h-4 w-4 mt-0.5 flex-shrink-0" }),
                                        createVNode("span", null, "Kosongkan URL untuk menyembunyikan ikon media sosial dari footer")
                                      ])
                                    ])
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
                    _push3(ssrRenderComponent(unref(_sfc_main$6), { value: "payment" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(_sfc_main$7), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(_sfc_main$8), null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(_sfc_main$9), null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Metode Pembayaran`);
                                          } else {
                                            return [
                                              createTextVNode("Metode Pembayaran")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(unref(_sfc_main$a), null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(` Kelola metode pembayaran yang akan ditampilkan di footer `);
                                          } else {
                                            return [
                                              createTextVNode(" Kelola metode pembayaran yang akan ditampilkan di footer ")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(unref(_sfc_main$9), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Metode Pembayaran")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$a), null, {
                                          default: withCtx(() => [
                                            createTextVNode(" Kelola metode pembayaran yang akan ditampilkan di footer ")
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(_sfc_main$b), { class: "space-y-6" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<div class="space-y-2"${_scopeId5}>`);
                                      _push6(ssrRenderComponent(unref(_sfc_main$c), null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Metode Pembayaran Aktif`);
                                          } else {
                                            return [
                                              createTextVNode("Metode Pembayaran Aktif")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(`<div class="flex flex-wrap gap-2 min-h-[60px] p-4 border rounded-lg bg-muted/50"${_scopeId5}><!--[-->`);
                                      ssrRenderList(paymentMethods.value, (method) => {
                                        _push6(ssrRenderComponent(unref(_sfc_main$g), {
                                          key: method,
                                          variant: "secondary",
                                          class: "px-3 py-1.5 text-sm font-medium flex items-center gap-2"
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(method)} <button class="hover:text-destructive transition-colors" type="button"${ssrIncludeBooleanAttr(!(unref(isSuperAdmin) || unref(isAdmin))) ? " disabled" : ""}${_scopeId6}> × </button>`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(method) + " ", 1),
                                                createVNode("button", {
                                                  onClick: ($event) => removePaymentMethod(method),
                                                  class: "hover:text-destructive transition-colors",
                                                  type: "button",
                                                  disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                                }, " × ", 8, ["onClick", "disabled"])
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      });
                                      _push6(`<!--]-->`);
                                      if (paymentMethods.value.length === 0) {
                                        _push6(`<span class="text-sm text-muted-foreground"${_scopeId5}> Belum ada metode pembayaran </span>`);
                                      } else {
                                        _push6(`<!---->`);
                                      }
                                      _push6(`</div></div>`);
                                      _push6(ssrRenderComponent(unref(_sfc_main$e), null, null, _parent6, _scopeId5));
                                      _push6(`<div class="space-y-2"${_scopeId5}>`);
                                      _push6(ssrRenderComponent(unref(_sfc_main$c), { for: "new_payment_method" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Tambah Metode Pembayaran`);
                                          } else {
                                            return [
                                              createTextVNode("Tambah Metode Pembayaran")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(`<div class="flex gap-2"${_scopeId5}>`);
                                      _push6(ssrRenderComponent(unref(_sfc_main$d), {
                                        id: "new_payment_method",
                                        modelValue: newPaymentMethod.value,
                                        "onUpdate:modelValue": ($event) => newPaymentMethod.value = $event,
                                        placeholder: "Contoh: VISA, Mastercard, GoPay, OVO",
                                        onKeydown: addPaymentMethod,
                                        disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                      }, null, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(unref(_sfc_main$2), {
                                        type: "button",
                                        onClick: addPaymentMethod,
                                        disabled: !newPaymentMethod.value.trim() || !(unref(isSuperAdmin) || unref(isAdmin))
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(` Tambah `);
                                          } else {
                                            return [
                                              createTextVNode(" Tambah ")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(`</div><p class="text-xs text-muted-foreground"${_scopeId5}> Tekan Enter atau klik tombol Tambah untuk menambahkan metode pembayaran baru </p></div><div class="rounded-lg bg-muted p-4 mt-6"${_scopeId5}><p class="text-sm font-medium mb-2"${_scopeId5}>Tips:</p><ul class="text-sm text-muted-foreground space-y-1 list-disc list-inside"${_scopeId5}><li${_scopeId5}>Gunakan nama singkat dan jelas (contoh: VISA, Mastercard)</li><li${_scopeId5}>Metode pembayaran akan ditampilkan di footer situs</li><li${_scopeId5}>Klik tanda × pada badge untuk menghapus metode</li></ul></div>`);
                                    } else {
                                      return [
                                        createVNode("div", { class: "space-y-2" }, [
                                          createVNode(unref(_sfc_main$c), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Metode Pembayaran Aktif")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode("div", { class: "flex flex-wrap gap-2 min-h-[60px] p-4 border rounded-lg bg-muted/50" }, [
                                            (openBlock(true), createBlock(Fragment, null, renderList(paymentMethods.value, (method) => {
                                              return openBlock(), createBlock(unref(_sfc_main$g), {
                                                key: method,
                                                variant: "secondary",
                                                class: "px-3 py-1.5 text-sm font-medium flex items-center gap-2"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(method) + " ", 1),
                                                  createVNode("button", {
                                                    onClick: ($event) => removePaymentMethod(method),
                                                    class: "hover:text-destructive transition-colors",
                                                    type: "button",
                                                    disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                                  }, " × ", 8, ["onClick", "disabled"])
                                                ]),
                                                _: 2
                                              }, 1024);
                                            }), 128)),
                                            paymentMethods.value.length === 0 ? (openBlock(), createBlock("span", {
                                              key: 0,
                                              class: "text-sm text-muted-foreground"
                                            }, " Belum ada metode pembayaran ")) : createCommentVNode("", true)
                                          ])
                                        ]),
                                        createVNode(unref(_sfc_main$e)),
                                        createVNode("div", { class: "space-y-2" }, [
                                          createVNode(unref(_sfc_main$c), { for: "new_payment_method" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Tambah Metode Pembayaran")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode("div", { class: "flex gap-2" }, [
                                            createVNode(unref(_sfc_main$d), {
                                              id: "new_payment_method",
                                              modelValue: newPaymentMethod.value,
                                              "onUpdate:modelValue": ($event) => newPaymentMethod.value = $event,
                                              placeholder: "Contoh: VISA, Mastercard, GoPay, OVO",
                                              onKeydown: withKeys(withModifiers(addPaymentMethod, ["prevent"]), ["enter"]),
                                              disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeydown", "disabled"]),
                                            createVNode(unref(_sfc_main$2), {
                                              type: "button",
                                              onClick: addPaymentMethod,
                                              disabled: !newPaymentMethod.value.trim() || !(unref(isSuperAdmin) || unref(isAdmin))
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(" Tambah ")
                                              ]),
                                              _: 1
                                            }, 8, ["disabled"])
                                          ]),
                                          createVNode("p", { class: "text-xs text-muted-foreground" }, " Tekan Enter atau klik tombol Tambah untuk menambahkan metode pembayaran baru ")
                                        ]),
                                        createVNode("div", { class: "rounded-lg bg-muted p-4 mt-6" }, [
                                          createVNode("p", { class: "text-sm font-medium mb-2" }, "Tips:"),
                                          createVNode("ul", { class: "text-sm text-muted-foreground space-y-1 list-disc list-inside" }, [
                                            createVNode("li", null, "Gunakan nama singkat dan jelas (contoh: VISA, Mastercard)"),
                                            createVNode("li", null, "Metode pembayaran akan ditampilkan di footer situs"),
                                            createVNode("li", null, "Klik tanda × pada badge untuk menghapus metode")
                                          ])
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(_sfc_main$8), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$9), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Metode Pembayaran")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$a), null, {
                                        default: withCtx(() => [
                                          createTextVNode(" Kelola metode pembayaran yang akan ditampilkan di footer ")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$b), { class: "space-y-6" }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "space-y-2" }, [
                                        createVNode(unref(_sfc_main$c), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Metode Pembayaran Aktif")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("div", { class: "flex flex-wrap gap-2 min-h-[60px] p-4 border rounded-lg bg-muted/50" }, [
                                          (openBlock(true), createBlock(Fragment, null, renderList(paymentMethods.value, (method) => {
                                            return openBlock(), createBlock(unref(_sfc_main$g), {
                                              key: method,
                                              variant: "secondary",
                                              class: "px-3 py-1.5 text-sm font-medium flex items-center gap-2"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(method) + " ", 1),
                                                createVNode("button", {
                                                  onClick: ($event) => removePaymentMethod(method),
                                                  class: "hover:text-destructive transition-colors",
                                                  type: "button",
                                                  disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                                }, " × ", 8, ["onClick", "disabled"])
                                              ]),
                                              _: 2
                                            }, 1024);
                                          }), 128)),
                                          paymentMethods.value.length === 0 ? (openBlock(), createBlock("span", {
                                            key: 0,
                                            class: "text-sm text-muted-foreground"
                                          }, " Belum ada metode pembayaran ")) : createCommentVNode("", true)
                                        ])
                                      ]),
                                      createVNode(unref(_sfc_main$e)),
                                      createVNode("div", { class: "space-y-2" }, [
                                        createVNode(unref(_sfc_main$c), { for: "new_payment_method" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Tambah Metode Pembayaran")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("div", { class: "flex gap-2" }, [
                                          createVNode(unref(_sfc_main$d), {
                                            id: "new_payment_method",
                                            modelValue: newPaymentMethod.value,
                                            "onUpdate:modelValue": ($event) => newPaymentMethod.value = $event,
                                            placeholder: "Contoh: VISA, Mastercard, GoPay, OVO",
                                            onKeydown: withKeys(withModifiers(addPaymentMethod, ["prevent"]), ["enter"]),
                                            disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeydown", "disabled"]),
                                          createVNode(unref(_sfc_main$2), {
                                            type: "button",
                                            onClick: addPaymentMethod,
                                            disabled: !newPaymentMethod.value.trim() || !(unref(isSuperAdmin) || unref(isAdmin))
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(" Tambah ")
                                            ]),
                                            _: 1
                                          }, 8, ["disabled"])
                                        ]),
                                        createVNode("p", { class: "text-xs text-muted-foreground" }, " Tekan Enter atau klik tombol Tambah untuk menambahkan metode pembayaran baru ")
                                      ]),
                                      createVNode("div", { class: "rounded-lg bg-muted p-4 mt-6" }, [
                                        createVNode("p", { class: "text-sm font-medium mb-2" }, "Tips:"),
                                        createVNode("ul", { class: "text-sm text-muted-foreground space-y-1 list-disc list-inside" }, [
                                          createVNode("li", null, "Gunakan nama singkat dan jelas (contoh: VISA, Mastercard)"),
                                          createVNode("li", null, "Metode pembayaran akan ditampilkan di footer situs"),
                                          createVNode("li", null, "Klik tanda × pada badge untuk menghapus metode")
                                        ])
                                      ])
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
                            createVNode(unref(_sfc_main$7), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$8), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$9), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Metode Pembayaran")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$a), null, {
                                      default: withCtx(() => [
                                        createTextVNode(" Kelola metode pembayaran yang akan ditampilkan di footer ")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$b), { class: "space-y-6" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "space-y-2" }, [
                                      createVNode(unref(_sfc_main$c), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Metode Pembayaran Aktif")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode("div", { class: "flex flex-wrap gap-2 min-h-[60px] p-4 border rounded-lg bg-muted/50" }, [
                                        (openBlock(true), createBlock(Fragment, null, renderList(paymentMethods.value, (method) => {
                                          return openBlock(), createBlock(unref(_sfc_main$g), {
                                            key: method,
                                            variant: "secondary",
                                            class: "px-3 py-1.5 text-sm font-medium flex items-center gap-2"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(method) + " ", 1),
                                              createVNode("button", {
                                                onClick: ($event) => removePaymentMethod(method),
                                                class: "hover:text-destructive transition-colors",
                                                type: "button",
                                                disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                              }, " × ", 8, ["onClick", "disabled"])
                                            ]),
                                            _: 2
                                          }, 1024);
                                        }), 128)),
                                        paymentMethods.value.length === 0 ? (openBlock(), createBlock("span", {
                                          key: 0,
                                          class: "text-sm text-muted-foreground"
                                        }, " Belum ada metode pembayaran ")) : createCommentVNode("", true)
                                      ])
                                    ]),
                                    createVNode(unref(_sfc_main$e)),
                                    createVNode("div", { class: "space-y-2" }, [
                                      createVNode(unref(_sfc_main$c), { for: "new_payment_method" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Tambah Metode Pembayaran")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode("div", { class: "flex gap-2" }, [
                                        createVNode(unref(_sfc_main$d), {
                                          id: "new_payment_method",
                                          modelValue: newPaymentMethod.value,
                                          "onUpdate:modelValue": ($event) => newPaymentMethod.value = $event,
                                          placeholder: "Contoh: VISA, Mastercard, GoPay, OVO",
                                          onKeydown: withKeys(withModifiers(addPaymentMethod, ["prevent"]), ["enter"]),
                                          disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeydown", "disabled"]),
                                        createVNode(unref(_sfc_main$2), {
                                          type: "button",
                                          onClick: addPaymentMethod,
                                          disabled: !newPaymentMethod.value.trim() || !(unref(isSuperAdmin) || unref(isAdmin))
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" Tambah ")
                                          ]),
                                          _: 1
                                        }, 8, ["disabled"])
                                      ]),
                                      createVNode("p", { class: "text-xs text-muted-foreground" }, " Tekan Enter atau klik tombol Tambah untuk menambahkan metode pembayaran baru ")
                                    ]),
                                    createVNode("div", { class: "rounded-lg bg-muted p-4 mt-6" }, [
                                      createVNode("p", { class: "text-sm font-medium mb-2" }, "Tips:"),
                                      createVNode("ul", { class: "text-sm text-muted-foreground space-y-1 list-disc list-inside" }, [
                                        createVNode("li", null, "Gunakan nama singkat dan jelas (contoh: VISA, Mastercard)"),
                                        createVNode("li", null, "Metode pembayaran akan ditampilkan di footer situs"),
                                        createVNode("li", null, "Klik tanda × pada badge untuk menghapus metode")
                                      ])
                                    ])
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
                  } else {
                    return [
                      createVNode(unref(_sfc_main$4), { class: "grid w-full grid-cols-3" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$5), {
                            value: "general",
                            class: "flex items-center gap-2"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Globe), { class: "h-4 w-4" }),
                              createVNode("span", null, "Umum")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$5), {
                            value: "social",
                            class: "flex items-center gap-2"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Facebook), { class: "h-4 w-4" }),
                              createVNode("span", null, "Media Sosial")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$5), {
                            value: "payment",
                            class: "flex items-center gap-2"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(CreditCard), { class: "h-4 w-4" }),
                              createVNode("span", null, "Pembayaran")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), { value: "general" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$7), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$8), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$9), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Pengaturan Umum")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$a), null, {
                                    default: withCtx(() => [
                                      createTextVNode(" Atur informasi dasar situs seperti nama, deskripsi, dan logo ")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$b), { class: "space-y-6" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "space-y-2" }, [
                                    createVNode(unref(_sfc_main$c), { for: "site_name" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Nama Situs")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$d), {
                                      id: "site_name",
                                      modelValue: unref(form).settings["site_name"],
                                      "onUpdate:modelValue": ($event) => unref(form).settings["site_name"] = $event,
                                      placeholder: "PURANUSA",
                                      disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                                    createVNode("p", { class: "text-xs text-muted-foreground" }, " Nama situs yang akan ditampilkan di header dan footer ")
                                  ]),
                                  createVNode(unref(_sfc_main$e)),
                                  createVNode("div", { class: "space-y-2" }, [
                                    createVNode(unref(_sfc_main$c), { for: "site_description" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Deskripsi Situs")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_sfc_main$f, {
                                      modelValue: unref(form).settings["site_description"],
                                      "onUpdate:modelValue": ($event) => unref(form).settings["site_description"] = $event,
                                      disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                                    createVNode("p", { class: "text-xs text-muted-foreground" }, " Deskripsi singkat tentang situs yang akan ditampilkan di footer ")
                                  ]),
                                  createVNode(unref(_sfc_main$e)),
                                  createVNode("div", { class: "space-y-4" }, [
                                    createVNode("div", null, [
                                      createVNode(unref(_sfc_main$c), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Logo Situs")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode("p", { class: "text-xs text-muted-foreground mt-1" }, " Upload logo atau masukkan URL logo yang akan ditampilkan di situs ")
                                    ]),
                                    createVNode("div", { class: "flex gap-4" }, [
                                      createVNode("label", { class: "flex items-center gap-2 cursor-pointer" }, [
                                        withDirectives(createVNode("input", {
                                          type: "radio",
                                          "onUpdate:modelValue": ($event) => logoInputMode.value = $event,
                                          value: "url",
                                          class: "w-4 h-4"
                                        }, null, 8, ["onUpdate:modelValue"]), [
                                          [vModelRadio, logoInputMode.value]
                                        ]),
                                        createVNode("span", { class: "text-sm" }, "Input URL")
                                      ]),
                                      createVNode("label", { class: "flex items-center gap-2 cursor-pointer" }, [
                                        withDirectives(createVNode("input", {
                                          type: "radio",
                                          "onUpdate:modelValue": ($event) => logoInputMode.value = $event,
                                          value: "upload",
                                          class: "w-4 h-4"
                                        }, null, 8, ["onUpdate:modelValue"]), [
                                          [vModelRadio, logoInputMode.value]
                                        ]),
                                        createVNode("span", { class: "text-sm" }, "Upload File")
                                      ])
                                    ]),
                                    logoInputMode.value === "url" ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "space-y-2"
                                    }, [
                                      createVNode(unref(_sfc_main$d), {
                                        id: "site_logo_url",
                                        modelValue: unref(form).settings["site_logo"],
                                        "onUpdate:modelValue": ($event) => unref(form).settings["site_logo"] = $event,
                                        placeholder: "https://example.com/logo.png",
                                        type: "url",
                                        disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                                    ])) : (openBlock(), createBlock("div", {
                                      key: 1,
                                      class: "space-y-2"
                                    }, [
                                      createVNode("div", { class: "flex gap-2" }, [
                                        createVNode("div", { class: "flex-1" }, [
                                          createVNode("input", {
                                            id: "logo_upload",
                                            type: "file",
                                            accept: "image/*",
                                            onChange: handleLogoUpload,
                                            class: "hidden",
                                            disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                          }, null, 40, ["disabled"]),
                                          createVNode(unref(_sfc_main$2), {
                                            type: "button",
                                            variant: "outline",
                                            class: "w-full",
                                            onClick: triggerFileInput,
                                            disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(Upload), { class: "h-4 w-4 mr-2" }),
                                              createTextVNode(" " + toDisplayString(unref(form).site_logo ? "Ganti File" : "Pilih File"), 1)
                                            ]),
                                            _: 1
                                          }, 8, ["disabled"])
                                        ]),
                                        currentLogoUrl.value ? (openBlock(), createBlock(unref(_sfc_main$2), {
                                          key: 0,
                                          type: "button",
                                          variant: "destructive",
                                          onClick: removeLogo,
                                          disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(X), { class: "h-4 w-4" })
                                          ]),
                                          _: 1
                                        }, 8, ["disabled"])) : createCommentVNode("", true)
                                      ]),
                                      createVNode("p", { class: "text-xs text-muted-foreground" }, " Format: JPG, PNG, GIF (Max: 2MB) ")
                                    ])),
                                    currentLogoUrl.value ? (openBlock(), createBlock("div", {
                                      key: 2,
                                      class: "mt-4"
                                    }, [
                                      createVNode(unref(_sfc_main$c), { class: "mb-2 block" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Preview")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode("div", { class: "border rounded-lg p-4 bg-muted/50 flex items-center justify-center" }, [
                                        createVNode("img", {
                                          src: currentLogoUrl.value,
                                          alt: "Logo Preview",
                                          class: "max-h-32 max-w-full object-contain",
                                          onError: () => {
                                            if (logoInputMode.value === "url") unref(form).settings["site_logo"] = null;
                                          }
                                        }, null, 40, ["src", "onError"])
                                      ])
                                    ])) : createCommentVNode("", true)
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), { value: "social" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$7), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$8), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$9), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Media Sosial")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$a), null, {
                                    default: withCtx(() => [
                                      createTextVNode(" Kelola link media sosial yang akan ditampilkan di footer ")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$b), { class: "space-y-6" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "space-y-2" }, [
                                    createVNode(unref(_sfc_main$c), {
                                      for: "social_facebook",
                                      class: "flex items-center gap-2"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Facebook), { class: "h-4 w-4 text-blue-600" }),
                                        createTextVNode(" Facebook ")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$d), {
                                      id: "social_facebook",
                                      modelValue: unref(form).settings["social_facebook"],
                                      "onUpdate:modelValue": ($event) => unref(form).settings["social_facebook"] = $event,
                                      placeholder: "https://facebook.com/puranusa",
                                      type: "url",
                                      disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                                  ]),
                                  createVNode(unref(_sfc_main$e)),
                                  createVNode("div", { class: "space-y-2" }, [
                                    createVNode(unref(_sfc_main$c), {
                                      for: "social_twitter",
                                      class: "flex items-center gap-2"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Twitter), { class: "h-4 w-4 text-sky-500" }),
                                        createTextVNode(" Twitter ")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$d), {
                                      id: "social_twitter",
                                      modelValue: unref(form).settings["social_twitter"],
                                      "onUpdate:modelValue": ($event) => unref(form).settings["social_twitter"] = $event,
                                      placeholder: "https://twitter.com/puranusa",
                                      type: "url",
                                      disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                                  ]),
                                  createVNode(unref(_sfc_main$e)),
                                  createVNode("div", { class: "space-y-2" }, [
                                    createVNode(unref(_sfc_main$c), {
                                      for: "social_instagram",
                                      class: "flex items-center gap-2"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Instagram), { class: "h-4 w-4 text-pink-600" }),
                                        createTextVNode(" Instagram ")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$d), {
                                      id: "social_instagram",
                                      modelValue: unref(form).settings["social_instagram"],
                                      "onUpdate:modelValue": ($event) => unref(form).settings["social_instagram"] = $event,
                                      placeholder: "https://instagram.com/puranusa",
                                      type: "url",
                                      disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                                  ]),
                                  createVNode(unref(_sfc_main$e)),
                                  createVNode("div", { class: "space-y-2" }, [
                                    createVNode(unref(_sfc_main$c), {
                                      for: "social_youtube",
                                      class: "flex items-center gap-2"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Youtube), { class: "h-4 w-4 text-red-600" }),
                                        createTextVNode(" YouTube ")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$d), {
                                      id: "social_youtube",
                                      modelValue: unref(form).settings["social_youtube"],
                                      "onUpdate:modelValue": ($event) => unref(form).settings["social_youtube"] = $event,
                                      placeholder: "https://youtube.com/@puranusa",
                                      type: "url",
                                      disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                                  ]),
                                  createVNode("div", { class: "rounded-lg bg-muted p-4 mt-6" }, [
                                    createVNode("p", { class: "text-sm text-muted-foreground flex items-start gap-2" }, [
                                      createVNode(unref(Info), { class: "h-4 w-4 mt-0.5 flex-shrink-0" }),
                                      createVNode("span", null, "Kosongkan URL untuk menyembunyikan ikon media sosial dari footer")
                                    ])
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), { value: "payment" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$7), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$8), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$9), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Metode Pembayaran")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$a), null, {
                                    default: withCtx(() => [
                                      createTextVNode(" Kelola metode pembayaran yang akan ditampilkan di footer ")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$b), { class: "space-y-6" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "space-y-2" }, [
                                    createVNode(unref(_sfc_main$c), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Metode Pembayaran Aktif")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode("div", { class: "flex flex-wrap gap-2 min-h-[60px] p-4 border rounded-lg bg-muted/50" }, [
                                      (openBlock(true), createBlock(Fragment, null, renderList(paymentMethods.value, (method) => {
                                        return openBlock(), createBlock(unref(_sfc_main$g), {
                                          key: method,
                                          variant: "secondary",
                                          class: "px-3 py-1.5 text-sm font-medium flex items-center gap-2"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(method) + " ", 1),
                                            createVNode("button", {
                                              onClick: ($event) => removePaymentMethod(method),
                                              class: "hover:text-destructive transition-colors",
                                              type: "button",
                                              disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                            }, " × ", 8, ["onClick", "disabled"])
                                          ]),
                                          _: 2
                                        }, 1024);
                                      }), 128)),
                                      paymentMethods.value.length === 0 ? (openBlock(), createBlock("span", {
                                        key: 0,
                                        class: "text-sm text-muted-foreground"
                                      }, " Belum ada metode pembayaran ")) : createCommentVNode("", true)
                                    ])
                                  ]),
                                  createVNode(unref(_sfc_main$e)),
                                  createVNode("div", { class: "space-y-2" }, [
                                    createVNode(unref(_sfc_main$c), { for: "new_payment_method" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Tambah Metode Pembayaran")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode("div", { class: "flex gap-2" }, [
                                      createVNode(unref(_sfc_main$d), {
                                        id: "new_payment_method",
                                        modelValue: newPaymentMethod.value,
                                        "onUpdate:modelValue": ($event) => newPaymentMethod.value = $event,
                                        placeholder: "Contoh: VISA, Mastercard, GoPay, OVO",
                                        onKeydown: withKeys(withModifiers(addPaymentMethod, ["prevent"]), ["enter"]),
                                        disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeydown", "disabled"]),
                                      createVNode(unref(_sfc_main$2), {
                                        type: "button",
                                        onClick: addPaymentMethod,
                                        disabled: !newPaymentMethod.value.trim() || !(unref(isSuperAdmin) || unref(isAdmin))
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Tambah ")
                                        ]),
                                        _: 1
                                      }, 8, ["disabled"])
                                    ]),
                                    createVNode("p", { class: "text-xs text-muted-foreground" }, " Tekan Enter atau klik tombol Tambah untuk menambahkan metode pembayaran baru ")
                                  ]),
                                  createVNode("div", { class: "rounded-lg bg-muted p-4 mt-6" }, [
                                    createVNode("p", { class: "text-sm font-medium mb-2" }, "Tips:"),
                                    createVNode("ul", { class: "text-sm text-muted-foreground space-y-1 list-disc list-inside" }, [
                                      createVNode("li", null, "Gunakan nama singkat dan jelas (contoh: VISA, Mastercard)"),
                                      createVNode("li", null, "Metode pembayaran akan ditampilkan di footer situs"),
                                      createVNode("li", null, "Klik tanda × pada badge untuk menghapus metode")
                                    ])
                                  ])
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
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (unref(isSuperAdmin) || unref(isAdmin)) {
              _push2(`<div class="flex justify-end"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(_sfc_main$2), {
                onClick: saveSettings,
                disabled: unref(form).processing,
                size: "lg"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Save), { class: "h-4 w-4 mr-2" }, null, _parent3, _scopeId2));
                    _push3(` ${ssrInterpolate(unref(form).processing ? "Menyimpan..." : "Simpan Perubahan")}`);
                  } else {
                    return [
                      createVNode(unref(Save), { class: "h-4 w-4 mr-2" }),
                      createTextVNode(" " + toDisplayString(unref(form).processing ? "Menyimpan..." : "Simpan Perubahan"), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Pengaturan Ecommerce" }),
              createVNode("div", { class: "container mx-auto py-6 space-y-6" }, [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("div", null, [
                    createVNode("h1", { class: "text-3xl font-bold tracking-tight flex items-center gap-2" }, [
                      createVNode(unref(Settings), { class: "h-8 w-8" }),
                      createTextVNode(" Pengaturan Ecommerce ")
                    ]),
                    createVNode("p", { class: "text-muted-foreground mt-1" }, " Kelola pengaturan situs, media sosial, dan metode pembayaran ")
                  ]),
                  unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(_sfc_main$2), {
                    key: 0,
                    onClick: saveSettings,
                    disabled: unref(form).processing,
                    size: "lg"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Save), { class: "h-4 w-4 mr-2" }),
                      createTextVNode(" " + toDisplayString(unref(form).processing ? "Menyimpan..." : "Simpan Perubahan"), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled"])) : createCommentVNode("", true)
                ]),
                unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock(unref(_sfc_main$3), {
                  key: 0,
                  "default-value": "general",
                  class: "space-y-6"
                }, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$4), { class: "grid w-full grid-cols-3" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$5), {
                          value: "general",
                          class: "flex items-center gap-2"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Globe), { class: "h-4 w-4" }),
                            createVNode("span", null, "Umum")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$5), {
                          value: "social",
                          class: "flex items-center gap-2"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Facebook), { class: "h-4 w-4" }),
                            createVNode("span", null, "Media Sosial")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$5), {
                          value: "payment",
                          class: "flex items-center gap-2"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(CreditCard), { class: "h-4 w-4" }),
                            createVNode("span", null, "Pembayaran")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), { value: "general" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$7), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$8), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$9), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Pengaturan Umum")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$a), null, {
                                  default: withCtx(() => [
                                    createTextVNode(" Atur informasi dasar situs seperti nama, deskripsi, dan logo ")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$b), { class: "space-y-6" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "space-y-2" }, [
                                  createVNode(unref(_sfc_main$c), { for: "site_name" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Nama Situs")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$d), {
                                    id: "site_name",
                                    modelValue: unref(form).settings["site_name"],
                                    "onUpdate:modelValue": ($event) => unref(form).settings["site_name"] = $event,
                                    placeholder: "PURANUSA",
                                    disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                                  createVNode("p", { class: "text-xs text-muted-foreground" }, " Nama situs yang akan ditampilkan di header dan footer ")
                                ]),
                                createVNode(unref(_sfc_main$e)),
                                createVNode("div", { class: "space-y-2" }, [
                                  createVNode(unref(_sfc_main$c), { for: "site_description" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Deskripsi Situs")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_sfc_main$f, {
                                    modelValue: unref(form).settings["site_description"],
                                    "onUpdate:modelValue": ($event) => unref(form).settings["site_description"] = $event,
                                    disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                                  createVNode("p", { class: "text-xs text-muted-foreground" }, " Deskripsi singkat tentang situs yang akan ditampilkan di footer ")
                                ]),
                                createVNode(unref(_sfc_main$e)),
                                createVNode("div", { class: "space-y-4" }, [
                                  createVNode("div", null, [
                                    createVNode(unref(_sfc_main$c), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Logo Situs")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode("p", { class: "text-xs text-muted-foreground mt-1" }, " Upload logo atau masukkan URL logo yang akan ditampilkan di situs ")
                                  ]),
                                  createVNode("div", { class: "flex gap-4" }, [
                                    createVNode("label", { class: "flex items-center gap-2 cursor-pointer" }, [
                                      withDirectives(createVNode("input", {
                                        type: "radio",
                                        "onUpdate:modelValue": ($event) => logoInputMode.value = $event,
                                        value: "url",
                                        class: "w-4 h-4"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelRadio, logoInputMode.value]
                                      ]),
                                      createVNode("span", { class: "text-sm" }, "Input URL")
                                    ]),
                                    createVNode("label", { class: "flex items-center gap-2 cursor-pointer" }, [
                                      withDirectives(createVNode("input", {
                                        type: "radio",
                                        "onUpdate:modelValue": ($event) => logoInputMode.value = $event,
                                        value: "upload",
                                        class: "w-4 h-4"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelRadio, logoInputMode.value]
                                      ]),
                                      createVNode("span", { class: "text-sm" }, "Upload File")
                                    ])
                                  ]),
                                  logoInputMode.value === "url" ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "space-y-2"
                                  }, [
                                    createVNode(unref(_sfc_main$d), {
                                      id: "site_logo_url",
                                      modelValue: unref(form).settings["site_logo"],
                                      "onUpdate:modelValue": ($event) => unref(form).settings["site_logo"] = $event,
                                      placeholder: "https://example.com/logo.png",
                                      type: "url",
                                      disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                                  ])) : (openBlock(), createBlock("div", {
                                    key: 1,
                                    class: "space-y-2"
                                  }, [
                                    createVNode("div", { class: "flex gap-2" }, [
                                      createVNode("div", { class: "flex-1" }, [
                                        createVNode("input", {
                                          id: "logo_upload",
                                          type: "file",
                                          accept: "image/*",
                                          onChange: handleLogoUpload,
                                          class: "hidden",
                                          disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                        }, null, 40, ["disabled"]),
                                        createVNode(unref(_sfc_main$2), {
                                          type: "button",
                                          variant: "outline",
                                          class: "w-full",
                                          onClick: triggerFileInput,
                                          disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(Upload), { class: "h-4 w-4 mr-2" }),
                                            createTextVNode(" " + toDisplayString(unref(form).site_logo ? "Ganti File" : "Pilih File"), 1)
                                          ]),
                                          _: 1
                                        }, 8, ["disabled"])
                                      ]),
                                      currentLogoUrl.value ? (openBlock(), createBlock(unref(_sfc_main$2), {
                                        key: 0,
                                        type: "button",
                                        variant: "destructive",
                                        onClick: removeLogo,
                                        disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(X), { class: "h-4 w-4" })
                                        ]),
                                        _: 1
                                      }, 8, ["disabled"])) : createCommentVNode("", true)
                                    ]),
                                    createVNode("p", { class: "text-xs text-muted-foreground" }, " Format: JPG, PNG, GIF (Max: 2MB) ")
                                  ])),
                                  currentLogoUrl.value ? (openBlock(), createBlock("div", {
                                    key: 2,
                                    class: "mt-4"
                                  }, [
                                    createVNode(unref(_sfc_main$c), { class: "mb-2 block" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Preview")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode("div", { class: "border rounded-lg p-4 bg-muted/50 flex items-center justify-center" }, [
                                      createVNode("img", {
                                        src: currentLogoUrl.value,
                                        alt: "Logo Preview",
                                        class: "max-h-32 max-w-full object-contain",
                                        onError: () => {
                                          if (logoInputMode.value === "url") unref(form).settings["site_logo"] = null;
                                        }
                                      }, null, 40, ["src", "onError"])
                                    ])
                                  ])) : createCommentVNode("", true)
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), { value: "social" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$7), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$8), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$9), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Media Sosial")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$a), null, {
                                  default: withCtx(() => [
                                    createTextVNode(" Kelola link media sosial yang akan ditampilkan di footer ")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$b), { class: "space-y-6" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "space-y-2" }, [
                                  createVNode(unref(_sfc_main$c), {
                                    for: "social_facebook",
                                    class: "flex items-center gap-2"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Facebook), { class: "h-4 w-4 text-blue-600" }),
                                      createTextVNode(" Facebook ")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$d), {
                                    id: "social_facebook",
                                    modelValue: unref(form).settings["social_facebook"],
                                    "onUpdate:modelValue": ($event) => unref(form).settings["social_facebook"] = $event,
                                    placeholder: "https://facebook.com/puranusa",
                                    type: "url",
                                    disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                                ]),
                                createVNode(unref(_sfc_main$e)),
                                createVNode("div", { class: "space-y-2" }, [
                                  createVNode(unref(_sfc_main$c), {
                                    for: "social_twitter",
                                    class: "flex items-center gap-2"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Twitter), { class: "h-4 w-4 text-sky-500" }),
                                      createTextVNode(" Twitter ")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$d), {
                                    id: "social_twitter",
                                    modelValue: unref(form).settings["social_twitter"],
                                    "onUpdate:modelValue": ($event) => unref(form).settings["social_twitter"] = $event,
                                    placeholder: "https://twitter.com/puranusa",
                                    type: "url",
                                    disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                                ]),
                                createVNode(unref(_sfc_main$e)),
                                createVNode("div", { class: "space-y-2" }, [
                                  createVNode(unref(_sfc_main$c), {
                                    for: "social_instagram",
                                    class: "flex items-center gap-2"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Instagram), { class: "h-4 w-4 text-pink-600" }),
                                      createTextVNode(" Instagram ")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$d), {
                                    id: "social_instagram",
                                    modelValue: unref(form).settings["social_instagram"],
                                    "onUpdate:modelValue": ($event) => unref(form).settings["social_instagram"] = $event,
                                    placeholder: "https://instagram.com/puranusa",
                                    type: "url",
                                    disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                                ]),
                                createVNode(unref(_sfc_main$e)),
                                createVNode("div", { class: "space-y-2" }, [
                                  createVNode(unref(_sfc_main$c), {
                                    for: "social_youtube",
                                    class: "flex items-center gap-2"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Youtube), { class: "h-4 w-4 text-red-600" }),
                                      createTextVNode(" YouTube ")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$d), {
                                    id: "social_youtube",
                                    modelValue: unref(form).settings["social_youtube"],
                                    "onUpdate:modelValue": ($event) => unref(form).settings["social_youtube"] = $event,
                                    placeholder: "https://youtube.com/@puranusa",
                                    type: "url",
                                    disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                                ]),
                                createVNode("div", { class: "rounded-lg bg-muted p-4 mt-6" }, [
                                  createVNode("p", { class: "text-sm text-muted-foreground flex items-start gap-2" }, [
                                    createVNode(unref(Info), { class: "h-4 w-4 mt-0.5 flex-shrink-0" }),
                                    createVNode("span", null, "Kosongkan URL untuk menyembunyikan ikon media sosial dari footer")
                                  ])
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), { value: "payment" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$7), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$8), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$9), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Metode Pembayaran")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$a), null, {
                                  default: withCtx(() => [
                                    createTextVNode(" Kelola metode pembayaran yang akan ditampilkan di footer ")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$b), { class: "space-y-6" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "space-y-2" }, [
                                  createVNode(unref(_sfc_main$c), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Metode Pembayaran Aktif")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("div", { class: "flex flex-wrap gap-2 min-h-[60px] p-4 border rounded-lg bg-muted/50" }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(paymentMethods.value, (method) => {
                                      return openBlock(), createBlock(unref(_sfc_main$g), {
                                        key: method,
                                        variant: "secondary",
                                        class: "px-3 py-1.5 text-sm font-medium flex items-center gap-2"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(method) + " ", 1),
                                          createVNode("button", {
                                            onClick: ($event) => removePaymentMethod(method),
                                            class: "hover:text-destructive transition-colors",
                                            type: "button",
                                            disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                          }, " × ", 8, ["onClick", "disabled"])
                                        ]),
                                        _: 2
                                      }, 1024);
                                    }), 128)),
                                    paymentMethods.value.length === 0 ? (openBlock(), createBlock("span", {
                                      key: 0,
                                      class: "text-sm text-muted-foreground"
                                    }, " Belum ada metode pembayaran ")) : createCommentVNode("", true)
                                  ])
                                ]),
                                createVNode(unref(_sfc_main$e)),
                                createVNode("div", { class: "space-y-2" }, [
                                  createVNode(unref(_sfc_main$c), { for: "new_payment_method" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Tambah Metode Pembayaran")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("div", { class: "flex gap-2" }, [
                                    createVNode(unref(_sfc_main$d), {
                                      id: "new_payment_method",
                                      modelValue: newPaymentMethod.value,
                                      "onUpdate:modelValue": ($event) => newPaymentMethod.value = $event,
                                      placeholder: "Contoh: VISA, Mastercard, GoPay, OVO",
                                      onKeydown: withKeys(withModifiers(addPaymentMethod, ["prevent"]), ["enter"]),
                                      disabled: !(unref(isSuperAdmin) || unref(isAdmin))
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeydown", "disabled"]),
                                    createVNode(unref(_sfc_main$2), {
                                      type: "button",
                                      onClick: addPaymentMethod,
                                      disabled: !newPaymentMethod.value.trim() || !(unref(isSuperAdmin) || unref(isAdmin))
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Tambah ")
                                      ]),
                                      _: 1
                                    }, 8, ["disabled"])
                                  ]),
                                  createVNode("p", { class: "text-xs text-muted-foreground" }, " Tekan Enter atau klik tombol Tambah untuk menambahkan metode pembayaran baru ")
                                ]),
                                createVNode("div", { class: "rounded-lg bg-muted p-4 mt-6" }, [
                                  createVNode("p", { class: "text-sm font-medium mb-2" }, "Tips:"),
                                  createVNode("ul", { class: "text-sm text-muted-foreground space-y-1 list-disc list-inside" }, [
                                    createVNode("li", null, "Gunakan nama singkat dan jelas (contoh: VISA, Mastercard)"),
                                    createVNode("li", null, "Metode pembayaran akan ditampilkan di footer situs"),
                                    createVNode("li", null, "Klik tanda × pada badge untuk menghapus metode")
                                  ])
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })) : createCommentVNode("", true),
                unref(isSuperAdmin) || unref(isAdmin) ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "flex justify-end"
                }, [
                  createVNode(unref(_sfc_main$2), {
                    onClick: saveSettings,
                    disabled: unref(form).processing,
                    size: "lg"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Save), { class: "h-4 w-4 mr-2" }),
                      createTextVNode(" " + toDisplayString(unref(form).processing ? "Menyimpan..." : "Simpan Perubahan"), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Settings/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
