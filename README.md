# Stock Trading App

This project is a sample Stock Trading App that provides data and endpoints for stock information, including a mock S&P 500 dataset.

## Project Structure

- `app.js` / `server.js`: Main entry points for the application.
- `config.env`: Environment configuration file.
- `package.json`: Project dependencies and scripts.
- `controllers/`: Contains route controllers (e.g., `homepageController.js`).
- `dev-data/`: Contains development data and scripts.
  - `S&P500.json`: Mock S&P 500 stock data with fields such as initials, full name, country, sector, industry, PE, price, and available stock.
  - `import-dev-data.js`: Script for importing development data.
- `models/`: Data models (if any).
- `routes/`: Route definitions (e.g., `homepageRoute.js`).

## S&P500.json Data

The `dev-data/S&P500.json` file contains an array of stock objects with the following fields:

- `initials`: Stock symbol/initials
- `full_name`: Full name of the company
- `country`: Country of the company
- `sector`: Sector classification
- `industry`: Industry classification
- `PE`: Price-to-Earnings ratio
- `price`: Current stock price
- `Available_Stock`: Number of available shares

## Unique Values in S&P500.json

### Sectors

- Industrials
- Consumer Discretionary
- Materials
- Financials
- Health Care
- Information Technology
- Energy
- Consumer Staples
- Real Estate
- Communication Services
- Utilities

### Industries

- Construction and Engineering
- Specialty Retail
- Chemicals
- Consumer Finance
- Health Care Providers and Services
- IT Services
- Oil, Gas and Consumable Fuels
- Food Products
- Real Estate Management and Development
- Media
- Metals and Mining
- Trading Companies and Distributors
- Hotels, Restaurants and Leisure
- Electronic Equipment, Instruments and Components
- Containers and Packaging
- Textiles, Apparel and Luxury Goods
- Automobile Components
- Independent Power and Renewable Electricity Producers

### Countries

- Thailand
- USA
- China
- UK
- France

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Set up environment variables:**
   - Copy or edit `config.env` as needed.
3. **Run the server:**
   ```sh
   node server.js
   ```

## Endpoints

- `/` (homepage): Returns a simple success response.
- Additional endpoints can be added for stock data, trading, etc.

## License

This project is for educational/demo purposes only.
