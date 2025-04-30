require('dotenv').config(); // Load environment variables from .env file
const fileProcess = process.env.FILE_PATHS;
const filePath = fileProcess.split(`,`);
const { v2: cloudinary } = require('cloudinary'); // Use `require` instead of `import`

// Configure Cloudinary with credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});







filePath.forEach((filePath)=>{
  cloudinary.uploader.upload(filePath, {
    folder: 'Images of project Urban Aura', // Specify folder name
    resource_type: 'image', // Specify resource type as image
  })
    .then(result => console.log('Uploaded URL:', result.url)) // Log the uploaded URL
    .catch(error => console.error('Error:', error)); // Catch and log any errors
})


