function searchBooks(event) {
  event.preventDefault(); // Prevent the default form submission

  const searchTerm = document.getElementById('searchTerm').value;
  console.log('Search term:', searchTerm);

  fetch(`/books/search?searchTerm=${searchTerm}`)
    .then(response => response.json())
    .then(data => {
      console.log('Received search results:', data);

      const bookList = document.getElementById('bookList');
      bookList.innerHTML = '';

      data.results.forEach(book => {
        console.log('Book:', book);
        const listItem = document.createElement('li');
        listItem.className = 'm-2';
        listItem.innerHTML = `
                  <li class="m-2">
                    <div class="card" style="height: fit-content; width: fit-content;">
                      <img src="data:${book.image.contentType};base64,${book.image.data}" alt="${book.title}"
                        class="card-img-top" style="cursor: pointer; height: 150px;"
                        onclick="navigateToBookDetail('${book._id}')">
                      <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="card-text">Price: $${book.price.toFixed(2)}</p>
                        ${book.quantity > 0 ? '<p class="card-text text-success">In Stock</p>' : '<p class="card-text text-danger">Out of Stock</p>'}
                      </div>
                    </div>
                  </li>
                `;
        bookList.appendChild(listItem);
      });
    })
    .catch(error => console.error('Error fetching search results:', error));
}

