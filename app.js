const form = document.querySelector('#search-form');
const list = document.querySelector('#list-of-shows');
const input = document.querySelector('#title-searched');


const getShows = async function (searchedText) {
    const result = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchedText}`);
    const shows = result.data;
    for (let el of shows) {
        if (el.show.image) {
            const newLi = document.createElement('li');
            const newImg = document.createElement('img');
            newImg.src = el.show.image.medium;
            newImg.classList.add('li-image');
            newLi.appendChild(newImg);
            list.appendChild(newLi);
            newLi.classList.add('list-item');
        } else {
            const newLi = document.createElement('li');
            newLi.append(el.show.name);
            list.appendChild(newLi);
            const defaultImg = document.createElement('img');
            defaultImg.src = "/slashed-image.jpg";
            defaultImg.classList.add('li-image')
            list.appendChild(defaultImg);
            newLi.classList.add('list-item');
        }
    }
    
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (list.innerHTML) {
        list.innerHTML = '';
    }
    const searchedTitle = input.value;
    await getShows(searchedTitle);
})
