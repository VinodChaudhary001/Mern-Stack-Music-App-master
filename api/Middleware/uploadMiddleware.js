const multer = require('multer');

// Configure storage and file naming
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination directory for uploaded files
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Set the file name for uploaded files
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Create the Multer middleware instance
const upload = multer({ storage: storage });

// Export the middleware for use in routes
module.exports = upload;
