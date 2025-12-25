<template>
	<div class="main-layout">
		<Navbar />
		<div class="layout-body d-flex">
			<SideBar :menu="menuData" />
			<main class="page-content flex-grow-1 p-4">
				<router-view v-slot="{ Component }">
					<transition name="fade" mode="out-in">
						<component :is="Component" />
					</transition>
				</router-view>
			</main>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Navbar from './Navbar.vue'
import SideBar, { type Menu } from './SideBar.vue'

// Example Menu Data with 3 levels
const menuData = ref<Menu>({
	top: [
		{
			title: 'Inicio',
			image: 'https://cdn-icons-png.flaticon.com/512/25/25694.png',
			path: '/',
			visible: true
		},
		{
			title: 'Formularios',
			image: 'https://cdn-icons-png.flaticon.com/512/2910/2910768.png',
			path: '/form',
			visible: true
		},
		{
			title: 'Niveles',
			image: 'https://cdn-icons-png.flaticon.com/512/8056/8056801.png',
			visible: true,
			children: [
				{
					title: 'Nivel 1',
					image: '',
					visible: true,
					path: '/level1',
					children: [
						{
							title: 'Ir a Nivel 2',
							visible: true,
							path: '/level1/level2',
							children: [
								{
									title: 'Ir a Nivel 3',
									visible: true,
									path: '/level1/level2/level3'
								}
							]
						}
					]
				}
			]
		},
		{
			title: 'About',
			image: 'https://cdn-icons-png.flaticon.com/512/189/189664.png',
			path: '/about',
			visible: true
		}
	],
	above: [
		{
			title: 'Configuraciones',
			image: 'https://cdn-icons-png.flaticon.com/512/3524/3524659.png',
			visible: true,
			children: []
		}
	]
})
</script>

<style scoped>
.main-layout {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	background-color: #f8fafc;
}

.layout-body {
	display: flex;
	flex: 1;
	position: relative;
}

.page-content {
	flex: 1;
	padding: 2rem;
	overflow-y: auto;
}

/* Transition for route views */
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
