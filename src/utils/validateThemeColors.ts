import { colors as Colors } from '@/constants/colors'

function isHex(color: string): boolean {
	return /^#([0-9A-F]{3}){1,2}$/i.test(color) || /^#([0-9A-F]{4}){1,2}$/i.test(color)
}

export function validateThemeColors(colors: any): [string, string] {
	// undefined
	if (!colors || !Array.isArray(colors)) return [Colors.theme, Colors.theme]

	if (colors.length === 2 && isHex(colors[0]) && isHex(colors[1])) return colors as [string, string]

	return [Colors.theme, Colors.theme]
}
