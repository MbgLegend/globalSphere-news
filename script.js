import { getNews, modifyCurrenPage } from './javaScript/getNews.js'
import { observer } from './javaScript/onScrollAnimation.js'
import { checkFormValidation, isValidEmail } from './javaScript/formValidation.js'

const searchIcon = document.getElementById("search-icon")
const searchbar = document.querySelector(".searchbar")
const navLinks = document.querySelectorAll(".navbar .content-holder a")
const searchInput = document.getElementById("search")
const submit = document.getElementById("submit")
const errorMessage = document.querySelector(".errorMessage")
const navMenu  = document.querySelector(".navbar .content-holder")
const openMenu = document.getElementById("menu")
const closeMenu = document.getElementById("close")
const elementsToAnimate = document.querySelectorAll(".hide-for-animation")
const settings = document.getElementById("settings")
const dropdownContent = document.querySelector(".navbar .dropdown .dropdown-content")
const newsletterEmail = document.getElementById("newsletterEmail")
const newsletterSubmit = document.getElementById("newsletterSubmit")
const newsletterErrorMessage = document.getElementById("newsletterErrorMessage")
const toggleButton = document.getElementById("toggle")
const colorScheme = localStorage.getItem("colorScheme")
const contactSubmit = document.getElementById("contactSubmit")
let search = 'News'

export { search as currentSearch }

// On scroll animations
elementsToAnimate.forEach((element) => observer.observe(element))

// Getting news
if (document.querySelector(".newsletter")) {
    window.onload = getNews(search)
}

// Navbar
function openNavBar() {
    navMenu.classList.add("active")
    closeSearchbar()
    closeDropdown()
}
function closeNavBar() {
    navMenu.classList.remove("active")
}

if (openMenu && closeMenu) {
    openMenu.onclick = openNavBar
    closeMenu.onclick = closeNavBar
    window.onscroll = closeNavBar
    closeMenu.onresize = closeNavBar
}

// Changing categories
function changeCategories(newSearch){
    modifyCurrenPage ( 1 )
    search = newSearch
    getNews(search)
}

// Search bar
function closeSearchbar() {
    searchbar.classList.remove("active")
}

function toggleSearchbar() {
    closeDropdown()
    searchbar.classList.toggle("active")
}

if (submit) {
    submit.addEventListener("click", () => {
        if (searchInput.value.length === 0) {
            errorMessage.style.display = "block"
        } else {
            navLinks.forEach(links => links.classList.remove("active"))
            errorMessage.style.display = "none"
            changeCategories(searchInput.value)
        }
    })
}

if (navLinks) {
    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const active = event.target
            navLinks.forEach(links => links.classList.remove("active"))
            active.classList.add("active")
    
            // changing categories
            const newSearch = active.getAttribute("data-category")
    
            changeCategories(newSearch)
        })
    })
}

if (searchIcon) {
    searchIcon.onclick = toggleSearchbar
    window.onresize = closeSearchbar
    window.onscroll = closeSearchbar
}

// Opening dropdown when settings icon is clicked
function toggleDropdown() {
    if (searchbar) {
        closeSearchbar()
    }
    dropdownContent.classList.toggle("active")
}
function closeDropdown() {
    dropdownContent.classList.remove("active")
}

if (settings) {
    settings.addEventListener("click",toggleDropdown)
    window.onload = closeDropdown
    window.onresize = closeDropdown
    window.onscroll = closeDropdown
}

// Color scheme toggle
if (toggleButton) {
    toggleButton.addEventListener("change", () => {
        if (toggleButton.checked) {
            document.documentElement.classList.add("active")
            localStorage.setItem("colorScheme", "dark")
        } else {
            document.documentElement.classList.remove("active")
            localStorage.setItem("colorScheme", "light")
        }
    })
}

window.onload = () => {
    if (colorScheme === "dark") {
        document.documentElement.classList.add("active")
        if (toggleButton) {
            toggleButton.checked = true
        }
    } 
    if (colorScheme === "light") {
        document.documentElement.classList.remove("active")
        if (toggleButton) {
            toggleButton.checked = false
        }
    }
    if (!colorScheme) {
        document.documentElement.classList.remove("active")
        localStorage.setItem("colorScheme", "light")
        if (toggleButton) {
            toggleButton.checked = false
        }
    }
}

// Contact form submit
if (contactSubmit) {
    contactSubmit.addEventListener("click", (event) => {
        event.preventDefault()
        checkFormValidation()
    })
}

// News letter submit
newsletterSubmit.addEventListener("click", () => {
    newsletterErrorMessage.style.display = "none"
    newsletterErrorMessage.textContent = ""

    if (newsletterEmail.value.length === 0) {
        newsletterErrorMessage.style.display = "block"
        newsletterErrorMessage.textContent = "Email input field is required!"

        setTimeout(() => {
            newsletterErrorMessage.style.display = "none"
            newsletterErrorMessage.textContent = ""
        }, 5000)
    } else {
        if (!isValidEmail(newsletterEmail.value)) {
            newsletterErrorMessage.style.display = "block"
            newsletterErrorMessage.textContent = "Email is invalid!"

            setTimeout(() => {
                newsletterErrorMessage.style.display = "none"
                newsletterErrorMessage.textContent = ""
            }, 5000)
        } else {
            newsletterErrorMessage.style.display = "block"
            newsletterErrorMessage.style.color = "green"
            newsletterErrorMessage.textContent = "Thank you for subscribing to our press releases!"

            setTimeout(() => {
                newsletterErrorMessage.style.display = "none"
                newsletterErrorMessage.style.color = "green"
                newsletterErrorMessage.textContent = ""
            }, 5000)
        }
    }
})