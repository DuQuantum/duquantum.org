type NetlifyEvent = {
  httpMethod: string;
  body: string | null;
  headers: Record<string, string | undefined>;
  queryStringParameters: Record<string, string | undefined> | null;
};

type NetlifyResponse = {
  statusCode: number;
  headers?: Record<string, string>;
  body: string;
};

export async function handler(event: NetlifyEvent): Promise<NetlifyResponse> {
  return {
    statusCode: 200,
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      message: "Hello from Netlify Function!",
      method: event.httpMethod,
      timestamp: new Date().toISOString(),
    }),
  };
}
