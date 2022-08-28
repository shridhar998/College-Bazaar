import React,{useState} from 'react'
import { View, Text ,Image,StyleSheet,KeyboardAvoidingView,TouchableOpacity,Alert} from 'react-native'
import { TextInput,Button} from 'react-native-paper'
import auth from '@react-native-firebase/auth';
const SignupScreen = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const userSignup = async ()=>{
        if(!email || !password){
            Alert.alert("Please fill all fields");
            return;
        }
        try{
            const result = await auth().createUserWithEmailAndPassword(email,password)
            Alert.alert("User Sign up successful, please go to the login page");
        }catch(err){
            Alert.alert("something went wrong please try different password")
        }

    }
    return (
        <View>
            <View style={styles.box1}>
                <Text style={{fontSize:32,paddingTop:20}}> Welcome to College Bazaar </Text>
                                <View style={{flex:1,flexDirection:"row"}}>
                                    <Image style={{width:150,height:150}} source={require('../assets/bike.png')}/>
                                    <Image style={{width:180,height:150}} source={require('../assets/books.png')}/>
                                </View>
                                <View style={{paddingTop:150}}>
                                    <Text style={styles.text}> Please Sign Up to continue! </Text>
                               </View>
            </View>

            <View style={styles.box2}>
            <TextInput
                label="Email"
                value={email}
                mode="outlined"
                onChangeText={text => setEmail(text)}
                />
            <TextInput
                label="password"
                value={password}
                mode="outlined"
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
                />
                 <Button  mode="contained" onPress={() => userSignup()}>
                     Sign Up
                 </Button>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    box1:{
        alignItems:"center"
    },
    box2:{
        paddingHorizontal:40,
        height:"50%",
        justifyContent:"space-evenly"
    },
    text:{
        fontSize:22
    }
 });

export default SignupScreen