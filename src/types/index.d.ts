export {};

declare global {
	interface Window {
		ml5: any; // 👈️ turn off type checking
	}
}
