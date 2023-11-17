const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // Retrieve logged in user from context and find user details in database:
        me: async (parents, args, context) => {
            if (context.user) {
                return User.findOne({
                    _id: context.user._id
                });
            }
            throw new AuthenticationError('You need to be logged in.');
        }
    },

    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user with this email found.')
            }

            const correctPw = await user.isCorrectPassword(password);
            
            if (!correctPw) {
                throw new AuthenticationError('Incorrect password.')
            }

            const token = signToken(user);
            
            return { token, user }
        },

        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
    
            return { token, user }
        },

        // Retrieve logged in user from context and add book to user's savedBooks array:
        saveBook: async (parent, book, context) => {
            // If context has 'user' property, user executing this mutation has valid JWT and is logged in:
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: context.user._id },
                    {
                        $addToSet: { savedBooks: book },
                    },
                    {
                        new: true,
                        runValidators: true
                    }
                );
            }
            // If user tries to execute this mutation but isn't logged in:
            throw new AuthenticationError('You need to be logged in.');
        },

        // Retrieve logged in user from context and remove book from user's savedBooks array:
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: bookId } } },
                    { new: true }
                );
            }
            throw new AuthenticationError('You need to be logged in.');
        }
    }
};

module.exports = resolvers;
