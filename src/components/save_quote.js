export default function quoteSavedButton(id, savedQuotes, bookmark, bookmarkSaved, already_saved=false) {
    // const bookmark = document.querySelector("[data-bookmark]")
    // const bookmarkSaved = document.querySelector("[data-bookmark-saved]")
    // console.log(bookmark)
    // console.log(bookmarkSaved)
    
    if (already_saved) {

    }
    
    if (bookmark.classList.contains("hidden")) {
        console.log(bookmark, bookmarkSaved)
        console.log(`bookmark is saved`, id)
        bookmark.classList.toggle("hidden");
        bookmarkSaved.classList.toggle("hidden");
        const index = savedQuotes.indexOf(id);
        if (index !== -1) {
            savedQuotes.splice(index, 1);
        }
    } else {
        console.log(`bookmark is not saved`, id)
        bookmark.classList.toggle("hidden");
        bookmarkSaved.classList.toggle("hidden");
        savedQuotes.push(id)
    }

    window.localStorage.setItem("saved-quotes", JSON.stringify(savedQuotes));
}
