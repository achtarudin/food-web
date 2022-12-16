
<script setup lang="ts">
import p5 from 'p5'
import { nets, detectAllFaces, TinyFaceDetectorOptions, Box } from 'face-api.js'
useHead({
	script: [
		{
			defer: true,
			src: 'https://unpkg.com/ml5@latest/dist/ml5.min.js',
		},
	]
})

definePageMeta({
	sort: 4,
	tag: 'Face Detection',
	icon: 'mdi-badge-account-alert',
	asBottomNavigation: true
})

const { $p5 } = useNuxtApp()

const p5Intance = ref<p5 | null>(null)
const p5Ref = ref<HTMLElement | null>(null)
const p5Video = ref<p5.Element | null>(null)
const isPageReady = ref<boolean>(false)

const refreshPage = () =>
{
	isPageReady.value = false
	nextTick(() =>
	{
		isPageReady.value = true
	})
}

const loadModel = async () =>
{
	return Promise.all([
		nets.tinyFaceDetector.loadFromUri('/models'),
		nets.faceLandmark68Net.loadFromUri('/models'),
		nets.faceRecognitionNet.loadFromUri('/models'),
		nets.tinyFaceDetector.loadFromUri('/models'),
	])
}
const createP5Canvas = () =>
{
	const WIDTH_CANVAS = p5Ref.value?.parentElement?.offsetWidth as number
	p5Intance.value = new $p5((p: p5) =>
	{
		p.setup = () =>
		{
			p.createCanvas(WIDTH_CANVAS, WIDTH_CANVAS);
			p5Video.value = p.createCapture(p.VIDEO) as p5.Element;
			p5Video.value.size(p.width, p.height);
			p5Video.value.hide();
		}

		p.draw = async () =>
		{
			p.clear(0, 0, 0, 0);
			p.translate(p.width, 0);
			p.scale(-1, 1);
			let result = p.image(p5Video.value as p5.Element, 0, 0, p.width, p.height);
			const detections = await detectAllFaces(p5Video.value?.elt, new TinyFaceDetectorOptions()).withFaceLandmarks()
			console.log(detections);
			for (let index = 0; index < detections.length; index++)
			{
				// console.log(detections[index].alignedRect._box.toString());

				let result = new Box(detections[index].alignedRect.box) as Box

				// let result = new ObjectDetection(detections[index].alignedRect)
				// console.log(result);

				// let { _x, _y, _width, _height } = result;
				console.log(result.x, result.y, result.width, result.height);

				p.stroke(44, 169, 225)
				p.strokeWeight(2)
				p.noFill()
				p.rect(result.x, result.y, result.width, result.height)
			}
			// console.log(p5Video.value as unknown as HTMLVideoElement);

		}
	}, p5Ref.value as HTMLElement)
}

onMounted(() =>
{
	loadModel().then(async () =>
	{
		try
		{
			isPageReady.value = true
			console.log('model Loaded');
		} catch (error)
		{
			console.log(error);

		}


	})
	// console.log(nets.faceExpressionNet.loadFromUri())

})

onUpdated(() =>
{
	p5Video.value?.remove()
	p5Intance.value?.remove()
	nextTick(() =>
	{
		createP5Canvas()

	})
})

onUnmounted(() =>
{
	p5Ref.value?.remove()
	p5Video.value?.remove()
	p5Intance.value?.remove()
})


</script>
<template>
	<div v-if="isPageReady">
		<div class="w-100">
			<div ref="p5Ref"></div>
			<div class="d-flex justify-end mb-2" v-if="isPageReady">
				<v-btn icon="mdi-reload" color="primary" size="small" @click="refreshPage" />
			</div>
		</div>
	</div>

</template>
