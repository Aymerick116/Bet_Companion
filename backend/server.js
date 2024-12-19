import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.js';
import matchRoutes from "./routes/matchRoutes.js";




const app = express();

app.use(bodyParser.json());
app.use('/auth', authRoutes); // Authentication routes
app.use('/matches', matchRoutes); // Match route routes

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the Soccer bets API!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
