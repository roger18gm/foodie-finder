aws dynamodb create-table \
  --table-name foodie_finder \
  --attribute-definitions \
    AttributeName=cuisineType,AttributeType=S \
    AttributeName=restaurantId,AttributeType=S \
    AttributeName=price,AttributeType=N \
    AttributeName=dietaryPreference,AttributeType=S \
  --key-schema \
    AttributeName=cuisineType,KeyType=HASH \
    AttributeName=restaurantId,KeyType=RANGE \
  --global-secondary-indexes '[
    {
      "IndexName": "cuisinePriceIndex",
      "KeySchema": [
        { "AttributeName": "cuisineType", "KeyType": "HASH" },
        { "AttributeName": "price", "KeyType": "RANGE" }
      ],
      "Projection": { "ProjectionType": "ALL" }
    },
    {
      "IndexName": "dietaryIndex",
      "KeySchema": [
        { "AttributeName": "dietaryPreference", "KeyType": "HASH" },
        { "AttributeName": "cuisineType", "KeyType": "RANGE" }
      ],
      "Projection": { "ProjectionType": "ALL" }
    }
  ]' \
  --billing-mode PAY_PER_REQUEST