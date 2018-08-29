var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;


  // used by developer to test connection to MySQL server
  // console.log("connected as id " + connection.threadId);

  // run the start function after the connection is made to prompt the user
  productsTable();
});

// This function displays all products, their department, price, and quantity.
function productsTable() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;

    var table = new Table({ head: ["Item ID", "Product Name", "Department", "Price", "Quantity"] });

    for (var i = 0; i < res.length;i++){
      table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
    };

    console.log(table.toString());

    // adding space between the table and the first question.
    console.log("");

    // the user is prompted to make a purchase.
    purchase();
  });
};

var amtSpent = 0;

// This function asks the customer what they would like to purchase.
function purchase() {

  inquirer
    .prompt([
      {
        name: "itemID",
        type: "input",
        message: "Please select an item to purchase by typing the corresponding Item ID."
      },
      {
        name: "quantity",
        type: "input", 
        message: "How many would you like?"
      }
    ])
    .then(function(answer) {

      // grabs the current quantity in stock from the MySQL table
      connection.query("SELECT stock_quantity FROM products WHERE item_id=?", answer.itemID, function (err, res) {
        if (err) throw err;

        // sets the current quantity in stock to a variable.
        var onHand = res[0].stock_quantity;

        // checks to see if the stock quantity is greater or equal to the requested quanitity
        if (onHand >= answer.quantity) {

          // if the stock quantity is sufficient, the requested quantity is subtracted from the stock quantity, and set to a variable.
          var newQuantity = onHand - answer.quantity;

          // the item's stock quantity is updated in mySQL to reflect the purchase made.
          connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: newQuantity}, {item_id: answer.itemID}], function (err, res) {
            if (err) throw err;

            // after reducing the stock quantity, we'll retrieve the cost of the item and total up the purchase
            connection.query("SELECT price from products WHERE item_id=?", [answer.itemID], function (err, res) {
              if (err) throw err;

              // the total spent is obtained from multiplying the quantity selected by the price of the item selected.
              amtSpent = amtSpent + (answer.quantity * res[0].price);

              console.log("\nYou've made a fine choice. Your total will be $" + amtSpent.toFixed(2) + ".\n");

              purchaseMore();
            });
          });
        } else {

          // if the user selects more than the number of items in stock, they will be told the purchase cannot go through.
          console.log("\nBeg our pardon, but we have insufficient quantity in stock.\n");

          purchaseMore();
        };
      });
    });
};

function purchaseMore() {
  inquirer
    .prompt([
      {
        name: "another",
        type: "confirm",
        message: "Would you like to make another selection?"
      }
    ])
    .then(function(answer) {
      if (answer.another) {
        console.log("");
        productsTable();
      } else {
        console.log("\nVery well. Please settle your bill of $" + amtSpent.toFixed(2) + " with the front store clerk. \n\nWe hope you will grace us with your presence again in the near future. Good day.");
        process.exit(0);
      };
    });
};
