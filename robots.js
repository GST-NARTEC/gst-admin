
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard/",
          "/members/",
          "/products/",
          "/settings/",
          "/categories/",
          "/addons/",
          "/barcode-master/",
          "/api/",
          "/login/",
          "/registration/",
          "/my-profile/",
          "/my-products/",
          "/my-barcodes/",
          "/my-brands/",
          "/my-billing/",
          "/my-orders/",
          "/help-and-support/",
        ],
      },
    ],
    sitemap: "https://gstsa1.org/sitemap.xml",
  };
}
