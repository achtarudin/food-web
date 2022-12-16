<script setup  lang="ts">
import p5 from 'p5'

useHead({
	script: [
		{
			src: 'https://unpkg.com/ml5@latest/dist/ml5.min.js',
		}
	]
})
const sizePage = useSizePage()


let p5Ref = ref<HTMLElement | null>(null)
let p5Video = ref<p5.Element | null>(null)
let resultFace = ref<any>(null)
let detections = ref<any>([])
let p5Intance = ref<p5 | null>(null)


const faceReady = () =>
{
	console.log("faceReady!");
	console.log(resultFace.value);
	resultFace.value.detect(gotFace)
}

const gotFace = (error: any, result: any) =>
{
	if (error)
	{
		console.log(error)
		return
	}


	if (resultFace.value) {
		console.log(resultFace.value);
		detections.value = result
		resultFace.value.detect(gotFace)
	}

}

const drawBox = (detectionFace: any[]) =>
{
	const p = p5Intance.value as p5
	for (let index = 0; index < detectionFace.length; index++)
	{
		let x = detectionFace[index].alignedRect._box._x
		let y = detectionFace[index].alignedRect._box._y
		let width = detectionFace[index].alignedRect._box._width
		let height = detectionFace[index].alignedRect._box._height
		p.stroke(44, 169, 225)
		p.strokeWeight(2)
		p.noFill()
		p.rect(x, y, width, height)
	}
}

const drawLandmark = (detectionFace: any[]) =>
{
	const p = p5Intance.value as p5
	for (let index = 0; index < detectionFace.length; index++)
	{
		let points= detectionFace[index].landmarks.positions
		for (let i = 0; i < points.length; i++)
		{
			let x = points[i]._x
			let y = points[i]._y
			p.stroke(44, 169, 225)
			p.strokeWeight(2)
			p.point(x, y)
		}
	}
}

onUnmounted(() =>
{
	p5Ref.value?.remove()
	p5Video.value?.remove()
	p5Intance.value?.remove()
	resultFace.value = null

})

onMounted(() =>
{
	const WIDTH_CANVAS = p5Ref.value?.parentElement?.offsetWidth as number
	const HEIGTH_CANVAS = WIDTH_CANVAS
	const FACE_OPTIONS = {
		withLandmarks: true,
		withDescriptors: false,
		withExpressions: true,
		minConfidence: 0.5,
	}

	p5Intance.value = new p5((p: p5) =>
	{
		p.setup = () =>
		{
			p.createCanvas(WIDTH_CANVAS, HEIGTH_CANVAS);
			p5Video.value = p.createCapture(p.VIDEO) as p5.Element;
			p5Video.value.size(p.width, p.height);
			p5Video.value.hide();

			if (window.ml5)
			{
				const ML5 = window.ml5 as any
				resultFace.value = ML5.faceApi(p5Video.value, FACE_OPTIONS, faceReady)
			}

		}
		p.draw = () =>
		{
			p.clear(0,0,0,0);

			p.translate(p.width, 0);
			p.scale(-1, 1);
			p.image(p5Video.value as p5.Element, 0, 0, p.width, p.height);
			if (detections.value.length > 0)
			{
				drawBox(detections.value)
				drawLandmark(detections.value)
			}
		}
	}, p5Ref.value as HTMLElement)
})
</script>
<template>
	<div class="w-100" :style="{ width: sizePage.width}">
		<div ref="p5Ref"></div>
	</div>
</template>
