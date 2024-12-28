import AdminRoutes from "./routes/AdminRoutes";
import WebsiteRoutes from "./routes/WebsiteRoutes";
import { useGetCurrencyQuery } from "./store/apis/endpoints/currency";
import LocalizationProvider from "./components/common/LocalizationProvider";

export default function App() {
  const { data: currency } = useGetCurrencyQuery();
  console.log(currency);
  return (
    <LocalizationProvider>
      <AdminRoutes />
      <WebsiteRoutes />
    </LocalizationProvider>
  );
}
