export default function validate(colors: any) {
	// undefine
	if (!colors) return ['#2266ff', '#2266ff']

	// is not array and is string and is ot valid hex color
	if (!Array.isArray(colors) && typeof colors === 'string' && !/^#([0-9A-F]{3}){1,2}$/i.test(colors))
		return ['#2266ff', '#2266ff']

	// not array, is a string and is a valid hex color
	if (!Array.isArray(colors) && typeof colors === 'string' && /^#([0-9A-F]{3}){1,2}$/i.test(colors))
		return [colors, colors]

	// not array, is a string and is a valid hex color but misses # in beginning
	if (!Array.isArray(colors) && typeof colors === 'string' && /([0-9A-F]{3}){1,2}$/i.test(colors))
		return ['#' + colors, '#' + colors]

	// is array but its length is too much
	if (Array.isArray(colors) && colors.length > 2) return [colors[0], colors[1]]

	return colors
}
