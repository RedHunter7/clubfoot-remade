import type { Handler } from "@netlify/functions";
import dotenv from 'dotenv'

dotenv.config()

export const handler: Handler = async (event) => {
  try {
    // ✅ Read league from query string
    const clubId = event.queryStringParameters?.club ?? 1;

    //
    const matchStatus = event.queryStringParameters?.status ?? "SCHEDULED";

    const response = await fetch(
      `${process.env.FOOTBALL_DATA_URL}/teams/${clubId}/matches?status=${matchStatus}&limit=5`,
      {
        headers: {
          "X-Auth-Token": process.env.FOOTBALL_DATA_TOKEN as string,
        },
      }
    );

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: "Failed to fetch data",
          clubId,
          matchStatus,
          status: response.status,
        }),
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
    };
  }
};
