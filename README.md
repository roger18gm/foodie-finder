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

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request