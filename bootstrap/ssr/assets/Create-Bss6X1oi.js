import { defineComponent, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$a } from "./InputError-BhTWS2NZ.js";
import { _ as _sfc_main$2 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5, d as _sfc_main$6, c as _sfc_main$7 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$9 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$8 } from "./Label-16aMY2sx.js";
import { _ as _sfc_main$b, a as _sfc_main$c, b as _sfc_main$d, c as _sfc_main$e, d as _sfc_main$f } from "./SelectValue-BUnv4mQg.js";
import { _ as _sfc_main$1 } from "./AppLayout-B3xU4M63.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { Gift, ArrowLeft, Save } from "lucide-vue-next";
import { toast } from "vue-sonner";
import "class-variance-authority";
import "reka-ui";
import "clsx";
import "tailwind-merge";
import "@vueuse/core";
import "./DropdownMenuTrigger-B1v6pHML.js";
import "./index-Jhngbhhu.js";
import "./AvatarImage-DWFQMckn.js";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Create",
  __ssrInlineRender: true,
  setup(__props) {
    const breadcrumbItems = [
      { title: "Pengaturan", href: "#" },
      { title: "Promotions Rewards", href: "/admin/settings/promotions-rewards" },
      { title: "Tambah", href: "/admin/settings/promotions-rewards/create" }
    ];
    const form = useForm({
      code: "",
      name: "",
      reward: "",
      value: 0,
      bv: 0,
      start: "",
      end: "",
      status: "1"
    });
    const submit = () => {
      form.post("/admin/settings/promotions-rewards", {
        onSuccess: () => {
          toast.success("Promotions Reward berhasil ditambahkan");
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ breadcrumbs: breadcrumbItems }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Tambah Promotions Reward" }, null, _parent2, _scopeId));
            _push2(`<div class="flex h-full flex-1 flex-col gap-6 p-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="text-3xl font-bold tracking-tight flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Gift), { class: "h-8 w-8" }, null, _parent2, _scopeId));
            _push2(` Tambah Promotions Reward </h1><p class="text-muted-foreground mt-1"${_scopeId}> Buat reward baru dengan periode waktu </p></div>`);
            _push2(ssrRenderComponent(unref(Link), { href: "/admin/settings/promotions-rewards" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$2), { variant: "outline" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(ArrowLeft), { class: "h-4 w-4 mr-2" }, null, _parent4, _scopeId3));
                        _push4(` Kembali `);
                      } else {
                        return [
                          createVNode(unref(ArrowLeft), { class: "h-4 w-4 mr-2" }),
                          createTextVNode(" Kembali ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$2), { variant: "outline" }, {
                      default: withCtx(() => [
                        createVNode(unref(ArrowLeft), { class: "h-4 w-4 mr-2" }),
                        createTextVNode(" Kembali ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><form${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$3), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Informasi Reward`);
                            } else {
                              return [
                                createTextVNode("Informasi Reward")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Isi detail reward promosi`);
                            } else {
                              return [
                                createTextVNode("Isi detail reward promosi")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Informasi Reward")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("Isi detail reward promosi")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { class: "space-y-6" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="grid gap-6 md:grid-cols-2"${_scopeId3}><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { for: "code" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Kode`);
                            } else {
                              return [
                                createTextVNode("Kode")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          id: "code",
                          modelValue: unref(form).code,
                          "onUpdate:modelValue": ($event) => unref(form).code = $event,
                          placeholder: "Masukkan kode (opsional)",
                          maxlength: "10"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_sfc_main$a, {
                          message: unref(form).errors.code
                        }, null, _parent4, _scopeId3));
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { for: "name" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Nama Reward <span class="text-red-500"${_scopeId4}>*</span>`);
                            } else {
                              return [
                                createTextVNode("Nama Reward "),
                                createVNode("span", { class: "text-red-500" }, "*")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          id: "name",
                          modelValue: unref(form).name,
                          "onUpdate:modelValue": ($event) => unref(form).name = $event,
                          placeholder: "Masukkan nama reward",
                          required: ""
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_sfc_main$a, {
                          message: unref(form).errors.name
                        }, null, _parent4, _scopeId3));
                        _push4(`</div><div class="space-y-2 md:col-span-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { for: "reward" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Deskripsi Reward`);
                            } else {
                              return [
                                createTextVNode("Deskripsi Reward")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          id: "reward",
                          modelValue: unref(form).reward,
                          "onUpdate:modelValue": ($event) => unref(form).reward = $event,
                          placeholder: "Deskripsi atau detail reward"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_sfc_main$a, {
                          message: unref(form).errors.reward
                        }, null, _parent4, _scopeId3));
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { for: "value" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Nilai (IDR) <span class="text-red-500"${_scopeId4}>*</span>`);
                            } else {
                              return [
                                createTextVNode("Nilai (IDR) "),
                                createVNode("span", { class: "text-red-500" }, "*")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          id: "value",
                          modelValue: unref(form).value,
                          "onUpdate:modelValue": ($event) => unref(form).value = $event,
                          type: "number",
                          min: "0",
                          step: "0.01",
                          required: ""
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_sfc_main$a, {
                          message: unref(form).errors.value
                        }, null, _parent4, _scopeId3));
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { for: "bv" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`BV (Business Value) <span class="text-red-500"${_scopeId4}>*</span>`);
                            } else {
                              return [
                                createTextVNode("BV (Business Value) "),
                                createVNode("span", { class: "text-red-500" }, "*")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          id: "bv",
                          modelValue: unref(form).bv,
                          "onUpdate:modelValue": ($event) => unref(form).bv = $event,
                          type: "number",
                          min: "0",
                          step: "0.01",
                          required: ""
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_sfc_main$a, {
                          message: unref(form).errors.bv
                        }, null, _parent4, _scopeId3));
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { for: "start" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Tanggal Mulai <span class="text-red-500"${_scopeId4}>*</span>`);
                            } else {
                              return [
                                createTextVNode("Tanggal Mulai "),
                                createVNode("span", { class: "text-red-500" }, "*")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          id: "start",
                          modelValue: unref(form).start,
                          "onUpdate:modelValue": ($event) => unref(form).start = $event,
                          type: "date",
                          required: ""
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_sfc_main$a, {
                          message: unref(form).errors.start
                        }, null, _parent4, _scopeId3));
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { for: "end" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Tanggal Berakhir <span class="text-red-500"${_scopeId4}>*</span>`);
                            } else {
                              return [
                                createTextVNode("Tanggal Berakhir "),
                                createVNode("span", { class: "text-red-500" }, "*")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$9), {
                          id: "end",
                          modelValue: unref(form).end,
                          "onUpdate:modelValue": ($event) => unref(form).end = $event,
                          type: "date",
                          required: ""
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_sfc_main$a, {
                          message: unref(form).errors.end
                        }, null, _parent4, _scopeId3));
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { for: "status" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Status <span class="text-red-500"${_scopeId4}>*</span>`);
                            } else {
                              return [
                                createTextVNode("Status "),
                                createVNode("span", { class: "text-red-500" }, "*")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$b), {
                          modelValue: unref(form).status,
                          "onUpdate:modelValue": ($event) => unref(form).status = $event
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$c), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$d), { placeholder: "Pilih status" }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$d), { placeholder: "Pilih status" })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$e), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$f), { value: "1" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Aktif`);
                                        } else {
                                          return [
                                            createTextVNode("Aktif")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$f), { value: "0" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Tidak Aktif`);
                                        } else {
                                          return [
                                            createTextVNode("Tidak Aktif")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$f), { value: "1" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Aktif")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$f), { value: "0" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Tidak Aktif")
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
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$d), { placeholder: "Pilih status" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$f), { value: "1" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Aktif")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$f), { value: "0" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Tidak Aktif")
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
                        _push4(ssrRenderComponent(_sfc_main$a, {
                          message: unref(form).errors.status
                        }, null, _parent4, _scopeId3));
                        _push4(`</div></div><div class="flex justify-end gap-4 pt-4"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Link), { href: "/admin/settings/promotions-rewards" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$2), {
                                type: "button",
                                variant: "outline"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Batal`);
                                  } else {
                                    return [
                                      createTextVNode("Batal")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
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
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$2), {
                          type: "submit",
                          disabled: unref(form).processing
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Save), { class: "h-4 w-4 mr-2" }, null, _parent5, _scopeId4));
                              _push5(` ${ssrInterpolate(unref(form).processing ? "Menyimpan..." : "Simpan")}`);
                            } else {
                              return [
                                createVNode(unref(Save), { class: "h-4 w-4 mr-2" }),
                                createTextVNode(" " + toDisplayString(unref(form).processing ? "Menyimpan..." : "Simpan"), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "grid gap-6 md:grid-cols-2" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$8), { for: "code" }, {
                                default: withCtx(() => [
                                  createTextVNode("Kode")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$9), {
                                id: "code",
                                modelValue: unref(form).code,
                                "onUpdate:modelValue": ($event) => unref(form).code = $event,
                                placeholder: "Masukkan kode (opsional)",
                                maxlength: "10"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_sfc_main$a, {
                                message: unref(form).errors.code
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$8), { for: "name" }, {
                                default: withCtx(() => [
                                  createTextVNode("Nama Reward "),
                                  createVNode("span", { class: "text-red-500" }, "*")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$9), {
                                id: "name",
                                modelValue: unref(form).name,
                                "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                placeholder: "Masukkan nama reward",
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_sfc_main$a, {
                                message: unref(form).errors.name
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", { class: "space-y-2 md:col-span-2" }, [
                              createVNode(unref(_sfc_main$8), { for: "reward" }, {
                                default: withCtx(() => [
                                  createTextVNode("Deskripsi Reward")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$9), {
                                id: "reward",
                                modelValue: unref(form).reward,
                                "onUpdate:modelValue": ($event) => unref(form).reward = $event,
                                placeholder: "Deskripsi atau detail reward"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_sfc_main$a, {
                                message: unref(form).errors.reward
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$8), { for: "value" }, {
                                default: withCtx(() => [
                                  createTextVNode("Nilai (IDR) "),
                                  createVNode("span", { class: "text-red-500" }, "*")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$9), {
                                id: "value",
                                modelValue: unref(form).value,
                                "onUpdate:modelValue": ($event) => unref(form).value = $event,
                                type: "number",
                                min: "0",
                                step: "0.01",
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_sfc_main$a, {
                                message: unref(form).errors.value
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$8), { for: "bv" }, {
                                default: withCtx(() => [
                                  createTextVNode("BV (Business Value) "),
                                  createVNode("span", { class: "text-red-500" }, "*")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$9), {
                                id: "bv",
                                modelValue: unref(form).bv,
                                "onUpdate:modelValue": ($event) => unref(form).bv = $event,
                                type: "number",
                                min: "0",
                                step: "0.01",
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_sfc_main$a, {
                                message: unref(form).errors.bv
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$8), { for: "start" }, {
                                default: withCtx(() => [
                                  createTextVNode("Tanggal Mulai "),
                                  createVNode("span", { class: "text-red-500" }, "*")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$9), {
                                id: "start",
                                modelValue: unref(form).start,
                                "onUpdate:modelValue": ($event) => unref(form).start = $event,
                                type: "date",
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_sfc_main$a, {
                                message: unref(form).errors.start
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$8), { for: "end" }, {
                                default: withCtx(() => [
                                  createTextVNode("Tanggal Berakhir "),
                                  createVNode("span", { class: "text-red-500" }, "*")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$9), {
                                id: "end",
                                modelValue: unref(form).end,
                                "onUpdate:modelValue": ($event) => unref(form).end = $event,
                                type: "date",
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_sfc_main$a, {
                                message: unref(form).errors.end
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$8), { for: "status" }, {
                                default: withCtx(() => [
                                  createTextVNode("Status "),
                                  createVNode("span", { class: "text-red-500" }, "*")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$b), {
                                modelValue: unref(form).status,
                                "onUpdate:modelValue": ($event) => unref(form).status = $event
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$c), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$d), { placeholder: "Pilih status" })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$e), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$f), { value: "1" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Aktif")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$f), { value: "0" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Tidak Aktif")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_sfc_main$a, {
                                message: unref(form).errors.status
                              }, null, 8, ["message"])
                            ])
                          ]),
                          createVNode("div", { class: "flex justify-end gap-4 pt-4" }, [
                            createVNode(unref(Link), { href: "/admin/settings/promotions-rewards" }, {
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
                                createVNode(unref(Save), { class: "h-4 w-4 mr-2" }),
                                createTextVNode(" " + toDisplayString(unref(form).processing ? "Menyimpan..." : "Simpan"), 1)
                              ]),
                              _: 1
                            }, 8, ["disabled"])
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
                            createTextVNode("Informasi Reward")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode("Isi detail reward promosi")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$7), { class: "space-y-6" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "grid gap-6 md:grid-cols-2" }, [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "code" }, {
                              default: withCtx(() => [
                                createTextVNode("Kode")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$9), {
                              id: "code",
                              modelValue: unref(form).code,
                              "onUpdate:modelValue": ($event) => unref(form).code = $event,
                              placeholder: "Masukkan kode (opsional)",
                              maxlength: "10"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_sfc_main$a, {
                              message: unref(form).errors.code
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "name" }, {
                              default: withCtx(() => [
                                createTextVNode("Nama Reward "),
                                createVNode("span", { class: "text-red-500" }, "*")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$9), {
                              id: "name",
                              modelValue: unref(form).name,
                              "onUpdate:modelValue": ($event) => unref(form).name = $event,
                              placeholder: "Masukkan nama reward",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_sfc_main$a, {
                              message: unref(form).errors.name
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", { class: "space-y-2 md:col-span-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "reward" }, {
                              default: withCtx(() => [
                                createTextVNode("Deskripsi Reward")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$9), {
                              id: "reward",
                              modelValue: unref(form).reward,
                              "onUpdate:modelValue": ($event) => unref(form).reward = $event,
                              placeholder: "Deskripsi atau detail reward"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_sfc_main$a, {
                              message: unref(form).errors.reward
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "value" }, {
                              default: withCtx(() => [
                                createTextVNode("Nilai (IDR) "),
                                createVNode("span", { class: "text-red-500" }, "*")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$9), {
                              id: "value",
                              modelValue: unref(form).value,
                              "onUpdate:modelValue": ($event) => unref(form).value = $event,
                              type: "number",
                              min: "0",
                              step: "0.01",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_sfc_main$a, {
                              message: unref(form).errors.value
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "bv" }, {
                              default: withCtx(() => [
                                createTextVNode("BV (Business Value) "),
                                createVNode("span", { class: "text-red-500" }, "*")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$9), {
                              id: "bv",
                              modelValue: unref(form).bv,
                              "onUpdate:modelValue": ($event) => unref(form).bv = $event,
                              type: "number",
                              min: "0",
                              step: "0.01",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_sfc_main$a, {
                              message: unref(form).errors.bv
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "start" }, {
                              default: withCtx(() => [
                                createTextVNode("Tanggal Mulai "),
                                createVNode("span", { class: "text-red-500" }, "*")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$9), {
                              id: "start",
                              modelValue: unref(form).start,
                              "onUpdate:modelValue": ($event) => unref(form).start = $event,
                              type: "date",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_sfc_main$a, {
                              message: unref(form).errors.start
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "end" }, {
                              default: withCtx(() => [
                                createTextVNode("Tanggal Berakhir "),
                                createVNode("span", { class: "text-red-500" }, "*")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$9), {
                              id: "end",
                              modelValue: unref(form).end,
                              "onUpdate:modelValue": ($event) => unref(form).end = $event,
                              type: "date",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_sfc_main$a, {
                              message: unref(form).errors.end
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$8), { for: "status" }, {
                              default: withCtx(() => [
                                createTextVNode("Status "),
                                createVNode("span", { class: "text-red-500" }, "*")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$b), {
                              modelValue: unref(form).status,
                              "onUpdate:modelValue": ($event) => unref(form).status = $event
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$d), { placeholder: "Pilih status" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$f), { value: "1" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Aktif")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$f), { value: "0" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Tidak Aktif")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_sfc_main$a, {
                              message: unref(form).errors.status
                            }, null, 8, ["message"])
                          ])
                        ]),
                        createVNode("div", { class: "flex justify-end gap-4 pt-4" }, [
                          createVNode(unref(Link), { href: "/admin/settings/promotions-rewards" }, {
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
                              createVNode(unref(Save), { class: "h-4 w-4 mr-2" }),
                              createTextVNode(" " + toDisplayString(unref(form).processing ? "Menyimpan..." : "Simpan"), 1)
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</form></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Tambah Promotions Reward" }),
              createVNode("div", { class: "flex h-full flex-1 flex-col gap-6 p-6" }, [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("div", null, [
                    createVNode("h1", { class: "text-3xl font-bold tracking-tight flex items-center gap-2" }, [
                      createVNode(unref(Gift), { class: "h-8 w-8" }),
                      createTextVNode(" Tambah Promotions Reward ")
                    ]),
                    createVNode("p", { class: "text-muted-foreground mt-1" }, " Buat reward baru dengan periode waktu ")
                  ]),
                  createVNode(unref(Link), { href: "/admin/settings/promotions-rewards" }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$2), { variant: "outline" }, {
                        default: withCtx(() => [
                          createVNode(unref(ArrowLeft), { class: "h-4 w-4 mr-2" }),
                          createTextVNode(" Kembali ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                createVNode("form", {
                  onSubmit: withModifiers(submit, ["prevent"])
                }, [
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$4), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Informasi Reward")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode("Isi detail reward promosi")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$7), { class: "space-y-6" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "grid gap-6 md:grid-cols-2" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$8), { for: "code" }, {
                                default: withCtx(() => [
                                  createTextVNode("Kode")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$9), {
                                id: "code",
                                modelValue: unref(form).code,
                                "onUpdate:modelValue": ($event) => unref(form).code = $event,
                                placeholder: "Masukkan kode (opsional)",
                                maxlength: "10"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_sfc_main$a, {
                                message: unref(form).errors.code
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$8), { for: "name" }, {
                                default: withCtx(() => [
                                  createTextVNode("Nama Reward "),
                                  createVNode("span", { class: "text-red-500" }, "*")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$9), {
                                id: "name",
                                modelValue: unref(form).name,
                                "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                placeholder: "Masukkan nama reward",
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_sfc_main$a, {
                                message: unref(form).errors.name
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", { class: "space-y-2 md:col-span-2" }, [
                              createVNode(unref(_sfc_main$8), { for: "reward" }, {
                                default: withCtx(() => [
                                  createTextVNode("Deskripsi Reward")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$9), {
                                id: "reward",
                                modelValue: unref(form).reward,
                                "onUpdate:modelValue": ($event) => unref(form).reward = $event,
                                placeholder: "Deskripsi atau detail reward"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_sfc_main$a, {
                                message: unref(form).errors.reward
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$8), { for: "value" }, {
                                default: withCtx(() => [
                                  createTextVNode("Nilai (IDR) "),
                                  createVNode("span", { class: "text-red-500" }, "*")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$9), {
                                id: "value",
                                modelValue: unref(form).value,
                                "onUpdate:modelValue": ($event) => unref(form).value = $event,
                                type: "number",
                                min: "0",
                                step: "0.01",
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_sfc_main$a, {
                                message: unref(form).errors.value
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$8), { for: "bv" }, {
                                default: withCtx(() => [
                                  createTextVNode("BV (Business Value) "),
                                  createVNode("span", { class: "text-red-500" }, "*")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$9), {
                                id: "bv",
                                modelValue: unref(form).bv,
                                "onUpdate:modelValue": ($event) => unref(form).bv = $event,
                                type: "number",
                                min: "0",
                                step: "0.01",
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_sfc_main$a, {
                                message: unref(form).errors.bv
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$8), { for: "start" }, {
                                default: withCtx(() => [
                                  createTextVNode("Tanggal Mulai "),
                                  createVNode("span", { class: "text-red-500" }, "*")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$9), {
                                id: "start",
                                modelValue: unref(form).start,
                                "onUpdate:modelValue": ($event) => unref(form).start = $event,
                                type: "date",
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_sfc_main$a, {
                                message: unref(form).errors.start
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$8), { for: "end" }, {
                                default: withCtx(() => [
                                  createTextVNode("Tanggal Berakhir "),
                                  createVNode("span", { class: "text-red-500" }, "*")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$9), {
                                id: "end",
                                modelValue: unref(form).end,
                                "onUpdate:modelValue": ($event) => unref(form).end = $event,
                                type: "date",
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_sfc_main$a, {
                                message: unref(form).errors.end
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$8), { for: "status" }, {
                                default: withCtx(() => [
                                  createTextVNode("Status "),
                                  createVNode("span", { class: "text-red-500" }, "*")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$b), {
                                modelValue: unref(form).status,
                                "onUpdate:modelValue": ($event) => unref(form).status = $event
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$c), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$d), { placeholder: "Pilih status" })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$e), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$f), { value: "1" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Aktif")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$f), { value: "0" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Tidak Aktif")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_sfc_main$a, {
                                message: unref(form).errors.status
                              }, null, 8, ["message"])
                            ])
                          ]),
                          createVNode("div", { class: "flex justify-end gap-4 pt-4" }, [
                            createVNode(unref(Link), { href: "/admin/settings/promotions-rewards" }, {
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
                                createVNode(unref(Save), { class: "h-4 w-4 mr-2" }),
                                createTextVNode(" " + toDisplayString(unref(form).processing ? "Menyimpan..." : "Simpan"), 1)
                              ]),
                              _: 1
                            }, 8, ["disabled"])
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/Rewards/Promotions/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
