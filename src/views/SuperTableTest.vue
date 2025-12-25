<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseTable, { type ColumnConfig } from '../components/SuperTable.vue'
import Button from 'primevue/button'
import BaseButton from '@/components/BaseButton.vue'

/* -----------------------------
   DATA MOCK
------------------------------ */

const users = ref<any[]>([])
const claims = ref<any[]>([])
const loadingUsers = ref(true)
const loadingClaims = ref(true)

/* -----------------------------
   COLUMNS
------------------------------ */

const userColumns: ColumnConfig[] = [
  { field: 'id', header: '#', width: '70px', align: 'center' },
  { field: 'name', header: 'Nombre', sortable: true },
  { field: 'lastname', header: 'Apellido', sortable: true },
  { field: 'email', header: 'Email' },
  { field: 'role', header: 'Rol' },
  { field: 'status', header: 'Estado', width: '120px', align: 'center' },
  { field: 'actions', header: 'Acciones', width: '140px', align: 'center' }
]

const claimColumns: ColumnConfig[] = [
  { field: 'id', header: 'ID', width: '80px', align: 'center' },
  { field: 'claimant', header: 'Damnificado', sortable: true },
  { field: 'dni', header: 'DNI' },
  { field: 'status', header: 'Estado', sortable: true },
  { field: 'company', header: 'Empresa' },
  { field: 'amount', header: 'Monto', align: 'right' },
  { field: 'actions', header: '', width: '120px', align: 'center' }
]

/* -----------------------------
   MOCK LOAD
------------------------------ */

onMounted(() => {
  setTimeout(() => {
    users.value = Array.from({ length: 25 }).map((_, i) => ({
      id: i + 1,
      name: `Nombre ${i + 1}`,
      lastname: `Apellido ${i + 1}`,
      email: `usuario${i + 1}@mail.com`,
      role: i % 2 === 0 ? 'Admin' : 'User',
      status: i % 3 === 0 ? 'Activo' : 'Inactivo'
    }))
    loadingUsers.value = false
  }, 800)

  setTimeout(() => {
    claims.value = Array.from({ length: 40 }).map((_, i) => ({
      id: 1000 + i,
      claimant: `Persona ${i + 1}`,
      dni: `30${Math.floor(10000000 + Math.random() * 90000000)}`,
      status: ['Captación', 'Audiencia', 'Cierre'][i % 3],
      company: ['Chubb', 'Zurich', 'Federación'][i % 3],
      amount: (Math.random() * 1000000).toFixed(2)
    }))
    loadingClaims.value = false
  }, 1200)
})

/* -----------------------------
   ACTIONS
------------------------------ */

const editRow = (row: any) => {
  console.log('Editar', row)
}

const deleteRow = (row: any) => {
  console.log('Eliminar', row)
}
</script>

<template>
  <div class="tables-demo">
    <!-- ================= USERS TABLE ================= -->
    <section>
      <h2>Usuarios del sistema</h2>

      <BaseTable
        :data="users"
        :columns="userColumns"
        :loading="loadingUsers"
        :rows="10"
      >
        <template #status="{ data }">
          <span
            class="status-pill"
            :class="data.status === 'Activo' ? 'active' : 'inactive'"
          >
            {{ data.status }}
          </span>
        </template>

        <template #actions="{ data }">
          <div class="actions">
            <Button
              icon="pi pi-pencil"
              text
              rounded
              @click="editRow(data)"
            />
            <Button
              icon="pi pi-trash"
              text
              rounded
              severity="danger"
              @click="deleteRow(data)"
            />
          </div>
        </template>
      </BaseTable>
    </section>

    <!-- ================= CLAIMS TABLE ================= -->
    <section>
      <h2>Siniestros</h2>

      <BaseTable
        :data="claims"
        :columns="claimColumns"
        :loading="loadingClaims"
        :rows="15"
      >
        <template #amount="{ data }">
          <strong>${{ Number(data.amount).toLocaleString('es-AR') }}</strong>
        </template>

        <template #actions="{ data }">
          <div class="actions">
            <BaseButton
              label="Ver"
              icon="pi pi-eye"
              text
              rounded
            />
          </div>
        </template>
      </BaseTable>
    </section>
  </div>
</template>

<style scoped>
.tables-demo {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1e293b;
}

/* STATUS */
.status-pill {
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-pill.active {
  background: #dcfce7;
  color: #166534;
}

.status-pill.inactive {
  background: #fee2e2;
  color: #991b1b;
}

/* ACTIONS */
.actions {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}
</style>
