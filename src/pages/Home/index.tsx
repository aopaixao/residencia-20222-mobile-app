import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar
} from 'react-native';

import AxiosInstance from '../../api/AxiosInstance';

//Importando o Contexto de Data
import { DataContext } from '../../context/DataContext';

import { DadosEditoraType } from '../../models/DadosEditoraType';

const Item = ({ item, eventoPressionarBotao, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={eventoPressionarBotao} 
      style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.nomeEditora}</Text>
  </TouchableOpacity>
);

const Home = () => {

  const {dadosUsuario} = useContext(DataContext);
  const [dadosEditora, setDadosEditora] = useState<DadosEditoraType[]>([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    getAllEditoras();
  },[]);

  const getAllEditoras = async () => {
    AxiosInstance.get(
      '/editoras',
      {headers: {"Authorization" : `Bearer ${dadosUsuario?.token}`}}
    ).then( resultado => {
      console.log('Dados das Editoras: ' + JSON.stringify(resultado.data));
      setDadosEditora(resultado.data);
    }).catch((error) => {
      console.log('Ocorreu um erro ao recuperar os dados das Editoras: ' + JSON.stringify(error));
    });
  }

  const renderItem = ({ item }) => {
    const backgroundColor = item.codigoEditora === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.codigoEditora === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        eventoPressionarBotao={() => setSelectedId(item.codigoEditora)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return(
    <View style={styles.container}>
      <FlatList
        data={dadosEditora}
        renderItem={renderItem}
        keyExtractor={(item) => item.codigoEditora}
        extraData={selectedId}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default Home;