import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamodb = DynamoDBDocumentClient.from(client);

const TABLE_NAME = "foodie_finder";

export const handler = async (event) => {
  try {
    const restaurantId = event.pathParameters?.id;
    // Table primary key is (cuisineType HASH, restaurantId RANGE) — both required for GetItem
    const cuisineType = event.queryStringParameters?.cuisineType ?? event.queryStringParameters?.cuisine;

    if (!restaurantId) {
      return response(400, { message: "Restaurant ID is required" });
    }

    if (!cuisineType) {
      return response(400, {
        message: "cuisineType is required (query param: cuisineType or cuisine). Table key is (cuisineType, restaurantId)."
      });
    }

    const result = await dynamodb.send(
      new GetCommand({
        TableName: TABLE_NAME,
        Key: {
          cuisineType: cuisineType,
          restaurantId: restaurantId
        }
      })
    );

    if (!result.Item) {
      return response(404, { message: "Restaurant not found" });
    }

    return response(200, result.Item);

  } catch (error) {
    console.error("Error fetching restaurant:", error);
    return response(500, { message: "Internal server error" });
  }
};

function response(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "*"
    },
    body: JSON.stringify(body)
  };
}
