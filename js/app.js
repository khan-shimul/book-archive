//  found result
const ResultFound = (id, property) => {
    const noResult = document.getElementById(id)
    noResult.style.display = property;
};
// even listner
document.getElementById('button').addEventListener('click', async () => {
    const inputField = document.getElementById('input-field');
    const inputText = inputField.value;
    inputField.value = '';

    ResultFound('result', 'none')
    ResultFound('total-search-value', 'none')

    const displayContainer = document.getElementById('displaybook')
    displayContainer.textContent = '';

    // empty input
    if (inputText === '') {
        alert('Please give a book name')
        return;
    };
    ResultFound('spiners', 'block')
    try {
        const url = `https://openlibrary.org/search.json?q=${inputText}`;
        const res = await fetch(url);
        const data = await res.json();
        // show the total found
        const resultQuantity = document.getElementById('total');
        resultQuantity.innerText = data.numFound;

        displayInformation(data.docs)

    } catch (er) {
        // hide spinner
        ResultFound('spiners', 'none')
    }
});
// display info
const displayInformation = (booksData) => {
    console.log(booksData.length);
    if (booksData.length == 0 || booksData === null) {
        // no result
        ResultFound('result', 'block');
        // remove spiners
        ResultFound('spiners', 'none')

    } else {
        // hide no result messege
        ResultFound('result', 'none')
    }

    // total search value
    ResultFound('total-search-value', 'block')

    const displayContainer = document.getElementById('displaybook')
    displayContainer.textContent = '';

    booksData.slice(0, 18).forEach(book => {
        const div = document.createElement('div');
        div.className = 'col mb-5';
        div.innerHTML = `
            <div class="text-center border-0 ">
            <img width="180" height="220" src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : ''}-M.jpg" class="mx-auto" alt="...">
            <div class="mt-2">
                <h5 class="card-title m-0 fw-bold text-primary fs-5">${book.title}</h5>
                <p class=" m-0 ">Author: ${book.author_name ? book.author_name[0] : 'Unknown author'}</p>
                <p class=" m-0">First Published: ${book.first_publish_year ? book.first_publish_year : 'Unknown Year'}</p>
                <p class=" m-0">Publisher: ${book.publisher[0] ? book.publisher[0] : 'Unknow publisher'}</p>
            </div>
            
            </div>`
        displayContainer.appendChild(div);
        // Remove spiners
        ResultFound('spiners', 'none')
    });
};