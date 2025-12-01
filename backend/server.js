const express = require('express');
const connectDB = require('./dbconnect');
const cors = require('cors');
const app = express();
app.use(cors());
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use('/uploads', express.static('uploads'));
const authRoutes = require('./routes/auth');
const complaintRoutes = require('./routes/complaint');
app.use('/api', complaintRoutes);
app.use('/api', authRoutes);


app.use(express.static(path.join(__dirname, 'dist')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});