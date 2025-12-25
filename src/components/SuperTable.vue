<script setup lang="ts">
import { ref, watch } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import MultiSelect from 'primevue/multiselect'
import Skeleton from 'primevue/skeleton'

export interface ColumnConfig {
  field: string
  header: string
  sortable?: boolean
  width?: string
  align?: 'left' | 'center' | 'right'
}

interface Props {
  data: any[]
  columns: ColumnConfig[]
  showPagination?: boolean
  rows?: number
  rowsPerPageOptions?: number[]
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showPagination: true,
  rows: 10,
  rowsPerPageOptions: () => [10, 20, 50],
  loading: false
})

/* ===========================
   SELECTED COLUMNS
=========================== */

const selectedColumns = ref<ColumnConfig[]>([])

/* Inicializar columnas visibles */
watch(
  () => props.columns,
  (cols) => {
    selectedColumns.value = [...cols]
  },
  { immediate: true }
)
</script>

<template>
  <div class="super-table-wrapper">
    <DataTable
      :value="loading ? Array.from({ length: rows }) : data"
      :paginator="showPagination"
      :rows="rows"
      :rowsPerPageOptions="rowsPerPageOptions"
      :loading="loading"
      scrollable
      scrollHeight="flex"
      tableStyle="min-width: 80rem"
      stripedRows
      class="custom-table"
      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
      currentPageReportTemplate="{first} a {last} de {totalRecords}"
    >
      <!-- HEADER -->
      <template #header>
        <div class="table-header">
          <MultiSelect
            v-model="selectedColumns"
            :options="columns"
            optionLabel="header"
            display="chip"
            placeholder="Columnas visibles"
            class="column-selector"
          />
        </div>
      </template>

      <!-- EMPTY -->
      <template #empty>
        <div class="text-center p-4 text-slate-500">
          No se encontraron registros.
        </div>
      </template>

      <!-- COLUMNS -->
      <Column
        v-for="col in selectedColumns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
        :sortable="col.sortable"
        :style="{ width: col.width, textAlign: col.align || 'left' }"
      >
        <template #body="slotProps">
          <!-- SKELETON -->
          <Skeleton
            v-if="loading"
            height="1rem"
            borderRadius="6px"
          />

          <!-- DATA -->
          <slot
            v-else
            :name="col.field"
            :data="slotProps.data"
            :field="col.field"
          >
            {{ slotProps.data[col.field] }}
          </slot>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped>
/* =========================
   WRAPPER
========================= */
.super-table-wrapper {
  background: #ffffff;
  border-radius: 12px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  padding: 1rem;
}

/* =========================
   HEADER (COLUMN SELECTOR)
========================= */
.table-header {
  display: flex;
  justify-content: flex-end;
  padding-bottom: 0.75rem;
}

.column-selector {
  min-width: 260px;
}

/* =========================
   TABLE HEADER CELLS
========================= */
:deep(.custom-table .p-datatable-thead > tr > th) {
  background-color: #ffffff;
  color: #64748b;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.72rem;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #e5e7eb;
  white-space: nowrap;
}

/* SORT ICONS */
:deep(.custom-table .p-sortable-column-icon) {
  font-size: 0.7rem;
  color: #94a3b8;
}

:deep(.custom-table .p-sortable-column.p-highlight .p-sortable-column-icon) {
  color: #22c55e;
}

/* =========================
   TABLE BODY CELLS
========================= */
:deep(.custom-table .p-datatable-tbody > tr > td) {
  padding: 0.5rem 1.25rem;
  font-size: 0.875rem;
  color: #334155;
  vertical-align: middle;
  white-space: nowrap;
  border: none;
}

/* =========================
   ZEBRA STRIPING
   (gris desde la primera fila)
========================= */
:deep(.custom-table .p-datatable-tbody > tr.p-row-odd:not(.p-highlight)) {
  background-color: #f8fafc;
}

/* =========================
   HOVER
   (sutil pero visible)
========================= */
:deep(.custom-table .p-datatable-tbody > tr:hover:not(.p-highlight)) {
  background-color: #e5e7eb !important;
}

/* =========================
   SELECTED ROW
========================= */
:deep(.custom-table .p-datatable-tbody > tr.p-highlight) {
  background-color: #ede9fe !important;
  color: #5b21b6;
  font-weight: 500;
}

/* =========================
   PAGINATOR
========================= */
:deep(.p-paginator) {
  border: none;
  padding-top: 1rem;
}

:deep(.p-paginator-page) {
  border-radius: 999px;
}

:deep(.p-paginator-page.p-highlight) {
  background: #ede9fe;
  color: #7c3aed;
  font-weight: 600;
}

/* =========================
   EMPTY / LOADING STATES
========================= */
:deep(.p-datatable-empty-message),
:deep(.p-datatable-loading-overlay) {
  color: #64748b;
  font-size: 0.875rem;
}
</style>
