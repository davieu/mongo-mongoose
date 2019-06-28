Just a simple express/mongo and mongoose app. It is connected with mongodb atlas. change the connection string to yours if you want it to work. Uses async/await!

to use:
git clone this repo
npm install
make a dev.js file in the config folder. Put your connection string in there like so EX:
module.exports = {
  mongoURI: 'mongodb+srv://ddfdfssf:dsfsdfd@cluster0-vgyon.mongodb.net/people?retryWrites=true&w=majority'
}

Should work once you put your connection string and use postman to make your api calls.

in your cmd prompt once you are in mongo-api folder type: npm run dev
Once you run that the dev server will start and you can begin making calls.

to post: Use postman. then hit the 'post' tab. then type in: http://localhost:3000/api/person
then click on 'headers'. Once on 'headers'  click on 'key' then type 'Content-Type' and on 'value' type 'application/json'. Then click on 'body' then the 'raw' bubble. 
then in the input type the object you want to add. Has to be firstname and lastname in json format like so: 

{
	"lastname": "sdfsdf",
	"firstname": "sdfsdf"
}

lastly you can change from 'post' to 'get'. Then type in: http://localhost:3000/api/people
this will show you all the people you added. 

There is also a 'put' and 'delete' request

