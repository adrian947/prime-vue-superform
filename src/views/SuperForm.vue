<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import DatePicker from 'primevue/datepicker'
import Dropdown from 'primevue/dropdown'
import MultiSelect from 'primevue/multiselect'
import Checkbox from 'primevue/checkbox'
import RadioButton from 'primevue/radiobutton'
import Slider from 'primevue/slider'
import Rating from 'primevue/rating'
import ColorPicker from 'primevue/colorpicker'
import InputMask from 'primevue/inputmask'
import Textarea from 'primevue/textarea'
import Password from 'primevue/password'
import AutoComplete from 'primevue/autocomplete'
import Chips from 'primevue/chips'
import ToggleButton from 'primevue/togglebutton'
import InputSwitch from 'primevue/inputswitch'
import Knob from 'primevue/knob'
import Button from 'primevue/button'
import Message from 'primevue/message'
import InputGroup from 'primevue/inputgroup'
import Select from 'primevue/select'

// Form data
const formData = reactive({
	name: '',
	email: '',
	age: null as number | null,
	birthDate: null as Date | null,
	country: null as string | null,
	hobbies: [] as string[],
	newsletter: false,
	gender: '',
	satisfaction: 0,
	color: '',
	phoneAreaCode: '+54' as string,
	phone: '',
	comments: '',
	password: '',
	city: '',
	tags: [] as string[],
	notifications: false,
	volume: 50,
	rating: 0
})

// Validation errors
const errors = reactive({
	name: '',
	email: '',
	age: '',
	birthDate: '',
	country: '',
	hobbies: '',
	gender: '',
	phone: '',
	password: '',
	city: ''
})

// Options for dropdowns
const countries = ref([
	{ name: 'Argentina', code: 'AR' },
	{ name: 'Brasil', code: 'BR' },
	{ name: 'Chile', code: 'CL' },
	{ name: 'Colombia', code: 'CO' },
	{ name: 'México', code: 'MX' },
	{ name: 'España', code: 'ES' },
	{ name: 'Estados Unidos', code: 'US' }
])

const hobbiesOptions = ref([
	{ name: 'Deportes', code: 'sports' },
	{ name: 'Música', code: 'music' },
	{ name: 'Lectura', code: 'reading' },
	{ name: 'Viajes', code: 'travel' },
	{ name: 'Tecnología', code: 'tech' },
	{ name: 'Arte', code: 'art' }
])

// AutoComplete cities
const cities = ref(['Buenos Aires', 'Madrid', 'Barcelona', 'Ciudad de México', 'Bogotá', 'Lima', 'Santiago'])
const filteredCities = ref<string[]>([])

// Area codes for phone
const areaCodes = ref([
	{ name: '🇦🇷 +54', code: '+54' },
	{ name: '🇧🇷 +55', code: '+55' },
	{ name: '🇨🇱 +56', code: '+56' },
	{ name: '🇨🇴 +57', code: '+57' },
	{ name: '🇲🇽 +52', code: '+52' },
	{ name: '🇪🇸 +34', code: '+34' },
	{ name: '🇺🇸 +1', code: '+1' },
	{ name: '🇬🇧 +44', code: '+44' },
	{ name: '🇫🇷 +33', code: '+33' },
	{ name: '🇩🇪 +49', code: '+49' },
	{ name: '🇮🇹 +39', code: '+39' }
])

const searchCity = (event: any) => {
	if (!event.query.trim().length) {
		filteredCities.value = [...cities.value]
	} else {
		filteredCities.value = cities.value.filter((city) => {
			return city.toLowerCase().startsWith(event.query.toLowerCase())
		})
	}
}

// Watch all form fields for changes
watch(() => formData.name, (newVal, oldVal) => {
	console.log('onChange - name:', { oldValue: oldVal, newValue: newVal })
})

watch(() => formData.email, (newVal, oldVal) => {
	console.log('onChange - email:', { oldValue: oldVal, newValue: newVal })
})

watch(() => formData.age, (newVal, oldVal) => {
	console.log('onChange - age:', { oldValue: oldVal, newValue: newVal })
})

watch(() => formData.birthDate, (newVal, oldVal) => {
	console.log('onChange - birthDate:', { oldValue: oldVal, newValue: newVal })
})

watch(() => formData.country, (newVal, oldVal) => {
	console.log('onChange - country:', { oldValue: oldVal, newValue: newVal })
})

watch(() => formData.hobbies, (newVal, oldVal) => {
	console.log('onChange - hobbies:', { oldValue: oldVal, newValue: newVal })
}, { deep: true })

watch(() => formData.newsletter, (newVal, oldVal) => {
	console.log('onChange - newsletter:', { oldValue: oldVal, newValue: newVal })
})

watch(() => formData.gender, (newVal, oldVal) => {
	console.log('onChange - gender:', { oldValue: oldVal, newValue: newVal })
})

watch(() => formData.satisfaction, (newVal, oldVal) => {
	console.log('onChange - satisfaction:', { oldValue: oldVal, newValue: newVal })
})

watch(() => formData.color, (newVal, oldVal) => {
	console.log('onChange - color:', { oldValue: oldVal, newValue: newVal })
})

watch(() => formData.phoneAreaCode, (newVal, oldVal) => {
	console.log('onChange - phoneAreaCode:', { oldValue: oldVal, newValue: newVal })
})

watch(() => formData.phone, (newVal, oldVal) => {
	console.log('onChange - phone:', { oldValue: oldVal, newValue: newVal })
})

watch(() => formData.comments, (newVal, oldVal) => {
	console.log('onChange - comments:', { oldValue: oldVal, newValue: newVal })
})

watch(() => formData.password, (newVal, oldVal) => {
	console.log('onChange - password:', { oldValue: oldVal, newValue: newVal })
})

watch(() => formData.city, (newVal, oldVal) => {
	console.log('onChange - city:', { oldValue: oldVal, newValue: newVal })
})

watch(() => formData.tags, (newVal, oldVal) => {
	console.log('onChange - tags:', { oldValue: oldVal, newValue: newVal })
}, { deep: true })

watch(() => formData.notifications, (newVal, oldVal) => {
	console.log('onChange - notifications:', { oldValue: oldVal, newValue: newVal })
})

watch(() => formData.volume, (newVal, oldVal) => {
	console.log('onChange - volume:', { oldValue: oldVal, newValue: newVal })
})

watch(() => formData.rating, (newVal, oldVal) => {
	console.log('onChange - rating:', { oldValue: oldVal, newValue: newVal })
})

// Validation functions
const validateName = () => {
	if (!formData.name || formData.name.trim() === '') {
		errors.name = 'El nombre es requerido'
		return false
	}
	if (formData.name.length < 3) {
		errors.name = 'El nombre debe tener al menos 3 caracteres'
		return false
	}
	errors.name = ''
	return true
}

const validateEmail = () => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	if (!formData.email || formData.email.trim() === '') {
		errors.email = 'El email es requerido'
		return false
	}
	if (!emailRegex.test(formData.email)) {
		errors.email = 'El email no es válido'
		return false
	}
	errors.email = ''
	return true
}

const validateAge = () => {
	if (formData.age === null) {
		errors.age = 'La edad es requerida'
		return false
	}
	if (formData.age < 18 || formData.age > 100) {
		errors.age = 'La edad debe estar entre 18 y 100 años'
		return false
	}
	errors.age = ''
	return true
}

const validateBirthDate = () => {
	if (!formData.birthDate) {
		errors.birthDate = 'La fecha de nacimiento es requerida'
		return false
	}
	const today = new Date()
	if (formData.birthDate > today) {
		errors.birthDate = 'La fecha de nacimiento no puede ser futura'
		return false
	}
	errors.birthDate = ''
	return true
}

const validateCountry = () => {
	if (!formData.country) {
		errors.country = 'El país es requerido'
		return false
	}
	errors.country = ''
	return true
}

const validateHobbies = () => {
	if (formData.hobbies.length === 0) {
		errors.hobbies = 'Selecciona al menos un hobby'
		return false
	}
	errors.hobbies = ''
	return true
}

const validateGender = () => {
	if (!formData.gender) {
		errors.gender = 'El género es requerido'
		return false
	}
	errors.gender = ''
	return true
}

const validatePhone = () => {
	if (!formData.phone || formData.phone.includes('_')) {
		errors.phone = 'El teléfono es requerido y debe estar completo'
		return false
	}
	errors.phone = ''
	return true
}

const validatePassword = () => {
	if (!formData.password || formData.password.length < 6) {
		errors.password = 'La contraseña debe tener al menos 6 caracteres'
		return false
	}
	errors.password = ''
	return true
}

const validateCity = () => {
	if (!formData.city || formData.city.trim() === '') {
		errors.city = 'La ciudad es requerida'
		return false
	}
	errors.city = ''
	return true
}

// Submit handler
const handleSubmit = () => {
	console.log('=== FORM SUBMIT ===')
	console.log('Form Data:', JSON.parse(JSON.stringify(formData)))

	// Validate all fields
	const isNameValid = validateName()
	const isEmailValid = validateEmail()
	const isAgeValid = validateAge()
	const isBirthDateValid = validateBirthDate()
	const isCountryValid = validateCountry()
	const isHobbiesValid = validateHobbies()
	const isGenderValid = validateGender()
	const isPhoneValid = validatePhone()
	const isPasswordValid = validatePassword()
	const isCityValid = validateCity()

	const isFormValid = isNameValid && isEmailValid && isAgeValid && isBirthDateValid &&
		isCountryValid && isHobbiesValid && isGenderValid && isPhoneValid &&
		isPasswordValid && isCityValid

	console.log('Form Valid:', isFormValid)
	console.log('Validation Errors:', JSON.parse(JSON.stringify(errors)))
	console.log('===================')

	if (isFormValid) {
		alert('¡Formulario enviado correctamente! Revisa la consola para ver los datos.')
	}
}
</script>

<template>
	<div class="form-container">
		<h1>Formulario Completo con PrimeVue!</h1>
		<p class="subtitle">Todos los tipos de inputs con validaciones</p>

		<form @submit.prevent="handleSubmit" class="prime-form">

			<!-- InputText -->
			<div class="form-field">
				<label for="name">Nombre <span class="required">*</span></label>
				<InputText id="name" v-model="formData.name" placeholder="Ingresa tu nombre"
					:class="{ 'p-invalid': errors.name }" @blur="validateName" />
				<small v-if="errors.name" class="p-error">{{ errors.name }}</small>
			</div>

			<!-- InputText Email -->
			<div class="form-field">
				<label for="email">Email <span class="required">*</span></label>
				<InputText id="email" v-model="formData.email" type="email" placeholder="ejemplo@correo.com"
					:class="{ 'p-invalid': errors.email }" @blur="validateEmail" />
				<small v-if="errors.email" class="p-error">{{ errors.email }}</small>
			</div>

			<!-- Password -->
			<div class="form-field">
				<label for="password">Contraseña <span class="required">*</span></label>
				<Password id="password" v-model="formData.password" placeholder="Mínimo 6 caracteres"
					:class="{ 'p-invalid': errors.password }" @blur="validatePassword" toggleMask :feedback="false" />
				<small v-if="errors.password" class="p-error">{{ errors.password }}</small>
			</div>

			<!-- InputNumber -->
			<div class="form-field">
				<label for="age">Edad <span class="required">*</span></label>
				<InputNumber id="age" v-model="formData.age" placeholder="18-100" :min="0" :max="120"
					:class="{ 'p-invalid': errors.age }" @blur="validateAge" />
				<small v-if="errors.age" class="p-error">{{ errors.age }}</small>
			</div>

			<!-- Calendar -->
			<div class="form-field">
				<label for="birthDate">Fecha de Nacimiento <span class="required">*</span></label>
				<DatePicker id="birthDate" v-model="formData.birthDate" dateFormat="dd/mm/yy"
					placeholder="Selecciona una fecha" class="p-date" :class="{ 'p-invalid': errors.birthDate }"
					@blur="validateBirthDate" showIcon />
				<small v-if="errors.birthDate" class="p-error">{{ errors.birthDate }}</small>
			</div>

			<!-- Dropdown -->
			<div class="form-field">
				<label for="country">País <span class="required">*</span></label>
				<Select id="country" v-model="formData.country" :options="countries" optionLabel="name"
					optionValue="code" placeholder="Selecciona un país" :class="{ 'p-invalid': errors.country }"
					@change="validateCountry" />
				<small v-if="errors.country" class="p-error">{{ errors.country }}</small>
			</div>

			<!-- AutoComplete -->
			<div class="form-field">
				<label for="city">Ciudad <span class="required">*</span></label>
				<AutoComplete id="city" v-model="formData.city" :suggestions="filteredCities" @complete="searchCity"
					placeholder="Busca tu ciudad" :class="{ 'p-invalid': errors.city }" @blur="validateCity" />
				<small v-if="errors.city" class="p-error">{{ errors.city }}</small>
			</div>

			<!-- InputGroup with Phone -->
			<div class="form-field">
				<label for="phone">Teléfono <span class="required">*</span></label>
				<InputGroup>
					<Dropdown v-model="formData.phoneAreaCode" :options="areaCodes" optionLabel="name"
						optionValue="code" class="phone-area-code" />
					<InputMask id="phone" v-model="formData.phone" mask="999-999-9999" placeholder="123-456-7890"
						:class="{ 'p-invalid': errors.phone }" @blur="validatePhone" class="phone-input" />
				</InputGroup>
				<small v-if="errors.phone" class="p-error">{{ errors.phone }}</small>
			</div>

			<!-- MultiSelect -->
			<div class="form-field">
				<label for="hobbies">Hobbies <span class="required">*</span></label>
				<MultiSelect id="hobbies" v-model="formData.hobbies" :options="hobbiesOptions" optionLabel="name"
					optionValue="code" placeholder="Selecciona tus hobbies" :class="{ 'p-invalid': errors.hobbies }"
					@change="validateHobbies" display="chip" />
				<small v-if="errors.hobbies" class="p-error">{{ errors.hobbies }}</small>
			</div>

			<!-- Chips -->
			<div class="form-field">
				<label for="tags">Tags</label>
				<Chips id="tags" v-model="formData.tags" placeholder="Presiona Enter para agregar" />
			</div>

			<!-- RadioButton -->
			<div class="form-field">
				<label>Género <span class="required">*</span></label>
				<div class="radio-group">
					<div class="radio-item">
						<RadioButton inputId="male" v-model="formData.gender" value="male" @change="validateGender" />
						<label for="male">Masculino</label>
					</div>
					<div class="radio-item">
						<RadioButton inputId="female" v-model="formData.gender" value="female"
							@change="validateGender" />
						<label for="female">Femenino</label>
					</div>
					<div class="radio-item">
						<RadioButton inputId="other" v-model="formData.gender" value="other" @change="validateGender" />
						<label for="other">Otro</label>
					</div>
				</div>
				<small v-if="errors.gender" class="p-error">{{ errors.gender }}</small>
			</div>

			<!-- Checkbox -->
			<div class="form-field">
				<div class="checkbox-item">
					<Checkbox inputId="newsletter" v-model="formData.newsletter" :binary="true" />
					<label for="newsletter">Suscribirse al newsletter</label>
				</div>
			</div>

			<!-- InputSwitch -->
			<div class="form-field">
				<label for="notifications">Notificaciones</label>
				<InputSwitch id="notifications" v-model="formData.notifications" />
			</div>

			<!-- Slider -->
			<div class="form-field">
				<label for="satisfaction">Nivel de Satisfacción: {{ formData.satisfaction }}%</label>
				<Slider id="satisfaction" v-model="formData.satisfaction" :min="0" :max="100" />
			</div>

			<!-- Knob -->
			<div class="form-field">
				<label for="volume">Volumen</label>
				<Knob id="volume" v-model="formData.volume" :min="0" :max="100" valueTemplate="{value}%" />
			</div>

			<!-- Rating -->
			<div class="form-field">
				<label for="rating">Calificación</label>
				<Rating id="rating" v-model="formData.rating" :stars="5" />
			</div>

			<!-- ColorPicker -->
			<div class="form-field">
				<label for="color">Color Favorito</label>
				<ColorPicker id="color" v-model="formData.color" />
				<span v-if="formData.color" class="color-preview"
					:style="{ backgroundColor: '#' + formData.color }"></span>
			</div>

			<!-- Textarea -->
			<div class="form-field">
				<label for="comments">Comentarios</label>
				<Textarea id="comments" v-model="formData.comments" rows="5"
					placeholder="Escribe tus comentarios aquí..." autoResize />
			</div>

			<!-- Submit Button -->
			<div class="form-actions">
				<Button type="submit" label="Enviar Formulario" icon="pi pi-check" severity="success" />
			</div>

		</form>
	</div>
</template>

<style scoped>
.form-container {
	max-width: 800px;
	margin: 0 auto;
	padding: 2rem;
}

h1 {

	margin-bottom: 0.5rem;
}

.subtitle {
	color: #7f8c8d;
	margin-bottom: 2rem;
}

.prime-form {
	background: #fff;
	padding: 2rem;
	border-radius: 8px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-field {
	margin-bottom: 1.5rem;
}

.form-field label {
	display: block;
	margin-bottom: 0.5rem;
	font-weight: 400;
	color: #2c3e50;
}

.form-field label .required {
	color: #e74c3c;
	margin-left: 2px;
}

.form-field :deep(.p-inputtext),
.form-field :deep(.p-dropdown),
.form-field :deep(.p-multiselect),
.form-field :deep(.p-calendar),
.form-field :deep(.p-inputmask),
.form-field :deep(.p-autocomplete),
.form-field :deep(.p-chips),
.form-field :deep(.p-password),
.form-field :deep(.p-inputnumber) {
	width: 100%;
	border-radius: 50px;
}

/* Ensure dropdowns and multiselects have rounded borders */
.form-field :deep(.p-dropdown),
.form-field :deep(.p-multiselect) {
	border-radius: 50px !important;
}

.form-field :deep(.p-dropdown .p-dropdown-trigger),
.form-field :deep(.p-multiselect .p-multiselect-trigger) {
	border-top-right-radius: 50px !important;
	border-bottom-right-radius: 50px !important;
}

.form-field :deep(.p-slider) {
	width: 100%;
}

.p-error {
	color: #e74c3c;
	font-size: 0.875rem;
	display: block;
	margin-top: 0.25rem;
}

.radio-group {
	display: flex;
	gap: 1.5rem;
	flex-wrap: wrap;
}

.radio-item {
	display: flex;
	align-items: center;
	gap: 0.5rem;
}

.checkbox-item {
	display: flex;
	align-items: center;
	gap: 0.5rem;
}

.color-preview {
	display: inline-block;
	width: 30px;
	height: 30px;
	border-radius: 4px;
	margin-left: 1rem;
	border: 1px solid #ddd;
	vertical-align: middle;
}

.form-actions {
	margin-top: 2rem;
	display: flex;
	justify-content: center;
}

.form-actions :deep(.p-button) {
	padding: 0.75rem 2rem;
	font-size: 1rem;
}

:deep(.p-invalid) {
	border-color: #e74c3c !important;
}

/* Phone InputGroup Styles */
.form-field :deep(.p-inputgroup) {
	display: flex;
	width: 100%;
}

.form-field :deep(.phone-area-code) {
	width: 130px;
	flex-shrink: 0;
}

.form-field :deep(.p-select) {
	border-radius: 50px !important;
	width: 100%;
}

.form-field :deep(.phone-input) {
	flex: 1;
}


/* Phone area code - rounded left, straight right */
.form-field :deep(.phone-area-code) {
	border-top-left-radius: 50px !important;
	border-bottom-left-radius: 50px !important;
	border-top-right-radius: 0px !important;
	border-bottom-right-radius: 0px !important;
	border-right: none !important;
	max-width: 150px !important;
}

/* Phone input - straight left, rounded right */
.form-field :deep(.phone-input.p-inputmask) {
	border-top-left-radius: 0 !important;
	border-bottom-left-radius: 0 !important;
	border-top-right-radius: 50px !important;
	border-bottom-right-radius: 50px !important;
}

.p-date :deep(input) {
	border-top-left-radius: 50px !important;
	border-bottom-left-radius: 50px !important;
	border-top-right-radius: 0px !important;
	border-bottom-right-radius: 0px !important;

	width: 100%;

}

.p-date {
	display: flex !important;
}
</style>