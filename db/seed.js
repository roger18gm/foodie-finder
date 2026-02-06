import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    DynamoDBDocumentClient,
    PutCommand
} from "@aws-sdk/lib-dynamodb";

const client = DynamoDBDocumentClient.from(
    new DynamoDBClient({ region: "us-east-1" })
);

const restaurants = [
    {
        cuisineType: "Italian",
        restaurantId: "rest_001",
        restaurantName: "Luigi’s Trattoria",
        price: 2,
        distance: 3.4,
        keywords: ["pasta", "pizza"],
        dietaryPreference: "vegetarian"
    },
    {
        cuisineType: "Mexican",
        restaurantId: "rest_002",
        restaurantName: "El Camino",
        price: 1,
        distance: 1.2,
        keywords: ["tacos", "spicy"],
        dietaryPreference: "vegan"
    },
    {
        cuisineType: "Italian",
        restaurantId: "rest_003",
        restaurantName: "Mama Mia",
        price: 2,
        distance: 3.4,
        keywords: ["pasta", "pizza"],
        dietaryPreference: "vegan"
    },
    {
        cuisineType: "Mexican",
        restaurantId: "rest_004",
        restaurantName: "Taco Loco",
        price: 1,
        distance: 1.2,
        keywords: ["tacos", "spicy"],
        dietaryPreference: "vegetarian"
    },
    {
        cuisineType: "American",
        restaurantId: "rest_005",
        restaurantName: "Burger Barn",
        price: 2,
        distance: 3.4,
        keywords: ["burger", "fries"],
        dietaryPreference: "none"
    },
    {
        cuisineType: "Indian",
        restaurantId: "rest_006",
        restaurantName: "Curry House",
        price: 2,
        distance: 3.4,
        keywords: ["curry", "spicy"],
        dietaryPreference: "none"
    },
    {
        cuisineType: "Chinese",
        restaurantId: "rest_007",
        restaurantName: "Dragon Express",
        price: 1,
        distance: 1.2,
        keywords: ["noodles", "spicy"],
        dietaryPreference: "vegan"
    },
];

async function seed() {
    for (const item of restaurants) {
        await client.send(
            new PutCommand({
                TableName: "foodie_finder",
                Item: item
            })
        );
    }

    console.log("✅ Seed complete");
}

seed();
