# FoodieFinder

A React application for discovering restaurants that match your taste, budget, and lifestyle preferences.

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Vanilla CSS
- **Backend**: AWS API Gateway + Lambda (to be implemented)
- **Database**: DynamoDB (to be implemented)
- **Deployment**: AWS Amplify (to be implemented)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:3000 in your browser

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://your-api-id.execute-api.us-east-1.amazonaws.com
```

## Features

- **Advanced Filtering**: Search by keyword, cuisine type, price range, dietary preferences, and distance
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Search**: Instant results as you filter
- **Clean UI**: Modern, intuitive interface

## API Integration

The app is designed to work with an AWS API Gateway endpoint with the following expected structure:

### GET /restaurants

**Query Parameters:**
- `keyword` - Search term (e.g., "pizza", "sushi")
- `cuisine` - Cuisine type ("italian", "mexican", "asian", "american", "indian")
- `price` - Price range ("$", "$$", "$$$")
- `diet` - Dietary preference ("vegetarian", "vegan", "gluten-free", "halal")
- `distance` - Distance filter ("1", "5", "10" miles)

**Expected Response:**
```json
{
  "restaurants": [
    {
      "id": "restaurant-123",
      "name": "Mario's Italian Restaurant",
      "cuisine": "Italian",
      "price": "$$",
      "dietary": "Vegetarian options available",
      "distance": 2.3,
      "rating": 4.5,
      "address": "123 Main St, City, State"
    }
  ]
}
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Project Structure

```
src/
├── components/
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── SearchSection.jsx
│   ├── RestaurantResults.jsx
│   ├── Features.jsx
│   ├── About.jsx
│   └── Footer.jsx
├── App.jsx
├── App.css
├── main.jsx
└── index.css
```

## Deployment

This app is designed to be deployed on AWS Amplify with automatic CI/CD from GitHub. The backend will consist of AWS Lambda functions connected via API Gateway.

## Next Steps

1. Set up AWS API Gateway endpoint
2. Implement Lambda functions for restaurant data
3. Connect DynamoDB for data storage
4. Deploy to AWS Amplify
5. Configure custom domain (optional)

## Troubleshooting: "Failed to fetch restaurant(s)"

This error can come from the **browser** (request never reaches the server) or from the **backend** (API returns 4xx/5xx). Check the exact message and DevTools → Network tab to tell which.

### If the message is just "Failed to fetch" (no status code)

The request is failing before a response is received. Common causes with **API Gateway + Lambda**:

| Cause | What to check |
|-------|----------------|
| **CORS** | API Gateway must allow your frontend origin. Add `Access-Control-Allow-Origin` (e.g. `https://your-app.amplifyapp.com` or `http://localhost:5173`) in the Lambda response *and* enable CORS for the API/resource in API Gateway. |
| **Wrong URL** | `.env`: `VITE_API_BASE_URL` must be your API Gateway invoke URL (e.g. `https://abc123.execute-api.us-east-1.amazonaws.com`) with no trailing slash. Redeploy/restart the app after changing `.env`. |
| **API not deployed** | In API Gateway, deploy the API to a stage (e.g. `prod`) and use the full URL including stage: `.../prod/search`. |
| **Network / DNS** | From the same machine, run `curl -v "https://your-api-url/prod/search"`. If that fails, the problem is outside the app (firewall, VPN, wrong URL). |

### If the message includes a status code (e.g. "Failed to fetch restaurant: 502")

The request reaches API Gateway/Lambda but the backend returns an error:

| Status | Likely cause | What to check |
|--------|----------------|---------------|
| **502 Bad Gateway** | Lambda throws, times out, or returns invalid response. | CloudWatch logs for the Lambda; ensure Lambda returns a proper API Gateway response (statusCode, headers, body). |
| **504 Gateway Timeout** | Lambda runs too long. | Increase Lambda timeout (max 15 min); optimize Lambda or DB queries. |
| **403** | Forbidden. | API Gateway resource policy; Lambda permissions; authorizer (if any). |
| **404** | Not found. | Route/path in API Gateway (e.g. `/search`, `/restaurants/{id}`) must match what the app calls. |
| **500** | Unhandled error in Lambda. | CloudWatch logs for the function; fix the error or add error handling. |

### Quick checks

1. **Browser DevTools → Network**: See the failing request URL, status, and response body.
2. **CloudWatch**: Open the log group for your Lambda and look for errors when you trigger the request.
3. **API Gateway**: Test the route in the console (e.g. "Test" for the resource) to see if the integration returns 200.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request