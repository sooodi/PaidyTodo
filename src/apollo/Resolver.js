import RandomID from "random-id";
import { GET_TODOS } from "./queries/query";

export const resolvers = {
  Launch: {
    getTodos_: (launch, _args, { cache }) => {
      const { todos } = cache.readQuery({ query: GET_TODOS });
      return todos;
    },
  },
  Mutation: {
    getTodos: (launch, _args, { cache }) => {
      const { todos } = cache.readQuery({ query: GET_TODOS });
      cache.refetchQueries(cache, {query: GET_TODOS }) ;
      return todos;
    },
    removeTask:(_, { id }, { cache }) => {
      const data = cache.readQuery({ query:GET_TODOS });
      cache.writeQuery({
        query: GET_TODOS,
        data: { todos: data.todos.filter(todo =>todo!==null && todo.id !== id) }
      });

    },
    updateTodo: (_root, variables, { cache }) => {
      cache.updateQuery({ query :GET_TODOS}, (data) => ({
        todos: data.todos.filter(Boolean).map((todo) =>
          (variables.id===todo.id ?{ ...todo, name: variables.name } : { ...todo}))

      }));
      return null;

    },
    toggleTodo: (_root, variables, { cache }) => {
      cache.modify({
        id: cache.identify({
          __typename: 'TodoItem',
          id: variables.id,
        }),
        fields: {
          completed: value => !value,
        },
      });
      return null;
    },
    addTodo:  (_, { name }, { cache }) => {
      const previous = cache.readQuery({ query:GET_TODOS});
      const newTodo = { id: RandomID(10), name, completed: false };
      const data = {
        todos:previous ? [...previous?.todos, newTodo]:[ newTodo],
      };
      cache.writeQuery({query: GET_TODOS, data });
      //this nedded update cache ,when you use dont have network
      cache.refetchQueries(cache, { data: { data } }) ;
      return newTodo;
    },
  }
};
