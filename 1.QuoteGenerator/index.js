import quotes from './quotes.js';


const twitterButton = document.getElementById("tweet-quote");
const onlineQuoteButton = document.getElementById("new-quote-on");
function newQuotes() {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById("text").innerHTML = quote.text;
    document.getElementById("author").innerHTML = "- " + quote.author;
}

// Expose the function to global scope for HTML onclick
window.newQuotes = newQuotes;
function tweetQuote() {
    const text = document.getElementById("text").innerText;
    const author = document.getElementById("author").innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text + " " + author)}`;
    window.open(twitterUrl, "_blank");
}
twitterButton.addEventListener("click", tweetQuote);

const proxyapi= "https://cors-anywhere.herokuapp.com/"; // Proxy API to bypass CORS issues
// Expose the function to global scope for HTML onclick
async function getQuote() {
    const apiUrl = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    try {
        const response = await fetch(proxyapi+apiUrl );
        const data = await response.json();
        const quoteText = data.quoteText || "No quote available";
        const quoteAuthor = data.quoteAuthor || "Unknown";
        document.getElementById("text").innerHTML = quoteText;
        document.getElementById("author").innerHTML = "- " + quoteAuthor;
    } catch (error) {
        getQuote(); // Retry fetching a new quote
        console.error("Error fetching the quote:", error);
        document.getElementById("text").innerHTML = "An error occurred while fetching the quote.";
        document.getElementById("author").innerHTML = "";
    }
}
onlineQuoteButton.addEventListener("click", getQuote);