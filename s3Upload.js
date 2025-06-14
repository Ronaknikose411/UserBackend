import dotenv from "dotenv";
dotenv.config();


// imports
import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";


const client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});


const folder = "upload";


export const avatarUpload = multer({
  storage: multerS3({
    bucket: process.env.AWS_S3_BUCKET_NAME,
    s3: client,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (_req, file, cb) => {


      const ext = path.extname(file.originalname);
     
      cb(null, `${folder}/${Date.now()}${ext}`);
    },
  }),
});





/* import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import multer from "multer";
import multerS3 from "multer-s3";

dotenv.config();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const folder = "customer"
// Configure multer to use S3 for storage
const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.AWS_S3_BUCKET_NAME,

    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, `${folder}${Date.now().toString()}-${file.originalname})`
  )},
  }),
});

export { s3Client, upload }; */