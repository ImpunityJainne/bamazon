# bamazon

The goal of this homework was to build a command-line Node.js app that lets you read and manipulate a MySQL database. In this case, the app represents a store called "bamazon." 

## Installation

1. Open your terminal and change your directory to the location where you'd like to install this app.
1. Clone this repository to your own computer by typing the following into your command line:

    ````
    git clone git@github.com:ImpunityJainne/bamazon.git
    ````

1. Change your directory to enter the "bamazon" folder and install the npm requires:

    ````
    cd bamazon
    npm install
    ````

1. Update the MySQL credentials to match your own in the bamazonCustomer.js file. 

    ````
    var connection = mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "root",
      database: "bamazon"
    });
    ````
    
1. Run the commands in the `bamazonSchema.sql` file in your MySQL manager (ex: MySQL Workbench or Sequel Pro) to populate the data the app will need to function.

1. Type `node bamazonCustomer.js` to begin using the app.

## Demo

1. The user selects product
![animated gif of app in use](howItWorks.gif)

----

## About Mandie Kramer
*Check out my [**About Me**](https://impunityjainne.github.io/Bootstrap-Portfolio/) page to learn more about me!*
