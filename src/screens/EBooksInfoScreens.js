import React from "react";
import {StyleSheet} from "react-native";
import {Text,View} from "native-base";

const EBooksInfoScreens = ({route, navigation}) =>{
    const {id} = route.params;
    return(
        <View>
            <Text>Panatalla de informacion: {id}</Text>
        </View>
    )
}

const styles =StyleSheet.create({
});

export default EBooksInfoScreens;