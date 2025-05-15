import express from 'express';
import cors from 'cors';
import router from './routes';

const app = express();

app.use(cors({
  origin: '*', // 通配符允许所有源
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // 允许的方法
  allowedHeaders: ['Content-Type', 'Authorization'] // 允许的头部
}));
app.use(router)

const port = 4000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});