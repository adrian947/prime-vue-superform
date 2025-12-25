<script setup lang="ts">
import { ref, reactive, watch, computed, nextTick } from 'vue'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import DatePicker from 'primevue/datepicker'
import Select from 'primevue/select'
import MultiSelect from 'primevue/multiselect'
import Checkbox from 'primevue/checkbox'
import InputMask from 'primevue/inputmask'
import Textarea from 'primevue/textarea'
import Password from 'primevue/password'
import Button from 'primevue/button'
import InputGroup from 'primevue/inputgroup'
import FileUpload from 'primevue/fileupload'
import BaseButton from '../components/BaseButton.vue'
import { InputSwitch } from 'primevue'

// Props
interface FieldConfig {
	title?: string
	type: string
	placeholder?: string
	required?: boolean
	hidden?: boolean
	inputDisabled?: boolean
	classInput?: string
	classDiv?: string
	classDivInput?: string
	cols?: number
	validations?: any
	useSlot?: boolean
	options?: any[]
	trackBy?: string
	label?: string
	labelKey?: string
	indexReturn?: string
	multiple?: boolean
	withTime?: boolean
	editable?: boolean
	limitMaxDate?: Date
	keyHour?: string
	switch?: boolean
	labelShow?: boolean
	ocultarOpcional?: boolean
	fullWidth?: boolean
	[key: string]: any
}

interface Props {
	fields: Record<string, FieldConfig>
	initialData?: Record<string, any>
	newFormData?: boolean
	buttonSubmitLabel?: string
	buttonSubmitClass?: string
}

const props = withDefaults(defineProps<Props>(), {
	newFormData: true,
	buttonSubmitLabel: 'Enviar',
	buttonSubmitClass: ''
})

// Emits
const emit = defineEmits<{
	submit: [data: { form: Record<string, any>; errors: Record<string, string> }]
	change: [data: { form: Record<string, any>; field: string; value: any }]
}>()

// Reactive form data
const formData = reactive<Record<string, any>>({})
const errors = reactive<Record<string, string>>({})
const fieldsConfig = ref<Record<string, FieldConfig>>({ ...props.fields })

// Area codes for phone inputs
const areaCodes = ref([
	{ name: '🇦🇷 +54', code: '+54' },
	{ name: '🇧🇷 +55', code: '+55' },
	{ name: '🇨🇱 +56', code: '+56' },
	{ name: '🇨🇴 +57', code: '+57' },
	{ name: '🇲🇽 +52', code: '+52' },
	{ name: '🇪🇸 +34', code: '+34' },
	{ name: '🇺🇸 +1', code: '+1' }
])

// Initialize form data
const initializeFormData = () => {
	if (props.initialData) {
		Object.keys(props.initialData).forEach((key) => {
			const value = props.initialData![key]

			// Check if this field is a date type and value is a string
			const fieldConfig = fieldsConfig.value[key]
			if (
				fieldConfig &&
				fieldConfig.type === 'date' &&
				typeof value === 'string' &&
				value
			) {
				// Convert string to Date object
				formData[key] = new Date(value)
			} else {
				formData[key] = value
			}
		})
	}

	// Initialize phone area code if not set
	Object.keys(fieldsConfig.value).forEach((key) => {
		const field = fieldsConfig.value[key]
		if (field?.type === 'phone' && !formData[`${key}_codigo_area`]) {
			formData[`${key}_codigo_area`] = '+54'
		}
	})
}

initializeFormData()

// Computed visible fields
const visibleFields = computed(() => {
	return Object.entries(fieldsConfig.value)
		.filter(([_, field]) => !field.hidden)
		.map(([key, field]) => ({ key, ...field }))
})

// Form validation state
const isFormValid = computed(() => {
	// Check if there are any active errors
	const hasErrors = Object.values(errors).some((error) => error !== '')
	if (hasErrors) return false

	// Check if all required non-hidden fields have values
	for (const key in fieldsConfig.value) {
		const field = fieldsConfig.value[key]
		if (field?.hidden) continue

		const required = field?.required || field?.validations?.required
		if (required) {
			const value = formData[key]
			// Strict check for empty values
			if (
				value === null ||
				value === undefined ||
				value === '' ||
				(Array.isArray(value) && value.length === 0)
			) {
				return false
			}
		}
	}
	return true
})

const handleBlur = async (fieldKey: string) => {
	await nextTick()
	validateField(fieldKey)
}

// Helper: Format dates to local string "YYYY-MM-DD HH:mm:ss"
const processFormData = (data: Record<string, any>) => {
	const processed = { ...data }

	Object.keys(fieldsConfig.value).forEach((key) => {
		const field = fieldsConfig.value[key]
		const val = processed[key]

		if (field?.type === 'date' && val instanceof Date) {
			// Adjust for timezone to get local string
			const formated = new Date(val.getTime() - val.getTimezoneOffset() * 60000)
				.toISOString()
				.slice(0, 19)
				.replace('T', ' ')
			processed[key] = formated
		}
	})

	return processed
}

// Validation function
const validateField = (fieldKey: string): boolean => {
	const field = fieldsConfig.value[fieldKey]
	if (!field) return true

	const value = formData[fieldKey]
	const validations = field.validations || {}

	// Required validation
	if (field.required || validations.required) {
		if (
			value === null ||
			value === undefined ||
			value === '' ||
			(Array.isArray(value) && value.length === 0)
		) {
			errors[fieldKey] = `${field.title || fieldKey} es requerido`
			return false
		}
	}

	// Pattern validation
	if (validations.pattern && value) {
		if (!validations.pattern.test(value)) {
			errors[fieldKey] = `${field.title || fieldKey} no tiene un formato válido`
			return false
		}
	}

	// Min length validation
	if (validations.min && value) {
		if (value.length < validations.min) {
			errors[fieldKey] =
				`${field.title || fieldKey} debe tener al menos ${validations.min} caracteres`
			return false
		}
	}

	// Max length validation
	if (validations.max && value) {
		if (value.length > validations.max) {
			errors[fieldKey] =
				`${field.title || fieldKey} no puede exceder ${validations.max} caracteres`
			return false
		}
	}

	errors[fieldKey] = ''
	return true
}

const clearError = (fieldKey: string) => {
	errors[fieldKey] = ''
}

const validationState = (fieldKey: string) => {
	return errors[fieldKey] ? false : null
}

// Watch for changes
watch(
	formData,
	(newVal) => {
		const processedForm = processFormData(newVal)
		Object.keys(newVal).forEach((key) => {
			emit('change', {
				form: processedForm,
				field: key,
				value: processedForm[key]
			})
		})
	},
	{ deep: true }
)

// Submit handler
const handleSubmit = () => {
	let isValid = true

	// Validate all required fields
	Object.keys(fieldsConfig.value).forEach((key) => {
		if (!validateField(key)) {
			isValid = false
		}
	})

	if (isValid) {
		emit('submit', { form: processFormData(formData), errors: { ...errors } })
	} else {
		console.log('Form has validation errors:', errors)
	}
}

// Exposed methods
const updateFormData = (data: Record<string, any>) => {
	Object.keys(data).forEach((key) => {
		formData[key] = data[key]
	})
}

const updateFormFields = (
	fieldsUpdate: Record<string, Partial<FieldConfig>>
) => {
	Object.keys(fieldsUpdate).forEach((key) => {
		if (fieldsConfig.value[key]) {
			fieldsConfig.value[key] = {
				...fieldsConfig.value[key],
				...fieldsUpdate[key]
			}
		}
	})
}

defineExpose({
	updateFormData,
	updateFormFields,
	validateField,
	clearError,
	validationState
})

// Get grid class based on cols
const getGridClass = (cols?: number) => {
	if (!cols) return 'col-12'
	return `col-${cols}`
}
</script>

<template>
	<div class="super-form-container">
		<form @submit.prevent="handleSubmit" class="super-form">
			<div class="row">
				<template v-for="field in visibleFields" :key="field.key">
					<!-- Slot type -->
					<div v-if="field.type === 'slot'" :class="getGridClass(field.cols)">
						<slot :name="field.key"></slot>
					</div>

					<!-- Custom slot with useSlot -->
					<div v-else-if="field.useSlot" :class="getGridClass(field.cols)">
						<slot :field="field" :fieldKey="field.key" :formData="formData" :errors="errors"
							:validationState="validationState" :clearError="clearError" :validateField="validateField">
						</slot>
					</div>

					<!-- Regular fields -->
					<div v-else :class="[getGridClass(field.cols), field.classDiv]">
						<div class="form-field">
							<!-- Label -->
							<label v-if="field.title && field.labelShow !== false" :for="field.key">
								{{ field.title }}
								<span v-if="field.required && !field.ocultarOpcional" class="required">*</span>
								<span v-if="!field.required && !field.ocultarOpcional"
									class="optional">(Opcional)</span>
							</label>

							<!-- Text Input -->
							<InputText v-if="field.type === 'text'" :id="field.key" v-model="formData[field.key]"
								:placeholder="field.placeholder" :disabled="field.inputDisabled"
								:class="[field.classInput, { 'p-invalid': errors[field.key] }]"
								@blur="handleBlur(field.key)" />

							<!-- Email Input -->
							<InputText v-else-if="field.type === 'email'" :id="field.key" v-model="formData[field.key]"
								type="email" :placeholder="field.placeholder" :disabled="field.inputDisabled"
								:class="[field.classInput, { 'p-invalid': errors[field.key] }]"
								@blur="handleBlur(field.key)" />

							<!-- Password Input -->
							<Password v-else-if="field.type === 'password'" :id="field.key"
								v-model="formData[field.key]" :placeholder="field.placeholder"
								:disabled="field.inputDisabled"
								:class="[field.classInput, { 'p-invalid': errors[field.key] }]"
								@blur="handleBlur(field.key)" toggleMask :feedback="false" />

							<!-- Number Input -->
							<InputNumber v-else-if="field.type === 'number'" :id="field.key"
								v-model="formData[field.key]" :placeholder="field.placeholder"
								:disabled="field.inputDisabled"
								:class="[field.classInput, { 'p-invalid': errors[field.key] }]"
								@blur="handleBlur(field.key)" />

							<!-- Textarea -->
							<Textarea v-else-if="field.type === 'textarea'" :id="field.key"
								v-model="formData[field.key]" :placeholder="field.placeholder"
								:disabled="field.inputDisabled"
								:class="[field.classInput, { 'p-invalid': errors[field.key] }]"
								@blur="handleBlur(field.key)" rows="5" autoResize />

							<!-- Date Picker with Time (separate inputs) -->
							<div v-else-if="field.type === 'date' && field.withTime" class="date-time-group">
								<DatePicker :id="field.key" v-model="formData[field.key]"
									:placeholder="field.placeholder || 'dd/mm/yyyy'" :disabled="field.inputDisabled"
									:class="[
										'date-input',
										field.classInput,
										{ 'p-invalid': errors[field.key] }
									]" :maxDate="field.limitMaxDate" dateFormat="dd/mm/yy" @blur="handleBlur(field.key)" showIcon
									iconDisplay="input" />
								<DatePicker :id="`${field.key}_time`" v-model="formData[field.key]"
									:placeholder="'HH:mm'" :disabled="field.inputDisabled"
									:class="['time-input', field.classInput]" timeOnly hourFormat="24"
									iconDisplay="input" showIcon>
									<template #inputicon="{ class: iconClass, clickCallback }">
										<i :class="['pi pi-clock', iconClass]" @click="clickCallback" />
									</template>
								</DatePicker>
							</div>

							<!-- Date Picker (date only) -->
							<DatePicker v-else-if="field.type === 'date'" :id="field.key" v-model="formData[field.key]"
								:placeholder="field.placeholder || 'dd/mm/yyyy'" :disabled="field.inputDisabled"
								:class="[field.classInput, { 'p-invalid': errors[field.key] }]"
								:maxDate="field.limitMaxDate" dateFormat="dd/mm/yy" @blur="handleBlur(field.key)"
								showIcon />

							<!-- Select / Dropdown -->
							<Select v-else-if="field.type === 'multiselect' && !field.multiple" :id="field.key"
								v-model="formData[field.key]" :options="field.options"
								:optionLabel="field.label || field.labelKey || 'label'"
								:optionValue="field.indexReturn || 'id'" :placeholder="field.placeholder"
								:disabled="field.inputDisabled"
								:class="[field.classInput, { 'p-invalid': errors[field.key] }]"
								@change="validateField(field.key)" showClear />

							<!-- MultiSelect -->
							<MultiSelect v-else-if="field.type === 'multiselect' && field.multiple" :id="field.key"
								v-model="formData[field.key]" :options="field.options"
								:optionLabel="field.label || field.labelKey || 'label'"
								:optionValue="field.indexReturn || 'id'" :placeholder="field.placeholder"
								:disabled="field.inputDisabled"
								:class="[field.classInput, { 'p-invalid': errors[field.key] }]"
								@change="validateField(field.key)" display="chip" />

							<!-- Phone Input with Area Code -->
							<InputGroup v-else-if="field.type === 'phone'">
								<Select v-model="formData[`${field.key}_codigo_area`]" :options="areaCodes"
									optionLabel="name" optionValue="code" class="phone-area-code" />
								<InputMask :id="field.key" v-model="formData[field.key]" mask="999-999-9999"
									:placeholder="field.placeholder || '123-456-7890'" :disabled="field.inputDisabled"
									:class="[
										'phone-input',
										field.classInput,
										{ 'p-invalid': errors[field.key] }
									]" @blur="handleBlur(field.key)" />
							</InputGroup>

							<!-- Checkbox -->
							<div v-else-if="field.type === 'checkbox'" class="checkbox-wrapper">
								<Checkbox :inputId="field.key" v-model="formData[field.key]" :binary="true"
									:disabled="field.inputDisabled" :class="field.classInput" />
								<label v-if="field.title" :for="field.key" class="checkbox-label">{{ field.title
								}}</label>
							</div>

							<!-- Switch / Toggle -->
							<div v-else-if="field.type === 'switch'" class="switch-wrapper">
								<InputSwitch :inputId="field.key" v-model="formData[field.key]"
									:disabled="field.inputDisabled" :class="field.classInput" />

								<label v-if="field.title" :for="field.key" class="switch-label">
									{{ field.title }}
								</label>
							</div>


							<!-- Button Group -->
							<div v-else-if="field.type === 'btn_group'" class="btn-group-wrapper">
								<Button v-for="option in field.options" :key="option.value" :label="option.text"
									:class="{ active: formData[field.key] === option.value }"
									@click="formData[field.key] = option.value" :disabled="field.inputDisabled"
									outlined />
							</div>

							<!-- File Upload -->
							<FileUpload v-else-if="field.type === 'file'" :id="field.key" :multiple="field.multiple"
								:disabled="field.inputDisabled" :class="field.classInput"
								@select="(e) => (formData[field.key] = e.files)" />

							<!-- Currency Input (dinero) -->
							<InputNumber v-else-if="field.type === 'dinero'" :id="field.key"
								v-model="formData[field.key]" mode="currency" currency="USD" locale="en-US"
								:placeholder="field.placeholder" :disabled="field.inputDisabled"
								:class="[field.classInput, { 'p-invalid': errors[field.key] }]"
								@blur="handleBlur(field.key)" />

							<!-- Percentage Input (porcentaje) -->
							<InputNumber v-else-if="field.type === 'porcentaje'" :id="field.key"
								v-model="formData[field.key]" suffix="%" :min="0" :max="100" :minFractionDigits="0"
								:maxFractionDigits="2" :placeholder="field.placeholder" :disabled="field.inputDisabled"
								:class="[field.classInput, { 'p-invalid': errors[field.key] }]"
								@blur="handleBlur(field.key)" />

							<!-- Fallback for unknown types -->
							<InputText v-else :id="field.key" v-model="formData[field.key]"
								:placeholder="field.placeholder" :disabled="field.inputDisabled"
								:class="[field.classInput, { 'p-invalid': errors[field.key] }]"
								@blur="handleBlur(field.key)" />

							<!-- Error message -->
							<small v-if="errors[field.key]" class="p-error">{{ errors[field.key] }}</small>
						</div>
					</div>
				</template>
			</div>

			<!-- Submit Button -->
			<div class="form-actions">
				<BaseButton type="submit" :label="buttonSubmitLabel" :class="buttonSubmitClass" rounded fluid
					:disabled="!isFormValid" />
			</div>
		</form>
	</div>
</template>

<style scoped>
.super-form-container {
	width: 100%;
}

.super-form {
	width: 100%;
}

.row {
	display: flex;
	flex-wrap: wrap;
	margin: 0 -0.5rem;
}

.row>div {
	padding: 0 0.5rem;
}

/* Grid columns */
.col-1 {
	width: 8.333%;
}

.col-2 {
	width: 16.666%;
}

.col-3 {
	width: 25%;
}

.col-4 {
	width: 33.333%;
}

.col-5 {
	width: 41.666%;
}

.col-6 {
	width: 50%;
}

.col-7 {
	width: 58.333%;
}

.col-8 {
	width: 66.666%;
}

.col-9 {
	width: 75%;
}

.col-10 {
	width: 83.333%;
}

.col-11 {
	width: 91.666%;
}

.col-12 {
	width: 100%;
}

.form-field {
	margin-bottom: 1.5rem;
}

.form-field label {
	display: block;
	margin-bottom: 0.5rem;
	font-weight: 400;
}

.form-field label .required {
	color: #e74c3c;
	margin-left: 2px;
}

.form-field label .optional {
	color: #7f8c8d;
	font-size: 0.875rem;
	margin-left: 4px;
}

.form-field :deep(.p-textarea) {
	width: 100%;
	border-radius: 30px !important;
}

.form-field :deep(.p-inputtext),
.form-field :deep(.p-select),
.form-field :deep(.p-multiselect),
.form-field :deep(.p-inputmask) {
	width: 100%;
	border-radius: 50px !important;
	padding: 7px 40px 7px 12px !important;
}

.form-field :deep(.p-password),
.form-field :deep(.p-datepicker),
.form-field :deep(.p-inputnumber) {
	width: 100%;
	border-radius: 50px !important;
}

.p-error {
	color: #e74c3c;
	font-size: 0.875rem;
	display: block;
	margin-top: 0.25rem;
}

:deep(.p-invalid) {
	border-color: #e74c3c !important;
}

/* Phone input group */
.form-field :deep(.p-inputgroup) {
	display: flex;
	width: 100%;
}

.form-field :deep(.phone-area-code) {
	width: 130px;
	flex-shrink: 0;
	border-top-left-radius: 50px !important;
	border-bottom-left-radius: 50px !important;
	border-top-right-radius: 0 !important;
	border-bottom-right-radius: 0 !important;
	border-right: none !important;
}

.form-field :deep(.phone-input) {
	flex: 1;
	border-top-left-radius: 0 !important;
	border-bottom-left-radius: 0 !important;
	border-top-right-radius: 50px !important;
	border-bottom-right-radius: 50px !important;
}

/* Checkbox */
.checkbox-wrapper {
	display: flex;
	align-items: center;
	gap: 0.5rem;
}

.checkbox-label {
	margin: 0 !important;
}

.switch-wrapper {
	display: flex;
	align-items: center;
	gap: 0.75rem;
}

.switch-label {
	font-size: 0.875rem;
	color: #334155;
	cursor: pointer;
}


/* Button group */
/* Button group */
.btn-group-wrapper {
	display: flex !important;
	gap: 0.5rem;
	flex-wrap: nowrap;
	width: 100%;
	border: 1px solid #d1d5db;
	border-radius: 50px;
	padding: 3px;
	height: 42px;
	align-items: stretch;
	background-color: white;
}

.btn-group-wrapper :deep(.p-button) {
	flex: 1;
	border-radius: 50px !important;
	border: none !important;
	background-color: #e0e7ff !important;
	/* Light indigo/lavender for unselected */
	color: #374151 !important;
	/* Dark gray text */
	box-shadow: none !important;
	padding: 0 1rem !important;
	font-weight: 500;
	transition: all 0.2s ease;
	display: flex;
	align-items: center;
	justify-content: center;
	white-space: nowrap;
}

.btn-group-wrapper :deep(.p-button:hover) {
	background-color: #c7d2fe !important;
	/* Slightly darker on hover */
}

.btn-group-wrapper :deep(.p-button.active) {
	background-color: #7435ff !important;
	/* Primary purple */
	color: white !important;
}

.btn-group-wrapper :deep(.p-button:focus) {
	box-shadow: none !important;
}

/* Form actions */
.form-actions {
	margin-top: 2rem;
	display: flex;
	justify-content: center;
}

/* Date-Time Group */
/* Date-Time Group */
/* Date-Time Group */
.date-time-group {
	display: flex;
	width: 100%;
	border: 1px solid #d1d5db;
	border-radius: 50px;
	background-color: white;
	transition: all 0.2s;
	height: 42px;
	align-items: center;
	overflow: hidden;
}

.date-time-group:focus-within {
	border-color: var(--primary-color);
	box-shadow: 0 0 0 1px var(--primary-color);
}

.date-time-group :deep(.date-input .p-inputtext),
.date-time-group :deep(.time-input .p-inputtext) {
	border: none !important;
	box-shadow: none !important;
	background: transparent !important;
	border-radius: 0 !important;
	height: 100%;
}

.date-time-group :deep(.date-input) {
	flex: 2;
	/* border-right removed */
}

.date-time-group :deep(.time-input) {
	flex: 1;
}

/* Fix standard datepicker input radius to merge with icon button */
.form-field :deep(.p-datepicker:not(.date-input):not(.time-input) .p-inputtext) {
	border-top-right-radius: 0 !important;
	border-bottom-right-radius: 0 !important;
}

@media (max-width: 768px) {
	.row>div[class*='col-'] {
		width: 100%;
	}
}

.form-field :deep(.p-button-label) {
	font-weight: 400 !important;
}
</style>
