const express = require('express');
const app = express();
const connectDB = require('./config/db');
const PORT = process.env.PORT || 3001;

//Production
var compression = require('compression')
app.use(compression())

//Connect to mongoDB
connectDB();

//init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

//Use routes
app.use('/users', require('./routes/api/users'));
app.use('/auth', require('./routes/api/auth'));
app.use('/profile', require('./routes/api/profile'));
app.use('/tasks', require('./routes/api/tasks'));
app.use('/subjects', require('./routes/api/subjects'));

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
