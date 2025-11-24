import AdminRoutes from "./routes/AdminRoutes";
import WebsiteRoutes from "./routes/WebsiteRoutes";
import { useGetCurrencyQuery } from "./store/apis/endpoints/currency";
import LocalizationProvider from "./components/common/LocalizationProvider";
import SEO from "./components/seo/SEO";


export default function App() {
  const { data: currency } = useGetCurrencyQuery();
  return (
    <>
      <SEO
        title="Home"
        description="GST Solutions - Leader in advanced tracking and automation technologies, specializing in RFID, barcode systems, and software solutions for manufacturing, warehousing, and inventory control."
        keywords={[
          "GST Solutions",
          "RFID Technology",
          "Barcode Systems",
          "Automation",
          "Inventory Control",
          "Manufacturing Solutions",
          "Traceability",
          "Zebra Partner",
          "Honeywell Partner",
          "Saudi Arabia",
          "Barcode",
          "UPC",
          "EAN",
          "GTIN",
          "GS1",
          "RFID",
          "Honeywell",
          "Zebra",
          "GST",
        ]}
        image="/Logo.png"
        url="https://gstsa1.org"
        type="website"
      />

      <LocalizationProvider>
        <AdminRoutes />
        <WebsiteRoutes />
      </LocalizationProvider>
    </>
  );
}
