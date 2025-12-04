import * as path from 'node:path';
import {fileURLToPath} from 'node:url';
import multer from 'multer'
import * as fs from 'node:fs';
import express from 'express';
import {fileExists, mergeChunk, uploadChunk} from './router_handle/uploadChunk.js';
// 创建一个路由器实例
const router = express.Router()
// 获取当前文件的路径
const __filename = fileURLToPath(import.meta.url);
// 获取当前文件所在的目录路径
const __dirname = path.dirname(__filename);
// 定义上传目录路径
const UPLOAD_DIR = path.join(__dirname, '../uploads');
// 如果上传目录不存在，则创建上传目录
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR);
}

/**
 * 配置 multer 进行文件切片上传
 *
 * @param {Object} req - Express 请求对象，用于获取文件哈希
 * @param {Object} file - 当前正在处理的文件对象
 * @param {Function} cb - 回调函数，用于确定文件的存储位置和文件名
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 从请求体中获取文件哈希值
    const {fileHash} = req.body;
    // 构建文件切片的目录路径
    const chunkDir = path.join(UPLOAD_DIR, fileHash);
    // 如果文件切片目录不存在，则创建该目录
    if (!fs.existsSync(chunkDir)) {
      fs.mkdirSync(chunkDir, {recursive: true});
    }
    // 设置文件切片的存储目录
    cb(null, chunkDir);
  },
  filename: (req, file, cb) => {
    // 从请求体中获取文件切片的哈希
    const {chunkHash} = req.body;
    // 设置文件切片的名称
    cb(null, `chunk-${chunkHash}`);
  }
});
// 初始化 multer 中间件
const upload = multer({storage});

// 分片上传接口
router.post('/chunk', upload.single('file'), uploadChunk);

// 合并上传文件
router.post('/merge', mergeChunk);

// 检查分片是否完成上传
router.post('/status', fileExists);

export default router;
