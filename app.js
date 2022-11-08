const form = document.querySelector('#search-form');
const list = document.querySelector('#list-of-shows');
const input = document.querySelector('#title-searched');


const getShows = async function (searchedText) {
    const result = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchedText}`);
    const shows = result.data;
    for (let el of shows) {
        const newLi = document.createElement('li');
        newLi.append(el.show.name);
        list.appendChild(newLi);
        if (el.show.image) {
            const newImg = document.createElement('img');
            newImg.src = el.show.image.medium;
            list.appendChild(newImg);
        }
    }
    
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchedTitle = input.value;
    await getShows(searchedTitle);
})
