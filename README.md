# sji-fe-workflow
Front End Workflow for Web Developers at SJInnovation

Requirements:

Install Node.js

Install Gulp globally, run command 'npm install gulp-cli -g'

How to Run:

Run 'npm install' from project root folder

Update gulpfile.js in the root folder as mentioned below:

    browserSync.init({  
      proxy: "localhost/wordpress/" /* replace with your vhost domain name like sitename.sj*/    
    });
    
Run 'gulp serve' 
