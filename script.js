const resultEl = document.getElementById('result')
const clipboardEl = document.getElementById('clipboard')
const lengthEl = document.getElementById('length')
const lowercaseEl = document.getElementById('lowercase')
const uppercaseEl = document.getElementById('uppercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value
    const hasLower = lowercaseEl.checked
    const hasUpper = uppercaseEl.checked
    const hasNumber = numbersEl.checked
    const hasSymbol = symbolsEl.checked

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length)
})

function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = ''
    const typesCount = lower + upper + number + symbol
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter((item) => Object.values(item)[0])

    if (typesCount === 0) {
        return ''
    }

    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach((type) => {
            let funcName = Object.keys(type)
            generatedPassword += randomFunc[funcName]()
        })
    }
    const result = generatedPassword.slice(0, length)
    return result
}

clipboardEl.addEventListener('click', () => {
    let textarea = document.createElement('textarea')
    textarea.value = resultEl.innerText

    if (!textarea.value) {
        return
    }

    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
})

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}
function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}
function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}
function getRandomSymbol() {
    const symbol = '!@#$%^&*()<>{}[]/,.=-+'
    return symbol[Math.floor(Math.random() * symbol.length)]
}
