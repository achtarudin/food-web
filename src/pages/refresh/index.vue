<script setup>
const router = useRouter()
const route = useRoute()

onMounted(() => {
	let backToPage = route.query.backTo ?? null

	if (backToPage) {
		router.replace({ name: backToPage })
		return
	}
	router.back()

})
</script>

<template>
	<div>Loading....</div>
</template>
