const { User, Book } = require('../models');

const resolvers = {
    Query: {
        userLogin: async () => {
            return userLogin.findOne({ $or: [{ username: body.username}, { email: body.email }] });
        },
        getSingleUser: async (parent, {userId}) => {
            const params = userId ? { userId } : {};
            return User.find(params);
        },
    },
    Mutation: {
        createUser: async (parent, args) => {
            const newUser = await User.create(args);
            return newUser;
        },
        saveBook: async (parent, { bookId }) => {
            const savedBook = await Book.findOneAndUpdate(
                { bookId },
                { new: true }
            );
            return savedBook;
        },
        deleteBook: async (parent, { bookId }) => {
            const deleteBook = await Book.findOneAndDelete(
                { bookId }
            );
            return deleteBook
        }
    }
};

module.exports = resolvers;

// Should there be something like get book by id?
