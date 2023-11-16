const typeDefs = `
    type User {
        _id: ID
        username: String!
        email: String!
        password: String!
        savedBooks: [Book]
    }

    type Book {
        _id: ID
        authors: [String]
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }

    type Query {
        users: [User] 
        getSingleUser(username: String!, email: String!): User
    }

    type Mutation {
        createUser(username: String!, email: String! password: String!): User
        saveBook(description: String!, bookId: String!, title: String!): User
        deleteBook(bookId: String!): Book
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