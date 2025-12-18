import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const OUTPUT_PATH = path.join(__dirname, "..", "public", "sitemap.xml");

/**
 * Import the dynamic sitemap function from the root sitemap.js file
 */
async function importSitemapFunction() {
  try {
    const sitemapPath = path.join(__dirname, "..", "sitemap.js");
    const sitemapModule = await import(
      `file:///${sitemapPath.replace(/\\/g, "/")}`
    );
    return sitemapModule.default;
  } catch (error) {
    console.error("❌ Error importing sitemap.js:", error);
    throw error;
  }
}

/**
 * Convert sitemap data to the expected format for XML generation
 * @param {Array} sitemapData - Array of sitemap objects from sitemap.js
 * @returns {Array} Array of routes formatted for XML generation
 */
function convertSitemapDataToRoutes(sitemapData) {
  return sitemapData.map((item) => ({
    url: item.url.replace("https://gstsa1.org", ""), // Remove base URL to get relative path
    lastmod:
      item.lastModified instanceof Date
        ? item.lastModified.toISOString()
        : new Date(item.lastModified).toISOString(),
    changefreq: item.changeFrequency || "monthly",
    priority: item.priority?.toString() || "0.7",
  }));
}

/**
 * Generate XML for a single URL entry
 * @param {Object} route - Route object with url, lastmod, changefreq, priority
 * @returns {string} XML string for the URL entry
 */
function generateUrlXml(route) {
  const fullUrl = route.url.startsWith("http")
    ? route.url
    : `https://gstsa1.org${route.url}`;
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
  } catch (error) {
    console.error("❌ Error writing sitemap:", error);
    process.exit(1);
  }
}

/**
 * Main function to generate sitemap using dynamic data from menu API
 */
async function generateSitemap() {
  console.log("🚀 Generating dynamic sitemap from menu API...");

  try {
    // Import and call the sitemap function from sitemap.js
    const sitemapFunction = await importSitemapFunction();
    console.log("📡 Fetching data from menu API...");

    const sitemapData = await sitemapFunction();
    console.log(`📊 Retrieved ${sitemapData.length} URLs from API`);

    // Convert the sitemap data to the format needed for XML generation
    const routes = convertSitemapDataToRoutes(sitemapData);

    // Sort routes by priority (descending) and then alphabetically
    routes.sort((a, b) => {
      if (b.priority !== a.priority) {
        return parseFloat(b.priority) - parseFloat(a.priority);
      }
      return a.url.localeCompare(b.url);
    });

    // Generate XML content
    const sitemapXml = generateSitemapXml(routes);

    // Write to file
    writeSitemap(sitemapXml, OUTPUT_PATH);

    console.log(`📊 Total URLs in sitemap: ${routes.length}`);
    console.log("\n📋 Generated URLs by priority:");

    // Group and display URLs by priority
    const priorityGroups = {};
    routes.forEach((route) => {
      const priority = route.priority;
      if (!priorityGroups[priority]) {
        priorityGroups[priority] = [];
      }
      priorityGroups[priority].push(route);
    });

    Object.keys(priorityGroups)
      .sort((a, b) => parseFloat(b) - parseFloat(a))
      .forEach((priority) => {
        console.log(`\n  Priority ${priority}:`);
        priorityGroups[priority].forEach((route) => {
          const fullUrl = route.url.startsWith("http")
            ? route.url
            : `https://gstsa1.org${route.url}`;
          console.log(`    - ${fullUrl}`);
        });
      });
  } catch (error) {
    console.error("❌ Error generating sitemap:", error);
    console.error(
      "💡 Make sure the menu API is accessible and returning valid data"
    );

    // Fallback: generate basic sitemap with static routes
    console.log("\n🔄 Falling back to static routes...");
    const fallbackRoutes = [
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
        url: "/case-study-main",
        lastmod: new Date().toISOString(),
        changefreq: "weekly",
        priority: "0.9",
      },
      {
        url: "/verify-halal",
        lastmod: new Date().toISOString(),
        changefreq: "monthly",
        priority: "0.8",
      },
    ];

    const fallbackXml = generateSitemapXml(fallbackRoutes);
    writeSitemap(fallbackXml, OUTPUT_PATH);
    console.log("✅ Fallback sitemap generated with basic routes");
  }
}

// Run the sitemap generation
generateSitemap();

export { generateSitemap };
