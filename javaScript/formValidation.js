const form = document.getElementById("form")
const nameInput = document.getElementById("name")
const email = document.getElementById("email")
const subject = document.getElementById("subject")
const message = document.getElementById("message")
const errorMessage = document.getElementById("errorMessage")

export function checkFormValidation() {
    errorMessage.style.display = "none"
    errorMessage.textContent = ""

    if (nameInput.value === "" || email.value === "" || subject.value === "" || message.value === "") {
        showErrorMessage("You must enter all input fields!")
    } else {
        if (!isValidEmail(email.value)) {
            showErrorMessage("Make sure email entered is a valid!")
        } else {
            showSuccessMessage()
            form.reset()
        }
    }
}

function showErrorMessage(message) {
    errorMessage.style.display = "block"
    errorMessage.textContent = message

    setTimeout(() => {
        errorMessage.style.display = "none"
        errorMessage.textContent = ""
    }, 5_000)
}

function showSuccessMessage() {
    errorMessage.style.display = "block"
    errorMessage.style.color = "green"
    errorMessage.textContent = "Thank you for contacting us!"

    setTimeout(() => {
        errorMessage.style.display = ""
        errorMessage.style.color = ""
        errorMessage.textContent = ""
    }, 5_000)
}

export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}