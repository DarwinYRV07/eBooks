import React, { useEffect,useState } from "react";
import backend from "../api/backend";
import {FlatList, Text, Image, StyleSheet} from 'react-native';
import {Container,H1,View,Spinner,Card,CardItem,Body} from "native-base";
import { TouchableOpacity } from 'react-native-gesture-handler';


const EBooksSearchResultScreen = ({route, navigation}) =>{
    
    const { search } = route.params;
    const [books, setBooks] = useState(null);
    const [error, setError] = useState(false);

    const getSearchbooks = async () => {
        try {
            const response = await backend.get(`get/?book_title="${search}"`);
            setBooks(response.data);
            console.log(books);
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
        <Container>
            <H1>Resultados de la Busqueda: {search}</H1>
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
                                        <CardItem>
                                            <Body> 
                                                <Image  source = {{uri:`${item.cover}`}} style={styles.portadaLibros}></Image>
                                                {/*No borrar las imagenes desaparecen*/}
                                                <Text>{item.title}</Text>
                                                <Text>{item.author} </Text>
                                                <Text>{item.publisher_date} </Text>
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
    
});

export default EBooksSearchResultScreen;