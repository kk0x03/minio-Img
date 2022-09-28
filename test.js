import {fileURLToPath} from 'url';
import {dirname, resolve} from 'path';
import { Client } from 'minio';

// 获取命令行参数
const argv = process.argv;
const file1 = argv[2];
const file2 = argv[3];

// 初始化minioClient
const minioClient = new Client({
  endPoint: '你的IP',
  port: 9000,
  useSSL: false,
  accessKey: '你的账户',
  secretKey: '你的密码'
});
const metaData = {
  'Content-Type': 'application/octet-stream',
  'X-Amz-Meta-Testing': 1234,
  'example': 5678
}

// 上传文件fput(bucket名字，文件名，文件路径，metaData，回调函数)
minioClient.fPutObject('myblog', file1, file1, metaData, function(err, etag) {
  if (err) return console.log(err)
  //console.log('File uploaded successfully.')
});
minioClient.fPutObject('myblog', file2, file2, metaData, function(err, etag) {
  if (err) return console.log(err)
  //console.log('File uploaded successfully.')
});


// 取上传成功的文件link，并打印
const presignedUrl1 = minioClient.presignedGetObject('myblog', file1, 1000, function(e, presignedUrl) {
  if (e) return console.log(e)
  console.log(presignedUrl)
})
const presignedUrl2 = minioClient.presignedGetObject('myblog', file2, 1000, function(e, presignedUrl) {
  if (e) return console.log(e)
  console.log(presignedUrl)
})