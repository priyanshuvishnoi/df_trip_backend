import fs from 'fs-extra';
import aws from 'aws-sdk';

const s3 = new aws.S3({
  region: process.env.AWS_BUCKET_REGION,
});

export const uploadFileToS3 = (file: Express.Multer.File, folder: string) => {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Body: fileStream,
    Key: `${folder}/${file.filename}`,
  };

  return s3.upload(uploadParams).promise();
};

export const getFileStreamFromS3 = (fileKey: string) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: process.env.AWS_BUCKET_NAME!,
  };
  try {
    return s3.getObject(downloadParams).createReadStream();
  } catch (err) {
    console.error(err);
  }
};

exports.removeFileFromS3 = (fileKey: string) => {
  const objectParams = {
    Key: fileKey,
    Bucket: process.env.AWS_BUCKET_NAME!,
  };

  return s3.deleteObject(objectParams).promise();
};
