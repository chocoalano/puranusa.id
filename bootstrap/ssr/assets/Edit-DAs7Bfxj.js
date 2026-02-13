import { defineComponent, ref, computed, unref, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, renderList, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AppLayout-D11fLPDM.js";
import { useForm, Head, Link, router } from "@inertiajs/vue3";
import axios from "axios";
import { _ as _sfc_main$7 } from "./index-BpQimeTM.js";
import { _ as _sfc_main$2 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$3, a as _sfc_main$4, d as _sfc_main$5, c as _sfc_main$6, b as _sfc_main$8 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$a } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$9 } from "./Label-16aMY2sx.js";
import { _ as _sfc_main$b } from "./Textarea-pcFPh_uS.js";
import { _ as _sfc_main$c, a as _sfc_main$d, b as _sfc_main$e, c as _sfc_main$f, d as _sfc_main$g, e as _sfc_main$h } from "./TableHeader-emcE6QAC.js";
import { ArrowLeft, Save, SendHorizontal, TestTube2, Users, RefreshCcw } from "lucide-vue-next";
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
    broadcast: {},
    recipients: {},
    defaultTemplateId: {}
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      title: props.broadcast.title,
      message: props.broadcast.message,
      template_id: props.broadcast.template_id || props.defaultTemplateId || ""
    });
    const testForm = useForm({
      name: "",
      phone: "",
      template_id: props.broadcast.template_id || props.defaultTemplateId || "",
      message: props.broadcast.message || ""
    });
    const isTestingSend = ref(false);
    const isProcessing = computed(() => props.broadcast.status === "processing" || form.processing);
    const canSend = computed(() => !isProcessing.value);
    const extractErrorMessage = (errors) => {
      const firstError = Object.values(errors)[0];
      if (typeof firstError === "string") {
        return firstError;
      }
      if (Array.isArray(firstError) && typeof firstError[0] === "string") {
        return firstError[0];
      }
      return "Terjadi kesalahan. Silakan coba lagi.";
    };
    const handleUpdate = () => {
      form.put(`/admin/whatsapp-broadcasts/${props.broadcast.id}`, {
        preserveScroll: true,
        onSuccess: (page) => {
          const flash = page.props.flash;
          if (flash?.error) {
            toast.error(flash.error);
            return;
          }
          toast.success(flash?.success || "Broadcast berhasil diperbarui.");
        },
        onError: (submitErrors) => {
          toast.error(extractErrorMessage(submitErrors));
        }
      });
    };
    const handleSend = () => {
      if (!confirm("Kirim broadcast ini ke semua nomor customer unik sekarang?")) {
        return;
      }
      router.post(`/admin/whatsapp-broadcasts/${props.broadcast.id}/send`, {}, {
        preserveScroll: true,
        onSuccess: (page) => {
          const flash = page.props.flash;
          if (flash?.error) {
            toast.error(flash.error);
            return;
          }
          toast.success(flash?.success || "Broadcast berhasil diproses.");
        },
        onError: (submitErrors) => {
          toast.error(extractErrorMessage(submitErrors));
        }
      });
    };
    const handleTestSend = () => {
      testForm.clearErrors();
      isTestingSend.value = true;
      axios.post(`/admin/whatsapp-broadcasts/${props.broadcast.id}/test-send`, {
        name: testForm.name,
        phone: testForm.phone,
        template_id: testForm.template_id,
        message: testForm.message
      }, {
        headers: {
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest"
        }
      }).then((response) => {
        toast.success(response.data?.message || "Pesan test berhasil dikirim.");
      }).catch((error) => {
        if (error.response?.status === 422) {
          const responseErrors = error.response?.data?.errors;
          if (responseErrors) {
            const normalizedErrors = Object.fromEntries(
              Object.entries(responseErrors).map(([field, message]) => [
                field,
                Array.isArray(message) ? message[0] : message
              ])
            );
            testForm.setError(normalizedErrors);
          }
        }
        toast.error(error.response?.data?.message || "Gagal mengirim pesan test.");
      }).finally(() => {
        isTestingSend.value = false;
      });
    };
    const getStatusLabel = (status) => {
      const labels = {
        draft: "Draft",
        processing: "Processing",
        sent: "Sent",
        partial: "Partial",
        failed: "Failed"
      };
      return labels[status] ?? status;
    };
    const getStatusVariant = (status) => {
      if (status === "sent") return "default";
      if (status === "partial") return "outline";
      if (status === "failed") return "destructive";
      return "secondary";
    };
    const getRecipientStatusVariant = (status) => {
      if (status === "sent") return "default";
      if (status === "failed") return "destructive";
      return "secondary";
    };
    const formatDateTime = (date) => {
      if (!date) return "-";
      return new Date(date).toLocaleString("id-ID");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: `Edit Broadcast: ${__props.broadcast.title}`
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="container mx-auto py-6 space-y-6"${_scopeId}><div class="flex items-center justify-between gap-4"${_scopeId}><div class="flex items-center gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), { href: "/admin/whatsapp-broadcasts" }, {
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
            _push2(`<div${_scopeId}><h1 class="text-3xl font-bold tracking-tight"${_scopeId}>Edit Broadcast WhatsApp</h1><p class="text-muted-foreground mt-1"${_scopeId}>${ssrInterpolate(__props.broadcast.title)}</p></div></div><div class="flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              variant: "outline",
              disabled: isProcessing.value,
              onClick: handleUpdate
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Save), { class: "h-4 w-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` Simpan `);
                } else {
                  return [
                    createVNode(unref(Save), { class: "h-4 w-4 mr-2" }),
                    createTextVNode(" Simpan ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              disabled: !canSend.value,
              onClick: handleSend
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(SendHorizontal), { class: "h-4 w-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` Kirim Broadcast `);
                } else {
                  return [
                    createVNode(unref(SendHorizontal), { class: "h-4 w-4 mr-2" }),
                    createTextVNode(" Kirim Broadcast ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="grid gap-4 md:grid-cols-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$3), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { class: "pb-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Status`);
                            } else {
                              return [
                                createTextVNode("Status")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Status")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$7), {
                          variant: getStatusVariant(__props.broadcast.status)
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(getStatusLabel(__props.broadcast.status))}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(getStatusLabel(__props.broadcast.status)), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$7), {
                            variant: getStatusVariant(__props.broadcast.status)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(getStatusLabel(__props.broadcast.status)), 1)
                            ]),
                            _: 1
                          }, 8, ["variant"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$4), { class: "pb-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Status")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$7), {
                          variant: getStatusVariant(__props.broadcast.status)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(getStatusLabel(__props.broadcast.status)), 1)
                          ]),
                          _: 1
                        }, 8, ["variant"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$3), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { class: "pb-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Total Nomor`);
                            } else {
                              return [
                                createTextVNode("Total Nomor")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Total Nomor")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { class: "text-2xl font-bold" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(__props.broadcast.total_recipients)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(__props.broadcast.total_recipients), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$4), { class: "pb-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Total Nomor")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), { class: "text-2xl font-bold" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(__props.broadcast.total_recipients), 1)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$3), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { class: "pb-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Berhasil`);
                            } else {
                              return [
                                createTextVNode("Berhasil")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Berhasil")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { class: "text-2xl font-bold text-emerald-600" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(__props.broadcast.success_recipients)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(__props.broadcast.success_recipients), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$4), { class: "pb-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Berhasil")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), { class: "text-2xl font-bold text-emerald-600" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(__props.broadcast.success_recipients), 1)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$3), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { class: "pb-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Gagal`);
                            } else {
                              return [
                                createTextVNode("Gagal")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Gagal")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { class: "text-2xl font-bold text-red-600" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(__props.broadcast.failed_recipients)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(__props.broadcast.failed_recipients), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$4), { class: "pb-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Gagal")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), { class: "text-2xl font-bold text-red-600" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(__props.broadcast.failed_recipients), 1)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><form class="space-y-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$3), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
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
                        _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Template default konfigurasi: ${ssrInterpolate(__props.defaultTemplateId || "-")}`);
                            } else {
                              return [
                                createTextVNode(" Template default konfigurasi: " + toDisplayString(__props.defaultTemplateId || "-"), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              createTextVNode("Konten Broadcast")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode(" Template default konfigurasi: " + toDisplayString(__props.defaultTemplateId || "-"), 1)
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { class: "space-y-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { for: "title" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Judul Broadcast *`);
                            } else {
                              return [
                                createTextVNode("Judul Broadcast *")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$a), {
                          id: "title",
                          modelValue: unref(form).title,
                          "onUpdate:modelValue": ($event) => unref(form).title = $event,
                          placeholder: "Contoh: Promo Akhir Pekan",
                          class: { "border-destructive": unref(form).errors.title }
                        }, null, _parent4, _scopeId3));
                        if (unref(form).errors.title) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.title)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { for: "template_id" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Qontak Template ID`);
                            } else {
                              return [
                                createTextVNode("Qontak Template ID")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$a), {
                          id: "template_id",
                          modelValue: unref(form).template_id,
                          "onUpdate:modelValue": ($event) => unref(form).template_id = $event,
                          placeholder: "Kosongkan untuk pakai default",
                          class: { "border-destructive": unref(form).errors.template_id }
                        }, null, _parent4, _scopeId3));
                        if (unref(form).errors.template_id) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.template_id)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { for: "message" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Isi Pesan *`);
                            } else {
                              return [
                                createTextVNode("Isi Pesan *")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$b), {
                          id: "message",
                          modelValue: unref(form).message,
                          "onUpdate:modelValue": ($event) => unref(form).message = $event,
                          rows: "7",
                          placeholder: "Tulis isi pesan broadcast...",
                          class: { "border-destructive": unref(form).errors.message }
                        }, null, _parent4, _scopeId3));
                        if (unref(form).errors.message) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(form).errors.message)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$9), { for: "title" }, {
                              default: withCtx(() => [
                                createTextVNode("Judul Broadcast *")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$a), {
                              id: "title",
                              modelValue: unref(form).title,
                              "onUpdate:modelValue": ($event) => unref(form).title = $event,
                              placeholder: "Contoh: Promo Akhir Pekan",
                              class: { "border-destructive": unref(form).errors.title }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            unref(form).errors.title ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.title), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$9), { for: "template_id" }, {
                              default: withCtx(() => [
                                createTextVNode("Qontak Template ID")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$a), {
                              id: "template_id",
                              modelValue: unref(form).template_id,
                              "onUpdate:modelValue": ($event) => unref(form).template_id = $event,
                              placeholder: "Kosongkan untuk pakai default",
                              class: { "border-destructive": unref(form).errors.template_id }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            unref(form).errors.template_id ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.template_id), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$9), { for: "message" }, {
                              default: withCtx(() => [
                                createTextVNode("Isi Pesan *")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$b), {
                              id: "message",
                              modelValue: unref(form).message,
                              "onUpdate:modelValue": ($event) => unref(form).message = $event,
                              rows: "7",
                              placeholder: "Tulis isi pesan broadcast...",
                              class: { "border-destructive": unref(form).errors.message }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            unref(form).errors.message ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.message), 1)) : createCommentVNode("", true)
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
                        createVNode(unref(_sfc_main$8), null, {
                          default: withCtx(() => [
                            createTextVNode("Konten Broadcast")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode(" Template default konfigurasi: " + toDisplayString(__props.defaultTemplateId || "-"), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), { class: "space-y-4" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$9), { for: "title" }, {
                            default: withCtx(() => [
                              createTextVNode("Judul Broadcast *")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$a), {
                            id: "title",
                            modelValue: unref(form).title,
                            "onUpdate:modelValue": ($event) => unref(form).title = $event,
                            placeholder: "Contoh: Promo Akhir Pekan",
                            class: { "border-destructive": unref(form).errors.title }
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                          unref(form).errors.title ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive"
                          }, toDisplayString(unref(form).errors.title), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$9), { for: "template_id" }, {
                            default: withCtx(() => [
                              createTextVNode("Qontak Template ID")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$a), {
                            id: "template_id",
                            modelValue: unref(form).template_id,
                            "onUpdate:modelValue": ($event) => unref(form).template_id = $event,
                            placeholder: "Kosongkan untuk pakai default",
                            class: { "border-destructive": unref(form).errors.template_id }
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                          unref(form).errors.template_id ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive"
                          }, toDisplayString(unref(form).errors.template_id), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$9), { for: "message" }, {
                            default: withCtx(() => [
                              createTextVNode("Isi Pesan *")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$b), {
                            id: "message",
                            modelValue: unref(form).message,
                            "onUpdate:modelValue": ($event) => unref(form).message = $event,
                            rows: "7",
                            placeholder: "Tulis isi pesan broadcast...",
                            class: { "border-destructive": unref(form).errors.message }
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                          unref(form).errors.message ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive"
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
            _push2(`</form><form class="space-y-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$3), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { class: "flex items-center gap-2" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(TestTube2), { class: "h-5 w-5" }, null, _parent5, _scopeId4));
                              _push5(` Test Kirim ke Satu Nomor `);
                            } else {
                              return [
                                createVNode(unref(TestTube2), { class: "h-5 w-5" }),
                                createTextVNode(" Test Kirim ke Satu Nomor ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Gunakan fitur ini untuk verifikasi template sebelum kirim massal. `);
                            } else {
                              return [
                                createTextVNode(" Gunakan fitur ini untuk verifikasi template sebelum kirim massal. ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$8), { class: "flex items-center gap-2" }, {
                            default: withCtx(() => [
                              createVNode(unref(TestTube2), { class: "h-5 w-5" }),
                              createTextVNode(" Test Kirim ke Satu Nomor ")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode(" Gunakan fitur ini untuk verifikasi template sebelum kirim massal. ")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { class: "space-y-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="grid gap-4 md:grid-cols-2"${_scopeId3}><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { for: "test_name" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Nama Tujuan`);
                            } else {
                              return [
                                createTextVNode("Nama Tujuan")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$a), {
                          id: "test_name",
                          modelValue: unref(testForm).name,
                          "onUpdate:modelValue": ($event) => unref(testForm).name = $event,
                          placeholder: "Contoh: Admin QA",
                          class: { "border-destructive": unref(testForm).errors.name }
                        }, null, _parent4, _scopeId3));
                        if (unref(testForm).errors.name) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(testForm).errors.name)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { for: "test_phone" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`No. WhatsApp Tujuan *`);
                            } else {
                              return [
                                createTextVNode("No. WhatsApp Tujuan *")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$a), {
                          id: "test_phone",
                          modelValue: unref(testForm).phone,
                          "onUpdate:modelValue": ($event) => unref(testForm).phone = $event,
                          placeholder: "Contoh: 081234567890",
                          class: { "border-destructive": unref(testForm).errors.phone }
                        }, null, _parent4, _scopeId3));
                        _push4(`<p class="text-xs text-muted-foreground"${_scopeId3}> Otomatis dinormalisasi ke format \`62xxxxxxxxxx\` </p>`);
                        if (unref(testForm).errors.phone) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(testForm).errors.phone)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div></div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { for: "test_template_id" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Template ID (Opsional)`);
                            } else {
                              return [
                                createTextVNode("Template ID (Opsional)")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$a), {
                          id: "test_template_id",
                          modelValue: unref(testForm).template_id,
                          "onUpdate:modelValue": ($event) => unref(testForm).template_id = $event,
                          placeholder: "Kosongkan untuk pakai template dari broadcast",
                          class: { "border-destructive": unref(testForm).errors.template_id }
                        }, null, _parent4, _scopeId3));
                        if (unref(testForm).errors.template_id) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(testForm).errors.template_id)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$9), { for: "test_message" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Pesan Test`);
                            } else {
                              return [
                                createTextVNode("Pesan Test")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$b), {
                          id: "test_message",
                          modelValue: unref(testForm).message,
                          "onUpdate:modelValue": ($event) => unref(testForm).message = $event,
                          rows: "4",
                          class: { "border-destructive": unref(testForm).errors.message }
                        }, null, _parent4, _scopeId3));
                        _push4(`<p class="text-xs text-muted-foreground"${_scopeId3}> Default mengikuti isi pesan broadcast saat ini. </p>`);
                        if (unref(testForm).errors.message) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(unref(testForm).errors.message)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="flex justify-end"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$2), {
                          type: "submit",
                          disabled: isTestingSend.value
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(TestTube2), { class: "h-4 w-4 mr-2" }, null, _parent5, _scopeId4));
                              _push5(` ${ssrInterpolate(isTestingSend.value ? "Mengirim..." : "Kirim Test")}`);
                            } else {
                              return [
                                createVNode(unref(TestTube2), { class: "h-4 w-4 mr-2" }),
                                createTextVNode(" " + toDisplayString(isTestingSend.value ? "Mengirim..." : "Kirim Test"), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), { for: "test_name" }, {
                                default: withCtx(() => [
                                  createTextVNode("Nama Tujuan")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), {
                                id: "test_name",
                                modelValue: unref(testForm).name,
                                "onUpdate:modelValue": ($event) => unref(testForm).name = $event,
                                placeholder: "Contoh: Admin QA",
                                class: { "border-destructive": unref(testForm).errors.name }
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              unref(testForm).errors.name ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(testForm).errors.name), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), { for: "test_phone" }, {
                                default: withCtx(() => [
                                  createTextVNode("No. WhatsApp Tujuan *")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), {
                                id: "test_phone",
                                modelValue: unref(testForm).phone,
                                "onUpdate:modelValue": ($event) => unref(testForm).phone = $event,
                                placeholder: "Contoh: 081234567890",
                                class: { "border-destructive": unref(testForm).errors.phone }
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Otomatis dinormalisasi ke format `62xxxxxxxxxx` "),
                              unref(testForm).errors.phone ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(testForm).errors.phone), 1)) : createCommentVNode("", true)
                            ])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$9), { for: "test_template_id" }, {
                              default: withCtx(() => [
                                createTextVNode("Template ID (Opsional)")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$a), {
                              id: "test_template_id",
                              modelValue: unref(testForm).template_id,
                              "onUpdate:modelValue": ($event) => unref(testForm).template_id = $event,
                              placeholder: "Kosongkan untuk pakai template dari broadcast",
                              class: { "border-destructive": unref(testForm).errors.template_id }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            unref(testForm).errors.template_id ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(testForm).errors.template_id), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$9), { for: "test_message" }, {
                              default: withCtx(() => [
                                createTextVNode("Pesan Test")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$b), {
                              id: "test_message",
                              modelValue: unref(testForm).message,
                              "onUpdate:modelValue": ($event) => unref(testForm).message = $event,
                              rows: "4",
                              class: { "border-destructive": unref(testForm).errors.message }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, " Default mengikuti isi pesan broadcast saat ini. "),
                            unref(testForm).errors.message ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(testForm).errors.message), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "flex justify-end" }, [
                            createVNode(unref(_sfc_main$2), {
                              type: "submit",
                              disabled: isTestingSend.value
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(TestTube2), { class: "h-4 w-4 mr-2" }),
                                createTextVNode(" " + toDisplayString(isTestingSend.value ? "Mengirim..." : "Kirim Test"), 1)
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
                        createVNode(unref(_sfc_main$8), { class: "flex items-center gap-2" }, {
                          default: withCtx(() => [
                            createVNode(unref(TestTube2), { class: "h-5 w-5" }),
                            createTextVNode(" Test Kirim ke Satu Nomor ")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode(" Gunakan fitur ini untuk verifikasi template sebelum kirim massal. ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), { class: "space-y-4" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$9), { for: "test_name" }, {
                              default: withCtx(() => [
                                createTextVNode("Nama Tujuan")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$a), {
                              id: "test_name",
                              modelValue: unref(testForm).name,
                              "onUpdate:modelValue": ($event) => unref(testForm).name = $event,
                              placeholder: "Contoh: Admin QA",
                              class: { "border-destructive": unref(testForm).errors.name }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            unref(testForm).errors.name ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(testForm).errors.name), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$9), { for: "test_phone" }, {
                              default: withCtx(() => [
                                createTextVNode("No. WhatsApp Tujuan *")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$a), {
                              id: "test_phone",
                              modelValue: unref(testForm).phone,
                              "onUpdate:modelValue": ($event) => unref(testForm).phone = $event,
                              placeholder: "Contoh: 081234567890",
                              class: { "border-destructive": unref(testForm).errors.phone }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, " Otomatis dinormalisasi ke format `62xxxxxxxxxx` "),
                            unref(testForm).errors.phone ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(testForm).errors.phone), 1)) : createCommentVNode("", true)
                          ])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$9), { for: "test_template_id" }, {
                            default: withCtx(() => [
                              createTextVNode("Template ID (Opsional)")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$a), {
                            id: "test_template_id",
                            modelValue: unref(testForm).template_id,
                            "onUpdate:modelValue": ($event) => unref(testForm).template_id = $event,
                            placeholder: "Kosongkan untuk pakai template dari broadcast",
                            class: { "border-destructive": unref(testForm).errors.template_id }
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                          unref(testForm).errors.template_id ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive"
                          }, toDisplayString(unref(testForm).errors.template_id), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$9), { for: "test_message" }, {
                            default: withCtx(() => [
                              createTextVNode("Pesan Test")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$b), {
                            id: "test_message",
                            modelValue: unref(testForm).message,
                            "onUpdate:modelValue": ($event) => unref(testForm).message = $event,
                            rows: "4",
                            class: { "border-destructive": unref(testForm).errors.message }
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, " Default mengikuti isi pesan broadcast saat ini. "),
                          unref(testForm).errors.message ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive"
                          }, toDisplayString(unref(testForm).errors.message), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex justify-end" }, [
                          createVNode(unref(_sfc_main$2), {
                            type: "submit",
                            disabled: isTestingSend.value
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(TestTube2), { class: "h-4 w-4 mr-2" }),
                              createTextVNode(" " + toDisplayString(isTestingSend.value ? "Mengirim..." : "Kirim Test"), 1)
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
            _push2(`</form>`);
            _push2(ssrRenderComponent(unref(_sfc_main$3), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { class: "flex items-center gap-2" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Users), { class: "h-5 w-5" }, null, _parent5, _scopeId4));
                              _push5(` Riwayat Penerima `);
                            } else {
                              return [
                                createVNode(unref(Users), { class: "h-5 w-5" }),
                                createTextVNode(" Riwayat Penerima ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Menampilkan maksimal 250 data penerima terakhir `);
                            } else {
                              return [
                                createTextVNode(" Menampilkan maksimal 250 data penerima terakhir ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$8), { class: "flex items-center gap-2" }, {
                            default: withCtx(() => [
                              createVNode(unref(Users), { class: "h-5 w-5" }),
                              createTextVNode(" Riwayat Penerima ")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode(" Menampilkan maksimal 250 data penerima terakhir ")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { class: "p-0" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$c), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$d), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$e), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(unref(_sfc_main$f), null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Nama`);
                                              } else {
                                                return [
                                                  createTextVNode("Nama")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(unref(_sfc_main$f), null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`No. HP`);
                                              } else {
                                                return [
                                                  createTextVNode("No. HP")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(unref(_sfc_main$f), null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Status`);
                                              } else {
                                                return [
                                                  createTextVNode("Status")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(unref(_sfc_main$f), null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Response`);
                                              } else {
                                                return [
                                                  createTextVNode("Response")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(unref(_sfc_main$f), null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Waktu Kirim`);
                                              } else {
                                                return [
                                                  createTextVNode("Waktu Kirim")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(unref(_sfc_main$f), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Nama")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$f), null, {
                                              default: withCtx(() => [
                                                createTextVNode("No. HP")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$f), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Status")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$f), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Response")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$f), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Waktu Kirim")
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
                                      createVNode(unref(_sfc_main$e), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$f), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Nama")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$f), null, {
                                            default: withCtx(() => [
                                              createTextVNode("No. HP")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$f), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Status")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$f), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Response")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$f), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Waktu Kirim")
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
                              _push5(ssrRenderComponent(unref(_sfc_main$g), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    if (__props.recipients.length === 0) {
                                      _push6(ssrRenderComponent(unref(_sfc_main$e), null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(unref(_sfc_main$h), {
                                              colspan: "5",
                                              class: "text-center py-8 text-muted-foreground"
                                            }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(unref(RefreshCcw), { class: "h-10 w-10 mx-auto mb-2 opacity-20" }, null, _parent8, _scopeId7));
                                                  _push8(` Belum ada data penerima `);
                                                } else {
                                                  return [
                                                    createVNode(unref(RefreshCcw), { class: "h-10 w-10 mx-auto mb-2 opacity-20" }),
                                                    createTextVNode(" Belum ada data penerima ")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(unref(_sfc_main$h), {
                                                colspan: "5",
                                                class: "text-center py-8 text-muted-foreground"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(RefreshCcw), { class: "h-10 w-10 mx-auto mb-2 opacity-20" }),
                                                  createTextVNode(" Belum ada data penerima ")
                                                ]),
                                                _: 1
                                              })
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      _push6(`<!---->`);
                                    }
                                    _push6(`<!--[-->`);
                                    ssrRenderList(__props.recipients, (recipient) => {
                                      _push6(ssrRenderComponent(unref(_sfc_main$e), {
                                        key: recipient.id
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(unref(_sfc_main$h), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(recipient.customer_name || "-")}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(recipient.customer_name || "-"), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$h), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(recipient.normalized_phone)}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(recipient.normalized_phone), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$h), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(unref(_sfc_main$7), {
                                                    variant: getRecipientStatusVariant(recipient.status)
                                                  }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`${ssrInterpolate(recipient.status)}`);
                                                      } else {
                                                        return [
                                                          createTextVNode(toDisplayString(recipient.status), 1)
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                } else {
                                                  return [
                                                    createVNode(unref(_sfc_main$7), {
                                                      variant: getRecipientStatusVariant(recipient.status)
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(recipient.status), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["variant"])
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$h), { class: "text-sm text-muted-foreground" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(recipient.response_message || "-")}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(recipient.response_message || "-"), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$h), { class: "text-sm text-muted-foreground" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(formatDateTime(recipient.sent_at))}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(formatDateTime(recipient.sent_at)), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(unref(_sfc_main$h), null, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(recipient.customer_name || "-"), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$h), null, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(recipient.normalized_phone), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$h), null, {
                                                default: withCtx(() => [
                                                  createVNode(unref(_sfc_main$7), {
                                                    variant: getRecipientStatusVariant(recipient.status)
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(recipient.status), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["variant"])
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$h), { class: "text-sm text-muted-foreground" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(recipient.response_message || "-"), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$h), { class: "text-sm text-muted-foreground" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(formatDateTime(recipient.sent_at)), 1)
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    });
                                    _push6(`<!--]-->`);
                                  } else {
                                    return [
                                      __props.recipients.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$e), { key: 0 }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$h), {
                                            colspan: "5",
                                            class: "text-center py-8 text-muted-foreground"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(RefreshCcw), { class: "h-10 w-10 mx-auto mb-2 opacity-20" }),
                                              createTextVNode(" Belum ada data penerima ")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })) : createCommentVNode("", true),
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.recipients, (recipient) => {
                                        return openBlock(), createBlock(unref(_sfc_main$e), {
                                          key: recipient.id
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$h), null, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(recipient.customer_name || "-"), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$h), null, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(recipient.normalized_phone), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$h), null, {
                                              default: withCtx(() => [
                                                createVNode(unref(_sfc_main$7), {
                                                  variant: getRecipientStatusVariant(recipient.status)
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(recipient.status), 1)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["variant"])
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$h), { class: "text-sm text-muted-foreground" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(recipient.response_message || "-"), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$h), { class: "text-sm text-muted-foreground" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(formatDateTime(recipient.sent_at)), 1)
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 2
                                        }, 1024);
                                      }), 128))
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$d), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$e), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$f), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Nama")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$f), null, {
                                          default: withCtx(() => [
                                            createTextVNode("No. HP")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$f), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Status")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$f), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Response")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$f), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Waktu Kirim")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$g), null, {
                                  default: withCtx(() => [
                                    __props.recipients.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$e), { key: 0 }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$h), {
                                          colspan: "5",
                                          class: "text-center py-8 text-muted-foreground"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(RefreshCcw), { class: "h-10 w-10 mx-auto mb-2 opacity-20" }),
                                            createTextVNode(" Belum ada data penerima ")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })) : createCommentVNode("", true),
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.recipients, (recipient) => {
                                      return openBlock(), createBlock(unref(_sfc_main$e), {
                                        key: recipient.id
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$h), null, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(recipient.customer_name || "-"), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$h), null, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(recipient.normalized_phone), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$h), null, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$7), {
                                                variant: getRecipientStatusVariant(recipient.status)
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(recipient.status), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["variant"])
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$h), { class: "text-sm text-muted-foreground" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(recipient.response_message || "-"), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$h), { class: "text-sm text-muted-foreground" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(formatDateTime(recipient.sent_at)), 1)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1024);
                                    }), 128))
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
                          createVNode(unref(_sfc_main$c), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$d), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$e), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$f), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Nama")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$f), null, {
                                        default: withCtx(() => [
                                          createTextVNode("No. HP")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$f), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Status")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$f), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Response")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$f), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Waktu Kirim")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$g), null, {
                                default: withCtx(() => [
                                  __props.recipients.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$e), { key: 0 }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$h), {
                                        colspan: "5",
                                        class: "text-center py-8 text-muted-foreground"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(RefreshCcw), { class: "h-10 w-10 mx-auto mb-2 opacity-20" }),
                                          createTextVNode(" Belum ada data penerima ")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })) : createCommentVNode("", true),
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.recipients, (recipient) => {
                                    return openBlock(), createBlock(unref(_sfc_main$e), {
                                      key: recipient.id
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$h), null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(recipient.customer_name || "-"), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$h), null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(recipient.normalized_phone), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$h), null, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$7), {
                                              variant: getRecipientStatusVariant(recipient.status)
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(recipient.status), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["variant"])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$h), { class: "text-sm text-muted-foreground" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(recipient.response_message || "-"), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$h), { class: "text-sm text-muted-foreground" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(formatDateTime(recipient.sent_at)), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1024);
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$8), { class: "flex items-center gap-2" }, {
                          default: withCtx(() => [
                            createVNode(unref(Users), { class: "h-5 w-5" }),
                            createTextVNode(" Riwayat Penerima ")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode(" Menampilkan maksimal 250 data penerima terakhir ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), { class: "p-0" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$c), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$d), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$f), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Nama")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$f), null, {
                                      default: withCtx(() => [
                                        createTextVNode("No. HP")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$f), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Status")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$f), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Response")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$f), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Waktu Kirim")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$g), null, {
                              default: withCtx(() => [
                                __props.recipients.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$e), { key: 0 }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$h), {
                                      colspan: "5",
                                      class: "text-center py-8 text-muted-foreground"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(RefreshCcw), { class: "h-10 w-10 mx-auto mb-2 opacity-20" }),
                                        createTextVNode(" Belum ada data penerima ")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true),
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.recipients, (recipient) => {
                                  return openBlock(), createBlock(unref(_sfc_main$e), {
                                    key: recipient.id
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$h), null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(recipient.customer_name || "-"), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$h), null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(recipient.normalized_phone), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$h), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$7), {
                                            variant: getRecipientStatusVariant(recipient.status)
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(recipient.status), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["variant"])
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$h), { class: "text-sm text-muted-foreground" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(recipient.response_message || "-"), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$h), { class: "text-sm text-muted-foreground" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(formatDateTime(recipient.sent_at)), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024);
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
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "container mx-auto py-6 space-y-6" }, [
                createVNode("div", { class: "flex items-center justify-between gap-4" }, [
                  createVNode("div", { class: "flex items-center gap-4" }, [
                    createVNode(unref(Link), { href: "/admin/whatsapp-broadcasts" }, {
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
                      createVNode("h1", { class: "text-3xl font-bold tracking-tight" }, "Edit Broadcast WhatsApp"),
                      createVNode("p", { class: "text-muted-foreground mt-1" }, toDisplayString(__props.broadcast.title), 1)
                    ])
                  ]),
                  createVNode("div", { class: "flex items-center gap-2" }, [
                    createVNode(unref(_sfc_main$2), {
                      variant: "outline",
                      disabled: isProcessing.value,
                      onClick: handleUpdate
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Save), { class: "h-4 w-4 mr-2" }),
                        createTextVNode(" Simpan ")
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    createVNode(unref(_sfc_main$2), {
                      disabled: !canSend.value,
                      onClick: handleSend
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(SendHorizontal), { class: "h-4 w-4 mr-2" }),
                        createTextVNode(" Kirim Broadcast ")
                      ]),
                      _: 1
                    }, 8, ["disabled"])
                  ])
                ]),
                createVNode("div", { class: "grid gap-4 md:grid-cols-4" }, [
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$4), { class: "pb-2" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Status")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$7), {
                            variant: getStatusVariant(__props.broadcast.status)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(getStatusLabel(__props.broadcast.status)), 1)
                            ]),
                            _: 1
                          }, 8, ["variant"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$4), { class: "pb-2" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Total Nomor")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), { class: "text-2xl font-bold" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(__props.broadcast.total_recipients), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$4), { class: "pb-2" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Berhasil")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), { class: "text-2xl font-bold text-emerald-600" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(__props.broadcast.success_recipients), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$4), { class: "pb-2" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Gagal")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), { class: "text-2xl font-bold text-red-600" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(__props.broadcast.failed_recipients), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                createVNode("form", {
                  class: "space-y-6",
                  onSubmit: withModifiers(handleUpdate, ["prevent"])
                }, [
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$4), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              createTextVNode("Konten Broadcast")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode(" Template default konfigurasi: " + toDisplayString(__props.defaultTemplateId || "-"), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), { class: "space-y-4" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$9), { for: "title" }, {
                              default: withCtx(() => [
                                createTextVNode("Judul Broadcast *")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$a), {
                              id: "title",
                              modelValue: unref(form).title,
                              "onUpdate:modelValue": ($event) => unref(form).title = $event,
                              placeholder: "Contoh: Promo Akhir Pekan",
                              class: { "border-destructive": unref(form).errors.title }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            unref(form).errors.title ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.title), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$9), { for: "template_id" }, {
                              default: withCtx(() => [
                                createTextVNode("Qontak Template ID")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$a), {
                              id: "template_id",
                              modelValue: unref(form).template_id,
                              "onUpdate:modelValue": ($event) => unref(form).template_id = $event,
                              placeholder: "Kosongkan untuk pakai default",
                              class: { "border-destructive": unref(form).errors.template_id }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            unref(form).errors.template_id ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.template_id), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$9), { for: "message" }, {
                              default: withCtx(() => [
                                createTextVNode("Isi Pesan *")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$b), {
                              id: "message",
                              modelValue: unref(form).message,
                              "onUpdate:modelValue": ($event) => unref(form).message = $event,
                              rows: "7",
                              placeholder: "Tulis isi pesan broadcast...",
                              class: { "border-destructive": unref(form).errors.message }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            unref(form).errors.message ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(form).errors.message), 1)) : createCommentVNode("", true)
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ], 32),
                createVNode("form", {
                  class: "space-y-6",
                  onSubmit: withModifiers(handleTestSend, ["prevent"])
                }, [
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$4), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$8), { class: "flex items-center gap-2" }, {
                            default: withCtx(() => [
                              createVNode(unref(TestTube2), { class: "h-5 w-5" }),
                              createTextVNode(" Test Kirim ke Satu Nomor ")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode(" Gunakan fitur ini untuk verifikasi template sebelum kirim massal. ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), { class: "space-y-4" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), { for: "test_name" }, {
                                default: withCtx(() => [
                                  createTextVNode("Nama Tujuan")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), {
                                id: "test_name",
                                modelValue: unref(testForm).name,
                                "onUpdate:modelValue": ($event) => unref(testForm).name = $event,
                                placeholder: "Contoh: Admin QA",
                                class: { "border-destructive": unref(testForm).errors.name }
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              unref(testForm).errors.name ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(testForm).errors.name), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$9), { for: "test_phone" }, {
                                default: withCtx(() => [
                                  createTextVNode("No. WhatsApp Tujuan *")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), {
                                id: "test_phone",
                                modelValue: unref(testForm).phone,
                                "onUpdate:modelValue": ($event) => unref(testForm).phone = $event,
                                placeholder: "Contoh: 081234567890",
                                class: { "border-destructive": unref(testForm).errors.phone }
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Otomatis dinormalisasi ke format `62xxxxxxxxxx` "),
                              unref(testForm).errors.phone ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, toDisplayString(unref(testForm).errors.phone), 1)) : createCommentVNode("", true)
                            ])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$9), { for: "test_template_id" }, {
                              default: withCtx(() => [
                                createTextVNode("Template ID (Opsional)")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$a), {
                              id: "test_template_id",
                              modelValue: unref(testForm).template_id,
                              "onUpdate:modelValue": ($event) => unref(testForm).template_id = $event,
                              placeholder: "Kosongkan untuk pakai template dari broadcast",
                              class: { "border-destructive": unref(testForm).errors.template_id }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            unref(testForm).errors.template_id ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(testForm).errors.template_id), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(_sfc_main$9), { for: "test_message" }, {
                              default: withCtx(() => [
                                createTextVNode("Pesan Test")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$b), {
                              id: "test_message",
                              modelValue: unref(testForm).message,
                              "onUpdate:modelValue": ($event) => unref(testForm).message = $event,
                              rows: "4",
                              class: { "border-destructive": unref(testForm).errors.message }
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, " Default mengikuti isi pesan broadcast saat ini. "),
                            unref(testForm).errors.message ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(unref(testForm).errors.message), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "flex justify-end" }, [
                            createVNode(unref(_sfc_main$2), {
                              type: "submit",
                              disabled: isTestingSend.value
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(TestTube2), { class: "h-4 w-4 mr-2" }),
                                createTextVNode(" " + toDisplayString(isTestingSend.value ? "Mengirim..." : "Kirim Test"), 1)
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
                ], 32),
                createVNode(unref(_sfc_main$3), null, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$8), { class: "flex items-center gap-2" }, {
                          default: withCtx(() => [
                            createVNode(unref(Users), { class: "h-5 w-5" }),
                            createTextVNode(" Riwayat Penerima ")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode(" Menampilkan maksimal 250 data penerima terakhir ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), { class: "p-0" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$c), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$d), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$f), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Nama")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$f), null, {
                                      default: withCtx(() => [
                                        createTextVNode("No. HP")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$f), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Status")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$f), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Response")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$f), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Waktu Kirim")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$g), null, {
                              default: withCtx(() => [
                                __props.recipients.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$e), { key: 0 }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$h), {
                                      colspan: "5",
                                      class: "text-center py-8 text-muted-foreground"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(RefreshCcw), { class: "h-10 w-10 mx-auto mb-2 opacity-20" }),
                                        createTextVNode(" Belum ada data penerima ")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true),
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.recipients, (recipient) => {
                                  return openBlock(), createBlock(unref(_sfc_main$e), {
                                    key: recipient.id
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$h), null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(recipient.customer_name || "-"), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$h), null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(recipient.normalized_phone), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$h), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$7), {
                                            variant: getRecipientStatusVariant(recipient.status)
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(recipient.status), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["variant"])
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$h), { class: "text-sm text-muted-foreground" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(recipient.response_message || "-"), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$h), { class: "text-sm text-muted-foreground" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(formatDateTime(recipient.sent_at)), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/WhatsAppBroadcasts/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
