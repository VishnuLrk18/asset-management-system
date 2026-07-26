const express = require("express");
const path = require("path");

const sequelize = require("./config/database");

// ==============================
// Import Models
// ==============================

const Employee = require("./models/Employee");
const Category = require("./models/Category");
const Asset = require("./models/Asset");
const AssetIssue = require("./models/AssetIssue");
const AssetReturn = require("./models/AssetReturn");

// ==============================
// Model Associations
// ==============================

// Category → Asset
Category.hasMany(Asset, {
    foreignKey: "categoryId"
});

Asset.belongsTo(Category, {
    foreignKey: "categoryId"
});

// Employee → AssetIssue
Employee.hasMany(AssetIssue, {
    foreignKey: "employeeId"
});

AssetIssue.belongsTo(Employee, {
    foreignKey: "employeeId"
});

// Asset → AssetIssue
Asset.hasMany(AssetIssue, {
    foreignKey: "assetId"
});

AssetIssue.belongsTo(Asset, {
    foreignKey: "assetId"
});

// AssetIssue → AssetReturn
AssetIssue.hasOne(AssetReturn, {
    foreignKey: "issueId"
});

AssetReturn.belongsTo(AssetIssue, {
    foreignKey: "issueId"
});

// ==============================
// Import Routes
// ==============================

const employeeRoutes = require("./routes/employeeRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const assetRoutes = require("./routes/assetRoutes");
const assetIssueRoutes = require("./routes/assetIssueRoutes");
const assetReturnRoutes = require("./routes/assetReturnRoutes");
const stockRoutes = require("./routes/stockRoutes");
const historyRoutes = require("./routes/historyRoutes");
const scrapRoutes = require("./routes/scrapRoutes");

// ==============================
// Create Express App
// ==============================

const app = express();

// View Engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ==============================
// Routes
// ==============================

app.use("/employees", employeeRoutes);
app.use("/categories", categoryRoutes);
app.use("/assets", assetRoutes);
app.use("/issues", assetIssueRoutes);
app.use("/stock", stockRoutes);
app.use("/returns", assetReturnRoutes);
app.use("/scrap", scrapRoutes);
app.use("/history", historyRoutes);

// Dashboard
app.get("/", async (req, res) => {

    try {

        const employeeCount = await Employee.count();
        const categoryCount = await Category.count();
        const assetCount = await Asset.count();
        const issuedCount = await AssetIssue.count({
            where: {
                status: "Issued"
            }
        });

        res.render("index", {
            employeeCount,
            categoryCount,
            assetCount,
            issuedCount
        });

    } catch (error) {

        console.error(error);
        res.send("Dashboard Error");

    }

});

// ==============================
// Database Connection
// ==============================

sequelize.authenticate()
.then(() => {
    console.log("✅ Database Connected Successfully");
})
.catch((err) => {
    console.error("❌ Database Connection Failed");
    console.error(err);
});

// ==============================
// Sync Database
// ==============================

sequelize.sync()
.then(() => {
    console.log("✅ Tables Synced Successfully");
})
.catch((err) => {
    console.error("❌ Error Syncing Tables");
    console.error(err);
});

// ==============================
// Start Server
// ==============================

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});