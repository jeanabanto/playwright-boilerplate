// Authenticate with API request: https://playwright.dev/docs/auth#authenticate-with-api-request
import { test as setup } from "@playwright/test";

const authFile = ".auth/user.json";
const url = "<authentication_endpoint>";

setup("authenticate", async ({ request }) => {
    // Send authentication request.
    await request.post(url, {
        headers: {
            Accept: "application/json",
            // Add authorization token to all requests.
            // Assuming personal access token available in the environment.
            Authorization: `Basic ${Buffer.from(
                `${process.env.USER_ADMIN_USERNAME}:${process.env.USER_ADMIN_PASSWORD}`
            ).toString("base64")}`,
        },
    });
    await request.storageState({ path: authFile });
});
