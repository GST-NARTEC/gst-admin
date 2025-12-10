// import { useEffect } from "react";
// import { useGetLocalizationQuery } from "../../store/apis/endpoints/localization";
// import { updateTranslations } from "../../i18n/config";
// import OverlayLoader from "../common/OverlayLoader";

// export default function LocalizationProvider({ children }) {
//   const { data: response, isLoading } = useGetLocalizationQuery();

//   useEffect(() => {
//     if (response?.success && response?.data) {
//       try {
//         updateTranslations(response.data);
//       } catch (error) {
//         console.error("Error updating translations:", error);
//       }
//     }
//   }, [response]);

//   // Show loading state or nothing while translations are loading
//   if (isLoading || !response?.success) {
//     return <OverlayLoader />; // Or your custom loader component
//   }

//   return children;
// }
