import React, {useState, useEffect} from 'react'
import { Text, View, Image, Alert,} from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Styles from '../styles/Style'

const Login = ({navigation}) => {

    const [name, setName] = useState('')
    const [age,setAge] = useState('')

    useEffect(()=>{
        getData()
    },[])

    const getData = async () =>{
        try{
            const value = await AsyncStorage.getItem('userData')
            if (value !== null){
                navigation.navigate('Home')
            }
        }catch(err){
            console.log('getItem Error ',err)
        }
    }

    const saveData = async () =>{
        if(name.length == 0 || age.length == 0){
            Alert.alert('Warning!', 'You Must Have to enter UserName')
        }
        else {
            try{
                var user = {
                    Name : name,
                    Age : age
                }
                await AsyncStorage.setItem('userData',JSON.stringify(user))
                navigation.navigate('Home')
            }catch(err){
                console.log(err)
            }
        }
    }

    return (
        <View style = {Styles.container}>
            <Image 
                style= {{height:100, width:100, margin:15}}
                source={require('../../assets/logo.jpg')}
            />
            <Text style = {Styles.text}>Login</Text>
            <TextInput 
                style = {Styles.textInput}
                autoCapitalize='none'
                placeholder='Enter UserName'
                onChangeText={(value) => { setName(value)}}
            />
             <TextInput 
                style = {Styles.textInput}
                autoCapitalize='none'
                placeholder='Enter Your Age'
                onChangeText={(value) => { setAge(value)}}
            />
            <TouchableOpacity style = {[{backgroundColor : 'green'},Styles.button]}
                onPress={saveData}
            >
                <Text style = {{color : 'white'}}>Login</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login
