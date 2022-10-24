import { render, screen, fireEvent, waitFor, act } from "@testing-library/react-native";
import { MockedProvider } from "@apollo/client/testing";
import { GET_TODOS } from "../src/apollo/queries/query"
import {  Text, View } from "react-native";

import React from "react";
import { InMemoryCache, useQuery } from "@apollo/client";

export function List() {
  const { loading, error,  data  } = useQuery(GET_TODOS);
  if (loading) return <Text data-testid="Loading">Loading...</Text>;
  if (error) return  <Text data-testid="Error">Error</Text>;
  if (data)  return  <Text data-testid="Hello">Hello</Text>;
    return (
    <View>
      <Text >hi</Text>
    </View>
  );
}

it("should render loading and success states on todo list", async () => {

  const datas = { todos: [{ id: "0", completed: false, name: "fffff" }] };
  const mocks = [
    {

      request: {
        query: GET_TODOS,
      },

      result: { data: datas }

    }

  ];
  const cache = new InMemoryCache({
  })
  render( <MockedProvider mocks={mocks} cache={cache}>
    <List/>
  </MockedProvider>);
  await  act(async () => {

    expect(await screen.queryByTestId("Loading")).toBeFalsy();
    expect(await screen.queryByTestId("Hello")).toBeTruthy();
  });


  // expect(await screen.queryByTestId("Hello")).toBeTruthy();
  // await waitFor(() => {
  //
  //   expect(screen.queryByTestId('foo')).toBe('data'); // works
  // })

  expect(screen.toJSON()).toMatchSnapshot()

});

