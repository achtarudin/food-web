import p5 from "p5";

export default defineNuxtPlugin((nuxtApp) => {
	return {
		provide: {
			p5,
		},
	};
});
