let selectedSeat = null;

function selectSeat(seat) {
    if (seat.classList.contains("booked")) {
        alert("Seat already booked!");
        return;
    }

    // remove previous selection
    document.querySelectorAll(".seat").forEach(s => s.classList.remove("selected"));

    seat.classList.add("selected");
    selectedSeat = seat;

    document.getElementById("form-section").classList.remove("hidden");
}

document.getElementById("bookingForm").addEventListener("submit", function(e) {
    e.preventDefault();

    alert("🎉 Booking Confirmed!");

    selectedSeat.classList.remove("selected");
    selectedSeat.classList.add("booked");

    document.getElementById("form-section").classList.add("hidden");
    this.reset();
});
