import { defineComponent, ref, computed, unref, withCtx, createVNode, createTextVNode, withKeys, createBlock, createCommentVNode, openBlock, toDisplayString, Fragment, renderList, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AppLayout-D11fLPDM.js";
import { Head, Link, router } from "@inertiajs/vue3";
import axios from "axios";
import { _ as _sfc_main$B } from "./ConfirmDialog-CTU0x0KG.js";
import { _ as _sfc_main$m } from "./index-BpQimeTM.js";
import { _ as _sfc_main$2 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$6, a as _sfc_main$7, b as _sfc_main$8, c as _sfc_main$9 } from "./CardTitle-sqUG0LTw.js";
import { _ as _sfc_main$t, a as _sfc_main$u, b as _sfc_main$v, c as _sfc_main$w, d as _sfc_main$x, e as _sfc_main$A } from "./DialogTrigger-DpE8BjOt.js";
import { _ as _sfc_main$a } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$y } from "./Label-16aMY2sx.js";
import { _ as _sfc_main$z } from "./Textarea-pcFPh_uS.js";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5 } from "./index-D3PKcwoM.js";
import { _ as _sfc_main$b, a as _sfc_main$c, b as _sfc_main$d, c as _sfc_main$e, d as _sfc_main$f } from "./SelectValue-BUnv4mQg.js";
import { _ as _sfc_main$n, a as _sfc_main$o, b as _sfc_main$p, f as _sfc_main$q, g as _sfc_main$r, c as _sfc_main$s } from "./DropdownMenuTrigger-B1v6pHML.js";
import { _ as _sfc_main$g, a as _sfc_main$h, b as _sfc_main$i, c as _sfc_main$j, d as _sfc_main$k, e as _sfc_main$l } from "./TableHeader-emcE6QAC.js";
import { Plus, AlertTriangle, CheckCircle2, Search, MessageSquare, MoreVertical, Pencil, SendHorizontal, TestTube2, Trash2 } from "lucide-vue-next";
import { toast } from "vue-sonner";
import "class-variance-authority";
import "reka-ui";
import "@vueuse/core";
import "./index-3UqiGNe9.js";
import "./AvatarImage-DWFQMckn.js";
import "./index-Bfu0FVt6.js";
import "./AppLogoIcon-CtV9aC-8.js";
import "./BreadcrumbSeparator-YMzfzP6z.js";
import "./AlertDialogTrigger-DIWb7xue.js";
import "clsx";
import "tailwind-merge";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    broadcasts: {},
    filters: {},
    defaultTemplateId: {}
  },
  setup(__props) {
    const props = __props;
    const searchQuery = ref(props.filters.search || "");
    const selectedStatus = ref(props.filters.status || "all");
    const performSearch = () => {
      router.get("/admin/whatsapp-broadcasts", {
        search: searchQuery.value || void 0,
        status: selectedStatus.value !== "all" ? selectedStatus.value : void 0
      }, { preserveState: true, preserveScroll: true });
    };
    const clearFilters = () => {
      searchQuery.value = "";
      selectedStatus.value = "all";
      router.get("/admin/whatsapp-broadcasts");
    };
    const sendDialogOpen = ref(false);
    const deleteDialogOpen = ref(false);
    const sendTarget = ref(null);
    const deleteTarget = ref(null);
    const testDialogOpen = ref(false);
    const testTarget = ref(null);
    const isSubmittingTest = ref(false);
    const testTemplateId = ref("");
    const testMessage = ref("");
    const testRecipients = ref([]);
    const testErrors = ref({});
    const testGeneralError = ref("");
    let nextRecipientId = 1;
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
    const openSendDialog = (broadcast) => {
      sendTarget.value = broadcast;
      sendDialogOpen.value = true;
    };
    const setSendDialogOpen = (open) => {
      sendDialogOpen.value = open;
      if (!open) {
        sendTarget.value = null;
      }
    };
    const handleSendBroadcast = () => {
      if (!sendTarget.value) return;
      router.post(`/admin/whatsapp-broadcasts/${sendTarget.value.id}/send`, {}, {
        preserveScroll: true,
        onSuccess: (page) => {
          const flash = page.props.flash;
          if (flash?.error) {
            toast.error(flash.error);
            return;
          }
          toast.success(flash?.success || "Broadcast sedang diproses.");
        },
        onError: (submitErrors) => {
          toast.error(extractErrorMessage(submitErrors));
        },
        onFinish: () => {
          setSendDialogOpen(false);
        }
      });
    };
    const openDeleteDialog = (broadcast) => {
      deleteTarget.value = broadcast;
      deleteDialogOpen.value = true;
    };
    const setDeleteDialogOpen = (open) => {
      deleteDialogOpen.value = open;
      if (!open) {
        deleteTarget.value = null;
      }
    };
    const createRecipientRow = () => ({
      id: nextRecipientId++,
      name: "",
      phone: ""
    });
    const resetTestDialogForm = (broadcast) => {
      testTemplateId.value = broadcast?.template_id || props.defaultTemplateId || "";
      testMessage.value = broadcast?.message || "";
      testRecipients.value = [createRecipientRow()];
      testErrors.value = {};
      testGeneralError.value = "";
    };
    const openTestDialog = (broadcast) => {
      testTarget.value = broadcast;
      resetTestDialogForm(broadcast);
      testDialogOpen.value = true;
    };
    const setTestDialogOpen = (open) => {
      testDialogOpen.value = open;
      if (!open) {
        testTarget.value = null;
        resetTestDialogForm(null);
      }
    };
    const addTestRecipient = () => {
      if (testRecipients.value.length >= 50) {
        toast.error("Maksimal 50 nomor per sekali test.");
        return;
      }
      testRecipients.value.push(createRecipientRow());
    };
    const removeTestRecipient = (index) => {
      if (testRecipients.value.length === 1) {
        testRecipients.value = [createRecipientRow()];
        return;
      }
      testRecipients.value.splice(index, 1);
    };
    const getTestFieldError = (index, field) => {
      return testErrors.value[`recipients.${index}.${field}`] || "";
    };
    const normalizeErrors = (errors) => {
      return Object.fromEntries(
        Object.entries(errors).map(([field, message]) => [
          field,
          Array.isArray(message) ? message[0] || "" : message
        ])
      );
    };
    const handleTestMultipleSend = () => {
      if (!testTarget.value) return;
      isSubmittingTest.value = true;
      testErrors.value = {};
      testGeneralError.value = "";
      axios.post(`/admin/whatsapp-broadcasts/${testTarget.value.id}/test-send-multiple`, {
        template_id: testTemplateId.value,
        message: testMessage.value,
        recipients: testRecipients.value.map((recipient) => ({
          name: recipient.name,
          phone: recipient.phone
        }))
      }, {
        headers: {
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest"
        }
      }).then((response) => {
        const queuedCount = Number(response.data?.queued_count || 0);
        const duplicateCount = Number(response.data?.duplicates_skipped || 0);
        let toastMessage = response.data?.message || "Test kirim masuk antrean queue.";
        if (queuedCount > 0 && duplicateCount > 0) {
          toastMessage += ` (${duplicateCount} nomor duplikat diabaikan)`;
        }
        toast.success(toastMessage);
        setTestDialogOpen(false);
      }).catch((error) => {
        const responseData = error.response?.data;
        const responseErrors = responseData?.errors;
        if (responseErrors) {
          testErrors.value = normalizeErrors(responseErrors);
        }
        testGeneralError.value = responseData?.message || "Gagal memasukkan test kirim ke antrean.";
        toast.error(testGeneralError.value);
      }).finally(() => {
        isSubmittingTest.value = false;
      });
    };
    const handleDeleteBroadcast = () => {
      if (!deleteTarget.value) return;
      router.delete(`/admin/whatsapp-broadcasts/${deleteTarget.value.id}`, {
        preserveScroll: true,
        onSuccess: (page) => {
          const flash = page.props.flash;
          if (flash?.error) {
            toast.error(flash.error);
            return;
          }
          toast.success(flash?.success || "Riwayat berhasil dihapus.");
        },
        onError: (submitErrors) => {
          toast.error(extractErrorMessage(submitErrors));
        },
        onFinish: () => {
          setDeleteDialogOpen(false);
        }
      });
    };
    const statusVariantMap = {
      draft: "outline",
      processing: "secondary",
      sent: "default",
      partial: "secondary",
      failed: "destructive"
    };
    const getStatusVariant = (status) => statusVariantMap[status];
    const formatDateTime = (date) => {
      if (!date) return "-";
      return new Date(date).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" });
    };
    const paginationLinks = computed(() => props.broadcasts.links ?? []);
    const getPaginationVariant = (link) => {
      return link.active ? "default" : "outline";
    };
    const formatPaginationLabel = (label) => {
      return label.replace(/<[^>]*>/g, "").replace(/&laquo;/g, "«").replace(/&raquo;/g, "»").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").trim();
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Broadcast WhatsApp" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="container mx-auto py-8 space-y-8"${_scopeId}><div class="flex flex-col md:flex-row md:items-center justify-between gap-4"${_scopeId}><div${_scopeId}><h1 class="text-3xl font-extrabold tracking-tight"${_scopeId}>Broadcast WhatsApp</h1><p class="text-muted-foreground"${_scopeId}>Kelola pengiriman pesan massal ke database pelanggan unik.</p></div>`);
            _push2(ssrRenderComponent(unref(Link), { href: "/admin/whatsapp-broadcasts/create" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$2), { class: "font-bold" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Plus), { class: "h-5 w-5 mr-2" }, null, _parent4, _scopeId3));
                        _push4(` Buat Broadcast Baru `);
                      } else {
                        return [
                          createVNode(unref(Plus), { class: "h-5 w-5 mr-2" }),
                          createTextVNode(" Buat Broadcast Baru ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$2), { class: "font-bold" }, {
                      default: withCtx(() => [
                        createVNode(unref(Plus), { class: "h-5 w-5 mr-2" }),
                        createTextVNode(" Buat Broadcast Baru ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$3), { class: "border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(AlertTriangle), { class: "h-5 w-5 text-amber-600 dark:text-amber-500" }, null, _parent3, _scopeId2));
                  _push3(`<div class="ml-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { class: "text-amber-800 dark:text-amber-400 font-bold text-base" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Penting: Ketentuan Penerimaan Pesan `);
                      } else {
                        return [
                          createTextVNode(" Penting: Ketentuan Penerimaan Pesan ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$5), { class: "text-amber-700 dark:text-amber-300 mt-2 space-y-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p${_scopeId3}>Berdasarkan kebijakan <strong${_scopeId3}>WhatsApp Business API</strong>, pesan broadcast Anda hanya akan terkirim dengan sukses jika pelanggan memenuhi kriteria berikut:</p><ul class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 list-none mt-2"${_scopeId3}><li class="flex items-center gap-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(CheckCircle2), { class: "h-4 w-4 text-amber-600" }, null, _parent4, _scopeId3));
                        _push4(` Pernah berinteraksi dengan nomor WA Anda. </li><li class="flex items-center gap-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(CheckCircle2), { class: "h-4 w-4 text-amber-600" }, null, _parent4, _scopeId3));
                        _push4(` Pelanggan menyimpan nomor Anda di kontak. </li><li class="flex items-center gap-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(CheckCircle2), { class: "h-4 w-4 text-amber-600" }, null, _parent4, _scopeId3));
                        _push4(` Menggunakan Template ID yang telah disetujui. </li><li class="flex items-center gap-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(CheckCircle2), { class: "h-4 w-4 text-amber-600" }, null, _parent4, _scopeId3));
                        _push4(` Tidak sedang memblokir nomor resmi Anda. </li></ul><p class="text-xs italic mt-2 font-semibold"${_scopeId3}> * Pesan ke nomor yang tidak dikenal/tanpa interaksi berisiko gagal terkirim (Undelivered) atau memicu pemblokiran nomor oleh WhatsApp. </p>`);
                      } else {
                        return [
                          createVNode("p", null, [
                            createTextVNode("Berdasarkan kebijakan "),
                            createVNode("strong", null, "WhatsApp Business API"),
                            createTextVNode(", pesan broadcast Anda hanya akan terkirim dengan sukses jika pelanggan memenuhi kriteria berikut:")
                          ]),
                          createVNode("ul", { class: "grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 list-none mt-2" }, [
                            createVNode("li", { class: "flex items-center gap-2" }, [
                              createVNode(unref(CheckCircle2), { class: "h-4 w-4 text-amber-600" }),
                              createTextVNode(" Pernah berinteraksi dengan nomor WA Anda. ")
                            ]),
                            createVNode("li", { class: "flex items-center gap-2" }, [
                              createVNode(unref(CheckCircle2), { class: "h-4 w-4 text-amber-600" }),
                              createTextVNode(" Pelanggan menyimpan nomor Anda di kontak. ")
                            ]),
                            createVNode("li", { class: "flex items-center gap-2" }, [
                              createVNode(unref(CheckCircle2), { class: "h-4 w-4 text-amber-600" }),
                              createTextVNode(" Menggunakan Template ID yang telah disetujui. ")
                            ]),
                            createVNode("li", { class: "flex items-center gap-2" }, [
                              createVNode(unref(CheckCircle2), { class: "h-4 w-4 text-amber-600" }),
                              createTextVNode(" Tidak sedang memblokir nomor resmi Anda. ")
                            ])
                          ]),
                          createVNode("p", { class: "text-xs italic mt-2 font-semibold" }, " * Pesan ke nomor yang tidak dikenal/tanpa interaksi berisiko gagal terkirim (Undelivered) atau memicu pemblokiran nomor oleh WhatsApp. ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode(unref(AlertTriangle), { class: "h-5 w-5 text-amber-600 dark:text-amber-500" }),
                    createVNode("div", { class: "ml-2" }, [
                      createVNode(unref(_sfc_main$4), { class: "text-amber-800 dark:text-amber-400 font-bold text-base" }, {
                        default: withCtx(() => [
                          createTextVNode(" Penting: Ketentuan Penerimaan Pesan ")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$5), { class: "text-amber-700 dark:text-amber-300 mt-2 space-y-2" }, {
                        default: withCtx(() => [
                          createVNode("p", null, [
                            createTextVNode("Berdasarkan kebijakan "),
                            createVNode("strong", null, "WhatsApp Business API"),
                            createTextVNode(", pesan broadcast Anda hanya akan terkirim dengan sukses jika pelanggan memenuhi kriteria berikut:")
                          ]),
                          createVNode("ul", { class: "grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 list-none mt-2" }, [
                            createVNode("li", { class: "flex items-center gap-2" }, [
                              createVNode(unref(CheckCircle2), { class: "h-4 w-4 text-amber-600" }),
                              createTextVNode(" Pernah berinteraksi dengan nomor WA Anda. ")
                            ]),
                            createVNode("li", { class: "flex items-center gap-2" }, [
                              createVNode(unref(CheckCircle2), { class: "h-4 w-4 text-amber-600" }),
                              createTextVNode(" Pelanggan menyimpan nomor Anda di kontak. ")
                            ]),
                            createVNode("li", { class: "flex items-center gap-2" }, [
                              createVNode(unref(CheckCircle2), { class: "h-4 w-4 text-amber-600" }),
                              createTextVNode(" Menggunakan Template ID yang telah disetujui. ")
                            ]),
                            createVNode("li", { class: "flex items-center gap-2" }, [
                              createVNode(unref(CheckCircle2), { class: "h-4 w-4 text-amber-600" }),
                              createTextVNode(" Tidak sedang memblokir nomor resmi Anda. ")
                            ])
                          ]),
                          createVNode("p", { class: "text-xs italic mt-2 font-semibold" }, " * Pesan ke nomor yang tidak dikenal/tanpa interaksi berisiko gagal terkirim (Undelivered) atau memicu pemblokiran nomor oleh WhatsApp. ")
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$6), { class: "shadow-sm" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { class: "pb-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$8), { class: "text-lg flex items-center gap-2" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Search), { class: "h-5 w-5 text-muted-foreground" }, null, _parent5, _scopeId4));
                              _push5(` Filter Data `);
                            } else {
                              return [
                                createVNode(unref(Search), { class: "h-5 w-5 text-muted-foreground" }),
                                createTextVNode(" Filter Data ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$8), { class: "text-lg flex items-center gap-2" }, {
                            default: withCtx(() => [
                              createVNode(unref(Search), { class: "h-5 w-5 text-muted-foreground" }),
                              createTextVNode(" Filter Data ")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$9), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex flex-col md:flex-row gap-4"${_scopeId3}><div class="flex-1 relative"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Search), { class: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$a), {
                          modelValue: searchQuery.value,
                          "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                          placeholder: "Cari berdasarkan judul atau pesan...",
                          class: "pl-10",
                          onKeydown: performSearch
                        }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$b), {
                          modelValue: selectedStatus.value,
                          "onUpdate:modelValue": ($event) => selectedStatus.value = $event
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$c), { class: "w-full md:w-[200px]" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$d), { placeholder: "Semua Status" }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$d), { placeholder: "Semua Status" })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$e), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$f), { value: "all" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Semua Status`);
                                        } else {
                                          return [
                                            createTextVNode("Semua Status")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$f), { value: "draft" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Draft (Belum Kirim)`);
                                        } else {
                                          return [
                                            createTextVNode("Draft (Belum Kirim)")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$f), { value: "processing" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Sedang Diproses`);
                                        } else {
                                          return [
                                            createTextVNode("Sedang Diproses")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$f), { value: "sent" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Selesai Terkirim`);
                                        } else {
                                          return [
                                            createTextVNode("Selesai Terkirim")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$f), { value: "failed" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Gagal Total`);
                                        } else {
                                          return [
                                            createTextVNode("Gagal Total")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$f), { value: "all" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Semua Status")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$f), { value: "draft" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Draft (Belum Kirim)")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$f), { value: "processing" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Sedang Diproses")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$f), { value: "sent" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Selesai Terkirim")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$f), { value: "failed" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Gagal Total")
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
                                createVNode(unref(_sfc_main$c), { class: "w-full md:w-[200px]" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$d), { placeholder: "Semua Status" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$f), { value: "all" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Semua Status")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$f), { value: "draft" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Draft (Belum Kirim)")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$f), { value: "processing" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Sedang Diproses")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$f), { value: "sent" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Selesai Terkirim")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$f), { value: "failed" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Gagal Total")
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
                        _push4(`<div class="flex gap-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$2), { onClick: performSearch }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Terapkan Filter`);
                            } else {
                              return [
                                createTextVNode("Terapkan Filter")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        if (searchQuery.value || selectedStatus.value !== "all") {
                          _push4(ssrRenderComponent(unref(_sfc_main$2), {
                            variant: "ghost",
                            onClick: clearFilters
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` Reset `);
                              } else {
                                return [
                                  createTextVNode(" Reset ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex flex-col md:flex-row gap-4" }, [
                            createVNode("div", { class: "flex-1 relative" }, [
                              createVNode(unref(Search), { class: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
                              createVNode(unref(_sfc_main$a), {
                                modelValue: searchQuery.value,
                                "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                                placeholder: "Cari berdasarkan judul atau pesan...",
                                class: "pl-10",
                                onKeydown: withKeys(performSearch, ["enter"])
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode(unref(_sfc_main$b), {
                              modelValue: selectedStatus.value,
                              "onUpdate:modelValue": ($event) => selectedStatus.value = $event
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$c), { class: "w-full md:w-[200px]" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$d), { placeholder: "Semua Status" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$f), { value: "all" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Semua Status")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$f), { value: "draft" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Draft (Belum Kirim)")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$f), { value: "processing" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Sedang Diproses")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$f), { value: "sent" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Selesai Terkirim")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$f), { value: "failed" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Gagal Total")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode("div", { class: "flex gap-2" }, [
                              createVNode(unref(_sfc_main$2), { onClick: performSearch }, {
                                default: withCtx(() => [
                                  createTextVNode("Terapkan Filter")
                                ]),
                                _: 1
                              }),
                              searchQuery.value || selectedStatus.value !== "all" ? (openBlock(), createBlock(unref(_sfc_main$2), {
                                key: 0,
                                variant: "ghost",
                                onClick: clearFilters
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Reset ")
                                ]),
                                _: 1
                              })) : createCommentVNode("", true)
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$7), { class: "pb-4" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$8), { class: "text-lg flex items-center gap-2" }, {
                          default: withCtx(() => [
                            createVNode(unref(Search), { class: "h-5 w-5 text-muted-foreground" }),
                            createTextVNode(" Filter Data ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$9), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex flex-col md:flex-row gap-4" }, [
                          createVNode("div", { class: "flex-1 relative" }, [
                            createVNode(unref(Search), { class: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
                            createVNode(unref(_sfc_main$a), {
                              modelValue: searchQuery.value,
                              "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                              placeholder: "Cari berdasarkan judul atau pesan...",
                              class: "pl-10",
                              onKeydown: withKeys(performSearch, ["enter"])
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode(unref(_sfc_main$b), {
                            modelValue: selectedStatus.value,
                            "onUpdate:modelValue": ($event) => selectedStatus.value = $event
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$c), { class: "w-full md:w-[200px]" }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$d), { placeholder: "Semua Status" })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$e), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$f), { value: "all" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Semua Status")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$f), { value: "draft" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Draft (Belum Kirim)")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$f), { value: "processing" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Sedang Diproses")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$f), { value: "sent" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Selesai Terkirim")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$f), { value: "failed" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Gagal Total")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("div", { class: "flex gap-2" }, [
                            createVNode(unref(_sfc_main$2), { onClick: performSearch }, {
                              default: withCtx(() => [
                                createTextVNode("Terapkan Filter")
                              ]),
                              _: 1
                            }),
                            searchQuery.value || selectedStatus.value !== "all" ? (openBlock(), createBlock(unref(_sfc_main$2), {
                              key: 0,
                              variant: "ghost",
                              onClick: clearFilters
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Reset ")
                              ]),
                              _: 1
                            })) : createCommentVNode("", true)
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
            _push2(ssrRenderComponent(unref(_sfc_main$6), { class: "shadow-sm overflow-hidden" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$g), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$h), { class: "bg-muted/50" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$i), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$j), { class: "font-bold" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Campaign &amp; Pesan`);
                                        } else {
                                          return [
                                            createTextVNode("Campaign & Pesan")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$j), { class: "text-center" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Status`);
                                        } else {
                                          return [
                                            createTextVNode("Status")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$j), { class: "text-center" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Target (Penerima)`);
                                        } else {
                                          return [
                                            createTextVNode("Target (Penerima)")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$j), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Riwayat Pengiriman`);
                                        } else {
                                          return [
                                            createTextVNode("Riwayat Pengiriman")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$j), { class: "text-right" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Aksi`);
                                        } else {
                                          return [
                                            createTextVNode("Aksi")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$j), { class: "font-bold" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Campaign & Pesan")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$j), { class: "text-center" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Status")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$j), { class: "text-center" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Target (Penerima)")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$j), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Riwayat Pengiriman")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Aksi")
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
                                createVNode(unref(_sfc_main$i), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$j), { class: "font-bold" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Campaign & Pesan")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$j), { class: "text-center" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Status")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$j), { class: "text-center" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Target (Penerima)")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$j), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Riwayat Pengiriman")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Aksi")
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
                        _push4(ssrRenderComponent(unref(_sfc_main$k), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (__props.broadcasts.data.length === 0) {
                                _push5(ssrRenderComponent(unref(_sfc_main$i), null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(_sfc_main$l), {
                                        colspan: "5",
                                        class: "text-center py-12 text-muted-foreground"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(unref(MessageSquare), { class: "h-12 w-12 mx-auto mb-3 opacity-20" }, null, _parent7, _scopeId6));
                                            _push7(`<p class="text-lg"${_scopeId6}>Tidak ada data broadcast ditemukan.</p>`);
                                          } else {
                                            return [
                                              createVNode(unref(MessageSquare), { class: "h-12 w-12 mx-auto mb-3 opacity-20" }),
                                              createVNode("p", { class: "text-lg" }, "Tidak ada data broadcast ditemukan.")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(unref(_sfc_main$l), {
                                          colspan: "5",
                                          class: "text-center py-12 text-muted-foreground"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(MessageSquare), { class: "h-12 w-12 mx-auto mb-3 opacity-20" }),
                                            createVNode("p", { class: "text-lg" }, "Tidak ada data broadcast ditemukan.")
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(`<!--[-->`);
                              ssrRenderList(__props.broadcasts.data, (broadcast) => {
                                _push5(ssrRenderComponent(unref(_sfc_main$i), {
                                  key: broadcast.id,
                                  class: "group"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(_sfc_main$l), null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`<div class="space-y-1"${_scopeId6}><p class="font-bold text-slate-900 dark:text-slate-100"${_scopeId6}>${ssrInterpolate(broadcast.title)}</p><p class="text-xs text-muted-foreground line-clamp-1 max-w-[300px]"${_scopeId6}>${ssrInterpolate(broadcast.message)}</p><div class="pt-1"${_scopeId6}><code class="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-blue-600"${_scopeId6}> ID: ${ssrInterpolate(broadcast.template_id || __props.defaultTemplateId || "No ID")}</code></div></div>`);
                                          } else {
                                            return [
                                              createVNode("div", { class: "space-y-1" }, [
                                                createVNode("p", { class: "font-bold text-slate-900 dark:text-slate-100" }, toDisplayString(broadcast.title), 1),
                                                createVNode("p", { class: "text-xs text-muted-foreground line-clamp-1 max-w-[300px]" }, toDisplayString(broadcast.message), 1),
                                                createVNode("div", { class: "pt-1" }, [
                                                  createVNode("code", { class: "text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-blue-600" }, " ID: " + toDisplayString(broadcast.template_id || __props.defaultTemplateId || "No ID"), 1)
                                                ])
                                              ])
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(unref(_sfc_main$l), { class: "text-center" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(unref(_sfc_main$m), {
                                              variant: getStatusVariant(broadcast.status),
                                              class: "capitalize"
                                            }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(broadcast.status)}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(broadcast.status), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(unref(_sfc_main$m), {
                                                variant: getStatusVariant(broadcast.status),
                                                class: "capitalize"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(broadcast.status), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["variant"])
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(unref(_sfc_main$l), { class: "text-center" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`<div class="flex flex-col items-center"${_scopeId6}><span class="text-sm font-bold"${_scopeId6}>${ssrInterpolate(broadcast.success_recipients)} / ${ssrInterpolate(broadcast.total_recipients || 0)}</span>`);
                                            if (broadcast.failed_recipients > 0) {
                                              _push7(`<span class="text-[10px] text-destructive"${_scopeId6}> Gagal: ${ssrInterpolate(broadcast.failed_recipients)}</span>`);
                                            } else {
                                              _push7(`<!---->`);
                                            }
                                            _push7(`</div>`);
                                          } else {
                                            return [
                                              createVNode("div", { class: "flex flex-col items-center" }, [
                                                createVNode("span", { class: "text-sm font-bold" }, toDisplayString(broadcast.success_recipients) + " / " + toDisplayString(broadcast.total_recipients || 0), 1),
                                                broadcast.failed_recipients > 0 ? (openBlock(), createBlock("span", {
                                                  key: 0,
                                                  class: "text-[10px] text-destructive"
                                                }, " Gagal: " + toDisplayString(broadcast.failed_recipients), 1)) : createCommentVNode("", true)
                                              ])
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(unref(_sfc_main$l), { class: "text-sm" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`<p class="text-muted-foreground"${_scopeId6}>Kirim: ${ssrInterpolate(formatDateTime(broadcast.sent_at))}</p><p class="text-[10px] opacity-50"${_scopeId6}>Dibuat: ${ssrInterpolate(formatDateTime(broadcast.created_at))}</p>`);
                                          } else {
                                            return [
                                              createVNode("p", { class: "text-muted-foreground" }, "Kirim: " + toDisplayString(formatDateTime(broadcast.sent_at)), 1),
                                              createVNode("p", { class: "text-[10px] opacity-50" }, "Dibuat: " + toDisplayString(formatDateTime(broadcast.created_at)), 1)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(unref(_sfc_main$l), { class: "text-right" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(unref(_sfc_main$n), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(unref(_sfc_main$o), { "as-child": "" }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(ssrRenderComponent(unref(_sfc_main$2), {
                                                          variant: "ghost",
                                                          size: "icon"
                                                        }, {
                                                          default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                            if (_push10) {
                                                              _push10(ssrRenderComponent(unref(MoreVertical), { class: "h-4 w-4" }, null, _parent10, _scopeId9));
                                                            } else {
                                                              return [
                                                                createVNode(unref(MoreVertical), { class: "h-4 w-4" })
                                                              ];
                                                            }
                                                          }),
                                                          _: 2
                                                        }, _parent9, _scopeId8));
                                                      } else {
                                                        return [
                                                          createVNode(unref(_sfc_main$2), {
                                                            variant: "ghost",
                                                            size: "icon"
                                                          }, {
                                                            default: withCtx(() => [
                                                              createVNode(unref(MoreVertical), { class: "h-4 w-4" })
                                                            ]),
                                                            _: 1
                                                          })
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(unref(_sfc_main$p), {
                                                    align: "end",
                                                    class: "w-48"
                                                  }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(ssrRenderComponent(unref(_sfc_main$q), null, {
                                                          default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                            if (_push10) {
                                                              _push10(`Opsi Broadcast`);
                                                            } else {
                                                              return [
                                                                createTextVNode("Opsi Broadcast")
                                                              ];
                                                            }
                                                          }),
                                                          _: 2
                                                        }, _parent9, _scopeId8));
                                                        _push9(ssrRenderComponent(unref(_sfc_main$r), null, null, _parent9, _scopeId8));
                                                        _push9(ssrRenderComponent(unref(Link), {
                                                          href: `/admin/whatsapp-broadcasts/${broadcast.id}/edit`
                                                        }, {
                                                          default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                            if (_push10) {
                                                              _push10(ssrRenderComponent(unref(_sfc_main$s), null, {
                                                                default: withCtx((_10, _push11, _parent11, _scopeId10) => {
                                                                  if (_push11) {
                                                                    _push11(ssrRenderComponent(unref(Pencil), { class: "h-4 w-4 mr-2" }, null, _parent11, _scopeId10));
                                                                    _push11(` Edit Draft `);
                                                                  } else {
                                                                    return [
                                                                      createVNode(unref(Pencil), { class: "h-4 w-4 mr-2" }),
                                                                      createTextVNode(" Edit Draft ")
                                                                    ];
                                                                  }
                                                                }),
                                                                _: 2
                                                              }, _parent10, _scopeId9));
                                                            } else {
                                                              return [
                                                                createVNode(unref(_sfc_main$s), null, {
                                                                  default: withCtx(() => [
                                                                    createVNode(unref(Pencil), { class: "h-4 w-4 mr-2" }),
                                                                    createTextVNode(" Edit Draft ")
                                                                  ]),
                                                                  _: 1
                                                                })
                                                              ];
                                                            }
                                                          }),
                                                          _: 2
                                                        }, _parent9, _scopeId8));
                                                        _push9(ssrRenderComponent(unref(_sfc_main$s), {
                                                          onClick: ($event) => openSendDialog(broadcast)
                                                        }, {
                                                          default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                            if (_push10) {
                                                              _push10(ssrRenderComponent(unref(SendHorizontal), { class: "h-4 w-4 mr-2" }, null, _parent10, _scopeId9));
                                                              _push10(` Kirim Sekarang `);
                                                            } else {
                                                              return [
                                                                createVNode(unref(SendHorizontal), { class: "h-4 w-4 mr-2" }),
                                                                createTextVNode(" Kirim Sekarang ")
                                                              ];
                                                            }
                                                          }),
                                                          _: 2
                                                        }, _parent9, _scopeId8));
                                                        _push9(ssrRenderComponent(unref(_sfc_main$s), {
                                                          onClick: ($event) => openTestDialog(broadcast)
                                                        }, {
                                                          default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                            if (_push10) {
                                                              _push10(ssrRenderComponent(unref(TestTube2), { class: "h-4 w-4 mr-2" }, null, _parent10, _scopeId9));
                                                              _push10(` Test ke Nomor Custom `);
                                                            } else {
                                                              return [
                                                                createVNode(unref(TestTube2), { class: "h-4 w-4 mr-2" }),
                                                                createTextVNode(" Test ke Nomor Custom ")
                                                              ];
                                                            }
                                                          }),
                                                          _: 2
                                                        }, _parent9, _scopeId8));
                                                        _push9(ssrRenderComponent(unref(_sfc_main$r), null, null, _parent9, _scopeId8));
                                                        _push9(ssrRenderComponent(unref(_sfc_main$s), {
                                                          class: "text-destructive focus:bg-destructive/10",
                                                          onClick: ($event) => openDeleteDialog(broadcast)
                                                        }, {
                                                          default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                            if (_push10) {
                                                              _push10(ssrRenderComponent(unref(Trash2), { class: "h-4 w-4 mr-2" }, null, _parent10, _scopeId9));
                                                              _push10(` Hapus Riwayat `);
                                                            } else {
                                                              return [
                                                                createVNode(unref(Trash2), { class: "h-4 w-4 mr-2" }),
                                                                createTextVNode(" Hapus Riwayat ")
                                                              ];
                                                            }
                                                          }),
                                                          _: 2
                                                        }, _parent9, _scopeId8));
                                                      } else {
                                                        return [
                                                          createVNode(unref(_sfc_main$q), null, {
                                                            default: withCtx(() => [
                                                              createTextVNode("Opsi Broadcast")
                                                            ]),
                                                            _: 1
                                                          }),
                                                          createVNode(unref(_sfc_main$r)),
                                                          createVNode(unref(Link), {
                                                            href: `/admin/whatsapp-broadcasts/${broadcast.id}/edit`
                                                          }, {
                                                            default: withCtx(() => [
                                                              createVNode(unref(_sfc_main$s), null, {
                                                                default: withCtx(() => [
                                                                  createVNode(unref(Pencil), { class: "h-4 w-4 mr-2" }),
                                                                  createTextVNode(" Edit Draft ")
                                                                ]),
                                                                _: 1
                                                              })
                                                            ]),
                                                            _: 1
                                                          }, 8, ["href"]),
                                                          createVNode(unref(_sfc_main$s), {
                                                            onClick: ($event) => openSendDialog(broadcast)
                                                          }, {
                                                            default: withCtx(() => [
                                                              createVNode(unref(SendHorizontal), { class: "h-4 w-4 mr-2" }),
                                                              createTextVNode(" Kirim Sekarang ")
                                                            ]),
                                                            _: 1
                                                          }, 8, ["onClick"]),
                                                          createVNode(unref(_sfc_main$s), {
                                                            onClick: ($event) => openTestDialog(broadcast)
                                                          }, {
                                                            default: withCtx(() => [
                                                              createVNode(unref(TestTube2), { class: "h-4 w-4 mr-2" }),
                                                              createTextVNode(" Test ke Nomor Custom ")
                                                            ]),
                                                            _: 1
                                                          }, 8, ["onClick"]),
                                                          createVNode(unref(_sfc_main$r)),
                                                          createVNode(unref(_sfc_main$s), {
                                                            class: "text-destructive focus:bg-destructive/10",
                                                            onClick: ($event) => openDeleteDialog(broadcast)
                                                          }, {
                                                            default: withCtx(() => [
                                                              createVNode(unref(Trash2), { class: "h-4 w-4 mr-2" }),
                                                              createTextVNode(" Hapus Riwayat ")
                                                            ]),
                                                            _: 1
                                                          }, 8, ["onClick"])
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                } else {
                                                  return [
                                                    createVNode(unref(_sfc_main$o), { "as-child": "" }, {
                                                      default: withCtx(() => [
                                                        createVNode(unref(_sfc_main$2), {
                                                          variant: "ghost",
                                                          size: "icon"
                                                        }, {
                                                          default: withCtx(() => [
                                                            createVNode(unref(MoreVertical), { class: "h-4 w-4" })
                                                          ]),
                                                          _: 1
                                                        })
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(unref(_sfc_main$p), {
                                                      align: "end",
                                                      class: "w-48"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(unref(_sfc_main$q), null, {
                                                          default: withCtx(() => [
                                                            createTextVNode("Opsi Broadcast")
                                                          ]),
                                                          _: 1
                                                        }),
                                                        createVNode(unref(_sfc_main$r)),
                                                        createVNode(unref(Link), {
                                                          href: `/admin/whatsapp-broadcasts/${broadcast.id}/edit`
                                                        }, {
                                                          default: withCtx(() => [
                                                            createVNode(unref(_sfc_main$s), null, {
                                                              default: withCtx(() => [
                                                                createVNode(unref(Pencil), { class: "h-4 w-4 mr-2" }),
                                                                createTextVNode(" Edit Draft ")
                                                              ]),
                                                              _: 1
                                                            })
                                                          ]),
                                                          _: 1
                                                        }, 8, ["href"]),
                                                        createVNode(unref(_sfc_main$s), {
                                                          onClick: ($event) => openSendDialog(broadcast)
                                                        }, {
                                                          default: withCtx(() => [
                                                            createVNode(unref(SendHorizontal), { class: "h-4 w-4 mr-2" }),
                                                            createTextVNode(" Kirim Sekarang ")
                                                          ]),
                                                          _: 1
                                                        }, 8, ["onClick"]),
                                                        createVNode(unref(_sfc_main$s), {
                                                          onClick: ($event) => openTestDialog(broadcast)
                                                        }, {
                                                          default: withCtx(() => [
                                                            createVNode(unref(TestTube2), { class: "h-4 w-4 mr-2" }),
                                                            createTextVNode(" Test ke Nomor Custom ")
                                                          ]),
                                                          _: 1
                                                        }, 8, ["onClick"]),
                                                        createVNode(unref(_sfc_main$r)),
                                                        createVNode(unref(_sfc_main$s), {
                                                          class: "text-destructive focus:bg-destructive/10",
                                                          onClick: ($event) => openDeleteDialog(broadcast)
                                                        }, {
                                                          default: withCtx(() => [
                                                            createVNode(unref(Trash2), { class: "h-4 w-4 mr-2" }),
                                                            createTextVNode(" Hapus Riwayat ")
                                                          ]),
                                                          _: 1
                                                        }, 8, ["onClick"])
                                                      ]),
                                                      _: 2
                                                    }, 1024)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(unref(_sfc_main$n), null, {
                                                default: withCtx(() => [
                                                  createVNode(unref(_sfc_main$o), { "as-child": "" }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(_sfc_main$2), {
                                                        variant: "ghost",
                                                        size: "icon"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode(unref(MoreVertical), { class: "h-4 w-4" })
                                                        ]),
                                                        _: 1
                                                      })
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(unref(_sfc_main$p), {
                                                    align: "end",
                                                    class: "w-48"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(_sfc_main$q), null, {
                                                        default: withCtx(() => [
                                                          createTextVNode("Opsi Broadcast")
                                                        ]),
                                                        _: 1
                                                      }),
                                                      createVNode(unref(_sfc_main$r)),
                                                      createVNode(unref(Link), {
                                                        href: `/admin/whatsapp-broadcasts/${broadcast.id}/edit`
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode(unref(_sfc_main$s), null, {
                                                            default: withCtx(() => [
                                                              createVNode(unref(Pencil), { class: "h-4 w-4 mr-2" }),
                                                              createTextVNode(" Edit Draft ")
                                                            ]),
                                                            _: 1
                                                          })
                                                        ]),
                                                        _: 1
                                                      }, 8, ["href"]),
                                                      createVNode(unref(_sfc_main$s), {
                                                        onClick: ($event) => openSendDialog(broadcast)
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode(unref(SendHorizontal), { class: "h-4 w-4 mr-2" }),
                                                          createTextVNode(" Kirim Sekarang ")
                                                        ]),
                                                        _: 1
                                                      }, 8, ["onClick"]),
                                                      createVNode(unref(_sfc_main$s), {
                                                        onClick: ($event) => openTestDialog(broadcast)
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode(unref(TestTube2), { class: "h-4 w-4 mr-2" }),
                                                          createTextVNode(" Test ke Nomor Custom ")
                                                        ]),
                                                        _: 1
                                                      }, 8, ["onClick"]),
                                                      createVNode(unref(_sfc_main$r)),
                                                      createVNode(unref(_sfc_main$s), {
                                                        class: "text-destructive focus:bg-destructive/10",
                                                        onClick: ($event) => openDeleteDialog(broadcast)
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode(unref(Trash2), { class: "h-4 w-4 mr-2" }),
                                                          createTextVNode(" Hapus Riwayat ")
                                                        ]),
                                                        _: 1
                                                      }, 8, ["onClick"])
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(unref(_sfc_main$l), null, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "space-y-1" }, [
                                              createVNode("p", { class: "font-bold text-slate-900 dark:text-slate-100" }, toDisplayString(broadcast.title), 1),
                                              createVNode("p", { class: "text-xs text-muted-foreground line-clamp-1 max-w-[300px]" }, toDisplayString(broadcast.message), 1),
                                              createVNode("div", { class: "pt-1" }, [
                                                createVNode("code", { class: "text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-blue-600" }, " ID: " + toDisplayString(broadcast.template_id || __props.defaultTemplateId || "No ID"), 1)
                                              ])
                                            ])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$l), { class: "text-center" }, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$m), {
                                              variant: getStatusVariant(broadcast.status),
                                              class: "capitalize"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(broadcast.status), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["variant"])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$l), { class: "text-center" }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "flex flex-col items-center" }, [
                                              createVNode("span", { class: "text-sm font-bold" }, toDisplayString(broadcast.success_recipients) + " / " + toDisplayString(broadcast.total_recipients || 0), 1),
                                              broadcast.failed_recipients > 0 ? (openBlock(), createBlock("span", {
                                                key: 0,
                                                class: "text-[10px] text-destructive"
                                              }, " Gagal: " + toDisplayString(broadcast.failed_recipients), 1)) : createCommentVNode("", true)
                                            ])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$l), { class: "text-sm" }, {
                                          default: withCtx(() => [
                                            createVNode("p", { class: "text-muted-foreground" }, "Kirim: " + toDisplayString(formatDateTime(broadcast.sent_at)), 1),
                                            createVNode("p", { class: "text-[10px] opacity-50" }, "Dibuat: " + toDisplayString(formatDateTime(broadcast.created_at)), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$l), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$n), null, {
                                              default: withCtx(() => [
                                                createVNode(unref(_sfc_main$o), { "as-child": "" }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(_sfc_main$2), {
                                                      variant: "ghost",
                                                      size: "icon"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(unref(MoreVertical), { class: "h-4 w-4" })
                                                      ]),
                                                      _: 1
                                                    })
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(unref(_sfc_main$p), {
                                                  align: "end",
                                                  class: "w-48"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(_sfc_main$q), null, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Opsi Broadcast")
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(unref(_sfc_main$r)),
                                                    createVNode(unref(Link), {
                                                      href: `/admin/whatsapp-broadcasts/${broadcast.id}/edit`
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(unref(_sfc_main$s), null, {
                                                          default: withCtx(() => [
                                                            createVNode(unref(Pencil), { class: "h-4 w-4 mr-2" }),
                                                            createTextVNode(" Edit Draft ")
                                                          ]),
                                                          _: 1
                                                        })
                                                      ]),
                                                      _: 1
                                                    }, 8, ["href"]),
                                                    createVNode(unref(_sfc_main$s), {
                                                      onClick: ($event) => openSendDialog(broadcast)
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(unref(SendHorizontal), { class: "h-4 w-4 mr-2" }),
                                                        createTextVNode(" Kirim Sekarang ")
                                                      ]),
                                                      _: 1
                                                    }, 8, ["onClick"]),
                                                    createVNode(unref(_sfc_main$s), {
                                                      onClick: ($event) => openTestDialog(broadcast)
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(unref(TestTube2), { class: "h-4 w-4 mr-2" }),
                                                        createTextVNode(" Test ke Nomor Custom ")
                                                      ]),
                                                      _: 1
                                                    }, 8, ["onClick"]),
                                                    createVNode(unref(_sfc_main$r)),
                                                    createVNode(unref(_sfc_main$s), {
                                                      class: "text-destructive focus:bg-destructive/10",
                                                      onClick: ($event) => openDeleteDialog(broadcast)
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(unref(Trash2), { class: "h-4 w-4 mr-2" }),
                                                        createTextVNode(" Hapus Riwayat ")
                                                      ]),
                                                      _: 1
                                                    }, 8, ["onClick"])
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                __props.broadcasts.data.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$i), { key: 0 }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$l), {
                                      colspan: "5",
                                      class: "text-center py-12 text-muted-foreground"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(MessageSquare), { class: "h-12 w-12 mx-auto mb-3 opacity-20" }),
                                        createVNode("p", { class: "text-lg" }, "Tidak ada data broadcast ditemukan.")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true),
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.broadcasts.data, (broadcast) => {
                                  return openBlock(), createBlock(unref(_sfc_main$i), {
                                    key: broadcast.id,
                                    class: "group"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$l), null, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "space-y-1" }, [
                                            createVNode("p", { class: "font-bold text-slate-900 dark:text-slate-100" }, toDisplayString(broadcast.title), 1),
                                            createVNode("p", { class: "text-xs text-muted-foreground line-clamp-1 max-w-[300px]" }, toDisplayString(broadcast.message), 1),
                                            createVNode("div", { class: "pt-1" }, [
                                              createVNode("code", { class: "text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-blue-600" }, " ID: " + toDisplayString(broadcast.template_id || __props.defaultTemplateId || "No ID"), 1)
                                            ])
                                          ])
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$l), { class: "text-center" }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$m), {
                                            variant: getStatusVariant(broadcast.status),
                                            class: "capitalize"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(broadcast.status), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["variant"])
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$l), { class: "text-center" }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "flex flex-col items-center" }, [
                                            createVNode("span", { class: "text-sm font-bold" }, toDisplayString(broadcast.success_recipients) + " / " + toDisplayString(broadcast.total_recipients || 0), 1),
                                            broadcast.failed_recipients > 0 ? (openBlock(), createBlock("span", {
                                              key: 0,
                                              class: "text-[10px] text-destructive"
                                            }, " Gagal: " + toDisplayString(broadcast.failed_recipients), 1)) : createCommentVNode("", true)
                                          ])
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$l), { class: "text-sm" }, {
                                        default: withCtx(() => [
                                          createVNode("p", { class: "text-muted-foreground" }, "Kirim: " + toDisplayString(formatDateTime(broadcast.sent_at)), 1),
                                          createVNode("p", { class: "text-[10px] opacity-50" }, "Dibuat: " + toDisplayString(formatDateTime(broadcast.created_at)), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$l), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$n), null, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$o), { "as-child": "" }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(_sfc_main$2), {
                                                    variant: "ghost",
                                                    size: "icon"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(MoreVertical), { class: "h-4 w-4" })
                                                    ]),
                                                    _: 1
                                                  })
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(unref(_sfc_main$p), {
                                                align: "end",
                                                class: "w-48"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(_sfc_main$q), null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Opsi Broadcast")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(unref(_sfc_main$r)),
                                                  createVNode(unref(Link), {
                                                    href: `/admin/whatsapp-broadcasts/${broadcast.id}/edit`
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(_sfc_main$s), null, {
                                                        default: withCtx(() => [
                                                          createVNode(unref(Pencil), { class: "h-4 w-4 mr-2" }),
                                                          createTextVNode(" Edit Draft ")
                                                        ]),
                                                        _: 1
                                                      })
                                                    ]),
                                                    _: 1
                                                  }, 8, ["href"]),
                                                  createVNode(unref(_sfc_main$s), {
                                                    onClick: ($event) => openSendDialog(broadcast)
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(SendHorizontal), { class: "h-4 w-4 mr-2" }),
                                                      createTextVNode(" Kirim Sekarang ")
                                                    ]),
                                                    _: 1
                                                  }, 8, ["onClick"]),
                                                  createVNode(unref(_sfc_main$s), {
                                                    onClick: ($event) => openTestDialog(broadcast)
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(TestTube2), { class: "h-4 w-4 mr-2" }),
                                                      createTextVNode(" Test ke Nomor Custom ")
                                                    ]),
                                                    _: 1
                                                  }, 8, ["onClick"]),
                                                  createVNode(unref(_sfc_main$r)),
                                                  createVNode(unref(_sfc_main$s), {
                                                    class: "text-destructive focus:bg-destructive/10",
                                                    onClick: ($event) => openDeleteDialog(broadcast)
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(Trash2), { class: "h-4 w-4 mr-2" }),
                                                      createTextVNode(" Hapus Riwayat ")
                                                    ]),
                                                    _: 1
                                                  }, 8, ["onClick"])
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ]),
                                            _: 2
                                          }, 1024)
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
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$h), { class: "bg-muted/50" }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$i), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$j), { class: "font-bold" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Campaign & Pesan")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$j), { class: "text-center" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Status")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$j), { class: "text-center" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Target (Penerima)")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$j), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Riwayat Pengiriman")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Aksi")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$k), null, {
                            default: withCtx(() => [
                              __props.broadcasts.data.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$i), { key: 0 }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$l), {
                                    colspan: "5",
                                    class: "text-center py-12 text-muted-foreground"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(MessageSquare), { class: "h-12 w-12 mx-auto mb-3 opacity-20" }),
                                      createVNode("p", { class: "text-lg" }, "Tidak ada data broadcast ditemukan.")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })) : createCommentVNode("", true),
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.broadcasts.data, (broadcast) => {
                                return openBlock(), createBlock(unref(_sfc_main$i), {
                                  key: broadcast.id,
                                  class: "group"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$l), null, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "space-y-1" }, [
                                          createVNode("p", { class: "font-bold text-slate-900 dark:text-slate-100" }, toDisplayString(broadcast.title), 1),
                                          createVNode("p", { class: "text-xs text-muted-foreground line-clamp-1 max-w-[300px]" }, toDisplayString(broadcast.message), 1),
                                          createVNode("div", { class: "pt-1" }, [
                                            createVNode("code", { class: "text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-blue-600" }, " ID: " + toDisplayString(broadcast.template_id || __props.defaultTemplateId || "No ID"), 1)
                                          ])
                                        ])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$l), { class: "text-center" }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$m), {
                                          variant: getStatusVariant(broadcast.status),
                                          class: "capitalize"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(broadcast.status), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["variant"])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$l), { class: "text-center" }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "flex flex-col items-center" }, [
                                          createVNode("span", { class: "text-sm font-bold" }, toDisplayString(broadcast.success_recipients) + " / " + toDisplayString(broadcast.total_recipients || 0), 1),
                                          broadcast.failed_recipients > 0 ? (openBlock(), createBlock("span", {
                                            key: 0,
                                            class: "text-[10px] text-destructive"
                                          }, " Gagal: " + toDisplayString(broadcast.failed_recipients), 1)) : createCommentVNode("", true)
                                        ])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$l), { class: "text-sm" }, {
                                      default: withCtx(() => [
                                        createVNode("p", { class: "text-muted-foreground" }, "Kirim: " + toDisplayString(formatDateTime(broadcast.sent_at)), 1),
                                        createVNode("p", { class: "text-[10px] opacity-50" }, "Dibuat: " + toDisplayString(formatDateTime(broadcast.created_at)), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$l), { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$n), null, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$o), { "as-child": "" }, {
                                              default: withCtx(() => [
                                                createVNode(unref(_sfc_main$2), {
                                                  variant: "ghost",
                                                  size: "icon"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(MoreVertical), { class: "h-4 w-4" })
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$p), {
                                              align: "end",
                                              class: "w-48"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(_sfc_main$q), null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Opsi Broadcast")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(unref(_sfc_main$r)),
                                                createVNode(unref(Link), {
                                                  href: `/admin/whatsapp-broadcasts/${broadcast.id}/edit`
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(_sfc_main$s), null, {
                                                      default: withCtx(() => [
                                                        createVNode(unref(Pencil), { class: "h-4 w-4 mr-2" }),
                                                        createTextVNode(" Edit Draft ")
                                                      ]),
                                                      _: 1
                                                    })
                                                  ]),
                                                  _: 1
                                                }, 8, ["href"]),
                                                createVNode(unref(_sfc_main$s), {
                                                  onClick: ($event) => openSendDialog(broadcast)
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(SendHorizontal), { class: "h-4 w-4 mr-2" }),
                                                    createTextVNode(" Kirim Sekarang ")
                                                  ]),
                                                  _: 1
                                                }, 8, ["onClick"]),
                                                createVNode(unref(_sfc_main$s), {
                                                  onClick: ($event) => openTestDialog(broadcast)
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(TestTube2), { class: "h-4 w-4 mr-2" }),
                                                    createTextVNode(" Test ke Nomor Custom ")
                                                  ]),
                                                  _: 1
                                                }, 8, ["onClick"]),
                                                createVNode(unref(_sfc_main$r)),
                                                createVNode(unref(_sfc_main$s), {
                                                  class: "text-destructive focus:bg-destructive/10",
                                                  onClick: ($event) => openDeleteDialog(broadcast)
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(Trash2), { class: "h-4 w-4 mr-2" }),
                                                    createTextVNode(" Hapus Riwayat ")
                                                  ]),
                                                  _: 1
                                                }, 8, ["onClick"])
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 2
                                        }, 1024)
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
                  }, _parent3, _scopeId2));
                  if (__props.broadcasts.last_page > 1) {
                    _push3(`<div class="p-4 border-t bg-muted/20 flex justify-center"${_scopeId2}><nav class="flex gap-1"${_scopeId2}><!--[-->`);
                    ssrRenderList(paginationLinks.value, (link, index) => {
                      _push3(ssrRenderComponent(unref(_sfc_main$2), {
                        key: link.url ?? `${link.label}-${index}`,
                        variant: getPaginationVariant(link),
                        disabled: !link.url,
                        size: "sm",
                        onClick: ($event) => link.url && unref(router).visit(link.url)
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(formatPaginationLabel(link.label))}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(formatPaginationLabel(link.label)), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]--></nav></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(unref(_sfc_main$g), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$h), { class: "bg-muted/50" }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$i), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$j), { class: "font-bold" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Campaign & Pesan")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$j), { class: "text-center" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Status")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$j), { class: "text-center" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Target (Penerima)")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$j), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Riwayat Pengiriman")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Aksi")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$k), null, {
                          default: withCtx(() => [
                            __props.broadcasts.data.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$i), { key: 0 }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$l), {
                                  colspan: "5",
                                  class: "text-center py-12 text-muted-foreground"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(MessageSquare), { class: "h-12 w-12 mx-auto mb-3 opacity-20" }),
                                    createVNode("p", { class: "text-lg" }, "Tidak ada data broadcast ditemukan.")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })) : createCommentVNode("", true),
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.broadcasts.data, (broadcast) => {
                              return openBlock(), createBlock(unref(_sfc_main$i), {
                                key: broadcast.id,
                                class: "group"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$l), null, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "space-y-1" }, [
                                        createVNode("p", { class: "font-bold text-slate-900 dark:text-slate-100" }, toDisplayString(broadcast.title), 1),
                                        createVNode("p", { class: "text-xs text-muted-foreground line-clamp-1 max-w-[300px]" }, toDisplayString(broadcast.message), 1),
                                        createVNode("div", { class: "pt-1" }, [
                                          createVNode("code", { class: "text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-blue-600" }, " ID: " + toDisplayString(broadcast.template_id || __props.defaultTemplateId || "No ID"), 1)
                                        ])
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(unref(_sfc_main$l), { class: "text-center" }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$m), {
                                        variant: getStatusVariant(broadcast.status),
                                        class: "capitalize"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(broadcast.status), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["variant"])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(unref(_sfc_main$l), { class: "text-center" }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "flex flex-col items-center" }, [
                                        createVNode("span", { class: "text-sm font-bold" }, toDisplayString(broadcast.success_recipients) + " / " + toDisplayString(broadcast.total_recipients || 0), 1),
                                        broadcast.failed_recipients > 0 ? (openBlock(), createBlock("span", {
                                          key: 0,
                                          class: "text-[10px] text-destructive"
                                        }, " Gagal: " + toDisplayString(broadcast.failed_recipients), 1)) : createCommentVNode("", true)
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(unref(_sfc_main$l), { class: "text-sm" }, {
                                    default: withCtx(() => [
                                      createVNode("p", { class: "text-muted-foreground" }, "Kirim: " + toDisplayString(formatDateTime(broadcast.sent_at)), 1),
                                      createVNode("p", { class: "text-[10px] opacity-50" }, "Dibuat: " + toDisplayString(formatDateTime(broadcast.created_at)), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(unref(_sfc_main$l), { class: "text-right" }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$n), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$o), { "as-child": "" }, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$2), {
                                                variant: "ghost",
                                                size: "icon"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(MoreVertical), { class: "h-4 w-4" })
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$p), {
                                            align: "end",
                                            class: "w-48"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$q), null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Opsi Broadcast")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(unref(_sfc_main$r)),
                                              createVNode(unref(Link), {
                                                href: `/admin/whatsapp-broadcasts/${broadcast.id}/edit`
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(_sfc_main$s), null, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(Pencil), { class: "h-4 w-4 mr-2" }),
                                                      createTextVNode(" Edit Draft ")
                                                    ]),
                                                    _: 1
                                                  })
                                                ]),
                                                _: 1
                                              }, 8, ["href"]),
                                              createVNode(unref(_sfc_main$s), {
                                                onClick: ($event) => openSendDialog(broadcast)
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(SendHorizontal), { class: "h-4 w-4 mr-2" }),
                                                  createTextVNode(" Kirim Sekarang ")
                                                ]),
                                                _: 1
                                              }, 8, ["onClick"]),
                                              createVNode(unref(_sfc_main$s), {
                                                onClick: ($event) => openTestDialog(broadcast)
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(TestTube2), { class: "h-4 w-4 mr-2" }),
                                                  createTextVNode(" Test ke Nomor Custom ")
                                                ]),
                                                _: 1
                                              }, 8, ["onClick"]),
                                              createVNode(unref(_sfc_main$r)),
                                              createVNode(unref(_sfc_main$s), {
                                                class: "text-destructive focus:bg-destructive/10",
                                                onClick: ($event) => openDeleteDialog(broadcast)
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(Trash2), { class: "h-4 w-4 mr-2" }),
                                                  createTextVNode(" Hapus Riwayat ")
                                                ]),
                                                _: 1
                                              }, 8, ["onClick"])
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1024)
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
                    }),
                    __props.broadcasts.last_page > 1 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "p-4 border-t bg-muted/20 flex justify-center"
                    }, [
                      createVNode("nav", { class: "flex gap-1" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(paginationLinks.value, (link, index) => {
                          return openBlock(), createBlock(unref(_sfc_main$2), {
                            key: link.url ?? `${link.label}-${index}`,
                            variant: getPaginationVariant(link),
                            disabled: !link.url,
                            size: "sm",
                            onClick: ($event) => link.url && unref(router).visit(link.url)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(formatPaginationLabel(link.label)), 1)
                            ]),
                            _: 2
                          }, 1032, ["variant", "disabled", "onClick"]);
                        }), 128))
                      ])
                    ])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$t), {
              open: testDialogOpen.value,
              "onUpdate:open": setTestDialogOpen
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$u), { class: "sm:max-w-3xl" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$v), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$w), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`${ssrInterpolate(testTarget.value ? `Test Broadcast: ${testTarget.value.title}` : "Test Broadcast")}`);
                                  } else {
                                    return [
                                      createTextVNode(toDisplayString(testTarget.value ? `Test Broadcast: ${testTarget.value.title}` : "Test Broadcast"), 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$x), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Tambahkan beberapa nomor custom. Semua nomor valid akan masuk antrean queue test kirim. `);
                                  } else {
                                    return [
                                      createTextVNode(" Tambahkan beberapa nomor custom. Semua nomor valid akan masuk antrean queue test kirim. ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$w), null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(testTarget.value ? `Test Broadcast: ${testTarget.value.title}` : "Test Broadcast"), 1)
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$x), null, {
                                  default: withCtx(() => [
                                    createTextVNode(" Tambahkan beberapa nomor custom. Semua nomor valid akan masuk antrean queue test kirim. ")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<form class="space-y-4"${_scopeId3}><div class="grid gap-4 md:grid-cols-2"${_scopeId3}><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$y), { for: "test_template_id" }, {
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
                        _push4(ssrRenderComponent(unref(_sfc_main$a), {
                          id: "test_template_id",
                          modelValue: testTemplateId.value,
                          "onUpdate:modelValue": ($event) => testTemplateId.value = $event,
                          placeholder: "Kosongkan untuk default",
                          class: { "border-destructive": !!testErrors.value.template_id }
                        }, null, _parent4, _scopeId3));
                        if (testErrors.value.template_id) {
                          _push4(`<p class="text-xs text-destructive"${_scopeId3}>${ssrInterpolate(testErrors.value.template_id)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$y), { for: "test_message" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Isi Pesan`);
                            } else {
                              return [
                                createTextVNode("Isi Pesan")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$z), {
                          id: "test_message",
                          modelValue: testMessage.value,
                          "onUpdate:modelValue": ($event) => testMessage.value = $event,
                          rows: "3",
                          class: { "border-destructive": !!testErrors.value.message }
                        }, null, _parent4, _scopeId3));
                        if (testErrors.value.message) {
                          _push4(`<p class="text-xs text-destructive"${_scopeId3}>${ssrInterpolate(testErrors.value.message)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div></div><div class="space-y-3"${_scopeId3}><div class="flex items-center justify-between"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$y), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Daftar Nomor Tujuan`);
                            } else {
                              return [
                                createTextVNode("Daftar Nomor Tujuan")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$2), {
                          type: "button",
                          variant: "outline",
                          size: "sm",
                          onClick: addTestRecipient
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Plus), { class: "h-4 w-4 mr-2" }, null, _parent5, _scopeId4));
                              _push5(` Tambah Nomor `);
                            } else {
                              return [
                                createVNode(unref(Plus), { class: "h-4 w-4 mr-2" }),
                                createTextVNode(" Tambah Nomor ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div><!--[-->`);
                        ssrRenderList(testRecipients.value, (recipient, index) => {
                          _push4(`<div class="grid gap-3 rounded-lg border p-3 md:grid-cols-[1fr_1fr_auto]"${_scopeId3}><div class="space-y-2"${_scopeId3}>`);
                          _push4(ssrRenderComponent(unref(_sfc_main$y), {
                            for: `test_name_${recipient.id}`
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Nama (opsional)`);
                              } else {
                                return [
                                  createTextVNode("Nama (opsional)")
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$a), {
                            id: `test_name_${recipient.id}`,
                            modelValue: recipient.name,
                            "onUpdate:modelValue": ($event) => recipient.name = $event,
                            placeholder: "Contoh: Admin QA",
                            class: { "border-destructive": !!getTestFieldError(index, "name") }
                          }, null, _parent4, _scopeId3));
                          if (getTestFieldError(index, "name")) {
                            _push4(`<p class="text-xs text-destructive"${_scopeId3}>${ssrInterpolate(getTestFieldError(index, "name"))}</p>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                          _push4(ssrRenderComponent(unref(_sfc_main$y), {
                            for: `test_phone_${recipient.id}`
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`No. WhatsApp *`);
                              } else {
                                return [
                                  createTextVNode("No. WhatsApp *")
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$a), {
                            id: `test_phone_${recipient.id}`,
                            modelValue: recipient.phone,
                            "onUpdate:modelValue": ($event) => recipient.phone = $event,
                            placeholder: "081234567890",
                            class: { "border-destructive": !!getTestFieldError(index, "phone") }
                          }, null, _parent4, _scopeId3));
                          if (getTestFieldError(index, "phone")) {
                            _push4(`<p class="text-xs text-destructive"${_scopeId3}>${ssrInterpolate(getTestFieldError(index, "phone"))}</p>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`</div><div class="flex items-end"${_scopeId3}>`);
                          _push4(ssrRenderComponent(unref(_sfc_main$2), {
                            type: "button",
                            variant: "ghost",
                            size: "icon",
                            onClick: ($event) => removeTestRecipient(index)
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(Trash2), { class: "h-4 w-4" }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(Trash2), { class: "h-4 w-4" })
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(`</div></div>`);
                        });
                        _push4(`<!--]-->`);
                        if (testErrors.value.recipients) {
                          _push4(`<p class="text-xs text-destructive"${_scopeId3}>${ssrInterpolate(testErrors.value.recipients)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div>`);
                        if (testGeneralError.value) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(testGeneralError.value)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(ssrRenderComponent(unref(_sfc_main$A), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$2), {
                                type: "button",
                                variant: "outline",
                                onClick: ($event) => setTestDialogOpen(false)
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Batal `);
                                  } else {
                                    return [
                                      createTextVNode(" Batal ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$2), {
                                type: "submit",
                                disabled: isSubmittingTest.value
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(TestTube2), { class: "h-4 w-4 mr-2" }, null, _parent6, _scopeId5));
                                    _push6(` ${ssrInterpolate(isSubmittingTest.value ? "Memproses..." : "Kirim Test ke Queue")}`);
                                  } else {
                                    return [
                                      createVNode(unref(TestTube2), { class: "h-4 w-4 mr-2" }),
                                      createTextVNode(" " + toDisplayString(isSubmittingTest.value ? "Memproses..." : "Kirim Test ke Queue"), 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$2), {
                                  type: "button",
                                  variant: "outline",
                                  onClick: ($event) => setTestDialogOpen(false)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Batal ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"]),
                                createVNode(unref(_sfc_main$2), {
                                  type: "submit",
                                  disabled: isSubmittingTest.value
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(TestTube2), { class: "h-4 w-4 mr-2" }),
                                    createTextVNode(" " + toDisplayString(isSubmittingTest.value ? "Memproses..." : "Kirim Test ke Queue"), 1)
                                  ]),
                                  _: 1
                                }, 8, ["disabled"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</form>`);
                      } else {
                        return [
                          createVNode(unref(_sfc_main$v), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$w), null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(testTarget.value ? `Test Broadcast: ${testTarget.value.title}` : "Test Broadcast"), 1)
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$x), null, {
                                default: withCtx(() => [
                                  createTextVNode(" Tambahkan beberapa nomor custom. Semua nomor valid akan masuk antrean queue test kirim. ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode("form", {
                            class: "space-y-4",
                            onSubmit: withModifiers(handleTestMultipleSend, ["prevent"])
                          }, [
                            createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                              createVNode("div", { class: "space-y-2" }, [
                                createVNode(unref(_sfc_main$y), { for: "test_template_id" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Template ID")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$a), {
                                  id: "test_template_id",
                                  modelValue: testTemplateId.value,
                                  "onUpdate:modelValue": ($event) => testTemplateId.value = $event,
                                  placeholder: "Kosongkan untuk default",
                                  class: { "border-destructive": !!testErrors.value.template_id }
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                                testErrors.value.template_id ? (openBlock(), createBlock("p", {
                                  key: 0,
                                  class: "text-xs text-destructive"
                                }, toDisplayString(testErrors.value.template_id), 1)) : createCommentVNode("", true)
                              ]),
                              createVNode("div", { class: "space-y-2" }, [
                                createVNode(unref(_sfc_main$y), { for: "test_message" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Isi Pesan")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$z), {
                                  id: "test_message",
                                  modelValue: testMessage.value,
                                  "onUpdate:modelValue": ($event) => testMessage.value = $event,
                                  rows: "3",
                                  class: { "border-destructive": !!testErrors.value.message }
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                                testErrors.value.message ? (openBlock(), createBlock("p", {
                                  key: 0,
                                  class: "text-xs text-destructive"
                                }, toDisplayString(testErrors.value.message), 1)) : createCommentVNode("", true)
                              ])
                            ]),
                            createVNode("div", { class: "space-y-3" }, [
                              createVNode("div", { class: "flex items-center justify-between" }, [
                                createVNode(unref(_sfc_main$y), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Daftar Nomor Tujuan")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$2), {
                                  type: "button",
                                  variant: "outline",
                                  size: "sm",
                                  onClick: addTestRecipient
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Plus), { class: "h-4 w-4 mr-2" }),
                                    createTextVNode(" Tambah Nomor ")
                                  ]),
                                  _: 1
                                })
                              ]),
                              (openBlock(true), createBlock(Fragment, null, renderList(testRecipients.value, (recipient, index) => {
                                return openBlock(), createBlock("div", {
                                  key: recipient.id,
                                  class: "grid gap-3 rounded-lg border p-3 md:grid-cols-[1fr_1fr_auto]"
                                }, [
                                  createVNode("div", { class: "space-y-2" }, [
                                    createVNode(unref(_sfc_main$y), {
                                      for: `test_name_${recipient.id}`
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("Nama (opsional)")
                                      ]),
                                      _: 1
                                    }, 8, ["for"]),
                                    createVNode(unref(_sfc_main$a), {
                                      id: `test_name_${recipient.id}`,
                                      modelValue: recipient.name,
                                      "onUpdate:modelValue": ($event) => recipient.name = $event,
                                      placeholder: "Contoh: Admin QA",
                                      class: { "border-destructive": !!getTestFieldError(index, "name") }
                                    }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "class"]),
                                    getTestFieldError(index, "name") ? (openBlock(), createBlock("p", {
                                      key: 0,
                                      class: "text-xs text-destructive"
                                    }, toDisplayString(getTestFieldError(index, "name")), 1)) : createCommentVNode("", true)
                                  ]),
                                  createVNode("div", { class: "space-y-2" }, [
                                    createVNode(unref(_sfc_main$y), {
                                      for: `test_phone_${recipient.id}`
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("No. WhatsApp *")
                                      ]),
                                      _: 1
                                    }, 8, ["for"]),
                                    createVNode(unref(_sfc_main$a), {
                                      id: `test_phone_${recipient.id}`,
                                      modelValue: recipient.phone,
                                      "onUpdate:modelValue": ($event) => recipient.phone = $event,
                                      placeholder: "081234567890",
                                      class: { "border-destructive": !!getTestFieldError(index, "phone") }
                                    }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "class"]),
                                    getTestFieldError(index, "phone") ? (openBlock(), createBlock("p", {
                                      key: 0,
                                      class: "text-xs text-destructive"
                                    }, toDisplayString(getTestFieldError(index, "phone")), 1)) : createCommentVNode("", true)
                                  ]),
                                  createVNode("div", { class: "flex items-end" }, [
                                    createVNode(unref(_sfc_main$2), {
                                      type: "button",
                                      variant: "ghost",
                                      size: "icon",
                                      onClick: ($event) => removeTestRecipient(index)
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Trash2), { class: "h-4 w-4" })
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])
                                  ])
                                ]);
                              }), 128)),
                              testErrors.value.recipients ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-xs text-destructive"
                              }, toDisplayString(testErrors.value.recipients), 1)) : createCommentVNode("", true)
                            ]),
                            testGeneralError.value ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(testGeneralError.value), 1)) : createCommentVNode("", true),
                            createVNode(unref(_sfc_main$A), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$2), {
                                  type: "button",
                                  variant: "outline",
                                  onClick: ($event) => setTestDialogOpen(false)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Batal ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"]),
                                createVNode(unref(_sfc_main$2), {
                                  type: "submit",
                                  disabled: isSubmittingTest.value
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(TestTube2), { class: "h-4 w-4 mr-2" }),
                                    createTextVNode(" " + toDisplayString(isSubmittingTest.value ? "Memproses..." : "Kirim Test ke Queue"), 1)
                                  ]),
                                  _: 1
                                }, 8, ["disabled"])
                              ]),
                              _: 1
                            })
                          ], 32)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$u), { class: "sm:max-w-3xl" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$v), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$w), null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(testTarget.value ? `Test Broadcast: ${testTarget.value.title}` : "Test Broadcast"), 1)
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$x), null, {
                              default: withCtx(() => [
                                createTextVNode(" Tambahkan beberapa nomor custom. Semua nomor valid akan masuk antrean queue test kirim. ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode("form", {
                          class: "space-y-4",
                          onSubmit: withModifiers(handleTestMultipleSend, ["prevent"])
                        }, [
                          createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$y), { for: "test_template_id" }, {
                                default: withCtx(() => [
                                  createTextVNode("Template ID")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), {
                                id: "test_template_id",
                                modelValue: testTemplateId.value,
                                "onUpdate:modelValue": ($event) => testTemplateId.value = $event,
                                placeholder: "Kosongkan untuk default",
                                class: { "border-destructive": !!testErrors.value.template_id }
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              testErrors.value.template_id ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-xs text-destructive"
                              }, toDisplayString(testErrors.value.template_id), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$y), { for: "test_message" }, {
                                default: withCtx(() => [
                                  createTextVNode("Isi Pesan")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$z), {
                                id: "test_message",
                                modelValue: testMessage.value,
                                "onUpdate:modelValue": ($event) => testMessage.value = $event,
                                rows: "3",
                                class: { "border-destructive": !!testErrors.value.message }
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              testErrors.value.message ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-xs text-destructive"
                              }, toDisplayString(testErrors.value.message), 1)) : createCommentVNode("", true)
                            ])
                          ]),
                          createVNode("div", { class: "space-y-3" }, [
                            createVNode("div", { class: "flex items-center justify-between" }, [
                              createVNode(unref(_sfc_main$y), null, {
                                default: withCtx(() => [
                                  createTextVNode("Daftar Nomor Tujuan")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$2), {
                                type: "button",
                                variant: "outline",
                                size: "sm",
                                onClick: addTestRecipient
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Plus), { class: "h-4 w-4 mr-2" }),
                                  createTextVNode(" Tambah Nomor ")
                                ]),
                                _: 1
                              })
                            ]),
                            (openBlock(true), createBlock(Fragment, null, renderList(testRecipients.value, (recipient, index) => {
                              return openBlock(), createBlock("div", {
                                key: recipient.id,
                                class: "grid gap-3 rounded-lg border p-3 md:grid-cols-[1fr_1fr_auto]"
                              }, [
                                createVNode("div", { class: "space-y-2" }, [
                                  createVNode(unref(_sfc_main$y), {
                                    for: `test_name_${recipient.id}`
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Nama (opsional)")
                                    ]),
                                    _: 1
                                  }, 8, ["for"]),
                                  createVNode(unref(_sfc_main$a), {
                                    id: `test_name_${recipient.id}`,
                                    modelValue: recipient.name,
                                    "onUpdate:modelValue": ($event) => recipient.name = $event,
                                    placeholder: "Contoh: Admin QA",
                                    class: { "border-destructive": !!getTestFieldError(index, "name") }
                                  }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "class"]),
                                  getTestFieldError(index, "name") ? (openBlock(), createBlock("p", {
                                    key: 0,
                                    class: "text-xs text-destructive"
                                  }, toDisplayString(getTestFieldError(index, "name")), 1)) : createCommentVNode("", true)
                                ]),
                                createVNode("div", { class: "space-y-2" }, [
                                  createVNode(unref(_sfc_main$y), {
                                    for: `test_phone_${recipient.id}`
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("No. WhatsApp *")
                                    ]),
                                    _: 1
                                  }, 8, ["for"]),
                                  createVNode(unref(_sfc_main$a), {
                                    id: `test_phone_${recipient.id}`,
                                    modelValue: recipient.phone,
                                    "onUpdate:modelValue": ($event) => recipient.phone = $event,
                                    placeholder: "081234567890",
                                    class: { "border-destructive": !!getTestFieldError(index, "phone") }
                                  }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "class"]),
                                  getTestFieldError(index, "phone") ? (openBlock(), createBlock("p", {
                                    key: 0,
                                    class: "text-xs text-destructive"
                                  }, toDisplayString(getTestFieldError(index, "phone")), 1)) : createCommentVNode("", true)
                                ]),
                                createVNode("div", { class: "flex items-end" }, [
                                  createVNode(unref(_sfc_main$2), {
                                    type: "button",
                                    variant: "ghost",
                                    size: "icon",
                                    onClick: ($event) => removeTestRecipient(index)
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Trash2), { class: "h-4 w-4" })
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ])
                              ]);
                            }), 128)),
                            testErrors.value.recipients ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-xs text-destructive"
                            }, toDisplayString(testErrors.value.recipients), 1)) : createCommentVNode("", true)
                          ]),
                          testGeneralError.value ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive"
                          }, toDisplayString(testGeneralError.value), 1)) : createCommentVNode("", true),
                          createVNode(unref(_sfc_main$A), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$2), {
                                type: "button",
                                variant: "outline",
                                onClick: ($event) => setTestDialogOpen(false)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Batal ")
                                ]),
                                _: 1
                              }, 8, ["onClick"]),
                              createVNode(unref(_sfc_main$2), {
                                type: "submit",
                                disabled: isSubmittingTest.value
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(TestTube2), { class: "h-4 w-4 mr-2" }),
                                  createTextVNode(" " + toDisplayString(isSubmittingTest.value ? "Memproses..." : "Kirim Test ke Queue"), 1)
                                ]),
                                _: 1
                              }, 8, ["disabled"])
                            ]),
                            _: 1
                          })
                        ], 32)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$B, {
              open: sendDialogOpen.value,
              title: sendTarget.value ? `Kirim Broadcast: ${sendTarget.value.title}?` : "Kirim Broadcast?",
              description: sendTarget.value ? "Pesan akan dikirim ke semua nomor customer yang unik. Lanjutkan proses pengiriman sekarang?" : "Pesan akan dikirim ke semua nomor customer yang unik.",
              "confirm-text": "Kirim Sekarang",
              "cancel-text": "Batal",
              "onUpdate:open": setSendDialogOpen,
              onConfirm: handleSendBroadcast
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$B, {
              open: deleteDialogOpen.value,
              title: deleteTarget.value ? `Hapus Riwayat: ${deleteTarget.value.title}?` : "Hapus Riwayat?",
              description: deleteTarget.value ? "Data riwayat broadcast beserta daftar penerima akan dihapus permanen." : "Data riwayat broadcast akan dihapus permanen.",
              "confirm-text": "Hapus",
              "cancel-text": "Batal",
              variant: "destructive",
              "onUpdate:open": setDeleteDialogOpen,
              onConfirm: handleDeleteBroadcast
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "container mx-auto py-8 space-y-8" }, [
                createVNode("div", { class: "flex flex-col md:flex-row md:items-center justify-between gap-4" }, [
                  createVNode("div", null, [
                    createVNode("h1", { class: "text-3xl font-extrabold tracking-tight" }, "Broadcast WhatsApp"),
                    createVNode("p", { class: "text-muted-foreground" }, "Kelola pengiriman pesan massal ke database pelanggan unik.")
                  ]),
                  createVNode(unref(Link), { href: "/admin/whatsapp-broadcasts/create" }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$2), { class: "font-bold" }, {
                        default: withCtx(() => [
                          createVNode(unref(Plus), { class: "h-5 w-5 mr-2" }),
                          createTextVNode(" Buat Broadcast Baru ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                createVNode(unref(_sfc_main$3), { class: "border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900" }, {
                  default: withCtx(() => [
                    createVNode(unref(AlertTriangle), { class: "h-5 w-5 text-amber-600 dark:text-amber-500" }),
                    createVNode("div", { class: "ml-2" }, [
                      createVNode(unref(_sfc_main$4), { class: "text-amber-800 dark:text-amber-400 font-bold text-base" }, {
                        default: withCtx(() => [
                          createTextVNode(" Penting: Ketentuan Penerimaan Pesan ")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$5), { class: "text-amber-700 dark:text-amber-300 mt-2 space-y-2" }, {
                        default: withCtx(() => [
                          createVNode("p", null, [
                            createTextVNode("Berdasarkan kebijakan "),
                            createVNode("strong", null, "WhatsApp Business API"),
                            createTextVNode(", pesan broadcast Anda hanya akan terkirim dengan sukses jika pelanggan memenuhi kriteria berikut:")
                          ]),
                          createVNode("ul", { class: "grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 list-none mt-2" }, [
                            createVNode("li", { class: "flex items-center gap-2" }, [
                              createVNode(unref(CheckCircle2), { class: "h-4 w-4 text-amber-600" }),
                              createTextVNode(" Pernah berinteraksi dengan nomor WA Anda. ")
                            ]),
                            createVNode("li", { class: "flex items-center gap-2" }, [
                              createVNode(unref(CheckCircle2), { class: "h-4 w-4 text-amber-600" }),
                              createTextVNode(" Pelanggan menyimpan nomor Anda di kontak. ")
                            ]),
                            createVNode("li", { class: "flex items-center gap-2" }, [
                              createVNode(unref(CheckCircle2), { class: "h-4 w-4 text-amber-600" }),
                              createTextVNode(" Menggunakan Template ID yang telah disetujui. ")
                            ]),
                            createVNode("li", { class: "flex items-center gap-2" }, [
                              createVNode(unref(CheckCircle2), { class: "h-4 w-4 text-amber-600" }),
                              createTextVNode(" Tidak sedang memblokir nomor resmi Anda. ")
                            ])
                          ]),
                          createVNode("p", { class: "text-xs italic mt-2 font-semibold" }, " * Pesan ke nomor yang tidak dikenal/tanpa interaksi berisiko gagal terkirim (Undelivered) atau memicu pemblokiran nomor oleh WhatsApp. ")
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 1
                }),
                createVNode(unref(_sfc_main$6), { class: "shadow-sm" }, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$7), { class: "pb-4" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$8), { class: "text-lg flex items-center gap-2" }, {
                          default: withCtx(() => [
                            createVNode(unref(Search), { class: "h-5 w-5 text-muted-foreground" }),
                            createTextVNode(" Filter Data ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$9), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex flex-col md:flex-row gap-4" }, [
                          createVNode("div", { class: "flex-1 relative" }, [
                            createVNode(unref(Search), { class: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
                            createVNode(unref(_sfc_main$a), {
                              modelValue: searchQuery.value,
                              "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                              placeholder: "Cari berdasarkan judul atau pesan...",
                              class: "pl-10",
                              onKeydown: withKeys(performSearch, ["enter"])
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode(unref(_sfc_main$b), {
                            modelValue: selectedStatus.value,
                            "onUpdate:modelValue": ($event) => selectedStatus.value = $event
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$c), { class: "w-full md:w-[200px]" }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$d), { placeholder: "Semua Status" })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$e), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$f), { value: "all" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Semua Status")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$f), { value: "draft" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Draft (Belum Kirim)")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$f), { value: "processing" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Sedang Diproses")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$f), { value: "sent" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Selesai Terkirim")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$f), { value: "failed" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Gagal Total")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("div", { class: "flex gap-2" }, [
                            createVNode(unref(_sfc_main$2), { onClick: performSearch }, {
                              default: withCtx(() => [
                                createTextVNode("Terapkan Filter")
                              ]),
                              _: 1
                            }),
                            searchQuery.value || selectedStatus.value !== "all" ? (openBlock(), createBlock(unref(_sfc_main$2), {
                              key: 0,
                              variant: "ghost",
                              onClick: clearFilters
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Reset ")
                              ]),
                              _: 1
                            })) : createCommentVNode("", true)
                          ])
                        ])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(unref(_sfc_main$6), { class: "shadow-sm overflow-hidden" }, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$g), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$h), { class: "bg-muted/50" }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$i), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$j), { class: "font-bold" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Campaign & Pesan")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$j), { class: "text-center" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Status")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$j), { class: "text-center" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Target (Penerima)")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$j), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Riwayat Pengiriman")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$j), { class: "text-right" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Aksi")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$k), null, {
                          default: withCtx(() => [
                            __props.broadcasts.data.length === 0 ? (openBlock(), createBlock(unref(_sfc_main$i), { key: 0 }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$l), {
                                  colspan: "5",
                                  class: "text-center py-12 text-muted-foreground"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(MessageSquare), { class: "h-12 w-12 mx-auto mb-3 opacity-20" }),
                                    createVNode("p", { class: "text-lg" }, "Tidak ada data broadcast ditemukan.")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })) : createCommentVNode("", true),
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.broadcasts.data, (broadcast) => {
                              return openBlock(), createBlock(unref(_sfc_main$i), {
                                key: broadcast.id,
                                class: "group"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$l), null, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "space-y-1" }, [
                                        createVNode("p", { class: "font-bold text-slate-900 dark:text-slate-100" }, toDisplayString(broadcast.title), 1),
                                        createVNode("p", { class: "text-xs text-muted-foreground line-clamp-1 max-w-[300px]" }, toDisplayString(broadcast.message), 1),
                                        createVNode("div", { class: "pt-1" }, [
                                          createVNode("code", { class: "text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-blue-600" }, " ID: " + toDisplayString(broadcast.template_id || __props.defaultTemplateId || "No ID"), 1)
                                        ])
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(unref(_sfc_main$l), { class: "text-center" }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$m), {
                                        variant: getStatusVariant(broadcast.status),
                                        class: "capitalize"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(broadcast.status), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["variant"])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(unref(_sfc_main$l), { class: "text-center" }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "flex flex-col items-center" }, [
                                        createVNode("span", { class: "text-sm font-bold" }, toDisplayString(broadcast.success_recipients) + " / " + toDisplayString(broadcast.total_recipients || 0), 1),
                                        broadcast.failed_recipients > 0 ? (openBlock(), createBlock("span", {
                                          key: 0,
                                          class: "text-[10px] text-destructive"
                                        }, " Gagal: " + toDisplayString(broadcast.failed_recipients), 1)) : createCommentVNode("", true)
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(unref(_sfc_main$l), { class: "text-sm" }, {
                                    default: withCtx(() => [
                                      createVNode("p", { class: "text-muted-foreground" }, "Kirim: " + toDisplayString(formatDateTime(broadcast.sent_at)), 1),
                                      createVNode("p", { class: "text-[10px] opacity-50" }, "Dibuat: " + toDisplayString(formatDateTime(broadcast.created_at)), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(unref(_sfc_main$l), { class: "text-right" }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$n), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$o), { "as-child": "" }, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$2), {
                                                variant: "ghost",
                                                size: "icon"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(MoreVertical), { class: "h-4 w-4" })
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$p), {
                                            align: "end",
                                            class: "w-48"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$q), null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Opsi Broadcast")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(unref(_sfc_main$r)),
                                              createVNode(unref(Link), {
                                                href: `/admin/whatsapp-broadcasts/${broadcast.id}/edit`
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(_sfc_main$s), null, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(Pencil), { class: "h-4 w-4 mr-2" }),
                                                      createTextVNode(" Edit Draft ")
                                                    ]),
                                                    _: 1
                                                  })
                                                ]),
                                                _: 1
                                              }, 8, ["href"]),
                                              createVNode(unref(_sfc_main$s), {
                                                onClick: ($event) => openSendDialog(broadcast)
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(SendHorizontal), { class: "h-4 w-4 mr-2" }),
                                                  createTextVNode(" Kirim Sekarang ")
                                                ]),
                                                _: 1
                                              }, 8, ["onClick"]),
                                              createVNode(unref(_sfc_main$s), {
                                                onClick: ($event) => openTestDialog(broadcast)
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(TestTube2), { class: "h-4 w-4 mr-2" }),
                                                  createTextVNode(" Test ke Nomor Custom ")
                                                ]),
                                                _: 1
                                              }, 8, ["onClick"]),
                                              createVNode(unref(_sfc_main$r)),
                                              createVNode(unref(_sfc_main$s), {
                                                class: "text-destructive focus:bg-destructive/10",
                                                onClick: ($event) => openDeleteDialog(broadcast)
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(Trash2), { class: "h-4 w-4 mr-2" }),
                                                  createTextVNode(" Hapus Riwayat ")
                                                ]),
                                                _: 1
                                              }, 8, ["onClick"])
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1024)
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
                    }),
                    __props.broadcasts.last_page > 1 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "p-4 border-t bg-muted/20 flex justify-center"
                    }, [
                      createVNode("nav", { class: "flex gap-1" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(paginationLinks.value, (link, index) => {
                          return openBlock(), createBlock(unref(_sfc_main$2), {
                            key: link.url ?? `${link.label}-${index}`,
                            variant: getPaginationVariant(link),
                            disabled: !link.url,
                            size: "sm",
                            onClick: ($event) => link.url && unref(router).visit(link.url)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(formatPaginationLabel(link.label)), 1)
                            ]),
                            _: 2
                          }, 1032, ["variant", "disabled", "onClick"]);
                        }), 128))
                      ])
                    ])) : createCommentVNode("", true)
                  ]),
                  _: 1
                }),
                createVNode(unref(_sfc_main$t), {
                  open: testDialogOpen.value,
                  "onUpdate:open": setTestDialogOpen
                }, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$u), { class: "sm:max-w-3xl" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$v), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$w), null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(testTarget.value ? `Test Broadcast: ${testTarget.value.title}` : "Test Broadcast"), 1)
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$x), null, {
                              default: withCtx(() => [
                                createTextVNode(" Tambahkan beberapa nomor custom. Semua nomor valid akan masuk antrean queue test kirim. ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode("form", {
                          class: "space-y-4",
                          onSubmit: withModifiers(handleTestMultipleSend, ["prevent"])
                        }, [
                          createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$y), { for: "test_template_id" }, {
                                default: withCtx(() => [
                                  createTextVNode("Template ID")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a), {
                                id: "test_template_id",
                                modelValue: testTemplateId.value,
                                "onUpdate:modelValue": ($event) => testTemplateId.value = $event,
                                placeholder: "Kosongkan untuk default",
                                class: { "border-destructive": !!testErrors.value.template_id }
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              testErrors.value.template_id ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-xs text-destructive"
                              }, toDisplayString(testErrors.value.template_id), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(_sfc_main$y), { for: "test_message" }, {
                                default: withCtx(() => [
                                  createTextVNode("Isi Pesan")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$z), {
                                id: "test_message",
                                modelValue: testMessage.value,
                                "onUpdate:modelValue": ($event) => testMessage.value = $event,
                                rows: "3",
                                class: { "border-destructive": !!testErrors.value.message }
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "class"]),
                              testErrors.value.message ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-xs text-destructive"
                              }, toDisplayString(testErrors.value.message), 1)) : createCommentVNode("", true)
                            ])
                          ]),
                          createVNode("div", { class: "space-y-3" }, [
                            createVNode("div", { class: "flex items-center justify-between" }, [
                              createVNode(unref(_sfc_main$y), null, {
                                default: withCtx(() => [
                                  createTextVNode("Daftar Nomor Tujuan")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$2), {
                                type: "button",
                                variant: "outline",
                                size: "sm",
                                onClick: addTestRecipient
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Plus), { class: "h-4 w-4 mr-2" }),
                                  createTextVNode(" Tambah Nomor ")
                                ]),
                                _: 1
                              })
                            ]),
                            (openBlock(true), createBlock(Fragment, null, renderList(testRecipients.value, (recipient, index) => {
                              return openBlock(), createBlock("div", {
                                key: recipient.id,
                                class: "grid gap-3 rounded-lg border p-3 md:grid-cols-[1fr_1fr_auto]"
                              }, [
                                createVNode("div", { class: "space-y-2" }, [
                                  createVNode(unref(_sfc_main$y), {
                                    for: `test_name_${recipient.id}`
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Nama (opsional)")
                                    ]),
                                    _: 1
                                  }, 8, ["for"]),
                                  createVNode(unref(_sfc_main$a), {
                                    id: `test_name_${recipient.id}`,
                                    modelValue: recipient.name,
                                    "onUpdate:modelValue": ($event) => recipient.name = $event,
                                    placeholder: "Contoh: Admin QA",
                                    class: { "border-destructive": !!getTestFieldError(index, "name") }
                                  }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "class"]),
                                  getTestFieldError(index, "name") ? (openBlock(), createBlock("p", {
                                    key: 0,
                                    class: "text-xs text-destructive"
                                  }, toDisplayString(getTestFieldError(index, "name")), 1)) : createCommentVNode("", true)
                                ]),
                                createVNode("div", { class: "space-y-2" }, [
                                  createVNode(unref(_sfc_main$y), {
                                    for: `test_phone_${recipient.id}`
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("No. WhatsApp *")
                                    ]),
                                    _: 1
                                  }, 8, ["for"]),
                                  createVNode(unref(_sfc_main$a), {
                                    id: `test_phone_${recipient.id}`,
                                    modelValue: recipient.phone,
                                    "onUpdate:modelValue": ($event) => recipient.phone = $event,
                                    placeholder: "081234567890",
                                    class: { "border-destructive": !!getTestFieldError(index, "phone") }
                                  }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "class"]),
                                  getTestFieldError(index, "phone") ? (openBlock(), createBlock("p", {
                                    key: 0,
                                    class: "text-xs text-destructive"
                                  }, toDisplayString(getTestFieldError(index, "phone")), 1)) : createCommentVNode("", true)
                                ]),
                                createVNode("div", { class: "flex items-end" }, [
                                  createVNode(unref(_sfc_main$2), {
                                    type: "button",
                                    variant: "ghost",
                                    size: "icon",
                                    onClick: ($event) => removeTestRecipient(index)
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Trash2), { class: "h-4 w-4" })
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ])
                              ]);
                            }), 128)),
                            testErrors.value.recipients ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-xs text-destructive"
                            }, toDisplayString(testErrors.value.recipients), 1)) : createCommentVNode("", true)
                          ]),
                          testGeneralError.value ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive"
                          }, toDisplayString(testGeneralError.value), 1)) : createCommentVNode("", true),
                          createVNode(unref(_sfc_main$A), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$2), {
                                type: "button",
                                variant: "outline",
                                onClick: ($event) => setTestDialogOpen(false)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Batal ")
                                ]),
                                _: 1
                              }, 8, ["onClick"]),
                              createVNode(unref(_sfc_main$2), {
                                type: "submit",
                                disabled: isSubmittingTest.value
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(TestTube2), { class: "h-4 w-4 mr-2" }),
                                  createTextVNode(" " + toDisplayString(isSubmittingTest.value ? "Memproses..." : "Kirim Test ke Queue"), 1)
                                ]),
                                _: 1
                              }, 8, ["disabled"])
                            ]),
                            _: 1
                          })
                        ], 32)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["open"]),
                createVNode(_sfc_main$B, {
                  open: sendDialogOpen.value,
                  title: sendTarget.value ? `Kirim Broadcast: ${sendTarget.value.title}?` : "Kirim Broadcast?",
                  description: sendTarget.value ? "Pesan akan dikirim ke semua nomor customer yang unik. Lanjutkan proses pengiriman sekarang?" : "Pesan akan dikirim ke semua nomor customer yang unik.",
                  "confirm-text": "Kirim Sekarang",
                  "cancel-text": "Batal",
                  "onUpdate:open": setSendDialogOpen,
                  onConfirm: handleSendBroadcast
                }, null, 8, ["open", "title", "description"]),
                createVNode(_sfc_main$B, {
                  open: deleteDialogOpen.value,
                  title: deleteTarget.value ? `Hapus Riwayat: ${deleteTarget.value.title}?` : "Hapus Riwayat?",
                  description: deleteTarget.value ? "Data riwayat broadcast beserta daftar penerima akan dihapus permanen." : "Data riwayat broadcast akan dihapus permanen.",
                  "confirm-text": "Hapus",
                  "cancel-text": "Batal",
                  variant: "destructive",
                  "onUpdate:open": setDeleteDialogOpen,
                  onConfirm: handleDeleteBroadcast
                }, null, 8, ["open", "title", "description"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Admin/WhatsAppBroadcasts/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
