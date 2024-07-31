const express = require('express');
const path = require('path');
const { connectDB } = require('./config/db');
const sessionConfig = require('./config/session');
const sessionMiddleware = require('./middleware/sessionMiddleware');
const { userRoutes, scrollAvatarLogRoutes, reportRoutes } = require('./routes/index');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3000;

// app.use(cors({
//   origin: 'http://localhost:8000',
// }));

app.use(express.json());
app.use(sessionConfig); 
app.use(sessionMiddleware); 

// Routes
app.use('/api/users', userRoutes);
app.use('/api/scroll-avatar-event', scrollAvatarLogRoutes);
app.use('/api/report', reportRoutes);

//Use when run project without docker locally: Serve Vue.js static files
// app.use(express.static(path.join(__dirname, '../client/dist')));

//Use when run project without docker locally: Catch-all route to serve the Vue.js app
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
// });


// Connect to MongoDB and run the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});
