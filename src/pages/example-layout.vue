<script setup lang="ts">

const MAX_WIDTH = 600;

const windowSize = reactive({
	width: 0,
	height: 0
})

const heightPage = computed(() =>
{
	return windowSize.height
})

const widthtPage = computed(() =>
{
	return windowSize.width
})

const onResize = () =>
{
	windowSize.width = window.innerWidth
	windowSize.height = window.innerHeight
	console.log(windowSize);
}

onMounted(() =>
{
	onResize()
})
</script>

<template>
	<v-layout class="mx-auto" :style="{ width: widthtPage < MAX_WIDTH ? '100%' : '500px' }" v-resize="onResize">
		<v-app-bar color="primary" density="compact">
			<template v-slot:prepend>
				<v-app-bar-nav-icon></v-app-bar-nav-icon>
			</template>

			<v-app-bar-title>w: {{ widthtPage }} h:{{ heightPage }}</v-app-bar-title>

			<template v-slot:append>
				<v-btn icon="mdi-dots-vertical"></v-btn>
			</template>
		</v-app-bar>

		<v-main :style="{ height: `${heightPage}px` }" class="overflow-auto">
			<v-container>
				<v-row dense>
					<v-col v-for="n in 200" :key="n" cols="3">
						<v-sheet color="grey-lighten-2" height="96"></v-sheet>
					</v-col>
				</v-row>
			</v-container>
		</v-main>

		<v-bottom-navigation grow>
			<v-btn value="recent">
				<v-icon>mdi-history</v-icon>

				Recent
			</v-btn>

			<v-btn value="favorites">
				<v-icon>mdi-heart</v-icon>

				Favorites
			</v-btn>

			<v-btn value="nearby">
				<v-icon>mdi-map-marker</v-icon>

				Nearby
			</v-btn>
		</v-bottom-navigation>
	</v-layout>
</template>
