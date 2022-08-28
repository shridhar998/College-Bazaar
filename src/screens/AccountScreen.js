import React,{useState,useEffect} from 'react'
import { View, Text,FlatList,StyleSheet,Image } from 'react-native'
import auth from '@react-native-firebase/auth'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore'


const AccountScreen = () => {
    const [items,setItems]=useState([]);

        const getDetails = async () => {
            const querySnap = await firestore().collection('ads').where('uid','==',auth().currentUser.uid).get()
            const result = querySnap.docs.map(docSnap=>docSnap.data())
            setItems(result)
        }
        useEffect(()=>{
            getDetails();
            return;
        },[])
        const renderItem = (item)=>{
                  return(
                  <Card style={styles.card}>
                    <Card.Title title={item.name}  />
                    <Card.Content>
                      <Paragraph>{item.desc}</Paragraph>
                      <Paragraph>{item.year}</Paragraph>
                    </Card.Content>
                    <Card.Cover source={{ uri: item.image }} />
                    <Card.Actions>
                      <Button>{item.price}</Button>
                      <Button onPress={()=>openDial(item.phone)}>Call Seller</Button>
                    </Card.Actions>
                  </Card>
                  )
                }
    return(
         <View style={{flex:1}}>
         <View style={{alignItems:"center"}}>
         <Image style={{width:190,height:140}} source={require('../assets/app-logo.png')}/></View>
                    <View style={{justifyContent:"space-evenly",alignItems:"center"}}>

                      <Text style={{fontSize:22}}>Your email id: {auth().currentUser.email}</Text>


                     <Text style={{fontSize:22}}>Your ads: </Text>
                      <FlatList
                                           data={items.reverse()}
                                           keyExtractor={(item)=>item.phone}
                                           renderItem={({item})=>renderItem(item)}
                                           />
                     <Button  mode="contained" onPress={() => auth().signOut()}>
                      Logout
                      </Button>
                    </View>
         </View>
    )
}
const styles = StyleSheet.create({
    card:{
        margin:5,
        elevation:2
    }
     });
export default AccountScreen