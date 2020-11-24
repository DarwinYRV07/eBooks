import React, { useEffect, useState } from 'react';
import {StyleSheet,Text, Image, FlatList, ScrollView} from 'react-native';
import backend from "../api/backend";
import {Input,Container,Item, Header,View, Spinner, Card,CardItem, Body, Button, Icon, H2} from "native-base";
import { TouchableOpacity } from 'react-native-gesture-handler';
import {LinearGradient} from 'expo-linear-gradient';
import * as Font from 'expo-font';



function EBooksListScreens({navigation}) {
    //Control de los estados de los libros
    const [books, setBooks] = useState(null);
    const [books2,setBooks2] = useState(null)
    const [error, setError] = useState(false);
    const [fontsLoaded,setFontsLoaded] = useState(false);
    const [search, setSearch] = useState("");
    const [id,setId]=useState("");

    
    //Funcion de la fuente
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
  
    //Llama la api con las categorias de artes mas vistos
    const getBooks = async () => {
        try {
            const response = await backend.get(`get/?criteria=most_viewed`);
            setBooks(response.data);
        }catch (error) {
            setError(true);
        };
    };

    //Llama la api de la a hasta la b los mas vistos
    const getBooks2 = async () =>{
        try{
            const response = await backend.get(`get/?book_title_index=a,b?criteria=most_viewed`);
            setBooks2(response.data);
        }catch(error){
            setError(true);
        }
    }

    useEffect(() => {
        getBooks();
        getBooks2();
    },[]);

    if(!books2) {
        return(
            <View style={{ flex: 1, justifyContent: "center" }}>
                <Spinner color="#835858"/>
            </View>
        )
    }

    if (!books) {
        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
                <Spinner color="#835858" />
            </View>
        );
    }

    return (
        <Container style={styles.container}>
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

            {/*El encabezado de la pantalla con su respecto buscador */}          
            <Header style={styles.eBooksHeader} searchBar >
                <Item style={styles.estiloBuscador}>
                    <Input placeholder="Buscar" value={search} onChangeText={setSearch} />
                    <Button onPress={() => navigation.navigate('eBooksSearch', {search})} style={styles.imagenLupa} icon><Icon name="search"color="whirte" /></Button>
                </Item>
            </Header>

            <ScrollView style={{}}>
                <Image source={require("../../assets/LogoeBooks.png")}
                style={styles.eBooksLogo} />
                <View  style={styles.centrarContenido}>
                    <View style={styles.tituloPresentacion}>
                        <Item >
                            <H2 style={styles.titulos}> Más Vistos</H2>
                         <Button  style={styles.iconoMostrar} ><Icon name="book"color="whirte" /></Button>
                        </Item>  
                    </View>
                
                    <View style={styles.contenidoLibro}>
                    <LinearGradient
                        // Background Linear Gradient
                        colors={['#000000', '#835858']}
                        start={{ x: 1.5, y: 0 }}
                        end={{ x: 0.1, y: 1 }}
                        style={{
                        position: 'absolute',                                        
                        left: 0,
                        right: 0,
                        top: 0,
                        height:300,
                        borderRadius:15,
                        }}
                    />   
                        <FlatList
                            ListEmptyComponent={<Text>No hay Libros disponibles!</Text>}
                            data={books}
                            key={({item}) => item.ID}
                            horizontal={true}
                            style={styles.tamañoTarjtas}
                            renderItem={({item}) => {
                            return (
                                <View>
                                    {/*llama todas las categorias que tiene el libro*/}
                                    {/*{console.log("Nombre Categoria: " + item.categories[0].category_id)}*/}

                                    {/*En el onPress se define la categoria para hacer la peticion en la api*/}
                                    <TouchableOpacity onPress={() => navigation.navigate('eBooksInfo',{id: item.ID, idCategorie: item.categories[0].category_id})}>
                                        <Card >
                                            <CardItem>
                                                <Body> 
                                                    <Image  source = {{uri:`${item.cover}`}} style={styles.portadaLibros}></Image>
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
                    <View style={styles.tituloPresentacion1}>
                        <Item >
                            <H2 style={styles.titulos}>Otros Contenidos </H2>
                            <Button style={styles.iconoMostrar1}><Icon name="book"color="whirte" /></Button>
                        </Item>  
                    </View>
                    <View style={styles.contenidoLibro1}>   
                    <LinearGradient
                        // Background Linear Gradient
                        colors={['#000000','#835858']}
                        start={{ x: 1.5, y: 0 }}
                        end={{ x: 0.1, y: 1 }}
                        style={{
                        position: 'absolute',                                        
                        left: 0,
                        right: 0,
                        top: 0,
                        height:300,
                        borderRadius:15,
                        }}
                    />  
                        <FlatList
                            ListEmptyComponent={<Text>No hay Libros disponibles!</Text>}
                            data={books2}
                            key={({item}) => item.ID}
                            horizontal={true}
                            style={styles.tamañoTarjtas}
                            renderItem={({item}) => {
                            return (
                                <View>
                                    <TouchableOpacity onPress={() => navigation.navigate('eBooksInfo',{id: item.ID, idCategorie: item.categories[0].category_id})}>
                                        <Card>
                                            <CardItem>
                                                <Body> 
                                                    <Image  source = {{uri:`${item.cover}`}} style={styles.portadaLibros}></Image>
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
                </View >
                <View style={styles.tituloPresentacion2}>
                        <Item >
                            <H2 style={styles.titulos2}>Tenemos algunas categorias! </H2>
                        </Item>   
                </View>

                {/*Los botones de las categorias con sus diseños*/}
                <View style={styles.estiloContenedor}>
                    <View style={styles.estiloCategoria}>
                        <Button onPress={() => navigation.navigate('eBooksCategorie',{categorie: "cine"})} style={styles.estiloBotonCategoria}><Text style={{fontSize:18,fontFamily:"Overlock-Black",}}>Cine</Text></Button>
                        <Button onPress={() => navigation.navigate('eBooksCategorie',{categorie: "Programacion"})} style={styles.estiloBotonCategoria}><Text style={{fontSize:18,fontFamily:"Overlock-Black",}}>Programacion</Text></Button>
                        <Button onPress={() => navigation.navigate('eBooksCategorie',{categorie: "bases_de_datos"})} style={styles.estiloBotonCategoria}><Text style={{fontSize:18,fontFamily:"Overlock-Black",}}>Base de dato</Text></Button>
                    </View>
                    <View style={styles.estiloCategoria}>
                        <Button onPress={() => navigation.navigate('eBooksCategorie',{categorie: "arte-bellas-artes"})} style={styles.estiloBotonCategoria}><Text style={{fontSize:18,fontFamily:"Overlock-Black",}}>Artes</Text></Button>
                        <Button onPress={() => navigation.navigate('eBooksCategorie',{categorie: "Comic"})} style={styles.estiloBotonCategoria}><Text style={{fontSize:18,fontFamily:"Overlock-Black",}}>Comic</Text></Button>
                        <Button onPress={() => navigation.navigate('eBooksCategorie',{categorie: "desarrollo_web"})} style={styles.estiloBotonCategoria}><Text style={{fontSize:18,fontFamily:"Overlock-Black",}}>Desarrollo Web</Text></Button>
                    </View>
                </View>
            </ScrollView>
        </Container>
    )
}

const styles = StyleSheet.create({
    container:{
        top:0,
        height: 100,  
    },
    eBooksHeader:{
        backgroundColor:  "#835858",
    },
    estiloBuscador:{
        borderTopRightRadius:20,
        borderBottomRightRadius:20,
    },
    imagenLupa:{
        position:"relative",
        left:5,
        borderRadius:20,
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
        left:19,
        width:"100%",
        backgroundColor:"white",
        borderRadius:15,
        borderWidth:1,
        borderColor:"black",
    },
    tituloPresentacion1:{
        top:50,
        right:10,
        left:19,
        width:"100%",
        backgroundColor:"white",
        borderRadius:20,
        borderRadius:15,
        borderWidth:1,
        borderColor:"black",
    },
    tituloPresentacion2:{
        top:-250,
        right:10,
        left:19,
        width:"90%",
        borderRadius:20,
        backgroundColor:"white",
        borderRadius:15,
        borderWidth:1,
        borderColor:"black",
    },
    titulos:{
        fontSize:18,
        left:10,
        fontFamily:"Overlock-Black",
    },

    titulos2:{
        fontSize:19,
        left:50,
        fontFamily:"Overlock-Black", 
    },

    iconoMostrar:{
        borderRadius:14,
        backgroundColor: "#835858",
        right:-190,
        width:"15%",
        height:35,
        position:"relative",
        margin:3,
    },
    iconoMostrar1:{
        borderRadius:14,
        backgroundColor: "#835858",
        justifyContent:"center",
        left:140,
        width:"15%",
        height:35,
        position:"relative",
        margin:3,
    },
    ubicacion:{
        backgroundColor:"blue",
    },
    centrarContenido:{
        height:1000,
        width:"90%",
    },
    contenidoLibro:{
        top:20,
        left:15,
        width:"100%",
        height:290,
        borderBottomRightRadius:20,
        borderTopLeftRadius: 20,
    },
    contenidoLibro1:{
        top:65,
        bottom:65,
        left:15,
        width:"100%",
        backgroundColor:"#835858",
        height:290,
        borderBottomRightRadius:20,
        borderTopLeftRadius: 20,
    },
    portadaLibros:{
        width:"100%",
        height: 210,
        resizeMode:"stretch",
    },
    tamañoTarjtas:{
        top:10,
        width:"100%",
        height:320,
        borderRadius:20,

    },
    estiloContenedor:{
        backgroundColor:"transparent",
        flexDirection:"row",
        top: -200,
    },
    estiloCategoria:{
        backgroundColor:"transparent",
        margin:10,width:"50%",
        flexDirection:"column",
        alignItems: 'center',
        height:"auto",
        flex:1,
        justifyContent:"center",
    },
    estiloBotonCategoria:{
        backgroundColor:"white",
        borderRadius:12,
        borderWidth:2,
        borderColor:"black",
        margin:10,
        width:"90%",
        alignItems: 'center',
        flex:1,
        justifyContent:"center",
    },
});


export default EBooksListScreens;