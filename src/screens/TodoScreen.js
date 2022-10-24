
import React, { useState } from "react";
import {
  FlatList,
  Keyboard,
  StyleSheet, TouchableOpacity,
  View,
} from "react-native";
import {
  useQuery,
  useMutation,
} from "@apollo/client";

import { ADD_TODO, GET_TODOS, REMOVE_TASK,UPDATE_TODO } from "../apollo/queries/query";
import TaskInputField from "../components/TaskInputField";
import TaskItem from "../components/TaskItem";
import Loading from "../components/Loading";
import { Colors } from "../utils/constansts/Colors";

const TodoScreen= () => {

  const [selectedTask, setSelectedTask] = useState({id:"0",completed:false,name:""});
  const [type, setType] = useState("ADD"); //title of button add , update
  //useMutation for add,update & remove task
  const [addTodo] = useMutation(ADD_TODO);
  const [removeTask] = useMutation(REMOVE_TASK);
  const [updateTodo] = useMutation(UPDATE_TODO);

  const { loading, error,  data  } = useQuery(GET_TODOS);

  //add task if new one & update if user click on task row
  const addTask = () => {

    if (selectedTask == null || selectedTask==={}) return;
    if(type==="UPDATE") {
      setType("ADD")
      setSelectedTask({id:"0",completed:false,name:""})
      updateTodo({
        variables: {
          id: selectedTask?.id,name: selectedTask.name
        }
      }).then(r =>{console.log("r",r)})
    }
    else {
      addTodo({
        variables: {
          name: selectedTask.name
        }
      }).then(r => {
        console.log("r", r)
      })
      setSelectedTask({...selectedTask,name:""})
    }
    Keyboard.dismiss();
  }

  const deleteTask = (selectedItem) => {
    removeTask({
      variables: {
        id: selectedItem.id
      }
    }).then(r =>{console.log("r",r)})
  }

  const updateTaskName = (selectedItem) => {
    setSelectedTask(selectedItem)
    setType("UPDATE")
  }

  const RenderItem = ({item, index}) => {
   return(
     <TaskItem task={item}
              updateTask={()=>updateTaskName(item)}
              deleteTask={()=>deleteTask(item)}/>
   )}

  return (
    <View style={styles.container}>
      {loading  ?
        <Loading/>
        :
        <FlatList
          data={data?.todos.filter(Boolean)}
          renderItem={RenderItem}
          keyExtractor={(item) => item.id}
       />}
      <TouchableOpacity onPress={()=>setType("ADD")}/>
      <TaskInputField task={selectedTask.name}
                      type={type}
                      onChange={text => setSelectedTask({...selectedTask,name: text })}
                      addTask={()=>addTask()}/>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.Back_COLOR,
      paddingVertical:16,
    },
    heading: {
      color: '#fff',
      fontSize: 20,
      fontWeight: '600',
      marginTop: 30,
      marginBottom: 10,
      marginLeft: 20,
    },
    scrollView: {
      marginBottom: 70,
    },
    taskContainer: {
      marginTop: 20,
    }

});

export default TodoScreen;
