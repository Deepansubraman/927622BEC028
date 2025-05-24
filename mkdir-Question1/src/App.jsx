import { useEffect, useState } from "react";
import { getAuthToken, getStocks } from "./api";

function App() {
  const [token, setToken] = useState("");
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTokenAndStocks() {
      setLoading(true);
      setError("");
      try {
        const tok = await getAuthToken();
        setToken(tok);
        const stocksList = await getStocks(tok);
        setStocks(stocksList);
      } catch (err) {
        setError(err.message);
        console.error(err);
      }
      setLoading(false);
    }
    fetchTokenAndStocks();
  }, []);

  return (
    <div>
      <h1>Token:</h1>
      <pre>{token}</pre>
      <h2>Stocks:</h2>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {stocks.map((stock) => (
            <li key={stock.symbol}>
              {stock.companyName} (<b>{stock.symbol}</b>)
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;