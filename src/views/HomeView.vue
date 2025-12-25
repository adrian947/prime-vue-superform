<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToForm = () => {
  router.push('/form')
}
</script>

<template>
  <div class="home-container">
    <div class="hero-section">
      <div class="hero-content">
        <div class="hero-icon">
          <i class="pi pi-bolt"></i>
        </div>
        <h1 class="hero-title">Vue SuperForm</h1>

        <p class="hero-subtitle">
          Componente dinámico y reutilizable para crear formularios complejos
          con facilidad
        </p>

        <div class="features-grid">
          <div class="feature-card">
            <i class="pi pi-check-circle feature-icon"></i>
            <h3>15+ Tipos de Input</h3>
            <p>Text, email, password, date, select, multiselect, phone y más</p>
          </div>

          <div class="feature-card">
            <i class="pi pi-shield feature-icon"></i>
            <h3>Validación Completa</h3>
            <p>Sistema de validación integrado con reglas personalizables</p>
          </div>

          <div class="feature-card">
            <i class="pi pi-sync feature-icon"></i>
            <h3>Actualización Dinámica</h3>
            <p>
              Actualiza campos y valores en tiempo real desde el componente
              padre
            </p>
          </div>

          <div class="feature-card">
            <i class="pi pi-palette feature-icon"></i>
            <h3>Totalmente Personalizable</h3>
            <p>Slots, clases CSS personalizadas y configuración flexible</p>
          </div>
        </div>

        <div class="cta-buttons">
          <Button
            label="Ver Demo"
            icon="pi pi-play"
            size="large"
            @click="goToForm"
          />
          <Button
            label="Documentación"
            icon="pi pi-book"
            severity="secondary"
            outlined
            size="large"
            @click="router.push('/about')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  min-height: calc(100vh - 70px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.hero-section {
  max-width: 1000px;
  width: 100%;
}

.hero-content {
  text-align: center;
}

.hero-icon {
  font-size: 5rem;
  color: #7435ff;
  margin-bottom: 1rem;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-20px);
  }
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #7435ff 0%, #5e2acc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #6c757d;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 24px rgba(116, 53, 255, 0.2);
}

.feature-icon {
  font-size: 2.5rem;
  color: #7435ff;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.feature-card p {
  font-size: 0.9rem;
  color: #7f8c8d;
  line-height: 1.5;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-buttons :deep(.p-button) {
  padding: 0.875rem 2rem;
  font-size: 1.1rem;
  border-radius: 50px;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .cta-buttons {
    flex-direction: column;
  }

  .cta-buttons :deep(.p-button) {
    width: 100%;
  }
}
</style>
