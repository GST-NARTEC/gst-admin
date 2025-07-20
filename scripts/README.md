# Sitemap Generation

This project includes an automated sitemap generation script that creates a `sitemap.xml` file for SEO purposes.

## How it works

The sitemap generation is handled by the `scripts/generate-sitemap.js` file, which:

1. **Defines static routes** from the React application
2. **Includes dynamic routes** that exist on the website
3. **Generates XML** in the proper sitemap format
4. **Sorts URLs** by priority and alphabetically
5. **Outputs to** `public/sitemap.xml`

## Configuration

The script can be configured by modifying the following variables in `scripts/generate-sitemap.js`:

- `BASE_URL`: The base URL of your website (currently: https://gstsa1.org)
- `staticRoutes`: Array of main application routes
- `dynamicRoutes`: Array of additional website pages

## Usage

### Manual Generation

```bash
npm run generate:sitemap
```

### Automatic Generation (during build)

The sitemap is automatically generated during the build process:

```bash
npm run build
```

The build process:

1. Generates the sitemap
2. Builds the Vite application
3. Copies web.config to dist folder
4. Shows completion message

## Route Configuration

### Static Routes (from React Router)

- `/` - Homepage (Priority: 1.0)
- `/user-guide-manual` - User guide (Priority: 0.8)
- `/verify-halal` - Halal verification (Priority: 0.8)
- `/case-study` - Case studies (Priority: 0.9)

### Dynamic Routes (CMS/Additional Pages)

- `/fixed-asset-tracking-system`
- `/mobile-application`
- `/label-design-printing-1d2d`
- `/warehouse-management-system`
- `/e-commerce-solutions`
- `/contact-us`

## Adding New Routes

To add new routes to the sitemap:

1. Open `scripts/generate-sitemap.js`
2. Add the route to either `staticRoutes` or `dynamicRoutes` array
3. Specify the route properties:
   - `url`: The path (without domain)
   - `lastmod`: Last modification date
   - `changefreq`: How often it changes (daily, weekly, monthly, yearly)
   - `priority`: Priority (0.0 to 1.0)

Example:

```javascript
{
  url: '/new-page',
  lastmod: new Date().toISOString(),
  changefreq: 'monthly',
  priority: '0.7'
}
```

## Output

The generated sitemap includes:

- ✅ Proper XML structure
- ✅ All URLs with full domain
- ✅ Last modification dates
- ✅ Change frequencies
- ✅ Priority values
- ✅ Sorted by priority and alphabetically
