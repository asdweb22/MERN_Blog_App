Blog Website using mern stack website
----------------------------------------------------------------------------------
********react app execution flow
->app.js (integrate with)->main.js/index.js then his id integrate with->then index.html


1)Frontend: React js , material ui
---------------------------------

2)Backend : Node js Express Js
--------------------------------
Database: Mongo Db
->locally we can install or online we can use 
->compass mongodb GUI for mongo db throught we can see able to see tables database easy interface


Express js
A)framework of node js to create rest apis
B)


3)Project setup react app >
A) ->npm create vite@latest    (client)
b)Integrate Boostrap cdn
c)integrate material ui into your project ->npm install @mui/material @emotion/react @emotion/styled
------------------------------------------------------------------------------------------------------

4)create signup  and Login page and enable switching between login and Signup page based onclick button
A)Login and signup page created and switching

-----------------------------------------------------------------------------------------------------------


5)Create server project folder
----------------------------------------------------------------------------------
a) go to server folder (server)
b) npm init will create package.json file for you to enable other required packages
c) npm i express
d) npm i -D nodemon (server restart automaitcally if changes are detected) only required at the time of developement 



6)Database connection
A)create account on mongodb server 
b)create project on server (project 0)->then create cluster means database free  name(blog-app)  
c) set username and password who will access your database  username: akshay password: asdadmin123



7)secure confidential information
-----------------------------------------------------------------------------------------------------------------------------
A)-> npm i dotenv   
B)-> create file .env and set confidential info in that file & access wherever you want import dotenv from dotenv using process.env_variableName 



8)