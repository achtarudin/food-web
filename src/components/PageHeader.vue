<script setup lang="ts">


defineProps<{
	widthtPage?: string | number
	heightPage?: string | number
}>()


</script>

<template>
	<v-app-bar color="primary" density="compact">

		<v-app-bar-title>w: {{ widthtPage }} h:{{ heightPage }}</v-app-bar-title>

		<template v-slot:append>
			<v-btn icon="mdi-dots-vertical"></v-btn>
		</template>
	</v-app-bar>
</template>
