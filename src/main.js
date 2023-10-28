import fetch_data from "./components/fetch_data.js";
import get_saved_quotes_ids from "./components/get_saved_quotes_ids.js";
import save_quote from "./components/save_quote.js";
import slugify from "./components/slugify.js";
import { BASE_URL, BASE_IMG_URL } from "./components/constants.js"

const quote = document.querySelector("[data-quote]");
const authorElement = document.querySelector("[data-author]");
const tagsElement = document.querySelector("[data-tags]");
const authorImg = document.querySelector("[data-author-img]");
const newQuoteElement = document.querySelector("[data-new-quote]");
const saveQuoteButton = document.querySelector("[data-save]");
const bookmark = saveQuoteButton.querySelector("[data-bookmark]");
const bookmarkSaved = saveQuoteButton.querySelector("[data-bookmark-saved]");
const size = 200;

let savedQuotes = get_saved_quotes_ids();

const query = BASE_URL + "/quotes/random"

function fetchLogic(data) {
    console.log('okay')
    data = JSON.parse(data)[0];
    console.table(data);
    const {
        _id,
        content,
        author,
        tags,
        authorSlug,
        length,
        dataAdded,
        dateModified,
    } = data;

    quote.textContent = content;
    authorElement.textContent = author;
    // authorElement.href = `${BASE_URL}/quotes?author=${authorSlug}`;
    authorElement.href = `author_page.html?author=${authorSlug}`;

    if (bookmark.classList.contains("hidden")) {
        bookmark.classList.toggle("hidden");
        bookmarkSaved.classList.toggle("hidden");
    }

    saveQuoteButton.onclick = () => {
        save_quote(_id, savedQuotes, bookmark, bookmarkSaved);
    }; // reset tags element first then add tags
    tagsElement.innerHTML = "";
    tags.forEach((tag) => {
        const slug = slugify(tag);
        // https://api.quotable.io/quotes?tags=technology
        tagsElement.innerHTML += `
        <li class="bg-dark-blue p-0_3 rounded text-cyan-50 font-light">
            <a class="bg-dark-blue text-" href="${BASE_URL}/quotes?tags=${slug}">${tag}</a>
        </li>
    `;
    });
    authorImg.src = `${BASE_IMG_URL}/${size}/${authorSlug}.jpg`;
}

// function fetchData(query) {
//     fetch(`${BASE_URL}/${query}`)
//         .then((response) => response.text())
//         .then((data) => {
//             data = JSON.parse(data)[0];
//             console.table(data);
//             const {
//                 _id,
//                 content,
//                 author,
//                 tags,
//                 authorSlug,
//                 length,
//                 dataAdded,
//                 dateModified,
//             } = data;

//             quote.textContent = content;
//             authorElement.textContent = author;
//             authorElement.href = `${BASE_URL}/quotes?author=${authorSlug}`;

//             if (bookmark.classList.contains("hidden")) {
//                 bookmark.classList.toggle("hidden");
//                 bookmarkSaved.classList.toggle("hidden");
//             }

//             saveQuoteButton.onclick = () => {
//                 save_quote(_id, savedQuotes, bookmark, bookmarkSaved);
//             }; // reset tags element first then add tags
//             tagsElement.innerHTML = "";
//             tags.forEach((tag) => {
//                 const slug = slugify(tag);
//                 // https://api.quotable.io/quotes?tags=technology
//                 tagsElement.innerHTML += `
//                     <li class="bg-dark-blue p-0_3 rounded text-cyan-50 font-light">
//                         <a class="bg-dark-blue text-" href="${BASE_URL}/quotes?tags=${slug}">${tag}</a>
//                     </li>
//                 `;
//             });
//             authorImg.src = `${BASE_IMG_URL}/${size}/${authorSlug}.jpg`;
//         });
// }

newQuoteElement.onclick = () => fetch_data(query, (data) => fetchLogic(data));

// fetchData("quotes/random");
fetch_data(query, (data) => fetchLogic(data))
