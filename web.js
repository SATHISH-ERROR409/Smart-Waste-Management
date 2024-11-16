// script.js

const channelID = 'YOUR_CHANNEL_ID';
const apiKey = 'YOUR_API_KEY';
const url = `https://api.thingspeak.com/channels/${channelID}/feeds.json?api_key=${apiKey}&results=1`;

async function fetchData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const latestFeed = data.feeds[0];

    // Update sensor data on the website
    document.getElementById("distance").innerText = `${latestFeed.field1} cm`;
    document.getElementById("moisture").innerText = latestFeed.field2;
    document.getElementById("gas").innerText = latestFeed.field3;

    // Update charts with new data
    updateCharts(latestFeed.field1, latestFeed.field2, latestFeed.field3);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function updateCharts(distance, moisture, gas) {
  // Chart for Bin Fullness (distance)
  const distanceChart = new Chart(document.getElementById('distanceChart'), {
    type: 'bar',
    data: {
      labels: ['Bin Fullness'],
      datasets: [{
        label: 'Distance (cm)',
        data: [distance],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    }
  });

  // Chart for Moisture Level
  const moistureChart = new Chart(document.getElementById('moistureChart'), {
    type: 'bar',
    data: {
      labels: ['Moisture Level'],
      datasets: [{
        label: 'Moisture',
        data: [moisture],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
      }]
    }
  });

  // Chart for Gas Level
  const gasChart = new Chart(document.getElementById('gasChart'), {
    type: 'bar',
    data: {
      labels: ['Gas Level'],
      datasets: [{
        label: 'Gas Concentration',
        data: [gas],
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1
      }]
    }
  });
}

// Fetch data every 10 seconds
setInterval(fetchData, 10000);

// Initial data fetch
fetchData();
