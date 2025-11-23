# Bug Fix: SelectItem Empty String Value Error

## Issue
When accessing admin pages with filter dropdowns (wallet-transactions, networks/binary, networks/matrix), a Vue error occurred:
```
SelectItem must have a value prop that is not an empty string
```

This error was caused by reka-ui's SelectItem component validation rejecting empty string values.

## Root Cause
Filter configurations used empty strings (`''`) for the "all" option in select dropdowns:
```typescript
options: [
  { value: '', label: 'Semua Tipe' },  // ❌ Empty string rejected by reka-ui
  { value: 'topup', label: 'Top Up' },
  ...
]
```

## Solution Applied

### 1. Updated TableFilters.vue Component
Changed SelectItem rendering to use fallback value:
```typescript
// Before:
<SelectItem :value="option.value" :key="option.value">

// After:
<SelectItem :value="option.value || 'all'" :key="option.value || 'all'">
```

### 2. Updated All Admin Pages
Modified three pages to use `'all'` instead of empty string for default filter values:

#### A. Wallets/Transactions.vue
- Changed filter refs: `selectedType` and `selectedStatus` default from `''` to `'all'`
- Updated filter options: `{ value: 'all', label: 'Semua Tipe/Status' }`
- Modified handlers to convert `'all'` to `undefined` for API calls:
  ```typescript
  type: selectedType.value === 'all' ? undefined : selectedType.value
  status: selectedStatus.value === 'all' ? undefined : selectedStatus.value
  ```

#### B. Networks/Binary.vue
- Changed filter ref: `selectedPosition` default from `''` to `'all'`
- Updated filter options: `{ value: 'all', label: 'Semua Posisi' }`
- Modified handlers to convert `'all'` to `undefined` for API calls:
  ```typescript
  position: selectedPosition.value === 'all' ? undefined : selectedPosition.value
  ```

#### C. Networks/Matrix.vue
- Changed filter ref: `selectedLevel` default from `''` to `'all'`
- Updated filter options: `{ value: 'all', label: 'Semua Level' }`
- Modified handlers to convert `'all'` to `undefined` for API calls:
  ```typescript
  level: selectedLevel.value === 'all' ? undefined : selectedLevel.value
  ```

## Handler Logic Pattern
All pages now follow this pattern:
```typescript
const handleFilterUpdate = (index: number, value: any) => {
  const val = value?.toString() || 'all'  // Default to 'all' instead of ''
  
  if (index === 0) {
    // Search filter
    searchQuery.value = val
    handleSearch()
  } else if (index === 1) {
    // Select filter
    selectedFilter.value = val
    router.get('/route', {
      search: searchQuery.value,
      filter: val === 'all' ? undefined : val  // Convert 'all' to undefined
    }, { preserveState: true, preserveScroll: true })
  }
}
```

## Testing
- ✅ All TypeScript compilation errors resolved
- ✅ No ESLint errors
- ✅ Laravel Pint formatting passed
- ✅ Filter dropdowns render without errors
- ✅ Selecting "Semua X" (all) option works correctly
- ✅ Selecting specific filter values works correctly

## Files Modified
1. `/resources/js/components/admin/TableFilters.vue` - Component-level fix
2. `/resources/js/pages/Admin/Wallets/Transactions.vue` - Type & Status filters
3. `/resources/js/pages/Admin/Networks/Binary.vue` - Position filter
4. `/resources/js/pages/Admin/Networks/Matrix.vue` - Level filter

## Best Practice Going Forward
When creating new admin pages with filter dropdowns:
- Always use `'all'` (or other non-empty string) for "show all" options
- Never use empty string `''` as a SelectItem value
- Convert `'all'` to `undefined` in API calls to ensure backend receives no filter parameter
