// Set the 'NODE_ENV' variable
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Load the module dependencies
const configureMongoose = require('./config/mongoose');
const configureExpress = require('./config/express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/user.server.schema');
const cors = require('cors');

// Create a new Mongoose connection instance
const db = configureMongoose();

// Create a new Express application instance
const app = configureExpress();

// Configure CORS
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  credentials: true, // Allow credentials to be sent with the request
}));

// Configure GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: global,
  graphiql: true, // Enable GraphiQL for testing purposes
}));

//vital signs
// Middleware to parse JSON body
app.use(express.json());

// Endpoint to retrieve all vital signs data
app.get('/vitals', (req, res) => {
  fs.readFile('vitals.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(JSON.parse(data));
  });
});

// Endpoint to add new vital signs data
app.post('/vitals', (req, res) => {
  const newVitals = req.body;
  // Read existing data 
  fs.readFile('vitals.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    const vitals = JSON.parse(data);
    // Add new vital signs data
    vitals.push(newVitals);
    // Write updated data back to JSON file
    fs.writeFile('vitals.json', JSON.stringify(vitals, null, 2), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.status(201).json({ message: 'Vital signs data added successfully' });
    });
  });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Express GraphQL Server Now Running On http://localhost:${PORT}/graphql`);
});

// Expose the Express application instance for external usage
module.exports = app;
