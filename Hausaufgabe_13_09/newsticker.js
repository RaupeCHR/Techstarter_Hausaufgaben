document.addEventListener("DOMContentLoaded", function() {
    var categorySelect = document.getElementById("category");
    var newsList = document.getElementById("newsList");
  
    function fetchNews(category) {
      var apiKey = "YOUR_API_KEY"; // Replace with your API key
      var url = "https://newsapi.org/v2/top-headlines?category=" + category + "&apiKey=" + apiKey;
  
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
          displayNews(response.articles);
        }
      };
      xhr.open('GET', url, true);
      xhr.send();
    }
  
    function displayNews(articles) {
      newsList.innerHTML = "";
      articles.forEach(function(article) {
        var li = document.createElement("li");
        var title = document.createElement("h2");
        title.textContent = article.title;
        var description = document.createElement("p");
        description.textContent = article.description;
        var link = document.createElement("a");
        link.href = article.url;
        link.textContent = "Weiterlesen";
  
        li.appendChild(title);
        li.appendChild(description);
        li.appendChild(link);
        newsList.appendChild(li);
      });
    }
  
    function updateNews() {
      var category = categorySelect.value;
      fetchNews(category);
    }
  
    categorySelect.addEventListener("change", updateNews);
  
    // Initial news fetch
    updateNews();
  
    // Automatic update every 30 seconds
    setInterval(updateNews, 30000);
  });
  