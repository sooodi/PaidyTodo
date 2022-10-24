import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Button } from 'react-native-elements'

const TaskItem = (props) => {

  return (
    <TouchableOpacity onPress={()=>props.updateTask()} style={styles.container}>
      <View style={styles.taskContainer}>
        <View style={styles.rowState}>
          <View style={styles.circleState}/>
          <Text style={styles.task}>{props.task.name}</Text>
         </View>
        <Button
          type="clear"
          title={"REMOVE"} onPress={() => props.deleteTask()}/>
      </View>
    </TouchableOpacity>
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
  touchView: {
    paddingHorizontal: 8,
  },
  indexContainer: {
    borderRadius: 15,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  index: {
    color: "#fff",
    fontSize: 20,
  },
  circleState:{
    backgroundColor: '#2262aa',
    padding:5,
    width:20,
    height:20,
    borderRadius:15,
  },
  rowState:{
    flexDirection:'row',
    paddingLeft:10
  },
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    minHeight: 50,
  },
  task: {
    color: "#666666",
    fontSize: 14,
    marginLeft:10
  },
  delete: {
    color: "#666666",
    fontSize: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});


export default TaskItem;
