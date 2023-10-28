export default function savedQuotesIds() {
    if (window.localStorage.getItem("saved-quotes") !== null) {
        return JSON.parse(window.localStorage.getItem("saved-quotes"));
    }  
    return [];
}