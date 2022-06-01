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
	expect(validateThemeColors('#12234u')).toEqual([colors.theme, colors.theme])
})
