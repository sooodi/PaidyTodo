import React from "react";
import { gql, InMemoryCache, useMutation } from "@apollo/client";
import { Text,Button } from "react-native";
import { render, screen, fireEvent, act } from "@testing-library/react-native";
import { MockedProvider } from "@apollo/client/testing";
import { GraphQLError } from "graphql";

export const DELETE_MUTATION = gql`

    mutation deleteTodo($name: String!) {
        deleteDog(name: $name) {
            id
            name
            completed

        }

    }

`;

export function DeleteButton() {

  const [mutate, { loading, error, data }] = useMutation(DELETE_MUTATION);

  if (loading) return <Text data-testid="Loading...">Loading...</Text>;

  if (error) return <Text>Error!</Text>;

  if (data) return <Text data-testid="Deleted">Deleted!</Text>;


  return (

    <Button title="Click to Delete" onPress={() => mutate({ variables: { name: "Bun" } })}/>
  );

}

it("should render ", async() => {
  const deleteTodo = { name: "add todo test", completed:false, id: 1 };
  const mocks = [

    {
      request: {
        query: DELETE_MUTATION,
        variables: { name: "Bun" }
      },
      errors: [new GraphQLError("Error!")],
      result: { data: deleteTodo }
    }
  ];
  const cache = new InMemoryCache({
  })

  render(

    <MockedProvider mocks={mocks} cache={cache}>

      <DeleteButton />

    </MockedProvider>

  );
  // Find the button element...

  const button = await screen.findByText("Click to Delete");

  fireEvent.press(button); // Simulate a click and fire the mutation

  await  act(async () => {

    expect(await screen.queryByTestId("Loading...")).toBeFalsy();
  });

  expect(screen.toJSON()).toMatchSnapshot()
});
