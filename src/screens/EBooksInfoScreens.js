import React, { useEffect,useState } from "react";
import backend from "../api/backend";
import {FlatList, Text, Image, StyleSheet,ScrollView} from 'react-native';
import {View,Spinner,Card,CardItem,Body, Item,H2} from "native-base";
import { TouchableOpacity } from 'react-native-gesture-handler';
import {LinearGradient} from 'expo-linear-gradient';
import * as Font from 'expo-font';
import HTML from 'react-native-render-html';



const EBooksInfoScreens = ({route, navigation}) =>{
    
    const {id} = route.params;
    const {idCategorie} = route.params;
    const [book, setBook] = useState(null);
    const [categorie, setCategorie] = useState(null);
    const [error, setError] = useState(false);
    const [fontsLoaded,setFontsLoaded] = useState(false);

    //Solo trae una sola categoria
    //console.log("Categoria de infro: " +idCategorie)
    
    const LoadFonts = async() => {
        await Font.loadAsync({
          "Overlock-Black": require(`../../assets/fonts/Overlock-Black.ttf`,),
          "Overlock-Italic": require(`../../assets/fonts/Overlock-Italic.ttf`),
        });
  
        setFontsLoaded(true);
    }

    useEffect(() => {
         if(!fontsLoaded){
             LoadFonts();
            }
    });

    
    const getInfoBook = async () => {
        try {
            const response = await backend.get(`get/?id="${id}"`);
            setBook(response.data);
        }catch (error) {
            setError(true);
        };
    };

    const getCategoriess = async () => {
        try {
            const response = await backend.get(`get/?category_id=${idCategorie}&criteria=most_viewed`);
            setCategorie(response.data);
        }catch (error) {
            setError(true);
        };
    };

    useEffect(() => {
        getInfoBook();
    },[id]);

    useEffect(()=>{
        getCategoriess();
    },[idCategorie]);


    if (!book) {
        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
                <Spinner color="#835858"/>
            </View>
        );
    }  

    if (!categorie) {
        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
                <Spinner color="#835858"/>
            </View>
        );
    }


    
    return(
    <View style={styles.Contenido}>
                            {/*El degradado para el fondo*/}
                            <LinearGradient
                                // Background Linear Gradient
                                colors={['#fff0f0', '#ebd4d4', '#835858']}
                                start={{ x: 0.1, y: 0 }}
                                end={{ x: 1, y: 0.001 }}
                                style={{
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                top: 0,
                                height: 800,
                                }}
                                />  
        <ScrollView style={{margin:1}} >
                    <LinearGradient                                 
                                colors={['#000000','#463333','#835858']}
                                start={{ x: 1, y: 1 }}
                                end={{ x: 0, y: 0 }}
                                style={{
                                    height:500,
                                    width:"98%",
                                    left:3,
                                    borderRadius:20,
                                    marginTop:8,
                                }}>
                    
                    {/*El titulo del libro y su respectivo diseño*/}
                    <Card style={styles.cardTitulo}>
                        <Text style={styles.titulo} >{book[0].title}</Text>
                    </Card>
                    {/*El autor del libro y su respectivo diseño*/}
                    <Card style={styles.cardAutor}>
                        <Text style={styles.estiloContenido}>Autor:</Text>
                        <Text style={styles.estiloContenido} >{book[0].author}</Text>
                    </Card>
                    {/*La fecha de publicacion del libro y su respectivo diseño*/}
                    <Card style={styles.cardFecha}>
                        <Text style={styles.estiloContenido}>Fecha de Pubicación</Text>
                        <Text style={styles.estiloContenido}>{book[0].publisher_date}</Text>
                    </Card>
                    {/*El lenguaje del libro y su respectivo diseño*/}
                    <Card style={styles.cardLenguaje}>
                        <Text style={styles.estiloContenido}>Lenguaje:</Text>
                        <Text style={styles.estiloContenido}>{book[0].language}</Text>
                    </Card>
                    <View style={{justifyContent:"center",display:"flex", alignContent:"center",marginLeft:12,marginRight:2,position:"absolute"}}>

                    {/*La descripcion del libro y su respectivo diseños*/}
                    <Card style={styles.cardDescripcion}>
                        <Text style={styles.estiloDescripcionTitulo}>Sintaxis</Text>
                        <HTML html={book[0].content_short}/>
                        <Text style={styles.estiloDescripcionContenido}></Text>
                    </Card  >
                    </View>

                    {/*La imagen del libro*/}
                    <CardItem style={styles.Principal}>
                    <Image  source = {{uri:`${book[0].cover}`}} style={styles.portadaLibros}></Image>              
                    </CardItem>            
                    </LinearGradient>

                    {/*El view de titulo*/}
                <View style={styles.tituloPresentacion1}>
                        <Item style={{height:50,justifyContent:"center"}}>
                            <H2 style={styles.titulos}>Otros Contenidos</H2>
                        </Item>  
                </View>

                {/*El listado de los libros*/}
            <View style={styles.viewNuevo}>
            <FlatList
                ListEmptyComponent={<Text>No hay Libros disponibles!</Text>}
                data={categorie}
                key={({item}) => item.ID}
                horizontal={true}
                style={styles.tamañoTarjtas}
                renderItem={({item}) => {
                        return (
                            <View>
                                <TouchableOpacity  onPress={() =>navigation.navigate('eBooksInfo',{id: item.ID, idCategorie: item.categories[0].category_id})}>
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
        //backgroundColor:"#fff0f0",
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
        width:"130%",
        height: 158,
        resizeMode:"stretch",
    },
    fuera:{
        //backgroundColor: "red",
        height:500,
        width:"97%",
        borderBottomRightRadius:20,
        borderTopLeftRadius: 20,
        left:5,

    },
    titulo:{
        textAlign:"center",
        height:75,
        color:"white",
        fontSize:25,
        fontFamily:"Overlock-Black",
    },
    cardTitulo:{
        borderColor:"transparent",
        backgroundColor:"transparent", 
        top:10,
        height:55,
    },
    cardAutor:{
        width:200,
        top:80,
        left:150,
        position:"absolute",
        borderColor:"transparent",
        backgroundColor:"transparent",
        fontSize:21,
        color:"white", 
    },

    estiloContenido:{
        color:"white",
        fontSize:17,
        fontFamily:"Overlock-Italic",
    },

    cardFecha:{
        width:200,
        top:138,
        left:150,
        position:"absolute",
        backgroundColor:"transparent",
        borderColor:"transparent"
    },
    cardLenguaje:{
        width:200,
        top:190,
        left:150,
        position:"absolute",
        backgroundColor:"transparent",
        borderColor:"transparent",
    },
    cardDescripcion:{
        width:350,
        top:260,
        margin:8,
        position:"absolute",
        borderColor:"transparent",
        backgroundColor:"white", 
        color:"white",
        fontSize:29,
        height:"auto",
        borderRadius:10,
    },

    estiloDescripcionTitulo:{
        color:"black",
        fontSize: 22,
        marginBottom:15,
        fontFamily:"Overlock-Italic",
        textAlign:"center",

    },

    estiloDescripcionContenido:{
        color:"black",
        fontSize:15,
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