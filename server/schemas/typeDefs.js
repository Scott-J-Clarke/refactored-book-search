const typeDefs = `
    type User {
        _id: ID
        username: String!
        email: String!
        password: String!
        savedBooks: [Book]
    }

    type Book {
        authors: [String]
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }

    type Query {
        getUserById(userId: ID!): User
        getUsers: [User]  
    }

    type Mutation {
        addUser(username: String!, email: String! password: String!): User
        updateUser(userId: Id!, username: String!, password: String!): User
        deleteUser(userId: Id!): User
    }
`;

module.exports = typeDefs;


// type Book {
//     _id: ID!
//     authors: String // Rewritten as 'authors: [String]' since there could be multiple authors.
//     description: String!
//     bookId: String!
//     image: String
//     link: String
//     title: String!
// }


// type User {
//     _id: ID
//     username: String!
//     email: String!
//     password: String!
//     savedBooks: [Book]
//     bookCount: Int
// }