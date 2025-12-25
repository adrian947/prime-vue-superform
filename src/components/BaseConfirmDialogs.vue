<script setup lang="ts">
import ConfirmDialog from 'primevue/confirmdialog'
import BaseButton from './BaseButton.vue'

defineProps<{ group?: string }>()
</script>

<template>
  <ConfirmDialog :group="group">
    <template #container="{ message, acceptCallback, rejectCallback }">
      <div
        class="flex flex-col items-center p-8 bg-white rounded-xl shadow-lg border border-slate-100 max-w-sm"
      >
        <!-- Icon -->
        <div
          class="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-500 mb-4 animate-bounce"
        >
          <i :class="[message.icon, 'text-3xl']"></i>
        </div>

        <!-- Text -->
        <span class="font-bold text-xl block mb-2 text-slate-800">{{
          message.header
        }}</span>
        <p class="text-slate-500 mb-0 text-center text-sm leading-relaxed">
          {{ message.message }}
        </p>

        <!-- Buttons -->
        <div class="flex items-center gap-2 mt-6 w-full">
          <BaseButton
            label="Cancelar"
            outlined
            severity="secondary"
            @click="rejectCallback"
            class="flex-1"
          />
          <BaseButton
            label="Confirmar"
            severity="danger"
            @click="acceptCallback"
            class="flex-1 shadow-lg shadow-red-200"
          />
        </div>
      </div>
    </template>
  </ConfirmDialog>
</template>
