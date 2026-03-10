let countriesContainer = document.getElementById("countries");
let searchBox = document.getElementById("search");

let countriesData = [];

fetch("https://restcountries.com/v3.1/all?fields=name,capital,flags,region,population,languages")
  .then(response => response.json())
  .then(data => {
      if(Array.isArray(data)){
          countriesData = data;
          displayCountries(data);
      }else{
          console.error("API returned unexpected data:", data);
      }
  })
  .catch(error => console.error("Fetch error:", error));
function displayCountries(countries){

    countriesContainer.innerHTML = "";

    countries.forEach(country => {
        let languages = country.languages ? Object.values(country.languages).join(", ") : "N/A";

        let card = `
        <div class="col-md-3 mb-4">
            <div class="card h-100">
                <img src="${country.flags?.png}" class="card-img-top" height="150">
                <div class="card-body">
                    <h5>${country.name?.common}</h5>
                    <p>Capital: ${country.capital ? country.capital[0] : "N/A"}</p>
                    <p>Region: ${country.region}</p>
                    <p>Population: ${country.population}</p>
                    <p>Languages: ${languages}</p>
                </div>
            </div>
        </div>
        `;

        countriesContainer.innerHTML += card;

    });

}

searchBox.addEventListener("input", function(){

    let value = searchBox.value.toLowerCase();

    let filtered = countriesData.filter(country =>
        country.name?.common?.toLowerCase().includes(value)
    );

    displayCountries(filtered);

});