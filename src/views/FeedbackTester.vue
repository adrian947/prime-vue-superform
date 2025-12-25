<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
import BaseDialogs from '../components/BaseDialogs.vue'
import BaseConfirmDialogs from '../components/BaseConfirmDialogs.vue'
import BaseButton from '../components/BaseButton.vue'
import InputText from 'primevue/inputtext'

const toast = useToast()
const confirm = useConfirm()

// Dialog State
const dialogVisible = ref(false)

// Data for Dialog Form
const formData = ref({
  username: '',
  email: ''
})

// Handlers for BaseDialogs
const handleDialogSave = () => {
  console.log('Guardando datos...', formData.value)
  toast.add({
    severity: 'success',
    summary: 'Guardado',
    detail: `Usuario: ${formData.value.username || 'Anónimo'} actualizado`,
    life: 3000
  })
  dialogVisible.value = false
}

const handleDialogCancel = () => {
  toast.add({
    severity: 'info',
    summary: 'Cancelado',
    detail: 'Edición cancelada por el usuario',
    life: 2000
  })
  dialogVisible.value = false
}

// Handlers for BaseConfirmDialogs
const showConfirm = () => {
  confirm.require({
    group: 'headless', // If we used a specific group, but our BaseConfirmDialog is global if not scoped.
    // Actually, standard ConfirmDialog uses no group or 'default'.
    // Since we want to use OUR BaseConfirmDialogs component, we should probably ensure it's the one being rendered.
    // However, ConfirmDialog in PrimeVue is usually one-per-app or one-per-group.
    // If BaseConfirmDialogs is mounted here, it will handle calls.
    // Let's assume it handles the default calls or we give it a group prop?
    // The prompt didn't specify group usage, but to be safe and "separate", let's use it as a standard replacement
    // or just rely on it being the active one if GlobalConfirmations is removed/not interfering.

    // For the custom template in BaseConfirmDialogs to work, we just need to call it.
    // If BaseConfirmDialogs has NO group, it catches default confirmations.

    message:
      '¿Estás seguro de que deseas eliminar este registro? Esta acción no se puede deshacer.',
    header: 'Eliminar Registro',
    icon: 'pi pi-trash',
    accept: () => {
      toast.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Registro eliminado',
        life: 3000
      })
    },
    reject: () => {
      toast.add({
        severity: 'info',
        summary: 'Rechazado',
        detail: 'Operación cancelada',
        life: 3000
      })
    }
  })
}
</script>

<template>
  <div class="feedback-tester-container">
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-slate-800">
        Pruebas de Componentes & Feedback
      </h1>
      <p class="text-slate-500 mt-2">
        Gestión de diálogos, confirmaciones y catálogo de botones.
      </p>
    </header>

    <div class="grid gap-8">
      <!-- SECTION 1: DIALOGS -->
      <section
        class="p-6 bg-white rounded-xl shadow-sm border border-slate-100"
      >
        <h2 class="text-xl font-semibold mb-6 flex items-center gap-2">
          <i class="pi pi-window-maximize text-indigo-600"></i>
          Modales y Confirmaciones
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Dialog Test -->
          <div class="p-4 border border-dashed border-slate-300 rounded-lg">
            <h3 class="font-medium text-slate-700 mb-3">
              BaseDialogs Component
            </h3>
            <BaseButton
              label="Abrir Modal de Edición"
              icon="pi pi-user-edit"
              @click="dialogVisible = true"
              severity="info"
            />

            <!-- Reusable Base Dialog -->
            <BaseDialogs
              v-model:visible="dialogVisible"
              header="Editar Perfil de Usuario"
              :style="{ width: '30rem' }"
              modal
              @save="handleDialogSave"
              @cancel="handleDialogCancel"
            >
              <div class="flex flex-col gap-4 py-2">
                <span class="text-slate-500 text-sm"
                  >Complete el formulario a continuación.</span
                >

                <div class="flex flex-col gap-2">
                  <label
                    for="username"
                    class="font-medium text-slate-700"
                    >Usuario</label
                  >
                  <InputText
                    id="username"
                    v-model="formData.username"
                    autocomplete="off"
                  />
                </div>

                <div class="flex flex-col gap-2">
                  <label
                    for="email"
                    class="font-medium text-slate-700"
                    >Email</label
                  >
                  <InputText
                    id="email"
                    type="email"
                    v-model="formData.email"
                    autocomplete="off"
                  />
                </div>
              </div>
            </BaseDialogs>
          </div>

          <!-- ConfirmDialog Test -->
          <div class="p-4 border border-dashed border-slate-300 rounded-lg">
            <h3 class="font-medium text-slate-700 mb-3">
              BaseConfirmDialogs Component
            </h3>
            <BaseButton
              @click="showConfirm"
              label="Eliminar Registro"
              severity="danger"
              icon="pi pi-trash"
            />

            <!-- Reusable Base Confirm Dialog -->
            <!-- Mounting it here locally for the feedback tester -->
            <BaseConfirmDialogs group="headless" />
          </div>
        </div>
      </section>

      <!-- SECTION 2: BUTTON SHOWCASE -->
      <section
        class="p-6 bg-white rounded-xl shadow-sm border border-slate-100"
      >
        <h2 class="text-xl font-semibold mb-6 flex items-center gap-2">
          <i class="pi pi-box text-indigo-600"></i>
          Catálogo de BaseButtons
        </h2>

        <div class="space-y-8">
          <!-- Severities -->
          <div>
            <h3
              class="text-sm uppercase tracking-wide text-slate-500 font-bold mb-4"
            >
              Severities
            </h3>
            <div class="flex flex-wrap gap-3">
              <BaseButton label="Primary" />
              <BaseButton
                label="Secondary"
                severity="secondary"
              />
              <BaseButton
                label="Success"
                severity="success"
              />
              <BaseButton
                label="Info"
                severity="info"
              />
              <BaseButton
                label="Warning"
                severity="warn"
              />
              <BaseButton
                label="Help"
                severity="help"
              />
              <BaseButton
                label="Danger"
                severity="danger"
              />
              <BaseButton
                label="Contrast"
                severity="contrast"
              />
            </div>
          </div>

          <!-- Outlined -->
          <div>
            <h3
              class="text-sm uppercase tracking-wide text-slate-500 font-bold mb-4"
            >
              Outlined
            </h3>
            <div class="flex flex-wrap gap-3">
              <BaseButton
                label="Primary"
                outlined
              />
              <BaseButton
                label="Secondary"
                severity="secondary"
                outlined
              />
              <BaseButton
                label="Success"
                severity="success"
                outlined
              />
              <BaseButton
                label="Info"
                severity="info"
                outlined
              />
              <BaseButton
                label="Warning"
                severity="warn"
                outlined
              />
            </div>
          </div>

          <!-- Buttons using BaseButton features -->
          <div>
            <h3
              class="text-sm uppercase tracking-wide text-slate-500 font-bold mb-4"
            >
              Special Variants
            </h3>
            <div class="flex flex-wrap gap-3">
              <BaseButton
                label="Rounded"
                rounded
              />
              <BaseButton
                label="Text Only"
                text
              />
              <BaseButton
                icon="pi pi-heart"
                rounded
                severity="help"
                aria-label="Favorite"
              />
              <BaseButton
                label="Submit"
                icon="pi pi-check"
              />
              <BaseButton
                label="Loading"
                loading
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.feedback-tester-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}
</style>
