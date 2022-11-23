import React from 'react';
import {
  View,
  Text,
} from 'react-native';

const HomeEditora = ({ route, navigation }) => {
  const { editoraId } = route.params;
  //console.log(`Editora Id: ${editoraId}`);

  return(
    <View>
      <Text>Home da Editora {editoraId}</Text>
    </View>
  );
}

export default HomeEditora;