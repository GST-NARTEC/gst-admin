export default async function sitemap() {
  // Static pages based on WebsiteRoutes.jsx
  const staticPages = [
    {
      url: "https://gstsa1.org",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "https://gstsa1.org/user-guide-manual",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Fetch menu items from API
  let menuPages = [];
  try {
    const menuResponse = await fetch(
      "https://api.gstsa1.org/api/menu/v1/active",
      {
        next: { revalidate: 3600 },
      }
    );

    if (menuResponse.ok) {
      const menuData = await menuResponse.json();
      const menus = menuData.data?.menus || [];

      // Process all submenus with pages
      menus.forEach((menu) => {
        if (menu.subMenus && menu.subMenus.length > 0) {
          menu.subMenus.forEach((submenu) => {
            if (submenu.page && submenu.page.slug) {
              menuPages.push({
                url: `https://gstsa1.org/${submenu.page.slug}`,
                lastModified: new Date(submenu.updatedAt || submenu.createdAt),
                changeFrequency: "monthly",
                priority: 0.7,
              });
            } else if (
              submenu.externalUrl &&
              submenu.externalUrl.startsWith("https://gstsa1.org/")
            ) {
              menuPages.push({
                url: submenu.externalUrl,
                lastModified: new Date(submenu.updatedAt || submenu.createdAt),
                changeFrequency: "monthly",
                priority: 0.7,
              });
            }
          });
        }
      });
    }
  } catch (error) {
    console.error("Error fetching menu data:", error.message);
  }

  // Fetch slider items from API
  let sliderPages = [];
  try {
    const sliderResponse = await fetch(
      "https://api.gstsa1.org/api/slider/v1/active",
      {
        next: { revalidate: 3600 },
      }
    );

    if (sliderResponse.ok) {
      const sliderData = await sliderResponse.json();
      const sliders = sliderData.data?.sliders || [];

      // Process all sliders with pages
      sliders.forEach((slider) => {
        if (slider.page && slider.page.slug) {
          sliderPages.push({
            url: `https://gstsa1.org/${slider.page.slug}`,
            lastModified: new Date(slider.updatedAt || slider.createdAt),
            changeFrequency: "weekly",
            priority: 0.8,
          });
        } else if (
          slider.externalUrl &&
          slider.externalUrl.startsWith("https://gstsa1.org/")
        ) {
          sliderPages.push({
            url: slider.externalUrl,
            lastModified: new Date(slider.updatedAt || slider.createdAt),
            changeFrequency: "weekly",
            priority: 0.8,
          });
        }
      });
    }
  } catch (error) {
    console.error("Error fetching slider data:", error.message);
  }

  // Combine all URLs, removing duplicates
  const allUrls = [...staticPages, ...menuPages, ...sliderPages];

  // Remove duplicates by URL
  const uniqueUrls = Array.from(
    new Map(allUrls.map((item) => [item.url, item])).values()
  );

  return uniqueUrls;
}
