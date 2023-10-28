import fetch_data from "./components/fetch_data.js";
import { BASE_URL, BASE_IMG_URL } from "./components/constants.js"

const querString = new URLSearchParams(window.location.search)
// const querString = window.location.search
const authorSlug = querString.get("author")
fetch_data(`${BASE_URL}/quotes?author=${authorSlug}&limit=150`, (data) => {
    const mydata = JSON.parse(data)   
    console.log(mydata)
    // console.log(data["author"])
})
