// Configuration
const API_URL = "https://188e9da2-project1-workers.qk212022.workers.dev/"; // Replace with your actual Worker API URL

// DOM Elements
const fetchButton = document.getElementById('fetchButton');
const buttonText = document.querySelector('.button-text');
const loadingSpinner = document.querySelector('.loading-spinner');
const dataContainer = document.getElementById('dataContainer');
const dataContent = document.querySelector('.card-content');

// State
let isLoading = false;

// Utility functions
function setLoading(state) {
    isLoading = state;
    buttonText.textContent = state ? 'Fetching...' : 'Fetch Data';
    loadingSpinner.style.display = state ? 'inline-block' : 'none';
    fetchButton.disabled = state;
}

function showError(message) {
    dataContent.innerHTML = `
        <p class="error-message">❌ Error</p>
        <p class="error-details">${message}</p>
        <button onclick="fetchData()" class="retry-button">Try Again</button>
    `;
}

function formatData(data) {

    if (!data || !Array.isArray(data)) {
        return '<p>No data available</p>';
    }

    return data.map(item => `
        <div class="data-item">
            <h3>${item.name || 'Unnamed Item'}</h3>
            ${item.description ? `<p>${item.description}</p>` : ''}
            <div class="item-link-container">
                ${item.url ? `<a href="${item.url}" target="_blank" class="item-link">View Details →</a>` : ''}
            </div>
            </div>
    `).join('');
}


// Main function to fetch data
async function fetchData() {
    if (isLoading) return;

    setLoading(true);
    dataContent.innerHTML = '<p class="loading-text">Fetching data...</p>';

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data || (Array.isArray(data) && data.length === 0)) {
            dataContent.innerHTML = `
                <p>✅ Data fetched successfully</p>
                <p class="empty-state">No data available to display</p>
            `;
        } else {
            dataContent.innerHTML = `
                <p>✅ Data fetched successfully</p>
                <div class="data-grid"> ${formatData(data)}</div>
            `;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        showError(error.message || 'Failed to fetch data. Please try again.');
    } finally {
        setLoading(false);
    }
}

// Event Listeners
fetchButton.addEventListener('click', fetchData);

// Initialize
// Uncomment the line below if you want to fetch data on page load
// fetchData();
