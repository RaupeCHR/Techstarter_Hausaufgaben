const categorySelect = document.getElementById('category-select');
        const newsContainer = document.getElementById('news-container');

        function getNews(category) {
            const apiKey = 'f5a84794114e4ea3b683bcc77aa94f4d'; // Ersetze dies durch deinen API-Schlüssel (z.B. NewsAPI)
            const apiUrl = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}`;

            // AJAX-Anfrage mit XMLHttpRequest
            const xhr = new XMLHttpRequest();
            xhr.open('GET', apiUrl, true);

            xhr.onload = function () {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);

                    // Nachrichtenliste leeren
                    newsContainer.innerHTML = '';

                    // Nachrichten durchlaufen und anzeigen
                    response.articles.forEach(article => {
                        const newsItem = document.createElement('div');
                        newsItem.classList.add('news-item');

                        const title = document.createElement('h2');
                        title.textContent = article.title;

                        const description = document.createElement('p');
                        description.textContent = article.description;

                        const link = document.createElement('a');
                        link.href = article.url;
                        link.textContent = 'Lesen Sie mehr';

                        newsItem.appendChild(title);
                        newsItem.appendChild(description);
                        newsItem.appendChild(link);

                        newsContainer.appendChild(newsItem);
                    });
                } else {
                    console.log(xhr.status)
                    console.error('Fehler beim Abrufen der Nachrichten:', xhr.status, xhr.statusText);
                }
            };

            xhr.onerror = function () {
                console.error('Fehler beim Netzwerkzugriff');
            };

            xhr.send();
        }

        // Nachrichten für die ausgewählte Kategorie abrufen und anzeigen
        getNews(categorySelect.value);

        // Alle 30 Sekunden Nachrichten aktualisieren
        setInterval(() => {
            getNews(categorySelect.value);
        }, 30000);

        // Kategorie ändern
        categorySelect.addEventListener('change', function () {
            getNews(categorySelect.value);
        });