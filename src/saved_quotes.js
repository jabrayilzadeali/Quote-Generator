import fetch_data from "./components/fetch_data.js";
import get_saved_quotes_ids from "./components/get_saved_quotes_ids.js";
import slugify from "./components/slugify.js";
import save_quote from "./components/save_quote.js";
import { BASE_URL, BASE_IMG_URL } from "./components/constants.js"

const savedQuotesElement = document.querySelector("[data-saved-quotes]");
const modal = document.querySelector("[data-modal]");
const closeModalButton = document.querySelector("[data-close-modal]");
const undoButton = document.querySelector("[data-undo]");
let savedQuotesButtons;
let lastSavedQuoteId;
const size = 200;

let savedQuotes = get_saved_quotes_ids();
let lastElementIdRemovedFromSave = {

};


function updateSavedQuotes(id) {
    const quoteDiv = document.querySelector(`[data-id="${id}"]`).parentElement
    quoteDiv.classList.toggle("hidden")
    // quoteDiv.parentElement.toggle("hidden");
    // .parentElement.toggle("hidden");
    // container.classList.toggle("hidden");
}

function openModal() {
    modal.show()
}



function fetchDataOneByOneLogic(data) {
    data = JSON.parse(data);
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
    console.log(_id)

    let tagsStr = "";
    tags.forEach((tag) => {
        const slug = slugify(tag);
        tagsStr += `
                        <li class="bg-dark-blue p-0_3 rounded text-cyan-50 font-light">
                            <a class="bg-dark-blue" href="${BASE_URL}/quotes?tags=${slug}">${tag}</a>
                        </li>
                    `;
    });

    const quoteElement = `
                <div data-id=${_id} class="max-w-md border-left rounded m-1 pl-1">
                    <ul
                        data-tags
                        class="text-xs my-1 flex gap-0_5 text-light-blue-100"
                    >${tagsStr}</ul>
                    <h3 data-quote class="text-base font-bold">${content}</h3>
                    <div class="flex my-1 justify-between align-center gap-0_5">
                        <button data-save class="bg-transparent text-xl outline-none cursor-pointer border-none">
                            <i data-bookmark class="fa-regular fa-bookmark text-light-blue-400 hidden"></i>
                            <i data-bookmark-saved class="fa-solid fa-bookmark"></i>
                        </button>
                        <div class="flex align-center justify-end gap-0_5">
                            <img
                                data-author-img
                                src="${BASE_IMG_URL}/${size}/${authorSlug}.jpg"
                                class="w-2 rounded-full"
                                alt=""
                            />
                            <a
                                data-author
                                href="${BASE_URL}/quotes?author=${authorSlug}"
                                class="font-light text-light-blue-400"
                            >${author}</a>
                        </div>
                    </div>
                </div>
            `;

    const container = document.createElement("div");
    container.innerHTML = quoteElement;

    const saveButton = container.querySelector(`[data-save]`);

    saveButton.onclick = () => {
        lastElementIdRemovedFromSave = {
            id: _id,
            bookmark: saveButton.querySelector("[data-bookmark]"),
            bookmarkSaved: saveButton.querySelector("[data-bookmark-saved]")
        }

        openModal();
        save_quote(lastElementIdRemovedFromSave["id"], savedQuotes, lastElementIdRemovedFromSave["bookmark"], lastElementIdRemovedFromSave["bookmarkSaved"]);
        updateSavedQuotes(lastElementIdRemovedFromSave["id"]);
    };

    undoButton.onclick = (e) => {
        save_quote(lastElementIdRemovedFromSave["id"], savedQuotes, lastElementIdRemovedFromSave["bookmark"], lastElementIdRemovedFromSave["bookmarkSaved"]);
        updateSavedQuotes(lastElementIdRemovedFromSave["id"]);
        modal.close()
    }

    closeModalButton.onclick = () => {
        // save_quote(lastElementIdRemovedFromSave, savedQuotes, bookmark, bookmarkSaved);
        modal.close()
    }

    savedQuotesElement.appendChild(container);
}

function fetchDataOneByOne() {
    savedQuotes.forEach((savedQuoteId) => {
        fetch_data(`${BASE_URL}/quotes/${savedQuoteId}`, (data) => fetchDataOneByOneLogic(data))
    });
}

if (savedQuotes.length < 80) {
    fetchDataOneByOne();
}

const saveQuoteButton = () => {
    save_quote(id, sa);
};
