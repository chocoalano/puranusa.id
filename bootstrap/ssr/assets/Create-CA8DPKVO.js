import { defineComponent, ref, computed, watch, unref, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, Transition, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { Head, router, useForm } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-1TXr_jx9.js";
import { _ as _sfc_main$2 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$c } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$b } from "./Label-16aMY2sx.js";
import { _ as _sfc_main$d } from "./Textarea-pcFPh_uS.js";
import { _ as _sfc_main$g } from "./Checkbox-CIOQa2-J.js";
import { _ as _sfc_main$6, a as _sfc_main$7, b as _sfc_main$8, d as _sfc_main$9, c as _sfc_main$a } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5 } from "./index-D3PKcwoM.js";
import { ArrowLeft, CheckCircle2, XCircle, AlertCircle, Info } from "lucide-vue-next";
import { _ as _sfc_main$f } from "./ImageUploadZone-DFnR8hWR.js";
import { _ as _sfc_main$e } from "./TiptapEditor-CT1Phepi.js";
import "class-variance-authority";
import "./DropdownMenuTrigger-B1v6pHML.js";
import "reka-ui";
import "@vueuse/core";
import "./index--D7ld9AJ.js";
import "./AvatarImage-DWFQMckn.js";
import "./index-BsP5JKUP.js";
import "vue-sonner";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
import "clsx";
import "tailwind-merge";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    categories: {}
  },
  setup(__props) {
    const breadcrumbItems = [
      {
        title: "Produk",
        href: "/admin/products"
      },
      {
        title: "Tambah Produk",
        href: "/admin/products/create"
      }
    ];
    const form = ref({
      sku: "",
      slug: "",
      name: "",
      short_desc: "",
      long_desc: "",
      brand: "",
      warranty_months: 0,
      base_price: 0,
      currency: "IDR",
      stock: 0,
      weight_gram: 0,
      length_mm: 0,
      width_mm: 0,
      height_mm: 0,
      bv: 0,
      b_sponsor: 0,
      b_matching: 0,
      b_pairing: 0,
      b_cashback: 0,
      b_retail: 0,
      is_active: true,
      categories: [],
      images: []
    });
    const loading = ref(false);
    const errors = ref({});
    const alertMessage = ref(null);
    const slugGenerated = ref(false);
    const hasErrors = computed(() => Object.keys(errors.value).length > 0);
    const errorList = computed(() => {
      return Object.entries(errors.value).map(([field, message]) => ({
        field: formatFieldName(field),
        message
      }));
    });
    const formatFieldName = (field) => {
      const fieldNames = {
        sku: "SKU",
        slug: "Slug",
        name: "Nama Produk",
        short_desc: "Deskripsi Singkat",
        long_desc: "Deskripsi Lengkap",
        brand: "Brand",
        warranty_months: "Garansi",
        base_price: "Harga",
        stock: "Stok",
        weight_gram: "Berat",
        length_mm: "Panjang",
        width_mm: "Lebar",
        height_mm: "Tinggi",
        bv: "Business Value",
        b_sponsor: "Bonus Sponsor",
        b_matching: "Bonus Matching",
        b_pairing: "Bonus Pairing",
        b_cashback: "Bonus Cashback",
        b_retail: "Bonus Retail",
        is_active: "Status Aktif",
        categories: "Kategori",
        images: "Gambar Produk"
      };
      return fieldNames[field] || field;
    };
    watch(alertMessage, (newVal) => {
      if (newVal) {
        setTimeout(() => {
          alertMessage.value = null;
        }, 8e3);
      }
    });
    const generateSlug = () => {
      if (!form.value.name.trim()) {
        alertMessage.value = {
          type: "warning",
          title: "Nama Produk Kosong",
          message: "Silakan masukkan nama produk terlebih dahulu sebelum generate slug."
        };
        return;
      }
      form.value.slug = form.value.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      slugGenerated.value = true;
      alertMessage.value = {
        type: "success",
        title: "Slug Berhasil Dibuat",
        message: `Slug "${form.value.slug}" telah dibuat dari nama produk.`
      };
    };
    const dismissAlert = () => {
      alertMessage.value = null;
    };
    const submit = () => {
      loading.value = true;
      errors.value = {};
      const formData = new FormData();
      Object.entries(form.value).forEach(([key, value]) => {
        if (key === "categories" && Array.isArray(value)) {
          value.forEach((id) => formData.append("categories[]", id.toString()));
        } else if (key === "images" && Array.isArray(value)) {
          value.forEach((file) => formData.append("images[]", file));
        } else if (key === "is_active") {
          formData.append(key, value ? "1" : "0");
        } else if (value !== null && value !== void 0) {
          formData.append(key, value.toString());
        }
      });
      const submitFormHelper = useForm({});
      submitFormHelper.transform(() => formData).post("/admin/products", {
        preserveScroll: true,
        forceFormData: true,
        onSuccess: () => {
          loading.value = false;
          alertMessage.value = {
            type: "success",
            title: "Produk Berhasil Ditambahkan",
            message: "Produk baru telah berhasil disimpan ke dalam katalog."
          };
        },
        onError: (err) => {
          errors.value = err;
          loading.value = false;
          const errorCount = Object.keys(err).length;
          let errorDetails = "";
          if (errorCount === 1) {
            const [field, message] = Object.entries(err)[0];
            errorDetails = `${formatFieldName(field)}: ${message}`;
          } else {
            errorDetails = `Terdapat ${errorCount} kesalahan yang perlu diperbaiki. Silakan periksa field yang ditandai merah di bawah ini.`;
          }
          alertMessage.value = {
            type: "error",
            title: "Gagal Menyimpan Produk",
            message: errorDetails
          };
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Tambah Produk" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, { breadcrumbs: breadcrumbItems }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="rounded-xl p-4 space-y-6 py-6"${_scopeId}><div class="flex items-center gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              variant: "outline",
              size: "icon",
              onClick: ($event) => unref(router).visit("/admin/products")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ArrowLeft), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(ArrowLeft), { class: "h-4 w-4" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div${_scopeId}><h1 class="text-3xl font-bold tracking-tight"${_scopeId}>Tambah Produk</h1><p class="text-muted-foreground"${_scopeId}>Tambahkan produk baru ke katalog</p></div></div>`);
            if (alertMessage.value) {
              _push2(ssrRenderComponent(unref(_sfc_main$3), {
                variant: alertMessage.value.type === "error" ? "destructive" : "default",
                class: {
                  "border-green-500 bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200": alertMessage.value.type === "success",
                  "border-yellow-500 bg-yellow-50 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200": alertMessage.value.type === "warning",
                  "border-blue-500 bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-200": alertMessage.value.type === "info"
                }
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (alertMessage.value.type === "success") {
                      _push3(ssrRenderComponent(unref(CheckCircle2), { class: "h-4 w-4 text-green-600 dark:text-green-400" }, null, _parent3, _scopeId2));
                    } else if (alertMessage.value.type === "error") {
                      _push3(ssrRenderComponent(unref(XCircle), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                    } else if (alertMessage.value.type === "warning") {
                      _push3(ssrRenderComponent(unref(AlertCircle), { class: "h-4 w-4 text-yellow-600 dark:text-yellow-400" }, null, _parent3, _scopeId2));
                    } else {
                      _push3(ssrRenderComponent(unref(Info), { class: "h-4 w-4 text-blue-600 dark:text-blue-400" }, null, _parent3, _scopeId2));
                    }
                    _push3(ssrRenderComponent(unref(_sfc_main$4), { class: "flex items-center justify-between" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(alertMessage.value.title)} `);
                          _push4(ssrRenderComponent(unref(_sfc_main$2), {
                            variant: "ghost",
                            size: "sm",
                            class: "h-6 w-6 p-0 hover:bg-transparent",
                            onClick: dismissAlert
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<span class="sr-only"${_scopeId4}>Tutup</span> × `);
                              } else {
                                return [
                                  createVNode("span", { class: "sr-only" }, "Tutup"),
                                  createTextVNode(" × ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createTextVNode(toDisplayString(alertMessage.value.title) + " ", 1),
                            createVNode(unref(_sfc_main$2), {
                              variant: "ghost",
                              size: "sm",
                              class: "h-6 w-6 p-0 hover:bg-transparent",
                              onClick: dismissAlert
                            }, {
                              default: withCtx(() => [
                                createVNode("span", { class: "sr-only" }, "Tutup"),
                                createTextVNode(" × ")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(alertMessage.value.message)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(alertMessage.value.message), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      alertMessage.value.type === "success" ? (openBlock(), createBlock(unref(CheckCircle2), {
                        key: 0,
                        class: "h-4 w-4 text-green-600 dark:text-green-400"
                      })) : alertMessage.value.type === "error" ? (openBlock(), createBlock(unref(XCircle), {
                        key: 1,
                        class: "h-4 w-4"
                      })) : alertMessage.value.type === "warning" ? (openBlock(), createBlock(unref(AlertCircle), {
                        key: 2,
                        class: "h-4 w-4 text-yellow-600 dark:text-yellow-400"
                      })) : (openBlock(), createBlock(unref(Info), {
                        key: 3,
                        class: "h-4 w-4 text-blue-600 dark:text-blue-400"
                      })),
                      createVNode(unref(_sfc_main$4), { class: "flex items-center justify-between" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(alertMessage.value.title) + " ", 1),
                          createVNode(unref(_sfc_main$2), {
                            variant: "ghost",
                            size: "sm",
                            class: "h-6 w-6 p-0 hover:bg-transparent",
                            onClick: dismissAlert
                          }, {
                            default: withCtx(() => [
                              createVNode("span", { class: "sr-only" }, "Tutup"),
                              createTextVNode(" × ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(alertMessage.value.message), 1)
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
            if (hasErrors.value && errorList.value.length > 1) {
              _push2(ssrRenderComponent(unref(_sfc_main$3), {
                variant: "destructive",
                class: "mb-4"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(XCircle), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Terdapat ${ssrInterpolate(errorList.value.length)} Kesalahan`);
                        } else {
                          return [
                            createTextVNode("Terdapat " + toDisplayString(errorList.value.length) + " Kesalahan", 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<ul class="mt-2 list-disc list-inside space-y-1"${_scopeId3}><!--[-->`);
                          ssrRenderList(errorList.value, (error, index) => {
                            _push4(`<li class="text-sm"${_scopeId3}><strong${_scopeId3}>${ssrInterpolate(error.field)}:</strong> ${ssrInterpolate(error.message)}</li>`);
                          });
                          _push4(`<!--]--></ul>`);
                        } else {
                          return [
                            createVNode("ul", { class: "mt-2 list-disc list-inside space-y-1" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(errorList.value, (error, index) => {
                                return openBlock(), createBlock("li", {
                                  key: index,
                                  class: "text-sm"
                                }, [
                                  createVNode("strong", null, toDisplayString(error.field) + ":", 1),
                                  createTextVNode(" " + toDisplayString(error.message), 1)
                                ]);
                              }), 128))
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(XCircle), { class: "h-4 w-4" }),
                      createVNode(unref(_sfc_main$4), null, {
                        default: withCtx(() => [
                          createTextVNode("Terdapat " + toDisplayString(errorList.value.length) + " Kesalahan", 1)
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createVNode("ul", { class: "mt-2 list-disc list-inside space-y-1" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(errorList.value, (error, index) => {
                              return openBlock(), createBlock("li", {
                                key: index,
                                class: "text-sm"
                              }, [
                                createVNode("strong", null, toDisplayString(error.field) + ":", 1),
                                createTextVNode(" " + toDisplayString(error.message), 1)
                              ]);
                            }), 128))
                          ])
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
            _push2(`<form class="space-y-6 w-full grid grid-cols-2 gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$6), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$7), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$8), null, {
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
                        _push4(ssrRenderComponent(unref(_sfc_main$9), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Informasi utama produk`);
                            } else {
                              return [
                                createTextVNode("Informasi utama produk")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              createTextVNode("Informasi Dasar")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$9), null, {
                            default: withCtx(() => [
                              createTextVNode("Informasi utama produk")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$a), { class: "space-y-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="grid grid-cols-2 gap-4"${_scopeId3}><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$b), { for: "sku" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`SKU <span class="text-destructive"${_scopeId4}>*</span>`);
                            } else {
                              return [
                                createTextVNode("SKU "),
                                createVNode("span", { class: "text-destructive" }, "*")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$c), {
                          id: "sku",
                          modelValue: form.value.sku,
                          "onUpdate:modelValue": ($event) => form.value.sku = $event,
                          placeholder: "SKU-001",
                          class: { "border-destructive": errors.value.sku },
                          required: ""
                        }, null, _parent4, _scopeId3));
                        if (errors.value.sku) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(errors.value.sku)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$b), { for: "slug" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Slug <span class="text-destructive"${_scopeId4}>*</span>`);
                            } else {
                              return [
                                createTextVNode("Slug "),
                                createVNode("span", { class: "text-destructive" }, "*")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<div class="flex gap-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$c), {
                          id: "slug",
                          modelValue: form.value.slug,
                          "onUpdate:modelValue": ($event) => form.value.slug = $event,
                          placeholder: "product-slug",
                          class: { "border-destructive": errors.value.slug },
                          required: ""
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$2), {
                          type: "button",
                          variant: "outline",
                          onClick: generateSlug,
                          disabled: !form.value.name.trim(),
                          title: !form.value.name.trim() ? "Masukkan nama produk terlebih dahulu" : "Generate slug dari nama produk"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Generate `);
                            } else {
                              return [
                                createTextVNode(" Generate ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                        if (errors.value.slug) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(errors.value.slug)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div></div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$b), { for: "name" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Nama Produk <span class="text-destructive"${_scopeId4}>*</span>`);
                            } else {
                              return [
                                createTextVNode("Nama Produk "),
                                createVNode("span", { class: "text-destructive" }, "*")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$c), {
                          id: "name",
                          modelValue: form.value.name,
                          "onUpdate:modelValue": ($event) => form.value.name = $event,
                          placeholder: "Nama produk",
                          class: { "border-destructive": errors.value.name },
                          required: ""
                        }, null, _parent4, _scopeId3));
                        _push4(`<p class="text-xs text-muted-foreground"${_scopeId3}> Slug akan otomatis dibuat saat Anda klik tombol &quot;Generate&quot; pada field Slug </p>`);
                        if (errors.value.name) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(errors.value.name)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$b), { for: "brand" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Brand`);
                            } else {
                              return [
                                createTextVNode("Brand")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$c), {
                          id: "brand",
                          modelValue: form.value.brand,
                          "onUpdate:modelValue": ($event) => form.value.brand = $event,
                          placeholder: "Nama brand"
                        }, null, _parent4, _scopeId3));
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$b), { for: "short_desc" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Deskripsi Singkat`);
                            } else {
                              return [
                                createTextVNode("Deskripsi Singkat")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$d), {
                          id: "short_desc",
                          modelValue: form.value.short_desc,
                          "onUpdate:modelValue": ($event) => form.value.short_desc = $event,
                          placeholder: "Deskripsi singkat produk",
                          rows: "2"
                        }, null, _parent4, _scopeId3));
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$b), { for: "long_desc" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Deskripsi Lengkap`);
                            } else {
                              return [
                                createTextVNode("Deskripsi Lengkap")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_sfc_main$e, {
                          modelValue: form.value.long_desc,
                          "onUpdate:modelValue": ($event) => form.value.long_desc = $event
                        }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$b), { for: "sku" }, {
                                default: withCtx(() => [
                                  createTextVNode("SKU "),
                                  createVNode("span", { class: "text-destructive" }, "*")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), {
                                id: "sku",
                                modelValue: form.value.sku,
                                "onUpdate:modelValue": ($event) => form.value.sku = $event,
                                placeholder: "SKU-001",
                                class: { "border-destructive": errors.value.sku },
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              errors.value.sku ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(errors.value.sku), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$b), { for: "slug" }, {
                                default: withCtx(() => [
                                  createTextVNode("Slug "),
                                  createVNode("span", { class: "text-destructive" }, "*")
                                ]),
                                _: 1
                              }),
                              createVNode("div", { class: "flex gap-2" }, [
                                createVNode(unref(_sfc_main$c), {
                                  id: "slug",
                                  modelValue: form.value.slug,
                                  "onUpdate:modelValue": ($event) => form.value.slug = $event,
                                  placeholder: "product-slug",
                                  class: { "border-destructive": errors.value.slug },
                                  required: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                                createVNode(unref(_sfc_main$2), {
                                  type: "button",
                                  variant: "outline",
                                  onClick: generateSlug,
                                  disabled: !form.value.name.trim(),
                                  title: !form.value.name.trim() ? "Masukkan nama produk terlebih dahulu" : "Generate slug dari nama produk"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Generate ")
                                  ]),
                                  _: 1
                                }, 8, ["disabled", "title"])
                              ]),
                              errors.value.slug ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(errors.value.slug), 1)) : createCommentVNode("", true)
                            ])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$b), { for: "name" }, {
                              default: withCtx(() => [
                                createTextVNode("Nama Produk "),
                                createVNode("span", { class: "text-destructive" }, "*")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), {
                              id: "name",
                              modelValue: form.value.name,
                              "onUpdate:modelValue": ($event) => form.value.name = $event,
                              placeholder: "Nama produk",
                              class: { "border-destructive": errors.value.name },
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, ' Slug akan otomatis dibuat saat Anda klik tombol "Generate" pada field Slug '),
                            errors.value.name ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(errors.value.name), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$b), { for: "brand" }, {
                              default: withCtx(() => [
                                createTextVNode("Brand")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), {
                              id: "brand",
                              modelValue: form.value.brand,
                              "onUpdate:modelValue": ($event) => form.value.brand = $event,
                              placeholder: "Nama brand"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$b), { for: "short_desc" }, {
                              default: withCtx(() => [
                                createTextVNode("Deskripsi Singkat")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$d), {
                              id: "short_desc",
                              modelValue: form.value.short_desc,
                              "onUpdate:modelValue": ($event) => form.value.short_desc = $event,
                              placeholder: "Deskripsi singkat produk",
                              rows: "2"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$b), { for: "long_desc" }, {
                              default: withCtx(() => [
                                createTextVNode("Deskripsi Lengkap")
                              ]),
                              _: 1
                            }),
                            createVNode(_sfc_main$e, {
                              modelValue: form.value.long_desc,
                              "onUpdate:modelValue": ($event) => form.value.long_desc = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                        createVNode(unref(_sfc_main$8), null, {
                          default: withCtx(() => [
                            createTextVNode("Informasi Dasar")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$9), null, {
                          default: withCtx(() => [
                            createTextVNode("Informasi utama produk")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$a), { class: "space-y-4" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$b), { for: "sku" }, {
                              default: withCtx(() => [
                                createTextVNode("SKU "),
                                createVNode("span", { class: "text-destructive" }, "*")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), {
                              id: "sku",
                              modelValue: form.value.sku,
                              "onUpdate:modelValue": ($event) => form.value.sku = $event,
                              placeholder: "SKU-001",
                              class: { "border-destructive": errors.value.sku },
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            errors.value.sku ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(errors.value.sku), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$b), { for: "slug" }, {
                              default: withCtx(() => [
                                createTextVNode("Slug "),
                                createVNode("span", { class: "text-destructive" }, "*")
                              ]),
                              _: 1
                            }),
                            createVNode("div", { class: "flex gap-2" }, [
                              createVNode(unref(_sfc_main$c), {
                                id: "slug",
                                modelValue: form.value.slug,
                                "onUpdate:modelValue": ($event) => form.value.slug = $event,
                                placeholder: "product-slug",
                                class: { "border-destructive": errors.value.slug },
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              createVNode(unref(_sfc_main$2), {
                                type: "button",
                                variant: "outline",
                                onClick: generateSlug,
                                disabled: !form.value.name.trim(),
                                title: !form.value.name.trim() ? "Masukkan nama produk terlebih dahulu" : "Generate slug dari nama produk"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Generate ")
                                ]),
                                _: 1
                              }, 8, ["disabled", "title"])
                            ]),
                            errors.value.slug ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(errors.value.slug), 1)) : createCommentVNode("", true)
                          ])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$b), { for: "name" }, {
                            default: withCtx(() => [
                              createTextVNode("Nama Produk "),
                              createVNode("span", { class: "text-destructive" }, "*")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$c), {
                            id: "name",
                            modelValue: form.value.name,
                            "onUpdate:modelValue": ($event) => form.value.name = $event,
                            placeholder: "Nama produk",
                            class: { "border-destructive": errors.value.name },
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, ' Slug akan otomatis dibuat saat Anda klik tombol "Generate" pada field Slug '),
                          errors.value.name ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive"
                          }, toDisplayString(errors.value.name), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$b), { for: "brand" }, {
                            default: withCtx(() => [
                              createTextVNode("Brand")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$c), {
                            id: "brand",
                            modelValue: form.value.brand,
                            "onUpdate:modelValue": ($event) => form.value.brand = $event,
                            placeholder: "Nama brand"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$b), { for: "short_desc" }, {
                            default: withCtx(() => [
                              createTextVNode("Deskripsi Singkat")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$d), {
                            id: "short_desc",
                            modelValue: form.value.short_desc,
                            "onUpdate:modelValue": ($event) => form.value.short_desc = $event,
                            placeholder: "Deskripsi singkat produk",
                            rows: "2"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$b), { for: "long_desc" }, {
                            default: withCtx(() => [
                              createTextVNode("Deskripsi Lengkap")
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$e, {
                            modelValue: form.value.long_desc,
                            "onUpdate:modelValue": ($event) => form.value.long_desc = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$6), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$7), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$8), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Harga &amp; Stok`);
                            } else {
                              return [
                                createTextVNode("Harga & Stok")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$9), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Informasi harga dan ketersediaan`);
                            } else {
                              return [
                                createTextVNode("Informasi harga dan ketersediaan")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              createTextVNode("Harga & Stok")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$9), null, {
                            default: withCtx(() => [
                              createTextVNode("Informasi harga dan ketersediaan")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$a), { class: "space-y-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="grid grid-cols-3 gap-4"${_scopeId3}><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$b), { for: "base_price" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Harga (IDR) <span class="text-destructive"${_scopeId4}>*</span>`);
                            } else {
                              return [
                                createTextVNode("Harga (IDR) "),
                                createVNode("span", { class: "text-destructive" }, "*")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$c), {
                          id: "base_price",
                          modelValue: form.value.base_price,
                          "onUpdate:modelValue": ($event) => form.value.base_price = $event,
                          modelModifiers: { number: true },
                          type: "number",
                          min: "0",
                          step: "0.01",
                          placeholder: "0",
                          class: { "border-destructive": errors.value.base_price },
                          required: ""
                        }, null, _parent4, _scopeId3));
                        if (errors.value.base_price) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(errors.value.base_price)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$b), { for: "stock" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Stok <span class="text-destructive"${_scopeId4}>*</span>`);
                            } else {
                              return [
                                createTextVNode("Stok "),
                                createVNode("span", { class: "text-destructive" }, "*")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$c), {
                          id: "stock",
                          modelValue: form.value.stock,
                          "onUpdate:modelValue": ($event) => form.value.stock = $event,
                          modelModifiers: { number: true },
                          type: "number",
                          min: "0",
                          placeholder: "0",
                          class: { "border-destructive": errors.value.stock },
                          required: ""
                        }, null, _parent4, _scopeId3));
                        if (errors.value.stock) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(errors.value.stock)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$b), { for: "warranty_months" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Garansi (Bulan)`);
                            } else {
                              return [
                                createTextVNode("Garansi (Bulan)")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$c), {
                          id: "warranty_months",
                          modelValue: form.value.warranty_months,
                          "onUpdate:modelValue": ($event) => form.value.warranty_months = $event,
                          modelModifiers: { number: true },
                          type: "number",
                          min: "0",
                          placeholder: "0"
                        }, null, _parent4, _scopeId3));
                        _push4(`</div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "grid grid-cols-3 gap-4" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$b), { for: "base_price" }, {
                                default: withCtx(() => [
                                  createTextVNode("Harga (IDR) "),
                                  createVNode("span", { class: "text-destructive" }, "*")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), {
                                id: "base_price",
                                modelValue: form.value.base_price,
                                "onUpdate:modelValue": ($event) => form.value.base_price = $event,
                                modelModifiers: { number: true },
                                type: "number",
                                min: "0",
                                step: "0.01",
                                placeholder: "0",
                                class: { "border-destructive": errors.value.base_price },
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              errors.value.base_price ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(errors.value.base_price), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$b), { for: "stock" }, {
                                default: withCtx(() => [
                                  createTextVNode("Stok "),
                                  createVNode("span", { class: "text-destructive" }, "*")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), {
                                id: "stock",
                                modelValue: form.value.stock,
                                "onUpdate:modelValue": ($event) => form.value.stock = $event,
                                modelModifiers: { number: true },
                                type: "number",
                                min: "0",
                                placeholder: "0",
                                class: { "border-destructive": errors.value.stock },
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              errors.value.stock ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(errors.value.stock), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$b), { for: "warranty_months" }, {
                                default: withCtx(() => [
                                  createTextVNode("Garansi (Bulan)")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), {
                                id: "warranty_months",
                                modelValue: form.value.warranty_months,
                                "onUpdate:modelValue": ($event) => form.value.warranty_months = $event,
                                modelModifiers: { number: true },
                                type: "number",
                                min: "0",
                                placeholder: "0"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                        createVNode(unref(_sfc_main$8), null, {
                          default: withCtx(() => [
                            createTextVNode("Harga & Stok")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$9), null, {
                          default: withCtx(() => [
                            createTextVNode("Informasi harga dan ketersediaan")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$a), { class: "space-y-4" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "grid grid-cols-3 gap-4" }, [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$b), { for: "base_price" }, {
                              default: withCtx(() => [
                                createTextVNode("Harga (IDR) "),
                                createVNode("span", { class: "text-destructive" }, "*")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), {
                              id: "base_price",
                              modelValue: form.value.base_price,
                              "onUpdate:modelValue": ($event) => form.value.base_price = $event,
                              modelModifiers: { number: true },
                              type: "number",
                              min: "0",
                              step: "0.01",
                              placeholder: "0",
                              class: { "border-destructive": errors.value.base_price },
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            errors.value.base_price ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(errors.value.base_price), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$b), { for: "stock" }, {
                              default: withCtx(() => [
                                createTextVNode("Stok "),
                                createVNode("span", { class: "text-destructive" }, "*")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), {
                              id: "stock",
                              modelValue: form.value.stock,
                              "onUpdate:modelValue": ($event) => form.value.stock = $event,
                              modelModifiers: { number: true },
                              type: "number",
                              min: "0",
                              placeholder: "0",
                              class: { "border-destructive": errors.value.stock },
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            errors.value.stock ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(errors.value.stock), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$b), { for: "warranty_months" }, {
                              default: withCtx(() => [
                                createTextVNode("Garansi (Bulan)")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), {
                              id: "warranty_months",
                              modelValue: form.value.warranty_months,
                              "onUpdate:modelValue": ($event) => form.value.warranty_months = $event,
                              modelModifiers: { number: true },
                              type: "number",
                              min: "0",
                              placeholder: "0"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
            _push2(ssrRenderComponent(unref(_sfc_main$6), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$7), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$8), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Bonus &amp; Komisi`);
                            } else {
                              return [
                                createTextVNode("Bonus & Komisi")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$9), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Pengaturan bonus untuk sistem MLM`);
                            } else {
                              return [
                                createTextVNode("Pengaturan bonus untuk sistem MLM")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              createTextVNode("Bonus & Komisi")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$9), null, {
                            default: withCtx(() => [
                              createTextVNode("Pengaturan bonus untuk sistem MLM")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$a), { class: "space-y-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="grid grid-cols-2 gap-4"${_scopeId3}><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$b), { for: "bv" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Business Value (BV)`);
                            } else {
                              return [
                                createTextVNode("Business Value (BV)")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$c), {
                          id: "bv",
                          modelValue: form.value.bv,
                          "onUpdate:modelValue": ($event) => form.value.bv = $event,
                          modelModifiers: { number: true },
                          type: "number",
                          min: "0",
                          step: "0.01",
                          placeholder: "0"
                        }, null, _parent4, _scopeId3));
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$b), { for: "b_sponsor" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Bonus Sponsor`);
                            } else {
                              return [
                                createTextVNode("Bonus Sponsor")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$c), {
                          id: "b_sponsor",
                          modelValue: form.value.b_sponsor,
                          "onUpdate:modelValue": ($event) => form.value.b_sponsor = $event,
                          modelModifiers: { number: true },
                          type: "number",
                          min: "0",
                          step: "0.01",
                          placeholder: "0"
                        }, null, _parent4, _scopeId3));
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$b), { for: "b_matching" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Bonus Matching`);
                            } else {
                              return [
                                createTextVNode("Bonus Matching")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$c), {
                          id: "b_matching",
                          modelValue: form.value.b_matching,
                          "onUpdate:modelValue": ($event) => form.value.b_matching = $event,
                          modelModifiers: { number: true },
                          type: "number",
                          min: "0",
                          step: "0.01",
                          placeholder: "0"
                        }, null, _parent4, _scopeId3));
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$b), { for: "b_pairing" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Bonus Pairing`);
                            } else {
                              return [
                                createTextVNode("Bonus Pairing")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$c), {
                          id: "b_pairing",
                          modelValue: form.value.b_pairing,
                          "onUpdate:modelValue": ($event) => form.value.b_pairing = $event,
                          modelModifiers: { number: true },
                          type: "number",
                          min: "0",
                          step: "0.01",
                          placeholder: "0"
                        }, null, _parent4, _scopeId3));
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$b), { for: "b_cashback" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Bonus Cashback`);
                            } else {
                              return [
                                createTextVNode("Bonus Cashback")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$c), {
                          id: "b_cashback",
                          modelValue: form.value.b_cashback,
                          "onUpdate:modelValue": ($event) => form.value.b_cashback = $event,
                          modelModifiers: { number: true },
                          type: "number",
                          min: "0",
                          step: "0.01",
                          placeholder: "0"
                        }, null, _parent4, _scopeId3));
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$b), { for: "b_retail" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Bonus Retail`);
                            } else {
                              return [
                                createTextVNode("Bonus Retail")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$c), {
                          id: "b_retail",
                          modelValue: form.value.b_retail,
                          "onUpdate:modelValue": ($event) => form.value.b_retail = $event,
                          modelModifiers: { number: true },
                          type: "number",
                          min: "0",
                          step: "0.01",
                          placeholder: "0"
                        }, null, _parent4, _scopeId3));
                        _push4(`</div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$b), { for: "bv" }, {
                                default: withCtx(() => [
                                  createTextVNode("Business Value (BV)")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), {
                                id: "bv",
                                modelValue: form.value.bv,
                                "onUpdate:modelValue": ($event) => form.value.bv = $event,
                                modelModifiers: { number: true },
                                type: "number",
                                min: "0",
                                step: "0.01",
                                placeholder: "0"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$b), { for: "b_sponsor" }, {
                                default: withCtx(() => [
                                  createTextVNode("Bonus Sponsor")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), {
                                id: "b_sponsor",
                                modelValue: form.value.b_sponsor,
                                "onUpdate:modelValue": ($event) => form.value.b_sponsor = $event,
                                modelModifiers: { number: true },
                                type: "number",
                                min: "0",
                                step: "0.01",
                                placeholder: "0"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$b), { for: "b_matching" }, {
                                default: withCtx(() => [
                                  createTextVNode("Bonus Matching")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), {
                                id: "b_matching",
                                modelValue: form.value.b_matching,
                                "onUpdate:modelValue": ($event) => form.value.b_matching = $event,
                                modelModifiers: { number: true },
                                type: "number",
                                min: "0",
                                step: "0.01",
                                placeholder: "0"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$b), { for: "b_pairing" }, {
                                default: withCtx(() => [
                                  createTextVNode("Bonus Pairing")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), {
                                id: "b_pairing",
                                modelValue: form.value.b_pairing,
                                "onUpdate:modelValue": ($event) => form.value.b_pairing = $event,
                                modelModifiers: { number: true },
                                type: "number",
                                min: "0",
                                step: "0.01",
                                placeholder: "0"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$b), { for: "b_cashback" }, {
                                default: withCtx(() => [
                                  createTextVNode("Bonus Cashback")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), {
                                id: "b_cashback",
                                modelValue: form.value.b_cashback,
                                "onUpdate:modelValue": ($event) => form.value.b_cashback = $event,
                                modelModifiers: { number: true },
                                type: "number",
                                min: "0",
                                step: "0.01",
                                placeholder: "0"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$b), { for: "b_retail" }, {
                                default: withCtx(() => [
                                  createTextVNode("Bonus Retail")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), {
                                id: "b_retail",
                                modelValue: form.value.b_retail,
                                "onUpdate:modelValue": ($event) => form.value.b_retail = $event,
                                modelModifiers: { number: true },
                                type: "number",
                                min: "0",
                                step: "0.01",
                                placeholder: "0"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                        createVNode(unref(_sfc_main$8), null, {
                          default: withCtx(() => [
                            createTextVNode("Bonus & Komisi")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$9), null, {
                          default: withCtx(() => [
                            createTextVNode("Pengaturan bonus untuk sistem MLM")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$a), { class: "space-y-4" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$b), { for: "bv" }, {
                              default: withCtx(() => [
                                createTextVNode("Business Value (BV)")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), {
                              id: "bv",
                              modelValue: form.value.bv,
                              "onUpdate:modelValue": ($event) => form.value.bv = $event,
                              modelModifiers: { number: true },
                              type: "number",
                              min: "0",
                              step: "0.01",
                              placeholder: "0"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$b), { for: "b_sponsor" }, {
                              default: withCtx(() => [
                                createTextVNode("Bonus Sponsor")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), {
                              id: "b_sponsor",
                              modelValue: form.value.b_sponsor,
                              "onUpdate:modelValue": ($event) => form.value.b_sponsor = $event,
                              modelModifiers: { number: true },
                              type: "number",
                              min: "0",
                              step: "0.01",
                              placeholder: "0"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$b), { for: "b_matching" }, {
                              default: withCtx(() => [
                                createTextVNode("Bonus Matching")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), {
                              id: "b_matching",
                              modelValue: form.value.b_matching,
                              "onUpdate:modelValue": ($event) => form.value.b_matching = $event,
                              modelModifiers: { number: true },
                              type: "number",
                              min: "0",
                              step: "0.01",
                              placeholder: "0"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$b), { for: "b_pairing" }, {
                              default: withCtx(() => [
                                createTextVNode("Bonus Pairing")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), {
                              id: "b_pairing",
                              modelValue: form.value.b_pairing,
                              "onUpdate:modelValue": ($event) => form.value.b_pairing = $event,
                              modelModifiers: { number: true },
                              type: "number",
                              min: "0",
                              step: "0.01",
                              placeholder: "0"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$b), { for: "b_cashback" }, {
                              default: withCtx(() => [
                                createTextVNode("Bonus Cashback")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), {
                              id: "b_cashback",
                              modelValue: form.value.b_cashback,
                              "onUpdate:modelValue": ($event) => form.value.b_cashback = $event,
                              modelModifiers: { number: true },
                              type: "number",
                              min: "0",
                              step: "0.01",
                              placeholder: "0"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$b), { for: "b_retail" }, {
                              default: withCtx(() => [
                                createTextVNode("Bonus Retail")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), {
                              id: "b_retail",
                              modelValue: form.value.b_retail,
                              "onUpdate:modelValue": ($event) => form.value.b_retail = $event,
                              modelModifiers: { number: true },
                              type: "number",
                              min: "0",
                              step: "0.01",
                              placeholder: "0"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
            _push2(ssrRenderComponent(unref(_sfc_main$6), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$7), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$8), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Informasi Pengiriman`);
                            } else {
                              return [
                                createTextVNode("Informasi Pengiriman")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$9), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Berat dan dimensi untuk pengiriman`);
                            } else {
                              return [
                                createTextVNode("Berat dan dimensi untuk pengiriman")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              createTextVNode("Informasi Pengiriman")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$9), null, {
                            default: withCtx(() => [
                              createTextVNode("Berat dan dimensi untuk pengiriman")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$a), { class: "space-y-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="grid grid-cols-4 gap-4"${_scopeId3}><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$b), { for: "weight_gram" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Berat (gram) <span class="text-destructive"${_scopeId4}>*</span>`);
                            } else {
                              return [
                                createTextVNode("Berat (gram) "),
                                createVNode("span", { class: "text-destructive" }, "*")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$c), {
                          id: "weight_gram",
                          modelValue: form.value.weight_gram,
                          "onUpdate:modelValue": ($event) => form.value.weight_gram = $event,
                          modelModifiers: { number: true },
                          type: "number",
                          min: "0",
                          placeholder: "0",
                          class: { "border-destructive": errors.value.weight_gram },
                          required: ""
                        }, null, _parent4, _scopeId3));
                        if (errors.value.weight_gram) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(errors.value.weight_gram)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$b), { for: "length_mm" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Panjang (mm)`);
                            } else {
                              return [
                                createTextVNode("Panjang (mm)")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$c), {
                          id: "length_mm",
                          modelValue: form.value.length_mm,
                          "onUpdate:modelValue": ($event) => form.value.length_mm = $event,
                          modelModifiers: { number: true },
                          type: "number",
                          min: "0",
                          placeholder: "0"
                        }, null, _parent4, _scopeId3));
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$b), { for: "width_mm" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Lebar (mm)`);
                            } else {
                              return [
                                createTextVNode("Lebar (mm)")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$c), {
                          id: "width_mm",
                          modelValue: form.value.width_mm,
                          "onUpdate:modelValue": ($event) => form.value.width_mm = $event,
                          modelModifiers: { number: true },
                          type: "number",
                          min: "0",
                          placeholder: "0"
                        }, null, _parent4, _scopeId3));
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$b), { for: "height_mm" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Tinggi (mm)`);
                            } else {
                              return [
                                createTextVNode("Tinggi (mm)")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$c), {
                          id: "height_mm",
                          modelValue: form.value.height_mm,
                          "onUpdate:modelValue": ($event) => form.value.height_mm = $event,
                          modelModifiers: { number: true },
                          type: "number",
                          min: "0",
                          placeholder: "0"
                        }, null, _parent4, _scopeId3));
                        _push4(`</div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "grid grid-cols-4 gap-4" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$b), { for: "weight_gram" }, {
                                default: withCtx(() => [
                                  createTextVNode("Berat (gram) "),
                                  createVNode("span", { class: "text-destructive" }, "*")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), {
                                id: "weight_gram",
                                modelValue: form.value.weight_gram,
                                "onUpdate:modelValue": ($event) => form.value.weight_gram = $event,
                                modelModifiers: { number: true },
                                type: "number",
                                min: "0",
                                placeholder: "0",
                                class: { "border-destructive": errors.value.weight_gram },
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              errors.value.weight_gram ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(errors.value.weight_gram), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$b), { for: "length_mm" }, {
                                default: withCtx(() => [
                                  createTextVNode("Panjang (mm)")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), {
                                id: "length_mm",
                                modelValue: form.value.length_mm,
                                "onUpdate:modelValue": ($event) => form.value.length_mm = $event,
                                modelModifiers: { number: true },
                                type: "number",
                                min: "0",
                                placeholder: "0"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$b), { for: "width_mm" }, {
                                default: withCtx(() => [
                                  createTextVNode("Lebar (mm)")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), {
                                id: "width_mm",
                                modelValue: form.value.width_mm,
                                "onUpdate:modelValue": ($event) => form.value.width_mm = $event,
                                modelModifiers: { number: true },
                                type: "number",
                                min: "0",
                                placeholder: "0"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$b), { for: "height_mm" }, {
                                default: withCtx(() => [
                                  createTextVNode("Tinggi (mm)")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), {
                                id: "height_mm",
                                modelValue: form.value.height_mm,
                                "onUpdate:modelValue": ($event) => form.value.height_mm = $event,
                                modelModifiers: { number: true },
                                type: "number",
                                min: "0",
                                placeholder: "0"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                        createVNode(unref(_sfc_main$8), null, {
                          default: withCtx(() => [
                            createTextVNode("Informasi Pengiriman")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$9), null, {
                          default: withCtx(() => [
                            createTextVNode("Berat dan dimensi untuk pengiriman")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$a), { class: "space-y-4" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "grid grid-cols-4 gap-4" }, [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$b), { for: "weight_gram" }, {
                              default: withCtx(() => [
                                createTextVNode("Berat (gram) "),
                                createVNode("span", { class: "text-destructive" }, "*")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), {
                              id: "weight_gram",
                              modelValue: form.value.weight_gram,
                              "onUpdate:modelValue": ($event) => form.value.weight_gram = $event,
                              modelModifiers: { number: true },
                              type: "number",
                              min: "0",
                              placeholder: "0",
                              class: { "border-destructive": errors.value.weight_gram },
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            errors.value.weight_gram ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(errors.value.weight_gram), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$b), { for: "length_mm" }, {
                              default: withCtx(() => [
                                createTextVNode("Panjang (mm)")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), {
                              id: "length_mm",
                              modelValue: form.value.length_mm,
                              "onUpdate:modelValue": ($event) => form.value.length_mm = $event,
                              modelModifiers: { number: true },
                              type: "number",
                              min: "0",
                              placeholder: "0"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$b), { for: "width_mm" }, {
                              default: withCtx(() => [
                                createTextVNode("Lebar (mm)")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), {
                              id: "width_mm",
                              modelValue: form.value.width_mm,
                              "onUpdate:modelValue": ($event) => form.value.width_mm = $event,
                              modelModifiers: { number: true },
                              type: "number",
                              min: "0",
                              placeholder: "0"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$b), { for: "height_mm" }, {
                              default: withCtx(() => [
                                createTextVNode("Tinggi (mm)")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), {
                              id: "height_mm",
                              modelValue: form.value.height_mm,
                              "onUpdate:modelValue": ($event) => form.value.height_mm = $event,
                              modelModifiers: { number: true },
                              type: "number",
                              min: "0",
                              placeholder: "0"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
            _push2(ssrRenderComponent(unref(_sfc_main$6), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$7), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$8), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Gambar Produk`);
                            } else {
                              return [
                                createTextVNode("Gambar Produk")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$9), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Upload gambar produk (maksimal 10 gambar)`);
                            } else {
                              return [
                                createTextVNode("Upload gambar produk (maksimal 10 gambar)")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              createTextVNode("Gambar Produk")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$9), null, {
                            default: withCtx(() => [
                              createTextVNode("Upload gambar produk (maksimal 10 gambar)")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$a), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$f, {
                          modelValue: form.value.images,
                          "onUpdate:modelValue": ($event) => form.value.images = $event,
                          "max-images": 10
                        }, null, _parent4, _scopeId3));
                        if (errors.value.images) {
                          _push4(`<p class="mt-2 text-sm text-destructive"${_scopeId3}>${ssrInterpolate(errors.value.images)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode(_sfc_main$f, {
                            modelValue: form.value.images,
                            "onUpdate:modelValue": ($event) => form.value.images = $event,
                            "max-images": 10
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          errors.value.images ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "mt-2 text-sm text-destructive"
                          }, toDisplayString(errors.value.images), 1)) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$7), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$8), null, {
                          default: withCtx(() => [
                            createTextVNode("Gambar Produk")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$9), null, {
                          default: withCtx(() => [
                            createTextVNode("Upload gambar produk (maksimal 10 gambar)")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$a), null, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$f, {
                          modelValue: form.value.images,
                          "onUpdate:modelValue": ($event) => form.value.images = $event,
                          "max-images": 10
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        errors.value.images ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-2 text-sm text-destructive"
                        }, toDisplayString(errors.value.images), 1)) : createCommentVNode("", true)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$6), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$7), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$8), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Kategori &amp; Status`);
                            } else {
                              return [
                                createTextVNode("Kategori & Status")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$9), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Pilih kategori produk dan status aktif`);
                            } else {
                              return [
                                createTextVNode("Pilih kategori produk dan status aktif")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              createTextVNode("Kategori & Status")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$9), null, {
                            default: withCtx(() => [
                              createTextVNode("Pilih kategori produk dan status aktif")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$a), { class: "space-y-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$b), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Kategori`);
                            } else {
                              return [
                                createTextVNode("Kategori")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<div class="grid grid-cols-3 gap-2"${_scopeId3}><!--[-->`);
                        ssrRenderList(__props.categories, (category) => {
                          _push4(`<label class="${ssrRenderClass([{ "bg-accent": form.value.categories.includes(category.id) }, "flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-accent transition-colors"])}"${_scopeId3}>`);
                          _push4(ssrRenderComponent(unref(_sfc_main$g), {
                            "model-value": form.value.categories.includes(category.id),
                            "onUpdate:modelValue": (checked) => {
                              if (checked) {
                                form.value.categories.push(category.id);
                              } else {
                                form.value.categories = form.value.categories.filter((id) => id !== category.id);
                              }
                            }
                          }, null, _parent4, _scopeId3));
                          _push4(`<span class="text-sm"${_scopeId3}>${ssrInterpolate(category.name)}</span></label>`);
                        });
                        _push4(`<!--]--></div></div><div class="flex items-center gap-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$g), {
                          id: "is_active",
                          "model-value": form.value.is_active,
                          "onUpdate:modelValue": (value) => form.value.is_active = !!value
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$b), {
                          for: "is_active",
                          class: "cursor-pointer"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Produk Aktif`);
                            } else {
                              return [
                                createTextVNode("Produk Aktif")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$b), null, {
                              default: withCtx(() => [
                                createTextVNode("Kategori")
                              ]),
                              _: 1
                            }),
                            createVNode("div", { class: "grid grid-cols-3 gap-2" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (category) => {
                                return openBlock(), createBlock("label", {
                                  key: category.id,
                                  class: ["flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-accent transition-colors", { "bg-accent": form.value.categories.includes(category.id) }]
                                }, [
                                  createVNode(unref(_sfc_main$g), {
                                    "model-value": form.value.categories.includes(category.id),
                                    "onUpdate:modelValue": (checked) => {
                                      if (checked) {
                                        form.value.categories.push(category.id);
                                      } else {
                                        form.value.categories = form.value.categories.filter((id) => id !== category.id);
                                      }
                                    }
                                  }, null, 8, ["model-value", "onUpdate:modelValue"]),
                                  createVNode("span", { class: "text-sm" }, toDisplayString(category.name), 1)
                                ], 2);
                              }), 128))
                            ])
                          ]),
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode(unref(_sfc_main$g), {
                              id: "is_active",
                              "model-value": form.value.is_active,
                              "onUpdate:modelValue": (value) => form.value.is_active = !!value
                            }, null, 8, ["model-value", "onUpdate:modelValue"]),
                            createVNode(unref(_sfc_main$b), {
                              for: "is_active",
                              class: "cursor-pointer"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Produk Aktif")
                              ]),
                              _: 1
                            })
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
                        createVNode(unref(_sfc_main$8), null, {
                          default: withCtx(() => [
                            createTextVNode("Kategori & Status")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$9), null, {
                          default: withCtx(() => [
                            createTextVNode("Pilih kategori produk dan status aktif")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$a), { class: "space-y-4" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$b), null, {
                            default: withCtx(() => [
                              createTextVNode("Kategori")
                            ]),
                            _: 1
                          }),
                          createVNode("div", { class: "grid grid-cols-3 gap-2" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (category) => {
                              return openBlock(), createBlock("label", {
                                key: category.id,
                                class: ["flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-accent transition-colors", { "bg-accent": form.value.categories.includes(category.id) }]
                              }, [
                                createVNode(unref(_sfc_main$g), {
                                  "model-value": form.value.categories.includes(category.id),
                                  "onUpdate:modelValue": (checked) => {
                                    if (checked) {
                                      form.value.categories.push(category.id);
                                    } else {
                                      form.value.categories = form.value.categories.filter((id) => id !== category.id);
                                    }
                                  }
                                }, null, 8, ["model-value", "onUpdate:modelValue"]),
                                createVNode("span", { class: "text-sm" }, toDisplayString(category.name), 1)
                              ], 2);
                            }), 128))
                          ])
                        ]),
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode(unref(_sfc_main$g), {
                            id: "is_active",
                            "model-value": form.value.is_active,
                            "onUpdate:modelValue": (value) => form.value.is_active = !!value
                          }, null, 8, ["model-value", "onUpdate:modelValue"]),
                          createVNode(unref(_sfc_main$b), {
                            for: "is_active",
                            class: "cursor-pointer"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Produk Aktif")
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="flex justify-end gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              type: "button",
              variant: "outline",
              onClick: ($event) => unref(router).visit("/admin/products"),
              disabled: loading.value
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Batal `);
                } else {
                  return [
                    createTextVNode(" Batal ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              type: "submit",
              disabled: loading.value
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(loading.value ? "Menyimpan..." : "Tambah Produk")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(loading.value ? "Menyimpan..." : "Tambah Produk"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form></div>`);
          } else {
            return [
              createVNode("div", { class: "rounded-xl p-4 space-y-6 py-6" }, [
                createVNode("div", { class: "flex items-center gap-4" }, [
                  createVNode(unref(_sfc_main$2), {
                    variant: "outline",
                    size: "icon",
                    onClick: ($event) => unref(router).visit("/admin/products")
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(ArrowLeft), { class: "h-4 w-4" })
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode("div", null, [
                    createVNode("h1", { class: "text-3xl font-bold tracking-tight" }, "Tambah Produk"),
                    createVNode("p", { class: "text-muted-foreground" }, "Tambahkan produk baru ke katalog")
                  ])
                ]),
                createVNode(Transition, {
                  "enter-active-class": "transition ease-out duration-300",
                  "enter-from-class": "opacity-0 transform -translate-y-2",
                  "enter-to-class": "opacity-100 transform translate-y-0",
                  "leave-active-class": "transition ease-in duration-200",
                  "leave-from-class": "opacity-100 transform translate-y-0",
                  "leave-to-class": "opacity-0 transform -translate-y-2"
                }, {
                  default: withCtx(() => [
                    alertMessage.value ? (openBlock(), createBlock(unref(_sfc_main$3), {
                      key: 0,
                      variant: alertMessage.value.type === "error" ? "destructive" : "default",
                      class: {
                        "border-green-500 bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200": alertMessage.value.type === "success",
                        "border-yellow-500 bg-yellow-50 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200": alertMessage.value.type === "warning",
                        "border-blue-500 bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-200": alertMessage.value.type === "info"
                      }
                    }, {
                      default: withCtx(() => [
                        alertMessage.value.type === "success" ? (openBlock(), createBlock(unref(CheckCircle2), {
                          key: 0,
                          class: "h-4 w-4 text-green-600 dark:text-green-400"
                        })) : alertMessage.value.type === "error" ? (openBlock(), createBlock(unref(XCircle), {
                          key: 1,
                          class: "h-4 w-4"
                        })) : alertMessage.value.type === "warning" ? (openBlock(), createBlock(unref(AlertCircle), {
                          key: 2,
                          class: "h-4 w-4 text-yellow-600 dark:text-yellow-400"
                        })) : (openBlock(), createBlock(unref(Info), {
                          key: 3,
                          class: "h-4 w-4 text-blue-600 dark:text-blue-400"
                        })),
                        createVNode(unref(_sfc_main$4), { class: "flex items-center justify-between" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(alertMessage.value.title) + " ", 1),
                            createVNode(unref(_sfc_main$2), {
                              variant: "ghost",
                              size: "sm",
                              class: "h-6 w-6 p-0 hover:bg-transparent",
                              onClick: dismissAlert
                            }, {
                              default: withCtx(() => [
                                createVNode("span", { class: "sr-only" }, "Tutup"),
                                createTextVNode(" × ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(alertMessage.value.message), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["variant", "class"])) : createCommentVNode("", true)
                  ]),
                  _: 1
                }),
                createVNode(Transition, {
                  "enter-active-class": "transition ease-out duration-300",
                  "enter-from-class": "opacity-0",
                  "enter-to-class": "opacity-100",
                  "leave-active-class": "transition ease-in duration-200",
                  "leave-from-class": "opacity-100",
                  "leave-to-class": "opacity-0"
                }, {
                  default: withCtx(() => [
                    hasErrors.value && errorList.value.length > 1 ? (openBlock(), createBlock(unref(_sfc_main$3), {
                      key: 0,
                      variant: "destructive",
                      class: "mb-4"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(XCircle), { class: "h-4 w-4" }),
                        createVNode(unref(_sfc_main$4), null, {
                          default: withCtx(() => [
                            createTextVNode("Terdapat " + toDisplayString(errorList.value.length) + " Kesalahan", 1)
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createVNode("ul", { class: "mt-2 list-disc list-inside space-y-1" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(errorList.value, (error, index) => {
                                return openBlock(), createBlock("li", {
                                  key: index,
                                  class: "text-sm"
                                }, [
                                  createVNode("strong", null, toDisplayString(error.field) + ":", 1),
                                  createTextVNode(" " + toDisplayString(error.message), 1)
                                ]);
                              }), 128))
                            ])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
                  ]),
                  _: 1
                }),
                createVNode("form", {
                  onSubmit: withModifiers(submit, ["prevent"]),
                  class: "space-y-6 w-full grid grid-cols-2 gap-4"
                }, [
                  createVNode(unref(_sfc_main$6), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$7), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              createTextVNode("Informasi Dasar")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$9), null, {
                            default: withCtx(() => [
                              createTextVNode("Informasi utama produk")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$a), { class: "space-y-4" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$b), { for: "sku" }, {
                                default: withCtx(() => [
                                  createTextVNode("SKU "),
                                  createVNode("span", { class: "text-destructive" }, "*")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), {
                                id: "sku",
                                modelValue: form.value.sku,
                                "onUpdate:modelValue": ($event) => form.value.sku = $event,
                                placeholder: "SKU-001",
                                class: { "border-destructive": errors.value.sku },
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              errors.value.sku ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(errors.value.sku), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$b), { for: "slug" }, {
                                default: withCtx(() => [
                                  createTextVNode("Slug "),
                                  createVNode("span", { class: "text-destructive" }, "*")
                                ]),
                                _: 1
                              }),
                              createVNode("div", { class: "flex gap-2" }, [
                                createVNode(unref(_sfc_main$c), {
                                  id: "slug",
                                  modelValue: form.value.slug,
                                  "onUpdate:modelValue": ($event) => form.value.slug = $event,
                                  placeholder: "product-slug",
                                  class: { "border-destructive": errors.value.slug },
                                  required: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                                createVNode(unref(_sfc_main$2), {
                                  type: "button",
                                  variant: "outline",
                                  onClick: generateSlug,
                                  disabled: !form.value.name.trim(),
                                  title: !form.value.name.trim() ? "Masukkan nama produk terlebih dahulu" : "Generate slug dari nama produk"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Generate ")
                                  ]),
                                  _: 1
                                }, 8, ["disabled", "title"])
                              ]),
                              errors.value.slug ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(errors.value.slug), 1)) : createCommentVNode("", true)
                            ])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$b), { for: "name" }, {
                              default: withCtx(() => [
                                createTextVNode("Nama Produk "),
                                createVNode("span", { class: "text-destructive" }, "*")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), {
                              id: "name",
                              modelValue: form.value.name,
                              "onUpdate:modelValue": ($event) => form.value.name = $event,
                              placeholder: "Nama produk",
                              class: { "border-destructive": errors.value.name },
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, ' Slug akan otomatis dibuat saat Anda klik tombol "Generate" pada field Slug '),
                            errors.value.name ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(errors.value.name), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$b), { for: "brand" }, {
                              default: withCtx(() => [
                                createTextVNode("Brand")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$c), {
                              id: "brand",
                              modelValue: form.value.brand,
                              "onUpdate:modelValue": ($event) => form.value.brand = $event,
                              placeholder: "Nama brand"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$b), { for: "short_desc" }, {
                              default: withCtx(() => [
                                createTextVNode("Deskripsi Singkat")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$d), {
                              id: "short_desc",
                              modelValue: form.value.short_desc,
                              "onUpdate:modelValue": ($event) => form.value.short_desc = $event,
                              placeholder: "Deskripsi singkat produk",
                              rows: "2"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$b), { for: "long_desc" }, {
                              default: withCtx(() => [
                                createTextVNode("Deskripsi Lengkap")
                              ]),
                              _: 1
                            }),
                            createVNode(_sfc_main$e, {
                              modelValue: form.value.long_desc,
                              "onUpdate:modelValue": ($event) => form.value.long_desc = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$6), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$7), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              createTextVNode("Harga & Stok")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$9), null, {
                            default: withCtx(() => [
                              createTextVNode("Informasi harga dan ketersediaan")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$a), { class: "space-y-4" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "grid grid-cols-3 gap-4" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$b), { for: "base_price" }, {
                                default: withCtx(() => [
                                  createTextVNode("Harga (IDR) "),
                                  createVNode("span", { class: "text-destructive" }, "*")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), {
                                id: "base_price",
                                modelValue: form.value.base_price,
                                "onUpdate:modelValue": ($event) => form.value.base_price = $event,
                                modelModifiers: { number: true },
                                type: "number",
                                min: "0",
                                step: "0.01",
                                placeholder: "0",
                                class: { "border-destructive": errors.value.base_price },
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              errors.value.base_price ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(errors.value.base_price), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$b), { for: "stock" }, {
                                default: withCtx(() => [
                                  createTextVNode("Stok "),
                                  createVNode("span", { class: "text-destructive" }, "*")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), {
                                id: "stock",
                                modelValue: form.value.stock,
                                "onUpdate:modelValue": ($event) => form.value.stock = $event,
                                modelModifiers: { number: true },
                                type: "number",
                                min: "0",
                                placeholder: "0",
                                class: { "border-destructive": errors.value.stock },
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              errors.value.stock ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(errors.value.stock), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$b), { for: "warranty_months" }, {
                                default: withCtx(() => [
                                  createTextVNode("Garansi (Bulan)")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), {
                                id: "warranty_months",
                                modelValue: form.value.warranty_months,
                                "onUpdate:modelValue": ($event) => form.value.warranty_months = $event,
                                modelModifiers: { number: true },
                                type: "number",
                                min: "0",
                                placeholder: "0"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ])
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$6), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$7), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              createTextVNode("Bonus & Komisi")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$9), null, {
                            default: withCtx(() => [
                              createTextVNode("Pengaturan bonus untuk sistem MLM")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$a), { class: "space-y-4" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$b), { for: "bv" }, {
                                default: withCtx(() => [
                                  createTextVNode("Business Value (BV)")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), {
                                id: "bv",
                                modelValue: form.value.bv,
                                "onUpdate:modelValue": ($event) => form.value.bv = $event,
                                modelModifiers: { number: true },
                                type: "number",
                                min: "0",
                                step: "0.01",
                                placeholder: "0"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$b), { for: "b_sponsor" }, {
                                default: withCtx(() => [
                                  createTextVNode("Bonus Sponsor")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), {
                                id: "b_sponsor",
                                modelValue: form.value.b_sponsor,
                                "onUpdate:modelValue": ($event) => form.value.b_sponsor = $event,
                                modelModifiers: { number: true },
                                type: "number",
                                min: "0",
                                step: "0.01",
                                placeholder: "0"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$b), { for: "b_matching" }, {
                                default: withCtx(() => [
                                  createTextVNode("Bonus Matching")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), {
                                id: "b_matching",
                                modelValue: form.value.b_matching,
                                "onUpdate:modelValue": ($event) => form.value.b_matching = $event,
                                modelModifiers: { number: true },
                                type: "number",
                                min: "0",
                                step: "0.01",
                                placeholder: "0"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$b), { for: "b_pairing" }, {
                                default: withCtx(() => [
                                  createTextVNode("Bonus Pairing")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), {
                                id: "b_pairing",
                                modelValue: form.value.b_pairing,
                                "onUpdate:modelValue": ($event) => form.value.b_pairing = $event,
                                modelModifiers: { number: true },
                                type: "number",
                                min: "0",
                                step: "0.01",
                                placeholder: "0"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$b), { for: "b_cashback" }, {
                                default: withCtx(() => [
                                  createTextVNode("Bonus Cashback")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), {
                                id: "b_cashback",
                                modelValue: form.value.b_cashback,
                                "onUpdate:modelValue": ($event) => form.value.b_cashback = $event,
                                modelModifiers: { number: true },
                                type: "number",
                                min: "0",
                                step: "0.01",
                                placeholder: "0"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$b), { for: "b_retail" }, {
                                default: withCtx(() => [
                                  createTextVNode("Bonus Retail")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), {
                                id: "b_retail",
                                modelValue: form.value.b_retail,
                                "onUpdate:modelValue": ($event) => form.value.b_retail = $event,
                                modelModifiers: { number: true },
                                type: "number",
                                min: "0",
                                step: "0.01",
                                placeholder: "0"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ])
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$6), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$7), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              createTextVNode("Informasi Pengiriman")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$9), null, {
                            default: withCtx(() => [
                              createTextVNode("Berat dan dimensi untuk pengiriman")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$a), { class: "space-y-4" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "grid grid-cols-4 gap-4" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$b), { for: "weight_gram" }, {
                                default: withCtx(() => [
                                  createTextVNode("Berat (gram) "),
                                  createVNode("span", { class: "text-destructive" }, "*")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), {
                                id: "weight_gram",
                                modelValue: form.value.weight_gram,
                                "onUpdate:modelValue": ($event) => form.value.weight_gram = $event,
                                modelModifiers: { number: true },
                                type: "number",
                                min: "0",
                                placeholder: "0",
                                class: { "border-destructive": errors.value.weight_gram },
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              errors.value.weight_gram ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(errors.value.weight_gram), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$b), { for: "length_mm" }, {
                                default: withCtx(() => [
                                  createTextVNode("Panjang (mm)")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), {
                                id: "length_mm",
                                modelValue: form.value.length_mm,
                                "onUpdate:modelValue": ($event) => form.value.length_mm = $event,
                                modelModifiers: { number: true },
                                type: "number",
                                min: "0",
                                placeholder: "0"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$b), { for: "width_mm" }, {
                                default: withCtx(() => [
                                  createTextVNode("Lebar (mm)")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), {
                                id: "width_mm",
                                modelValue: form.value.width_mm,
                                "onUpdate:modelValue": ($event) => form.value.width_mm = $event,
                                modelModifiers: { number: true },
                                type: "number",
                                min: "0",
                                placeholder: "0"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$b), { for: "height_mm" }, {
                                default: withCtx(() => [
                                  createTextVNode("Tinggi (mm)")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), {
                                id: "height_mm",
                                modelValue: form.value.height_mm,
                                "onUpdate:modelValue": ($event) => form.value.height_mm = $event,
                                modelModifiers: { number: true },
                                type: "number",
                                min: "0",
                                placeholder: "0"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ])
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$6), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$7), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              createTextVNode("Gambar Produk")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$9), null, {
                            default: withCtx(() => [
                              createTextVNode("Upload gambar produk (maksimal 10 gambar)")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$a), null, {
                        default: withCtx(() => [
                          createVNode(_sfc_main$f, {
                            modelValue: form.value.images,
                            "onUpdate:modelValue": ($event) => form.value.images = $event,
                            "max-images": 10
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          errors.value.images ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "mt-2 text-sm text-destructive"
                          }, toDisplayString(errors.value.images), 1)) : createCommentVNode("", true)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$6), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$7), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              createTextVNode("Kategori & Status")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$9), null, {
                            default: withCtx(() => [
                              createTextVNode("Pilih kategori produk dan status aktif")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$a), { class: "space-y-4" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$b), null, {
                              default: withCtx(() => [
                                createTextVNode("Kategori")
                              ]),
                              _: 1
                            }),
                            createVNode("div", { class: "grid grid-cols-3 gap-2" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (category) => {
                                return openBlock(), createBlock("label", {
                                  key: category.id,
                                  class: ["flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-accent transition-colors", { "bg-accent": form.value.categories.includes(category.id) }]
                                }, [
                                  createVNode(unref(_sfc_main$g), {
                                    "model-value": form.value.categories.includes(category.id),
                                    "onUpdate:modelValue": (checked) => {
                                      if (checked) {
                                        form.value.categories.push(category.id);
                                      } else {
                                        form.value.categories = form.value.categories.filter((id) => id !== category.id);
                                      }
                                    }
                                  }, null, 8, ["model-value", "onUpdate:modelValue"]),
                                  createVNode("span", { class: "text-sm" }, toDisplayString(category.name), 1)
                                ], 2);
                              }), 128))
                            ])
                          ]),
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode(unref(_sfc_main$g), {
                              id: "is_active",
                              "model-value": form.value.is_active,
                              "onUpdate:modelValue": (value) => form.value.is_active = !!value
                            }, null, 8, ["model-value", "onUpdate:modelValue"]),
                            createVNode(unref(_sfc_main$b), {
                              for: "is_active",
                              class: "cursor-pointer"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Produk Aktif")
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "flex justify-end gap-4" }, [
                    createVNode(unref(_sfc_main$2), {
                      type: "button",
                      variant: "outline",
                      onClick: ($event) => unref(router).visit("/admin/products"),
                      disabled: loading.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Batal ")
                      ]),
                      _: 1
                    }, 8, ["onClick", "disabled"]),
                    createVNode(unref(_sfc_main$2), {
                      type: "submit",
                      disabled: loading.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(loading.value ? "Menyimpan..." : "Tambah Produk"), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Products/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
