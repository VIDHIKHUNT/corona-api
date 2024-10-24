document.addEventListener('DOMContentLoaded', function () {
    const infectedCountElement = document.getElementById('infectedCount');
    const fatalitiesCountElement = document.getElementById('fatalitiesCount');
    const recoveredCountElement = document.getElementById('recoveredCount');
    const globalDataBtn = document.getElementById('globalDataBtn');
    const countryDataBtn = document.getElementById('countryDataBtn');
    const countrySearch = document.getElementById('countrySearch');
    const fetchDataBtn = document.getElementById('fetchDataBtn');
    const countryInput = document.getElementById('countryInput');

    function fetchGlobalData() {
        fetch('https://disease.sh/v3/covid-19/all')
            .then(response => response.json())
            .then(data => {
                updateStats(data);
            })
            .catch(error => {
                showError();
                console.error('Error fetching global data:', error);
            });
    }

    function fetchCountryData(country) {
        fetch(`https://disease.sh/v3/covid-19/countries/${country}`)
            .then(response => response.json())
            .then(data => {
                updateStats(data);
            })
            .catch(error => {
                showError();
                console.error('Error fetching country data:', error);
            });
    }

    function updateStats(data) {
        infectedCountElement.textContent = data.cases.toLocaleString();
        fatalitiesCountElement.textContent = data.deaths.toLocaleString();
        recoveredCountElement.textContent = data.recovered.toLocaleString();
    }

    function showError() {
        infectedCountElement.textContent = 'Error';
        fatalitiesCountElement.textContent = 'Error';
        recoveredCountElement.textContent = 'Error';
    }

    globalDataBtn.addEventListener('click', function () {
        countrySearch.classList.add('hide-element');
        fetchGlobalData();
    });

    countryDataBtn.addEventListener('click', function () {
        countrySearch.classList.remove('hide-element');
    });

    fetchDataBtn.addEventListener('click', function () {
        const country = countryInput.value.trim();
        if (country) {
            fetchCountryData(country);
        }
    });

    // Fetch global data on initial load
    fetchGlobalData();
});