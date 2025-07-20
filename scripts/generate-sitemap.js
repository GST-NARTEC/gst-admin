import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const BASE_URL = "https://gstsa1.org";
const OUTPUT_PATH = path.join(__dirname, "..", "public", "sitemap.xml");

// Static routes from the application
const staticRoutes = [
  {
    url: "",
    lastmod: new Date().toISOString(),
    changefreq: "weekly",
    priority: "1.0",
  },
  {
    url: "/user-guide-manual",
    lastmod: new Date().toISOString(),
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    url: "/verify-halal",
    lastmod: new Date().toISOString(),
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    url: "/case-study",
    lastmod: new Date().toISOString(),
    changefreq: "weekly",
    priority: "0.9",
  },
];

// Additional dynamic routes that might be present on the website
const dynamicRoutes = [
  {
    url: "/fixed-asset-tracking-system",
    lastmod: new Date().toISOString(),
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    url: "/mobile-application",
    lastmod: new Date().toISOString(),
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    url: "/label-design-printing-1d2d",
    lastmod: new Date().toISOString(),
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    url: "/warehouse-management-system",
    lastmod: new Date().toISOString(),
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    url: "/e-commerce-solutions",
    lastmod: new Date().toISOString(),
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    url: "/contact-us",
    lastmod: new Date().toISOString(),
    changefreq: "monthly",
    priority: "0.7",
  },
];

/**
 * Generate XML for a single URL entry
 * @param {Object} route - Route object with url, lastmod, changefreq, priority
 * @returns {string} XML string for the URL entry
 */
function generateUrlXml(route) {
  const fullUrl = `${BASE_URL}${route.url}`;
  return `  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
}

/**
 * Generate the complete sitemap XML
 * @param {Array} routes - Array of route objects
 * @returns {string} Complete sitemap XML
 */
function generateSitemapXml(routes) {
  const urlEntries = routes.map(generateUrlXml).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

/**
 * Write sitemap to file
 * @param {string} content - XML content to write
 * @param {string} filePath - Path where to write the file
 */
function writeSitemap(content, filePath) {
  try {
    // Ensure the directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✅ Sitemap generated successfully at: ${filePath}`);
    console.log(`📊 Total URLs: ${staticRoutes.length + dynamicRoutes.length}`);
  } catch (error) {
    console.error("❌ Error writing sitemap:", error);
    process.exit(1);
  }
}

/**
 * Main function to generate sitemap
 */
function generateSitemap() {
  console.log("🚀 Generating sitemap...");

  // Combine all routes
  const allRoutes = [...staticRoutes, ...dynamicRoutes];

  // Sort routes by priority (descending) and then alphabetically
  allRoutes.sort((a, b) => {
    if (b.priority !== a.priority) {
      return parseFloat(b.priority) - parseFloat(a.priority);
    }
    return a.url.localeCompare(b.url);
  });

  // Generate XML content
  const sitemapXml = generateSitemapXml(allRoutes);

  // Write to file
  writeSitemap(sitemapXml, OUTPUT_PATH);

  console.log("\n📋 Generated URLs:");
  allRoutes.forEach((route) => {
    console.log(`  - ${BASE_URL}${route.url} (Priority: ${route.priority})`);
  });
}

// Run the sitemap generation
generateSitemap();

export { generateSitemap };
