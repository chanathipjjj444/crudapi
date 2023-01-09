const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const members = require("./route/api/Members");
const uuid = require("uuid");

const app = express();
const port = 3000;

//space to keep the book
let books = [];

app.use(cors());
app.use(express.json());

//Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false })); //handle the form submission
app.use(bodyParser.json());

app.get("/", (req, res) => {
  //refer to the html file and use it in /
  res.sendFile(__dirname + "/new-book.html");
});

app.get("/books", (req, res) => {
  res.json(members);
});

app.post("/book", (req, res) => {
  const newMember = {
    id: uuid.v4(), //this is from the npm uuid to simulate mogodb prostgruos that normally give us an id
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "Please include name and email" });
  }

  members.push(newMember);
  console.log(members);
  res.json(members);
});

app.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    const updMember = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updMember.name ? updMember.name : member.name;
        member.email = updMember.email ? updMember.email : member.email;

        res.json({ msg: "Member update", member });
      }
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

app.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    res.json({
      msg: "Member deleted",
      members: members.filter(
        (member) => member.id !== parseInt(req.params.id)
      ),
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
