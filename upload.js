const uploadPrev = document.querySelector('.preview')
uploadBtn = document.querySelector('.uploadBtn')
uploadingFile = document.getElementById('uploading')

uploadBtn.addEventListener('click', function () {
    uploadingFile.click()
})
uploadingFile.addEventListener('change', function (e) {
    const file = e.target.files[0]
    const imgUrl = URL.createObjectURL(file)
    uploadPrev.style.background = `url(${imgUrl})`
    document.body.style.background = `url(${imgUrl})`
})