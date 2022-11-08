const form = document.querySelector('#search-form');
const list = document.querySelector('#list-of-shows');
const input = document.querySelector('#title-searched');


const getShows = async function (searchedText) {
    const result = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchedText}`);
    const shows = result.data;
    for (let el of shows) {
        const newLi = document.createElement('li');
        newLi.innerText = el.show.name;
        list.appendChild(newLi);
    }
    
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchedTitle = input.value;
    await getShows(searchedTitle);
})
