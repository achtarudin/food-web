<script setup lang="ts">

const isPageReady = ref<boolean>(false)

definePageMeta({
	sort: 3,
	tag: 'Camera',
	icon: 'mdi-camera',
	asBottomNavigation: true
})

const refreshPage = () =>
{
	isPageReady.value = false
	nextTick(() =>
	{
		isPageReady.value = true
	})
}

onMounted(() =>
{
	isPageReady.value = true
})

</script>
<template>
	<div v-if="isPageReady">
		<ClientOnly fallback-tag="span" fallback="Loading comments...">
			<page-video />
		</ClientOnly>
		<div class="d-flex justify-end mb-2" @click="refreshPage">
			<v-btn icon="mdi-reload" color="primary" size="small" />
		</div>
	</div>
</template>
