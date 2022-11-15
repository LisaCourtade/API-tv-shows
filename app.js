const form = document.querySelector('#search-form');
const imgBox = document.querySelector('#img-container');
const sumUpBox = document.querySelector('#summary-container');
const input = document.querySelector('#title-searched');


const getSingleShow = async function (searchedText) {
    try {
        const result = await axios.get(`https://api.tvmaze.com/singlesearch/shows?q=${searchedText}`);
        const show = result.data;
        // name of the show 
        const showName = show.name.toUpperCase();
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
        // channel or network
        if (show.network) {
            // country of origin
            const showCountry = show.network.country.name;
            const showNetwork = show.network.name;
            const newCountry = document.createElement('h4');
            newCountry.append(`${showCountry} - Network: ${showNetwork}`);
            sumUpBox.appendChild(newCountry);
        }
        if (show.webChannel) {
            const showNetwork = show.webChannel.name;
            const newNetwork = document.createElement('h4');
            newNetwork.append(`Network: ${showNetwork}`);
            sumUpBox.appendChild(newNetwork);
        }
        // Dates
        const newDates = document.createElement('h4');
        // premiere
        const showPremiere = show.premiered;
        const newPremiere = document.createElement('span');
        newPremiere.append(`First episode date: ${showPremiere} `);
        newDates.appendChild(newPremiere);
        // end
        if (show.ended) {
            const showEnd = show.ended;
            const newEnd = document.createElement('span');
            newEnd.append(`- Last episode date: ${showEnd}`);
            newDates.appendChild(newEnd);
        } else {
            const newEnd = document.createElement('span');
            newEnd.append(`- Show still running`);
            newDates.appendChild(newEnd);
        }
        sumUpBox.appendChild(newDates);
        // summary
        const showSummary = show.summary;
        const newSumup = document.createElement('p');
        newSumup.classList.add('summary');
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
        const newErr = document.createElement('p');
        newErr.append(`No information found for ${searchedText}`);
        sumUpBox.appendChild(newErr);
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


