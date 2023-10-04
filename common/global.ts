import { APIRequestContext, APIResponse } from "@playwright/test";

type ResponseBodySuccess<T> = { data: T };
type ResponseBodyError = {
    status: "error";
    message: string;
    code: number;
    result: number;
};

export type ResponseBody<T> = ResponseBodySuccess<T> & ResponseBodyError;

export async function apiGet(url: string, request: APIRequestContext) {
    const response = await request.get(`${process.env.BASE_URL}${url}`, {
        headers: {
            Authorization: `Bearer ${process.env.TOKEN}`,
            "Content-Type": "application/json",
        },
    });

    return response.json();
}

export async function makeGetRequest({
    request,
    url,
    params,
    useBearer = true,
    useFullProvidedUrl = false,
}: {
    request: APIRequestContext;
    url: string;
    params?: any;
    useBearer?: boolean;
    useFullProvidedUrl?: boolean;
}): Promise<APIResponse> {
    const bearerAuth = { Authorization: `Bearer ${process.env.TOKEN}` };
    const loginAuth = {
        Authorization: `Basic ${Buffer.from(
            `${process.env.USER_ADMIN_USERNAME}:${process.env.USER_ADMIN_PASSWORD}`
        ).toString("base64")}`,
    };
    const auth = useBearer ? bearerAuth : loginAuth;
    const serverless = !url.startsWith("/api");
    const requestUrl = useFullProvidedUrl ? url : serverless ? `${process.env.SERVERLESS_URL}${url}` : url;

    return await request.get(requestUrl, {
        headers: auth,
        ...(params && { params }),
    });
}

// interface ApiResponse {
//     status: number;
//     body: string;
// };

// async function makeApiRequest(method: string, url: string): Promise<ApiResponse> {
//     try {
//         const response = await request.get({
//         method,
//         url: url,
//         headers: {
//             'Authorization': `Bearer ${process.env.TOKEN}`,
//             'Content-Type': 'application/json'
//         }
//         });

//         const body = await response.json();

//         return {
//         status: response.status(),
//         body: JSON.stringify(body)
//         };
//     } catch (error) {
//         throw new Error(`Error making API request: ${error}`);
//     }
// };
