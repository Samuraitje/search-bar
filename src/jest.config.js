const config = {
   verbose: true,
   setupFilesAfterEnv: ['<rootDir>/setupTests.js']
 };
 
 module.exports = config;
 
 // Or async function
 module.exports = async () => {
   return {
     verbose: true,
   };
 };