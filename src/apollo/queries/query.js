import { gql } from '@apollo/client';

/*todo queries */
export const GET_TODOS  = gql`
    query getTodos {
        todos @client{
            id
            name
            completed
        }
    }
`;

export const ADD_TODO = gql`

    mutation AddTodo($id: String!) {
        addTodo(name: $name) @client
    }

`;
export const REMOVE_TASK = gql`
    mutation RemoveTask($id:  Int!) {
        removeTask(id: $id)   @client
    }
`;
const TOGGLE_TODO = gql`
    mutation ToggleTodo($id: Int!) {
        toggleTodo(id: $id) @client
    }
`;

export const UPDATE_TODO = gql`

    mutation UpdateTodo($id: Int!,$name: Int!) {
        updateTodo(id:$id,name: $name) @client
    }

`;
