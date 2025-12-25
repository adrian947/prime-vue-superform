<script setup lang="ts">
import Dialog from 'primevue/dialog'
import BaseButton from './BaseButton.vue'

defineProps<{
  visible: boolean
  header?: string
  style?: any
  modal?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'save'): void
  (e: 'cancel'): void
}>()
</script>

<template>
  <Dialog
    :visible="visible"
    :modal="modal"
    :header="header"
    :style="style"
    @update:visible="(val) => emit('update:visible', val)"
  >
    <slot></slot>

    <template #footer>
      <slot name="footer">
        <div class="flex justify-end gap-2">
          <BaseButton
            label="Cancelar"
            severity="secondary"
            @click="emit('cancel')"
          />
          <BaseButton
            label="Guardar"
            @click="emit('save')"
          />
        </div>
      </slot>
    </template>
  </Dialog>
</template>
