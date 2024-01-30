const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require ('./routes/authRoutes')
const {notFound, errorHandler} = require('./middleware/errorMiddleware')
const app = express();
app.use(cors());
app.use(express.json()); //to accept json data

mongoose.connect('mongodb+srv://psr8084:qSC0l4WvW6U6KWXC@cluster0.d2kjzik.mongodb.net/CRUD-APP-Login');
app.use('/', userRoutes)
app.use('/api/user',authRoutes);

app.use(notFound)
app.use(errorHandler)

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
