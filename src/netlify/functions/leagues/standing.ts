import type { Handler } from "@netlify/functions";
import dotenv from 'dotenv'

dotenv.config()

export const handler: Handler = async (event) => {
  try {
    // ✅ Read league from query string
    const leagueCode = event.queryStringParameters?.league ?? "PL";

    const response = await fetch(
      `${process.env.FOOTBALL_DATA_URL}/competitions/${leagueCode}/standings`,
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
          leagueCode,
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
