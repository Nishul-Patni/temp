import { View, Text, Button } from 'react-native'
import React, { useContext, useState } from 'react'
import { Link, router } from 'expo-router'
import { createUserDocument, getUserDocument, editUserDocument } from './Services/UserService' 
import { AuthContext } from './Context/AuthProvider'

const Home = () => {

  let [tmp, setTmp] = useState(""); 
  let {user} = useContext(AuthContext);

  return (
    <View>
      <Text>Home</Text>
      <Link href="/Profile">Profile</Link>
      <Button title='Add Data' onPress={()=>{createUserDocument(user)}} />
      <Button title='Get Data' onPress={()=>{getUserDocument(user.uid)}}/>
      <Button title='Edit Data' onPress={async ()=>{
        let userData = await getUserDocument(user.uid);
        userData.Allergies.push("THis is pushed to test");
        userData.Tmp = "This tmp";
        await editUserDocument(user.uid, userData);
      }}/>
      <Text>{tmp.toString()}</Text>
      <Button title="Edit Details" onPress={()=>router.push("/AddDetails")} />
    </View>
  )
}

export default Home