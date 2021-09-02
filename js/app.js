const searchBooks = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';

    const url = `http://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data))
};

const displayBooks = data => {
    const foundResult = data.numFound;
    const books = data.docs;
    // show the search result length
    // console.log(books)
    const searchResultContainer = document.getElementById('search-result')
    searchResultContainer.textContent = '';
    const searchResultDiv = document.createElement('div');
    searchResultDiv.classList.add('bg-secondary', 'text-white', 'text-center', 'w-25', 'mx-auto', 'p-2', 'mb-4')
    searchResultDiv.innerHTML = `
        <h6>Search Result Found: ${foundResult}</h6>
    `;
    searchResultContainer.appendChild(searchResultDiv)


    const booksContainer = document.getElementById('books-container');
    booksContainer.textContent = '';
    books?.forEach(book => {
        // console.log(book)
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
            <div class="card h-100">
            <img style= "height:300px" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="Cover image">
            <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <p class="card-text">Author Name: ${book.author_name ? book.author_name[0] : 'not available'}</p>
            <p class="card-text">1st Published: ${book.first_publish_year ? book.first_publish_year : ''}</p>
            </div>
        </div>
        
        `;
        booksContainer.appendChild(div)

    })
}