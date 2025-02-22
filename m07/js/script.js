// Hotel Constructor Function
function Hotel(name, rooms, booked){
    this.name = name;
    this.rooms = rooms;
    this.booked = booked;
    this.checkAvailability = function (){
        return this.rooms - this.booked;
    };
}

// Creating Hotel Objects
var quayHotel = new Hotel("Quay", 40, 25);
var parkHotel = new Hotel("Park", 120, 77);
var sunsetHotel = new Hotel("sunset", 86, 10); // new Hotel

// Selecting the HTML elements
document.getElementById("hotel1").innerHTML = `<p>${quayHotel.name} rooms: <span>${quayHotel.checkAvailability()}</span></p>`;
document.getElementById("hotel2").innerHTML = `<p>${parkHotel.name} rooms: <span>${parkHotel.checkAvailability()}</span></p>`;

// Adding Sunset hotel dynamically with matching formatting
var hotel3Div = document.getElementById("hotel3");
hotel3Div.innerHTML = `<p>${sunsetHotel.name} rooms: <span>${sunsetHotel.checkAvailability()}</span></p>`;
hotel3Div.classList.add("highlight-hotel"); // Apply the special style