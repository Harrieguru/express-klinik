const createUser = async (parent, args) => {
  try {
    const { email, password, role } = args; // Include email, password, and role fields
    const user = new User({ email, password, role }); // Create user with email, password, and role
    return await user.save(); // Save the user to the database
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error creating user:", error);
    // Rethrow the error to be caught by GraphQL and returned to the client
    throw new Error("Failed to create user. Please try again later.");
  }
};

module.exports = {
  createUser,
};
