
let travelData = [];

// On page load, fetch the JSON data
window.addEventListener("DOMContentLoaded", () => {
  //fetch("https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBMSkillsNetwork-JS0101EN-SkillsNetwork/travel1.json")
  fetch("./travel_recommendation.json")
    .then(response => response.json())
    .then(data => {
      travelData = data;
    })
    .catch(error => {
      console.error("Error fetching JSON data:", error);
    });
});

document.getElementById("searchBtn")?.addEventListener("click", function () {
    const input = document.getElementById("searchInput").value.trim().toLowerCase();

    let results = "";
    if (input.includes("beach")) {
        results = travelData.beaches;
    } else if (input.includes("temple")) {
        results = travelData.temples;
    } else if (input !== "") {
        const country = travelData.countries.find(country => country.name.toLowerCase().includes(input));
        if(country) results = country.cities;
    }

    // filter the travelData based on that type:
    if (results) {
        const filteredData = results;
        displayResults(filteredData);
    } else {
        // If no recognized keyword, display “no results” or similar
        resultsContainer.classList.add('active');
        document.getElementById("resultsContainer").innerHTML = "<p>No matches found.</p>";
    }
});
  
function displayResults(dataArray) {
    const resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.innerHTML = ""; // clear old results

    if (dataArray && dataArray.length > 0) {
        resultsContainer.classList.add('active');
        
        dataArray.forEach(item => {
            const card = document.createElement("div");
            card.classList.add("recommendation-card");
            card.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}" />
                <h3>${item.name}</h3>
                <p>${item.description}</p>
            `;
            resultsContainer.appendChild(card);
        });
    } else {
        resultsContainer.classList.remove('active');
        resultsContainer.innerHTML = "<p>No matches found.</p>";
    }
}

document.getElementById("clearBtn")?.addEventListener("click", function () {
    const resultsContainer = document.getElementById("resultsContainer");
    document.getElementById("searchInput").value = "";
    resultsContainer.innerHTML = "";
    resultsContainer.classList.remove('active');
});

