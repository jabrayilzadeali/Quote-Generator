export default function fetchData(query, callback) {
    fetch(query)
        .then((response) => response.text())
        .then((data) => {
            callback(data)
        })
}
