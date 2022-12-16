interface SizePage {
	width: number
	height: number
}
export const useSizePage = () => useState<SizePage>("sizePage", () => ({width: 0, height: 0}));
