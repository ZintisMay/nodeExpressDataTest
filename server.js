const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

const fs = require('fs');

// handles form data
app.use(bodyParser.urlencoded({ extended: false }))
// handling json data
app.use(bodyParser.json())

let applyRoutes = require('./routes/externalRoutes')
applyRoutes(app);

// app.use('/bonusRoutes', bonusRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/queryDetector', (req, res) => {
	// Queries show up int he url after the string, like:
	// https://www.google.com?search=towers
	// search : towers would be in the req.query object
	console.log("queryDetector", req.query)
	res.json(req.query)
})
app.get('/paramsDetector/:a?/:b?/:c?', (req, res) => {
	console.log("queryDetector", req.params)
	res.json(req.params)
})

app.post('/post', (req, res) => {
	console.log("post", req.body)
	res.json(req.body)
})

var obj = {}

app.get('/obj/:key/:val', (req, res)=>{
	let {key, val} = req.params
	obj[key] = val
	res.json(obj)
})

app.put('/food/:food', (req, res)=>{
	// in the node route, there are a few special characters
	// : means that the following string is now a varialbe name that can be access with req.params.food
	let food = req.params.food
	console.log("adding", food)
	addNewFood(food)
	res.json(getFoods())
})

app.delete('/food/:food', (req, res)=>{
	// in the node route, there are a few special characters
	// : means that the following string is now a varialbe name that can be access with req.params.food
	let food = req.params.food
	console.log("removing", food)
	removeFood(food)
	res.json(getFoods())
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


// Utility functions

function saveJSON(path, data){
	let jsonData = JSON.stringify(data)
	fs.writeFileSync(path, jsonData);
}

function loadJSON(path){
	let rawdata = fs.readFileSync(path);
	let data = JSON.parse(rawdata);
	return data
}

function getFoods(){
	return loadJSON('./foods.json')
}

function addNewFood(food){
	var data = loadJSON('./foods.json')
	data.push(food)
	saveJSON('./foods.json', data)
}

function removeFood(food){
	var data = loadJSON('./foods.json')
	data = data.filter( item => { return item != food })
	saveJSON('./foods.json', data)
}