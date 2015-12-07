/*
 * This program prototypes a supplier service for the my-alcohol-free-wine
 * website.
 *
 * You can specify the port number the service should be run on in a command
 * line argument.
 */

var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();

// The method that sends out the wines. Makes up some data, formats it into a
// JSON file and sends it to the client.
app.get('/wines', function (req, res) {
  res.json({
    "data": {
      "wines": createTestData(chooseTestData())
    }
  });
});

// The method that receives the orders. Logs the orders in a file.
app.post('/orders', bodyParser.json(), function (req, res) {
  console.log(req.body);
  fs.appendFile('orders' + getPort() + '.txt', JSON.stringify(req.body) + '\n', function (err) {
    // TODO
  });
  res.sendStatus(201);
});

// Now that everything is set up, start the server
app.listen(getPort());

/**
 * Determine the port to use for this server. If one isn't specified in argv,
 * use the default port.
 */
function getPort() {
  if (process.argv[2]) {
    return parseInt(process.argv[2]);
  }

  return 80;
}

/**
 * Determine which test data to use. If the choice isn't specified in argv,
 * use the default test data.
 */
function chooseTestData() {
  if (process.argv[3]) {
    return parseInt(process.argv[3]);
  }

  return 1;
}

/**
 * Generate a random price
 */
function randomPrice() {
  var MAX = 5000;
  var MIN = 500;

  // Calculate a random value between a range and then divide by 100 so that we
  // have a price
  return (Math.floor(Math.random() * (MAX - MIN + 1)) + MIN) / 100;
}

/**
 * Create test JSON wine data
 */
function createTestData(choice) {
  if (choice === 1) {
    return [
      {
        "upc": 123456789001,
        "title": "Pink Elephant Premium",
        "size": 750,
        "price": randomPrice(),
        "country": "United States",
        "grape_type": "red",
        "vegetarian": true,
        "description": "Lorem ipsum dolor sit amet, dico persius at nam, sed quis soluta ne. Elitr elaboraret ei nec. Quo iudico partem explicari ei. Nulla essent salutandi ex sed. An nam luptatum eleifend. Ullum scaevola nec id.",
        "image": "data:image/jpg;base64,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"
      }, {
        "upc": 123456789002,
        "title": "Really Posh Fake Champagne",
        "size": 500,
        "price": randomPrice(),
        "country": "Spain",
        "grape_type": "white",
        "vegetarian": true,
        "description": "Lorem ipsum dolor sit amet, dico persius at nam, sed quis soluta ne. Elitr elaboraret ei nec. Quo iudico partem explicari ei. Nulla essent salutandi ex sed. An nam luptatum eleifend. Ullum scaevola nec id.",
        "image": "data:image/jpg;base64,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"
      }
    ];
  } else {
    return [
      {
        "upc": 123456789002,
        "title": "Really Posh Fake Champagne",
        "size": 500,
        "price": randomPrice(),
        "country": "Spain",
        "grape_type": "white",
        "vegetarian": true,
        "description": "Lorem ipsum dolor sit amet, dico persius at nam, sed quis soluta ne. Elitr elaboraret ei nec. Quo iudico partem explicari ei. Nulla essent salutandi ex sed. An nam luptatum eleifend. Ullum scaevola nec id.",
        "image": "data:image/jpg;base64,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"
      }, {
        "upc": 123456789003,
        "title": "Meaty Wine",
        "size": 750,
        "price": randomPrice(),
        "country": "French",
        "grape_type": "rose",
        "vegetarian": false,
        "description": "Lorem ipsum dolor sit amet, dico persius at nam, sed quis soluta ne. Elitr elaboraret ei nec. Quo iudico partem explicari ei. Nulla essent salutandi ex sed. An nam luptatum eleifend. Ullum scaevola nec id.",
        "image": "data:image/jpg;base64,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"
      }
    ];
  }
}
