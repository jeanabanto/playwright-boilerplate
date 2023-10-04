// Configure globalSetup: https://playwright.dev/docs/test-global-setup-teardown
import { FullConfig, request } from "@playwright/test";

async function globalSetup(config: FullConfig) {
    const baseURL = config.projects[0].use.baseURL;
    const url = "<authentication_endpoint>"; // replace with authentication endpoint

    const requestContext = await request.newContext({ baseURL });
    const response = await requestContext.post(url, {
        headers: {
            Accept: "application/json",
            Authorization: `Basic ${Buffer.from(
                `${process.env.USER_ADMIN_USERNAME}:${process.env.USER_ADMIN_PASSWORD}`
            ).toString("base64")}`,
        },
    });

    const body = await response.json();
    process.env.TOKEN = body.data.accessToken;
}

export default globalSetup;
