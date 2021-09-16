const multer = require("multer");
const moment = require("moment");
import path from 'path';

const storage = multer.diskStorage({
  //@ts-ignore
  destination(req, file, cb) {
    cb(null, path.join(__dirname, "../../../frontend/public/uploads/"))
  },
  //@ts-ignore
  filename(req, file, cb) {
    const date = moment().format("DDMMYYYY-HHmmss_SSS")
    cb(null, `${date}-${file.originalname}`)
  }
})
//@ts-ignore
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const limits = {
  fileSize: 1024 * 1024 * 5
}

const multerFunc = multer({
  storage,
  fileFilter,
  limits,
});

module.exports = multerFunc;