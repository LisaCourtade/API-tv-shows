const form = document.querySelector('#search-form');
const imgBox = document.querySelector('#img-container');
const SumupBox = document.querySelector('#summary-container');
const input = document.querySelector('#title-searched');


const getSingleShow = async function (searchedText) {
    try {
        const result = await axios.get(`https://api.tvmaze.com/singlesearch/shows?q=${searchedText}`);
        const show = result.data;
        const showName = show.name;
        const newH2 = document.createElement('h2');
        newH2.append(showName);
        imgBox.appendChild(newH2);
        const showGenres = show.genres;
        const newGenres = document.createElement('p');
        newGenres.append(showGenres.join(", "));
        imgBox.appendChild(newGenres);
        const showSummary = show.summary;
        SumupBox.innerHTML = showSummary;
        if (show.image) {
            const newImg = document.createElement('img');
            newImg.src = show.image.medium;
            imgBox.appendChild(newImg);
        }
    } catch (e) {
        const newP = document.createElement('p');
        newP.append(`Sorry, no Tv Shows found for ${searchedText}`);
        imgBox.appendChild(newP);
        console.log(e); 
    }
    

}

form.addEventListener('submit', async e => {
    e.preventDefault();
    if (imgBox.innerHTML) {
        imgBox.innerHTML = '';
    }
    const searchedTitle = input.value;
    await getSingleShow(searchedTitle);
})
