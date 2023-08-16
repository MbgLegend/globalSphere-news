import { currentSearch } from '../script.js'

let API_KEY = "cc3eb8ce841b41e3bd90718e90e211f5";

// fallback if one API key does gets rate limited
if (API_KEY === "cc3eb8ce841b41e3bd90718e90e211f5" && "83281ac5ff874957aa8b80cb8ec979f1") {
    API_KEY = "83281ac5ff874957aa8b80cb8ec979f1";
}
const itemsPerPage = 25
export let currentPage = 1

export function modifyCurrenPage( value ) { currentPage = value }

function sanitizeText(text) {
    if (text) {
        return text.replace(/<\/?h[1-6]>|<\/?table>|<\/?div>/g, '');
    }
    return '';
}

export async function getNews(search) {
    try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=${search}&from=2023-08-11&to=2023-08-11&sortBy=popularity&apiKey=${API_KEY}`)
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

        for (let i = startIndex; i < endIndex && data.articles.length; i++) {
            const news = data.articles[i]

            if (news.urlToImage || news.urlToImage !== null && news.url && news.title && news.author && news.publishedAt && news.description) {
                innerHTML += `
                    <div class="container">
                        <img src="${news.urlToImage}">
                        <div>
                            <h1>
                                <a href="${news.url}">${sanitizeText(news.title)}</a>
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