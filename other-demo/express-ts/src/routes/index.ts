import { Router, Request, Response } from 'express';
import axios from 'axios';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

router.get('/list', (req: Request, res: Response) => {
  res.status(200).json({ code: 200, message: "成功", data: [1, 2, 3] });
});

// 代理服务器转发，解决跨域
router.get('/a', async (req: Request, res: Response) => {
  try {
    const { id, level } = req.query;
    const url = `https://xxxxxx/address-xxxx/xxxx-address-tree?id=${id}level=${level}`; 
    const response = await axios.get(url, { // 会把id = undefined传过去；url.replaceAll('undefined','') 可以清除一下
      headers: {
        'Content-Type': 'application/json'
      }
    });
    res.json({ ...response.data, url });
  } catch (error) {
    console.error('API请求失败:', error);
    res.status(500).json({ error: '获取数据失败' });
  }
});

export default router;