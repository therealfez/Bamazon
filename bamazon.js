require("dotenv").config();
var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306, user: 'root',
    password: process.env.DB_PASSWORD,
    database: "itemsDB"
});

connection.connect(function (err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId + "\n");
});


function run() {
    inquirer
        .prompt([
            {
                type: "rawlist",
                message: "Welcome to Bamazon. What would you like to do?",
                choices: ["Purchase", "Exit"],
                name: "choice"
            }
        ])
        .then(function (answer) {
            switch (answer.choice) {
                case "Purchase":
                    purchaseItem();
                    break;
                case "Exit":
                    connection.end();
                    break;
                default: console.log("Please choose a valid command");
            }
        });
};

run();

 
function purchaseItem() {
    var query = "SELECT * FROM product";
    connection.query(query, function(err,res){
        console.table(res);
        var arr = []
        for (let i = 0; i < res.length; i++) {
            const element = res[i];
            arr.push(element.id)
        }
        inquirer.prompt([
            {
                type: "rawlist",
                message: "Welcome to Bamazon. What would you like to do?",
                choices: arr,
                name: "choice"
            }
        ]).then(function(answer){
            console.log(answer.choice)
        })
    })
};





