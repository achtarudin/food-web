<script setup lang="ts">
definePageMeta({
	sort: 3,
	tag: 'Camera',
	icon: 'mdi-camera',
	asBottomNavigation: true
})


</script>
<template>
	<div>
		<ClientOnly fallback-tag="span" fallback="Loading comments...">
			<page-video />
		</ClientOnly>
		<v-btn>
			<v-icon start icon="mdi-account"></v-icon>
			Camera Page
			<v-icon end icon="mdi-account"></v-icon>
		</v-btn>
	</div>
</template>
