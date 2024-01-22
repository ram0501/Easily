import multer from "multer";
import path from "path";
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(path.resolve(), "src", "staticFiles", "resume"));
  },
  filename: (req, file, cb) => {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

export const resumeUpload = multer({ storage: storageConfig });
