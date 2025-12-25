<script setup lang="ts">
import Button from 'primevue/button'

const emit = defineEmits<{
	(e: 'click', event: MouseEvent): void
}>()
</script>

<template>
	<Button v-bind="$attrs" @click="emit('click', $event)" />
</template>
