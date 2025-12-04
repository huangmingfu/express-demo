import path from 'node:path';
import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import crypto from 'node:crypto';

// 是否存在上传目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 是否存在上传目录
const UPLOAD_DIR = path.join(__dirname, '../../uploads');

export const uploadChunk = async (req, res) => {
  
  if (!req.file) {
    return res.status(500).json({message: '没有文件上传', code: 500});
  }
  
  res.send({
    data: req.body,
    message: '切片上传完成',
    code: 200
  });
};

/**
 * 合并文件
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
export const mergeChunk = async (req, res) => {
  const {fileName, fileHash, totalChunks, chunk} = req.body;
  const chunkDir = path.join(UPLOAD_DIR, fileHash);
  const finalPath = path.join(UPLOAD_DIR, fileName);
  
  try {
    // 读取分片目录中的所有文件
    const chunks = await fs.promises.readdir(chunkDir)
    // 过滤并排序分片，确保它们按正确顺序合并
    const sortedChunks = sortFileChunk(chunks.filter(file => file.startsWith('chunk-')), chunk)
    // 如果分片数量不匹配，返回错误响应
    if (sortedChunks.length !== totalChunks) {
      return res.send({
        message: '分片不完整',
        code: 500
      });
    }
    // 使用流式方式合并文件
    const writeStream = fs.createWriteStream(finalPath, {flags: 'a'});
    for (const chunk of sortedChunks) {
      const chunkPath = path.join(chunkDir, chunk);
      
      // 异步检查文件是否存在
      await fs.promises.access(chunkPath, fs.constants.F_OK);
      // 创建读取流并合并到最终文件中
      const readStream = fs.createReadStream(chunkPath);
      
      await new Promise((resolve, reject) => {
        readStream.pipe(writeStream, {end: false}); // 不自动结束写入流
        readStream.on('end', resolve);
        readStream.on('error', reject);
      });
      // 删除已经合并的分片
      await fs.promises.unlink(chunkPath);
    }
    
    
    // 结束写入
    writeStream.end();
    
    // 删除分片文件夹
    await fs.promises.rmdir(chunkDir);
    
    return res.send({
      message: '文件上传成功',
      data: {
        fileName,
        pathUrl: `/uploads/${fileName}`
      },
      code: 200
    });
    
  } catch (error) {
    console.error('合并出现错误：', error);
    return res.status(500).send({
      message: '合并文件失败',
      error: error.message,
      code: 500
    });
  }
};

/**
 * 检查文件是否存在，检验文件切片是否存在
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
export const fileExists = async (req, res) => {
  const {fileName, fileHash, chunkHash} = req.body
  
  const filePath = path.join(UPLOAD_DIR, fileName); // 最终文件路径
  const chunkDir = path.join(UPLOAD_DIR, fileHash); // 分片文件夹路径
  
  try {
    // 检查文件是否存在
    if (fs.existsSync(filePath)) {
      const existingFileHash = calculateFileHash(filePath);
      // 如果哈希值一致则不用上传
      if (existingFileHash === fileHash) {
        return res.send({
          code: 200,
          data: {
            fileName,
            pathUrl: `/uploads/${fileName}`
          },
          message: '文件已存在'
        });
      } else {
        // 如果不一致则更改本次上传的文件名称，通知前端继续上传
        // 如果文件哈希值不一致，生成新的文件名
        const nameArr = fileName.split('.');
        let baseName, extension;
        
        if (nameArr.length > 1) {
          baseName = nameArr.slice(0, -1).join('.');
          extension = nameArr[nameArr.length - 1];
        } else {
          baseName = fileName;
          extension = '';
        }
        
        // 生成新的文件名
        const newFileName = `${baseName}-${Date.now()}.${extension}`
        return res.send({
          code: 200,
          data: {
            fileName: newFileName
          },
          message: '文件名重复，已修改'
        })
      }
    }
    
    // 检查是否用该哈希值的文件夹
    if (!fs.existsSync(chunkDir)) {
      return res.send({
        code: 200,
        message: '允许上传',
        data: []
      });
    }
    
    // 如果文件夹存在，则对比子文件和 chunkHash , 返回已经上传的切片的哈希值
    const chunks = fs.readdirSync(chunkDir);
    const uploadedChunks = chunks
        .filter((chunk) => chunk.startsWith('chunk-'))
        .map((chunk) => chunk.split('-')[1]); // 提取分片的哈希值
    
    return res.send({
      code: 200,
      data: {
        uploadedChunks
      },
      message: '分片已存在'
    })
    
  } catch (e) {
    console.error('检查分片状态出错：', e);
    return res.status(500).send({
      code: 500,
      message: '服务器错误',
      error: e.message
    });
  }
};

/**
 * 计算文件的哈希值
 * @param filePath
 * @returns {string}
 */
function calculateFileHash(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  return crypto.createHash('md5').update(fileBuffer).digest('hex');
}

/**
 * 对文件切片进行排序
 * @param fileList
 * @param chunk
 * @returns {*[]}
 */
function sortFileChunk(fileList, chunk) {
  let chunkList = []
  let chunkSort = chunk.sort((a, b) => a.index - b.index)
  chunkSort.forEach(item => {
    let fileItem = fileList.find(file => file.startsWith(`chunk-${item.fileHash}`))
    chunkList.push(fileItem)
  })
  return chunkList
}
