import { q as queryParams, a as applyUrlDefaults } from "./index--D7ld9AJ.js";
const index = (options) => ({
  url: index.url(options),
  method: "get"
});
index.definition = {
  methods: ["get", "head"],
  url: "/bonus/regular"
};
index.url = (options) => {
  return index.definition.url + queryParams(options);
};
index.get = (options) => ({
  url: index.url(options),
  method: "get"
});
index.head = (options) => ({
  url: index.url(options),
  method: "head"
});
const indexForm = (options) => ({
  action: index.url(options),
  method: "get"
});
indexForm.get = (options) => ({
  action: index.url(options),
  method: "get"
});
indexForm.head = (options) => ({
  action: index.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
index.form = indexForm;
const create = (options) => ({
  url: create.url(options),
  method: "get"
});
create.definition = {
  methods: ["get", "head"],
  url: "/bonus/regular/create"
};
create.url = (options) => {
  return create.definition.url + queryParams(options);
};
create.get = (options) => ({
  url: create.url(options),
  method: "get"
});
create.head = (options) => ({
  url: create.url(options),
  method: "head"
});
const createForm = (options) => ({
  action: create.url(options),
  method: "get"
});
createForm.get = (options) => ({
  action: create.url(options),
  method: "get"
});
createForm.head = (options) => ({
  action: create.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
create.form = createForm;
const store = (options) => ({
  url: store.url(options),
  method: "post"
});
store.definition = {
  methods: ["post"],
  url: "/bonus/regular"
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
const show = (args, options) => ({
  url: show.url(args, options),
  method: "get"
});
show.definition = {
  methods: ["get", "head"],
  url: "/bonus/regular/{customerBonus}"
};
show.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { customerBonus: args };
  }
  if (Array.isArray(args)) {
    args = {
      customerBonus: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    customerBonus: args.customerBonus
  };
  return show.definition.url.replace("{customerBonus}", parsedArgs.customerBonus.toString()).replace(/\/+$/, "") + queryParams(options);
};
show.get = (args, options) => ({
  url: show.url(args, options),
  method: "get"
});
show.head = (args, options) => ({
  url: show.url(args, options),
  method: "head"
});
const showForm = (args, options) => ({
  action: show.url(args, options),
  method: "get"
});
showForm.get = (args, options) => ({
  action: show.url(args, options),
  method: "get"
});
showForm.head = (args, options) => ({
  action: show.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
show.form = showForm;
const edit = (args, options) => ({
  url: edit.url(args, options),
  method: "get"
});
edit.definition = {
  methods: ["get", "head"],
  url: "/bonus/regular/{customerBonus}/edit"
};
edit.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { customerBonus: args };
  }
  if (Array.isArray(args)) {
    args = {
      customerBonus: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    customerBonus: args.customerBonus
  };
  return edit.definition.url.replace("{customerBonus}", parsedArgs.customerBonus.toString()).replace(/\/+$/, "") + queryParams(options);
};
edit.get = (args, options) => ({
  url: edit.url(args, options),
  method: "get"
});
edit.head = (args, options) => ({
  url: edit.url(args, options),
  method: "head"
});
const editForm = (args, options) => ({
  action: edit.url(args, options),
  method: "get"
});
editForm.get = (args, options) => ({
  action: edit.url(args, options),
  method: "get"
});
editForm.head = (args, options) => ({
  action: edit.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
edit.form = editForm;
const update = (args, options) => ({
  url: update.url(args, options),
  method: "put"
});
update.definition = {
  methods: ["put", "patch"],
  url: "/bonus/regular/{customerBonus}"
};
update.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { customerBonus: args };
  }
  if (Array.isArray(args)) {
    args = {
      customerBonus: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    customerBonus: args.customerBonus
  };
  return update.definition.url.replace("{customerBonus}", parsedArgs.customerBonus.toString()).replace(/\/+$/, "") + queryParams(options);
};
update.put = (args, options) => ({
  url: update.url(args, options),
  method: "put"
});
update.patch = (args, options) => ({
  url: update.url(args, options),
  method: "patch"
});
const updateForm = (args, options) => ({
  action: update.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
updateForm.put = (args, options) => ({
  action: update.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
updateForm.patch = (args, options) => ({
  action: update.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PATCH",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
update.form = updateForm;
const destroy = (args, options) => ({
  url: destroy.url(args, options),
  method: "delete"
});
destroy.definition = {
  methods: ["delete"],
  url: "/bonus/regular/{customerBonus}"
};
destroy.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { customerBonus: args };
  }
  if (Array.isArray(args)) {
    args = {
      customerBonus: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    customerBonus: args.customerBonus
  };
  return destroy.definition.url.replace("{customerBonus}", parsedArgs.customerBonus.toString()).replace(/\/+$/, "") + queryParams(options);
};
destroy.delete = (args, options) => ({
  url: destroy.url(args, options),
  method: "delete"
});
const destroyForm = (args, options) => ({
  action: destroy.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
destroyForm.delete = (args, options) => ({
  action: destroy.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
destroy.form = destroyForm;
const release = (args, options) => ({
  url: release.url(args, options),
  method: "post"
});
release.definition = {
  methods: ["post"],
  url: "/bonus/regular/{customerBonus}/release"
};
release.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { customerBonus: args };
  }
  if (Array.isArray(args)) {
    args = {
      customerBonus: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    customerBonus: args.customerBonus
  };
  return release.definition.url.replace("{customerBonus}", parsedArgs.customerBonus.toString()).replace(/\/+$/, "") + queryParams(options);
};
release.post = (args, options) => ({
  url: release.url(args, options),
  method: "post"
});
const releaseForm = (args, options) => ({
  action: release.url(args, options),
  method: "post"
});
releaseForm.post = (args, options) => ({
  action: release.url(args, options),
  method: "post"
});
release.form = releaseForm;
const massRelease = (options) => ({
  url: massRelease.url(options),
  method: "post"
});
massRelease.definition = {
  methods: ["post"],
  url: "/bonus/regular/mass-release"
};
massRelease.url = (options) => {
  return massRelease.definition.url + queryParams(options);
};
massRelease.post = (options) => ({
  url: massRelease.url(options),
  method: "post"
});
const massReleaseForm = (options) => ({
  action: massRelease.url(options),
  method: "post"
});
massReleaseForm.post = (options) => ({
  action: massRelease.url(options),
  method: "post"
});
massRelease.form = massReleaseForm;
export {
  show as a,
  create as c,
  destroy as d,
  index as i,
  massRelease as m,
  release as r,
  store as s
};
