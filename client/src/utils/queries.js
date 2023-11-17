import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    query user {
        user {
            _id
            username
            email
            bookCount
            savedBooks
        }
    }
`;
export const QUERY_BOOKS = gql`
    query books($bookId: String) {
        books(bookId: $bookId) {
            bookId
            authors
            description
            title
            image
            link
        }
    }
`;

export const GET_AUTH = gql`
    query auth {
        auth {
            token
            user {
                id
                username
                email
            }
        }
    }
`;
export const GET_ME = gql`
    query me {
        me {
            id
            username
            email
        }
    }
`;
