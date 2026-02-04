// scripts/fix-stats.js
const fs = require("fs");
const path = require("path");

const statsPath = path.join(process.cwd(), ".next/server/webpack-stats.json");

try {
  console.log("🔧 Patching webpack-stats.json for Relative-CI...");

  if (!fs.existsSync(statsPath)) {
    console.error("❌ Stats file not found at:", statsPath);
    process.exit(1);
  }

  const stats = JSON.parse(fs.readFileSync(statsPath, "utf8"));
  let fixedCount = 0;

  // The 'modules' array contains the invalid entries
  if (stats.modules && Array.isArray(stats.modules)) {
    stats.modules = stats.modules.map((mod) => {
      let wasModified = false;

      // Fix 1: Turbopack sometimes outputs 'size: null' for CSS/Font modules
      if (mod.size === null || mod.size === undefined) {
        mod.size = 0;
        wasModified = true;
      }

      // Fix 2: Turbopack sometimes misses the 'type' field
      if (!mod.type) {
        mod.type = "module";
        wasModified = true;
      }

      if (wasModified) fixedCount++;
      return mod;
    });
  }

  fs.writeFileSync(statsPath, JSON.stringify(stats, null, 2));
  console.log(`✅ Patched ${fixedCount} invalid modules. Ready for upload.`);
} catch (err) {
  console.error("❌ Failed to patch stats:", err);
  process.exit(1);
}
