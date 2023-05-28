import multer from 'multer';

export const uploadMiddleware = (maxFiles) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './backend/src/uploads');
    },
    filename: (req, file, cb) => {
      const filename = file.originalname;
      cb(null, filename);
    },
  });

  const upload = multer({
    storage,
  }).array('images', maxFiles);

  return (req, res, next) => {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ error: 'File size exceeds the limit.' });
        }
      } else if (err) {
        return res.status(500).json({ error: 'Failed to upload files.' });
      }
      console.log('Uploaded files:', req.files);
      next();
    });
  };
};
