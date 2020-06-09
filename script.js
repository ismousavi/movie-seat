
// Elements
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movie = document.getElementById('movie');
let selectedSeats = [];



populateUI();


// Update count and total
function updateCountAndTotal() {
    // update selected seats
    selectedSeats = document.querySelectorAll('.row .seat.selected');


    // copy selected seats index to an array
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    // save selected seats to local storage
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    // update selected seats number
    count.innerText = selectedSeats.length;
    // update total price amount
    total.innerText = selectedSeats.length * +movie.value;

};

// Get data from local storage and populate UI
function populateUI() {

    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || 0;

    if (selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.includes(index)) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = JSON.parse(localStorage.getItem('selectedMovieIndex'));

    if (selectedMovieIndex !== null) {
        movie.selectedIndex = selectedMovieIndex;
    }

    updateCountAndTotal();
}



// track changing movie
movie.addEventListener('change', (e) => {
    // update total price amount
    total.innerText = selectedSeats.length * +movie.value;
    // save movie index to localStorage
    localStorage.setItem('selectedMovieIndex', JSON.stringify(e.target.selectedIndex));

});


// Add or Remove class selected to selected seat
container.addEventListener('click', (e) => {
    const clickedElement = e.target;

    // add or remove class selected
    if (clickedElement.classList.contains('seat')) {
        if (!clickedElement.classList.contains('occupied')) {
            clickedElement.classList.toggle('selected');
        }
    }

    updateCountAndTotal();
});
