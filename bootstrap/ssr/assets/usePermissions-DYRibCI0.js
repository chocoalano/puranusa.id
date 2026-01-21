import { computed } from "vue";
import { usePage } from "@inertiajs/vue3";
function usePermissions() {
  const page = usePage();
  const authUser = computed(() => page.props.auth?.user ?? null);
  const isSuperAdmin = computed(() => !!authUser.value?.is_superadmin);
  const isAdmin = computed(() => !!authUser.value?.is_admin);
  const role = computed(() => authUser.value?.role ?? null);
  const isStaff = computed(() => isSuperAdmin.value || isAdmin.value);
  return {
    authUser,
    role,
    isSuperAdmin,
    isAdmin,
    isStaff
  };
}
export {
  usePermissions as u
};
