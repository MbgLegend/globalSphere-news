export const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show-after-animation")
        } else {
            entry.target.classList.remove("show-after-animation")
        }
    })
})