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
router.get('/proxy/*', async (req: Request, res: Response) => {
  try {
    // 获取原始路径参数
    const targetPath = req.params[0]; // 获取 * 匹配的部分
    const queryParams = new URLSearchParams(req.query as any).toString();
    
    // 构建完整的目标URL
    const baseUrl = 'https://xxxxxx/address-xxxx/xxxx-address-tree'; // 基础URL
    const fullPath = `${baseUrl}/${targetPath}${queryParams ? '?' + queryParams : ''}`;
    
    // 转发请求
    const response = await axios.get(fullPath, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    res.json({ ...response.data, originalUrl: fullPath });
  } catch (error) {
    console.error('API请求失败:', error);
    res.status(500).json({ error: '获取数据失败' });
  }
});

router.use('/api/*', async (req: Request, res: Response) => {
  try {
    // 重构目标URL，替换主机部分
    const targetBaseUrl = 'https://xxxxxx/address-xxxx/xxxx-address-tree';
    const targetPath = req.params[0];
    const queryString = Object.keys(req.query).length 
      ? '?' + new URLSearchParams(req.query as any).toString() 
      : '';
    
    const targetUrl = `${targetBaseUrl}/${targetPath}${queryString}`;
    
    // 根据原始请求方法进行转发
    const response = await axios({
      method: req.method.toLowerCase(),
      url: targetUrl,
      headers: {
        'Content-Type': 'application/json'
      },
      data: req.body // 如果有POST数据也需要转发
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('代理请求失败:', error);
    res.status(500).json({ error: '代理请求失败' });
  }
});

export default router;