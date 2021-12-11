import React,{useState,useEffect} from 'react'
import { Text, View, TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Styles from '../styles/Style'
import { TextInput } from 'react-native-gesture-handler';

const Home = ({navigation}) => {

    useEffect(()=>{
        getData()
    },[])

    const [name, setName] = useState('')
    const [age,setAge] = useState('')

    const getData = async () =>{
        try{
            const value = await AsyncStorage.getItem('userData')
            if (value !== null){
                var user = JSON.parse(value)
                setName(user.Name)
                setAge(user.Age)
            }
        }catch(err){
            console.log('getItem Error ',err)
        }
    }

    const updateData = async () =>{
        if(name.length == 0 ){
            Alert.alert('Warning!', 'You Must Have to enter UserName')
        }
        else {
            try{
                var user = {
                    Name : name
                }
                await AsyncStorage.mergeItem('userData',JSON.stringify(user))
            }catch(err){
                console.log(err)
            }
        }
    }

    const deleteData = async () =>{
            try{
                await AsyncStorage.clear()
                navigation.navigate('Login')
            }catch(err){
                console.log(err)
            }
    }


    return (
        <View style = {Styles.container}>
            <Text style = {Styles.text}>You Loged in with {name}</Text>
            <Text style = {Styles.text}>Your Age is {age}</Text>
            <TextInput 
                style = {Styles.textInput}
                value = {name}
                onChangeText={(value)=>{setName(value)}}
            />
            <TouchableOpacity style = {[{backgroundColor : 'blue'} ,Styles.button]}
                onPress={updateData}
            >
                <Text style = {{color : 'white'}}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {[{backgroundColor : 'red'} ,Styles.button]}
                onPress={deleteData}
            >
                <Text style = {{color : 'white'}}>Delete</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Home
