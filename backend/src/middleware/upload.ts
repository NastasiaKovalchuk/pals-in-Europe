const multer = require("multer");
const moment = require("moment");

const storage = multer.diskStorage({
  //@ts-ignore
  destination(req, file, cb) {
    cb(null, "src/uploads/")
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

module.exports = multer({
  storage,
  fileFilter,
  limits,
})
