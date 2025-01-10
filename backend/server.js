import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.js';
import matchRoutes from "./routes/matchRoutes.js";
import teamsRoutes from "./routes/teamRoutes.js"




const app = express();
app.use(cors()); // Allow requests from the frontend



app.use(bodyParser.json());
app.use('/auth', authRoutes); // Authentication routes
app.use('/matches', matchRoutes); // Match routes
app.use("/teams", teamsRoutes); // Team routes


// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the Soccer bets API!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
