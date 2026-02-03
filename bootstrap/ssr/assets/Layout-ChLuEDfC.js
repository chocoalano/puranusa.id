import { defineComponent, mergeProps, unref, withCtx, createVNode, resolveDynamicComponent, createBlock, createTextVNode, openBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderVNode, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./Heading-CyRBBIB2.js";
import { _ as _sfc_main$2, u as urlIsActive, t as toUrl } from "./index-SN_CnQ_F.js";
import { e as _sfc_main$3 } from "./DropdownMenuTrigger-B1v6pHML.js";
import { q as queryParams } from "./index--D7ld9AJ.js";
import { an as edit$2 } from "./AppLayout-B9pGpPI9.js";
import { l as login$1 } from "./index-CTv85sGw.js";
import { Link } from "@inertiajs/vue3";
const edit$1 = (options) => ({
  url: edit$1.url(options),
  method: "get"
});
edit$1.definition = {
  methods: ["get", "head"],
  url: "/settings/appearance"
};
edit$1.url = (options) => {
  return edit$1.definition.url + queryParams(options);
};
edit$1.get = (options) => ({
  url: edit$1.url(options),
  method: "get"
});
edit$1.head = (options) => ({
  url: edit$1.url(options),
  method: "head"
});
const editForm$1 = (options) => ({
  action: edit$1.url(options),
  method: "get"
});
editForm$1.get = (options) => ({
  action: edit$1.url(options),
  method: "get"
});
editForm$1.head = (options) => ({
  action: edit$1.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
edit$1.form = editForm$1;
({
  edit: Object.assign(edit$1, edit$1)
});
const login = (options) => ({
  url: login.url(options),
  method: "get"
});
login.definition = {
  methods: ["get", "head"],
  url: "/admin/two-factor-challenge"
};
login.url = (options) => {
  return login.definition.url + queryParams(options);
};
login.get = (options) => ({
  url: login.url(options),
  method: "get"
});
login.head = (options) => ({
  url: login.url(options),
  method: "head"
});
const loginForm = (options) => ({
  action: login.url(options),
  method: "get"
});
loginForm.get = (options) => ({
  action: login.url(options),
  method: "get"
});
loginForm.head = (options) => ({
  action: login.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
login.form = loginForm;
const enable = (options) => ({
  url: enable.url(options),
  method: "post"
});
enable.definition = {
  methods: ["post"],
  url: "/admin/user/two-factor-authentication"
};
enable.url = (options) => {
  return enable.definition.url + queryParams(options);
};
enable.post = (options) => ({
  url: enable.url(options),
  method: "post"
});
const enableForm = (options) => ({
  action: enable.url(options),
  method: "post"
});
enableForm.post = (options) => ({
  action: enable.url(options),
  method: "post"
});
enable.form = enableForm;
const confirm = (options) => ({
  url: confirm.url(options),
  method: "post"
});
confirm.definition = {
  methods: ["post"],
  url: "/admin/user/confirmed-two-factor-authentication"
};
confirm.url = (options) => {
  return confirm.definition.url + queryParams(options);
};
confirm.post = (options) => ({
  url: confirm.url(options),
  method: "post"
});
const confirmForm = (options) => ({
  action: confirm.url(options),
  method: "post"
});
confirmForm.post = (options) => ({
  action: confirm.url(options),
  method: "post"
});
confirm.form = confirmForm;
const disable = (options) => ({
  url: disable.url(options),
  method: "delete"
});
disable.definition = {
  methods: ["delete"],
  url: "/admin/user/two-factor-authentication"
};
disable.url = (options) => {
  return disable.definition.url + queryParams(options);
};
disable.delete = (options) => ({
  url: disable.url(options),
  method: "delete"
});
const disableForm = (options) => ({
  action: disable.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
disableForm.delete = (options) => ({
  action: disable.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
disable.form = disableForm;
const qrCode = (options) => ({
  url: qrCode.url(options),
  method: "get"
});
qrCode.definition = {
  methods: ["get", "head"],
  url: "/admin/user/two-factor-qr-code"
};
qrCode.url = (options) => {
  return qrCode.definition.url + queryParams(options);
};
qrCode.get = (options) => ({
  url: qrCode.url(options),
  method: "get"
});
qrCode.head = (options) => ({
  url: qrCode.url(options),
  method: "head"
});
const qrCodeForm = (options) => ({
  action: qrCode.url(options),
  method: "get"
});
qrCodeForm.get = (options) => ({
  action: qrCode.url(options),
  method: "get"
});
qrCodeForm.head = (options) => ({
  action: qrCode.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
qrCode.form = qrCodeForm;
const secretKey = (options) => ({
  url: secretKey.url(options),
  method: "get"
});
secretKey.definition = {
  methods: ["get", "head"],
  url: "/admin/user/two-factor-secret-key"
};
secretKey.url = (options) => {
  return secretKey.definition.url + queryParams(options);
};
secretKey.get = (options) => ({
  url: secretKey.url(options),
  method: "get"
});
secretKey.head = (options) => ({
  url: secretKey.url(options),
  method: "head"
});
const secretKeyForm = (options) => ({
  action: secretKey.url(options),
  method: "get"
});
secretKeyForm.get = (options) => ({
  action: secretKey.url(options),
  method: "get"
});
secretKeyForm.head = (options) => ({
  action: secretKey.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
secretKey.form = secretKeyForm;
const recoveryCodes = (options) => ({
  url: recoveryCodes.url(options),
  method: "get"
});
recoveryCodes.definition = {
  methods: ["get", "head"],
  url: "/admin/user/two-factor-recovery-codes"
};
recoveryCodes.url = (options) => {
  return recoveryCodes.definition.url + queryParams(options);
};
recoveryCodes.get = (options) => ({
  url: recoveryCodes.url(options),
  method: "get"
});
recoveryCodes.head = (options) => ({
  url: recoveryCodes.url(options),
  method: "head"
});
const recoveryCodesForm = (options) => ({
  action: recoveryCodes.url(options),
  method: "get"
});
recoveryCodesForm.get = (options) => ({
  action: recoveryCodes.url(options),
  method: "get"
});
recoveryCodesForm.head = (options) => ({
  action: recoveryCodes.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
recoveryCodes.form = recoveryCodesForm;
const regenerateRecoveryCodes = (options) => ({
  url: regenerateRecoveryCodes.url(options),
  method: "post"
});
regenerateRecoveryCodes.definition = {
  methods: ["post"],
  url: "/admin/user/two-factor-recovery-codes"
};
regenerateRecoveryCodes.url = (options) => {
  return regenerateRecoveryCodes.definition.url + queryParams(options);
};
regenerateRecoveryCodes.post = (options) => ({
  url: regenerateRecoveryCodes.url(options),
  method: "post"
});
const regenerateRecoveryCodesForm = (options) => ({
  action: regenerateRecoveryCodes.url(options),
  method: "post"
});
regenerateRecoveryCodesForm.post = (options) => ({
  action: regenerateRecoveryCodes.url(options),
  method: "post"
});
regenerateRecoveryCodes.form = regenerateRecoveryCodesForm;
const show = (options) => ({
  url: show.url(options),
  method: "get"
});
show.definition = {
  methods: ["get", "head"],
  url: "/settings/two-factor"
};
show.url = (options) => {
  return show.definition.url + queryParams(options);
};
show.get = (options) => ({
  url: show.url(options),
  method: "get"
});
show.head = (options) => ({
  url: show.url(options),
  method: "head"
});
const showForm = (options) => ({
  action: show.url(options),
  method: "get"
});
showForm.get = (options) => ({
  action: show.url(options),
  method: "get"
});
showForm.head = (options) => ({
  action: show.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
show.form = showForm;
({
  login: Object.assign(login, login$1),
  enable: Object.assign(enable, enable),
  confirm: Object.assign(confirm, confirm),
  disable: Object.assign(disable, disable),
  qrCode: Object.assign(qrCode, qrCode),
  secretKey: Object.assign(secretKey, secretKey),
  recoveryCodes: Object.assign(recoveryCodes, recoveryCodes),
  regenerateRecoveryCodes: Object.assign(regenerateRecoveryCodes, regenerateRecoveryCodes),
  show: Object.assign(show, show)
});
const edit = (options) => ({
  url: edit.url(options),
  method: "get"
});
edit.definition = {
  methods: ["get", "head"],
  url: "/settings/password"
};
edit.url = (options) => {
  return edit.definition.url + queryParams(options);
};
edit.get = (options) => ({
  url: edit.url(options),
  method: "get"
});
edit.head = (options) => ({
  url: edit.url(options),
  method: "head"
});
const editForm = (options) => ({
  action: edit.url(options),
  method: "get"
});
editForm.get = (options) => ({
  action: edit.url(options),
  method: "get"
});
editForm.head = (options) => ({
  action: edit.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
edit.form = editForm;
const update = (options) => ({
  url: update.url(options),
  method: "put"
});
update.definition = {
  methods: ["put"],
  url: "/settings/password"
};
update.url = (options) => {
  return update.definition.url + queryParams(options);
};
update.put = (options) => ({
  url: update.url(options),
  method: "put"
});
const updateForm = (options) => ({
  action: update.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
updateForm.put = (options) => ({
  action: update.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
update.form = updateForm;
({
  edit: Object.assign(edit, edit),
  update: Object.assign(update, update)
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Layout",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarNavItems = [
      {
        title: "Profile",
        href: edit$2()
      },
      {
        title: "Password",
        href: edit()
      },
      {
        title: "Two-Factor Auth",
        href: show()
      },
      {
        title: "Appearance",
        href: edit$1()
      }
    ];
    const currentPath = typeof window !== "undefined" ? window.location.pathname : "";
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "px-4 py-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        title: "Settings",
        description: "Manage your profile and account settings"
      }, null, _parent));
      _push(`<div class="flex flex-col lg:flex-row lg:space-x-12"><aside class="w-full max-w-xl lg:w-48"><nav class="flex flex-col space-y-1 space-x-0"><!--[-->`);
      ssrRenderList(sidebarNavItems, (item) => {
        _push(ssrRenderComponent(unref(_sfc_main$2), {
          key: unref(toUrl)(item.href),
          variant: "ghost",
          class: [
            "w-full justify-start",
            { "bg-muted": unref(urlIsActive)(item.href, unref(currentPath)) }
          ],
          "as-child": ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Link), {
                href: item.href
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(item.icon), { class: "h-4 w-4" }, null), _parent3, _scopeId2);
                    _push3(` ${ssrInterpolate(item.title)}`);
                  } else {
                    return [
                      (openBlock(), createBlock(resolveDynamicComponent(item.icon), { class: "h-4 w-4" })),
                      createTextVNode(" " + toDisplayString(item.title), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(Link), {
                  href: item.href
                }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock(resolveDynamicComponent(item.icon), { class: "h-4 w-4" })),
                    createTextVNode(" " + toDisplayString(item.title), 1)
                  ]),
                  _: 2
                }, 1032, ["href"])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></nav></aside>`);
      _push(ssrRenderComponent(unref(_sfc_main$3), { class: "my-6 lg:hidden" }, null, _parent));
      _push(`<div class="flex-1 md:max-w-2xl"><section class="max-w-xl space-y-12">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</section></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/layouts/settings/Layout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _,
  edit as a,
  regenerateRecoveryCodes as b,
  confirm as c,
  show as d,
  edit$1 as e,
  enable as f,
  disable as g,
  qrCode as q,
  recoveryCodes as r,
  secretKey as s
};
