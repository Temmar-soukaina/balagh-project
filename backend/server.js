const express = require('express');
const connectDB = require('./dbconnect');
const cors = require('cors');
const app = express();
app.use(cors());
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use('/uploads', express.static('uploads'));
const authRoutes = require('./routes/auth');
const complaintRoutes = require('./routes/complaint');
app.use('/api', complaintRoutes);
app.use('/api', authRoutes);


// Serve frontend only if bundled files exist; otherwise expose a health route
const distDir = path.join(__dirname, 'dist');
if (fs.existsSync(distDir)) {
    app.use(express.static(distDir));
    app.get('/', (req, res) => {
        res.sendFile(path.join(distDir, 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.json({ status: 'ok' });
    });
}

// In serverless environments (e.g., Vercel), export the app.
if (process.env.VERCEL) {
    module.exports = app;
} else {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}