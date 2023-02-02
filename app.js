'use strict';

// globals

// Array to store all store objects
let allStores = [];
let hourlyTotal = [];
// cities
let seattle = new City('seattle', 23, 65, 6.3);
let tokyo = new City('tokyo', 3, 24, 1.2);
let dubai = new City('dubai', 11, 38, 3.7);
let paris = new City('paris', 20, 38, 2.3);
let lima = new City('lima', 2, 16, 4.6);
// push cities to array
allStores.push(seattle, tokyo, dubai, paris, lima);

// Hours that stores are open

let hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

// dom window very important

let cities = document.getElementById('cities');

let cityTableBody = document.querySelector('tbody');

let cityTableHead = document.querySelector('thead');

let cityTableFoot = document.querySelector('tfoot');

// function used to get data

function randomCustomer(min, max) {
  return Math.floor((Math.random() * (max - min + 1) + min));
}

function renderAll() {
  for (let i = 0; i < allStores.length; i++) {
    allStores[i].getCookiesSold();
    allStores[i].render();
  }
}

function tableHeader() {
  let row1 = document.createElement('tr');
  cityTableHead.appendChild(row1);
  let cityHead = document.createElement('th');
  cityHead.innerText = 'City Name';
  row1.appendChild(cityHead);
  for (let i = 0; i < hours.length; i++) {
    let thElem = document.createElement('th');
    thElem.innerText = hours[i];
    row1.appendChild(thElem);
  }
  let totalLocation = document.createElement('th');
  totalLocation.innerText = 'Daily Location Total';
  row1.appendChild(totalLocation);

}

function tableFooter() {
  let footer = document.createElement('tr');
  footer.innerText = 'Totals Per Hour';
  footer.id = 'tableFooter';
  cityTableFoot.appendChild(footer);
  for (let i = 0; i < hourlyTotal.length; i++) {
    let thElem = document.createElement('th');
    thElem.innerText = hourlyTotal[i];
    footer.appendChild(thElem);
  }
  let grandTotal = 0;
  for (let i = 0; i < hourlyTotal.length; i++) {
    grandTotal = hourlyTotal[i] + grandTotal;
  }
  let thElem = document.createElement('th');
  thElem.innerText = 'Grand Total is: ' + grandTotal;
  footer.appendChild(thElem);
}

function totalPerHour(randomNumber, i) {
  hourlyTotal[i] += randomNumber;
}
// Constructor Function

function City(name, minCustomer, maxCustomer, averageCookie) {

  this.name = name;
  this.minCustomer = minCustomer;
  this.maxCustomer = maxCustomer;
  this.averageCookie = averageCookie;
  this.cookiesSold = [];
}

// prototype method, we are adding methods to all instances of city.

City.prototype.getCookiesSold = function () {
  let totalCookies = 0;
  let ranNum = 0;
  for (let i = 0; i < hours.length; i++) {
    ranNum = Math.floor(randomCustomer(this.minCustomer, this.maxCustomer) * this.averageCookie);
    this.cookiesSold.push(ranNum);
    totalCookies = ranNum + totalCookies;
    totalPerHour(ranNum, i);

    if (i === hours.length - 1) {
      this.cookiesSold.push(`Total: ${totalCookies}`);
    }
  }
};

City.prototype.render = function () {
  let row2 = document.createElement('tr');
  cityTableBody.appendChild(row2);
  let cityName = document.createElement('td');
  cityName.innerText = this.name;
  row2.appendChild(cityName);

  for (let i = 0; i < this.cookiesSold.length; i++) {
    let tdElement = document.createElement('td');
    tdElement.innerText = this.cookiesSold[i];
    row2.appendChild(tdElement);
  }
};

function handleSubmit(event) {
  event.preventDefault();

  let cityName = event.target.cityName.value;
  let minCustomer = event.target.minCustomer.value;
  let maxCustomer = event.target.maxCustomer.value;
  let averageCookie = event.target.averageCookie.value;

  let newCity = new City(cityName, minCustomer, maxCustomer, averageCookie);

  allStores.push(newCity);
  newCity.getCookiesSold();
  newCity.render();
  document.getElementById('tableFooter').remove();
  tableFooter();
}

// call functions

tableHeader();
hourlyTotal = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
renderAll();
tableFooter();
// interface sets up a function that will be called whenever the specified event is delivered to the target.
cities.addEventListener('submit', handleSubmit);
