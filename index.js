const myLibrary = [];

function Books(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pageNumber = pages;
    this.read = read;
    this.info = function(){
        return(this.name + " by " + this.author + ", " + this.pageNumber + " pages, " + this.read)
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book)
}

/////Create the books
const tolkien = new Books("The Hobbit", "J. R. R. Tolkien", 295, "have read")
addBookToLibrary(tolkien);

const suzanne = new Books("Gregor the Overlander", "Suzanne Collins", 336, "have read")
addBookToLibrary(suzanne);

const marcus = new Books("Meditations", "Marcus Aurelius", 256, "not read")
addBookToLibrary(marcus);




// Function to display the library in the table
function displayLibrary() {
    const libraryTableBody = document.getElementById('libraryTableBody');

    // Clear existing rows
    libraryTableBody.innerHTML = '';

    myLibrary.forEach((book, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.pageNumber}</td>
            <td class="read-toggle-container">
                <input type="checkbox" class="read-toggle" onclick="toggleReadStatus(${index})" ${book.read === 'have read' ? 'checked' : ''}>
                <label class="read-status-label">${book.read}</label>
            </td>
            <td><button class="delete-button" onclick="deleteBook(${index})">Delete</button></td>
        `;
        libraryTableBody.appendChild(row);
    });

    // Add a new row for the "New" button
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td><button class="new-button" onclick="addNewBookRow()">New</button></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    `;
    libraryTableBody.appendChild(newRow);
}





// Function to delete a book from the library
function deleteBook(index) {
    myLibrary.splice(index, 1);
    displayLibrary(); // Refresh the display after deletion
}

function addNewBookRow() {
    const libraryTableBody = document.getElementById('libraryTableBody');

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td><input type="text" id="newTitle"></td>
        <td><input type="text" id="newAuthor"></td>
        <td><input type="number" id="newPages"></td>
        <td class="read-toggle-container">
            <input type="checkbox" id="newReadToggle">
            <label class="read-status-label">not read</label>
        </td>
        <td><button class="check-button" onclick="addNewBook()">✔</button></td>
    `;

    // Add a change event listener to update the label content dynamically
    const newReadToggle = newRow.querySelector('#newReadToggle');
    const readStatusLabel = newRow.querySelector('.read-status-label');

    newReadToggle.addEventListener('change', function () {
        readStatusLabel.textContent = this.checked ? 'have read' : 'not read';
    });

    libraryTableBody.appendChild(newRow);
}

// Function to add a new book to the library
function addNewBook() {
    const newTitle = document.getElementById('newTitle').value;
    const newAuthor = document.getElementById('newAuthor').value;
    const newPages = document.getElementById('newPages').value;
    const newRead = document.getElementById('newReadToggle').checked ? 'have read' : 'not read';

    if (newTitle && newAuthor && newPages) {
        const newBook = new Books(newTitle, newAuthor, parseInt(newPages), newRead);
        addBookToLibrary(newBook);
        displayLibrary();
    } else {
        alert('Please fill in all fields for the new book.');
    }
}

function toggleReadStatus(index) {
    const checkbox = document.querySelectorAll('.read-toggle')[index];
    myLibrary[index].read = myLibrary[index].read === 'have read' ? 'not read' : 'have read';

    // Update the checkbox state after modifying the read status
    checkbox.checked = myLibrary[index].read === 'have read';

    displayLibrary(); // Refresh the display after toggling read status
}






// Run the displayLibrary function after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    displayLibrary();
});