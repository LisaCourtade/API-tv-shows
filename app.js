const form = document.querySelector('#search-form');
const imgBox = document.querySelector('#img-container');
const sumUpBox = document.querySelector('#summary-container');
const input = document.querySelector('#title-searched');


const getSingleShow = async function (searchedText) {
    try {
        const result = await axios.get(`https://api.tvmaze.com/singlesearch/shows?q=${searchedText}`);
        const show = result.data;
        // name of the show 
        const showName = show.name;
        const newName = document.createElement('h2');
        newName.append(showName);
        sumUpBox.appendChild(newName);
        // genres 
        const showGenres = show.genres;
        const newGenres = document.createElement('h3');
        newGenres.append(showGenres.join(", "));
        sumUpBox.appendChild(newGenres);
        // image
        if (show.image) {
            const newImg = document.createElement('img');
            newImg.src = show.image.medium;
            imgBox.appendChild(newImg);
        }
        getInfoShow(searchedText);
    } catch (e) {
        const newErr = document.createElement('p');
        newErr.append(`Sorry, no Tv Shows found for: ${searchedText}.`);
        imgBox.appendChild(newErr);
        console.log(e); 
    }
    

}



const getInfoShow = async function (searchedText) {
    try {
        const result = await axios.get(`https://api.tvmaze.com/singlesearch/shows?q=${searchedText}`);
        const show = result.data;
        console.log(result.data);
        // country of origin
        if (show.network) {
            const showCountry = show.network.country.name;
            const newCountry = document.createElement('h3');
            newCountry.append(showCountry);
            sumUpBox.appendChild(newCountry);
        }
        // To Add:
        // .network.name = name of channel or network
        // .network.premiered = date
        // .status = "Ended" or "Running"
        // ._links.ended = date
        // summary
        const showSummary = show.summary;
        const newSumup = document.createElement('p');
        newSumup.innerHTML = showSummary;
        sumUpBox.appendChild(newSumup);
        // rating
        if (show.rating.average !== null) {
            const showRating = show.rating.average;
            const newRating = document.createElement('h3');
            newRating.append(`Rating: ${showRating}`);
            sumUpBox.appendChild(newRating);
        }
    } catch (e) {
        const newP = document.createElement('p');
        newP.append(`No information found for ${searchedText}`);
        sumUpBox.appendChild(newP);
        console.log(e); 
    }
    

}

form.addEventListener('submit', async e => {
    e.preventDefault();
    if (imgBox.innerHTML || sumUpBox.innerHTML) {
        imgBox.innerHTML = '';
        sumUpBox.innerHTML = '';
    }
    const searchedTitle = input.value;
    await getSingleShow(searchedTitle);
})


