<script setup lang="ts">
// extend PageMeta

definePageMeta({
	sort: '1',
	icon: 'mdi-pot-steam',
	tag: 'Services',
	asBottomNavigation: true
})

const router = useRouter()

const goToAbout = () => {
	router.push('/about')
}
</script>
<template>
	<div>
		<v-btn @click="goToAbout">
			<v-icon start icon="mdi-vuetify"></v-icon>
			Index Page Here JKT KOPI
			<v-icon end icon="mdi-vuetify"></v-icon>
		</v-btn>
	</div>
</template>
