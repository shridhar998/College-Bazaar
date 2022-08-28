import React,{useEffect,useState} from 'react'
import { View, Text ,FlatList,StyleSheet,Linking,Platform} from 'react-native'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import RazorpayCheckout from 'react-native-razorpay';
const ListItemScreen = () =>{
    const [items,setItems]=useState([]);

    const getDetails = async () => {
        const querySnap = await firestore().collection('ads').get()
        const result = querySnap.docs.map(docSnap=>docSnap.data())
        setItems(result)
    }
    useEffect(()=>{
        getDetails();
        return;
    },[])
    const openDial=(phone)=>{
        if(Platform.OS==='android'){
            Linking.openURL(`tel:${phone}`)
        }
        else{
            Linking.openURL(`telprompt:${phone}`)
        }
    }
    const openRazorpay = (price,named) =>{
         var options = {
            description: 'Credits towards consultation',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: 'rzp_test_7HkHzHnAxYhKL1', // Your api key
            amount: price,
            name: named,
            prefill: {
              email: 'void@razorpay.com',
              contact: '9191919191',
              name: 'Razorpay Software'
            },
            theme: {color: '#F37254'}
          }
          RazorpayCheckout.open(options).then((data) => {
            // handle success
            alert(`Success: ${data.razorpay_payment_id}`);
          }).catch((error) => {
            // handle failure
            alert(`Error: ${error.code} | ${error.description}`);
          });
    }
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
              <Button onPress={()=>openRazorpay(item.price,item.name)}>{item.price}</Button>
              <Button onPress={()=>openDial(item.phone)}>Call Seller</Button>
            </Card.Actions>
          </Card>
          )
        }
          return(
           <View>
                      <FlatList
                      data={items.reverse()}
                      keyExtractor={(item)=>item.phone}
                      renderItem={({item})=>renderItem(item)}
                      />
           </View>
      )

}
const styles = StyleSheet.create({
    card:{
        margin:10,
        elevation:2
    }
     });


export default ListItemScreen