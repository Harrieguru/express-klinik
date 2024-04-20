// Import necessary modules
const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList } = require("graphql");
const UserType = require("./UserType"); // Import UserType from your type definitions
const User = require("../models/user.server.model"); // Import the User model

// Define RootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllUsers: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        // Use Mongoose to query the database and return all users
        return User.find();
      },
    },
  },
});

// Define Mutation
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        role: {type: GraphQLString},
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        // Create a new user document using the User model and save it to the database
        const newUser = new User({
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          role: args.role,
          password: args.password,
        });
        return newUser.save();
      },
    },
  },
});

// Define GraphQL schema
module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
