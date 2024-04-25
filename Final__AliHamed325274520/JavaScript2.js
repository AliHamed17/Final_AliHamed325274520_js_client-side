function populateTable(flight) {

    const tableBody = document.getElementById('flightsTable');
    let rows = '';
    highlight = "#8888FF"
    for (let i = 0; i < jsonFlights.length; i++) {
        let flight = jsonFlights[i];
        let icon, color;
        if (flight.type === "A") {
            icon = '<img style="width:60px" src="img/arrival.png" />';
            color = "#ADD8E6";
        } else if (flight.type === "D") {
            icon = '<img style="width:60px" src="img/departure.png" />';
            color = "#FFF8DC";
        }
        rows += `<tr class="normal" style="background-color: ${color};" onMouseOver="this.className='highlight'" onMouseOut="this.className='normal'">
                <td>${icon} ${flight.operatorShort}</td>
                <td>${flight.number}</td>
                <td>${flight.operatorLong}</td>
                <td>${flight.schedueTime}</td>
                <td>${flight.actualTime}</td>
                <td>${flight.type}</td>
                <td>${flight.airport}</td>
                <td>${flight.city}</td>
                <td>${flight.country}</td>
                <td>${flight.terminal}</td>
                <td>${flight.status}</td>
            </tr>`;

    }

    tableBody.innerHTML += rows;
}

populateTable(jsonFlights);



function reset() {
    document.getElementById('flightNumber').value = '';
    document.getElementById('country').value = '';
    document.getElementById('city').value = '';
    document.getElementById('flightType').value = '';

    populateTable(jsonFlights);
}

function searchButton() {
    if (document.getElementById('flightNumber').value != '') {
        searchFlightsByNumber();
    }
    else if (document.getElementById('country').value.toString() != '') {
        searchFlightsByCountry();
    }
    else if (document.getElementById('city').value != '') {
        searchFlightsByCity();
    }
    else if (document.getElementById('flightType').value != '') {

        searchFlightsByType()
    }
    else if (document.getElementById('endDate').value) {
        searchFlightsByDate();
    }
    else {
        alert('erorr');
    }
}
function clearTable() {
    document.getElementById('flightsTable').innerHTML = '';
}

function searchFlightsByNumber() {/// done
    var flightNumber = document.getElementById('flightNumber').value;
    populateTableWithSpecificFlight(flightNumber);

}
function searchFlightsByDate() {
    var endDate = document.getElementById('endDate').value.toString();
    populateTableWithSpecificFlight(endDate);

}
function searchFlightsByType() {
    var flightType = document.getElementById("flightType").value;

    populateTableWithSpecificFlight(flightType);

}
function searchFlightsByCountry() {
    var country = document.getElementById('country').value;
    populateTableWithSpecificFlight(country);
}
function searchFlightsByCity() {
    var city = document.getElementById('city').value;
    populateTableWithSpecificFlight(city);

}

function populateTableWithSpecificFlight(input) {
    console.log("input:" + input);
    console.log("json[1]:" + jsonFlights[1].type);
    const tableBody = document.getElementById('flightsTable');
    tableBody.innerHTML = ''; // Clear existing table data
    let row = '';
    let counter = 0;
    for (let flight of jsonFlights) {
        counter += 1;
        let num = flight.number;
        let end_date = new Date(flight.actualTime).toISOString().split('T')[0];
        let type = flight.type;
        let country = flight.country;
        let city = flight.city;
        if (num == input || city == input || country == input || type == input || end_date == input) {
            console.log(flight);
            console.log(num);
            console.log(input);

            if (flight.type === "A") {
            icon = '<img style="width:60px" src="img/arrival.png" />';
            color = "#ADD8E6";
        } else if (flight.type === "D") {
            icon = '<img style="width:60px" src="img/departure.png" />';
            color = "#FFF8DC";
            }
            row += `<tr class="normal" style="background-color: ${color};" onMouseOver="this.className='highlight'" onMouseOut="this.className='normal'">
                <td>${flight.operatorShort}</td>
                <td>${flight.number}</td>
                <td>${flight.operatorLong}</td>
                <td>${flight.schedueTime}</td>
                <td>${flight.actualTime}</td>
                <td>${flight.type}</td>
                <td>${flight.airport}</td>
                <td>${flight.city}</td>
                <td>${flight.country}</td>
                <td>${flight.terminal}</td>
                <td>${flight.status}</td>
            </tr>`;

        }
    }

    tableBody.innerHTML += row;
}
// Function to find the most delayed airline
function findMostDelayedAirline(flights) {
    let delaysCount = {};
    flights.forEach(flight => {
        if (flight.schedueTime !== flight.actualTime) {
            if (!delaysCount[flight.operatorLong]) {
                delaysCount[flight.operatorLong] = 1;
            } else {
                delaysCount[flight.operatorLong]++;
            }
        }
    });

    let maxDelayCount = 0;
    let mostDelayedAirline = '';
    for (let airline in delaysCount) {
        if (delaysCount[airline] > maxDelayCount) {
            maxDelayCount = delaysCount[airline];
            mostDelayedAirline = airline;
        }
    }

    if (mostDelayedAirline !== '') {
        alert(`החברה המאחרת ביותר ${mostDelayedAirline} עם ${maxDelayCount} טיסות מאחרות.`);
    } else {
        alert('לא נמצא טיסות מאחרות');
    }
}
function displayFlightDetails(flightDetails) {
    const flightDetailsDiv = document.getElementById('flight-details-overlay');
    const flightDetailsContainer = document.createElement('div');
    flightDetailsContainer.id = 'flight-details';
    flightDetailsContainer.classList.add('flight-details');
    flightDetailsContainer.innerHTML = `
            <div>
                <h2>Flight Details</h2>
                <p><strong>Operator:</strong> ${flightDetails.operatorLong} (${flightDetails.operatorShort})</p>
                <p><strong>Flight Number:</strong> ${flightDetails.number}</p>
                <p><strong>Type:</strong> ${flightDetails.type}</p>
                <p><strong>City:</strong> ${flightDetails.city}</p>
                <p><strong>Country:</strong> ${flightDetails.country}</p>
                <p><strong>Scheduled Time:</strong> ${flightDetails.schedueTime}</p>
                <p><strong>Actual Time:</strong> ${flightDetails.actualTime}</p>
                <p><strong>Status:</strong> ${flightDetails.status}</p>
                <p><strong>terminal:</strong> ${flightDetails.terminal}</p>
                <p><strong>airport:</strong> ${flightDetails.airport}</p>
                <p><strong>cityCode:</strong> ${flightDetails.cityCode}</p>
                <p><strong>counter:</strong> ${flightDetails.counter}</p>
                <p><strong>zone:</strong> ${flightDetails.zone}</p>
                <button id="close-flight-details">Close</button>
            </div>
        `;
    flightDetailsDiv.appendChild(flightDetailsContainer);
    flightDetailsDiv.style.display = 'block';

    // Add event listener to the close button
    document.getElementById('close-flight-details').addEventListener('click', function () {
        flightDetailsDiv.style.display = 'none';
        // Clear the contents of the flight details container
        flightDetailsContainer.innerHTML = '';
    });
}

// Find most delayed airline button event listener
document.getElementById('find-most-delayed').addEventListener('click', function () {
    findMostDelayedAirline(jsonFlights);
});
function generateFlightDistributionData(flights, attribute) {
    const distribution = {};
    for (let flight of flights) {
        const value = flight[attribute];
        distribution[value] = (distribution[value] || 0) + 1;
    }
    return distribution;
}

// Function to create a pie chart
function createPieChart(data, title) {
    const labels = Object.keys(data);
    const values = Object.values(data);

    const layout = {
        title: title,
        showlegend: true
    };

    const trace = {
        type: 'pie',
        labels: labels,
        values: values
    };

    Plotly.newPlot('flight-distribution-chart', [trace], layout);
}

// Call the functions to generate and display pie charts
function displayFlightDistributionCharts(flights) {
    const typeDistribution = generateFlightDistributionData(flights, 'type');
    const statusDistribution = generateFlightDistributionData(flights, 'status');

    createPieChart(typeDistribution, 'Flight Type Distribution');
    createPieChart(statusDistribution, 'התפלגות הסטטאסום');
}

// Call this function after populating the table to display the charts
displayFlightDistributionCharts(jsonFlights);

function showFlightDetails(flight) {
    const flightDetailsContent = document.getElementById('flightDetailsContent');
    flightDetailsContent.innerHTML = `
        <p>Operator Short: ${flight.operatorShort}</p>
        <p>Number: ${flight.number}</p>
        <p>Operator Long: ${flight.operatorLong}</p>
        <p>Scheduled Time: ${flight.schedueTime}</p>
        <p>Actual Time: ${flight.actualTime}</p>
        <p>Type: ${flight.type}</p>
        <p>Airport: ${flight.airport}</p>
        <p>City: ${flight.city}</p>
        <p>Country: ${flight.country}</p>
        <p>Terminal: ${flight.terminal}</p>
        <p>Status: ${flight.status}</p>
    `;
    const flightDetails = document.getElementById('flightDetails');
    flightDetails.style.display = 'block';
}
function closeFlightDetails() {
    const flightDetails = document.getElementById('flightDetails');
    flightDetails.style.display = 'none';
}

