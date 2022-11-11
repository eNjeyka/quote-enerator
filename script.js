let api_quotes = [];
const API_URL = "https://type.fit/api/quotes";
const quote_container = document.getElementById("quote-container");
const quote_text = document.getElementById("quote");
const author_text = document.getElementById("author");
const twitter_btn = document.getElementById("twitter");
const new_quote_btn = document.getElementById("new-quote");

// получение списка цитат из API
async function getQuotes() {
    try {
        const response = await fetch(API_URL);
        api_quotes = await response.json();
        newQuote();
    } catch (error) {
        console.log(error)
    }
}

function newQuote() {
    let random_number = Math.floor(Math.random() * api_quotes.length);
    let quote = api_quotes[random_number];

    // указать неизвестного автора, если его нет в источнике
    if (!quote.author) {
        author_text.textContent = "Unknown";
    } else {
        author_text.textContent = quote.author;
    }

    // Уменьшить размер длинных цитат
    if (quote.text.length > 100) {
        quote_text.classList.add("long_quote");
    } else {
        quote_text.classList.remove("long_quote");
    }
    quote_text.textContent = quote.text;
}

// Добавление цитаты в Твиттер
function tweetQuote() {
    const TWITTER_URL = `https://twitter.com/intent/tweet?text=${quote_text.textContent} - ${author_text.textContent}`;
    window.open(TWITTER_URL, "_blank");
}

// Следующая цитата
new_quote_btn.addEventListener("click", newQuote);
twitter_btn.addEventListener("click", tweetQuote);

// Вызов функции на получение списка цитат
getQuotes();
