const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

//space to keep the book
let books = [];

app.use(cors());

//Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/", (req,res) =>{
  //refer to the html file and use it in /
  res.sendFile(__dirname + '/new-book.html');
})



app.post('/book', (req, res) => {

  //add a book in the book array
  const book = req.body;
  //Outout the book to the console for debugging
  console.log(book);
  books.push(book);
  res.send("Book is sent to the database");

});

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);

