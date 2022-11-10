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
        getImdb(showName);
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


const getImdb = async function (title) {
        const getId = await axios.get(`https://imdb-api.com/en/API/SearchSeries/k_4d794ka6/${title}`);
        const titleId = getId.data.results[0].id;
        const getRating = await axios.get(`https://imdb-api.com/en/API/Ratings/k_4d794ka6/${titleId}`);
        const ImdbRating = getRating.data.imDb;
        const newH3 = document.createElement('h3');
        newH3.append(`Imdb: ${ImdbRating}`);
        imgBox.appendChild(newH3);
}

