import { q as queryParams } from "./index-3UqiGNe9.js";
const login = (options) => ({
  url: login.url(options),
  method: "get"
});
login.definition = {
  methods: ["get", "head"],
  url: "/admin/login"
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
const logout = (options) => ({
  url: logout.url(options),
  method: "post"
});
logout.definition = {
  methods: ["post"],
  url: "/admin/logout"
};
logout.url = (options) => {
  return logout.definition.url + queryParams(options);
};
logout.post = (options) => ({
  url: logout.url(options),
  method: "post"
});
const logoutForm = (options) => ({
  action: logout.url(options),
  method: "post"
});
logoutForm.post = (options) => ({
  action: logout.url(options),
  method: "post"
});
logout.form = logoutForm;
const register = (options) => ({
  url: register.url(options),
  method: "get"
});
register.definition = {
  methods: ["get", "head"],
  url: "/admin/register"
};
register.url = (options) => {
  return register.definition.url + queryParams(options);
};
register.get = (options) => ({
  url: register.url(options),
  method: "get"
});
register.head = (options) => ({
  url: register.url(options),
  method: "head"
});
const registerForm = (options) => ({
  action: register.url(options),
  method: "get"
});
registerForm.get = (options) => ({
  action: register.url(options),
  method: "get"
});
registerForm.head = (options) => ({
  action: register.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
register.form = registerForm;
const csrfToken = (options) => ({
  url: csrfToken.url(options),
  method: "get"
});
csrfToken.definition = {
  methods: ["get", "head"],
  url: "/csrf-token"
};
csrfToken.url = (options) => {
  return csrfToken.definition.url + queryParams(options);
};
csrfToken.get = (options) => ({
  url: csrfToken.url(options),
  method: "get"
});
csrfToken.head = (options) => ({
  url: csrfToken.url(options),
  method: "head"
});
const csrfTokenForm = (options) => ({
  action: csrfToken.url(options),
  method: "get"
});
csrfTokenForm.get = (options) => ({
  action: csrfToken.url(options),
  method: "get"
});
csrfTokenForm.head = (options) => ({
  action: csrfToken.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
csrfToken.form = csrfTokenForm;
const home = (options) => ({
  url: home.url(options),
  method: "get"
});
home.definition = {
  methods: ["get", "head"],
  url: "/"
};
home.url = (options) => {
  return home.definition.url + queryParams(options);
};
home.get = (options) => ({
  url: home.url(options),
  method: "get"
});
home.head = (options) => ({
  url: home.url(options),
  method: "head"
});
const homeForm = (options) => ({
  action: home.url(options),
  method: "get"
});
homeForm.get = (options) => ({
  action: home.url(options),
  method: "get"
});
homeForm.head = (options) => ({
  action: home.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
home.form = homeForm;
const timezone = (options) => ({
  url: timezone.url(options),
  method: "get"
});
timezone.definition = {
  methods: ["get", "head"],
  url: "/timezone"
};
timezone.url = (options) => {
  return timezone.definition.url + queryParams(options);
};
timezone.get = (options) => ({
  url: timezone.url(options),
  method: "get"
});
timezone.head = (options) => ({
  url: timezone.url(options),
  method: "head"
});
const timezoneForm = (options) => ({
  action: timezone.url(options),
  method: "get"
});
timezoneForm.get = (options) => ({
  action: timezone.url(options),
  method: "get"
});
timezoneForm.head = (options) => ({
  action: timezone.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
timezone.form = timezoneForm;
const dashboard = (options) => ({
  url: dashboard.url(options),
  method: "get"
});
dashboard.definition = {
  methods: ["get", "head"],
  url: "/dashboard"
};
dashboard.url = (options) => {
  return dashboard.definition.url + queryParams(options);
};
dashboard.get = (options) => ({
  url: dashboard.url(options),
  method: "get"
});
dashboard.head = (options) => ({
  url: dashboard.url(options),
  method: "head"
});
const dashboardForm = (options) => ({
  action: dashboard.url(options),
  method: "get"
});
dashboardForm.get = (options) => ({
  action: dashboard.url(options),
  method: "get"
});
dashboardForm.head = (options) => ({
  action: dashboard.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
dashboard.form = dashboardForm;
const documentation = (options) => ({
  url: documentation.url(options),
  method: "get"
});
documentation.definition = {
  methods: ["get", "head"],
  url: "/documentation"
};
documentation.url = (options) => {
  return documentation.definition.url + queryParams(options);
};
documentation.get = (options) => ({
  url: documentation.url(options),
  method: "get"
});
documentation.head = (options) => ({
  url: documentation.url(options),
  method: "head"
});
const documentationForm = (options) => ({
  action: documentation.url(options),
  method: "get"
});
documentationForm.get = (options) => ({
  action: documentation.url(options),
  method: "get"
});
documentationForm.head = (options) => ({
  action: documentation.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
documentation.form = documentationForm;
export {
  login as a,
  dashboard as d,
  home as h,
  logout as l,
  register as r
};
