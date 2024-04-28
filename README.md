

Link to hosted version: https://backend-project-2yjd.onrender.com/

Part of the Northcoders software development bootcamp, this project entails building a backend system. The system consists of a RESTful API tailored for managing data operations on "NC News." This platform mirrors a social news aggregation site, akin to Reddit, facilitating the creation, retrieval, updating, and deletion of articles and comments. The API offers endpoints to interact with a PostgreSQL database which houses the content.

To access this project you must first clone the repo using the following command;

git clone https://github.com/HarisKhan2212/backend-project.git

In order to correctly run the the files you will need the following.

Node.js (v21.4.0 or later)
PostgreSQL (v14.10 or later)


You must then install the needed dependencies using the command "npm install *" replacing the * each time with the following:

dotenv
express
pg
husky
pg-format
supertest
jest
jest-extended
jest-sorted

In order to connect the 2 databases locally you will need to create the '.env' files to the test and development databases and to have them include "PGDATABASE=*" replacing the * with te following for each seperate file:

nc_news
nc_news_test

The next step is to begin running the following commands to get ready to test.

npm run setup-dbs 
npm test app.test.js
npm run seed
npm start

after following these instructins the test suite will now begin running which you will be able to see in your console.


