import { validateThemeColors } from './validateThemeColors'
import { colors } from '@/constants/colors'

test('no arguments should be an array of the theme color', () => {
	expect(validateThemeColors()).toEqual([colors.theme, colors.theme])
})

test('a valid hex should be an array of the same hex', () => {
	expect(validateThemeColors(colors.theme)).toEqual([colors.theme, colors.theme])
})

test('not valid hex should be an tuple of the theme color', () => {
	expect(validateThemeColors('')).toEqual([colors.theme, colors.theme])
})

test('not valid hex should be an tuple of the theme color', () => {
	expect(validateThemeColors('not a valid hex')).toEqual([colors.theme, colors.theme])
})

test('not valid hex should be an tuple of the theme color', () => {
	expect(validateThemeColors('#1')).toEqual([colors.theme, colors.theme])
})

test('not valid hex should be an tuple of the theme color', () => {
	expect(validateThemeColors('#12345')).toEqual([colors.theme, colors.theme])
})

test('not valid hex should be an tuple of the theme color', () => {
	expect(validateThemeColors('#12234u')).toEqual([colors.theme, colors.theme])
})

test('a valid hex should be an array of the same hex', () => {
	expect(validateThemeColors('#550055')).toEqual(['#550055', '#550055'])
})

test('an array of one valid color should return a tuple of that color', () => {
	expect(validateThemeColors(['#333'])).toEqual(['#333', '#333'])
})

test('a valid array of valid strings should be the same array', () => {
	expect(validateThemeColors(['#dddddd', '#dddddd'])).toEqual(['#dddddd', '#dddddd'])
})

test('array of more than 2 colors should return the first two valid colors', () => {
	expect(validateThemeColors(['#123444', '#dd', '#', '#999'])).toEqual(['#123444', '#999'])
})

test('array of 1 color should return a tuple of that color', () => {
	expect(validateThemeColors(['#123444'])).toEqual(['#123444', '#123444'])
})
