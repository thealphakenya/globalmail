// Import the required modules
const ghpages = require('gh-pages');
const path = require('path');

// The directory to deploy (ensure the 'dist' folder exists after build)
const deployDirectory = path.join(__dirname, 'dist'); // Assuming 'dist' folder is where your built files are

// Publish to GitHub Pages
ghpages.publish(deployDirectory, {
  branch: 'gh-pages', // The branch to deploy to (this is where GitHub Pages will be served from)
  repo: 'git@github.com:thealphakenya/globalmail.git', // Your GitHub repository URL
  user: {
    name: 'thealphakenya', // Your GitHub username
    email: 'rovicviccy@gmail.com' // Your GitHub email
  },
  dotfiles: true, // Include dotfiles like .gitignore if present
  message: 'Deploy to GitHub Pages', // Custom commit message for deployment
  noVerify: true // Skip verification checks that might cause issues during deployment
}, (err) => {
  // Handle the callback and log deployment status
  if (err) {
    console.error('Deployment failed:', err);
  } else {
    console.log('Deployment successful!');
  }
});
