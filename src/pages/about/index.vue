<script setup>

definePageMeta({
	sort: 2,
	tag: 'About',
	icon: 'mdi-archive-clock',
	asBottomNavigation: true
})

const router = useRouter()

const goToIndex = () => {
	router.push('/')
}
</script>
<template>
	<div>
		<v-btn @click="goToIndex">
			<v-icon start icon="mdi-account"></v-icon>
			About Page
			<v-icon end icon="mdi-account"></v-icon>
		</v-btn>
	</div>
</template>
