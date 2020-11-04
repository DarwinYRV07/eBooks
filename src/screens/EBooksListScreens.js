import React, { useEffect, useState } from 'react';
import {StyleSheet,Text, Image, FlatList } from 'react-native';
import {Input,Container,Item, H1, Header, Button, Icon, View, Spinner, Card,CardItem, Body} from "native-base";
import backend from "../api/backend";
import getEnvVars from "../../enviroment";

const {apiCoverUrl,apiCoverSize} = getEnvVars;

function EBooksListScreens() {


    //Control de los estados de los libros
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(false);

    const getBooks = async () => {

        try {

            const response = await backend.get(`get/?category=libros_programacion&criteria=most_viewed`);
            
            setBooks(response.data);
            console.log(books);

        }

        catch (error) {
            setError(true);
        };
    };

    useEffect(() => {

        getBooks();
    },[]);

    if (!books) {
        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
                <Spinner color="#835858" />
            </View>
        );
    }


    return (
        <Container>
            <Header style={styles.eBooksHeader} />
            <Item>
                <Input placeholder="Buscar" />
                <Button style={styles.eBooksButton}>
                    <Icon name="search" color="black" />
                </Button>
            </Item>
            <Image source={require("../../assets/eBooks.png")}
            style={styles.eBooksImagen} />
            <H1 style={{marginTop:20}}>Libros Mas Populares en Programación</H1>
            <FlatList      
                ListEmptyComponent={<Text>No hay Libros disponibles!</Text>}
                data={books}
                key={({item}) => item.ID} 
                renderItem={({item}) => {       
                return(
                <View>
                    <Card>
                      <CardItem>
                          <Body>
                            {console.log(`${apiCoverUrl}${item.cover}`)}
                            <Image source = {{uri: `${apiCoverUrl}${item.cover}`}} style={styles.eBooksImagen}></Image>
                            <Text>{item.title}</Text>
                          </Body>
                        </CardItem>
                    </Card>
                </View>
                )
                }} 

            />

        </Container>
    )
}

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