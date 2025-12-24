import { q as queryParams } from "./index--D7ld9AJ.js";
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
