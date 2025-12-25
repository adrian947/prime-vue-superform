<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import SuperForm from '../components/SuperForm.vue'

// Refs
const superForm = ref<any>(null)
const dataOnchange = ref<any>(null)
const dataOnsubmit = ref<any>(null)

// Form fields configuration
const formFields = ref({
	name: {
		title: 'Nombre',
		type: 'text',
		placeholder: 'Ingrese su nombre',
		required: true,
		inputDisabled: false,
		hidden: false,
		cols: 6,
		validations: {
			required: true
		}
	},
	negocio_id: {
		title: 'Negocio',
		type: 'multiselect',
		labelKey: 'nombre',
		cols: 6,
		options: [
			{ nombre: 'Nombre1', id: 1 },
			{ nombre: 'Nombre2', id: 2 }
		],
		multiple: false,
		required: true,
		indexReturn: 'id',
		inputDisabled: false,
		hidden: false,
		validations: {
			required: true
		}
	},
	email: {
		title: 'Email',
		type: 'email',
		placeholder: 'Ingrese su email',
		required: false,
		inputDisabled: false,
		hidden: false,
		validations: {
			required: false,
			pattern: new RegExp('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$')
		},
		cols: 6
	},
	password: {
		title: 'Contraseña',
		type: 'password',
		placeholder: '********',
		inputDisabled: false,
		hidden: false,
		validations: {
			required: false
		},
		cols: 6
	},
	bio: {
		title: 'Biografía',
		type: 'textarea',
		placeholder: 'Escribe sobre ti',
		required: false,
		hidden: false,
		inputDisabled: false
	},
	numero: {
		title: 'Numero',
		type: 'number',
		placeholder: 'Escribe tu número',
		required: false,
		inputDisabled: true
	},
	telefono: {
		title: 'Telefono',
		type: 'phone',
		placeholder: 'Teléfono',
		required: true,
		hidden: false,
		inputDisabled: false,
		cols: 6
	},
	posibilidad_recobro: {
		title: 'Button group',
		type: 'btn_group',
		fullWidth: true,
		required: false,
		hidden: false,
		cols: 6,
		inputDisabled: false,
		options: [
			{ text: 'Si', value: 'Si' },
			{ text: 'No', value: 'No' },
			{ text: 'Sin especificar', value: 'Sin especificar' }
		]
	},
	languages: {
		title: 'Lenguajes (multiselect)',
		type: 'multiselect',
		options: [],
		trackBy: 'id',
		label: 'label',
		indexReturn: 'id',
		multiple: true,
		required: false,
		hidden: false,
		inputDisabled: false
	},
	comun: {
		title: 'Selector comun',
		type: 'multiselect',
		options: [
			{ id: 'Vue.js', label: 'JavaScript' },
			{ id: 'Sinatra', label: 'Ruby' }
		],
		trackBy: 'id',
		label: 'label',
		indexReturn: 'id',
		multiple: false,
		required: false,
		hidden: false,
		inputDisabled: false
	},
	importData: {
		placeholder: 'Inserte su csv de vehiculos',
		title: 'Importar vehiculo',
		inputDisabled: false,
		multiple: true,
		type: 'file',
		required: false,
		hidden: false
	},
	texto: {
		type: 'slot',
		cols: 12
	},
	switch: {
		title: 'Switch',
		type: 'switch',
		required: false,
		hidden: false,
		inputDisabled: false
	},

	foto: {
		title: 'Requiere Foto',
		type: 'checkbox',
		switch: true,
		labelShow: false,
		required: false,
		ocultarOpcional: true,
		hidden: false,

		inputDisabled: false
	},
	monto_gasto: {
		title: 'Input dinero',
		type: 'dinero',
		required: false,
		hidden: false,
		inputDisabled: false
	},
	incapacidad_valorada: {
		title: 'Input porcentaje',
		type: 'porcentaje',
		key: 'incapacidad_valorada',
		cols: 6,
		required: false,
		hidden: false,
		inputDisabled: false
	},
	fecha_accidente: {
		title: 'Fecha de accidente',
		type: 'date',
		limitMaxDate: new Date(),
		required: false,
		editable: true,
		withTime: true,
		hidden: false,
		keyHour: 'audiencia_hora',
		inputDisabled: false,
		cols: 6
	},
	fecha_hola: {
		title: 'Fecha de hola',
		type: 'date',
		required: true,
		editable: true,
		withTime: true,
		hidden: false,
		keyHour: 'audiencia_hora',
		inputDisabled: false
	},
	fecha_chau: {
		title: 'Fecha de chau',
		type: 'date',
		required: false,
		hidden: false,
		inputDisabled: false
	}
})

// Initial form data
const initialFormData = ref({
	name: 'pepe',
	email: '',
	password: '',
	bio: 'ABC',
	role: '',
	languages: ['Vue.js'],
	telefono: '2236824716',
	telefono_codigo_area: '+54',
	posibilidad_recobro: '',
	fecha_accidente: '2025-04-24 14:14:00',
	fecha_hola: null,
	fecha_chau: null,
	damnificado_direccion: ''
})

// Lifecycle
onMounted(async () => {
	await new Promise((resolve) => setTimeout(resolve, 1000))
	superForm.value?.updateFormFields({
		languages: {
			options: [
				{ id: 'Vue.js', label: 'JavaScript' },
				{ id: 'Sinatra', label: 'Ruby' },
				{ id: 'Laravel', label: 'PHP' },
				{ id: 'Phoenix', label: 'Elixir' },
				{ id: 'Django', label: 'Python' }
			]
		}
	})
})

// Watchers
watch(
	dataOnchange,
	(newVal) => {
		if (!newVal) return
		console.log('dataOnchange changed:', newVal)

		if (newVal.form.bio === 'ABCD') {
			superForm.value?.updateFormData({
				name: 'Nuevo nombress',
				email: 'nuevo1234@email.com',
				monto_gasto: '10,4',
				fecha_hola: '2025-04-30 14:31',
				fecha_chau: '2025-04-30 14:31'
			})
			superForm.value?.updateFormFields({
				languages: {
					options: [
						{ id: 'Vue.js', label: 'Vue actualizado' },
						{ id: 'Next.js', label: 'Next actualizado' }
					]
				},
				email: {
					inputDisabled: true,
					placeholder: 'Este email está deshabilitado'
				},
				telefono: {
					hidden: true
				}
			})
		}
	},
	{ deep: true }
)

watch(
	() => dataOnchange.value?.form?.name,
	(newVal, oldVal) => {
		if (!oldVal) return
		console.log('name cambió de:', oldVal, 'a:', newVal)
		if (newVal === 'ABCD') {
			// Lógica específica para el campo name
		}
	}
)

watch(
	() => dataOnchange.value?.form?.comun,
	(newVal, oldVal) => {
		if (!newVal) return
		superForm.value?.updateFormData({
			name: '',
			numero: '123123'
		})
		superForm.value?.updateFormFields({
			languages: {
				options: [
					{ id: 'Vue.js', label: 'Vue actualizado' },
					{ id: 'Next.js', label: 'Next actualizado' }
				]
			},
			numero: {
				inputDisabled: false
			}
		})
	}
)

// Methods
const handleFormSubmit = (data: any) => {
	console.log('Formulario enviado:', data)
	dataOnsubmit.value = data
	superForm.value?.updateFormData({
		name: '',
		monto_gasto: '',
		fecha_hola: null,
		fecha_chau: null
	})
}

const handleFormChange = (data: any) => {
	dataOnchange.value = data
}
</script>

<template>
	<div class="super-form-test-container">
		<div class="header">
			<h1>Testeo de SuperForm</h1>
			<p class="subtitle">Componente dinámico y reutilizable</p>
		</div>

		<SuperForm ref="superForm" :fields="formFields" :initialData="initialFormData" :newFormData="false"
			@submit="handleFormSubmit" @change="handleFormChange" buttonSubmitLabel="Enviar desde el padre">
			<template #texto>
				<div class="custom-slot">
					<h3>Un texto de slot</h3>
					<p>Este es un ejemplo de contenido personalizado usando slots</p>
				</div>
			</template>
		</SuperForm>

		<div class="data-display">
			<div class="data-card">
				<h3>Datos del formulario (Submit):</h3>
				<pre>{{ JSON.stringify(dataOnsubmit, null, 2) }}</pre>
			</div>
			<div class="data-card">
				<h3>Datos en cambio (Change):</h3>
				<pre>{{ JSON.stringify(dataOnchange, null, 2) }}</pre>
			</div>
		</div>
	</div>
</template>

<style scoped>
.super-form-test-container {
	max-width: 1200px;
	margin: 0 auto;
	padding: 2rem;
}

.header {
	text-align: center;
	margin-bottom: 2rem;
}

.header h1 {
	font-size: 2.5rem;
	margin-bottom: 0.5rem;
}

.subtitle {
	color: #7f8c8d;
	font-size: 1.1rem;
}

.custom-slot {
	padding: 1.5rem;
	background: #f8f9fa;
	border-radius: 8px;
	margin: 1rem 0;
}

.custom-slot h3 {
	color: #7435ff;
	margin-bottom: 0.5rem;
}

.data-display {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
	gap: 2rem;
	margin-top: 3rem;
}

.data-card {
	background: #fff;
	padding: 1.5rem;
	border-radius: 8px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.data-card h3 {
	color: #2c3e50;
	margin-bottom: 1rem;
	font-size: 1.1rem;
}

.data-card pre {
	background: #f8f9fa;
	padding: 1rem;
	border-radius: 4px;
	overflow-x: auto;
	font-size: 0.875rem;
	line-height: 1.5;
	color: #2c3e50;
}

@media (max-width: 768px) {
	.data-display {
		grid-template-columns: 1fr;
	}
}

.p-select .p-select-label {
	padding: 0rem !important;
}
</style>
