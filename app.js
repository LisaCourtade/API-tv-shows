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
            const newImg = document.createElement('div');
            newImg.innerHTML = '<div>' + el.show.name + '</div>';
            newImg.classList.add('li-image');
            newImg.classList.add('box-no-img');
            newImg.classList.add('show-name-li');
            newLi.appendChild(newImg);
            list.appendChild(newLi);
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
