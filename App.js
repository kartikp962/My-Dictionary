const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const searchBtn = document.querySelector("#search-btn");
const searchInput = document.querySelector("#search-input");
const wordHeader = document.querySelector("#word-header");
const wordDefinition = document.querySelector("#word-definition");
const historyList = document.querySelector("#history-list");
const clearHistoryBtn = document.querySelector("#clear-history-btn");

let searchHistory = [];

searchBtn.addEventListener("click", async () => {
  const searchTerm = searchInput.value;

  if (!searchTerm) {
    return;
  }

  const response = await fetch(API_URL + searchTerm);
  const data = await response.json();

  if (data.length === 0) {
    wordHeader.textContent = "Word not found";
    wordDefinition.textContent = "";
    return;
  }

  const definition = data[0].meanings[0].definitions[0].definition;
  wordHeader.textContent = searchTerm;
  wordDefinition.textContent = definition;

  searchHistory.push(searchTerm);
  renderSearchHistory();
});

const renderSearchHistory = () => {
  historyList.innerHTML = "";

  searchHistory.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    historyList.appendChild(listItem);
  });
};

clearHistoryBtn.addEventListener("click", () => {
  searchHistory = [];
  renderSearchHistory();
});


