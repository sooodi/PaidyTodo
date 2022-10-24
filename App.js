/** react-native-gesture-handler must be on top of the component**/
import 'react-native-gesture-handler';

import React, { useEffect, useState } from "react";

/** libraries **/
import {
   StyleSheet,
   StatusBar
} from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import RandomID from "random-id";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

/** local components **/
import TodoScreen from "./src/screens/TodoScreen";
import { GET_TODOS } from "./src/apollo/queries/query";
import { resolvers } from "./src/apollo/Resolver";
import Starter from "./src/screens/Starter";

const cache = new InMemoryCache();
const Stack = createNativeStackNavigator();

/*uri is temporary,we read data from cache  & we can put uri inside .env for security reasons*/
const client = new ApolloClient({
   uri: 'https://api.graphql.guide/graphql',
  cache,
  resolvers,
  defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
})

/* for test */
const myNewTodo ={
  id: RandomID(10), /* use random-id to generate random & uniq id ,we can use uuid or other custom approach*/
  name: "test",
  completed: false,
}
//const data = client.readQuery({ query:GET_TODOS });
cache.writeQuery({
  query:GET_TODOS,
  data: {
    todos: [ myNewTodo]
  }
});
/* for test */

const App = () => {

  const [loadingCache, setLoadingCache] = useState(true)
  const data = cache.readQuery({ query :GET_TODOS});

  useEffect(() => {
    // persistCache({
    //   cache,
    //   storage: AsyncStorage,
    // }).then(() => setLoadingCache(false))
  }, [])

  // if (loadingCache) {
  //   return <ActivityIndicator />
  // }

  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <StatusBar barStyle="light-content" />
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false
                }}>
                <Stack.Screen
                  name="Starter"
                  component={Starter}
                />
                <Stack.Screen
                  name="TodoScreen"
                  component={TodoScreen}
                />
              </Stack.Navigator>
            </NavigationContainer>

      </SafeAreaProvider>

    </ApolloProvider>
  );
};
const styles = StyleSheet.create({
  entireScreenSafeViewStyle: {
    flex: 1,
    backgroundColor: '#252637',
  },
  topSafeViewStyle: {
    flex: 0,
    backgroundColor: 'red',
  },

});

export default App;
