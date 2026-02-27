import { defineComponent, mergeModels, useModel, computed, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, Fragment, withModifiers, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderSlot } from "vue/server-renderer";
import { _ as _sfc_main$f, c as cn } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, d as _sfc_main$4, c as _sfc_main$5 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$d, a as _sfc_main$e, b as _sfc_main$g, c as _sfc_main$h, d as _sfc_main$i, e as _sfc_main$j, f as _sfc_main$k, g as _sfc_main$l, h as _sfc_main$m } from "./PopoverTrigger-D0RWxIr3.js";
import { _ as _sfc_main$7 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$6 } from "./Label-16aMY2sx.js";
import { _ as _sfc_main$8, a as _sfc_main$9, b as _sfc_main$a, c as _sfc_main$b, d as _sfc_main$c } from "./SelectValue-BUnv4mQg.js";
import { _ as _sfc_main$n } from "./Textarea-pcFPh_uS.js";
import { ChevronsUpDown, Check, Loader2 } from "lucide-vue-next";
import { useForm } from "@inertiajs/vue3";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CustomerForm",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    mode: {},
    provinces: {},
    cities: {},
    sponsors: {},
    loadingProvinces: { type: Boolean },
    loadingCities: { type: Boolean }
  }, {
    "form": {
      required: true
    },
    "formModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["submit"], ["update:form"]),
  setup(__props, { emit: __emit }) {
    const props = __props;
    const form = useModel(__props, "form");
    const isCreateMode = computed(() => props.mode === "create");
    const selectedProvinceLabel = computed(() => {
      return props.provinces.find(
        (province) => province.id === form.value.province_id
      )?.name;
    });
    const selectedCityLabel = computed(() => {
      return props.cities.find((city) => city.id === form.value.city_id)?.name;
    });
    const sponsorComboboxOpen = ref(false);
    const customerStatusLabel = computed(() => {
      if (form.value.status === "1") {
        return "Prospek";
      }
      if (form.value.status === "2") {
        return "Pasif";
      }
      if (form.value.status === "3") {
        return "Aktif";
      }
      return "-";
    });
    const selectedSponsor = computed(() => {
      if (form.value.sponsor_id === null) {
        return null;
      }
      return props.sponsors.find(
        (sponsor) => sponsor.id === form.value.sponsor_id
      ) ?? null;
    });
    const selectedSponsorLabel = computed(() => {
      if (!selectedSponsor.value) {
        return "Pilih sponsor berdasarkan username";
      }
      const username = selectedSponsor.value.username ? `@${selectedSponsor.value.username}` : `ID ${selectedSponsor.value.id}`;
      return `${username} - ${selectedSponsor.value.name}`;
    });
    const getSponsorSearchValue = (sponsor) => {
      return [
        sponsor.id.toString(),
        sponsor.username ?? "",
        sponsor.name,
        sponsor.email ?? "",
        sponsor.phone ?? "",
        sponsor.ewallet_id ?? ""
      ].join(" ").trim();
    };
    const getSponsorMeta = (sponsor) => {
      const details = [sponsor.email, sponsor.phone, sponsor.ewallet_id].filter(
        (value) => Boolean(value)
      );
      return details.join(" • ");
    };
    const selectSponsor = (sponsorId) => {
      form.value.sponsor_id = sponsorId;
      sponsorComboboxOpen.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<form${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Data Utama Pelanggan`);
                      } else {
                        return [
                          createTextVNode("Data Utama Pelanggan")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Lengkapi data identitas secara akurat. Field bertanda <span class="font-medium"${_scopeId3}>*</span> wajib diisi. `);
                      } else {
                        return [
                          createTextVNode(" Lengkapi data identitas secara akurat. Field bertanda "),
                          createVNode("span", { class: "font-medium" }, "*"),
                          createTextVNode(" wajib diisi. ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Data Utama Pelanggan")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createTextVNode(" Lengkapi data identitas secara akurat. Field bertanda "),
                        createVNode("span", { class: "font-medium" }, "*"),
                        createTextVNode(" wajib diisi. ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$5), { class: "space-y-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid gap-4 md:grid-cols-2"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "name" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Nama Lengkap *`);
                      } else {
                        return [
                          createTextVNode("Nama Lengkap *")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    id: "name",
                    modelValue: form.value.name,
                    "onUpdate:modelValue": ($event) => form.value.name = $event,
                    placeholder: "Masukkan nama lengkap",
                    class: {
                      "border-destructive": form.value.errors.name
                    },
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`<p class="text-xs text-muted-foreground"${_scopeId2}> Gunakan nama sesuai identitas resmi pelanggan. </p>`);
                  if (form.value.errors.name) {
                    _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(form.value.errors.name)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "username" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Username *`);
                      } else {
                        return [
                          createTextVNode("Username *")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    id: "username",
                    modelValue: form.value.username,
                    "onUpdate:modelValue": ($event) => form.value.username = $event,
                    placeholder: "contoh: budi_santoso",
                    class: {
                      "border-destructive": form.value.errors.username
                    },
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`<p class="text-xs text-muted-foreground"${_scopeId2}> Username dipakai untuk login dan harus unik. </p>`);
                  if (form.value.errors.username) {
                    _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(form.value.errors.username)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "nik" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`NIK *`);
                      } else {
                        return [
                          createTextVNode("NIK *")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    id: "nik",
                    modelValue: form.value.nik,
                    "onUpdate:modelValue": ($event) => form.value.nik = $event,
                    inputmode: "numeric",
                    maxlength: "32",
                    placeholder: "Contoh: 3174xxxxxxxxxxxx",
                    class: {
                      "border-destructive": form.value.errors.nik
                    },
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`<p class="text-xs text-muted-foreground"${_scopeId2}> NIK berisi angka 8 sampai 32 digit. </p>`);
                  if (form.value.errors.nik) {
                    _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(form.value.errors.nik)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "gender" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Jenis Kelamin`);
                      } else {
                        return [
                          createTextVNode("Jenis Kelamin")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$8), {
                    modelValue: form.value.gender,
                    "onUpdate:modelValue": ($event) => form.value.gender = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          id: "gender",
                          class: {
                            "border-destructive": form.value.errors.gender
                          }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$a), { placeholder: "Pilih jenis kelamin" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$a), { placeholder: "Pilih jenis kelamin" })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$b), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$c), { value: "laki-laki" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Laki-laki`);
                                  } else {
                                    return [
                                      createTextVNode("Laki-laki")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), { value: "perempuan" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Perempuan`);
                                  } else {
                                    return [
                                      createTextVNode("Perempuan")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$c), { value: "laki-laki" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Laki-laki")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), { value: "perempuan" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Perempuan")
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
                          createVNode(unref(_sfc_main$9), {
                            id: "gender",
                            class: {
                              "border-destructive": form.value.errors.gender
                            }
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$a), { placeholder: "Pilih jenis kelamin" })
                            ]),
                            _: 1
                          }, 8, ["class"]),
                          createVNode(unref(_sfc_main$b), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$c), { value: "laki-laki" }, {
                                default: withCtx(() => [
                                  createTextVNode("Laki-laki")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), { value: "perempuan" }, {
                                default: withCtx(() => [
                                  createTextVNode("Perempuan")
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
                  _push3(`<p class="text-xs text-muted-foreground"${_scopeId2}> Pilih jenis kelamin sesuai data legal. </p>`);
                  if (form.value.errors.gender) {
                    _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(form.value.errors.gender)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "email" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Email *`);
                      } else {
                        return [
                          createTextVNode("Email *")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    id: "email",
                    modelValue: form.value.email,
                    "onUpdate:modelValue": ($event) => form.value.email = $event,
                    type: "email",
                    placeholder: "nama@email.com",
                    class: {
                      "border-destructive": form.value.errors.email
                    },
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`<p class="text-xs text-muted-foreground"${_scopeId2}> Email aktif untuk notifikasi akun pelanggan. </p>`);
                  if (form.value.errors.email) {
                    _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(form.value.errors.email)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "phone" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`No. Telepon *`);
                      } else {
                        return [
                          createTextVNode("No. Telepon *")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    id: "phone",
                    modelValue: form.value.phone,
                    "onUpdate:modelValue": ($event) => form.value.phone = $event,
                    inputmode: "tel",
                    placeholder: "08xxxxxxxxxx",
                    class: {
                      "border-destructive": form.value.errors.phone
                    },
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`<p class="text-xs text-muted-foreground"${_scopeId2}> Nomor aktif untuk komunikasi dan verifikasi. </p>`);
                  if (form.value.errors.phone) {
                    _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(form.value.errors.phone)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$6), { for: "name" }, {
                          default: withCtx(() => [
                            createTextVNode("Nama Lengkap *")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$7), {
                          id: "name",
                          modelValue: form.value.name,
                          "onUpdate:modelValue": ($event) => form.value.name = $event,
                          placeholder: "Masukkan nama lengkap",
                          class: {
                            "border-destructive": form.value.errors.name
                          },
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, " Gunakan nama sesuai identitas resmi pelanggan. "),
                        form.value.errors.name ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-destructive"
                        }, toDisplayString(form.value.errors.name), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$6), { for: "username" }, {
                          default: withCtx(() => [
                            createTextVNode("Username *")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$7), {
                          id: "username",
                          modelValue: form.value.username,
                          "onUpdate:modelValue": ($event) => form.value.username = $event,
                          placeholder: "contoh: budi_santoso",
                          class: {
                            "border-destructive": form.value.errors.username
                          },
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, " Username dipakai untuk login dan harus unik. "),
                        form.value.errors.username ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-destructive"
                        }, toDisplayString(form.value.errors.username), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$6), { for: "nik" }, {
                          default: withCtx(() => [
                            createTextVNode("NIK *")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$7), {
                          id: "nik",
                          modelValue: form.value.nik,
                          "onUpdate:modelValue": ($event) => form.value.nik = $event,
                          inputmode: "numeric",
                          maxlength: "32",
                          placeholder: "Contoh: 3174xxxxxxxxxxxx",
                          class: {
                            "border-destructive": form.value.errors.nik
                          },
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, " NIK berisi angka 8 sampai 32 digit. "),
                        form.value.errors.nik ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-destructive"
                        }, toDisplayString(form.value.errors.nik), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$6), { for: "gender" }, {
                          default: withCtx(() => [
                            createTextVNode("Jenis Kelamin")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), {
                          modelValue: form.value.gender,
                          "onUpdate:modelValue": ($event) => form.value.gender = $event
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$9), {
                              id: "gender",
                              class: {
                                "border-destructive": form.value.errors.gender
                              }
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$a), { placeholder: "Pilih jenis kelamin" })
                              ]),
                              _: 1
                            }, 8, ["class"]),
                            createVNode(unref(_sfc_main$b), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$c), { value: "laki-laki" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Laki-laki")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), { value: "perempuan" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Perempuan")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, " Pilih jenis kelamin sesuai data legal. "),
                        form.value.errors.gender ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-destructive"
                        }, toDisplayString(form.value.errors.gender), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$6), { for: "email" }, {
                          default: withCtx(() => [
                            createTextVNode("Email *")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$7), {
                          id: "email",
                          modelValue: form.value.email,
                          "onUpdate:modelValue": ($event) => form.value.email = $event,
                          type: "email",
                          placeholder: "nama@email.com",
                          class: {
                            "border-destructive": form.value.errors.email
                          },
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, " Email aktif untuk notifikasi akun pelanggan. "),
                        form.value.errors.email ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-destructive"
                        }, toDisplayString(form.value.errors.email), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$6), { for: "phone" }, {
                          default: withCtx(() => [
                            createTextVNode("No. Telepon *")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$7), {
                          id: "phone",
                          modelValue: form.value.phone,
                          "onUpdate:modelValue": ($event) => form.value.phone = $event,
                          inputmode: "tel",
                          placeholder: "08xxxxxxxxxx",
                          class: {
                            "border-destructive": form.value.errors.phone
                          },
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, " Nomor aktif untuk komunikasi dan verifikasi. "),
                        form.value.errors.phone ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-destructive"
                        }, toDisplayString(form.value.errors.phone), 1)) : createCommentVNode("", true)
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createTextVNode("Data Utama Pelanggan")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createTextVNode(" Lengkapi data identitas secara akurat. Field bertanda "),
                      createVNode("span", { class: "font-medium" }, "*"),
                      createTextVNode(" wajib diisi. ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), { class: "space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), { for: "name" }, {
                        default: withCtx(() => [
                          createTextVNode("Nama Lengkap *")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), {
                        id: "name",
                        modelValue: form.value.name,
                        "onUpdate:modelValue": ($event) => form.value.name = $event,
                        placeholder: "Masukkan nama lengkap",
                        class: {
                          "border-destructive": form.value.errors.name
                        },
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                      createVNode("p", { class: "text-xs text-muted-foreground" }, " Gunakan nama sesuai identitas resmi pelanggan. "),
                      form.value.errors.name ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-destructive"
                      }, toDisplayString(form.value.errors.name), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), { for: "username" }, {
                        default: withCtx(() => [
                          createTextVNode("Username *")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), {
                        id: "username",
                        modelValue: form.value.username,
                        "onUpdate:modelValue": ($event) => form.value.username = $event,
                        placeholder: "contoh: budi_santoso",
                        class: {
                          "border-destructive": form.value.errors.username
                        },
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                      createVNode("p", { class: "text-xs text-muted-foreground" }, " Username dipakai untuk login dan harus unik. "),
                      form.value.errors.username ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-destructive"
                      }, toDisplayString(form.value.errors.username), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), { for: "nik" }, {
                        default: withCtx(() => [
                          createTextVNode("NIK *")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), {
                        id: "nik",
                        modelValue: form.value.nik,
                        "onUpdate:modelValue": ($event) => form.value.nik = $event,
                        inputmode: "numeric",
                        maxlength: "32",
                        placeholder: "Contoh: 3174xxxxxxxxxxxx",
                        class: {
                          "border-destructive": form.value.errors.nik
                        },
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                      createVNode("p", { class: "text-xs text-muted-foreground" }, " NIK berisi angka 8 sampai 32 digit. "),
                      form.value.errors.nik ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-destructive"
                      }, toDisplayString(form.value.errors.nik), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), { for: "gender" }, {
                        default: withCtx(() => [
                          createTextVNode("Jenis Kelamin")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$8), {
                        modelValue: form.value.gender,
                        "onUpdate:modelValue": ($event) => form.value.gender = $event
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$9), {
                            id: "gender",
                            class: {
                              "border-destructive": form.value.errors.gender
                            }
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$a), { placeholder: "Pilih jenis kelamin" })
                            ]),
                            _: 1
                          }, 8, ["class"]),
                          createVNode(unref(_sfc_main$b), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$c), { value: "laki-laki" }, {
                                default: withCtx(() => [
                                  createTextVNode("Laki-laki")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), { value: "perempuan" }, {
                                default: withCtx(() => [
                                  createTextVNode("Perempuan")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode("p", { class: "text-xs text-muted-foreground" }, " Pilih jenis kelamin sesuai data legal. "),
                      form.value.errors.gender ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-destructive"
                      }, toDisplayString(form.value.errors.gender), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), { for: "email" }, {
                        default: withCtx(() => [
                          createTextVNode("Email *")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), {
                        id: "email",
                        modelValue: form.value.email,
                        "onUpdate:modelValue": ($event) => form.value.email = $event,
                        type: "email",
                        placeholder: "nama@email.com",
                        class: {
                          "border-destructive": form.value.errors.email
                        },
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                      createVNode("p", { class: "text-xs text-muted-foreground" }, " Email aktif untuk notifikasi akun pelanggan. "),
                      form.value.errors.email ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-destructive"
                      }, toDisplayString(form.value.errors.email), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), { for: "phone" }, {
                        default: withCtx(() => [
                          createTextVNode("No. Telepon *")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), {
                        id: "phone",
                        modelValue: form.value.phone,
                        "onUpdate:modelValue": ($event) => form.value.phone = $event,
                        inputmode: "tel",
                        placeholder: "08xxxxxxxxxx",
                        class: {
                          "border-destructive": form.value.errors.phone
                        },
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                      createVNode("p", { class: "text-xs text-muted-foreground" }, " Nomor aktif untuk komunikasi dan verifikasi. "),
                      form.value.errors.phone ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-destructive"
                      }, toDisplayString(form.value.errors.phone), 1)) : createCommentVNode("", true)
                    ])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Data Keanggotaan`);
                      } else {
                        return [
                          createTextVNode("Data Keanggotaan")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Informasi ini mengacu pada atribut keanggotaan di model customer. `);
                      } else {
                        return [
                          createTextVNode(" Informasi ini mengacu pada atribut keanggotaan di model customer. ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Data Keanggotaan")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createTextVNode(" Informasi ini mengacu pada atribut keanggotaan di model customer. ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$5), { class: "space-y-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid gap-4 md:grid-cols-2"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "status" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Status`);
                      } else {
                        return [
                          createTextVNode("Status")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (isCreateMode.value) {
                    _push3(`<!--[-->`);
                    _push3(ssrRenderComponent(unref(_sfc_main$8), {
                      modelValue: form.value.status,
                      "onUpdate:modelValue": ($event) => form.value.status = $event
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(_sfc_main$9), {
                            id: "status",
                            class: {
                              "border-destructive": form.value.errors.status
                            }
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(_sfc_main$a), { placeholder: "Pilih status customer" }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(_sfc_main$a), { placeholder: "Pilih status customer" })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$b), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(_sfc_main$c), { value: "1" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`Prospek`);
                                    } else {
                                      return [
                                        createTextVNode("Prospek")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(_sfc_main$c), { value: "2" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`Pasif`);
                                    } else {
                                      return [
                                        createTextVNode("Pasif")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(_sfc_main$c), { value: "3" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`Aktif`);
                                    } else {
                                      return [
                                        createTextVNode("Aktif")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(_sfc_main$c), { value: "1" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Prospek")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$c), { value: "2" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Pasif")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$c), { value: "3" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Aktif")
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
                            createVNode(unref(_sfc_main$9), {
                              id: "status",
                              class: {
                                "border-destructive": form.value.errors.status
                              }
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$a), { placeholder: "Pilih status customer" })
                              ]),
                              _: 1
                            }, 8, ["class"]),
                            createVNode(unref(_sfc_main$b), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$c), { value: "1" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Prospek")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), { value: "2" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Pasif")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), { value: "3" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Aktif")
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
                    if (form.value.errors.status) {
                      _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(form.value.errors.status)}</p>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<!--]-->`);
                  } else {
                    _push3(`<!--[-->`);
                    _push3(ssrRenderComponent(unref(_sfc_main$7), {
                      id: "status",
                      value: customerStatusLabel.value,
                      disabled: ""
                    }, null, _parent3, _scopeId2));
                    _push3(`<p class="text-xs text-muted-foreground"${_scopeId2}> Status hanya dapat diubah lewat proses bisnis aktivasi customer. </p><!--]-->`);
                  }
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "sponsor_id" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Sponsor`);
                      } else {
                        return [
                          createTextVNode("Sponsor")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$d), {
                    open: sponsorComboboxOpen.value,
                    "onUpdate:open": ($event) => sponsorComboboxOpen.value = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$e), { "as-child": "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$f), {
                                id: "sponsor_id",
                                variant: "outline",
                                role: "combobox",
                                "aria-label": "Pilih sponsor",
                                class: unref(cn)(
                                  "w-full justify-between font-normal",
                                  form.value.errors.sponsor_id && "border-destructive"
                                )
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<span class="truncate text-left"${_scopeId5}>${ssrInterpolate(selectedSponsorLabel.value)}</span>`);
                                    _push6(ssrRenderComponent(unref(ChevronsUpDown), { class: "ml-2 h-4 w-4 shrink-0 opacity-50" }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode("span", { class: "truncate text-left" }, toDisplayString(selectedSponsorLabel.value), 1),
                                      createVNode(unref(ChevronsUpDown), { class: "ml-2 h-4 w-4 shrink-0 opacity-50" })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$f), {
                                  id: "sponsor_id",
                                  variant: "outline",
                                  role: "combobox",
                                  "aria-label": "Pilih sponsor",
                                  class: unref(cn)(
                                    "w-full justify-between font-normal",
                                    form.value.errors.sponsor_id && "border-destructive"
                                  )
                                }, {
                                  default: withCtx(() => [
                                    createVNode("span", { class: "truncate text-left" }, toDisplayString(selectedSponsorLabel.value), 1),
                                    createVNode(unref(ChevronsUpDown), { class: "ml-2 h-4 w-4 shrink-0 opacity-50" })
                                  ]),
                                  _: 1
                                }, 8, ["class"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$g), {
                          align: "start",
                          class: "w-[--reka-popover-trigger-width] p-0"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$h), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$i), { placeholder: "Cari username sponsor..." }, null, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$j), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(unref(_sfc_main$k), null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Sponsor tidak ditemukan.`);
                                              } else {
                                                return [
                                                  createTextVNode("Sponsor tidak ditemukan.")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(unref(_sfc_main$l), { heading: "Daftar Sponsor" }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(unref(_sfc_main$m), {
                                                  value: "tanpa sponsor",
                                                  onSelect: ($event) => selectSponsor(null)
                                                }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(ssrRenderComponent(unref(Check), {
                                                        class: unref(cn)(
                                                          "mr-2 h-4 w-4",
                                                          form.value.sponsor_id === null ? "opacity-100" : "opacity-0"
                                                        )
                                                      }, null, _parent9, _scopeId8));
                                                      _push9(` Tanpa sponsor `);
                                                    } else {
                                                      return [
                                                        createVNode(unref(Check), {
                                                          class: unref(cn)(
                                                            "mr-2 h-4 w-4",
                                                            form.value.sponsor_id === null ? "opacity-100" : "opacity-0"
                                                          )
                                                        }, null, 8, ["class"]),
                                                        createTextVNode(" Tanpa sponsor ")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(`<!--[-->`);
                                                ssrRenderList(props.sponsors, (sponsor) => {
                                                  _push8(ssrRenderComponent(unref(_sfc_main$m), {
                                                    key: sponsor.id,
                                                    value: getSponsorSearchValue(
                                                      sponsor
                                                    ),
                                                    onSelect: ($event) => selectSponsor(sponsor.id)
                                                  }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(ssrRenderComponent(unref(Check), {
                                                          class: unref(cn)(
                                                            "mr-2 h-4 w-4",
                                                            form.value.sponsor_id === sponsor.id ? "opacity-100" : "opacity-0"
                                                          )
                                                        }, null, _parent9, _scopeId8));
                                                        _push9(`<div class="flex flex-col"${_scopeId8}><span class="font-medium"${_scopeId8}>${ssrInterpolate(sponsor.username ? `@${sponsor.username}` : `ID ${sponsor.id}`)}</span><span class="text-xs text-muted-foreground"${_scopeId8}>${ssrInterpolate(sponsor.name)} `);
                                                        if (getSponsorMeta(
                                                          sponsor
                                                        )) {
                                                          _push9(`<!--[--> • ${ssrInterpolate(getSponsorMeta(
                                                            sponsor
                                                          ))}<!--]-->`);
                                                        } else {
                                                          _push9(`<!---->`);
                                                        }
                                                        _push9(`</span></div>`);
                                                      } else {
                                                        return [
                                                          createVNode(unref(Check), {
                                                            class: unref(cn)(
                                                              "mr-2 h-4 w-4",
                                                              form.value.sponsor_id === sponsor.id ? "opacity-100" : "opacity-0"
                                                            )
                                                          }, null, 8, ["class"]),
                                                          createVNode("div", { class: "flex flex-col" }, [
                                                            createVNode("span", { class: "font-medium" }, toDisplayString(sponsor.username ? `@${sponsor.username}` : `ID ${sponsor.id}`), 1),
                                                            createVNode("span", { class: "text-xs text-muted-foreground" }, [
                                                              createTextVNode(toDisplayString(sponsor.name) + " ", 1),
                                                              getSponsorMeta(
                                                                sponsor
                                                              ) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                                                createTextVNode(" • " + toDisplayString(getSponsorMeta(
                                                                  sponsor
                                                                )), 1)
                                                              ], 64)) : createCommentVNode("", true)
                                                            ])
                                                          ])
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                });
                                                _push8(`<!--]-->`);
                                              } else {
                                                return [
                                                  createVNode(unref(_sfc_main$m), {
                                                    value: "tanpa sponsor",
                                                    onSelect: withModifiers(($event) => selectSponsor(null), ["prevent"])
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(Check), {
                                                        class: unref(cn)(
                                                          "mr-2 h-4 w-4",
                                                          form.value.sponsor_id === null ? "opacity-100" : "opacity-0"
                                                        )
                                                      }, null, 8, ["class"]),
                                                      createTextVNode(" Tanpa sponsor ")
                                                    ]),
                                                    _: 1
                                                  }, 8, ["onSelect"]),
                                                  (openBlock(true), createBlock(Fragment, null, renderList(props.sponsors, (sponsor) => {
                                                    return openBlock(), createBlock(unref(_sfc_main$m), {
                                                      key: sponsor.id,
                                                      value: getSponsorSearchValue(
                                                        sponsor
                                                      ),
                                                      onSelect: withModifiers(($event) => selectSponsor(sponsor.id), ["prevent"])
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(unref(Check), {
                                                          class: unref(cn)(
                                                            "mr-2 h-4 w-4",
                                                            form.value.sponsor_id === sponsor.id ? "opacity-100" : "opacity-0"
                                                          )
                                                        }, null, 8, ["class"]),
                                                        createVNode("div", { class: "flex flex-col" }, [
                                                          createVNode("span", { class: "font-medium" }, toDisplayString(sponsor.username ? `@${sponsor.username}` : `ID ${sponsor.id}`), 1),
                                                          createVNode("span", { class: "text-xs text-muted-foreground" }, [
                                                            createTextVNode(toDisplayString(sponsor.name) + " ", 1),
                                                            getSponsorMeta(
                                                              sponsor
                                                            ) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                                              createTextVNode(" • " + toDisplayString(getSponsorMeta(
                                                                sponsor
                                                              )), 1)
                                                            ], 64)) : createCommentVNode("", true)
                                                          ])
                                                        ])
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["value", "onSelect"]);
                                                  }), 128))
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(unref(_sfc_main$k), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Sponsor tidak ditemukan.")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$l), { heading: "Daftar Sponsor" }, {
                                              default: withCtx(() => [
                                                createVNode(unref(_sfc_main$m), {
                                                  value: "tanpa sponsor",
                                                  onSelect: withModifiers(($event) => selectSponsor(null), ["prevent"])
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(Check), {
                                                      class: unref(cn)(
                                                        "mr-2 h-4 w-4",
                                                        form.value.sponsor_id === null ? "opacity-100" : "opacity-0"
                                                      )
                                                    }, null, 8, ["class"]),
                                                    createTextVNode(" Tanpa sponsor ")
                                                  ]),
                                                  _: 1
                                                }, 8, ["onSelect"]),
                                                (openBlock(true), createBlock(Fragment, null, renderList(props.sponsors, (sponsor) => {
                                                  return openBlock(), createBlock(unref(_sfc_main$m), {
                                                    key: sponsor.id,
                                                    value: getSponsorSearchValue(
                                                      sponsor
                                                    ),
                                                    onSelect: withModifiers(($event) => selectSponsor(sponsor.id), ["prevent"])
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(Check), {
                                                        class: unref(cn)(
                                                          "mr-2 h-4 w-4",
                                                          form.value.sponsor_id === sponsor.id ? "opacity-100" : "opacity-0"
                                                        )
                                                      }, null, 8, ["class"]),
                                                      createVNode("div", { class: "flex flex-col" }, [
                                                        createVNode("span", { class: "font-medium" }, toDisplayString(sponsor.username ? `@${sponsor.username}` : `ID ${sponsor.id}`), 1),
                                                        createVNode("span", { class: "text-xs text-muted-foreground" }, [
                                                          createTextVNode(toDisplayString(sponsor.name) + " ", 1),
                                                          getSponsorMeta(
                                                            sponsor
                                                          ) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                                            createTextVNode(" • " + toDisplayString(getSponsorMeta(
                                                              sponsor
                                                            )), 1)
                                                          ], 64)) : createCommentVNode("", true)
                                                        ])
                                                      ])
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["value", "onSelect"]);
                                                }), 128))
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$i), { placeholder: "Cari username sponsor..." }),
                                      createVNode(unref(_sfc_main$j), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$k), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Sponsor tidak ditemukan.")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$l), { heading: "Daftar Sponsor" }, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$m), {
                                                value: "tanpa sponsor",
                                                onSelect: withModifiers(($event) => selectSponsor(null), ["prevent"])
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(Check), {
                                                    class: unref(cn)(
                                                      "mr-2 h-4 w-4",
                                                      form.value.sponsor_id === null ? "opacity-100" : "opacity-0"
                                                    )
                                                  }, null, 8, ["class"]),
                                                  createTextVNode(" Tanpa sponsor ")
                                                ]),
                                                _: 1
                                              }, 8, ["onSelect"]),
                                              (openBlock(true), createBlock(Fragment, null, renderList(props.sponsors, (sponsor) => {
                                                return openBlock(), createBlock(unref(_sfc_main$m), {
                                                  key: sponsor.id,
                                                  value: getSponsorSearchValue(
                                                    sponsor
                                                  ),
                                                  onSelect: withModifiers(($event) => selectSponsor(sponsor.id), ["prevent"])
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(Check), {
                                                      class: unref(cn)(
                                                        "mr-2 h-4 w-4",
                                                        form.value.sponsor_id === sponsor.id ? "opacity-100" : "opacity-0"
                                                      )
                                                    }, null, 8, ["class"]),
                                                    createVNode("div", { class: "flex flex-col" }, [
                                                      createVNode("span", { class: "font-medium" }, toDisplayString(sponsor.username ? `@${sponsor.username}` : `ID ${sponsor.id}`), 1),
                                                      createVNode("span", { class: "text-xs text-muted-foreground" }, [
                                                        createTextVNode(toDisplayString(sponsor.name) + " ", 1),
                                                        getSponsorMeta(
                                                          sponsor
                                                        ) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                                          createTextVNode(" • " + toDisplayString(getSponsorMeta(
                                                            sponsor
                                                          )), 1)
                                                        ], 64)) : createCommentVNode("", true)
                                                      ])
                                                    ])
                                                  ]),
                                                  _: 2
                                                }, 1032, ["value", "onSelect"]);
                                              }), 128))
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
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$h), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$i), { placeholder: "Cari username sponsor..." }),
                                    createVNode(unref(_sfc_main$j), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$k), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Sponsor tidak ditemukan.")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$l), { heading: "Daftar Sponsor" }, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$m), {
                                              value: "tanpa sponsor",
                                              onSelect: withModifiers(($event) => selectSponsor(null), ["prevent"])
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(Check), {
                                                  class: unref(cn)(
                                                    "mr-2 h-4 w-4",
                                                    form.value.sponsor_id === null ? "opacity-100" : "opacity-0"
                                                  )
                                                }, null, 8, ["class"]),
                                                createTextVNode(" Tanpa sponsor ")
                                              ]),
                                              _: 1
                                            }, 8, ["onSelect"]),
                                            (openBlock(true), createBlock(Fragment, null, renderList(props.sponsors, (sponsor) => {
                                              return openBlock(), createBlock(unref(_sfc_main$m), {
                                                key: sponsor.id,
                                                value: getSponsorSearchValue(
                                                  sponsor
                                                ),
                                                onSelect: withModifiers(($event) => selectSponsor(sponsor.id), ["prevent"])
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(Check), {
                                                    class: unref(cn)(
                                                      "mr-2 h-4 w-4",
                                                      form.value.sponsor_id === sponsor.id ? "opacity-100" : "opacity-0"
                                                    )
                                                  }, null, 8, ["class"]),
                                                  createVNode("div", { class: "flex flex-col" }, [
                                                    createVNode("span", { class: "font-medium" }, toDisplayString(sponsor.username ? `@${sponsor.username}` : `ID ${sponsor.id}`), 1),
                                                    createVNode("span", { class: "text-xs text-muted-foreground" }, [
                                                      createTextVNode(toDisplayString(sponsor.name) + " ", 1),
                                                      getSponsorMeta(
                                                        sponsor
                                                      ) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                                        createTextVNode(" • " + toDisplayString(getSponsorMeta(
                                                          sponsor
                                                        )), 1)
                                                      ], 64)) : createCommentVNode("", true)
                                                    ])
                                                  ])
                                                ]),
                                                _: 2
                                              }, 1032, ["value", "onSelect"]);
                                            }), 128))
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
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$e), { "as-child": "" }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$f), {
                                id: "sponsor_id",
                                variant: "outline",
                                role: "combobox",
                                "aria-label": "Pilih sponsor",
                                class: unref(cn)(
                                  "w-full justify-between font-normal",
                                  form.value.errors.sponsor_id && "border-destructive"
                                )
                              }, {
                                default: withCtx(() => [
                                  createVNode("span", { class: "truncate text-left" }, toDisplayString(selectedSponsorLabel.value), 1),
                                  createVNode(unref(ChevronsUpDown), { class: "ml-2 h-4 w-4 shrink-0 opacity-50" })
                                ]),
                                _: 1
                              }, 8, ["class"])
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$g), {
                            align: "start",
                            class: "w-[--reka-popover-trigger-width] p-0"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$h), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$i), { placeholder: "Cari username sponsor..." }),
                                  createVNode(unref(_sfc_main$j), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$k), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Sponsor tidak ditemukan.")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$l), { heading: "Daftar Sponsor" }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$m), {
                                            value: "tanpa sponsor",
                                            onSelect: withModifiers(($event) => selectSponsor(null), ["prevent"])
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(Check), {
                                                class: unref(cn)(
                                                  "mr-2 h-4 w-4",
                                                  form.value.sponsor_id === null ? "opacity-100" : "opacity-0"
                                                )
                                              }, null, 8, ["class"]),
                                              createTextVNode(" Tanpa sponsor ")
                                            ]),
                                            _: 1
                                          }, 8, ["onSelect"]),
                                          (openBlock(true), createBlock(Fragment, null, renderList(props.sponsors, (sponsor) => {
                                            return openBlock(), createBlock(unref(_sfc_main$m), {
                                              key: sponsor.id,
                                              value: getSponsorSearchValue(
                                                sponsor
                                              ),
                                              onSelect: withModifiers(($event) => selectSponsor(sponsor.id), ["prevent"])
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(Check), {
                                                  class: unref(cn)(
                                                    "mr-2 h-4 w-4",
                                                    form.value.sponsor_id === sponsor.id ? "opacity-100" : "opacity-0"
                                                  )
                                                }, null, 8, ["class"]),
                                                createVNode("div", { class: "flex flex-col" }, [
                                                  createVNode("span", { class: "font-medium" }, toDisplayString(sponsor.username ? `@${sponsor.username}` : `ID ${sponsor.id}`), 1),
                                                  createVNode("span", { class: "text-xs text-muted-foreground" }, [
                                                    createTextVNode(toDisplayString(sponsor.name) + " ", 1),
                                                    getSponsorMeta(
                                                      sponsor
                                                    ) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                                      createTextVNode(" • " + toDisplayString(getSponsorMeta(
                                                        sponsor
                                                      )), 1)
                                                    ], 64)) : createCommentVNode("", true)
                                                  ])
                                                ])
                                              ]),
                                              _: 2
                                            }, 1032, ["value", "onSelect"]);
                                          }), 128))
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
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<p class="text-xs text-muted-foreground"${_scopeId2}> Pilih sponsor dari data customer dan cari dengan username. </p>`);
                  if (form.value.errors.sponsor_id) {
                    _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(form.value.errors.sponsor_id)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "package_id" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Paket Membership`);
                      } else {
                        return [
                          createTextVNode("Paket Membership")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$8), {
                    modelValue: form.value.package_id,
                    "onUpdate:modelValue": ($event) => form.value.package_id = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          id: "package_id",
                          class: {
                            "border-destructive": form.value.errors.package_id
                          }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$a), { placeholder: "Pilih paket membership" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$a), { placeholder: "Pilih paket membership" })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$b), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$c), { value: "1" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`ZENNER Plus`);
                                  } else {
                                    return [
                                      createTextVNode("ZENNER Plus")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), { value: "2" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`ZENNER Prime`);
                                  } else {
                                    return [
                                      createTextVNode("ZENNER Prime")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), { value: "3" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`ZENNER Ultra`);
                                  } else {
                                    return [
                                      createTextVNode("ZENNER Ultra")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$c), { value: "1" }, {
                                  default: withCtx(() => [
                                    createTextVNode("ZENNER Plus")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), { value: "2" }, {
                                  default: withCtx(() => [
                                    createTextVNode("ZENNER Prime")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), { value: "3" }, {
                                  default: withCtx(() => [
                                    createTextVNode("ZENNER Ultra")
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
                          createVNode(unref(_sfc_main$9), {
                            id: "package_id",
                            class: {
                              "border-destructive": form.value.errors.package_id
                            }
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$a), { placeholder: "Pilih paket membership" })
                            ]),
                            _: 1
                          }, 8, ["class"]),
                          createVNode(unref(_sfc_main$b), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$c), { value: "1" }, {
                                default: withCtx(() => [
                                  createTextVNode("ZENNER Plus")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), { value: "2" }, {
                                default: withCtx(() => [
                                  createTextVNode("ZENNER Prime")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), { value: "3" }, {
                                default: withCtx(() => [
                                  createTextVNode("ZENNER Ultra")
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
                  _push3(`<p class="text-xs text-muted-foreground"${_scopeId2}> Anda dapat memilih paket sesuai kebutuhan customer. </p>`);
                  if (form.value.errors.package_id) {
                    _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(form.value.errors.package_id)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "level" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Level Customer`);
                      } else {
                        return [
                          createTextVNode("Level Customer")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$8), {
                    modelValue: form.value.level,
                    "onUpdate:modelValue": ($event) => form.value.level = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          id: "level",
                          class: {
                            "border-destructive": form.value.errors.level
                          }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$a), { placeholder: "Pilih level customer" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$a), { placeholder: "Pilih level customer" })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$b), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$c), { value: "Associate" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Associate`);
                                  } else {
                                    return [
                                      createTextVNode("Associate")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), { value: "Senior Associate" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Senior Associate`);
                                  } else {
                                    return [
                                      createTextVNode("Senior Associate")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), { value: "Executive" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Executive`);
                                  } else {
                                    return [
                                      createTextVNode("Executive")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), { value: "Director" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Director`);
                                  } else {
                                    return [
                                      createTextVNode("Director")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$c), { value: "Associate" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Associate")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), { value: "Senior Associate" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Senior Associate")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), { value: "Executive" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Executive")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), { value: "Director" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Director")
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
                          createVNode(unref(_sfc_main$9), {
                            id: "level",
                            class: {
                              "border-destructive": form.value.errors.level
                            }
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$a), { placeholder: "Pilih level customer" })
                            ]),
                            _: 1
                          }, 8, ["class"]),
                          createVNode(unref(_sfc_main$b), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$c), { value: "Associate" }, {
                                default: withCtx(() => [
                                  createTextVNode("Associate")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), { value: "Senior Associate" }, {
                                default: withCtx(() => [
                                  createTextVNode("Senior Associate")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), { value: "Executive" }, {
                                default: withCtx(() => [
                                  createTextVNode("Executive")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), { value: "Director" }, {
                                default: withCtx(() => [
                                  createTextVNode("Director")
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
                  _push3(`<p class="text-xs text-muted-foreground"${_scopeId2}> Level customer dipakai untuk struktur jaringan. </p>`);
                  if (form.value.errors.level) {
                    _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(form.value.errors.level)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$6), { for: "status" }, {
                          default: withCtx(() => [
                            createTextVNode("Status")
                          ]),
                          _: 1
                        }),
                        isCreateMode.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                          createVNode(unref(_sfc_main$8), {
                            modelValue: form.value.status,
                            "onUpdate:modelValue": ($event) => form.value.status = $event
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$9), {
                                id: "status",
                                class: {
                                  "border-destructive": form.value.errors.status
                                }
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$a), { placeholder: "Pilih status customer" })
                                ]),
                                _: 1
                              }, 8, ["class"]),
                              createVNode(unref(_sfc_main$b), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$c), { value: "1" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Prospek")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$c), { value: "2" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Pasif")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$c), { value: "3" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Aktif")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"]),
                          form.value.errors.status ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive"
                          }, toDisplayString(form.value.errors.status), 1)) : createCommentVNode("", true)
                        ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                          createVNode(unref(_sfc_main$7), {
                            id: "status",
                            value: customerStatusLabel.value,
                            disabled: ""
                          }, null, 8, ["value"]),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, " Status hanya dapat diubah lewat proses bisnis aktivasi customer. ")
                        ], 64))
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$6), { for: "sponsor_id" }, {
                          default: withCtx(() => [
                            createTextVNode("Sponsor")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$d), {
                          open: sponsorComboboxOpen.value,
                          "onUpdate:open": ($event) => sponsorComboboxOpen.value = $event
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$e), { "as-child": "" }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$f), {
                                  id: "sponsor_id",
                                  variant: "outline",
                                  role: "combobox",
                                  "aria-label": "Pilih sponsor",
                                  class: unref(cn)(
                                    "w-full justify-between font-normal",
                                    form.value.errors.sponsor_id && "border-destructive"
                                  )
                                }, {
                                  default: withCtx(() => [
                                    createVNode("span", { class: "truncate text-left" }, toDisplayString(selectedSponsorLabel.value), 1),
                                    createVNode(unref(ChevronsUpDown), { class: "ml-2 h-4 w-4 shrink-0 opacity-50" })
                                  ]),
                                  _: 1
                                }, 8, ["class"])
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$g), {
                              align: "start",
                              class: "w-[--reka-popover-trigger-width] p-0"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$h), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$i), { placeholder: "Cari username sponsor..." }),
                                    createVNode(unref(_sfc_main$j), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$k), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Sponsor tidak ditemukan.")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$l), { heading: "Daftar Sponsor" }, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$m), {
                                              value: "tanpa sponsor",
                                              onSelect: withModifiers(($event) => selectSponsor(null), ["prevent"])
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(Check), {
                                                  class: unref(cn)(
                                                    "mr-2 h-4 w-4",
                                                    form.value.sponsor_id === null ? "opacity-100" : "opacity-0"
                                                  )
                                                }, null, 8, ["class"]),
                                                createTextVNode(" Tanpa sponsor ")
                                              ]),
                                              _: 1
                                            }, 8, ["onSelect"]),
                                            (openBlock(true), createBlock(Fragment, null, renderList(props.sponsors, (sponsor) => {
                                              return openBlock(), createBlock(unref(_sfc_main$m), {
                                                key: sponsor.id,
                                                value: getSponsorSearchValue(
                                                  sponsor
                                                ),
                                                onSelect: withModifiers(($event) => selectSponsor(sponsor.id), ["prevent"])
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(Check), {
                                                    class: unref(cn)(
                                                      "mr-2 h-4 w-4",
                                                      form.value.sponsor_id === sponsor.id ? "opacity-100" : "opacity-0"
                                                    )
                                                  }, null, 8, ["class"]),
                                                  createVNode("div", { class: "flex flex-col" }, [
                                                    createVNode("span", { class: "font-medium" }, toDisplayString(sponsor.username ? `@${sponsor.username}` : `ID ${sponsor.id}`), 1),
                                                    createVNode("span", { class: "text-xs text-muted-foreground" }, [
                                                      createTextVNode(toDisplayString(sponsor.name) + " ", 1),
                                                      getSponsorMeta(
                                                        sponsor
                                                      ) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                                        createTextVNode(" • " + toDisplayString(getSponsorMeta(
                                                          sponsor
                                                        )), 1)
                                                      ], 64)) : createCommentVNode("", true)
                                                    ])
                                                  ])
                                                ]),
                                                _: 2
                                              }, 1032, ["value", "onSelect"]);
                                            }), 128))
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
                            })
                          ]),
                          _: 1
                        }, 8, ["open", "onUpdate:open"]),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, " Pilih sponsor dari data customer dan cari dengan username. "),
                        form.value.errors.sponsor_id ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-destructive"
                        }, toDisplayString(form.value.errors.sponsor_id), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$6), { for: "package_id" }, {
                          default: withCtx(() => [
                            createTextVNode("Paket Membership")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), {
                          modelValue: form.value.package_id,
                          "onUpdate:modelValue": ($event) => form.value.package_id = $event
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$9), {
                              id: "package_id",
                              class: {
                                "border-destructive": form.value.errors.package_id
                              }
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$a), { placeholder: "Pilih paket membership" })
                              ]),
                              _: 1
                            }, 8, ["class"]),
                            createVNode(unref(_sfc_main$b), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$c), { value: "1" }, {
                                  default: withCtx(() => [
                                    createTextVNode("ZENNER Plus")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), { value: "2" }, {
                                  default: withCtx(() => [
                                    createTextVNode("ZENNER Prime")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), { value: "3" }, {
                                  default: withCtx(() => [
                                    createTextVNode("ZENNER Ultra")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, " Anda dapat memilih paket sesuai kebutuhan customer. "),
                        form.value.errors.package_id ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-destructive"
                        }, toDisplayString(form.value.errors.package_id), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$6), { for: "level" }, {
                          default: withCtx(() => [
                            createTextVNode("Level Customer")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), {
                          modelValue: form.value.level,
                          "onUpdate:modelValue": ($event) => form.value.level = $event
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$9), {
                              id: "level",
                              class: {
                                "border-destructive": form.value.errors.level
                              }
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$a), { placeholder: "Pilih level customer" })
                              ]),
                              _: 1
                            }, 8, ["class"]),
                            createVNode(unref(_sfc_main$b), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$c), { value: "Associate" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Associate")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), { value: "Senior Associate" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Senior Associate")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), { value: "Executive" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Executive")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), { value: "Director" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Director")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, " Level customer dipakai untuk struktur jaringan. "),
                        form.value.errors.level ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-destructive"
                        }, toDisplayString(form.value.errors.level), 1)) : createCommentVNode("", true)
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createTextVNode("Data Keanggotaan")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createTextVNode(" Informasi ini mengacu pada atribut keanggotaan di model customer. ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), { class: "space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), { for: "status" }, {
                        default: withCtx(() => [
                          createTextVNode("Status")
                        ]),
                        _: 1
                      }),
                      isCreateMode.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                        createVNode(unref(_sfc_main$8), {
                          modelValue: form.value.status,
                          "onUpdate:modelValue": ($event) => form.value.status = $event
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$9), {
                              id: "status",
                              class: {
                                "border-destructive": form.value.errors.status
                              }
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$a), { placeholder: "Pilih status customer" })
                              ]),
                              _: 1
                            }, 8, ["class"]),
                            createVNode(unref(_sfc_main$b), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$c), { value: "1" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Prospek")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), { value: "2" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Pasif")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), { value: "3" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Aktif")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"]),
                        form.value.errors.status ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-destructive"
                        }, toDisplayString(form.value.errors.status), 1)) : createCommentVNode("", true)
                      ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                        createVNode(unref(_sfc_main$7), {
                          id: "status",
                          value: customerStatusLabel.value,
                          disabled: ""
                        }, null, 8, ["value"]),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, " Status hanya dapat diubah lewat proses bisnis aktivasi customer. ")
                      ], 64))
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), { for: "sponsor_id" }, {
                        default: withCtx(() => [
                          createTextVNode("Sponsor")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$d), {
                        open: sponsorComboboxOpen.value,
                        "onUpdate:open": ($event) => sponsorComboboxOpen.value = $event
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$e), { "as-child": "" }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$f), {
                                id: "sponsor_id",
                                variant: "outline",
                                role: "combobox",
                                "aria-label": "Pilih sponsor",
                                class: unref(cn)(
                                  "w-full justify-between font-normal",
                                  form.value.errors.sponsor_id && "border-destructive"
                                )
                              }, {
                                default: withCtx(() => [
                                  createVNode("span", { class: "truncate text-left" }, toDisplayString(selectedSponsorLabel.value), 1),
                                  createVNode(unref(ChevronsUpDown), { class: "ml-2 h-4 w-4 shrink-0 opacity-50" })
                                ]),
                                _: 1
                              }, 8, ["class"])
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$g), {
                            align: "start",
                            class: "w-[--reka-popover-trigger-width] p-0"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$h), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$i), { placeholder: "Cari username sponsor..." }),
                                  createVNode(unref(_sfc_main$j), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$k), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Sponsor tidak ditemukan.")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$l), { heading: "Daftar Sponsor" }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$m), {
                                            value: "tanpa sponsor",
                                            onSelect: withModifiers(($event) => selectSponsor(null), ["prevent"])
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(Check), {
                                                class: unref(cn)(
                                                  "mr-2 h-4 w-4",
                                                  form.value.sponsor_id === null ? "opacity-100" : "opacity-0"
                                                )
                                              }, null, 8, ["class"]),
                                              createTextVNode(" Tanpa sponsor ")
                                            ]),
                                            _: 1
                                          }, 8, ["onSelect"]),
                                          (openBlock(true), createBlock(Fragment, null, renderList(props.sponsors, (sponsor) => {
                                            return openBlock(), createBlock(unref(_sfc_main$m), {
                                              key: sponsor.id,
                                              value: getSponsorSearchValue(
                                                sponsor
                                              ),
                                              onSelect: withModifiers(($event) => selectSponsor(sponsor.id), ["prevent"])
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(Check), {
                                                  class: unref(cn)(
                                                    "mr-2 h-4 w-4",
                                                    form.value.sponsor_id === sponsor.id ? "opacity-100" : "opacity-0"
                                                  )
                                                }, null, 8, ["class"]),
                                                createVNode("div", { class: "flex flex-col" }, [
                                                  createVNode("span", { class: "font-medium" }, toDisplayString(sponsor.username ? `@${sponsor.username}` : `ID ${sponsor.id}`), 1),
                                                  createVNode("span", { class: "text-xs text-muted-foreground" }, [
                                                    createTextVNode(toDisplayString(sponsor.name) + " ", 1),
                                                    getSponsorMeta(
                                                      sponsor
                                                    ) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                                      createTextVNode(" • " + toDisplayString(getSponsorMeta(
                                                        sponsor
                                                      )), 1)
                                                    ], 64)) : createCommentVNode("", true)
                                                  ])
                                                ])
                                              ]),
                                              _: 2
                                            }, 1032, ["value", "onSelect"]);
                                          }), 128))
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
                          })
                        ]),
                        _: 1
                      }, 8, ["open", "onUpdate:open"]),
                      createVNode("p", { class: "text-xs text-muted-foreground" }, " Pilih sponsor dari data customer dan cari dengan username. "),
                      form.value.errors.sponsor_id ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-destructive"
                      }, toDisplayString(form.value.errors.sponsor_id), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), { for: "package_id" }, {
                        default: withCtx(() => [
                          createTextVNode("Paket Membership")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$8), {
                        modelValue: form.value.package_id,
                        "onUpdate:modelValue": ($event) => form.value.package_id = $event
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$9), {
                            id: "package_id",
                            class: {
                              "border-destructive": form.value.errors.package_id
                            }
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$a), { placeholder: "Pilih paket membership" })
                            ]),
                            _: 1
                          }, 8, ["class"]),
                          createVNode(unref(_sfc_main$b), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$c), { value: "1" }, {
                                default: withCtx(() => [
                                  createTextVNode("ZENNER Plus")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), { value: "2" }, {
                                default: withCtx(() => [
                                  createTextVNode("ZENNER Prime")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), { value: "3" }, {
                                default: withCtx(() => [
                                  createTextVNode("ZENNER Ultra")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode("p", { class: "text-xs text-muted-foreground" }, " Anda dapat memilih paket sesuai kebutuhan customer. "),
                      form.value.errors.package_id ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-destructive"
                      }, toDisplayString(form.value.errors.package_id), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), { for: "level" }, {
                        default: withCtx(() => [
                          createTextVNode("Level Customer")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$8), {
                        modelValue: form.value.level,
                        "onUpdate:modelValue": ($event) => form.value.level = $event
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$9), {
                            id: "level",
                            class: {
                              "border-destructive": form.value.errors.level
                            }
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$a), { placeholder: "Pilih level customer" })
                            ]),
                            _: 1
                          }, 8, ["class"]),
                          createVNode(unref(_sfc_main$b), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$c), { value: "Associate" }, {
                                default: withCtx(() => [
                                  createTextVNode("Associate")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), { value: "Senior Associate" }, {
                                default: withCtx(() => [
                                  createTextVNode("Senior Associate")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), { value: "Executive" }, {
                                default: withCtx(() => [
                                  createTextVNode("Executive")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), { value: "Director" }, {
                                default: withCtx(() => [
                                  createTextVNode("Director")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode("p", { class: "text-xs text-muted-foreground" }, " Level customer dipakai untuk struktur jaringan. "),
                      form.value.errors.level ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-destructive"
                      }, toDisplayString(form.value.errors.level), 1)) : createCommentVNode("", true)
                    ])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Alamat Pelanggan`);
                      } else {
                        return [
                          createTextVNode("Alamat Pelanggan")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Masukkan alamat utama pengiriman dan domisili untuk kebutuhan operasional. `);
                      } else {
                        return [
                          createTextVNode(" Masukkan alamat utama pengiriman dan domisili untuk kebutuhan operasional. ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Alamat Pelanggan")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createTextVNode(" Masukkan alamat utama pengiriman dan domisili untuk kebutuhan operasional. ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$5), { class: "space-y-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "address" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Address`);
                      } else {
                        return [
                          createTextVNode("Address")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$n), {
                    id: "address",
                    modelValue: form.value.address,
                    "onUpdate:modelValue": ($event) => form.value.address = $event,
                    placeholder: "Alamat utama pengiriman",
                    rows: "3",
                    class: {
                      "border-destructive": form.value.errors.address
                    }
                  }, null, _parent3, _scopeId2));
                  _push3(`<p class="text-xs text-muted-foreground"${_scopeId2}> Contoh: nama jalan, nomor rumah, RT/RW, kelurahan, kecamatan. </p>`);
                  if (form.value.errors.address) {
                    _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(form.value.errors.address)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="grid gap-4 md:grid-cols-2"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "province_id" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Provinsi`);
                      } else {
                        return [
                          createTextVNode("Provinsi")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$8), {
                    modelValue: form.value.province_id,
                    "onUpdate:modelValue": ($event) => form.value.province_id = $event,
                    disabled: props.loadingProvinces
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          id: "province_id",
                          class: {
                            "border-destructive": form.value.errors.province_id
                          }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$a), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    if (selectedProvinceLabel.value) {
                                      _push6(`<span${_scopeId5}>${ssrInterpolate(selectedProvinceLabel.value)}</span>`);
                                    } else if (props.loadingProvinces) {
                                      _push6(`<span class="inline-flex items-center gap-2"${_scopeId5}>`);
                                      _push6(ssrRenderComponent(unref(Loader2), { class: "h-4 w-4 animate-spin" }, null, _parent6, _scopeId5));
                                      _push6(` Memuat provinsi... </span>`);
                                    } else {
                                      _push6(`<span${_scopeId5}>Pilih provinsi</span>`);
                                    }
                                  } else {
                                    return [
                                      selectedProvinceLabel.value ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(selectedProvinceLabel.value), 1)) : props.loadingProvinces ? (openBlock(), createBlock("span", {
                                        key: 1,
                                        class: "inline-flex items-center gap-2"
                                      }, [
                                        createVNode(unref(Loader2), { class: "h-4 w-4 animate-spin" }),
                                        createTextVNode(" Memuat provinsi... ")
                                      ])) : (openBlock(), createBlock("span", { key: 2 }, "Pilih provinsi"))
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$a), null, {
                                  default: withCtx(() => [
                                    selectedProvinceLabel.value ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(selectedProvinceLabel.value), 1)) : props.loadingProvinces ? (openBlock(), createBlock("span", {
                                      key: 1,
                                      class: "inline-flex items-center gap-2"
                                    }, [
                                      createVNode(unref(Loader2), { class: "h-4 w-4 animate-spin" }),
                                      createTextVNode(" Memuat provinsi... ")
                                    ])) : (openBlock(), createBlock("span", { key: 2 }, "Pilih provinsi"))
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$b), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(props.provinces, (province) => {
                                _push5(ssrRenderComponent(unref(_sfc_main$c), {
                                  key: province.id,
                                  value: province.id
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(province.name)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(province.name), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(true), createBlock(Fragment, null, renderList(props.provinces, (province) => {
                                  return openBlock(), createBlock(unref(_sfc_main$c), {
                                    key: province.id,
                                    value: province.id
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(province.name), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 128))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$9), {
                            id: "province_id",
                            class: {
                              "border-destructive": form.value.errors.province_id
                            }
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$a), null, {
                                default: withCtx(() => [
                                  selectedProvinceLabel.value ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(selectedProvinceLabel.value), 1)) : props.loadingProvinces ? (openBlock(), createBlock("span", {
                                    key: 1,
                                    class: "inline-flex items-center gap-2"
                                  }, [
                                    createVNode(unref(Loader2), { class: "h-4 w-4 animate-spin" }),
                                    createTextVNode(" Memuat provinsi... ")
                                  ])) : (openBlock(), createBlock("span", { key: 2 }, "Pilih provinsi"))
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["class"]),
                          createVNode(unref(_sfc_main$b), null, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(props.provinces, (province) => {
                                return openBlock(), createBlock(unref(_sfc_main$c), {
                                  key: province.id,
                                  value: province.id
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(province.name), 1)
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
                  }, _parent3, _scopeId2));
                  _push3(`<p class="text-xs text-muted-foreground"${_scopeId2}> Pilih provinsi untuk memuat daftar kota/kabupaten. </p>`);
                  if (form.value.errors.province_id) {
                    _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(form.value.errors.province_id)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "city_id" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Kota/Kabupaten`);
                      } else {
                        return [
                          createTextVNode("Kota/Kabupaten")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$8), {
                    modelValue: form.value.city_id,
                    "onUpdate:modelValue": ($event) => form.value.city_id = $event,
                    disabled: props.loadingCities || !form.value.province_id
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          id: "city_id",
                          class: {
                            "border-destructive": form.value.errors.city_id
                          }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$a), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    if (selectedCityLabel.value) {
                                      _push6(`<span${_scopeId5}>${ssrInterpolate(selectedCityLabel.value)}</span>`);
                                    } else if (props.loadingCities) {
                                      _push6(`<span class="inline-flex items-center gap-2"${_scopeId5}>`);
                                      _push6(ssrRenderComponent(unref(Loader2), { class: "h-4 w-4 animate-spin" }, null, _parent6, _scopeId5));
                                      _push6(` Memuat kota... </span>`);
                                    } else if (form.value.province_id) {
                                      _push6(`<span${_scopeId5}>Pilih kota/kabupaten</span>`);
                                    } else {
                                      _push6(`<span${_scopeId5}>Pilih provinsi dulu</span>`);
                                    }
                                  } else {
                                    return [
                                      selectedCityLabel.value ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(selectedCityLabel.value), 1)) : props.loadingCities ? (openBlock(), createBlock("span", {
                                        key: 1,
                                        class: "inline-flex items-center gap-2"
                                      }, [
                                        createVNode(unref(Loader2), { class: "h-4 w-4 animate-spin" }),
                                        createTextVNode(" Memuat kota... ")
                                      ])) : form.value.province_id ? (openBlock(), createBlock("span", { key: 2 }, "Pilih kota/kabupaten")) : (openBlock(), createBlock("span", { key: 3 }, "Pilih provinsi dulu"))
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$a), null, {
                                  default: withCtx(() => [
                                    selectedCityLabel.value ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(selectedCityLabel.value), 1)) : props.loadingCities ? (openBlock(), createBlock("span", {
                                      key: 1,
                                      class: "inline-flex items-center gap-2"
                                    }, [
                                      createVNode(unref(Loader2), { class: "h-4 w-4 animate-spin" }),
                                      createTextVNode(" Memuat kota... ")
                                    ])) : form.value.province_id ? (openBlock(), createBlock("span", { key: 2 }, "Pilih kota/kabupaten")) : (openBlock(), createBlock("span", { key: 3 }, "Pilih provinsi dulu"))
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$b), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(props.cities, (city) => {
                                _push5(ssrRenderComponent(unref(_sfc_main$c), {
                                  key: city.id,
                                  value: city.id
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(city.name)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(city.name), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(true), createBlock(Fragment, null, renderList(props.cities, (city) => {
                                  return openBlock(), createBlock(unref(_sfc_main$c), {
                                    key: city.id,
                                    value: city.id
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(city.name), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 128))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$9), {
                            id: "city_id",
                            class: {
                              "border-destructive": form.value.errors.city_id
                            }
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$a), null, {
                                default: withCtx(() => [
                                  selectedCityLabel.value ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(selectedCityLabel.value), 1)) : props.loadingCities ? (openBlock(), createBlock("span", {
                                    key: 1,
                                    class: "inline-flex items-center gap-2"
                                  }, [
                                    createVNode(unref(Loader2), { class: "h-4 w-4 animate-spin" }),
                                    createTextVNode(" Memuat kota... ")
                                  ])) : form.value.province_id ? (openBlock(), createBlock("span", { key: 2 }, "Pilih kota/kabupaten")) : (openBlock(), createBlock("span", { key: 3 }, "Pilih provinsi dulu"))
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["class"]),
                          createVNode(unref(_sfc_main$b), null, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(props.cities, (city) => {
                                return openBlock(), createBlock(unref(_sfc_main$c), {
                                  key: city.id,
                                  value: city.id
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(city.name), 1)
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
                  }, _parent3, _scopeId2));
                  _push3(`<p class="text-xs text-muted-foreground"${_scopeId2}> Daftar kota akan menyesuaikan provinsi yang dipilih. </p>`);
                  if (form.value.errors.city_id) {
                    _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(form.value.errors.city_id)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div></div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "alamat" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Alamat Domisili (alamat)`);
                      } else {
                        return [
                          createTextVNode("Alamat Domisili (alamat)")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$n), {
                    id: "alamat",
                    modelValue: form.value.alamat,
                    "onUpdate:modelValue": ($event) => form.value.alamat = $event,
                    placeholder: "Alamat domisili/administratif pelanggan",
                    rows: "3",
                    class: {
                      "border-destructive": form.value.errors.alamat
                    }
                  }, null, _parent3, _scopeId2));
                  _push3(`<p class="text-xs text-muted-foreground"${_scopeId2}> Pisahkan data domisili untuk kebutuhan dokumen internal. </p>`);
                  if (form.value.errors.alamat) {
                    _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(form.value.errors.alamat)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), { for: "address" }, {
                        default: withCtx(() => [
                          createTextVNode("Address")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$n), {
                        id: "address",
                        modelValue: form.value.address,
                        "onUpdate:modelValue": ($event) => form.value.address = $event,
                        placeholder: "Alamat utama pengiriman",
                        rows: "3",
                        class: {
                          "border-destructive": form.value.errors.address
                        }
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                      createVNode("p", { class: "text-xs text-muted-foreground" }, " Contoh: nama jalan, nomor rumah, RT/RW, kelurahan, kecamatan. "),
                      form.value.errors.address ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-destructive"
                      }, toDisplayString(form.value.errors.address), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$6), { for: "province_id" }, {
                          default: withCtx(() => [
                            createTextVNode("Provinsi")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), {
                          modelValue: form.value.province_id,
                          "onUpdate:modelValue": ($event) => form.value.province_id = $event,
                          disabled: props.loadingProvinces
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$9), {
                              id: "province_id",
                              class: {
                                "border-destructive": form.value.errors.province_id
                              }
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$a), null, {
                                  default: withCtx(() => [
                                    selectedProvinceLabel.value ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(selectedProvinceLabel.value), 1)) : props.loadingProvinces ? (openBlock(), createBlock("span", {
                                      key: 1,
                                      class: "inline-flex items-center gap-2"
                                    }, [
                                      createVNode(unref(Loader2), { class: "h-4 w-4 animate-spin" }),
                                      createTextVNode(" Memuat provinsi... ")
                                    ])) : (openBlock(), createBlock("span", { key: 2 }, "Pilih provinsi"))
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["class"]),
                            createVNode(unref(_sfc_main$b), null, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(props.provinces, (province) => {
                                  return openBlock(), createBlock(unref(_sfc_main$c), {
                                    key: province.id,
                                    value: province.id
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(province.name), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 128))
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, " Pilih provinsi untuk memuat daftar kota/kabupaten. "),
                        form.value.errors.province_id ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-destructive"
                        }, toDisplayString(form.value.errors.province_id), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$6), { for: "city_id" }, {
                          default: withCtx(() => [
                            createTextVNode("Kota/Kabupaten")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), {
                          modelValue: form.value.city_id,
                          "onUpdate:modelValue": ($event) => form.value.city_id = $event,
                          disabled: props.loadingCities || !form.value.province_id
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$9), {
                              id: "city_id",
                              class: {
                                "border-destructive": form.value.errors.city_id
                              }
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$a), null, {
                                  default: withCtx(() => [
                                    selectedCityLabel.value ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(selectedCityLabel.value), 1)) : props.loadingCities ? (openBlock(), createBlock("span", {
                                      key: 1,
                                      class: "inline-flex items-center gap-2"
                                    }, [
                                      createVNode(unref(Loader2), { class: "h-4 w-4 animate-spin" }),
                                      createTextVNode(" Memuat kota... ")
                                    ])) : form.value.province_id ? (openBlock(), createBlock("span", { key: 2 }, "Pilih kota/kabupaten")) : (openBlock(), createBlock("span", { key: 3 }, "Pilih provinsi dulu"))
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["class"]),
                            createVNode(unref(_sfc_main$b), null, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(props.cities, (city) => {
                                  return openBlock(), createBlock(unref(_sfc_main$c), {
                                    key: city.id,
                                    value: city.id
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(city.name), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 128))
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, " Daftar kota akan menyesuaikan provinsi yang dipilih. "),
                        form.value.errors.city_id ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-destructive"
                        }, toDisplayString(form.value.errors.city_id), 1)) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), { for: "alamat" }, {
                        default: withCtx(() => [
                          createTextVNode("Alamat Domisili (alamat)")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$n), {
                        id: "alamat",
                        modelValue: form.value.alamat,
                        "onUpdate:modelValue": ($event) => form.value.alamat = $event,
                        placeholder: "Alamat domisili/administratif pelanggan",
                        rows: "3",
                        class: {
                          "border-destructive": form.value.errors.alamat
                        }
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                      createVNode("p", { class: "text-xs text-muted-foreground" }, " Pisahkan data domisili untuk kebutuhan dokumen internal. "),
                      form.value.errors.alamat ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-destructive"
                      }, toDisplayString(form.value.errors.alamat), 1)) : createCommentVNode("", true)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createTextVNode("Alamat Pelanggan")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createTextVNode(" Masukkan alamat utama pengiriman dan domisili untuk kebutuhan operasional. ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), { class: "space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "space-y-2" }, [
                    createVNode(unref(_sfc_main$6), { for: "address" }, {
                      default: withCtx(() => [
                        createTextVNode("Address")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$n), {
                      id: "address",
                      modelValue: form.value.address,
                      "onUpdate:modelValue": ($event) => form.value.address = $event,
                      placeholder: "Alamat utama pengiriman",
                      rows: "3",
                      class: {
                        "border-destructive": form.value.errors.address
                      }
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                    createVNode("p", { class: "text-xs text-muted-foreground" }, " Contoh: nama jalan, nomor rumah, RT/RW, kelurahan, kecamatan. "),
                    form.value.errors.address ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "text-sm text-destructive"
                    }, toDisplayString(form.value.errors.address), 1)) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), { for: "province_id" }, {
                        default: withCtx(() => [
                          createTextVNode("Provinsi")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$8), {
                        modelValue: form.value.province_id,
                        "onUpdate:modelValue": ($event) => form.value.province_id = $event,
                        disabled: props.loadingProvinces
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$9), {
                            id: "province_id",
                            class: {
                              "border-destructive": form.value.errors.province_id
                            }
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$a), null, {
                                default: withCtx(() => [
                                  selectedProvinceLabel.value ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(selectedProvinceLabel.value), 1)) : props.loadingProvinces ? (openBlock(), createBlock("span", {
                                    key: 1,
                                    class: "inline-flex items-center gap-2"
                                  }, [
                                    createVNode(unref(Loader2), { class: "h-4 w-4 animate-spin" }),
                                    createTextVNode(" Memuat provinsi... ")
                                  ])) : (openBlock(), createBlock("span", { key: 2 }, "Pilih provinsi"))
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["class"]),
                          createVNode(unref(_sfc_main$b), null, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(props.provinces, (province) => {
                                return openBlock(), createBlock(unref(_sfc_main$c), {
                                  key: province.id,
                                  value: province.id
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(province.name), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["value"]);
                              }), 128))
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                      createVNode("p", { class: "text-xs text-muted-foreground" }, " Pilih provinsi untuk memuat daftar kota/kabupaten. "),
                      form.value.errors.province_id ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-destructive"
                      }, toDisplayString(form.value.errors.province_id), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), { for: "city_id" }, {
                        default: withCtx(() => [
                          createTextVNode("Kota/Kabupaten")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$8), {
                        modelValue: form.value.city_id,
                        "onUpdate:modelValue": ($event) => form.value.city_id = $event,
                        disabled: props.loadingCities || !form.value.province_id
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$9), {
                            id: "city_id",
                            class: {
                              "border-destructive": form.value.errors.city_id
                            }
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$a), null, {
                                default: withCtx(() => [
                                  selectedCityLabel.value ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(selectedCityLabel.value), 1)) : props.loadingCities ? (openBlock(), createBlock("span", {
                                    key: 1,
                                    class: "inline-flex items-center gap-2"
                                  }, [
                                    createVNode(unref(Loader2), { class: "h-4 w-4 animate-spin" }),
                                    createTextVNode(" Memuat kota... ")
                                  ])) : form.value.province_id ? (openBlock(), createBlock("span", { key: 2 }, "Pilih kota/kabupaten")) : (openBlock(), createBlock("span", { key: 3 }, "Pilih provinsi dulu"))
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["class"]),
                          createVNode(unref(_sfc_main$b), null, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(props.cities, (city) => {
                                return openBlock(), createBlock(unref(_sfc_main$c), {
                                  key: city.id,
                                  value: city.id
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(city.name), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["value"]);
                              }), 128))
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                      createVNode("p", { class: "text-xs text-muted-foreground" }, " Daftar kota akan menyesuaikan provinsi yang dipilih. "),
                      form.value.errors.city_id ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-destructive"
                      }, toDisplayString(form.value.errors.city_id), 1)) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", { class: "space-y-2" }, [
                    createVNode(unref(_sfc_main$6), { for: "alamat" }, {
                      default: withCtx(() => [
                        createTextVNode("Alamat Domisili (alamat)")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$n), {
                      id: "alamat",
                      modelValue: form.value.alamat,
                      "onUpdate:modelValue": ($event) => form.value.alamat = $event,
                      placeholder: "Alamat domisili/administratif pelanggan",
                      rows: "3",
                      class: {
                        "border-destructive": form.value.errors.alamat
                      }
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                    createVNode("p", { class: "text-xs text-muted-foreground" }, " Pisahkan data domisili untuk kebutuhan dokumen internal. "),
                    form.value.errors.alamat ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "text-sm text-destructive"
                    }, toDisplayString(form.value.errors.alamat), 1)) : createCommentVNode("", true)
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Informasi NPWP`);
                      } else {
                        return [
                          createTextVNode("Informasi NPWP")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Data ini akan disimpan ke tabel NPWP customer untuk kebutuhan perpajakan. `);
                      } else {
                        return [
                          createTextVNode(" Data ini akan disimpan ke tabel NPWP customer untuk kebutuhan perpajakan. ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Informasi NPWP")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createTextVNode(" Data ini akan disimpan ke tabel NPWP customer untuk kebutuhan perpajakan. ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$5), { class: "space-y-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid gap-4 md:grid-cols-2"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "npwp_nama" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Nama NPWP`);
                      } else {
                        return [
                          createTextVNode("Nama NPWP")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    id: "npwp_nama",
                    modelValue: form.value.npwp.nama,
                    "onUpdate:modelValue": ($event) => form.value.npwp.nama = $event,
                    placeholder: "Nama sesuai kartu NPWP",
                    class: {
                      "border-destructive": form.value.errors["npwp.nama"]
                    }
                  }, null, _parent3, _scopeId2));
                  if (form.value.errors["npwp.nama"]) {
                    _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(form.value.errors["npwp.nama"])}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "npwp_number" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Nomor NPWP`);
                      } else {
                        return [
                          createTextVNode("Nomor NPWP")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    id: "npwp_number",
                    modelValue: form.value.npwp.npwp,
                    "onUpdate:modelValue": ($event) => form.value.npwp.npwp = $event,
                    inputmode: "numeric",
                    maxlength: "20",
                    placeholder: "15 atau 16 digit NPWP",
                    class: {
                      "border-destructive": form.value.errors["npwp.npwp"]
                    }
                  }, null, _parent3, _scopeId2));
                  if (form.value.errors["npwp.npwp"]) {
                    _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(form.value.errors["npwp.npwp"])}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "npwp_jk" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Jenis Kelamin NPWP`);
                      } else {
                        return [
                          createTextVNode("Jenis Kelamin NPWP")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$8), {
                    modelValue: form.value.npwp.jk,
                    "onUpdate:modelValue": ($event) => form.value.npwp.jk = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          id: "npwp_jk",
                          class: {
                            "border-destructive": form.value.errors["npwp.jk"]
                          }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$a), { placeholder: "Pilih jenis kelamin" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$a), { placeholder: "Pilih jenis kelamin" })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$b), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$c), { value: "laki-laki" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Laki-laki`);
                                  } else {
                                    return [
                                      createTextVNode("Laki-laki")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), { value: "perempuan" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Perempuan`);
                                  } else {
                                    return [
                                      createTextVNode("Perempuan")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$c), { value: "laki-laki" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Laki-laki")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), { value: "perempuan" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Perempuan")
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
                          createVNode(unref(_sfc_main$9), {
                            id: "npwp_jk",
                            class: {
                              "border-destructive": form.value.errors["npwp.jk"]
                            }
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$a), { placeholder: "Pilih jenis kelamin" })
                            ]),
                            _: 1
                          }, 8, ["class"]),
                          createVNode(unref(_sfc_main$b), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$c), { value: "laki-laki" }, {
                                default: withCtx(() => [
                                  createTextVNode("Laki-laki")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), { value: "perempuan" }, {
                                default: withCtx(() => [
                                  createTextVNode("Perempuan")
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
                  if (form.value.errors["npwp.jk"]) {
                    _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(form.value.errors["npwp.jk"])}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "npwp_date" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Tanggal NPWP`);
                      } else {
                        return [
                          createTextVNode("Tanggal NPWP")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    id: "npwp_date",
                    modelValue: form.value.npwp.npwp_date,
                    "onUpdate:modelValue": ($event) => form.value.npwp.npwp_date = $event,
                    type: "date",
                    class: {
                      "border-destructive": form.value.errors["npwp.npwp_date"]
                    }
                  }, null, _parent3, _scopeId2));
                  if (form.value.errors["npwp.npwp_date"]) {
                    _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(form.value.errors["npwp.npwp_date"])}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div></div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "npwp_alamat" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Alamat NPWP`);
                      } else {
                        return [
                          createTextVNode("Alamat NPWP")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$n), {
                    id: "npwp_alamat",
                    modelValue: form.value.npwp.alamat,
                    "onUpdate:modelValue": ($event) => form.value.npwp.alamat = $event,
                    rows: "3",
                    placeholder: "Alamat terdaftar di data NPWP",
                    class: {
                      "border-destructive": form.value.errors["npwp.alamat"]
                    }
                  }, null, _parent3, _scopeId2));
                  if (form.value.errors["npwp.alamat"]) {
                    _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(form.value.errors["npwp.alamat"])}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="grid gap-4 md:grid-cols-2"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "npwp_menikah" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Status Menikah`);
                      } else {
                        return [
                          createTextVNode("Status Menikah")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$8), {
                    modelValue: form.value.npwp.menikah,
                    "onUpdate:modelValue": ($event) => form.value.npwp.menikah = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          id: "npwp_menikah",
                          class: {
                            "border-destructive": form.value.errors["npwp.menikah"]
                          }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$a), { placeholder: "Pilih status menikah" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$a), { placeholder: "Pilih status menikah" })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$b), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$c), { value: "1" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Menikah`);
                                  } else {
                                    return [
                                      createTextVNode("Menikah")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$c), { value: "0" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Belum Menikah`);
                                  } else {
                                    return [
                                      createTextVNode("Belum Menikah")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$c), { value: "1" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Menikah")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), { value: "0" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Belum Menikah")
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
                          createVNode(unref(_sfc_main$9), {
                            id: "npwp_menikah",
                            class: {
                              "border-destructive": form.value.errors["npwp.menikah"]
                            }
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$a), { placeholder: "Pilih status menikah" })
                            ]),
                            _: 1
                          }, 8, ["class"]),
                          createVNode(unref(_sfc_main$b), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$c), { value: "1" }, {
                                default: withCtx(() => [
                                  createTextVNode("Menikah")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), { value: "0" }, {
                                default: withCtx(() => [
                                  createTextVNode("Belum Menikah")
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
                  if (form.value.errors["npwp.menikah"]) {
                    _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(form.value.errors["npwp.menikah"])}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "npwp_anak" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Jumlah Anak`);
                      } else {
                        return [
                          createTextVNode("Jumlah Anak")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    id: "npwp_anak",
                    modelValue: form.value.npwp.anak,
                    "onUpdate:modelValue": ($event) => form.value.npwp.anak = $event,
                    modelModifiers: { number: true },
                    type: "number",
                    min: "0",
                    max: "3",
                    placeholder: "0-3",
                    class: {
                      "border-destructive": form.value.errors["npwp.anak"]
                    }
                  }, null, _parent3, _scopeId2));
                  _push3(`<p class="text-xs text-muted-foreground"${_scopeId2}> Mengikuti batas data perpajakan: maksimal 3 anak. </p>`);
                  if (form.value.errors["npwp.anak"]) {
                    _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(form.value.errors["npwp.anak"])}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "npwp_kerja" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Pekerjaan`);
                      } else {
                        return [
                          createTextVNode("Pekerjaan")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    id: "npwp_kerja",
                    modelValue: form.value.npwp.kerja,
                    "onUpdate:modelValue": ($event) => form.value.npwp.kerja = $event,
                    placeholder: "Contoh: Karyawan",
                    class: {
                      "border-destructive": form.value.errors["npwp.kerja"]
                    }
                  }, null, _parent3, _scopeId2));
                  if (form.value.errors["npwp.kerja"]) {
                    _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(form.value.errors["npwp.kerja"])}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "npwp_office" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Nama Perusahaan`);
                      } else {
                        return [
                          createTextVNode("Nama Perusahaan")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    id: "npwp_office",
                    modelValue: form.value.npwp.office,
                    "onUpdate:modelValue": ($event) => form.value.npwp.office = $event,
                    placeholder: "Contoh: PT Contoh Sejahtera",
                    class: {
                      "border-destructive": form.value.errors["npwp.office"]
                    }
                  }, null, _parent3, _scopeId2));
                  if (form.value.errors["npwp.office"]) {
                    _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(form.value.errors["npwp.office"])}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$6), { for: "npwp_nama" }, {
                          default: withCtx(() => [
                            createTextVNode("Nama NPWP")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$7), {
                          id: "npwp_nama",
                          modelValue: form.value.npwp.nama,
                          "onUpdate:modelValue": ($event) => form.value.npwp.nama = $event,
                          placeholder: "Nama sesuai kartu NPWP",
                          class: {
                            "border-destructive": form.value.errors["npwp.nama"]
                          }
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                        form.value.errors["npwp.nama"] ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-destructive"
                        }, toDisplayString(form.value.errors["npwp.nama"]), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$6), { for: "npwp_number" }, {
                          default: withCtx(() => [
                            createTextVNode("Nomor NPWP")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$7), {
                          id: "npwp_number",
                          modelValue: form.value.npwp.npwp,
                          "onUpdate:modelValue": ($event) => form.value.npwp.npwp = $event,
                          inputmode: "numeric",
                          maxlength: "20",
                          placeholder: "15 atau 16 digit NPWP",
                          class: {
                            "border-destructive": form.value.errors["npwp.npwp"]
                          }
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                        form.value.errors["npwp.npwp"] ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-destructive"
                        }, toDisplayString(form.value.errors["npwp.npwp"]), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$6), { for: "npwp_jk" }, {
                          default: withCtx(() => [
                            createTextVNode("Jenis Kelamin NPWP")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), {
                          modelValue: form.value.npwp.jk,
                          "onUpdate:modelValue": ($event) => form.value.npwp.jk = $event
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$9), {
                              id: "npwp_jk",
                              class: {
                                "border-destructive": form.value.errors["npwp.jk"]
                              }
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$a), { placeholder: "Pilih jenis kelamin" })
                              ]),
                              _: 1
                            }, 8, ["class"]),
                            createVNode(unref(_sfc_main$b), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$c), { value: "laki-laki" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Laki-laki")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), { value: "perempuan" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Perempuan")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"]),
                        form.value.errors["npwp.jk"] ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-destructive"
                        }, toDisplayString(form.value.errors["npwp.jk"]), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$6), { for: "npwp_date" }, {
                          default: withCtx(() => [
                            createTextVNode("Tanggal NPWP")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$7), {
                          id: "npwp_date",
                          modelValue: form.value.npwp.npwp_date,
                          "onUpdate:modelValue": ($event) => form.value.npwp.npwp_date = $event,
                          type: "date",
                          class: {
                            "border-destructive": form.value.errors["npwp.npwp_date"]
                          }
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                        form.value.errors["npwp.npwp_date"] ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-destructive"
                        }, toDisplayString(form.value.errors["npwp.npwp_date"]), 1)) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), { for: "npwp_alamat" }, {
                        default: withCtx(() => [
                          createTextVNode("Alamat NPWP")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$n), {
                        id: "npwp_alamat",
                        modelValue: form.value.npwp.alamat,
                        "onUpdate:modelValue": ($event) => form.value.npwp.alamat = $event,
                        rows: "3",
                        placeholder: "Alamat terdaftar di data NPWP",
                        class: {
                          "border-destructive": form.value.errors["npwp.alamat"]
                        }
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                      form.value.errors["npwp.alamat"] ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-destructive"
                      }, toDisplayString(form.value.errors["npwp.alamat"]), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$6), { for: "npwp_menikah" }, {
                          default: withCtx(() => [
                            createTextVNode("Status Menikah")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), {
                          modelValue: form.value.npwp.menikah,
                          "onUpdate:modelValue": ($event) => form.value.npwp.menikah = $event
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$9), {
                              id: "npwp_menikah",
                              class: {
                                "border-destructive": form.value.errors["npwp.menikah"]
                              }
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$a), { placeholder: "Pilih status menikah" })
                              ]),
                              _: 1
                            }, 8, ["class"]),
                            createVNode(unref(_sfc_main$b), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$c), { value: "1" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Menikah")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$c), { value: "0" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Belum Menikah")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"]),
                        form.value.errors["npwp.menikah"] ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-destructive"
                        }, toDisplayString(form.value.errors["npwp.menikah"]), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$6), { for: "npwp_anak" }, {
                          default: withCtx(() => [
                            createTextVNode("Jumlah Anak")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$7), {
                          id: "npwp_anak",
                          modelValue: form.value.npwp.anak,
                          "onUpdate:modelValue": ($event) => form.value.npwp.anak = $event,
                          modelModifiers: { number: true },
                          type: "number",
                          min: "0",
                          max: "3",
                          placeholder: "0-3",
                          class: {
                            "border-destructive": form.value.errors["npwp.anak"]
                          }
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, " Mengikuti batas data perpajakan: maksimal 3 anak. "),
                        form.value.errors["npwp.anak"] ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-destructive"
                        }, toDisplayString(form.value.errors["npwp.anak"]), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$6), { for: "npwp_kerja" }, {
                          default: withCtx(() => [
                            createTextVNode("Pekerjaan")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$7), {
                          id: "npwp_kerja",
                          modelValue: form.value.npwp.kerja,
                          "onUpdate:modelValue": ($event) => form.value.npwp.kerja = $event,
                          placeholder: "Contoh: Karyawan",
                          class: {
                            "border-destructive": form.value.errors["npwp.kerja"]
                          }
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                        form.value.errors["npwp.kerja"] ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-destructive"
                        }, toDisplayString(form.value.errors["npwp.kerja"]), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$6), { for: "npwp_office" }, {
                          default: withCtx(() => [
                            createTextVNode("Nama Perusahaan")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$7), {
                          id: "npwp_office",
                          modelValue: form.value.npwp.office,
                          "onUpdate:modelValue": ($event) => form.value.npwp.office = $event,
                          placeholder: "Contoh: PT Contoh Sejahtera",
                          class: {
                            "border-destructive": form.value.errors["npwp.office"]
                          }
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                        form.value.errors["npwp.office"] ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-destructive"
                        }, toDisplayString(form.value.errors["npwp.office"]), 1)) : createCommentVNode("", true)
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createTextVNode("Informasi NPWP")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createTextVNode(" Data ini akan disimpan ke tabel NPWP customer untuk kebutuhan perpajakan. ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), { class: "space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), { for: "npwp_nama" }, {
                        default: withCtx(() => [
                          createTextVNode("Nama NPWP")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), {
                        id: "npwp_nama",
                        modelValue: form.value.npwp.nama,
                        "onUpdate:modelValue": ($event) => form.value.npwp.nama = $event,
                        placeholder: "Nama sesuai kartu NPWP",
                        class: {
                          "border-destructive": form.value.errors["npwp.nama"]
                        }
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                      form.value.errors["npwp.nama"] ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-destructive"
                      }, toDisplayString(form.value.errors["npwp.nama"]), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), { for: "npwp_number" }, {
                        default: withCtx(() => [
                          createTextVNode("Nomor NPWP")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), {
                        id: "npwp_number",
                        modelValue: form.value.npwp.npwp,
                        "onUpdate:modelValue": ($event) => form.value.npwp.npwp = $event,
                        inputmode: "numeric",
                        maxlength: "20",
                        placeholder: "15 atau 16 digit NPWP",
                        class: {
                          "border-destructive": form.value.errors["npwp.npwp"]
                        }
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                      form.value.errors["npwp.npwp"] ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-destructive"
                      }, toDisplayString(form.value.errors["npwp.npwp"]), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), { for: "npwp_jk" }, {
                        default: withCtx(() => [
                          createTextVNode("Jenis Kelamin NPWP")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$8), {
                        modelValue: form.value.npwp.jk,
                        "onUpdate:modelValue": ($event) => form.value.npwp.jk = $event
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$9), {
                            id: "npwp_jk",
                            class: {
                              "border-destructive": form.value.errors["npwp.jk"]
                            }
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$a), { placeholder: "Pilih jenis kelamin" })
                            ]),
                            _: 1
                          }, 8, ["class"]),
                          createVNode(unref(_sfc_main$b), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$c), { value: "laki-laki" }, {
                                default: withCtx(() => [
                                  createTextVNode("Laki-laki")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), { value: "perempuan" }, {
                                default: withCtx(() => [
                                  createTextVNode("Perempuan")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"]),
                      form.value.errors["npwp.jk"] ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-destructive"
                      }, toDisplayString(form.value.errors["npwp.jk"]), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), { for: "npwp_date" }, {
                        default: withCtx(() => [
                          createTextVNode("Tanggal NPWP")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), {
                        id: "npwp_date",
                        modelValue: form.value.npwp.npwp_date,
                        "onUpdate:modelValue": ($event) => form.value.npwp.npwp_date = $event,
                        type: "date",
                        class: {
                          "border-destructive": form.value.errors["npwp.npwp_date"]
                        }
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                      form.value.errors["npwp.npwp_date"] ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-destructive"
                      }, toDisplayString(form.value.errors["npwp.npwp_date"]), 1)) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", { class: "space-y-2" }, [
                    createVNode(unref(_sfc_main$6), { for: "npwp_alamat" }, {
                      default: withCtx(() => [
                        createTextVNode("Alamat NPWP")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$n), {
                      id: "npwp_alamat",
                      modelValue: form.value.npwp.alamat,
                      "onUpdate:modelValue": ($event) => form.value.npwp.alamat = $event,
                      rows: "3",
                      placeholder: "Alamat terdaftar di data NPWP",
                      class: {
                        "border-destructive": form.value.errors["npwp.alamat"]
                      }
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                    form.value.errors["npwp.alamat"] ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "text-sm text-destructive"
                    }, toDisplayString(form.value.errors["npwp.alamat"]), 1)) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), { for: "npwp_menikah" }, {
                        default: withCtx(() => [
                          createTextVNode("Status Menikah")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$8), {
                        modelValue: form.value.npwp.menikah,
                        "onUpdate:modelValue": ($event) => form.value.npwp.menikah = $event
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$9), {
                            id: "npwp_menikah",
                            class: {
                              "border-destructive": form.value.errors["npwp.menikah"]
                            }
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$a), { placeholder: "Pilih status menikah" })
                            ]),
                            _: 1
                          }, 8, ["class"]),
                          createVNode(unref(_sfc_main$b), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$c), { value: "1" }, {
                                default: withCtx(() => [
                                  createTextVNode("Menikah")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$c), { value: "0" }, {
                                default: withCtx(() => [
                                  createTextVNode("Belum Menikah")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"]),
                      form.value.errors["npwp.menikah"] ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-destructive"
                      }, toDisplayString(form.value.errors["npwp.menikah"]), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), { for: "npwp_anak" }, {
                        default: withCtx(() => [
                          createTextVNode("Jumlah Anak")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), {
                        id: "npwp_anak",
                        modelValue: form.value.npwp.anak,
                        "onUpdate:modelValue": ($event) => form.value.npwp.anak = $event,
                        modelModifiers: { number: true },
                        type: "number",
                        min: "0",
                        max: "3",
                        placeholder: "0-3",
                        class: {
                          "border-destructive": form.value.errors["npwp.anak"]
                        }
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                      createVNode("p", { class: "text-xs text-muted-foreground" }, " Mengikuti batas data perpajakan: maksimal 3 anak. "),
                      form.value.errors["npwp.anak"] ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-destructive"
                      }, toDisplayString(form.value.errors["npwp.anak"]), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), { for: "npwp_kerja" }, {
                        default: withCtx(() => [
                          createTextVNode("Pekerjaan")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), {
                        id: "npwp_kerja",
                        modelValue: form.value.npwp.kerja,
                        "onUpdate:modelValue": ($event) => form.value.npwp.kerja = $event,
                        placeholder: "Contoh: Karyawan",
                        class: {
                          "border-destructive": form.value.errors["npwp.kerja"]
                        }
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                      form.value.errors["npwp.kerja"] ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-destructive"
                      }, toDisplayString(form.value.errors["npwp.kerja"]), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), { for: "npwp_office" }, {
                        default: withCtx(() => [
                          createTextVNode("Nama Perusahaan")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), {
                        id: "npwp_office",
                        modelValue: form.value.npwp.office,
                        "onUpdate:modelValue": ($event) => form.value.npwp.office = $event,
                        placeholder: "Contoh: PT Contoh Sejahtera",
                        class: {
                          "border-destructive": form.value.errors["npwp.office"]
                        }
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                      form.value.errors["npwp.office"] ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-destructive"
                      }, toDisplayString(form.value.errors["npwp.office"]), 1)) : createCommentVNode("", true)
                    ])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Rekening dan Catatan`);
                      } else {
                        return [
                          createTextVNode("Rekening dan Catatan")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Informasi rekening dipakai untuk proses finansial pelanggan. `);
                      } else {
                        return [
                          createTextVNode(" Informasi rekening dipakai untuk proses finansial pelanggan. ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Rekening dan Catatan")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createTextVNode(" Informasi rekening dipakai untuk proses finansial pelanggan. ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$5), { class: "space-y-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid gap-4 md:grid-cols-2"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "bank_name" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Nama Bank`);
                      } else {
                        return [
                          createTextVNode("Nama Bank")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    id: "bank_name",
                    modelValue: form.value.bank_name,
                    "onUpdate:modelValue": ($event) => form.value.bank_name = $event,
                    placeholder: "Contoh: BCA, BNI, Mandiri",
                    class: {
                      "border-destructive": form.value.errors.bank_name
                    }
                  }, null, _parent3, _scopeId2));
                  if (form.value.errors.bank_name) {
                    _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(form.value.errors.bank_name)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "bank_account" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Nomor Rekening`);
                      } else {
                        return [
                          createTextVNode("Nomor Rekening")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    id: "bank_account",
                    modelValue: form.value.bank_account,
                    "onUpdate:modelValue": ($event) => form.value.bank_account = $event,
                    placeholder: "Masukkan nomor rekening",
                    class: {
                      "border-destructive": form.value.errors.bank_account
                    }
                  }, null, _parent3, _scopeId2));
                  if (form.value.errors.bank_account) {
                    _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(form.value.errors.bank_account)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div></div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "description" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Deskripsi`);
                      } else {
                        return [
                          createTextVNode("Deskripsi")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$n), {
                    id: "description",
                    modelValue: form.value.description,
                    "onUpdate:modelValue": ($event) => form.value.description = $event,
                    placeholder: "Catatan tambahan yang informatif tentang pelanggan",
                    rows: "4",
                    class: {
                      "border-destructive": form.value.errors.description
                    }
                  }, null, _parent3, _scopeId2));
                  _push3(`<p class="text-xs text-muted-foreground"${_scopeId2}> Contoh: sumber lead, kebutuhan khusus, atau informasi follow-up. </p>`);
                  if (form.value.errors.description) {
                    _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(form.value.errors.description)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$6), { for: "bank_name" }, {
                          default: withCtx(() => [
                            createTextVNode("Nama Bank")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$7), {
                          id: "bank_name",
                          modelValue: form.value.bank_name,
                          "onUpdate:modelValue": ($event) => form.value.bank_name = $event,
                          placeholder: "Contoh: BCA, BNI, Mandiri",
                          class: {
                            "border-destructive": form.value.errors.bank_name
                          }
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                        form.value.errors.bank_name ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-destructive"
                        }, toDisplayString(form.value.errors.bank_name), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$6), { for: "bank_account" }, {
                          default: withCtx(() => [
                            createTextVNode("Nomor Rekening")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$7), {
                          id: "bank_account",
                          modelValue: form.value.bank_account,
                          "onUpdate:modelValue": ($event) => form.value.bank_account = $event,
                          placeholder: "Masukkan nomor rekening",
                          class: {
                            "border-destructive": form.value.errors.bank_account
                          }
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                        form.value.errors.bank_account ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-destructive"
                        }, toDisplayString(form.value.errors.bank_account), 1)) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), { for: "description" }, {
                        default: withCtx(() => [
                          createTextVNode("Deskripsi")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$n), {
                        id: "description",
                        modelValue: form.value.description,
                        "onUpdate:modelValue": ($event) => form.value.description = $event,
                        placeholder: "Catatan tambahan yang informatif tentang pelanggan",
                        rows: "4",
                        class: {
                          "border-destructive": form.value.errors.description
                        }
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                      createVNode("p", { class: "text-xs text-muted-foreground" }, " Contoh: sumber lead, kebutuhan khusus, atau informasi follow-up. "),
                      form.value.errors.description ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-destructive"
                      }, toDisplayString(form.value.errors.description), 1)) : createCommentVNode("", true)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createTextVNode("Rekening dan Catatan")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createTextVNode(" Informasi rekening dipakai untuk proses finansial pelanggan. ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), { class: "space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), { for: "bank_name" }, {
                        default: withCtx(() => [
                          createTextVNode("Nama Bank")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), {
                        id: "bank_name",
                        modelValue: form.value.bank_name,
                        "onUpdate:modelValue": ($event) => form.value.bank_name = $event,
                        placeholder: "Contoh: BCA, BNI, Mandiri",
                        class: {
                          "border-destructive": form.value.errors.bank_name
                        }
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                      form.value.errors.bank_name ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-destructive"
                      }, toDisplayString(form.value.errors.bank_name), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), { for: "bank_account" }, {
                        default: withCtx(() => [
                          createTextVNode("Nomor Rekening")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), {
                        id: "bank_account",
                        modelValue: form.value.bank_account,
                        "onUpdate:modelValue": ($event) => form.value.bank_account = $event,
                        placeholder: "Masukkan nomor rekening",
                        class: {
                          "border-destructive": form.value.errors.bank_account
                        }
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                      form.value.errors.bank_account ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-destructive"
                      }, toDisplayString(form.value.errors.bank_account), 1)) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", { class: "space-y-2" }, [
                    createVNode(unref(_sfc_main$6), { for: "description" }, {
                      default: withCtx(() => [
                        createTextVNode("Deskripsi")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$n), {
                      id: "description",
                      modelValue: form.value.description,
                      "onUpdate:modelValue": ($event) => form.value.description = $event,
                      placeholder: "Catatan tambahan yang informatif tentang pelanggan",
                      rows: "4",
                      class: {
                        "border-destructive": form.value.errors.description
                      }
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                    createVNode("p", { class: "text-xs text-muted-foreground" }, " Contoh: sumber lead, kebutuhan khusus, atau informasi follow-up. "),
                    form.value.errors.description ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "text-sm text-destructive"
                    }, toDisplayString(form.value.errors.description), 1)) : createCommentVNode("", true)
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(isCreateMode.value ? "Password Akun" : "Ubah Password (Opsional)")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(isCreateMode.value ? "Password Akun" : "Ubah Password (Opsional)"), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (isCreateMode.value) {
                          _push4(`<!--[--> Password opsional. Jika dikosongkan, sistem akan membuat password otomatis. <!--]-->`);
                        } else {
                          _push4(`<!--[--> Kosongkan bila tidak ingin mengubah password. <!--]-->`);
                        }
                      } else {
                        return [
                          isCreateMode.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                            createTextVNode(" Password opsional. Jika dikosongkan, sistem akan membuat password otomatis. ")
                          ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                            createTextVNode(" Kosongkan bila tidak ingin mengubah password. ")
                          ], 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(isCreateMode.value ? "Password Akun" : "Ubah Password (Opsional)"), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        isCreateMode.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                          createTextVNode(" Password opsional. Jika dikosongkan, sistem akan membuat password otomatis. ")
                        ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                          createTextVNode(" Kosongkan bila tidak ingin mengubah password. ")
                        ], 64))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$5), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid gap-4 md:grid-cols-2"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "password" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Password (Opsional)`);
                      } else {
                        return [
                          createTextVNode("Password (Opsional)")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    id: "password",
                    modelValue: form.value.password,
                    "onUpdate:modelValue": ($event) => form.value.password = $event,
                    type: "password",
                    placeholder: "Minimal 8 karakter",
                    class: {
                      "border-destructive": form.value.errors.password
                    }
                  }, null, _parent3, _scopeId2));
                  if (form.value.errors.password) {
                    _push3(`<p class="text-sm text-destructive"${_scopeId2}>${ssrInterpolate(form.value.errors.password)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { for: "password_confirmation" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Konfirmasi Password (Opsional) `);
                      } else {
                        return [
                          createTextVNode(" Konfirmasi Password (Opsional) ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    id: "password_confirmation",
                    modelValue: form.value.password_confirmation,
                    "onUpdate:modelValue": ($event) => form.value.password_confirmation = $event,
                    type: "password",
                    placeholder: "Ulangi password"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$6), { for: "password" }, {
                          default: withCtx(() => [
                            createTextVNode("Password (Opsional)")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$7), {
                          id: "password",
                          modelValue: form.value.password,
                          "onUpdate:modelValue": ($event) => form.value.password = $event,
                          type: "password",
                          placeholder: "Minimal 8 karakter",
                          class: {
                            "border-destructive": form.value.errors.password
                          }
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                        form.value.errors.password ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-destructive"
                        }, toDisplayString(form.value.errors.password), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$6), { for: "password_confirmation" }, {
                          default: withCtx(() => [
                            createTextVNode(" Konfirmasi Password (Opsional) ")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$7), {
                          id: "password_confirmation",
                          modelValue: form.value.password_confirmation,
                          "onUpdate:modelValue": ($event) => form.value.password_confirmation = $event,
                          type: "password",
                          placeholder: "Ulangi password"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(isCreateMode.value ? "Password Akun" : "Ubah Password (Opsional)"), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      isCreateMode.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                        createTextVNode(" Password opsional. Jika dikosongkan, sistem akan membuat password otomatis. ")
                      ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                        createTextVNode(" Kosongkan bila tidak ingin mengubah password. ")
                      ], 64))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), null, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), { for: "password" }, {
                        default: withCtx(() => [
                          createTextVNode("Password (Opsional)")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), {
                        id: "password",
                        modelValue: form.value.password,
                        "onUpdate:modelValue": ($event) => form.value.password = $event,
                        type: "password",
                        placeholder: "Minimal 8 karakter",
                        class: {
                          "border-destructive": form.value.errors.password
                        }
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                      form.value.errors.password ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-destructive"
                      }, toDisplayString(form.value.errors.password), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$6), { for: "password_confirmation" }, {
                        default: withCtx(() => [
                          createTextVNode(" Konfirmasi Password (Opsional) ")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), {
                        id: "password_confirmation",
                        modelValue: form.value.password_confirmation,
                        "onUpdate:modelValue": ($event) => form.value.password_confirmation = $event,
                        type: "password",
                        placeholder: "Ulangi password"
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
      }, _parent));
      _push(`<div class="flex justify-end gap-4">`);
      ssrRenderSlot(_ctx.$slots, "actions", {
        processing: form.value.processing
      }, null, _push, _parent);
      _push(`</div></form>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/customers/CustomerForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const normalizeString = (value) => {
  if (typeof value !== "string") {
    return "";
  }
  return value.trim();
};
const normalizeStringValue = (value) => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return String(value);
  }
  return normalizeString(value);
};
const normalizeNumber = (value) => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed) ? null : parsed;
  }
  return null;
};
const normalizeStatus = (value) => {
  const normalized = normalizeStringValue(value);
  if (normalized === "1" || normalized === "2" || normalized === "3") {
    return normalized;
  }
  return "1";
};
const normalizeGender = (value) => {
  if (!value) {
    return "";
  }
  const normalized = value.toLowerCase().trim();
  if (["l", "male", "laki-laki"].includes(normalized)) {
    return "laki-laki";
  }
  if (["p", "female", "perempuan"].includes(normalized)) {
    return "perempuan";
  }
  return "";
};
const normalizeMarriageStatus = (value) => {
  const normalized = String(value ?? "").toLowerCase().trim();
  if (["1", "y", "yes", "true", "menikah"].includes(normalized)) {
    return "1";
  }
  return "0";
};
const normalizeChildrenCount = (value) => {
  const parsed = normalizeNumber(value);
  if (parsed === null) {
    return 0;
  }
  if (parsed < 0) {
    return 0;
  }
  if (parsed > 3) {
    return 3;
  }
  return parsed;
};
const createDefaultFormState = () => ({
  name: "",
  username: "",
  nik: "",
  gender: "",
  email: "",
  phone: "",
  description: "",
  address: "",
  alamat: "",
  province_id: null,
  city_id: null,
  bank_name: "",
  bank_account: "",
  npwp: {
    nama: "",
    npwp: "",
    jk: "",
    npwp_date: "",
    alamat: "",
    menikah: "0",
    anak: 0,
    kerja: "Karyawan",
    office: ""
  },
  password: "",
  password_confirmation: "",
  sponsor_id: null,
  status: "1",
  package_id: "",
  level: ""
});
function useCustomerForm(mode, initialValues = {}) {
  const defaults = createDefaultFormState();
  const npwpDefaults = defaults.npwp;
  const npwpInitialValues = initialValues.npwp ?? {};
  const form = useForm({
    name: normalizeString(initialValues.name) || defaults.name,
    username: normalizeString(initialValues.username) || defaults.username,
    nik: normalizeString(initialValues.nik) || defaults.nik,
    gender: normalizeGender(initialValues.gender),
    email: normalizeString(initialValues.email) || defaults.email,
    phone: normalizeString(initialValues.phone) || defaults.phone,
    description: normalizeString(initialValues.description) || defaults.description,
    address: normalizeString(initialValues.address) || defaults.address,
    alamat: normalizeString(initialValues.alamat) || defaults.alamat,
    province_id: normalizeNumber(initialValues.province_id),
    city_id: normalizeNumber(initialValues.city_id),
    bank_name: normalizeString(initialValues.bank_name) || defaults.bank_name,
    bank_account: normalizeString(initialValues.bank_account) || defaults.bank_account,
    npwp: {
      nama: normalizeString(npwpInitialValues.nama) || npwpDefaults.nama,
      npwp: normalizeString(npwpInitialValues.npwp) || npwpDefaults.npwp,
      jk: normalizeGender(npwpInitialValues.jk),
      npwp_date: normalizeString(npwpInitialValues.npwp_date) || npwpDefaults.npwp_date,
      alamat: normalizeString(npwpInitialValues.alamat) || npwpDefaults.alamat,
      menikah: normalizeMarriageStatus(npwpInitialValues.menikah),
      anak: normalizeChildrenCount(npwpInitialValues.anak),
      kerja: normalizeString(npwpInitialValues.kerja) || npwpDefaults.kerja,
      office: normalizeString(npwpInitialValues.office) || npwpDefaults.office
    },
    password: normalizeString(initialValues.password) || defaults.password,
    password_confirmation: normalizeString(initialValues.password_confirmation) || defaults.password_confirmation,
    sponsor_id: normalizeNumber(initialValues.sponsor_id),
    status: normalizeStatus(initialValues.status),
    package_id: normalizeStringValue(initialValues.package_id) || defaults.package_id,
    level: normalizeString(initialValues.level)
  });
  const toPayload = (data) => {
    const password = normalizeString(data.password);
    const passwordConfirmation = normalizeString(
      data.password_confirmation
    );
    const anakCount = normalizeChildrenCount(data.npwp.anak);
    const payload = {
      name: normalizeString(data.name),
      username: normalizeString(data.username),
      nik: normalizeString(data.nik).replace(/\D+/g, ""),
      gender: data.gender,
      email: normalizeString(data.email),
      phone: normalizeString(data.phone),
      description: normalizeString(data.description),
      address: normalizeString(data.address),
      alamat: normalizeString(data.alamat),
      province_id: normalizeNumber(data.province_id),
      city_id: normalizeNumber(data.city_id),
      bank_name: normalizeString(data.bank_name),
      bank_account: normalizeString(data.bank_account),
      npwp: {
        nama: normalizeString(data.npwp.nama),
        npwp: normalizeString(data.npwp.npwp).replace(/\D+/g, ""),
        jk: data.npwp.jk,
        npwp_date: normalizeString(data.npwp.npwp_date),
        alamat: normalizeString(data.npwp.alamat),
        menikah: normalizeMarriageStatus(data.npwp.menikah) === "1" ? 1 : 0,
        anak: anakCount,
        kerja: normalizeString(data.npwp.kerja),
        office: normalizeString(data.npwp.office)
      },
      password: mode === "edit" && password === "" ? null : password,
      password_confirmation: mode === "edit" && passwordConfirmation === "" ? null : passwordConfirmation,
      sponsor_id: normalizeNumber(data.sponsor_id),
      package_id: normalizeNumber(data.package_id),
      level: normalizeString(data.level) || null
    };
    if (mode === "create") {
      payload.status = Number.parseInt(data.status, 10) || 1;
    }
    return payload;
  };
  return {
    form,
    toPayload
  };
}
const normalizeLocationOptions = (items) => {
  if (!items) {
    return [];
  }
  return items.map((item) => {
    const id = typeof item.id === "string" ? Number.parseInt(item.id, 10) : item.id;
    if (!Number.isFinite(id) || typeof item.name !== "string") {
      return null;
    }
    return {
      id,
      name: item.name
    };
  }).filter((item) => item !== null);
};
function useShippingLocation() {
  const provinces = ref([]);
  const cities = ref([]);
  const loadingProvinces = ref(false);
  const loadingCities = ref(false);
  const citiesCache = /* @__PURE__ */ new Map();
  const fetchProvinces = async () => {
    loadingProvinces.value = true;
    try {
      const response = await fetch("/api/shipping/provinces", {
        headers: {
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest"
        },
        credentials: "same-origin"
      });
      if (!response.ok) {
        throw new Error("Gagal memuat data provinsi.");
      }
      const payload = await response.json();
      provinces.value = normalizeLocationOptions(payload.data);
    } finally {
      loadingProvinces.value = false;
    }
  };
  const fetchCities = async (provinceId) => {
    if (!provinceId) {
      cities.value = [];
      return;
    }
    const cached = citiesCache.get(provinceId);
    if (cached) {
      cities.value = cached;
      return;
    }
    loadingCities.value = true;
    try {
      const params = new URLSearchParams({
        province_id: String(provinceId)
      });
      const response = await fetch(
        `/api/shipping/cities?${params.toString()}`,
        {
          headers: {
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest"
          },
          credentials: "same-origin"
        }
      );
      if (!response.ok) {
        throw new Error("Gagal memuat data kota/kabupaten.");
      }
      const payload = await response.json();
      const normalizedCities = normalizeLocationOptions(payload.data);
      citiesCache.set(provinceId, normalizedCities);
      cities.value = normalizedCities;
    } finally {
      loadingCities.value = false;
    }
  };
  const resetCities = () => {
    cities.value = [];
  };
  return {
    provinces,
    cities,
    loadingProvinces,
    loadingCities,
    fetchProvinces,
    fetchCities,
    resetCities
  };
}
export {
  _sfc_main as _,
  useShippingLocation as a,
  useCustomerForm as u
};
