let selectedSeat = null;

// Generate seats when page loads
document.addEventListener('DOMContentLoaded', function() {
    generateSeats();
    
    // Check for any previously booked seats from localStorage
    loadBookedSeats();
});
let selectedSeat = null;

function selectSeat(seat) {
    if (seat.classList.contains("booked")) {
        alert("Seat already booked!");
        return;
    }

    selectedSeat = seat;
    document.getElementById("form-section").style.display = "block";
}

document.getElementById("bookingForm").addEventListener("submit", function(e) {
    e.preventDefault();

    // Show confirmation popup
    alert("✅ Booking Confirmed!");

    // Change seat color to booked
    selectedSeat.classList.add("booked");

    // Hide form
    document.getElementById("form-section").style.display = "none";

    // Reset form
    this.reset();
});
function generateSeats() {
    const seatsContainer = document.getElementById('seatsContainer');
    const totalSeats = 20; // 5 rows x 4 columns
    
    for (let i = 1; i <= totalSeats; i++) {
        const seat = document.createElement('div');
        seat.className = 'seat';
        seat.id = `seat-${i}`;
        seat.textContent = i;
        seat.onclick = function() { selectSeat(this); };
        seatsContainer.appendChild(seat);
    }
}

function loadBookedSeats() {
    // Get booked seats from localStorage
    const bookedSeats = JSON.parse(localStorage.getItem('bookedSeats')) || [];
    
    bookedSeats.forEach(seatId => {
        const seat = document.getElementById(seatId);
        if (seat) {
            seat.classList.add('booked');
        }
    });
}

function selectSeat(seat) {
    // Check if seat is already booked
    if (seat.classList.contains('booked')) {
        alert('This seat is already booked! Please select another seat.');
        return;
    }
    
    // Remove selected class from previously selected seat
    if (selectedSeat) {
        selectedSeat.classList.remove('selected');
    }
    
    // Add selected class to new seat
    seat.classList.add('selected');
    selectedSeat = seat;
    
    // Show the booking form
    document.getElementById('form-section').style.display = 'block';
    
    // Scroll to form smoothly
    document.getElementById('form-section').scrollIntoView({ behavior: 'smooth' });
}

function cancelBooking() {
    // Hide form
    document.getElementById('form-section').style.display = 'none';
    
    // Remove selected class from seat
    if (selectedSeat) {
        selectedSeat.classList.remove('selected');
        selectedSeat = null;
    }
    
    // Reset form
    document.getElementById('bookingForm').reset();
}

// Handle form submission
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Check if a seat is selected
    if (!selectedSeat) {
        alert('Please select a seat first!');
        return;
    }
    
    // Get form data
    const passengerName = document.getElementById('name').value;
    const seatNumber = selectedSeat.textContent;
    const busName = document.getElementById('busSelect').options[document.getElementById('busSelect').selectedIndex].text;
    
    // Show confirmation popup with details
    alert(`✅ Booking Confirmed!\n\nPassenger: ${passengerName}\nSeat Number: ${seatNumber}\nBus: ${busName}\n\nThank you for booking with us!`);
    
    // Mark seat as booked
    selectedSeat.classList.remove('selected');
    selectedSeat.classList.add('booked');
    
    // Save to localStorage
    saveBookedSeat(selectedSeat.id);
    
    // Hide form
    document.getElementById('form-section').style.display = 'none';
    
    // Reset form
    this.reset();
    
    // Clear selected seat
    selectedSeat = null;
});

function saveBookedSeat(seatId) {
    // Get existing booked seats from localStorage
    let bookedSeats = JSON.parse(localStorage.getItem('bookedSeats')) || [];
    
    // Add new booked seat if not already in list
    if (!bookedSeats.includes(seatId)) {
        bookedSeats.push(seatId);
    }
    
    // Save back to localStorage
    localStorage.setItem('bookedSeats', JSON.stringify(bookedSeats));
}

// Add bus change handler
document.getElementById('busSelect').addEventListener('change', function() {
    // Clear selection when bus changes
    if (selectedSeat) {
        selectedSeat.classList.remove('selected');
        selectedSeat = null;
    }
    
    // Hide form
    document.getElementById('form-section').style.display = 'none';
    
    // Reset form
    document.getElementById('bookingForm').reset();
    
    // Show message
    alert(`Switched to ${this.options[this.selectedIndex].text}`);
});

// Phone number validation
document.getElementById('phone').addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
});

// Email validation on input
document.getElementById('email').addEventListener('input', function(e) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.value && !emailPattern.test(this.value)) {
        this.style.borderColor = '#e74c3c';
    } else {
        this.style.borderColor = '#2ecc71';
    }
});

// Add window load animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
});
