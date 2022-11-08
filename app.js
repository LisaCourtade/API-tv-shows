const form = document.querySelector('#search-form');
const container = document.querySelector('#show-container');
const input = document.querySelector('#title-searched');


const getSingleShow = async function (searchedText) {
    try {
        const result = await axios.get(`https://api.tvmaze.com/singlesearch/shows?q=${searchedText}`);
        const show = result.data;
        const showName = show.name;
        const newH2 = document.createElement('h2');
        newH2.append(showName);
        container.appendChild(newH2);
        const showGenres = show.genres;
        const newP = document.createElement('p');
        newP.append(showGenres.join(", "));
        container.appendChild(newP);
        if (show.image) {
            const newImg = document.createElement('img');
            newImg.src = show.image.medium;
            container.appendChild(newImg);
        }
    } catch {
        const newP = document.createElement('p');
        newP.append(`Sorry, no Tv Shows found for ${searchedText}`);
        container.appendChild(newP) 
    }
    

}

form.addEventListener('submit', async e => {
    e.preventDefault();
    if (container.innerHTML) {
        container.innerHTML = '';
    }
    const searchedTitle = input.value;
    await getSingleShow(searchedTitle);
})
