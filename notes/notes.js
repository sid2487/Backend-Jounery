// step1: Initiailize a project(npm init) -->> this will create a package.json file. now change to "type" : "module" (if you want to use module base system). while installing when it asks for entry point, change it to src/index.js

// step2: install some dev dependencies -->> (npm i -D nodemon prettier)(used for the development only not for production)
// now enable prettier: create a file (.prettierc) -->> inside the file {"singleQuote": false, "bracketSpacing": "true", "tabWidth": 2, "trailingComma": "es5", "semi": true}
// now create another file (.prettierignore) -->> /.vscode /node_modules ./dist *.env .env .env.*

// step3: create a src folder, now create multiple folders in src.(mkdir controllers db middlewares models routes utils), and now create multiple files in src too.(touch app.js index.js constants.js .env .env.samples .readme.md)
// now (touch db/index.js) for database connections. 
// then (touch models/comment.models.js like.models.js playlist.models.js subscription.models.js tweet.models.js user.models.js video.models.js)

// step4: now install express and mongoose(npm i express mongoose)

// step5: to run it, create your own scripts, inside the package.json-->> scripts -->> add("start": "node src/index.js") but its not constantly running, now add below the above ("dev": "nodemon src/index.js") use npm run dev.

// for dot env -->> touch .env .env.sample -->> npm i dotenv -->> add PORT = xyz in .env file -->> in main index.js file, import it -->> in the same file 
// dotenv.config({
//     path: "./.env"
// })       

// if npm run dev will not work then modify nodmon in package.json

// now who should be able to talk to your db for that -->> npm i cors

// work of each folders: 
// 1: Controllers: all the functionalities
// 2: db: how to connect database
// 3: middlewares: the code which you want to run in the middles
// 4: models: database modelling 
// 5: routes: to route in between the files and folders.
// 6: utills: utilities(like file upload, mailing) the funcitonalities which will repeat so often.

// setup database then install mongoose, dotenv, express

// important points: db se jb v baat kro try catch use and take care of async await

// install cors and cookie parser too.
// use app.use() whenever you are using any middle ware or any config setting.

// install mongoose agregate paginate for watch history(help in writing aggregation query)
// install bcrypt(helps you to hash your password)
// install jsonwebtoken(jwt) -->> its a bearer token, its like a key, whoever send this token, we will send the data.

// for file uploads, we'll use: multer/express-fileupload, cloudinary
/*
🔁 The Real Flow(with roles):
🧍‍♂️User on frontend → selects an image and hits “Upload”

🌐 The browser → sends the image in a multipart / form - data request

🤖 Express server(you) → receives the request but can’t read files yet

🧰 Multer(your helper) → intercepts the request, extracts the file, gives it to Express

📤 Express(you) → now takes that file and uploads it to Cloudinary

☁️ Cloudinary → stores the image and gives you a URL

📦 Express(you) → stores that URL in the database or sends it back to frontend
*/