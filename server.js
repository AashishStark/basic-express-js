const express=require("express");
const bodyParser=require("body-parser");
const multer = require('multer');
const path = require('path');
var fs = require("fs");
const app=express()
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const upload = multer({
    dest: 'uploads/'
});
app.post('/submit-redirect', (req, res) => {
  const name = req.body.rename;
  res.redirect(`/welcome?name=${name}`);
});
app.get('/welcome', (req, res) => {
  const name = req.query.name;
  // Send a response with the HTML for the welcome page with the user's name
  res.send(`
    <html>
      <head>
        <title>Welcome Page</title><style type="text/css">
		h1 {color: darkred;}
		h2 {color: white;}
		body{background-color : indianred;}
	</style>
      </head>
      <body>
        <center><h1>Welcome, ${name}!</h1>
        	<h3>Year:3rd</h3>
			<h3>Department:IT</h3>
			<h3>DOB:08.06.03</h3>
			<h3>Age: 19</h3>
			<h3>Hobbies: Watching Series</h3><center>
			<br><h3><a href="https://en.wikipedia.org/wiki/MS_Dhoni">Visit this Link!!</a></h3>
        </center>
      </body>
    </html>
  `);
});

app.get('/submitt',(req,res)=>{
	const id=req.query.id;
	const name=req.query.ename;
	console.log("Employee's ID: "+id+" Name:"+name);
	res.send("Employee's ID: "+id+" Name:"+name);
});
app.post('/submit-form', upload.single('file'),(req,res)=> {
    // upload.single('file'), (req, res) => {
    console.log(req.body); // Form data
    console.log(req.file); // Uploaded file
    res.send('Form submitted successfully!');
});
let records=[
	{id:1,name:'Record 1'},
	{id:2,name:'Record 2'}
];

app.delete('/records/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = records.findIndex(record => record.id === id);
    if (index === -1) {
        res.status(404).json({ error: 'Record not found' });
    } else {
        records.splice(index, 1);
        res.json({ message: `Record with ID ${id} deleted` });
    }
});
app.get('/:id', function (req, res) {
   // First read existing user.
   fs.readFile( __dirname + "/" + "File.json", 'utf8', function (err, data) {
      var user = JSON.parse( data );
      var user = user["user" + req.params.id] 
      console.log( user );
      res.end( JSON.stringify(user));
   });
})


app.post('/addUser', function (req, res) {
   // First read existing user.
   fs.readFile( __dirname + "/" + "File.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      const name = req.body.name;
      const age = req.body.age;
      const language = req.body.language;
      var users={
      	"user4":{
      		"name" : name,
      		"age":age,
      		"language":language
      	}
      }
      data["user4"] = users["user4"];
      console.log( data["user4"] );
      res.end( JSON.stringify(data));
   });
})


app.get('/',(req,res)=>{
	res.sendFile(__dirname+'/get.html');
}); 

app.post('/submitt-post',(req,res)=>{
	const si=req.body.sid;
	const sn=req.body.sname;
	console.log("Student's ID: "+si+" Name:"+sn);
	res.send("Student's ID: "+si+" Name:"+sn);
}); 

app.listen(3000,()=>{
	console.log("Server listening at 3000");
}); 