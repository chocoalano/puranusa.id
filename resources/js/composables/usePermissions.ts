import { computed } from 'vue'
import { usePage } from '@inertiajs/vue3'
import { AppPageProps } from '@/types'

export function usePermissions() {
  const page = usePage<AppPageProps>()

  const authUser = computed(() => page.props.auth?.user ?? null)

  const isSuperAdmin = computed(() => !!authUser.value?.is_superadmin)
  const isAdmin = computed(() => !!authUser.value?.is_admin)

  // optional: fallback jika kamu hanya punya role string
  const role = computed(() => authUser.value?.role ?? null)
  const isStaff = computed(() => isSuperAdmin.value || isAdmin.value)

  return {
    authUser,
    role,
    isSuperAdmin,
    isAdmin,
    isStaff,
  }
}
