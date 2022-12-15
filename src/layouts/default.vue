<script setup ang="ts">
const MAX_WIDTH = 600;

const windowSize = reactive({
	width: 0,
	height: 0
})

const heightPage = computed(() => {
	return windowSize.height
})

const widthtPage = computed(() => {
	return windowSize.width
})

const onResize = () => {
	windowSize.width = window.innerWidth
	windowSize.height = window.innerHeight
}

const runServiceWorker = () => {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('/pwa/service-worker.js')
	}
}
onMounted(() => {
	runServiceWorker()
	onResize()
});
</script>

<template>
	<v-app>
		<v-layout v-if="widthtPage && heightPage" class="mx-auto"
			:style="{ width: widthtPage < MAX_WIDTH ? '100%' : '500px' }" v-resize="onResize">
			<page-header :widthtPage="widthtPage" :heightPage="heightPage" />
			<v-main :style="{ height: `${heightPage}px` }" class="overflow-auto">
				<v-container>
					<slot />
					<v-row dense class="mt-1" v-if="false">
						<v-col v-for="n in 200" :key="n" cols="3">
							<v-sheet color="grey-lighten-2" height="96"></v-sheet>
						</v-col>
					</v-row>
				</v-container>
			</v-main>
			<page-footer />
		</v-layout>
	</v-app>
</template>
