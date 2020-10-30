import React from 'react';
import {StyleSheet,Text } from 'react-native';
import {Input,Container, Form, Item, H1} from "native-base";


const EBooksListScreens = () => {
    return(
        <Container style={styles.container} >
            <Form>
                <Item>
                    <Input placeholder="Buscar..."/>
                </Item>
            </Form>
            <H1>libros Más Vistos</H1>
            <Text>Hola eBooks!</Text>
        </Container>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:"center",
        alignItems: "center",
    },
});


export default EBooksListScreens;