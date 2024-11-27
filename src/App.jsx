import AdminRoutes from "./routes/AdminRoutes";
import WebsiteRoutes from "./routes/WebsiteRoutes";
import { useGetCurrencyQuery } from "./store/apis/endpoints/currency";

export default function App() {
  const { data: currency } = useGetCurrencyQuery();
  console.log(currency);
  return (
    <div>
      <AdminRoutes />
      <WebsiteRoutes />
    </div>
  );
}
