let countriesContainer = document.getElementById("countries");
let searchBox = document.getElementById("search");
let loadingElement = document.getElementById("loading");
let noResultsElement = document.getElementById("no-results");

let countriesData = [];

// Show loading state
loadingElement.style.display = "block";

fetch("https://restcountries.com/v3.1/all?fields=name,capital,flags,region,population,languages,currencies,area")
  .then(response => response.json())
  .then(data => {
      if(Array.isArray(data)){
          countriesData = data;
          displayCountries(data);
      }else{
          console.error("API returned unexpected data:", data);
      }
  })
  .catch(error => {
      console.error("Fetch error:", error);
      loadingElement.innerHTML = `
          <i class="bi bi-exclamation-triangle text-danger" style="font-size: 3rem;"></i>
          <h4 class="text-danger mt-3">Failed to load countries</h4>
          <p class="text-muted">Please check your internet connection and try again</p>
      `;
  })
  .finally(() => {
      loadingElement.style.display = "none";
  });

function displayCountries(countries){
    countriesContainer.innerHTML = "";

    if (countries.length === 0) {
        noResultsElement.classList.remove("d-none");
        return;
    } else {
        noResultsElement.classList.add("d-none");
    }

    countries.forEach(country => {
        let languages = country.languages ? Object.values(country.languages).join(", ") : "N/A";
        let currencies = country.currencies ? Object.keys(country.currencies).join(", ") : "N/A";
        let area = country.area ? country.area.toLocaleString() : "N/A";

        let card = `
        <div class="col-xl-3 col-lg-4 col-md-6 mb-4">
            <div class="country-card card h-100 border-0 shadow-sm">
                <div class="card-img-container">
                    <img src="${country.flags?.png || 'https://via.placeholder.com/300x150?text=No+Flag'}" class="card-img-top" alt="${country.name?.common} flag">
                    <div class="card-img-overlay d-flex align-items-start justify-content-end">
                        <span class="badge bg-primary rounded-pill px-3 py-2">${country.region}</span>
                    </div>
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title fw-bold mb-3">${country.name?.common}</h5>

                    <div class="country-info mb-3">
                        <div class="info-item mb-2">
                            <i class="bi bi-geo-alt-fill text-primary me-2"></i>
                            <strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}
                        </div>
                        <div class="info-item mb-2">
                            <i class="bi bi-people-fill text-success me-2"></i>
                            <strong>Population:</strong> ${country.population?.toLocaleString() || "N/A"}
                        </div>
                        <div class="info-item mb-2">
                            <i class="bi bi-translate text-info me-2"></i>
                            <strong>Languages:</strong> ${languages}
                        </div>
                        <div class="info-item mb-2">
                            <i class="bi bi-cash-coin text-warning me-2"></i>
                            <strong>Currency:</strong> ${currencies}
                        </div>
                        <div class="info-item">
                            <i class="bi bi-arrows-fullscreen text-secondary me-2"></i>
                            <strong>Area:</strong> ${area} km²
                        </div>
                    </div>

                    <div class="mt-auto">
                        <button class="btn btn-outline-primary btn-sm w-100" onclick="viewCountryDetails('${country.name?.common}')">
                            <i class="bi bi-info-circle me-1"></i>
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `;

        countriesContainer.innerHTML += card;
    });
}

function viewCountryDetails(countryName) {
    // For now, just show an alert. Could be expanded to show a modal
    alert(`More details about ${countryName} coming soon!`);
}

searchBox.addEventListener("input", function(){
    let value = searchBox.value.toLowerCase().trim();

    let filtered = countriesData.filter(country =>
        country.name?.common?.toLowerCase().includes(value) ||
        country.region?.toLowerCase().includes(value) ||
        (country.capital && country.capital[0]?.toLowerCase().includes(value))
    );

    displayCountries(filtered);
});