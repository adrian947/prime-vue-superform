<template>
	<div class="level-page">
		<h1>Nivel 3</h1>
		<p>Has llegado al tercer nivel de profundidad.</p>
		<div class="card level-3">
			<p>Contenido del Nivel 3. ¡La navegación anidada funciona!</p>
		</div>
	</div>
</template>

<style scoped>
.level-page {
	padding: 20px;
}

.card {
	background: white;
	padding: 20px;
	border-radius: 8px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.level-3 {
	border-left: 5px solid #ff4757;
}
</style>
