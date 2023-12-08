// function searchBooks(event) {
//   event.preventDefault(); // Prevent the default form submission

//   const searchTerm = document.getElementById('searchTerm').value;
//   console.log('Search term:', searchTerm);

//   fetch(`/books/search?searchTerm=${searchTerm}`)
//     .then(response => response.json())
//     .then(data => {
//       console.log('Received search results:', data);

//       const bookList = document.getElementById('bookList');
//       bookList.innerHTML = '';

//       data.results.forEach(book => {
//         console.log('Book:', book);

//         const listItem = document.createElement('li');
//         listItem.className = 'm-2';





//         const dataUrl = `/images/${book._id}.${book.image.contentType.split('/')[1]}`;




//         listItem.innerHTML = `
//         <div class="card" style="height: 350px; width: 200px;">
//           <img src="${dataUrl}" alt="${book.title}" 
//             class="card-img-top" style="cursor: pointer; height: 70%; object-fit: cover;"
//             onclick="navigateToBookDetail('${book._id}')">
//           <div class="card-body" style="height: 30%; overflow-y: auto;">
//             <h5 class="card-title" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 10px;">
//               ${book.title}
//             </h5>
//             <p class="card-text" style="margin-bottom: 5px;">Price: $${book.price.toFixed(2)}</p>
//             ${book.quantity > 0 ? '<p class="card-text text-success">In Stock</p>' : '<p class="card-text text-danger">Out of Stock</p>'}
//           </div>
//         </div>
//       `;

//         bookList.appendChild(listItem);
//       });
//     })
//     .catch(error => console.error('Error fetching search results:', error));
// }
function searchBooks(event) {
  event.preventDefault(); // Prevent the default form submission

  const searchTerm = document.getElementById('searchTerm').value;
  console.log('Search term:', searchTerm);

  // Assuming you have a searchResults.html page to display the results
  window.location.href = `/searchResults.html?searchTerm=${searchTerm}`;
}
function navigateToBookDetail(bookId) {
  window.location.href = `/books/${bookId}`;
}

function logout() {
  fetch('/logout')
    .then(response => {
      if (response.ok) {
        // Update the UI to reflect that the user is now logged out
        document.querySelector('.d-flex1').innerHTML = `
                        <a href="/login" class="btn btn-outline-success mx-2">Login</a>

                    `;
        document.getElementById('logout-btn').style.display = 'none';
      } else {
        console.error('Error during logout:', response.statusText);
      }
    })
    .catch(error => console.error('Error during logout:', error));
}


window.onload = function () {

  fetchUserData();

}

function fetchUserData() {
  fetch('/dashboard')
    .then(response => response.json())
    .then(data => {
      console.log('User data:', data.userData.username);

      var app = document.getElementById('app');

      if (data.userData && data.userData.username) {
        // User is logged in
        app.innerHTML = '<button id="logout-btn" class="btn btn-outline-danger mx-2" onclick="logout()">Logout</button>';
      } else {
        // User is not logged in
        app.innerHTML = '<a href="/login" class="btn btn-outline-success mx-2">Login</a>';
      }
    })
    .catch(error => console.error('Error fetching user data:', error));
}
