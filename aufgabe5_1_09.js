function getTheTitles(books) {
    return books.map(book => book.title);
  }
  
  const books = [
    {
      title: 'Book',
      author: 'Name'
    },
    {
      title: 'Book2',
      author: 'Name2'
    }
  ];
  
  console.log(getTheTitles(books)); // gibt ['Book', 'Book2'] aus
  