
//random color generation sect
const colorGenerator = document.querySelector('.randomBtn')
displayColorDiv = document.querySelector('.colorbody')
hexInput = document.querySelector('#hexVal')
rgbInput = document.querySelector('#rgbVal')
redRange = document.querySelector('#redRange')
greenRange = document.querySelector('#greenRange')
blueRange = document.querySelector('#blueRange')

hexInput.value = 'DEDEED'.toLocaleLowerCase()
rgbInput.value = 'rgb(222,222,237)'
let divs;
let red;
let green;
let blue;



function generateColor() {
    red = Math.floor(Math.random() * 255) + 1
    green = Math.floor(Math.random() * 255) + 1
    blue = Math.floor(Math.random() * 255) + 1

    return `rgb(${red},${green},${blue})`
}

function rgbToHex(r, g, b) {
    return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
function hexToRgb(hex) {
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return r + "," + g + "," + b;
}
function numVal(Range) {
    return Range.previousElementSibling.children[1]
}

function changeRange(val1, val2, val3) {
    redRange.value = val1;
    greenRange.value = val2;
    blueRange.value = val3;

    const redVal = numVal(redRange)
    redVal.innerHTML = val1
    const greenVal = numVal(greenRange)
    greenVal.innerHTML = val2
    const blueVal = numVal(blueRange)
    blueVal.innerHTML = val3
}

colorGenerator.addEventListener('click', function () {
    const val = generateColor()
    document.body.style.backgroundColor = val
    displayColorDiv.style.backgroundColor = val
    rgbInput.value = val
    hexInput.value = rgbToHex(red, green, blue)
    changeRange(red, green, blue)
})

//copyBtn sect
let div
const copyIcon = document.querySelectorAll('.fa-solid')


copyIcon.forEach(icon => {
    icon.addEventListener('mouseover', function () {
        const p = document.createElement('p');
        p.classList.add('hoverCopy');
        p.textContent = 'Copy'

        this.parentElement.appendChild(p)
        this.addEventListener('mouseout', function () {
            p.remove()
        })
        this.addEventListener('click', function () {
            const copyVal = this.previousElementSibling.value
            if (this.previousElementSibling.id === 'hexVal') {
                navigator.clipboard.writeText('#' + copyVal)
            } else {
                navigator.clipboard.writeText(copyVal)
            }
            p.textContent = 'Copied'
            p.style.right = '-20px'
            setTimeout(() => {
                p.textContent = 'Copy'
                p.removeAttribute('style')
            }, 1500);
        })
    })
})

//change hex and rgb code to make a color

function hexValid(color) {
    if (color.length !== 7) return false
    if (color[0] !== '#') return false

    color = color.substring(1)
    return /^[0-9A-Fa-f]{6}$/i.test(color)
}
function isValidRGB(R, G, B) {

    if (R < 0 || R > 255) { return false; }
    else if (G < 0 || G > 255) { return false }
    else if (B < 0 || B > 255) { return false }

    else {
        return true;
    }

}

hexInput.addEventListener('keyup', function (e) {
    const colors = '#' + e.target.value
    if (hexValid(colors)) {
        displayColorDiv.style.backgroundColor = colors
        document.body.style.backgroundColor = colors
        const rgbValue = hexToRgb(colors.substring(1))
        rgbInput.value = `rgb(${rgbValue})`
        let match = rgbValue.split(',')
        changeRange(match[0], match[1], match[2])

    }
})

rgbInput.addEventListener('keyup', function (e) {
    const rgbcol = e.target.value
    rgbsplit = rgbcol.slice(4, -1).split(',')
    r = rgbsplit[0]
    g = rgbsplit[1]
    b = rgbsplit[2]
    if (isValidRGB(r, g, b)) {
        displayColorDiv.style.backgroundColor = rgbcol
        document.body.style.backgroundColor = rgbcol
        if (Number(r) && Number(g) && Number(b)) {
            changeRange(r, g, b)
            hexInput.value = rgbToHex(Number(rgbsplit[0]), Number(rgbsplit[1]), Number(rgbsplit[2]))
        }
    }
})

//update color if range is changed mannually

const allRange = document.querySelectorAll('input[type="range"]')

allRange.forEach(item => {
    item.addEventListener('change', function () {
        const Val = numVal(this)
        Val.innerHTML = this.value
        const rgbcol = rgbInput.value
        const rgbsplit = rgbcol.slice(4, -1).split(',')

        rgbsplit[0] = redRange.value
        rgbsplit[1] = greenRange.value
        rgbsplit[2] = blueRange.value

        const lastval = `rgb(${rgbsplit[0]},${rgbsplit[1]},${rgbsplit[2]})`
        displayColorDiv.style.backgroundColor = lastval
        document.body.style.backgroundColor = lastval
        rgbInput.value = lastval
        hexInput.value = rgbToHex(Number(rgbsplit[0]), Number(rgbsplit[1]), Number(rgbsplit[2]))
    })
})

//default colors preset









