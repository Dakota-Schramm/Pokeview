import convertRomanNumeralToInt from '../../components/view/region-slider/convertRomanToInt'

test('check that Gen I returns 1', () => {
    expect(convertRomanNumeralToInt('Gen I')).toBe(1)
})

test('check that Gen VIII returns 8', () => {
    expect(convertRomanNumeralToInt('Gen VIII')).toBe(8)
})
