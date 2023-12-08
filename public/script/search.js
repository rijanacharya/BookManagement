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

        
        

        
        const dataUrl =`/images/${book._id}.${book.image.contentType.split('/')[1]}`;




        listItem.innerHTML = `
        <div class="card" style="height: 350px; width: 200px;">
          <img src="${dataUrl}" alt="${book.title}" 
            class="card-img-top" style="cursor: pointer; height: 70%; object-fit: cover;"
            onclick="navigateToBookDetail('${book._id}')">
          <div class="card-body" style="height: 30%; overflow-y: auto;">
            <h5 class="card-title" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 10px;">
              ${book.title}
            </h5>
            <p class="card-text" style="margin-bottom: 5px;">Price: $${book.price.toFixed(2)}</p>
            ${book.quantity > 0 ? '<p class="card-text text-success">In Stock</p>' : '<p class="card-text text-danger">Out of Stock</p>'}
          </div>
        </div>
      `;

        bookList.appendChild(listItem);
      });
    })
    .catch(error => console.error('Error fetching search results:', error));
}
