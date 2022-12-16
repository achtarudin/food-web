<script setup lang="ts">
import { RouteRecordRaw } from 'vue-router';

const route = useRoute()
const router = useRouter()

const bottomNavs = computed(() =>
{
	return router.options.routes
		.filter((route) => route.meta?.asBottomNavigation as boolean)
		.sort((a, b) => (a.meta?.sort as number) - (b.meta?.sort as number))
})

const goToRoute = (route: RouteRecordRaw) =>
{
	router.push({ name: route.name })
}

</script>

<template>
	<v-bottom-navigation grow class="d-flex justify-space-between">
		<v-btn v-for="(bottomNav) in bottomNavs" :key="bottomNav.meta?.name" :value="bottomNav.meta?.tag"
			:active="bottomNav.name === route.name" @click="goToRoute(bottomNav)">
			<v-icon :icon="(bottomNav.meta?.icon as string)" />
			<span class="text-caption">{{ bottomNav.meta?.tag }}</span>
		</v-btn>
	</v-bottom-navigation>
</template>
