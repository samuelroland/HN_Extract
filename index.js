document.addEventListener("DOMContentLoaded", init)

function init() {
    btnSearch.addEventListener("click", search)
    btnDetails.addEventListener("click", details)
}

function search() {
    //query = "https://hn.algolia.com/api/v1/items/25206182"
    query = "https://hn.algolia.com/api/v1/search?query=" + inpSearch.value.trim()
    sendRequest(query, displaySearchResult)
}

function details() {
    query = "http://hn.algolia.com/api/v1/users/" + inpDetails.value.trim()
    sendRequest(query, displayDetailsResult)

    //Posted stories
    query = "http://hn.algolia.com/api/v1/search?tags=story,author_" + inpDetails.value.trim()
    sendRequest(query, displayPostedStories)
}

function displaySearchResult(response) {
    listStories.innerText = ""
    Array.prototype.forEach.call(response.hits, function (comment) {
        element = document.createElement("li")
        element.innerHTML = comment.title + " (from " + comment.author + ") - " + comment.objectID
        listStories.appendChild(element)
    })
}

function displayDetailsResult(response) {
    listDetails.innerHTML = "<h3>About <strong>" + response.username + "</strong>:</h3> " + ((response.about == "") ? "Vide" : response.about)

}

function displayPostedStories(response) {
    listPostedStories.innerHTML = ""
    Array.prototype.forEach.call(response.hits, function (story) {
        element = document.createElement("li")
        element.innerHTML = story.title + " (from " + story.author + ") - " + story.objectID
        listPostedStories.appendChild(element)
    })
}

//Send a HTTP request (with an Ajax call):
function sendRequest(url, callback) {
    fetch(url)
        .then(function (response) {
            console.log(response)
            return response.text();
        })
        .then(function (response) {
            console.log(response)
            return JSON.parse(response)
        })
        .then(function (response) {
            console.log(response)
            callback(response)
        })

    //reqHttp.setRequestHeader("Content-Type", "application/json")   //set header content type as json data
    //reqHttp.setRequestHeader("Access-Control-Allow-Origin", "*")   //set header content type as json data

}
