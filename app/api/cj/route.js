export async function GET() {
  const apiKey = process.env.CJ_API_KEY;
  const authRes = await fetch('https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ apiKey })
  });
  const data = await authRes.json();
  return Response.json(data);
}
