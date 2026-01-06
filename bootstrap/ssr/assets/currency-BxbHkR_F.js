function formatCurrency(amount, fallback = "Rp 0") {
  if (amount === null || amount === void 0 || amount === "") {
    return fallback;
  }
  const num = typeof amount === "number" ? amount : parseFloat(String(amount));
  if (isNaN(num)) {
    return fallback;
  }
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(num);
}
function safeNumber(value) {
  if (value === null || value === void 0 || value === "") {
    return 0;
  }
  const num = typeof value === "number" ? value : parseFloat(String(value));
  return isNaN(num) ? 0 : num;
}
export {
  formatCurrency as f,
  safeNumber as s
};
