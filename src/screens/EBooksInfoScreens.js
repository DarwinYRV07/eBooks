import React, { useEffect,useState } from "react";
import backend from "../api/backend";
import {FlatList, Text, Image, StyleSheet,ScrollView} from 'react-native';
import {Container,H1,View,Spinner,Card,CardItem,Body, Item, Content,H2,Button} from "native-base";
import {LinearGradient} from 'react-native-linear-gradient';

const EBooksInfoScreens = ({route, navigation}) =>{
    
    const {id} = route.params;
    const [books, setBooks] = useState(null);
    const [error, setError] = useState(false);

    const getSearchbooks = async () => {
        try {
            const response = await backend.get(`get/?book_title="${id}"`);
            setBooks(response.data);
        }catch (error) {
            setError(true);
        };
    };

    useEffect(() => {
        getSearchbooks();
    },[]);

    if (!books) {
        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
                <Spinner color="#835858" />
            </View>
        );
    }

    return(
   
    <View>
        <ScrollView style={{}} >
                <Card style={styles.fuera}>
                    <Card style={styles.cardTitulo}>
                        <H1 style={styles.titulo}>Tituloooooooooooooooo</H1>
                    </Card>
                    <Card style={styles.cardAutor}>
                        <Text>Autor:</Text>
                        <Text>Hola</Text>
                    </Card>
                    <Card style={styles.cardCalificacion}>
                        <Text>Calificacion</Text>
                        <Text>Estrellitas</Text>
                    </Card>
                    <Card style={styles.cardDescripcion}>
                        <Text>Descripcion</Text>
                        <Text>HSALSJAJdhsajdkjfhdkjfhdksjhfskdajldasdhafa</Text>
                        <Text>Holaaaaa</Text>
                    </Card>
                    <CardItem style={styles.Principal}>
                    <H1>Cover:</H1>                
                    </CardItem>            
                </Card>
                <View style={styles.tituloPresentacion1}>
                        <Item style={{height:50,justifyContent:"center"}}>
                            <H2 style={styles.titulos}>Otros Contenidos </H2>
                        </Item>  
                </View>

            <View>   
                <Card style={styles.viewNuevo} >

                </Card>  
            </View>
        </ScrollView>     
    </View>

    )
}

const styles =StyleSheet.create({
    Principal:{
        backgroundColor:"#835858",
        height:150,
        width:"35%",
        marginHorizontal:10,
        marginVertical:20,
    },
    portadaLibros:{
        width:"50%",
        height: 210,
        resizeMode:"stretch",
    },
    fuera:{
        backgroundColor: "#463333",
        height:485,
        width:360,
        borderBottomRightRadius:20,
        borderTopLeftRadius: 20,
        left:5,

    },
    titulo:{
        textAlign:"center",
    },
    cardTitulo:{
        backgroundColor:"transparent",
        top:10,
    },
    cardAutor:{
        width:200,
        top:90,
        left:150,
        position:"absolute"
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
    },
    viewNuevo:{
        backgroundColor: "#463333",
        height:485,
        width:360,
        borderBottomRightRadius:20,
        borderTopLeftRadius: 20,
        left:5,
        top:70,
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


});

export default EBooksInfoScreens;