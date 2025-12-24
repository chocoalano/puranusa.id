import { defineComponent, mergeProps, withCtx, unref, createTextVNode, createBlock, createCommentVNode, openBlock, createVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$4 } from "./InputError-BhTWS2NZ.js";
import { _ as _sfc_main$7 } from "./TextLink-DTyK6a-s.js";
import { _ as _sfc_main$5 } from "./index-SN_CnQ_F.js";
import { _ as _sfc_main$3 } from "./Input-BGi8wCMh.js";
import { _ as _sfc_main$2 } from "./Label-16aMY2sx.js";
import { _ as _sfc_main$6 } from "./Spinner-HF6xsI_i.js";
import { _ as _sfc_main$1 } from "./AuthLayout-DWijdgiY.js";
import { a as login } from "./index-B0NlPG4h.js";
import { q as queryParams } from "./index--D7ld9AJ.js";
import { useForm, Head } from "@inertiajs/vue3";
import "class-variance-authority";
import "reka-ui";
import "clsx";
import "tailwind-merge";
import "@vueuse/core";
import "lucide-vue-next";
import "./AppLogoIcon-CtV9aC-8.js";
const store = (options) => ({
  url: store.url(options),
  method: "post"
});
store.definition = {
  methods: ["post"],
  url: "/admin/register"
};
store.url = (options) => {
  return store.definition.url + queryParams(options);
};
store.post = (options) => ({
  url: store.url(options),
  method: "post"
});
const storeForm = (options) => ({
  action: store.url(options),
  method: "post"
});
storeForm.post = (options) => ({
  action: store.url(options),
  method: "post"
});
store.form = storeForm;
({
  store: Object.assign(store, store)
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Register",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      name: "",
      email: "",
      password: "",
      password_confirmation: ""
    });
    const submit = () => {
      form.post(store.url(), {
        onFinish: () => {
          form.reset("password", "password_confirmation");
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        title: "Buat akun baru",
        description: "Masukkan data Anda untuk membuat akun"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Daftar" }, null, _parent2, _scopeId));
            _push2(`<form class="flex flex-col gap-6"${_scopeId}><div class="grid gap-6"${_scopeId}><div class="grid gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), { for: "name" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Nama`);
                } else {
                  return [
                    createTextVNode("Nama")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$3), {
              id: "name",
              type: "text",
              modelValue: unref(form).name,
              "onUpdate:modelValue": ($event) => unref(form).name = $event,
              required: "",
              autofocus: "",
              tabindex: 1,
              autocomplete: "name",
              placeholder: "Nama lengkap"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(form).errors.name
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="grid gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), { for: "email" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Alamat Email`);
                } else {
                  return [
                    createTextVNode("Alamat Email")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$3), {
              id: "email",
              type: "email",
              modelValue: unref(form).email,
              "onUpdate:modelValue": ($event) => unref(form).email = $event,
              required: "",
              tabindex: 2,
              autocomplete: "email",
              placeholder: "email@contoh.com"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(form).errors.email
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="grid gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), { for: "password" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Kata Sandi`);
                } else {
                  return [
                    createTextVNode("Kata Sandi")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$3), {
              id: "password",
              type: "password",
              modelValue: unref(form).password,
              "onUpdate:modelValue": ($event) => unref(form).password = $event,
              required: "",
              tabindex: 3,
              autocomplete: "new-password",
              placeholder: "Kata sandi"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(form).errors.password
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="grid gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), { for: "password_confirmation" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Konfirmasi Kata Sandi`);
                } else {
                  return [
                    createTextVNode("Konfirmasi Kata Sandi")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$3), {
              id: "password_confirmation",
              type: "password",
              modelValue: unref(form).password_confirmation,
              "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
              required: "",
              tabindex: 4,
              autocomplete: "new-password",
              placeholder: "Konfirmasi kata sandi"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              message: unref(form).errors.password_confirmation
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$5), {
              type: "submit",
              class: "mt-2 w-full",
              tabindex: "5",
              disabled: unref(form).processing,
              "data-test": "register-user-button"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(form).processing) {
                    _push3(ssrRenderComponent(unref(_sfc_main$6), null, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(` Buat Akun `);
                } else {
                  return [
                    unref(form).processing ? (openBlock(), createBlock(unref(_sfc_main$6), { key: 0 })) : createCommentVNode("", true),
                    createTextVNode(" Buat Akun ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="text-center text-sm text-muted-foreground"${_scopeId}> Sudah punya akun? `);
            _push2(ssrRenderComponent(_sfc_main$7, {
              href: unref(login)(),
              class: "underline underline-offset-4",
              tabindex: 6
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Masuk`);
                } else {
                  return [
                    createTextVNode("Masuk")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Daftar" }),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"]),
                class: "flex flex-col gap-6"
              }, [
                createVNode("div", { class: "grid gap-6" }, [
                  createVNode("div", { class: "grid gap-2" }, [
                    createVNode(unref(_sfc_main$2), { for: "name" }, {
                      default: withCtx(() => [
                        createTextVNode("Nama")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$3), {
                      id: "name",
                      type: "text",
                      modelValue: unref(form).name,
                      "onUpdate:modelValue": ($event) => unref(form).name = $event,
                      required: "",
                      autofocus: "",
                      tabindex: 1,
                      autocomplete: "name",
                      placeholder: "Nama lengkap"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_sfc_main$4, {
                      message: unref(form).errors.name
                    }, null, 8, ["message"])
                  ]),
                  createVNode("div", { class: "grid gap-2" }, [
                    createVNode(unref(_sfc_main$2), { for: "email" }, {
                      default: withCtx(() => [
                        createTextVNode("Alamat Email")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$3), {
                      id: "email",
                      type: "email",
                      modelValue: unref(form).email,
                      "onUpdate:modelValue": ($event) => unref(form).email = $event,
                      required: "",
                      tabindex: 2,
                      autocomplete: "email",
                      placeholder: "email@contoh.com"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_sfc_main$4, {
                      message: unref(form).errors.email
                    }, null, 8, ["message"])
                  ]),
                  createVNode("div", { class: "grid gap-2" }, [
                    createVNode(unref(_sfc_main$2), { for: "password" }, {
                      default: withCtx(() => [
                        createTextVNode("Kata Sandi")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$3), {
                      id: "password",
                      type: "password",
                      modelValue: unref(form).password,
                      "onUpdate:modelValue": ($event) => unref(form).password = $event,
                      required: "",
                      tabindex: 3,
                      autocomplete: "new-password",
                      placeholder: "Kata sandi"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_sfc_main$4, {
                      message: unref(form).errors.password
                    }, null, 8, ["message"])
                  ]),
                  createVNode("div", { class: "grid gap-2" }, [
                    createVNode(unref(_sfc_main$2), { for: "password_confirmation" }, {
                      default: withCtx(() => [
                        createTextVNode("Konfirmasi Kata Sandi")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$3), {
                      id: "password_confirmation",
                      type: "password",
                      modelValue: unref(form).password_confirmation,
                      "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                      required: "",
                      tabindex: 4,
                      autocomplete: "new-password",
                      placeholder: "Konfirmasi kata sandi"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_sfc_main$4, {
                      message: unref(form).errors.password_confirmation
                    }, null, 8, ["message"])
                  ]),
                  createVNode(unref(_sfc_main$5), {
                    type: "submit",
                    class: "mt-2 w-full",
                    tabindex: "5",
                    disabled: unref(form).processing,
                    "data-test": "register-user-button"
                  }, {
                    default: withCtx(() => [
                      unref(form).processing ? (openBlock(), createBlock(unref(_sfc_main$6), { key: 0 })) : createCommentVNode("", true),
                      createTextVNode(" Buat Akun ")
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ]),
                createVNode("div", { class: "text-center text-sm text-muted-foreground" }, [
                  createTextVNode(" Sudah punya akun? "),
                  createVNode(_sfc_main$7, {
                    href: unref(login)(),
                    class: "underline underline-offset-4",
                    tabindex: 6
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Masuk")
                    ]),
                    _: 1
                  }, 8, ["href"])
                ])
              ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/auth/Register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
