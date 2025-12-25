<script setup lang="ts"></script>

<template>
  <div class="about-container">
    <div class="about-content">
      <h1>Acerca de SuperForm</h1>

      <div class="info-section">
        <h2>¿Qué es SuperForm?</h2>
        <p>
          SuperForm es un componente Vue 3 dinámico y reutilizable que
          simplifica la creación de formularios complejos. Con una configuración
          basada en objetos, puedes crear formularios completos sin escribir
          HTML repetitivo.
        </p>
      </div>

      <div class="info-section">
        <h2>Características Principales</h2>
        <ul class="features-list">
          <li>
            <i class="pi pi-check"></i>
            <strong>15+ tipos de inputs</strong>: text, email, password, number,
            date, select, multiselect, phone, checkbox, file, currency,
            percentage y más
          </li>
          <li>
            <i class="pi pi-check"></i>
            <strong>Sistema de validación</strong>: Validaciones integradas
            (required, pattern, min, max) con mensajes de error personalizables
          </li>
          <li>
            <i class="pi pi-check"></i>
            <strong>Actualización dinámica</strong>: Actualiza campos y valores
            desde el componente padre en tiempo real
          </li>
          <li>
            <i class="pi pi-check"></i>
            <strong>Eventos personalizados</strong>: @submit y @change para
            tracking completo del formulario
          </li>
          <li>
            <i class="pi pi-check"></i>
            <strong>Slots personalizados</strong>: Soporte para contenido
            personalizado con slots nombrados y scoped
          </li>
          <li>
            <i class="pi pi-check"></i>
            <strong>Grid responsive</strong>: Sistema de 12 columnas para
            layouts flexibles
          </li>
          <li>
            <i class="pi pi-check"></i>
            <strong>TypeScript</strong>: Completamente tipado para mejor
            experiencia de desarrollo
          </li>
        </ul>
      </div>

      <div class="info-section">
        <h2>Uso Básico</h2>
        <pre class="code-block"><code>&lt;SuperForm
  :fields="formFields"
  :initialData="initialFormData"
  @submit="handleSubmit"
  @change="handleChange"
/&gt;</code></pre>
      </div>

      <div class="info-section">
        <h2>Tecnologías Utilizadas</h2>
        <div class="tech-grid">
          <div class="tech-card">
            <i class="pi pi-code tech-icon"></i>
            <h3>Vue 3</h3>
            <p>Composition API</p>
          </div>
          <div class="tech-card">
            <i class="pi pi-palette tech-icon"></i>
            <h3>PrimeVue</h3>
            <p>UI Components</p>
          </div>
          <div class="tech-card">
            <i class="pi pi-file tech-icon"></i>
            <h3>TypeScript</h3>
            <p>Type Safety</p>
          </div>
          <div class="tech-card">
            <i class="pi pi-bolt tech-icon"></i>
            <h3>Vite</h3>
            <p>Build Tool</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.about-content h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
  background: linear-gradient(135deg, #7435ff 0%, #5e2acc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.info-section {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
}

.info-section h2 {
  font-size: 1.5rem;
  color: #7435ff;
  margin-bottom: 1rem;
}

.info-section p {
  color: #6c757d;
  line-height: 1.8;
  font-size: 1.05rem;
}

.features-list {
  list-style: none;
  padding: 0;
}

.features-list li {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
  color: #6c757d;
  line-height: 1.6;
}

.features-list i {
  color: #7435ff;
  font-size: 1.2rem;
  margin-top: 0.2rem;
}

.code-block {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
  border-left: 4px solid #7435ff;
}

.code-block code {
  font-family: 'Courier New', monospace;
  color: #2c3e50;
  font-size: 0.95rem;
  line-height: 1.6;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.tech-card {
  text-align: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 12px;
  border: 2px solid #e9ecef;
  transition: all 0.3s ease;
}

.tech-card:hover {
  border-color: #7435ff;
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(116, 53, 255, 0.15);
}

.tech-icon {
  font-size: 2.5rem;
  color: #7435ff;
  margin-bottom: 0.5rem;
}

.tech-card h3 {
  font-size: 1.1rem;
  color: #2c3e50;
  margin-bottom: 0.25rem;
}

.tech-card p {
  font-size: 0.875rem;
  color: #7f8c8d;
  margin: 0;
}

@media (max-width: 768px) {
  .about-content h1 {
    font-size: 2rem;
  }

  .info-section {
    padding: 1.5rem;
  }

  .tech-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
