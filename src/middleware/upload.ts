import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

dotenv.config()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const uploadDir = process.env.UPLOAD_DIR || './uploads';
if(!fs.existsSync(uploadDir)){
   fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, uploadDir)
   },
   filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
})

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedExtensions = ['.pdf', '.doc', '.docx', '.txt'];
   const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document','text/plain'];
   if(allowedTypes.includes(file.mimetype) || allowedExtensions.includes(path.extname(file.originalname).toLowerCase())){
        cb(null, true);
   }
   else{
    console.log(`Rejected file: ${file.originalname} with type ${file.mimetype}`);
        cb(new Error('Invalid file type. Only PDF, Word, and text files are allowed.'));
   }
   }
const upload = multer({ storage: storage,
fileFilter: fileFilter,
limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
    files: 5, // Max 5 files per request
}
 })

export  default upload