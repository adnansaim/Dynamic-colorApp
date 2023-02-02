const generatedBtn = document.querySelector('button');
const root = document.querySelector('#root');
const input = document.querySelector('input');
const copyBtn = document.querySelector('.copyBtn');
const copyDone = document.querySelector('.copyDone');
const hexconverter = document.querySelector('.hexconBtn');
const rgbShow = document.querySelector('.rgbShow');
const copyBtn2 = document.querySelector('.copyBtn2');
let div = null;
let timeout;
input.value = 'ffffff';
rgbShow.value = 'rgb(255,255,255)';
let rgb;


function generatecolor() {
    const red = Math.floor(Math.random() * 255) + 1;
    const green = Math.floor(Math.random() * 255) + 1;
    const blue = Math.floor(Math.random() * 255) + 1;
    rgb = `rgb(${red},${green},${blue})`;
    return rgbToHex(red, green, blue);
}

generatedBtn.addEventListener('click', function () {
    if (copyBtn.disabled) {
        copyBtn.disabled = false;
    }
    input.value = generatecolor().substring(1);
    root.style.backgroundColor = generatecolor();
    rgbShow.value = rgb;
})

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

copyBtn.addEventListener('click', function () {
    const data = '#' + input.value;
    navigator.clipboard.writeText(data);
    copyfunc();
});

copyBtn2.addEventListener('click', () => {
    const data = rgbShow.value;
    navigator.clipboard.writeText(data);
    copyfunc();
})

function copyfunc() {
    if (div !== null) {
        clearTimeout(timeout);
        div.remove();
        div = null;
    };
    timeout = setTimeout(() => {
        div.classList.remove('slide-in');
        div.classList.add('slide-out');
        div.addEventListener('animationend', function () {
            this.remove();
            div = null;
        })
    }, 5000);

    generateMsg();

}

function generateMsg() {
    div = document.createElement('div');
    div.classList.add('copyDone', 'slide-in');

    div.innerHTML = `<i class="fa-solid fa-circle-check"></i>
    <h2>Copied to clipboard</h2>`
    document.body.appendChild(div);

    div.addEventListener('click', function () {
        div.classList.remove('slide-in');
        div.classList.add('slide-out');
        div.addEventListener('animationend', function () {
            this.remove();
        })
    })
}

function hexToRgb(hex) {
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return `rgb(${r},${g},${b})`;
}

input.addEventListener('keyup', function (e) {

    const colors = e.target.value;

    copyBtn.disabled = true;
    if (colors) {
        input.value = colors.toLowerCase();
    }
    if (colors && hexValid('#' + colors)) {
        copyBtn.disabled = false;
        root.style.backgroundColor = '#' + colors;
        rgbShow.value = hexToRgb(colors);
    }

});

function hexValid(color) {
    if (color.length !== 7) return false;
    if (color[0] !== '#') return false;

    color = color.substring(1);
    return /^[0-9A-Fa-f]{6}$/i.test(color);
}
