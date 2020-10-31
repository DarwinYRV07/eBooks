import React, { useState } from 'react';
import {StyleSheet,Text, Image } from 'react-native';
import {Input,Container,Item, H1, Header, Button, Icon} from "native-base";
import backend from "../api/backend";
import getEnvVars from "../../enviroment";
const {APIKEY} = getEnvVars();

const EBooksListScreens = () => {

    //Control de los estados de los libros
    const [books,setBooks] = useState(null);
    const [error,seterror] = useState(false);
    const getBooks = async()=>{
        try{
            const response = await backend.get(`?category=libros_programacion&criteria=most_viewed`);
            setBooks(response.data);
            
        }catch(error){
            seterror(true);
        };
        
    }

    return(
        <Container>
            <Header style={styles.eBooksHeader} />
                <Item>
                    <Input placeholder="Buscar"/>
                    <Button style={styles.eBooksButton}>
                        <Icon name="search" color= "black"/>
                    </Button>
                </Item>

            <Image source={require("../../assets/eBooks.png")}
                style ={styles.eBooksImagen}
            />
            <H1>libros Mas Desacargados de Programacion</H1>
        </Container>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:"center",
        alignItems: "center",
    
    },
    eBooksImagen:{
        width: "100%",
        height: 120,
        resizeMode: "center",
    },
    eBooksHeader:{
        backgroundColor:  "#835858",
    },
    eBooksButton:{
        backgroundColor: "black",
    },

});


export default EBooksListScreens;