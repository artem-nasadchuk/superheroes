import multer from 'multer';

export const uploadMiddleware = (maxFiles) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './frontend/public/uploads');
    },
    filename: (req, file, cb) => {
      const filename = `${Date.now()}-${file.originalname}`;
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
      next();
    });
  };
};
