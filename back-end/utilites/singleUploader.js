const createHttpError = require('http-errors');
const multer = require('multer');
const path = require('path');
function uploader(subfolder_path, allowed_file_type, max_file_size, error_msg) {

    const UPLOAD_FILE = path.join(__dirname, `/../public/uploads/${subfolder_path}`)

    const storage = multer.diskStorage({
        destination: (req, file, cb)=> {
            cb(null, UPLOAD_FILE);
        },
        filename: (req, file, cb) => {
            const fileExt = path.extname(file.originalname);
            const fileName = file.originalname.replace(fileExt, '').toLowerCase().split(' ').join('-') + '-' + Date.now();
            cb(null, fileName + fileExt);
        }
    })



    const upload = multer({
        storage: storage,
        limits: {
            fileSize: max_file_size,
        },
        fileFilter: (req, file, cb)=> {
            if(allowed_file_type.includes(file.mimetype)) {
                console.log(file)
                cb(null, true);
            } else {
                cb(createHttpError(error_msg))
            }
        }
    })


    return upload;
}



module.exports = uploader;