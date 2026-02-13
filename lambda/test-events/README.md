# Lambda test events

Use these in the AWS Lambda console **Test** tab (Create new event / Paste from file) or with AWS SAM/local invokes.

## getRestaurant.json

**Success (200):** Fetches restaurant `rest_001` with cuisine `Italian` (must exist in `foodie_finder` table).

To test other cases, change the JSON:

| Scenario        | Change |
|----------------|--------|
| Different restaurant | `pathParameters.id` → e.g. `"rest_002"`, `queryStringParameters.cuisineType` → e.g. `"Mexican"` |
| Missing ID (400)     | Remove `pathParameters` or set `"id": null` |
| Missing cuisine (400)| Remove `queryStringParameters` or set `"cuisineType": ""` |
| Not found (404)      | Use an id/cuisineType pair that doesn’t exist in the table |

**Alternative query param name:** You can use `"cuisine": "Italian"` instead of `"cuisineType": "Italian"`; the handler accepts both.
