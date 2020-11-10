import React, { useEffect,useState } from "react";
import backend from "../api/backend";
import {FlatList, Text, Image, StyleSheet,ScrollView} from 'react-native';
import {View,Spinner,Card,CardItem,Body, Item,H2} from "native-base";
import {LinearGradient} from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';

const EBooksInfoScreens = ({route, navigation}) =>{
    
    const {id} = route.params;
    const [book, setBook] = useState(null);
    const [books, setBooks] = useState(null);
    const [error, setError] = useState(false);

    console.log(`get/?category=Programación`);
    const getInfoBook = async () => {
        try {
            const response = await backend.get(`get/?id="${id}"`);
            setBook(response.data);
            console.log(`Hola buenas aqui pase 2`);
        }catch (error) {
            setError(true);
        };
    };

    const getBooks = async () => {
        try {
            const response = await backend.get(`get/?criteria=most_viewed`);
            setBooks(response.data);
            console.log(books);
            console.log(`Hola buenas aqui pase`);
        }catch (error) {
            setError(true);
        };
    };

    useEffect(() => {
        getInfoBook();
        getBooks();
    },[TouchableOpacity]);

    if (!book) {
        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
                <Spinner color="#835858" />
            </View>
        );
    }

    if (!books) {
        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
                <Spinner color="#835858" />
            </View>
        );
    }
    
    console.log(book[0].title);
    console.log("Hola");
    return(
   
    <View style={styles.Contenido}>
        <ScrollView style={{}} >
                <Card style={styles.fuera}>
                    <Card style={styles.cardTitulo}>
                        <Text style={styles.titulo} >{book[0].title}</Text>
                    </Card>
                    <Card style={styles.cardAutor}>
                        <Text style={styles.estiloAutorTitulo}>Autor:</Text>
                        <Text style={styles.estiloAutorContenido} >{book[0].author}</Text>
                    </Card>
                    <Card style={styles.cardCalificacion}>
                        <Text>Calificacion</Text>
                        <Text>Estrellitas</Text>
                    </Card>
                    <Card style={styles.cardDescripcion}>
                        <Text style={styles.estiloDescripcionTitulo}>Descripcion</Text>
                        <Text style={styles.estiloDescripcionContenido}>{book[0].content_short}</Text>
                    </Card>
                    <CardItem style={styles.Principal}>
                    <Image  source = {{uri:`${book[0].cover}`}} style={styles.portadaLibros}></Image>              
                    </CardItem>            
                </Card>
                <View style={styles.tituloPresentacion1}>
                        <Item style={{height:50,justifyContent:"center"}}>
                            <H2 style={styles.titulos}>Otros Contenidos </H2>
                        </Item>  
                </View>

            <View style={styles.viewNuevo}>
            <FlatList
                ListEmptyComponent={<Text>No hay Libros disponibles!</Text>}
                data={books}
                key={({item}) => item.ID}
                horizontal={true}
                style={styles.tamañoTarjtas}
                renderItem={({item}) => {
                return (
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('eBooksInfo',{id: item.ID})}>
                            <Card>
                                <CardItem>
                                    <Body> 
                                        <Image  source = {{uri:`${item.cover}`}} style={styles.portadaLibros2}></Image>
                                        {/*No borrar las imagenes desaparecen*/}
                                        <Text >                                             </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                    </View>
                )   
                }}
                keyExtractor={(items,index) => index.toString()}
            />    
            </View>
        </ScrollView>     
    </View>

    )
}

const styles =StyleSheet.create({
    Contenido:{
        backgroundColor:"#fff0f0",
    },
    Principal:{
        backgroundColor:"#835858",
        height:150,
        width:"35%",
        marginHorizontal:10,
        marginVertical:20,
    },
    portadaLibros:{
        right:16,
        width:"135%",
        height: 150,
        resizeMode:"stretch",
    },
    fuera:{
        backgroundColor: "#463333",
        height:500,
        width:"97%",
        borderBottomRightRadius:20,
        borderTopLeftRadius: 20,
        left:5,

    },
    titulo:{
        textAlign:"center",
        height:50,
        color:"white",
        fontSize:17,
    },
    cardTitulo:{
        borderColor:"transparent",
        backgroundColor:"transparent", 
        top:10,
        height:45,
        
    },
    cardAutor:{
        width:200,
        top:90,
        left:150,
        position:"absolute",
        borderColor:"transparent",
        backgroundColor:"transparent",
        fontSize:21,
        color:"white", 
    },
    estiloAutorTitulo:{
        color:"white",
        fontSize:16,
    },

    estiloAutorContenido:{
        color:"white",
        fontSize:17,
    },

    cardCalificacion:{
        width:200,
        top:150,
        left:150,
        position:"absolute"
    },
    cardDescripcion:{
        width:350,
        top:260,
        right:3,
        position:"absolute",
        borderColor:"transparent",
        backgroundColor:"transparent", 
        fontSize:20,
        color:"white",
    },

    estiloDescripcionTitulo:{
        color:"white",
        fontSize:18,
        marginBottom:15,
    },

    estiloDescripcionContenido:{
        color:"white",
        fontSize:17,
    },

    viewNuevo:{
        backgroundColor: "#463333",
        height:300,
        width:"97%",
        borderBottomRightRadius:20,
        borderTopLeftRadius: 20,
        left:5,
        top:70,
        marginBottom:120,
    },
    tituloPresentacion1:{
        top:50,
        right:10,
        left:9,
        width:"95%",
        backgroundColor:"white",
        borderLeftColor: "black",
        borderTopColor:"black",
        borderBottomColor:"black",
        borderRadius:20,
    },
    tamañoTarjtas:{
        top:10,
        width:"100%",
        height:320,
        borderRadius:20,
    },
    portadaLibros2:{
        width:"100%",
        height: 210,
        resizeMode:"stretch",
    },


});

export default EBooksInfoScreens;