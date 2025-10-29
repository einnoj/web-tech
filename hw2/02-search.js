// Add your code here

const userInput = document.getElementById('userInput');
const searchButton = document.getElementById('search');
const resultsDiv = document.getElementById('results');
const template = document.getElementById('resultCard');

userInput.addEventListener('click', handleClick);
searchButton.addEventListener('click', handleSearch);

// Enter key behaves the same way as clicking the search button
userInput.addEventListener('keydown', (event) =>    {
    if (event.key === 'Enter') {
        handleSearch();
    }
});

// One the user clicks the input field section, the content is cleared
function handleClick() {
    userInput.value = '';
    
}

// highlight the word that matches the search term
function highlightText(text, term) {
    // using regular expressions to the text that matches the term
    // used Google AI overview to search how regular expressions can be used in JavaScript
    const regex = new RegExp(`(${term})`, "gi");
    return text.replace(regex, `<span style= "background-color: yellow;">$1</span>`);
}

function handleSearch() {
    const query = userInput.value.trim();
    // q will be used for case sensitive search
    const q = query.toLowerCase();

    // clears previous search results
    resultsDiv.innerHTML = "";

    // if the user presses enter key or clicks search button while the input field is empty, show this message
    if (!q) {
        resultsDiv.innerHTML = '<p class="text-danger text-center m-0">Please enter a search term.</p>';
        clearResults();
        return;
    }

    // filter the characters based on the search query
    
    // by default, set characterArray to an empty array
    let characterArray = [];

    // if characters is an array, filter it
    if(Array.isArray(characters)) {
        characterArray = characters.filter(character => {
            // check if character.name exists to avoid errors
            if(!character.name) return false;
            // return true if the character name matches the input
            return character.name.toLowerCase().includes(q);
        }); 

    }

    // if no matching characters found, show this message
    if (characterArray.length === 0) {
        resultsDiv.innerHTML ='<p class="text-warning text-center m-0">No matching characters found.</p>';
        return;
    }

    // display the filtered characters
    characterArray.forEach((character) => {
        const node = template.content.cloneNode(true);
        node.querySelector(".card-title").innerHTML = highlightText(character.name, query);
        node.querySelector(".card-text").textContent = `Birth Year: ${character.birth_year}`;
        resultsDiv.appendChild(node);
    });

    resultsDiv.className = "d-flex flex-wrap justify-content-center gap-3 mt-3 text-start";
}