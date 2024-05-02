const apiKey = "7dfdcad63aa34f9cafac2aa743454da0";
const cardContain = document.getElementById("card-contain");
const searchField = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");



async function fetchRandomNews() {
  try {
    // const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`;
    const apiUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=10&apiKey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.log("Error fetching random news", error);
    return [];
  }
}

searchBtn.addEventListener('click',async ()=>{
    const query = searchField.value.trim();
    if(query !==""){
        try{
            const article = await fetchNewsQuery(query)
            displaycard(article)
        }catch(error){
            console.log("Error fetching news by query",error);
        }
    }
})
async function fetchNewsQuery(query){
    try {
        // const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`;
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
      } catch (error) {
        console.log("Error fetching random news", error);
        return [];
      }
}

function displaycard(articles) {
  cardContain.innerHTML = "";
  articles.forEach((articles) => {
    const boxCard = document.createElement("div");
    boxCard.classList.add("box-card");
    const img = document.createElement("img");
    img.src = articles.urlToImage;
    img.alt = articles.title;
    const title = document.createElement("h2");
    // title.textContent = articles.title;
    // in this case I create varaible name truncatedTitle to make title like this (...)
    const truncatedTitle =
      articles.title.length > 30
        ? articles.title.slice(0, 30) + "...."
        : articles.title;
    title.textContent = truncatedTitle;

    const description = document.createElement("p");
    const truncatedDes =
      articles.description.length > 120
        ? articles.description.slice(0, 120) + "...."
        : articles.description;
    description.textContent = truncatedDes;
    // description.textContent = articles.description;

    boxCard.appendChild(img);
    boxCard.appendChild(title);
    boxCard.appendChild(description);
    boxCard.addEventListener('click',()=>{
        window.open(articles.url,"_blank");
    })
    cardContain.appendChild(boxCard);
  });
}
(async () => {
  try {
    const articles = await fetchRandomNews();
    displaycard(articles);
    console.log(articles);
  } catch (error) {
    console.log("Error fetching random news", error);
  }
})();
