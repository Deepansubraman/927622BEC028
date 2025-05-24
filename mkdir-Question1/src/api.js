export async function getAuthToken() {
  const clientID = "d5ba4233-b1e5-4a66-94ca-e39677f2fa29";
  const clientSecret = "tXAbJpWtqtZRapzs";

  const response = await fetch("http://20.244.56.144/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      companyName: "ABC University",
      clientID,
      clientSecret
    })
  });

  if (!response.ok) throw new Error("Failed to fetch token");
  const data = await response.json();
  return data.access_token;
}

export async function getStocks(token) {
  const response = await fetch("http://20.244.56.144/evaluation-service/stocks", {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!response.ok) throw new Error("Failed to fetch stocks");
  const data = await response.json();
  // Convert { stocks: { "Company Name": "SYMBOL", ... } } to [{ name, symbol }]
  return Object.entries(data.stocks).map(([companyName, symbol]) => ({
    companyName,
    symbol
  }));
}

export async function getStockHistory(token, stockSymbol, minutes) {
  const response = await fetch(
    `http://20.244.56.144/stocks/${stockSymbol}/history?minutes=${minutes}`,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  if (!response.ok) throw new Error("Failed to fetch stock history");
  return response.json();
}