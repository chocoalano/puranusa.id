import { onMounted, ref } from "vue";
function updateTheme(value) {
  if (typeof window === "undefined") {
    return;
  }
  if (value === "system") {
    const mediaQueryList = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    const systemTheme = mediaQueryList.matches ? "dark" : "light";
    document.documentElement.classList.toggle(
      "dark",
      systemTheme === "dark"
    );
  } else {
    document.documentElement.classList.toggle("dark", value === "dark");
  }
}
const setCookie = (name, value, days = 365) => {
  if (typeof document === "undefined") {
    return;
  }
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};
const appearance = ref("system");
function useAppearance() {
  onMounted(() => {
    const savedAppearance = localStorage.getItem(
      "appearance"
    );
    if (savedAppearance) {
      appearance.value = savedAppearance;
    }
  });
  function updateAppearance(value) {
    appearance.value = value;
    localStorage.setItem("appearance", value);
    setCookie("appearance", value);
    updateTheme(value);
  }
  return {
    appearance,
    updateAppearance
  };
}
export {
  useAppearance as u
};
