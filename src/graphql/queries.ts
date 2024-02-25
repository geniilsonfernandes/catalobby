import gql from 'graphql-tag';

export const getUsers = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

export const createUser = gql`
  mutation createUser {
    createUser(
      data: {
        name: "john doe 2"
        email: "johndoe@email.com"
        password: "password12354"
      }
    ) {
      id
      name
    }
  }
`;
