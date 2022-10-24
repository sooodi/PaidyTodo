import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator } from "react-native";

import { Colors } from "../utils/constansts/Colors";

const Loading = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.task}>wait...</Text>
      <ActivityIndicator color={Colors.LOADING_COLOR}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius:15,
    backgroundColor: '#fff',
  },
});


export default Loading;
