var editor = ace.edit("editor");
editor.setTheme("ace/theme/twilight");
editor.setShowInvisibles(true);
editor.getSession().setMode("ace/mode/javascript");


// const baseServerUrl = "http://localhost:8080"
const baseServerUrl = "https://code-checker-9mts.onrender.com"


const outputEl = document.getElementById("output")

const languageIn = document.getElementById("languageIn")
const convertBtn = document.getElementById("convertBtn")
const debugBtn = document.getElementById("debugBtn")
const qualityBtn = document.getElementById("qualityBtn")

convertBtn.addEventListener("click", (e) => {
    e.preventDefault()

    if (languageIn.value) {
        operation(`convert code to ${languageIn.value} language`)
    } else {
        alert("Please select programming language")
    }

})

debugBtn.addEventListener("click", (e) => {
    e.preventDefault()
    operation("debugging")
})

qualityBtn.addEventListener("click", (e) => {
    e.preventDefault()
    operation("quality check")
})


function operation(action) {

    let myobj = {
        query: action,
        code: editor.getValue(),
    }

    fetch(`${baseServerUrl}/query`, {
        method: "POST",
        body: JSON.stringify(myobj),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            data.response ? outputEl.innerHTML = `<h3>${data.response}</h3>` : outputEl.innerHTML = `<p>Something went wrong</p>`
        })
        .catch(err => {
            console.log(err)
        })
}