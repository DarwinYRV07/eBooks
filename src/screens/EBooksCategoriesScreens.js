import React, { useEffect,useState } from "react";
import backend from "../api/backend";
import {FlatList, Text, Image, StyleSheet} from 'react-native';
import {Container,View,Spinner,Card,CardItem,Body} from "native-base";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';


const EBooksCategoriesScreens = ({route, navigation}) =>{

    const {categorie} = route.params;
    const [books, setBooks] = useState(null);
    const [error, setError] = useState(false);

    console.log(categorie);

    const getcategoriebooks = async () => {
        try {
            const response = await backend.get(`get/?category=${categorie}&criteria=most_viewed`);
            setBooks(response.data);
        }catch (error) {
            setError(true);
        };
    };

    useEffect(() => {
        getcategoriebooks();
    },[]);

    if (!books) {
        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
                <Spinner color="#835858" />
            </View>
        );
    }


    return(
        <Container>
            <FlatList
                        ListEmptyComponent={<Text>No hay Libros disponibles!</Text>}
                        data={books}
                        key={({item}) => item.ID}
                        style={{width:"100%",height:120}}
                        renderItem={({item}) => {
                        return (
                            <View>
                                <TouchableOpacity onPress={() => navigation.navigate('eBooksInfo',{id: item.ID})}>
                                    <Card >
                                        <CardItem >
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
                                        <Image  source = {{uri:`${item.cover}`}} style={styles.portadaLibros}></Image>
                                                {/*No borrar las imagenes desaparecen*/}
                                            <Body style={{backgroundColor:"transparent"}}> 
                                                <Text style={styles.estiloTextoTitulo}>{item.title}</Text>
                                                <Text style={styles.estiloTextoAutor}>Autor: {item.author} </Text>
                                                <Text style={styles.estiloTextoFecha}>Fecha de Edicion: {item.publisher_date} </Text>
                                            </Body>
                                        </CardItem>
                                    </Card>
                                </TouchableOpacity>
                            </View>
                        )   
                        }}
                        keyExtractor={(items,index) => index.toString()}
                    />
        </Container>  
    );
}

const styles =StyleSheet.create({
    portadaLibros:{
        width:"50%",
        height: 210,
        resizeMode:"stretch",
    },
    estiloTextoTitulo:{
        textAlign:"center",
        fontSize:18,
        top:30,
        left:15,
    },
    estiloTextoAutor:{
        textAlign:"center",
        top:40,
        left:22,
        fontSize:15
    },
    estiloTextoFecha:{
        textAlign:"center",
        top:45,
        left:22,
        fontSize:15
    }
});

export default EBooksCategoriesScreens;