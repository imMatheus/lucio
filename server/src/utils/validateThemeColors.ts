import { colors as Colors } from '@Constants/colors';

function isHex(color: string): boolean {
  return (
    /^#([0-9A-F]{3}){1,2}$/i.test(color) || /^#([0-9A-F]{4}){1,2}$/i.test(color)
  );
}

export function validateThemeColors(colors: any): [string, string] {
  // undefined
  if (!colors) return [Colors.theme, Colors.theme];

  const isString = typeof colors === 'string';
  const isArray = Array.isArray(colors);

  // neither a string or array
  if (!isString && !isArray) return [Colors.theme, Colors.theme];

  // is string and is valid hex color
  if (isString && isHex(colors)) return [colors, colors];

  // is string and is not valid hex color
  if (isString && !isHex(colors)) return [Colors.theme, Colors.theme];

  // is string and is a valid hex color but misses # in beginning
  if (isString && /([0-9A-F]{3}){1,2}$/i.test(colors))
    return ['#' + colors, '#' + colors];

  // is array but length is greater then 2
  if (isArray) {
    // filter all colors
    const filteredColors = colors.filter((color) => isHex(color));
    if (filteredColors.length === 0) return [Colors.theme, Colors.theme];
    if (filteredColors.length === 1)
      return [filteredColors[0], filteredColors[0]];
    return [filteredColors[0], filteredColors[1]];
  }

  console.log('asdasd');

  // one string in array that is valid hex
  if (isArray && colors.length === 1 && isHex(colors[0]))
    return [colors[0], colors[0]];

  // one element in array that is not valid hex color
  if (isArray && colors.length === 1 && !isHex(colors[0]))
    return [Colors.theme, Colors.theme];

  if (
    isArray &&
    colors.length === 2 &&
    !isHex(colors[0]) &&
    !isHex(colors[1])
  ) {
    return [Colors.theme, Colors.theme];
  }

  // return colors as [string, string];
}
