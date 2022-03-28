import { arrayEquals } from './arrayEquals'

test('two non-arrays', () => {
	expect(arrayEquals('string a', 'string b')).toBe(false)
})

test('one array', () => {
	expect(arrayEquals(['string a'])).toBe(false)
})

test('should be true', () => {
	expect(arrayEquals(['a', 'b'], ['a', 'b'])).toBe(true)
})

test('should be false', () => {
	expect(arrayEquals(['a', 'b'], ['a', 'b', 'c'])).toBe(false)
})

test('should be true', () => {
	expect(arrayEquals([], [])).toBe(true)
})
