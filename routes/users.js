const express = require('express');
const router = express.Router();

let users = [
{
firstName: "John",
lastName: "wick",
email:"johnwick@gamil.com",
DOB:"22-01-1990",
},
{
firstName: "John",
lastName: "smith",
email:"johnsmith@gamil.com",
DOB:"21-07-1983",
},
{
firstName: "Joyal",
lastName: "white",
email:"joyalwhite@gamil.com",
DOB:"21-03-1989",
},
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
// Copy the code here
res.send(JSON.stringify({users},null,4))//This line is to be replaced with actual return value
});

function getDateFromString(strDate) {
let [dd,mm,yyyy] = strDate.split('-')
return new Date(yyyy+"/"+mm+"/"+dd);
}
// console.log(sorted_users);
router.get("/sort",(req,res)=>{
let sorted_users=users.sort(function(a, b) {
let d1 = getDateFromString(a.DOB);
let d2 = getDateFromString(b.DOB);
return d1-d2;
});
res.send(sorted_users);
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
// Copy the code here
let emailUser = users.filter((obj) => obj.email === req.params.email);
res.send(emailUser)//This line is to be replaced with actual return value
});

router.get("/:lastName",(req,res)=>{
// Copy the code here
let emailUser = users.filter((obj) => obj.email === req.params.lastName);
res.send(emailUser)//This line is to be replaced with actual return value
});

// POST request: Create a new user
router.post("/",(req,res)=>{
// Copy the code here
newUser = {
firstName: req.query.firstName,
lastname: req.query.lastName,
email: req.query.email,
DOB: req.query.DOB
}
users.push(newUser);
res.send(newUser)//This line is to be replaced with actual return value
});

// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
const email = req.params.email;
let filtered_users = users.filter((user) => user.email === email);
if (filtered_users.length > 0) {
//let filtered_user = filtered_users[0];
//if the DOB has changed
if(req.query.DOB) {
filtered_users.forEach((obj) => obj.DOB = req.query.DOB)
}
if(req.query.firstName) {
filtered_users.forEach((obj) => obj.firstName = req.query.firstName)
}
if(req.query.lastName) {
filtered_users.forEach((obj) => obj.lastName = req.query.lastName)
}
if(req.query.email) {
filtered_users.forEach((obj) => obj.DOB = req.query.email)
}
/*
Include code here similar to the one above for other attibutes
*/
users = users.filter((user) => user.email != email);
filtered_users.forEach((obj) => users.push(obj));
res.send(`User(s) with the email ${email} updated.`);
}
else{
res.send("Unable to find user!");
}
});

// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
const email = req.params.email;
users = users.filter((user) => user.email != email);
res.send(`User with the email ${email} deleted.`);
});

module.exports=router;
