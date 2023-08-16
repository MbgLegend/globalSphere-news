import { currentSearch } from '../script.js'

let API_KEY = "534eca936d87263c2e70c5e3754c9f6f"

const itemsPerPage = 25;
let currentPage = 1;

export function modifyCurrentPage(value) {
    currentPage = value
    getNews(currentSearch)
}

function sanitizeText(text) {
    if (text) {
        return text.replace(/<\/?h[1-6]>|<\/?table>|<\/?div>/g, '')
    }
    return ''
}

export async function getNews(search) {
    try {
        const response = await fetch(`https://gnews.io/api/v4/search?q=${search}&apikey=${API_KEY}`)
        const data = await response.json()
        let innerHTML = ''
        if (data.articles.length <= 0) {
            document.querySelector(".amount-of-results").style.color = "red"
        } else {
            document.querySelector(".amount-of-results").style.color = "green"
        }
        document.querySelector(".amount-of-results").textContent =  data.articles.length + " | " + currentPage

        const totalResults = data.articles.length;
        const totalPages = Math.ceil(totalResults / itemsPerPage)
        const startIndex = (currentPage - 1) * itemsPerPage
        const endIndex = Math.min(startIndex + itemsPerPage, totalResults)

        for (let i = startIndex; i < endIndex && i < data.articles.length; i++)  {
            const news = data.articles[i]

            if (news.image || news.image !== null && news.source.url && news.title && news.source.name && news.publishedAt && news.description) {
                innerHTML += `
                    <div class="container">
                        <img src="${news.image}">
                        <div>
                            <h1>
                                <a href="${news.source.url}">${sanitizeText(news.title)}</a>
                            </h1>
                            <span><p>${sanitizeText(news.author)}</p> | <p>${news.publishedAt}</p></span>
                            <p>${sanitizeText(news.description)}</p>
                        </div>
                    </div>
                `
            }
        }
        document.querySelector(".news .grid").innerHTML = innerHTML
        generatePaginationControls(totalPages)
    } catch {
        let fallback = "News"
        getNews(fallback)
    }
}

function generatePaginationControls(totalPages) {
    const pagination = document.querySelector(".pagination");
    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button")
        button.innerText = i
        pagination.appendChild(button)
        button.addEventListener("click", () => {
            changePage(button.innerText)
            window.scrollTo({ top: 200, behavior: 'smooth' })
        })
    }
}

function changePage(pageNumber) {
    currentPage = Number(pageNumber)
    getNews(currentSearch)
}
