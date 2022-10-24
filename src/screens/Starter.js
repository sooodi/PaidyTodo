import React from "react";
import {
  View,
  StyleSheet,
  Text,
} from "react-native";

import * as LocalAuthentication from "expo-local-authentication";

import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../utils/constansts/Colors";

const Starter = () => {
  const navigation = useNavigation();

  async function authenticate() {
    const result = await LocalAuthentication.authenticateAsync();
    /* after Interring pin code or pattern we will go to next page */
    if(result?.success)
      navigation.navigate("TodoScreen")
  }

  return (
    <View style={styles.container}>
      <Text style={styles.task}>Set Authentication to Proceed</Text>
      <Button
        buttonStyle={styles.button}
        title={"Go to Setting"}
        onPress={() => authenticate()}/>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex:1,
    padding:20,
    alignItems:'center',
    justifyContent:'flex-end'
  },
  task: {
    color: Colors.BLACK_OFF,
    fontSize: 20,
    marginVertical:16,
    fontWeight:'500',
    alignSelf:'center',
  },
  button :{
    backgroundColor: Colors.BACK_ITEM_COLOR,
    borderRadius:25,
    paddingHorizontal:25
  }
});

export default Starter;
