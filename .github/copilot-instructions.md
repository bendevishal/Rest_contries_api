# Rest Countries Explorer - AI Agent Instructions

## Project Overview
A lightweight vanilla JavaScript web application that fetches and displays country data from the REST Countries API (v3.1). No build tools, no frameworks—pure HTML/CSS/JS with Bootstrap CDN for styling.

## Architecture & Data Flow

**Single-Page App Pattern:**
1. `index.html` loads Bootstrap CSS + `script.js`
2. `script.js` fetches from `https://restcountries.com/v3.1/all` on page load
3. Data stored in `countriesData` array (global state)
4. `displayCountries()` renders cards to DOM using template literals
5. Search input filters `countriesData` and re-renders in real-time

## Key Conventions

### Data Handling
- **API Field Extraction**: The API returns objects nested deeply. Use optional chaining (`?.`) to safely access fields:
  ```javascript
  country.name?.common        // "United States"
  country.capital?.[0]        // First capital (returns array)
  Object.values(country.languages).join(", ")  // Convert object to list
  ```
- **State Management**: All country data held in `countriesData` array; search filters this array without modifying it
- **Error Handling**: Basic fetch error logging; no retry logic currently implemented

### DOM Rendering
- **String Templates**: Cards built using template literals with inline HTML:
  ```javascript
  let card = `<div class="col-md-3 mb-4">...</div>`;
  countriesContainer.innerHTML += card;
  ```
- **Clearing & Rebuilding**: `displayCountries()` clears the entire container with `innerHTML = ""` then rebuilds—inefficient for large filtered sets but acceptable for ~250 countries

### Styling
- **Framework**: Bootstrap 5.3.2 CDN (responsive grid, card components)
- **Custom CSS**: Minimal (`style.css`)—only body background and card hover scale effect
- **Responsive**: Bootstrap's `col-md-3` creates 4-column grid on medium+ screens, responsive below

## Adding Features - Common Patterns

**Adding a New Data Field Display:**
1. Extract from API response (check https://restcountries.com/v3.1/all response shape)
2. Use safe access: `country.field?.subfield ?? "N/A"`
3. Add `<p>` tag to card template in `displayCountries()`

**Improving Search:**
- Modify filter logic in the search event listener (currently case-insensitive substring search on `name.common`)
- Current pattern: `countriesData.filter(c => c.name?.common?.toLowerCase().includes(value))`

**Performance Note:**
- App re-renders all 250 cards on every keystroke; acceptable but consider virtual scrolling if expanding significantly

## Testing & Debugging
- No test framework; use browser DevTools console
- Check API response: Open DevTools → Network tab → look for fetch request to restcountries API
- Verify `countriesData` in console: `console.log(countriesData)`; should be non-empty array of country objects

## File Responsibilities
- **index.html**: Structure only; Bootstrap grid, search input, countries container div
- **script.js**: All logic (fetch, display, search)
- **style.css**: Global styling only

## Before Committing
- No linting/formatting tools configured
- Keep changes minimal; test in browser before pushing
