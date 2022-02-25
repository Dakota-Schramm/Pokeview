// converter that works for gens 1-8
// https://blog.stevenlevithan.com/archives/javascript-roman-numeral-converter

/*
    takes region as input. returns roman numeral from region converted to int.
*/
export default function convertRomanNumeralToInt(region) {
    const text = region.split(' ')
    const roman = text[1]

    var str = roman.toUpperCase()
    var validator = /^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/
    var token = /[MDLV]|C[MD]?|X[CL]?|I[XV]?/g
    var key = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1,
    }
    var num = 0
    var m
    if (!(str && validator.test(str))) return false
    while ((m = token.exec(str))) num += key[m[0]]
    return num
}
