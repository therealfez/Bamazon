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
    connection.query(query, function (err, res) {
        console.table(res);
        if (err) throw err;
        var arr = []
        for (let i = 0; i < res.length; i++) {
            const element = res[i];
            arr.push(element.item)
        }
        inquirer.prompt([
            {
                type: "rawlist",
                message: "What would you like to purchase?",
                choices: arr,
                name: "choice"
            },
            {
                type: "number",
                message: "How many?",
                name: "quantity"
            }
        ]).then(function (answer) {
            var item = answer.choice
            var ammount = answer.quantity;
            connection.query("SELECT * FROM product WHERE item = ?", item, function (err, res) {
                if (res[0].quantity < ammount) {
                    console.log(`Unfortunately, we do not have enough ${item}(s) in stock to complete your purchase today.`)
                    connection.end();
                } else {
                    console.log(`You are buying ${ammount} ${item}(s) for ${res[0].price * ammount}`);

                    var newQuantity = res[0].quantity - ammount;
                    console.log(newQuantity);
                    var update = `UPDATE product SET quantity = ${newQuantity} WHERE item = "${item}"`
                    connection.query(update, function (err, resUpdate) {
                        if (err) throw err;
                        console.log("Your order has been processed.");
                        console.log("Thank you for shopping at Bamazon!")
                        run();
                    })
                };
            });

        })
    })
};





