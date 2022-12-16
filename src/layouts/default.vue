<script setup ang="ts">
import { useDisplay } from 'vuetify'

const MAX_WIDTH = 600;

const sizePage = useSizePage()

const windowSize = reactive({
	width: 0,
	height: 0
})

const display = useDisplay()


const heightPage = computed(() => {
	return windowSize.height
})

const widthtPage = computed(() => {
	return windowSize.width
})

const onResize = () => {
	windowSize.width = window.innerWidth
	windowSize.height = window.innerHeight

	let appLayout = document.getElementById('app-layout');
	let widthLayout = appLayout ? appLayout.offsetWidth : 0;

	console.log(widthLayout, widthLayout - 20);
	sizePage.value.width = widthLayout
	sizePage.value.height = window.innerHeight

}

const runServiceWorker = () => {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('/pwa/service-worker.js')
	}
}
onMounted(() => {
	for (const key in display) {
	}
	// runServiceWorker()
	onResize()
});
</script>

<template>
	<v-app>
		<v-layout v-if="widthtPage && heightPage" class="mx-auto" id="app-layout"
			:style="{ width: widthtPage < MAX_WIDTH ? '100%' : '500px' }" v-resize="onResize">
			<v-sheet color="grey-lighten-5" class="w-100" elevation="2">
				<page-header :widthtPage="widthtPage" :heightPage="heightPage" />
				<v-main :style="{ height: `${heightPage}px` }" class="overflow-auto">
					<v-container>
						<slot />
						<v-row dense class="mt-1" v-if="false">
							<v-col v-for="n in 200" :key="n" cols="3">
								<v-sheet color="red-lighten-2" height="96"></v-sheet>
							</v-col>
						</v-row>
					</v-container>
				</v-main>
				<page-footer />
			</v-sheet>

		</v-layout>
	</v-app>
</template>
