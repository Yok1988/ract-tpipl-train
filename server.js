require("dotenv").config();
const express = require("express");
const sql = require("mssql");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

console.log("🌍 API Ready at:", `http://localhost:${PORT}`);
console.log("🔗 Database Config:", {
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
});

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: false, // ใช้ false ถ้าเป็น Local SQL Server
    trustServerCertificate: true,
  },
};

// เชื่อมต่อ SQL Server
sql.connect(config)
  .then(() => console.log("✅ Database Connected!"))
  .catch((err) => console.log("❌ Database Connection Failed:", err));

// 📌 API ดึงข้อมูลจาก `InventTable`
app.get("/invent", async (req, res) => {
  try {
    const result = await sql.query("SELECT * FROM InventTable WHERE DATAAREAID = 'HC' "); 
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send("❌ Error fetching data");
  }
});

// 📌 API ดึงข้อมูลจาก `CustTable`
app.get("/cust", async (req, res) => {
  try {
    const result = await sql.query("SELECT * FROM CustTable WHERE DATAAREAID = 'HC' "); 
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send("❌ Error fetching data cust");
  }
});


// 📌 API ดึงข้อมูลจาก `SalesTable`
app.get("/sales", async (req, res) => {
  try {
    const result = await sql.query("SELECT * FROM SalesTable WHERE DATAAREAID = 'HC' AND TPI_DPBUSDATE BETWEEN DATEADD(month, DATEDIFF(month, 0,  GETDATE()), 0) AND GETDATE()"); 
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send("❌ Error fetching data");
  }
});

const PORT = process.env.PORT || 5000;
//app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
app.listen(PORT, "0.0.0.0", () => console.log(`🚀 Server running on port ${PORT}`));

