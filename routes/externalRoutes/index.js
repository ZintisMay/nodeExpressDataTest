// console.log("external")

// module.exports.height = 6
// module.exports.weight = 170

// function speak(){
// 	console.log("I am speaking")
// }

// module.exports.speak = speak
// module.exports = {name:"zintis"}

function applyRoutes (app) {

    app.get('/test', function (req, res) {
        res.send('test!');
    });

    app.get('/test2', function (req, res) {
        res.send('test2!');
    });
    
};

module.exports = applyRoutes