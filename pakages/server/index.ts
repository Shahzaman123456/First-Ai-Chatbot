import express from 'express';
import dotenv from 'dotenv'; // For loading environment variables
import router from './routes';

dotenv.config({ path: './pakages/server/.env' });

const app = express();
app.use(express.json());
app.use(router);
const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
   console.log(`Server running at http://localhost:${PORT}`);
});
