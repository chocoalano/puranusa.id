let urlDefaults = {};
const queryParams = (options) => {
  if (!options || !options.query && !options.mergeQuery) {
    return "";
  }
  const query = options.query ?? options.mergeQuery;
  const includeExisting = options.mergeQuery !== void 0;
  const getValue = (value) => {
    if (value === true) {
      return "1";
    }
    if (value === false) {
      return "0";
    }
    return value.toString();
  };
  const params = new URLSearchParams(
    includeExisting && typeof window !== "undefined" ? window.location.search : ""
  );
  for (const key in query) {
    if (query[key] === void 0 || query[key] === null) {
      params.delete(key);
      continue;
    }
    if (Array.isArray(query[key])) {
      if (params.has(`${key}[]`)) {
        params.delete(`${key}[]`);
      }
      query[key].forEach((value) => {
        params.append(`${key}[]`, value.toString());
      });
    } else if (typeof query[key] === "object") {
      params.forEach((_, paramKey) => {
        if (paramKey.startsWith(`${key}[`)) {
          params.delete(paramKey);
        }
      });
      for (const subKey in query[key]) {
        if (typeof query[key][subKey] === "undefined") {
          continue;
        }
        if (["string", "number", "boolean"].includes(
          typeof query[key][subKey]
        )) {
          params.set(
            `${key}[${subKey}]`,
            getValue(query[key][subKey])
          );
        }
      }
    } else {
      params.set(key, getValue(query[key]));
    }
  }
  const str = params.toString();
  return str.length > 0 ? `?${str}` : "";
};
const applyUrlDefaults = (existing) => {
  const existingParams = { ...existing ?? {} };
  for (const key in urlDefaults) {
    if (existingParams[key] === void 0 && urlDefaults[key] !== void 0) {
      existingParams[key] = urlDefaults[key];
    }
  }
  return existingParams;
};
export {
  applyUrlDefaults as a,
  queryParams as q
};
