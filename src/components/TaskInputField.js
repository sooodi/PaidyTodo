import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform
} from "react-native";

import { Colors } from "../utils/constansts/Colors";

const TaskInputField = (props) => {

  const handleAddTask = () => {
    props.addTask();
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
     <TextInput style={styles.inputField} value={props.task}
                 onChangeText={props.onChange} placeholder={'Enter here'}
                 placeholderTextColor={Colors.PLACEHOLDER_COLOR}/>
     <TouchableOpacity onPress={() => handleAddTask()}>
        <View style={styles.button}>
          <Text style={styles.text}>{props.type==="ADD"? "ADD":"UPDATE"}</Text>
        </View>
     </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#fff',
    marginHorizontal: 20,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 20,
  },
  inputField: {
    color: '#000',
    height: 50,
    flex: 1,
  },
  text: {
    color: '#fff',
    fontSize:12,
    fontWeight:"600"
  },
  button: {
    height: 40,
    minWidth: 50,
    borderRadius: 15,
    paddingHorizontal: 8,
    backgroundColor: '#2262aa',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export  default  TaskInputField;
