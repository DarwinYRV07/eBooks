import React, { useEffect, useState } from 'react';
import {StyleSheet,Text, Image, FlatList } from 'react-native';
import {Input,Container,Item, H4, Header,View, Spinner, Card,CardItem, Body, Button, Icon, H2} from "native-base";
import backend from "../api/backend";
import getEnvVars from "../../enviroment";

const {apiCoverUrl,apiCoverSize} = getEnvVars;

function EBooksListScreens() {


    //Control de los estados de los libros
    const [books, setBooks] = useState(null);
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
        <Container style={styles.container}>
            <Header style={styles.eBooksHeader} searchBar >
                <Item style={styles.estiloBuscador}>
                    <Input  placeholder="Buscar" />
                    <Button style={styles.imagenLupa} icon><Icon name="search"color="whirte" /></Button>
                </Item>
            </Header>
            <Image source={require("../../assets/LogoeBooks.png")}
            style={styles.eBooksLogo} />
            <View style={styles.centrarContenido}>
                <View style={styles.tituloPresentacion}>
                    <Item >
                        <H2 style={styles.titulos}> Más Vistos</H2>
                        <Button style={styles.iconoMostrar} ><Icon name="book"color="whirte" /></Button>
                    </Item>  
                </View>
                
                <View style={styles.contenidoLibro}>
                    <FlatList
                        ListEmptyComponent={<Text>No hay Libros disponibles!</Text>}
                        data={books}
                        key={({item}) => item.ID}
                        horizontal={true}
                        style={styles.tamañoTarjtas}
                        renderItem={({item}) => {
                        return (
                            <View >
                                <Card >
                                <CardItem >
                                    <Body > 
                                        <Image  source = {{uri:`${item.cover}`}} style={styles.portadaLibros}></Image>
                                        <Text style={styles.tituloLibros}>{item.title}</Text>
                                    </Body>
                                </CardItem>
                            </Card>
                            </View>
                        )   
                        }}
                        keyExtractor={(items,index) => index.toString()}
                    />
                </View>
                <View style={styles.tituloPresentacion1}>
                    <Item >
                        <H2 style={styles.titulos}>Otros Contenidos </H2>
                        <Button style={styles.iconoMostrar1} ><Icon name="book"color="whirte" /></Button>
                    </Item>  
                </View>
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    container:{
        top:0,
        height: 100,
        backgroundColor: "#fff0f0",   
    
    },
    eBooksHeader:{
        backgroundColor:  "#835858",
    },
    estiloBuscador:{
        borderTopRightRadius:20,
        borderBottomRightRadius:20,
    },
    imagenLupa:{
        borderBottomRightRadius:20,
        borderBottomLeftRadius: 20,
        borderTopRightRadius:20,
        borderTopLeftRadius: 20,
        backgroundColor: "#463333",
    },
    eBooksLogo:{
        width: "100%",
        height: 120,
        resizeMode: "center",
    },
    tituloPresentacion:{
        top:5,
        right:10,
        left:10,
        width:"100%",
        backgroundColor:"white",
        borderLeftColor: "black",
        borderTopColor:"black",
        borderBottomColor:"black",
        borderBottomRightRadius:20,
        borderBottomLeftRadius: 20,
        borderTopRightRadius:20,
        borderTopLeftRadius: 20,
    },
    tituloPresentacion1:{
        top:50,
        right:10,
        left:10,
        width:"100%",
        backgroundColor:"white",
        borderLeftColor: "black",
        borderTopColor:"black",
        borderBottomColor:"black",
        borderBottomRightRadius:20,
        borderBottomLeftRadius: 20,
        borderTopRightRadius:20,
        borderTopLeftRadius: 20,
    },
    titulos:{
        fontSize:18,
        left:10,
    },
    iconoMostrar:{
        borderBottomRightRadius:20,
        borderBottomLeftRadius: 20,
        borderTopRightRadius:20,
        borderTopLeftRadius: 20,
        alignContent:"flex-end",
        backgroundColor: "#835858",
        left:200,
        width:"12%",
        height:28,
    },
    iconoMostrar1:{
        borderBottomRightRadius:20,
        borderBottomLeftRadius: 20,
        borderTopRightRadius:20,
        borderTopLeftRadius: 20,
        alignContent:"flex-end",
        backgroundColor: "#835858",
        left:150,
        width:"12%",
        height:28,
    },
    ubicacion:{
        backgroundColor:"red",
        borderBottomRightRadius:20,
        borderBottomLeftRadius: 20,
        borderTopRightRadius:20,
        borderTopLeftRadius: 20,
        width:"40%",
        height:100,
    },
    centrarContenido:{
        height:100,
        width:"90%",
    },
    contenidoLibro:{
        top:20,
        left:15,
        width:"100%",
        backgroundColor:"#835858",
        height:290,
        borderBottomRightRadius:20,
        borderTopLeftRadius: 20,
    },
    portadaLibros:{
        width:"100%",
        height: 220,
        resizeMode:"stretch",
    },
    tituloLibros:{

    },
    tamañoTarjtas:{
        top:10,
        left:10,
        right:10,
        width:"40%",
        height:320,
    }
    
});


export default EBooksListScreens;